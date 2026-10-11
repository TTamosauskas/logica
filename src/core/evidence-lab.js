/** Cenários auditáveis para o laboratório de raciocínio com evidências. */
export const INDUCTION_CASES=[
  {id:'biblioteca',observed:'Nove de dez colegas de uma turma afirmaram gostar da biblioteca.',population:'todos os estudantes da escola',bias:'A amostra vem de uma única turma, que pode ter interesses diferentes dos demais estudantes.',better:'Selecionar estudantes de várias turmas por um procedimento previamente definido.',cautious:'Nove dos dez colegas consultados disseram gostar da biblioteca; não sabemos a preferência da escola toda.',confound:'A turma reúne voluntários do clube de leitura.'},
  {id:'aplicativo',observed:'Oitenta usuários ativos de um aplicativo responderam a uma pesquisa; 72 disseram estar satisfeitos.',population:'todas as pessoas que instalaram o aplicativo',bias:'Quem deixou de usar o aplicativo não foi ouvido e pode ter experiências diferentes.',better:'Sortear pessoas entre usuários ativos e inativos, incluindo quem desistiu do aplicativo.',cautious:'A maioria dos usuários ativos entrevistados estava satisfeita; isso não descreve todos os que instalaram o aplicativo.',confound:'Somente usuários que abrem o aplicativo diariamente receberam o convite.'},
  {id:'transporte',observed:'Em uma pesquisa realizada numa estação central, 85 de 100 entrevistados elogiaram o transporte público.',population:'todos os moradores da cidade',bias:'A pesquisa ouviu quem estava na estação, e não quem evita o transporte público.',better:'Definir amostragem de moradores de diferentes bairros, incluindo quem não utiliza ônibus ou metrô.',cautious:'A avaliação positiva foi frequente entre as pessoas daquela estação; não sabemos a opinião dos moradores em geral.',confound:'A pesquisa só incluiu usuários presentes no horário de pico.'},
  {id:'alimentacao',observed:'Sessenta atletas de um clube relataram consumir frutas diariamente.',population:'todos os jovens da cidade',bias:'Atletas de um mesmo clube podem ter hábitos diferentes de outros jovens.',better:'Escolher jovens de diferentes contextos e não apenas os praticantes de esportes.',cautious:'Esses atletas relataram um hábito; não é possível generalizá-lo a todos os jovens da cidade.',confound:'A seleção é composta exclusivamente por integrantes do clube esportivo.'}
];
export const ABDUCTION_CASES=[
  {id:'patio',fact:'O pátio da escola amanheceu molhado.',a:'Choveu durante a madrugada.',b:'A equipe de limpeza lavou o pátio.',test:'Verificar se outros espaços descobertos e afastados também estão molhados.',weak:'Observar novamente que o pátio está molhado.',newEvidence:'O gramado distante também está molhado, mas a área coberta não.',favored:'Chuva fica mais plausível; a limpeza ainda não é logicamente impossível.'},
  {id:'servidor',fact:'Um site deixou de responder durante a manhã.',a:'O servidor da aplicação falhou.',b:'A conexão de internet do escritório falhou.',test:'Tentar abrir o site por uma rede independente da do escritório.',weak:'Atualizar a mesma página na mesma rede sem registrar outras informações.',newEvidence:'O site também não responde em redes independentes, mas outros serviços funcionam.',favored:'Um problema do site ou servidor ganha apoio; ainda é necessário investigar.'},
  {id:'planta',fact:'Uma planta começou a murchar.',a:'A planta recebeu pouca água.',b:'As raízes foram danificadas.',test:'Verificar a umidade do solo e o estado das raízes.',weak:'Repetir que as folhas estão murchas.',newEvidence:'O solo está úmido, mas há sinais de danos nas raízes.',favored:'A hipótese de raízes danificadas ganha apoio, sem tornar a outra impossível em qualquer circunstância.'},
  {id:'energia',fact:'As luzes de uma sala se apagaram.',a:'Houve queda de energia em todo o prédio.',b:'O disjuntor daquela sala desligou.',test:'Verificar se outras salas estão com energia e inspecionar o disjuntor com segurança.',weak:'Observar que a sala continua escura.',newEvidence:'As outras salas têm luz, mas a sala afetada não.',favored:'Uma falha localizada ganha apoio; é preciso verificar o circuito.'}
];
export const CAUSAL_CASES=[
  {id:'sorvete',fact:'Dias quentes apresentam mais vendas de sorvete e mais afogamentos.',proposal:'Comprar sorvete provoca afogamentos.',confound:'A temperatura aumenta tanto a procura por sorvetes quanto a exposição a piscinas e praias.',test:'Comparar pessoas com exposição semelhante à água, controlando calor e outras diferenças relevantes.',cautious:'Existe associação nos dias quentes, mas ela não estabelece que o sorvete cause afogamentos.'},
  {id:'reforco',fact:'Estudantes que procuram reforço têm, em média, notas menores que os demais.',proposal:'Frequentar reforço reduz as notas.',confound:'Dificuldades anteriores podem aumentar tanto a procura por reforço quanto a chance de notas menores.',test:'Comparar estudantes com desempenho inicial semelhante e acompanhar a evolução após a intervenção.',cautious:'A diferença observada não isola o efeito causal do reforço.'},
  {id:'treino',fact:'Quem usa um aplicativo de exercícios relata mais disposição física.',proposal:'O aplicativo é a única causa de maior disposição.',confound:'Pessoas já motivadas a se exercitar podem usar mais aplicativos e cuidar mais da saúde.',test:'Comparar grupos semelhantes, idealmente com atribuição aleatória quando viável e ética.',cautious:'O uso do aplicativo está associado à disposição, mas outras diferenças podem explicar o resultado.'},
  {id:'vendas',fact:'Após uma campanha publicitária, as vendas aumentaram.',proposal:'Toda a alta nas vendas foi causada exclusivamente pela campanha.',confound:'Uma promoção de preços na mesma semana pode ter aumentado as vendas.',test:'Comparar resultados com lojas ou períodos equivalentes sem a campanha, controlando promoções e sazonalidade.',cautious:'O aumento ocorreu após a campanha, mas o tamanho de seu efeito causal ainda é incerto.'}
];
export const PROBABILITY_CASES=[
  {id:'raridade',population:1000,condition:10,truePositive:8,falsePositive:99,context:'Um teste de triagem para uma condição pouco frequente em uma população de 1.000 pessoas'},
  {id:'moderada',population:1000,condition:100,truePositive:80,falsePositive:90,context:'Um detector de falhas aplicado a 1.000 dispositivos, dos quais alguns têm defeito'},
  {id:'selecao',population:1000,condition:50,truePositive:45,falsePositive:95,context:'Um sistema de alertas aplicado a 1.000 registros, alguns realmente problemáticos'},
  {id:'comum',population:1000,condition:200,truePositive:180,falsePositive:80,context:'Uma verificação aplicada a 1.000 produtos, parte deles com irregularidade'}
];
export function probabilityCounts(item){
  const {population,condition,truePositive,falsePositive}=item;
  if(![population,condition,truePositive,falsePositive].every(Number.isInteger)||
    population<=0||condition<0||condition>population||truePositive<0||
    truePositive>condition||falsePositive<0||falsePositive>population-condition)
    throw Error('Frequências inválidas');
  const positives=truePositive+falsePositive;
  if(!positives)throw Error('Exemplo sem positivos');
  return {population,condition,without:population-condition,
    truePositive,falsePositive,positives,
    sensitivity:condition?100*truePositive/condition:null,
    falsePositiveRate:population>condition?100*falsePositive/(population-condition):null,
    baseRate:100*condition/population,posterior:100*truePositive/positives};
}
export const percent=value=>(Math.round(value*10)/10).toLocaleString('pt-BR',{minimumFractionDigits:0,maximumFractionDigits:1})+'%';
export function shuffleQuestion(q,random=Math.random){
  const order=q.options.map((_,i)=>i);
  for(let i=order.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[order[i],order[j]]=[order[j],order[i]]}
  return {...q,options:order.map(i=>q.options[i]),correct:order.indexOf(q.correct)};
}
function makeQuestions(questions,random){return questions.map(q=>shuffleQuestion(q,random))}
export function buildInductionQuestions(c,random=Math.random){
  return makeQuestions([
    {question:c.observed+' Podemos concluir isso sobre '+c.population+'?',options:[
      'Não necessariamente; a amostra pode não representar a população.',
      'Sim: toda amostra permite generalizar com certeza para qualquer população.',
      'Sim: os resultados de uma turma ou grupo nunca diferem dos demais.'
    ],correct:0,why:'A observação não é uma demonstração dedutiva de uma taxa populacional. '+c.bias},
    {question:'Qual é o principal problema da seleção?',options:[c.bias,'O uso de números impede qualquer inferência.','Nenhuma pesquisa pode descrever uma população.'],correct:0,why:'É preciso distinguir a população da amostra efetivamente observada. '+c.bias},
    {question:'Qual investigação aumentaria a confiança na generalização?',options:[c.better,'Repetir a entrevista apenas entre os mesmos participantes.','Eliminar todas as respostas discordantes antes de calcular a proporção.'],correct:0,why:'Uma seleção adequada à população de interesse reduz vieses relevantes. '+c.better},
    {question:'Qual conclusão é proporcional aos dados?',options:[c.cautious,'A população inteira apresenta exatamente a mesma proporção observada.','Nenhuma pessoa fora da amostra tem preferência ou hábito identificável.'],correct:0,why:'A linguagem responsável separa o que foi observado do que ainda precisa ser verificado. '+c.cautious}
  ],random);
}
export function buildAbductionQuestions(c,random=Math.random){
  return makeQuestions([
    {question:c.fact+' Qual avaliação inicial é adequada?',options:['Há pelo menos duas hipóteses compatíveis com o mesmo fato.',c.a+' é uma consequência logicamente necessária.',c.b+' é impossível pelo simples fato descrito.'],correct:0,why:'O dado observado não identifica por si só uma causa única. '+c.a+' e '+c.b+' podem explicá-lo.'},
    {question:'Qual informação mais ajuda a diferenciar as hipóteses?',options:[c.test,c.weak,'Declarar a primeira hipótese verdadeira, sem novas observações.'],correct:0,why:'Um teste informativo busca previsões que separam hipóteses concorrentes. '+c.test},
    {question:'Por que esta verificação é pouco informativa: '+c.weak,options:['Ela repete ou confirma algo que as duas hipóteses já explicavam.','Ela prova que a segunda hipótese é verdadeira.','Ela cria um experimento aleatório com grupo de controle.'],correct:0,why:'A observação inicial já é comum às duas explicações; repetí-la não discrimina adequadamente.'},
    {question:'Nova evidência: '+c.newEvidence+' O que se pode afirmar?',options:[c.favored,'A hipótese favorecida passa a ser uma certeza dedutiva, sem exceções.','A evidência nova não pode alterar uma hipótese anterior.'],correct:0,why:'Evidências discriminativas podem aumentar ou reduzir o apoio relativo a hipóteses, mas a conclusão continua revisável. '+c.favored}
  ],random);
}
export function buildCausalQuestions(c,random=Math.random){
  return makeQuestions([
    {question:c.fact+' Alguém afirma: “'+c.proposal+'” O que falta?',options:['Identificar alternativas e uma comparação que permita inferir causa.','Nada: duas variáveis associadas sempre têm relação causal direta.','Uma definição de proposição lógica resolve a causa automaticamente.'],correct:0,why:'Correlação não identifica necessariamente causalidade; confundidores e causalidade reversa podem afetar o resultado.'},
    {question:'Qual fator pode confundir a associação?',options:[c.confound,'O simples fato de termos registrado uma observação.','Nenhum fator externo pode influenciar duas variáveis.'],correct:0,why:'Uma variável de confusão pode afetar exposição e resultado. '+c.confound},
    {question:'Que comparação investigaria melhor a causa?',options:[c.test,'Comparar apenas os casos em que o resultado já apareceu, sem considerar os demais.','Repetir a afirmação original com maior convicção.'],correct:0,why:'Uma boa comparação procura controlar diferenças relevantes entre situações com e sem o fator investigado. '+c.test},
    {question:'Qual afirmação é a mais justificável com os dados fornecidos?',options:[c.cautious,c.proposal+' Isso já está demonstrado.','A associação observada prova que nenhuma relação causal é possível.'],correct:0,why:'O dado observado pode justificar investigação, mas não isola uma causa única. '+c.cautious}
  ],random);
}
export function buildProbabilityQuestions(item,random=Math.random){
  const c=probabilityCounts(item),prefix=item.context+'. '+c.condition+' têm a condição; o teste dá positivo a '+c.truePositive+' dessas pessoas e a '+c.falsePositive+' das '+c.without+' sem a condição. ';
  const value=percent(c.posterior);
  const incorrect=[percent(c.sensitivity),percent(c.baseRate),percent(c.falsePositiveRate)]
    .filter(x=>x!==value);
  if(new Set(incorrect).size<2)throw Error('Distratores numéricos insuficientes');
  return makeQuestions([
    {question:prefix+'Quantos resultados positivos são verdadeiros positivos?',options:[String(c.truePositive),String(c.falsePositive),String(c.positives)],correct:0,why:'Verdadeiros positivos são pessoas com a condição que receberam resultado positivo: '+c.truePositive+'.'},
    {question:'Nesse cenário, quantos resultados positivos ocorreram no total?',options:[String(c.positives),String(c.truePositive),String(c.condition)],correct:0,why:'Somamos positivos verdadeiros e falsos: '+c.truePositive+' + '+c.falsePositive+' = '+c.positives+'.'},
    {question:'Entre todos os resultados positivos, que proporção corresponde a casos reais?',options:[value,incorrect[0],incorrect[1]],correct:0,why:'A proporção é '+c.truePositive+' ÷ ('+c.truePositive+' + '+c.falsePositive+') = '+value+'. Não confunda sensibilidade com chance de ter a condição após positivo.'},
    {question:'Qual é a taxa de base da condição na população?',options:[percent(c.baseRate),percent(c.sensitivity),percent(c.posterior)],correct:0,why:'Taxa de base = '+c.condition+' ÷ '+c.population+' = '+percent(c.baseRate)+'. A proporção de positivos que são casos reais é outra quantidade.'}
  ],random);
}
