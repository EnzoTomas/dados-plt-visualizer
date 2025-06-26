
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Target, TrendingUp, TrendingDown } from 'lucide-react';
import { useIsMobile } from "@/hooks/use-mobile";
import { HourlyAnalysis } from "@/hooks/useHourlyAnalysis";

interface HourlyHighlightCardsProps {
  analysis: HourlyAnalysis;
}

export const HourlyHighlightCards = ({ analysis }: HourlyHighlightCardsProps) => {
  const isMobile = useIsMobile();

  const formatHour = (hour: number) => `${String(hour).padStart(2, '0')}h`;

  return (
    <div className={`grid ${isMobile ? 'grid-cols-3 gap-2' : 'grid-cols-1 md:grid-cols-3 gap-4'}`}>
      <Card className="hover:shadow-lg transition-all duration-300 border-primary/10">
        <CardContent className={`${isMobile ? 'p-2' : 'p-3 md:p-4'} text-center`}>
          <Target className={`${isMobile ? 'h-4 w-4' : 'h-6 w-6 md:h-8 md:w-8'} mx-auto mb-1 md:mb-2 text-green-600`} />
          <h3 className={`font-semibold ${isMobile ? 'text-xs' : 'text-xs md:text-sm'} text-muted-foreground mb-1`}>Pico de Eficiência</h3>
          <div className={`${isMobile ? 'text-sm' : 'text-xl md:text-2xl'} font-bold text-primary`}>{formatHour(analysis.bestEfficiencyHour.hour)}</div>
          <div className={`${isMobile ? 'text-xs' : 'text-xs md:text-sm'} text-muted-foreground`}>{analysis.bestEfficiencyHour.eficiencia.toFixed(1)}%</div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-all duration-300 border-primary/10">
        <CardContent className={`${isMobile ? 'p-2' : 'p-3 md:p-4'} text-center`}>
          <TrendingUp className={`${isMobile ? 'h-4 w-4' : 'h-6 w-6 md:h-8 md:w-8'} mx-auto mb-1 md:mb-2 text-blue-600`} />
          <h3 className={`font-semibold ${isMobile ? 'text-xs' : 'text-xs md:text-sm'} text-muted-foreground mb-1`}>Maior Produção</h3>
          <div className={`${isMobile ? 'text-sm' : 'text-xl md:text-2xl'} font-bold text-primary`}>{formatHour(analysis.peakProductionHour.hour)}</div>
          <div className={`${isMobile ? 'text-xs' : 'text-xs md:text-sm'} text-muted-foreground`}>{analysis.peakProductionHour.inseridos} inseridos</div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-all duration-300 border-primary/10">
        <CardContent className={`${isMobile ? 'p-2' : 'p-3 md:p-4'} text-center`}>
          <TrendingDown className={`${isMobile ? 'h-4 w-4' : 'h-6 w-6 md:h-8 md:w-8'} mx-auto mb-1 md:mb-2 text-red-600`} />
          <h3 className={`font-semibold ${isMobile ? 'text-xs' : 'text-xs md:text-sm'} text-muted-foreground mb-1`}>Menor Volume</h3>
          <div className={`${isMobile ? 'text-sm' : 'text-xl md:text-2xl'} font-bold text-primary`}>{formatHour(analysis.lowestVolumeHour.hour)}</div>
          <div className={`${isMobile ? 'text-xs' : 'text-xs md:text-sm'} text-muted-foreground`}>{analysis.lowestVolumeHour.total} total</div>
        </CardContent>
      </Card>
    </div>
  );
};
