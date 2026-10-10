/** Roteamento por fragmentos, sem dependência do DOM (compatível com GitHub Pages). */
export function routeFromHash(hash, moduleIds, lessonIds = moduleIds) {
  let id = '';
  try { id = decodeURIComponent(String(hash || '').replace(/^#/, '')); }
  catch { return {view: 'home', id: null}; }

  if (id === 'curso') return {view: 'course', id: null};
  if (id.startsWith('aula-') && lessonIds.includes(id.slice(5))) {
    return {view: 'course', id: id.slice(5)};
  }
  if (moduleIds.includes(id)) return {view: 'work', id};
  return {view: 'home', id: null};
}
