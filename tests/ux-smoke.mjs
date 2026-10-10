/** Smoke test funcional em Chromium para navegação e legibilidade no celular. */
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { chromium } from 'playwright-core';

const server=spawn('python3',['-m','http.server','8765','--bind','127.0.0.1'],{
  cwd:process.cwd(),stdio:'ignore'
});
let browser;
const root='http://127.0.0.1:8765/';

async function ready(){
  for(let attempt=0;attempt<30;attempt++){
    try{const response=await fetch(root);if(response.ok)return}catch{}
    await new Promise(resolve=>setTimeout(resolve,200));
  }
  throw Error('Servidor local indisponível');
}
try{
  await ready();
  browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'/usr/bin/google-chrome',args:['--no-sandbox']});
  const context=await browser.newContext({viewport:{width:375,height:812},deviceScaleFactor:1,isMobile:true,hasTouch:true});
  const page=await context.newPage();
  const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto(root,{waitUntil:'networkidle'});

  assert.match(await page.locator('#continueTitle').innerText(),/Fundamentos/);
  assert.equal(await page.locator('.practice-group').count(),7);
  assert.equal(await page.locator('.practice-group').first().getAttribute('open'),'');
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
  assert.ok(overflow<=2,'A página inicial excedeu o viewport móvel em '+overflow+'px');

  await page.locator('#continueButton').click();
  await page.locator('#courseLesson').waitFor({state:'visible'});
  assert.match(await page.locator('#courseLesson').innerText(),/Fundamentos/);
  await page.locator('[data-caction="read"]').click();
  assert.match(await page.locator('#courseNextDescription').innerText(),/Etapa 2\/5/);
  await page.locator('#courseHomeBack').click();
  assert.match(await page.locator('#continueDescription').innerText(),/Etapa 2\/5/);

  await page.locator('.practice-group').nth(1).locator('summary').click();
  await page.locator('[data-open="compostas"]').click();
  await page.locator('#workView').waitFor({state:'visible'});
  assert.match(await page.locator('#workTitle').innerText(),/Expressões compostas/);
  const cellSize=await page.locator('#truthTable .cell').first().evaluate(el=>el.getBoundingClientRect().height);
  assert.ok(cellSize>=44,'Células precisam de 44px de altura');
  await page.goBack({waitUntil:'domcontentloaded'});
  await page.locator('#homeView').waitFor({state:'visible'});
  assert.equal(await page.locator('.practice-group').nth(1).getAttribute('open'),'');
  assert.deepEqual(errors,[]);

  await page.setViewportSize({width:320,height:700});
  const tinyOverflow=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
  assert.ok(tinyOverflow<=2,'Layout de 320px excedeu o viewport em '+tinyOverflow+'px');

  // Ciclo 3: exercício preservado após atualizar e retomada pela página inicial.
  await page.goto(root+'#fundamentos',{waitUntil:'networkidle'});
  await page.locator('#truthTable .cell').first().click();
  assert.equal(await page.locator('#truthTable .cell.filled').count(),1);
  const titleBefore=await page.locator('#taskTitle').innerText();
  await page.reload({waitUntil:'networkidle'});
  assert.equal(await page.locator('#taskTitle').innerText(),titleBefore);
  assert.equal(await page.locator('#truthTable .cell.filled').count(),1);
  await page.goto(root,{waitUntil:'networkidle'});
  assert.match(await page.locator('#continueLabel').innerText(),/RETOMAR ATIVIDADE SALVA/);
  await page.locator('#continueButton').click();
  assert.equal(await page.locator('#truthTable .cell.filled').count(),1);

  // Confirmar o descarte protege a tentativa, e limpar permite desfazer.
  page.once('dialog',dialog=>dialog.dismiss());
  await page.locator('#newButton').click();
  assert.equal(await page.locator('#truthTable .cell.filled').count(),1);
  await page.locator('#clearButton').click();
  assert.equal(await page.locator('#truthTable .cell.filled').count(),0);
  await page.locator('#undoClearButton').click();
  assert.equal(await page.locator('#truthTable .cell.filled').count(),1);

  // Avaliação final mantém enunciados e respostas, com rota direta e retorno pela navegação.
  await page.locator('#topCourse').click();
  await page.locator('[data-caction="exam-open"]').click();
  assert.match(page.url(),/#avaliacao-final$/);
  const examQuestion=await page.locator('.course-question > strong').first().innerText();
  await page.locator('input[name="finalq-0"][value="0"]').check();
  await page.reload({waitUntil:'networkidle'});
  assert.equal(await page.locator('.course-question > strong').first().innerText(),examQuestion);
  assert.equal(await page.locator('input[name="finalq-0"][value="0"]').isChecked(),true);
  await page.locator('[data-caction="map"]').click();
  await page.locator('[data-caction="exam-open"]').click();
  assert.equal(await page.locator('input[name="finalq-0"][value="0"]').isChecked(),true);
  // Os campos de seleção dos exercícios avançados também precisam sobreviver ao reload.
  await page.goto(root+'#provas',{waitUntil:'networkidle'});
  const proofSelect=page.locator('#specialArea select[data-special-field]').first();
  await proofSelect.selectOption({index:1});
  const selectedFormula=await page.locator('#specialArea select[data-special-field]').first().inputValue();
  assert.ok(selectedFormula.length>0);
  await page.reload({waitUntil:'networkidle'});
  assert.equal(await page.locator('#specialArea select[data-special-field]').first().inputValue(),selectedFormula);
  assert.deepEqual(errors,[]);


  // Ciclo 4: a dica deve aparecer junto ao enunciado, inclusive no celular.
  await page.goto(root+'#operadores',{waitUntil:'networkidle'});
  await page.locator('#hintButton').click();
  assert.equal(await page.locator('#inlineHint').isVisible(),true);
  assert.equal(await page.locator('#inlineHint').evaluate(el=>el===document.activeElement),true);
  assert.equal(await page.locator('#hintButton').getAttribute('aria-expanded'),'true');
  await page.locator('#hintButton').click();
  assert.equal(await page.locator('#inlineHint').isVisible(),false);

  // Corrigir de novo atualiza o resultado atual, mas preserva a primeira correção.
  await page.locator('#checkButton').click();
  assert.equal(await page.locator('.feedback-metric').count(),3);
  const firstMetric=page.locator('.feedback-metric').nth(1);
  assert.match(await firstMetric.innerText(),/0%/);
  const firstCell=page.locator('#truthTable button.cell').first();
  const desired=(await firstCell.locator('.expected').innerText()).trim();
  await firstCell.click();
  if(desired==='F')await firstCell.click();
  await page.locator('#checkButton').click();
  assert.match(await page.locator('.feedback-metric').first().innerText(),/[1-9][0-9]*%/);
  assert.match(await firstMetric.innerText(),/0%/);
  assert.match(await page.locator('.feedback-metric').last().innerText(),/0%/);

  // Contexto de avaliação independente: consultar uma dica exige escolha explícita.
  const trainingContext=await browser.newContext({viewport:{width:375,height:812},deviceScaleFactor:1,isMobile:true,hasTouch:true});
  const study=await trainingContext.newPage();
  const studyErrors=[];
  study.on('pageerror',error=>studyErrors.push(error.message));
  await study.goto(root,{waitUntil:'networkidle'});
  await study.evaluate(()=>{
    localStorage.setItem('logiclab_curso_formal_v2',JSON.stringify({
      lessons:{fundamentos:{read:true,example:true,guided:true,independent:false,mastered:false,best:0}},
      final:{}
    }));
  });
  await study.reload({waitUntil:'networkidle'});
  await study.locator('#topCourse').click();
  await study.locator('[data-caction="lesson"][data-id="fundamentos"]').click();
  await study.locator('[data-caction="independent"]').click();
  await study.locator('#hintButton').click();
  assert.equal(await study.locator('#independentHintDecision').isVisible(),true);
  assert.equal(await study.locator('#inlineHint').isVisible(),false);
  await study.locator('[data-hint-action="keep"]').click();
  assert.equal(await study.locator('#independentHintDecision').isVisible(),false);
  let draft=await study.evaluate(()=>JSON.parse(localStorage.getItem('logiclab_exercise_drafts_v1')));
  assert.equal(draft.byMode.fundamentos.courseAttempt.hintUsed,false);
  await study.locator('#hintButton').click();
  await study.locator('[data-hint-action="show"]').click();
  assert.equal(await study.locator('#inlineHint').isVisible(),true);
  assert.match(await study.locator('#courseExerciseBanner').innerText(),/não valida autonomia/);
  draft=await study.evaluate(()=>JSON.parse(localStorage.getItem('logiclab_exercise_drafts_v1')));
  assert.equal(draft.byMode.fundamentos.courseAttempt.hintUsed,true);
  await study.locator('#checkButton').click();
  assert.equal(await study.locator('.feedback-assisted').isVisible(),true);
  await study.reload({waitUntil:'networkidle'});
  assert.equal(await study.locator('#inlineHint').isVisible(),true);
  assert.match(await study.locator('#courseExerciseBanner').innerText(),/não valida autonomia/);
  // A dica consultada após uma correção é revisão e não invalida a tentativa.
  await study.locator('#newButton').click();
  await study.locator('#checkButton').click();
  await study.locator('#hintButton').click();
  assert.equal(await study.locator('#independentHintDecision').isVisible(),false);
  assert.equal(await study.locator('#inlineHint').isVisible(),true);
  draft=await study.evaluate(()=>JSON.parse(localStorage.getItem('logiclab_exercise_drafts_v1')));
  assert.equal(draft.byMode.fundamentos.courseAttempt.hintUsed,false);
  assert.deepEqual(studyErrors,[]);
  await trainingContext.close();
  assert.deepEqual(errors,[]);


  // Ciclo 5: foco restaura após selecionar uma regra ou resposta em atividades avançadas.
  const a11y=await browser.newContext({viewport:{width:375,height:812},deviceScaleFactor:1,isMobile:true,hasTouch:true});
  const access=await a11y.newPage();
  const accessErrors=[];
  access.on('pageerror',err=>accessErrors.push(err.message));
  await access.goto(root,{waitUntil:'networkidle'});
  await access.keyboard.press('Tab');
  assert.equal(await access.evaluate(()=>document.activeElement?.classList.contains('skip-link')),true);
  await access.keyboard.press('Enter');
  assert.equal(await access.evaluate(()=>document.activeElement?.id),'mainContent');

  await access.goto(root+'#provas',{waitUntil:'networkidle'});
  const formula=access.locator('#specialArea select[data-special-field]').first();
  await formula.focus();
  await formula.selectOption({index:1});
  assert.equal(await access.evaluate(()=>document.activeElement?.dataset.specialField),'0-formula');

  // Na aula, o foco acompanha a próxima etapa disponível.
  await access.goto(root+'#aula-fundamentos',{waitUntil:'networkidle'});
  await access.locator('[data-caction="read"]').click();
  assert.equal(await access.evaluate(()=>document.activeElement?.dataset.caction),'example');
  await access.locator('[data-caction="example"]').click();
  assert.equal(await access.evaluate(()=>document.activeElement?.dataset.caction),'guided');

  // A alternativa de Venn fica operável pelo teclado e sincronizada ao desenho.
  await access.goto(root+'#categoricos',{waitUntil:'networkidle'});
  await access.evaluate(()=>{
    const key='logiclab_exercise_drafts_v1';
    const drafts=JSON.parse(localStorage.getItem(key));
    const ex=drafts.byMode.categoricos.exercise;
    ex.cat.unlocked=true;
    ex.cat.forms[0].kind='all';
    ex.cat.venn.phase=0;
    ex.cat.venn.workingShade=[];
    ex.cat.venn.shaded=[];
    ex.cat.venn.verified=false;
    localStorage.setItem(key,JSON.stringify(drafts));
  });
  await access.reload({waitUntil:'networkidle'});
  assert.equal(await access.locator('[data-venn-region-text]').count(),8);
  assert.equal(await access.locator('.venn-svg').getAttribute('aria-hidden'),'true');
  const region=access.locator('[data-venn-region-text="0"]');
  await region.focus();
  await access.keyboard.press('Space');
  assert.equal(await region.getAttribute('aria-pressed'),'true');
  assert.equal(await access.evaluate(()=>document.activeElement?.dataset.vennRegionText),'0');
  await access.locator('[data-venn-region="1"]').click();
  assert.equal(await access.locator('[data-venn-region-text="1"]').getAttribute('aria-pressed'),'true');
  assert.deepEqual(accessErrors,[]);
  await a11y.close();

  console.log('Smoke test de UX aprovado: progresso, grupos, histórico, células e viewport móvel.');
  await context.close();
}catch(error){
  console.error(error);
  process.exitCode=1;
}finally{
  await browser?.close();
  server.kill('SIGTERM');
}
