import { useMarket } from '../hooks/useMarket';

export function StrategyBuilder() {
  const { strategy, setStrategy, runAnalysis } = useMarket();

  const handleFactorChange = (factor: keyof typeof strategy.factors, value: number) => {
    setStrategy({
      ...strategy,
      factors: {
        ...strategy.factors,
        [factor]: value,
      },
    });
  };

  const handlePropertyChange = (prop: keyof typeof strategy, value: any) => {
    setStrategy({
      ...strategy,
      [prop]: value,
    });
  };

  const runNewAnalysis = () => {
    runAnalysis();
  };

  return (
    <div className="w-full h-full overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 px-4 pt-6 pb-4 border-b border-zinc-800">
        <h1 className="text-2xl font-bold text-white">Strategy Builder</h1>
        <p className="text-sm text-zinc-400 mt-1">Customize your trading parameters</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollable px-4 pt-6">
        {/* Strategy Name */}
        <div className="mb-6">
          <label className="text-sm font-semibold text-white block mb-2">Strategy Name</label>
          <input
            type="text"
            value={strategy.name}
            onChange={(e) => handlePropertyChange('name', e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-white text-sm"
            placeholder="e.g., Conservative Day Trading"
          />
        </div>

        {/* Risk Settings */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 mb-6">
          <h3 className="text-sm font-semibold text-white mb-4">⚠️ Risk Settings</h3>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-medium text-zinc-300">Max Risk per Trade</label>
                <span className="text-sm font-bold text-emerald-400">{strategy.maxRisk}%</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={strategy.maxRisk}
                onChange={(e) => handlePropertyChange('maxRisk', parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-medium text-zinc-300">Min Confidence Threshold</label>
                <span className="text-sm font-bold text-emerald-400">{strategy.minConfidence}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="95"
                value={strategy.minConfidence}
                onChange={(e) => handlePropertyChange('minConfidence', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Factor Weights */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 mb-6">
          <h3 className="text-sm font-semibold text-white mb-4">📊 Analysis Weights</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-medium text-zinc-300">RSI Weight</label>
                <span className="text-sm font-bold">{strategy.factors.rsiWeight}</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={strategy.factors.rsiWeight}
                onChange={(e) => handleFactorChange('rsiWeight', parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-medium text-zinc-300">Volume Weight</label>
                <span className="text-sm font-bold">{strategy.factors.volumeWeight}</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={strategy.factors.volumeWeight}
                onChange={(e) => handleFactorChange('volumeWeight', parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-medium text-zinc-300">Momentum Weight</label>
                <span className="text-sm font-bold">{strategy.factors.momentumWeight}</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={strategy.factors.momentumWeight}
                onChange={(e) => handleFactorChange('momentumWeight', parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-medium text-zinc-300">Support/Resistance Weight</label>
                <span className="text-sm font-bold">{strategy.factors.supportResistanceWeight}</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={strategy.factors.supportResistanceWeight}
                onChange={(e) => handleFactorChange('supportResistanceWeight', parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-medium text-zinc-300">Trend Weight</label>
                <span className="text-sm font-bold">{strategy.factors.trendWeight}</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={strategy.factors.trendWeight}
                onChange={(e) => handleFactorChange('trendWeight', parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-medium text-zinc-300">Volatility Weight</label>
                <span className="text-sm font-bold">{strategy.factors.volatilityWeight}</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={strategy.factors.volatilityWeight}
                onChange={(e) => handleFactorChange('volatilityWeight', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="bg-emerald-950 border border-emerald-800 rounded-lg p-4 mb-4">
          <p className="text-xs text-emerald-100">
            Higher weights = more importance. Adjust weights to match your trading style. Run analysis to apply changes.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={runNewAnalysis}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-lg transition-colors mb-4"
        >
          Apply & Analyze
        </button>
      </div>
    </div>
  );
}
