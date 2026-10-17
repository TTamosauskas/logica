# Auditoria de continuidade pedagógica — LogicLab V4

Data: 17 de outubro de 2026.

## Pergunta de qualidade

**O estudante consegue reconhecer na tarefa nova o mesmo raciocínio que acabou de estudar?**

O curso apresenta um percurso de seis etapas: compreender, observar uma resolução, praticar com ajuda, resolver de forma autônoma, realizar avaliação conceitual e de aplicação, e consolidar com revisões. Verificar que as páginas existem **não** basta para confirmar que cada mudança de atividade é didaticamente gradual.

## Abrangência da auditoria estrutural

| Unidade | Aulas | Questões-ponte | Exemplo e prática |
| --- | ---: | ---: | --- |
| I — Linguagem, proposições e argumentos | 7 | 21 | Verificados por aula |
| II — Semântica proposicional | 12 | 36 | Verificados por aula |
| III — Inferência e demonstração | 5 | 15 | Verificados por aula |
| IV — Lógica de primeira ordem | 5 | 15 | Verificados por aula |
| V — Evidências e incerteza | 5 | 15 | Verificados por aula |
| VI — Erros lógicos comuns | 9 | 27 | Verificados por aula |
| VII — Outras lógicas | 14 | 42 | Verificados por aula |
| VIII — Fundamentos teóricos | 4 | 12 | Verificados por aula |
| **Total** | **61** | **183** | **61 percursos** |

A auditoria implementada em `src/core/pedagogy-continuity.js` e `tests/pedagogy-continuity.test.js` verifica, por identificador de aula, a disponibilidade de leitura, três questões-ponte, roteiro de aplicação, exemplo resolvido com justificativas, verificação do exemplo e um gerador de prática. Os testes existentes também verificam as composições de avaliações de todas as aulas e casos de alinhamento entre conceito e seção.

Essas verificações são **estruturais**. Não seria correto afirmar que um teste de código prova que as 183 questões são semanticamente adequadas a todos os perfis de estudante. A revisão editorial de conceitos antecipados continua em `tests/pedagogy-bridges.test.js`, e uma revisão humana integral permanece necessária.

## Descontinuidade detectada e intervenção

**Problema:** na passagem entre “Observar um exemplo resolvido” e “Praticar com ajuda”, o aluno precisava abandonar a tela da aula e iniciar uma questão nova. O roteiro de três decisões já havia sido definido no conteúdo, mas não acompanhava o aluno ao exercício; o exemplo ficava em outra tela. Isso podia agravar a dificuldade de reconhecer a estrutura conhecida num enunciado diferente.

**Correção V4:** o estágio de prática assistida exibe os três passos específicos da competência. A tela do exercício guiado repete essas decisões e inclui “Rever a resolução do exemplo anterior”, inicialmente recolhido, com as três justificativas. Essa revisão é opcional, não vale nota e não altera progresso. Exercícios independentes e revisões espaçadas **não** recebem esse auxílio adicional.

O objetivo é favorecer a transferência: não repetir a pergunta resolvida, mas explicitar a sequência de decisões que pode ser reutilizada em um caso novo.

## Falha semântica adicional identificada

**Metateoria:** havia duas versões do conteúdo de leitura em módulos diferentes. A versão efetivamente usada no aplicativo (agregada por último a partir de `FOUNDATIONS_READINGS`) apresenta, em sequência, consequência semântica (⊨), derivação (⊢) e relação entre correção e completude. As questões-ponte, entretanto, haviam sido escritas para a outra versão e perguntavam sobre Gödel e o problema da parada, ainda não ensinados nessa aula.

As três questões-ponte e o roteiro foram reescritos conforme a versão **realmente exibida**. Há agora um teste específico que impede retornar às perguntas avançadas sem explicação prévia. Esse caso demonstra por que uma auditoria precisa examinar o conteúdo final resultante da composição dos módulos, não apenas um arquivo com título semelhante.

## Rubrica de revisão de cada aula

| Transição | Pergunta que o editor deve responder | Critério |
| --- | --- | --- |
| Texto → questão-ponte | A operação requerida já foi ensinada neste ponto exato da leitura? | Nenhuma competência futura é exigida |
| Questão-ponte → exemplo | O exemplo demonstra a estratégia recém-identificada e justifica cada passo? | O aluno sabe por que cada transformação é válida |
| Exemplo → prática guiada | É possível reconhecer o procedimento mesmo que o contexto e os números mudem? | O roteiro identifica o primeiro passo e a ação seguinte |
| Prática guiada → autônoma | Há oportunidade de praticar antes de retirar pistas? | O auxílio é gradual, sem antecipar respostas |
| Prática autônoma → avaliação | Conceitos e aplicações avaliados foram apresentados e praticados? | A prova não inclui competências novas |

Se uma dessas respostas for negativa, a lição precisa de uma correção no **conteúdo, no exemplo ou no exercício**. Acrescentar uma pista para explicar uma regra ainda não ensinada não resolve o problema.

## Validação e limites

1. `tests/pedagogy-continuity.test.js`: integridade dos 61 percursos, roteiro por aula, 183 questões-ponte, acesso a exemplos e ausência de orientação V4 na prática independente.
2. `tests/ux-smoke.mjs`: navegação real em Chromium, legibilidade no celular, retorno ao exemplo e garantia de que a prática independente não mostra as pistas V4.
3. `tests/pedagogy-bridges.test.js`: alinhamentos semânticos explícitos para regressões já identificadas.
4. `tests/assessment.test.js`: critérios da avaliação com duas questões conceituais e três aplicações em cada aula.

**Próxima verificação com estudantes:** observar iniciantes resolvendo as aulas de condições, expressões compostas, quantificadores, probabilidade e outras lógicas; registrar qual passo precisou de pista, se a solução foi transferida a contexto novo e onde o aluno voltou à explicação. O código não contém tais dados e não se presume melhora empírica sem medi-la.
