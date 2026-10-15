/** Frente 2 — cinco aulas independentes para competências antes antecipadas. */
export const GAP_LESSONS_A={
  "condicionais_naturais": {
    "lead": "Como interpretar ‘a menos que’, ‘só se’ e condições que não são suficientes?",
    "theory": "Se p então q informa que p é condição suficiente para q, e q é necessária para p. O enunciado não afirma q→p. Por exemplo, “Se o aluno possui senha, então pode consultar o boletim” não significa que apenas alunos com senha têm acesso. A expressão “p somente se q” também indica p→q, pois q é requisito para p. Em contrapartida, “p se q” indica q→p. O caminho adequado é identificar o acontecimento que exige o outro, e não confiar na ordem superficial das palavras.\n\nNa leitura inclusiva adotada nesta aula, “p, a menos que q” indica que, se q não acontecer, p acontecerá: ¬q→p. Essa condicional é classicamente equivalente a p∨q. Exemplo: “Receberemos aviso, a menos que haja falha”: sem falha, haverá aviso. O enunciado não estabelece que uma falha necessariamente impedirá o aviso: q→¬p seria uma informação adicional. Também não afirma que aviso e falha jamais ocorram juntos. O contexto pode introduzir outras relações causais, mas a formalização mínima não deve inventá-las.\n\nReescrever uma condição preservando seu significado exige testar quando a frase seria falsa. “Se p então q” é falsa apenas quando p=V e q=F; já q→p seria falsa em outra linha. Essa verificação impede confundir condição necessária com suficiente. Em exercícios, primeiro atribua letras às afirmações e escreva o vínculo solicitado. Depois traduza a mesma fórmula para uma frase alternativa. Use uma situação em que o requisito esteja presente e o resultado não ocorra para mostrar por que a recíproca não é garantida.",
    "example": "“O laboratório terá atendimento, a menos que o prédio fique sem energia.” Seja p=ter atendimento; q=faltar energia.",
    "steps": [
      "A expressão apresenta a ausência da falha (¬q) como condição para a realização do atendimento p.",
      "Escreva ¬q→p. Na tabela clássica, isso coincide com q∨p, uma disjunção inclusiva.",
      "q→¬p seria falsa se faltasse energia, mas o prédio ainda atendesse com gerador."
    ],
    "quiz": [
      {
        "question": "“p somente se q” é representado por:",
        "options": [
          "p→q.",
          "q→p.",
          "p∧q."
        ],
        "correct": 0,
        "why": "q é condição necessária para p."
      },
      {
        "question": "“p se q” corresponde a:",
        "options": [
          "q→p.",
          "p→q.",
          "p↔q."
        ],
        "correct": 0,
        "why": "q é suficiente para p, mas p pode ocorrer em outras circunstâncias."
      },
      {
        "question": "“O curso ocorrerá, a menos que falte docente” garante:",
        "options": [
          "Sem ausência de docente, o curso ocorrerá.",
          "Com ausência de docente, o curso obrigatoriamente não ocorrerá.",
          "O curso ocorre apenas quando falta docente."
        ],
        "correct": 0,
        "why": "A formalização mínima não determina o resultado no cenário excepcional."
      },
      {
        "question": "De p→q, o que não se pode inferir sem outra premissa?",
        "options": [
          "q→p.",
          "Que p=V e q=F não podem coexistir com a condicional verdadeira.",
          "Que q é necessária para p."
        ],
        "correct": 0,
        "why": "A recíproca não é consequência da condicional original."
      }
    ]
  },
  "equiv_algebra": {
    "lead": "Como reorganizar e simplificar fórmulas sem mudar os seus valores de verdade?",
    "theory": "Comutatividade troca a ordem: p∧q≡q∧p e p∨q≡q∨p. Associatividade troca o agrupamento quando o conectivo é o mesmo: (p∧q)∧r≡p∧(q∧r), e analogamente para ∨. Essas equivalências valem para a conjunção e disjunção clássicas. Não podemos mover parênteses indiscriminadamente quando misturamos operações. p∧(q∨r) não é equivalente a (p∧q)∨r. Para justificar a transformação, identifique o conectivo e a estrutura completa antes de aplicar a lei correspondente.\n\nA conjunção distribui sobre a disjunção: p∧(q∨r)≡(p∧q)∨(p∧r). A disjunção distribui sobre a conjunção: p∨(q∧r)≡(p∨q)∧(p∨r). Observe que a parcela p é repetida nos dois ramos. Se o termo repetido for uma expressão composta, conserve os parênteses. Por exemplo, (p→q)∧(r∨s) é distribuído repetindo (p→q), não apenas a letra p. É a forma do subtermo, e não seu assunto, que dirige a regra.\n\nAs leis de absorção afirmam p∨(p∧q)≡p e p∧(p∨q)≡p. No primeiro caso, quando p é V, toda a disjunção é V; quando p é F, p∧q é F e a expressão toda é F. A expressão composta acompanha sempre p. O teste com uma tabela-verdade pode confirmar cada passagem. Na prática, escreva a fórmula inicial, cite a lei usada, mostre a nova fórmula e somente então siga adiante. Uma cadeia com passos verdadeiros por acaso não é justificativa de equivalência geral.",
    "example": "Simplifique p∨(p∧q) sem recorrer à escolha arbitrária de valores.",
    "steps": [
      "O termo p aparece como alternativa isolada e também como condição necessária da parcela p∧q.",
      "Substitua p∨(p∧q) por p e identifique a lei usada: A∨(A∧B)≡A.",
      "Quando p=V, a disjunção é V; quando p=F, p∧q é F e a disjunção também é F."
    ],
    "quiz": [
      {
        "question": "Qual transformação exemplifica comutatividade?",
        "options": [
          "p∧q ≡ q∧p.",
          "p∧q ≡ p∨q.",
          "p∧q ≡ ¬p∧q."
        ],
        "correct": 0,
        "why": "A ordem troca, mas o conectivo permanece."
      },
      {
        "question": "Qual fórmula resulta de p∧(q∨r)?",
        "options": [
          "(p∧q)∨(p∧r).",
          "(p∧q)∨r.",
          "p∨(q∧r)."
        ],
        "correct": 0,
        "why": "A conjunção se distribui nos dois ramos."
      },
      {
        "question": "Por absorção, p∧(p∨q) é equivalente a:",
        "options": [
          "p.",
          "q.",
          "p∨q."
        ],
        "correct": 0,
        "why": "Se p é F, a conjunção é F; se p é V, a disjunção é V."
      },
      {
        "question": "A associatividade é aplicável diretamente em:",
        "options": [
          "(p∨q)∨r ≡ p∨(q∨r).",
          "p∨(q∧r) ≡ (p∨q)∧r.",
          "p→q ≡ q→p."
        ],
        "correct": 0,
        "why": "A mudança de parênteses mantém o mesmo conectivo nas duas operações."
      }
    ]
  },
  "equiv_condicionais": {
    "lead": "Como provar equivalências com condicionais, contraposição e bicondicionais?",
    "theory": "A condicional p→q equivale a ¬q→¬p: se q falha, p não pode ocorrer sem contrariar a condição inicial. Essa passagem se chama contraposição. Já q→p, a recíproca, não é automaticamente equivalente à condicional original. Por exemplo: “Se é quadrado, tem quatro lados” é compatível com formas de quatro lados que não são quadrados. A contrapositiva diz “Se não tem quatro lados, não é quadrado”; a recíproca faz uma afirmação adicional e pode ser falsa.\n\nO bicondicional p↔q equivale a (p→q)∧(q→p). Ele exige não apenas que p seja suficiente para q, mas também que q seja suficiente para p. Sua coluna é verdadeira quando p e q têm valores iguais. Aplicando a eliminação da condicional às duas partes, obtemos (¬p∨q)∧(¬q∨p). Em uma cadeia, cada passo deve mencionar qual subfórmula foi transformada; trocar ∧ por ∨ mudaria o sentido do requisito conjunto.\n\n¬(p→q) é equivalente a p∧¬q. Isso expressa exatamente a linha que tornaria a condicional falsa: antecedente verdadeiro e consequente falso. Não é equivalente a ¬p→¬q, que constitui a inversa e pode ter valor diferente. Para avaliar transformações mais longas, escreva primeiro a definição de → ou ↔, depois aplique De Morgan e elimine duplas negações. Uma interpretação com valores diferentes nos dois lados basta para reprovar qualquer passagem indevida.",
    "example": "Parta de p↔q e reescreva o bicondicional usando somente ¬, ∨ e ∧.",
    "steps": [
      "p↔q ≡ (p→q)∧(q→p), porque o bicondicional exige a ida e a volta.",
      "(p→q)∧(q→p) ≡ (¬p∨q)∧(q→p).",
      "Obtemos (¬p∨q)∧(¬q∨p), equivalente a p↔q em todas as linhas."
    ],
    "quiz": [
      {
        "question": "A contrapositiva de p→q é:",
        "options": [
          "¬q→¬p.",
          "q→p.",
          "¬p→¬q."
        ],
        "correct": 0,
        "why": "Negam-se as duas partes e troca-se sua ordem."
      },
      {
        "question": "O bicondicional p↔q equivale a:",
        "options": [
          "(p→q)∧(q→p).",
          "(p→q)∨(q→p).",
          "p∧¬q."
        ],
        "correct": 0,
        "why": "As duas condições de implicação precisam valer."
      },
      {
        "question": "¬(p→q) equivale a:",
        "options": [
          "p∧¬q.",
          "¬p∨q.",
          "q→p."
        ],
        "correct": 0,
        "why": "O contraexemplo à condicional torna sua negação verdadeira."
      },
      {
        "question": "Qual transformação é indevida em geral?",
        "options": [
          "p→q ≡ q→p.",
          "p→q ≡ ¬q→¬p.",
          "¬(p→q) ≡ p∧¬q."
        ],
        "correct": 0,
        "why": "A recíproca pode inverter uma condição necessária e suficiente."
      }
    ]
  },
  "regras_inferencia": {
    "lead": "Que regras permitem passar de premissas a conclusões em provas formais?",
    "theory": "O modus ponens usa p→q e p para concluir q; o modus tollens usa p→q e ¬q para concluir ¬p. A segunda regra é válida porque p verdadeira e q falsa tornariam a condicional falsa. Não se deve trocar modus tollens pela falácia de negar o antecedente. Exemplo: “Se o acesso foi liberado, há um registro de autorização”. Se não há registro, podemos concluir que o acesso não foi liberado, assumidas as premissas. Mas de “não liberado” não segue “sem registro”, pois pode haver registros por outros motivos.\n\nO silogismo hipotético encadeia p→q e q→r para concluir p→r. O silogismo disjuntivo combina p∨q e ¬p para concluir q. Como a disjunção é inclusiva, de p∨q e p não podemos inferir ¬q: ambas podem ser verdadeiras. Em cada situação, identifique todas as premissas utilizadas. Uma regra só autoriza a conclusão se suas condições estiverem presentes. O método é acompanhar dependências entre linhas, sem confundir plausibilidade com derivação.\n\nDa conjunção p∧q podemos extrair p ou q (eliminação de ∧); de duas linhas p e q podemos obter p∧q (introdução de ∧). De p é lícito obter p∨r (introdução de ∨), mas não concluir r isoladamente. Na lógica clássica, de ¬¬p podemos concluir p por eliminação da dupla negação. A regra deve ser identificada pelo nome e suas linhas de origem. Aulas posteriores poderão combinar vários passos em demonstrações mais longas.",
    "example": "Regras de um sistema: p→q; q→r; ¬r. Demonstre ¬p em etapas.",
    "steps": [
      "De q→r e ¬r, obtenha ¬q por modus tollens.",
      "De p→q e ¬q, obtenha ¬p, novamente por modus tollens.",
      "As duas aplicações usam premissas já disponíveis; nenhuma delas presume a recíproca de uma condicional."
    ],
    "quiz": [
      {
        "question": "Modus tollens tem a forma:",
        "options": [
          "p→q, ¬q ⊢ ¬p.",
          "p→q, ¬p ⊢ ¬q.",
          "p→q, q ⊢ p."
        ],
        "correct": 0,
        "why": "A negação do consequente exclui o antecedente."
      },
      {
        "question": "De p∨q e ¬p obtemos:",
        "options": [
          "q.",
          "¬q.",
          "¬p∧¬q."
        ],
        "correct": 0,
        "why": "É o silogismo disjuntivo."
      },
      {
        "question": "De p∧q qual regra permite escrever q?",
        "options": [
          "Eliminação da conjunção.",
          "Introdução da disjunção.",
          "Modus tollens."
        ],
        "correct": 0,
        "why": "A conjunção implica cada componente."
      },
      {
        "question": "De ¬¬p obtemos p em lógica clássica por:",
        "options": [
          "Eliminação da dupla negação.",
          "Silogismo hipotético.",
          "Negação do antecedente."
        ],
        "correct": 0,
        "why": "A dupla negação recupera a fórmula na lógica clássica."
      }
    ]
  },
  "negacao_quantificadores": {
    "lead": "Como negar corretamente sentenças que afirmam ‘todos’ ou ‘existe’?",
    "theory": "A negação de “Todos os estudantes receberam o comunicado” não significa “Nenhum estudante recebeu”. Significa que existe ao menos um estudante que não recebeu. Formalmente, ¬∀x P(x)≡∃x¬P(x), dentro do domínio especificado. Para verificar, imagine uma turma com três estudantes: dois receberam e um não. A sentença universal é falsa e sua negação verdadeira. Isso basta para demonstrar a necessidade de ao menos um contraexemplo, sem exigir que todos falhem.\n\nA negação de “Algum estudante foi selecionado” é “Nenhum estudante foi selecionado”. Formalmente, ¬∃x P(x)≡∀x¬P(x). A passagem troca o quantificador e nega a propriedade dentro de seu escopo. Uma negação não muda arbitrariamente o grupo estudado. Se x varia sobre estudantes e P(x) significa “entregou o trabalho”, ¬∃xP(x) afirma ausência de estudantes que o entregaram. Não afirma que ninguém no mundo inteiro entregou qualquer trabalho.\n\nAs sentenças ¬∀x(P(x)→Q(x)) e ∀x(P(x)→¬Q(x)) não possuem o mesmo significado. A primeira afirma existir ao menos um P que não seja Q; a segunda exige que nenhum P seja Q. Uma troca indevida de escopo fortalece a afirmação. Em problemas com quantificadores aninhados, negue de fora para dentro, trocando ∀ por ∃ em cada etapa e empurrando a negação sobre a fórmula interna. Declare sempre o domínio, pois a interpretação de universais com domínio vazio depende da convenção usada.",
    "example": "Negue ‘Todos os funcionários receberam o aviso’ e ‘Algum funcionário recebeu o aviso’.",
    "steps": [
      "O domínio são funcionários; R(x) significa que x recebeu o aviso. A universal é ∀x R(x).",
      "¬∀x R(x)≡∃x¬R(x): existe funcionário que não recebeu.",
      "¬∃x R(x)≡∀x¬R(x): nenhum funcionário recebeu."
    ],
    "quiz": [
      {
        "question": "¬∀xP(x) equivale a:",
        "options": [
          "∃x¬P(x).",
          "∀x¬P(x).",
          "¬∃x¬P(x)."
        ],
        "correct": 0,
        "why": "Existe ao menos um contraexemplo."
      },
      {
        "question": "¬∃xP(x) equivale a:",
        "options": [
          "∀x¬P(x).",
          "∃x¬P(x).",
          "∀xP(x)."
        ],
        "correct": 0,
        "why": "Nenhuma testemunha satisfaz P."
      },
      {
        "question": "‘Nem todos chegaram’ significa:",
        "options": [
          "Algum não chegou.",
          "Ninguém chegou necessariamente.",
          "Todos chegaram."
        ],
        "correct": 0,
        "why": "Uma ausência já refuta o quantificador universal."
      },
      {
        "question": "Na negação de fórmulas com ∀ e ∃, é preciso:",
        "options": [
          "Trocar o quantificador e negar a fórmula em seu escopo.",
          "Trocar apenas a letra predicativa.",
          "Ignorar o domínio de quantificação."
        ],
        "correct": 0,
        "why": "A regra de dualidade preserva o alcance dos operadores."
      }
    ]
  }
};
export const GAP_READINGS_A={
  "condicionais_naturais": {
    "objective": "Formalizar conectivos na linguagem natural, distinguir condições necessárias e suficientes e justificar o alcance de ‘a menos que’ sem pressupor equivalências não ensinadas.",
    "sections": [
      {
        "heading": "Condição necessária e suficiente",
        "paragraphs": [
          "Se p então q informa que p é condição suficiente para q, e q é necessária para p. O enunciado não afirma q→p. Por exemplo, “Se o aluno possui senha, então pode consultar o boletim” não significa que apenas alunos com senha têm acesso.",
          "A expressão “p somente se q” também indica p→q, pois q é requisito para p. Em contrapartida, “p se q” indica q→p. O caminho adequado é identificar o acontecimento que exige o outro, e não confiar na ordem superficial das palavras."
        ]
      },
      {
        "heading": "Como interpretar ‘a menos que’",
        "paragraphs": [
          "Na leitura inclusiva adotada nesta aula, “p, a menos que q” indica que, se q não acontecer, p acontecerá: ¬q→p. Essa condicional é classicamente equivalente a p∨q. Exemplo: “Receberemos aviso, a menos que haja falha”: sem falha, haverá aviso.",
          "O enunciado não estabelece que uma falha necessariamente impedirá o aviso: q→¬p seria uma informação adicional. Também não afirma que aviso e falha jamais ocorram juntos. O contexto pode introduzir outras relações causais, mas a formalização mínima não deve inventá-las."
        ]
      },
      {
        "heading": "Paráfrase e contraexemplo",
        "paragraphs": [
          "Reescrever uma condição preservando seu significado exige testar quando a frase seria falsa. “Se p então q” é falsa apenas quando p=V e q=F; já q→p seria falsa em outra linha. Essa verificação impede confundir condição necessária com suficiente.",
          "Em exercícios, primeiro atribua letras às afirmações e escreva o vínculo solicitado. Depois traduza a mesma fórmula para uma frase alternativa. Use uma situação em que o requisito esteja presente e o resultado não ocorra para mostrar por que a recíproca não é garantida."
        ]
      }
    ],
    "misconception": "A construção “a menos que” não exige exclusividade nem estabelece uma relação causal completa. Sua formalização mínima precisa ser declarada antes de pedir traduções.",
    "summary": "“p somente se q” significa p→q; “p se q” significa q→p; e “p a menos que q” recebe aqui a formalização mínima ¬q→p, equivalente a p∨q.",
    "check": {
      "question": "“Abriremos, a menos que falte energia” garante qual relação mínima?",
      "options": [
        "Se não faltar energia, abriremos.",
        "Se faltar energia, não abriremos necessariamente.",
        "Se abrirmos, não faltou energia."
      ],
      "correct": 0,
      "why": "A condição descrita garante abertura na ausência de falha; não fixa o resultado quando há falta de energia."
    }
  },
  "equiv_algebra": {
    "objective": "Aplicar comutatividade, associatividade, distributividade e absorção com justificativa por lei e confirmação em tabelas-verdade.",
    "sections": [
      {
        "heading": "Reorganizações que não mudam a operação",
        "paragraphs": [
          "Comutatividade troca a ordem: p∧q≡q∧p e p∨q≡q∨p. Associatividade troca o agrupamento quando o conectivo é o mesmo: (p∧q)∧r≡p∧(q∧r), e analogamente para ∨. Essas equivalências valem para a conjunção e disjunção clássicas.",
          "Não podemos mover parênteses indiscriminadamente quando misturamos operações. p∧(q∨r) não é equivalente a (p∧q)∨r. Para justificar a transformação, identifique o conectivo e a estrutura completa antes de aplicar a lei correspondente."
        ]
      },
      {
        "heading": "Distributividade com fórmulas completas",
        "paragraphs": [
          "A conjunção distribui sobre a disjunção: p∧(q∨r)≡(p∧q)∨(p∧r). A disjunção distribui sobre a conjunção: p∨(q∧r)≡(p∨q)∧(p∨r). Observe que a parcela p é repetida nos dois ramos.",
          "Se o termo repetido for uma expressão composta, conserve os parênteses. Por exemplo, (p→q)∧(r∨s) é distribuído repetindo (p→q), não apenas a letra p. É a forma do subtermo, e não seu assunto, que dirige a regra."
        ]
      },
      {
        "heading": "Absorção e simplificação",
        "paragraphs": [
          "As leis de absorção afirmam p∨(p∧q)≡p e p∧(p∨q)≡p. No primeiro caso, quando p é V, toda a disjunção é V; quando p é F, p∧q é F e a expressão toda é F. A expressão composta acompanha sempre p.",
          "O teste com uma tabela-verdade pode confirmar cada passagem. Na prática, escreva a fórmula inicial, cite a lei usada, mostre a nova fórmula e somente então siga adiante. Uma cadeia com passos verdadeiros por acaso não é justificativa de equivalência geral."
        ]
      }
    ],
    "misconception": "Comutatividade e associatividade não permitem remover quaisquer parênteses entre conectivos diferentes. A distributividade duplica a parcela distribuída, enquanto absorção elimina uma parte redundante.",
    "summary": "Comutatividade troca ordem; associatividade reorganiza o mesmo conectivo; distributividade expande uma operação sobre outra; absorção simplifica p∨(p∧q) e p∧(p∨q).",
    "check": {
      "question": "Qual simplificação decorre de absorção?",
      "options": [
        "p∨(p∧q) ≡ p.",
        "p∨(p∧q) ≡ q.",
        "p∨(p∧q) ≡ p∧q."
      ],
      "correct": 0,
      "why": "A parte p∧q não altera o valor da disjunção já determinada por p."
    }
  },
  "equiv_condicionais": {
    "objective": "Justificar a contraposição de p→q, a definição de p↔q, a negação de condicionais e sua combinação em cadeias explícitas de equivalências.",
    "sections": [
      {
        "heading": "A contraposição não é a recíproca",
        "paragraphs": [
          "A condicional p→q equivale a ¬q→¬p: se q falha, p não pode ocorrer sem contrariar a condição inicial. Essa passagem se chama contraposição. Já q→p, a recíproca, não é automaticamente equivalente à condicional original.",
          "Por exemplo: “Se é quadrado, tem quatro lados” é compatível com formas de quatro lados que não são quadrados. A contrapositiva diz “Se não tem quatro lados, não é quadrado”; a recíproca faz uma afirmação adicional e pode ser falsa."
        ]
      },
      {
        "heading": "Bicondicional requer duas direções",
        "paragraphs": [
          "O bicondicional p↔q equivale a (p→q)∧(q→p). Ele exige não apenas que p seja suficiente para q, mas também que q seja suficiente para p. Sua coluna é verdadeira quando p e q têm valores iguais.",
          "Aplicando a eliminação da condicional às duas partes, obtemos (¬p∨q)∧(¬q∨p). Em uma cadeia, cada passo deve mencionar qual subfórmula foi transformada; trocar ∧ por ∨ mudaria o sentido do requisito conjunto."
        ]
      },
      {
        "heading": "Negar uma condicional",
        "paragraphs": [
          "¬(p→q) é equivalente a p∧¬q. Isso expressa exatamente a linha que tornaria a condicional falsa: antecedente verdadeiro e consequente falso. Não é equivalente a ¬p→¬q, que constitui a inversa e pode ter valor diferente.",
          "Para avaliar transformações mais longas, escreva primeiro a definição de → ou ↔, depois aplique De Morgan e elimine duplas negações. Uma interpretação com valores diferentes nos dois lados basta para reprovar qualquer passagem indevida."
        ]
      }
    ],
    "misconception": "A contrapositiva ¬q→¬p equivale a p→q; a recíproca q→p não. Um bicondicional exige duas condicionais simultaneamente, não uma disjunção delas.",
    "summary": "Contraposição: p→q≡¬q→¬p. Bicondicional: p↔q≡(p→q)∧(q→p). Negação: ¬(p→q)≡p∧¬q. Cada etapa de transformação deve preservar toda a tabela.",
    "check": {
      "question": "Qual fórmula é a contrapositiva de p→q?",
      "options": [
        "¬q→¬p.",
        "q→p.",
        "¬p→¬q."
      ],
      "correct": 0,
      "why": "A contraposição troca antecedente e consequente e nega os dois."
    }
  },
  "regras_inferencia": {
    "objective": "Aplicar modus ponens, modus tollens, silogismos hipotético e disjuntivo, introdução e eliminação de conjunção e disjunção e dupla negação em provas justificadas.",
    "sections": [
      {
        "heading": "Condicionais dão duas regras diferentes",
        "paragraphs": [
          "O modus ponens usa p→q e p para concluir q; o modus tollens usa p→q e ¬q para concluir ¬p. A segunda regra é válida porque p verdadeira e q falsa tornariam a condicional falsa. Não se deve trocar modus tollens pela falácia de negar o antecedente.",
          "Exemplo: “Se o acesso foi liberado, há um registro de autorização”. Se não há registro, podemos concluir que o acesso não foi liberado, assumidas as premissas. Mas de “não liberado” não segue “sem registro”, pois pode haver registros por outros motivos."
        ]
      },
      {
        "heading": "Silogismos combinam alternativas e cadeias",
        "paragraphs": [
          "O silogismo hipotético encadeia p→q e q→r para concluir p→r. O silogismo disjuntivo combina p∨q e ¬p para concluir q. Como a disjunção é inclusiva, de p∨q e p não podemos inferir ¬q: ambas podem ser verdadeiras.",
          "Em cada situação, identifique todas as premissas utilizadas. Uma regra só autoriza a conclusão se suas condições estiverem presentes. O método é acompanhar dependências entre linhas, sem confundir plausibilidade com derivação."
        ]
      },
      {
        "heading": "Construindo linhas adicionais",
        "paragraphs": [
          "Da conjunção p∧q podemos extrair p ou q (eliminação de ∧); de duas linhas p e q podemos obter p∧q (introdução de ∧). De p é lícito obter p∨r (introdução de ∨), mas não concluir r isoladamente.",
          "Na lógica clássica, de ¬¬p podemos concluir p por eliminação da dupla negação. A regra deve ser identificada pelo nome e suas linhas de origem. Aulas posteriores poderão combinar vários passos em demonstrações mais longas."
        ]
      }
    ],
    "misconception": "Modus tollens é p→q, ¬q, logo ¬p; não é p→q, ¬p, logo ¬q. A disjunção inclusiva também não permite negar a outra alternativa apenas porque uma é verdadeira.",
    "summary": "Use MP, MT, silogismos e regras de ∧, ∨ e dupla negação somente quando as premissas requeridas estiverem disponíveis. Uma prova registra cada conclusão e sua justificativa.",
    "check": {
      "question": "De p→q e ¬q podemos concluir:",
      "options": [
        "¬p, por modus tollens.",
        "p, por modus ponens.",
        "q, por silogismo disjuntivo."
      ],
      "correct": 0,
      "why": "Se p fosse verdadeira, q teria de ser verdadeira, contrariando ¬q."
    }
  },
  "negacao_quantificadores": {
    "objective": "Transformar ¬∀x P(x) em ∃x¬P(x), e ¬∃x P(x) em ∀x¬P(x), mantendo o escopo de quantificadores e distinguindo casos vazios.",
    "sections": [
      {
        "heading": "Negar ‘todos’ exige um contraexemplo",
        "paragraphs": [
          "A negação de “Todos os estudantes receberam o comunicado” não significa “Nenhum estudante recebeu”. Significa que existe ao menos um estudante que não recebeu. Formalmente, ¬∀x P(x)≡∃x¬P(x), dentro do domínio especificado.",
          "Para verificar, imagine uma turma com três estudantes: dois receberam e um não. A sentença universal é falsa e sua negação verdadeira. Isso basta para demonstrar a necessidade de ao menos um contraexemplo, sem exigir que todos falhem."
        ]
      },
      {
        "heading": "Negar ‘existe’ exclui todos os casos",
        "paragraphs": [
          "A negação de “Algum estudante foi selecionado” é “Nenhum estudante foi selecionado”. Formalmente, ¬∃x P(x)≡∀x¬P(x). A passagem troca o quantificador e nega a propriedade dentro de seu escopo.",
          "Uma negação não muda arbitrariamente o grupo estudado. Se x varia sobre estudantes e P(x) significa “entregou o trabalho”, ¬∃xP(x) afirma ausência de estudantes que o entregaram. Não afirma que ninguém no mundo inteiro entregou qualquer trabalho."
        ]
      },
      {
        "heading": "Escopos diferentes produzem afirmações diferentes",
        "paragraphs": [
          "As sentenças ¬∀x(P(x)→Q(x)) e ∀x(P(x)→¬Q(x)) não possuem o mesmo significado. A primeira afirma existir ao menos um P que não seja Q; a segunda exige que nenhum P seja Q. Uma troca indevida de escopo fortalece a afirmação.",
          "Em problemas com quantificadores aninhados, negue de fora para dentro, trocando ∀ por ∃ em cada etapa e empurrando a negação sobre a fórmula interna. Declare sempre o domínio, pois a interpretação de universais com domínio vazio depende da convenção usada."
        ]
      }
    ],
    "misconception": "Negar uma universal não cria uma universal negativa. ‘Nem todos’ significa existir pelo menos um contraexemplo; ‘nenhum’ significa não existir testemunha favorável.",
    "summary": "¬∀xP(x)≡∃x¬P(x) e ¬∃xP(x)≡∀x¬P(x). A negação troca o quantificador e nega o predicado dentro de seu escopo. Mantenha o mesmo domínio e não transforme um contraexemplo em uma universal negativa.",
    "check": {
      "question": "Como negar ‘Todos os membros participaram’?",
      "options": [
        "Ao menos um membro não participou.",
        "Nenhum membro participou.",
        "Todos os membros não participaram necessariamente."
      ],
      "correct": 0,
      "why": "Um único membro ausente basta para refutar a afirmação universal."
    }
  }
};
export const GAP_WORKED_A={
  "condicionais_naturais": {
    "context": "“O laboratório terá atendimento, a menos que o prédio fique sem energia.” Seja p=ter atendimento; q=faltar energia.",
    "steps": [
      {
        "formal": "Identifique o caso condicionado.",
        "concrete": "A expressão apresenta a ausência da falha (¬q) como condição para a realização do atendimento p.",
        "reason": "Não acrescente ao texto uma regra de que faltar energia sempre impede todo atendimento."
      },
      {
        "formal": "Traduza a relação mínima.",
        "concrete": "Escreva ¬q→p. Na tabela clássica, isso coincide com q∨p, uma disjunção inclusiva.",
        "reason": "A disjunção admite que a falha ocorra e ainda assim haja atendimento por algum recurso alternativo."
      },
      {
        "formal": "Teste uma interpretação indevida.",
        "concrete": "q→¬p seria falsa se faltasse energia, mas o prédio ainda atendesse com gerador.",
        "reason": "Uma situação plausível compatível com a frase inicial refuta a conclusão adicional de fechamento inevitável."
      }
    ],
    "check": {
      "question": "Qual fórmula exprime a leitura mínima de ‘p a menos que q’?",
      "options": [
        "¬q→p.",
        "q→¬p.",
        "p→¬q."
      ],
      "correct": 0,
      "why": "A expressão requer p quando q não ocorre; não estabelece exclusividade entre p e q."
    }
  },
  "equiv_algebra": {
    "context": "Simplifique p∨(p∧q) sem recorrer à escolha arbitrária de valores.",
    "steps": [
      {
        "formal": "Encontre a repetição.",
        "concrete": "O termo p aparece como alternativa isolada e também como condição necessária da parcela p∧q.",
        "reason": "A absorção depende dessa repetição estrutural, não de um valor escolhido de p."
      },
      {
        "formal": "Aplique a lei de absorção.",
        "concrete": "Substitua p∨(p∧q) por p e identifique a lei usada: A∨(A∧B)≡A.",
        "reason": "A fórmula final conserva o valor para qualquer interpretação de p e q."
      },
      {
        "formal": "Confirme com os casos de p.",
        "concrete": "Quando p=V, a disjunção é V; quando p=F, p∧q é F e a disjunção também é F.",
        "reason": "Os dois casos esgotam os valores clássicos possíveis de p e confirmam a equivalência."
      }
    ],
    "check": {
      "question": "Qual lei transforma p∧(q∨r) em (p∧q)∨(p∧r)?",
      "options": [
        "Distributividade.",
        "Absorção.",
        "Dupla negação."
      ],
      "correct": 0,
      "why": "A parcela p é repetida nas duas conjunções resultantes."
    }
  },
  "equiv_condicionais": {
    "context": "Parta de p↔q e reescreva o bicondicional usando somente ¬, ∨ e ∧.",
    "steps": [
      {
        "formal": "Expanda as duas direções.",
        "concrete": "p↔q ≡ (p→q)∧(q→p), porque o bicondicional exige a ida e a volta.",
        "reason": "Uma condicional isolada é insuficiente para representar ↔."
      },
      {
        "formal": "Elimine a primeira condicional.",
        "concrete": "(p→q)∧(q→p) ≡ (¬p∨q)∧(q→p).",
        "reason": "A transformação substitui apenas a primeira subfórmula sem alterar o restante."
      },
      {
        "formal": "Elimine a segunda condicional.",
        "concrete": "Obtemos (¬p∨q)∧(¬q∨p), equivalente a p↔q em todas as linhas.",
        "reason": "Preservar a conjunção entre direções é necessário para manter a equivalência."
      }
    ],
    "check": {
      "question": "A negação de p→q é equivalente a:",
      "options": [
        "p∧¬q.",
        "¬p∨q.",
        "¬p→¬q."
      ],
      "correct": 0,
      "why": "Negar a condicional seleciona exatamente o contraexemplo com p verdadeiro e q falso."
    }
  },
  "regras_inferencia": {
    "context": "Regras de um sistema: p→q; q→r; ¬r. Demonstre ¬p em etapas.",
    "steps": [
      {
        "formal": "Use a última condicional e a negação do consequente.",
        "concrete": "De q→r e ¬r, obtenha ¬q por modus tollens.",
        "reason": "A falsidade de r impede que q seja verdadeira sob a segunda condicional."
      },
      {
        "formal": "Retorne à primeira condicional.",
        "concrete": "De p→q e ¬q, obtenha ¬p, novamente por modus tollens.",
        "reason": "Aplicamos a mesma regra a uma subcadeia anterior."
      },
      {
        "formal": "Revise dependências.",
        "concrete": "As duas aplicações usam premissas já disponíveis; nenhuma delas presume a recíproca de uma condicional.",
        "reason": "Uma prova válida explicita de quais linhas saiu cada resultado."
      }
    ],
    "check": {
      "question": "De p∨q e ¬p, qual regra fornece q?",
      "options": [
        "Silogismo disjuntivo.",
        "Afirmação do consequente.",
        "Comutatividade apenas."
      ],
      "correct": 0,
      "why": "Se a disjunção é verdadeira e p é falsa, q necessariamente é verdadeira."
    }
  },
  "negacao_quantificadores": {
    "context": "Negue ‘Todos os funcionários receberam o aviso’ e ‘Algum funcionário recebeu o aviso’.",
    "steps": [
      {
        "formal": "Fixe domínio e predicado.",
        "concrete": "O domínio são funcionários; R(x) significa que x recebeu o aviso. A universal é ∀x R(x).",
        "reason": "A variável percorre apenas o domínio declarado, evitando conclusões sobre pessoas externas."
      },
      {
        "formal": "Negue a universal.",
        "concrete": "¬∀x R(x)≡∃x¬R(x): existe funcionário que não recebeu.",
        "reason": "Negar todos pede um contraexemplo, não ausência total de recebimento."
      },
      {
        "formal": "Negue a existencial.",
        "concrete": "¬∃x R(x)≡∀x¬R(x): nenhum funcionário recebeu.",
        "reason": "A inexistência de qualquer testemunha exige a negação da propriedade em todos os membros."
      }
    ],
    "check": {
      "question": "A negação de ‘Existe estudante que passou’ é:",
      "options": [
        "Nenhum estudante passou.",
        "Existe estudante que não passou.",
        "Todos os estudantes passaram."
      ],
      "correct": 0,
      "why": "Para negar uma existencial é preciso excluir todos os casos que satisfazem a propriedade."
    }
  }
};
