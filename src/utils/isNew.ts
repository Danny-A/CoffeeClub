export function isNew(date: string | Date, days = 14): boolean {
  const created = new Date(date);
  const now = new Date();
  const diff = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);
  return diff <= days;
}
