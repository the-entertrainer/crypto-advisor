import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useMarket } from '../hooks/useMarket';
export function AllCoins() {
    const { analysis, loading } = useMarket();
    if (loading) {
        return (_jsx("div", { className: "w-full h-full flex items-center justify-center", children: _jsx("p", { className: "text-zinc-400", children: "Loading..." }) }));
    }
    if (!analysis) {
        return (_jsxs("div", { className: "w-full h-full overflow-hidden flex flex-col", children: [_jsx("div", { className: "flex-shrink-0 px-4 pt-6 pb-4 border-b border-zinc-800", children: _jsx("h1", { className: "text-2xl font-bold text-white", children: "All Coins" }) }), _jsx("div", { className: "flex-1 flex items-center justify-center", children: _jsx("p", { className: "text-zinc-400", children: "Run an analysis first" }) })] }));
    }
    const sorted = [...analysis.allCoinsAnalyzed]
        .sort((a, b) => b.confidence * (b.overallScore / 100) - a.confidence * (a.overallScore / 100));
    return (_jsxs("div", { className: "w-full h-full overflow-hidden flex flex-col", children: [_jsxs("div", { className: "flex-shrink-0 px-4 pt-6 pb-4 border-b border-zinc-800", children: [_jsx("h1", { className: "text-2xl font-bold text-white", children: "All Coins" }), _jsx("p", { className: "text-sm text-zinc-400 mt-1", children: "Ranked by opportunity strength" })] }), _jsx("div", { className: "flex-1 overflow-y-auto scrollable", children: _jsx("div", { className: "px-4 pt-4 pb-4 space-y-2", children: sorted.map((coin, index) => {
                        const isBullish = coin.buySignalStrength > 20;
                        const Icon = isBullish ? TrendingUp : TrendingDown;
                        const colors = isBullish
                            ? 'bg-emerald-950 border-emerald-800 text-emerald-400'
                            : 'bg-rose-950 border-rose-800 text-rose-400';
                        const score = coin.confidence * (coin.overallScore / 100);
                        return (_jsxs("div", { className: `${colors} border rounded-lg p-3`, children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsxs("div", { className: "flex items-center gap-2 flex-1", children: [_jsx(Icon, { size: 16 }), _jsxs("div", { children: [_jsx("h3", { className: "font-bold text-white text-sm", children: coin.symbol }), _jsx("p", { className: "text-xs text-zinc-400", children: coin.name })] })] }), _jsxs("div", { className: "text-right", children: [_jsx("p", { className: "font-bold text-sm", children: score.toFixed(0) }), _jsx("p", { className: "text-xs text-zinc-400", children: "Score" })] })] }), _jsxs("div", { className: "grid grid-cols-4 gap-1 text-xs", children: [_jsxs("div", { className: "bg-black/30 rounded px-2 py-1", children: [_jsx("p", { className: "text-zinc-500 text-xs", children: "RSI" }), _jsx("p", { className: "font-mono", children: coin.rsiScore.toFixed(0) })] }), _jsxs("div", { className: "bg-black/30 rounded px-2 py-1", children: [_jsx("p", { className: "text-zinc-500 text-xs", children: "Vol" }), _jsx("p", { className: "font-mono", children: coin.volumeScore.toFixed(0) })] }), _jsxs("div", { className: "bg-black/30 rounded px-2 py-1", children: [_jsx("p", { className: "text-zinc-500 text-xs", children: "Mom" }), _jsx("p", { className: "font-mono", children: coin.momentumScore.toFixed(0) })] }), _jsxs("div", { className: "bg-black/30 rounded px-2 py-1", children: [_jsx("p", { className: "text-zinc-500 text-xs", children: "Conf" }), _jsx("p", { className: "font-mono", children: coin.confidence.toFixed(0) })] })] }), _jsxs("div", { className: "mt-2 flex justify-between items-center text-xs", children: [_jsxs("span", { className: "text-zinc-400", children: [coin.change24h > 0 ? '+' : '', coin.change24h.toFixed(2), "%"] }), _jsxs("span", { className: "font-mono text-white", children: ["$", coin.currentPrice.toFixed(2)] })] })] }, coin.symbol));
                    }) }) })] }));
}
