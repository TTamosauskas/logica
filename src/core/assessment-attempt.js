/** Ciclo explícito de uma avaliação: corrigir conserva a prova; tentar novamente inicia outra. */
export function recordAssessmentAttempt(assessment,result,answers,at=Date.now()){
  const draft=assessment?.draft;
  if(!draft||draft.result||draft.questions?.length!==answers.length)return false;
  const savedAnswers=Object.fromEntries(answers.map((answer,i)=>[i,String(answer)]));
  draft.answers=savedAnswers;
  draft.result={...result};
  draft.gradedAt=at;
  assessment.last={...result,at};
  if(!Array.isArray(assessment.history))assessment.history=[];
  assessment.history.push({at,questionIds:draft.questions.map(q=>q.id),overall:result.overall,
    concepts:result.concepts,passed:result.passed});
  assessment.history=assessment.history.slice(-20);
  return true;
}
export function beginAssessmentRetry(assessment,questions,at=Date.now()){
  if(!assessment?.draft?.result||!Array.isArray(questions)||questions.length!==5)return false;
  assessment.draft={questions,startedAt:at,answers:{}};
  return true;
}
