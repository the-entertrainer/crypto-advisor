import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { RefreshCw } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Sparkline } from './Sparkline';
import { formatPrice, formatChange, timeGreeting, formatTime, formatLargeNumber } from '../lib/utils';
const LABEL = {
    strong_buy: 'Get in now',
    buy: 'Worth buying',
    wait: 'Wait a bit',
    avoid: 'Skip this one',
};
function CoinCard({ insight }) {
    const { select } = useData();
    const { coin, signal } = insight;
    const short = insight.narrative.split('.')[0] + '.';
    return (_jsxs("button", { onClick: () => select(insight), className: "w-full glass rounded-2xl p-4 text-left active:opacity-70 transition-opacity", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("img", { src: coin.image, alt: coin.name, className: "w-8 h-8 rounded-full", style: { opacity: 0.85 } }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold", style: { color: 'rgba(255,255,255,0.9)' }, children: coin.name }), _jsx("p", { className: "text-xs", style: { color: 'rgba(255,255,255,0.36)' }, children: coin.symbol })] })] }), _jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [_jsx("span", { className: "text-xs", style: { color: coin.change24h >= 0 ? 'rgba(255,255,255,0.58)' : 'rgba(255,255,255,0.28)' }, children: formatChange(coin.change24h) }), signal === 'strong_buy' && (_jsx("span", { className: "text-xs font-semibold rounded-full px-3 py-1 bg-white text-black whitespace-nowrap", children: LABEL[signal] })), signal === 'buy' && (_jsx("span", { className: "text-xs font-semibold rounded-full px-3 py-1 glass whitespace-nowrap", style: { color: 'rgba(255,255,255,0.82)' }, children: LABEL[signal] })), (signal === 'wait' || signal === 'avoid') && (_jsx("span", { className: "text-xs font-medium whitespace-nowrap", style: { color: signal === 'wait' ? 'rgba(255,255,255,0.38)' : 'rgba(255,255,255,0.2)' }, children: LABEL[signal] }))] })] }), _jsx("p", { className: "text-xs leading-relaxed mb-3", style: { color: 'rgba(255,255,255,0.45)' }, children: short }), _jsxs("div", { className: "flex items-end justify-between", children: [_jsx("p", { className: "font-mono text-lg font-semibold", style: { color: 'rgba(255,255,255,0.9)' }, children: formatPrice(coin.price) }), _jsx(Sparkline, { data: coin.sparkline, width: 64, height: 28, positive: coin.change7d >= 0 })] })] }));
}
function LoadingView() {
    return (_jsxs("div", { className: "h-full flex flex-col items-center justify-center bg-black gap-3", children: [_jsx("div", { className: "w-5 h-5 rounded-full border-2 animate-spin", style: { borderColor: 'rgba(255,255,255,0.1)', borderTopColor: 'rgba(255,255,255,0.65)' } }), _jsx("p", { className: "text-sm", style: { color: 'rgba(255,255,255,0.3)' }, children: "Fetching live market data\u2026" })] }));
}
export function Dashboard() {
    const { insights, fearGreed, global, narrative, loading, error, refresh, lastUpdated } = useData();
    if (loading && !insights.length)
        return _jsx(LoadingView, {});
    const sorted = [...insights].sort((a, b) => {
        const ord = { strong_buy: 4, buy: 3, wait: 2, avoid: 1 };
        if (ord[b.signal] !== ord[a.signal])
            return ord[b.signal] - ord[a.signal];
        return b.confidence - a.confidence;
    });
    const topPicks = sorted.slice(0, 3);
    const hasBuys = topPicks.some((i) => i.signal === 'strong_buy' || i.signal === 'buy');
    return (_jsxs("div", { className: "h-full bg-black scrollable", style: { overflowY: 'auto' }, children: [_jsxs("div", { className: "px-5", style: { paddingTop: 'max(28px, env(safe-area-inset-top))' }, children: [_jsxs("div", { className: "flex items-start justify-between mb-7", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-[28px] font-semibold tracking-tight", style: { color: 'rgba(255,255,255,0.92)' }, children: timeGreeting() }), _jsx("p", { className: "text-sm mt-0.5", style: { color: 'rgba(255,255,255,0.28)' }, children: lastUpdated ? `Updated ${formatTime(lastUpdated)}` : 'Loading…' })] }), _jsx("button", { onClick: refresh, className: "flex items-center justify-center w-9 h-9 rounded-full glass mt-1 active:opacity-60 transition-opacity", "aria-label": "Refresh", children: _jsx(RefreshCw, { size: 15, style: { color: 'rgba(255,255,255,0.42)' } }) })] }), error && (_jsxs("div", { className: "glass rounded-2xl p-4 mb-5", children: [_jsx("p", { className: "text-sm", style: { color: 'rgba(255,255,255,0.52)' }, children: error }), _jsx("button", { onClick: refresh, className: "text-sm underline mt-2", style: { color: 'rgba(255,255,255,0.7)' }, children: "Try again" })] })), narrative && (_jsx("div", { className: "glass rounded-2xl p-4 mb-5", children: _jsx("p", { className: "text-sm leading-relaxed", style: { color: 'rgba(255,255,255,0.65)' }, children: narrative }) })), _jsxs("div", { className: "grid grid-cols-2 gap-3 mb-7", children: [_jsxs("div", { className: "glass rounded-2xl p-4", children: [_jsx("p", { className: "text-[10px] font-semibold uppercase tracking-widest mb-2", style: { color: 'rgba(255,255,255,0.28)' }, children: "Sentiment" }), _jsx("p", { className: "text-2xl font-bold", style: { color: 'rgba(255,255,255,0.9)' }, children: fearGreed?.value ?? '—' }), _jsx("p", { className: "text-sm mt-0.5", style: { color: 'rgba(255,255,255,0.42)' }, children: fearGreed?.label ?? '…' })] }), _jsxs("div", { className: "glass rounded-2xl p-4", children: [_jsx("p", { className: "text-[10px] font-semibold uppercase tracking-widest mb-2", style: { color: 'rgba(255,255,255,0.28)' }, children: "BTC share" }), _jsxs("p", { className: "text-2xl font-bold", style: { color: 'rgba(255,255,255,0.9)' }, children: [global?.btcDominance?.toFixed(0) ?? '—', "%"] }), _jsx("p", { className: "text-sm mt-0.5", style: { color: 'rgba(255,255,255,0.42)' }, children: global?.totalMarketCap ? formatLargeNumber(global.totalMarketCap) : '…' })] })] }), _jsxs("div", { className: "mb-6", children: [_jsx("p", { className: "text-[11px] font-semibold uppercase tracking-widest mb-3", style: { color: 'rgba(255,255,255,0.28)' }, children: hasBuys ? 'Worth looking at now' : 'Top coins' }), !topPicks.length && !loading && (_jsx("div", { className: "glass rounded-2xl p-4", children: _jsx("p", { className: "text-sm", style: { color: 'rgba(255,255,255,0.42)' }, children: "No clear opportunities right now. Come back later or try a different risk setting." }) })), _jsx("div", { className: "space-y-3", children: topPicks.map((insight) => (_jsx(CoinCard, { insight: insight }, insight.coin.id))) })] })] }), _jsx("div", { className: "pb-nav" })] }));
}
