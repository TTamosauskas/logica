/**
 * Continuidade entre leitura, demonstração e tarefa nova.
 * Somente a prática assistida oferece o roteiro; uma tentativa independente
 * continua sem o suporte formativo adicional.
 */
export function sectionBridgePositions(sectionCount){
  if(!Number.isInteger(sectionCount)||sectionCount<3)throw Error('Leitura precisa de ao menos três seções');
  return [0,Math.floor((sectionCount-1)/2),sectionCount-1];
}

export function practiceTransferGuide(id,readings,bridges,worked,stage){
  if(stage!=='guided')return null;
  const reading=readings[id],support=bridges[id],example=worked[id];
  if(!reading||!support||!example)throw Error('Continuidade pedagógica incompleta: '+id);
  const steps=support.handoff?.steps;
  if(!reading.objective||steps?.length!==3||example.steps?.length<2||!example.context){
    throw Error('Faltam passos entre leitura, exemplo e prática: '+id);
  }
  return {
    id,
    objective:reading.objective,
    steps:[...steps],
    worked:{
      context:example.context,
      steps:example.steps.map(({formal,concrete,reason})=>({formal,concrete,reason}))
    }
  };
}

/**
 * Auditoria estrutural do percurso inteiro, sem presumir equivalência
 * semântica entre um enunciado e a explicação. Essa equivalência exige
 * revisão editorial (documentada em docs/PEDAGOGY.md).
 */
export function auditLessonJourneys(units,lessons,readings,bridges,worked,generatorIds){
  const all=units.flatMap(unit=>unit.ids),issues=[],records=[];
  if(new Set(all).size!==all.length)issues.push('Identificadores duplicados no currículo');
  for(const [order,id] of all.entries()){
    const reading=readings[id],support=bridges[id],example=worked[id],lesson=lessons[id];
    const missing=[];
    if(!lesson)missing.push('aula');
    if(!reading?.objective||reading.sections?.length<3||!reading?.check)missing.push('leitura');
    if(support?.bridges?.length!==3||support.handoff?.steps?.length!==3)missing.push('questões-ponte/roteiro');
    if(!example?.context||example.steps?.length<2||!example.check)missing.push('exemplo resolvido');
    if(!generatorIds.has(id))missing.push('gerador de prática');
    if(missing.length)issues.push(id+': '+missing.join(', '));
    records.push({id,order:order+1,unit:units.findIndex(u=>u.ids.includes(id))+1,sections:reading?.sections?.length||0,
      bridges:support?.bridges?.length||0,workedSteps:example?.steps?.length||0,
      practiceReady:generatorIds.has(id),missing});
  }
  return {issues,records};
}
