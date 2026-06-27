import { RefreshCw } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Sparkline } from './Sparkline';
import { formatPrice, formatChange, timeGreeting, formatTime, formatLargeNumber } from '../lib/utils';
import type { CoinInsight, Signal } from '../lib/types';

const LABEL: Record<Signal, string> = {
  strong_buy: 'Get in now',
  buy: 'Worth buying',
  wait: 'Wait a bit',
  avoid: 'Skip this one',
};

function CoinCard({ insight }: { insight: CoinInsight }) {
  const { select } = useData();
  const { coin, signal } = insight;
  const short = insight.narrative.split('.')[0] + '.';

  return (
    <button
      onClick={() => select(insight)}
      className="w-full glass rounded-2xl p-4 text-left active:opacity-70 transition-opacity"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" style={{ opacity: 0.85 }} />
          <div>
            <p className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>
              {coin.name}
            </p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.36)' }}>{coin.symbol}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <span
            className="text-xs"
            style={{ color: coin.change24h >= 0 ? 'rgba(255,255,255,0.58)' : 'rgba(255,255,255,0.28)' }}
          >
            {formatChange(coin.change24h)}
          </span>
          {signal === 'strong_buy' && (
            <span className="text-xs font-semibold rounded-full px-3 py-1 bg-white text-black whitespace-nowrap">
              {LABEL[signal]}
            </span>
          )}
          {signal === 'buy' && (
            <span
              className="text-xs font-semibold rounded-full px-3 py-1 glass whitespace-nowrap"
              style={{ color: 'rgba(255,255,255,0.82)' }}
            >
              {LABEL[signal]}
            </span>
          )}
          {(signal === 'wait' || signal === 'avoid') && (
            <span
              className="text-xs font-medium whitespace-nowrap"
              style={{ color: signal === 'wait' ? 'rgba(255,255,255,0.38)' : 'rgba(255,255,255,0.2)' }}
            >
              {LABEL[signal]}
            </span>
          )}
        </div>
      </div>

      <p className="text-xs leading-relaxed mb-3" style={{ color: 'rgba(255,255,255,0.45)' }}>
        {short}
      </p>

      <div className="flex items-end justify-between">
        <p className="font-mono text-lg font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>
          {formatPrice(coin.price)}
        </p>
        <Sparkline data={coin.sparkline} width={64} height={28} positive={coin.change7d >= 0} />
      </div>
    </button>
  );
}

function LoadingView() {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-black gap-3">
      <div
        className="w-5 h-5 rounded-full border-2 animate-spin"
        style={{ borderColor: 'rgba(255,255,255,0.1)', borderTopColor: 'rgba(255,255,255,0.65)' }}
      />
      <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
        Fetching live market data…
      </p>
    </div>
  );
}

export function Dashboard() {
  const { insights, fearGreed, global, narrative, loading, error, refresh, lastUpdated } = useData();

  if (loading && !insights.length) return <LoadingView />;

  const sorted = [...insights].sort((a, b) => {
    const ord: Record<Signal, number> = { strong_buy: 4, buy: 3, wait: 2, avoid: 1 };
    if (ord[b.signal] !== ord[a.signal]) return ord[b.signal] - ord[a.signal];
    return b.confidence - a.confidence;
  });
  const topPicks = sorted.slice(0, 3);
  const hasBuys = topPicks.some((i) => i.signal === 'strong_buy' || i.signal === 'buy');

  return (
    <div className="h-full bg-black scrollable" style={{ overflowY: 'auto' }}>
      <div className="px-5" style={{ paddingTop: 'max(28px, env(safe-area-inset-top))' }}>

        {/* Header */}
        <div className="flex items-start justify-between mb-7">
          <div>
            <h1
              className="text-[28px] font-semibold tracking-tight"
              style={{ color: 'rgba(255,255,255,0.92)' }}
            >
              {timeGreeting()}
            </h1>
            <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.28)' }}>
              {lastUpdated ? `Updated ${formatTime(lastUpdated)}` : 'Loading…'}
            </p>
          </div>
          <button
            onClick={refresh}
            className="flex items-center justify-center w-9 h-9 rounded-full glass mt-1 active:opacity-60 transition-opacity"
            aria-label="Refresh"
          >
            <RefreshCw size={15} style={{ color: 'rgba(255,255,255,0.42)' }} />
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="glass rounded-2xl p-4 mb-5">
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.52)' }}>{error}</p>
            <button
              onClick={refresh}
              className="text-sm underline mt-2"
              style={{ color: 'rgba(255,255,255,0.7)' }}
            >
              Try again
            </button>
          </div>
        )}

        {/* Market narrative */}
        {narrative && (
          <div className="glass rounded-2xl p-4 mb-5">
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
              {narrative}
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-7">
          <div className="glass rounded-2xl p-4">
            <p
              className="text-[10px] font-semibold uppercase tracking-widest mb-2"
              style={{ color: 'rgba(255,255,255,0.28)' }}
            >
              Sentiment
            </p>
            <p className="text-2xl font-bold" style={{ color: 'rgba(255,255,255,0.9)' }}>
              {fearGreed?.value ?? '—'}
            </p>
            <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.42)' }}>
              {fearGreed?.label ?? '…'}
            </p>
          </div>
          <div className="glass rounded-2xl p-4">
            <p
              className="text-[10px] font-semibold uppercase tracking-widest mb-2"
              style={{ color: 'rgba(255,255,255,0.28)' }}
            >
              BTC share
            </p>
            <p className="text-2xl font-bold" style={{ color: 'rgba(255,255,255,0.9)' }}>
              {global?.btcDominance?.toFixed(0) ?? '—'}%
            </p>
            <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.42)' }}>
              {global?.totalMarketCap ? formatLargeNumber(global.totalMarketCap) : '…'}
            </p>
          </div>
        </div>

        {/* Top picks */}
        <div className="mb-6">
          <p
            className="text-[11px] font-semibold uppercase tracking-widest mb-3"
            style={{ color: 'rgba(255,255,255,0.28)' }}
          >
            {hasBuys ? 'Worth looking at now' : 'Top coins'}
          </p>

          {!topPicks.length && !loading && (
            <div className="glass rounded-2xl p-4">
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.42)' }}>
                No clear opportunities right now. Come back later or try a different risk setting.
              </p>
            </div>
          )}

          <div className="space-y-3">
            {topPicks.map((insight) => (
              <CoinCard key={insight.coin.id} insight={insight} />
            ))}
          </div>
        </div>
      </div>

      <div className="pb-nav" />
    </div>
  );
}
