/** Ciclo 12: duas competências aplicadas ao pensamento rigoroso. */
export const UNIT12_READINGS={
  pressupostos:{
    objective:'Separar premissas e conclusão, identificar uma hipótese não declarada, imaginar explicações alternativas e delimitar o que os dados autorizam concluir.',
    sections:[
      {heading:'Uma conclusão pode esconder uma premissa?',paragraphs:[
        'Uma escola mudou o horário das aulas. No semestre seguinte, a média das notas aumentou. A direção anunciou: “A mudança de horário melhorou o desempenho”. Será que a informação apresentada basta para demonstrar essa conclusão?',
        'Sabemos que os dois acontecimentos vieram em sequência. Mas ainda não sabemos se as turmas eram comparáveis, se houve outras mudanças ou se o aumento aconteceria mesmo sem a alteração do horário. Para concluir que o horário causou a melhora, precisamos de pressupostos adicionais.'
      ]},
      {heading:'Torne visível o que o argumento não diz',paragraphs:[
        'Um pressuposto é uma ideia da qual o raciocínio depende, embora ela não tenha sido apresentada como premissa explícita. No exemplo, o argumento depende de que nenhuma outra mudança explique suficientemente as notas melhores. Isso não prova que o pressuposto seja falso; mostra apenas o que ainda precisa ser investigado.',
        'Pergunte sempre: “Que fato precisaria ser verdadeiro para esta conclusão estar justificada?”. Em seguida, tente imaginar uma alternativa plausível. Se as provas ficaram mais fáceis naquele semestre, as notas poderiam aumentar sem nenhuma influência do novo horário.'
      ]},
      {heading:'Avalie a força da conclusão',paragraphs:[
        'Encontrar uma explicação alternativa não demonstra automaticamente que a hipótese original está errada. A mudança de horário pode ter ajudado. Mas, com os dados fornecidos, seria mais rigoroso dizer: “As notas aumentaram depois da mudança, porém não sabemos se ela foi a causa”.',
        'Para avançar, compare grupos ou períodos semelhantes, verifique como as notas foram calculadas e procure mudanças simultâneas. Uma boa análise distingue o que já foi observado, o que se pode inferir com segurança e o que continua sendo uma hipótese.'
      ]}
    ],
    misconception:'Não confunda uma possível explicação com uma demonstração. Um contraexemplo ou uma hipótese alternativa pode mostrar que a conclusão não é obrigatória sem provar que a conclusão é falsa.',
    summary:'Separe dados e conclusão; explicite pressupostos; procure cenários alternativos. Conclua apenas o que as premissas e as evidências realmente autorizam.',
    check:{question:'As vendas aumentaram depois de uma campanha. Qual conclusão é justificável apenas com esse dado?',options:['A campanha certamente causou o aumento.','O aumento ocorreu depois da campanha; a causa ainda precisa ser investigada.','A campanha não teve nenhum efeito.'],correct:1,why:'A sequência temporal não isola a causa. Outras variáveis, como preço ou sazonalidade, podem explicar parte ou todo o aumento.'}
  },
  categoricos2:{
    objective:'Testar inferências entre categorias, distinguir conversões válidas de inversões inválidas, reconhecer pressupostos de existência e construir contraexemplos com conjuntos.',
    sections:[
      {heading:'Uma relação entre grupos permite qual conclusão?',paragraphs:[
        'Imagine três grupos: estudantes, pesquisadores e leitores. Se todos os estudantes são pesquisadores e todos os pesquisadores são leitores, então todos os estudantes são leitores. Cada inclusão preserva a anterior: S está dentro de M e M está dentro de P.',
        'Agora mude a segunda premissa: todos os professores são leitores. Saber que estudantes e professores pertencem ao grupo dos leitores não permite concluir que sejam o mesmo grupo. Grupos diferentes podem compartilhar uma categoria mais ampla sem coincidirem.'
      ]},
      {heading:'Oposição e conversão exigem cuidado',paragraphs:[
        'As afirmações categóricas básicas são: A, “Todos S são P”; E, “Nenhum S é P”; I, “Alguns S são P”; O, “Alguns S não são P”. A negação de A é O, e a negação de E é I. Negar “todos” não é o mesmo que afirmar “nenhum”.',
        'Algumas inversões preservam a verdade: “Nenhum S é P” autoriza “Nenhum P é S”; “Alguns S são P” autoriza “Alguns P são S”. Mas “Todos S são P” não autoriza “Todos P são S”. Para conferir, imagine um conjunto pequeno contido em outro maior.'
      ]},
      {heading:'Construa um cenário que põe a inferência à prova',paragraphs:[
        'Para testar validade, represente cada grupo por seus membros e exija que as premissas sejam verdadeiras. Um contraexemplo existe quando, nessa mesma distribuição, a conclusão é falsa. Por exemplo, todos os cães são mamíferos, mas alguns mamíferos não são cães: a inclusão não é reversível.',
        'A existência também importa. Na interpretação moderna, “Todos os S são P” pode ser verdadeira quando não há nenhum S; ela não garante “Alguns S são P”. Certas relações do quadrado tradicional pressupõem a existência de S. Por isso, ao decidir se um argumento é válido, declare qual interpretação está utilizando.'
      ]}
    ],
    misconception:'Não conclua existência a partir de duas premissas universais nem inverta uma inclusão. Para rejeitar uma inferência, basta encontrar um modelo com premissas verdadeiras e conclusão falsa.',
    summary:'Use as formas A/E/I/O, confira a direção das inclusões e procure modelos concretos. Modos clássicos como Barbara e Celarent são exemplos úteis, não nomes a decorar.',
    check:{question:'De “Todos os gatos são mamíferos”, qual conclusão é necessariamente válida?',options:['Todos os mamíferos são gatos.','Nenhum mamífero é gato.','Nenhum gato é não mamífero.'],correct:2,why:'A afirmação universal exclui gatos fora dos mamíferos. Ela não permite inverter a inclusão ou afirmar que não existem gatos.'}
  }
};
