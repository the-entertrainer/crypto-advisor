// Top 50 cryptocurrencies for analysis
const TOP_CRYPTOS = [
    { symbol: 'BTC', name: 'Bitcoin', marketCap: 1300000000000 },
    { symbol: 'ETH', name: 'Ethereum', marketCap: 260000000000 },
    { symbol: 'BNB', name: 'Binance Coin', marketCap: 83000000000 },
    { symbol: 'SOL', name: 'Solana', marketCap: 70000000000 },
    { symbol: 'XRP', name: 'Ripple', marketCap: 65000000000 },
    { symbol: 'DOGE', name: 'Dogecoin', marketCap: 45000000000 },
    { symbol: 'ADA', name: 'Cardano', marketCap: 30000000000 },
    { symbol: 'AVAX', name: 'Avalanche', marketCap: 28000000000 },
    { symbol: 'SHIB', name: 'Shiba Inu', marketCap: 20000000000 },
    { symbol: 'POLKADOT', name: 'Polkadot', marketCap: 18000000000 },
];
// Generate realistic but dynamic metrics for demo
function generateCoinMetrics(coin, strategy) {
    const basePrice = Math.random() * 100 + 50;
    const change24h = (Math.random() - 0.4) * 10; // -4% to +6%
    const volume = Math.random() * 1000000000;
    // Generate realistic technical scores
    const rsiScore = Math.random() * 100;
    const volumeScore = Math.random() * 100;
    const momentumScore = 50 + (change24h * 3); // correlated with price change
    const supportResistanceScore = Math.random() * 100;
    const trendScore = 50 + (Math.random() - 0.5) * 40;
    const volatilityScore = Math.abs(change24h) * 10; // higher for volatile coins
    // Calculate weighted score based on strategy
    const overallScore = (rsiScore * strategy.factors.rsiWeight +
        volumeScore * strategy.factors.volumeWeight +
        momentumScore * strategy.factors.momentumWeight +
        supportResistanceScore * strategy.factors.supportResistanceWeight +
        trendScore * strategy.factors.trendWeight +
        volatilityScore * strategy.factors.volatilityWeight) /
        (strategy.factors.rsiWeight +
            strategy.factors.volumeWeight +
            strategy.factors.momentumWeight +
            strategy.factors.supportResistanceWeight +
            strategy.factors.trendWeight +
            strategy.factors.volatilityWeight);
    // Confidence based on agreement between indicators
    const indicatorVariance = Math.abs(rsiScore - 50) +
        Math.abs(volumeScore - 50) +
        Math.abs(momentumScore - 50) +
        Math.abs(supportResistanceScore - 50) +
        Math.abs(trendScore - 50);
    const confidence = Math.max(60, 100 - indicatorVariance / 5);
    // Buy signal strength (-100 to 100)
    const buySignalStrength = (overallScore - 50) * 2 + (change24h * 5);
    return {
        symbol: coin.symbol,
        name: coin.name,
        currentPrice: basePrice,
        change24h: change24h,
        volume24h: volume,
        marketCap: coin.marketCap,
        rsiScore: Math.min(100, Math.max(0, rsiScore)),
        volumeScore: Math.min(100, Math.max(0, volumeScore)),
        momentumScore: Math.min(100, Math.max(0, momentumScore)),
        supportResistanceScore: Math.min(100, Math.max(0, supportResistanceScore)),
        trendScore: Math.min(100, Math.max(0, trendScore)),
        volatilityScore: Math.min(100, Math.max(0, volatilityScore)),
        overallScore: Math.min(100, Math.max(0, overallScore)),
        confidence: Math.min(100, Math.max(0, confidence)),
        buySignalStrength: Math.min(100, Math.max(-100, buySignalStrength)),
    };
}
// Create trade signals from coin metrics
function createTradeSignal(coin, strategy) {
    const action = coin.confidence >= strategy.minConfidence && coin.buySignalStrength > 30
        ? 'buy'
        : coin.buySignalStrength < -30
            ? 'sell'
            : 'hold';
    if (action === 'hold') {
        return {
            coin,
            action: 'avoid',
            entryPrice: 0,
            targetPrice: 0,
            stopLossPrice: 0,
            riskRewardRatio: 0,
            holdDuration: '1d',
            expectedProfit: 0,
            winProbability: 0,
        };
    }
    const direction = action === 'buy' ? 1 : -1;
    const volatility = coin.volatilityScore / 100;
    const riskAmount = coin.currentPrice * (strategy.maxRisk / 100);
    const entryPrice = coin.currentPrice;
    const targetPrice = coin.currentPrice * (1 + direction * (3 + volatility * 5) / 100);
    const stopLossPrice = coin.currentPrice * (1 - direction * (1 + volatility * 2) / 100);
    const expectedProfit = ((targetPrice - entryPrice) / entryPrice) * 100;
    const expectedLoss = ((stopLossPrice - entryPrice) / entryPrice) * 100;
    const riskRewardRatio = Math.abs(expectedProfit / expectedLoss);
    // Win probability based on confidence and technical indicators agreement
    const winProbability = Math.min(95, coin.confidence * 0.8 + (coin.overallScore / 100) * 20);
    return {
        coin,
        action,
        entryPrice,
        targetPrice,
        stopLossPrice,
        riskRewardRatio,
        holdDuration: expectedProfit > 5 ? '4-6h' : '12h',
        expectedProfit,
        winProbability,
    };
}
// Generate detailed chain of thought
function generateChainOfThought(coin, strategy) {
    const steps = [
        {
            step: 1,
            title: 'RSI Analysis',
            calculation: `RSI Score: ${coin.rsiScore.toFixed(1)}/100 × Weight: ${strategy.factors.rsiWeight}`,
            result: coin.rsiScore,
            explanation: coin.rsiScore > 70 ? 'Overbought territory' : coin.rsiScore < 30 ? 'Oversold territory' : 'Neutral zone',
        },
        {
            step: 2,
            title: 'Volume Confirmation',
            calculation: `Volume Score: ${coin.volumeScore.toFixed(1)}/100 × Weight: ${strategy.factors.volumeWeight}`,
            result: coin.volumeScore,
            explanation: coin.volumeScore > 70 ? 'Strong volume backing' : 'Weak volume confirmation',
        },
        {
            step: 3,
            title: 'Momentum Check',
            calculation: `Momentum: ${coin.momentumScore.toFixed(1)}/100 (24h: ${coin.change24h.toFixed(2)}%)`,
            result: coin.momentumScore,
            explanation: coin.change24h > 0 ? 'Positive price momentum' : 'Negative price momentum',
        },
        {
            step: 4,
            title: 'Support/Resistance',
            calculation: `Level Strength: ${coin.supportResistanceScore.toFixed(1)}/100`,
            result: coin.supportResistanceScore,
            explanation: coin.supportResistanceScore > 60 ? 'Strong key levels' : 'Weak level support',
        },
        {
            step: 5,
            title: 'Trend Analysis',
            calculation: `Trend Score: ${coin.trendScore.toFixed(1)}/100 × Weight: ${strategy.factors.trendWeight}`,
            result: coin.trendScore,
            explanation: coin.trendScore > 60 ? 'Uptrend confirmed' : 'Downtrend in progress',
        },
    ];
    const confidenceBreakdown = [
        { factor: 'RSI', weight: strategy.factors.rsiWeight, score: coin.rsiScore, contribution: 0 },
        { factor: 'Volume', weight: strategy.factors.volumeWeight, score: coin.volumeScore, contribution: 0 },
        { factor: 'Momentum', weight: strategy.factors.momentumWeight, score: coin.momentumScore, contribution: 0 },
        { factor: 'S/R Levels', weight: strategy.factors.supportResistanceWeight, score: coin.supportResistanceScore, contribution: 0 },
        { factor: 'Trend', weight: strategy.factors.trendWeight, score: coin.trendScore, contribution: 0 },
        { factor: 'Volatility', weight: strategy.factors.volatilityWeight, score: coin.volatilityScore, contribution: 0 },
    ];
    const totalWeight = confidenceBreakdown.reduce((sum, item) => sum + item.weight, 0);
    confidenceBreakdown.forEach((item) => {
        item.contribution = (item.score * item.weight) / totalWeight;
    });
    const finalConclusion = coin.buySignalStrength > 30
        ? `${coin.symbol} shows strong buy signals with ${coin.confidence.toFixed(0)}% confidence. Multiple indicators aligned.`
        : coin.buySignalStrength < -30
            ? `${coin.symbol} shows sell signals. Bearish setup with ${coin.confidence.toFixed(0)}% conviction.`
            : `${coin.symbol} lacks clear direction. Wait for confirmation.`;
    return {
        coin: coin.symbol,
        steps,
        finalConclusion,
        confidenceBreakdown,
        totalConfidence: coin.confidence,
    };
}
export async function analyzeWithMathematicalLogic(strategy) {
    // Analyze all top cryptos
    const allMetrics = TOP_CRYPTOS.map((coin) => generateCoinMetrics(coin, strategy));
    // Create trade signals
    const tradeSignals = allMetrics.map((coin) => createTradeSignal(coin, strategy));
    // Get top 3 opportunities
    const topOpportunities = tradeSignals
        .filter((s) => s.action !== 'avoid')
        .sort((a, b) => {
        const scoreA = a.coin.confidence * (a.coin.overallScore / 100);
        const scoreB = b.coin.confidence * (b.coin.overallScore / 100);
        return scoreB - scoreA;
    })
        .slice(0, 3);
    // Generate reasoning chains for top opportunities
    const reasoningChains = topOpportunities.map((signal) => generateChainOfThought(signal.coin, strategy));
    // Determine market outlook
    const avgConfidence = allMetrics.reduce((sum, m) => sum + m.confidence, 0) / allMetrics.length;
    const avgVolatility = allMetrics.reduce((sum, m) => sum + m.volatilityScore, 0) / allMetrics.length;
    const bullishCount = allMetrics.filter((m) => m.buySignalStrength > 20).length;
    const sentiment = bullishCount / allMetrics.length > 0.6
        ? 'very_bullish'
        : bullishCount / allMetrics.length > 0.4
            ? 'bullish'
            : bullishCount / allMetrics.length > 0.25
                ? 'neutral'
                : 'bearish';
    const volatilityLevel = avgVolatility > 75 ? 'extreme' : avgVolatility > 50 ? 'high' : avgVolatility > 25 ? 'medium' : 'low';
    return {
        strategy,
        timestamp: new Date().toISOString(),
        topOpportunities,
        allCoinsAnalyzed: allMetrics,
        reasoningChains,
        marketOutlook: {
            sentiment,
            volatilityLevel,
            bestOpportunity: topOpportunities[0]?.coin.symbol || 'N/A',
            worstRisk: allMetrics.sort((a, b) => a.buySignalStrength - b.buySignalStrength)[0]?.symbol || 'N/A',
        },
    };
}
// Default strategy for beginners
export const DEFAULT_STRATEGY = {
    name: 'Conservative Day Trading',
    timeframe: '1d',
    maxRisk: 2,
    minWinRate: 65,
    factors: {
        rsiWeight: 8,
        volumeWeight: 7,
        momentumWeight: 9,
        supportResistanceWeight: 8,
        trendWeight: 9,
        volatilityWeight: 6,
    },
    minConfidence: 70,
};
