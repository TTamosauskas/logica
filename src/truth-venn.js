/** Venn–Euler: visualização das respostas registradas, sem antecipar gabaritos.
 * Tabelas proposicionais: regiões são interpretações V/F.
 * Tabelas de predicados: regiões são conjuntos de indivíduos.
 */
import {escapeHTML} from './core/html.js';

const esc=value=>escapeHTML(String(value??''));
const valid=value=>value==='V'||value==='F'?value:'';
const membership=(row,names)=>names.reduce((bits,name,index)=>
  bits|(row[name]===true?1<<(names.length-index-1):0),0);
const labelFor=(mask,names)=>names.map((name,i)=>
  ((mask&(1<<(names.length-i-1)))?'':'¬')+name).join(' ∧ ');
const selectedFilter=(filters,name)=>filters?.[name]==='F'?'F':'V';
const clipName=(id,position,inside)=>id+'-'+position+'-'+(inside?'in':'out');
const shapes={
  1:{circles:[[240,165,105]],labels:[[240,43]],points:[[424,274],[240,165]]},
  2:{circles:[[189,163,102],[291,163,102]],labels:[[126,47],[354,47]],
    points:[[441,282],[350,163],[128,163],[240,163]]},
  3:{circles:[[190,126,91],[290,126,91],[240,211,91]],
    labels:[[128,31],[352,31],[240,315]],
    points:[[439,281],[240,263],[354,105],[305,203],[125,105],[176,203],[240,79],[240,157]]}
};

/** Função pura para conferir a relação entre linhas, filtros e regiões. */
export function truthRegionData({variables,rows,getAnswer,getExpected,checked=false,filters={}}){
  const shown=variables.slice(0,3),fixed=variables.slice(3);
  if(!shown.length||shown.length>3)return [];
  const candidates=rows.map((env,index)=>({env,index})).filter(({env})=>
    variables.every(name=>typeof env[name]==='boolean')&&
    fixed.every(name=>env[name]===(selectedFilter(filters,name)==='V')));
  return Array.from({length:2**shown.length},(_,mask)=>{
    const record=candidates.find(({env})=>membership(env,shown)===mask);
    const index=record?.index??-1;
    return {mask,label:labelFor(mask,shown),rowIndex:index,
      answer:index<0?'':valid(getAnswer(index)),
      expected:checked&&index>=0?valid(getExpected(index)):''};
  });
}

