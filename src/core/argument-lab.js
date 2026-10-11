/** Modelos verificáveis para inferências categóricas e diagnósticos de pressupostos. */
const form=(kind,a,b)=>({kind,a,b});
export const CATEGORICAL_CASES=[
  {id:'barbara',level:1,forms:[form('all','M','P'),form('all','S','M'),form('all','S','P')],explanation:'Se S está contido em M e M em P, então S está contido em P. A cadeia de inclusões garante a conclusão.'},
  {id:'celarent',level:1,forms:[form('none','M','P'),form('all','S','M'),form('none','S','P')],explanation:'Nenhum integrante de M pertence a P; como todo S está em M, nenhum S pode estar em P. A conclusão vale em qualquer configuração de conjuntos compatível com as duas premissas.'},
  {id:'converse',level:1,forms:[form('all','M','P'),form('all','S','P'),form('all','S','M')],explanation:'Ter P em comum não obriga S a estar dentro de M: são grupos que podem se sobrepor sem coincidir.'},
  {id:'existence',level:1,forms:[form('all','M','P'),form('all','S','M'),form('some','S','P')],explanation:'Duas premissas universais são compatíveis com S vazio. Elas não garantem que exista alguém em S ∩ P.'},
  {id:'darii',level:2,forms:[form('all','M','P'),form('some','S','M'),form('some','S','P')],explanation:'A testemunha que está em S ∩ M também está em P, pois todo M é P. Assim, a mesma pessoa satisfaz as duas condições exigidas pela conclusão existencial.'},
  {id:'ferio',level:2,forms:[form('none','M','P'),form('some','S','M'),form('somenot','S','P')],explanation:'Alguém pertence a S ∩ M e nenhum M pertence a P; essa pessoa está em S, mas fora de P. A testemunha da premissa particular garante a conclusão particular negativa.'},
  {id:'particular-to-all',level:2,forms:[form('all','M','P'),form('some','S','M'),form('all','S','P')],explanation:'A testemunha em S ∩ M pertence a P, mas outros integrantes de S podem ficar fora de P. Um único caso favorável não autoriza afirmar algo universal sobre todos os membros de S.'},
  {id:'existential-confusion',level:2,forms:[form('some','M','P'),form('some','S','M'),form('some','S','P')],explanation:'As duas premissas podem se referir a pessoas diferentes de M. Nada obriga a mesma pessoa a integrar S e P.'},
  {id:'disamis',level:3,forms:[form('some','M','P'),form('all','M','S'),form('some','S','P')],explanation:'A pessoa que testemunha M ∩ P também está em S, porque todos os M são S. A existência dessa pessoa é suficiente para demonstrar que alguns S também são P.'},
  {id:'bocardo',level:3,forms:[form('somenot','M','P'),form('all','M','S'),form('somenot','S','P')],explanation:'Há alguém em M fora de P; como todo M é S, há alguém em S fora de P. A testemunha particular da primeira premissa preserva sua existência na conclusão.'}
];
export const CATEGORICAL_CONTEXTS=[
  {S:'pesquisadores',M:'cientistas',P:'leitores'},
  {S:'violonistas',M:'músicos',P:'artistas'},
  {S:'tutores',M:'professores',P:'educadores'},
  {S:'corredores',M:'atletas',P:'estudantes'}
];

export function categoricalValue(statement,mask){
  const people=Array.from({length:8},(_,i)=>i).filter(i=>(mask&(1<<i))!==0);
  const inSet=(i,name)=>(i&({S:4,M:2,P:1}[name]))!==0;
  const a=i=>inSet(i,statement.a),b=i=>inSet(i,statement.b);
  switch(statement.kind){
    case 'all':return people.every(i=>!a(i)||b(i));
    case 'none':return people.every(i=>!a(i)||!b(i));
    case 'some':return people.some(i=>a(i)&&b(i));
    case 'somenot':return people.some(i=>a(i)&&!b(i));
    default:throw Error('Forma categórica desconhecida');
  }
}
export function categoricalCounterexample(forms,mask){
  return forms.slice(0,2).every(f=>categoricalValue(f,mask))&&!categoricalValue(forms[2],mask);
}
const countBits=mask=>Array.from({length:8},(_,i)=>(mask>>i)&1).reduce((a,b)=>a+b,0);
const bySize=(a,b)=>countBits(a)-countBits(b)||a-b;
export function categoricalCaseValidity(forms){
  // Domínio não vazio, oito regiões de pertencimento possíveis; cada região
  // exige no máximo uma testemunha para decidir formas A/E/I/O.
  const models=Array.from({length:255},(_,i)=>i+1);
  return !models.some(mask=>categoricalCounterexample(forms,mask));
}
function describeModel(mask,terms){
  const names=['Ana','Beto','Caio','Duda','Eva','Fábio','Gabi','Hugo'];
  const people=[];
  for(let i=0;i<8;i++)if(mask&(1<<i)){
    const memberships=['S','M','P'].filter(k=>(i&({S:4,M:2,P:1}[k]))!==0);
    people.push(names[people.length]+' pertence '+(memberships.length?'a '+memberships.map(k=>terms[k]).join(', '):'a nenhum dos três grupos'));
  }
  return people.join('; ')+'. Não há outras pessoas no cenário.';
}
const kindText=(f,terms)=>{
  const a=terms[f.a],b=terms[f.b];
  switch(f.kind){
    case 'all':return 'Todos os '+a+' são '+b+'.';
    case 'none':return 'Nenhum dos '+a+' é '+b+'.';
    case 'some':return 'Alguns '+a+' são '+b+'.';
    case 'somenot':return 'Alguns '+a+' não são '+b+'.';
  }
};
export function buildCategoricalQuestions(caseData,terms){
  const forms=caseData.forms,valid=categoricalCaseValidity(forms);
  const models=Array.from({length:255},(_,i)=>i+1).sort(bySize);
  const counter=models.filter(mask=>categoricalCounterexample(forms,mask));
  const validModel=models.find(mask=>forms.every(f=>categoricalValue(f,mask)));
  const premiseFails=models.find(mask=>!forms.slice(0,2).every(f=>categoricalValue(f,mask)));
  const start='Premissa 1: '+kindText(forms[0],terms)+' Premissa 2: '+kindText(forms[1],terms)+' Conclusão: '+kindText(forms[2],terms);
  const q1={question:start+' A conclusão decorre necessariamente?',options:['Sim, em todos os modelos das premissas.','Não, existe contraexemplo.','Depende da ordem em que as frases foram escritas.'],correct:valid?0:1,why:caseData.explanation};
  let q2;
  if(valid){
    q2={question:'O que explica a validade desta inferência?',options:[
      caseData.explanation,
      'A conclusão parece plausível na maioria das situações, mesmo sem premissas.',
      'As premissas tornam a conclusão provável, mas nunca necessária.'
    ],correct:0,why:'Uma inferência é válida quando todo modelo com premissas verdadeiras mantém a conclusão verdadeira. '+caseData.explanation};
  }else{
    const choices=[counter[0],validModel,premiseFails];
    if(choices.some(x=>x===undefined)||new Set(choices).size!==3)throw Error('Contraexemplos insuficientes: '+caseData.id);
    q2={question:'Qual cenário é um contraexemplo: premissas verdadeiras e conclusão falsa?',options:choices.map(mask=>describeModel(mask,terms)),correct:0,why:'No primeiro cenário, as duas premissas são verdadeiras e a conclusão é falsa. '+caseData.explanation,modelMasks:choices,forms};
  }
  const q3={question:'Qual atitude permite verificar a validade, sem depender de nomes de modos silogísticos?',options:[
    'Buscar um modelo que torne as premissas verdadeiras e a conclusão falsa.',
    'Verificar se as três frases soam razoáveis em situações familiares.',
    'Tomar uma premissa como verdadeira e dispensar as demais.'
  ],correct:0,why:'Um único contraexemplo demonstra invalidade; se nenhum modelo possível satisfaz premissas verdadeiras e conclusão falsa, a inferência é válida.'};
  return [q1,q2,q3];
}

