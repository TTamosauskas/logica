import {buildBridgeLessons} from './pedagogy-v3-builder.js';
export const PEDAGOGY_BRIDGES_VII=buildBridgeLessons([
  [
    "modais",
    [
      "Marque o mundo atual e desenhe suas alternativas acessíveis.",
      "Para ◇ busque ao menos uma testemunha; para □ inspecione todas.",
      "Não presuma que o mundo atual é acessível a si próprio sem indicação."
    ],
    [
      [
        "Para □p ser verdadeira em w, o que é necessário?",
        "p deve valer em todos os mundos acessíveis a w.",
        "p deve valer em pelo menos um mundo acessível.",
        "p deve valer somente no mundo w.",
        "□ funciona como 'todos' em relação aos mundos acessíveis.",
        "A necessidade modal exige que todos os destinos acessíveis satisfaçam p.",
        "Uma única testemunha bastaria para ◇p, não para □p.",
        "O próprio mundo só entra no teste se a relação o tornar acessível."
      ],
      [
        "De w há setas para w1 com p=V e w2 com p=F. Quanto vale ◇p em w?",
        "V, por causa de w1.",
        "F, porque w2 é falsa.",
        "V somente se □p também for V.",
        "Procure ao menos um destino com p verdadeira.",
        "◇p é verdadeira porque w1 fornece a alternativa requerida.",
        "Um destino negativo não elimina a possibilidade oferecida por outro.",
        "Possibilidade pode valer mesmo quando a necessidade falha."
      ],
      [
        "Uma porta pode estar aberta em um cenário acessível, fechada em outro. O que podemos afirmar no mundo inicial?",
        "◇aberta é verdadeira e □aberta é falsa.",
        "□aberta é verdadeira porque existe uma alternativa aberta.",
        "◇aberta é falsa porque há uma alternativa fechada.",
        "Possibilidade exige um destino; necessidade exige todos.",
        "Um cenário aberto basta para ◇, mas o fechado refuta □.",
        "A necessidade falha se qualquer alternativa acessível estiver fechada.",
        "A possibilidade não exige que todas as alternativas sejam abertas."
      ]
    ]
  ],
  [
    "temporal",
    [
      "Liste os instantes da sequência a partir do momento atual.",
      "Diferencie F 'em algum instante', G 'em todos' e X 'no próximo'.",
      "Confira a convenção do último instante e o requisito de U forte."
    ],
    [
      [
        "No traço finito adotado, Fp significa:",
        "p ocorre em pelo menos um instante desde o atual, inclusive agora.",
        "p permanece verdadeira em todos os instantes.",
        "p ocorre obrigatoriamente apenas no próximo instante.",
        "O F procura alguma ocorrência desde o ponto da avaliação.",
        "O operador F exige uma testemunha temporal, incluindo o instante corrente nessa convenção.",
        "Permanecer em todos os instantes é a regra de G.",
        "Somente o próximo estado corresponde ao operador X."
      ],
      [
        "Num traço t0,t1,t2, com p apenas em t2, quanto vale Fp em t0?",
        "V, porque p aparece em t2.",
        "F, porque p é falsa em t0.",
        "F, porque F olha só para t1.",
        "Procure o primeiro instante onde p é V, incluindo o presente.",
        "F é eventualidade: a ocorrência em t2 sustenta o enunciado desde t0.",
        "Fp não exige verdade já no ponto inicial.",
        "Fp pode olhar além do instante imediatamente seguinte."
      ],
      [
        "Um monitor ficará 'sempre ligado' nos instantes restantes, mas apaga no último. G(ligado) é:",
        "Falsa, por existir um instante com ligado=F.",
        "Verdadeira, porque esteve ligado na maior parte.",
        "Verdadeira, porque F(ligado) seria V.",
        "G exige todos os instantes, não apenas a maioria.",
        "Um único instante do traço sem a propriedade refuta a permanência G.",
        "Maioria não satisfaz quantificação temporal universal.",
        "F afirma alguma ocorrência; não garante permanência G."
      ]
    ]
  ],
  [
    "temporal_composta",
    [
      "Identifique o operador temporal mais externo.",
      "Avalie o operador interno a partir de cada instante relevante.",
      "Não confunda 'eventualmente sempre' com 'sempre eventualmente'."
    ],
    [
      [
        "A fórmula F(Gp) exige:",
        "Algum instante a partir do qual p permaneça verdadeira.",
        "p verdadeira só no instante inicial.",
        "p verdadeira em qualquer instante isolado, mesmo se depois falhar.",
        "Primeiro procure um ponto de partida; depois verifique todo o sufixo.",
        "F(Gp) requer um instante que testemunhe a permanência Gp dali em diante.",
        "Ser verdadeira apenas agora não garante permanência futura.",
        "Uma ocorrência isolada satisfaz Fp, mas não necessariamente F(Gp)."
      ],
      [
        "No traço p=F,V,V, avaliado em t0, quanto vale F(Gp)?",
        "V, pois em t1 p começa a permanecer V.",
        "F, pois p é falsa em t0.",
        "F, pois só t0 conta para a fórmula.",
        "Em t1 verifique Gp até o último instante.",
        "Como p vale em t1 e t2, Gp vale a partir de t1 e satisfaz F externo.",
        "A ocorrência de um estado inicial F não impede futura permanência.",
        "F considera instantes futuros além do atual na semântica do curso."
      ],
      [
        "Um servidor falha agora, mas depois estabiliza e nunca mais falha no traço. Qual frase descreve isso?",
        "Em algum momento começa a valer G(estável): F(Gestável).",
        "Desde agora sempre está estável: G(estável).",
        "Não será estável em instante algum: ¬F(estável).",
        "Considere quando começa a parte do traço inteiramente estável.",
        "Há um início posterior de estabilidade permanente, mesmo que o instante atual falhe.",
        "A falha atual refuta a exigência de G já em t0.",
        "Como haverá estabilidade, negar toda eventualidade de estabilidade é falso."
      ]
    ]
  ],
  [
    "temporal_condicional",
    [
      "Interprete G como uma obrigação verificada em cada instante.",
      "Quando p ocorrer, procure q desde aquele instante, conforme F do curso.",
      "Teste o pedido que aparece mais tarde, sobretudo no último estado."
    ],
    [
      [
        "A fórmula G(p→Fq) expressa:",
        "Toda ocorrência de p tem q em algum instante desde aquela ocorrência.",
        "Existe apenas um pedido p em algum momento.",
        "q acontece antes de qualquer p, sem exceção.",
        "Leia a fórmula de fora para dentro: sempre, se pedido, então alguma resposta.",
        "Cada instante com p impõe eventualidade de q a partir dele.",
        "A fórmula não limita o número total de pedidos a um.",
        "O operador F do consequente olha do pedido em diante, não antes."
      ],
      [
        "Em t0 há pedido p; em t1 há resposta q; depois não há pedidos. G(p→Fq) é atendida?",
        "Sim, esse pedido encontrou resposta posterior no traço.",
        "Não, porque q não ocorreu simultaneamente com p.",
        "Não, porque todo instante precisa ter um pedido.",
        "F permite resposta no mesmo instante ou posteriormente.",
        "O pedido de t0 é seguido por resposta em t1, e os instantes sem pedido não violam a condicional.",
        "O requisito não obriga resposta exatamente no instante do pedido.",
        "A condicional pode valer em instantes com antecedente falso."
      ],
      [
        "No último instante há solicitação sem resposta agora; não há estados depois. A propriedade G(p→Fq) vale no traço?",
        "Não, o pedido final não dispõe de resposta desde esse instante.",
        "Sim, porque o sistema respondeu a pedidos anteriores.",
        "Sim, porque Fq pode buscar um estado além do traço sem informação.",
        "A partir do último instante não há outro estado representado nessa semântica.",
        "O pedido final com q falsa torna Fq falsa nesse ponto e viola a garantia global.",
        "Respostas antigas não atendem automaticamente ao pedido final.",
        "O traço finito estudado não inventa instantes futuros além do último."
      ]
    ]
  ],
  [
    "epistemica",
    [
      "Liste os mundos que o agente considera possíveis.",
      "Para saber p, verifique p em todas essas alternativas.",
      "Separe verdade no mundo real de conhecimento do agente."
    ],
    [
      [
        "Kₐp afirma, no modelo epistêmico usual:",
        "p vale em todos os mundos que Ana considera possíveis.",
        "p vale em pelo menos um mundo imaginável.",
        "Ana apenas deseja que p seja verdadeira.",
        "Conhecimento envolve excluir todas as alternativas acessíveis com ¬p.",
        "Kₐ funciona como exigência universal sobre alternativas epistêmicas do agente.",
        "Uma alternativa favorável não elimina outras em que p falha.",
        "Desejo não é condição semântica de conhecimento."
      ],
      [
        "Ana considera duas possibilidades: em uma a senha foi trocada, em outra não. Ela sabe que foi trocada?",
        "Não, pois uma alternativa compatível nega a troca.",
        "Sim, porque há uma alternativa em que houve troca.",
        "Sim, porque basta Ana acreditar sem ressalvas.",
        "Para Kₐp, todas as alternativas de Ana devem ter p.",
        "A alternativa sem troca impede atribuir conhecimento da troca nessa representação.",
        "A possibilidade de troca sustenta ◇p, não Kₐp.",
        "O modelo de conhecimento considera as alternativas compatíveis, não apenas confiança subjetiva."
      ],
      [
        "O relatório realmente foi aprovado, mas Beto ainda admite um cenário em que foi rejeitado. Podemos atribuir K_B(aprovado)?",
        "Não, a alternativa de rejeição impede o conhecimento no modelo.",
        "Sim, verdade factual garante conhecimento de todos.",
        "Sim, admitir rejeição prova que ele conhece a aprovação.",
        "Separe o fato ocorrido das possibilidades disponíveis ao agente.",
        "A verdade no mundo atual não basta para conhecimento enquanto resta alternativa acessível onde a proposição falha.",
        "Pessoas podem ignorar fatos verdadeiros no mundo real.",
        "Uma alternativa de rejeição é precisamente um obstáculo a K da aprovação."
      ]
    ]
  ],
  [
    "deontica",
    [
      "Diferencie ação devida, permitida e proibida.",
      "Separe uma norma O(p) do fato de p ter ocorrido.",
      "Ao analisar uma violação, confira tanto o dever quanto a ação real."
    ],
    [
      [
        "A norma 'é obrigatório usar capacete' significa:",
        "Há uma obrigação, ainda que alguém possa descumpri-la.",
        "Todos efetivamente usam capacete em qualquer situação.",
        "Usar capacete está proibido.",
        "Norma e comportamento observado são coisas diferentes.",
        "O(p) descreve o dever de p e não garante que p aconteça de fato.",
        "A obrigação pode ser violada por uma pessoa concreta.",
        "Proibição seria uma norma contrária ao uso de capacete."
      ],
      [
        "A conduta p é obrigatória, mas observamos ¬p. O que ocorreu?",
        "Violação de uma obrigação.",
        "Demonstração de que obrigação e fato são sempre iguais.",
        "Prova de que a conduta foi permitida e praticada.",
        "Observe simultaneamente a regra e a ação executada.",
        "O(p) junto de ¬p indica que o dever foi descumprido no cenário.",
        "O dever não é uma descrição que precisa tornar o fato verdadeiro.",
        "A ausência de p não comprova sua execução nem sua permissão."
      ],
      [
        "Uma placa diz 'é proibido estacionar'. Um carro está estacionado. A placa deixa de expressar proibição?",
        "Não; o fato pode contrariar a norma que continua valendo.",
        "Sim; toda proibição falha automaticamente quando descumprida.",
        "Sim; estacionar e proibição se anulam logicamente.",
        "A existência da regra é independente do cumprimento observado.",
        "Uma violação não torna a norma inexistente; é preciso distinguir dever e fato.",
        "Normas podem ser descumpridas sem desaparecer.",
        "A ação e a obrigação não são proposições que se anulam mutuamente."
      ]
    ]
  ],
  [
    "difusa",
    [
      "Identifique a característica graduada e a escala definida.",
      "Trate o grau como pertinência a uma categoria, não como probabilidade automática.",
      "Compare graus sob a mesma função de pertinência."
    ],
    [
      [
        "Em lógica difusa, um grau 0,7 de 'água quente' significa:",
        "Grau de pertinência 0,7 à categoria 'quente' segundo uma função definida.",
        "Probabilidade de 70% de a água existir.",
        "Temperatura exata de 0,7°C.",
        "Pergunte o que a função associa à temperatura medida.",
        "O grau mede pertinência à propriedade gradual definida no modelo.",
        "Pertinência difusa não equivale automaticamente à incerteza probabilística sobre existência.",
        "A escala 0 a 1 não representa diretamente temperatura em graus Celsius."
      ],
      [
        "Uma temperatura tem pertinência 0,2 em 'quente' e 0,8 em 'morna'. Podemos interpretar isso como uma contradição?",
        "Não; as duas categorias podem ter graus diferentes de pertinência.",
        "Sim; apenas uma categoria pode ter valor não nulo.",
        "Sim; cada valor é uma certeza estatística sobre outra água.",
        "Gradações de categorias podem se sobrepor conforme suas funções.",
        "Funções de pertinência diferentes podem atribuir graus distintos ao mesmo objeto.",
        "Uma modelagem difusa não exige categorias necessariamente excludentes.",
        "Esses graus não são chances de ocorrências aleatórias distintas."
      ],
      [
        "Dois termômetros usam definições diferentes de 'muito quente' e registram graus de pertinência diferentes para 40°C. Qual conclusão é responsável?",
        "Os graus dependem das funções de pertinência adotadas.",
        "Um termômetro necessariamente mentiu sobre a temperatura.",
        "Os graus são probabilidades de um evento futuro.",
        "Antes de comparar graus, confira a definição da categoria em cada sistema.",
        "Sem função comum, graus podem refletir critérios distintos, não erro de leitura.",
        "Diferenças de modelagem não provam falsificação da medição.",
        "Grau de pertencimento a um predicado não prevê automaticamente eventos."
      ]
    ]
  ],
  [
    "paraconsistente",
    [
      "Localize afirmações p e ¬p que possuem suporte.",
      "Diferencie inconsistência de derivação arbitrária.",
      "Verifique qual regra de inferência está sendo adotada no sistema."
    ],
    [
      [
        "Uma base contém 'p' e 'não p' em registros diferentes. Uma lógica paraconsistente busca:",
        "Tratar o conflito sem concluir automaticamente qualquer q.",
        "Declarar que toda frase q está provada.",
        "Apagar os dois registros antes de raciocinar.",
        "Explosão é uma propriedade de certas lógicas, não de toda forma de raciocínio.",
        "Uma abordagem paraconsistente permite analisar inconsistências sem explosão generalizada.",
        "Derivar qualquer q de uma contradição é a explosão clássica que se evita.",
        "Pode-se conservar e examinar evidências conflitantes em vez de apagá-las."
      ],
      [
        "Na lógica clássica explosiva, a partir de p e ¬p como premissas pode-se derivar formalmente:",
        "Uma proposição arbitrária q.",
        "Apenas a própria p, nunca outra fórmula.",
        "Um fato empírico comprovado sobre q.",
        "Separe derivabilidade formal de prova factual.",
        "A explosão clássica permite derivação de qualquer q a partir da inconsistência.",
        "A propriedade da explosão não limita a conclusão a p.",
        "Uma derivação num sistema inconsistente não comprova fatos observáveis."
      ],
      [
        "Dois sensores discordam sobre a porta: um indica aberta, outro fechada. Qual atitude é compatível com abordagem paraconsistente?",
        "Registrar os dois suportes sem deduzir, por isso, uma notícia arbitrária.",
        "Concluir que qualquer notícia do mundo está correta.",
        "Ignorar todos os registros, inclusive os concordantes.",
        "A contradição local deve permanecer localizada no que foi observado.",
        "O sistema pode preservar informações contraditórias e evitar que contaminem todas as conclusões.",
        "O conflito sobre porta não fornece evidência sobre fatos desconexos.",
        "Descartar tudo não é requisito da lógica paraconsistente."
      ]
    ]
  ],
  [
    "fde_operacoes",
    [
      "Registre separadamente suporte a V e suporte a F.",
      "Use T=(1,0), F=(0,1), B=(1,1) e N=(0,0).",
      "Para negar, troque os suportes positivo e negativo sem colapsá-los."
    ],
    [
      [
        "Em FDE, B=(1,1) representa:",
        "Suporte tanto positivo quanto negativo.",
        "Ausência de qualquer informação.",
        "Somente informação falsa sem suporte positivo.",
        "Leia cada componente do par de evidências separadamente.",
        "B significa que a proposição recebeu suporte nos dois sentidos.",
        "A ausência de ambos os suportes é N=(0,0).",
        "Só suporte negativo é F=(0,1), não B."
      ],
      [
        "Se p está no estado N=(0,0), como fica ¬p no sistema FDE?",
        "N=(0,0).",
        "T=(1,0).",
        "B=(1,1).",
        "A negação troca as posições do par sem criar informação nova.",
        "Trocar os dois zeros mantém zero suporte positivo e negativo.",
        "Não existe suporte negativo original a ser transferido para positivo.",
        "Negação de informação ausente não cria suportes nos dois sentidos."
      ],
      [
        "Um relatório tem testemunhos pró e contra o mesmo fato. Qual estado FDE descreve a evidência?",
        "B=(1,1).",
        "T=(1,0).",
        "N=(0,0).",
        "Registre se há suporte a favor e contra antes de combinar conclusões.",
        "A presença simultânea das duas evidências corresponde ao estado B de ambas.",
        "T descartaria o suporte negativo que está presente.",
        "N diria que não há informação em nenhum sentido."
      ]
    ]
  ],
  [
    "fde_conjuncao",
    [
      "Registre suportes positivos e negativos de cada parcela.",
      "No E, o positivo exige ambos os positivos.",
      "No E, o negativo recebe o negativo de qualquer parcela."
    ],
    [
      [
        "Em FDE, suporte positivo de p∧q aparece quando:",
        "As duas parcelas têm suporte positivo.",
        "Pelo menos uma parcela tem suporte positivo.",
        "Nenhuma parcela tem suporte negativo.",
        "Para apoiar 'p e q', é preciso apoiar cada uma das afirmações.",
        "O suporte positivo da conjunção é o E dos suportes positivos de p e q.",
        "Ter apenas um lado apoiado não basta para apoiar a conjunção inteira.",
        "Ausência de suporte negativo não cria suporte positivo automaticamente."
      ],
      [
        "Se p=T=(1,0) e q=F=(0,1), qual estado resulta de p∧q?",
        "F=(0,1).",
        "T=(1,0).",
        "N=(0,0).",
        "Calcule positivo 1∧0 e negativo 0∨1.",
        "O suporte positivo é zero e o negativo é um, dando estado F.",
        "Não há suporte positivo para a conjunção porque q não o possui.",
        "O suporte negativo de q se transmite ao E, portanto não é N."
      ],
      [
        "Um banco afirma 'há documento válido' com suporte positivo, mas 'há assinatura' tem apenas suporte negativo. A conjunção tem:",
        "Suporte negativo, mas não positivo (F).",
        "Suporte positivo completo, porque o documento basta.",
        "Nenhum suporte de espécie alguma, pois as fontes diferem.",
        "A conjunção precisa de suporte positivo para cada requisito.",
        "A assinatura sem apoio positivo impede apoiar o E e fornece suporte negativo.",
        "Uma parcela positiva não basta para sustentar toda a conjunção.",
        "O suporte negativo de assinatura continua relevante para o E."
      ]
    ]
  ],
  [
    "fde_disjuncao",
    [
      "Registre os dois componentes dos valores FDE.",
      "No OU, positivo recebe o positivo de ao menos uma parcela.",
      "No OU, negativo exige suporte negativo nas duas parcelas."
    ],
    [
      [
        "Na disjunção FDE, o suporte positivo de p∨q exige:",
        "Ao menos uma parcela com suporte positivo.",
        "As duas parcelas com suporte positivo.",
        "Ausência total de suportes negativos.",
        "Um OU pode ser apoiado por qualquer uma das alternativas.",
        "O componente positivo de p∨q é a disjunção dos positivos de p e q.",
        "Exigir ambos positivos seria o comportamento do E.",
        "Informação negativa não determina sozinha a existência de apoio positivo."
      ],
      [
        "Se p=T=(1,0) e q=F=(0,1), qual o estado de p∨q?",
        "T=(1,0).",
        "F=(0,1).",
        "B=(1,1).",
        "Calcule positivo 1∨0 e negativo 0∧1.",
        "Há apoio positivo pela primeira parcela, mas não apoio negativo conjunto; o estado é T.",
        "O positivo de p permanece e torna a disjunção positivamente apoiada.",
        "Para negativo 1 seria necessário suporte negativo nas duas parcelas."
      ],
      [
        "Uma fonte apoia 'há energia' e outra refuta 'há conexão', sem outros suportes. Para 'energia OU conexão', qual apoio é suficiente?",
        "O positivo da energia sustenta o OU, mesmo sem apoiar conexão.",
        "A conexão precisa ter também suporte positivo.",
        "As duas parcelas precisam ter suporte negativo.",
        "No OU basta uma alternativa positivamente apoiada.",
        "O suporte positivo de uma parcela se propaga à disjunção inteira.",
        "Exigir duas parcelas positivas confunde OU com E.",
        "O suporte negativo do OU depende das duas negativas, não é condição do positivo."
      ]
    ]
  ],
  [
    "intuicionista",
    [
      "Pergunte qual evidência construtiva justificaria a afirmação.",
      "Para p∨q, busque prova de um dos lados.",
      "Não aplique automaticamente leis clássicas sem demonstrar construtivamente."
    ],
    [
      [
        "Na leitura construtiva de p∨q, o que deve ser fornecido?",
        "Uma prova de p ou uma prova de q, com indicação da alternativa.",
        "Somente ausência de evidência de ¬p e ¬q.",
        "Um voto majoritário favorável.",
        "Uma disjunção construtiva pede testemunha de uma das alternativas.",
        "Mostrar um dos lados permite introduzir a disjunção no raciocínio intuicionista.",
        "Não refutar lados não equivale a construir uma prova de algum deles.",
        "Popularidade não é evidência formal construtiva."
      ],
      [
        "Uma demonstração fornece p. Qual conclusão disjuntiva se pode construir?",
        "p∨q.",
        "¬p∨q sem outra prova.",
        "p∧q sem prova de q.",
        "Use introdução da disjunção a partir do lado demonstrado.",
        "Com prova de p podemos escolher explicitamente o ramo esquerdo de p∨q.",
        "A prova de p não oferece uma prova de ¬p ou de q.",
        "A conjunção exigiria também prova da segunda parcela q."
      ],
      [
        "Alguém afirma 'a senha é válida OU não é', sem ter método para decidir qualquer lado. Isso basta como prova intuicionista geral?",
        "Não; a lei do terceiro excluído não é admitida universalmente sem construção.",
        "Sim; qualquer disjunção clássica serve como prova construtiva.",
        "Sim; basta desconhecer a senha para provar sua validade.",
        "Peça uma prova de um dos lados ou um procedimento construtivo apropriado.",
        "Sem construção, p∨¬p não é teorema geral da lógica intuicionista.",
        "A validade clássica da fórmula não fornece automaticamente prova intuicionista.",
        "Desconhecer o valor de p não demonstra p."
      ]
    ]
  ],
  [
    "intuicionista_negacao",
    [
      "Interprete ¬p como uma prova de p levando a ⊥.",
      "Diferencie falta de prova de p de prova de sua impossibilidade.",
      "Confira qual hipótese é usada para produzir a contradição."
    ],
    [
      [
        "Em lógica intuicionista, ¬p abrevia:",
        "p→⊥.",
        "p∨⊥.",
        "A ausência psicológica de crença em p.",
        "Para negar construtivamente p, mostre que uma prova de p produziria absurdo.",
        "A negação é uma transformação de eventual prova de p em contradição.",
        "Essa disjunção não expressa uma função que refuta provas de p.",
        "Não acreditar em p não fornece demonstração formal de sua impossibilidade."
      ],
      [
        "Uma pessoa ainda não provou p. Isso permite concluir ¬p no sistema intuicionista?",
        "Não; falta de prova não é prova de impossibilidade.",
        "Sim; não demonstrar equivale a refutar.",
        "Sim; toda proposição sem prova é falsa.",
        "Pergunte se foi construída uma passagem de p para contradição.",
        "Para concluir ¬p, é necessária evidência de que p implicaria absurdo.",
        "Ausência de demonstração não é a mesma coisa que prova contrária.",
        "Proposições não decididas não ficam automaticamente negadas."
      ],
      [
        "Um algoritmo ainda não encontrou solução para um problema. Isso demonstra que solução é impossível?",
        "Não; pode faltar uma prova de impossibilidade.",
        "Sim; toda busca incompleta prova inexistência.",
        "Sim; ausência temporária é uma contradição formal.",
        "Negar existência exige uma justificativa universal, não apenas busca sem sucesso.",
        "Uma busca malsucedida até agora não constrói demonstração de que não existe solução.",
        "A busca pode encontrar uma solução adiante; não provou impossibilidade.",
        "Não houve hipótese levando a ⊥ nem refutação formal."
      ]
    ]
  ],
  [
    "intuicionista_dupla_negacao",
    [
      "Lembre que ¬p é p→⊥.",
      "Mostre por que ter p permite refutar uma prova de ¬p.",
      "Não inverta p→¬¬p sem uma construção adicional."
    ],
    [
      [
        "Na lógica intuicionista, qual implicação é válida em geral?",
        "p→¬¬p.",
        "¬¬p→p.",
        "¬p→p.",
        "Se você tem uma prova de p, pode mostrar que ¬p produziria absurdo.",
        "A prova de p refuta qualquer prova de sua negação, estabelecendo ¬¬p.",
        "Eliminar dupla negação universalmente é um passo clássico não aceito em geral.",
        "Uma prova de ¬p não fornece, por si só, prova de p."
      ],
      [
        "Qual é a dificuldade de inferir p somente de ¬¬p no sistema intuicionista?",
        "¬¬p impede uma refutação de p, mas não constrói uma prova de p.",
        "¬¬p é a mesma sequência literal de caracteres que p.",
        "Uma contradição formal garante qualquer resultado empírico.",
        "Diferencie negar uma impossibilidade de fornecer uma testemunha positiva.",
        "A dupla negação não garante universalmente a construção necessária para afirmar p.",
        "As fórmulas diferem sintaticamente e na exigência de prova.",
        "Propriedades formais não produzem automaticamente fatos empíricos."
      ],
      [
        "Um problema não pode ser demonstrado impossível, mas ainda não temos uma solução construída. Qual afirmação é prudente sob enfoque construtivo?",
        "Não concluir que já existe uma solução efetivamente construída.",
        "Concluir que há solução concreta por eliminação da dupla negação.",
        "Concluir que o problema é impossível porque a solução não apareceu.",
        "Peça uma testemunha ou método construtivo antes de afirmar existência.",
        "Não refutar uma solução não é o mesmo que apresentar a solução construída.",
        "Essa conclusão aplicaria eliminação clássica da dupla negação sem construção.",
        "Não ter solução em mãos não demonstra impossibilidade."
      ]
    ]
  ]
]);
