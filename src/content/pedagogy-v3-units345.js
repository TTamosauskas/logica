import {buildBridgeLessons} from './pedagogy-v3-builder.js';
export const PEDAGOGY_BRIDGES_III_V=buildBridgeLessons([
  [
    "silogismos",
    [
      "Enumere premissas e conclusão em linhas separadas.",
      "Reconheça o padrão condicional ou disjuntivo aplicado.",
      "Explique por que uma linha com premissas V não pode negar a conclusão."
    ],
    [
      [
        "Qual inferência encadeia p→q e q→r para concluir p→r?",
        "Silogismo hipotético.",
        "Afirmação do consequente.",
        "Negação do antecedente.",
        "Veja a conexão entre o resultado da primeira regra e a condição da segunda.",
        "O elo q permite passar da condição inicial p à consequência final r.",
        "A afirmação do consequente tentaria voltar de q para p.",
        "Negar o antecedente não sustenta essa cadeia condicional."
      ],
      [
        "De p→q e q→r, suponha p verdadeira. Qual caminho justifica que r também será verdadeira?",
        "Primeiro obtemos q de p; depois obtemos r de q.",
        "Passamos diretamente de r para p sem outras premissas.",
        "Negamos q para garantir que r seja falsa.",
        "A segunda seção percorre o encadeamento assumindo p como verdadeira.",
        "Aplicar a primeira condicional produz q; aplicar a segunda a q produz r, justificando a ligação entre p e r.",
        "A direção dada pelas premissas é p→q→r; ela não autoriza automaticamente r→p.",
        "As premissas exigem q e r quando p vale; não autorizam negar os consequentes."
      ],
      [
        "O arquivo está na pasta A ou na pasta B. Sabemos que não está na pasta A. Qual conclusão segue?",
        "O arquivo está na pasta B, pelo silogismo disjuntivo.",
        "O arquivo não está em nenhuma das duas pastas.",
        "O arquivo está necessariamente na pasta A.",
        "A terceira seção ensina que de p∨q e ¬p podemos concluir q.",
        "Como a primeira alternativa do OU foi descartada, a segunda precisa valer para manter a premissa disjuntiva verdadeira.",
        "Com ambas as alternativas falsas, a disjunção inicial também seria falsa.",
        "Essa opção contradiz a informação dada de que o arquivo não está na pasta A."
      ]
    ]
  ],
  [
    "regras_inferencia",
    [
      "Identifique a regra e as premissas necessárias.",
      "Aplique modus ponens ou modus tollens sem inverter a condicional.",
      "Confira se cada passo preserva a verdade das premissas."
    ],
    [
      [
        "De p→q e p, qual linha pode ser acrescentada?",
        "q.",
        "¬q.",
        "¬p.",
        "Leia a condicional como garantia de q quando p acontece.",
        "A condição p está satisfeita; por modus ponens, q deve ser verdadeira.",
        "Negar q tornaria falsa a condicional com p verdadeira.",
        "A premissa já afirma p; dela não segue sua negação."
      ],
      [
        "De p→q e ¬q, qual regra autoriza ¬p?",
        "Modus tollens.",
        "Modus ponens.",
        "Afirmação do consequente.",
        "A negação do resultado elimina a condição que o garantiria.",
        "Modus tollens usa a condicional e a negação do consequente para negar o antecedente.",
        "Modus ponens precisaria de p, não de ¬q.",
        "Afirmar o consequente tenta obter p a partir de q, estrutura diferente."
      ],
      [
        "'Se o envio foi aprovado, há número de rastreio. Não há número.' Que inferência é válida?",
        "O envio não foi aprovado.",
        "O envio foi aprovado.",
        "O número existe, mesmo ausente.",
        "Aplique a regra à ausência da consequência prometida.",
        "Sem número de rastreio, a condição de aprovação não pode ter ocorrido se a regra é verdadeira.",
        "Aprovação com rastreio ausente violaria a condicional assumida.",
        "A hipótese contradiz diretamente a informação de que o número está ausente."
      ]
    ]
  ],
  [
    "infer_conectivos",
    [
      "Localize o conectivo principal da premissa.",
      "Para E, extraia parcelas; para OU, identifique o que pode ser acrescentado.",
      "Não conclua uma negação que o OU inclusivo não sustenta."
    ],
    [
      [
        "A partir da premissa lógica p∧q podemos inferir:",
        "p.",
        "¬p.",
        "p→¬q.",
        "A conjunção afirma simultaneamente suas duas parcelas.",
        "A eliminação do E permite extrair qualquer parcela já afirmada.",
        "Não é possível negar p de uma premissa que o afirma.",
        "A conjunção não justifica negar q como consequência de p."
      ],
      [
        "Já demonstramos p e também demonstramos q. Qual fórmula podemos formar usando a introdução do E?",
        "p ∧ q.",
        "p ∨ ¬q.",
        "p → ¬q.",
        "Para escrever uma conjunção, precisamos das duas parcelas já demonstradas.",
        "Como p e q já têm prova, a regra de introdução da conjunção permite reuni-las numa única linha p ∧ q.",
        "O fato de q ser demonstrada não permite substituí-la por ¬q na segunda parcela.",
        "A premissa q é verdadeira, portanto não se pode concluir a implicação que exige ¬q a partir de p."
      ],
      [
        "Sabemos que a sala tem projetor. Qual conclusão é válida sem verificar a rede?",
        "A sala tem projetor OU possui internet.",
        "A sala tem projetor E possui internet.",
        "A sala não tem projetor.",
        "A alternativa introduzida pelo OU não precisa estar confirmada.",
        "Como projetor é verdadeiro, o OU inclusivo permanece verdadeiro independentemente da internet.",
        "Uma conjunção exigiria também evidência de internet.",
        "Essa conclusão contradiz diretamente o projetor afirmado."
      ]
    ]
  ],
  [
    "provas",
    [
      "Separe linhas dadas de hipóteses temporárias.",
      "Identifique a regra que justifica cada nova linha.",
      "Registre quando uma hipótese é descartada numa prova por contradição."
    ],
    [
      [
        "Por que escrever apenas uma conclusão verdadeira não constitui, por si só, uma prova formal?",
        "Porque cada passo até a conclusão precisa ter justificativa por regras.",
        "Porque provas formais exigem que toda conclusão seja uma tautologia.",
        "Porque uma prova formal não pode utilizar premissas.",
        "A primeira seção diferencia verificar um resultado e justificar uma cadeia de inferências.",
        "Uma prova formal apresenta premissas e passos autorizados; a conclusão pode estar correta por acaso sem ter sido demonstrada.",
        "A conclusão de um argumento pode depender de premissas e não precisa ser tautologia isolada.",
        "Premissas são o ponto de partida de muitas provas; o importante é justificar a obtenção das novas linhas."
      ],
      [
        "Uma prova tem a linha 1: p → q e a linha 2: p. Qual é a linha 3 justificada por modus ponens?",
        "q, pois o antecedente da condicional foi demonstrado.",
        "¬q, pois toda condicional autoriza negar o consequente.",
        "¬p, porque a segunda linha deve ser descartada.",
        "Use as duas linhas já apresentadas na seção: condicional e antecedente.",
        "De p → q e p, o modus ponens autoriza acrescentar q como conclusão; a linha 3 depende dessas duas premissas.",
        "A condicional com p verdadeiro exige q, não a sua negação.",
        "A segunda linha afirma p; não há motivo lógico para substituí-la por ¬p."
      ],
      [
        "Um estudante assume 'o servidor NÃO está disponível' e dessa suposição deduz uma contradição. O que pode concluir numa prova clássica adequada?",
        "Que o servidor está disponível, ao descarregar a hipótese.",
        "Que todas as frases do mundo são factualmente verdadeiras.",
        "Que deve manter a suposição mesmo contraditória.",
        "Diferencie reduzir ao absurdo de adotar uma inconsistência como premissa definitiva.",
        "O método clássico permite negar a hipótese temporária que levou a ⊥.",
        "Explosão é uma noção formal; não prova verdades empíricas arbitrárias.",
        "A hipótese foi introduzida apenas para teste e deve ser descarregada."
      ]
    ]
  ],
  [
    "deducao",
    [
      "Liste as possibilidades antes de tirar conclusões.",
      "Transforme cada pista em uma restrição verificável.",
      "Conte quantos cenários satisfazem todas as condições."
    ],
    [
      [
        "Três pessoas ocuparão três posições distintas, uma por pessoa. Quantas distribuições existem?",
        "Seis.",
        "Três.",
        "Nove.",
        "Organize: três escolhas, depois duas, depois uma.",
        "3! = 3×2×1 = seis atribuições sem repetição de posições.",
        "Três é o número de pessoas, não de permutações.",
        "Multiplicar 3×3 ignora que uma posição já ocupada não pode ser reutilizada."
      ],
      [
        "Uma pista diz 'exatamente uma afirmação é falsa'. O que conferir em cada cenário?",
        "Uma F e as demais V.",
        "Pelo menos uma F, podendo haver várias.",
        "Que todas sejam V.",
        "Conte o total de avaliações falsas por cenário.",
        "'Exatamente uma' impõe contagem igual a um, não um mínimo.",
        "'Pelo menos uma' inclui cenários com duas ou mais falsidades.",
        "Todas V corresponderia a zero pistas falsas."
      ],
      [
        "Num sorteio de tarefas há quatro atribuições possíveis; duas satisfazem todas as pistas. Podemos declarar solução única?",
        "Não, duas atribuições ainda são compatíveis.",
        "Sim, qualquer pista verdadeira produz unicidade.",
        "Sim, porque quatro alternativas iniciais já bastam.",
        "Conte as possibilidades que restam depois de aplicar todas as restrições.",
        "Unicidade exige exatamente uma possibilidade compatível, e não duas.",
        "A verdade de uma pista não escolhe necessariamente só uma combinação.",
        "O número inicial de alternativas não determina o número final."
      ]
    ]
  ],
  [
    "categoricos",
    [
      "Descreva conjuntos S e P em linguagem cotidiana.",
      "Para 'todos' e 'nenhum', identifique a região que deve estar vazia.",
      "Para 'alguns', marque uma testemunha real na região correspondente."
    ],
    [
      [
        "'Todos os gatos são mamíferos' proíbe qual região do Venn?",
        "Gatos que não são mamíferos.",
        "Mamíferos que não são gatos.",
        "Mamíferos que também são gatos.",
        "Um universal é falso se encontrar alguém em S fora de P.",
        "A afirmação exige que a região S fora de P seja vazia.",
        "A regra não diz que todos os mamíferos são gatos.",
        "A interseção entre gatos e mamíferos é permitida, não proibida."
      ],
      [
        "'Alguns músicos são estudantes' exige representar:",
        "Ao menos uma pessoa na interseção dos conjuntos.",
        "A interseção inteira vazia.",
        "Todos os músicos na categoria estudantes.",
        "'Alguns' afirma existência, não apenas ausência de contraexemplo.",
        "É preciso uma testemunha pertencente aos dois conjuntos.",
        "Hachurar a interseção indicaria que ninguém pertence a ambos.",
        "Uma afirmação existencial não obriga todo o grupo a entrar no segundo conjunto."
      ],
      [
        "Se não há visitantes na sala, a afirmação 'Todos os visitantes usam crachá' é, na semântica moderna:",
        "Verdadeira por vacuidade.",
        "Falsa por ausência de visitantes.",
        "Indeterminada até entrar alguém.",
        "Procure um visitante que viole a regra; há algum?",
        "Sem indivíduos do grupo antecedente, a universal não encontra contraexemplo.",
        "A universal não exige existência de visitantes nesse sistema.",
        "A semântica clássica atribui um valor à universal também com grupo vazio."
      ]
    ]
  ],
  [
    "negacao_quantificadores",
    [
      "Encontre o quantificador principal (todos ou existe).",
      "Troque ∀ por ∃, ou ∃ por ∀, e negue o predicado.",
      "Crie uma testemunha ou examine todas as pessoas conforme a forma obtida."
    ],
    [
      [
        "A negação de 'Todos os alunos receberam o recado' é:",
        "Algum aluno não recebeu o recado.",
        "Nenhum aluno recebeu o recado.",
        "Todos os alunos receberam o recado.",
        "Basta um contraexemplo para falsificar uma afirmação universal.",
        "Negar ∀xP(x) significa ∃x¬P(x): existe ao menos um caso contrário.",
        "Exigir que ninguém receba é mais forte que negar o universal.",
        "Essa alternativa repete a afirmação original em vez de negá-la."
      ],
      [
        "Como negar a afirmação existencial ∃x P(x)?",
        "∀x ¬P(x).",
        "∃x ¬P(x).",
        "∀x P(x).",
        "Negar 'existe alguém' significa que nenhum elemento satisfaz a propriedade.",
        "A ausência total de testemunhas é expressa por todos negados.",
        "Pode existir alguém sem P e outra pessoa com P; a existência original seria verdadeira.",
        "A fórmula afirma que todos têm P, o oposto de negar a existência de P."
      ],
      [
        "A frase 'Todos os alunos receberam o aviso' refere-se apenas à turma A. Para negá-la, qual caso é suficiente?",
        "Encontrar pelo menos um aluno da turma A que não recebeu o aviso.",
        "Encontrar um aluno da turma B que não recebeu o aviso.",
        "Mostrar que todos os alunos da turma A receberam o aviso.",
        "A última seção destaca que o domínio escolhido delimita os possíveis contraexemplos.",
        "Uma universal sobre a turma A é refutada por ao menos um integrante da própria turma que não recebeu o aviso.",
        "Um aluno de outra turma está fora do domínio da frase e não a contradiz.",
        "Confirmar que todos os alunos da turma A receberam o aviso torna a universal verdadeira, não falsa."
      ]
    ]
  ],
  [
    "quantificadores_escopo",
    [
      "Marque até onde a negação se estende.",
      "Transfira a negação por cada quantificador quando apropriado.",
      "Confira a diferença entre negar uma universal e negar cada ocorrência isolada."
    ],
    [
      [
        "Na lógica de predicados, ¬∀x(P(x)→Q(x)) significa:",
        "Existe P que não é Q.",
        "Nenhum P é Q.",
        "Todos os P são Q.",
        "Procure um indivíduo que torna falsa a condicional P→Q.",
        "A universal falha quando existe x com P verdadeiro e Q falso.",
        "Uma exceção basta; não é preciso rejeitar todos os casos.",
        "Essa é a sentença original, cuja negação estamos avaliando."
      ],
      [
        "Qual transformação conserva ¬∃x (P(x)∧Q(x))?",
        "∀x (¬P(x)∨¬Q(x)).",
        "∃x (¬P(x)∧¬Q(x)).",
        "∀x (P(x)∧Q(x)).",
        "Negue o existencial e depois use De Morgan no interior.",
        "A ausência de alguém com ambas as propriedades significa que cada um falha em ao menos uma.",
        "Existir alguém sem ambas não elimina alguém que possua ambas.",
        "Essa opção afirma presença universal das duas propriedades."
      ],
      [
        "'Não é verdade que todos os pacientes receberam alta'. Qual evidência basta?",
        "Um paciente ainda internado.",
        "Que nenhum paciente teve alta.",
        "Que todos receberam alta, mas em dias diferentes.",
        "Procure o contraexemplo individual à universal de alta.",
        "Uma testemunha sem alta é suficiente para tornar falsa a afirmação 'todos'.",
        "É desnecessário que ninguém tenha recebido alta.",
        "Diferenças de datas não contradizem que todos receberam alta."
      ]
    ]
  ],
  [
    "categoricos2",
    [
      "Escreva as quatro formas: A todos, E nenhum, I alguns, O alguns não.",
      "Identifique quais são contraditórias e quais dependem de existência.",
      "Confira explicitamente o caso S vazio antes de inferir 'alguns'."
    ],
    [
      [
        "Entre as quatro formas do quadrado das oposições, qual letra representa 'Alguns S não são P'?",
        "A forma O, uma particular negativa.",
        "A forma A, uma universal afirmativa.",
        "A forma E, uma universal negativa.",
        "A primeira seção apresenta A, E, I e O e distingue universal de particular.",
        "A forma O afirma a existência de pelo menos um S que não pertence a P; por isso é particular negativa.",
        "A forma A diz que todos os S são P, sem testemunha contrária.",
        "A forma E diz que nenhum S é P, uma proposição universal e não particular."
      ],
      [
        "No quadrado das oposições, qual sentença contradiz 'Todos os S são P' (A)?",
        "Alguns S não são P (O).",
        "Nenhum S é P (E).",
        "Alguns S são P (I).",
        "Contradição significa que uma proposição é verdadeira exatamente quando a outra é falsa.",
        "A e O são contraditórias: se todos os S são P, não pode existir S fora de P; se existir tal S, A é falsa.",
        "A e E podem ser ambas verdadeiras quando o conjunto S está vazio na semântica moderna.",
        "A e I podem ser ambas verdadeiras, por exemplo quando S não é vazio e está incluído em P."
      ],
      [
        "Numa escola não há membros do clube X. De 'Todos os membros de X são voluntários' podemos inferir 'Algum membro de X é voluntário'?",
        "Não, falta a hipótese de existência de membros de X.",
        "Sim, toda universal implica uma particular sem exceção.",
        "Sim, porque o grupo vazio contém uma pessoa abstrata.",
        "Examine se o grupo S possui ao menos um integrante.",
        "A inferência de A para I requer S não vazio; com S vazio, A é V e I é F.",
        "Na semântica moderna, universais não garantem testemunhas.",
        "Um conjunto vazio não possui integrantes, reais ou abstratos."
      ]
    ]
  ],
  [
    "predicados2",
    [
      "Distinga nomes, propriedades e relações.",
      "Separe existência ∃ de unicidade ∃! e do escopo de ∀.",
      "Busque um modelo em que uma das exigências falhe."
    ],
    [
      [
        "Em uma relação 'Ajuda(Ana, Beto)', o que devemos observar antes de trocar a ordem dos nomes?",
        "Em geral, a ordem importa: Ana ajudar Beto não garante que Beto ajude Ana.",
        "A ordem nunca importa porque todas as relações são simétricas.",
        "A troca é obrigatória em toda fórmula que contenha dois nomes.",
        "A primeira seção explica que relações expressam papéis e que trocar os argumentos pode alterar a afirmação.",
        "Uma relação binária como Ajuda(x,y) distingue quem ajuda e quem é ajudado; inverter os nomes muda a sentença.",
        "Simetria é uma propriedade adicional, não uma regra válida para qualquer relação.",
        "Nomes só podem ser invertidos com justificativa; a linguagem de predicados não impõe essa troca."
      ],
      [
        "Ana e Beto venceram a prova. A descrição 'o único vencedor' é adequada?",
        "Não, a unicidade falha.",
        "Sim, porque há pelo menos um vencedor.",
        "Sim, porque dois vencedores contam como um grupo.",
        "Separe a existência de vencedores da condição de ser apenas um.",
        "Há vencedores, mas são dois; uma descrição definida singular exige unicidade.",
        "Ter ao menos um vencedor demonstra existência, não unicidade.",
        "Agrupar duas pessoas não torna cada uma delas o único vencedor."
      ],
      [
        "A fórmula ∃y∀x Ajuda(x,y) exige qual situação?",
        "Existe uma pessoa ajudada por todos os indivíduos considerados.",
        "Cada pessoa ajuda alguém possivelmente diferente.",
        "Todo indivíduo é ajudado somente por si mesmo.",
        "O quantificador ∃y vem primeiro: escolha uma testemunha para todos os x.",
        "A mesma testemunha y deve servir para cada valor de x.",
        "Essa leitura seria ∀x∃y, pois o ajudado poderia variar para cada pessoa.",
        "O enunciado não impõe autoajuda nem exclusividade."
      ]
    ]
  ],
  [
    "inducao",
    [
      "Defina a população sobre a qual quer concluir.",
      "Investigue como a amostra foi selecionada e medida.",
      "Ajuste o grau de confiança à representatividade dos dados."
    ],
    [
      [
        "Entrevistar apenas clientes de uma livraria permite generalizar para toda a cidade com segurança?",
        "Não; a seleção pode não representar a população toda.",
        "Sim, pois toda amostra é automaticamente representativa.",
        "Sim, se os clientes responderem com sinceridade.",
        "Compare o grupo pesquisado com o grupo sobre o qual se quer concluir.",
        "Clientes de livraria podem diferir de moradores da cidade em variáveis importantes.",
        "A amostra pode ter um viés de seleção, mesmo quando é numerosa.",
        "Respostas sinceras não eliminam o viés de quem foi convidado."
      ],
      [
        "Uma pesquisa reúne 50 voluntários de um clube esportivo sobre hábitos de exercício. Qual é a principal limitação?",
        "A participação no clube pode enviesar a amostra.",
        "O número 50 torna qualquer conclusão impossível.",
        "Toda conclusão é dedutivamente certa com 50 respostas.",
        "A representatividade depende de quem entrou na amostra.",
        "Voluntários de um clube esportivo tendem a ter hábitos diferentes de outros grupos.",
        "O número isolado não determina a qualidade da amostragem.",
        "Uma amostra não produz certeza dedutiva de uma população inteira."
      ],
      [
        "Após perguntar a quatro colegas, alguém diz 'todos os jovens preferem trabalhar de casa'. Como melhorar o argumento?",
        "Ampliar e diversificar a amostra definida para o público estudado.",
        "Repetir a afirmação com mais convicção.",
        "Descartar qualquer opinião contrária.",
        "Pergunte se quatro pessoas do mesmo círculo representam todos os jovens.",
        "Uma amostra mais adequada e variada reduz o risco de extrapolação indevida.",
        "Convicção na conclusão não melhora a evidência empírica.",
        "Ignorar opiniões diferentes agrava o problema de seleção."
      ]
    ]
  ],
  [
    "medicao_evidencias",
    [
      "Verifique quem foi selecionado para a amostra.",
      "Examine o instrumento que mede e como as perguntas são feitas.",
      "Separe erros de seleção de erros de medição."
    ],
    [
      [
        "Uma pesquisa amostra toda a cidade ao acaso, mas a pergunta induz resposta positiva. Qual o problema?",
        "Viés de medição, apesar da amostra aleatória.",
        "Amostra necessariamente pequena.",
        "Uma prova de que a opinião é positiva.",
        "A seleção dos respondentes e a qualidade da pergunta são etapas distintas.",
        "Uma formulação tendenciosa pode distorcer respostas mesmo com amostragem boa.",
        "Aleatoriedade não implica amostra pequena e esse não é o defeito descrito.",
        "A pergunta influenciou a resposta e não comprova a opinião espontânea."
      ],
      [
        "Um sensor marca sempre 2°C acima da temperatura real. Que erro apresenta?",
        "Erro sistemático de medição.",
        "Amostragem por conveniência.",
        "Um resultado necessariamente aleatório e sem padrão.",
        "Compare o aparelho com um padrão de referência repetidamente.",
        "O deslocamento estável de +2°C caracteriza desvio sistemático do instrumento.",
        "O problema está no instrumento, não em quem foi escolhido para responder.",
        "O erro aparece em padrão fixo, não como ruído sem direção."
      ],
      [
        "Duas escolas têm alunos representativos, mas usam provas de dificuldades diferentes para comparar aprendizagem. O que falta?",
        "Um instrumento de medição comparável entre escolas.",
        "Uma amostra maior em apenas uma escola.",
        "Descartar notas da escola mais baixa.",
        "Pergunte se as duas medidas representam a mesma habilidade na mesma escala.",
        "Provas de dificuldades diferentes podem distorcer comparações mesmo com boas amostras.",
        "Mais respostas não corrigem uma escala de avaliação incompatível.",
        "Descartar resultados desfavoráveis produz seleção adicional dos dados."
      ]
    ]
  ],
  [
    "abducao",
    [
      "Liste o fato observado que pede explicação.",
      "Proponha hipóteses diferentes que poderiam explicar o mesmo fato.",
      "Busque um teste que produza previsões distintas."
    ],
    [
      [
        "Uma planta murchou. Qual raciocínio é abdutivo?",
        "Propor falta de água como hipótese a testar.",
        "Concluir logicamente que todas as plantas murcham.",
        "Declarar que a causa é certa antes de investigar.",
        "Abdução propõe explicações plausíveis a partir de indícios.",
        "Falta de água é uma explicação possível, não consequência dedutiva necessária.",
        "O caso observado não sustenta a generalização para todas as plantas.",
        "Uma hipótese plausível ainda precisa de comparação com outras causas."
      ],
      [
        "Há duas hipóteses para o computador desligar: aquecimento ou bateria. Qual teste discrimina melhor?",
        "Verificar a temperatura e a carga da bateria.",
        "Repetir que o computador desligou.",
        "Escolher a hipótese que parece mais familiar.",
        "Prefira observações com previsões diferentes conforme a causa.",
        "Medir temperatura e bateria fornece dados que podem favorecer hipóteses concorrentes.",
        "Repetir o sintoma não ajuda a distinguir as duas causas.",
        "Familiaridade não é evidência de que uma explicação seja correta."
      ],
      [
        "Depois de um ruído no carro, alguém diz 'só pode ser o motor'. Que atitude é mais rigorosa?",
        "Listar outras fontes de ruído e buscar testes distintivos.",
        "Declarar a causa confirmada pela primeira impressão.",
        "Ignorar todas as hipóteses concorrentes.",
        "Um sintoma pode ter várias explicações que geram evidências diferentes.",
        "Testar hipóteses alternativas reduz o risco de confundir plausibilidade com comprovação.",
        "A primeira explicação não precisa ser a verdadeira.",
        "Ignorar alternativas impede avaliar o peso real da evidência."
      ]
    ]
  ],
  [
    "probabilidade",
    [
      "Leia qual evento aparece depois de 'dado que'.",
      "Converta porcentagens em frequências esperadas usando um grupo imaginário.",
      "Compare verdadeiros e falsos positivos entre todos os testes positivos."
    ],
    [
      [
        "No exemplo do texto, o teste identificou 8 pessoas com a condição e acusou outras 99 sem a condição. Quantos resultados positivos houve?",
        "107 resultados positivos: 8 verdadeiros e 99 falsos.",
        "Apenas 8 resultados positivos, contando só os casos reais.",
        "Apenas 99 resultados positivos, excluindo os casos reais.",
        "A primeira seção separou os positivos corretos dos falsos positivos; some os dois grupos.",
        "O total de testes positivos inclui os 8 verdadeiros positivos e os 99 falsos positivos, perfazendo 107 pessoas.",
        "O teste também pode dar positivo em pessoas sem a condição, e esses resultados entram no total.",
        "Os oito casos com a condição identificados pelo teste também fazem parte do conjunto de positivos."
      ],
      [
        "Em 1000 pessoas, 10 têm a condição; teste detecta 9 delas. Se 99 das 990 sem condição testam positivo, quantos positivos totais há?",
        "108.",
        "9.",
        "99.",
        "Some positivos verdadeiros e positivos de pessoas sem a condição.",
        "São 9 verdadeiros positivos mais 99 falsos positivos, totalizando 108 resultados positivos.",
        "Nove conta apenas os positivos entre as pessoas que têm a condição.",
        "Noventa e nove ignora os positivos entre pessoas com a condição."
      ],
      [
        "Em uma campanha, 5 de 100 pessoas têm a doença e o teste tem falso positivo frequente. Um resultado positivo prova doença?",
        "Não; é preciso considerar taxa de base e falsos positivos.",
        "Sim; qualquer positivo confirma doença com 100% de certeza.",
        "Sim; a taxa de base deixa de importar após o teste.",
        "Compare quantidade esperada de positivos entre doentes e não doentes.",
        "Um positivo muda a evidência, mas a probabilidade posterior depende também da prevalência e dos erros do teste.",
        "Testes imperfeitos produzem positivos em pessoas sem doença.",
        "A prevalência define quantos doentes existem antes dos resultados."
      ]
    ]
  ],
  [
    "causalidade",
    [
      "Identifique a associação observada e a causa sugerida.",
      "Liste fatores que possam afetar simultaneamente causa e resultado.",
      "Proponha uma comparação que controle explicações rivais."
    ],
    [
      [
        "Sorvetes e afogamentos aumentam no verão. Isso prova que sorvetes causam afogamentos?",
        "Não; calor e estação podem influenciar ambos.",
        "Sim; duas curvas que sobem juntas provam causa.",
        "Sim; a repetição elimina variáveis externas.",
        "Procure um terceiro fator que faça os dois eventos aumentarem.",
        "A estação quente pode elevar consumo e banhos, criando associação sem causalidade direta.",
        "Correlação positiva não basta para demonstrar mecanismo causal.",
        "Padrões repetidos ainda podem refletir um fator de confusão persistente."
      ],
      [
        "Uma escola mudou horário e método de ensino ao mesmo tempo; as notas subiram. O que dificulta atribuir o efeito ao horário?",
        "A alteração simultânea do método de ensino.",
        "O fato de existirem notas anteriores.",
        "A possibilidade de os alunos gostarem do horário.",
        "Pergunte que outra variável mudou junto com a suposta causa.",
        "O novo método pode explicar parte das notas; as intervenções não foram isoladas.",
        "Notas anteriores podem ajudar na comparação, não constituem a confusão por si.",
        "Preferências só importam se houver dados mostrando relação com o resultado."
      ],
      [
        "Queremos avaliar se uma nova técnica de estudo melhora o desempenho. Que desenho fornece evidência causal mais forte?",
        "Comparar grupos semelhantes com diferenças controladas na técnica.",
        "Comparar apenas os melhores alunos que escolheram a técnica.",
        "Perguntar aos alunos se acreditam que ela funciona.",
        "Procure grupos comparáveis e mantenha outras condições tão semelhantes quanto possível.",
        "Uma comparação controlada reduz explicações rivais para a diferença observada.",
        "Alunos que se selecionam podem já ter desempenho superior.",
        "Opiniões dos participantes não medem diretamente o efeito causal."
      ]
    ]
  ]
]);
