/** Unidade VIII — Outras lógicas. 'modais' preserva o identificador histórico. */
export const OTHER_LOGIC_LESSONS={
  "modais": {
    "lead": "Em quais situações uma afirmação é necessária ou apenas possível?",
    "theory": "A afirmação “é possível que a biblioteca abra” não significa que ela já esteja aberta. Na semântica modal de Kripke, partimos de um mundo w e examinamos as alternativas alcançadas por uma relação R. ◇p é verdadeira em w quando existe pelo menos um mundo acessível no qual p vale. □p exige que p valha em todos eles. A palavra “necessário” não deve ser interpretada automaticamente como certeza psicológica ou como previsão do futuro. Ela significa universalidade relativamente às alternativas especificadas no modelo. O mesmo enunciado pode ter avaliação modal diferente quando muda a relação de acessibilidade.\n\nSuponha que w0 tenha acesso a w1 e w2, com p verdadeira no primeiro e falsa no segundo. Em w0, ◇p vale porque w1 é testemunha, mas □p falha porque w2 é contraexemplo. Também é verdadeira ◇¬p, já que w2 satisfaz a negação de p. A relação pode não ligar w0 a ele próprio. Numa estrutura com nenhuma saída a partir de w0, □p é verdadeira por vacuidade e ◇p é falsa. Para inferir □p → p em todos os mundos do modelo, uma condição suficiente é a reflexividade de R, como nos quadros do sistema T.\n\nEm □◇p, primeiro examinamos cada mundo acessível a w; depois exigimos que de cada um deles seja possível alcançar algum mundo onde p vale. Não basta encontrar uma única testemunha acessível diretamente ao mundo inicial. A composição dos operadores muda o caminho da avaliação. A prática correta começa destacando o mundo de origem, seguindo as setas e verificando a fórmula interna no destino apropriado. Esse método fornece justificativas ou contraexemplos verificáveis e prepara o estudo de modalidades de conhecimento e obrigação.",
    "example": "Do mundo w0 a biblioteca pode seguir dois cenários: w1, em que abre (p=V), e w2, em que não abre (p=F).",
    "steps": [
      "As setas partem de w0 para w1 e w2; ambos, e só eles, contam na verificação modal proposta.",
      "Como em w2 a biblioteca não abre, □p é falsa em w0.",
      "◇p é V pela alternativa w1; ◇¬p é V pela alternativa w2."
    ],
    "quiz": [
      {
        "question": "Qual é o papel das setas num modelo modal?",
        "options": [
          "Indicar quais mundos são considerados acessíveis.",
          "Ordenar obrigatoriamente instantes de tempo.",
          "Marcar graus contínuos de verdade."
        ],
        "correct": 0,
        "why": "A relação R seleciona destinos usados por □ e ◇."
      },
      {
        "question": "Se w não acessa nenhum mundo, na semântica normal de Kripke:",
        "options": [
          "□p é V e ◇p é F.",
          "□p e ◇p são F.",
          "□p e ◇p são V."
        ],
        "correct": 0,
        "why": "A quantificação universal vazia é verdadeira e não há testemunha para ◇p."
      },
      {
        "question": "□p implica p em todos os quadros de Kripke?",
        "options": [
          "Não; a reflexividade é uma condição suficiente para essa validade.",
          "Sim, sem qualquer condição.",
          "Somente quando p é uma fórmula temporal."
        ],
        "correct": 0,
        "why": "Sem acesso ao mundo atual, a necessidade não garante verdade nele."
      },
      {
        "question": "Para verificar □◇p em w0, é preciso:",
        "options": [
          "Em cada destino de w0, procurar um destino onde p seja verdadeira.",
          "Conferir p apenas em w0.",
          "Exigir que p seja falsa em todos os destinos."
        ],
        "correct": 0,
        "why": "O operador interno é avaliado separadamente em cada mundo alcançado."
      }
    ]
  },
  "temporal": {
    "lead": "Como representar o que acontecerá, permanecerá ou ocorrerá até outra condição?",
    "theory": "Na lógica temporal linear, avaliamos proposições em uma sequência t0, t1, t2 e assim por diante. Um alarme pode estar ligado agora, desligar depois e voltar a ligar. Não basta saber se “alarme ligado” é verdadeiro em algum lugar: precisamos saber em quais instantes e a partir de qual ponto começamos. Adotaremos uma semântica didática de traço finito: o instante atual está incluído na avaliação do futuro para F e G. Fp afirma que p vale em pelo menos um instante desde agora. Gp exige que p valha em todos os instantes de agora até o final do traço mostrado.\n\nXp afirma que p será verdadeira no próximo instante, não necessariamente agora. Quando estamos no último instante de um traço finito, convencionamos Xp como falsa, pois não existe um próximo estado representado. Outras semânticas podem usar convenções diferentes, que devem ser anunciadas. p U q, na interpretação forte de “até que”, exige encontrar um instante futuro em que q seja verdadeira e que p continue verdadeira em todos os instantes anteriores, a partir do ponto avaliado. Se q nunca acontece no traço, p U q é falsa mesmo que p permaneça sempre verdadeira.\n\n“O sistema ficará disponível em algum instante” corresponde a F(disponível). “A partir de agora permanecerá seguro” pede G(seguro). “Na próxima verificação haverá resposta” pede X(resposta). “O serviço permanecerá ativo até o backup terminar” pode ser expresso como ativo U backup. A semelhança entre F/G e ◇/□ não os torna sinônimos: os operadores temporais navegam uma ordem de instantes, enquanto operadores modais usam uma relação de acessibilidade entre mundos. Quando a aplicação exige caminhos ramificados, é preciso especificar outra lógica temporal.",
    "example": "Uma fila de backup tem quatro instantes: t0 e t1 com sistema ativo; em t2 o backup termina; em t3 o sistema desliga.",
    "steps": [
      "Examinamos t0 até t3, incluindo t0. Em t2, backup é verdadeiro pela primeira vez.",
      "F(backup) é verdadeira por causa de t2; G(ativo) é falsa porque em t3 o sistema está desligado.",
      "A condição ativo permanece em t0 e t1, antes de o backup terminar em t2; logo a fórmula é verdadeira."
    ],
    "quiz": [
      {
        "question": "Em traço finito, Fp no instante t0 exige:",
        "options": [
          "p verdadeira em algum instante a partir de t0.",
          "p verdadeira em todos os instantes.",
          "p verdadeira apenas no instante imediatamente seguinte."
        ],
        "correct": 0,
        "why": "F é eventualidade e inclui o instante corrente na convenção adotada."
      },
      {
        "question": "No último instante de um traço finito, Xp é:",
        "options": [
          "F na convenção usada pelo laboratório.",
          "V independentemente de p.",
          "Sempre igual ao valor atual de p."
        ],
        "correct": 0,
        "why": "Não existe próximo instante representado; adotamos o operador próximo forte."
      },
      {
        "question": "Gp é falsa quando:",
        "options": [
          "Há pelo menos um instante futuro considerado com p falsa.",
          "p é verdadeira no instante atual.",
          "F p é verdadeira."
        ],
        "correct": 0,
        "why": "Um contraexemplo basta para refutar a exigência de permanência."
      },
      {
        "question": "p U q é verdadeira quando:",
        "options": [
          "q ocorre e p vale em cada instante anterior desde o ponto inicial.",
          "p continua, mas q nunca ocorre.",
          "q era verdadeira apenas no passado excluído."
        ],
        "correct": 0,
        "why": "U forte exige ocorrência de q, mantendo p até esse ponto."
      }
    ]
  },
  "epistemica": {
    "lead": "Como distinguir o que é verdadeiro daquilo que um agente sabe?",
    "theory": "É possível que uma resposta esteja correta e, ainda assim, Ana não saiba que está correta. Na lógica epistêmica, Kₐp significa “Ana sabe que p”. Um modelo descreve os mundos que Ana não consegue distinguir a partir das informações de que dispõe. Ela sabe p quando p é verdadeira em todos esses mundos compatíveis. Para modelar conhecimento factivo, a relação inclui o mundo efetivo entre as alternativas do próprio agente. Assim, Kₐp implica p. Uma pessoa pode acreditar em algo falso, mas isso não constitui conhecimento neste sistema; crenças são tratadas por outros operadores ou modelos.\n\nImagine dois envelopes lacrados: Ana viu o conteúdo de um, Bruno não. Do mesmo mundo real, Ana pode considerar apenas situações com p verdadeira, enquanto Bruno considera tanto p quanto ¬p. Nesse caso, Kₐp pode ser verdadeira e Kᵦp falsa, mesmo que p seja objetivamente verdadeira. O operador ¬Kᵦp significa apenas “Bruno não sabe p”; não implica Kᵦ¬p, que seria “Bruno sabe que p é falsa”. Confundir desconhecimento com conhecimento da negação produz conclusões injustificadas, inclusive em interpretações de testemunhos.\n\nEm KₐKᵦp, Ana sabe que Bruno sabe p. Avaliamos primeiro os mundos compatíveis com a informação de Ana e, em cada um deles, verificamos se Bruno conhece p. Esse procedimento ilustra como operadores epistêmicos podem ser combinados sem se reduzir à verdade isolada da proposição. Quando todos compartilham informação e sabem que ela é compartilhada, podem surgir formas de conhecimento comum, mais fortes que “todos sabem p”. Nesta introdução, trabalhamos com mundos finitos e relações que preservam as condições de conhecimento para evitar extrapolações sobre psicologia real.",
    "example": "Ana viu que o documento foi assinado. Bruno só sabe que pode ter sido assinado ou não; no mundo real, ele foi.",
    "steps": [
      "No mundo real p=V: o documento foi assinado. Essa é uma informação sobre o fato, não sobre o conhecimento de cada pessoa.",
      "Todas as situações que Ana considera possíveis têm p=V, pois ela viu a assinatura. Logo Kₐp é V.",
      "Bruno ainda admite uma situação em que p=F; assim Kᵦp é F. Também não concluímos automaticamente que ele sabe ¬p."
    ],
    "quiz": [
      {
        "question": "Kₐp significa:",
        "options": [
          "p é verdadeira em todos os mundos compatíveis com o que Ana sabe.",
          "Ana deseja que p aconteça.",
          "p é provável em 70% dos casos."
        ],
        "correct": 0,
        "why": "O operador representa universalidade sobre alternativas informacionais de Ana."
      },
      {
        "question": "Em conhecimento factivo, Kₐp implica:",
        "options": [
          "p.",
          "¬p.",
          "Kᵦp para qualquer pessoa."
        ],
        "correct": 0,
        "why": "O mundo efetivo é considerado compatível com o conhecimento do agente."
      },
      {
        "question": "¬Kₐp implica Kₐ¬p?",
        "options": [
          "Não; Ana pode estar indecisa entre p e ¬p.",
          "Sim, em qualquer modelo epistêmico.",
          "Sim, quando Bruno tem mais informação."
        ],
        "correct": 0,
        "why": "Ignorância não é conhecimento da negação."
      },
      {
        "question": "KₐKᵦp significa:",
        "options": [
          "Ana sabe que Bruno sabe p.",
          "Ana e Bruno necessariamente discordam.",
          "p é verdadeira somente no futuro."
        ],
        "correct": 0,
        "why": "Há duas avaliações sucessivas de acessibilidade, uma para cada agente."
      }
    ]
  },
  "deontica": {
    "lead": "O que significa uma ação ser obrigatória, permitida ou proibida?",
    "theory": "“É obrigatório usar capacete” pode ser verdadeiro enquanto alguém deixa de usá-lo. Na lógica deôntica, representamos o dever por O p, enquanto p descreve a ação realizada. Uma violação ocorre quando O p é afirmada na situação normativa e p é falsa no mundo factual. Para uma introdução, consideraremos mundos ideais aceitáveis pela norma. O p vale quando p ocorre em todos esses mundos; P p vale quando p ocorre em pelo menos um deles. Essa abordagem é uma escolha de modelagem, não um retrato universal de todas as teorias jurídicas.\n\nNo sistema deôntico padrão usado aqui, a proibição de p pode ser expressa por O¬p, e P p equivale a ¬O¬p. Assim, dizer que algo não é proibido significa que existe pelo menos uma situação normativamente ideal onde a ação é realizada. Entretanto, P p não implica O p. Uma atividade pode ser permitida sem ser exigida. É preciso também distinguir permissão fraca, derivada da ausência de proibição, de uma permissão explicitamente declarada numa regra; sistemas jurídicos podem tratar essas diferenças com mais sutileza.\n\nConsidere duas regras: “é obrigatório preservar o sigilo” e “é obrigatório informar o perigo iminente”. Num caso extremo, seu cumprimento simultâneo pode parecer impossível. Um modelo com nenhum mundo ideal faria todas as obrigações universais parecerem verdadeiras por vacuidade, resultado inadequado a certos sistemas normativos. Para evitar esse problema introdutório, usamos ao menos um mundo ideal e explicitamos quais conflitos podem ser representados. A análise ética e jurídica exige considerar hierarquia, exceções e condições contextuais; a lógica deôntica organiza esses problemas, mas não os resolve automaticamente.",
    "example": "Numa biblioteca, é obrigatório guardar silêncio, mas um visitante está falando; entrar com água é permitido, porém não obrigatório.",
    "steps": [
      "Silêncio é exigido; o visitante fala. A regra O(silêncio) pode valer mesmo quando silêncio é F.",
      "Todos os mundos conformes à regra preservam silêncio, então O(silêncio) é V. Há pelo menos um mundo ideal com água, logo P(água) é V.",
      "De P(água) não segue O(água). Do dever de silêncio não segue que o visitante esteja calado."
    ],
    "quiz": [
      {
        "question": "O p expressa:",
        "options": [
          "Obrigação de p no sistema normativo escolhido.",
          "Constatação de que p ocorreu.",
          "Probabilidade de p ser verdadeira."
        ],
        "correct": 0,
        "why": "O é um operador de dever, não de descrição factual."
      },
      {
        "question": "P p significa, na semântica idealizada:",
        "options": [
          "Existe uma alternativa ideal em que p ocorre.",
          "p deve ocorrer em todas as alternativas ideais.",
          "p aconteceu ontem."
        ],
        "correct": 0,
        "why": "P é possibilidade normativa, não universalidade."
      },
      {
        "question": "Uma obrigação descumprida exemplifica:",
        "options": [
          "O p verdadeira com p falsa na situação factual.",
          "Impossibilidade lógica de normas.",
          "Que O p e p são idênticas."
        ],
        "correct": 0,
        "why": "A norma pode persistir mesmo quando alguém a viola."
      },
      {
        "question": "No sistema padrão descrito, proibir p equivale a:",
        "options": [
          "O¬p.",
          "P p.",
          "p atualmente verdadeira."
        ],
        "correct": 0,
        "why": "A proibição é obrigação de não realizar a ação."
      }
    ]
  },
  "difusa": {
    "lead": "Como formalizar propriedades graduais sem reduzi-las a V ou F?",
    "theory": "A classificação “a água está quente” depende do contexto e de uma função que associa temperaturas a graus de pertinência. Em vez de impor uma fronteira abrupta entre quente e não quente, podemos atribuir, por exemplo, μ_quente(28 °C)=0,7 de acordo com uma função previamente declarada. Esse grau não significa que exista 70% de chance de a temperatura ser quente. A temperatura pode ser conhecida exatamente e a pertinência ao conjunto difuso ser 0,7. Uma probabilidade expressa incerteza sobre eventos; um grau de pertinência descreve o quanto um caso satisfaz uma propriedade gradual.\n\nNa lógica difusa básica ilustrada aqui, adotamos as operações de Zadeh: a negação de p tem grau 1−μ(p), a conjunção p∧q toma min(μ(p),μ(q)) e a disjunção p∨q toma max(μ(p),μ(q)). Com μ(p)=0,7 e μ(q)=0,4, a conjunção tem grau 0,4 e a disjunção 0,7. Essa não é a única escolha matemática. Outros sistemas difusos usam diferentes t-normas e operações, como produto ou a lógica de Łukasiewicz. Precisamos indicar as regras para não tratar “lógica difusa” como se designasse uma única tabela universal de operadores.\n\nSistemas de controle de temperatura podem combinar sensores e regras graduais para ajustar ventilação ou aquecimento. O projeto precisa declarar funções de pertinência, operadores e eventual método de defuzzificação para converter resultados em ações. As operações fuzzy também não autorizam substituir evidência empírica por números arbitrários. Funções de pertinência devem ser explicadas e testadas no contexto, e um grau numérico preciso não assegura por si que o modelo represente adequadamente a realidade.",
    "example": "Um controle térmico atribui grau 0,7 à propriedade ‘quente’ e grau 0,4 à propriedade ‘úmido’, usando Zadeh.",
    "steps": [
      "μ(quente)=0,7 e μ(úmido)=0,4; a negação será 1−x, a conjunção min e a disjunção max.",
      "Quente ∧ úmido = min(0,7,0,4)=0,4; quente ∨ úmido = max(0,7,0,4)=0,7.",
      "¬quente tem grau 0,3, pois 1−0,7=0,3. Isso não é uma estimativa de 30% de chance de a água estar fria."
    ],
    "quiz": [
      {
        "question": "Na lógica difusa, o grau 0,7 pode representar:",
        "options": [
          "Quanto um objeto satisfaz uma propriedade gradual.",
          "Obrigatoriamente a chance de um evento ocorrer.",
          "A verdade clássica absoluta V."
        ],
        "correct": 0,
        "why": "O grau de pertinência não é necessariamente uma probabilidade."
      },
      {
        "question": "Usando a conjunção min, 0,2∧0,9 vale:",
        "options": [
          "0,2.",
          "0,9.",
          "1,1."
        ],
        "correct": 0,
        "why": "A conjunção min retorna o menor operando."
      },
      {
        "question": "Usando negação 1−x, a negação de 0,6 é:",
        "options": [
          "0,4.",
          "0,6.",
          "−0,6."
        ],
        "correct": 0,
        "why": "A negação escolhida produz o complemento em relação a 1."
      },
      {
        "question": "Todas as lógicas difusas usam as mesmas operações?",
        "options": [
          "Não; é preciso indicar a t-norma e as regras escolhidas.",
          "Sim, todas exigem produto.",
          "Sim, toda conjunção é bivalente."
        ],
        "correct": 0,
        "why": "Existem várias famílias de operações e semânticas difusas."
      }
    ]
  },
  "paraconsistente": {
    "lead": "Uma contradição precisa tornar qualquer conclusão derivável?",
    "theory": "Em lógica clássica, a partir de p e ¬p podemos derivar uma proposição arbitrária q usando regras clássicas adequadas. Esse fenômeno é a explosão. Em bases de dados reais, porém, fontes diferentes podem relatar simultaneamente “a entrega ocorreu” e “a entrega não ocorreu”, sem que isso forneça informação sobre a temperatura do servidor. Lógicas paraconsistentes são sistemas em que a presença de uma contradição não autoriza qualquer conclusão. Isso não significa que todas as proposições contraditórias sejam aceitáveis ou que qualquer inconsistência seja verdadeira: o objetivo é controlar as consequências lógicas de conflitos informacionais.\n\nUsaremos uma semântica introdutória de First-Degree Entailment (FDE). Uma proposição pode ter suporte apenas para verdadeiro (T), apenas para falso (F), para ambos (B) ou para nenhum dos dois (N). B registra informações favoráveis e contrárias; N representa ausência de suporte nas duas direções. Para a negação, trocamos suporte positivo e negativo: T vira F, F vira T, enquanto B permanece B e N permanece N. Nas conjunções e disjunções, avaliamos separadamente as duas componentes de suporte. Não estamos usando quatro graus ordenados numa escala contínua.\n\nUma consequência preserva a designação quando toda avaliação que dá suporte verdadeiro às premissas também dá suporte verdadeiro à conclusão. No caso {p,¬p} com estado B, as duas premissas têm suporte positivo; ainda podemos atribuir q no estado F, sem suporte positivo. Portanto, q não se segue obrigatoriamente. Isso permite lidar com bases inconsistentes sem descartá-las integralmente. Contudo, diferentes lógicas paraconsistentes possuem regras distintas, e algumas podem admitir outros princípios não clássicos. Não é rigoroso atribuir a todas elas uma mesma tabela ou um mesmo cálculo.",
    "example": "Duas fontes discordam sobre se um documento foi enviado; nenhuma delas informa se o servidor está ligado.",
    "steps": [
      "Para “documento enviado” há suporte positivo e negativo, representado por B. Sobre “servidor ligado” não há suporte, representado por N.",
      "A negação de B continua B, pois trocar os suportes preserva a presença de ambos.",
      "“Servidor ligado” permanece N. Das informações conflitantes sobre envio não decorre suporte positivo para o estado do servidor."
    ],
    "quiz": [
      {
        "question": "A explosão clássica permite inferir:",
        "options": [
          "Uma proposição arbitrária a partir de uma contradição.",
          "Somente a proposição contraditória.",
          "A inexistência de toda premissa."
        ],
        "correct": 0,
        "why": "É o princípio de trivialização a partir de p e ¬p."
      },
      {
        "question": "Em FDE, o estado B registra:",
        "options": [
          "Suporte verdadeiro e falso simultaneamente.",
          "Probabilidade de 50%.",
          "Ausência total de informação."
        ],
        "correct": 0,
        "why": "B significa ambos os suportes, não um grau probabilístico."
      },
      {
        "question": "Qual estado indica ausência de suporte nas duas direções?",
        "options": [
          "N.",
          "T.",
          "B."
        ],
        "correct": 0,
        "why": "N representa informação nem positiva nem negativa."
      },
      {
        "question": "Em FDE, p=B e q=F. O argumento {p,¬p}⊨q é:",
        "options": [
          "Inválido nesse modelo.",
          "Necessariamente válido.",
          "Equivalente a q ser provável."
        ],
        "correct": 0,
        "why": "As premissas têm suporte positivo; q não tem, constituindo contraexemplo."
      }
    ]
  },
  "intuicionista": {
    "lead": "Quando uma prova exige uma construção e não apenas ausência de contraexemplo?",
    "theory": "Na lógica intuicionista, afirmar p∨q requer, em termos de provas, uma demonstração de p ou uma demonstração de q. Uma prova de p→q deve fornecer um modo de transformar qualquer prova de p numa prova de q. A negação ¬p é abreviação de p→⊥, isto é, uma derivação de contradição a partir de p. A diferença não é simplesmente atribuir probabilidades ou graus intermediários à verdade. Trata-se de mudar quais justificativas são aceitas para certas inferências. O princípio p∨¬p, sempre válido na lógica clássica, não é teorema universal da lógica intuicionista sem hipóteses adicionais.\n\nUma semântica de Kripke intuicionista usa mundos ordenados por extensões de informação. Se p foi estabelecida num mundo, continua estabelecida em qualquer extensão acessível: essa persistência é chamada monotonicidade do forçamento. Uma afirmação não demonstrada num mundo não é automaticamente refutada. A implicação p→q vale num mundo quando em toda extensão futura, sempre que p é forçada, q também é. Assim ¬p exige que nenhuma extensão force p. Um mundo atual pode ainda não forçar p nem forçar ¬p, mesmo quando uma extensão futura venha a estabelecer p.\n\nConsidere w0 com uma extensão w1. Em w0 ainda não há prova de p; em w1 há uma prova de p. Em w0 não se força p. Também não se força ¬p, pois a extensão w1 força p e impede a negação construtiva. Como nenhuma das duas alternativas é forçada em w0, p∨¬p não é forçada ali. Isso mostra por modelo que o terceiro excluído não é válido em todos os quadros intuicionistas, mas não significa que seja possível demonstrar sua negação de modo universal.",
    "example": "Há dois estados de informação: w0 não estabelece p e w1, extensão de w0, estabelece p e preserva tudo que já foi provado.",
    "steps": [
      "w0 ≤ w1 significa que w1 acrescenta informações e não retira proposições atômicas já estabelecidas.",
      "p não é forçada em w0. ¬p também não: w1, extensão acessível, força p.",
      "A disjunção não é forçada porque nenhum dos dois lados foi estabelecido em w0."
    ],
    "quiz": [
      {
        "question": "Em interpretação construtiva, provar p∨q exige:",
        "options": [
          "Uma prova de p ou uma prova de q.",
          "Apenas ausência de uma prova de ¬p.",
          "Uma probabilidade favorável a p."
        ],
        "correct": 0,
        "why": "Uma disjunção construtiva pede testemunha de um dos lados."
      },
      {
        "question": "Na semântica intuicionista, informações atômicas forçadas são:",
        "options": [
          "Persistentes em extensões do mundo.",
          "Sempre esquecidas em extensões.",
          "Necessariamente probabilísticas."
        ],
        "correct": 0,
        "why": "Monotonicidade é condição do forçamento."
      },
      {
        "question": "Em um mundo que ainda não força p, segue que força ¬p?",
        "options": [
          "Não; p pode tornar-se forçada numa extensão.",
          "Sim, por definição.",
          "Sim, sempre que há apenas dois mundos."
        ],
        "correct": 0,
        "why": "Ausência de prova não equivale a prova de negação."
      },
      {
        "question": "p∨¬p é teorema universal intuicionista?",
        "options": [
          "Não; há modelos de Kripke que não o forçam.",
          "Sim, sem condições.",
          "É apenas uma regra da lógica difusa."
        ],
        "correct": 0,
        "why": "O terceiro excluído não é derivável como princípio geral intuicionista."
      }
    ]
  }
};
export const OTHER_LOGIC_READINGS={
  "modais": {
    "objective": "Interpretar possibilidade e necessidade em modelos de Kripke, distinguir mundo atual de mundos acessíveis e reconhecer os efeitos de reflexividade, transitividade e acessibilidade vazia.",
    "sections": [
      {
        "heading": "Possibilidade e necessidade são avaliadas relativamente a um mundo",
        "paragraphs": [
          "A afirmação “é possível que a biblioteca abra” não significa que ela já esteja aberta. Na semântica modal de Kripke, partimos de um mundo w e examinamos as alternativas alcançadas por uma relação R. ◇p é verdadeira em w quando existe pelo menos um mundo acessível no qual p vale. □p exige que p valha em todos eles.",
          "A palavra “necessário” não deve ser interpretada automaticamente como certeza psicológica ou como previsão do futuro. Ela significa universalidade relativamente às alternativas especificadas no modelo. O mesmo enunciado pode ter avaliação modal diferente quando muda a relação de acessibilidade."
        ]
      },
      {
        "heading": "Uma seta determina os casos examinados",
        "paragraphs": [
          "Suponha que w0 tenha acesso a w1 e w2, com p verdadeira no primeiro e falsa no segundo. Em w0, ◇p vale porque w1 é testemunha, mas □p falha porque w2 é contraexemplo. Também é verdadeira ◇¬p, já que w2 satisfaz a negação de p.",
          "A relação pode não ligar w0 a ele próprio. Numa estrutura com nenhuma saída a partir de w0, □p é verdadeira por vacuidade e ◇p é falsa. Para inferir □p → p em todos os mundos do modelo, uma condição suficiente é a reflexividade de R, como nos quadros do sistema T."
        ]
      },
      {
        "heading": "Modalidades compostas não se reduzem ao mundo atual",
        "paragraphs": [
          "Em □◇p, primeiro examinamos cada mundo acessível a w; depois exigimos que de cada um deles seja possível alcançar algum mundo onde p vale. Não basta encontrar uma única testemunha acessível diretamente ao mundo inicial. A composição dos operadores muda o caminho da avaliação.",
          "A prática correta começa destacando o mundo de origem, seguindo as setas e verificando a fórmula interna no destino apropriado. Esse método fornece justificativas ou contraexemplos verificáveis e prepara o estudo de modalidades de conhecimento e obrigação."
        ]
      }
    ],
    "misconception": "□p não significa que p já é verdadeira no mundo atual em qualquer quadro; a implicação depende de condições como reflexividade. ◇p não exige p no próprio mundo de origem.",
    "summary": "◇ examina a existência de uma alternativa acessível que satisfaça a fórmula; □ examina todas. Relações de acessibilidade e operadores aninhados determinam o resultado.",
    "check": {
      "question": "De w0 são acessíveis w1 e w2, onde p vale apenas em w1. O que ocorre em w0?",
      "options": [
        "◇p é V e □p é F.",
        "□p é V e ◇p é F.",
        "Ambas são necessariamente F."
      ],
      "correct": 0,
      "why": "w1 testemunha a possibilidade; w2 refuta a necessidade. Os valores de p no próprio w0 não substituem essa verificação."
    }
  },
  "temporal": {
    "objective": "Interpretar F, G, X e U numa lógica temporal linear de futuro, calculando valores em traços finitos com convenções explícitas para o instante atual e o último estado.",
    "sections": [
      {
        "heading": "O tempo introduz uma ordem de instantes",
        "paragraphs": [
          "Na lógica temporal linear, avaliamos proposições em uma sequência t0, t1, t2 e assim por diante. Um alarme pode estar ligado agora, desligar depois e voltar a ligar. Não basta saber se “alarme ligado” é verdadeiro em algum lugar: precisamos saber em quais instantes e a partir de qual ponto começamos.",
          "Adotaremos uma semântica didática de traço finito: o instante atual está incluído na avaliação do futuro para F e G. Fp afirma que p vale em pelo menos um instante desde agora. Gp exige que p valha em todos os instantes de agora até o final do traço mostrado."
        ]
      },
      {
        "heading": "Próximo estado e até que",
        "paragraphs": [
          "Xp afirma que p será verdadeira no próximo instante, não necessariamente agora. Quando estamos no último instante de um traço finito, convencionamos Xp como falsa, pois não existe um próximo estado representado. Outras semânticas podem usar convenções diferentes, que devem ser anunciadas.",
          "p U q, na interpretação forte de “até que”, exige encontrar um instante futuro em que q seja verdadeira e que p continue verdadeira em todos os instantes anteriores, a partir do ponto avaliado. Se q nunca acontece no traço, p U q é falsa mesmo que p permaneça sempre verdadeira."
        ]
      },
      {
        "heading": "Traduza exigências em verificações concretas",
        "paragraphs": [
          "“O sistema ficará disponível em algum instante” corresponde a F(disponível). “A partir de agora permanecerá seguro” pede G(seguro). “Na próxima verificação haverá resposta” pede X(resposta). “O serviço permanecerá ativo até o backup terminar” pode ser expresso como ativo U backup.",
          "A semelhança entre F/G e ◇/□ não os torna sinônimos: os operadores temporais navegam uma ordem de instantes, enquanto operadores modais usam uma relação de acessibilidade entre mundos. Quando a aplicação exige caminhos ramificados, é preciso especificar outra lógica temporal."
        ]
      }
    ],
    "misconception": "F p não significa que p será verdadeira em todos os instantes; e p U q na interpretação forte exige a ocorrência efetiva de q. Em traços finitos, a convenção para X no último estado importa.",
    "summary": "F significa eventualidade, G permanência, X próximo estado e U manutenção até a ocorrência exigida de outra condição. Sempre indique o instante inicial e o modelo temporal.",
    "check": {
      "question": "Num traço t0:p=V, t1:p=F, t2:p=V, o que vale em t0?",
      "options": [
        "Fp é V e Gp é F.",
        "Fp é F e Gp é V.",
        "Fp e Gp são sempre V."
      ],
      "correct": 0,
      "why": "Existe instante com p verdadeira, mas ela não se mantém em todos; t1 refuta Gp."
    }
  },
  "epistemica": {
    "objective": "Avaliar Kₐp e Kᵦp em modelos com relações de indistinguibilidade entre mundos, diferenciando conhecimento de verdade, ausência de conhecimento e conhecimento conjunto.",
    "sections": [
      {
        "heading": "Conhecer exige mais que uma afirmação verdadeira",
        "paragraphs": [
          "É possível que uma resposta esteja correta e, ainda assim, Ana não saiba que está correta. Na lógica epistêmica, Kₐp significa “Ana sabe que p”. Um modelo descreve os mundos que Ana não consegue distinguir a partir das informações de que dispõe. Ela sabe p quando p é verdadeira em todos esses mundos compatíveis.",
          "Para modelar conhecimento factivo, a relação inclui o mundo efetivo entre as alternativas do próprio agente. Assim, Kₐp implica p. Uma pessoa pode acreditar em algo falso, mas isso não constitui conhecimento neste sistema; crenças são tratadas por outros operadores ou modelos."
        ]
      },
      {
        "heading": "Pessoas diferentes possuem informações diferentes",
        "paragraphs": [
          "Imagine dois envelopes lacrados: Ana viu o conteúdo de um, Bruno não. Do mesmo mundo real, Ana pode considerar apenas situações com p verdadeira, enquanto Bruno considera tanto p quanto ¬p. Nesse caso, Kₐp pode ser verdadeira e Kᵦp falsa, mesmo que p seja objetivamente verdadeira.",
          "O operador ¬Kᵦp significa apenas “Bruno não sabe p”; não implica Kᵦ¬p, que seria “Bruno sabe que p é falsa”. Confundir desconhecimento com conhecimento da negação produz conclusões injustificadas, inclusive em interpretações de testemunhos."
        ]
      },
      {
        "heading": "Conhecimento sobre o conhecimento",
        "paragraphs": [
          "Em KₐKᵦp, Ana sabe que Bruno sabe p. Avaliamos primeiro os mundos compatíveis com a informação de Ana e, em cada um deles, verificamos se Bruno conhece p. Esse procedimento ilustra como operadores epistêmicos podem ser combinados sem se reduzir à verdade isolada da proposição.",
          "Quando todos compartilham informação e sabem que ela é compartilhada, podem surgir formas de conhecimento comum, mais fortes que “todos sabem p”. Nesta introdução, trabalhamos com mundos finitos e relações que preservam as condições de conhecimento para evitar extrapolações sobre psicologia real."
        ]
      }
    ],
    "misconception": "Não saber p não significa saber ¬p. A verdade de p, a crença em p e o conhecimento de p são estados diferentes que exigem premissas específicas.",
    "summary": "Kₐp exige p em todos os mundos que Ana considera possíveis. A relação de indistinguibilidade é específica do agente, e conhecimento factivo preserva verdade no mundo real.",
    "check": {
      "question": "p é verdadeira, Ana só considera mundos com p, e Bruno considera um mundo com ¬p. Qual resultado?",
      "options": [
        "Kₐp é V e Kᵦp é F.",
        "Kₐp e Kᵦp são V porque p é V.",
        "Kᵦ¬p é V necessariamente."
      ],
      "correct": 0,
      "why": "Ana excluiu a alternativa contrária, enquanto Bruno ainda não consegue descartá-la; isso não significa que Bruno conheça ¬p."
    }
  },
  "deontica": {
    "objective": "Interpretar O p, P p e F p como operadores normativos num modelo idealizado, distinguindo normas de fatos, permissão de obrigação e conflitos normativos.",
    "sections": [
      {
        "heading": "O dever não descreve automaticamente o fato",
        "paragraphs": [
          "“É obrigatório usar capacete” pode ser verdadeiro enquanto alguém deixa de usá-lo. Na lógica deôntica, representamos o dever por O p, enquanto p descreve a ação realizada. Uma violação ocorre quando O p é afirmada na situação normativa e p é falsa no mundo factual.",
          "Para uma introdução, consideraremos mundos ideais aceitáveis pela norma. O p vale quando p ocorre em todos esses mundos; P p vale quando p ocorre em pelo menos um deles. Essa abordagem é uma escolha de modelagem, não um retrato universal de todas as teorias jurídicas."
        ]
      },
      {
        "heading": "Obrigação, permissão e proibição",
        "paragraphs": [
          "No sistema deôntico padrão usado aqui, a proibição de p pode ser expressa por O¬p, e P p equivale a ¬O¬p. Assim, dizer que algo não é proibido significa que existe pelo menos uma situação normativamente ideal onde a ação é realizada.",
          "Entretanto, P p não implica O p. Uma atividade pode ser permitida sem ser exigida. É preciso também distinguir permissão fraca, derivada da ausência de proibição, de uma permissão explicitamente declarada numa regra; sistemas jurídicos podem tratar essas diferenças com mais sutileza."
        ]
      },
      {
        "heading": "Normas em conflito exigem explicitar o sistema",
        "paragraphs": [
          "Considere duas regras: “é obrigatório preservar o sigilo” e “é obrigatório informar o perigo iminente”. Num caso extremo, seu cumprimento simultâneo pode parecer impossível. Um modelo com nenhum mundo ideal faria todas as obrigações universais parecerem verdadeiras por vacuidade, resultado inadequado a certos sistemas normativos.",
          "Para evitar esse problema introdutório, usamos ao menos um mundo ideal e explicitamos quais conflitos podem ser representados. A análise ética e jurídica exige considerar hierarquia, exceções e condições contextuais; a lógica deôntica organiza esses problemas, mas não os resolve automaticamente."
        ]
      }
    ],
    "misconception": "O p não implica que p seja verdadeira agora: uma norma pode ser violada. P p significa permissão, não obrigação, e as leituras dependem do sistema normativo escolhido.",
    "summary": "O vale em todos os mundos ideais, P em pelo menos um, e proibição corresponde a O¬p no sistema apresentado. A existência de uma obrigação não garante seu cumprimento factual.",
    "check": {
      "question": "Usar crachá é obrigatório (O p), mas uma pessoa não o usa (¬p). Isso é contraditório?",
      "options": [
        "Não: é uma violação factual de uma obrigação.",
        "Sim: O p implica que p sempre acontece.",
        "Não existe interpretação normativa possível."
      ],
      "correct": 0,
      "why": "A norma e o comportamento são descrições de tipos diferentes; descumprir o dever não o torna inexistente."
    }
  },
  "difusa": {
    "objective": "Interpretar graus de pertinência e valores de verdade entre 0 e 1 em um sistema difuso especificado, distinguindo esses graus de probabilidades e calculando negação, mínimo e máximo.",
    "sections": [
      {
        "heading": "Algumas descrições admitem transições graduais",
        "paragraphs": [
          "A classificação “a água está quente” depende do contexto e de uma função que associa temperaturas a graus de pertinência. Em vez de impor uma fronteira abrupta entre quente e não quente, podemos atribuir, por exemplo, μ_quente(28 °C)=0,7 de acordo com uma função previamente declarada.",
          "Esse grau não significa que exista 70% de chance de a temperatura ser quente. A temperatura pode ser conhecida exatamente e a pertinência ao conjunto difuso ser 0,7. Uma probabilidade expressa incerteza sobre eventos; um grau de pertinência descreve o quanto um caso satisfaz uma propriedade gradual."
        ]
      },
      {
        "heading": "As operações dependem da lógica adotada",
        "paragraphs": [
          "Na lógica difusa básica ilustrada aqui, adotamos as operações de Zadeh: a negação de p tem grau 1−μ(p), a conjunção p∧q toma min(μ(p),μ(q)) e a disjunção p∨q toma max(μ(p),μ(q)). Com μ(p)=0,7 e μ(q)=0,4, a conjunção tem grau 0,4 e a disjunção 0,7.",
          "Essa não é a única escolha matemática. Outros sistemas difusos usam diferentes t-normas e operações, como produto ou a lógica de Łukasiewicz. Precisamos indicar as regras para não tratar “lógica difusa” como se designasse uma única tabela universal de operadores."
        ]
      },
      {
        "heading": "Uma regra pode produzir resultados graduais",
        "paragraphs": [
          "Sistemas de controle de temperatura podem combinar sensores e regras graduais para ajustar ventilação ou aquecimento. O projeto precisa declarar funções de pertinência, operadores e eventual método de defuzzificação para converter resultados em ações.",
          "As operações fuzzy também não autorizam substituir evidência empírica por números arbitrários. Funções de pertinência devem ser explicadas e testadas no contexto, e um grau numérico preciso não assegura por si que o modelo represente adequadamente a realidade."
        ]
      }
    ],
    "misconception": "Grau de pertinência 0,7 não é automaticamente uma probabilidade de 70%. A interpretação e os resultados dependem da função de pertinência e das operações escolhidas.",
    "summary": "Conjuntos difusos admitem pertinência entre 0 e 1. Na convenção de Zadeh, ¬p=1−p, p∧q=min(p,q) e p∨q=max(p,q); outras lógicas difusas adotam operações diferentes.",
    "check": {
      "question": "Se μ(p)=0,8 e μ(q)=0,3, quanto vale p∧q com a regra min?",
      "options": [
        "0,3.",
        "0,8.",
        "1,1."
      ],
      "correct": 0,
      "why": "Na conjunção min, o grau é o menor valor entre as duas propriedades, independentemente de probabilidades."
    }
  },
  "paraconsistente": {
    "objective": "Compreender a motivação de lógicas paraconsistentes, comparar explosão clássica com inferências não explosivas e avaliar afirmações no sistema FDE de quatro estados informacionais.",
    "sections": [
      {
        "heading": "Contradição e trivialização são problemas diferentes",
        "paragraphs": [
          "Em lógica clássica, a partir de p e ¬p podemos derivar uma proposição arbitrária q usando regras clássicas adequadas. Esse fenômeno é a explosão. Em bases de dados reais, porém, fontes diferentes podem relatar simultaneamente “a entrega ocorreu” e “a entrega não ocorreu”, sem que isso forneça informação sobre a temperatura do servidor.",
          "Lógicas paraconsistentes são sistemas em que a presença de uma contradição não autoriza qualquer conclusão. Isso não significa que todas as proposições contraditórias sejam aceitáveis ou que qualquer inconsistência seja verdadeira: o objetivo é controlar as consequências lógicas de conflitos informacionais."
        ]
      },
      {
        "heading": "Quatro estados no sistema FDE",
        "paragraphs": [
          "Usaremos uma semântica introdutória de First-Degree Entailment (FDE). Uma proposição pode ter suporte apenas para verdadeiro (T), apenas para falso (F), para ambos (B) ou para nenhum dos dois (N). B registra informações favoráveis e contrárias; N representa ausência de suporte nas duas direções.",
          "Para a negação, trocamos suporte positivo e negativo: T vira F, F vira T, enquanto B permanece B e N permanece N. Nas conjunções e disjunções, avaliamos separadamente as duas componentes de suporte. Não estamos usando quatro graus ordenados numa escala contínua."
        ]
      },
      {
        "heading": "Validade sem explosão",
        "paragraphs": [
          "Uma consequência preserva a designação quando toda avaliação que dá suporte verdadeiro às premissas também dá suporte verdadeiro à conclusão. No caso {p,¬p} com estado B, as duas premissas têm suporte positivo; ainda podemos atribuir q no estado F, sem suporte positivo. Portanto, q não se segue obrigatoriamente.",
          "Isso permite lidar com bases inconsistentes sem descartá-las integralmente. Contudo, diferentes lógicas paraconsistentes possuem regras distintas, e algumas podem admitir outros princípios não clássicos. Não é rigoroso atribuir a todas elas uma mesma tabela ou um mesmo cálculo."
        ]
      }
    ],
    "misconception": "Paraconsistência não quer dizer que contradições provem tudo, nem que uma afirmação seja obrigatoriamente verdadeira e falsa. No sistema apresentado, B e N são estados de informação, não probabilidades.",
    "summary": "A lógica paraconsistente evita explosão. Na semântica FDE, T, F, B e N diferenciam suporte verdadeiro, falso, ambos ou nenhum; a consequência deve ser verificada conforme os estados designados.",
    "check": {
      "question": "Na semântica FDE, p recebe B e q recebe F. De p e ¬p segue q necessariamente?",
      "options": [
        "Não; há suporte para as premissas, mas não para q.",
        "Sim, por explosão em qualquer lógica.",
        "Sim, porque B vale 100%."
      ],
      "correct": 0,
      "why": "O estado B satisfaz as premissas como designadas, enquanto F deixa q sem suporte verdadeiro, fornecendo um contraexemplo à explosão."
    }
  },
  "intuicionista": {
    "objective": "Distinguir validade clássica e demonstração construtiva, interpretar disjunção e negação intuicionistas e reconhecer um contraexemplo por modelo de Kripke ao terceiro excluído.",
    "sections": [
      {
        "heading": "Verdade construtiva e regras de prova",
        "paragraphs": [
          "Na lógica intuicionista, afirmar p∨q requer, em termos de provas, uma demonstração de p ou uma demonstração de q. Uma prova de p→q deve fornecer um modo de transformar qualquer prova de p numa prova de q. A negação ¬p é abreviação de p→⊥, isto é, uma derivação de contradição a partir de p.",
          "A diferença não é simplesmente atribuir probabilidades ou graus intermediários à verdade. Trata-se de mudar quais justificativas são aceitas para certas inferências. O princípio p∨¬p, sempre válido na lógica clássica, não é teorema universal da lógica intuicionista sem hipóteses adicionais."
        ]
      },
      {
        "heading": "Mundos de informação crescente",
        "paragraphs": [
          "Uma semântica de Kripke intuicionista usa mundos ordenados por extensões de informação. Se p foi estabelecida num mundo, continua estabelecida em qualquer extensão acessível: essa persistência é chamada monotonicidade do forçamento. Uma afirmação não demonstrada num mundo não é automaticamente refutada.",
          "A implicação p→q vale num mundo quando em toda extensão futura, sempre que p é forçada, q também é. Assim ¬p exige que nenhuma extensão force p. Um mundo atual pode ainda não forçar p nem forçar ¬p, mesmo quando uma extensão futura venha a estabelecer p."
        ]
      },
      {
        "heading": "Um contraexemplo ao terceiro excluído",
        "paragraphs": [
          "Considere w0 com uma extensão w1. Em w0 ainda não há prova de p; em w1 há uma prova de p. Em w0 não se força p. Também não se força ¬p, pois a extensão w1 força p e impede a negação construtiva.",
          "Como nenhuma das duas alternativas é forçada em w0, p∨¬p não é forçada ali. Isso mostra por modelo que o terceiro excluído não é válido em todos os quadros intuicionistas, mas não significa que seja possível demonstrar sua negação de modo universal."
        ]
      }
    ],
    "misconception": "Não demonstrar p não equivale a demonstrar ¬p. A lógica intuicionista não é apenas uma lógica de três valores e não prova universalmente ¬(p∨¬p).",
    "summary": "A lógica intuicionista exige provas construtivas e usa modelos com informação crescente. Disjunção pede um lado forçado; negação exige impossibilidade futura de provar p; o terceiro excluído não é universalmente validado.",
    "check": {
      "question": "Em w0 ainda não se provou p, mas numa extensão w1 p é provada. Em w0, o que vale?",
      "options": [
        "Nem p nem ¬p são forçadas.",
        "¬p é forçada porque p não vale agora.",
        "p∨¬p é forçada por princípio em qualquer modelo."
      ],
      "correct": 0,
      "why": "p não foi estabelecida em w0, mas a extensão w1 impede ¬p; portanto nenhuma alternativa é forçada ali."
    }
  }
};
export const OTHER_LOGIC_WORKED={
  "modais": {
    "context": "Do mundo w0 a biblioteca pode seguir dois cenários: w1, em que abre (p=V), e w2, em que não abre (p=F).",
    "steps": [
      {
        "formal": "Liste os mundos alcançados por w0.",
        "concrete": "As setas partem de w0 para w1 e w2; ambos, e só eles, contam na verificação modal proposta.",
        "reason": "A acessibilidade define o domínio da avaliação, independentemente da preferência do observador."
      },
      {
        "formal": "Avalie a necessidade □p.",
        "concrete": "Como em w2 a biblioteca não abre, □p é falsa em w0.",
        "reason": "Uma única alternativa acessível com p=F é contraexemplo à necessidade."
      },
      {
        "formal": "Avalie as possibilidades ◇p e ◇¬p.",
        "concrete": "◇p é V pela alternativa w1; ◇¬p é V pela alternativa w2.",
        "reason": "Mundos diferentes podem testemunhar possibilidades opostas sem tornar p e ¬p verdadeiras no mesmo mundo."
      }
    ],
    "check": {
      "question": "No cenário descrito, qual julgamento é correto?",
      "options": [
        "◇p e ◇¬p são V, mas □p é F.",
        "□p é V porque há uma alternativa favorável.",
        "◇¬p é F porque p pode acontecer."
      ],
      "correct": 0,
      "why": "Uma testemunha basta para cada possibilidade; necessidade exige todas as alternativas."
    }
  },
  "temporal": {
    "context": "Uma fila de backup tem quatro instantes: t0 e t1 com sistema ativo; em t2 o backup termina; em t3 o sistema desliga.",
    "steps": [
      {
        "formal": "Fixe a convenção da linha do tempo.",
        "concrete": "Examinamos t0 até t3, incluindo t0. Em t2, backup é verdadeiro pela primeira vez.",
        "reason": "A posição inicial e a ordem dos estados são partes do modelo."
      },
      {
        "formal": "Avalie F(backup) e G(ativo) desde t0.",
        "concrete": "F(backup) é verdadeira por causa de t2; G(ativo) é falsa porque em t3 o sistema está desligado.",
        "reason": "Existência de um evento e permanência de uma condição são exigências distintas."
      },
      {
        "formal": "Avalie ativo U backup em t0.",
        "concrete": "A condição ativo permanece em t0 e t1, antes de o backup terminar em t2; logo a fórmula é verdadeira.",
        "reason": "O até que forte tem uma testemunha final e exige continuidade de ativo antes dela."
      }
    ],
    "check": {
      "question": "Se o backup nunca terminar no traço, o que ocorre com ativo U backup (até que forte)?",
      "options": [
        "É falsa, mesmo se ativo permanecer verdadeiro.",
        "É automaticamente verdadeira.",
        "É equivalente a X(ativo)."
      ],
      "correct": 0,
      "why": "Sem uma ocorrência de backup não existe o instante exigido pela semântica forte de U."
    }
  },
  "epistemica": {
    "context": "Ana viu que o documento foi assinado. Bruno só sabe que pode ter sido assinado ou não; no mundo real, ele foi.",
    "steps": [
      {
        "formal": "Identifique a afirmação factual.",
        "concrete": "No mundo real p=V: o documento foi assinado. Essa é uma informação sobre o fato, não sobre o conhecimento de cada pessoa.",
        "reason": "Conhecimento exige examinar alternativas informacionais e não apenas a verdade factual."
      },
      {
        "formal": "Avalie as alternativas de Ana.",
        "concrete": "Todas as situações que Ana considera possíveis têm p=V, pois ela viu a assinatura. Logo Kₐp é V.",
        "reason": "A universalidade sobre os mundos acessíveis ao agente justifica o conhecimento."
      },
      {
        "formal": "Avalie as alternativas de Bruno.",
        "concrete": "Bruno ainda admite uma situação em que p=F; assim Kᵦp é F. Também não concluímos automaticamente que ele sabe ¬p.",
        "reason": "A falta de conhecimento positivo não é conhecimento da negação."
      }
    ],
    "check": {
      "question": "Se Bruno admite uma situação com p e outra com ¬p, então:",
      "options": [
        "Ele não sabe p nem sabe ¬p.",
        "Ele sabe ¬p porque não sabe p.",
        "Ele sabe p porque p é verdadeira."
      ],
      "correct": 0,
      "why": "Uma alternativa contrária impede cada uma das duas afirmações de conhecimento."
    }
  },
  "deontica": {
    "context": "Numa biblioteca, é obrigatório guardar silêncio, mas um visitante está falando; entrar com água é permitido, porém não obrigatório.",
    "steps": [
      {
        "formal": "Separe fatos de regras.",
        "concrete": "Silêncio é exigido; o visitante fala. A regra O(silêncio) pode valer mesmo quando silêncio é F.",
        "reason": "A lógica normativa não confunde obrigação com realização."
      },
      {
        "formal": "Interprete os mundos ideais.",
        "concrete": "Todos os mundos conformes à regra preservam silêncio, então O(silêncio) é V. Há pelo menos um mundo ideal com água, logo P(água) é V.",
        "reason": "Obrigação é universal sobre modelos ideais; permissão requer ao menos uma alternativa ideal."
      },
      {
        "formal": "Rejeite conclusões indevidas.",
        "concrete": "De P(água) não segue O(água). Do dever de silêncio não segue que o visitante esteja calado.",
        "reason": "Exigência, permissão e observação factual respondem a perguntas distintas."
      }
    ],
    "check": {
      "question": "O uso de água é permitido mas opcional. Qual fórmula é justificada?",
      "options": [
        "P(água), sem inferir O(água).",
        "O(água) é necessariamente verdadeira.",
        "¬P(água) por ser opcional."
      ],
      "correct": 0,
      "why": "A possibilidade normativa de uma ação não exige sua realização em todos os casos ideais."
    }
  },
  "difusa": {
    "context": "Um controle térmico atribui grau 0,7 à propriedade ‘quente’ e grau 0,4 à propriedade ‘úmido’, usando Zadeh.",
    "steps": [
      {
        "formal": "Declare os graus e a convenção antes de calcular.",
        "concrete": "μ(quente)=0,7 e μ(úmido)=0,4; a negação será 1−x, a conjunção min e a disjunção max.",
        "reason": "Sem uma semântica especificada, não há operação única para conjunção difusa."
      },
      {
        "formal": "Calcule as combinações.",
        "concrete": "Quente ∧ úmido = min(0,7,0,4)=0,4; quente ∨ úmido = max(0,7,0,4)=0,7.",
        "reason": "As operações propostas selecionam, respectivamente, o menor e o maior grau."
      },
      {
        "formal": "Interprete a negação e evite confundi-la com acaso.",
        "concrete": "¬quente tem grau 0,3, pois 1−0,7=0,3. Isso não é uma estimativa de 30% de chance de a água estar fria.",
        "reason": "O valor expressa a semântica gradual adotada, não frequência de ocorrências aleatórias."
      }
    ],
    "check": {
      "question": "No exemplo, quanto vale ¬quente pela negação 1−x?",
      "options": [
        "0,3.",
        "0,7.",
        "1,7."
      ],
      "correct": 0,
      "why": "Subtraindo o grau 0,7 de 1 obtemos 0,3 para a negação adotada."
    }
  },
  "paraconsistente": {
    "context": "Duas fontes discordam sobre se um documento foi enviado; nenhuma delas informa se o servidor está ligado.",
    "steps": [
      {
        "formal": "Registre o conflito sem apagá-lo.",
        "concrete": "Para “documento enviado” há suporte positivo e negativo, representado por B. Sobre “servidor ligado” não há suporte, representado por N.",
        "reason": "O modelo distingue dados conflitantes de dados ausentes."
      },
      {
        "formal": "Negue a proposição conflitante.",
        "concrete": "A negação de B continua B, pois trocar os suportes preserva a presença de ambos.",
        "reason": "O sistema mantém as informações divergentes sem convertê-las numa afirmação arbitrária."
      },
      {
        "formal": "Teste uma conclusão sem relação.",
        "concrete": "“Servidor ligado” permanece N. Das informações conflitantes sobre envio não decorre suporte positivo para o estado do servidor.",
        "reason": "Um modelo com premissas designadas e conclusão não designada refuta a explosão."
      }
    ],
    "check": {
      "question": "Na tabela FDE do exemplo, qual é o estado da informação sobre o servidor?",
      "options": [
        "N, pois não há suporte a favor nem contra.",
        "B, porque outra proposição está em conflito.",
        "T, pela explosão."
      ],
      "correct": 0,
      "why": "Inconsistência no envio não fornece informação sobre a situação do servidor."
    }
  },
  "intuicionista": {
    "context": "Há dois estados de informação: w0 não estabelece p e w1, extensão de w0, estabelece p e preserva tudo que já foi provado.",
    "steps": [
      {
        "formal": "Especifique a ordem de informação.",
        "concrete": "w0 ≤ w1 significa que w1 acrescenta informações e não retira proposições atômicas já estabelecidas.",
        "reason": "A persistência do forçamento é parte do modelo intuicionista."
      },
      {
        "formal": "Avalie p e ¬p em w0.",
        "concrete": "p não é forçada em w0. ¬p também não: w1, extensão acessível, força p.",
        "reason": "Negar construtivamente exige excluir p de todas as extensões, não apenas não prová-la agora."
      },
      {
        "formal": "Teste p∨¬p em w0.",
        "concrete": "A disjunção não é forçada porque nenhum dos dois lados foi estabelecido em w0.",
        "reason": "O modelo é contraexemplo à validade universal do terceiro excluído intuicionista."
      }
    ],
    "check": {
      "question": "Por que ¬p não é forçada em w0?",
      "options": [
        "Porque existe uma extensão w1 que força p.",
        "Porque p é falsa em toda extensão.",
        "Porque ¬p exige uma probabilidade baixa."
      ],
      "correct": 0,
      "why": "Uma extensão que estabelece p impede demonstrar sua impossibilidade construtiva."
    }
  }
};
