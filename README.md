# LogicLab — laboratório de raciocínio rigoroso

Aplicação educacional estática em HTML, CSS e JavaScript ES Modules, sem backend, dependências externas nem telemetria. O progresso é armazenado localmente no navegador e pode ser exportado e importado.

## Currículo e atividades

O curso guiado contém **23 aulas, organizadas em sete unidades**: (I) linguagem, proposições e argumentos; (II) semântica proposicional; (III) inferência e demonstração; (IV) lógica de primeira ordem; (V) evidência e incerteza; (VI) fundamentos teóricos; e (VII) outras lógicas. Há também treino livre e misto.

Cada aula articula leitura progressiva, exemplo resolvido, prática com ajuda, resolução independente, avaliação inicial e duas revisões espaçadas. O quadro de etapas no início da aula funciona como índice navegável: etapas concluídas e disponíveis levam diretamente à seção correspondente, enquanto as etapas ainda bloqueadas permanecem não interativas. A navegação preserva a rota da aula e não altera o registro de conclusão. A avaliação de compreensão V2 contém cinco questões: duas conceituais e três de aplicação. O aluno precisa acertar **4/5 no total e 2/2 nas questões conceituais** para obter aprovação. Questões e alternativas variam por tentativa; o resultado é registrado separadamente para cada dimensão.

**Todos os 23 temas possuem pelo menos 12 itens de avaliação**, totalizando **277 questões** (12 por aula, com 13 em metateoria). Quatro temas — tradução, validade de argumentos, probabilidade e causalidade — iniciaram a ampliação editorial, posteriormente estendida às demais 19 aulas. As questões de autoverificação da leitura permanecem exclusivamente formativas e não são reutilizadas na avaliação inicial.

**Foco por colunas nas tabelas-verdade:** cada cabeçalho mantém um botão de olho aberto (coluna visível) ou riscado (coluna recolhida). Ao recolher uma coluna, o cabeçalho permanece compacto, exibindo seu rótulo abreviado com o nome completo acessível; o estudante pode reabrir a coluna no mesmo botão. Nenhuma variável de entrada é obrigatória. Respostas e correção continuam abrangendo todas as colunas, mesmo recolhidas. A escolha fica salva no rascunho da tentativa e é reiniciada ao gerar um novo exercício.

Leia [Pedagogia](docs/PEDAGOGY.md), [Avaliação](docs/ASSESSMENT.md) e [Bancos de questões](docs/QUESTION_BANKS.md) para rubricas, limitações e critérios editoriais.

## Tabela Livre

Acesse **Tabela Livre** no menu superior ou por `#tabela-livre`. Esse laboratório não altera notas, tentativas nem revisões do curso. A proposta é trabalhar sempre em **modo de prática**:

- A tabela começa apenas com **p** e **q**, sem nenhuma fórmula cadastrada. Ao acrescentar variáveis, o sistema usa automaticamente **r, s, t, u**, até seis variáveis e 64 linhas.
- O estudante define os significados de suas proposições e insere fórmulas por digitação ou pelos botões do teclado: primeiro **um botão para cada variável existente**, depois **¬ ∧ ∨ → ↔ ⊕ ( )**.
- Cada fórmula cadastrada recebe uma **tradução estrutural em português**, equivalências clássicas quando cabíveis e as condições de verdade. Com `p = comprei ingresso` e `q = viajei`, `¬(p → q)` significa “É falso que se comprei ingresso, então viajei”, equivalente a `p ∧ ¬q`.
- **Todas as combinações de V/F** são geradas automaticamente. O estudante preenche os valores das expressões derivadas e utiliza **Conferir respostas** quando desejar, inclusive com colunas ocultas pelos ícones de olho.
- A tabela e suas respostas são salvas automaticamente no navegador e integram o **backup global** do LogicLab. Não há modos alternativos, cenários manuais ou exportação de CSV/JSON específica nesta tela.


**Quantificadores e inferências na mesma Tabela Livre:** o estudante escolhe o papel lógico de cada símbolo: **indivíduo** (por exemplo, `p = Sócrates`) ou **propriedade** (`q = homem`, `r = mortal`). Cadastre as premissas `q(p)` e `∀x(q(x) → r(x))`, depois informe a conclusão `r(p)` em **Verificar uma inferência**. O LogicLab demonstra que ela decorre das premissas **sem exigir cadastro de indivíduos do domínio**. O verificador procura contraexemplos em todos os modelos relevantes do fragmento monádico suportado (sem igualdade, funções ou relações entre dois indivíduos), com até três propriedades e dois indivíduos nomeados. O limite é operacional; o resultado de validade não depende de uma amostra escolhida pelo estudante. Quando as premissas são contraditórias, o resultado explica que não são conjuntamente satisfatíveis.

Para explorar o valor de verdade **em um modelo concreto**, a área **Indivíduos do domínio** continua disponível opcionalmente. Nela, `p(x)`, `q(s)`, `∀x(p(x) → q(x))`, `∃x(p(x) ∧ q(x))` e `¬∃x(p(x) ∧ q(x))` podem ser calculadas a partir dos valores V/F dos indivíduos cadastrados. O resultado do quantificador aparece uma vez na linha **No domínio**. A leitura literal preserva o alcance do quantificador, e a análise pode destacar testemunhas ou contraexemplos. Avaliar uma frase **nesse domínio** não é o mesmo que demonstrar validade **em todos os modelos**.

A tabela alterna entre combinações proposicionais (2ⁿ linhas) e modelos de predicados sem misturar os dois tipos de fórmula simultaneamente. A correção V/F do modelo concreto continua exigindo ao menos um indivíduo; **a verificação de inferências não exige nenhum**. Os rascunhos anteriores são migrados, preservando fórmulas e respostas compatíveis.

### Destaques visuais nas tabelas

No **Curso Guiado**, nas tabelas dos exercícios e na **Tabela Livre**, passar o mouse, focar pelo teclado ou tocar em um cabeçalho mostra **um contorno contínuo em torno de cada coluna inteira, desde o cabeçalho até a última linha**, nunca bordas individuais em cada célula. O destaque neutro alcança apenas o resultado e seus **operandos imediatos**, nunca todos os antepassados da fórmula. Ao conferir V/F, colunas inteiramente corretas recebem relações semânticas com outras colunas também corretas: **verde contínuo** para equivalência, **vermelho contínuo** para contradição, **verde tracejado** para subalternação, **roxo contínuo** para contrariedade e **roxo tracejado** para subcontrariedade. Uma descrição textual indica a relação e, na subalternação, a direção. Quando uma expressão tiver **equivalentes e contraditórias ao mesmo tempo**, os pares aparecem simultaneamente em verde e vermelho. A coluna de origem usa vermelho quando há contradição, e a explicação textual nomeia todas as relações. Por exemplo, `p → q` é equivalente a `¬p ∨ q` e contraditória com `p ∧ ¬q`. Toque novamente para desfazer a seleção.

Nas tabelas proposicionais, equivalência e oposição são calculadas sobre **todas as 2ⁿ interpretações**, não sobre linhas coincidentes por acaso. A **subalternação** é reservada às proposições categóricas A→I e E→O, e contrariedade, subcontrariedade e subalternação só são exibidas quando há garantia de que a classe do sujeito é **não vazia**. Contradições A–O e E–I independem dessa existência. Em modelos finitos de predicados, igualdade de V/F no domínio cadastrado **não** é usada para declarar equivalência lógica universal. Os controles de olho continuam funcionando com as bordas e a correção não revela relações em colunas incompletas ou erradas.

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
