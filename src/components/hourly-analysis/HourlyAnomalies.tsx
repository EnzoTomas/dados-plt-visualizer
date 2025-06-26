
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from 'lucide-react';
import { useIsMobile } from "@/hooks/use-mobile";
import { HourlyAnalysis } from "@/hooks/useHourlyAnalysis";

interface HourlyAnomaliesProps {
  analysis: HourlyAnalysis;
}

export const HourlyAnomalies = ({ analysis }: HourlyAnomaliesProps) => {
  const isMobile = useIsMobile();

  if (analysis.anomalies.length === 0) {
    return null;
  }

  return (
    <Card className="border-yellow-300 bg-gradient-to-r from-yellow-50 to-orange-50 shadow-lg">
      <CardHeader className="pb-3 md:pb-4">
        <CardTitle className="text-yellow-800 flex items-center gap-2 text-base md:text-lg">
          <AlertTriangle className="h-4 w-4 md:h-5 md:w-5" />
          Anomalias Detectadas
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-6 pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {analysis.anomalies.map((anomaly, index) => (
            <div key={index} className="flex items-center justify-between bg-white/70 p-3 rounded-lg border border-yellow-200">
              <div>
                <span className="font-semibold text-yellow-800 text-sm md:text-base">
                  {String(anomaly.hour).padStart(2, '0')}:00
                </span>
                <p className="text-xs md:text-sm text-yellow-700">{anomaly.type}</p>
              </div>
              <span className="text-red-600 font-bold bg-red-100 px-2 py-1 rounded text-xs md:text-sm">
                {anomaly.value} rejeitos
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
