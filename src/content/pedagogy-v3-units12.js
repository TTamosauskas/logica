import {buildBridgeLessons} from './pedagogy-v3-builder.js';
export const PEDAGOGY_BRIDGES_I_II=buildBridgeLessons([
  [
    "operadores",
    [
      "Defina o que p e q afirmam antes de calcular.",
      "Identifique o conectivo principal: E, OU, SE...ENTÃO ou equivalência.",
      "Substitua os valores V/F e explique a regra aplicada."
    ],
    [
      [
        "Se Ana estudou e Bruno trabalhou, qual conectivo exige que os dois fatos ocorram?",
        "Conjunção ∧.",
        "Disjunção ∨.",
        "Condicional →.",
        "Procure a palavra 'e' e observe se ambas as condições são exigidas.",
        "A conjunção só vale quando ambas as partes são verdadeiras.",
        "OU admite apenas uma das partes; não exige as duas.",
        "Uma condicional descreve um compromisso, e não a soma de dois fatos."
      ],
      [
        "Se p=F e q=V, quanto vale p∨q?",
        "Verdadeiro: q já satisfaz o OU inclusivo.",
        "Falso: p é falsa.",
        "Verdadeiro apenas se p também for verdadeira.",
        "No OU inclusivo, basta ao menos uma parcela V.",
        "Com p=F e q=V, a disjunção é V porque a segunda parcela é verdadeira.",
        "A primeira parcela falsa não obriga a disjunção a ser falsa.",
        "Exigir duas parcelas V é a regra de E, não do OU inclusivo."
      ],
      [
        "O ônibus atrasou (V), mas o passageiro chegou cedo (F). A frase 'o ônibus atrasou e o passageiro chegou cedo' é:",
        "Falsa, pois a segunda afirmação não ocorreu.",
        "Verdadeira porque a primeira ocorreu.",
        "Verdadeira porque o E admite qualquer uma das partes.",
        "Transforme cada trecho em um valor antes de combinar com E.",
        "O cenário dá V∧F, que é falso porque a conjunção exige duas partes verdadeiras.",
        "Uma parte verdadeira não basta para tornar uma conjunção verdadeira.",
        "Essa é a regra do OU inclusivo; a frase do problema usa E."
      ]
    ]
  ],
  [
    "condicionais_naturais",
    [
      "Identifique o fato apresentado como condição e o resultado.",
      "Diferencie 'se' (suficiência) de 'somente se' (necessidade).",
      "Leia a seta e teste um caso que a regra não promete."
    ],
    [
      [
        "'O clube funciona somente se houver monitor.' O monitor é:",
        "Uma condição necessária para o clube funcionar.",
        "Uma garantia de que o clube funcionará.",
        "Uma consequência impossível do funcionamento.",
        "'Somente se' marca aquilo que não pode faltar quando o fato ocorre.",
        "Haver monitor é necessário, mas não basta para assegurar a atividade.",
        "Necessário não significa suficiente; outras condições podem falhar.",
        "O enunciado exige monitor quando o clube funciona; não o proíbe."
      ],
      [
        "Em 'p se q', qual é a direção da seta?",
        "q→p.",
        "p→q.",
        "p↔q.",
        "Comece pelo trecho introduzido por 'se': ele é a condição.",
        "'p se q' diz 'se q, então p', portanto q é o antecedente.",
        "Essa direção corresponde a 'p somente se q', outra frase.",
        "O bicondicional acrescentaria a volta p→q, não afirmada."
      ],
      [
        "'Recebo um aviso se houver mudança de horário.' Se não recebi aviso, qual conclusão segue da regra, supondo que ela vale?",
        "Não houve mudança de horário.",
        "Houve mudança de horário.",
        "Não é possível concluir nada sobre a mudança.",
        "Modele mudança→aviso e use a ausência do resultado.",
        "De mudança→aviso e ¬aviso, segue ¬mudança por modus tollens.",
        "Isso contradiz a condição: mudança exigiria que o aviso tivesse chegado.",
        "A ausência do consequente elimina o antecedente na condicional assumida."
      ]
    ]
  ],
  [
    "condicionais_excecao",
    [
      "Localize a situação excepcional mencionada.",
      "Formule o que se garante quando a exceção NÃO ocorre.",
      "Não invente uma proibição quando a exceção ocorre."
    ],
    [
      [
        "'Haverá aula, a menos que falte energia.' O que é garantido quando NÃO falta energia?",
        "Haverá aula.",
        "A aula necessariamente será cancelada.",
        "A frase não faz nenhuma promessa.",
        "Leia 'a menos que' como um compromisso no caso normal.",
        "Sem a exceção, a regra garante a ocorrência da aula.",
        "Cancelar sem falta de energia descumpriria o compromisso descrito.",
        "É precisamente sem a exceção que a frase fornece uma garantia."
      ],
      [
        "Com p='haverá aula' e q='falta energia', qual é a forma mínima?",
        "¬q→p.",
        "q→¬p.",
        "p→¬q.",
        "O antecedente é a ausência da exceção, não a exceção.",
        "A forma ¬q→p traduz a garantia de aula no caso sem falta de energia.",
        "Essa opção afirma cancelamento obrigatório quando falta energia, o que não foi dito.",
        "Essa opção proíbe aula com falta de energia, restrição não afirmada."
      ],
      [
        "'A entrega ocorre, a menos que haja greve.' Houve greve e a entrega ocorreu. A regra foi violada?",
        "Não; com greve o enunciado não determina a entrega.",
        "Sim; a greve obriga que a entrega falhe.",
        "Sim; a entrega prova que não houve greve.",
        "Pergunte se a frase prometia algo quando a exceção estivesse presente.",
        "A ocorrência da exceção suspende a garantia, mas não proíbe a entrega.",
        "A expressão não diz que a greve impossibilita toda entrega.",
        "Não podemos inferir a ausência de greve só porque o pacote chegou."
      ]
    ]
  ],
  [
    "falacias",
    [
      "Separe premissas de conclusão, sem julgar plausibilidade.",
      "Procure uma situação que mantenha as premissas e negue a conclusão.",
      "Nomeie o erro apenas depois de localizar a falha da inferência."
    ],
    [
      [
        "'Se chove, a rua molha; a rua molhou; logo choveu.' Qual informação falta?",
        "A rua pode ter sido molhada por outra causa.",
        "É impossível que a rua esteja molhada.",
        "A conclusão é válida porque a rua molhou.",
        "Pense em um cenário sem chuva, mas com rua molhada.",
        "O consequente pode ocorrer por outras causas; isso caracteriza a afirmação do consequente.",
        "Uma rua molhada é compatível com chuva e com causas alternativas.",
        "A segunda premissa não garante o antecedente da condicional."
      ],
      [
        "Para testar p→q; q; portanto p, qual linha usar?",
        "p=F, q=V.",
        "p=V, q=V.",
        "p=V, q=F.",
        "Busque premissas verdadeiras e conclusão falsa.",
        "F→V é verdadeiro, q é verdadeiro e p é falso: contraexemplo.",
        "Nessa linha a conclusão p é verdadeira; não refuta a inferência.",
        "Com V→F a primeira premissa é falsa; não serve de contraexemplo."
      ],
      [
        "'Se tenho ingresso, entro no evento. Entrei, portanto tenho ingresso.' O argumento é necessariamente válido?",
        "Não; posso entrar por outro tipo de autorização.",
        "Sim; a entrada sempre prova o ingresso.",
        "Não; toda condicional é falsa quando o ingresso falta.",
        "Mantenha a regra verdadeira e imagine uma entrada sem ingresso.",
        "A entrada pode ter outra condição suficiente; concluir ingresso afirma o consequente.",
        "O texto não exclui autorizações alternativas à apresentação do ingresso.",
        "Com ingresso ausente, a condicional material não se torna falsa automaticamente."
      ]
    ]
  ],
  [
    "pressupostos",
    [
      "Escreva primeiro o dado efetivamente observado.",
      "Identifique a hipótese oculta exigida pela conclusão.",
      "Teste uma explicação alternativa compatível com a observação."
    ],
    [
      [
        "'As notas subiram depois da troca de horário.' O que sabemos sem informações extras?",
        "A subida ocorreu depois da mudança.",
        "A mudança causou a subida.",
        "As provas ficaram mais fáceis.",
        "Separe ordem temporal de explicação causal.",
        "A sequência de eventos foi observada; a causa não foi estabelecida.",
        "Uma sucessão temporal não demonstra que um evento causou o outro.",
        "Essa é uma hipótese concorrente possível, ainda não um fato conhecido."
      ],
      [
        "Para defender que um horário novo aumentou as notas, qual pressuposto deve ser examinado?",
        "Não houve outra mudança relevante nas provas e nas turmas.",
        "Todos os alunos gostaram do horário.",
        "As notas subiriam necessariamente em qualquer escola.",
        "Pergunte o que mais poderia explicar a diferença antes e depois.",
        "Mudanças nas provas ou no perfil das turmas podem confundir a atribuição causal.",
        "Preferência pelo horário não exclui alterações que afetem as notas.",
        "Uma observação local não garante o mesmo resultado em todos os contextos."
      ],
      [
        "Uma loja vendeu mais após pintar a fachada. Também começou uma campanha digital. Qual conclusão é mais responsável?",
        "Ainda não é possível isolar o efeito da pintura.",
        "A pintura foi certamente a única causa.",
        "A campanha digital certamente não teve efeito.",
        "Liste intervenções simultâneas e procure comparação adequada.",
        "Duas mudanças ocorreram juntas; é preciso controlar explicações concorrentes.",
        "A campanha é uma variável alternativa capaz de explicar as vendas.",
        "Não há dados para descartar o possível efeito da campanha."
      ]
    ]
  ],
  [
    "compostas",
    [
      "Liste os valores atribuídos a cada letra.",
      "Resolva subfórmulas internas antes do conectivo principal.",
      "Combine os resultados intermediários e justifique o valor final."
    ],
    [
      [
        "Na fórmula (p∨q)∧¬p, o que os parênteses indicam?",
        "Calcular p∨q como uma parte antes de combinar com ¬p.",
        "Ignorar q ao calcular o resultado.",
        "Calcular apenas a última letra da expressão.",
        "Identifique os dois lados unidos pelo E principal.",
        "Os parênteses preservam a subfórmula p∨q para o cálculo intermediário.",
        "A letra q participa da disjunção e não pode ser descartada.",
        "A fórmula contém mais operações que uma variável isolada."
      ],
      [
        "Se p=F e q=V, qual par de valores obtemos para p∨q e ¬p?",
        "V e V.",
        "F e V.",
        "V e F.",
        "Calcule primeiro a disjunção; depois inverta o valor de p.",
        "Com F∨V temos V; como p é F, a negação ¬p vale V.",
        "O OU inclusivo é verdadeiro quando q é V.",
        "Negar p=F produz V, e não F."
      ],
      [
        "Com sensor ativo p=V e porta aberta q=F, quanto vale (p∨q)∧¬p?",
        "F, porque ¬p é falsa.",
        "V, porque p∨q é verdadeira.",
        "V, porque a porta está fechada.",
        "A expressão externa é um E entre p∨q e ¬p.",
        "Temos p∨q=V e ¬p=F; a conjunção V∧F é falsa.",
        "Uma metade verdadeira não basta para uma conjunção.",
        "O valor da porta entra pelo OU, mas o E depende também de ¬p."
      ]
    ]
  ],
  [
    "demorgan",
    [
      "Pergunte em que situação a frase inteira seria falsa.",
      "Negue as partes e troque E por OU ou OU por E.",
      "Confira se a nova frase permite exatamente os mesmos casos."
    ],
    [
      [
        "Negar 'trouxe livro E caderno' exige afirmar que:",
        "Faltou ao menos um dos dois itens.",
        "Os dois itens faltaram obrigatoriamente.",
        "Os dois itens foram trazidos.",
        "Para tornar um E falso, basta uma parcela falhar.",
        "A negação de uma conjunção é ¬p∨¬q; não exige que ambas as partes falhem.",
        "Exigir ausência de ambos é mais forte que negar o E.",
        "Trazer ambos torna a frase original verdadeira, não negada."
      ],
      [
        "Qual fórmula nega corretamente p∨q?",
        "¬p∧¬q.",
        "¬p∨¬q.",
        "p∧¬q.",
        "O OU inclusivo só é falso quando ambas as partes são falsas.",
        "A negação de p∨q exige ¬p E ¬q simultaneamente.",
        "Isso é a negação de p∧q, e não da disjunção.",
        "A alternativa mantém p verdadeira, o que tornaria p∨q verdadeira."
      ],
      [
        "'A loja aceita dinheiro ou cartão.' Para negar essa afirmação, o que se deve dizer?",
        "Não aceita dinheiro e não aceita cartão.",
        "Não aceita dinheiro ou não aceita cartão.",
        "Aceita dinheiro, mas não cartão.",
        "O OU é inclusivo: bastaria uma forma de pagamento para a frase original valer.",
        "A negação exige que as duas opções de pagamento falhem.",
        "Se um meio falhar, o outro ainda pode tornar a frase original verdadeira.",
        "Aceitar dinheiro torna verdadeira a disjunção original."
      ]
    ]
  ],
  [
    "classificacao",
    [
      "Defina V/F para cada proposição no modelo clássico.",
      "Verifique todas as linhas da fórmula sem pular casos.",
      "Classifique como sempre V, sempre F ou variável."
    ],
    [
      [
        "Uma fórmula que é V em todas as valorações clássicas é:",
        "Uma tautologia.",
        "Uma contradição.",
        "Uma contingência.",
        "Observe se alguma linha apresenta F.",
        "Tautologia é a classificação de fórmulas verdadeiras em todas as interpretações.",
        "Contradição é sempre F, o oposto do caso descrito.",
        "Contingência assume V em algumas linhas e F em outras."
      ],
      [
        "Se p=V, qual o valor de ¬(p∧¬p)?",
        "V, porque p∧¬p é F.",
        "F, porque p é V.",
        "F, porque ¬p aparece na fórmula.",
        "Avalie p∧¬p antes de aplicar a negação externa.",
        "Mesmo com p=V, a conjunção com ¬p é falsa; a negação da conjunção é V.",
        "A presença de p verdadeira não torna a conjunção com ¬p verdadeira.",
        "É necessário calcular todo o par p e ¬p, não olhar só para um símbolo."
      ],
      [
        "No controle de acesso, p='a porta está trancada'. A expressão p∨¬p vale:",
        "V em qualquer situação clássica considerada.",
        "V apenas se a porta estiver trancada.",
        "F quando não soubermos o estado da porta.",
        "O terceiro excluído não exige conhecimento do valor real.",
        "Se p é V, a primeira parte vale; se p é F, a segunda vale.",
        "Se p é F, ¬p é V; a disjunção não falha.",
        "Desconhecer a situação não cria um terceiro valor na semântica clássica."
      ]
    ]
  ],
  [
    "equiv_algebra",
    [
      "Localize os conectivos que ligam as parcelas.",
      "Diferencie trocar ordem (comutatividade) de reagrupar (associatividade).",
      "Confirme que a operação não foi alterada na transformação."
    ],
    [
      [
        "Em p∧q ≡ q∧p, qual propriedade está em uso?",
        "Comutatividade.",
        "Distributividade.",
        "Contraposição.",
        "Veja se apenas as posições das parcelas foram trocadas.",
        "A conjunção mantém seu conectivo, enquanto p e q trocam de lugar.",
        "Não há distribuição de um conectivo sobre outro.",
        "Contraposição envolve uma condicional e negações, não essa troca."
      ],
      [
        "Como reagrupar (p∨q)∨r mantendo o valor?",
        "p∨(q∨r).",
        "p∧(q∨r).",
        "(p∨q)∧r.",
        "A associatividade exige o mesmo conectivo em todas as partes.",
        "É permitido mudar os parênteses dentro de uma sequência de disjunções.",
        "Trocar um OU por E altera as condições de verdade.",
        "A operação externa também deve permanecer uma disjunção."
      ],
      [
        "Uma programação exige 'A e B'. Podemos reescrever 'B e A' sem mudar o requisito?",
        "Sim, para a conjunção clássica a ordem das parcelas não altera o valor.",
        "Não, porque a ordem sempre determina a verdade.",
        "Sim, porque toda condicional também permite inverter as letras.",
        "Mantenha o conectivo E e confira o caso em que somente A ocorre.",
        "A∧B e B∧A são equivalentes em toda valoração clássica.",
        "Ambas as formas requerem os dois fatos; a ordem não altera a regra.",
        "Não generalize comutatividade de E para a condicional →."
      ]
    ]
  ],
  [
    "equiv_distributividade",
    [
      "Encontre o termo comum fora dos parênteses.",
      "Repita o termo completo em cada ramo da distribuição.",
      "Compare um caso em que só um dos ramos internos vale."
    ],
    [
      [
        "Em p∧(q∨r), qual parcela deve aparecer nos dois ramos?",
        "p, a condição comum.",
        "Apenas r, a última letra.",
        "¬p, a negação da condição.",
        "O que estava fora dos parênteses acompanha cada alternativa.",
        "Distribuir significa repetir a condição p nas duas parcelas produzidas.",
        "Se p faltar num ramo, o resultado pode aceitar situações antes proibidas.",
        "Distribuir não exige negar a parcela externa."
      ],
      [
        "Qual é a forma distribuída correta de A∧(B∨C)?",
        "(A∧B)∨(A∧C).",
        "(A∧B)∨C.",
        "A∨(B∧C).",
        "Confirme a presença de A junto tanto a B quanto a C.",
        "A conjunção externa distribui para os dois ramos da disjunção.",
        "O segundo ramo perde A e torna-se menos restrito.",
        "Essa troca de conectivos não é uma aplicação de distributividade."
      ],
      [
        "Uma oferta vale quando há cupom E (pagamento por Pix OU cartão). Qual leitura é equivalente?",
        "Cupom com Pix OU cupom com cartão.",
        "Cupom com Pix OU apenas cartão.",
        "Cupom OU Pix e cartão juntos.",
        "O cupom é uma exigência comum a cada modalidade de pagamento.",
        "Cada alternativa deve conservar a exigência do cupom, pois ela está fora do OU.",
        "Essa opção libera cartão sem cupom, alterando a condição original.",
        "A condição comum não pode se transformar numa alternativa opcional."
      ]
    ]
  ],
  [
    "equiv_absorcao",
    [
      "Localize a parcela repetida dentro e fora dos parênteses.",
      "Identifique a forma A∨(A∧B) ou A∧(A∨B).",
      "Teste os casos A=V e A=F antes de simplificar."
    ],
    [
      [
        "A expressão p∨(p∧q) é equivalente a:",
        "p.",
        "q.",
        "p∧q.",
        "Quando p já é V, o OU está satisfeito; quando é F, o segundo termo também falha.",
        "A parcela p absorve p∧q porque a expressão inteira acompanha o valor de p.",
        "q não decide sozinho o resultado quando p é falsa.",
        "A conjunção exige q adicional e é mais restritiva que a expressão original."
      ],
      [
        "Qual é a simplificação correta de p∧(p∨r)?",
        "p.",
        "p∨r.",
        "r.",
        "Uma conjunção com p é falsa se p falha, independentemente de r.",
        "Se p é V, p∨r é V; se p é F, a conjunção é F, logo o resultado é p.",
        "A disjunção poderia ser V por r mesmo quando p é F.",
        "A variável r não basta para garantir o p exigido fora dos parênteses."
      ],
      [
        "'Tenho autorização OU (tenho autorização E acompanhamento).' Qual requisito de fato basta?",
        "Ter autorização.",
        "Ter acompanhamento.",
        "Ter autorização e acompanhamento sempre.",
        "A primeira alternativa já aceita todos os casos com autorização.",
        "A condição acompanhada é um subconjunto dos casos de autorização; por absorção basta autorização.",
        "Acompanhamento sozinho não satisfaz nenhum dos dois ramos.",
        "A opção simples autoriza casos sem acompanhamento; não podemos acrescentar essa exigência."
      ]
    ]
  ],
  [
    "equiv_condicionais",
    [
      "Escreva a condicional original p→q.",
      "Negue e inverta as duas partes para formar a contrapositiva.",
      "Não confunda contraposição com simples inversão q→p."
    ],
    [
      [
        "Qual fórmula é contrapositiva de p→q?",
        "¬q→¬p.",
        "q→p.",
        "¬p→¬q.",
        "Inverta a ordem e negue antecedente e consequente.",
        "A contraposição preserva as valorações e é equivalente à condicional original.",
        "Isso é a recíproca, que não é equivalente em geral.",
        "Essa forma é a inversa; não é a contrapositiva da original."
      ],
      [
        "Se uma regra diz 'se é ave, tem penas', qual consequência equivalente ela fornece?",
        "Se não tem penas, então não é ave.",
        "Se tem penas, então é ave.",
        "Se não é ave, então não tem penas.",
        "A contrapositiva começa pela negação do consequente original.",
        "'Não tem penas' elimina a condição 'é ave' na regra fornecida.",
        "Ter penas pode ocorrer em outras situações; isso é recíproca.",
        "A ausência do antecedente não obriga ausência do consequente."
      ],
      [
        "'Se um cadastro foi validado, há protocolo.' Não há protocolo. O que segue?",
        "O cadastro não foi validado.",
        "O cadastro foi validado.",
        "Há protocolo, apesar da afirmação contrária.",
        "Aplique a contraposição ao resultado que está ausente.",
        "Da regra validação→protocolo e da ausência de protocolo segue ausência de validação.",
        "Essa hipótese violaria a condicional, pois validação exige protocolo.",
        "Não podemos contradizer o dado ¬protocolo para salvar a condicional."
      ]
    ]
  ],
  [
    "equiv_bicondicional",
    [
      "Identifique as duas direções de implicação necessárias.",
      "Escreva (p→q)∧(q→p) antes de reduzir.",
      "Confira se as duas proposições possuem o mesmo valor."
    ],
    [
      [
        "A expressão p↔q requer:",
        "p→q e q→p.",
        "Apenas p→q.",
        "Apenas p∨q.",
        "A seta dupla reúne duas obrigações condicionais.",
        "O bicondicional equivale à conjunção das condicionais nos dois sentidos.",
        "Uma direção sozinha não garante equivalência de valores.",
        "O OU inclusivo admite valores distintos e por isso não expressa bicondicional."
      ],
      [
        "Com p=V e q=F, quanto vale p↔q?",
        "F, porque os valores são diferentes.",
        "V, porque p é verdadeira.",
        "V, porque só um dos valores precisa ser V.",
        "A tabela do bicondicional compara igualdade entre os dois valores.",
        "Quando um valor é V e o outro F, o bicondicional clássico é falso.",
        "p verdadeira não garante a igualdade com q.",
        "Essa regra corresponde ao OU exclusivo, não à igualdade do bicondicional."
      ],
      [
        "'O sistema entra em modo seguro se, e somente se, o alerta estiver ligado.' O que a frase afirma?",
        "O modo seguro implica alerta, e alerta implica modo seguro.",
        "O alerta é necessário mas nunca suficiente.",
        "Basta que modo seguro ou alerta esteja ativo.",
        "Duas direções precisam valer; imagine um caso com apenas uma parte V.",
        "A afirmação compromete o sistema com as duas condicionais em conjunto.",
        "'Se e somente se' torna o alerta também suficiente, não apenas necessário.",
        "A disjunção admite que uma parte esteja V e a outra F; o bicondicional não."
      ]
    ]
  ],
  [
    "equiv_negacao_condicional",
    [
      "Traduza a promessa p→q.",
      "Pergunte qual caso descumpre a condição prometida.",
      "Expresse o descumprimento como p∧¬q."
    ],
    [
      [
        "O que é preciso para tornar 'se p, então q' falsa?",
        "p verdadeira e q falsa.",
        "p falsa e q verdadeira.",
        "p e q ambas falsas.",
        "Procure condição atendida e resultado descumprido.",
        "Uma condicional material falha somente na linha p=V, q=F.",
        "Quando p é F a condicional material é verdadeira.",
        "Com antecedente falso a promessa condicional não é desmentida."
      ],
      [
        "Qual é a forma equivalente a ¬(p→q)?",
        "p∧¬q.",
        "¬p→¬q.",
        "¬p∨q.",
        "Negar a condicional destaca o único caso em que ela falha.",
        "A negação exige que a condição ocorra e que a consequência não ocorra.",
        "Essa condicional é outra relação, não descreve o descumprimento de p→q.",
        "¬p∨q é a própria condicional p→q, e não sua negação."
      ],
      [
        "'Se o alarme disparar, a luz acende.' Em qual cenário a regra foi violada?",
        "O alarme disparou e a luz não acendeu.",
        "O alarme não disparou e a luz acendeu.",
        "O alarme não disparou e a luz não acendeu.",
        "Um compromisso 'se A, B' só falha quando A acontece sem B.",
        "Disparo sem luz é o contraexemplo p∧¬q à condicional.",
        "Sem disparo a regra não prometia nada sobre a luz.",
        "Com disparo ausente não se pode alegar descumprimento da regra."
      ]
    ]
  ],
  [
    "argumentos",
    [
      "Enumere cada premissa e a conclusão.",
      "Procure uma interpretação com todas as premissas V.",
      "Se nessa interpretação a conclusão é F, registre o contraexemplo."
    ],
    [
      [
        "O que torna um argumento inválido?",
        "Alguma situação com premissas verdadeiras e conclusão falsa.",
        "Uma conclusão que pareça surpreendente.",
        "Uma premissa falsa em algum caso possível.",
        "Validade é preservação necessária, não plausibilidade.",
        "Um contraexemplo às premissas V e conclusão F refuta a validade.",
        "A conclusão pode surpreender e ainda seguir necessariamente das premissas.",
        "Premissas podem ser falsas em algum cenário sem afetar a validade da forma."
      ],
      [
        "Em p→q; p; portanto q, pode existir p=V e q=F com ambas as premissas V?",
        "Não; a condicional seria F nessa linha.",
        "Sim; a conclusão pode falhar mesmo com p→q V.",
        "Sim; p→q sempre é V quando p é V.",
        "Teste diretamente a linha p=V, q=F na condicional.",
        "Com p=V e q=F, p→q é falsa; portanto não é um contraexemplo com premissas V.",
        "Não há como manter p→q verdadeira nessa combinação.",
        "Uma condicional com antecedente V e consequente F é falsa."
      ],
      [
        "'Todo ticket pago é confirmado. Este ticket foi pago. Logo, foi confirmado.' A inferência é:",
        "Válida, desde que as premissas sejam assumidas como dadas.",
        "Inválida porque tickets podem apresentar erros reais.",
        "Válida apenas se todos os tickets da empresa forem pagos.",
        "Distinga a relação lógica da possibilidade de fatos reais divergirem.",
        "A regra universal mais o fato particular sustentam a confirmação, independentemente da verificação factual.",
        "Falhas reais questionariam uma premissa, mas não o padrão de inferência.",
        "Não é necessário que todos os tickets estejam pagos; basta o do exemplo."
      ]
    ]
  ],
  [
    "arvores",
    [
      "Liste premissas e negação da conclusão na raiz.",
      "Divida as fórmulas conforme as regras do tableau.",
      "Um ramo aberto consistente é modelo; todos fechados indicam validade."
    ],
    [
      [
        "Para testar um argumento por árvore semântica, colocamos na raiz:",
        "Premissas e negação da conclusão.",
        "Apenas a conclusão original.",
        "Um conjunto de fórmulas escolhido ao acaso.",
        "O método procura uma situação que refute o argumento.",
        "Negar a conclusão junto às premissas procura exatamente um contraexemplo.",
        "Sem as premissas não é possível testar a preservação de verdade.",
        "Fórmulas sem relação com o argumento não testam sua validade."
      ],
      [
        "O ramo contém p e ¬p. Esse ramo deve ser:",
        "Fechado.",
        "Aberto e consistente.",
        "Considerado prova de p apenas.",
        "Duas fórmulas opostas no mesmo ramo não podem valer juntas classicamente.",
        "p e ¬p contradizem-se e tornam o ramo inviável.",
        "Um ramo aberto não pode conter contradição desse tipo.",
        "O fechamento trata da consistência do ramo, não prova p isoladamente."
      ],
      [
        "Para testar 'p∨q; ¬p; logo q', a árvore com ¬q termina como?",
        "Com todos os ramos fechados.",
        "Com um ramo aberto p=V, q=F.",
        "Com um ramo aberto p=F, q=F.",
        "Divida p∨q em p e q; confronte cada ramo com as negações.",
        "O ramo p contradiz ¬p; o ramo q contradiz ¬q. Não sobra contraexemplo.",
        "O ramo que contém p fecha pela premissa ¬p.",
        "Com p e q falsas, a premissa p∨q seria falsa; não fornece modelo."
      ]
    ]
  ]
]);
