/** Revisão espaçada baseada em novas tentativas independentes do mesmo tema. */
export const DAY_MS=86400000;
export const REVIEW_DELAYS=[DAY_MS,7*DAY_MS];

/** mastered é o antigo indicador de aprovação da avaliação imediata (compatibilidade). */
export function reviewStatus(progress={},now=Date.now()){
  if(!progress.mastered)return {status:'not-approved',approved:false,consolidated:false};
  const r=progress.review;
  if(r?.consolidated)return {status:'consolidated',approved:true,consolidated:true,completed:2};
  const completed=Math.min(2,Math.max(0,Number(r?.completed)||0));
  const dueAt=Number(r?.dueAt)||now+REVIEW_DELAYS[completed]||now;
  return {status:dueAt<=now?'due':'scheduled',approved:true,consolidated:false,completed,dueAt};
}
export function beginReviewTracking(progress,now=Date.now()){
  if(!progress.mastered||progress.review)return false;
  progress.review={approvedAt:now,completed:0,dueAt:now+REVIEW_DELAYS[0],consolidated:false,failures:0};
  return true;
}
export function recordReview(progress,{correct,total,missing=0,usedHint=false},now=Date.now()){
  const state=reviewStatus(progress,now);
  if(state.status!=='due')return {accepted:false,reason:'not-due',state};
  const passed=total>0&&missing===0&&!usedHint&&correct/total>=.8;
  if(!passed){
    progress.review.failures=(progress.review.failures||0)+1;
    return {accepted:true,passed:false,state:reviewStatus(progress,now)};
  }
  progress.review.completed=(progress.review.completed||0)+1;
  progress.review.lastReviewedAt=now;
  if(progress.review.completed>=2){
    progress.review.consolidated=true;
    progress.review.consolidatedAt=now;
    progress.review.dueAt=null;
  }else progress.review.dueAt=now+REVIEW_DELAYS[1];
  return {accepted:true,passed:true,state:reviewStatus(progress,now)};
}
export function reviewQueue(units,progress={},now=Date.now()){
  return units.flatMap(unit=>unit.ids.map(id=>({id,unitTitle:unit.title,state:reviewStatus(progress[id],now)})))
    .filter(item=>item.state.status==='due')
    .sort((a,b)=>a.state.dueAt-b.state.dueAt);
}
export function consolidatedCount(units,progress={},now=Date.now()){
  return units.reduce((sum,unit)=>sum+unit.ids.filter(id=>reviewStatus(progress[id],now).consolidated).length,0);
}
export function studyRecommendation(units,progress={},now=Date.now()){
  const due=reviewQueue(units,progress,now);
  if(due.length)return {kind:'review',id:due[0].id,unitTitle:due[0].unitTitle,count:due.length};
  return {kind:'learning'};
}
