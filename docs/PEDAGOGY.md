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

## Pedagogia V3 — transição entre teoria e exercícios em todas as aulas

As **61 aulas das oito unidades** incluem três **questões-ponte formativas**, intercaladas com suas três seções explicativas: **183 decisões orientadas** ao longo do currículo. O modelo foi testado inicialmente em Fundamentos, Tradução e Equivalências e estendido às outras 58 aulas.

1. **Identificar:** reconhecer a ideia que acabou de ser apresentada em uma situação clara.
2. **Completar:** aplicar parte do procedimento, com pista opcional e feedback individual para cada escolha.
3. **Transferir:** mobilizar a mesma regra em outro contexto, preparando a resolução independente.

As alternativas são construídas especificamente para cada tema, incluindo distratores que representam confusões plausíveis. Ao conferir uma alternativa, o estudante recebe explicação por escolha, e não apenas a indicação de certo ou errado. Uma pista pode ser revelada sob demanda. No encerramento da leitura, um roteiro com três decisões explica como converter conhecimento declarativo em solução de exercícios.

Essas atividades são **formativas e opcionais**: não atribuem nota, não desbloqueiam ou bloqueiam etapas, não modificam `mastered`, revisões, avaliações ou formato de `localStorage`. O aluno pode consultar as pistas, tentar novamente e seguir o percurso. A exigência de avaliação independente (80% sem dicas na primeira correção) continua nas respectivas etapas posteriores.

### Engenharia pedagógica e qualidade

- `src/content/pedagogy-bridges.js`: consolida os três pilotos e as quatro expansões editoriais.
- `src/content/pedagogy-v3-units12.js`, `pedagogy-v3-units345.js`, `pedagogy-v3-units68.js` e `pedagogy-v3-unit7.js`: questões e estratégias específicas das aulas.
- `src/content/pedagogy-v3-builder.js`: padroniza posições das respostas e o feedback correspondente.
- `tests/pedagogy-bridges.test.js`: valida cobertura das 61 aulas, correspondência com seções, alternativas, pistas, diagnóstico e roteiros.
- `tests/ux-smoke.mjs`: verifica no Chromium a interação e a legibilidade móvel em aulas de todas as unidades.

A cobertura de conteúdo e a aprovação de testes não demonstram eficácia pedagógica. O próximo passo é testar com estudantes iniciantes a **taxa de acerto sem pista**, a **transferência para enunciados novos**, a **clareza percebida**, o **tempo de resolução** e a **retenção** em uma revisão posterior. Ajustes de linguagem e de distratores devem considerar essas evidências, não somente estatísticas de aprovação.
