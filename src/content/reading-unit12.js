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
    objective:'Distinguir as quatro formas A, E, I e O, explicar cada relação do quadrado das oposições e testar conclusões sob interpretações com ou sem integrantes de S.',
    sections:[
      {heading:'Quatro formas para falar de duas categorias',paragraphs:[
        'Imagine S como o conjunto de estudantes e P como o de músicos. “Todos os estudantes são músicos” afirma que não há estudantes fora do grupo dos músicos. “Nenhum estudante é músico” afirma que os dois grupos não têm integrantes em comum. São duas maneiras diferentes de fazer afirmações universais.',
        'O quadrado das oposições compara quatro frases com o mesmo sujeito S e predicado P: A — “Todos os S são P”; E — “Nenhum S é P”; I — “Alguns S são P”; O — “Alguns S não são P”. As letras são nomes das formas, não valores de verdade. A e E são universais; I e O exigem a existência de pelo menos um integrante de S na interpretação moderna.'
      ]},
      {heading:'Como ler as quatro relações do quadrado',paragraphs:[
        'As diagonais indicam contradição: A e O sempre têm valores opostos; E e I também. Por exemplo, negar “Todos os estudantes são músicos” é afirmar que pelo menos um estudante não é músico. Não é afirmar que nenhum estudante seja músico. Essa negação continua correta mesmo que o grupo S seja vazio.',
        'Se sabemos que S tem ao menos um integrante, A e E são contrárias (não podem ser ambas verdadeiras, mas podem ser ambas falsas); I e O são subcontrárias (não podem ser ambas falsas, mas podem ser ambas verdadeiras). Nessa mesma condição, a subalternação permite passar de A verdadeira para I verdadeira e de E verdadeira para O verdadeira. O movimento inverso não é autorizado.'
      ]},
      {heading:'O papel decisivo dos grupos vazios',paragraphs:[
        'Agora considere S como o grupo dos unicórnios realmente existentes. Se não há nenhum, a lógica de predicados moderna considera A (“Todos os unicórnios são P”) e E (“Nenhum unicórnio é P”) verdadeiras; I e O são falsas. Portanto, A e E deixam de ser contrárias, I e O deixam de ser subcontrárias e as universais deixam de implicar as particulares. As duas contradições diagonais continuam válidas.',
        'No diagrama e no exercício desta aula, “quadrado tradicional” é uma convenção didática explícita: supomos S não vazio e usamos os quantificadores modernos. Ela recupera as quatro relações conhecidas do quadrado, mas não resume todas as interpretações historicamente propostas para os termos vazios. Compare os dois regimes e procure sempre o modelo que justifica ou refuta a inferência.'
      ]}
    ],
    misconception:'Não use a subalternação A → I ou E → O sem verificar se existe algum S. A negação de “Todos S são P” é O (“Alguns S não são P”), não E (“Nenhum S é P”).',
    summary:'As diagonais A–O e E–I expressam contradição em ambos os regimes. Contrariedade, subcontrariedade e subalternação exigem, nesta convenção, que S não esteja vazio. Alterar essa hipótese altera as inferências permitidas.',
    check:{question:'Na semântica moderna, se S não tem integrantes, quais valores são corretos?',options:['A e E verdadeiras; I e O falsas.','A e I verdadeiras; E e O falsas.','A e E falsas; I e O verdadeiras.'],correct:0,why:'Com S vazio, não há contraexemplo às universais A e E; já as particulares I e O precisam de pelo menos um integrante e por isso são falsas.'}

  }
};
