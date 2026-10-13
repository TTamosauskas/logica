/** Exportação local explícita: nenhuma transmissão de dados para servidores. */
export const PORTABLE_KEYS=Object.freeze([
 'logiclab_progress_v1',
 'logiclab_curso_formal_v2',
 'logiclab_exercise_drafts_v1',
 'logiclab_final_exam_draft_v1',
 'logiclab_translation_history_v1',
 'logiclab_syllogisms_v1',
 'logiclab_deduction_history_v1',
 'logiclab_categorical_v1',
 'logiclab_practice_sections_v1',
 'logiclab_tabela_livre_v1',
 'logiclab_theme_v1'
]);
export const BACKUP_VERSION=1;
const MAX_FILE_SIZE=2*1024*1024;
export function createBackup(storage,createdAt=new Date().toISOString()){
 const data={};
 for(const key of PORTABLE_KEYS){const value=storage.getItem(key);if(value!==null)data[key]=value;}
 return {format:'logiclab-backup',version:BACKUP_VERSION,createdAt,data};
}
export function validateBackup(input){
 if(typeof input!=='object'||input===null||Array.isArray(input)||input.format!=='logiclab-backup'||input.version!==BACKUP_VERSION||!input.data||typeof input.data!=='object'||Array.isArray(input.data))throw Error('Formato de backup incompatível.');
 const data=input.data,keys=Object.keys(data);
 if(!keys.length)throw Error('O arquivo está vazio.');
 if(keys.some(key=>!PORTABLE_KEYS.includes(key)))throw Error('O backup contém uma chave desconhecida.');
 let chars=0;
 for(const [key,value] of Object.entries(data)){
   if(typeof value!=='string')throw Error('Dado inválido: '+key);
   chars+=value.length;
   if(key==='logiclab_theme_v1'){
     if(!['dark','light'].includes(value))throw Error('Tema inválido.');
   }else{
     let parsed;
     try{parsed=JSON.parse(value)}catch{throw Error('Dado JSON inválido: '+key)}
     if(parsed===null||typeof parsed!=='object')throw Error('Formato de dado inválido: '+key);
     if(key==='logiclab_curso_formal_v2'&&(!parsed.lessons||!parsed.final))throw Error('Progresso de curso inválido.');
     if(key==='logiclab_progress_v1'&&(typeof parsed.tries!=='number'||!parsed.byMode))throw Error('Histórico de exercícios inválido.');
   }
 }
 if(chars>MAX_FILE_SIZE)throw Error('O backup excede o limite permitido de 2 MB.');
 return data;
}
export function importBackup(storage,input){
 const data=validateBackup(input);
 const original=Object.fromEntries(PORTABLE_KEYS.map(key=>[key,storage.getItem(key)]));
 try{
   for(const key of PORTABLE_KEYS){
     if(Object.hasOwn(data,key))storage.setItem(key,data[key]);
     else storage.removeItem(key);
   }
 }catch(error){
   for(const [key,value] of Object.entries(original)){
     try{if(value===null)storage.removeItem(key);else storage.setItem(key,value)}catch{}
   }
   throw new Error('Falha ao importar os dados; o progresso anterior foi restaurado.',{cause:error});
 }
 return Object.keys(data).length;
}
