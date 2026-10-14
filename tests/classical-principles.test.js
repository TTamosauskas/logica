import test from 'node:test';
import assert from 'node:assert/strict';
import {parseFormula} from '../src/core/parser.js';
import {truthRows,evalAst} from '../src/core/logic.js';
import {UNIT2_READINGS} from '../src/content/reading-unit2.js';
import {UNIT3_READINGS} from '../src/content/reading-unit3.js';
import {LESSONS} from '../src/content/course.js';
import {THEOREM_WORKSHOPS,THEORY_CARDS} from '../src/content/advanced.js';
import {UNIT2_ASSESSMENTS} from '../src/content/assessment-unit2.js';
import {UNIT3_ASSESSMENTS} from '../src/content/assessment-unit3.js';

const truth=source=>truthRows(['p']).map(row=>evalAst(parseFormula(source,['p']),row));
test('tabelas demonstram as leis clássicas sem confundir contradição e tautologia',()=>{
  assert.deepEqual(truth('p ↔ p'),[true,true]);
  assert.deepEqual(truth('p ∨ ¬p'),[true,true]);
  assert.deepEqual(truth('¬(p ∧ ¬p)'),[true,true]);
  assert.deepEqual(truth('p ∧ ¬p'),[false,false]);
  assert.deepEqual(truth('p'),[true,false]);
});

test('a Unidade II ensina quatro conceitos, suas diferenças e o limite da identidade de objetos',()=>{
  const reading=UNIT2_READINGS.classificacao,prose=reading.sections.flatMap(x=>x.paragraphs).join(' ');
  assert.equal(reading.sections.length,3);
  assert.match(reading.sections[0].heading,/Princípios fundamentais/);
  for(const word of ['identidade','bivalência','terceiro excluído','não contradição','p ↔ p','a = a'])
    assert.ok(prose.toLowerCase().includes(word.toLowerCase()),'Conceito ausente: '+word);
  assert.match(reading.check.question,/não contradição/);
  assert.match(LESSONS.classificacao.theory,/bivalência/);
  assert.match(LESSONS.classificacao.theory,/p∨¬p/);
  assert.match(LESSONS.classificacao.theory,/¬\(p∧¬p\)/);
});

test('a Unidade III distingue explosão formal, reductio clássica e fatos reais',()=>{
  const reading=UNIT3_READINGS.provas,prose=reading.sections.flatMap(x=>x.paragraphs).join(' ');
  assert.equal(reading.sections.length,3);
  for(const word of ['explosão','redução ao absurdo','p ∨ q','silogismo disjuntivo',
    'hipótese temporária','NÃO afirma']){
    assert.ok(prose.includes(word),'Explicação ausente: '+word);
  }
  assert.match(reading.check.question,/redução ao absurdo/);
  assert.match(reading.misconception,/verdadeiro no mundo/);
  assert.match(LESSONS.provas.theory,/explosão/);
  assert.match(LESSONS.provas.theory,/hipótese temporária/);
});

test('oficinas e provas guiadas tornam os princípios acessíveis e têm feedback',()=>{
  for(const label of ['Terceiro excluído','Não contradição','Identidade proposicional e bivalência',
    'Explosão e premissas inconsistentes','Redução ao absurdo clássica']){
    const workshop=THEOREM_WORKSHOPS.find(x=>x.title===label);
    assert.ok(workshop,'Oficina não encontrada: '+label);
    assert.equal(workshop.parts.length,3);
    for(const part of workshop.parts){
      assert.equal(part.options.length,3);
      assert.ok(part.options[part.correct]);
      assert.ok(part.why.length>25);
    }
  }
  assert.equal(THEORY_CARDS.classificacao.length,3);
  assert.equal(THEORY_CARDS.provas.length,2);
  assert.ok(THEORY_CARDS.provas.some(x=>x.statement.includes('p, ¬p')));
  assert.ok(THEORY_CARDS.provas.every(x=>x.proof.length>=3&&x.scope.length>40));
});

test('avaliações novas respeitam os bancos de 8 itens e cobrem conceitos e aplicações',()=>{
  for(const [bank,words] of [
    [UNIT2_ASSESSMENTS.classificacao,['bivalência','terceiro excluído','não contradição','reflexividade']],
    [UNIT3_ASSESSMENTS.provas,['explosão','redução ao absurdo','p∨q']]]){
    assert.equal(bank.length,8);
    const questions=bank.map(x=>x.question).join(' ').toLowerCase();
    for(const word of words)assert.ok(questions.includes(word.toLowerCase()),word);
    assert.equal(bank.filter(x=>x.dimension==='concept').length,4);
    assert.equal(bank.filter(x=>x.dimension==='application').length,4);
  }
});
