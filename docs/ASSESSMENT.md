# Avaliação de compreensão V2

O mecanismo é implementado em `src/core/assessment.js`. Cada questão possui ID estável, pergunta, alternativas, índice da alternativa correta, justificativa, dimensão (`concept` ou `application`) e objetivo.

## Composição e aprovação

Por aula são selecionados dois itens conceituais e três de aplicação, sem repetição de ID. Os itens e alternativas são embaralhados; o seletor tenta não repetir as questões das três tentativas anteriores quando há alternativas suficientes.

Aprovação: ao menos **4 de 5** respostas corretas e **2 de 2** acertos na dimensão conceitual. A correção distingue lacunas no conceito central de lacunas na aplicação e fornece justificativa de cada resposta. Não há aprovação com campos sem resposta.

O progresso utiliza o campo aditivo `lessons[id].assessmentV2`, com `history`, `last` e `draft`. As aprovações `mastered`, `best` e revisões anteriores permanecem intactas. O rascunho inclui perguntas embaralhadas, respostas selecionadas e momento de início; o conteúdo é mantido após recarregamento. No máximo vinte registros de tentativa ficam no histórico.

## Escopo editorial

O banco base reutiliza as questões anteriores e a autoverificação da leitura. Os quatro temas-piloto — tradução, validade de argumentos, probabilidade e causalidade — têm oito novos itens editoriais cada. Nos demais temas a composição da primeira avaliação já funciona, mas a variação entre tentativas será limitada até que os bancos sejam ampliados.

O patamar de 4/5 com 2/2 não foi validado experimentalmente. Deverá ser aferido em estudo com estudantes, comparando desempenho com justificativas abertas e tarefas de transferência.
