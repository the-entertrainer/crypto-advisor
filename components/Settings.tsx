'use client';

import { Bell, Eye, Lock, Info, ChevronRight } from 'lucide-react';

interface SettingItem {
  icon: React.ReactNode;
  label: string;
  description: string;
  action?: string;
}

const settings: SettingItem[] = [
  {
    icon: <Bell size={20} />,
    label: 'Notifications',
    description: 'Manage alerts and news notifications',
    action: 'toggle',
  },
  {
    icon: <Eye size={20} />,
    label: 'Display',
    description: 'Theme and layout preferences',
    action: 'link',
  },
  {
    icon: <Lock size={20} />,
    label: 'Security',
    description: 'API keys and security settings',
    action: 'link',
  },
];

const about: SettingItem[] = [
  {
    icon: <Info size={20} />,
    label: 'About',
    description: 'App version and information',
  },
];

export default function Settings() {
  return (
    <div className="w-full h-full overflow-hidden flex flex-col">
      {/* Header - Fixed */}
      <div className="flex-shrink-0 px-4 pt-6 pb-4 border-b border-zinc-800">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-sm text-zinc-400 mt-1">Preferences & configuration</p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto scrollable">
        {/* General Settings */}
        <div className="px-4 pt-6">
          <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-3">
            General
          </h2>
          <div className="space-y-0 border border-zinc-800 rounded-lg overflow-hidden">
            {settings.map((item, index) => (
              <button
                key={index}
                className="w-full flex items-center justify-between px-4 py-4 hover:bg-zinc-900/50 transition-colors border-b border-zinc-800 last:border-b-0"
              >
                <div className="flex items-start gap-3 text-left flex-1">
                  <div className="text-zinc-500 flex-shrink-0 pt-1">{item.icon}</div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">
                      {item.label}
                    </p>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </div>
                {item.action === 'toggle' && (
                  <div className="bg-emerald-600 rounded-full w-10 h-6 flex items-center px-1 ml-4">
                    <div className="bg-white rounded-full w-4 h-4 ml-auto" />
                  </div>
                )}
                {item.action === 'link' && (
                  <ChevronRight size={20} className="text-zinc-500 flex-shrink-0 ml-4" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Market Data */}
        <div className="px-4 pt-8">
          <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-3">
            Market Data
          </h2>
          <div className="space-y-0 border border-zinc-800 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-4 border-b border-zinc-800">
              <div className="text-left flex-1">
                <p className="text-sm font-semibold text-white">
                  Tracked Assets
                </p>
                <p className="text-xs text-zinc-500 mt-0.5">
                  BTC, ETH, SOL
                </p>
              </div>
              <ChevronRight size={20} className="text-zinc-500" />
            </div>
            <div className="flex items-center justify-between px-4 py-4">
              <div className="text-left flex-1">
                <p className="text-sm font-semibold text-white">
                  Refresh Interval
                </p>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Every 5 minutes
                </p>
              </div>
              <ChevronRight size={20} className="text-zinc-500" />
            </div>
          </div>
        </div>

        {/* About */}
        <div className="px-4 pt-8">
          <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-3">
            About
          </h2>
          <div className="border border-zinc-800 rounded-lg p-4">
            <p className="text-sm font-semibold text-white mb-3">
              Crypto Advisor
            </p>
            <div className="space-y-2 text-xs text-zinc-400">
              <div className="flex justify-between">
                <span>Version</span>
                <span className="text-white">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span>Build</span>
                <span className="text-white">MVP</span>
              </div>
              <div className="flex justify-between">
                <span>Updated</span>
                <span className="text-white">June 2024</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal */}
        <div className="px-4 pt-6 pb-4 flex gap-4 justify-center text-xs text-zinc-500">
          <button className="hover:text-zinc-300 transition-colors">
            Privacy
          </button>
          <span>•</span>
          <button className="hover:text-zinc-300 transition-colors">
            Terms
          </button>
          <span>•</span>
          <button className="hover:text-zinc-300 transition-colors">
            Support
          </button>
        </div>
      </div>
    </div>
  );
}
