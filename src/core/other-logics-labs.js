/** Laboratórios semânticos autocontidos da Unidade VIII.
 * Os resultados são calculados pelas semânticas explicitadas, não por palpites
 * ou respostas escritas à mão para cada execução.
 */
const neg=s=>s==='V'?'F':'V';
const pairs={T:[1,0],F:[0,1],B:[1,1],N:[0,0]};
const fdeFrom=(yes,no)=>Object.keys(pairs).find(key=>pairs[key][0]===yes&&pairs[key][1]===no);
export function fdeNot(value){
  const [t,f]=pairs[value]||[];if(t===undefined)throw Error('Estado FDE inválido');
  return fdeFrom(f,t);
}
export function fdeAnd(a,b){
  if(!pairs[a]||!pairs[b])throw Error('Estado FDE inválido');
  return fdeFrom(pairs[a][0]&pairs[b][0],pairs[a][1]|pairs[b][1]);
}
export function fdeOr(a,b){
  if(!pairs[a]||!pairs[b])throw Error('Estado FDE inválido');
  return fdeFrom(pairs[a][0]|pairs[b][0],pairs[a][1]&pairs[b][1]);
}
export function fuzzyZadeh(p,q){
  if(![p,q].every(x=>typeof x==='number'&&x>=0&&x<=1))throw Error('Graus fora do intervalo');
  return {notP:1-p,and:Math.min(p,q),or:Math.max(p,q)};
}
export function intuitionisticForce(valuation,relation,formula,world){
  // relation[w] contém o próprio mundo e todas as extensões alcançáveis.
  const seen=new Set();
  function go(node,w){
    const k=JSON.stringify(node)+':'+w;
    if(seen.has(k))throw Error('Fórmula circular');
    seen.add(k);
    let value;
    if(node.op==='atom')value=valuation[w][node.name]===true;
    else if(node.op==='and')value=go(node.a,w)&&go(node.b,w);
    else if(node.op==='or')value=go(node.a,w)||go(node.b,w);
    else if(node.op==='imp')value=relation[w].every(v=>!go(node.a,v)||go(node.b,v));
    else if(node.op==='not')value=relation[w].every(v=>!go(node.a,v));
    else throw Error('Operador intuicionista desconhecido');
    seen.delete(k);return value;
  }
  return go(formula,world);
}
const A=name=>({op:'atom',name});
const N=a=>({op:'not',a});
const OR=(a,b)=>({op:'or',a,b});
const codeValue=bool=>bool?'V':'F';
const item=(formula,value,reason,options=['V','F'])=>({formula,value,reason,options});
const sentence=(formula,value,reason)=>item(formula,codeValue(value),reason);

