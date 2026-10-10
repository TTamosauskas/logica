/** Vocabulário e dificuldades dos problemas de atribuição. */

export const DEDUCTION_CONTEXTS=[
    {id:'profissoes',title:'Profissões',items:['engenheira','médica','dentista','arquiteta'],text:(p,x)=>`${p} é ${x}`},
    {id:'cidades',title:'Destinos',items:['Recife','Curitiba','Salvador','Manaus'],text:(p,x)=>`${p} viajou para ${x}`},
    {id:'cores',title:'Cores de mochilas',items:['vermelha','azul','verde','amarela'],text:(p,x)=>`${p} escolheu a mochila ${x}`},
    {id:'materias',title:'Matérias favoritas',items:['Matemática','História','Biologia','Geografia'],text:(p,x)=>`${p} escolheu ${x} como matéria favorita`},
    {id:'instrumentos',title:'Instrumentos',items:['violino','flauta','piano','violão'],text:(p,x)=>`${p} toca ${x}`},
    {id:'sobremesas',title:'Sobremesas',items:['pudim','sorvete','torta','mousse'],text:(p,x)=>`${p} escolheu ${x}`},
    {id:'esportes',title:'Esportes',items:['natação','judô','vôlei','tênis'],text:(p,x)=>`${p} pratica ${x}`},
    {id:'animais',title:'Animais adotados',items:['gato','cachorro','coelho','hamster'],text:(p,x)=>`${p} adotou um ${x}`},
    {id:'salas',title:'Salas de apresentação',items:['sala Azul','sala Verde','sala Amarela','sala Vermelha'],text:(p,x)=>`${p} apresentará na ${x}`},
    {id:'turnos',title:'Horários',items:['8 horas','9 horas','10 horas','11 horas'],text:(p,x)=>`${p} apresentará às ${x}`},
    {id:'veiculos',title:'Meios de transporte',items:['ônibus','metrô','bicicleta','táxi'],text:(p,x)=>`${p} irá de ${x}`},
    {id:'livros',title:'Gêneros literários',items:['romance','poesia','conto','ensaio'],text:(p,x)=>`${p} escolheu um livro de ${x}`},
    {id:'cursos',title:'Cursos',items:['Medicina','Direito','Engenharia','Arquitetura'],text:(p,x)=>`${p} escolheu o curso de ${x}`},
    {id:'tarefas',title:'Responsabilidades',items:['revisão','pesquisa','diagramação','apresentação'],text:(p,x)=>`${p} ficou responsável pela ${x}`},
    {id:'frutas',title:'Frutas',items:['maçã','pera','uva','banana'],text:(p,x)=>`${p} escolheu ${x}`},
    {id:'casas',title:'Casas',items:['casa 1','casa 2','casa 3','casa 4'],text:(p,x)=>`${p} mora na ${x}`},
    {id:'presentes',title:'Presentes',items:['relógio','livro','fone','quadro'],text:(p,x)=>`${p} recebeu um ${x}`},
    {id:'setores',title:'Setores da empresa',items:['marketing','finanças','suporte','logística'],text:(p,x)=>`${p} trabalha em ${x}`},
    {id:'lojas',title:'Lojas',items:['loja A','loja B','loja C','loja D'],text:(p,x)=>`${p} visitou a ${x}`},
    {id:'filmes',title:'Gêneros de filmes',items:['comédia','drama','aventura','suspense'],text:(p,x)=>`${p} escolheu um filme de ${x}`},
    {id:'podios',title:'Posições na competição',items:['1ª colocação','2ª colocação','3ª colocação','4ª colocação'],text:(p,x)=>`${p} terminou na ${x}`},
    {id:'moradia',title:'Andares',items:['1º andar','2º andar','3º andar','4º andar'],text:(p,x)=>`${p} mora no ${x}`},
    {id:'eventos',title:'Atividades do evento',items:['abertura','debate','oficina','encerramento'],text:(p,x)=>`${p} conduzirá a ${x}`},
    {id:'lanches',title:'Lanches',items:['sanduíche','pastel','pão de queijo','bolo'],text:(p,x)=>`${p} pediu ${x}`}
  ];

export const DEDUCTION_NAMES=['Ana','Bia','Cida','Dora','Eva','Lia','Nina','Rita','Lara','Tina','Mara','Iara'];

export const DEDUCTION_LEVELS={
    easy:{title:'1 · Distribuição simples',n:3,clues:3,falseCounts:[0],kinds:['atom','not']},
    medium:{title:'2 · Verdadeiros e falsos',n:3,clues:4,falseCounts:[1],kinds:['atom','not','and','or']},
    hard:{title:'3 · Conectivos combinados',n:3,clues:5,falseCounts:[1,2],kinds:['atom','not','and','or','xor','implies','iff','notand']},
    expert:{title:'4 · Questão de concurso',n:4,clues:6,falseCounts:[1,2],kinds:['atom','not','and','or','xor','implies','iff','notand','notor','onlyif']},
    exam:{title:'5 · Resolução independente',n:4,clues:7,falseCounts:[1,2],kinds:['atom','not','and','or','xor','implies','iff','notand','notor','onlyif']}
  };
