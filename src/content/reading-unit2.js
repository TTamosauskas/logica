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
    objective:'Reconhecer e diferenciar identidade, bivalência, terceiro excluído e não contradição na lógica clássica; usar tabelas-verdade para distinguir tautologia, contradição e contingência sem confundir leis lógicas com fatos.',
    sections:[
      {heading:'Princípios fundamentais da lógica clássica: identidade e bivalência',paragraphs:[
        'Comece com uma afirmação p, como “A porta está aberta”. O princípio clássico da identidade recorda que a afirmação considerada é ela mesma, sem trocar seu significado durante o argumento. A reflexividade da equivalência, p ↔ p, é verdadeira em todas as interpretações: quando p é V, os lados coincidem; quando p é F, também coincidem. Isso não diz que a porta está aberta, mas que a proposição mantém seu valor ao ser comparada consigo mesma.',
        'A bivalência é uma característica da semântica proposicional clássica: cada proposição recebe exatamente um valor, V ou F, na interpretação considerada. Não saber se a porta está aberta não cria um terceiro valor lógico. O princípio da identidade para objetos, a = a, é outra formulação, na lógica com igualdade; não deve ser confundido com p ↔ p. A bivalência, por sua vez, não é o mesmo enunciado que o terceiro excluído.'
      ]},
      {heading:'Terceiro excluído e não contradição: duas leis diferentes',paragraphs:[
        'O princípio do terceiro excluído é expresso por p ∨ ¬p: “a porta está aberta ou não está aberta”. Se p = V, o primeiro membro torna a disjunção V; se p = F, ¬p é V e a disjunção continua V. Por isso p ∨ ¬p é uma tautologia. Ele não revela qual alternativa é verdadeira numa situação concreta: apenas assegura que a disjunção não falha na lógica clássica.',
        'O princípio da não contradição é ¬(p ∧ ¬p): não podem valer simultaneamente p e sua negação, no mesmo sentido e na mesma interpretação. A fórmula p ∧ ¬p é sempre F; ao negá-la, obtemos uma tautologia. Se p = V, ¬p = F; se p = F, a própria p é F. As duas leis não são sinônimas: o terceiro excluído garante p ∨ ¬p; a não contradição exclui p ∧ ¬p. Outras lógicas podem tratar essas leis e a bivalência de formas distintas.'
      ]},
      {heading:'Da lei lógica à classificação por tabelas-verdade',paragraphs:[
        'Uma fórmula que produz V em todas as interpretações é uma tautologia, como p ↔ p, p ∨ ¬p e ¬(p ∧ ¬p). Já p ∧ ¬p é uma contradição: não existe valoração clássica que torne ambas as partes verdadeiras. Compare as colunas para p = V e para p = F; não é preciso supor fatos sobre a porta para descobrir esses resultados.',
        'Uma contingência pode assumir V ou F conforme a interpretação. Por exemplo, p → q é F quando p = V e q = F, mas é V nas outras três combinações. Para decidir, examine a coluna final inteira: somente V indica tautologia; somente F indica contradição; uma mistura indica contingência. Uma linha impossível como p e ¬p simultaneamente verdadeiras não é um contraexemplo real a uma lei lógica.'
      ]}
    ],
    misconception:'Não confunda bivalência com saber a verdade factual, nem identidade proposicional p ↔ p com igualdade entre indivíduos a = a. Terceiro excluído (p ∨ ¬p) e não contradição (¬(p ∧ ¬p)) têm papéis distintos; uma contradição p ∧ ¬p nunca é verdadeira na lógica clássica.',
    summary:'Na semântica clássica bivalente, cada proposição recebe V ou F. A reflexividade p ↔ p, o terceiro excluído p ∨ ¬p e a não contradição ¬(p ∧ ¬p) são tautologias, enquanto p ∧ ¬p é uma contradição. A coluna final permite diferenciar essas leis de fórmulas contingentes.',
    check:{question:'Qual fórmula expressa o princípio da não contradição na lógica proposicional clássica?',options:['¬(p ∧ ¬p), sempre V.','p ∧ ¬p, sempre V.','p ∨ ¬p, sempre F.'],correct:0,why:'O princípio nega a possibilidade de p e ¬p serem simultaneamente verdadeiras. Assim, p ∧ ¬p é sempre F, enquanto ¬(p ∧ ¬p) é sempre V. O terceiro excluído é uma lei distinta: p ∨ ¬p.'}
  },
  equivalencias:{
    objective:'Transformar expressões por uma sequência de equivalências justificadas, simplificar fórmulas e construir um contraexemplo quando um passo não preserva seu valor.',
    sections:[
      {heading:'Uma transformação precisa preservar a verdade',paragraphs:[
        'Às vezes duas expressões parecem diferentes, mas apresentam exatamente os mesmos valores de verdade. A condicional p → q, por exemplo, é falsa apenas quando p é verdadeira e q é falsa. A forma ¬p ∨ q falha exatamente no mesmo caso. Assim, podemos reescrever uma pela outra sem mudar o que a fórmula diz.',
        'A escrita p → q ≡ ¬p ∨ q registra uma equivalência. Para justificar essa transformação, podemos usar uma tabela-verdade ou uma lei cuja validade já tenha sido estabelecida. Não basta que a nova expressão pareça mais curta ou repita as mesmas letras.'
      ]},
      {heading:'Resolva um problema em dois passos explícitos',paragraphs:[
        'Considere a expressão p → q. Primeiro substitua a condicional por ¬p ∨ q, usando a eliminação da implicação material. Depois aplique De Morgan na direção inversa: ¬p ∨ q ≡ ¬(p ∧ ¬q). Chegamos a uma terceira forma sem mudar o valor lógico em nenhum passo.',
        'A sequência registra não só o resultado, mas também a justificativa de cada passagem: p → q ≡ ¬p ∨ q ≡ ¬(p ∧ ¬q). Para simplificar expressões grandes, podemos recorrer também a comutatividade, associatividade, distributividade e dupla negação, sempre respeitando os parênteses.'
      ]},
      {heading:'Um único contraexemplo rejeita um passo errado',paragraphs:[
        'Agora imagine que alguém transformou p → q em q → p. Com p = F e q = V, a primeira fórmula é verdadeira e a segunda é falsa. Como encontramos uma interpretação em que as expressões divergem, a transformação não é válida. Inverter uma condicional não é uma regra de equivalência.',
        'Ao construir uma cadeia de transformações, confira cada seta separadamente: se algum passo falha, não podemos chamar a sequência inteira de demonstração de equivalência. Esse cenário que refuta uma equivalência chama-se contraexemplo. É possível localizar precisamente o erro indicando os valores das proposições que refutam o passo.'
      ]}
    ],
    misconception:'Ter os mesmos símbolos ou coincidir em alguns casos não torna duas fórmulas equivalentes. Uma transformação só é segura quando os dois lados coincidem em todas as interpretações possíveis.',
    summary:'Simplifique expressões com passos justificados por leis lógicas. Verifique a equivalência em cada passagem e use um contraexemplo de valores de verdade para rejeitar uma transformação inválida.',
    check:{question:'Qual sequência preserva a equivalência em todos os passos?',options:['p → q ≡ ¬p ∨ q ≡ ¬(p ∧ ¬q).','p → q ≡ q → p ≡ p ∧ q.','p → q ≡ p ∧ ¬q ≡ ¬p.'],correct:0,why:'A condicional equivale a ¬p ∨ q; pela Lei de De Morgan e dupla negação, isso equivale a ¬(p ∧ ¬q). As outras cadeias falham em algumas interpretações.'}
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
