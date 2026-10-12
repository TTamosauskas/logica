/** Ciclo 14: competências verificáveis, sem dependência do DOM. */
import {parseFormula,equivalentFormula} from './parser.js';

export const DESCRIPTION_CASES=[
 {id:'sem',role:'responsável pela feira',predicate:'assinou o relatório',people:['Ana','Beto','Caio'],holders:[],acted:[]},
 {id:'unico-sim',role:'vencedor da competição',predicate:'recebeu o prêmio',people:['Ana','Beto','Caio'],holders:[0],acted:[0]},
 {id:'unico-nao',role:'coordenador do projeto',predicate:'entregou o documento',people:['Ana','Beto','Caio'],holders:[1],acted:[0]},
 {id:'dois',role:'autor do parecer',predicate:'revisou o texto',people:['Ana','Beto','Caio'],holders:[0,2],acted:[0,2]},
 {id:'tres',role:'responsável pela pesquisa',predicate:'registrou os dados',people:['Ana','Beto','Caio'],holders:[0,1,2],acted:[1]},
 {id:'outro',role:'organizador da oficina',predicate:'apresentou os resultados',people:['Ana','Beto','Caio'],holders:[2],acted:[1,2]}
];
export const IDENTITY_CASES=[
 {id:'mesma',a:'Ana',b:'A. Silva',same:true,property:'entregou a ficha'},
 {id:'diferentes',a:'Beto',b:'Caio',same:false,property:'participa do clube'},
 {id:'apelido',a:'Lia',b:'E. Lima',same:true,property:'assinou o contrato'},
 {id:'colegas',a:'Rita',b:'Vera',same:false,property:'recebeu certificado'}
];
export const RELATION_CASES=[
 {id:'individual',people:['Ana','Beto'],relations:[[0,0],[1,1]]},
 {id:'todos-mesmo',people:['Ana','Beto'],relations:[[0,1],[1,1]]},
 {id:'ninguém',people:['Ana','Beto'],relations:[]},
 {id:'metade',people:['Ana','Beto'],relations:[[0,1]]},
 {id:'cruzado',people:['Ana','Beto','Caio'],relations:[[0,1],[1,2],[2,0]]}
];
export function descriptionStatus(c){
 const members=c.holders.length,unique=members===1;
 return {exists:members>0,unique,statement:unique&&c.acted.includes(c.holders[0]),count:members};
}
export function relationStatus(c){
 const all=c.people.map((_,i)=>i);
 const has=(i,j)=>c.relations.some(([x,y])=>x===i&&y===j);
 return {forallExists:all.every(i=>all.some(j=>has(i,j))),
   existsForall:all.some(j=>all.every(i=>has(i,j)))};
}
export function shuffled(q,random=Math.random){
 const order=q.options.map((_,i)=>i);
 for(let i=order.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[order[i],order[j]]=[order[j],order[i]]}
 return {...q,options:order.map(i=>q.options[i]),correct:order.indexOf(q.correct)};
}
export function makePredicateQuestions(description,identity,relation,random=Math.random){
 const d=descriptionStatus(description),r=relationStatus(relation),members=description.holders.map(i=>description.people[i]).join(', ')||'ninguém';
 const qualifying=description.acted.map(i=>description.people[i]).join(', ')||'ninguém';
 const claim='“O único '+description.role+' '+description.predicate+'”';
 const intro='No grupo de '+description.people.join(', ')+', o papel de '+description.role+' é ocupado por: '+members+'. Realizou a ação “'+description.predicate+'”: '+qualifying+'. ';
 const identityFact=identity.same?'Os nomes '+identity.a+' e '+identity.b+' indicam a mesma pessoa.':'Os nomes '+identity.a+' e '+identity.b+' indicam pessoas diferentes.';
 const relFact=relation.relations.map(([i,j])=>relation.people[i]+' ajuda '+relation.people[j]).join('; ')||'ninguém ajuda ninguém';
 return [
  {question:intro+'Quantas pessoas exercem esse papel?',options:[String(d.count),String(description.acted.length),'Não é possível contar as pessoas indicadas.'],correct:0,why:'Conte quem satisfaz a descrição, não quem realizou a ação. Há '+d.count+' integrante(s) no papel indicado.'},
  {question:'Dado o mesmo cenário, vale “Existe exatamente uma pessoa que é '+description.role+'”?',options:[d.unique?'Sim: há exatamente uma.':'Não: não há exatamente uma.','Toda expressão singular garante automaticamente um indivíduo único.',d.unique?'Não: é necessário que todos tenham o papel.':'Sim: basta existir pelo menos uma pessoa.'],correct:0,why:'Existência e unicidade são condições distintas: o papel contém '+d.count+' pessoas. “Exatamente uma” exige uma e somente uma.'},
  {question:intro+'Na análise de Russell (existência, unicidade e predicação), '+claim+' é verdadeira?',options:[d.statement?'Sim, as três condições são satisfeitas.':'Não: pelo menos uma das três condições falha.','Sim, basta existir alguém que realize a ação.','Não se pode avaliar nenhuma descrição definida por quantificadores.'],correct:0,why:'A análise conjuntiva requer exatamente um titular e que esse titular realize a ação. Temos '+d.count+' titulares e a afirmação é '+(d.statement?'verdadeira.':'falsa.')},
  {question:identityFact+' Se '+identity.a+' '+identity.property+', podemos concluir que '+identity.b+' '+identity.property+'?',options:[identity.same?'Sim, pela substituição de idênticos.':'Não necessariamente: compartilhar propriedades não demonstra identidade.','Sim, quaisquer duas pessoas possuem sempre as mesmas propriedades.','Não: identidade nunca autoriza substituir nomes.'],correct:0,why:identity.same?'Ambos os nomes designam o mesmo indivíduo; a verdade do predicado se preserva em contextos extensionais.':'Os nomes designam indivíduos diferentes. Mesmo que compartilhem uma propriedade, a conclusão sobre um não decorre apenas de informações sobre outro.'},
  {question:'Domínio '+relation.people.join(', ')+'. Relações “ajuda”: '+relFact+'. Qual afirmação é verdadeira?',options:[
    '∀x∃y Ajuda(x,y): '+(r.forallExists?'V':'F')+'; ∃y∀x Ajuda(x,y): '+(r.existsForall?'V':'F')+'.',
    '∀x∃y Ajuda(x,y): '+(!r.forallExists?'V':'F')+'; ∃y∀x Ajuda(x,y): '+(!r.existsForall?'V':'F')+'.',
    'As duas expressões significam a mesma coisa para qualquer relação.'
  ],correct:0,why:'A primeira permite testemunha y diferente para cada x; a segunda exige uma única testemunha y para todos. Neste cenário, os valores são '+(r.forallExists?'V':'F')+' e '+(r.existsForall?'V':'F')+'.'}
 ].map(q=>shuffled(q,random));
}
export const META_CASES=[
 {id:'correcao',question:'Um cálculo é correto (sound). O que isso garante?',options:['Se Γ ⊢ φ, então Γ ⊨ φ.','Se Γ ⊨ φ, então Γ ⊢ φ, sem outra hipótese.','Toda fórmula da linguagem é verdadeira.'],correct:0,why:'Correção significa que regras de demonstração preservam a consequência semântica: uma prova correta não deriva conclusão falsa de premissas todas verdadeiras.'},
 {id:'completude',question:'O que significa completude semântica do cálculo clássico de primeira ordem?',options:['Se Γ ⊨ φ, então existe uma demonstração Γ ⊢ φ.','Toda teoria aritmética consistente prova qualquer verdade aritmética.','Há algoritmo que decide toda sentença de primeira ordem e sempre termina.'],correct:0,why:'Completude do cálculo de primeira ordem relaciona consequência semântica e demonstração; ela não equivale à decidibilidade nem à completude de toda teoria aritmética.'},
 {id:'godel',question:'Qual situação descreve corretamente a primeira incompletude de Gödel?',options:['Uma teoria consistente, efetivamente axiomatizável e suficientemente expressiva para aritmética não demonstra todas as sentenças aritméticas verdadeiras no modelo padrão.','A lógica clássica de primeira ordem não admite sistemas dedutivos completos.','Qualquer teoria sem contradição demonstra todas as suas sentenças.'],correct:0,why:'É necessário distinguir completude do cálculo de primeira ordem da incompletude de teorias aritméticas com hipóteses específicas. Não há contradição entre os dois teoremas.'},
 {id:'parada',question:'O que demonstra a indecidibilidade do problema geral da parada?',options:['Não existe algoritmo geral que sempre termine e decida corretamente a parada de qualquer programa com sua entrada.','Nenhum programa concreto pode ser examinado ou ter sua parada demonstrada.','Qualquer algoritmo que demore muito necessariamente nunca terminará.'],correct:0,why:'Turing demonstrou a impossibilidade de um decisor uniforme para todos os pares programa/entrada; programas particulares ainda podem ter parada ou não parada demonstradas.'},
 {id:'laço',question:'Um programa executa “n=0; enquanto n<3: n=n+1; fim”. Sobre essa execução específica:',options:['É possível justificar que termina após três incrementos.','O problema geral da parada impede qualquer conclusão sobre esta execução.','Se existe repetição, o programa necessariamente não para.'],correct:0,why:'Os valores de n são 0, 1, 2 e 3, quando a condição n<3 torna-se falsa. A indecidibilidade geral não impede examinar casos concretos.'},
 {id:'loop',question:'Um programa executa “enquanto verdadeiro: prossiga” sem saída nem interrupção. Sobre essa execução:',options:['Pode-se demonstrar que não termina, sob a semântica descrita.','Ela termina porque todo programa possui tempo finito.','Não é possível provar que nenhum programa particular deixa de terminar.'],correct:0,why:'O laço permanece verdadeiro e não há comando de saída. A inexistência de um decisor geral não impede provar a não parada deste programa específico.'},
 {id:'prova',question:'Um método enumera provas possíveis e termina quando encontra uma prova de φ. Qual é o limite dessa estratégia?',options:['Pode encontrar uma prova se houver, mas não promete terminar quando não houver prova.','Decide automaticamente qualquer pergunta de validade com resposta negativa garantida.','Toda tentativa de enumerar provas é logicamente impossível.'],correct:0,why:'Encontrar uma testemunha de demonstração é diferente de ter um procedimento que termina sempre com sim ou não; prova buscada e decisão geral são objetivos distintos.'}
];
export function makeMetatheoryQuestions(random=Math.random){
 const items=META_CASES.slice();
 for(let i=items.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[items[i],items[j]]=[items[j],items[i]]}
 return items.slice(0,5).map(q=>shuffled(q,random));
}
export const REWRITE_CHAINS=[
 {id:'implicacao',original:'p → q',middle:'¬p ∨ q',final:'¬(p ∧ ¬q)',rule1:'Eliminação da condicional',rule2:'Lei de De Morgan e dupla negação',wrong:'¬p ∧ q'},
 {id:'contrapositiva',original:'p → q',middle:'¬q → ¬p',final:'q ∨ ¬p',rule1:'Contraposição',rule2:'Eliminação da condicional e dupla negação',wrong:'q → p'},
 {id:'negacao-conjuncao',original:'¬(p ∧ q)',middle:'¬p ∨ ¬q',final:'p → ¬q',rule1:'Lei de De Morgan',rule2:'Eliminação da condicional',wrong:'¬p ∧ ¬q'},
 {id:'negacao-disjuncao',original:'¬(p ∨ q)',middle:'¬p ∧ ¬q',final:'¬(¬p → q)',rule1:'Lei de De Morgan',rule2:'Negação da condicional e dupla negação',wrong:'¬p ∨ ¬q'},
 {id:'distribuicao',original:'p ∧ (q ∨ r)',middle:'(p ∧ q) ∨ (p ∧ r)',final:'(q ∧ p) ∨ (r ∧ p)',rule1:'Distributividade',rule2:'Comutatividade da conjunção',wrong:'(p ∨ q) ∧ r'},
 {id:'bicondicional',original:'p ↔ q',middle:'(p → q) ∧ (q → p)',final:'(¬p ∨ q) ∧ (¬q ∨ p)',rule1:'Definição do bicondicional',rule2:'Eliminação das duas condicionais',wrong:'(p → q) ∨ (q → p)'}
];
const vars=['p','q','r'];
export function rewriteCounterexample(a,b){
 const first=parseFormula(a,vars),second=parseFormula(b,vars);
 return equivalentFormula(first,second,vars);
}
export function makeRewriteQuestions(chain,random=Math.random){
 const e1=rewriteCounterexample(chain.original,chain.middle);
 const e2=rewriteCounterexample(chain.middle,chain.final);
 const bad=rewriteCounterexample(chain.original,chain.wrong);
 if(!e1.equivalent||!e2.equivalent||bad.equivalent)throw Error('Cadeia de equivalência inválida: '+chain.id);
 const counter=Object.entries(bad.counter).map(([v,x])=>v+'='+(x?'V':'F')).join(', ');
 return [
 {question:'Comece por '+chain.original+'. Qual transformação preserva o valor em todos os casos?',options:[chain.middle,chain.wrong,chain.original.replaceAll('→','↔')===chain.original?'p ∧ ¬p':'p ↔ q'],correct:0,why:'A transformação '+chain.original+' ≡ '+chain.middle+' preserva todas as linhas por '+chain.rule1+'.'},
 {question:'A partir de '+chain.middle+', qual é um próximo resultado equivalente?',options:[chain.final,chain.wrong,'p ∧ ¬p'],correct:0,why:'Aplicamos '+chain.rule2+': '+chain.middle+' ≡ '+chain.final+'. Cada passagem deve preservar os valores de verdade.'},
 {question:'Que justificativa corresponde ao primeiro passo '+chain.original+' → '+chain.middle+'?',options:[chain.rule1,'Apenas inverter antecedente e consequente','Aparece a mesma variável nas duas expressões'],correct:0,why:'O primeiro passo é autorizado por '+chain.rule1+'. A presença de letras iguais não basta para justificar uma equivalência.'},
 {question:'Por que a proposta '+chain.original+' ≡ '+chain.wrong+' é inválida?',options:['Existe interpretação com valores diferentes: '+counter+'.','As fórmulas usam as mesmas letras, portanto são equivalentes.','A equivalência precisa ser julgada somente pela primeira linha da tabela.'],correct:0,why:'Uma única interpretação em que os valores diferem refuta equivalência: '+counter+'. A comparação deve ser feita para todas as valorações possíveis.'}
 ].map(q=>shuffled(q,random));
}
