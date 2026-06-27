import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import { fetchCoins, fetchGlobal, fetchFearGreed, bustCache } from '../lib/api';
import { generateInsight, marketNarrative } from '../lib/analyzer';
import type { CoinData, CoinInsight, GlobalData, FearGreedData, UserPrefs } from '../lib/types';

interface DataState {
  coins: CoinData[];
  insights: CoinInsight[];
  global: GlobalData | null;
  fearGreed: FearGreedData | null;
  narrative: string;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

interface DataCtx extends DataState {
  prefs: UserPrefs;
  setPrefs: (p: UserPrefs) => void;
  refresh: () => void;
  selected: CoinInsight | null;
  select: (i: CoinInsight | null) => void;
}

const Ctx = createContext<DataCtx | null>(null);

const DEFAULT_PREFS: UserPrefs = { riskTolerance: 'balanced', coinsToTrack: 20 };

const EMPTY: DataState = {
  coins: [], insights: [], global: null, fearGreed: null,
  narrative: '', loading: true, error: null, lastUpdated: null,
};

export function DataProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DataState>(EMPTY);
  const [prefs, setPrefs] = useState<UserPrefs>(DEFAULT_PREFS);
  const [selected, setSelected] = useState<CoinInsight | null>(null);

  const load = useCallback(async (force = false) => {
    if (force) bustCache();
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const [coins, global, fearGreed] = await Promise.all([
        fetchCoins(prefs.coinsToTrack),
        fetchGlobal(),
        fetchFearGreed(),
      ]);
      const insights = coins.map((c) => generateInsight(c, prefs.riskTolerance));
      setState({
        coins,
        insights,
        global,
        fearGreed,
        narrative: marketNarrative(coins, fearGreed, global),
        loading: false,
        error: null,
        lastUpdated: new Date(),
      });
    } catch {
      setState((s) => ({
        ...s,
        loading: false,
        error: "Couldn't load market data. Check your connection.",
      }));
    }
  }, [prefs.coinsToTrack, prefs.riskTolerance]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    const id = setInterval(() => load(), 5 * 60 * 1000);
    return () => clearInterval(id);
  }, [load]);

  return (
    <Ctx.Provider
      value={{
        ...state,
        prefs,
        setPrefs,
        refresh: () => load(true),
        selected,
        select: setSelected,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useData(): DataCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useData must be inside DataProvider');
  return ctx;
}
