/** Quadrado das oposições: modelo bivalente com semântica de quantificadores moderna.
 * A convenção "tradicional" aqui é explicitamente limitada a S não vazio.
 * A história do quadrado inclui outras análises das proposições com termo vazio.
 */
export const SQUARE_FORMS={
  A:{label:'A · Universal afirmativa',sentence:'Todos os S são P.',formula:'∀x(S(x) → P(x))'},
  E:{label:'E · Universal negativa',sentence:'Nenhum S é P.',formula:'∀x(S(x) → ¬P(x))'},
  I:{label:'I · Particular afirmativa',sentence:'Alguns S são P.',formula:'∃x(S(x) ∧ P(x))'},
  O:{label:'O · Particular negativa',sentence:'Alguns S não são P.',formula:'∃x(S(x) ∧ ¬P(x))'}
};
export const SQUARE_MODES={
  modern:{label:'Semântica moderna · S pode estar vazio',description:'O grupo S pode ser vazio; universais podem ser verdadeiras sem existirem integrantes de S.'},
  traditional:{label:'Quadrado com S não vazio',description:'Convenção didática do quadrado tradicional: supomos pelo menos um integrante de S. Não pretende resumir todas as variantes históricas.'}
};
export const SQUARE_EXAMPLES=[
  {id:'empty',label:'S está vazio',inside:0,outside:0},
  {id:'inside',label:'S tem somente integrantes de P',inside:1,outside:0},
  {id:'outside',label:'S tem somente integrantes fora de P',inside:0,outside:1},
  {id:'mixed',label:'S tem integrantes dentro e fora de P',inside:1,outside:1}
];
export function squareTruth({inside,outside}){
  if(!Number.isInteger(inside)||inside<0||!Number.isInteger(outside)||outside<0)throw Error('Contagens inválidas');
  return {A:outside===0,E:inside===0,I:inside>0,O:outside>0};
}
export function squareWorlds(mode){
  if(!SQUARE_MODES[mode])throw Error('Interpretação inexistente');
  return SQUARE_EXAMPLES.filter(w=>mode==='modern'||w.inside+w.outside>0);
}
export function squareConsequences(mode,known,value){
  if(!SQUARE_FORMS[known]||typeof value!=='boolean')throw Error('Premissa inválida');
  const models=squareWorlds(mode).map(model=>({...model,truth:squareTruth(model)}))
    .filter(model=>model.truth[known]===value);
  if(models.length===0)throw Error('Premissa inconsistente no modelo');
  return Object.fromEntries(Object.keys(SQUARE_FORMS).map(form=>{
    const always=models.every(m=>m.truth[form]);
    const never=models.every(m=>!m.truth[form]);
    return [form,always?'V':never?'F':'?'];
  }));
}
export function squarePairRelation(mode,kind){
  const models=squareWorlds(mode).map(squareTruth);
  if(kind==='AO')return {valid:models.every(v=>v.A!==v.O),label:'A e O são contraditórias'};
  if(kind==='EI')return {valid:models.every(v=>v.E!==v.I),label:'E e I são contraditórias'};
  if(kind==='AE')return {valid:models.every(v=>!(v.A&&v.E)),label:'A e E não podem ambas ser verdadeiras (contrariedade)'};
  if(kind==='IO')return {valid:models.every(v=>v.I||v.O),label:'I e O não podem ambas ser falsas (subcontrariedade)'};
  if(kind==='AI')return {valid:models.every(v=>!v.A||v.I),label:'A verdadeira exige I verdadeira (subalternação)'};
  if(kind==='EO')return {valid:models.every(v=>!v.E||v.O),label:'E verdadeira exige O verdadeira (subalternação)'};
  throw Error('Relação desconhecida');
}
const statusLabel={V:'necessariamente verdadeira',F:'necessariamente falsa','?':'indeterminada com as informações dadas'};
const select=(values,random)=>values[Math.min(values.length-1,Math.floor(random()*values.length))];
function shuffleChoices(question,random){
  const order=question.options.map((_,i)=>i);
  for(let i=order.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[order[i],order[j]]=[order[j],order[i]]}
  return {...question,options:order.map(i=>question.options[i]),correct:order.indexOf(question.correct)};
}
/** As questões são derivadas do modelo e não de índices ou gabaritos escritos manualmente. */
export function buildSquareQuestions(mode,random=Math.random){
  const given=select(Object.keys(SQUARE_FORMS),random);
  const value=random()<.5;
  const target=select(Object.keys(SQUARE_FORMS).filter(k=>k!==given),random);
  const result=squareConsequences(mode,given,value)[target];
  const examples=squareWorlds(mode).map(w=>({...w,v:squareTruth(w)})).filter(w=>w.v[given]===value);
  const witness=examples.map(w=>w.label+': '+target+' é '+(w.v[target]?'V':'F'));
  const detail=result==='?'?witness.filter((w,i)=>i===0||w.endsWith(witness[0].endsWith('V')?'F':'V')).slice(0,2).join('; '):witness[0];
  const question1=shuffleChoices({
    question:'No regime “'+SQUARE_MODES[mode].label+'”, sabemos que '+given+' é '+(value?'V':'F')+'. O que podemos afirmar sobre '+target+'?',
    options:['É necessariamente verdadeira.','É necessariamente falsa.','Não é possível determinar apenas com essa informação.'],
    correct:result==='V'?0:result==='F'?1:2,
    why:'A forma '+target+' é '+statusLabel[result]+'. '+detail+'. O critério é verificar todos os cenários compatíveis com a premissa.'
  },random);
  const pair=select(['AO','EI','AE','IO','AI','EO'],random);
  const relation=squarePairRelation(mode,pair);
  const question2=shuffleChoices({
    question:'No regime “'+SQUARE_MODES[mode].label+'”, a afirmação é válida? '+relation.label+'.',
    options:['Sim, essa relação sempre se mantém neste regime.','Não, há um cenário permitido que a contraria.','Somente quando S e P forem o mesmo grupo.'],
    correct:relation.valid?0:1,
    why:relation.valid
      ?'A relação se mantém em todos os cenários permitidos pelo regime escolhido. Verifique as combinações possíveis de S dentro e fora de P.'
      :'A relação falha quando S está vazio: A e E podem ser simultaneamente verdadeiras, I e O simultaneamente falsas, e as universais não garantem existência.'
  },random);
  return [question1,question2];
}
