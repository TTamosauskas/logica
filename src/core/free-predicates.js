/** Lógica de predicados unários em domínio finito para a Tabela Livre. */
import {SYMBOLS} from './logic.js';

const binary={and:3,or:2,xor:2,implies:1,iff:0};
const spell={and:'e',or:'ou',xor:'ou exclusivamente',implies:'se',iff:'se, e somente se,'};
const replacements=[['<->','iff'],['↔','iff'],['->','implies'],['=>','implies'],['→','implies'],['&&','and'],['∧','and'],['&','and'],['||','or'],['∨','or'],['|','or'],['⊕','xor'],['^','xor'],['¬','not'],['!','not'],['~','not'],['∀','forall'],['∃!','existsUnique'],['∃','exists'],['⊤','truth'],['⊥','falsity'],['(', '('],[')',')']];
export function predicateTokens(input){
  const s=String(input||'').toLowerCase(),out=[];
  if(/[∴∵]/.test(s))throw Error('∴ (portanto) e ∵ (porque) indicam etapas do argumento, não são conectivos de fórmulas. A última fórmula da Tabela Livre é a conclusão.');
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

export function parsePredicateFormula(source,variables,individuals,{allowImplicitIndividuals=false}={}){
  const list=predicateTokens(source),names=new Set(variables),constants=new Set(individuals);
  if(list.filter(t=>['forall','exists','existsUnique'].includes(t.type)).length>2)
    throw Error('Use no máximo dois quantificadores por fórmula nesta versão.');
  let pos=0;
  const peek=()=>list[pos],consume=type=>peek()?.type===type?(pos++,true):false;
  const expect=(type,message)=>{if(!consume(type))throw Error(message)};
  function primary(){
    if(consume('not'))return {type:'not',a:primary()};
    if(consume('truth'))return {type:'truth'};
    if(consume('falsity'))return {type:'falsity'};
    if(['forall','exists','existsUnique'].includes(peek()?.type)){
      const kind=list[pos++].type,binder=list[pos++];
      if(binder?.type!=='name'||binder.value!=='x')throw Error('Use x como variável ligada ao quantificador.');
      expect('(','Após ∀x, ∃x ou ∃!x, abra parênteses.');
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
    // Na Tabela Livre, q(p) identifica p como constante pelo lugar que ocupa.
    // A API estrita continua disponível a outros consumidores do parser.
    if(arg?.type!=='name'||(arg.value!=='x'&&!constants.has(arg.value)&&!allowImplicitIndividuals))
      throw Error('Use x ou um símbolo de indivíduo, como p ou s.');
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
    if(['forall','exists','existsUnique'].includes(node.type))return validate(node.a,true);
    if(node.a)validate(node.a,scope);
    if(node.b)validate(node.b,scope);
  }
  validate(root);
  return root;
}
export function rootHasFreeX(node,bound=false){
  if(node.type==='pred')return node.term==='x'&&!bound;
  if(['forall','exists','existsUnique'].includes(node.type))return rootHasFreeX(node.a,true);
  return Boolean((node.a&&rootHasFreeX(node.a,bound))||(node.b&&rootHasFreeX(node.b,bound)));
}
export function hasQuantifier(node){
  return ['forall','exists','existsUnique'].includes(node.type)||
    Boolean((node.a&&hasQuantifier(node.a))||(node.b&&hasQuantifier(node.b)));
}
export const predicateSignature=node=>node.type==='pred'?'p('+node.name+','+node.term+')':
  node.type==='truth'?'T':node.type==='falsity'?'F':
  node.type==='not'?'!'+predicateSignature(node.a):
  ['forall','exists','existsUnique'].includes(node.type)?node.type+'('+predicateSignature(node.a)+')':
  node.type+'('+predicateSignature(node.a)+','+predicateSignature(node.b)+')';
export function predicatePretty(node){
  if(node.type==='pred')return node.name+'('+node.term+')';
  if(node.type==='truth')return '⊤';
  if(node.type==='falsity')return '⊥';
  if(node.type==='not')return '¬'+(node.a.type==='pred'||node.a.type==='truth'||node.a.type==='falsity'||node.a.type==='not'?predicatePretty(node.a):'('+predicatePretty(node.a)+')');
  if(['forall','exists','existsUnique'].includes(node.type))return (node.type==='forall'?'∀':node.type==='existsUnique'?'∃!':'∃')+'x('+predicatePretty(node.a)+')';
  return '('+predicatePretty(node.a)+' '+SYMBOLS[node.type]+' '+predicatePretty(node.b)+')';
}
export function predicateSteps(roots){
  const steps=[],seen=new Set(),rootKeys=new Set(roots.map(predicateSignature));
  function walk(node){
    if(node.type==='pred'||node.type==='truth'||node.type==='falsity')return;
    if(node.a)walk(node.a);
    if(node.b)walk(node.b);
    if(hasQuantifier(node))return;
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
      if(who===null||(!domain.some(d=>d.id===who)&&!Object.hasOwn(truth,who+'|'+node.name)))throw Error('Indivíduo não encontrado.');
      const value=truth[who+'|'+node.name];
      if(value!=='V'&&value!=='F')throw Error('Preencha os predicados do domínio antes de conferir.');
      return value==='V';
    }
    case 'truth':return true;
    case 'falsity':return false;
    case 'not':return !evaluatePredicate(node.a,domain,truth,subject);
    case 'and':return evaluatePredicate(node.a,domain,truth,subject)&&evaluatePredicate(node.b,domain,truth,subject);
    case 'or':return evaluatePredicate(node.a,domain,truth,subject)||evaluatePredicate(node.b,domain,truth,subject);
    case 'xor':return evaluatePredicate(node.a,domain,truth,subject)!==evaluatePredicate(node.b,domain,truth,subject);
    case 'implies':return !evaluatePredicate(node.a,domain,truth,subject)||evaluatePredicate(node.b,domain,truth,subject);
    case 'iff':return evaluatePredicate(node.a,domain,truth,subject)===evaluatePredicate(node.b,domain,truth,subject);
    case 'forall':return domain.every(ind=>evaluatePredicate(node.a,domain,truth,ind.id));
    case 'exists':return domain.some(ind=>evaluatePredicate(node.a,domain,truth,ind.id));
    case 'existsUnique':return domain.filter(ind=>evaluatePredicate(node.a,domain,truth,ind.id)).length===1;
    default:throw Error('Expressão não reconhecida.');
  }
}
export function predicateReading(node,meanings,individualNames={}){
  if(node.type==='truth')return 'verdade lógica (sempre verdadeiro)';
  if(node.type==='falsity')return 'falsidade lógica (sempre falso)';
  if(node.type==='pred'){
    const text=meanings[node.name]||node.name;
    const who=node.term==='x'?'x':individualNames[node.term]||node.term;
    if(/\bx\b/i.test(text))return text.replace(/\bx\b/gi,who);
    const lowered=text.charAt(0).toLowerCase()+text.slice(1);
    return who+' '+(/^(é|são|está|estão|foi|tem|possui|faz|era|será)\b/i.test(text)?lowered:'é '+lowered);
  }
  if(node.type==='not'&&node.a.type==='exists')return 'nenhum indivíduo do domínio satisfaz: '+predicateReading(node.a.a,meanings,individualNames);
  if(node.type==='not')return 'não é verdade que ('+predicateReading(node.a,meanings,individualNames)+')';
  if(node.type==='forall')return 'para todo indivíduo x, '+predicateReading(node.a,meanings,individualNames);
  if(node.type==='exists')return 'existe ao menos um indivíduo x para o qual '+predicateReading(node.a,meanings,individualNames);
  if(node.type==='existsUnique')return 'existe exatamente um indivíduo x para o qual '+predicateReading(node.a,meanings,individualNames);
  const a=predicateReading(node.a,meanings,individualNames),b=predicateReading(node.b,meanings,individualNames);
  if(node.type==='implies')return 'se ('+a+'), então ('+b+')';
  if(node.type==='iff')return '('+a+') se, e somente se, ('+b+')';
  if(node.type==='xor')return 'ou ('+a+') ou ('+b+'), mas não ambos';
  return '('+a+') '+(spell[node.type]||node.type)+' ('+b+')';
}
export function predicateEvidence(node,domain,truth){
  const quantified=node.type==='not'&&['forall','exists','existsUnique'].includes(node.a.type)?node.a:
    ['forall','exists','existsUnique'].includes(node.type)?node:null;
  if(!quantified)return '';
  const matches=domain.filter(d=>evaluatePredicate(quantified.a,domain,truth,d.id));
  if(quantified.type==='existsUnique')return matches.length===1?'Única testemunha: '+(matches[0].label||matches[0].id)+'.':
    matches.length===0?'Não há testemunha entre os indivíduos cadastrados.':
    'Há '+matches.length+' testemunhas; a exigência de unicidade falha.';
  if(quantified.type==='forall'){
    const counter=domain.find(d=>!matches.includes(d));
    return counter?'Contraexemplo: '+(counter.label||counter.id)+'.':'A condição vale para todos os indivíduos cadastrados.';
  }
  return matches.length?'Testemunha: '+(matches[0].label||matches[0].id)+'.':
    'Não há testemunha entre os indivíduos cadastrados.';
}
