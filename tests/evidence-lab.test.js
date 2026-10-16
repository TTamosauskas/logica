import test from 'node:test';
import assert from 'node:assert/strict';
import {COURSE_UNITS,LESSONS} from '../src/content/course.js';
import {MODULES} from '../src/content/modules.js';
import {UNIT13_READINGS} from '../src/content/reading-unit13.js';
import {getNextLearningStep} from '../src/core/learning-path.js';
import {learningOverview} from '../src/core/learning-feedback.js';
import {
  INDUCTION_CASES,ABDUCTION_CASES,CAUSAL_CASES,PROBABILITY_CASES,
  buildInductionQuestions,buildAbductionQuestions,buildCausalQuestions,
  buildProbabilityQuestions,probabilityCounts,percent
} from '../src/core/evidence-lab.js';

const newIds=['inducao','abducao','probabilidade','causalidade'];
test('unidade de evidências acrescenta quatro aulas sem substituir as 19 conquistas anteriores',()=>{
  const ids=COURSE_UNITS.flatMap(unit=>unit.ids);
  assert.equal(COURSE_UNITS.length,8);
  assert.equal(ids.length,61);
  assert.deepEqual(COURSE_UNITS[4].ids.filter(id=>newIds.includes(id)),newIds);
  assert.equal(COURSE_UNITS[7].ids.at(-1),'metateoria');
  assert.equal(COURSE_UNITS[6].ids[0],'modais');
  assert.equal(new Set(ids).size,61);
  assert.equal(MODULES.length,62);
  for(const id of newIds){
    assert.ok(MODULES.some(m=>m.id===id),id);
    assert.equal(LESSONS[id].quiz.length,4,id);
    assert.equal(LESSONS[id].steps.length,3,id);
    assert.equal(UNIT13_READINGS[id].sections.length,3,id);
  }
  const additionalGaps=MODULES.filter(m=>Number(m.no)>=40).map(m=>m.id);
  const newCritical=[...additionalGaps,...COURSE_UNITS[5].ids,...COURSE_UNITS[6].ids.filter(id=>id!=='modais'),...COURSE_UNITS[7].ids.filter(id=>id!=='metateoria')];
  const old=Object.fromEntries(ids.filter(id=>!newIds.includes(id)&&!newCritical.includes(id)).map(id=>[id,{mastered:true}]));
  const overview=learningOverview(COURSE_UNITS,old);
  assert.equal(overview.total,61);
  assert.equal(overview.approved,19);
  assert.equal(getNextLearningStep(COURSE_UNITS,old).id,'condicionais_naturais');
});
test('todas as leituras ensinam com objetivos, situações, contraste e feedback',()=>{
  for(const [id,r] of Object.entries(UNIT13_READINGS)){
    assert.ok(r.objective.length>=90,id);
    assert.equal(r.sections.length,3,id);
    assert.ok(r.sections.every(s=>s.heading.length>=15&&s.paragraphs.length===2));
    assert.ok(r.sections.flatMap(s=>s.paragraphs).every(p=>p.length>=100),id);
    assert.ok(r.sections.flatMap(s=>s.paragraphs).join(' ').split(/\s+/).length>=170,id);
    assert.ok(r.misconception.length>=100,id);
    assert.ok(r.summary.length>=100,id);
    assert.equal(r.check.options.length,3,id);
    assert.ok(r.check.why.length>65,id);
  }
});
test('probabilidades são calculadas de contagens consistentes e não confundem taxas',()=>{
  for(const item of PROBABILITY_CASES){
    const c=probabilityCounts(item);
    assert.equal(c.population,c.condition+c.without);
    assert.equal(c.positives,c.truePositive+c.falsePositive);
    assert.ok(c.posterior>=0&&c.posterior<=100);
    assert.ok(c.baseRate>=0&&c.baseRate<=100);
    assert.ok(c.sensitivity>=0&&c.sensitivity<=100);
    assert.ok(c.posterior!==c.sensitivity,item.id);
    assert.equal(c.posterior,c.truePositive*100/c.positives);
    for(let k=0;k<30;k++){
      const q=buildProbabilityQuestions(item);
      assert.equal(q.length,4,item.id);
      assert.ok(q.every(x=>x.options.length===3&&new Set(x.options).size===3));
      assert.equal(q[0].options[q[0].correct],String(c.truePositive));
      assert.equal(q[1].options[q[1].correct],String(c.positives));
      assert.equal(q[2].options[q[2].correct],percent(c.posterior));
      assert.equal(q[3].options[q[3].correct],percent(c.baseRate));
    }
  }
  assert.throws(()=>probabilityCounts({population:100,condition:10,truePositive:11,falsePositive:0}));
  assert.throws(()=>probabilityCounts({population:10,condition:0,truePositive:0,falsePositive:0}));
});
test('práticas de indução, abdução e causalidade cobrem cenários variados e dão feedback',()=>{
  for(const [name,cases,make] of [
    ['indução',INDUCTION_CASES,buildInductionQuestions],
    ['abdução',ABDUCTION_CASES,buildAbductionQuestions],
    ['causalidade',CAUSAL_CASES,buildCausalQuestions]
  ]){
    assert.ok(cases.length>=4,name);
    const identities=new Set();
    for(const item of cases){
      identities.add(item.id);
      for(let k=0;k<20;k++){
        const questions=make(item);
        assert.equal(questions.length,4,item.id);
        for(const q of questions){
          assert.equal(q.options.length,3,item.id);
          assert.equal(new Set(q.options).size,3,item.id);
          assert.ok(q.options[q.correct],item.id);
          assert.ok(q.why.length>=75,item.id);
        }
      }
    }
    assert.equal(identities.size,cases.length,name);
  }
});
