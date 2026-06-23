export type TabType = 'dashboard' | 'feed' | 'terminal' | 'settings';

export interface CryptoData {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  chartData: number[];
}

export interface FeedItem {
  id: string;
  type: 'news' | 'alert';
  title: string;
  description: string;
  tag: string;
  timestamp: string;
  impact: 'high' | 'medium' | 'low';
  relatedAssets?: string[];
}

export interface CryptoRecommendation {
  symbol: string;
  action: 'buy' | 'hold' | 'sell' | 'avoid';
  reason: string;
  potential: string; // e.g., "+15-20%" or "Stable"
}

export interface Analysis {
  market_analysis: string;
  overall_sentiment: 'very_bullish' | 'bullish' | 'neutral' | 'bearish' | 'very_bearish';
  confidence: number;
  buys: CryptoRecommendation[];
  avoids: CryptoRecommendation[];
  market_events: string[];
}

export interface MarketContextType {
  cryptoData: CryptoData[];
  feedItems: FeedItem[];
  analysis: Analysis | null;
  loading: boolean;
  error: string | null;
  fetchAnalysis: () => Promise<void>;
}
