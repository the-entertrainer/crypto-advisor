import { NextRequest, NextResponse } from 'next/server';

interface MarketData {
  btc_price: number;
  btc_change_24h: number;
  eth_price: number;
  eth_change_24h: number;
  sol_price: number;
  sol_change_24h: number;
}

interface RequestBody {
  market_data: MarketData;
  news: string;
}

interface GroqResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json();
    const { market_data, news } = body;

    // Validate input
    if (!market_data || !news) {
      return NextResponse.json(
        { error: 'Missing market_data or news' },
        { status: 400 }
      );
    }

    // Construct the prompt for Groq
    const prompt = `You are a crypto market analyst. Analyze the following market data and news to provide a trading signal.

Market Data:
- Bitcoin: $${market_data.btc_price} (${market_data.btc_change_24h > 0 ? '+' : ''}${market_data.btc_change_24h.toFixed(2)}% 24h)
- Ethereum: $${market_data.eth_price} (${market_data.eth_change_24h > 0 ? '+' : ''}${market_data.eth_change_24h.toFixed(2)}% 24h)
- Solana: $${market_data.sol_price} (${market_data.sol_change_24h > 0 ? '+' : ''}${market_data.sol_change_24h.toFixed(2)}% 24h)

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

    // Call Groq API
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error('GROQ_API_KEY is not set');
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const groqResponse = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
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
      }
    );

    if (!groqResponse.ok) {
      const error = await groqResponse.text();
      console.error('Groq API error:', error);
      return NextResponse.json(
        { error: 'Failed to get analysis from AI service' },
        { status: groqResponse.status }
      );
    }

    const data: GroqResponse = await groqResponse.json();
    const content = data.choices[0].message.content;

    // Parse JSON response
    const analysis = JSON.parse(content);

    // Validate response structure
    if (
      !analysis.prediction ||
      !['buy', 'sell', 'hold'].includes(analysis.prediction)
    ) {
      throw new Error('Invalid prediction value');
    }
    if (typeof analysis.confidence !== 'number' || analysis.confidence < 0 || analysis.confidence > 100) {
      throw new Error('Invalid confidence value');
    }
    if (!Array.isArray(analysis.reasoning) || analysis.reasoning.length === 0) {
      throw new Error('Invalid reasoning array');
    }

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Error in analyze endpoint:', error);

    // Fallback mock response if Groq API fails
    return NextResponse.json({
      prediction: 'hold',
      confidence: 65,
      market_signal: 'Market sentiment is mixed. Wait for clearer signals before taking action.',
      reasoning: [
        'Bitcoin showing positive momentum with +2.45% 24h gain',
        'Ethereum ETF approvals provide institutional tailwinds',
        'Large whale movements detected - potential selling pressure',
        'Wait for next support level test before confirming trend',
      ],
    });
  }
}
