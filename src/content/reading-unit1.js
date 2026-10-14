/** Unidade I: leituras progressivas para iniciantes, com uma verificação formativa não avaliativa. */
export const UNIT1_READINGS={
  fundamentos:{
    objective:'Distinguir proposições de perguntas e ordens, interpretar as letras p e q e explicar por que uma tabela com duas proposições tem quatro linhas.',
    sections:[
      {heading:'Comece comparando duas frases',paragraphs:[
        '“A biblioteca está aberta.” “Abra a biblioteca!” As duas frases falam da biblioteca, mas desempenham funções diferentes. A primeira afirma algo sobre o mundo; a segunda dá uma ordem.',
        'Na lógica proposicional clássica, estudamos proposições: enunciados declarativos aos quais podemos atribuir verdadeiro (V) ou falso (F). A ordem não funciona como proposição desse tipo. Uma pergunta, como “A biblioteca está aberta?”, também não afirma que a biblioteca está aberta.'
      ]},
      {heading:'Por que representar frases por letras?',paragraphs:[
        'Para analisar a estrutura de um raciocínio sem repetir frases longas, usamos letras. Por exemplo: p = “A biblioteca está aberta”; q = “Há estudantes na biblioteca”. Cada letra representa uma afirmação inteira, e não uma palavra isolada.',
        'Uma proposição não precisa ser verdadeira de fato para ser uma proposição. Também não precisamos conhecer seu valor agora: importa que, na situação considerada, ela possa ser verdadeira ou falsa. Ao apresentar um argumento, ∴ lê-se “portanto” e introduz a conclusão; ∵ lê-se “porque” e pode anunciar uma justificativa. Nenhum deles é um conectivo ou um quantificador dentro de uma fórmula lógica.'
      ]},
      {heading:'O que as linhas da tabela significam?',paragraphs:[
        'Ao estudar p e q, examinamos quatro possibilidades: ambas verdadeiras (V, V); p verdadeira e q falsa (V, F); p falsa e q verdadeira (F, V); ambas falsas (F, F). Cada linha é uma atribuição possível de valores às letras.',
        'Como cada proposição tem duas possibilidades, para n proposições independentes consideramos 2ⁿ linhas. Assim, duas letras geram 2² = 4 linhas; três letras geram 2³ = 8. A tabela explora possibilidades lógicas, não afirma que todas ocorreram na realidade.'
      ]}
    ],
    misconception:'Não confunda “não sei se é verdadeira” com “não é uma proposição”. A frase “A biblioteca está aberta” continua sendo uma proposição mesmo antes de verificarmos o horário de funcionamento.',
    summary:'Uma proposição afirma algo que pode receber V ou F. Letras representam proposições inteiras; cada linha da tabela representa uma combinação possível de seus valores. ∴ significa “portanto” e ∵ significa “porque”: indicam a organização de um argumento, não operações sobre proposições.',
    check:{question:'Qual frase é uma proposição no sentido estudado aqui?',options:['Feche a biblioteca.','A biblioteca fecha às 18 horas.','A biblioteca já fechou?'],correct:1,why:'“A biblioteca fecha às 18 horas” afirma algo que pode ser verdadeiro ou falso. As outras frases são uma ordem e uma pergunta.'}
  },
  operadores:{
    objective:'Interpretar os conectivos lógicos, calcular os valores de expressões simples e distinguir “ou” inclusivo de “ou” exclusivo.',
    sections:[
      {heading:'Duas afirmações, diversas relações',paragraphs:[
        'Considere p = “Ana estudou” e q = “Ana fez os exercícios”. Podemos combinar essas afirmações para dizer coisas diferentes. O conectivo escolhido determina em quais situações a frase composta será verdadeira.',
        'Antes das fórmulas, pense no significado: “Ana estudou e fez os exercícios” exige que as duas partes sejam verdadeiras; “Ana estudou ou fez os exercícios” é verdadeira se ao menos uma parte for verdadeira, inclusive quando as duas forem.'
      ]},
      {heading:'Os conectivos básicos',paragraphs:[
        'A negação ¬p (“não p”) inverte o valor de p. A conjunção p ∧ q (“p e q”) só é verdadeira quando ambas são verdadeiras. A disjunção inclusiva p ∨ q (“p ou q”) só é falsa quando ambas são falsas.',
        'Na condicional p → q (“se p, então q”), o único caso falso é p verdadeira e q falsa: a condição foi atendida, mas a consequência não. O bicondicional p ↔ q (“p se, e somente se, q”) é verdadeiro quando p e q têm o mesmo valor.'
      ]},
      {heading:'Calcule passo a passo',paragraphs:[
        'Suponha que p seja verdadeira (V) e q falsa (F). Então p ∧ q vale F, porque não temos as duas afirmações verdadeiras; p ∨ q vale V, porque pelo menos p é verdadeira; p → q vale F, porque ocorre exatamente o caso V → F.',
        'Na linguagem cotidiana, “ou” às vezes significa “uma opção ou outra, mas não as duas”. Esse é o ou exclusivo (⊕), que não é a mesma operação do símbolo ∨. Em lógica, convém verificar qual sentido está sendo usado.'
      ]}
    ],
    misconception:'Não leia p → q automaticamente como uma afirmação de causa e efeito. A condicional material é avaliada pelos valores de p e q; por isso, é verdadeira quando p é falsa, independentemente do valor de q.',
    summary:'Cada conectivo tem uma regra precisa de verdade. Verifique os valores das partes, aplique a regra do conectivo e evite confundir o “ou” inclusivo com o exclusivo.',
    check:{question:'Se p = F e q = V, quanto vale p ∨ q (ou inclusivo)?',options:['F, porque p é falsa.','V, porque q é verdadeira.','Não é possível saber.'],correct:1,why:'No “ou” inclusivo, basta uma das partes ser verdadeira. Como q = V, p ∨ q = V.'}
  },
  traducao:{
    objective:'Separar afirmações atômicas, reconhecer condições necessárias e suficientes e escolher corretamente o sentido de uma condicional.',
    sections:[
      {heading:'Comece pelo que a frase afirma',paragraphs:[
        'Imagine a regra “A biblioteca abre somente se houver funcionários”. Antes de usar símbolos, identifique as duas afirmações: p = “A biblioteca abre”; q = “Há funcionários”.',
        'Agora pergunte: a regra permite que a biblioteca abra sem funcionários? Não. A presença de funcionários é necessária para a abertura. Isso orienta a direção da seta: p → q (“se a biblioteca abre, então há funcionários”).'
      ]},
      {heading:'A diferença entre “se” e “somente se”',paragraphs:[
        'Na frase “p somente se q”, q é uma condição necessária para p, e a tradução é p → q. Já “p se q” afirma que q é suficiente para p; a tradução é q → p. As duas frases não são equivalentes.',
        'Uma maneira de conferir é inventar uma situação em que uma das afirmações seja falsa. Se p significa “A biblioteca abre” e q “Há funcionários”, p → q proíbe o caso em que a biblioteca abre sem funcionários, mas não obriga a abrir sempre que há funcionários.'
      ]},
      {heading:'Parênteses mudam o alcance',paragraphs:[
        'Quando uma frase contém várias operações, os parênteses indicam o que está sendo negado ou combinado. Por exemplo, “Não é verdade que p ou q” corresponde a ¬(p ∨ q): as duas possibilidades são negadas em conjunto.',
        'Isso é diferente de ¬p ∨ q (“não p ou q”). Para traduzir com segurança, escreva primeiro o significado de cada letra, localize as expressões “se”, “somente se”, “e”, “ou” e “não” e confira a fórmula lendo-a de volta em português.'
      ]}
    ],
    misconception:'Não inverta a seta apenas porque as frases parecem semelhantes. “Recebo certificado somente se for aprovado” significa certificado → aprovação; não garante que toda pessoa aprovada receberá certificado.',
    summary:'Traduza primeiro as afirmações; depois determine a relação entre elas. “p somente se q” vira p → q; “p se q” vira q → p. Parênteses preservam o alcance dos conectivos.',
    check:{question:'Se p = “Viajo” e q = “Tenho passagem”, como traduzir “Viajo somente se tenho passagem”?',options:['q → p','p → q','p ∧ q'],correct:1,why:'Ter passagem é necessário para viajar nessa regra. Portanto, a viagem (p) implica ter passagem (q): p → q.'}
  },
  falacias:{
    objective:'Reconhecer a afirmação do consequente, construir um contraexemplo e diferenciar falhas formais de problemas informais de argumentação.',
    sections:[
      {heading:'Um argumento pode parecer convincente e ser inválido',paragraphs:[
        'Considere: “Se chove, a rua fica molhada. A rua está molhada. Logo, choveu”. A conclusão parece natural, mas a rua também poderia estar molhada porque alguém a lavou.',
        'A lógica pergunta se a conclusão precisa ser verdadeira sempre que as premissas forem verdadeiras. Para esse argumento, a resposta é não: a rua pode estar molhada sem ter chovido.'
      ]},
      {heading:'Examine a forma do raciocínio',paragraphs:[
        'Escreva p = “Chove” e q = “A rua fica molhada”. O argumento tem a forma p → q; q; portanto p. Esse erro é chamado afirmação do consequente.',
        'Para provar que a inferência não é válida, basta encontrar um contraexemplo lógico: p = F e q = V. Nesse caso, p → q é verdadeira e q também é verdadeira, mas a conclusão p é falsa. Portanto, a conclusão não decorre necessariamente das premissas.'
      ]},
      {heading:'Nem toda falácia tem a mesma origem',paragraphs:[
        'Uma falácia formal é um problema na estrutura da inferência, como concluir ¬q a partir de p → q e ¬p (negação do antecedente). O erro pode ser demonstrado por uma atribuição de valores.',
        'Falácias informais dependem do conteúdo e do contexto. Um falso dilema, por exemplo, apresenta só duas alternativas como se fossem as únicas, sem mostrar que esgotam todas as opções. O problema está na maneira como as possibilidades foram apresentadas.'
      ]}
    ],
    misconception:'Não confunda “a conclusão acabou sendo verdadeira” com “o argumento é válido”. Validade significa impossibilidade de premissas verdadeiras e conclusão falsa; uma conclusão verdadeira pode resultar de uma inferência inválida.',
    summary:'Para avaliar um argumento, procure uma situação em que as premissas sejam verdadeiras e a conclusão falsa. Se ela existir, a inferência é inválida, mesmo que pareça persuasiva.',
    check:{question:'“Se há fogo, há fumaça. Há fumaça. Logo, há fogo.” Qual é o problema lógico?',options:['A conclusão segue necessariamente das premissas.','Afirmação do consequente: pode haver outra causa para a fumaça.','A primeira premissa não pode ser uma condicional.'],correct:1,why:'A forma é p → q; q; portanto p. Podemos ter p = F e q = V, com premissas verdadeiras e conclusão falsa.'}
  }
};
