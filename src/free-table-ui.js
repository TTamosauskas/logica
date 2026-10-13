/** Interface isolada da Tabela Livre: sem interferir em exercícios ou avaliações. */
import {blankFreeTable,readFreeTable,FREE_TABLE_KEY,MAX_VARS,nextFreeVariableName,
  addFreeVariable,editFreeVariable,removeFreeVariable,addFreeFormula,editFreeFormula,
  removeFreeFormula,freeColumns,freeRows,evaluateFreeRow,gradeFreeTable,
  parseFreeFormula,describeFreeFormula,freeTableKind,MAX_INDIVIDUALS,
  addFreeIndividual,editFreeIndividual,removeFreeIndividual,verifyFreeInference} from './core/free-table.js';
import {escapeHTML} from './core/html.js';
import {t} from './core/logic.js';
import {immediateOperands,propositionalRelations,categoricalForm,categoricalRelation} from './core/table-relations.js';
import {attachTruthHighlights} from './table-highlights.js';
import {renderTruthVenn,renderPredicateVenn} from './truth-venn.js';

const esc=value=>escapeHTML(String(value??''));
const eye=open=>open?
  '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"></path><circle cx="12" cy="12" r="3"></circle>':
  '<path d="M3 3l18 18"></path><path d="M10.5 5.1A11 11 0 0 1 12 5c6.6 0 10 7 10 7a14 14 0 0 1-3.3 4.1"></path><path d="M6.6 6.6C3.6 8.6 2 12 2 12s3.4 7 10 7c1.3 0 2.5-.3 3.6-.7"></path>';
