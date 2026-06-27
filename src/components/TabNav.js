import { jsx as _jsx } from "react/jsx-runtime";
import { Home, BarChart2, SlidersHorizontal } from 'lucide-react';
const TABS = [
    { id: 'home', Icon: Home },
    { id: 'scan', Icon: BarChart2 },
    { id: 'settings', Icon: SlidersHorizontal },
];
export function TabNav({ active, onChange }) {
    return (_jsx("nav", { className: "fixed bottom-0 inset-x-0 glass-nav", style: { paddingBottom: 'max(16px, env(safe-area-inset-bottom))' }, children: _jsx("div", { className: "flex items-center justify-around h-14", children: TABS.map(({ id, Icon }) => (_jsx("button", { onClick: () => onChange(id), className: `relative flex items-center justify-center w-14 h-10 rounded-2xl transition-all duration-200 ${active === id ? 'glass-sm' : ''}`, "aria-label": id, children: _jsx(Icon, { size: 20, className: "text-white transition-opacity duration-200", style: { opacity: active === id ? 0.9 : 0.28 } }) }, id))) }) }));
}
