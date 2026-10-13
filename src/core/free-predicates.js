/** Lógica de predicados unários em domínio finito para a Tabela Livre. */
import {SYMBOLS} from './logic.js';

const binary={and:3,or:2,xor:2,implies:1,iff:0};
const spell={and:'e',or:'ou',xor:'ou exclusivamente',implies:'se',iff:'se, e somente se,'};
const replacements=[['<->','iff'],['↔','iff'],['->','implies'],['=>','implies'],['→','implies'],['&&','and'],['∧','and'],['&','and'],['||','or'],['∨','or'],['|','or'],['⊕','xor'],['^','xor'],['¬','not'],['!','not'],['~','not'],['∀','forall'],['∃','exists'],['(', '('],[')',')']];
export function predicateTokens(input){
  const s=String(input||'').toLowerCase(),out=[];
  for(let i=0;i<s.length;){
    if(/\s/.test(s[i])){i++;continue}
    const match=replacements.find(([value])=>s.startsWith(value,i));
    if(match){out.push({type:match[1],value:match[0]});i+=match[0].length;continue}
    const word=/^[a-z][a-z0-9_]*/.exec(s.slice(i));
    if(word){
      const aliases={e:'and',ou:'or',xor:'xor',nao:'not',se:'implies',sse:'iff'};
      out.push({type:aliases[word[0]]||'name',value:word[0]});
      i+=word[0].length;continue;
    }
    throw Error('Símbolo não reconhecido: '+s[i]+'.');
  }
  return out;
}
export const isPredicateSource=source=>/[∀∃]|\b[a-z]\s*\(/i.test(String(source||''));

export function parsePredicateFormula(source,variables,individuals){
  const list=predicateTokens(source),names=new Set(variables),constants=new Set(individuals);
  let pos=0;
  const peek=()=>list[pos],consume=type=>peek()?.type===type?(pos++,true):false;
  const expect=(type,message)=>{if(!consume(type))throw Error(message)};
  function primary(){
    if(consume('not'))return {type:'not',a:primary()};
    if(peek()?.type==='forall'||peek()?.type==='exists'){
      const kind=list[pos++].type,binder=list[pos++];
      if(binder?.type!=='name'||binder.value!=='x')throw Error('Use x como variável ligada ao quantificador.');
      expect('(','Após ∀x ou ∃x, abra parênteses.');
      const body=expression(0);
      expect(')','Feche os parênteses do quantificador.');
      return {type:kind,binder:'x',a:body};
    }
    if(consume('(')){
      const inner=expression(0);expect(')','Feche o parêntese da expressão.');return inner;
    }
    const name=list[pos++];
    if(name?.type!=='name'||!names.has(name.value))throw Error('Use um predicado cadastrado (p, q, r, s, t ou u).');
    expect('(','Predicados precisam de argumento, como p(x) ou p(s).');
    const arg=list[pos++];
    if(arg?.type!=='name'||(arg.value!=='x'&&!constants.has(arg.value)))throw Error('Use x ou o símbolo de um indivíduo cadastrado.');
    expect(')','Feche os parênteses do predicado.');
    return {type:'pred',name:name.value,term:arg.value};
  }
  function expression(min){
    let left=primary();
    while(binary[peek()?.type]!==undefined&&binary[peek()?.type]>=min){
      const type=list[pos++].type,prec=binary[type];
      const right=expression(type==='implies'?prec:prec+1);
      left={type,a:left,b:right};
    }
    return left;
  }
  if(!list.length)throw Error('Digite uma fórmula.');
  const root=expression(0);
  if(pos<list.length)throw Error('Confira o trecho '+list[pos].value+'.');
  function validate(node,scope=false){
    if(node.type==='pred'){
      if(node.term==='x'&&!scope&&!rootHasFreeX(root))return;
      return;
    }
    if(node.type==='forall'||node.type==='exists')return validate(node.a,true);
    if(node.a)validate(node.a,scope);
    if(node.b)validate(node.b,scope);
  }
  validate(root);
  return root;
}
export function rootHasFreeX(node,bound=false){
  if(node.type==='pred')return node.term==='x'&&!bound;
  if(node.type==='forall'||node.type==='exists')return rootHasFreeX(node.a,true);
  return Boolean((node.a&&rootHasFreeX(node.a,bound))||(node.b&&rootHasFreeX(node.b,bound)));
}
export function hasQuantifier(node){
  return node.type==='forall'||node.type==='exists'||
    Boolean((node.a&&hasQuantifier(node.a))||(node.b&&hasQuantifier(node.b)));
}
export const predicateSignature=node=>node.type==='pred'?'p('+node.name+','+node.term+')':
  node.type==='not'?'!'+predicateSignature(node.a):
  node.type==='forall'||node.type==='exists'?node.type+'('+predicateSignature(node.a)+')':
  node.type+'('+predicateSignature(node.a)+','+predicateSignature(node.b)+')';
export function predicatePretty(node){
  if(node.type==='pred')return node.name+'('+node.term+')';
  if(node.type==='not')return '¬'+(node.a.type==='pred'||node.a.type==='not'?predicatePretty(node.a):'('+predicatePretty(node.a)+')');
  if(node.type==='forall'||node.type==='exists')return (node.type==='forall'?'∀':'∃')+'x('+predicatePretty(node.a)+')';
  return '('+predicatePretty(node.a)+' '+SYMBOLS[node.type]+' '+predicatePretty(node.b)+')';
}
export function predicateSteps(roots){
  const steps=[],seen=new Set(),rootKeys=new Set(roots.map(predicateSignature));
  function walk(node){
    if(node.type==='pred')return;
    if(node.a)walk(node.a);
    if(node.b)walk(node.b);
    if(node.type==='forall'||node.type==='exists'||hasQuantifier(node))return;
    const key=predicateSignature(node);
    if(!seen.has(key)&&!rootKeys.has(key)){steps.push(node);seen.add(key)}
  }
  roots.forEach(walk);
  return steps;
}
export function predicateAtomicNames(nodes){
  const used=new Set();
  const walk=n=>{if(n.type==='pred')used.add(n.name);else{if(n.a)walk(n.a);if(n.b)walk(n.b)}};
  nodes.forEach(walk);return used;
}
export function evaluatePredicate(node,domain,truth,subject=null){
  switch(node.type){
    case 'pred':{
      const who=node.term==='x'?subject:node.term;
      if(who===null||!domain.some(d=>d.id===who))throw Error('Indivíduo não encontrado.');
      const value=truth[who+'|'+node.name];
      if(value!=='V'&&value!=='F')throw Error('Preencha os predicados do domínio antes de conferir.');
      return value==='V';
    }
    case 'not':return !evaluatePredicate(node.a,domain,truth,subject);
    case 'and':return evaluatePredicate(node.a,domain,truth,subject)&&evaluatePredicate(node.b,domain,truth,subject);
    case 'or':return evaluatePredicate(node.a,domain,truth,subject)||evaluatePredicate(node.b,domain,truth,subject);
    case 'xor':return evaluatePredicate(node.a,domain,truth,subject)!==evaluatePredicate(node.b,domain,truth,subject);
    case 'implies':return !evaluatePredicate(node.a,domain,truth,subject)||evaluatePredicate(node.b,domain,truth,subject);
    case 'iff':return evaluatePredicate(node.a,domain,truth,subject)===evaluatePredicate(node.b,domain,truth,subject);
    case 'forall':return domain.every(ind=>evaluatePredicate(node.a,domain,truth,ind.id));
    case 'exists':return domain.some(ind=>evaluatePredicate(node.a,domain,truth,ind.id));
    default:throw Error('Expressão não reconhecida.');
  }
}
export function predicateReading(node,meanings){
  if(node.type==='pred')return meanings[node.name]||node.name+'('+node.term+')';
  if(node.type==='not')return 'não é verdade que ('+predicateReading(node.a,meanings)+')';
  if(node.type==='forall')return 'para todo indivíduo x, '+predicateReading(node.a,meanings);
  if(node.type==='exists')return 'existe ao menos um indivíduo x para o qual '+predicateReading(node.a,meanings);
  const a=predicateReading(node.a,meanings),b=predicateReading(node.b,meanings);
  if(node.type==='implies')return 'se ('+a+'), então ('+b+')';
  if(node.type==='iff')return '('+a+') se, e somente se, ('+b+')';
  if(node.type==='xor')return 'ou ('+a+') ou ('+b+'), mas não ambos';
  return '('+a+') '+(spell[node.type]||node.type)+' ('+b+')';
}
export function predicateEvidence(node,domain,truth){
  const quantified=node.type==='not'&&['forall','exists'].includes(node.a.type)?node.a:
    ['forall','exists'].includes(node.type)?node:null;
  if(!quantified)return '';
  const matches=domain.filter(d=>evaluatePredicate(quantified.a,domain,truth,d.id));
  if(quantified.type==='forall'){
    const counter=domain.find(d=>!matches.includes(d));
    return counter?'Contraexemplo: '+(counter.label||counter.id)+'.':'A condição vale para todos os indivíduos cadastrados.';
  }
  return matches.length?'Testemunha: '+(matches[0].label||matches[0].id)+'.':
    'Não há testemunha entre os indivíduos cadastrados.';
}
