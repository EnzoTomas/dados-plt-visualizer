
import { PeriodSelector } from './PeriodSelector';
import { RejectionIndexChart } from './charts/RejectionIndexChart';
import { RejectTypesDashboard } from './reject-types/RejectTypesDashboard';
import { useMemo } from 'react';
import { FinalDataItem } from '@/hooks/useFinalData';
import { useTsvRejectionData } from '@/hooks/useTsvRejectionData';
import { formatToDMY, getYesterday, createSafeDate } from '@/utils/dateUtils';

interface StratificationDashboardProps {
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  finalData: FinalDataItem[];
}

export const StratificationDashboard = ({
  selectedPeriod,
  onPeriodChange,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  finalData
}: StratificationDashboardProps) => {
  const { rejectionData } = useTsvRejectionData();
  
  // Filtrar dados de rejeição por período
  const filteredRejectionData = useMemo(() => {
    if (!rejectionData.length) return [];
    
    const yesterday = getYesterday();
    const formattedYesterday = formatToDMY(yesterday);
    
    return rejectionData.filter(item => {
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
  }, [rejectionData, selectedPeriod, startDate, endDate]);

  // Filtrar dados finais por período usando a mesma lógica
  const filteredFinalData = useMemo(() => {
    if (!finalData.length) return [];
    
    const yesterday = getYesterday();
    const formattedYesterday = formatToDMY(yesterday);
    
    return finalData.filter(item => {
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
  }, [finalData, selectedPeriod, startDate, endDate]);

  console.log('Dados de rejeição filtrados:', filteredRejectionData);
  console.log('Dados finais filtrados:', filteredFinalData);
  console.log('Período selecionado:', selectedPeriod);
  console.log('Intervalo de datas:', { startDate, endDate });

  return (
    <div className="space-y-6">
      <PeriodSelector
        selectedPeriod={selectedPeriod}
        onPeriodChange={onPeriodChange}
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
      />
      
      <div className="space-y-6">
        {/* Dashboard de Índice de Rejeição */}
        <RejectionIndexChart data={filteredRejectionData} />

        {/* Novo Dashboard de Distribuição de Rejeitos */}
        <RejectTypesDashboard finalData={filteredFinalData} />
      </div>
    </div>
  );
};
