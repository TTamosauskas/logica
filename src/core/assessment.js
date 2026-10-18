/** Avaliações locais: seleção por competência, correção e metadados estáveis. */
export const ASSESSMENT_VERSION=2;
/** Limpa rótulos editoriais obsoletos, inclusive em perguntas já salvas no navegador.
 * Não altera ids, alternativas, respostas nem critérios de aprovação.
 */
export function cleanAssessmentQuestion(question){
  return String(question)
    .replace(/^Em outra situação conceitual \d+,\s*/u,'')
    .replace(/^Em outro contexto, princípio \d+:\s*/u,'');
}
const mix=(items,random=Math.random)=>{const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
export function prepareBank(id,lesson,reading,supplement=[]){
  // A autoverificação de leitura é formativa e não deve reaparecer no exame somativo.
  // A leitura permanece argumento para compatibilidade da interface pública.
  const basic=lesson.quiz.map((q,i)=>({...q,id:id+'-base-'+(i+1),dimension:i===0?'concept':'application',objective:'Objetivo central da aula'}));
  return [...basic,...supplement.map((q,i)=>({...q,id:id+'-extra-'+(i+1)}))];
}
export function validateBank(bank){
  const ids=new Set();
  for(const q of bank){
    if(!q.id||ids.has(q.id)||!['concept','application'].includes(q.dimension)||!q.question||!Array.isArray(q.options)||q.options.length<3||new Set(q.options).size!==q.options.length||!Number.isInteger(q.correct)||q.correct<0||q.correct>=q.options.length||!q.why)throw Error('Item inválido: '+q.id);
    ids.add(q.id);
  }
  return bank;
}
export function composeAssessment(bank,history=[],random=Math.random){
  validateBank(bank);
  const recent=new Set(history.slice(-3).flatMap(x=>x.questionIds||[]));
  const select=(dimension,count,selected=[])=>{
    const available=mix(bank.filter(x=>x.dimension===dimension&&!selected.includes(x.id)),random);
    available.sort((a,b)=>Number(recent.has(a.id))-Number(recent.has(b.id)));
    return available.slice(0,count);
  };
  const concepts=select('concept',2),applications=select('application',3,concepts.map(x=>x.id));
  if(concepts.length!==2||applications.length!==3)throw Error('Banco insuficiente para avaliação de 2 conceitos e 3 aplicações.');
  return mix([...concepts,...applications],random).map(q=>{
    const options=mix(q.options.map((text,i)=>({text,isCorrect:i===q.correct})),random);
    return {...q,options:options.map(x=>x.text),correct:options.findIndex(x=>x.isCorrect)};
  });
}
export function gradeAssessment(questions,answers){
  const missing=questions.some((_,i)=>answers[i]===undefined||answers[i]===null);
  const overall=questions.reduce((n,q,i)=>n+(Number(answers[i])===q.correct?1:0),0);
  const conceptTotal=questions.filter(q=>q.dimension==='concept').length;
  const concepts=questions.reduce((n,q,i)=>n+(q.dimension==='concept'&&Number(answers[i])===q.correct?1:0),0);
  const passed=!missing&&overall>=4&&concepts===2&&questions.length===5&&conceptTotal===2;
  const reason=passed?'Avaliação aprovada.':concepts<2?'Revisão do conceito central necessária.':'Conceito compreendido; revise a aplicação em novos contextos.';
  return {version:2,overall,total:questions.length,concepts,conceptTotal,passed,reason,missing};
}
