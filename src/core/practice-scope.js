/** Regras para que os geradores das aulas introdutórias não antecipem técnicas.
 * As questões de validade continuam avaliáveis com tabelas, mas o nome de uma
 * regra não ensinada não é requisito do módulo anterior.
 */
export const SYLLOGISM_TEMPLATE_IDS=Object.freeze({
  easy:Object.freeze(['modusponens','disjuntivo','afirmaconsequente','negaantecedente','ouexclusivo']),
  medium:Object.freeze(['modusponens','disjuntivo','afirmaconsequente','negaantecedente','ouexclusivo','transitividade','reciproca','independente','afirmasucessor']),
  hard:Object.freeze(['transitividade','reciproca','independente','afirmasucessor'])
});
export function syllogismTemplatesFor(level,templates){
  const allowed=SYLLOGISM_TEMPLATE_IDS[level]||SYLLOGISM_TEMPLATE_IDS.easy;
  const selected=templates.filter(x=>allowed.includes(x.id));
  if(!selected.length)throw Error('Não há casos adequados à aula de silogismos: '+level);
  return selected;
}
export function translationTemplatesFor(level,templates){
  // Mesmo no nível difícil, Tradução avalia fórmulas de frases individuais.
  // Traduções de argumentos e testes de validade pertencem às aulas posteriores.
  const cases=templates[level==='hard'?'medium':level]||templates.easy;
  if(!cases?.length)throw Error('Não há traduções neste nível: '+level);
  return cases;
}
