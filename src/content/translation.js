/** Contextos e padrões de tradução de enunciados. */
import { A, O, X, I, B, not } from "../core/logic.js";

export const SCENARIOS=[
    ['Compras','o pagamento foi aprovado','a encomenda foi enviada','o comprador recebeu o aviso'],
    ['Biblioteca','a biblioteca está aberta','há funcionários disponíveis','os leitores podem retirar livros'],
    ['Transporte','o ônibus chegou ao terminal','a plataforma está liberada','os passageiros podem embarcar'],
    ['Escola','a atividade foi entregue','a professora corrigiu a atividade','a nota foi publicada'],
    ['Tecnologia','o servidor está conectado','o aplicativo recebeu dados','um alerta foi exibido'],
    ['Cinema','os ingressos estão disponíveis','a sessão foi confirmada','a sala está preparada'],
    ['Clima','a previsão indica chuva','o céu está encoberto','a temperatura caiu'],
    ['Saúde','a consulta foi agendada','o médico está disponível','o paciente recebeu confirmação'],
    ['Trabalho','o projeto foi aprovado','a equipe iniciou a execução','o prazo foi atualizado'],
    ['Música','o ensaio começou','os instrumentos foram afinados','a apresentação foi iniciada'],
    ['Viagem','a passagem foi emitida','o check-in foi concluído','o portão de embarque foi anunciado'],
    ['Restaurante','a reserva foi confirmada','a mesa está disponível','o atendimento começou'],
    ['Esporte','a equipe venceu a partida','o técnico aprovou a estratégia','a classificação foi atualizada'],
    ['Jardim','o solo está úmido','as plantas receberam luz','as sementes germinaram'],
    ['Laboratório','a amostra foi recebida','o teste foi realizado','o resultado foi registrado'],
    ['Cidade','o semáforo está verde','a via está liberada','os veículos estão circulando'],
    ['Museu','a exposição foi inaugurada','os ingressos foram liberados','os visitantes entraram'],
    ['Banco','a transferência foi autorizada','o saldo foi atualizado','o recibo ficou disponível'],
    ['Fotografia','a câmera está carregada','a iluminação está adequada','a foto foi registrada'],
    ['Universidade','a inscrição foi aceita','a documentação foi analisada','a matrícula foi efetivada'],
    ['Segurança','a porta está trancada','o alarme está ativado','a câmera está gravando'],
    ['E-commerce','o produto está no estoque','a compra foi finalizada','a nota fiscal foi emitida'],
    ['Energia','o gerador foi ligado','a rede está estável','as luzes estão acesas'],
    ['Correios','a correspondência foi coletada','o endereço foi verificado','a entrega foi realizada'],
    ['Pesquisa','a hipótese foi formulada','os dados foram coletados','o estudo foi publicado'],
    ['Condomínio','o elevador está funcionando','a portaria está aberta','as câmeras estão operando'],
    ['Oficina','a peça chegou','o reparo foi iniciado','o veículo ficou pronto'],
    ['Cozinha','o forno está aquecido','a massa está pronta','o bolo foi assado'],
    ['Hotel','o quarto foi reservado','a recepção confirmou a chegada','a chave foi entregue'],
    ['Feira','a barraca está montada','os produtos foram expostos','as vendas começaram'],
    ['Editora','o manuscrito foi revisado','a capa foi aprovada','o livro foi publicado'],
    ['Teatro','o palco está iluminado','os atores chegaram','a peça começou'],
    ['Astronomia','o telescópio está calibrado','o céu está limpo','a observação começou'],
    ['Oficina de arte','a tela está preparada','as tintas estão disponíveis','a pintura foi concluída'],
    ['Aplicativo','a conta foi criada','o email foi verificado','o perfil está ativo'],
    ['Evento','os convites foram enviados','o espaço foi reservado','os convidados chegaram'],
    ['Curso','a aula foi assistida','o exercício foi entregue','o certificado foi liberado'],
    ['Produção','a máquina está ligada','a matéria-prima chegou','o lote foi concluído'],
    ['Futebol','o árbitro autorizou o início','os jogadores estão em campo','a partida começou'],
    ['Logística','o caminhão foi carregado','a rota foi aprovada','a carga chegou ao destino']
  ].map((s,i)=>({id:i,context:s[0],claims:s.slice(1)}));

