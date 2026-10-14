import test from 'node:test';
import assert from 'node:assert/strict';
import {blankFreeTable,addFreeVariable,editFreeVariable,addFreeFormula,
  addFreeIndividual,readFreeTable} from '../src/core/free-table.js';
import {freeIndividualModel} from '../src/core/free-individuals.js';
import {renderIndividualSets} from '../src/truth-venn.js';

const setup=()=>{
  const state=blankFreeTable();
  editFreeVariable(state,'p','p','Sócrates','individual');
  editFreeVariable(state,'q','q','x é homem');
  addFreeVariable(state,'r');
  editFreeVariable(state,'r','r','x é mortal');
  return state;
};

test('Sócrates aparece dentro do conjunto Homens quando q(p) é afirmada',()=>{
  const state=setup();
  addFreeFormula(state,'q(p)');
  const model=freeIndividualModel(state);
  assert.deepEqual(model.predicates,['q']);
  assert.equal(model.people[0].label,'Sócrates');
  assert.equal(model.people[0].values.q,'V');
  assert.equal(model.people[0].origins.q,'premissa');
  const html=renderIndividualSets(model);
  assert.match(html,/Homens/);
  assert.match(html,/Sócrates pertence a Homens/);
  assert.match(html,/truth-individual-person/);
  assert.doesNotMatch(html,/A definir:<\/strong> Sócrates/);
});

test('conclusão não é tomada como fato; universal como premissa deriva mortalidade',()=>{
  const state=setup();
  addFreeFormula(state,'q(p)');
  addFreeFormula(state,'∀x(q(x) → r(x))');
  let model=freeIndividualModel(state);
  assert.equal(model.people[0].values.q,'V');
  assert.equal(model.people[0].values.r,'');
  addFreeFormula(state,'r(p)');
  model=freeIndividualModel(state);
  assert.equal(model.people[0].values.r,'V');
  assert.equal(model.people[0].origins.r,'regra universal');
  assert.match(renderIndividualSets(model),/Mortais/);
});

test('negação de universal não atribui falso ao indivíduo nomeado',()=>{
  const state=setup();
  addFreeFormula(state,'q(p)');
  addFreeFormula(state,'¬∀x(q(x) → r(x))');
  addFreeFormula(state,'¬r(p)');
  const model=freeIndividualModel(state);
  assert.equal(model.people[0].values.q,'V');
  assert.equal(model.people[0].values.r,'');
  assert.match(renderIndividualSets(model),/A definir/);
});

test('valores manuais persistem para indivíduos usados em fórmulas',()=>{
  const state=setup();
  addFreeFormula(state,'q(p)');
  state.predicateValues['p|r']='F';
  const read=readFreeTable(JSON.stringify(state),{strict:true});
  assert.equal(read.predicateValues['p|r'],'F');
  assert.equal(freeIndividualModel(read).people[0].values.r,'F');
});

test('detecta quando um valor manual contradiz premissas',()=>{
  const state=setup();
  addFreeFormula(state,'q(p)');
  addFreeFormula(state,'∀x(q(x) → r(x))');
  addFreeFormula(state,'r(p)');
  state.predicateValues['p|r']='F';
  const model=freeIndividualModel(state);
  assert.equal(model.people[0].values.r,'');
  assert.ok(model.conflicts.length>0);
  assert.match(renderIndividualSets(model),/Conflito entre valores informados e premissas/);
});

test('permite inserir indivíduos extras com pertinência inicialmente indefinida',()=>{
  const state=setup();
  addFreeIndividual(state,'s','Uma pedra');
  addFreeFormula(state,'q(p)');
  const model=freeIndividualModel(state);
  assert.equal(model.people.find(p=>p.id==='s').values.q,'');
  assert.match(renderIndividualSets(model),/A definir/);
});

test('escapa rótulos fornecidos pelo usuário no SVG e na descrição',()=>{
  const html=renderIndividualSets({predicates:['q'],people:[{
    id:'p',label:'<script>alert(1)</script>',values:{q:'V'},origins:{q:'informado'}
  }],meanings:{q:'x é homem'}});
  assert.doesNotMatch(html,/<script>/);
  assert.match(html,/&lt;script&gt;/);
});
