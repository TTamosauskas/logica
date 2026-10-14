import test from 'node:test';
import assert from 'node:assert/strict';
import {blankFreeTable,addFreeVariable,editFreeVariable,addFreeFormula,
  addFreeIndividual,readFreeTable,freeIndividualModel,addDiagramSet,editDiagramSet,removeDiagramSet,freeRows} from '../src/core/free-table.js';
import {renderIndividualSets} from '../src/truth-venn.js';

const setup=()=>{
  const state=blankFreeTable();
  editFreeVariable(state,'p','p','Sócrates','individual');
  editFreeVariable(state,'q','q','x é homem');
  addFreeVariable(state,'r');
  editFreeVariable(state,'r','r','x é mortal');
  return state;
};

test('Sócrates aparece dentro do conjunto Homens quando q(p) é afirmada',()=>{
  const state=setup();
  addFreeFormula(state,'q(p)');
  const model=freeIndividualModel(state);
  assert.deepEqual(model.predicates,['q','r']);
  assert.equal(model.people[0].label,'Sócrates');
  assert.equal(model.people[0].values.q,'V');
  assert.equal(model.people[0].origins.q,'premissa');
  const html=renderIndividualSets(model);
  assert.match(html,/<code>q<\/code><\/dt><dd>x é homem<\/dd>/);
  assert.match(html,/Sócrates: Homens sim/);
  assert.match(html,/truth-individual-person/);
  assert.match(html,/<h4>Legenda<\/h4>/);
  assert.match(html,/<code>q<\/code><\/dt><dd>x é homem<\/dd>/);
  assert.match(html,/<code>p<\/code><\/dt><dd>Sócrates/);
  const svg=html.match(/<svg\b[\s\S]*?<\/svg>/)?.[0]||'';
  assert.match(svg,/>p<\/text>/);
  assert.doesNotMatch(svg,/<text[^>]*>Sócrates<\/text>/);
  assert.equal((html.match(/<svg\b/g)||[]).length,1);
  assert.doesNotMatch(html,/truth-individual-set-grid|truth-individual-editor|venn-mode/);
});

test('conclusão não é tomada como fato; universal como premissa deriva mortalidade',()=>{
  const state=setup();
  state.inferenceMode=true;
  addFreeFormula(state,'q(p)');
  addFreeFormula(state,'∀x(q(x) → r(x))');
  let model=freeIndividualModel(state);
  assert.equal(model.people[0].values.q,'V');
  assert.equal(model.people[0].values.r,'');
  addFreeFormula(state,'r(p)');
  model=freeIndividualModel(state);
  assert.equal(model.people[0].values.r,'V');
  assert.equal(model.people[0].origins.r,'regra universal');
  const html=renderIndividualSets(model);
  assert.match(html,/<code>r<\/code><\/dt><dd>x é mortal<\/dd>/);
  assert.match(html,/truth-individual-subset-circle/);
  assert.match(html,/Sócrates: Homens sim, Mortais sim/);
  assert.equal((html.match(/<svg\b/g)||[]).length,1);
  assert.match(html,/Sócrates/);
});

test('negação de universal não atribui falso ao indivíduo nomeado',()=>{
  const state=setup();
  state.inferenceMode=true;
  addFreeFormula(state,'q(p)');
  addFreeFormula(state,'¬∀x(q(x) → r(x))');
  addFreeFormula(state,'¬r(p)');
  const model=freeIndividualModel(state);
  assert.equal(model.people[0].values.q,'V');
  assert.equal(model.people[0].values.r,'');
  const html=renderIndividualSets(model);
  assert.match(html,/posição parcial; falta definir r/);
  assert.doesNotMatch(html,/truth-individual-subset-circle/);
});

test('valores manuais persistem para indivíduos usados em fórmulas',()=>{
  const state=setup();
  addFreeFormula(state,'q(p)');
  addFreeFormula(state,'r(p)');
  state.predicateValues['p|r']='F';
  const read=readFreeTable(JSON.stringify(state),{strict:true});
  assert.equal(read.predicateValues['p|r'],'F');
  assert.equal(freeIndividualModel(read).people[0].values.r,'');
  assert.ok(freeIndividualModel(read).conflicts.length>0);
});

