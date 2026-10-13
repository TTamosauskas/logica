/** Relações de estrutura e semântica entre colunas de uma tabela proposicional completa. */
import {sig,evalAst,truthRows} from './logic.js';

export const RELATION_TEXT={
  equivalent:'Equivalentes: mesmos valores em todas as interpretações.',
  contradictory:'Contraditórias: valores opostos em todas as interpretações.',
  subaltern:'Subalternação: a coluna indicada como origem implica a outra.',
  contrary:'Contrárias: não podem ser ambas verdadeiras (mas podem ser ambas falsas).',
  subcontrary:'Subcontrárias: não podem ser ambas falsas (mas podem ser ambas verdadeiras).'
};
function nodeSig(node){return node?sig(node):null}
export function immediateOperands(columns,index){
  const node=columns[index]?.node;
  if(!node||(!node.a&&!node.b))return [];
  const operands=[node.a,node.b].filter(Boolean),indices=[];
  for(const operand of operands){
    const signature=nodeSig(operand);
    let match=-1;
    for(let i=index-1;i>=0;i--){
      if(nodeSig(columns[i]?.node)===signature){match=i;break}
    }
    if(match>=0&&!indices.includes(match))indices.push(match);
  }
  return indices;
}
export function relationOf(a,b){
  if(!Array.isArray(a)||a.length===0||a.length!==b?.length)return null;
  const all=(predicate)=>a.every((v,i)=>predicate(v,b[i]));
  if(all((x,y)=>x===y))return {kind:'equivalent'};
  if(all((x,y)=>x!==y))return {kind:'contradictory'};
  // Em relações não simétricas, mantém-se a direção da consequência.
  const aToB=all((x,y)=>!x||y),bToA=all((x,y)=>!y||x);
  // Evitar inferências de existência vazias com tautologias/contradições constantes.
  const contingent=(v)=>v.includes(true)&&v.includes(false);
  if(aToB!==bToA&&contingent(a)&&contingent(b))
    return {kind:'subaltern',from:aToB?'a':'b',to:aToB?'b':'a'};
  if(all((x,y)=>!(x&&y))&&a.some((x,i)=>!x&&!b[i])&&contingent(a)&&contingent(b))
    return {kind:'contrary'};
  if(all((x,y)=>x||y)&&a.some((x,i)=>x&&b[i])&&contingent(a)&&contingent(b))
    return {kind:'subcontrary'};
  return null;
}
/** Só usar vetores em todas as 2^n atribuições, nunca em uma amostra de modelos. */
export function propositionalRelations(columns,variables,eligible){
  if(!Array.isArray(variables)||variables.length>8||!columns?.length)return [];
  const rows=truthRows(variables),vectors=columns.map(col=>col.node&&
    rows.map(row=>Boolean(evalAst(col.node,row))));
  const relations=[];
  for(let a=0;a<columns.length;a++)for(let b=a+1;b<columns.length;b++){
    if(!eligible(a)||!eligible(b)||!vectors[a]||!vectors[b])continue;
    const rel=relationOf(vectors[a],vectors[b]);
    if(rel)relations.push({a,b,...rel});
  }
  return relations;
}
/** A/E/I/O — sem hipótese de existência: apenas contradições são incondicionais. */
export function categoricalRelation(a,b,{subjectNonempty=false}={}){
  if(!a||!b||a.a!==b.a||a.b!==b.b||a.kind===b.kind)return null;
  const pair=[a.kind,b.kind].sort().join('|');
  if(pair==='all|someNot'||pair==='none|some')return {kind:'contradictory'};
  if(!subjectNonempty)return null;
  if(pair==='all|none')return {kind:'contrary'};
  if(pair==='some|someNot')return {kind:'subcontrary'};
  if(pair==='all|some'||pair==='none|someNot'){
    const first=a.kind==='all'||a.kind==='none';
    return {kind:'subaltern',from:first?'a':'b',to:first?'b':'a'};
  }
  return null;
}
