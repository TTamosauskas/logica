/** Composição verificável da avaliação integrada de oito unidades.
 * Mantém seis competências essenciais e amostra as unidades restantes,
 * com duas questões de aulas distintas da unidade Erros Lógicos Comuns.
 */
export const ESSENTIAL_EXAM_LESSONS=Object.freeze([
 'pressupostos','categoricos2','inducao','abducao','probabilidade','causalidade'
]);
export function buildIntegratedExamQuestions(units,lessons,choose){
 const questions=[],used=new Set();
 const append=id=>{
   if(used.has(id))return;
   const quiz=lessons[id]?.quiz;
   if(!Array.isArray(quiz)||!quiz.length)throw Error('Aula sem questões: '+id);
   used.add(id);
   questions.push({...choose(quiz),id});
 };
 ESSENTIAL_EXAM_LESSONS.forEach(append);
 for(const unit of units){
   if(unit.ids.some(id=>used.has(id)))continue;
   const options=unit.ids.filter(id=>!used.has(id));
   if(options.length)append(choose(options));
 }
 const critical=units.find(unit=>unit.ids.includes('oficina_erros'));
 if(critical&&questions.length===11){
   const options=critical.ids.filter(id=>!used.has(id));
   if(options.length)append(choose(options));
 }
 if(questions.length!==12||used.size!==12)
   throw Error('Composição da prova integrada incompleta.');
 return questions;
}
