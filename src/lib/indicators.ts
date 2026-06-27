import type { TechnicalSignals } from './types';

function ema(prices: number[], period: number): number[] {
  if (!prices.length) return [];
  const k = 2 / (period + 1);
  const out = [prices[0]];
  for (let i = 1; i < prices.length; i++) {
    out.push(prices[i] * k + out[i - 1] * (1 - k));
  }
  return out;
}

export function calcRSI(prices: number[], period = 14): number {
  if (prices.length < period + 1) return 50;
  const slice = prices.slice(-(period + 1));
  let gains = 0, losses = 0;
  for (let i = 1; i < slice.length; i++) {
    const d = slice[i] - slice[i - 1];
    if (d > 0) gains += d;
    else losses -= d;
  }
  const ag = gains / period;
  const al = losses / period;
  if (al === 0) return 100;
  return 100 - 100 / (1 + ag / al);
}

export function calcTrend(prices: number[]): TechnicalSignals['trend'] {
  if (prices.length < 26) return 'sideways';
  const e9 = ema(prices, 9);
  const e21 = ema(prices, 21);
  const last9 = e9[e9.length - 1];
  const last21 = e21[e21.length - 1];
  const spread = ((last9 - last21) / last21) * 100;

  const window = prices.slice(-24);
  const recentChg =
    window.length > 1
      ? ((window[window.length - 1] - window[0]) / window[0]) * 100
      : 0;

  if (spread > 2 && recentChg > 1) return 'strong_up';
  if (spread > 0.3) return 'up';
  if (spread < -2 && recentChg < -1) return 'strong_down';
  if (spread < -0.3) return 'down';
  return 'sideways';
}

export function calcEMASignal(prices: number[]): TechnicalSignals['emaSignal'] {
  if (prices.length < 26) return 'neutral';
  const e9 = ema(prices, 9);
  const e21 = ema(prices, 21);
  const len = e9.length;
  const lb = Math.min(6, len - 1);
  const c9 = e9[len - 1], c21 = e21[len - 1];
  const p9 = e9[len - 1 - lb], p21 = e21[len - 1 - lb];

  if (c9 > c21 && p9 <= p21) return 'golden_cross';
  if (c9 < c21 && p9 >= p21) return 'death_cross';
  if (c9 > c21) return 'bullish';
  if (c9 < c21) return 'bearish';
  return 'neutral';
}

export function calcMomentum(prices: number[], period = 14): number {
  if (prices.length <= period) return 0;
  const cur = prices[prices.length - 1];
  const past = prices[prices.length - 1 - period];
  if (!past) return 0;
  return ((cur - past) / past) * 100;
}

export function calcSR(prices: number[]): { support: number; resistance: number } {
  if (prices.length < 5) {
    const p = prices[prices.length - 1] || 0;
    return { support: p * 0.95, resistance: p * 1.05 };
  }
  const w = prices.slice(-72);
  const sorted = [...w].sort((a, b) => a - b);
  return {
    support: sorted[Math.floor(sorted.length * 0.1)],
    resistance: sorted[Math.floor(sorted.length * 0.9)],
  };
}

export function computeSignals(
  sparkline: number[],
  volume24h: number,
  marketCap: number
): TechnicalSignals {
  const prices = sparkline.filter((p) => p > 0);
  const { support, resistance } = calcSR(prices);
  return {
    rsi: calcRSI(prices),
    trend: calcTrend(prices),
    emaSignal: calcEMASignal(prices),
    momentum: calcMomentum(prices),
    relativeVolume: marketCap > 0 ? (volume24h / marketCap) * 100 : 0,
    support,
    resistance,
  };
}
