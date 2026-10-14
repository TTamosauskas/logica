/** Oito questões suplementares por aula da Unidade VIII, separadas das formativas. */
export const OTHER_LOGIC_ASSESSMENTS={
  "modais": [
    {
      "question": "Em □(p→q), qual conjunto de mundos deve ser verificado?",
      "options": [
        "Todos os destinos acessíveis a partir do mundo avaliado.",
        "Apenas o mundo em que q é falsa.",
        "Somente mundos em que p já é verdadeira no ponto de origem."
      ],
      "correct": 0,
      "why": "A fórmula interna p→q deve valer em cada destino acessível.",
      "dimension": "concept",
      "objective": "Interpretação do sistema formal"
    },
    {
      "question": "A validade de □p→p em quadros reflexivos depende de:",
      "options": [
        "Cada mundo acessar a si próprio.",
        "Todo mundo possuir apenas um destino.",
        "Os mundos formarem uma sequência temporal."
      ],
      "correct": 0,
      "why": "A reflexividade faz o mundo atual entrar na avaliação de □p.",
      "dimension": "concept",
      "objective": "Interpretação do sistema formal"
    },
    {
      "question": "Uma relação de acessibilidade pode ser assimétrica?",
      "options": [
        "Sim, w0 pode acessar w1 sem que w1 acesse w0.",
        "Não, toda seta exige a inversa.",
        "Não, a acessibilidade é sempre cronológica."
      ],
      "correct": 0,
      "why": "A semântica modal geral não exige simetria, salvo escolha explícita de sistema.",
      "dimension": "concept",
      "objective": "Interpretação do sistema formal"
    },
    {
      "question": "Em w0, p é F; w0 só acessa w1, com p V. Qual afirmação vale?",
      "options": [
        "◇p e □p podem ser V apesar de p falsa em w0.",
        "□p precisa ser F por causa do valor em w0.",
        "◇p é F porque p é falsa agora."
      ],
      "correct": 0,
      "why": "As modalidades examinam os destinos; o valor local não substitui os valores acessíveis.",
      "dimension": "application",
      "objective": "Aplicação semântica em modelo concreto"
    },
    {
      "question": "Em w0 sem sucessores, avalie □¬p e ◇p.",
      "options": [
        "□¬p é V e ◇p é F, independentemente de p em w0.",
        "Ambas são V por vacuidade.",
        "Ambas são F por falta de sucessores."
      ],
      "correct": 0,
      "why": "Universal vazia é verdadeira e existencial sem testemunha é falsa.",
      "dimension": "application",
      "objective": "Aplicação semântica em modelo concreto"
    },
    {
      "question": "Se w0 acessa w1 e w2, e q é F apenas em w2, então □q:",
      "options": [
        "É F em w0, pois w2 é contraexemplo.",
        "É V porque w1 satisfaz q.",
        "Depende só de q em w0."
      ],
      "correct": 0,
      "why": "Necessidade requer a propriedade em todos os destinos acessíveis.",
      "dimension": "application",
      "objective": "Aplicação semântica em modelo concreto"
    },
    {
      "question": "w0 acessa w1; w1 acessa w2 com p V. Isso por si torna ◇◇p V em w0?",
      "options": [
        "Sim, há caminho acessível de duas etapas até p.",
        "Não, são necessárias três etapas.",
        "Não, a modalidade interna nunca pode ser avaliada em w1."
      ],
      "correct": 0,
      "why": "A modalidade externa encontra w1, e em w1 a interna encontra w2.",
      "dimension": "application",
      "objective": "Aplicação semântica em modelo concreto"
    },
    {
      "question": "Uma fórmula □p é V em w0; é possível que p seja F em w0?",
      "options": [
        "Sim, se w0 não acessa a si próprio e seus destinos satisfazem p.",
        "Não, □p sempre implica p em qualquer relação.",
        "Não, porque p nunca pode ser F no mundo inicial."
      ],
      "correct": 0,
      "why": "Sem reflexividade, necessidade em destinos não força valor atual.",
      "dimension": "application",
      "objective": "Aplicação semântica em modelo concreto"
    }
  ],
  "temporal": [
    {
      "question": "Na convenção inclusiva usada na aula, Fp pode valer quando p vale somente agora?",
      "options": [
        "Sim, o instante atual está entre os considerados.",
        "Não, F exige algum instante estritamente posterior.",
        "Não, F significa para sempre."
      ],
      "correct": 0,
      "why": "F percorre instantes desde o atual, inclusive, no modelo especificado.",
      "dimension": "concept",
      "objective": "Interpretação do sistema formal"
    },
    {
      "question": "Por que Xp é falsa no último instante do traço didático?",
      "options": [
        "Porque adotamos a semântica forte de próximo estado inexistente.",
        "Porque p não pode valer no último instante.",
        "Porque X significa negação."
      ],
      "correct": 0,
      "why": "O modelo finito foi definido sem próximo estado; convenções alternativas devem ser declaradas.",
      "dimension": "concept",
      "objective": "Interpretação do sistema formal"
    },
    {
      "question": "A condição p U q difere de Gp porque:",
      "options": [
        "Exige uma ocorrência de q e p até antes dela.",
        "Não precisa que q ocorra em nenhum instante.",
        "Só avalia p no passado."
      ],
      "correct": 0,
      "why": "O até que forte demanda uma testemunha de q; Gp exige persistência de p.",
      "dimension": "concept",
      "objective": "Interpretação do sistema formal"
    },
    {
      "question": "Traço t0:p F, t1:p F, t2:p V. Qual valor de Fp em t0?",
      "options": [
        "V, pois há testemunha futura em t2.",
        "F, porque p é falsa em t0.",
        "F, porque F exige todos os instantes verdadeiros."
      ],
      "correct": 0,
      "why": "A eventualidade é satisfeita por pelo menos um instante a partir de t0.",
      "dimension": "application",
      "objective": "Aplicação semântica em modelo concreto"
    },
    {
      "question": "Traço t0:p V, t1:p V, t2:p F. Qual valor de Gp em t0?",
      "options": [
        "F, pois p falha em t2.",
        "V, porque p é verdadeira agora.",
        "V, porque basta uma testemunha inicial."
      ],
      "correct": 0,
      "why": "Uma ocorrência futura falsa refuta a exigência temporal universal.",
      "dimension": "application",
      "objective": "Aplicação semântica em modelo concreto"
    },
    {
      "question": "Em t1 de um traço que termina em t2, Xp consulta:",
      "options": [
        "O valor de p em t2.",
        "O valor de p em t0.",
        "Todos os mundos acessíveis."
      ],
      "correct": 0,
      "why": "X percorre exatamente um instante adiante, não todo o horizonte.",
      "dimension": "application",
      "objective": "Aplicação semântica em modelo concreto"
    },
    {
      "question": "A condição trabalho U entrega vale quando entrega ocorre em t2 e trabalho vale em t0 e t1?",
      "options": [
        "Sim, pela semântica forte de até que.",
        "Não, trabalho também deve valer depois de t2.",
        "Não, U significa disjunção clássica instantânea."
      ],
      "correct": 0,
      "why": "A testemunha em t2 encerra o intervalo em que trabalho é exigido.",
      "dimension": "application",
      "objective": "Aplicação semântica em modelo concreto"
    },
    {
      "question": "Se q nunca aparece, p U q em um traço finito:",
      "options": [
        "É falsa mesmo que p permaneça verdadeira.",
        "É verdadeira pois p permanece.",
        "Equivale a Xq."
      ],
      "correct": 0,
      "why": "A obrigação de ocorrência do lado direito não foi satisfeita.",
      "dimension": "application",
      "objective": "Aplicação semântica em modelo concreto"
    }
  ],
  "epistemica": [
    {
      "question": "Em modelos de conhecimento factivo, a acessibilidade deve incluir:",
      "options": [
        "O próprio mundo atual como possibilidade informacional.",
        "Somente futuros acontecimentos.",
        "Apenas mundos em que tudo é falso."
      ],
      "correct": 0,
      "why": "O mundo real não pode ficar excluído das alternativas compatíveis com conhecimento.",
      "dimension": "concept",
      "objective": "Interpretação do sistema formal"
    },
    {
      "question": "Qual inferência é incorreta na lógica epistêmica?",
      "options": [
        "De ¬Kₐp concluir automaticamente Kₐ¬p.",
        "De Kₐp concluir p em quadros factivos.",
        "De uma alternativa ¬p concluir que Ana não sabe p."
      ],
      "correct": 0,
      "why": "Ignorância de p não equivale a conhecimento da negação.",
      "dimension": "concept",
      "objective": "Interpretação do sistema formal"
    },
    {
      "question": "KₐKᵦp envolve:",
      "options": [
        "Relações de acessibilidade de Ana e de Bruno, aplicadas sucessivamente.",
        "Uma única contagem temporal de segundos.",
        "Um grau de pertinência à classe de pessoas."
      ],
      "correct": 0,
      "why": "A modalidade interna deve ser verificada em cada alternativa considerada por Ana.",
      "dimension": "concept",
      "objective": "Interpretação do sistema formal"
    },
    {
      "question": "p vale no mundo real; Ana admite p e ¬p como alternativas. Kₐp:",
      "options": [
        "É F, apesar de p ser factual.",
        "É V apenas porque p é factual.",
        "Implica que Ana conhece ¬p."
      ],
      "correct": 0,
      "why": "A alternativa ¬p impede que Ana tenha conhecimento de p.",
      "dimension": "application",
      "objective": "Aplicação semântica em modelo concreto"
    },
    {
      "question": "Bruno sabe p, Ana admite cenários em que Bruno sabe e não sabe p. KₐKᵦp:",
      "options": [
        "É F no mundo de Ana.",
        "É V porque Bruno sabe p no mundo real.",
        "É V sempre que Ana sabe q."
      ],
      "correct": 0,
      "why": "O conhecimento de Ana sobre o conhecimento alheio requer universalidade informacional.",
      "dimension": "application",
      "objective": "Aplicação semântica em modelo concreto"
    },
    {
      "question": "Ana viu a senha correta, e seus mundos compatíveis preservam essa senha. Isso apoia:",
      "options": [
        "Kₐp para a proposição sobre a senha.",
        "P p como norma.",
        "Fp como previsão futura."
      ],
      "correct": 0,
      "why": "A informação elimina alternativas com a senha incorreta.",
      "dimension": "application",
      "objective": "Aplicação semântica em modelo concreto"
    },
    {
      "question": "Ana não sabe se a porta está aberta. O que NÃO podemos afirmar só por isso?",
      "options": [
        "Que ela sabe que a porta está fechada.",
        "Que ela pode ter alternativas sobre a porta.",
        "Que ela carece de conhecimento da abertura."
      ],
      "correct": 0,
      "why": "Não saber a abertura não estabelece conhecimento do fechamento.",
      "dimension": "application",
      "objective": "Aplicação semântica em modelo concreto"
    },
    {
      "question": "Duas pessoas dispõem de evidências distintas sobre p. Uma interpretação adequada:",
      "options": [
        "Pode atribuir Kₐp V e Kᵦp F.",
        "Exige estados epistêmicos sempre idênticos.",
        "Transforma p numa contradição."
      ],
      "correct": 0,
      "why": "As relações de acessibilidade podem diferir entre agentes.",
      "dimension": "application",
      "objective": "Aplicação semântica em modelo concreto"
    }
  ],
  "deontica": [
    {
      "question": "Em lógica deôntica, O p e p são:",
      "options": [
        "Uma norma e uma descrição factual, que podem divergir.",
        "Duas fórmulas necessariamente equivalentes.",
        "A mesma regra de probabilidade."
      ],
      "correct": 0,
      "why": "Dever e ocorrência não são semanticamente o mesmo enunciado.",
      "dimension": "concept",
      "objective": "Interpretação do sistema formal"
    },
    {
      "question": "Na interpretação apresentada, P p deriva de:",
      "options": [
        "Existir um mundo ideal com p.",
        "p ocorrer no mundo factual.",
        "p ser necessária em todos os mundos atuais."
      ],
      "correct": 0,
      "why": "Permissão fraca é existência de uma alternativa normativamente ideal.",
      "dimension": "concept",
      "objective": "Interpretação do sistema formal"
    },
    {
      "question": "O¬p significa, no sistema padrão:",
      "options": [
        "É proibido realizar p.",
        "É permitido realizar p.",
        "p ocorreu no instante anterior."
      ],
      "correct": 0,
      "why": "Proibição corresponde à obrigação de abster-se da ação.",
      "dimension": "concept",
      "objective": "Interpretação do sistema formal"
    },
    {
      "question": "É obrigatório usar crachá, mas Maria não usa. Qual avaliação é correta?",
      "options": [
        "O dever pode permanecer válido apesar da violação.",
        "A violação torna o dever logicamente falso.",
        "O fato prova que crachá é opcional."
      ],
      "correct": 0,
      "why": "Normas não se reduzem à descrição factual de cumprimento.",
      "dimension": "application",
      "objective": "Aplicação semântica em modelo concreto"
    },
    {
      "question": "Em um mundo ideal há música e noutro não; há pelo menos um mundo ideal com música. Então:",
      "options": [
        "P(música) é V, mas O(música) pode ser F.",
        "O(música) é necessariamente V.",
        "A música ocorre obrigatoriamente agora."
      ],
      "correct": 0,
      "why": "Permissão requer uma alternativa; obrigação exige todas.",
      "dimension": "application",
      "objective": "Aplicação semântica em modelo concreto"
    },
    {
      "question": "Em todos os mundos ideais silêncio vale. Qual fórmula vale?",
      "options": [
        "O(silêncio).",
        "¬P(silêncio).",
        "F(silêncio), obrigatoriamente."
      ],
      "correct": 0,
      "why": "A obrigação é universal sobre os mundos ideais acessíveis.",
      "dimension": "application",
      "objective": "Aplicação semântica em modelo concreto"
    },
    {
      "question": "Uma norma proíbe estacionar, mas alguns estacionam. A conclusão sobre a norma:",
      "options": [
        "A proibição pode persistir apesar das infrações.",
        "A infração revoga necessariamente a regra.",
        "A proibição prova ausência de carros estacionados."
      ],
      "correct": 0,
      "why": "Distinga força normativa da conduta observada.",
      "dimension": "application",
      "objective": "Aplicação semântica em modelo concreto"
    },
    {
      "question": "Por que o laboratório inclui ao menos um mundo ideal?",
      "options": [
        "Para evitar obrigação universal verdadeira só por domínio normativo vazio.",
        "Para garantir que ninguém viole normas.",
        "Para transformar permissões em deveres."
      ],
      "correct": 0,
      "why": "O domínio vazio produz vacuidade indesejada na apresentação introdutória.",
      "dimension": "application",
      "objective": "Aplicação semântica em modelo concreto"
    }
  ],
  "difusa": [
    {
      "question": "Grau de pertinência 0,4 deve ser lido como:",
      "options": [
        "Satisfação gradual de uma propriedade na função escolhida.",
        "Obrigatoriamente probabilidade de 40%.",
        "Quatro observações em dez."
      ],
      "correct": 0,
      "why": "Um grau de pertinência não precisa medir chance nem frequência.",
      "dimension": "concept",
      "objective": "Interpretação do sistema formal"
    },
    {
      "question": "Qual operação é a conjunção na convenção Zadeh apresentada?",
      "options": [
        "O mínimo entre os graus.",
        "A soma ilimitada dos graus.",
        "O produto obrigatório em todos os sistemas."
      ],
      "correct": 0,
      "why": "As operações devem ser especificadas; aqui conjunção é min.",
      "dimension": "concept",
      "objective": "Interpretação do sistema formal"
    },
    {
      "question": "A negação fuzzy usada no laboratório é:",
      "options": [
        "1−x.",
        "x+1.",
        "x² em qualquer lógica difusa."
      ],
      "correct": 0,
      "why": "Na convenção escolhida, negação toma o complemento de 1.",
      "dimension": "concept",
      "objective": "Interpretação do sistema formal"
    },
    {
      "question": "Se p=0,3 e q=0,8, quanto vale p∨q usando max?",
      "options": [
        "0,8.",
        "0,3.",
        "1,1."
      ],
      "correct": 0,
      "why": "A disjunção max seleciona o maior grau.",
      "dimension": "application",
      "objective": "Aplicação semântica em modelo concreto"
    },
    {
      "question": "Se p=0,3 e q=0,8, quanto vale p∧q usando min?",
      "options": [
        "0,3.",
        "0,8.",
        "0,24."
      ],
      "correct": 0,
      "why": "A regra min retorna a menor pertinência.",
      "dimension": "application",
      "objective": "Aplicação semântica em modelo concreto"
    },
    {
      "question": "Se quente=0,65, a negação de quente na convenção 1−x é:",
      "options": [
        "0,35.",
        "0,65.",
        "1,65."
      ],
      "correct": 0,
      "why": "A negação difusa é calculada por complemento em relação a 1.",
      "dimension": "application",
      "objective": "Aplicação semântica em modelo concreto"
    },
    {
      "question": "Um sensor fornece 0,9 de pertinência a “muito úmido”. Podemos afirmar 90% de chance de chover?",
      "options": [
        "Não, essa probabilidade exigiria outro modelo e dados próprios.",
        "Sim, toda pertinência é uma chance meteorológica.",
        "Sim, todo grau é uma porcentagem de frequência."
      ],
      "correct": 0,
      "why": "A semântica fuzzy expressa propriedade gradual, não probabilidade automaticamente.",
      "dimension": "application",
      "objective": "Aplicação semântica em modelo concreto"
    },
    {
      "question": "Um pesquisador substitui min pela multiplicação e mantém os mesmos valores. O que acontece?",
      "options": [
        "O resultado pode mudar porque mudou a operação adotada.",
        "As operações são sempre numericamente iguais.",
        "A lógica fuzzy deixa de possuir números."
      ],
      "correct": 0,
      "why": "Diferentes t-normas produzem cálculos distintos e requerem explicitação.",
      "dimension": "application",
      "objective": "Aplicação semântica em modelo concreto"
    }
  ],
  "paraconsistente": [
    {
      "question": "Qual é a motivação de uma lógica paraconsistente?",
      "options": [
        "Evitar que uma contradição autorize qualquer conclusão.",
        "Permitir deduzir tudo de todas as premissas.",
        "Eliminar toda necessidade de verificar evidências."
      ],
      "correct": 0,
      "why": "Paraconsistência impede a trivialização por explosão.",
      "dimension": "concept",
      "objective": "Interpretação do sistema formal"
    },
    {
      "question": "O estado N em FDE indica:",
      "options": [
        "Nenhum suporte positivo ou negativo.",
        "Suporte simultâneo positivo e negativo.",
        "Verdade clássica absoluta."
      ],
      "correct": 0,
      "why": "Falta de informação não se confunde com conflito de informação.",
      "dimension": "concept",
      "objective": "Interpretação do sistema formal"
    },
    {
      "question": "O estado B em FDE indica:",
      "options": [
        "Ambos os suportes, a favor e contra.",
        "Verdade aproximada de 50%.",
        "Inexistência de testemunhas."
      ],
      "correct": 0,
      "why": "Informações positivas e negativas podem coexistir para uma proposição.",
      "dimension": "concept",
      "objective": "Interpretação do sistema formal"
    },
    {
      "question": "Qual é a negação de B em FDE?",
      "options": [
        "B.",
        "T.",
        "N."
      ],
      "correct": 0,
      "why": "Trocar dois suportes presentes mantém ambos presentes.",
      "dimension": "application",
      "objective": "Aplicação semântica em modelo concreto"
    },
    {
      "question": "Qual é a negação de T em FDE?",
      "options": [
        "F.",
        "B.",
        "T."
      ],
      "correct": 0,
      "why": "Trocar suporte positivo e negativo transforma verdadeiro-apenas em falso-apenas.",
      "dimension": "application",
      "objective": "Aplicação semântica em modelo concreto"
    },
    {
      "question": "Uma base contém p e ¬p com suporte, mas q carece de suporte. Podemos concluir q?",
      "options": [
        "Não, uma contradição não fornece suporte para qualquer q.",
        "Sim, sempre por explosão clássica.",
        "Sim, porque q recebe automaticamente B."
      ],
      "correct": 0,
      "why": "A consequência FDE preserva suporte designado e admite contraexemplo.",
      "dimension": "application",
      "objective": "Aplicação semântica em modelo concreto"
    },
    {
      "question": "Uma fonte diz “enviado” e outra diz “não enviado”. Qual estado para enviado?",
      "options": [
        "B.",
        "N.",
        "T necessariamente."
      ],
      "correct": 0,
      "why": "Suportes opostos tornam a informação conflitante, não ausente.",
      "dimension": "application",
      "objective": "Aplicação semântica em modelo concreto"
    },
    {
      "question": "Nenhuma fonte se pronunciou sobre a bateria. Que estado é adequado?",
      "options": [
        "N.",
        "B.",
        "F necessariamente."
      ],
      "correct": 0,
      "why": "Ausência de informações favoráveis e contrárias corresponde a N.",
      "dimension": "application",
      "objective": "Aplicação semântica em modelo concreto"
    }
  ],
  "intuicionista": [
    {
      "question": "O princípio p∨¬p é:",
      "options": [
        "Não universalmente derivável na lógica intuicionista.",
        "Teorema válido em todos os modelos intuicionistas.",
        "Um operador de probabilidade."
      ],
      "correct": 0,
      "why": "O terceiro excluído clássico não é assumido como prova geral intuicionista.",
      "dimension": "concept",
      "objective": "Interpretação do sistema formal"
    },
    {
      "question": "Na semântica de Kripke intuicionista, o forçamento atômico é:",
      "options": [
        "Monótono entre mundos e suas extensões.",
        "Sempre perdido em extensões.",
        "Uma probabilidade contínua."
      ],
      "correct": 0,
      "why": "Informações provadas persistem em estados que as estendem.",
      "dimension": "concept",
      "objective": "Interpretação do sistema formal"
    },
    {
      "question": "Para forçar p∨q, um mundo deve:",
      "options": [
        "Forçar p ou forçar q.",
        "Apenas não forçar ¬p.",
        "Mostrar uma chance maior que 50%."
      ],
      "correct": 0,
      "why": "A disjunção construtiva requer um lado estabelecido.",
      "dimension": "concept",
      "objective": "Interpretação do sistema formal"
    },
    {
      "question": "Em w0 sem prova de p, mas com extensão w1 onde p é provada, ¬p em w0:",
      "options": [
        "Não é forçada.",
        "É forçada pela ausência atual de prova.",
        "É sempre equivalente a p."
      ],
      "correct": 0,
      "why": "A extensão que força p impede a negação em w0.",
      "dimension": "application",
      "objective": "Aplicação semântica em modelo concreto"
    },
    {
      "question": "Um mundo não força p e nem ¬p. O que isso mostra sobre p∨¬p?",
      "options": [
        "Que a disjunção pode não ser forçada nesse mundo.",
        "Que a disjunção é sempre forçada.",
        "Que p é probabilisticamente metade verdadeira."
      ],
      "correct": 0,
      "why": "Disjunção intuicionista exige um dos lados forçado no mundo considerado.",
      "dimension": "application",
      "objective": "Aplicação semântica em modelo concreto"
    },
    {
      "question": "Uma prova de p→q deve fornecer:",
      "options": [
        "Construção que transforme uma prova de p em prova de q.",
        "Uma lista aleatória de mundos.",
        "Apenas uma frequência de q."
      ],
      "correct": 0,
      "why": "Implicação construtiva exige transformação de testemunhas de prova.",
      "dimension": "application",
      "objective": "Aplicação semântica em modelo concreto"
    },
    {
      "question": "¬p é uma abreviação construtiva de:",
      "options": [
        "p→⊥.",
        "p∨p.",
        "Fp no tempo."
      ],
      "correct": 0,
      "why": "Negar significa derivar contradição ao supor a proposição.",
      "dimension": "application",
      "objective": "Aplicação semântica em modelo concreto"
    },
    {
      "question": "Uma extensão w1 preserva p provada em w0. Isso exemplifica:",
      "options": [
        "Persistência do forçamento.",
        "Esquecimento obrigatório de premissas.",
        "Explosão clássica de p e ¬p."
      ],
      "correct": 0,
      "why": "O aumento de informação mantém proposições atômicas já estabelecidas.",
      "dimension": "application",
      "objective": "Aplicação semântica em modelo concreto"
    }
  ]
};
