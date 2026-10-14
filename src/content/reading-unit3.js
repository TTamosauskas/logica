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
    objective:'Justificar uma demonstração por regras de inferência, distinguir prova direta e redução ao absurdo, explicar a explosão a partir de premissas inconsistentes sem confundir validade com verdade factual.',
    sections:[
      {heading:'Da verificação de casos à demonstração',paragraphs:[
        'Nas tabelas-verdade, mostramos que uma inferência funciona em todas as interpretações. Agora vamos construir um caminho de raciocínio em que cada passo seja autorizado por uma regra. Esse é o objetivo de uma prova formal. Um contraexemplo basta para invalidar uma inferência; uma prova correta precisa justificar todos os passos necessários.',
        'Imagine que você sabe duas coisas: “Se o alarme dispara, uma mensagem é enviada” e “O alarme disparou”. A partir delas, você pode concluir “Uma mensagem foi enviada”. Uma prova explicita quais informações usamos e por que o passo é permitido, independentemente de o alarme realmente ter disparado hoje.'
      ]},
      {heading:'Uma prova curta com três linhas',paragraphs:[
        'Use p para “O alarme disparou” e q para “Uma mensagem foi enviada”. Linha 1: p → q (premissa). Linha 2: p (premissa). Linha 3: q (obtida das linhas 1 e 2). As duas primeiras linhas são dadas; a terceira precisa de justificativa. Essa regra se chama modus ponens, ou eliminação da condicional.',
        'De p ∧ q, podemos obter p pela eliminação da conjunção; de p e q, podemos formar p ∧ q pela introdução da conjunção. Ao conferir uma prova, pergunte de onde veio cada fórmula. Uma conclusão plausível não basta: a regra precisa autorizar a passagem a partir das premissas efetivamente disponíveis.'
      ]},
      {heading:'Explosão e redução ao absurdo: o que a contradição permite concluir?',paragraphs:[
        'Na lógica clássica, de p e ¬p pode-se deduzir qualquer q: é o princípio da explosão (p, ¬p ⊢ q). Uma demonstração usa p para obter p ∨ q por introdução da disjunção; com ¬p e p ∨ q, o silogismo disjuntivo permite concluir q. Isso NÃO afirma que q seja um fato verdadeiro: significa que premissas contraditórias não têm modelo e, portanto, não fornecem uma base informativa para testar conclusões por contraexemplos.',
        'A redução ao absurdo usa uma contradição de outro modo: assumimos provisoriamente a negação da tese e procuramos deduzir uma impossibilidade. Na lógica clássica, para demonstrar p a partir de ¬¬p, suponha ¬p; junto de ¬¬p, a hipótese leva a contradição, de modo que podemos concluir p e descarregar a hipótese ¬p. Aqui a contradição é obtida sob uma hipótese temporária, não assumida como premissa verdadeira. Em sistemas não clássicos, a explosão e a redução ao absurdo clássica podem não valer na mesma forma.'
      ]}
    ],
    misconception:'Explosão não diz que uma frase arbitrária é verdadeira no mundo: diz que, na lógica clássica, premissas inconsistentes permitem qualquer conclusão formal. Na redução ao absurdo, uma hipótese provisória leva à contradição para ser rejeitada; não é uma permissão para manter premissas contraditórias como verdadeiras.',
    summary:'Uma prova exige regras e dependências justificadas. Modus ponens, conjunção e silogismo disjuntivo permitem derivar conclusões. A explosão parte de premissas inconsistentes (p, ¬p ⊢ q), enquanto a redução ao absurdo refuta uma hipótese temporária ao chegar a uma contradição, sem confundir derivabilidade com fatos.',
    check:{question:'Ao provar p por redução ao absurdo clássica, que papel tem a hipótese ¬p que leva a contradição?',options:['É provisória e deve ser descarregada para concluir p.','Fica como premissa verdadeira junto da contradição.','Mostra que qualquer enunciado empírico se tornou verdadeiro.'],correct:0,why:'Na redução ao absurdo, a negação da tese é assumida temporariamente; obter uma contradição mostra que a hipótese não pode se manter, autorizando a tese na lógica clássica. Isso é diferente de tratar p e ¬p como premissas permanentes.'}
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
