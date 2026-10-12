# Arquitetura do LogicLab

## Estado atual

O LogicLab é um site estático em ES Modules, HTML e CSS, sem backend. A entrada é `index.html`, que inicia `src/app.js`. O curso guiado apresenta **23 aulas em sete unidades**, mais os modos livres e misto. A interface e as rotas usam hash; o progresso é armazenado em `localStorage`.

`src/app.js` ainda concentra renderização, eventos e coordenação do estado. O núcleo proposicional, analisadores, geradores de atividades, conteúdo e serviços pedagógicos possuem módulos separados.

## Avaliação de compreensão V2

- `src/core/assessment.js`: validação dos itens, composição de avaliações com embaralhamento e correção por dimensões.
- `src/content/assessment-pilot.js`: expansão editorial de quatro bancos-piloto com oito questões por tema.
- `src/content/course.js` e `src/content/course-unit13.js`: conteúdos e questões legadas, mantidos em compatibilidade.
- `src/content/reading-*.js`: materiais de leitura e autoverificações formativas, integradas como itens conceituais no banco V2.
- `src/app.js`: integra o seletor, preserva as tentativas em `courseState.lessons[id].assessmentV2`, exibe pontuação conceitual e global, mantendo `mastered`, `best` e revisões anteriores.
- `tests/assessment.test.js`: integridade de bancos, composição, embaralhamento e regras de aprovação.

A composição requer dois itens `concept` e três `application`. A aprovação inicial exige desempenho total de 4/5 e 2/2 nas questões centrais. O histórico registra até vinte tentativas por tema e o rascunho persiste perguntas e escolhas em andamento.

A expansão editorial completa para doze itens por tema continua pendente para dezenove temas; por isso, nesses casos a variedade decorre sobretudo do embaralhamento das opções e da ordem das perguntas.

## Evolução técnica

O próximo passo arquitetural é decompor `src/app.js` em componentes de interface, estado e persistência versionada; ampliar bancos em arquivos por unidade; e fortalecer correção de justificativas abertas e tarefas de transferência. A revisão humana da plausibilidade dos distratores permanece indispensável.

A publicação requer apenas hospedagem de arquivos estáticos. Uma PWA offline com cache versionado poderá ser adotada futuramente. O projeto não utiliza rastreamento remoto.
