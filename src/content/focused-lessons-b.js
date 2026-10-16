/** Aulas originais finais reduzidas a uma única competência central. */
export const FOCUSED_LESSONS_B={
  "medias_ponderadas": {
    "lead": "Por que a média de dois percentuais nem sempre é a taxa geral?",
    "theory": "Uma escola registra 80% de aprovação numa turma de 10 estudantes e 50% numa turma de 90. Esses percentuais não representam quantidades iguais de pessoas. Uma média simples de 80% e 50% daria 65%, mas não descreveria a aprovação global. Para isso, precisamos recuperar as contagens de aprovados em cada turma.\n\nNa turma pequena, 80% de 10 representa 8 aprovados. Na turma maior, 50% de 90 representa 45. Juntas, as turmas têm 53 aprovados entre 100. A taxa global é 53%. Em fórmula: (n1×taxa1+n2×taxa2)/(n1+n2), com as taxas na mesma unidade. A taxa total é uma média ponderada.\n\nCom pesos não negativos, a média ponderada de dois grupos fica entre as duas taxas. No exemplo, 53% está entre 50% e 80%. Antes de aceitar um agregado, confira se os grupos são separados, se cobrem a população mencionada e se as taxas usam o mesmo indicador. Inversões entre populações serão estudadas numa aula posterior.",
    "example": "Uma turma de 20 estudantes tem 50% de aprovação; outra de 80 tem 75%. Calcule a taxa geral.",
    "steps": [
      "50% de 20 estudantes são 10 aprovados.",
      "75% de 80 estudantes são 60 aprovados.",
      "Há 10+60=70 aprovados entre 20+80=100 estudantes: taxa de 70%."
    ],
    "quiz": [
      {
        "question": "Uma taxa agregada se calcula por:",
        "options": [
          "Total de casos favoráveis dividido pelo total de pessoas.",
          "Média simples de percentuais arbitrários.",
          "A maior taxa individual."
        ],
        "correct": 0,
        "why": "Os tamanhos dos grupos determinam o peso de cada percentual."
      },
      {
        "question": "O grupo de maior tamanho exerce:",
        "options": [
          "Maior peso no agregado.",
          "Peso sempre igual ao menor.",
          "Nenhum peso na taxa conjunta."
        ],
        "correct": 0,
        "why": "Há mais indivíduos de seu denominador no resultado conjunto."
      },
      {
        "question": "Dois grupos de tamanhos iguais permitem:",
        "options": [
          "Média simples das duas taxas.",
          "Somar percentuais sem dividir.",
          "Descartar um grupo."
        ],
        "correct": 0,
        "why": "Com denominadores iguais, cada taxa tem o mesmo peso."
      },
      {
        "question": "A taxa ponderada de 40% e 80% deve ficar:",
        "options": [
          "Entre 40% e 80%.",
          "Acima de 80%.",
          "Abaixo de 40%."
        ],
        "correct": 0,
        "why": "Uma combinação com pesos não negativos não extrapola os extremos."
      }
    ]
  },
  "temporal_composta": {
    "lead": "O que acontece quando F e G aparecem aninhados?",
    "theory": "A fórmula F(Gp) pede que exista algum instante a partir do qual p permaneça verdadeira em todo o restante do traço. O operador externo F procura esse ponto. Se p for verdadeira somente nos dois últimos instantes, F(Gp) ainda pode valer, porque o início do período permanente não precisa coincidir com o instante inicial.\n\nA fórmula G(Fp) pede que, em cada instante, exista alguma ocorrência de p naquele instante ou em algum instante posterior. Isso inclui verificar o último instante. Num traço finito com semântica inclusiva, G(Fp) exige p verdadeira no instante final, pois não haverá instante posterior para satisfazer Fp.\n\nA ordem de F e G muda a pergunta: encontrar um ponto estável não é o mesmo que procurar uma ocorrência futura a partir de cada instante. Para calcular, anote Gp e Fp em cada posição antes de aplicar o operador externo. Fórmulas com condicionais dentro desses operadores serão estudadas separadamente.",
    "example": "Traço t0,t1,t2 com valores de p: F,V,V. Avalie F(Gp).",
    "steps": [
      "Gp é V em t1 e t2 porque p permanece V até o fim a partir desses instantes.",
      "O instante t1 satisfaz Gp; isso basta para F(Gp) em t0.",
      "A partir de t1, p passa a ser sempre verdadeira até o fim do traço."
    ],
    "quiz": [
      {
        "question": "F(Gp) exige:",
        "options": [
          "Algum instante a partir do qual p permanece.",
          "p somente agora.",
          "p falsa no último estado."
        ],
        "correct": 0,
        "why": "F busca um ponto no qual Gp vale."
      },
      {
        "question": "G(Fp) exige:",
        "options": [
          "Em cada instante, uma ocorrência de p agora ou depois.",
          "Uma única ocorrência inicial.",
          "p verdadeira só no primeiro instante."
        ],
        "correct": 0,
        "why": "O F interno deve valer em todos os pontos."
      },
      {
        "question": "Qual operador é avaliado primeiro em F(Gp)?",
        "options": [
          "O interno Gp.",
          "O externo F.",
          "Uma condicional que não aparece."
        ],
        "correct": 0,
        "why": "Operadores aninhados são avaliados de dentro para fora."
      },
      {
        "question": "Qual instante é crucial para G(Fp) num traço finito?",
        "options": [
          "O último, pois Fp depende do futuro restante.",
          "Somente o primeiro.",
          "Somente um estado antes do inicial."
        ],
        "correct": 0,
        "why": "No fim só existe o instante atual na convenção inclusiva."
      }
    ]
  },
  "fde_operacoes": {
    "lead": "Como negar uma afirmação com quatro estados de informação?",
    "theory": "A lógica FDE usa estados T=(1,0), F=(0,1), B=(1,1) e N=(0,0). A primeira posição indica suporte positivo; a segunda, suporte negativo. Um conflito B informa que há apoio a favor e contra; N indica que não há apoio em nenhuma direção. Esses estados não são graus numéricos de verdade.\n\nA regra de negação troca suporte positivo e negativo. Portanto ¬T=F, ¬F=T, ¬B=B e ¬N=N. Uma proposição com apoios contraditórios mantém os dois suportes quando é negada. Uma proposição sem informação continua sem informação.\n\nEscreva o par correspondente ao estado inicial, inverta as duas posições e consulte novamente os quatro rótulos. Esse é todo o procedimento desta aula. Combinar duas proposições com E ou OU exige regras diferentes, que serão ensinadas nas próximas aulas. A avaliação atual cobra somente negação.",
    "example": "Uma base possui informação favorável e contrária para p, logo p=B. Determine ¬p.",
    "steps": [
      "B corresponde a (1,1), com suporte positivo e negativo.",
      "Troque as posições dos dois componentes: (1,1) continua (1,1).",
      "O resultado é B: ¬B=B."
    ],
    "quiz": [
      {
        "question": "A negação em FDE faz:",
        "options": [
          "Troca dos suportes positivo e negativo.",
          "Soma probabilidades.",
          "Apaga qualquer evidência."
        ],
        "correct": 0,
        "why": "Negar troca as duas componentes do par."
      },
      {
        "question": "O estado B significa:",
        "options": [
          "Ambos os suportes presentes.",
          "Nenhum suporte.",
          "Somente positivo."
        ],
        "correct": 0,
        "why": "B representa (1,1). A conclusão é uma aplicação da definição estudada na leitura e no exemplo resolvido."
      },
      {
        "question": "O estado N significa:",
        "options": [
          "Nenhum dos dois suportes.",
          "Ambos os suportes.",
          "Somente negativo."
        ],
        "correct": 0,
        "why": "N representa (0,0). A conclusão é uma aplicação da definição estudada na leitura e no exemplo resolvido."
      },
      {
        "question": "Ao negar T, o positivo passa a:",
        "options": [
          "0.",
          "1.",
          "2."
        ],
        "correct": 0,
        "why": "T=(1,0), que vira (0,1). A conclusão é uma aplicação da definição estudada na leitura e no exemplo resolvido."
      }
    ]
  },
  "intuicionista_negacao": {
    "lead": "O que significa negar uma proposição de maneira construtiva?",
    "theory": "Na lógica intuicionista, ¬p significa p→⊥. Isso diz que possuir uma prova de p conduziria a uma contradição, e não apenas que ninguém apresentou uma prova até agora. Uma negação demonstrada exige justificativa para excluir p. A ausência de evidência atual é insuficiente para estabelecer essa impossibilidade.\n\nNos modelos de Kripke intuicionistas, mundos posteriores estendem informações e preservam o que já foi estabelecido. Um mundo atual pode não forçar p, mas uma extensão pode vir a forçá-la. Se existe extensão que força p, o mundo atual não força ¬p. A extensão é um contraexemplo à afirmação de que provar p é impossível.\n\nPara estabelecer ¬p num mundo, cada extensão precisa impedir uma prova de p. Uma única extensão em que p é forçada já refuta a negação naquele mundo. Nesta aula praticamos somente a negação construtiva e a diferença entre não provar e provar que é impossível. A dupla negação será estudada numa aula própria.",
    "example": "Mundo w0 ainda não força p, mas possui extensão w1 que já força p.",
    "steps": [
      "Em w0 não há prova de p registrada.",
      "Em w1 p está forçada, e w1 estende w0.",
      "¬p não é forçada em w0, pois w1 contradiz a impossibilidade construtiva de p."
    ],
    "quiz": [
      {
        "question": "¬p em lógica intuicionista significa:",
        "options": [
          "p→⊥.",
          "Somente não ter notícia de p.",
          "p com probabilidade zero."
        ],
        "correct": 0,
        "why": "A negação transforma uma prova de p em absurdo."
      },
      {
        "question": "A ausência de prova atual de p:",
        "options": [
          "Não basta para provar ¬p.",
          "Basta sempre para provar ¬p.",
          "Prova p∨¬p automaticamente."
        ],
        "correct": 0,
        "why": "Uma extensão pode estabelecer p."
      },
      {
        "question": "Mundos de informação crescente preservam:",
        "options": [
          "O que já foi forçado nas extensões.",
          "A falta de prova como negação.",
          "Todas as proposições falsas."
        ],
        "correct": 0,
        "why": "Forçamento é persistente ao aumentar informação."
      },
      {
        "question": "Para forçar ¬p num mundo, devemos:",
        "options": [
          "Excluir p em todas as extensões.",
          "Encontrar uma extensão com p.",
          "Não olhar nenhuma extensão."
        ],
        "correct": 0,
        "why": "Negação exige impossibilidade futura de provar p."
      }
    ]
  }
};
export const FOCUSED_READINGS_B={
  "medias_ponderadas": {
    "objective": "Calcular somente taxas agregadas com dois denominadores diferentes, somando contagens e dividindo pelo total, sem exigir inversões do paradoxo de Simpson.",
    "sections": [
      {
        "heading": "Taxas precisam de denominadores",
        "paragraphs": [
          "Uma escola registra 80% de aprovação numa turma de 10 estudantes e 50% numa turma de 90. Esses percentuais não representam quantidades iguais de pessoas.",
          "Uma média simples de 80% e 50% daria 65%, mas não descreveria a aprovação global. Para isso, precisamos recuperar as contagens de aprovados em cada turma."
        ]
      },
      {
        "heading": "Calcule antes de comparar",
        "paragraphs": [
          "Na turma pequena, 80% de 10 representa 8 aprovados. Na turma maior, 50% de 90 representa 45. Juntas, as turmas têm 53 aprovados entre 100.",
          "A taxa global é 53%. Em fórmula: (n1×taxa1+n2×taxa2)/(n1+n2), com as taxas na mesma unidade. A taxa total é uma média ponderada."
        ]
      },
      {
        "heading": "Confira os limites do resultado",
        "paragraphs": [
          "Com pesos não negativos, a média ponderada de dois grupos fica entre as duas taxas. No exemplo, 53% está entre 50% e 80%.",
          "Antes de aceitar um agregado, confira se os grupos são separados, se cobrem a população mencionada e se as taxas usam o mesmo indicador. Inversões entre populações serão estudadas numa aula posterior."
        ]
      }
    ],
    "misconception": "Não é correto calcular uma taxa geral tomando simplesmente a média das porcentagens de grupos com tamanhos diferentes.",
    "summary": "A taxa total é a soma dos casos favoráveis dividida pela soma dos denominadores. Taxas de grupos maiores recebem peso maior no agregado.",
    "check": {
      "question": "Grupos de 20 e 80 estudantes têm 50% e 75% de aprovação. A taxa total é:",
      "options": [
        "70%.",
        "62,5%.",
        "75%."
      ],
      "correct": 0,
      "why": "10+60=70 aprovados entre 100 estudantes. O total usa as contagens de cada grupo, não a média simples dos percentuais com denominadores diferentes."
    }
  },
  "temporal_composta": {
    "objective": "Comparar exclusivamente F(Gp) e G(Fp) em traços finitos, reconhecendo como a ordem dos operadores altera o ponto de avaliação.",
    "sections": [
      {
        "heading": "Eventualmente para sempre",
        "paragraphs": [
          "A fórmula F(Gp) pede que exista algum instante a partir do qual p permaneça verdadeira em todo o restante do traço. O operador externo F procura esse ponto.",
          "Se p for verdadeira somente nos dois últimos instantes, F(Gp) ainda pode valer, porque o início do período permanente não precisa coincidir com o instante inicial."
        ]
      },
      {
        "heading": "Sempre eventualmente",
        "paragraphs": [
          "A fórmula G(Fp) pede que, em cada instante, exista alguma ocorrência de p naquele instante ou em algum instante posterior. Isso inclui verificar o último instante.",
          "Num traço finito com semântica inclusiva, G(Fp) exige p verdadeira no instante final, pois não haverá instante posterior para satisfazer Fp."
        ]
      },
      {
        "heading": "Compare com cuidado",
        "paragraphs": [
          "A ordem de F e G muda a pergunta: encontrar um ponto estável não é o mesmo que procurar uma ocorrência futura a partir de cada instante.",
          "Para calcular, anote Gp e Fp em cada posição antes de aplicar o operador externo. Fórmulas com condicionais dentro desses operadores serão estudadas separadamente."
        ]
      }
    ],
    "misconception": "Não troque F(Gp) por G(Fp) apenas por semelhança visual. Cada ordem exige uma verificação diferente sobre o traço.",
    "summary": "F(Gp) procura um instante a partir do qual p permanece; G(Fp) exige uma ocorrência de p desde cada instante até o fim.",
    "check": {
      "question": "Em p=F,V,V, F(Gp) vale em t0?",
      "options": [
        "Sim, porque a partir de t1 p permanece V.",
        "Não, porque p é F em t0.",
        "Não, G nunca vale no último instante."
      ],
      "correct": 0,
      "why": "Existe um ponto no futuro no qual Gp é verdadeiro. O F externo procura uma posição com permanência; o G externo exige eventualidade a partir de cada posição."
    }
  },
  "fde_operacoes": {
    "objective": "Calcular exclusivamente a negação de T, F, B e N na lógica FDE, trocando suportes e diferenciando conflito de ausência de informação.",
    "sections": [
      {
        "heading": "Dois componentes informacionais",
        "paragraphs": [
          "A lógica FDE usa estados T=(1,0), F=(0,1), B=(1,1) e N=(0,0). A primeira posição indica suporte positivo; a segunda, suporte negativo.",
          "Um conflito B informa que há apoio a favor e contra; N indica que não há apoio em nenhuma direção. Esses estados não são graus numéricos de verdade. O primeiro componente indica evidência favorável, enquanto o segundo descreve oposição à mesma proposição."
        ]
      },
      {
        "heading": "Negar troca as posições",
        "paragraphs": [
          "A regra de negação troca suporte positivo e negativo. Portanto ¬T=F, ¬F=T, ¬B=B e ¬N=N. Essa permutação é toda a regra necessária para resolver os exercícios desta etapa.",
          "Uma proposição com apoios contraditórios mantém os dois suportes quando é negada. Uma proposição sem informação continua sem informação."
        ]
      },
      {
        "heading": "Pratique apenas uma operação",
        "paragraphs": [
          "Escreva o par correspondente ao estado inicial, inverta as duas posições e consulte novamente os quatro rótulos. Esse é todo o procedimento desta aula.",
          "Combinar duas proposições com E ou OU exige regras diferentes, que serão ensinadas nas próximas aulas. A avaliação atual cobra somente negação."
        ]
      }
    ],
    "misconception": "Negar B não elimina o conflito e negar N não cria informação. Os estados representam suportes, não probabilidades.",
    "summary": "Na semântica FDE, ¬T=F, ¬F=T, ¬B=B e ¬N=N. Calcule a negação trocando os suportes positivo e negativo.",
    "check": {
      "question": "Ao aplicar a negação no sistema FDE, qual estado resulta de ¬B?",
      "options": [
        "B.",
        "T.",
        "N."
      ],
      "correct": 0,
      "why": "Trocar os suportes de (1,1) mantém ambos presentes. A operação apenas troca os dois suportes: B e N ficam iguais, enquanto T e F trocam de lugar."
    }
  },
  "intuicionista_negacao": {
    "objective": "Interpretar exclusivamente ¬p como p→⊥ em lógica intuicionista e avaliar se extensões de um mundo impedem ou permitem provar p.",
    "sections": [
      {
        "heading": "A negação exige argumento construtivo",
        "paragraphs": [
          "Na lógica intuicionista, ¬p significa p→⊥. Isso diz que possuir uma prova de p conduziria a uma contradição, e não apenas que ninguém apresentou uma prova até agora.",
          "Uma negação demonstrada exige justificativa para excluir p. A ausência de evidência atual é insuficiente para estabelecer essa impossibilidade."
        ]
      },
      {
        "heading": "Mundos de informação crescente",
        "paragraphs": [
          "Nos modelos de Kripke intuicionistas, mundos posteriores estendem informações e preservam o que já foi estabelecido. Um mundo atual pode não forçar p, mas uma extensão pode vir a forçá-la.",
          "Se existe extensão que força p, o mundo atual não força ¬p. A extensão é um contraexemplo à afirmação de que provar p é impossível."
        ]
      },
      {
        "heading": "Verifique todas as extensões",
        "paragraphs": [
          "Para estabelecer ¬p num mundo, cada extensão precisa impedir uma prova de p. Uma única extensão em que p é forçada já refuta a negação naquele mundo.",
          "Nesta aula praticamos somente a negação construtiva e a diferença entre não provar e provar que é impossível. A dupla negação será estudada numa aula própria."
        ]
      }
    ],
    "misconception": "Não demonstrar p atualmente não equivale a demonstrar ¬p. A negada exige excluir uma prova de p em todas as extensões do mundo.",
    "summary": "Negação intuicionista ¬p significa p→⊥. Em modelos de Kripke, só é forçada quando nenhuma extensão pode forçar p.",
    "check": {
      "question": "Se w1 estende w0 e força p, então ¬p é forçada em w0?",
      "options": [
        "Não.",
        "Sim, porque p ainda não era conhecida em w0.",
        "Sim, sempre que há duas extensões."
      ],
      "correct": 0,
      "why": "A extensão com p impede afirmar sua impossibilidade construtiva."
    }
  }
};
export const FOCUSED_WORKED_B={
  "medias_ponderadas": {
    "context": "Uma turma de 20 estudantes tem 50% de aprovação; outra de 80 tem 75%. Calcule a taxa geral.",
    "steps": [
      {
        "formal": "Converta a primeira taxa em contagem",
        "concrete": "50% de 20 estudantes são 10 aprovados.",
        "reason": "A porcentagem precisa ser associada ao denominador correto."
      },
      {
        "formal": "Converta a segunda taxa em contagem",
        "concrete": "75% de 80 estudantes são 60 aprovados.",
        "reason": "O segundo grupo tem peso maior porque é maior."
      },
      {
        "formal": "Agregue contagens e denominadores",
        "concrete": "Há 10+60=70 aprovados entre 20+80=100 estudantes: taxa de 70%.",
        "reason": "Somar os numeradores e denominadores dá o percentual da população conjunta."
      }
    ],
    "check": {
      "question": "Qual foi o total de aprovados no exemplo das duas turmas?",
      "options": [
        "70 em 100.",
        "60 em 80 como total.",
        "10 em 20 como total."
      ],
      "correct": 0,
      "why": "Somam-se dez aprovados no primeiro grupo e sessenta no segundo."
    }
  },
  "temporal_composta": {
    "context": "Traço t0,t1,t2 com valores de p: F,V,V. Avalie F(Gp).",
    "steps": [
      {
        "formal": "Calcule Gp em cada instante",
        "concrete": "Gp é V em t1 e t2 porque p permanece V até o fim a partir desses instantes.",
        "reason": "O operador interno precisa ser avaliado em cada ponto relevante."
      },
      {
        "formal": "Procure uma testemunha para F",
        "concrete": "O instante t1 satisfaz Gp; isso basta para F(Gp) em t0.",
        "reason": "O operador externo F precisa apenas de uma posição favorável."
      },
      {
        "formal": "Interprete em palavras",
        "concrete": "A partir de t1, p passa a ser sempre verdadeira até o fim do traço.",
        "reason": "Não era necessário que p fosse verdadeira em t0."
      }
    ],
    "check": {
      "question": "Qual instante testemunha F(Gp) no exemplo F,V,V?",
      "options": [
        "t1.",
        "Somente t0.",
        "Nenhum instante."
      ],
      "correct": 0,
      "why": "A partir de t1, p permanece V no restante do traço."
    }
  },
  "fde_operacoes": {
    "context": "Uma base possui informação favorável e contrária para p, logo p=B. Determine ¬p.",
    "steps": [
      {
        "formal": "Registre o par inicial",
        "concrete": "B corresponde a (1,1), com suporte positivo e negativo.",
        "reason": "A contradição é representada pelas duas componentes presentes."
      },
      {
        "formal": "Aplique a negação",
        "concrete": "Troque as posições dos dois componentes: (1,1) continua (1,1).",
        "reason": "Como ambos estão presentes, a troca não altera o par."
      },
      {
        "formal": "Converta de volta ao estado",
        "concrete": "O resultado é B: ¬B=B., preservando os dois suportes.",
        "reason": "A negada também possui informações favoráveis e contrárias."
      }
    ],
    "check": {
      "question": "No exemplo, ao trocar os suportes de B=(1,1), obtemos:",
      "options": [
        "(1,1).",
        "(1,0).",
        "(0,0)."
      ],
      "correct": 0,
      "why": "Trocar dois componentes iguais mantém o par correspondente a B."
    }
  },
  "intuicionista_negacao": {
    "context": "Mundo w0 ainda não força p, mas possui extensão w1 que já força p.",
    "steps": [
      {
        "formal": "Verifique o ponto atual",
        "concrete": "Em w0 não há prova de p registrada.",
        "reason": "Ausência de prova não constitui automaticamente prova de impossibilidade."
      },
      {
        "formal": "Consulte a extensão",
        "concrete": "Em w1 p está forçada, e w1 estende w0.",
        "reason": "A extensão comprova que p pode ser demonstrada mais adiante."
      },
      {
        "formal": "Avalie ¬p em w0",
        "concrete": "¬p não é forçada em w0, pois w1 contradiz a impossibilidade construtiva de p.",
        "reason": "A avaliação da negação precisa considerar todas as extensões acessíveis."
      }
    ],
    "check": {
      "question": "No exemplo, por que ¬p não é forçada em w0?",
      "options": [
        "Porque w1 é extensão que força p.",
        "Porque w0 já força p.",
        "Porque p é uma probabilidade."
      ],
      "correct": 0,
      "why": "A extensão com prova de p impede afirmar sua impossibilidade construtiva."
    }
  }
};
export const FOCUSED_ASSESSMENTS_B={
  "medias_ponderadas": [
    {
      "question": "10 pessoas com 100% e 90 com 0% produzem:",
      "options": [
        "10% no conjunto.",
        "50% no conjunto.",
        "100% no conjunto."
      ],
      "correct": 0,
      "why": "10 positivos entre cem pessoas representam 10%.",
      "dimension": "application",
      "objective": "Variação do conceito central"
    },
    {
      "question": "20 pessoas com 50% e 80 com 75% produzem:",
      "options": [
        "70%.",
        "62,5%.",
        "75%."
      ],
      "correct": 0,
      "why": "Somam-se dez e sessenta casos favoráveis.",
      "dimension": "application",
      "objective": "Variação do conceito central"
    },
    {
      "question": "50 pessoas com 80% e 50 com 60% produzem:",
      "options": [
        "70%.",
        "80%.",
        "60%."
      ],
      "correct": 0,
      "why": "40+30=70 casos positivos em cem pessoas.",
      "dimension": "application",
      "objective": "Variação do conceito central"
    },
    {
      "question": "10 pessoas com 90% e 90 com 50% produzem:",
      "options": [
        "54%.",
        "70%.",
        "90%."
      ],
      "correct": 0,
      "why": "9+45=54 casos entre 100. A conclusão é uma aplicação da definição estudada na leitura e no exemplo resolvido.",
      "dimension": "application",
      "objective": "Variação do conceito central"
    },
    {
      "question": "Examine o conceito 1: Uma taxa agregada se calcula por:",
      "options": [
        "Total de casos favoráveis dividido pelo total de pessoas.",
        "Média simples de percentuais arbitrários.",
        "A maior taxa individual."
      ],
      "correct": 0,
      "why": "Os tamanhos dos grupos determinam o peso de cada percentual.",
      "dimension": "concept",
      "objective": "Definição da competência central"
    },
    {
      "question": "Examine o conceito 2: O grupo de maior tamanho exerce:",
      "options": [
        "Maior peso no agregado.",
        "Peso sempre igual ao menor.",
        "Nenhum peso na taxa conjunta."
      ],
      "correct": 0,
      "why": "Há mais indivíduos de seu denominador no resultado conjunto.",
      "dimension": "concept",
      "objective": "Definição da competência central"
    },
    {
      "question": "Examine o conceito 3: Dois grupos de tamanhos iguais permitem:",
      "options": [
        "Média simples das duas taxas.",
        "Somar percentuais sem dividir.",
        "Descartar um grupo."
      ],
      "correct": 0,
      "why": "Com denominadores iguais, cada taxa tem o mesmo peso.",
      "dimension": "concept",
      "objective": "Definição da competência central"
    },
    {
      "question": "Examine o conceito 4: A taxa ponderada de 40% e 80% deve ficar:",
      "options": [
        "Entre 40% e 80%.",
        "Acima de 80%.",
        "Abaixo de 40%."
      ],
      "correct": 0,
      "why": "Uma combinação com pesos não negativos não extrapola os extremos.",
      "dimension": "concept",
      "objective": "Definição da competência central"
    }
  ],
  "temporal_composta": [
    {
      "question": "Traço p=F,V,V. F(Gp) em t0:",
      "options": [
        "V.",
        "F.",
        "Indefinido."
      ],
      "correct": 0,
      "why": "Em t1 o estado de p permanece verdadeiro.",
      "dimension": "application",
      "objective": "Variação do conceito central"
    },
    {
      "question": "Traço p=V,F,V. G(Fp) em t0:",
      "options": [
        "V.",
        "F.",
        "Indefinido."
      ],
      "correct": 0,
      "why": "Todo instante ainda alcança uma ocorrência de p, especialmente a final.",
      "dimension": "application",
      "objective": "Variação do conceito central"
    },
    {
      "question": "Traço p=F,V,F. G(Fp) em t0:",
      "options": [
        "F.",
        "V.",
        "Indefinido."
      ],
      "correct": 0,
      "why": "No último instante p é falsa e não há futuro restante.",
      "dimension": "application",
      "objective": "Variação do conceito central"
    },
    {
      "question": "Traço p=V,V,V. F(Gp) em t0:",
      "options": [
        "V.",
        "F.",
        "Somente se Xp for verdadeira."
      ],
      "correct": 0,
      "why": "Gp já vale desde t0. A conclusão é uma aplicação da definição estudada na leitura e no exemplo resolvido.",
      "dimension": "application",
      "objective": "Variação do conceito central"
    },
    {
      "question": "Examine o conceito 1: F(Gp) exige:",
      "options": [
        "Algum instante a partir do qual p permanece.",
        "p somente agora.",
        "p falsa no último estado."
      ],
      "correct": 0,
      "why": "F busca um ponto no qual Gp vale.",
      "dimension": "concept",
      "objective": "Definição da competência central"
    },
    {
      "question": "Examine o conceito 2: G(Fp) exige:",
      "options": [
        "Em cada instante, uma ocorrência de p agora ou depois.",
        "Uma única ocorrência inicial.",
        "p verdadeira só no primeiro instante."
      ],
      "correct": 0,
      "why": "O F interno deve valer em todos os pontos.",
      "dimension": "concept",
      "objective": "Definição da competência central"
    },
    {
      "question": "Examine o conceito 3: Qual operador é avaliado primeiro em F(Gp)?",
      "options": [
        "O interno Gp.",
        "O externo F.",
        "Uma condicional que não aparece."
      ],
      "correct": 0,
      "why": "Operadores aninhados são avaliados de dentro para fora.",
      "dimension": "concept",
      "objective": "Definição da competência central"
    },
    {
      "question": "Examine o conceito 4: Qual instante é crucial para G(Fp) num traço finito?",
      "options": [
        "O último, pois Fp depende do futuro restante.",
        "Somente o primeiro.",
        "Somente um estado antes do inicial."
      ],
      "correct": 0,
      "why": "No fim só existe o instante atual na convenção inclusiva.",
      "dimension": "concept",
      "objective": "Definição da competência central"
    }
  ],
  "fde_operacoes": [
    {
      "question": "Qual é ¬T?",
      "options": [
        "F.",
        "T.",
        "B."
      ],
      "correct": 0,
      "why": "O par (1,0) passa a (0,1). A conclusão é uma aplicação da definição estudada na leitura e no exemplo resolvido.",
      "dimension": "application",
      "objective": "Variação do conceito central"
    },
    {
      "question": "Qual é ¬F?",
      "options": [
        "T.",
        "N.",
        "B."
      ],
      "correct": 0,
      "why": "O par (0,1) passa a (1,0). A conclusão é uma aplicação da definição estudada na leitura e no exemplo resolvido.",
      "dimension": "application",
      "objective": "Variação do conceito central"
    },
    {
      "question": "Qual é ¬B?",
      "options": [
        "B.",
        "F.",
        "N."
      ],
      "correct": 0,
      "why": "Os dois suportes presentes continuam presentes.",
      "dimension": "application",
      "objective": "Variação do conceito central"
    },
    {
      "question": "Qual é ¬N?",
      "options": [
        "N.",
        "B.",
        "T."
      ],
      "correct": 0,
      "why": "A ausência dos dois suportes permanece.",
      "dimension": "application",
      "objective": "Variação do conceito central"
    },
    {
      "question": "Examine o conceito 1: A negação em FDE faz:",
      "options": [
        "Troca dos suportes positivo e negativo.",
        "Soma probabilidades.",
        "Apaga qualquer evidência."
      ],
      "correct": 0,
      "why": "Negar troca as duas componentes do par.",
      "dimension": "concept",
      "objective": "Definição da competência central"
    },
    {
      "question": "Examine o conceito 2: O estado B significa:",
      "options": [
        "Ambos os suportes presentes.",
        "Nenhum suporte.",
        "Somente positivo."
      ],
      "correct": 0,
      "why": "B representa (1,1). A conclusão é uma aplicação da definição estudada na leitura e no exemplo resolvido.",
      "dimension": "concept",
      "objective": "Definição da competência central"
    },
    {
      "question": "Examine o conceito 3: O estado N significa:",
      "options": [
        "Nenhum dos dois suportes.",
        "Ambos os suportes.",
        "Somente negativo."
      ],
      "correct": 0,
      "why": "N representa (0,0). A conclusão é uma aplicação da definição estudada na leitura e no exemplo resolvido.",
      "dimension": "concept",
      "objective": "Definição da competência central"
    },
    {
      "question": "Examine o conceito 4: Ao negar T, o positivo passa a:",
      "options": [
        "0.",
        "1.",
        "2."
      ],
      "correct": 0,
      "why": "T=(1,0), que vira (0,1). A conclusão é uma aplicação da definição estudada na leitura e no exemplo resolvido.",
      "dimension": "concept",
      "objective": "Definição da competência central"
    }
  ],
  "intuicionista_negacao": [
    {
      "question": "w0 não força p, mas w1 estende w0 e força p. Em w0 ¬p:",
      "options": [
        "Não é forçada.",
        "É forçada.",
        "É equivalente a p."
      ],
      "correct": 0,
      "why": "A extensão fornece a prova que impede a negação.",
      "dimension": "application",
      "objective": "Variação do conceito central"
    },
    {
      "question": "Se alguma extensão força p, ¬p no mundo atual é:",
      "options": [
        "Não forçada.",
        "Sempre forçada.",
        "Incompatível com a linguagem."
      ],
      "correct": 0,
      "why": "Basta uma extensão com p para impedir a negação.",
      "dimension": "application",
      "objective": "Variação do conceito central"
    },
    {
      "question": "Um mundo sem prova de p, mas com possibilidade futura de p:",
      "options": [
        "Não conhece necessariamente ¬p.",
        "Já demonstra ¬p.",
        "Demonstra a falsidade de todo predicado."
      ],
      "correct": 0,
      "why": "Ausência de prova não é impossibilidade construtiva.",
      "dimension": "application",
      "objective": "Variação do conceito central"
    },
    {
      "question": "Um mundo em que nenhuma extensão força p pode:",
      "options": [
        "Forçar ¬p.",
        "Forçar obrigatoriamente p.",
        "Forçar p∧¬p."
      ],
      "correct": 0,
      "why": "A impossibilidade de forçar p em todas as extensões sustenta sua negação.",
      "dimension": "application",
      "objective": "Variação do conceito central"
    },
    {
      "question": "Examine o conceito 1: ¬p em lógica intuicionista significa:",
      "options": [
        "p→⊥.",
        "Somente não ter notícia de p.",
        "p com probabilidade zero."
      ],
      "correct": 0,
      "why": "A negação transforma uma prova de p em absurdo.",
      "dimension": "concept",
      "objective": "Definição da competência central"
    },
    {
      "question": "Examine o conceito 2: A ausência de prova atual de p:",
      "options": [
        "Não basta para provar ¬p.",
        "Basta sempre para provar ¬p.",
        "Prova p∨¬p automaticamente."
      ],
      "correct": 0,
      "why": "Uma extensão pode estabelecer p.",
      "dimension": "concept",
      "objective": "Definição da competência central"
    },
    {
      "question": "Examine o conceito 3: Mundos de informação crescente preservam:",
      "options": [
        "O que já foi forçado nas extensões.",
        "A falta de prova como negação.",
        "Todas as proposições falsas."
      ],
      "correct": 0,
      "why": "Forçamento é persistente ao aumentar informação.",
      "dimension": "concept",
      "objective": "Definição da competência central"
    },
    {
      "question": "Examine o conceito 4: Para forçar ¬p num mundo, devemos:",
      "options": [
        "Excluir p em todas as extensões.",
        "Encontrar uma extensão com p.",
        "Não olhar nenhuma extensão."
      ],
      "correct": 0,
      "why": "Negação exige impossibilidade futura de provar p.",
      "dimension": "concept",
      "objective": "Definição da competência central"
    }
  ]
};
export const FOCUSED_PRACTICE_B={
  "medias_ponderadas": [
    {
      "question": "Treine o caso 1: Dois grupos de tamanhos iguais permitem:",
      "options": [
        "Média simples das duas taxas.",
        "Somar percentuais sem dividir.",
        "Descartar um grupo."
      ],
      "correct": 0,
      "why": "Com denominadores iguais, cada taxa tem o mesmo peso."
    },
    {
      "question": "Treine o caso 2: A taxa ponderada de 40% e 80% deve ficar:",
      "options": [
        "Entre 40% e 80%.",
        "Acima de 80%.",
        "Abaixo de 40%."
      ],
      "correct": 0,
      "why": "Uma combinação com pesos não negativos não extrapola os extremos."
    },
    {
      "question": "Treine o caso 3: 10 pessoas com 100% e 90 com 0% produzem:",
      "options": [
        "10% no conjunto.",
        "50% no conjunto.",
        "100% no conjunto."
      ],
      "correct": 0,
      "why": "10 positivos entre cem pessoas representam 10%."
    },
    {
      "question": "Treine o caso 4: 20 pessoas com 50% e 80 com 75% produzem:",
      "options": [
        "70%.",
        "62,5%.",
        "75%."
      ],
      "correct": 0,
      "why": "Somam-se dez e sessenta casos favoráveis."
    },
    {
      "question": "Treine o caso 5: 50 pessoas com 80% e 50 com 60% produzem:",
      "options": [
        "70%.",
        "80%.",
        "60%."
      ],
      "correct": 0,
      "why": "40+30=70 casos positivos em cem pessoas."
    },
    {
      "question": "Treine o caso 6: 10 pessoas com 90% e 90 com 50% produzem:",
      "options": [
        "54%.",
        "70%.",
        "90%."
      ],
      "correct": 0,
      "why": "9+45=54 casos entre 100. A conclusão é uma aplicação da definição estudada na leitura e no exemplo resolvido."
    }
  ],
  "temporal_composta": [
    {
      "question": "Treine o caso 1: Qual operador é avaliado primeiro em F(Gp)?",
      "options": [
        "O interno Gp.",
        "O externo F.",
        "Uma condicional que não aparece."
      ],
      "correct": 0,
      "why": "Operadores aninhados são avaliados de dentro para fora."
    },
    {
      "question": "Treine o caso 2: Qual instante é crucial para G(Fp) num traço finito?",
      "options": [
        "O último, pois Fp depende do futuro restante.",
        "Somente o primeiro.",
        "Somente um estado antes do inicial."
      ],
      "correct": 0,
      "why": "No fim só existe o instante atual na convenção inclusiva."
    },
    {
      "question": "Treine o caso 3: Traço p=F,V,V. F(Gp) em t0:",
      "options": [
        "V.",
        "F.",
        "Indefinido."
      ],
      "correct": 0,
      "why": "Em t1 o estado de p permanece verdadeiro."
    },
    {
      "question": "Treine o caso 4: Traço p=V,F,V. G(Fp) em t0:",
      "options": [
        "V.",
        "F.",
        "Indefinido."
      ],
      "correct": 0,
      "why": "Todo instante ainda alcança uma ocorrência de p, especialmente a final."
    },
    {
      "question": "Treine o caso 5: Traço p=F,V,F. G(Fp) em t0:",
      "options": [
        "F.",
        "V.",
        "Indefinido."
      ],
      "correct": 0,
      "why": "No último instante p é falsa e não há futuro restante."
    },
    {
      "question": "Treine o caso 6: Traço p=V,V,V. F(Gp) em t0:",
      "options": [
        "V.",
        "F.",
        "Somente se Xp for verdadeira."
      ],
      "correct": 0,
      "why": "Gp já vale desde t0. A conclusão é uma aplicação da definição estudada na leitura e no exemplo resolvido."
    }
  ],
  "fde_operacoes": [
    {
      "question": "Treine o caso 1: O estado N significa:",
      "options": [
        "Nenhum dos dois suportes.",
        "Ambos os suportes.",
        "Somente negativo."
      ],
      "correct": 0,
      "why": "N representa (0,0). A conclusão é uma aplicação da definição estudada na leitura e no exemplo resolvido."
    },
    {
      "question": "Treine o caso 2: Ao negar T, o positivo passa a:",
      "options": [
        "0.",
        "1.",
        "2."
      ],
      "correct": 0,
      "why": "T=(1,0), que vira (0,1). A conclusão é uma aplicação da definição estudada na leitura e no exemplo resolvido."
    },
    {
      "question": "Treine o caso 3: Qual é ¬T?",
      "options": [
        "F.",
        "T.",
        "B."
      ],
      "correct": 0,
      "why": "O par (1,0) passa a (0,1). A conclusão é uma aplicação da definição estudada na leitura e no exemplo resolvido."
    },
    {
      "question": "Treine o caso 4: Qual é ¬F?",
      "options": [
        "T.",
        "N.",
        "B."
      ],
      "correct": 0,
      "why": "O par (0,1) passa a (1,0). A conclusão é uma aplicação da definição estudada na leitura e no exemplo resolvido."
    },
    {
      "question": "Treine o caso 5: Qual é ¬B?",
      "options": [
        "B.",
        "F.",
        "N."
      ],
      "correct": 0,
      "why": "Os dois suportes presentes continuam presentes."
    },
    {
      "question": "Treine o caso 6: Qual é ¬N?",
      "options": [
        "N.",
        "B.",
        "T."
      ],
      "correct": 0,
      "why": "A ausência dos dois suportes permanece."
    }
  ],
  "intuicionista_negacao": [
    {
      "question": "Treine o caso 1: Mundos de informação crescente preservam:",
      "options": [
        "O que já foi forçado nas extensões.",
        "A falta de prova como negação.",
        "Todas as proposições falsas."
      ],
      "correct": 0,
      "why": "Forçamento é persistente ao aumentar informação."
    },
    {
      "question": "Treine o caso 2: Para forçar ¬p num mundo, devemos:",
      "options": [
        "Excluir p em todas as extensões.",
        "Encontrar uma extensão com p.",
        "Não olhar nenhuma extensão."
      ],
      "correct": 0,
      "why": "Negação exige impossibilidade futura de provar p."
    },
    {
      "question": "Treine o caso 3: w0 não força p, mas w1 estende w0 e força p. Em w0 ¬p:",
      "options": [
        "Não é forçada.",
        "É forçada.",
        "É equivalente a p."
      ],
      "correct": 0,
      "why": "A extensão fornece a prova que impede a negação."
    },
    {
      "question": "Treine o caso 4: Se alguma extensão força p, ¬p no mundo atual é:",
      "options": [
        "Não forçada.",
        "Sempre forçada.",
        "Incompatível com a linguagem."
      ],
      "correct": 0,
      "why": "Basta uma extensão com p para impedir a negação."
    },
    {
      "question": "Treine o caso 5: Um mundo sem prova de p, mas com possibilidade futura de p:",
      "options": [
        "Não conhece necessariamente ¬p.",
        "Já demonstra ¬p.",
        "Demonstra a falsidade de todo predicado."
      ],
      "correct": 0,
      "why": "Ausência de prova não é impossibilidade construtiva."
    },
    {
      "question": "Treine o caso 6: Um mundo em que nenhuma extensão força p pode:",
      "options": [
        "Forçar ¬p.",
        "Forçar obrigatoriamente p.",
        "Forçar p∧¬p."
      ],
      "correct": 0,
      "why": "A impossibilidade de forçar p em todas as extensões sustenta sua negação."
    }
  ]
};