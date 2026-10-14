# LogicLab — laboratório de raciocínio rigoroso

Aplicação educacional estática em HTML, CSS e JavaScript ES Modules, sem backend, dependências externas nem telemetria. O progresso é armazenado localmente no navegador e pode ser exportado e importado.

## Currículo e atividades

O curso guiado contém **30 aulas, organizadas em oito unidades**: (I) linguagem, proposições e argumentos; (II) semântica proposicional; (III) inferência e demonstração; (IV) lógica de primeira ordem; (V) evidência e incerteza; (VI) erros lógicos comuns; (VII) fundamentos teóricos; e (VIII) outras lógicas. Há também treino livre e misto.

Cada aula articula leitura progressiva, exemplo resolvido, prática com ajuda, resolução independente, avaliação inicial e duas revisões espaçadas. **O box 2 apresenta três passos desenvolvidos em cada uma das 30 aulas**: procedimento ou fórmula, tradução contextualizada em português e justificativa. O estudante revela os passos com **Próximo passo** ou usa **Mostrar tudo**; uma questão formativa opcional com feedback aparece ao final, antes de **Entendi a resolução**. Os passos vistos são preservados localmente, com opção **Rever desde o início**, sem alterar notas ou conquistas antigas. O quadro de etapas no início da aula funciona como índice navegável: etapas concluídas e disponíveis levam diretamente à seção correspondente, enquanto as etapas ainda bloqueadas permanecem não interativas. A navegação preserva a rota da aula e não altera o registro de conclusão. A avaliação de compreensão V2 contém cinco questões: duas conceituais e três de aplicação. O aluno precisa acertar **4/5 no total e 2/2 nas questões conceituais** para obter aprovação. Questões e alternativas variam por tentativa; o resultado é registrado separadamente para cada dimensão.

**Notação lógica:** as aulas explicam ∃! (existência única), ⊤ (constante verdadeira), ⊥ (constante falsa), ∴ (portanto) e ∵ (porque). A Tabela Livre reconhece `∃!x(p(x))`, `⊤` e `⊥` em fórmulas e modelos; a verificação de ∃! conta indivíduos distintos, mesmo quando têm propriedades idênticas. Em provas e textos, ∴ e ∵ indicam conclusão e justificativa, mas não são conectivos aceitos dentro das fórmulas da tabela.


**Todas as 30 aulas possuem pelo menos 12 itens de avaliação.** As 23 aulas originais mantêm seus 281 itens e seus identificadores; a Unidade VI acrescenta 84 itens somativos (12 por aula) e 42 situações distintas de prática, além de perguntas formativas da leitura e dos exemplos. As questões de autoverificação da leitura permanecem exclusivamente formativas e não são reutilizadas na avaliação inicial.

Na **Unidade II**, a aula de classificação apresenta explicitamente os princípios da identidade proposicional, bivalência, terceiro excluído e não contradição, com suas diferenças e tabelas-verdade. Na **Unidade III**, a aula de dedução natural distingue explosão (premissas incompatíveis) de redução ao absurdo (hipótese provisória refutada), com demonstrações opcionais e questões formativas/somativas. O percurso segue com 30 aulas e preserva o progresso anterior.

**Foco por colunas nas tabelas-verdade:** cada cabeçalho mantém um botão de olho aberto (coluna visível) ou riscado (coluna recolhida). Ao recolher uma coluna, o cabeçalho permanece compacto, exibindo seu rótulo abreviado com o nome completo acessível; o estudante pode reabrir a coluna no mesmo botão. Nenhuma variável de entrada é obrigatória. Respostas e correção continuam abrangendo todas as colunas, mesmo recolhidas. A escolha fica salva no rascunho da tentativa e é reiniciada ao gerar um novo exercício.

Leia [Pedagogia](docs/PEDAGOGY.md), [Avaliação](docs/ASSESSMENT.md) e [Bancos de questões](docs/QUESTION_BANKS.md) para rubricas, limitações e critérios editoriais.

