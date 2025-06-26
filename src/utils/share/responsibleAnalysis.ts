
import { ProcessedDataItem } from "@/hooks/useProcessedData";

export const getResponsibleAnalysis = (filteredData: ProcessedDataItem[]): string => {
  if (!filteredData.length) return '';
  
  const responsible = filteredData.reduce((acc, item) => {
    acc.falhaSensor += item.falhaSensor || 0;
    acc.pallet += item.pallet || 0;
    acc.rn += item.rn || 0;
    return acc;
  }, {
    falhaSensor: 0,
    pallet: 0,
    rn: 0
  });

  const total = responsible.falhaSensor + responsible.pallet + responsible.rn;
  if (total === 0) return '';

  let analysis = '';
  if (responsible.rn > 0) {
    const percentage = ((responsible.rn / total) * 100).toFixed(1);
    analysis += `• RN: ${responsible.rn}, representando ${percentage}%\n`;
  }
  if (responsible.falhaSensor > 0) {
    const percentage = ((responsible.falhaSensor / total) * 100).toFixed(1);
    analysis += `• Falha no sensor: ${responsible.falhaSensor}, representando ${percentage}%\n`;
  }
  if (responsible.pallet > 0) {
    const percentage = ((responsible.pallet / total) * 100).toFixed(1);
    analysis += `• Pallet: ${responsible.pallet}, representando ${percentage}%\n`;
  }

  return analysis;
};
