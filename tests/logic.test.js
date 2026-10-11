import test from 'node:test';
import assert from 'node:assert/strict';
import { v, not, A, O, I, B, X, evalAst, truthRows, sig, pretty } from '../src/core/logic.js';
import { parseFormula, equivalentFormula } from '../src/core/parser.js';
import { fundamentals, operators, composed, demorgan, classification, equivalences, argumentsMode } from '../src/modes/propositional.js';
import { MODULES } from '../src/content/modules.js';
import { COURSE_UNITS, LESSONS } from '../src/content/course.js';
import { SCENARIOS, TRANSLATION_TEMPLATES, ARGUMENT_TEMPLATES } from '../src/content/translation.js';

test('tabela com n letras produz 2^n linhas em ordem V/F', () => {
  for (let n = 1; n <= 5; n++) {
    const vars = [...'pqrst'].slice(0, n);
    const rows = truthRows(vars);
    assert.equal(rows.length, 2 ** n);
    assert.deepEqual(rows[0], Object.fromEntries(vars.map(x => [x, true])));
    assert.deepEqual(rows.at(-1), Object.fromEntries(vars.map(x => [x, false])));
  }
});

test('leis clássicas e contraexemplo', () => {
  const p = v('p'), q = v('q');
  const tautology = I(A(p,q),p);
  assert.ok(truthRows(['p','q']).every(env => evalAst(tautology,env)));
  assert.ok(truthRows(['p','q']).every(env => evalAst(not(A(p,q)),env) === evalAst(O(not(p),not(q)),env)));
  assert.ok(truthRows(['p','q']).every(env => evalAst(B(p,q),env) === !evalAst(X(p,q),env)));
  assert.equal(equivalentFormula(I(p,q),I(q,p),['p','q']).equivalent,false);
});

test('parser reconhece Unicode, português e precedência', () => {
  const parsed = parseFormula('não (p e q)', ['p','q']);
  assert.equal(equivalentFormula(parsed,not(A(v('p'),v('q'))),['p','q']).equivalent,true);
  const expr = parseFormula('p → (q ∧ p)', ['p','q']);
  assert.equal(pretty(expr),'p → (q ∧ p)');
  assert.throws(()=>parseFormula('p ∧ x',['p']),/Utilize apenas/);
});

test('geradores proposicionais preservam respostas matemáticas válidas', () => {
  for (const make of [fundamentals,operators,composed,demorgan,classification,equivalences,argumentsMode]) {
    for (const level of ['easy','medium','hard']) {
      for (let i=0;i<60;i++) {
        const ex=make(level);
        assert.ok(Array.isArray(ex.envs));
        assert.ok(ex.envs.length >= 2);
        assert.ok(ex.cols.length >= 1);
        for (const col of ex.cols) for (const env of ex.envs) assert.equal(typeof evalAst(col.node,env),'boolean');
      }
    }
  }
});

test('cada unidade aponta para uma aula existente e um módulo', () => {
  const ids = new Set(MODULES.map(x=>x.id));
  const flat = COURSE_UNITS.flatMap(u=>u.ids);
  assert.equal(COURSE_UNITS.length,6);
  assert.equal(new Set(flat).size,flat.length);
  for (const id of flat) {
    assert.ok(ids.has(id),`módulo ausente: ${id}`);
    assert.equal(LESSONS[id].quiz.length,4);
  }
  assert.equal(MODULES.length,flat.length+1); // todos os temas mais a prática mista
});

test('todos os modelos de tradução geram árvores avaliáveis', () => {
  const names=['p','q','r'];
  const nodes=names.map(v);
  assert.ok(SCENARIOS.length>15);
  for (const group of Object.values(TRANSLATION_TEMPLATES)) for (const template of group) {
    const tree=template.make(nodes);
    assert.ok(sig(tree));
    assert.equal(typeof evalAst(tree,{p:true,q:false,r:true}),'boolean');
  }
  for (const template of ARGUMENT_TEMPLATES) {
    const [premises, conclusion] = template.make(nodes);
    assert.equal(typeof evalAst(conclusion,{p:true,q:false,r:true}),'boolean');
    for (const p of premises) assert.equal(typeof evalAst(p,{p:true,q:false,r:true}),'boolean');
  }
});
