import test from 'node:test';
import assert from 'node:assert/strict';
import {blankFreeTable,addFreeVariable,editFreeVariable,removeFreeVariable,addFreeFormula,editFreeFormula,removeFreeFormula,
  freeColumns,freeRows,parseFreeFormula,describeFreeFormula,gradeFreeTable,readFreeTable,setFreeRowMode,addFreeRow,MAX_VARS} from '../src/core/free-table.js';
import {evalAst,pretty} from '../src/core/logic.js';

test('tabela livre gera todas as interpretações e traduz condicional negada',()=>{
  const s=blankFreeTable();
  assert.equal(s.rowMode,'all');
  assert.equal(freeRows(s).length,4);
  const node=parseFreeFormula(s,'¬(u → t)');
  const reading=describeFreeFormula(node,s);
  assert.match(reading.literal,/É falso que se comprei ingresso, então viajei\./);
  assert.equal(reading.equivalent,'u ∧ ¬t');
  assert.match(reading.truth,/é V.*é F/);
  assert.equal(evalAst(node,{u:true,t:false}),true);
  assert.equal(evalAst(node,{u:true,t:true}),false);
  assert.deepEqual(freeColumns(s).map(c=>c.label),['u','t','u → t','¬(u → t)']);
});
test('tradução é composicional e usa os significados editados',()=>{
  const s=blankFreeTable();
  editFreeVariable(s,'u','u','estudei');
  addFreeFormula(s,'u ∧ t');
  addFreeFormula(s,'u ↔ t');
  addFreeFormula(s,'u ⊕ t');
  const formulas=s.formulas.map(f=>describeFreeFormula(parseFreeFormula(s,f.source),s).literal);
  assert.match(formulas[0],/estudei/);
  assert.match(formulas[1],/estudei.*e.*viajei/);
  assert.match(formulas[2],/se, e somente se/);
  assert.match(formulas[3],/mas não ambos/);
});
test('edita variáveis nas fórmulas e impede exclusão de dependências',()=>{
  const s=blankFreeTable();
  assert.throws(()=>removeFreeVariable(s,'u'),/Remova ou edite/);
  editFreeVariable(s,'t','v','visitei meu amigo');
  assert.match(s.formulas[0].source,/v/);
  assert.doesNotThrow(()=>parseFreeFormula(s,s.formulas[0].source));
  assert.throws(()=>addFreeVariable(s,'v','duplicada'),/já existe/);
  assert.throws(()=>addFreeVariable(s,'ou','reservada'),/reservado/);
  assert.throws(()=>addFreeFormula(s,'u & desconhecida'),/variáveis/);
  assert.throws(()=>addFreeFormula(s,'u →'),/incompleta/);
  assert.throws(()=>addFreeFormula(s,'¬(u → v)'),/já está cadastrada/);
  removeFreeFormula(s,s.formulas[0].id);
  removeFreeVariable(s,'u');
  assert.equal(s.variables.length,1);
});
test('personaliza cenários sem confundir com tabela completa',()=>{
  const s=blankFreeTable();
  setFreeRowMode(s,'custom');
  assert.equal(freeRows(s).length,1);
  addFreeRow(s);
  s.customRows[1].u=false;
  assert.deepEqual(freeRows(s).map(x=>x.u),[true,false]);
  setFreeRowMode(s,'all');
  assert.equal(freeRows(s).length,4);
  setFreeRowMode(s,'custom');
  assert.equal(freeRows(s).length,2);
});
test('nota considera todas as células derivadas, inclusive ocultas',()=>{
  const s=blankFreeTable();
  s.viewMode='practice';
  const columns=freeColumns(s);
  const derived=columns.filter(c=>c.kind!=='var');
  const rows=freeRows(s);
  s.hidden=derived.map(c=>c.key);
  rows.forEach((row,r)=>derived.forEach(c=>s.answers[r+'|'+c.key]=evalAst(c.node,row)?'V':'F'));
  let grade=gradeFreeTable(s);
  assert.deepEqual(grade,{correct:8,total:8,missing:0});
  s.answers['0|'+derived[0].key]='F'===s.answers['0|'+derived[0].key]?'V':'F';
  grade=gradeFreeTable(s);
  assert.deepEqual(grade,{correct:7,total:8,missing:0});
});
test('retomada preserva ids de fórmulas e respostas por coluna',()=>{
  const s=blankFreeTable();
  addFreeFormula(s,'u ∧ t');
  removeFreeFormula(s,'f1');
  addFreeFormula(s,'u ∨ t');
  assert.deepEqual(s.formulas.map(f=>f.id),['f2','f3']);
  s.answers['0|f:f3']='V';
  s.hidden=['f:f2'];
  s.rowMode='custom';
  s.customRows=[{u:true,t:false}];
  const restored=readFreeTable(JSON.stringify(s),{strict:true});
  assert.deepEqual(restored.formulas.map(f=>f.id),['f2','f3']);
  assert.equal(restored.answers['0|f:f3'],'V');
  assert.deepEqual(restored.hidden,['f:f2']);
  assert.equal(freeRows(restored).length,1);
  assert.equal(readFreeTable('{').formulas.length,1);
  assert.throws(()=>readFreeTable('{',{strict:true}),/Projeto inválido/);
});
test('limite de variáveis protege contra tabela exponencial',()=>{
  const s=blankFreeTable();
  for(const name of ['a','b','c','d'])addFreeVariable(s,name);
  assert.equal(s.variables.length,MAX_VARS);
  assert.equal(freeRows(s).length,64);
  assert.throws(()=>addFreeVariable(s,'f'),/seis variáveis/);
});
