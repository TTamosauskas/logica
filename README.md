# LogicLab — versão estática modular

O LogicLab é uma aplicação educacional de lógica formal organizada como site estático. A interface, os exercícios, as aulas e o progresso local permanecem no navegador. A aplicação utiliza JavaScript moderno (`type="module"`), CSS nativo e HTML sem dependências externas, compiladores ou servidor de aplicação.

## Execução local

A partir da pasta que contém `index.html`, execute:

```bash
python3 -m http.server 8000
```

Abra `http://localhost:8000/` no navegador. O servidor local oferece os arquivos diretamente. Para hospedagem, publique a pasta inteira em um serviço de sites estáticos.

Os módulos ES são carregados via HTTP/HTTPS. Abrir `index.html` usando `file://` pode produzir restrições de CORS dependendo do navegador. Para uso totalmente offline e instalável, o próximo aprimoramento recomendado é incluir um service worker com cache versionado.

## Organização dos arquivos

```text
logiclab-modular/
├── index.html
├── styles/
│   ├── base.css
│   ├── translation-deduction.css
│   ├── venn.css
│   ├── categorical-models.css
│   └── learning.css
├── src/
│   ├── app.js
│   ├── core/
│   │   ├── logic.js
│   │   ├── parser.js
│   │   └── html.js
│   ├── content/
│   │   ├── modules.js
│   │   ├── translation.js
│   │   ├── deduction.js
│   │   ├── categorical.js
│   │   ├── advanced.js
│   │   └── course.js
│   └── modes/
│       └── propositional.js
├── tests/
│   └── logic.test.js
├── package.json
├── ARCHITECTURE.md
└── README.md
```

`index.html` contém a estrutura semântica das três telas. `styles/` preserva a ordem da cascata original. `src/core/` concentra operações matemáticas e o parser de fórmulas. `src/content/` contém catálogos e materiais didáticos. `src/modes/propositional.js` contém os geradores sem dependência do DOM. `src/app.js` centraliza temporariamente a navegação, os demais modos interativos, os eventos e a persistência do usuário.

## Testes

Execute:

```bash
node --test tests/*.test.js
```

Os testes unitários verificam: número de linhas de tabelas-verdade, equivalências, contraexemplos, parsing com conectivos Unicode e palavras em português, geração repetida de exercícios proposicionais, integridade dos 18 módulos e das seis unidades, e construção dos modelos de tradução.

Um teste funcional adicional durante a migração carregou os módulos ES no Chromium e percorreu todos os 18 modos, incluindo o botão de nova rodada, o curso guiado e a troca de tema. Uma suíte automatizada de testes ponta a ponta em CI é recomendada antes da publicação definitiva.

## Persistência e privacidade

O progresso permanece no `localStorage`. As chaves existentes foram preservadas para continuidade dos dados já salvos na mesma origem (domínio, protocolo e porta). Ao mudar de domínio, o navegador mantém os dados vinculados ao domínio antigo. Uma futura opção de exportação/importação de progresso pode facilitar a migração para uma origem diferente.

O projeto continua sem dependências externas, telemetria e backend.

## Publicação

Em GitHub Pages, Cloudflare Pages ou Netlify, configure a raiz publicada na pasta que contém o `index.html`. Os caminhos relativos de CSS e JavaScript permitem publicação também em subpastas de repositórios. A navegação por fragmentos de URL (`#curso`, `#aula-fundamentos`, etc.) permanece compatível com hospedagem estática.

## Escopo da modularização

Esta entrega é a primeira etapa de baixo risco: arquivos separados, módulo lógico puro, bancos didáticos apartados, testes básicos, ajuste no tokenizador para a expressão `não` e tratamento seguro de fragmentos de URL malformados. A decomposição do controlador `src/app.js` em controladores e views menores é recomendada após a validação funcional completa. Consulte `ARCHITECTURE.md`.

### Ativação inicial no GitHub Pages

Para este repositório, abra [Settings → Pages](https://github.com/TTamosauskas/logica/settings/pages) e selecione **GitHub Actions** em **Build and deployment → Source**. Esta configuração inicial requer a permissão administrativa de Pages do proprietário do repositório.

Depois, abra [Actions](https://github.com/TTamosauskas/logica/actions/workflows/pages.yml) e execute novamente o workflow **LogicLab - testes e GitHub Pages** (Run workflow). A cada atualização da branch `main`, o pipeline executará os testes e publicará os arquivos estáticos.

Endereço público previsto após uma execução de deploy bem-sucedida: **https://ttamosauskas.github.io/logica/**.
