
import { Card } from "@/components/ui/card";
import { CountUp } from "@/components/CountUp";
import { Clock, TrendingUp, Users } from "lucide-react";

interface CircularProgressProps {
  percentage: number;
  label: string;
  inseridos: number;
  rejeitos: number;
}

export const CircularProgress = ({ percentage, label, inseridos, rejeitos }: CircularProgressProps) => {
  const radius = 50;
  const strokeWidth = 6;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getColor = () => {
    if (percentage >= 92) return "#10b981"; // green - nova meta
    if (percentage >= 70) return "#f59e0b"; // yellow - zona crítica ajustada
    return "#ef4444"; // red
  };

  const getHeaderGradient = () => {
    if (percentage >= 92) return "from-green-500 to-green-600";
    if (percentage >= 70) return "from-yellow-500 to-yellow-600";
    return "from-red-500 to-red-600";
  };

  const total = inseridos + rejeitos;

  return (
    <Card className="relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-white border border-gray-200 shadow-lg scroll-animate group">
      {/* Header with gradient */}
      <div className={`bg-gradient-to-r ${getHeaderGradient()} p-4 transition-all duration-300 group-hover:shadow-lg`}>
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <Clock className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
          {label}
        </div>
      </div>

      {/* Main content */}
      <div className="p-6">
        {/* Circular progress */}
        <div className="flex justify-center mb-6">
          <div className="relative group-hover:scale-105 transition-transform duration-300">
            <svg
              height={radius * 2}
              width={radius * 2}
              className="transform -rotate-90 drop-shadow-sm"
            >
              <circle
                stroke="#e5e7eb"
                fill="transparent"
                strokeWidth={strokeWidth}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />
              <circle
                stroke={getColor()}
                fill="transparent"
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                style={{ 
                  strokeDashoffset,
                  transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.3s ease',
                }}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-xl font-bold" style={{ color: getColor() }}>
                <CountUp end={percentage} decimals={1} suffix="%" />
              </div>
              <div className="text-xs text-muted-foreground font-medium">EFICIÊNCIA</div>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-3 border border-green-200/50 transition-all duration-300 hover:bg-green-50 hover:border-green-300 hover:shadow-md hover:scale-105">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-green-500 rounded-full transition-all duration-300 group-hover:scale-125"></div>
              <span className="text-xs font-medium text-green-700">Inseridos</span>
            </div>
            <div className="text-xl font-bold text-green-800">
              <CountUp end={inseridos} />
            </div>
            <div className="text-xs text-green-600">
              {total > 0 ? `${((inseridos / total) * 100).toFixed(1)}%` : '0%'} do total
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-3 border border-red-200/50 transition-all duration-300 hover:bg-red-50 hover:border-red-300 hover:shadow-md hover:scale-105">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-red-500 rounded-full transition-all duration-300 group-hover:scale-125"></div>
              <span className="text-xs font-medium text-red-700">Rejeitos</span>
            </div>
            <div className="text-xl font-bold text-red-800">
              <CountUp end={rejeitos} />
            </div>
            <div className="text-xs text-red-600">
              {total > 0 ? `${((rejeitos / total) * 100).toFixed(1)}%` : '0%'} do total
            </div>
          </div>
        </div>

        {/* Total volume */}
        <div className="mt-4 bg-gray-50 rounded-lg p-3 border border-gray-200/50 transition-all duration-300 hover:bg-blue-50 hover:border-blue-300 hover:shadow-md hover:scale-105">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary transition-transform duration-300 group-hover:scale-110" />
              <span className="text-sm font-medium text-primary">Volume Total</span>
            </div>
            <div className="text-lg font-bold text-primary">
              <CountUp end={total} />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
