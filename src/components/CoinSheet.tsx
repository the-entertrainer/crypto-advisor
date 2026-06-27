import { useEffect } from 'react';
import { X } from 'lucide-react';
import { Sparkline } from './Sparkline';
import { formatPrice, formatChange } from '../lib/utils';
import type { CoinInsight, Signal } from '../lib/types';

const LABEL: Record<Signal, string> = {
  strong_buy: 'Get in now',
  buy: 'Worth buying',
  wait: 'Wait a bit',
  avoid: 'Skip this one',
};

export function CoinSheet({
  insight,
  onClose,
}: {
  insight: CoinInsight;
  onClose: () => void;
}) {
  const { coin, signal, confidence, entry, target, stopLoss, riskPct, rewardPct, narrative, bullets, timeframe } = insight;
  const isBuy = signal === 'strong_buy' || signal === 'buy';

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }} />

      {/* Sheet */}
      <div
        className="relative w-full glass-strong rounded-t-[2.5rem] overflow-hidden"
        style={{ maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3">
          <div className="w-8 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.18)' }} />
        </div>

        {/* Scrollable body */}
        <div className="scrollable" style={{ maxHeight: 'calc(90vh - 20px)', overflowY: 'auto' }}>
          <div className="px-5 pb-10 pb-safe">

            {/* Coin header */}
            <div className="flex items-center justify-between pt-4 pb-5">
              <div className="flex items-center gap-3">
                <img
                  src={coin.image}
                  alt={coin.name}
                  className="w-10 h-10 rounded-full"
                  style={{ opacity: 0.88 }}
                />
                <div>
                  <p className="font-semibold text-white" style={{ opacity: 0.92 }}>{coin.name}</p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.38)' }}>{coin.symbol}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="flex items-center justify-center w-8 h-8 rounded-full glass"
              >
                <X size={14} style={{ color: 'rgba(255,255,255,0.45)' }} />
              </button>
            </div>

            {/* Price row */}
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="text-3xl font-bold tracking-tight" style={{ color: 'rgba(255,255,255,0.92)' }}>
                  {formatPrice(coin.price)}
                </p>
                <p
                  className="text-sm mt-0.5"
                  style={{ color: coin.change24h >= 0 ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.32)' }}
                >
                  {formatChange(coin.change24h)} today
                </p>
              </div>

              {/* Signal badge */}
              {signal === 'strong_buy' && (
                <span className="rounded-full px-4 py-1.5 text-sm font-semibold bg-white text-black">
                  {LABEL[signal]}
                </span>
              )}
              {signal === 'buy' && (
                <span className="rounded-full px-4 py-1.5 text-sm font-semibold glass" style={{ color: 'rgba(255,255,255,0.85)' }}>
                  {LABEL[signal]}
                </span>
              )}
              {(signal === 'wait' || signal === 'avoid') && (
                <span
                  className="text-sm font-medium"
                  style={{ color: signal === 'wait' ? 'rgba(255,255,255,0.42)' : 'rgba(255,255,255,0.22)' }}
                >
                  {LABEL[signal]}
                </span>
              )}
            </div>

            {/* Narrative */}
            <div className="glass rounded-2xl p-4 mb-5">
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)' }}>
                {narrative}
              </p>
            </div>

            {/* Trade levels — only for buy signals */}
            {isBuy && (
              <div className="glass rounded-2xl p-4 mb-5">
                <p
                  className="text-[11px] font-semibold uppercase tracking-widest mb-4"
                  style={{ color: 'rgba(255,255,255,0.35)' }}
                >
                  If you buy now
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: 'rgba(255,255,255,0.52)' }}>Enter at</span>
                    <span className="font-mono text-sm" style={{ color: 'rgba(255,255,255,0.88)' }}>{formatPrice(entry)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: 'rgba(255,255,255,0.52)' }}>Sell target</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm" style={{ color: 'rgba(255,255,255,0.88)' }}>{formatPrice(target)}</span>
                      <span className="text-xs" style={{ color: 'rgba(255,255,255,0.42)' }}>+{rewardPct.toFixed(1)}%</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: 'rgba(255,255,255,0.52)' }}>Stop loss</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm" style={{ color: 'rgba(255,255,255,0.88)' }}>{formatPrice(stopLoss)}</span>
                      <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>−{riskPct.toFixed(1)}%</span>
                    </div>
                  </div>
                  <div
                    className="pt-3 flex justify-between"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>Risk / Reward ratio</span>
                    <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.78)' }}>
                      1 : {(rewardPct / Math.max(riskPct, 0.1)).toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Bullets */}
            <div className="mb-5">
              <p
                className="text-[11px] font-semibold uppercase tracking-widest mb-3"
                style={{ color: 'rgba(255,255,255,0.35)' }}
              >
                Key observations
              </p>
              <div className="space-y-2.5">
                {bullets.map((b, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div
                      className="w-1 h-1 rounded-full flex-shrink-0 mt-2"
                      style={{ background: 'rgba(255,255,255,0.28)' }}
                    />
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                      {b}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sparkline */}
            {coin.sparkline.length > 2 && (
              <div className="glass rounded-2xl p-4 mb-4">
                <p className="text-[11px] mb-3" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  7-day price chart
                </p>
                <Sparkline
                  data={coin.sparkline}
                  width={300}
                  height={64}
                  positive={coin.change7d >= 0}
                />
              </div>
            )}

            {/* Footer */}
            <p className="text-center text-[11px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
              {confidence}% signal confidence · {timeframe} timeframe · live data
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