function epistemicLab(){
 const worlds=[
  {name:'w0 · situação real',p:true,q:false},
  {name:'w1 · alternativa',p:true,q:true},
  {name:'w2 · alternativa',p:false,q:true}
 ];
 const ana=[0,1],bruno=[0,2];
 const knowledge=(dest,f)=>dest.every(i=>f(worlds[i]));
 return {
  title:'Compare o conhecimento de Ana e Bruno',
  context:'p: o documento foi assinado. O mundo real é w0. Cada agente considera possíveis os mundos indicados por sua relação.',
  cards:[...worlds.map(w=>({label:w.name,detail:'p = '+(w.p?'V':'F')+'; q = '+(w.q?'V':'F')})),
   {label:'Ana considera',detail:ana.map(n=>'w'+n).join(', ')},
   {label:'Bruno considera',detail:bruno.map(n=>'w'+n).join(', ')}],
  scope:'Modelo de conhecimento factivo com acessibilidade reflexiva para cada agente; Kₐp significa p em todos os mundos que Ana considera possíveis.',
  items:[
   sentence('Kₐp',knowledge(ana,w=>w.p),'Ana considera w0 e w1: p vale em ambos.'),
   sentence('Kᵦp',knowledge(bruno,w=>w.p),'Bruno considera w2, onde p é falsa; isso refuta seu conhecimento de p.'),
   sentence('Kᵦ¬p',knowledge(bruno,w=>!w.p),'Bruno também considera w0, onde p é verdadeira; não sabe ¬p.'),
   sentence('p (no mundo real)',worlds[0].p,'p é verdadeira em w0, mas conhecimento é uma questão adicional.')
  ]
 };
}
function deonticLab(){
 const actual={p:false,q:false},ideals=[{p:true,q:false},{p:true,q:true}];
 const every=f=>ideals.every(f),some=f=>ideals.some(f);
 return {
  title:'Compare normas e condutas reais',
  context:'p: usar crachá; q: levar água. Existem dois mundos ideais normativamente aceitáveis; o mundo real é avaliado separadamente.',
  cards:[{label:'Situação real',detail:'p = F; q = F'},
   {label:'Ideal i1',detail:'p = V; q = F'},
   {label:'Ideal i2',detail:'p = V; q = V'}],
  scope:'Semântica deôntica padrão idealizada, com mundos ideais não vazios. O p exige p em todos; P p admite p em algum. Violações não revogam normas.',
  items:[
   sentence('O p',every(w=>w.p),'Nos dois mundos ideais o crachá é usado: a obrigação vale.'),
   sentence('P q',some(w=>w.q),'No mundo ideal i2, levar água é permitido.'),
   sentence('O q',every(w=>w.q),'O mundo i1 admite não levar água, portanto água não é obrigatória.'),
   sentence('p na situação real',actual.p,'O uso efetivo de crachá é falso, embora a obrigação permaneça.')
  ]
 };
}
function fuzzyLab(level,random){
 const cases=[[0.7,0.4],[0.8,0.3],[0.6,0.2],[0.9,0.5],[0.5,0.7]];
 const ix=Math.floor(random()*cases.length),[p,q]=cases[Math.max(0,Math.min(cases.length-1,ix))],r=fuzzyZadeh(p,q);
 const fmt=n=>n.toFixed(1).replace('.',',');
 const options=[...new Set([fmt(p),fmt(q),fmt(r.notP),fmt(r.and),fmt(r.or),'0,0','1,0','0,5','0,2','0,6'])];
 return {
  title:'Calcule graus de verdade',
  context:'p: “quente”; q: “úmido”. A função de pertinência atribuiu os graus exibidos, que NÃO são probabilidades.',
  cards:[{label:'μ(p) · quente',detail:fmt(p)},{label:'μ(q) · úmido',detail:fmt(q)},
    {label:'Convenção',detail:'Zadeh: ¬p=1−p; p∧q=min(p,q); p∨q=max(p,q)'}],
  scope:'Os valores são graus de satisfação de propriedades. Este laboratório utiliza as operações min, max e complemento de Zadeh, não todas as lógicas fuzzy.',
  items:[
   item('¬p',fmt(r.notP),'1 − '+fmt(p)+' = '+fmt(r.notP)+'.',options),
   item('p ∧ q',fmt(r.and),'min('+fmt(p)+', '+fmt(q)+') = '+fmt(r.and)+'.',options),
   item('p ∨ q',fmt(r.or),'max('+fmt(p)+', '+fmt(q)+') = '+fmt(r.or)+'.',options)
  ]
 };
}
function fdeLab(level,random){
 const datasets=[['B','N'],['T','F'],['B','F'],['N','T']];
 const [p,q]=datasets[Math.min(datasets.length-1,Math.floor(random()*datasets.length))];
 return {
  title:'Avalie uma base com informações contraditórias',
  context:'p: documento enviado; q: servidor ligado. FDE usa T (apenas verdadeiro), F (apenas falso), B (ambos os suportes) e N (nenhum).',
  cards:[{label:'Suporte para p',detail:p},{label:'Suporte para q',detail:q},
    {label:'Regras usadas',detail:'¬ troca suportes; ∧: positivo em ambos/negativo em ao menos um; ∨: positivo em ao menos um/negativo em ambos'}],
  scope:'Semântica FDE de quatro estados de informação, não graus ou probabilidades. Uma contradição não autoriza inferir qualquer proposição.',
  items:[
    item('¬p',fdeNot(p),'Trocar suporte positivo e negativo de '+p+' produz '+fdeNot(p)+'.',['T','F','B','N']),
    item('p ∧ q',fdeAnd(p,q),'Conjunção: positivo se ambos têm suporte; negativo se ao menos um tem. Resultado '+fdeAnd(p,q)+'.',['T','F','B','N']),
    item('p ∨ q',fdeOr(p,q),'Disjunção: positivo se ao menos um tem suporte; negativo se ambos têm. Resultado '+fdeOr(p,q)+'.',['T','F','B','N']),
    item('¬q',fdeNot(q),'Inverta os suportes do estado '+q+' para obter '+fdeNot(q)+'.',['T','F','B','N'])
  ]
 };
}
function intuitionistLab(){
 const vals=[{p:false},{p:true},{p:false}],ext=[[0,1,2],[1],[2]];
 const p=A('p'),np=N(p),lem=OR(p,np),doubleNotLem=N(N(lem));
 const at=node=>intuitionisticForce(vals,ext,node,0);
 return {
  title:'Procure um modelo construtivo do terceiro excluído',
  context:'A informação cresce de w0 para w1 ou w2. Em w1 p é demonstrada; em w0 e w2 não. Tudo que for demonstrado persiste nas extensões.',
  cards:[{label:'w0 · ponto atual',detail:'p ainda não demonstrada; extensões w0,w1,w2'},
    {label:'w1 · extensão',detail:'p demonstrada'},
    {label:'w2 · extensão',detail:'p não demonstrada; não há extensões adicionais'}],
  scope:'Forçamento de Kripke intuicionista: negação significa impossibilidade de p em toda extensão. Ausência de prova atual não é prova de negação.',
  items:[
    sentence('p em w0',at(p),'p ainda não está forçada em w0; a prova aparece na extensão w1.'),
    sentence('¬p em w0',at(np),'¬p falha pois w1, uma extensão possível, força p.'),
    sentence('p ∨ ¬p em w0',at(lem),'Nenhum lado é forçado em w0: este é um contraexemplo ao terceiro excluído universal.'),
    sentence('¬¬(p ∨ ¬p) em w0',at(doubleNotLem),'A dupla negação do terceiro excluído é forçada: nenhuma extensão pode forçar sua negação, embora p∨¬p não seja forçada em w0.')
  ]
 };
}
export const OTHER_LOGIC_LAB_IDS=Object.freeze(['epistemica','deontica','difusa','paraconsistente','intuicionista']);
export function createOtherLogicLab(id,level='easy',random=Math.random){
 switch(id){
  case 'epistemica':return epistemicLab();
  case 'deontica':return deonticLab();
  case 'difusa':return fuzzyLab(level,random);
  case 'paraconsistente':return fdeLab(level,random);
  case 'intuicionista':return intuitionistLab();
  default:throw Error('Não há laboratório para a lógica: '+id);
 }
}
