import { computeSignals } from './indicators';
import { formatPrice } from './utils';
// ─── Scoring ──────────────────────────────────────────────────────────────────
function score(sig, change24h, risk) {
    let s = 0;
    // RSI
    if (sig.rsi < 28)
        s += 4;
    else if (sig.rsi < 38)
        s += 2;
    else if (sig.rsi < 48)
        s += 1;
    else if (sig.rsi > 72)
        s -= 3;
    else if (sig.rsi > 62)
        s -= 1;
    // Trend
    const trendScore = {
        strong_up: 3, up: 1, sideways: 0, down: -1, strong_down: -3,
    };
    s += trendScore[sig.trend];
    // EMA
    const emaScore = {
        golden_cross: 3, bullish: 1, neutral: 0, bearish: -1, death_cross: -3,
    };
    s += emaScore[sig.emaSignal];
    // Momentum
    if (sig.momentum > 8)
        s += 1;
    else if (sig.momentum < -15)
        s -= 2;
    // Volume confirming price
    if (sig.relativeVolume > 15 && change24h > 2)
        s += 2;
    else if (sig.relativeVolume > 10 && change24h > 0)
        s += 1;
    else if (sig.relativeVolume > 15 && change24h < -5)
        s -= 2;
    const threshold = risk === 'conservative' ? 5 : risk === 'aggressive' ? 2 : 3;
    let signal;
    let confidence;
    if (s >= threshold + 2) {
        signal = 'strong_buy';
        confidence = Math.min(93, 62 + s * 3);
    }
    else if (s >= threshold) {
        signal = 'buy';
        confidence = Math.min(83, 56 + s * 3);
    }
    else if (s >= -1) {
        signal = 'wait';
        confidence = 50;
    }
    else {
        signal = 'avoid';
        confidence = Math.min(88, 55 + Math.abs(s) * 3);
    }
    return { signal, confidence };
}
// ─── Natural language builders ────────────────────────────────────────────────
function rsiText(rsi) {
    if (rsi < 25)
        return 'virtually everyone who wanted to sell has already sold — this is as oversold as it gets';
    if (rsi < 35)
        return 'sellers are running out of energy and the downside pressure is fading';
    if (rsi < 46)
        return "it's been quietly pulling back without much drama — a decent entry zone";
    if (rsi < 56)
        return "sitting right in the middle with no strong conviction either way";
    if (rsi < 66)
        return "climbing with real momentum and still has room to run";
    if (rsi < 74)
        return "running strong but starting to get stretched — handle with care";
    return "overbought and overextended — history says a cooldown is coming";
}
function trendText(trend, name) {
    switch (trend) {
        case 'strong_up': return `${name} is in a clear, strong uptrend right now`;
        case 'up': return `${name} has been steadily climbing`;
        case 'sideways': return `${name} has been going sideways — coiling up, building pressure`;
        case 'down': return `${name} has been slowly drifting lower`;
        case 'strong_down': return `${name} is falling hard right now`;
    }
}
function buildNarrative(coin, sig, signal) {
    const parts = [];
    const cur = coin.price;
    parts.push(trendText(sig.trend, coin.name) + '.');
    if (sig.emaSignal === 'golden_cross') {
        parts.push("Its short-term moving average just crossed above the longer-term one — historically, this is exactly when things start accelerating upward.");
    }
    else if (sig.emaSignal === 'death_cross') {
        parts.push("Its short-term average just crossed below the longer-term one — this usually signals more downside before a recovery.");
    }
    parts.push(`At RSI ${sig.rsi.toFixed(0)}, ${rsiText(sig.rsi)}.`);
    const distToSup = cur > 0 ? ((cur - sig.support) / cur) * 100 : 0;
    const distToRes = cur > 0 ? ((sig.resistance - cur) / cur) * 100 : 0;
    if (distToSup >= 0 && distToSup < 4) {
        parts.push(`It's sitting right above support at ${formatPrice(sig.support)} — a level buyers have defended multiple times before.`);
    }
    if (distToRes > 0 && distToRes < 7) {
        parts.push(`There's resistance just ahead at ${formatPrice(sig.resistance)} — breaking through there cleanly would be a strong signal.`);
    }
    if (sig.relativeVolume > 15) {
        parts.push(`Volume is noticeably elevated today — ${sig.relativeVolume.toFixed(0)}% of its market cap is trading hands, which usually means something real is happening.`);
    }
    else if (sig.relativeVolume < 3 && (signal === 'buy' || signal === 'strong_buy')) {
        parts.push("Volume is thin right now, so wait for it to pick up before sizing up a position.");
    }
    switch (signal) {
        case 'strong_buy':
            parts.push("Everything lines up here. This is one of the cleaner setups available right now.");
            break;
        case 'buy':
            parts.push("The risk/reward is favorable. A measured entry makes sense.");
            break;
        case 'wait':
            parts.push("No clear edge yet. Better to wait for a dip toward support or a confirmed break higher.");
            break;
        case 'avoid':
            parts.push("Too many things pointing the wrong way. Better opportunities will come — sit this one out.");
            break;
    }
    return parts.join(' ');
}
function buildBullets(coin, sig) {
    const rsiLine = sig.rsi < 35
        ? `RSI is ${sig.rsi.toFixed(0)} — deep in oversold territory, a historically good entry zone`
        : sig.rsi > 70
            ? `RSI is ${sig.rsi.toFixed(0)} — overbought, elevated risk of a pullback`
            : `RSI is ${sig.rsi.toFixed(0)} — ${sig.rsi < 50 ? 'plenty of room to run' : 'healthy momentum'}`;
    const changeLine = Math.abs(coin.change24h) > 5
        ? `${coin.change24h >= 0 ? 'Up' : 'Down'} ${Math.abs(coin.change24h).toFixed(1)}% today — ${coin.change24h > 0 ? 'strong buying pressure' : 'heavy selling, watch for stabilisation'}`
        : Math.abs(coin.change24h) < 0.8
            ? `Flat today (${coin.change24h >= 0 ? '+' : ''}${coin.change24h.toFixed(1)}%) — quiet accumulation or indecision`
            : `${coin.change24h >= 0 ? 'Up' : 'Down'} ${Math.abs(coin.change24h).toFixed(1)}% — moderate movement`;
    const volLine = `Volume is ${sig.relativeVolume > 12 ? 'elevated' : sig.relativeVolume < 3 ? 'thin' : 'normal'} at ${sig.relativeVolume.toFixed(1)}% of market cap traded today`;
    return [rsiLine, changeLine, volLine];
}
// ─── Public API ────────────────────────────────────────────────────────────────
export function generateInsight(coin, riskTolerance = 'balanced') {
    const sig = computeSignals(coin.sparkline, coin.volume24h, coin.marketCap);
    const { signal, confidence } = score(sig, coin.change24h, riskTolerance);
    const entry = coin.price;
    const isBuy = signal === 'strong_buy' || signal === 'buy';
    const target = isBuy
        ? Math.max(sig.resistance * 0.99, entry * 1.06)
        : sig.resistance;
    const stopLoss = isBuy
        ? Math.min(sig.support * 1.01, entry * 0.96)
        : sig.support;
    const riskPct = entry > 0 ? Math.abs((entry - stopLoss) / entry) * 100 : 5;
    const rewardPct = entry > 0 ? Math.abs((target - entry) / entry) * 100 : 8;
    const timeframe = Math.abs(sig.momentum) > 6 ? '12–24 hours' : '1–2 days';
    return {
        coin,
        signal,
        confidence,
        entry,
        target,
        stopLoss,
        riskPct,
        rewardPct,
        narrative: buildNarrative(coin, sig, signal),
        bullets: buildBullets(coin, sig),
        technical: sig,
        timeframe,
    };
}
export function marketNarrative(coins, fg, global) {
    if (!coins.length)
        return '';
    const pos = coins.filter((c) => c.change24h > 0).length;
    const ratio = pos / coins.length;
    const fgText = fg
        ? fg.value <= 24
            ? 'The market is in extreme fear right now.'
            : fg.value <= 44
                ? 'Sentiment is cautious and a bit fearful.'
                : fg.value <= 55
                    ? 'Sentiment is fairly neutral.'
                    : fg.value <= 74
                        ? 'Greed is building — people are feeling optimistic.'
                        : 'Extreme greed is in the air. Markets are stretched and emotional.'
        : '';
    let overview;
    if (ratio > 0.72)
        overview = `Strong day across the board — ${Math.round(ratio * 100)}% of coins are in the green.`;
    else if (ratio > 0.52)
        overview = 'More winners than losers today, but not by a landslide.';
    else if (ratio > 0.32)
        overview = 'More red than green today. The market is under some pressure.';
    else
        overview = `Broad selloff — only ${Math.round(ratio * 100)}% of the top coins are holding up.`;
    const btcText = global
        ? ` Bitcoin dominates ${global.btcDominance.toFixed(0)}% of the market${global.marketCapChange24h
            ? `, and the total market ${global.marketCapChange24h > 0 ? 'grew' : 'shrank'} ${Math.abs(global.marketCapChange24h).toFixed(1)}% today`
            : ''}.`
        : '';
    return [fgText, overview + btcText].filter(Boolean).join(' ');
}
