/** Novas aulas preservam os IDs existentes e o formato de avaliações do curso. */
const cq=(question,options,correct,why)=>({question,options,correct,why});
export const COURSE_UNIT13_LESSONS={
  inducao:{
    lead:'Quando uma observação sustenta uma generalização — e quando uma amostra distorce a conclusão?',
    theory:'Indução permite ampliar observações para formular hipóteses gerais, sem a certeza de uma dedução. A força depende da seleção e tamanho da amostra, da população de interesse e dos vieses possíveis. Muitos respondentes de um mesmo grupo não garantem representatividade.',
    example:'Dez colegas de uma turma responderam se gostam da biblioteca; nove disseram sim. Podemos afirmar que 90% de toda a escola gosta dela?',
    steps:['Identifique a população que a conclusão pretende descrever: todos os estudantes da escola.','Compare-a com a amostra observada: dez colegas de uma única turma.','Sem uma seleção adequada da escola inteira, conclua apenas sobre os dez colegas e proponha uma pesquisa mais representativa.'],
    quiz:[
      cq('Uma pesquisa ouviu apenas frequentadores de uma academia. Qual conclusão sobre todos os moradores é adequada?',['Os frequentadores representam automaticamente toda a cidade.','Não podemos generalizar sem avaliar como a amostra foi selecionada.','O resultado é falso porque envolve uma amostra.'],1,'Amostras selecionadas em lugares específicos podem excluir grupos com hábitos diferentes.'),
      cq('Aumentar de 50 para 5.000 entrevistados, todos do mesmo clube, elimina o viés de seleção?',['Sim, o número grande elimina qualquer viés.','Não: o grupo continua podendo diferir da população-alvo.','Sim, porque uma amostra grande é sempre aleatória.'],1,'O tamanho não corrige o fato de a seleção excluir grupos relevantes.'),
      cq('Qual investigação fortalece uma conclusão sobre todos os alunos de uma escola?',['Ouvir alunos de diferentes turmas por seleção previamente definida.','Entrevistar somente os alunos que frequentam a biblioteca.','Descartar respostas que contrariem a hipótese.'],0,'É importante definir a população e uma seleção que reduza vieses de amostragem.'),
      cq('Qual frase é uma conclusão indutiva responsável?',['Os dados da amostra sugerem uma tendência, sujeita a limites e verificação.','A amostra prova uma verdade lógica necessária para a população.','Uma observação favorável elimina qualquer exceção.'],0,'A inferência indutiva vai além dos casos observados e é revisável.')
    ]
  },
  abducao:{
    lead:'Como comparar explicações concorrentes e buscar evidências que realmente as distingam?',
    theory:'Abdução propõe hipóteses capazes de explicar um fato. Mais de uma causa pode produzir a mesma observação. Um teste informativo compara previsões diferentes das hipóteses, sem transformar a explicação mais plausível em uma necessidade dedutiva.',
    example:'O pátio amanheceu molhado. Pode ter chovido ou alguém pode tê-lo lavado. O que verificar?',
    steps:['Identifique o fato observado e formule duas explicações compatíveis.','Procure uma previsão diferente: a chuva deveria molhar também áreas descobertas afastadas, enquanto uma lavagem local não.','Compare essas áreas e ajuste a força das hipóteses de acordo com a nova evidência; não declare certeza sem justificativa.'],
    quiz:[
      cq('Uma planta murchou. O que caracteriza uma hipótese abdutiva?',['Uma explicação possível, como falta de água, que precisa ser testada.','Uma consequência logicamente necessária de qualquer murchamento.','Uma regra de tabela-verdade.'],0,'Murchamento admite causas diferentes; a abdução compara explicações possíveis.'),
      cq('Por que observar novamente o mesmo fato costuma ser pouco discriminativo?',['Porque ambas as hipóteses já explicam o fato inicial.','Porque dados repetidos sempre falsificam uma hipótese.','Porque nenhuma hipótese pode ser comparada.'],0,'O teste útil busca previsões que separam as explicações.'),
      cq('Qual é uma evidência que diferencia chuva de lavagem do pátio?',['Verificar se outras áreas descobertas distantes também estão molhadas.','Confirmar que o pátio está molhado.','Escolher a explicação mais familiar.'],0,'A abrangência espacial pode ajudar a discriminar as hipóteses concorrentes.'),
      cq('Uma hipótese foi favorecida por novas observações. O que se conclui?',['Ela é a melhor explicação até agora, mas permanece revisável.','Ela se tornou uma verdade dedutiva sem exceções.','Toda hipótese alternativa tornou-se impossível.'],0,'Abdução ajusta a força explicativa segundo a evidência, sem garantir certeza absoluta.')
    ]
  },
  probabilidade:{
    lead:'Como a taxa de base altera o significado de um resultado positivo e como calcular uma probabilidade condicional?',
    theory:'P(positivo | condição) não é P(condição | positivo). Para estimar esta última, conte resultados positivos verdadeiros e falsos: verdadeiros positivos ÷ total de positivos. O número prévio de casos na população, a taxa de base, modifica o significado de um resultado positivo.',
    example:'Em 1.000 pessoas, 10 têm uma condição. O teste identifica 8 delas, mas produz 99 positivos entre as 990 sem a condição. Quantos positivos indicam um caso real?',
    steps:['Há 8 positivos verdadeiros e 99 positivos falsos: são 107 resultados positivos.','A proporção de casos reais entre os positivos é 8 ÷ 107 ≈ 7,5%.','Compare com a sensibilidade, 8 ÷ 10 = 80%: as duas probabilidades usam denominadores diferentes.'],
    quiz:[
      cq('Um teste identifica corretamente 80% dos casos reais. Isso é igual à chance de estar doente após resultado positivo?',['Sim, sempre.','Não, também precisamos da taxa de base e dos falsos positivos.','Sim, desde que haja muitos testes.'],1,'Sensibilidade P(positivo | condição) não é a proporção P(condição | positivo).'),
      cq('Um conjunto teve 20 positivos, dos quais 5 são casos reais. Qual proporção dos positivos é verdadeira?',['25%.','75%.','5%.'],0,'Divida 5 por 20: 0,25 = 25%. O denominador é o número total de positivos.'),
      cq('Há 8 positivos verdadeiros e 12 falsos positivos. Quantos positivos existem ao todo?',['8.','12.','20.'],2,'Some os dois tipos de resultado positivo: 8 + 12 = 20.'),
      cq('A taxa de base de uma condição é:',['A proporção de pessoas com a condição na população considerada.','A porcentagem de positivos que são falsos.','A chance de positivo entre quem tem a condição.'],0,'Taxa de base é a prevalência anterior, não a sensibilidade nem a proporção entre positivos.')
    ]
  },
  causalidade:{
    lead:'Como separar associação, confundimento e efeito causal em situações reais?',
    theory:'Correlação é associação entre variáveis; pode surgir por causa comum, causalidade reversa ou coincidência. Inferir causalidade exige uma comparação que investigue o que mudaria com e sem a intervenção, controlando fatores relevantes. Experimentos aleatorizados ajudam quando viáveis; estudos observacionais requerem cuidado.',
    example:'Dias quentes apresentam mais vendas de sorvete e mais afogamentos. O sorvete provoca afogamentos?',
    steps:['Separe a associação observada da hipótese causal proposta.','Identifique uma causa comum plausível: o calor aumenta tanto o consumo de sorvete quanto a exposição à água.','Para estudar causas, compare situações semelhantes quanto ao calor e à exposição à água, em vez de concluir pelo simples crescimento conjunto.'],
    quiz:[
      cq('Vendas de sorvete e afogamentos aumentam em dias quentes. Qual possível confundidor?',['Temperatura.','Cor da embalagem do sorvete.','O nome da praia.'],0,'O calor influencia tanto o consumo de sorvete quanto a exposição à água.'),
      cq('Qual afirmação diferencia correlação de causalidade?',['Duas variáveis associadas não provam uma causa direta entre elas.','Toda correlação demonstra causalidade.','Correlação torna qualquer investigação inútil.'],0,'A associação pode ter outras explicações: causas comuns, sentido inverso ou acaso.'),
      cq('Estudantes em reforço têm notas menores. O que deve ser considerado antes de concluir que o reforço prejudica?',['Eles podem ter começado com maiores dificuldades.','Que os alunos de reforço são necessariamente iguais aos demais.','Que médias não podem ser comparadas.'],0,'Diferenças prévias podem causar tanto a procura por reforço quanto notas menores.'),
      cq('Qual procedimento tende a fortalecer a identificação causal?',['Comparar grupos com condições iniciais semelhantes e controlar fatores relevantes.','Observar apenas pessoas que tiveram o resultado esperado.','Ignorar causas alternativas.'],0,'Boas comparações reduzem explicações concorrentes; a interpretação depende do desenho e de seus limites.')
    ]
  }
};
