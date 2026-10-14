import test from 'node:test';
import assert from 'node:assert/strict';
import {parseFormula} from '../src/core/parser.js';
import {evalAst,pretty,truthRows} from '../src/core/logic.js';
import {parsePredicateFormula,predicatePretty,predicateReading,predicateEvidence,evaluatePredicate,rootHasFreeX} from '../src/core/free-predicates.js';
import {checkSymbolicInference,analyzePredicateCombinations} from '../src/core/free-inference.js';
import {blankFreeTable,addFreeFormula,parseFreeFormula,freeTableKind,freeRows,freeColumns,readFreeTable,describeFreeFormula} from '../src/core/free-table.js';
import {UNIT1_READINGS} from '../src/content/reading-unit1.js';
import {UNIT2_READINGS} from '../src/content/reading-unit2.js';
import {UNIT3_READINGS} from '../src/content/reading-unit3.js';
import {UNIT4_TO_6_READINGS} from '../src/content/reading-units4to6.js';
import {WORKED_EXAMPLES} from '../src/content/example-walkthroughs.js';

const pred=source=>parsePredicateFormula(source,['p','q'],['a','b'],{allowImplicitIndividuals:true});
const truth=(...values)=>Object.fromEntries(values.flatMap(([id,p,q])=>[[id+'|p',p?'V':'F'],[id+'|q',q?'V':'F']]));

test('⊤ e ⊥ são constantes com avaliação correta em lógica proposicional',()=>{
  const samples={'⊤':[true,true,true,true],'⊥':[false,false,false,false],
    '¬⊥':[true,true,true,true],'p ∧ ⊤':[true,true,false,false],
    'p ∨ ⊥':[true,true,false,false],'⊤ → ⊥':[false,false,false,false]};
  for(const [formula,expected] of Object.entries(samples)){
    const ast=parseFormula(formula,['p','q']);
    assert.equal(truthRows(['p','q']).length,4);
    assert.deepEqual(truthRows(['p','q']).map(env=>evalAst(ast,env)),expected,formula);
  }
  assert.equal(pretty(parseFormula('⊤',['p'])),'⊤');
  assert.equal(pretty(parseFormula('¬⊥',['p'])),'¬⊥');
  assert.throws(()=>parseFormula('∴ p',['p']),/não conectivos|não são conectivos|não conectivo/);
  assert.throws(()=>parseFormula('∵ p',['p']),/não conectivos|não são conectivos|não conectivo/);
});

test('∃! e constantes são analisados em predicados e lidos por extenso',()=>{
  const unique=pred('∃!x(P(x))');
  assert.equal(unique.type,'existsUnique');
  assert.equal(rootHasFreeX(unique),false);
  assert.equal(predicatePretty(unique),'∃!x(p(x))');
  assert.match(predicateReading(unique,{p:'x é estudante'}),/existe exatamente um/);
  assert.deepEqual([predicatePretty(pred('⊤')),predicatePretty(pred('⊥'))],['⊤','⊥']);
  assert.equal(evaluatePredicate(pred('⊤ ↔ ¬⊥'),[],{}),true);
  assert.throws(()=>pred('∃!y(P(y))'),/x como variável/);
  assert.throws(()=>pred('∴ ∃!x(P(x))'),/não são conectivos/);
});

test('existência única avalia zero, uma e várias testemunhas, inclusive indistinguíveis por propriedades',()=>{
  const unique=pred('∃!x(p(x))');
  const one=[{id:'a',label:'Ana'}],two=[...one,{id:'b',label:'Beto'}];
  assert.equal(evaluatePredicate(unique,one,truth(['a',true,false])),true);
  assert.equal(evaluatePredicate(unique,two,truth(['a',true,false],['b',false,false])),true);
  assert.equal(evaluatePredicate(unique,two,truth(['a',true,false],['b',true,false])),false);
  assert.equal(evaluatePredicate(unique,two,truth(['a',false,false],['b',false,false])),false);
  assert.match(predicateEvidence(unique,one,truth(['a',true,false])),/Única testemunha: Ana/);
  assert.match(predicateEvidence(unique,two,truth(['a',true,false],['b',true,false])),/2 testemunhas/);
});

test('inferência simbólica considera repetição do mesmo tipo e co-referência de nomes',()=>{
  const some=pred('∃x(p(x))'),one=pred('∃!x(p(x))'),all=pred('∀x(p(x))');
  assert.equal(checkSymbolicInference([some],one).valid,false);
  assert.equal(checkSymbolicInference([one],some).valid,true);
  assert.equal(checkSymbolicInference([all],one).valid,false);
  // Dois nomes podem designar a mesma pessoa na lógica sem igualdade.
  const aliased=checkSymbolicInference([one,pred('p(a)'),pred('p(b)')],pred('⊥'));
  assert.equal(aliased.valid,false);
  assert.equal(aliased.satisfiable,true);
  const combos=analyzePredicateCombinations([some,one]);
  const keys=new Set(combos.witnesses.keys());
  assert.deepEqual([...keys].sort((a,b)=>a-b),[0,2,3]);
});

test('Tabela Livre combina constantes com fórmulas nos dois modos, sem misturá-los',()=>{
  const prop=blankFreeTable();
  addFreeFormula(prop,'⊤');
  addFreeFormula(prop,'p ∨ ⊥');
  assert.equal(freeTableKind(prop),'propositional');
  assert.equal(freeRows(prop).length,4);
  assert.equal(describeFreeFormula(parseFreeFormula(prop,'⊥'),prop).literal,'Falsidade lógica (sempre falso).');

  const s=blankFreeTable();
  addFreeFormula(s,'⊤');
  addFreeFormula(s,'∃!x(p(x))');
  addFreeFormula(s,'⊥');
  assert.equal(freeTableKind(s),'predicates');
  assert.equal(freeRows(s).length,8);
  assert.match(describeFreeFormula(parseFreeFormula(s,'∃!x(p(x))'),s).literal,/existe exatamente um/i);
  assert.equal(freeColumns(s).filter(c=>c.kind==='var').length,3);
  assert.throws(()=>addFreeFormula(s,'p ∧ q'),/alternar/);
  const stored=readFreeTable(JSON.parse(JSON.stringify(s)));
  assert.equal(freeTableKind(stored),'predicates');
  assert.equal(stored.formulas.length,3);

  const withPred=blankFreeTable();
  addFreeFormula(withPred,'p(a)');
  addFreeFormula(withPred,'⊤');
  assert.equal(freeTableKind(withPred),'predicates');
  assert.equal(predicatePretty(parseFreeFormula(withPred,'⊤')),'⊤');
});

test('aulas e exemplos usam notação correta sem apresentar ∴ e ∵ como conectivos',()=>{
  const readings=[UNIT1_READINGS.fundamentos,UNIT2_READINGS.classificacao,UNIT3_READINGS.provas,UNIT4_TO_6_READINGS.predicados2];
  const all=readings.map(x=>x.sections.flatMap(s=>s.paragraphs).join(' ')).join(' ');
  for(const symbol of ['∃!','⊤','⊥','∴','∵'])assert.ok(all.includes(symbol),symbol);
  assert.match(JSON.stringify(WORKED_EXAMPLES.predicados2),/∃!/);
  assert.match(JSON.stringify(WORKED_EXAMPLES.provas),/⊥/);
  assert.match(JSON.stringify(WORKED_EXAMPLES.classificacao),/⊤/);
});
