import test from 'node:test';
import assert from 'node:assert/strict';
import { routeFromHash } from '../src/core/navigation.js';

const modules=['fundamentos','operadores','traducao'];
const lessons=['fundamentos','operadores','traducao'];

test('a página inicial e fragmentos desconhecidos convergem para home',()=>{
  assert.deepEqual(routeFromHash('',modules,lessons),{view:'home',id:null});
  assert.deepEqual(routeFromHash('#inicio',modules,lessons),{view:'home',id:null});
  assert.deepEqual(routeFromHash('#desconhecido',modules,lessons),{view:'home',id:null});
  assert.deepEqual(routeFromHash('#%E0%A4%A',modules,lessons),{view:'home',id:null});
});

test('o curso guiado e cada aula recebem rotas explícitas',()=>{
  assert.deepEqual(routeFromHash('#curso',modules,lessons),{view:'course',id:null});
  assert.deepEqual(routeFromHash('#aula-operadores',modules,lessons),{view:'course',id:'operadores'});
  assert.deepEqual(routeFromHash('#aula-inexistente',modules,lessons),{view:'home',id:null});
  assert.deepEqual(routeFromHash('#avaliacao-final',modules,lessons),{view:'exam',id:null});
  assert.deepEqual(routeFromHash('#tabela-livre',modules,lessons),{view:'free-table',id:null});
});

test('módulos de prática e fragmentos codificados são reconhecidos',()=>{
  assert.deepEqual(routeFromHash('#fundamentos',modules,lessons),{view:'work',id:'fundamentos'});
  assert.deepEqual(routeFromHash('#opera%64ores',modules,lessons),{view:'work',id:'operadores'});
  assert.deepEqual(routeFromHash('#operadores',modules,lessons),{view:'work',id:'operadores'});
});
