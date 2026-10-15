import test from 'node:test';
import assert from 'node:assert/strict';
import {COURSE_UNITS,LESSONS} from '../src/content/course.js';
import {MODULES} from '../src/content/modules.js';
import {OTHER_LOGIC_LESSONS,OTHER_LOGIC_READINGS,OTHER_LOGIC_WORKED} from '../src/content/other-logics-course.js';
import {OTHER_LOGIC_ASSESSMENTS} from '../src/content/other-logics-assessments.js';
import {WORKED_EXAMPLES} from '../src/content/example-walkthroughs.js';
import {prepareBank,composeAssessment,gradeAssessment} from '../src/core/assessment.js';
import {routeFromHash} from '../src/core/navigation.js';
import {
 OTHER_LOGIC_LAB_IDS,createOtherLogicLab,fdeNot,fdeAnd,fdeOr,
 fuzzyZadeh,intuitionisticForce
} from '../src/core/other-logics-labs.js';

const expected=['modais','temporal','epistemica','deontica','difusa','paraconsistente','intuicionista'];

test('a unidade VII contém sete aulas, mantém o id modal antigo e eleva o total a 49',()=>{
 assert.equal(COURSE_UNITS.length,8);
 assert.deepEqual(COURSE_UNITS[6].ids.filter(id=>expected.includes(id)),expected);
 assert.equal(COURSE_UNITS.flatMap(u=>u.ids).length,49);
 assert.equal(MODULES.length,50);
 assert.equal(new Set(COURSE_UNITS.flatMap(u=>u.ids)).size,49);
 for(const id of expected){
  assert.ok(MODULES.some(m=>m.id===id));
  assert.ok(LESSONS[id]);
  assert.deepEqual(routeFromHash('#aula-'+id,MODULES.map(m=>m.id),Object.keys(LESSONS)),{view:'course',id});
 }
 const oldModal=MODULES.find(m=>m.id==='modais');
 assert.equal(oldModal.no,'17');
 assert.match(oldModal.name,/Lógica modal/);
 assert.ok(!OTHER_LOGIC_LAB_IDS.includes('temporal'),'temporal tem laboratório temporal separado');
});

test('sete aulas possuem três seções, reflexão e exemplos com três passos justificados',()=>{
 for(const id of expected){
  const reading=OTHER_LOGIC_READINGS[id],worked=WORKED_EXAMPLES[id],lesson=OTHER_LOGIC_LESSONS[id];
  assert.ok(reading.objective.length>=90,id);
  assert.equal(reading.sections.length,3,id);
  for(const section of reading.sections){
   assert.ok(section.heading.length>=15,id);
   assert.equal(section.paragraphs.length,2,id);
   assert.ok(section.paragraphs.every(x=>x.length>=100),id);
  }
  assert.ok(reading.misconception.length>=100,id);
  assert.ok(reading.summary.length>=100,id);
  assert.ok(reading.check.why.length>=55,id);
  assert.equal(worked,OTHER_LOGIC_WORKED[id]);
  assert.equal(worked.steps.length,3,id);
  assert.ok(worked.steps.every(s=>s.formal.length>=9&&s.concrete.length>=25&&s.reason.length>=25),id);
  assert.ok(worked.check.why.length>=35,id);
  assert.ok(lesson.theory.length>=450,id);
  assert.equal(lesson.quiz.length,4,id);
 }
});

test('cada aula dispõe de 12 questões inéditas para aprovação e avaliação de conceitos',()=>{
 for(const id of expected){
  const bank=prepareBank(id,LESSONS[id],OTHER_LOGIC_READINGS[id],OTHER_LOGIC_ASSESSMENTS[id]);
  assert.equal(bank.length,12,id);
  assert.equal(bank.filter(q=>q.dimension==='concept').length,5,id);
  assert.equal(bank.filter(q=>q.dimension==='application').length,7,id);
  const all=[OTHER_LOGIC_READINGS[id].check.question,OTHER_LOGIC_WORKED[id].check.question,
    ...bank.map(q=>q.question)];
  assert.equal(new Set(all).size,all.length,id+': perguntas repetidas');
  const selected=composeAssessment(bank,[],()=>0.31);
  assert.equal(selected.length,5,id);
  assert.equal(selected.filter(q=>q.dimension==='concept').length,2,id);
  assert.equal(selected.filter(q=>q.dimension==='application').length,3,id);
  const right=selected.map(q=>String(q.correct));
  assert.equal(gradeAssessment(selected,right).passed,true,id);
  const conceptIndex=selected.findIndex(q=>q.dimension==='concept');
  const wrong=[...right];wrong[conceptIndex]=String((selected[conceptIndex].correct+1)%3);
  assert.equal(gradeAssessment(selected,wrong).passed,false,id);
 }
});

test('a prática apresenta modelos semânticos específicos e respostas calculadas',()=>{
 for(const id of OTHER_LOGIC_LAB_IDS){
  const lab=createOtherLogicLab(id,'hard',()=>0.1);
  assert.ok(lab.title.length>15,id);
  assert.ok(lab.context.length>40,id);
  assert.ok(lab.scope.length>70,id);
  assert.ok(lab.cards.length>=3,id);
  assert.ok(lab.items.length>=3,id);
  for(const item of lab.items){
   assert.ok(item.options.includes(item.value),id+': resultado sem alternativa');
   assert.ok(item.reason.length>=35,id);
  }
 }
 const fuzzy=createOtherLogicLab('difusa','easy',()=>0);
 assert.equal(fuzzy.items[0].value,'0,3');
 assert.equal(fuzzy.items[1].value,'0,4');
 assert.equal(fuzzy.items[2].value,'0,7');
});

test('FDE preserva negação e evita que conflito gere qualquer informação',()=>{
 assert.equal(fdeNot('B'),'B');
 assert.equal(fdeNot('N'),'N');
 assert.equal(fdeNot('T'),'F');
 assert.equal(fdeAnd('B','N'),'F');
 assert.equal(fdeOr('B','N'),'T');
 assert.equal(fdeAnd('T','F'),'F');
});

test('forçamento intuicionista persiste e fornece contraexemplo ao terceiro excluído',()=>{
 const p={op:'atom',name:'p'},n={op:'not',a:p},lem={op:'or',a:p,b:n};
 const vals=[{p:false},{p:true},{p:false}],order=[[0,1,2],[1],[2]];
 const force=(node,world=0)=>intuitionisticForce(vals,order,node,world);
 assert.equal(force(p),false);
 assert.equal(force(n),false);
 assert.equal(force(lem),false);
 assert.equal(force({op:'not',a:{op:'not',a:lem}}),true);
 assert.equal(force(p,1),true);
});

test('operações difusas são graus e requerem intervalo de 0 a 1',()=>{
 const r=fuzzyZadeh(0.7,0.4);
 assert.ok(Math.abs(r.notP-0.3)<1e-9);
 assert.equal(r.and,0.4);
 assert.equal(r.or,0.7);
 assert.throws(()=>fuzzyZadeh(1.2,0.4),/intervalo/);
});
