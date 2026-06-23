import React, { createContext, useState, ReactNode } from 'react';
import { TradingStrategy, AnalysisResult } from '../lib/types';
import { analyzeWithMathematicalLogic, DEFAULT_STRATEGY } from '../lib/analysis';

export interface MarketContextType {
  strategy: TradingStrategy;
  setStrategy: (strategy: TradingStrategy) => void;
  analysis: AnalysisResult | null;
  loading: boolean;
  error: string | null;
  runAnalysis: () => Promise<void>;
}

export const MarketContext = createContext<MarketContextType | undefined>(undefined);

export function MarketProvider({ children }: { children: ReactNode }) {
  const [strategy, setStrategy] = useState<TradingStrategy>(DEFAULT_STRATEGY);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runAnalysis = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeWithMathematicalLogic(strategy);
      setAnalysis(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
      setAnalysis(null);
    } finally {
      setLoading(false);
    }
  };

  const value: MarketContextType = {
    strategy,
    setStrategy,
    analysis,
    loading,
    error,
    runAnalysis,
  };

  return <MarketContext.Provider value={value}>{children}</MarketContext.Provider>;
}
