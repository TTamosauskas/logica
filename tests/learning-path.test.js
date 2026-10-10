import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { COURSE_UNITS } from '../src/content/course.js';
import { MODULES } from '../src/content/modules.js';
import { LEARNING_STAGES,getPracticeGroups,getNextLearningStep } from '../src/core/learning-path.js';

test('prática livre agrupa os 18 módulos uma única vez na ordem do curso',()=>{
  const groups=getPracticeGroups(COURSE_UNITS,MODULES);
  assert.equal(groups.length,COURSE_UNITS.length+1);
  const ids=groups.flatMap(group=>group.modules.map(m=>m.id));
  assert.equal(ids.length,MODULES.length);
  assert.equal(new Set(ids).size,MODULES.length);
  assert.deepEqual(ids.slice(0,COURSE_UNITS[0].ids.length),COURSE_UNITS[0].ids);
  assert.equal(ids.at(-1),'misto');
});

test('percurso inicial indica a leitura de fundamentos',()=>{
  const next=getNextLearningStep(COURSE_UNITS,{});
  assert.equal(next.id,'fundamentos');
  assert.equal(next.stage,'read');
  assert.equal(next.completed,0);
  assert.equal(next.total,MODULES.length-1);
});

test('continuidade prioriza a primeira etapa pendente, mesmo com estágios posteriores preenchidos',()=>{
  const progress={fundamentos:{read:true,example:true,guided:false,independent:true}};
  assert.equal(getNextLearningStep(COURSE_UNITS,progress).stage,'guided');
  progress.fundamentos.guided=true;
  assert.equal(getNextLearningStep(COURSE_UNITS,progress).stage,'mastered');
  progress.fundamentos.mastered=true;
  const next=getNextLearningStep(COURSE_UNITS,progress);
  assert.equal(next.id,'operadores');
  assert.equal(next.completed,1);
});

test('conclusão total produz estado de revisão e mantém a contagem',()=>{
  const progress=Object.fromEntries(COURSE_UNITS.flatMap(u=>u.ids).map(id=>[id,{mastered:true}]));
  const next=getNextLearningStep(COURSE_UNITS,progress);
  assert.equal(next.id,null);
  assert.equal(next.stage,null);
  assert.equal(next.completed,next.total);
  assert.equal(LEARNING_STAGES.length,5);
});

test('marcadores de continuidade e agrupamento existem no HTML e na folha de estilos',()=>{
  const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
  const css=readFileSync(new URL('../styles/learning.css',import.meta.url),'utf8');
  for(const id of ['continueLearning','continueButton','courseNext','courseNextButton','modeGrid']){
    assert.match(html,new RegExp('id="'+id+'"'));
  }
  assert.match(css,/\.practice-group\s+summary/);
  assert.match(css,/\.truth-table\s+\.cell\s*\{min-width:44px;min-height:44px/);
});
