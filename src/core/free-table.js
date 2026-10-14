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
// Constantes lógicas não determinam se o restante da tabela é proposicional
// ou de predicados. São admitidas nos dois fragmentos.
const isNeutralTruthSource=source=>/[⊤⊥]/.test(source)&&!/[a-zà-ÿ]/i.test(source);

export function blankFreeTable(){
  return {version:4,variables:[{name:'p',meaning:'',kind:'predicate'},{name:'q',meaning:'',kind:'predicate'}],
    formulas:[],nextId:1,hidden:[],answers:{},graded:false,domain:[],predicateValues:{},inferenceConclusion:'',inferenceReport:null};
}
export const nextFreeVariableName=state=>VARIABLE_SEQUENCE[state.variables.length]||null;
export function parseFreeFormula(state,source){
  const text=clean(source);
  if(!text||text.length>240)throw Error('A fórmula precisa ter entre 1 e 240 caracteres.');
  if(isPredicateSource(text)||(isNeutralTruthSource(text)&&freeTableKind(state)==='predicates'))return parsePredicateFormula(text,
    state.variables.filter(v=>v.kind!=='individual').map(v=>v.name),
    [...state.domain.map(d=>d.id),...state.variables.filter(v=>v.kind==='individual').map(v=>v.name)],
    {allowImplicitIndividuals:true});
  if(state.variables.some(v=>v.kind==='individual'))
    throw Error('Fórmulas proposicionais não podem incluir símbolos cadastrados como indivíduos. Use predicados, como q(p).');
  return parseFormula(text,state.variables.map(item=>item.name));
}

/** Em q(p), p é indivíduo pelo papel sintático. O formulário só é atualizado
 * quando a fórmula inteira é válida; um mesmo símbolo não pode ser simultaneamente
 * nome de predicado e de indivíduo nas fórmulas cadastradas.
 */
