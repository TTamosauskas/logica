/** Estado e semântica da Tabela Livre — independente do DOM e das avaliações do curso. */
import {parseFormula} from './parser.js';
import {checkSymbolicInference,analyzePredicateRegions} from './free-inference.js';
import {analyzeLogicalPossibilities} from './logical-possibilities.js';
import {truthRows,evalAst,pretty,stepNodes,sig,v,A,I,not} from './logic.js';
import {isPredicateSource,parsePredicateFormula,predicateSignature,predicatePretty,predicateSteps,
 predicateAtomicNames,rootHasFreeX,hasQuantifier,evaluatePredicate,predicateReading,predicateEvidence} from './free-predicates.js';

export const FREE_TABLE_KEY='logiclab_tabela_livre_v1';
export const VARIABLE_SEQUENCE=Object.freeze(['p','q','r','s','t','u']);
export const MAX_VARS=VARIABLE_SEQUENCE.length;
export const MAX_FORMULAS=16;
export const MAX_PREDICATE_TABLE_FORMULAS=6;
export const MAX_INDIVIDUALS=20;
const RESERVED=new Set(['e','ou','xor','nao','não','se','sse']);
const validName=name=>/^[a-z][a-z0-9_]*$/.test(name)&&!RESERVED.has(name);
const normalName=name=>String(name||'').trim().toLowerCase();
const clean=s=>String(s||'').trim();

export function blankFreeTable(){
  return {version:4,variables:[{name:'p',meaning:'',kind:'predicate'},{name:'q',meaning:'',kind:'predicate'}],
    formulas:[],nextId:1,hidden:[],answers:{},graded:false,domain:[],predicateValues:{},inferenceConclusion:'',inferenceReport:null};
}
export const nextFreeVariableName=state=>VARIABLE_SEQUENCE[state.variables.length]||null;
export function parseFreeFormula(state,source){
  const text=clean(source);
  if(!text||text.length>240)throw Error('A fórmula precisa ter entre 1 e 240 caracteres.');
  if(isPredicateSource(text))return parsePredicateFormula(text,
    state.variables.filter(v=>v.kind!=='individual').map(v=>v.name),
    [...state.domain.map(d=>d.id),...state.variables.filter(v=>v.kind==='individual').map(v=>v.name)]);
  if(state.variables.some(v=>v.kind==='individual'))
    throw Error('Fórmulas proposicionais não podem incluir símbolos cadastrados como indivíduos. Use predicados, como q(p).');
  return parseFormula(text,state.variables.map(item=>item.name));
}
export function addFreeVariable(state,name,meaning=''){
  const next=nextFreeVariableName(state);
  if(!next)throw Error('O limite da tabela é de seis variáveis (64 linhas).');
  if(name!==next)throw Error('A próxima variável é '+next+'.');
  if(state.domain.some(d=>d.id===next))throw Error('O símbolo '+next+' já identifica um indivíduo do domínio. Exclua esse indivíduo antes de acrescentar a variável.');
  state.variables.push({name:next,meaning:clean(meaning).slice(0,160),kind:'predicate'});
  invalidate(state);return state;
}
export function editFreeVariable(state,oldName,newName,meaning,kind){
  const entry=state.variables.find(x=>x.name===oldName);
  if(!entry)throw Error('Variável não encontrada.');
  if(newName!==oldName)throw Error('Os nomes seguem a sequência p, q, r, s, t, u.');
  const type=kind??entry.kind??'predicate';
  if(!['individual','predicate'].includes(type))throw Error('Tipo de símbolo inválido.');
  if(type!==entry.kind){
    if(state.domain.some(d=>d.id===oldName))throw Error('O símbolo já identifica um indivíduo no domínio.');
    if(type==='individual'&&freeTableKind(state)==='propositional'&&state.formulas.length)
      throw Error('Remova as fórmulas proposicionais antes de transformar uma variável em indivíduo.');
    const proposed={...state,variables:state.variables.map(v=>v.name===oldName?{...v,kind:type}:v)};
    proposed.formulas.forEach(f=>parseFreeFormula(proposed,f.source));
    if(proposed.inferenceConclusion)parseFreeFormula(proposed,proposed.inferenceConclusion);
    entry.kind=type;invalidate(state);
  }
  entry.meaning=clean(meaning).slice(0,160);
  return state;
}
export function removeFreeVariable(state,name){
  if(state.variables.length<=2)throw Error('As variáveis p e q são permanentes.');
  if(state.variables.at(-1).name!==name)throw Error('Remova primeiro a última variável da sequência.');
  for(const formula of state.formulas){
    const ast=parseFreeFormula(state,formula.source);
    const uses=node=>node.type==='var'||node.type==='pred'?(node.name===name||node.term===name):Boolean(node.a&&uses(node.a)||node.b&&uses(node.b));
    if(uses(ast))throw Error('Remova ou edite as fórmulas que usam '+name+' antes de excluir a variável.');
  }
  if(state.inferenceConclusion&&isPredicateSource(state.inferenceConclusion)){
    const ast=parseFreeFormula(state,state.inferenceConclusion);
    const uses=node=>node.type==='pred'?(node.name===name||node.term===name):
      Boolean(node.a&&uses(node.a)||node.b&&uses(node.b));
    if(uses(ast))throw Error('Remova a conclusão que usa '+name+' antes de excluir a variável.');
  }
  state.variables.pop();invalidate(state);return state;
}
export const freeTableKind=state=>state.formulas.some(f=>isPredicateSource(f.source))||
  state.variables?.some(v=>v.kind==='individual')?'predicates':'propositional';
