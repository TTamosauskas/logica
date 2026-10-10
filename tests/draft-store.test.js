import test from 'node:test';
import assert from 'node:assert/strict';
import { EXERCISE_DRAFTS_KEY,EXAM_DRAFT_KEY,DRAFT_VERSION,hasPendingWork,readExerciseDrafts,readExamDraft,mostRecentUnfinished } from '../src/core/draft-store.js';

test('detecta trabalho iniciado em tabelas, provas, tradução, diagramas e rascunho',()=>{
  assert.equal(hasPendingWork({answers:{}}),false);
  assert.equal(hasPendingWork({answers:{'0-1':'V'}}),true);
  assert.equal(hasPendingWork({special:{values:{0:'1'}}}),true);
  assert.equal(hasPendingWork({translation:{values:['p→q']}}),true);
  assert.equal(hasPendingWork({cat:{values:['∀xP(x)']}}),true);
  assert.equal(hasPendingWork({cat:{venn:{shaded:[1]}}}),true);
  assert.equal(hasPendingWork({metadata:{scratch:' rascunho '}}),true);
  assert.equal(hasPendingWork({answers:{'0-1':'V'},grade:{correct:1,total:2}}),false);
  assert.equal(hasPendingWork({answers:{'0-1':'V'},revealed:true}),false);
});

test('descarta rascunhos inválidos e impede acesso a módulos inexistentes',()=>{
  const known=['operadores'];
  assert.deepEqual(readExerciseDrafts('{quebrado',known),{});
  assert.deepEqual(readExerciseDrafts('{}',known),{});
  const json=JSON.stringify({version:DRAFT_VERSION,byMode:{
    operadores:{mode:'operadores',updatedAt:500,exercise:{mode:'operadores',answers:{'0-0':'F'}}},
    desconhecido:{mode:'desconhecido',updatedAt:600,exercise:{mode:'desconhecido'}}
  }});
  assert.deepEqual(Object.keys(readExerciseDrafts(json,known)),['operadores']);
  assert.equal(typeof EXERCISE_DRAFTS_KEY,'string');
  assert.equal(typeof EXAM_DRAFT_KEY,'string');
});

test('a retomada privilegia a sessão realmente mais recente',()=>{
  const drafts={
    fundamentos:{mode:'fundamentos',updatedAt:20,exercise:{answers:{'0-0':'V'}}},
    operadores:{mode:'operadores',updatedAt:30,exercise:{answers:{'0-0':'F'}}}
  };
  assert.equal(mostRecentUnfinished(drafts,null).mode,'operadores');
  const exam={updatedAt:40,questions:Array.from({length:12},()=>({id:'fundamentos',options:['V','F'],correct:0})),answers:Array(12).fill(null),result:null};
  assert.equal(mostRecentUnfinished(drafts,exam).type,'exam');
  exam.result={score:8,answers:Array(12).fill('0')};
  assert.equal(mostRecentUnfinished(drafts,exam).mode,'operadores');
});

test('restaura exatamente as doze questões e as escolhas de uma prova incompleta',()=>{
  const draft={version:DRAFT_VERSION,updatedAt:150,questions:Array.from({length:12},(_,i)=>({id:'fundamentos',options:['V','F'],correct:i%2})),answers:Array(12).fill(null),result:null};
  draft.answers[0]='1';draft.answers[8]='0';
  assert.deepEqual(readExamDraft(JSON.stringify(draft)),draft);
  assert.deepEqual(readExamDraft('invalid'),null);
  assert.deepEqual(readExamDraft(JSON.stringify({...draft,answers:['1']})),null);
});
