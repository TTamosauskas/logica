import test from 'node:test';
import assert from 'node:assert/strict';
import {truthRows} from '../src/core/logic.js';
import {truthRegionData,renderTruthVenn,renderPredicateVenn} from '../src/truth-venn.js';

test('cada região proposicional aponta para a linha correta da tabela',()=>{
  const rows=truthRows(['p','q']);
  const region=truthRegionData({variables:['p','q'],rows,
    getAnswer:i=>['V','','','F'][i],getExpected:()=>{throw Error('gabarito consultado cedo')}});
  assert.deepEqual(region.map(item=>item.rowIndex),[3,2,1,0]);
  assert.deepEqual(region.map(item=>item.answer),['F','','','V']);
  assert.deepEqual(region.map(item=>item.expected),['','','','']);
  assert.deepEqual(region.map(item=>item.label),['¬p ∧ ¬q','¬p ∧ q','p ∧ ¬q','p ∧ q']);
});

test('antes da correção, o Venn espelha V/F e não consulta nem mostra a solução',()=>{
  const html=renderTruthVenn({
    variables:['p','q'],rows:truthRows(['p','q']),
    columns:[{key:'imp',label:'p → q',derived:true}],
    getAnswer:i=>i===0?'V':i===1?'F':'',
    getExpected:()=>{throw Error('Nunca consultar o gabarito antes de conferir')},
    checked:false
  });
  assert.match(html,/Suas respostas/);
  assert.match(html,/pendente/);
  assert.match(html,/somente depois de Conferir respostas/);
  assert.doesNotMatch(html,/Solução correta/);
  assert.doesNotMatch(html,/Gabarito após correção/);
});

test('depois de conferir, exibe o gabarito e compara as divergências',()=>{
  const html=renderTruthVenn({
    variables:['p','q'],rows:truthRows(['p','q']),
    columns:[{key:'imp',label:'p → q',derived:true}],
    getAnswer:i=>['V','V','F','V'][i],
    getExpected:i=>['V','F','V','V'][i],
    checked:true
  });
  assert.match(html,/Solução correta/);
  assert.match(html,/2 região\(ões\) divergente\(s\)/);
  assert.match(html,/revisar/);
});

test('filtros para mais de três variáveis selecionam recortes distintos',()=>{
  const vars=['p','q','r','s'],rows=truthRows(vars);
  const read=i=>i%2===0?'V':'F';
  const regionV=truthRegionData({variables:vars,rows,filters:{s:'V'},getAnswer:read});
  const regionF=truthRegionData({variables:vars,rows,filters:{s:'F'},getAnswer:read});
  assert.equal(regionV.length,8);
  assert.equal(regionF.length,8);
  assert.notDeepEqual(regionV.map(r=>r.rowIndex),regionF.map(r=>r.rowIndex));
  assert.ok(regionV.every(r=>rows[r.rowIndex].s===true));
  assert.ok(regionF.every(r=>rows[r.rowIndex].s===false));
});

test('modo de predicados representa indivíduos sem fingir conhecer entradas incompletas',()=>{
  const html=renderPredicateVenn({
    variables:['p','q'],people:[{id:'a',label:'Ana'},{id:'b',label:'Bia'}],
    predicateValues:{'a|p':'V','a|q':'F','b|p':'V'}
  });
  assert.match(html,/Indivíduos cadastrados/);
  assert.match(html,/Ana/);
  assert.match(html,/1 indivíduo\(s\) ainda com predicados indefinidos/);
  assert.doesNotMatch(html,/Solução correta/);
  assert.match(html,/Os números indicam pessoas, não V\/F das fórmulas/);
});

test('rótulos dos indivíduos não inserem marcação HTML no diagrama',()=>{
  const html=renderPredicateVenn({
    variables:['p'],people:[{id:'x',label:'<script>atacar</script>'}],
    predicateValues:{'x|p':'V'}
  });
  assert.doesNotMatch(html,/<script>/);
  assert.match(html,/&lt;script&gt;/);
});

test('legenda mostra significados básicos uma vez, sem repetir fórmulas das regiões',()=>{
  const rows=truthRows(['p','q']);
  for(const checked of [false,true]){
    const html=renderTruthVenn({
      variables:['p','q'],variableMeanings:{p:'a luz acendeu',q:'a porta está aberta'},
      rows,columns:[{key:'f',label:'p → q',derived:true}],
      getAnswer:()=> 'V',getExpected:()=> 'V',checked
    });
    assert.equal((html.match(/class="truth-venn-legend"/g)||[]).length,1);
    assert.match(html,/Significado das variáveis/);
    assert.match(html,/<code>p<\/code><\/dt><dd>a luz acendeu<\/dd>/);
    assert.match(html,/<code>q<\/code><\/dt><dd>a porta está aberta<\/dd>/);
    assert.doesNotMatch(html,/class="truth-venn-regions"/);
    assert.doesNotMatch(html,/<code>¬p ∧ q<\/code>/);
  }
});

test('legenda inclui variáveis filtradas e indica significados ausentes',()=>{
  const vars=['p','q','r','s'];
  const html=renderTruthVenn({
    variables:vars,rows:truthRows(vars),
    variableMeanings:{p:'chove',s:'faz frio'},
    columns:[{key:'f',label:'p',derived:true}],getAnswer:()=> ''
  });
  assert.match(html,/<code>s<\/code><\/dt><dd>faz frio<\/dd>/);
  assert.match(html,/<code>q<\/code><\/dt><dd>Significado não informado neste exercício\.<\/dd>/);
});

test('legenda de predicados usa os significados cadastrados pelo usuário',()=>{
  const html=renderPredicateVenn({
    variables:['p','q'],variableMeanings:{p:'x é aluno',q:'x está presente'},
    people:[{id:'a',label:'Ana'}],predicateValues:{'a|p':'V','a|q':'F'}
  });
  assert.match(html,/<code>p<\/code><\/dt><dd>x é aluno<\/dd>/);
  assert.match(html,/<code>q<\/code><\/dt><dd>x está presente<\/dd>/);
  assert.doesNotMatch(html,/class="truth-venn-regions"/);
  assert.match(html,/Ana/);
});

test('legenda não interpreta HTML fornecido no significado',()=>{
  const html=renderTruthVenn({
    variables:['p'],rows:truthRows(['p']),
    variableMeanings:{p:'<img src=x onerror=alert(1)>'},
    columns:[{key:'p',label:'p',derived:true}],
    getAnswer:()=> ''
  });
  assert.doesNotMatch(html,/<img src=x/);
  assert.match(html,/&lt;img src=x onerror=alert\(1\)&gt;/);
});