test('detecta quando um valor manual contradiz premissas',()=>{
  const state=setup();
  addFreeFormula(state,'q(p)');
  addFreeFormula(state,'∀x(q(x) → r(x))');
  addFreeFormula(state,'r(p)');
  state.predicateValues['p|r']='F';
  const model=freeIndividualModel(state);
  assert.equal(model.people[0].values.r,'');
  assert.ok(model.conflicts.length>0);
  assert.match(renderIndividualSets(model),/Há informações contraditórias sobre indivíduos/);
});

test('permite inserir indivíduos extras com pertinência inicialmente indefinida',()=>{
  const state=setup();
  addFreeIndividual(state,'s','Uma pedra');
  addFreeFormula(state,'q(p)');
  const model=freeIndividualModel(state);
  assert.equal(model.people.find(p=>p.id==='s').values.q,'');
  const html=renderIndividualSets(model);
  assert.match(html,/propriedades não informadas/);
  assert.match(html,/<code>s<\/code><\/dt><dd>Uma pedra/);
  assert.match(html,/>s<\/text>/);
});

test('em um único gráfico, apresenta Sócrates na borda quando outra propriedade é desconhecida',()=>{
 const html=renderIndividualSets({
   predicates:['q','r'],meanings:{q:'x é homem',r:'x é mortal'},
   people:[{id:'p',label:'Sócrates',values:{q:'V',r:''}}]
 });
 assert.equal((html.match(/<svg\b/g)||[]).length,1);
 assert.match(html,/<code>q<\/code><\/dt><dd>x é homem<\/dd>/);
 assert.match(html,/<code>r<\/code><\/dt><dd>x é mortal<\/dd>/);
 assert.match(html,/class="truth-individual-dot"/);
 assert.match(html,/posição parcial; falta definir r/);
 assert.doesNotMatch(html,/truth-individual-set-grid/);
});
test('três propriedades permanecem num único Venn, sem duplicar painéis',()=>{
 const html=renderIndividualSets({
   predicates:['q','r','s'],meanings:{q:'x é homem',r:'x é mortal',s:'x é humano'},
   people:[{id:'p',label:'Sócrates',values:{q:'V',r:'V',s:'V'}}]
 });
 assert.equal((html.match(/<svg\b/g)||[]).length,1);
 assert.equal((html.match(/class="truth-individual-person"/g)||[]).length,1);
});
test('legenda completa traduz q e r e inclui o indivíduo s sem posição determinada',()=>{
 const html=renderIndividualSets({
   predicates:['q','r'],meanings:{q:'Homem',r:'Mortal'},
   people:[{id:'p',label:'Sócrates',values:{q:'V',r:'V'}},
     {id:'s',label:'mulher',values:{q:'',r:''}}],
   relations:[{subset:'q',superset:'r'}]
 });
 const svg=html.match(/<svg\b[\s\S]*?<\/svg>/)?.[0]||'';
 assert.equal((html.match(/<svg\b/g)||[]).length,1);
 assert.match(html,/Predicados · conjuntos/);
 assert.match(html,/Indivíduos · pontos/);
 assert.match(html,/<code>q<\/code><\/dt><dd>Homem<\/dd>/);
 assert.match(html,/<code>r<\/code><\/dt><dd>Mortal<\/dd>/);
 assert.match(html,/<code>p<\/code><\/dt><dd>Sócrates<\/dd>/);
 assert.match(html,/<code>s<\/code><\/dt><dd>mulher.*propriedades não informadas/);
 assert.match(svg,/>p<\/text>/);
 assert.doesNotMatch(svg,/<text[^>]*>Sócrates<\/text>|<text[^>]*>mulher<\/text>/);
 assert.match(svg,/>s<\/text>/);
});
test('as duas afirmações q(p) e s(r) colocam Sócrates e Maria no mesmo desenho',()=>{
 const state=blankFreeTable();
 editFreeVariable(state,'p','p','Sócrates','individual');
 editFreeVariable(state,'q','q','Homem');
 addFreeVariable(state,'r');
 editFreeVariable(state,'r','r','Maria','individual');
 addFreeVariable(state,'s');
 editFreeVariable(state,'s','s','Linda');
 addFreeFormula(state,'q(p)');
 addFreeFormula(state,'s(r)');
 const model=freeIndividualModel(state);
 assert.equal(state.inferenceMode,false);
 assert.equal(model.people.find(p=>p.id==='p').values.q,'V');
 assert.equal(model.people.find(p=>p.id==='r').values.s,'V');
 const html=renderIndividualSets(model);
 const svg=html.match(/<svg\b[\s\S]*?<\/svg>/)?.[0]||'';
 assert.equal((svg.match(/class="truth-individual-person"/g)||[]).length,2);
 assert.match(svg,/>p<\/text>/);
 assert.match(svg,/>r<\/text>/);
 assert.match(html,/<code>r<\/code><\/dt><dd>Maria/);
});
test('mostra seis conjuntos e conserva símbolos mesmo sem região representável',()=>{
 const predicates=['a','b','c','d','e','f'];
 const values=Object.fromEntries(predicates.map(name=>[name,'']));
 const html=renderIndividualSets({predicates,people:[{id:'m',label:'Maria',values}]});
 assert.equal((html.match(/class="truth-individual-set-circle"/g)||[]).length,6);
 assert.equal((html.match(/<svg\b/g)||[]).length,1);
 assert.match(html,/>m<\/text>/);
 assert.match(html,/<code>m<\/code><\/dt><dd>Maria/);
 assert.match(html,/POSIÇÃO NÃO DETERMINADA/);
});

