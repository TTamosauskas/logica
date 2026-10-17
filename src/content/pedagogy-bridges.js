/** Pedagogia V3 — cobertura formativa integral do currículo, sem afetar notas nem progresso. */
import { PEDAGOGY_BRIDGES_I_II } from './pedagogy-v3-units12.js';
import { PEDAGOGY_BRIDGES_III_V } from './pedagogy-v3-units345.js';
import { PEDAGOGY_BRIDGES_VI_VIII } from './pedagogy-v3-units68.js';
import { PEDAGOGY_BRIDGES_VII } from './pedagogy-v3-unit7.js';
export const PEDAGOGY_BRIDGES=Object.freeze({
  ...PEDAGOGY_BRIDGES_I_II,
  ...PEDAGOGY_BRIDGES_III_V,
  ...PEDAGOGY_BRIDGES_VI_VIII,
  ...PEDAGOGY_BRIDGES_VII,
  "fundamentos": {
    "handoff": {
      "title": "Antes de começar um exercício",
      "steps": [
        "Identifique quais frases afirmam algo que pode ser verdadeiro ou falso.",
        "Dê uma letra a cada afirmação inteira, não a palavras isoladas.",
        "Se houver duas letras independentes, liste VV, VF, FV e FF antes de preencher a tabela."
      ],
      "next": "No exemplo resolvido, observe como as combinações são construídas uma de cada vez."
    },
    "bridges": [
      {
        "kind": "identificar",
        "question": "Compare: “A biblioteca está aberta” e “Abra a biblioteca!”. Qual delas pode receber V ou F?",
        "options": [
          "As duas frases.",
          "Somente “A biblioteca está aberta”.",
          "Somente “Abra a biblioteca!”."
        ],
        "correct": 1,
        "hint": "Pergunte qual frase descreve uma situação, em vez de pedir uma ação.",
        "feedback": [
          "Uma ordem não descreve uma situação verificável; ela pede uma ação.",
          "A frase afirma algo sobre a biblioteca, mesmo que não saibamos se é verdade.",
          "“Abra a biblioteca!” pede uma ação; não afirma que ela está aberta."
        ],
        "explanation": "Uma proposição afirma algo que pode receber verdadeiro ou falso. Não precisamos saber seu valor agora."
      },
      {
        "kind": "completar",
        "question": "Se p = “A biblioteca está aberta” e q = “Há estudantes na biblioteca”, o que significa q?",
        "options": [
          "A afirmação completa “Há estudantes na biblioteca”.",
          "Somente a palavra “estudantes”.",
          "A ordem “Abram a biblioteca”."
        ],
        "correct": 0,
        "hint": "Cada letra substitui uma frase declarativa inteira.",
        "feedback": [
          "Isso mesmo: q representa a afirmação inteira.",
          "Uma letra proposicional não representa apenas uma palavra isolada.",
          "q foi definida como uma afirmação, não como uma ordem."
        ],
        "explanation": "Antes de calcular, anote sempre o significado completo de cada letra."
      },
      {
        "kind": "transferir",
        "question": "Agora mude de assunto: p = “Chove” e q = “O ônibus atrasou”. Quantas combinações V/F precisamos considerar?",
        "options": [
          "Duas, porque são duas frases.",
          "Três, porque algumas situações se repetem.",
          "Quatro: VV, VF, FV e FF."
        ],
        "correct": 2,
        "hint": "Para cada valor de p (V ou F), há duas possibilidades para q.",
        "feedback": [
          "Duas é a quantidade de proposições, não de combinações possíveis.",
          "Falta uma combinação: confira q=V e q=F em cada caso de p.",
          "Correto: duas escolhas para p vezes duas para q resultam em quatro linhas."
        ],
        "explanation": "A estrutura 2²=4 vale para qualquer par de proposições independentes, mesmo em outro contexto."
      }
    ]
  },
  "traducao": {
    "handoff": {
      "title": "Roteiro para traduzir uma questão",
      "steps": [
        "Escreva o significado de p e de q antes de usar símbolos.",
        "Localize “se” ou “somente se” e pergunte o que é exigido.",
        "Leia a seta em voz alta e tente construir o caso que a regra proíbe."
      ],
      "next": "No exemplo, confira se a seta aponta da situação que depende de algo para a condição exigida."
    },
    "bridges": [
      {
        "kind": "identificar",
        "question": "“A biblioteca abre somente se houver funcionários.” O que é obrigatório para a abertura?",
        "options": [
          "Que todos os funcionários estejam ausentes.",
          "Que haja funcionários.",
          "Que a biblioteca abra sempre que houver funcionários."
        ],
        "correct": 1,
        "hint": "“Somente se” indica um requisito, não uma promessa de que ele seja suficiente.",
        "feedback": [
          "Isso impediria, em vez de permitir, a abertura.",
          "Correto: funcionários são uma condição necessária para a abertura.",
          "Ter funcionários não garante sozinho que a biblioteca abra."
        ],
        "explanation": "A regra permite funcionários sem abertura, mas não abertura sem funcionários."
      },
      {
        "kind": "completar",
        "question": "p = “O atleta compete”; q = “A inscrição está aprovada”. Como escrever “O atleta compete se a inscrição estiver aprovada”?",
        "options": [
          "q → p",
          "p → q",
          "p ∧ q"
        ],
        "correct": 0,
        "hint": "Na construção “p se q”, q é a condição suficiente que vem antes da seta.",
        "feedback": [
          "Correto: inscrição aprovada é a condição apresentada como suficiente para competir.",
          "p → q diria que competir exige inscrição, outra relação.",
          "p ∧ q afirma os dois fatos, mas não traduz a regra condicional."
        ],
        "explanation": "“p se q” equivale a “se q, então p”. Leia a expressão de volta em português."
      },
      {
        "kind": "transferir",
        "question": "“O aluno entra no laboratório somente se usar crachá.” É possível usar crachá e NÃO entrar, sem violar a regra?",
        "options": [
          "Não; usar crachá obriga a entrar.",
          "Sim; o crachá é necessário, mas não garante a entrada.",
          "Não; “somente se” significa “se, e somente se”."
        ],
        "correct": 1,
        "hint": "A regra proíbe entrar sem crachá. Ela também proíbe usar crachá sem entrar?",
        "feedback": [
          "Ter a condição necessária não é o mesmo que ter autorização ou obrigação de entrar.",
          "Correto: a regra exige o crachá para entrar, mas não promete entrada a quem usa crachá.",
          "“Somente se” expressa apenas uma direção, não o bicondicional."
        ],
        "explanation": "Com p = “entra” e q = “usa crachá”, temos p → q. O caso p=F, q=V não viola essa condicional."
      }
    ]
  },
  "equivalencias": {
    "handoff": {
      "title": "Roteiro para transformar fórmulas",
      "steps": [
        "Escreva a fórmula de partida e identifique o conectivo principal.",
        "Mude uma estrutura por vez e nomeie a lei usada na passagem.",
        "Se houver dúvida, escolha valores para p e q e compare os dois lados; uma linha diferente invalida o passo."
      ],
      "next": "No exemplo resolvido, acompanhe não só a fórmula nova, mas a justificativa de cada mudança."
    },
    "bridges": [
      {
        "kind": "identificar",
        "question": "Para mostrar que p → q e ¬p ∨ q são equivalentes, o que devemos comparar?",
        "options": [
          "O tamanho das duas expressões.",
          "Os valores das duas expressões em todas as combinações de p e q.",
          "A quantidade de letras diferentes."
        ],
        "correct": 1,
        "hint": "Uma equivalência não pode falhar em nenhuma linha da tabela.",
        "feedback": [
          "Expressões de tamanhos diferentes podem ter valores idênticos.",
          "Correto: as duas precisam coincidir em todas as valorações.",
          "Ter as mesmas letras não garante que os resultados sejam iguais."
        ],
        "explanation": "A equivalência é uma propriedade dos valores de verdade, não da aparência da fórmula."
      },
      {
        "kind": "completar",
        "question": "Complete um passo válido: p → q ≡ ¬p ∨ q ≡ ...",
        "options": [
          "¬(p ∧ ¬q)",
          "¬p ∧ q",
          "q → p"
        ],
        "correct": 0,
        "hint": "Aplique De Morgan ao contrário: ¬a ∨ b pode ser visto como ¬(a ∧ ¬b).",
        "feedback": [
          "Correto: De Morgan e dupla negação justificam essa passagem.",
          "Trocar ∨ por ∧ sem preservar a negação altera os valores.",
          "Inverter a condicional é a recíproca, não uma equivalência geral."
        ],
        "explanation": "¬(p ∧ ¬q) é falso apenas no caso p=V e q=F, exatamente como p → q."
      },
      {
        "kind": "transferir",
        "question": "Um colega diz que p → q equivale a q → p. Qual caso refuta a transformação?",
        "options": [
          "p=V, q=V.",
          "p=F, q=F.",
          "p=F, q=V."
        ],
        "correct": 2,
        "hint": "Procure valores em que a primeira condicional seja verdadeira e a segunda falsa.",
        "feedback": [
          "Com as duas verdadeiras, ambas as condicionais são verdadeiras.",
          "Com as duas falsas, ambas as condicionais são verdadeiras.",
          "Correto: F→V é verdadeiro, mas V→F é falso."
        ],
        "explanation": "Encontrar uma única linha com resultados distintos é suficiente para rejeitar uma equivalência."
      }
    ]
  }
});

export function validatePedagogyBridges(bridges=PEDAGOGY_BRIDGES){
  for(const [id,lesson] of Object.entries(bridges)){
    if(lesson.bridges?.length!==3)throw Error(`Aula ${id}: esperadas três questões-ponte`);
    if(lesson.handoff?.steps?.length!==3 || !lesson.handoff.next)throw Error(`Aula ${id}: roteiro incompleto`);
    for(const [i,bridge] of lesson.bridges.entries()){
      if(!['identificar','completar','transferir'][i] || bridge.kind!==['identificar','completar','transferir'][i])throw Error(`Aula ${id}: progressão inválida`);
      if(!bridge.question||!bridge.hint||!bridge.explanation||bridge.options?.length!==3||
         !Number.isInteger(bridge.correct)||bridge.correct<0||bridge.correct>=bridge.options.length||
         bridge.feedback?.length!==bridge.options.length||
         [...bridge.options,...bridge.feedback].some(x=>typeof x!=='string'||!x.trim()))throw Error(`Aula ${id}: questão ${i+1} inválida`);
    }
  }
  return true;
}
