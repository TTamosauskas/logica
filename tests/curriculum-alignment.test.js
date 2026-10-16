import test from 'node:test';
import assert from 'node:assert/strict';
import {COURSE_UNITS,LESSONS} from '../src/content/course.js';
import {MODULES} from '../src/content/modules.js';
import {numberCourseModules,numberedLesson} from '../src/core/course-numbering.js';
import {MICRO_LESSONS_A,MICRO_READINGS_A,MICRO_WORKED_A,MICRO_ASSESSMENTS_A,MICRO_PRACTICE_A} from '../src/content/micro-lessons-a.js';
import {MICRO_LESSONS_B,MICRO_READINGS_B,MICRO_WORKED_B,MICRO_ASSESSMENTS_B,MICRO_PRACTICE_B} from '../src/content/micro-lessons-b.js';
import {FOCUSED_LESSONS_A,FOCUSED_READINGS_A,FOCUSED_WORKED_A,FOCUSED_ASSESSMENTS_A,FOCUSED_PRACTICE_A} from '../src/content/focused-lessons-a.js';
import {FOCUSED_LESSONS_B,FOCUSED_READINGS_B,FOCUSED_WORKED_B,FOCUSED_ASSESSMENTS_B,FOCUSED_PRACTICE_B} from '../src/content/focused-lessons-b.js';
import {WORKED_EXAMPLES} from '../src/content/example-walkthroughs.js';
import {ALIGNED_ASSESSMENTS,ALIGNED_BASIC_PRACTICE,COMPETENCY_OWNER,ASSESSMENT_SCOPE,validateCompetencyOrder} from '../src/content/curriculum-alignment.js';
import {REWRITE_CHAINS,makeRewriteQuestions} from '../src/core/precision-lab.js';
import {prepareBank,validateBank,composeAssessment,gradeAssessment} from '../src/core/assessment.js';
import {getNextLearningStep} from '../src/core/learning-path.js';
import {SYLLOGISM_TEMPLATE_IDS,syllogismTemplatesFor,translationTemplatesFor} from '../src/core/practice-scope.js';
import {ARGUMENT_TEMPLATES,TRANSLATION_TEMPLATES} from '../src/content/translation.js';
const originalGaps=['condicionais_naturais','equiv_algebra','equiv_condicionais','regras_inferencia','negacao_quantificadores','medicao_evidencias','medias_ponderadas','temporal_composta','fde_operacoes','intuicionista_negacao'];
const focused={...FOCUSED_LESSONS_A,...FOCUSED_LESSONS_B};
const newLessons={...MICRO_LESSONS_A,...MICRO_LESSONS_B};
const readings={...MICRO_READINGS_A,...MICRO_READINGS_B,...FOCUSED_READINGS_A,...FOCUSED_READINGS_B};
const worked={...MICRO_WORKED_A,...MICRO_WORKED_B,...FOCUSED_WORKED_A,...FOCUSED_WORKED_B};
const supplements={...MICRO_ASSESSMENTS_A,...MICRO_ASSESSMENTS_B,...FOCUSED_ASSESSMENTS_A,...FOCUSED_ASSESSMENTS_B};
const practice={...MICRO_PRACTICE_A,...MICRO_PRACTICE_B,...FOCUSED_PRACTICE_A,...FOCUSED_PRACTICE_B};
const focusIds=Object.keys(focused),microIds=Object.keys(newLessons);
const courseIds=COURSE_UNITS.flatMap(u=>u.ids);

test('as oito unidades somam 61 aulas distintas; as 49 anteriores preservam IDs',()=>{
 assert.equal(COURSE_UNITS.length,8);
 assert.equal(courseIds.length,61);
 assert.equal(new Set(courseIds).size,61);
 assert.equal(Object.keys(LESSONS).length,61);
 assert.equal(MODULES.length,62);
 assert.equal(microIds.length,12);
 assert.equal(focusIds.length,9);
 assert.ok(originalGaps.every(id=>courseIds.includes(id)));
 assert.ok(microIds.every(id=>courseIds.includes(id)));
 assert.equal(MODULES.find(m=>m.id==='condicionais_naturais').no,'40');
 assert.equal(MODULES.find(m=>m.id==='equivalencias').no,'06');
 assert.equal(MODULES.find(m=>m.id==='modais').no,'17');
 assert.equal(MODULES.find(m=>m.id==='metateoria').no,'15');
});

