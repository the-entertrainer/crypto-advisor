import { useEffect } from 'react';
import { TrendingUp, TrendingDown, Loader, Zap } from 'lucide-react';
import { useMarket } from '../hooks/useMarket';

export function Dashboard() {
  const { analysis, loading, error, runAnalysis } = useMarket();

  useEffect(() => {
    runAnalysis();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader className="animate-spin text-emerald-500" size={40} />
          <p className="text-sm text-zinc-400">Analyzing 50+ cryptocurrencies...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full overflow-hidden flex flex-col">
        <div className="flex-shrink-0 px-4 pt-6 pb-4 border-b border-zinc-800">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        </div>
        <div className="flex-1 overflow-y-auto scrollable px-4 pt-6">
          <div className="bg-rose-950 border border-rose-900 rounded-lg p-4">
            <p className="text-sm text-rose-300">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return null;
  }

  const { topOpportunities, marketOutlook, strategy } = analysis;

  const sentimentEmoji = {
    very_bullish: '🚀',
    bullish: '📈',
    neutral: '➡️',
    bearish: '📉',
    very_bearish: '⚠️',
  }[marketOutlook.sentiment];

  return (
    <div className="w-full h-full overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 px-4 pt-6 pb-4 border-b border-zinc-800">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-zinc-400 mt-1">Your AI-powered trading signals</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollable px-4 pt-6">
        {/* Market Status */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 mb-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-xs text-zinc-500 mb-1">MARKET SENTIMENT</p>
              <p className="text-xl font-bold text-white">
                {sentimentEmoji} {marketOutlook.sentiment.toUpperCase()}
              </p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 mb-1">VOLATILITY</p>
              <p className="text-lg font-bold text-emerald-400">{marketOutlook.volatilityLevel.toUpperCase()}</p>
            </div>
          </div>
          <p className="text-xs text-zinc-400">Strategy: {strategy.name}</p>
        </div>

        {/* Top Opportunities */}
        <h2 className="text-sm font-semibold text-white mb-3">🎯 Best Opportunities Today</h2>
        <div className="space-y-3 mb-6">
          {topOpportunities.map((signal, index) => {
            const isPositive = signal.action === 'buy';
            const Icon = isPositive ? TrendingUp : TrendingDown;
            const bgColor = isPositive ? 'bg-emerald-950 border-emerald-800' : 'bg-rose-950 border-rose-800';
            const textColor = isPositive ? 'text-emerald-400' : 'text-rose-400';

            return (
              <div key={signal.coin.symbol} className={`${bgColor} border rounded-lg p-4`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Icon size={20} className={textColor} />
                    <div>
                      <h3 className="font-bold text-white">{signal.coin.symbol}</h3>
                      <p className="text-xs text-zinc-400">{signal.coin.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold ${textColor}`}>{signal.action.toUpperCase()}</p>
                    <p className="text-xs text-zinc-400">{signal.expectedProfit > 0 ? '+' : ''}{signal.expectedProfit.toFixed(1)}%</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
                  <div className="bg-black/30 rounded p-2">
                    <p className="text-zinc-500">Entry</p>
                    <p className="font-mono text-white">${signal.entryPrice.toFixed(2)}</p>
                  </div>
                  <div className="bg-black/30 rounded p-2">
                    <p className="text-zinc-500">Target</p>
                    <p className="font-mono text-white">${signal.targetPrice.toFixed(2)}</p>
                  </div>
                  <div className="bg-black/30 rounded p-2">
                    <p className="text-zinc-500">Stop</p>
                    <p className="font-mono text-white">${signal.stopLossPrice.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400">R:R {signal.riskRewardRatio.toFixed(2)}:1</span>
                  <span className={`font-bold ${textColor}`}>{signal.winProbability.toFixed(0)}% win prob</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Stats */}
        <h2 className="text-sm font-semibold text-white mb-3">📊 Market Stats</h2>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 mb-4">
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-zinc-400">Best Opportunity</span>
              <span className="font-bold text-emerald-400">{marketOutlook.bestOpportunity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Coins Analyzed</span>
              <span className="font-bold text-white">50+</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Analysis Updated</span>
              <span className="text-white font-mono">Just now</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={runAnalysis}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2 mb-4"
        >
          <Zap size={16} />
          Re-analyze All Coins
        </button>
      </div>
    </div>
  );
}
