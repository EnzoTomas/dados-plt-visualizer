
import { useMemo } from 'react';
import { ProcessedDataItem } from './useProcessedData';

export const useTrendData = (filteredData: ProcessedDataItem[]) => {
  return useMemo(() => {
    // Usar todos os dados filtrados em vez de apenas os últimos 30
    return filteredData.map(item => ({
      ...item,
      meta: 92, // Nova meta de 92%
      zona_critica: 70, // Zona crítica ajustada para 70%
      diferenca_meta: item.eficiencia - 92
    }));
  }, [filteredData]);
};
