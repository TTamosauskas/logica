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
  assert.equal(await page.locator('.practice-group').count(),8);
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
  assert.match(await progressPage.locator('#courseHomeSummary').innerText(),/1 de 23 avaliações aprovadas · 0 consolidados/);
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
    const ids=['fundamentos','operadores','traducao','falacias','pressupostos','compostas','demorgan','classificacao','equivalencias','argumentos','arvores','silogismos','provas','deducao','categoricos','categoricos2','predicados2','inducao','abducao','probabilidade','causalidade','metateoria','modais'];
    const dueAt=Date.now()+86400000;
    const lessons=Object.fromEntries(ids.map(id=>[id,{read:true,example:true,guided:true,independent:true,mastered:true,best:1,review:{completed:0,dueAt,consolidated:false}}]));
    localStorage.setItem('logiclab_curso_formal_v2',JSON.stringify({lessons,final:{}}));
  });
  await indicatorPage.reload({waitUntil:'networkidle'});
  assert.equal(await indicatorPage.locator('#courseHomeApprovedBar').getAttribute('aria-valuenow'),'23');
  assert.equal(await indicatorPage.locator('#courseHomeConsolidatedBar').getAttribute('aria-valuenow'),'0');
  assert.match(await indicatorPage.locator('#continueTitle').innerText(),/Consolidação em andamento/);
  assert.match(await indicatorPage.locator('#continueDescription').innerText(),/Próxima revisão/);
  await indicatorPage.locator('#continueButton').click();
  assert.equal(await indicatorPage.locator('.course-review-schedule-item').count(),23);
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


  // O cabeçalho permanece, alternando entre olho aberto e riscado no próprio título.
  for(const width of [375,1280]){
    const focusContext=await browser.newContext({viewport:{width,height:812}});
    const focus=await focusContext.newPage(),focusErrors=[];
    focus.on('pageerror',e=>focusErrors.push(e.message));
    await focus.goto(root+'#compostas',{waitUntil:'networkidle'});
    const table=focus.locator('#truthTable');
    const originalColumns=await table.locator('thead th').count();
    const originalCells=await table.locator('.cell').count();
    const originalRows=await table.locator('tbody tr').count();
    assert.ok(originalColumns>=3&&originalCells>0);
    assert.equal(await focus.locator('#columnVisibility').count(),0,'A faixa redundante não deve existir');
    assert.equal(await table.locator('[data-toggle-col]').count(),originalColumns);
    assert.equal(await table.locator('[data-toggle-col][aria-pressed="true"]').count(),originalColumns);
    const originalColumn=await table.locator('.cell').first().getAttribute('data-c');
    assert.notEqual(originalColumn,'0','Primeiro campo editável não deve ser uma variável de entrada');
    await table.locator('.cell').first().click();
    const draft=()=>focus.evaluate(()=>JSON.parse(localStorage.getItem('logiclab_exercise_drafts_v1')).byMode.compostas.exercise);
    assert.equal((await draft()).answers['0-'+originalColumn],'V');
    const firstHead=table.locator('thead th').first();
    // O controle de qualquer variável de entrada também pode ser usado pelo teclado.
    await table.locator('[data-toggle-col="0"]').focus();
    await focus.keyboard.press('Enter');
    assert.equal(await table.locator('thead th').count(),originalColumns);
    assert.equal(await firstHead.getAttribute('class')?.then(s=>s.includes('truth-col-collapsed')),true);
    assert.equal(await firstHead.locator('[data-toggle-col="0"]').getAttribute('aria-pressed'),'false');
    assert.match(await firstHead.locator('[data-toggle-col="0"]').getAttribute('aria-label'),/Mostrar coluna/);
    assert.equal(await firstHead.locator('.truth-col-short').isVisible(),true);
    assert.equal(await firstHead.locator('svg path[d="M3 3l18 18"]').count(),1);
    assert.ok((await firstHead.evaluate(el=>el.getBoundingClientRect().width))<=65);
    assert.equal(await table.locator('tbody tr').first().locator('td').count(),originalColumns);
    assert.equal(await table.locator('.truth-cell-collapsed').count(),originalRows);
    assert.equal(await focus.evaluate(()=>document.activeElement?.dataset.toggleCol),'0');
    // A coluna intermediária desaparece do corpo, mas conserva cabeçalho e respostas.
    await table.locator('[data-toggle-col="'+originalColumn+'"]').click();
    assert.equal(await table.locator('thead th.truth-col-collapsed').count(),2);
    assert.equal(await table.locator('.cell[data-c="'+originalColumn+'"]').count(),0);
    assert.equal((await draft()).answers['0-'+originalColumn],'V');
    assert.equal(await table.locator('thead th').count(),originalColumns);
    await focus.reload({waitUntil:'networkidle'});
    assert.deepEqual((await draft()).hiddenColumns,[0,Number(originalColumn)].sort((a,b)=>a-b));
    assert.equal(await table.locator('thead th.truth-col-collapsed').count(),2);
    // Reabrir pelo próprio olho riscado recupera a resposta digitada.
    await table.locator('[data-toggle-col="'+originalColumn+'"]').click();
    assert.equal(await table.locator('.cell[data-r="0"][data-c="'+originalColumn+'"]').innerText(),'V');
    assert.equal(await table.locator('[data-toggle-col="'+originalColumn+'"]').getAttribute('aria-pressed'),'true');
    assert.equal(await table.locator('thead th.truth-col-collapsed').count(),1);
    const restoredCell=table.locator('.cell[data-r="0"][data-c="'+originalColumn+'"]');
    await restoredCell.focus();
    await focus.keyboard.press('ArrowDown');
    assert.equal(await focus.evaluate(()=>document.activeElement?.dataset.r),'1');
    assert.equal(await focus.evaluate(()=>document.activeElement?.dataset.c),originalColumn);
    // Até com todas as colunas recolhidas, os cabeçalhos permanecem clicáveis.
    const toHide=await table.locator('[data-toggle-col][aria-pressed="true"]').evaluateAll(els=>els.map(el=>el.dataset.toggleCol));
    for(const index of toHide)await table.locator('[data-toggle-col="'+index+'"]').click();
    assert.equal(await table.locator('thead th').count(),originalColumns);
    assert.equal(await table.locator('thead th.truth-col-collapsed').count(),originalColumns);
    assert.equal(await table.locator('.cell').count(),0);
    assert.equal(await table.locator('tbody tr').count(),originalRows);
    await focus.locator('#checkButton').click();
    assert.equal((await draft()).answers['0-'+originalColumn],'V');
    assert.ok((await draft()).grade.total>=originalCells,'A correção avalia também as células ocultas');
    for(let i=0;i<originalColumns;i++)await table.locator('[data-toggle-col="'+i+'"]').click();
    assert.equal(await table.locator('thead th.truth-col-collapsed').count(),0);
    assert.equal(await table.locator('.cell').count(),originalCells);
    assert.equal((await draft()).hiddenColumns.length,0);
    await focus.locator('#newButton').click();
    assert.equal(await table.locator('thead th.truth-col-collapsed').count(),0);
    assert.deepEqual(focusErrors,[]);
    const overflow=await focus.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
    assert.ok(overflow<=2,'Cabeçalhos compactos excederam o viewport de '+width+'px');
    await focusContext.close();
  }

  // Ciclos 10–13: todas as 23 aulas devem ensinar antes de avaliar.
  // A pergunta formativa permite errar, compreender e tentar novamente sem alterar a nota.
  for(const width of [375,1280]){
    const pedagogyContext=await browser.newContext({viewport:{width,height:812}});
    const pedagogy=await pedagogyContext.newPage();
    const errors=[];
    pedagogy.on('pageerror',error=>errors.push(error.message));
    for(const id of ['fundamentos','operadores','traducao','falacias','pressupostos','compostas','demorgan','classificacao','equivalencias','argumentos','arvores','silogismos','provas','deducao','categoricos','categoricos2','predicados2','inducao','abducao','probabilidade','causalidade','metateoria','modais']){
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
        const unit1=new Set(['fundamentos','operadores','traducao','falacias']);
        const unit2=new Set(['compostas','demorgan','classificacao','equivalencias','argumentos','arvores']);
        const unit3=new Set(['silogismos','provas','deducao']);
        const path=['inducao','abducao','probabilidade','causalidade'].includes(id)?'./src/content/reading-unit13.js'
          :['pressupostos','categoricos2'].includes(id)?'./src/content/reading-unit12.js'
          :unit1.has(id)?'./src/content/reading-unit1.js'
          :unit2.has(id)?'./src/content/reading-unit2.js'
          :unit3.has(id)?'./src/content/reading-unit3.js'
          :'./src/content/reading-units4to6.js';
        const module=await import(path);
        return Object.values(module)[0][id].check;
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

  // Ciclo 12: duas novas competências com prática e avaliação integradas.
  for(const width of [375,1280]){
    const context12=await browser.newContext({viewport:{width,height:812},isMobile:width===375,hasTouch:width===375});
    const applied=await context12.newPage();
    const errors12=[];
    applied.on('pageerror',error=>errors12.push(error.message));
    await applied.goto(root,{waitUntil:'networkidle'});
    assert.match(await applied.locator('#courseHomeApprovedLabel').innerText(),/0 de 23/);
    await applied.goto(root+'#curso',{waitUntil:'networkidle'});
    assert.equal(await applied.locator('#courseMap .course-unit-item').count(),23);
    for(const id of ['pressupostos','categoricos2']){
      await applied.goto(root+'#aula-'+id,{waitUntil:'networkidle'});
      assert.equal(await applied.locator('#courseLesson .reading-section').count(),3);
      assert.match(await applied.locator('#courseLocation').innerText(),/AULA/);
      if(id==='categoricos2'){
        const lab=applied.locator('[data-square-lab]');
        assert.equal(await lab.isVisible(),true);
        assert.equal(await lab.locator('svg[role="img"]').count(),1);
        assert.equal(await lab.locator('.square-form').count(),4);
        assert.equal(await lab.locator('[data-square-answer]').count(),3);
        await applied.locator('[data-caction="square-check"]').click();
        assert.match(await lab.locator('[data-square-feedback]').innerText(),/Escolha um resultado/);
        for(const select of await lab.locator('[data-square-answer]').all())await select.selectOption('V');
        await applied.locator('[data-caction="square-check"]').click();
        assert.match(await lab.locator('[data-square-feedback]').innerText(),/inferências corretas/);
        const selectAnswers=async()=>{
          const values=await applied.evaluate(async()=>{
            const m=await import('./src/core/opposition-square.js');
            const lab=document.querySelector('[data-square-lab]');
            const [known,flag]=lab.querySelector('[data-square-given]').value.split(':');
            return m.squareConsequences(lab.querySelector('[data-square-mode]').value,known,flag==='1');
          });
          for(const [key,value] of Object.entries(values)){
            const select=lab.locator(`[data-square-answer="${key}"]`);
            if(await select.count())await select.selectOption(value);
          }
        };
        await selectAnswers();
        await applied.locator('[data-caction="square-check"]').click();
        assert.match(await lab.locator('[data-square-feedback]').innerText(),/3 de 3 inferências corretas/);
        await lab.locator('[data-square-mode]').selectOption('traditional');
        assert.equal(await lab.getAttribute('data-mode'),'traditional');
        assert.match(await lab.locator('[data-square-relations]').innerText(),/subalternação/);
        await selectAnswers();
        await applied.locator('[data-caction="square-check"]').click();
        assert.match(await lab.locator('[data-square-feedback]').innerText(),/3 de 3 inferências corretas/);
        const readState=await applied.evaluate(()=>JSON.parse(localStorage.getItem('logiclab_curso_formal_v2'))?.lessons?.categoricos2?.read||false);
        assert.equal(readState,false,'laboratório não valida a leitura nem concede aprovação automaticamente');
        await lab.locator('[data-square-mode]').selectOption('modern');
        assert.match(await lab.locator('[data-square-relations]').innerText(),/apenas A–O e E–I/);
      }
      await applied.locator('[data-caction="read"]').click();
      await applied.locator('[data-caction="example"]').click();
      await applied.locator('[data-caction="guided"]').click();
      assert.match(await applied.locator('#workLocation').innerText(),/PRÁTICA COM AJUDA/);
      assert.equal(await applied.locator('#specialArea').isVisible(),true);
      const questionCount=id==='categoricos2'?4:3;
      assert.equal(await applied.locator('#specialArea [data-special-field]').count(),questionCount);
      if(id==='categoricos2')assert.match(await applied.locator('#specialArea').innerText(),/No regime/);
      assert.match(await applied.locator('#workDescription').innerText(),/Corrigir/);
      for(let j=0;j<questionCount;j++){
        const select=applied.locator(`#specialArea [data-special-field="${j}"]`);
        await select.selectOption({index:1});
      }
      await applied.locator('#checkButton').click();
      assert.equal(await applied.locator('#feedbackArea').isVisible(),true);
      assert.equal(await applied.locator('#specialArea .course-question-explanation').count(),questionCount);
      await applied.locator('#backButton').click();
      assert.equal(await applied.locator('#courseLesson').isVisible(),true);
    }
    await applied.goto(root+'#avaliacao-final',{waitUntil:'networkidle'});
    const covered=await applied.evaluate(()=>JSON.parse(localStorage.getItem('logiclab_final_exam_draft_v1')).questions.map(q=>q.id));
    assert.equal(covered.length,12);
    assert.ok(covered.includes('pressupostos'));
    assert.ok(covered.includes('categoricos2'));
    assert.equal(new Set(covered).size,12);
    assert.deepEqual(errors12,[]);
    await context12.close();
  }

  // Ciclo 13: prática guiada e autônoma das quatro novas competências e cobertura da prova.
  for(const width of [375,1280]){
    const newContext=await browser.newContext({viewport:{width,height:812}});
    const applied13=await newContext.newPage(),pageErrors=[];
    applied13.on('pageerror',err=>pageErrors.push(err.message));
    await applied13.goto(root,{waitUntil:'networkidle'});
    assert.match(await applied13.locator('#courseHomeApprovedLabel').innerText(),/0 de 23/);
    await applied13.goto(root+'#curso',{waitUntil:'networkidle'});
    assert.equal(await applied13.locator('#courseMap .course-unit').count()>=7,true);
    for(const id of ['inducao','abducao','probabilidade','causalidade']){
      await applied13.goto(root+'#aula-'+id,{waitUntil:'networkidle'});
      assert.equal(await applied13.locator('#courseLesson').isVisible(),true);
      assert.equal(await applied13.locator('.reading-section').count(),3);
      assert.match(await applied13.locator('#courseLocation').innerText(),/AULA/);
      await applied13.locator('[data-caction="read"]').click();
      assert.equal(await applied13.locator('#courseLesson [data-caction="example"]').count(),1);
      await applied13.locator('[data-caction="example"]').click();
      await applied13.locator('[data-caction="guided"]').click();
      assert.match(await applied13.locator('#workLocation').innerText(),/PRÁTICA COM AJUDA/);
      assert.equal(await applied13.locator('#specialArea [data-special-field]').count(),4);
      if(id==='probabilidade'){
        assert.match(await applied13.locator('#specialArea').innerText(),/positivos/);
        assert.match(await applied13.locator('#specialArea').innerText(),/proporção/);
      }
      for(let i=0;i<4;i++)await applied13.locator(`#specialArea [data-special-field="${i}"]`).selectOption({index:1});
      await applied13.locator('#checkButton').click();
      assert.equal(await applied13.locator('#specialArea .course-question-explanation').count(),4);
      assert.equal(await applied13.locator('#feedbackArea').isVisible(),true);
      await applied13.locator('#backButton').click();
      assert.equal(await applied13.locator('#courseLesson').isVisible(),true);
    }
    // Uma atividade independente também é acessível a quem já concluiu a prática guiada.
    await applied13.evaluate(()=>{
      const state=JSON.parse(localStorage.getItem('logiclab_curso_formal_v2'));
      state.lessons.probabilidade={read:true,example:true,guided:true,independent:false,mastered:false,best:0};
      localStorage.setItem('logiclab_curso_formal_v2',JSON.stringify(state));
    });
    await applied13.goto(root+'#aula-probabilidade',{waitUntil:'networkidle'});
    await applied13.reload({waitUntil:'networkidle'}); // recarrega progresso simulado da persistência
    await applied13.locator('[data-caction="independent"]').click();
    assert.match(await applied13.locator('#workLocation').innerText(),/PRÁTICA INDEPENDENTE/);
    assert.equal(await applied13.locator('#specialArea [data-special-field]').count(),4);
    await applied13.locator('#backButton').click();
    // Aluno com as 19 aulas anteriores aprovadas mantém o histórico.
    await applied13.evaluate(()=>{
      const old=['fundamentos','operadores','traducao','falacias','pressupostos','compostas','demorgan','classificacao','equivalencias','argumentos','arvores','silogismos','provas','deducao','categoricos','categoricos2','predicados2','metateoria','modais'];
      localStorage.setItem('logiclab_curso_formal_v2',JSON.stringify({lessons:Object.fromEntries(old.map(id=>[id,{read:true,example:true,guided:true,independent:true,mastered:true,best:1}])),final:{}}));
    });
    await applied13.goto(root,{waitUntil:'networkidle'});
    await applied13.reload({waitUntil:'networkidle'});
    assert.match(await applied13.locator('#courseHomeSummary').innerText(),/19 de 23 avaliações aprovadas/);
    await applied13.goto(root+'#avaliacao-final',{waitUntil:'networkidle'});
    const exam=await applied13.evaluate(()=>JSON.parse(localStorage.getItem('logiclab_final_exam_draft_v1')));
    assert.equal(exam.questions.length,12);
    const represented=new Set(exam.questions.map(q=>q.id));
    for(const id of ['pressupostos','categoricos2','inducao','abducao','probabilidade','causalidade'])assert.ok(represented.has(id),'Tema ausente da prova: '+id);
    assert.equal(represented.size,12);
    assert.deepEqual(pageErrors,[]);
    await newContext.close();
  }

  // Ciclo 14: verificação das competências refinadas nas seis etapas existentes.
  for(const width of [375,1280]){
    const context14=await browser.newContext({viewport:{width,height:812},isMobile:width===375,hasTouch:width===375});
    const app14=await context14.newPage(),errors14=[];
    app14.on('pageerror',e=>errors14.push(e.message));
    await app14.goto(root,{waitUntil:'networkidle'});
    // Etapas disponíveis e concluídas servem como índice clicável, sem pular pré-requisitos.
    await app14.goto(root+'#aula-fundamentos',{waitUntil:'networkidle'});
    assert.equal(await app14.locator('#courseLesson nav[aria-label="Etapas da aula"]').count(),1);
    assert.equal(await app14.locator('#courseLesson .course-lesson-flow button[data-caction="stage"]').count(),1);
    assert.equal(await app14.locator('#courseLesson .course-lesson-flow .locked').count(),4);
    assert.equal(await app14.locator('#courseLesson .course-lesson-flow .locked svg.course-stage-lock[aria-hidden="true"]').count(),4);
    assert.equal(await app14.locator('#courseLesson .course-lesson-flow .locked svg.course-stage-lock').first().evaluate(svg=>Math.round(svg.getBoundingClientRect().width)),12);
    assert.equal(await app14.locator('#course-stage-2').count(),0);
    const lessonRoute=app14.url();
    await app14.locator('#courseLesson .course-lesson-flow button[data-stage="1"]').focus();
    await app14.keyboard.press('Enter');
    assert.equal(await app14.evaluate(()=>document.activeElement?.textContent),'1. Compreender');
    assert.equal(app14.url(),lessonRoute);
    await app14.locator('[data-caction="read"]').click();
    assert.equal(await app14.locator('#courseLesson .course-lesson-flow button[data-caction="stage"]').count(),2);
    assert.equal(await app14.locator('#courseLesson .course-lesson-flow button.done').count(),1);
    assert.equal(await app14.locator('#courseLesson .course-lesson-flow .locked svg.course-stage-lock').count(),3);
    await app14.locator('#courseLesson .course-lesson-flow button[data-stage="2"]').click();
    assert.match(await app14.evaluate(()=>document.activeElement?.textContent),/2. Observar um exemplo resolvido/);
    await app14.waitForFunction(()=>{const p=document.querySelector('#course-stage-2');const y=p?.getBoundingClientRect().top;return Number.isFinite(y)&&y>=0&&y<160});
    assert.equal(app14.url(),lessonRoute);
    const progressAfterJump=await app14.evaluate(()=>JSON.parse(localStorage.getItem('logiclab_curso_formal_v2')).lessons.fundamentos);
    assert.equal(progressAfterJump.read,true);
    assert.equal(progressAfterJump.example,false);
    await app14.locator('#courseLesson .course-lesson-flow button[data-stage="1"]').click();
    assert.equal(await app14.evaluate(()=>document.activeElement?.textContent),'1. Compreender');
    assert.equal(app14.url(),lessonRoute);
    await app14.goto(root,{waitUntil:'networkidle'});
    assert.match(await app14.locator('#courseHomeApprovedLabel').innerText(),/0 de 23/);
    for(const id of ['predicados2','metateoria']){
      await app14.goto(root+'#aula-'+id,{waitUntil:'networkidle'});
      assert.equal(await app14.locator('#courseLesson .reading-section').count(),3);
      await app14.locator('[data-caction="read"]').click();
      await app14.locator('[data-caction="example"]').click();
      await app14.locator('[data-caction="guided"]').click();
      assert.equal(await app14.locator('#specialArea [data-special-field]').count(),5);
      if(id==='predicados2')assert.match(await app14.locator('#specialArea').innerText(),/unicidade|exatamente uma/);
      if(id==='metateoria')assert.match(await app14.locator('#specialArea').innerText(),/Gödel|sound|parada/);
      for(let i=0;i<5;i++)await app14.locator(`#specialArea [data-special-field="${i}"]`).selectOption({index:1});
      await app14.locator('#checkButton').click();
      assert.equal(await app14.locator('#specialArea .course-question-explanation').count(),5);
      await app14.locator('#backButton').click();
      assert.equal(await app14.locator('#courseLesson').isVisible(),true);
      // Aluno concluiu prática autônoma; nova rubrica mede conceito e aplicação.
      await app14.evaluate(id=>{
        const k='logiclab_curso_formal_v2',s=JSON.parse(localStorage.getItem(k));
        s.lessons[id]={read:true,example:true,guided:true,independent:true,mastered:false,best:0};
        localStorage.setItem(k,JSON.stringify(s));
      },id);
      await app14.reload({waitUntil:'networkidle'});
      let assessment=await app14.evaluate(id=>JSON.parse(localStorage.getItem('logiclab_curso_formal_v2')).lessons[id].assessmentV2.draft.questions,id);
      assert.equal(assessment.length,5);
      assert.equal(assessment.filter(q=>q.dimension==='concept').length,2);
      assert.equal(await app14.locator('#courseLesson input[name^="courseq-"]').count(),15);
      // Escolhas já realizadas devem sobreviver ao recarregamento.
      await app14.locator('input[name="courseq-0"][value="'+assessment[0].correct+'"]').check();
      await app14.reload({waitUntil:'networkidle'});
      assert.equal(await app14.locator('input[name="courseq-0"]:checked').inputValue(),String(assessment[0].correct));
      // Um erro conceitual reprova mesmo que o aluno consiga 4/5 no total.
      const wrong=assessment.findIndex(q=>q.dimension==='concept');
      for(let i=0;i<5;i++){
        const correct=assessment[i].correct;
        const value=i===wrong?(correct+1)%assessment[i].options.length:correct;
        await app14.locator('input[name="courseq-'+i+'"][value="'+value+'"]').check();
      }
      await app14.locator('[data-caction="lesson-quiz"]').click();
      assert.match(await app14.locator('.course-course-result').innerText(),/4\/5 no total · 1\/2 no conceito central/);
      const rejected=await app14.evaluate(id=>JSON.parse(localStorage.getItem('logiclab_curso_formal_v2')).lessons[id],id);
      assert.equal(rejected.mastered,false);
      assert.equal(rejected.assessmentV2.history.length,1);
      // Nova rodada, acerto geral e acerto conceitual.
      assessment=await app14.evaluate(id=>JSON.parse(localStorage.getItem('logiclab_curso_formal_v2')).lessons[id].assessmentV2.draft.questions,id);
      for(let i=0;i<5;i++)await app14.locator('input[name="courseq-'+i+'"][value="'+assessment[i].correct+'"]').check();
      await app14.locator('[data-caction="lesson-quiz"]').click();
      assert.match(await app14.locator('.course-course-result').innerText(),/5\/5 no total · 2\/2 no conceito central/);
      assert.match(await app14.locator('#courseLesson').innerText(),/6. Consolidar com revisões espaçadas/);
      const approved=await app14.evaluate(id=>JSON.parse(localStorage.getItem('logiclab_curso_formal_v2')).lessons[id],id);
      assert.equal(approved.mastered,true);
      assert.equal(approved.assessmentV2.history.length,2);
      // A sexta etapa aparece somente após aprovação e navega até a revisão agendada.
      assert.equal(await app14.locator('#courseLesson .course-lesson-flow button[data-stage="6"]').count(),1);
      const routeBeforeReview=app14.url();
      await app14.locator('#courseLesson .course-lesson-flow button[data-stage="6"]').click();
      assert.match(await app14.evaluate(()=>document.activeElement?.textContent),/6. Consolidar com revisões espaçadas/);
      assert.equal(app14.url(),routeBeforeReview);
      assert.equal(await app14.locator('#course-stage-6').count(),1);
      }
    await app14.goto(root+'#aula-equivalencias',{waitUntil:'networkidle'});
    await app14.evaluate(()=>{
      const k='logiclab_curso_formal_v2',s=JSON.parse(localStorage.getItem(k));
      s.lessons.equivalencias={read:true,example:true,guided:true,independent:false,mastered:false,best:0};
      localStorage.setItem(k,JSON.stringify(s));
    });
    await app14.reload({waitUntil:'networkidle'});
    await app14.locator('[data-caction="independent"]').click();
    assert.equal(await app14.locator('#specialArea [data-special-field]').count(),4);
    assert.match(await app14.locator('#specialArea').innerText(),/transformação|equivalência|interpretação/);
    for(let i=0;i<4;i++)await app14.locator(`#specialArea [data-special-field="${i}"]`).selectOption({index:1});
    await app14.locator('#checkButton').click();
    assert.equal(await app14.locator('#specialArea .course-question-explanation').count(),4);
    assert.deepEqual(errors14,[]);
    await context14.close();
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
