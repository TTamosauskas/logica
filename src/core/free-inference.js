/** Análise finita completa de predicados unários sem igualdade, funções ou relações binárias.
 * Em domínios não vazios, basta considerar cada tipo presente uma vez.
 */
import {evaluatePredicate,predicateAtomicNames,rootHasFreeX} from './free-predicates.js';

export const INFERENCE_MAX_PROPERTIES=3;
export const INFERENCE_MAX_CONSTANTS=2;

function collectConstants(node,output){
  if(node.type==='pred'&&node.term!=='x')output.add(node.term);
  if(node.a)collectConstants(node.a,output);
  if(node.b)collectConstants(node.b,output);
}
function model(types,constants,choices,predicates){
  const domain=[],truth={};
  function register(id,type,label){
    domain.push({id,label});
    predicates.forEach((name,j)=>truth[id+'|'+name]=(type&(1<<j))?'V':'F');
  }
  types.forEach((type,i)=>register('_modelo'+i,type,'Elemento '+(i+1)));
  constants.forEach((id,i)=>register(id,choices[i],id));
  return {domain,truth};
}
function typeText(type,predicates){
  return predicates.map((name,j)=>name+'='+(type&(1<<j)?'V':'F')).join(', ');
}
/** Enumera um modelo representativo de cada interpretação possível no fragmento. */
function visitModels(nodes,visitor,extraPredicates=[]){
  const constantsSet=new Set();
  if(nodes.some(ast=>rootHasFreeX(ast)))
    throw Error('Feche a variável x com ∀x(...) ou ∃x(...).');
  nodes.forEach(ast=>collectConstants(ast,constantsSet));
  const predicates=[...new Set([...predicateAtomicNames(nodes),...extraPredicates])].sort();
  const constants=[...constantsSet].sort();
  if(predicates.length>INFERENCE_MAX_PROPERTIES)
    throw Error('Verifique inferências com até três propriedades por vez.');
  if(constants.length>INFERENCE_MAX_CONSTANTS)
    throw Error('Verifique inferências com até dois indivíduos nomeados por vez.');
  const kinds=2**predicates.length;
  let checked=0;
  for(let active=1;active<(1<<kinds);active++){
    const types=Array.from({length:kinds},(_,j)=>j).filter(j=>active&(1<<j));
    const variants=types.length**constants.length;
    for(let n=0;n<variants;n++){
      const choices=[];
      let temp=n;
      for(let i=0;i<constants.length;i++){
        choices.push(types[temp%types.length]);temp=Math.floor(temp/types.length);
      }
      const candidate=model(types,constants,choices,predicates);
      checked++;
      const result=visitor(candidate,{types,constants,choices,predicates});
      if(result)return {checked,predicates,constants,result};
    }
  }
  return {checked,predicates,constants,result:null};
}
function describeModel(context){
  const {types,constants,choices,predicates}=context;
  const typesText=types.map(t=>typeText(t,predicates)).join(' | ');
  const individuals=constants.map((id,i)=>id+': '+typeText(choices[i],predicates));
  return {types:types.map(t=>typeText(t,predicates)),individuals,
    summary:'Tipos no domínio: '+(typesText||'sem propriedades')+
      (individuals.length?'. Indivíduos: '+individuals.join('; '):'')};
}
export function analyzePredicateCombinations(expressions){
  const witnesses=new Map(),limit=2**expressions.length;
  const scan=visitModels(expressions,(candidate,context)=>{
    const bits=expressions.reduce((acc,node)=>
      (acc<<1)|(evaluatePredicate(node,candidate.domain,candidate.truth)?1:0),0);
    if(!witnesses.has(bits))witnesses.set(bits,describeModel(context));
    return witnesses.size===limit;
  });
  return {checked:scan.checked,witnesses,properties:scan.predicates,constants:scan.constants};
}
/** Regiões do Venn impossíveis em qualquer modelo que satisfaça as premissas. */
export function analyzePredicateRegions(premises,variables,filters={}){
  const shown=variables.slice(0,3),fixed=variables.slice(3);
  if(!shown.length)return {status:'undetermined',reason:'Não há predicados para representar.'};
  try{
    const viable=new Set();
    let premisesSatisfiable=false;
    const scan=visitModels(premises,candidate=>{
      if(!premises.every(node=>evaluatePredicate(node,candidate.domain,candidate.truth)))return false;
      premisesSatisfiable=true;
      for(const person of candidate.domain){
        if(fixed.some(name=>candidate.truth[person.id+'|'+name]!==(
          filters[name]==='F'?'F':'V')))continue;
        const mask=shown.reduce((value,name)=>
          (value<<1)|(candidate.truth[person.id+'|'+name]==='V'?1:0),0);
        viable.add(mask);
      }
      return viable.size===2**shown.length;
    },variables);
    if(!premisesSatisfiable)
      return {status:'inconsistent',reason:'As premissas não possuem modelo; não se pode interpretar o Venn como um domínio possível.'};
    return {status:'complete',checked:scan.checked,
      impossibleMasks:Array.from({length:2**shown.length},(_,i)=>i).filter(i=>!viable.has(i))};
  }catch(error){return {status:'undetermined',reason:error.message}}
}
/** As fórmulas cadastradas são premissas; busca um contraexemplo em todos os modelos. */
export function checkSymbolicInference(premises,conclusion){
  if(!Array.isArray(premises)||!premises.length||!conclusion)
    throw Error('Cadastre pelo menos uma premissa e uma conclusão.');
  let satisfiable=false;
  const scan=visitModels([...premises,conclusion],(candidate,context)=>{
    if(!premises.every(ast=>evaluatePredicate(ast,candidate.domain,candidate.truth)))return false;
    satisfiable=true;
    if(!evaluatePredicate(conclusion,candidate.domain,candidate.truth))
      return describeModel(context);
    return false;
  });
  const {checked,predicates,constants,result}=scan;
  if(result){
    const {types,individuals}=result;
    return {valid:false,satisfiable:true,checked,predicates,constants,
      counterexample:{types,individuals},
      explanation:'Existe uma interpretação em que todas as premissas são verdadeiras e a conclusão é falsa.'};
  }
  return {valid:true,satisfiable,checked,predicates,constants,counterexample:null,
    explanation:satisfiable?'Não há interpretação com premissas verdadeiras e conclusão falsa.':
      'As premissas são incompatíveis entre si: não existe modelo que satisfaça todas.'};
}
