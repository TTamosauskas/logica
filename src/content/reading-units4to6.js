/** Unidades IV–VI — quantificadores, fundamentos teóricos e outras lógicas. */
export const UNIT4_TO_6_READINGS={
  categoricos:{
    objective:'Interpretar “todos”, “nenhum” e “alguns” como relações entre conjuntos, distinguindo regiões vazias de existência de indivíduos.',
    sections:[
      {heading:'Comece pensando em grupos',paragraphs:[
        'Imagine dois grupos: estudantes e pessoas que gostam de matemática. A frase “Todos os estudantes gostam de matemática” informa que não existe estudante fora do grupo das pessoas que gostam de matemática. Ela não diz que todas as pessoas que gostam de matemática sejam estudantes.',
        'Podemos representar os dois grupos por círculos num diagrama de Venn. Cada região corresponde a uma combinação de pertencimento: estar nos dois grupos, somente no primeiro, somente no segundo ou fora deles. A lógica usa essas regiões para mostrar o que as afirmações exigem.'
      ]},
      {heading:'Quando hachurar e quando marcar existência?',paragraphs:[
        'No enunciado “Todos S são P”, a parte de S que fica fora de P precisa estar vazia. No diagrama, hachuramos essa região para indicar que não pode haver indivíduos ali. Em “Nenhum S é P”, hachuramos a interseção: ninguém pode pertencer simultaneamente aos dois grupos.',
        'Já “Alguns S são P” exige pelo menos um indivíduo que pertença aos dois grupos. Podemos marcar sua existência com um X na interseção. Hachura não representa presença: indica uma região vazia pelas condições dadas; X representa presença de pelo menos um elemento.'
      ]},
      {heading:'Uma sutileza sobre afirmações universais',paragraphs:[
        'Pense na frase “Todos os unicórnios da cidade usam crachá”. Suponha que não exista nenhum unicórnio na cidade. Na semântica clássica, a frase universal continua verdadeira: não encontramos um unicórnio que descumpra a condição. Essa ideia é chamada verdade vacuamente verdadeira ou verdade vacuosa.',
        'Por isso, de “Todos S são P” não podemos concluir automaticamente “Alguns S são P”. A primeira frase proíbe certos contraexemplos, mas não exige que o grupo S tenha integrantes. Para afirmar existência, precisamos de uma premissa com “alguns” ou informação equivalente.'
      ]}
    ],
    misconception:'Não interprete o hachurado do Venn como “aqui há exemplos”. Ele significa região vazia; o símbolo X é usado quando as premissas exigem a existência de pelo menos um indivíduo.',
    summary:'Universais restringem regiões: “todos” esvazia S fora de P, e “nenhum” esvazia a interseção. “Alguns” exige existência e é marcado com X.',
    check:{question:'Em um Venn, o que precisamos marcar ao afirmar “Alguns estudantes são músicos”?',options:['Um X na interseção entre estudantes e músicos.','Hachurar toda a interseção entre os grupos.','Hachurar a região fora dos dois grupos.'],correct:0,why:'“Alguns” exige ao menos um indivíduo presente nos dois conjuntos. O X registra existência; hachurar a interseção indicaria o oposto.'}
  },
  predicados2:{
    objective:'Interpretar relações entre indivíduos e distinguir o significado de ∀x∃y e ∃y∀x por meio de exemplos e contraexemplos.',
    sections:[
      {heading:'Quando uma qualidade não basta',paragraphs:[
        'Até aqui, expressões como “Ana é estudante” descreviam uma propriedade de alguém. Agora pense em “Ana ajuda Beto”: não basta saber quem é estudante ou quem é prestativo; precisamos indicar uma relação entre duas pessoas, com papéis diferentes.',
        'Podemos escrever Ajuda(Ana,Beto). A primeira posição indica quem ajuda, e a segunda indica quem recebe a ajuda. Inverter os nomes, Ajuda(Beto,Ana), descreve outra relação que não é necessariamente verdadeira. Chamamos expressões como Ajuda(x,y) de predicados de dois lugares.'
      ]},
      {heading:'A ordem dos quantificadores importa',paragraphs:[
        'Compare “Cada estudante ajuda alguma pessoa” com “Há uma pessoa que todos os estudantes ajudam”. Na primeira frase, cada estudante pode ajudar alguém diferente. Na segunda, precisamos encontrar uma única pessoa que seja ajudada por todos os estudantes.',
        'Escrevemos a primeira estrutura como ∀x∃y Ajuda(x,y): para cada x, existe algum y que pode depender de x. Já ∃y∀x Ajuda(x,y) afirma que existe um mesmo y para todos os x. Os símbolos ∀ (“para todo”) e ∃ (“existe”) mudam o alcance da exigência.'
      ]},
      {heading:'Teste com um pequeno cenário',paragraphs:[
        'Imagine duas pessoas, Ana e Beto. Ana ajuda Ana, e Beto ajuda Beto, mas nenhuma delas ajuda a outra. Então ∀x∃y Ajuda(x,y) é verdadeira: cada pessoa ajuda ao menos uma pessoa. Porém ∃y∀x Ajuda(x,y) é falsa: não existe uma única pessoa ajudada por ambas.',
        'Esse cenário funciona como contraexemplo à ideia de que as duas fórmulas são equivalentes. Também devemos observar qual conjunto de pessoas está sendo considerado, chamado domínio, e a ordem dos argumentos de Ajuda. Identidade, escrita x = y, significa que dois termos indicam o mesmo indivíduo.'
      ]}
    ],
    misconception:'Não leia ∀x∃y como se o mesmo y tivesse de servir a todos. O existencial aparece dentro da exigência para cada x, portanto a pessoa escolhida pode variar.',
    summary:'Predicados de dois lugares descrevem relações orientadas. ∀x∃y admite escolhas de y diferentes para cada x; ∃y∀x exige um y que sirva a todos.',
    check:{question:'Qual frase corresponde a ∃y∀x Ajuda(x,y), em um domínio de pessoas?',options:['Cada pessoa ajuda alguém, possivelmente diferente.','Existe uma pessoa que todas as pessoas ajudam.','Ninguém ajuda ninguém.'],correct:1,why:'O quantificador ∃y vem primeiro: há uma única escolha de y que deve funcionar para todos os valores de x.'}
  },
  metateoria:{
    objective:'Distinguir fórmulas e provas de interpretações e modelos, reconhecendo o significado de consequência semântica, correção e completude.',
    sections:[
      {heading:'Duas maneiras diferentes de avaliar a lógica',paragraphs:[
        'Pense em um jogo com regras escritas. Podemos perguntar se uma jogada segue as regras, mesmo sem investigar o resultado da partida. Também podemos perguntar se uma afirmação vale em todas as situações possíveis do jogo. Em lógica formal, existe uma distinção semelhante entre provas e significados.',
        'A sintaxe trata de expressões bem formadas e das regras para construir demonstrações. A semântica estuda como interpretamos essas expressões e em quais modelos elas são verdadeiras. As duas perspectivas se relacionam, mas não são a mesma coisa.'
      ]},
      {heading:'Demonstração e consequência semântica',paragraphs:[
        'Quando escrevemos Γ ⊢ φ, dizemos que há uma demonstração formal da fórmula φ a partir de um conjunto de premissas Γ, usando as regras do sistema escolhido. É uma afirmação sobre a possibilidade de construir uma prova por passos autorizados.',
        'Quando escrevemos Γ ⊨ φ, dizemos algo diferente: toda interpretação que torna verdadeiras as premissas de Γ também torna verdadeira φ. Essa relação é chamada consequência semântica. Podemos investigar o mesmo raciocínio pelas regras de prova ou pelos modelos possíveis.'
      ]},
      {heading:'O que é um sistema correto e completo?',paragraphs:[
        'Um sistema de provas é correto, ou sólido no sentido metateórico, quando suas regras não permitem demonstrar uma conclusão que falhe semanticamente a partir das premissas. Em símbolos: se Γ ⊢ φ, então Γ ⊨ φ. O sistema não produz inferências inválidas.',
        'Um sistema é completo, relativamente à linguagem e à semântica especificadas, quando toda consequência semântica pode ser demonstrada: se Γ ⊨ φ, então Γ ⊢ φ. Correção e completude são propriedades distintas. Nenhuma delas, isoladamente, significa que existe um algoritmo que termina para decidir toda pergunta possível.'
      ]}
    ],
    misconception:'Não confunda completude com decidibilidade. Um sistema pode permitir prova para cada consequência semântica sem oferecer um procedimento que termine com “sim” ou “não” para todas as entradas.',
    summary:'⊢ expressa derivação por regras; ⊨ expressa consequência em todos os modelos. Correção liga prova à validade; completude liga validade à existência de prova.',
    check:{question:'Se um sistema é correto, qual afirmação deve valer?',options:['Tudo o que é demonstrável a partir das premissas também é consequência semântica delas.','Todas as fórmulas são demonstráveis.','Qualquer fórmula pode ser decidida por um algoritmo que sempre termina.'],correct:0,why:'Correção assegura que uma derivação autorizada não leva a uma conclusão semanticamente inválida a partir das premissas.'}
  },
  modais:{
    objective:'Distinguir possibilidade de necessidade e interpretar operadores modais e temporais segundo os mundos ou momentos considerados.',
    sections:[
      {heading:'O que significa dizer que algo é possível?',paragraphs:[
        'Considere “A biblioteca poderia abrir no domingo” e “A biblioteca necessariamente abrirá no domingo”. A primeira frase afirma que há pelo menos uma situação considerada em que a abertura ocorre. A segunda exige que ela ocorra em todas as situações relevantes.',
        'Na lógica modal, representamos essas ideias com ◇p (“é possível que p”) e □p (“é necessário que p”). Para avaliar as fórmulas, imaginamos mundos possíveis, isto é, situações descritas por uma interpretação, e uma relação que indica quais mundos são considerados a partir do mundo atual.'
      ]},
      {heading:'Mundos acessíveis fazem diferença',paragraphs:[
        'Suponha que, do mundo atual, possamos considerar duas situações: numa a biblioteca abre, noutra não. Nesse caso, ◇p é verdadeira, pois existe uma situação acessível com p verdadeira; mas □p é falsa, pois p não é verdadeira em todas as situações acessíveis.',
        'Se p fosse verdadeira em todos os mundos acessíveis, □p seria verdadeira. A relação de acessibilidade define quais mundos entram na avaliação, e diferentes condições impostas a essa relação podem gerar sistemas modais diferentes. Por isso não devemos interpretar “necessário” sem indicar a semântica relevante.'
      ]},
      {heading:'E quando estamos falando de tempo?',paragraphs:[
        'Expressões temporais também exigem distinguir modalidades. A frase “Em algum momento futuro, haverá atendimento” é diferente de “Em todos os momentos futuros, haverá atendimento”. A primeira exige uma ocorrência; a segunda, uma condição mantida durante todo o período futuro considerado.',
        'Em uma lógica temporal linear, operadores como Fp (“eventualmente, p”) e Gp (“sempre daqui em diante, p”) descrevem essas duas exigências. Apesar da semelhança com ◇ e □, os modelos de tempo e as convenções sobre o instante atual precisam ser especificados. Não são apenas símbolos intercambiáveis.'
      ]}
    ],
    misconception:'“É possível que p” não significa “p já é verdadeira aqui”. ◇p exige pelo menos um mundo acessível em que p valha; a verdade de p no mundo atual é outra questão.',
    summary:'◇ expressa possibilidade em algum mundo acessível; □ expressa necessidade em todos. Operadores temporais como F e G falam de ocorrência e permanência no tempo.',
    check:{question:'Se p é verdadeira em um mundo acessível e falsa em outro, o que vale no mundo atual?',options:['◇p é verdadeira, mas □p é falsa.','□p é verdadeira, mas ◇p é falsa.','As duas são necessariamente falsas.'],correct:0,why:'Há pelo menos um mundo acessível com p, satisfazendo ◇p; mas p não vale em todos, portanto □p é falsa.'}
  }
};
