import { MODULES as HISTORICAL_MODULES } from './content/modules.js';
import { numberCourseModules } from './core/course-numbering.js';
import { LEARNING_STAGES, getPracticeGroups, getNextLearningStep } from './core/learning-path.js';
import { routeFromHash } from './core/navigation.js';
import { reviewStatus,beginReviewTracking,recordReview,reviewQueue,consolidatedCount,studyRecommendation } from './core/reviews.js';
import { createBackup,importBackup,PORTABLE_KEYS } from './core/progress-portability.js';
import { performanceSummary } from './core/performance.js';
import { courseScreenContext, exerciseScreenContext } from './core/screen-guidance.js';
import { learningOverview, nextCourseMessage, formatReviewDate, attemptDecision, examWeakAreas } from './core/learning-feedback.js';
import { EXERCISE_DRAFTS_KEY, EXAM_DRAFT_KEY, DRAFT_VERSION, hasPendingWork, readExerciseDrafts, readExamDraft, mostRecentUnfinished } from './core/draft-store.js';
import { SYMBOLS, rng, pick, v, not, bin, A, O, X, I, B, t, evalAst, fmt, pretty, sig, varsOf, relevantNames, truthRows, varColumns, stepNodes, formulaColumns, build } from './core/logic.js';
import {immediateOperands,propositionalRelations,categoricalRelation} from './core/table-relations.js';
import {attachTruthHighlights} from './table-highlights.js';
import {renderTruthVenn} from './truth-venn.js';
import { tokens, parseFormula, equivalentFormula } from './core/parser.js';
import { escapeHTML } from './core/html.js';
import { fundamentals, operators, composed, demorgan, classification, equivalences, argumentsMode } from './modes/propositional.js';
import { SCENARIOS, TRANSLATION_TEMPLATES, ARGUMENT_TEMPLATES, cap } from './content/translation.js';
import { DEDUCTION_CONTEXTS, DEDUCTION_NAMES, DEDUCTION_LEVELS } from './content/deduction.js';
import { CATEGORICAL_TERMS } from './content/categorical.js';
import { THEOREM_WORKSHOPS, THEORY_CARDS } from './content/advanced.js';
import { COURSE_UNITS, LESSONS } from './content/course.js';
const MODULES=numberCourseModules(COURSE_UNITS,HISTORICAL_MODULES);
import { ERROR_READINGS } from './content/errors-course.js';
import { ERROR_ASSESSMENTS } from './content/errors-assessments.js';
import { ERROR_PRACTICE } from './content/errors-practice.js';
import { OTHER_LOGIC_READINGS } from './content/other-logics-course.js';
import { OTHER_LOGIC_ASSESSMENTS } from './content/other-logics-assessments.js';
import { FOUNDATIONS_READINGS } from './content/foundations-a.js';
import { FOUNDATIONS_ASSESSMENTS } from './content/foundations-assessments.js';
import { FOUNDATIONS_PRACTICE } from './content/foundations-practice.js';
import { GAP_READINGS_A } from './content/gap-lessons-a.js';
import { GAP_READINGS_B } from './content/gap-lessons-b.js';
import { GAP_ASSESSMENTS } from './content/gap-assessments.js';
import { GAP_PRACTICE } from './content/gap-practice.js';
import { MICRO_READINGS_A,MICRO_ASSESSMENTS_A,MICRO_PRACTICE_A } from './content/micro-lessons-a.js';
import { MICRO_READINGS_B,MICRO_ASSESSMENTS_B,MICRO_PRACTICE_B } from './content/micro-lessons-b.js';
import { FOCUSED_READINGS_A,FOCUSED_ASSESSMENTS_A,FOCUSED_PRACTICE_A } from './content/focused-lessons-a.js';
import { FOCUSED_READINGS_B,FOCUSED_ASSESSMENTS_B,FOCUSED_PRACTICE_B } from './content/focused-lessons-b.js';
import { ALIGNED_ASSESSMENTS, ALIGNED_BASIC_PRACTICE } from './content/curriculum-alignment.js';
import { WORKED_EXAMPLES } from './content/example-walkthroughs.js';
import { PEDAGOGY_BRIDGES } from './content/pedagogy-bridges.js';
import { sectionBridgePositions, practiceTransferGuide } from './core/pedagogy-continuity.js';
import { PILOT_ASSESSMENTS } from './content/assessment-pilot.js';
import { UNIT1_ASSESSMENTS } from './content/assessment-unit1.js';
import { UNIT2_ASSESSMENTS } from './content/assessment-unit2.js';
import { UNIT3_ASSESSMENTS } from './content/assessment-unit3.js';
import { UNIT4_ASSESSMENTS } from './content/assessment-unit4.js';
import { UNIT5_TO_7_ASSESSMENTS } from './content/assessment-unit5to7.js';
import { ASSESSMENT_VERSION, prepareBank, composeAssessment, gradeAssessment, cleanAssessmentQuestion } from './core/assessment.js';
import { explanationChatGPTUrl } from './core/chatgpt-explanation.js';
import { recordAssessmentAttempt, beginAssessmentRetry } from './core/assessment-attempt.js';
import { buildIntegratedExamQuestions } from './core/integrated-exam.js';
import { OTHER_LOGIC_LAB_IDS,createOtherLogicLab } from './core/other-logics-labs.js';
import { syllogismTemplatesFor, translationTemplatesFor } from './core/practice-scope.js';
import { UNIT1_READINGS } from './content/reading-unit1.js';
import { UNIT2_READINGS } from './content/reading-unit2.js';
import { UNIT3_READINGS } from './content/reading-unit3.js';
import { UNIT4_TO_6_READINGS } from './content/reading-units4to6.js';
import { UNIT12_READINGS } from './content/reading-unit12.js';
import { UNIT13_READINGS } from './content/reading-unit13.js';
import { DESCRIPTION_CASES, IDENTITY_CASES, RELATION_CASES, REWRITE_CHAINS, makePredicateQuestions, makeMetatheoryQuestions, makeRewriteQuestions } from './core/precision-lab.js';
import { INDUCTION_CASES, ABDUCTION_CASES, CAUSAL_CASES, PROBABILITY_CASES, buildInductionQuestions, buildAbductionQuestions, buildCausalQuestions, buildProbabilityQuestions } from './core/evidence-lab.js';
import { ASSUMPTION_CASES, CATEGORICAL_CASES, CATEGORICAL_CONTEXTS, buildAssumptionQuestions, buildCategoricalQuestions } from './core/argument-lab.js';
import { SQUARE_FORMS, SQUARE_MODES, squareConsequences, squarePairRelation, buildSquareQuestions } from './core/opposition-square.js';


