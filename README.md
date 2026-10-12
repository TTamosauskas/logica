# LogicLab — laboratório de raciocínio rigoroso

Aplicação educacional estática em HTML, CSS e JavaScript ES Modules, sem backend, dependências externas nem telemetria. O progresso é armazenado localmente no navegador e pode ser exportado e importado.

## Currículo e atividades

O curso guiado contém **23 aulas, organizadas em sete unidades**: (I) linguagem, proposições e argumentos; (II) semântica proposicional; (III) inferência e demonstração; (IV) lógica de primeira ordem; (V) evidência e incerteza; (VI) fundamentos teóricos; e (VII) outras lógicas. Há também treino livre e misto.

Cada aula articula leitura progressiva, exemplo resolvido, prática com ajuda, resolução independente, avaliação inicial e duas revisões espaçadas. A avaliação de compreensão V2 contém cinco questões: duas conceituais e três de aplicação. O aluno precisa acertar **4/5 no total e 2/2 nas questões conceituais** para obter aprovação. Questões e alternativas variam por tentativa; o resultado é registrado separadamente para cada dimensão.

O novo mecanismo foi aplicado a todos os temas. Quatro temas — tradução, validade de argumentos, probabilidade e causalidade — receberam expansão editorial piloto para 13 itens; nos demais, a variedade entre retentativas é limitada pelo banco atual. **A meta de 12 itens por aula ainda não foi atingida globalmente.**

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
