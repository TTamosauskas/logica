import test from 'node:test';
import assert from 'node:assert/strict';
import {recordAssessmentAttempt,beginAssessmentRetry} from '../src/core/assessment-attempt.js';
import {gradeAssessment} from '../src/core/assessment.js';

const questions=()=>Array.from({length:5},(_,i)=>({
  id:'lesson-'+(i+1),question:'Pergunta '+i,options:['A','B','C'],
  correct:i%3,dimension:i<2?'concept':'application',why:'Justificativa '+i
}));
test('corrigir conserva cinco questões, alternativas e respostas escolhidas',()=>{
  const original=questions(),a={history:[],draft:{questions:original,answers:{'0':'1'}}};
  const answers=original.map(q=>String(q.correct));answers[0]='1';
  const snapshot=JSON.stringify(original),grade=gradeAssessment(original,answers);
  assert.equal(grade.passed,false);
  assert.equal(recordAssessmentAttempt(a,grade,answers,12345),true);
  assert.equal(JSON.stringify(a.draft.questions),snapshot);
  assert.deepEqual(a.draft.answers,Object.fromEntries(answers.map((x,i)=>[i,x])));
  assert.deepEqual(a.draft.result,grade);
  assert.equal(a.draft.gradedAt,12345);
  assert.equal(a.last.at,12345);
  assert.equal(a.history.length,1);
  assert.deepEqual(a.history[0].questionIds,original.map(q=>q.id));
  assert.equal(recordAssessmentAttempt(a,grade,answers,12346),false,'não registra nota duas vezes');
  assert.equal(a.history.length,1);
});

test('apenas Tente outra vez substitui perguntas; não permite alterar rascunho ainda aberto',()=>{
  const original=questions(),a={history:[],draft:{questions:original,answers:{}}};
  const replacement=questions().map(q=>({...q,id:'new-'+q.id}));
  assert.equal(beginAssessmentRetry(a,replacement,222),false);
  assert.equal(a.draft.questions,original);
  const answers=original.map(q=>String(q.correct)),grade=gradeAssessment(original,answers);
  assert.equal(recordAssessmentAttempt(a,grade,answers,333),true);
  assert.equal(beginAssessmentRetry(a,replacement,444),true);
  assert.equal(a.draft.questions,replacement);
  assert.deepEqual(a.draft.answers,{});
  assert.equal(a.draft.result,undefined);
  assert.equal(a.history.length,1,'novo conjunto só é registrado depois de corrigido');
  assert.equal(beginAssessmentRetry(a,original,555),false);
});

test('histórico mantém limite de vinte registros sem apagar o resultado mostrado',()=>{
  const original=questions(),a={history:Array.from({length:20},(_,i)=>({at:i,questionIds:[]})),
    draft:{questions:original,answers:{}}};
  const answers=original.map(q=>String(q.correct)),grade=gradeAssessment(original,answers);
  assert.equal(recordAssessmentAttempt(a,grade,answers,88),true);
  assert.equal(a.history.length,20);
  assert.equal(a.history.at(-1).at,88);
  assert.equal(a.draft.result.passed,true);
});
