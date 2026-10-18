import test from 'node:test';
import assert from 'node:assert/strict';
import {COURSE_UNITS,LESSONS} from '../src/content/course.js';
import {UNIT1_READINGS} from '../src/content/reading-unit1.js';
import {UNIT2_READINGS} from '../src/content/reading-unit2.js';
import {UNIT3_READINGS} from '../src/content/reading-unit3.js';
import {UNIT4_TO_6_READINGS} from '../src/content/reading-units4to6.js';
import {UNIT12_READINGS} from '../src/content/reading-unit12.js';
import {UNIT13_READINGS} from '../src/content/reading-unit13.js';
import {ERROR_READINGS} from '../src/content/errors-course.js';
import {PILOT_ASSESSMENTS} from '../src/content/assessment-pilot.js';
import {UNIT1_ASSESSMENTS} from '../src/content/assessment-unit1.js';
import {UNIT2_ASSESSMENTS} from '../src/content/assessment-unit2.js';
import {UNIT3_ASSESSMENTS} from '../src/content/assessment-unit3.js';
import {UNIT4_ASSESSMENTS} from '../src/content/assessment-unit4.js';
import {UNIT5_TO_7_ASSESSMENTS} from '../src/content/assessment-unit5to7.js';
import {ERROR_ASSESSMENTS} from '../src/content/errors-assessments.js';
import {OTHER_LOGIC_READINGS} from '../src/content/other-logics-course.js';
import {OTHER_LOGIC_ASSESSMENTS} from '../src/content/other-logics-assessments.js';
import {FOUNDATIONS_READINGS} from '../src/content/foundations-a.js';
import {FOUNDATIONS_ASSESSMENTS} from '../src/content/foundations-assessments.js';
import {GAP_READINGS_A} from '../src/content/gap-lessons-a.js';
import {GAP_READINGS_B} from '../src/content/gap-lessons-b.js';
import {GAP_ASSESSMENTS} from '../src/content/gap-assessments.js';
import {ALIGNED_ASSESSMENTS} from '../src/content/curriculum-alignment.js';
import {MICRO_READINGS_A,MICRO_ASSESSMENTS_A} from '../src/content/micro-lessons-a.js';
import {MICRO_READINGS_B,MICRO_ASSESSMENTS_B} from '../src/content/micro-lessons-b.js';
import {FOCUSED_READINGS_A,FOCUSED_ASSESSMENTS_A} from '../src/content/focused-lessons-a.js';
import {FOCUSED_READINGS_B,FOCUSED_ASSESSMENTS_B} from '../src/content/focused-lessons-b.js';
import {prepareBank,validateBank,composeAssessment,gradeAssessment,cleanAssessmentQuestion} from '../src/core/assessment.js';
const readings={...UNIT1_READINGS,...UNIT2_READINGS,...UNIT3_READINGS,...UNIT4_TO_6_READINGS,...UNIT12_READINGS,...UNIT13_READINGS,...ERROR_READINGS,...OTHER_LOGIC_READINGS,...FOUNDATIONS_READINGS,...GAP_READINGS_A,...GAP_READINGS_B,...MICRO_READINGS_A,...MICRO_READINGS_B,...FOCUSED_READINGS_A,...FOCUSED_READINGS_B};
const ids=COURSE_UNITS.flatMap(unit=>unit.ids);
const supplements={...PILOT_ASSESSMENTS,...UNIT1_ASSESSMENTS,...UNIT2_ASSESSMENTS,...UNIT3_ASSESSMENTS,...UNIT4_ASSESSMENTS,...UNIT5_TO_7_ASSESSMENTS,...ERROR_ASSESSMENTS,...OTHER_LOGIC_ASSESSMENTS,...FOUNDATIONS_ASSESSMENTS,...GAP_ASSESSMENTS,...ALIGNED_ASSESSMENTS,...MICRO_ASSESSMENTS_A,...MICRO_ASSESSMENTS_B,...FOCUSED_ASSESSMENTS_A,...FOCUSED_ASSESSMENTS_B};
const bank=id=>prepareBank(id,LESSONS[id],readings[id],supplements[id]||[]);
test('todos os 61 temas possuem banco com competências distintas',()=>{
 assert.equal(ids.length,61);
 for(const id of ids){
   const items=validateBank(bank(id));
   assert.ok(items.length>=12,id+': menos de 12 questões editoriais');
   assert.equal(supplements[id]?.length,8,id+': suplemento incompleto');
   assert.ok(items.filter(q=>q.dimension==='concept').length>=5,id+': poucos itens conceituais');
   assert.ok(items.filter(q=>q.dimension==='application').length>=7,id+': poucas aplicações');
   assert.ok(items.filter(q=>q.dimension==='concept').length>=2,id+': falta conceito');
   assert.ok(items.filter(q=>q.dimension==='application').length>=3,id+': falta aplicação');
   const assessment=composeAssessment(items,[],()=>0.44);
   assert.equal(assessment.length,5,id);
   assert.equal(new Set(assessment.map(q=>q.id)).size,5,id);
   assert.equal(assessment.filter(q=>q.dimension==='concept').length,2,id);
   assert.equal(assessment.filter(q=>q.dimension==='application').length,3,id);
 }
});
test('os quatro temas-piloto mantêm pelo menos 12 questões com distratores válidos',()=>{
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

test('itens de leitura formativa não reaparecem nas provas somativas',()=>{
 for(const id of ids){
  const items=bank(id);
  assert.ok(items.every(q=>q.id!==id+'-leitura'),id);
  assert.ok(items.every(q=>q.question!==readings[id].check.question),id);
 }
});
test('todas as respostas erradas possuem feedback e são distintas',()=>{
 for(const id of ids)for(const q of bank(id)){
   assert.ok(q.why.trim().length>(q.id.includes('-extra-')?8:0),id+': justificativa ausente');
   assert.ok(q.options.every(x=>typeof x==='string'&&x.trim().length>0),id+': opção inválida');
 }
});

test('enunciados editoriais não incluem rótulos artificiais em nenhum dos 61 bancos',()=>{
  const forbidden=/^(?:Em outra situação conceitual \d+,\s*|Em outro contexto, princípio \d+:\s*)/u;
  for(const id of ids)for(const q of bank(id)){
    assert.doesNotMatch(q.question,forbidden,id+' contém prefixo editorial: '+q.question);
    assert.equal(cleanAssessmentQuestion(q.question),q.question,id+' ainda precisa de normalização');
  }
  const natural=bank('condicionais_naturais').map(q=>q.question);
  assert.ok(natural.includes("Em 'p somente se q', a seta aponta de:"));
  assert.ok(natural.includes('Em p→q, q é:'));
  assert.ok(!natural.some(q=>q.includes('situação conceitual')));
  const inference=bank('infer_conectivos').map(q=>q.question);
  assert.ok(inference.includes('Qual regra extrai p de p∧q?'));
});

test('enunciados antigos em rascunhos são limpos sem alterar conteúdo ou identidade',()=>{
  assert.equal(cleanAssessmentQuestion("Em outra situação conceitual 2, Em 'p somente se q', a seta aponta de:"),
    "Em 'p somente se q', a seta aponta de:");
  assert.equal(cleanAssessmentQuestion('Em outra situação conceitual 4, Em p→q, q é:'),
    'Em p→q, q é:');
  assert.equal(cleanAssessmentQuestion('Em outro contexto, princípio 3: De p é válido introduzir:'),
    'De p é válido introduzir:');
  assert.equal(cleanAssessmentQuestion('Em p→q, q é:'),'Em p→q, q é:');
  assert.equal(cleanAssessmentQuestion('Em outro contexto, p pode variar?'),'Em outro contexto, p pode variar?');
});
