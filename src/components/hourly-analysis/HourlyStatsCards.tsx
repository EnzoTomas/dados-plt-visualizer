
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from 'lucide-react';
import { useIsMobile } from "@/hooks/use-mobile";
import { HourlyAnalysis } from "@/hooks/useHourlyAnalysis";

interface HourlyStatsCardsProps {
  analysis: HourlyAnalysis;
}

export const HourlyStatsCards = ({ analysis }: HourlyStatsCardsProps) => {
  const isMobile = useIsMobile();

  return (
    <Card className="hover-lift border-primary/10">
      <CardHeader className="pb-3 md:pb-4">
        <CardTitle className="text-base md:text-lg font-semibold text-primary flex items-center gap-2">
          <BarChart3 className="h-4 w-4 md:h-5 md:w-5" />
          Médias Operacionais
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-6 pt-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          <div className="text-center p-3 md:p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
            <div className="text-lg md:text-2xl font-bold text-green-700">
              {Math.round(analysis.averagePerHour.inseridos)}
            </div>
            <div className="text-xs md:text-sm text-green-600 font-medium">Inseridos/Hora</div>
          </div>
          
          <div className="text-center p-3 md:p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-lg">
            <div className="text-lg md:text-2xl font-bold text-red-700">
              {Math.round(analysis.averagePerHour.rejeitos)}
            </div>
            <div className="text-xs md:text-sm text-red-600 font-medium">Rejeitos/Hora</div>
          </div>
          
          <div className="text-center p-3 md:p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <div className="text-lg md:text-2xl font-bold text-blue-700">
              {Math.round(analysis.averagePerHour.inseridos + analysis.averagePerHour.rejeitos)}
            </div>
            <div className="text-xs md:text-sm text-blue-600 font-medium">Total/Hora</div>
          </div>
          
          <div className="text-center p-3 md:p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
            <div className="text-lg md:text-2xl font-bold text-purple-700">
              {((analysis.averagePerHour.inseridos / (analysis.averagePerHour.inseridos + analysis.averagePerHour.rejeitos)) * 100).toFixed(1)}%
            </div>
            <div className="text-xs md:text-sm text-purple-600 font-medium">Eficiência Média</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