export const TRANSLATION_TEMPLATES={
    easy:[
      {id:'and',make:([p,q])=>A(p,q),say:([p,q])=>`As duas afirmações são verdadeiras: “${p}” e “${q}”.`},
      {id:'or',make:([p,q])=>O(p,q),say:([p,q])=>`${cap(p)} ou ${q} (inclusive as duas possibilidades).`},
      {id:'xor',make:([p,q])=>X(p,q),say:([p,q])=>`Exatamente uma das duas afirmações é verdadeira: “${p}” e “${q}”.`},
      {id:'if',make:([p,q])=>I(p,q),say:([p,q])=>`Se ${p}, então ${q}.`},
      {id:'onlyif',make:([p,q])=>I(p,q),say:([p,q])=>`${cap(p)} somente se ${q}.`},
      {id:'reversed',make:([p,q])=>I(q,p),say:([p,q])=>`Se ${q}, então ${p}.`},
      {id:'iff',make:([p,q])=>B(p,q),say:([p,q])=>`${cap(p)} se, e somente se, ${q}.`},
      {id:'notp',make:([p])=>not(p),say:([p])=>`É falso que ${p}.`},
      {id:'pnotq',make:([p,q])=>A(p,not(q)),say:([p,q])=>`${cap(p)}, mas é falso que ${q}.`},
      {id:'ifnot',make:([p,q])=>I(p,not(q)),say:([p,q])=>`Se ${p}, então é falso que ${q}.`},
      {id:'notif',make:([p,q])=>I(not(p),q),say:([p,q])=>`Se for falso que ${p}, então ${q}.`},
      {id:'notand',make:([p,q])=>not(A(p,q)),say:([p,q])=>`É falso que estas duas afirmações sejam simultaneamente verdadeiras: “${p}” e “${q}”.`}
    ],
    medium:[
      {id:'boththen',make:([p,q,r])=>I(A(p,q),r),say:([p,q,r])=>`Se as duas afirmações “${p}” e “${q}” forem verdadeiras, então ${r}.`},
      {id:'eitherthen',make:([p,q,r])=>I(O(p,q),r),say:([p,q,r])=>`Se ocorrer pelo menos uma das situações “${p}” e “${q}”, então ${r}.`},
      {id:'ifboth',make:([p,q,r])=>I(p,A(q,r)),say:([p,q,r])=>`Se ${p}, então são verdadeiras as duas afirmações: “${q}” e “${r}”.`},
      {id:'oneandnot',make:([p,q,r])=>A(O(p,q),not(r)),say:([p,q,r])=>`Pelo menos uma das afirmações “${p}” e “${q}” é verdadeira, e é falso que ${r}.`},
      {id:'conjif',make:([p,q,r])=>A(p,I(q,r)),say:([p,q,r])=>`${cap(p)} e, além disso, se ${q}, então ${r}.`},
      {id:'ifxor',make:([p,q,r])=>I(p,X(q,r)),say:([p,q,r])=>`Se ${p}, então exatamente uma das seguintes afirmações é verdadeira: “${q}” e “${r}”.`},
      {id:'iffand',make:([p,q,r])=>B(p,A(q,r)),say:([p,q,r])=>`${cap(p)} se, e somente se, ambas as afirmações “${q}” e “${r}” forem verdadeiras.`},
      {id:'denyor',make:([p,q])=>not(O(p,q)),say:([p,q])=>`É falso que ao menos uma destas afirmações seja verdadeira: “${p}” ou “${q}”.`},
      {id:'notboth',make:([p,q])=>not(A(p,q)),say:([p,q])=>`É falso que as duas afirmações “${p}” e “${q}” sejam verdadeiras ao mesmo tempo.`},
      {id:'contra',make:([p,q])=>I(not(q),not(p)),say:([p,q])=>`Se for falso que ${q}, então é falso que ${p}.`},
      {id:'orif',make:([p,q,r])=>O(p,I(q,r)),say:([p,q,r])=>`Pelo menos uma das condições é verdadeira: “${p}” ou “se ${q}, então ${r}”.`},
      {id:'denif',make:([p,q])=>not(I(p,q)),say:([p,q])=>`É falso que, se ${p}, então ${q}.`}
    ]
  };

export const ARGUMENT_TEMPLATES=[
    {id:'modusponens',valid:true,make:([p,q])=>[[I(p,q),p],q],name:'modus ponens'},
    {id:'modustollens',valid:true,make:([p,q])=>[[I(p,q),not(q)],not(p)],name:'modus tollens'},
    {id:'disjuntivo',valid:true,make:([p,q])=>[[O(p,q),not(p)],q],name:'silogismo disjuntivo'},
    {id:'simplificacao',valid:true,make:([p,q])=>[[A(p,q),p],q],name:'simplificação da conjunção'},
    {id:'transitividade',valid:true,make:([p,q,r])=>[[I(p,q),I(q,r)],I(p,r)],name:'silogismo hipotético'},
    {id:'cadeia',valid:true,make:([p,q,r])=>[[A(p,q),I(q,r)],r],name:'inferência encadeada'},
    {id:'afirmaconsequente',valid:false,make:([p,q])=>[[I(p,q),q],p],name:'afirmação do consequente'},
    {id:'negaantecedente',valid:false,make:([p,q])=>[[I(p,q),not(p)],not(q)],name:'negação do antecedente'},
    {id:'ouexclusivo',valid:false,make:([p,q])=>[[O(p,q),p],not(q)],name:'interpretação exclusiva do OU'},
    {id:'reciproca',valid:false,make:([p,q,r])=>[[I(p,q),I(r,q)],I(p,r)],name:'inversão indevida de condicionais'},
    {id:'independente',valid:false,make:([p,q,r])=>[[I(p,q),r],p],name:'conclusão sem sustentação'},
    {id:'afirmasucessor',valid:false,make:([p,q,r])=>[[I(p,q),I(q,r)],I(r,p)],name:'inversão da cadeia'}
  ];

export function cap(s){return s.charAt(0).toUpperCase()+s.slice(1)}
