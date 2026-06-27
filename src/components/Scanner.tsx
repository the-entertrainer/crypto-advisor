import { useState } from 'react';
import { useData } from '../context/DataContext';
import { Sparkline } from './Sparkline';
import { formatPrice, formatChange } from '../lib/utils';
import type { CoinInsight, Signal } from '../lib/types';

const LABEL: Record<Signal, string> = {
  strong_buy: 'Get in now',
  buy: 'Worth buying',
  wait: 'Wait a bit',
  avoid: 'Skip this one',
};

type Filter = 'all' | Signal;

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'strong_buy', label: 'Get in now' },
  { id: 'buy', label: 'Worth buying' },
  { id: 'wait', label: 'Wait' },
  { id: 'avoid', label: 'Skip' },
];

function CoinRow({ insight }: { insight: CoinInsight }) {
  const { select } = useData();
  const { coin, signal } = insight;

  return (
    <button
      onClick={() => select(insight)}
      className="w-full flex items-center gap-3 px-5 py-3.5 text-left active:opacity-60 transition-opacity"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
    >
      <img src={coin.image} alt={coin.name} className="w-9 h-9 rounded-full flex-shrink-0" style={{ opacity: 0.82 }} />

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold truncate" style={{ color: 'rgba(255,255,255,0.88)' }}>
          {coin.name}
        </p>
        <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
          {coin.symbol} · {formatPrice(coin.price)}
        </p>
      </div>

      <div className="flex flex-col items-end gap-1 flex-shrink-0">
        <span
          className="text-xs"
          style={{ color: coin.change24h >= 0 ? 'rgba(255,255,255,0.58)' : 'rgba(255,255,255,0.28)' }}
        >
          {formatChange(coin.change24h)}
        </span>
        <span
          className="text-xs font-medium"
          style={{
            color:
              signal === 'strong_buy' ? 'rgba(255,255,255,0.95)' :
              signal === 'buy' ? 'rgba(255,255,255,0.72)' :
              signal === 'wait' ? 'rgba(255,255,255,0.38)' :
              'rgba(255,255,255,0.18)',
          }}
        >
          {LABEL[signal]}
        </span>
      </div>

      <div className="flex-shrink-0 ml-1">
        <Sparkline data={coin.sparkline} width={44} height={22} positive={coin.change7d >= 0} />
      </div>
    </button>
  );
}

export function Scanner() {
  const { insights, loading } = useData();
  const [filter, setFilter] = useState<Filter>('all');

  const filtered =
    filter === 'all'
      ? insights
      : insights.filter((i) => i.signal === filter);

  return (
    <div className="h-full bg-black flex flex-col">
      {/* Fixed header */}
      <div
        className="flex-shrink-0 px-5"
        style={{ paddingTop: 'max(28px, env(safe-area-inset-top))' }}
      >
        <h1
          className="text-[28px] font-semibold tracking-tight mb-5"
          style={{ color: 'rgba(255,255,255,0.92)' }}
        >
          All Coins
        </h1>

        {/* Filter pills */}
        <div className="flex gap-2 overflow-x-auto pb-3 scrollable" style={{ scrollbarWidth: 'none' }}>
          {FILTERS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setFilter(id)}
              className="flex-shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all"
              style={
                filter === id
                  ? { background: 'rgba(255,255,255,0.92)', color: '#000' }
                  : {
                      background: 'rgba(255,255,255,0.07)',
                      border: '1px solid rgba(255,255,255,0.09)',
                      color: 'rgba(255,255,255,0.5)',
                    }
              }
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Coin list */}
      <div className="flex-1 scrollable pb-nav" style={{ overflowY: 'auto' }}>
        {loading && !insights.length ? (
          <div className="flex items-center justify-center h-40">
            <div
              className="w-5 h-5 rounded-full border-2 animate-spin"
              style={{ borderColor: 'rgba(255,255,255,0.1)', borderTopColor: 'rgba(255,255,255,0.65)' }}
            />
          </div>
        ) : filtered.length === 0 ? (
          <div className="px-5 py-8">
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.38)' }}>
              Nothing matches this filter right now.
            </p>
          </div>
        ) : (
          filtered.map((insight) => <CoinRow key={insight.coin.id} insight={insight} />)
        )}
      </div>
    </div>
  );
}