(()=>{
  'use strict';
  
  
  const $=id=>document.getElementById(id);
  // O restante da navegação não pode depender da Tabela Livre.
  // Importação tardia isola falhas do editor e do diagrama.
  let freeTable=null,freeTableLoading=null;
  function loadFreeTable(){
    if(freeTable)return Promise.resolve(freeTable);
    if(!freeTableLoading){
      freeTableLoading=import('./free-table-ui.js').then(({createFreeTable})=>{
        freeTable=createFreeTable($('freeTableView'));
        return freeTable;
      }).catch(error=>{freeTableLoading=null;throw error});
    }
    return freeTableLoading;
  }
  function setRouteHash(hash){const next='#'+hash;if(location.hash!==next)history.pushState(null,'',next)}
  
    
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  /* Módulo 08: tradução simbólica e argumentos em linguagem natural. */
  
  
  
  const TRANSLATION_HISTORY_KEY='logiclab_translation_history_v1';
  function loadTranslationHistory(){try{const x=JSON.parse(localStorage.getItem(TRANSLATION_HISTORY_KEY));return Array.isArray(x)?x.slice(-240).filter(a=>a&&Number.isInteger(a.scenario)&&typeof a.template==='string'):[]}catch(e){return []}}
  let translationHistory=loadTranslationHistory();
  function storeTranslationHistory(){try{localStorage.setItem(TRANSLATION_HISTORY_KEY,JSON.stringify(translationHistory))}catch(e){}}
  
  function sentence(node,claims){
    if(node.type==='var')return claims[node.name];
    if(node.type==='not')return node.a.type==='var'?`é falso que ${sentence(node.a,claims)}`:`é falso que (${sentence(node.a,claims)})`;
    const a=sentence(node.a,claims),b=sentence(node.b,claims);
    switch(node.type){
      case 'and':return `as duas afirmações “${a}” e “${b}” são verdadeiras`;
      case 'or':return `pelo menos uma das afirmações “${a}” e “${b}” é verdadeira`;
      case 'xor':return `exatamente uma das afirmações “${a}” e “${b}” é verdadeira`;
      case 'implies':return `se ${a}, então ${b}`;
      case 'iff':return `${a} se, e somente se, ${b}`;
      default:return '';
    }
  }
  function optionsFor(target,vars){
    const [p,q,r]=vars.map(v);
    if(!q){const base=[p,not(p),A(p,not(p)),O(p,not(p))];return base.sort(()=>Math.random()-.5).map(pretty)}
    const pool=[p,not(p),q,not(q),A(p,q),O(p,q),X(p,q),I(p,q),I(q,p),B(p,q),I(p,not(q)),I(not(p),q),not(A(p,q)),not(O(p,q))];
    if(r)pool.push(A(p,r),O(q,r),I(A(p,q),r),I(p,O(q,r)));
    const shuffled=[...pool].sort(()=>Math.random()-.5),options=[target];
    for(const n of shuffled){if(n&&options.every(o=>truthRows(vars).some(env=>evalAst(o,env)!==evalAst(n,env)))){options.push(n);if(options.length===4)break}}
    return options.sort(()=>Math.random()-.5).map(pretty)
  }
  function shapeOf(node,vars){return sig(node).replace(/[a-z](?=[,)!]|$)/g,c=>String(vars.indexOf(c)))}
  function makeTranslationCandidate(level){
    const scenario=pick(SCENARIOS),temp=pick(translationTemplatesFor(level,TRANSLATION_TEMPLATES)),needed=level==='easy'?2:3;
    const names=varsOf(needed),nodes=names.map(v),claimMap=Object.fromEntries(names.map((name,i)=>[name,scenario.claims[i]]));
    const roots=[temp.make(nodes)],vars=relevantNames(names,roots),sentenceText=temp.say(names.map((_,i)=>scenario.claims[i]));
    return {scenario,temp,vars,roots,labels:['Frase apresentada'],sentences:[sentenceText],claimMap,kind:level==='easy'?'guided':'formula',key:`${level}|${scenario.id}|${temp.id}`};
  }
  function selectTranslationCandidate(level){
    let winner=null,best=Infinity;
    for(let i=0;i<130;i++){
      const x=makeTranslationCandidate(level),recent=translationHistory.slice(-60);
      const at=recent.findLastIndex(h=>h.key===x.key),lastScenario=recent.slice(-12).findIndex(h=>h.scenario===x.scenario.id),lastTemplate=recent.slice(-5).findIndex(h=>h.template===x.temp.id&&h.level===level);
      const seen=translationHistory.filter(h=>h.key===x.key).length;
      const weak=stats.translationTypes?.[x.temp.id];
      const revisit=weak?.tries>=2&&weak.wins/weak.tries<.6 && !recent.slice(-7).some(h=>h.template===x.temp.id);
      const score=(at>=0?300+at*8:0)+(lastScenario>=0?190:0)+(lastTemplate>=0?120:0)+seen*12+(revisit?-25:0)+Math.random()*18;
      if(score<best){winner=x;best=score}
    }
    translationHistory.push({key:winner.key,scenario:winner.scenario.id,template:winner.temp.id,level});
    translationHistory=translationHistory.slice(-240);storeTranslationHistory();return winner;
  }
  function translationMode(level){
    const c=selectTranslationCandidate(level),roots=c.roots,vars=c.vars,argument=c.kind==='argument';
    const premises=argument?roots.slice(0,-1):[],conclusion=argument?roots.at(-1):null;
    const actualValid=argument?truthRows(vars).every(env=>!premises.every(n=>evalAst(n,env))||evalAst(conclusion,env)):null;
    if(argument&&actualValid!==c.valid)throw Error('Validade divergente no gerador textual');
    const choice=argument?{question:'A conclusão decorre necessariamente das premissas?',options:['Válido','Inválido'],correct:c.valid?'Válido':'Inválido',explanation:c.valid?'Toda linha com premissas V apresenta conclusão V.':'Existe uma linha com todas as premissas V e a conclusão F.'}:
      (()=>{const row=pick(truthRows(vars)),desc=vars.map(name=>`${name}=${t(row[name])}`).join(', ');return {question:`Interprete a frase quando ${desc}:`,options:['Verdadeira','Falsa'],correct:evalAst(roots[0],row)?'Verdadeira':'Falsa',explanation:`Para ${desc}, a fórmula vale ${t(evalAst(roots[0],row))}.`}})();
    const ex=build('traducao',vars,roots,{showSteps:level!=='easy',rootLabels:argument?['premissa 1','premissa 2','conclusão']:['frase'],title:argument?'Traduza o argumento e teste a conclusão':'Traduza a frase antes de calcular a tabela',instruction:'1. Traduza cada afirmação para a linguagem simbólica. 2. Complete a tabela. 3. Interprete o resultado.',hint:argument?'Traduza cada premissa separadamente e depois a conclusão. Se p então q significa p → q. Procure um contraexemplo na tabela.':'“Se p, então q” corresponde a p → q. “p somente se q” também corresponde a p → q. OU, neste curso, é inclusivo.',resolution:argument?`Este argumento ilustra ${c.temp.name}. Premissas: ${premises.map(pretty).join('; ')}. Conclusão: ${pretty(conclusion)}. ${c.valid?'Válido: toda linha com premissas verdadeiras tem conclusão verdadeira.':'Inválido: existe uma linha com premissas verdadeiras e conclusão falsa.'}`:`Fórmula representativa: ${pretty(roots[0])}. Fórmulas equivalentes também descrevem corretamente a frase.`,choice,metadata:argument?{premises,conclusion}:{} });
    ex.translation={kind:c.kind,scenario:c.scenario.context,statements:c.sentences,claimMap:c.claimMap,labels:c.labels,values:roots.map(()=>''),flags:roots.map(()=>false),first:roots.map(()=>null),attempts:0,unlocked:false,message:'',activeField:0,options:c.kind==='guided'?optionsFor(roots[0],vars):null,templateId:c.temp.id,correctNodes:roots,verified:false};
    return ex;
  }
  /* Novo módulo: argumentos silogísticos proposicionais e sua tradução. */
  const SYLLOGISM_HISTORY_KEY='logiclab_syllogisms_v1';
  function loadShortHistory(key){try{const data=JSON.parse(localStorage.getItem(key));return Array.isArray(data)?data.slice(-180):[]}catch(e){return []}}
  let syllogismHistory=loadShortHistory(SYLLOGISM_HISTORY_KEY);
  function saveShortHistory(key,h){try{localStorage.setItem(key,JSON.stringify(h.slice(-180)))}catch(e){}}
  function syllogismsMode(level){
    const two=syllogismTemplatesFor('easy',ARGUMENT_TEMPLATES);
    const triple=syllogismTemplatesFor('hard',ARGUMENT_TEMPLATES);
    let chosen=null,best=Infinity;
    for(let k=0;k<90;k++){
      const scenario=pick(SCENARIOS),template=pick(level==='easy'?two:level==='medium'?syllogismTemplatesFor('medium',ARGUMENT_TEMPLATES):triple),key=`${level}|${scenario.id}|${template.id}`;
      const recent=syllogismHistory.slice(-12),times=syllogismHistory.filter(x=>x.key===key).length;
      const score=times*110+(recent.some(x=>x.scenario===scenario.id)?170:0)+(recent.slice(-5).some(x=>x.template===template.id)?110:0)+Math.random()*25;
      if(score<best){best=score;chosen={scenario,template,key}}
    }
    const {scenario,template,key}=chosen,needed=triple.includes(template)?3:3,names=varsOf(needed),nodes=names.map(v),[premises,conclusion]=template.make(nodes),roots=[...premises,conclusion],vars=relevantNames(names,roots),claimMap=Object.fromEntries(names.map((name,i)=>[name,scenario.claims[i]]));
    const valid=truthRows(vars).every(env=>!premises.every(node=>evalAst(node,env))||evalAst(conclusion,env));
    if(valid!==template.valid)throw Error('Modelo de silogismo com validade divergente: '+template.id);
    syllogismHistory.push({key,scenario:scenario.id,template:template.id});syllogismHistory=syllogismHistory.slice(-180);saveShortHistory(SYLLOGISM_HISTORY_KEY,syllogismHistory);
    const ex=build('silogismos',vars,roots,{showSteps:level==='hard',rootLabels:['premissa 1','premissa 2','conclusão'],title:'Traduza o silogismo e teste a validade',instruction:'Formalize cada frase, complete a tabela-verdade e procure uma linha em que as duas premissas sejam V e a conclusão F.',hint:'Formalize primeiro as premissas. Em uma inferência válida, toda linha com todas as premissas V também apresenta conclusão V. Condicional: p → q equivale a ¬p ∨ q.',resolution:`Estrutura estudada: ${template.name}. ${valid?'Inferência válida: toda interpretação que torna as premissas verdadeiras preserva a conclusão.':'Inferência inválida: há interpretação com as duas premissas V e a conclusão F.'}`,choice:{question:'A conclusão segue necessariamente das duas premissas?',options:['Válido','Inválido'],correct:valid?'Válido':'Inválido',explanation:valid?'Em todas as linhas relevantes, a conclusão é V.':'Existe ao menos um contraexemplo com premissas V e conclusão F.'},metadata:{premises,conclusion,signature:key}});
    ex.translation={kind:level==='easy'?'syllogism-guided':'argument',scenario:scenario.context,statements:roots.map(node=>cap(sentence(node,claimMap))+'.'),claimMap,labels:['Premissa 1','Premissa 2','Conclusão'],values:roots.map(()=>''),flags:roots.map(()=>false),first:roots.map(()=>null),attempts:0,unlocked:false,message:'',activeField:0,options:level==='easy'?roots.map(root=>optionsFor(root,vars)):null,templateId:'silogismos-'+template.id,correctNodes:roots,verified:false};
    return ex;
  }
  
  
  
  
  function renderTranslation(){
    const ex=exercise,area=$('translationArea');if(!ex.translation){area.classList.add('hide');area.innerHTML='';$('tableStage').classList.remove('hide');$('decisionArea').classList.remove('hide');$('checkButton').disabled=ex.revealed;return}
    const tr=ex.translation,isDeduction=ex.mode==='deducao',isSyllogism=ex.mode==='silogismos';area.classList.remove('hide');area.classList.toggle('deduction-translation',isDeduction);$('tableStage').classList.toggle('hide',!tr.unlocked&&!ex.revealed);$('decisionArea').classList.toggle('hide',!tr.unlocked&&!ex.revealed);$('checkButton').disabled=!tr.unlocked||ex.revealed;
    let parts=`<div class="translation-heading"><span class="translation-step">${isDeduction?'PASSO 2 · FORMALIZAR AS PISTAS':'PASSO 1 · TRADUZIR'}</span><span class="translation-topic">${escapeHTML(tr.scenario)} · ${isDeduction?'Dedução':isSyllogism?'Silogismo':tr.kind==='argument'?'Argumento':tr.kind==='guided'?'Tradução guiada':'Tradução livre'}</span></div><p class="translation-caption">${isDeduction?'Traduza cada uma das pistas A1, A2 etc. usando o dicionário abaixo. As variáveis representam afirmações sobre pessoas e atributos; só depois da tradução a tabela será liberada.':'Leia o enunciado e construa uma fórmula equivalente. O sistema compara o significado lógico, inclusive quando a escrita é diferente. O conectivo OU é inclusivo.'}</p>`;
    if(!isDeduction)parts+='<div class="translation-sentences">'+tr.statements.map((s,i)=>`<div class="translation-sentence"><span>${escapeHTML(tr.labels[i])}</span><p>${escapeHTML(s)}</p></div>`).join('')+'</div>';
    parts+='<div class="translation-mapping"><strong>Dicionário de proposições</strong>'+(tr.formulaVars||ex.vars).map(name=>`<div><b>${escapeHTML(name)}</b> = ${escapeHTML(tr.claimMap[name])}</div>`).join('')+'</div>';
    if(tr.kind==='deduction-guided'||tr.kind==='syllogism-guided'){
      parts+='<p class="translation-caption">Selecione uma fórmula para cada pista; escolha com atenção os conectivos e as negações.</p>';
      parts+=tr.labels.map((label,i)=>`<div class="translation-question"><strong>${escapeHTML(label)} ${tr.flags[i]?'<span class="translation-status good">✓ correta</span>':''}</strong><p>${escapeHTML(tr.statements[i])}</p><div class="translation-options" role="group" aria-label="Tradução de ${escapeHTML(label)}">${tr.options[i].map((option,j)=>`<button type="button" class="translation-option ${tr.values[i]===option?'active':''}" data-tr-choice="${i}:${j}" ${tr.unlocked||ex.revealed?'disabled':''} aria-pressed="${tr.values[i]===option}">${escapeHTML(option)}</button>`).join('')}</div></div>`).join('');
    }else if(tr.kind==='guided'){
      parts+='<p class="translation-caption">Escolha a expressão que traduz a frase:</p><div class="translation-options" role="group" aria-label="Escolha a tradução">'+tr.options.map((option,i)=>`<button type="button" class="translation-option ${tr.values[0]===option?'active':''}" data-tr-choice="${i}" ${tr.unlocked||ex.revealed?'disabled':''} aria-pressed="${tr.values[0]===option}">${escapeHTML(option)}</button>`).join('')+'</div>';
    }else{
      parts+='<div class="translation-fields">'+tr.labels.map((label,i)=>`<label class="translation-input-label"><span>${escapeHTML(label)} <small>· fórmula ${i+1}</small> ${tr.flags[i]?'<span class="translation-status good">✓ correta</span>':''}</span>${isDeduction?`<span class="translation-clue-label">${escapeHTML(tr.statements[i])}</span>`:''}<input type="text" data-tr-field="${i}" value="${escapeHTML(tr.values[i])}" autocomplete="off" autocapitalize="off" spellcheck="false" inputmode="text" ${tr.unlocked||ex.revealed?'disabled':''} placeholder="Ex.: ${i?'¬q':'p → q'}" aria-label="Fórmula de ${escapeHTML(label)}"></label>`).join('')+'</div>';
      if(!tr.unlocked&&!ex.revealed)parts+='<div class="symbol-keypad" aria-label="Teclado de símbolos">'+['¬','∧','∨','⊕','→','↔','(',')'].map(s=>`<button type="button" data-symbol="${s}" aria-label="Inserir ${s}">${s}</button>`).join('')+'</div><p class="translation-caption">Você também pode digitar !, &, |, ^, -> e &lt;-&gt;. Use parênteses para esclarecer a ordem.</p>';
    }
    if(tr.rule){
      const rule=tr.rule;
      parts+=`<div class="translation-rule"><strong>Formalize a regra geral</strong><p>Considere A1 até A${tr.labels.length}. A expressão F(A1…A${tr.labels.length}) representa a quantidade de afirmações falsas; V(A1…A${tr.labels.length}) representa a quantidade de verdadeiras. Qual restrição traduz o enunciado?</p><div class="translation-options" role="group" aria-label="Formalização da regra geral">${rule.options.map((opt,j)=>`<button type="button" class="translation-option ${rule.selected===opt?'active':''}" data-ded-rule="${j}" ${tr.unlocked||ex.revealed?'disabled':''} aria-pressed="${rule.selected===opt}">${escapeHTML(opt)}</button>`).join('')}</div></div>`;
    }
    parts+=`<div class="translation-bottom"><button class="button primary" type="button" id="validateTranslation" ${tr.unlocked||ex.revealed?'disabled':''}>${tr.unlocked?'✓ Tradução aprovada':'✓ Conferir tradução'}</button><span class="translation-state">${tr.unlocked?(isDeduction?'PASSO 3 LIBERADO · AVALIE AS DISTRIBUIÇÕES':'PASSO 2 LIBERADO · COMPLETE A TABELA'):'A tabela será liberada após acertar a tradução.'}</span></div>`;
    if(tr.message)parts+=`<div class="translation-feedback ${tr.unlocked?'ok':'note'}" role="status">${tr.message}</div>`;
    if(ex.revealed&&!tr.unlocked)parts+=`<div class="translation-feedback ok">Tradução-modelo: ${tr.correctNodes.map((n,i)=>escapeHTML(tr.labels[i])+': <strong>'+escapeHTML(pretty(n))+'</strong>').join(' · ')}${tr.rule?' · Regra geral: <strong>'+escapeHTML(tr.rule.correct)+'</strong>':''}</div>`;
    area.innerHTML=parts;
  }
  function validateTranslation(){
    const ex=exercise;if(!ex?.translation||ex.revealed)return;
    const tr=ex.translation;tr.attempts++;let all=true;const messages=[];
    tr.values.forEach((value,i)=>{
      if(!value.trim()){all=false;messages.push(`${tr.labels[i]}: preencha uma expressão.`);return}
      try{
        const allowed=tr.formulaVars||ex.vars,parsed=parseFormula(value,allowed);
        const names=tr.formulaVars?relevantNames(allowed,[parsed,tr.correctNodes[i]]):ex.vars;
        const check=equivalentFormula(parsed,tr.correctNodes[i],names);
        if(tr.first[i]===null)tr.first[i]=check.equivalent;
        tr.flags[i]=check.equivalent;
        if(!check.equivalent){all=false;const values=names.map(x=>`${x}=${t(check.counter[x])}`).join(', ');messages.push(`${tr.labels[i]}: revise a fórmula. Contraexemplo: ${values}. Sua fórmula = ${t(evalAst(parsed,check.counter))}; enunciado = ${t(evalAst(tr.correctNodes[i],check.counter))}.`)}
      }catch(err){tr.flags[i]=false;all=false;messages.push(`${tr.labels[i]}: ${escapeHTML(err.message)}`);if(tr.first[i]===null)tr.first[i]=false}
    });
    if(tr.rule){
      if(!tr.rule.selected){all=false;messages.push('Regra geral: selecione a condição que representa a contagem de afirmações falsas.');}
      else{const correct=tr.rule.selected===tr.rule.correct;if(tr.rule.first===null)tr.rule.first=correct;
        if(!correct){all=false;messages.push('Regra geral: diferencie a quantidade exata de falsas de limites mínimos e máximos.')}}
    }
    if(all){tr.unlocked=true;tr.message=ex.mode==='deducao'?(tr.rule?'Traduções e restrição global corretas. Agora avalie as distribuições e escolha a solução.':'Todas as pistas foram traduzidas corretamente. Agora avalie as distribuições e escolha a solução.'):'Tradução semanticamente correta. Continue com a tabela e responda à interpretação final.';toast('Tradução correta! Tabela liberada.')}else tr.message=messages.map(escapeOrSafeMessage).join('<br>');
    renderTranslation();
    // Recria o cabeçalho após liberar a tradução. Assim, as fórmulas aceitas
    // (inclusive equivalentes) acompanham as premissas e a conclusão na tabela.
    if(all)renderTable();
    if(ex.mode==='deducao')renderDeduction();
    renderSidebar();
  }
  // Mensagens de validação são compostas localmente e escapadas antes da exibição.
  function escapeOrSafeMessage(s){return escapeHTML(s)}


  /* Módulo 09: lógica de atribuições, tabela reduzida de permutações e solução única. */
  
  
  
  const DEDUCTION_HISTORY_KEY='logiclab_deduction_history_v1';
  function loadDeductionHistory(){try{const a=JSON.parse(localStorage.getItem(DEDUCTION_HISTORY_KEY));return Array.isArray(a)?a.slice(-200):[]}catch(e){return []}}
  let deductionHistory=loadDeductionHistory();
  function saveDeductionHistory(){try{localStorage.setItem(DEDUCTION_HISTORY_KEY,JSON.stringify(deductionHistory.slice(-200)))}catch(e){}}
  function shuffled(a){const b=a.slice();for(let i=b.length-1;i>0;i--){const j=rng(i+1);[b[i],b[j]]=[b[j],b[i]]}return b}
  function permutations(a){if(a.length===0)return [[]];return a.flatMap((x,i)=>permutations(a.filter((_,j)=>i!==j)).map(rest=>[x,...rest]))}
  function createClue(kind,scenario){
    const n=scenario.people.length,pi=rng(n),ci=rng(n);let pj=rng(n),cj=rng(n);
    if(pj===pi&&cj===ci){pj=(pi+1)%n;cj=rng(n)}
    const first=v(`${pi}_${ci}`),second=v(`${pj}_${cj}`);
    const a=scenario.context.text(scenario.people[pi],scenario.items[ci]);
    const b=scenario.context.text(scenario.people[pj],scenario.items[cj]);
    let node,text;
    switch(kind){
      case 'atom':node=first;text=`${a}.`;break;
      case 'not':node=not(first);text=`É falso que “${a}”.`;break;
      case 'and':node=A(first,second);text=`As duas afirmações são verdadeiras: “${a}” e “${b}”.`;break;
      case 'or':node=O(first,second);text=`Pelo menos uma é verdadeira: “${a}” ou “${b}” (OU inclusivo).`;break;
      case 'xor':node=X(first,second);text=`Exatamente uma das afirmações é verdadeira: “${a}” e “${b}” (OU exclusivo).`;break;
      case 'implies':node=I(first,second);text=`Se “${a}”, então “${b}”.`;break;
      case 'onlyif':node=I(first,second);text=`“${a}” somente se “${b}”.`;break;
      case 'iff':node=B(first,second);text=`“${a}” se, e somente se, “${b}”.`;break;
      case 'notand':node=not(A(first,second));text=`É falso que ambas sejam verdadeiras: “${a}” e “${b}”.`;break;
      case 'notor':node=not(O(first,second));text=`É falso que ao menos uma seja verdadeira: “${a}” ou “${b}”.`;break;
      default:throw Error('Tipo de pista desconhecido');
    }
    return {node,text,kind,shape:sig(node).replace(/\d+/g,'#')};
  }
  function deductionCandidate(level){
    const cfg=DEDUCTION_LEVELS[level],context=pick(DEDUCTION_CONTEXTS),n=cfg.n;
    const people=shuffled(DEDUCTION_NAMES).slice(0,n),items=shuffled(context.items).slice(0,n);
    const scenario={context,people,items};
    const rows=shuffled(permutations(Array.from({length:n},(_,i)=>i)));
    const targetIndex=rng(rows.length),target=rows[targetIndex];
    const envs=rows.map(row=>{const env={__assignment:row};for(let pi=0;pi<n;pi++)for(let ci=0;ci<n;ci++)env[`${pi}_${ci}`]=row[pi]===ci;return env});
    const kinds=cfg.kinds;
    const chosenFalse=pick(cfg.falseCounts),pool=[],seen=new Set();
    for(let i=0;i<330;i++){
      const clue=createClue(pick(kinds),scenario),vector=envs.map(e=>evalAst(clue.node,e));
      const semantic=vector.map(t).join('');
      if(vector.every(Boolean)||vector.every(x=>!x)||seen.has(semantic))continue;
      seen.add(semantic);pool.push({...clue,vector,atTarget:vector[targetIndex]});
    }
    const yes=pool.filter(c=>c.atTarget),no=pool.filter(c=>!c.atTarget);
    let clues=null;
    for(let attempt=0;attempt<2500&&yes.length>=cfg.clues-chosenFalse&&no.length>=chosenFalse;attempt++){
      const sample=shuffled([...shuffled(yes).slice(0,cfg.clues-chosenFalse),...shuffled(no).slice(0,chosenFalse)]);
      let count=0,sol=0;
      for(let ri=0;ri<envs.length;ri++){
        let falseAtRow=0;for(const c of sample)if(!c.vector[ri])falseAtRow++;
        if(falseAtRow===chosenFalse){count++;sol=ri;if(count>1)break}
      }
      if(count===1&&sol===targetIndex){clues=sample;break}
    }
    if(!clues){
      // Solução construtiva: cada atributo verdadeiro é uma âncora; outra pista é falsa.
      // Uma permutação alternativa desloca no mínimo duas pessoas e viola >= 2 âncoras.
      const anchors=target.map((ci,pi)=>{const node=v(`${pi}_${ci}`),text=`${context.text(people[pi],items[ci])}.`;return {node,text,kind:'atom',vector:envs.map(e=>evalAst(node,e))}});
      const falseClue=no.find(c=>c.kind!=='atom')||no[0];
      if(!falseClue)throw Error('Biblioteca de pistas insuficiente');
      clues=[...anchors,falseClue];
      while(clues.length<cfg.clues){const c=yes.find(c=>!clues.some(q=>q.vector.join('')===c.vector.join('')));if(!c)break;clues.push(c)}
      const falseTotal=envs.map((e,ri)=>clues.reduce((acc,c)=>acc+(c.vector[ri]?0:1),0));
      const fits=falseTotal.map((f,ri)=>f===1?ri:-1).filter(i=>i>=0);
      if(fits.length!==1||fits[0]!==targetIndex)throw Error('Falha na construção de solução única');
      // O fallback é gerado com exatamente uma falsidade.
      return {cfg,scenario,envs,targetIndex,target,clues:shuffled(clues),falseCount:1};
    }
    return {cfg,scenario,envs,targetIndex,target,clues,falseCount:chosenFalse};
  }
  function selectDeductionCandidate(level){
    let best=null,score=Infinity;
    for(let attempt=0;attempt<10;attempt++){
      const candidate=deductionCandidate(level);
      const structure=candidate.clues.map(c=>c.kind).sort().join('-')+':'+candidate.falseCount+':'+candidate.cfg.n;
      const key=candidate.scenario.context.id+'|'+structure+'|'+candidate.target.join('-');
      const recent=deductionHistory.slice(-55);
      const sameContext=recent.slice(-12).some(h=>h.context===candidate.scenario.context.id);
      const sameStructure=recent.slice(-6).some(h=>h.structure===structure&&h.level===level);
      const sameKey=recent.some(h=>h.key===key);
      const weakness=stats.deductionLevels?.[level];
      const revisit=weakness?.tries>2&&weakness?.correct/weakness?.tries<0.5&&attempt%4===0;
      const value=(sameContext?160:0)+(sameStructure?110:0)+(sameKey?250:0)+(revisit?-3:0)+Math.random()*30;
      if(value<score){best={...candidate,structure,key};score=value}
      if(score<12)break;
    }
    deductionHistory.push({context:best.scenario.context.id,structure:best.structure,key:best.key,level});
    deductionHistory=deductionHistory.slice(-200);saveDeductionHistory();
    return best;
  }
  // Converte os átomos internos "pessoa_atributo" em símbolos aceitos pelo editor de fórmulas.
  // A tabela reduzida continua usando as mesmas pistas originais; a tradução usa árvores equivalentes.
  const DEDUCTION_SYMBOL_NAMES=['p','q','r','s','t','u','v','w','x','y','z','a','b','c','d','f','g','h'];
  function deductionTranslation(clues,scenario){
    const used=new Set();const collect=node=>{if(node.type==='var'){used.add(node.name);return}collect(node.a);if(node.b)collect(node.b)};
    clues.forEach(cl=>collect(cl.node));
    const atoms=[...used].sort((a,b)=>{const aa=a.split('_').map(Number),bb=b.split('_').map(Number);return aa[0]-bb[0]||aa[1]-bb[1]});
    if(atoms.length>DEDUCTION_SYMBOL_NAMES.length)throw Error('Quantidade excessiva de proposições');
    const symbols=atoms.map((_,i)=>DEDUCTION_SYMBOL_NAMES[i]);
    const remap=Object.fromEntries(atoms.map((name,i)=>[name,symbols[i]]));
    const rename=node=>node.type==='var'?v(remap[node.name]):node.type==='not'?not(rename(node.a)):bin(node.type,rename(node.a),rename(node.b));
    const claimMap=Object.fromEntries(atoms.map((key,i)=>{const [person,item]=key.split('_').map(Number);return [symbols[i],scenario.context.text(scenario.people[person],scenario.items[item])] }));
    return {roots:clues.map(cl=>rename(cl.node)),symbols,atoms,claimMap};
  }
  function deductionMode(level){
    const c=selectDeductionCandidate(level),n=c.cfg.n,envs=c.envs;
    const satisfiers=envs.map((env,ri)=>({ri,falseCount:c.clues.reduce((f,cl)=>f+!evalAst(cl.node,env),0)})).filter(x=>x.falseCount===c.falseCount);
    if(satisfiers.length!==1||satisfiers[0].ri!==c.targetIndex)throw Error('Enigma com solução ambígua');
    const formatAssignment=row=>c.scenario.people.map((p,pi)=>`${p}: ${c.scenario.items[row[pi]]}`).join(' · ');
    const correctAssignment=envs[c.targetIndex].__assignment;
    const distractors=shuffled(envs.filter((_,i)=>i!==c.targetIndex)).slice(0,4).map(env=>env.__assignment);
    const options=shuffled([correctAssignment,...distractors]);
    const letters=['A','B','C','D','E'];
    const correct=letters[options.findIndex(a=>a.every((ci,i)=>ci===correctAssignment[i]))];
    const solutionStatuses=c.clues.map((cl,i)=>evalAst(cl.node,envs[c.targetIndex])?`A${i+1}=V`:`A${i+1}=F`).join(', ');
    const rule=c.falseCount===0?'todas as afirmações são verdadeiras':c.falseCount===1?'exatamente uma afirmação é falsa':`exatamente ${c.falseCount} afirmações são falsas`;
    const cols=[...c.scenario.people.map((p,i)=>({key:'assignment'+i,label:p,sub:'atribuição',editable:false,assignmentIndex:i})),...c.clues.map((cl,i)=>({key:'clue'+i,label:`A${i+1}`,sub:'afirmação',node:cl.node,editable:true})),{key:'condition',label:'Condição geral',sub:'verificação',node:v('__valid'),editable:true}];
    envs.forEach(env=>{env.__valid=c.clues.filter(cl=>!evalAst(cl.node,env)).length===c.falseCount});
    const contest=level==='exam';
    const formal=deductionTranslation(c.clues,c.scenario);
    // Confere, nas distribuições permitidas, a identidade entre pista e tradução.
    for(const env of envs){const symbolic=Object.fromEntries(formal.atoms.map((key,i)=>[formal.symbols[i],env[key]]));
      c.clues.forEach((cl,i)=>{if(evalAst(cl.node,env)!==evalAst(formal.roots[i],symbolic))throw Error('Tradução divergente da pista')});
    }
    const ex={mode:'deducao',vars:c.scenario.people,roots:c.clues.map(cl=>cl.node),cols,envs,
      title:contest?'Modo concurso · resolva e justifique':level==='expert'?'Desafio avançado de dedução':'Descubra a distribuição correta',
      instruction:contest?'Leia as pistas, faça seu próprio rascunho e selecione a alternativa. A tabela de apoio é opcional.':'Avalie cada afirmação em cada distribuição, marque se a regra é satisfeita e escolha a única alternativa correta.',
      hint:`Cada atributo pertence a uma única pessoa. Traduza as pistas com o dicionário de símbolos. ${['expert','exam'].includes(level)?'A notação F(A1…An) = k significa exatamente k pistas falsas. ':''}Compare as pistas de forma conjunta: ${rule}. ${contest?'Comece procurando uma contradição em cada alternativa incorreta.':'Na coluna “Condição geral”, marque V quando a distribuição satisfizer a quantidade de afirmações falsas exigida; marque F nos demais casos.'}`,
      resolution:`Solução única: ${formatAssignment(correctAssignment)}. Nesse cenário: ${solutionStatuses}. A condição “${rule}” é atendida. As demais distribuições violam essa contagem.`,
      choice:{question:'Qual alternativa apresenta a única distribuição correta?',options:letters,correct,explanation:`Alternativa ${correct}: ${formatAssignment(correctAssignment)}. ${solutionStatuses}.`},
      metadata:{signature:c.key,category:c.scenario.context.title,people:c.scenario.people,items:c.scenario.items,clueTexts:c.clues.map(c=>c.text),falseCount:c.falseCount,rule,options:options.map((a,i)=>({letter:letters[i],text:formatAssignment(a)})),n,levelCode:level,contest,tableOpened:!contest,scratch:''},
      answers:{},picked:'',grade:null,gradedEver:false,revealed:false,hintVisible:false};
    const guided=level==='easy';
    ex.translation={kind:guided?'deduction-guided':'deduction-formula',scenario:c.scenario.context.title,
      statements:c.clues.map(cl=>cl.text),claimMap:formal.claimMap,formulaVars:formal.symbols,
      labels:c.clues.map((_,i)=>`Pista A${i+1}`),values:c.clues.map(()=>''),flags:c.clues.map(()=>false),
      first:c.clues.map(()=>null),attempts:0,unlocked:false,message:'',activeField:0,
      options:guided?formal.roots.map(root=>optionsFor(root,relevantNames(formal.symbols,[root]))):null,
      templateId:'deducao-'+level+'-'+c.structure,correctNodes:formal.roots,verified:false,
      rule:['expert','exam'].includes(level)?(()=>{const ref=`A1…A${c.clues.length}`,k=c.falseCount;
        const correct=`F(${ref}) = ${k}`;return {correct,options:shuffled([correct,`F(${ref}) ≥ ${k}`,`F(${ref}) ≤ ${k}`,`V(${ref}) = ${k}`]),selected:'',first:null}})():null};
    ex.instruction='1. Leia as pistas. 2. Traduza todas as afirmações em fórmulas. 3. Preencha a tabela de possibilidades. 4. Escolha a solução.';
    return ex;
  }
  function renderDeduction(){
    const ex=exercise,area=$('deductionArea');
    if(ex.mode!=='deducao'){area.classList.add('hide');area.innerHTML='';return}
    const d=ex.metadata;area.classList.remove('hide');
    const quantity=ex.envs.length;
    let html=`<div class="deduction-heading"><span class="deduction-kicker">${escapeHTML(DEDUCTION_LEVELS[d.levelCode].title.toUpperCase())}</span><span class="deduction-tag">${escapeHTML(d.category)} · ${quantity} possibilidades</span></div>`;
    html+=`<p class="deduction-story">Considere ${escapeHTML(d.people.join(', ').replace(/, ([^,]*)$/,' e $1'))}. Cada pessoa corresponde a uma opção diferente da categoria <strong>${escapeHTML(d.category)}</strong>: ${d.items.map(escapeHTML).join(', ')}. Cada opção é usada exatamente uma vez.</p>`;
    html+=`<div class="deduction-rule">Regra: ${escapeHTML(d.rule)}.</div>`;
    html+='<ol class="deduction-clues">'+d.clueTexts.map((sentence,i)=>`<li><span class="clue-number">A${i+1}</span><span>${escapeHTML(sentence)}</span></li>`).join('')+'</ol>';
    html+='<p class="deduction-note">As palavras “pelo menos uma” indicam OU inclusivo; “exatamente uma” indica OU exclusivo. Uma condicional “se p, então q” só é falsa quando p é V e q é F.</p>';
    html+='<p class="deduction-note">Primeiro traduza as pistas. As alternativas aparecerão após essa etapa, junto à escolha da resposta.</p>';
    if(d.contest){html+=`<label class="scratch-label" for="deductionScratch">Rascunho de justificativa (opcional, salvo durante a rodada)</label><textarea class="deduction-scratch" id="deductionScratch" placeholder="Anote quais afirmações seriam verdadeiras ou falsas em cada hipótese..." ${ex.revealed?'disabled':''}>${escapeHTML(d.scratch)}</textarea>`;
      html+=`<button class="button small deduction-toggle" type="button" id="toggleDeductionTable" ${!ex.translation?.unlocked&&!ex.revealed?'disabled':''}>${d.tableOpened?'Ocultar tabela de apoio':'Abrir tabela de apoio (24 possibilidades)'}</button>`;
      html+='<p class="deduction-table-note">No modo concurso, traduza primeiro as pistas. Depois, a tabela será opcional e a pontuação avaliará a tradução e a alternativa escolhida.</p>';
    }else html+='<p class="deduction-note">Após a tradução, a tabela mostrará as atribuições possíveis. Preencha V ou F nas afirmações A1, A2 etc. Na coluna “Condição geral”, registre V quando a distribuição cumprir a regra indicada no cabeçalho e F nos demais casos.</p>';
    area.innerHTML=html;
    $('tableStage').classList.toggle('hide',(!ex.translation?.unlocked&&!ex.revealed)||(d.contest&&!d.tableOpened&&!ex.revealed));
    $('lineCount').textContent=`· ${quantity} distribuições`;
    $('tableHeaderTitle').firstChild.textContent='Tabela de possibilidades ';
    $('exerciseIndex').textContent=`Rodada ${serial} · ${d.clueTexts.length} afirmações · ${quantity} cenários`;
  }

  /* Módulo 11 — Silogismos categóricos: interpretação de conjuntos, quantificadores e contramodelos. */
  
  const C=(kind,a,b)=>({kind,a,b});
  const CAT_TEMPLATES=[
    {id:'barbara',valid:true,level:1,forms:[C('all','M','P'),C('all','S','M'),C('all','S','P')],rule:'Inclusão de conjuntos: S ⊆ M ⊆ P.'},
    {id:'celarent',valid:true,level:1,forms:[C('none','M','P'),C('all','S','M'),C('none','S','P')],rule:'Um subconjunto de M também fica fora de P.'},
    {id:'darii',valid:true,level:2,forms:[C('all','M','P'),C('some','S','M'),C('some','S','P')],rule:'A testemunha de S ∩ M também está em P.'},
    {id:'ferio',valid:true,level:2,forms:[C('none','M','P'),C('some','S','M'),C('somenot','S','P')],rule:'Uma testemunha de S ∩ M está fora de P.'},
    {id:'existencial',valid:false,level:1,forms:[C('all','M','P'),C('all','S','M'),C('some','S','P')],rule:'Duas premissas universais permitem S vazio; a conclusão existencial falha.'},
    {id:'conversa',valid:false,level:1,forms:[C('all','M','P'),C('all','S','P'),C('all','S','M')],rule:'Compartilhar P é insuficiente para concluir inclusão de S em M.'},
    {id:'algunsdistintos',valid:false,level:2,forms:[C('some','M','P'),C('some','S','M'),C('some','S','P')],rule:'As duas premissas existenciais podem falar de indivíduos diferentes.'},
    {id:'partetodo',valid:false,level:2,forms:[C('none','M','P'),C('some','S','M'),C('none','S','P')],rule:'Alguns membros de S estão em M, mas outros podem pertencer a P.'},
    {id:'afirmacao',valid:false,level:2,forms:[C('all','M','P'),C('some','S','P'),C('some','S','M')],rule:'Pertencer a P é insuficiente para pertencer a M.'},
    {id:'testemunhas',valid:false,level:3,forms:[C('some','S','M'),C('some','S','P'),C('some','M','P')],rule:'Os dois indivíduos de S podem ser distintos, um em M e outro em P.'},
    {id:'disamis',valid:true,level:3,forms:[C('some','M','P'),C('all','M','S'),C('some','S','P')],rule:'A testemunha de M ∩ P também está em S.'},
    {id:'bocardo',valid:true,level:3,forms:[C('somenot','M','P'),C('all','M','S'),C('somenot','S','P')],rule:'A testemunha de M fora de P também pertence a S.'},
    {id:'camestres',valid:true,level:3,forms:[C('all','P','M'),C('none','S','M'),C('none','S','P')],rule:'Todo P está em M, conjunto disjunto de S.'},
    {id:'interseccao',valid:false,level:3,forms:[C('all','M','P'),C('some','S','P'),C('all','S','M')],rule:'Uma interseção parcial de S com P é insuficiente para incluir S em M.'}
  ];
  const CATEGORICAL_HISTORY_KEY='logiclab_categorical_v1';
  let categoricalHistory=loadShortHistory(CATEGORICAL_HISTORY_KEY);
  function catText(st,terms){const a=terms[st.a],b=terms[st.b];switch(st.kind){case 'all':return `Todos os ${a} são ${b}.`;case 'none':return `Nenhum dos ${a} pertence ao grupo dos ${b}.`;case 'some':return `Alguns ${a} são ${b}.`;case 'somenot':return `Alguns ${a} não são ${b}.`}}
  function catFormula(st){const a=st.a+'(x)',b=st.b+'(x)';switch(st.kind){case 'all':return `∀x(${a} → ${b})`;case 'none':return `∀x(${a} → ¬${b})`;case 'some':return `∃x(${a} ∧ ${b})`;case 'somenot':return `∃x(${a} ∧ ¬${b})`}}
  function modelProfiles(mask){const arr=[];for(let p=0;p<8;p++)if(mask&(1<<p))arr.push(p);return arr}
  function catMembership(profile,predicate){return !!(profile&({S:4,M:2,P:1}[predicate]))}
  function catValue(st,mask){const profiles=modelProfiles(mask),inA=p=>catMembership(p,st.a),inB=p=>catMembership(p,st.b);switch(st.kind){case 'all':return profiles.every(p=>!inA(p)||inB(p));case 'none':return profiles.every(p=>!inA(p)||!inB(p));case 'some':return profiles.some(p=>inA(p)&&inB(p));case 'somenot':return profiles.some(p=>inA(p)&&!inB(p))}}
  function modelLabel(mask){return modelProfiles(mask).map((p,i)=>`${'abcdefgh'[i]}: ${['S','M','P'].filter(letter=>catMembership(p,letter)).join(', ')||'fora de S, M e P'}`).join('; ')}
  function catCounter(mask,terms){return modelProfiles(mask).map((p,i)=>{const labels=['S','M','P'].filter(x=>catMembership(p,x)).map(x=>terms[x]);return `o indivíduo ${'abcdefgh'[i]} ${labels.length?'pertence aos grupos '+labels.join(', '):'está fora dos três conjuntos'}`}).join('; ')}
  function catSelection(forms,level){const all=Array.from({length:255},(_,i)=>i+1),groups=new Map();
    for(const mask of all){const flags=forms.map(st=>catValue(st,mask)),key=flags.map(t).join('');if(!groups.has(key))groups.set(key,[]);groups.get(key).push(mask)}
    const valid=all.every(mask=>!forms.slice(0,2).every(st=>catValue(st,mask))||catValue(forms[2],mask));
    const sought=!valid?all.filter(m=>forms.slice(0,2).every(x=>catValue(x,m))&&!catValue(forms[2],m)):all.filter(m=>forms.every(x=>catValue(x,m)));
    const sortSmall=a=>a.sort((x,y)=>modelProfiles(x).length-modelProfiles(y).length||x-y);
    const models=[],add=m=>{if(m&&!models.includes(m))models.push(m)};
    if(sought.length)add(sortSmall(sought)[0]);
    const other=[...groups.values()].map(masks=>sortSmall(masks)[0]);
    for(let i=other.length-1;i>0;i--){const j=rng(i+1);[other[i],other[j]]=[other[j],other[i]]}
    for(const m of other)add(m);
    const target=level==='easy'?5:level==='medium'?6:8;
    const small=all.filter(x=>modelProfiles(x).length<=3);for(let i=small.length-1;i>0;i--){const j=rng(i+1);[small[i],small[j]]=[small[j],small[i]]}
    for(const m of small){if(models.length>=target)break;add(m)}
    return {valid,models:models.slice(0,target),counter:valid?null:sortSmall(sought)[0]};
  }
  function parseCategoricalFormula(input){
    const source=input.replace(/\s+/g,'').replaceAll('<->','↔').replaceAll('->','→').replaceAll('&&','∧').replaceAll('||','∨').replaceAll('!','¬');
    const chunks=[],pat=/^(∀|∃|¬|∧|∨|→|↔|\(|\)|[SMP]\(x\)|x)/;
    for(let i=0;i<source.length;){const match=pat.exec(source.slice(i));if(!match)throw Error(`Símbolo inesperado perto de “${source.slice(i,i+10)}”. Use S(x), M(x), P(x) e ∀x/∃x.`);chunks.push(match[0]);i+=match[0].length}
    let pos=0;const eat=x=>chunks[pos]===x?(pos++,true):false;
    function atom(){if(eat('¬'))return {op:'not',a:atom()};if(chunks[pos]==='∀'||chunks[pos]==='∃'){const op=chunks[pos++];if(!eat('x'))throw Error('Após ∀ ou ∃, escreva x.');return {op:op==='∀'?'all':'some',a:atom()}}
      if(eat('(')){const n=iff();if(!eat(')'))throw Error('Feche os parênteses.');return n}
      if(/^[SMP]\(x\)$/.test(chunks[pos]||''))return {op:'pred',name:chunks[pos++][0]};throw Error('Esperava um predicado S(x), M(x), P(x), um quantificador ou um parêntese.')}
    function and(){let n=atom();while(eat('∧'))n={op:'and',a:n,b:atom()};return n}
    function or(){let n=and();while(eat('∨'))n={op:'or',a:n,b:and()};return n}
    function implies(){let n=or();if(eat('→'))n={op:'implies',a:n,b:implies()};return n}
    function iff(){let n=implies();while(eat('↔'))n={op:'iff',a:n,b:implies()};return n}
    const ast=iff();if(pos<chunks.length)throw Error('Revise a posição dos símbolos na fórmula.');return ast;
  }
  function catEvalFormula(ast,mask,x=null){switch(ast.op){case 'pred':if(x===null)throw Error('O predicado precisa estar dentro de ∀x ou ∃x.');return catMembership(x,ast.name);
    case 'not':return !catEvalFormula(ast.a,mask,x);
    case 'and':return catEvalFormula(ast.a,mask,x)&&catEvalFormula(ast.b,mask,x);
    case 'or':return catEvalFormula(ast.a,mask,x)||catEvalFormula(ast.b,mask,x);
    case 'implies':return !catEvalFormula(ast.a,mask,x)||catEvalFormula(ast.b,mask,x);
    case 'iff':return catEvalFormula(ast.a,mask,x)===catEvalFormula(ast.b,mask,x);
    case 'all':return modelProfiles(mask).every(p=>catEvalFormula(ast.a,mask,p));
    case 'some':return modelProfiles(mask).some(p=>catEvalFormula(ast.a,mask,p));default:throw Error('Operador quantificado inválido.')}}
  function categoricalMode(level){
    let chosen=null,best=Infinity;const max=level==='easy'?1:level==='medium'?2:3;
    const legal=CAT_TEMPLATES.filter(x=>x.level<=max);
    for(let j=0;j<100;j++){const template=pick(legal),theme=rng(CATEGORICAL_TERMS.length),key=`${level}|${template.id}|${theme}`,hist=categoricalHistory.slice(-20),score=(hist.filter(x=>x.key===key).length*280)+(hist.slice(-6).some(x=>x.template===template.id)?100:0)+(hist.slice(-10).some(x=>x.theme===theme)?120:0)+Math.random()*24;
      if(score<best){best=score;chosen={template,theme,key}}}
    const {template,theme,key}=chosen,words=CATEGORICAL_TERMS[theme],terms={S:words[0],M:words[1],P:words[2]},forms=template.forms,analysis=catSelection(forms,level);
    if(analysis.valid!==template.valid)throw Error('Erro de validade categórica: '+template.id);
    categoricalHistory.push({key,theme,template:template.id});categoricalHistory=categoricalHistory.slice(-180);saveShortHistory(CATEGORICAL_HISTORY_KEY,categoricalHistory);
    const ex={mode:'categoricos',vars:['S','M','P'],roots:[],cols:[{key:'model',label:'Modelo de conjuntos',sub:'distribuição',editable:false},...forms.map((st,i)=>({key:'cat'+i,label:i===2?'Conclusão':`Premissa ${i+1}`,sub:catText(st,terms),node:null,editable:true,catIndex:i})),{key:'counter',label:'Contraexemplo?',sub:'premissas V e conclusão F',editable:true}],envs:analysis.models.map(mask=>({__model:mask})),
      choice:{question:'A conclusão decorre necessariamente das premissas?',options:['Válido','Inválido'],correct:analysis.valid?'Válido':'Inválido',explanation:analysis.valid?'Cada modelo com premissas verdadeiras mantém a conclusão verdadeira.':'Existe um modelo de conjuntos com as duas premissas verdadeiras e a conclusão falsa.'},
      title:'Traduza, construa o Venn e avalie o silogismo',instruction:'Traduza as frases, marque as restrições das premissas no Venn e, em seguida, teste modelos concretos.',hint:'∀ significa “para todo indivíduo”; ∃ significa “existe um indivíduo”. Todos S são P: ∀x(S(x) → P(x)). Alguns S não são P: ∃x(S(x) ∧ ¬P(x)).',
      resolution:`${template.rule} ${analysis.valid?'O argumento é válido.':'O argumento é inválido.'} ${analysis.counter?'Contraexemplo: '+catCounter(analysis.counter,terms)+'.':''} A validade foi verificada em todos os 255 modelos com domínio não vazio e até um representante para cada uma das oito regiões dos três conjuntos.`,
      metadata:{signature:key,premises:forms.slice(0,2),conclusion:forms[2],counterModel:analysis.counter,terms},
      cat:{forms,terms,texts:forms.map(st=>catText(st,terms)),values:['','',''],flags:[false,false,false],first:[null,null,null],unlocked:false,active:0,message:'',modelRow:0,showComparison:true,showFullTable:false,modelHelpKey:'',venn:{shaded:[],workingShade:[],phase:0,lastRegion:null,witnessChoices:{},verified:false,verdict:'',verdictVerified:false,feedback:'',verdictFeedback:'',firstShade:null,firstWitness:{},firstVerdict:null},kind:level==='easy'?'guided':'formula',options:forms.map(st=>{const choices=['all','none','some','somenot'].map(k=>catFormula(C(k,st.a,st.b)));for(let j=choices.length-1;j>0;j--){const k=rng(j+1);[choices[j],choices[k]]=[choices[k],choices[j]]}return choices})},
      answers:{},picked:'',grade:null,gradedEver:false,revealed:false,hintVisible:false};return ex;
  }
  function renderCategorical(){const area=$('categoricalArea'),ex=exercise;if(ex.mode!=='categoricos'){area.innerHTML='';area.classList.add('hide');renderVenn();return}
    const cat=ex.cat;area.classList.remove('hide');
    let html='<div class="translation-heading"><span class="translation-step">PASSO 1 · TRADUZIR COM QUANTIFICADORES</span><span class="translation-topic">Silogismo categórico</span></div>';
    html+='<p class="categorical-intro">Cada indivíduo pertence ou deixa de pertencer a três conjuntos. Traduza as duas premissas e a conclusão. Fórmulas equivalentes são aceitas, inclusive com outra escrita dos quantificadores.</p>';
    html+='<div class="categorical-terms">'+['S','M','P'].map(x=>`<div><b>${x}(x)</b><br>x é um dos ${escapeHTML(cat.terms[x])}</div>`).join('')+'</div>';
    cat.texts.forEach((txt,i)=>{html+=`<div class="categorical-stage"><strong>${i===2?'CONCLUSÃO':`PREMISSA ${i+1}`}${cat.flags[i]?' ✓ correta':''}</strong><p>${escapeHTML(txt)}</p>`;
      if(cat.kind==='guided')html+='<div class="translation-options" role="group" aria-label="Escolher fórmula">'+cat.options[i].map((opt,j)=>`<button type="button" class="translation-option ${cat.values[i]===opt?'active':''}" data-cat-choice="${i}:${j}" ${cat.unlocked||ex.revealed?'disabled':''}>${escapeHTML(opt)}</button>`).join('')+'</div>';
      else html+=`<label class="translation-input-label">Fórmula quantificada<input type="text" data-cat-field="${i}" value="${escapeHTML(cat.values[i])}" placeholder="Ex.: ∀x(S(x) → P(x))" spellcheck="false" autocomplete="off" ${cat.unlocked||ex.revealed?'disabled':''}></label>`;
      html+='</div>'});
    if(cat.kind!=='guided'&&!cat.unlocked&&!ex.revealed)html+='<div class="symbol-keypad" aria-label="Inserir símbolos">'+['∀','∃','x','S(x)','M(x)','P(x)','¬','∧','∨','→','(',')'].map(sym=>`<button type="button" data-cat-symbol="${escapeHTML(sym)}" aria-label="Inserir ${escapeHTML(sym)}">${escapeHTML(sym)}</button>`).join('')+'</div><p class="translation-caption">Use ∀x(...), ∃x(...), S(x), M(x), P(x), ¬, ∧, ∨ e →. A correção compara o significado em todos os modelos.</p>';
    html+=`<div class="translation-bottom"><button type="button" id="validateCategorical" class="button primary" ${cat.unlocked||ex.revealed?'disabled':''}>${cat.unlocked?'✓ Fórmulas aprovadas':'✓ Conferir traduções'}</button><span class="translation-state">${cat.unlocked?'PASSO 2 LIBERADO · CONSTRUA O DIAGRAMA DE VENN':'Complete as três traduções para liberar os modelos.'}</span></div>`;
    if(cat.message)html+=`<div class="translation-feedback ${cat.unlocked?'ok':'note'}" role="status">${cat.message}</div>`;
    if(ex.revealed&&!cat.unlocked)html+='<div class="translation-feedback ok">Modelos de tradução: '+cat.forms.map((f,i)=>`${i===2?'Conclusão':`Premissa ${i+1}`}: <strong>${escapeHTML(catFormula(f))}</strong>`).join(' · ')+'</div>';
    html+='<p class="cat-note">Convenção: “Todos” permite conjunto vazio; “Alguns” exige ao menos um indivíduo. O universo de indivíduos é sempre não vazio. A tabela mostra exemplos de modelos; a validade é conferida pelo mecanismo sobre os 255 modelos representativos.</p>';
    area.innerHTML=html;
    renderVenn();
    const tableUnlocked=cat.venn.verdictVerified||ex.revealed;
    $('tableStage').classList.toggle('hide',!tableUnlocked);$('decisionArea').classList.toggle('hide',!tableUnlocked);
    $('checkButton').disabled=!tableUnlocked||ex.revealed;
    $('tableHeaderTitle').firstChild.textContent='Tabela de modelos ';$('lineCount').textContent=`· ${ex.envs.length} exemplos`;
    $('exerciseIndex').textContent=`Rodada ${serial} · ${ex.envs.length} modelos ilustrativos`;
    $('categoricalModelsHelp').classList.remove('hide');
    $('categoricalModelsHelp').innerHTML='';
    renderCategoricalModelWorkbench();
  }
  /* Etapa visual de Venn: sombrear as oito regiões e marcar testemunhas existenciais.
     Um X na fronteira representa uma testemunha cuja pertinência ao terceiro conjunto é indeterminada. */
  const VENN_POINTS={0:[439,280],1:[240,263],2:[354,105],3:[305,203],4:[125,105],5:[176,203],6:[240,79],7:[240,157]};
  const VENN_NAMES={0:'fora de S, M e P',1:'somente P',2:'somente M',3:'M e P, fora de S',4:'somente S',5:'S e P, fora de M',6:'S e M, fora de P',7:'S, M e P'};
  const VENN_PAIRS=['S','M','P'];
  const vennRegName=p=>VENN_NAMES[p];
  const vennProfile=st=>Array.from({length:8},(_,i)=>i).filter(p=>catMembership(p,st.a)&&(st.kind==='some'?catMembership(p,st.b):!catMembership(p,st.b)));
  const vennRestrictions=forms=>Array.from({length:8},(_,i)=>i).filter(p=>forms.slice(0,2).some(f=>(f.kind==='all'||f.kind==='none')&&!catValue(f,1<<p)));
  function vennRequirements(ex){
    const shade=vennRestrictions(ex.cat.forms),witnesses=[];
    ex.cat.forms.slice(0,2).forEach((f,i)=>{
      if(f.kind!=='some'&&f.kind!=='somenot')return;
      const profiles=vennProfile(f).filter(p=>!shade.includes(p));
      witnesses.push({index:i,profiles,correct:profiles.join('-')});
    });return {shade,witnesses};
  }
  function vennClip(name,cx,cy,r,inside){
    if(inside)return `<clipPath id="venn-in-${name}"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath>`;
    return `<clipPath id="venn-out-${name}"><path clip-rule="evenodd" d="M0 0H480V330H0Z M${cx+r} ${cy} A${r} ${r} 0 1 0 ${cx-r} ${cy} A${r} ${r} 0 1 0 ${cx+r} ${cy}Z"/></clipPath>`;
  }
  function vennSvg(shade,witnessSelections){
    const circles={S:[190,126,91],M:[290,126,91],P:[240,211,91]};
    const clips=Object.entries(circles).map(([n,[x,y,r]])=>vennClip(n,x,y,r,true)+vennClip(n,x,y,r,false)).join('');
    const shaped=shade.map(p=>{
      const bits=[['S',4],['M',2],['P',1]],open=bits.map(([n,bit])=>`<g clip-path="url(#venn-${p&bit?'in':'out'}-${n})">`).join('');
      return `${open}<rect x="0" y="0" width="480" height="330" fill="url(#venn-stripes)"/></g></g></g>`;
    }).join('');
    const xs=witnessSelections.map((entry,i)=>{
      const pts=entry.profiles.map(p=>VENN_POINTS[p]);if(!pts.length)return '';
      let cx=pts.reduce((a,p)=>a+p[0],0)/pts.length,cy=pts.reduce((a,p)=>a+p[1],0)/pts.length;
      if(entry.profiles.length===2){
        const [a,b]=entry.profiles,changed=a^b,third=changed===4?'S':changed===2?'M':'P';
        const [ox,oy,r]=circles[third],[ax,ay]=VENN_POINTS[a],[bx,by]=VENN_POINTS[b];
        const insideA=!!(a&changed);let lo=0,hi=1;
        for(let j=0;j<30;j++){const mid=(lo+hi)/2,x=ax+(bx-ax)*mid,y=ay+(by-ay)*mid;
          const inside=(x-ox)**2+(y-oy)**2<=r**2;
          if(inside===insideA)lo=mid;else hi=mid;
        }
        const fraction=(lo+hi)/2;cx=ax+(bx-ax)*fraction;cy=ay+(by-ay)*fraction;
      }
      return `<g class="venn-witness" pointer-events="none"><circle cx="${cx}" cy="${cy}" r="17" fill="var(--panel)" stroke="var(--teal)" stroke-width="2.4"/><text x="${cx}" y="${cy+5}" text-anchor="middle" fill="var(--teal)" font-size="17" font-weight="900">×${witnessSelections.length>1?i+1:''}</text></g>`;
    }).join('');
    return `<svg class="venn-svg" viewBox="0 0 480 330" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg"><defs>${clips}<pattern id="venn-stripes" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(40)"><rect width="10" height="10" fill="var(--accent-bg)"/><path d="M0 0V10" stroke="var(--accent)" stroke-opacity=".8" stroke-width="4"/></pattern></defs><rect x="8" y="7" width="464" height="316" rx="16" fill="var(--input)" stroke="var(--border)"/>${shaped}${Object.entries(circles).map(([n,[x,y,r]])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${n==='S'?'#83a7ff':n==='M'?'#65dab0':'#e2b66e'}" stroke-width="2.5"/>`).join('')}<text x="112" y="62" fill="#83a7ff" font-weight="800" font-size="17">S</text><text x="366" y="62" fill="#65dab0" font-weight="800" font-size="17">M</text><text x="241" y="310" fill="#e2b66e" font-weight="800" font-size="17" text-anchor="middle">P</text>${Object.entries(VENN_POINTS).map(([n,[x,y]])=>`<g data-venn-region="${n}" class="venn-hotspot"><circle cx="${x}" cy="${y}" r="24" fill="var(--panel)" stroke="${shade.includes(Number(n))?'var(--accent)':'var(--border-hi)'}" stroke-width="2"/><text x="${x}" y="${y+5}" text-anchor="middle" fill="var(--text)" font-size="14" font-weight="800" pointer-events="none">${Number(n)+1}</text></g>`).join('')}${xs}</svg>`;
  }
  // Reutilizada no Venn de premissas e no Venn de cada modelo concreto.
  function vennTermsLegend(terms){
    return `<div class="venn-term-legend" aria-label="Legenda dos conjuntos">${['S','M','P'].map(letter=>`<span><b class="venn-term-${letter.toLowerCase()}">${letter}</b> = ${escapeHTML(terms[letter])}</span>`).join('')}</div>`;
  }
  // Comece pelas premissas universais (áreas vazias), depois pelas existenciais (X).
  function vennTasks(ex){
    const tasks=[],forms=ex.cat.forms;
    forms.slice(0,2).forEach((f,i)=>{if(f.kind==='all'||f.kind==='none')tasks.push({kind:'shade',index:i,expected:vennRestrictions([f])})});
    const req=vennRequirements(ex);
    req.witnesses.forEach(w=>tasks.push({kind:'witness',index:w.index,witness:w}));
    return tasks;
  }
  function vennUnion(a,b){return [...new Set([...(a||[]),...(b||[])])].sort((x,y)=>x-y)}
  function vennPlainRegion(p,terms){
    const inside=VENN_PAIRS.filter(letter=>catMembership(p,letter)).map(letter=>`${letter} (${terms[letter]})`);
    const outside=VENN_PAIRS.filter(letter=>!catMembership(p,letter)).map(letter=>`${letter} (${terms[letter]})`);
    return `${inside.length?'Dentro de '+inside.join(' e '):'Fora dos três grupos'}${outside.length&&inside.length?'; fora de '+outside.join(' e '):''}.`;
  }
  function vennTaskPrompt(f,terms){
    const a=`${f.a} (${terms[f.a]})`,b=`${f.b} (${terms[f.b]})`;
    switch(f.kind){
      case 'all':return `Procure alguém que esteja em ${a} e fora de ${b}. Essa pessoa contrariaria a frase “Todos”. Toque nas regiões em que isso aconteceria.`;
      case 'none':return `A frase “Nenhum” proíbe pessoas nos dois grupos ao mesmo tempo. Toque nas regiões que ficam dentro de ${a} E de ${b}.`;
      case 'some':return `Existe pelo menos uma pessoa que pertence a ${a} E a ${b}. Escolha uma posição para o X.`;
      default:return `Existe pelo menos uma pessoa de ${a} que está FORA de ${b}. Escolha uma posição para o X.`;
    }
  }
  function vennWitnessOptions(w,terms){
    // Ofereça as duas posições concretas e, quando a terceira categoria for desconhecida, a fronteira.
    const profiles=w.profiles;
    if(profiles.length===2)return [
      ...profiles.map(p=>({key:String(p),label:`Só na região ${p+1}: ${vennPlainRegion(p,terms)}`})),
      {key:w.correct,label:`Na fronteira entre ${profiles.map(p=>'região '+(p+1)).join(' e ')}: sabemos que existe alguém, mas falta saber a terceira categoria.`}
    ];
    const p=profiles[0];
    const other=Array.from({length:8},(_,i)=>i).filter(i=>i!==p).sort((a,b)=>(a^p)-(b^p)).slice(0,2);
    return [p,...other].map(i=>({key:String(i),label:`Região ${i+1}: ${vennPlainRegion(i,terms)}`}));
  }
  function renderVenn(){
    const area=$('vennArea'),ex=exercise;
    if(ex?.mode!=='categoricos'||(!ex.cat.unlocked&&!ex.revealed)){area.innerHTML='';area.classList.add('hide');$('categoricalModelsHelp').classList.add('hide');return}
    area.classList.remove('hide');
    const cat=ex.cat,v=cat.venn,req=vennRequirements(ex),tasks=vennTasks(ex),phase=v.phase||0;
    const completed=v.verified||ex.revealed,active=completed?null:tasks[phase];
    const shade=ex.revealed?req.shade:vennUnion(v.shaded,active?.kind==='shade'?v.workingShade:[]);
    const witnesses=req.witnesses.map(w=>{
      const key=ex.revealed?w.correct:v.witnessChoices[w.index];return key?{index:w.index,profiles:key.split('-').map(Number)}:null;
    }).filter(Boolean);
    let html='<div class="translation-heading"><span class="translation-step">PASSO 2 · ENTENDA AS PREMISSAS COM O VENN</span><span class="translation-topic">Um passo de cada vez</span></div>';
    html+='<p class="venn-simple-lead">Cada círculo representa um grupo. O desenho tem oito regiões numeradas. <strong>Listras = alguém ali contrariaria uma premissa.</strong> <strong>X = pelo menos uma pessoa existe ali.</strong> Vamos marcar uma premissa por vez: primeiro as áreas impossíveis, depois os X.</p>';
    if(active){
      const f=cat.forms[active.index],how=active.kind==='shade'?'MARQUE O QUE É IMPOSSÍVEL':'MOSTRE QUE EXISTE ALGUÉM';
      html+=`<div class="venn-task-card"><div class="venn-progress">Premissa ${active.index+1} · Exercício visual ${phase+1} de ${tasks.length}</div><span class="venn-step-label">${how}</span><div class="venn-statement">“${escapeHTML(cat.texts[active.index])}”</div><p class="venn-instruction">${escapeHTML(vennTaskPrompt(f,cat.terms))}</p></div>`;
    }else html+='<div class="venn-task-card"><span class="venn-step-label">DIAGRAMA COMPLETO</span><div class="venn-statement">As duas premissas já estão representadas.</div><p class="venn-instruction">Agora examine o desenho e avalie se a conclusão é obrigatória.</p></div>';
    html+=`<div class="venn-simple-board"><div class="venn-diagram"><p class="venn-diagram-guide">${active?.kind==='shade'?'Toque nos números dentro dos círculos para marcar ou desmarcar uma região.':'Observe as regiões marcadas no desenho.'}</p>${vennSvg(shade,witnesses)}${vennTermsLegend(cat.terms)}<div class="venn-legend"><span><span class="stripe-sample"></span> Impossível</span><span><span class="x-sample">X</span> Existe alguém</span></div></div>`;
    html+='<div class="venn-simple-tools">';
    // Alternativa nativa, sincronizada ao mesmo estado do desenho.
    if(active?.kind==='shade'){
      const selected=vennUnion(v.shaded,v.workingShade);
      html+='<div class="venn-text-alternative"><strong>Regiões por texto e teclado</strong><p>Use Tab para percorrer as oito regiões e espaço ou Enter para marcar. Os mesmos estados aparecem no desenho.</p><div class="venn-text-region-grid" role="group" aria-label="Selecionar regiões do Diagrama de Venn">';
      html+=Array.from({length:8},(_,n)=>`<button type="button" class="venn-text-region ${selected.includes(n)?'selected':''}" data-venn-region-text="${n}" aria-pressed="${selected.includes(n)}" aria-label="Região ${n+1}: ${escapeHTML(vennPlainRegion(n,cat.terms))}${v.shaded.includes(n)?' Já marcada na premissa anterior.':''}">${n+1}. ${escapeHTML(vennRegName(n))}${selected.includes(n)?' · Marcada':''}</button>`).join('');
      html+='</div></div>';
    }

    if(active?.kind==='shade'){
      const selected=v.workingShade||[],already=v.shaded||[];
      html+=`<div class="venn-selected-list"><strong>Regiões que você marcou nesta frase:</strong><div>${selected.length?selected.map(p=>`Região ${p+1}`).join(', '):'Toque em uma região numerada no desenho.'}</div>${already.length?`<div style="margin-top:6px;color:var(--muted)">Já marcadas em outra premissa: ${already.map(p=>p+1).join(', ')}.</div>`:''}</div>`;
      const remaining=active.expected.filter(p=>!already.includes(p));
      if(remaining.length===0)html+='<div class="venn-region-meaning">Esta premissa reforça regiões que já ficaram listradas. Confira para continuar.</div>';
      if(v.lastRegion!==undefined&&v.lastRegion!==null)html+=`<div class="venn-region-meaning"><strong>Região ${v.lastRegion+1}:</strong> ${escapeHTML(vennPlainRegion(v.lastRegion,cat.terms))}</div>`;
      html+=`<button type="button" class="button primary" id="validateVenn">Conferir esta premissa →</button><button type="button" class="button small" id="clearVenn">Limpar marcas desta frase</button>`;
      html+=`<details class="venn-hint-details"><summary>Preciso de uma dica</summary><p>${escapeHTML(vennTaskPrompt(cat.forms[active.index],cat.terms))} Compare cada região com a frase: marque apenas as que a contradizem.</p></details>`;
    }else if(active?.kind==='witness'){
      const w=active.witness,selected=v.witnessChoices[w.index]||'',options=vennWitnessOptions(w,cat.terms);
      html+='<div class="venn-mini-title">Onde colocar o X?</div><p class="venn-tool-note">Escolha uma opção. O desenho mostrará sua marca. Se a frase deixa uma categoria em dúvida, a fronteira mantém essa informação em aberto.</p>';
      html+=`<div class="venn-choices">${options.map(o=>`<button type="button" data-venn-witness-choice="${escapeHTML(o.key)}" data-venn-witness-index="${w.index}" aria-pressed="${selected===o.key}">${escapeHTML(o.label)}</button>`).join('')}</div>`;
      html+='<button type="button" class="button primary" id="validateVenn">Conferir posição do X →</button>';
      html+='<details class="venn-hint-details"><summary>Por que existe a opção de fronteira?</summary><p>“Alguns S são M” exige alguém em S e M. Se o enunciado deixa em aberto o terceiro grupo, o X fica sobre a linha divisória. Dois X representam duas existências exigidas e podem corresponder à mesma pessoa.</p></details>';
    }else{
      html+='<p class="venn-tool-note">As partes listradas contradizem alguma premissa. Cada X representa uma existência exigida. Use essas informações para avaliar a conclusão.</p>';
    }
    if(v.feedback&&!ex.revealed)html+=`<div class="venn-simple-feedback ${v.verified?'good':''}" role="status">${escapeHTML(v.feedback)}</div>`;
    if(ex.revealed)html+='<div class="venn-simple-feedback good">Resolução exibida: as áreas listradas são impossíveis e os X mostram existências exigidas pelas premissas.</div>';
    html+='</div></div>';
    if(completed){
      html+=`<div class="venn-verdict"><div class="venn-mini-title">PASSO 3 · A CONCLUSÃO É OBRIGATÓRIA?</div><p><strong>Conclusão:</strong> ${escapeHTML(cat.texts[2])}</p><p>Imagine todas as maneiras possíveis de preencher as áreas livres respeitando as premissas. A conclusão seria verdadeira em todas elas?</p><div class="venn-verdict-choices">${['Sim, o argumento é válido','Pode existir um contraexemplo'].map((label,i)=>`<button class="button ${v.verdict===(i===0?'yes':'no')?'venn-selected':''}" data-venn-verdict="${i===0?'yes':'no'}" type="button" ${v.verdictVerified||ex.revealed?'disabled':''}>${label}</button>`).join('')}</div><button class="button primary" type="button" id="validateVennVerdict" ${v.verdictVerified||ex.revealed?'disabled':''}>${v.verdictVerified||ex.revealed?'✓ Interpretação concluída':'Conferir conclusão →'}</button>`;
      if(v.verdictFeedback||ex.revealed)html+=`<p class="venn-verdict-feedback" role="status">${ex.revealed?'Resultado: '+(ex.choice.correct==='Válido'?'a conclusão é obrigatória.':'há um contraexemplo possível.') : escapeHTML(v.verdictFeedback)}</p>`;
      html+='</div>';
    }
    html+=`<p class="venn-gate">${v.verdictVerified||ex.revealed?'PASSO 4 LIBERADO · AGORA TESTE MODELOS CONCRETOS':'A tabela de modelos será liberada depois de concluir o desenho e avaliar a conclusão.'}</p>`;
    area.innerHTML=html;
  }
  function rerenderVennWithFocus(trigger){
    const textRegion=trigger?.dataset?.vennRegionText;
    const choice=trigger?.dataset?.vennWitnessChoice;
    const verdict=trigger?.dataset?.vennVerdict;
    const id=trigger?.id;
    renderVenn();
    let replacement=null;
    if(textRegion!==undefined)replacement=[...$('vennArea').querySelectorAll('[data-venn-region-text]')].find(b=>b.dataset.vennRegionText===textRegion);
    else if(choice!==undefined)replacement=[...$('vennArea').querySelectorAll('[data-venn-witness-choice]')].find(b=>b.dataset.vennWitnessChoice===choice);
    else if(verdict!==undefined)replacement=[...$('vennArea').querySelectorAll('[data-venn-verdict]')].find(b=>b.dataset.vennVerdict===verdict);
    else if(id)replacement=document.getElementById(id);
    replacement?.focus({preventScroll:true});
  }
  function validateVenn(){
    const ex=exercise;if(ex?.mode!=='categoricos'||!ex.cat.unlocked||ex.revealed)return;
    const v=ex.cat.venn;if(v.verified)return;
    const tasks=vennTasks(ex),task=tasks[v.phase||0];if(!task)return;
    let okay=false;
    if(task.kind==='shade'){
      const expected=task.expected.filter(p=>!v.shaded.includes(p));
      const current=v.workingShade||[];
      okay=JSON.stringify([...current].sort((a,b)=>a-b))===JSON.stringify(expected);
      if(v.firstShade===null)v.firstShade=okay;
      if(okay){v.shaded=vennUnion(v.shaded,current);v.workingShade=[];v.lastRegion=null;}
      else v.feedback=`Confira a premissa ${task.index+1}: as regiões listradas devem representar situações que contradizem esta frase. Revise os grupos dentro e fora de cada região.`;
    }else{
      const w=task.witness;
      okay=v.witnessChoices[w.index]===w.correct;
      if(v.firstWitness[w.index]===undefined)v.firstWitness[w.index]=okay;
      if(!okay)v.feedback=w.profiles.length===2?'A frase exige uma pessoa, mas ainda deixa o terceiro grupo em aberto. Procure a opção de fronteira.':'Confira os grupos da pessoa indicada por X. Ela deve satisfazer toda a frase.';
    }
    if(okay){
      v.phase=(v.phase||0)+1;
      v.feedback=v.phase<tasks.length?`Correto! Agora represente a próxima premissa.`:'Muito bem! Você representou todas as premissas. Agora avalie a conclusão.';
      if(v.phase>=tasks.length){v.verified=true;if(v.firstShade===null)v.firstShade=true;}
      toast(v.verified?'Diagrama pronto: avalie a conclusão.':'Premissa representada corretamente!');
    }
    renderVenn();
  }
  function validateVennVerdict(){
    const ex=exercise;if(ex?.mode!=='categoricos'||ex.revealed||!ex.cat.venn.verified)return;
    const v=ex.cat.venn;if(!v.verdict)return;const correct=(v.verdict===(ex.choice.correct==='Válido'?'yes':'no'));
    if(v.firstVerdict===null)v.firstVerdict=correct;
    if(correct){v.verdictVerified=true;v.verdictFeedback=ex.choice.correct==='Válido'?'Correto: as premissas obrigam a conclusão. Agora vamos testar outros modelos: cada linha representa um cenário independente, e você verá as pessoas dentro do mesmo Venn.':'Correto: pode existir um cenário com premissas V e conclusão F. Na próxima etapa, examine um modelo por vez e encontre esse contraexemplo.';toast('Tabela de modelos liberada!')}
    else v.verdictFeedback='Revise o que o diagrama garante: a conclusão precisa valer em todas as interpretações que respeitam as premissas. Um único contraexemplo já torna o argumento inválido.';
    renderVenn();$('tableStage').classList.toggle('hide',!v.verdictVerified);$('decisionArea').classList.toggle('hide',!v.verdictVerified);$('checkButton').disabled=!v.verdictVerified;renderCategoricalModelWorkbench();renderSidebar();if(correct)$('categoricalModelWorkbench').scrollIntoView({behavior:'smooth',block:'start'});
  }

  function validateCategorical(){const ex=exercise;if(ex?.mode!=='categoricos'||ex.revealed)return;const cat=ex.cat,messages=[];let all=true;
    for(let i=0;i<3;i++){
      const text=cat.values[i].trim();if(!text){messages.push(`Frase ${i+1}: preencha a tradução.`);all=false;continue}
      try{const parsed=parseCategoricalFormula(text);let bad=null,actual,expect;
        for(let mask=1;mask<256;mask++){actual=catEvalFormula(parsed,mask);expect=catValue(cat.forms[i],mask);if(actual!==expect){bad=mask;break}}
        const correct=bad===null;if(cat.first[i]===null)cat.first[i]=correct;cat.flags[i]=correct;
        if(!correct){all=false;messages.push(`Frase ${i+1}: revise a fórmula. Modelo que diferencia as expressões: ${catCounter(bad,cat.terms)}. Sua fórmula = ${t(actual)}; frase = ${t(expect)}.`)}
      }catch(err){all=false;cat.flags[i]=false;if(cat.first[i]===null)cat.first[i]=false;messages.push(`Frase ${i+1}: ${err.message}`)}
    }
    if(all){cat.unlocked=true;cat.message='Traduções corretas! Agora represente as premissas no Diagrama de Venn. A tabela será liberada após a análise visual.';toast('Tradução categórica correta!')}else cat.message=messages.map(escapeHTML).join('<br>');
    renderCategorical();renderTable();renderSidebar();
  }

    /* Laboratório rigoroso: provas curtas verificáveis e semântica de Kripke/traces finitos.
     Todos os modelos e valores de verdade são calculados localmente, sem biblioteca externa. */
  
  
  THEOREM_WORKSHOPS.push(
    {tier:'hard',title:'Completude do tableau proposicional',claim:'Se um tableau proposicional saturado tem ramo aberto, sua raiz é satisfatível.',scope:'Tableaux clássicos com regras de decomposição completas, aplicação justa e fórmulas finitas.',context:'Construa uma valoração a partir dos literais do ramo aberto.',parts:[
      {question:'Por que podemos atribuir valores aos átomos a partir do ramo?',options:['O ramo aberto não contém p e ¬p juntos','Toda fórmula é verdadeira por definição','Um ramo aberto é sempre infinito'],correct:0,why:'Um ramo aberto consistente determina valores compatíveis com todos os seus literais.'},
      {question:'Por que a valoração satisfaz também as fórmulas compostas do ramo?',options:['Porque sua decomposição saturada respeita ∧, ∨, ¬ e →','Porque toda fórmula é uma premissa','Porque o ramo tem duas folhas'],correct:0,why:'Indução estrutural nas fórmulas: as regras de expansão preservam as condições de satisfação.'},
      {question:'Se a raiz é insatisfatível, todo tableau completo e justo:',options:['Possui um ramo aberto','Fecha todos os ramos','Tem uma única variável'],correct:1,why:'Se algum ramo permanecesse aberto e saturado, forneceria uma valoração-modelo, contradizendo a insatisfatibilidade.'}]},
    {tier:'hard',title:'Compacidade proposicional',claim:'Se todo subconjunto finito de Γ tem modelo, então Γ tem modelo.',scope:'Linguagem proposicional enumerável; árvore finitamente ramificada e lema de König.',context:'Enumere as fórmulas de Γ e os átomos; considere atribuições parciais extensíveis a modelos dos primeiros n enunciados.',parts:[
      {question:'Por que existe um nó em todo nível n da árvore?',options:['Os primeiros n enunciados de Γ são satisfatíveis','Toda fórmula é válida','Qualquer ramo pode conter contradição'],correct:0,why:'A satisfatibilidade de cada subconjunto finito fornece uma valoração extensora.'},
      {question:'Por que a árvore tem um ramo infinito?',options:['Pelo lema de König aplicado à árvore binária com níveis não vazios','Porque todos os átomos são V','Pelo modus ponens'],correct:0,why:'Cada nível é finito, cada nó possui no máximo dois filhos e há nós em arbitrariamente todos os níveis.'},
      {question:'Por que a valoração da ramificação satisfaz cada fórmula de Γ?',options:['Cada fórmula aparece no prefixo testado após algum nível e seus átomos ficam fixos','É consequência de Γ ser vazia','Porque fórmulas não têm variáveis'],correct:0,why:'Fixado um enunciado Γ_i, em níveis suficientemente altos ele é imposto e todas as suas variáveis recebem valores definitivos.'}]}
  );
  THEORY_CARDS.metateoria.push(
    {title:'5 · Completude do tableau proposicional',statement:'Ramo aberto e saturado ⇒ existe um modelo da raiz.',hypothesis:'Regras clássicas de tableau aplicadas até a saturação, de maneira justa.',proof:['No ramo aberto, nenhum átomo aparece simultaneamente com sua negação. Atribua V aos átomos positivos e F aos negativos.','Por indução na complexidade das fórmulas e pelas regras de decomposição, a atribuição satisfaz todas as fórmulas do ramo.','Logo satisfaz a raiz. Por contraposição: se a raiz é insatisfatível, um tableau completo fecha todos os ramos.'],scope:'Completude do procedimento de tableau proposicional, diferente da mera correção e da completude de um sistema axiomático arbitrário.'},
    {title:'6 · Teorema da compacidade proposicional',statement:'(∀Δ⊆Γ, Δ finito ⇒ Δ satisfatível) ⇒ Γ satisfatível.',hypothesis:'Linguagem proposicional enumerável e finitude das fórmulas.',proof:['Enumere fórmulas Γ₁,Γ₂,… e átomos p₁,p₂,… . Em cada nível n, considere atribuições aos primeiros n átomos que se estendam a um modelo das primeiras n fórmulas.','A hipótese de satisfatibilidade finita fornece nós em todos os níveis. Os nós formam uma árvore binária, fechada por prefixos. Pelo lema de König, existe um ramo infinito.','O ramo determina uma valoração. Para cada fórmula Γᵢ, escolha n suficientemente alto para incluir Γᵢ e seus átomos; a valoração satisfaz Γᵢ. Portanto satisfaz todo Γ.'],scope:'O argumento depende do lema de König. A versão de primeira ordem requer técnicas de completude/compacidade próprias.'}
  );
  function modalReason(f,w,model){
    const val=evaluateModal(f,w,model),letter=fmtFormula(f);
    if(f.op==='atom')return `${letter} em w${w} vale ${val?'V':'F'} na tabela.`;
    if(f.op==='not')return `A fórmula interna ${fmtFormula(f.args[0])} vale ${evaluateModal(f.args[0],w,model)?'V':'F'} em w${w}; a negação inverte esse valor.`;
    if(f.op==='imp')return `Em w${w}, o antecedente vale ${evaluateModal(f.args[0],w,model)?'V':'F'} e o consequente vale ${evaluateModal(f.args[1],w,model)?'V':'F'}; só V→F é falsa.`;
    if(f.op==='and')return `Em w${w}, as parcelas valem ${evaluateModal(f.args[0],w,model)?'V':'F'} e ${evaluateModal(f.args[1],w,model)?'V':'F'}; ambas precisam ser V.`;
    const dest=model.edges[w];if(!dest.length)return `w${w} não possui mundos acessíveis: toda fórmula □ é V e toda fórmula ◇ é F nesse mundo.`;
    const inner=f.args[0],found=dest.map(x=>`w${x}: ${fmtFormula(inner)}=${evaluateModal(inner,x,model)?'V':'F'}`).join('; ');
    return `A partir de w${w}: ${found}. ${f.op==='box'?'□ exige V em todos os destinos.':'◇ exige V em pelo menos um destino.'} Resultado: ${val?'V':'F'}.`;
  }
  function temporalReason(f,i,trace){
    const val=evaluateTrace(f,i,trace),inner=f.args[0],op=f.op;
    if(op==='atom')return `${fmtFormula(f)} em t${i} vale ${val?'V':'F'} na tabela.`;
    if(op==='X')return i===trace.length-1?`t${i} é o último instante; pela convenção de traço finito, Xφ=F.`:`O próximo instante é t${i+1}, onde ${fmtFormula(inner)} vale ${evaluateTrace(inner,i+1,trace)?'V':'F'}.`;
    if(op==='F'||op==='G'){
      const parts=trace.slice(i).map((_,j)=>`t${i+j}=${evaluateTrace(inner,i+j,trace)?'V':'F'}`).join(', ');
      return `A partir de t${i}, ${fmtFormula(inner)} vale: ${parts}. ${op==='F'?'F exige pelo menos um V.':'G exige todos V.'} Resultado: ${val?'V':'F'}.`;
    }
    if(op==='U'){
      const a=f.args[0],b=f.args[1];const possible=[];
      for(let j=i;j<trace.length;j++)if(evaluateTrace(b,j,trace)&&trace.slice(i,j).every((_,k)=>evaluateTrace(a,i+k,trace)))possible.push(j);
      return possible.length?`Há uma ocorrência válida de ${fmtFormula(b)} em t${possible[0]}, e ${fmtFormula(a)} vale em todos os instantes desde t${i} até antes dela.`:`De t${i} em diante, nenhum instante satisfaz ${fmtFormula(b)} com ${fmtFormula(a)} verdadeiro em todos os instantes anteriores.`;
    }
    if(op==='not')return `${fmtFormula(inner)} vale ${evaluateTrace(inner,i,trace)?'V':'F'} em t${i}; a negação inverte esse valor.`;
    if(op==='imp')return `Em t${i}, ${fmtFormula(f.args[0])} vale ${evaluateTrace(f.args[0],i,trace)?'V':'F'}, e ${fmtFormula(f.args[1])} vale ${evaluateTrace(f.args[1],i,trace)?'V':'F'}.`;
    if(op==='and')return `As duas parcelas em t${i} valem ${evaluateTrace(f.args[0],i,trace)?'V':'F'} e ${evaluateTrace(f.args[1],i,trace)?'V':'F'}.`;
    return 'Avalie cada subfórmula a partir do instante destacado.';
  }

  function theoremMode(level){
    const pool=THEOREM_WORKSHOPS.filter(c=>c.tier===level);
    const c=pick(pool);
    const special={type:'theorem',title:c.title,claim:c.claim,scope:c.scope,context:c.context,parts:c.parts,questions:c.parts.map(p=>({question:p.question}))};
    const ex=makeSpecial('metateoria',c.title,'Complete a demonstração escolhendo a justificativa correta para cada passo. A explicação aparecerá após a correção.',special,'Leia a hipótese do teorema e verifique quais afirmações valem em todos os modelos indicados.',c.claim+' · '+c.parts.map(p=>p.why).join(' '));
    ex.metadata.signature='theorem|'+level+'|'+c.title;
    return ex;
  }
  const M=(op,...args)=>({op,args});
  const MP=M('atom','p'),MQ=M('atom','q');
  function fmtFormula(f){const [a,b]=f.args;switch(f.op){case 'atom':return a;case 'not':return '¬'+fmtFormula(a);case 'box':return '□('+fmtFormula(a)+')';case 'dia':return '◇('+fmtFormula(a)+')';case 'F':return 'F('+fmtFormula(a)+')';case 'G':return 'G('+fmtFormula(a)+')';case 'X':return 'X('+fmtFormula(a)+')';case 'and':return '('+fmtFormula(a)+'∧'+fmtFormula(b)+')';case 'imp':return '('+fmtFormula(a)+'→'+fmtFormula(b)+')';case 'U':return '('+fmtFormula(a)+' U '+fmtFormula(b)+')';default:return '?'}}
  function evaluateModal(f,world,model){const [a,b]=f.args;switch(f.op){case 'atom':return model.truth[world][a];case 'not':return !evaluateModal(a,world,model);case 'and':return evaluateModal(a,world,model)&&evaluateModal(b,world,model);case 'imp':return !evaluateModal(a,world,model)||evaluateModal(b,world,model);case 'box':return model.edges[world].every(w=>evaluateModal(a,w,model));case 'dia':return model.edges[world].some(w=>evaluateModal(a,w,model));default:throw Error('Modal operator '+f.op)}}
  function evaluateTrace(f,i,trace){const [a,b]=f.args;switch(f.op){case 'atom':return trace[i][a];case 'not':return !evaluateTrace(a,i,trace);case 'and':return evaluateTrace(a,i,trace)&&evaluateTrace(b,i,trace);case 'imp':return !evaluateTrace(a,i,trace)||evaluateTrace(b,i,trace);case 'X':return i+1<trace.length?evaluateTrace(a,i+1,trace):false;case 'F':return trace.some((_,j)=>j>=i&&evaluateTrace(a,j,trace));case 'G':return trace.every((_,j)=>j<i||evaluateTrace(a,j,trace));case 'U':return trace.some((_,j)=>j>=i&&evaluateTrace(b,j,trace)&&trace.every((__,k)=>k<i||k>=j||evaluateTrace(a,k,trace)));default:throw Error('Trace operator '+f.op)}}
  const R_PATTERNS=[[[1,2],[2],[]],[[0,1],[1],[2]],[[1],[2],[]],[[1,2],[0],[0]], [[],[1],[0]],[[0,1],[0,2],[1,2]]];
  function truthRow(){return {p:Math.random()<.5,q:Math.random()<.5}}
  function semanticsMode(level,id='modais'){
    const temporal=['temporal','temporal_composta','temporal_condicional'].includes(id);
    let special,ex;
    if(!temporal){
      const edges=pick(R_PATTERNS).map(row=>row.slice()),truth=Array.from({length:3},truthRow),world=rng(3),model={edges,truth};
      const choices=level==='easy'?[MP,M('box',MP),M('dia',MQ)]:level==='medium'?[M('box',MP),M('dia',MQ),M('box',M('imp',MP,MQ))]:[M('dia',M('box',MP)),M('box',M('dia',MQ)),M('box',M('imp',MP,MQ))];
      const items=choices.map(f=>({formula:fmtFormula(f),value:evaluateModal(f,world,model)?'V':'F',reason:modalReason(f,world,model)}));
      special={type:'semanticworld',kind:'modal',start:world,model,items,questions:items.map(i=>({question:i.formula})),scope:'□ = em todos os mundos acessíveis; ◇ = em algum mundo acessível. O próprio mundo conta apenas quando existe acesso a ele.'};
      ex=makeSpecial('modais','Investigue um modelo de Kripke',`Determine V ou F para cada fórmula no mundo w${world}. Use as setas e a valoração de p e q.`,special,'Comece pelo mundo indicado; siga apenas as setas que saem dele. Para modalidades aninhadas, repita a busca a partir do novo mundo.','Cada resposta foi calculada recursivamente pela semântica de Kripke.');
      ex.metadata.signature='kripke|'+JSON.stringify({edges,truth,world,formulas:items.map(x=>x.formula)});
    }else{
      const trace=Array.from({length:4},truthRow),start=rng(3);const formulas=id==='temporal_composta'?[M('F',M('G',MP)),M('F',M('G',MQ)),M('G',M('F',MP))]:id==='temporal_condicional'?[M('G',M('imp',MP,M('F',MQ))),M('G',M('imp',MQ,M('F',MP))),M('G',M('imp',MP,M('F',MP)))]:[M('U',MP,MQ),M('G',MQ),M('X',MP)];
      const items=formulas.map(f=>({formula:fmtFormula(f),value:evaluateTrace(f,start,trace)?'V':'F',reason:temporalReason(f,start,trace)}));
      special={type:'semanticworld',kind:'temporal',start,model:{trace},items,questions:items.map(x=>({question:x.formula})),scope:'Traço finito: F e G incluem o instante atual; X exige um instante seguinte e é F no último; p U q exige ocorrência de q.'};
      ex=makeSpecial(id,'Avalie uma sequência temporal',`Determine V ou F para cada fórmula no instante t${start}. Leia a linha do tempo até o final.`,special,'Comece em t'+start+' e percorra os instantes seguintes na ordem.','Os resultados foram calculados sobre o traço finito exibido, com uma convenção explícita para X no último instante.');
      ex.metadata.signature='trace|'+JSON.stringify({trace,start,formulas:items.map(x=>x.formula)});
    }
    return ex;
  }
  function otherLogicMode(level,id,source=id){
    const model=createOtherLogicLab(source,level);
    const special={type:'otherlogic',...model,questions:model.items.map(x=>({question:x.formula}))};
    const ex=makeSpecial(id,model.title,model.context,special,
      'Leia os mundos, estados ou graus apresentados e aplique as regras explícitas do modelo antes de responder.',
      model.items.map(item=>item.reason).join(' '));
    ex.metadata.signature=id+'|'+JSON.stringify({cards:model.cards,items:model.items.map(x=>x.formula)});
    return ex;
  }
  function renderAdvancedSpecial(ex){const s=ex.special, graded=!!ex.grade||ex.revealed;
    if(s.type==='otherlogic')return `<div class="advanced-card"><span class="eyebrow">LABORATÓRIO SEMÂNTICO</span><h3>${escapeHTML(s.title)}</h3><p>${escapeHTML(s.context)}</p><div class="sem-model-grid">${s.cards.map(card=>`<div class="sem-world"><b>${escapeHTML(card.label)}</b><span>${escapeHTML(card.detail)}</span></div>`).join('')}</div><p class="sem-note">${escapeHTML(s.scope)}</p></div><div class="special-grid">${s.items.map((item,i)=>`<section class="special-card"><span class="eyebrow">DESAFIO ${i+1}</span><h4><code>${escapeHTML(item.formula)}</code></h4><label class="inline-label" for="otherLogicChoice${i}">Resultado no modelo</label><select id="otherLogicChoice${i}" data-special-field="${i}" ${ex.revealed?'disabled':''}><option value="">Escolha...</option>${item.options.map(opt=>`<option value="${escapeHTML(opt)}" ${s.values[i]===opt?'selected':''}>${escapeHTML(opt)}</option>`).join('')}</select>${graded?`<p class="course-question-explanation">${s.values[i]===item.value?'✓ Correto.':'Resultado esperado: '+escapeHTML(item.value)+'.'} ${escapeHTML(item.reason)}</p>`:''}</section>`).join('')}</div>`;
    if(s.type==='theorem')return `<div class="advanced-card"><span class="eyebrow">OFICINA DE DEMONSTRAÇÃO</span><h3>${escapeHTML(s.title)}</h3><p><b>Teorema:</b> <code>${escapeHTML(s.claim)}</code></p><p><b>Hipóteses:</b> ${escapeHTML(s.scope)}</p><p>${escapeHTML(s.context)}</p></div><div class="special-grid">${s.parts.map((p,i)=>`<section class="special-card"><span class="eyebrow">PASSO ${i+1} DE ${s.parts.length}</span><h4>${escapeHTML(p.question)}</h4><select aria-label="Resposta ao passo ${i+1}" data-special-field="${i}" ${ex.revealed?'disabled':''}><option value="">Escolha a justificativa...</option>${p.options.map((o,j)=>`<option value="${j}" ${s.values[i]===String(j)?'selected':''}>${escapeHTML(o)}</option>`).join('')}</select>${graded?`<p class="course-question-explanation">${s.values[i]===String(p.correct)?'✓ Acerto.':'Resposta esperada: '+escapeHTML(p.options[p.correct])+'.'} ${escapeHTML(p.why)}</p>`:''}</section>`).join('')}</div>`;
    if(s.type==='semanticworld'){
      let modelHtml='';
      if(s.kind==='modal'){
        modelHtml=`<div class="sem-model-grid">${s.model.truth.map((values,i)=>`<div class="sem-world ${i===s.start?'chosen':''}"><b>w${i}${i===s.start?' · ponto inicial':''}</b><span>p = ${values.p?'V':'F'} &nbsp; q = ${values.q?'V':'F'}</span><small>Acessa: ${s.model.edges[i].length?s.model.edges[i].map(j=>'w'+j).join(', '):'nenhum mundo'}</small></div>`).join('')}</div>`;
      }else{
        modelHtml=`<div class="sem-trace">${s.model.trace.map((values,i)=>`<div class="sem-tick ${i===s.start?'chosen':''}"><strong>t${i}</strong><span>p: ${values.p?'V':'F'}</span><span>q: ${values.q?'V':'F'}</span>${i===s.start?'<small>início</small>':''}</div>`).join('')}</div>`;
      }
      return `<div class="advanced-card"><span class="eyebrow">${s.kind==='modal'?'MODELO DE MUNDOS POSSÍVEIS':'LINHA DO TEMPO'}</span><h3>${s.kind==='modal'?'Leia as relações de acesso':'Leia os instantes em ordem'}</h3><p>${escapeHTML(s.scope)}</p>${modelHtml}<p class="sem-note">${s.kind==='modal'?'Uma seta w0 → w1 significa que w0 considera w1 acessível. A relação pode ter voltas ou mundos sem saída.':'Cada coluna mostra o que é verdade naquele instante; a avaliação começa no instante destacado.'}</p></div><div class="special-grid">${s.items.map((item,i)=>`<section class="special-card"><span class="eyebrow">FÓRMULA ${i+1}</span><h4><code>${escapeHTML(item.formula)}</code> no ${s.kind==='modal'?'mundo w':'instante t'}${s.start}</h4><label class="inline-label" for="semChoice${i}">Resultado da avaliação</label><select id="semChoice${i}" data-special-field="${i}" ${ex.revealed?'disabled':''}><option value="">Escolha V ou F...</option><option value="V" ${s.values[i]==='V'?'selected':''}>V · Verdadeiro</option><option value="F" ${s.values[i]==='F'?'selected':''}>F · Falso</option></select>${graded?`<p class="course-question-explanation">${s.values[i]===item.value?'✓ Correto.':'Valor correto: '+item.value+'.'} ${escapeHTML(item.reason)}</p>`:''}</section>`).join('')}</div>`;
    }
    return '';
  }

  const GENERATORS={...Object.fromEntries(Object.keys(ERROR_PRACTICE).map(id=>[id,()=>criticalThinkingMode(level,id)])),...Object.fromEntries(Object.keys({...GAP_PRACTICE,...MICRO_PRACTICE_A,...MICRO_PRACTICE_B,...FOCUSED_PRACTICE_A,...FOCUSED_PRACTICE_B}).map(id=>[id,l=>gapPracticeMode(l,id)])),inducao:()=>evidenceMode('inducao'),abducao:()=>evidenceMode('abducao'),probabilidade:()=>evidenceMode('probabilidade'),causalidade:()=>evidenceMode('causalidade'),pressupostos:assumptionsMode,categoricos2:categoricalReasoningMode,provas:proofMode,predicados2:predicatePrecisionMode,arvores:advancedConceptMode,...Object.fromEntries(Object.keys(FOUNDATIONS_PRACTICE).map(id=>[id,l=>foundationsPracticeMode(l,id)])),falacias:advancedConceptMode,modais:l=>semanticsMode(l,'modais'),temporal:l=>semanticsMode(l,'temporal'),temporal_composta:l=>semanticsMode(l,'temporal_composta'),temporal_condicional:l=>semanticsMode(l,'temporal_condicional'),...Object.fromEntries(OTHER_LOGIC_LAB_IDS.map(id=>[id,l=>otherLogicMode(l,id)])),fde_operacoes:l=>gapPracticeMode(l,'fde_operacoes'),intuicionista_negacao:l=>gapPracticeMode(l,'intuicionista_negacao'),paraconsistente:l=>alignedBasicMode(l,'paraconsistente',ALIGNED_BASIC_PRACTICE.paraconsistente),intuicionista:l=>alignedBasicMode(l,'intuicionista',ALIGNED_BASIC_PRACTICE.intuicionista),categoricos:categoricalMode,silogismos:syllogismsMode,deducao:deductionMode,traducao:translationMode,fundamentos:fundamentals,operadores:operators,compostas:composed,demorgan:demorgan,classificacao:classification,equivalencias:l=>equivalencePrecisionMode(l,'equivalencias'),equiv_algebra:l=>gapPracticeMode(l,'equiv_algebra'),equiv_condicionais:l=>equivalencePrecisionMode(l,'equiv_condicionais'),equiv_distributividade:l=>equivalencePrecisionMode(l,'equiv_distributividade'),equiv_absorcao:l=>equivalencePrecisionMode(l,'equiv_absorcao'),equiv_bicondicional:l=>equivalencePrecisionMode(l,'equiv_bicondicional'),argumentos:l=>argumentsMode(l,'intro')};
  const STORE_KEY='logiclab_progress_v1',THEME_KEY='logiclab_theme_v1';
  function blankStats(){return {tries:0,perfect:0,correct:0,total:0,byMode:{},translationTypes:{},deductionLevels:{}}}
  function loadStats(){try{const saved=JSON.parse(localStorage.getItem(STORE_KEY));if(saved&&typeof saved.tries==='number'&&saved.byMode)return saved}catch(e){}return blankStats()}
  let stats=loadStats(),mode='fundamentos',level='easy',exercise=null,serial=0,lastSignature='',toastTimer;
  function loadDrafts(){try{return readExerciseDrafts(localStorage.getItem(EXERCISE_DRAFTS_KEY),MODULES.map(m=>m.id))}catch{return {}}}
  let savedDrafts=loadDrafts(),undoClearState=null;
  function savedExam(){try{return readExamDraft(localStorage.getItem(EXAM_DRAFT_KEY))}catch{return null}}
  function persistDrafts(){
    try{
      localStorage.setItem(EXERCISE_DRAFTS_KEY,JSON.stringify({version:DRAFT_VERSION,byMode:savedDrafts}));
      $('draftStatus').textContent='Rascunho salvo automaticamente neste navegador.';
    }catch{$('draftStatus').textContent='Armazenamento indisponível: suas respostas podem se perder ao fechar a página.';}
  }
  function saveExerciseDraft(){
    if(!exercise||$('workView').classList.contains('hide')||!MODULES.some(m=>m.id===mode))return;
    try{
      const snapshot=JSON.parse(JSON.stringify({mode,level,serial,lastSignature,courseAttempt,exercise,undo:undoClearState,updatedAt:Date.now()}));
      savedDrafts[mode]=snapshot;
      const recent=Object.entries(savedDrafts).sort((a,b)=>b[1].updatedAt-a[1].updatedAt).slice(0,7);
      savedDrafts=Object.fromEntries(recent);
      persistDrafts();
    }catch{$('draftStatus').textContent='Falha ao salvar o exercício; verifique o armazenamento deste navegador.';}
  }
  function confirmDiscard(action){
    return !hasPendingWork(exercise)||confirm('Você já preencheu respostas. '+action+' descartará o exercício atual. Deseja continuar?');
  }
  const currentMode=()=>MODULES.find(m=>m.id===mode);
  function save(){try{localStorage.setItem(STORE_KEY,JSON.stringify(stats))}catch(e){}}
  function modeStats(id){return stats.byMode[id]||{tries:0,perfect:0,correct:0,total:0}}
  function pct(correct,total){return total?Math.round(100*correct/total)+'%':'—'}
  function toast(message){$('toast').textContent=message;$('toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('show'),3200)}
  const PRACTICE_SECTIONS_KEY='logiclab_practice_sections_v1';
  function loadPracticeSections(){
    try{
      const value=JSON.parse(localStorage.getItem(PRACTICE_SECTIONS_KEY));
      return new Set(Array.isArray(value)?value.map(String):['0']);
    }catch{return new Set(['0'])}
  }
  const expandedPracticeSections=loadPracticeSections();
  const practiceGroups=getPracticeGroups(COURSE_UNITS,MODULES);
  function nextLesson(){return getNextLearningStep(COURSE_UNITS,courseState.lessons)}
  function updateNextLearningCards(){
    const draft=mostRecentUnfinished(savedDrafts,savedExam());
    const overview=learningOverview(COURSE_UNITS,courseState.lessons);
    const next=nextCourseMessage(overview,nextLesson(),id=>MODULES.find(m=>m.id===id)?.name||'Tema');
    const draftModule=draft?.type==='exercise'?MODULES.find(m=>m.id===draft.mode):null;
    $('continueLabel').textContent=draft?'RETOMAR ATIVIDADE SALVA':next.kind==='due'?'REVISÃO DISPONÍVEL':next.kind==='scheduled'?'REVISÃO PROGRAMADA':'PRÓXIMO PASSO RECOMENDADO';
    $('nextLessonButton').hidden=!draft;
    $('nextLessonButton').textContent=next.button;
    $('continueTitle').textContent=draft?(draft.type==='exam'?'Avaliação final em andamento':draftModule?.name||'Atividade em andamento'):next.title;
    $('continueDescription').textContent=draft?(draft.type==='exam'?'Suas respostas da avaliação estão salvas neste navegador.':'Continue a questão que você estava resolvendo, com suas respostas preservadas.'):next.description;
    $('continueButton').textContent=draft?(draft.type==='exam'?'Continuar avaliação →':'Retomar exercício →'):next.button;
  }
  function resumeLearning(){
    const draft=mostRecentUnfinished(savedDrafts,savedExam());
    if(draft?.type==='exam'){openCourse(false);openFinalExam();return}
    if(draft?.type==='exercise'){openMode(draft.mode);return}
    openRecommendedLesson();
  }
  function openRecommendedLesson(){
    const urgent=reviewQueue(COURSE_UNITS,courseState.lessons);
    if(urgent.length){openCourse(true,urgent[0].id);return}
    const next=nextLesson();openCourse(true,next.id)
  }
  function renderHome(){updateCourseHome();updateNextLearningCards();const tried=Object.entries(stats.byMode).filter(([id,x])=>id!=='misto'&&x.tries>0).length;$('overview').innerHTML=`<div class="stat"><div class="stat-value">${stats.tries}</div><div class="stat-caption">Exercícios corrigidos</div></div><div class="stat"><div class="stat-value">${pct(stats.correct,stats.total)}</div><div class="stat-caption">Acertos na primeira tentativa</div></div><div class="stat"><div class="stat-value">${tried}<span style="font-size:15px;color:var(--faint)"> / ${MODULES.length-1}</span></div><div class="stat-caption">Módulos praticados</div></div>`;
    $('modeGrid').innerHTML=practiceGroups.map(group=>{
      const attempts=group.modules.filter(m=>modeStats(m.id).tries>0).length;
      const cards=group.modules.map(m=>{
        const stat=modeStats(m.id);
        const info=stat.tries?`${stat.tries} ${stat.tries===1?'rodada':'rodadas'} · ${pct(stat.correct,stat.total)} de acertos`:'Pronto para começar';
        return `<button type="button" class="mode-card ${m.id==='misto'?'mixed':''}" data-open="${m.id}"><div class="card-top"><span class="mode-icon">${escapeHTML(m.icon)}</span><span class="mode-num">${escapeHTML(m.no)}</span></div><strong class="mode-title">${escapeHTML(m.name)}</strong><p>${escapeHTML(m.desc)}</p><div class="card-foot"><span>${m.id==='misto'?'Revisão adaptativa':info}</span><span class="go" aria-hidden="true">↗</span></div></button>`;
      }).join('');
      const expanded=expandedPracticeSections.has(group.id)?' open':'';
      return `<details class="practice-group" data-practice-section="${group.id}"${expanded}><summary><span class="practice-group-heading"><strong>${escapeHTML(group.title)}</strong><small>${escapeHTML(group.note)}</small></span><span class="practice-group-count">${attempts}/${group.modules.length} praticados</span></summary><div class="mode-grid">${cards}</div></details>`;
    }).join('')}
  function selectMixed(){
    const due=new Set(reviewQueue(COURSE_UNITS,courseState.lessons).map(item=>item.id));
    const choices=MODULES.filter(m=>m.id!=='misto');
    const weighted=choices.flatMap(m=>{
      const stat=modeStats(m.id),accuracy=stat.total?stat.correct/stat.total:0;
      const weight=(stat.tries===0?5:Math.max(1,Math.ceil(1+5*(1-accuracy))))+(due.has(m.id)?7:0);
      return Array.from({length:weight},()=>m.id)
    });
    return pick(weighted)
  }
  function renderLevelButtons(){const extended=mode==='deducao',items=extended?[['easy','1 · Básico'],['medium','2 · Falsidades'],['hard','3 · Conectivos'],['expert','4 · Concurso'],['exam','5 · Autônomo']]:[['easy','Fácil'],['medium','Médio'],['hard','Difícil']];$('levelSegments').classList.toggle('levels-five',extended);$('levelSegments').innerHTML=items.map(([id,label])=>`<button class="segment" data-level="${id}" type="button" aria-pressed="${level===id}">${label}</button>`).join('');}
  function nextExercise(force=false){
    if(!GENERATORS[mode]&&mode!=='misto')return;
    if(!force&&!confirmDiscard('Iniciar outro desafio'))return;
    undoClearState=null;
    if(courseAttempt&&serial>0){courseAttempt.recorded=false;courseAttempt.hintUsed=false;courseAttempt.passed=false;courseAttempt.decisionReason=''}
    let next,signature;
    for(let attempt=0;attempt<12;attempt++){
      const selectedMode=mode==='misto'?selectMixed():mode;
      const currentLevel=selectedMode==='deducao'&&mode==='misto'&&level==='hard'?pick(['hard','expert','exam']):level;
      next=GENERATORS[selectedMode](currentLevel,selectedMode);
      signature=next.metadata?.signature||selectedMode+'|'+next.roots.map(sig).join('|')+'|'+next.vars.join(',');
      if(signature!==lastSignature)break;
    }
    lastSignature=signature;exercise=next;serial++;renderExercise();
  }
  function openMode(id,updateHash=true,fresh=false){
    if(!MODULES.some(m=>m.id===id))return;
    const previous=!fresh?savedDrafts[id]:null;
    $('courseView').classList.add('hide');$('freeTableView').classList.add('hide');mode=id;
    if(previous&&previous.exercise&&(previous.exercise.mode===id||id==='misto')){
      level=previous.level||'easy';serial=previous.serial||1;lastSignature=previous.lastSignature||'';
      courseAttempt=previous.courseAttempt||null;undoClearState=previous.undo||null;
      exercise=previous.exercise;
    }else{
      if(!courseAttempt||courseAttempt.id!==id)courseAttempt=null;
      if(id!=='deducao'&&!['easy','medium','hard'].includes(level))level='easy';
      serial=0;lastSignature='';exercise=null;undoClearState=null;
    }
    renderLevelButtons();
    $('homeView').classList.add('hide');$('workView').classList.remove('hide');
    $('workTitle').textContent=currentMode().name;
    $('workDescription').textContent=currentMode().desc;
    $('backButton').textContent=courseAttempt?'← Voltar à aula':'← Voltar aos módulos';
    if(updateHash)setRouteHash(id);
    if(exercise)renderExercise();else nextExercise(true);
    scrollTo({top:0,behavior:'instant'});
  }
  function openFreeTable(updateHash=true){
    courseAttempt=null;
    $('homeView').classList.add('hide');
    $('workView').classList.add('hide');
    $('courseView').classList.add('hide');
    $('freeTableView').classList.remove('hide');
    if(updateHash)setRouteHash('tabela-livre');
    loadFreeTable().then(instance=>{
      if(!$('freeTableView').classList.contains('hide'))instance.open();
    }).catch(error=>{
      const feedback=$('freeFeedback');
      feedback.textContent='Não foi possível abrir a Tabela Livre. Os outros módulos continuam disponíveis. Atualize a página e tente novamente.';
      feedback.dataset.result='error';
      console.error('Falha ao carregar Tabela Livre:',error);
    });
    scrollTo({top:0,behavior:'instant'});
  }
  function goHome(updateHash=true){courseAttempt=null;$('freeTableView').classList.add('hide');$('courseView').classList.add('hide');$('workView').classList.add('hide');$('homeView').classList.remove('hide');if(updateHash)setRouteHash('inicio');renderHome();scrollTo({top:0,behavior:'instant'})}
  function currentExerciseMode(){return MODULES.find(m=>m.id===exercise.mode)}
  /* PASSO 4 do módulo 11: a mesma geometria do Venn é reutilizada para mostrar
     a posição de cada pessoa de um modelo concreto. Cada cenário é independente. */
  function categoricalModelSvg(mask){
    const req=vennRequirements(exercise),people=modelProfiles(mask);
    const base=vennSvg(req.shade,req.witnesses.map(w=>({index:w.index,profiles:w.profiles})));
    // IDs locais evitam colisões com o SVG da etapa anterior.
    const separate=base.replaceAll('venn-in-','cat-model-in-').replaceAll('venn-out-','cat-model-out-').replaceAll('venn-stripes','cat-model-stripes');
    const dots=people.map((p,i)=>{const [x,y]=VENN_POINTS[p],bad=req.shade.includes(p);return `<g class="cat-person-marker" pointer-events="none" transform="translate(${x+21},${y-22})"><circle r="13" fill="${bad?'#bf5365':'#318a70'}" stroke="var(--panel)" stroke-width="2.5"/><text y="4.5" text-anchor="middle" font-size="13" font-weight="850" fill="#fff">${'abcdefgh'[i]}</text></g>`}).join('');
    return separate.replace('</svg>',`${dots}</svg>`).replace('aria-label="Três conjuntos S, M e P, com regiões numeradas; áreas hachuradas são vazias e X indica existência."','aria-label="Modelo atual no Diagrama de Venn: bolinhas com letras são pessoas; listras indicam regiões proibidas pelas premissas."');
  }
  function catPlainModelPerson(profile,i,terms){
    const inGroups=['S','M','P'].filter(g=>catMembership(profile,g)).map(g=>terms[g]);
    return `Pessoa ${'abcdefgh'[i]}: ${inGroups.length?'pertence a '+inGroups.join(', '):'fica fora dos três grupos'}`;
  }
  function catReason(form,mask,terms){
    const people=modelProfiles(mask),a=terms[form.a],b=terms[form.b],aPeople=people.filter(p=>catMembership(p,form.a));
    const both=people.filter(p=>catMembership(p,form.a)&&catMembership(p,form.b));
    const only=people.filter(p=>catMembership(p,form.a)&&!catMembership(p,form.b));
    const who=p=>{const i=people.indexOf(p);return 'pessoa '+ 'abcdefgh'[i]};
    if(form.kind==='all')return only.length?`F. ${who(only[0])} pertence a ${a} e está fora de ${b}. Isso contradiz “Todos”.`:`V. ${aPeople.length?'Cada pessoa de '+a+' também pertence a '+b:'O modelo tem o grupo '+a+' vazio; afirmações universais sobre grupos vazios são verdadeiras.'}`;
    if(form.kind==='none')return both.length?`F. ${who(both[0])} pertence simultaneamente a ${a} e ${b}. Isso contradiz “Nenhum”.`:`V. ${a} e ${b} estão separados neste modelo.`;
    if(form.kind==='some')return both.length?`V. ${who(both[0])} pertence aos dois grupos (${a} e ${b}).`:`F. Falta uma pessoa que pertença simultaneamente a ${a} e ${b}.`;
    return only.length?`V. ${who(only[0])} pertence a ${a} e está fora de ${b}.`:`F. Falta uma pessoa que esteja em ${a} e fora de ${b}.`;
  }
  function catStrategy(form,terms){
    const a=terms[form.a],b=terms[form.b];
    if(form.kind==='all')return `Procure alguém de ${a} fora de ${b}. Uma pessoa assim tornaria a frase F.`;
    if(form.kind==='none')return `Procure alguém que pertença aos dois grupos (${a} e ${b}). Se encontrar, marque F.`;
    if(form.kind==='some')return `Procure pelo menos uma pessoa em ${a} e ${b} ao mesmo tempo. Se encontrar, marque V.`;
    return `Procure pelo menos uma pessoa em ${a} e fora de ${b}. Se encontrar, marque V.`;
  }
  function renderCategoricalModelWorkbench(){
    const area=$('categoricalModelWorkbench'),ex=exercise,active=ex?.mode==='categoricos';
    const tableBar=$('tableHeaderBar'),tableWrap=$('tableScrollWrap'),legend=$('tableLegendBar');
    if(!active){area.classList.add('hide');tableBar.classList.remove('hide');tableWrap.classList.remove('hide');legend.classList.remove('hide');return}
    const cat=ex.cat,unlocked=cat.venn.verdictVerified||ex.revealed;
    area.classList.toggle('hide',!unlocked);
    tableBar.classList.toggle('hide',!cat.showFullTable);
    tableWrap.classList.toggle('hide',!cat.showFullTable);
    legend.classList.toggle('hide',!cat.showFullTable);
    if(!unlocked)return;
    const r=Math.max(0,Math.min(ex.envs.length-1,cat.modelRow||0));cat.modelRow=r;
    const mask=ex.envs[r].__model,profiles=modelProfiles(mask),req=vennRequirements(ex),shadedPeople=profiles.filter(p=>req.shade.includes(p));
    const completedAt=row=>ex.cols.filter(c=>c.editable).every((c,i)=>!!ex.answers[fieldKey(row,i+1)]);
    const done=ex.envs.filter((_,row)=>completedAt(row)).length;
    let html='<div class="cat-work-heading">PASSO 4 · TESTE UM MODELO DE CADA VEZ</div>';
    html+='<p class="cat-work-lead">O Venn mostra as regras das premissas. Agora vamos colocar <strong>pessoas imaginárias</strong> dentro dos mesmos círculos e descobrir quais frases são V ou F.</p>';
    html+='<div class="cat-bridge"><strong>Como o desenho ajuda a preencher V e F?</strong><div><b>Região listrada:</b> uma pessoa colocada ali faz pelo menos uma premissa universal ficar falsa.</div><div><b>X no Venn:</b> o modelo precisa apresentar uma pessoa adequada para satisfazer aquela premissa com “Alguns”.</div><div><b>Importante:</b> as linhas são hipóteses independentes. Algumas desrespeitam as premissas de propósito; elas ensinam a reconhecer respostas F. Procure um contraexemplo apenas entre as hipóteses com as duas premissas V.</div></div>';
    html+=`<nav class="cat-model-nav" aria-label="Navegar entre modelos"><div><strong>Modelo ${r+1} de ${ex.envs.length}</strong><small>${done} de ${ex.envs.length} modelos preenchidos · cada linha é uma situação imaginária</small></div><div class="cat-model-nav-buttons"><button type="button" class="button small" data-cat-model-go="-1" ${r===0?'disabled':''}>← Anterior</button><button type="button" class="button small primary" data-cat-model-go="1" ${r===ex.envs.length-1?'disabled':''}>Próximo →</button></div></nav>`;
    html+=`<div class="cat-model-overview" aria-label="Selecionar modelo">${ex.envs.map((_,i)=>`<button type="button" data-cat-model-index="${i}" class="${i===r?'active':''} ${completedAt(i)?'completed':''}" aria-label="Modelo ${i+1}${completedAt(i)?', preenchido':''}" aria-current="${i===r?'step':'false'}">${i+1}${completedAt(i)?' ✓':''}</button>`).join('')}</div>`;
    html+='<section class="cat-model-card"><h4>Quem existe neste modelo?</h4><p>Cada bolinha com letra representa uma pessoa hipotética. Os círculos usam os mesmos grupos do Venn que você completou.</p>';
    html+='<div class="cat-model-content"><div class="cat-model-viz"><div class="venn-diagram">'+categoricalModelSvg(mask)+vennTermsLegend(cat.terms)+'</div><div class="cat-mini-legend"><b>Bolinhas verdes:</b> pessoas em regiões permitidas. <b>Bolinhas vermelhas:</b> pessoas em regiões listradas. <b>X:</b> presença exigida pela premissa, ainda que o modelo analisado possa descumpri-la.</div></div>';
    html+='<div class="cat-people">'+profiles.map((p,i)=>`<div class="cat-person"><strong>${escapeHTML(catPlainModelPerson(p,i,cat.terms))} · região ${p+1}</strong><div class="cat-person-values">${['S','M','P'].map(g=>`<span class="${catMembership(p,g)?'inside':'outside'}">${catMembership(p,g)?'✓ Dentro':'— Fora'}: ${escapeHTML(cat.terms[g])}</span>`).join('')}</div></div>`).join('')+'</div></div></section>';
    html+='<div class="cat-compare"><h4>Comparação com o Venn das premissas</h4>';
    html+=`<p>${shadedPeople.length?`Neste modelo, ${shadedPeople.map(p=>'a pessoa '+ 'abcdefgh'[profiles.indexOf(p)]+' está na região '+(p+1)).join('; ')}. Essa é uma região listrada. Portanto, pelo menos uma premissa universal é falsa.`:'Todas as pessoas deste cenário estão fora das áreas listradas. Isso respeita as restrições das premissas com “Todos” ou “Nenhum”.'}</p>`;
    html+='<p>Para as premissas com “Alguns”, procure uma pessoa que ocupe uma região permitida pelo X.</p>';
    if(cat.showComparison){
      html+='<ul>'+cat.forms.slice(0,2).map((f,i)=>{const yes=catValue(f,mask);return `<li><strong>Premissa ${i+1}:</strong> ${escapeHTML(catStrategy(f,cat.terms))} <span style="color:var(--muted)">Use as bolinhas e as regiões para decidir V ou F.</span></li>`}).join('')+'</ul>';
    }
    html+=`<button type="button" class="cat-detail-toggle" data-cat-comparison>${cat.showComparison?'Ocultar orientação detalhada':'Mostrar orientação por premissa'}</button></div>`;
    html+='<h4 class="cat-questions-title">Agora preencha a linha deste modelo</h4><p class="cat-questions-sub">Leia cada frase e toque em <strong>V (verdadeira)</strong> ou <strong>F (falsa)</strong>. A próxima hipótese será avaliada separadamente.</p>';
    ex.cols.forEach((col,c)=>{if(!col.editable)return;
      const key=fieldKey(r,c),answer=ex.answers[key]||'',value=expected(ex,r,c),isCounter=col.key==='counter';
      const head=isCounter?'4 · TESTE DE CONTRAEXEMPLO':`${c} · ${c===3?'CONCLUSÃO':'PREMISSA '+c}`;
      const text=isCounter?'As premissas são V e a conclusão é F neste mesmo modelo?':cat.texts[col.catIndex];
      const formula=isCounter?'(Premissa 1 ∧ Premissa 2) ∧ ¬Conclusão':(cat.unlocked?cat.values[col.catIndex]:catFormula(cat.forms[col.catIndex]));
      const help=isCounter?'Marque V somente quando as duas premissas forem verdadeiras e a conclusão falsa. Em qualquer outra combinação, marque F.':catStrategy(cat.forms[col.catIndex],cat.terms);
      html+=`<div class="cat-question"><div class="cat-question-head">${head}</div><div class="cat-question-statement">${escapeHTML(text)}</div><div class="cat-question-formula">${escapeHTML(formula)}</div><p class="cat-question-help">${escapeHTML(help)}</p><div class="cat-question-bottom">${['V','F'].map(v=>`<button type="button" class="cat-answer ${answer===v?'active':''}" data-cat-pick="${r}:${c}:${v}" aria-pressed="${answer===v}" ${ex.revealed?'disabled':''}>${v==='V'?'V · Sim':'F · Não'}</button>`).join('')}</div>`;
      if(ex.grade||ex.revealed){html+=`<p class="cat-feedback ${answer===value?'ok':'bad'}">${ex.revealed?`Resposta: ${value}`:answer===value?'✓ Correto':`Revise: resposta esperada ${value}`}</p>`}
      const hintkey=`${r}:${c}`;
      html+=`<button type="button" class="cat-detail-toggle" data-cat-hint="${hintkey}">${cat.modelHelpKey===hintkey?'Ocultar explicação':'Como descobrir esta resposta?'}</button>`;
      if(cat.modelHelpKey===hintkey){const explanation=isCounter?(value==='V'?'As duas premissas são verdadeiras e a conclusão é falsa. Esta linha é um contraexemplo.':'Esta hipótese tem premissa falsa ou conclusão verdadeira; por isso ela é F na coluna Contraexemplo.') :catReason(cat.forms[col.catIndex],mask,cat.terms);html+=`<div class="cat-reason">${escapeHTML(explanation)}</div>`}
      html+='</div>';
    });
    html+=`<div class="cat-model-nav"><small>Depois de marcar as quatro respostas, avance para o modelo seguinte.</small><div class="cat-model-nav-buttons"><button type="button" class="button small" data-cat-model-go="-1" ${r===0?'disabled':''}>← Anterior</button><button type="button" class="button small primary" data-cat-model-go="1" ${r===ex.envs.length-1?'disabled':''}>Próximo modelo →</button></div></div>`;
    html+=`<div class="cat-full-table-toggle"><button type="button" class="button small" data-cat-full-table>${cat.showFullTable?'Ocultar tabela grande':'Ver todas as linhas em uma tabela (opcional)'}</button><p>A tabela grande reúne as mesmas respostas que você marca aqui.</p></div>`;
    area.innerHTML=html;
  }

  function renderExerciseHelp(){
    const ex=exercise,m=currentExerciseMode();
    const steps=(m.steps||[]).map(step=>'<li>'+escapeHTML(step)+'</li>').join('');
    const rules=ex.mode==='categoricos'||ex.mode==='predicados2'
      ?'∀ exige que a regra valha para todos; ∃ exige pelo menos um exemplo. No Venn, hachuras indicam regiões vazias e X indica existência.'
      :ex.mode==='provas'||ex.mode==='arvores'
        ?'Uma demonstração aplica regras de inferência a premissas anteriores; um ramo aberto pode indicar um contraexemplo.'
        :'¬ inverte V/F; ∧ exige ambos V; ∨ exige pelo menos um V; → é F somente em V→F; ↔ é V quando os valores coincidem.';
    const reference='<div class="exercise-help-operators"><strong>Regras essenciais:</strong> '+rules+'</div>';
    $('exerciseHelpContent').innerHTML='<p><strong>Como resolver '+escapeHTML(m.name)+':</strong></p><ol>'+steps+'</ol>'+reference;
  }
  function renderFeedbackActions(){
    const area=$('feedbackNextActions'),ex=exercise;
    if(!ex||(!ex.grade&&!ex.revealed)){area.innerHTML='';return}
    if(courseAttempt){
      const progress=courseProgress(courseAttempt.id);
      const passed=courseAttempt.recorded?courseAttempt.passed===true:courseAttempt.stage==='review'?courseAttempt.reviewPassed:courseAttempt.stage==='guided'?progress.guided:progress.independent;
      area.innerHTML=passed
        ?'<button type="button" class="button primary" data-feedback-action="course">Continuar minha aula →</button>'
        :'<button type="button" class="button primary" data-feedback-action="next">Tentar outro exercício →</button><button type="button" class="button" data-feedback-action="course">Voltar à aula</button>';
      return;
    }
    area.innerHTML='<button type="button" class="button primary" data-feedback-action="next">Próximo desafio →</button>';
  }
  function updateExerciseLessonLink(ex){
    const target=$('exerciseLessonLink');
    // Treinos mistos utilizam o tema real da questão; uma tentativa do curso
    // mantém o vínculo da aula mesmo depois de uma restauração do rascunho.
    const id=LESSONS[ex.mode]?ex.mode:courseAttempt?.id;
    const lesson=id&&LESSONS[id]?MODULES.find(item=>item.id===id):null;
    target.hidden=!lesson;
    if(!lesson){target.removeAttribute('href');return}
    target.href='#aula-'+encodeURIComponent(id);
    target.textContent='← Voltar à aula: '+lesson.name;
  }
  function renderExercise(){if(!exercise)return;const ex=exercise;
    updateExerciseLessonLink(ex);
    const orientation=exerciseScreenContext({moduleName:currentMode().name,stage:courseAttempt?.stage,graded:!!ex.grade,revealed:!!ex.revealed});
    $('workLocation').textContent=orientation.location;
    $('workDescription').textContent=orientation.description;
    $('taskKicker').textContent=mode==='misto'?'TREINO MISTO · '+currentExerciseMode().name.toUpperCase():currentExerciseMode().name.toUpperCase();$('taskTitle').textContent=ex.title;$('taskInstruction').textContent=ex.instruction;$('lineCount').textContent=`· ${ex.envs.length} linhas`;$('exerciseIndex').textContent=`Rodada ${serial} · ${ex.vars.length} ${ex.vars.length===1?'variável':'variáveis'}`;
    $('tableHeaderTitle').firstChild.textContent='Tabela-verdade ';$('lineCount').textContent=`· ${ex.envs.length} linhas`;renderTranslation();renderDeduction();document.querySelectorAll('.segment').forEach(b=>{const active=b.dataset.level===level;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});renderTable();renderChoice();renderFeedback();renderFeedbackActions();renderExerciseHelp();renderSidebar();renderInlineHint();renderCategorical();$('checkButton').disabled=ex.revealed||!!(ex.translation&&!ex.translation.unlocked)||!!(ex.cat&&!ex.cat.venn.verdictVerified);$('clearButton').disabled=ex.revealed;$('revealButton').disabled=ex.revealed;$('hintButton').disabled=false;renderSpecial();renderCourseExerciseBanner();syncExplanationLinks();$('undoClearButton').hidden=!undoClearState;saveExerciseDraft();}
  function fieldKey(row,col){return row+'-'+col}
  function expected(ex,row,col){const cell=ex.cols[col];if(ex.mode==='categoricos'){const mask=ex.envs[row].__model;if(cell.key==='model')return modelLabel(mask);if(cell.key==='counter')return t(ex.cat.forms.slice(0,2).every(x=>catValue(x,mask))&&!catValue(ex.cat.forms[2],mask));return t(catValue(ex.cat.forms[cell.catIndex],mask))}return cell.assignmentIndex!==undefined?ex.metadata.items[ex.envs[row].__assignment[cell.assignmentIndex]]:t(evalAst(cell.node,ex.envs[row]))}
  // A ocultação é apenas visual: índices e respostas permanecem no exercício original.
  function hiddenTableColumns(ex){
    return new Set(Array.isArray(ex.hiddenColumns)
      ?ex.hiddenColumns.filter(i=>Number.isInteger(i)&&i>=0&&i<ex.cols.length):[]);
  }
  // Cada cabeçalho permanece acessível mesmo com as células da coluna recolhidas.
  function columnCollapsedLabel(label){
    return `<span class="truth-col-short" title="${escapeHTML(label)}">${escapeHTML(label)}</span>`;
  }
  function columnToggleButton(index,label,hidden){
    const eye=hidden
      ?'<path d="M3 3l18 18"></path><path d="M10.5 5.1A11 11 0 0 1 12 5c6.6 0 10 7 10 7a14 14 0 0 1-3.3 4.1"></path><path d="M6.6 6.6C3.6 8.6 2 12 2 12s3.4 7 10 7c1.3 0 2.5-.3 3.6-.7"></path>'
      :'<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"></path><circle cx="12" cy="12" r="3"></circle>';
    const action=hidden?'Mostrar':'Ocultar';
    return `<button type="button" class="truth-col-toggle" data-toggle-col="${index}" aria-label="${action} coluna ${escapeHTML(label)}" title="${action} coluna ${escapeHTML(label)}" aria-pressed="${hidden?'false':'true'}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${eye}</svg></button>`;
  }
  function changeColumnVisibility(index,hide){
    if(!exercise||!Number.isInteger(index)||index<0||index>=exercise.cols.length)return;
    const hidden=hiddenTableColumns(exercise);
    if(hide)hidden.add(index);else hidden.delete(index);
    exercise.hiddenColumns=[...hidden].sort((a,b)=>a-b);
    renderTable();
    saveExerciseDraft();
  }
  let truthHighlights=null;
  function exerciseColumnRelations(ex){
    const columns=ex.cols;
    const correct=index=>{
      const col=columns[index];
      if(!col||ex.revealed)return false;
      // Valor conhecido é uma coluna correta por definição; respostas manuais
      // só participam quando todas as linhas já foram preenchidas corretamente.
      if(!col.editable)return true;
      return ex.envs.every((_,r)=>ex.answers[fieldKey(r,index)]===expected(ex,r,index));
    };
    const result=[];
    if(ex.mode==='categoricos'&&ex.cat){
      for(let i=0;i<columns.length;i++)for(let j=i+1;j<columns.length;j++){
        if(!correct(i)||!correct(j)||columns[i].catIndex===undefined||columns[j].catIndex===undefined)continue;
        const a=ex.cat.forms[columns[i].catIndex],b=ex.cat.forms[columns[j].catIndex];
        // A existência do sujeito nunca deve ser inferida das linhas ilustrativas.
        const subjectNonempty=Boolean(ex.cat.assumeNonempty===true);
        const relation=categoricalRelation(a,b,{subjectNonempty});
        if(relation)result.push({a:i,b:j,...relation});
      }
      return result;
    }
    const known=new Set(ex.vars||[]);
    const supported=node=>!node?false:node.type==='var'?known.has(node.name):
      (node.type==='not'||['and','or','xor','implies','iff'].includes(node.type))&&
        Boolean(node.a&&supported(node.a)&&(!node.b||supported(node.b)));
    const safe=columns.map(col=>({...col,node:supported(col.node)?col.node:null}));
    return propositionalRelations(safe,ex.vars||[],correct).filter(rel=>
      columns[rel.a].editable||columns[rel.b].editable);
  }
  function renderExerciseVenn(){
    const panel=$('truthVennPanel'),ex=exercise;
    if(!panel||!ex||ex.mode==='categoricos'||!ex.vars?.length||
       !Array.isArray(ex.envs)||!ex.envs.length||
       !ex.envs.every(env=>ex.vars.every(name=>typeof env[name]==='boolean'))){
      if(panel)panel.innerHTML='';
      return;
    }
    const columns=ex.cols.map((col,index)=>({...col,index}))
      .filter(col=>col.node&&col.assignmentIndex===undefined);
    panel.innerHTML=renderTruthVenn({
      id:'exercise',variables:ex.vars,rows:ex.envs,
      variableMeanings:{...(ex.translation?.claimMap||{}),...(ex.metadata?.variableMeanings||{})},
      columns:columns.map(col=>({key:col.key,label:col.label,index:col.index,
        derived:col.editable})),
      selectedKey:ex.vennColumnKey||'',filters:ex.vennFilters||{},
      getAnswer:(row,col)=>ex.cols[col.index].editable?
        (ex.answers[fieldKey(row,col.index)]||''):expected(ex,row,col.index),
      getExpected:(row,col)=>expected(ex,row,col.index),
      checked:ex.grade!==null
    });
  }
  function renderTable(){const ex=exercise,hidden=hiddenTableColumns(ex);
    let str='<thead><tr>'+ex.cols.map((c,index)=>{
      if(ex.mode==='deducao'&&c.key.startsWith('clue')){
        const i=Number(c.key.slice(4)),tr=ex.translation;
        // A fórmula escrita pelo aluno tem prioridade: o corretor já validou equivalência semântica.
        // Ao pedir a resolução antes de concluir a tradução, mostramos a fórmula-modelo.
        const formula=tr?.unlocked?tr.values[i]:ex.revealed?pretty(tr.correctNodes[i]):'';
        const phrase=ex.metadata.clueTexts[i];
        return `<th scope="col" class="derived deduction-clue-header${hidden.has(index)?' truth-col-collapsed':''}"><span class="deduction-header-id">${escapeHTML(c.label)}</span><span class="deduction-header-text">${escapeHTML(phrase)}</span><code class="deduction-header-formula">${escapeHTML(formula)}</code>${columnCollapsedLabel(c.label)}${columnToggleButton(index,c.label,hidden.has(index))}</th>`;
      }
      if(ex.mode==='categoricos'&&c.catIndex!==undefined){return `<th scope="col" class="derived categorical-clue-header${hidden.has(index)?' truth-col-collapsed':''}"><b>${escapeHTML(c.label)}</b><div class="deduction-header-text">${escapeHTML(ex.cat.texts[c.catIndex])}</div><code>${escapeHTML(ex.cat.unlocked?ex.cat.values[c.catIndex]:catFormula(ex.cat.forms[c.catIndex]))}</code>${columnCollapsedLabel(c.label)}${columnToggleButton(index,c.label,hidden.has(index))}</th>`;}
      if(ex.mode==='silogismos'&&c.key.startsWith('out')){const i=Number(c.key.slice(3));const formula=ex.translation?.unlocked?ex.translation.values[i]:ex.revealed?pretty(ex.roots[i]):'';return `<th scope="col" class="derived deduction-clue-header${hidden.has(index)?' truth-col-collapsed':''}"><span class="deduction-header-id">${escapeHTML(ex.translation.labels[i])}</span><span class="deduction-header-text">${escapeHTML(ex.translation.statements[i])}</span><code class="deduction-header-formula" aria-label="Fórmula validada: ${escapeHTML(formula)}">${escapeHTML(formula)}</code>${columnCollapsedLabel(c.label)}${columnToggleButton(index,c.label,hidden.has(index))}</th>`;}
      if(ex.mode==='deducao'&&c.key==='condition'){
        const k=ex.metadata.falseCount;
        const ruleText=k===0?'Todas as afirmações verdadeiras':`Exatamente ${k} afirmação${k===1?'':'ões'} falsa${k===1?'':'s'}`;
        return `<th scope="col" class="derived deduction-condition-header${hidden.has(index)?' truth-col-collapsed':''}"><span class="deduction-condition-label">Condição geral</span><span class="deduction-condition-rule">${escapeHTML(ruleText)}</span><span class="deduction-condition-question">Esta distribuição cumpre a condição?</span><span class="deduction-condition-legend"><span class="deduction-legend-yes">V = Sim</span><span class="deduction-legend-no">F = Não</span></span>${columnCollapsedLabel(c.label)}${columnToggleButton(index,c.label,hidden.has(index))}</th>`;
      }
      return `<th scope="col" class="${c.editable?'derived':''}${hidden.has(index)?' truth-col-collapsed':''}"><div class="truth-col-full-label">${escapeHTML(c.label)}<div class="col-sub">${escapeHTML(c.sub)}</div></div>${columnCollapsedLabel(c.label)}${columnToggleButton(index,c.label,hidden.has(index))}</th>`;
    }).join('')+'</tr></thead><tbody>';
    ex.envs.forEach((env,r)=>{str+='<tr>';ex.cols.forEach((col,c)=>{if(hidden.has(c)){str+='<td class="truth-cell-collapsed" aria-hidden="true"></td>';return}const exp=expected(ex,r,c);if(!col.editable){str+=`<td class="given ${ex.mode==='deducao'?'assignment':ex.mode==='categoricos'?'model-cell':''}" title="Valor conhecido">${escapeHTML(exp)}</td>`;return}const key=fieldKey(r,c),answer=ex.answers[key]||'',grade=ex.grade,checked=grade!==null&&!(ex.mode==='deducao'&&ex.metadata.contest),isCorrect=answer===exp;let cls='cell'+(answer?' filled':'');if(ex.revealed)cls+=' revealed';else if(checked)cls+=!answer?' empty-grade':isCorrect?' correct':' incorrect';const visible=ex.revealed?exp:answer||'<span class="cell-placeholder">·</span>';const expectedBadge=(checked&&(!isCorrect))?`<span class="expected" title="Resposta correta">${exp}</span>`:'';str+=`<td><button type="button" class="${cls}" data-r="${r}" data-c="${c}" ${ex.revealed?'disabled':''} aria-label="Linha ${r+1}, ${col.label}: ${ex.revealed?exp:answer||'vazio'}" title="Clique para alternar V, F e vazio. Também aceita teclas V, F e Delete.">${visible}${expectedBadge}</button></td>`});str+='</tr>'});
    let colIndex=0;
    str=str.replace(/<th scope="col"/g,()=>'<th scope="col" tabindex="0" data-rel-col="'+(colIndex++)+'"');
    str+='</tbody>';
    const table=$('truthTable');table.innerHTML=str;
    const config={columns:ex.cols,operands:index=>immediateOperands(ex.cols,index),
      relations:exerciseColumnRelations(ex)};
    if(truthHighlights)truthHighlights.update(config);
    else truthHighlights=attachTruthHighlights(table,config);
    renderCategoricalModelWorkbench();renderExerciseVenn()}
  function renderChoice(){const ex=exercise;if(!ex.choice){$('decisionArea').innerHTML='';return}const c=ex.choice;let buttons=c.options.map(option=>{const selected=ex.picked===option,cls='choice'+(selected?' selected':'')+(ex.revealed&&option===c.correct?' right':'')+(ex.grade&&selected?(selected&&option===c.correct?' right':' wrong'):'');return `<button class="${cls}" type="button" data-choice="${option}" ${ex.revealed?'disabled':''} aria-pressed="${selected}">${option}</button>`}).join('');$('decisionArea').innerHTML=`<section class="decision"><h3>${c.question}</h3><p>${ex.mode==='deducao'&&ex.metadata.contest?'No modo concurso, escolha sua resposta após analisar as pistas.':'Escolha uma resposta após completar a tabela.'}</p>${ex.mode==='deducao'?`<div class="deduction-options"><h3>Alternativas</h3>${ex.metadata.options.map(o=>`<p><b>${o.letter})</b>${escapeHTML(o.text)}</p>`).join('')}</div>`:''}<div class="choices" role="group" aria-label="${c.question}">${buttons}</div>${(ex.revealed||ex.grade)?`<p class="explanation"><strong>Resposta: ${c.correct}.</strong> ${c.explanation}</p>`:''}</section>`}
  function renderFeedback(){
    const ex=exercise,place=$('feedbackArea');
    if(ex.revealed){
      const detail=counterexample(ex);
      place.innerHTML=`<div class="result-box success"><h3>Resolução apresentada</h3><p>${ex.resolution}</p>${detail?`<p>${detail}</p>`:''}<p>Selecione <strong>Próximo</strong> para gerar outro desafio.</p></div>`;
      return;
    }
    if(!ex.grade){place.innerHTML='';return}
    const grade=ex.grade,allCorrect=grade.correct===grade.total;
    const metrics=performanceSummary(grade,ex.firstGrade,modeStats(ex.mode));
    const cards=[metrics.current,metrics.first,metrics.historical].filter(Boolean);
    const report=`<div class="feedback-metrics" aria-label="Resultados da atividade e histórico">${cards.map(card=>`<div class="feedback-metric"><strong>${escapeHTML(card.label)}</strong><span>${escapeHTML(card.value)}</span><small>${escapeHTML(card.detail)}</small></div>`).join('')}</div>`;
    const missing=grade.missing?`<p><strong>Ainda faltam ${grade.missing} ${grade.missing===1?'resposta':'respostas'}.</strong> Revise os campos destacados antes de continuar.</p>`:'';
    const details=counterexample(ex);
    const outcome=courseAttempt?.recorded&&['guided','independent','review'].includes(courseAttempt.stage)
      ?`<div class="attempt-outcome ${courseAttempt.passed?'passed':'pending'}" role="status"><strong>${courseAttempt.passed?'✓ Etapa validada':'Etapa ainda pendente'}</strong><p>${escapeHTML(courseAttempt.decisionReason||'A validação considera apenas a primeira correção, não as alterações posteriores.')}</p>${!courseAttempt.passed?'<p>Você pode revisar esta questão; para validar a etapa, comece uma nova tentativa.</p>':''}</div>`
      :'';
    const assisted=['independent','review'].includes(courseAttempt?.stage)&&courseAttempt.hintUsed
      ?'<p class="feedback-assisted"><strong>Prática com ajuda:</strong> você consultou uma dica. Este resultado serve para estudar; para validar autonomia, inicie outro exercício sem consultar dicas.</p>':'';
    place.innerHTML=`<div class="result-box ${allCorrect?'success':'warn'}"><h3>${allCorrect?'Correção concluída: respostas corretas':'Correção concluída: revise as marcações'}</h3>${outcome}${report}${missing}${assisted}<p>${ex.resolution}</p>${details?`<p>${details}</p>`:''}<p>${ex.mode==='deducao'&&ex.metadata.contest?'No modo concurso, a correção avalia a alternativa. Consulte a justificativa e a tabela opcional.':'Verde indica acerto; vermelho indica divergência. Os valores esperados aparecem nas células a revisar. Você pode ajustar as respostas e corrigir novamente; o histórico continua registrando a primeira correção.'}</p></div>`;
  }
  function counterexample(ex){if(ex.mode==='categoricos'&&ex.metadata.counterModel)return 'Contraexemplo: '+catCounter(ex.metadata.counterModel,ex.cat.terms)+'. Ambas as premissas são V e a conclusão F.';if((ex.mode==='argumentos'||ex.mode==='silogismos'||ex.mode==='traducao'&&ex.translation?.kind==='argument')&&ex.choice){const p=ex.metadata.premises,con=ex.metadata.conclusion,env=ex.envs.find(e=>p.every(n=>evalAst(n,e))&&!evalAst(con,e));if(env)return 'Contraexemplo: '+ex.vars.map(s=>s+'='+t(env[s])).join(', ')+'. As premissas são V e a conclusão é F.'}
    if(ex.mode==='equivalencias'&&ex.choice?.correct==='Diferentes'){const [a,b]=ex.roots,env=ex.envs.find(e=>evalAst(a,e)!==evalAst(b,e));if(env)return 'Linha decisiva: '+ex.vars.map(s=>s+'='+t(env[s])).join(', ')+'. A='+t(evalAst(a,env))+' e B='+t(evalAst(b,env))+'.'}return ''}
  function renderSidebar(){
    const ex=exercise,m=currentExerciseMode();
    $('stepsPanel').innerHTML=m.steps.map((step,i)=>`<div><span class="side-num">${i+1}</span><span>${escapeHTML(step)}</span></div>`).join('');
    $('hintArea').innerHTML='<p class="hint-location">As dicas aparecem junto ao enunciado, antes das respostas.</p>';
    const stat=modeStats(ex.mode);
    $('modeProgress').innerHTML=`<div class="stat-value">${stat.tries}</div><p>Exercícios corrigidos neste módulo (primeira tentativa)</p><div class="stat-value" style="font-size:24px">${pct(stat.correct,stat.total)}</div><p>Taxa de acerto na primeira correção</p>`;
  }
  function renderInlineHint(){
    const area=$('inlineHint'),decision=$('independentHintDecision');
    decision.hidden=true;
    const visible=!!exercise?.hintVisible;
    area.hidden=!visible;
    area.innerHTML=visible?`<strong>Dica para este exercício</strong><p>${escapeHTML(exercise.hint)}</p>`:'';
    $('hintButton').setAttribute('aria-expanded',String(visible));
    $('hintButton').textContent=visible?'Ocultar dica':'✧ Dica';
  }
  function focusInlineHint(){
    const panel=$('inlineHint');
    panel.scrollIntoView({behavior:'smooth',block:'center'});
    panel.focus({preventScroll:true});
  }
  function requestHint(){
    if(!exercise)return;
    // Depois da correção, o acesso à dica é somente revisão.
    if(exercise.grade||exercise.revealed){
      exercise.hintVisible=!exercise.hintVisible;
      renderInlineHint();saveExerciseDraft();
      if(exercise.hintVisible)focusInlineHint();
      return;
    }
    if(['independent','review'].includes(courseAttempt?.stage)&&!courseAttempt.hintUsed&&!exercise.hintVisible){
      const decision=$('independentHintDecision');
      decision.hidden=false;
      $('hintButton').setAttribute('aria-expanded','true');
      decision.scrollIntoView({behavior:'smooth',block:'center'});
      $('hintDecisionTitle').focus({preventScroll:true});
      return;
    }
    exercise.hintVisible=!exercise.hintVisible;
    if(exercise.hintVisible&&courseAttempt)courseAttempt.hintUsed=true;
    renderInlineHint();renderCourseExerciseBanner();saveExerciseDraft();
    if(exercise.hintVisible)focusInlineHint();
  }
  function handleHintDecision(event){
    const action=event.target.closest('[data-hint-action]')?.dataset.hintAction;
    if(!action)return;
    $('independentHintDecision').hidden=true;
    if(action==='show'){
      courseAttempt.hintUsed=true;exercise.hintVisible=true;
      renderInlineHint();renderCourseExerciseBanner();saveExerciseDraft();
      focusInlineHint();return;
    }
    $('hintButton').setAttribute('aria-expanded','false');
    $('hintButton').focus({preventScroll:true});
  }
  function setAnswer(r,c,value){if(!exercise||exercise.revealed)return;const key=fieldKey(r,c),current=exercise.answers[key]||'';const next=value===undefined?(current===''?'V':current==='V'?'F':''):value;if(next)exercise.answers[key]=next;else delete exercise.answers[key];exercise.grade=null;renderTable();renderFeedback();renderFeedbackActions();renderChoice();saveExerciseDraft()}
  function setChoice(option){if(!exercise||exercise.revealed)return;exercise.picked=option;exercise.grade=null;renderChoice();renderTable();renderFeedback();renderFeedbackActions();[...$('decisionArea').querySelectorAll('[data-choice]')].find(el=>el.dataset.choice===option)?.focus({preventScroll:true});saveExerciseDraft()}
  function gradeExercise(){if(!exercise||exercise.revealed)return;if(exercise.special){gradeSpecial();return;}if(exercise.translation&&!exercise.translation.unlocked){toast('Conclua a tradução primeiro.');return}if(exercise.cat&&(!exercise.cat.unlocked||!exercise.cat.venn.verdictVerified)){toast('Conclua a tradução e o Diagrama de Venn primeiro.');return}const ex=exercise;let correct=0,total=0,missing=0;if(!(ex.mode==='deducao'&&ex.metadata.contest))ex.envs.forEach((env,r)=>ex.cols.forEach((col,c)=>{if(!col.editable)return;const a=ex.answers[fieldKey(r,c)],exp=expected(ex,r,c);total++;if(!a)missing++;if(a===exp)correct++}));if(ex.choice){total++;if(ex.picked===ex.choice.correct)correct++;if(!ex.picked)missing++}if(ex.cat){for(const first of ex.cat.first){total++;if(first===true)correct++;if(first===null)missing++}const venn=ex.cat.venn;for(const first of [venn.firstShade,...Object.values(venn.firstWitness),venn.firstVerdict]){total++;if(first===true)correct++;if(first===null)missing++}}if(ex.translation){for(const first of ex.translation.first){total++;if(first===true)correct++;if(first===null)missing++}if(ex.translation.rule){total++;if(ex.translation.rule.first===true)correct++;if(ex.translation.rule.first===null)missing++}}ex.grade={correct,total,missing};if(!ex.gradedEver){ex.firstGrade={...ex.grade};ex.gradedEver=true;const s=stats.byMode[ex.mode]||{tries:0,perfect:0,correct:0,total:0};s.tries++;s.correct+=correct;s.total+=total;if(correct===total)s.perfect++;if(ex.translation){stats.translationTypes=stats.translationTypes||{};const id=ex.translation.templateId,ts=stats.translationTypes[id]||{tries:0,wins:0};ts.tries++;if(ex.translation.first.every(Boolean)&&(!ex.translation.rule||ex.translation.rule.first===true))ts.wins++;stats.translationTypes[id]=ts}if(ex.mode==='deducao'){stats.deductionLevels=stats.deductionLevels||{};const lev=ex.metadata.levelCode,ds=stats.deductionLevels[lev]||{tries:0,correct:0};ds.tries++;if(correct===total)ds.correct++;stats.deductionLevels[lev]=ds}stats.byMode[ex.mode]=s;stats.tries++;stats.correct+=correct;stats.total+=total;if(correct===total)stats.perfect++;save()}recordGuidedAttempt();renderExercise();$('feedbackArea').scrollIntoView({behavior:'smooth',block:'nearest'})}
  function reveal(){if(!exercise||!confirmDiscard('Revelar a resolução'))return;if(courseAttempt)courseAttempt.hintUsed=true;exercise.revealed=true;exercise.grade=null;renderExercise();$('feedbackArea').scrollIntoView({behavior:'smooth',block:'nearest'})}
  function clear(){if(!exercise||exercise.revealed)return;
    undoClearState=JSON.parse(JSON.stringify(exercise));
    if(exercise.special){exercise.special.values={};exercise.grade=null;renderExercise();return;}exercise.answers={};exercise.picked='';exercise.grade=null;if(exercise.translation&&!exercise.translation.unlocked){exercise.translation.values=exercise.translation.values.map(()=>'');exercise.translation.flags=exercise.translation.flags.map(()=>false);if(exercise.translation.rule)exercise.translation.rule.selected='';exercise.translation.message='';}if(exercise.mode==='deducao')exercise.metadata.scratch='';if(exercise.cat&&!exercise.cat.unlocked){exercise.cat.values=['','',''];exercise.cat.flags=[false,false,false];exercise.cat.message='';}if(exercise.cat&&!exercise.cat.venn.verdictVerified){const v=exercise.cat.venn;v.shaded=[];v.workingShade=[];v.phase=0;v.lastRegion=null;v.witnessChoices={};v.verified=false;v.verdict='';v.feedback='';v.verdictFeedback='';v.firstShade=null;v.firstWitness={};v.firstVerdict=null;}renderExercise();toast('Respostas atuais limpas. Continue praticando!')}
  function undoClear(){
    if(!undoClearState)return;
    exercise=undoClearState;undoClearState=null;renderExercise();toast('Respostas restauradas.');
  }
  function exportProgress(){
    // Consolida a atividade aberta antes de criar a cópia, que permanece no dispositivo.
    saveExerciseDraft();saveCourseState();
    const payload=JSON.stringify(createBackup(localStorage),null,2);
    const blob=new Blob([payload],{type:'application/json'});
    const url=URL.createObjectURL(blob);
    const link=document.createElement('a');
    link.href=url;
    link.download='logiclab-progresso-'+new Date().toISOString().slice(0,10)+'.json';
    document.body.append(link);link.click();link.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1500);
    toast('Backup criado: guarde o arquivo em local seguro.');
  }
  async function importProgressFile(event){
    const file=event.target.files?.[0];event.target.value='';
    if(!file)return;
    if(file.size>2*1024*1024){alert('Arquivo maior que 2 MB. Verifique o backup.');return}
    try{
      const payload=JSON.parse(await file.text());
      // Validar antes de pedir autorização; importar substitui somente as chaves gerenciadas.
      const known=PORTABLE_KEYS;
      if(!payload?.data||!Object.keys(payload.data).every(key=>known.includes(key)))throw Error('Arquivo incompatível.');
      if(!confirm('Importar este backup substituirá o progresso e os rascunhos deste navegador. Deseja continuar?'))return;
      const count=importBackup(localStorage,payload);
      alert('Backup importado ('+count+' categorias). A página será recarregada para mostrar o progresso.');
      location.reload();
    }catch(error){
      alert('Não foi possível importar o backup: '+error.message);
    }
  }
  function resetProgress(){if(!confirm('Apagar todos os resultados e estatísticas deste navegador, incluindo rascunhos e avaliação em andamento?'))return;
    savedDrafts={};undoClearState=null;finalExamSession=null;
    try{localStorage.removeItem(EXERCISE_DRAFTS_KEY);localStorage.removeItem(EXAM_DRAFT_KEY)}catch{}
    exercise=null;stats=blankStats();translationHistory=[];storeTranslationHistory();deductionHistory=[];saveDeductionHistory();syllogismHistory=[];saveShortHistory(SYLLOGISM_HISTORY_KEY,syllogismHistory);categoricalHistory=[];saveShortHistory(CATEGORICAL_HISTORY_KEY,categoricalHistory);save();courseState={lessons:{},final:{}};saveCourseState();renderHome();goHome();toast('Progresso local reiniciado.');}
  function showGuide(){const ref=$('reference');ref.open=true;ref.scrollIntoView({behavior:'smooth',block:'start'})}
  function toggleTheme(){const light=document.documentElement.dataset.theme==='light';document.documentElement.dataset.theme=light?'dark':'light';$('themeButton').textContent=light?'☀  Tema':'☾  Tema';try{localStorage.setItem(THEME_KEY,light?'dark':'light')}catch(e){}}
  function initTheme(){let current='dark';try{current=localStorage.getItem(THEME_KEY)||'dark'}catch(e){}document.documentElement.dataset.theme=current;$('themeButton').textContent=current==='light'?'☾  Tema':'☀  Tema'}
  $('modeGrid').addEventListener('click',e=>{
    const btn=e.target.closest('[data-open]');if(!btn)return;
    const id=btn.dataset.open,prior=savedDrafts[id];
    if(prior?.courseAttempt){
      if(hasPendingWork(prior.exercise)&&!confirm('Há um exercício guiado salvo neste tema. Abrir a prática livre criará outro exercício. Deseja continuar?'))return;
      courseAttempt=null;openMode(id,true,true);return;
    }
    courseAttempt=null;openMode(id);
  });
  $('modeGrid').addEventListener('toggle',e=>{
    const section=e.target.closest('[data-practice-section]');if(!section)return;
    if(section.open)expandedPracticeSections.add(section.dataset.practiceSection);
    else expandedPracticeSections.delete(section.dataset.practiceSection);
    try{localStorage.setItem(PRACTICE_SECTIONS_KEY,JSON.stringify([...expandedPracticeSections]))}catch{}
  },true);
  $('levelSegments').addEventListener('click',e=>{const btn=e.target.closest('[data-level]');if(btn&&level!==btn.dataset.level){if(!confirmDiscard('Alterar a dificuldade'))return;level=btn.dataset.level;lastSignature='';nextExercise(true)}});
  $('categoricalModelWorkbench').addEventListener('click',e=>{
    const ex=exercise;if(ex?.mode!=='categoricos'||!(ex.cat.venn.verdictVerified||ex.revealed))return;
    const cat=ex.cat;
    const model=e.target.closest('[data-cat-model-index]');
    const move=e.target.closest('[data-cat-model-go]');
    if(model||move){cat.modelRow=model?Number(model.dataset.catModelIndex):Math.max(0,Math.min(ex.envs.length-1,(cat.modelRow||0)+Number(move.dataset.catModelGo)));cat.modelHelpKey='';renderCategoricalModelWorkbench();return}
    const pick=e.target.closest('[data-cat-pick]');
    if(pick&&!ex.revealed){const [r,c,value]=pick.dataset.catPick.split(':');setAnswer(+r,+c,value);$('categoricalModelWorkbench').querySelector(`[data-cat-pick="${r}:${c}:${value}"]`)?.focus({preventScroll:true});return}
    const hint=e.target.closest('[data-cat-hint]');if(hint){const key=hint.dataset.catHint;cat.modelHelpKey=cat.modelHelpKey===key?'':key;renderCategoricalModelWorkbench();return}
    if(e.target.closest('[data-cat-comparison]')){cat.showComparison=!cat.showComparison;renderCategoricalModelWorkbench();return}
    if(e.target.closest('[data-cat-full-table]')){cat.showFullTable=!cat.showFullTable;renderCategoricalModelWorkbench();return}
  });
  $('truthVennPanel').addEventListener('change',event=>{
    if(!exercise)return;
    const target=event.target;
    if(target.matches('[data-venn-column]'))exercise.vennColumnKey=target.value;
    else if(target.matches('[data-venn-filter]')){
      exercise.vennFilters={...(exercise.vennFilters||{}),[target.dataset.vennFilter]:target.value};
    }else return;
    renderExerciseVenn();
    saveExerciseDraft();
  });
  $('truthTable').addEventListener('click',e=>{
    const toggle=e.target.closest('[data-toggle-col]');
    if(toggle){
      const index=Number(toggle.dataset.toggleCol);
      changeColumnVisibility(index,!hiddenTableColumns(exercise).has(index));
      $('truthTable').querySelector(`[data-toggle-col="${index}"]`)?.focus({preventScroll:true});
      return;
    }
    const btn=e.target.closest('[data-r]');if(!btn)return;
    const r=+btn.dataset.r,c=+btn.dataset.c;setAnswer(r,c);
    $('truthTable').querySelector(`[data-r="${r}"][data-c="${c}"]`)?.focus({preventScroll:true});
  });
  $('truthTable').addEventListener('keydown',e=>{const btn=e.target.closest('[data-r]');if(!btn)return;const r=+btn.dataset.r,c=+btn.dataset.c;const key=e.key.toLowerCase();if(key==='v'||key==='f'||key==='backspace'||key==='delete'||key===' '){e.preventDefault();setAnswer(r,c,key==='v'?'V':key==='f'?'F':'');$('truthTable').querySelector(`[data-r="${r}"][data-c="${c}"]`)?.focus({preventScroll:true})}if(['arrowright','arrowleft','arrowup','arrowdown'].includes(key)){e.preventDefault();const targets=Array.from($('truthTable').querySelectorAll('.cell:not(:disabled)')),index=targets.findIndex(b=>b.dataset.r==r&&b.dataset.c==c);if(key==='arrowup'||key==='arrowdown'){const delta=key==='arrowup'?-1:1;$('truthTable').querySelector(`[data-r="${r+delta}"][data-c="${c}"]`)?.focus({preventScroll:true})}else{const delta=key==='arrowright'?1:-1;targets[Math.max(0,Math.min(targets.length-1,index+delta))]?.focus({preventScroll:true})}}});
  $('decisionArea').addEventListener('click',e=>{const b=e.target.closest('[data-choice]');if(b)setChoice(b.dataset.choice)});
  $('translationArea').addEventListener('click',e=>{
    const option=e.target.closest('[data-tr-choice]');if(option&&exercise?.translation&&!exercise.translation.unlocked){const tr=exercise.translation;if(tr.kind==='deduction-guided'||tr.kind==='syllogism-guided'){const [i,j]=option.dataset.trChoice.split(':').map(Number);tr.values[i]=tr.options[i][j];tr.flags[i]=false}else tr.values[0]=tr.options[Number(option.dataset.trChoice)];tr.message='';renderTranslation();return}
    const symbol=e.target.closest('[data-symbol]');if(symbol&&exercise?.translation&&!exercise.translation.unlocked){const tr=exercise.translation,i=tr.activeField,input=$('translationArea').querySelector(`[data-tr-field="${i}"]`);if(!input)return;const start=input.selectionStart??input.value.length,end=input.selectionEnd??start;tr.values[i]=input.value.slice(0,start)+symbol.dataset.symbol+input.value.slice(end);input.value=tr.values[i];input.focus();input.setSelectionRange(start+symbol.dataset.symbol.length,start+symbol.dataset.symbol.length);tr.message='';return}
    const rule=e.target.closest('[data-ded-rule]');if(rule&&exercise?.translation?.rule&&!exercise.translation.unlocked){const tr=exercise.translation;tr.rule.selected=tr.rule.options[Number(rule.dataset.dedRule)];tr.message='';renderTranslation();return}
    if(e.target.closest('#validateTranslation'))validateTranslation();
  });
  $('translationArea').addEventListener('input',e=>{const f=e.target.closest('[data-tr-field]');if(!f||!exercise?.translation)return;const tr=exercise.translation;tr.values[Number(f.dataset.trField)]=f.value;tr.flags[Number(f.dataset.trField)]=false;tr.message=''});
  $('translationArea').addEventListener('focusin',e=>{const f=e.target.closest('[data-tr-field]');if(f&&exercise?.translation)exercise.translation.activeField=Number(f.dataset.trField)});
  $('translationArea').addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.matches('[data-tr-field]')){e.preventDefault();validateTranslation()}});
  $('categoricalArea').addEventListener('click',e=>{const choice=e.target.closest('[data-cat-choice]');if(choice&&exercise?.cat&&!exercise.cat.unlocked){const [i,j]=choice.dataset.catChoice.split(':').map(Number);exercise.cat.values[i]=exercise.cat.options[i][j];exercise.cat.flags[i]=false;renderCategorical();return}const symbol=e.target.closest('[data-cat-symbol]');if(symbol&&exercise?.cat&&!exercise.cat.unlocked){const cat=exercise.cat,i=cat.active,input=$('categoricalArea').querySelector(`[data-cat-field="${i}"]`);if(!input)return;const start=input.selectionStart??input.value.length,end=input.selectionEnd??start;cat.values[i]=input.value.slice(0,start)+symbol.dataset.catSymbol+input.value.slice(end);input.value=cat.values[i];input.focus();input.setSelectionRange(start+symbol.dataset.catSymbol.length,start+symbol.dataset.catSymbol.length);cat.message='';return}if(e.target.closest('#validateCategorical'))validateCategorical()});
  $('categoricalArea').addEventListener('input',e=>{const f=e.target.closest('[data-cat-field]');if(!f||!exercise?.cat)return;exercise.cat.values[Number(f.dataset.catField)]=f.value;exercise.cat.flags[Number(f.dataset.catField)]=false;exercise.cat.message=''});
  $('categoricalArea').addEventListener('focusin',e=>{const f=e.target.closest('[data-cat-field]');if(f&&exercise?.cat)exercise.cat.active=Number(f.dataset.catField)});
  $('categoricalArea').addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.matches('[data-cat-field]')){e.preventDefault();validateCategorical()}});
  $('vennArea').addEventListener('click',e=>{
    if(exercise?.mode!=='categoricos'||exercise.revealed)return;
    const v=exercise.cat.venn,task=vennTasks(exercise)[v.phase||0];
    const reg=e.target.closest('[data-venn-region], [data-venn-region-text]');
    if(reg&&task?.kind==='shade'&&!v.verified){
      const p=Number(reg.dataset.vennRegionText??reg.dataset.vennRegion);v.lastRegion=p;
      if(v.shaded.includes(p)){v.feedback='Esta região já foi marcada pela premissa anterior.';rerenderVennWithFocus(e.target);return}
      const cur=v.workingShade||[];
      v.workingShade=cur.includes(p)?cur.filter(x=>x!==p):[...cur,p].sort((a,b)=>a-b);
      v.feedback='';rerenderVennWithFocus(e.target);return;
    }
    const choice=e.target.closest('[data-venn-witness-choice]');
    if(choice&&task?.kind==='witness'&&!v.verified){
      v.witnessChoices[Number(choice.dataset.vennWitnessIndex)]=choice.dataset.vennWitnessChoice;
      v.feedback='';rerenderVennWithFocus(e.target);return;
    }
    if(e.target.closest('#clearVenn')&&!v.verified){v.workingShade=[];v.lastRegion=null;v.feedback='';rerenderVennWithFocus(e.target);return}
    const verdict=e.target.closest('[data-venn-verdict]');if(verdict&&v.verified&&!v.verdictVerified){v.verdict=verdict.dataset.vennVerdict;v.verdictFeedback='';rerenderVennWithFocus(e.target);return}
    if(e.target.closest('#validateVenn'))validateVenn();
    if(e.target.closest('#validateVennVerdict'))validateVennVerdict();
  });
  // O desenho responde a cliques; a seleção por teclado usa os botões textuais nativos.
  $('specialArea').addEventListener('change',onSpecialChange);$('checkButton').addEventListener('click',gradeExercise);$('hintButton').addEventListener('click',requestHint);$('independentHintDecision').addEventListener('click',handleHintDecision);$('clearButton').addEventListener('click',clear);$('undoClearButton').addEventListener('click',undoClear);$('revealButton').addEventListener('click',reveal);$('newButton').addEventListener('click',()=>nextExercise());$('newTopButton').addEventListener('click',()=>nextExercise());
  $('backButton').addEventListener('click',()=>courseAttempt?openCourse(true,courseAttempt.id):goHome());$('topHome').addEventListener('click',()=>goHome());$('brand').addEventListener('click',e=>{e.preventDefault();goHome()});$('howButton').addEventListener('click',showGuide);$('topGuide').addEventListener('click',showGuide);$('themeButton').addEventListener('click',toggleTheme);
  $('deductionArea').addEventListener('click',e=>{if(e.target.closest('#toggleDeductionTable')&&exercise?.mode==='deducao'){exercise.metadata.tableOpened=!exercise.metadata.tableOpened;renderDeduction();}});
  $('deductionArea').addEventListener('input',e=>{if(e.target.id==='deductionScratch'&&exercise?.mode==='deducao')exercise.metadata.scratch=e.target.value});
  /* Curso guiado: armazenamento próprio, independente do histórico de exercícios legado. */
  const COURSE_KEY='logiclab_curso_formal_v2';
  
  
  
  const shuffle=a=>{const copy=a.slice();for(let i=copy.length-1;i>0;i--){const j=rng(i+1);[copy[i],copy[j]]=[copy[j],copy[i]]}return copy};
  function makeSpecial(id,title,instruction,special,hint,resolution){return {mode:id,vars:['p'],roots:[],cols:[],envs:[],title,instruction,hint,resolution,choice:null,metadata:{signature:id+'-'+JSON.stringify(special.questions?.map(q=>q.question)||special.steps?.map(s=>pretty(s.target)))},answers:{},picked:'',grade:null,gradedEver:false,revealed:false,hintVisible:false,special:{...special,values:{}}}}
  function proofMode(level){
    const [p,q,r]=varsOf(3).map(v),P={p,q,r};let model;
    const basic=[
      {premises:[I(p,q),p],steps:[{target:q,rule:'MP',from:[1,2]}]},
      {premises:[I(p,q),not(q)],steps:[{target:not(p),rule:'MT',from:[1,2]}]},
      {premises:[I(p,q),I(q,r)],steps:[{target:I(p,r),rule:'SH',from:[1,2]}]},
      {premises:[A(p,q)],steps:[{target:p,rule:'AND_E',from:[1]}]},
      {premises:[p,q],steps:[{target:A(p,q),rule:'AND_I',from:[1,2]}]},
      {premises:[O(p,q),not(p)],steps:[{target:q,rule:'DS',from:[1,2]}]},
      {premises:[not(not(p))],steps:[{target:p,rule:'DN',from:[1]}]},
      {premises:[p],steps:[{target:O(p,q),rule:'OR_I',from:[1]}]}
    ];
    const advanced=[
      {premises:[A(p,q),I(q,r)],steps:[{target:q,rule:'AND_E',from:[1]},{target:r,rule:'MP',from:[2,3]}]},
      {premises:[I(p,q),I(q,r),p],steps:[{target:q,rule:'MP',from:[1,3]},{target:r,rule:'MP',from:[2,4]}]},
      {premises:[O(p,q),not(p),I(q,r)],steps:[{target:q,rule:'DS',from:[1,2]},{target:r,rule:'MP',from:[3,4]}]},
      {premises:[A(p,q),I(p,r)],steps:[{target:p,rule:'AND_E',from:[1]},{target:r,rule:'MP',from:[2,3]}]}
    ];
    model=pick(level==='easy'?basic:level==='medium'?basic.concat(advanced):advanced);
    const prior=[...model.premises,...model.steps.map(s=>s.target)],pool=[p,q,r,not(p),not(q),not(r),A(p,q),O(p,q),I(p,q),I(q,r),I(p,r),...prior];
    const steps=model.steps.map((step,i)=>{
      const all=shuffle([...new Map(pool.map(x=>[sig(x),x])).values()].filter(x=>sig(x)!==sig(step.target))).slice(0,3);
      return {...step,options:shuffle([step.target,...all]).map(pretty)};
    });
    return makeSpecial('provas','Construa uma prova formal','Complete as linhas derivadas. Indique a fórmula e a regra aplicada às linhas de origem. Cada justificativa pode ser conferida.',{type:'proof',premises:model.premises,steps,ruleOptions:[['MP','Modus ponens (→E)'],['MT','Modus tollens'],['SH','Silogismo hipotético'],['DS','Silogismo disjuntivo'],['AND_E','Eliminar conjunção (∧E)'],['AND_I','Introduzir conjunção (∧I)'],['OR_I','Introduzir disjunção (∨I)'],['DN','Eliminar dupla negação']]},'Leia as linhas de origem de cada passo. Identifique a regra e a fórmula que ela autoriza.',`A demonstração conclui ${pretty(steps.at(-1).target)} a partir das premissas, usando regras explícitas de inferência.`);
  }
  function predicatePrecisionMode(){
    const description=pick(DESCRIPTION_CASES),identity=pick(IDENTITY_CASES),relation=pick(RELATION_CASES);
    const questions=makePredicateQuestions(description,identity,relation);
    return makeSpecial('predicados2','Verifique existência, identidade e unicidade',
      'Leia o domínio e os papéis atribuídos, separe existência de unicidade, avalie uma descrição definida e teste quantificadores e substituições.',
      {type:'concept',questions},
      'Comece contando as pessoas que satisfazem o predicado. Depois verifique se há uma e apenas uma, se realiza a ação e se dois nomes referem-se ao mesmo indivíduo.',
      'Uma descrição definida exige existência, unicidade e a propriedade atribuída; identidade e escopo dos quantificadores precisam de hipóteses explícitas.');
  }
  function foundationsPracticeMode(level,id){
    const questions=shuffle(FOUNDATIONS_PRACTICE[id]).slice(0,level==='easy'?3:5);
    return makeSpecial(id,'Investigue fundamentos formais',
      'Distinga símbolos, modelos e inferências aplicando as definições da aula a novos casos.',
      {type:'concept',questions},
      'Identifique primeiro a linguagem e a relação envolvida. Depois compare a afirmação com o exemplo ou modelo.',
      'As respostas dependem da diferença entre sintaxe, satisfação, derivação e consequência semântica.');
  }
  function metatheoryPrecisionMode(level){
    if(level==='hard'&&rng(3)===0)return theoremMode(level);
    return makeSpecial('metateoria','Distingua prova, verdade e limites dos algoritmos',
      'Decida o que segue de correção, completude, incompletude e indecidibilidade. Analise casos concretos de término de programas.',
      {type:'concept',questions:makeMetatheoryQuestions()},
      'Pergunte qual sistema está envolvido. Correção: ⊢ implica ⊨. A parada de um programa específico não é o mesmo que um decisor para todos os programas.',
      'Completude da lógica de primeira ordem não contradiz incompletude de teorias aritméticas. Busca de provas e decisão geral são noções distintas.');
  }
  function gapPracticeMode(level,id){
    const lesson=LESSONS[id],pool={...GAP_PRACTICE,...MICRO_PRACTICE_A,...MICRO_PRACTICE_B,...FOCUSED_PRACTICE_A,...FOCUSED_PRACTICE_B}[id];
    if(!lesson||!pool)throw Error('Aula sem prática prevista: '+id);
    return makeSpecial(id,'Pratique a competência: '+lesson.lead,
      'Analise o caso e escolha a aplicação justificada da regra ensinada na leitura e no exemplo.',
      {type:'concept',questions:shuffle(pool).slice(0,level==='easy'?3:5)},
      'Retorne à definição, identifique os elementos e aplique o mesmo procedimento do exemplo.',
      'A conclusão deve decorrer da regra efetivamente ensinada, não de uma intuição sobre um assunto futuro.');
  }
  function alignedBasicMode(level,id,pool){
    return makeSpecial(id,'Consolide a competência introdutória',
      'Aplique a definição e a interpretação do exemplo sem introduzir técnicas avançadas.',
      {type:'concept',questions:shuffle(pool).slice(0,level==='easy'?3:5)},
      'Separe a afirmação e o que a evidência autoriza concluir.',
      'Uma resposta adequada respeita apenas as competências apresentadas na aula.');
  }
  function equivalencePrecisionMode(level,id='equivalencias'){
    const groups={equivalencias:['implicacao','negacao-conjuncao'],equiv_condicionais:['contrapositiva'],equiv_distributividade:['distribuicao'],equiv_absorcao:['absorcao'],equiv_bicondicional:['bicondicional']};
    if((level==='easy'&&id!=='equivalencias')||!groups[id])return gapPracticeMode(level,id);
    const chain=pick(REWRITE_CHAINS.filter(x=>groups[id]?.includes(x.id)));
    return makeSpecial(id,'Transforme uma fórmula justificando cada passo',
      'Verifique duas transformações equivalentes, identifique a lei aplicada e escolha um contraexemplo para uma transformação errada.',
      {type:'concept',questions:makeRewriteQuestions(chain)},
      'Em cada etapa, compare as condições de verdade e identifique a regra usada. Uma única interpretação divergente refuta a equivalência.',
      'Cada passagem correta preserva o valor em todas as interpretações; o contraexemplo demonstra por que um passo alternativo seria inválido.');
  }
  function evidenceMode(id){
    const configs={
      inducao:{bank:INDUCTION_CASES,build:buildInductionQuestions,title:'Teste uma generalização',instruction:'Compare população e amostra, localize o possível viés e formule uma conclusão proporcional à evidência.',hint:'Pergunte quem ficou fora da pesquisa e qual grupo a conclusão pretende descrever.',resolution:'O alcance da generalização depende da seleção, do tamanho e da qualidade dos dados.'},
      abducao:{bank:ABDUCTION_CASES,build:buildAbductionQuestions,title:'Compare hipóteses concorrentes',instruction:'Identifique explicações possíveis, procure previsões diferentes e atualize sua hipótese com novas observações.',hint:'Uma informação útil favorece hipóteses diferentes de modos diferentes; repetir o fato inicial não basta.',resolution:'Abdução seleciona explicações provisórias; não demonstra causas por necessidade lógica.'},
      probabilidade:{bank:PROBABILITY_CASES,build:buildProbabilityQuestions,title:'Calcule com frequências naturais',instruction:'Conte positivos verdadeiros, positivos falsos, total de positivos e calcule as taxas com o denominador certo.',hint:'A taxa de base usa toda a população. Já a proporção de casos reais entre positivos usa o total de positivos.',resolution:'P(condição | positivo) = positivos verdadeiros ÷ todos os positivos; não inverta o condicionamento.'},
      causalidade:{bank:CAUSAL_CASES,build:buildCausalQuestions,title:'Investigue uma hipótese causal',instruction:'Distinga associação de causalidade, identifique confundidores e proponha comparações relevantes.',hint:'Considere uma causa comum capaz de afetar tanto a exposição quanto o resultado.',resolution:'Uma associação pode justificar investigar causalidade, mas precisa de comparação e controle de alternativas.'}
    };
    const c=configs[id],item=pick(c.bank),questions=c.build(item);
    return makeSpecial(id,c.title,c.instruction,{type:'concept',questions},c.hint,c.resolution);
  }
  function assumptionsMode(level){
    const item=pick(ASSUMPTION_CASES);
    const questions=buildAssumptionQuestions(item);
    return makeSpecial('pressupostos','Descubra o pressuposto e teste uma explicação',
      'Leia a situação. Identifique a hipótese oculta, escolha uma explicação alternativa e formule a conclusão justificável.',
      {type:'concept',questions},
      'Pergunte que outro acontecimento poderia produzir o mesmo resultado, sem que a conclusão original fosse necessária.',
      'Uma explicação alternativa mostra que a causa proposta ainda não foi demonstrada; isso não prova que ela seja falsa.');
  }
  function categoricalReasoningMode(level){
    const allowed=CATEGORICAL_CASES.filter(c=>c.level<=(level==='easy'?1:level==='medium'?2:3));
    const item=pick(allowed),terms=pick(CATEGORICAL_CONTEXTS),regime=pick(['modern','traditional']);
    const questions=[...buildSquareQuestions(regime),...buildCategoricalQuestions(item,terms).slice(0,2)];
    return makeSpecial('categoricos2','Quadrado das oposições e inferências entre categorias',
      'Interprete as relações A/E/I/O sob o regime informado, julgue o silogismo e escolha uma justificativa ou contraexemplo.',
      {type:'concept',questions},
      'No quadrado, verifique se S pode estar vazio. Em um silogismo inválido, procure premissas V com conclusão F.',
      'As relações A–O e E–I são sempre contraditórias. '+item.explanation);
  }
  function criticalThinkingMode(level,id){
    id=id||mode;
    const lesson=LESSONS[id],pool=ERROR_PRACTICE[id];
    if(!pool||!lesson)throw Error('Atividade de pensamento crítico indisponível: '+id);
    const count=level==='easy'?3:5;
    const questions=shuffle(pool).slice(0,count);
    return makeSpecial(id,'Investigue um caso: '+lesson.lead,
      'Analise a situação e escolha a interpretação melhor justificada. Para cada resposta, confira a razão e os limites da conclusão.',
      {type:'concept',questions},
      'Localize exatamente qual evidência sustenta a conclusão. Procure alternativas, denominadores e eventuais informações ausentes.',
      'Uma boa análise separa fatos, hipótese e inferência; corrigir o diagnóstico importa mais do que memorizar o nome do erro.');
  }
  function advancedConceptMode(level,id){id=id||mode;const bank=LESSONS[id]?.quiz||LESSONS.metateoria.quiz;const count=level==='easy'?2:3;const questions=shuffle(bank).slice(0,count);return makeSpecial(id,'Interprete o conceito e justifique a escolha','Selecione a resposta de cada questão. Ao corrigir, você verá a explicação da alternativa correta.',{type:'concept',questions},'Releia a definição na miniaula do tema e busque um exemplo que diferencie as alternativas.','Cada questão exige aplicar a definição com precisão. Confira as justificativas de cada resposta.');}
  function onSpecialChange(e){const s=exercise?.special;if(!s||exercise.revealed)return;const field=e.target.closest('[data-special-field]');if(!field)return;s.values[field.dataset.specialField]=field.value;exercise.grade=null;const key=field.dataset.specialField;renderSpecial();renderFeedback();[...$('specialArea').querySelectorAll('[data-special-field]')].find(el=>el.dataset.specialField===key)?.focus({preventScroll:true});}
  function renderSpecial(){const area=$('specialArea');if(!exercise?.special){area.classList.add('hide');$('tableStage').classList.remove('hide');$('checkButton').textContent='✓ Corrigir tabela';return;}
    area.classList.remove('hide');$('tableStage').classList.add('hide');$('checkButton').textContent='✓ Corrigir atividade';const ex=exercise,s=ex.special;
    if(s.type==='theorem'||s.type==='semanticworld'||s.type==='otherlogic'){area.innerHTML=renderAdvancedSpecial(ex);return;}
    if(s.type==='proof'){
      const rowCount=s.premises.length;
      let body=`<div class="special-premises"><b>Premissas fornecidas</b>${s.premises.map((a,i)=>`<div><b>${i+1}.</b> <code>${escapeHTML(pretty(a))}</code> — Premissa</div>`).join('')}</div><p class="cat-work-lead">Seu objetivo: demonstrar <strong>${escapeHTML(pretty(s.steps.at(-1).target))}</strong>. Nas próximas linhas, escolha a fórmula e sua justificativa.</p><div class="special-grid">`;
      s.steps.forEach((step,i)=>{const formulaKey=i+'-formula',ruleKey=i+'-rule',v=s.values[formulaKey]||'',rule=s.values[ruleKey]||'',correct=pretty(step.target);const graded=!!ex.grade||ex.revealed;
        body+=`<div class="special-card"><strong>Linha ${rowCount+i+1} — derivada das linhas ${step.from.join(' e ')}</strong><div class="special-line">Qual fórmula resulta da aplicação da regra?</div><label class="inline-label" for="proofFormula${i}">Fórmula deduzida</label><select id="proofFormula${i}" data-special-field="${formulaKey}" ${ex.revealed?'disabled':''}><option value="">Selecione a fórmula...</option>${step.options.map(o=>`<option value="${escapeHTML(o)}" ${v===o?'selected':''}>${escapeHTML(o)}</option>`).join('')}</select><label class="inline-label" for="proofRule${i}">Justificativa</label><select id="proofRule${i}" data-special-field="${ruleKey}" ${ex.revealed?'disabled':''}><option value="">Selecione a regra...</option>${s.ruleOptions.map(([key,label])=>`<option value="${key}" ${rule===key?'selected':''}>${escapeHTML(label)}</option>`).join('')}</select>${graded?`<p class="${v===correct||ex.revealed?'correct-label':'incorrect-label'}">Fórmula: ${escapeHTML(correct)} · Regra: ${escapeHTML(s.ruleOptions.find(x=>x[0]===step.rule)[1])} · origem ${step.from.join(', ')}</p>`:''}</div>`;
      });area.innerHTML=body+'</div>';
    }else{
      area.innerHTML=`<div class="special-grid">${s.questions.map((q,i)=>`<div class="special-card"><strong>${i+1}. ${escapeHTML(q.question)}</strong><label class="inline-label" for="specialChoice${i}">Escolha sua resposta</label><select id="specialChoice${i}" data-special-field="${i}" ${ex.revealed?'disabled':''}><option value="">Escolha uma alternativa...</option>${q.options.map((o,j)=>`<option value="${j}" ${s.values[i]===String(j)?'selected':''}>${escapeHTML(o)}</option>`).join('')}</select>${ex.grade||ex.revealed?`<div class="course-question-explanation"><strong>Correta:</strong> ${escapeHTML(q.options[q.correct])}. ${escapeHTML(q.why)}</div>`:''}</div>`).join('')}</div>`;
    }
  }
  function gradeSpecial(){const ex=exercise,s=ex.special;if(ex.revealed)return;let correct=0,total=0,missing=0;
    if(s.type==='theorem')s.parts.forEach((part,i)=>{total++;const v=s.values[i];if(v===undefined||v==='')missing++;if(v===String(part.correct))correct++});
    else if(s.type==='semanticworld'||s.type==='otherlogic')s.items.forEach((item,i)=>{total++;const v=s.values[i];if(v===undefined||v==='')missing++;if(v===item.value)correct++});
    else if(s.type==='proof')s.steps.forEach((step,i)=>{for(const [key,want] of [[i+'-formula',pretty(step.target)],[i+'-rule',step.rule]]){total++;const have=s.values[key];if(have===undefined||have==='')missing++;if(have===want)correct++}});
    else s.questions.forEach((q,i)=>{total++;const have=s.values[i];if(have===undefined||have==='')missing++;if(have===String(q.correct))correct++});
    ex.grade={correct,total,missing};if(!ex.gradedEver){ex.firstGrade={...ex.grade};ex.gradedEver=true;const data=stats.byMode[ex.mode]||{tries:0,perfect:0,correct:0,total:0};data.tries++;data.correct+=correct;data.total+=total;if(correct===total)data.perfect++;stats.byMode[ex.mode]=data;stats.tries++;stats.correct+=correct;stats.total+=total;if(correct===total)stats.perfect++;save()}recordGuidedAttempt();renderExercise();$('feedbackArea').scrollIntoView({behavior:'smooth',block:'nearest'});
  }
  function loadCourseState(){try{const parsed=JSON.parse(localStorage.getItem(COURSE_KEY));if(parsed&&parsed.lessons&&parsed.final)return parsed}catch(e){}return {lessons:{},final:{}}}
  let courseState=loadCourseState(),courseActive=null,courseAttempt=null,finalExamSession=null;
  function saveCourseState(){try{localStorage.setItem(COURSE_KEY,JSON.stringify(courseState))}catch(e){}}
  // Migração não destrutiva: as conquistas antigas continuam como avaliações aprovadas.
  // Novas revisões começam a contar somente depois da publicação desta versão.
  let reviewMigration=false;
  for(const unit of COURSE_UNITS)for(const id of unit.ids){
    const progress=courseState.lessons[id];
    if(progress&&beginReviewTracking(progress)){reviewMigration=true}
  }
  if(reviewMigration)saveCourseState();
  const reviewDue=()=>reviewQueue(COURSE_UNITS,courseState.lessons);
  const reviewLabel=progress=>{
    const state=reviewStatus(progress);
    if(state.status==='consolidated')return 'Domínio consolidado';
    if(state.status==='due')return `Revisão ${state.completed+1}/2 disponível`;
    if(state.status==='scheduled')return `Revisão ${state.completed+1}/2 em ${formatReviewDate(state.dueAt)}`;
    return progress?.independent?'Avaliação inicial pendente':progress?.read?'Em andamento':'Começar';
  };
  function courseProgress(id){if(!courseState.lessons[id])courseState.lessons[id]={read:false,example:false,guided:false,independent:false,mastered:false,best:0};return courseState.lessons[id]}
  function courseTotal(){return COURSE_UNITS.reduce((n,u)=>n+u.ids.length,0)}
  function courseMastered(){return consolidatedCount(COURSE_UNITS,courseState.lessons)}
  function courseApproved(){return COURSE_UNITS.reduce((n,u)=>n+u.ids.filter(id=>courseProgress(id).mastered).length,0)}
  function updateCourseHome(){
    if(!$('courseHomeSummary'))return;
    const v=learningOverview(COURSE_UNITS,courseState.lessons),pct=n=>Math.round(n*100/v.total)+'%';
    $('courseHomeApprovedLabel').textContent=`Avaliações iniciais aprovadas: ${v.approved} de ${v.total}`;
    $('courseHomeConsolidatedLabel').textContent=`Domínio consolidado: ${v.consolidated} de ${v.total}`;
    $('courseHomeApprovedPct').textContent=pct(v.approved);
    $('courseHomeConsolidatedPct').textContent=pct(v.consolidated);
    $('courseHomeApprovedMeter').style.width=pct(v.approved);
    $('courseHomeConsolidatedMeter').style.width=pct(v.consolidated);
    for(const [kind,value] of [['Approved',v.approved],['Consolidated',v.consolidated]]){
      const bar=$('courseHome'+kind+'Bar');
      bar.setAttribute('aria-valuemax',String(v.total));
      bar.setAttribute('aria-valuenow',String(value));
    }
    const summary=`${v.approved} de ${v.total} avaliações aprovadas · ${v.consolidated} consolidados.`;
    const followUp=v.due.length?` ${v.due.length} ${v.due.length===1?'revisão disponível':'revisões disponíveis'} agora.`
      :v.upcoming.length?` Próxima revisão: ${MODULES.find(m=>m.id===v.upcoming[0].id)?.name||'Tema'} em ${formatReviewDate(v.upcoming[0].state.dueAt)}.`
      :v.allConsolidated?' Todos os temas consolidados.':' Aprovação inicial e consolidação são conquistas diferentes.';
    $('courseHomeSummary').textContent=summary+followUp;
  }
  function renderCourseMap(){
    const v=learningOverview(COURSE_UNITS,courseState.lessons);
    const finalBest=courseState.final.best||0;
    let html=`<div class="course-unit"><div class="course-tile-row"><div><span class="eyebrow">MAPA DE APRENDIZAGEM</span><h2>${v.approved} avaliações aprovadas · ${v.consolidated} temas consolidados</h2><p>Uma avaliação aprovada registra o aprendizado inicial. Duas revisões independentes posteriores consolidam o tema. Melhor prova integrada: ${finalBest?finalBest+'/12':'ainda não realizada'}.</p></div><button type="button" class="button" data-caction="exam-open">Avaliação final integrada →</button></div><div class="learning-progress-pair" aria-label="Progresso por etapa"><div><strong>Aprovação inicial: ${v.approved}/${v.total}</strong><div class="course-meter" role="progressbar" aria-label="Avaliações iniciais aprovadas" aria-valuemin="0" aria-valuemax="${v.total}" aria-valuenow="${v.approved}"><span style="width:${100*v.approved/v.total}%"></span></div></div><div><strong>Domínio consolidado: ${v.consolidated}/${v.total}</strong><div class="course-meter consolidated" role="progressbar" aria-label="Domínio consolidado" aria-valuemin="0" aria-valuemax="${v.total}" aria-valuenow="${v.consolidated}"><span style="width:${100*v.consolidated/v.total}%"></span></div></div></div></div>`;
    if(v.due.length){
      html+=`<section class="course-unit course-reviews"><h2>Revisões disponíveis (${v.due.length})</h2><p>Resolva um novo exercício do tema sem consultar dicas. Cada revisão precisa de 80% na primeira correção.</p><div class="course-review-list">${v.due.map(item=>`<button class="button" type="button" data-caction="lesson" data-id="${item.id}">${escapeHTML(MODULES.find(m=>m.id===item.id).name)} · revisão ${item.state.completed+1}/2 →</button>`).join('')}</div></section>`;
    }
    if(v.upcoming.length){
      html+=`<section class="course-unit"><h2>Próximas revisões programadas (${v.upcoming.length})</h2><p>O horário abaixo indica quando cada revisão poderá ser iniciada. Continue estudando enquanto isso.</p><div class="course-review-schedule">${v.upcoming.map(item=>`<div class="course-review-schedule-item"><strong>${escapeHTML(MODULES.find(m=>m.id===item.id).name)}</strong><span>Revisão ${item.state.completed+1}/2 · ${formatReviewDate(item.state.dueAt)}</span></div>`).join('')}</div></section>`;
    }
    COURSE_UNITS.forEach((unit,index)=>{
      const done=unit.ids.filter(id=>reviewStatus(courseProgress(id)).consolidated).length;
      html+=`<section class="course-unit"><div class="course-unit-top"><span class="eyebrow">UNIDADE ${index+1}</span><span class="course-unit-progress">${done}/${unit.ids.length} consolidados</span></div><h2>${escapeHTML(unit.title)}</h2><p>${escapeHTML(unit.note)}</p><div class="course-unit-lessons">${unit.ids.map(id=>{
        const lesson=MODULES.find(m=>m.id===id),progress=courseProgress(id),status=reviewLabel(progress);
        return `<button type="button" class="course-unit-item" data-caction="lesson" data-id="${id}"><span class="course-status">${lesson.no}</span><span><strong>${escapeHTML(lesson.name)}</strong><small>${escapeHTML(progress.mastered&&!reviewStatus(progress).consolidated?'Avaliação aprovada · '+status:status)} · melhor avaliação ${progress.best?Math.round(progress.best*100)+'%':'—'}</small></span></button>`;
      }).join('')}</div></section>`;
    });
    $('courseMap').innerHTML=html;
  }
  function openCourse(updateHash=true,id=null){courseAttempt=null;courseActive=id&&LESSONS[id]?id:null;$('freeTableView').classList.add('hide');$('homeView').classList.add('hide');$('workView').classList.add('hide');$('courseView').classList.remove('hide');$('courseExam').classList.add('hide');if(updateHash)setRouteHash(courseActive?'aula-'+courseActive:'curso');renderCourse();scrollTo({top:0,behavior:'instant'})}
  function renderCourse(){
    updateCourseContext(courseActive?'lesson':'map');
    renderCourseMap();$('courseMap').classList.toggle('hide',!!courseActive);$('courseLesson').classList.toggle('hide',!courseActive);$('courseMapButton').classList.toggle('hide',!courseActive);$('courseExam').classList.add('hide');if(courseActive)renderCourseLesson();}
  function updateCourseContext(view){
    const lesson=courseActive?MODULES.find(m=>m.id===courseActive):null;
    const context=courseScreenContext(view,lesson);
    $('courseLocation').textContent=context.location;
    $('courseDescription').textContent=context.description;
  }
  const COURSE_READINGS={...UNIT1_READINGS,...UNIT2_READINGS,...UNIT3_READINGS,...UNIT4_TO_6_READINGS,...UNIT12_READINGS,...UNIT13_READINGS,...ERROR_READINGS,...OTHER_LOGIC_READINGS,...FOUNDATIONS_READINGS,...GAP_READINGS_A,...GAP_READINGS_B,...MICRO_READINGS_A,...MICRO_READINGS_B,...FOCUSED_READINGS_A,...FOCUSED_READINGS_B};
  const EXTENDED_ASSESSMENTS={...PILOT_ASSESSMENTS,...UNIT1_ASSESSMENTS,...UNIT2_ASSESSMENTS,...UNIT3_ASSESSMENTS,...UNIT4_ASSESSMENTS,...UNIT5_TO_7_ASSESSMENTS,...ERROR_ASSESSMENTS,...OTHER_LOGIC_ASSESSMENTS,...FOUNDATIONS_ASSESSMENTS,...GAP_ASSESSMENTS,...ALIGNED_ASSESSMENTS,...MICRO_ASSESSMENTS_A,...MICRO_ASSESSMENTS_B,...FOCUSED_ASSESSMENTS_A,...FOCUSED_ASSESSMENTS_B};
  function assessmentForLesson(id){
    const p=courseProgress(id);
    p.assessmentV2=p.assessmentV2||{version:ASSESSMENT_VERSION,history:[]};
    const a=p.assessmentV2;
    if(!Array.isArray(a.history))a.history=[];
    if(!a.draft||!Array.isArray(a.draft.questions)||a.draft.questions.length!==5){
      const bank=prepareBank(id,LESSONS[id],COURSE_READINGS[id],EXTENDED_ASSESSMENTS[id]||[]);
      a.draft={questions:composeAssessment(bank,a.history),startedAt:Date.now(),answers:{}};
      saveCourseState();
    }
    return a.draft.questions;
  }
  function renderWorkedExample(id,progress){
    const data=WORKED_EXAMPLES[id];
    if(!data)throw Error('Exemplo resolvido ausente: '+id);
    const count=data.steps.length;
    const shown=Number.isInteger(progress.workedStep)?Math.max(1,Math.min(count,progress.workedStep)):
      progress.example?count:1;
    const c=data.check;
    const options=c.options.map((label,index)=>
      `<label class="worked-check-option"><input type="radio" name="worked-check-${escapeHTML(id)}" value="${index}"><span>${escapeHTML(label)}</span></label>`).join('');
    return `<div class="course-example worked-example" data-worked-example>
      <div class="worked-example-head"><p class="worked-context"><strong>Exemplo concreto:</strong> ${escapeHTML(data.context)}</p><span class="worked-counter" data-worked-counter>Passo ${shown} de ${count}</span></div>
      <ol class="worked-steps">${data.steps.map((step,i)=>
        `<li data-worked-step="${i+1}" ${i>=shown?'hidden':''}><div class="worked-step-body">
          <h4 class="worked-formal" tabindex="-1" data-worked-heading>${escapeHTML(step.formal)}</h4>
          <p class="worked-concrete"><span class="worked-example-label">Em palavras:</span> <em>${escapeHTML(step.concrete)}</em></p>
          <p class="worked-reason"><strong>Por quê?</strong> ${escapeHTML(step.reason)}</p>
          ${i<count-1?`<button type="button" class="button small worked-next" data-caction="worked-next" data-next="${i+2}" ${i+1!==shown?'hidden':''}>Próximo passo →</button>`:''}
        </div></li>`).join('')}</ol>
      <div class="worked-finish" data-worked-finish ${shown<count?'hidden':''}>
        <fieldset class="worked-check"><legend>Confira o raciocínio</legend>
          
          <strong class="worked-check-question">${escapeHTML(c.question)}</strong>
          <div class="worked-check-options">${options}</div>
          <button type="button" class="button small" data-caction="worked-check">Conferir resposta</button>
          <p class="worked-check-feedback" role="status" aria-live="polite" data-worked-feedback></p>
        </fieldset>
        <div class="course-lesson-actions"><button type="button" class="button ${progress.example?'':'primary'}" data-caction="example">${progress.example?'✓ Exemplo estudado · continuar':'Entendi a resolução →'}</button></div>
      </div>
      <div class="worked-utility-actions">
        <button type="button" class="button small" data-caction="worked-show-all" ${shown===count?'hidden':''}>Mostrar tudo</button>
        <button type="button" class="button small" data-caction="worked-restart" ${shown!==count?'hidden':''}>Rever desde o início</button>
      </div>
    </div>`;
  }
  function setWorkedStep(step){
    const id=courseActive,data=WORKED_EXAMPLES[id],progress=courseProgress(id);
    if(!data)return;
    const count=data.steps.length;
    const shown=Math.max(1,Math.min(count,step));
    progress.workedStep=shown;saveCourseState();
    const root=$('courseLesson').querySelector('[data-worked-example]');
    if(!root)return;
    const previously=root.querySelectorAll('[data-worked-step]:not([hidden])').length;
    root.querySelectorAll('[data-worked-step]').forEach((section,i)=>{
      section.hidden=i>=shown;
      const btn=section.querySelector('[data-caction="worked-next"]');
      if(btn)btn.hidden=i+1!==shown;
    });
    root.querySelector('[data-worked-counter]').textContent=`Passo ${shown} de ${count}`;
    root.querySelector('[data-worked-finish]').hidden=shown<count;
    root.querySelector('[data-caction="worked-show-all"]').hidden=shown===count;
    root.querySelector('[data-caction="worked-restart"]').hidden=shown!==count;
    const focusIndex=shown>previously?Math.min(previously+1,shown):shown;
    const target=root.querySelector(`[data-worked-step="${focusIndex}"] [data-worked-heading]`);
    target?.scrollIntoView({behavior:'auto',block:'nearest'});
    target?.focus({preventScroll:true});
  }
  function renderPedagogyBridge(bridge,index,sectionHeading){
    const labels=['Reconheça a ideia','Complete o raciocínio','Tente em outro contexto'];
    const choices=bridge.options.map((label,i)=>
      `<label class="reading-check-option"><input type="radio" name="reading-bridge-${index}" value="${i}"><span>${escapeHTML(label)}</span></label>`
    ).join('');
    return `<fieldset class="reading-bridge" data-reading-bridge="${index}">
      <legend>Questão-ponte ${index+1}/3 · ${labels[index]}</legend>
      <p class="reading-bridge-section"><strong>${escapeHTML(sectionHeading)}</strong></p>
      
      <strong class="reading-check-question">${escapeHTML(bridge.question)}</strong>
      <div class="reading-check-options">${choices}</div>
      <div class="reading-bridge-actions"><button type="button" class="button small" data-caction="bridge-check">Conferir meu raciocínio</button>
      <button type="button" class="button small" data-caction="bridge-hint" aria-expanded="false">Mostrar uma pista</button></div>
      <p class="reading-bridge-hint" data-bridge-hint hidden>${escapeHTML(bridge.hint)}</p>
      <p class="reading-check-feedback" data-bridge-feedback role="status" aria-live="polite"></p>
    </fieldset>`;
  }
  function renderPedagogicalReading(reading,id){
    const support=PEDAGOGY_BRIDGES[id];
    // Algumas aulas têm mais de três seções: distribua as três decisões
    // após a primeira, uma seção intermediária e a última, sem omitir a etapa de transferência.
    const positions=sectionBridgePositions(reading.sections.length);
    const sections=reading.sections.map((section,i)=>{
      const slot=positions.indexOf(i);
      return `<section class="reading-section"><h4>${escapeHTML(section.heading)}</h4>${section.paragraphs.map(text=>`<p>${escapeHTML(text)}</p>`).join('')}</section>${support&&slot>=0?renderPedagogyBridge(support.bridges[slot],slot,section.heading):''}`;
    }).join('');
    const choices=reading.check.options.map((label,i)=>
      `<label class="reading-check-option"><input type="radio" name="reading-check" value="${i}"><span>${escapeHTML(label)}</span></label>`
    ).join('');
    const handoff=support?`<aside class="reading-handoff" aria-label="Roteiro de aplicação"><h4>${escapeHTML(support.handoff.title)}</h4><ol>${support.handoff.steps.map(step=>`<li>${escapeHTML(step)}</li>`).join('')}</ol><p>${escapeHTML(support.handoff.next)}</p></aside>`:'';
    return `<div class="pedagogical-reading"><p class="reading-objective"><strong>Ao final desta explicação, você será capaz de:</strong> ${escapeHTML(reading.objective)}</p>${sections}${handoff}<div class="reading-distinction"><strong>Uma confusão comum</strong><p>${escapeHTML(reading.misconception)}</p></div><p class="reading-summary"><strong>Em resumo:</strong> ${escapeHTML(reading.summary)}</p><fieldset class="reading-check" data-reading-check><legend>Confira o essencial</legend><strong class="reading-check-question">${escapeHTML(reading.check.question)}</strong><div class="reading-check-options">${choices}</div><button type="button" class="button small" data-caction="reading-check">Conferir resposta</button><p class="reading-check-feedback" data-reading-feedback role="status" aria-live="polite"></p></fieldset></div>`;
  }
  function renderOppositionSquare(){
    const nodes=[['A',58,66],['E',482,66],['I',58,322],['O',482,322]];
    const shape=`<div class="square-diagram-scroll"><svg class="square-diagram" viewBox="0 0 640 390" role="img" aria-label="Quadrado das oposições: A e E na linha superior, I e O na inferior; A com O e E com I são contraditórias; outras relações dependem de S não vazio.">
      <line class="square-edge square-conditional" x1="130" y1="67" x2="510" y2="67"/>
      <line class="square-edge square-conditional" x1="130" y1="316" x2="510" y2="316"/>
      <line class="square-edge square-conditional" x1="94" y1="103" x2="94" y2="285"/>
      <line class="square-edge square-conditional" x1="546" y1="103" x2="546" y2="285"/>
      <line class="square-edge square-contradiction" x1="120" y1="97" x2="520" y2="295"/>
      <line class="square-edge square-contradiction" x1="520" y1="97" x2="120" y2="295"/>
      <rect class="square-center" x="244" y="178" rx="8" width="152" height="35"/>
      <text class="square-center-text" x="320" y="201" text-anchor="middle">Contradição (sempre)</text>
      <text class="square-relation-label" x="320" y="54" text-anchor="middle">Contrariedade*</text>
      <text class="square-relation-label" x="320" y="358" text-anchor="middle">Subcontrariedade*</text>
      <text class="square-relation-label" x="73" y="197" text-anchor="middle" transform="rotate(-90 73 197)">Subalternação*</text>
      <text class="square-relation-label" x="568" y="197" text-anchor="middle" transform="rotate(90 568 197)">Subalternação*</text>
      ${nodes.map(([key,x,y])=>`<g><rect class="square-node" x="${x}" y="${y-30}" width="72" height="58" rx="12"/><text class="square-node-letter" x="${x+36}" y="${y+9}" text-anchor="middle">${key}</text></g>`).join('')}
    </svg></div>`;
    const forms=Object.entries(SQUARE_FORMS).map(([key,form])=>`<div class="square-form"><strong>${key}</strong><span>${escapeHTML(form.sentence)}</span><code>${escapeHTML(form.formula)}</code></div>`).join('');
    const assumptions=Object.entries(SQUARE_FORMS).flatMap(([key,form])=>
      [true,false].map(v=>`<option value="${key}:${v?'1':'0'}">${key} · ${v?'verdadeira':'falsa'} — ${escapeHTML(form.sentence)}</option>`)).join('');
    const answerOptions=`<option value="">Escolha...</option><option value="V">Necessariamente V</option><option value="F">Necessariamente F</option><option value="?">Não é possível determinar</option>`;
    return `<div class="opposition-lab" data-square-lab data-mode="modern">
      <h4>Quadrado das oposições: veja, compare e teste</h4>
      <p>As diagonais representam contradição em qualquer regime. As linhas marcadas com * dependem de S não vazio na convenção estudada. No celular, deslize o diagrama para o lado.</p>
      ${shape}<div class="square-form-grid">${forms}</div>
      <div class="square-controls">
        <label for="squareMode">1. Qual interpretação será utilizada?<select id="squareMode" data-square-mode><option value="modern">${SQUARE_MODES.modern.label}</option><option value="traditional">${SQUARE_MODES.traditional.label}</option></select></label>
        <p class="square-mode-description" data-square-mode-description>${escapeHTML(SQUARE_MODES.modern.description)}</p>
        <p data-square-relations class="square-relations-summary">Com S possivelmente vazio, apenas as duas contradições diagonais são incondicionais.</p>
        <label for="squareGiven">2. O que já sabemos?<select id="squareGiven" data-square-given>${assumptions}</select></label>
        <fieldset class="square-answers"><legend>3. O que isso obriga a concluir sobre as outras formas?</legend><div data-square-targets></div></fieldset>
        <button type="button" class="button" data-caction="square-check">Conferir minhas inferências</button>
        <p role="status" aria-live="polite" data-square-feedback class="square-feedback"></p>
      </div>
    </div>`;
  }
  function updateSquareLab(lab){
    const mode=lab.querySelector('[data-square-mode]').value;
    const [known,flag]=lab.querySelector('[data-square-given]').value.split(':');
    lab.dataset.mode=mode;
    lab.querySelector('[data-square-mode-description]').textContent=SQUARE_MODES[mode].description;
    const optional=['AE','IO','AI','EO'].map(k=>squarePairRelation(mode,k).valid).every(Boolean);
    lab.querySelector('[data-square-relations]').textContent=optional
      ?'Com S não vazio: contrariedade (A–E), subcontrariedade (I–O) e subalternação (A→I, E→O) também são válidas.'
      :'Com S possivelmente vazio: apenas A–O e E–I são contraditórias em todos os cenários; as outras relações dependem de uma hipótese de existência.';
    lab.querySelector('[data-square-targets]').innerHTML=Object.entries(SQUARE_FORMS).filter(([k])=>k!==known).map(([k,form])=>
      `<label class="square-answer" for="squareAnswer${k}"><span>${k} · ${escapeHTML(form.sentence)}</span><select id="squareAnswer${k}" data-square-answer="${k}"><option value="">Escolha...</option><option value="V">Necessariamente V</option><option value="F">Necessariamente F</option><option value="?">Não é possível determinar</option></select></label>`
    ).join('');
    const feedback=lab.querySelector('[data-square-feedback]');feedback.textContent='';delete feedback.dataset.result;
  }
  function checkSquareLab(lab){
    const [known,flag]=lab.querySelector('[data-square-given]').value.split(':');
    const mode=lab.querySelector('[data-square-mode]').value;
    const expected=squareConsequences(mode,known,flag==='1');
    const selected=[...lab.querySelectorAll('[data-square-answer]')];
    const feedback=lab.querySelector('[data-square-feedback]');
    if(selected.some(s=>!s.value)){feedback.textContent='Escolha um resultado para as três formas antes de conferir.';return}
    let correct=0;
    const explanation=selected.map(s=>{
      const key=s.dataset.squareAnswer,want=expected[key];
      if(s.value===want)correct++;
      return key+': '+(want==='?'?'não é possível determinar':want==='V'?'necessariamente verdadeira':'necessariamente falsa');
    });
    feedback.dataset.result=correct===selected.length?'correct':'retry';
    feedback.textContent=correct+' de '+selected.length+' inferências corretas. '+explanation.join('; ')+'. '+(mode==='modern'?'Experimente S vazio e depois S com integrantes dentro e fora de P.':'Neste regime sabemos que S tem ao menos um integrante.')+(correct===selected.length?' Você pode prosseguir.':' Compare com o diagrama e tente outra combinação.');
  }
  function renderTransferSteps(guide){
    return `<ol class="practice-transfer-steps">${guide.steps.map(step=>`<li>${escapeHTML(step)}</li>`).join('')}</ol>`;
  }
  function renderWorkedReminder(guide){
    return `<details class="practice-transfer-example"><summary>Rever a resolução do exemplo anterior</summary>
      <p><strong>Situação estudada:</strong> ${escapeHTML(guide.worked.context)}</p>
      <ol>${guide.worked.steps.map(step=>`<li><strong>${escapeHTML(step.formal)}</strong>
        <p>${escapeHTML(step.concrete)}</p><small>Por quê? ${escapeHTML(step.reason)}</small></li>`).join('')}</ol>
      <p class="practice-transfer-note">O exemplo explica o procedimento; o desafio aberto usa dados próprios.</p>
    </details>`;
  }
  function renderTransferPrep(id){
    const guide=practiceTransferGuide(id,COURSE_READINGS,PEDAGOGY_BRIDGES,WORKED_EXAMPLES,'guided');
    return `<div class="practice-transfer-prep"><p><strong>Do exemplo ao seu exercício:</strong> você vai aplicar o procedimento a dados novos. Antes de começar, lembre-se destas decisões:</p>
      ${renderTransferSteps(guide)}
</div>`;
  }
  function stagePanelStart(number,title,completed,forceOpen=false,extraClass=''){
    const heading=`<h3 tabindex="-1">${number}. ${escapeHTML(title)}</h3>`;
    const klass=`course-lesson-panel${extraClass?' '+extraClass:''}`;
    return completed
      ?`<details class="${klass} course-stage-completed" id="course-stage-${number}" ${forceOpen?'open':''}><summary>${heading}</summary><div class="course-stage-content">`
      :`<section class="${klass}" id="course-stage-${number}">${heading}`;
  }
  const stagePanelEnd=completed=>completed?'</div></details>':'</section>';
  /** Exibe ajuda externa abaixo do feedback, sem enviar dados até o clique no link. */
  function explanationData(feedback){
    const wrap=feedback.closest('[data-assessment-question],.course-question,.reading-bridge,.reading-check,.worked-check,.special-card,.cat-question,.categorical-stage,.translation-question,.decision,.result-box,[data-square-lab]')||feedback.parentElement;
    const selectedText=()=>[...wrap.querySelectorAll('input:checked,select,button[aria-pressed="true"]')].map(el=>{
      if(el.tagName==='SELECT')return el.selectedOptions[0]?.textContent?.trim()||'';
      if(el.matches('input'))return el.closest('label')?.textContent?.trim()||el.value;
      return el.textContent.trim();
    }).filter(Boolean).join(' | ');
    const optionTexts=()=>[...wrap.querySelectorAll('label.course-option span,label.reading-check-option span,label.worked-check-option span,select option:not([value=""]),button.choice,button.translation-option')].map(el=>el.textContent.trim()).filter(Boolean);
    const context=exercise&&feedback.closest('#workView')
      ?[exercise.title,exercise.instruction,exercise.translation?.statements?.join(' | '),exercise.cat?.texts?.join(' | '),exercise.special?.scope].filter(Boolean).join(' — ')
      :'';
    const data={question:wrap.querySelector('.reading-check-question,.course-question > strong,.special-card > strong,.special-card > h4,.decision > h3,.cat-question-statement,.worked-check-question')?.textContent?.trim()||
      (exercise?.title||'Questão de lógica formal'),
      context,options:optionTexts(),selected:selectedText(),feedback:feedback.textContent.trim()};

    if(feedback.matches('[data-assessment-feedback]')&&courseActive){
      const index=Number(feedback.dataset.assessmentFeedback);
      const draft=courseProgress(courseActive).assessmentV2?.draft;
      const q=draft?.questions?.[index];
      if(q){
        data.question=cleanAssessmentQuestion(q.question);
        data.context=q.dimension==='concept'?'Compreensão conceitual':'Aplicação e interpretação';
        data.options=q.options;
        data.selected=q.options[Number(draft.answers[index])]||'Sem resposta';
        data.correct=q.options[q.correct];
      }
    }else if(feedback.closest('#courseExam')&&finalExamSession?.result){
      const card=feedback.closest('.course-question'),index=[...card.parentElement.children].indexOf(card);
      const q=finalExamSession.questions[index];
      if(q){data.question=q.question;data.context=MODULES.find(m=>m.id===q.id)?.name||'Avaliação final';
        data.options=q.options;data.selected=q.options[Number(finalExamSession.result.answers[index])]||'Sem resposta';data.correct=q.options[q.correct];}
    }else if(feedback.matches('[data-bridge-feedback]')&&courseActive){
      const index=Number(feedback.closest('[data-reading-bridge]').dataset.readingBridge);
      const q=PEDAGOGY_BRIDGES[courseActive]?.bridges[index],chosen=feedback.closest('fieldset').querySelector('input:checked');
      if(q){data.question=q.question;data.options=q.options;data.context=feedback.closest('fieldset').querySelector('.reading-bridge-section')?.textContent||'Questão-ponte';
        data.selected=q.options[Number(chosen?.value)]||'Sem resposta';data.correct=q.options[q.correct];}
    }else if(feedback.matches('[data-reading-feedback]')&&courseActive){
      const q=COURSE_READINGS[courseActive]?.check,chosen=feedback.closest('fieldset').querySelector('input:checked');
      if(q){data.question=q.question;data.options=q.options;data.selected=q.options[Number(chosen?.value)]||'Sem resposta';data.correct=q.options[q.correct];}
    }else if(feedback.matches('[data-worked-feedback]')&&courseActive){
      const q=WORKED_EXAMPLES[courseActive]?.check,chosen=feedback.closest('fieldset').querySelector('input:checked');
      if(q){data.question=q.question;data.options=q.options;data.context=WORKED_EXAMPLES[courseActive].context;
        data.selected=q.options[Number(chosen?.value)]||'Sem resposta';data.correct=q.options[q.correct];}
    }else if(feedback.closest('#specialArea')&&exercise?.special){
      const cards=[...feedback.closest('#specialArea').querySelectorAll('.special-card')],card=feedback.closest('.special-card');
      const index=cards.indexOf(card),special=exercise.special;
      if(index>=0){
        if(special.questions?.[index]?.question){const q=special.questions[index];
          data.question=q.question;data.options=q.options||data.options;data.selected=q.options?.[Number(special.values[index])]||data.selected;
          data.correct=q.options?.[q.correct]||data.correct;}
        else if(special.parts?.[index]){const q=special.parts[index];
          data.question=q.question;data.options=q.options;data.selected=q.options[Number(special.values[index])]||data.selected;data.correct=q.options[q.correct];}
        else if(special.items?.[index]){const q=special.items[index];
          data.question=q.formula||q.question||data.question;data.options=q.options||['V','F'];data.selected=special.values[index]||'Sem resposta';data.correct=q.value;}
        else if(special.steps?.[index]){data.question=card?.querySelector('strong')?.textContent+' — Fórmula e regra de inferência';
          data.context=[data.context,card?.querySelector('.special-line')?.textContent].filter(Boolean).join(' — ');}
        data.context=[exercise.title,exercise.instruction,special.scope||special.context||'',data.context].filter(Boolean).join(' — ');
      }
    }else if(feedback.closest('#workView')&&exercise){
      if(feedback.closest('#feedbackArea')){
        const ex=exercise;
        data.question=ex.title+' — '+ex.instruction;
        data.options=ex.choice?.options||[];
        data.selected=[ex.choice?.question&&('Escolha: '+ex.choice.question+' = '+(ex.picked||'não marcada')),
          ...Object.entries(ex.answers||{}).map(([key,value])=>key+' = '+value),
          ex.translation?.values?.join(' | '),ex.cat?.values?.join(' | ')].filter(Boolean).join('; ');
        data.correct=[ex.choice?.correct?'Escolha correta: '+ex.choice.correct:'',ex.resolution].filter(Boolean).join(' — ');
        const table=ex.envs?.flatMap((_,row)=>ex.cols?.filter(col=>col.editable).map(col=>col.label+' na linha '+(row+1)+': '+(ex.answers?.[row+'-'+ex.cols.indexOf(col)]||'não respondida'))||[])||[];
        data.context=[data.context,ex.choice?.question,'Respostas da tabela: '+table.join('; ')].filter(Boolean).join(' — ');
      }else if(feedback.closest('#decisionArea')&&exercise.choice){
        data.question=exercise.choice.question;data.options=exercise.choice.options;
        data.selected=exercise.picked||'Sem resposta';data.correct=exercise.choice.correct;
      }
    }
    return data;
  }
  function syncExplanationLinks(){
    const selector=[
      '#courseLesson [data-bridge-feedback][data-result]',
      '#courseLesson [data-reading-feedback][data-result]',
      '#courseLesson [data-worked-feedback][data-result]',
      '#courseLesson [data-square-feedback][data-result]',
      '#courseLesson [data-assessment-feedback]',
      '#courseExam .course-question-explanation',
      '#specialArea .course-question-explanation',
      '#specialArea .correct-label','#specialArea .incorrect-label',
      '#decisionArea .explanation','#feedbackArea .result-box',
      '#translationArea .translation-feedback','#categoricalArea .translation-feedback',
      '#categoricalModelWorkbench .cat-feedback'
    ].join(',');
    for(const node of document.querySelectorAll(selector)){
      const text=node.textContent.trim();
      if(!text||node.closest('[hidden]'))continue;
      const data=explanationData(node);
      let link=node.nextElementSibling;
      if(!link?.matches('a.chatgpt-explain-link')){
        link=document.createElement('a');
        link.className='button small chatgpt-explain-link';
        link.textContent='Explicar no ChatGPT ↗';
        link.target='_blank';link.rel='noopener noreferrer';
        link.setAttribute('aria-label','Explicar esta resposta no ChatGPT em nova aba');
        node.insertAdjacentElement('afterend',link);
      }
      link.href=explanationChatGPTUrl(data);
    }
  }
  function renderLessonAssessment(id,progress,forceOpen=false){
    const questions=assessmentForLesson(id),draft=progress.assessmentV2.draft;
    const graded=draft.result,answers=draft.answers||{};
    const items=questions.map((q,i)=>{
      const selected=answers[i]===undefined?null:Number(answers[i]),correct=selected===q.correct;
      const options=q.options.map((option,j)=>`<label class="course-option">
        <input type="radio" name="courseq-${i}" value="${j}" ${selected===j?'checked':''} ${graded?'disabled':''}>
        <span>${escapeHTML(option)}</span></label>`).join('');
      const explanation=graded?`<div class="course-question-feedback ${correct?'correct':'incorrect'}" data-assessment-feedback="${i}" data-result="${correct?'correct':'incorrect'}">
        <strong>${correct?'✓ Resposta correta.':'Resposta a rever.'}</strong>
        ${correct?'':`<p><strong>Resposta esperada:</strong> ${escapeHTML(q.options[q.correct])}</p>`}
        <p>${escapeHTML(q.why)}</p></div>`:'';
      return `<div class="course-question" data-assessment-question="${i}">
        <strong>${i+1}. ${escapeHTML(cleanAssessmentQuestion(q.question))}</strong>
        <small>${q.dimension==='concept'?'Compreensão conceitual':'Aplicação e interpretação'}</small>
        ${options}${explanation}</div>`;
    }).join('');
    const score=graded?`<div class="course-course-result ${graded.passed?'':'warn'}" tabindex="-1" role="status" data-assessment-score>
      <strong>${graded.overall}/5 de acertos.</strong>
    </div>`:'';
    return `${stagePanelStart(5,'Aprovar a avaliação inicial',progress.mastered,forceOpen)}
      ${progress.mastered&&!progress.assessmentV2?.last?.passed?'<p>Sua aprovação anterior foi preservada; a nova aferição conceitual é independente.</p>':''}
      <div class="course-assessment">${items}</div>
      ${score}
      <div class="course-lesson-actions"><button type="button" class="button primary"
        data-caction="${graded?'lesson-retry':'lesson-quiz'}">${graded?'Tente outra vez':'Corrigir avaliação'}</button></div>
    ${stagePanelEnd(progress.mastered)}`;
  }
  function renderCourseLesson(forceOpenStage=null){const id=courseActive,lesson=LESSONS[id],m=MODULES.find(m=>m.id===id),p=courseProgress(id);if(!lesson)return;
    const stages=[
      {label:'1. Compreender',done:p.read,available:true},
      {label:'2. Observar',done:p.example,available:p.read},
      {label:'3. Praticar com ajuda',done:p.guided,available:p.example},
      {label:'4. Resolver sozinho',done:p.independent,available:p.guided},
      {label:'5. Aprovar avaliação inicial',done:p.mastered,available:p.independent}
    ];
    if(p.mastered)stages.push({label:'6. Consolidar com revisões espaçadas',done:reviewStatus(p).consolidated,available:true});
    const lockIcon='<svg class="course-stage-lock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="4" y="11" width="16" height="10" rx="2"></rect><path d="M8 11V7a4 4 0 0 1 8 0v4"></path></svg>';
    const stageNavigation=stages.map((stage,i)=>stage.available
      ?`<button type="button" class="course-stage ${stage.done?'done':''}" data-caction="stage" data-stage="${i+1}" aria-label="${stage.done?'Revisar':'Ir para'} ${escapeHTML(stage.label)}${stage.done?' (concluída)':''}">${stage.done?'✓ ':''}${escapeHTML(stage.label)}</button>`
      :`<span class="course-stage locked" aria-label="${escapeHTML(stage.label)} — indisponível" title="Conclua a etapa anterior para desbloquear">${lockIcon}${escapeHTML(stage.label)}</span>`).join('');
    let html=`<div class="course-lesson-head"><span class="eyebrow">MÓDULO ${m.no} · ${m.level}</span><h2>${escapeHTML(m.name)}</h2><p>${escapeHTML(lesson.lead)}</p><nav class="course-lesson-flow" aria-label="Etapas da aula">${stageNavigation}</nav><button type="button" class="button small" data-caction="map">← Mapa das unidades</button> <button type="button" class="button small" data-caction="practice-free">Prática livre deste tema</button></div>`;
    const reading=COURSE_READINGS[id];
    html+=`${stagePanelStart(1,'Compreender',p.read)}${reading?renderPedagogicalReading(reading,id):`<p>${escapeHTML(lesson.theory)}</p>`}${id==='categoricos2'?renderOppositionSquare():''}<div class="course-lesson-actions"><button type="button" class="button ${p.read?'':'primary'}" data-caction="read">${p.read?'✓ Leitura registrada · rever exemplo':'Li a explicação · continuar para o exemplo →'}</button></div>${stagePanelEnd(p.read)}`;
    if(p.read){html+=`${stagePanelStart(2,'Observar um exemplo resolvido',p.example)}${renderWorkedExample(id,p)}${stagePanelEnd(p.example)}`}
    if(p.example&&THEORY_CARDS[id]&&id!=='metateoria'){html+=`<details class="course-lesson-panel course-optional-study"><summary><h3>Para ir além: teoremas e demonstrações</h3></summary><div class="course-stage-content">${THEORY_CARDS[id].map((t,i)=>`<details class="advanced-theorem"><summary>${escapeHTML(t.title)} · <code>${escapeHTML(t.statement)}</code></summary><p><strong>Hipóteses:</strong> ${escapeHTML(t.hypothesis)}</p><ol>${t.proof.map(x=>`<li>${escapeHTML(x)}</li>`).join('')}</ol><small><strong>Alcance e limites:</strong> ${escapeHTML(t.scope)}</small></details>`).join('')}</div></details>`;}
    if(p.example){html+=`${stagePanelStart(3,'Praticar com ajuda',p.guided)}${renderTransferPrep(id)}<div class="course-lesson-actions"><button type="button" class="button ${p.guided?'':'primary'}" data-caction="guided">${p.guided?'✓ Prática assistida concluída · praticar novamente':'Abrir exercício assistido →'}</button></div>${stagePanelEnd(p.guided)}`}
    if(p.guided){html+=`${stagePanelStart(4,'Resolver com autonomia',p.independent)}<div class="course-lesson-actions"><button type="button" class="button ${p.independent?'':'primary'}" data-caction="independent">${p.independent?'✓ Independência demonstrada · praticar novamente':'Tentar exercício independente →'}</button></div>${stagePanelEnd(p.independent)}`}
    if(p.independent)html+=renderLessonAssessment(id,p,forceOpenStage===5);
    if(p.mastered){
      const state=reviewStatus(p);
      html+=stagePanelStart(6,'Consolidar com revisões espaçadas',state.status==='consolidated',false,'course-review-panel');
      if(state.status==='consolidated')html+='<p class="review-good"><strong>Domínio consolidado.</strong> Duas revisões espaçadas concluídas com autonomia.</p>';
      else if(state.status==='due')html+=`<p><strong>Revisão ${state.completed+1} de 2 disponível.</strong> </p><div class="course-lesson-actions"><button type="button" class="button primary" data-caction="review">Fazer revisão independente →</button></div>`;
      else html+=`<p><strong>Revisão ${state.completed+1} de 2 disponível a partir de ${formatReviewDate(state.dueAt)}.</strong></p>`;
      html+=stagePanelEnd(state.status==='consolidated');
    }
    $('courseLesson').innerHTML=html;
    if(id==='categoricos2')updateSquareLab($('courseLesson').querySelector('[data-square-lab]'));
    syncExplanationLinks();
  }
  function beginCourseExercise(id,stage){
    if(stage==='review'&&reviewStatus(courseProgress(id)).status!=='due'){toast('Esta revisão ainda não está disponível. Consulte o calendário do tema.');return}
    if(hasPendingWork(savedDrafts[id]?.exercise)&&!confirm('Este tema possui um exercício salvo. Iniciar a etapa do curso criará um novo desafio. Deseja continuar?'))return;
    courseAttempt={id,stage,hintUsed:false,recorded:false,reviewPassed:false};level=stage==='guided'?'easy':stage==='review'?'hard':'medium';
    openMode(id,true,true);renderCourseExerciseBanner();
  }
  function renderCourseExerciseBanner(){
    const banner=$('courseExerciseBanner');
    if(!courseAttempt){banner.classList.add('hide');return}
    banner.classList.remove('hide');
    const stage=courseAttempt.stage,isReview=stage==='review',
      independent=stage==='independent'||isReview,used=independent&&courseAttempt.hintUsed;
    const instructions=independent
      ?used?'Você consultou uma dica. Use esta tentativa para praticar.'
        :isReview?'Resolva o exercício de revisão sem dicas.'
        :'Resolva o exercício por conta própria.'
      :'Use os passos abaixo para orientar sua resolução.';
    const guide=practiceTransferGuide(courseAttempt.id,COURSE_READINGS,PEDAGOGY_BRIDGES,WORKED_EXAMPLES,stage);
    const transfer=guide?`<section class="practice-transfer-banner" aria-label="Como aplicar a explicação a este exercício">
      <h3>Como começar este exercício</h3>

      ${renderTransferSteps(guide)}
      ${renderWorkedReminder(guide)}
    </section>`:'';
    banner.innerHTML=`<strong>Curso Guiado · ${used?'Treino com ajuda':isReview?'Revisão independente':independent?'Prática independente':'Prática com ajuda'}</strong><div>${instructions}</div>${transfer}<button type="button" class="button small" data-course-back="1">← Voltar à aula</button>`;
  }
  function recordGuidedAttempt(){
    if(!courseAttempt||courseAttempt.recorded||!exercise?.grade||exercise.mode!==courseAttempt.id)return;
    courseAttempt.recorded=true;
    const progress=courseProgress(courseAttempt.id),grade=exercise.firstGrade||exercise.grade;
    const decision=attemptDecision(courseAttempt.stage,grade,courseAttempt.hintUsed);
    if(courseAttempt.stage==='review'){
      const result=recordReview(progress,{correct:grade.correct,total:grade.total,missing:grade.missing,usedHint:courseAttempt.hintUsed});
      courseAttempt.reviewPassed=!!result.passed;
      courseAttempt.passed=!!result.passed;
      courseAttempt.decisionReason=result.passed
        ?result.state.consolidated?'Domínio consolidado após duas revisões espaçadas.':'Revisão aprovada na primeira correção; a próxima será liberada na data indicada no curso.'
        :decision.reason;
      saveCourseState();
      toast(result.passed?'Revisão registrada. Consulte sua próxima etapa no curso.':'Revisão não validada. Faça outro exercício sem dicas.');
      return;
    }
    const didPass=decision.passed;
    courseAttempt.passed=didPass;
    courseAttempt.decisionReason=decision.reason;
    if(courseAttempt.stage==='guided'&&didPass)progress.guided=true;
    else if(courseAttempt.stage==='independent'&&didPass)progress.independent=true;
    saveCourseState();
    toast(didPass?'Etapa validada na primeira correção. Volte à aula para avançar.':decision.reason);
  }
  $('courseLesson').addEventListener('change',e=>{
    if(!courseActive||!e.target.matches('input[type="radio"][name^="courseq-"]'))return;
    const p=courseProgress(courseActive),a=p.assessmentV2;
    if(!a?.draft||a.draft.result)return;
    a.draft.answers=a.draft.answers||{};
    const index=Number(e.target.name.slice('courseq-'.length));
    if(Number.isInteger(index)&&index>=0&&index<5)a.draft.answers[index]=e.target.value;
    saveCourseState();
  });
  function courseClick(e){const btn=e.target.closest('[data-caction]');if(!btn)return;const action=btn.dataset.caction,id=btn.dataset.id;
    if(action==='stage'){
      const stage=Number(btn.dataset.stage);
      if(!Number.isInteger(stage)||stage<1||stage>6)return;
      const panel=$('courseLesson').querySelector('#course-stage-'+stage);
      if(!panel)return;
      if(panel.tagName==='DETAILS')panel.open=true;
      panel.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
      panel.querySelector('h3')?.focus({preventScroll:true});
      return;
    }
    if(action==='map'){openCourse(true);return}if(action==='lesson'){openCourse(true,id);return}if(action==='practice-free'){
      const previous=savedDrafts[courseActive];
      if(previous?.courseAttempt&&hasPendingWork(previous.exercise)&&!confirm('Esta aula possui uma tentativa guiada salva. Iniciar a prática livre substituirá essa tentativa. Deseja continuar?'))return;
      courseAttempt=null;openMode(courseActive,true,!!previous?.courseAttempt);return
    }
    if(action==='square-check'){const lab=$('courseLesson').querySelector('[data-square-lab]');if(lab)checkSquareLab(lab);return}
    if(action==='bridge-check'||action==='bridge-hint'){
      const group=btn.closest('[data-reading-bridge]');
      const index=Number(group?.dataset.readingBridge),bridge=PEDAGOGY_BRIDGES[courseActive]?.bridges[index];
      if(!group||!bridge)return;
      if(action==='bridge-hint'){
        const hint=group.querySelector('[data-bridge-hint]'),expanded=hint.hidden;
        hint.hidden=!expanded;btn.setAttribute('aria-expanded',String(expanded));
        btn.textContent=expanded?'Ocultar pista':'Mostrar uma pista';return;
      }
      const selected=group.querySelector('input[name="reading-bridge-'+index+'"]:checked');
      const feedback=group.querySelector('[data-bridge-feedback]');
      if(!selected){feedback.textContent='Selecione uma alternativa para conferir sua decisão.';return}
      const option=Number(selected.value),correct=option===bridge.correct;
      feedback.textContent=(correct?'Você identificou o caminho. ':'Revise esta decisão. ')+bridge.feedback[option]+
        (correct?' '+bridge.explanation:' Você pode tentar novamente ou abrir a pista.');
      feedback.dataset.result=correct?'correct':'retry';return;
    }
    if(action==='reading-check'){
      const reading=COURSE_READINGS[courseActive],group=$('courseLesson').querySelector('[data-reading-check]');
      if(!reading||!group)return;
      const selected=group.querySelector('input[name="reading-check"]:checked');
      const feedback=group.querySelector('[data-reading-feedback]');
      if(!selected){feedback.textContent='Selecione uma alternativa para conferir sua compreensão.';return}
      const correct=Number(selected.value)===reading.check.correct;
      feedback.textContent=(correct?'Isso mesmo! ':'Ainda não. ')+reading.check.why+(correct?' Quando estiver pronto, continue para o exemplo resolvido.':' Releia a explicação e tente novamente.');
      feedback.dataset.result=correct?'correct':'retry';
      return;
    }
    if(action==='read'){courseProgress(courseActive).read=true;saveCourseState();renderCourseLesson();$('courseLesson').querySelector('[data-caction="worked-next"]:not([hidden]),[data-caction="example"]')?.focus({preventScroll:true});return}
    if(action==='worked-next'){
      const next=Number(btn.dataset.next),shown=courseProgress(courseActive).workedStep||1;
      if(Number.isInteger(next)&&next===shown+1)setWorkedStep(next);
      return;
    }
    if(action==='worked-show-all'){setWorkedStep(WORKED_EXAMPLES[courseActive].steps.length);return}
    if(action==='worked-restart'){setWorkedStep(1);return}
    if(action==='worked-check'){
      const root=$('courseLesson').querySelector('[data-worked-example]');
      const selected=root?.querySelector('input[name^="worked-check-"]:checked'),feedback=root?.querySelector('[data-worked-feedback]');
      if(!feedback)return;
      if(!selected){feedback.textContent='Escolha uma alternativa para conferir o raciocínio.';return}
      const check=WORKED_EXAMPLES[courseActive].check,correct=Number(selected.value)===check.correct;
      feedback.textContent=(correct?'Correto. ':'Ainda não. ')+check.why+
        (correct?' Você pode continuar para a prática.':' Releia os passos e tente novamente.');
      feedback.dataset.result=correct?'correct':'retry';return;
    }
    if(action==='example'){
      if((courseProgress(courseActive).workedStep||1)<WORKED_EXAMPLES[courseActive].steps.length){
        setWorkedStep(WORKED_EXAMPLES[courseActive].steps.length);return;
      }
      courseProgress(courseActive).example=true;saveCourseState();renderCourseLesson();$('courseLesson').querySelector('[data-caction="guided"]')?.focus({preventScroll:true});return
    }
    if(action==='guided'||action==='independent'||action==='review'){beginCourseExercise(courseActive,action);return}
    if(action==='lesson-quiz'){
      const questions=assessmentForLesson(courseActive),p=courseProgress(courseActive),a=p.assessmentV2;
      if(a.draft.result)return;
      const answers=questions.map((_,i)=>$('courseLesson').querySelector(`input[name="courseq-${i}"]:checked`)?.value);
      if(answers.some(x=>x===undefined)){toast('Responda às cinco perguntas antes de corrigir.');return}
      const result=gradeAssessment(questions,answers);
      if(!recordAssessmentAttempt(a,result,answers))return;
      p.best=Math.max(p.best,result.overall/5);
      if(result.passed){p.mastered=true;beginReviewTracking(p)}
      saveCourseState();renderCourseLesson(5);
      const score=$('courseLesson').querySelector('[data-assessment-score]');
      score?.focus({preventScroll:true});
      score?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'nearest'});
      return;
    }
    if(action==='lesson-retry'){
      const p=courseProgress(courseActive),a=p.assessmentV2;
      if(!a?.draft?.result)return;
      const bank=prepareBank(courseActive,LESSONS[courseActive],COURSE_READINGS[courseActive],EXTENDED_ASSESSMENTS[courseActive]||[]);
      if(!beginAssessmentRetry(a,composeAssessment(bank,a.history)))return;
      saveCourseState();renderCourseLesson();
      $('courseLesson').querySelector('#course-stage-5 h3')?.focus({preventScroll:true});
      return;
    }
    if(action==='exam-open'){openFinalExam();return}
    if(action==='exam-submit'){gradeFinalExam();return}
    if(action==='exam-new'){openFinalExam(true,true);return}
  }
  $('workView').addEventListener('click',e=>{if(e.target.closest('[data-course-back]'))openCourse(true,courseAttempt?.id)});
  function saveExamDraft(){
    if(!finalExamSession)return;
    try{
      localStorage.setItem(EXAM_DRAFT_KEY,JSON.stringify({...finalExamSession,version:DRAFT_VERSION,updatedAt:Date.now()}));
    }catch{toast('Armazenamento cheio ou indisponível: a avaliação pode se perder ao sair.')}
  }
  function openFinalExam(updateHash=true,fresh=false){
    courseActive=null;renderCourse();
    $('courseMap').classList.add('hide');
    $('courseLesson').classList.add('hide');
    $('courseExam').classList.remove('hide');
    if(fresh)finalExamSession=null;
    finalExamSession=finalExamSession||savedExam();
    if(!finalExamSession){
      const questions=buildIntegratedExamQuestions(COURSE_UNITS,LESSONS,pick);
      finalExamSession={questions:shuffle(questions),answers:Array(12).fill(null),result:null};
    }
    if(updateHash)setRouteHash('avaliacao-final');
    saveExamDraft();renderFinalExam();
  }
  function renderFinalExam(){
    updateCourseContext('exam');
    const ses=finalExamSession;
    let html=`<section class="course-lesson-head"><span class="eyebrow">AVALIAÇÃO INTEGRADA</span><h2>Oito áreas de estudo · 12 desafios</h2><p>Doze questões das oito unidades: seis competências centrais de evidências e argumentação são preservadas; todas as outras unidades são contempladas, e duas questões vêm de aulas diferentes de Erros Lógicos Comuns. <strong>Critério de aprovação: 10 de 12 acertos.</strong> A aprovação da prova integrada não substitui as revisões espaçadas dos temas.</p><button type="button" class="button small" data-caction="map" style="margin-top:12px">← Mapa das unidades</button></section>`;
    html+=`<section class="course-lesson-panel"><div class="course-assessment">${ses.questions.map((q,i)=>`<div class="course-question"><small>${escapeHTML(MODULES.find(m=>m.id===q.id).name)}</small><strong>${i+1}. ${escapeHTML(q.question)}</strong>${q.options.map((a,j)=>`<label class="course-option"><input type="radio" name="finalq-${i}" value="${j}" ${(ses.result?.answers?.[i]??ses.answers?.[i])===String(j)?'checked':''} ${ses.result?'disabled':''}><span>${escapeHTML(a)}</span></label>`).join('')}${ses.result?`<div class="course-question-explanation">${ses.result.answers[i]===String(q.correct)?'✓ Correto.':'Revisar.'} ${escapeHTML(q.why)}</div>`:''}</div>`).join('')}</div>`;
    if(ses.result){
      const weak=examWeakAreas(ses.questions,ses.result.answers),approved=ses.result.score>=10;
      html+=`<div class="course-course-result ${approved?'':'warn'}" role="status" tabindex="-1"><strong>${ses.result.score} de 12 acertos (${Math.round(100*ses.result.score/12)}%) · ${approved?'Avaliação integrada aprovada':'Avaliação integrada pendente'}.</strong><p>${approved?'Você demonstrou bom desempenho na prova. Continue as revisões espaçadas para consolidar os temas.':'Revise os temas abaixo e tente novamente. A aprovação exige 10 acertos.'}</p></div>`;
      if(weak.length){
        html+='<div class="exam-study-plan"><h3>O que estudar a seguir</h3><p>Estes temas tiveram respostas incorretas. Abra a aula para rever a teoria e praticar antes de refazer a prova.</p><div class="exam-study-links">';
        html+=weak.map(item=>`<button class="button" type="button" data-caction="lesson" data-id="${escapeHTML(item.id)}">${escapeHTML(MODULES.find(m=>m.id===item.id)?.name||'Tema')} · ${item.misses} ${item.misses===1?'erro':'erros'} →</button>`).join('');
        html+='</div></div>';
      }else html+='<p class="exam-all-correct">Todas as questões foram respondidas corretamente. Mantenha a prática e acompanhe suas revisões.</p>';
      html+='<div class="course-lesson-actions"><button type="button" class="button primary" data-caction="exam-new">Nova avaliação ↻</button><button type="button" class="button" data-caction="map">Ver progresso e revisões →</button></div>';
    }else html+='<div class="course-lesson-actions"><button type="button" class="button primary" data-caction="exam-submit">Corrigir avaliação final</button></div>';
    html+='</section>';
    $('courseExam').innerHTML=html;
    syncExplanationLinks();
  }
  function gradeFinalExam(){const ses=finalExamSession,answers=ses.questions.map((_,i)=>$('courseExam').querySelector(`input[name="finalq-${i}"]:checked`)?.value);if(answers.some(x=>x===undefined)){toast('Responda às 12 questões antes de corrigir.');return}const score=ses.questions.reduce((acc,q,i)=>acc+(answers[i]===String(q.correct)?1:0),0);ses.result={answers,score};ses.answers=answers;saveExamDraft();courseState.final.attempts=(courseState.final.attempts||0)+1;courseState.final.best=Math.max(courseState.final.best||0,score);saveCourseState();renderFinalExam();$('courseExam').querySelector('.course-course-result')?.focus({preventScroll:true});}

  // Feedback gerado por etapas interativas (corretas ou incorretas) também ganha ajuda.
  document.addEventListener('click',syncExplanationLinks);
  document.addEventListener('change',syncExplanationLinks);
  $('courseExam').addEventListener('change',e=>{
    if(!finalExamSession||finalExamSession.result||!e.target.matches('input[type="radio"][name^="finalq-"]'))return;
    const index=Number(e.target.name.slice(7));
    if(!Number.isInteger(index)||index<0||index>=12)return;
    finalExamSession.answers[index]=e.target.value;
    saveExamDraft();
  });
  // Os outros modos (incluindo prova, Venn e tradução) editam exercise em handlers próprios.
  // Salvamos depois desses handlers, preservando o enunciado e os dados já preenchidos.
  for(const name of ['input','change','click','keydown']){
    document.addEventListener(name,()=>saveExerciseDraft());
  }
  addEventListener('pagehide',()=>{saveExerciseDraft();saveExamDraft()});
  $('feedbackNextActions').addEventListener('click',e=>{const b=e.target.closest('[data-feedback-action]');if(!b)return;if(b.dataset.feedbackAction==='course')openCourse(true,courseAttempt?.id);else nextExercise()});
  $('continueButton').addEventListener('click',resumeLearning);
  $('nextLessonButton').addEventListener('click',openRecommendedLesson);
  $('heroNextStepButton').addEventListener('click',openRecommendedLesson);
  $('heroStartButton').addEventListener('click',()=>openCourse());
  $('heroPracticeButton').addEventListener('click',()=>{const section=$('practiceSection');section.scrollIntoView({behavior:'smooth',block:'start'});section.focus({preventScroll:true})});
  $('topFreeTable').addEventListener('click',()=>openFreeTable());$('freeHomeBack').addEventListener('click',()=>goHome());
  $('topCourse').addEventListener('click',()=>openCourse());$('startCourseButton').addEventListener('click',()=>openCourse());$('courseHomeBack').addEventListener('click',()=>goHome());$('courseMapButton').addEventListener('click',()=>openCourse());$('courseMap').addEventListener('click',courseClick);$('courseLesson').addEventListener('click',courseClick);$('courseLesson').addEventListener('change',e=>{if(e.target.matches('[data-square-mode],[data-square-given]'))updateSquareLab(e.target.closest('[data-square-lab]'));});$('courseExam').addEventListener('click',courseClick);
  function syncRouteFromLocation(){
    const route=routeFromHash(location.hash,MODULES.map(m=>m.id),Object.keys(LESSONS));
    if(route.view==='free-table'){
      if($('freeTableView').classList.contains('hide'))openFreeTable(false);
    }else if(route.view==='exam'){
      if($('courseExam').classList.contains('hide')){openCourse(false);openFinalExam(false)}
    }else if(route.view==='course'){
      if($('courseView').classList.contains('hide')||courseActive!==route.id)openCourse(false,route.id);
    }else if(route.view==='work'){
      if($('workView').classList.contains('hide')||mode!==route.id)openMode(route.id,false);
    }else if($('homeView').classList.contains('hide'))goHome(false);
  }
  initTheme();renderHome();syncRouteFromLocation();
  addEventListener('popstate',syncRouteFromLocation);
  addEventListener('hashchange',syncRouteFromLocation);
})();
