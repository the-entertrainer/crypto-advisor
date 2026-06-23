import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AlertCircle, Globe, Clock } from 'lucide-react';
import { useMarket } from '../hooks/useMarket';
export function Feed() {
    const { feedItems } = useMarket();
    return (_jsxs("div", { className: "w-full h-full overflow-hidden flex flex-col", children: [_jsxs("div", { className: "flex-shrink-0 px-4 pt-6 pb-4 border-b border-zinc-800", children: [_jsx("h1", { className: "text-2xl font-bold text-white", children: "Intelligence Feed" }), _jsx("p", { className: "text-sm text-zinc-400 mt-1", children: "News & market alerts" })] }), _jsxs("div", { className: "flex-shrink-0 px-4 pt-3 pb-3 border-b border-zinc-800 flex gap-2 overflow-x-auto scrollable", children: [_jsxs("button", { className: "flex items-center gap-1 px-3 py-2 rounded-full bg-emerald-600 text-white text-sm font-medium whitespace-nowrap", children: [_jsx(Globe, { size: 14 }), "All"] }), _jsxs("button", { className: "flex items-center gap-1 px-3 py-2 rounded-full bg-zinc-800 text-zinc-300 text-sm font-medium whitespace-nowrap hover:bg-zinc-700 transition-colors", children: [_jsx(Globe, { size: 14 }), "Global News"] }), _jsxs("button", { className: "flex items-center gap-1 px-3 py-2 rounded-full bg-zinc-800 text-zinc-300 text-sm font-medium whitespace-nowrap hover:bg-zinc-700 transition-colors", children: [_jsx(AlertCircle, { size: 14 }), "Alerts"] })] }), _jsx("div", { className: "flex-1 overflow-y-auto scrollable", children: _jsx("div", { className: "divide-y divide-zinc-800", children: feedItems.map((item) => {
                        const isAlert = item.type === 'alert';
                        const iconColor = isAlert ? 'text-rose-500' : 'text-blue-500';
                        const tagBg = isAlert
                            ? 'bg-rose-950 text-rose-400 border-rose-900'
                            : 'bg-blue-950 text-blue-400 border-blue-900';
                        const impactColor = {
                            high: 'text-rose-400',
                            medium: 'text-amber-400',
                            low: 'text-emerald-400',
                        }[item.impact];
                        return (_jsx("div", { className: "px-4 py-4 hover:bg-zinc-900/50 transition-colors cursor-pointer", children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "flex-shrink-0 pt-1", children: isAlert ? (_jsx(AlertCircle, { size: 20, className: iconColor })) : (_jsx(Globe, { size: 20, className: iconColor })) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("span", { className: `inline-block px-2 py-1 text-xs font-semibold rounded border ${tagBg}`, children: item.tag }), _jsx("span", { className: `text-xs font-medium ${impactColor}`, children: item.impact.toUpperCase() })] }), _jsx("h3", { className: "text-sm font-semibold text-white mb-1 line-clamp-2", children: item.title }), _jsx("p", { className: "text-xs text-zinc-400 mb-2 line-clamp-2", children: item.description }), _jsxs("div", { className: "flex items-center justify-between", children: [item.relatedAssets && item.relatedAssets.length > 0 && (_jsx("div", { className: "flex gap-1", children: item.relatedAssets.map((asset) => (_jsx("span", { className: "inline-block px-2 py-0.5 text-xs font-medium bg-zinc-800 text-zinc-300 rounded", children: asset }, asset))) })), _jsxs("div", { className: "flex items-center gap-1 text-xs text-zinc-500", children: [_jsx(Clock, { size: 12 }), item.timestamp] })] })] })] }) }, item.id));
                    }) }) })] }));
}
