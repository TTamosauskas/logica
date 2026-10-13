import test from 'node:test';
import assert from 'node:assert/strict';
import {v,A,O,I,not,truthRows,evalAst} from '../src/core/logic.js';
import {immediateOperands,relationOf,propositionalRelations,categoricalRelation,categoricalForm} from '../src/core/table-relations.js';
import {parsePredicateFormula} from '../src/core/free-predicates.js';

const p=v('p'),q=v('q'),r=v('r');
const vectors=nodes=>nodes.map(n=>truthRows(['p','q']).map(env=>!!evalAst(n,env)));
test('realça somente os componentes imediatos, nunca os ancestrais transitivos',()=>{
  const pq=A(p,q),root=I(pq,r);
  const cols=[p,q,pq,r,root].map(node=>({node}));
  assert.deepEqual(immediateOperands(cols,4),[2,3]);
  assert.deepEqual(immediateOperands(cols,2),[0,1]);
  assert.deepEqual(immediateOperands(cols,0),[]);
  const dup=[p,p,A(p,p)].map(node=>({node}));
  assert.deepEqual(immediateOperands(dup,2),[1]);
});
test('equivalência sempre exige vetores iguais em todas as interpretações',()=>{
  const a=I(p,q),b=O(not(p),q);
  assert.equal(relationOf(...vectors([a,b])).kind,'equivalent');
  const sample=[true,true],another=[true,false];
  assert.equal(relationOf(sample,another),null);
});
test('contradição requer inversão de valores em todas as linhas',()=>{
  assert.equal(relationOf(...vectors([A(p,q),not(A(p,q))])).kind,'contradictory');
  assert.equal(relationOf(...vectors([p,not(p)])).kind,'contradictory');
});
test('não confunde implicação proposicional com subalternação categórica',()=>{
  assert.equal(relationOf(...vectors([A(p,q),p])),null);
  assert.equal(relationOf(...vectors([p,A(p,q)])),null);
});
test('roxo contínuo indica contrariedade, roxo tracejado subcontrariedade',()=>{
  assert.equal(relationOf(...vectors([A(p,q),A(p,not(q))])).kind,'contrary');
  assert.equal(relationOf(...vectors([O(p,q),O(not(p),q)])).kind,'subcontrary');
});
test('não deduz contrariedade artificial quando uma coluna é constante',()=>{
  const absurd=A(p,not(p)),taut=O(p,not(p));
  assert.equal(relationOf(...vectors([p,absurd])),null);
  assert.equal(relationOf(...vectors([p,taut])),null);
});
test('só compara colunas corretas habilitadas, não entrega respostas incompletas',()=>{
  const nodes=[p,q,I(p,q),O(not(p),q)];
  const cols=nodes.map(node=>({node}));
  assert.ok(propositionalRelations(cols,['p','q'],index=>index<3).every(x=>x.a<3&&x.b<3));
  assert.equal(propositionalRelations(cols,['p','q'],index=>index<3).some(x=>x.a===2&&x.b===3),false);
  const relations=propositionalRelations(cols,['p','q'],()=>true);
  assert.ok(relations.some(x=>x.a===2&&x.b===3&&x.kind==='equivalent'));
  assert.equal(propositionalRelations(cols,['p','q'],()=>false).length,0);
});
test('quadrado A E I O: contradição incondicional, demais sob S não vazio',()=>{
  const a={kind:'all',a:'s',b:'p'},e={kind:'none',a:'s',b:'p'},i={kind:'some',a:'s',b:'p'},o={kind:'someNot',a:'s',b:'p'};
  assert.equal(categoricalRelation(a,o)?.kind,'contradictory');
  assert.equal(categoricalRelation(e,i)?.kind,'contradictory');
  for(const pair of [[a,e],[i,o],[a,i],[e,o]])assert.equal(categoricalRelation(...pair),null);
  assert.equal(categoricalRelation(a,e,{subjectNonempty:true})?.kind,'contrary');
  assert.equal(categoricalRelation(i,o,{subjectNonempty:true})?.kind,'subcontrary');
  assert.deepEqual(categoricalRelation(a,i,{subjectNonempty:true}),{kind:'subaltern',from:'a',to:'b'});
  assert.deepEqual(categoricalRelation(o,e,{subjectNonempty:true}),{kind:'subaltern',from:'b',to:'a'});
  assert.equal(categoricalRelation(a,{...o,a:'outro'}, {subjectNonempty:true}),null);
});
test('identifica A/E/I/O em quantificadores com predicados do mesmo sujeito',()=>{
  const parse=s=>parsePredicateFormula(s,['s','p'],[]);
  assert.equal(categoricalForm(parse('∀x(s(x) → p(x))')).kind,'all');
  assert.equal(categoricalForm(parse('∀x(s(x) → ¬p(x))')).kind,'none');
  assert.equal(categoricalForm(parse('¬∃x(s(x) ∧ p(x))')).kind,'none');
  assert.equal(categoricalForm(parse('∃x(s(x) ∧ p(x))')).kind,'some');
  assert.equal(categoricalForm(parse('∃x(s(x) ∧ ¬p(x))')).kind,'someNot');
  assert.equal(categoricalForm(parse('∀x(p(x) → s(x))')).a,'p');
  assert.equal(categoricalForm(parse('s(x)')),null);
  const cols=[parse('s(x)'),parse('p(x)'),parse('s(x) → p(x)'),parse('∀x(s(x) → p(x))')].map(node=>({node}));
  assert.deepEqual(immediateOperands(cols,2),[0,1]);
  assert.deepEqual(immediateOperands(cols,3),[2]);
});
