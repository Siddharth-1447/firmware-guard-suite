import { useEffect, useState } from 'react';

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}

export const CircularProgress = ({ percentage, size = 200, strokeWidth = 12 }: CircularProgressProps) => {
  const [progress, setProgress] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  const getColor = () => {
    if (percentage >= 80) return 'hsl(140 70% 50%)'; // Green
    if (percentage >= 50) return 'hsl(45 95% 55%)'; // Yellow
    return 'hsl(0 85% 60%)'; // Red
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="hsl(var(--border))"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor()}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          style={{
            filter: `drop-shadow(0 0 8px ${getColor()})`,
          }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-4xl font-bold" style={{ color: getColor() }}>
          {Math.round(progress)}%
        </span>
        <span className="text-sm text-muted-foreground mt-1">Safety Score</span>
      </div>
    </div>
  );
};
