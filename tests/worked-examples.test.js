import test from 'node:test';
import assert from 'node:assert/strict';
import {COURSE_UNITS,LESSONS} from '../src/content/course.js';
import {WORKED_EXAMPLES} from '../src/content/example-walkthroughs.js';
import {parseFormula} from '../src/core/parser.js';
import {truthRows,evalAst} from '../src/core/logic.js';

const lessonIds=COURSE_UNITS.flatMap(unit=>unit.ids);

test('todas as 49 aulas têm exemplo resolvido em três passos concretos',()=>{
  assert.equal(lessonIds.length,49);
  assert.deepEqual(new Set(Object.keys(WORKED_EXAMPLES)),new Set(lessonIds));
  for(const id of lessonIds){
    const ex=WORKED_EXAMPLES[id];
    assert.ok(LESSONS[id],id);
    assert.ok(ex.context.length>=25,id+': contexto ausente');
    assert.equal(ex.steps.length,3,id+': passos incompletos');
    for(const [i,step] of ex.steps.entries()){
      assert.ok(step.formal.length>=9,id+': passo '+i+' sem operação ou conclusão');
      assert.ok(step.concrete.length>=25,id+': passo '+i+' sem situação concreta desenvolvida');
      assert.ok(step.reason.length>=25,id+': passo '+i+' sem justificativa suficiente');
      assert.ok(!/\\(equiv\\)|<br|<script/i.test(step.formal+step.concrete),id+': sintaxe não suportada');
    }
    assert.ok(ex.check.question.length>28,id+': pergunta ausente');
    assert.equal(ex.check.options.length,3,id+': espera 3 alternativas');
    assert.equal(new Set(ex.check.options).size,3,id+': alternativas duplicadas');
    assert.ok(Number.isInteger(ex.check.correct)&&ex.check.correct>=0&&ex.check.correct<3,id);
    assert.ok(ex.check.why.length>=35,id+': feedback insuficiente');
  }
});

test('os exemplos preservam o sentido lógico das equivalências e da classificação',()=>{
  const rows=truthRows(['p','q']);
  for(const [a,b] of [['p→q','¬p∨q'],['p→q','¬(p∧¬q)']]){
    const aa=parseFormula(a,['p','q']),bb=parseFormula(b,['p','q']);
    assert.ok(rows.every(row=>evalAst(aa,row)===evalAst(bb,row)),a+' e '+b+' não são equivalentes');
  }
  for(const formula of ['p↔p','p∨¬p','¬(p∧¬p)']){
    const ast=parseFormula(formula,['p','q']);
    assert.ok(rows.every(row=>evalAst(ast,row)===true),formula);
  }
  const contradictory=parseFormula('p∧¬p',['p','q']);
  assert.ok(rows.every(row=>evalAst(contradictory,row)===false));
});

test('o roteiro ensina contextos específicos em vez de apenas traduzir nomes das operações',()=>{
  for(const [id,keywords] of [
    ['equivalencias',['Comi o prato','comi','gostei']],
    ['classificacao',['porta','tautologia']],
    ['provas',['alarme','contradição','hipótese']],
    ['categoricos',['filósofos','Venn']],
    ['arvores',['arquivo','ramo']],
    ['probabilidade',['107','7,5%']],
    ['modais',['biblioteca','mundo']]]){
    const text=JSON.stringify(WORKED_EXAMPLES[id]).toLowerCase();
    for(const word of keywords)assert.ok(text.includes(word.toLowerCase()),id+': falta '+word);
  }
});
