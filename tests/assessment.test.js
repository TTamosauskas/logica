import test from 'node:test';
import assert from 'node:assert/strict';
import {COURSE_UNITS,LESSONS} from '../src/content/course.js';
import {UNIT1_READINGS} from '../src/content/reading-unit1.js';
import {UNIT2_READINGS} from '../src/content/reading-unit2.js';
import {UNIT3_READINGS} from '../src/content/reading-unit3.js';
import {UNIT4_TO_6_READINGS} from '../src/content/reading-units4to6.js';
import {UNIT12_READINGS} from '../src/content/reading-unit12.js';
import {UNIT13_READINGS} from '../src/content/reading-unit13.js';
import {PILOT_ASSESSMENTS} from '../src/content/assessment-pilot.js';
import {prepareBank,validateBank,composeAssessment,gradeAssessment} from '../src/core/assessment.js';
const readings={...UNIT1_READINGS,...UNIT2_READINGS,...UNIT3_READINGS,...UNIT4_TO_6_READINGS,...UNIT12_READINGS,...UNIT13_READINGS};
const ids=COURSE_UNITS.flatMap(unit=>unit.ids);
const bank=id=>prepareBank(id,LESSONS[id],readings[id],PILOT_ASSESSMENTS[id]||[]);
test('todos os 23 temas possuem banco com competências distintas',()=>{
 assert.equal(ids.length,23);
 for(const id of ids){
   const items=validateBank(bank(id));
   assert.ok(items.filter(q=>q.dimension==='concept').length>=2,id+': falta conceito');
   assert.ok(items.filter(q=>q.dimension==='application').length>=3,id+': falta aplicação');
   const assessment=composeAssessment(items,[],()=>0.44);
   assert.equal(assessment.length,5,id);
   assert.equal(new Set(assessment.map(q=>q.id)).size,5,id);
   assert.equal(assessment.filter(q=>q.dimension==='concept').length,2,id);
   assert.equal(assessment.filter(q=>q.dimension==='application').length,3,id);
 }
});
test('pilotos alcançam pelo menos 12 questões com distratores válidos',()=>{
 for(const id of Object.keys(PILOT_ASSESSMENTS)) assert.ok(bank(id).length>=12,id);
});
test('correção separa desempenho geral do conceito central',()=>{
 const questions=composeAssessment(bank('probabilidade'),[],()=>0.3);
 const right=questions.map(q=>String(q.correct));
 assert.equal(gradeAssessment(questions,right).passed,true);
 const applied=questions.findIndex(q=>q.dimension==='application');
 const conceptual=questions.findIndex(q=>q.dimension==='concept');
 const incorrect=(i)=>String((questions[i].correct+1)%questions[i].options.length);
 const mostlyRight=[...right];mostlyRight[applied]=incorrect(applied);
 assert.deepEqual([gradeAssessment(questions,mostlyRight).overall,gradeAssessment(questions,mostlyRight).concepts,gradeAssessment(questions,mostlyRight).passed],[4,2,true]);
 const conceptError=[...right];conceptError[conceptual]=incorrect(conceptual);
 assert.equal(gradeAssessment(questions,conceptError).passed,false);
 assert.equal(gradeAssessment(questions,conceptError).concepts,1);
 const applicationErrors=[...right];
 for(const i of questions.map((q,i)=>q.dimension==='application'?i:-1).filter(i=>i>=0).slice(0,2))applicationErrors[i]=incorrect(i);
 assert.equal(gradeAssessment(questions,applicationErrors).passed,false);
 assert.equal(gradeAssessment(questions,applicationErrors).concepts,2);
 assert.equal(gradeAssessment(questions,[...right.slice(0,4),undefined]).passed,false);
});
test('retentativas preservam ids e alternativas corretas sem duplicação',()=>{
 const items=bank('causalidade');
 const first=composeAssessment(items,[],()=>0.17);
 const second=composeAssessment(items,[{questionIds:first.map(q=>q.id)}],()=>0.17);
 assert.equal(second.length,5);
 assert.ok(second.some(q=>!first.some(x=>x.id===q.id)));
 for(const q of [...first,...second]){
   const original=items.find(x=>x.id===q.id);
   assert.equal(q.options[q.correct],original.options[original.correct]);
 }
});
test('a composição não altera o banco editorial',()=>{
 const original=bank('traducao');const snap=JSON.stringify(original);
 composeAssessment(original,[],()=>0.25);
 assert.equal(JSON.stringify(original),snap);
});
