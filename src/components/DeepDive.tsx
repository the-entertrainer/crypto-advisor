import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useMarket } from '../hooks/useMarket';

export function DeepDive() {
  const { analysis, loading } = useMarket();
  const [expandedCoin, setExpandedCoin] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-zinc-400">Loading analysis...</p>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="w-full h-full overflow-hidden flex flex-col">
        <div className="flex-shrink-0 px-4 pt-6 pb-4 border-b border-zinc-800">
          <h1 className="text-2xl font-bold text-white">Deep Dive</h1>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-zinc-400">Run an analysis first</p>
        </div>
      </div>
    );
  }

  const { reasoningChains, topOpportunities } = analysis;

  return (
    <div className="w-full h-full overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 px-4 pt-6 pb-4 border-b border-zinc-800">
        <h1 className="text-2xl font-bold text-white">Deep Dive Analysis</h1>
        <p className="text-sm text-zinc-400 mt-1">Mathematical chain of logic</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollable px-4 pt-6">
        {reasoningChains.map((chain, index) => {
          const signal = topOpportunities[index];
          if (!signal) return null;

          const isExpanded = expandedCoin === chain.coin;

          return (
            <div key={chain.coin} className="mb-4 border border-zinc-800 rounded-lg overflow-hidden">
              {/* Header */}
              <button
                onClick={() => setExpandedCoin(isExpanded ? null : chain.coin)}
                className="w-full bg-zinc-900 hover:bg-zinc-800 p-4 flex items-center justify-between transition-colors"
              >
                <div className="text-left">
                  <h3 className="font-bold text-white">{chain.coin}</h3>
                  <p className="text-xs text-zinc-400">Confidence: {chain.totalConfidence.toFixed(0)}%</p>
                </div>
                {isExpanded ? (
                  <ChevronUp size={20} className="text-zinc-400" />
                ) : (
                  <ChevronDown size={20} className="text-zinc-400" />
                )}
              </button>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="bg-black/50 p-4 border-t border-zinc-800 space-y-4">
                  {/* Steps */}
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-3">📈 Analysis Steps</h4>
                    <div className="space-y-3">
                      {chain.steps.map((step) => (
                        <div key={step.step} className="bg-zinc-900 rounded p-3">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-semibold text-white text-sm">
                              Step {step.step}: {step.title}
                            </h5>
                            <span className="text-emerald-400 font-bold">{step.result.toFixed(1)}</span>
                          </div>
                          <p className="text-xs text-zinc-400 mb-2">{step.calculation}</p>
                          <p className="text-xs text-zinc-300">{step.explanation}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Confidence Breakdown */}
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-3">📊 Confidence Breakdown</h4>
                    <div className="space-y-2">
                      {chain.confidenceBreakdown.map((item) => (
                        <div key={item.factor} className="flex justify-between items-center text-xs">
                          <span className="text-zinc-400">{item.factor}</span>
                          <div className="flex items-center gap-2 flex-1 mx-3">
                            <div className="flex-1 bg-zinc-800 rounded h-2">
                              <div
                                className="bg-emerald-500 h-2 rounded"
                                style={{ width: `${(item.contribution / 100) * 100}%` }}
                              />
                            </div>
                            <span className="font-mono font-bold text-white w-10 text-right">
                              {item.contribution.toFixed(0)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Conclusion */}
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-2">✨ Conclusion</h4>
                    <p className="text-xs text-zinc-300 bg-zinc-900 p-3 rounded">{chain.finalConclusion}</p>
                  </div>

                  {/* Trade Signal */}
                  {signal && (
                    <div className="bg-zinc-900 rounded p-3 border border-zinc-800">
                      <h5 className="text-sm font-semibold text-white mb-2">💰 Trade Signal</h5>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Action</span>
                          <span className="font-bold text-emerald-400">{signal.action.toUpperCase()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Entry</span>
                          <span className="font-mono">${signal.entryPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Target</span>
                          <span className="font-mono text-emerald-400">${signal.targetPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Stop Loss</span>
                          <span className="font-mono text-rose-400">${signal.stopLossPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between border-t border-zinc-800 pt-1 mt-1">
                          <span className="text-zinc-400">Expected Profit</span>
                          <span className="font-bold text-emerald-400">{signal.expectedProfit.toFixed(2)}%</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
