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
  assert.match(app,/renderPedagogyBridge\(support\.bridges\[slot\],slot,section\.heading\)/);
  assert.match(app,/data-caction="bridge-check"/);
  assert.match(app,/data-caction="bridge-hint"/);
  assert.match(app,/data-bridge-feedback role="status" aria-live="polite"/);
  assert.match(app,/feedback\.dataset\.result=correct\?'correct':'retry'/);
  assert.match(app,/const result=gradeAssessment\(questions,answers\)/);
});

/**
 * Matriz editorial de regressão: identifica conteúdos que antes eram cobrados
 * antes da seção introdutória. O teste verifica tanto o texto apresentado até
 * o ponto de decisão quanto o foco da própria questão. Não substitui revisão
 * humana de pertinência semântica.
 */
test('questões de conceitos sensíveis respeitam a seção em que foram ensinados',()=>{
  const checks=[
    ['condicionais_naturais',0,/suficiente/i,/inscriç[aã]o/i],
    ['condicionais_naturais',1,/necessári/i,/somente se/i],
    ['condicionais_naturais',2,/p se q/i,/feira/i],
    ['classificacao',0,/bivalência/i,/valores/i],
    ['regras_inferencia',0,/modus ponens/i,/p→q e p/i],
    ['regras_inferencia',1,/modus tollens/i,/p→q e ¬q/i],
    ['infer_conectivos',1,/conjunção/i,/introdução do E/i],
    ['silogismos',1,/silogismo hipotético/i,/p→q e q→r/i],
    ['silogismos',2,/silogismo disjuntivo/i,/pasta A/i],
    ['provas',0,/prova formal/i,/prova formal/i],
    ['provas',1,/modus ponens/i,/modus ponens/i],
    ['categoricos2',0,/I e O/i,/forma/i],
    ['categoricos2',1,/contradição/i,/contradiz/i],
    ['predicados2',0,/relação/i,/Ajuda/i],
    ['probabilidade',0,/positivos falsos/i,/99/i],
    ['vieses_julgamento',1,/ancoragem/i,/bicicleta/i],
    ['vieses_julgamento',2,/enquadramento/i,/sobrevivência/i],
    ['vieses_decisao',1,/calibrad/i,/previsões/i],
    ['vieses_decisao',2,/sobrevivência/i,/empresas/i],
    ['ilusoes_graficos',0,/participantes/i,/80%/i],
    ['ilusoes_graficos',1,/redução relativa/i,/redução absoluta/i],
    ['ilusoes_graficos',2,/variações sucessivas/i,/20%/i],
    ['ilusoes_inferencia',1,/desistiram/i,/terminaram a compra/i],
    ['ilusoes_inferencia',2,/hipóteses/i,/cem hipóteses/i],
    ['oficina_erros',1,/ataque retórico/i,/quem discorda/i],
    ['modais',2,/□◇p/i,/□◇p/i],
    ['epistemica',2,/KₐKᵦp/i,/KₐKᵦp/i],
    ['difusa',1,/conjunção/i,/μ\(p\)/i],
    ['paraconsistente',1,/FDE/i,/FDE/i],
    ['fde_conjuncao',0,/suporte negativo/i,/suporte positivo/i],
    ['intuicionista_dupla_negacao',2,/w0/i,/w0/i],
    ['semantica_modelos',2,/satisfatível/i,/p∧q/i]
  ];
  for(const [id,stage,taught,asked] of checks){
    const reading=readings[id], bridge=PEDAGOGY_BRIDGES[id].bridges[stage];
    const positions=[0,Math.floor((reading.sections.length-1)/2),reading.sections.length-1];
    const available=reading.sections.slice(0,positions[stage]+1)
      .flatMap(section=>section.paragraphs).join(' ');
    assert.match(available,taught,id+' precisa apresentar o conceito antes da questão '+(stage+1));
    assert.match(bridge.question+' '+bridge.options[bridge.correct],asked,id+' precisa perguntar sobre o conceito da seção');
  }
  assert.doesNotMatch(PEDAGOGY_BRIDGES.condicionais_naturais.bridges[0].question,
    /somente se|condição necessária|modus tollens/i,
    'A primeira questão de Condição suficiente não pode antecipar a seção seguinte');
});
