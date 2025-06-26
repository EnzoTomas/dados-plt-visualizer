
import { PeriodSelector } from "@/components/PeriodSelector";
import { MainKPICards } from "@/components/MainKPICards";
import { CircularProgress } from "@/components/CircularProgress";
import { RejectAnalysisCharts } from "@/components/RejectAnalysisCharts";
import { TrendChart } from "@/components/TrendChart";
import { VolumeChart } from "@/components/VolumeChart";
import { HourlyAnalysisDashboard } from "@/components/HourlyAnalysisDashboard";

interface DashboardProps {
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  filteredData: any[];
  aggregatedData: any;
  trendData: any[];
}

export const Dashboard = ({
  selectedPeriod,
  onPeriodChange,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  filteredData,
  aggregatedData,
  trendData
}: DashboardProps) => {
  return (
    <>
      {/* Period Selector */}
      <PeriodSelector
        selectedPeriod={selectedPeriod}
        onPeriodChange={onPeriodChange}
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
      />

      {/* Main KPI Cards */}
      <MainKPICards aggregatedData={aggregatedData} />

      {/* Shift Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CircularProgress
          percentage={aggregatedData.aderencia1T}
          label="Turno 1 (06:00 - 14:00)"
          inseridos={aggregatedData.inseridos1T}
          rejeitos={aggregatedData.rejeitos1T}
        />
        <CircularProgress
          percentage={aggregatedData.aderencia2T}
          label="Turno 2 (14:00 - 22:00)"
          inseridos={aggregatedData.inseridos2T}
          rejeitos={aggregatedData.rejeitos2T}
        />
        <CircularProgress
          percentage={aggregatedData.aderencia3T}
          label="Turno 3 (22:00 - 06:00)"
          inseridos={aggregatedData.inseridos3T}
          rejeitos={aggregatedData.rejeitos3T}
        />
      </div>

      {/* Hourly Analysis Dashboard */}
      <HourlyAnalysisDashboard filteredData={filteredData} />

      {/* Reject Analysis Charts */}
      <RejectAnalysisCharts data={filteredData} />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TrendChart trendData={trendData} currentEfficiency={aggregatedData.eficiencia} />
        <VolumeChart volumeData={filteredData.slice(-30)} />
      </div>
    </>
  );
};
