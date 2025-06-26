
import { ProcessedDataItem } from "@/hooks/useProcessedData";

export const getTopProductiveHours = (filteredData: ProcessedDataItem[]): string => {
  if (!filteredData.length) return '';

  // Agrupar dados por hora
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

  // Filtrar apenas horas com produção e ordenar por total de inseridos
  const sortedHours = Object.keys(hourlyData)
    .map(Number)
    .filter(hour => hourlyData[hour].total > 0)
    .sort((a, b) => hourlyData[b].inseridos - hourlyData[a].inseridos)
    .slice(0, 5); // Top 5

  if (sortedHours.length === 0) return '';

  let topHours = '🔝 *Top 5 Horas Mais Produtivas:*\n';
  
  sortedHours.forEach((hour, index) => {
    const data = hourlyData[hour];
    topHours += `${index + 1}. ${hour.toString().padStart(2, '0')}h: ${data.inseridos} inseridos, ${data.rejeitos} rejeitos\n`;
  });

  return topHours;
};
