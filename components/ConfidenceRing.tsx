interface ConfidenceRingProps {
  confidence: number;
}

export default function ConfidenceRing({ confidence }: ConfidenceRingProps) {
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (confidence / 100) * circumference;

  const getColor = (conf: number) => {
    if (conf >= 75) return '#10b981'; // emerald
    if (conf >= 50) return '#f59e0b'; // amber
    return '#ef4444'; // red
  };

  return (
    <div className="flex flex-col items-center">
      <svg width="80" height="80" viewBox="0 0 80 80">
        {/* Background circle */}
        <circle
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          stroke="#3f3f46"
          strokeWidth="3"
        />
        {/* Progress circle */}
        <circle
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          stroke={getColor(confidence)}
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%',
            transition: 'stroke-dashoffset 0.5s ease',
          }}
        />
        {/* Center text */}
        <text
          x="40"
          y="45"
          textAnchor="middle"
          fontSize="20"
          fontWeight="bold"
          fill="white"
        >
          {confidence}%
        </text>
      </svg>
      <p className="text-xs text-zinc-500 mt-2">Confidence</p>
    </div>
  );
}
