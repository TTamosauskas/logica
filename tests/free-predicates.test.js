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
 assert.match(describeFreeFormula(none,s).literal,/Nenhum indivíduo do domínio satisfaz/);
 assert.match(predicateEvidence(some,s.domain,truth),/Sócrates/);
 truth['s|q']='F';
 assert.equal(evaluatePredicate(all,s.domain,truth),false);
 assert.equal(evaluatePredicate(some,s.domain,truth),false);
 assert.equal(evaluatePredicate(none,s.domain,truth),true);
 assert.match(predicateEvidence(all,s.domain,truth),/Sócrates/);
});
test('P(s) refere-se a Sócrates e cada fórmula vira coluna-base da mesma tabela-verdade',()=>{
 const s=setup();
 addFreeFormula(s,'Q(s)');
 const node=parseFreeFormula(s,s.formulas.at(-1).source);
 assert.equal(freeTableKind(s),'predicates');
 assert.equal(describeFreeFormula(node,s).literal,'Sócrates é mortal.');
 assert.equal(freeRows(s).length,4);
 assert.deepEqual(freeColumns(s).filter(c=>c.kind==='var').map(c=>c.name),['A','B']);
 assert.equal(freeColumns(s).at(-1).label,'A → B');
 assert.throws(()=>removeFreeIndividual(s,'s'),/Remova ou edite/);
 editFreeIndividual(s,'s','Sócrates, o filósofo');
 assert.equal(describeFreeFormula(node,s).literal,'Sócrates, o filósofo é mortal.');
});

test('linhas impossíveis não são editáveis nem entram na correção',()=>{
 const s=setup();
 addFreeFormula(s,'p(s)');
 addFreeFormula(s,'q(s)');
 const columns=freeColumns(s),rows=freeRows(s),derived=columns.at(-1);
 assert.equal(rows.length,8);
 assert.deepEqual(freeColumns(s).map(c=>c.kind),['var','var','var','formula']);
 const impossible=rows.findIndex(row=>row.A&&row.B&&!row.C);
 assert.equal(impossible,1);
 // Todos os valores da implicação são verificáveis, exceto a linha impossível.
 rows.forEach((row,i)=>{
   s.answers[i+'|'+derived.key]=((!row.A&&!row.B)||row.C)?'V':'F';
 });
 // A fórmula verdadeira de A∧B→C ocorre quando as duas premissas são V.
 s.answers[impossible+'|'+derived.key]='F';
 const all=gradeFreeTable(s);
 assert.equal(all.total,7);
 assert.equal(all.missing,0);
 assert.ok(all.correct<=7);
 s.hidden=[derived.key];
 assert.equal(gradeFreeTable(s).total,7);
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
test('domínio opcional e respostas da nova tabela sobrevivem ao salvamento',()=>{
 const s=setup();
 addFreeFormula(s,'p(s)');
 const derived=freeColumns(s).at(-1);
 s.answers['0|'+derived.key]='V';
 s.hidden=[derived.key];s.graded=true;
 const restored=readFreeTable(JSON.stringify(s),{strict:true});
 assert.deepEqual(restored.domain,s.domain);
 assert.deepEqual(restored.hidden,[derived.key]);
 assert.equal(restored.answers['0|'+derived.key],'V');
 assert.equal(restored.graded,true);
 assert.equal(gradeFreeTable(restored).total,4);
});

test('constante individual pode ser cadastrada e a tabela independe do domínio',()=>{
 const s=blankFreeTable();
 editFreeVariable(s,'p','p','Sócrates','individual');
 addFreeFormula(s,'q(p)');
 assert.equal(freeRows(s).length,2);
 addFreeIndividual(s,'p','Sócrates');
 assert.equal(freeRows(s).length,2);
 const col=freeColumns(s).at(-1);
 s.answers['0|'+col.key]='F';
 assert.equal(gradeFreeTable(s).total,2);
 const restored=readFreeTable(JSON.stringify(s),{strict:true});
 assert.equal(restored.variables[0].kind,'individual');
 assert.deepEqual(restored.domain,[{id:'p',label:'Sócrates'}]);
 assert.equal(restored.answers['0|'+col.key],'F');
 assert.throws(()=>editFreeVariable(restored,'p','p','propriedade','predicate'),/identifica um indivíduo/);
});

test('um símbolo como indivíduo não é proposição, mas fórmula fechada tem V/F',()=>{
 const s=blankFreeTable();
 editFreeVariable(s,'p','p','Sócrates','individual');
 assert.equal(freeTableKind(s),'predicates');
 assert.equal(freeRows(s).length,0);
 assert.throws(()=>parseFreeFormula(s,'p ∧ q'),/proposicionais não podem incluir símbolos/);
 addFreeFormula(s,'q(p)');
 assert.equal(freeRows(s).length,2);
 assert.deepEqual(freeColumns(s).map(c=>c.kind),['var','formula']);
});

test('excluir indivíduo citado pela conclusão é impedido antes de corromper a persistência',()=>{
  const s=blankFreeTable();
  addFreeIndividual(s,'s','Sócrates');
  addFreeFormula(s,'∀x(p(x) → q(x))');
  s.inferenceConclusion='q(s)';
  assert.throws(()=>removeFreeIndividual(s,'s'),/conclusão que usa s/);
  assert.equal(s.domain.length,1);
  assert.equal(readFreeTable(JSON.stringify(s),{strict:true}).domain[0].id,'s');
});
