import test from 'node:test';
import assert from 'node:assert/strict';
import {COURSE_UNITS,LESSONS} from '../src/content/course.js';
import {UNIT1_READINGS} from '../src/content/reading-unit1.js';
import {UNIT2_READINGS} from '../src/content/reading-unit2.js';
import {UNIT3_READINGS} from '../src/content/reading-unit3.js';
import {UNIT4_TO_6_READINGS} from '../src/content/reading-units4to6.js';
import {UNIT12_READINGS} from '../src/content/reading-unit12.js';
import {UNIT13_READINGS} from '../src/content/reading-unit13.js';

const units=[UNIT1_READINGS,UNIT2_READINGS,UNIT3_READINGS,UNIT4_TO_6_READINGS,UNIT12_READINGS,UNIT13_READINGS];
const readings=Object.assign({},...units);
const expected=COURSE_UNITS.flatMap(unit=>unit.ids);
const ids=units.flatMap(unit=>Object.keys(unit));

test('todas as 23 aulas recebem leitura progressiva, sem duplicação ou omissão',()=>{
  assert.equal(COURSE_UNITS.length,7);
  assert.equal(expected.length,23);
  assert.equal(Object.keys(LESSONS).length,23);
  assert.equal(ids.length,23);
  assert.equal(new Set(ids).size,23);
  assert.deepEqual(new Set(ids),new Set(expected));
  assert.deepEqual(Object.keys(UNIT1_READINGS),COURSE_UNITS[0].ids.filter(id=>id!=='pressupostos'));
  assert.deepEqual(Object.keys(UNIT12_READINGS),['pressupostos','categoricos2']);
  assert.deepEqual(Object.keys(UNIT2_READINGS),COURSE_UNITS[1].ids);
  assert.deepEqual(Object.keys(UNIT3_READINGS),COURSE_UNITS[2].ids);
  assert.deepEqual(Object.keys(UNIT4_TO_6_READINGS),COURSE_UNITS.slice(3).flatMap(unit=>unit.ids).filter(id=>id!=='categoricos2'&&!Object.keys(UNIT13_READINGS).includes(id)));
  assert.deepEqual(Object.keys(UNIT13_READINGS),COURSE_UNITS[4].ids);
});

test('explicações têm objetivos, exemplos desenvolvidos, contraste e síntese',()=>{
  for(const id of expected){
    const r=readings[id];
    assert.ok(r.objective.length>=90,id+': objetivo insuficiente');
    assert.equal(r.sections.length,3,id+': sequência didática de 3 seções');
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
