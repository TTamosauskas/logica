/** Exemplos individuais na Tabela Livre. Não confundir com linhas V/F de fórmulas. */
import {parseFreeFormula} from './free-table.js';
import {predicateAtomicNames} from './free-predicates.js';

const truth=value=>value==='V'||value==='F'?value:'';
const atom=node=>{
  if(node?.type==='pred')return {name:node.name,term:node.term,value:'V'};
  if(node?.type==='not'&&node.a?.type==='pred')
    return {name:node.a.name,term:node.a.term,value:'F'};
  return null;
};
const key=(person,predicate)=>person+'|'+predicate;

/** Identifica indivíduos e propriedades e deduz apenas pertinências justificadas.
 * Fórmulas anteriores à última são premissas quando há ao menos duas;
 * com apenas uma fórmula, ela pode fornecer um fato atômico ao exemplo.
 * Nenhuma conclusão é assumida verdadeira. Universais negativas não identificam testemunhas.
 */
export function freeIndividualModel(state){
  const roots=state.formulas.map(f=>parseFreeFormula(state,f.source));
  const predicates=[...predicateAtomicNames(roots)];
  if(!predicates.length)predicates.push(...state.variables
    .filter(v=>v.kind!=='individual').map(v=>v.name));
  const people=new Map();
  for(const d of state.domain||[])people.set(d.id,{id:d.id,label:d.label||d.id});
  for(const v of state.variables||[]){
    if(v.kind==='individual'&&!people.has(v.name))
      people.set(v.name,{id:v.name,label:v.meaning||v.name});
  }
  const collect=node=>{
    if(node?.type==='pred'&&node.term!=='x'&&!people.has(node.term))
      people.set(node.term,{id:node.term,label:node.term});
    if(node?.a)collect(node.a);
    if(node?.b)collect(node.b);
  };
  roots.forEach(collect);
  const persons=[...people.values()];
  const premises=roots.length>=2?roots.slice(0,-1):roots;
  const rules=[];
  const assignments=new Map();
  const record=(id,name,value,origin)=>{
    if(!people.has(id)||!predicates.includes(name))return false;
    const k=key(id,name),current=assignments.get(k)||new Map();
    const existing=current.get(value);
    if(existing)return false;
    current.set(value,origin);assignments.set(k,current);
    return true;
  };
  for(const p of persons)for(const name of predicates){
    const val=truth(state.predicateValues?.[key(p.id,name)]);
    if(val)record(p.id,name,val,'informado');
  }
  for(const root of premises){
    const a=atom(root);
    if(a&&a.term!=='x')record(a.term,a.name,a.value,'premissa');
    if(root.type!=='forall')continue;
    const unit=atom(root.a);
    if(unit?.term==='x'){
      for(const person of persons)record(person.id,unit.name,unit.value,'regra universal');
      continue;
    }
    if(root.a?.type==='implies'){
      const antecedent=atom(root.a.a),consequent=atom(root.a.b);
      if(antecedent?.term==='x'&&consequent?.term==='x')
        rules.push({antecedent,consequent});
    }
  }
  const resolved=(id,name)=>{
    const values=assignments.get(key(id,name));
    return values?.size===1?[...values.keys()][0]:'';
  };
  let dirty=true;
  for(let steps=0;dirty&&steps<persons.length*predicates.length+1;steps++){
    dirty=false;
    for(const p of persons)for(const {antecedent,consequent} of rules){
      if(resolved(p.id,antecedent.name)===antecedent.value)
        dirty=record(p.id,consequent.name,consequent.value,'regra universal')||dirty;
    }
  }
  const conflicts=[];
  const entries=persons.map(person=>{
    const values={},origins={};
    for(const name of predicates){
      const options=assignments.get(key(person.id,name));
      values[name]=options?.size===1?[...options.keys()][0]:'';
      origins[name]=options?.size===1?[...options.values()][0]:'';
      if(options?.size>1)conflicts.push(person.label+': '+name+' está marcado como verdadeiro e falso.');
    }
    return {...person,values,origins};
  });
  return {predicates,people:entries,conflicts,
    meanings:Object.fromEntries(predicates.map(name=>[
      name,state.variables.find(v=>v.name===name)?.meaning||''
    ]))};
}
