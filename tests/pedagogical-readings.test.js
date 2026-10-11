import test from 'node:test';
import assert from 'node:assert/strict';
import {COURSE_UNITS,LESSONS} from '../src/content/course.js';
import {UNIT1_READINGS} from '../src/content/reading-unit1.js';

const expected=['fundamentos','operadores','traducao','falacias'];

test('todas as aulas da Unidade I têm explicações progressivas',()=>{
 assert.deepEqual(Object.keys(UNIT1_READINGS),expected);
 assert.deepEqual(COURSE_UNITS[0].ids,expected);
 for(const id of expected){
   const reading=UNIT1_READINGS[id];
   assert.ok(reading.objective.length>=90,id+' objetivo insuficiente');
   assert.ok(reading.sections.length>=3,id+' não tem progressão');
   const text=reading.sections.flatMap(s=>s.paragraphs).join(' ');
   assert.ok(text.split(/\s+/).length>=170,id+' leitura continua muito resumida');
   assert.ok(reading.sections.every(s=>s.heading&&s.paragraphs.length>=2),id+' seções sem desenvolvimento');
   assert.ok(reading.misconception.length>=100,id+' falta contraste conceitual');
   assert.ok(reading.summary.length>=110,id+' falta síntese');
   assert.ok(LESSONS[id].quiz.length>=3,id+' avaliação original não pode desaparecer');
 }
});
test('autoverificações formativas possuem alternativas e justificativas coerentes',()=>{
 for(const [id,r] of Object.entries(UNIT1_READINGS)){
   const q=r.check;
   assert.equal(typeof q.question,'string',id);
   assert.equal(q.options.length,3,id);
   assert.ok(Number.isInteger(q.correct)&&q.correct>=0&&q.correct<q.options.length,id);
   assert.ok(q.why.length>55,id+' resposta sem explicação');
   assert.equal(new Set(q.options).size,q.options.length,id+' alternativas repetidas');
 }
});
test('demais 13 aulas continuam disponíveis com o conteúdo original',()=>{
 assert.equal(Object.keys(LESSONS).length,17);
 for(const unit of COURSE_UNITS.slice(1)){
   for(const id of unit.ids){
     assert.ok(LESSONS[id].theory.length>90,id);
     assert.equal(UNIT1_READINGS[id],undefined);
   }
 }
});
