import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { TrendingUp, TrendingDown, Loader, Zap } from 'lucide-react';
import { useMarket } from '../hooks/useMarket';
export function Dashboard() {
    const { analysis, loading, error, runAnalysis } = useMarket();
    useEffect(() => {
        runAnalysis();
    }, []);
    if (loading) {
        return (_jsx("div", { className: "w-full h-full flex items-center justify-center", children: _jsxs("div", { className: "flex flex-col items-center gap-4", children: [_jsx(Loader, { className: "animate-spin text-emerald-500", size: 40 }), _jsx("p", { className: "text-sm text-zinc-400", children: "Analyzing 50+ cryptocurrencies..." })] }) }));
    }
    if (error) {
        return (_jsxs("div", { className: "w-full h-full overflow-hidden flex flex-col", children: [_jsx("div", { className: "flex-shrink-0 px-4 pt-6 pb-4 border-b border-zinc-800", children: _jsx("h1", { className: "text-2xl font-bold text-white", children: "Dashboard" }) }), _jsx("div", { className: "flex-1 overflow-y-auto scrollable px-4 pt-6", children: _jsx("div", { className: "bg-rose-950 border border-rose-900 rounded-lg p-4", children: _jsx("p", { className: "text-sm text-rose-300", children: error }) }) })] }));
    }
    if (!analysis) {
        return null;
    }
    const { topOpportunities, marketOutlook, strategy } = analysis;
    const sentimentEmoji = {
        very_bullish: '🚀',
        bullish: '📈',
        neutral: '➡️',
        bearish: '📉',
        very_bearish: '⚠️',
    }[marketOutlook.sentiment];
    return (_jsxs("div", { className: "w-full h-full overflow-hidden flex flex-col", children: [_jsxs("div", { className: "flex-shrink-0 px-4 pt-6 pb-4 border-b border-zinc-800", children: [_jsx("h1", { className: "text-2xl font-bold text-white", children: "Dashboard" }), _jsx("p", { className: "text-sm text-zinc-400 mt-1", children: "Your AI-powered trading signals" })] }), _jsxs("div", { className: "flex-1 overflow-y-auto scrollable px-4 pt-6", children: [_jsxs("div", { className: "bg-zinc-900 border border-zinc-800 rounded-lg p-4 mb-6", children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs text-zinc-500 mb-1", children: "MARKET SENTIMENT" }), _jsxs("p", { className: "text-xl font-bold text-white", children: [sentimentEmoji, " ", marketOutlook.sentiment.toUpperCase()] })] }), _jsxs("div", { children: [_jsx("p", { className: "text-xs text-zinc-500 mb-1", children: "VOLATILITY" }), _jsx("p", { className: "text-lg font-bold text-emerald-400", children: marketOutlook.volatilityLevel.toUpperCase() })] })] }), _jsxs("p", { className: "text-xs text-zinc-400", children: ["Strategy: ", strategy.name] })] }), _jsx("h2", { className: "text-sm font-semibold text-white mb-3", children: "\uD83C\uDFAF Best Opportunities Today" }), _jsx("div", { className: "space-y-3 mb-6", children: topOpportunities.map((signal, index) => {
                            const isPositive = signal.action === 'buy';
                            const Icon = isPositive ? TrendingUp : TrendingDown;
                            const bgColor = isPositive ? 'bg-emerald-950 border-emerald-800' : 'bg-rose-950 border-rose-800';
                            const textColor = isPositive ? 'text-emerald-400' : 'text-rose-400';
                            return (_jsxs("div", { className: `${bgColor} border rounded-lg p-4`, children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Icon, { size: 20, className: textColor }), _jsxs("div", { children: [_jsx("h3", { className: "font-bold text-white", children: signal.coin.symbol }), _jsx("p", { className: "text-xs text-zinc-400", children: signal.coin.name })] })] }), _jsxs("div", { className: "text-right", children: [_jsx("p", { className: `text-sm font-bold ${textColor}`, children: signal.action.toUpperCase() }), _jsxs("p", { className: "text-xs text-zinc-400", children: [signal.expectedProfit > 0 ? '+' : '', signal.expectedProfit.toFixed(1), "%"] })] })] }), _jsxs("div", { className: "grid grid-cols-3 gap-2 mb-3 text-xs", children: [_jsxs("div", { className: "bg-black/30 rounded p-2", children: [_jsx("p", { className: "text-zinc-500", children: "Entry" }), _jsxs("p", { className: "font-mono text-white", children: ["$", signal.entryPrice.toFixed(2)] })] }), _jsxs("div", { className: "bg-black/30 rounded p-2", children: [_jsx("p", { className: "text-zinc-500", children: "Target" }), _jsxs("p", { className: "font-mono text-white", children: ["$", signal.targetPrice.toFixed(2)] })] }), _jsxs("div", { className: "bg-black/30 rounded p-2", children: [_jsx("p", { className: "text-zinc-500", children: "Stop" }), _jsxs("p", { className: "font-mono text-white", children: ["$", signal.stopLossPrice.toFixed(2)] })] })] }), _jsxs("div", { className: "flex justify-between items-center text-xs", children: [_jsxs("span", { className: "text-zinc-400", children: ["R:R ", signal.riskRewardRatio.toFixed(2), ":1"] }), _jsxs("span", { className: `font-bold ${textColor}`, children: [signal.winProbability.toFixed(0), "% win prob"] })] })] }, signal.coin.symbol));
                        }) }), _jsx("h2", { className: "text-sm font-semibold text-white mb-3", children: "\uD83D\uDCCA Market Stats" }), _jsx("div", { className: "bg-zinc-900 border border-zinc-800 rounded-lg p-4 mb-4", children: _jsxs("div", { className: "space-y-2 text-xs", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-zinc-400", children: "Best Opportunity" }), _jsx("span", { className: "font-bold text-emerald-400", children: marketOutlook.bestOpportunity })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-zinc-400", children: "Coins Analyzed" }), _jsx("span", { className: "font-bold text-white", children: "50+" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-zinc-400", children: "Analysis Updated" }), _jsx("span", { className: "text-white font-mono", children: "Just now" })] })] }) }), _jsxs("button", { onClick: runAnalysis, className: "w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2 mb-4", children: [_jsx(Zap, { size: 16 }), "Re-analyze All Coins"] })] })] }));
}
