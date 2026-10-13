/** Destaque progressivo para tabelas: estrutura (neutro) e relações verificadas. */
import {RELATION_TEXT} from './core/table-relations.js';

const CSS_FOR={equivalent:'truth-rel-equivalent',contradictory:'truth-rel-contradictory',
  subaltern:'truth-rel-subaltern',contrary:'truth-rel-contrary',subcontrary:'truth-rel-subcontrary'};
const allClasses=['truth-rel-structure',...Object.values(CSS_FOR)];
export function attachTruthHighlights(table,configuration){
  if(!table)return;
  let config=configuration,active=null,locked=false;
  const scroll=table.closest('.table-scroll')||table.parentElement;
  let status=scroll?.nextElementSibling;
  if(!status?.classList?.contains('truth-relation-status')){
    status=document.createElement('p');status.className='truth-relation-status';
    status.setAttribute('role','status');status.setAttribute('aria-live','polite');
    scroll?.insertAdjacentElement('afterend',status);
  }
  const heads=()=>[...table.querySelectorAll('thead tr:first-child > th[data-rel-col]')];
  function clear(){
    table.querySelectorAll('thead th, tbody tr > *').forEach(cell=>cell.classList.remove(...allClasses));
    if(status){status.textContent='';status.removeAttribute('data-relation')}
    active=null;
  }
  function marked(index,style){
    const head=heads().find(h=>Number(h.dataset.relCol)===index);
    if(!head)return;
    head.classList.add(style);
    const position=head.cellIndex;
    for(const row of table.tBodies[0]?.rows||[]){
      // Apenas células normais: a linha de aviso com colspan não é uma coluna.
      const cell=row.cells[position];
      if(cell&&cell.colSpan===1)cell.classList.add(style);
    }
  }
  function show(index){
    if(index===active)return;
    clear();
    const col=config.columns?.[index];
    if(!col)return;
    active=index;
    const operands=config.operands?.(index)||[];
    marked(index,'truth-rel-structure');
    operands.forEach(i=>marked(i,'truth-rel-structure'));
    const hits=(config.relations||[]).filter(r=>r.a===index||r.b===index);
    // Prioridade semântica sobre contorno neutro (inclusive fonte e operandos).
    const rank={equivalent:0,contradictory:1,subaltern:2,contrary:3,subcontrary:4};
    hits.sort((a,b)=>rank[a.kind]-rank[b.kind]);
    const label=[];
    const used=new Set();
    for(const relation of hits){
      const peer=relation.a===index?relation.b:relation.a;
      if(used.has(peer))continue;
      used.add(peer);
      const style=CSS_FOR[relation.kind];
      if(!style)continue;
      for(const j of [index,peer]){
        const head=heads().find(h=>Number(h.dataset.relCol)===j);
        if(head){
          head.classList.remove(...allClasses);
          const colIndex=head.cellIndex;
          for(const row of table.tBodies[0]?.rows||[]){
            const cell=row.cells[colIndex];if(cell)cell.classList.remove(...allClasses);
          }
        }
        marked(j,style);
      }
      const other=config.columns[peer]?.label||('coluna '+(peer+1));
      const from=relation.from==='a'?relation.a:relation.b,to=relation.to==='a'?relation.a:relation.b;
      const direction=relation.kind==='subaltern'?
        ' ('+(config.columns[from]?.label||'')+' → '+(config.columns[to]?.label||'')+')':'';
      label.push(other+': '+RELATION_TEXT[relation.kind]+direction);
    }
    if(status){
      const structural=operands.length?'Composição direta: '+operands.map(j=>config.columns[j]?.label).join(' e ')+'.':'';
      status.textContent=[structural,...label].filter(Boolean).join(' ');
      if(label.length)status.dataset.relation='active';
    }
  }
  function findHead(element){
    if(!(element instanceof Element))return null;
    const head=element.closest('thead th[data-rel-col]');
    return head&&table.contains(head)?head:null;
  }
  table.addEventListener('pointerover',event=>{
    if(locked)return;
    const head=findHead(event.target);if(head)show(Number(head.dataset.relCol));
  });
  table.addEventListener('pointerout',event=>{
    if(locked)return;
    const head=findHead(event.target);
    if(head&&!head.contains(event.relatedTarget))clear();
  });
  table.addEventListener('focusin',event=>{
    const head=findHead(event.target);if(head&&!locked)show(Number(head.dataset.relCol));
  });
  table.addEventListener('focusout',event=>{
    if(locked)return;
    const head=findHead(event.target);
    if(head&&!head.contains(event.relatedTarget))clear();
  });
  table.addEventListener('click',event=>{
    const head=findHead(event.target);
    if(!head||event.target.closest('button,input,select'))return;
    const i=Number(head.dataset.relCol),same=locked&&active===i;
    locked=!same;
    if(same)clear();else show(i);
  });
  table.addEventListener('keydown',event=>{
    const head=findHead(event.target);
    if(!head||event.target!==head||!['Enter',' '].includes(event.key))return;
    event.preventDefault();const i=Number(head.dataset.relCol),same=locked&&active===i;
    locked=!same;
    if(same)clear();else show(i);
  });
  return {update(next){config=next;locked=false;clear()}};
}
