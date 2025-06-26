
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Clock, Target } from 'lucide-react';
import { useIsMobile } from "@/hooks/use-mobile";

interface ShiftSummaryCardsProps {
  shifts: {
    turno1: { inseridos: number; rejeitos: number; eficiencia: number; };
    turno2: { inseridos: number; rejeitos: number; eficiencia: number; };
    turno3: { inseridos: number; rejeitos: number; eficiencia: number; };
  };
  bestEfficiencyHour: { hour: number; eficiencia: number; };
  peakProductionHour: { hour: number; inseridos: number; };
  lowestVolumeHour: { hour: number; total: number; };
}

export const ShiftSummaryCards = ({ 
  shifts, 
  bestEfficiencyHour, 
  peakProductionHour, 
  lowestVolumeHour 
}: ShiftSummaryCardsProps) => {
  const isMobile = useIsMobile();
  const formatHour = (hour: number) => `${String(hour).padStart(2, '0')}:00`;

  const shiftData = [
    {
      name: "1º Turno",
      period: "06:00-14:00",
      color: "blue",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-700",
      iconColor: "text-blue-600",
      ...shifts.turno1
    },
    {
      name: "2º Turno", 
      period: "14:00-22:00",
      color: "orange",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200", 
      textColor: "text-orange-700",
      iconColor: "text-orange-600",
      ...shifts.turno2
    },
    {
      name: "3º Turno",
      period: "22:00-06:00", 
      color: "purple",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      textColor: "text-purple-700",
      iconColor: "text-purple-600",
      ...shifts.turno3
    }
  ];

  const highlightCards = [
    {
      title: "Pico de Eficiência",
      value: `${formatHour(bestEfficiencyHour.hour)}`,
      subtitle: `${bestEfficiencyHour.eficiencia.toFixed(1)}%`,
      icon: Target,
      color: "green"
    },
    {
      title: "Maior Produção",
      value: `${formatHour(peakProductionHour.hour)}`,
      subtitle: `${peakProductionHour.inseridos} inseridos`,
      icon: TrendingUp,
      color: "blue"
    },
    {
      title: "Menor Volume",
      value: `${formatHour(lowestVolumeHour.hour)}`,
      subtitle: `${lowestVolumeHour.total} total`,
      icon: TrendingDown,
      color: "red"
    }
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Cards dos Turnos */}
      <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-1 md:grid-cols-3 gap-4'}`}>
        {shiftData.map((shift, index) => (
          <Card key={index} className={`${shift.bgColor} ${shift.borderColor} border-2 hover:shadow-lg transition-all duration-300`}>
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className={`font-bold text-base md:text-lg ${shift.textColor}`}>{shift.name}</h3>
                  <p className="text-xs text-muted-foreground">{shift.period}</p>
                </div>
                <Clock className={`h-4 w-4 md:h-5 md:w-5 ${shift.iconColor}`} />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs md:text-sm text-muted-foreground">Eficiência</span>
                  <span className={`font-bold text-base md:text-lg ${shift.textColor}`}>
                    {shift.eficiencia.toFixed(1)}%
                  </span>
                </div>
                
                <div className={`grid grid-cols-2 gap-2 text-xs ${isMobile ? 'text-xs' : 'text-xs'}`}>
                  <div className="text-center p-2 bg-white/50 rounded">
                    <div className="font-medium text-green-600">{shift.inseridos}</div>
                    <div className="text-muted-foreground">Inseridos</div>
                  </div>
                  <div className="text-center p-2 bg-white/50 rounded">
                    <div className="font-medium text-red-600">{shift.rejeitos}</div>
                    <div className="text-muted-foreground">Rejeitos</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cards de Destaques */}
      <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-1 md:grid-cols-3 gap-4'}`}>
        {highlightCards.map((card, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300 border-primary/10">
            <CardContent className="p-3 md:p-4 text-center">
              <card.icon className={`h-6 w-6 md:h-8 md:w-8 mx-auto mb-2 text-${card.color}-600`} />
              <h3 className="font-semibold text-xs md:text-sm text-muted-foreground mb-1">{card.title}</h3>
              <div className="text-xl md:text-2xl font-bold text-primary">{card.value}</div>
              <div className="text-xs md:text-sm text-muted-foreground">{card.subtitle}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