export function addFreeIndividual(state,id,label){
  const name=normalName(id);
  if(!/^[a-z][a-z0-9_]*$/.test(name)||name==='x'||RESERVED.has(name))
    throw Error('Use um identificador como a, b ou s para o indivíduo (não x).');
  if(!clean(label))throw Error('Informe o nome do indivíduo, como Sócrates.');
  if(state.domain.length>=MAX_INDIVIDUALS)throw Error('Máximo de 20 indivíduos.');
  if(state.domain.some(d=>d.id===name)||
     state.variables.some(v=>v.name===name&&v.kind!=='individual'))
    throw Error('Já existe uma proposição, propriedade ou indivíduo com esse símbolo.');
  state.domain.push({id:name,label:clean(label).slice(0,80)});
  state.graded=false;state.answers={};state.inferenceReport=null;return state;
}
export function editFreeIndividual(state,id,label){
  const entry=state.domain.find(d=>d.id===id);
  if(!entry)throw Error('Indivíduo não encontrado.');
  if(!clean(label))throw Error('Informe um nome para o indivíduo.');
  entry.label=clean(label).slice(0,80);return state;
}
export function removeFreeIndividual(state,id){
  // Uma conclusão com a constante excluída tornaria o projeto impossível de recarregar.
  if(state.inferenceConclusion&&isPredicateSource(state.inferenceConclusion)){
    const conclusion=parseFreeFormula(state,state.inferenceConclusion);
    const uses=node=>node.type==='pred'?node.term===id:
      Boolean((node.a&&uses(node.a))||(node.b&&uses(node.b)));
    if(uses(conclusion))throw Error('Remova ou edite a conclusão que usa '+id+' antes de excluir o indivíduo.');
  }
  for(const formula of state.formulas){
    if(isPredicateSource(formula.source)){
      const ast=parseFreeFormula(state,formula.source);
      const uses=node=>node.type==='pred'?node.term===id:Boolean(node.a&&uses(node.a)||node.b&&uses(node.b));
      if(uses(ast))throw Error('Remova ou edite fórmulas com '+id+' antes de excluir o indivíduo.');
    }
  }
  state.domain=state.domain.filter(d=>d.id!==id);
  Object.keys(state.predicateValues).filter(k=>k.startsWith(id+'|')).forEach(k=>delete state.predicateValues[k]);
  state.answers={};state.graded=false;state.inferenceReport=null;return state;
}
function assertSameKind(state,source,id=null){
  const previous=state.formulas.filter(f=>f.id!==id);
  if(!previous.length)return;
  const oldKind=freeTableKind({formulas:previous});
  if(oldKind!==(isPredicateSource(source)?'predicates':'propositional'))
    throw Error('Para alternar entre fórmulas proposicionais e predicados, remova primeiro as fórmulas anteriores.');
}
export function addFreeFormula(state,source){
  const ast=parseFreeFormula(state,source);
  assertSameKind(state,source);
  if(isPredicateSource(source)&&rootHasFreeX(ast))
    throw Error('Feche x com ∀x(...) ou ∃x(...) para que cada fórmula tenha V/F na tabela.');
  if(isPredicateSource(source)&&state.formulas.length>=MAX_PREDICATE_TABLE_FORMULAS)
    throw Error('A tabela de predicados admite até seis fórmulas (64 linhas).');
  if(state.formulas.length>=MAX_FORMULAS)throw Error('O limite é de 16 fórmulas.');
  if(state.formulas.some(f=>formulaSignature(parseFreeFormula(state,f.source))===formulaSignature(ast)))throw Error('Essa fórmula já está cadastrada.');
  state.formulas.push({id:'f'+state.nextId++,source:clean(source)});
  invalidate(state);return state;
}
export function editFreeFormula(state,id,source){
  const entry=state.formulas.find(f=>f.id===id);
  if(!entry)throw Error('Fórmula não encontrada.');
  const ast=parseFreeFormula(state,source);
  assertSameKind(state,source,id);
  if(isPredicateSource(source)&&rootHasFreeX(ast))
    throw Error('Feche x com ∀x(...) ou ∃x(...) para que cada fórmula tenha V/F na tabela.');
  if(state.formulas.some(f=>f.id!==id&&formulaSignature(parseFreeFormula(state,f.source))===formulaSignature(ast)))throw Error('Essa fórmula já está cadastrada.');
  entry.source=clean(source);invalidate(state);return state;
}
export function removeFreeFormula(state,id){
  state.formulas=state.formulas.filter(f=>f.id!==id);invalidate(state);return state;
}
function invalidate(state){state.answers={};state.graded=false;state.hidden=[];state.inferenceReport=null}
function isPredicateAst(node){return node.type==='pred'||Boolean((node.a&&isPredicateAst(node.a))||(node.b&&isPredicateAst(node.b)))}
export const formulaSignature=ast=>ast.type==='pred'||hasQuantifier(ast)||isPredicateAst(ast)?predicateSignature(ast):sig(ast);
/** As fórmulas cadastradas são premissas; a conclusão é verificada em todos os modelos. */
export function verifyFreeInference(state,source){
  if(freeTableKind(state)!=='predicates')throw Error('Cadastre premissas com predicados, como q(p) e ∀x(q(x) → r(x)).');
  if(!isPredicateSource(source))throw Error('A conclusão deve usar predicados, como r(p) ou ∀x(q(x) → r(x)).');
  const conclusion=parseFreeFormula(state,source);
  const premises=state.formulas.map(f=>parseFreeFormula(state,f.source));
  const report=checkSymbolicInference(premises,conclusion);
  state.inferenceConclusion=clean(source);
  state.inferenceReport=report;
  return report;
}
/** Analisa a realizabilidade de linhas formadas pelas fórmulas completas cadastradas.
 * A tabela de modelos concretos do aluno é independente dessa verificação.
 */
