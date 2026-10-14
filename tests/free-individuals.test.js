import test from 'node:test';
import assert from 'node:assert/strict';
import {blankFreeTable,addFreeVariable,editFreeVariable,addFreeFormula,
  addFreeIndividual,readFreeTable,freeIndividualModel} from '../src/core/free-table.js';
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
  assert.deepEqual(model.predicates,['q']);
  assert.equal(model.people[0].label,'Sócrates');
  assert.equal(model.people[0].values.q,'V');
  assert.equal(model.people[0].origins.q,'premissa');
  const html=renderIndividualSets(model);
  assert.match(html,/Homens/);
  assert.match(html,/Sócrates: Homens sim/);
  assert.match(html,/truth-individual-person/);
  assert.match(html,/<h4>Legenda<\/h4>/);
  assert.match(html,/<code>q<\/code><\/dt><dd>x é homem<\/dd>/);
  assert.match(html,/<code>p<\/code><\/dt><dd>Sócrates<\/dd>/);
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
  assert.match(html,/Mortais/);
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
  assert.match(renderIndividualSets(model),/Há conflito entre premissas e valores informados/);
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
 assert.match(html,/Homens/);
 assert.match(html,/Mortais/);
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
test('escapa rótulos fornecidos pelo usuário no SVG e na descrição',()=>{
  const html=renderIndividualSets({predicates:['q'],people:[{
    id:'p',label:'<script>alert(1)</script>',values:{q:'V'},origins:{q:'informado'}
  }],meanings:{q:'x é homem'}});
  assert.doesNotMatch(html,/<script>/);
  assert.match(html,/&lt;script&gt;/);
});
