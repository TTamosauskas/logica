# Avaliação de compreensão V2

O mecanismo é implementado em `src/core/assessment.js`. Cada questão possui ID estável, pergunta, alternativas, índice da alternativa correta, justificativa, dimensão (`concept` ou `application`) e objetivo.

## Composição e aprovação

Por aula são selecionados dois itens conceituais e três de aplicação, sem repetição de ID. Os itens e alternativas são embaralhados; o seletor tenta não repetir as questões das três tentativas anteriores quando há alternativas suficientes.

Aprovação: ao menos **4 de 5** respostas corretas e **2 de 2** acertos na dimensão conceitual. A correção distingue lacunas no conceito central de lacunas na aplicação e fornece justificativa de cada resposta. Não há aprovação com campos sem resposta.

O progresso utiliza o campo aditivo `lessons[id].assessmentV2`, com `history`, `last` e `draft`. As aprovações `mastered`, `best` e revisões anteriores permanecem intactas. O rascunho inclui perguntas embaralhadas, respostas selecionadas e momento de início; o conteúdo é mantido após recarregamento. No máximo vinte registros de tentativa ficam no histórico.

## Escopo editorial

O banco base reutiliza as questões anteriores, mas não reutiliza a autoverificação da leitura, que permanece exclusivamente formativa. Os quatro temas-piloto — tradução, validade de argumentos, probabilidade e causalidade — receberam oito novos itens editoriais cada, assim como os outros dezenove temas. Há 277 itens somativos ao todo, com pelo menos 12 por aula: cinco ou mais questões conceituais e sete ou mais de aplicação.

O patamar de 4/5 com 2/2 não foi validado experimentalmente. Deverá ser aferido em estudo com estudantes, comparando desempenho com justificativas abertas e tarefas de transferência.
