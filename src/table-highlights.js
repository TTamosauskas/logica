/** Destaques por coluna inteira, sem bordar cada célula individualmente. */
import {RELATION_TEXT} from './core/table-relations.js';

const CSS_FOR={equivalent:'truth-rel-equivalent',contradictory:'truth-rel-contradictory',
  subaltern:'truth-rel-subaltern',contrary:'truth-rel-contrary',subcontrary:'truth-rel-subcontrary'};
const allClasses=['truth-rel-structure',...Object.values(CSS_FOR)];
// Contradições não podem desaparecer quando uma expressão também é equivalente a outra.
const priority={contradictory:0,equivalent:1,subaltern:2,contrary:3,subcontrary:4};
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
  const headAt=index=>heads().find(head=>Number(head.dataset.relCol)===index);
  function clear(){
    heads().forEach(head=>{
      head.classList.remove(...allClasses);
      head.style.removeProperty('--truth-rel-height');
    });
    if(status){status.textContent='';status.removeAttribute('data-relation')}
    active=null;
  }
  function geometry(){
    const bottom=table.getBoundingClientRect().bottom;
    heads().filter(head=>allClasses.some(cls=>head.classList.contains(cls))).forEach(head=>{
      const height=Math.max(0,Math.ceil(bottom-head.getBoundingClientRect().top));
      head.style.setProperty('--truth-rel-height',height+'px');
    });
  }
  function mark(index,style){
    const head=headAt(index);
    if(!head)return;
    head.classList.remove(...allClasses);
    head.classList.add(style);
  }
  function show(index){
    if(index===active)return;
    clear();
    const col=config.columns?.[index];
    if(!col)return;
    active=index;
    const operands=config.operands?.(index)||[];
    mark(index,'truth-rel-structure');
    operands.forEach(i=>mark(i,'truth-rel-structure'));
    // Cada par aparece com sua cor: uma equivalência verde não encobre a
    // contradição vermelha envolvendo outra coluna da mesma expressão.
    const hits=(config.relations||[]).filter(r=>r.a===index||r.b===index)
      .sort((a,b)=>(priority[a.kind]??99)-(priority[b.kind]??99));
    const labels=[],styles=new Map();
    for(const relation of hits){
      const peer=relation.a===index?relation.b:relation.a;
      const style=CSS_FOR[relation.kind];
      if(!style)continue;
      // Quando há mais de uma relação, cada par conserva sua cor; na coluna
      // selecionada prevalece o vermelho, que é a oposição mais informativa.
      if(!styles.has(peer))styles.set(peer,style);
      const other=config.columns[peer]?.label||('coluna '+(peer+1));
      const from=relation.from==='a'?relation.a:relation.b,to=relation.to==='a'?relation.a:relation.b;
      const direction=relation.kind==='subaltern'?
        ' ('+(config.columns[from]?.label||'')+' → '+(config.columns[to]?.label||'')+')':'';
      labels.push(other+': '+RELATION_TEXT[relation.kind]+direction);
    }
    for(const [peer,style] of styles)mark(peer,style);
    if(hits.length)mark(index,CSS_FOR[hits[0].kind]);
    geometry();
    if(status){
      const structural=operands.length?'Composição direta: '+operands.map(j=>config.columns[j]?.label).join(' e ')+'.':'';
      status.textContent=[structural,...labels].filter(Boolean).join(' ');
      if(labels.length)status.dataset.relation='active';
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
  const observer=typeof ResizeObserver==='function'?new ResizeObserver(()=>{
    if(active!==null)geometry();
  }):null;
  observer?.observe(table);
  return {
    update(next){config=next;locked=false;clear()},
    destroy(){observer?.disconnect();clear()}
  };
}
