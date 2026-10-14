/** Prática distinta das provas somativas para as quatro aulas teóricas. */
export const FOUNDATIONS_PRACTICE={
  "sistemas_formais": [
    {
      "question": "A sequência p∨q é uma expressão da:",
      "options": [
        "Linguagem-objeto.",
        "Metalinguagem de regras.",
        "Linguagem de uma estatística."
      ],
      "correct": 0,
      "why": "É uma fórmula proposicional construída com dois átomos e um conectivo."
    },
    {
      "question": "“p∨q é bem formada” é afirmação:",
      "options": [
        "Metalinguística sobre a estrutura.",
        "Idêntica à fórmula p∨q.",
        "Uma negação dentro da mesma fórmula."
      ],
      "correct": 0,
      "why": "A frase descreve a expressão, não a usa como proposição de seu cálculo."
    },
    {
      "question": "Um cálculo afirma: de p e p→q deriva-se q. Isso especifica:",
      "options": [
        "Uma regra sintática de inferência.",
        "Um fato sobre temperatura.",
        "Uma probabilidade condicional."
      ],
      "correct": 0,
      "why": "A regra determina quais fórmulas podem ser acrescentadas numa prova."
    },
    {
      "question": "Uma regra acertou em cinco exemplos. Já foi demonstrada correta em todos?",
      "options": [
        "Não, exemplos limitados não justificam universalidade.",
        "Sim, cinco modelos esgotam todas as linguagens.",
        "Sim, regras nunca têm contraexemplos."
      ],
      "correct": 0,
      "why": "A correção geral exige analisar todos os modelos permitidos."
    },
    {
      "question": "Ao declarar os símbolos p,q,¬,→ e parênteses, definimos:",
      "options": [
        "Parte do alfabeto, ainda faltando regras de formação.",
        "Todas as verdades da lógica.",
        "Toda consequência semântica possível."
      ],
      "correct": 0,
      "why": "Uma lista de símbolos não indica por si quais sequências são fórmulas."
    },
    {
      "question": "Uma metateoria estuda as regras de uma linguagem. Isso significa:",
      "options": [
        "Tratar o próprio sistema como objeto de investigação.",
        "Tornar toda fórmula verdadeira.",
        "Dispensar provas porque regras já foram nomeadas."
      ],
      "correct": 0,
      "why": "A metalinguagem permite descrever e testar características formais."
    }
  ],
  "sintaxe_formal": [
    {
      "question": "Qual expressão é malformada?",
      "options": [
        "p∧→q.",
        "¬p.",
        "(p∧q)."
      ],
      "correct": 0,
      "why": "A conjunção precisa receber uma fórmula válida à direita, não outro conectivo isolado."
    },
    {
      "question": "Em ¬(p∨q), o conectivo principal é:",
      "options": [
        "¬.",
        "∨.",
        "p."
      ],
      "correct": 0,
      "why": "A negação toma como argumento a disjunção inteira."
    },
    {
      "question": "Em (¬p∨q), o conectivo principal é:",
      "options": [
        "∨.",
        "¬.",
        "→."
      ],
      "correct": 0,
      "why": "A disjunção une a negação de p à fórmula q."
    },
    {
      "question": "Na árvore de (p→(q∧r)), a raiz é:",
      "options": [
        "→.",
        "∧.",
        "r."
      ],
      "correct": 0,
      "why": "O conectivo principal liga p à conjunção interna."
    },
    {
      "question": "Duas fórmulas equivalentes possuem sempre a mesma sintaxe?",
      "options": [
        "Não; podem ter árvores diferentes.",
        "Sim; equivalência exige os mesmos caracteres.",
        "Sim; somente conjunções são expressões."
      ],
      "correct": 0,
      "why": "A semântica pode coincidir mesmo quando a estrutura textual é distinta."
    },
    {
      "question": "A fórmula ∀x(P(x)→Q(x)) tem qual escopo de ∀x?",
      "options": [
        "A condicional inteira entre P(x) e Q(x).",
        "Somente o símbolo P.",
        "Todos os predicados de qualquer texto."
      ],
      "correct": 0,
      "why": "O escopo é limitado pelos parênteses que sucedem o quantificador."
    }
  ],
  "semantica_modelos": [
    {
      "question": "p∧q vale em p=V,q=F?",
      "options": [
        "Não.",
        "Sim.",
        "Não possui sentido em V/F."
      ],
      "correct": 0,
      "why": "A conjunção clássica exige V nos dois componentes."
    },
    {
      "question": "Encontrar um único modelo de φ demonstra:",
      "options": [
        "Satisfatibilidade.",
        "Validade em todas as interpretações.",
        "Que não existem contraexemplos."
      ],
      "correct": 0,
      "why": "Uma interpretação favorável prova apenas existência de satisfação."
    },
    {
      "question": "Um modelo de φ com valor F é:",
      "options": [
        "Contraexemplo à validade de φ.",
        "Prova de que φ é tautologia.",
        "Prova de que φ é malformada."
      ],
      "correct": 0,
      "why": "Validade universal falha se alguma interpretação refuta φ."
    },
    {
      "question": "p∨¬p em lógica clássica proposicional é:",
      "options": [
        "Válida.",
        "Insatisfatível.",
        "Falsa quando p é F."
      ],
      "correct": 0,
      "why": "A proposição ou sua negação vale em ambas as valorações possíveis."
    },
    {
      "question": "p∧¬p em lógica clássica proposicional é:",
      "options": [
        "Insatisfatível.",
        "Válida.",
        "Contingente."
      ],
      "correct": 0,
      "why": "Nenhuma valoração torna simultaneamente verdadeira uma proposição e sua negação."
    },
    {
      "question": "Uma interpretação atribui significado a predicados e constantes. Isso é questão de:",
      "options": [
        "Semântica.",
        "Somente pontuação sintática.",
        "Ordem cronológica do argumento."
      ],
      "correct": 0,
      "why": "A semântica determina como uma sentença é avaliada num domínio."
    }
  ],
  "metateoria": [
    {
      "question": "Em {p,p→q}⊢q, ⊢ informa:",
      "options": [
        "Existência de derivação formal.",
        "Um mundo acessível.",
        "Uma frequência empírica."
      ],
      "correct": 0,
      "why": "O símbolo relata uma conclusão alcançável segundo regras do cálculo."
    },
    {
      "question": "Em {p,p→q}⊨q, ⊨ informa:",
      "options": [
        "Preservação da verdade em todos os modelos das premissas.",
        "Apenas uma prova escrita.",
        "Um evento futuro."
      ],
      "correct": 0,
      "why": "A consequência semântica proíbe contraexemplo com premissas V e conclusão F."
    },
    {
      "question": "De Γ⊢φ podemos concluir Γ⊨φ em qualquer cálculo arbitrário?",
      "options": [
        "Não, precisamos da propriedade de correção.",
        "Sim, sem qualquer hipótese.",
        "Somente para modelos difusos."
      ],
      "correct": 0,
      "why": "Regras inválidas podem produzir conclusões deriváveis mas não semanticamente justificadas."
    },
    {
      "question": "De Γ⊨φ segue automaticamente Γ⊢φ em um sistema que só permite repetir premissas?",
      "options": [
        "Não; esse cálculo pode ser incompleto.",
        "Sim, mesmo sem regras de derivação suficientes.",
        "Sim, porque semântica e sintaxe são idênticas."
      ],
      "correct": 0,
      "why": "Consequências semânticas podem superar a força do cálculo restrito."
    },
    {
      "question": "Como mostrar que {p∨q} não implica p?",
      "options": [
        "Apresente p=F,q=V.",
        "Apresente apenas p=V,q=F.",
        "Repita o enunciado p∨q."
      ],
      "correct": 0,
      "why": "A interpretação mantém a premissa verdadeira e torna p falsa."
    },
    {
      "question": "Por que uma sequência válida de modus ponens não demonstra toda completude?",
      "options": [
        "É uma derivação particular; completude exige todas as consequências.",
        "Uma prova local já cobre todos os cálculos.",
        "A completude depende da popularidade da prova."
      ],
      "correct": 0,
      "why": "A relação entre um caso e um teorema universal precisa de justificação."
    }
  ]
};
