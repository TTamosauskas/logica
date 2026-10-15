import test from 'node:test';
import assert from 'node:assert/strict';
import {COURSE_UNITS,LESSONS} from '../src/content/course.js';
import {MODULES} from '../src/content/modules.js';
import {GAP_LESSONS_A,GAP_READINGS_A,GAP_WORKED_A} from '../src/content/gap-lessons-a.js';
import {GAP_LESSONS_B,GAP_READINGS_B,GAP_WORKED_B} from '../src/content/gap-lessons-b.js';
import {GAP_ASSESSMENTS} from '../src/content/gap-assessments.js';
import {GAP_PRACTICE} from '../src/content/gap-practice.js';
import {WORKED_EXAMPLES} from '../src/content/example-walkthroughs.js';
import {ALIGNED_ASSESSMENTS,ALIGNED_BASIC_PRACTICE,COMPETENCY_OWNER,ASSESSMENT_SCOPE,validateCompetencyOrder} from '../src/content/curriculum-alignment.js';
import {REWRITE_CHAINS,makeRewriteQuestions} from '../src/core/precision-lab.js';
import {prepareBank,validateBank,composeAssessment,gradeAssessment} from '../src/core/assessment.js';
import {getNextLearningStep} from '../src/core/learning-path.js';
import {SYLLOGISM_TEMPLATE_IDS,syllogismTemplatesFor,translationTemplatesFor} from '../src/core/practice-scope.js';
import {ARGUMENT_TEMPLATES,TRANSLATION_TEMPLATES} from '../src/content/translation.js';
const gaps=['condicionais_naturais','equiv_algebra','equiv_condicionais','regras_inferencia','negacao_quantificadores',
 'medicao_evidencias','medias_ponderadas','temporal_composta','fde_operacoes','intuicionista_negacao'];
const readings={...GAP_READINGS_A,...GAP_READINGS_B};
const worked={...GAP_WORKED_A,...GAP_WORKED_B};
const base={...GAP_LESSONS_A,...GAP_LESSONS_B};
const courseIds=COURSE_UNITS.flatMap(x=>x.ids);

test('a revisão introduz dez aulas em oito unidades, sem renomear conquistas anteriores',()=>{
 assert.equal(COURSE_UNITS.length,8);
 assert.equal(courseIds.length,49);
 assert.equal(new Set(courseIds).size,49);
 assert.equal(Object.keys(LESSONS).length,49);
 assert.equal(MODULES.length,50);
 assert.deepEqual(new Set([...Object.keys(GAP_LESSONS_A),...Object.keys(GAP_LESSONS_B)]),new Set(gaps));
 for(const id of gaps){assert.ok(courseIds.includes(id),id);assert.ok(MODULES.some(x=>x.id===id),id)}
 assert.equal(MODULES.find(x=>x.id==='equivalencias').no,'06');
 assert.equal(MODULES.find(x=>x.id==='modais').no,'17');
 assert.equal(MODULES.find(x=>x.id==='metateoria').no,'15');
});

test('as novas competências são ensinadas antes de poderem ser cobradas',()=>{
 assert.deepEqual(validateCompetencyOrder(COURSE_UNITS),[]);
 for(const [key,owner] of Object.entries(COMPETENCY_OWNER))assert.ok(courseIds.includes(owner),key);
 for(const [id,keys] of Object.entries(ASSESSMENT_SCOPE)){
  assert.ok(courseIds.includes(id));
  assert.ok(keys.length>0);
 }
 assert.ok(courseIds.indexOf('equivalencias')<courseIds.indexOf('equiv_algebra'));
 assert.ok(courseIds.indexOf('equiv_algebra')<courseIds.indexOf('equiv_condicionais'));
 assert.ok(courseIds.indexOf('regras_inferencia')<courseIds.indexOf('provas'));
 assert.ok(courseIds.indexOf('temporal')<courseIds.indexOf('temporal_composta'));
});

test('dez leituras incluem teoria, reflexão e exemplos concretos de três passos',()=>{
 for(const id of gaps){
  const r=readings[id],e=WORKED_EXAMPLES[id],lesson=LESSONS[id];
  assert.equal(e,worked[id],id);
  assert.equal(lesson,base[id],id);
  assert.ok(r.objective.length>=90,id);
  assert.equal(r.sections.length,3,id);
  assert.ok(r.sections.every(x=>x.heading.length>=15&&x.paragraphs.length===2&&x.paragraphs.every(p=>p.length>=100)),id);
  assert.ok(r.misconception.length>=100&&r.summary.length>=100,id);
  assert.equal(r.check.options.length,3,id);
  assert.ok(r.check.why.length>=55,id);
  assert.ok(lesson.theory.length>450,id);
  assert.equal(lesson.quiz.length,4,id);
  assert.equal(e.steps.length,3,id);
  assert.ok(e.steps.every(x=>x.formal.length>=9&&x.concrete.length>=25&&x.reason.length>=25),id);
  assert.ok(e.check.why.length>=35,id);
 }
});

