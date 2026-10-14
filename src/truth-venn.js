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
    const raw=item.impossible?'impossible':
      predicate?(item.count>0?'member':'pending'):(solution?item.expected:item.answer);
    const shade=raw==='V'?'true':raw==='F'?'false':raw==='member'?'member':
      raw==='impossible'?'impossible':'pending';
    const opened=layout.circles.map((_,i)=>{
      const isInside=Boolean(item.mask&(1<<(names.length-i-1)));
      return '<g clip-path="url(#'+clipName(id,i,isInside)+')">';
    }).join('');
    const divergent=!predicate&&!solution&&item.expected&&item.answer!==item.expected;
    return opened+'<rect x="0" y="0" width="480" height="330" class="truth-venn-'+shade+'"><title>'+
      esc(item.label+': '+(!predicate&&item.impossible?'🚫 Combinação semanticamente impossível':
        predicate?(item.impossible?'Região impossível sob as premissas'+
        (item.count?'; '+item.count+' cadastro(s) conflitante(s)':''):
        item.count+' indivíduos'+(item.people?.length?': '+item.people.join(', '):'')):(raw||'pendente'))+
        (divergent?' · revisar':''))+'</title></rect>'+
      '</g>'.repeat(names.length);
  }).join('');
  const outlines=layout.circles.map(([x,y,r],i)=>
    '<circle cx="'+x+'" cy="'+y+'" r="'+r+'" class="truth-venn-circle"/>'+
    '<text x="'+layout.labels[i][0]+'" y="'+layout.labels[i][1]+'" class="truth-venn-name" text-anchor="middle">'+esc(names[i])+'</text>').join('');
  const texts=regions.map(item=>{
    const [x,y]=layout.points[item.mask];
    const value=item.impossible?'×':predicate?(item.count?String(item.count):'0'):(solution?item.expected:item.answer)||'·';
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
  getAnswer=()=>'',getExpected=()=>'',checked=false,impossibleRows=[]
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
  const impossibleSet=new Set(impossibleRows);
  regions.forEach(region=>{region.impossible=impossibleSet.has(region.rowIndex)});
  const differences=checked?regions.filter(item=>!item.impossible&&item.answer!==item.expected).length:0;
  const empty=regions.filter(item=>!item.impossible&&!item.answer).length;
  const selector='<label class="truth-venn-control">Coluna <select data-venn-column data-venn-scope="'+esc(id)+
    '" aria-label="Fórmula representada no diagrama">'+columns.map(col=>
      '<option value="'+esc(col.key)+'"'+(col.key===chosenKey?' selected':'')+'>'+esc(col.label)+'</option>').join('')+
    '</select></label>';
  const user='<div class="truth-venn-view"><h4>Suas respostas</h4>'+svgDiagram(id+'-student',shown,regions)+'</div>';
  const correct=checked?'<div class="truth-venn-view"><h4>Solução correta</h4>'+
    svgDiagram(id+'-answer',shown,regions,{solution:true})+'</div>':'';
  return '<section class="truth-venn-panel" aria-label="Venn–Euler das respostas">'+
    '<div class="truth-venn-heading"><div><h3>Diagrama de Venn–Euler</h3>'+
    '<p>Os círculos representam conjuntos de interpretações. Verde = V; vermelho = F; cinza = pendente; × = impossível.</p></div></div>'+
    '<div class="truth-venn-controls">'+selector+filtersHtml(variables,filters,id)+'</div>'+
    (variables.length>3?'<p class="truth-venn-note">Recorte: os círculos mostram '+esc(shown.join(', '))+
    '; as demais variáveis são fixadas pelos filtros. Alterar um filtro seleciona outras linhas da tabela.</p>':'')+
    '<div class="truth-venn-views">'+user+correct+'</div>'+variableLegend(variables,variableMeanings)+
    '<p class="truth-venn-status" role="status">'+
    (checked?differences+' região(ões) divergente(s), incluindo pendências. Compare os dois diagramas.':
      empty+' região(ões) ainda sem resposta. A solução aparecerá somente depois de Conferir respostas.')+
    (impossibleSet.size?' As regiões × não são editáveis e estão justificadas no rodapé da tabela.':'')+'</p>'+
    '</section>';
}

/** Na tabela de predicados, V/F define pertinência dos indivíduos, não gabarito. */
export function renderPredicateVenn({id='free',variables=[],variableMeanings={},people=[],predicateValues={},filters={},impossibleMasks=[]}={}){
  if(!variables.length||!people.length)return '';
  const shown=variables.slice(0,3),fixed=variables.slice(3);
  const regions=Array.from({length:2**shown.length},(_,mask)=>
    ({mask,label:labelFor(mask,shown),people:[],count:0}));
  const impossibleSet=new Set(impossibleMasks);
  regions.forEach(item=>{item.impossible=impossibleSet.has(item.mask)});
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
    (impossibleSet.size?'× indica uma região impossível em todos os modelos das premissas. '+
      (regions.some(item=>item.impossible&&item.count>0)?
        'Atenção: há indivíduos cadastrados em regiões que contradizem as premissas. ':''):'')+
    pending+' indivíduo(s) ainda com predicados indefinidos; '+
    filtered+' fora do recorte.</p></section>';
}


/** Euler por propriedade: cada pequeno círculo é um indivíduo, não um conjunto.
 * Uma pertinência indefinida NÃO é desenhada do lado de fora.
 * Painéis separados evitam inventar interseções quando outros predicados são desconhecidos.
 */

/** Um único diagrama para indivíduos: predicados são conjuntos e nomes são pontos.
 * Interpretações V/F das fórmulas continuam na tabela, não nos círculos.
 */
function propertyTitle(name,meaning){
  const text=String(meaning||'').trim().replace(/[.!?]+$/,'');
  const adjective=/^x\s+(?:é|está|tem|possui)\s+(?:um |uma )?(.+)$/i.exec(text)?.[1]?.toLowerCase();
  if(!adjective)return name;
  const known={homem:'Homens',mulher:'Mulheres',mortal:'Mortais',animal:'Animais',
    pessoa:'Pessoas',cidadão:'Cidadãos',cidadã:'Cidadãs',vivo:'Vivos',
    estudante:'Estudantes',aluno:'Alunos',aluna:'Alunas',humano:'Humanos'};
  return known[adjective]||adjective.charAt(0).toUpperCase()+adjective.slice(1);
}
/** Escolhe até três conjuntos sem inventar relações.
 * Se houver inclusão universal comprovada, mostra os dois conjuntos relacionados
 * com a geometria aninhada, em vez de desenhar sua interseção como opcional.
 */
function selectIndividualSets(predicates,relations){
  const candidate=relations.find(({subset,superset})=>subset!==superset&&
    predicates.includes(subset)&&predicates.includes(superset)&&
    !relations.some(r=>r.subset===superset&&r.superset===subset));
  return candidate?{shown:[candidate.subset,candidate.superset],nested:candidate}:
    {shown:predicates.slice(0,3),nested:null};
}
function individualGeometry(shown,nested){
  if(nested&&shown.length===2){
    // Ordem de shown: subconjunto, superconjunto. Máscara: 00, 01, 10, 11.
    return {circles:[[240,184,78],[240,160,138]],
      labels:[[240,155],[240,43]],
      points:[[430,268],[345,141],null,[240,214]]};
  }
  return shapes[shown.length]||null;
}
/** Ponto sobre a borda do conjunto indefinido: indica a propriedade
 * conhecida sem decidir arbitrariamente a pertença ao outro conjunto. */
function partialPoint(values,nested){
  if(values.length!==2||values.filter(v=>v==='').length!==1)return null;
  const signature=values.map(v=>v||'?').join('');
  if(nested){
    return ({'?V':[240,106],'F?':[378,160],'?F':[378,160],'V?':[240,106]})[signature]||null;
  }
  return ({'V?':[189,163],'?V':[291,163],'F?':[393,163],'?F':[87,163]})[signature]||null;
}
function individualMarker(person,x,y,index){
  const dx=index?((index%2)?28:-28)*Math.ceil(index/2):0;
  const dy=index?Math.floor((index-1)/2)*-28:0;
  const symbol=String(person.id||'').trim();
  return '<g class="truth-individual-person"><title>Indivíduo '+esc(symbol)+'</title>'+
    '<circle class="truth-individual-dot" cx="'+(x+dx)+'" cy="'+(y+dy)+'" r="11"/>'+
    '<text class="truth-individual-symbol" x="'+(x+dx)+'" y="'+(y+dy)+
    '" text-anchor="middle" dominant-baseline="central">'+esc(symbol.slice(0,4))+'</text></g>';
}
/** O desenho identifica indivíduos apenas por símbolos; seus nomes aparecem na legenda. */
function individualSetLegend(shown,people,meanings,statuses){
  const sets=shown.map(name=>'<div class="truth-venn-variable"><dt><code>'+
    esc(name)+'</code></dt><dd>'+esc(String(meanings?.[name]||'').trim()||
      'Significado não informado')+'</dd></div>').join('');
  const individuals=people.map(person=>{
    const id=String(person.id||'');
    const name=String(person.label||person.id);
    const note=statuses.get(id);
    return '<div class="truth-venn-variable"><dt><code>'+esc(id)+'</code></dt>'+
      '<dd>'+esc(name)+(note?'<small class="truth-individual-legend-note"> — '+
      esc(note)+'</small>':'')+'</dd></div>';
  }).join('');
  return '<section class="truth-venn-legend" aria-label="Legenda do diagrama de Venn–Euler">'+
    '<h4>Legenda</h4><div class="truth-individual-legend-groups">'+
    '<div class="truth-individual-legend-group"><h5>Predicados · conjuntos</h5>'+
    '<dl class="truth-venn-variables">'+sets+'</dl></div>'+
    '<div class="truth-individual-legend-group"><h5>Indivíduos · pontos</h5>'+
    '<dl class="truth-venn-variables">'+(individuals||
      '<div class="truth-venn-variable"><dt>—</dt><dd>Nenhum indivíduo identificado.</dd></div>')+
    '</dl></div></div></section>';
}
export function renderIndividualSets({predicates=[],people=[],meanings={},conflicts=[],relations=[]}={}){
  const {shown,nested}=selectIndividualSets(predicates,relations);
  const geometry=individualGeometry(shown,nested);
  const heading='<div class="truth-venn-heading"><h3>Diagrama de Venn–Euler</h3></div>';
  if(!geometry)return '<section class="truth-venn-panel truth-individual-panel">'+heading+
    '<p class="truth-venn-note">Adicione uma fórmula com predicados para visualizar seus conjuntos.</p></section>';
  const names=shown.map(name=>propertyTitle(name,meanings[name]));
  const regionPeople=new Map(),partialPeople=[],pending=[],inconsistent=[];
  const legendStatuses=new Map();
  for(const person of people){
    const values=shown.map(name=>person.values?.[name]||'');
    if(values.some(value=>!['V','F'].includes(value))){
      const point=partialPoint(values,nested);
      if(point){
        partialPeople.push({person,point,missing:shown.filter((_,i)=>values[i]==='')});
        legendStatuses.set(String(person.id),'posição parcial (sobre a borda)');
      }else{
        pending.push(person);
        legendStatuses.set(String(person.id),'posição indefinida');
      }
      continue;
    }
    const mask=values.reduce((bits,value)=>bits*2+(value==='V'?1:0),0);
    if(nested&&mask===2){
      inconsistent.push(person);
      legendStatuses.set(String(person.id),'pertinência contraditória');
      continue;
    }
    regionPeople.set(mask,[...(regionPeople.get(mask)||[]),person]);
  }
  const circles=geometry.circles.map(([cx,cy,r],i)=>
    '<circle class="truth-individual-set-circle'+(nested&&i===0?' truth-individual-subset-circle':'')+
    '" cx="'+cx+'" cy="'+cy+'" r="'+r+'"/>'+
    '<text class="truth-individual-set-label" x="'+geometry.labels[i][0]+'" y="'+geometry.labels[i][1]+
    '" text-anchor="middle">'+esc(names[i])+'</text>').join('');
  const markers=[...regionPeople].map(([mask,persons])=>{
    const point=geometry.points[mask];
    if(!point)return '';
    return persons.slice(0,2).map((person,i)=>individualMarker(person,point[0],point[1],i)).join('')+
      (persons.length>2?'<text class="truth-individual-more" x="'+point[0]+'" y="'+(point[1]+37)+
      '" text-anchor="middle">+'+(persons.length-2)+'</text>':'');
  }).join('');
  const partialMarkers=partialPeople.map(({person,point})=>
    individualMarker(person,point[0],point[1],0)).join('');
  const info=[];
  if(inconsistent.length)info.push('Há valores incompatíveis com a inclusão entre conjuntos.');
  if(shown.length<predicates.length)
    info.push('Exibindo '+shown.length+' de '+predicates.length+' propriedades.');
  if(conflicts.length)info.push('Há conflito entre premissas e valores informados.');
  // Uma mesma área pode conter vários indivíduos. A distribuição visual nunca
  // decide se uma propriedade é verdadeira ou falsa.
  const description='Conjuntos '+names.join(', ')+'. '+
    people.map(p=>String(p.label||p.id)+': '+shown.map((name,i)=>
      names[i]+' '+(p.values?.[name]==='V'?'sim':p.values?.[name]==='F'?'não':'indefinido')).join(', ')).join('. ');
  return '<section class="truth-venn-panel truth-individual-panel" aria-label="Diagrama de Venn–Euler de indivíduos">'+
    heading+'<svg class="truth-venn-svg truth-individual-svg" viewBox="0 0 480 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="'+
    esc(description)+'">'+circles+markers+partialMarkers+'</svg>'+
    individualSetLegend(shown,people,meanings,legendStatuses)+
    (info.length?'<p class="truth-venn-status"'+(inconsistent.length||conflicts.length?' role="alert"':'')+'>'+
      esc(info.join(' '))+'</p>':'')+'</section>';
}
