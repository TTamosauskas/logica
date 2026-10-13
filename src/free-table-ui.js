/** Interface isolada da Tabela Livre: sem interferir em exercícios ou avaliações. */
import {blankFreeTable,readFreeTable,FREE_TABLE_KEY,MAX_VARS,nextFreeVariableName,
  addFreeVariable,editFreeVariable,removeFreeVariable,addFreeFormula,editFreeFormula,
  removeFreeFormula,freeColumns,freeRows,evaluateFreeRow,gradeFreeTable,
  parseFreeFormula,describeFreeFormula} from './core/free-table.js';
import {escapeHTML} from './core/html.js';
import {t} from './core/logic.js';

const esc=value=>escapeHTML(String(value??''));
const eye=open=>open?
  '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"></path><circle cx="12" cy="12" r="3"></circle>':
  '<path d="M3 3l18 18"></path><path d="M10.5 5.1A11 11 0 0 1 12 5c6.6 0 10 7 10 7a14 14 0 0 1-3.3 4.1"></path><path d="M6.6 6.6C3.6 8.6 2 12 2 12s3.4 7 10 7c1.3 0 2.5-.3 3.6-.7"></path>';
const key=(r,col)=>r+'|'+col;
export function createFreeTable(root){
  let state;
  try{state=readFreeTable(localStorage.getItem(FREE_TABLE_KEY))}catch{state=blankFreeTable()}
  const board=root.querySelector('#freeBoard'),feedback=root.querySelector('#freeFeedback');
  let lastFormulaInput=null;
  const notice=(message,error=false)=>{feedback.textContent=message;feedback.dataset.result=error?'error':'ok'};
  function save(){
    try{localStorage.setItem(FREE_TABLE_KEY,JSON.stringify(state));notice('Tabela salva automaticamente neste navegador.')}
    catch{notice('Não foi possível salvar: armazenamento indisponível.',true)}
  }
  const has=col=>state.hidden.includes(col.key);
  const header=(col)=>{
    const hidden=has(col),label=esc(col.label),name=hidden?'Mostrar':'Ocultar';
    return `<th scope="col" class="free-column-head ${hidden?'truth-col-collapsed':''} ${col.kind==='var'?'free-var-head':'derived'}">
      <span class="free-column-label">${label}</span>
      <span class="truth-col-short" title="${label}">${label}</span>
      <button type="button" class="truth-col-toggle" data-action="toggle-col" data-key="${esc(col.key)}" aria-pressed="${!hidden}" aria-label="${name} coluna ${label}" title="${name} coluna ${label}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${eye(!hidden)}</svg>
      </button>
    </th>`;
  };
  function renderVariables(){
    const next=nextFreeVariableName(state);
    return `<section class="free-card" aria-labelledby="freeVarTitle">
      <div class="free-section-heading"><h2 id="freeVarTitle">1. Variáveis e significados</h2><span class="free-hint">${state.variables.length}/${MAX_VARS}</span></div>
      <p>As variáveis começam com p e q e seguem r, s, t, u. Informe uma proposição para gerar traduções em português.</p>
      <div class="free-entries">${state.variables.map((v,i)=>`<div class="free-entry">
        <span class="free-variable-symbol" aria-label="Variável ${esc(v.name)}">${esc(v.name)}</span>
        <label>Significado de ${esc(v.name)} <input type="text" data-var-meaning="${i}" value="${esc(v.meaning)}" maxlength="160" placeholder="ex.: comprei ingresso" aria-label="Significado de ${esc(v.name)}"></label>
        <div class="free-entry-actions"><button type="button" class="button small" data-action="save-var" data-index="${i}">Salvar</button>
        ${i===state.variables.length-1&&i>=2?`<button type="button" class="button small" data-action="remove-var" data-index="${i}" aria-label="Excluir variável ${esc(v.name)}">Excluir</button>`:''}</div>
      </div>`).join('')}</div>
      ${next?`<button type="button" class="button" data-action="add-var">+ Adicionar variável ${next}</button>`:
        '<small class="free-hint">Máximo de seis variáveis (64 linhas).</small>'}
    </section>`;
  }
  function renderFormulas(){
    return `<section class="free-card" aria-labelledby="freeFormulaTitle">
      <div class="free-section-heading"><h2 id="freeFormulaTitle">2. Fórmulas e tradução</h2><span class="free-hint">${state.formulas.length} cadastradas</span></div>
      <p>Use as variáveis acima. A leitura literal respeita os conectivos; quando pertinente, mostramos uma equivalência clássica e a condição de verdade.</p>
      <div class="free-entries">${!state.formulas.length?'<p class="free-empty-formulas">Nenhuma fórmula cadastrada. Use os botões abaixo para criar a primeira.</p>':''}${state.formulas.map(f=>{
        const parsed=parseFreeFormula(state,f.source),d=describeFreeFormula(parsed,state);
        return `<div class="free-formula-card">
          <div class="free-formula-editor"><label>Fórmula <input data-formula-source="${esc(f.id)}" type="text" maxlength="240" spellcheck="false" value="${esc(f.source)}" aria-label="Fórmula ${esc(f.id)}"></label>
            <button type="button" class="button small" data-action="save-formula" data-id="${esc(f.id)}">Atualizar</button>
            <button type="button" class="button small" data-action="remove-formula" data-id="${esc(f.id)}" aria-label="Excluir fórmula ${esc(f.source)}">Excluir</button></div>
          <div class="free-interpretation"><span class="eyebrow">LEITURA EM PORTUGUÊS</span><p class="free-translation">${esc(d.literal)}</p>
          ${d.equivalent?`<p><strong>Forma equivalente:</strong> <code>${esc(d.equivalent)}</code></p>`:''}
          ${d.truth?`<p><strong>Interpretação:</strong> ${esc(d.truth)}</p>`:''}</div>
        </div>`;
      }).join('')}</div>
      <div class="free-formula-new"><label>Adicionar fórmula <input id="freeNewFormula" type="text" maxlength="240" placeholder="Ex.: ¬(p → q)" spellcheck="false"></label>
        <button type="button" class="button primary" data-action="add-formula">+ Adicionar fórmula</button></div>
      <div class="free-keypad" role="group" aria-label="Inserir variáveis e símbolos lógicos">
        ${[...state.variables.map(v=>v.name),'¬','∧','∨','→','↔','⊕','(',')'].map(sym=>`<button class="button small" type="button" data-symbol="${esc(sym)}" aria-label="Inserir ${esc(sym)}">${esc(sym)}</button>`).join('')}
      </div>
      <small class="free-hint">Aceita também !, ~, &, |, →, ->, ↔ e parênteses. Ou (∨) é inclusivo.</small>
    </section>`;
  }
  function cell(row,r,col){
    if(has(col))return '<td class="truth-cell-collapsed" aria-hidden="true"></td>';
    if(col.kind==='var'){
      const value=t(row[col.node.name]);
      return `<td class="given">${value}</td>`;
    }
    const want=t(evaluateFreeRow(row,col));
    const answer=state.answers[key(r,col.key)]||'',graded=state.graded;
    const status=!graded?'':answer===want?' correct':' incorrect';
    return `<td><button type="button" class="cell${answer?' filled':''}${status}" data-action="answer" data-row="${r}" data-key="${esc(col.key)}" aria-label="Linha ${r+1}, ${esc(col.label)}: ${answer||'vazio'}">${answer||'<span class="cell-placeholder">·</span>'}</button>${graded&&answer!==want?`<small class="free-correction" title="Valor esperado">${want}</small>`:''}</td>`;
  }
  function renderTable(){
    const columns=freeColumns(state),rows=freeRows(state),n=columns.length-state.hidden.length;
    const grade=state.graded&&columns.some(col=>col.kind!=='var')?gradeFreeTable(state):null;
    return `<section class="free-card" aria-labelledby="freeTableTitle">
      <div class="free-section-heading"><h2 id="freeTableTitle">3. Preencher a tabela-verdade</h2><span class="free-hint">${rows.length} ${rows.length===1?'linha':'linhas'} · ${n}/${columns.length} colunas expandidas</span></div>
      <p class="free-table-tip">Todas as combinações V/F são geradas automaticamente. Preencha as subexpressões e fórmulas; use o olho do cabeçalho para recolher ou mostrar qualquer coluna.</p>
      <div class="table-scroll free-table-scroll" role="region" tabindex="0" aria-label="Tabela livre, deslize horizontalmente para consultar as colunas">
        <table class="truth-table free-truth-table">
          <thead><tr>${columns.map(header).join('')}</tr></thead>
          <tbody>${rows.map((row,r)=>`<tr>${columns.map(col=>cell(row,r,col)).join('')}</tr>`).join('')}</tbody>
        </table>
      </div>
      ${columns.some(col=>col.kind!=='var')?'<div class="free-table-actions"><button type="button" class="button primary" data-action="grade">Conferir respostas</button></div>':
       '<p class="free-table-tip">Adicione uma fórmula para preencher as colunas derivadas.</p>'}
      ${grade?`<p class="free-grade" role="status"><strong>${grade.correct} de ${grade.total} respostas corretas.</strong> ${grade.missing} ${grade.missing===1?'resposta pendente':'respostas pendentes'}. A correção inclui as colunas recolhidas.</p>`:''}
    </section>`;
  }
  function render(){board.innerHTML=renderVariables()+renderFormulas()+renderTable()}
  function refresh(msg){
    save();render();if(msg)notice(msg);
  }
  function run(action,button){
    if(action==='add-var'){
      const next=nextFreeVariableName(state);
      addFreeVariable(state,next);
      refresh('Variável '+next+' adicionada.');return;
    }
    if(action==='save-var'||action==='remove-var'){
      const i=Number(button.dataset.index),entry=state.variables[i];if(!entry)return;
      if(action==='remove-var')removeFreeVariable(state,entry.name);
      else editFreeVariable(state,entry.name,entry.name,root.querySelector('[data-var-meaning="'+i+'"]').value);
      refresh('Variáveis atualizadas.');return;
    }
    if(action==='add-formula'){
      addFreeFormula(state,root.querySelector('#freeNewFormula').value);refresh('Fórmula adicionada e traduzida.');return;
    }
    if(action==='save-formula'||action==='remove-formula'){
      const id=button.dataset.id;
      if(action==='remove-formula')removeFreeFormula(state,id);
      else editFreeFormula(state,id,root.querySelector('[data-formula-source="'+id+'"]').value);
      refresh('Fórmulas atualizadas.');return;
    }
    if(action==='toggle-col'){
      const id=button.dataset.key;
      state.hidden=state.hidden.includes(id)?state.hidden.filter(k=>k!==id):[...state.hidden,id];
      refresh();root.querySelector('[data-action="toggle-col"][data-key="'+CSS.escape(id)+'"]')?.focus({preventScroll:true});return;
    }
    if(action==='answer'){
      const id=key(button.dataset.row,button.dataset.key),old=state.answers[id]||'';
      const next=old===''?'V':old==='V'?'F':'';
      if(next)state.answers[id]=next;else delete state.answers[id];
      state.graded=false;refresh();root.querySelector('[data-action="answer"][data-row="'+button.dataset.row+'"][data-key="'+CSS.escape(button.dataset.key)+'"]')?.focus({preventScroll:true});return;
    }
    if(action==='grade'){const grade=gradeFreeTable(state);refresh(grade.correct+' de '+grade.total+' respostas corretas.');return}
  }
  root.addEventListener('focusin',e=>{if(e.target.matches('#freeNewFormula,[data-formula-source]'))lastFormulaInput=e.target});
  root.addEventListener('click',e=>{
    const sym=e.target.closest('[data-symbol]');
    if(sym){
      const input=lastFormulaInput?.isConnected?lastFormulaInput:root.querySelector('#freeNewFormula');
      if(!input)return;
      const start=input.selectionStart??input.value.length,end=input.selectionEnd??start;
      input.value=input.value.slice(0,start)+sym.dataset.symbol+input.value.slice(end);
      input.focus();input.setSelectionRange(start+sym.dataset.symbol.length,start+sym.dataset.symbol.length);return;
    }
    const button=e.target.closest('[data-action]');if(!button)return;
    try{run(button.dataset.action,button)}catch(error){notice(error.message,true)}
  });
  root.addEventListener('keydown',e=>{
    if(e.key!=='Enter'||!e.target.matches('#freeNewFormula,[data-formula-source],[data-var-meaning]'))return;
    e.preventDefault();
    const selector=e.target.id==='freeNewFormula'?'[data-action="add-formula"]':
      e.target.matches('[data-formula-source]')?'[data-action="save-formula"][data-id="'+e.target.dataset.formulaSource+'"]':
      '[data-action="save-var"][data-index="'+e.target.dataset.varMeaning+'"]';
    root.querySelector(selector)?.click();
  });
  render();
  return {open(){render();notice('Tabela salva neste navegador.')}};
}
