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
  assert.equal(await page.locator('.practice-group').count(),9);
  assert.equal(await page.locator('.practice-group').first().getAttribute('open'),'');
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
  assert.ok(overflow<=2,'A página inicial excedeu o viewport móvel em '+overflow+'px');

  await page.locator('#continueButton').click();
  await page.locator('#courseLesson').waitFor({state:'visible'});
  assert.match(await page.locator('#courseLesson').innerText(),/Fundamentos/);
  assert.equal(await page.locator('#continueLearning').isVisible(),false);
  assert.equal(await page.locator('#courseNext').count(),0);
  // Pedagogia V3: decisões entre trechos, diagnóstico do erro e pista opcional.
  assert.equal(await page.locator('[data-reading-bridge]').count(),3);
  const visibleLessonText=await page.locator('#courseLesson').innerText();
  for(const phrase of ["Aplique essa ideia antes de avançar. Não vale nota; a pista é opcional.","Uma pergunta opcional para verificar o exemplo; não vale nota.","Aplique o método do exemplo a uma tarefa nova. Consulte a dica sempre que precisar; após corrigir sua primeira tentativa, este estágio será registrado.","Resolva uma nova questão e alcance pelo menos 80% na primeira correção. O sistema registra esta etapa quando você completa a tentativa usando seu próprio raciocínio.","A avaliação tem cinco questões variáveis: duas conceituais e três de aplicação."]){
    assert.equal(visibleLessonText.includes(phrase),false,'Texto operacional deve ser removido');
  }
  assert.equal(await page.locator('.reading-handoff ol li').count(),3);
  const firstBridge=page.locator('[data-reading-bridge="0"]');
  await firstBridge.locator('input[value="0"]').check();
  await firstBridge.locator('[data-caction="bridge-check"]').click();
  assert.equal(await firstBridge.locator('[data-bridge-feedback]').getAttribute('data-result'),'retry');
  await firstBridge.locator('[data-caction="bridge-hint"]').click();
  assert.equal(await firstBridge.locator('[data-bridge-hint]').isVisible(),true);
  await firstBridge.locator('input[value="1"]').check();
  await firstBridge.locator('[data-caction="bridge-check"]').click();
  assert.equal(await firstBridge.locator('[data-bridge-feedback]').getAttribute('data-result'),'correct');
  // A questão mostrada depois de uma seção identifica explicitamente a ideia recém-estudada.
  assert.match(await firstBridge.locator('.reading-bridge-section').innerText(),/proposiç|frases/i);
  await page.goto(root+'#aula-condicionais_naturais',{waitUntil:'networkidle'});
  const sufficientBridge=page.locator('[data-reading-bridge="0"]');
  assert.match(await sufficientBridge.locator('.reading-bridge-section').innerText(),/Condição suficiente/);
  assert.match(await sufficientBridge.locator('.reading-check-question').innerText(),/inscrição/i);
  assert.doesNotMatch(await sufficientBridge.locator('.reading-check-question').innerText(),/somente se|necessária/i);
  await sufficientBridge.locator('input[value="1"]').check();
  await sufficientBridge.locator('[data-caction="bridge-check"]').click();
  assert.equal(await sufficientBridge.locator('[data-bridge-feedback]').getAttribute('data-result'),'correct');
  assert.match(await page.locator('[data-reading-bridge="1"] .reading-bridge-section').innerText(),/Condição necessária/);
  assert.match(await page.locator('[data-reading-bridge="1"] .reading-check-question').innerText(),/somente se/i);
  await page.goto(root+'#aula-fundamentos',{waitUntil:'networkidle'});
  const bridgeProgress=await page.evaluate(()=>JSON.parse(localStorage.getItem('logiclab_curso_formal_v2')||'{}').lessons?.fundamentos?.mastered||false);
  assert.equal(bridgeProgress,false,'Uma questão formativa não registra domínio');
  await page.locator('[data-caction="read"]').click();
  assert.equal(await page.locator('#courseLesson [data-caction="worked-next"]:visible').isVisible(),true);
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
  assert.match(await study.locator('#courseExerciseBanner').innerText(),/Você consultou uma dica/);
  draft=await study.evaluate(()=>JSON.parse(localStorage.getItem('logiclab_exercise_drafts_v1')));
  assert.equal(draft.byMode.fundamentos.courseAttempt.hintUsed,true);
  await study.locator('#checkButton').click();
  assert.equal(await study.locator('.feedback-assisted').isVisible(),true);
  await study.reload({waitUntil:'networkidle'});
  assert.equal(await study.locator('#inlineHint').isVisible(),true);
  assert.match(await study.locator('#courseExerciseBanner').innerText(),/Você consultou uma dica/);
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
  assert.equal(await access.evaluate(()=>document.activeElement?.dataset.caction),'worked-next');
  await finishWorkedExample(access);
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
  assert.match(await progressPage.locator('#courseHomeSummary').innerText(),/1 de 61 avaliações aprovadas · 0 consolidados/);
  assert.match(await progressPage.locator('#continueLabel').innerText(),/REVISÃO DISPONÍVEL/);
  await progressPage.locator('#heroNextStepButton').click();
  assert.match(progressPage.url(),/#aula-fundamentos$/);
  assert.equal(await progressPage.locator('[data-caction="review"]').count(),1);
  await progressPage.goto(root,{waitUntil:'networkidle'});
  await progressPage.locator('#continueButton').click();
  assert.equal(await progressPage.locator('[data-caction="review"]').count(),1);
  await progressPage.locator('[data-caction="review"]').click();
  assert.match(await progressPage.locator('#courseExerciseBanner').innerText(),/Revisão independente/);
  await progressPage.locator('#hintButton').click();
  assert.equal(await progressPage.locator('#independentHintDecision').isVisible(),true);
  await progressPage.locator('[data-hint-action="show"]').click();
  await progressPage.locator('#checkButton').click();
  assert.match(await progressPage.locator('#feedbackArea').innerText(),/Prática com ajuda/);
  const stateAfter=await progressPage.evaluate(()=>JSON.parse(localStorage.getItem('logiclab_curso_formal_v2')).lessons.fundamentos.review);
  assert.equal(stateAfter.completed,0);
  assert.equal(stateAfter.consolidated,false);

  // O rodapé de gestão manual foi removido, mas o progresso continua persistente.
  await progressPage.locator('#brand').click();
  assert.equal(await progressPage.locator('footer').count(),0);
  for(const selector of ['#exportProgressButton','#importProgressButton','#importProgressFile','#resetButton']){
    assert.equal(await progressPage.locator(selector).count(),0,selector+' não deve existir');
  }
  await progressPage.reload({waitUntil:'networkidle'});
  const retained=await progressPage.evaluate(()=>JSON.parse(localStorage.getItem('logiclab_curso_formal_v2')).lessons.fundamentos);
  assert.equal(retained.mastered,true);
  assert.equal(retained.review.completed,0);
  assert.deepEqual(progressErrors,[]);
  await progressContext.close();


  // Ciclo 7: aprovação inicial e consolidação aparecem em barras distintas.
  const indicatorContext=await browser.newContext({viewport:{width:375,height:812},isMobile:true,hasTouch:true});
  const indicatorPage=await indicatorContext.newPage();
  const indicatorErrors=[];
  indicatorPage.on('pageerror',error=>indicatorErrors.push(error.message));
  await indicatorPage.goto(root,{waitUntil:'networkidle'});
  await indicatorPage.evaluate(async ()=>{
    const {COURSE_UNITS}=await import('./src/content/course.js');
    const ids=COURSE_UNITS.flatMap(unit=>unit.ids);
    const dueAt=Date.now()+86400000;
    const lessons=Object.fromEntries(ids.map(id=>[id,{read:true,example:true,guided:true,independent:true,mastered:true,best:1,review:{completed:0,dueAt,consolidated:false}}]));
    localStorage.setItem('logiclab_curso_formal_v2',JSON.stringify({lessons,final:{}}));
  });
  await indicatorPage.reload({waitUntil:'networkidle'});
  assert.equal(await indicatorPage.locator('#courseHomeApprovedBar').getAttribute('aria-valuenow'),'61');
  assert.equal(await indicatorPage.locator('#courseHomeConsolidatedBar').getAttribute('aria-valuenow'),'0');
  assert.match(await indicatorPage.locator('#continueTitle').innerText(),/Consolidação em andamento/);
  assert.match(await indicatorPage.locator('#continueDescription').innerText(),/Próxima revisão/);
  await indicatorPage.locator('#continueButton').click();
  assert.equal(await indicatorPage.locator('.course-review-schedule-item').count(),61);
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
    assert.equal(await journey.locator('#heroNextStepButton').innerText(),'Próximo Passo');
    assert.equal(await journey.locator('#heroNextStepButton').isVisible(),true);
    await journey.locator('#heroNextStepButton').click();
    assert.match(journey.url(),/#aula-fundamentos$/,'Próximo Passo abre a primeira aula do currículo');
    assert.equal(await journey.locator('#courseLesson').isVisible(),true);

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
    await finishWorkedExample(journey);
    assert.equal(await journey.locator('#courseLesson .practice-transfer-prep li').count(),3);
    assert.match(await journey.locator('#courseLesson .practice-transfer-prep').innerText(),/Do exemplo ao seu exercício/);
    await journey.locator('#courseLesson [data-caction="guided"]').click();
    assert.match(await journey.locator('#workLocation').innerText(),/PRÁTICA COM AJUDA/);
    assert.equal(await journey.locator('#courseExerciseBanner .practice-transfer-steps li').count(),3);
    assert.match(await journey.locator('#courseExerciseBanner').innerText(),/Como começar este exercício/);
    const planPrecedesResponse=await journey.evaluate(()=>{
      const guide=document.getElementById('courseExerciseBanner');
      const help=document.getElementById('exerciseHelp');
      return Boolean(guide.compareDocumentPosition(help)&Node.DOCUMENT_POSITION_FOLLOWING);
    });
    assert.equal(planPrecedesResponse,true,'O roteiro precisa aparecer antes dos campos e dicas da questão');
    assert.equal(await journey.locator('#courseExerciseBanner .practice-transfer-example').getAttribute('open'),null);
    await journey.locator('#courseExerciseBanner .practice-transfer-example summary').click();
    assert.equal(await journey.locator('#courseExerciseBanner .practice-transfer-example li').count(),3);
    assert.match(await journey.locator('#courseExerciseBanner .practice-transfer-example').innerText(),/Por quê/);
    assert.ok(await journey.evaluate(()=>document.documentElement.scrollWidth-innerWidth)<=2,
      'Orientação no exercício não pode ampliar a largura no celular');
    assert.match(await journey.locator('#workDescription').innerText(),/Corrigir/);
    assert.match(await journey.locator('#backButton').innerText(),/Voltar à aula/);
    assert.equal(await journey.locator('#exerciseLessonLink').getAttribute('href'),'#aula-fundamentos');
    assert.equal(await journey.locator('#exerciseLessonLink').isVisible(),true);
    await journey.locator('#checkButton').click();
    assert.match(await journey.locator('#workDescription').innerText(),/Confira a correção/);
    assert.equal(await journey.locator('#feedbackNextActions button').count()>0,true);
    await journey.locator('#backButton').click();
    assert.match(await journey.locator('#courseLocation').innerText(),/AULA/);
    // O exercício anterior foi corrigido sem todas as respostas; não assumimos
    // domínio. Avançamos somente a etapa guiada nesta fixture de teste.
    await journey.evaluate(()=>{
      const key='logiclab_curso_formal_v2',state=JSON.parse(localStorage.getItem(key));
      state.lessons.fundamentos.guided=true;
      localStorage.setItem(key,JSON.stringify(state));
    });
    await journey.reload({waitUntil:'networkidle'});
    await journey.goto(root+'#aula-fundamentos',{waitUntil:'networkidle'});
    assert.equal(await journey.locator('#courseLesson [data-caction="independent"]').isVisible(),true);
    journey.once('dialog',dialog=>dialog.accept());
    await journey.locator('#courseLesson [data-caction="independent"]').click();
    assert.equal(await journey.locator('#courseExerciseBanner .practice-transfer-banner').count(),0,
      'A avaliação independente não deve revelar o roteiro de resposta');
    assert.match(await journey.locator('#courseExerciseBanner').innerText(),/Resolva o exercício por conta própria/);

    // Outro tema evita confundir a tentativa guiada salva com uma prática livre.
    await journey.goto(root+'#operadores',{waitUntil:'networkidle'});
    assert.match(await journey.locator('#workLocation').innerText(),/PRÁTICA LIVRE/);
    assert.match(await journey.locator('#workDescription').innerText(),/módulos/);
    assert.match(await journey.locator('#backButton').innerText(),/Voltar aos módulos/);
    const lessonLink=journey.locator('#exerciseLessonLink');
    assert.equal(await lessonLink.isVisible(),true);
    assert.equal(await lessonLink.getAttribute('href'),'#aula-operadores');
    assert.match(await lessonLink.innerText(),/Operadores/i);
    await journey.reload({waitUntil:'networkidle'});
    assert.equal(await journey.locator('#exerciseLessonLink').getAttribute('href'),'#aula-operadores');
    await journey.locator('#exerciseLessonLink').click();
    assert.match(journey.url(),/#aula-operadores$/);
    assert.equal(await journey.locator('#courseLesson').isVisible(),true);
    await journey.goto(root+'#misto',{waitUntil:'networkidle'});
    assert.match(await journey.locator('#exerciseLessonLink').getAttribute('href'),/^#aula-[a-z0-9_]+$/);
    assert.equal(await journey.locator('#exerciseLessonLink').isVisible(),true);
    assert.ok(await journey.evaluate(()=>document.documentElement.scrollWidth-innerWidth)<=2);

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
    assert.equal(await table.locator('thead th[data-rel-col]').count(),originalColumns);
    await table.locator('thead th[data-rel-col]').last().hover();
    assert.ok(await table.locator('thead th.truth-rel-structure').count()>=1);
    assert.equal(await table.locator('thead th.truth-rel-equivalent').count(),0);
    await table.locator('thead th[data-rel-col]').last().focus();
    assert.ok(await table.locator('thead th.truth-rel-structure').count()>=1);
    assert.equal(await table.locator('[data-toggle-col][aria-pressed="true"]').count(),originalColumns);
    // Em ambos os estados, o centro do botão e do SVG coincide com o centro do cabeçalho.
    const misalignment=()=>table.locator('thead th').evaluateAll(heads=>Math.max(0,...heads.map(head=>{
      const button=head.querySelector('.truth-col-toggle'),svg=button?.querySelector('svg');
      if(!button||!svg)return 999;
      const h=head.getBoundingClientRect(),b=button.getBoundingClientRect(),v=svg.getBoundingClientRect();
      const hc=(h.left+h.right)/2,bc=(b.left+b.right)/2,vc=(v.left+v.right)/2;
      return Math.max(Math.abs(hc-bc),Math.abs(hc-vc));
    })));
    assert.ok((await misalignment())<=1.5,'Olhos abertos fora do centro em '+width+'px');
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
    assert.ok((await misalignment())<=1.5,'Olhos mistos fora do centro em '+width+'px');
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
    assert.ok((await misalignment())<=1.5,'Olhos riscados fora do centro em '+width+'px');
    assert.equal(await table.locator('.cell').count(),0);
    assert.equal(await table.locator('tbody tr').count(),originalRows);
    await focus.locator('#checkButton').click();
    assert.equal((await draft()).answers['0-'+originalColumn],'V');
    assert.ok((await draft()).grade.total>=originalCells,'A correção avalia também as células ocultas');
    for(let i=0;i<originalColumns;i++)await table.locator('[data-toggle-col="'+i+'"]').click();
    assert.equal(await table.locator('thead th.truth-col-collapsed').count(),0);
    assert.ok((await misalignment())<=1.5,'Olhos reabertos fora do centro em '+width+'px');
    assert.equal(await table.locator('.cell').count(),originalCells);
    assert.equal((await draft()).hiddenColumns.length,0);
    await focus.locator('#newButton').click();
    assert.equal(await table.locator('thead th.truth-col-collapsed').count(),0);
    assert.deepEqual(focusErrors,[]);
    const overflow=await focus.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
    assert.ok(overflow<=2,'Cabeçalhos compactos excederam o viewport de '+width+'px');
    await focusContext.close();
  }

  // Tabela Livre: padrão de variáveis, teclado contextual, combinações, prática e persistência.
  for(const width of [375,1280]){
    const freeContext=await browser.newContext({viewport:{width,height:812}});
    const free=await freeContext.newPage(),freeErrors=[];
    free.on('pageerror',error=>freeErrors.push(error.message));
    await free.goto(root+'#tabela-livre',{waitUntil:'networkidle'});
    assert.equal(await free.locator('#freeTableView').isVisible(),true);
    assert.equal(await free.locator('#workView').isVisible(),false);
    assert.equal(await free.locator('#courseView').isVisible(),false);
    assert.equal(await free.locator('#topFreeTable').isVisible(),true);
    assert.deepEqual(await free.locator('.free-variable-symbol').allTextContents(),['p','q']);
    assert.equal(await free.locator('.free-formula-card').count(),0);
    assert.match(await free.locator('.free-empty-formulas').innerText(),/Nenhuma fórmula/);
    assert.equal(await free.locator('.free-truth-table tbody tr').count(),4);
    assert.equal(await free.locator('.free-truth-table [data-action="answer"]').count(),0);
    assert.equal(await free.locator('input[name="freeRows"],input[name="freeMode"]').count(),0);
    assert.equal(await free.locator('[data-action="export-csv"],[data-action="export-json"],[data-action="import-json"]').count(),0);
    assert.deepEqual(await free.locator('.free-keypad .free-key-variable').allTextContents(),['p','q']);
    assert.equal(await free.locator('.free-domain,.free-domain-advanced,#freeNewIndividualId').count(),0);
    assert.equal(await free.locator('#freeVarTitle + p,#freeFormulaTitle + p').count(),0);
    await free.locator('.free-keypad [data-symbol="¬"]').hover();
    assert.match(await free.locator('#freeSymbolHelp').innerText(),/Negação: não p/);
    assert.match(await free.locator('.free-keypad [data-symbol="¬"]').getAttribute('title'),/Negação/);
    await free.locator('.free-keypad [data-symbol="∃!"]').focus();
    assert.match(await free.locator('#freeSymbolHelp').innerText(),/exatamente um indivíduo/);
    assert.match(await free.locator('.free-keypad [data-symbol="∃!"]').getAttribute('aria-label'),/Quantificador de unicidade/);
    await free.locator('.free-keypad [data-symbol="p"]').click();
    await free.locator('.free-keypad [data-symbol="→"]').click();
    await free.locator('.free-keypad [data-symbol="q"]').click();
    assert.equal(await free.locator('#freeNewFormula').inputValue(),'p→q');
    await free.locator('[data-action="add-formula"]').click();
    assert.equal(await free.locator('.free-formula-card').count(),1);
    assert.equal(await free.locator('.free-truth-table th.free-conclusion-head').count(),0);
    assert.equal(await free.locator('.free-argument-explanation').count(),0);
    await free.locator('[data-var-meaning="0"]').fill('comprei ingresso');
    await free.locator('[data-action="save-var"][data-index="0"]').click();
    await free.locator('[data-var-meaning="1"]').fill('viajei');
    await free.locator('[data-action="save-var"][data-index="1"]').click();
    assert.match(await free.locator('.free-keypad [data-symbol="p"]').getAttribute('title'),/comprei ingresso/);
    await free.locator('.free-keypad [data-symbol="p"]').focus();
    assert.match(await free.locator('#freeSymbolHelp').innerText(),/comprei ingresso/);
    assert.match(await free.locator('.free-translation').first().innerText(),/Se comprei ingresso, então viajei/);
    await free.locator('#freeNewFormula').fill('¬(p → q)');
    await free.locator('[data-action="add-formula"]').click();
    assert.match(await free.locator('.free-translation').last().innerText(),/É falso que se comprei ingresso, então viajei/);
    assert.match(await free.locator('.free-interpretation').last().innerText(),/p ∧ ¬q/);
    await free.locator('[data-action="add-var"]').click();
    assert.deepEqual(await free.locator('.free-variable-symbol').allTextContents(),['p','q','r']);
    assert.deepEqual(await free.locator('.free-keypad .free-key-variable').allTextContents(),['p','q','r']);
    assert.equal(await free.locator('.free-truth-table tbody tr').count(),8);
    await free.locator('.free-keypad [data-symbol="r"]').click();
    await free.locator('.free-keypad [data-symbol="∧"]').click();
    await free.locator('.free-keypad [data-symbol="p"]').click();
    assert.equal(await free.locator('#freeNewFormula').inputValue(),'r∧p');
    await free.locator('[data-action="add-formula"]').click();
    assert.equal(await free.locator('.free-formula-card').count(),3);
    // A última fórmula só é uma conclusão quando o aluno ativa explicitamente o modo de inferência.
    assert.equal(await free.locator('.free-truth-table th.free-conclusion-head').count(),0);
    assert.equal(await free.locator('[data-inference-mode]').count(),0);
    assert.equal(await free.locator('.free-truth-table th.free-conclusion-head').count(),0);
    assert.equal(await free.locator('.free-argument-explanation').count(),0);
    // Entradas em edição sobrevivem ao preenchimento de células sem serem aplicadas prematuramente.
    await free.locator('[data-var-meaning="1"]').fill('descrição ainda não salva');
    assert.equal(await free.locator('[data-var-meaning="1"]').getAttribute('data-unsaved'),'true');
    const initialScroll=await free.locator('.free-table-scroll').evaluate(element=>{
      element.scrollLeft=120;return element.scrollLeft;
    });
    await free.locator('.free-truth-table [data-action="answer"]').first().evaluate(element=>element.click());
    assert.equal(await free.locator('[data-var-meaning="1"]').inputValue(),'descrição ainda não salva');
    assert.equal(await free.locator('.free-table-scroll').evaluate(element=>element.scrollLeft),initialScroll);
    assert.equal(await free.locator('.free-translation').first().innerText().then(x=>x.includes('viajei')),true,
      'A alteração do significado não deve modificar a leitura até Salvar');
    await free.locator('[data-action="save-var"][data-index="1"]').click();
    assert.equal(await free.locator('[data-var-meaning="1"]').getAttribute('data-unsaved'),null);
    assert.match(await free.locator('.truth-venn-legend').innerText(),/descrição ainda não salva/);
    await free.locator('.free-truth-table [data-action="toggle-col"][data-key="v:p"]').click();
    assert.equal(await free.locator('.free-truth-table th.truth-col-collapsed').count(),1);
    assert.equal(await free.locator('.free-truth-table [data-action="toggle-col"][data-key="v:p"]').getAttribute('aria-pressed'),'false');
    await free.reload({waitUntil:'networkidle'});
    assert.equal(await free.locator('.free-truth-table th.truth-col-collapsed').count(),1);
    assert.equal(await free.locator('.free-formula-card').count(),3);
    assert.equal(await free.locator('.free-truth-table tbody tr').count(),8);
    const answer=free.locator('.free-truth-table [data-action="answer"]').first();
    await answer.click();
    await free.locator('[data-action="grade"]').click();
    assert.match(await free.locator('.free-grade').innerText(),/respostas corretas/);
    assert.equal(await free.locator('.free-argument-explanation').count(),1);
    const stored=await free.evaluate(()=>JSON.parse(localStorage.getItem('logiclab_tabela_livre_v1')));
    assert.equal(stored.version,4);
    assert.equal('rowMode' in stored,false);
    assert.equal('viewMode' in stored,false);
    assert.deepEqual(stored.variables.map(x=>x.name),['p','q','r']);
    assert.deepEqual(stored.hidden,['v:p']);
    assert.equal(stored.formulas.length,3);
    await free.reload({waitUntil:'networkidle'});
    assert.equal(await free.locator('.free-grade').count(),1);
    assert.equal(await free.locator('.free-argument-explanation').count(),1);
    assert.equal(await free.locator('.free-truth-table th.free-conclusion-head').count(),0);
    await free.locator('#freeNewFormula').fill('¬(q →)');
    await free.locator('[data-action="add-formula"]').click();
    assert.equal(await free.locator('.free-formula-card').count(),3);
    assert.equal(await free.locator('#freeFeedback').getAttribute('data-result'),'error');
    await free.locator('#freeHomeBack').click();
    assert.equal(await free.locator('#homeView').isVisible(),true);
    await free.locator('#topFreeTable').click();
    assert.equal(await free.locator('#freeTableView').isVisible(),true);
    assert.match(free.url(),/#tabela-livre$/);
    const overflow=await free.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
    assert.ok(overflow<=2,'Tabela Livre excede o viewport de '+width+'px em '+overflow);
    // Mesmo um rascunho incompatível não pode ser sobrescrito por uma tabela vazia.
    const invalid='{"version":4,"variables":[],"formulas":[]}';
    await free.evaluate(value=>localStorage.setItem('logiclab_tabela_livre_v1',value),invalid);
    await free.reload({waitUntil:'networkidle'});
    assert.equal(await free.locator('.free-recovery').count(),1);
    assert.match(await free.locator('.free-recovery').innerText(),/Nenhum dado original foi substituído/);
    assert.equal(await free.evaluate(()=>localStorage.getItem('logiclab_tabela_livre_v1')),invalid);
    free.once('dialog',dialog=>dialog.accept());
    await free.locator('[data-action="reset-recovery"]').click();
    assert.equal(await free.locator('.free-recovery').count(),0);
    assert.deepEqual(await free.locator('.free-variable-symbol').allTextContents(),['p','q']);
    assert.deepEqual(freeErrors,[]);
    await freeContext.close();
  }

  // Tabela Livre unificada: fórmulas predicativas fechadas geram combinações V/F
  // na mesma tabela proposicional, sem domínio, caixas extras ou linhas editáveis impossíveis.
  for(const width of [375,1280]){
    const context=await browser.newContext({viewport:{width,height:812}});
    const page=await context.newPage(),errors=[];
    page.on('pageerror',err=>errors.push(err.message));
    await page.goto(root+'#tabela-livre',{waitUntil:'networkidle'});
    assert.match(await page.locator('#freeTableTitle').innerText(),/^3\. Preencher a tabela-verdade/);
    assert.equal(await page.locator('.free-inference,.free-possibilities').count(),0);
    assert.equal(await page.locator('.free-truth-table tbody tr').count(),4);
    await page.locator('[data-var-kind="0"]').selectOption('individual');
    await page.locator('[data-var-meaning="0"]').fill('Sócrates');
    await page.locator('[data-action="save-var"][data-index="0"]').click();
    await page.locator('[data-var-meaning="1"]').fill('homem');
    await page.locator('[data-action="save-var"][data-index="1"]').click();
    await page.locator('[data-action="add-var"]').click();
    await page.locator('[data-var-meaning="2"]').fill('mortal');
    await page.locator('[data-action="save-var"][data-index="2"]').click();
    for(const source of ['q(p)','∀x(q(x) → r(x))','r(p)']){
      await page.locator('#freeNewFormula').fill(source);
      await page.locator('[data-action="add-formula"]').click();
    }
    assert.match(await page.locator('#freeTableTitle').innerText(),/^3\. Preencher a tabela-verdade/);
    assert.equal(await page.locator('.free-truth-table tbody tr').count(),8);
    assert.equal(await page.locator('.free-truth-table th.free-conclusion-head').count(),0);
    await page.locator('[data-inference-mode]').check();
    const heads=await page.locator('.free-truth-table th[data-rel-col] .free-column-label').allTextContents();
    assert.equal(heads.length,4);
    assert.match(heads[0],/A · q\(p\)/);
    assert.match(heads[1],/B · ∀x/);
    assert.match(heads[2],/^∴ C · r\(p\)/);
    assert.match(heads[3],/→ C/);
    assert.equal(await page.locator('.free-truth-table th.free-conclusion-head').count(),1);
    assert.equal(await page.locator('.free-truth-table th.free-status-head').count(),0);
    assert.equal(await page.locator('.free-truth-table thead th').count(),4);
    assert.equal(await page.locator('.free-argument-explanation').count(),0);
    assert.equal(await page.locator('.free-impossible-row').count(),1);
    const ghost=page.locator('.free-truth-table tbody tr').nth(1);
    assert.match(await ghost.innerText(),/🚫/);
    assert.equal(await ghost.locator('[data-action="answer"]').count(),0);
    assert.equal(await ghost.locator('.free-impossible-marker').count(),1);
    assert.equal(await ghost.locator('.free-impossible-marker sup').innerText(),'1');
    assert.equal(await ghost.locator('.free-impossible-marker').getAttribute('aria-controls'),'free-impossible-note-1');
    assert.equal(await ghost.locator('td:last-child .free-impossible-marker').count(),1);
    assert.equal(await ghost.locator('td:first-child .free-impossible-marker').count(),0);
    assert.equal((await ghost.locator('td:last-child .free-impossible-marker').textContent()).trim(),'🚫1');
    assert.equal(await ghost.locator('.free-impossible-cell').count(),1);
    assert.equal(await page.locator('.free-impossibility-footer li#free-impossible-note-1 sup').innerText(),'1');
    assert.match(await page.locator('.free-impossibility-footer').innerText(),/Linha 🚫1 é impossível porque/);
    assert.match(await page.locator('.free-impossibility-footer').innerText(),/verdadeiras, mas.*falsa/);
    assert.equal(await page.locator('#free-impossible-note-1').count(),1);
    await ghost.locator('.free-impossible-marker').click();
    assert.equal(await page.evaluate(()=>location.hash),'#tabela-livre');
    assert.equal(await page.evaluate(()=>document.activeElement?.id),'free-impossible-note-1');
    assert.match(await page.locator('.free-impossibility-footer').innerText(),/Instanciação universal/);
    assert.equal(await page.locator('.free-impossibility-note').count(),0);
    assert.equal(await page.locator('#freeTableTitle').locator('xpath=following-sibling::p').count(),0);
    const tableChildren=await page.locator('#freeTableTitle').evaluate(title=>{
      const card=title.closest('.free-card'),table=card.querySelector('.free-table-scroll'),
        grade=card.querySelector('.free-table-actions');
      return {next:card.querySelector('.free-section-heading')?.nextElementSibling===card.querySelector('.free-inference-toggle') && card.querySelector('.free-inference-toggle')?.nextElementSibling===table,
        gradeNext:table.nextElementSibling===grade,
        text:card.querySelector('.free-table-tip')?.textContent||''};
    });
    assert.equal(tableChildren.next,true,'Tabela deve vir após a escolha explícita do modo de inferência');
    assert.equal(tableChildren.gradeNext,true,'Conferir respostas deve vir imediatamente após a tabela');
    assert.equal(tableChildren.text,'');
    // Linhas impossíveis são verificadas acima na tabela e no rodapé explicativo.
    const active=page.locator('.free-truth-table [data-action="answer"]');
    assert.equal(await active.count(),7);
    await active.first().click();
    await page.locator('[data-action="grade"]').click();
    assert.match(await page.locator('.free-grade').innerText(),/de 7 respostas corretas/);
    const justification=await page.locator('.free-argument-explanation').innerText();
    assert.match(justification,/∵ Justificativa da inferência/);
    assert.match(justification,/Instanciação universal e modus ponens/);
    assert.match(justification,/Nenhuma combinação semanticamente possível/);
    // O layout novo preserva respostas e correção após recarregar.
    await page.reload({waitUntil:'networkidle'});
    assert.equal(await page.locator('.free-truth-table tbody tr').count(),8);
    assert.equal(await page.locator('.free-impossible-row').count(),1);
    assert.match(await page.locator('.free-truth-table th.free-conclusion-head').innerText(),/∴ C · r\(p\)/);
    assert.equal(await page.locator('.free-argument-explanation').count(),1);
    assert.equal(await page.locator('.free-domain').count(),0);
    assert.equal(await page.locator('.free-inference,.free-possibilities').count(),0);
    assert.deepEqual(errors,[]);
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
    assert.ok(overflow<=2,'Tabela de predicados excedeu o viewport de '+width+'px em '+overflow);
    await context.close();
  }

  // Argumentos como q(p) identificam indivíduos pelo contexto, sem cadastrar p nem usar x.
  for(const width of [375,1280]){
    const ctx=await browser.newContext({viewport:{width,height:812}});
    const page=await ctx.newPage(),errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    await page.goto(root+'#tabela-livre',{waitUntil:'networkidle'});
    assert.equal(await page.locator('[data-var-kind="0"]').inputValue(),'predicate');
    await page.locator('#freeNewFormula').fill('q(p)');
    await page.locator('[data-action="add-formula"]').click();
    assert.equal(await page.locator('.free-formula-card').count(),1);
    assert.equal(await page.locator('[data-var-kind="0"]').inputValue(),'individual');
    assert.equal(await page.locator('.free-truth-table tbody tr').count(),2);
    assert.match(await page.locator('#freeFeedback').innerText(),/reconhecido/);
    await page.locator('[data-action="add-var"]').click();
    await page.locator('#freeNewFormula').fill('∀x(q(x) → r(x))');
    await page.locator('[data-action="add-formula"]').click();
    await page.locator('#freeNewFormula').fill('r(p)');
    await page.locator('[data-action="add-formula"]').click();
    assert.equal(await page.locator('.free-impossible-row').count(),1);
    assert.match(await page.locator('.free-impossibility-footer').innerText(),/Instanciação universal/);
    await page.reload({waitUntil:'networkidle'});
    assert.equal(await page.locator('.free-formula-card').count(),3);
    assert.equal(await page.locator('[data-var-kind="0"]').inputValue(),'individual');
    assert.equal(await page.locator('.free-impossible-row').count(),1);
    assert.deepEqual(errors,[]);
    await ctx.close();
  }

  // Registros de impossibilidade consecutivos mesmo quando as linhas originais não o são;
  // o teclado mostra ajuda ao toque e insere ∃! como quantificador completo.
  for(const width of [375,1280]){
    const ctx=await browser.newContext({viewport:{width,height:812},hasTouch:width===375,isMobile:width===375});
    const page=await ctx.newPage(),errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    await page.goto(root+'#tabela-livre',{waitUntil:'networkidle'});
    await page.locator('.free-keypad [data-symbol="∃!"]').click();
    assert.equal(await page.locator('#freeNewFormula').inputValue(),'∃!x(');
    assert.match(await page.locator('#freeSymbolHelp').innerText(),/exatamente um indivíduo/);
    await page.locator('#freeNewFormula').fill('');
    for(const formula of ['q(p)','¬q(p)']){
      await page.locator('#freeNewFormula').fill(formula);
      await page.locator('[data-action="add-formula"]').click();
    }
    assert.equal(await page.locator('.free-truth-table thead th').count(),3);
    assert.equal(await page.locator('.free-impossible-row').count(),2);
    const markers=page.locator('.free-impossible-row .free-impossible-marker');
    assert.equal(await markers.count(),2);
    assert.deepEqual(await markers.locator('sup').allTextContents(),['1','2']);
    assert.deepEqual(await markers.evaluateAll(items=>items.map(x=>x.getAttribute('aria-controls'))),
      ['free-impossible-note-1','free-impossible-note-2']);
    assert.equal(await page.locator('.free-impossibility-footer li').count(),2);
    assert.match(await page.locator('.free-impossibility-footer').innerText(),/Linha 🚫1 é impossível porque/);
    assert.match(await page.locator('.free-impossibility-footer').innerText(),/Linha 🚫2 é impossível porque/);
    // A marca permanece na última coluna visível quando o resultado é recolhido.
    assert.equal(await page.locator('.free-impossible-row td:last-child .free-impossible-marker').count(),2);
    await page.locator('.free-truth-table [data-action="toggle-col"]').last().click();
    assert.equal(await page.locator('.free-impossible-row .free-impossible-marker').count(),2);
    assert.equal(await page.locator('.free-impossible-row td:nth-last-child(2) .free-impossible-marker').count(),2);
    assert.equal(await page.locator('.free-impossible-row td:last-child .free-impossible-marker').count(),0);
    assert.deepEqual(errors,[]);
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)<=2);
    await ctx.close();
  }

  // Destaques compartilhados: composição imediata antes da correção, relações depois.
  for(const width of [375,1280]){
    const relationContext=await browser.newContext({viewport:{width,height:812},hasTouch:width===375,isMobile:width===375});
    const rel=await relationContext.newPage(),relErrors=[];
    rel.on('pageerror',err=>relErrors.push(err.message));
    await rel.goto(root+'#tabela-livre',{waitUntil:'networkidle'});
    for(const source of ['p→q','¬p∨q','¬(p→q)']){
      await rel.locator('#freeNewFormula').fill(source);
      await rel.locator('[data-action="add-formula"]').click();
    }
    const headers=rel.locator('.free-truth-table thead th[data-rel-col]');
    assert.equal(await headers.count(),6);
    await headers.nth(5).hover();
    assert.equal(await headers.nth(5).evaluate(el=>el.classList.contains('truth-rel-structure')),true);
    assert.equal(await headers.nth(3).evaluate(el=>el.classList.contains('truth-rel-structure')),true);
    assert.equal(await headers.nth(0).evaluate(el=>el.classList.contains('truth-rel-structure')),false);
    assert.equal(await headers.nth(1).evaluate(el=>el.classList.contains('truth-rel-structure')),false);
    assert.match(await rel.locator('.truth-relation-status').innerText(),/Composição direta/);
    assert.equal(await headers.nth(5).getAttribute('tabindex'),'0');
    assert.equal(await rel.locator('.truth-rel-equivalent').count(),0);
    // Requer todas as células completas e corretas e a conferência explícita.
    const values={
      's:!p':['F','F','V','V'],
      'f:f1':['V','F','V','V'],
      'f:f2':['V','F','V','V'],
      'f:f3':['F','V','F','F']
    };
    for(let row=0;row<4;row++)for(const [key,list] of Object.entries(values)){
      const answer=rel.locator('.free-truth-table [data-action="answer"][data-row="'+row+'"][data-key="'+key+'"]');
      assert.equal(await answer.count(),1,'Célula esperada '+key);
      await answer.click();if(list[row]==='F')await answer.click();
    }
    await headers.nth(4).hover();
    assert.equal(await rel.locator('.free-grade').count(),0,'Relações aparecem sem conferir');
    assert.equal(await headers.nth(3).evaluate(el=>el.classList.contains('truth-rel-equivalent')),true);
    assert.equal(await headers.nth(5).evaluate(el=>el.classList.contains('truth-rel-contradictory')),true);
    await rel.locator('[data-action="grade"]').click();
    assert.match(await rel.locator('.free-grade').innerText(),/16 de 16/);
    await headers.nth(4).hover();
    assert.equal(await headers.nth(3).evaluate(el=>el.classList.contains('truth-rel-equivalent')),true);
    assert.equal(await headers.nth(4).evaluate(el=>el.classList.contains('truth-rel-contradictory')),true);
    assert.equal(await headers.nth(5).evaluate(el=>el.classList.contains('truth-rel-contradictory')),true);
    assert.match(await rel.locator('.truth-relation-status').innerText(),/Equivalentes/);
    assert.match(await rel.locator('.truth-relation-status').innerText(),/Contraditórias/);
    const legend=rel.locator('.truth-relation-status');
    assert.equal(await legend.locator('.truth-relation-line--structure').count(),1);
    assert.equal(await legend.locator('.truth-relation-line--contradictory').count(),1);
    assert.equal(await legend.locator('.truth-relation-line--equivalent').count(),1);
    assert.ok(await legend.locator('.truth-relation-line').count()>=3,
      'Cada relação reconhecida deve ocupar sua própria linha');
    const colorAndRows=await legend.evaluate((node)=>{
      const red=node.querySelector('.truth-relation-line--contradictory');
      const green=node.querySelector('.truth-relation-line--equivalent');
      const structure=node.querySelector('.truth-relation-line--structure');
      const heads=[...node.closest('.free-card').querySelectorAll('thead th[data-rel-col]')];
      const redBorder=getComputedStyle(heads[5],'::after').borderTopColor;
      const greenBorder=getComputedStyle(heads[3],'::after').borderTopColor;
      const rects=[...node.querySelectorAll('.truth-relation-line')].map(el=>el.getBoundingClientRect());
      return {redText:getComputedStyle(red).color,redBorder,
        greenText:getComputedStyle(green).color,greenBorder,
        separate:rects.every((r,i)=>i===0||r.top>=rects[i-1].bottom)};
    });
    assert.equal(colorAndRows.redText,colorAndRows.redBorder,'Legenda contraditória deve ter a cor da borda vermelha');
    assert.equal(colorAndRows.greenText,colorAndRows.greenBorder,'Legenda equivalente deve ter a cor da borda verde');
    assert.equal(colorAndRows.separate,true,'Cada legenda deve ocupar uma linha própria');
    // A borda contínua é um único ::after do cabeçalho, sem bordas em cada td.
    assert.equal(await rel.locator('.free-truth-table tbody [class*="truth-rel-"]').count(),0);
    const outline=await headers.nth(4).evaluate(el=>{
      const table=el.closest('table'),style=getComputedStyle(el,'::after');
      return {border:style.borderTopStyle,borderBottom:style.borderBottomStyle,
        height:parseFloat(style.height),expected:table.getBoundingClientRect().bottom-el.getBoundingClientRect().top};
    });
    assert.equal(outline.border,'solid');
    assert.equal(outline.borderBottom,'solid');
    assert.ok(Math.abs(outline.height-outline.expected)<=2,'O contorno precisa chegar até a última linha da coluna');
    await headers.nth(5).hover();
    assert.equal(await headers.nth(5).evaluate(el=>el.classList.contains('truth-rel-contradictory')),true);
    assert.equal(await headers.nth(3).evaluate(el=>el.classList.contains('truth-rel-contradictory')),true);
    assert.match(await rel.locator('.truth-relation-status').innerText(),/Contraditórias/);
    await headers.nth(5).click();
    assert.equal(await headers.nth(5).evaluate(el=>el.classList.contains('truth-rel-contradictory')),true);
    await headers.nth(5).click();
    assert.equal(await rel.locator('thead .truth-rel-contradictory').count(),0);
    await headers.nth(4).focus();
    await headers.nth(5).focus();
    assert.equal(await headers.nth(5).evaluate(el=>el.classList.contains('truth-rel-contradictory')),true);
    const over=await rel.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
    assert.ok(over<=2,'Bordas de relações ultrapassaram a largura '+width+'px em '+over);
    assert.deepEqual(relErrors,[]);
    await relationContext.close();
  }
  // Regressão: p → q e p ∧ ¬q são contraditórias mesmo quando ¬p ∨ q é equivalente à primeira.
  for(const width of [375,1280]){
    const ctx=await browser.newContext({viewport:{width,height:812},hasTouch:width===375,isMobile:width===375});
    const p=await ctx.newPage(),errors=[];
    p.on('pageerror',e=>errors.push(e.message));
    await p.goto(root+'#tabela-livre',{waitUntil:'networkidle'});
    for(const formula of ['p→q','¬p∨q','p∧¬q']){
      await p.locator('#freeNewFormula').fill(formula);
      await p.locator('[data-action="add-formula"]').click();
    }
    const values={
      's:!p':['F','F','V','V'],
      's:!q':['F','V','F','V'],
      'f:f1':['V','F','V','V'],
      'f:f2':['V','F','V','V'],
      'f:f3':['F','V','F','F']
    };
    for(let row=0;row<4;row++)for(const [column,results] of Object.entries(values)){
      const cell=p.locator('.free-truth-table [data-action="answer"][data-row="'+row+'"][data-key="'+column+'"]');
      await cell.click();
      if(results[row]==='F')await cell.click();
    }
    await p.locator('[data-action="grade"]').click();
    assert.match(await p.locator('.free-grade').innerText(),/20 de 20/);
    const headers=p.locator('.free-truth-table thead th[data-rel-col]');
    assert.equal(await headers.count(),7);
    await headers.nth(4).hover();
    assert.equal(await headers.nth(4).evaluate(x=>x.classList.contains('truth-rel-contradictory')),true);
    assert.equal(await headers.nth(5).evaluate(x=>x.classList.contains('truth-rel-equivalent')),true);
    assert.equal(await headers.nth(6).evaluate(x=>x.classList.contains('truth-rel-contradictory')),true);
    const info=await p.locator('.truth-relation-status').innerText();
    assert.match(info,/Contraditórias/);
    assert.match(info,/Equivalentes/);
    const frame=await headers.nth(6).evaluate(el=>({
      height:parseFloat(getComputedStyle(el,'::after').height),
      required:el.closest('table').getBoundingClientRect().bottom-el.getBoundingClientRect().top
    }));
    assert.ok(Math.abs(frame.height-frame.required)<=2);
    assert.equal(await p.locator('.free-truth-table tbody .truth-rel-contradictory').count(),0);
    await headers.nth(6).hover();
    assert.equal(await headers.nth(4).evaluate(x=>x.classList.contains('truth-rel-contradictory')),true);
    assert.equal(await headers.nth(6).evaluate(x=>x.classList.contains('truth-rel-contradictory')),true);
    // Recolher uma coluna mantém o cabeçalho e o contorno integral.
    await headers.nth(4).locator('.truth-col-toggle').click();
    const heads=p.locator('.free-truth-table thead th[data-rel-col]');
    await heads.nth(6).hover();
    assert.equal(await heads.nth(4).evaluate(x=>x.classList.contains('truth-rel-contradictory')),true);
    assert.ok(await heads.nth(4).evaluate(el=>parseFloat(getComputedStyle(el,'::after').height)>el.offsetHeight));
    assert.deepEqual(errors,[]);
    await ctx.close();
  }
  // Regressão da captura: contornos coloridos assim que p→q e p∧¬q ficam corretas.
  for(const width of [375,1280]){
    const ctx=await browser.newContext({viewport:{width,height:812},hasTouch:width===375,isMobile:width===375});
    const page=await ctx.newPage(),errors=[];
    page.on('pageerror',err=>errors.push(err.message));
    await page.goto(root+'#tabela-livre',{waitUntil:'networkidle'});
    for(const formula of ['p→q','p∧¬q']){
      await page.locator('#freeNewFormula').fill(formula);
      await page.locator('[data-action="add-formula"]').click();
    }
    const cols=page.locator('.free-truth-table thead th[data-rel-col]');
    assert.equal(await cols.count(),5);
    const values={
      's:!q':['F','V','F','V'],
      'f:f1':['V','F','V','V'],
      'f:f2':['F','V','F','F']
    };
    for(let row=0;row<4;row++)for(const [column,expected] of Object.entries(values)){
      if(row===3&&column==='f:f2')continue;
      const cell=page.locator('.free-truth-table [data-action="answer"][data-row="'+row+'"][data-key="'+column+'"]');
      await cell.click();
      if(expected[row]==='F')await cell.click();
    }
    await cols.nth(3).hover();
    assert.equal(await cols.nth(3).evaluate(el=>el.classList.contains('truth-rel-contradictory')),false,
      'Não revelar contradição com coluna incompleta');
    const last=page.locator('.free-truth-table [data-action="answer"][data-row="3"][data-key="f:f2"]');
    await last.click();await last.click();
    assert.equal(await page.locator('.free-grade').count(),0);
    await cols.nth(3).hover();
    assert.equal(await cols.nth(3).evaluate(el=>el.classList.contains('truth-rel-contradictory')),true);
    assert.equal(await cols.nth(4).evaluate(el=>el.classList.contains('truth-rel-contradictory')),true);
    assert.match(await page.locator('.truth-relation-status').innerText(),/Contraditórias/);
    const frame=await cols.nth(4).evaluate(el=>({
      height:parseFloat(getComputedStyle(el,'::after').height),
      required:el.closest('table').getBoundingClientRect().bottom-el.getBoundingClientRect().top
    }));
    assert.ok(Math.abs(frame.height-frame.required)<=2,'Borda deve ser única e cobrir a coluna inteira');
    // Se uma resposta voltar a estar errada, a relação deixa de aparecer imediatamente.
    await last.click();
    await cols.nth(3).hover();
    assert.equal(await cols.nth(4).evaluate(el=>el.classList.contains('truth-rel-contradictory')),false);
    await last.click();
    await cols.nth(3).hover();
    assert.equal(await cols.nth(4).evaluate(el=>el.classList.contains('truth-rel-contradictory')),false,
      'Resposta incorreta não deve liberar relações');
    await last.click();
    await cols.nth(3).hover();
    assert.equal(await cols.nth(4).evaluate(el=>el.classList.contains('truth-rel-contradictory')),true);
    assert.deepEqual(errors,[]);
    await ctx.close();
  }
  // Contrariedade e subcontrariedade apresentam as duas variantes de roxo.
  for(const [sources,kind] of [
    [['p∧q','p∧¬q'],'truth-rel-contrary'],
    [['p∨q','¬p∨q'],'truth-rel-subcontrary']
  ]){
    const ctx=await browser.newContext({viewport:{width:1280,height:800}});
    const page=await ctx.newPage();
    await page.goto(root+'#tabela-livre',{waitUntil:'networkidle'});
    for(const source of sources){
      await page.locator('#freeNewFormula').fill(source);
      await page.locator('[data-action="add-formula"]').click();
    }
    // Para subcontrárias: ¬p é coluna intermediária. Para contrárias: ¬q.
    const neg=sources[1].includes('¬p')?'p':'q';
    const values=kind==='truth-rel-contrary'?
      {'s:!q':['F','V','F','V'],'f:f1':['V','F','F','F'],'f:f2':['F','V','F','F']}:
      {'s:!p':['F','F','V','V'],'f:f1':['V','V','V','F'],'f:f2':['V','F','V','V']};
    for(let row=0;row<4;row++)for(const [key,list] of Object.entries(values)){
      const answer=page.locator('.free-truth-table [data-action="answer"][data-row="'+row+'"][data-key="'+key+'"]');
      await answer.click();if(list[row]==='F')await answer.click();
    }
    await page.locator('[data-action="grade"]').click();
    assert.match(await page.locator('.free-grade').innerText(),/12 de 12/);
    const heads=page.locator('.free-truth-table thead th[data-rel-col]');
    await heads.last().hover();
    assert.ok(await page.locator('thead .'+kind).count()>=2);
    const purpleLegend=page.locator('.truth-relation-line--'+(kind==='truth-rel-contrary'?'contrary':'subcontrary'));
    assert.ok(await purpleLegend.count()>=1,'Deve haver legenda roxa para cada relação válida');
    const purpleLines=await purpleLegend.evaluateAll(elements=>elements.map(el=>({
      color:getComputedStyle(el).color,
      display:getComputedStyle(el).display,
      top:el.getBoundingClientRect().top,
      bottom:el.getBoundingClientRect().bottom
    })));
    const purpleBorder=await heads.last().evaluate(el=>getComputedStyle(el,'::after').borderTopColor);
    assert.ok(purpleLines.every(line=>line.color===purpleBorder),
      'Todas as legendas contrárias e subcontrárias devem ter o mesmo roxo da borda');
    assert.ok(purpleLines.every(line=>line.display==='block'));
    assert.ok(purpleLines.every((line,i)=>i===0||line.top>=purpleLines[i-1].bottom),
      'Relações roxas múltiplas devem ficar em linhas separadas');
    await ctx.close();
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
      assert.equal(await pedagogy.locator('#courseLesson [data-reading-check] .reading-check-option').count(),3);
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
      assert.equal(await pedagogy.locator('[data-caction="worked-next"]:visible').isVisible(),true);
      const order=await pedagogy.locator('#courseLesson > section').evaluateAll(els=>els.map(x=>x.querySelector('h3')?.textContent||''));
      const exampleIndex=order.findIndex(x=>x.includes('2. Observar'));
      const advancedIndex=order.findIndex(x=>x.includes('Para ir além:'));
      if(advancedIndex>=0)assert.ok(advancedIndex>exampleIndex,'aprofundamento deve vir depois do exemplo básico');
    }
    assert.deepEqual(errors,[]);
    await pedagogyContext.close();
  }

  // Concluir um exemplo agora exige observar os passos, sem obrigar a responder à checagem.
  async function finishWorkedExample(page){
    const show=page.locator('#courseLesson [data-caction="worked-show-all"]');
    if(await show.isVisible())await show.click();
    await page.locator('#courseLesson [data-caction="example"]').click();
  }

  // Ciclo 12: duas novas competências com prática e avaliação integradas.
  for(const width of [375,1280]){
    const context12=await browser.newContext({viewport:{width,height:812},isMobile:width===375,hasTouch:width===375});
    const applied=await context12.newPage();
    const errors12=[];
    applied.on('pageerror',error=>errors12.push(error.message));
    await applied.goto(root,{waitUntil:'networkidle'});
    assert.match(await applied.locator('#courseHomeApprovedLabel').innerText(),/0 de 61/);
    await applied.goto(root+'#curso',{waitUntil:'networkidle'});
    assert.equal(await applied.locator('#courseMap .course-unit-item').count(),61);
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
      await finishWorkedExample(applied);
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
    assert.match(await applied13.locator('#courseHomeApprovedLabel').innerText(),/0 de 61/);
    await applied13.goto(root+'#curso',{waitUntil:'networkidle'});
    assert.equal(await applied13.locator('#courseMap .course-unit').count()>=7,true);
    for(const id of ['inducao','abducao','probabilidade','causalidade']){
      await applied13.goto(root+'#aula-'+id,{waitUntil:'networkidle'});
      assert.equal(await applied13.locator('#courseLesson').isVisible(),true);
      assert.equal(await applied13.locator('.reading-section').count(),3);
      assert.match(await applied13.locator('#courseLocation').innerText(),/AULA/);
      await applied13.locator('[data-caction="read"]').click();
      assert.equal(await applied13.locator('#courseLesson [data-caction="example"]').count(),1);
      await finishWorkedExample(applied13);
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
    assert.match(await applied13.locator('#courseHomeSummary').innerText(),/19 de 61 avaliações aprovadas/);
    await applied13.goto(root+'#avaliacao-final',{waitUntil:'networkidle'});
    const exam=await applied13.evaluate(()=>JSON.parse(localStorage.getItem('logiclab_final_exam_draft_v1')));
    assert.equal(exam.questions.length,12);
    const represented=new Set(exam.questions.map(q=>q.id));
    for(const id of ['pressupostos','categoricos2','inducao','abducao','probabilidade','causalidade'])assert.ok(represented.has(id),'Tema ausente da prova: '+id);
    assert.equal(represented.size,12);
    assert.deepEqual(pageErrors,[]);
    await newContext.close();
  }

  // Novos princípios fundamentais e métodos de contradição devem ser estudáveis
  // sem alterar os 23 temas nem bloquear o acesso à leitura.
  for(const width of [375,1280]){
    const context=await browser.newContext({viewport:{width,height:812}});
    const page=await context.newPage(),errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    for(const [id,heading,topic,card] of [
      ['classificacao','Princípios fundamentais da lógica clássica','bivalência','Não contradição'],
      ['provas','Explosão e redução ao absurdo','explosão','Redução ao absurdo clássica']
    ]){
      await page.goto(root+'#aula-'+id,{waitUntil:'networkidle'});
      assert.equal(await page.locator('#courseLesson .reading-section').count(),3);
      assert.match(await page.locator('#courseLesson').innerText(),new RegExp(heading));
      assert.match(await page.locator('#courseLesson').innerText(),new RegExp(topic,'i'));
      await page.locator('[data-caction="read"]').click();
      await finishWorkedExample(page);
      assert.match(await page.locator('#courseLesson .advanced-theorem').allTextContents().then(x=>x.join(' ')),new RegExp(card));
    }
    assert.deepEqual(errors,[]);
    await context.close();
  }

  // Exemplos resolvidos: passos, tradução concreta, checagem formativa e revisão.
  for(const width of [375,1280]){
    const ctx=await browser.newContext({viewport:{width,height:812},isMobile:width===375,hasTouch:width===375});
    const screen=await ctx.newPage(),errors=[];
    screen.on('pageerror',error=>errors.push(error.message));
    await screen.goto(root+'#aula-equivalencias',{waitUntil:'networkidle'});
    await screen.locator('[data-caction="read"]').click();
    const example=screen.locator('[data-worked-example]');
    assert.equal(await example.locator('[data-worked-step]:visible').count(),1);
    assert.match(await example.innerText(),/Comi o prato/);
    assert.match(await example.innerText(),/Em palavras/);
    assert.equal(await example.locator('[data-caction="example"]').isVisible(),false);
    await example.locator('[data-caction="worked-next"]:visible').click();
    assert.equal(await example.locator('[data-worked-step]:visible').count(),2);
    assert.match(await screen.evaluate(()=>document.activeElement?.textContent),/Elimine a condicional/);
    await screen.reload({waitUntil:'networkidle'});
    assert.equal(await screen.locator('[data-worked-step]:visible').count(),2);
    await screen.locator('[data-caction="worked-show-all"]').click();
    assert.equal(await screen.locator('[data-worked-step]:visible').count(),3);
    assert.equal(await screen.locator('[data-worked-finish]').isVisible(),true);
    await screen.locator('[data-caction="worked-check"]').click();
    assert.match(await screen.locator('[data-worked-feedback]').innerText(),/Escolha uma alternativa/);
    await screen.locator('input[name^="worked-check-"][value="1"]').check();
    await screen.locator('[data-caction="worked-check"]').click();
    assert.equal(await screen.locator('[data-worked-feedback]').getAttribute('data-result'),'retry');
    await screen.locator('input[name^="worked-check-"][value="0"]').check();
    await screen.locator('[data-caction="worked-check"]').click();
    assert.equal(await screen.locator('[data-worked-feedback]').getAttribute('data-result'),'correct');
    assert.equal(await screen.locator('[data-caction="guided"]').count(),0);
    await screen.locator('[data-caction="example"]').click();
    assert.equal(await screen.locator('[data-caction="guided"]').count(),1);
    assert.equal(await screen.locator('#course-stage-2').evaluate(el=>el.tagName),'DETAILS');
    assert.equal(await screen.locator('#course-stage-2').getAttribute('open'),null);
    await screen.locator('#course-stage-2 > summary').click();
    await screen.locator('[data-caction="worked-restart"]').click();
    assert.equal(await screen.locator('[data-worked-step]:visible').count(),1);
    assert.equal(await screen.locator('[data-caction="guided"]').count(),1);
    await screen.locator('[data-caction="worked-show-all"]').click();
    assert.equal(await screen.locator('[data-worked-step]:visible').count(),3);
    assert.ok(await screen.evaluate(()=>document.documentElement.scrollWidth-innerWidth)<=2,'O exemplo causa rolagem horizontal no viewport '+width);
    assert.deepEqual(errors,[]);
    await ctx.close();
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
    // Uma etapa próxima ao fim da aula pode não alcançar o topo da tela por falta de espaço para rolar.
    // O requisito real é que a seção esteja visível após a navegação.
    await app14.waitForFunction(()=>{
      const rect=document.querySelector('#course-stage-2')?.getBoundingClientRect();
      return Boolean(rect&&rect.bottom>0&&rect.top<innerHeight);
    });
    assert.equal(app14.url(),lessonRoute);
    const progressAfterJump=await app14.evaluate(()=>JSON.parse(localStorage.getItem('logiclab_curso_formal_v2')).lessons.fundamentos);
    assert.equal(progressAfterJump.read,true);
    assert.equal(progressAfterJump.example,false);
    assert.equal(await app14.locator('#course-stage-1').evaluate(el=>el.tagName),'DETAILS');
    assert.equal(await app14.locator('#course-stage-1').getAttribute('open'),null);
    assert.equal(await app14.locator('#course-stage-1 > summary').innerText(),'1. Compreender');
    await app14.locator('#courseLesson .course-lesson-flow button[data-stage="1"]').click();
    assert.equal(await app14.locator('#course-stage-1').getAttribute('open'),'');
    assert.equal(await app14.evaluate(()=>document.activeElement?.textContent),'1. Compreender');
    assert.equal(app14.url(),lessonRoute);
    await app14.goto(root,{waitUntil:'networkidle'});
    assert.match(await app14.locator('#courseHomeApprovedLabel').innerText(),/0 de 61/);
    for(const id of ['predicados2','metateoria']){
      await app14.goto(root+'#aula-'+id,{waitUntil:'networkidle'});
      assert.equal(await app14.locator('#courseLesson .reading-section').count(),3);
      await app14.locator('[data-caction="read"]').click();
      await finishWorkedExample(app14);
      await app14.locator('[data-caction="guided"]').click();
      const guidedCount=await app14.locator('#specialArea [data-special-field]').count();
      assert.ok(guidedCount>=3,'Prática guiada precisa ter pelo menos três questões');
      if(id==='predicados2')assert.match(await app14.locator('#specialArea').innerText(),/unicidade|exatamente uma/);
      if(id==='metateoria')assert.match(await app14.locator('#specialArea').innerText(),/consequência|semântic|demonstr|deriv|premiss/i);
      for(let i=0;i<guidedCount;i++)await app14.locator(`#specialArea [data-special-field="${i}"]`).selectOption({index:1});
      await app14.locator('#checkButton').click();
      assert.equal(await app14.locator('#specialArea .course-question-explanation').count(),guidedCount);
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
      const originalOrder=assessment.map(q=>q.id),originalText=assessment.map(q=>q.question);
      const originalOptions=assessment.map(q=>q.options);
      const originalTitles=await app14.locator('#course-stage-5 .course-question > strong').allInnerTexts();
      const answersBefore=await Promise.all(Array.from({length:5},(_,i)=>app14.locator('input[name="courseq-'+i+'"]:checked').inputValue()));
      await app14.locator('[data-caction="lesson-quiz"]').click();
      assert.equal((await app14.locator('#course-stage-5 [data-assessment-score]').innerText()).trim(),'4/5 de acertos.');
      assert.equal(await app14.locator('#course-stage-5 [data-assessment-feedback]').count(),5);
      assert.equal(await app14.locator('#course-stage-5 [data-assessment-feedback][data-result="incorrect"]').count(),1);
      assert.equal(await app14.locator('#course-stage-5 [data-assessment-feedback][data-result="correct"]').count(),4);
      const incorrectCard=app14.locator('#course-stage-5 [data-assessment-question="'+wrong+'"]');
      assert.match(await incorrectCard.locator('[data-assessment-feedback]').innerText(),/Resposta esperada/i);
      assert.equal(await app14.locator('#course-stage-5 input[name^="courseq-"]:enabled').count(),0);
      assert.equal(await app14.locator('#course-stage-5 [data-caction="lesson-quiz"]').count(),0);
      assert.equal(await app14.locator('#course-stage-5 [data-caction="lesson-retry"]').innerText(),'Tente outra vez');
      const sameAfterCorrection=await app14.evaluate(id=>JSON.parse(localStorage.getItem('logiclab_curso_formal_v2')).lessons[id].assessmentV2.draft,id);
      assert.deepEqual(sameAfterCorrection.questions.map(q=>q.id),originalOrder);
      assert.deepEqual(sameAfterCorrection.questions.map(q=>q.question),originalText);
      assert.deepEqual(sameAfterCorrection.questions.map(q=>q.options),originalOptions);
      assert.deepEqual(Array.from({length:5},(_,i)=>sameAfterCorrection.answers[i]),answersBefore);
      assert.equal(sameAfterCorrection.result.overall,4);
      const scorePlacement=await app14.evaluate(()=>{
        const root=document.getElementById('course-stage-5');
        const questions=root.querySelector('.course-assessment'),score=root.querySelector('[data-assessment-score]');
        const actions=root.querySelector('.course-lesson-actions');
        return Boolean(questions.compareDocumentPosition(score)&Node.DOCUMENT_POSITION_FOLLOWING) &&
          Boolean(score.compareDocumentPosition(actions)&Node.DOCUMENT_POSITION_FOLLOWING);
      });
      assert.equal(scorePlacement,true,'A pontuação deve vir depois das perguntas e antes dos botões');
      const rejected=await app14.evaluate(id=>JSON.parse(localStorage.getItem('logiclab_curso_formal_v2')).lessons[id],id);
      assert.equal(rejected.mastered,false);
      assert.equal(rejected.assessmentV2.history.length,1);
      await app14.reload({waitUntil:'networkidle'});
      // Após aprovação, somente o título da etapa fica visível, até a abertura manual.
      // Após reprovação, a avaliação permanece aberta para permitir nova tentativa.
      assert.deepEqual(await app14.locator('#course-stage-5 .course-question > strong').allInnerTexts(),originalTitles);
      assert.equal(await app14.locator('#course-stage-5 [data-assessment-feedback]').count(),5);
      assert.equal(await app14.locator('#course-stage-5 [data-assessment-score]').count(),1);
      assert.equal(await app14.locator('#course-stage-5 [data-caction="lesson-retry"]').count(),1);
      assert.equal(await app14.locator('#course-stage-5 input[name^="courseq-"]:checked').count(),5);
      assert.equal(await app14.evaluate(id=>JSON.parse(localStorage.getItem('logiclab_curso_formal_v2')).lessons[id].assessmentV2.history.length,id),1);
      // Apenas a ação explícita inicia uma nova avaliação.
      await app14.locator('[data-caction="lesson-retry"]').click();
      assessment=await app14.evaluate(id=>JSON.parse(localStorage.getItem('logiclab_curso_formal_v2')).lessons[id].assessmentV2.draft.questions,id);
      assert.ok(assessment.some(q=>!originalOrder.includes(q.id)),id+' deve oferecer perguntas renovadas após Tente outra vez');
      assert.equal(await app14.locator('#course-stage-5 [data-assessment-feedback]').count(),0);
      assert.equal(await app14.locator('#course-stage-5 [data-assessment-score]').count(),0);
      assert.equal(await app14.locator('#course-stage-5 input[name^="courseq-"]:checked').count(),0);
      assert.equal(await app14.locator('#course-stage-5 [data-caction="lesson-quiz"]').count(),1);
      for(let i=0;i<5;i++)await app14.locator('input[name="courseq-'+i+'"][value="'+assessment[i].correct+'"]').check();
      await app14.locator('[data-caction="lesson-quiz"]').click();
      assert.equal((await app14.locator('#course-stage-5 [data-assessment-score]').innerText()).trim(),'5/5 de acertos.');
      assert.equal(await app14.locator('#course-stage-5 [data-assessment-feedback]').count(),5);
      assert.match(await app14.locator('#courseLesson').innerText(),/6. Consolidar com revisões espaçadas/);
      const approved=await app14.evaluate(id=>JSON.parse(localStorage.getItem('logiclab_curso_formal_v2')).lessons[id],id);
      assert.equal(approved.mastered,true);
      assert.equal(approved.assessmentV2.history.length,2);
      // O resultado é visível imediatamente; ao reabrir a página, as etapas concluídas se recolhem.
      assert.equal(await app14.locator('#course-stage-5').getAttribute('open'),'');
      await app14.reload({waitUntil:'networkidle'});
      for(const number of [1,2,3,4,5]){
        const stage=app14.locator('#course-stage-'+number);
        assert.equal(await stage.evaluate(el=>el.tagName),'DETAILS');
        assert.equal(await stage.getAttribute('open'),null,'Etapa '+number+' deve iniciar recolhida');
        const title=await stage.locator(':scope > summary').innerText();
        assert.match(title,new RegExp('^'+number+'\\. '));
      }
      await app14.locator('#course-stage-5 > summary').click();
      assert.equal(await app14.locator('#course-stage-5 [data-assessment-feedback]').count(),5);
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
    // A aula de equivalências agora pratica pela interface de exercícios compartilhada.
    assert.equal(await app14.locator('#workView').isVisible(),true);
    assert.equal(await app14.locator('#checkButton').isVisible(),true);
    assert.deepEqual(errors14,[]);
    await context14.close();
  }

  // Um rascunho gerado antes da correção mantém perguntas e alternativas,
  // mas os prefixos editoriais obsoletos não são mostrados ao estudante.
  const legacyWordContext=await browser.newContext({viewport:{width:375,height:812},isMobile:true,hasTouch:true});
  const legacyWordPage=await legacyWordContext.newPage(),legacyWordErrors=[];
  legacyWordPage.on('pageerror',error=>legacyWordErrors.push(error.message));
  await legacyWordPage.goto(root+'#aula-condicionais_naturais',{waitUntil:'networkidle'});
  await legacyWordPage.evaluate(async()=>{
    const {LESSONS}=await import('./src/content/course.js');
    const {FOCUSED_ASSESSMENTS_A}=await import('./src/content/focused-lessons-a.js');
    const {prepareBank,composeAssessment}=await import('./src/core/assessment.js');
    const id='condicionais_naturais';
    const bank=prepareBank(id,LESSONS[id],null,FOCUSED_ASSESSMENTS_A[id]);
    const questions=composeAssessment(bank,[],()=>0.37);
    questions[0].question="Em outra situação conceitual 2, Em 'p somente se q', a seta aponta de:";
    questions[1].question="Em outro contexto, princípio 1: Qual regra extrai p de p∧q?";
    localStorage.setItem('logiclab_curso_formal_v2',JSON.stringify({lessons:{
      [id]:{read:true,example:true,guided:true,independent:true,mastered:false,best:0,
        assessmentV2:{version:2,history:[],draft:{questions,answers:{},startedAt:Date.now()}}}
    },final:{}}));
  });
  await legacyWordPage.reload({waitUntil:'networkidle'});
  const oldQuestions=await legacyWordPage.locator('#course-stage-5 .course-question > strong').allInnerTexts();
  assert.equal(oldQuestions[0],"1. Em 'p somente se q', a seta aponta de:");
  assert.equal(oldQuestions[1],'2. Qual regra extrai p de p∧q?');
  const preservedQuestion=await legacyWordPage.evaluate(()=>{
    const s=JSON.parse(localStorage.getItem('logiclab_curso_formal_v2'));
    return s.lessons.condicionais_naturais.assessmentV2.draft.questions[0].question;
  });
  assert.match(preservedQuestion,/^Em outra situação conceitual 2,/,
    'A correção visual não deve substituir o rascunho ou o histórico salvo');
  assert.deepEqual(legacyWordErrors,[]);
  await legacyWordContext.close();

  // Amostra transversal de oito unidades: três decisões respondidas no celular,
  // sem escrita de progresso em nenhuma das questões-ponte.
  const bridgeContext=await browser.newContext({viewport:{width:375,height:812},isMobile:true,hasTouch:true});
  const bridgePage=await bridgeContext.newPage(),bridgeErrors=[];
  bridgePage.on('pageerror',error=>bridgeErrors.push(error.message));
  for(const id of ['traducao','operadores','condicionais_excecao','demorgan','equiv_bicondicional',
    'silogismos','categoricos','probabilidade','oficina_erros','modais','fde_disjuncao',
    'intuicionista_dupla_negacao','metateoria']){
    await bridgePage.goto(root+'#aula-'+id,{waitUntil:'networkidle'});
    assert.equal(await bridgePage.locator('[data-reading-bridge]').count(),3);
    const keys=await bridgePage.evaluate(async lessonId=>{
      const {PEDAGOGY_BRIDGES}=await import('./src/content/pedagogy-bridges.js');
      return PEDAGOGY_BRIDGES[lessonId].bridges.map(item=>item.correct);
    },id);
    for(let i=0;i<3;i++){
      const group=bridgePage.locator('[data-reading-bridge="'+i+'"]');
      await group.locator('input[value="'+keys[i]+'"]').check();
      await group.locator('[data-caction="bridge-check"]').click();
      assert.equal(await group.locator('[data-bridge-feedback]').getAttribute('data-result'),'correct');
    }
    assert.equal(await bridgePage.locator('.reading-handoff ol li').count(),3);
    const progress=await bridgePage.evaluate(lessonId=>{
      const raw=localStorage.getItem('logiclab_curso_formal_v2');
      return raw?JSON.parse(raw).lessons?.[lessonId]?.mastered||false:false;
    },id);
    assert.equal(progress,false,'Questões-ponte não equivalem a aprovação: '+id);
    const overflow=await bridgePage.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
    assert.ok(overflow<=2,'Questão-ponte excede viewport móvel na aula '+id);
  }
  assert.deepEqual(bridgeErrors,[]);
  await bridgeContext.close();

  console.log('Smoke test de UX aprovado: progresso, grupos, histórico, células e viewport móvel.');
  await context.close();
}catch(error){
  console.error(error);
  process.exitCode=1;
}finally{
  await browser?.close();
  server.kill('SIGTERM');
}
