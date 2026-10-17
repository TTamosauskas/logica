import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {COURSE_UNITS,LESSONS} from '../src/content/course.js';
import {WORKED_EXAMPLES} from '../src/content/example-walkthroughs.js';
import {PEDAGOGY_BRIDGES} from '../src/content/pedagogy-bridges.js';
import {sectionBridgePositions,practiceTransferGuide,auditLessonJourneys} from '../src/core/pedagogy-continuity.js';
import {UNIT1_READINGS} from '../src/content/reading-unit1.js';
import {UNIT2_READINGS} from '../src/content/reading-unit2.js';
import {UNIT3_READINGS} from '../src/content/reading-unit3.js';
import {UNIT4_TO_6_READINGS} from '../src/content/reading-units4to6.js';
import {UNIT12_READINGS} from '../src/content/reading-unit12.js';
import {UNIT13_READINGS} from '../src/content/reading-unit13.js';
import {ERROR_READINGS} from '../src/content/errors-course.js';
import {OTHER_LOGIC_READINGS} from '../src/content/other-logics-course.js';
import {FOUNDATIONS_READINGS} from '../src/content/foundations-a.js';
import {GAP_READINGS_A} from '../src/content/gap-lessons-a.js';
import {GAP_READINGS_B} from '../src/content/gap-lessons-b.js';
import {MICRO_READINGS_A,MICRO_PRACTICE_A} from '../src/content/micro-lessons-a.js';
import {MICRO_READINGS_B,MICRO_PRACTICE_B} from '../src/content/micro-lessons-b.js';
import {FOCUSED_READINGS_A,FOCUSED_PRACTICE_A} from '../src/content/focused-lessons-a.js';
import {FOCUSED_READINGS_B,FOCUSED_PRACTICE_B} from '../src/content/focused-lessons-b.js';
import {ERROR_PRACTICE} from '../src/content/errors-practice.js';
import {GAP_PRACTICE} from '../src/content/gap-practice.js';
import {FOUNDATIONS_PRACTICE} from '../src/content/foundations-practice.js';
import {OTHER_LOGIC_LAB_IDS} from '../src/core/other-logics-labs.js';
import {prepareBank,validateBank,composeAssessment} from '../src/core/assessment.js';

const readings={...UNIT1_READINGS,...UNIT2_READINGS,...UNIT3_READINGS,...UNIT4_TO_6_READINGS,
  ...UNIT12_READINGS,...UNIT13_READINGS,...ERROR_READINGS,...OTHER_LOGIC_READINGS,
  ...FOUNDATIONS_READINGS,...GAP_READINGS_A,...GAP_READINGS_B,
  ...MICRO_READINGS_A,...MICRO_READINGS_B,...FOCUSED_READINGS_A,...FOCUSED_READINGS_B};
// Os geradores diretos abaixo correspondem às entradas explícitas de GENERATORS,
// enquanto as coleções cobrem os geradores adicionados dinamicamente em src/app.js.
const direct=['inducao','abducao','probabilidade','causalidade','pressupostos','categoricos2',
  'provas','predicados2','arvores','falacias','modais','temporal','temporal_composta',
  'temporal_condicional','fde_operacoes','intuicionista_negacao','paraconsistente','intuicionista',
  'categoricos','silogismos','deducao','traducao','fundamentos','operadores','compostas',
  'demorgan','classificacao','equivalencias','equiv_algebra','equiv_condicionais',
  'equiv_distributividade','equiv_absorcao','equiv_bicondicional','argumentos'];
const generatorIds=new Set([...direct,...OTHER_LOGIC_LAB_IDS,...Object.keys(ERROR_PRACTICE),
  ...Object.keys(GAP_PRACTICE),...Object.keys(FOUNDATIONS_PRACTICE),
  ...Object.keys(MICRO_PRACTICE_A),...Object.keys(MICRO_PRACTICE_B),
  ...Object.keys(FOCUSED_PRACTICE_A),...Object.keys(FOCUSED_PRACTICE_B)]);
const ids=COURSE_UNITS.flatMap(u=>u.ids);

