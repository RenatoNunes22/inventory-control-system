export function formatterData(date: string): string {
  // Obter a data e hora atual
  const dataAtual = new Date();

  // Subtrair 3 horas
  dataAtual.setUTCHours(dataAtual.getUTCHours() - 3);

  // Formatar a data no formato desejado
  const horas = `0${dataAtual.getUTCHours()}`.slice(-2);
  const minutos = `0${dataAtual.getUTCMinutes()}`.slice(-2);
  const segundos = `0${dataAtual.getUTCSeconds()}`.slice(-2);
  const dia = `0${dataAtual.getUTCDate()}`.slice(-2);
  const mes = `0${dataAtual.getUTCMonth() + 1}`.slice(-2); // Adiciona 1, pois os meses começam do zero
  const ano = dataAtual.getUTCFullYear();

  const dataFormatada = `${ano}-${mes}-${dia}T${horas}:${minutos}:${segundos}.000Z`;

  return dataFormatada;
}