export function analyzeFreePossibilities(state,{conclusionSource=state.inferenceConclusion,filters={}}={}){
  const mode=freeTableKind(state);
  const roots=state.formulas.map(item=>parseFreeFormula(state,item.source));
  const conclusionText=String(conclusionSource||'').trim();
  if(conclusionText&&mode!=='predicates')
    throw Error('A conclusão simbólica deve ser analisada no modo de predicados.');
  const conclusion=conclusionText?parseFreeFormula(state,conclusionText):null;
  const report=analyzeLogicalPossibilities({
    formulas:roots,conclusion,variables:state.variables.map(v=>v.name),mode
  });
  const expressions=[...state.formulas.map(f=>f.source),...(conclusionText?[conclusionText]:[])];
  const vars=mode==='predicates'?state.variables.filter(v=>roots.some(ast=>
    predicateAtomicNames([ast]).has(v.name))).map(v=>v.name):[];
  const region=mode==='predicates'&&report.status==='complete'&&vars.length?
    analyzePredicateRegions(roots,vars,filters):null;
  return {...report,expressions,region};
}
/** No modo de predicados, cada fórmula fechada funciona como coluna-base da
 * mesma tabela-verdade: combinações V/F sem modelo são desativadas.
 * Os resultados são cacheados pela lista de fórmulas para não reenumerar modelos a cada clique.
 */
