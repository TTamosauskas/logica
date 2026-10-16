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
import {OTHER_LOGIC_READINGS} from '../src/content/other-logics-course.js';
import {FOUNDATIONS_READINGS} from '../src/content/foundations-a.js';
import {GAP_READINGS_A} from '../src/content/gap-lessons-a.js';
import {GAP_READINGS_B} from '../src/content/gap-lessons-b.js';
import {MICRO_READINGS_A} from '../src/content/micro-lessons-a.js';
import {MICRO_READINGS_B} from '../src/content/micro-lessons-b.js';
import {FOCUSED_READINGS_A} from '../src/content/focused-lessons-a.js';
import {FOCUSED_READINGS_B} from '../src/content/focused-lessons-b.js';

const legacy=Object.fromEntries(Object.entries(UNIT4_TO_6_READINGS).filter(([id])=>id!=='modais'&&id!=='metateoria'));
const units=[UNIT1_READINGS,UNIT2_READINGS,UNIT3_READINGS,legacy,UNIT12_READINGS,UNIT13_READINGS,ERROR_READINGS,OTHER_LOGIC_READINGS,FOUNDATIONS_READINGS,GAP_READINGS_A,GAP_READINGS_B,MICRO_READINGS_A,MICRO_READINGS_B];
const readings=Object.assign({},...units,FOCUSED_READINGS_A,FOCUSED_READINGS_B);
const expected=COURSE_UNITS.flatMap(unit=>unit.ids);
const ids=units.flatMap(unit=>Object.keys(unit));

test('todas as 61 aulas recebem leitura progressiva, sem duplicação ou omissão',()=>{
  assert.equal(COURSE_UNITS.length,8);
  assert.equal(expected.length,61);
  assert.equal(Object.keys(LESSONS).length,61);
  assert.equal(ids.length,61);
  assert.equal(new Set(ids).size,61);
  assert.deepEqual(new Set(ids),new Set(expected));
  assert.deepEqual(Object.keys(UNIT1_READINGS),COURSE_UNITS[0].ids.filter(id=>!['pressupostos','condicionais_naturais','condicionais_excecao'].includes(id)));
  assert.deepEqual(Object.keys(UNIT12_READINGS),['pressupostos','categoricos2']);
  assert.deepEqual(Object.keys(UNIT2_READINGS),COURSE_UNITS[1].ids.filter(id=>!['equiv_algebra','equiv_distributividade','equiv_absorcao','equiv_condicionais','equiv_bicondicional','equiv_negacao_condicional'].includes(id)));
  assert.deepEqual(Object.keys(UNIT3_READINGS),COURSE_UNITS[2].ids.filter(id=>!['regras_inferencia','infer_conectivos'].includes(id)));
  assert.deepEqual(new Set(Object.keys(UNIT4_TO_6_READINGS)),new Set(['categoricos','predicados2','metateoria','modais']));
  assert.deepEqual(Object.keys(UNIT13_READINGS),COURSE_UNITS[4].ids.filter(id=>id!=='medicao_evidencias'));
  assert.deepEqual(Object.keys(ERROR_READINGS),COURSE_UNITS[5].ids.filter(id=>!['medias_ponderadas','simpson_composicao'].includes(id)));
  assert.deepEqual(Object.keys(OTHER_LOGIC_READINGS),COURSE_UNITS[6].ids.filter(id=>!['temporal_composta','temporal_condicional','fde_operacoes','fde_conjuncao','fde_disjuncao','intuicionista_negacao','intuicionista_dupla_negacao'].includes(id)));
  assert.deepEqual(Object.keys(FOUNDATIONS_READINGS),COURSE_UNITS[7].ids);
});

test('explicações têm objetivos, exemplos desenvolvidos, contraste e síntese',()=>{
  for(const id of expected){
    const r=readings[id];
    assert.ok(r.objective.length>=90,id+': objetivo insuficiente');
    assert.ok(r.sections.length>=3,id+': sequência didática de pelo menos 3 seções');
    assert.ok(r.sections.every(s=>s.heading.length>=15&&s.paragraphs.length===2),id+': desenvolvimento incompleto');
    const prose=r.sections.flatMap(s=>s.paragraphs);
    assert.ok(prose.every(x=>x.length>=100),id+': parágrafo não desenvolvido');
    assert.ok(prose.join(' ').split(/\s+/).length>=170,id+': explicação curta demais para a etapa');
    assert.ok(r.misconception.length>=100,id+': falta explicação de erro comum');
    assert.ok(r.summary.length>=100,id+': falta síntese do aprendizado');
    assert.ok(LESSONS[id]?.theory?.length>80,id+': compatibilidade com conteúdo base');
    assert.ok(LESSONS[id]?.quiz?.length>=3,id+': avaliação original não pode desaparecer');
  }
});

test('autoverificações são formativas e têm alternativa correta com justificativa',()=>{
  for(const [id,reading] of Object.entries(readings)){
    const q=reading.check;
    assert.equal(typeof q.question,'string',id);
    assert.ok(q.question.length>25,id);
    assert.equal(q.options.length,3,id);
    assert.ok(Number.isInteger(q.correct)&&q.correct>=0&&q.correct<q.options.length,id);
    assert.equal(new Set(q.options).size,q.options.length,id+': alternativas repetidas');
    assert.ok(q.why.length>=55,id+': feedback pouco explicativo');
  }
});

test('aulas e perguntas da unidade I não perdem seus IDs com a expansão',()=>{
  for(const id of Object.keys(UNIT1_READINGS)){
    assert.ok(UNIT1_READINGS[id]);
    assert.ok(readings[id]);
    assert.equal(readings[id],UNIT1_READINGS[id]);
  }
});
