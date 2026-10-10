/** Armazenamento de rascunhos separado das estatísticas, sem dependência do DOM. */
export const EXERCISE_DRAFTS_KEY='logiclab_exercise_drafts_v1';
export const EXAM_DRAFT_KEY='logiclab_final_exam_draft_v1';
export const DRAFT_VERSION=1;

export function hasPendingWork(ex){
  if(!ex||ex.revealed||ex.grade)return false;
  if(Object.values(ex.answers||{}).some(Boolean)||Boolean(ex.picked))return true;
  if(Object.values(ex.special?.values||{}).some(value=>value!==''&&value!==null&&value!==undefined))return true;
  if((ex.translation?.values||[]).some(Boolean)||Boolean(ex.translation?.rule?.selected))return true;
  if((ex.cat?.values||[]).some(Boolean))return true;
  if(Boolean(ex.metadata?.scratch?.trim?.()))return true;
  const venn=ex.cat?.venn;
  return !!(venn&&((venn.shaded||[]).length||(venn.workingShade||[]).length||
    Object.keys(venn.witnessChoices||{}).length||venn.verdict));
}

export function readExerciseDrafts(json,knownModes){
  try{
    const obj=JSON.parse(json);
    if(obj?.version!==DRAFT_VERSION||!obj.byMode||typeof obj.byMode!=='object')return {};
    const allowed=new Set(knownModes);
    return Object.fromEntries(Object.entries(obj.byMode).filter(([id,d])=>
      allowed.has(id)&&d?.mode===id&&d?.exercise?.mode&&typeof d.exercise==='object'&&
      Number.isFinite(d.updatedAt)&&d.updatedAt>0));
  }catch{return {}}
}

export function mostRecentUnfinished(byMode,examDraft){
  const exercises=Object.values(byMode).filter(d=>hasPendingWork(d.exercise))
    .map(d=>({type:'exercise',updatedAt:d.updatedAt,mode:d.mode,exercise:d.exercise}));
  if(examDraft&&!examDraft.result&&Array.isArray(examDraft.questions)&&examDraft.questions.length===12){
    exercises.push({type:'exam',updatedAt:examDraft.updatedAt||0});
  }
  return exercises.sort((a,b)=>b.updatedAt-a.updatedAt)[0]||null;
}

export function readExamDraft(json){
  try{
    const obj=JSON.parse(json);
    if(obj?.version!==DRAFT_VERSION||!Array.isArray(obj.questions)||obj.questions.length!==12||
      !Array.isArray(obj.answers)||obj.answers.length!==12||
      !obj.questions.every(q=>typeof q.id==='string'&&Array.isArray(q.options)&&Number.isInteger(q.correct)))return null;
    return obj;
  }catch{return null}
}
