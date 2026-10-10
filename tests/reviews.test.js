import test from 'node:test';
import assert from 'node:assert/strict';
import {DAY_MS,REVIEW_DELAYS,beginReviewTracking,reviewStatus,recordReview,reviewQueue,studyRecommendation,consolidatedCount} from '../src/core/reviews.js';

const units=[{title:'Unidade A',ids:['fundamentos','operadores']},{title:'Unidade B',ids:['provas']}];
test('aprovação imediata não é domínio consolidado',()=>{
 const p={read:true,example:true,guided:true,independent:true,mastered:true,best:1};
 const now=Date.UTC(2026,9,10);
 assert.equal(beginReviewTracking(p,now),true);
 assert.equal(beginReviewTracking(p,now),false);
 assert.equal(p.review.dueAt,now+DAY_MS);
 assert.equal(reviewStatus(p,now).status,'scheduled');
 assert.equal(reviewStatus(p,now+DAY_MS).status,'due');
 assert.equal(reviewStatus(p,now+DAY_MS).consolidated,false);
 assert.equal(REVIEW_DELAYS[1],7*DAY_MS);
});
test('duas revisões espaçadas bem sucedidas consolidam domínio',()=>{
 const now=Date.UTC(2026,9,10),p={mastered:true};
 beginReviewTracking(p,now);
 let res=recordReview(p,{correct:8,total:10,missing:0,usedHint:false},now);
 assert.equal(res.accepted,false);
 res=recordReview(p,{correct:8,total:10,missing:0,usedHint:false},now+DAY_MS);
 assert.equal(res.passed,true);
 assert.equal(p.review.completed,1);
 assert.equal(p.review.dueAt,now+8*DAY_MS);
 assert.equal(reviewStatus(p,now+7*DAY_MS).status,'scheduled');
 res=recordReview(p,{correct:9,total:10,missing:0,usedHint:false},now+8*DAY_MS);
 assert.equal(res.passed,true);
 assert.equal(reviewStatus(p,now+8*DAY_MS).status,'consolidated');
 assert.equal(p.review.completed,2);
});
test('dicas, falta de respostas ou acertos abaixo de 80% impedem crédito',()=>{
 const now=1000000000000,p={mastered:true};beginReviewTracking(p,now);
 const attempts=[
   {correct:10,total:10,missing:0,usedHint:true},
   {correct:9,total:10,missing:1,usedHint:false},
   {correct:7,total:10,missing:0,usedHint:false},
 ];
 for(const attempt of attempts){
   const res=recordReview(p,attempt,now+DAY_MS);
   assert.equal(res.passed,false);
   assert.equal(p.review.completed,0);
 }
 assert.equal(p.review.failures,3);
 assert.equal(p.review.dueAt,now+DAY_MS);
});
test('fila prioriza revisões vencidas, preservando o próximo conteúdo do curso',()=>{
 const now=1000000000000;
 const lessons={fundamentos:{mastered:true},operadores:{mastered:true},provas:{read:true}};
 beginReviewTracking(lessons.fundamentos,now-4*DAY_MS);
 beginReviewTracking(lessons.operadores,now-2*DAY_MS);
 assert.deepEqual(reviewQueue(units,lessons,now).map(x=>x.id),['fundamentos','operadores']);
 assert.deepEqual(studyRecommendation(units,lessons,now),{kind:'review',id:'fundamentos',unitTitle:'Unidade A',count:2});
 assert.equal(consolidatedCount(units,lessons,now),0);
 lessons.fundamentos.review.consolidated=true;
 assert.equal(consolidatedCount(units,lessons,now),1);
});
test('aula não aprovada nunca inicia revisão',()=>{
 const p={read:true,mastered:false};
 assert.equal(beginReviewTracking(p,Date.now()),false);
 assert.equal(reviewStatus(p).status,'not-approved');
 assert.equal(p.review,undefined);
});
