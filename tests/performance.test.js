import test from 'node:test';
import assert from 'node:assert/strict';
import { scorePercent,performanceSummary } from '../src/core/performance.js';

test('diferencia taxa da correção atual, primeira correção e histórico',()=>{
  const metrics=performanceSummary(
    {correct:8,total:10,missing:0},
    {correct:3,total:10,missing:2},
    {tries:12,correct:24,total:48}
  );
  assert.equal(metrics.current.value,'80%');
  assert.equal(metrics.first.value,'30%');
  assert.equal(metrics.historical.value,'50%');
  assert.match(metrics.first.label,/Primeira correção/);
  assert.match(metrics.historical.detail,/12 exercícios corrigidos/);
});

test('histórico sem exercícios exibe ausência de dados sem inventar 0%',()=>{
  const metrics=performanceSummary(null,null,{tries:0,correct:0,total:0});
  assert.equal(metrics.current,null);
  assert.equal(metrics.first,null);
  assert.equal(metrics.historical.value,'—');
  assert.equal(scorePercent(1,0),'—');
  assert.equal(scorePercent(3,4),'75%');
});

test('rótulo da primeira tentativa mantém singular quando aplicável',()=>{
  const metrics=performanceSummary({correct:1,total:2},{correct:1,total:2},{tries:1,correct:1,total:2});
  assert.match(metrics.historical.detail,/1 exercício corrigido/);
  assert.equal(metrics.current.value,'50%');
});
