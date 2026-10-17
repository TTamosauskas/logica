import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {COURSE_UNITS} from '../src/content/course.js';
import {PEDAGOGY_BRIDGES,validatePedagogyBridges} from '../src/content/pedagogy-bridges.js';
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
import {MICRO_READINGS_A} from '../src/content/micro-lessons-a.js';
import {MICRO_READINGS_B} from '../src/content/micro-lessons-b.js';
import {FOCUSED_READINGS_A} from '../src/content/focused-lessons-a.js';
import {FOCUSED_READINGS_B} from '../src/content/focused-lessons-b.js';

const readings={...UNIT1_READINGS,...UNIT2_READINGS,...UNIT3_READINGS,...UNIT4_TO_6_READINGS,
  ...UNIT12_READINGS,...UNIT13_READINGS,...ERROR_READINGS,...OTHER_LOGIC_READINGS,
  ...FOUNDATIONS_READINGS,...GAP_READINGS_A,...GAP_READINGS_B,
  ...MICRO_READINGS_A,...MICRO_READINGS_B,...FOCUSED_READINGS_A,...FOCUSED_READINGS_B};

test('Pedagogia V3 cobre todas as 61 aulas em oito unidades, com uma questão por seção',()=>{
  const ids=COURSE_UNITS.flatMap(unit=>unit.ids);
  assert.equal(COURSE_UNITS.length,8);
  assert.equal(ids.length,61);
  assert.equal(new Set(ids).size,61);
  assert.deepEqual(Object.keys(PEDAGOGY_BRIDGES).sort(),[...ids].sort());
  assert.equal(validatePedagogyBridges(),true);
  let count=0;
  for(const id of ids){
    const lesson=PEDAGOGY_BRIDGES[id],reading=readings[id];
    assert.ok(reading,id+' sem leitura');
    assert.ok(reading.sections.length>=3,id+' precisa de ao menos três seções');
    assert.equal(lesson.bridges.length,3,`Aula ${id} precisa das três decisões progressivas`);
    assert.deepEqual(lesson.bridges.map(x=>x.kind),['identificar','completar','transferir']);
    assert.equal(lesson.handoff.steps.length,3);
    assert.ok(lesson.handoff.steps.every(x=>x.length>=20));
    for(const activity of lesson.bridges){
      count++;
      assert.ok(activity.question.length>=30,id+' pergunta insuficiente');
      assert.ok(activity.options[activity.correct],id+' sem resposta');
      assert.equal(new Set(activity.options).size,3,id+' com alternativas duplicadas');
      assert.ok(activity.hint.length>=25,id+' sem pista útil');
      assert.ok(activity.explanation.length>=50,id+' sem explicação suficiente');
      assert.ok(activity.feedback.every(x=>x.length>=20),id+' sem diagnóstico por opção');
    }
  }
  assert.equal(count,183);
});

test('validação rejeita alternativas e índices inconsistentes',()=>{
  const copy=structuredClone(PEDAGOGY_BRIDGES);
  copy.fundamentos.bridges[0].correct=4;
  assert.throws(()=>validatePedagogyBridges(copy),/inválida/);
});

test('questões-ponte formativas não alteram critérios de aprovação nem o estado persistente',()=>{
  const app=readFileSync(new URL('../src/app.js',import.meta.url),'utf8');
  assert.match(app,/renderPedagogyBridge\(support\.bridges\[slot\],slot\)/);
  assert.match(app,/data-caction="bridge-check"/);
  assert.match(app,/data-caction="bridge-hint"/);
  assert.match(app,/data-bridge-feedback role="status" aria-live="polite"/);
  assert.match(app,/feedback\.dataset\.result=correct\?'correct':'retry'/);
  assert.match(app,/const result=gradeAssessment\(questions,answers\)/);
});
