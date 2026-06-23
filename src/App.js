import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { StrategyBuilder } from './components/StrategyBuilder';
import { DeepDive } from './components/DeepDive';
import { AllCoins } from './components/AllCoins';
import { TabNavigation } from './components/TabNavigation';
function AppContent() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const renderTab = () => {
        switch (activeTab) {
            case 'dashboard':
                return _jsx(Dashboard, {});
            case 'strategy':
                return _jsx(StrategyBuilder, {});
            case 'deepdive':
                return _jsx(DeepDive, {});
            case 'allcoins':
                return _jsx(AllCoins, {});
        }
    };
    return (_jsxs("div", { className: "fixed inset-0 overflow-hidden flex flex-col", children: [_jsx("main", { className: "flex-1 overflow-hidden", children: renderTab() }), _jsx(TabNavigation, { activeTab: activeTab, onTabChange: setActiveTab })] }));
}
export default AppContent;
