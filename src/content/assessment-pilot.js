/** Itens editoriais suplementares do piloto; cada distrator representa uma confusão plausível. */
export const PILOT_ASSESSMENTS={
  "traducao": [
    {
      "question": "Em 'Se p, então q', o que se exige para que a frase seja falsa?",
      "options": [
        "p verdadeira e q falsa",
        "p falsa e q verdadeira",
        "p e q falsas"
      ],
      "correct": 0,
      "why": "A condicional material falha precisamente quando o antecedente ocorre e o consequente não.",
      "dimension": "concept",
      "objective": "Distinguir princípio e aplicação"
    },
    {
      "question": "Uma pessoa diz 'Só vou se houver ingresso'. Qual formalização respeita 'só se'?",
      "options": [
        "vou → há ingresso",
        "há ingresso → vou",
        "vou ↔ há ingresso"
      ],
      "correct": 0,
      "why": "'Só se' enuncia condição necessária para ir, e não suficiente.",
      "dimension": "concept",
      "objective": "Distinguir princípio e aplicação"
    },
    {
      "question": "Qual é a negação de 'Todos os estudantes leram o capítulo'?",
      "options": [
        "Algum estudante não leu o capítulo",
        "Nenhum estudante leu o capítulo",
        "Algum estudante leu o capítulo"
      ],
      "correct": 0,
      "why": "Negar universal exige um contraexemplo, não trocar por universal negativa.",
      "dimension": "concept",
      "objective": "Distinguir princípio e aplicação"
    },
    {
      "question": "'p ou q' no uso inclusivo exclui o caso em que ambas são verdadeiras?",
      "options": [
        "Não, a disjunção inclusiva admite ambas",
        "Sim, sempre exatamente uma é verdadeira",
        "Só quando p implica q"
      ],
      "correct": 0,
      "why": "A disjunção inclusiva é verdadeira se ao menos uma componente é verdadeira.",
      "dimension": "concept",
      "objective": "Distinguir princípio e aplicação"
    },
    {
      "question": "Se a aprovação exige inscrição, mas a inscrição não garante aprovação, qual formulação exprime a condição?",
      "options": [
        "aprovado → inscrito",
        "inscrito → aprovado",
        "aprovado ↔ inscrito"
      ],
      "correct": 0,
      "why": "Ser inscrito é necessário para aprovação, não suficiente.",
      "dimension": "application",
      "objective": "Distinguir princípio e aplicação"
    },
    {
      "question": "Qual tradução corresponde a 'Nem Ana nem Bia viajaram'?",
      "options": [
        "¬A ∧ ¬B",
        "¬A ∨ ¬B",
        "¬(A ∧ B)"
      ],
      "correct": 0,
      "why": "A frase exclui as duas viagens, enquanto a negação da conjunção admite uma delas.",
      "dimension": "application",
      "objective": "Distinguir princípio e aplicação"
    },
    {
      "question": "Ao traduzir 'Se houver chuva, a partida será adiada', qual seria a contrapositiva?",
      "options": [
        "Se a partida não for adiada, não houve chuva",
        "Se a partida for adiada, houve chuva",
        "Se não houver chuva, não será adiada"
      ],
      "correct": 0,
      "why": "A contrapositiva é logicamente equivalente à condicional; a conversão e a inversa não são.",
      "dimension": "application",
      "objective": "Distinguir princípio e aplicação"
    },
    {
      "question": "'A menos que o sistema falhe, receberemos aviso' corresponde a qual afirmação?",
      "options": [
        "Se não recebermos aviso, o sistema falhou",
        "Se o sistema falhar, não receberemos aviso",
        "Se recebermos aviso, o sistema não falhou"
      ],
      "correct": 0,
      "why": "A construção exprime que ausência de aviso implica falha; a falha não garante ausência de aviso.",
      "dimension": "application",
      "objective": "Distinguir princípio e aplicação"
    }
  ],
  "argumentos": [
    {
      "question": "Um argumento é válido se...",
      "options": [
        "não existe interpretação com premissas verdadeiras e conclusão falsa",
        "suas premissas são de fato verdadeiras",
        "a conclusão é estatisticamente provável"
      ],
      "correct": 0,
      "why": "Validade diz respeito à impossibilidade de contraexemplo, não à verdade efetiva.",
      "dimension": "concept",
      "objective": "Distinguir princípio e aplicação"
    },
    {
      "question": "Para refutar uma alegação de validade, basta encontrar...",
      "options": [
        "premissas todas verdadeiras com conclusão falsa",
        "uma premissa falsa com conclusão falsa",
        "uma conclusão verdadeira com uma premissa falsa"
      ],
      "correct": 0,
      "why": "O contraexemplo semântico exige todas as premissas verdadeiras e conclusão falsa.",
      "dimension": "concept",
      "objective": "Distinguir princípio e aplicação"
    },
    {
      "question": "Um argumento válido com premissa falsa pode ter conclusão verdadeira?",
      "options": [
        "Sim, a validade não determina por si a verdade factual",
        "Não, uma premissa falsa torna inválido o argumento",
        "Não, validade exige premissas verdadeiras"
      ],
      "correct": 0,
      "why": "Validade e verdade das premissas são propriedades distintas.",
      "dimension": "concept",
      "objective": "Distinguir princípio e aplicação"
    },
    {
      "question": "Se não há casos em que todas as premissas sejam verdadeiras, então...",
      "options": [
        "o argumento é válido no sentido semântico clássico",
        "é inválido por falta de exemplos",
        "a conclusão é necessariamente verdadeira isoladamente"
      ],
      "correct": 0,
      "why": "Sem interpretação que satisfaça todas as premissas, não há contraexemplo à validade.",
      "dimension": "concept",
      "objective": "Distinguir princípio e aplicação"
    },
    {
      "question": "Premissas: p → q e q. Conclusão: p. Qual avaliação?",
      "options": [
        "Inválido: q pode ocorrer sem p",
        "Válido por modus ponens",
        "Válido porque q é necessária para p"
      ],
      "correct": 0,
      "why": "Afirmar o consequente não autoriza inferir o antecedente.",
      "dimension": "application",
      "objective": "Distinguir princípio e aplicação"
    },
    {
      "question": "Premissas: p ∨ q e ¬p. Conclusão: q. Qual regra?",
      "options": [
        "Silogismo disjuntivo",
        "Afirmação do consequente",
        "Negação do antecedente"
      ],
      "correct": 0,
      "why": "Excluída uma alternativa de uma disjunção, resta a outra.",
      "dimension": "application",
      "objective": "Distinguir princípio e aplicação"
    },
    {
      "question": "Uma conclusão é verdadeira no mundo real. Isso basta para provar que o argumento é válido?",
      "options": [
        "Não, é preciso examinar a relação com as premissas",
        "Sim, a verdade da conclusão garante validade",
        "Sim, desde que a conclusão seja verificável"
      ],
      "correct": 0,
      "why": "Uma conclusão verdadeira pode decorrer de inferência inválida.",
      "dimension": "application",
      "objective": "Distinguir princípio e aplicação"
    },
    {
      "question": "Premissas: Se há senha válida, o acesso abre. O acesso não abriu. O que segue?",
      "options": [
        "A senha não era válida, assumidas as premissas",
        "A senha era válida, mas houve atraso",
        "Não se pode concluir nada porque é condicional"
      ],
      "correct": 0,
      "why": "É modus tollens: p→q, ¬q, portanto ¬p.",
      "dimension": "application",
      "objective": "Distinguir princípio e aplicação"
    }
  ],
  "probabilidade": [
    {
      "question": "Sensibilidade de 90% permite afirmar probabilidade de 90% de condição entre positivos?",
      "options": [
        "Não, é necessário conhecer taxa de base e falsos positivos",
        "Sim, sensibilidade é valor preditivo positivo",
        "Não, a probabilidade é obrigatoriamente 10%"
      ],
      "correct": 0,
      "why": "P(positivo|condição) não é P(condição|positivo).",
      "dimension": "concept",
      "objective": "Distinguir princípio e aplicação"
    },
    {
      "question": "Qual é o denominador de P(condição | positivo)?",
      "options": [
        "todos os resultados positivos",
        "todas as pessoas com a condição",
        "todos os resultados negativos"
      ],
      "correct": 0,
      "why": "A informação depois da barra define o grupo de referência.",
      "dimension": "concept",
      "objective": "Distinguir princípio e aplicação"
    },
    {
      "question": "Uma prevalência muito baixa pode reduzir a fração de positivos verdadeiros?",
      "options": [
        "Sim, falsos positivos podem superar casos reais",
        "Não, prevalência não entra no cálculo",
        "Não, teste sensível elimina a influência da taxa de base"
      ],
      "correct": 0,
      "why": "A composição dos resultados positivos depende também da frequência anterior da condição.",
      "dimension": "concept",
      "objective": "Distinguir princípio e aplicação"
    },
    {
      "question": "Duas probabilidades condicionais P(A|B) e P(B|A) são necessariamente iguais?",
      "options": [
        "Não, seus denominadores diferem",
        "Sim, por simetria da condição",
        "Sim, quando A e B são eventos"
      ],
      "correct": 0,
      "why": "A ordem da condição importa e, em geral, altera o resultado.",
      "dimension": "concept",
      "objective": "Distinguir princípio e aplicação"
    },
    {
      "question": "Em 100 positivos, 12 têm a condição. Qual é P(condição|positivo)?",
      "options": [
        "12%",
        "88%",
        "A sensibilidade do teste"
      ],
      "correct": 0,
      "why": "São 12 casos entre 100 positivos.",
      "dimension": "application",
      "objective": "Distinguir princípio e aplicação"
    },
    {
      "question": "Um teste gera 4 positivos reais e 16 falsos positivos. Qual valor preditivo positivo?",
      "options": [
        "20%",
        "80%",
        "25%"
      ],
      "correct": 0,
      "why": "4/(4+16)=20%.",
      "dimension": "application",
      "objective": "Distinguir princípio e aplicação"
    },
    {
      "question": "Em 2.000 pessoas, há 20 casos e metade testa positivo; também há 90 falsos positivos. Quantos dos positivos são casos?",
      "options": [
        "10 de 100",
        "20 de 110",
        "10 de 90"
      ],
      "correct": 0,
      "why": "Há 10 verdadeiros positivos e 90 falsos; o total é 100.",
      "dimension": "application",
      "objective": "Distinguir princípio e aplicação"
    },
    {
      "question": "Um estudo informa só sensibilidade. Qual informação adicional permite estimar a fração de casos entre positivos?",
      "options": [
        "Prevalência e taxa de falsos positivos",
        "A quantidade de respostas por formulário",
        "A idade média, sem qualquer informação de especificidade"
      ],
      "correct": 0,
      "why": "É preciso a composição de casos e não casos que testam positivo.",
      "dimension": "application",
      "objective": "Distinguir princípio e aplicação"
    }
  ],
  "causalidade": [
    {
      "question": "Uma associação observacional, por si só, identifica o efeito de intervir em uma variável?",
      "options": [
        "Não, confundimento e causalidade reversa podem explicar a associação",
        "Sim, associação quantifica efeito causal",
        "Sim, quando a correlação é positiva"
      ],
      "correct": 0,
      "why": "A associação isolada não determina o contrafactual de intervenção.",
      "dimension": "concept",
      "objective": "Distinguir princípio e aplicação"
    },
    {
      "question": "O que caracteriza um confundidor?",
      "options": [
        "Uma variável relacionada à exposição e ao desfecho que pode distorcer a associação",
        "Uma consequência inevitável do tratamento",
        "Um erro de arredondamento na média"
      ],
      "correct": 0,
      "why": "O confundidor pode fornecer explicação concorrente para a associação observada.",
      "dimension": "concept",
      "objective": "Distinguir princípio e aplicação"
    },
    {
      "question": "Se indivíduos com pior desempenho procuram reforço, por que comparar notas diretamente é problemático?",
      "options": [
        "Diferenças prévias podem afetar tratamento e desfecho",
        "Porque toda comparação de médias é inválida",
        "Porque o reforço necessariamente causa pior nota"
      ],
      "correct": 0,
      "why": "A seleção para o reforço pode refletir dificuldade inicial.",
      "dimension": "concept",
      "objective": "Distinguir princípio e aplicação"
    },
    {
      "question": "Por que alocação aleatória pode ajudar em uma investigação causal?",
      "options": [
        "Tende a equilibrar fatores anteriores entre os grupos",
        "Garante que ninguém desista do estudo",
        "Elimina a necessidade de medir resultados"
      ],
      "correct": 0,
      "why": "A aleatorização reduz, em expectativa, confundimento na atribuição.",
      "dimension": "concept",
      "objective": "Distinguir princípio e aplicação"
    },
    {
      "question": "Cidades com mais bombeiros registram mais incêndios graves. Uma explicação alternativa?",
      "options": [
        "Incêndios maiores mobilizam mais bombeiros",
        "Bombeiros produzem necessariamente incêndios",
        "Não pode haver variável causal comum"
      ],
      "correct": 0,
      "why": "Pode haver causalidade reversa ou resposta do serviço à gravidade.",
      "dimension": "application",
      "objective": "Distinguir princípio e aplicação"
    },
    {
      "question": "A venda de guarda-chuvas aumenta junto às ruas molhadas. Qual variável candidata a causa comum?",
      "options": [
        "Chuva",
        "A marca dos guarda-chuvas",
        "A cor do asfalto"
      ],
      "correct": 0,
      "why": "A chuva pode elevar compras e molhar as vias.",
      "dimension": "application",
      "objective": "Distinguir princípio e aplicação"
    },
    {
      "question": "Alunos escolhidos aleatoriamente recebem uma intervenção e são comparados ao controle. Qual vantagem?",
      "options": [
        "Reduzir diferenças sistemáticas anteriores entre grupos",
        "Garantir que o tratamento funcione em todos",
        "Dispensar análise de perdas de acompanhamento"
      ],
      "correct": 0,
      "why": "Aleatorização auxilia a comparação, mas não garante resultado ou ausência de vieses posteriores.",
      "dimension": "application",
      "objective": "Distinguir princípio e aplicação"
    },
    {
      "question": "Um estudo observacional controla idade, mas não renda, associada à intervenção e ao resultado. Qual limite permanece?",
      "options": [
        "Confundimento residual por renda",
        "Impossibilidade lógica de toda inferência",
        "Prova de que a intervenção não funciona"
      ],
      "correct": 0,
      "why": "Ajustar uma variável não garante controle de todas as causas comuns.",
      "dimension": "application",
      "objective": "Distinguir princípio e aplicação"
    }
  ]
};
