import test from 'node:test';
import assert from 'node:assert/strict';
import {learningOverview,nextCourseMessage,formatReviewDate,attemptDecision,examWeakAreas} from '../src/core/learning-feedback.js';
const days=86400000,now=Date.UTC(2026,9,10,21);
const units=[{title:'I',ids:['fundamentos','operadores']},{title:'II',ids:['traducao']}];
const modules={fundamentos:'Fundamentos',operadores:'Operadores',traducao:'Tradução'};
const lesson={id:'operadores',unitTitle:'I',label:'Praticar com ajuda'};
test('aprovação inicial não preenche automaticamente domínio consolidado',()=>{
 const progress={fundamentos:{mastered:true,review:{completed:0,dueAt:now+days}},operadores:{mastered:false}};
 const s=learningOverview(units,progress,now);
 assert.equal(s.total,3);assert.equal(s.approved,1);assert.equal(s.consolidated,0);
 assert.equal(s.upcoming.length,1);assert.equal(s.allApproved,false);assert.equal(s.allConsolidated,false);
});
test('sem novas aulas, consolidação programada não é anunciada como percurso concluído',()=>{
 const progress=Object.fromEntries(units.flatMap(u=>u.ids).map(id=>[id,{mastered:true,review:{completed:0,dueAt:now+days}}]));
 const v=learningOverview(units,progress,now);
 const next=nextCourseMessage(v,{id:null},id=>modules[id]);
 assert.equal(next.kind,'scheduled');
 assert.equal(next.title,'Consolidação em andamento');
 assert.match(next.description,/Próxima revisão: Fundamentos/);
 assert.match(next.description,/às|, \d\d:\d\d|\d\d:\d\d/);
 assert.match(next.button,/agendadas/);
});
test('revisão vencida tem precedência sobre nova aula',()=>{
 const progress={fundamentos:{mastered:true,review:{completed:0,dueAt:now-days}}};
 const next=nextCourseMessage(learningOverview(units,progress,now),lesson,id=>modules[id]);
 assert.equal(next.kind,'due');assert.equal(next.id,'fundamentos');
});
test('formação só é consolidada após todas as revisões',()=>{
 const progress=Object.fromEntries(units.flatMap(u=>u.ids).map(id=>[id,{mastered:true,review:{consolidated:true}}]));
 const next=nextCourseMessage(learningOverview(units,progress,now),{id:null},id=>modules[id]);
 assert.equal(next.kind,'complete');assert.equal(next.title,'Formação consolidada');
});
test('primeira correção determina validade mesmo que resultado posterior chegue a 100%',()=>{
 const failed=attemptDecision('independent',{correct:6,total:10,missing:0},false);
 assert.equal(failed.passed,false);assert.match(failed.reason,/60%/);
 const assisted=attemptDecision('review',{correct:10,total:10,missing:0},true);
 assert.equal(assisted.passed,false);assert.match(assisted.reason,/Dica consultada/);
 assert.equal(attemptDecision('independent',{correct:8,total:10,missing:0}).passed,true);
 assert.equal(attemptDecision('guided',{correct:5,total:10,missing:2}).passed,true);
 assert.equal(attemptDecision('guided',{correct:5,total:10,missing:3}).passed,false);
});
test('plano da prova indica os temas com mais erros, sem duplicar módulos',()=>{
 const qs=[{id:'fundamentos',correct:1},{id:'operadores',correct:0},{id:'fundamentos',correct:1},{id:'traducao',correct:0}];
 assert.deepEqual(examWeakAreas(qs,['0','1','1','1']),[{id:'fundamentos',misses:1},{id:'operadores',misses:1},{id:'traducao',misses:1}]);
 assert.deepEqual(examWeakAreas(qs,['0','1','0','0'])[0],{id:'fundamentos',misses:2});
 assert.deepEqual(examWeakAreas(qs,['1','0','1','0']),[]);
});
test('horário da revisão acompanha a data; não mostra apenas o dia',()=>{
 const label=formatReviewDate(now+days);
 assert.match(label,/11\/10\/2026/);
 assert.match(label,/21:00/);
});
