/** Numeração visual do Curso Guiado: posição pedagógica, nunca ID persistido.
 * Não altera o catálogo legado, chaves de progresso ou URLs por identificador.
 */
export function numberCourseModules(units,modules){
  const order=new Map();
  let index=0;
  for(const unit of units){
    for(const id of unit.ids){
      if(order.has(id))throw Error('Aula repetida na sequência: '+id);
      order.set(id,String(++index).padStart(2,'0'));
    }
  }
  return modules.map(m=>order.has(m.id)?{...m,no:order.get(m.id)}:m);
}
export function numberedLesson(units,modules,id){
  return numberCourseModules(units,modules).find(m=>m.id===id)||null;
}
