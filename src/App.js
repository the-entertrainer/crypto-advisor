import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { Feed } from './components/Feed';
import { AITerminal } from './components/AITerminal';
import { Settings } from './components/Settings';
import { TabNavigation } from './components/TabNavigation';
function AppContent() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const renderTab = () => {
        switch (activeTab) {
            case 'dashboard':
                return _jsx(Dashboard, {});
            case 'feed':
                return _jsx(Feed, {});
            case 'terminal':
                return _jsx(AITerminal, {});
            case 'settings':
                return _jsx(Settings, {});
        }
    };
    return (_jsxs("div", { className: "fixed inset-0 overflow-hidden flex flex-col", children: [_jsx("main", { className: "flex-1 overflow-hidden", children: renderTab() }), _jsx(TabNavigation, { activeTab: activeTab, onTabChange: setActiveTab })] }));
}
export default AppContent;
