# Avaliação de compreensão V2

O mecanismo é implementado em `src/core/assessment.js`. Cada questão possui ID estável, pergunta, alternativas, índice da alternativa correta, justificativa, dimensão (`concept` ou `application`) e objetivo.

## Composição e aprovação

Por aula são selecionados dois itens conceituais e três de aplicação, sem repetição de ID. Os itens e alternativas são embaralhados; o seletor tenta não repetir as questões das três tentativas anteriores quando há alternativas suficientes.

Aprovação: ao menos **4 de 5** respostas corretas e **2 de 2** acertos na dimensão conceitual. A correção distingue lacunas no conceito central de lacunas na aplicação e fornece justificativa de cada resposta. Não há aprovação com campos sem resposta.

O progresso utiliza o campo aditivo `lessons[id].assessmentV2`, com `history`, `last` e `draft`. As aprovações `mastered`, `best` e revisões anteriores permanecem intactas. O rascunho inclui perguntas embaralhadas, respostas selecionadas e momento de início; o conteúdo é mantido após recarregamento. No máximo vinte registros de tentativa ficam no histórico.

**Após corrigir**, o aplicativo conserva no mesmo `draft` as cinco perguntas, sua ordem, todas as alternativas e respostas assinaladas, além de `result` e `gradedAt`. As alternativas ficam somente para leitura e cada questão apresenta a própria correção, com a explicação e a resposta esperada em caso de erro. **A pontuação aparece no final**, depois da última questão e antes das ações. A tela corrigida continua igual ao reabrir a aula ou recarregar a página; não gera uma segunda entrada no histórico. Somente o botão **“Tente outra vez”** inicia outro conjunto de cinco perguntas, limpando as respostas da nova tentativa. O botão **“Corrigir avaliação”** nunca gera perguntas novas. O histórico mantém os dados das tentativas anteriores.

A lógica do ciclo de tentativas é implementada em `src/core/assessment-attempt.js`, com testes unitários e de navegação. O modelo permanece compatível com rascunhos legados sem `result`, e mantém os mesmos critérios de aprovação.

## Escopo editorial

O currículo atual possui **61 aulas em oito unidades**. Todas possuem pelo menos 12 itens somativos, com cinco ou mais questões conceituais e sete ou mais de aplicação. Os **277 itens** documentados na versão inicial se referiam somente aos 23 bancos originais; não representam o total do currículo atual. Os bancos adicionais estão distribuídos em `src/content/` por unidade e expansão curricular.

A autoverificação da leitura e as perguntas do exemplo resolvido são formativas e não devem ser reutilizadas como itens somativos.

O patamar de 4/5 com 2/2 não foi validado experimentalmente. Deverá ser aferido em estudo com estudantes, comparando desempenho com justificativas abertas e tarefas de transferência.
