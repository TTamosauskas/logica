/** Suplementos de avaliação para a Unidade VIII introdutória: 8 itens por aula. */
export const FOUNDATIONS_ASSESSMENTS={
  "sistemas_formais": [
    {
      "question": "A frase “p é uma fórmula” fala de qual nível?",
      "options": [
        "Metalinguagem: descreve um elemento da linguagem-objeto.",
        "Uma operação de verdade entre p e q.",
        "Um grau difuso de pertinência."
      ],
      "correct": 0,
      "why": "A frase classifica uma expressão, em vez de funcionar como fórmula do sistema.",
      "dimension": "concept",
      "objective": "Compreensão de conceitos formais"
    },
    {
      "question": "Na lógica proposicional, qual é o papel do conectivo →?",
      "options": [
        "Integrar fórmulas da linguagem-objeto.",
        "Afirmar que todo cálculo é completo.",
        "Representar uma relação externa de demonstrabilidade."
      ],
      "correct": 0,
      "why": "O conectivo pertence à sintaxe das próprias fórmulas.",
      "dimension": "concept",
      "objective": "Compreensão de conceitos formais"
    },
    {
      "question": "Um enunciado “esta regra preserva V” é:",
      "options": [
        "Uma afirmação metateórica sobre a regra.",
        "Uma variável proposicional atômica por definição.",
        "Um testemunho pessoal sem conteúdo formal."
      ],
      "correct": 0,
      "why": "Ele discute o comportamento geral de uma transformação do cálculo.",
      "dimension": "concept",
      "objective": "Compreensão de conceitos formais"
    },
    {
      "question": "Um sistema formal é caracterizado principalmente por:",
      "options": [
        "Símbolos, regras de formação e regras de inferência explícitas.",
        "Exemplos plausíveis sem critérios de verificação.",
        "Intuições que dispensam definições."
      ],
      "correct": 0,
      "why": "O caráter formal deriva da possibilidade de verificar cada passo por regras declaradas.",
      "dimension": "concept",
      "objective": "Compreensão de conceitos formais"
    },
    {
      "question": "Qual atividade pertence à linguagem-objeto proposicional?",
      "options": [
        "Escrever (p∧q)→r como fórmula.",
        "Afirmar que todas as provas terminam.",
        "Discutir a correção universal de uma regra."
      ],
      "correct": 0,
      "why": "A primeira alternativa é uma expressão da linguagem cuja estrutura podemos interpretar.",
      "dimension": "application",
      "objective": "Aplicação em fórmula ou modelo"
    },
    {
      "question": "Um professor diz que uma regra é correta porque funcionou em três exemplos. O que falta?",
      "options": [
        "Justificação que cubra todos os casos permitidos.",
        "Uma quarta apresentação da mesma fórmula.",
        "Uma votação de alunos sobre a regra."
      ],
      "correct": 0,
      "why": "Exemplos particulares não estabelecem uma propriedade universal de todas as aplicações.",
      "dimension": "application",
      "objective": "Aplicação em fórmula ou modelo"
    },
    {
      "question": "Um cálculo autoriza escrever q a partir de p e p→q. Qual regra foi usada?",
      "options": [
        "Modus ponens, uma transformação sintática autorizada.",
        "Uma atribuição de probabilidade.",
        "Um critério de popularidade."
      ],
      "correct": 0,
      "why": "A conclusão é obtida pela forma explícita das premissas e da regra.",
      "dimension": "application",
      "objective": "Aplicação em fórmula ou modelo"
    },
    {
      "question": "Como testar a semântica de uma regra formal?",
      "options": [
        "Examinar se interpretações que satisfazem suas entradas satisfazem sua saída.",
        "Comparar nomes dos autores das provas.",
        "Trocar toda inferência por uma intuição."
      ],
      "correct": 0,
      "why": "A avaliação semântica exige relação entre verdade das premissas e da conclusão.",
      "dimension": "application",
      "objective": "Aplicação em fórmula ou modelo"
    }
  ],
  "sintaxe_formal": [
    {
      "question": "O que as regras recursivas de formação permitem?",
      "options": [
        "Construir fórmulas maiores a partir de fórmulas já válidas.",
        "Decidir que toda fórmula é semanticamente verdadeira.",
        "Descartar conectivos e parênteses."
      ],
      "correct": 0,
      "why": "A sintaxe fixa como expressões complexas são construídas sem avaliar seus valores.",
      "dimension": "concept",
      "objective": "Compreensão de conceitos formais"
    },
    {
      "question": "Qual é o conectivo principal de (p→q)∧r?",
      "options": [
        "∧.",
        "→.",
        "r."
      ],
      "correct": 0,
      "why": "A conjunção liga a condicional inteira ao átomo r.",
      "dimension": "concept",
      "objective": "Compreensão de conceitos formais"
    },
    {
      "question": "Na linguagem proposicional, o que é uma subfórmula?",
      "options": [
        "Uma expressão que aparece como componente estrutural de outra fórmula.",
        "Qualquer cadeia com um símbolo não permitido.",
        "Um sinônimo semântico do enunciado inteiro."
      ],
      "correct": 0,
      "why": "A formação recursiva gera componentes que podem ser identificados numa árvore.",
      "dimension": "concept",
      "objective": "Compreensão de conceitos formais"
    },
    {
      "question": "Por que o escopo de ¬ é sintaticamente importante?",
      "options": [
        "Define qual subfórmula a negação toma como argumento.",
        "Garante que a fórmula negada seja falsa em todo modelo.",
        "Proíbe qualquer parêntese na linguagem."
      ],
      "correct": 0,
      "why": "Negar uma conjunção não é o mesmo que negar apenas sua primeira parte.",
      "dimension": "concept",
      "objective": "Compreensão de conceitos formais"
    },
    {
      "question": "Qual cadeia não segue a gramática usual?",
      "options": [
        "(p→∧q).",
        "(p→q).",
        "¬(p∨q)."
      ],
      "correct": 0,
      "why": "O conectivo ∧ não pode ocupar o lugar de uma fórmula à direita de →.",
      "dimension": "application",
      "objective": "Aplicação em fórmula ou modelo"
    },
    {
      "question": "Em ¬(p→q), qual é o argumento imediato de ¬?",
      "options": [
        "Toda a condicional (p→q).",
        "Somente o átomo p.",
        "Somente o átomo q."
      ],
      "correct": 0,
      "why": "Os parênteses delimitam a parte completa negada.",
      "dimension": "application",
      "objective": "Aplicação em fórmula ou modelo"
    },
    {
      "question": "Em (¬p→q), qual é o conectivo principal?",
      "options": [
        "→.",
        "¬.",
        "p."
      ],
      "correct": 0,
      "why": "A implicação relaciona as duas subfórmulas ¬p e q.",
      "dimension": "application",
      "objective": "Aplicação em fórmula ou modelo"
    },
    {
      "question": "p∧q e q∧p são semanticamente equivalentes na lógica clássica. São sintaticamente idênticas?",
      "options": [
        "Não, a ordem dos componentes é diferente.",
        "Sim, equivalência implica a mesma sequência escrita.",
        "Sim, todo conectivo comutativo apaga a sintaxe."
      ],
      "correct": 0,
      "why": "Equivalência de valor lógico não torna duas cadeias de símbolos idênticas.",
      "dimension": "application",
      "objective": "Aplicação em fórmula ou modelo"
    }
  ],
  "semantica_modelos": [
    {
      "question": "Para dizer que φ é satisfatível, basta:",
      "options": [
        "Encontrar uma interpretação em que φ seja verdadeira.",
        "Mostrar que todos os modelos a satisfazem.",
        "Construir uma interpretação que a refute."
      ],
      "correct": 0,
      "why": "Satisfatibilidade é uma condição existencial sobre modelos admitidos.",
      "dimension": "concept",
      "objective": "Compreensão de conceitos formais"
    },
    {
      "question": "Para dizer que φ é válida, é necessário:",
      "options": [
        "Que φ seja verdadeira em todas as interpretações admitidas.",
        "Que alguém a tenha afirmado com convicção.",
        "Apenas um exemplo favorável."
      ],
      "correct": 0,
      "why": "Validade semântica é uma condição universal sobre interpretações.",
      "dimension": "concept",
      "objective": "Compreensão de conceitos formais"
    },
    {
      "question": "Qual é a distinção entre modelo e realidade?",
      "options": [
        "Um modelo é estrutura matemática que satisfaz fórmulas, não necessariamente descrição factual correta.",
        "Um modelo sempre corresponde exatamente ao mundo real.",
        "Modelo é apenas outro nome para uma prova."
      ],
      "correct": 0,
      "why": "Semântica examina interpretações, que podem ser hipotéticas ou abstratas.",
      "dimension": "concept",
      "objective": "Compreensão de conceitos formais"
    },
    {
      "question": "Uma fórmula contingente na lógica proposicional clássica é:",
      "options": [
        "Verdadeira em algumas valorações e falsa em outras.",
        "Verdadeira em todas as valorações.",
        "Falsa em todas as valorações."
      ],
      "correct": 0,
      "why": "A contingência apresenta tanto testemunha quanto contraexemplo.",
      "dimension": "concept",
      "objective": "Compreensão de conceitos formais"
    },
    {
      "question": "Com p=V e q=F, p→q é:",
      "options": [
        "F.",
        "V.",
        "Indefinida na lógica clássica."
      ],
      "correct": 0,
      "why": "A condicional material falha quando o antecedente é V e o consequente é F.",
      "dimension": "application",
      "objective": "Aplicação em fórmula ou modelo"
    },
    {
      "question": "Qual fórmula possui contraexemplo com p=F?",
      "options": [
        "p.",
        "p∨¬p.",
        "¬(p∧¬p)."
      ],
      "correct": 0,
      "why": "A fórmula atômica p é falsa nessa valoração; as duas alternativas são válidas classicamente.",
      "dimension": "application",
      "objective": "Aplicação em fórmula ou modelo"
    },
    {
      "question": "Se nenhuma interpretação satisfaz φ, ela é:",
      "options": [
        "Insatisfatível.",
        "Válida por possuir muitos modelos.",
        "Necessariamente contingente."
      ],
      "correct": 0,
      "why": "A ausência de qualquer modelo é o critério de insatisfatibilidade.",
      "dimension": "application",
      "objective": "Aplicação em fórmula ou modelo"
    },
    {
      "question": "Uma estrutura M satisfaz p∧q. O que se conclui sobre p?",
      "options": [
        "M também satisfaz p.",
        "p é válida em todos os modelos.",
        "q é falsa em M."
      ],
      "correct": 0,
      "why": "A semântica clássica de ∧ exige verdade de ambos os componentes em M.",
      "dimension": "application",
      "objective": "Aplicação em fórmula ou modelo"
    }
  ],
  "metateoria": [
    {
      "question": "A expressão Γ⊨φ significa:",
      "options": [
        "Toda interpretação que satisfaz Γ também satisfaz φ.",
        "Há uma derivação escrita por um cálculo específico.",
        "φ foi considerada provável em uma pesquisa."
      ],
      "correct": 0,
      "why": "Consequência semântica é definida pela ausência de contraexemplo em modelos.",
      "dimension": "concept",
      "objective": "Compreensão de conceitos formais"
    },
    {
      "question": "A expressão Γ⊢φ significa:",
      "options": [
        "Há derivação formal de φ a partir de Γ no cálculo escolhido.",
        "Todas as pessoas concordam com φ.",
        "φ satisfaz qualquer modelo por definição."
      ],
      "correct": 0,
      "why": "O símbolo ⊢ registra demonstrabilidade segundo regras determinadas.",
      "dimension": "concept",
      "objective": "Compreensão de conceitos formais"
    },
    {
      "question": "Qual propriedade exprime Γ⊢φ ⇒ Γ⊨φ?",
      "options": [
        "Correção, relativamente a cálculo e semântica fixados.",
        "Completude, na direção contrária.",
        "Uma taxa de probabilidade."
      ],
      "correct": 0,
      "why": "Correção relaciona derivação autorizada à preservação semântica de verdade.",
      "dimension": "concept",
      "objective": "Compreensão de conceitos formais"
    },
    {
      "question": "Qual propriedade exprime Γ⊨φ ⇒ Γ⊢φ?",
      "options": [
        "Completude, quando estabelecida para o cálculo escolhido.",
        "Correção, na direção contrária.",
        "Ausência de modelos permitidos."
      ],
      "correct": 0,
      "why": "A completude garante que toda consequência semântica tem derivação formal.",
      "dimension": "concept",
      "objective": "Compreensão de conceitos formais"
    },
    {
      "question": "Em p→q e p como premissas, existe derivação de q por:",
      "options": [
        "Modus ponens.",
        "Troca arbitrária de átomos.",
        "Generalização a partir de opiniões."
      ],
      "correct": 0,
      "why": "A regra transforma a conjunção de antecedente e condicional numa conclusão.",
      "dimension": "application",
      "objective": "Aplicação em fórmula ou modelo"
    },
    {
      "question": "Uma interpretação com Γ verdadeira e φ falsa refuta:",
      "options": [
        "Γ⊨φ.",
        "A existência da própria linguagem.",
        "Qualquer derivação não relacionada a Γ."
      ],
      "correct": 0,
      "why": "Um modelo das premissas que falsifica φ é contraexemplo direto à consequência.",
      "dimension": "application",
      "objective": "Aplicação em fórmula ou modelo"
    },
    {
      "question": "Se um aluno ainda não achou prova de φ, isso demonstra que Γ⊬φ?",
      "options": [
        "Não, a ausência de prova encontrada não demonstra inexistência de qualquer derivação.",
        "Sim, basta desistir da busca.",
        "Sim, uma tentativa falha é contraexemplo semântico."
      ],
      "correct": 0,
      "why": "Não descobrir prova é diferente de demonstrar impossibilidade de derivação.",
      "dimension": "application",
      "objective": "Aplicação em fórmula ou modelo"
    },
    {
      "question": "Em lógica proposicional clássica, como verificar semanticamente {p,p→q}⊨q?",
      "options": [
        "Observar que não existe valoração com ambas premissas V e q F.",
        "Procurar somente uma linha em que p é F.",
        "Considerar q sempre verdadeira por popularidade."
      ],
      "correct": 0,
      "why": "As premissas forçam q porque V→F tornaria a condicional falsa.",
      "dimension": "application",
      "objective": "Aplicação em fórmula ou modelo"
    }
  ]
};
