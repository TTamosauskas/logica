# LogicLab — laboratório de raciocínio rigoroso

Aplicação educacional estática em HTML, CSS e JavaScript ES Modules, sem backend, dependências externas nem telemetria. O progresso é armazenado localmente no navegador e pode ser exportado e importado.

## Currículo e atividades

O curso guiado contém **23 aulas, organizadas em sete unidades**: (I) linguagem, proposições e argumentos; (II) semântica proposicional; (III) inferência e demonstração; (IV) lógica de primeira ordem; (V) evidência e incerteza; (VI) fundamentos teóricos; e (VII) outras lógicas. Há também treino livre e misto.

Cada aula articula leitura progressiva, exemplo resolvido, prática com ajuda, resolução independente, avaliação inicial e duas revisões espaçadas. O quadro de etapas no início da aula funciona como índice navegável: etapas concluídas e disponíveis levam diretamente à seção correspondente, enquanto as etapas ainda bloqueadas permanecem não interativas. A navegação preserva a rota da aula e não altera o registro de conclusão. A avaliação de compreensão V2 contém cinco questões: duas conceituais e três de aplicação. O aluno precisa acertar **4/5 no total e 2/2 nas questões conceituais** para obter aprovação. Questões e alternativas variam por tentativa; o resultado é registrado separadamente para cada dimensão.

**Todos os 23 temas possuem pelo menos 12 itens de avaliação**, totalizando **277 questões** (12 por aula, com 13 em metateoria). Quatro temas — tradução, validade de argumentos, probabilidade e causalidade — iniciaram a ampliação editorial, posteriormente estendida às demais 19 aulas. As questões de autoverificação da leitura permanecem exclusivamente formativas e não são reutilizadas na avaliação inicial.

**Foco por colunas nas tabelas-verdade:** cada cabeçalho mantém um botão de olho aberto (coluna visível) ou riscado (coluna recolhida). Ao recolher uma coluna, o cabeçalho permanece compacto, exibindo seu rótulo abreviado com o nome completo acessível; o estudante pode reabrir a coluna no mesmo botão. Nenhuma variável de entrada é obrigatória. Respostas e correção continuam abrangendo todas as colunas, mesmo recolhidas. A escolha fica salva no rascunho da tentativa e é reiniciada ao gerar um novo exercício.

Leia [Pedagogia](docs/PEDAGOGY.md), [Avaliação](docs/ASSESSMENT.md) e [Bancos de questões](docs/QUESTION_BANKS.md) para rubricas, limitações e critérios editoriais.

## Execução local

A partir da raiz, execute:

```bash
python3 -m http.server 8000
```

Abra `http://localhost:8000/`. É necessário usar HTTP/HTTPS para carregar corretamente os módulos ES; abrir diretamente via `file://` pode ser bloqueado pelo navegador.

## Testes

```bash
npm test
# ou
node --test tests/*.test.js
```

A suíte automatizada cobre núcleo lógico, progresso, material pedagógico e mecanismo de avaliação. Há também testes de navegação e UX em `tests/ux-smoke.mjs` e um workflow de GitHub Actions para testes e GitHub Pages.

## Estrutura principal

- `index.html`, `styles/`: interface e CSS.
- `src/app.js`: navegação, apresentação, exercícios e orquestração do curso.
- `src/core/`: lógica, parser, avaliação, revisões, persistência e mecanismos de exercícios.
- `src/content/`: material didático, leituras, bancos e unidades.
- `src/modes/`: atividades proposicionais.
- `tests/`: verificações unitárias e funcionais.
- `ARCHITECTURE.md`: decisões e limites arquiteturais.

## Dados e compatibilidade

O progresso fica no `localStorage` do domínio usado, sem envio de respostas. A avaliação V2 usa campos novos e **preserva as aprovações, revisões e pontuações da versão anterior**. O rascunho retém as questões sorteadas e respostas selecionadas, permitindo continuidade após recarregar a página. A funcionalidade existente permite exportar/importar dados.

## Publicação

O site pode ser publicado como arquivos estáticos em GitHub Pages, Cloudflare Pages ou Netlify, sem etapa de build. O repositório possui workflow de testes e publicação. Endereço GitHub Pages: https://ttamosauskas.github.io/logica/ .
