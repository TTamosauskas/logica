/** Geradores de exercícios proposicionais. */
import { rng, pick, v, not, bin, A, O, X, I, B, t, evalAst, sig, pretty, varsOf, relevantNames, build } from "../core/logic.js";

export function fundamentals(level){const n=level==='easy'?1:level==='medium'?2:3,vars=varsOf(n);return build('fundamentos',vars,[],{title:`Complete as combinações de ${vars.join(', ')}`,instruction:`Esta tabela tem ${n} ${n===1?'variável':'variáveis'} e ${2**n} linhas. Preencha todas as células usando a ordem convencional: V antes de F.`,hint:`São 2^${n} = ${2**n} linhas. A primeira coluna tem V na primeira metade e F na segunda; a próxima alterna duas vezes mais rápido.`,resolution:'Cada variável muda de V para F em blocos sucessivamente menores. A última variável alterna V/F em toda linha.'})}

export function operators(level){let op=pick(level==='easy'?['not','and','or']:level==='medium'?['not','and','or','xor','implies','iff']:['and','or','xor','implies','iff']);const vars=varsOf(op==='not'?1:2),p=v(vars[0]),q=v(vars[1]);let root=op==='not'?not(p):bin(op,p,q),extras=[];
    if(level==='hard'&&op!=='not'){root=bin(op,not(p),q);extras=[not(p)]}
    let meaning={not:'Negação: inverta V e F.',and:'Conjunção: V somente quando ambos são V.',or:'Disjunção inclusiva: V quando pelo menos um é V.',xor:'OU exclusivo: V quando exatamente um é V.',implies:'Condicional: F apenas no caso V → F.',iff:'Bicondicional: V quando os dois valores coincidem.'}[op];
    const ex=build('operadores',vars,[root],{showSteps:extras.length>0,title:`Calcule ${pretty(root)}`,instruction:`Preencha a coluna final para cada combinação. ${meaning}`,hint:meaning,resolution:`Regra aplicada: ${meaning}`,metadata:{operator:op}});return ex
  }

export function composed(level){const vars=varsOf(level==='easy'?2:3).map(v),[p,q,r]=vars;const easy=[()=>A(O(p,q),not(p)),()=>I(A(p,q),q),()=>O(not(p),q),()=>B(not(p),q),()=>X(p,not(q))];const med=[()=>A(O(p,q),not(r)),()=>I(A(p,q),r),()=>O(A(p,not(q)),r),()=>B(I(p,q),r),()=>O(not(A(p,q)),r)];const hard=[()=>I(A(p,O(q,r)),B(q,not(r))),()=>B(O(not(p),A(q,r)),I(p,q)),()=>A(I(p,q),O(not(r),A(p,r))),()=>O(B(p,not(q)),A(I(q,r),not(p)))];const root=pick(level==='easy'?easy:level==='medium'?med:hard)();return build('compostas',vars.map(x=>x.name),[root],{title:`Resolva ${pretty(root)}`,instruction:'Complete as colunas da esquerda para a direita, resolvendo primeiro as expressões internas.',hint:'A coluna “etapa” traz uma subexpressão. Calcule cada etapa antes do resultado final.',resolution:`A expressão final é ${pretty(root)}. Cada linha deve usar os resultados das etapas anteriores.`})}

