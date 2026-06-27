import { Home, BarChart2, SlidersHorizontal } from 'lucide-react';

export type Tab = 'home' | 'scan' | 'settings';

const TABS: { id: Tab; Icon: typeof Home }[] = [
  { id: 'home', Icon: Home },
  { id: 'scan', Icon: BarChart2 },
  { id: 'settings', Icon: SlidersHorizontal },
];

interface Props {
  active: Tab;
  onChange: (t: Tab) => void;
}

export function TabNav({ active, onChange }: Props) {
  return (
    <nav
      className="fixed bottom-0 inset-x-0 glass-nav"
      style={{ paddingBottom: 'max(16px, env(safe-area-inset-bottom))' }}
    >
      <div className="flex items-center justify-around h-14">
        {TABS.map(({ id, Icon }) => (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`relative flex items-center justify-center w-14 h-10 rounded-2xl transition-all duration-200 ${
              active === id ? 'glass-sm' : ''
            }`}
            aria-label={id}
          >
            <Icon
              size={20}
              className="text-white transition-opacity duration-200"
              style={{ opacity: active === id ? 0.9 : 0.28 }}
            />
          </button>
        ))}
      </div>
    </nav>
  );
}
