/** Frente 1 — os bancos e testes permanecem originais nas aulas já concluídas;
 * apenas os itens que antecipavam competências são reencaminhados. */
import { PILOT_ASSESSMENTS } from './assessment-pilot.js';
import { UNIT2_ASSESSMENTS } from './assessment-unit2.js';
import { UNIT3_ASSESSMENTS } from './assessment-unit3.js';
import { UNIT5_TO_7_ASSESSMENTS } from './assessment-unit5to7.js';
import { ERROR_ASSESSMENTS } from './errors-assessments.js';
const item=(question,options,why,dimension)=>({
 question,options,correct:0,why,dimension,
 objective:dimension==='concept'?'Conceito já ensinado nesta aula':'Aplicação de competência já ensinada'
});
const C=(q,o,w)=>item(q,o,w,'concept');
const A=(q,o,w)=>item(q,o,w,'application');

export const ALIGNED_ASSESSMENTS={
 traducao:[
  ...[0,1,3,4,5].map(i=>PILOT_ASSESSMENTS.traducao[i]),
  C('O que indica a expressão “p somente se q”?',
    ['q é necessária para p.','q é suficiente para p por si só.','p e q são incompatíveis.'],
    'A condição necessária precisa estar presente quando p ocorre.'),
  A('Qual fórmula representa “p se q”?',
    ['q→p.','p→q.','p↔q.'],
    'A parte após “se” é antecedente suficiente para a outra.'),
  A('Como formalizar “Se p, então q e r”?',
    ['p→(q∧r).','(p→q)∧r.','(p∧q)→r.'],
    'O consequente completo é uma conjunção, indicada pelo agrupamento.')
 ],
 argumentos:[
  ...[0,1,2,3,4,6].map(i=>PILOT_ASSESSMENTS.argumentos[i]),
  A('Premissas p→q e p; conclusão q. A tabela produz algum contraexemplo?',
    ['Não, as premissas juntas forçam q.','Sim, com p=V,q=F.','Sim, com p=F,q=V.'],
    'Quando p é verdadeira e p→q também, q não pode ser falsa.'),
  A('De p∨q e p, a conclusão ¬q é necessariamente válida?',
    ['Não: p e q podem ser ambas verdadeiras.','Sim, porque o OU sempre exclui uma delas.','Sim, porque basta p ser verdadeira.'],
    'A disjunção é inclusiva e admite ambas as parcelas verdadeiras.')
 ],
 equivalencias:[
  ...[0,1,2,3,7].map(i=>UNIT2_ASSESSMENTS.equivalencias[i]),
  A('Qual transformação de ¬(p∧q) preserva o valor de verdade?',
    ['¬p∨¬q.','¬p∧¬q.','p∧q.'],
    'A lei de De Morgan nega cada parte e troca conjunção por disjunção.'),
  A('Como eliminar uma dupla negação de ¬¬(p∨q)?',
    ['p∨q.','¬p∨q.','p∧q.'],
    'Aplicar duas negações a uma fórmula recupera seu valor em cada linha.'),
  A('O que confirma p→q ≡ ¬p∨q?',
    ['Colunas iguais em todas as quatro linhas de p e q.','Uma única linha favorável.','Mesmo número de conectivos.'],
    'Uma equivalência exige igualdade dos valores em todas as interpretações.')
 ],
 silogismos:[
  ...[0,1,3,4,5,7].map(i=>UNIT3_ASSESSMENTS.silogismos[i]),
  C('O silogismo disjuntivo exige, além de p∨q:',
    ['A negação de uma alternativa.','A afirmação de uma alternativa.','Uma condicional inversa.'],
    'A disjunção inclusiva e ¬p autorizam q; p por si só não exclui q.'),
  A('De p∨q e ¬q podemos inferir:',
    ['p.','¬p.','p∧q.'],
    'Se a disjunção é verdadeira e q falha, p deve ocorrer.')
 ],
 inducao:[
  ...UNIT5_TO_7_ASSESSMENTS.inducao.filter((_,i)=>i!==5),
  A('Uma enquete foi realizada só com voluntários de um clube de leitura. Qual o limite?',
    ['Pode não representar os estudantes de toda a escola.','Necessariamente representa qualquer população.','Tamanho torna a escolha irrelevante.'],
    'A seleção de voluntários ligados à leitura pode ser diferente da população alvo.')
 ],
 ilusoes_inferencia:[
  ...ERROR_ASSESSMENTS.ilusoes_inferencia.filter((_,i)=>i!==6),
  A('Clínicas com percentuais distintos de pacientes graves devem ser comparadas como?',
    ['Considerando separadamente a gravidade e a composição das amostras.','Usando somente as taxas agregadas.','Ignorando a distribuição dos casos.'],
    'A comparação por grupos ajuda a identificar o efeito da composição sobre o total.')
 ]
};
// A cobertura registra a responsabilidade didática da primeira apresentação.
// A prática de uma aula nova utiliza apenas suas próprias competências e pré-requisitos.
export const COMPETENCY_OWNER=Object.freeze({
 'conditionals-basic':'traducao',
 'unless-natural':'condicionais_naturais',
 'equivalence-basic':'equivalencias',
 'equivalence-algebra':'equiv_algebra',
 'equivalence-conditional':'equiv_condicionais',
 'validity-counterexample':'argumentos',
 'syllogism-hypothetical':'silogismos',
 'modus-tollens':'regras_inferencia',
 'natural-deduction':'provas',
 'quantifiers-basic':'categoricos',
 'quantifier-negation':'negacao_quantificadores',
 'sampling-bias':'inducao',
 'measurement-bias':'medicao_evidencias',
 'simpson-introduction':'ilusoes_inferencia',
 'weighted-mean':'medias_ponderadas',
 'temporal-operators':'temporal',
 'temporal-nested':'temporal_composta',
 'fde-states':'paraconsistente',
 'fde-operations':'fde_operacoes',
 'intuitionistic-intro':'intuicionista',
 'intuitionistic-double-negation':'intuicionista_negacao'
});
export const ASSESSMENT_SCOPE=Object.freeze({
 traducao:['conditionals-basic'],
 condicionais_naturais:['conditionals-basic','unless-natural'],
 equivalencias:['equivalence-basic'],
 equiv_algebra:['equivalence-basic','equivalence-algebra'],
 equiv_condicionais:['equivalence-basic','equivalence-conditional'],
 argumentos:['validity-counterexample'],
 silogismos:['syllogism-hypothetical'],
 regras_inferencia:['syllogism-hypothetical','modus-tollens'],
 provas:['natural-deduction','modus-tollens'],
 categoricos:['quantifiers-basic'],
 negacao_quantificadores:['quantifiers-basic','quantifier-negation'],
 inducao:['sampling-bias'],
 medicao_evidencias:['sampling-bias','measurement-bias'],
 ilusoes_inferencia:['simpson-introduction'],
 medias_ponderadas:['simpson-introduction','weighted-mean'],
 temporal:['temporal-operators'],
 temporal_composta:['temporal-operators','temporal-nested'],
 paraconsistente:['fde-states'],
 fde_operacoes:['fde-states','fde-operations'],
 intuicionista:['intuitionistic-intro'],
 intuicionista_negacao:['intuitionistic-intro','intuitionistic-double-negation']
});
export function validateCompetencyOrder(units,owners=COMPETENCY_OWNER,scope=ASSESSMENT_SCOPE){
 const ids=units.flatMap(u=>u.ids),index=new Map(ids.map((id,i)=>[id,i]));
 const errors=[];
 for(const [id,competencies] of Object.entries(scope)){
   if(!index.has(id))errors.push('Aula ausente: '+id);
   for(const key of competencies){
     const first=owners[key];
     if(!first||!index.has(first))errors.push('Competência não ensinada: '+key);
     else if(index.get(first)>index.get(id))errors.push(id+' antecipa '+key+' ensinado em '+first);
   }
 }
 return errors;
}
