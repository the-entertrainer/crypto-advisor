'use client';

import { useEffect, useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Loader,
  RefreshCw,
} from 'lucide-react';
import ConfidenceRing from './ConfidenceRing';

interface Analysis {
  prediction: 'buy' | 'sell' | 'hold';
  confidence: number;
  reasoning: string[];
  market_signal: string;
}

export default function AITerminal() {
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalysis = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          market_data: {
            btc_price: 67450,
            btc_change_24h: 2.45,
            eth_price: 3520,
            eth_change_24h: 1.82,
            sol_price: 142.8,
            sol_change_24h: -1.23,
          },
          news:
            'Bitcoin ETF approval, Ethereum Merge 2.0 update, Large whale movements detected',
        }),
      });

      if (!response.ok) throw new Error('Failed to fetch analysis');
      const data = await response.json();
      setAnalysis(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An error occurred'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalysis();
  }, []);

  const predictionColor = {
    buy: { bg: 'bg-emerald-950', text: 'text-emerald-400', icon: TrendingUp },
    sell: { bg: 'bg-rose-950', text: 'text-rose-400', icon: TrendingDown },
    hold: { bg: 'bg-amber-950', text: 'text-amber-400', icon: AlertCircle },
  }[analysis?.prediction || 'hold'];

  const IconComponent = predictionColor.icon;

  return (
    <div className="w-full h-full overflow-hidden flex flex-col">
      {/* Header - Fixed */}
      <div className="flex-shrink-0 px-4 pt-6 pb-4 border-b border-zinc-800">
        <h1 className="text-2xl font-bold text-white">AI Analysis</h1>
        <p className="text-sm text-zinc-400 mt-1">Market prediction & insights</p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto scrollable px-4 pt-6">
        {error && (
          <div className="bg-rose-950 border border-rose-900 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-rose-500 flex-shrink-0" size={20} />
              <div>
                <p className="text-sm font-semibold text-rose-300">Error</p>
                <p className="text-xs text-rose-200 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Main Prediction Card */}
        {analysis && !loading ? (
          <>
            <div className={`${predictionColor.bg} border border-zinc-800 rounded-lg p-6 mb-6`}>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-xs text-zinc-500 mb-2">PREDICTION</p>
                  <div className="flex items-center gap-2">
                    <IconComponent size={28} className={predictionColor.text} />
                    <h2 className={`text-3xl font-bold ${predictionColor.text}`}>
                      {analysis.prediction.toUpperCase()}
                    </h2>
                  </div>
                </div>
                <ConfidenceRing confidence={analysis.confidence} />
              </div>

              <p className="text-sm text-zinc-300">
                {analysis.market_signal}
              </p>
            </div>

            {/* Reasoning Section */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-white mb-3">Why?</h3>
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
                <ul className="space-y-2">
                  {analysis.reasoning.map((reason, index) => (
                    <li key={index} className="flex gap-3 text-sm text-zinc-300">
                      <span className="text-emerald-500 font-bold flex-shrink-0">
                        •
                      </span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Analysis Timestamp */}
            <div className="text-xs text-zinc-500 text-center py-4 border-t border-zinc-800">
              Analysis updated now
            </div>
          </>
        ) : loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader className="animate-spin text-emerald-500 mb-4" size={32} />
            <p className="text-sm text-zinc-400">Analyzing market data...</p>
          </div>
        ) : null}

        {/* Refresh Button */}
        <div className="mb-4">
          <button
            onClick={fetchAnalysis}
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-900 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw size={16} />
            Refresh Analysis
          </button>
        </div>

        {/* Info Section */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 mb-4">
          <h4 className="text-xs font-semibold text-zinc-300 mb-2 uppercase">
            How it works
          </h4>
          <p className="text-xs text-zinc-400 leading-relaxed">
            AI analyzes real-time market data, price movements, and global news
            to generate buy/sell/hold predictions with confidence scores. Not
            financial advice.
          </p>
        </div>
      </div>
    </div>
  );
}