## Unidade VI — Erros Lógicos Comuns

A nova unidade inclui sete aulas: Falácias informais I (relevância e persuasão), Falácias informais II (pressupostos e conclusões), Vieses cognitivos I (percepção e julgamento), Vieses cognitivos II (decisões e crenças), Ilusões estatísticas I (números e gráficos), Ilusões estatísticas II (dados e inferências) e uma oficina de investigação integrada.

Cada aula segue as seis etapas comuns do curso: leitura com reflexão opcional, exemplo de três passos com autoverificação, prática assistida, prática independente (mínimo de 80% sem dica), avaliação inicial V2 (4/5 e obrigatoriamente 2/2 conceituais) e duas revisões espaçadas sem dica, disponíveis depois de 1 dia e depois de mais 7 dias. As perguntas formativas, 42 casos próprios de prática e 84 itens somativos foram mantidos em bancos diferentes. Oito unidades passam a aparecer no mapa e na prática livre. A prova integrada continua com 12 desafios: preserva seis competências essenciais, cobre todas as outras unidades e inclui duas questões de aulas diferentes de Erros Lógicos Comuns. Progresso anterior, identificadores existentes e rascunhos de avaliações já iniciadas permanecem preservados.

## Tabela Livre

Acesse **Tabela Livre** no menu superior ou por `#tabela-livre`. Esse laboratório não altera notas, tentativas nem revisões do curso. A proposta é trabalhar sempre em **modo de prática**:

- A tabela começa apenas com **p** e **q**, sem nenhuma fórmula cadastrada. Ao acrescentar variáveis, o sistema usa automaticamente **r, s, t, u** (seis variáveis, 64 linhas); a opção de ampliação acrescenta **v, w** (oito variáveis, 256 linhas) para a tabela proposicional. A tabela de predicados mantém, por segurança computacional, até seis fórmulas independentes.
- O estudante define os significados de suas proposições e insere fórmulas por digitação ou pelos botões do teclado: primeiro **um botão para cada variável existente**, depois **¬ ∧ ∨ → ↔ ⊕ ( )**.
- Cada fórmula cadastrada recebe uma **tradução estrutural em português**, equivalências clássicas quando cabíveis e as condições de verdade. Com `p = comprei ingresso` e `q = viajei`, `¬(p → q)` significa “É falso que se comprei ingresso, então viajei”, equivalente a `p ∧ ¬q`.
- **Todas as combinações de V/F** são geradas automaticamente. O estudante preenche os valores das expressões derivadas e utiliza **Conferir respostas** quando desejar, inclusive com colunas ocultas pelos ícones de olho.
- **∴ e ∵ nos dois modos:** com duas ou mais fórmulas cadastradas, a última só é identificada por **∴** quando o modo de inferência é ativado explicitamente. Após conferir as respostas, **∵** introduz uma justificativa calculada a partir das interpretações possíveis: argumentação válida, contraexemplo de invalidade ou validade por premissas incompatíveis. Na lógica de predicados, as afirmações independentes formam uma conjunção na tabela; ao ativar o modo de inferência, a última fórmula é a conclusão e aparece a implicação `(A ∧ B) → C`. Linhas impossíveis continuam bloqueadas. Na lógica proposicional, as colunas de cálculo também permanecem as mesmas. Os dois símbolos são indicadores do argumento, não conectivos digitados nas fórmulas.
- A tabela e suas respostas são salvas automaticamente no navegador e integram o **backup global** do LogicLab. Não há modos alternativos, cenários manuais ou exportação de CSV/JSON específica nesta tela.


