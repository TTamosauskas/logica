/** Conteúdo e progresso do curso em ordem pedagógica, sem dependências do DOM. */
export const LEARNING_STAGES=[
  {key:'read',label:'Compreender a teoria'},
  {key:'example',label:'Observar um exemplo resolvido'},
  {key:'guided',label:'Praticar com ajuda'},
  {key:'independent',label:'Resolver com autonomia'},
  {key:'mastered',label:'Aprovar avaliação inicial'}
];

/** Respeita a ordem do curso e mantém temas de revisão fora do percurso principal. */
export function getPracticeGroups(units,modules){
  const byId=new Map(modules.map(m=>[m.id,m]));
  const used=new Set();
  const groups=units.map((unit,index)=>{
    const entries=unit.ids.filter(id=>byId.has(id)&&!used.has(id)).map(id=>{
      used.add(id);
      return byId.get(id);
    });
    return {id:String(index),title:unit.title,note:unit.note,modules:entries};
  });
  const others=modules.filter(m=>!used.has(m.id));
  if(others.length)groups.push({id:'review',title:'Revisão e prática adaptativa',note:'Reforce os temas que precisam de mais atenção.',modules:others});
  return groups.filter(group=>group.modules.length);
}

/** Identifica a primeira habilidade pendente, preservando conquistas já salvas. */
export function getNextLearningStep(units,progress={}){
  let completed=0;
  const total=units.reduce((sum,unit)=>sum+unit.ids.length,0);
  for(const unit of units){
    for(const id of unit.ids){
      const state=progress[id]||{};
      if(state.mastered){completed++;continue}
      const stage=LEARNING_STAGES.find(entry=>!state[entry.key])||LEARNING_STAGES.at(-1);
      return {id,stage:stage.key,label:stage.label,unitTitle:unit.title,completed,total};
    }
  }
  return {id:null,stage:null,label:'Avaliações iniciais concluídas',unitTitle:'',completed,total};
}
