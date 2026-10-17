/** Compact editorial authoring format for Pedagogia V3 expansion.
 * Each question has a correct response and two plausible distractors with individual feedback.
 * Correct answer positions rotate (1, 2, 0) to avoid a predictable key.
 */
export function buildBridgeLessons(entries){
  const stages=['identificar','completar','transferir'];
  return Object.fromEntries(entries.map(([id,steps,questions])=>{
    if(steps.length!==3||questions.length!==3)throw Error('Roteiro incompleto: '+id);
    const bridges=questions.map(([question,right,wrongA,wrongB,hint,explanation,whyA,whyB],index)=>{
      const correct=[1,2,0][index];
      const options=[wrongA,wrongB];options.splice(correct,0,right);
      const feedback=[whyA,whyB];feedback.splice(correct,0,'Isso mesmo. '+explanation);
      return {kind:stages[index],question,options,correct,hint,feedback,explanation};
    });
    return [id,{handoff:{title:'Da explicação à resolução',steps,next:'No exemplo resolvido, localize essas três decisões e tente refazê-las com os seus próprios termos.'},bridges}];
  }));
}