test('auditoria de continuidade cruza teoria, 183 pontes, 61 exemplos e geradores próprios',()=>{
  const audit=auditLessonJourneys(COURSE_UNITS,LESSONS,readings,PEDAGOGY_BRIDGES,WORKED_EXAMPLES,generatorIds);
  assert.deepEqual(audit.issues,[],audit.issues.join('; '));
  assert.equal(audit.records.length,61);
  assert.equal(audit.records.reduce((n,x)=>n+x.bridges,0),183);
  assert.ok(audit.records.every(x=>x.workedSteps>=2&&x.practiceReady&&x.sections>=3));
  for(const id of ids){
    const reading=readings[id],guide=practiceTransferGuide(id,readings,PEDAGOGY_BRIDGES,WORKED_EXAMPLES,'guided');
    assert.equal(guide.objective,reading.objective);
    assert.equal(guide.steps.length,3,id);
    assert.ok(guide.steps.every(x=>x.trim().length>=20),id);
    assert.ok(guide.worked.steps.every(x=>x.formal&&x.concrete&&x.reason),id);
    assert.equal(practiceTransferGuide(id,readings,PEDAGOGY_BRIDGES,WORKED_EXAMPLES,'independent'),null,id);
    assert.equal(practiceTransferGuide(id,readings,PEDAGOGY_BRIDGES,WORKED_EXAMPLES,'review'),null,id);
    assert.deepEqual(sectionBridgePositions(reading.sections.length).length,3);
    const check=WORKED_EXAMPLES[id].check;
    assert.ok(check.options[check.correct]&&check.why,id+' sem verificação do exemplo');
    assert.notEqual(check.question,reading.check.question,id+' repetiu a pergunta');
    assert.ok(PEDAGOGY_BRIDGES[id].bridges.every(b=>b.question!==check.question&&b.question!==reading.check.question),
      id+' repetiu uma questão-ponte sem progressão');
  }
});

test('a auditoria aponta ausências e a ponte não aparece em provas independentes',()=>{
  const changed={...readings};
  delete changed.fundamentos;
  const audit=auditLessonJourneys(COURSE_UNITS,LESSONS,changed,PEDAGOGY_BRIDGES,WORKED_EXAMPLES,generatorIds);
  assert.ok(audit.issues.some(x=>x.includes('fundamentos:')&&x.includes('leitura')));
  const without=new Set(generatorIds);without.delete('probabilidade');
  assert.ok(auditLessonJourneys(COURSE_UNITS,LESSONS,readings,PEDAGOGY_BRIDGES,WORKED_EXAMPLES,without)
    .issues.some(x=>x.includes('probabilidade:')&&x.includes('gerador')));
  assert.throws(()=>sectionBridgePositions(2),/ao menos três/);
  assert.throws(()=>practiceTransferGuide('tema-inexistente',readings,PEDAGOGY_BRIDGES,WORKED_EXAMPLES,'guided'),/incompleta/);
});

test('a tela de exercício oferece exemplos apenas na prática guiada',()=>{
  const app=readFileSync(new URL('../src/app.js',import.meta.url),'utf8');
  assert.match(app,/practiceTransferGuide\(courseAttempt\.id,COURSE_READINGS,PEDAGOGY_BRIDGES,WORKED_EXAMPLES,stage\)/);
  assert.match(app,/renderWorkedReminder\(guide\)/);
  assert.match(app,/renderTransferPrep\(id\)/);
  assert.match(app,/data-course-back="1"/);
});

test('a amostra de avaliações permanece aplicável após a prática assistida',()=>{
  for(const id of ids){
    const lesson=LESSONS[id];
    assert.ok(lesson.quiz.length>=4,id+' sem avaliação básica');
    const bank=validateBank(prepareBank(id,lesson,readings[id],[]));
    assert.ok(bank.length>=4,id);
    // Os suplementos são validados separadamente em assessment.test.js.
    assert.ok(bank.every(q=>q.dimension==='concept'||q.dimension==='application'),id);
  }
});

test('audita a versão efetiva de leituras com identificadores duplicados',()=>{
  // Essas fontes históricas continuam existindo: o curso utiliza a última
  // variante no agregador da interface e NÃO uma versão anterior.
  assert.equal(readings.metateoria,FOUNDATIONS_READINGS.metateoria);
  assert.equal(readings.modais,OTHER_LOGIC_READINGS.modais);
  for(const id of ['condicionais_naturais','equiv_algebra','equiv_condicionais',
    'regras_inferencia','negacao_quantificadores']){
    assert.equal(readings[id],FOCUSED_READINGS_A[id]);
    assert.notEqual(readings[id],GAP_READINGS_A[id]);
  }
  for(const id of ['medias_ponderadas','temporal_composta','fde_operacoes','intuicionista_negacao']){
    assert.equal(readings[id],FOCUSED_READINGS_B[id]);
    assert.notEqual(readings[id],GAP_READINGS_B[id]);
  }
});