export const ASSUMPTION_CASES=[
  {id:'horario',context:'Uma escola mudou o horário das aulas. No semestre seguinte, a média das notas subiu. A direção diz que o novo horário causou a melhora.',
   assumption:'Outros fatores relevantes não explicam suficientemente o aumento das notas.',alternative:'As provas desse semestre foram mais fáceis.',limit:'As notas aumentaram depois da mudança; a causa ainda precisa ser investigada.'},
  {id:'aplicativo',context:'Uma empresa instalou um aplicativo para organizar tarefas. A produtividade aumentou no mês seguinte. A gerência conclui que o aplicativo foi o responsável.',
   assumption:'Não houve outras mudanças suficientes para explicar a melhora.',alternative:'A equipe recebeu treinamento e teve menos tarefas naquele mês.',limit:'O aumento coincidiu com a instalação; precisamos comparar as demais condições.'},
  {id:'rio',context:'Um rio apresentou peixes mortos depois da abertura de uma fábrica na região. Alguém afirma que a fábrica necessariamente causou as mortes.',
   assumption:'A origem da contaminação, se houve, deve ser ligada à nova fábrica.',alternative:'Uma descarga irregular anterior, de outra origem, pode ter ocorrido.',limit:'A coincidência temporal justifica investigar a fábrica, mas não prova a causa.'},
  {id:'curso',context:'Participantes voluntários de um curso tiveram desempenho melhor do que pessoas que não se inscreveram. A coordenação afirma que o curso explica toda a diferença.',
   assumption:'Os dois grupos teriam desempenho semelhante sem o curso.',alternative:'Os voluntários já eram mais motivados ou tinham mais experiência.',limit:'Há associação entre participação e desempenho; é preciso controlar diferenças iniciais.'},
  {id:'transito',context:'Um cruzamento recebeu novos semáforos. Nos meses seguintes, os acidentes caíram. A prefeitura atribui toda a redução aos semáforos.',
   assumption:'Outras mudanças no trânsito não explicam a redução observada.',alternative:'O fluxo de veículos diminuiu durante uma obra em outra avenida.',limit:'A queda ocorreu após a instalação, mas ainda é necessário distinguir as causas.'}
];
export function buildAssumptionQuestions(item){
  return [
    {question:item.context+' Qual pressuposto ajudaria a sustentar a conclusão?',options:[
      item.assumption,'Qualquer mudança anterior é sempre causa única de um resultado.','Uma boa conclusão não precisa de evidências adicionais.'
    ],correct:0,why:'A inferência causal depende de descartar explicações alternativas relevantes, não apenas observar que dois acontecimentos ocorreram em sequência.'},
    {question:'Qual cenário mostra que a conclusão não é necessária a partir dos dados apresentados?',options:[
      item.alternative,'O resultado relatado realmente aconteceu.','A conclusão poderia ser verdadeira, caso aparecessem mais evidências.'
    ],correct:0,why:'A explicação alternativa é compatível com a observação e poderia produzir o resultado sem a causa alegada. Isso não prova que a hipótese inicial seja falsa.'},
    {question:'Sem novos dados, qual conclusão está melhor justificada?',options:[
      'A hipótese causal já foi demonstrada sem incerteza.',item.limit,'A hipótese causal é definitivamente falsa.'
    ],correct:1,why:'A observação não identifica sozinha uma causa. A conclusão responsável descreve o que foi observado e reconhece a necessidade de investigação.'}
  ];
}