**Diagrama independente da tabela:** o usuário pode cadastrar até 12 conjuntos adicionais em **Conjuntos adicionais do diagrama**, sem consumir variáveis nem aumentar o número de linhas. Pode incluir até 20 indivíduos adicionais e indicar sua pertinência como **V**, **F** ou **?**. Até seis conjuntos são apresentados por círculos; acima disso, a representação muda para uma matriz de pertinência com todos os conjuntos e indivíduos, evitando sugerir interseções que os círculos não conseguem representar. Os conjuntos adicionais podem ser usados em fórmulas com nomes como `artista(maria)`, respeitado o limite computacional da tabela de predicados. A opção **Usar última fórmula como conclusão** continua desmarcada por padrão.

**Quantificadores e inferências na mesma Tabela Livre:** o estudante escolhe o papel lógico de cada símbolo: **indivíduo** (por exemplo, `p = Sócrates`) ou **propriedade** (`q = homem`, `r = mortal`). Cadastre as premissas `q(p)` e `∀x(q(x) → r(x))`, depois informe a conclusão `r(p)` em **Verificar uma inferência**. O LogicLab demonstra que ela decorre das premissas **sem exigir cadastro de indivíduos do domínio**. O verificador procura contraexemplos em todos os modelos relevantes do fragmento monádico suportado (sem igualdade, funções ou relações entre dois indivíduos), com até três propriedades e dois indivíduos nomeados. O limite é operacional; o resultado de validade não depende de uma amostra escolhida pelo estudante. Quando as premissas são contraditórias, o resultado explica que não são conjuntamente satisfatíveis.

**Interface simplificada da Tabela Livre:** a tabela de predicados dispensa a antiga coluna “Linha”. Cada combinação impossível recebe **🚫¹, 🚫², …** na **última célula visível**, substituindo o travessão nessa posição, e a justificativa abaixo é identificada pelo mesmo marcador. O botão **Conferir respostas** aparece imediatamente abaixo da tabela, antes dos demais resultados. Textos introdutórios redundantes e o antigo formulário de configuração de domínio concreto foram retirados; os nomes de indivíduos para fórmulas são informados em **Variáveis e significados**. O cadastro legado de domínio e seus valores continuam preservados nos rascunhos e backups existentes, mas não são editáveis nesta tela. Os botões de fórmulas seguem explicando os símbolos pelo título, foco, toque e área de ajuda visível.

A tabela alterna entre combinações proposicionais (2ⁿ linhas) e modelos de predicados sem misturar os dois tipos de fórmula simultaneamente. A verificação de inferências não exige um domínio de indivíduos cadastrado. Os rascunhos anteriores são migrados, preservando fórmulas, respostas e dados legados de domínio compatíveis.

### Destaques visuais nas tabelas

No **Curso Guiado**, nas tabelas dos exercícios e na **Tabela Livre**, passar o mouse, focar pelo teclado ou tocar em um cabeçalho mostra **um contorno contínuo em torno de cada coluna inteira, desde o cabeçalho até a última linha**, nunca bordas individuais em cada célula. O destaque neutro alcança apenas o resultado e seus **operandos imediatos**, nunca todos os antepassados da fórmula. Assim que seus valores V/F estiverem inteiramente corretos, mesmo sem clicar em **Conferir respostas**, as colunas recebem relações semânticas com outras colunas também corretas: **verde contínuo** para equivalência, **vermelho contínuo** para contradição, **verde tracejado** para subalternação, **roxo contínuo** para contrariedade e **roxo tracejado** para subcontrariedade. A legenda aparece em **linhas separadas**, uma por relação, e cada linha utiliza **exatamente a mesma cor da respectiva borda** (verde, vermelho ou roxo). A descrição da composição imediata permanece em cor neutra. Na subalternação, a legenda também informa a direção. Quando uma expressão tiver **equivalentes e contraditórias ao mesmo tempo**, os pares aparecem simultaneamente em verde e vermelho. A coluna de origem usa vermelho quando há contradição, e a explicação textual nomeia todas as relações. Por exemplo, `p → q` é equivalente a `¬p ∨ q` e contraditória com `p ∧ ¬q`. Toque novamente para desfazer a seleção.

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
