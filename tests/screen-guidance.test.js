import test from 'node:test';
import assert from 'node:assert/strict';
import { courseScreenContext, exerciseScreenContext } from '../src/core/screen-guidance.js';

test('mapa: identifica onde estou, o que fazer e as próximas opções',()=>{
  const c=courseScreenContext('map');
  assert.match(c.location,/CURSO GUIADO \/ MAPA DAS UNIDADES/);
  assert.match(c.description,/Escolha uma aula/);
  assert.match(c.description,/revisões/);
  assert.match(c.description,/avaliação integrada/);
});

test('aula: o contexto nomeia a aula, orienta ação e retorno ao mapa',()=>{
  const c=courseScreenContext('lesson',{name:'Fundamentos',no:'01'});
  assert.match(c.location,/AULA 01 · Fundamentos/);
  assert.match(c.description,/Leia/);
  assert.match(c.description,/Mapa das unidades/);
});

test('avaliação final: o texto indica tarefa, correção e saída',()=>{
  const c=courseScreenContext('exam');
  assert.match(c.location,/AVALIAÇÃO FINAL/);
  assert.match(c.description,/12 questões/);
  assert.match(c.description,/corrija/);
  assert.match(c.description,/Volte ao mapa/);
});

test('prática guiada: identifica etapa, tarefa e saída',()=>{
  const c=exerciseScreenContext({moduleName:'Operadores',stage:'guided'});
  assert.match(c.location,/PRÁTICA COM AJUDA \/ OPERADORES/);
  assert.match(c.description,/Preencha/);
  assert.match(c.description,/Corrigir/);
  assert.match(c.description,/volte à aula/);
});

test('prática independente e revisão: informa os critérios antes da correção',()=>{
  const c=exerciseScreenContext({moduleName:'Fundamentos',stage:'independent'});
  assert.match(c.location,/PRÁTICA INDEPENDENTE/);
  assert.match(c.description,/sem dicas/);
  assert.match(c.description,/primeira correção/);
  const r=exerciseScreenContext({moduleName:'Fundamentos',stage:'review'});
  assert.match(r.location,/REVISÃO ESPAÇADA/);
  assert.match(r.description,/valida?r|validar/);
});

test('após correção ou revelação: orientação muda para próximos passos',()=>{
  const graded=exerciseScreenContext({moduleName:'Fundamentos',graded:true});
  assert.match(graded.description,/Confira a correção/);
  assert.match(graded.description,/voltar/);
  const reveal=exerciseScreenContext({moduleName:'Fundamentos',revealed:true});
  assert.match(reveal.description,/resolução/);
  assert.match(reveal.description,/Próximo/);
});

test('prática livre: explica como agir e como voltar',()=>{
  const p=exerciseScreenContext({moduleName:'Tradução'});
  assert.match(p.location,/PRÁTICA LIVRE \/ TRADUÇÃO/);
  assert.match(p.description,/Corrigir/);
  assert.match(p.description,/módulos/);
});
