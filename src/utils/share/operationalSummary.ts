
import { AggregatedData } from "@/hooks/useAggregatedData";
import { ProcessedDataItem } from "@/hooks/useProcessedData";

export const getOperationalSummary = (aggregatedData: AggregatedData, filteredData: ProcessedDataItem[]): string => {
  let summary = '';
  
  const totalProcessed = aggregatedData.totalInseridos + aggregatedData.totalRejeitos;
  summary += `• Volume total processado: ${totalProcessed} itens\n`;
  summary += `• Taxa de sucesso: ${((aggregatedData.totalInseridos / totalProcessed) * 100).toFixed(1)}%\n`;
  summary += `• Taxa de rejeição: ${((aggregatedData.totalRejeitos / totalProcessed) * 100).toFixed(1)}%\n`;
  
  // Melhor turno
  const turnos = [
    { nome: '1º Turno', eficiencia: aggregatedData.aderencia1T },
    { nome: '2º Turno', eficiencia: aggregatedData.aderencia2T },
    { nome: '3º Turno', eficiencia: aggregatedData.aderencia3T }
  ];
  
  const melhorTurno = turnos.reduce((best, turno) => 
    turno.eficiencia > best.eficiencia ? turno : best
  );
  
  summary += `• Melhor turno: ${melhorTurno.nome} (${melhorTurno.eficiencia.toFixed(1)}%)\n`;
  
  // Status da meta
  const meta = 92;
  if (aggregatedData.eficiencia >= meta) {
    summary += `• ✅ Meta atingida! (${aggregatedData.eficiencia.toFixed(1)}% ≥ ${meta}%)\n`;
  } else {
    const diferenca = meta - aggregatedData.eficiencia;
    summary += `• ⚠️ Meta não atingida (faltam ${diferenca.toFixed(1)}% para ${meta}%)\n`;
  }

  return summary;
};

export const getDateRange = (filteredData: ProcessedDataItem[]): string => {
  if (!filteredData.length) return '';
  
  const dates = filteredData.map(item => item.date).sort();
  const firstDate = dates[0];
  const lastDate = dates[dates.length - 1];
  
  if (firstDate === lastDate) {
    return `Referente à data ${firstDate}`;
  }
  
  return `Referente a(s) data(s) ${firstDate} até ${lastDate}`;
};
