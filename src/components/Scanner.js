import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useData } from '../context/DataContext';
import { Sparkline } from './Sparkline';
import { formatPrice, formatChange } from '../lib/utils';
const LABEL = {
    strong_buy: 'Get in now',
    buy: 'Worth buying',
    wait: 'Wait a bit',
    avoid: 'Skip this one',
};
const FILTERS = [
    { id: 'all', label: 'All' },
    { id: 'strong_buy', label: 'Get in now' },
    { id: 'buy', label: 'Worth buying' },
    { id: 'wait', label: 'Wait' },
    { id: 'avoid', label: 'Skip' },
];
function CoinRow({ insight }) {
    const { select } = useData();
    const { coin, signal } = insight;
    return (_jsxs("button", { onClick: () => select(insight), className: "w-full flex items-center gap-3 px-5 py-3.5 text-left active:opacity-60 transition-opacity", style: { borderBottom: '1px solid rgba(255,255,255,0.04)' }, children: [_jsx("img", { src: coin.image, alt: coin.name, className: "w-9 h-9 rounded-full flex-shrink-0", style: { opacity: 0.82 } }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-sm font-semibold truncate", style: { color: 'rgba(255,255,255,0.88)' }, children: coin.name }), _jsxs("p", { className: "text-xs mt-0.5", style: { color: 'rgba(255,255,255,0.35)' }, children: [coin.symbol, " \u00B7 ", formatPrice(coin.price)] })] }), _jsxs("div", { className: "flex flex-col items-end gap-1 flex-shrink-0", children: [_jsx("span", { className: "text-xs", style: { color: coin.change24h >= 0 ? 'rgba(255,255,255,0.58)' : 'rgba(255,255,255,0.28)' }, children: formatChange(coin.change24h) }), _jsx("span", { className: "text-xs font-medium", style: {
                            color: signal === 'strong_buy' ? 'rgba(255,255,255,0.95)' :
                                signal === 'buy' ? 'rgba(255,255,255,0.72)' :
                                    signal === 'wait' ? 'rgba(255,255,255,0.38)' :
                                        'rgba(255,255,255,0.18)',
                        }, children: LABEL[signal] })] }), _jsx("div", { className: "flex-shrink-0 ml-1", children: _jsx(Sparkline, { data: coin.sparkline, width: 44, height: 22, positive: coin.change7d >= 0 }) })] }));
}
export function Scanner() {
    const { insights, loading } = useData();
    const [filter, setFilter] = useState('all');
    const filtered = filter === 'all'
        ? insights
        : insights.filter((i) => i.signal === filter);
    return (_jsxs("div", { className: "h-full bg-black flex flex-col", children: [_jsxs("div", { className: "flex-shrink-0 px-5", style: { paddingTop: 'max(28px, env(safe-area-inset-top))' }, children: [_jsx("h1", { className: "text-[28px] font-semibold tracking-tight mb-5", style: { color: 'rgba(255,255,255,0.92)' }, children: "All Coins" }), _jsx("div", { className: "flex gap-2 overflow-x-auto pb-3 scrollable", style: { scrollbarWidth: 'none' }, children: FILTERS.map(({ id, label }) => (_jsx("button", { onClick: () => setFilter(id), className: "flex-shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all", style: filter === id
                                ? { background: 'rgba(255,255,255,0.92)', color: '#000' }
                                : {
                                    background: 'rgba(255,255,255,0.07)',
                                    border: '1px solid rgba(255,255,255,0.09)',
                                    color: 'rgba(255,255,255,0.5)',
                                }, children: label }, id))) })] }), _jsx("div", { className: "flex-1 scrollable pb-nav", style: { overflowY: 'auto' }, children: loading && !insights.length ? (_jsx("div", { className: "flex items-center justify-center h-40", children: _jsx("div", { className: "w-5 h-5 rounded-full border-2 animate-spin", style: { borderColor: 'rgba(255,255,255,0.1)', borderTopColor: 'rgba(255,255,255,0.65)' } }) })) : filtered.length === 0 ? (_jsx("div", { className: "px-5 py-8", children: _jsx("p", { className: "text-sm", style: { color: 'rgba(255,255,255,0.38)' }, children: "Nothing matches this filter right now." }) })) : (filtered.map((insight) => _jsx(CoinRow, { insight: insight }, insight.coin.id))) })] }));
}
