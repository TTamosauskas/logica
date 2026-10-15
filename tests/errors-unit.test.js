import test from 'node:test';
import assert from 'node:assert/strict';
import {COURSE_UNITS,LESSONS} from '../src/content/course.js';
import {MODULES} from '../src/content/modules.js';
import {ERROR_READINGS,ERROR_WORKED_EXAMPLES} from '../src/content/errors-course.js';
import {ERROR_ASSESSMENTS} from '../src/content/errors-assessments.js';
import {ERROR_PRACTICE} from '../src/content/errors-practice.js';
import {WORKED_EXAMPLES} from '../src/content/example-walkthroughs.js';
import {prepareBank,composeAssessment,gradeAssessment} from '../src/core/assessment.js';
import {buildIntegratedExamQuestions,ESSENTIAL_EXAM_LESSONS} from '../src/core/integrated-exam.js';
import {beginReviewTracking,reviewStatus,recordReview,DAY_MS} from '../src/core/reviews.js';
import {routeFromHash} from '../src/core/navigation.js';
const unit=COURSE_UNITS.find(u=>u.title.includes('Erros Lógicos Comuns'));
const ids=(unit?.ids||[]).filter(id=>id!=='medias_ponderadas');

test('a nova unidade contém sete aulas únicas e preserva as vinte e três antigas',()=>{
 assert.equal(COURSE_UNITS.length,8);
 assert.equal(MODULES.length,50);
 assert.equal(COURSE_UNITS.flatMap(u=>u.ids).length,49);
 assert.equal(ids.length,7);
 assert.equal(new Set(ids).size,7);
 for(const id of ids){
   assert.ok(MODULES.some(m=>m.id===id));
   assert.ok(LESSONS[id]);
   assert.deepEqual(routeFromHash('#aula-'+id,MODULES.map(m=>m.id),Object.keys(LESSONS)),
     {view:'course',id});
 }
});

test('cada aula oferece leitura longa, pergunta formativa e exemplo em três passos',()=>{
 for(const id of ids){
   const lesson=LESSONS[id],reading=ERROR_READINGS[id],example=WORKED_EXAMPLES[id];
   assert.ok(reading?.objective.length>=90,id);
   assert.ok(reading?.sections.length>=3,id);
   assert.ok(reading.sections.every(section=>section.heading.length>=15&&
     section.paragraphs.length===2&&section.paragraphs.every(p=>p.length>=100)),id);
   assert.ok(reading.misconception.length>=100&&reading.summary.length>=100,id);
   assert.equal(reading.check.options.length,3,id);
   assert.ok(reading.check.why.length>=55,id);
   assert.ok(lesson.theory.length>=450,id);
   assert.equal(example.steps.length,3,id);
   for(const step of example.steps){
     assert.ok(step.formal.length>=9,id);
     assert.ok(step.concrete.length>=25,id);
     assert.ok(step.reason.length>=25,id);
   }
   assert.equal(example.check.options.length,3,id);
   assert.ok(example.check.why.length>=35,id);
   assert.equal(example,ERROR_WORKED_EXAMPLES[id]);
 }
});

test('prática assistida e autônoma usam situações independentes da avaliação',()=>{
 for(const id of ids){
   const practice=ERROR_PRACTICE[id],bank=prepareBank(id,LESSONS[id],ERROR_READINGS[id],ERROR_ASSESSMENTS[id]);
   assert.equal(practice.length,6,id);
   assert.equal(bank.length,12,id);
   assert.equal(bank.filter(q=>q.dimension==='concept').length,5,id);
   assert.equal(bank.filter(q=>q.dimension==='application').length,7,id);
   const formative=[ERROR_READINGS[id].check.question,WORKED_EXAMPLES[id].check.question];
   const questions=[...formative,...practice.map(q=>q.question),...bank.map(q=>q.question)];
   assert.equal(new Set(questions).size,questions.length,id+': exercícios repetidos');
   for(const q of [...practice,...bank]){
     assert.equal(q.options.length,3,id);
     assert.equal(new Set(q.options).size,3,id);
     assert.ok(q.options[q.correct],id);
     assert.ok(q.why.length>=25,id);
   }
   const selected=composeAssessment(bank,[],()=>0.37);
   assert.equal(selected.length,5);
   assert.equal(selected.filter(q=>q.dimension==='concept').length,2);
   assert.equal(selected.filter(q=>q.dimension==='application').length,3);
   const right=selected.map(q=>String(q.correct));
   assert.equal(gradeAssessment(selected,right).passed,true);
   const firstConcept=selected.findIndex(q=>q.dimension==='concept');
   const altered=[...right];altered[firstConcept]=String((selected[firstConcept].correct+1)%3);
   assert.equal(gradeAssessment(selected,altered).passed,false);
 }
});

test('avaliação integrada contém 12 questões de oito unidades e duas aulas distintas da nova unidade',()=>{
 const questions=buildIntegratedExamQuestions(COURSE_UNITS,LESSONS,items=>items[0]);
 assert.equal(questions.length,12);
 assert.equal(new Set(questions.map(q=>q.id)).size,12);
 for(const id of ESSENTIAL_EXAM_LESSONS)assert.ok(questions.some(q=>q.id===id),id);
 assert.equal(questions.filter(q=>ids.includes(q.id)).length,2);
 for(const u of COURSE_UNITS)assert.ok(questions.some(q=>u.ids.includes(q.id)),u.title);
});

test('a aprovação inicial habilita duas revisões realmente espaçadas e sem dica',()=>{
 const start=Date.UTC(2026,9,14,12),p={mastered:true};
 assert.equal(beginReviewTracking(p,start),true);
 assert.equal(reviewStatus(p,start).status,'scheduled');
 assert.equal(reviewStatus(p,start+DAY_MS).status,'due');
 const first=recordReview(p,{correct:4,total:5,missing:0,usedHint:false},start+DAY_MS);
 assert.equal(first.passed,true);
 assert.equal(reviewStatus(p,start+DAY_MS+6*DAY_MS).status,'scheduled');
 const blocked=recordReview(p,{correct:5,total:5,missing:0,usedHint:true},start+8*DAY_MS);
 assert.equal(blocked.passed,false);
 const second=recordReview(p,{correct:5,total:5,missing:0,usedHint:false},start+8*DAY_MS);
 assert.equal(second.passed,true);
 assert.equal(reviewStatus(p,start+8*DAY_MS).consolidated,true);
});
