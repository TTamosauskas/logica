import test from 'node:test';
import assert from 'node:assert/strict';
import {PORTABLE_KEYS,createBackup,validateBackup,importBackup} from '../src/core/progress-portability.js';

const memory=()=>{
 const values=new Map();
 return {
  getItem:key=>values.has(key)?values.get(key):null,
  setItem:(key,value)=>values.set(key,String(value)),
  removeItem:key=>values.delete(key),
  values
 };
};
test('exporta somente chaves locais conhecidas e preserva seu conteúdo literal',()=>{
 const storage=memory();
 storage.setItem('logiclab_progress_v1',JSON.stringify({tries:1,byMode:{fundamentos:{correct:1,total:2}}}));
 storage.setItem('logiclab_curso_formal_v2',JSON.stringify({lessons:{fundamentos:{mastered:true,review:{completed:1,dueAt:123}}},final:{}}));
 storage.setItem('senha_privada','NUNCA EXPORTAR');
 const backup=createBackup(storage,'2026-10-10T12:00:00.000Z');
 assert.deepEqual(Object.keys(backup.data),['logiclab_progress_v1','logiclab_curso_formal_v2']);
 assert.ok(!JSON.stringify(backup).includes('senha_privada'));
 assert.deepEqual(validateBackup(backup),backup.data);
 const target=memory();importBackup(target,backup);
 assert.equal(target.getItem('logiclab_curso_formal_v2'),storage.getItem('logiclab_curso_formal_v2'));
});
test('importação remove chaves ausentes e mantém o tema do backup',()=>{
 const target=memory();target.setItem('logiclab_theme_v1','light');target.setItem('logiclab_progress_v1',JSON.stringify({tries:3,byMode:{}}));
 const backup={format:'logiclab-backup',version:1,createdAt:'x',data:{logiclab_theme_v1:'dark'}};
 importBackup(target,backup);
 assert.equal(target.getItem('logiclab_theme_v1'),'dark');
 assert.equal(target.getItem('logiclab_progress_v1'),null);
});
test('recusa dados desconhecidos, JSON inválido, versão diferente e objetos vazios',()=>{
 const valid={format:'logiclab-backup',version:1,data:{logiclab_theme_v1:'dark'}};
 assert.throws(()=>validateBackup({...valid,data:{other:'X'}}),/desconhecida/);
 assert.throws(()=>validateBackup({...valid,data:{}}),/vazio/);
 assert.throws(()=>validateBackup({...valid,version:99}),/incompatível/);
 assert.throws(()=>validateBackup({...valid,data:{logiclab_theme_v1:'blue'}}),/Tema/);
 assert.throws(()=>validateBackup({...valid,data:{logiclab_progress_v1:'{broken'}}),/JSON/);
 assert.equal(PORTABLE_KEYS.length,10);
});
test('erro de armazenamento recupera os valores anteriores',()=>{
 const storage=memory();
 storage.setItem('logiclab_theme_v1','light');
 storage.setItem('logiclab_progress_v1',JSON.stringify({tries:5,byMode:{}}));
 let fail=true;
 const flaky={getItem:storage.getItem,setItem:(key,value)=>{if(fail&&key==='logiclab_progress_v1'){fail=false;throw Error('quota')}storage.setItem(key,value)},removeItem:storage.removeItem};
 const backup={format:'logiclab-backup',version:1,data:{logiclab_theme_v1:'dark',logiclab_progress_v1:JSON.stringify({tries:10,byMode:{}})}};
 assert.throws(()=>importBackup(flaky,backup),/progresso anterior/);
 assert.equal(storage.getItem('logiclab_theme_v1'),'light');
 assert.equal(JSON.parse(storage.getItem('logiclab_progress_v1')).tries,5);
});
