import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {PEDAGOGY_BRIDGES,validatePedagogyBridges} from '../src/content/pedagogy-bridges.js';
import {UNIT1_READINGS} from '../src/content/reading-unit1.js';
import {UNIT2_READINGS} from '../src/content/reading-unit2.js';

const readings={...UNIT1_READINGS,...UNIT2_READINGS};

test('piloto V3 cobre fundamentos, tradução e equivalências sem mudar os bancos avaliativos',()=>{
  assert.deepEqual(Object.keys(PEDAGOGY_BRIDGES).sort(),['equivalencias','fundamentos','traducao']);
  assert.equal(validatePedagogyBridges(),true);
  for(const [id,unit] of Object.entries(PEDAGOGY_BRIDGES)){
    assert.equal(unit.bridges.length,readings[id].sections.length,`Cada seção de ${id} precisa de uma decisão`);
    assert.deepEqual(unit.bridges.map(x=>x.kind),['identificar','completar','transferir']);
    assert.equal(unit.handoff.steps.length,3);
    for(const activity of unit.bridges){
      assert.ok(activity.options[activity.correct]);
      assert.ok(activity.explanation.length>=50);
      assert.ok(activity.feedback.every(x=>x.length>=20));
    }
  }
});

test('validação rejeita alternativas e índices inconsistentes',()=>{
  const copy=structuredClone(PEDAGOGY_BRIDGES);
  copy.fundamentos.bridges[0].correct=4;
  assert.throws(()=>validatePedagogyBridges(copy),/inválida/);
});

test('questões-ponte são formativas, com pista e diagnóstico, sem alterar critérios de aprovação',()=>{
  const app=readFileSync(new URL('../src/app.js',import.meta.url),'utf8');
  assert.match(app,/renderPedagogyBridge\(support\.bridges\[i\],i\)/);
  assert.match(app,/data-caction="bridge-check"/);
  assert.match(app,/data-caction="bridge-hint"/);
  assert.match(app,/data-bridge-feedback role="status" aria-live="polite"/);
  assert.match(app,/feedback\.dataset\.result=correct\?'correct':'retry'/);
  assert.match(app,/const result=gradeAssessment\(questions,answers\)/);
});
