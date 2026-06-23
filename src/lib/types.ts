// User's Trading Strategy Definition
export interface TradingStrategy {
  name: string;
  timeframe: '1h' | '4h' | '1d';
  maxRisk: number; // 1-5%
  minWinRate: number; // 50-80%
  factors: {
    rsiWeight: number; // 0-10
    volumeWeight: number; // 0-10
    momentumWeight: number; // 0-10
    supportResistanceWeight: number; // 0-10
    trendWeight: number; // 0-10
    volatilityWeight: number; // 0-10
  };
  minConfidence: number; // 60-95%
}

// Mathematical Analysis for a Single Coin
export interface CoinMetrics {
  symbol: string;
  name: string;
  currentPrice: number;
  change24h: number;
  volume24h: number;
  marketCap: number;

  // Technical Indicators (0-100)
  rsiScore: number;
  volumeScore: number;
  momentumScore: number;
  supportResistanceScore: number;
  trendScore: number;
  volatilityScore: number;

  // Calculated Values
  overallScore: number; // 0-100 based on strategy weights
  confidence: number; // 0-100
  buySignalStrength: number; // -100 to 100
}

// Trade Signal with Entry/Exit Points
export interface TradeSignal {
  coin: CoinMetrics;
  action: 'buy' | 'sell' | 'hold' | 'avoid';
  entryPrice: number;
  targetPrice: number;
  stopLossPrice: number;
  riskRewardRatio: number;
  holdDuration: '4-6h' | '12h' | '1d' | '2d';
  expectedProfit: number; // percentage
  winProbability: number; // 0-100
}

// Chain of Thought - Shows Mathematical Reasoning
export interface ChainOfThought {
  coin: string;
  steps: {
    step: number;
    title: string;
    calculation: string;
    result: number;
    explanation: string;
  }[];
  finalConclusion: string;
  confidenceBreakdown: {
    factor: string;
    weight: number;
    score: number;
    contribution: number;
  }[];
  totalConfidence: number;
}

// Complete Analysis Result
export interface AnalysisResult {
  strategy: TradingStrategy;
  timestamp: string;
  topOpportunities: TradeSignal[];
  allCoinsAnalyzed: CoinMetrics[];
  reasoningChains: ChainOfThought[];
  marketOutlook: {
    sentiment: 'very_bullish' | 'bullish' | 'neutral' | 'bearish' | 'very_bearish';
    volatilityLevel: 'low' | 'medium' | 'high' | 'extreme';
    bestOpportunity: string;
    worstRisk: string;
  };
}
