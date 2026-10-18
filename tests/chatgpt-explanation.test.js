import test from 'node:test';
import assert from 'node:assert/strict';
import {EXPLAIN_PROMPT_PREFIX,makeExplanationPrompt,explanationChatGPTUrl}
  from '../src/core/chatgpt-explanation.js';

test('link contém toda a questão, alternativas, escolha e correção',()=>{
  const info={
    question:"Em 'p somente se q', a seta aponta de:",
    context:'Compreensão conceitual',
    options:['p para ¬p.','p para q.','q para p.'],
    selected:'p para ¬p.',
    correct:'p para q.',
    feedback:'Resposta a rever. A expressão somente se apresenta q como requisito de p.'
  };
  const url=new URL(explanationChatGPTUrl(info));
  assert.equal(url.origin,'https://chatgpt.com');
  assert.equal(url.pathname,'/');
  const q=url.searchParams.get('q');
  assert.ok(q.startsWith(EXPLAIN_PROMPT_PREFIX));
  for(const fragment of [info.question,info.context,'A. p para ¬p.','B. p para q.','C. q para p.',
    'Resposta dada pelo estudante: p para ¬p.','Resposta esperada: p para q.',info.feedback]){
    assert.ok(q.includes(fragment),'Ausente no prompt: '+fragment);
  }
  assert.equal(decodeURIComponent(url.search.slice(3)),q);
});

test('acertos e erros recebem o mesmo pedido de primeiros princípios',()=>{
  const correct=makeExplanationPrompt({question:'Em p→q, q é:',options:['Necessária para p.','Suficiente para p.'],
    selected:'Necessária para p.',correct:'Necessária para p.',feedback:'✓ Resposta correta.'});
  const wrong=makeExplanationPrompt({question:'Em p→q, q é:',options:['Necessária para p.','Suficiente para p.'],
    selected:'Suficiente para p.',correct:'Necessária para p.',feedback:'Resposta a rever.'});
  assert.ok(correct.includes('✓ Resposta correta.'));
  assert.ok(wrong.includes('Resposta a rever.'));
  assert.ok(correct.includes('Explicar os conceitos')===false);
  assert.ok(correct.includes('Explique os conceitos a partir de definições simples'));
});

test('URLs codificam símbolos, acentos e textos de feedback sem alterar o conteúdo',()=>{
  const question='¬∀x(P(x)→Q(x)) significa quê?';
  const feedback='Uma testemunha com P(x)∧¬Q(x) refuta a universal.';
  const q=new URL(explanationChatGPTUrl({question,feedback,selected:'∃x(P(x)∧¬Q(x))'})).searchParams.get('q');
  assert.ok(q.includes(question));assert.ok(q.includes(feedback));
  assert.throws(()=>makeExplanationPrompt({question:''}),/precisa de uma questão/);
});