function svgDiagram(id,names,regions,{solution=false,predicate=false}={}){
  const layout=shapes[names.length];
  if(!layout)return '';
  const defs=layout.circles.map(([x,y,r],i)=>{
    const inner=clipName(id,i,true),outer=clipName(id,i,false);
    return '<clipPath id="'+inner+'"><circle cx="'+x+'" cy="'+y+'" r="'+r+'"/></clipPath>'+
      '<clipPath id="'+outer+'"><path clip-rule="evenodd" d="M0 0H480V330H0Z M'+(x+r)+' '+y+
      ' A'+r+' '+r+' 0 1 0 '+(x-r)+' '+y+' A'+r+' '+r+' 0 1 0 '+(x+r)+' '+y+'Z"/></clipPath>';
  }).join('');
  const fills=regions.map(item=>{
    const raw=predicate?(item.count>0?'member':'pending'):(solution?item.expected:item.answer);
    const shade=raw==='V'?'true':raw==='F'?'false':raw==='member'?'member':'pending';
    const opened=layout.circles.map((_,i)=>{
      const isInside=Boolean(item.mask&(1<<(names.length-i-1)));
      return '<g clip-path="url(#'+clipName(id,i,isInside)+')">';
    }).join('');
    return opened+'<rect x="0" y="0" width="480" height="330" class="truth-venn-'+shade+'"><title>'+
      esc(item.label+': '+(predicate?(item.count+' indivíduos'+(item.people?.length?': '+item.people.join(', '):'')):(raw||'pendente')))+'</title></rect>'+
      '</g>'.repeat(names.length);
  }).join('');
  const outlines=layout.circles.map(([x,y,r],i)=>
    '<circle cx="'+x+'" cy="'+y+'" r="'+r+'" class="truth-venn-circle"/>'+
    '<text x="'+layout.labels[i][0]+'" y="'+layout.labels[i][1]+'" class="truth-venn-name" text-anchor="middle">'+esc(names[i])+'</text>').join('');
  const texts=regions.map(item=>{
    const [x,y]=layout.points[item.mask];
    const value=predicate?(item.count?String(item.count):'0'):(solution?item.expected:item.answer)||'·';
    return '<text x="'+x+'" y="'+y+'" class="truth-venn-value" text-anchor="middle" dominant-baseline="central">'+esc(value)+'</text>';
  }).join('');
  return '<svg class="truth-venn-svg" viewBox="0 0 480 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="'+
    esc('Diagrama de '+names.join(', ')+'. '+(predicate?'Números representam indivíduos cadastrados.':solution?'Gabarito após correção.':'Valores informados pelo estudante.'))+'">'+
    '<defs>'+defs+'</defs><rect x="3" y="3" width="474" height="324" rx="12" class="truth-venn-background"/>'+
    fills+outlines+texts+'</svg>';
}
function filtersHtml(variables,filters,scope){
  return variables.slice(3).map(name=>{
    const choice=selectedFilter(filters,name);
    return '<label class="truth-venn-control">Fixar '+esc(name)+
      ' <select data-venn-filter="'+esc(name)+'" data-venn-scope="'+scope+'" aria-label="Filtrar '+esc(name)+'">'+
      ['V','F'].map(v=>'<option value="'+v+'"'+(v===choice?' selected':'')+'>'+v+'</option>').join('')+
      '</select></label>';
  }).join('');
}
/** Legenda compartilhada: explica os átomos, nunca repete fórmulas de regiões. */
function variableLegend(variables,meanings={}){
  const entries=variables.map(name=>{
    const meaning=String(meanings?.[name]??'').trim();
    return '<div class="truth-venn-variable"><dt><code>'+esc(name)+'</code></dt>'+
      '<dd>'+esc(meaning||'Significado não informado neste exercício.')+'</dd></div>';
  }).join('');
  return '<section class="truth-venn-legend" aria-label="Significado das variáveis">'+
    '<h4>Significado das variáveis</h4><dl class="truth-venn-variables">'+entries+'</dl></section>';
}
/** Retorna um painel contendo exclusivamente as entradas do aluno até a correção. */
export function renderTruthVenn({
  id='exercise',variables=[],variableMeanings={},rows=[],columns=[],selectedKey='',filters={},
  getAnswer=()=>'',getExpected=()=>'',checked=false
}={}){
  if(!variables.length||!columns.length||
     !rows.length||!rows.every(env=>variables.every(name=>typeof env[name]==='boolean')))return '';
  const selection=columns.find(col=>col.key===selectedKey)||
    [...columns].reverse().find(col=>col.derived)||columns[0];
  const chosenKey=selection.key;
  const regions=truthRegionData({variables,rows,
    getAnswer:index=>getAnswer(index,selection),
    getExpected:index=>getExpected(index,selection),
    filters,checked});
  const shown=variables.slice(0,3);
  const differences=checked?regions.filter(item=>item.answer!==item.expected).length:0;
  const empty=regions.filter(item=>!item.answer).length;
  const selector='<label class="truth-venn-control">Coluna <select data-venn-column data-venn-scope="'+esc(id)+
    '" aria-label="Fórmula representada no diagrama">'+columns.map(col=>
      '<option value="'+esc(col.key)+'"'+(col.key===chosenKey?' selected':'')+'>'+esc(col.label)+'</option>').join('')+
    '</select></label>';
  const user='<div class="truth-venn-view"><h4>Suas respostas</h4>'+svgDiagram(id+'-student',shown,regions)+'</div>';
  const correct=checked?'<div class="truth-venn-view"><h4>Solução correta</h4>'+
    svgDiagram(id+'-answer',shown,regions,{solution:true})+'</div>':'';
  return '<section class="truth-venn-panel" aria-label="Venn–Euler das respostas">'+
    '<div class="truth-venn-heading"><div><h3>Diagrama de Venn–Euler</h3>'+
    '<p>Os círculos representam conjuntos de interpretações. Verde = V; vermelho = F; cinza = pendente.</p></div></div>'+
    '<div class="truth-venn-controls">'+selector+filtersHtml(variables,filters,id)+'</div>'+
    (variables.length>3?'<p class="truth-venn-note">Recorte: os círculos mostram '+esc(shown.join(', '))+
    '; as demais variáveis são fixadas pelos filtros. Alterar um filtro seleciona outras linhas da tabela.</p>':'')+
    '<div class="truth-venn-views">'+user+correct+'</div>'+variableLegend(variables,variableMeanings)+
    '<p class="truth-venn-status" role="status">'+
    (checked?differences+' região(ões) divergente(s), incluindo pendências. Compare os dois diagramas.':
      empty+' região(ões) ainda sem resposta. A solução aparecerá somente depois de Conferir respostas.')+'</p>'+
    '</section>';
}

/** Na tabela de predicados, V/F define pertinência dos indivíduos, não gabarito. */
export function renderPredicateVenn({id='free',variables=[],variableMeanings={},people=[],predicateValues={},filters={}}={}){
  if(!variables.length||!people.length)return '';
  const shown=variables.slice(0,3),fixed=variables.slice(3);
  const regions=Array.from({length:2**shown.length},(_,mask)=>
    ({mask,label:labelFor(mask,shown),people:[],count:0}));
  let pending=0,filtered=0;
  for(const person of people){
    const values=Object.fromEntries(variables.map(name=>[name,valid(predicateValues[person.id+'|'+name])]));
    if(variables.some(name=>!values[name])){pending++;continue}
    if(fixed.some(name=>values[name]!==selectedFilter(filters,name))){filtered++;continue}
    const mask=membership(Object.fromEntries(shown.map(name=>[name,values[name]==='V'])),shown);
    regions[mask].people.push(person.label||person.id);
    regions[mask].count++;
  }
  return '<section class="truth-venn-panel" aria-label="Venn–Euler de indivíduos">'+
    '<div class="truth-venn-heading"><h3>Diagrama de Venn–Euler</h3>'+
    '<p>Aqui os círculos são conjuntos de indivíduos, conforme os V/F informados nos predicados.</p></div>'+
    '<div class="truth-venn-controls">'+filtersHtml(variables,filters,id)+'</div>'+
    (fixed.length?'<p class="truth-venn-note">Recorte dos predicados '+esc(shown.join(', '))+
    '. Os demais predicados são fixados pelos filtros.</p>':'')+
    '<div class="truth-venn-views"><div class="truth-venn-view"><h4>Indivíduos cadastrados</h4>'+
    svgDiagram(id+'-pred',shown,regions,{predicate:true})+'</div></div>'+
    variableLegend(variables,variableMeanings)+
    '<p class="truth-venn-status" role="status">Os números indicam indivíduos cadastrados com predicados definidos, não V/F de fórmulas. '+
    'Um 0 indica ausência de indivíduos conhecidos nessa região, não prova que ela seja logicamente vazia. '+
    pending+' indivíduo(s) ainda com predicados indefinidos; '+
    filtered+' fora do recorte.</p></section>';
}
