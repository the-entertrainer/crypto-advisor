import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function ConfidenceRing({ confidence }) {
    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (confidence / 100) * circumference;
    const getColor = (conf) => {
        if (conf >= 75)
            return '#10b981';
        if (conf >= 50)
            return '#f59e0b';
        return '#ef4444';
    };
    return (_jsxs("div", { className: "flex flex-col items-center", children: [_jsxs("svg", { width: "80", height: "80", viewBox: "0 0 80 80", children: [_jsx("circle", { cx: "40", cy: "40", r: radius, fill: "none", stroke: "#3f3f46", strokeWidth: "3" }), _jsx("circle", { cx: "40", cy: "40", r: radius, fill: "none", stroke: getColor(confidence), strokeWidth: "3", strokeDasharray: circumference, strokeDashoffset: offset, strokeLinecap: "round", style: {
                            transform: 'rotate(-90deg)',
                            transformOrigin: '50% 50%',
                            transition: 'stroke-dashoffset 0.5s ease',
                        } }), _jsxs("text", { x: "40", y: "45", textAnchor: "middle", fontSize: "20", fontWeight: "bold", fill: "white", children: [confidence, "%"] })] }), _jsx("p", { className: "text-xs text-zinc-500 mt-2", children: "Confidence" })] }));
}
