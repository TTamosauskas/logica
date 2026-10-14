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
function propertyTitle(name,meaning){
  const text=String(meaning||'').trim().replace(/[.!?]+$/,'');
  const property=/^x\s+(?:é|está)\s+(.+)$/i.exec(text)?.[1]?.toLowerCase();
  if(!property)return 'Conjunto '+name;
  const irregular={homem:'Homens',mulher:'Mulheres',mortal:'Mortais',
    animal:'Animais',pessoa:'Pessoas',cidadão:'Cidadãos',cidadã:'Cidadãs'};
  return irregular[property]||property.charAt(0).toUpperCase()+
    property.slice(1)+(property.endsWith('s')?'':property.endsWith('m')?'ns':'s');
}
export function renderIndividualSets({predicates=[],people=[],meanings={},conflicts=[]}={}){
  const heading='<div class="truth-venn-heading"><h3>Diagrama de indivíduos</h3>'+
    '<p>Os círculos grandes representam propriedades (conjuntos); cada pequeno círculo representa um indivíduo. '+
    'Um indivíduo só aparece dentro ou fora quando sua pertinência é conhecida.</p></div>';
  if(!predicates.length||!people.length)
    return '<section class="truth-venn-panel truth-individual-panel" aria-label="Diagrama de indivíduos">'+
      heading+'<p class="truth-venn-note">Cadastre um predicado e pelo menos um indivíduo para visualizar a pertinência.</p></section>';
  const panels=predicates.map(name=>{
    const inside=people.filter(person=>person.values?.[name]==='V');
    const outside=people.filter(person=>person.values?.[name]==='F');
    const pending=people.filter(person=>!['V','F'].includes(person.values?.[name]));
    const circles=inside.slice(0,6).map((person,i)=>{
      const x=inside.length===1?164:164+((i%3)-1)*53;
      const y=inside.length===1?126:104+Math.floor(i/3)*47;
      return '<g class="truth-individual-person"><title>'+esc(person.label+' pertence a '+propertyTitle(name,meanings[name]))+
        '</title><circle cx="'+x+'" cy="'+y+'" r="9" class="truth-individual-dot"/>'+
        '<text x="'+x+'" y="'+(y+22)+'" text-anchor="middle">'+esc(person.label.slice(0,12))+'</text></g>';
    }).join('');
    const outsiders=outside.slice(0,6).map((person,i)=>{
      const x=345+(i%2)*67,y=53+Math.floor(i/2)*61;
      return '<g class="truth-individual-person truth-individual-outside"><title>'+
        esc(person.label+' não pertence a '+propertyTitle(name,meanings[name]))+
        '</title><circle cx="'+x+'" cy="'+y+'" r="9" class="truth-individual-dot"/>'+
        '<text x="'+x+'" y="'+(y+22)+'" text-anchor="middle">'+esc(person.label.slice(0,10))+'</text></g>';
    }).join('');
    const title=propertyTitle(name,meanings[name]);
    const describe=(label,list)=>list.length?'<p><strong>'+label+':</strong> '+esc(list.map(p=>p.label).join(', '))+'</p>':'';
    return '<article class="truth-individual-set"><h4>'+esc(title)+'</h4>'+
      '<p class="truth-individual-formula"><code>'+esc(name)+'(x)</code> — '+esc(meanings[name]||'Propriedade sem significado cadastrado')+'</p>'+
      '<svg class="truth-venn-svg truth-individual-svg" viewBox="0 0 470 260" role="img" aria-label="'+
      esc('Conjunto '+title+'. Dentro: '+inside.map(p=>p.label).join(', ')+
        '. Fora: '+outside.map(p=>p.label).join(', ')+'. Indefinidos: '+pending.map(p=>p.label).join(', '))+'">'+
      '<circle cx="164" cy="126" r="102" class="truth-individual-set-circle"/>'+
      '<text x="164" y="39" text-anchor="middle" class="truth-individual-set-label">'+esc(title)+'</text>'+
      circles+outsiders+'</svg>'+
      '<div class="truth-individual-members">'+describe('Dentro',inside)+describe('Fora',outside)+
      describe('A definir',pending)+'</div></article>';
  }).join('');
  return '<section class="truth-venn-panel truth-individual-panel" aria-label="Diagrama de indivíduos">'+
    heading+'<div class="truth-individual-set-grid">'+panels+'</div>'+
    (conflicts.length?'<p class="truth-individual-conflicts" role="alert">Conflito entre valores informados e premissas: '+
      esc(conflicts.join(' '))+'</p>':'')+
    '<p class="truth-venn-status">Os painéis representam pertinência por propriedade, sem afirmar relações de inclusão entre conjuntos. '+
    'Premissas atômicas e aplicações simples de regras universais fornecem valores quando cabível; '+
    'a conclusão não é tomada como fato. Um valor desconhecido não significa falso.</p></section>';
}
