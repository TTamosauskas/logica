/** Estado e semântica da Tabela Livre — independente do DOM e das avaliações do curso. */
import {parseFormula} from './parser.js';
import {truthRows,evalAst,pretty,stepNodes,sig,v,A,not} from './logic.js';

export const FREE_TABLE_KEY='logiclab_tabela_livre_v1';
export const MAX_VARS=6;
export const MAX_ROWS=64;
export const MAX_FORMULAS=16;
const RESERVED=new Set(['e','ou','xor','nao','não','se','sse']);
const validName=name=>/^[a-z][a-z0-9_]*$/.test(name)&&!RESERVED.has(name);
const normalName=name=>String(name||'').trim().toLowerCase();
const clean=s=>String(s||'').trim();

export function blankFreeTable(){
  return {version:1,variables:[{name:'u',meaning:'comprei ingresso'},{name:'t',meaning:'viajei'}],
    formulas:[{id:'f1',source:'¬(u → t)'}],nextId:2,rowMode:'all',
    customRows:[{u:true,t:false}],viewMode:'explore',hidden:[],answers:{},graded:false};
}
export function parseFreeFormula(state,source){
  const text=clean(source);
  if(!text||text.length>240)throw Error('A fórmula precisa ter entre 1 e 240 caracteres.');
  return parseFormula(text,state.variables.map(item=>item.name));
}
export function addFreeVariable(state,name,meaning=''){
  const id=normalName(name);
  if(!validName(id))throw Error('Use um nome de variável como p, q ou compra_1, sem conectivos reservados.');
  if(state.variables.some(x=>x.name===id))throw Error('Essa variável já existe.');
  if(state.variables.length>=MAX_VARS)throw Error('O limite da tabela é de seis variáveis (64 linhas).');
  state.variables.push({name:id,meaning:clean(meaning).slice(0,160)});
  state.customRows.forEach(row=>row[id]=true);
  invalidate(state);return state;
}
export function editFreeVariable(state,oldName,newName,meaning){
  const old=state.variables.find(x=>x.name===oldName);
  if(!old)throw Error('Variável não encontrada.');
  const id=normalName(newName);
  if(!validName(id))throw Error('Nome de variável inválido ou reservado.');
  if(id!==oldName&&state.variables.some(x=>x.name===id))throw Error('Já existe outra variável com esse nome.');
  if(id!==oldName){
    const regex=new RegExp('\\b'+oldName+'\\b','g');
    state.formulas.forEach(f=>f.source=f.source.replace(regex,id));
    state.customRows.forEach(row=>{row[id]=row[oldName];delete row[oldName]});
    old.name=id;
  }
  old.meaning=clean(meaning).slice(0,160);
  if(id!==oldName)invalidate(state);
  return state;
}
export function removeFreeVariable(state,name){
  if(state.variables.length<=1)throw Error('Mantenha ao menos uma variável.');
  if(!state.variables.some(v=>v.name===name))return state;
  for(const formula of state.formulas){
    const ast=parseFreeFormula(state,formula.source);
    const uses=node=>node.type==='var'?node.name===name:Boolean(node.a&&uses(node.a)||node.b&&uses(node.b));
    if(uses(ast))throw Error('Remova ou edite as fórmulas que usam '+name+' antes de excluir a variável.');
  }
  state.variables=state.variables.filter(v=>v.name!==name);
  state.customRows.forEach(row=>delete row[name]);
  invalidate(state);return state;
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
  return state.rowMode==='custom'?state.customRows.map(row=>Object.fromEntries(state.variables.map(x=>[x.name,row[x.name]===true]))):
    truthRows(state.variables.map(x=>x.name));
}
export function setFreeRowMode(state,mode){
  if(!['all','custom'].includes(mode))throw Error('Modo de linhas inválido.');
  state.rowMode=mode;
  if(mode==='custom'&&!state.customRows.length)state.customRows=[Object.fromEntries(state.variables.map(x=>[x.name,true]))];
  state.answers={};state.graded=false;return state;
}
export function addFreeRow(state){
  if(state.customRows.length>=MAX_ROWS)throw Error('Limite de 64 cenários.');
  state.customRows.push(Object.fromEntries(state.variables.map(x=>[x.name,true])));
  state.answers={};state.graded=false;return state;
}
export function removeFreeRow(state,index){
  if(!Number.isInteger(index)||index<0||index>=state.customRows.length)return state;
  state.customRows.splice(index,1);state.answers={};state.graded=false;return state;
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
export function readFreeTable(raw){
  try{
    if(!raw)return blankFreeTable();
    const input=typeof raw==='string'?JSON.parse(raw):raw;
    if(input?.version!==1||!Array.isArray(input.variables)||input.variables.length<1||input.variables.length>MAX_VARS||
      !Array.isArray(input.formulas)||input.formulas.length>MAX_FORMULAS)throw Error('Estrutura de tabela inválida.');
    const state=blankFreeTable();
    state.variables=[];
    for(const row of input.variables)addFreeVariable(state,row.name,row.meaning);
    state.formulas=[];state.nextId=1;
    for(const row of input.formulas)addFreeFormula(state,row.source);
    state.rowMode=input.rowMode==='custom'?'custom':'all';
    state.customRows=Array.isArray(input.customRows)?input.customRows.slice(0,MAX_ROWS)
      .filter(x=>x&&typeof x==='object'&&!Array.isArray(x))
      .map(row=>Object.fromEntries(state.variables.map(v=>[v.name,row[v.name]===true]))):[];
    state.viewMode=input.viewMode==='practice'?'practice':'explore';
    const keys=new Set(freeColumns(state).map(c=>c.key));
    state.hidden=Array.isArray(input.hidden)?input.hidden.filter(k=>keys.has(k)):[];
    state.answers={};
    if(input.answers&&typeof input.answers==='object'&&!Array.isArray(input.answers)){
      const max=freeRows(state).length;
      for(const [key,value] of Object.entries(input.answers)){
        const match=/^(\d+)\|(.+)$/.exec(key);
        if(match&&Number(match[1])<max&&keys.has(match[2])&&(value==='V'||value==='F'))state.answers[key]=value;
      }
    }
    state.nextId=Math.max(state.nextId,Number.isInteger(input.nextId)?Math.min(input.nextId,99999):0);
    state.graded=input.graded===true;return state;
  }catch{return blankFreeTable()}
}
