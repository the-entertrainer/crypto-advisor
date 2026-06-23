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
        type: 'news',
        title: 'SEC Approves Bitcoin Spot ETF Expansion to International Markets',
        description: 'Regulatory approval extends Bitcoin ETF access to 15+ new countries. Goldman Sachs and BlackRock increase institutional positions.',
        tag: 'Global News',
        timestamp: '1 hour ago',
        impact: 'high',
        relatedAssets: ['BTC'],
    },
    {
        id: '2',
        type: 'news',
        title: 'Ethereum Core Developers Announce Merge 2.0 Timeline',
        description: 'Major protocol upgrade scheduled for Q2 2024. Expected to reduce gas fees by 60% and improve scalability 3x.',
        tag: 'Global News',
        timestamp: '2 hours ago',
        impact: 'high',
        relatedAssets: ['ETH'],
    },
    {
        id: '3',
        type: 'alert',
        title: 'Large Bitcoin Whale Movement Detected',
        description: '500 BTC ($33.7M) transferred to exchange wallet. Signals potential profit-taking from early holders. Mixed impact expected.',
        tag: 'Whistleblower Alert',
        timestamp: '3 hours ago',
        impact: 'high',
        relatedAssets: ['BTC'],
    },
    {
        id: '4',
        type: 'alert',
        title: 'Solana Network Experiences Minor Outage',
        description: 'Brief 12-minute network disruption. Team investigating root cause. No funds at risk, but confidence impacted.',
        tag: 'Whistleblower Alert',
        timestamp: '4 hours ago',
        impact: 'medium',
        relatedAssets: ['SOL'],
    },
    {
        id: '5',
        type: 'news',
        title: 'Major Crypto Exchange Announces Bitcoin Staking Program',
        description: 'New program offers 8% APY for Bitcoin holders. Expected to increase long-term holding and reduce selling pressure.',
        tag: 'Global News',
        timestamp: '5 hours ago',
        impact: 'medium',
        relatedAssets: ['BTC'],
    },
    {
        id: '6',
        type: 'alert',
        title: 'Multiple Whales Accumulating Ethereum',
        description: 'Smart money tracking shows 3,000+ ETH accumulated in past 48 hours at support levels. Suggests bullish outlook.',
        tag: 'Whistleblower Alert',
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