test('numeração de exibição segue o percurso, sem sobrescrever números legados',()=>{
 const display=numberCourseModules(COURSE_UNITS,MODULES);
 const byId=new Map(display.map(m=>[m.id,m]));
 courseIds.forEach((id,i)=>assert.equal(byId.get(id)?.no,String(i+1).padStart(2,'0'),id));
 assert.equal(byId.get('condicionais_naturais').no,'04');
 assert.equal(byId.get('condicionais_excecao').no,'05');
 assert.equal(byId.get('misto').no,'★');
 assert.equal(numberedLesson(COURSE_UNITS,MODULES,'condicionais_naturais').no,'04');
 assert.equal(MODULES.find(m=>m.id==='condicionais_naturais').no,'40','número histórico não deve mudar');
 assert.notEqual(display[0],MODULES[0],'numeração não muta objetos persistidos');
});

test('nove aulas de origem e doze microaulas mantêm seis etapas completas, sem introduzir vários temas',()=>{
 for(const id of [...focusIds,...microIds]){
  const r=readings[id],e=worked[id],base=LESSONS[id];
  assert.ok(r?.objective.length>=90,id);
  assert.equal(r.sections.length,3,id);
  assert.ok(r.sections.every(s=>s.heading.length>=15&&s.paragraphs.length===2&&s.paragraphs.every(p=>p.length>=100)),id);
  assert.ok(r.misconception.length>=100&&r.summary.length>=100,id);
  assert.equal(r.check.options.length,3,id);
  assert.ok(r.check.why.length>=55,id);
  assert.ok(base.theory.length>=450,id);
  assert.equal(base.quiz.length,4,id);
  assert.equal(WORKED_EXAMPLES[id],e,id);
  assert.equal(e.steps.length,3,id);
  assert.ok(e.steps.every(x=>x.formal.length>=9&&x.concrete.length>=25&&x.reason.length>=25),id);
  assert.equal(e.check.options.length,3,id);
  assert.ok(e.check.why.length>=35,id);
 }
});

test('21 bancos somativos avaliam uma competência e não repetem perguntas da leitura ou prática',()=>{
 for(const id of [...focusIds,...microIds]){
  const p=practice[id],bank=prepareBank(id,LESSONS[id],readings[id],supplements[id]);
  assert.equal(p.length,6,id);
  assert.equal(validateBank(bank).length,12,id);
  assert.equal(bank.filter(x=>x.dimension==='concept').length,5,id);
  assert.equal(bank.filter(x=>x.dimension==='application').length,7,id);
  const all=[readings[id].check.question,worked[id].check.question,...p.map(x=>x.question),...bank.map(x=>x.question)];
  assert.equal(new Set(all).size,all.length,id+' apresenta questão repetida');
  for(const q of [...p,...bank])assert.ok(q.options[q.correct]&&q.why.length>=25,id);
  const sample=composeAssessment(bank,[],()=>0.37);
  assert.equal(sample.filter(q=>q.dimension==='concept').length,2,id);
  assert.equal(sample.filter(q=>q.dimension==='application').length,3,id);
  const answers=sample.map(q=>String(q.correct));
  assert.equal(gradeAssessment(sample,answers).passed,true,id);
  const concept=sample.findIndex(q=>q.dimension==='concept');
  answers[concept]=String((sample[concept].correct+1)%3);
  assert.equal(gradeAssessment(sample,answers).passed,false,id);
 }
});

