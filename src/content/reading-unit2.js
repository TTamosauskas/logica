/** Unidade II — semântica proposicional: leitura progressiva, exemplos e autocheck formativo. */
export const UNIT2_READINGS={
  compostas:{
    objective:'Identificar subfórmulas, respeitar os parênteses e calcular o valor de uma expressão composta a partir de seus componentes.',
    sections:[
      {heading:'Por que algumas expressões precisam ser resolvidas em partes?',paragraphs:[
        'Você já calculou o resultado de uma conta que contém parênteses? Em “(2 + 3) × 4”, começamos por 2 + 3 antes de multiplicar. Na lógica acontece algo parecido: uma expressão pode combinar operações, e sua estrutura nos indica que partes devem ser avaliadas primeiro.',
        'Considere p = “A biblioteca abre” e q = “A equipe chegou”. A frase “A biblioteca abre ou a equipe chegou, e a biblioteca não abre” combina três ideias. Antes de determinar se a frase completa é verdadeira, precisamos saber os valores das afirmações e de cada combinação.'
      ]},
      {heading:'Descubra as subfórmulas',paragraphs:[
        'Escrevemos essa estrutura como (p ∨ q) ∧ ¬p. A parte p ∨ q é uma subfórmula; ¬p é outra. Os parênteses mostram que o “ou” forma uma unidade que depois será ligada ao “não p” por “e”. Uma subfórmula é, portanto, uma parte da expressão que também pode ser avaliada.',
        'Na tabela-verdade, podemos criar uma coluna para p ∨ q e outra para ¬p. Só depois combinamos os resultados com ∧. Essas colunas intermediárias não são enfeites: elas deixam visível o percurso do cálculo e ajudam a localizar erros.'
      ]},
      {heading:'Acompanhe uma interpretação completa',paragraphs:[
        'Suponha p = F e q = V. A disjunção p ∨ q é verdadeira, pois q é verdadeira. A negação ¬p também é verdadeira, porque p é falsa. Finalmente, (p ∨ q) ∧ ¬p vale V ∧ V, isto é, V. Chegamos ao resultado sem tentar resolver tudo de uma só vez.',
        'Se trocarmos p para V e mantivermos q = V, p ∨ q continua verdadeira, mas ¬p se torna falsa. Agora o resultado da expressão toda é F. Compare as duas interpretações: a forma da expressão permaneceu igual, mas o valor das partes mudou.'
      ]}
    ],
    misconception:'Não retire parênteses por achar que os símbolos são apenas uma abreviação de frases. Em (p ∨ q) ∧ ¬p, o “e” conecta duas subfórmulas; mudar o agrupamento pode alterar os valores finais.',
    summary:'Resolva uma fórmula composta de dentro para fora: identifique as subfórmulas, registre os resultados intermediários e aplique o último conectivo.',
    check:{question:'Com p = F e q = V, quanto vale (p ∨ q) ∧ ¬p?',options:['F, porque p é falsa.','V, porque p ∨ q e ¬p são verdadeiras.','Não é possível avaliar.'],correct:1,why:'Primeiro p ∨ q = V. Depois ¬p = V. Logo, V ∧ V = V: a expressão composta é verdadeira.'}
  },
  demorgan:{
    objective:'Explicar em linguagem natural as Leis de De Morgan, transformar negações de “e” e “ou” e conferir o resultado por casos.',
    sections:[
      {heading:'O que significa negar uma frase com “e”?',paragraphs:[
        'Imagine a afirmação: “Ana trouxe o livro e o caderno”. O que precisa acontecer para ela ser falsa? Basta que falte pelo menos um dos dois objetos. Não precisamos exigir que ambos estejam ausentes. É essa diferença que ajuda a compreender a primeira Lei de De Morgan.',
        'Se p significa “Ana trouxe o livro” e q significa “Ana trouxe o caderno”, negar p ∧ q é afirmar ¬p ∨ ¬q. Podemos ler a fórmula como: “Ana não trouxe o livro ou não trouxe o caderno”. O “ou” é inclusivo; também admite que nenhum dos dois tenha sido trazido.'
      ]},
      {heading:'E o que significa negar uma frase com “ou”?',paragraphs:[
        'Agora considere: “Ana trouxe o livro ou o caderno”. Como estamos usando o “ou” inclusivo, a frase é verdadeira se ela trouxe pelo menos um dos objetos. Para negar essa frase, precisamos afirmar que ela não trouxe nenhum deles.',
        'Formalmente, ¬(p ∨ q) equivale a ¬p ∧ ¬q. Observe o movimento: os componentes recebem negação e o conectivo principal troca de “ou” para “e”. Na outra lei, ¬(p ∧ q) equivale a ¬p ∨ ¬q. Os parênteses deixam claro o que está sendo negado.'
      ]},
      {heading:'Verifique em vez de decorar',paragraphs:[
        'Para testar ¬(p ∨ q) e ¬p ∧ ¬q, imagine p = F e q = F. A disjunção original é falsa, logo sua negação é verdadeira. As duas negações individuais são verdadeiras, por isso a conjunção também é verdadeira.',
        'Se qualquer uma das proposições for verdadeira, p ∨ q será verdadeira e sua negação será falsa. Ao mesmo tempo, pelo menos uma das negações ¬p ou ¬q será falsa, tornando ¬p ∧ ¬q falsa. Assim, os resultados coincidem em todas as possibilidades.'
      ]}
    ],
    misconception:'Negar “p e q” não é afirmar “não p e não q”. Basta uma das partes falhar para que a conjunção inteira seja falsa; por isso a negação correta usa “ou”.',
    summary:'As Leis de De Morgan distribuem a negação e trocam o conectivo: ¬(p ∧ q) ≡ ¬p ∨ ¬q e ¬(p ∨ q) ≡ ¬p ∧ ¬q.',
    check:{question:'Como negar corretamente “O laboratório está aberto ou há atendimento”?',options:['O laboratório está fechado e não há atendimento.','O laboratório está fechado ou não há atendimento.','O laboratório está aberto e não há atendimento.'],correct:0,why:'Para negar uma disjunção inclusiva, as duas partes precisam ser falsas. Por isso usamos “não p e não q”.'}
  },
  classificacao:{
    objective:'Distinguir tautologia, contradição e contingência observando o conjunto completo de valores de uma tabela-verdade.',
    sections:[
      {heading:'Uma fórmula pode ser sempre verdadeira?',paragraphs:[
        'Considere a frase “A porta está aberta ou não está aberta”. Ela não informa qual é a situação real da porta. Mesmo assim, na lógica clássica, a frase composta é verdadeira qualquer que seja a situação. Se p = V, a primeira parte é verdadeira; se p = F, ¬p é verdadeira.',
        'Representamos a estrutura por p ∨ ¬p. Uma fórmula que vale V em todas as interpretações é uma tautologia. Note que “verdadeira em todas as interpretações” não é o mesmo que “descreve um fato que observamos”; estamos analisando a estrutura.'
      ]},
      {heading:'E uma fórmula pode ser sempre falsa?',paragraphs:[
        'Pense agora em “A porta está aberta e não está aberta”, no mesmo momento e no mesmo sentido. A fórmula p ∧ ¬p é falsa se p for V, pois ¬p será F; e também será falsa se p for F, pois a primeira parte já será F.',
        'Uma fórmula falsa em todas as interpretações é uma contradição. Já p ∧ q pode ser verdadeira quando p e q forem V, mas será falsa em outras combinações. Essa terceira classe recebe o nome de contingência.'
      ]},
      {heading:'Use a última coluna como critério',paragraphs:[
        'Para classificar uma fórmula, avalie primeiro todas as combinações de valores de suas letras. Depois olhe somente a coluna do resultado final. Se todas as linhas forem V, há tautologia; se todas forem F, há contradição; se houver V e F, há contingência.',
        'Por exemplo, a expressão p → q é contingente: é falsa quando p = V e q = F, mas verdadeira nas outras três possibilidades. Não basta encontrar uma linha V para chamá-la de tautologia, nem uma linha F para chamá-la de contradição.'
      ]}
    ],
    misconception:'Tautologia não significa “frase repetitiva” neste contexto. O termo nomeia uma propriedade lógica: verdade em todas as interpretações possíveis da fórmula.',
    summary:'Classifique pela coluna final inteira: só V indica tautologia; só F indica contradição; uma mistura de V e F indica contingência.',
    check:{question:'A tabela de uma fórmula apresenta V, V, F, V na coluna final. Qual é sua classificação?',options:['Tautologia.','Contradição.','Contingência.'],correct:2,why:'Há pelo menos uma linha verdadeira e uma falsa. Portanto, a fórmula não é sempre verdadeira nem sempre falsa: é contingente.'}
  },
  equivalencias:{
    objective:'Comparar duas fórmulas por suas condições de verdade e identificar quando uma transformação preserva o significado lógico.',
    sections:[
      {heading:'Duas escritas podem expressar a mesma condição?',paragraphs:[
        'Em linguagem cotidiana, às vezes reformulamos uma frase sem mudar o que ela afirma. A lógica permite investigar essa ideia com precisão: duas fórmulas são equivalentes se recebem o mesmo valor em cada interpretação possível das letras envolvidas.',
        'Considere “se p, então q” e “não p ou q”. A primeira tem a forma p → q; a segunda, ¬p ∨ q. Embora tenham aparências diferentes, as duas são falsas exatamente quando p é verdadeira e q é falsa.'
      ]},
      {heading:'Compare as condições em vez de confiar na aparência',paragraphs:[
        'Quando p = V e q = F, a condicional p → q falha; ao mesmo tempo, ¬p = F e q = F, de modo que ¬p ∨ q também é F. Em qualquer outro caso, as duas expressões são verdadeiras. Essa coincidência em todas as linhas justifica a equivalência.',
        'Podemos escrevê-la p → q ≡ ¬p ∨ q. O sinal ≡ está indicando equivalência lógica entre expressões, e não apenas igualdade dos símbolos escritos. Outra equivalência útil é ¬¬p ≡ p: negar duas vezes recupera o valor inicial.'
      ]},
      {heading:'Descubra uma transformação que não funciona',paragraphs:[
        'Nem toda mudança na ordem das letras preserva o significado. Compare p → q e q → p. Se p = F e q = V, a primeira é verdadeira, mas a segunda é falsa: V → F. Uma única interpretação com resultados diferentes basta para mostrar que não são equivalentes.',
        'Por isso, quando surgir uma dúvida, construa a tabela-verdade das duas fórmulas e compare suas colunas finais linha a linha. As leis de equivalência permitem transformar fórmulas mais rapidamente, mas a tabela mostra por que a transformação é válida.'
      ]}
    ],
    misconception:'Não confunda equivalência com uma coincidência em um único exemplo. Duas fórmulas só são equivalentes quando seus valores coincidem em todas as interpretações possíveis.',
    summary:'Equivalência lógica significa igualdade de valor em cada interpretação. Para demonstrá-la, compare todas as linhas ou aplique leis já justificadas.',
    check:{question:'Se duas fórmulas diferem no valor de verdade em uma única linha, o que concluímos?',options:['São equivalentes se as outras linhas coincidirem.','Não são logicamente equivalentes.','Ambas são contradições.'],correct:1,why:'Equivalência exige coincidência em todas as interpretações. Uma única linha diferente é um contraexemplo suficiente.'}
  },
  argumentos:{
    objective:'Distinguir validade de verdade factual e reconhecer a interpretação que serve de contraexemplo a uma inferência.',
    sections:[
      {heading:'Uma conclusão plausível é necessariamente válida?',paragraphs:[
        'Imagine: “Se há uma tempestade, a rua fica molhada. A rua está molhada. Logo, houve tempestade.” A conclusão pode até ser verdadeira, mas não decorre obrigatoriamente das premissas: a rua poderia estar molhada por outro motivo.',
        'Para avaliar validade, não basta perguntar se a conclusão parece razoável. Precisamos saber se existe alguma situação em que todas as premissas sejam verdadeiras e a conclusão seja falsa. Se tal situação existir, o argumento é inválido.'
      ]},
      {heading:'Procure uma situação que derrube a inferência',paragraphs:[
        'Representamos “Há tempestade” por p e “A rua está molhada” por q. O argumento tem a forma p → q; q; portanto p. Faça p = F e q = V: a condicional é verdadeira, q é verdadeira, mas a conclusão p é falsa.',
        'Essa combinação é um contraexemplo à validade da forma. Uma tabela-verdade ajuda a encontrá-lo: procure somente as linhas em que todas as premissas são V e verifique se a conclusão também é V. Uma linha com conclusão F invalida o argumento.'
      ]},
      {heading:'Veja o que distingue uma inferência válida',paragraphs:[
        'Agora considere p → q; p; portanto q. Se a condicional e p forem verdadeiras, q não pode ser falsa. Esse padrão é conhecido como modus ponens. Não há nenhuma interpretação em que ambas as premissas sejam V e a conclusão F.',
        'Um argumento válido não precisa ter premissas verdadeiras no mundo real; validade é a relação entre premissas e conclusão. Quando a forma é válida e as premissas também são verdadeiras, chamamos o argumento de sólido. A análise lógica separa essas duas perguntas.'
      ]}
    ],
    misconception:'Não declare um argumento válido apenas porque concorda com sua conclusão. É possível chegar a uma conclusão verdadeira por meio de um raciocínio inválido.',
    summary:'Um argumento é válido quando não há interpretação com premissas verdadeiras e conclusão falsa. Procure contraexemplos e separe validade da verdade das premissas.',
    check:{question:'Em qual situação uma linha de tabela demonstra que um argumento é inválido?',options:['Premissas verdadeiras e conclusão falsa.','Premissas falsas e conclusão verdadeira.','Premissas e conclusão todas verdadeiras.'],correct:0,why:'Uma inferência válida preserva a verdade das premissas. Uma linha com todas as premissas V e conclusão F é o contraexemplo procurado.'}
  },
  arvores:{
    objective:'Entender o objetivo de um tableau, interpretar ramos abertos e fechados e usar a negação da conclusão para testar validade.',
    sections:[
      {heading:'Outra maneira de procurar contraexemplos',paragraphs:[
        'Uma tabela-verdade examina todas as combinações de valores. Mas e se pudéssemos começar pelas condições que precisam ser verdadeiras e explorar apenas as possibilidades relevantes? É isso que fazem as árvores semânticas, também chamadas tableaux.',
        'Imagine o argumento “p ou q; não p; logo q”. Para descobrir se ele pode falhar, tente tornar as premissas verdadeiras e a conclusão falsa ao mesmo tempo. Assim, começamos com p ∨ q, ¬p e ¬q.'
      ]},
      {heading:'Cada ramo representa uma possibilidade',paragraphs:[
        'Na árvore, p ∨ q abre duas alternativas: num ramo supomos p; no outro, q. O ramo que contém p também contém ¬p, então exige que p seja verdadeira e falsa ao mesmo tempo. Isso é impossível, e o ramo fica fechado.',
        'O ramo que contém q também contém ¬q e fecha pela mesma razão. Quando um ramo reúne uma fórmula e sua negação, não pode representar uma interpretação consistente. Fechar um ramo é descartar uma possibilidade que se contradiz.'
      ]},
      {heading:'Como concluir o teste',paragraphs:[
        'Neste exemplo, todos os ramos fecham. Logo, não existe interpretação em que as premissas sejam verdadeiras e a conclusão falsa: o argumento é válido. O raciocínio é o mesmo usado na tabela, mas organizado por decomposição das fórmulas.',
        'Se algum ramo permanecer aberto e consistente depois de aplicadas as regras necessárias, seus valores podem descrever uma interpretação que satisfaz as condições iniciais. Ao testar validade com premissas e negação da conclusão, esse ramo fornece um contraexemplo.'
      ]}
    ],
    misconception:'Ramo aberto não significa automaticamente “argumento verdadeiro”. Num teste de validade, um ramo aberto consistente após a decomposição mostra justamente uma possibilidade de premissas verdadeiras e conclusão falsa.',
    summary:'Para testar validade com tableaux, reúna premissas e negação da conclusão, decomponha as fórmulas e procure ramos consistentes. Todos fechados indicam validade.',
    check:{question:'No teste de validade de um argumento, todos os ramos do tableau fecharam. O que isso indica?',options:['Existe um contraexemplo aberto.','O argumento é válido.','Todas as premissas são falsas no mundo real.'],correct:1,why:'Com todos os ramos fechados, não há interpretação que satisfaça simultaneamente as premissas e a negação da conclusão.'}
  }
};
