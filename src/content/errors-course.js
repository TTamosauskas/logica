/** Unidade VI — Erros Lógicos Comuns: sete aulas com leitura e exemplos progressivos. */
export const ERROR_LESSONS={
  "falacias_relevancia": {
    "lead": "Quando a persuasão substitui razões pertinentes?",
    "theory": "Considere uma reunião escolar em que alguém propõe ampliar o horário da biblioteca. Outra pessoa responde: “Não levem essa proposta a sério; quem sugeriu costuma chegar atrasado.” Essa resposta tenta diminuir a credibilidade de quem fala, mas não informa se o horário ampliado seria viável ou útil. A pessoa pode ser impontual e, ainda assim, apresentar um bom argumento. Em lógica, buscamos a ligação entre as premissas e a conclusão. Em debates cotidianos, também precisamos perguntar se a razão apresentada é pertinente e suficientemente apoiada. Uma fala persuasiva não se torna uma boa justificativa apenas por provocar uma reação forte.\n\nO ataque pessoal é irrelevante quando se usa uma característica do interlocutor para rejeitar uma tese que deveria ser avaliada por seus méritos. Isso não proíbe considerar conflitos de interesse ou credibilidade quando o testemunho da pessoa é justamente a evidência em discussão: a pertinência depende do caso. O espantalho modifica a posição alheia para torná-la mais fácil de atacar. Por exemplo, de “a escola deveria oferecer uma opção de refeição vegetariana” para “você quer proibir todo mundo de comer carne”. A resposta combate uma proposta mais radical que a original. Uma distração argumentativa desloca a conversa para um assunto que não resolve a pergunta inicial.\n\nA afirmação “a maioria acredita nisso, portanto é verdade” confunde aceitação social com confirmação. Muitas pessoas podem concordar sobre um fato e, ainda assim, estar enganadas. A popularidade pode ser relevante para medir preferências, mas não é prova geral de correção factual. Consultar especialistas é razoável quando a área de competência é pertinente, há bons métodos e existe convergência das evidências. O erro ocorre quando se invoca fama, título fora da especialidade ou autoridade como substituto de razões verificáveis. Pergunte: quem sabe o quê, em que condições e com quais provas?\n\nNão procure uma etiqueta isolada em cada frase. Escreva a conclusão com suas próprias palavras; depois liste as razões realmente dadas. Compare o que a pessoa afirma com a versão criticada e identifique a relação entre as evidências e a tese. Uma resposta responsável aponta a dificuldade específica: “essa informação sobre o autor não decide a questão” ou “a posição citada não corresponde ao que foi proposto”. Identificar a falácia é útil quando conduz a uma discussão mais precisa, não quando serve para encerrar o debate.",
    "example": "Proposta: incluir duas horas de atendimento da biblioteca aos sábados. Resposta: “O autor já repetiu de ano; sua sugestão é ruim.”",
    "steps": [
      "A resposta não apresenta dados sobre demanda, custos ou funcionamento.",
      "Mesmo que o autor tenha repetido de ano, a biblioteca pode precisar de mais horários.",
      "“Antes de ampliar o horário, precisamos estimar funcionários, custos e procura no sábado.”"
    ],
    "quiz": [
      {
        "question": "Qual é o problema característico de um espantalho?",
        "options": [
          "Refutar uma versão distorcida da tese original.",
          "Explicar fielmente a tese antes de responder.",
          "Testar uma previsão produzida pela tese."
        ],
        "correct": 0,
        "why": "O argumento atacado deixa de coincidir com a posição real."
      },
      {
        "question": "Um político conhecido apoia um método médico, sem apresentar estudos. O que falta?",
        "options": [
          "Evidência médica relevante e verificável.",
          "Uma plateia maior para a declaração.",
          "Uma frase mais memorável."
        ],
        "correct": 0,
        "why": "Notoriedade pública não substitui competência e dados clínicos."
      },
      {
        "question": "Quando pode ser relevante discutir a credibilidade de uma pessoa?",
        "options": [
          "Quando seu testemunho é a principal fonte de informação contestada.",
          "Sempre que não se concorda com a conclusão.",
          "Quando o assunto envolve matemática demonstrada independentemente."
        ],
        "correct": 0,
        "why": "Confiabilidade da fonte importa quando a alegação depende dela."
      },
      {
        "question": "A maioria dos alunos prefere aulas à tarde. O dado é especialmente relevante para:",
        "options": [
          "Descrever uma preferência dos alunos consultados.",
          "Provar que aprender à tarde causa melhores notas.",
          "Demonstrar uma verdade matemática."
        ],
        "correct": 0,
        "why": "Popularidade pode medir preferências, não estabelecer qualquer fato."
      }
    ]
  },
  "falacias_pressupostos": {
    "lead": "Como uma conclusão pode ultrapassar o que as premissas permitem?",
    "theory": "“Ou aprovamos exatamente este projeto, ou a escola jamais terá melhorias.” A frase apresenta duas alternativas como se esgotassem todas as possibilidades. Mas a escola pode revisar o projeto, adotar medidas parciais ou criar outro plano. Sem demonstrar que as opções são exaustivas, o dilema é falso. O problema não está na forma “ou A ou B” por si só. Há situações de alternativas realmente excludentes e exaustivas. O erro aparece quando o conjunto de opções foi estreitado sem justificativa suficiente.\n\nNa petição de princípio, a justificativa pressupõe aquilo que deveria estabelecer: “Este regulamento é justo porque estabelece regras justas”. O adjetivo foi repetido, mas não se apresentou critério independente de justiça. Muitas circularidades são menos visíveis porque a mesma ideia aparece com outras palavras. Uma boa investigação procura razões que possam ser avaliadas sem já aceitar a conclusão. Por exemplo, comparar transparência, critérios uniformes e possibilidade de recurso oferece informações que podem apoiar ou criticar o regulamento.\n\nUma palavra pode mudar de sentido durante o argumento. Dizer que “o banco está fechado; logo, ninguém pode sentar no banco” troca uma instituição financeira por um assento. A aparência da mesma palavra não preserva a identidade do conceito. Também é comum tirar conclusões amplas de exemplos selecionados: “Conheci dois funcionários desatenciosos; todos os funcionários desse setor são assim”. Mesmo relatos verdadeiros não descrevem automaticamente toda a população. É preciso examinar a amostra, as condições e explicações alternativas.\n\nNum declive escorregadio, uma decisão inicial é apresentada como causa inevitável de uma série de consequências graves, sem que os elos estejam demonstrados. “Se aceitarmos uma falta justificada, ninguém mais respeitará regras” omite mecanismos e evidências sobre os passos seguintes. Nem toda previsão de efeitos em cadeia é falaciosa: em alguns contextos há processos bem documentados. A questão é perguntar que evidências sustentam cada passagem e quais mecanismos podem interromper o resultado previsto.",
    "example": "“Ou proibimos celulares em todas as situações, ou ninguém mais aprenderá.”",
    "steps": [
      "A frase opõe proibição total a fracasso completo da aprendizagem.",
      "Pode haver restrições em avaliações e atividades que exijam concentração, com usos pedagógicos previstos.",
      "Compare políticas de uso, objetivos pedagógicos, efeitos observados e exceções."
    ],
    "quiz": [
      {
        "question": "Na petição de princípio, a justificativa:",
        "options": [
          "Já pressupõe a conclusão que deveria fundamentar.",
          "Usa um exemplo independente da conclusão.",
          "Oferece um teste que poderia refutar a tese."
        ],
        "correct": 0,
        "why": "A circularidade impede que a premissa ofereça sustentação independente."
      },
      {
        "question": "Um professor diz “esta regra é correta porque é a regra certa”. Qual problema?",
        "options": [
          "Justificativa circular.",
          "Contraexemplo decisivo.",
          "Amostragem aleatória."
        ],
        "correct": 0,
        "why": "A mesma avaliação é repetida sem um critério independente."
      },
      {
        "question": "Duas experiências ruins justificam afirmar que todas as pessoas de um grupo são iguais?",
        "options": [
          "Não: faltam dados representativos para uma generalização ampla.",
          "Sim: dois casos são sempre suficientes.",
          "Sim, se os relatos forem emocionantes."
        ],
        "correct": 0,
        "why": "Casos reais não garantem representatividade."
      },
      {
        "question": "Qual exigência fortalece uma previsão de consequências sucessivas?",
        "options": [
          "Explicitar e apoiar com evidências os mecanismos entre os passos.",
          "Multiplicar consequências assustadoras sem dados.",
          "Tratar cada possibilidade como inevitável."
        ],
        "correct": 0,
        "why": "A cadeia causal precisa de elos justificáveis."
      }
    ]
  },
  "vieses_julgamento": {
    "lead": "Por que avaliamos informações semelhantes de maneiras diferentes?",
    "theory": "Ao pesquisar se um bairro é perigoso, uma pessoa pode se lembrar de um caso recente amplamente noticiado e supor que crimes sejam muito frequentes. A facilidade com que um exemplo vem à mente não informa, por si, a proporção real de ocorrências. Essa é uma manifestação possível da heurística de disponibilidade. Heurísticas são atalhos cognitivos úteis em muitas decisões rápidas. Tornam-se problemáticas quando substituem uma verificação necessária. O objetivo não é eliminar a intuição, mas perceber em quais julgamentos ela exige confirmação independente.\n\nImagine que duas turmas respondam à pergunta “qual é o preço justo desta bicicleta?”, mas antes uma turma veja R$ 200 e a outra R$ 2.000. Mesmo quando os números são arbitrários, podem influenciar as estimativas posteriores: esse é o efeito de ancoragem. Para reduzir o risco, busque referências independentes e faça uma estimativa antes de consultar valores apresentados por interessados. Uma âncora não prova que uma decisão esteja errada; ela indica uma influência que precisa ser examinada.\n\nO viés de confirmação pode aparecer quando procuramos apenas notícias favoráveis à opinião inicial, damos mais importância a exemplos que a apoiam ou explicamos de forma desigual as exceções contrárias. O problema não é ter uma hipótese, mas tratá-la como blindada contra revisão. Uma prática útil é registrar antecipadamente qual observação nos faria mudar de opinião. Compare previsões de hipóteses rivais e procure fontes independentes capazes de contestar sua preferência inicial.\n\nUma mesma cirurgia pode ser descrita como “90% de sobrevivência” ou “10% de mortalidade”. As proporções são equivalentes, mas a moldura positiva ou negativa pode mudar a reação das pessoas. Isso é o efeito de enquadramento. Para examinar a escolha, traduza ambas as descrições para a mesma base de comparação, inclua o horizonte temporal e considere as alternativas. Uma decisão ponderada deve depender dos fatos, não apenas da forma como foram anunciados.",
    "example": "Duas lojas anunciam a mesma bicicleta. A primeira mostra “de R$ 4.000 por R$ 2.200”; a segunda informa apenas “R$ 2.200”.",
    "steps": [
      "O valor inicial de R$ 4.000 funciona como referência para julgar R$ 2.200.",
      "Pesquise bicicletas com características semelhantes, estado de conservação e garantia.",
      "“R$ 2.200 pode ser um bom preço, mas o desconto anunciado não basta para demonstrá-lo.”"
    ],
    "quiz": [
      {
        "question": "A disponibilidade faz com que um evento pareça mais provável quando:",
        "options": [
          "Exemplos dele vêm facilmente à memória.",
          "Sua frequência foi medida numa amostra aleatória.",
          "Sua taxa foi comparada com a população inteira."
        ],
        "correct": 0,
        "why": "Lembrança fácil não mede frequência populacional."
      },
      {
        "question": "O viés de confirmação aparece ao:",
        "options": [
          "Buscar apenas evidências favoráveis à hipótese preferida.",
          "Procurar resultados que poderiam contradizê-la.",
          "Comparar explicações alternativas."
        ],
        "correct": 0,
        "why": "A seleção desigual protege a crença inicial."
      },
      {
        "question": "Em uma estimativa de preço, o que pode funcionar como âncora?",
        "options": [
          "Um número apresentado antes da avaliação.",
          "A pesquisa independente de mercado.",
          "O cálculo dos custos de produção."
        ],
        "correct": 0,
        "why": "A referência inicial pode deslocar estimativas."
      },
      {
        "question": "Como avaliar dois enquadramentos percentuais equivalentes?",
        "options": [
          "Reescrever ambos na mesma base e horizonte temporal.",
          "Escolher aquele que provoca mais alívio.",
          "Somar os percentuais como se fossem eventos independentes."
        ],
        "correct": 0,
        "why": "A comparação deve padronizar o significado dos números."
      }
    ]
  },
  "vieses_decisao": {
    "lead": "Por que decisões ruins persistem mesmo diante de novas informações?",
    "theory": "Você pagou antecipadamente por um curso que deixou de atender seus objetivos. Continuar apenas para “não desperdiçar o dinheiro” pode ser a falácia do custo irrecuperável: o pagamento já ocorreu e não pode ser recuperado por permanecer. A decisão atual deveria comparar benefícios e custos futuros das opções. Isso não quer dizer que compromissos nunca devam ser mantidos. Podem existir custos de desistência, deveres assumidos ou benefícios futuros reais. O erro é tratar o gasto passado, isoladamente, como razão suficiente para continuar.\n\nAlguém afirma ter 95% de certeza em dezenas de previsões. Se só acerta 60% delas, está mal calibrado: a confiança declarada supera a taxa observada. A confiança não é inútil, mas pode ser examinada empiricamente. Registre previsões com níveis de confiança e compare resultados ao longo do tempo. Para decisões importantes, peça estimativas alternativas e explicite o que poderia surpreendê-lo.\n\nDepois que uma eleição termina, é fácil dizer “eu sempre soube quem venceria”. O viés retrospectivo pode fazer um resultado parecer mais previsível do que era no momento da decisão. Documentar previsões antes dos fatos ajuda a distinguir memória reconstruída de avaliação anterior. O efeito halo é diferente: uma característica positiva de alguém, como simpatia, influencia julgamentos sobre capacidades não observadas. Ser agradável pode contar numa interação, mas não prova competência técnica em todas as áreas.\n\nUma coleção de histórias de empresários bem-sucedidos pode incentivar a crença de que certo hábito garante sucesso. Mas a seleção reúne apenas quem permaneceu visível. As pessoas que tentaram o mesmo hábito e fracassaram ficaram de fora: é uma forma de viés de sobrevivência. Para melhorar a decisão, procure tanto sucessos quanto fracassos, defina a população original e evite usar apenas relatos selecionados pelo resultado. Relatos individuais podem inspirar hipóteses, mas não estimam a probabilidade de êxito.",
    "example": "Uma empresa investiu R$ 100 mil num aplicativo. Novos testes mostram baixa demanda; continuar custaria mais R$ 80 mil.",
    "steps": [
      "Os R$ 100 mil já foram despendidos e não retornam simplesmente porque a empresa continua.",
      "Compare projeções realistas de receita, alternativas para os funcionários e possível reutilização de tecnologia.",
      "“Precisamos investir mais porque já gastamos muito” não apresenta benefício novo."
    ],
    "quiz": [
      {
        "question": "Qual raciocínio revela custo irrecuperável?",
        "options": [
          "Continuar só porque já se gastou muito.",
          "Reavaliar benefícios futuros e despesas futuras.",
          "Encerrar um projeto após testes negativos."
        ],
        "correct": 0,
        "why": "O gasto passado não pode ser recuperado apenas pela continuidade."
      },
      {
        "question": "Uma pessoa diz estar 90% certa em 50 previsões, mas acerta 55%. O que suspeitar?",
        "options": [
          "Excesso de confiança ou má calibração.",
          "Comprovação de previsão perfeita.",
          "Ausência de possibilidade de comparar previsões."
        ],
        "correct": 0,
        "why": "Confiança alta e taxa de acerto substancialmente menor indicam má calibração."
      },
      {
        "question": "O viés retrospectivo faz um resultado passado parecer:",
        "options": [
          "Mais previsível depois que já é conhecido.",
          "Menos plausível para todas as pessoas.",
          "Dependente apenas de cálculos corretos."
        ],
        "correct": 0,
        "why": "Conhecer o resultado altera a reconstrução da certeza anterior."
      },
      {
        "question": "Qual dado falta em uma coleção de histórias de vencedores?",
        "options": [
          "Os casos de pessoas que tentaram e não venceram.",
          "O número de elogios recebidos pelos vencedores.",
          "A cor favorita das pessoas entrevistadas."
        ],
        "correct": 0,
        "why": "Selecionar apenas sobreviventes distorce as frequências."
      }
    ]
  },
  "ilusoes_graficos": {
    "lead": "Como números verdadeiros podem produzir uma impressão enganosa?",
    "theory": "Uma manchete anuncia que 80% dos participantes aprovaram um projeto. Antes de interpretar, pergunte: participantes de quê? Se apenas vinte pessoas responderam a uma enquete opcional, a fração descreve essas vinte respostas, não necessariamente toda a cidade. Um percentual sem população, tamanho da amostra e período pode ser matematicamente correto e ainda conduzir a uma inferência indevida. Na leitura de dados, registre sempre o numerador, o denominador e o grupo de referência.\n\nUm tratamento reduz a ocorrência de um evento de 2 em 100 pessoas para 1 em 100. A redução absoluta é de 1 ponto percentual; a redução relativa é de 50%, porque o risco caiu pela metade. Nenhuma medida é falsa, mas elas respondem a perguntas distintas. Comunicar apenas a redução relativa pode sugerir impacto maior sem mencionar a raridade inicial do evento. Uma apresentação transparente informa os dois riscos, o intervalo de tempo e, quando possível, a incerteza da estimativa.\n\nSe duas vendas mensais foram 98 e 102 unidades, um gráfico de barras cujo eixo vertical começa em 97 fará parecer enorme uma diferença pequena. Barras normalmente se interpretam pela extensão desde um ponto de referência; truncar o eixo pode distorcer sua comparação visual. Nem todo gráfico precisa começar em zero: linhas para variações pequenas podem exigir escalas estreitas. A escolha adequada depende do tipo de gráfico e da pergunta, mas o intervalo dos eixos deve ser explícito e não mascarar as magnitudes.\n\nUma quantidade aumenta 20% e depois cai 20%. Se partiu de 100, chega a 120 e termina em 96, não em 100. A segunda mudança é calculada sobre um denominador diferente. Por isso, variações sucessivas exigem multiplicação, não cancelamento intuitivo. Um leitor criterioso reconstitui as contagens ou os valores de origem. Recalcular pequenos exemplos ajuda a perceber erros que um gráfico atraente ou uma manchete impactante podem esconder.",
    "example": "Um tratamento apresenta risco de 2% no grupo de referência e 1% no grupo tratado durante o mesmo período.",
    "steps": [
      "Em cada 100 pessoas, são 2 casos no grupo de referência e 1 no grupo tratado.",
      "2% − 1% = 1 ponto percentual, equivalente a um caso evitado por 100 pessoas na comparação ilustrativa.",
      "(2% − 1%) ÷ 2% = 50%, isto é, metade do risco inicial."
    ],
    "quiz": [
      {
        "question": "Uma notícia apresenta 70%, mas omite o total de respondentes. O que falta?",
        "options": [
          "O denominador e a composição da amostra.",
          "Uma cor mais forte para a barra.",
          "Mais casas decimais no percentual."
        ],
        "correct": 0,
        "why": "Sem base, não sabemos a quem o resultado se aplica."
      },
      {
        "question": "Uma taxa sobe de 10% para 15%. Qual é o aumento em pontos percentuais?",
        "options": [
          "5 pontos percentuais.",
          "50 pontos percentuais.",
          "15 pontos percentuais."
        ],
        "correct": 0,
        "why": "15 − 10 = 5 pontos percentuais."
      },
      {
        "question": "Em barras comparando 98 e 102, qual escolha pode ampliar visualmente a diferença?",
        "options": [
          "Iniciar o eixo em 97 sem deixar clara a escala.",
          "Usar barras iniciadas em zero.",
          "Informar as duas contagens junto às barras."
        ],
        "correct": 0,
        "why": "A escala estreita altera fortemente o comprimento visível das barras."
      },
      {
        "question": "Após aumentar 20% e diminuir 20% de 100, o resultado é:",
        "options": [
          "96.",
          "100.",
          "104."
        ],
        "correct": 0,
        "why": "Após o aumento, 100 vira 120; aplicar uma queda de 20% sobre 120 produz 96, porque os percentuais usam bases diferentes."
      }
    ]
  },
  "ilusoes_inferencia": {
    "lead": "Por que uma tendência pode se inverter quando reorganizamos os dados?",
    "theory": "Considere duas clínicas com pacientes de gravidade diferente. Uma clínica pode ter taxas de recuperação maiores tanto nos casos leves quanto nos graves, mas apresentar taxa total menor por atender proporcionalmente mais casos graves. Essa inversão possível é conhecida como paradoxo de Simpson. Não basta comparar o resultado agregado. Identifique os subgrupos, seus tamanhos e os fatores relacionados tanto à escolha do atendimento quanto ao prognóstico. A estratificação não prova causalidade, mas pode revelar uma associação escondida.\n\nUma empresa pergunta a clientes que concluíram uma compra se o processo foi fácil e encontra 95% de aprovação. Pessoas que desistiram por dificuldades nunca responderam. O resultado pode descrever bem os compradores finais e, ainda assim, falhar como medida de toda a experiência de compra. O viés de seleção depende do mecanismo pelo qual os casos entram na análise. Amostras grandes não corrigem automaticamente a exclusão sistemática de grupos. Declare quem ficou fora e o que se pretende generalizar.\n\nUma turma obtém uma nota excepcionalmente baixa numa prova difícil. Na próxima avaliação, a média sobe. Parte da mudança pode ocorrer porque medidas extremas contêm flutuações que nem sempre se repetem: isso é regressão à média, não prova automática de que uma intervenção funcionou. Para avaliar efeitos, compare grupos adequados, séries de medidas e condições de aplicação. Uma melhora após um resultado extremo exige mais evidência antes de ser atribuída a uma causa específica.\n\nSe uma equipe testa dezenas de hipóteses sem ajustes, algumas podem parecer estatisticamente significativas por acaso, mesmo na ausência de efeitos reais. Escolher depois apenas os resultados positivos dá uma impressão distorcida do conjunto da pesquisa. Registre hipóteses previamente, informe o número de análises realizadas e procure replicação independente. Um valor de p não mede diretamente a probabilidade de a hipótese ser verdadeira e não dispensa avaliação de tamanho do efeito, desenho e qualidade dos dados.",
    "example": "Na clínica A, recuperam-se 90 de 100 casos leves e 10 de 20 graves. Na clínica B, 19 de 20 leves e 90 de 150 graves.",
    "steps": [
      "A: 90% dos leves e 50% dos graves; B: 95% dos leves e 60% dos graves.",
      "A: 100 recuperações em 120 pessoas (83,3%); B: 109 em 170 (64,1%).",
      "B lidera em cada estrato, mas A lidera no total pela distribuição de gravidade."
    ],
    "quiz": [
      {
        "question": "O paradoxo de Simpson envolve:",
        "options": [
          "Associações por grupo que podem mudar ou inverter no agregado.",
          "Qualquer cálculo com duas porcentagens iguais.",
          "A proibição de comparar médias."
        ],
        "correct": 0,
        "why": "As ponderações dos grupos podem inverter tendências."
      },
      {
        "question": "Uma pesquisa reúne apenas compradores satisfeitos que responderam. Qual risco?",
        "options": [
          "Viés de seleção dos respondentes.",
          "Erro lógico na multiplicação de matrizes.",
          "Aleatoriedade garantida da amostra."
        ],
        "correct": 0,
        "why": "A seleção condicionada ao desfecho pode distorcer a estimativa geral."
      },
      {
        "question": "Uma nota muito baixa foi seguida de nota média. A melhora prova intervenção eficaz?",
        "options": [
          "Não, pode haver regressão à média e outras mudanças.",
          "Sim, a sequência temporal identifica a causa.",
          "Sim, uma medição basta para descartar o acaso."
        ],
        "correct": 0,
        "why": "Uma mudança após um extremo não isola uma causa."
      },
      {
        "question": "Após testar 40 hipóteses e publicar só um resultado favorável, surge risco de:",
        "options": [
          "Selecionar um achado fortuito entre muitos testes.",
          "Demonstrar que a hipótese selecionada é verdadeira.",
          "Eliminar completamente erros amostrais."
        ],
        "correct": 0,
        "why": "Muitas análises sem transparência elevam o risco de falso destaque."
      }
    ]
  },
  "oficina_erros": {
    "lead": "Como integrar análise de argumentos, psicologia do julgamento e leitura estatística?",
    "theory": "Uma empresa anuncia: “Nosso programa é aprovado por quase todos e melhora o desempenho em 60%. Quem discorda ignora a ciência”. São três tipos de afirmações misturadas: popularidade, efeito quantitativo e uma tentativa de desqualificar críticos. Antes de rotular falácias, separe cada tese e o que seria necessário para sustentá-la. Escreva: qual população foi estudada? Qual é o resultado medido? O que significa “melhora em 60%”? Existe grupo de comparação? A voz confiante do anúncio não resolve essas perguntas.\n\nPergunte se as razões são pertinentes e se há opções omitidas. A frase “quem discorda ignora a ciência” pode ser um ataque retórico, mas o diagnóstico depende de seu papel no argumento e de quais evidências científicas efetivamente existem. Em vez de responder com outra etiqueta, reconstrua a versão mais forte da alegação e identifique o teste que poderia apoiá-la ou enfraquecê-la. Argumentar bem inclui formular objeções proporcionais, não presumir má-fé.\n\nSe os 60% vieram de uma pesquisa voluntária entre clientes que concluíram o programa, o dado pode não representar os desistentes. Se significam que uma nota passou de 5 para 8 pontos, houve aumento relativo de 60%, mas de 3 pontos absolutos: outras interpretações seriam incorretas. É importante verificar se o número se refere a uma média, a um risco, a um percentual de participantes ou a uma comparação com outro grupo. Sem denominadores, período e método, o grau de certeza não pode ser estabelecido.\n\nUma conclusão prudente seria: “Entre participantes que responderam, houve melhora relatada; ainda não sabemos quanto foi causado pelo programa nem se o resultado vale para toda a população”. Isso preserva o dado disponível sem exagerar seu alcance. Finalmente, indique como avançar: comparar grupos adequados, incluir desistentes, pré-definir indicadores e publicar resultados desfavoráveis. O objetivo da oficina não é vencer uma discussão, mas produzir uma avaliação que possa ser revista à luz de novas evidências.",
    "example": "Anúncio fictício: “Nossa escola melhorou o desempenho em 50%; 9 em 10 alunos entrevistados recomendam o método. Quem discorda não entende educação.”",
    "steps": [
      "Há um crescimento anunciado, um resultado de enquete e uma crítica aos discordantes.",
      "Se a média passou de 40 para 60, o aumento relativo é de 50%; mas é preciso verificar escala, comparação e quem respondeu à enquete.",
      "“Foi informado aumento relativo de 50% e aprovação de 90% dos entrevistados; faltam método e grupo comparável para atribuir o efeito à escola.”"
    ],
    "quiz": [
      {
        "question": "Uma reportagem mistura argumento pessoal e taxas corretas. A melhor atitude é:",
        "options": [
          "Examinar separadamente a relevância das razões e o alcance dos números.",
          "Descartar todos os dados por conter retórica.",
          "Aceitar a conclusão porque a taxa foi calculada corretamente."
        ],
        "correct": 0,
        "why": "Problemas diferentes exigem diagnósticos diferentes."
      },
      {
        "question": "O que um relatório crítico deve preservar?",
        "options": [
          "O que os dados sustentam e o que permanece incerto.",
          "A certeza máxima de uma conclusão atraente.",
          "A intenção presumida de quem apresentou a pesquisa."
        ],
        "correct": 0,
        "why": "A conclusão deve acompanhar o alcance das evidências."
      },
      {
        "question": "Uma enquete reúne só pessoas que concluíram um curso. O limite é:",
        "options": [
          "Não representar automaticamente os que abandonaram.",
          "Impossibilidade de descrever os próprios respondentes.",
          "Prova de eficácia causal entre os respondentes."
        ],
        "correct": 0,
        "why": "A seleção pode excluir experiências relevantes."
      },
      {
        "question": "Qual passo ajuda a avaliar causalidade alegada?",
        "options": [
          "Comparar resultados sob condições semelhantes e considerar confundidores.",
          "Procurar apenas testemunhos favoráveis.",
          "Repetir a porcentagem sem indicar o grupo."
        ],
        "correct": 0,
        "why": "Uma comparação adequada é necessária para separar efeito e alternativas."
      }
    ]
  }
};
export const ERROR_READINGS={
  "falacias_relevancia": {
    "objective": "Separar a tese, suas razões e a relevância da evidência; reconhecer ataques pessoais irrelevantes, espantalhos, apelos à popularidade e usos indevidos da autoridade.",
    "sections": [
      {
        "heading": "O argumento deve ser avaliado pelas razões",
        "paragraphs": [
          "Considere uma reunião escolar em que alguém propõe ampliar o horário da biblioteca. Outra pessoa responde: “Não levem essa proposta a sério; quem sugeriu costuma chegar atrasado.” Essa resposta tenta diminuir a credibilidade de quem fala, mas não informa se o horário ampliado seria viável ou útil. A pessoa pode ser impontual e, ainda assim, apresentar um bom argumento.",
          "Em lógica, buscamos a ligação entre as premissas e a conclusão. Em debates cotidianos, também precisamos perguntar se a razão apresentada é pertinente e suficientemente apoiada. Uma fala persuasiva não se torna uma boa justificativa apenas por provocar uma reação forte."
        ]
      },
      {
        "heading": "Ataques, distorções e distrações",
        "paragraphs": [
          "O ataque pessoal é irrelevante quando se usa uma característica do interlocutor para rejeitar uma tese que deveria ser avaliada por seus méritos. Isso não proíbe considerar conflitos de interesse ou credibilidade quando o testemunho da pessoa é justamente a evidência em discussão: a pertinência depende do caso.",
          "O espantalho modifica a posição alheia para torná-la mais fácil de atacar. Por exemplo, de “a escola deveria oferecer uma opção de refeição vegetariana” para “você quer proibir todo mundo de comer carne”. A resposta combate uma proposta mais radical que a original. Uma distração argumentativa desloca a conversa para um assunto que não resolve a pergunta inicial."
        ]
      },
      {
        "heading": "Popularidade e autoridade não bastam por si sós",
        "paragraphs": [
          "A afirmação “a maioria acredita nisso, portanto é verdade” confunde aceitação social com confirmação. Muitas pessoas podem concordar sobre um fato e, ainda assim, estar enganadas. A popularidade pode ser relevante para medir preferências, mas não é prova geral de correção factual.",
          "Consultar especialistas é razoável quando a área de competência é pertinente, há bons métodos e existe convergência das evidências. O erro ocorre quando se invoca fama, título fora da especialidade ou autoridade como substituto de razões verificáveis. Pergunte: quem sabe o quê, em que condições e com quais provas?"
        ]
      },
      {
        "heading": "Reconstrua antes de classificar",
        "paragraphs": [
          "Não procure uma etiqueta isolada em cada frase. Escreva a conclusão com suas próprias palavras; depois liste as razões realmente dadas. Compare o que a pessoa afirma com a versão criticada e identifique a relação entre as evidências e a tese.",
          "Uma resposta responsável aponta a dificuldade específica: “essa informação sobre o autor não decide a questão” ou “a posição citada não corresponde ao que foi proposto”. Identificar a falácia é útil quando conduz a uma discussão mais precisa, não quando serve para encerrar o debate."
        ]
      }
    ],
    "misconception": "Não é falácia citar um especialista ou criticar a credibilidade de uma testemunha em qualquer situação. O defeito surge quando a referência é inadequada ou não sustenta a conclusão.",
    "summary": "Avalie relevância, fidelidade à tese original e qualidade da evidência antes de aceitar a força retórica de um argumento.",
    "check": {
      "question": "Alguém rebate “oferecer uma opção vegetariana” dizendo “você quer proibir carne”. Qual foi a falha?",
      "options": [
        "Deturpou a proposta para combater uma versão extrema.",
        "Mostrou que a proposta é logicamente contraditória.",
        "Demonstrou que não existe demanda pela opção."
      ],
      "correct": 0,
      "why": "A crítica substituiu a proposta original por outra mais radical."
    }
  },
  "falacias_pressupostos": {
    "objective": "Identificar falso dilema, circularidade, equivocações, generalização precipitada e encadeamentos causais não justificados, buscando alternativas e premissas faltantes.",
    "sections": [
      {
        "heading": "Uma pergunta pode esconder opções omitidas",
        "paragraphs": [
          "“Ou aprovamos exatamente este projeto, ou a escola jamais terá melhorias.” A frase apresenta duas alternativas como se esgotassem todas as possibilidades. Mas a escola pode revisar o projeto, adotar medidas parciais ou criar outro plano. Sem demonstrar que as opções são exaustivas, o dilema é falso.",
          "O problema não está na forma “ou A ou B” por si só. Há situações de alternativas realmente excludentes e exaustivas. O erro aparece quando o conjunto de opções foi estreitado sem justificativa suficiente."
        ]
      },
      {
        "heading": "A conclusão não pode provar a si mesma",
        "paragraphs": [
          "Na petição de princípio, a justificativa pressupõe aquilo que deveria estabelecer: “Este regulamento é justo porque estabelece regras justas”. O adjetivo foi repetido, mas não se apresentou critério independente de justiça. Muitas circularidades são menos visíveis porque a mesma ideia aparece com outras palavras.",
          "Uma boa investigação procura razões que possam ser avaliadas sem já aceitar a conclusão. Por exemplo, comparar transparência, critérios uniformes e possibilidade de recurso oferece informações que podem apoiar ou criticar o regulamento."
        ]
      },
      {
        "heading": "Palavras ambíguas e generalizações frágeis",
        "paragraphs": [
          "Uma palavra pode mudar de sentido durante o argumento. Dizer que “o banco está fechado; logo, ninguém pode sentar no banco” troca uma instituição financeira por um assento. A aparência da mesma palavra não preserva a identidade do conceito.",
          "Também é comum tirar conclusões amplas de exemplos selecionados: “Conheci dois funcionários desatenciosos; todos os funcionários desse setor são assim”. Mesmo relatos verdadeiros não descrevem automaticamente toda a população. É preciso examinar a amostra, as condições e explicações alternativas."
        ]
      },
      {
        "heading": "Encadeamentos não são inevitabilidades",
        "paragraphs": [
          "Num declive escorregadio, uma decisão inicial é apresentada como causa inevitável de uma série de consequências graves, sem que os elos estejam demonstrados. “Se aceitarmos uma falta justificada, ninguém mais respeitará regras” omite mecanismos e evidências sobre os passos seguintes.",
          "Nem toda previsão de efeitos em cadeia é falaciosa: em alguns contextos há processos bem documentados. A questão é perguntar que evidências sustentam cada passagem e quais mecanismos podem interromper o resultado previsto."
        ]
      }
    ],
    "misconception": "Uma previsão pessimista não é automaticamente falaciosa; ela se torna frágil quando seus elos ou a exclusão de alternativas não têm sustentação.",
    "summary": "Examine as alternativas omitidas, a independência das razões, o sentido dos termos e a amplitude da conclusão em relação às evidências.",
    "check": {
      "question": "“Ou cancelamos todas as excursões ou os alunos nunca estarão seguros.” O que verificar primeiro?",
      "options": [
        "Se há outras medidas de segurança entre esses extremos.",
        "Se a frase foi dita com convicção.",
        "Se excursões já existiam antes."
      ],
      "correct": 0,
      "why": "O enunciado descarta soluções intermediárias sem demonstrar que são inviáveis ou impossíveis; é preciso verificar alternativas."
    }
  },
  "vieses_julgamento": {
    "objective": "Reconhecer ancoragem, disponibilidade, confirmação e enquadramento, distinguindo heurística útil de distorção e praticando procedimentos de verificação.",
    "sections": [
      {
        "heading": "Nossa atenção seleciona evidências",
        "paragraphs": [
          "Ao pesquisar se um bairro é perigoso, uma pessoa pode se lembrar de um caso recente amplamente noticiado e supor que crimes sejam muito frequentes. A facilidade com que um exemplo vem à mente não informa, por si, a proporção real de ocorrências. Essa é uma manifestação possível da heurística de disponibilidade.",
          "Heurísticas são atalhos cognitivos úteis em muitas decisões rápidas. Tornam-se problemáticas quando substituem uma verificação necessária. O objetivo não é eliminar a intuição, mas perceber em quais julgamentos ela exige confirmação independente."
        ]
      },
      {
        "heading": "A primeira informação pode puxar a estimativa",
        "paragraphs": [
          "Imagine que duas turmas respondam à pergunta “qual é o preço justo desta bicicleta?”, mas antes uma turma veja R$ 200 e a outra R$ 2.000. Mesmo quando os números são arbitrários, podem influenciar as estimativas posteriores: esse é o efeito de ancoragem.",
          "Para reduzir o risco, busque referências independentes e faça uma estimativa antes de consultar valores apresentados por interessados. Uma âncora não prova que uma decisão esteja errada; ela indica uma influência que precisa ser examinada."
        ]
      },
      {
        "heading": "Preferir informações que concordam conosco",
        "paragraphs": [
          "O viés de confirmação pode aparecer quando procuramos apenas notícias favoráveis à opinião inicial, damos mais importância a exemplos que a apoiam ou explicamos de forma desigual as exceções contrárias. O problema não é ter uma hipótese, mas tratá-la como blindada contra revisão.",
          "Uma prática útil é registrar antecipadamente qual observação nos faria mudar de opinião. Compare previsões de hipóteses rivais e procure fontes independentes capazes de contestar sua preferência inicial."
        ]
      },
      {
        "heading": "A apresentação altera a escolha",
        "paragraphs": [
          "Uma mesma cirurgia pode ser descrita como “90% de sobrevivência” ou “10% de mortalidade”. As proporções são equivalentes, mas a moldura positiva ou negativa pode mudar a reação das pessoas. Isso é o efeito de enquadramento.",
          "Para examinar a escolha, traduza ambas as descrições para a mesma base de comparação, inclua o horizonte temporal e considere as alternativas. Uma decisão ponderada deve depender dos fatos, não apenas da forma como foram anunciados."
        ]
      }
    ],
    "misconception": "Viés não significa que toda escolha influenciada seja falsa. Uma influência psicológica deve ser distinguida da qualidade objetiva dos dados e da decisão.",
    "summary": "Antes de aceitar uma impressão, verifique taxas reais, produza referências independentes, procure contraevidências e compare enquadramentos equivalentes.",
    "check": {
      "question": "Um anúncio afirma “90% de sobrevivência”; outro diz “10% de mortalidade”, para o mesmo prazo. O que fazer?",
      "options": [
        "Reconhecer a equivalência e comparar as demais evidências.",
        "Concluir que o segundo tratamento é pior.",
        "Escolher a frase que parece mais tranquilizadora."
      ],
      "correct": 0,
      "why": "As duas porcentagens descrevem o mesmo resultado com enquadramentos diferentes."
    }
  },
  "vieses_decisao": {
    "objective": "Analisar custo irrecuperável, excesso de confiança, retrospectiva, halo e sobrevivência; aplicar critérios prospectivos de decisão e calibração.",
    "sections": [
      {
        "heading": "Custos passados não são benefícios futuros",
        "paragraphs": [
          "Você pagou antecipadamente por um curso que deixou de atender seus objetivos. Continuar apenas para “não desperdiçar o dinheiro” pode ser a falácia do custo irrecuperável: o pagamento já ocorreu e não pode ser recuperado por permanecer. A decisão atual deveria comparar benefícios e custos futuros das opções.",
          "Isso não quer dizer que compromissos nunca devam ser mantidos. Podem existir custos de desistência, deveres assumidos ou benefícios futuros reais. O erro é tratar o gasto passado, isoladamente, como razão suficiente para continuar."
        ]
      },
      {
        "heading": "Confiança deve acompanhar evidência",
        "paragraphs": [
          "Alguém afirma ter 95% de certeza em dezenas de previsões. Se só acerta 60% delas, está mal calibrado: a confiança declarada supera a taxa observada. A confiança não é inútil, mas pode ser examinada empiricamente.",
          "Registre previsões com níveis de confiança e compare resultados ao longo do tempo. Para decisões importantes, peça estimativas alternativas e explicite o que poderia surpreendê-lo."
        ]
      },
      {
        "heading": "Resultados conhecidos parecem inevitáveis",
        "paragraphs": [
          "Depois que uma eleição termina, é fácil dizer “eu sempre soube quem venceria”. O viés retrospectivo pode fazer um resultado parecer mais previsível do que era no momento da decisão. Documentar previsões antes dos fatos ajuda a distinguir memória reconstruída de avaliação anterior.",
          "O efeito halo é diferente: uma característica positiva de alguém, como simpatia, influencia julgamentos sobre capacidades não observadas. Ser agradável pode contar numa interação, mas não prova competência técnica em todas as áreas."
        ]
      },
      {
        "heading": "Quem não aparece na amostra também importa",
        "paragraphs": [
          "Uma coleção de histórias de empresários bem-sucedidos pode incentivar a crença de que certo hábito garante sucesso. Mas a seleção reúne apenas quem permaneceu visível. As pessoas que tentaram o mesmo hábito e fracassaram ficaram de fora: é uma forma de viés de sobrevivência.",
          "Para melhorar a decisão, procure tanto sucessos quanto fracassos, defina a população original e evite usar apenas relatos selecionados pelo resultado. Relatos individuais podem inspirar hipóteses, mas não estimam a probabilidade de êxito."
        ]
      }
    ],
    "misconception": "Desistir não é sempre racional; compromissos, custos futuros e benefícios podem importar. O erro é dar peso decisivo a um custo que não pode mais ser alterado.",
    "summary": "Decida com custos e benefícios futuros, calibre previsões, registre julgamentos antes dos resultados e inclua casos invisíveis na análise.",
    "check": {
      "question": "Você já pagou por um espetáculo, mas está doente. Qual informação é decisiva agora?",
      "options": [
        "Se ir ou descansar trará melhores consequências daqui em diante.",
        "Quanto o bilhete custou no passado, isoladamente.",
        "Se o espetáculo parece popular."
      ],
      "correct": 0,
      "why": "O gasto irrecuperável não muda os efeitos futuros das alternativas."
    }
  },
  "ilusoes_graficos": {
    "objective": "Interpretar denominadores, riscos absolutos e relativos, variações percentuais, escalas truncadas e gráficos, reconstruindo comparações proporcionais.",
    "sections": [
      {
        "heading": "O denominador muda a história",
        "paragraphs": [
          "Uma manchete anuncia que 80% dos participantes aprovaram um projeto. Antes de interpretar, pergunte: participantes de quê? Se apenas vinte pessoas responderam a uma enquete opcional, a fração descreve essas vinte respostas, não necessariamente toda a cidade.",
          "Um percentual sem população, tamanho da amostra e período pode ser matematicamente correto e ainda conduzir a uma inferência indevida. Na leitura de dados, registre sempre o numerador, o denominador e o grupo de referência."
        ]
      },
      {
        "heading": "Redução relativa e absoluta são medidas diferentes",
        "paragraphs": [
          "Um tratamento reduz a ocorrência de um evento de 2 em 100 pessoas para 1 em 100. A redução absoluta é de 1 ponto percentual; a redução relativa é de 50%, porque o risco caiu pela metade. Nenhuma medida é falsa, mas elas respondem a perguntas distintas.",
          "Comunicar apenas a redução relativa pode sugerir impacto maior sem mencionar a raridade inicial do evento. Uma apresentação transparente informa os dois riscos, o intervalo de tempo e, quando possível, a incerteza da estimativa."
        ]
      },
      {
        "heading": "Eixos e áreas podem ampliar diferenças",
        "paragraphs": [
          "Se duas vendas mensais foram 98 e 102 unidades, um gráfico de barras cujo eixo vertical começa em 97 fará parecer enorme uma diferença pequena. Barras normalmente se interpretam pela extensão desde um ponto de referência; truncar o eixo pode distorcer sua comparação visual.",
          "Nem todo gráfico precisa começar em zero: linhas para variações pequenas podem exigir escalas estreitas. A escolha adequada depende do tipo de gráfico e da pergunta, mas o intervalo dos eixos deve ser explícito e não mascarar as magnitudes."
        ]
      },
      {
        "heading": "Porcentagens não são sempre aditivas",
        "paragraphs": [
          "Uma quantidade aumenta 20% e depois cai 20%. Se partiu de 100, chega a 120 e termina em 96, não em 100. A segunda mudança é calculada sobre um denominador diferente. Por isso, variações sucessivas exigem multiplicação, não cancelamento intuitivo.",
          "Um leitor criterioso reconstitui as contagens ou os valores de origem. Recalcular pequenos exemplos ajuda a perceber erros que um gráfico atraente ou uma manchete impactante podem esconder."
        ]
      }
    ],
    "misconception": "Um gráfico com eixo não iniciado em zero não é automaticamente fraudulento; avalie o tipo de gráfico, a escala declarada e se o desenho induz comparação desproporcional.",
    "summary": "Sempre pergunte: quantos casos, de qual total, em qual período, com qual referência visual e com quais medidas absolutas?",
    "check": {
      "question": "O risco caiu de 2% para 1%. Qual a redução absoluta?",
      "options": [
        "1 ponto percentual.",
        "50 pontos percentuais.",
        "2 pontos percentuais."
      ],
      "correct": 0,
      "why": "A diferença absoluta entre os riscos é 2% − 1% = 1 ponto percentual."
    }
  },
  "ilusoes_inferencia": {
    "objective": "Avaliar agregações, paradoxo de Simpson, viés de seleção, regressão à média e testes múltiplos; separar associação de explicação causal.",
    "sections": [
      {
        "heading": "Um total pode esconder padrões entre grupos",
        "paragraphs": [
          "Considere duas clínicas com pacientes de gravidade diferente. Uma clínica pode ter taxas de recuperação maiores tanto nos casos leves quanto nos graves, mas apresentar taxa total menor por atender proporcionalmente mais casos graves. Essa inversão possível é conhecida como paradoxo de Simpson.",
          "Não basta comparar o resultado agregado. Identifique os subgrupos, seus tamanhos e os fatores relacionados tanto à escolha do atendimento quanto ao prognóstico. A estratificação não prova causalidade, mas pode revelar uma associação escondida."
        ]
      },
      {
        "heading": "A amostra observada pode excluir casos importantes",
        "paragraphs": [
          "Uma empresa pergunta a clientes que concluíram uma compra se o processo foi fácil e encontra 95% de aprovação. Pessoas que desistiram por dificuldades nunca responderam. O resultado pode descrever bem os compradores finais e, ainda assim, falhar como medida de toda a experiência de compra.",
          "O viés de seleção depende do mecanismo pelo qual os casos entram na análise. Amostras grandes não corrigem automaticamente a exclusão sistemática de grupos. Declare quem ficou fora e o que se pretende generalizar."
        ]
      },
      {
        "heading": "Resultados extremos tendem a variar",
        "paragraphs": [
          "Uma turma obtém uma nota excepcionalmente baixa numa prova difícil. Na próxima avaliação, a média sobe. Parte da mudança pode ocorrer porque medidas extremas contêm flutuações que nem sempre se repetem: isso é regressão à média, não prova automática de que uma intervenção funcionou.",
          "Para avaliar efeitos, compare grupos adequados, séries de medidas e condições de aplicação. Uma melhora após um resultado extremo exige mais evidência antes de ser atribuída a uma causa específica."
        ]
      },
      {
        "heading": "Muitos testes aumentam a chance de achados fortuitos",
        "paragraphs": [
          "Se uma equipe testa dezenas de hipóteses sem ajustes, algumas podem parecer estatisticamente significativas por acaso, mesmo na ausência de efeitos reais. Escolher depois apenas os resultados positivos dá uma impressão distorcida do conjunto da pesquisa.",
          "Registre hipóteses previamente, informe o número de análises realizadas e procure replicação independente. Um valor de p não mede diretamente a probabilidade de a hipótese ser verdadeira e não dispensa avaliação de tamanho do efeito, desenho e qualidade dos dados."
        ]
      }
    ],
    "misconception": "O paradoxo de Simpson não torna falsas as taxas por grupo ou a taxa agregada; mostra que elas respondem a perguntas diferentes e que a composição dos grupos importa.",
    "summary": "Investigue estratos e seus pesos, casos excluídos, variação de medidas extremas e quantas análises foram feitas antes de aceitar uma conclusão.",
    "check": {
      "question": "A clínica A atende mais casos graves que B. Por que comparar apenas as taxas totais de recuperação pode enganar?",
      "options": [
        "Porque a distribuição da gravidade pode alterar o resultado agregado.",
        "Porque números totais são sempre falsos.",
        "Porque qualquer estratificação elimina todo confundimento."
      ],
      "correct": 0,
      "why": "A gravidade influencia o prognóstico, e clínicas com composições diferentes podem ter totais enganosos apesar de taxas estratificadas melhores."
    }
  },
  "oficina_erros": {
    "objective": "Investigar textos e dados integrados, distinguindo falha argumentativa, influência cognitiva e descrição quantitativa; formular conclusões cuidadosas e testáveis.",
    "sections": [
      {
        "heading": "Comece pela pergunta que os dados deveriam responder",
        "paragraphs": [
          "Uma empresa anuncia: “Nosso programa é aprovado por quase todos e melhora o desempenho em 60%. Quem discorda ignora a ciência”. São três tipos de afirmações misturadas: popularidade, efeito quantitativo e uma tentativa de desqualificar críticos. Antes de rotular falácias, separe cada tese e o que seria necessário para sustentá-la.",
          "Escreva: qual população foi estudada? Qual é o resultado medido? O que significa “melhora em 60%”? Existe grupo de comparação? A voz confiante do anúncio não resolve essas perguntas."
        ]
      },
      {
        "heading": "Audite a argumentação, não a pessoa",
        "paragraphs": [
          "Pergunte se as razões são pertinentes e se há opções omitidas. A frase “quem discorda ignora a ciência” pode ser um ataque retórico, mas o diagnóstico depende de seu papel no argumento e de quais evidências científicas efetivamente existem.",
          "Em vez de responder com outra etiqueta, reconstrua a versão mais forte da alegação e identifique o teste que poderia apoiá-la ou enfraquecê-la. Argumentar bem inclui formular objeções proporcionais, não presumir má-fé."
        ]
      },
      {
        "heading": "Examine como a informação foi obtida",
        "paragraphs": [
          "Se os 60% vieram de uma pesquisa voluntária entre clientes que concluíram o programa, o dado pode não representar os desistentes. Se significam que uma nota passou de 5 para 8 pontos, houve aumento relativo de 60%, mas de 3 pontos absolutos: outras interpretações seriam incorretas.",
          "É importante verificar se o número se refere a uma média, a um risco, a um percentual de participantes ou a uma comparação com outro grupo. Sem denominadores, período e método, o grau de certeza não pode ser estabelecido."
        ]
      },
      {
        "heading": "Conclua sem ir além do que foi demonstrado",
        "paragraphs": [
          "Uma conclusão prudente seria: “Entre participantes que responderam, houve melhora relatada; ainda não sabemos quanto foi causado pelo programa nem se o resultado vale para toda a população”. Isso preserva o dado disponível sem exagerar seu alcance.",
          "Finalmente, indique como avançar: comparar grupos adequados, incluir desistentes, pré-definir indicadores e publicar resultados desfavoráveis. O objetivo da oficina não é vencer uma discussão, mas produzir uma avaliação que possa ser revista à luz de novas evidências."
        ]
      }
    ],
    "misconception": "Uma mesma notícia pode combinar números verdadeiros e uma conclusão mal fundamentada. Detectar retórica problemática não prova que todos os dados sejam falsos.",
    "summary": "Separe tese, evidência e conclusão; teste a relevância, a seleção de dados, as medidas e as alternativas antes de decidir o que se pode afirmar.",
    "check": {
      "question": "Uma pesquisa mostra aprovação entre clientes que completaram um programa. Qual conclusão é a mais segura?",
      "options": [
        "A aprovação observada descreve os respondentes; desistentes podem ter opinião diferente.",
        "Todos os clientes aprovaram o programa.",
        "A aprovação prova que o programa causou melhora."
      ],
      "correct": 0,
      "why": "A população observada não inclui necessariamente os desistentes nem identifica efeitos causais."
    }
  }
};
export const ERROR_WORKED_EXAMPLES={
  "falacias_relevancia": {
    "context": "Proposta: incluir duas horas de atendimento da biblioteca aos sábados. Resposta: “O autor já repetiu de ano; sua sugestão é ruim.”",
    "steps": [
      {
        "formal": "Tese: ampliar o atendimento; razão dada: histórico escolar do autor.",
        "concrete": "A resposta não apresenta dados sobre demanda, custos ou funcionamento.",
        "reason": "Para avaliar a proposta, a informação sobre desempenho escolar é, em regra, irrelevante."
      },
      {
        "formal": "Teste a pertinência da razão.",
        "concrete": "Mesmo que o autor tenha repetido de ano, a biblioteca pode precisar de mais horários.",
        "reason": "Uma característica pessoal não funciona como contraexemplo aos benefícios ou custos da medida."
      },
      {
        "formal": "Reconstrua uma objeção que realmente examine a proposta.",
        "concrete": "“Antes de ampliar o horário, precisamos estimar funcionários, custos e procura no sábado.”",
        "reason": "Essa objeção é relevante porque indica condições verificáveis para a conclusão."
      }
    ],
    "check": {
      "question": "Qual resposta enfrenta a proposta sem ataque pessoal?",
      "options": [
        "Verificar demanda e custo do atendimento.",
        "Repetir que o autor é irresponsável.",
        "Afirmar que pessoas populares discordam."
      ],
      "correct": 0,
      "why": "Procura informações diretamente ligadas à decisão."
    }
  },
  "falacias_pressupostos": {
    "context": "“Ou proibimos celulares em todas as situações, ou ninguém mais aprenderá.”",
    "steps": [
      {
        "formal": "Identifique a conclusão e o conjunto de opções.",
        "concrete": "A frase opõe proibição total a fracasso completo da aprendizagem.",
        "reason": "Ela pressupõe que só existem dois cenários, mas isso não foi mostrado."
      },
      {
        "formal": "Procure um cenário intermediário plausível.",
        "concrete": "Pode haver restrições em avaliações e atividades que exijam concentração, com usos pedagógicos previstos.",
        "reason": "A existência de uma alternativa viável desfaz a pretensão de exaustividade do dilema."
      },
      {
        "formal": "Reformule a discussão em termos verificáveis.",
        "concrete": "Compare políticas de uso, objetivos pedagógicos, efeitos observados e exceções.",
        "reason": "Um bom argumento precisa defender a política específica, não eliminar opções por retórica."
      }
    ],
    "check": {
      "question": "Qual informação torna o dilema menos convincente?",
      "options": [
        "Um regulamento intermediário viável.",
        "O autor pronunciar a frase mais alto.",
        "Outras pessoas repetirem o dilema."
      ],
      "correct": 0,
      "why": "Uma terceira alternativa plausível mostra que as duas opções não esgotam os casos."
    }
  },
  "vieses_julgamento": {
    "context": "Duas lojas anunciam a mesma bicicleta. A primeira mostra “de R$ 4.000 por R$ 2.200”; a segunda informa apenas “R$ 2.200”.",
    "steps": [
      {
        "formal": "Identifique a âncora fornecida.",
        "concrete": "O valor inicial de R$ 4.000 funciona como referência para julgar R$ 2.200.",
        "reason": "A comparação pode parecer vantajosa mesmo sem sabermos quanto custa uma bicicleta semelhante."
      },
      {
        "formal": "Busque uma referência independente.",
        "concrete": "Pesquise bicicletas com características semelhantes, estado de conservação e garantia.",
        "reason": "A âncora pode perder força quando comparada a preços realmente relevantes."
      },
      {
        "formal": "Formule uma conclusão proporcional à evidência.",
        "concrete": "“R$ 2.200 pode ser um bom preço, mas o desconto anunciado não basta para demonstrá-lo.”",
        "reason": "O raciocínio evita confundir o tamanho de um desconto declarado com valor real."
      }
    ],
    "check": {
      "question": "Como diminuir a influência da âncora?",
      "options": [
        "Comparar produtos equivalentes em várias fontes.",
        "Aceitar o preço inicial como valor comprovado.",
        "Considerar maior todo desconto anunciado."
      ],
      "correct": 0,
      "why": "Uma referência externa reduz a dependência do número apresentado primeiro."
    }
  },
  "vieses_decisao": {
    "context": "Uma empresa investiu R$ 100 mil num aplicativo. Novos testes mostram baixa demanda; continuar custaria mais R$ 80 mil.",
    "steps": [
      {
        "formal": "Separe gastos passados de decisões futuras.",
        "concrete": "Os R$ 100 mil já foram despendidos e não retornam simplesmente porque a empresa continua.",
        "reason": "O valor passado não mede, por si só, o benefício de mais R$ 80 mil."
      },
      {
        "formal": "Avalie opções a partir de agora.",
        "concrete": "Compare projeções realistas de receita, alternativas para os funcionários e possível reutilização de tecnologia.",
        "reason": "Prosseguir pode ser sensato se houver benefício futuro suficiente, mas exige essa justificativa."
      },
      {
        "formal": "Reconheça o argumento inválido.",
        "concrete": "“Precisamos investir mais porque já gastamos muito” não apresenta benefício novo.",
        "reason": "A decisão deve depender das consequências futuras, não da necessidade psicológica de justificar o passado."
      }
    ],
    "check": {
      "question": "Que razão justificaria continuar o projeto?",
      "options": [
        "Evidências de benefícios futuros que superem custos futuros.",
        "O simples fato de já ter gasto R$ 100 mil.",
        "A vontade de evitar admitir um erro."
      ],
      "correct": 0,
      "why": "A justificativa prospectiva avalia consequências futuras."
    }
  },
  "ilusoes_graficos": {
    "context": "Um tratamento apresenta risco de 2% no grupo de referência e 1% no grupo tratado durante o mesmo período.",
    "steps": [
      {
        "formal": "Escreva os dois riscos com a mesma base.",
        "concrete": "Em cada 100 pessoas, são 2 casos no grupo de referência e 1 no grupo tratado.",
        "reason": "Contagens em bases iguais tornam a comparação explícita."
      },
      {
        "formal": "Calcule a redução absoluta.",
        "concrete": "2% − 1% = 1 ponto percentual, equivalente a um caso evitado por 100 pessoas na comparação ilustrativa.",
        "reason": "O cálculo usa subtração de riscos, não divisão."
      },
      {
        "formal": "Calcule e interprete a redução relativa.",
        "concrete": "(2% − 1%) ÷ 2% = 50%, isto é, metade do risco inicial.",
        "reason": "Relativa e absoluta descrevem o mesmo cenário; apresentar ambas evita exageros."
      }
    ],
    "check": {
      "question": "Nesse exemplo, como expressar corretamente os números?",
      "options": [
        "Redução de 1 ponto percentual ou de 50% do risco inicial.",
        "Redução de 50 pontos percentuais.",
        "Risco final nulo."
      ],
      "correct": 0,
      "why": "Uma medida é absoluta e a outra relativa, ambas calculadas corretamente."
    }
  },
  "ilusoes_inferencia": {
    "context": "Na clínica A, recuperam-se 90 de 100 casos leves e 10 de 20 graves. Na clínica B, 19 de 20 leves e 90 de 150 graves.",
    "steps": [
      {
        "formal": "Compare casos leves e graves separadamente.",
        "concrete": "A: 90% dos leves e 50% dos graves; B: 95% dos leves e 60% dos graves.",
        "reason": "A clínica B tem taxa maior dentro de cada categoria de gravidade."
      },
      {
        "formal": "Calcule os totais com os respectivos denominadores.",
        "concrete": "A: 100 recuperações em 120 pessoas (83,3%); B: 109 em 170 (64,1%).",
        "reason": "A atende sobretudo casos leves; B reúne proporcionalmente mais casos graves."
      },
      {
        "formal": "Explique a inversão sem concluir causalidade.",
        "concrete": "B lidera em cada estrato, mas A lidera no total pela distribuição de gravidade.",
        "reason": "O paradoxo de Simpson mostra por que estratificar e compreender os critérios de seleção antes de atribuir diferenças a tratamentos."
      }
    ],
    "check": {
      "question": "Como B pode superar A em cada gravidade e perder no total?",
      "options": [
        "As proporções de casos leves e graves são diferentes nas duas clínicas.",
        "Porque 95% é necessariamente menor que 90%.",
        "Porque uma das taxas foi calculada com erro obrigatório."
      ],
      "correct": 0,
      "why": "As taxas totais são médias ponderadas por composições distintas."
    }
  },
  "oficina_erros": {
    "context": "Anúncio fictício: “Nossa escola melhorou o desempenho em 50%; 9 em 10 alunos entrevistados recomendam o método. Quem discorda não entende educação.”",
    "steps": [
      {
        "formal": "Separe as três alegações.",
        "concrete": "Há um crescimento anunciado, um resultado de enquete e uma crítica aos discordantes.",
        "reason": "Tratar as alegações separadamente evita que a retórica seja usada como evidência dos números."
      },
      {
        "formal": "Localize os denominadores e as possíveis seleções.",
        "concrete": "Se a média passou de 40 para 60, o aumento relativo é de 50%; mas é preciso verificar escala, comparação e quem respondeu à enquete.",
        "reason": "Números corretos podem ter interpretação limitada por amostra e ausência de contrafactual."
      },
      {
        "formal": "Produza um relatório proporcional à evidência.",
        "concrete": "“Foi informado aumento relativo de 50% e aprovação de 90% dos entrevistados; faltam método e grupo comparável para atribuir o efeito à escola.”",
        "reason": "A conclusão distingue cálculo, representatividade e causalidade; não usa ataques pessoais."
      }
    ],
    "check": {
      "question": "Qual relatório corresponde melhor à análise?",
      "options": [
        "Os números podem estar corretos, mas ainda faltam amostragem e comparação causal.",
        "O aumento de 50% prova que o método causou tudo.",
        "A crítica pessoal torna necessariamente falsos todos os números."
      ],
      "correct": 0,
      "why": "A precisão consiste em preservar fatos sem extrapolar o que eles demonstram."
    }
  }
};
