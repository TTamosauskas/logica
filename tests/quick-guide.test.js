import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('os assuntos do Guia Rápido ficam em um único painel fechado inicialmente',()=>{
  const guides=[...html.matchAll(/<details\\b[^>]*class="reference[^"]*"[^>]*>/g)].map(match=>match[0]);
  assert.equal(guides.length,1,'deve existir apenas um painel de referência');
  assert.match(guides[0],/id="reference"/);
  assert.doesNotMatch(guides[0],/\\sopen(?:\\s|=|>)/);
  assert.match(html,/<summary>📖 &nbsp; Guia Rápido<\\/summary>/);
  for(const id of ['operatorsReference','quantifierReference','vennReference']){
    assert.match(html,new RegExp('<section\\b[^>]*id="'+id+'"'));
  }
  for(const phrase of ['Leis de De Morgan','Negação dos quantificadores','Ordem para resolver']){
    assert.ok(html.includes(phrase),'conteúdo preservado: '+phrase);
  }
});
