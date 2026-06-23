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

export interface Analysis {
  prediction: 'buy' | 'sell' | 'hold';
  confidence: number;
  reasoning: string[];
  market_signal: string;
}

export interface MarketContextType {
  cryptoData: CryptoData[];
  feedItems: FeedItem[];
  analysis: Analysis | null;
  loading: boolean;
  error: string | null;
  fetchAnalysis: () => Promise<void>;
}
