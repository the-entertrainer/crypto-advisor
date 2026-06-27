import { jsx as _jsx } from "react/jsx-runtime";
export function Sparkline({ data, width = 64, height = 28, positive }) {
    if (!data?.length || data.length < 2)
        return null;
    // Downsample to ~40 pts for clean rendering
    const step = Math.max(1, Math.floor(data.length / 40));
    const sampled = data.filter((_, i) => i % step === 0);
    const min = Math.min(...sampled);
    const max = Math.max(...sampled);
    const range = max - min || 1;
    const pts = sampled
        .map((p, i) => {
        const x = ((i / (sampled.length - 1)) * width).toFixed(1);
        const y = (height - ((p - min) / range) * (height - 2) - 1).toFixed(1);
        return `${x},${y}`;
    })
        .join(' ');
    const isUp = positive !== undefined
        ? positive
        : data[data.length - 1] >= data[0];
    return (_jsx("svg", { width: width, height: height, viewBox: `0 0 ${width} ${height}`, fill: "none", "aria-hidden": true, children: _jsx("polyline", { points: pts, stroke: `rgba(255,255,255,${isUp ? 0.8 : 0.3})`, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }));
}
