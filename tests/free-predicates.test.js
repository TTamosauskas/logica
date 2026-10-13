import test from 'node:test';
import assert from 'node:assert/strict';
import {parsePredicateFormula,predicateSignature,predicatePretty,rootHasFreeX,evaluatePredicate,
  predicateReading,predicateEvidence} from '../src/core/free-predicates.js';
import {blankFreeTable,addFreeIndividual,editFreeIndividual,removeFreeIndividual,editFreeVariable,
  addFreeFormula,removeFreeFormula,freeTableKind,freeColumns,freeRows,gradeFreeTable,
  readFreeTable,parseFreeFormula,describeFreeFormula} from '../src/core/free-table.js';

const setup=()=>{
 const s=blankFreeTable();
 editFreeVariable(s,'p','p','x é humano');
 editFreeVariable(s,'q','q','x é mortal');
 addFreeIndividual(s,'s','Sócrates');
 addFreeIndividual(s,'a','Uma pedra');
 addFreeFormula(s,'∀x(P(x) → Q(x))');
 return s;
};
test('parser aceita quantificação, predicados com constantes e negações',()=>{
 const f=parsePredicateFormula('∀x(P(x) → Q(x))',['p','q'],['s']);
 assert.equal(f.type,'forall');
 assert.equal(f.a.type,'implies');
 assert.equal(f.a.a.type,'pred');
 assert.equal(predicatePretty(f.a),'(p(x) → q(x))');
 assert.equal(rootHasFreeX(f),false);
 assert.equal(rootHasFreeX(f.a),true);
 assert.equal(predicateSignature(f),predicateSignature(parsePredicateFormula('∀x(p(x)->q(x))',['p','q'],['s'])));
 assert.equal(parsePredicateFormula('Q(s)',['p','q'],['s']).a,undefined);
 assert.throws(()=>parsePredicateFormula('P(a)',['p','q'],['s']),/indivíduo/);
 assert.throws(()=>parsePredicateFormula('∀y(P(y))',['p','q'],['s']),/x como variável/);
 assert.throws(()=>parsePredicateFormula('∀x(∃x(∀x(p(x))))',['p','q'],['s']),/no máximo dois quantificadores/);
 assert.throws(()=>parsePredicateFormula('∀x(P(x) → Q(x)',['p','q'],['s']),/parênteses/);
});
test('quantificadores avaliam todos, alguns e nenhum no mesmo domínio',()=>{
 const s=setup();
 const [a,b]=s.domain;
 const truth={
  [a.id+'|p']:'V',[a.id+'|q']:'V',
  [b.id+'|p']:'F',[b.id+'|q']:'F'
 };
 s.predicateValues=truth;
 const all=parseFreeFormula(s,'∀x(p(x) → q(x))');
 const some=parseFreeFormula(s,'∃x(p(x) ∧ q(x))');
 const none=parseFreeFormula(s,'¬∃x(p(x) ∧ q(x))');
 assert.equal(evaluatePredicate(all,s.domain,truth),true);
 assert.equal(evaluatePredicate(some,s.domain,truth),true);
 assert.equal(evaluatePredicate(none,s.domain,truth),false);
 assert.match(predicateEvidence(some,s.domain,truth),/Sócrates/);
 truth['s|q']='F';
 assert.equal(evaluatePredicate(all,s.domain,truth),false);
 assert.equal(evaluatePredicate(some,s.domain,truth),false);
 assert.equal(evaluatePredicate(none,s.domain,truth),true);
 assert.match(predicateEvidence(all,s.domain,truth),/Sócrates/);
});
test('P(s) refere-se a Sócrates, preserva x como variável quantificada',()=>{
 const s=setup();
 addFreeFormula(s,'Q(s)');
 const item=s.formulas.at(-1),node=parseFreeFormula(s,item.source);
 assert.equal(freeTableKind(s),'predicates');
 assert.equal(describeFreeFormula(node,s).literal,'Sócrates é mortal.');
 assert.match(describeFreeFormula(parseFreeFormula(s,'∀x(p(x)→q(x))'),s).literal,/Para todo indivíduo x, se/);
 assert.deepEqual(freeRows(s).map(d=>d.label),['Sócrates','Uma pedra']);
 assert.equal(freeColumns(s).some(c=>c.global===true&&c.kind==='formula'),true);
 assert.equal(freeColumns(s).some(c=>c.kind==='step'&&c.global===false),true);
 assert.throws(()=>removeFreeIndividual(s,'s'),/Remova ou edite/);
 editFreeIndividual(s,'s','Sócrates, o filósofo');
 assert.equal(describeFreeFormula(node,s).literal,'Sócrates, o filósofo é mortal.');
});
test('prática exige interpretação definida e corrige quantificadores uma única vez',()=>{
 const s=setup();
 let columns=freeColumns(s),rows=freeRows(s);
 assert.equal(rows.length,2);
 const formula=columns.find(c=>c.kind==='formula');
 const step=columns.find(c=>c.kind==='step');
 assert.ok(step&&!step.global);
 assert.ok(formula.global);
 assert.throws(()=>gradeFreeTable(s),/Preencha V\/F/);
 s.predicateValues={'s|p':'V','s|q':'V','a|p':'F','a|q':'F'};
 rows.forEach((row,r)=>s.answers[r+'|'+step.key]='V');
 s.answers['global|'+formula.key]='V';
 assert.deepEqual(gradeFreeTable(s),{correct:3,total:3,missing:0});
 s.answers['global|'+formula.key]='F';
 assert.deepEqual(gradeFreeTable(s),{correct:2,total:3,missing:0});
 s.hidden=[formula.key];
 assert.deepEqual(gradeFreeTable(s),{correct:2,total:3,missing:0});
});
test('modo proposicional permanece separado, sem alterar combinações V/F',()=>{
 const s=blankFreeTable();
 addFreeFormula(s,'p ∧ q');
 assert.equal(freeTableKind(s),'propositional');
 assert.equal(freeRows(s).length,4);
 assert.equal(freeColumns(s).length,3);
 assert.throws(()=>addFreeFormula(s,'∀x(p(x))'),/alternar/);
 removeFreeFormula(s,s.formulas[0].id);
 addFreeFormula(s,'∀x(p(x) → q(x))');
 assert.equal(freeTableKind(s),'predicates');
 assert.throws(()=>addFreeFormula(s,'p ∧ q'),/alternar/);
});
test('dados e escolhas sobrevivem ao salvamento sem alterar a correção proposicional',()=>{
 const s=setup();
 s.predicateValues={'s|p':'V','s|q':'V','a|p':'F','a|q':'F'};
 const global=freeColumns(s).find(c=>c.kind==='formula');
 s.answers['global|'+global.key]='V';
 s.hidden=[global.key];
 s.graded=true;
 const restored=readFreeTable(JSON.stringify(s),{strict:true});
 assert.deepEqual(restored.domain,s.domain);
 assert.deepEqual(restored.predicateValues,s.predicateValues);
 assert.deepEqual(restored.hidden,[global.key]);
 assert.equal(restored.answers['global|'+global.key],'V');
 assert.equal(restored.graded,true);
 assert.equal(gradeFreeTable(restored).total,3);
});
