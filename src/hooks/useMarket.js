import { useContext } from 'react';
import { MarketContext } from '../context/MarketContext';
export function useMarket() {
    const context = useContext(MarketContext);
    if (!context) {
        throw new Error('useMarket must be used within MarketProvider');
    }
    return context;
}
