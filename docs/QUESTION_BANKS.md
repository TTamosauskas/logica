# Padrões para os bancos avaliativos

Cada questão tem: `id`, `question`, `options`, `correct`, `why`, `dimension` e `objective`. IDs são estáveis para fins de histórico. O índice `correct` refere-se ao conteúdo editorial original; o seletor embaralha alternativas mantendo a resposta correta.

## Qualidade dos distratores

Um distrator deve representar confusão relevante e plausível (por exemplo, confundir uma condicional com sua recíproca ou uma probabilidade condicional com a inversa). Evitar absurdos, variações puramente gramaticais, indicadores de comprimento e respostas obviamente fora do domínio. Ao revisar o item, conferir a unicidade da resposta correta e explicar por que as demais estão erradas.

Os itens `concept` verificam o princípio central mesmo quando o estudante reconhece a terminologia. Os itens `application` exigem interpretação em contexto, detecção de erro ou escolha de procedimento. Sempre que viável, variar contextos mantendo a mesma competência.

## Cobertura

Meta de publicação: doze itens por cada uma das 23 aulas. O piloto editorial cobre quatro temas; os demais necessitam ampliação antes de afirmar que a meta global foi atingida. A suíte `tests/assessment.test.js` verifica validade, composição e desempenho; a revisão substantiva de distratores exige avaliação humana.
