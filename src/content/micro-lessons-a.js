/** Microaulas — cada lição apresenta uma única regra nova. */
export const MICRO_LESSONS_A={
  "condicionais_excecao": {
    "lead": "Se algo ocorre a menos que haja uma exceção, o que exatamente foi prometido?",
    "theory": "A frase “haverá aula, a menos que falte energia” informa o que acontece no caso sem exceção: se não faltar energia, haverá aula. Chame aula de p e falta de energia de q. A leitura mínima é ¬q→p. O antecedente é a ausência da exceção, e a conclusão é o acontecimento esperado. Primeiro compreenda essa relação em palavras; a fórmula apenas a registra.\n\nSe faltar energia, a frase não resolve automaticamente o que ocorrerá. Pode haver aula com um gerador, ou pode não haver aula. O enunciado não escolhe entre essas possibilidades. Por isso, “a menos que q” não deve ser transformado em “se q então não p”. Essa nova frase acrescentaria uma proibição que não foi afirmada. Uma exceção suspende a garantia, mas não determina o contrário.\n\nConsidere “receberemos o pacote, a menos que haja greve”. Sem greve, o recebimento foi prometido. Com greve, precisamos de informações adicionais para decidir se o pacote chegará. Na prática, circule a expressão que descreve a exceção e pergunte: o que é garantido quando ela está ausente? Depois identifique o que permanece indeterminado quando ela está presente.",
    "example": "“A biblioteca abrirá, a menos que haja manutenção.” Considere p = abrir e q = haver manutenção.",
    "steps": [
      "A condição excepcional é haver manutenção, representada por q; o caso normal é ¬q.",
      "Se não houver manutenção, a biblioteca abrirá; escrevemos ¬q→p.",
      "Se houver manutenção, a biblioteca ainda pode abrir em horário reduzido ou permanecer fechada."
    ],
    "quiz": [
      {
        "question": "Na frase “p a menos que q”, o que é garantido?",
        "options": [
          "Quando q não ocorre, p ocorre.",
          "Quando q ocorre, p é proibida.",
          "Quando p ocorre, q é falsa."
        ],
        "correct": 0,
        "why": "O compromisso é assumido no caso sem exceção."
      },
      {
        "question": "Qual é a condição relevante para aplicar a regra?",
        "options": [
          "A ausência da exceção.",
          "A presença obrigatória da exceção.",
          "O valor da recíproca."
        ],
        "correct": 0,
        "why": "É preciso verificar ¬q para acionar a garantia de p."
      },
      {
        "question": "Uma exceção efetivamente ocorrida significa:",
        "options": [
          "Que a frase não determina sozinha se p ocorre.",
          "Que p é necessariamente falsa.",
          "Que p é necessariamente verdadeira."
        ],
        "correct": 0,
        "why": "Com q presente, pode ser necessário obter mais informação."
      },
      {
        "question": "Qual tradução corresponde à leitura mínima?",
        "options": [
          "¬q→p.",
          "q→¬p.",
          "p→¬q."
        ],
        "correct": 0,
        "why": "O antecedente é a ausência de q."
      }
    ]
  },
  "equiv_distributividade": {
    "lead": "Como distribuir uma condição comum entre duas alternativas?",
    "theory": "Em p∧(q∨r), p precisa ocorrer junto com pelo menos uma entre q e r. Isso é equivalente a (p∧q)∨(p∧r): cada alternativa contém a mesma condição p. O termo externo aparece duas vezes depois da transformação. Deixar p em apenas um dos ramos altera as interpretações aceitas e destrói a equivalência.\n\nA disjunção distribui sobre a conjunção na lógica clássica: p∨(q∧r) equivale a (p∨q)∧(p∨r). A exigência “p ou ambas q e r” pode ser expressa por dois requisitos. Não é necessário memorizar semânticas novas: use os valores já conhecidos de E e OU. Compare os lados em casos com p verdadeiro e p falso para verificar se a substituição é segura.\n\nSe o termo comum for (p→q), distribua a expressão inteira. Parênteses registram onde começa e termina cada parcela e impedem que apenas uma letra seja repetida. Antes de concluir, verifique se os dois ramos contêm a parcela distribuída e se o conectivo dentro de cada ramo foi mantido. Uma passagem correta deve preservar todos os valores, não apenas um exemplo.",
    "example": "Reescreva p∧(q∨r) e confira o caso em que p é verdadeira e apenas r é verdadeira.",
    "steps": [
      "A fórmula p está fora da disjunção entre q e r e será repetida em cada alternativa.",
      "Obtenha (p∧q)∨(p∧r), mantendo p à esquerda dos dois ramos.",
      "Com p=V,q=F,r=V, os dois lados valem V porque o segundo ramo satisfaz p∧r."
    ],
    "quiz": [
      {
        "question": "O que é repetido numa distributividade?",
        "options": [
          "A parcela externa completa.",
          "Somente o último átomo.",
          "O conectivo principal invertido."
        ],
        "correct": 0,
        "why": "A estrutura distribui a mesma parcela nos ramos resultantes."
      },
      {
        "question": "Qual é a forma distribuída de A∧(B∨C)?",
        "options": [
          "(A∧B)∨(A∧C).",
          "(A∧B)∨C.",
          "A∨(B∧C)."
        ],
        "correct": 0,
        "why": "A conjunção é aplicada a cada uma das alternativas."
      },
      {
        "question": "A expressão A∨(B∧C) distribui-se como:",
        "options": [
          "(A∨B)∧(A∨C).",
          "(A∨B)∨C.",
          "A∧(B∨C)."
        ],
        "correct": 0,
        "why": "A disjunção externa aparece em cada ramo da conjunção."
      },
      {
        "question": "Se A é uma fórmula composta, na distribuição:",
        "options": [
          "Repete-se a fórmula A inteira.",
          "Elimina-se uma subfórmula.",
          "Troca-se A por sua negação."
        ],
        "correct": 0,
        "why": "As letras A,B,C podem representar expressões compostas."
      }
    ]
  },
  "equiv_absorcao": {
    "lead": "Quando uma parte da fórmula já garante o resultado, por que repetir outra condição?",
    "theory": "Em p∨(p∧q), o segundo termo exige p e mais alguma coisa. Se p já é verdadeira, a disjunção inteira vale; se é falsa, o segundo termo também falha. Por isso p∨(p∧q) equivale a p. A expressão composta não acrescenta novos casos verdadeiros à alternativa p isolada.\n\nEm p∧(p∨q), p é exigida e já basta para satisfazer a disjunção interna. Com p falsa, a conjunção falha; com p verdadeira, ambas as partes valem. Assim p∧(p∨q) também equivale a p. A diferença entre as duas leis está no conectivo externo, mas ambas eliminam um requisito repetido.\n\nAs letras p e q representam expressões inteiras. Se A for (r→s), então A∨(A∧q) pode ser reduzida a A sem abrir a condicional. Uma redução por absorção precisa localizar a mesma parcela repetida literalmente nas duas posições apropriadas. Não é correto absorver uma parcela parecida, mas logicamente diferente.",
    "example": "Simplifique q∧(q∨r) sem supor valores específicos das variáveis.",
    "steps": [
      "q aparece isoladamente e dentro da disjunção q∨r.",
      "Substitua q∧(q∨r) por q, conservando o valor para qualquer interpretação.",
      "Com q verdadeira, ambas expressões são verdadeiras; com q falsa, ambas são falsas."
    ],
    "quiz": [
      {
        "question": "A absorção depende principalmente de:",
        "options": [
          "Uma parcela repetida na forma da lei.",
          "Do número de parênteses apenas.",
          "Da ordem temporal dos fatos."
        ],
        "correct": 0,
        "why": "O termo repetido faz a parte composta redundante."
      },
      {
        "question": "Qual lei de absorção é válida?",
        "options": [
          "A∨(A∧B)≡A.",
          "A∨B≡A.",
          "A∧B≡A."
        ],
        "correct": 0,
        "why": "O ramo A∧B não acrescenta casos novos a A."
      },
      {
        "question": "Qual segunda forma de absorção é válida?",
        "options": [
          "A∧(A∨B)≡A.",
          "A∧B≡B.",
          "A∨(A∧B)≡B."
        ],
        "correct": 0,
        "why": "A condição A já garante a parte A∨B."
      },
      {
        "question": "É possível usar A composto numa lei de absorção?",
        "options": [
          "Sim, desde que a subfórmula inteira se repita.",
          "Não, somente letras atômicas.",
          "Sim, apagando qualquer outro termo."
        ],
        "correct": 0,
        "why": "As leis valem para fórmulas, não apenas para átomos."
      }
    ]
  },
  "equiv_bicondicional": {
    "lead": "Qual diferença existe entre uma condição de ida e uma condição nos dois sentidos?",
    "theory": "A expressão p↔q informa que p implica q e q implica p. Para a proposição inteira valer, as duas condicionais devem valer ao mesmo tempo. Escrevemos p↔q ≡ (p→q)∧(q→p). A conjunção entre as duas direções é essencial: uma disjunção exigiria somente uma delas.\n\nO bicondicional é verdadeiro quando p e q têm o mesmo valor: ambas verdadeiras ou ambas falsas. Quando somente uma vale, uma das duas implicações falha. Use essa regra para conferir a expansão sem decorar uma tabela adicional. Se p=V e q=F, a ida falha; se p=F e q=V, a volta falha.\n\n“O alarme toca se, e somente se, há movimento” exige que movimento seja suficiente para tocar e tocar seja suficiente para indicar movimento. Uma única condicional não expressaria isso. Antes de usar ↔, procure no texto as duas direções. Nas avaliações desta aula, não será necessário aplicar leis algébricas avançadas: basta expandir as duas condicionais e conferir a conjunção.",
    "example": "Traduza “Uma chave é válida se, e somente se, o leitor a reconhece” com p=chave válida e q=leitor reconhece.",
    "steps": [
      "Se a chave é válida, o leitor a reconhece: p→q.",
      "Se o leitor a reconhece, a chave é válida: q→p.",
      "Escreva (p→q)∧(q→p), equivalente a p↔q."
    ],
    "quiz": [
      {
        "question": "O bicondicional reúne quantas condições?",
        "options": [
          "Duas implicações, uma em cada direção.",
          "Uma implicação suficiente.",
          "Duas alternativas exclusivas."
        ],
        "correct": 0,
        "why": "A ida e a volta são requisitos conjuntos."
      },
      {
        "question": "Qual conectivo une a expansão do bicondicional?",
        "options": [
          "Conjunção ∧.",
          "Disjunção ∨.",
          "Negação ¬."
        ],
        "correct": 0,
        "why": "Ambas as implicações devem valer."
      },
      {
        "question": "Quando p↔q é verdadeira?",
        "options": [
          "Quando p e q têm o mesmo valor.",
          "Sempre que p é verdadeira.",
          "Somente quando p é falsa."
        ],
        "correct": 0,
        "why": "As duas direções valem juntas se os lados concordam."
      },
      {
        "question": "Se p=V e q=F, p↔q é:",
        "options": [
          "Falsa.",
          "Verdadeira.",
          "Indeterminada na lógica clássica."
        ],
        "correct": 0,
        "why": "Uma direção p→q falha nessa valoração."
      }
    ]
  },
  "equiv_negacao_condicional": {
    "lead": "O que precisa acontecer para que uma promessa do tipo ‘se p, então q’ seja desmentida?",
    "theory": "A condicional p→q é falsa quando p é verdadeira e q é falsa. Em todas as outras combinações da lógica material clássica, ela é verdadeira. Assim negar p→q significa afirmar o caso que a refuta: p∧¬q. Essa descrição informa que o antecedente ocorreu, mas o consequente esperado não.\n\nA identidade ¬(p→q)≡p∧¬q é completa. Ela não exige inverter o antecedente nem negar as duas partes indiscriminadamente. Por exemplo, “não é verdade que, se houve inscrição, houve confirmação” aponta para uma situação em que houve inscrição e não houve confirmação. Não basta apenas afirmar que não houve inscrição.\n\nNa prática, localize antecedente e consequente, escreva o antecedente sem mudar seu sinal e negue somente o consequente. Reúna as duas partes com E. Para verificar, tente uma valoração em que p=V e q=F: a condicional falha e sua negação vale. Qualquer outra linha deixa a condicional verdadeira e sua negação falsa.",
    "example": "Negue a afirmação “Se a senha está correta, a porta abre”, com p=senha correta e q=porta abre.",
    "steps": [
      "p representa a senha correta, e q representa a porta abrir.",
      "O caso contrário é ter a senha correta e ainda assim a porta não abrir.",
      "Obtemos p∧¬q, equivalente a ¬(p→q)."
    ],
    "quiz": [
      {
        "question": "Uma condicional é falsa quando:",
        "options": [
          "O antecedente vale e o consequente falha.",
          "Ambos são falsos.",
          "O antecedente é falso e o consequente verdadeiro."
        ],
        "correct": 0,
        "why": "Esse é o contraexemplo da condicional material."
      },
      {
        "question": "Negar p→q significa afirmar:",
        "options": [
          "p e não q.",
          "não p e não q.",
          "q e não p."
        ],
        "correct": 0,
        "why": "A falha precisa realizar p sem produzir q."
      },
      {
        "question": "A expressão ¬(p→q) contém semanticamente:",
        "options": [
          "Uma condição realizada sem a consequência.",
          "Uma condição que nunca aconteceu.",
          "Uma implicação inversa."
        ],
        "correct": 0,
        "why": "A negação seleciona a linha falsa da condicional."
      },
      {
        "question": "Qual conectivo reúne as duas condições do contraexemplo?",
        "options": [
          "E ∧.",
          "OU ∨.",
          "SE →."
        ],
        "correct": 0,
        "why": "Ambas as partes devem acontecer no mesmo caso."
      }
    ]
  }
};
export const MICRO_READINGS_A={
  "condicionais_excecao": {
    "objective": "Interpretar somente a construção ‘p a menos que q’, reconhecer quando p é garantida e distinguir uma exceção de uma proibição.",
    "sections": [
      {
        "heading": "Quando a exceção não ocorre",
        "paragraphs": [
          "A frase “haverá aula, a menos que falte energia” informa o que acontece no caso sem exceção: se não faltar energia, haverá aula. Chame aula de p e falta de energia de q.",
          "A leitura mínima é ¬q→p. O antecedente é a ausência da exceção, e a conclusão é o acontecimento esperado. Primeiro compreenda essa relação em palavras; a fórmula apenas a registra."
        ]
      },
      {
        "heading": "Quando a exceção ocorre",
        "paragraphs": [
          "Se faltar energia, a frase não resolve automaticamente o que ocorrerá. Pode haver aula com um gerador, ou pode não haver aula. O enunciado não escolhe entre essas possibilidades.",
          "Por isso, “a menos que q” não deve ser transformado em “se q então não p”. Essa nova frase acrescentaria uma proibição que não foi afirmada. Uma exceção suspende a garantia, mas não determina o contrário."
        ]
      },
      {
        "heading": "Aplicação com novos contextos",
        "paragraphs": [
          "Considere “receberemos o pacote, a menos que haja greve”. Sem greve, o recebimento foi prometido. Com greve, precisamos de informações adicionais para decidir se o pacote chegará.",
          "Na prática, circule a expressão que descreve a exceção e pergunte: o que é garantido quando ela está ausente? Depois identifique o que permanece indeterminado quando ela está presente."
        ]
      }
    ],
    "misconception": "Uma exceção não equivale a um impedimento absoluto: q não autoriza concluir ¬p quando a frase diz apenas p a menos que q.",
    "summary": "Em “p a menos que q”, a ausência de q garante p. A presença de q deixa p em aberto. Formalizamos apenas ¬q→p, sem impor uma exclusão não declarada.",
    "check": {
      "question": "Se houver manutenção, a frase obriga a biblioteca a fechar?",
      "options": [
        "Não; com a exceção presente, o resultado não foi fixado.",
        "Sim; ‘a menos que’ sempre proíbe o funcionamento.",
        "Sim; o antecedente é necessariamente verdadeiro."
      ],
      "correct": 0,
      "why": "A expressão define apenas o caso em que a ausência da exceção garante a abertura."
    }
  },
  "equiv_distributividade": {
    "objective": "Aplicar somente a distributividade clássica entre conjunção e disjunção, repetindo corretamente o termo externo em cada ramo.",
    "sections": [
      {
        "heading": "A estrutura de distribuição",
        "paragraphs": [
          "Em p∧(q∨r), p precisa ocorrer junto com pelo menos uma entre q e r. Isso é equivalente a (p∧q)∨(p∧r): cada alternativa contém a mesma condição p.",
          "O termo externo aparece duas vezes depois da transformação. Deixar p em apenas um dos ramos altera as interpretações aceitas e destrói a equivalência."
        ]
      },
      {
        "heading": "Distribuir também na direção contrária",
        "paragraphs": [
          "A disjunção distribui sobre a conjunção na lógica clássica: p∨(q∧r) equivale a (p∨q)∧(p∨r). A exigência “p ou ambas q e r” pode ser expressa por dois requisitos.",
          "Não é necessário memorizar semânticas novas: use os valores já conhecidos de E e OU. Compare os lados em casos com p verdadeiro e p falso para verificar se a substituição é segura."
        ]
      },
      {
        "heading": "Aplicar a subfórmulas",
        "paragraphs": [
          "Se o termo comum for (p→q), distribua a expressão inteira. Parênteses registram onde começa e termina cada parcela e impedem que apenas uma letra seja repetida.",
          "Antes de concluir, verifique se os dois ramos contêm a parcela distribuída e se o conectivo dentro de cada ramo foi mantido. Uma passagem correta deve preservar todos os valores, não apenas um exemplo."
        ]
      }
    ],
    "misconception": "Na distributividade não se troca um dos conectivos arbitrariamente nem se omite a parcela que deve ser repetida em todos os ramos.",
    "summary": "Distribua A∧(B∨C) para (A∧B)∨(A∧C) e A∨(B∧C) para (A∨B)∧(A∨C), sempre repetindo a fórmula A inteira.",
    "check": {
      "question": "Qual expansão preserva p∧(q∨r)?",
      "options": [
        "(p∧q)∨(p∧r).",
        "(p∧q)∨r.",
        "p∨(q∧r)."
      ],
      "correct": 0,
      "why": "A parcela p deve aparecer em ambos os ramos."
    }
  },
  "equiv_absorcao": {
    "objective": "Simplificar expressões redundantes usando somente as duas leis de absorção, reconhecendo o termo repetido e comprovando a redução.",
    "sections": [
      {
        "heading": "Uma disjunção redundante",
        "paragraphs": [
          "Em p∨(p∧q), o segundo termo exige p e mais alguma coisa. Se p já é verdadeira, a disjunção inteira vale; se é falsa, o segundo termo também falha.",
          "Por isso p∨(p∧q) equivale a p. A expressão composta não acrescenta novos casos verdadeiros à alternativa p isolada."
        ]
      },
      {
        "heading": "Uma conjunção redundante",
        "paragraphs": [
          "Em p∧(p∨q), p é exigida e já basta para satisfazer a disjunção interna. Com p falsa, a conjunção falha; com p verdadeira, ambas as partes valem.",
          "Assim p∧(p∨q) também equivale a p. A diferença entre as duas leis está no conectivo externo, mas ambas eliminam um requisito repetido."
        ]
      },
      {
        "heading": "Encontrar o padrão com subfórmulas",
        "paragraphs": [
          "As letras p e q representam expressões inteiras. Se A for (r→s), então A∨(A∧q) pode ser reduzida a A sem abrir a condicional.",
          "Uma redução por absorção precisa localizar a mesma parcela repetida literalmente nas duas posições apropriadas. Não é correto absorver uma parcela parecida, mas logicamente diferente."
        ]
      }
    ],
    "misconception": "A absorção exige uma parcela repetida exatamente na posição estrutural da lei; não se pode simplesmente apagar um ramo porque parece desnecessário.",
    "summary": "A∨(A∧B)≡A e A∧(A∨B)≡A. Identifique a parcela A repetida, simplifique e confira que os valores de verdade permanecem iguais.",
    "check": {
      "question": "Por absorção, q∨(q∧r) simplifica para:",
      "options": [
        "q.",
        "r.",
        "q∧r."
      ],
      "correct": 0,
      "why": "A alternativa isolada q já cobre os casos do ramo mais restritivo."
    }
  },
  "equiv_bicondicional": {
    "objective": "Compreender que o bicondicional exige duas implicações, construindo e verificando sua expansão sem misturar contraposição ou negação da condicional.",
    "sections": [
      {
        "heading": "Duas direções, um único enunciado",
        "paragraphs": [
          "A expressão p↔q informa que p implica q e q implica p. Para a proposição inteira valer, as duas condicionais devem valer ao mesmo tempo.",
          "Escrevemos p↔q ≡ (p→q)∧(q→p). A conjunção entre as duas direções é essencial: uma disjunção exigiria somente uma delas."
        ]
      },
      {
        "heading": "Valores iguais nas duas pontas",
        "paragraphs": [
          "O bicondicional é verdadeiro quando p e q têm o mesmo valor: ambas verdadeiras ou ambas falsas. Quando somente uma vale, uma das duas implicações falha.",
          "Use essa regra para conferir a expansão sem decorar uma tabela adicional. Se p=V e q=F, a ida falha; se p=F e q=V, a volta falha."
        ]
      },
      {
        "heading": "Aplicar a condições recíprocas",
        "paragraphs": [
          "“O alarme toca se, e somente se, há movimento” exige que movimento seja suficiente para tocar e tocar seja suficiente para indicar movimento. Uma única condicional não expressaria isso.",
          "Antes de usar ↔, procure no texto as duas direções. Nas avaliações desta aula, não será necessário aplicar leis algébricas avançadas: basta expandir as duas condicionais e conferir a conjunção."
        ]
      }
    ],
    "misconception": "Bicondicional não é uma escolha livre entre duas condicionais: ambas são exigidas simultaneamente, conectadas por ∧.",
    "summary": "p↔q ≡ (p→q)∧(q→p). É verdadeira quando os dois lados têm o mesmo valor e exige as duas direções de implicação.",
    "check": {
      "question": "Qual expansão representa p↔q?",
      "options": [
        "(p→q)∧(q→p).",
        "(p→q)∨(q→p).",
        "p→q apenas."
      ],
      "correct": 0,
      "why": "O bicondicional exige as duas direções juntas."
    }
  },
  "equiv_negacao_condicional": {
    "objective": "Reconhecer a única situação que refuta uma condicional e escrever ¬(p→q) como p∧¬q, sem exigir outras leis de equivalência.",
    "sections": [
      {
        "heading": "O contraexemplo de uma implicação",
        "paragraphs": [
          "A condicional p→q é falsa quando p é verdadeira e q é falsa. Em todas as outras combinações da lógica material clássica, ela é verdadeira.",
          "Assim negar p→q significa afirmar o caso que a refuta: p∧¬q. Essa descrição informa que o antecedente ocorreu, mas o consequente esperado não."
        ]
      },
      {
        "heading": "Uma única forma da negação",
        "paragraphs": [
          "A identidade ¬(p→q)≡p∧¬q é completa. Ela não exige inverter o antecedente nem negar as duas partes indiscriminadamente.",
          "Por exemplo, “não é verdade que, se houve inscrição, houve confirmação” aponta para uma situação em que houve inscrição e não houve confirmação. Não basta apenas afirmar que não houve inscrição."
        ]
      },
      {
        "heading": "Aplicar a casos concretos",
        "paragraphs": [
          "Na prática, localize antecedente e consequente, escreva o antecedente sem mudar seu sinal e negue somente o consequente. Reúna as duas partes com E.",
          "Para verificar, tente uma valoração em que p=V e q=F: a condicional falha e sua negação vale. Qualquer outra linha deixa a condicional verdadeira e sua negação falsa."
        ]
      }
    ],
    "misconception": "Negar “se p então q” não significa “se não p então não q”. A negação é uma conjunção p∧¬q, não outra implicação.",
    "summary": "¬(p→q) equivale a p∧¬q: o antecedente aconteceu e o consequente falhou. Esse é o único contraexemplo à condicional material.",
    "check": {
      "question": "Qual fórmula é a negação de p→q?",
      "options": [
        "p∧¬q.",
        "¬p→¬q.",
        "¬p∧q."
      ],
      "correct": 0,
      "why": "A condicional falha apenas com p verdadeiro e q falso."
    }
  }
};
export const MICRO_WORKED_A={
  "condicionais_excecao": {
    "context": "“A biblioteca abrirá, a menos que haja manutenção.” Considere p = abrir e q = haver manutenção.",
    "steps": [
      {
        "formal": "Identifique a exceção",
        "concrete": "A condição excepcional é haver manutenção, representada por q; o caso normal é ¬q.",
        "reason": "Separar o cenário excepcional impede inverter o sentido da regra."
      },
      {
        "formal": "Extraia a garantia",
        "concrete": "Se não houver manutenção, a biblioteca abrirá; escrevemos ¬q→p.",
        "reason": "A frase afirma o resultado somente quando a exceção está ausente."
      },
      {
        "formal": "Reconheça o caso aberto",
        "concrete": "Se houver manutenção, a biblioteca ainda pode abrir em horário reduzido ou permanecer fechada.",
        "reason": "A sentença não autoriza concluir q→¬p sem outra regra."
      }
    ],
    "check": {
      "question": "Sem manutenção, o que a regra afirma sobre a abertura?",
      "options": [
        "A biblioteca abrirá.",
        "A biblioteca necessariamente fechará.",
        "Não existe nenhuma garantia."
      ],
      "correct": 0,
      "why": "Sem a exceção, a abertura é garantida pela frase."
    }
  },
  "equiv_distributividade": {
    "context": "Reescreva p∧(q∨r) e confira o caso em que p é verdadeira e apenas r é verdadeira.",
    "steps": [
      {
        "formal": "Localize o termo comum",
        "concrete": "A fórmula p está fora da disjunção entre q e r e será repetida em cada alternativa.",
        "reason": "A árvore da expressão indica a parcela comum."
      },
      {
        "formal": "Expanda a conjunção",
        "concrete": "Obtenha (p∧q)∨(p∧r), mantendo p à esquerda dos dois ramos.",
        "reason": "O resultado exige p com q ou p com r."
      },
      {
        "formal": "Compare a interpretação dada",
        "concrete": "Com p=V,q=F,r=V, os dois lados valem V porque o segundo ramo satisfaz p∧r.",
        "reason": "O exemplo verifica a passagem nesse caso; a lei garante todos os casos."
      }
    ],
    "check": {
      "question": "No exemplo com p=V,q=F,r=V, quanto valem as duas fórmulas equivalentes?",
      "options": [
        "Ambas são V.",
        "Uma V e a outra F.",
        "Ambas são F."
      ],
      "correct": 0,
      "why": "O ramo p∧r é verdadeiro, garantindo também o valor da fórmula inicial."
    }
  },
  "equiv_absorcao": {
    "context": "Simplifique q∧(q∨r) sem supor valores específicos das variáveis.",
    "steps": [
      {
        "formal": "Ache a parcela repetida",
        "concrete": "q aparece isoladamente e dentro da disjunção q∨r.",
        "reason": "A estrutura corresponde a A∧(A∨B)."
      },
      {
        "formal": "Aplique a absorção",
        "concrete": "Substitua q∧(q∨r) por q, conservando o valor para qualquer interpretação.",
        "reason": "A conjunção exige q e, quando q vale, o segundo termo já está satisfeito."
      },
      {
        "formal": "Confirme os dois casos",
        "concrete": "Com q verdadeira, ambas expressões são verdadeiras; com q falsa, ambas são falsas.",
        "reason": "A verificação cobre os dois valores de q, independentemente de r."
      }
    ],
    "check": {
      "question": "Qual expressão resta ao reduzir q∧(q∨r) no exemplo?",
      "options": [
        "q.",
        "r.",
        "q∨r."
      ],
      "correct": 0,
      "why": "A parcela q já satisfaz toda a conjunção quando é verdadeira."
    }
  },
  "equiv_bicondicional": {
    "context": "Traduza “Uma chave é válida se, e somente se, o leitor a reconhece” com p=chave válida e q=leitor reconhece.",
    "steps": [
      {
        "formal": "Identifique a ida",
        "concrete": "Se a chave é válida, o leitor a reconhece: p→q.",
        "reason": "Essa condição cobre um dos sentidos anunciados."
      },
      {
        "formal": "Identifique a volta",
        "concrete": "Se o leitor a reconhece, a chave é válida: q→p.",
        "reason": "A frase usa ‘se, e somente se’, portanto exige o caminho inverso também."
      },
      {
        "formal": "Reúna as duas exigências",
        "concrete": "Escreva (p→q)∧(q→p), equivalente a p↔q.",
        "reason": "A conjunção registra que as duas condições precisam valer juntas."
      }
    ],
    "check": {
      "question": "No exemplo da chave, qual segunda direção é necessária além de p→q?",
      "options": [
        "q→p.",
        "¬p→¬q.",
        "p→¬q."
      ],
      "correct": 0,
      "why": "O reconhecimento também deve ser suficiente para validade no bicondicional proposto."
    }
  },
  "equiv_negacao_condicional": {
    "context": "Negue a afirmação “Se a senha está correta, a porta abre”, com p=senha correta e q=porta abre.",
    "steps": [
      {
        "formal": "Localize as duas partes",
        "concrete": "p representa a senha correta, e q representa a porta abrir.",
        "reason": "Uma negação correta mantém claro qual parte é condição e qual é resultado."
      },
      {
        "formal": "Procure a falha da promessa",
        "concrete": "O caso contrário é ter a senha correta e ainda assim a porta não abrir.",
        "reason": "A condicional fica falsa exatamente nessa situação."
      },
      {
        "formal": "Escreva a negação",
        "concrete": "Obtemos p∧¬q, equivalente a ¬(p→q).",
        "reason": "A conjunção reúne a condição realizada e a consequência ausente."
      }
    ],
    "check": {
      "question": "No exemplo da senha, quando a condicional original falharia?",
      "options": [
        "Senha correta e porta fechada.",
        "Senha incorreta e porta fechada.",
        "Senha correta e porta aberta."
      ],
      "correct": 0,
      "why": "A promessa é desmentida somente se a condição ocorre e seu resultado falha."
    }
  }
};
export const MICRO_ASSESSMENTS_A={
  "condicionais_excecao": [
    {
      "question": "“Haverá jogo, a menos que chova.” Não chove. O que segue?",
      "options": [
        "O jogo ocorrerá.",
        "O jogo será cancelado.",
        "Não há conclusão possível."
      ],
      "correct": 0,
      "why": "A ausência de chuva satisfaz o antecedente da condição anunciada.",
      "dimension": "application",
      "objective": "Aplicar a única regra ensinada nesta aula"
    },
    {
      "question": "“Haverá jogo, a menos que chova.” Chove. O que segue?",
      "options": [
        "Não é possível concluir o resultado apenas dessa frase.",
        "O jogo será cancelado obrigatoriamente.",
        "O jogo ocorrerá obrigatoriamente."
      ],
      "correct": 0,
      "why": "A exceção não estabelece necessariamente o resultado contrário.",
      "dimension": "application",
      "objective": "Aplicar a única regra ensinada nesta aula"
    },
    {
      "question": "“O sistema responde, a menos que caia a rede.” A rede funciona.",
      "options": [
        "A resposta está garantida pela condição.",
        "A resposta está proibida.",
        "A falha da rede aconteceu."
      ],
      "correct": 0,
      "why": "O caso normal descrito foi satisfeito.",
      "dimension": "application",
      "objective": "Aplicar a única regra ensinada nesta aula"
    },
    {
      "question": "“O sistema responde, a menos que caia a rede.” A rede cai.",
      "options": [
        "A resposta fica indeterminada pela regra.",
        "A resposta fica logicamente impossível.",
        "A regra garante resposta mesmo sem outra hipótese."
      ],
      "correct": 0,
      "why": "O texto não descarta uma solução alternativa.",
      "dimension": "application",
      "objective": "Aplicar a única regra ensinada nesta aula"
    },
    {
      "question": "Na descrição conceitual 1: Na frase “p a menos que q”, o que é garantido?",
      "options": [
        "Quando q não ocorre, p ocorre.",
        "Quando q ocorre, p é proibida.",
        "Quando p ocorre, q é falsa."
      ],
      "correct": 0,
      "why": "O compromisso é assumido no caso sem exceção.",
      "dimension": "concept",
      "objective": "Reconhecer a única regra ensinada nesta aula"
    },
    {
      "question": "Na descrição conceitual 2: Qual é a condição relevante para aplicar a regra?",
      "options": [
        "A ausência da exceção.",
        "A presença obrigatória da exceção.",
        "O valor da recíproca."
      ],
      "correct": 0,
      "why": "É preciso verificar ¬q para acionar a garantia de p.",
      "dimension": "concept",
      "objective": "Reconhecer a única regra ensinada nesta aula"
    },
    {
      "question": "Na descrição conceitual 3: Uma exceção efetivamente ocorrida significa:",
      "options": [
        "Que a frase não determina sozinha se p ocorre.",
        "Que p é necessariamente falsa.",
        "Que p é necessariamente verdadeira."
      ],
      "correct": 0,
      "why": "Com q presente, pode ser necessário obter mais informação.",
      "dimension": "concept",
      "objective": "Reconhecer a única regra ensinada nesta aula"
    },
    {
      "question": "Na descrição conceitual 4: Qual tradução corresponde à leitura mínima?",
      "options": [
        "¬q→p.",
        "q→¬p.",
        "p→¬q."
      ],
      "correct": 0,
      "why": "O antecedente é a ausência de q.",
      "dimension": "concept",
      "objective": "Reconhecer a única regra ensinada nesta aula"
    }
  ],
  "equiv_distributividade": [
    {
      "question": "Reescreva r∧(p∨q).",
      "options": [
        "(r∧p)∨(r∧q).",
        "(r∧p)∨q.",
        "r∨(p∧q)."
      ],
      "correct": 0,
      "why": "O termo r se junta às duas alternativas.",
      "dimension": "application",
      "objective": "Aplicar a única regra ensinada nesta aula"
    },
    {
      "question": "Reescreva q∨(p∧r).",
      "options": [
        "(q∨p)∧(q∨r).",
        "(q∨p)∨r.",
        "q∧(p∨r)."
      ],
      "correct": 0,
      "why": "Uma disjunção sobre conjunção resulta em duas disjunções.",
      "dimension": "application",
      "objective": "Aplicar a única regra ensinada nesta aula"
    },
    {
      "question": "Na expansão de s∧(p∨q), pode omitir s do segundo ramo?",
      "options": [
        "Não, a condição s é comum aos dois.",
        "Sim, desde que q seja verdadeira.",
        "Sim, pois disjunção é inclusiva."
      ],
      "correct": 0,
      "why": "Uma omissão pode admitir uma interpretação sem s.",
      "dimension": "application",
      "objective": "Aplicar a única regra ensinada nesta aula"
    },
    {
      "question": "Qual alternativa preserva t∨(u∧v)?",
      "options": [
        "(t∨u)∧(t∨v).",
        "(t∨u)∨v.",
        "t∧(u∨v)."
      ],
      "correct": 0,
      "why": "Ambas as exigências precisam conter t.",
      "dimension": "application",
      "objective": "Aplicar a única regra ensinada nesta aula"
    },
    {
      "question": "Na descrição conceitual 1: O que é repetido numa distributividade?",
      "options": [
        "A parcela externa completa.",
        "Somente o último átomo.",
        "O conectivo principal invertido."
      ],
      "correct": 0,
      "why": "A estrutura distribui a mesma parcela nos ramos resultantes.",
      "dimension": "concept",
      "objective": "Reconhecer a única regra ensinada nesta aula"
    },
    {
      "question": "Na descrição conceitual 2: Qual é a forma distribuída de A∧(B∨C)?",
      "options": [
        "(A∧B)∨(A∧C).",
        "(A∧B)∨C.",
        "A∨(B∧C)."
      ],
      "correct": 0,
      "why": "A conjunção é aplicada a cada uma das alternativas.",
      "dimension": "concept",
      "objective": "Reconhecer a única regra ensinada nesta aula"
    },
    {
      "question": "Na descrição conceitual 3: A expressão A∨(B∧C) distribui-se como:",
      "options": [
        "(A∨B)∧(A∨C).",
        "(A∨B)∨C.",
        "A∧(B∨C)."
      ],
      "correct": 0,
      "why": "A disjunção externa aparece em cada ramo da conjunção.",
      "dimension": "concept",
      "objective": "Reconhecer a única regra ensinada nesta aula"
    },
    {
      "question": "Na descrição conceitual 4: Se A é uma fórmula composta, na distribuição:",
      "options": [
        "Repete-se a fórmula A inteira.",
        "Elimina-se uma subfórmula.",
        "Troca-se A por sua negação."
      ],
      "correct": 0,
      "why": "As letras A,B,C podem representar expressões compostas.",
      "dimension": "concept",
      "objective": "Reconhecer a única regra ensinada nesta aula"
    }
  ],
  "equiv_absorcao": [
    {
      "question": "Simplifique p∨(p∧r).",
      "options": [
        "p.",
        "r.",
        "p∧r."
      ],
      "correct": 0,
      "why": "A parcela p absorve a alternativa mais restrita.",
      "dimension": "application",
      "objective": "Aplicar a única regra ensinada nesta aula"
    },
    {
      "question": "Simplifique s∧(s∨q).",
      "options": [
        "s.",
        "q.",
        "s∨q."
      ],
      "correct": 0,
      "why": "A exigência s torna a disjunção interna automática.",
      "dimension": "application",
      "objective": "Aplicar a única regra ensinada nesta aula"
    },
    {
      "question": "A fórmula (p→q)∨((p→q)∧r) reduz-se a:",
      "options": [
        "p→q.",
        "r.",
        "p∧r."
      ],
      "correct": 0,
      "why": "Toda a condicional é a parcela comum A.",
      "dimension": "application",
      "objective": "Aplicar a única regra ensinada nesta aula"
    },
    {
      "question": "Reduza t∧(t∨u).",
      "options": [
        "t.",
        "u.",
        "t∨u."
      ],
      "correct": 0,
      "why": "A forma A∧(A∨B) equivale a A. A conclusão é uma aplicação da definição estudada na leitura e no exemplo resolvido.",
      "dimension": "application",
      "objective": "Aplicar a única regra ensinada nesta aula"
    },
    {
      "question": "Na descrição conceitual 1: A absorção depende principalmente de:",
      "options": [
        "Uma parcela repetida na forma da lei.",
        "Do número de parênteses apenas.",
        "Da ordem temporal dos fatos."
      ],
      "correct": 0,
      "why": "O termo repetido faz a parte composta redundante.",
      "dimension": "concept",
      "objective": "Reconhecer a única regra ensinada nesta aula"
    },
    {
      "question": "Na descrição conceitual 2: Qual lei de absorção é válida?",
      "options": [
        "A∨(A∧B)≡A.",
        "A∨B≡A.",
        "A∧B≡A."
      ],
      "correct": 0,
      "why": "O ramo A∧B não acrescenta casos novos a A.",
      "dimension": "concept",
      "objective": "Reconhecer a única regra ensinada nesta aula"
    },
    {
      "question": "Na descrição conceitual 3: Qual segunda forma de absorção é válida?",
      "options": [
        "A∧(A∨B)≡A.",
        "A∧B≡B.",
        "A∨(A∧B)≡B."
      ],
      "correct": 0,
      "why": "A condição A já garante a parte A∨B.",
      "dimension": "concept",
      "objective": "Reconhecer a única regra ensinada nesta aula"
    },
    {
      "question": "Na descrição conceitual 4: É possível usar A composto numa lei de absorção?",
      "options": [
        "Sim, desde que a subfórmula inteira se repita.",
        "Não, somente letras atômicas.",
        "Sim, apagando qualquer outro termo."
      ],
      "correct": 0,
      "why": "As leis valem para fórmulas, não apenas para átomos.",
      "dimension": "concept",
      "objective": "Reconhecer a única regra ensinada nesta aula"
    }
  ],
  "equiv_bicondicional": [
    {
      "question": "Expanda q↔r.",
      "options": [
        "(q→r)∧(r→q).",
        "(q→r)∨(r→q).",
        "q→r apenas."
      ],
      "correct": 0,
      "why": "É preciso incluir ida e volta.",
      "dimension": "application",
      "objective": "Aplicar a única regra ensinada nesta aula"
    },
    {
      "question": "“p se e somente se q” equivale a:",
      "options": [
        "(p→q)∧(q→p).",
        "q→p apenas.",
        "p∧¬q."
      ],
      "correct": 0,
      "why": "O texto estabelece suficiência recíproca.",
      "dimension": "application",
      "objective": "Aplicar a única regra ensinada nesta aula"
    },
    {
      "question": "Com p=F,q=F, p↔q vale:",
      "options": [
        "V.",
        "F.",
        "Apenas uma das condicionais vale."
      ],
      "correct": 0,
      "why": "Com ambos falsos, as duas implicações são verdadeiras.",
      "dimension": "application",
      "objective": "Aplicar a única regra ensinada nesta aula"
    },
    {
      "question": "Qual condição falta para obter p↔q a partir de p→q?",
      "options": [
        "q→p.",
        "¬p.",
        "p∨q."
      ],
      "correct": 0,
      "why": "É preciso a implicação na volta.",
      "dimension": "application",
      "objective": "Aplicar a única regra ensinada nesta aula"
    },
    {
      "question": "Na descrição conceitual 1: O bicondicional reúne quantas condições?",
      "options": [
        "Duas implicações, uma em cada direção.",
        "Uma implicação suficiente.",
        "Duas alternativas exclusivas."
      ],
      "correct": 0,
      "why": "A ida e a volta são requisitos conjuntos.",
      "dimension": "concept",
      "objective": "Reconhecer a única regra ensinada nesta aula"
    },
    {
      "question": "Na descrição conceitual 2: Qual conectivo une a expansão do bicondicional?",
      "options": [
        "Conjunção ∧.",
        "Disjunção ∨.",
        "Negação ¬."
      ],
      "correct": 0,
      "why": "Ambas as implicações devem valer.",
      "dimension": "concept",
      "objective": "Reconhecer a única regra ensinada nesta aula"
    },
    {
      "question": "Na descrição conceitual 3: Quando p↔q é verdadeira?",
      "options": [
        "Quando p e q têm o mesmo valor.",
        "Sempre que p é verdadeira.",
        "Somente quando p é falsa."
      ],
      "correct": 0,
      "why": "As duas direções valem juntas se os lados concordam.",
      "dimension": "concept",
      "objective": "Reconhecer a única regra ensinada nesta aula"
    },
    {
      "question": "Na descrição conceitual 4: Se p=V e q=F, p↔q é:",
      "options": [
        "Falsa.",
        "Verdadeira.",
        "Indeterminada na lógica clássica."
      ],
      "correct": 0,
      "why": "Uma direção p→q falha nessa valoração.",
      "dimension": "concept",
      "objective": "Reconhecer a única regra ensinada nesta aula"
    }
  ],
  "equiv_negacao_condicional": [
    {
      "question": "Negue “Se chove, molha”.",
      "options": [
        "Chove e não molha.",
        "Não chove e não molha.",
        "Se não chove, não molha."
      ],
      "correct": 0,
      "why": "A promessa falha se chover sem molhar.",
      "dimension": "application",
      "objective": "Aplicar a única regra ensinada nesta aula"
    },
    {
      "question": "Negue r→s.",
      "options": [
        "r∧¬s.",
        "¬r→¬s.",
        "¬r∧s."
      ],
      "correct": 0,
      "why": "O antecedente r precisa valer e s precisa falhar.",
      "dimension": "application",
      "objective": "Aplicar a única regra ensinada nesta aula"
    },
    {
      "question": "Se p=F e q=F, ¬(p→q) vale:",
      "options": [
        "F.",
        "V.",
        "Não tem valor."
      ],
      "correct": 0,
      "why": "Com antecedente falso a condicional é verdadeira, logo sua negação é falsa.",
      "dimension": "application",
      "objective": "Aplicar a única regra ensinada nesta aula"
    },
    {
      "question": "Com p=V,q=F, ¬(p→q) vale:",
      "options": [
        "V.",
        "F.",
        "Igual a ¬p."
      ],
      "correct": 0,
      "why": "É a única linha em que a condicional é desmentida.",
      "dimension": "application",
      "objective": "Aplicar a única regra ensinada nesta aula"
    },
    {
      "question": "Na descrição conceitual 1: Uma condicional é falsa quando:",
      "options": [
        "O antecedente vale e o consequente falha.",
        "Ambos são falsos.",
        "O antecedente é falso e o consequente verdadeiro."
      ],
      "correct": 0,
      "why": "Esse é o contraexemplo da condicional material.",
      "dimension": "concept",
      "objective": "Reconhecer a única regra ensinada nesta aula"
    },
    {
      "question": "Na descrição conceitual 2: Negar p→q significa afirmar:",
      "options": [
        "p e não q.",
        "não p e não q.",
        "q e não p."
      ],
      "correct": 0,
      "why": "A falha precisa realizar p sem produzir q.",
      "dimension": "concept",
      "objective": "Reconhecer a única regra ensinada nesta aula"
    },
    {
      "question": "Na descrição conceitual 3: A expressão ¬(p→q) contém semanticamente:",
      "options": [
        "Uma condição realizada sem a consequência.",
        "Uma condição que nunca aconteceu.",
        "Uma implicação inversa."
      ],
      "correct": 0,
      "why": "A negação seleciona a linha falsa da condicional.",
      "dimension": "concept",
      "objective": "Reconhecer a única regra ensinada nesta aula"
    },
    {
      "question": "Na descrição conceitual 4: Qual conectivo reúne as duas condições do contraexemplo?",
      "options": [
        "E ∧.",
        "OU ∨.",
        "SE →."
      ],
      "correct": 0,
      "why": "Ambas as partes devem acontecer no mesmo caso.",
      "dimension": "concept",
      "objective": "Reconhecer a única regra ensinada nesta aula"
    }
  ]
};
export const MICRO_PRACTICE_A={
  "condicionais_excecao": [
    {
      "question": "Treino 1: Uma exceção efetivamente ocorrida significa:",
      "options": [
        "Que a frase não determina sozinha se p ocorre.",
        "Que p é necessariamente falsa.",
        "Que p é necessariamente verdadeira."
      ],
      "correct": 0,
      "why": "Com q presente, pode ser necessário obter mais informação."
    },
    {
      "question": "Treino 2: Qual tradução corresponde à leitura mínima?",
      "options": [
        "¬q→p.",
        "q→¬p.",
        "p→¬q."
      ],
      "correct": 0,
      "why": "O antecedente é a ausência de q."
    },
    {
      "question": "Treino 3: “Haverá jogo, a menos que chova.” Não chove. O que segue?",
      "options": [
        "O jogo ocorrerá.",
        "O jogo será cancelado.",
        "Não há conclusão possível."
      ],
      "correct": 0,
      "why": "A ausência de chuva satisfaz o antecedente da condição anunciada."
    },
    {
      "question": "Treino 4: “Haverá jogo, a menos que chova.” Chove. O que segue?",
      "options": [
        "Não é possível concluir o resultado apenas dessa frase.",
        "O jogo será cancelado obrigatoriamente.",
        "O jogo ocorrerá obrigatoriamente."
      ],
      "correct": 0,
      "why": "A exceção não estabelece necessariamente o resultado contrário."
    },
    {
      "question": "Treino 5: “O sistema responde, a menos que caia a rede.” A rede funciona.",
      "options": [
        "A resposta está garantida pela condição.",
        "A resposta está proibida.",
        "A falha da rede aconteceu."
      ],
      "correct": 0,
      "why": "O caso normal descrito foi satisfeito."
    },
    {
      "question": "Treino 6: “O sistema responde, a menos que caia a rede.” A rede cai.",
      "options": [
        "A resposta fica indeterminada pela regra.",
        "A resposta fica logicamente impossível.",
        "A regra garante resposta mesmo sem outra hipótese."
      ],
      "correct": 0,
      "why": "O texto não descarta uma solução alternativa."
    }
  ],
  "equiv_distributividade": [
    {
      "question": "Treino 1: A expressão A∨(B∧C) distribui-se como:",
      "options": [
        "(A∨B)∧(A∨C).",
        "(A∨B)∨C.",
        "A∧(B∨C)."
      ],
      "correct": 0,
      "why": "A disjunção externa aparece em cada ramo da conjunção."
    },
    {
      "question": "Treino 2: Se A é uma fórmula composta, na distribuição:",
      "options": [
        "Repete-se a fórmula A inteira.",
        "Elimina-se uma subfórmula.",
        "Troca-se A por sua negação."
      ],
      "correct": 0,
      "why": "As letras A,B,C podem representar expressões compostas."
    },
    {
      "question": "Treino 3: Reescreva r∧(p∨q).",
      "options": [
        "(r∧p)∨(r∧q).",
        "(r∧p)∨q.",
        "r∨(p∧q)."
      ],
      "correct": 0,
      "why": "O termo r se junta às duas alternativas."
    },
    {
      "question": "Treino 4: Reescreva q∨(p∧r).",
      "options": [
        "(q∨p)∧(q∨r).",
        "(q∨p)∨r.",
        "q∧(p∨r)."
      ],
      "correct": 0,
      "why": "Uma disjunção sobre conjunção resulta em duas disjunções."
    },
    {
      "question": "Treino 5: Na expansão de s∧(p∨q), pode omitir s do segundo ramo?",
      "options": [
        "Não, a condição s é comum aos dois.",
        "Sim, desde que q seja verdadeira.",
        "Sim, pois disjunção é inclusiva."
      ],
      "correct": 0,
      "why": "Uma omissão pode admitir uma interpretação sem s."
    },
    {
      "question": "Treino 6: Qual alternativa preserva t∨(u∧v)?",
      "options": [
        "(t∨u)∧(t∨v).",
        "(t∨u)∨v.",
        "t∧(u∨v)."
      ],
      "correct": 0,
      "why": "Ambas as exigências precisam conter t."
    }
  ],
  "equiv_absorcao": [
    {
      "question": "Treino 1: Qual segunda forma de absorção é válida?",
      "options": [
        "A∧(A∨B)≡A.",
        "A∧B≡B.",
        "A∨(A∧B)≡B."
      ],
      "correct": 0,
      "why": "A condição A já garante a parte A∨B."
    },
    {
      "question": "Treino 2: É possível usar A composto numa lei de absorção?",
      "options": [
        "Sim, desde que a subfórmula inteira se repita.",
        "Não, somente letras atômicas.",
        "Sim, apagando qualquer outro termo."
      ],
      "correct": 0,
      "why": "As leis valem para fórmulas, não apenas para átomos."
    },
    {
      "question": "Treino 3: Simplifique p∨(p∧r).",
      "options": [
        "p.",
        "r.",
        "p∧r."
      ],
      "correct": 0,
      "why": "A parcela p absorve a alternativa mais restrita."
    },
    {
      "question": "Treino 4: Simplifique s∧(s∨q).",
      "options": [
        "s.",
        "q.",
        "s∨q."
      ],
      "correct": 0,
      "why": "A exigência s torna a disjunção interna automática."
    },
    {
      "question": "Treino 5: A fórmula (p→q)∨((p→q)∧r) reduz-se a:",
      "options": [
        "p→q.",
        "r.",
        "p∧r."
      ],
      "correct": 0,
      "why": "Toda a condicional é a parcela comum A."
    },
    {
      "question": "Treino 6: Reduza t∧(t∨u).",
      "options": [
        "t.",
        "u.",
        "t∨u."
      ],
      "correct": 0,
      "why": "A forma A∧(A∨B) equivale a A. A conclusão é uma aplicação da definição estudada na leitura e no exemplo resolvido."
    }
  ],
  "equiv_bicondicional": [
    {
      "question": "Treino 1: Quando p↔q é verdadeira?",
      "options": [
        "Quando p e q têm o mesmo valor.",
        "Sempre que p é verdadeira.",
        "Somente quando p é falsa."
      ],
      "correct": 0,
      "why": "As duas direções valem juntas se os lados concordam."
    },
    {
      "question": "Treino 2: Se p=V e q=F, p↔q é:",
      "options": [
        "Falsa.",
        "Verdadeira.",
        "Indeterminada na lógica clássica."
      ],
      "correct": 0,
      "why": "Uma direção p→q falha nessa valoração."
    },
    {
      "question": "Treino 3: Expanda q↔r.",
      "options": [
        "(q→r)∧(r→q).",
        "(q→r)∨(r→q).",
        "q→r apenas."
      ],
      "correct": 0,
      "why": "É preciso incluir ida e volta."
    },
    {
      "question": "Treino 4: “p se e somente se q” equivale a:",
      "options": [
        "(p→q)∧(q→p).",
        "q→p apenas.",
        "p∧¬q."
      ],
      "correct": 0,
      "why": "O texto estabelece suficiência recíproca."
    },
    {
      "question": "Treino 5: Com p=F,q=F, p↔q vale:",
      "options": [
        "V.",
        "F.",
        "Apenas uma das condicionais vale."
      ],
      "correct": 0,
      "why": "Com ambos falsos, as duas implicações são verdadeiras."
    },
    {
      "question": "Treino 6: Qual condição falta para obter p↔q a partir de p→q?",
      "options": [
        "q→p.",
        "¬p.",
        "p∨q."
      ],
      "correct": 0,
      "why": "É preciso a implicação na volta."
    }
  ],
  "equiv_negacao_condicional": [
    {
      "question": "Treino 1: A expressão ¬(p→q) contém semanticamente:",
      "options": [
        "Uma condição realizada sem a consequência.",
        "Uma condição que nunca aconteceu.",
        "Uma implicação inversa."
      ],
      "correct": 0,
      "why": "A negação seleciona a linha falsa da condicional."
    },
    {
      "question": "Treino 2: Qual conectivo reúne as duas condições do contraexemplo?",
      "options": [
        "E ∧.",
        "OU ∨.",
        "SE →."
      ],
      "correct": 0,
      "why": "Ambas as partes devem acontecer no mesmo caso."
    },
    {
      "question": "Treino 3: Negue “Se chove, molha”.",
      "options": [
        "Chove e não molha.",
        "Não chove e não molha.",
        "Se não chove, não molha."
      ],
      "correct": 0,
      "why": "A promessa falha se chover sem molhar."
    },
    {
      "question": "Treino 4: Negue r→s.",
      "options": [
        "r∧¬s.",
        "¬r→¬s.",
        "¬r∧s."
      ],
      "correct": 0,
      "why": "O antecedente r precisa valer e s precisa falhar."
    },
    {
      "question": "Treino 5: Se p=F e q=F, ¬(p→q) vale:",
      "options": [
        "F.",
        "V.",
        "Não tem valor."
      ],
      "correct": 0,
      "why": "Com antecedente falso a condicional é verdadeira, logo sua negação é falsa."
    },
    {
      "question": "Treino 6: Com p=V,q=F, ¬(p→q) vale:",
      "options": [
        "V.",
        "F.",
        "Igual a ¬p."
      ],
      "correct": 0,
      "why": "É a única linha em que a condicional é desmentida."
    }
  ]
};