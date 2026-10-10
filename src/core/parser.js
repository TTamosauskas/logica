/** Parser e verificação por equivalência semântica. */
import { v, not, A, O, bin, I, B, truthRows, evalAst } from "./logic.js";

export function tokens(input){
    const s=input.trim().toLowerCase(),result=[];let i=0;
    while(i<s.length){if(/\s/.test(s[i])){i++;continue}
      const rest=s.slice(i);let token=null;
      for(const [raw,type] of [['<->','iff'],['↔','iff'],['->','implies'],['=>','implies'],['→','implies'],['&&','and'],['∧','and'],['&','and'],['||','or'],['∨','or'],['|','or'],['⊕','xor'],['^','xor'],['¬','not'],['!','not'],['~','not'],['(','('],[')',')']]){if(rest.startsWith(raw)){token={type,value:raw};i+=raw.length;break}}
      if(token){result.push(token);continue}
      const match=/^[a-zà-ÿ][a-z0-9_à-ÿ]*/.exec(rest);if(match){const word=match[0],aliases={e:'and',ou:'or',xor:'xor',nao:'not',não:'not',se:'implies',sse:'iff'};result.push({type:aliases[word]||'name',value:word});i+=word.length;continue}
      throw Error(`Símbolo desconhecido: “${s[i]}”.`)
    }
    return result;
  }

export function parseFormula(input,allowed){
    const list=tokens(input);let i=0;
    const consume=type=>list[i]?.type===type?(i++,true):false;
    function primary(){if(consume('not'))return not(primary());if(consume('(')){const n=iff();if(!consume(')'))throw Error('Feche o parêntese com ).');return n}
      const x=list[i++];if(!x)throw Error('A fórmula está incompleta.');if(x.type!=='name')throw Error(`Era esperada uma variável; foi encontrado “${x.value}”.`);if(!allowed.includes(x.value))throw Error(`Utilize apenas as variáveis ${allowed.join(', ')}.`);return v(x.value)}
    function and(){let left=primary();while(consume('and'))left=A(left,primary());return left}
    function or(){let left=and();while(list[i]&&['or','xor'].includes(list[i].type)){const op=list[i++].type;left=bin(op,left,and())}return left}
    function implies(){let left=or();if(consume('implies'))left=I(left,implies());return left}
    function iff(){let left=implies();while(consume('iff'))left=B(left,implies());return left}
    const tree=iff();if(i<list.length)throw Error(`Confira o trecho “${list[i].value}” e a posição dos conectivos.`);return tree;
  }

export function equivalentFormula(a,b,vars){const envs=truthRows(vars);const different=envs.find(env=>evalAst(a,env)!==evalAst(b,env));return {equivalent:!different,counter:different};}
