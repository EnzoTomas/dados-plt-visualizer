
import { useMemo } from 'react';
import { useTsvData } from './useTsvData';
import { useProcessedData } from './useProcessedData';

export const useTsvRejectionData = () => {
  const { csvData } = useTsvData();
  const processedData = useProcessedData(csvData);

  const rejectionData = useMemo(() => {
    return processedData.map(item => {
      const totalProduction = item.totalInseridos + item.totalRejeitos;
      const rejectionRate = totalProduction > 0 ? (item.totalRejeitos / totalProduction) : 0;
      
      console.log('Dados de produção:', {
        date: item.date,
        totalInseridos: item.totalInseridos,
        totalRejeitos: item.totalRejeitos,
        totalProduction,
        rejectionRate: (rejectionRate * 100).toFixed(2) + '%'
      });
      
      return {
        date: item.date,
        totalRejeitos: item.totalRejeitos,
        totalInseridos: item.totalInseridos,
        rejectionRate: rejectionRate
      };
    });
  }, [processedData]);

  return { rejectionData };
};
