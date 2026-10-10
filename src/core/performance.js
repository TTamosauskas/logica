/** Distingue avaliação atual, primeira correção e histórico, sem depender de interface. */
export function scorePercent(correct,total){
  if(!Number.isFinite(total)||total<=0)return '—';
  return Math.round((100*correct)/total)+'%';
}
export function performanceSummary(grade,firstGrade,moduleStats){
  const current=grade?{
    label:'Esta correção',
    value:scorePercent(grade.correct,grade.total),
    detail:`${grade.correct} de ${grade.total} respostas corretas`
  }:null;
  const first=firstGrade?{
    label:'Primeira correção deste exercício',
    value:scorePercent(firstGrade.correct,firstGrade.total),
    detail:'Resultado registrado na primeira tentativa'
  }:null;
  const historical={
    label:'Histórico do módulo',
    value:scorePercent(moduleStats?.correct||0,moduleStats?.total||0),
    detail:`${moduleStats?.tries||0} ${moduleStats?.tries===1?'exercício corrigido':'exercícios corrigidos'} na primeira tentativa`
  };
  return {current,first,historical};
}
