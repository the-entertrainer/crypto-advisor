import { useState } from 'react';
import { TabType } from './lib/types';
import { Dashboard } from './components/Dashboard';
import { Feed } from './components/Feed';
import { AITerminal } from './components/AITerminal';
import { Settings } from './components/Settings';
import { TabNavigation } from './components/TabNavigation';

function AppContent() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  const renderTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'feed':
        return <Feed />;
      case 'terminal':
        return <AITerminal />;
      case 'settings':
        return <Settings />;
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden flex flex-col">
      <main className="flex-1 overflow-hidden">{renderTab()}</main>
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default AppContent;
