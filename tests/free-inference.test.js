import test from 'node:test';
import assert from 'node:assert/strict';
import {blankFreeTable,addFreeVariable,addFreeFormula,editFreeVariable,parseFreeFormula,
  verifyFreeInference,readFreeTable,freeRows,gradeFreeTable,removeFreeVariable,addFreeIndividual} from '../src/core/free-table.js';

function socrates(){
  const state=blankFreeTable();
  addFreeVariable(state,'r','mortal');
  editFreeVariable(state,'p','p','Sócrates','individual');
  editFreeVariable(state,'q','q','homem','predicate');
  addFreeFormula(state,'q(p)');
  addFreeFormula(state,'∀x(q(x) → r(x))');
  return state;
}
test('deduz Sócrates mortal sem cadastrar domínio nem predicados V/F',()=>{
  const state=socrates();
  assert.equal(state.domain.length,0);
  const result=verifyFreeInference(state,'r(p)');
  assert.equal(result.valid,true);
  assert.equal(result.satisfiable,true);
  assert.ok(result.checked>0);
  assert.deepEqual(result.constants,['p']);
  assert.deepEqual(result.predicates,['q','r']);
  assert.equal(state.inferenceConclusion,'r(p)');
});
test('silogismos categóricos universais são válidos sem nomes individuais',()=>{
  const state=blankFreeTable();
  addFreeVariable(state,'r','animal');
  addFreeFormula(state,'∀x(p(x) → q(x))');
  addFreeFormula(state,'∀x(q(x) → r(x))');
  const result=verifyFreeInference(state,'∀x(p(x) → r(x))');
  assert.equal(result.valid,true);
  assert.equal(result.satisfiable,true);
});
test('Todos não implica Alguns quando a classe é vazia',()=>{
  const state=blankFreeTable();
  addFreeFormula(state,'∀x(p(x) → q(x))');
  const report=verifyFreeInference(state,'∃x(p(x) ∧ q(x))');
  assert.equal(report.valid,false);
  assert.ok(report.counterexample);
  assert.ok(report.counterexample.types.length>0);
});
test('contraexemplo com indivíduo nomeado refuta conclusão indevida',()=>{
  const state=socrates();
  const report=verifyFreeInference(state,'q(p) → ∀x(r(x) → q(x))');
  assert.equal(report.valid,false);
  assert.ok(report.counterexample.individuals.some(x=>x.startsWith('p:')));
});
test('premissas contraditórias não sustentam uma conclusão substantiva',()=>{
  const state=socrates();
  addFreeFormula(state,'¬q(p)');
  const report=verifyFreeInference(state,'r(p)');
  assert.equal(report.valid,true);
  assert.equal(report.satisfiable,false);
  assert.match(report.explanation,/incompatíveis/);
});
test('papéis inválidos são rejeitados e domínio continua opcional',()=>{
  const state=socrates();
  assert.throws(()=>editFreeVariable(state,'q','q','homem','individual'),/predicado cadastrado/);
  assert.throws(()=>parseFreeFormula(state,'p(x)'),/predicado cadastrado/);
  assert.throws(()=>parseFreeFormula(state,'q(s)'),/indivíduo cadastrado/);
  assert.throws(()=>verifyFreeInference(state,'r(x)'),/Feche a variável/);
  assert.equal(freeRows(state).length,4);
  assert.equal(gradeFreeTable(state).total,4);
});
test('papéis, premissas e conclusão persistem após recarregar',()=>{
  const state=socrates();
  const report=verifyFreeInference(state,'r(p)');
  const restored=readFreeTable(JSON.stringify(state),{strict:true});
  assert.equal(restored.version,4);
  assert.equal(restored.variables[0].kind,'individual');
  assert.equal(restored.variables[0].meaning,'Sócrates');
  assert.equal(restored.inferenceConclusion,'');
  assert.equal(restored.formulas.at(-1).source,'r(p)');
  assert.equal(restored.inferenceReport,null);
  assert.equal(restored.domain.length,0);
});
test('não permite excluir a constante usada como argumento nem duplicar símbolos do domínio',()=>{
  const state=blankFreeTable();
  addFreeVariable(state,'r');
  editFreeVariable(state,'r','r','Sócrates','individual');
  addFreeFormula(state,'q(r)');
  assert.throws(()=>state.variables.length>2&&removeLast(state),/Remova ou edite/);
  assert.throws(()=>editFreeVariable(state,'q','q','homem','individual'),/predicado cadastrado/);
});
function removeLast(state){return removeFreeVariable(state,'r')}
test('limites do verificador são explícitos para não sobrecarregar a página',()=>{
  const state=blankFreeTable();
  for(const name of ['r','s'])addFreeVariable(state,name);
  for(const name of ['p','q','r','s'])addFreeFormula(state,'∀x('+name+'(x))');
  assert.throws(()=>verifyFreeInference(state,'∀x(p(x))'),/até três propriedades/);
});
