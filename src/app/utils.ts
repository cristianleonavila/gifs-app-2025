export const loadFromLocalStorate = (key:string) => {
  const data = localStorage.getItem(key) ?? '{}';
  return JSON.parse(data);
}
