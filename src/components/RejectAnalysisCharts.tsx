
import { useIsMobile } from "@/hooks/use-mobile";
import { processRejectTypeData, processResponsibleData } from "@/utils/rejectAnalysisUtils";
import { RejectDashboard } from "./reject-analysis/RejectDashboard";
import { ResponsibleDashboard } from "./reject-analysis/ResponsibleDashboard";

interface RejectAnalysisChartsProps {
  data: any[];
}

export const RejectAnalysisCharts = ({
  data
}: RejectAnalysisChartsProps) => {
  const isMobile = useIsMobile();

  // Process reject type data
  const rejectChartData = processRejectTypeData(data);
  const totalRejects = rejectChartData.reduce((sum, item) => sum + item.value, 0);

  // Process responsible data
  const responsibleChartData = processResponsibleData(data);
  const totalResponsible = responsibleChartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className={`grid grid-cols-1 ${isMobile ? 'gap-3' : 'lg:grid-cols-2 gap-6'}`}>
      <RejectDashboard 
        rejectChartData={rejectChartData} 
        totalRejects={totalRejects}
      />
      <ResponsibleDashboard 
        responsibleChartData={responsibleChartData} 
        totalResponsible={totalResponsible}
      />
    </div>
  );
};
