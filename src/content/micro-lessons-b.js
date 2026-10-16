/** Microaulas II: escopo, inferências, taxas e lógica não clássica. */
export const MICRO_LESSONS_B={
  "infer_conectivos": {
    "lead": "Como construir conclusões simples a partir do E e do OU?",
    "theory": "Se p∧q já foi estabelecida, as duas afirmações são verdadeiras. Podemos registrar p ou q numa linha posterior: essa é a eliminação da conjunção. Uma prova deve indicar de qual linha conjunta saiu a parte escolhida. A regra não permite inferir a negação da outra parte, pois ambas estão presentes.\n\nSe p e q foram demonstradas em linhas distintas, podemos reunir as duas em p∧q. Essa regra se chama introdução de conjunção e exige que ambos os componentes estejam disponíveis. Não é permitido construir p∧q tendo somente p. A nova linha não pode supor, sem outra prova, que q também vale.\n\nDe p podemos concluir p∨r, porque a disjunção inclusiva é verdadeira quando ao menos uma parte vale. Esse passo chama-se introdução de disjunção. A conclusão p∨r não prova que r é verdadeira. Essa distinção evita confundir acrescentar uma alternativa com demonstrar cada alternativa isoladamente.",
    "example": "Uma prova já contém as linhas 1. p∧q e 2. r. Construa uma nova conjunção com q e r.",
    "steps": [
      "De p∧q, conclua q por eliminação de conjunção.",
      "A premissa r já está disponível na segunda linha; não precisamos deduzi-la novamente.",
      "De q e r, conclua q∧r por introdução de conjunção."
    ],
    "quiz": [
      {
        "question": "Qual regra extrai p de p∧q?",
        "options": [
          "Eliminação da conjunção.",
          "Introdução da conjunção.",
          "Modus tollens."
        ],
        "correct": 0,
        "why": "A conjunção já garante cada parte."
      },
      {
        "question": "Para introduzir p∧q precisamos de:",
        "options": [
          "Uma prova de p e outra de q.",
          "Somente p.",
          "Somente p∨q."
        ],
        "correct": 0,
        "why": "O E exige que as duas partes estejam estabelecidas."
      },
      {
        "question": "De p é válido introduzir:",
        "options": [
          "p∨r.",
          "p∧r.",
          "r."
        ],
        "correct": 0,
        "why": "Uma disjunção inclusiva vale quando p vale."
      },
      {
        "question": "Introdução de p∨r a partir de p prova r?",
        "options": [
          "Não.",
          "Sim.",
          "Somente quando r é falsa."
        ],
        "correct": 0,
        "why": "A disjunção não obriga a segunda alternativa."
      }
    ]
  },
  "quantificadores_escopo": {
    "lead": "O que muda quando a negação alcança uma frase inteira com quantificadores?",
    "theory": "A fórmula ¬∀x(P(x)→Q(x)) não afirma que nenhum P seja Q. Ela diz que o enunciado universal tem contraexemplo: existe um elemento P que não é Q. A negação cobre o quantificador e toda a condicional sob seu escopo. A diferença aparece quando há alguns P que são Q e outros que não: a universal falha, mas nem todos os P falham.\n\nTransforme primeiro ¬∀xA(x) em ∃x¬A(x), mantendo A intacta. Depois, se A for P(x)→Q(x), a negação interna equivale a P(x)∧¬Q(x). Esse procedimento em duas etapas evita a troca incorreta de ∀ por ∀ ou a negação simultânea de todos os predicados sem respeitar os conectivos.\n\nEm ¬∀x∃yR(x,y), negue de fora para dentro: ∃x∀y¬R(x,y). Isso afirma que existe um x que não se relaciona por R com nenhum y do domínio. A ordem importa: ∀y∃x¬R(x,y) diz que para cada y há algum x não relacionado, podendo ser um x diferente em cada caso. Não troque a ordem sem uma justificativa.",
    "example": "Negue ¬∀x(P(x)→Q(x)) em duas etapas explícitas.",
    "steps": [
      "Obtenha ∃x¬(P(x)→Q(x)).",
      "Substitua ¬(P(x)→Q(x)) por P(x)∧¬Q(x).",
      "O resultado ∃x(P(x)∧¬Q(x)) afirma que existe um P que não é Q."
    ],
    "quiz": [
      {
        "question": "Como proceder numa negação com vários quantificadores?",
        "options": [
          "De fora para dentro, mantendo a ordem.",
          "Inverter a ordem arbitrariamente.",
          "Negar apenas a última variável."
        ],
        "correct": 0,
        "why": "Cada operador troca de tipo, mas o escopo continua aninhado."
      },
      {
        "question": "A negação de ∀x∃yR(x,y) começa por:",
        "options": [
          "∃x¬∃yR(x,y).",
          "∀y¬∀xR(x,y).",
          "∀x∀yR(x,y)."
        ],
        "correct": 0,
        "why": "Primeiro trocamos a universal externa."
      },
      {
        "question": "Negar a condicional P(x)→Q(x) produz:",
        "options": [
          "P(x)∧¬Q(x).",
          "¬P(x)→¬Q(x).",
          "P(x)∨Q(x)."
        ],
        "correct": 0,
        "why": "A negação afirma um antecedente verdadeiro sem consequência."
      },
      {
        "question": "Na negação de ∀x(P(x)→Q(x)), buscamos:",
        "options": [
          "Um P que não seja Q.",
          "Que nenhum P seja Q.",
          "Que todos sejam P e Q."
        ],
        "correct": 0,
        "why": "Uma universal falha diante de um único contraexemplo."
      }
    ]
  },
  "simpson_composicao": {
    "lead": "Como uma opção pode apresentar melhores taxas em cada grupo e um total aparentemente pior?",
    "theory": "Ao comparar tratamentos, categorias como casos leves e graves podem ter taxas muito diferentes. Uma opção pode se sair melhor em cada categoria, mas receber proporção maior dos casos difíceis. A comparação por grupo pergunta pelo desempenho entre pessoas semelhantes segundo a variável considerada. A comparação agregada pergunta pelo resultado total dos casos realmente atendidos.\n\nSuponha que a clínica A receba 90 casos leves, com 90% de recuperação, e 10 graves, com 40%. Sua recuperação total será 81+4=85 entre 100 casos. A clínica B pode recuperar 95% dos 20 leves e 50% dos 80 graves: 19+40=59 entre 100. Apesar de B ter taxas melhores nos dois estratos, seu total é menor porque a maioria de seus casos é grave.\n\nO paradoxo de Simpson mostra a necessidade de examinar pesos e variáveis de composição. A inversão agregada não permite, sozinha, dizer que uma clínica causa melhor ou pior recuperação. Para investigar o efeito do tratamento, pode ser necessário estudar gravidade, critérios de encaminhamento e outros fatores. Calcule denominadores de cada estrato antes de tirar conclusões causais.",
    "example": "Clínica A: 81/90 leves e 4/10 graves recuperados. Clínica B: 19/20 leves e 40/80 graves recuperados.",
    "steps": [
      "B recupera 95% dos leves contra 90% de A, e 50% dos graves contra 40% de A.",
      "A recupera 85 de 100; B recupera 59 de 100, porque atende mais casos graves.",
      "A inversão é compatível com diferentes composições de pacientes e não prova que A trate melhor."
    ],
    "quiz": [
      {
        "question": "O paradoxo de Simpson envolve:",
        "options": [
          "Comparações estratificadas e agregadas com pesos diferentes.",
          "Qualquer soma incorreta.",
          "Um gráfico sem eixo zero."
        ],
        "correct": 0,
        "why": "A composição pode mudar a ordenação dos agregados."
      },
      {
        "question": "Um agregado mais baixo prova tratamento pior?",
        "options": [
          "Não, a composição pode explicar a diferença.",
          "Sim, sem considerar grupos.",
          "Sim, porque a amostra é maior."
        ],
        "correct": 0,
        "why": "Atribuir causa exige examinar comparabilidade dos casos."
      },
      {
        "question": "O fator comum que merece estratificação deve ser:",
        "options": [
          "Relevante para o desfecho e distribuído diferentemente.",
          "Apenas a letra do nome da clínica.",
          "Sempre o ano de nascimento do médico."
        ],
        "correct": 0,
        "why": "Estratificar fatores relevantes ajuda a comparar casos semelhantes."
      },
      {
        "question": "Um grupo com muitos casos graves terá seu agregado influenciado por:",
        "options": [
          "A taxa observada entre casos graves.",
          "A cor das tabelas.",
          "O número de proposições lógicas."
        ],
        "correct": 0,
        "why": "Os pesos determinam a contribuição de cada estrato."
      }
    ]
  },
  "temporal_condicional": {
    "lead": "Como representar a obrigação de responder sempre que um pedido aparece?",
    "theory": "A expressão G(p→Fq) diz: em cada instante do traço, se p acontece, então q acontece agora ou em algum instante posterior. Pense em p como um pedido e q como uma resposta. Não é suficiente observar uma resposta isolada no início se surgirem pedidos depois. Cada pedido precisa ter uma resposta a partir do seu próprio momento.\n\nCalcule Fq em cada instante, verificando se existe algum q dali até o fim. Em seguida, calcule p→Fq para cada linha; a condicional falha quando existe pedido sem resposta restante. Somente depois aplique G à coluna completa: a fórmula global vale se todas as condicionais locais forem verdadeiras.\n\nSe p aparece no último instante e q não aparece nesse mesmo instante, Fq é falso. Portanto p→Fq é falso e G(p→Fq) também é falso. Esse contraexemplo ajuda a compreender que G não é uma previsão vaga. Ele verifica todos os instantes do traço, inclusive o último, sob a semântica finita inclusiva adotada.",
    "example": "Num traço t0,t1,t2, p ocorre em t0 e t2; q ocorre somente em t1.",
    "steps": [
      "Fq vale em t0 e t1, pois existe q em t1; falha em t2, já que não há q restante.",
      "Em t0, p→Fq vale; em t1, p é falsa; em t2, p é verdadeira e Fq falsa.",
      "G(p→Fq) é falsa desde t0 porque a condicional falha em t2."
    ],
    "quiz": [
      {
        "question": "O que significa p em G(p→Fq) no exemplo?",
        "options": [
          "Um pedido que requer resposta.",
          "Uma resposta obrigatória.",
          "Uma proibição temporal."
        ],
        "correct": 0,
        "why": "O antecedente marca a condição que ativa a exigência."
      },
      {
        "question": "Em cada instante, Fq procura:",
        "options": [
          "q nesse instante ou depois.",
          "q somente antes.",
          "q em todos os instantes."
        ],
        "correct": 0,
        "why": "F é eventualidade inclusiva na semântica usada."
      },
      {
        "question": "Para que G(p→Fq) seja verdadeira:",
        "options": [
          "Cada ocorrência de p deve ter uma resposta presente ou futura.",
          "Basta uma resposta em qualquer ponto.",
          "Nenhum pedido pode ocorrer."
        ],
        "correct": 0,
        "why": "G exige a condicional em todos os instantes."
      },
      {
        "question": "Qual sequência de cálculo é correta?",
        "options": [
          "Primeiro Fq, depois p→Fq, depois G.",
          "Primeiro G e depois o antecedente.",
          "Primeiro somente p inicial."
        ],
        "correct": 0,
        "why": "Os operadores aninhados são avaliados de dentro para fora."
      }
    ]
  },
  "fde_conjuncao": {
    "lead": "Que informação resulta de juntar duas afirmações pelo E num banco de dados inconsistente?",
    "theory": "Em FDE, escrevemos T=(1,0), F=(0,1), B=(1,1) e N=(0,0). O primeiro componente registra suporte positivo; o segundo, suporte negativo. A conjunção p∧q afirma que ambas as proposições devem ser apoiadas positivamente. Para negar a conjunção, basta haver suporte negativo para uma das partes.\n\nO suporte positivo de p∧q é o mínimo lógico (E) dos positivos de p e q. O suporte negativo é o máximo lógico (OU) dos negativos. Por exemplo, B=(1,1) e N=(0,0). Positivo 1∧0=0; negativo 1∨0=1. O estado resultante da conjunção é F=(0,1).\n\nNão é correto tomar o menor nome de estado ou interpretar B como probabilidade 50%. Primeiro opere os pares de suportes, depois traduza o par resultante para T,F,B ou N. A prática desta aula cobra somente conjunções. A disjunção informacional será estudada depois, quando a regra do negativo se altera.",
    "example": "Calcule B∧N usando os estados B=(1,1) e N=(0,0).",
    "steps": [
      "B possui os dois suportes; N não possui nenhum.",
      "Positivo: 1∧0=0. Negativo: 1∨0=1.",
      "O par (0,1) corresponde a F, portanto B∧N=F."
    ],
    "quiz": [
      {
        "question": "Na conjunção FDE, o suporte positivo requer:",
        "options": [
          "Ambas as parcelas com suporte positivo.",
          "Uma única parcela com suporte positivo.",
          "Ausência de suporte negativo."
        ],
        "correct": 0,
        "why": "As duas afirmações precisam ser apoiadas para haver E positivo."
      },
      {
        "question": "Na conjunção FDE, o suporte negativo requer:",
        "options": [
          "Pelo menos uma parcela com suporte negativo.",
          "As duas parcelas com suporte negativo.",
          "Nenhuma parcela com suporte negativo."
        ],
        "correct": 0,
        "why": "Uma objeção a uma parte basta para a conjunção."
      },
      {
        "question": "Qual é a representação de B?",
        "options": [
          "(1,1).",
          "(0,0).",
          "(1,0)."
        ],
        "correct": 0,
        "why": "B registra suporte verdadeiro e falso ao mesmo tempo."
      },
      {
        "question": "Qual é a representação de N?",
        "options": [
          "(0,0).",
          "(1,1).",
          "(0,1)."
        ],
        "correct": 0,
        "why": "N registra ausência de suporte nos dois sentidos."
      }
    ]
  },
  "fde_disjuncao": {
    "lead": "Como juntar duas afirmações pelo OU quando há informações ausentes ou conflitantes?",
    "theory": "No sistema FDE, T=(1,0), F=(0,1), B=(1,1) e N=(0,0). Em p∨q, uma das partes já basta para apoiar a disjunção positivamente. Assim, o suporte positivo do OU é positivo(p)∨positivo(q). Um suporte a favor de p já faz a disjunção ter apoio favorável, ainda que q seja desconhecida.\n\nPara sustentar negativamente p∨q, é necessário haver evidência contrária a ambas as alternativas. Por isso o suporte negativo é negativo(p)∧negativo(q). Com p=B=(1,1) e q=N=(0,0), o resultado é positivo 1∨0=1 e negativo 1∧0=0, portanto T. O conflito em p não torna a disjunção inteira B.\n\nMonte primeiro os dois pares e calcule os componentes separadamente. Só depois reconverta (1,0) em T, (0,1) em F, (1,1) em B ou (0,0) em N. Compare o exercício de conjunção já estudado: na disjunção, as condições de suporte se invertem. Não calcule uma operação usando a regra da outra.",
    "example": "Calcule B∨N, sabendo que B=(1,1) e N=(0,0).",
    "steps": [
      "B tem suporte positivo e negativo; N não possui nenhum dos dois.",
      "Positivo: 1∨0=1. Negativo: 1∧0=0.",
      "O par (1,0) corresponde ao estado T, então B∨N=T."
    ],
    "quiz": [
      {
        "question": "Para o suporte positivo de p∨q basta:",
        "options": [
          "Uma parcela com positivo.",
          "Duas parcelas com positivo.",
          "Nenhuma parcela com positivo."
        ],
        "correct": 0,
        "why": "Uma alternativa apoiada já apoia a disjunção."
      },
      {
        "question": "Para o suporte negativo de p∨q é preciso:",
        "options": [
          "Negativo nas duas parcelas.",
          "Negativo em uma só parcela.",
          "Qualquer positivo presente."
        ],
        "correct": 0,
        "why": "A disjunção é negada quando nenhuma alternativa é apoiada positivamente."
      },
      {
        "question": "Qual par representa F em FDE?",
        "options": [
          "(0,1).",
          "(1,0).",
          "(1,1)."
        ],
        "correct": 0,
        "why": "F registra somente oposição à proposição."
      },
      {
        "question": "O estado N significa:",
        "options": [
          "Ausência de ambos os suportes.",
          "Ambos os suportes presentes.",
          "Apenas positivo presente."
        ],
        "correct": 0,
        "why": "N é representado pelo par (0,0)."
      }
    ]
  },
  "intuicionista_dupla_negacao": {
    "lead": "Por que impedir a negação de p não é a mesma coisa que construir uma prova de p?",
    "theory": "Na lógica intuicionista, ¬p significa p→⊥: uma prova de p levaria a contradição. Se já temos uma prova de p, não pode haver uma prova coerente de ¬p. Portanto p implica ¬¬p. Esse passo preserva prova construtiva: ao supor ¬p, usamos a prova de p para obter contradição.\n\nA proposição ¬¬p informa que a negação de p é impossível, mas não apresenta necessariamente uma construção de p. Por isso ¬¬p→p não é teorema universal intuicionista. A confusão aparece quando se importa sem justificativa a equivalência clássica p≡¬¬p. Na leitura intuicionista de provas, eliminar duas negações exige condições adicionais.\n\nConsidere w0 que ainda não força p, mas que possui uma extensão w1 na qual p é forçada. Em w0, ¬p não é forçada, pois w1 é contraexemplo à impossibilidade de p. Em um modelo em que toda extensão relevante impede ¬p, podemos ter ¬¬p forçada em w0 mesmo sem p forçada ali. Isso demonstra a diferença entre impossibilidade de negar e prova positiva.",
    "example": "Considere um sistema construtivo no qual já existe uma demonstração da proposição p.",
    "steps": [
      "Há uma construção efetiva de p disponível no sistema.",
      "Como ¬p significa p→⊥, combiná-la à prova de p produz ⊥.",
      "Podemos provar ¬¬p: qualquer prova de ¬p levaria a contradição."
    ],
    "quiz": [
      {
        "question": "Qual direção da dupla negação é válida intuicionisticamente?",
        "options": [
          "p→¬¬p.",
          "¬¬p→p em qualquer modelo.",
          "¬p→p."
        ],
        "correct": 0,
        "why": "Uma prova positiva exclui sua própria negação."
      },
      {
        "question": "Uma afirmação ¬¬p informa:",
        "options": [
          "Que provar ¬p levaria a contradição.",
          "Que já existe prova construtiva de p.",
          "Que p é certamente falsa."
        ],
        "correct": 0,
        "why": "A dupla negação não fornece obrigatoriamente uma testemunha de p."
      },
      {
        "question": "A regra ¬¬p→p é:",
        "options": [
          "Clássica, não universal no intuicionismo.",
          "A regra básica de toda lógica construtiva.",
          "Uma identidade de conjuntos difusos."
        ],
        "correct": 0,
        "why": "A eliminação de dupla negação não é admissível em geral."
      },
      {
        "question": "Como ler ¬p construtivamente?",
        "options": [
          "p→⊥.",
          "Ausência de notícias sobre p.",
          "Probabilidade baixa para p."
        ],
        "correct": 0,
        "why": "Negação transforma prova de p em contradição."
      }
    ]
  }
};
export const MICRO_READINGS_B={
  "infer_conectivos": {
    "objective": "Praticar exclusivamente introdução e eliminação de conjunção e introdução de disjunção em pequenas provas, indicando quais premissas autorizam cada linha.",
    "sections": [
      {
        "heading": "Extrair de uma conjunção",
        "paragraphs": [
          "Se p∧q já foi estabelecida, as duas afirmações são verdadeiras. Podemos registrar p ou q numa linha posterior: essa é a eliminação da conjunção.",
          "Uma prova deve indicar de qual linha conjunta saiu a parte escolhida. A regra não permite inferir a negação da outra parte, pois ambas estão presentes."
        ]
      },
      {
        "heading": "Construir uma conjunção",
        "paragraphs": [
          "Se p e q foram demonstradas em linhas distintas, podemos reunir as duas em p∧q. Essa regra se chama introdução de conjunção e exige que ambos os componentes estejam disponíveis.",
          "Não é permitido construir p∧q tendo somente p. A nova linha não pode supor, sem outra prova, que q também vale."
        ]
      },
      {
        "heading": "Acrescentar uma alternativa",
        "paragraphs": [
          "De p podemos concluir p∨r, porque a disjunção inclusiva é verdadeira quando ao menos uma parte vale. Esse passo chama-se introdução de disjunção.",
          "A conclusão p∨r não prova que r é verdadeira. Essa distinção evita confundir acrescentar uma alternativa com demonstrar cada alternativa isoladamente."
        ]
      }
    ],
    "misconception": "Introdução de ∧ exige ambas as partes; eliminação de ∧ fornece uma parte. Introdução de ∨ não demonstra o novo termo acrescentado.",
    "summary": "De p∧q obtenha p ou q; de p e q construa p∧q; de p construa p∨r. Justifique sempre qual regra usou e quais linhas a autorizam.",
    "check": {
      "question": "Se conhecemos apenas p, qual fórmula podemos introduzir imediatamente?",
      "options": [
        "p∨q.",
        "p∧q.",
        "¬p∧q."
      ],
      "correct": 0,
      "why": "Uma alternativa adicional é permitida no OU inclusivo, mas uma nova conjunção exigiria prova de q."
    }
  },
  "quantificadores_escopo": {
    "objective": "Negar fórmulas quantificadas que possuem condicionais ou múltiplos quantificadores, percorrendo o escopo de fora para dentro sem trocar a ordem indevidamente.",
    "sections": [
      {
        "heading": "O alcance é parte do significado",
        "paragraphs": [
          "A fórmula ¬∀x(P(x)→Q(x)) não afirma que nenhum P seja Q. Ela diz que o enunciado universal tem contraexemplo: existe um elemento P que não é Q.",
          "A negação cobre o quantificador e toda a condicional sob seu escopo. A diferença aparece quando há alguns P que são Q e outros que não: a universal falha, mas nem todos os P falham."
        ]
      },
      {
        "heading": "Negue a expressão interna depois do quantificador",
        "paragraphs": [
          "Transforme primeiro ¬∀xA(x) em ∃x¬A(x), mantendo A intacta. Depois, se A for P(x)→Q(x), a negação interna equivale a P(x)∧¬Q(x).",
          "Esse procedimento em duas etapas evita a troca incorreta de ∀ por ∀ ou a negação simultânea de todos os predicados sem respeitar os conectivos."
        ]
      },
      {
        "heading": "Quando existem dois quantificadores",
        "paragraphs": [
          "Em ¬∀x∃yR(x,y), negue de fora para dentro: ∃x∀y¬R(x,y). Isso afirma que existe um x que não se relaciona por R com nenhum y do domínio.",
          "A ordem importa: ∀y∃x¬R(x,y) diz que para cada y há algum x não relacionado, podendo ser um x diferente em cada caso. Não troque a ordem sem uma justificativa."
        ]
      }
    ],
    "misconception": "Negar quantificadores compostos exige manter o escopo: ¬∀x∃yR(x,y) não é ∀y∃x¬R(x,y), e ¬∀x(P→Q) não é ∀x(P→¬Q).",
    "summary": "Negue a fórmula de fora para dentro, trocando ∀ e ∃ e negando as partes internas. Preserve a ordem dos quantificadores e a estrutura dos conectivos.",
    "check": {
      "question": "Qual fórmula nega ∀x∃yR(x,y)?",
      "options": [
        "∃x∀y¬R(x,y).",
        "∀y∃x¬R(x,y).",
        "∃x∃yR(x,y)."
      ],
      "correct": 0,
      "why": "Os quantificadores trocam na mesma ordem em que aparecem."
    }
  },
  "simpson_composicao": {
    "objective": "Distinguir resultados por estratos de resultados agregados e identificar como distribuições de casos diferentes podem inverter comparações sem produzir contradição.",
    "sections": [
      {
        "heading": "Comparações por estratos",
        "paragraphs": [
          "Ao comparar tratamentos, categorias como casos leves e graves podem ter taxas muito diferentes. Uma opção pode se sair melhor em cada categoria, mas receber proporção maior dos casos difíceis.",
          "A comparação por grupo pergunta pelo desempenho entre pessoas semelhantes segundo a variável considerada. A comparação agregada pergunta pelo resultado total dos casos realmente atendidos."
        ]
      },
      {
        "heading": "A composição altera o total",
        "paragraphs": [
          "Suponha que a clínica A receba 90 casos leves, com 90% de recuperação, e 10 graves, com 40%. Sua recuperação total será 81+4=85 entre 100 casos.",
          "A clínica B pode recuperar 95% dos 20 leves e 50% dos 80 graves: 19+40=59 entre 100. Apesar de B ter taxas melhores nos dois estratos, seu total é menor porque a maioria de seus casos é grave."
        ]
      },
      {
        "heading": "O que a inversão não prova",
        "paragraphs": [
          "O paradoxo de Simpson mostra a necessidade de examinar pesos e variáveis de composição. A inversão agregada não permite, sozinha, dizer que uma clínica causa melhor ou pior recuperação.",
          "Para investigar o efeito do tratamento, pode ser necessário estudar gravidade, critérios de encaminhamento e outros fatores. Calcule denominadores de cada estrato antes de tirar conclusões causais."
        ]
      }
    ],
    "misconception": "Inversão de Simpson não significa erro aritmético, nem permite que uma média ponderada de uma única população saia do intervalo de seus próprios grupos.",
    "summary": "Uma comparação agregada pode se inverter em relação aos estratos quando os grupos têm pesos diferentes. Calcule cada taxa e examine a composição antes de concluir eficácia.",
    "check": {
      "question": "Por que B pode liderar em cada grupo e ficar atrás no agregado?",
      "options": [
        "Porque recebe proporcionalmente mais casos graves.",
        "Porque a matemática dos percentuais é contraditória.",
        "Porque sua taxa por grupo é falsa."
      ],
      "correct": 0,
      "why": "As taxas agregadas usam pesos de grupos diferentes."
    }
  },
  "temporal_condicional": {
    "objective": "Avaliar especificamente G(p→Fq) em traços finitos, distinguindo a ocorrência de um pedido da garantia de resposta em algum instante seguinte ou atual.",
    "sections": [
      {
        "heading": "A frase que motiva a fórmula",
        "paragraphs": [
          "A expressão G(p→Fq) diz: em cada instante do traço, se p acontece, então q acontece agora ou em algum instante posterior. Pense em p como um pedido e q como uma resposta.",
          "Não é suficiente observar uma resposta isolada no início se surgirem pedidos depois. Cada pedido precisa ter uma resposta a partir do seu próprio momento."
        ]
      },
      {
        "heading": "Resolva a parte interna primeiro",
        "paragraphs": [
          "Calcule Fq em cada instante, verificando se existe algum q dali até o fim. Em seguida, calcule p→Fq para cada linha; a condicional falha quando existe pedido sem resposta restante.",
          "Somente depois aplique G à coluna completa: a fórmula global vale se todas as condicionais locais forem verdadeiras."
        ]
      },
      {
        "heading": "Uma falha no último instante",
        "paragraphs": [
          "Se p aparece no último instante e q não aparece nesse mesmo instante, Fq é falso. Portanto p→Fq é falso e G(p→Fq) também é falso.",
          "Esse contraexemplo ajuda a compreender que G não é uma previsão vaga. Ele verifica todos os instantes do traço, inclusive o último, sob a semântica finita inclusiva adotada."
        ]
      }
    ],
    "misconception": "G(p→Fq) não significa simplesmente que q ocorrerá alguma vez; cada ocorrência de p precisa encontrar q no presente ou em seu futuro restante.",
    "summary": "Para avaliar G(p→Fq), calcule Fq em cada instante, depois a condicional local e, por fim, a exigência global G. Qualquer pedido sem resposta refuta o resultado.",
    "check": {
      "question": "Um pedido no último instante sem resposta faz G(p→Fq) valer?",
      "options": [
        "Não, há um pedido sem q dali em diante.",
        "Sim, porque já houve q no passado.",
        "Sim, porque G não inclui o último estado."
      ],
      "correct": 0,
      "why": "O último pedido é um contraexemplo local suficiente."
    }
  },
  "fde_conjuncao": {
    "objective": "Calcular somente a conjunção dos estados T, F, B e N em FDE, utilizando pares de suportes positivo e negativo.",
    "sections": [
      {
        "heading": "Dois tipos de evidência",
        "paragraphs": [
          "Em FDE, escrevemos T=(1,0), F=(0,1), B=(1,1) e N=(0,0). O primeiro componente registra suporte positivo; o segundo, suporte negativo.",
          "A conjunção p∧q afirma que ambas as proposições devem ser apoiadas positivamente. Para negar a conjunção, basta haver suporte negativo para uma das partes."
        ]
      },
      {
        "heading": "Como operar os componentes",
        "paragraphs": [
          "O suporte positivo de p∧q é o mínimo lógico (E) dos positivos de p e q. O suporte negativo é o máximo lógico (OU) dos negativos.",
          "Por exemplo, B=(1,1) e N=(0,0). Positivo 1∧0=0; negativo 1∨0=1. O estado resultante da conjunção é F=(0,1)."
        ]
      },
      {
        "heading": "Controle o resultado",
        "paragraphs": [
          "Não é correto tomar o menor nome de estado ou interpretar B como probabilidade 50%. Primeiro opere os pares de suportes, depois traduza o par resultante para T,F,B ou N.",
          "A prática desta aula cobra somente conjunções. A disjunção informacional será estudada depois, quando a regra do negativo se altera."
        ]
      }
    ],
    "misconception": "Em FDE, B∧N=F, não N: o conflito de B fornece suporte negativo para a conjunção, mesmo que N não forneça suporte algum.",
    "summary": "Para p∧q em FDE, positivo=positivo(p)∧positivo(q) e negativo=negativo(p)∨negativo(q). Converta o par final de volta a T,F,B ou N.",
    "check": {
      "question": "Em FDE, B∧N vale:",
      "options": [
        "F.",
        "B.",
        "N."
      ],
      "correct": 0,
      "why": "Os suportes resultantes são (0,1), representados por F."
    }
  },
  "fde_disjuncao": {
    "objective": "Calcular somente a disjunção dos estados T, F, B e N, explicando por que o suporte positivo requer uma parte e o negativo requer ambas.",
    "sections": [
      {
        "heading": "A disjunção recebe suporte positivo",
        "paragraphs": [
          "No sistema FDE, T=(1,0), F=(0,1), B=(1,1) e N=(0,0). Em p∨q, uma das partes já basta para apoiar a disjunção positivamente.",
          "Assim, o suporte positivo do OU é positivo(p)∨positivo(q). Um suporte a favor de p já faz a disjunção ter apoio favorável, ainda que q seja desconhecida."
        ]
      },
      {
        "heading": "O suporte negativo exige as duas partes",
        "paragraphs": [
          "Para sustentar negativamente p∨q, é necessário haver evidência contrária a ambas as alternativas. Por isso o suporte negativo é negativo(p)∧negativo(q).",
          "Com p=B=(1,1) e q=N=(0,0), o resultado é positivo 1∨0=1 e negativo 1∧0=0, portanto T. O conflito em p não torna a disjunção inteira B."
        ]
      },
      {
        "heading": "Faça os cálculos por partes",
        "paragraphs": [
          "Monte primeiro os dois pares e calcule os componentes separadamente. Só depois reconverta (1,0) em T, (0,1) em F, (1,1) em B ou (0,0) em N.",
          "Compare o exercício de conjunção já estudado: na disjunção, as condições de suporte se invertem. Não calcule uma operação usando a regra da outra."
        ]
      }
    ],
    "misconception": "Em FDE, B∨N=T e não B: falta suporte negativo de N, embora exista suporte positivo de B.",
    "summary": "Para p∨q em FDE, positivo=positivo(p)∨positivo(q) e negativo=negativo(p)∧negativo(q). Converta os dois suportes resultantes para T,F,B ou N.",
    "check": {
      "question": "Em FDE, B∨N vale:",
      "options": [
        "T.",
        "F.",
        "B."
      ],
      "correct": 0,
      "why": "O suporte positivo vale 1 e o negativo vale 0, formando T."
    }
  },
  "intuicionista_dupla_negacao": {
    "objective": "Compreender que provar p implica provar ¬¬p, sem admitir a eliminação universal de dupla negação na lógica intuicionista.",
    "sections": [
      {
        "heading": "Negação como impossibilidade construtiva",
        "paragraphs": [
          "Na lógica intuicionista, ¬p significa p→⊥: uma prova de p levaria a contradição. Se já temos uma prova de p, não pode haver uma prova coerente de ¬p.",
          "Portanto p implica ¬¬p. Esse passo preserva prova construtiva: ao supor ¬p, usamos a prova de p para obter contradição."
        ]
      },
      {
        "heading": "A volta não é geral",
        "paragraphs": [
          "A proposição ¬¬p informa que a negação de p é impossível, mas não apresenta necessariamente uma construção de p. Por isso ¬¬p→p não é teorema universal intuicionista.",
          "A confusão aparece quando se importa sem justificativa a equivalência clássica p≡¬¬p. Na leitura intuicionista de provas, eliminar duas negações exige condições adicionais."
        ]
      },
      {
        "heading": "Interpretação em mundos de conhecimento",
        "paragraphs": [
          "Considere w0 que ainda não força p, mas que possui uma extensão w1 na qual p é forçada. Em w0, ¬p não é forçada, pois w1 é contraexemplo à impossibilidade de p.",
          "Em um modelo em que toda extensão relevante impede ¬p, podemos ter ¬¬p forçada em w0 mesmo sem p forçada ali. Isso demonstra a diferença entre impossibilidade de negar e prova positiva."
        ]
      }
    ],
    "misconception": "Não confunda ¬¬p com uma prova construtiva de p. A direção p→¬¬p é válida, mas a inversa não é um princípio intuicionista geral.",
    "summary": "Uma prova de p implica ¬¬p. A dupla negação impede provar ¬p, mas não constrói necessariamente p. O intuicionismo não elimina universalmente duas negações.",
    "check": {
      "question": "Na lógica intuicionista, o que segue de uma prova de p?",
      "options": [
        "Uma prova de ¬¬p.",
        "Necessariamente uma prova de ¬p.",
        "Que p∨¬p é teorema universal."
      ],
      "correct": 0,
      "why": "Uma prova de p impossibilita construtivamente sua negação."
    }
  }
};
export const MICRO_WORKED_B={
  "infer_conectivos": {
    "context": "Uma prova já contém as linhas 1. p∧q e 2. r. Construa uma nova conjunção com q e r.",
    "steps": [
      {
        "formal": "Extraia q da primeira linha",
        "concrete": "De p∧q, conclua q por eliminação de conjunção.",
        "reason": "A linha original garante ambas as suas partes."
      },
      {
        "formal": "Use a linha r",
        "concrete": "A premissa r já está disponível na segunda linha; não precisamos deduzi-la novamente.",
        "reason": "A introdução de uma conjunção exige as duas partes demonstradas."
      },
      {
        "formal": "Reúna as duas partes",
        "concrete": "De q e r, conclua q∧r por introdução de conjunção.",
        "reason": "Cada parte do resultado possui uma linha anterior como justificativa."
      }
    ],
    "check": {
      "question": "No exemplo, quais duas linhas autorizam q∧r?",
      "options": [
        "Uma linha com q e outra com r.",
        "Apenas p.",
        "Uma linha com ¬q."
      ],
      "correct": 0,
      "why": "A introdução de ∧ exige comprovar cada componente do resultado."
    }
  },
  "quantificadores_escopo": {
    "context": "Negue ¬∀x(P(x)→Q(x)) em duas etapas explícitas.",
    "steps": [
      {
        "formal": "Negue o quantificador universal",
        "concrete": "Obtenha ∃x¬(P(x)→Q(x)).",
        "reason": "A negação de todos exige um contraexemplo."
      },
      {
        "formal": "Negue a condicional",
        "concrete": "Substitua ¬(P(x)→Q(x)) por P(x)∧¬Q(x).",
        "reason": "A condicional falha somente se o antecedente vale e o consequente não."
      },
      {
        "formal": "Interprete a fórmula",
        "concrete": "O resultado ∃x(P(x)∧¬Q(x)) afirma que existe um P que não é Q.",
        "reason": "Um contraexemplo é suficiente para negar a universal."
      }
    ],
    "check": {
      "question": "No exemplo, que tipo de testemunha refuta a regra universal?",
      "options": [
        "Um P que não é Q.",
        "Um objeto que não é P.",
        "Um objeto que é Q sem ser P."
      ],
      "correct": 0,
      "why": "A falha da condicional universal é dada por P verdadeiro e Q falso."
    }
  },
  "simpson_composicao": {
    "context": "Clínica A: 81/90 leves e 4/10 graves recuperados. Clínica B: 19/20 leves e 40/80 graves recuperados.",
    "steps": [
      {
        "formal": "Compare os estratos",
        "concrete": "B recupera 95% dos leves contra 90% de A, e 50% dos graves contra 40% de A.",
        "reason": "As taxas estratificadas favorecem B nos dois tipos de caso."
      },
      {
        "formal": "Calcule os agregados",
        "concrete": "A recupera 85 de 100; B recupera 59 de 100, porque atende mais casos graves.",
        "reason": "O total é determinado pelas contagens, não apenas pelas taxas dentro de cada grupo."
      },
      {
        "formal": "Interprete sem inferir causa",
        "concrete": "A inversão é compatível com diferentes composições de pacientes e não prova que A trate melhor.",
        "reason": "Seria necessário controlar a gravidade e outras diferenças entre os pacientes."
      }
    ],
    "check": {
      "question": "No exemplo das clínicas, qual é a recuperação agregada da clínica A?",
      "options": [
        "85 em 100.",
        "81 em 90 como total.",
        "4 em 10 como total."
      ],
      "correct": 0,
      "why": "A recuperou 81 leves e quatro graves, somando 85 em cem pacientes."
    }
  },
  "temporal_condicional": {
    "context": "Num traço t0,t1,t2, p ocorre em t0 e t2; q ocorre somente em t1.",
    "steps": [
      {
        "formal": "Calcule Fq",
        "concrete": "Fq vale em t0 e t1, pois existe q em t1; falha em t2, já que não há q restante.",
        "reason": "O operador F procura uma ocorrência no presente ou no futuro desde cada instante."
      },
      {
        "formal": "Verifique as condicionais",
        "concrete": "Em t0, p→Fq vale; em t1, p é falsa; em t2, p é verdadeira e Fq falsa.",
        "reason": "A solicitação final ficou sem resposta no próprio traço."
      },
      {
        "formal": "Aplique G",
        "concrete": "G(p→Fq) é falsa desde t0 porque a condicional falha em t2.",
        "reason": "Uma única falha local refuta a exigência de todos os instantes."
      }
    ],
    "check": {
      "question": "No exemplo temporal, qual instante refuta a exigência global?",
      "options": [
        "t2, com pedido e sem resposta restante.",
        "t1, com resposta.",
        "t0, com resposta posterior."
      ],
      "correct": 0,
      "why": "A última solicitação fica sem ocorrência de q presente ou futura."
    }
  },
  "fde_conjuncao": {
    "context": "Calcule B∧N usando os estados B=(1,1) e N=(0,0).",
    "steps": [
      {
        "formal": "Registre os suportes",
        "concrete": "B possui os dois suportes; N não possui nenhum.",
        "reason": "Os pares (1,1) e (0,0) são informação, não probabilidades."
      },
      {
        "formal": "Calcule cada componente",
        "concrete": "Positivo: 1∧0=0. Negativo: 1∨0=1.",
        "reason": "A conjunção exige positivo de ambos, mas negativo de ao menos um."
      },
      {
        "formal": "Identifique o estado",
        "concrete": "O par (0,1) corresponde a F, portanto B∧N=F.",
        "reason": "A conversão de par para rótulo encerra o cálculo."
      }
    ],
    "check": {
      "question": "No exemplo B∧N, que par de suportes resulta?",
      "options": [
        "(0,1).",
        "(1,1).",
        "(0,0)."
      ],
      "correct": 0,
      "why": "O positivo exige ambos os suportes e o negativo recebe a oposição de B."
    }
  },
  "fde_disjuncao": {
    "context": "Calcule B∨N, sabendo que B=(1,1) e N=(0,0).",
    "steps": [
      {
        "formal": "Escreva os estados informacionais",
        "concrete": "B tem suporte positivo e negativo; N não possui nenhum dos dois.",
        "reason": "Os componentes informam apoio e oposição separadamente."
      },
      {
        "formal": "Calcule a disjunção",
        "concrete": "Positivo: 1∨0=1. Negativo: 1∧0=0.",
        "reason": "Uma parte basta para apoiar o OU, mas ambas precisam apoiá-lo negativamente."
      },
      {
        "formal": "Converta o resultado",
        "concrete": "O par (1,0) corresponde ao estado T, então B∨N=T.",
        "reason": "O resultado é suporte somente positivo para a disjunção composta."
      }
    ],
    "check": {
      "question": "No exemplo B∨N, que par de suportes resulta?",
      "options": [
        "(1,0).",
        "(0,1).",
        "(1,1)."
      ],
      "correct": 0,
      "why": "O positivo vem de B e o negativo exige suporte contrário das duas parcelas."
    }
  },
  "intuicionista_dupla_negacao": {
    "context": "Considere um sistema construtivo no qual já existe uma demonstração da proposição p.",
    "steps": [
      {
        "formal": "Assuma a prova dada de p",
        "concrete": "Há uma construção efetiva de p disponível no sistema.",
        "reason": "A prova positiva é o objeto inicial do argumento."
      },
      {
        "formal": "Suponha uma prova de ¬p",
        "concrete": "Como ¬p significa p→⊥, combiná-la à prova de p produz ⊥.",
        "reason": "A negação seria incompatível com a prova positiva."
      },
      {
        "formal": "Conclua a dupla negação",
        "concrete": "Podemos provar ¬¬p: qualquer prova de ¬p levaria a contradição.",
        "reason": "O argumento prova p→¬¬p, mas não sua recíproca."
      }
    ],
    "check": {
      "question": "Qual direção foi efetivamente demonstrada no exemplo construtivo?",
      "options": [
        "p→¬¬p.",
        "¬¬p→p.",
        "¬p→p."
      ],
      "correct": 0,
      "why": "Uma prova de p faz qualquer suposta prova de ¬p levar a contradição."
    }
  }
};
export const MICRO_ASSESSMENTS_B={
  "infer_conectivos": [
    {
      "question": "Da premissa q∧r, qual extração é permitida?",
      "options": [
        "r.",
        "¬r.",
        "q→¬r."
      ],
      "correct": 0,
      "why": "A eliminação de E permite obter qualquer componente.",
      "dimension": "application",
      "objective": "Aplicar uma única competência"
    },
    {
      "question": "Com s e t demonstrados, podemos concluir:",
      "options": [
        "s∧t.",
        "s∧¬t.",
        "¬s∨¬t."
      ],
      "correct": 0,
      "why": "Introdução de E reúne provas anteriores.",
      "dimension": "application",
      "objective": "Aplicar uma única competência"
    },
    {
      "question": "Conhecendo r, qual inclusão é legítima?",
      "options": [
        "r∨p.",
        "r∧p.",
        "p isolado."
      ],
      "correct": 0,
      "why": "A regra de introdução de OU conserva a parte já provada.",
      "dimension": "application",
      "objective": "Aplicar uma única competência"
    },
    {
      "question": "Se só conhecemos p∧q, qual sequência é válida?",
      "options": [
        "Extrair q e depois registrar q∨r.",
        "Concluir ¬q.",
        "Concluir r sem outra premissa."
      ],
      "correct": 0,
      "why": "A eliminação produz q, que pode ser estendida a uma disjunção.",
      "dimension": "application",
      "objective": "Aplicar uma única competência"
    },
    {
      "question": "Em outro contexto, princípio 1: Qual regra extrai p de p∧q?",
      "options": [
        "Eliminação da conjunção.",
        "Introdução da conjunção.",
        "Modus tollens."
      ],
      "correct": 0,
      "why": "A conjunção já garante cada parte.",
      "dimension": "concept",
      "objective": "Compreender a competência isolada"
    },
    {
      "question": "Em outro contexto, princípio 2: Para introduzir p∧q precisamos de:",
      "options": [
        "Uma prova de p e outra de q.",
        "Somente p.",
        "Somente p∨q."
      ],
      "correct": 0,
      "why": "O E exige que as duas partes estejam estabelecidas.",
      "dimension": "concept",
      "objective": "Compreender a competência isolada"
    },
    {
      "question": "Em outro contexto, princípio 3: De p é válido introduzir:",
      "options": [
        "p∨r.",
        "p∧r.",
        "r."
      ],
      "correct": 0,
      "why": "Uma disjunção inclusiva vale quando p vale.",
      "dimension": "concept",
      "objective": "Compreender a competência isolada"
    },
    {
      "question": "Em outro contexto, princípio 4: Introdução de p∨r a partir de p prova r?",
      "options": [
        "Não.",
        "Sim.",
        "Somente quando r é falsa."
      ],
      "correct": 0,
      "why": "A disjunção não obriga a segunda alternativa.",
      "dimension": "concept",
      "objective": "Compreender a competência isolada"
    }
  ],
  "quantificadores_escopo": [
    {
      "question": "Negue ∀x∃yS(x,y).",
      "options": [
        "∃x∀y¬S(x,y).",
        "∃y∀x¬S(x,y).",
        "∀x∀y¬S(x,y)."
      ],
      "correct": 0,
      "why": "Troque ∀ por ∃ e depois ∃ por ∀, preservando a ordem.",
      "dimension": "application",
      "objective": "Aplicar uma única competência"
    },
    {
      "question": "Negue ∃x∀yT(x,y).",
      "options": [
        "∀x∃y¬T(x,y).",
        "∃y∀x¬T(x,y).",
        "∀x∀yT(x,y)."
      ],
      "correct": 0,
      "why": "A dualidade atua em cada quantificador sucessivamente.",
      "dimension": "application",
      "objective": "Aplicar uma única competência"
    },
    {
      "question": "Negue ∀x(A(x)→B(x)).",
      "options": [
        "∃x(A(x)∧¬B(x)).",
        "∀x(A(x)∧¬B(x)).",
        "∃x(¬A(x)→¬B(x))."
      ],
      "correct": 0,
      "why": "Um caso com A e sem B refuta a condicional universal.",
      "dimension": "application",
      "objective": "Aplicar uma única competência"
    },
    {
      "question": "A fórmula ∃x∀y¬R(x,y) afirma:",
      "options": [
        "Existe x sem relação R com qualquer y.",
        "Cada y possui algum x diferente.",
        "Todo x se relaciona com algum y."
      ],
      "correct": 0,
      "why": "O mesmo x é escolhido antes de percorrer todos os y.",
      "dimension": "application",
      "objective": "Aplicar uma única competência"
    },
    {
      "question": "Em outro contexto, princípio 1: Como proceder numa negação com vários quantificadores?",
      "options": [
        "De fora para dentro, mantendo a ordem.",
        "Inverter a ordem arbitrariamente.",
        "Negar apenas a última variável."
      ],
      "correct": 0,
      "why": "Cada operador troca de tipo, mas o escopo continua aninhado.",
      "dimension": "concept",
      "objective": "Compreender a competência isolada"
    },
    {
      "question": "Em outro contexto, princípio 2: A negação de ∀x∃yR(x,y) começa por:",
      "options": [
        "∃x¬∃yR(x,y).",
        "∀y¬∀xR(x,y).",
        "∀x∀yR(x,y)."
      ],
      "correct": 0,
      "why": "Primeiro trocamos a universal externa.",
      "dimension": "concept",
      "objective": "Compreender a competência isolada"
    },
    {
      "question": "Em outro contexto, princípio 3: Negar a condicional P(x)→Q(x) produz:",
      "options": [
        "P(x)∧¬Q(x).",
        "¬P(x)→¬Q(x).",
        "P(x)∨Q(x)."
      ],
      "correct": 0,
      "why": "A negação afirma um antecedente verdadeiro sem consequência.",
      "dimension": "concept",
      "objective": "Compreender a competência isolada"
    },
    {
      "question": "Em outro contexto, princípio 4: Na negação de ∀x(P(x)→Q(x)), buscamos:",
      "options": [
        "Um P que não seja Q.",
        "Que nenhum P seja Q.",
        "Que todos sejam P e Q."
      ],
      "correct": 0,
      "why": "Uma universal falha diante de um único contraexemplo.",
      "dimension": "concept",
      "objective": "Compreender a competência isolada"
    }
  ],
  "simpson_composicao": [
    {
      "question": "A recuperou 81 leves e 4 graves em 100 pacientes. Total?",
      "options": [
        "85%.",
        "90%.",
        "40%."
      ],
      "correct": 0,
      "why": "85 recuperados entre cem correspondem a 85%.",
      "dimension": "application",
      "objective": "Aplicar uma única competência"
    },
    {
      "question": "B recuperou 19 leves e 40 graves em 100 pacientes. Total?",
      "options": [
        "59%.",
        "95%.",
        "50%."
      ],
      "correct": 0,
      "why": "59 recuperados entre cem correspondem a 59%.",
      "dimension": "application",
      "objective": "Aplicar uma única competência"
    },
    {
      "question": "B supera A em leves e graves, mas seu total é menor. Conclusão?",
      "options": [
        "Investigue composição e seleção antes de comparar eficácia.",
        "A matemática é impossível.",
        "A necessariamente causa melhor recuperação."
      ],
      "correct": 0,
      "why": "Os pesos dos grupos podem inverter o agregado.",
      "dimension": "application",
      "objective": "Aplicar uma única competência"
    },
    {
      "question": "Se os grupos das clínicas têm gravidade diferente, o passo útil é:",
      "options": [
        "Comparar separadamente leves e graves.",
        "Comparar só o total.",
        "Eliminar os casos graves da análise sem justificativa."
      ],
      "correct": 0,
      "why": "A estratificação permite visualizar as diferenças por composição.",
      "dimension": "application",
      "objective": "Aplicar uma única competência"
    },
    {
      "question": "Em outro contexto, princípio 1: O paradoxo de Simpson envolve:",
      "options": [
        "Comparações estratificadas e agregadas com pesos diferentes.",
        "Qualquer soma incorreta.",
        "Um gráfico sem eixo zero."
      ],
      "correct": 0,
      "why": "A composição pode mudar a ordenação dos agregados.",
      "dimension": "concept",
      "objective": "Compreender a competência isolada"
    },
    {
      "question": "Em outro contexto, princípio 2: Um agregado mais baixo prova tratamento pior?",
      "options": [
        "Não, a composição pode explicar a diferença.",
        "Sim, sem considerar grupos.",
        "Sim, porque a amostra é maior."
      ],
      "correct": 0,
      "why": "Atribuir causa exige examinar comparabilidade dos casos.",
      "dimension": "concept",
      "objective": "Compreender a competência isolada"
    },
    {
      "question": "Em outro contexto, princípio 3: O fator comum que merece estratificação deve ser:",
      "options": [
        "Relevante para o desfecho e distribuído diferentemente.",
        "Apenas a letra do nome da clínica.",
        "Sempre o ano de nascimento do médico."
      ],
      "correct": 0,
      "why": "Estratificar fatores relevantes ajuda a comparar casos semelhantes.",
      "dimension": "concept",
      "objective": "Compreender a competência isolada"
    },
    {
      "question": "Em outro contexto, princípio 4: Um grupo com muitos casos graves terá seu agregado influenciado por:",
      "options": [
        "A taxa observada entre casos graves.",
        "A cor das tabelas.",
        "O número de proposições lógicas."
      ],
      "correct": 0,
      "why": "Os pesos determinam a contribuição de cada estrato.",
      "dimension": "concept",
      "objective": "Compreender a competência isolada"
    }
  ],
  "temporal_condicional": [
    {
      "question": "Pedido em t0; resposta em t1. O pedido inicial é atendido?",
      "options": [
        "Sim, Fq é verdadeira em t0.",
        "Não, q deveria estar em t0 apenas.",
        "Não, q passado é sempre necessário."
      ],
      "correct": 0,
      "why": "Uma resposta posterior satisfaz Fq desde t0.",
      "dimension": "application",
      "objective": "Aplicar uma única competência"
    },
    {
      "question": "Pedido em t2; nenhuma resposta em t2 ou depois. Consequência:",
      "options": [
        "A fórmula global é falsa.",
        "Uma resposta antiga basta.",
        "A fórmula global é verdadeira por vacuidade."
      ],
      "correct": 0,
      "why": "O pedido sem resposta refuta a condicional local.",
      "dimension": "application",
      "objective": "Aplicar uma única competência"
    },
    {
      "question": "Não há pedidos no traço. G(p→Fq) fica:",
      "options": [
        "V na lógica clássica da condicional em cada instante.",
        "F necessariamente.",
        "Indeterminada por não haver pedidos."
      ],
      "correct": 0,
      "why": "Todos os antecedentes falsos tornam as condicionais verdadeiras.",
      "dimension": "application",
      "objective": "Aplicar uma única competência"
    },
    {
      "question": "Existe resposta em t0 e pedido em t2, sem novas respostas. Resultado:",
      "options": [
        "F, pois q anterior não satisfaz Fq de t2.",
        "V, pois q ocorreu alguma vez.",
        "V, pois pedido dispensa resposta."
      ],
      "correct": 0,
      "why": "A eventualidade parte do instante de cada pedido.",
      "dimension": "application",
      "objective": "Aplicar uma única competência"
    },
    {
      "question": "Em outro contexto, princípio 1: O que significa p em G(p→Fq) no exemplo?",
      "options": [
        "Um pedido que requer resposta.",
        "Uma resposta obrigatória.",
        "Uma proibição temporal."
      ],
      "correct": 0,
      "why": "O antecedente marca a condição que ativa a exigência.",
      "dimension": "concept",
      "objective": "Compreender a competência isolada"
    },
    {
      "question": "Em outro contexto, princípio 2: Em cada instante, Fq procura:",
      "options": [
        "q nesse instante ou depois.",
        "q somente antes.",
        "q em todos os instantes."
      ],
      "correct": 0,
      "why": "F é eventualidade inclusiva na semântica usada.",
      "dimension": "concept",
      "objective": "Compreender a competência isolada"
    },
    {
      "question": "Em outro contexto, princípio 3: Para que G(p→Fq) seja verdadeira:",
      "options": [
        "Cada ocorrência de p deve ter uma resposta presente ou futura.",
        "Basta uma resposta em qualquer ponto.",
        "Nenhum pedido pode ocorrer."
      ],
      "correct": 0,
      "why": "G exige a condicional em todos os instantes.",
      "dimension": "concept",
      "objective": "Compreender a competência isolada"
    },
    {
      "question": "Em outro contexto, princípio 4: Qual sequência de cálculo é correta?",
      "options": [
        "Primeiro Fq, depois p→Fq, depois G.",
        "Primeiro G e depois o antecedente.",
        "Primeiro somente p inicial."
      ],
      "correct": 0,
      "why": "Os operadores aninhados são avaliados de dentro para fora.",
      "dimension": "concept",
      "objective": "Compreender a competência isolada"
    }
  ],
  "fde_conjuncao": [
    {
      "question": "Calcule T∧N.",
      "options": [
        "N.",
        "T.",
        "B."
      ],
      "correct": 0,
      "why": "Positivo 1∧0=0; negativo 0∨0=0.",
      "dimension": "application",
      "objective": "Aplicar uma única competência"
    },
    {
      "question": "Calcule B∧N.",
      "options": [
        "F.",
        "B.",
        "T."
      ],
      "correct": 0,
      "why": "Positivo 0 e negativo 1 resultam em F.",
      "dimension": "application",
      "objective": "Aplicar uma única competência"
    },
    {
      "question": "Calcule B∧T.",
      "options": [
        "B.",
        "T.",
        "N."
      ],
      "correct": 0,
      "why": "Positivo 1 e negativo 1 mantêm ambos os suportes.",
      "dimension": "application",
      "objective": "Aplicar uma única competência"
    },
    {
      "question": "Calcule F∧T.",
      "options": [
        "F.",
        "T.",
        "N."
      ],
      "correct": 0,
      "why": "A conjunção recebe o negativo de F e não recebe positivo de F.",
      "dimension": "application",
      "objective": "Aplicar uma única competência"
    },
    {
      "question": "Em outro contexto, princípio 1: Na conjunção FDE, o suporte positivo requer:",
      "options": [
        "Ambas as parcelas com suporte positivo.",
        "Uma única parcela com suporte positivo.",
        "Ausência de suporte negativo."
      ],
      "correct": 0,
      "why": "As duas afirmações precisam ser apoiadas para haver E positivo.",
      "dimension": "concept",
      "objective": "Compreender a competência isolada"
    },
    {
      "question": "Em outro contexto, princípio 2: Na conjunção FDE, o suporte negativo requer:",
      "options": [
        "Pelo menos uma parcela com suporte negativo.",
        "As duas parcelas com suporte negativo.",
        "Nenhuma parcela com suporte negativo."
      ],
      "correct": 0,
      "why": "Uma objeção a uma parte basta para a conjunção.",
      "dimension": "concept",
      "objective": "Compreender a competência isolada"
    },
    {
      "question": "Em outro contexto, princípio 3: Qual é a representação de B?",
      "options": [
        "(1,1).",
        "(0,0).",
        "(1,0)."
      ],
      "correct": 0,
      "why": "B registra suporte verdadeiro e falso ao mesmo tempo.",
      "dimension": "concept",
      "objective": "Compreender a competência isolada"
    },
    {
      "question": "Em outro contexto, princípio 4: Qual é a representação de N?",
      "options": [
        "(0,0).",
        "(1,1).",
        "(0,1)."
      ],
      "correct": 0,
      "why": "N registra ausência de suporte nos dois sentidos.",
      "dimension": "concept",
      "objective": "Compreender a competência isolada"
    }
  ],
  "fde_disjuncao": [
    {
      "question": "Calcule T∨N.",
      "options": [
        "T.",
        "N.",
        "F."
      ],
      "correct": 0,
      "why": "A disjunção recebe positivo de T e não recebe negativo simultâneo.",
      "dimension": "application",
      "objective": "Aplicar uma única competência"
    },
    {
      "question": "Calcule B∨N.",
      "options": [
        "T.",
        "B.",
        "N."
      ],
      "correct": 0,
      "why": "Há positivo de B mas falta negativo de N.",
      "dimension": "application",
      "objective": "Aplicar uma única competência"
    },
    {
      "question": "Calcule F∨N.",
      "options": [
        "N.",
        "F.",
        "T."
      ],
      "correct": 0,
      "why": "Positivo 0 e negativo 1∧0=0 geram N.",
      "dimension": "application",
      "objective": "Aplicar uma única competência"
    },
    {
      "question": "Calcule F∨B.",
      "options": [
        "B.",
        "F.",
        "N."
      ],
      "correct": 0,
      "why": "Há positivo de B e negativo de ambas as parcelas.",
      "dimension": "application",
      "objective": "Aplicar uma única competência"
    },
    {
      "question": "Em outro contexto, princípio 1: Para o suporte positivo de p∨q basta:",
      "options": [
        "Uma parcela com positivo.",
        "Duas parcelas com positivo.",
        "Nenhuma parcela com positivo."
      ],
      "correct": 0,
      "why": "Uma alternativa apoiada já apoia a disjunção.",
      "dimension": "concept",
      "objective": "Compreender a competência isolada"
    },
    {
      "question": "Em outro contexto, princípio 2: Para o suporte negativo de p∨q é preciso:",
      "options": [
        "Negativo nas duas parcelas.",
        "Negativo em uma só parcela.",
        "Qualquer positivo presente."
      ],
      "correct": 0,
      "why": "A disjunção é negada quando nenhuma alternativa é apoiada positivamente.",
      "dimension": "concept",
      "objective": "Compreender a competência isolada"
    },
    {
      "question": "Em outro contexto, princípio 3: Qual par representa F em FDE?",
      "options": [
        "(0,1).",
        "(1,0).",
        "(1,1)."
      ],
      "correct": 0,
      "why": "F registra somente oposição à proposição.",
      "dimension": "concept",
      "objective": "Compreender a competência isolada"
    },
    {
      "question": "Em outro contexto, princípio 4: O estado N significa:",
      "options": [
        "Ausência de ambos os suportes.",
        "Ambos os suportes presentes.",
        "Apenas positivo presente."
      ],
      "correct": 0,
      "why": "N é representado pelo par (0,0).",
      "dimension": "concept",
      "objective": "Compreender a competência isolada"
    }
  ],
  "intuicionista_dupla_negacao": [
    {
      "question": "Se foi demonstrado q, podemos demonstrar:",
      "options": [
        "¬¬q.",
        "¬q.",
        "¬¬¬q necessariamente como prova de q."
      ],
      "correct": 0,
      "why": "Prova positiva permite introduzir dupla negação.",
      "dimension": "application",
      "objective": "Aplicar uma única competência"
    },
    {
      "question": "Se w0 força ¬¬p mas não p, isso exemplifica:",
      "options": [
        "A diferença entre impedir ¬p e provar p.",
        "Uma contradição obrigatória.",
        "A identidade geral p↔¬¬p."
      ],
      "correct": 0,
      "why": "O modelo separa as duas formas de justificação.",
      "dimension": "application",
      "objective": "Aplicar uma única competência"
    },
    {
      "question": "Por que não concluir p só de ¬¬p?",
      "options": [
        "Porque não recebemos necessariamente uma construção de p.",
        "Porque p é malformada.",
        "Porque p e ¬¬p são negações uma da outra."
      ],
      "correct": 0,
      "why": "A negação duplicada tem conteúdo construtivo distinto.",
      "dimension": "application",
      "objective": "Aplicar uma única competência"
    },
    {
      "question": "Uma prova de p e uma hipótese ¬p produzem:",
      "options": [
        "Contradição ⊥.",
        "Uma nova prova de ¬p.",
        "Uma probabilidade para p."
      ],
      "correct": 0,
      "why": "Negar p é uma transformação de prova de p em absurdo.",
      "dimension": "application",
      "objective": "Aplicar uma única competência"
    },
    {
      "question": "Em outro contexto, princípio 1: Qual direção da dupla negação é válida intuicionisticamente?",
      "options": [
        "p→¬¬p.",
        "¬¬p→p em qualquer modelo.",
        "¬p→p."
      ],
      "correct": 0,
      "why": "Uma prova positiva exclui sua própria negação.",
      "dimension": "concept",
      "objective": "Compreender a competência isolada"
    },
    {
      "question": "Em outro contexto, princípio 2: Uma afirmação ¬¬p informa:",
      "options": [
        "Que provar ¬p levaria a contradição.",
        "Que já existe prova construtiva de p.",
        "Que p é certamente falsa."
      ],
      "correct": 0,
      "why": "A dupla negação não fornece obrigatoriamente uma testemunha de p.",
      "dimension": "concept",
      "objective": "Compreender a competência isolada"
    },
    {
      "question": "Em outro contexto, princípio 3: A regra ¬¬p→p é:",
      "options": [
        "Clássica, não universal no intuicionismo.",
        "A regra básica de toda lógica construtiva.",
        "Uma identidade de conjuntos difusos."
      ],
      "correct": 0,
      "why": "A eliminação de dupla negação não é admissível em geral.",
      "dimension": "concept",
      "objective": "Compreender a competência isolada"
    },
    {
      "question": "Em outro contexto, princípio 4: Como ler ¬p construtivamente?",
      "options": [
        "p→⊥.",
        "Ausência de notícias sobre p.",
        "Probabilidade baixa para p."
      ],
      "correct": 0,
      "why": "Negação transforma prova de p em contradição.",
      "dimension": "concept",
      "objective": "Compreender a competência isolada"
    }
  ]
};
export const MICRO_PRACTICE_B={
  "infer_conectivos": [
    {
      "question": "Prática orientada 1: De p é válido introduzir:",
      "options": [
        "p∨r.",
        "p∧r.",
        "r."
      ],
      "correct": 0,
      "why": "Uma disjunção inclusiva vale quando p vale."
    },
    {
      "question": "Prática orientada 2: Introdução de p∨r a partir de p prova r?",
      "options": [
        "Não.",
        "Sim.",
        "Somente quando r é falsa."
      ],
      "correct": 0,
      "why": "A disjunção não obriga a segunda alternativa."
    },
    {
      "question": "Prática orientada 3: Da premissa q∧r, qual extração é permitida?",
      "options": [
        "r.",
        "¬r.",
        "q→¬r."
      ],
      "correct": 0,
      "why": "A eliminação de E permite obter qualquer componente."
    },
    {
      "question": "Prática orientada 4: Com s e t demonstrados, podemos concluir:",
      "options": [
        "s∧t.",
        "s∧¬t.",
        "¬s∨¬t."
      ],
      "correct": 0,
      "why": "Introdução de E reúne provas anteriores."
    },
    {
      "question": "Prática orientada 5: Conhecendo r, qual inclusão é legítima?",
      "options": [
        "r∨p.",
        "r∧p.",
        "p isolado."
      ],
      "correct": 0,
      "why": "A regra de introdução de OU conserva a parte já provada."
    },
    {
      "question": "Prática orientada 6: Se só conhecemos p∧q, qual sequência é válida?",
      "options": [
        "Extrair q e depois registrar q∨r.",
        "Concluir ¬q.",
        "Concluir r sem outra premissa."
      ],
      "correct": 0,
      "why": "A eliminação produz q, que pode ser estendida a uma disjunção."
    }
  ],
  "quantificadores_escopo": [
    {
      "question": "Prática orientada 1: Negar a condicional P(x)→Q(x) produz:",
      "options": [
        "P(x)∧¬Q(x).",
        "¬P(x)→¬Q(x).",
        "P(x)∨Q(x)."
      ],
      "correct": 0,
      "why": "A negação afirma um antecedente verdadeiro sem consequência."
    },
    {
      "question": "Prática orientada 2: Na negação de ∀x(P(x)→Q(x)), buscamos:",
      "options": [
        "Um P que não seja Q.",
        "Que nenhum P seja Q.",
        "Que todos sejam P e Q."
      ],
      "correct": 0,
      "why": "Uma universal falha diante de um único contraexemplo."
    },
    {
      "question": "Prática orientada 3: Negue ∀x∃yS(x,y).",
      "options": [
        "∃x∀y¬S(x,y).",
        "∃y∀x¬S(x,y).",
        "∀x∀y¬S(x,y)."
      ],
      "correct": 0,
      "why": "Troque ∀ por ∃ e depois ∃ por ∀, preservando a ordem."
    },
    {
      "question": "Prática orientada 4: Negue ∃x∀yT(x,y).",
      "options": [
        "∀x∃y¬T(x,y).",
        "∃y∀x¬T(x,y).",
        "∀x∀yT(x,y)."
      ],
      "correct": 0,
      "why": "A dualidade atua em cada quantificador sucessivamente."
    },
    {
      "question": "Prática orientada 5: Negue ∀x(A(x)→B(x)).",
      "options": [
        "∃x(A(x)∧¬B(x)).",
        "∀x(A(x)∧¬B(x)).",
        "∃x(¬A(x)→¬B(x))."
      ],
      "correct": 0,
      "why": "Um caso com A e sem B refuta a condicional universal."
    },
    {
      "question": "Prática orientada 6: A fórmula ∃x∀y¬R(x,y) afirma:",
      "options": [
        "Existe x sem relação R com qualquer y.",
        "Cada y possui algum x diferente.",
        "Todo x se relaciona com algum y."
      ],
      "correct": 0,
      "why": "O mesmo x é escolhido antes de percorrer todos os y."
    }
  ],
  "simpson_composicao": [
    {
      "question": "Prática orientada 1: O fator comum que merece estratificação deve ser:",
      "options": [
        "Relevante para o desfecho e distribuído diferentemente.",
        "Apenas a letra do nome da clínica.",
        "Sempre o ano de nascimento do médico."
      ],
      "correct": 0,
      "why": "Estratificar fatores relevantes ajuda a comparar casos semelhantes."
    },
    {
      "question": "Prática orientada 2: Um grupo com muitos casos graves terá seu agregado influenciado por:",
      "options": [
        "A taxa observada entre casos graves.",
        "A cor das tabelas.",
        "O número de proposições lógicas."
      ],
      "correct": 0,
      "why": "Os pesos determinam a contribuição de cada estrato."
    },
    {
      "question": "Prática orientada 3: A recuperou 81 leves e 4 graves em 100 pacientes. Total?",
      "options": [
        "85%.",
        "90%.",
        "40%."
      ],
      "correct": 0,
      "why": "85 recuperados entre cem correspondem a 85%."
    },
    {
      "question": "Prática orientada 4: B recuperou 19 leves e 40 graves em 100 pacientes. Total?",
      "options": [
        "59%.",
        "95%.",
        "50%."
      ],
      "correct": 0,
      "why": "59 recuperados entre cem correspondem a 59%."
    },
    {
      "question": "Prática orientada 5: B supera A em leves e graves, mas seu total é menor. Conclusão?",
      "options": [
        "Investigue composição e seleção antes de comparar eficácia.",
        "A matemática é impossível.",
        "A necessariamente causa melhor recuperação."
      ],
      "correct": 0,
      "why": "Os pesos dos grupos podem inverter o agregado."
    },
    {
      "question": "Prática orientada 6: Se os grupos das clínicas têm gravidade diferente, o passo útil é:",
      "options": [
        "Comparar separadamente leves e graves.",
        "Comparar só o total.",
        "Eliminar os casos graves da análise sem justificativa."
      ],
      "correct": 0,
      "why": "A estratificação permite visualizar as diferenças por composição."
    }
  ],
  "temporal_condicional": [
    {
      "question": "Prática orientada 1: Para que G(p→Fq) seja verdadeira:",
      "options": [
        "Cada ocorrência de p deve ter uma resposta presente ou futura.",
        "Basta uma resposta em qualquer ponto.",
        "Nenhum pedido pode ocorrer."
      ],
      "correct": 0,
      "why": "G exige a condicional em todos os instantes."
    },
    {
      "question": "Prática orientada 2: Qual sequência de cálculo é correta?",
      "options": [
        "Primeiro Fq, depois p→Fq, depois G.",
        "Primeiro G e depois o antecedente.",
        "Primeiro somente p inicial."
      ],
      "correct": 0,
      "why": "Os operadores aninhados são avaliados de dentro para fora."
    },
    {
      "question": "Prática orientada 3: Pedido em t0; resposta em t1. O pedido inicial é atendido?",
      "options": [
        "Sim, Fq é verdadeira em t0.",
        "Não, q deveria estar em t0 apenas.",
        "Não, q passado é sempre necessário."
      ],
      "correct": 0,
      "why": "Uma resposta posterior satisfaz Fq desde t0."
    },
    {
      "question": "Prática orientada 4: Pedido em t2; nenhuma resposta em t2 ou depois. Consequência:",
      "options": [
        "A fórmula global é falsa.",
        "Uma resposta antiga basta.",
        "A fórmula global é verdadeira por vacuidade."
      ],
      "correct": 0,
      "why": "O pedido sem resposta refuta a condicional local."
    },
    {
      "question": "Prática orientada 5: Não há pedidos no traço. G(p→Fq) fica:",
      "options": [
        "V na lógica clássica da condicional em cada instante.",
        "F necessariamente.",
        "Indeterminada por não haver pedidos."
      ],
      "correct": 0,
      "why": "Todos os antecedentes falsos tornam as condicionais verdadeiras."
    },
    {
      "question": "Prática orientada 6: Existe resposta em t0 e pedido em t2, sem novas respostas. Resultado:",
      "options": [
        "F, pois q anterior não satisfaz Fq de t2.",
        "V, pois q ocorreu alguma vez.",
        "V, pois pedido dispensa resposta."
      ],
      "correct": 0,
      "why": "A eventualidade parte do instante de cada pedido."
    }
  ],
  "fde_conjuncao": [
    {
      "question": "Prática orientada 1: Qual é a representação de B?",
      "options": [
        "(1,1).",
        "(0,0).",
        "(1,0)."
      ],
      "correct": 0,
      "why": "B registra suporte verdadeiro e falso ao mesmo tempo."
    },
    {
      "question": "Prática orientada 2: Qual é a representação de N?",
      "options": [
        "(0,0).",
        "(1,1).",
        "(0,1)."
      ],
      "correct": 0,
      "why": "N registra ausência de suporte nos dois sentidos."
    },
    {
      "question": "Prática orientada 3: Calcule T∧N.",
      "options": [
        "N.",
        "T.",
        "B."
      ],
      "correct": 0,
      "why": "Positivo 1∧0=0; negativo 0∨0=0."
    },
    {
      "question": "Prática orientada 4: Calcule B∧N.",
      "options": [
        "F.",
        "B.",
        "T."
      ],
      "correct": 0,
      "why": "Positivo 0 e negativo 1 resultam em F."
    },
    {
      "question": "Prática orientada 5: Calcule B∧T.",
      "options": [
        "B.",
        "T.",
        "N."
      ],
      "correct": 0,
      "why": "Positivo 1 e negativo 1 mantêm ambos os suportes."
    },
    {
      "question": "Prática orientada 6: Calcule F∧T.",
      "options": [
        "F.",
        "T.",
        "N."
      ],
      "correct": 0,
      "why": "A conjunção recebe o negativo de F e não recebe positivo de F."
    }
  ],
  "fde_disjuncao": [
    {
      "question": "Prática orientada 1: Qual par representa F em FDE?",
      "options": [
        "(0,1).",
        "(1,0).",
        "(1,1)."
      ],
      "correct": 0,
      "why": "F registra somente oposição à proposição."
    },
    {
      "question": "Prática orientada 2: O estado N significa:",
      "options": [
        "Ausência de ambos os suportes.",
        "Ambos os suportes presentes.",
        "Apenas positivo presente."
      ],
      "correct": 0,
      "why": "N é representado pelo par (0,0)."
    },
    {
      "question": "Prática orientada 3: Calcule T∨N.",
      "options": [
        "T.",
        "N.",
        "F."
      ],
      "correct": 0,
      "why": "A disjunção recebe positivo de T e não recebe negativo simultâneo."
    },
    {
      "question": "Prática orientada 4: Calcule B∨N.",
      "options": [
        "T.",
        "B.",
        "N."
      ],
      "correct": 0,
      "why": "Há positivo de B mas falta negativo de N."
    },
    {
      "question": "Prática orientada 5: Calcule F∨N.",
      "options": [
        "N.",
        "F.",
        "T."
      ],
      "correct": 0,
      "why": "Positivo 0 e negativo 1∧0=0 geram N."
    },
    {
      "question": "Prática orientada 6: Calcule F∨B.",
      "options": [
        "B.",
        "F.",
        "N."
      ],
      "correct": 0,
      "why": "Há positivo de B e negativo de ambas as parcelas."
    }
  ],
  "intuicionista_dupla_negacao": [
    {
      "question": "Prática orientada 1: A regra ¬¬p→p é:",
      "options": [
        "Clássica, não universal no intuicionismo.",
        "A regra básica de toda lógica construtiva.",
        "Uma identidade de conjuntos difusos."
      ],
      "correct": 0,
      "why": "A eliminação de dupla negação não é admissível em geral."
    },
    {
      "question": "Prática orientada 2: Como ler ¬p construtivamente?",
      "options": [
        "p→⊥.",
        "Ausência de notícias sobre p.",
        "Probabilidade baixa para p."
      ],
      "correct": 0,
      "why": "Negação transforma prova de p em contradição."
    },
    {
      "question": "Prática orientada 3: Se foi demonstrado q, podemos demonstrar:",
      "options": [
        "¬¬q.",
        "¬q.",
        "¬¬¬q necessariamente como prova de q."
      ],
      "correct": 0,
      "why": "Prova positiva permite introduzir dupla negação."
    },
    {
      "question": "Prática orientada 4: Se w0 força ¬¬p mas não p, isso exemplifica:",
      "options": [
        "A diferença entre impedir ¬p e provar p.",
        "Uma contradição obrigatória.",
        "A identidade geral p↔¬¬p."
      ],
      "correct": 0,
      "why": "O modelo separa as duas formas de justificação."
    },
    {
      "question": "Prática orientada 5: Por que não concluir p só de ¬¬p?",
      "options": [
        "Porque não recebemos necessariamente uma construção de p.",
        "Porque p é malformada.",
        "Porque p e ¬¬p são negações uma da outra."
      ],
      "correct": 0,
      "why": "A negação duplicada tem conteúdo construtivo distinto."
    },
    {
      "question": "Prática orientada 6: Uma prova de p e uma hipótese ¬p produzem:",
      "options": [
        "Contradição ⊥.",
        "Uma nova prova de ¬p.",
        "Uma probabilidade para p."
      ],
      "correct": 0,
      "why": "Negar p é uma transformação de prova de p em absurdo."
    }
  ]
};