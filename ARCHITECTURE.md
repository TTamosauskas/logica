# Arquitetura e plano de melhoria

## Estado atual do pacote

A entrada é `index.html`, que importa cinco folhas de estilos e inicia `src/app.js` como módulo ES. Esse módulo reúne o DOM e a orquestração da experiência e importa conteúdo independente, lógica proposicional e geradores. Os dados do curso, dos exemplos e das atividades continuam embutidos no repositório; o site utiliza apenas arquivos estáticos no navegador.

O trabalho preserva a identidade visual, os 17 temas de exercícios, o treino misto, as seis unidades de estudo, as rotas por hash e as chaves de `localStorage`. O núcleo proposicional e as fórmulas já podem ser importados e testados isoladamente.

## Próxima evolução recomendada

A prioridade arquitetural é dividir `src/app.js` em uma camada `state/` para o estado de navegação e exercício, `storage/` para persistência versionada, `features/` para tradução, dedução, silogismos categóricos, Venn e curso, e `ui/` para componentes e atualização seletiva do DOM. Cada modo deverá declarar seu gerador, validação, passos e critérios de avaliação por uma interface estável.

Os conteúdos pedagógicos podem evoluir para uma coleção editorial validada por esquema. Questões objetivas, enunciados, explicações, exemplos e metadados podem viver em JSON, enquanto funções que geram árvores sintáticas continuam em módulos JavaScript. Isso permitirá adicionar lições sem mexer no renderizador.

## Qualidade do produto

O próximo conjunto de testes deverá cobrir o fluxo de resposta/correção/revelação, casos-limite do diagrama de Venn, unicidade dos desafios de dedução, recuperação do progresso e navegação por teclado. Como a tabela é reconstruída durante a interação, recomendamos atualização focada da célula ou recuperação explícita do foco e anúncios acessíveis do resultado.

Recomendamos também uma política de escape centralizada para todas as interpolações via `innerHTML`, métricas de desempenho em telas pequenas, validação de dados persistidos com migrações e uma opção para exportar/importar o progresso do curso.

## Distribuição

A hospedagem de arquivos estáticos dispensa API, banco de dados e etapa de build. O uso de módulos ES via HTTP/HTTPS é adequado a GitHub Pages, Cloudflare Pages e Netlify. Para instalação no dispositivo e funcionamento offline garantido após o primeiro acesso, a evolução recomendada é uma PWA com manifesto, service worker e política de atualização do cache.

Após a seleção do repositório, deverão ser definidos branch, diretório publicado, domínio-base, política de deploy e verificação de CI. A partir dessa escolha será possível configurar o fluxo de publicação mais simples para o provedor escolhido.
