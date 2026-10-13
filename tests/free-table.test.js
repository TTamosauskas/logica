import test from 'node:test';
import assert from 'node:assert/strict';
import {blankFreeTable,VARIABLE_SEQUENCE,nextFreeVariableName,addFreeVariable,editFreeVariable,removeFreeVariable,
  addFreeFormula,editFreeFormula,removeFreeFormula,freeColumns,freeRows,parseFreeFormula,
  describeFreeFormula,gradeFreeTable,readFreeTable,MAX_VARS} from '../src/core/free-table.js';
import {evalAst} from '../src/core/logic.js';

test('começa apenas com p e q, sem fórmulas, em tabela completa de prática',()=>{
  const state=blankFreeTable();
  assert.equal(state.version,2);
  assert.deepEqual(state.variables,[{name:'p',meaning:''},{name:'q',meaning:''}]);
  assert.deepEqual(state.formulas,[]);
  assert.deepEqual(freeColumns(state).map(c=>c.label),['p','q']);
  assert.equal(freeRows(state).length,4);
  assert.equal(nextFreeVariableName(state),'r');
  assert.equal('rowMode' in state,false);
  assert.equal('viewMode' in state,false);
  assert.equal('customRows' in state,false);
});

test('adiciona variáveis somente na sequência r s t u; p e q não são excluíveis',()=>{
  const s=blankFreeTable();
  assert.throws(()=>addFreeVariable(s,'t'),/próxima variável é r/);
  assert.throws(()=>removeFreeVariable(s,'p'),/permanentes/);
  for(const name of ['r','s','t','u'])addFreeVariable(s,name);
  assert.deepEqual(s.variables.map(v=>v.name),VARIABLE_SEQUENCE);
  assert.equal(s.variables.length,MAX_VARS);
  assert.equal(freeRows(s).length,64);
  assert.equal(nextFreeVariableName(s),null);
  assert.throws(()=>addFreeVariable(s,'v'),/limite/);
  assert.throws(()=>removeFreeVariable(s,'r'),/última variável/);
  removeFreeVariable(s,'u');
  assert.equal(nextFreeVariableName(s),'u');
  addFreeVariable(s,'u','viajei');
  assert.equal(s.variables.at(-1).meaning,'viajei');
});

test('traduz fórmulas a partir das proposições cadastradas e identifica implicação negada',()=>{
  const s=blankFreeTable();
  editFreeVariable(s,'p','p','comprei ingresso');
  editFreeVariable(s,'q','q','viajei');
  addFreeFormula(s,'¬(p → q)');
  const d=describeFreeFormula(parseFreeFormula(s,s.formulas[0].source),s);
  assert.match(d.literal,/É falso que se comprei ingresso, então viajei\./);
  assert.equal(d.equivalent,'p ∧ ¬q');
  assert.match(d.truth,/é V.*é F/);
  assert.equal(evalAst(parseFreeFormula(s,'¬(p → q)'),{p:true,q:false}),true);
  assert.deepEqual(freeColumns(s).map(c=>c.label),['p','q','p → q','¬((p → q))']);
  assert.throws(()=>editFreeVariable(s,'p','r',''),/sequência/);
});

test('cadastro de fórmulas é livre, valida sintaxe e preserva leitura composicional',()=>{
  const s=blankFreeTable();
  addFreeFormula(s,'p ∧ q');
  addFreeFormula(s,'p ↔ q');
  addFreeFormula(s,'p ⊕ q');
  const translations=s.formulas.map(f=>describeFreeFormula(parseFreeFormula(s,f.source),s).literal);
  assert.match(translations[0],/ e /);
  assert.match(translations[1],/se, e somente se/);
  assert.match(translations[2],/mas não ambos/);
  assert.throws(()=>addFreeFormula(s,'p & inexistente'),/variáveis/);
  assert.throws(()=>addFreeFormula(s,'p →'),/incompleta/);
  assert.throws(()=>addFreeFormula(s,'p ∧ q'),/cadastrada/);
  const id=s.formulas[0].id;
  editFreeFormula(s,id,'¬p ∨ q');
  assert.equal(s.formulas[0].source,'¬p ∨ q');
  removeFreeFormula(s,id);
  assert.equal(s.formulas.length,2);
});

test('grade avalia todas as subexpressões, mesmo quando as colunas estão ocultas',()=>{
  const s=blankFreeTable();
  addFreeFormula(s,'¬(p → q)');
  const cols=freeColumns(s).filter(c=>c.kind!=='var');
  s.hidden=cols.map(c=>c.key);
  freeRows(s).forEach((row,r)=>cols.forEach(col=>{
    s.answers[r+'|'+col.key]=evalAst(col.node,row)?'V':'F';
  }));
  assert.deepEqual(gradeFreeTable(s),{correct:8,total:8,missing:0});
  s.answers['0|'+cols[0].key]='F'===s.answers['0|'+cols[0].key]?'V':'F';
  assert.deepEqual(gradeFreeTable(s),{correct:7,total:8,missing:0});
});

test('retomada no novo formato mantém rascunho, fórmulas e ordem automática',()=>{
  const s=blankFreeTable();
  addFreeVariable(s,'r');
  addFreeFormula(s,'p ∧ r');
  const col=freeColumns(s).find(c=>c.kind==='formula').key;
  s.answers['0|'+col]='V';
  s.hidden=[col];
  const data=readFreeTable(JSON.stringify(s),{strict:true});
  assert.deepEqual(data.variables.map(v=>v.name),['p','q','r']);
  assert.equal(data.answers['0|'+col],'V');
  assert.deepEqual(data.hidden,[col]);
  assert.equal(data.formulas[0].source,'p ∧ r');
  assert.equal(readFreeTable('{').formulas.length,0);
  assert.throws(()=>readFreeTable('{',{strict:true}),/Projeto inválido/);
});

test('migra tabela antiga preservando fórmulas autorais e removendo apenas o exemplo inicial',()=>{
  const initial={version:1,variables:[{name:'u',meaning:'comprei ingresso'},{name:'t',meaning:'viajei'}],
    formulas:[{id:'f1',source:'¬(u → t)'}],nextId:2,rowMode:'all',viewMode:'explore',
    hidden:[],answers:{},graded:false};
  const defaults=readFreeTable(JSON.stringify(initial),{strict:true});
  assert.deepEqual(defaults.variables.map(v=>v.name),['p','q']);
  assert.deepEqual(defaults.formulas,[]);
  const authored={...initial,variables:[{name:'u',meaning:'fui ao cinema'},{name:'t',meaning:'comprei ingresso'}],
    answers:{'0|f:f1':'V'},hidden:['v:u']};
  const restored=readFreeTable(JSON.stringify(authored),{strict:true});
  assert.deepEqual(restored.variables.map(v=>v.name),['p','q']);
  assert.equal(restored.formulas[0].source,'¬(p → q)');
  assert.equal(restored.answers['0|f:f1'],'V');
  assert.deepEqual(restored.hidden,['v:p']);
  assert.equal(restored.variables[0].meaning,'fui ao cinema');
  assert.equal(nextFreeVariableName(restored),'r');
});
