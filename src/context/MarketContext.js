import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useState } from 'react';
import { analyzeMarket } from '../lib/api';
export const MarketContext = createContext(undefined);
const mockCryptoData = [
    {
        symbol: 'BTC',
        name: 'Bitcoin',
        price: 67450,
        change24h: 2.45,
        chartData: [65000, 65500, 66000, 66200, 66800, 67000, 67300, 67450],
    },
    {
        symbol: 'ETH',
        name: 'Ethereum',
        price: 3520,
        change24h: 1.82,
        chartData: [3480, 3490, 3500, 3510, 3515, 3520, 3525, 3520],
    },
    {
        symbol: 'SOL',
        name: 'Solana',
        price: 142.8,
        change24h: -1.23,
        chartData: [145, 144.5, 144, 143.5, 143, 142.5, 142.8, 142.8],
    },
];
const mockFeedItems = [
    {
        id: '1',
        type: 'alert',
        title: 'Large Bitcoin Transfer Detected',
        description: 'Whale moved 500 BTC worth $33.7M to unknown wallet. Market may face selling pressure.',
        tag: 'Whistleblower Alert',
        timestamp: '2 hours ago',
        impact: 'high',
        relatedAssets: ['BTC'],
    },
    {
        id: '2',
        type: 'news',
        title: 'SEC Approves Bitcoin Spot ETF Expansion',
        description: 'New regulations allow more institutional adoption. Market sentiment turns bullish.',
        tag: 'Global News',
        timestamp: '4 hours ago',
        impact: 'high',
        relatedAssets: ['BTC', 'ETH'],
    },
    {
        id: '3',
        type: 'alert',
        title: 'Unusual Volume Spike on Solana',
        description: 'SOL volume increased 300% in last hour. Smart money accumulation detected.',
        tag: 'Whistleblower Alert',
        timestamp: '1 hour ago',
        impact: 'medium',
        relatedAssets: ['SOL'],
    },
    {
        id: '4',
        type: 'news',
        title: 'Ethereum Merge 2.0 Development Update',
        description: 'Vitalik provides update on upcoming protocol improvements. Community excitement builds.',
        tag: 'Global News',
        timestamp: '6 hours ago',
        impact: 'medium',
        relatedAssets: ['ETH'],
    },
];
export function MarketProvider({ children }) {
    const [cryptoData] = useState(mockCryptoData);
    const [feedItems] = useState(mockFeedItems);
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchAnalysis = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await analyzeMarket({
                btc_price: cryptoData[0].price,
                btc_change_24h: cryptoData[0].change24h,
                eth_price: cryptoData[1].price,
                eth_change_24h: cryptoData[1].change24h,
                sol_price: cryptoData[2].price,
                sol_change_24h: cryptoData[2].change24h,
            }, 'Bitcoin ETF approval, Ethereum Merge 2.0 update, Large whale movements detected');
            setAnalysis(result);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch analysis');
            setAnalysis(null);
        }
        finally {
            setLoading(false);
        }
    };
    const value = {
        cryptoData,
        feedItems,
        analysis,
        loading,
        error,
        fetchAnalysis,
    };
    return _jsx(MarketContext.Provider, { value: value, children: children });
}
