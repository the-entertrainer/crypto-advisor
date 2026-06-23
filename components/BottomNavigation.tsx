'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, TrendingUp, Zap, Settings } from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { href: '/', label: 'Dashboard', icon: <LayoutDashboard size={24} /> },
  { href: '/feed', label: 'Feed', icon: <TrendingUp size={24} /> },
  { href: '/terminal', label: 'AI Terminal', icon: <Zap size={24} /> },
  { href: '/settings', label: 'Settings', icon: <Settings size={24} /> },
];

export default function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-zinc-950 border-t border-zinc-800 h-20 flex items-center justify-around safe-bottom">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center gap-1 py-2 px-4 transition-colors duration-200 ${
              isActive ? 'text-emerald-500' : 'text-zinc-500 hover:text-zinc-400'
            }`}
          >
            {item.icon}
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
