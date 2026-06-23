import { useContext } from 'react';
import { MarketContext } from '../context/MarketContext';
import { MarketContextType } from '../lib/types';

export function useMarket(): MarketContextType {
  const context = useContext(MarketContext);
  if (!context) {
    throw new Error('useMarket must be used within MarketProvider');
  }
  return context;
}
