export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  price: number;
  change1h: number;
  change24h: number;
  change7d: number;
  marketCap: number;
  volume24h: number;
  sparkline: number[];
  rank: number;
}

export interface GlobalData {
  btcDominance: number;
  totalMarketCap: number;
  marketCapChange24h: number;
}

export interface FearGreedData {
  value: number;
  label: string;
}

export interface TechnicalSignals {
  rsi: number;
  trend: 'strong_up' | 'up' | 'sideways' | 'down' | 'strong_down';
  emaSignal: 'golden_cross' | 'bullish' | 'neutral' | 'bearish' | 'death_cross';
  momentum: number;
  relativeVolume: number;
  support: number;
  resistance: number;
}

export type Signal = 'strong_buy' | 'buy' | 'wait' | 'avoid';

export interface CoinInsight {
  coin: CoinData;
  signal: Signal;
  confidence: number;
  entry: number;
  target: number;
  stopLoss: number;
  riskPct: number;
  rewardPct: number;
  narrative: string;
  bullets: string[];
  technical: TechnicalSignals;
  timeframe: string;
}

export interface UserPrefs {
  riskTolerance: 'conservative' | 'balanced' | 'aggressive';
  coinsToTrack: 10 | 20 | 30;
}
