/** Orientação contextual sem acrescentar painéis ou chamadas de ação duplicadas. */
export function courseScreenContext(view, lesson=null) {
  if(view==='exam')return {
    location:'CURSO GUIADO / AVALIAÇÃO FINAL',
    description:'Responda às 12 questões e corrija a avaliação. Volte ao mapa para escolher outra aula ou revisar seus resultados.'
  };
  if(view==='lesson')return {
    location:`CURSO GUIADO / AULA ${lesson?.no||''} · ${lesson?.name||'Tema'}`.trim(),
    description:'Leia, acompanhe o exemplo e avance pelas atividades desta aula. Para estudar outro assunto, use Mapa das unidades.'
  };
  return {
    location:'CURSO GUIADO / MAPA DAS UNIDADES',
    description:'Escolha uma aula para estudar, consulte suas revisões ou abra a avaliação integrada. Cada tema mostra seu estágio atual.'
  };
}

export function exerciseScreenContext({moduleName,stage=null,graded=false,revealed=false}) {
  const stages={
    guided:'PRÁTICA COM AJUDA',
    independent:'PRÁTICA INDEPENDENTE',
    review:'REVISÃO ESPAÇADA'
  };
  const label=stage?stages[stage]||'ATIVIDADE DO CURSO':'PRÁTICA LIVRE';
  const description=revealed
    ?'A resolução está disponível abaixo. Use Próximo para começar outro desafio ou volte à aula ou aos módulos.'
    :graded
      ?'Confira a correção e o resultado da etapa. Você pode revisar respostas, tentar outro exercício ou voltar.'
      :stage==='review'
        ?'Resolva sem dicas para validar a revisão; depois use Corrigir. Volte à aula para acompanhar a consolidação.'
        :stage==='independent'
          ?'Resolva sem dicas e use Corrigir. A primeira correção determina se a etapa independente será validada.'
          :stage==='guided'
            ?'Preencha as respostas, consulte dicas se precisar e use Corrigir. Depois, volte à aula para continuar.'
            :'Resolva as questões e use Corrigir. Você pode pedir uma dica, trocar a dificuldade ou voltar aos módulos.';
  return {location:`${label} / ${moduleName}`.toUpperCase(),description};
}