export function demorgan(level){const names=varsOf(level==='easy'?2:3),[p,q,r]=names.map(v);let leftA=p,leftB=q;
    if(level==='medium'){if(rng(2))leftA=O(p,q),leftB=r;else leftA=I(p,q),leftB=r}
    if(level==='hard'){leftA=pick([A(p,q),O(p,not(q)),I(p,q)]);leftB=pick([I(q,r),O(q,r),A(q,r)])}
    const inside=pick(['and','or']);const initial=not(bin(inside,leftA,leftB));const opposite=inside==='and'?'or':'and';const transformed=bin(opposite,not(leftA),not(leftB));const label=inside==='and'?'Negação do E':'Negação do OU';return build('demorgan',names,[initial,transformed],{showSteps:level!=='easy',rootLabels:['lado esquerdo','lado direito'],title:'Comprove a equivalência de De Morgan',instruction:`Preencha os dois lados: ${pretty(initial)} ≡ ${pretty(transformed)}. Depois, identifique a lei utilizada.`,hint:'Ao negar uma conjunção, transforme-a em disjunção de negações. Ao negar uma disjunção, transforme-a em conjunção de negações.',resolution:`Lei aplicada: ${label}. Os dois lados possuem exatamente os mesmos resultados em todas as linhas.`,choice:{question:'Qual forma da Lei de De Morgan foi aplicada?',options:['Negação do E','Negação do OU'],correct:label,explanation:'A lei recebe seu nome a partir do operador que estava dentro da negação original.'}})}

export function classification(level){
    const names=varsOf(level==='hard'?3:2),[p,q,r]=names.map(v),kind=pick(['Tautologia','Contradição','Contingência']);
    const templates={
      easy:{Tautologia:[()=>O(p,not(p)),()=>B(p,p)],Contradição:[()=>A(p,not(p)),()=>not(O(p,not(p)))],Contingência:[()=>A(p,q),()=>I(p,q),()=>X(p,q)]},
      medium:{Tautologia:[()=>I(A(p,q),p),()=>I(p,O(p,q))],Contradição:[()=>A(p,not(O(p,q))),()=>A(I(p,q),A(p,not(q)))],Contingência:[()=>B(p,q),()=>O(p,not(q)),()=>A(p,not(q))]},
      hard:{Tautologia:[()=>I(A(p,O(q,r)),O(p,r)),()=>I(A(A(p,q),r),A(q,r))],Contradição:[()=>A(A(p,O(q,r)),not(p)),()=>A(A(p,q),A(r,not(q)))],Contingência:[()=>A(O(p,q),not(r)),()=>I(A(p,q),r),()=>B(A(p,q),r)]}
    };
    const root=pick(templates[level][kind])(),ex=build('classificacao',relevantNames(names,[root]),[root],{showSteps:level!=='easy',title:`Classifique ${pretty(root)}`,instruction:'Preencha a tabela e decida se a expressão é sempre verdadeira, sempre falsa ou depende dos valores.',hint:'Examine a última coluna: todos V = tautologia; todos F = contradição; V e F misturados = contingência.',resolution:'Tautologia apresenta só V; contradição apresenta só F; contingência apresenta V e F.',choice:{question:'Como você classifica essa expressão?',options:['Tautologia','Contradição','Contingência'],correct:kind,explanation:`A coluna final caracteriza uma ${kind.toLowerCase()}.`}});
    const results=ex.envs.map(e=>evalAst(root,e)),actual=results.every(Boolean)?'Tautologia':results.every(x=>!x)?'Contradição':'Contingência';if(actual!==kind)throw Error('Classificação incorreta no gerador');return ex
  }

