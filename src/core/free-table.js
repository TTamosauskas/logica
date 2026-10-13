/** Estado e semântica da Tabela Livre — independente do DOM e das avaliações do curso. */
import {parseFormula} from './parser.js';
import {truthRows,evalAst,pretty,stepNodes,sig,v,A,not} from './logic.js';

export const FREE_TABLE_KEY='logiclab_tabela_livre_v1';
export const VARIABLE_SEQUENCE=Object.freeze(['p','q','r','s','t','u']);
export const MAX_VARS=VARIABLE_SEQUENCE.length;
export const MAX_FORMULAS=16;
const RESERVED=new Set(['e','ou','xor','nao','não','se','sse']);
const validName=name=>/^[a-z][a-z0-9_]*$/.test(name)&&!RESERVED.has(name);
const normalName=name=>String(name||'').trim().toLowerCase();
const clean=s=>String(s||'').trim();

export function blankFreeTable(){
  return {version:2,variables:[{name:'p',meaning:''},{name:'q',meaning:''}],
    formulas:[],nextId:1,hidden:[],answers:{},graded:false};
}
export const nextFreeVariableName=state=>VARIABLE_SEQUENCE[state.variables.length]||null;
export function parseFreeFormula(state,source){
  const text=clean(source);
  if(!text||text.length>240)throw Error('A fórmula precisa ter entre 1 e 240 caracteres.');
  return parseFormula(text,state.variables.map(item=>item.name));
}
export function addFreeVariable(state,name,meaning=''){
  const next=nextFreeVariableName(state);
  if(!next)throw Error('O limite da tabela é de seis variáveis (64 linhas).');
  if(name!==next)throw Error('A próxima variável é '+next+'.');
  state.variables.push({name:next,meaning:clean(meaning).slice(0,160)});
  invalidate(state);return state;
}
export function editFreeVariable(state,oldName,newName,meaning){
  const entry=state.variables.find(x=>x.name===oldName);
  if(!entry)throw Error('Variável não encontrada.');
  if(newName!==oldName)throw Error('Os nomes seguem a sequência p, q, r, s, t, u.');
  entry.meaning=clean(meaning).slice(0,160);
  return state;
}
export function removeFreeVariable(state,name){
  if(state.variables.length<=2)throw Error('As variáveis p e q são permanentes.');
  if(state.variables.at(-1).name!==name)throw Error('Remova primeiro a última variável da sequência.');
  for(const formula of state.formulas){
    const ast=parseFreeFormula(state,formula.source);
    const uses=node=>node.type==='var'?node.name===name:Boolean(node.a&&uses(node.a)||node.b&&uses(node.b));
    if(uses(ast))throw Error('Remova ou edite as fórmulas que usam '+name+' antes de excluir a variável.');
  }
  state.variables.pop();invalidate(state);return state;
}
export function addFreeFormula(state,source){
  const ast=parseFreeFormula(state,source);
  if(state.formulas.length>=MAX_FORMULAS)throw Error('O limite é de 16 fórmulas.');
  if(state.formulas.some(f=>sig(parseFreeFormula(state,f.source))===sig(ast)))throw Error('Essa fórmula já está cadastrada.');
  state.formulas.push({id:'f'+state.nextId++,source:clean(source)});
  invalidate(state);return state;
}
export function editFreeFormula(state,id,source){
  const entry=state.formulas.find(f=>f.id===id);
  if(!entry)throw Error('Fórmula não encontrada.');
  const ast=parseFreeFormula(state,source);
  if(state.formulas.some(f=>f.id!==id&&sig(parseFreeFormula(state,f.source))===sig(ast)))throw Error('Essa fórmula já está cadastrada.');
  entry.source=clean(source);invalidate(state);return state;
}
export function removeFreeFormula(state,id){
  state.formulas=state.formulas.filter(f=>f.id!==id);invalidate(state);return state;
}
function invalidate(state){state.answers={};state.graded=false;state.hidden=[]}
export function freeColumns(state){
  const roots=state.formulas.map(f=>parseFreeFormula(state,f.source));
  const vars=state.variables.map(item=>({key:'v:'+item.name,label:item.name,node:v(item.name),kind:'var'}));
  const steps=stepNodes(roots).map(node=>({key:'s:'+sig(node),label:pretty(node),node,kind:'step'}));
  const formulas=roots.map((node,i)=>({key:'f:'+state.formulas[i].id,label:pretty(node),node,kind:'formula'}));
  return [...vars,...steps,...formulas];
}
export function freeRows(state){
  return truthRows(state.variables.map(x=>x.name));
}
export function evaluateFreeRow(row,column){return Boolean(evalAst(column.node,row))}
export function gradeFreeTable(state){
  const rows=freeRows(state),cols=freeColumns(state).filter(c=>c.kind!=='var');
  let correct=0,total=0,missing=0;
  rows.forEach((row,r)=>cols.forEach(col=>{
    total++;const answer=state.answers[r+'|'+col.key];
    if(!answer)missing++;
    if(answer===(evaluateFreeRow(row,col)?'V':'F'))correct++;
  }));
  state.graded=true;return {correct,total,missing};
}
function semantic(node,names){
  if(node.type==='var')return names[node.name]||node.name;
  if(node.type==='not')return node.a.type==='var'?'não é verdade que '+semantic(node.a,names):
    'é falso que '+(node.a.type==='implies'?'': '(')+semantic(node.a,names)+(node.a.type==='implies'?'':')');
  const left=semantic(node.a,names),right=semantic(node.b,names);
  switch(node.type){
    case 'and':return '('+left+') e ('+right+')';
    case 'or':return '('+left+') ou ('+right+'), inclusive ambos';
    case 'xor':return 'ou ('+left+') ou ('+right+'), mas não ambos';
    case 'implies':return 'se '+left+', então '+right;
    case 'iff':return '('+left+') se, e somente se, ('+right+')';
    default:return '';
  }
}
function cap(s){return s.charAt(0).toUpperCase()+s.slice(1)}
export function describeFreeFormula(node,state){
  const names=Object.fromEntries(state.variables.map(x=>[x.name,x.meaning||x.name]));
  const literal=cap(semantic(node,names)).replace(/\.+$/,'')+'.';
  let equivalent='',truth='';
  if(node.type==='not'&&node.a.type==='implies'){
    equivalent=pretty(A(node.a.a,not(node.a.b)));
    truth='É verdadeira somente quando “'+semantic(node.a.a,names)+'” é V e “'+semantic(node.a.b,names)+'” é F.';
  }else if(node.type==='implies'){
    equivalent=pretty({type:'or',a:not(node.a),b:node.b});
    truth='É falsa somente quando “'+semantic(node.a,names)+'” é V e “'+semantic(node.b,names)+'” é F.';
  }else if(node.type==='and'){
    truth='É verdadeira quando as duas partes são verdadeiras.';
  }else if(node.type==='or'){
    truth='É verdadeira quando ao menos uma das partes é verdadeira.';
  }else if(node.type==='not'){
    truth='É verdadeira quando a expressão negada é falsa.';
  }else if(node.type==='iff'){
    truth='É verdadeira quando as duas partes têm o mesmo valor lógico.';
  }else if(node.type==='xor'){
    truth='É verdadeira quando as duas partes têm valores lógicos diferentes.';
  }
  return {literal,equivalent,truth};
}
/** Adapta rascunhos V1 ao fluxo com p,q,r,s,t,u, sem descartar trabalhos autorais. */
export function readFreeTable(raw,{strict=false}={}){
  try {
    if(!raw)return blankFreeTable();
    const input=typeof raw==='string'?JSON.parse(raw):raw;
    if(!input||![1,2].includes(input.version)||!Array.isArray(input.variables)||
       input.variables.length<2||input.variables.length>MAX_VARS||
       !Array.isArray(input.formulas)||input.formulas.length>MAX_FORMULAS)throw Error('Estrutura de tabela inválida.');
    const names=input.variables.map(x=>x.name);
    if(names.some(n=>!validName(n))||new Set(names).size!==names.length)throw Error('Variáveis inválidas.');
    const state=blankFreeTable();
    state.variables=names.map((name,i)=>({name:VARIABLE_SEQUENCE[i],meaning:clean(input.variables[i].meaning).slice(0,160)}));
    const originalSources=input.formulas.map(f=>{
      if(typeof f?.source!=='string')throw Error('Fórmula inválida.');
      parseFormula(f.source,names);
      return f.source;
    });
    const renames=Object.fromEntries(names.map((name,i)=>[name,VARIABLE_SEQUENCE[i]]));
    const pattern=new RegExp('\\b('+names.join('|')+')\\b','g');
    const sources=originalSources.map(source=>source.replace(pattern,name=>renames[name]));
    const isDefaultV1=input.version===1&&names.length===2&&names[0]==='u'&&names[1]==='t'&&
      input.variables[0].meaning==='comprei ingresso'&&input.variables[1].meaning==='viajei'&&
      originalSources.length===1&&originalSources[0]==='¬(u → t)'&&
      !Object.keys(input.answers||{}).length&&!(input.hidden||[]).length;
    state.formulas=isDefaultV1?[]:sources.map((source,i)=>{
      const id=input.formulas[i].id;
      if(typeof id!=='string'||!/^f[1-9]\d*$/.test(id))throw Error('Identificador de fórmula inválido.');
      return {id,source};
    });
    const ids=state.formulas.map(f=>f.id);
    if(new Set(ids).size!==ids.length)throw Error('Fórmulas repetidas.');
    const columns=freeColumns(state);
    state.hidden=[];
    state.answers={};
    if(!isDefaultV1){
      const oldState={variables:names.map(name=>({name})),
        formulas:originalSources.map((source,i)=>({id:input.formulas[i].id,source}))};
      const oldColumns=freeColumns(oldState);
      const mapping=Object.fromEntries(oldColumns.map((col,i)=>[col.key,columns[i]?.key]).filter(x=>x[1]));
      state.hidden=Array.isArray(input.hidden)?[...new Set(input.hidden.map(k=>mapping[k]).filter(Boolean))]:[];
      const previousAnswers=input.rowMode==='custom'?{}:input.answers;
      if(previousAnswers&&typeof previousAnswers==='object'&&!Array.isArray(previousAnswers)){
        for(const [rawKey,value] of Object.entries(previousAnswers)){
          const match=/^(\d+)\|(.+)$/.exec(rawKey);
          if(match&&Number(match[1])<freeRows(state).length&&mapping[match[2]]&&(value==='V'||value==='F')){
            state.answers[match[1]+'|'+mapping[match[2]]]=value;
          }
        }
      }
      state.graded=input.graded===true&&input.rowMode!=='custom';
    }
    state.nextId=Math.max(1,...state.formulas.map(f=>Number(f.id.slice(1))+1));
    if(Number.isInteger(input.nextId))state.nextId=Math.max(state.nextId,Math.min(input.nextId,99999));
    return state;
  }catch(error){
    if(strict)throw Error('Projeto inválido: '+error.message);
    return blankFreeTable();
  }
}
