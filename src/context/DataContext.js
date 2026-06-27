import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect, useCallback, } from 'react';
import { fetchCoins, fetchGlobal, fetchFearGreed, bustCache } from '../lib/api';
import { generateInsight, marketNarrative } from '../lib/analyzer';
const Ctx = createContext(null);
const DEFAULT_PREFS = { riskTolerance: 'balanced', coinsToTrack: 20 };
const EMPTY = {
    coins: [], insights: [], global: null, fearGreed: null,
    narrative: '', loading: true, error: null, lastUpdated: null,
};
export function DataProvider({ children }) {
    const [state, setState] = useState(EMPTY);
    const [prefs, setPrefs] = useState(DEFAULT_PREFS);
    const [selected, setSelected] = useState(null);
    const load = useCallback(async (force = false) => {
        if (force)
            bustCache();
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
        }
        catch {
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
    return (_jsx(Ctx.Provider, { value: {
            ...state,
            prefs,
            setPrefs,
            refresh: () => load(true),
            selected,
            select: setSelected,
        }, children: children }));
}
export function useData() {
    const ctx = useContext(Ctx);
    if (!ctx)
        throw new Error('useData must be inside DataProvider');
    return ctx;
}
