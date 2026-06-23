import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { StrategyBuilder } from './components/StrategyBuilder';
import { DeepDive } from './components/DeepDive';
import { AllCoins } from './components/AllCoins';
import { TabNavigation } from './components/TabNavigation';

type TabType = 'dashboard' | 'strategy' | 'deepdive' | 'allcoins';

function AppContent() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  const renderTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'strategy':
        return <StrategyBuilder />;
      case 'deepdive':
        return <DeepDive />;
      case 'allcoins':
        return <AllCoins />;
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
