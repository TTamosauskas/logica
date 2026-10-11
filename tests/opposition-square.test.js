import test from 'node:test';
import assert from 'node:assert/strict';
import {SQUARE_FORMS,SQUARE_MODES,SQUARE_EXAMPLES,squareTruth,squareWorlds,squareConsequences,squarePairRelation,buildSquareQuestions} from '../src/core/opposition-square.js';
import {LESSONS} from '../src/content/course.js';
import {UNIT12_READINGS} from '../src/content/reading-unit12.js';
const forms=Object.keys(SQUARE_FORMS);
const labels={V:'É necessariamente verdadeira.',F:'É necessariamente falsa.','?':'Não é possível determinar apenas com essa informação.'};

test('todas as formas A E I O são definidas e S vazio é tratado explicitamente',()=>{
  assert.deepEqual(forms,['A','E','I','O']);
  assert.deepEqual(squareTruth({inside:0,outside:0}),{A:true,E:true,I:false,O:false});
  assert.deepEqual(squareTruth({inside:1,outside:0}),{A:true,E:false,I:true,O:false});
  assert.deepEqual(squareTruth({inside:0,outside:1}),{A:false,E:true,I:false,O:true});
  assert.deepEqual(squareTruth({inside:1,outside:1}),{A:false,E:false,I:true,O:true});
  assert.equal(squareWorlds('modern').length,4);
  assert.equal(squareWorlds('traditional').length,3);
  assert.equal(SQUARE_EXAMPLES.length,4);
  assert.throws(()=>squareTruth({inside:-1,outside:0}));
});
test('todas as inferências são obtidas de todos os modelos compatíveis',()=>{
  for(const mode of Object.keys(SQUARE_MODES)){
    for(const known of forms)for(const value of [true,false]){
      const consequences=squareConsequences(mode,known,value);
      const relevant=squareWorlds(mode).map(w=>squareTruth(w)).filter(w=>w[known]===value);
      assert.ok(relevant.length>0);
      for(const form of forms){
        const trueCount=relevant.filter(w=>w[form]).length;
        const expected=trueCount===relevant.length?'V':trueCount===0?'F':'?';
        assert.equal(consequences[form],expected,mode+'/'+known+'/'+value+'/'+form);
      }
      assert.equal(consequences[known],value?'V':'F');
    }
  }
});
test('contradições são incondicionais; demais relações dependem da existência de S',()=>{
  for(const mode of Object.keys(SQUARE_MODES)){
    for(const pair of ['AO','EI'])assert.equal(squarePairRelation(mode,pair).valid,true);
    for(const pair of ['AE','IO','AI','EO'])assert.equal(squarePairRelation(mode,pair).valid,mode==='traditional',mode+'/'+pair);
  }
  assert.equal(squareConsequences('modern','A',true).I,'?');
  assert.equal(squareConsequences('traditional','A',true).I,'V');
  assert.equal(squareConsequences('modern','E',true).O,'?');
  assert.equal(squareConsequences('traditional','E',true).O,'V');
  assert.equal(squareConsequences('modern','A',false).O,'V');
  assert.equal(squareConsequences('modern','I',true).E,'F');
});
test('questões sorteadas reproduzem o modelo em ambos os regimes',()=>{
  let sequence=1;
  const random=()=>{sequence=(sequence*16807)%2147483647;return sequence/2147483647};
  for(const mode of Object.keys(SQUARE_MODES)){
    for(let k=0;k<200;k++){
      const questions=buildSquareQuestions(mode,random);
      assert.equal(questions.length,2);
      for(const q of questions){assert.equal(q.options.length,3);assert.equal(new Set(q.options).size,3);assert.ok(q.why.length>60)}
      const match=questions[0].question.match(/sabemos que ([AEIO]) é ([VF]). O que podemos afirmar sobre ([AEIO])/);
      assert.ok(match,'A questão precisa informar a premissa e o alvo');
      const [,known,value,target]=match;
      const expected=squareConsequences(mode,known,value==='V')[target];
      assert.equal(questions[0].options[questions[0].correct],labels[expected]);
      const relation=['AO','EI','AE','IO','AI','EO'].find(pair=>questions[1].question.includes(squarePairRelation(mode,pair).label));
      assert.ok(relation);
      assert.equal(questions[1].options[questions[1].correct],squarePairRelation(mode,relation).valid
        ?'Sim, essa relação sempre se mantém neste regime.'
        :'Não, há um cenário permitido que a contraria.');
    }
  }
});
test('texto e avaliação inicial apresentam quadrado, contrárias e conjuntos vazios',()=>{
  const reading=UNIT12_READINGS.categoricos2;
  const prose=reading.sections.flatMap(s=>s.paragraphs).join(' ');
  for(const word of ['contradição','contrárias','subcontrárias','subalternação','vazio','tradicional','moderna'])assert.ok(prose.includes(word),word);
  assert.equal(reading.sections.length,3);
  assert.ok(LESSONS.categoricos2.example.includes('quadrado'));
  assert.equal(LESSONS.categoricos2.quiz.length,4);
  assert.ok(LESSONS.categoricos2.quiz.slice(0,3).every(q=>q.why.length>60));
});
