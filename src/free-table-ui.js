/** Interface isolada da Tabela Livre: sem interferir em exercícios ou avaliações. */
import {blankFreeTable,readFreeTable,FREE_TABLE_KEY,MAX_VARS,nextFreeVariableName,
  addFreeVariable,editFreeVariable,removeFreeVariable,addFreeFormula,editFreeFormula,
  removeFreeFormula,freeColumns,freeRows,evaluateFreeRow,gradeFreeTable,
  parseFreeFormula,describeFreeFormula,freeTableKind,freeArgumentAnalysis,
  predicateTruthAnalysis,freeRowImpossible,
  verifyFreeInference,analyzeFreePossibilities} from './core/free-table.js';
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
const SYMBOL_HELP=Object.freeze({
  '¬':'Negação: não p; inverte o valor lógico.',
  '∧':'Conjunção (E): verdadeira somente se as duas partes forem verdadeiras.',
  '∨':'Disjunção inclusiva (OU): verdadeira se ao menos uma parte for verdadeira, inclusive ambas.',
  '→':'Condicional (SE... ENTÃO): falsa somente quando o antecedente é V e o consequente é F.',
  '↔':'Bicondicional (SE, E SOMENTE SE): verdadeira quando ambos os valores coincidem.',
  '⊕':'OU exclusivo: verdadeira quando exatamente uma das partes é verdadeira.',
  '∀':'Quantificador universal: para todo indivíduo x do domínio.',
  '∃':'Quantificador existencial: existe pelo menos um indivíduo x.',
  '∃!':'Quantificador de unicidade: existe exatamente um indivíduo x.',
  '⊤':'Constante verdadeira: sempre V em qualquer interpretação.',
  '⊥':'Constante falsa ou absurdo: sempre F em qualquer interpretação.',
  '(':'Abre parênteses: começa uma subexpressão.',
  ')':'Fecha parênteses: termina uma subexpressão.'
});
const SYMBOL_HELP_DEFAULT='Passe o mouse, use Tab ou toque em um símbolo para ver seu significado.';
export function createFreeTable(root){
  let state,recovery=null;
  try{
    const stored=localStorage.getItem(FREE_TABLE_KEY);
    try{state=readFreeTable(stored,{strict:true})}
    catch(error){state=blankFreeTable();recovery={raw:stored||'',reason:error.message}}
  }catch{state=blankFreeTable()}
  const board=root.querySelector('#freeBoard'),feedback=root.querySelector('#freeFeedback');
  let lastFormulaInput=null;
  let truthHighlightController=null;
  let vennSelectedKey='',vennFilters={};
  const notice=(message,error=false)=>{feedback.textContent=message;feedback.dataset.result=error?'error':'ok'};
  function save(){
    if(recovery){notice('O rascunho original está protegido. Exporte os dados antes de reiniciar.',true);return}
    try{
      localStorage.setItem(FREE_TABLE_KEY,JSON.stringify(state));
      notice(board.querySelector('[data-unsaved="true"]')?
        'Dados anteriores salvos. Há textos em edição que ainda exigem Salvar ou Atualizar.':
        'Tabela salva automaticamente neste navegador.');
    }
    catch{notice('Não foi possível salvar: armazenamento indisponível.',true)}
  }
  const has=col=>state.hidden.includes(col.key);
  const header=(col,index)=>{
    const hidden=has(col),conclusion=state.formulas.length>=2&&
      (col.key==='v:'+state.formulas.at(-1).id||col.key==='f:'+state.formulas.at(-1).id);
    const label=esc((conclusion?'∴ ':'')+col.label),name=hidden?'Mostrar':'Ocultar';
    return `<th scope="col" data-rel-col="${index}" tabindex="0" class="free-column-head ${hidden?'truth-col-collapsed':''} ${col.kind==='var'?'free-var-head':'derived'} ${conclusion?'free-conclusion-head':''}">
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
    </section>`;
  }
  function renderFormulas(){
    return `<section class="free-card" aria-labelledby="freeFormulaTitle">
      <div class="free-section-heading"><h2 id="freeFormulaTitle">2. Fórmulas e tradução</h2><span class="free-hint">${state.formulas.length} cadastradas</span></div>
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
        ${[...state.variables.map(v=>v.name),'¬','∧','∨','→','↔','⊕','∀','∃','∃!','⊤','⊥','(',')'].map(sym=>{
          const variable=state.variables.find(v=>v.name===sym);
          const help=variable?
            (variable.kind==='individual'?'Indivíduo':'Proposição ou propriedade')+
              ' '+sym+': '+(variable.meaning||'significado ainda não informado'):
            SYMBOL_HELP[sym];
          return `<button class="button small ${variable?'free-key-variable':''}" type="button"
            data-symbol="${esc(sym)}" data-help="${esc(help)}" title="${esc(help)}"
            aria-label="Inserir ${esc(sym)} — ${esc(help)}"
            aria-describedby="freeSymbolHelp">${esc(sym)}</button>`;
        }).join('')}
      </div>
      <p class="free-symbol-help" id="freeSymbolHelp" role="status" aria-live="polite">${SYMBOL_HELP_DEFAULT}</p>
    </section>`;
  }
  function truthButton(r,col){
    const id=r+'|'+col.key,answer=state.answers[id]||'',graded=state.graded;
    const want=graded?(evaluateFreeRow(freeRows(state)[r],col,state)?'V':'F'):'';
    const status=!graded?'':answer===want?' correct':' incorrect';
    return `<button type="button" class="cell${answer?' filled':''}${status}" data-action="answer" data-row="${r}" data-key="${esc(col.key)}" aria-label="Linha ${r+1}, ${esc(col.label)}: ${answer||'vazio'}">${answer||'<span class="cell-placeholder">·</span>'}</button>${graded&&answer!==want?`<small class="free-correction" title="Valor esperado">${want}</small>`:''}`;
  }
  function cell(row,r,col,ordinal=null,lastVisible=''){
    if(has(col))return '<td class="truth-cell-collapsed" aria-hidden="true"></td>';
    if(ordinal!==null){
      const marker=col.key===lastVisible?
        '<button type="button" class="free-impossible-marker" data-action="show-impossible" data-ordinal="'+ordinal+
        '" aria-controls="free-impossible-note-'+ordinal+'" aria-label="Ver justificativa da linha impossível '+ordinal+'" title="Linha impossível: ver justificativa">🚫<sup>'+ordinal+'</sup></button>':'';
      if(col.kind==='var')return '<td class="given free-impossible-given">'+t(row[col.name])+marker+'</td>';
      return '<td class="free-impossible-cell" aria-label="Impossível, não editável">'+
        (marker||'<span aria-hidden="true">—</span>')+'</td>';
    }
    if(col.kind==='var')return '<td class="given">'+t(row[col.node.name])+'</td>';
    return '<td>'+truthButton(r,col)+'</td>';
  }
  function renderTable(){
    const pred=freeTableKind(state)==='predicates';
    const report=pred?predicateTruthAnalysis(state):null;
    const columns=freeColumns(state),rows=freeRows(state);
    let grade=null;
    if(state.graded&&columns.some(col=>col.kind!=='var')){
      try{grade=gradeFreeTable(state)}catch{state.graded=false}
    }
    const argument=grade?freeArgumentAnalysis(state):null;
    const variables=pred?report.labels:state.variables.map(item=>item.name);
    const meanings=pred?Object.fromEntries(report.labels.map((name,i)=>[name,report.expressions[i]])):
      Object.fromEntries(state.variables.map(item=>[item.name,item.meaning||'']));
    const impossibleRows=pred&&report.status==='complete'?
      report.rows.flatMap((item,i)=>item.possible?[]:[i]):[];
    const impossibleOrdinals=new Map(impossibleRows.map((index,i)=>[index,i+1]));
    const lastVisible=columns.findLast(col=>!has(col))?.key||'';
    const naturalList=parts=>parts.length<2?parts[0]||'':
      parts.slice(0,-1).join(', ')+' e '+parts.at(-1);
    const impossibleStatement=row=>{
      const trueParts=[],falseParts=[];
      row.values.forEach((value,i)=>{
        const markup='<code>'+esc(report.expressions[i])+'</code>';
        (value==='V'?trueParts:falseParts).push(markup);
      });
      const positive=trueParts.length?naturalList(trueParts)+' '+
        (trueParts.length===1?'é verdadeira':'são verdadeiras'):'';
      const negative=falseParts.length?naturalList(falseParts)+' '+
        (falseParts.length===1?'é falsa':'são falsas'):'';
      return positive&&negative?positive+', mas '+negative:positive||negative;
    };
    const diagram=columns.some(col=>col.kind!=='var')?renderTruthVenn({
      id:'free',variables,variableMeanings:meanings,rows,
      columns:columns.map(col=>({...col,derived:col.kind!=='var'})),
      selectedKey:vennSelectedKey,filters:vennFilters,impossibleRows,
      getAnswer:(i,col)=>col.kind==='var'?(rows[i][col.name]?'V':'F'):
        (state.answers[i+'|'+col.key]||''),
      getExpected:(i,col)=>evaluateFreeRow(rows[i],col,state)?'V':'F',
      checked:state.graded
    }):'';
    const impossible=pred&&report.status==='complete'?report.rows.flatMap((item,i)=>
      item.possible?[]:[{ordinal:impossibleOrdinals.get(i),statement:impossibleStatement(item),
        why:item.explanation}]):[];
    const footer=pred?'<footer class="free-impossibility-footer" aria-label="Justificativas das linhas impossíveis">'+
      (report.status==='undetermined'?
        '<p role="status"><strong>Não determinado:</strong> '+esc(report.reason)+
        '. Nenhuma linha foi bloqueada sem comprovação.</p>':
        report.status==='empty'?'<p>Adicione uma fórmula fechada para construir a tabela-verdade.</p>':
        impossible.length?'<h3>Linhas impossíveis — justificativas</h3><ol>'+
          impossible.map(item=>'<li id="free-impossible-note-'+item.ordinal+'" tabindex="-1"><strong>Linha 🚫<sup>'+
            item.ordinal+'</sup> é impossível porque '+item.statement+'.</strong> '+esc(item.why)+'</li>').join('')+
          '</ol>':'<p>Nenhuma combinação foi demonstrada impossível.</p>')+
      (report.truncated?'<p><strong>Limite:</strong> projeto antigo com mais de seis fórmulas. A tabela considera apenas as seis primeiras.</p>':'')+
      '</footer>':'';
    return `<section class="free-card" aria-labelledby="freeTableTitle">
      <div class="free-section-heading"><h2 id="freeTableTitle">3. Preencher a tabela-verdade</h2></div>
      <div class="table-scroll free-table-scroll" role="region" tabindex="0" aria-label="Tabela Livre de ${pred?'predicados e quantificadores':'proposições'}">
        <table class="truth-table free-truth-table">
          <thead><tr>${columns.map(header).join('')}</tr></thead>
          <tbody>${rows.map((row,r)=>`<tr ${impossibleOrdinals.has(r)?'class="free-impossible-row" aria-label="Linha impossível '+impossibleOrdinals.get(r)+'"':''}>
            ${columns.map(col=>cell(row,r,col,impossibleOrdinals.get(r)??null,lastVisible)).join('')}</tr>`).join('')}
            ${!rows.length?'<tr><td class="free-no-people" colspan="'+Math.max(1,columns.length)+'">Cadastre uma fórmula para iniciar.</td></tr>':''}
          </tbody>
        </table>
      </div>
      ${columns.some(col=>col.kind!=='var')?'<div class="free-table-actions"><button type="button" class="button primary" data-action="grade">Conferir respostas</button></div>':
        '<p class="free-table-tip">Adicione uma fórmula para preencher as colunas derivadas.</p>'}
      ${footer}
      ${diagram}
      ${grade?`<p class="free-grade" role="status"><strong>${grade.correct} de ${grade.total} respostas corretas.</strong> ${grade.missing} ${grade.missing===1?'resposta pendente':'respostas pendentes'}. A correção ignora linhas impossíveis e inclui colunas recolhidas.</p>`:''}
      ${argument?`<div class="free-argument-explanation" role="note" aria-label="Justificativa da inferência">
        <h3>∵ Justificativa da inferência</h3>
        <p>${esc(argument.reason)}</p>
        <small>A validade é avaliada pelas fórmulas, independentemente das respostas preenchidas.</small>
      </div>`:''}
    </section>`;
  }
  function freeHighlightRelations(columns){
    if(freeTableKind(state)==='predicates')return [];
    const rows=freeRows(state);
    const correct=index=>{
      const col=columns[index];
      if(col.kind==='var')return true;
      return rows.every((row,r)=>state.answers[r+'|'+col.key]===
        (evaluateFreeRow(row,col,state)?'V':'F'));
    };
    return propositionalRelations(columns,state.variables.map(item=>item.name),correct)
      .filter(rel=>columns[rel.a].kind!=='var'||columns[rel.b].kind!=='var');
  }
  const editableSelector='[data-var-meaning],[data-var-kind],[data-formula-source],#freeNewFormula';
  const draftKey=element=>element.id?'id:'+element.id:
    ['data-var-meaning','data-var-kind','data-formula-source']
      .map(name=>element.hasAttribute(name)?name+':'+element.getAttribute(name):'')
      .find(Boolean)||'';
  function render({resetNewFormula=false}={}){
    const oldScroll=board.querySelector('.free-table-scroll');
    const scroll=oldScroll?{left:oldScroll.scrollLeft,top:oldScroll.scrollTop}:null;
    const active=document.activeElement,focusKey=board.contains(active)?draftKey(active):'';
    const focusSelection=active?.matches?.('input')?{
      start:active.selectionStart,end:active.selectionEnd}:null;
    const drafts=new Map([...board.querySelectorAll(editableSelector)]
      .filter(el=>el.dataset.unsaved==='true')
      .map(el=>[draftKey(el),el.value]));
    if(resetNewFormula)drafts.delete('id:freeNewFormula');
    truthHighlightController?.destroy();
    truthHighlightController=null;
    if(recovery){
      board.innerHTML='<section class="free-card free-recovery" role="alert"><h2>Rascunho protegido</h2>'+
        '<p>Os dados salvos da Tabela Livre não puderam ser interpretados: '+esc(recovery.reason)+
        '</p><p>Nenhum dado original foi substituído. Baixe uma cópia do conteúdo antes de optar por reiniciar.</p>'+
        '<div class="free-entry-actions"><button type="button" class="button primary" data-action="download-recovery">Baixar rascunho original</button>'+
        '<button type="button" class="button" data-action="reset-recovery">Reiniciar Tabela Livre</button></div></section>';
      return;
    }
    board.innerHTML=renderVariables()+renderFormulas()+renderTable();
    for(const control of board.querySelectorAll(editableSelector)){
      const key=draftKey(control);
      if(drafts.has(key)){control.value=drafts.get(key);control.dataset.unsaved='true'}
      if(focusKey===key){control.focus({preventScroll:true});
        if(focusSelection&&control.matches('input')&&focusSelection.start!==null)
          control.setSelectionRange(focusSelection.start,focusSelection.end)}
    }
    const newScroll=board.querySelector('.free-table-scroll');
    if(scroll&&newScroll){newScroll.scrollLeft=scroll.left;newScroll.scrollTop=scroll.top}
    const table=board.querySelector('.free-truth-table');
    if(!table)return;
    const columns=freeColumns(state);
    truthHighlightController=attachTruthHighlights(table,{columns,operands:index=>immediateOperands(columns,index),
      relations:freeHighlightRelations(columns)});
    // A legenda dinâmica dos destaques fica depois de "Conferir respostas",
    // preservando o botão imediatamente abaixo da tabela.
    const relationLegend=board.querySelector('.truth-relation-status');
    const gradeActions=board.querySelector('.free-table-actions');
    if(relationLegend&&gradeActions)gradeActions.after(relationLegend);
  }
  function refresh(msg,options={}){
    save();render(options);
    if(msg)notice(msg+(board.querySelector('[data-unsaved="true"]')?
      ' Existem textos em edição ainda não salvos.':''));
  }
  function run(action,button){
    if(action==='download-recovery'&&recovery){
      const blob=new Blob([recovery.raw],{type:'application/json;charset=utf-8'});
      const url=URL.createObjectURL(blob),link=document.createElement('a');
      link.href=url;link.download='logiclab-tabela-livre-recuperacao.json';
      document.body.append(link);link.click();link.remove();
      setTimeout(()=>URL.revokeObjectURL(url),1500);
      notice('Cópia dos dados originais exportada.');return;
    }
    if(action==='reset-recovery'&&recovery){
      if(!confirm('Reiniciar apagará o rascunho salvo da Tabela Livre. Você já fez o download de recuperação?'))return;
      recovery=null;state=blankFreeTable();
      refresh('Tabela Livre reiniciada.');return;
    }
    if(recovery)return;
    if(action==='add-var'){
      const next=nextFreeVariableName(state);
      addFreeVariable(state,next);
      refresh('Variável '+next+' adicionada.');return;
    }
    if(action==='save-var'||action==='remove-var'){
      const i=Number(button.dataset.index),entry=state.variables[i];if(!entry)return;
      if(action==='remove-var')removeFreeVariable(state,entry.name);
      else{
        const meaning=root.querySelector('[data-var-meaning="'+i+'"]'),kind=root.querySelector('[data-var-kind="'+i+'"]');
        editFreeVariable(state,entry.name,entry.name,meaning.value,kind.value);
        delete meaning.dataset.unsaved;delete kind.dataset.unsaved;
      }
      refresh('Variáveis atualizadas.');return;
    }
    if(action==='add-formula'){
      const before=new Set(state.variables.filter(v=>v.kind==='individual').map(v=>v.name));
      addFreeFormula(state,root.querySelector('#freeNewFormula').value);
      const detected=state.variables.filter(v=>v.kind==='individual'&&!before.has(v.name)).map(v=>v.name);
      refresh(detected.length?'Fórmula adicionada. '+detected.join(', ')+' reconhecido(s) automaticamente como indivíduo(s).':
        'Fórmula adicionada e traduzida.',{resetNewFormula:true});return;
    }
    if(action==='save-formula'||action==='remove-formula'){
      const id=button.dataset.id;
      if(action==='remove-formula')removeFreeFormula(state,id);
      else{
        const input=root.querySelector('[data-formula-source="'+id+'"]');
        editFreeFormula(state,id,input.value);
        delete input.dataset.unsaved;
      }
      refresh('Fórmulas atualizadas.');return;
    }
    if(action==='show-impossible'){
      const note=board.querySelector('#free-impossible-note-'+Number(button.dataset.ordinal));
      if(note){note.scrollIntoView({block:'nearest'});note.focus({preventScroll:true})}
      return;
    }
    if(action==='toggle-col'){
      const id=button.dataset.key;
      state.hidden=state.hidden.includes(id)?state.hidden.filter(k=>k!==id):[...state.hidden,id];
      refresh();root.querySelector('[data-action="toggle-col"][data-key="'+CSS.escape(id)+'"]')?.focus({preventScroll:true});return;
    }
    if(action==='answer'){
      if(freeRowImpossible(state,Number(button.dataset.row)))return;
      const id=key(button.dataset.row,button.dataset.key),old=state.answers[id]||'';
      const next=old===''?'V':old==='V'?'F':'';
      if(next)state.answers[id]=next;else delete state.answers[id];
      state.graded=false;refresh();root.querySelector('[data-action="answer"][data-row="'+button.dataset.row+'"][data-key="'+CSS.escape(button.dataset.key)+'"]')?.focus({preventScroll:true});return;
    }
    if(action==='predicate-value'){
      const id=button.dataset.ind+'|'+button.dataset.name,old=state.predicateValues[id]||'';
      const next=old===''?'V':old==='V'?'F':'';
      if(next)state.predicateValues[id]=next;else delete state.predicateValues[id];
      state.graded=false;refresh();
      root.querySelector('[data-action="predicate-value"][data-ind="'+CSS.escape(button.dataset.ind)+'"][data-name="'+CSS.escape(button.dataset.name)+'"]')?.focus({preventScroll:true});return;
    }
    if(action==='grade'){const grade=gradeFreeTable(state);refresh(grade.correct+' de '+grade.total+' respostas corretas.');return}
  }
  root.addEventListener('input',e=>{
    if(e.target.matches(editableSelector)){
      e.target.dataset.unsaved='true';
      notice('Campo em edição: use Salvar ou Atualizar antes de sair ou recarregar.');
    }
  });
  root.addEventListener('change',e=>{
    if(e.target.matches('[data-var-kind]')){
      e.target.dataset.unsaved='true';
      notice('Tipo em edição: clique em Salvar para aplicar a mudança.');return;
    }
    if(e.target.matches('[data-venn-column]'))vennSelectedKey=e.target.value;
    else if(e.target.matches('[data-venn-filter]'))
      vennFilters={...vennFilters,[e.target.dataset.vennFilter]:e.target.value};
    else return;
    render();
  });
  const showSymbolHelp=button=>{
    const panel=root.querySelector('#freeSymbolHelp');
    if(panel)panel.textContent=button?.dataset.help||SYMBOL_HELP_DEFAULT;
  };
  root.addEventListener('pointerover',e=>{
    const symbol=e.target.closest('.free-keypad [data-symbol]');
    if(symbol)showSymbolHelp(symbol);
  });
  root.addEventListener('focusin',e=>{
    if(e.target.matches('#freeNewFormula,[data-formula-source]'))lastFormulaInput=e.target;
    const symbol=e.target.closest('.free-keypad [data-symbol]');
    if(symbol)showSymbolHelp(symbol);
  });
  root.addEventListener('click',e=>{
    const sym=e.target.closest('[data-symbol]');
    if(sym){
      showSymbolHelp(sym);
      const input=lastFormulaInput?.isConnected?lastFormulaInput:root.querySelector('#freeNewFormula');
      if(!input)return;
      const start=input.selectionStart??input.value.length,end=input.selectionEnd??start;
      const predicateInput=freeTableKind(state)==='predicates'||input.value.includes('∀')||input.value.includes('∃');
      const insert=['∀','∃','∃!'].includes(sym.dataset.symbol)?sym.dataset.symbol+'x(':
        (predicateInput&&state.variables.some(v=>v.name===sym.dataset.symbol&&v.kind!=='individual')?sym.dataset.symbol+'(x)':sym.dataset.symbol);
      input.value=input.value.slice(0,start)+insert+input.value.slice(end);
      input.focus();input.setSelectionRange(start+insert.length,start+insert.length);return;
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
  if(recovery)notice('Não foi possível abrir os dados salvos; o original foi preservado para download.',true);
  return {open(){render();if(recovery)notice('Rascunho protegido: baixe os dados antes de reiniciar.',true);
    else notice('Tabela salva neste navegador.')}};
}