test('questões de prática e avaliação são diferentes e cobrem conceitos e aplicações',()=>{
 for(const id of gaps){
  const p=GAP_PRACTICE[id],bank=prepareBank(id,LESSONS[id],readings[id],GAP_ASSESSMENTS[id]);
  assert.equal(p.length,6,id);
  assert.equal(validateBank(bank).length,12,id);
  assert.equal(bank.filter(x=>x.dimension==='concept').length,5,id);
  assert.equal(bank.filter(x=>x.dimension==='application').length,7,id);
  const questions=[readings[id].check.question,worked[id].check.question,
   ...p.map(x=>x.question),...bank.map(x=>x.question)];
  assert.equal(questions.length,new Set(questions).size,id+' contém questão repetida');
  for(const q of [...p,...bank])assert.ok(q.options[q.correct]&&new Set(q.options).size===3&&q.why.length>=20,id);
  const attempt=composeAssessment(bank,[],()=>0.37);
  assert.equal(attempt.filter(x=>x.dimension==='concept').length,2,id);
  assert.equal(attempt.filter(x=>x.dimension==='application').length,3,id);
  const right=attempt.map(x=>String(x.correct));
  assert.equal(gradeAssessment(attempt,right).passed,true,id);
  const first=attempt.findIndex(x=>x.dimension==='concept');
  right[first]=String((attempt[first].correct+1)%3);
  assert.equal(gradeAssessment(attempt,right).passed,false,id);
 }
});

test('bancos alinhados substituem perguntas antecipadas sem encolher avaliações antigas',()=>{
 for(const [id,qs] of Object.entries(ALIGNED_ASSESSMENTS)){
  assert.equal(qs.length,8,id);
  assert.equal(qs.filter(x=>x.dimension==='concept').length,4,id);
  assert.equal(qs.filter(x=>x.dimension==='application').length,4,id);
  assert.equal(new Set(qs.map(x=>x.question)).size,8,id);
 }
 for(const id of ['paraconsistente','intuicionista']){
  const arr=ALIGNED_BASIC_PRACTICE[id];
  assert.equal(arr.length,6);
  assert.equal(new Set(arr.map(x=>x.question)).size,6);
 }
 assert.ok(!ALIGNED_ASSESSMENTS.traducao.some(x=>/contrapositiva|quantificador|a menos que|Todos os estudantes/.test(x.question)));
 assert.ok(!ALIGNED_ASSESSMENTS.equivalencias.some(x=>/absorção|distributividade|¬\(p→q\)/.test(x.question)));
});

test('cadeias de equivalência respeitam as três etapas curriculares e não se misturam',()=>{
 const groups={equivalencias:['implicacao','negacao-conjuncao'],
 equiv_algebra:['distribuicao','absorcao'],
 equiv_condicionais:['contrapositiva','negacao-disjuncao','bicondicional']};
 const ids=new Set();
 for(const [lesson,names] of Object.entries(groups)){
  assert.ok(LESSONS[lesson]&&names.length);
  for(const id of names){
   assert.ok(!ids.has(id),'cadeia repetida: '+id);ids.add(id);
   const chain=REWRITE_CHAINS.find(x=>x.id===id);
   assert.ok(chain,id);
   const questions=makeRewriteQuestions(chain,()=>0.32);
   assert.equal(questions.length,4,id);
   for(const q of questions)assert.ok(q.options[q.correct]&&q.why,id);
  }
 }
 assert.equal(ids.size,REWRITE_CHAINS.length);
});

test('progresso aprovado não desaparece porque uma aula nova foi inserida',()=>{
 const legacy=['equivalencias','modais','metateoria','falacias'];
 const saved=Object.fromEntries(legacy.map(id=>[id,{mastered:true}]));
 for(const id of legacy)assert.equal(saved[id].mastered,true);
 assert.ok(courseIds.includes('equiv_algebra'));
 const allButNew=Object.fromEntries(courseIds.filter(id=>!gaps.includes(id)).map(id=>[id,{mastered:true}]));
 assert.equal(getNextLearningStep(COURSE_UNITS,allButNew).id,'condicionais_naturais');
});

test('geradores de tradução e silogismos não antecipam inferências da próxima aula',()=>{
 for(const level of ['easy','medium','hard']){
  const cases=translationTemplatesFor(level,TRANSLATION_TEMPLATES);
  assert.ok(cases.length>0);
  assert.ok(cases.every(t=>typeof t.say==='function'));
  assert.ok(cases.every(t=>!('valid' in t)),'Tradução deve exigir tradução, não decidir argumento');
  const syllogisms=syllogismTemplatesFor(level,ARGUMENT_TEMPLATES);
  assert.ok(syllogisms.length>0);
  assert.deepEqual(syllogisms.map(x=>x.id),ARGUMENT_TEMPLATES.filter(t=>SYLLOGISM_TEMPLATE_IDS[level].includes(t.id)).map(x=>x.id));
  assert.ok(syllogisms.every(t=>!['modustollens','simplificacao','cadeia'].includes(t.id)));
 }
});
