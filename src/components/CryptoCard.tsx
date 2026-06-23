import { TrendingUp, TrendingDown } from 'lucide-react';
import { CryptoData } from '../lib/types';

interface CryptoCardProps {
  crypto: CryptoData;
}

export function CryptoCard({ crypto }: CryptoCardProps) {
  const isPositive = crypto.change24h >= 0;
  const changeColor = isPositive ? 'text-emerald-400' : 'text-rose-400';
  const bgColor = isPositive ? 'bg-emerald-950' : 'bg-rose-950';
  const borderColor = isPositive ? 'border-emerald-900' : 'border-rose-900';
  const IconComponent = isPositive ? TrendingUp : TrendingDown;

  const chartData = crypto.chartData;
  const min = Math.min(...chartData);
  const max = Math.max(...chartData);
  const range = max - min || 1;
  const height = 40;
  const width = 160;
  const pointSpacing = width / (chartData.length - 1);

  const points = chartData
    .map((value, index) => {
      const x = index * pointSpacing;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 hover:border-zinc-700 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-white">{crypto.name}</h3>
          <p className="text-xs text-zinc-500 mt-1">{crypto.symbol}</p>
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded ${bgColor} ${borderColor} border`}>
          <IconComponent size={14} className={changeColor} />
          <span className={`text-xs font-semibold ${changeColor}`}>
            {isPositive ? '+' : ''}
            {crypto.change24h.toFixed(2)}%
          </span>
        </div>
      </div>

      <div className="flex items-end justify-between gap-4">
        <div className="flex-1">
          <p className="text-2xl font-bold text-white">
            ${crypto.price.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
          <p className="text-xs text-zinc-500 mt-1">24h price</p>
        </div>

        <svg
          width={width}
          height={height}
          className="flex-shrink-0"
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
        >
          <polyline
            points={points}
            fill="none"
            stroke={isPositive ? '#10b981' : '#f43f5e'}
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </div>
  );
}
