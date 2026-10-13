import test from 'node:test';
import assert from 'node:assert/strict';
import {parsePredicateFormula} from '../src/core/free-predicates.js';
import {blankFreeTable,addFreeFormula,addFreeIndividual,addFreeVariable,
  editFreeVariable,editFreeFormula,parseFreeFormula,freeRows,
  freeColumns,predicateTruthAnalysis,readFreeTable} from '../src/core/free-table.js';

test('q(p) funciona sem x nem cadastro; p passa automaticamente a indivíduo',()=>{
  const state=blankFreeTable();
  state.variables[0].meaning='Sócrates';
  state.variables[1].meaning='homem';
  addFreeFormula(state,'q(p)');
  assert.equal(state.variables[0].kind,'individual');
  assert.equal(state.variables[1].kind,'predicate');
  assert.equal(state.domain.length,0);
  assert.deepEqual(parseFreeFormula(state,'q(p)'),{type:'pred',name:'q',term:'p'});
  assert.equal(freeRows(state).length,2);
  assert.equal(freeColumns(state).at(-1).label,'¬A');
  const restored=readFreeTable(JSON.stringify(state),{strict:true});
  assert.equal(restored.variables[0].kind,'individual');
  assert.equal(restored.formulas[0].source,'q(p)');
  assert.equal(restored.variables[0].meaning,'Sócrates');
});

test('q(s) aceita constante ainda não cadastrada e continua válido após recarregar',()=>{
  const state=blankFreeTable();
  addFreeFormula(state,'q(s)');
  assert.equal(state.domain.length,0);
  assert.equal(state.formulas.length,1);
  const restored=readFreeTable(JSON.stringify(state),{strict:true});
  assert.equal(restored.formulas[0].source,'q(s)');
  assert.equal(freeRows(restored).length,2);
  addFreeIndividual(restored,'s','Sócrates');
  assert.deepEqual(restored.domain,[{id:'s',label:'Sócrates'}]);
  addFreeVariable(restored,'r');
  addFreeVariable(restored,'s');
  assert.equal(restored.variables.at(-1).kind,'individual');
});

test('Sócrates: q(p), ∀x(q(x) → r(x)), r(p) ainda bloqueiam a linha V V F',()=>{
  const state=blankFreeTable();
  addFreeFormula(state,'q(p)');
  addFreeVariable(state,'r','x é mortal');
  addFreeFormula(state,'∀x(q(x) → r(x))');
  addFreeFormula(state,'r(p)');
  assert.equal(state.variables[0].kind,'individual');
  assert.equal(state.variables[1].kind,'predicate');
  const report=predicateTruthAnalysis(state);
  assert.equal(report.status,'complete');
  assert.equal(report.impossibleCount,1);
  assert.equal(report.rows[1].values.join(''),'VVF');
  assert.equal(report.rows[1].possible,false);
});

test('não mistura indivíduo e predicado com o mesmo símbolo',()=>{
  const state=blankFreeTable();
  addFreeFormula(state,'p(s)');
  assert.throws(()=>addFreeFormula(state,'q(p)'),/propriedade e como indivíduo/);
  assert.equal(state.formulas.length,1);
  assert.equal(state.variables[0].kind,'predicate');
  const other=blankFreeTable();
  addFreeFormula(other,'q(p)');
  assert.throws(()=>editFreeVariable(other,'p','p','Sócrates','predicate'),
    /usado como indivíduo/);
  addFreeVariable(other,'r');
  assert.throws(()=>editFreeFormula(other,other.formulas[0].id,'p(r)'),
    /predicado cadastrado/);
});

test('parser estrito conserva exigência de indivíduo declarado para chamadas especializadas',()=>{
  assert.throws(()=>parsePredicateFormula('q(p)',['p','q'],[]),/Use x ou/);
  assert.deepEqual(parsePredicateFormula('q(p)',['p','q'],[],{allowImplicitIndividuals:true}),
    {type:'pred',name:'q',term:'p'});
});

test('o cadastro nominal opcional de p atualiza seu tipo automaticamente',()=>{
  const state=blankFreeTable();
  addFreeIndividual(state,'p','Sócrates');
  assert.equal(state.variables[0].kind,'individual');
  addFreeFormula(state,'q(p)');
  assert.equal(state.formulas.length,1);
  assert.equal(freeRows(state).length,2);
});
