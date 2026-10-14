import test from 'node:test';
import assert from 'node:assert/strict';
import {blankFreeTable,addFreeFormula,addFreeIndividual,addFreeVariable,editFreeVariable,
  freeColumns,freeRows,freeRowImpossible,gradeFreeTable,predicateTruthAnalysis,
  readFreeTable,verifyFreeInference,MAX_PREDICATE_TABLE_FORMULAS} from '../src/core/free-table.js';
import {renderTruthVenn} from '../src/truth-venn.js';

test('tabela de quantificadores segue a mesma grade V/F de uma tabela proposicional',()=>{
  const state=blankFreeTable();
  addFreeIndividual(state,'s','Sócrates');
  for(const formula of ['p(s)','∀x(p(x) → q(x))','q(s)'])addFreeFormula(state,formula);
  state.inferenceMode=true;
  const rows=freeRows(state),columns=freeColumns(state),report=predicateTruthAnalysis(state);
  assert.equal(rows.length,8);
  assert.deepEqual(columns.map(c=>c.kind),['var','var','var','formula']);
  assert.deepEqual(columns.filter(c=>c.given).map(c=>c.name),['A','B','C']);
  assert.equal(report.status,'complete');
  assert.equal(report.impossibleCount,1);
  assert.deepEqual(rows[1],{A:true,B:true,C:false});
  assert.equal(freeRowImpossible(state,1),true);
  assert.equal(freeRowImpossible(state,0),false);
  const derived=columns.at(-1);
  state.answers['1|'+derived.key]='V'; // resposta anterior não torna linha impossível editável
  assert.deepEqual(gradeFreeTable(state),{correct:0,total:7,missing:7});
  assert.equal(derived.label,'(A ∧ B) → C');
  const restored=readFreeTable(JSON.stringify(state),{strict:true});
  assert.equal(freeRowImpossible(restored,1),true);
  assert.equal(gradeFreeTable(restored).total,7);
});

test('tabela predicativa sem domínio e sem cadastro continua presente',()=>{
  const state=blankFreeTable();
  editFreeVariable(state,'p','p','Sócrates','individual');
  assert.deepEqual(freeRows(state),[]);
  addFreeFormula(state,'q(p)');
  assert.deepEqual(freeRows(state),[{A:true},{A:false}]);
  assert.equal(freeColumns(state).at(-1).label,'¬A');
  assert.deepEqual(gradeFreeTable(state),{correct:0,total:2,missing:2});
});

test('se o fragmento não for suportado, as linhas permanecem e nenhuma recebe 🚫',()=>{
  const state=blankFreeTable();
  // O parser aceita a fórmula, mas o classificador informa limite.
  addFreeVariable(state,'r');addFreeVariable(state,'s');
  addFreeFormula(state,'∀x(p(x) ∧ q(x) ∧ r(x) ∧ s(x))');
  assert.equal(predicateTruthAnalysis(state).status,'undetermined');
  assert.deepEqual(freeRows(state),[{A:true},{A:false}]);
  assert.ok(freeRows(state).every((_,i)=>!freeRowImpossible(state,i)));
});

test('Venn proposicional destaca a combinação impossível mesmo após conferir',()=>{
  const state=blankFreeTable();
  addFreeIndividual(state,'s','Sócrates');
  for(const formula of ['p(s)','∀x(p(x) → q(x))','q(s)'])addFreeFormula(state,formula);
  const rows=freeRows(state),columns=freeColumns(state);
  const html=renderTruthVenn({
    variables:['A','B','C'],rows,columns,impossibleRows:[1],
    getAnswer:()=>'',getExpected:()=> 'V',checked:true
  });
  assert.match(html,/truth-venn-impossible/);
  assert.match(html,/Combinação semanticamente impossível/);
  assert.match(html,/×/);
});

test('o antigo campo de conclusão é incorporado como última fórmula no carregamento',()=>{
  const state=blankFreeTable();
  addFreeIndividual(state,'s','Sócrates');
  addFreeFormula(state,'p(s)');
  addFreeFormula(state,'∀x(p(x) → q(x))');
  verifyFreeInference(state,'q(s)');
  const restored=readFreeTable(JSON.stringify(state),{strict:true});
  assert.deepEqual(restored.formulas.map(f=>f.source),
    ['p(s)','∀x(p(x) → q(x))','q(s)']);
  assert.equal(restored.inferenceConclusion,'');
  assert.equal(freeRows(restored).length,8);
});

test('limite de seis fórmulas evita construir tabelas enormes',()=>{
  const state=blankFreeTable();
  addFreeIndividual(state,'s','Sócrates');
  addFreeVariable(state,'r');
  const sources=['p(s)','q(s)','r(s)','¬p(s)','¬q(s)','¬r(s)','p(s) ∧ q(s)'];
  for(const source of sources.slice(0,MAX_PREDICATE_TABLE_FORMULAS))addFreeFormula(state,source);
  assert.equal(freeRows(state).length,64);
  assert.throws(()=>addFreeFormula(state,sources[6]),/até seis fórmulas/);
});
