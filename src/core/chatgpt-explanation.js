/** Pergunta enviada ao ChatGPT somente após ação explícita do estudante. */
export const EXPLAIN_PROMPT_PREFIX='Explique retornando aos primeiros princípios:';

export function makeExplanationPrompt({question,context='',options=[],selected='',correct='',feedback=''}){
  if(!String(question||'').trim())throw new Error('A explicação precisa de uma questão.');
  const lines=[EXPLAIN_PROMPT_PREFIX,'',String(question).trim()];
  if(context)lines.push('',String(context).trim());
  if(options.length)lines.push('','Alternativas:',...options.map((option,i)=>String.fromCharCode(65+i)+'. '+String(option)));
  if(selected)lines.push('','Resposta dada pelo estudante: '+String(selected));
  if(correct)lines.push('Resposta esperada: '+String(correct));
  if(feedback)lines.push('Correção e justificativa: '+String(feedback));
  lines.push('','Explique os conceitos a partir de definições simples, justifique a alternativa correta e mostre por que as demais não servem.');
  return lines.join('\n');
}
export function explanationChatGPTUrl(info){
  return 'https://chatgpt.com/?q='+encodeURIComponent(makeExplanationPrompt(info));
}
