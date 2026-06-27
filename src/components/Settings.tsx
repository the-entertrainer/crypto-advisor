import { useData } from '../context/DataContext';
import { formatTime } from '../lib/utils';
import type { UserPrefs } from '../lib/types';

export function Settings() {
  const { prefs, setPrefs, lastUpdated, refresh } = useData();

  function update<K extends keyof UserPrefs>(key: K, val: UserPrefs[K]) {
    setPrefs({ ...prefs, [key]: val });
  }

  return (
    <div className="h-full bg-black scrollable" style={{ overflowY: 'auto' }}>
      <div className="px-5" style={{ paddingTop: 'max(28px, env(safe-area-inset-top))' }}>

        <h1
          className="text-[28px] font-semibold tracking-tight mb-8"
          style={{ color: 'rgba(255,255,255,0.92)' }}
        >
          Settings
        </h1>

        {/* Risk tolerance */}
        <div className="mb-8">
          <p
            className="text-[11px] font-semibold uppercase tracking-widest mb-1.5"
            style={{ color: 'rgba(255,255,255,0.3)' }}
          >
            Risk tolerance
          </p>
          <p className="text-xs mb-3" style={{ color: 'rgba(255,255,255,0.38)' }}>
            Affects which coins surface as opportunities.
          </p>
          <div
            className="flex gap-1.5 p-1.5 rounded-2xl"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {(['conservative', 'balanced', 'aggressive'] as const).map((opt) => (
              <button
                key={opt}
                onClick={() => update('riskTolerance', opt)}
                className="flex-1 py-2 rounded-xl text-sm font-medium transition-all capitalize"
                style={
                  prefs.riskTolerance === opt
                    ? { background: 'rgba(255,255,255,0.92)', color: '#000' }
                    : { color: 'rgba(255,255,255,0.42)' }
                }
              >
                {opt}
              </button>
            ))}
          </div>
          <p className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.28)' }}>
            {prefs.riskTolerance === 'conservative'
              ? 'Only the clearest, highest-confidence setups.'
              : prefs.riskTolerance === 'balanced'
              ? 'A balance of opportunity and caution.'
              : 'More signals surfaced — higher risk, higher potential.'}
          </p>
        </div>

        {/* Coins to track */}
        <div className="mb-8">
          <p
            className="text-[11px] font-semibold uppercase tracking-widest mb-1.5"
            style={{ color: 'rgba(255,255,255,0.3)' }}
          >
            Coins to analyse
          </p>
          <p className="text-xs mb-3" style={{ color: 'rgba(255,255,255,0.38)' }}>
            Top coins by market cap. More coins = slightly slower load.
          </p>
          <div
            className="flex gap-1.5 p-1.5 rounded-2xl"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {([10, 20, 30] as const).map((n) => (
              <button
                key={n}
                onClick={() => update('coinsToTrack', n)}
                className="flex-1 py-2 rounded-xl text-sm font-medium transition-all"
                style={
                  prefs.coinsToTrack === n
                    ? { background: 'rgba(255,255,255,0.92)', color: '#000' }
                    : { color: 'rgba(255,255,255,0.42)' }
                }
              >
                Top {n}
              </button>
            ))}
          </div>
        </div>

        {/* Data sources */}
        <div className="mb-8">
          <p
            className="text-[11px] font-semibold uppercase tracking-widest mb-3"
            style={{ color: 'rgba(255,255,255,0.3)' }}
          >
            Data sources
          </p>
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {[
              { label: 'Price & market data', value: 'CoinGecko (live)' },
              { label: 'Market sentiment', value: 'alternative.me (live)' },
              { label: 'Analysis', value: 'Computed on-device' },
            ].map(({ label, value }, i, arr) => (
              <div
                key={label}
                className="flex justify-between items-center px-4 py-3.5"
                style={i < arr.length - 1 ? { borderBottom: '1px solid rgba(255,255,255,0.05)' } : {}}
              >
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>{label}</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Last updated + refresh */}
        <div className="mb-4 text-center">
          <p className="text-xs mb-4" style={{ color: 'rgba(255,255,255,0.25)' }}>
            {lastUpdated ? `Last refreshed at ${formatTime(lastUpdated)}` : 'Not yet loaded'}
          </p>
          <button
            onClick={refresh}
            className="w-full py-3.5 rounded-2xl text-sm font-medium transition-opacity active:opacity-60"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}
          >
            Refresh all data now
          </button>
        </div>

        <p className="text-center text-[11px] mt-6" style={{ color: 'rgba(255,255,255,0.18)' }}>
          Data refreshes automatically every 5 minutes.
        </p>

      </div>
      <div className="pb-nav" />
    </div>
  );
}
