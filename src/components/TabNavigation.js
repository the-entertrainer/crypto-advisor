import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LayoutDashboard, TrendingUp, Zap, Settings } from 'lucide-react';
const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: _jsx(LayoutDashboard, { size: 24 }) },
    { id: 'strategy', label: 'Strategy', icon: _jsx(Settings, { size: 24 }) },
    { id: 'deepdive', label: 'Deep Dive', icon: _jsx(Zap, { size: 24 }) },
    { id: 'allcoins', label: 'All Coins', icon: _jsx(TrendingUp, { size: 24 }) },
];
export function TabNavigation({ activeTab, onTabChange }) {
    return (_jsx("nav", { className: "fixed bottom-0 left-0 right-0 bg-zinc-950 border-t border-zinc-800 h-20 flex items-center justify-around", children: tabs.map((tab) => (_jsxs("button", { onClick: () => onTabChange(tab.id), className: `flex flex-col items-center justify-center gap-1 py-2 px-4 transition-colors duration-200 ${activeTab === tab.id ? 'text-emerald-500' : 'text-zinc-500 hover:text-zinc-400'}`, children: [tab.icon, _jsx("span", { className: "text-xs font-medium", children: tab.label })] }, tab.id))) }));
}
