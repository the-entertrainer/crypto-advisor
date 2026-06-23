import { LayoutDashboard, TrendingUp, Zap, Settings } from 'lucide-react';
import { TabType } from '../lib/types';

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={24} /> },
  { id: 'feed', label: 'Feed', icon: <TrendingUp size={24} /> },
  { id: 'terminal', label: 'AI Terminal', icon: <Zap size={24} /> },
  { id: 'settings', label: 'Settings', icon: <Settings size={24} /> },
];

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-zinc-950 border-t border-zinc-800 h-20 flex items-center justify-around">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex flex-col items-center justify-center gap-1 py-2 px-4 transition-colors duration-200 ${
            activeTab === tab.id ? 'text-emerald-500' : 'text-zinc-500 hover:text-zinc-400'
          }`}
        >
          {tab.icon}
          <span className="text-xs font-medium">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
