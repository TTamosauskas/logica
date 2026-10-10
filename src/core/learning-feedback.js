import {reviewStatus} from './reviews.js';

export function learningOverview(units, progress={},now=Date.now()){
  const entries=units.flatMap(unit=>unit.ids.map(id=>({id,unitTitle:unit.title,progress:progress[id]||{},state:reviewStatus(progress[id]||{},now)})));
  const upcoming=entries.filter(e=>e.state.status==='scheduled'&&Number.isFinite(e.state.dueAt))
    .sort((a,b)=>a.state.dueAt-b.state.dueAt);
  const due=entries.filter(e=>e.state.status==='due').sort((a,b)=>a.state.dueAt-b.state.dueAt);
  const approved=entries.filter(e=>e.state.approved).length;
  const consolidated=entries.filter(e=>e.state.consolidated).length;
  return {total:entries.length,approved,consolidated,due,upcoming,
    allApproved:approved===entries.length,allConsolidated:consolidated===entries.length};
}
export function formatReviewDate(timestamp){
  return new Date(timestamp).toLocaleString('pt-BR',{
    day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'
  });
}
export function nextCourseMessage(overview,initialStep,moduleName){
  const next=overview.due[0];
  if(next)return {kind:'due',id:next.id,title:moduleName(next.id),description:`Há ${overview.due.length} ${overview.due.length===1?'revisão disponível':'revisões disponíveis'}. Resolva um novo exercício independente para consolidar.`,button:'Abrir revisão →'};
  if(initialStep.id){const stages=['read','example','guided','independent','mastered'],number=stages.indexOf(initialStep.stage)+1;return {kind:'lesson',id:initialStep.id,title:moduleName(initialStep.id),description:`${initialStep.unitTitle} · Etapa ${number>0?number:'?'}/5: ${initialStep.label}.`,button:'Ir para esta etapa →'}}
  if(overview.allConsolidated)return {kind:'complete',id:null,title:'Formação consolidada',description:'Todas as avaliações iniciais e revisões espaçadas foram concluídas. Continue praticando para manter o conhecimento.',button:'Ver meu percurso →'};
  if(overview.upcoming.length){
    const soon=overview.upcoming[0];
    return {kind:'scheduled',id:soon.id,title:'Consolidação em andamento',description:`Avaliações iniciais concluídas. Próxima revisão: ${moduleName(soon.id)}, em ${formatReviewDate(soon.state.dueAt)}. Você pode praticar enquanto isso.`,button:'Ver revisões agendadas →'};
  }
  return {kind:'complete',id:null,title:'Avaliações iniciais concluídas',description:'Acompanhe as revisões e os temas no mapa de aprendizagem.',button:'Ver meu percurso →'};
}
export function attemptDecision(stage,firstGrade,usedHint=false){
  if(!firstGrade||!Number.isFinite(firstGrade.total)||firstGrade.total<=0)return {passed:false,reason:'Sem primeira correção registrada.'};
  const rate=firstGrade.correct/firstGrade.total;
  const guided=stage==='guided';
  const minimum=guided ? 0.5 : 0.8;
  const pendingLimit=guided?firstGrade.total*.25:0;
  const passed=rate>=minimum&&firstGrade.missing<=pendingLimit&&(guided||!usedHint);
  const pct=Math.round(rate*100);
  const reason=passed?`Etapa validada com ${pct}% na primeira correção.`:
    !guided&&usedHint?'Dica consultada: esta tentativa é prática assistida, não valida autonomia.':
    firstGrade.missing>pendingLimit?'Existem respostas pendentes na primeira correção. É necessária outra tentativa.':
    `Primeira correção: ${pct}%; a meta é ${guided?50:80}%. É necessária outra tentativa.`;
  return {passed,reason,rate};
}
export function examWeakAreas(questions,answers){
  const result=new Map();
  questions.forEach((q,i)=>{
    if(String(q.correct)===answers?.[i])return;
    const v=result.get(q.id)||{id:q.id,misses:0};v.misses++;result.set(q.id,v);
  });
  return [...result.values()].sort((a,b)=>b.misses-a.misses);
}
