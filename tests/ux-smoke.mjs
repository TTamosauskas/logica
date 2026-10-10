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

  console.log('Smoke test de UX aprovado: progresso, grupos, histórico, células e viewport móvel.');
  await context.close();
}catch(error){
  console.error(error);
  process.exitCode=1;
}finally{
  await browser?.close();
  server.kill('SIGTERM');
}
