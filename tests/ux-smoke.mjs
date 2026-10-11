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
  // A recomendação é útil na página inicial, não deve aparecer de novo dentro do curso.
  assert.equal(await page.locator('#continueLearning').isVisible(),true);
  assert.equal(await page.locator('#courseNext').count(),0);
  assert.equal(await page.locator('.practice-group').count(),7);
  assert.equal(await page.locator('.practice-group').first().getAttribute('open'),'');
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
  assert.ok(overflow<=2,'A página inicial excedeu o viewport móvel em '+overflow+'px');

  await page.locator('#continueButton').click();
  await page.locator('#courseLesson').waitFor({state:'visible'});
  assert.match(await page.locator('#courseLesson').innerText(),/Fundamentos/);
  assert.equal(await page.locator('#continueLearning').isVisible(),false);
  assert.equal(await page.locator('#courseNext').count(),0);
  await page.locator('[data-caction="read"]').click();
  assert.equal(await page.locator('#courseLesson [data-caction="example"]').isVisible(),true);
  assert.equal(await page.locator('#courseNext').count(),0);
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
  await page.locator('#courseMap').waitFor({state:'visible'});
  assert.equal(await page.locator('#courseNext').count(),0);
  assert.equal(await page.locator('#continueLearning').isVisible(),false);
  assert.equal(await page.locator('#courseMap [data-caction="exam-open"]').isVisible(),true);
  await page.locator('#courseMap [data-caction="lesson"]').first().click();
  await page.locator('#courseLesson').waitFor({state:'visible'});
  assert.equal(await page.locator('#courseNext').count(),0);
  await page.locator('#courseLesson [data-caction="map"]').click();
  await page.locator('#courseMap').waitFor({state:'visible'});
  await page.locator('[data-caction="exam-open"]').click();
  assert.equal(await page.locator('#courseNext').count(),0);
  assert.equal(await page.locator('#courseExam').isVisible(),true);
  assert.match(page.url(),/#avaliacao-final$/);
  const examQuestion=await page.locator('.course-question > strong').first().innerText();
  await page.locator('input[name="finalq-0"][value="0"]').check();
  await page.reload({waitUntil:'networkidle'});
  assert.equal(await page.locator('#courseNext').count(),0);
  assert.equal(await page.locator('#courseExam').isVisible(),true);
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
  // O rascunho automático anterior é salvo em pagehide; preparar o teste no início do carregamento.
  await access.addInitScript(()=>{
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


  // Ciclo 6: histórico aprovado continua válido, mas consolidação exige revisões espaçadas.
  const progressContext=await browser.newContext({viewport:{width:375,height:812},deviceScaleFactor:1,isMobile:true,hasTouch:true,acceptDownloads:true});
  const progressPage=await progressContext.newPage();
  const progressErrors=[];
  progressPage.on('pageerror',error=>progressErrors.push(error.message));
  await progressPage.goto(root,{waitUntil:'networkidle'});
  await progressPage.evaluate(()=>{
    const now=Date.now();
    localStorage.setItem('logiclab_curso_formal_v2',JSON.stringify({
      lessons:{fundamentos:{read:true,example:true,guided:true,independent:true,mastered:true,best:1,
        review:{approvedAt:now-3*86400000,completed:0,dueAt:now-86400000,consolidated:false,failures:0}}},final:{}
    }));
  });
  await progressPage.reload({waitUntil:'networkidle'});
  assert.match(await progressPage.locator('#courseHomeSummary').innerText(),/1 de 17 avaliações aprovadas · 0 consolidados/);
  assert.match(await progressPage.locator('#continueLabel').innerText(),/REVISÃO DISPONÍVEL/);
  await progressPage.locator('#continueButton').click();
  assert.equal(await progressPage.locator('[data-caction="review"]').count(),1);
  await progressPage.locator('[data-caction="review"]').click();
  assert.match(await progressPage.locator('#courseExerciseBanner').innerText(),/Revisão espaçada/);
  await progressPage.locator('#hintButton').click();
  assert.equal(await progressPage.locator('#independentHintDecision').isVisible(),true);
  await progressPage.locator('[data-hint-action="show"]').click();
  await progressPage.locator('#checkButton').click();
  assert.match(await progressPage.locator('#feedbackArea').innerText(),/Prática com ajuda/);
  const stateAfter=await progressPage.evaluate(()=>JSON.parse(localStorage.getItem('logiclab_curso_formal_v2')).lessons.fundamentos.review);
  assert.equal(stateAfter.completed,0);
  assert.equal(stateAfter.consolidated,false);

  // Backup local pode sair do navegador e ser restaurado após confirmação.
  await progressPage.locator('#brand').click();
  const downloadPromise=progressPage.waitForEvent('download');
  await progressPage.locator('#exportProgressButton').click();
  const download=await downloadPromise;
  assert.match(download.suggestedFilename(),/logiclab-progresso-\d{4}-\d{2}-\d{2}\.json/);
  const {readFileSync}=await import('node:fs');
  const backup=JSON.parse(readFileSync(await download.path(),'utf8'));
  assert.equal(backup.format,'logiclab-backup');
  assert.equal(JSON.parse(backup.data.logiclab_curso_formal_v2).lessons.fundamentos.mastered,true);
  await progressPage.evaluate(()=>localStorage.removeItem('logiclab_curso_formal_v2'));
  progressPage.on('dialog',dialog=>dialog.accept());
  await Promise.all([
    progressPage.waitForEvent('load'),
    progressPage.locator('#importProgressFile').setInputFiles({name:'progresso.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(backup))})
  ]);
  const restored=await progressPage.evaluate(()=>JSON.parse(localStorage.getItem('logiclab_curso_formal_v2')).lessons.fundamentos);
  assert.equal(restored.mastered,true);
  assert.equal(restored.review.completed,0);
  assert.deepEqual(progressErrors,[]);
  await progressContext.close();


  // Ciclo 7: aprovação inicial e consolidação aparecem em barras distintas.
  const indicatorContext=await browser.newContext({viewport:{width:375,height:812},isMobile:true,hasTouch:true});
  const indicatorPage=await indicatorContext.newPage();
  const indicatorErrors=[];
  indicatorPage.on('pageerror',error=>indicatorErrors.push(error.message));
  await indicatorPage.goto(root,{waitUntil:'networkidle'});
  await indicatorPage.evaluate(()=>{
    const ids=['fundamentos','operadores','traducao','falacias','compostas','demorgan','classificacao','equivalencias','argumentos','arvores','silogismos','provas','deducao','categoricos','predicados2','metateoria','modais'];
    const dueAt=Date.now()+86400000;
    const lessons=Object.fromEntries(ids.map(id=>[id,{read:true,example:true,guided:true,independent:true,mastered:true,best:1,review:{completed:0,dueAt,consolidated:false}}]));
    localStorage.setItem('logiclab_curso_formal_v2',JSON.stringify({lessons,final:{}}));
  });
  await indicatorPage.reload({waitUntil:'networkidle'});
  assert.equal(await indicatorPage.locator('#courseHomeApprovedBar').getAttribute('aria-valuenow'),'17');
  assert.equal(await indicatorPage.locator('#courseHomeConsolidatedBar').getAttribute('aria-valuenow'),'0');
  assert.match(await indicatorPage.locator('#continueTitle').innerText(),/Consolidação em andamento/);
  assert.match(await indicatorPage.locator('#continueDescription').innerText(),/Próxima revisão/);
  await indicatorPage.locator('#continueButton').click();
  assert.equal(await indicatorPage.locator('.course-review-schedule-item').count(),17);
  assert.match(await indicatorPage.locator('.course-review-schedule-item').first().innerText(),/\d\d:\d\d/);
  await indicatorPage.locator('#courseMap [data-caction="exam-open"]').click();
  const examDraft=await indicatorPage.evaluate(()=>JSON.parse(localStorage.getItem('logiclab_final_exam_draft_v1')));
  for(let i=0;i<examDraft.questions.length;i++){
    const item=examDraft.questions[i];
    const wrong=(item.correct+1)%item.options.length;
    await indicatorPage.locator(`input[name="finalq-${i}"][value="${wrong}"]`).check();
  }
  await indicatorPage.locator('[data-caction="exam-submit"]').click();
  assert.match(await indicatorPage.locator('#courseExam .course-course-result').innerText(),/Avaliação integrada pendente/);
  assert.equal(await indicatorPage.locator('.exam-study-plan [data-caction="lesson"]').count()>0,true);
  await indicatorPage.locator('.exam-study-plan [data-caction="lesson"]').first().click();
  assert.equal(await indicatorPage.locator('#courseLesson').isVisible(),true);
  assert.match(indicatorPage.url(),/#aula-/);
  assert.deepEqual(indicatorErrors,[]);
  await indicatorContext.close();

  // Ciclo 7: melhorar a correção não substitui a primeira tentativa na validação da etapa.
  const scoringContext=await browser.newContext({viewport:{width:375,height:812},isMobile:true,hasTouch:true});
  const scoringPage=await scoringContext.newPage();
  const scoringErrors=[];
  scoringPage.on('pageerror',error=>scoringErrors.push(error.message));
  await scoringPage.goto(root,{waitUntil:'networkidle'});
  await scoringPage.evaluate(()=>{
    localStorage.setItem('logiclab_curso_formal_v2',JSON.stringify({
      lessons:{fundamentos:{read:true,example:true,guided:true,independent:false,mastered:false,best:0}},final:{}
    }));
  });
  await scoringPage.reload({waitUntil:'networkidle'});
  await scoringPage.goto(root+'#aula-fundamentos',{waitUntil:'networkidle'});
  await scoringPage.locator('[data-caction="independent"]').click();
  await scoringPage.locator('#checkButton').click();
  assert.match(await scoringPage.locator('.attempt-outcome').innerText(),/Etapa ainda pendente/);
  assert.match(await scoringPage.locator('.feedback-metric').nth(1).innerText(),/0%/);
  const expectedValue=(await scoringPage.locator('#truthTable .cell .expected').first().innerText()).trim();
  await scoringPage.locator('#truthTable button.cell').first().click();
  if(expectedValue==='F')await scoringPage.locator('#truthTable button.cell').first().click();
  await scoringPage.locator('#checkButton').click();
  assert.match(await scoringPage.locator('.attempt-outcome').innerText(),/Etapa ainda pendente/);
  assert.match(await scoringPage.locator('.feedback-metric').nth(1).innerText(),/0%/);
  assert.deepEqual(scoringErrors,[]);
  await scoringContext.close();

  // Auditoria de composição: desktop e mobile devem mostrar orientação contextual
  // somente na página inicial, em vez de duplicá-la no mapa e na aula.
  const desktopContext=await browser.newContext({viewport:{width:1280,height:800}});
  const desktopPage=await desktopContext.newPage();
  await desktopPage.goto(root,{waitUntil:'networkidle'});
  assert.equal(await desktopPage.locator('#continueLearning').isVisible(),true);
  await desktopPage.locator('#topCourse').click();
  assert.equal(await desktopPage.locator('#courseMap').isVisible(),true);
  assert.equal(await desktopPage.locator('#courseNext').count(),0);
  await desktopPage.locator('#courseMap [data-caction="lesson"]').first().click();
  assert.equal(await desktopPage.locator('#courseLesson').isVisible(),true);
  assert.equal(await desktopPage.locator('#courseNext').count(),0);
  await desktopPage.locator('#courseHomeBack').click();
  assert.equal(await desktopPage.locator('#continueLearning').isVisible(),true);
  await desktopContext.close();

  // Critério de usabilidade: em cada tela, localização, tarefa e caminhos de saída
  // devem estar explícitos SEM uma segunda caixa de "Próximo passo".
  for(const width of [375,1280]){
    const journeyContext=await browser.newContext({viewport:{width,height:812}});
    const journey=await journeyContext.newPage();
    const journeyErrors=[];
    journey.on('pageerror',error=>journeyErrors.push(error.message));

    await journey.goto(root,{waitUntil:'networkidle'});
    assert.match(await journey.locator('#homeView .hero .eyebrow').innerText(),/INÍCIO/);
    assert.match(await journey.locator('#homeView .hero p').innerText(),/Escolha a próxima etapa/);
    assert.equal(await journey.locator('#continueButton').isVisible(),true);

    await journey.goto(root+'#curso',{waitUntil:'networkidle'});
    assert.match(await journey.locator('#courseLocation').innerText(),/MAPA DAS UNIDADES/);
    assert.match(await journey.locator('#courseDescription').innerText(),/Escolha uma aula/);
    assert.equal(await journey.locator('#courseMap [data-caction="lesson"]').count()>0,true);
    assert.equal(await journey.locator('#courseMap [data-caction="exam-open"]').getAttribute('class'),'button');
    assert.equal(await journey.locator('#courseNext').count(),0);

    await journey.locator('#courseMap [data-caction="lesson"]').first().click();
    assert.match(await journey.locator('#courseLocation').innerText(),/AULA/);
    assert.match(await journey.locator('#courseDescription').innerText(),/Leia/);
    assert.equal(await journey.locator('#courseLesson [data-caction="map"]').isVisible(),true);
    assert.equal(await journey.locator('#courseLesson [data-caction="read"]').isVisible(),true);

    await journey.locator('#courseLesson [data-caction="read"]').click();
    await journey.locator('#courseLesson [data-caction="example"]').click();
    await journey.locator('#courseLesson [data-caction="guided"]').click();
    assert.match(await journey.locator('#workLocation').innerText(),/PRÁTICA COM AJUDA/);
    assert.match(await journey.locator('#workDescription').innerText(),/Corrigir/);
    assert.match(await journey.locator('#backButton').innerText(),/Voltar à aula/);
    await journey.locator('#checkButton').click();
    assert.match(await journey.locator('#workDescription').innerText(),/Confira a correção/);
    assert.equal(await journey.locator('#feedbackNextActions button').count()>0,true);
    await journey.locator('#backButton').click();
    assert.match(await journey.locator('#courseLocation').innerText(),/AULA/);

    // Outro tema evita confundir a tentativa guiada salva com uma prática livre.
    await journey.goto(root+'#operadores',{waitUntil:'networkidle'});
    assert.match(await journey.locator('#workLocation').innerText(),/PRÁTICA LIVRE/);
    assert.match(await journey.locator('#workDescription').innerText(),/módulos/);
    assert.match(await journey.locator('#backButton').innerText(),/Voltar aos módulos/);

    await journey.goto(root+'#avaliacao-final',{waitUntil:'networkidle'});
    assert.match(await journey.locator('#courseLocation').innerText(),/AVALIAÇÃO FINAL/);
    assert.match(await journey.locator('#courseDescription').innerText(),/12 questões/);
    assert.match(await journey.locator('#courseDescription').innerText(),/Volte ao mapa/);
    assert.equal(await journey.locator('#courseExam [data-caction="map"]').first().isVisible(),true);
    assert.equal(await journey.locator('#courseNext').count(),0);
    assert.deepEqual(journeyErrors,[]);
    await journeyContext.close();
  }


  // Ciclo 10: a primeira unidade precisa ensinar antes de avaliar.
  // A pergunta formativa permite errar, compreender e tentar novamente sem alterar a nota.
  for(const width of [375,1280]){
    const pedagogyContext=await browser.newContext({viewport:{width,height:812}});
    const pedagogy=await pedagogyContext.newPage();
    const errors=[];
    pedagogy.on('pageerror',error=>errors.push(error.message));
    for(const id of ['fundamentos','operadores','traducao','falacias']){
      await pedagogy.goto(root+'#aula-'+id,{waitUntil:'networkidle'});
      assert.equal(await pedagogy.locator('#courseLesson').isVisible(),true);
      assert.equal(await pedagogy.locator('#courseLesson .reading-section').count(),3);
      assert.equal(await pedagogy.locator('#courseLesson .reading-check-option').count(),3);
      assert.equal(await pedagogy.locator('#courseLesson .reading-objective').isVisible(),true);
      assert.equal(await pedagogy.locator('#courseLesson .reading-summary').isVisible(),true);
      assert.equal(await pedagogy.locator('#courseLesson .reading-distinction').isVisible(),true);
      assert.equal(await pedagogy.locator('#courseNext').count(),0);

      await pedagogy.locator('[data-caction="reading-check"]').click();
      assert.match(await pedagogy.locator('[data-reading-feedback]').innerText(),/Selecione uma alternativa/);
      const lesson=await pedagogy.evaluate(async id=>{
        const m=await import('./src/content/reading-unit1.js');
        return m.UNIT1_READINGS[id].check;
      },id);
      const wrong=(lesson.correct+1)%lesson.options.length;
      await pedagogy.locator(`input[name="reading-check"][value="${wrong}"]`).check();
      await pedagogy.locator('[data-caction="reading-check"]').click();
      assert.match(await pedagogy.locator('[data-reading-feedback]').innerText(),/Ainda não/);
      await pedagogy.locator(`input[name="reading-check"][value="${lesson.correct}"]`).check();
      await pedagogy.locator('[data-caction="reading-check"]').click();
      assert.match(await pedagogy.locator('[data-reading-feedback]').innerText(),/Isso mesmo/);
      assert.equal(await pedagogy.locator('[data-reading-feedback]').getAttribute('data-result'),'correct');
      const before=await pedagogy.evaluate(id=>JSON.parse(localStorage.getItem('logiclab_curso_formal_v2'))?.lessons?.[id]?.read||false,id);
      assert.equal(before,false,'a checagem sem nota não registra conclusão da leitura');
      await pedagogy.locator('[data-caction="read"]').click();
      assert.equal(await pedagogy.locator('[data-caction="example"]').isVisible(),true);
      const order=await pedagogy.locator('#courseLesson > section').evaluateAll(els=>els.map(x=>x.querySelector('h3')?.textContent||''));
      const exampleIndex=order.findIndex(x=>x.includes('2. Observar'));
      const advancedIndex=order.findIndex(x=>x.includes('Para ir além:'));
      if(advancedIndex>=0)assert.ok(advancedIndex>exampleIndex,'aprofundamento deve vir depois do exemplo básico');
    }
    assert.deepEqual(errors,[]);
    await pedagogyContext.close();
  }

  console.log('Smoke test de UX aprovado: progresso, grupos, histórico, células e viewport móvel.');
  await context.close();
}catch(error){
  console.error(error);
  process.exitCode=1;
}finally{
  await browser?.close();
  server.kill('SIGTERM');
}
