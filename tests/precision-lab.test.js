import test from 'node:test';
import assert from 'node:assert/strict';
import {COURSE_UNITS,LESSONS} from '../src/content/course.js';
import {MODULES} from '../src/content/modules.js';
import {UNIT2_READINGS} from '../src/content/reading-unit2.js';
import {UNIT4_TO_6_READINGS} from '../src/content/reading-units4to6.js';
import {FOUNDATIONS_READINGS} from '../src/content/foundations-a.js';
import {learningOverview} from '../src/core/learning-feedback.js';
import {
  DESCRIPTION_CASES,IDENTITY_CASES,RELATION_CASES,REWRITE_CHAINS,META_CASES,
  descriptionStatus,relationStatus,makePredicateQuestions,makeMetatheoryQuestions,
  makeRewriteQuestions,rewriteCounterexample
} from '../src/core/precision-lab.js';
const ids=COURSE_UNITS.flatMap(u=>u.ids);

test('ciclo 14 preserva IDs anteriores e progride para 39 aulas em 8 unidades',()=>{
  assert.equal(COURSE_UNITS.length,8);
  assert.equal(ids.length,39);
  assert.equal(new Set(ids).size,39);
  assert.equal(MODULES.length,40); // 39 aulas + treino misto
  for(const id of ['predicados2','equivalencias','metateoria'])assert.ok(ids.includes(id));
  const learned=Object.fromEntries(ids.map(id=>[id,{mastered:true}]));
  const overview=learningOverview(COURSE_UNITS,learned);
  assert.equal(overview.approved,39);
  assert.equal(overview.total,39);
});
test('metateoria preserva identificador e diferencia consequência de derivação',()=>{
  const first=LESSONS.metateoria.quiz[0];
  assert.match(first.question,/Γ⊨φ/);
  assert.match(first.options[first.correct],/modelos/);
  assert.ok(!first.options.some(o=>/probabilidade como prova/.test(o)));
  const body=FOUNDATIONS_READINGS.metateoria.sections.flatMap(s=>s.paragraphs).join(' ');
  for(const term of ['derivação','correção','completude','semântica'])assert.ok(body.includes(term),term);
  assert.equal(LESSONS.metateoria.quiz.length,4);
});
test('descrição definida avalia existência, unicidade e atribuição corretamente',()=>{
  const expected={'sem':[false,false,false],'unico-sim':[true,true,true],'unico-nao':[true,true,false],'dois':[true,false,false],'tres':[true,false,false],'outro':[true,true,true]};
  for(const item of DESCRIPTION_CASES){
    const s=descriptionStatus(item);
    assert.deepEqual([s.exists,s.unique,s.statement],expected[item.id],item.id);
    assert.equal(s.count,item.holders.length);
    for(const identity of IDENTITY_CASES)for(const relation of RELATION_CASES){
      const questions=makePredicateQuestions(item,identity,relation);
      assert.equal(questions.length,5,item.id);
      for(const q of questions){
        assert.equal(q.options.length,3,item.id);
        assert.equal(new Set(q.options).size,3,item.id+': '+q.question);
        assert.ok(Number.isInteger(q.correct)&&q.correct>=0&&q.correct<3);
        assert.ok(q.why.length>80,item.id);
      }
      assert.match(questions[1].options[questions[1].correct],s.unique?/^Sim: há exatamente uma\.$/:/^Não: não há exatamente uma\.$/);
      assert.match(questions[2].options[questions[2].correct],s.statement?/^Sim/:/^Não/);
    }
  }
});
test('escopo ∀x∃y e ∃y∀x é calculado em relações finitas',()=>{
  const vals={'individual':[true,false],'todos-mesmo':[true,true],'ninguém':[false,false],'metade':[false,false],'cruzado':[true,false]};
  for(const c of RELATION_CASES){
    const s=relationStatus(c);
    assert.deepEqual([s.forallExists,s.existsForall],vals[c.id]);
    assert.ok(!s.existsForall||s.forallExists);
  }
});
test('metateoria exige distinção de correção, completude, incompletude e parada em toda rodada',()=>{
  assert.equal(new Set(META_CASES.map(c=>c.id)).size,META_CASES.length);
  for(let k=0;k<100;k++){
    const qs=makeMetatheoryQuestions();
    assert.equal(qs.length,5);
    assert.ok(qs.some(q=>q.question.includes('correto (sound)')));
    assert.ok(qs.some(q=>q.question.includes('completude semântica')));
    assert.ok(qs.some(q=>q.question.includes('Gödel')));
    assert.ok(qs.some(q=>q.question.includes('parada')));
    for(const q of qs){
      assert.equal(new Set(q.options).size,3);
      assert.ok(q.options[q.correct]);
      assert.ok(q.why.length>95);
    }
  }
});
test('todas as cadeias são equivalentes em cada passo; contraexemplo invalida salto errado',()=>{
  assert.ok(REWRITE_CHAINS.length>=6);
  const read=UNIT2_READINGS.equivalencias;
  assert.ok(read.sections.flatMap(s=>s.paragraphs).join(' ').includes('contraexemplo'));
  for(const chain of REWRITE_CHAINS){
    assert.equal(rewriteCounterexample(chain.original,chain.middle).equivalent,true,chain.id+' passo 1');
    assert.equal(rewriteCounterexample(chain.middle,chain.final).equivalent,true,chain.id+' passo 2');
    const bad=rewriteCounterexample(chain.original,chain.wrong);
    assert.equal(bad.equivalent,false,chain.id+' inválido');
    assert.ok(bad.counter,chain.id);
    for(let k=0;k<20;k++){
      const qs=makeRewriteQuestions(chain);
      assert.equal(qs.length,4);
      assert.equal(qs[0].options[qs[0].correct],chain.middle);
      assert.equal(qs[1].options[qs[1].correct],chain.final);
      assert.equal(qs[2].options[qs[2].correct],chain.rule1);
      assert.ok(qs[3].options[qs[3].correct].includes('interpretação'));
      for(const q of qs){
        assert.equal(q.options.length,3);
        assert.equal(new Set(q.options).size,3,chain.id);
        assert.ok(q.why.length>=70,chain.id);
      }
    }
  }
});
test('leituras e avaliações cobrem os novos objetivos e preservam seis etapas comuns',()=>{
  for(const [id,reading] of [
    ['predicados2',UNIT4_TO_6_READINGS.predicados2],
    ['metateoria',FOUNDATIONS_READINGS.metateoria],
    ['equivalencias',UNIT2_READINGS.equivalencias]
  ]){
    assert.equal(reading.sections.length,3,id);
    assert.ok(reading.objective.length>90,id);
    assert.ok(reading.sections.flatMap(x=>x.paragraphs).every(p=>p.length>=100),id);
    assert.ok(reading.misconception.length>100,id);
    assert.ok(reading.summary.length>100,id);
    assert.equal(reading.check.options.length,3,id);
    assert.ok(reading.check.why.length>=55,id);
    assert.ok(LESSONS[id].quiz.length>=4,id);
  }
});