const predicateTableCache=new WeakMap();
export function predicateTruthAnalysis(state){
  if(freeTableKind(state)!=='predicates')return null;
  const sources=state.formulas.map(item=>item.source);
  const visible=sources.slice(0,MAX_PREDICATE_TABLE_FORMULAS);
  const cacheKey=JSON.stringify(visible);
  const cached=predicateTableCache.get(state);
  if(cached?.key===cacheKey)return cached.report;
  const labels=visible.map((_,i)=>'ABCDEF'[i]);
  const report=!visible.length?{status:'empty',rows:[]}:
    analyzeLogicalPossibilities({formulas:visible.map(source=>parseFreeFormula(state,source)),
      mode:'predicates'});
  const result={...report,labels,expressions:visible,
    truncated:sources.length>MAX_PREDICATE_TABLE_FORMULAS};
  predicateTableCache.set(state,{key:cacheKey,report:result});
  return result;
}
export function freeColumns(state){
  const roots=state.formulas.map(f=>parseFreeFormula(state,f.source));
  if(freeTableKind(state)==='predicates'){
    const analysis=predicateTruthAnalysis(state);
    const letters=analysis.labels;
    const given=letters.map((letter,i)=>({
      key:'v:'+state.formulas[i].id,label:letter+' · '+predicatePretty(roots[i]),
      name:letter,node:v(letter),kind:'var',given:true
    }));
    if(!letters.length)return given;
    // Para uma fórmula, pratique sua negação; a partir de duas, a última
    // é a conclusão e as anteriores são as premissas da implicação.
    const node=letters.length===1?not(v(letters[0])):
      I(letters.slice(0,-1).map(letter=>v(letter)).reduce((acc,current)=>
        acc?A(acc,current):current,null),v(letters.at(-1)));
    return [...given,{key:'f:combined',label:pretty(node),node,kind:'formula'}];
  }
  const vars=state.variables.map(item=>({key:'v:'+item.name,label:item.name,node:v(item.name),kind:'var'}));
  const steps=stepNodes(roots).map(node=>({key:'s:'+sig(node),label:pretty(node),node,kind:'step'}));
  const formulas=roots.map((node,i)=>({key:'f:'+state.formulas[i].id,label:pretty(node),node,kind:'formula'}));
  return [...vars,...steps,...formulas];
}
export function freeRows(state){
  if(freeTableKind(state)==='predicates'){
    const analysis=predicateTruthAnalysis(state);
    return analysis.labels.length?truthRows(analysis.labels):[];
  }
  return truthRows(state.variables.map(x=>x.name));
}
export function freeRowImpossible(state,index){
  const report=predicateTruthAnalysis(state);
  return Boolean(report?.status==='complete'&&report.rows[index]?.possible===false);
}
export function evaluateFreeRow(row,column,state){
  return Boolean(evalAst(column.node,row));
}
export function gradeFreeTable(state){
  const rows=freeRows(state),cols=freeColumns(state),derived=cols.filter(c=>c.kind!=='var');
  let correct=0,total=0,missing=0;
  derived.forEach(col=>rows.forEach((row,r)=>{
    if(freeRowImpossible(state,r))return;
    total++;
    const answer=state.answers[r+'|'+col.key];
    const expected=evaluateFreeRow(row,col,state)?'V':'F';
    if(!answer)missing++;
    if(answer===expected)correct++;
  }));
  state.graded=true;return {correct,total,missing};
}
export function freeFormulaEvidence(state,node){
  if(freeTableKind(state)!=='predicates'||!state.domain.length)return '';
  const cols=freeColumns(state).filter(c=>c.kind==='var');
  if(state.domain.some(row=>cols.some(col=>!['V','F'].includes(state.predicateValues[row.id+'|'+col.name]))))return '';
  return predicateEvidence(node,state.domain,state.predicateValues);
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
  if(freeTableKind(state)==='predicates')return {literal:cap(predicateReading(node,names,Object.fromEntries([...state.domain.map(d=>[d.id,d.label]),...state.variables.filter(v=>v.kind==='individual').map(v=>[v.name,v.meaning||v.name])]))).replace(/\.+$/,'')+'.',
    equivalent:'',truth:freeFormulaEvidence(state,node)};
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
    if(!input||![1,2,3,4].includes(input.version)||!Array.isArray(input.variables)||
       input.variables.length<2||input.variables.length>MAX_VARS||
       !Array.isArray(input.formulas)||input.formulas.length>MAX_FORMULAS)throw Error('Estrutura de tabela inválida.');
    const names=input.variables.map(x=>x.name);
    if(names.some(n=>!validName(n))||new Set(names).size!==names.length)throw Error('Variáveis inválidas.');
    const state=blankFreeTable();
    state.variables=names.map((name,i)=>({name:VARIABLE_SEQUENCE[i],meaning:clean(input.variables[i].meaning).slice(0,160),
      kind:input.version===4&&input.variables[i].kind==='individual'?'individual':'predicate'}));
    const originalSources=input.formulas.map(f=>{
      if(typeof f?.source!=='string')throw Error('Fórmula inválida.');
      if(isPredicateSource(f.source))parsePredicateFormula(f.source,
        names.filter((n,i)=>input.variables[i].kind!=='individual'),
        [...(input.domain||[]).map(d=>d.id),...names.filter((n,i)=>input.variables[i].kind==='individual')]);
      else parseFormula(f.source,names);
      return f.source;
    });
    const renames=Object.fromEntries(names.map((name,i)=>[name,VARIABLE_SEQUENCE[i]]));
    const pattern=new RegExp('\\b('+names.join('|')+')\\b','g');
    const sources=originalSources.map(source=>source.replace(pattern,name=>renames[name]));
    const isDefaultV1=input.version===1&&names.length===2&&names[0]==='u'&&names[1]==='t'&&
      input.variables[0].meaning==='comprei ingresso'&&input.variables[1].meaning==='viajei'&&
      originalSources.length===1&&originalSources[0]==='¬(u → t)'&&
      !Object.keys(input.answers||{}).length&&!(input.hidden||[]).length;
    // O exemplo de fábrica da versão anterior não vira significado nem fórmula do aluno.
    if(isDefaultV1)state.variables=blankFreeTable().variables;
    state.formulas=isDefaultV1?[]:sources.map((source,i)=>{
      const id=input.formulas[i].id;
      if(typeof id!=='string'||!/^f[1-9]\d*$/.test(id))throw Error('Identificador de fórmula inválido.');
      return {id,source};
    });
    const ids=state.formulas.map(f=>f.id);
    if(new Set(ids).size!==ids.length)throw Error('Fórmulas repetidas.');
    if(input.version>=3){
      if(!Array.isArray(input.domain)||input.domain.length>MAX_INDIVIDUALS)throw Error('Domínio inválido.');
      for(const item of input.domain){
        if(!item||typeof item.id!=='string'||typeof item.label!=='string')throw Error('Indivíduo inválido.');
        addFreeIndividual(state,item.id,item.label);
      }
      if(input.predicateValues&&typeof input.predicateValues==='object'&&!Array.isArray(input.predicateValues)){
        for(const [k,v] of Object.entries(input.predicateValues)){
          const [id,name]=k.split('|');
          if(state.domain.some(d=>d.id===id)&&state.variables.some(x=>x.name===name)&&(v==='V'||v==='F'))
            state.predicateValues[k]=v;
        }
      }
    }
    const columns=freeColumns(state);
    state.hidden=[];
    state.answers={};
    if(!isDefaultV1){
      const oldState={variables:names.map((name,i)=>({name,kind:state.variables[i].kind})),
        formulas:originalSources.map((source,i)=>({id:input.formulas[i].id,source}))};
      if(input.version>=3){oldState.domain=state.domain;oldState.predicateValues=state.predicateValues}
      const oldColumns=freeColumns(oldState);
      const mapping=Object.fromEntries(oldColumns.map((col,i)=>[col.key,columns[i]?.key]).filter(x=>x[1]));
      state.hidden=Array.isArray(input.hidden)?[...new Set(input.hidden.map(k=>mapping[k]).filter(Boolean))]:[];
      const previousAnswers=input.rowMode==='custom'?{}:input.answers;
      if(previousAnswers&&typeof previousAnswers==='object'&&!Array.isArray(previousAnswers)){
        for(const [rawKey,value] of Object.entries(previousAnswers)){
          const match=/^(global|\d+)\|(.+)$/.exec(rawKey);
          if(match&&(match[1]==='global'||Number(match[1])<freeRows(state).length)&&mapping[match[2]]&&(value==='V'||value==='F')){
            state.answers[match[1]+'|'+mapping[match[2]]]=value;
          }
        }
      }
      state.graded=input.graded===true&&input.rowMode!=='custom';
    }
    if(input.version===4&&typeof input.inferenceConclusion==='string'&&input.inferenceConclusion.length<=240){
      const candidate=input.inferenceConclusion.trim();
      if(candidate){
        parseFreeFormula(state,candidate);
        state.inferenceConclusion=candidate;
        if(state.formulas.length&&freeTableKind(state)==='predicates'&&input.inferenceReport){
          try{state.inferenceReport=checkSymbolicInference(
            state.formulas.map(f=>parseFreeFormula(state,f.source)),parseFreeFormula(state,candidate))}catch{}
        }
      }
    }
    state.nextId=Math.max(1,...state.formulas.map(f=>Number(f.id.slice(1))+1));
    if(Number.isInteger(input.nextId))state.nextId=Math.max(state.nextId,Math.min(input.nextId,99999));
    return state;
  }catch(error){
    if(strict)throw Error('Projeto inválido: '+error.message);
    return blankFreeTable();
  }
}
