/** Frente 2 — cinco aulas sobre medição, agregados e modalidades avançadas. */
export const GAP_LESSONS_B={
  "medicao_evidencias": {
    "lead": "Uma amostra representativa garante uma medição correta?",
    "theory": "Uma pesquisa pode entrevistar aleatoriamente pessoas de uma cidade inteira e ainda medir algo errado. Se o questionário induz respostas favoráveis, ou o termômetro acrescenta sempre dois graus, a amostra pode ser boa mas a medida será enviesada. O viés de seleção afeta quem entra na análise; o viés de medição afeta como a informação é produzida para os casos escolhidos. Os dois problemas podem aparecer juntos e exigem correções diferentes.\n\nUm instrumento pode repetir leituras quase idênticas, mas todas estarem deslocadas do valor de referência. Nesse caso, apresenta boa repetibilidade ou precisão, mas baixa exatidão por erro sistemático. Já leituras espalhadas indicam variabilidade ou imprecisão. Calibração compara um instrumento com padrões de referência e registra possíveis desvios. Fazer muitas medições com instrumento descalibrado não elimina necessariamente o viés: a média pode continuar distante do valor verdadeiro.\n\nAntes de generalizar, registre o que se pretende medir, quem foi incluído e como a medida foi obtida. Verifique se a pergunta altera a resposta, se há perdas de informação e se diferentes avaliadores chegam a resultados comparáveis. Uma conclusão responsável distingue erro aleatório de deslocamento sistemático e pode recomendar instrumento independente, cegamento ou recalibração. Sem dados de referência, não é correto afirmar que uma medição é exata apenas porque se repete.",
    "example": "Uma balança descalibrada mostra 52 kg para um padrão certificado de 50 kg; em dez leituras, oscila entre 51,9 e 52,1 kg.",
    "steps": [
      "O padrão certificado fornece 50 kg; as leituras se concentram perto de 52 kg, dois quilogramas acima.",
      "As leituras são muito próximas entre si, o que sugere boa repetibilidade, mas estão deslocadas do padrão e não são exatas.",
      "Recalibre a balança e verifique o resultado com outros padrões; repetir apenas as leituras anteriores não resolve."
    ],
    "quiz": [
      {
        "question": "Qual o problema de um instrumento que acrescenta sempre dois graus?",
        "options": [
          "Viés sistemático de medição.",
          "Viés de seleção de pessoas necessariamente.",
          "Erro de tabulação que sempre desaparece na média."
        ],
        "correct": 0,
        "why": "O deslocamento constante altera a medida de cada caso."
      },
      {
        "question": "Medições repetidas próximas entre si, mas distantes de um padrão, mostram:",
        "options": [
          "Boa repetibilidade e baixa exatidão.",
          "Boa exatidão por definição.",
          "Ausência de qualquer erro."
        ],
        "correct": 0,
        "why": "Dispersão e distância ao valor de referência são aspectos distintos."
      },
      {
        "question": "Qual procedimento testa a calibração?",
        "options": [
          "Comparar o instrumento com referência conhecida.",
          "Apenas entrevistar mais pessoas.",
          "Trocar o gráfico de barras por uma linha."
        ],
        "correct": 0,
        "why": "É preciso verificar se a medida está alinhada a um padrão."
      },
      {
        "question": "Uma pergunta formulada de modo tendencioso pode causar:",
        "options": [
          "Viés de medição mesmo com participantes escolhidos aleatoriamente.",
          "Melhora automática da representatividade.",
          "Uma demonstração dedutiva de preferência."
        ],
        "correct": 0,
        "why": "A maneira de medir respostas é independente de como a amostra foi selecionada."
      }
    ]
  },
  "medias_ponderadas": {
    "lead": "Como taxas melhores em cada grupo podem produzir um total aparentemente pior?",
    "theory": "Se uma escola tem dez alunos numa turma com 90% de aprovação e noventa alunos noutra com 50%, não se pode fazer (90%+50%)/2 para obter a taxa geral. É preciso contar aprovações: 9+45=54 entre 100 estudantes, ou 54%. A média ponderada dá a cada taxa peso proporcional ao número de pessoas do grupo: (n1·r1+n2·r2)/(n1+n2). Uma taxa agregada não é média simples de percentuais quando os denominadores diferem.\n\nQuando duas categorias são exaustivas, não se sobrepõem e têm pesos não negativos, a taxa total fica entre as duas taxas componentes. Se os grupos apresentam 60% e 80%, o total não pode ser 45%, desde que o denominador agregado seja exatamente a soma dos dois grupos. Essa propriedade é uma ferramenta para detectar dados incompatíveis ou definições diferentes. Antes de suspeitar de erro, verifique se há terceiro grupo, subpopulações repetidas, períodos diferentes ou mudança do indicador medido.\n\nÉ possível que uma clínica tenha maior recuperação em cada classe de gravidade, mas menor recuperação no total se tratar proporcionalmente muito mais casos graves. As taxas por categoria e a taxa global podem ser todas calculadas corretamente e responder a perguntas distintas. A inversão do tipo Simpson não prova qual tratamento é melhor nem identifica uma causa. Para interpretar, examine tamanhos, composição dos grupos, seleção e fatores de confundimento, inclusive se a gravidade influencia a escolha da clínica.",
    "example": "Uma clínica A atende 90 casos leves com recuperação de 90% e 10 graves com 40%; a clínica B atende 20 leves com 95% e 80 graves com 50%.",
    "steps": [
      "B supera A entre leves (95% contra 90%) e graves (50% contra 40%).",
      "A recupera 81 leves e 4 graves: 85 em 100. B recupera 19 leves e 40 graves: 59 em 100. As taxas globais invertem a comparação estratificada porque os tamanhos por gravidade são muito diferentes.",
      "Uma clínica pode ter agregado melhor mesmo quando a outra lidera em cada estrato. É preciso considerar seleção e gravidade antes de inferir eficácia causal."
    ],
    "quiz": [
      {
        "question": "Taxas de 60% e 80% em dois grupos exaustivos podem produzir total de 45%?",
        "options": [
          "Não, com pesos não negativos e mesma definição do indicador.",
          "Sim, em qualquer média ponderada.",
          "Sim, basta trocar a ordem dos grupos."
        ],
        "correct": 0,
        "why": "O agregado deve estar entre as duas taxas componentes."
      },
      {
        "question": "Grupo de 20 tem 50% e grupo de 80 tem 75%. Total?",
        "options": [
          "70%.",
          "62,5%.",
          "75%."
        ],
        "correct": 0,
        "why": "10+60=70 casos entre 100, logo 70%."
      },
      {
        "question": "O paradoxo de Simpson exige atenção a:",
        "options": [
          "Taxas por subgrupo e tamanhos relativos dos grupos.",
          "Apenas a cor dos gráficos.",
          "Somente uma média não ponderada."
        ],
        "correct": 0,
        "why": "Mudanças dos pesos podem inverter comparações agregadas."
      },
      {
        "question": "Para investigar causalidade a partir de taxas agregadas, é preciso:",
        "options": [
          "Considerar seleção, gravidade e outros confundidores.",
          "Tratar a maior taxa como prova causal.",
          "Ignorar o tamanho das amostras."
        ],
        "correct": 0,
        "why": "Associação agregada e explicação causal exigem análises diferentes."
      }
    ]
  },
  "temporal_composta": {
    "lead": "O que acontece quando operadores temporais aparecem dentro de outros operadores?",
    "theory": "Fp significa que p aparece em algum instante desde agora, enquanto Gp afirma que p permanece em todos os instantes. Quando combinamos F(Gp), exigimos que exista um instante a partir do qual p nunca mais falhe até o final do traço. Em G(Fp), ao contrário, pedimos que em cada instante haja uma ocorrência de p no presente ou no futuro restante. Num traço finito isso exige inclusive p no último instante; a interpretação depende do horizonte declarado.\n\nA fórmula G(p→Fq) exige que, em todos os instantes do traço, se p ocorrer então q ocorra naquele instante ou em algum instante posterior. Um pedido p no último estado sem qualquer q dali em diante refuta a fórmula. Para verificar, percorra o traço de trás para frente: calcule primeiro Fq em cada instante, depois p→Fq e finalmente G dessa coluna. Uma única falha na coluna da condicional impede que a fórmula G seja verdadeira.\n\nA expressão X(Fp) pede que, no próximo estado, a partir desse novo ponto, p venha a ocorrer. No último estado do traço finito o operador X forte é falso, ainda que p seja verdadeira no estado atual. Uma linha do tempo auxilia a avaliação, mas não substitui a indicação do instante de partida e das regras de fronteira. Operadores temporais aninhados não podem ser trocados de ordem sem prova de equivalência.",
    "example": "Traço t0,t1,t2: p é V somente em t0; q é V somente em t1. Avalie G(p→Fq).",
    "steps": [
      "Em t2, Fq é F; em t1 é V porque q ocorre ali; em t0 é V porque q ocorrerá em t1.",
      "Em t0 p=V e Fq=V, logo a condicional é V; em t1 e t2 p=F, tornando ambas condicionais V.",
      "Como p→Fq vale em t0, t1 e t2, G(p→Fq) é verdadeira desde t0."
    ],
    "quiz": [
      {
        "question": "F(Gp) significa:",
        "options": [
          "Existe um instante a partir do qual p permanece até o fim.",
          "p é verdadeira apenas no instante inicial.",
          "p nunca pode ser verdadeira."
        ],
        "correct": 0,
        "why": "F busca um ponto onde Gp vale."
      },
      {
        "question": "G(p→Fq) exige:",
        "options": [
          "Cada ocorrência de p acompanhada de q agora ou posteriormente.",
          "Uma única ocorrência inicial de q basta em todos os casos.",
          "Que p seja sempre falsa."
        ],
        "correct": 0,
        "why": "Cada instante deve satisfazer a condicional com o futuro restante."
      },
      {
        "question": "Num traço com p somente no último instante, F(Gp) em t0 é:",
        "options": [
          "Verdadeira na convenção finita inclusiva.",
          "Falsa porque p não vale em t0.",
          "Falsa porque G nunca pode valer no último instante."
        ],
        "correct": 0,
        "why": "No último instante Gp vale porque só resta aquele instante, onde p é verdadeira."
      },
      {
        "question": "Em X(Fp), qual ponto inicia a avaliação do F interno?",
        "options": [
          "O instante seguinte ao atual.",
          "O primeiro instante do traço sempre.",
          "O instante anterior ao atual."
        ],
        "correct": 0,
        "why": "X desloca o ponto de avaliação antes de aplicar F."
      }
    ]
  },
  "fde_operacoes": {
    "lead": "Como calcular conjunções e disjunções com informação verdadeira, falsa, conflitante ou ausente?",
    "theory": "O sistema FDE representa uma proposição por duas informações: há suporte positivo? há suporte negativo? T corresponde a (1,0), F a (0,1), B a (1,1) e N a (0,0). Isso não é uma escala crescente de probabilidades. Por exemplo, dois bancos de dados podem discordar sobre entrega e atribuir B a “entregue”; já um fato sobre o qual nenhum banco se pronunciou recebe N. Confundir B e N apagaria a diferença entre contradição e ausência de informação.\n\nNegar uma proposição permuta seus suportes: ¬T=F, ¬F=T, ¬B=B e ¬N=N. Assim, uma afirmação já apoiada em sentidos contrários permanece conflitante depois da negação, enquanto uma sem dados continua sem dados. A regra não autoriza inferir uma proposição qualquer de B. A consequência paraconsistente se orienta por preservação de suportes designados, e não pelo princípio clássico de que contradições trivializam toda a base.\n\nPara p∧q, há suporte positivo somente quando ambos os termos o possuem; basta um suporte negativo para que a conjunção o tenha. Para p∨q, basta um suporte positivo; já o negativo exige que ambos os termos o tenham. Essas regras permitem calcular o estado final. Exemplo: p=B e q=N. A conjunção possui positivo 0 e negativo 1, logo F. A disjunção tem positivo 1 e negativo 0, logo T. Escrever cada componente antes de converter a T/F/B/N reduz erros.",
    "example": "Uma fonte apoia p e também ¬p (p=B); sobre q não existe informação (q=N).",
    "steps": [
      "p=B=(1,1) e q=N=(0,0), onde o primeiro bit representa apoio positivo e o segundo apoio negativo.",
      "Positivo: 1∧0=0. Negativo: 1∨0=1. Assim, p∧q=F.",
      "Positivo: 1∨0=1. Negativo: 1∧0=0. Assim, p∨q=T."
    ],
    "quiz": [
      {
        "question": "Em FDE, B corresponde a:",
        "options": [
          "Suporte positivo e negativo.",
          "Metade de probabilidade.",
          "Ausência de suporte."
        ],
        "correct": 0,
        "why": "B é o par (1,1), pois a afirmação tem simultaneamente suporte positivo e negativo."
      },
      {
        "question": "Qual é ¬N?",
        "options": [
          "N.",
          "T.",
          "B."
        ],
        "correct": 0,
        "why": "Trocar dois suportes ausentes conserva (0,0)."
      },
      {
        "question": "Qual é B∧N?",
        "options": [
          "F.",
          "N.",
          "B."
        ],
        "correct": 0,
        "why": "O positivo é 0 e o negativo é 1."
      },
      {
        "question": "Qual é B∨N?",
        "options": [
          "T.",
          "F.",
          "N."
        ],
        "correct": 0,
        "why": "Há suporte positivo de B e nenhum suporte negativo comum."
      }
    ]
  },
  "intuicionista_negacao": {
    "lead": "Por que a dupla negação não pode ser simplesmente eliminada em toda lógica construtiva?",
    "theory": "Na lógica intuicionista, ¬p abrevia p→⊥: uma demonstração de ¬p transforma qualquer prova de p numa contradição. Não possuir prova de p não basta, por si só, para ter prova de ¬p. Nos modelos de Kripke, ¬p é forçada num mundo quando nenhuma de suas extensões força p. Se alguma extensão vier a demonstrar p, a negação não vale no mundo original, mesmo que nele p ainda não esteja estabelecida.\n\nA fórmula ¬¬p impede uma prova de ¬p, mas não necessariamente fornece construção de p. Por isso a regra clássica ¬¬p→p não é válida em todos os modelos intuicionistas. Já de p podemos inferir ¬¬p: uma prova de p impediria que ¬p fosse demonstrável. Considere w0 sem p demonstrada, mas com todas as extensões terminais estabelecendo p. Em w0 p não é forçada; ¬p falha porque extensões estabelecem p; e ¬¬p vale porque nenhuma extensão consegue sustentar ¬p.\n\nEmbora p∨¬p não seja demonstrável universalmente na lógica intuicionista, sua dupla negação ¬¬(p∨¬p) é demonstrável. Se supusermos ¬(p∨¬p), então uma prova de p implicaria p∨¬p e produziria contradição; portanto derivamos ¬p. Mas ¬p também produziria p∨¬p, contradizendo a hipótese original. Logo essa hipótese é impossível e obtemos ¬¬(p∨¬p). Essa explicação não constitui prova de p∨¬p, e é justamente essa diferença que a aula pretende ensinar.",
    "example": "Considere w0 que não força p e uma extensão w1 em que p é demonstrada. Em w1 p permanece verdadeira nas extensões.",
    "steps": [
      "p ainda não foi demonstrada em w0, embora possa sê-lo em uma extensão.",
      "A extensão w1 força p, impedindo a prova de impossibilidade de p; logo ¬p não é forçada.",
      "p∨¬p não é forçada em w0, mas ¬¬(p∨¬p) é: não há extensão na qual a disjunção seja refutada construtivamente."
    ],
    "quiz": [
      {
        "question": "Qual fórmula é válida intuicionisticamente?",
        "options": [
          "p→¬¬p.",
          "¬¬p→p em geral.",
          "p∨¬p como teorema universal."
        ],
        "correct": 0,
        "why": "Uma prova de p impede que sua negação seja consistente."
      },
      {
        "question": "¬p significa construtivamente:",
        "options": [
          "p→⊥.",
          "Ausência casual de notícia sobre p.",
          "Probabilidade de p inferior a 50%."
        ],
        "correct": 0,
        "why": "Negar exige transformar uma prova de p em contradição."
      },
      {
        "question": "O que vale universalmente sobre o terceiro excluído?",
        "options": [
          "Sua dupla negação é demonstrável intuicionisticamente.",
          "A própria disjunção é teorema em todos os modelos.",
          "A negação da disjunção é sempre válida."
        ],
        "correct": 0,
        "why": "¬¬(p∨¬p) é demonstrável sem provar um lado da disjunção."
      },
      {
        "question": "Por que ¬¬p não implica necessariamente p?",
        "options": [
          "Não fornece obrigatoriamente uma construção de p.",
          "Porque ¬¬p é uma fórmula malformada.",
          "Porque p não pode aparecer em modelos de Kripke."
        ],
        "correct": 0,
        "why": "Prova positiva e impossibilidade de uma prova negativa não são equivalentes construtivamente."
      }
    ]
  }
};
export const GAP_READINGS_B={
  "medicao_evidencias": {
    "objective": "Distinguir viés de seleção e erro sistemático de medição, reconhecer precisão, calibração e instrumentos inadequados e avaliar a qualidade de conclusões indutivas.",
    "sections": [
      {
        "heading": "Escolher bem a amostra não basta",
        "paragraphs": [
          "Uma pesquisa pode entrevistar aleatoriamente pessoas de uma cidade inteira e ainda medir algo errado. Se o questionário induz respostas favoráveis, ou o termômetro acrescenta sempre dois graus, a amostra pode ser boa mas a medida será enviesada.",
          "O viés de seleção afeta quem entra na análise; o viés de medição afeta como a informação é produzida para os casos escolhidos. Os dois problemas podem aparecer juntos e exigem correções diferentes."
        ]
      },
      {
        "heading": "Precisão, exatidão e calibração",
        "paragraphs": [
          "Um instrumento pode repetir leituras quase idênticas, mas todas estarem deslocadas do valor de referência. Nesse caso, apresenta boa repetibilidade ou precisão, mas baixa exatidão por erro sistemático. Já leituras espalhadas indicam variabilidade ou imprecisão.",
          "Calibração compara um instrumento com padrões de referência e registra possíveis desvios. Fazer muitas medições com instrumento descalibrado não elimina necessariamente o viés: a média pode continuar distante do valor verdadeiro."
        ]
      },
      {
        "heading": "Como melhorar uma conclusão",
        "paragraphs": [
          "Antes de generalizar, registre o que se pretende medir, quem foi incluído e como a medida foi obtida. Verifique se a pergunta altera a resposta, se há perdas de informação e se diferentes avaliadores chegam a resultados comparáveis.",
          "Uma conclusão responsável distingue erro aleatório de deslocamento sistemático e pode recomendar instrumento independente, cegamento ou recalibração. Sem dados de referência, não é correto afirmar que uma medição é exata apenas porque se repete."
        ]
      }
    ],
    "misconception": "Aumentar a amostra reduz certas oscilações aleatórias, mas não corrige automaticamente um termômetro descalibrado nem uma pergunta tendenciosa.",
    "summary": "Amostragem, calibração e qualidade das medidas são dimensões diferentes da evidência. Identifique erros sistemáticos e aleatórios antes de tratar um resultado como representação fiel da população.",
    "check": {
      "question": "Um termômetro registra sempre 2 °C a mais. Repetir mil vezes elimina o problema?",
      "options": [
        "Não, o viés sistemático permanece sem calibração.",
        "Sim, a média sempre corrige qualquer viés.",
        "Sim, desde que a amostra seja grande."
      ],
      "correct": 0,
      "why": "Muitas repetições podem reduzir variação aleatória, mas não eliminam deslocamento constante da medida."
    }
  },
  "medias_ponderadas": {
    "objective": "Calcular médias ponderadas e taxas agregadas, comparar composições de grupos, distinguir interpretação de subgrupos e total e analisar inversões do tipo Simpson.",
    "sections": [
      {
        "heading": "O total depende dos tamanhos dos grupos",
        "paragraphs": [
          "Se uma escola tem dez alunos numa turma com 90% de aprovação e noventa alunos noutra com 50%, não se pode fazer (90%+50%)/2 para obter a taxa geral. É preciso contar aprovações: 9+45=54 entre 100 estudantes, ou 54%.",
          "A média ponderada dá a cada taxa peso proporcional ao número de pessoas do grupo: (n1·r1+n2·r2)/(n1+n2). Uma taxa agregada não é média simples de percentuais quando os denominadores diferem."
        ]
      },
      {
        "heading": "Limites da média ponderada",
        "paragraphs": [
          "Quando duas categorias são exaustivas, não se sobrepõem e têm pesos não negativos, a taxa total fica entre as duas taxas componentes. Se os grupos apresentam 60% e 80%, o total não pode ser 45%, desde que o denominador agregado seja exatamente a soma dos dois grupos.",
          "Essa propriedade é uma ferramenta para detectar dados incompatíveis ou definições diferentes. Antes de suspeitar de erro, verifique se há terceiro grupo, subpopulações repetidas, períodos diferentes ou mudança do indicador medido."
        ]
      },
      {
        "heading": "Composição e paradoxo de Simpson",
        "paragraphs": [
          "É possível que uma clínica tenha maior recuperação em cada classe de gravidade, mas menor recuperação no total se tratar proporcionalmente muito mais casos graves. As taxas por categoria e a taxa global podem ser todas calculadas corretamente e responder a perguntas distintas.",
          "A inversão do tipo Simpson não prova qual tratamento é melhor nem identifica uma causa. Para interpretar, examine tamanhos, composição dos grupos, seleção e fatores de confundimento, inclusive se a gravidade influencia a escolha da clínica."
        ]
      }
    ],
    "misconception": "O paradoxo de Simpson não permite que uma média ponderada de dois grupos exaustivos saia do intervalo de suas próprias taxas. A inversão ocorre ao comparar agregados de populações com pesos diferentes.",
    "summary": "Calcule taxa total por contagens e denominadores, não pela média simples de porcentagens. Uma média ponderada fica dentro dos extremos de seus grupos; inversões agregadas dependem de composições diferentes.",
    "check": {
      "question": "Dez estudantes têm aprovação de 90% e noventa têm aprovação de 50%. Qual taxa total?",
      "options": [
        "54%.",
        "70%.",
        "90%."
      ],
      "correct": 0,
      "why": "São 9 aprovações no primeiro grupo e 45 no segundo: 54 aprovados entre 100."
    }
  },
  "temporal_composta": {
    "objective": "Calcular G(p→Fq), F(Gp) e X(Fp) em traços finitos, avaliando a fórmula de dentro para fora em cada instante sob convenções explícitas.",
    "sections": [
      {
        "heading": "A ordem dos operadores altera a exigência",
        "paragraphs": [
          "Fp significa que p aparece em algum instante desde agora, enquanto Gp afirma que p permanece em todos os instantes. Quando combinamos F(Gp), exigimos que exista um instante a partir do qual p nunca mais falhe até o final do traço.",
          "Em G(Fp), ao contrário, pedimos que em cada instante haja uma ocorrência de p no presente ou no futuro restante. Num traço finito isso exige inclusive p no último instante; a interpretação depende do horizonte declarado."
        ]
      },
      {
        "heading": "Condições em cada instante",
        "paragraphs": [
          "A fórmula G(p→Fq) exige que, em todos os instantes do traço, se p ocorrer então q ocorra naquele instante ou em algum instante posterior. Um pedido p no último estado sem qualquer q dali em diante refuta a fórmula.",
          "Para verificar, percorra o traço de trás para frente: calcule primeiro Fq em cada instante, depois p→Fq e finalmente G dessa coluna. Uma única falha na coluna da condicional impede que a fórmula G seja verdadeira."
        ]
      },
      {
        "heading": "Próximo instante e quantificações aninhadas",
        "paragraphs": [
          "A expressão X(Fp) pede que, no próximo estado, a partir desse novo ponto, p venha a ocorrer. No último estado do traço finito o operador X forte é falso, ainda que p seja verdadeira no estado atual.",
          "Uma linha do tempo auxilia a avaliação, mas não substitui a indicação do instante de partida e das regras de fronteira. Operadores temporais aninhados não podem ser trocados de ordem sem prova de equivalência."
        ]
      }
    ],
    "misconception": "F(Gp) não é o mesmo que G(Fp). O primeiro procura um ponto após o qual p persiste; o segundo exige possibilidade futura de p a partir de todos os pontos do traço.",
    "summary": "Calcule fórmulas temporais compostas do interior para o exterior, avaliando operadores internos em cada instante antes dos externos e declarando a convenção de traço finito.",
    "check": {
      "question": "Para verificar G(p→Fq), qual é o primeiro passo correto?",
      "options": [
        "Calcular Fq em cada instante.",
        "Verificar q apenas no instante inicial.",
        "Assumir que G e F podem trocar livremente de posição."
      ],
      "correct": 0,
      "why": "A condicional depende do valor futuro de q em cada instante; só depois aplicamos G."
    }
  },
  "fde_operacoes": {
    "objective": "Operar os quatro estados de informação FDE e calcular negação, conjunção e disjunção distinguindo suporte positivo e negativo sem recorrer à explosão clássica.",
    "sections": [
      {
        "heading": "Dois tipos de suporte",
        "paragraphs": [
          "O sistema FDE representa uma proposição por duas informações: há suporte positivo? há suporte negativo? T corresponde a (1,0), F a (0,1), B a (1,1) e N a (0,0). Isso não é uma escala crescente de probabilidades.",
          "Por exemplo, dois bancos de dados podem discordar sobre entrega e atribuir B a “entregue”; já um fato sobre o qual nenhum banco se pronunciou recebe N. Confundir B e N apagaria a diferença entre contradição e ausência de informação."
        ]
      },
      {
        "heading": "Negação troca as duas componentes",
        "paragraphs": [
          "Negar uma proposição permuta seus suportes: ¬T=F, ¬F=T, ¬B=B e ¬N=N. Assim, uma afirmação já apoiada em sentidos contrários permanece conflitante depois da negação, enquanto uma sem dados continua sem dados.",
          "A regra não autoriza inferir uma proposição qualquer de B. A consequência paraconsistente se orienta por preservação de suportes designados, e não pelo princípio clássico de que contradições trivializam toda a base."
        ]
      },
      {
        "heading": "Conjunção e disjunção componente a componente",
        "paragraphs": [
          "Para p∧q, há suporte positivo somente quando ambos os termos o possuem; basta um suporte negativo para que a conjunção o tenha. Para p∨q, basta um suporte positivo; já o negativo exige que ambos os termos o tenham. Essas regras permitem calcular o estado final.",
          "Exemplo: p=B e q=N. A conjunção possui positivo 0 e negativo 1, logo F. A disjunção tem positivo 1 e negativo 0, logo T. Escrever cada componente antes de converter a T/F/B/N reduz erros."
        ]
      }
    ],
    "misconception": "A conjunção de B com N pode receber F e a disjunção pode receber T na semântica FDE indicada. Não são operações sobre probabilidades e não implicam explosão.",
    "summary": "Use T=(1,0), F=(0,1), B=(1,1) e N=(0,0). Negação troca componentes; em ∧ positivo exige ambos e negativo exige um; em ∨ positivo exige um e negativo exige ambos.",
    "check": {
      "question": "Na semântica FDE, B∧N resulta em:",
      "options": [
        "F.",
        "B.",
        "N."
      ],
      "correct": 0,
      "why": "B=(1,1) e N=(0,0); a conjunção tem positivo 1∧0=0 e negativo 1∨0=1, isto é, F."
    }
  },
  "intuicionista_negacao": {
    "objective": "Distinguir p, ¬p e ¬¬p no forçamento intuicionista, demonstrar um caso de ¬¬(p∨¬p) e contrastá-lo com a ausência de prova de p∨¬p.",
    "sections": [
      {
        "heading": "Negar é provar impossibilidade",
        "paragraphs": [
          "Na lógica intuicionista, ¬p abrevia p→⊥: uma demonstração de ¬p transforma qualquer prova de p numa contradição. Não possuir prova de p não basta, por si só, para ter prova de ¬p.",
          "Nos modelos de Kripke, ¬p é forçada num mundo quando nenhuma de suas extensões força p. Se alguma extensão vier a demonstrar p, a negação não vale no mundo original, mesmo que nele p ainda não esteja estabelecida."
        ]
      },
      {
        "heading": "A dupla negação é mais fraca que uma construção de p",
        "paragraphs": [
          "A fórmula ¬¬p impede uma prova de ¬p, mas não necessariamente fornece construção de p. Por isso a regra clássica ¬¬p→p não é válida em todos os modelos intuicionistas. Já de p podemos inferir ¬¬p: uma prova de p impediria que ¬p fosse demonstrável.",
          "Considere w0 sem p demonstrada, mas com todas as extensões terminais estabelecendo p. Em w0 p não é forçada; ¬p falha porque extensões estabelecem p; e ¬¬p vale porque nenhuma extensão consegue sustentar ¬p."
        ]
      },
      {
        "heading": "Dupla negação do terceiro excluído",
        "paragraphs": [
          "Embora p∨¬p não seja demonstrável universalmente na lógica intuicionista, sua dupla negação ¬¬(p∨¬p) é demonstrável. Se supusermos ¬(p∨¬p), então uma prova de p implicaria p∨¬p e produziria contradição; portanto derivamos ¬p.",
          "Mas ¬p também produziria p∨¬p, contradizendo a hipótese original. Logo essa hipótese é impossível e obtemos ¬¬(p∨¬p). Essa explicação não constitui prova de p∨¬p, e é justamente essa diferença que a aula pretende ensinar."
        ]
      }
    ],
    "misconception": "¬¬p não fornece, em geral, uma prova construtiva de p. A dupla negação de p∨¬p é compatível com não possuir demonstração de qualquer uma das alternativas.",
    "summary": "Uma prova de p implica ¬¬p, mas a recíproca é princípio clássico não geralmente aceito intuicionisticamente. É possível demonstrar ¬¬(p∨¬p) sem demonstrar p∨¬p.",
    "check": {
      "question": "Na lógica intuicionista, de ¬¬p segue p em todo modelo?",
      "options": [
        "Não; a eliminação universal de dupla negação é clássica.",
        "Sim; toda dupla negação fornece uma prova de p.",
        "Sim, porque p é uma probabilidade."
      ],
      "correct": 0,
      "why": "Uma impossibilidade de provar ¬p não é necessariamente uma construção positiva de p."
    }
  }
};
export const GAP_WORKED_B={
  "medicao_evidencias": {
    "context": "Uma balança descalibrada mostra 52 kg para um padrão certificado de 50 kg; em dez leituras, oscila entre 51,9 e 52,1 kg.",
    "steps": [
      {
        "formal": "Identifique o valor de referência.",
        "concrete": "O padrão certificado fornece 50 kg; as leituras se concentram perto de 52 kg, dois quilogramas acima.",
        "reason": "A diferença sistemática precisa ser separada da pequena dispersão entre medições."
      },
      {
        "formal": "Classifique os dois aspectos.",
        "concrete": "As leituras são muito próximas entre si, o que sugere boa repetibilidade, mas estão deslocadas do padrão e não são exatas.",
        "reason": "Precisão ou repetibilidade não é sinônimo de exatidão."
      },
      {
        "formal": "Proponha correção coerente.",
        "concrete": "Recalibre a balança e verifique o resultado com outros padrões; repetir apenas as leituras anteriores não resolve.",
        "reason": "A intervenção deve atacar o mecanismo de medição responsável pelo viés."
      }
    ],
    "check": {
      "question": "O que deve ser feito primeiro com uma balança sistematicamente deslocada?",
      "options": [
        "Calibrá-la com referência conhecida.",
        "Aumentar somente o número de pesagens.",
        "Excluir aleatoriamente metade dos resultados."
      ],
      "correct": 0,
      "why": "Sem corrigir o instrumento, a média continuará deslocada do valor de referência."
    }
  },
  "medias_ponderadas": {
    "context": "Uma clínica A atende 90 casos leves com recuperação de 90% e 10 graves com 40%; a clínica B atende 10 leves com 95% e 90 graves com 50%.",
    "steps": [
      {
        "formal": "Compare taxas por grupo.",
        "concrete": "B supera A entre leves (95% contra 90%) e graves (50% contra 40%).",
        "reason": "A comparação estratificada mantém constante a categoria de gravidade."
      },
      {
        "formal": "Observe o efeito da composição.",
        "concrete": "A atende principalmente leves e B principalmente graves; a taxa total aproxima-se da taxa predominante em cada uma.",
        "reason": "O agregado depende do peso relativo das categorias, não apenas de suas taxas."
      },
      {
        "formal": "Faça a conclusão adequada.",
        "concrete": "Uma clínica pode ter agregado melhor mesmo quando a outra lidera em cada estrato. É preciso considerar seleção e gravidade antes de inferir eficácia causal.",
        "reason": "Essa é a intuição do paradoxo de Simpson; nenhuma inversão autoriza automaticamente atribuir causa à clínica."
      }
    ],
    "check": {
      "question": "Por que não basta calcular a média de 90% e 50% de dois grupos desiguais?",
      "options": [
        "Porque cada percentual deve receber peso pelo tamanho do grupo.",
        "Porque porcentagens não podem ser agregadas.",
        "Porque a maior taxa sempre define a média."
      ],
      "correct": 0,
      "why": "A taxa total usa a soma dos numeradores dividida pela soma dos denominadores."
    }
  },
  "temporal_composta": {
    "context": "Traço t0,t1,t2: p é V somente em t0; q é V somente em t1. Avalie G(p→Fq).",
    "steps": [
      {
        "formal": "Calcule Fq do fim ao começo.",
        "concrete": "Em t2, Fq é F; em t1 é V porque q ocorre ali; em t0 é V porque q ocorrerá em t1.",
        "reason": "F inclui o instante atual e busca testemunha no restante do traço."
      },
      {
        "formal": "Avalie a condicional instante a instante.",
        "concrete": "Em t0 p=V e Fq=V, logo a condicional é V; em t1 e t2 p=F, tornando ambas condicionais V.",
        "reason": "Uma condicional com antecedente falso é verdadeira na semântica clássica aplicada a cada instante."
      },
      {
        "formal": "Aplique o operador global.",
        "concrete": "Como p→Fq vale em t0, t1 e t2, G(p→Fq) é verdadeira desde t0.",
        "reason": "O operador G exige todas as avaliações locais verdadeiras."
      }
    ],
    "check": {
      "question": "Se p ocorre em t2 e q não ocorre em t2 nem depois, G(p→Fq) será:",
      "options": [
        "Falsa.",
        "Verdadeira porque p ocorreu.",
        "Sempre indeterminada."
      ],
      "correct": 0,
      "why": "No último instante há antecedente verdadeiro e Fq falso, fornecendo contraexemplo ao G."
    }
  },
  "fde_operacoes": {
    "context": "Uma fonte apoia p e também ¬p (p=B); sobre q não existe informação (q=N).",
    "steps": [
      {
        "formal": "Escreva os pares informacionais.",
        "concrete": "p=B=(1,1) e q=N=(0,0), onde o primeiro bit representa apoio positivo e o segundo apoio negativo.",
        "reason": "Separar componentes evita imaginar que B e N sejam valores intermediários de uma mesma escala."
      },
      {
        "formal": "Calcule a conjunção.",
        "concrete": "Positivo: 1∧0=0. Negativo: 1∨0=1. Assim, p∧q=F.",
        "reason": "A conjunção requer suporte positivo dos dois termos; para suporte negativo basta um."
      },
      {
        "formal": "Calcule a disjunção.",
        "concrete": "Positivo: 1∨0=1. Negativo: 1∧0=0. Assim, p∨q=T.",
        "reason": "A disjunção exige pelo menos um suporte positivo e ambos os negativos para ficar negativa."
      }
    ],
    "check": {
      "question": "Se p=B e q=N, qual é p∨q em FDE?",
      "options": [
        "T.",
        "F.",
        "N."
      ],
      "correct": 0,
      "why": "A disjunção recebe suporte positivo de p, mas não recebe suporte negativo simultâneo dos dois termos."
    }
  },
  "intuicionista_negacao": {
    "context": "Considere w0 que não força p e uma extensão w1 em que p é demonstrada. Em w1 p permanece verdadeira nas extensões.",
    "steps": [
      {
        "formal": "Avalie p em w0.",
        "concrete": "p ainda não foi demonstrada em w0, embora possa sê-lo em uma extensão.",
        "reason": "O forçamento registra a informação já estabelecida no mundo atual."
      },
      {
        "formal": "Avalie ¬p em w0.",
        "concrete": "A extensão w1 força p, impedindo a prova de impossibilidade de p; logo ¬p não é forçada.",
        "reason": "Negar construtivamente exige considerar todas as extensões, não apenas a situação inicial."
      },
      {
        "formal": "Avalie a dupla negação do terceiro excluído.",
        "concrete": "p∨¬p não é forçada em w0, mas ¬¬(p∨¬p) é: não há extensão na qual a disjunção seja refutada construtivamente.",
        "reason": "O resultado mostra que negar duas vezes uma afirmação pode ser mais fraco do que estabelecer sua prova direta."
      }
    ],
    "check": {
      "question": "Por que ¬¬(p∨¬p) não prova p∨¬p na lógica intuicionista?",
      "options": [
        "Porque dupla negação não pode ser eliminada universalmente.",
        "Porque disjunções não existem nessa lógica.",
        "Porque p e ¬p são sempre verdadeiras simultaneamente."
      ],
      "correct": 0,
      "why": "A conclusão construtiva exige prova de um dos lados, o que não é fornecido só pela dupla negação."
    }
  }
};
