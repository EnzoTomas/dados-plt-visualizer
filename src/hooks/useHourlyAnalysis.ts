
import { useMemo } from 'react';
import { ProcessedDataItem } from './useProcessedData';

export interface HourlyAnalysis {
  hourlyData: {
    hour: number;
    inseridos: number;
    rejeitos: number;
    total: number;
    eficiencia: number;
    turno: string;
  }[];
  shifts: {
    turno1: { inseridos: number; rejeitos: number; eficiencia: number; };
    turno2: { inseridos: number; rejeitos: number; eficiencia: number; };
    turno3: { inseridos: number; rejeitos: number; eficiencia: number; };
  };
  bestEfficiencyHour: { hour: number; eficiencia: number; };
  peakProductionHour: { hour: number; inseridos: number; };
  lowestVolumeHour: { hour: number; total: number; };
  averagePerHour: { inseridos: number; rejeitos: number; };
  anomalies: { hour: number; type: string; value: number; }[];
}

export const useHourlyAnalysis = (filteredData: ProcessedDataItem[]): HourlyAnalysis => {
  return useMemo(() => {
    if (filteredData.length === 0) {
      return {
        hourlyData: [],
        shifts: {
          turno1: { inseridos: 0, rejeitos: 0, eficiencia: 0 },
          turno2: { inseridos: 0, rejeitos: 0, eficiencia: 0 },
          turno3: { inseridos: 0, rejeitos: 0, eficiencia: 0 }
        },
        bestEfficiencyHour: { hour: 0, eficiencia: 0 },
        peakProductionHour: { hour: 0, inseridos: 0 },
        lowestVolumeHour: { hour: 0, total: 0 },
        averagePerHour: { inseridos: 0, rejeitos: 0 },
        anomalies: []
      };
    }

    // Agregar dados por hora
    const hourlyTotals = Array.from({ length: 24 }, (_, hour) => {
      const totalInseridos = filteredData.reduce((sum, item) => sum + item.inseridosHora[hour], 0);
      const totalRejeitos = filteredData.reduce((sum, item) => sum + item.rejeitosHora[hour], 0);
      const total = totalInseridos + totalRejeitos;
      const eficiencia = total > 0 ? (totalInseridos / total) * 100 : 0;
      
      // Determinar turno
      let turno = '';
      if (hour >= 6 && hour < 14) turno = 'Turno 1 (06:00-14:00)';
      else if (hour >= 14 && hour < 22) turno = 'Turno 2 (14:00-22:00)';
      else turno = 'Turno 3 (22:00-06:00)';

      return {
        hour,
        inseridos: totalInseridos,
        rejeitos: totalRejeitos,
        total,
        eficiencia,
        turno
      };
    });

    // Calcular médias por turno
    const turno1Data = hourlyTotals.filter(h => h.hour >= 6 && h.hour < 14);
    const turno2Data = hourlyTotals.filter(h => h.hour >= 14 && h.hour < 22);
    const turno3Data = hourlyTotals.filter(h => h.hour < 6 || h.hour >= 22);

    const calcShiftStats = (shiftData: typeof hourlyTotals) => {
      const inseridos = shiftData.reduce((sum, h) => sum + h.inseridos, 0);
      const rejeitos = shiftData.reduce((sum, h) => sum + h.rejeitos, 0);
      const total = inseridos + rejeitos;
      const eficiencia = total > 0 ? (inseridos / total) * 100 : 0;
      return { inseridos, rejeitos, eficiencia };
    };

    const shifts = {
      turno1: calcShiftStats(turno1Data),
      turno2: calcShiftStats(turno2Data),
      turno3: calcShiftStats(turno3Data)
    };

    // Encontrar melhor hora de eficiência
    const bestEfficiencyHour = hourlyTotals.reduce((best, current) => 
      current.eficiencia > best.eficiencia ? current : best
    );

    // Encontrar pico de produção
    const peakProductionHour = hourlyTotals.reduce((peak, current) => 
      current.inseridos > peak.inseridos ? current : peak
    );

    // Encontrar menor volume operacional (excluindo zeros)
    const nonZeroHours = hourlyTotals.filter(h => h.total > 0);
    const lowestVolumeHour = nonZeroHours.length > 0 ? 
      nonZeroHours.reduce((lowest, current) => 
        current.total < lowest.total ? current : lowest
      ) : { hour: 0, total: 0 };

    // Calcular médias
    const totalHours = hourlyTotals.filter(h => h.total > 0).length;
    const averagePerHour = {
      inseridos: totalHours > 0 ? hourlyTotals.reduce((sum, h) => sum + h.inseridos, 0) / totalHours : 0,
      rejeitos: totalHours > 0 ? hourlyTotals.reduce((sum, h) => sum + h.rejeitos, 0) / totalHours : 0
    };

    // Detectar anomalias (rejeitos acima de 2x a média)
    const avgRejeitos = averagePerHour.rejeitos;
    const anomalies = hourlyTotals
      .filter(h => h.rejeitos > avgRejeitos * 2 && h.total > 0)
      .map(h => ({
        hour: h.hour,
        type: 'Alto índice de rejeitos',
        value: h.rejeitos
      }));

    return {
      hourlyData: hourlyTotals,
      shifts,
      bestEfficiencyHour: {
        hour: bestEfficiencyHour.hour,
        eficiencia: bestEfficiencyHour.eficiencia
      },
      peakProductionHour: {
        hour: peakProductionHour.hour,
        inseridos: peakProductionHour.inseridos
      },
      lowestVolumeHour: {
        hour: lowestVolumeHour.hour,
        total: lowestVolumeHour.total
      },
      averagePerHour,
      anomalies
    };
  }, [filteredData]);
};