test('propriedades nomeadas aparecem como círculos sem fórmulas adicionais',()=>{
 const state=setup();
 addFreeVariable(state,'s');
 editFreeVariable(state,'s','s','x é filósofo');
 addFreeVariable(state,'t');
 editFreeVariable(state,'t','t','x é grego');
 addFreeFormula(state,'q(p)');
 const model=freeIndividualModel(state);
 assert.deepEqual(model.predicates,['q','r','s','t']);
 const html=renderIndividualSets(model);
 assert.equal((html.match(/class="truth-individual-set-circle/g)||[]).length,4);
 assert.match(html,/<code>t<\/code><\/dt><dd>x é grego/);
 assert.match(html,/<code>p<\/code><\/dt><dd>Sócrates/);
});
test('indivíduos extras não consomem símbolos de predicados',()=>{
 const state=setup();
 addFreeIndividual(state,'a','Maria');
 addFreeIndividual(state,'b','João');
 addFreeFormula(state,'q(p)');
 const model=freeIndividualModel(state);
 assert.equal(model.people.length,3);
 const html=renderIndividualSets(model);
 assert.match(html,/<code>a<\/code><\/dt><dd>Maria/);
 assert.match(html,/<code>b<\/code><\/dt><dd>João/);
 assert.match(html,/>a<\/text>/);
 assert.match(html,/>b<\/text>/);
 const restored=readFreeTable(JSON.stringify(state),{strict:true});
 assert.deepEqual(restored.domain.map(d=>d.label),['Maria','João']);
});

test('atribuições manuais preservam Maria em conjuntos ao salvar e reabrir',()=>{
 const state=setup();
 addFreeIndividual(state,'a','Maria');
 addFreeFormula(state,'q(p)');
 state.predicateValues['a|q']='V';
 state.predicateValues['a|r']='F';
 const restored=readFreeTable(JSON.stringify(state),{strict:true});
 assert.equal(restored.predicateValues['a|q'],'V');
 assert.equal(restored.predicateValues['a|r'],'F');
 const model=freeIndividualModel(restored);
 assert.equal(model.people.find(p=>p.id==='a').values.q,'V');
 assert.equal(model.people.find(p=>p.id==='a').values.r,'F');
 assert.match(renderIndividualSets(model),/>a<\/text>/);
});
test('quatro conjuntos mostram fato conhecido e sinalizam propriedades ainda desconhecidas',()=>{
 const html=renderIndividualSets({
  predicates:['q','r','s','t'],meanings:{q:'Homem',r:'Mortal',s:'Lindo',t:'Filósofo'},
  people:[{id:'p',label:'Sócrates',values:{q:'V',r:'',s:'',t:''}}]
 });
 assert.equal((html.match(/class="truth-individual-set-circle/g)||[]).length,4);
 assert.match(html,/>p<\/text>/);
 assert.match(html,/class="truth-individual-question"/);
 assert.match(html,/posição parcial; falta definir r, s, t/);
 assert.doesNotMatch(html,/POSIÇÃO NÃO DETERMINADA/);
});
test('escapa rótulos fornecidos pelo usuário no SVG e na descrição',()=>{
  const html=renderIndividualSets({predicates:['q'],people:[{
    id:'p',label:'<script>alert(1)</script>',values:{q:'V'},origins:{q:'informado'}
  }],meanings:{q:'x é homem'}});
  assert.doesNotMatch(html,/<script>/);
  assert.match(html,/&lt;script&gt;/);
});


test('dez conjuntos independentes não aumentam as linhas da tabela-verdade',()=>{
 const state=blankFreeTable();
 for(let i=1;i<=10;i++)addDiagramSet(state,'grupo'+i,'x é do grupo '+i);
 addFreeIndividual(state,'ana','Ana');
 state.predicateValues['ana|grupo1']='V';
 state.predicateValues['ana|grupo2']='F';
 assert.equal(freeRows(state).length,4);
 const model=freeIndividualModel(state);
 assert.equal(model.predicates.length,10);
 const html=renderIndividualSets(model);
 assert.match(html,/Matriz de pertinência/);
 assert.equal((html.match(/<th scope="col"><code>grupo/g)||[]).length,10);
 assert.match(html,/data-set-value="V">V/);
 assert.match(html,/data-set-value="F">F/);
 assert.match(html,/data-set-value="\?">\?/);
 assert.match(html,/<code>ana<\/code><\/dt><dd>Ana/);
 const reload=readFreeTable(JSON.stringify(state),{strict:true});
 assert.equal(reload.diagramSets.length,10);
 assert.equal(reload.predicateValues['ana|grupo1'],'V');
 assert.equal(freeRows(reload).length,4);
});
test('conjuntos extras podem aparecer em fórmulas e não são variáveis proposicionais',()=>{
 const state=blankFreeTable();
 addDiagramSet(state,'artista','x é artista');
 addFreeIndividual(state,'maria','Maria');
 addFreeFormula(state,'artista(maria)');
 assert.equal(freeRows(state).length,2);
 assert.equal(freeIndividualModel(state).people.find(p=>p.id==='maria').values.artista,'V');
 assert.throws(()=>removeDiagramSet(state,'artista'),/fórmulas que usam/);
 const restored=readFreeTable(JSON.stringify(state),{strict:true});
 assert.equal(restored.diagramSets[0].name,'artista');
 assert.equal(restored.formulas[0].source,'artista(maria)');
});
test('cadastro adicional rejeita colisões, admite edição e exclusão',()=>{
 const state=blankFreeTable();
 assert.throws(()=>addDiagramSet(state,'p','pessoa'),/Símbolo já utilizado/);
 addDiagramSet(state,'profissao','x tem uma profissão');
 assert.throws(()=>addFreeIndividual(state,'profissao','João'),/conjunto/);
 editDiagramSet(state,'profissao','x é profissional');
 assert.equal(state.diagramSets[0].meaning,'x é profissional');
 removeDiagramSet(state,'profissao');
 assert.equal(state.diagramSets.length,0);
});
