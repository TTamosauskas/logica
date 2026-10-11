/** Unidade V — raciocínio com evidências e incerteza.
 * Leituras desenvolvem intuição, distinguem o alcance das inferências e só então formalizam.
 */
export const UNIT13_READINGS={
  inducao:{
    objective:'Distinguir observações de generalizações, examinar representatividade e tamanho de amostra e propor evidências capazes de testar uma conclusão indutiva.',
    sections:[
      {heading:'Como passar de observações a uma conclusão?',paragraphs:[
        'Você pergunta a dez colegas de uma mesma turma se gostam da biblioteca, e nove respondem que sim. É tentador concluir que 90% dos estudantes de toda a escola gostam da biblioteca. Mas a observação foi feita em apenas uma turma, com pessoas que podem ter características em comum.',
        'A indução parte de casos observados para formular afirmações que vão além deles. É diferente de uma demonstração dedutiva: mesmo que todas as dez respostas tenham sido registradas corretamente, a conclusão sobre toda a escola não é necessária. Ela é uma hipótese cuja força depende da evidência.'
      ]},
      {heading:'Uma amostra precisa representar o que queremos conhecer',paragraphs:[
        'Para avaliar a generalização, primeiro identifique a população de interesse: todos os estudantes da escola, e não apenas os colegas disponíveis. Depois pergunte como as pessoas foram escolhidas. Uma amostra de voluntários de um clube de leitura provavelmente terá preferências diferentes das de toda a escola.',
        'Uma seleção aleatória adequada pode reduzir vieses de seleção, mas o tamanho também importa: mesmo uma amostra bem escolhida tem variação. E uma amostra enorme obtida apenas entre frequentadores da biblioteca continua excluindo quem nunca a visita. Tamanho não corrige automaticamente uma seleção enviesada.'
      ]},
      {heading:'Conclusões proporcionais à qualidade dos dados',paragraphs:[
        'Em vez de afirmar “90% da escola gostam da biblioteca”, você pode dizer: “Nove dos dez colegas entrevistados disseram gostar da biblioteca; ainda não sabemos se isso representa a escola”. Para aumentar a confiança, pesquise estudantes de diferentes turmas com um procedimento de seleção definido.',
        'Uma generalização responsável informa de onde vieram os dados, qual grupo se deseja descrever e quais limites permanecem. Também procura observações que possam contrariar a hipótese, em vez de recolher apenas novos exemplos favoráveis.'
      ]}
    ],
    misconception:'Não confunda frequência observada em uma amostra de conveniência com a frequência verdadeira de toda a população. Aumentar o número de entrevistados do mesmo grupo enviesado pode preservar o erro.',
    summary:'Indução amplia o alcance das observações, mas não garante certeza. Verifique população, seleção, tamanho e possíveis vieses antes de generalizar.',
    check:{question:'Cem clientes de uma loja foram entrevistados sobre a satisfação com a loja. Qual é o limite principal?',options:['Quem nunca visitou a loja ficou fora da amostra.','Cem respostas garantem uma conclusão sobre toda a cidade.','A opinião de clientes nunca pode ser estudada.'],correct:0,why:'Entrevistar somente clientes pode responder a perguntas sobre clientes, mas não representar pessoas que nunca frequentaram a loja.'}
  },
  abducao:{
    objective:'Distinguir dedução, indução e abdução, formular hipóteses concorrentes e escolher uma observação que ajude a diferenciar suas previsões.',
    sections:[
      {heading:'Um fato pode ter mais de uma explicação',paragraphs:[
        'Ao chegar à escola, você encontra o pátio molhado. Talvez tenha chovido durante a noite. Mas também é possível que a equipe de limpeza tenha lavado o chão. O mesmo fato observado é compatível com hipóteses diferentes.',
        'A abdução é o raciocínio que procura uma explicação para aquilo que observamos. Não é uma dedução infalível: “se chove, o pátio fica molhado” e “o pátio está molhado” não permitem concluir necessariamente que choveu. A hipótese da chuva pode ser boa, mas ainda precisa ser comparada com alternativas.'
      ]},
      {heading:'Uma hipótese útil faz previsões que podemos testar',paragraphs:[
        'Se a chuva foi a causa, talvez outras áreas descobertas da escola também estejam molhadas. Se a limpeza molhou apenas o pátio, áreas externas afastadas podem estar secas. Observar esses lugares pode ajudar a distinguir as explicações.',
        'Uma boa investigação procura dados para os quais as hipóteses façam previsões diferentes. Perguntar novamente se o pátio está molhado não acrescenta muito: todas as hipóteses já foram escolhidas justamente porque explicam esse fato. Melhor procurar a observação que possa contrariar uma delas.'
      ]},
      {heading:'A melhor explicação depende da evidência disponível',paragraphs:[
        'Imagine que não há registro de chuva, mas existem funcionários vistos com mangueiras logo antes da chegada dos alunos. A explicação pela limpeza ganha apoio. Isso não significa que a primeira hipótese era impossível; significa que as novas evidências mudaram o peso relativo das explicações.',
        'Compare hipóteses pelo ajuste aos dados, por sua capacidade de produzir previsões verificáveis e pelo número de pressupostos adicionais exigidos. Evite transformar “a melhor explicação até agora” em “uma certeza demonstrada”.'
      ]}
    ],
    misconception:'Não confunda propor uma hipótese explicativa com provar essa hipótese. Mesmo quando uma explicação combina com os fatos, outras podem produzir as mesmas observações.',
    summary:'Abdução parte de um fato e compara explicações possíveis. Busque previsões diferentes e testes que possam distinguir as hipóteses; mantenha a conclusão revisável.',
    check:{question:'O pátio está molhado. Qual observação mais ajuda a distinguir chuva de limpeza localizada?',options:['Verificar se outros espaços externos, longe do pátio, também estão molhados.','Confirmar mais uma vez que o pátio está molhado.','Escolher a primeira explicação que surgiu.'],correct:0,why:'Uma evidência discriminativa é aquela em que as hipóteses fazem previsões diferentes. Repetir o mesmo dado não as separa.'}
  },
  probabilidade:{
    objective:'Interpretar probabilidades condicionais, calcular frequências esperadas a partir de taxas de base e distinguir P(teste positivo dado condição) de P(condição dado teste positivo).',
    sections:[
      {heading:'Uma taxa muito boa pode produzir uma conclusão surpreendente',paragraphs:[
        'Imagine um teste aplicado a 1.000 pessoas. Apenas 10 realmente têm a condição investigada. O teste identifica corretamente 8 dessas 10 pessoas, mas também dá resultado positivo a 99 das 990 pessoas sem a condição. Parece um teste razoável em alguns aspectos, porém teremos muito mais resultados positivos falsos do que verdadeiros.',
        'Entre os 107 resultados positivos, só 8 correspondem à condição. Assim, a chance de ter a condição, entre as pessoas que receberam um resultado positivo nesse cenário, é 8 ÷ 107, aproximadamente 7,5%. Isso não é a mesma coisa que dizer que o teste identifica 80% dos casos verdadeiros.'
      ]},
      {heading:'Comece pelas frequências, depois pela fórmula',paragraphs:[
        'A taxa de base descreve a frequência anterior da condição na população: 10 em 1.000, ou 1%. A sensibilidade do teste é a proporção de pessoas com a condição que recebem positivo: 8 em 10, ou 80%. A taxa de falso positivo é a proporção de pessoas sem a condição que recebem positivo: 99 em 990, ou 10%.',
        'Para entender P(condição | positivo), compare positivos verdadeiros com todos os positivos: verdadeiros positivos ÷ (verdadeiros positivos + falsos positivos). Essa conta é uma aplicação do raciocínio bayesiano com frequências naturais. A direção do condicionamento é decisiva.'
      ]},
      {heading:'Como interpretar um resultado sob incerteza',paragraphs:[
        'Se a condição se tornar mais comum na população, mantendo as características do teste, a proporção de verdadeiros positivos entre todos os positivos também tende a aumentar. Por isso, números de sensibilidade sem a taxa de base podem induzir a uma avaliação enganosa.',
        'Use uma tabela de contagens para examinar quantas pessoas têm a condição, quantas delas recebem positivo e quantas pessoas sem a condição também recebem positivo. Depois expresse o resultado como uma proporção e interprete-o em palavras. Em problemas reais, a validade das taxas e a população estudada precisam ser verificadas.'
      ]}
    ],
    misconception:'Não inverta probabilidades condicionais. P(positivo | condição) mede como o teste se comporta entre os casos reais; P(condição | positivo) mede quantos dos resultados positivos correspondem a casos reais.',
    summary:'A taxa de base altera o significado de um resultado positivo. Conte os positivos verdadeiros e falsos e divida pelo total de resultados positivos para obter a proporção relevante.',
    check:{question:'De 20 resultados positivos, 5 são casos reais. Qual proporção dos positivos é verdadeira?',options:['25%.','75%.','5%.'],correct:0,why:'A proporção relevante é 5 ÷ 20 = 0,25, ou 25%. O denominador é o total de resultados positivos, não a população inteira.'}
  },
  causalidade:{
    objective:'Distinguir associação de causalidade, identificar variáveis de confusão e escolher comparações que permitam testar hipóteses causais com maior rigor.',
    sections:[
      {heading:'Dois acontecimentos podem variar juntos sem que um cause o outro',paragraphs:[
        'Em dias muito quentes, aumentam tanto as vendas de sorvete quanto os atendimentos por afogamento. Seria precipitado dizer que comprar sorvete provoca afogamentos. Os dois aumentos podem ter uma causa comum: o calor leva mais pessoas a procurar sorvete e a frequentar piscinas e praias.',
        'Quando duas variáveis aparecem associadas, existe correlação. Uma relação causal exige algo diferente: que uma mudança em determinado fator produza, nas condições relevantes, uma mudança no resultado. A associação pode ser causada por coincidência, causalidade reversa ou um terceiro fator.'
      ]},
      {heading:'Procure a variável de confusão',paragraphs:[
        'Uma variável de confusão influencia tanto o fator investigado quanto o resultado, criando ou distorcendo uma associação. No exemplo, a temperatura pode influenciar as vendas e a exposição à água. Ignorar essa terceira variável torna a história causal excessivamente simples.',
        'Outro exemplo: estudantes que frequentam aulas de reforço podem ter notas diferentes dos demais. Mas quem procura reforço pode já ter dificuldades anteriores. Comparar as duas médias sem considerar essa diferença não basta para concluir qual é o efeito do reforço.'
      ]},
      {heading:'Como testar melhor uma explicação causal',paragraphs:[
        'Um experimento bem conduzido, com atribuição aleatória a grupos comparáveis, ajuda a isolar o efeito de uma intervenção. Também existem estudos observacionais bem desenhados que controlam fatores conhecidos, embora possam permanecer confundidores não medidos.',
        'Pergunte sempre qual comparação responde à pergunta causal: o que teria acontecido com pessoas semelhantes se a intervenção não tivesse ocorrido? Não é necessário rejeitar toda conclusão causal sem experimento, mas é preciso avaliar o desenho do estudo, as alternativas e os limites dos dados.'
      ]}
    ],
    misconception:'Não conclua que toda correlação é causal, nem que todas as correlações são inúteis. Uma associação pode levantar hipóteses, mas identificar causa exige mais informações e comparações adequadas.',
    summary:'Correlação é associação; causalidade envolve um efeito produzido por uma mudança. Procure confundidores, causalidade reversa e comparações apropriadas antes de concluir.',
    check:{question:'Vendas de sorvete e afogamentos aumentam em dias quentes. Qual fator pode explicar as duas mudanças?',options:['Temperatura e maior procura por lazer aquático.','Comer sorvete necessariamente provoca afogamentos.','A associação prova que não existe nenhuma causa.'],correct:0,why:'O calor pode aumentar tanto o consumo de sorvetes quanto a exposição à água: uma variável comum pode produzir a associação.'}
  }
};
