/** Unidade VIII, bloco inicial: linguagem, semântica e correção. */
export const THEORY_LESSONS_A={
  "sistemas_formais": {
    "lead": "O que significa estudar as próprias regras de um sistema lógico?",
    "theory": "Ao escrever p→q dentro da lógica proposicional, usamos uma fórmula da linguagem-objeto. Ao dizer em português “p→q é uma fórmula bem formada”, fazemos uma afirmação sobre aquela linguagem. Essa segunda frase pertence à metalinguagem, que permite estudar as expressões e regras do sistema. Misturar os níveis causa equívocos. O símbolo ⊢ pode fazer parte da notação metateórica para “é demonstrável”, enquanto → pertence à linguagem-objeto clássica estudada. Uma expressão sobre derivabilidade não é simplesmente outra condicional dentro da mesma linguagem.\n\nUm sistema formal especifica um alfabeto, regras de formação das expressões e mecanismos para desenvolver provas. Um cálculo dedutivo costuma indicar axiomas ou esquemas e regras que autorizam novas linhas. O caráter formal exige que seja possível verificar a estrutura de cada aplicação de regra. A semântica é uma camada adicional: determina como expressões são interpretadas e quando são satisfeitas. Podemos estudar sintaxe sem escolher semântica, e podemos comparar vários cálculos sobre a mesma linguagem. O significado de “válido” deve sempre informar o sistema e a interpretação pretendidos.\n\nA pergunta “de p e p→q podemos derivar q?” é interna à prática de demonstrar. A pergunta “essa regra preserva verdade em todos os modelos?” é metateórica, pois quantifica sobre interpretações e discute uma propriedade da regra. A metateoria não dispensa exemplos concretos: eles oferecem intuições e contraexemplos. Mas verificar três exemplos favoráveis nunca basta, por si só, para provar uma propriedade sobre todas as fórmulas ou todos os modelos possíveis.",
    "example": "Um estudante escreve p→q e, ao lado, afirma: “a partir de p e p→q podemos obter q pelo modus ponens”.",
    "steps": [
      "p→q é uma fórmula da linguagem-objeto; a frase que identifica sua forma e uso é uma descrição metalinguística.",
      "O cálculo aceita as linhas p e p→q; por modus ponens adiciona q ao fim da derivação.",
      "“Em toda interpretação clássica na qual p e p→q são verdadeiras, q também é?” Essa é uma pergunta sobre correção."
    ],
    "quiz": [
      {
        "question": "Uma fórmula da linguagem-objeto pode ser estudada por:",
        "options": [
          "Regras de formação e interpretação.",
          "Apenas decisões administrativas.",
          "Somente opiniões sobre o autor."
        ],
        "correct": 0,
        "why": "Sintaxe e semântica oferecem perspectivas diferentes."
      },
      {
        "question": "Uma propriedade de todas as demonstrações de um cálculo pertence à:",
        "options": [
          "Metateoria.",
          "Uma única valoração da fórmula p.",
          "Leitura literal de um conectivo isolado."
        ],
        "correct": 0,
        "why": "O enunciado generaliza sobre provas do sistema."
      },
      {
        "question": "Um cálculo formal deve especificar:",
        "options": [
          "Axiomas ou premissas e regras verificáveis de inferência.",
          "Uma lista de exemplos sem regras.",
          "Um conjunto de conclusões aceitas por popularidade."
        ],
        "correct": 0,
        "why": "A derivação precisa ser regida por regras explícitas."
      },
      {
        "question": "Três aplicações corretas de uma regra provam sua correção universal?",
        "options": [
          "Não, é preciso demonstrar preservação em todos os casos relevantes.",
          "Sim, três exemplos sempre bastam.",
          "Sim, desde que incluam p."
        ],
        "correct": 0,
        "why": "Generalização universal exige prova adequada, não amostras arbitrárias."
      }
    ]
  },
  "sintaxe_formal": {
    "lead": "Quando uma sequência de símbolos conta como fórmula de uma linguagem?",
    "theory": "Uma linguagem proposicional pode empregar letras p, q, parênteses e conectivos ¬, ∧ e →. Mas uma sequência como p∧→q não vira fórmula apenas porque todos os seus símbolos pertencem ao alfabeto. Regras de formação precisam indicar como expressões menores originam expressões maiores. Por exemplo: toda letra proposicional é fórmula; se A é fórmula, ¬A também é; se A e B são fórmulas, (A∧B) e (A→B) também são. Essas cláusulas geram expressões sintaticamente válidas sem recorrer a valores de verdade.\n\nEm ¬(p∧q), a negação tem como argumento a conjunção inteira. Já em (¬p∧q), a negação atua somente sobre p. Parênteses e precedência determinam a estrutura e impedem que uma cadeia de símbolos receba leituras incompatíveis. Uma árvore de formação registra como a fórmula é composta: no topo há o conectivo principal e abaixo suas subfórmulas. Verificar uma fórmula em etapas recursivas torna o procedimento mais confiável do que apenas reconhecer visualmente padrões familiares.\n\nAs duas fórmulas p∧q e q∧p possuem estruturas diferentes, mesmo que sejam semanticamente equivalentes na lógica clássica. Uma expressão bem formada pode ser falsa numa interpretação; a questão de formação é anterior à pergunta por verdade. Na lógica de predicados, regras adicionais distinguem termos, predicados, variáveis, constantes e quantificadores. O escopo de ∀x também precisa ser especificado: trocar a posição dos parênteses pode alterar o significado de toda a sentença.",
    "example": "Compare ¬(p∧q) com (¬p∧q) em uma árvore de construção.",
    "steps": [
      "Na primeira, o topo é ¬ e sua subfórmula é (p∧q). Na segunda, o topo é ∧, com filhos ¬p e q.",
      "Para ¬(p∧q): ¬ → ∧ → p,q. Para (¬p∧q): ∧ → ¬p,q.",
      "¬(p∧q) recebe V; (¬p∧q) recebe F. Ambas são fórmulas bem formadas."
    ],
    "quiz": [
      {
        "question": "Ser formado por símbolos permitidos garante fórmula válida?",
        "options": [
          "Não, as regras de formação também devem ser seguidas.",
          "Sim, qualquer concatenação serve.",
          "Sim, se houver ao menos uma letra."
        ],
        "correct": 0,
        "why": "Alfabeto e gramática desempenham papéis distintos."
      },
      {
        "question": "A estrutura de ¬(p∧q) tem como conectivo principal:",
        "options": [
          "¬.",
          "∧.",
          "q."
        ],
        "correct": 0,
        "why": "Os parênteses colocam a conjunção sob o alcance da negação."
      },
      {
        "question": "p∧q e q∧p são:",
        "options": [
          "Fórmulas sintaticamente diferentes, ainda que classicamente equivalentes.",
          "A mesma sequência de caracteres.",
          "Necessariamente malformadas."
        ],
        "correct": 0,
        "why": "Identidade textual não é o mesmo que equivalência."
      },
      {
        "question": "Em ∀x(P(x)→Q(x)), o escopo do quantificador inclui:",
        "options": [
          "A condicional entre os predicados de x.",
          "Somente a primeira letra P.",
          "Todas as fórmulas de qualquer texto."
        ],
        "correct": 0,
        "why": "Parênteses delimitam o alcance sintático de ∀x."
      }
    ]
  },
  "semantica_modelos": {
    "lead": "Por que uma frase formal pode ser verdadeira em um modelo e falsa em outro?",
    "theory": "Na lógica proposicional clássica, uma interpretação v atribui V ou F a cada letra. Os conectivos calculam a verdade das fórmulas compostas. Assim, p→q pode ser verdadeira numa valoração e falsa em outra, sem que a fórmula mude de escrita. Na primeira ordem, a interpretação inclui um domínio não vazio e interpretações para constantes, funções e predicados. A mesma sentença ∀xP(x) será verdadeira em estruturas nas quais todos os elementos pertencem a P e falsa onde há ao menos um contraexemplo.\n\nUma estrutura M é modelo de uma fórmula φ quando M a satisfaz segundo a semântica adotada, indicada por M⊨φ. Isso não estabelece por si que a estrutura descreva corretamente a realidade. Um modelo pode ser puramente matemático, hipotético ou contrafactual. Para mostrar que uma sentença é satisfatível, basta oferecer um modelo. Para mostrar que é inválida, basta apresentar um contraexemplo, isto é, uma interpretação em que não vale. Para demonstrar validade, contudo, é necessário abranger todas as interpretações do tipo admitido.\n\nA sentença p∧¬p é insatisfatível na lógica clássica: não existe valoração que a torne V. A sentença p∨¬p é válida nessa semântica: todas as valorações a tornam V. A sentença p∧q é satisfatível, mas não válida, porque alguns modelos a satisfazem e outros não. Essas categorias dependem da lógica selecionada. Na unidade anterior, sistemas difusos, paraconsistentes e intuicionistas utilizaram interpretações diferentes. A metateoria exige sempre explicitar a semântica antes de classificar fórmulas.",
    "example": "Compare p∨¬p, p∧¬p e p∧q sob todas as valorações clássicas de p e q.",
    "steps": [
      "A negação troca V e F; ∧ exige dois valores V e ∨ exige ao menos um V.",
      "p∧q tem modelo com p=q=V e contraexemplo com p=V,q=F. Já p∧¬p nunca é verdadeira.",
      "p∨¬p é válida, p∧¬p é insatisfatível e p∧q é contingente."
    ],
    "quiz": [
      {
        "question": "M⊨φ significa:",
        "options": [
          "A estrutura M satisfaz φ sob a semântica escolhida.",
          "φ é demonstrada por qualquer cálculo.",
          "φ está escrita em português."
        ],
        "correct": 0,
        "why": "Satisfação relaciona estrutura e fórmula."
      },
      {
        "question": "Uma fórmula satisfatível possui:",
        "options": [
          "Ao menos uma interpretação que a torna verdadeira.",
          "Necessariamente todas as interpretações favoráveis.",
          "Nenhuma interpretação permitida."
        ],
        "correct": 0,
        "why": "O quantificador existencial basta."
      },
      {
        "question": "Para refutar validade, procure:",
        "options": [
          "Uma interpretação contrária.",
          "Apenas um modelo favorável.",
          "Três apresentações da mesma prova."
        ],
        "correct": 0,
        "why": "Um único contraexemplo é suficiente."
      },
      {
        "question": "Na semântica proposicional clássica, p∧¬p é:",
        "options": [
          "Insatisfatível.",
          "Válida.",
          "Contingente."
        ],
        "correct": 0,
        "why": "Uma letra e sua negação não recebem V simultaneamente."
      }
    ]
  },
  "consequencia_prova": {
    "lead": "Qual a diferença entre decorrer de premissas e ser demonstrável por um cálculo?",
    "theory": "Escrevemos Γ⊨φ quando toda interpretação que satisfaz todas as premissas de Γ também satisfaz φ. Essa definição não depende da habilidade de um estudante em encontrar uma prova; ela diz respeito às interpretações permitidas pela lógica. Para invalidar Γ⊨φ basta construir um modelo em que todas as premissas valem e a conclusão não. Se as premissas não possuem modelo clássico, toda conclusão é consequência semântica por vacuidade, o que exige cuidado quando discutimos fatos reais.\n\nEscrevemos Γ⊢φ quando existe uma derivação finita de φ a partir de Γ no cálculo escolhido. A expressão informa que alguma sequência de linhas usa apenas premissas, axiomas e regras autorizadas. Uma conclusão pode ser derivável num cálculo e não em outro. Da premissa p e da condicional p→q, um cálculo com modus ponens pode derivar q. Para saber se esse passo também é semanticamente correto, precisamos analisar a verdade da condicional nas interpretações do sistema.\n\nUma demonstração sintática correta não é automaticamente prova de preservação semântica em qualquer cálculo imaginável. A correção de um sistema, quando demonstrada, garante a passagem Γ⊢φ ⇒ Γ⊨φ. A completude, quando demonstrada, oferece a direção inversa. Essas propriedades dizem respeito ao cálculo e à semântica fixados. Na unidade seguinte da sequência, investigaremos separadamente como se provam correção e completude, sem assumir que toda lógica usa os mesmos axiomas.",
    "example": "Examine as premissas p e p→q e a conclusão q, distinguindo prova e interpretação.",
    "steps": [
      "1. p (premissa). 2. p→q (premissa). 3. q (modus ponens).",
      "Se p=V e p→q=V, então q não pode ser F, pois V→F tornaria a premissa condicional falsa.",
      "As duas verificações apoiam {p,p→q}⊢q e {p,p→q}⊨q, mas são justificados por procedimentos diferentes."
    ],
    "quiz": [
      {
        "question": "Γ⊨φ afirma:",
        "options": [
          "Todos os modelos de Γ satisfazem φ.",
          "Existe uma linha de prova escrita pelo aluno.",
          "φ é um operador temporal."
        ],
        "correct": 0,
        "why": "É uma condição sobre estruturas."
      },
      {
        "question": "Γ⊢φ afirma:",
        "options": [
          "Há derivação finita segundo as regras do cálculo.",
          "A conclusão é popular.",
          "Há necessariamente um modelo factual."
        ],
        "correct": 0,
        "why": "A relação de derivação é sintática."
      },
      {
        "question": "Um contraexemplo de consequência semântica possui:",
        "options": [
          "Premissas verdadeiras e conclusão falsa.",
          "Premissas e conclusão sempre falsas.",
          "Conclusão verdadeira e premissa falsa."
        ],
        "correct": 0,
        "why": "É o padrão que viola a preservação."
      },
      {
        "question": "A direção ⊢ ⇒ ⊨ é chamada:",
        "options": [
          "Correção quando vale para todas as derivações.",
          "Completude por definição.",
          "Validade temporal."
        ],
        "correct": 0,
        "why": "A correção conecta provas formais à preservação semântica."
      }
    ]
  },
  "correcao_sistemas": {
    "lead": "Como verificar se um cálculo nunca demonstra uma conclusão semanticamente indevida?",
    "theory": "Um sistema dedutivo é correto relativamente a uma semântica quando tudo que ele demonstra a partir de premissas é consequência semântica dessas premissas. Não significa que todas as premissas usadas sejam fatos do mundo; significa apenas que as regras não criam contraexemplos à preservação da verdade. Um cálculo pode ser correto e ainda muito fraco: imagine um sistema que permite apenas repetir uma premissa. Ele nunca conclui algo semanticamente injustificado, mas perde inúmeras consequências que poderiam ser demonstradas por regras mais expressivas.\n\nPara verificar o modus ponens na lógica clássica, suponha p e p→q verdadeiras numa mesma interpretação. Se q fosse falsa, a condicional teria antecedente verdadeiro e consequente falso, contrariando a segunda premissa. Portanto q também precisa ser verdadeira. A mesma estratégia pode testar regras adicionais. Se houver uma regra que autorize q apenas porque p foi afirmada, uma interpretação p=V e q=F fornece contraexemplo direto à correção dessa regra. A inspeção local de regras é o passo central.\n\nSe axiomas forem válidos e cada regra preservar verdade, uma indução sobre o número de linhas da prova estabelece correção global. Na primeira linha, premissas são satisfeitas pelos modelos de Γ e axiomas são válidos. Em cada nova linha, a regra correta mantém satisfação. Isso não demonstra completude. Um cálculo pode produzir apenas consequências corretas, mas deixar de provar muitas outras. Também não prova que algum algoritmo decida toda validade; o procedimento de procurar provas pode nunca terminar para conclusões não demonstráveis.",
    "example": "Avalie a regra modus ponens e compare com a regra inválida “de p inferir q”.",
    "steps": [
      "Com p=V e p→q=V, o valor q deve ser V na implicação material.",
      "Na valoração p=V, q=F, a premissa p é verdadeira e a conclusão q é falsa.",
      "Num cálculo inteiro, repetimos o argumento para cada regra e aplicamos indução sobre as linhas."
    ],
    "quiz": [
      {
        "question": "Correção significa:",
        "options": [
          "Tudo que é derivável é consequência semântica.",
          "Tudo que é verdadeiro é sempre demonstrável.",
          "Todo problema é decidível."
        ],
        "correct": 0,
        "why": "É a direção sintaxe → semântica."
      },
      {
        "question": "Um contraexemplo a uma regra possui:",
        "options": [
          "Entradas verdadeiras e saída falsa.",
          "Todas as entradas falsas.",
          "Somente premissas sem modelo."
        ],
        "correct": 0,
        "why": "A regra falha em preservar verdade."
      },
      {
        "question": "Um cálculo que só repete premissas pode ser:",
        "options": [
          "Correto, embora incompleto.",
          "Necessariamente incorreto.",
          "Automaticamente completo."
        ],
        "correct": 0,
        "why": "Não inventar conclusões não implica provar todas as consequências."
      },
      {
        "question": "O instrumento de prova da correção global é frequentemente:",
        "options": [
          "Indução sobre linhas da derivação.",
          "Escolha de uma amostra de mundos.",
          "Uma previsão sobre o futuro."
        ],
        "correct": 0,
        "why": "A indução trata cada possível passo do cálculo."
      }
    ]
  }
};
export const THEORY_READINGS_A={
  "sistemas_formais": {
    "objective": "Distinguir linguagem-objeto, metalinguagem, símbolos, regras, axiomas e cálculos, identificando em que nível uma afirmação está sendo formulada.",
    "sections": [
      {
        "heading": "Dois níveis de discurso",
        "paragraphs": [
          "Ao escrever p→q dentro da lógica proposicional, usamos uma fórmula da linguagem-objeto. Ao dizer em português “p→q é uma fórmula bem formada”, fazemos uma afirmação sobre aquela linguagem. Essa segunda frase pertence à metalinguagem, que permite estudar as expressões e regras do sistema.",
          "Misturar os níveis causa equívocos. O símbolo ⊢ pode fazer parte da notação metateórica para “é demonstrável”, enquanto → pertence à linguagem-objeto clássica estudada. Uma expressão sobre derivabilidade não é simplesmente outra condicional dentro da mesma linguagem."
        ]
      },
      {
        "heading": "O que constitui um sistema formal",
        "paragraphs": [
          "Um sistema formal especifica um alfabeto, regras de formação das expressões e mecanismos para desenvolver provas. Um cálculo dedutivo costuma indicar axiomas ou esquemas e regras que autorizam novas linhas. O caráter formal exige que seja possível verificar a estrutura de cada aplicação de regra.",
          "A semântica é uma camada adicional: determina como expressões são interpretadas e quando são satisfeitas. Podemos estudar sintaxe sem escolher semântica, e podemos comparar vários cálculos sobre a mesma linguagem. O significado de “válido” deve sempre informar o sistema e a interpretação pretendidos."
        ]
      },
      {
        "heading": "Resultados sobre resultados",
        "paragraphs": [
          "A pergunta “de p e p→q podemos derivar q?” é interna à prática de demonstrar. A pergunta “essa regra preserva verdade em todos os modelos?” é metateórica, pois quantifica sobre interpretações e discute uma propriedade da regra.",
          "A metateoria não dispensa exemplos concretos: eles oferecem intuições e contraexemplos. Mas verificar três exemplos favoráveis nunca basta, por si só, para provar uma propriedade sobre todas as fórmulas ou todos os modelos possíveis."
        ]
      }
    ],
    "misconception": "Metalinguagem não é uma linguagem secreta ou superior em valor; é apenas o nível em que formulamos enunciados sobre os símbolos, as provas e as interpretações de outra linguagem.",
    "summary": "A linguagem-objeto expressa as fórmulas estudadas; a metalinguagem descreve sua formação, derivação e semântica. Um sistema formal exige regras precisas, enquanto afirmações universais sobre o sistema exigem justificação metateórica.",
    "check": {
      "question": "Qual frase está na metalinguagem?",
      "options": [
        "“p→q é uma fórmula bem formada”.",
        "p→q",
        "p∧¬q"
      ],
      "correct": 0,
      "why": "A primeira descreve uma expressão da linguagem-objeto, em vez de funcionar como essa expressão."
    }
  },
  "sintaxe_formal": {
    "objective": "Distinguir símbolos, termos e fórmulas bem formadas por regras recursivas, além de identificar ambiguidade, escopo e estrutura de derivação sintática.",
    "sections": [
      {
        "heading": "Um alfabeto não determina sozinho uma fórmula",
        "paragraphs": [
          "Uma linguagem proposicional pode empregar letras p, q, parênteses e conectivos ¬, ∧ e →. Mas uma sequência como p∧→q não vira fórmula apenas porque todos os seus símbolos pertencem ao alfabeto. Regras de formação precisam indicar como expressões menores originam expressões maiores.",
          "Por exemplo: toda letra proposicional é fórmula; se A é fórmula, ¬A também é; se A e B são fórmulas, (A∧B) e (A→B) também são. Essas cláusulas geram expressões sintaticamente válidas sem recorrer a valores de verdade."
        ]
      },
      {
        "heading": "Árvores e escopo",
        "paragraphs": [
          "Em ¬(p∧q), a negação tem como argumento a conjunção inteira. Já em (¬p∧q), a negação atua somente sobre p. Parênteses e precedência determinam a estrutura e impedem que uma cadeia de símbolos receba leituras incompatíveis.",
          "Uma árvore de formação registra como a fórmula é composta: no topo há o conectivo principal e abaixo suas subfórmulas. Verificar uma fórmula em etapas recursivas torna o procedimento mais confiável do que apenas reconhecer visualmente padrões familiares."
        ]
      },
      {
        "heading": "Sintaxe não é semântica",
        "paragraphs": [
          "As duas fórmulas p∧q e q∧p possuem estruturas diferentes, mesmo que sejam semanticamente equivalentes na lógica clássica. Uma expressão bem formada pode ser falsa numa interpretação; a questão de formação é anterior à pergunta por verdade.",
          "Na lógica de predicados, regras adicionais distinguem termos, predicados, variáveis, constantes e quantificadores. O escopo de ∀x também precisa ser especificado: trocar a posição dos parênteses pode alterar o significado de toda a sentença."
        ]
      }
    ],
    "misconception": "Uma expressão bem formada não é necessariamente verdadeira, e duas fórmulas equivalentes não são a mesma cadeia sintática de símbolos.",
    "summary": "Regras recursivas constroem fórmulas a partir de símbolos permitidos. Estrutura, conectivo principal e escopo são sintáticos; satisfação e equivalência são avaliações semânticas posteriores.",
    "check": {
      "question": "Qual expressão é bem formada pelas regras usuais?",
      "options": [
        "¬(p∧q).",
        "p∧→q.",
        "¬)p(q"
      ],
      "correct": 0,
      "why": "A negação aplica-se a uma conjunção válida; as outras sequências não seguem regras de formação."
    }
  },
  "semantica_modelos": {
    "objective": "Aplicar interpretações e satisfação para diferenciar verdade relativa a modelo, satisfatibilidade, contradição e validade semântica.",
    "sections": [
      {
        "heading": "Interpretação atribui conteúdo matemático",
        "paragraphs": [
          "Na lógica proposicional clássica, uma interpretação v atribui V ou F a cada letra. Os conectivos calculam a verdade das fórmulas compostas. Assim, p→q pode ser verdadeira numa valoração e falsa em outra, sem que a fórmula mude de escrita.",
          "Na primeira ordem, a interpretação inclui um domínio não vazio e interpretações para constantes, funções e predicados. A mesma sentença ∀xP(x) será verdadeira em estruturas nas quais todos os elementos pertencem a P e falsa onde há ao menos um contraexemplo."
        ]
      },
      {
        "heading": "Modelo não é sinônimo de mundo real",
        "paragraphs": [
          "Uma estrutura M é modelo de uma fórmula φ quando M a satisfaz segundo a semântica adotada, indicada por M⊨φ. Isso não estabelece por si que a estrutura descreva corretamente a realidade. Um modelo pode ser puramente matemático, hipotético ou contrafactual.",
          "Para mostrar que uma sentença é satisfatível, basta oferecer um modelo. Para mostrar que é inválida, basta apresentar um contraexemplo, isto é, uma interpretação em que não vale. Para demonstrar validade, contudo, é necessário abranger todas as interpretações do tipo admitido."
        ]
      },
      {
        "heading": "Três perguntas distintas",
        "paragraphs": [
          "A sentença p∧¬p é insatisfatível na lógica clássica: não existe valoração que a torne V. A sentença p∨¬p é válida nessa semântica: todas as valorações a tornam V. A sentença p∧q é satisfatível, mas não válida, porque alguns modelos a satisfazem e outros não.",
          "Essas categorias dependem da lógica selecionada. Na unidade anterior, sistemas difusos, paraconsistentes e intuicionistas utilizaram interpretações diferentes. A metateoria exige sempre explicitar a semântica antes de classificar fórmulas."
        ]
      }
    ],
    "misconception": "Um modelo de uma fórmula não é uma prova de sua validade universal. Um único modelo sustenta satisfatibilidade; a validade exige que nenhuma interpretação permitida constitua contraexemplo.",
    "summary": "Uma interpretação determina como avaliar fórmulas. Satisfatibilidade pede ao menos um modelo, enquanto validade exige todos; verdade numa estrutura é sempre relativa à semântica declarada.",
    "check": {
      "question": "Encontramos uma valoração que satisfaz p∧q. Isso demonstra:",
      "options": [
        "Que p∧q é satisfatível, mas não necessariamente válida.",
        "Que p∧q é tautologia.",
        "Que toda valoração torna p∧q verdadeira."
      ],
      "correct": 0,
      "why": "A existência de um modelo basta para satisfatibilidade, mas não prova universalidade."
    }
  },
  "consequencia_prova": {
    "objective": "Distinguir Γ⊨φ de Γ⊢φ, reconhecer contraexemplos semânticos e derivação sintática, e compreender por que a relação entre ambos exige teoremas específicos.",
    "sections": [
      {
        "heading": "A consequência semântica examina modelos",
        "paragraphs": [
          "Escrevemos Γ⊨φ quando toda interpretação que satisfaz todas as premissas de Γ também satisfaz φ. Essa definição não depende da habilidade de um estudante em encontrar uma prova; ela diz respeito às interpretações permitidas pela lógica.",
          "Para invalidar Γ⊨φ basta construir um modelo em que todas as premissas valem e a conclusão não. Se as premissas não possuem modelo clássico, toda conclusão é consequência semântica por vacuidade, o que exige cuidado quando discutimos fatos reais."
        ]
      },
      {
        "heading": "A derivação pertence a regras explícitas",
        "paragraphs": [
          "Escrevemos Γ⊢φ quando existe uma derivação finita de φ a partir de Γ no cálculo escolhido. A expressão informa que alguma sequência de linhas usa apenas premissas, axiomas e regras autorizadas. Uma conclusão pode ser derivável num cálculo e não em outro.",
          "Da premissa p e da condicional p→q, um cálculo com modus ponens pode derivar q. Para saber se esse passo também é semanticamente correto, precisamos analisar a verdade da condicional nas interpretações do sistema."
        ]
      },
      {
        "heading": "As duas relações não devem ser confundidas",
        "paragraphs": [
          "Uma demonstração sintática correta não é automaticamente prova de preservação semântica em qualquer cálculo imaginável. A correção de um sistema, quando demonstrada, garante a passagem Γ⊢φ ⇒ Γ⊨φ. A completude, quando demonstrada, oferece a direção inversa.",
          "Essas propriedades dizem respeito ao cálculo e à semântica fixados. Na unidade seguinte da sequência, investigaremos separadamente como se provam correção e completude, sem assumir que toda lógica usa os mesmos axiomas."
        ]
      }
    ],
    "misconception": "⊢ e ⊨ não são símbolos intercambiáveis. Demonstrabilidade exige regras de um cálculo; consequência semântica quantifica sobre modelos e não fornece uma prova por si só.",
    "summary": "Γ⊨φ diz que não há contraexemplo semântico; Γ⊢φ diz que existe derivação formal. Correção e completude relacionam esses conceitos sob hipóteses sobre o cálculo e sua semântica.",
    "check": {
      "question": "Para refutar {p→q,p}⊨q, seria preciso encontrar:",
      "options": [
        "Premissas V e conclusão F numa mesma interpretação.",
        "Uma interpretação onde p é F.",
        "Uma demonstração formal de q."
      ],
      "correct": 0,
      "why": "Consequência semântica falha somente quando há um modelo das premissas que refuta a conclusão."
    }
  },
  "correcao_sistemas": {
    "objective": "Interpretar correção como Γ⊢φ ⇒ Γ⊨φ e justificar preservação de verdade por axiomas, regras e indução sobre uma derivação finita.",
    "sections": [
      {
        "heading": "Correção é uma propriedade do cálculo",
        "paragraphs": [
          "Um sistema dedutivo é correto relativamente a uma semântica quando tudo que ele demonstra a partir de premissas é consequência semântica dessas premissas. Não significa que todas as premissas usadas sejam fatos do mundo; significa apenas que as regras não criam contraexemplos à preservação da verdade.",
          "Um cálculo pode ser correto e ainda muito fraco: imagine um sistema que permite apenas repetir uma premissa. Ele nunca conclui algo semanticamente injustificado, mas perde inúmeras consequências que poderiam ser demonstradas por regras mais expressivas."
        ]
      },
      {
        "heading": "Examine cada regra localmente",
        "paragraphs": [
          "Para verificar o modus ponens na lógica clássica, suponha p e p→q verdadeiras numa mesma interpretação. Se q fosse falsa, a condicional teria antecedente verdadeiro e consequente falso, contrariando a segunda premissa. Portanto q também precisa ser verdadeira.",
          "A mesma estratégia pode testar regras adicionais. Se houver uma regra que autorize q apenas porque p foi afirmada, uma interpretação p=V e q=F fornece contraexemplo direto à correção dessa regra. A inspeção local de regras é o passo central."
        ]
      },
      {
        "heading": "Da regra para uma demonstração inteira",
        "paragraphs": [
          "Se axiomas forem válidos e cada regra preservar verdade, uma indução sobre o número de linhas da prova estabelece correção global. Na primeira linha, premissas são satisfeitas pelos modelos de Γ e axiomas são válidos. Em cada nova linha, a regra correta mantém satisfação.",
          "Isso não demonstra completude. Um cálculo pode produzir apenas consequências corretas, mas deixar de provar muitas outras. Também não prova que algum algoritmo decida toda validade; o procedimento de procurar provas pode nunca terminar para conclusões não demonstráveis."
        ]
      }
    ],
    "misconception": "Correção não diz que uma prova existe para toda verdade lógica nem que suas premissas correspondem a fatos. Diz que demonstrações autorizadas não perdem a validade da consequência.",
    "summary": "Correção relaciona derivação e semântica: Γ⊢φ implica Γ⊨φ. Para demonstrá-la, justificam-se axiomas e regras e usa-se indução sobre as etapas de toda prova.",
    "check": {
      "question": "Uma regra autoriza q a partir de p. Com p=V e q=F, o que identificamos?",
      "options": [
        "Um contraexemplo à correção dessa regra.",
        "Uma prova da completude.",
        "Um caso em que q deve valer."
      ],
      "correct": 0,
      "why": "O modelo satisfaz a entrada da regra e refuta sua saída, violando a preservação de verdade."
    }
  }
};
export const THEORY_WORKED_A={
  "sistemas_formais": {
    "context": "Um estudante escreve p→q e, ao lado, afirma: “a partir de p e p→q podemos obter q pelo modus ponens”.",
    "steps": [
      {
        "formal": "Separe o símbolo da descrição.",
        "concrete": "p→q é uma fórmula da linguagem-objeto; a frase que identifica sua forma e uso é uma descrição metalinguística.",
        "reason": "Mencionar uma fórmula e utilizá-la como premissa são ações de níveis diferentes."
      },
      {
        "formal": "Reconstrua a aplicação da regra.",
        "concrete": "O cálculo aceita as linhas p e p→q; por modus ponens adiciona q ao fim da derivação.",
        "reason": "Uma regra informa como transformar sequências de fórmulas, sem precisar narrar fatos do mundo."
      },
      {
        "formal": "Formule a pergunta metateórica.",
        "concrete": "“Em toda interpretação clássica na qual p e p→q são verdadeiras, q também é?” Essa é uma pergunta sobre correção.",
        "reason": "Passamos de uma derivação particular à propriedade de preservação de verdade da regra."
      }
    ],
    "check": {
      "question": "Qual notação fala da relação entre premissas e derivação?",
      "options": [
        "{p,p→q} ⊢ q.",
        "p→q é uma frase sobre o clima.",
        "A própria letra p já é uma prova."
      ],
      "correct": 0,
      "why": "O símbolo ⊢ expressa metateoricamente a existência de derivação no cálculo indicado."
    }
  },
  "sintaxe_formal": {
    "context": "Compare ¬(p∧q) com (¬p∧q) em uma árvore de construção.",
    "steps": [
      {
        "formal": "Identifique os conectivos principais.",
        "concrete": "Na primeira, o topo é ¬ e sua subfórmula é (p∧q). Na segunda, o topo é ∧, com filhos ¬p e q.",
        "reason": "O conectivo principal é dado pelas regras de formação, não por uma palavra intuitiva."
      },
      {
        "formal": "Desenhe a decomposição.",
        "concrete": "Para ¬(p∧q): ¬ → ∧ → p,q. Para (¬p∧q): ∧ → ¬p,q.",
        "reason": "As árvores deixam visível a diferença de escopo da negação."
      },
      {
        "formal": "Mostre a consequência da estrutura com p=F, q=F.",
        "concrete": "¬(p∧q) recebe V; (¬p∧q) recebe F. Ambas são fórmulas bem formadas.",
        "reason": "Uma distinção sintática pode produzir diferença semântica numa interpretação específica."
      }
    ],
    "check": {
      "question": "Em (¬p∧q), qual é o conectivo principal?",
      "options": [
        "∧.",
        "¬.",
        "p."
      ],
      "correct": 0,
      "why": "A conjunção liga as subfórmulas ¬p e q; a negação não se aplica ao conjunto inteiro."
    }
  },
  "semantica_modelos": {
    "context": "Compare p∨¬p, p∧¬p e p∧q sob todas as valorações clássicas de p e q.",
    "steps": [
      {
        "formal": "Fixe a semântica clássica V/F.",
        "concrete": "A negação troca V e F; ∧ exige dois valores V e ∨ exige ao menos um V.",
        "reason": "A classificação depende de operações que precisam estar especificadas."
      },
      {
        "formal": "Procure modelos e contraexemplos.",
        "concrete": "p∧q tem modelo com p=q=V e contraexemplo com p=V,q=F. Já p∧¬p nunca é verdadeira.",
        "reason": "Esses casos separam satisfatibilidade da validade."
      },
      {
        "formal": "Classifique as fórmulas.",
        "concrete": "p∨¬p é válida, p∧¬p é insatisfatível e p∧q é contingente.",
        "reason": "As três categorias possuem critérios distintos de quantificação sobre interpretações."
      }
    ],
    "check": {
      "question": "Se uma fórmula possui modelo e contraexemplo, ela é:",
      "options": [
        "Satisfatível e não válida.",
        "Necessariamente válida.",
        "Insatisfatível."
      ],
      "correct": 0,
      "why": "O modelo garante existência de satisfação; o contraexemplo impede a validade."
    }
  },
  "consequencia_prova": {
    "context": "Examine as premissas p e p→q e a conclusão q, distinguindo prova e interpretação.",
    "steps": [
      {
        "formal": "Mostre o caminho sintático.",
        "concrete": "1. p (premissa). 2. p→q (premissa). 3. q (modus ponens).",
        "reason": "A sequência oferece derivação segundo um cálculo que aceita a regra."
      },
      {
        "formal": "Verifique semanticamente.",
        "concrete": "Se p=V e p→q=V, então q não pode ser F, pois V→F tornaria a premissa condicional falsa.",
        "reason": "A mesma inferência preserva verdade em toda valoração clássica."
      },
      {
        "formal": "Compare os enunciados metateóricos.",
        "concrete": "As duas verificações apoiam {p,p→q}⊢q e {p,p→q}⊨q, mas são justificados por procedimentos diferentes.",
        "reason": "Não devemos usar a mesma palavra sem distinguir prova formal e validade semântica."
      }
    ],
    "check": {
      "question": "Qual símbolo registra a existência de uma derivação?",
      "options": [
        "⊢.",
        "⊨.",
        "◇."
      ],
      "correct": 0,
      "why": "⊢ fala de regras e linhas de prova; ⊨ fala da preservação em modelos."
    }
  },
  "correcao_sistemas": {
    "context": "Avalie a regra modus ponens e compare com a regra inválida “de p inferir q”.",
    "steps": [
      {
        "formal": "Assuma premissas verdadeiras no mesmo modelo.",
        "concrete": "Com p=V e p→q=V, o valor q deve ser V na implicação material.",
        "reason": "Isso demonstra a preservação local da verdade pelo modus ponens."
      },
      {
        "formal": "Construa contraexemplo para a regra rival.",
        "concrete": "Na valoração p=V, q=F, a premissa p é verdadeira e a conclusão q é falsa.",
        "reason": "Uma única interpretação desse tipo refuta a correção da regra semântica."
      },
      {
        "formal": "Explique a extensão global.",
        "concrete": "Num cálculo inteiro, repetimos o argumento para cada regra e aplicamos indução sobre as linhas.",
        "reason": "Corretude local de axiomas e regras sustenta correção de todas as provas do cálculo."
      }
    ],
    "check": {
      "question": "Qual resultado sustenta a correção global de um cálculo?",
      "options": [
        "Axiomas válidos e cada regra preservando verdade, com indução nas linhas.",
        "Três demonstrações escolhidas ao acaso.",
        "Uma regra que permita qualquer conclusão."
      ],
      "correct": 0,
      "why": "O esquema metateórico precisa abranger toda linha de toda prova finita."
    }
  }
};
