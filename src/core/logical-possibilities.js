/** Possibilidades semânticas entre fórmulas completas (não entre átomos independentes). */
import {truthRows,evalAst} from './logic.js';
import {analyzePredicateCombinations} from './free-inference.js';

export const MAX_POSSIBILITY_FORMULAS=6;
const letter=i=>'ABCDEF'[i];
const combinations=count=>Array.from({length:2**count},(_,index)=>{
  const mask=2**count-1-index;
  return {mask,values:Array.from({length:count},(_,i)=>
    mask&(1<<(count-i-1))?'V':'F')};
});
const conjunctiveDescription=(labels,values)=>values.map((value,i)=>
  (value==='F'?'¬':'')+labels[i]).join(' ∧ ');
/** Explicação concreta da instanciação universal quando aplicável; a prova geral vem do exame completo dos modelos. */
function universalExplanation(nodes,values,labels){
  for(let i=0;i<nodes.length;i++){
    const top=nodes[i];
    if(values[i]!=='V'||top.type!=='forall'||top.a?.type!=='implies')continue;
    const left=top.a.a,right=top.a.b;
    if(left?.type!=='pred'||right?.type!=='pred'||left.term!=='x'||right.term!=='x')continue;
    for(let j=0;j<nodes.length;j++){
      const atom=nodes[j];
      if(values[j]!=='V'||atom.type!=='pred'||atom.name!==left.name||atom.term==='x')continue;
      const k=nodes.findIndex((candidate,index)=>index!==i&&index!==j&&
        candidate.type==='pred'&&candidate.name===right.name&&
        candidate.term===atom.term&&values[index]==='F');
      if(k>=0)return 'Instanciação universal: '+labels[i]+' e '+labels[j]+
        ' obrigam '+labels[k]+' a ser V para o indivíduo '+atom.term+'.';
    }
  }
  return '';
}
/** Recebe as fórmulas cadastradas e, opcionalmente, a conclusão como última expressão. */
export function analyzeLogicalPossibilities({formulas,conclusion=null,variables=[],mode='predicates'}={}){
  if(!Array.isArray(formulas)||!formulas.length)
    return {status:'undetermined',reason:'Cadastre ao menos uma fórmula para analisar.'};
  const hasConclusion=Boolean(conclusion),nodes=hasConclusion?[...formulas,conclusion]:[...formulas];
  if(nodes.length>MAX_POSSIBILITY_FORMULAS)
    return {status:'undetermined',reason:'A análise tabular aceita até seis afirmações completas (incluindo a conclusão). Remova fórmulas ou analise um conjunto menor.'};
  const labels=nodes.map((_,i)=>letter(i));
  const rows=combinations(nodes.length);
  let witnesses=new Map(),checked=0;
  try{
    if(mode==='predicates'){
      const result=analyzePredicateCombinations(nodes);
      witnesses=result.witnesses;checked=result.checked;
    }else{
      const assignments=truthRows(variables);
      checked=assignments.length;
      for(const assignment of assignments){
        const mask=nodes.reduce((bits,node)=>(bits<<1)|(evalAst(node,assignment)?1:0),0);
        if(!witnesses.has(mask))
          witnesses.set(mask,{summary:'Atribuição: '+variables.map(v=>v+'='+(assignment[v]?'V':'F')).join(', ')});
      }
    }
  }catch(error){
    return {status:'undetermined',reason:error.message,labels,checked};
  }
  const classified=rows.map(row=>{
    const possible=witnesses.has(row.mask);
    const explanation=possible?'Existe modelo compatível. '+witnesses.get(row.mask).summary:
      (mode==='predicates'?universalExplanation(nodes,row.values,labels):'')+
      ' Não existe modelo que satisfaça simultaneamente '+conjunctiveDescription(labels,row.values)+'.';
    return {...row,possible,explanation,
      counterexample:hasConclusion&&row.values.slice(0,-1).every(v=>v==='V')&&row.values.at(-1)==='F'};
  });
  const semanticCounterexamples=classified.filter(r=>r.possible&&r.counterexample);
  const premisesSatisfiable=classified.some(r=>r.possible&&
    (hasConclusion?r.values.slice(0,-1):r.values).every(v=>v==='V'));
  return {status:'complete',labels,rows:classified,checked,hasConclusion,
    possibleCount:classified.filter(r=>r.possible).length,
    impossibleCount:classified.filter(r=>!r.possible).length,
    propositionalValid:hasConclusion?!classified.some(r=>r.counterexample):null,
    semanticValid:hasConclusion?semanticCounterexamples.length===0:null,
    premisesSatisfiable,counterexample:semanticCounterexamples[0]||null};
}
