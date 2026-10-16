/** Aulas originais da primeira metade, com uma competência central cada. */
export const FOCUSED_LESSONS_A={
  "condicionais_naturais": {
    "lead": "Em que direção devemos ler ‘se’ e ‘somente se’?",
    "theory": "Se p então q indica que p é suficiente para q: sempre que p ocorre, q ocorre. A afirmação não informa que q só acontece quando p acontece. Na frase “Se houver inscrição, haverá confirmação”, a inscrição é a condição suficiente. A confirmação pode ocorrer por outros meios, mas isso não altera o sentido de p→q.\n\nSe p então q também informa que q é necessária para p. Quando p acontece, q não pode faltar sem tornar a condicional falsa. Em “entraremos somente se houver ingresso”, o ingresso é necessário para a entrada. Isso não significa que todo portador de ingresso já tenha entrado.\n\nA construção “p se q” expressa q→p. A construção “p somente se q” expressa p→q. Identifique a parte que funciona como condição, sem depender da ordem das letras. Para conferir, leia a fórmula em português: se q então p, ou se p então q. Neste momento a aula exige apenas escolher a direção correta da condicional; frases de exceção são o tema seguinte.",
    "example": "“A biblioteca abrirá se houver funcionários”; p=abrir, q=haver funcionários.",
    "steps": [
      "A expressão “se houver funcionários” introduz q como condição suficiente.",
      "Escreva q→p: se houver funcionários, então a biblioteca abrirá.",
      "“A biblioteca abrirá somente se houver funcionários” corresponderia a p→q."
    ],
    "quiz": [
      {
        "question": "Em 'p se q', a seta aponta de:",
        "options": [
          "q para p.",
          "p para q.",
          "p para ¬q."
        ],
        "correct": 0,
        "why": "O trecho depois de se indica a condição suficiente."
      },
      {
        "question": "Em 'p somente se q', a seta aponta de:",
        "options": [
          "p para q.",
          "q para p.",
          "p para ¬p."
        ],
        "correct": 0,
        "why": "A expressão somente se apresenta q como requisito de p."
      },
      {
        "question": "Em p→q, p é:",
        "options": [
          "Suficiente para q.",
          "Necessária e suficiente por definição.",
          "Incompatível com q."
        ],
        "correct": 0,
        "why": "O antecedente assegura o consequente."
      },
      {
        "question": "Em p→q, q é:",
        "options": [
          "Necessária para p.",
          "Suficiente para p.",
          "Negação de p."
        ],
        "correct": 0,
        "why": "O consequente precisa acompanhar o antecedente quando este vale."
      }
    ]
  },
  "equiv_algebra": {
    "lead": "Como trocar a ordem ou o agrupamento sem alterar uma fórmula?",
    "theory": "Trocar a ordem de dois termos ligados por E não altera seu valor: p∧q≡q∧p. A mesma propriedade vale para OU: p∨q≡q∨p. Essa lei não diz que qualquer conectivo pode ser invertido. Em particular, a condicional p→q não pode ter seus termos trocados apenas porque E e OU são comutativos.\n\nQuando usamos o mesmo conectivo em sequência, podemos reorganizar os parênteses: (p∧q)∧r≡p∧(q∧r). Com OU vale a forma correspondente (p∨q)∨r≡p∨(q∨r). A lei altera o agrupamento, não o tipo de operação. A associação de uma conjunção com uma disjunção exigiria justificativa diferente, que será ensinada na aula seguinte.\n\nPara identificar comutatividade, procure a troca da ordem de parcelas mantendo o conectivo. Para reconhecer associatividade, procure alteração de parênteses entre ocorrências do mesmo conectivo. Pratique separadamente cada operação e explique o que mudou. Distribuir uma operação sobre outra e eliminar termos redundantes serão competências novas em aulas posteriores.",
    "example": "Reorganize (p∨q)∨r para destacar q∨r sem modificar o valor.",
    "steps": [
      "As duas operações são disjunções ∨, independentemente dos valores das variáveis.",
      "Transforme (p∨q)∨r em p∨(q∨r).",
      "Os dois lados admitem exatamente as mesmas combinações de valores verdadeiros."
    ],
    "quiz": [
      {
        "question": "Comutatividade significa:",
        "options": [
          "Trocar a ordem das parcelas.",
          "Trocar ∧ por →.",
          "Eliminar a segunda parcela."
        ],
        "correct": 0,
        "why": "A operação permanece a mesma, mas os termos trocam de posição."
      },
      {
        "question": "Associatividade significa:",
        "options": [
          "Reagrupar parcelas com o mesmo conectivo.",
          "Negar cada parcela.",
          "Distribuir uma operação sobre outra."
        ],
        "correct": 0,
        "why": "A posição dos parênteses muda em uma sequência uniforme."
      },
      {
        "question": "Qual conectivo clássico é comutativo?",
        "options": [
          "Conjunção ∧.",
          "Condicional →.",
          "Negação ¬ como binária."
        ],
        "correct": 0,
        "why": "Os termos de uma conjunção podem ser trocados."
      },
      {
        "question": "Uma associação correta exige:",
        "options": [
          "O mesmo conectivo nas operações agrupadas.",
          "Sempre duas operações distintas.",
          "Um bicondicional externo."
        ],
        "correct": 0,
        "why": "A lei não autoriza troca arbitrária entre E e OU."
      }
    ]
  },
  "equiv_condicionais": {
    "lead": "O que significa construir a contrapositiva de uma condicional?",
    "theory": "Da condicional p→q obtemos uma afirmação equivalente trocando a ordem e negando os dois lados: ¬q→¬p. Essa regra chama-se contraposição. Por exemplo, “Se é quadrado, possui quatro lados” tem a contrapositiva “Se não possui quatro lados, não é quadrado”. Ambas afirmam a mesma condição lógica.\n\nTrocar somente a ordem produz q→p, a recíproca. Ela pode ser falsa apesar de p→q ser verdadeira. Nem tudo que possui quatro lados é quadrado. Para distinguir, sublinhe os dois lados, troque-os e negue ambos na contrapositiva. Se não aparecerem as duas negações, você não executou a operação correta.\n\nO contraexemplo à condicional original exige p verdadeira e q falsa. Nessas mesmas condições, a contrapositiva tem antecedente ¬q verdadeiro e consequente ¬p falso, ficando também falsa. Nos demais casos, ambas são verdadeiras. Isso permite confirmar a equivalência sem recorrer a bicondicionais ou a outras leis que serão estudadas depois.",
    "example": "“Se um arquivo é PDF, então tem extensão .pdf”. Seja p=é PDF e q=tem extensão .pdf.",
    "steps": [
      "A frase possui p como antecedente e q como consequente.",
      "A contrapositiva é ¬q→¬p: se não tem extensão .pdf, não é PDF, segundo a regra apresentada.",
      "q→p afirmaria que tudo que tem extensão .pdf é necessariamente um PDF, o que não foi estabelecido."
    ],
    "quiz": [
      {
        "question": "Uma contraposição exige:",
        "options": [
          "Trocar e negar as duas partes.",
          "Apenas trocar os lados.",
          "Apenas negar o primeiro lado."
        ],
        "correct": 0,
        "why": "A forma geral é ¬q→¬p. A conclusão é uma aplicação da definição estudada na leitura e no exemplo resolvido."
      },
      {
        "question": "A recíproca de p→q é:",
        "options": [
          "q→p.",
          "¬q→¬p.",
          "¬p∧q."
        ],
        "correct": 0,
        "why": "A recíproca troca sem negar. A conclusão é uma aplicação da definição estudada na leitura e no exemplo resolvido."
      },
      {
        "question": "Qual fórmula é equivalente a p→q por contraposição?",
        "options": [
          "¬q→¬p.",
          "q→p.",
          "¬p→¬q."
        ],
        "correct": 0,
        "why": "A contrapositiva preserva as linhas da condicional."
      },
      {
        "question": "A recíproca é sempre equivalente?",
        "options": [
          "Não.",
          "Sim.",
          "Somente quando p é falso."
        ],
        "correct": 0,
        "why": "A volta exige informação adicional."
      }
    ]
  },
  "regras_inferencia": {
    "lead": "Como usar a presença ou ausência de um consequente para inferir?",
    "theory": "Se sabemos p→q e também p, podemos concluir q. Essa é a regra modus ponens: a condição suficiente foi satisfeita. Exemplo: se há matrícula, há acesso; há matrícula; logo há acesso. A conclusão depende das duas premissas e não apenas de uma expectativa sobre o resultado.\n\nSe sabemos p→q e também ¬q, concluímos ¬p. A regra modus tollens elimina o antecedente quando o consequente necessário falhou. Exemplo: se há matrícula, há acesso; não há acesso; logo não há matrícula, sob a validade das duas premissas. Trata-se da mesma relação condicional aplicada de modo negativo.\n\nDe p→q e q não segue p: talvez outra condição tenha provocado q. De p→q e ¬p não segue ¬q: q poderia ocorrer por outra razão. Antes de responder, identifique a condicional e a premissa adicional. Nesta aula são cobradas somente essas duas regras; outras formas de construção de provas vêm depois.",
    "example": "Premissas: se p, então q; q não aconteceu. Determine o que decorre.",
    "steps": [
      "p→q afirma que p garante q.",
      "A segunda premissa é ¬q, a negação do consequente.",
      "Obtenha ¬p. A conclusão elimina o antecedente, não afirma outra causa."
    ],
    "quiz": [
      {
        "question": "Modus ponens usa:",
        "options": [
          "p→q e p.",
          "p→q e ¬q.",
          "p→q e q."
        ],
        "correct": 0,
        "why": "A confirmação do antecedente autoriza o consequente."
      },
      {
        "question": "Modus tollens usa:",
        "options": [
          "p→q e ¬q.",
          "p→q e q.",
          "p→q e ¬p."
        ],
        "correct": 0,
        "why": "A falta do consequente exclui o antecedente."
      },
      {
        "question": "De p→q e q, podemos concluir p?",
        "options": [
          "Não, seria afirmação do consequente.",
          "Sim, por modus ponens.",
          "Sim, por modus tollens."
        ],
        "correct": 0,
        "why": "O mesmo q pode ocorrer por outras causas."
      },
      {
        "question": "De p→q e ¬p, podemos concluir ¬q?",
        "options": [
          "Não, seria negação do antecedente.",
          "Sim, por modus tollens.",
          "Sim, por modus ponens."
        ],
        "correct": 0,
        "why": "A negação de p não impede que q ocorra."
      }
    ]
  },
  "negacao_quantificadores": {
    "lead": "Como negar as afirmações simples 'todos' e 'existe'?",
    "theory": "A negação de “todos receberam” exige encontrar ao menos uma pessoa que não recebeu. Formalmente, ¬∀xP(x) equivale a ∃x¬P(x). Não confunda “nem todos” com “nenhum”: duas pessoas podem ter recebido e apenas uma não, e ainda assim a universal ser falsa.\n\nA negação de “alguém recebeu” exige que ninguém do domínio tenha recebido. Formalmente, ¬∃xP(x) equivale a ∀x¬P(x). É uma exigência mais forte do que encontrar uma pessoa que não recebeu, pois exclui toda testemunha favorável.\n\nSe falamos de funcionários, os quantificadores percorrem funcionários. A negação não amplia automaticamente o domínio para todos os habitantes da cidade. Nesta aula, negamos uma propriedade simples de uma variável. Escopos com condicionais e quantificadores aninhados serão estudados numa aula independente.",
    "example": "Considere o domínio de estudantes e a afirmação ‘todos entregaram o trabalho’.",
    "steps": [
      "A expressão é ∀xE(x), com E(x)=x entregou o trabalho.",
      "Obtemos ¬∀xE(x), equivalente a ∃x¬E(x).",
      "Pelo menos um estudante não entregou; não precisamos afirmar que todos deixaram de entregar."
    ],
    "quiz": [
      {
        "question": "Negar ∀ usa:",
        "options": [
          "∃ com predicado negado.",
          "∀ com predicado negado.",
          "∃ com predicado intacto."
        ],
        "correct": 0,
        "why": "A negação troca o quantificador universal por existencial."
      },
      {
        "question": "Negar ∃ usa:",
        "options": [
          "∀ com predicado negado.",
          "∃ com predicado negado.",
          "∀ com predicado intacto."
        ],
        "correct": 0,
        "why": "A inexistência de testemunhas exige negação universal."
      },
      {
        "question": "A expressão 'nem todos' significa:",
        "options": [
          "Existe ao menos um que não.",
          "Ninguém.",
          "Todos."
        ],
        "correct": 0,
        "why": "Uma exceção refuta o quantificador universal."
      },
      {
        "question": "A expressão 'nenhum' significa:",
        "options": [
          "Não existe testemunha favorável.",
          "Existe alguém contrário apenas.",
          "Todos satisfazem a propriedade."
        ],
        "correct": 0,
        "why": "É a negação de uma existencial favorável."
      }
    ]
  }
};
export const FOCUSED_READINGS_A={
  "condicionais_naturais": {
    "objective": "Distinguir condições necessárias e suficientes e traduzir ‘p se q’ e ‘p somente se q’ sem exigir exceções, equivalências avançadas ou contraexemplos compostos.",
    "sections": [
      {
        "heading": "Condição suficiente",
        "paragraphs": [
          "Se p então q indica que p é suficiente para q: sempre que p ocorre, q ocorre. A afirmação não informa que q só acontece quando p acontece.",
          "Na frase “Se houver inscrição, haverá confirmação”, a inscrição é a condição suficiente. A confirmação pode ocorrer por outros meios, mas isso não altera o sentido de p→q."
        ]
      },
      {
        "heading": "Condição necessária",
        "paragraphs": [
          "Se p então q também informa que q é necessária para p. Quando p acontece, q não pode faltar sem tornar a condicional falsa.",
          "Em “entraremos somente se houver ingresso”, o ingresso é necessário para a entrada. Isso não significa que todo portador de ingresso já tenha entrado."
        ]
      },
      {
        "heading": "Reconhecer ‘se’ e ‘somente se’",
        "paragraphs": [
          "A construção “p se q” expressa q→p. A construção “p somente se q” expressa p→q. Identifique a parte que funciona como condição, sem depender da ordem das letras.",
          "Para conferir, leia a fórmula em português: se q então p, ou se p então q. Neste momento a aula exige apenas escolher a direção correta da condicional; frases de exceção são o tema seguinte."
        ]
      }
    ],
    "misconception": "Uma condição necessária não é automaticamente suficiente. Em 'p somente se q', saber q não garante p; a frase estabelece apenas p→q.",
    "summary": "‘p se q’ expressa q→p e ‘p somente se q’ expressa p→q. O antecedente é suficiente para o consequente, enquanto o consequente é necessário para o antecedente.",
    "check": {
      "question": "“p somente se q” significa:",
      "options": [
        "p→q.",
        "q→p.",
        "p∧q."
      ],
      "correct": 0,
      "why": "q é requisito necessário para p, sem ser condição suficiente por si só."
    }
  },
  "equiv_algebra": {
    "objective": "Aplicar somente comutatividade e associatividade à conjunção e disjunção, respeitando conectivos iguais e identificando o que permanece invariável.",
    "sections": [
      {
        "heading": "Comutatividade de E e OU",
        "paragraphs": [
          "Trocar a ordem de dois termos ligados por E não altera seu valor: p∧q≡q∧p. A mesma propriedade vale para OU: p∨q≡q∨p.",
          "Essa lei não diz que qualquer conectivo pode ser invertido. Em particular, a condicional p→q não pode ter seus termos trocados apenas porque E e OU são comutativos."
        ]
      },
      {
        "heading": "Associatividade",
        "paragraphs": [
          "Quando usamos o mesmo conectivo em sequência, podemos reorganizar os parênteses: (p∧q)∧r≡p∧(q∧r). Com OU vale a forma correspondente (p∨q)∨r≡p∨(q∨r).",
          "A lei altera o agrupamento, não o tipo de operação. A associação de uma conjunção com uma disjunção exigiria justificativa diferente, que será ensinada na aula seguinte."
        ]
      },
      {
        "heading": "Distinguir as duas transformações",
        "paragraphs": [
          "Para identificar comutatividade, procure a troca da ordem de parcelas mantendo o conectivo. Para reconhecer associatividade, procure alteração de parênteses entre ocorrências do mesmo conectivo.",
          "Pratique separadamente cada operação e explique o que mudou. Distribuir uma operação sobre outra e eliminar termos redundantes serão competências novas em aulas posteriores."
        ]
      }
    ],
    "misconception": "Comutatividade troca a ordem e associatividade troca o agrupamento; nenhuma permite misturar ∧ com ∨ nem inverter uma condicional.",
    "summary": "Comutatividade: p∧q≡q∧p e p∨q≡q∨p. Associatividade: (p∧q)∧r≡p∧(q∧r) e forma semelhante para ∨. Nenhuma das duas leis permite trocar conectivos diferentes.",
    "check": {
      "question": "Qual lei permite (p∨q)∨r ≡ p∨(q∨r)?",
      "options": [
        "Associatividade.",
        "Distributividade.",
        "Absorção."
      ],
      "correct": 0,
      "why": "O agrupamento muda entre conectivos iguais, sem alterar a ordem das parcelas."
    }
  },
  "equiv_condicionais": {
    "objective": "Transformar exclusivamente p→q na contrapositiva ¬q→¬p e diferenciá-la da recíproca q→p, sem cobrar bicondicional ou negação da condicional.",
    "sections": [
      {
        "heading": "A contrapositiva",
        "paragraphs": [
          "Da condicional p→q obtemos uma afirmação equivalente trocando a ordem e negando os dois lados: ¬q→¬p. Essa regra chama-se contraposição.",
          "Por exemplo, “Se é quadrado, possui quatro lados” tem a contrapositiva “Se não possui quatro lados, não é quadrado”. Ambas afirmam a mesma condição lógica."
        ]
      },
      {
        "heading": "A recíproca é diferente",
        "paragraphs": [
          "Trocar somente a ordem produz q→p, a recíproca. Ela pode ser falsa apesar de p→q ser verdadeira. Nem tudo que possui quatro lados é quadrado.",
          "Para distinguir, sublinhe os dois lados, troque-os e negue ambos na contrapositiva. Se não aparecerem as duas negações, você não executou a operação correta."
        ]
      },
      {
        "heading": "Verificação por valores",
        "paragraphs": [
          "O contraexemplo à condicional original exige p verdadeira e q falsa. Nessas mesmas condições, a contrapositiva tem antecedente ¬q verdadeiro e consequente ¬p falso, ficando também falsa.",
          "Nos demais casos, ambas são verdadeiras. Isso permite confirmar a equivalência sem recorrer a bicondicionais ou a outras leis que serão estudadas depois."
        ]
      }
    ],
    "misconception": "A contrapositiva é ¬q→¬p; a recíproca q→p não é, em geral, equivalente à condicional original. Apenas trocar os lados produz uma afirmação nova.",
    "summary": "Para transformar p→q por contraposição, inverta e negue ambos os lados, obtendo ¬q→¬p. Não confunda com a recíproca q→p.",
    "check": {
      "question": "Qual é a contrapositiva de p→q?",
      "options": [
        "¬q→¬p.",
        "q→p.",
        "¬p→¬q."
      ],
      "correct": 0,
      "why": "A contraposição inverte os termos e nega os dois. Negar as duas partes e inverter sua ordem conserva a tabela da condicional; apenas inverter produz a recíproca."
    }
  },
  "regras_inferencia": {
    "objective": "Distinguir modus ponens e modus tollens em condicionais simples, identificando qual premissa adicional autoriza cada conclusão.",
    "sections": [
      {
        "heading": "Aplicando modus ponens",
        "paragraphs": [
          "Se sabemos p→q e também p, podemos concluir q. Essa é a regra modus ponens: a condição suficiente foi satisfeita.",
          "Exemplo: se há matrícula, há acesso; há matrícula; logo há acesso. A conclusão depende das duas premissas e não apenas de uma expectativa sobre o resultado."
        ]
      },
      {
        "heading": "Aplicando modus tollens",
        "paragraphs": [
          "Se sabemos p→q e também ¬q, concluímos ¬p. A regra modus tollens elimina o antecedente quando o consequente necessário falhou.",
          "Exemplo: se há matrícula, há acesso; não há acesso; logo não há matrícula, sob a validade das duas premissas. Trata-se da mesma relação condicional aplicada de modo negativo."
        ]
      },
      {
        "heading": "Distinguir das formas inválidas",
        "paragraphs": [
          "De p→q e q não segue p: talvez outra condição tenha provocado q. De p→q e ¬p não segue ¬q: q poderia ocorrer por outra razão.",
          "Antes de responder, identifique a condicional e a premissa adicional. Nesta aula são cobradas somente essas duas regras; outras formas de construção de provas vêm depois."
        ]
      }
    ],
    "misconception": "Modus ponens usa p→q e p; modus tollens usa p→q e ¬q. Afirmar q ou negar p não autoriza concluir a volta.",
    "summary": "Modus ponens: p→q, p ⊢ q. Modus tollens: p→q, ¬q ⊢ ¬p. Reconheça a premissa adicional antes de escolher a regra.",
    "check": {
      "question": "De p→q e da premissa ¬q, qual conclusão está autorizada?",
      "options": [
        "¬p.",
        "p.",
        "q."
      ],
      "correct": 0,
      "why": "É modus tollens: a falta do consequente exclui o antecedente."
    }
  },
  "negacao_quantificadores": {
    "objective": "Negar quantificadores simples ¬∀xP(x) e ¬∃xP(x), distinguindo a afirmação de uma exceção da ausência de qualquer testemunha.",
    "sections": [
      {
        "heading": "Negar uma universal",
        "paragraphs": [
          "A negação de “todos receberam” exige encontrar ao menos uma pessoa que não recebeu. Formalmente, ¬∀xP(x) equivale a ∃x¬P(x).",
          "Não confunda “nem todos” com “nenhum”: duas pessoas podem ter recebido e apenas uma não, e ainda assim a universal ser falsa."
        ]
      },
      {
        "heading": "Negar uma existencial",
        "paragraphs": [
          "A negação de “alguém recebeu” exige que ninguém do domínio tenha recebido. Formalmente, ¬∃xP(x) equivale a ∀x¬P(x).",
          "É uma exigência mais forte do que encontrar uma pessoa que não recebeu, pois exclui toda testemunha favorável."
        ]
      },
      {
        "heading": "Fixar o domínio",
        "paragraphs": [
          "Se falamos de funcionários, os quantificadores percorrem funcionários. A negação não amplia automaticamente o domínio para todos os habitantes da cidade.",
          "Nesta aula, negamos uma propriedade simples de uma variável. Escopos com condicionais e quantificadores aninhados serão estudados numa aula independente. Essas duas transformações simples serão o pré-requisito para lidar posteriormente com quantificadores e conectivos aninhados, em que o alcance da negação muda a tradução."
        ]
      }
    ],
    "misconception": "Nem todos significa ao menos um contraexemplo; nenhum significa ausência total de testemunhas. Negar ∀ troca por ∃, e negar ∃ troca por ∀.",
    "summary": "¬∀xP(x) ≡ ∃x¬P(x); ¬∃xP(x) ≡ ∀x¬P(x). Mantenha o mesmo domínio e negue somente a propriedade simples.",
    "check": {
      "question": "A negação de 'todos passaram' é:",
      "options": [
        "Algum não passou.",
        "Nenhum passou.",
        "Todos passaram."
      ],
      "correct": 0,
      "why": "A universal é negada por ao menos um contraexemplo. É suficiente encontrar uma exceção para refutar todos, mas é necessário excluir todas as testemunhas para negar existe."
    }
  }
};
export const FOCUSED_WORKED_A={
  "condicionais_naturais": {
    "context": "“A biblioteca abrirá se houver funcionários”; p=abrir, q=haver funcionários.",
    "steps": [
      {
        "formal": "Localize a parte condicionante",
        "concrete": "A expressão “se houver funcionários” introduz q como condição suficiente.",
        "reason": "O evento após “se” aciona a promessa sobre a abertura."
      },
      {
        "formal": "Traduza o enunciado",
        "concrete": "Escreva q→p: se houver funcionários, então a biblioteca abrirá.",
        "reason": "Inverter p e q produziria uma regra diferente, que não foi afirmada."
      },
      {
        "formal": "Compare com ‘somente se’",
        "concrete": "“A biblioteca abrirá somente se houver funcionários” corresponderia a p→q.",
        "reason": "Agora q é requisito da abertura, não uma garantia suficiente de abertura."
      }
    ],
    "check": {
      "question": "No exemplo da biblioteca, qual fórmula representa ‘abrirá se houver funcionários’?",
      "options": [
        "q→p.",
        "p→q.",
        "p↔q."
      ],
      "correct": 0,
      "why": "Haver funcionários é a condição suficiente da abertura."
    }
  },
  "equiv_algebra": {
    "context": "Reorganize (p∨q)∨r para destacar q∨r sem modificar o valor.",
    "steps": [
      {
        "formal": "Observe o conectivo comum",
        "concrete": "As duas operações são disjunções ∨, independentemente dos valores das variáveis.",
        "reason": "O uso do mesmo conectivo autoriza associatividade."
      },
      {
        "formal": "Mude somente os parênteses",
        "concrete": "Transforme (p∨q)∨r em p∨(q∨r).",
        "reason": "A ordem p,q,r foi preservada; apenas o agrupamento mudou."
      },
      {
        "formal": "Confira o que não mudou",
        "concrete": "Os dois lados admitem exatamente as mesmas combinações de valores verdadeiros.",
        "reason": "Não houve distribuição, introdução de novos conectivos ou eliminação de termos."
      }
    ],
    "check": {
      "question": "No exemplo, o que muda de (p∨q)∨r para p∨(q∨r)?",
      "options": [
        "Apenas o agrupamento.",
        "O conectivo ∨ vira ∧.",
        "A ordem das letras muda."
      ],
      "correct": 0,
      "why": "A associatividade conserva o mesmo conectivo e a mesma ordem de parcelas."
    }
  },
  "equiv_condicionais": {
    "context": "“Se um arquivo é PDF, então tem extensão .pdf”. Seja p=é PDF e q=tem extensão .pdf.",
    "steps": [
      {
        "formal": "Identifique antecedente e consequente",
        "concrete": "A frase possui p como antecedente e q como consequente.",
        "reason": "A operação depende de reconhecer as duas posições."
      },
      {
        "formal": "Troque e negue os dois lados",
        "concrete": "A contrapositiva é ¬q→¬p: se não tem extensão .pdf, não é PDF, segundo a regra apresentada.",
        "reason": "A nova condicional começa pela negação do consequente original."
      },
      {
        "formal": "Distinga a recíproca",
        "concrete": "q→p afirmaria que tudo que tem extensão .pdf é necessariamente um PDF, o que não foi estabelecido.",
        "reason": "Trocar sem negar cria outra afirmação, que pode falhar."
      }
    ],
    "check": {
      "question": "No exemplo sobre arquivos, qual frase seria apenas a recíproca indevida?",
      "options": [
        "Se tem extensão .pdf, é PDF.",
        "Se não tem extensão .pdf, não é PDF.",
        "Se é PDF, tem extensão .pdf."
      ],
      "correct": 0,
      "why": "A recíproca troca as posições sem negar as duas partes."
    }
  },
  "regras_inferencia": {
    "context": "Premissas: se p, então q; q não aconteceu. Determine o que decorre.",
    "steps": [
      {
        "formal": "Identifique a regra dada",
        "concrete": "p→q afirma que p garante q.",
        "reason": "O consequente q é necessário quando p é verdadeiro."
      },
      {
        "formal": "Use a premissa adicional",
        "concrete": "A segunda premissa é ¬q, a negação do consequente.",
        "reason": "Esse é o padrão de modus tollens, não de modus ponens."
      },
      {
        "formal": "Conclua sem inverter",
        "concrete": "Obtenha ¬p. A conclusão elimina o antecedente, não afirma outra causa.",
        "reason": "Se p fosse verdadeira, q precisaria ser verdadeira, contradizendo ¬q."
      }
    ],
    "check": {
      "question": "No exemplo p→q com ¬q, qual conclusão foi obtida?",
      "options": [
        "¬p.",
        "q.",
        "p."
      ],
      "correct": 0,
      "why": "Modus tollens exclui o antecedente porque o consequente falhou."
    }
  },
  "negacao_quantificadores": {
    "context": "Considere o domínio de estudantes e a afirmação ‘todos entregaram o trabalho’.",
    "steps": [
      {
        "formal": "Formalize a universal",
        "concrete": "A expressão é ∀xE(x), com E(x)=x entregou o trabalho.",
        "reason": "A propriedade é examinada no domínio de estudantes."
      },
      {
        "formal": "Negue a universal",
        "concrete": "Obtemos ¬∀xE(x), equivalente a ∃x¬E(x).",
        "reason": "A negação exige uma testemunha de não entrega."
      },
      {
        "formal": "Interprete o resultado",
        "concrete": "Pelo menos um estudante não entregou; não precisamos afirmar que todos deixaram de entregar.",
        "reason": "Uma única exceção basta para refutar todos."
      }
    ],
    "check": {
      "question": "No exemplo, basta um estudante sem trabalho entregue para afirmar:",
      "options": [
        "Nem todos entregaram.",
        "Ninguém entregou.",
        "Todos entregaram."
      ],
      "correct": 0,
      "why": "A exceção encontrada refuta a afirmação universal."
    }
  }
};
export const FOCUSED_ASSESSMENTS_A={
  "condicionais_naturais": [
    {
      "question": "“Lerei se tiver tempo” representa:",
      "options": [
        "tempo→leitura.",
        "leitura→tempo.",
        "tempo∧leitura."
      ],
      "correct": 0,
      "why": "Ter tempo é apresentado como suficiente para a leitura.",
      "dimension": "application",
      "objective": "Aplicação da competência central"
    },
    {
      "question": "“Viajarei somente se tiver férias” representa:",
      "options": [
        "viagem→férias.",
        "férias→viagem.",
        "viagem∨férias."
      ],
      "correct": 0,
      "why": "Férias são requisito necessário para a viagem.",
      "dimension": "application",
      "objective": "Aplicação da competência central"
    },
    {
      "question": "“Entrará somente se tiver convite” permite convidado não entrar?",
      "options": [
        "Sim, ter convite não garante entrada.",
        "Não, todo convidado entra.",
        "Não, a regra exige as duas direções."
      ],
      "correct": 0,
      "why": "O convite é necessário, mas não foi declarado suficiente.",
      "dimension": "application",
      "objective": "Aplicação da competência central"
    },
    {
      "question": "“O alarme toca se houver fumaça” indica:",
      "options": [
        "fumaça→alarme.",
        "alarme→fumaça.",
        "alarme↔fumaça."
      ],
      "correct": 0,
      "why": "Haver fumaça é condição suficiente para o alarme tocar.",
      "dimension": "application",
      "objective": "Aplicação da competência central"
    },
    {
      "question": "Em outra situação conceitual 1, Em 'p se q', a seta aponta de:",
      "options": [
        "q para p.",
        "p para q.",
        "p para ¬q."
      ],
      "correct": 0,
      "why": "O trecho depois de se indica a condição suficiente.",
      "dimension": "concept",
      "objective": "Compreensão da competência central"
    },
    {
      "question": "Em outra situação conceitual 2, Em 'p somente se q', a seta aponta de:",
      "options": [
        "p para q.",
        "q para p.",
        "p para ¬p."
      ],
      "correct": 0,
      "why": "A expressão somente se apresenta q como requisito de p.",
      "dimension": "concept",
      "objective": "Compreensão da competência central"
    },
    {
      "question": "Em outra situação conceitual 3, Em p→q, p é:",
      "options": [
        "Suficiente para q.",
        "Necessária e suficiente por definição.",
        "Incompatível com q."
      ],
      "correct": 0,
      "why": "O antecedente assegura o consequente.",
      "dimension": "concept",
      "objective": "Compreensão da competência central"
    },
    {
      "question": "Em outra situação conceitual 4, Em p→q, q é:",
      "options": [
        "Necessária para p.",
        "Suficiente para p.",
        "Negação de p."
      ],
      "correct": 0,
      "why": "O consequente precisa acompanhar o antecedente quando este vale.",
      "dimension": "concept",
      "objective": "Compreensão da competência central"
    }
  ],
  "equiv_algebra": [
    {
      "question": "Troque p∨r pela comutativa:",
      "options": [
        "r∨p.",
        "r∧p.",
        "r→p."
      ],
      "correct": 0,
      "why": "Apenas a ordem é alterada. A conclusão é uma aplicação da definição estudada na leitura e no exemplo resolvido.",
      "dimension": "application",
      "objective": "Aplicação da competência central"
    },
    {
      "question": "Associe (p∧q)∧s:",
      "options": [
        "p∧(q∧s).",
        "p∧(q∨s).",
        "(p∨q)∧s."
      ],
      "correct": 0,
      "why": "Mantém-se o E em todos os níveis.",
      "dimension": "application",
      "objective": "Aplicação da competência central"
    },
    {
      "question": "p∧q e q∧p são:",
      "options": [
        "Equivalentes por comutatividade.",
        "Equivalentes por contraposição.",
        "Necessariamente diferentes na tabela."
      ],
      "correct": 0,
      "why": "A troca conserva o valor clássico da conjunção.",
      "dimension": "application",
      "objective": "Aplicação da competência central"
    },
    {
      "question": "Associe t∨(u∨v):",
      "options": [
        "(t∨u)∨v.",
        "(t∧u)∨v.",
        "t∨(u∧v)."
      ],
      "correct": 0,
      "why": "A lei apenas reorganiza as mesmas disjunções.",
      "dimension": "application",
      "objective": "Aplicação da competência central"
    },
    {
      "question": "Em outra situação conceitual 1, Comutatividade significa:",
      "options": [
        "Trocar a ordem das parcelas.",
        "Trocar ∧ por →.",
        "Eliminar a segunda parcela."
      ],
      "correct": 0,
      "why": "A operação permanece a mesma, mas os termos trocam de posição.",
      "dimension": "concept",
      "objective": "Compreensão da competência central"
    },
    {
      "question": "Em outra situação conceitual 2, Associatividade significa:",
      "options": [
        "Reagrupar parcelas com o mesmo conectivo.",
        "Negar cada parcela.",
        "Distribuir uma operação sobre outra."
      ],
      "correct": 0,
      "why": "A posição dos parênteses muda em uma sequência uniforme.",
      "dimension": "concept",
      "objective": "Compreensão da competência central"
    },
    {
      "question": "Em outra situação conceitual 3, Qual conectivo clássico é comutativo?",
      "options": [
        "Conjunção ∧.",
        "Condicional →.",
        "Negação ¬ como binária."
      ],
      "correct": 0,
      "why": "Os termos de uma conjunção podem ser trocados.",
      "dimension": "concept",
      "objective": "Compreensão da competência central"
    },
    {
      "question": "Em outra situação conceitual 4, Uma associação correta exige:",
      "options": [
        "O mesmo conectivo nas operações agrupadas.",
        "Sempre duas operações distintas.",
        "Um bicondicional externo."
      ],
      "correct": 0,
      "why": "A lei não autoriza troca arbitrária entre E e OU.",
      "dimension": "concept",
      "objective": "Compreensão da competência central"
    }
  ],
  "equiv_condicionais": [
    {
      "question": "Contraponha “Se chove, a rua molha”.",
      "options": [
        "Se a rua não molha, não chove.",
        "Se a rua molha, chove.",
        "Se não chove, a rua não molha."
      ],
      "correct": 0,
      "why": "A ordem é invertida e ambas as partes negadas.",
      "dimension": "application",
      "objective": "Aplicação da competência central"
    },
    {
      "question": "Qual a contrapositiva de r→s?",
      "options": [
        "¬s→¬r.",
        "s→r.",
        "¬r→¬s."
      ],
      "correct": 0,
      "why": "Negamos s e r e trocamos suas posições.",
      "dimension": "application",
      "objective": "Aplicação da competência central"
    },
    {
      "question": "Qual é apenas a recíproca de q→p?",
      "options": [
        "p→q.",
        "¬p→¬q.",
        "q∧¬p."
      ],
      "correct": 0,
      "why": "A recíproca mantém os sinais e inverte as posições.",
      "dimension": "application",
      "objective": "Aplicação da competência central"
    },
    {
      "question": "A contrapositiva de (p∧q)→r é:",
      "options": [
        "¬r→¬(p∧q).",
        "r→(p∧q).",
        "¬(p∧q)→¬r."
      ],
      "correct": 0,
      "why": "Trate o antecedente composto como uma única subfórmula.",
      "dimension": "application",
      "objective": "Aplicação da competência central"
    },
    {
      "question": "Em outra situação conceitual 1, Uma contraposição exige:",
      "options": [
        "Trocar e negar as duas partes.",
        "Apenas trocar os lados.",
        "Apenas negar o primeiro lado."
      ],
      "correct": 0,
      "why": "A forma geral é ¬q→¬p. A conclusão é uma aplicação da definição estudada na leitura e no exemplo resolvido.",
      "dimension": "concept",
      "objective": "Compreensão da competência central"
    },
    {
      "question": "Em outra situação conceitual 2, A recíproca de p→q é:",
      "options": [
        "q→p.",
        "¬q→¬p.",
        "¬p∧q."
      ],
      "correct": 0,
      "why": "A recíproca troca sem negar. A conclusão é uma aplicação da definição estudada na leitura e no exemplo resolvido.",
      "dimension": "concept",
      "objective": "Compreensão da competência central"
    },
    {
      "question": "Em outra situação conceitual 3, Qual fórmula é equivalente a p→q por contraposição?",
      "options": [
        "¬q→¬p.",
        "q→p.",
        "¬p→¬q."
      ],
      "correct": 0,
      "why": "A contrapositiva preserva as linhas da condicional.",
      "dimension": "concept",
      "objective": "Compreensão da competência central"
    },
    {
      "question": "Em outra situação conceitual 4, A recíproca é sempre equivalente?",
      "options": [
        "Não.",
        "Sim.",
        "Somente quando p é falso."
      ],
      "correct": 0,
      "why": "A volta exige informação adicional.",
      "dimension": "concept",
      "objective": "Compreensão da competência central"
    }
  ],
  "regras_inferencia": [
    {
      "question": "Com r→s e r, obtemos:",
      "options": [
        "s.",
        "¬s.",
        "¬r."
      ],
      "correct": 0,
      "why": "O antecedente confirmado ativa modus ponens.",
      "dimension": "application",
      "objective": "Aplicação da competência central"
    },
    {
      "question": "Com r→s e ¬s, obtemos:",
      "options": [
        "¬r.",
        "r.",
        "s."
      ],
      "correct": 0,
      "why": "Negação do consequente aplica modus tollens.",
      "dimension": "application",
      "objective": "Aplicação da competência central"
    },
    {
      "question": "Se acesso exige senha e há acesso, sabemos que há senha?",
      "options": [
        "Sim, se acesso→senha for a premissa dada.",
        "Não, só se senha→acesso.",
        "Não, nunca é possível inferir."
      ],
      "correct": 0,
      "why": "Dado acesso→senha e acesso, modus ponens fornece senha.",
      "dimension": "application",
      "objective": "Aplicação da competência central"
    },
    {
      "question": "Se p→q e q=F, qual valor p pode ter para manter a condicional V?",
      "options": [
        "F.",
        "V.",
        "Os dois valores."
      ],
      "correct": 0,
      "why": "p verdadeira tornaria a condicional falsa.",
      "dimension": "application",
      "objective": "Aplicação da competência central"
    },
    {
      "question": "Em outra situação conceitual 1, Modus ponens usa:",
      "options": [
        "p→q e p.",
        "p→q e ¬q.",
        "p→q e q."
      ],
      "correct": 0,
      "why": "A confirmação do antecedente autoriza o consequente.",
      "dimension": "concept",
      "objective": "Compreensão da competência central"
    },
    {
      "question": "Em outra situação conceitual 2, Modus tollens usa:",
      "options": [
        "p→q e ¬q.",
        "p→q e q.",
        "p→q e ¬p."
      ],
      "correct": 0,
      "why": "A falta do consequente exclui o antecedente.",
      "dimension": "concept",
      "objective": "Compreensão da competência central"
    },
    {
      "question": "Em outra situação conceitual 3, De p→q e q, podemos concluir p?",
      "options": [
        "Não, seria afirmação do consequente.",
        "Sim, por modus ponens.",
        "Sim, por modus tollens."
      ],
      "correct": 0,
      "why": "O mesmo q pode ocorrer por outras causas.",
      "dimension": "concept",
      "objective": "Compreensão da competência central"
    },
    {
      "question": "Em outra situação conceitual 4, De p→q e ¬p, podemos concluir ¬q?",
      "options": [
        "Não, seria negação do antecedente.",
        "Sim, por modus tollens.",
        "Sim, por modus ponens."
      ],
      "correct": 0,
      "why": "A negação de p não impede que q ocorra.",
      "dimension": "concept",
      "objective": "Compreensão da competência central"
    }
  ],
  "negacao_quantificadores": [
    {
      "question": "Negue 'Todos os alunos vieram'.",
      "options": [
        "Algum aluno não veio.",
        "Nenhum veio.",
        "Todos vieram."
      ],
      "correct": 0,
      "why": "Ao menos um contraexemplo refuta o universal.",
      "dimension": "application",
      "objective": "Aplicação da competência central"
    },
    {
      "question": "Negue 'Existe aluno aprovado'.",
      "options": [
        "Nenhum aluno aprovado.",
        "Existe aluno reprovado apenas.",
        "Todo aluno foi aprovado."
      ],
      "correct": 0,
      "why": "Não pode haver nenhum caso que satisfaz a propriedade.",
      "dimension": "application",
      "objective": "Aplicação da competência central"
    },
    {
      "question": "Qual negação corresponde a ¬∀xR(x)?",
      "options": [
        "∃x¬R(x).",
        "∀x¬R(x).",
        "∃xR(x)."
      ],
      "correct": 0,
      "why": "É uma existência contrária ao predicado.",
      "dimension": "application",
      "objective": "Aplicação da competência central"
    },
    {
      "question": "Qual negação corresponde a ¬∃xR(x)?",
      "options": [
        "∀x¬R(x).",
        "∃x¬R(x).",
        "∀xR(x)."
      ],
      "correct": 0,
      "why": "Nenhuma testemunha de R é admitida.",
      "dimension": "application",
      "objective": "Aplicação da competência central"
    },
    {
      "question": "Em outra situação conceitual 1, Negar ∀ usa:",
      "options": [
        "∃ com predicado negado.",
        "∀ com predicado negado.",
        "∃ com predicado intacto."
      ],
      "correct": 0,
      "why": "A negação troca o quantificador universal por existencial.",
      "dimension": "concept",
      "objective": "Compreensão da competência central"
    },
    {
      "question": "Em outra situação conceitual 2, Negar ∃ usa:",
      "options": [
        "∀ com predicado negado.",
        "∃ com predicado negado.",
        "∀ com predicado intacto."
      ],
      "correct": 0,
      "why": "A inexistência de testemunhas exige negação universal.",
      "dimension": "concept",
      "objective": "Compreensão da competência central"
    },
    {
      "question": "Em outra situação conceitual 3, A expressão 'nem todos' significa:",
      "options": [
        "Existe ao menos um que não.",
        "Ninguém.",
        "Todos."
      ],
      "correct": 0,
      "why": "Uma exceção refuta o quantificador universal.",
      "dimension": "concept",
      "objective": "Compreensão da competência central"
    },
    {
      "question": "Em outra situação conceitual 4, A expressão 'nenhum' significa:",
      "options": [
        "Não existe testemunha favorável.",
        "Existe alguém contrário apenas.",
        "Todos satisfazem a propriedade."
      ],
      "correct": 0,
      "why": "É a negação de uma existencial favorável.",
      "dimension": "concept",
      "objective": "Compreensão da competência central"
    }
  ]
};
export const FOCUSED_PRACTICE_A={
  "condicionais_naturais": [
    {
      "question": "Prática guiada 1: Em p→q, p é:",
      "options": [
        "Suficiente para q.",
        "Necessária e suficiente por definição.",
        "Incompatível com q."
      ],
      "correct": 0,
      "why": "O antecedente assegura o consequente."
    },
    {
      "question": "Prática guiada 2: Em p→q, q é:",
      "options": [
        "Necessária para p.",
        "Suficiente para p.",
        "Negação de p."
      ],
      "correct": 0,
      "why": "O consequente precisa acompanhar o antecedente quando este vale."
    },
    {
      "question": "Prática guiada 3: “Lerei se tiver tempo” representa:",
      "options": [
        "tempo→leitura.",
        "leitura→tempo.",
        "tempo∧leitura."
      ],
      "correct": 0,
      "why": "Ter tempo é apresentado como suficiente para a leitura."
    },
    {
      "question": "Prática guiada 4: “Viajarei somente se tiver férias” representa:",
      "options": [
        "viagem→férias.",
        "férias→viagem.",
        "viagem∨férias."
      ],
      "correct": 0,
      "why": "Férias são requisito necessário para a viagem."
    },
    {
      "question": "Prática guiada 5: “Entrará somente se tiver convite” permite convidado não entrar?",
      "options": [
        "Sim, ter convite não garante entrada.",
        "Não, todo convidado entra.",
        "Não, a regra exige as duas direções."
      ],
      "correct": 0,
      "why": "O convite é necessário, mas não foi declarado suficiente."
    },
    {
      "question": "Prática guiada 6: “O alarme toca se houver fumaça” indica:",
      "options": [
        "fumaça→alarme.",
        "alarme→fumaça.",
        "alarme↔fumaça."
      ],
      "correct": 0,
      "why": "Haver fumaça é condição suficiente para o alarme tocar."
    }
  ],
  "equiv_algebra": [
    {
      "question": "Prática guiada 1: Qual conectivo clássico é comutativo?",
      "options": [
        "Conjunção ∧.",
        "Condicional →.",
        "Negação ¬ como binária."
      ],
      "correct": 0,
      "why": "Os termos de uma conjunção podem ser trocados."
    },
    {
      "question": "Prática guiada 2: Uma associação correta exige:",
      "options": [
        "O mesmo conectivo nas operações agrupadas.",
        "Sempre duas operações distintas.",
        "Um bicondicional externo."
      ],
      "correct": 0,
      "why": "A lei não autoriza troca arbitrária entre E e OU."
    },
    {
      "question": "Prática guiada 3: Troque p∨r pela comutativa:",
      "options": [
        "r∨p.",
        "r∧p.",
        "r→p."
      ],
      "correct": 0,
      "why": "Apenas a ordem é alterada. A conclusão é uma aplicação da definição estudada na leitura e no exemplo resolvido."
    },
    {
      "question": "Prática guiada 4: Associe (p∧q)∧s:",
      "options": [
        "p∧(q∧s).",
        "p∧(q∨s).",
        "(p∨q)∧s."
      ],
      "correct": 0,
      "why": "Mantém-se o E em todos os níveis."
    },
    {
      "question": "Prática guiada 5: p∧q e q∧p são:",
      "options": [
        "Equivalentes por comutatividade.",
        "Equivalentes por contraposição.",
        "Necessariamente diferentes na tabela."
      ],
      "correct": 0,
      "why": "A troca conserva o valor clássico da conjunção."
    },
    {
      "question": "Prática guiada 6: Associe t∨(u∨v):",
      "options": [
        "(t∨u)∨v.",
        "(t∧u)∨v.",
        "t∨(u∧v)."
      ],
      "correct": 0,
      "why": "A lei apenas reorganiza as mesmas disjunções."
    }
  ],
  "equiv_condicionais": [
    {
      "question": "Prática guiada 1: Qual fórmula é equivalente a p→q por contraposição?",
      "options": [
        "¬q→¬p.",
        "q→p.",
        "¬p→¬q."
      ],
      "correct": 0,
      "why": "A contrapositiva preserva as linhas da condicional."
    },
    {
      "question": "Prática guiada 2: A recíproca é sempre equivalente?",
      "options": [
        "Não.",
        "Sim.",
        "Somente quando p é falso."
      ],
      "correct": 0,
      "why": "A volta exige informação adicional."
    },
    {
      "question": "Prática guiada 3: Contraponha “Se chove, a rua molha”.",
      "options": [
        "Se a rua não molha, não chove.",
        "Se a rua molha, chove.",
        "Se não chove, a rua não molha."
      ],
      "correct": 0,
      "why": "A ordem é invertida e ambas as partes negadas."
    },
    {
      "question": "Prática guiada 4: Qual a contrapositiva de r→s?",
      "options": [
        "¬s→¬r.",
        "s→r.",
        "¬r→¬s."
      ],
      "correct": 0,
      "why": "Negamos s e r e trocamos suas posições."
    },
    {
      "question": "Prática guiada 5: Qual é apenas a recíproca de q→p?",
      "options": [
        "p→q.",
        "¬p→¬q.",
        "q∧¬p."
      ],
      "correct": 0,
      "why": "A recíproca mantém os sinais e inverte as posições."
    },
    {
      "question": "Prática guiada 6: A contrapositiva de (p∧q)→r é:",
      "options": [
        "¬r→¬(p∧q).",
        "r→(p∧q).",
        "¬(p∧q)→¬r."
      ],
      "correct": 0,
      "why": "Trate o antecedente composto como uma única subfórmula."
    }
  ],
  "regras_inferencia": [
    {
      "question": "Prática guiada 1: De p→q e q, podemos concluir p?",
      "options": [
        "Não, seria afirmação do consequente.",
        "Sim, por modus ponens.",
        "Sim, por modus tollens."
      ],
      "correct": 0,
      "why": "O mesmo q pode ocorrer por outras causas."
    },
    {
      "question": "Prática guiada 2: De p→q e ¬p, podemos concluir ¬q?",
      "options": [
        "Não, seria negação do antecedente.",
        "Sim, por modus tollens.",
        "Sim, por modus ponens."
      ],
      "correct": 0,
      "why": "A negação de p não impede que q ocorra."
    },
    {
      "question": "Prática guiada 3: Com r→s e r, obtemos:",
      "options": [
        "s.",
        "¬s.",
        "¬r."
      ],
      "correct": 0,
      "why": "O antecedente confirmado ativa modus ponens."
    },
    {
      "question": "Prática guiada 4: Com r→s e ¬s, obtemos:",
      "options": [
        "¬r.",
        "r.",
        "s."
      ],
      "correct": 0,
      "why": "Negação do consequente aplica modus tollens."
    },
    {
      "question": "Prática guiada 5: Se acesso exige senha e há acesso, sabemos que há senha?",
      "options": [
        "Sim, se acesso→senha for a premissa dada.",
        "Não, só se senha→acesso.",
        "Não, nunca é possível inferir."
      ],
      "correct": 0,
      "why": "Dado acesso→senha e acesso, modus ponens fornece senha."
    },
    {
      "question": "Prática guiada 6: Se p→q e q=F, qual valor p pode ter para manter a condicional V?",
      "options": [
        "F.",
        "V.",
        "Os dois valores."
      ],
      "correct": 0,
      "why": "p verdadeira tornaria a condicional falsa."
    }
  ],
  "negacao_quantificadores": [
    {
      "question": "Prática guiada 1: A expressão 'nem todos' significa:",
      "options": [
        "Existe ao menos um que não.",
        "Ninguém.",
        "Todos."
      ],
      "correct": 0,
      "why": "Uma exceção refuta o quantificador universal."
    },
    {
      "question": "Prática guiada 2: A expressão 'nenhum' significa:",
      "options": [
        "Não existe testemunha favorável.",
        "Existe alguém contrário apenas.",
        "Todos satisfazem a propriedade."
      ],
      "correct": 0,
      "why": "É a negação de uma existencial favorável."
    },
    {
      "question": "Prática guiada 3: Negue 'Todos os alunos vieram'.",
      "options": [
        "Algum aluno não veio.",
        "Nenhum veio.",
        "Todos vieram."
      ],
      "correct": 0,
      "why": "Ao menos um contraexemplo refuta o universal."
    },
    {
      "question": "Prática guiada 4: Negue 'Existe aluno aprovado'.",
      "options": [
        "Nenhum aluno aprovado.",
        "Existe aluno reprovado apenas.",
        "Todo aluno foi aprovado."
      ],
      "correct": 0,
      "why": "Não pode haver nenhum caso que satisfaz a propriedade."
    },
    {
      "question": "Prática guiada 5: Qual negação corresponde a ¬∀xR(x)?",
      "options": [
        "∃x¬R(x).",
        "∀x¬R(x).",
        "∃xR(x)."
      ],
      "correct": 0,
      "why": "É uma existência contrária ao predicado."
    },
    {
      "question": "Prática guiada 6: Qual negação corresponde a ¬∃xR(x)?",
      "options": [
        "∀x¬R(x).",
        "∃x¬R(x).",
        "∀xR(x)."
      ],
      "correct": 0,
      "why": "Nenhuma testemunha de R é admitida."
    }
  ]
};