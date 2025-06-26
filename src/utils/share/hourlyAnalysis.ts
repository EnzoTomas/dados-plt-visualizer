
import { ProcessedDataItem } from "@/hooks/useProcessedData";
import { getTopProductiveHours } from "./topProductiveHours";

export const getHourlyAnalysis = (filteredData: ProcessedDataItem[]): string => {
  if (!filteredData.length) return '';

  // Agrupar dados usando os arrays inseridosHora e rejeitosHora existentes
  const hourlyData: Record<number, { inseridos: number; rejeitos: number; total: number }> = {};

  filteredData.forEach(item => {
    for (let hour = 0; hour < 24; hour++) {
      if (!hourlyData[hour]) {
        hourlyData[hour] = { inseridos: 0, rejeitos: 0, total: 0 };
      }
      hourlyData[hour].inseridos += item.inseridosHora[hour] || 0;
      hourlyData[hour].rejeitos += item.rejeitosHora[hour] || 0;
      hourlyData[hour].total += (item.inseridosHora[hour] || 0) + (item.rejeitosHora[hour] || 0);
    }
  });

  // Filtrar apenas horas com produção (total > 0)
  const hoursWithProduction = Object.keys(hourlyData)
    .map(Number)
    .filter(hour => hourlyData[hour].total > 0)
    .sort((a, b) => a - b);

  let analysis = '';

  if (hoursWithProduction.length > 0) {
    const bestHour = hoursWithProduction.reduce((best, hour) => 
      hourlyData[hour].total > hourlyData[best].total ? hour : best
    );
    const worstHour = hoursWithProduction.reduce((worst, hour) => 
      hourlyData[hour].total < hourlyData[worst].total ? hour : worst
    );

    analysis += `• Pico de produção: ${bestHour.toString().padStart(2, '0')}h com ${hourlyData[bestHour].total} pallets\n`;
    analysis += `• Menor produção: ${worstHour.toString().padStart(2, '0')}h com ${hourlyData[worstHour].total} pallets\n`;
    
    const avgProduction = hoursWithProduction.reduce((sum, hour) => sum + hourlyData[hour].total, 0) / hoursWithProduction.length;
    analysis += `• Média horária: ${avgProduction.toFixed(0)} pallets\n\n`;

    // Adicionar Top 5 horas mais produtivas
    const topHours = getTopProductiveHours(filteredData);
    if (topHours) {
      analysis += topHours;
    }
  }

  return analysis;
};
