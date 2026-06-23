import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useState } from 'react';
import { analyzeWithMathematicalLogic, DEFAULT_STRATEGY } from '../lib/analysis';
export const MarketContext = createContext(undefined);
export function MarketProvider({ children }) {
    const [strategy, setStrategy] = useState(DEFAULT_STRATEGY);
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const runAnalysis = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await analyzeWithMathematicalLogic(strategy);
            setAnalysis(result);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Analysis failed');
            setAnalysis(null);
        }
        finally {
            setLoading(false);
        }
    };
    const value = {
        strategy,
        setStrategy,
        analysis,
        loading,
        error,
        runAnalysis,
    };
    return _jsx(MarketContext.Provider, { value: value, children: children });
}
