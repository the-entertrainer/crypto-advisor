import { useEffect } from 'react';
import { TrendingUp, TrendingDown, AlertCircle, Loader, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import { useMarket } from '../hooks/useMarket';
import { ConfidenceRing } from './ConfidenceRing';

export function AITerminal() {
  const { analysis, loading, error, fetchAnalysis } = useMarket();

  useEffect(() => {
    fetchAnalysis();
  }, []);

  const sentimentColor = analysis
    ? {
        very_bullish: { bg: 'bg-emerald-950', text: 'text-emerald-400', label: '🚀 VERY BULLISH' },
        bullish: { bg: 'bg-emerald-900', text: 'text-emerald-300', label: '📈 BULLISH' },
        neutral: { bg: 'bg-amber-900', text: 'text-amber-300', label: '➡️ NEUTRAL' },
        bearish: { bg: 'bg-rose-900', text: 'text-rose-300', label: '📉 BEARISH' },
        very_bearish: { bg: 'bg-rose-950', text: 'text-rose-400', label: '⚠️ VERY BEARISH' },
      }[analysis.overall_sentiment]
    : { bg: 'bg-amber-900', text: 'text-amber-300', label: '➡️ NEUTRAL' };

  return (
    <div className="w-full h-full overflow-hidden flex flex-col">
      <div className="flex-shrink-0 px-4 pt-6 pb-4 border-b border-zinc-800">
        <h1 className="text-2xl font-bold text-white">Market Intelligence</h1>
        <p className="text-sm text-zinc-400 mt-1">AI prediction & investment signals</p>
      </div>

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

        {analysis && !loading ? (
          <>
            {/* Market Sentiment */}
            <div className={`${sentimentColor.bg} border border-zinc-700 rounded-lg p-5 mb-6`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs text-zinc-400 mb-2 uppercase font-semibold">Market Sentiment</p>
                  <h2 className={`text-2xl font-bold ${sentimentColor.text}`}>{sentimentColor.label}</h2>
                </div>
                <ConfidenceRing confidence={analysis.confidence} />
              </div>
              <p className="text-sm text-zinc-200">{analysis.market_analysis}</p>
            </div>

            {/* Market Events */}
            {analysis.market_events.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-white mb-3">Market Events</h3>
                <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 space-y-2">
                  {analysis.market_events.map((event, index) => (
                    <div key={index} className="flex gap-3 text-sm">
                      <span className="text-amber-400 font-bold flex-shrink-0">•</span>
                      <p className="text-zinc-300">{event}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Buy Recommendations */}
            {analysis.buys.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle size={18} className="text-emerald-400" />
                  <h3 className="text-sm font-semibold text-white">Cryptos to Buy Now</h3>
                </div>
                <div className="space-y-3">
                  {analysis.buys.map((rec, index) => (
                    <div key={index} className="bg-emerald-950 border border-emerald-800 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-base font-bold text-emerald-300">{rec.symbol}</h4>
                        <span className="text-xs font-semibold text-emerald-400 bg-emerald-900 px-2 py-1 rounded">
                          {rec.potential}
                        </span>
                      </div>
                      <p className="text-sm text-emerald-100">{rec.reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Avoid Recommendations */}
            {analysis.avoids.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <XCircle size={18} className="text-rose-400" />
                  <h3 className="text-sm font-semibold text-white">Cryptos to Avoid</h3>
                </div>
                <div className="space-y-3">
                  {analysis.avoids.map((rec, index) => (
                    <div key={index} className="bg-rose-950 border border-rose-800 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-base font-bold text-rose-300">{rec.symbol}</h4>
                        <span className="text-xs font-semibold text-rose-400 bg-rose-900 px-2 py-1 rounded">
                          {rec.potential}
                        </span>
                      </div>
                      <p className="text-sm text-rose-100">{rec.reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="text-xs text-zinc-500 text-center py-4 border-t border-zinc-800">
              Last updated: Just now
            </div>
          </>
        ) : loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader className="animate-spin text-emerald-500 mb-4" size={32} />
            <p className="text-sm text-zinc-400">Analyzing market events...</p>
          </div>
        ) : null}

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

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 mb-4">
          <h4 className="text-xs font-semibold text-zinc-300 mb-2 uppercase">📊 How It Works</h4>
          <p className="text-xs text-zinc-400 leading-relaxed">
            AI analyzes market events, news catalysts, and price action to predict which cryptocurrencies will rise
            and which to avoid. Recommendations based on fundamental + technical analysis. Not financial advice.
          </p>
        </div>
      </div>
    </div>
  );
}
