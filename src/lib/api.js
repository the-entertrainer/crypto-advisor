const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
export async function analyzeMarket(marketData, news) {
    if (!GROQ_API_KEY) {
        console.warn('GROQ_API_KEY not set, returning mock analysis');
        return getMockAnalysis();
    }
    try {
        const prompt = `You are a crypto market analyst. Analyze the following market data and news to provide a trading signal.

Market Data:
- Bitcoin: $${marketData.btc_price} (${marketData.btc_change_24h > 0 ? '+' : ''}${marketData.btc_change_24h.toFixed(2)}% 24h)
- Ethereum: $${marketData.eth_price} (${marketData.eth_change_24h > 0 ? '+' : ''}${marketData.eth_change_24h.toFixed(2)}% 24h)
- Solana: $${marketData.sol_price} (${marketData.sol_change_24h > 0 ? '+' : ''}${marketData.sol_change_24h.toFixed(2)}% 24h)

News & Events:
${news}

Please provide your analysis in the following JSON format only (no additional text):
{
  "prediction": "buy" | "sell" | "hold",
  "confidence": 0-100,
  "market_signal": "Brief one-line market signal",
  "reasoning": ["reason 1", "reason 2", "reason 3", "reason 4"]
}

Respond ONLY with valid JSON, no markdown or extra text.`;
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'mixtral-8x7b-32768',
                messages: [
                    {
                        role: 'user',
                        content: prompt,
                    },
                ],
                temperature: 0.3,
                max_tokens: 500,
            }),
        });
        if (!response.ok) {
            throw new Error(`Groq API error: ${response.status}`);
        }
        const data = await response.json();
        const content = data.choices[0].message.content;
        const analysis = JSON.parse(content);
        return analysis;
    }
    catch (error) {
        console.error('Error analyzing market:', error);
        return getMockAnalysis();
    }
}
function getMockAnalysis() {
    return {
        prediction: 'hold',
        confidence: 65,
        market_signal: 'Market sentiment is mixed. Wait for clearer signals before taking action.',
        reasoning: [
            'Bitcoin showing positive momentum with +2.45% 24h gain',
            'Ethereum ETF approvals provide institutional tailwinds',
            'Large whale movements detected - potential selling pressure',
            'Wait for next support level test before confirming trend',
        ],
    };
}
