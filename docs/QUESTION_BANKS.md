# Padrões para os bancos avaliativos

Cada questão tem: `id`, `question`, `options`, `correct`, `why`, `dimension` e `objective`. IDs são estáveis para fins de histórico. O índice `correct` refere-se ao conteúdo editorial original; o seletor embaralha alternativas mantendo a resposta correta.

## Qualidade dos distratores

Um distrator deve representar confusão relevante e plausível (por exemplo, confundir uma condicional com sua recíproca ou uma probabilidade condicional com a inversa). Evitar absurdos, variações puramente gramaticais, indicadores de comprimento e respostas obviamente fora do domínio. Ao revisar o item, conferir a unicidade da resposta correta e explicar por que as demais estão erradas.

Os itens `concept` verificam o princípio central mesmo quando o estudante reconhece a terminologia. Os itens `application` exigem interpretação em contexto, detecção de erro ou escolha de procedimento. Sempre que viável, variar contextos mantendo a mesma competência.

## Cobertura

Cada uma das **61 aulas em oito unidades** possui pelo menos doze itens somativos, sendo cinco ou mais conceituais e sete ou mais de aplicação. Os **277 itens** eram o subtotal dos 23 bancos históricos; não constituem o total atual. Novos bancos de unidades e microaulas mantêm cobertura própria. A autoverificação da leitura não é reutilizada nas avaliações somativas. A suíte `tests/assessment.test.js` verifica cobertura, integridade, composição e desempenho; a revisão substantiva de distratores exige avaliação humana.
