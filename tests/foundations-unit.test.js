import test from 'node:test';
import assert from 'node:assert/strict';
import {COURSE_UNITS,LESSONS} from '../src/content/course.js';
import {MODULES} from '../src/content/modules.js';
import {FOUNDATIONS_LESSONS,FOUNDATIONS_READINGS,FOUNDATIONS_WORKED} from '../src/content/foundations-a.js';
import {FOUNDATIONS_ASSESSMENTS} from '../src/content/foundations-assessments.js';
import {FOUNDATIONS_PRACTICE} from '../src/content/foundations-practice.js';
import {WORKED_EXAMPLES} from '../src/content/example-walkthroughs.js';
import {prepareBank,validateBank,composeAssessment,gradeAssessment} from '../src/core/assessment.js';
import {getNextLearningStep} from '../src/core/learning-path.js';
import {buildIntegratedExamQuestions} from '../src/core/integrated-exam.js';

const order=['sistemas_formais','sintaxe_formal','semantica_modelos','metateoria'];
test('a Unidade VII contém outras lógicas e a VIII quatro fundamentos, em 39 aulas',()=>{
 assert.equal(COURSE_UNITS.length,8);
 assert.match(COURSE_UNITS[6].title,/VII — Outras lógicas/);
 assert.match(COURSE_UNITS[7].title,/VIII — Fundamentos teóricos da lógica/);
 assert.deepEqual(COURSE_UNITS[7].ids,order);
 assert.equal(COURSE_UNITS[6].ids.length,7);
 assert.equal(COURSE_UNITS.flatMap(u=>u.ids).length,39);
 assert.equal(new Set(COURSE_UNITS.flatMap(u=>u.ids)).size,39);
 assert.equal(MODULES.length,40);
 assert.equal(MODULES.find(x=>x.id==='metateoria').no,'15');
 for(const id of order)assert.ok(MODULES.find(x=>x.id===id));
});
test('cada aula de fundamentos tem compreensão e exemplo justificado completos',()=>{
 for(const id of order){
  const r=FOUNDATIONS_READINGS[id],w=WORKED_EXAMPLES[id],lesson=FOUNDATIONS_LESSONS[id];
  assert.equal(w,FOUNDATIONS_WORKED[id],id);
  assert.ok(r.objective.length>=90,id);
  assert.equal(r.sections.length,3,id);
  assert.ok(r.sections.every(x=>x.heading.length>=15&&x.paragraphs.length===2&&x.paragraphs.every(p=>p.length>=100)),id);
  assert.ok(r.misconception.length>=100&&r.summary.length>=100,id);
  assert.equal(r.check.options.length,3,id);
  assert.ok(r.check.why.length>=55,id);
  assert.ok(lesson.theory.length>450,id);
  assert.equal(lesson.quiz.length,4,id);
  assert.equal(w.steps.length,3,id);
  for(const x of w.steps)assert.ok(x.formal.length>=9&&x.concrete.length>=25&&x.reason.length>=25,id);
  assert.equal(w.check.options.length,3,id);
  assert.ok(w.check.why.length>=35,id);
 }
});
test('prática é diferente das 12 questões somativas, com conceitos e aplicações',()=>{
 for(const id of order){
  const cases=FOUNDATIONS_PRACTICE[id],bank=prepareBank(id,LESSONS[id],FOUNDATIONS_READINGS[id],FOUNDATIONS_ASSESSMENTS[id]);
  assert.equal(cases.length,6,id);
  assert.equal(validateBank(bank).length,12,id);
  assert.equal(bank.filter(x=>x.dimension==='concept').length,5,id);
  assert.equal(bank.filter(x=>x.dimension==='application').length,7,id);
  const texts=[FOUNDATIONS_READINGS[id].check.question,FOUNDATIONS_WORKED[id].check.question,...cases.map(x=>x.question),...bank.map(x=>x.question)];
  assert.equal(texts.length,new Set(texts).size,id+': perguntas repetidas');
  for(const q of [...cases,...bank])assert.ok(q.options[q.correct]&&q.why.length>=20,id);
  const sample=composeAssessment(bank,[],()=>0.27);
  assert.equal(sample.length,5,id);
  assert.equal(sample.filter(q=>q.dimension==='concept').length,2,id);
  assert.equal(sample.filter(q=>q.dimension==='application').length,3,id);
  const correct=sample.map(q=>String(q.correct));
  assert.equal(gradeAssessment(sample,correct).passed,true,id);
  const first=sample.findIndex(q=>q.dimension==='concept');
  const fail=[...correct];fail[first]=String((sample[first].correct+1)%3);
  assert.equal(gradeAssessment(sample,fail).passed,false,id);
 }
});
test('o progresso legado da metateoria não se perde ao mudar o lugar curricular',()=>{
 const previous={metateoria:{mastered:true},modais:{mastered:true}};
 const ids=COURSE_UNITS.flatMap(u=>u.ids);
 assert.ok(ids.includes('metateoria')&&ids.includes('modais'));
 const orderTail=COURSE_UNITS[7].ids;
 assert.equal(orderTail.at(-1),'metateoria');
 assert.equal(previous.metateoria.mastered,true);
 const completed=Object.fromEntries(ids.filter(id=>id!=='sistemas_formais').map(id=>[id,{mastered:true}]));
 assert.equal(getNextLearningStep(COURSE_UNITS,completed).id,'sistemas_formais');
});
test('avaliação integrada permanece com 12 questões contemplando as oito unidades',()=>{
 const questions=buildIntegratedExamQuestions(COURSE_UNITS,LESSONS,items=>items[0]);
 assert.equal(questions.length,12);
 assert.equal(new Set(questions.map(q=>q.id)).size,12);
 for(const u of COURSE_UNITS)assert.ok(questions.some(q=>u.ids.includes(q.id)),u.title);
});
