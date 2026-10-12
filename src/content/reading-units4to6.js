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
    objective:'Interpretar relações e ordem dos quantificadores, substituir nomes de um mesmo indivíduo e distinguir existência, unicidade e descrições definidas.',
    sections:[
      {heading:'Relações, nomes e o significado de identidade',paragraphs:[
        '“Ana ajuda Beto” representa uma relação com duas posições: Ajuda(Ana,Beto). Trocar as posições não preserva automaticamente a verdade. Também é essencial conhecer o domínio de pessoas e a ordem de quantificadores: ∀x∃y Ajuda(x,y) permite que cada x tenha seu próprio y; já ∃y∀x Ajuda(x,y) exige alguém que todos ajudem.',
        'Se Ana e A. Silva são dois nomes da mesma pessoa, a identidade Ana = A. Silva permite substituir um nome pelo outro em uma afirmação extensional, como “entregou o documento”. Mas duas pessoas receberem certificados ou possuírem a mesma propriedade não prova que sejam idênticas. A direção da inferência e a informação sobre identidade importam.'
      ]},
      {heading:'Existir não significa existir exatamente um',paragraphs:[
        'Considere “Algum estudante venceu” e “Exatamente um estudante venceu”. A primeira frase é satisfeita se houver pelo menos um vencedor; a segunda exige que haja um vencedor e que nenhuma outra pessoa diferente também seja vencedora. Formalmente, ∃x(V(x) ∧ ∀y(V(y) → y=x)) expressa essa existência única.',
        'A palavra “o” pode esconder essas condições. Em uma análise de descrições definidas associada a Russell, “O vencedor recebeu o prêmio” exige que exista um vencedor, que ele seja único e que tenha recebido o prêmio. Se não houver nenhum vencedor, ou houver dois, a análise conjuntiva clássica torna a frase falsa, em vez de tratar o nome do suposto vencedor como se sempre apontasse para alguém.'
      ]},
      {heading:'Teste com modelos que separam as exigências',paragraphs:[
        'Imagine Ana e Beto como participantes. Se ambos venceram, é verdadeira a frase “Algum participante venceu”, mas é falsa “Exatamente um participante venceu”. Se somente Ana venceu e recebeu o prêmio, as três exigências da descrição definida podem ser satisfeitas. Se somente Ana venceu e não recebeu, existência e unicidade valem, mas a predicação falha.',
        'Para avaliar cada expressão, liste os integrantes do domínio e verifique o conjunto dos que satisfazem o predicado. Em relações entre pessoas, procure a testemunha exigida para cada quantificador. Essa construção explícita de modelos evita que a gramática de uma frase esconda pressupostos não demonstrados.'
      ]}
    ],
    misconception:'Não conclua identidade a partir de uma característica comum; tampouco conclua existência única a partir de um mero “algum”. Em descrições definidas, existência, unicidade e propriedade são exigências diferentes.',
    summary:'Predicados representam relações e propriedades. A ordem dos quantificadores altera a conclusão. Identidade autoriza substituição em contextos extensionais; descrições definidas podem exigir existência e unicidade antes de predicar algo.',
    check:{question:'Duas pessoas venceram uma disputa. Qual afirmação é justificável?',options:['Alguma pessoa venceu, mas não houve exatamente um vencedor.','Houve exatamente um vencedor porque a frase usa “o vencedor”.','Nenhuma pessoa venceu, já que houve empate.'],correct:0,why:'Duas pessoas satisfazem o predicado venceu: a existência é verdadeira, mas a unicidade é falsa. A gramática singular não cria unicidade.'}
  },
  metateoria:{
    objective:'Separar consequência semântica de prova formal e compreender, por casos, correção, completude, incompletude aritmética e limites de algoritmos.',
    sections:[
      {heading:'O que uma demonstração realmente garante?',paragraphs:[
        'Uma prova formal parte de premissas e aplica regras explícitas para chegar a uma conclusão: escrevemos Γ ⊢ φ. Já Γ ⊨ φ diz que toda interpretação em que as premissas são verdadeiras torna a conclusão verdadeira. Uma prova está no lado das regras; uma consequência semântica está no lado dos modelos.',
        'Um cálculo correto, ou sound, preserva a validade: se Γ ⊢ φ, então Γ ⊨ φ. Isso não quer dizer que uma fórmula seja “provável” nem que toda conclusão plausível possa ser demonstrada. A completude semântica do cálculo clássico de primeira ordem diz, no sentido inverso, que consequências semânticas possuem demonstrações nesse cálculo.'
      ]},
      {heading:'Completude e incompletude não se contradizem',paragraphs:[
        'Gödel demonstrou a completude do cálculo clássico de primeira ordem, mas também mostrou que teorias formais consistentes, efetivamente axiomatizáveis e capazes de expressar aritmética suficiente não conseguem provar todas as verdades aritméticas do modelo padrão. Essas afirmações tratam de objetos diferentes: um sistema de inferência e uma teoria aritmética particular.',
        'Isso não significa que “toda lógica é incompleta” ou que o raciocínio rigoroso deixa de valer. A ferramenta prática é perguntar de que propriedade estamos falando e a que sistema ela se aplica. Sem fixar o sistema, a linguagem e as hipóteses, expressões como “completo” e “decidível” são ambíguas.'
      ]},
      {heading:'Um procedimento que procura não é necessariamente um decisor',paragraphs:[
        'Um algoritmo de decisão deve terminar em todas as entradas com resposta correta. Um método de busca por provas pode encontrar uma demonstração quando ela existe, mas continuar procurando indefinidamente quando não há prova. Encontrar evidência positiva e decidir todos os casos são tarefas diferentes.',
        'Turing demonstrou a indecidibilidade do problema geral da parada: não existe algoritmo geral capaz de decidir, para qualquer programa e entrada, se a execução terminará. Isso não impede demonstrar a parada de um programa simples que repete três vezes, nem demonstrar que um laço sem saída não termina. Evite transformar a impossibilidade de um método universal em incapacidade de analisar casos concretos.'
      ]}
    ],
    misconception:'“Provável” não significa “demonstrável”: correção liga ⊢ a ⊨. A completude da lógica de primeira ordem não torna toda teoria aritmética completa, e a indecidibilidade geral da parada não impede resolver casos particulares.',
    summary:'Correção: provas preservam validade. Completude do cálculo: consequências semânticas possuem provas. Incompletude aritmética e indecidibilidade da parada têm hipóteses e alcances distintos. Pergunte sempre qual sistema e qual problema estão em jogo.',
    check:{question:'Um algoritmo identifica que um laço simples com três iterações termina. Isso contradiz a indecidibilidade geral da parada?',options:['Não: a indecidibilidade geral não impede decidir programas particulares.','Sim: Turing provou que não se pode analisar nenhum programa.','Sim: todo procedimento precisa executar para sempre.'],correct:0,why:'O problema da parada não possui decisor uniforme para qualquer par programa/entrada, mas é possível demonstrar término ou não término em situações específicas.'}
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
