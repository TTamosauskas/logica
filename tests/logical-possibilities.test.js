import test from 'node:test';
import assert from 'node:assert/strict';
import {blankFreeTable,addFreeFormula,addFreeIndividual,addFreeVariable,
  analyzeFreePossibilities} from '../src/core/free-table.js';
import {renderPredicateVenn} from '../src/truth-venn.js';

function socrates(){
  const state=blankFreeTable();
  addFreeIndividual(state,'s','Sócrates');
  addFreeFormula(state,'p(s)');
  addFreeFormula(state,'∀x(p(x) → q(x))');
  return state;
}

test('Sócrates: V V F é impossível, embora a implicação proposicional seja F',()=>{
  const state=socrates();
  const report=analyzeFreePossibilities(state,{conclusionSource:'q(s)'});
  assert.equal(report.status,'complete');
  assert.equal(report.rows.length,8);
  const ghost=report.rows.find(r=>r.values.join('')==='VVF');
  assert.equal(ghost.counterexample,true);
  assert.equal(ghost.possible,false);
  assert.match(ghost.explanation,/Instanciação universal/);
  assert.equal(report.propositionalValid,false);
  assert.equal(report.semanticValid,true);
  assert.equal(report.premisesSatisfiable,true);
  assert.equal(report.impossibleCount,1);
  assert.equal(report.possibleCount,7);
  assert.ok(report.rows.every(r=>r.possible||r.explanation.includes('Não existe modelo')));
  assert.ok(report.rows.some(r=>r.possible&&r.explanation.includes('Tipos no domínio')));
});

test('Venn destaca H e não M como impossível sob as premissas, sem depender de indivíduos cadastrados',()=>{
  const report=analyzeFreePossibilities(socrates(),{conclusionSource:'q(s)'});
  assert.equal(report.region.status,'complete');
  assert.deepEqual(report.region.impossibleMasks,[2]);
  const html=renderPredicateVenn({
    variables:['p','q'],people:[{id:'a',label:'Ana'}],
    predicateValues:{'a|p':'V','a|q':'F'},
    impossibleMasks:report.region.impossibleMasks
  });
  assert.match(html,/truth-venn-impossible/);
  assert.match(html,/região impossível em todos os modelos/);
  assert.match(html,/contradizem as premissas/);
  assert.match(html,/×/);
});

test('um contraexemplo realizável torna a inferência predicativa inválida',()=>{
  const state=socrates();
  const report=analyzeFreePossibilities(state,{conclusionSource:'p(s)'});
  assert.equal(report.status,'complete');
  // Toda premissa é verdadeira quando p(s) é V; não há contraexemplo para essa conclusão.
  assert.equal(report.semanticValid,true);
  const independent=blankFreeTable();
  addFreeIndividual(independent,'s','Sócrates');
  addFreeFormula(independent,'p(s)');
  const other=analyzeFreePossibilities(independent,{conclusionSource:'q(s)'});
  assert.equal(other.semanticValid,false);
  assert.ok(other.counterexample?.possible);
  assert.equal(other.counterexample.values.join(''),'VF');
});

test('combinações proposicionais de p e ¬p nunca são simultaneamente verdadeiras ou falsas',()=>{
  const state=blankFreeTable();
  addFreeFormula(state,'p');
  addFreeFormula(state,'¬p');
  const report=analyzeFreePossibilities(state);
  assert.equal(report.status,'complete');
  assert.equal(report.possibleCount,2);
  assert.deepEqual(report.rows.filter(r=>!r.possible).map(r=>r.values.join('')),['VV','FF']);
  assert.equal(report.semanticValid,null);
});

test('limites e variáveis livres geram não determinado, nunca falsa impossibilidade',()=>{
  const state=blankFreeTable();
  addFreeVariable(state,'r');
  addFreeVariable(state,'s');
  addFreeFormula(state,'∀x(p(x) ∧ q(x) ∧ r(x) ∧ s(x))');
  const unsupported=analyzeFreePossibilities(state);
  assert.equal(unsupported.status,'undetermined');
  assert.match(unsupported.reason,/até três propriedades/);
  const open=blankFreeTable();
  addFreeFormula(open,'p(x)');
  const free=analyzeFreePossibilities(open);
  assert.equal(free.status,'undetermined');
  assert.match(free.reason,/Feche a variável/);
});

test('mais de quatro fórmulas não é classificado como impossível',()=>{
  const state=blankFreeTable();
  for(const source of ['p','q','¬p','¬q','p → q'])addFreeFormula(state,source);
  const result=analyzeFreePossibilities(state);
  assert.equal(result.status,'undetermined');
  assert.match(result.reason,/até quatro afirmações/);
});

test('premissas inconsistentes não criam zonas impossíveis artificiais no Venn',()=>{
  const state=blankFreeTable();
  addFreeFormula(state,'∀x(p(x))');
  addFreeFormula(state,'¬∀x(p(x))');
  const report=analyzeFreePossibilities(state,{conclusionSource:'∃x(p(x))'});
  assert.equal(report.status,'complete');
  assert.equal(report.semanticValid,true);
  assert.equal(report.premisesSatisfiable,false);
  assert.equal(report.region.status,'inconsistent');
  assert.equal(report.region.impossibleMasks,undefined);
});
