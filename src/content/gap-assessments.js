/** Questões suplementares independentes, separadas das formativas e da prática. */
export const GAP_ASSESSMENTS={
  "condicionais_naturais": [
    {
      "question": "A expressão 'p somente se q' exige:",
      "options": [
        "q como condição necessária para p.",
        "p como condição necessária para q.",
        "p e q como eventos exclusivos."
      ],
      "correct": 0,
      "why": "A necessidade de q significa p→q.",
      "dimension": "concept",
      "objective": "Identificação de regra ensinada"
    },
    {
      "question": "A expressão 'p se q' apresenta:",
      "options": [
        "q como condição suficiente para p.",
        "p como condição suficiente para q.",
        "duas afirmações independentes."
      ],
      "correct": 0,
      "why": "Na condição q→p, realizar q obriga p.",
      "dimension": "concept",
      "objective": "Identificação de regra ensinada"
    },
    {
      "question": "Na leitura mínima, 'p a menos que q' equivale a:",
      "options": [
        "¬q→p.",
        "q→¬p.",
        "p→¬q."
      ],
      "correct": 0,
      "why": "A ausência da exceção exige o acontecimento.",
      "dimension": "concept",
      "objective": "Identificação de regra ensinada"
    },
    {
      "question": "Uma condicional p→q é falsa precisamente quando:",
      "options": [
        "p=V e q=F.",
        "p=F e q=V.",
        "p=F e q=F."
      ],
      "correct": 0,
      "why": "Somente um antecedente realizado sem consequente refuta a regra.",
      "dimension": "concept",
      "objective": "Identificação de regra ensinada"
    },
    {
      "question": "'Abrirei se houver transporte.' A formalização correta é:",
      "options": [
        "transporte→abertura.",
        "abertura→transporte.",
        "transporte↔abertura."
      ],
      "correct": 0,
      "why": "A oferta de transporte basta para a abertura anunciada.",
      "dimension": "application",
      "objective": "Aplicação independente de regra ensinada"
    },
    {
      "question": "'Entrarei somente se tiver ingresso.' Pode ocorrer ingresso sem entrada?",
      "options": [
        "Sim, porque o ingresso é necessário mas não suficiente.",
        "Não, ingresso garante entrada.",
        "Não, a frase exige duas direções."
      ],
      "correct": 0,
      "why": "A condicional entrada→ingresso não impõe entrada a quem possui ingresso.",
      "dimension": "application",
      "objective": "Aplicação independente de regra ensinada"
    },
    {
      "question": "'Teremos prova, a menos que a escola feche.' Se a escola não fecha:",
      "options": [
        "A prova ocorrerá segundo a condição.",
        "A prova necessariamente não ocorre.",
        "O fechamento precisa ocorrer."
      ],
      "correct": 0,
      "why": "A regra expressa ausência de exceção→ocorrência.",
      "dimension": "application",
      "objective": "Aplicação independente de regra ensinada"
    },
    {
      "question": "De 'p a menos que q' é incorreto concluir:",
      "options": [
        "q→¬p sem informação adicional.",
        "¬q→p.",
        "p∨q na semântica clássica."
      ],
      "correct": 0,
      "why": "A exceção pode ocorrer e ainda assim p ser verdadeira.",
      "dimension": "application",
      "objective": "Aplicação independente de regra ensinada"
    }
  ],
  "equiv_algebra": [
    {
      "question": "Comutatividade preserva:",
      "options": [
        "o conectivo, trocando a ordem dos termos.",
        "a posição do conectivo, trocando ∧ por →.",
        "somente o valor numa linha."
      ],
      "correct": 0,
      "why": "Comutatividade reorganiza parcelas sem mudar a operação.",
      "dimension": "concept",
      "objective": "Identificação de regra ensinada"
    },
    {
      "question": "A associatividade é aplicável diretamente a:",
      "options": [
        "(p∧q)∧r.",
        "p∧(q∨r) como p∧q∨r.",
        "p→(q∧r) como (p→q)∧r."
      ],
      "correct": 0,
      "why": "Reagrupar conjunções da mesma operação conserva os valores.",
      "dimension": "concept",
      "objective": "Identificação de regra ensinada"
    },
    {
      "question": "Distributividade de ∧ sobre ∨ exige:",
      "options": [
        "repetir a parcela externa nos dois ramos.",
        "remover uma das alternativas.",
        "trocar todas as letras por negações."
      ],
      "correct": 0,
      "why": "p∧(q∨r) vira (p∧q)∨(p∧r).",
      "dimension": "concept",
      "objective": "Identificação de regra ensinada"
    },
    {
      "question": "A lei da absorção é usada quando:",
      "options": [
        "uma parcela reaparece dentro de uma operação redundante.",
        "os termos de uma condicional são invertidos.",
        "todos os conectivos são negados."
      ],
      "correct": 0,
      "why": "A∨(A∧B) equivale a A pela repetição da parcela.",
      "dimension": "concept",
      "objective": "Identificação de regra ensinada"
    },
    {
      "question": "De q∨p por comutatividade resulta:",
      "options": [
        "p∨q.",
        "p∧q.",
        "¬p∨q."
      ],
      "correct": 0,
      "why": "A troca de ordem mantém a disjunção.",
      "dimension": "application",
      "objective": "Aplicação independente de regra ensinada"
    },
    {
      "question": "Por associatividade, p∨(q∨r) equivale a:",
      "options": [
        "(p∨q)∨r.",
        "(p∧q)∨r.",
        "(p∨q)∧r."
      ],
      "correct": 0,
      "why": "Apenas o agrupamento de disjunções muda.",
      "dimension": "application",
      "objective": "Aplicação independente de regra ensinada"
    },
    {
      "question": "A distributividade transforma p∨(q∧r) em:",
      "options": [
        "(p∨q)∧(p∨r).",
        "(p∨q)∧r.",
        "(p∧q)∨(p∧r)."
      ],
      "correct": 0,
      "why": "A parcela p é distribuída aos dois termos da conjunção.",
      "dimension": "application",
      "objective": "Aplicação independente de regra ensinada"
    },
    {
      "question": "Simplifique q∧(q∨r):",
      "options": [
        "q.",
        "r.",
        "q∨r."
      ],
      "correct": 0,
      "why": "A parte repetida q absorve a disjunção interna.",
      "dimension": "application",
      "objective": "Aplicação independente de regra ensinada"
    }
  ],
  "equiv_condicionais": [
    {
      "question": "Uma contrapositiva válida de p→q é:",
      "options": [
        "¬q→¬p.",
        "q→p.",
        "¬p→¬q."
      ],
      "correct": 0,
      "why": "Contraposição troca e nega ambas as partes.",
      "dimension": "concept",
      "objective": "Identificação de regra ensinada"
    },
    {
      "question": "A recíproca q→p de p→q:",
      "options": [
        "não é equivalente em geral.",
        "é sempre a mesma fórmula.",
        "é a contrapositiva por definição."
      ],
      "correct": 0,
      "why": "A recíproca troca as partes sem negar, podendo mudar a tabela.",
      "dimension": "concept",
      "objective": "Identificação de regra ensinada"
    },
    {
      "question": "O bicondicional p↔q exige:",
      "options": [
        "as duas implicações p→q e q→p.",
        "apenas uma das implicações.",
        "apenas o antecedente p."
      ],
      "correct": 0,
      "why": "É a conjunção das duas direções necessárias e suficientes.",
      "dimension": "concept",
      "objective": "Identificação de regra ensinada"
    },
    {
      "question": "A negação de p→q é satisfeita quando:",
      "options": [
        "p=V e q=F.",
        "p=F e q=V.",
        "p=q=F."
      ],
      "correct": 0,
      "why": "Essa é a única linha em que a condicional material falha.",
      "dimension": "concept",
      "objective": "Identificação de regra ensinada"
    },
    {
      "question": "A contrapositiva de 'Se chover, a rua molha' é:",
      "options": [
        "Se a rua não molhar, não choveu.",
        "Se a rua molhar, choveu.",
        "Se não chover, a rua não molha."
      ],
      "correct": 0,
      "why": "A contrapositiva nega e troca consequente e antecedente.",
      "dimension": "application",
      "objective": "Aplicação independente de regra ensinada"
    },
    {
      "question": "p↔q, sem ↔, é:",
      "options": [
        "(p→q)∧(q→p).",
        "(p→q)∨(q→p).",
        "(p→q)∧(p→q)."
      ],
      "correct": 0,
      "why": "Ambas as direções devem valer simultaneamente.",
      "dimension": "application",
      "objective": "Aplicação independente de regra ensinada"
    },
    {
      "question": "Qual condição faz ¬(p→q) ser verdadeira?",
      "options": [
        "p∧¬q.",
        "¬p∨q.",
        "¬p∧q."
      ],
      "correct": 0,
      "why": "A negação da condicional descreve seu contraexemplo.",
      "dimension": "application",
      "objective": "Aplicação independente de regra ensinada"
    },
    {
      "question": "A cadeia p↔q ≡ (p→q)∧(q→p) usa:",
      "options": [
        "a definição do bicondicional.",
        "a absorção da disjunção.",
        "a introdução da dupla negação isolada."
      ],
      "correct": 0,
      "why": "A definição exige ida e volta na mesma fórmula.",
      "dimension": "application",
      "objective": "Aplicação independente de regra ensinada"
    }
  ],
  "regras_inferencia": [
    {
      "question": "Modus ponens tem como entrada:",
      "options": [
        "p→q e p.",
        "p→q e ¬q.",
        "p∨q e ¬p."
      ],
      "correct": 0,
      "why": "O antecedente afirmado ativa o consequente da condicional.",
      "dimension": "concept",
      "objective": "Identificação de regra ensinada"
    },
    {
      "question": "Modus tollens tem como entrada:",
      "options": [
        "p→q e ¬q.",
        "p→q e q.",
        "p→q e ¬p."
      ],
      "correct": 0,
      "why": "A negação do consequente exclui o antecedente.",
      "dimension": "concept",
      "objective": "Identificação de regra ensinada"
    },
    {
      "question": "Uma disjunção inclusiva p∨q e ¬p autoriza:",
      "options": [
        "q.",
        "¬q.",
        "p∧q."
      ],
      "correct": 0,
      "why": "O silogismo disjuntivo elimina a alternativa negada.",
      "dimension": "concept",
      "objective": "Identificação de regra ensinada"
    },
    {
      "question": "Na lógica clássica, eliminar dupla negação permite:",
      "options": [
        "de ¬¬p obter p.",
        "de p obter ¬p.",
        "de p→q obter q sem p."
      ],
      "correct": 0,
      "why": "A dupla negação pode ser removida em inferência clássica.",
      "dimension": "concept",
      "objective": "Identificação de regra ensinada"
    },
    {
      "question": "De 'se há matrícula há acesso' e 'não há acesso' segue:",
      "options": [
        "não há matrícula.",
        "há matrícula.",
        "há acesso."
      ],
      "correct": 0,
      "why": "Modus tollens exclui a condição suficiente quando seu efeito é negado.",
      "dimension": "application",
      "objective": "Aplicação independente de regra ensinada"
    },
    {
      "question": "De p e q obtemos p∧q por:",
      "options": [
        "introdução da conjunção.",
        "eliminação da condicional.",
        "modus tollens."
      ],
      "correct": 0,
      "why": "Duas premissas verdadeiras podem ser reunidas numa conjunção.",
      "dimension": "application",
      "objective": "Aplicação independente de regra ensinada"
    },
    {
      "question": "De p∧q, podemos obter q por:",
      "options": [
        "eliminação da conjunção.",
        "afirmação do consequente.",
        "negação do antecedente."
      ],
      "correct": 0,
      "why": "Uma conjunção autoriza cada membro separadamente.",
      "dimension": "application",
      "objective": "Aplicação independente de regra ensinada"
    },
    {
      "question": "De p→q e q→r segue:",
      "options": [
        "p→r.",
        "r→p.",
        "p∧r."
      ],
      "correct": 0,
      "why": "O silogismo hipotético encadeia condicionais na direção correta.",
      "dimension": "application",
      "objective": "Aplicação independente de regra ensinada"
    }
  ],
  "negacao_quantificadores": [
    {
      "question": "A dualidade de ¬∀xP(x) é:",
      "options": [
        "∃x¬P(x).",
        "∀x¬P(x).",
        "∃xP(x)."
      ],
      "correct": 0,
      "why": "Negar todos requer encontrar um caso que não satisfaz P.",
      "dimension": "concept",
      "objective": "Identificação de regra ensinada"
    },
    {
      "question": "A dualidade de ¬∃xP(x) é:",
      "options": [
        "∀x¬P(x).",
        "∃x¬P(x).",
        "∀xP(x)."
      ],
      "correct": 0,
      "why": "Negar alguma testemunha significa nenhuma testemunha permitida.",
      "dimension": "concept",
      "objective": "Identificação de regra ensinada"
    },
    {
      "question": "'Nem todos' afirma:",
      "options": [
        "que existe ao menos um contraexemplo.",
        "que nenhum caso satisfaz a propriedade.",
        "que todos os casos satisfazem a propriedade."
      ],
      "correct": 0,
      "why": "Uma universal é refutada por um caso contrário.",
      "dimension": "concept",
      "objective": "Identificação de regra ensinada"
    },
    {
      "question": "O escopo de ∀x em ∀x(P(x)→Q(x)) é:",
      "options": [
        "toda a condicional entre P e Q.",
        "somente o primeiro símbolo P.",
        "todas as sentenças do texto."
      ],
      "correct": 0,
      "why": "Os parênteses indicam a fórmula regida pelo quantificador.",
      "dimension": "concept",
      "objective": "Identificação de regra ensinada"
    },
    {
      "question": "Negue 'Todos os cães são domésticos':",
      "options": [
        "Existe cão que não é doméstico.",
        "Nenhum cão é doméstico.",
        "Todo animal não é cão."
      ],
      "correct": 0,
      "why": "Uma exceção basta para negar a universal.",
      "dimension": "application",
      "objective": "Aplicação independente de regra ensinada"
    },
    {
      "question": "Negue 'Algum livro está aberto':",
      "options": [
        "Nenhum livro está aberto.",
        "Algum livro está fechado necessariamente.",
        "Todos os livros estão abertos."
      ],
      "correct": 0,
      "why": "A inexistência de livro aberto nega a afirmação existencial.",
      "dimension": "application",
      "objective": "Aplicação independente de regra ensinada"
    },
    {
      "question": "¬∀x(P(x)→Q(x)) admite como testemunha:",
      "options": [
        "um P que não é Q.",
        "um objeto que não é P.",
        "qualquer objeto que é Q."
      ],
      "correct": 0,
      "why": "A condicional é falsa no contraexemplo P e ¬Q.",
      "dimension": "application",
      "objective": "Aplicação independente de regra ensinada"
    },
    {
      "question": "Se ¬∃xP(x) é verdadeira, qual afirmação segue?",
      "options": [
        "∀x¬P(x).",
        "∃xP(x).",
        "∃x¬P(x) em qualquer domínio sem condição."
      ],
      "correct": 0,
      "why": "Não há testemunha de P, logo todo objeto do domínio deixa de satisfazer P.",
      "dimension": "application",
      "objective": "Aplicação independente de regra ensinada"
    }
  ],
  "medicao_evidencias": [
    {
      "question": "Um instrumento preciso é necessariamente exato?",
      "options": [
        "Não, pode repetir medições sistematicamente deslocadas.",
        "Sim, repetição prova correção.",
        "Sim, se for eletrônico."
      ],
      "correct": 0,
      "why": "Precisão ou repetibilidade não garante proximidade ao padrão.",
      "dimension": "concept",
      "objective": "Identificação de regra ensinada"
    },
    {
      "question": "Uma pergunta tendenciosa produz principalmente:",
      "options": [
        "viés de medição.",
        "viés de seleção obrigatoriamente.",
        "uma tautologia."
      ],
      "correct": 0,
      "why": "A formulação influencia a resposta registrada, mesmo se a amostra for aleatória.",
      "dimension": "concept",
      "objective": "Identificação de regra ensinada"
    },
    {
      "question": "Calibração compara a medição com:",
      "options": [
        "referência conhecida.",
        "uma opinião popular.",
        "a maior observação apenas."
      ],
      "correct": 0,
      "why": "Um padrão conhecido permite verificar deslocamento sistemático.",
      "dimension": "concept",
      "objective": "Identificação de regra ensinada"
    },
    {
      "question": "Aumentar o tamanho da amostra sempre corrige instrumento errado?",
      "options": [
        "Não, viés constante pode permanecer.",
        "Sim, a média sempre é exata.",
        "Sim, se a amostra passar de cem."
      ],
      "correct": 0,
      "why": "Repetições não corrigem deslocamento sistemático sem recalibração.",
      "dimension": "concept",
      "objective": "Identificação de regra ensinada"
    },
    {
      "question": "Um termômetro mede 23°C para padrão de 21°C. Ação adequada:",
      "options": [
        "calibrar ou corrigir o desvio.",
        "entrevistar mais participantes.",
        "substituir o eixo do gráfico."
      ],
      "correct": 0,
      "why": "A diferença com o padrão denuncia erro sistemático de medição.",
      "dimension": "application",
      "objective": "Aplicação independente de regra ensinada"
    },
    {
      "question": "Um questionário de voluntários e com perguntas direcionadas possui:",
      "options": [
        "possíveis vieses de seleção e medição.",
        "apenas incerteza matemática desprezível.",
        "necessariamente amostra representativa."
      ],
      "correct": 0,
      "why": "A escolha dos respondentes e o modo de perguntar afetam etapas distintas.",
      "dimension": "application",
      "objective": "Aplicação independente de regra ensinada"
    },
    {
      "question": "Leituras 51,9; 52,0; 52,1 para padrão de 50 indicam:",
      "options": [
        "boa repetibilidade e erro sistemático.",
        "precisão baixa e exatidão perfeita.",
        "ausência de desvio."
      ],
      "correct": 0,
      "why": "Resultados próximos entre si podem estar afastados do valor de referência.",
      "dimension": "application",
      "objective": "Aplicação independente de regra ensinada"
    },
    {
      "question": "Qual intervenção examina viés de medição em entrevistas?",
      "options": [
        "Testar neutralidade da pergunta com procedimento comparativo.",
        "Somente aumentar o número de voluntários.",
        "Excluir os discordantes."
      ],
      "correct": 0,
      "why": "O desenho da medida precisa ser examinado independentemente da seleção.",
      "dimension": "application",
      "objective": "Aplicação independente de regra ensinada"
    }
  ],
  "medias_ponderadas": [
    {
      "question": "Ao agregar taxas com tamanhos de grupos diferentes, devemos:",
      "options": [
        "ponderar por denominadores.",
        "tirar média simples das taxas sem restrição.",
        "escolher a taxa maior."
      ],
      "correct": 0,
      "why": "A taxa total é soma das contagens sobre soma dos denominadores.",
      "dimension": "concept",
      "objective": "Identificação de regra ensinada"
    },
    {
      "question": "Uma média ponderada com pesos não negativos situa-se:",
      "options": [
        "entre o menor e maior valor dos grupos.",
        "sempre acima do maior.",
        "sempre abaixo do menor."
      ],
      "correct": 0,
      "why": "Uma combinação convexa não extrapola os extremos componentes.",
      "dimension": "concept",
      "objective": "Identificação de regra ensinada"
    },
    {
      "question": "O paradoxo de Simpson compara:",
      "options": [
        "taxas por subgrupo e agregados com pesos diferentes.",
        "apenas números sem população.",
        "somente erros aritméticos."
      ],
      "correct": 0,
      "why": "Composição de grupos pode inverter relações entre agregados.",
      "dimension": "concept",
      "objective": "Identificação de regra ensinada"
    },
    {
      "question": "Um agregado de 45% com duas categorias exaustivas de 60% e 80% é:",
      "options": [
        "incompatível com os denominadores e definições declarados.",
        "possível com qualquer ponderação.",
        "prova de causalidade."
      ],
      "correct": 0,
      "why": "Uma média desses dois números não pode ser inferior a ambos.",
      "dimension": "concept",
      "objective": "Identificação de regra ensinada"
    },
    {
      "question": "Grupo A: 20 pessoas, 50%; B: 80 pessoas, 75%. Taxa global:",
      "options": [
        "70%.",
        "62,5%.",
        "75%."
      ],
      "correct": 0,
      "why": "São 10+60 aprovações entre cem pessoas.",
      "dimension": "application",
      "objective": "Aplicação independente de regra ensinada"
    },
    {
      "question": "Grupo A: 50 pessoas, 80%; B: 50 pessoas, 60%. Taxa global:",
      "options": [
        "70%.",
        "80%.",
        "60%."
      ],
      "correct": 0,
      "why": "A igualdade dos denominadores permite média simples de 80 e 60.",
      "dimension": "application",
      "objective": "Aplicação independente de regra ensinada"
    },
    {
      "question": "Se uma clínica recebe proporcionalmente mais casos graves, o agregado pode:",
      "options": [
        "ser menor mesmo com desempenho maior dentro dos estratos.",
        "provar que seu tratamento é inferior.",
        "ignorar a gravidade sem alterar comparações."
      ],
      "correct": 0,
      "why": "A composição dos subgrupos muda as ponderações do resultado geral.",
      "dimension": "application",
      "objective": "Aplicação independente de regra ensinada"
    },
    {
      "question": "Amostras de 10 e 90 casos com taxas 90% e 50% somam:",
      "options": [
        "54%.",
        "70%.",
        "50%."
      ],
      "correct": 0,
      "why": "9 casos no primeiro grupo e 45 no segundo dão 54 de 100.",
      "dimension": "application",
      "objective": "Aplicação independente de regra ensinada"
    }
  ],
  "temporal_composta": [
    {
      "question": "F(Gp) exige:",
      "options": [
        "algum instante a partir do qual p persiste.",
        "p apenas agora.",
        "p falso no último instante."
      ],
      "correct": 0,
      "why": "F procura uma posição em que Gp passa a valer.",
      "dimension": "concept",
      "objective": "Identificação de regra ensinada"
    },
    {
      "question": "G(Fp) exige:",
      "options": [
        "que em cada instante exista um p agora ou adiante.",
        "apenas uma ocorrência de p no começo.",
        "que G possa ser ignorado."
      ],
      "correct": 0,
      "why": "A possibilidade futura F deve valer em todos os pontos avaliados.",
      "dimension": "concept",
      "objective": "Identificação de regra ensinada"
    },
    {
      "question": "G(p→Fq) falha quando:",
      "options": [
        "há um instante com p e sem q a partir dali.",
        "p é falsa em algum instante.",
        "q ocorre depois de um p."
      ],
      "correct": 0,
      "why": "A condicional local fica falsa se p ocorre e Fq não.",
      "dimension": "concept",
      "objective": "Identificação de regra ensinada"
    },
    {
      "question": "X(Fp) começa a avaliar Fp:",
      "options": [
        "no próximo instante.",
        "no primeiro instante sempre.",
        "no instante anterior."
      ],
      "correct": 0,
      "why": "O operador X desloca o ponto de avaliação para o sucessor.",
      "dimension": "concept",
      "objective": "Identificação de regra ensinada"
    },
    {
      "question": "Traço p: F,F,V. F(Gp) em t0 é:",
      "options": [
        "V.",
        "F.",
        "Indeterminado."
      ],
      "correct": 0,
      "why": "No último instante p é V e permanece até o fim do traço.",
      "dimension": "application",
      "objective": "Aplicação independente de regra ensinada"
    },
    {
      "question": "Traço p: V,F,V. G(Fp) em t0 é:",
      "options": [
        "V.",
        "F.",
        "Indeterminado."
      ],
      "correct": 0,
      "why": "De cada instante existe algum p ainda presente ou futuro no traço.",
      "dimension": "application",
      "objective": "Aplicação independente de regra ensinada"
    },
    {
      "question": "Se p vale em t2 e q não vale de t2 até o fim, G(p→Fq) é:",
      "options": [
        "F.",
        "V.",
        "Indeterminado."
      ],
      "correct": 0,
      "why": "A condicional falha em t2 por falta de q presente ou futura.",
      "dimension": "application",
      "objective": "Aplicação independente de regra ensinada"
    },
    {
      "question": "No último instante de um traço finito, X(Fp) vale:",
      "options": [
        "F na convenção forte de X.",
        "V por vacuidade.",
        "Igual a p atual."
      ],
      "correct": 0,
      "why": "Sem sucessor, o próximo estado forte é falso.",
      "dimension": "application",
      "objective": "Aplicação independente de regra ensinada"
    }
  ],
  "fde_operacoes": [
    {
      "question": "Qual par de suportes descreve uma informação contraditória em FDE?",
      "options": [
        "(1,1).",
        "(0,0).",
        "(1,0)."
      ],
      "correct": 0,
      "why": "B registra dois tipos de suporte, positivo e negativo.",
      "dimension": "concept",
      "objective": "Identificação de regra ensinada"
    },
    {
      "question": "Em FDE, N corresponde a:",
      "options": [
        "(0,0).",
        "(1,1).",
        "(0,1)."
      ],
      "correct": 0,
      "why": "N é ausência dos dois tipos de suporte.",
      "dimension": "concept",
      "objective": "Identificação de regra ensinada"
    },
    {
      "question": "Na conjunção FDE, suporte positivo exige:",
      "options": [
        "os dois termos com suporte positivo.",
        "apenas um termo com suporte positivo.",
        "nenhum termo com suporte positivo."
      ],
      "correct": 0,
      "why": "A conjunção recebe positivo se ambos o possuem.",
      "dimension": "concept",
      "objective": "Identificação de regra ensinada"
    },
    {
      "question": "Na disjunção FDE, suporte negativo exige:",
      "options": [
        "os dois termos com suporte negativo.",
        "qualquer um dos termos com suporte negativo.",
        "apenas o primeiro termo falso."
      ],
      "correct": 0,
      "why": "A disjunção é negativa apenas quando ambos os termos têm apoio negativo.",
      "dimension": "concept",
      "objective": "Identificação de regra ensinada"
    },
    {
      "question": "¬T em FDE resulta em:",
      "options": [
        "F.",
        "B.",
        "N."
      ],
      "correct": 0,
      "why": "A negação troca os suportes positivo e negativo.",
      "dimension": "application",
      "objective": "Aplicação independente de regra ensinada"
    },
    {
      "question": "B∧N em FDE resulta em:",
      "options": [
        "F.",
        "B.",
        "T."
      ],
      "correct": 0,
      "why": "O positivo vira zero e o negativo permanece um.",
      "dimension": "application",
      "objective": "Aplicação independente de regra ensinada"
    },
    {
      "question": "B∨N em FDE resulta em:",
      "options": [
        "T.",
        "F.",
        "N."
      ],
      "correct": 0,
      "why": "O positivo vale um e o negativo vale zero.",
      "dimension": "application",
      "objective": "Aplicação independente de regra ensinada"
    },
    {
      "question": "F∨N em FDE resulta em:",
      "options": [
        "N.",
        "F.",
        "T."
      ],
      "correct": 0,
      "why": "Não há suporte positivo e o negativo da disjunção exige ambos, ausente em N.",
      "dimension": "application",
      "objective": "Aplicação independente de regra ensinada"
    }
  ],
  "intuicionista_negacao": [
    {
      "question": "Na semântica intuicionista ¬p é:",
      "options": [
        "p→⊥.",
        "¬p como pura ausência de informação.",
        "um grau contínuo de p."
      ],
      "correct": 0,
      "why": "A negação é derivação de contradição a partir de uma prova de p.",
      "dimension": "concept",
      "objective": "Identificação de regra ensinada"
    },
    {
      "question": "A implicação p→¬¬p é:",
      "options": [
        "válida na lógica intuicionista.",
        "inválida em qualquer modelo.",
        "uma forma da explosão."
      ],
      "correct": 0,
      "why": "Uma prova positiva de p impossibilita sua negação.",
      "dimension": "concept",
      "objective": "Identificação de regra ensinada"
    },
    {
      "question": "A implicação ¬¬p→p é:",
      "options": [
        "não válida universalmente no intuicionismo.",
        "sempre válida como princípio básico.",
        "equivalente à disjunção p∧¬p."
      ],
      "correct": 0,
      "why": "A dupla negação não fornece automaticamente construção de p.",
      "dimension": "concept",
      "objective": "Identificação de regra ensinada"
    },
    {
      "question": "A sentença ¬¬(p∨¬p) é:",
      "options": [
        "demonstrável intuicionisticamente.",
        "impossível de demonstrar.",
        "idêntica à prova de p∨¬p."
      ],
      "correct": 0,
      "why": "A negação do terceiro excluído conduz à contradição, mas sua disjunção não é geral.",
      "dimension": "concept",
      "objective": "Identificação de regra ensinada"
    },
    {
      "question": "Um mundo w0 não força p e tem extensão w1 que força p. Em w0 ¬p:",
      "options": [
        "não é forçada.",
        "é forçada porque p falta agora.",
        "é automaticamente verdadeira como probabilidade."
      ],
      "correct": 0,
      "why": "A extensão w1 impede provar impossibilidade de p.",
      "dimension": "application",
      "objective": "Aplicação independente de regra ensinada"
    },
    {
      "question": "Se p é demonstrada, o que segue construtivamente?",
      "options": [
        "¬¬p.",
        "¬p.",
        "¬(p∨¬p)."
      ],
      "correct": 0,
      "why": "A prova de p exclui uma prova consistente de sua negação.",
      "dimension": "application",
      "objective": "Aplicação independente de regra ensinada"
    },
    {
      "question": "Um mundo força ¬¬p mas não força p. O exemplo mostra:",
      "options": [
        "a dupla negação é mais fraca que prova positiva.",
        "a identidade das duas afirmações.",
        "a necessidade da lógica difusa."
      ],
      "correct": 0,
      "why": "¬¬p impede prova de ¬p sem necessariamente oferecer prova de p.",
      "dimension": "application",
      "objective": "Aplicação independente de regra ensinada"
    },
    {
      "question": "Em w0, p e ¬p não são forçadas. p∨¬p em w0:",
      "options": [
        "não é forçada.",
        "é forçada por lógica clássica obrigatória.",
        "é uma prova de p."
      ],
      "correct": 0,
      "why": "A disjunção construtiva exige um dos lados já estabelecido.",
      "dimension": "application",
      "objective": "Aplicação independente de regra ensinada"
    }
  ]
};
