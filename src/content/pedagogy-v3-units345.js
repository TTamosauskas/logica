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
        "De p∨q e ¬p, qual conclusão é necessária?",
        "q.",
        "¬q.",
        "p.",
        "Se uma alternativa do OU é impossível, qual precisa sustentar a disjunção?",
        "A disjunção inclusiva precisa de ao menos uma parcela verdadeira; com p falsa, q vale.",
        "Sem p, negar q tornaria ambas as partes falsas.",
        "A premissa informa justamente que p não ocorre."
      ],
      [
        "'Se o sistema é autenticado, dá acesso. Se dá acesso, registra a sessão.' O que segue?",
        "Se é autenticado, registra a sessão.",
        "Se registra, necessariamente foi autenticado.",
        "Se não é autenticado, não registra.",
        "Ligue a consequência da primeira regra à condição da segunda.",
        "O encadeamento das condicionais leva autenticação→registro sem afirmar o caminho inverso.",
        "O registro poderia ocorrer por outros mecanismos; a recíproca não segue.",
        "A ausência de autenticação não proíbe registro por outra via."
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
        "De p∧q podemos inferir:",
        "p.",
        "¬p.",
        "p→¬q.",
        "A conjunção afirma simultaneamente suas duas parcelas.",
        "A eliminação do E permite extrair qualquer parcela já afirmada.",
        "Não é possível negar p de uma premissa que o afirma.",
        "A conjunção não justifica negar q como consequência de p."
      ],
      [
        "De p, qual disjunção podemos introduzir validamente?",
        "p∨r.",
        "p∧r.",
        "¬p∨r.",
        "Uma disjunção inclusiva é verdadeira se uma parcela já é V.",
        "A introdução do OU admite qualquer alternativa adicional r sem afirmar r.",
        "A conjunção precisaria de uma prova de r que não foi dada.",
        "A premissa p não sustenta ¬p, e r tampouco foi demonstrada."
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
        "Se as linhas anteriores são p e p→q, como justificar q?",
        "Modus ponens.",
        "Afirmação do consequente.",
        "Comutatividade.",
        "A regra deve usar exatamente as linhas necessárias.",
        "Uma condicional com o antecedente afirmado autoriza seu consequente.",
        "A falácia partiria de q para p, no sentido oposto.",
        "Trocar a ordem de parcelas não explica esta inferência."
      ],
      [
        "Numa prova clássica por absurdo de p, qual hipótese provisória fazemos?",
        "¬p, buscando uma contradição.",
        "p e q como duas premissas reais.",
        "Uma frase sem relação com p.",
        "Procure o oposto do que pretende concluir e marque que é provisório.",
        "Assumir ¬p e obter ⊥ permite descartar a hipótese e concluir p no cálculo clássico.",
        "Não é necessário assumir p como fato para demonstrá-la por absurdo.",
        "Uma hipótese arbitrária não garante contradição relevante."
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
        "Como negar ∃x P(x)?",
        "∀x ¬P(x).",
        "∃x ¬P(x).",
        "∀x P(x).",
        "Negar 'existe alguém' significa que nenhum elemento satisfaz a propriedade.",
        "A ausência total de testemunhas é expressa por todos negados.",
        "Pode existir alguém sem P e outra pessoa com P; a existência original seria verdadeira.",
        "A fórmula afirma que todos têm P, o oposto de negar a existência de P."
      ],
      [
        "'Existe um livro disponível' é falsa. O que podemos afirmar na interpretação considerada?",
        "Nenhum livro está disponível.",
        "Algum livro não está disponível e outro sim.",
        "Todos os livros estão disponíveis.",
        "A negação de uma existência exclui todas as testemunhas.",
        "Se não existe livro disponível, todo livro considerado é indisponível.",
        "O segundo cenário ainda teria uma testemunha disponível.",
        "Isso exigiria livros disponíveis, em contradição com o dado."
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
        "¬∀x(P(x)→Q(x)) significa:",
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
        "Qual sentença contradiz 'Todos os S são P' (A)?",
        "Alguns S não são P (O).",
        "Nenhum S é P (E).",
        "Alguns S são P (I).",
        "Uma universal é falsa quando há um contraexemplo particular.",
        "A e O são contraditórias em semântica clássica, com ou sem S vazio.",
        "A e E podem ambas ser verdadeiras se S for vazio.",
        "A e I podem ambas ser verdadeiras quando há um S que também é P."
      ],
      [
        "Se S é vazio, como são A='Todos S são P' e I='Alguns S são P' na semântica moderna?",
        "A verdadeira; I falsa.",
        "Ambas verdadeiras.",
        "Ambas falsas.",
        "A universal exige ausência de contraexemplos; a particular exige existência.",
        "Sem S, não há contraexemplo a A nem testemunha para I.",
        "A particular não pode ser verdadeira sem pelo menos um S.",
        "A universal é verdadeira por vacuidade com domínio S vazio."
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
        "A fórmula ∃!x F(x) afirma:",
        "Exatamente um indivíduo satisfaz F.",
        "Ao menos dois indivíduos satisfazem F.",
        "Todo indivíduo satisfaz F.",
        "O símbolo ∃! reúne existência e unicidade.",
        "É preciso existir uma testemunha e garantir que nenhuma outra distinta tenha F.",
        "Duas testemunhas distintas violariam unicidade.",
        "A universal não descreve o mesmo requisito de 'exatamente um'."
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
        "O que P(doença | teste positivo) representa?",
        "A probabilidade de doença entre pessoas com teste positivo.",
        "A probabilidade de teste positivo entre pessoas doentes.",
        "A probabilidade de doença na população inteira.",
        "Na notação P(A|B), B é a condição que delimita o grupo.",
        "A proporção solicitada tem denominador formado pelo conjunto de testes positivos.",
        "Isso seria P(teste positivo|doença), que inverte os eventos.",
        "A taxa geral de doença não condiciona o resultado ao teste."
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
