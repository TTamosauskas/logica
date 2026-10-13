/** Consequência lógica no fragmento monádico de primeira ordem, sem domínio cadastrado.
 * Domínio finito não vazio. A enumeração por tipos é completa para predicados unários
 * sem igualdade, funções ou relações binárias: basta representar cada tipo presente uma vez.
 * Limites explícitos mantêm a exploração síncrona rápida no navegador.
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
export function checkSymbolicInference(premises,conclusion){
  if(!Array.isArray(premises)||!premises.length||!conclusion)
    throw Error('Cadastre pelo menos uma premissa e uma conclusão.');
  const all=[...premises,conclusion],constantsSet=new Set();
  if(all.some(ast=>rootHasFreeX(ast)))
    throw Error('Feche a variável x com ∀x(...) ou ∃x(...).');
  all.forEach(ast=>collectConstants(ast,constantsSet));
  const predicates=[...predicateAtomicNames(all)].sort();
  const constants=[...constantsSet].sort();
  if(predicates.length>INFERENCE_MAX_PROPERTIES)
    throw Error('Verifique inferências com até três propriedades por vez.');
  if(constants.length>INFERENCE_MAX_CONSTANTS)
    throw Error('Verifique inferências com até dois indivíduos nomeados por vez.');
  const kinds=2**predicates.length;
  let checked=0,satisfiable=false;
  for(let active=1;active<(1<<kinds);active++){
    const types=Array.from({length:kinds},(_,j)=>j).filter(j=>active&(1<<j));
    const variants=types.length**constants.length;
    for(let n=0;n<variants;n++){
      const choices=[],digits=n;
      let temp=digits;
      for(let i=0;i<constants.length;i++){choices.push(types[temp%types.length]);temp=Math.floor(temp/types.length)}
      const candidate=model(types,constants,choices,predicates);
      checked++;
      if(!premises.every(ast=>evaluatePredicate(ast,candidate.domain,candidate.truth)))continue;
      satisfiable=true;
      if(!evaluatePredicate(conclusion,candidate.domain,candidate.truth)){
        const witnesses=constants.map((id,i)=>id+': '+typeText(choices[i],predicates));
        return {valid:false,satisfiable:true,checked,predicates,constants,
          counterexample:{types:types.map(t=>typeText(t,predicates)),individuals:witnesses},
          explanation:'Existe uma interpretação em que todas as premissas são verdadeiras e a conclusão é falsa.'};
      }
    }
  }
  return {valid:true,satisfiable,checked,predicates,constants,counterexample:null,
    explanation:satisfiable?'Não há interpretação com premissas verdadeiras e conclusão falsa.':
      'As premissas são incompatíveis entre si: não existe modelo que satisfaça todas.'};
}
