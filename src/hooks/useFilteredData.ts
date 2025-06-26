
import { useMemo } from 'react';
import { ProcessedDataItem } from './useProcessedData';
import { formatToDMY, getYesterday, createSafeDate } from '../utils/dateUtils';

export const useFilteredData = (
  processedData: ProcessedDataItem[],
  selectedPeriod: string,
  startDate: string,
  endDate: string
) => {
  return useMemo(() => {
    const yesterday = getYesterday();
    const formattedYesterday = formatToDMY(yesterday);
    
    return processedData.filter(item => {
      const itemDate = createSafeDate(item.date);
      
      switch(selectedPeriod) {
        case 'ontem':
          return item.date === formattedYesterday;
        
        case 'semana':
          const weekAgo = new Date(yesterday);
          weekAgo.setHours(0, 0, 0, 0);
          weekAgo.setDate(weekAgo.getDate() - 6);
          return itemDate >= weekAgo && itemDate <= yesterday;
        
        case 'mensal':
          const monthStart = new Date(yesterday.getFullYear(), yesterday.getMonth(), 1);
          return itemDate >= monthStart && itemDate <= yesterday;
        
        case 'anual':
          const yearStart = new Date(yesterday.getFullYear(), 0, 1);
          return itemDate >= yearStart && itemDate <= yesterday;
        
        case 'personalizado':
          if (!startDate || !endDate) return false;
          
          const start = new Date(startDate + 'T00:00:00');
          const end = new Date(endDate + 'T23:59:59');
          return itemDate >= start && itemDate <= end;
        
        default:
          return true;
      }
    });
  }, [processedData, selectedPeriod, startDate, endDate]);
};
