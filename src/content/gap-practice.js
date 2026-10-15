/** Casos próprios de prática, independentes das perguntas somativas. */
export const GAP_PRACTICE={
  "condicionais_naturais": [
    {
      "question": "“Irei à biblioteca se houver aula.” Qual evento é suficiente para a ida?",
      "options": [
        "Haver aula.",
        "Haver biblioteca.",
        "A ida já ter acontecido."
      ],
      "correct": 0,
      "why": "A condição introduzida por “se” funciona como antecedente suficiente."
    },
    {
      "question": "“Irei apenas se houver transporte.” Qual evento é necessário?",
      "options": [
        "Haver transporte.",
        "Não haver transporte.",
        "A ida ao local."
      ],
      "correct": 0,
      "why": "A construção “apenas se” informa condição necessária."
    },
    {
      "question": "“A feira ocorrerá, a menos que chova.” Quando a feira é garantida?",
      "options": [
        "Quando não chover.",
        "Quando chover.",
        "Quando não houver feira."
      ],
      "correct": 0,
      "why": "Na leitura mínima, a ausência da exceção força o acontecimento."
    },
    {
      "question": "Com p→q, p=F e q=V, a frase é:",
      "options": [
        "Verdadeira.",
        "Falsa.",
        "Uma regra de bicondicional."
      ],
      "correct": 0,
      "why": "A condicional material só é falsa quando p é V e q é F."
    },
    {
      "question": "'p a menos que q' aceita os dois eventos juntos?",
      "options": [
        "Sim, na leitura mínima inclusiva.",
        "Não, isso é proibido por definição.",
        "Somente se p for negada."
      ],
      "correct": 0,
      "why": "¬q→p não exclui p∧q."
    },
    {
      "question": "“p só se q” permite concluir p a partir de q?",
      "options": [
        "Não, não foi afirmada suficiência de q.",
        "Sim, porque q é requisito.",
        "Sim, porque condição necessária sempre basta."
      ],
      "correct": 0,
      "why": "Ter o requisito não assegura que o evento dependente ocorreu."
    }
  ],
  "equiv_algebra": [
    {
      "question": "Troque a ordem de p∨q mantendo equivalência.",
      "options": [
        "q∨p.",
        "q∧p.",
        "q→p."
      ],
      "correct": 0,
      "why": "A comutatividade preserva ∨."
    },
    {
      "question": "Reagrupe (p∧q)∧r.",
      "options": [
        "p∧(q∧r).",
        "p∧(q∨r).",
        "p∨(q∧r)."
      ],
      "correct": 0,
      "why": "A associatividade usa ∧ nas duas operações."
    },
    {
      "question": "Expanda q∧(p∨r).",
      "options": [
        "(q∧p)∨(q∧r).",
        "(q∨p)∧r.",
        "q∧p∨r sem parênteses justificativos."
      ],
      "correct": 0,
      "why": "O termo q é distribuído a cada ramo de ∨."
    },
    {
      "question": "Simplifique r∨(r∧p).",
      "options": [
        "r.",
        "p.",
        "r∧p."
      ],
      "correct": 0,
      "why": "A absorção torna redundante o segundo ramo."
    },
    {
      "question": "Qual lei é necessária para p∨(q∧r)?",
      "options": [
        "Distributividade.",
        "Contraposição.",
        "Modus ponens."
      ],
      "correct": 0,
      "why": "A disjunção pode ser distribuída aos dois termos internos de ∧."
    },
    {
      "question": "De q∧(q∨p) obtemos:",
      "options": [
        "q.",
        "p.",
        "q∨p."
      ],
      "correct": 0,
      "why": "A conjunção absorve a disjunção que contém q."
    }
  ],
  "equiv_condicionais": [
    {
      "question": "Qual a contrapositiva de q→r?",
      "options": [
        "¬r→¬q.",
        "r→q.",
        "¬q→¬r."
      ],
      "correct": 0,
      "why": "A ordem é invertida e os dois lados são negados."
    },
    {
      "question": "Qual é a recíproca indevida de p→q?",
      "options": [
        "q→p.",
        "¬q→¬p.",
        "¬p∨q."
      ],
      "correct": 0,
      "why": "Trocar sem negar não preserva equivalência em geral."
    },
    {
      "question": "Expanda r↔p.",
      "options": [
        "(r→p)∧(p→r).",
        "(r→p)∨(p→r).",
        "r∧¬p."
      ],
      "correct": 0,
      "why": "Bicondicional exige ambas as direções."
    },
    {
      "question": "Negue q→r.",
      "options": [
        "q∧¬r.",
        "¬q∨r.",
        "¬q→¬r."
      ],
      "correct": 0,
      "why": "A condicional falha com antecedente verdadeiro e consequente falso."
    },
    {
      "question": "Complete (p→q) ≡ ...",
      "options": [
        "¬p∨q.",
        "p∧¬q.",
        "q→p."
      ],
      "correct": 0,
      "why": "Eliminação de condicional mantém a mesma tabela."
    },
    {
      "question": "De ¬(r→p) conclua a forma equivalente.",
      "options": [
        "r∧¬p.",
        "¬r∨p.",
        "r→¬p."
      ],
      "correct": 0,
      "why": "A negação seleciona o contraexemplo à implicação."
    }
  ],
  "regras_inferencia": [
    {
      "question": "Se p→q e ¬q, conclua:",
      "options": [
        "¬p.",
        "p.",
        "q."
      ],
      "correct": 0,
      "why": "Modus tollens elimina a possibilidade de antecedente verdadeiro."
    },
    {
      "question": "Se há acesso, há autorização. Não houve autorização. Logo:",
      "options": [
        "Não houve acesso.",
        "Houve acesso.",
        "Houve autorização."
      ],
      "correct": 0,
      "why": "Nega-se o consequente para inferir a negação do antecedente."
    },
    {
      "question": "Com p∨q e ¬q, obtenha:",
      "options": [
        "p.",
        "¬p.",
        "p∧q."
      ],
      "correct": 0,
      "why": "O silogismo disjuntivo exclui a alternativa negada."
    },
    {
      "question": "De p e q podemos registrar:",
      "options": [
        "p∧q.",
        "¬p.",
        "p→¬q."
      ],
      "correct": 0,
      "why": "A introdução de conjunção reúne fórmulas já estabelecidas."
    },
    {
      "question": "De ¬¬r em lógica clássica obtemos:",
      "options": [
        "r.",
        "¬r.",
        "r∧¬r."
      ],
      "correct": 0,
      "why": "A eliminação da dupla negação remove o par de negações."
    },
    {
      "question": "De p podemos registrar p∨r por:",
      "options": [
        "Introdução da disjunção.",
        "Modus tollens.",
        "Afirmação do consequente."
      ],
      "correct": 0,
      "why": "Uma disjunção inclusiva vale sempre que p vale."
    }
  ],
  "negacao_quantificadores": [
    {
      "question": "Negue ‘Todos chegaram’.",
      "options": [
        "Alguém não chegou.",
        "Ninguém chegou.",
        "Todos não chegaram necessariamente."
      ],
      "correct": 0,
      "why": "Um contraexemplo basta para negar universal."
    },
    {
      "question": "Negue ‘Existe livro raro’.",
      "options": [
        "Nenhum livro é raro.",
        "Existe livro não raro.",
        "Todo livro é raro."
      ],
      "correct": 0,
      "why": "A negação de ∃ exige ausência completa de testemunhas."
    },
    {
      "question": "Transforme ¬∀xQ(x).",
      "options": [
        "∃x¬Q(x).",
        "∀x¬Q(x).",
        "∃xQ(x)."
      ],
      "correct": 0,
      "why": "Troque ∀ por ∃ e negue o predicado."
    },
    {
      "question": "Transforme ¬∃xQ(x).",
      "options": [
        "∀x¬Q(x).",
        "∃x¬Q(x).",
        "∀xQ(x)."
      ],
      "correct": 0,
      "why": "A inexistência de Q exige ¬Q em todos os membros."
    },
    {
      "question": "‘Nem todos os estudantes passaram’ garante:",
      "options": [
        "Algum estudante não passou.",
        "Nenhum estudante passou.",
        "Todos passaram."
      ],
      "correct": 0,
      "why": "A frase nega uma universal, não afirma uma universal negativa."
    },
    {
      "question": "A negação de ‘Alguma porta está aberta’ afirma:",
      "options": [
        "Nenhuma porta está aberta.",
        "Alguma porta está fechada apenas.",
        "Todas as portas estão abertas."
      ],
      "correct": 0,
      "why": "Negar a existência de uma porta aberta significa que todas estão fechadas."
    }
  ],
  "medicao_evidencias": [
    {
      "question": "O termômetro registra sempre dois graus acima do padrão. O problema é:",
      "options": [
        "Erro sistemático de medição.",
        "Viés de seleção de participantes.",
        "Amostra necessariamente pequena."
      ],
      "correct": 0,
      "why": "O desvio se repete para cada leitura."
    },
    {
      "question": "Um instrumento alterna entre 10, 15 e 20 para padrão 15. O que investigar?",
      "options": [
        "Dispersão e repetibilidade.",
        "Somente o tamanho da população.",
        "As condições de uma implicação."
      ],
      "correct": 0,
      "why": "Variação elevada exige examinar precisão."
    },
    {
      "question": "Calibrar significa:",
      "options": [
        "Comparar a medida com referência conhecida.",
        "Escolher mais respondentes.",
        "Arredondar tudo para cima."
      ],
      "correct": 0,
      "why": "Um padrão informa o desvio do instrumento."
    },
    {
      "question": "Questionário sorteia pessoas aleatoriamente, mas faz pergunta tendenciosa.",
      "options": [
        "Pode haver viés de medição.",
        "A seleção aleatória elimina toda distorção.",
        "Os resultados viram prova causal."
      ],
      "correct": 0,
      "why": "A redação pode deslocar as respostas apesar da boa amostragem."
    },
    {
      "question": "Muitas leituras próximas, todas acima do padrão, indicam:",
      "options": [
        "Precisão sem boa exatidão.",
        "Exatidão garantida.",
        "Ausência de erro."
      ],
      "correct": 0,
      "why": "Pouca dispersão e deslocamento podem coexistir."
    },
    {
      "question": "Qual ajuste combate viés sistemático?",
      "options": [
        "Recalibração e verificação com padrão.",
        "Apenas mais medições.",
        "Somente mudar o tipo de gráfico."
      ],
      "correct": 0,
      "why": "O problema está na referência do instrumento."
    }
  ],
  "medias_ponderadas": [
    {
      "question": "Dez pessoas apresentam 100% e noventa 0%. Qual taxa geral?",
      "options": [
        "10%.",
        "50%.",
        "100%."
      ],
      "correct": 0,
      "why": "Dez casos positivos em cem pessoas correspondem a dez por cento."
    },
    {
      "question": "Dois grupos de 50 têm taxas 80% e 60%. Total?",
      "options": [
        "70%.",
        "60%.",
        "80%."
      ],
      "correct": 0,
      "why": "Pesos iguais permitem média simples."
    },
    {
      "question": "Uma média ponderada das taxas 20% e 50% pode ser 70%?",
      "options": [
        "Não, se são os únicos grupos com pesos não negativos.",
        "Sim, sempre.",
        "Sim, se o grupo menor for omitido do denominador."
      ],
      "correct": 0,
      "why": "A média deve ficar entre as taxas componentes declaradas."
    },
    {
      "question": "Um grupo muito maior domina a taxa total porque:",
      "options": [
        "Seu denominador recebe peso maior.",
        "A taxa menor é sempre falsa.",
        "Não há ponderação de grupos."
      ],
      "correct": 0,
      "why": "O agregado usa contagens, não a média simples das porcentagens."
    },
    {
      "question": "Uma clínica concentra casos graves. Qual estratificação é útil?",
      "options": [
        "Separar casos por gravidade.",
        "Separar apenas por mês do anúncio.",
        "Ignorar as pessoas não recuperadas."
      ],
      "correct": 0,
      "why": "Composição de gravidade pode explicar uma diferença agregada."
    },
    {
      "question": "A comparação por estratos favorece B e a taxa geral favorece A. O que investigar?",
      "options": [
        "Pesos e seleção de casos.",
        "Somente erros de digitação.",
        "Se percentuais são proibidos."
      ],
      "correct": 0,
      "why": "O paradoxo de Simpson surge da distribuição dos subgrupos."
    }
  ],
  "temporal_composta": [
    {
      "question": "Para G(p→Fq), avalie antes:",
      "options": [
        "Fq em cada instante.",
        "Somente Gp.",
        "A existência de p no instante inicial."
      ],
      "correct": 0,
      "why": "O operador interno precisa ser calculado localmente."
    },
    {
      "question": "Em F(Gp), o operador externo procura:",
      "options": [
        "Um instante em que Gp valha.",
        "Todos os instantes anteriores.",
        "Somente o próximo estado."
      ],
      "correct": 0,
      "why": "F é eventualidade desde o instante atual."
    },
    {
      "question": "Traço p: F,V,V. F(Gp) em t0 vale:",
      "options": [
        "V.",
        "F.",
        "Indeterminado."
      ],
      "correct": 0,
      "why": "A partir de t1, p permanece verdadeira."
    },
    {
      "question": "Traço p: V,F,F. G(Fp) em t0 vale:",
      "options": [
        "F.",
        "V.",
        "Indeterminado."
      ],
      "correct": 0,
      "why": "No último instante Fp é falso."
    },
    {
      "question": "Se p ocorre em t0 e q só em t2, G(p→Fq) pode ser:",
      "options": [
        "V se não houver outras ocorrências de p sem q posterior.",
        "F necessariamente.",
        "Indeterminado por falta de definição de F."
      ],
      "correct": 0,
      "why": "A ocorrência inicial de p tem testemunha q futura."
    },
    {
      "question": "No último estado, X(Fp) vale:",
      "options": [
        "F na convenção forte de próximo estado.",
        "V por vacuidade.",
        "Igual a p."
      ],
      "correct": 0,
      "why": "O operador X necessita de um próximo instante."
    }
  ],
  "fde_operacoes": [
    {
      "question": "Se p=T, qual é ¬p?",
      "options": [
        "F.",
        "B.",
        "N."
      ],
      "correct": 0,
      "why": "A negação troca os componentes (1,0) e (0,1)."
    },
    {
      "question": "Se p=B, qual é ¬p?",
      "options": [
        "B.",
        "F.",
        "T."
      ],
      "correct": 0,
      "why": "Os dois suportes são permutados e permanecem presentes."
    },
    {
      "question": "Se p=N, qual é ¬p?",
      "options": [
        "N.",
        "F.",
        "T."
      ],
      "correct": 0,
      "why": "A falta dos dois suportes permanece após a troca."
    },
    {
      "question": "Se p=T e q=N, qual é p∧q?",
      "options": [
        "N.",
        "T.",
        "B."
      ],
      "correct": 0,
      "why": "O positivo da conjunção exige ambos; nenhum termo fornece negativo."
    },
    {
      "question": "Se p=T e q=N, qual é p∨q?",
      "options": [
        "T.",
        "N.",
        "F."
      ],
      "correct": 0,
      "why": "p tem positivo e nenhum termo fornece negativo conjunto."
    },
    {
      "question": "Se p=F e q=N, qual é p∧q?",
      "options": [
        "F.",
        "N.",
        "T."
      ],
      "correct": 0,
      "why": "A conjunção recebe negativo de p e não recebe positivo dos dois."
    }
  ],
  "intuicionista_negacao": [
    {
      "question": "Se w0 não força p, já podemos afirmar ¬p?",
      "options": [
        "Não, p pode ser demonstrada numa extensão.",
        "Sim, é o princípio construtivo básico.",
        "Sim, toda ausência é contradição."
      ],
      "correct": 0,
      "why": "A negação exige excluir p em todas as extensões."
    },
    {
      "question": "Em uma extensão w1 p foi demonstrada. Isso afeta ¬p em w0?",
      "options": [
        "Sim, impede forçar ¬p em w0.",
        "Não, mundos não se relacionam.",
        "Sim, ¬p passa a valer por probabilidade."
      ],
      "correct": 0,
      "why": "A extensão com p contradiz sua impossibilidade futura."
    },
    {
      "question": "De prova de p segue:",
      "options": [
        "¬¬p.",
        "¬p.",
        "p∨¬p ser sempre falso."
      ],
      "correct": 0,
      "why": "Uma prova de p impede prova consistente de ¬p."
    },
    {
      "question": "De ¬¬p segue sempre prova de p em intuicionismo?",
      "options": [
        "Não.",
        "Sim.",
        "Somente se houver duas variáveis."
      ],
      "correct": 0,
      "why": "A eliminação universal da dupla negação é clássica."
    },
    {
      "question": "A fórmula ¬¬(p∨¬p) é:",
      "options": [
        "Demonstrável intuicionisticamente.",
        "A mesma coisa que p∨¬p.",
        "Sempre uma contradição."
      ],
      "correct": 0,
      "why": "A impossibilidade de sua negação é demonstrável sem construir um lado."
    },
    {
      "question": "Provar p∨q construtivamente exige:",
      "options": [
        "Provar um dos lados.",
        "Não provar nenhuma negação.",
        "Exibir uma frequência acima de 50%."
      ],
      "correct": 0,
      "why": "Disjunção exige testemunha de p ou de q."
    }
  ]
};
