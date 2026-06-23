import { TrendingUp, TrendingDown } from 'lucide-react';
import { useMarket } from '../hooks/useMarket';

export function AllCoins() {
  const { analysis, loading } = useMarket();

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-zinc-400">Loading...</p>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="w-full h-full overflow-hidden flex flex-col">
        <div className="flex-shrink-0 px-4 pt-6 pb-4 border-b border-zinc-800">
          <h1 className="text-2xl font-bold text-white">All Coins</h1>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-zinc-400">Run an analysis first</p>
        </div>
      </div>
    );
  }

  const sorted = [...analysis.allCoinsAnalyzed]
    .sort((a, b) => b.confidence * (b.overallScore / 100) - a.confidence * (a.overallScore / 100));

  return (
    <div className="w-full h-full overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 px-4 pt-6 pb-4 border-b border-zinc-800">
        <h1 className="text-2xl font-bold text-white">All Coins</h1>
        <p className="text-sm text-zinc-400 mt-1">Ranked by opportunity strength</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollable">
        <div className="px-4 pt-4 pb-4 space-y-2">
          {sorted.map((coin, index) => {
            const isBullish = coin.buySignalStrength > 20;
            const Icon = isBullish ? TrendingUp : TrendingDown;
            const colors = isBullish
              ? 'bg-emerald-950 border-emerald-800 text-emerald-400'
              : 'bg-rose-950 border-rose-800 text-rose-400';

            const score = coin.confidence * (coin.overallScore / 100);

            return (
              <div key={coin.symbol} className={`${colors} border rounded-lg p-3`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 flex-1">
                    <Icon size={16} />
                    <div>
                      <h3 className="font-bold text-white text-sm">{coin.symbol}</h3>
                      <p className="text-xs text-zinc-400">{coin.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">{score.toFixed(0)}</p>
                    <p className="text-xs text-zinc-400">Score</p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-1 text-xs">
                  <div className="bg-black/30 rounded px-2 py-1">
                    <p className="text-zinc-500 text-xs">RSI</p>
                    <p className="font-mono">{coin.rsiScore.toFixed(0)}</p>
                  </div>
                  <div className="bg-black/30 rounded px-2 py-1">
                    <p className="text-zinc-500 text-xs">Vol</p>
                    <p className="font-mono">{coin.volumeScore.toFixed(0)}</p>
                  </div>
                  <div className="bg-black/30 rounded px-2 py-1">
                    <p className="text-zinc-500 text-xs">Mom</p>
                    <p className="font-mono">{coin.momentumScore.toFixed(0)}</p>
                  </div>
                  <div className="bg-black/30 rounded px-2 py-1">
                    <p className="text-zinc-500 text-xs">Conf</p>
                    <p className="font-mono">{coin.confidence.toFixed(0)}</p>
                  </div>
                </div>

                <div className="mt-2 flex justify-between items-center text-xs">
                  <span className="text-zinc-400">{coin.change24h > 0 ? '+' : ''}{coin.change24h.toFixed(2)}%</span>
                  <span className="font-mono text-white">${coin.currentPrice.toFixed(2)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
