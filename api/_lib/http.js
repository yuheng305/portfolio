// fetch + JSON with a timeout; throws on non-2xx without leaking credentials from the URL.
export async function fetchJSON(url, { timeoutMs = 8000, ...init } = {}) {
  const res = await fetch(url, { ...init, signal: AbortSignal.timeout(timeoutMs) });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const where = new URL(url).pathname;
    const reason = body?.error?.message || body?.error?.code || body?.error || res.status;
    throw new Error(`${where}: ${typeof reason === "string" ? reason : JSON.stringify(reason)}`);
  }
  return body;
}

// Follows a cursor-style pager until it runs out or hits `maxPages`.
export async function collectPages(fetchPage, maxPages = 25) {
  const items = [];
  let cursor;
  for (let page = 0; page < maxPages; page += 1) {
    const { items: batch, next } = await fetchPage(cursor);
    items.push(...batch);
    if (!next) break;
    cursor = next;
  }
  return items;
}

export const sum = (items, pick) => items.reduce((total, item) => total + (Number(pick(item)) || 0), 0);
