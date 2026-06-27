import type { CoinData, GlobalData, FearGreedData } from './types';

const BASE = 'https://api.coingecko.com/api/v3';

const cache = new Map<string, { data: unknown; ts: number }>();
const TTL = 5 * 60 * 1000;

async function withCache<T>(key: string, fn: () => Promise<T>): Promise<T> {
  const hit = cache.get(key);
  if (hit && Date.now() - hit.ts < TTL) return hit.data as T;
  const data = await fn();
  cache.set(key, { data, ts: Date.now() });
  return data;
}

export function bustCache() {
  cache.clear();
}

export async function fetchCoins(limit: number): Promise<CoinData[]> {
  return withCache(`coins_${limit}`, async () => {
    const url =
      `${BASE}/coins/markets` +
      `?vs_currency=usd` +
      `&order=market_cap_desc` +
      `&per_page=${limit}` +
      `&page=1` +
      `&sparkline=true` +
      `&price_change_percentage=1h%2C24h%2C7d`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`CoinGecko ${res.status}`);
    const raw: any[] = await res.json();

    return raw.map((c, i) => ({
      id: c.id,
      symbol: (c.symbol as string).toUpperCase(),
      name: c.name,
      image: c.image,
      price: c.current_price ?? 0,
      change1h: c.price_change_percentage_1h_in_currency ?? 0,
      change24h: c.price_change_percentage_24h ?? 0,
      change7d: c.price_change_percentage_7d_in_currency ?? 0,
      marketCap: c.market_cap ?? 0,
      volume24h: c.total_volume ?? 0,
      sparkline: (c.sparkline_in_7d?.price as number[]) ?? [],
      rank: i + 1,
    }));
  });
}

export async function fetchGlobal(): Promise<GlobalData> {
  return withCache('global', async () => {
    const res = await fetch(`${BASE}/global`);
    if (!res.ok) throw new Error(`CoinGecko global ${res.status}`);
    const { data } = await res.json();
    return {
      btcDominance: data.market_cap_percentage?.btc ?? 0,
      totalMarketCap: data.total_market_cap?.usd ?? 0,
      marketCapChange24h: data.market_cap_change_percentage_24h_usd ?? 0,
    };
  });
}

export async function fetchFearGreed(): Promise<FearGreedData> {
  return withCache('fg', async () => {
    try {
      const res = await fetch('https://api.alternative.me/fng/?limit=1');
      if (!res.ok) return { value: 50, label: 'Neutral' };
      const json = await res.json();
      return {
        value: parseInt(json.data[0].value, 10),
        label: json.data[0].value_classification as string,
      };
    } catch {
      return { value: 50, label: 'Neutral' };
    }
  });
}
