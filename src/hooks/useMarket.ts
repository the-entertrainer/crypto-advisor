import { useContext } from 'react';
import { MarketContext, MarketContextType } from '../context/MarketContext';

export function useMarket(): MarketContextType {
  const context = useContext(MarketContext);
  if (!context) {
    throw new Error('useMarket must be used within MarketProvider');
  }
  return context;
}