const key=(r,col)=>r+'|'+col;
export function createFreeTable(root){
  let state;
  try{state=readFreeTable(localStorage.getItem(FREE_TABLE_KEY))}catch{state=blankFreeTable()}
  const board=root.querySelector('#freeBoard'),feedback=root.querySelector('#freeFeedback');
  let lastFormulaInput=null,domainOpen=false;
  let truthHighlightController=null;
  let vennSelectedKey='',vennFilters={};
  const notice=(message,error=false)=>{feedback.textContent=message;feedback.dataset.result=error?'error':'ok'};
  function save(){
    try{localStorage.setItem(FREE_TABLE_KEY,JSON.stringify(state));notice('Tabela salva automaticamente neste navegador.')}
    catch{notice('Não foi possível salvar: armazenamento indisponível.',true)}
  }
  const has=col=>state.hidden.includes(col.key);
  const header=(col,index)=>{
    const hidden=has(col),label=esc(col.label),name=hidden?'Mostrar':'Ocultar';
    return `<th scope="col" data-rel-col="${index}" tabindex="0" class="free-column-head ${hidden?'truth-col-collapsed':''} ${col.kind==='var'?'free-var-head':'derived'}">
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
      <p>Os símbolos seguem p, q, r, s, t, u. Identifique quais representam indivíduos (Sócrates) e quais representam propriedades (x é mortal). Não é obrigatório cadastrar um domínio para verificar uma inferência.</p>
      <div class="free-entries">${state.variables.map((v,i)=>`<div class="free-entry">
        <span class="free-variable-symbol" aria-label="Variável ${esc(v.name)}">${esc(v.name)}</span>
        <label>Tipo de ${esc(v.name)} <select data-var-kind="${i}" aria-label="Tipo lógico de ${esc(v.name)}">
          <option value="predicate" ${v.kind!=='individual'?'selected':''}>Proposição / propriedade</option>
          <option value="individual" ${v.kind==='individual'?'selected':''}>Indivíduo</option>
        </select></label>
        <label>Significado de ${esc(v.name)} <input type="text" data-var-meaning="${i}" value="${esc(v.meaning)}" maxlength="160" placeholder="${v.kind==='individual'?'ex.: Sócrates':'ex.: x é mortal'}" aria-label="Significado de ${esc(v.name)}"></label>
        <div class="free-entry-actions"><button type="button" class="button small" data-action="save-var" data-index="${i}">Salvar</button>
        ${i===state.variables.length-1&&i>=2?`<button type="button" class="button small" data-action="remove-var" data-index="${i}" aria-label="Excluir variável ${esc(v.name)}">Excluir</button>`:''}</div>
      </div>`).join('')}</div>
      ${next?`<button type="button" class="button" data-action="add-var">+ Adicionar variável ${next}</button>`:
        '<small class="free-hint">Máximo de seis variáveis (64 linhas).</small>'}
      ${renderDomain()}
    </section>`;
  }
  function renderDomain(){
    const hasMembers=state.domain.length>0;
    return `<details class="free-domain" ${hasMembers||domainOpen?'open':''}>
      <summary>Indivíduos do domínio (opcional, para testar um modelo V/F) <small>${state.domain.length} cadastrados</small></summary>
      <p>Esta área não é necessária para verificar se uma conclusão decorre das premissas. Para experimentar V/F em um modelo concreto, cadastre indivíduos, por exemplo s = Sócrates; cada um ocupará uma linha.</p>
      <div class="free-domain-entries">${state.domain.map(item=>`<div class="free-domain-entry">
        <code>${esc(item.id)}</code><label>Nome de ${esc(item.id)} <input type="text" data-ind-label="${esc(item.id)}" maxlength="80" value="${esc(item.label)}"></label>
        <button class="button small" type="button" data-action="save-ind" data-id="${esc(item.id)}">Salvar</button>
        <button class="button small" type="button" data-action="remove-ind" data-id="${esc(item.id)}" aria-label="Excluir indivíduo ${esc(item.label)}">Excluir</button>
      </div>`).join('')}</div>
      <div class="free-domain-add">
        <label>Símbolo <input id="freeNewIndividualId" maxlength="24" placeholder="s" spellcheck="false"></label>
        <label>Nome <input id="freeNewIndividualLabel" maxlength="80" placeholder="Sócrates"></label>
        <button type="button" class="button" data-action="add-ind" ${state.domain.length>=MAX_INDIVIDUALS?'disabled':''}>+ Adicionar indivíduo</button>
      </div>
      <small class="free-hint">O símbolo x é reservado aos quantificadores. Cadastre ao menos um indivíduo para avaliar o domínio.</small>
    </details>`;
  }
  function renderFormulas(){
    return `<section class="free-card" aria-labelledby="freeFormulaTitle">
      <div class="free-section-heading"><h2 id="freeFormulaTitle">2. Fórmulas e tradução</h2><span class="free-hint">${state.formulas.length} cadastradas</span></div>
      <p>Cadastre uma ou mais fórmulas como premissas. Exemplo: q(p) e ∀x(q(x) → r(x)), com p = Sócrates, q = homem e r = mortal. Para verificar se r(p) decorre delas, use a seção de inferência abaixo. Não é necessário listar indivíduos.</p>
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
        ${[...state.variables.map(v=>v.name),'¬','∧','∨','→','↔','⊕','∀','∃','(',')'].map(sym=>`<button class="button small ${state.variables.some(v=>v.name===sym)?'free-key-variable':''}" type="button" data-symbol="${esc(sym)}" aria-label="Inserir ${esc(sym)}">${esc(sym)}</button>`).join('')}
      </div>
      <small class="free-hint">Para predicados, use p(x), p(s), ∀x(p(x) → q(x)) e ∃x(p(x) ∧ q(x)). Nenhum equivale a ¬∃.</small>
    </section>`;
  }
  function truthButton(r,col,global=false){
    const id=(global?'global':r)+'|'+col.key,answer=state.answers[id]||'',graded=state.graded;
    const want=graded?(evaluateFreeRow(global?null:freeRows(state)[r],col,state)?'V':'F'):'';
    const status=!graded?'':answer===want?' correct':' incorrect';
    return `<button type="button" class="cell${answer?' filled':''}${status}" data-action="answer" data-row="${global?'global':r}" data-key="${esc(col.key)}" aria-label="${global?'Resultado no domínio':'Linha '+(r+1)}, ${esc(col.label)}: ${answer||'vazio'}">${answer||'<span class="cell-placeholder">·</span>'}</button>${graded&&answer!==want?`<small class="free-correction" title="Valor esperado">${want}</small>`:''}`;
  }
  function cell(row,r,col){
    if(has(col))return '<td class="truth-cell-collapsed" aria-hidden="true"></td>';
    if(freeTableKind(state)==='predicates'){
      if(col.kind==='var'){
        const id=row.id+'|'+col.name,value=state.predicateValues[id]||'';
        return `<td><button type="button" class="cell${value?' filled':''} free-input-pred" data-action="predicate-value" data-ind="${esc(row.id)}" data-name="${esc(col.name)}" aria-label="${esc(row.label)}: ${esc(col.label)} é ${value||'indefinido'}">${value||'<span class="cell-placeholder">·</span>'}</button></td>`;
      }
      return col.global?'<td class="free-global-placeholder" aria-label="Resultado no domínio">—</td>':
        '<td>'+truthButton(r,col)+'</td>';
    }
    if(col.kind==='var')return `<td class="given">${t(row[col.node.name])}</td>`;
    return '<td>'+truthButton(r,col)+'</td>';
  }
  function globalCell(col){
    if(has(col))return '<td class="truth-cell-collapsed" aria-hidden="true"></td>';
    if(col.global)return '<td>'+truthButton(0,col,true)+'</td>';
    return '<td class="free-global-placeholder" aria-hidden="true">—</td>';
  }
  function renderInference(){
    if(freeTableKind(state)!=='predicates')return '';
    const result=state.inferenceReport;
    return `<section class="free-card free-inference" aria-labelledby="freeInferenceTitle">
      <div class="free-section-heading"><h2 id="freeInferenceTitle">3. Verificar uma inferência</h2>
        <span class="free-hint">Sem domínio cadastrado</span></div>
      <p>As fórmulas acima são as premissas. Informe a conclusão e verifique se ela decorre necessariamente das premissas. Esta análise considera todos os modelos possíveis, sem cadastrar pessoas ou atribuir V/F manualmente.</p>
      <div class="free-formula-new"><label>Conclusão <input type="text" id="freeConclusion" maxlength="240"
        value="${esc(state.inferenceConclusion||'')}" placeholder="ex.: r(p)" spellcheck="false"></label>
        <button class="button primary" type="button" data-action="verify-inference">Verificar inferência</button></div>
      ${result?`<div class="free-inference-result" role="status">
        <strong>${result.valid?(result.satisfiable?'Conclusão válida.':'Premissas incompatíveis.'):'Conclusão não decorre das premissas.'}</strong>
        <p>${esc(result.explanation)}</p>
        ${result.counterexample?`<p><strong>Contraexemplo:</strong> ${esc(result.counterexample.types.join(' · '))}
          ${result.counterexample.individuals.length?' | '+esc(result.counterexample.individuals.join(' · ')):''}</p>`:''}
        <small>${esc(result.checked)} modelos examinados. Fragmento suportado: até três propriedades e dois indivíduos nomeados.</small>
      </div>`:''}
    </section>`;
  }
  function renderTable(){
    const pred=freeTableKind(state)==='predicates',columns=freeColumns(state),rows=freeRows(state);
    if(pred&&!rows.length)return `<section class="free-card" aria-labelledby="freeTableTitle">
      <h2 id="freeTableTitle">4. Tabela de modelos (opcional)</h2>
      <p>Para verificar se uma conclusão decorre de premissas, use a seção acima: não são necessários indivíduos.
      Cadastre pessoas no campo “Indivíduos do domínio” somente se quiser experimentar valores V/F em um modelo concreto.</p>
    </section>`;
    const n=columns.length-state.hidden.length,hasGlobal=pred&&columns.some(col=>col.global);
    let grade=null;
    if(state.graded&&columns.some(col=>col.kind!=='var')){
      try{grade=gradeFreeTable(state)}catch{state.graded=false}
    }
    const diagram=pred?
      renderPredicateVenn({id:'free',variables:columns.filter(col=>col.kind==='var').map(col=>col.name),
        people:rows,predicateValues:state.predicateValues,filters:vennFilters}):
      renderTruthVenn({id:'free',variables:state.variables.map(item=>item.name),rows,
        columns:columns.map(col=>({...col,derived:col.kind!=='var'})),
        selectedKey:vennSelectedKey,filters:vennFilters,
        getAnswer:(row,col)=>col.kind==='var'?(rows[row][col.node.name]?'V':'F'):
          (state.answers[row+'|'+col.key]||''),
        getExpected:(row,col)=>evaluateFreeRow(rows[row],col,state)?'V':'F',
        checked:state.graded});
    return `<section class="free-card" aria-labelledby="freeTableTitle">
      <div class="free-section-heading"><h2 id="freeTableTitle">3. Preencher a tabela-verdade</h2><span class="free-hint">${rows.length} ${pred?'indivíduos':'combinações V/F'} · ${n}/${columns.length} colunas expandidas</span></div>
      <p class="free-table-tip">${pred?'Preencha V/F dos predicados para cada indivíduo. Depois resolva as expressões. Cada quantificador tem um único resultado para o domínio, na última linha.':'Todas as combinações V/F são geradas automaticamente. Preencha as subexpressões e fórmulas.'} Use o olho de cada cabeçalho para recolher ou mostrar colunas. Passe sobre um cabeçalho (ou toque nele) para ver relações entre colunas completamente corretas, mesmo antes de conferir.</p>
      <div class="table-scroll free-table-scroll" role="region" tabindex="0" aria-label="Tabela Livre ${pred?'de predicados':'proposicional'}">
        <table class="truth-table free-truth-table">
          <thead><tr>${pred?'<th scope="col" class="free-individual-head">Indivíduo</th>':''}${columns.map(header).join('')}</tr></thead>
          <tbody>${rows.length?rows.map((row,r)=>`<tr>${pred?`<th scope="row" class="free-person-cell"><span>${esc(row.label)}</span><code>${esc(row.id)}</code></th>`:''}${columns.map(col=>cell(row,r,col)).join('')}</tr>`).join(''):
            `<tr><td colspan="${columns.length+1}" class="free-no-people">Cadastre um indivíduo acima para preencher os predicados.</td></tr>`}
          ${hasGlobal?`<tr class="free-aggregate-row"><th scope="row">No domínio</th>${columns.map(col=>globalCell(col)).join('')}</tr>`:''}</tbody>
        </table>
      </div>
      ${diagram}
      ${columns.some(col=>col.kind!=='var')?'<div class="free-table-actions"><button type="button" class="button primary" data-action="grade">Conferir respostas</button></div>':
       '<p class="free-table-tip">Adicione uma fórmula para preencher as colunas derivadas.</p>'}
      ${grade?`<p class="free-grade" role="status"><strong>${grade.correct} de ${grade.total} respostas corretas.</strong> ${grade.missing} ${grade.missing===1?'resposta pendente':'respostas pendentes'}. A correção inclui as colunas recolhidas.</p>`:''}
    </section>`;
  }
  function freeHighlightRelations(columns){
    // Identifique relações assim que as colunas estiverem integralmente corretas.
    // A correção explícita serve para fornecer o relatório, não para liberar o hover.
    const rows=freeRows(state),pred=freeTableKind(state)==='predicates';
    const correct=index=>{
      const col=columns[index];
      if(!pred&&col.kind==='var')return true;
      if(pred&&col.kind==='var')return rows.length>0&&rows.every(row=>
        ['V','F'].includes(state.predicateValues[row.id+'|'+col.name]));
      const target=pred&&col.global?[null]:rows;
      return target.length>0&&target.every((row,r)=>{
        const key=(row===null?'global':r)+'|'+col.key;
        try{return state.answers[key]===(evaluateFreeRow(row,col,state)?'V':'F')}catch{return false}
      });
    };
    if(!pred)return propositionalRelations(columns,state.variables.map(x=>x.name),correct)
      .filter(rel=>columns[rel.a].kind!=='var'||columns[rel.b].kind!=='var');
    // Equivalência de valores em um único domínio não demonstra equivalência lógica.
    // As formas categóricas, ao contrário, possuem relações demonstráveis por sua sintaxe.
    const result=[];
    for(let a=0;a<columns.length;a++)for(let b=a+1;b<columns.length;b++){
      if(!correct(a)||!correct(b))continue;
      const first=categoricalForm(columns[a].node),second=categoricalForm(columns[b].node);
      if(!first||!second)continue;
      const subjectNonempty=state.domain.some(person=>state.predicateValues[person.id+'|'+first.a]==='V');
      const rel=categoricalRelation(first,second,{subjectNonempty});
      if(rel)result.push({a,b,...rel});
    }
    return result;
  }
  function render(){
    truthHighlightController?.destroy();
    truthHighlightController=null;
    board.innerHTML=renderVariables()+renderFormulas()+renderInference()+renderTable();
    const table=board.querySelector('.free-truth-table');
    if(!table)return;
    const columns=freeColumns(state);
    truthHighlightController=attachTruthHighlights(table,{columns,operands:index=>immediateOperands(columns,index),
      relations:freeHighlightRelations(columns)});
  }
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
      else editFreeVariable(state,entry.name,entry.name,root.querySelector('[data-var-meaning="'+i+'"]').value,
        root.querySelector('[data-var-kind="'+i+'"]').value);
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
    if(action==='add-ind'){
      domainOpen=true;
      addFreeIndividual(state,root.querySelector('#freeNewIndividualId').value,root.querySelector('#freeNewIndividualLabel').value);
      refresh('Indivíduo cadastrado.');return;
    }
    if(action==='save-ind'||action==='remove-ind'){
      domainOpen=true;
      const id=button.dataset.id;
      if(action==='remove-ind')removeFreeIndividual(state,id);
      else editFreeIndividual(state,id,root.querySelector('[data-ind-label="'+CSS.escape(id)+'"]').value);
      refresh('Domínio atualizado.');return;
    }
    if(action==='predicate-value'){
      const id=button.dataset.ind+'|'+button.dataset.name,old=state.predicateValues[id]||'';
      const next=old===''?'V':old==='V'?'F':'';
      if(next)state.predicateValues[id]=next;else delete state.predicateValues[id];
      state.graded=false;refresh();
      root.querySelector('[data-action="predicate-value"][data-ind="'+CSS.escape(button.dataset.ind)+'"][data-name="'+CSS.escape(button.dataset.name)+'"]')?.focus({preventScroll:true});return;
    }
    if(action==='verify-inference'){
      const source=root.querySelector('#freeConclusion').value;
      const report=verifyFreeInference(state,source);
      refresh(report.valid?'Inferência examinada.':'Contraexemplo encontrado.');
      return;
    }
    if(action==='grade'){const grade=gradeFreeTable(state);refresh(grade.correct+' de '+grade.total+' respostas corretas.');return}
  }
  root.addEventListener('change',e=>{
    if(e.target.matches('[data-venn-column]'))vennSelectedKey=e.target.value;
    else if(e.target.matches('[data-venn-filter]'))
      vennFilters={...vennFilters,[e.target.dataset.vennFilter]:e.target.value};
    else return;
    render();
  });
  root.addEventListener('focusin',e=>{if(e.target.matches('#freeNewFormula,#freeConclusion,[data-formula-source]'))lastFormulaInput=e.target});
  root.addEventListener('click',e=>{
    const sym=e.target.closest('[data-symbol]');
    if(sym){
      const input=lastFormulaInput?.isConnected?lastFormulaInput:root.querySelector('#freeNewFormula');
      if(!input)return;
      const start=input.selectionStart??input.value.length,end=input.selectionEnd??start;
      const predicateInput=freeTableKind(state)==='predicates'||input.value.includes('∀')||input.value.includes('∃');
      const insert=sym.dataset.symbol==='∀'||sym.dataset.symbol==='∃'?sym.dataset.symbol+'x(':
        (predicateInput&&state.variables.some(v=>v.name===sym.dataset.symbol&&v.kind!=='individual')?sym.dataset.symbol+'(x)':sym.dataset.symbol);
      input.value=input.value.slice(0,start)+insert+input.value.slice(end);
      input.focus();input.setSelectionRange(start+insert.length,start+insert.length);return;
    }
    const button=e.target.closest('[data-action]');if(!button)return;
    try{run(button.dataset.action,button)}catch(error){notice(error.message,true)}
  });
  root.addEventListener('keydown',e=>{
    if(e.key!=='Enter'||!e.target.matches('#freeConclusion,#freeNewFormula,[data-formula-source],[data-var-meaning],#freeNewIndividualId,#freeNewIndividualLabel,[data-ind-label]'))return;
    e.preventDefault();
    const selector=e.target.id==='freeConclusion'?'[data-action="verify-inference"]':
      e.target.id==='freeNewIndividualId'||e.target.id==='freeNewIndividualLabel'?'[data-action="add-ind"]':
      e.target.matches('[data-ind-label]')?'[data-action="save-ind"][data-id="'+e.target.dataset.indLabel+'"]':
      e.target.id==='freeNewFormula'?'[data-action="add-formula"]':
      e.target.matches('[data-formula-source]')?'[data-action="save-formula"][data-id="'+e.target.dataset.formulaSource+'"]':
      '[data-action="save-var"][data-index="'+e.target.dataset.varMeaning+'"]';
    root.querySelector(selector)?.click();
  });
  render();
  return {open(){render();notice('Tabela salva neste navegador.')}};
}