export function equivalences(level){
    const names=varsOf(level==='hard'?3:2),[p,q,r]=names.map(v);
    const equal=[()=>[I(p,q),O(not(p),q),'Implicação material'],()=>[not(not(p)),p,'Dupla negação'],()=>[I(p,q),I(not(q),not(p)),'Contraposição'],()=>[A(p,q),A(q,p),'Comutatividade']];
    const different=[()=>[I(p,q),I(q,p),'Inversão indevida'],()=>[A(p,q),O(p,q),'E versus OU'],()=>[not(O(p,q)),O(not(p),not(q)),'De Morgan aplicada incorretamente'],()=>[X(p,q),O(p,q),'OU exclusivo versus inclusivo']];
    const hardEqual=[()=>[A(p,O(q,r)),O(A(p,q),A(p,r)),'Distributividade'],()=>[I(A(p,q),r),O(not(p),O(not(q),r)),'Implicação material'],()=>[B(A(p,q),r),B(r,A(p,q)),'Comutatividade']];
    const hardDifferent=[()=>[O(p,A(q,r)),A(O(p,q),r),'Distribuição incorreta'],()=>[I(A(p,q),r),I(p,A(q,r)),'Implicação modificada'],()=>[A(p,O(q,r)),O(A(p,q),r),'Distributividade incompleta']];
    const intendedEqual=rng(2)===0,pool=level==='hard'?(intendedEqual?hardEqual:hardDifferent):(intendedEqual?equal:different),[left,right,rule]=pick(pool)();
    const ex=build('equivalencias',relevantNames(names,[left,right]),[left,right],{showSteps:level!=='easy',rootLabels:['expressão A','expressão B'],title:'Compare as duas expressões',instruction:`A: ${pretty(left)}  |  B: ${pretty(right)}. Preencha a tabela e descubra se as colunas finais coincidem.`,hint:'Equivalência exige a mesma saída em todas as linhas. Uma única diferença já demonstra falta de equivalência.',resolution:`${rule}. Compare linha a linha as colunas “expressão A” e “expressão B”.`,choice:{question:'As duas expressões são equivalentes?',options:['Equivalentes','Diferentes'],correct:intendedEqual?'Equivalentes':'Diferentes',explanation:`Conceito: ${rule}.`}});
    const actual=ex.envs.every(e=>evalAst(left,e)===evalAst(right,e));if(actual!==intendedEqual)throw Error('Equivalência incorreta no gerador');return ex
  }

export function argumentsMode(level){
    const names=varsOf(level==='hard'?3:2),[p,q,r]=names.map(v);
    const valid=[()=>[[I(p,q),p],q,'Modus ponens'],()=>[[I(p,q),not(q)],not(p),'Modus tollens'],()=>[[O(p,q),not(p)],q,'Silogismo disjuntivo']];
    const invalid=[()=>[[I(p,q),q],p,'Afirmação do consequente'],()=>[[I(p,q),not(p)],not(q),'Negação do antecedente']];
    const hardValid=[()=>[[I(p,q),I(q,r)],I(p,r),'Silogismo hipotético'],()=>[[A(p,q),I(q,r)],r,'Inferência encadeada']];
    const hardInvalid=[()=>[[I(p,q),O(p,r)],q,'Conclusão indevida'],()=>[[O(p,q),I(p,r)],r,'Conclusão sem garantia']];
    const chosenValid=rng(2)===0,pool=level==='hard'?(chosenValid?hardValid:hardInvalid):(chosenValid?valid:invalid);
    const [premises,conclusion,rule]=pick(pool)(),roots=[...premises,conclusion];
    const ex=build('argumentos',relevantNames(names,roots),roots,{showSteps:level==='hard',rootLabels:['premissa 1','premissa 2','conclusão'],title:'Este argumento é válido?',instruction:`Premissas: ${pretty(premises[0])} e ${pretty(premises[1])}. Conclusão: ${pretty(conclusion)}. Preencha os valores para testar a inferência.`,hint:'Encontre uma linha em que TODAS as premissas sejam V e a conclusão seja F. Essa linha demonstra invalidade.',resolution:`Forma do argumento: ${rule}. ${chosenValid?'Toda linha com premissas verdadeiras preserva a conclusão verdadeira.':'Existe um contraexemplo com ambas as premissas verdadeiras e a conclusão falsa.'}`,choice:{question:'O argumento é válido?',options:['Válido','Inválido'],correct:chosenValid?'Válido':'Inválido',explanation:chosenValid?'Uma conclusão falsa jamais ocorre com todas as premissas verdadeiras.':'Há uma linha com todas as premissas verdadeiras e conclusão falsa.'},metadata:{premises,conclusion}});
    const actual=ex.envs.every(e=>!premises.every(node=>evalAst(node,e))||evalAst(conclusion,e));if(actual!==chosenValid)throw Error('Validade incorreta no gerador');return ex
  }
