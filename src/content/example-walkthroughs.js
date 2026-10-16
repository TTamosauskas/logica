/** Exemplos resolvidos concretos e segmentados para as 61 aulas do Curso Guiado. */
import { ERROR_WORKED_EXAMPLES } from './errors-course.js';
import { OTHER_LOGIC_WORKED } from './other-logics-course.js';
import { FOUNDATIONS_WORKED } from './foundations-a.js';
import { GAP_WORKED_A } from './gap-lessons-a.js';
import { GAP_WORKED_B } from './gap-lessons-b.js';
import { MICRO_WORKED_A } from './micro-lessons-a.js';
import { MICRO_WORKED_B } from './micro-lessons-b.js';
import { FOCUSED_WORKED_A } from './focused-lessons-a.js';
import { FOCUSED_WORKED_B } from './focused-lessons-b.js';
export const WORKED_EXAMPLES={
  ...ERROR_WORKED_EXAMPLES,
  "fundamentos": {
    "context": "p = “O laboratório está aberto”; q = “A equipe chegou”.",
    "steps": [
      {
        "formal": "Duas proposições: 2² = 4 atribuições.",
        "concrete": "A abertura do laboratório e a chegada da equipe são duas afirmações independentes na tabela.",
        "reason": "Cada uma admite V ou F; combinamos dois valores possíveis para cada letra."
      },
      {
        "formal": "Liste (V,V), (V,F), (F,V) e (F,F).",
        "concrete": "O laboratório pode estar aberto com equipe presente, aberto sem equipe, fechado com equipe ou fechado sem equipe.",
        "reason": "As quatro combinações representam possibilidades de avaliação, não quatro acontecimentos observados."
      },
      {
        "formal": "Nenhuma combinação ficou de fora.",
        "concrete": "Mesmo que hoje o laboratório esteja fechado e a equipe presente, as outras três linhas continuam na tabela.",
        "reason": "A tabela verifica a estrutura das proposições, independentemente dos fatos atuais."
      }
    ],
    "check": {
      "question": "Se p=F e q=V, qual linha representa o cenário?",
      "options": [
        "(F,V)",
        "(V,F)",
        "(V,V)"
      ],
      "correct": 0,
      "why": "p é a abertura do laboratório (F) e q é a presença da equipe (V)."
    }
  },
  "operadores": {
    "context": "p = “Ana estudou” (V); q = “Bruno trabalhou” (F).",
    "steps": [
      {
        "formal": "p ∧ q = F.",
        "concrete": "“Ana estudou e Bruno trabalhou” é falsa no cenário: Bruno não trabalhou.",
        "reason": "A conjunção exige os dois termos verdadeiros."
      },
      {
        "formal": "p ∨ q = V.",
        "concrete": "“Ana estudou ou Bruno trabalhou” é verdadeira, pois Ana estudou.",
        "reason": "O “ou” inclusivo exige pelo menos uma alternativa verdadeira."
      },
      {
        "formal": "p → q = F.",
        "concrete": "“Se Ana estudou, então Bruno trabalhou” é falsa neste cenário.",
        "reason": "Uma condicional material só é falsa quando o antecedente é V e o consequente é F."
      }
    ],
    "check": {
      "question": "Com p=V e q=F, qual é o valor de p→q?",
      "options": [
        "V",
        "F",
        "Não tem valor"
      ],
      "correct": 1,
      "why": "A condicional material falha exatamente no caso V→F."
    }
  },
  "traducao": {
    "context": "p = “O laboratório abre”; q = “Há autorização”.",
    "steps": [
      {
        "formal": "Identifique p e q; ∵ pode introduzir uma justificativa, mas não é conectivo.",
        "concrete": "A frase “O laboratório abre somente se houver autorização” fala da abertura e da autorização.",
        "reason": "Separar as proposições evita confundir suas funções."
      },
      {
        "formal": "“Somente se q” exige q como condição necessária de p.",
        "concrete": "Se o laboratório abriu, necessariamente houve autorização; mas pode haver autorização sem abertura.",
        "reason": "A necessidade é da autorização para a abertura, não o contrário."
      },
      {
        "formal": "Tradução: p → q.",
        "concrete": "“Se o laboratório abre, então há autorização”.",
        "reason": "A inversão q→p afirmaria mais do que o enunciado original autoriza."
      }
    ],
    "check": {
      "question": "O que “O laboratório abre somente se houver autorização” autoriza concluir?",
      "options": [
        "Autorização implica abertura.",
        "Abertura implica autorização.",
        "Abertura e autorização são sempre falsas."
      ],
      "correct": 1,
      "why": "“Somente se” marca a autorização como necessária: p→q."
    }
  },
  "falacias": {
    "context": "p = “Choveu”; q = “A rua está molhada”.",
    "steps": [
      {
        "formal": "Traduza: p → q; q; conclusão proposta: p.",
        "concrete": "“Se choveu, a rua molhou; a rua está molhada; logo, choveu.”",
        "reason": "A conclusão introduzida por ∴ (“portanto”) afirma o antecedente a partir da observação do consequente. ∴ e ∵ são marcadores do texto, não operadores das fórmulas."
      },
      {
        "formal": "Teste p=F e q=V.",
        "concrete": "Não choveu, mas um caminhão-pipa molhou a rua: a condição “se choveu, molhou” permanece verdadeira.",
        "reason": "Um único cenário com as premissas verdadeiras e a conclusão falsa refuta a validade."
      },
      {
        "formal": "Diagnóstico: afirmação do consequente.",
        "concrete": "Ver a rua molhada não comprova que houve chuva: pode haver outra causa.",
        "reason": "A forma p→q; q ⊭ p não preserva a verdade em todas as interpretações."
      }
    ],
    "check": {
      "question": "Por que a conclusão “Choveu” não é necessária?",
      "options": [
        "Porque a rua pode ter sido molhada por outra causa.",
        "Porque q precisa ser falsa.",
        "Porque toda condicional é falsa."
      ],
      "correct": 0,
      "why": "O contraexemplo p=F, q=V mantém as premissas verdadeiras e derruba a conclusão."
    }
  },
  "pressupostos": {
    "context": "Após mudar o horário escolar, as notas da turma aumentaram.",
    "steps": [
      {
        "formal": "Observação: as notas subiram depois da mudança.",
        "concrete": "No semestre seguinte ao novo horário, a média da turma passou de 6 para 7.",
        "reason": "O dado informa uma sequência temporal; ainda não estabelece causa."
      },
      {
        "formal": "Identifique o pressuposto não declarado.",
        "concrete": "Para atribuir o aumento ao horário, seria preciso afastar mudanças relevantes nas provas, nas turmas e na preparação.",
        "reason": "Uma conclusão causal exige controle de explicações concorrentes."
      },
      {
        "formal": "Teste uma explicação alternativa.",
        "concrete": "Se as provas ficaram mais fáceis no mesmo período, as notas podem aumentar mesmo que o horário não tenha melhorado a aprendizagem.",
        "reason": "Uma hipótese alternativa compatível reduz a força da conclusão original."
      }
    ],
    "check": {
      "question": "Qual informação ajudaria a atribuir causalidade ao horário?",
      "options": [
        "As provas e condições de ensino eram comparáveis.",
        "A direção repetiu a afirmação.",
        "As notas foram publicadas."
      ],
      "correct": 0,
      "why": "Controlar mudanças concorrentes fortalece a análise causal."
    }
  },
  "compostas": {
    "context": "p = “O laboratório abriu” (F); q = “A equipe chegou” (V).",
    "steps": [
      {
        "formal": "Primeiro, p ∨ q = V.",
        "concrete": "“O laboratório abriu ou a equipe chegou” é verdadeira porque a equipe chegou.",
        "reason": "O “ou” inclusivo vale V quando alguma parte é V."
      },
      {
        "formal": "Depois, ¬p = V.",
        "concrete": "“O laboratório não abriu” é verdadeira neste cenário.",
        "reason": "A negação de p=F tem valor V."
      },
      {
        "formal": "Por fim, (p ∨ q) ∧ ¬p = V.",
        "concrete": "“O laboratório abriu ou a equipe chegou, e o laboratório não abriu” é verdadeira porque as duas partes calculadas são V.",
        "reason": "A conjunção final combina V e V; os parênteses determinam a ordem."
      }
    ],
    "check": {
      "question": "Por que a conjunção final é V?",
      "options": [
        "Porque p=V.",
        "Porque p∨q=V e ¬p=V.",
        "Porque toda expressão com ¬ é verdadeira."
      ],
      "correct": 1,
      "why": "Ambas as subfórmulas da conjunção valem V."
    }
  },
  "demorgan": {
    "context": "p = “Ana trouxe o livro”; q = “Ana trouxe o caderno”.",
    "steps": [
      {
        "formal": "Negar p ∨ q: ¬(p ∨ q).",
        "concrete": "“Não é verdade que Ana trouxe o livro ou o caderno”.",
        "reason": "Para a disjunção inclusiva ser falsa, nenhum dos objetos pode ter sido trazido."
      },
      {
        "formal": "Aplique De Morgan: ¬p ∧ ¬q.",
        "concrete": "“Ana não trouxe o livro e não trouxe o caderno”.",
        "reason": "Ao negar a disjunção, negamos ambos os termos e trocamos ∨ por ∧."
      },
      {
        "formal": "Confira p=F, q=F e p=V, q=F.",
        "concrete": "Sem os dois objetos, ambas as expressões valem V; trazendo só o livro, ambas valem F.",
        "reason": "A igualdade deve se manter em todas as quatro atribuições, não apenas nestes exemplos."
      }
    ],
    "check": {
      "question": "Se Ana trouxe o livro, mas não o caderno, quanto vale ¬(p∨q)?",
      "options": [
        "V",
        "F",
        "Depende de um terceiro objeto"
      ],
      "correct": 1,
      "why": "A disjunção é V quando há ao menos um objeto; sua negação é F."
    }
  },
  "classificacao": {
    "context": "p = “A porta está aberta”.",
    "steps": [
      {
        "formal": "Identidade proposicional: p ↔ p ≡ ⊤ (sempre verdadeira).",
        "concrete": "Se a porta está aberta, p coincide consigo mesma; se está fechada, também coincide. Em ambos os casos, p recebe V ou F.",
        "reason": "p↔p é tautologia; a identidade entre indivíduos (a=a) é outra construção lógica."
      },
      {
        "formal": "Terceiro excluído: p ∨ ¬p ≡ ⊤.",
        "concrete": "“A porta está aberta ou não está aberta” é verdadeira nas duas situações possíveis.",
        "reason": "A disjunção não determina qual das alternativas descreve a realidade."
      },
      {
        "formal": "Não contradição: ¬(p ∧ ¬p) ≡ ⊤; p ∧ ¬p ≡ ⊥.",
        "concrete": "“Não é o caso que a porta esteja aberta e não esteja aberta ao mesmo tempo e no mesmo sentido”.",
        "reason": "⊤ é a constante verdadeira e ⊥, a falsa; as fórmulas equivalentes a elas recebem o mesmo valor em toda interpretação clássica."
      }
    ],
    "check": {
      "question": "Qual expressão é sempre F na lógica clássica?",
      "options": [
        "p∨¬p",
        "p∧¬p",
        "p↔p"
      ],
      "correct": 1,
      "why": "p e ¬p nunca recebem V juntas na mesma interpretação clássica."
    }
  },
  "equivalencias": {
    "context": "p = “Comi o prato”; q = “Gostei do prato”, na mesma ocasião.",
    "steps": [
      {
        "formal": "Comece com a condicional material: p → q.",
        "concrete": "“Se comi o prato, então gostei dele”.",
        "reason": "Na semântica clássica, essa expressão falha apenas quando comi (p=V) e não gostei (q=F)."
      },
      {
        "formal": "Elimine a condicional: p → q ≡ ¬p ∨ q.",
        "concrete": "“Se comi, então gostei” equivale logicamente a “Não comi ou gostei”.",
        "reason": "O “ou” é inclusivo; trata-se de equivalência de valores V/F, não de causalidade."
      },
      {
        "formal": "Aplique De Morgan e dupla negação: ¬p ∨ q ≡ ¬(p ∧ ¬q).",
        "concrete": "“Não é verdade que comi o prato e não gostei dele”.",
        "reason": "Todas as formas falham exatamente no caso p=V, q=F; por isso são equivalentes."
      }
    ],
    "check": {
      "question": "Quando todas essas formas são falsas?",
      "options": [
        "Quando comi e não gostei.",
        "Quando não comi e gostei.",
        "Quando comi e gostei."
      ],
      "correct": 0,
      "why": "A condicional e suas equivalentes falham exatamente em p=V, q=F."
    }
  },
  "argumentos": {
    "context": "p = “Choveu”; q = “A rua está molhada”. Premissas: p→q e p.",
    "steps": [
      {
        "formal": "Premissa 1: p → q.",
        "concrete": "“Se choveu, a rua ficou molhada”.",
        "reason": "A regra condicional relaciona chuva e rua molhada."
      },
      {
        "formal": "Premissa 2: p.",
        "concrete": "“Choveu”, no cenário considerado.",
        "reason": "Entre as interpretações em que ambas as premissas são V, p deve valer V."
      },
      {
        "formal": "Conclusão: q (modus ponens).",
        "concrete": "“Logo, a rua está molhada”.",
        "reason": "Com p→q=V e p=V, q não pode ser F; não existe contraexemplo a esta forma."
      }
    ],
    "check": {
      "question": "O que invalidaria o argumento?",
      "options": [
        "Uma linha com ambas as premissas V e q=F.",
        "Uma linha com p=F.",
        "Uma linha com conclusão V."
      ],
      "correct": 0,
      "why": "Validade falha somente se houver premissas todas V e conclusão F."
    }
  },
  "arvores": {
    "context": "p = “O arquivo está na pasta A”; q = “O arquivo está na pasta B”.",
    "steps": [
      {
        "formal": "Para testar p∨q, ¬p ⊨ q, considere p∨q, ¬p e ¬q.",
        "concrete": "“O arquivo está em A ou B; não está em A; tente também supor que não está em B”.",
        "reason": "Negamos a conclusão para procurar uma interpretação que refute a inferência."
      },
      {
        "formal": "De p∨q, abra dois ramos: p | q.",
        "concrete": "Em um ramo o arquivo está em A; no outro está em B.",
        "reason": "Uma disjunção verdadeira permite alternativas, não obriga ambas."
      },
      {
        "formal": "Feche os dois ramos: p com ¬p; q com ¬q.",
        "concrete": "Um ramo diz que está e não está em A; o outro, que está e não está em B.",
        "reason": "Não sobra cenário consistente com premissas V e conclusão F; o argumento é válido."
      }
    ],
    "check": {
      "question": "Por que os dois ramos fecham?",
      "options": [
        "Cada um contém uma fórmula e sua negação.",
        "Porque toda disjunção é falsa.",
        "Porque o arquivo precisa estar nas duas pastas."
      ],
      "correct": 0,
      "why": "Em cada ramo surge uma contradição, excluindo o contraexemplo."
    }
  },
  "silogismos": {
    "context": "p = “A matrícula está ativa”; q = “O acesso foi liberado”; r = “O material está disponível”.",
    "steps": [
      {
        "formal": "Premissa 1: p → q.",
        "concrete": "“Se a matrícula está ativa, o acesso foi liberado”.",
        "reason": "A primeira regra liga a matrícula ao acesso."
      },
      {
        "formal": "Premissa 2: q → r.",
        "concrete": "“Se o acesso foi liberado, o material está disponível”.",
        "reason": "A segunda regra parte exatamente da conclusão intermediária q."
      },
      {
        "formal": "Conclusão: p → r.",
        "concrete": "“Se a matrícula está ativa, o material está disponível”.",
        "reason": "As duas condicionais formam uma cadeia: p leva a q, e q leva a r."
      }
    ],
    "check": {
      "question": "Qual relação completa a cadeia p→q e q→r?",
      "options": [
        "r→p",
        "p→r",
        "p∧r"
      ],
      "correct": 1,
      "why": "O silogismo hipotético encadeia os condicionais na mesma direção."
    }
  },
  "provas": {
    "context": "p = “O alarme disparou”; q = “A mensagem foi enviada”.",
    "steps": [
      {
        "formal": "Prova direta: p→q e p ⊢ q.",
        "concrete": "“Se o alarme disparar, haverá aviso; o alarme disparou; logo, houve aviso”.",
        "reason": "A regra modus ponens usa as duas premissas, sem exigir saber se o alarme disparou na realidade."
      },
      {
        "formal": "Contradição e explosão clássica: p, ¬p ⊢ ⊥; de ⊥ segue q.",
        "concrete": "“O alarme disparou” e “O alarme não disparou” são premissas incompatíveis; formalmente delas podemos deduzir “O aviso foi enviado”.",
        "reason": "De p derive p∨q; com ¬p use o silogismo disjuntivo. Isso não comprova que a mensagem foi realmente enviada."
      },
      {
        "formal": "Redução ao absurdo: suponha ¬p, obtenha ⊥ e conclua p (clássica).",
        "concrete": "Para provar que o alarme disparou a partir de “não é verdade que não disparou”, suponha temporariamente que não disparou; essa hipótese contradiz a premissa.",
        "reason": "A hipótese ¬p é descartada ao produzir contradição. Não é uma premissa mantida como fato."
      }
    ],
    "check": {
      "question": "Na redução ao absurdo, o que acontece com a hipótese que leva à contradição?",
      "options": [
        "Permanece como premissa factual.",
        "É descartada ao concluir a tese.",
        "Torna qualquer frase empiricamente verdadeira."
      ],
      "correct": 1,
      "why": "A hipótese provisória é descarregada; a explosão é outra regra da lógica clássica."
    }
  },
  "deducao": {
    "context": "Ana, Beto e Caio recebem organização, revisão e apresentação, uma função por pessoa.",
    "steps": [
      {
        "formal": "São 3! = 6 atribuições distintas.",
        "concrete": "Ana pode ocupar uma de três funções, Beto uma das duas restantes e Caio fica com a última.",
        "reason": "O conjunto finito de possibilidades pode ser enumerado sem adivinhar."
      },
      {
        "formal": "Considere Ana=organização, Beto=revisão, Caio=apresentação.",
        "concrete": "Pista 1: “Ana não revisa” = V; pista 2: “Beto apresenta” = F; pista 3: “Caio não revisa” = V.",
        "reason": "Para testar essa distribuição, avalie cada pista separadamente."
      },
      {
        "formal": "A sequência V,F,V satisfaz “exatamente uma falsa”.",
        "concrete": "Nesta distribuição apenas a pista sobre Beto falha; ela permanece candidata.",
        "reason": "Satisfazer uma restrição não garante solução única: as outras atribuições também devem ser testadas."
      }
    ],
    "check": {
      "question": "A distribuição que produz V,F,V é necessariamente a única solução?",
      "options": [
        "Sim, porque há uma F.",
        "Não; outras distribuições precisam ser testadas.",
        "Não há nenhuma solução possível."
      ],
      "correct": 1,
      "why": "Uma candidata que satisfaz as condições não elimina automaticamente as outras."
    }
  },
  "categoricos": {
    "context": "S = filósofos; M = humanos; P = mortais.",
    "steps": [
      {
        "formal": "Premissa 1: todos S são M.",
        "concrete": "“Todos os filósofos são humanos”. No Venn, a parte S fora de M deve ficar vazia.",
        "reason": "Nenhum filósofo pode estar fora do conjunto dos humanos, se a premissa for V."
      },
      {
        "formal": "Premissa 2: todos M são P.",
        "concrete": "“Todos os humanos são mortais”. Hachure a parte M fora de P.",
        "reason": "Não sobra um humano que possa pertencer a M e ficar fora de P."
      },
      {
        "formal": "Conclusão: todos S são P.",
        "concrete": "“Todos os filósofos são mortais”. A região S fora de P fica vazia.",
        "reason": "A inclusão S⊆M⊆P é transitiva; o argumento dispensa supor existência de filósofos."
      }
    ],
    "check": {
      "question": "O que devemos marcar como vazio no Venn ao afirmar “Todos S são M”?",
      "options": [
        "S fora de M",
        "S dentro de M",
        "Tudo fora de S"
      ],
      "correct": 0,
      "why": "A universal exclui casos de S que não sejam M."
    }
  },
  "categoricos2": {
    "context": "S = estudantes; P = músicos. A: “Todos S são P”; I: “Alguns S são P”.",
    "steps": [
      {
        "formal": "Com S não vazio e A=V, segue I=V.",
        "concrete": "Se a turma tem estudantes e todos tocam música, existe pelo menos um estudante músico.",
        "reason": "A passagem de A para I usa explicitamente a existência de algum S."
      },
      {
        "formal": "Com S vazio, A=V e I=F.",
        "concrete": "Se a escola não tem nenhum estudante, “Todos os estudantes são músicos” não tem contraexemplo, mas “Algum estudante é músico” não tem testemunha.",
        "reason": "Na semântica moderna a universal é verdadeira por vacuidade, a particular é falsa."
      },
      {
        "formal": "A não implica I sem hipótese S≠∅.",
        "concrete": "A mesma frase universal pode ser verdadeira nos dois cenários; a particular muda de valor.",
        "reason": "A subalternação requer existência do sujeito; as relações de contradição A–O e E–I permanecem."
      }
    ],
    "check": {
      "question": "Se não existe nenhum estudante, que valores recebem A e I?",
      "options": [
        "A=F, I=V",
        "A=V, I=F",
        "Ambas V"
      ],
      "correct": 1,
      "why": "A universal não encontra contraexemplo; a particular exige uma testemunha, que não existe."
    }
  },
  "predicados2": {
    "context": "Ana e Beto venceram uma competição; “O vencedor recebeu o prêmio”.",
    "steps": [
      {
        "formal": "Existência: ∃x Venceu(x) é verdadeira.",
        "concrete": "Há pelo menos uma pessoa vencedora: Ana e Beto venceram.",
        "reason": "A existência de vencedores não determina quantos existem."
      },
      {
        "formal": "Unicidade: ∃!x Venceu(x) é falsa (não há exatamente um vencedor).",
        "concrete": "Como duas pessoas diferentes venceram, não há um único vencedor.",
        "reason": "∃!x Venceu(x) conta testemunhas distintas; com Ana e Beto vencedores o valor é F. Em lógica com igualdade, equivale a ∃x(Venceu(x)∧∀y(Venceu(y)→y=x))."
      },
      {
        "formal": "A descrição definida falha na análise estudada.",
        "concrete": "Mesmo que Ana e Beto recebam prêmios, “O vencedor recebeu o prêmio” pressupõe exatamente um vencedor nessa formalização.",
        "reason": "Existência, unicidade e predicação são condições diferentes; não confunda êxito de ambas com unicidade."
      }
    ],
    "check": {
      "question": "Se Ana e Beto venceram, qual condição da descrição “o vencedor” falha?",
      "options": [
        "Existência",
        "Unicidade",
        "A existência de dois prêmios"
      ],
      "correct": 1,
      "why": "Há vencedores, mas não exatamente um vencedor."
    }
  },
  "inducao": {
    "context": "Dez colegas de uma turma foram entrevistados sobre a biblioteca; nove responderam “gosto”.",
    "steps": [
      {
        "formal": "Na amostra, 9/10 = 90%.",
        "concrete": "Nove dos dez colegas entrevistados gostam da biblioteca.",
        "reason": "A proporção descreve somente esse grupo observado."
      },
      {
        "formal": "Identifique a população visada: toda a escola.",
        "concrete": "A conclusão pretendida é que 90% de todos os alunos gostem da biblioteca.",
        "reason": "Os dez entrevistados são uma amostra de uma única turma, não necessariamente representativa."
      },
      {
        "formal": "Conclusão cautelosa: 90% dos entrevistados, não da escola.",
        "concrete": "Para estimar a escola toda, selecione estudantes de turmas e turnos diversos.",
        "reason": "Uma generalização indutiva exige evidência adequada à população-alvo."
      }
    ],
    "check": {
      "question": "Qual afirmação é justificada pelos dez entrevistados?",
      "options": [
        "90% dos dez entrevistados gostam da biblioteca.",
        "90% de toda a escola gosta da biblioteca.",
        "Todos os alunos gostam da biblioteca."
      ],
      "correct": 0,
      "why": "A proporção observada não pode ser automaticamente generalizada."
    }
  },
  "abducao": {
    "context": "O pátio da escola amanheceu molhado.",
    "steps": [
      {
        "formal": "Observe o fato: pátio molhado.",
        "concrete": "A água no chão é observada; sua origem ainda não é conhecida.",
        "reason": "Uma observação não identifica sozinha a explicação correta."
      },
      {
        "formal": "Hipóteses: chuva ou lavagem.",
        "concrete": "Pode ter chovido durante a noite ou a equipe de limpeza pode ter lavado o pátio.",
        "reason": "Ambas as hipóteses explicam o fato, então ainda é preciso diferenciá-las."
      },
      {
        "formal": "Busque uma previsão discriminante.",
        "concrete": "Se choveu, áreas descobertas afastadas também tendem a ficar molhadas; se houve lavagem localizada, talvez só o pátio esteja molhado.",
        "reason": "Compare as previsões com novas observações e atualize a conclusão sem exagerar a certeza."
      }
    ],
    "check": {
      "question": "Qual evidência ajudaria a distinguir chuva de lavagem?",
      "options": [
        "Verificar se outras áreas descobertas estão molhadas.",
        "Repetir que o pátio está molhado.",
        "Escolher a hipótese mais popular."
      ],
      "correct": 0,
      "why": "Previsões que diferem entre hipóteses fornecem testes informativos."
    }
  },
  "probabilidade": {
    "context": "Em 1.000 pessoas, 10 têm a condição. O teste identifica 8 delas e gera 99 positivos falsos.",
    "steps": [
      {
        "formal": "Conte os positivos: 8 + 99 = 107.",
        "concrete": "O exame marcou 107 pessoas: 8 realmente têm a condição e 99 não têm.",
        "reason": "A pergunta “entre os positivos, quantos são casos?” exige usar 107 como total."
      },
      {
        "formal": "Calcule P(condição | positivo) = 8/107 ≈ 7,5%.",
        "concrete": "De cada 107 exames positivos desse grupo, apenas 8 correspondem a casos reais.",
        "reason": "O denominador é o conjunto de pessoas que testaram positivo."
      },
      {
        "formal": "Compare sensibilidade: 8/10 = 80%.",
        "concrete": "Entre as dez pessoas com a condição, o teste identificou oito.",
        "reason": "P(positivo | condição) e P(condição | positivo) são probabilidades distintas."
      }
    ],
    "check": {
      "question": "Qual denominador usar para “casos reais entre todos os positivos”?",
      "options": [
        "10",
        "107",
        "1.000"
      ],
      "correct": 1,
      "why": "O grupo condicionado é o dos 107 resultados positivos."
    }
  },
  "causalidade": {
    "context": "Em dias quentes há mais vendas de sorvete e mais afogamentos.",
    "steps": [
      {
        "formal": "Observe correlação, não causalidade.",
        "concrete": "Vendas e afogamentos aumentam no mesmo período.",
        "reason": "A associação não mostra que comprar sorvete provoque afogamento."
      },
      {
        "formal": "Considere uma variável de confusão: calor.",
        "concrete": "O calor leva mais pessoas a comprar sorvete e também a procurar piscinas e praias.",
        "reason": "Uma causa comum pode explicar a associação entre os dois resultados."
      },
      {
        "formal": "Planeje comparação controlada.",
        "concrete": "Compare dias semelhantes em temperatura e exposição à água antes de atribuir um efeito ao consumo de sorvete.",
        "reason": "Uma avaliação causal precisa enfrentar causas alternativas, não apenas repetir a correlação."
      }
    ],
    "check": {
      "question": "Qual fator plausível influencia os dois resultados?",
      "options": [
        "A cor dos sorvetes",
        "O calor",
        "A ordem das palavras"
      ],
      "correct": 1,
      "why": "Dias quentes podem estimular tanto o consumo de sorvete quanto atividades aquáticas."
    }
  },
  "metateoria": {
    "context": "Um programa começa com n=0, incrementa n até n=3 e então termina.",
    "steps": [
      {
        "formal": "Simule: n=0, n=1, n=2, n=3.",
        "concrete": "Após três incrementos, a condição n<3 deixa de valer.",
        "reason": "Este programa específico termina, o que pode ser demonstrado diretamente."
      },
      {
        "formal": "A indecidibilidade geral não invalida o caso concreto.",
        "concrete": "Não existir um algoritmo que sempre decida a parada de qualquer programa não impede analisar este laço simples.",
        "reason": "Um resultado sobre todos os programas não proíbe provas de casos particulares."
      },
      {
        "formal": "Separe os conceitos: decisão, prova e validade.",
        "concrete": "Podemos fornecer uma demonstração finita deste caso, embora não exista procedimento universal para decidir todas as paradas.",
        "reason": "Completude de um sistema dedutivo, correção e decidibilidade são propriedades diferentes."
      }
    ],
    "check": {
      "question": "O problema geral da parada impede demonstrar que este programa termina?",
      "options": [
        "Sim, em todos os casos.",
        "Não, a execução pode ser analisada neste caso.",
        "O programa não tem condição de parada."
      ],
      "correct": 1,
      "why": "Indecidibilidade geral não exclui demonstrações de casos individuais."
    }
  },
  "modais": {
    "context": "p = “A biblioteca abre”. Do mundo atual são acessíveis dois cenários: em um p=V; no outro p=F.",
    "steps": [
      {
        "formal": "□p exige p em todos os mundos acessíveis.",
        "concrete": "Como em um cenário a biblioteca não abre, “necessariamente abre” é falso.",
        "reason": "Basta um mundo acessível com p=F para refutar □p."
      },
      {
        "formal": "◇p exige ao menos um mundo acessível com p=V.",
        "concrete": "Existe um cenário em que a biblioteca abre; por isso “possivelmente abre” é verdadeiro.",
        "reason": "Possibilidade modal é existência de um mundo acessível que satisfaz p."
      },
      {
        "formal": "◇¬p exige um mundo acessível com p=F.",
        "concrete": "Existe também um cenário em que a biblioteca não abre; logo ◇¬p é verdadeiro.",
        "reason": "É possível p e possível não p simultaneamente, sem que isso torne p e ¬p verdadeiros no mesmo mundo."
      }
    ],
    "check": {
      "question": "Com um mundo acessível em que p=V e outro em que p=F, qual alternativa vale?",
      "options": [
        "□p é V.",
        "◇p e ◇¬p são V.",
        "◇p é F."
      ],
      "correct": 1,
      "why": "Há testemunhas distintas para p e para ¬p, mas nem todas satisfazem p."
    }
  },
  ...OTHER_LOGIC_WORKED,
  ...FOUNDATIONS_WORKED,
  ...GAP_WORKED_A,
  ...GAP_WORKED_B,
  ...MICRO_WORKED_A,
  ...MICRO_WORKED_B,
  ...FOCUSED_WORKED_A,
  ...FOCUSED_WORKED_B
};