test('as aulas separadas aparecem depois das competências prévias',()=>{
 const ahead=(a,b)=>assert.ok(courseIds.indexOf(a)<courseIds.indexOf(b),a+' deve vir antes de '+b);
 ahead('condicionais_naturais','condicionais_excecao');
 ahead('equiv_algebra','equiv_distributividade');
 ahead('equiv_distributividade','equiv_absorcao');
 ahead('equiv_condicionais','equiv_bicondicional');
 ahead('equiv_bicondicional','equiv_negacao_condicional');
 ahead('regras_inferencia','infer_conectivos');
 ahead('negacao_quantificadores','quantificadores_escopo');
 ahead('medias_ponderadas','simpson_composicao');
 ahead('temporal_composta','temporal_condicional');
 ahead('fde_operacoes','fde_conjuncao');
 ahead('fde_conjuncao','fde_disjuncao');
 ahead('intuicionista_negacao','intuicionista_dupla_negacao');
 assert.deepEqual(validateCompetencyOrder(COURSE_UNITS),[]);
 for(const [competency,id] of Object.entries(COMPETENCY_OWNER))assert.ok(courseIds.includes(id),competency);
 for(const [id,ks] of Object.entries(ASSESSMENT_SCOPE))assert.ok(courseIds.includes(id)&&ks.length>0);
});

test('cadeias de equivalências não migram de volta para aulas anteriores',()=>{
 const groups={
 equivalencias:['implicacao','negacao-conjuncao'],
 equiv_condicionais:['contrapositiva'],
 equiv_distributividade:['distribuicao'],
 equiv_absorcao:['absorcao'],
 equiv_bicondicional:['bicondicional']
 };
 for(const [id,ids] of Object.entries(groups))for(const chainId of ids){
  const chain=REWRITE_CHAINS.find(x=>x.id===chainId);
  assert.ok(chain,id+': '+chainId);
  const q=makeRewriteQuestions(chain,()=>0.3);
  assert.equal(q.length,4,id);
  assert.ok(q.every(item=>item.options[item.correct]&&item.why));
 }
 assert.ok(!groups.equiv_condicionais.includes('bicondicional'));
 assert.ok(!groups.equiv_condicionais.includes('distribuicao'));
});

test('aulas originais não perdem progresso ao inserir microcompetências',()=>{
 const saved={equivalencias:{mastered:true},condicionais_naturais:{mastered:true},metateoria:{mastered:true},modais:{mastered:true}};
 for(const id of Object.keys(saved))assert.ok(courseIds.includes(id)&&saved[id].mastered);
 const completed=Object.fromEntries(courseIds.filter(id=>!microIds.includes(id)).map(id=>[id,{mastered:true}]));
 assert.equal(getNextLearningStep(COURSE_UNITS,completed).id,'condicionais_excecao');
});

test('práticas introdutórias de falácias, FDE e intuicionismo mantêm escopo próprio',()=>{
 for(const [id,qs] of Object.entries(ALIGNED_ASSESSMENTS)){
  assert.equal(qs.length,8,id);
  assert.equal(qs.filter(x=>x.dimension==='concept').length,4,id);
  assert.equal(qs.filter(x=>x.dimension==='application').length,4,id);
 }
 for(const id of ['paraconsistente','intuicionista'])assert.equal(ALIGNED_BASIC_PRACTICE[id].length,6);
 assert.ok(!ALIGNED_ASSESSMENTS.traducao.some(x=>/contrapositiva|a menos que|quantificador/.test(x.question)));
});

test('os três níveis de tradução e silogismos continuam sem antecipar inferências',()=>{
 for(const level of ['easy','medium','hard']){
  const pool=translationTemplatesFor(level,TRANSLATION_TEMPLATES);
  assert.ok(pool.length>0&&pool.every(x=>typeof x.say==='function'&&!('valid' in x)));
  const sy=syllogismTemplatesFor(level,ARGUMENT_TEMPLATES);
  assert.ok(sy.length>0);
  assert.deepEqual(sy.map(x=>x.id),ARGUMENT_TEMPLATES.filter(x=>SYLLOGISM_TEMPLATE_IDS[level].includes(x.id)).map(x=>x.id));
 }
});
