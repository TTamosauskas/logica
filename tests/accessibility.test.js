import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const css=readFileSync(new URL('../styles/base.css',import.meta.url),'utf8');
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const venn=readFileSync(new URL('../styles/venn.css',import.meta.url),'utf8');

function linear(n){const x=n/255;return x<=0.04045?x/12.92:((x+0.055)/1.055)**2.4}
function luminosity(hex){const c=hex.replace('#','');const a=[0,2,4].map(i=>linear(parseInt(c.slice(i,i+2),16)));return a[0]*0.2126+a[1]*0.7152+a[2]*0.0722}
function contrast(a,b){const x=luminosity(a),y=luminosity(b);return (Math.max(x,y)+0.05)/(Math.min(x,y)+0.05)}

test('texto branco em botões principais alcança WCAG AA nos dois temas',()=>{
  const root=css.match(/:root\{([^}]+)\}/)?.[1];
  const light=css.match(/:root\[data-theme="light"\]\{([^}]+)\}/)?.[1];
  for(const vars of [root,light]){
    const hex=vars?.match(/--accent-strong:(#[0-9a-f]{6})/i)?.[1];
    assert.ok(hex,'Token do botão encontrado');
    assert.ok(contrast('#ffffff',hex)>=4.5,`Contraste insuficiente: ${contrast('#ffffff',hex).toFixed(2)}`);
  }
  const hover=css.match(/\.button\.primary:hover:not\(:disabled\)\{background:(#[0-9a-f]{6})\}/)?.[1];
  assert.ok(hover&&contrast('#ffffff',hover)>=4.5);
});

test('o salto para o conteúdo principal tem destino com foco programático',()=>{
  assert.match(html,/class="skip-link" href="#mainContent"/);
  assert.match(html,/id="mainContent" tabindex="-1"/);
  assert.match(css,/\.skip-link:focus\{transform:translateY\(0\)\}/);
});

test('a interface do Venn possui alternativa textual com estados de seleção visíveis',()=>{
  const app=readFileSync(new URL('../src/app.js',import.meta.url),'utf8');
  assert.match(app,/data-venn-region-text/);
  assert.match(app,/aria-pressed="\$\{selected\.includes\(n\)\}"/);
  assert.match(app,/viewBox="0 0 480 330" aria-hidden="true" focusable="false"/);
  assert.match(venn,/\.venn-text-region-grid/);
  assert.match(venn,/min-height:44px/);
});
