export function formatterData(date: string): string {
  let currentDate = new Date();
  currentDate.setHours(currentDate.getHours() - 3);
  let formattedDate = currentDate.toISOString();

  return formattedDate;
}
