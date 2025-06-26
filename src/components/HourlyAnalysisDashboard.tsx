
import React, { useState } from 'react';
import { ProcessedDataItem } from "@/hooks/useProcessedData";
import { useHourlyAnalysis } from "@/hooks/useHourlyAnalysis";
import { HourlyProductionChart } from "@/components/HourlyProductionChart";
import { useIsMobile } from "@/hooks/use-mobile";
import { HourlyAnalysisHeader } from "@/components/hourly-analysis/HourlyAnalysisHeader";
import { HourlyHighlightCards } from "@/components/hourly-analysis/HourlyHighlightCards";
import { HourlyDataCarousel } from "@/components/hourly-analysis/HourlyDataCarousel";
import { HourlyStatsCards } from "@/components/hourly-analysis/HourlyStatsCards";
import { HourlyAnomalies } from "@/components/hourly-analysis/HourlyAnomalies";

interface HourlyAnalysisDashboardProps {
  filteredData: ProcessedDataItem[];
}

export const HourlyAnalysisDashboard = ({ filteredData }: HourlyAnalysisDashboardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const analysis = useHourlyAnalysis(filteredData);
  const isMobile = useIsMobile();

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      {/* Header with expand/collapse functionality */}
      <HourlyAnalysisHeader
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded(!isExpanded)}
        dataLength={filteredData.length}
      />

      {isExpanded && (
        <div className="animate-hourly-reveal space-y-4 md:space-y-6">
          {/* Highlight cards with key metrics */}
          <HourlyHighlightCards analysis={analysis} />

          {/* Main visualization - Carousel for mobile, Chart for desktop */}
          {isMobile ? (
            <HourlyDataCarousel analysis={analysis} />
          ) : (
            <div className="w-full">
              <HourlyProductionChart hourlyData={analysis.hourlyData} />
            </div>
          )}

          {/* Operational averages */}
          <HourlyStatsCards analysis={analysis} />

          {/* Anomalies (if any) */}
          <HourlyAnomalies analysis={analysis} />
        </div>
      )}
    </div>
  );
};
