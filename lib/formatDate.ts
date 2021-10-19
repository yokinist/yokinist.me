export default function formatDate(date: string, local: string) {
  const d = new Date(date);
  const res = d.toLocaleDateString(local, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  return local.slice(0, 2).toLowerCase() === 'zh'
    ? res.replace('年', ' 年 ').replace('月', ' 月 ').replace('日', ' 日')
    : res;
}
