export function dateStr(date: Date = new Date()): string {
    const d = ('0' + date.getDate()).substr(-2);
    const m = ('0' + String(date.getMonth() + 1)).substr(-2);
    const y = date.getFullYear();

    return `${y}-${m}-${d}`;
}
