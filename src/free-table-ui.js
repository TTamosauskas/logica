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
    const grade=state.viewMode==='practice'&&state.graded?gradeFreeTable(state):null;
    return `<section class="free-card" aria-labelledby="freeTableTitle">
      <div class="free-section-heading"><h2 id="freeTableTitle">3. Trabalhar com a tabela</h2><span class="free-hint">${rows.length} ${rows.length===1?'linha':'linhas'} · ${n}/${columns.length} colunas expandidas</span></div>
      <div class="free-setting-row"><fieldset><legend>Linhas da tabela</legend>
        <label><input type="radio" name="freeRows" value="all" ${state.rowMode==='all'?'checked':''}> Todas as combinações</label>
        <label><input type="radio" name="freeRows" value="custom" ${state.rowMode==='custom'?'checked':''}> Meus cenários</label></fieldset>
        <fieldset><legend>Como estudar</legend>
        <label><input type="radio" name="freeMode" value="explore" ${state.viewMode==='explore'?'checked':''}> Explorar (automático)</label>
        <label><input type="radio" name="freeMode" value="practice" ${state.viewMode==='practice'?'checked':''}> Praticar (V/F)</label></fieldset>
      </div>
      <p class="free-table-tip">Use o olho de cada cabeçalho para recolher ou mostrar uma coluna. No modo Explorar o cálculo é automático; em Praticar você responde e confere.</p>
      <div class="table-scroll free-table-scroll" role="region" tabindex="0" aria-label="Tabela livre, deslize horizontalmente para consultar as colunas">
        <table class="truth-table free-truth-table"><thead><tr>${columns.map(header).join('')}${state.rowMode==='custom'?'<th scope="col" class="free-row-action-head">Cenário</th>':''}</tr></thead>
          <tbody>${rows.map((row,r)=>`<tr>${columns.map(col=>cell(row,r,col)).join('')}${state.rowMode==='custom'?`<td><button type="button" class="button small" data-action="remove-row" data-row="${r}" aria-label="Excluir cenário ${r+1}">Excluir</button></td>`:''}</tr>`).join('')}</tbody>
        </table>
      </div>
      <div class="free-table-actions">
        ${state.rowMode==='custom'?`<button type="button" class="button" data-action="add-row" ${rows.length>=MAX_ROWS?'disabled':''}>+ Adicionar cenário</button>`:''}
        ${state.viewMode==='practice'&&columns.some(col=>col.kind!=='var')?'<button type="button" class="button primary" data-action="grade">Conferir respostas</button>':''}
        <button type="button" class="button" data-action="export-csv">Exportar CSV</button>
        <button type="button" class="button" data-action="export-json">Exportar projeto JSON</button>
        <button type="button" class="button" data-action="import-json">Importar projeto JSON</button>
        <input type="file" id="freeImportInput" accept=".json,application/json" hidden>
      </div>
      ${grade?`<p class="free-grade" role="status"><strong>${grade.correct} de ${grade.total} respostas corretas.</strong> ${grade.missing} ${grade.missing===1?'resposta pendente':'respostas pendentes'}. A correção considera também as colunas recolhidas.</p>`:''}
      ${!rows.length?'<p>Adicione um cenário para começar.</p>':''}
    </section>`;
  }
  function render(){board.innerHTML=renderVariables()+renderFormulas()+renderTable()}
  function refresh(msg){
    save();render();if(msg)notice(msg);
  }
  function run(action,button){
    if(action==='add-var'){
      addFreeVariable(state,root.querySelector('#freeNewVar').value,root.querySelector('#freeNewMeaning').value);
      refresh('Variável adicionada.');return;
    }
    if(action==='save-var'||action==='remove-var'){
      const i=Number(button.dataset.index),entry=state.variables[i];if(!entry)return;
      if(action==='remove-var')removeFreeVariable(state,entry.name);
      else editFreeVariable(state,entry.name,root.querySelector('[data-var-name="'+i+'"]').value,root.querySelector('[data-var-meaning="'+i+'"]').value);
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
    if(action==='add-row'){addFreeRow(state);refresh('Novo cenário adicionado.');return}
    if(action==='remove-row'){removeFreeRow(state,Number(button.dataset.row));refresh('Cenário excluído.');return}
    if(action==='grade'){const grade=gradeFreeTable(state);refresh(grade.correct+' de '+grade.total+' respostas corretas.');return}
    if(action==='export-json'){exportFile('logiclab-tabela-livre.json',JSON.stringify(state,null,2),'application/json');return}
    if(action==='export-csv'){
      const cols=freeColumns(state),rows=freeRows(state);
      const quote=value=>'"'+String(value).replace(/"/g,'""')+'"';
      const csv=[cols.map(c=>quote(c.label)).join(';'),...rows.map(row=>cols.map(c=>quote(t(evaluateFreeRow(row,c)))).join(';'))].join('\r\n');
      exportFile('logiclab-tabela-livre.csv','\uFEFF'+csv,'text/csv;charset=utf-8');return;
    }
    if(action==='import-json'){root.querySelector('#freeImportInput').click();return}
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
    if(e.key!=='Enter'||!e.target.matches('#freeNewFormula,#freeNewVar,[data-formula-source],[data-var-meaning],[data-var-name]'))return;
    e.preventDefault();
    const selector=e.target.id==='freeNewFormula'?'[data-action="add-formula"]':
      e.target.id==='freeNewVar'?'[data-action="add-var"]':
      e.target.matches('[data-formula-source]')?'[data-action="save-formula"][data-id="'+e.target.dataset.formulaSource+'"]':
      '[data-action="save-var"][data-index="'+(e.target.dataset.varMeaning??e.target.dataset.varName)+'"]';
    root.querySelector(selector)?.click();
  });
  root.addEventListener('change',async e=>{
    const el=e.target;
    if(el.name==='freeRows'){
      try{setFreeRowMode(state,el.value);refresh('Modo de linhas atualizado.')}catch(error){notice(error.message,true)}return;
    }
    if(el.name==='freeMode'){state.viewMode=el.value==='practice'?'practice':'explore';refresh('Modo de estudo atualizado.');return}
    if(el.matches('[data-row-value]')){
      const [index,name]=el.dataset.rowValue.split('|');
      if(!state.customRows[Number(index)])return;
      state.customRows[Number(index)][name]=el.value==='V';state.graded=false;
      refresh('Cenário atualizado.');return;
    }
    if(el.id==='freeImportInput'){
      const file=el.files?.[0];if(!file)return;
      try{
        if(file.size>262144)throw Error('Arquivo de projeto grande demais (máximo 256 KB).');
        const data=JSON.parse(await file.text());
        if(!data||data.version!==1||!Array.isArray(data.variables)||!Array.isArray(data.formulas))throw Error('Arquivo de Tabela Livre incompatível.');
        if(!confirm('Importar este projeto substituirá a Tabela Livre atual. Continuar?'))return;
        state=readFreeTable(data,{strict:true});refresh('Projeto importado com sucesso.');
      }catch(error){notice('Não foi possível importar: '+error.message,true)}
    }
  });
  render();
  return {open(){render();notice('Tabela salva neste navegador.')}};
}