function predicateTerms(node,output=new Set()){
  if(node.type==='pred'&&node.term!=='x')output.add(node.term);
  if(node.a)predicateTerms(node.a,output);
  if(node.b)predicateTerms(node.b,output);
  return output;
}
function inferIndividualRoles(state,ast,excludedId=null){
  const roots=[...state.formulas.filter(f=>f.id!==excludedId)
    .map(f=>parseFreeFormula(state,f.source)),ast];
  const names=predicateAtomicNames(roots);
  const terms=new Set();
  roots.forEach(root=>predicateTerms(root,terms));
  for(const term of terms){
    if(names.has(term))
      throw Error('O símbolo '+term+' foi usado como propriedade e como indivíduo. Escolha símbolos diferentes para cada papel.');
  }
  for(const entry of state.variables){
    if(terms.has(entry.name))entry.kind='individual';
  }
}
export function addFreeVariable(state,name,meaning=''){
  const next=nextFreeVariableName(state);
  if(!next)throw Error('O limite da tabela é de seis variáveis (64 linhas).');
  if(name!==next)throw Error('A próxima variável é '+next+'.');
  const usedAsIndividual=state.domain.some(d=>d.id===next)||
    state.formulas.some(f=>predicateTerms(parseFreeFormula(state,f.source)).has(next));
  if(usedAsIndividual&&state.formulas.length&&freeTableKind(state)==='propositional')
    throw Error('Remova as fórmulas proposicionais antes de adicionar um símbolo individual.');
  state.variables.push({name:next,meaning:clean(meaning).slice(0,160),
    kind:usedAsIndividual?'individual':'predicate'});
  invalidate(state);return state;
}
export function editFreeVariable(state,oldName,newName,meaning,kind){
  const entry=state.variables.find(x=>x.name===oldName);
  if(!entry)throw Error('Variável não encontrada.');
  if(newName!==oldName)throw Error('Os nomes seguem a sequência p, q, r, s, t, u.');
  const type=kind??entry.kind??'predicate';
  if(!['individual','predicate'].includes(type))throw Error('Tipo de símbolo inválido.');
  if(type!==entry.kind){
    if(type==='predicate'&&state.formulas.some(f=>
      predicateTerms(parseFreeFormula(state,f.source)).has(oldName)))
      throw Error('O símbolo '+oldName+' é usado como indivíduo em uma fórmula. Altere a fórmula antes de trocar seu tipo.');
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
  if(state.domain.some(d=>d.id===name))
    throw Error('Já existe um indivíduo com esse símbolo.');
  const variable=state.variables.find(v=>v.name===name);
  if(variable?.kind!=='individual'&&variable){
    if(state.formulas.length&&freeTableKind(state)==='propositional')
      throw Error('Remova as fórmulas proposicionais antes de transformar uma variável em indivíduo.');
    if(state.formulas.some(f=>predicateAtomicNames([parseFreeFormula(state,f.source)]).has(name)))
      throw Error('O símbolo '+name+' já representa uma propriedade em fórmula cadastrada.');
    variable.kind='individual';
  }
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
  if(isNeutralTruthSource(source)||previous.every(f=>isNeutralTruthSource(f.source)))return;
  const oldKind=freeTableKind({formulas:previous});
  if(oldKind!==(isPredicateSource(source)?'predicates':'propositional'))
    throw Error('Para alternar entre fórmulas proposicionais e predicados, remova primeiro as fórmulas anteriores.');
}
export function addFreeFormula(state,source){
  const ast=parseFreeFormula(state,source);
  assertSameKind(state,source);
  if(isPredicateSource(source)&&rootHasFreeX(ast))
    throw Error('Feche x com ∀x(...) ou ∃x(...) para que cada fórmula tenha V/F na tabela.');
  if((isPredicateSource(source)||isNeutralTruthSource(source)&&freeTableKind(state)==='predicates')&&state.formulas.length>=MAX_PREDICATE_TABLE_FORMULAS)
    throw Error('A tabela de predicados admite até seis fórmulas (64 linhas).');
  if(state.formulas.length>=MAX_FORMULAS)throw Error('O limite é de 16 fórmulas.');
  if(state.formulas.some(f=>formulaSignature(parseFreeFormula(state,f.source))===formulaSignature(ast)))throw Error('Essa fórmula já está cadastrada.');
  if(isPredicateSource(source))inferIndividualRoles(state,ast);
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
  if(isPredicateSource(source))inferIndividualRoles(state,ast,id);
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
  if(!isPredicateSource(source)&&!isNeutralTruthSource(source))throw Error('A conclusão deve usar predicados, como r(p) ou ∀x(q(x) → r(x)), ou constantes ⊤/⊥.');
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
/** Descreve o argumento formado pelas fórmulas cadastradas, sem alterar colunas,
 * notas, respostas ou a semântica de cada modo da Tabela Livre.
 * A última fórmula é a conclusão somente quando há pelo menos duas fórmulas.
 */
function freeArgumentRule(roots,mode){
  const premises=roots.slice(0,-1),conclusion=roots.at(-1);
  if(mode==='predicates'){
    // Exemplo típico: P(a), ∀x(P(x) → Q(x)) ∴ Q(a).
    for(const universal of premises){
      if(universal.type!=='forall'||universal.a?.type!=='implies')continue;
      const antecedent=universal.a.a,consequent=universal.a.b;
      if(antecedent?.type!=='pred'||consequent?.type!=='pred'||
         antecedent.term!=='x'||consequent.term!=='x')continue;
      const instance=premises.find(node=>node.type==='pred'&&
        node.name===antecedent.name&&node.term!=='x'&&
        conclusion.type==='pred'&&conclusion.name===consequent.name&&
        conclusion.term===node.term);
      if(instance)return 'Instanciação universal e modus ponens: da premissa universal obtemos '+
        antecedent.name+'('+instance.term+') → '+consequent.name+'('+instance.term+
        '); com '+predicatePretty(instance)+', concluímos '+predicatePretty(conclusion)+'.';
    }
  }else{
    // Exemplo típico: p → q, p ∴ q.
    for(const conditional of premises){
      if(conditional.type!=='implies')continue;
      if(sig(conditional.b)!==sig(conclusion))continue;
      if(premises.some(node=>sig(node)===sig(conditional.a)))
        return 'Modus ponens: da condicional e de seu antecedente, concluímos o consequente.';
    }
  }
  return '';
}
export function freeArgumentAnalysis(state){
  if(state.formulas.length<2)return null;
  const mode=freeTableKind(state);
  const roots=state.formulas.map(f=>parseFreeFormula(state,f.source));
  if(mode==='predicates'){
    const report=predicateTruthAnalysis(state);
    if(report.status!=='complete')return {status:'undetermined',
      reason:'Não foi possível verificar todas as combinações: '+(report.reason||'análise indisponível')+'.'};
    const premisesTrue=report.rows.filter(row=>row.possible&&
      row.values.slice(0,-1).every(value=>value==='V'));
    const counter=premisesTrue.find(row=>row.values.at(-1)==='F');
    if(counter)return {status:'invalid',
      reason:'Uma combinação semanticamente possível tem todas as premissas V e a conclusão F. Há um contraexemplo; o argumento é inválido.'};
    if(!premisesTrue.length)return {status:'vacuous',
      reason:'Não há modelo em que todas as premissas sejam V. A inferência é válida por vacuidade (premissas conjuntamente inconsistentes), não por uma demonstração informativa da conclusão.'};
    const rule=freeArgumentRule(roots,mode);
    return {status:'valid',reason:(rule?rule+' ':'')+
      'Nenhuma combinação semanticamente possível tem todas as premissas V e a conclusão F. O argumento é válido.'};
  }
  const variables=state.variables.map(item=>item.name);
  const rows=truthRows(variables);
  const premiseValues=rows.map(row=>roots.slice(0,-1).every(node=>evalAst(node,row)));
  const counterIndex=rows.findIndex((row,i)=>premiseValues[i]&&!evalAst(roots.at(-1),row));
  if(counterIndex>=0)return {status:'invalid',
    reason:'Na atribuição '+variables.map(name=>name+'='+(rows[counterIndex][name]?'V':'F')).join(', ')+
      ', todas as premissas são V e a conclusão é F. Esse contraexemplo torna o argumento inválido.'};
  if(!premiseValues.some(Boolean))return {status:'vacuous',
    reason:'Nenhuma atribuição torna todas as premissas V. A inferência é válida por vacuidade, porque as premissas são conjuntamente inconsistentes.'};
  const rule=freeArgumentRule(roots,mode);
  return {status:'valid',reason:(rule?rule+' ':'')+
    'Em todas as atribuições em que as premissas são V, a conclusão também é V. O argumento é válido.'};
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
  if(node.type==='truth')return 'verdade lógica (sempre verdadeiro)';
  if(node.type==='falsity')return 'falsidade lógica (sempre falso)';
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
        [...(input.domain||[]).map(d=>d.id),...names.filter((n,i)=>input.variables[i].kind==='individual')],
        {allowImplicitIndividuals:true});
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
          // Também persistem valores de indivíduos implícitos em q(p), sem cadastro no domínio.
          const knownIndividual=state.domain.some(d=>d.id===id)||
            state.variables.some(x=>x.name===id&&x.kind==='individual')||
            state.formulas.some(f=>predicateTerms(parseFreeFormula(state,f.source)).has(id));
          if(knownIndividual&&state.variables.some(x=>x.name===name&&x.kind!=='individual')&&
             (v==='V'||v==='F'))state.predicateValues[k]=v;
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
    // A conclusão do painel aposentado é integrada à tabela como a última
    // fórmula, em vez de desaparecer na migração dos projetos anteriores.
    if(state.inferenceConclusion&&freeTableKind(state)==='predicates'){
      const source=state.inferenceConclusion;
      if(state.formulas.length<MAX_PREDICATE_TABLE_FORMULAS){
        try{
          addFreeFormula(state,source);
          state.inferenceConclusion='';
          state.inferenceReport=null;
        }catch(error){
          if(!/já está cadastrada/.test(error.message))throw error;
          state.inferenceConclusion='';
          state.inferenceReport=null;
        }
      }
    }
    return state;
  }catch(error){
    if(strict)throw Error('Projeto inválido: '+error.message);
    return blankFreeTable();
  }
}
