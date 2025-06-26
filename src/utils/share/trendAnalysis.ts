
import { ProcessedDataItem } from "@/hooks/useProcessedData";

export const getTrendAnalysis = (filteredData: ProcessedDataItem[]): string => {
  if (!filteredData.length) return '';

  const sortedData = filteredData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const recentData = sortedData.slice(-7); // Últimos 7 dias

  if (recentData.length < 2) return '';

  const firstDay = recentData[0];
  const lastDay = recentData[recentData.length - 1];
  
  const firstEfficiency = firstDay.eficiencia || 0;
  const lastEfficiency = lastDay.eficiencia || 0;
  const trend = lastEfficiency - firstEfficiency;

  let analysis = '';
  if (trend > 0) {
    analysis += `• Tendência positiva: +${trend.toFixed(1)}% de melhoria\n`;
  } else if (trend < 0) {
    analysis += `• Tendência negativa: ${trend.toFixed(1)}% de queda\n`;
  } else {
    analysis += `• Tendência estável no período\n`;
  }

  const avgEfficiency = recentData.reduce((sum, day) => sum + (day.eficiencia || 0), 0) / recentData.length;
  analysis += `• Eficiência média dos últimos dias: ${avgEfficiency.toFixed(1)}%\n`;

  return analysis;
};
