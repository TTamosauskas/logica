import test from 'node:test';
import assert from 'node:assert/strict';
import {COURSE_UNITS,LESSONS} from '../src/content/course.js';
import {MODULES} from '../src/content/modules.js';
import {UNIT12_READINGS} from '../src/content/reading-unit12.js';
import {
  CATEGORICAL_CASES,CATEGORICAL_CONTEXTS,ASSUMPTION_CASES,
  categoricalValue,categoricalCounterexample,categoricalCaseValidity,
  buildCategoricalQuestions,buildAssumptionQuestions
} from '../src/core/argument-lab.js';
import {getNextLearningStep} from '../src/core/learning-path.js';
import {learningOverview} from '../src/core/learning-feedback.js';

test('duas aulas do ciclo 12 mantêm seus IDs no curso ampliado',()=>{
  const ids=COURSE_UNITS.flatMap(unit=>unit.ids);
  assert.equal(ids.length,49);
  assert.equal(new Set(ids).size,49);
  assert.deepEqual(COURSE_UNITS[0].ids.slice(-2),['falacias','pressupostos']);
  assert.deepEqual(COURSE_UNITS[3].ids.filter(id=>id!=='negacao_quantificadores'),['categoricos','categoricos2','predicados2']);
  for(const id of ['pressupostos','categoricos2']){
    assert.ok(LESSONS[id]?.quiz?.length>=4);
    assert.ok(MODULES.some(m=>m.id===id));
    assert.ok(UNIT12_READINGS[id]?.sections?.length===3);
    assert.ok(UNIT12_READINGS[id].check.why.length>60);
  }
});
test('progresso aprovado das 17 aulas antigas é preservado; só faltam os dois temas novos',()=>{
  const newGapIds=MODULES.filter(m=>Number(m.no)>=40).map(m=>m.id);
  const notApproved=new Set([...newGapIds,'pressupostos','categoricos2','inducao','abducao','probabilidade','causalidade',...COURSE_UNITS[5].ids,...COURSE_UNITS[6].ids.filter(id=>id!=='modais'),...COURSE_UNITS[7].ids.filter(id=>id!=='metateoria')]);
  const previousIds=COURSE_UNITS.flatMap(u=>u.ids).filter(id=>!notApproved.has(id));
  const previous=Object.fromEntries(previousIds.map(id=>[id,{mastered:true}]));
  const overview=learningOverview(COURSE_UNITS,previous);
  assert.equal(overview.total,49);
  assert.equal(overview.approved,17);
  assert.equal(overview.consolidated,0);
  assert.equal(getNextLearningStep(COURSE_UNITS,previous).id,'condicionais_naturais');
});
test('os 10 silogismos têm validade demonstrável por exame exaustivo de modelos',()=>{
  assert.ok(CATEGORICAL_CASES.length>=8);
  let validCount=0,invalidCount=0;
  for(const item of CATEGORICAL_CASES){
    const valid=categoricalCaseValidity(item.forms);
    valid?validCount++:invalidCount++;
    const masks=Array.from({length:255},(_,i)=>i+1);
    const hasCounter=masks.some(mask=>categoricalCounterexample(item.forms,mask));
    assert.equal(valid,!hasCounter,item.id);
    assert.ok(item.explanation.length>=95,item.id);
    for(const terms of CATEGORICAL_CONTEXTS){
      const qs=buildCategoricalQuestions(item,terms);
      assert.equal(qs.length,3,item.id);
      assert.ok(qs.every(q=>q.correct>=0&&q.correct<q.options.length),item.id);
      assert.equal(qs[0].options[qs[0].correct],valid?'Sim, em todos os modelos das premissas.':'Não, existe contraexemplo.',item.id);
      if(!valid){
        const evidence=qs[1];
        assert.equal(evidence.options.length,3);
        assert.equal(new Set(evidence.options).size,3);
        assert.equal(evidence.modelMasks.length,3);
        assert.equal(evidence.modelMasks.filter(mask=>categoricalCounterexample(item.forms,mask)).length,1,item.id);
        assert.equal(categoricalCounterexample(item.forms,evidence.modelMasks[evidence.correct]),true,item.id);
      }
    }
  }
  assert.ok(validCount>=4);
  assert.ok(invalidCount>=4);
});
test('afirmações universais não criam existência e negações respeitam A E I O',()=>{
  const all={kind:'all',a:'S',b:'P'};
  const some={kind:'some',a:'S',b:'P'};
  const someNot={kind:'somenot',a:'S',b:'P'};
  // Modelo não vazio: alguém fora de S e P (perfil 000).
  assert.equal(categoricalValue(all,1),true);
  assert.equal(categoricalValue(some,1),false);
  assert.equal(categoricalValue(someNot,1),false);
  const models=Array.from({length:255},(_,i)=>i+1);
  for(const mask of models)assert.equal(!categoricalValue(all,mask),categoricalValue(someNot,mask));
  const none={kind:'none',a:'S',b:'P'};
  for(const mask of models)assert.equal(!categoricalValue(none,mask),categoricalValue(some,mask));
});
test('cenários de pressupostos pedem hipótese, alternativa e conclusão cautelosa',()=>{
  assert.ok(ASSUMPTION_CASES.length>=5);
  for(const item of ASSUMPTION_CASES){
    const qs=buildAssumptionQuestions(item);
    assert.equal(qs.length,3);
    assert.deepEqual(qs.map(q=>q.options[q.correct]),[item.assumption,item.alternative,item.limit]);
    assert.ok(qs.every(q=>q.options.length===3&&q.why.length>60));
    assert.ok(qs[1].options[qs[1].correct].includes(item.alternative));
    assert.ok(qs[2].options[qs[2].correct].includes(item.limit));
  }
});
