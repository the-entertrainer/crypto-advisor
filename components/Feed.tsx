'use client';

import { AlertCircle, Globe, TrendingUp, Clock } from 'lucide-react';
import FeedItem from './FeedItem';

interface FeedItemData {
  id: string;
  type: 'news' | 'alert';
  title: string;
  description: string;
  tag: string;
  timestamp: string;
  impact: 'high' | 'medium' | 'low';
  relatedAssets?: string[];
}

const feedItems: FeedItemData[] = [
  {
    id: '1',
    type: 'alert',
    title: 'Large Bitcoin Transfer Detected',
    description:
      'Whale moved 500 BTC worth $33.7M to unknown wallet. Market may face selling pressure.',
    tag: 'Whistleblower Alert',
    timestamp: '2 hours ago',
    impact: 'high',
    relatedAssets: ['BTC'],
  },
  {
    id: '2',
    type: 'news',
    title: 'SEC Approves Bitcoin Spot ETF Expansion',
    description:
      'New regulations allow more institutional adoption. Market sentiment turns bullish.',
    tag: 'Global News',
    timestamp: '4 hours ago',
    impact: 'high',
    relatedAssets: ['BTC', 'ETH'],
  },
  {
    id: '3',
    type: 'alert',
    title: 'Unusual Volume Spike on Solana',
    description:
      'SOL volume increased 300% in last hour. Smart money accumulation detected.',
    tag: 'Whistleblower Alert',
    timestamp: '1 hour ago',
    impact: 'medium',
    relatedAssets: ['SOL'],
  },
  {
    id: '4',
    type: 'news',
    title: 'Ethereum Merge 2.0 Development Update',
    description:
      'Vitalik provides update on upcoming protocol improvements. Community excitement builds.',
    tag: 'Global News',
    timestamp: '6 hours ago',
    impact: 'medium',
    relatedAssets: ['ETH'],
  },
  {
    id: '5',
    type: 'alert',
    title: 'DeFi Protocol Exploit Risk Identified',
    description:
      'Security researchers warn of potential vulnerability in major lending protocol.',
    tag: 'Whistleblower Alert',
    timestamp: '3 hours ago',
    impact: 'high',
    relatedAssets: ['ETH'],
  },
  {
    id: '6',
    type: 'news',
    title: 'Central Bank Digital Currency Updates',
    description:
      'CBDC pilots expand globally. Traditional finance integrating with crypto ecosystem.',
    tag: 'Global News',
    timestamp: '8 hours ago',
    impact: 'low',
  },
];

export default function Feed() {
  return (
    <div className="w-full h-full overflow-hidden flex flex-col">
      {/* Header - Fixed */}
      <div className="flex-shrink-0 px-4 pt-6 pb-4 border-b border-zinc-800">
        <h1 className="text-2xl font-bold text-white">Intelligence Feed</h1>
        <p className="text-sm text-zinc-400 mt-1">News & market alerts</p>
      </div>

      {/* Filter tabs */}
      <div className="flex-shrink-0 px-4 pt-3 pb-3 border-b border-zinc-800 flex gap-2 overflow-x-auto scrollable">
        <button className="flex items-center gap-1 px-3 py-2 rounded-full bg-emerald-600 text-white text-sm font-medium whitespace-nowrap">
          <Globe size={14} />
          All
        </button>
        <button className="flex items-center gap-1 px-3 py-2 rounded-full bg-zinc-800 text-zinc-300 text-sm font-medium whitespace-nowrap hover:bg-zinc-700 transition-colors">
          <Globe size={14} />
          Global News
        </button>
        <button className="flex items-center gap-1 px-3 py-2 rounded-full bg-zinc-800 text-zinc-300 text-sm font-medium whitespace-nowrap hover:bg-zinc-700 transition-colors">
          <AlertCircle size={14} />
          Alerts
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto scrollable">
        <div className="divide-y divide-zinc-800">
          {feedItems.map((item) => (
            <FeedItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
