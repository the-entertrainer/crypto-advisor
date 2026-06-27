import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { DataProvider, useData } from './context/DataContext';
import { Dashboard } from './components/Dashboard';
import { Scanner } from './components/Scanner';
import { Settings } from './components/Settings';
import { TabNav } from './components/TabNav';
import { CoinSheet } from './components/CoinSheet';
function AppContent() {
    const [tab, setTab] = useState('home');
    const { selected, select } = useData();
    return (_jsxs("div", { className: "fixed inset-0 bg-black", children: [tab === 'home' && _jsx(Dashboard, {}), tab === 'scan' && _jsx(Scanner, {}), tab === 'settings' && _jsx(Settings, {}), _jsx(TabNav, { active: tab, onChange: setTab }), selected && (_jsx(CoinSheet, { insight: selected, onClose: () => select(null) }))] }));
}
export default function App() {
    return (_jsx(DataProvider, { children: _jsx(AppContent, {}) }));
}
