
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface HourlyCarouselCardProps {
  hourData: {
    hour: number;
    inseridos: number;
    rejeitos: number;
    eficiencia: number;
  };
  index: number;
  currentPage: number;
  isAnimating: boolean;
}

export const HourlyCarouselCard = ({ 
  hourData, 
  index, 
  currentPage, 
  isAnimating 
}: HourlyCarouselCardProps) => {
  const formatHour = (hour: number) => `${String(hour).padStart(2, '0')}h`;

  const getTurnoColor = (hour: number) => {
    if (hour >= 6 && hour < 14) return 'bg-blue-50 border-blue-200 text-blue-700';
    if (hour >= 14 && hour < 22) return 'bg-orange-50 border-orange-200 text-orange-700';
    return 'bg-purple-50 border-purple-200 text-purple-700';
  };

  const getTurnoName = (hour: number) => {
    if (hour >= 6 && hour < 14) return '1º Turno';
    if (hour >= 14 && hour < 22) return '2º Turno';
    return '3º Turno';
  };

  return (
    <Card 
      key={`${hourData.hour}-${currentPage}`}
      className={`border-2 ${getTurnoColor(hourData.hour)} transition-all duration-300 hover:scale-105 hover:shadow-lg transform`}
      style={{
        animationDelay: `${index * 50}ms`,
        animation: !isAnimating ? `fadeInUp 0.6s ease-out ${index * 50}ms both` : 'none'
      }}
    >
      <CardContent className="p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold text-base transition-colors duration-200">
            {formatHour(hourData.hour)}
          </span>
          <span className="text-xs px-2 py-1 bg-white/60 rounded transition-all duration-200 hover:bg-white/80">
            {getTurnoName(hourData.hour)}
          </span>
        </div>
        
        <div className="space-y-2">
          <div className="text-center p-2 bg-white/50 rounded transition-all duration-200 hover:bg-white/70 hover:scale-105">
            <div className="font-bold text-green-600 text-sm">{hourData.inseridos}</div>
            <div className="text-xs text-muted-foreground">Inseridos</div>
          </div>
          <div className="text-center p-2 bg-white/50 rounded transition-all duration-200 hover:bg-white/70 hover:scale-105">
            <div className="font-bold text-red-600 text-sm">{hourData.rejeitos}</div>
            <div className="text-xs text-muted-foreground">Rejeitados</div>
          </div>
        </div>
        
        <div className="mt-2 text-center text-xs text-muted-foreground">
          <span className="inline-flex items-center px-2 py-1 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
            {hourData.eficiencia.toFixed(1)}% eficiência
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
