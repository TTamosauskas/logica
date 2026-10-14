/** Avaliação e representação de fórmulas proposicionais (sem dependências do DOM). */

export const SYMBOLS={and:'∧',or:'∨',xor:'⊕',implies:'→',iff:'↔'};

export const rng=n=>Math.floor(Math.random()*n), pick=a=>a[rng(a.length)];

export const v=name=>({type:'var',name});

export const not=a=>({type:'not',a});

export const bin=(type,a,b)=>({type,a,b});

export const A=(a,b)=>bin('and',a,b), O=(a,b)=>bin('or',a,b), X=(a,b)=>bin('xor',a,b), I=(a,b)=>bin('implies',a,b), B=(a,b)=>bin('iff',a,b);

export const t=x=>x?'V':'F';

export function evalAst(node,env){switch(node.type){case 'var':return env[node.name];case 'truth':return true;case 'falsity':return false;case 'not':return !evalAst(node.a,env);case 'and':return evalAst(node.a,env)&&evalAst(node.b,env);case 'or':return evalAst(node.a,env)||evalAst(node.b,env);case 'xor':return evalAst(node.a,env)!==evalAst(node.b,env);case 'implies':return !evalAst(node.a,env)||evalAst(node.b,env);case 'iff':return evalAst(node.a,env)===evalAst(node.b,env);default:throw Error('Operador desconhecido')}}

export function fmt(node){if(node.type==='var')return node.name;if(node.type==='truth')return '⊤';if(node.type==='falsity')return '⊥';if(node.type==='not')return '¬'+(node.a.type==='var'||node.a.type==='truth'||node.a.type==='falsity'||node.a.type==='not'?fmt(node.a):'('+fmt(node.a)+')');return '('+fmt(node.a)+' '+SYMBOLS[node.type]+' '+fmt(node.b)+')'}

export const pretty=node=>{const s=fmt(node);return node.type!=='not'&&node.type!=='var'&&node.type!=='truth'&&node.type!=='falsity'?s.slice(1,-1):s};

export const sig=node=>node.type==='var'?node.name:node.type==='truth'?'T':node.type==='falsity'?'F':node.type==='not'?'!'+sig(node.a):node.type+'('+sig(node.a)+','+sig(node.b)+')';

export function varsOf(n){const source=['p','q','r','s','t','u','a','b'];for(let i=source.length-1;i>0;i--){const j=rng(i+1);[source[i],source[j]]=[source[j],source[i]]}return source.slice(0,n)}

export function relevantNames(names,roots){const used=new Set();const walk=node=>{if(node.type==='var')used.add(node.name);else{if(node.a)walk(node.a);if(node.b)walk(node.b)}};roots.forEach(walk);return names.filter(name=>used.has(name))}

export function truthRows(vars){return Array.from({length:2**vars.length},(_,i)=>Object.fromEntries(vars.map((name,j)=>[name,((i>>(vars.length-j-1))&1)===0])))}

export function varColumns(vars,editable=false){return vars.map((name,i)=>({key:'var'+i,label:name,sub:'variável',node:v(name),editable}))}

export function stepNodes(roots){const found=[],seen=new Set(),rootSigs=new Set(roots.map(sig));const walk=n=>{if(n.type==='var'||n.type==='truth'||n.type==='falsity')return;if(n.a)walk(n.a);if(n.b)walk(n.b);const s=sig(n);if(!seen.has(s)&&!rootSigs.has(s)){found.push(n);seen.add(s)}};roots.forEach(walk);return found}

export function formulaColumns(roots,steps=true,labels=[]){const preliminary=steps?stepNodes(roots):[];const cols=preliminary.map((node,i)=>({key:'step'+i,label:pretty(node),sub:'etapa',node,editable:true}));roots.forEach((node,i)=>cols.push({key:'out'+i,label:pretty(node),sub:labels[i]||'resultado',node,editable:true}));return cols}

export function build(mode,vars,roots,{showSteps=true,rootLabels=[],choice=null,title='',instruction='',hint='',resolution='',metadata={}}={}){const envs=truthRows(vars), cols=[...varColumns(vars,mode==='fundamentos'),...(mode==='fundamentos'?[]:formulaColumns(roots,showSteps,rootLabels))];return {mode,vars,roots,cols,envs,choice,title,instruction,hint,resolution,metadata,answers:{},picked:'',grade:null,gradedEver:false,revealed:false,hintVisible:false}}
