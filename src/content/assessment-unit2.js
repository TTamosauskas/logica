/** Avaliações suplementares da Unidade II, exceto Argumentos (piloto). */
const C=(question,options,why)=>({question,options,correct:0,why,dimension:'concept',objective:'Compreensão da ideia central'});
const A=(question,options,why)=>({question,options,correct:0,why,dimension:'application',objective:'Aplicação em novo cenário'});
export const UNIT2_ASSESSMENTS={
 compostas:[
  C('Em uma fórmula com parênteses, como se obtém seu valor de verdade?',['Calculando subfórmulas internas antes de combinar os resultados.','Avaliando somente o conectivo escrito mais à esquerda.','Somando as ocorrências de conectivos sem considerar o escopo.'],'O valor decorre da árvore de composição da expressão.'),
  C('Por que p ∧ (q ∨ r) e (p ∧ q) ∨ r não são a mesma fórmula?',['Parênteses alteram o alcance dos conectivos e podem mudar valores.','Toda mudança de parênteses muda o número de variáveis distintas.','A disjunção só pode ocorrer fora de parênteses.'],'Os agrupamentos definem operações em ordens diferentes.'),
  C('O que representa uma coluna intermediária em uma tabela-verdade?',['O valor de uma subfórmula em cada interpretação.','Uma premissa adicional que deve ser considerada verdadeira.','A frequência real do evento representado por uma variável.'],'Colunas auxiliares espelham o cálculo composicional.'),
  C('Por que a ordem de cálculo pode importar mesmo com as mesmas variáveis?',['Porque conectivos distintos operam sobre subexpressões delimitadas pelo escopo.','Porque a ordem altera o significado de p ou q como frases atômicas.','Porque tabelas maiores permitem arbitrariamente mais valores lógicos.'],'Árvores sintáticas definem o alcance das operações.'),
  A('Com p=F, q=V e r=F, qual valor de (p∨q)∧¬r?',['V.','F, porque p é falso.','F, porque r é falso.'],'p∨q=V e ¬r=V; a conjunção é verdadeira.'),
  A('Com p=F e q=V, quanto vale ¬(p∧q)∧q?',['V.','F, porque p∧q é falso.','F, porque a negação afeta também q.'],'p∧q=F, sua negação é V e q=V.'),
  A('Com p=V, q=F, r=V, calcule p∧(q∨r).',['V.','F, porque q é falso.','F, porque uma conjunção não admite uma disjunção.'],'q∨r=V e p=V.'),
  A('Qual interpretação distingue (p∨q)∧r de p∨(q∧r)?',['p=V, q=F, r=F.','p=F, q=V, r=V.','p=F, q=F, r=F.'],'Na primeira interpretação a fórmula inicial é F e a segunda é V.')
 ],
 demorgan:[
  C('A negação de p∧q exige que...',['Pelo menos um dos componentes seja falso.','Ambos os componentes sejam necessariamente falsos.','Exatamente um componente seja falso.'],'Uma conjunção falha se ao menos uma parte falha.'),
  C('A negação de p∨q é verdadeira se...',['Os dois componentes são falsos.','Pelo menos um componente é falso.','Exatamente um componente é verdadeiro.'],'Negar a disjunção inclusiva exige que nenhuma alternativa ocorra.'),
  C('Por que a transformação ¬(p∧q) ≡ ¬p∨¬q não troca a negação por outra conjunção?',['Porque a falha de um único conjunto já torna sua conjunção falsa.','Porque uma conjunção é sempre igual a uma disjunção.','Porque a negação elimina a necessidade de comparar valores.'],'De Morgan combina inversão dos valores e troca do conectivo.'),
  C('Uma lei de equivalência precisa preservar o valor de verdade em...',['Todas as interpretações possíveis das variáveis envolvidas.','Somente nas interpretações em que p e q são verdadeiros.','Somente no exemplo empírico que motivou a fórmula.'],'Equivalência lógica é universal sobre as interpretações.'),
  A('Qual fórmula nega “A conta foi paga e o recibo chegou”?',['A conta não foi paga ou o recibo não chegou.','A conta não foi paga e o recibo não chegou.','A conta foi paga ou o recibo chegou.'],'¬(p∧q) equivale a ¬p∨¬q.'),
  A('Qual fórmula nega “Ana ou Bia participou”, com “ou” inclusivo?',['Nem Ana nem Bia participou.','Ana não participou ou Bia não participou.','Exatamente uma das duas não participou.'],'Negar p∨q requer ambas falsas.'),
  A('Para p=F, q=V, qual valor de ¬(p∨q)?',['F.','V, pois p é falso.','V, porque só um dos componentes é verdadeiro.'],'A disjunção já é verdadeira quando q é V.'),
  A('Qual tradução equivale a “Não é verdade que houve chuva e vento”?',['Não houve chuva ou não houve vento.','Não houve chuva e não houve vento.','Houve chuva ou vento, mas não ambos.'],'Não ocorrer a combinação é diferente de não ocorrer nenhum evento.')
 ],
 classificacao:[
  C('Qual é a condição semântica de uma tautologia?',['Ser verdadeira sob todas as interpretações admissíveis.','Ser verdadeira apenas sob uma interpretação observada.','Ser impossível de refutar por falta de informação empírica.'],'A universalidade das linhas verdadeiras é o critério.'),
  C('Uma contradição lógica se caracteriza por...',['Nenhuma interpretação que a torne verdadeira.','Pelo menos uma interpretação com valor falso.','Duas premissas empíricas divergentes entre si.'],'Contradição é falsidade em todas as linhas.'),
  C('O que a bivalência estabelece na semântica clássica?',['Cada proposição recebe exatamente um valor, V ou F, em cada interpretação.','É sempre possível conhecer o valor de cada frase sobre o mundo.','Toda proposição e sua negação são simultaneamente verdadeiras.'],'Bivalência diz respeito aos valores semânticos admissíveis, não ao que sabemos sobre os fatos.'),
  C('Qual é a diferença entre terceiro excluído e não contradição?',['p∨¬p é sempre V; ¬(p∧¬p) impede que p e ¬p sejam V juntas.','O primeiro afirma p∧¬p; o segundo afirma p∨¬p falso.','Ambos afirmam que sabemos empiricamente o valor de p.'],'O terceiro excluído garante a disjunção; a não contradição nega a conjunção simultânea.'),
  A('Qual fórmula demonstra a reflexividade de uma proposição na tabela-verdade?',['p↔p, que é sempre V.','p↔¬p, que é sempre V.','p∧¬p, que é sempre V.'],'p↔p compara a mesma proposição consigo mesma e não se confunde com a igualdade a=a entre indivíduos.'),
  A('Qual fórmula expressa a não contradição como uma tautologia?',['¬(p∧¬p).','p∧¬p.','¬(p∨¬p).'],'p∧¬p é sempre F, portanto sua negação é sempre V na lógica clássica.'),
  A('Qual classificação corresponde a p∨q?',['Contingência.','Tautologia porque é uma disjunção.','Contradição porque as variáveis podem ser ambas falsas.'],'É F somente em F,F, mas V em outras interpretações.'),
  A('Uma fórmula tem coluna final V,V,F,V. Ela é...',['Contingente.','Tautológica porque três linhas são V.','Contraditória porque existe uma linha F.'],'A presença de V e F caracteriza contingência.')
 ],
 equivalencias:[
  C('Qual condição define equivalência lógica entre duas fórmulas?',['Ter o mesmo valor em toda atribuição às variáveis.','Ter o mesmo número de símbolos lógicos.','Ter o mesmo valor na interpretação escolhida pelo aluno.'],'Uma coincidência pontual não demonstra equivalência.'),
  C('Por que a cadeia de transformações deve justificar cada passo?',['Um único passo não equivalente invalida a igualdade semântica da cadeia.','Toda cadeia com três passos é necessariamente equivalente.','A equivalência final dispensa examinar os passos intermediários.'],'A demonstração depende de cada transição preservar valores.'),
  C('Qual transformação elimina corretamente uma condicional p→q?',['¬p∨q.','p∨¬q.','p∧q.'],'A condicional só falha em p V, q F, exatamente como ¬p∨q.'),
  C('A dupla negação ¬¬p conserva...',['O valor de verdade de p.','O valor oposto ao de p.','A verdade somente quando p é verdadeira.'],'Duas inversões recuperam o valor original.'),
  A('Qual expressão equivale a ¬(p→q)?',['p∧¬q.','¬p∧q.','p∨¬q.'],'A condicional é falsa somente no caso p verdadeiro e q falso.'),
  A('Qual identidade é válida para p∨(p∧q)?',['É equivalente a p (absorção).','É equivalente a q (eliminação de p).','É equivalente a p∧q (distribuição).'],'Se p é V, toda expressão é V; se p é F, ambos são F.'),
  A('Qual passo usa corretamente a distributividade?',['p∧(q∨r) ≡ (p∧q)∨(p∧r).','p∧(q∨r) ≡ (p∨q)∧r.','p∧(q∨r) ≡ (p∧q)∧r.'],'A conjunção de p distribui-se pelos termos da disjunção.'),
  A('Qual exemplo refuta a equivalência entre p→q e q→p?',['p=F e q=V.','p=V e q=V.','p=F e q=F.'],'Quando p=F,q=V, p→q é V e q→p é F.')
 ],
 arvores:[
  C('Em um tableau de validade, por que negamos a conclusão na raiz?',['Para buscar modelo em que as premissas sejam verdadeiras e a conclusão falsa.','Para provar que a conclusão é falsa no mundo efetivo.','Para restringir todas as premissas a valores falsos.'],'O tableau testa a satisfatibilidade de premissas e negação da conclusão.'),
  C('O que caracteriza o fechamento de um ramo de tableau?',['Conter uma fórmula e sua negação no mesmo ramo.','Conter ao menos duas fórmulas diferentes.','Conter uma disjunção que produz duas alternativas.'],'Uma contradição local impede interpretação que satisfaça aquele ramo.'),
  C('O que representa um ramo aberto completo e consistente?',['Uma interpretação candidata a satisfazer as fórmulas daquele ramo.','Um erro obrigatório no algoritmo de decomposição.','Uma demonstração de que as fórmulas são tautológicas.'],'Ramos abertos consistentes permitem construir modelos.'),
  C('Quando todos os ramos fecham ao testar premissas com negação da conclusão, o argumento é...',['Válido, porque não existe contraexemplo satisfatório.','Inválido, porque não foi possível construir um modelo.','Sólido, mesmo sem conhecer a verdade das premissas.'],'Fechamento total exclui contraexemplos, mas não prova verdade factual das premissas.'),
  A('Para testar p→q, p ⊨ q, qual conjunto vai na raiz?',['p→q, p e ¬q.','p→q, p e q.','p→q, ¬p e q.'],'Buscamos premissas V com conclusão F.'),
  A('Num ramo estão p e ¬p. Qual ação é justificada?',['Fechar o ramo por inconsistência.','Marcar o ramo como modelo completo.','Descartar ¬p e continuar apenas com p.'],'Nenhuma interpretação satisfaz uma fórmula e sua negação.'),
  A('Para decompor p∨q verdadeira, qual expansão é correta?',['Criar dois ramos alternativos, um com p e outro com q.','Adicionar p e q obrigatoriamente ao mesmo ramo.','Fechar o ramo se uma das alternativas for falsa.'],'Uma disjunção pode ser satisfeita por qualquer uma das alternativas.'),
  A('Um tableau para p∨q ⊨ p deixa ramo aberto com p=F, q=V. O que isso mostra?',['O argumento é inválido: premissa verdadeira, conclusão falsa.','O argumento é válido porque há ao menos um ramo aberto.','A premissa é contraditória porque p está falsa.'],'A interpretação p=F,q=V satisfaz p∨q e refuta p.')
 ]
};
