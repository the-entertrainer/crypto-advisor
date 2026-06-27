import { useState } from 'react';
import { DataProvider, useData } from './context/DataContext';
import { Dashboard } from './components/Dashboard';
import { Scanner } from './components/Scanner';
import { Settings } from './components/Settings';
import { TabNav, type Tab } from './components/TabNav';
import { CoinSheet } from './components/CoinSheet';

function AppContent() {
  const [tab, setTab] = useState<Tab>('home');
  const { selected, select } = useData();

  return (
    <div className="fixed inset-0 bg-black">
      {tab === 'home' && <Dashboard />}
      {tab === 'scan' && <Scanner />}
      {tab === 'settings' && <Settings />}

      <TabNav active={tab} onChange={setTab} />

      {selected && (
        <CoinSheet insight={selected} onClose={() => select(null)} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}
