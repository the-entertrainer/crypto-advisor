'use client';

import { AlertCircle, Globe, Clock } from 'lucide-react';

interface FeedItemProps {
  item: {
    id: string;
    type: 'news' | 'alert';
    title: string;
    description: string;
    tag: string;
    timestamp: string;
    impact: 'high' | 'medium' | 'low';
    relatedAssets?: string[];
  };
}

export default function FeedItem({ item }: FeedItemProps) {
  const isAlert = item.type === 'alert';
  const iconColor = isAlert ? 'text-rose-500' : 'text-blue-500';
  const tagBg = isAlert ? 'bg-rose-950 text-rose-400 border-rose-900' : 'bg-blue-950 text-blue-400 border-blue-900';
  const impactColor = {
    high: 'text-rose-400',
    medium: 'text-amber-400',
    low: 'text-emerald-400',
  }[item.impact];

  return (
    <div className="px-4 py-4 hover:bg-zinc-900/50 transition-colors cursor-pointer">
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="flex-shrink-0 pt-1">
          {isAlert ? (
            <AlertCircle size={20} className={iconColor} />
          ) : (
            <Globe size={20} className={iconColor} />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`inline-block px-2 py-1 text-xs font-semibold rounded border ${tagBg}`}>
              {item.tag}
            </span>
            <span className={`text-xs font-medium ${impactColor}`}>
              {item.impact.toUpperCase()}
            </span>
          </div>

          <h3 className="text-sm font-semibold text-white mb-1 line-clamp-2">
            {item.title}
          </h3>

          <p className="text-xs text-zinc-400 mb-2 line-clamp-2">
            {item.description}
          </p>

          <div className="flex items-center justify-between">
            {item.relatedAssets && item.relatedAssets.length > 0 && (
              <div className="flex gap-1">
                {item.relatedAssets.map((asset) => (
                  <span
                    key={asset}
                    className="inline-block px-2 py-0.5 text-xs font-medium bg-zinc-800 text-zinc-300 rounded"
                  >
                    {asset}
                  </span>
                ))}
              </div>
            )}
            <div className="flex items-center gap-1 text-xs text-zinc-500">
              <Clock size={12} />
              {item.timestamp}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
