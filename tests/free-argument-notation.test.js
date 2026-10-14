import test from 'node:test';
import assert from 'node:assert/strict';
import {blankFreeTable,addFreeFormula,addFreeVariable,editFreeVariable,
  freeArgumentAnalysis,freeColumns,freeRows,freeRowImpossible,
  readFreeTable,gradeFreeTable} from '../src/core/free-table.js';

const fill=(formulas,{predicates=false}={})=>{
  const state=blankFreeTable();
  if(predicates){editFreeVariable(state,'p','p','Sócrates','individual');addFreeVariable(state,'r');}
  for(const source of formulas)addFreeFormula(state,source);
  return state;
};

test('∴ identifica semanticamente a última fórmula só quando há argumento',()=>{
  const none=blankFreeTable();
  assert.equal(freeArgumentAnalysis(none),null);
  addFreeFormula(none,'p → q');
  assert.equal(freeArgumentAnalysis(none),null);
  assert.equal(freeColumns(none).at(-1).label,'p → q');
  const logical=fill(['p → q','p','q']);
  const analysis=freeArgumentAnalysis(logical);
  assert.equal(analysis.status,'valid');
  assert.match(analysis.reason,/Modus ponens/);
  assert.match(analysis.reason,/argumento é válido/);
  assert.equal(freeColumns(logical).at(-1).label,'q');
  assert.equal(freeRows(logical).length,4);
});

test('∵ apresenta contraexemplo sem atribuir V ou F ao próprio símbolo',()=>{
  const fallacy=fill(['p → q','q','p']);
  const analysis=freeArgumentAnalysis(fallacy);
  assert.equal(analysis.status,'invalid');
  assert.match(analysis.reason,/p=F, q=V/);
  assert.match(analysis.reason,/contraexemplo/);
  assert.equal(freeRows(fallacy).length,4);
  assert.equal(freeColumns(fallacy).length,4); // p, q, p→q, última p (sem nova coluna)
});

test('∵ distingue validade por premissas inconsistentes',()=>{
  const inconsistent=fill(['p','¬p','q']);
  const result=freeArgumentAnalysis(inconsistent);
  assert.equal(result.status,'vacuous');
  assert.match(result.reason,/premissas são conjuntamente inconsistentes/);
  assert.doesNotMatch(result.reason,/Modus ponens/);
});

test('∵ explica instanciação universal e modus ponens em predicados',()=>{
  const state=fill(['q(p)','∀x(q(x) → r(x))','r(p)'],{predicates:true});
  const labels=freeColumns(state).map(col=>col.label);
  assert.deepEqual(labels,['A · q(p)','B · ∀x((q(x) → r(x)))','C · r(p)','(A ∧ B) → C']);
  assert.equal(freeRows(state).length,8);
  assert.equal(freeRowImpossible(state,1),true);
  const report=freeArgumentAnalysis(state);
  assert.equal(report.status,'valid');
  assert.match(report.reason,/Instanciação universal e modus ponens/);
  assert.match(report.reason,/q\(p\) → r\(p\)/);
  assert.match(report.reason,/Nenhuma combinação semanticamente possível/);
  const graded=gradeFreeTable(state);
  assert.equal(graded.total,7);
  assert.equal(freeColumns(state).at(-1).label,'(A ∧ B) → C');
  const restored=readFreeTable(JSON.stringify(state),{strict:true});
  assert.equal(freeArgumentAnalysis(restored).status,'valid');
  assert.equal(restored.formulas.at(-1).source,'r(p)');
});

test('∵ detecta invalidade e premissas incompatíveis também em predicados',()=>{
  const invalid=fill(['q(p)','r(p)'],{predicates:true});
  assert.equal(freeArgumentAnalysis(invalid).status,'invalid');
  assert.match(freeArgumentAnalysis(invalid).reason,/Há um contraexemplo/);
  const inconsistent=fill(['q(p)','¬q(p)','r(p)'],{predicates:true});
  const result=freeArgumentAnalysis(inconsistent);
  assert.equal(result.status,'vacuous');
  assert.match(result.reason,/premissas conjuntamente inconsistentes/);
});

test('∵ não inventa decisão se análise de predicados é indeterminada',()=>{
  const state=blankFreeTable();
  addFreeVariable(state,'r');
  addFreeVariable(state,'s');
  for(const formula of ['p(a)','q(a)','r(a)','s(a)'])addFreeFormula(state,formula);
  const result=freeArgumentAnalysis(state);
  assert.equal(result.status,'undetermined');
  assert.match(result.reason,/Não foi possível verificar/);
});
