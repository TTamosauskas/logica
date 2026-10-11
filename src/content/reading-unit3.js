/** Unidade III — inferência, prova em linhas e problemas de dedução. */
export const UNIT3_READINGS={
  silogismos:{
    objective:'Reconhecer padrões válidos de inferência, encadear condicionais e justificar por que uma conclusão segue das premissas.',
    sections:[
      {heading:'Por que precisamos de mais de uma premissa?',paragraphs:[
        'Considere duas regras de um curso: “Se a matrícula está ativa, o estudante pode acessar a plataforma” e “Se o estudante pode acessar a plataforma, pode consultar o material”. Mesmo sem saber se uma matrícula específica está ativa, conseguimos descobrir uma relação entre o começo e o fim da cadeia.',
        'Chamemos p de “A matrícula está ativa”, q de “O estudante acessa a plataforma” e r de “O estudante consulta o material”. As regras são p → q e q → r. Juntas, autorizam concluir p → r: se a matrícula está ativa, o estudante pode consultar o material.'
      ]},
      {heading:'Acompanhe os passos da inferência',paragraphs:[
        'Suponha por um momento que p seja verdadeira. Pela primeira premissa, q precisa ser verdadeira; pela segunda, r também precisa ser. Portanto, não podemos ter p verdadeira e r falsa enquanto as duas premissas forem verdadeiras.',
        'Esse padrão se chama silogismo hipotético. Ele é válido porque preserva a verdade: sempre que as duas condicionais são verdadeiras, a condicional resultante também é. Não basta que as letras se repitam; é preciso que as conexões tenham a direção correta.'
      ]},
      {heading:'Compare com outros padrões',paragraphs:[
        'Outro padrão útil é o silogismo disjuntivo. Se sabemos p ∨ q e também ¬p, então q deve ser verdadeira. Por exemplo, “O arquivo está na pasta A ou na pasta B” e “O arquivo não está na pasta A” permitem concluir que está na B, assumindo que ao menos uma das opções é verdadeira.',
        'Isso não autoriza trocar qualquer premissa de lugar. De p → q e q, por exemplo, não podemos concluir p: seria afirmar o consequente, uma falácia estudada antes. Para conferir uma inferência, tente imaginar uma situação com premissas verdadeiras e conclusão falsa.'
      ]}
    ],
    misconception:'Não conclua p → r de p → q e r → q. As duas condicionais terminam em q, mas não formam uma cadeia que conecte p a r; a direção das setas importa.',
    summary:'Um silogismo válido organiza premissas para justificar uma conclusão. Confira a direção das relações e a impossibilidade de premissas V com conclusão F.',
    check:{question:'De p → q e q → r, qual conclusão é garantida?',options:['r → p.','p → r.','p ∧ r.'],correct:1,why:'Se p for verdadeira, a primeira premissa obriga q; a segunda obriga r. Portanto, a condicional p → r é válida.'}
  },
  provas:{
    objective:'Ler uma demonstração linha por linha, identificar premissas e indicar qual regra justifica uma conclusão derivada.',
    sections:[
      {heading:'Da verificação de casos à demonstração',paragraphs:[
        'Nas tabelas-verdade, mostramos que uma inferência funciona em todas as interpretações. Agora vamos construir um caminho de raciocínio em que cada passo seja autorizado por uma regra. Esse é o objetivo de uma prova formal.',
        'Imagine que você sabe duas coisas: “Se o alarme dispara, uma mensagem é enviada” e “O alarme disparou”. A partir delas, você pode concluir “Uma mensagem foi enviada”. Uma prova explicita quais informações usamos e por que o passo é permitido.'
      ]},
      {heading:'Uma prova curta com três linhas',paragraphs:[
        'Use p para “O alarme disparou” e q para “Uma mensagem foi enviada”. Linha 1: p → q (premissa). Linha 2: p (premissa). Linha 3: q (obtida das linhas 1 e 2). As duas primeiras linhas são dadas; a terceira precisa de justificativa.',
        'A regra se chama modus ponens, ou eliminação da condicional: quando sabemos p → q e sabemos p, podemos derivar q. Uma prova não é uma coleção de frases plausíveis. Cada linha derivada deve apontar a regra utilizada e, quando necessário, as linhas anteriores das quais depende.'
      ]},
      {heading:'Conheça outras regras e seus limites',paragraphs:[
        'Se você tem p ∧ q, pode extrair p ou q pela eliminação da conjunção. Se tem p e tem q separadamente, pode formar p ∧ q pela introdução da conjunção. As regras mudam a forma da expressão mantendo aquilo que é justificável pelas premissas.',
        'Não invente uma nova linha só porque ela parece verdadeira em algum caso. De p sozinho não se pode concluir q sem outra premissa ou regra adequada. Ao conferir uma prova, leia cada linha e pergunte: de onde veio esta fórmula? Qual regra autoriza obtê-la?'
      ]}
    ],
    misconception:'Uma conclusão verdadeira não valida qualquer justificativa. Em dedução natural, o que torna um passo correto é a aplicação de uma regra autorizada às linhas apropriadas.',
    summary:'Uma prova parte de premissas e chega à conclusão por passos justificados. Cada linha derivada deve indicar uma regra válida e suas dependências.',
    check:{question:'De p → q na linha 1 e p na linha 2, o que pode aparecer na linha 3?',options:['q, por modus ponens.','¬q, por negação.','¬p, por modus tollens.'],correct:0,why:'A eliminação da condicional usa p → q e p para derivar q. A conclusão deve indicar a regra e as linhas utilizadas.'}
  },
  deducao:{
    objective:'Traduzir pistas em restrições, organizar cenários possíveis e verificar se um problema de atribuição tem solução única.',
    sections:[
      {heading:'Resolva um mistério pequeno antes de generalizar',paragraphs:[
        'Três colegas — Ana, Beto e Caio — ocupam três funções diferentes: organização, revisão e apresentação. Você recebe pistas sobre quem não ocupa determinada função e precisa descobrir uma distribuição que respeite todas as condições.',
        'Em vez de adivinhar, você pode listar sistematicamente as possibilidades. Se cada pessoa recebe exatamente uma função e cada função fica com uma pessoa, há 3 × 2 × 1 = 6 distribuições possíveis. Essa contagem é representada por 3!, lida como “três fatorial”.'
      ]},
      {heading:'Transforme cada pista em uma verificação',paragraphs:[
        'Suponha a pista “Ana não faz a revisão”. Para cada uma das seis distribuições, pergunte se a função atribuída a Ana é diferente de revisão. Se não for, descarte aquela possibilidade. Repita o procedimento com as outras pistas.',
        'Alguns problemas acrescentam condições globais, como “exatamente uma das três afirmações é falsa”. Nesse caso, não basta olhar cada frase isoladamente: você precisa contar os valores V e F das três pistas em cada distribuição, mantendo apenas as linhas com uma F.'
      ]},
      {heading:'Quando podemos afirmar que resolvemos?',paragraphs:[
        'Se nenhuma distribuição satisfaz todas as restrições, as pistas não admitem solução dentro do conjunto de possibilidades estabelecido. Se duas ou mais distribuições passam pelos testes, o problema ainda não determina uma resposta única.',
        'Uma solução única só existe quando exatamente uma distribuição respeita todas as condições. É por isso que uma tabela organizada costuma ser melhor do que uma hipótese intuitiva: ela permite demonstrar não apenas que uma resposta funciona, mas também que as alternativas foram descartadas.'
      ]}
    ],
    misconception:'Encontrar uma distribuição que combina com algumas pistas não significa ter resolvido o problema. É necessário conferir todas as restrições e verificar se há outra distribuição válida.',
    summary:'Liste as atribuições possíveis, teste todas as pistas e retenha somente os cenários compatíveis. Há solução única quando apenas uma possibilidade sobrevive.',
    check:{question:'Se três distribuições diferentes satisfazem todas as pistas, o que podemos concluir?',options:['Existe solução única.','Nenhuma distribuição é válida.','O problema admite mais de uma solução.'],correct:2,why:'Unicidade exige exatamente uma atribuição válida. Com três distribuições compatíveis, as pistas ainda não determinam resposta única.'}
  }
};
