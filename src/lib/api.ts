import { Analysis } from './types';

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export async function analyzeMarket(
  marketData: {
    btc_price: number;
    btc_change_24h: number;
    eth_price: number;
    eth_change_24h: number;
    sol_price: number;
    sol_change_24h: number;
  },
  news: string
): Promise<Analysis> {
  if (!GROQ_API_KEY) {
    console.warn('GROQ_API_KEY not set, returning mock analysis');
    return getMockAnalysis();
  }

  try {
    const prompt = `You are an expert crypto market analyst. Analyze the current market conditions and news to predict which cryptocurrencies will increase in value and which to avoid.

CURRENT MARKET DATA:
- Bitcoin (BTC): $${marketData.btc_price} (24h: ${marketData.btc_change_24h > 0 ? '+' : ''}${marketData.btc_change_24h.toFixed(2)}%)
- Ethereum (ETH): $${marketData.eth_price} (24h: ${marketData.eth_change_24h > 0 ? '+' : ''}${marketData.eth_change_24h.toFixed(2)}%)
- Solana (SOL): $${marketData.sol_price} (24h: ${marketData.sol_change_24h > 0 ? '+' : ''}${marketData.sol_change_24h.toFixed(2)}%)

MARKET EVENTS & NEWS:
${news}

Based on this information, provide a detailed market analysis with specific crypto recommendations.

Respond ONLY with this exact JSON format (no markdown, no extra text):
{
  "market_analysis": "3-4 sentence analysis of current market conditions and why",
  "overall_sentiment": "very_bullish|bullish|neutral|bearish|very_bearish",
  "confidence": 65-95,
  "market_events": ["event 1 that affects market", "event 2", "event 3"],
  "buys": [
    {
      "symbol": "BTC",
      "action": "buy",
      "reason": "Specific reason based on news/technicals",
      "potential": "+15-25% in next 2-4 weeks"
    }
  ],
  "avoids": [
    {
      "symbol": "SOL",
      "action": "avoid",
      "reason": "Specific reason why to stay away",
      "potential": "-10-20% risk"
    }
  ]
}

Remember:
- buys should contain cryptos likely to rise soon
- avoids should contain cryptos with downside risk
- Be specific about WHY for each recommendation
- Base decisions on the news/events provided`;

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

    return analysis as Analysis;
  } catch (error) {
    console.error('Error analyzing market:', error);
    return getMockAnalysis();
  }
}

function getMockAnalysis(): Analysis {
  return {
    market_analysis:
      'Current market shows strong institutional buying signals with SEC ETF approvals driving positive sentiment. Bitcoin is consolidating at key resistance while Ethereum benefits from protocol upgrades. However, whale movements suggest profit-taking risks in the short term.',
    overall_sentiment: 'bullish',
    confidence: 78,
    market_events: [
      'SEC Bitcoin ETF approval expanding institutional adoption',
      'Ethereum Merge 2.0 development update released',
      '500 BTC whale transfer to unknown wallet detected',
      'Global regulatory clarity improving for major assets',
    ],
    buys: [
      {
        symbol: 'BTC',
        action: 'buy',
        reason: 'Institutional ETF inflows creating strong support. Breaking above $68,000 targets $72,000+',
        potential: '+8-12% short-term',
      },
      {
        symbol: 'ETH',
        action: 'buy',
        reason: 'Protocol upgrade news + staking rewards + institutional adoption. Technical breakout imminent',
        potential: '+12-18% next 3 weeks',
      },
    ],
    avoids: [
      {
        symbol: 'SOL',
        action: 'avoid',
        reason: 'Overbought on technical indicators. Whale accumulation suggests distribution phase starting',
        potential: '-5-10% correction likely',
      },
    ],
  };
}
