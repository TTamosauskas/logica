# Orientação pedagógica

O LogicLab oferece um percurso de 61 aulas em oito unidades: leitura, exemplo resolvido, prática assistida, prática independente, avaliação inicial e duas revisões espaçadas.

## Evidências de aprendizagem

- **Leitura e exemplo:** a marcação representa avanço no percurso, não demonstra compreensão por si só.
- **Prática assistida:** o aluno utiliza dicas para interpretar e resolver atividades.
- **Prática independente:** o registro exige desempenho mínimo de 80% na primeira correção, sem dicas.
- **Avaliação inicial V2:** cinco itens, dois de compreensão conceitual e três de aplicação. A aprovação exige quatro acertos totais e dois conceituais.
- **Revisões espaçadas:** continuam ocorrendo após um dia da avaliação inicial e sete dias após a primeira revisão aprovada, cada uma com critérios próprios; não constituem evidência empírica definitiva de transferência duradoura.

A certificação da dimensão conceitual é operacional. Acertar dois itens indica desempenho nesses itens, não prova domínio filosófico, metacognitivo ou longitudinal. Pesquisas com estudantes reais serão necessárias para validar o corte e os itens.

Aprovações anteriores à V2 são preservadas e aparecem separadas dos novos resultados conceituais. O curso não utiliza telemetria nem envia as respostas a um servidor.

## Pedagogia V3 — piloto de transição entre teoria e exercícios

As aulas **Fundamentos**, **Tradução** e **Equivalências** incluem três questões-ponte, uma após cada seção explicativa, com progressão de autonomia:

1. **Identificar:** reconhecer uma ideia recém-apresentada em um caso próximo ao texto.
2. **Completar:** aplicar parte do procedimento em um exemplo semelhante, com pista opcional.
3. **Transferir:** reconhecer e usar a mesma competência em outro contexto, antes da prática assistida.

Cada questão possui três alternativas, feedback editorial específico para cada escolha, justificativa após acerto e pista solicitada pelo próprio aluno. Ao final, um roteiro de três passos mostra como levar a leitura ao exemplo e aos exercícios. As atividades são **formativas**: não atribuem nota, não desbloqueiam etapas, não alteram `mastered`, revisões nem o formato do `localStorage`. A leitura pode continuar normalmente mesmo que o aluno não responda; não há barreiras adicionais.

Os dados editoriais ficam em `src/content/pedagogy-bridges.js` e o comportamento da interface em `src/app.js`. Os testes de integridade ficam em `tests/pedagogy-bridges.test.js` e o cenário interativo em `tests/ux-smoke.mjs`. A expansão às 58 aulas restantes depende de avaliar clareza, acerto sem pista, transferência e percepção de dificuldade com estudantes reais; nenhuma eficácia empírica é alegada nesta fase.
