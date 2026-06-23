'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';
import CryptoCard from './CryptoCard';

interface CryptoData {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  chartData: number[];
}

const cryptoData: CryptoData[] = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 67_450.00,
    change24h: 2.45,
    chartData: [65000, 65500, 66000, 66200, 66800, 67000, 67300, 67450],
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    price: 3_520.00,
    change24h: 1.82,
    chartData: [3480, 3490, 3500, 3510, 3515, 3520, 3525, 3520],
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    price: 142.80,
    change24h: -1.23,
    chartData: [145, 144.5, 144, 143.5, 143, 142.5, 142.8, 142.8],
  },
];

export default function Dashboard() {
  return (
    <div className="w-full h-full overflow-hidden flex flex-col">
      {/* Header - Fixed */}
      <div className="flex-shrink-0 px-4 pt-6 pb-4 border-b border-zinc-800">
        <h1 className="text-2xl font-bold text-white">Crypto Advisor</h1>
        <p className="text-sm text-zinc-400 mt-1">Real-time market insights</p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto scrollable px-4 pt-6">
        <div className="space-y-3 pb-4">
          {cryptoData.map((crypto) => (
            <CryptoCard key={crypto.symbol} crypto={crypto} />
          ))}
        </div>

        {/* Market Summary Section */}
        <div className="mt-8 mb-4">
          <h2 className="text-sm font-semibold text-zinc-300 mb-3">
            Market Overview
          </h2>
          <div className="bg-zinc-900 rounded-lg p-4 border border-zinc-800">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-zinc-500 mb-1">Market Cap</p>
                <p className="text-lg font-semibold text-white">$2.4T</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 mb-1">24h Volume</p>
                <p className="text-lg font-semibold text-white">$95B</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 mb-1">BTC Dominance</p>
                <p className="text-lg font-semibold text-emerald-400">48.2%</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 mb-1">Fear & Greed</p>
                <p className="text-lg font-semibold text-amber-400">68/100</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 mb-4">
          <h2 className="text-sm font-semibold text-zinc-300 mb-3">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-2">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium py-3 rounded-lg transition-colors">
              Buy Signal
            </button>
            <button className="bg-rose-600 hover:bg-rose-700 text-white text-sm font-medium py-3 rounded-lg transition-colors">
              Sell Signal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
