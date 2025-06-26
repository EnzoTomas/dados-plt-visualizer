
import { useMemo } from 'react';
import { ProcessedDataItem } from './useProcessedData';

export interface AggregatedData {
  totalInseridos: number;
  totalRejeitos: number;
  eficiencia: number;
  inseridos1T: number;
  rejeitos1T: number;
  aderencia1T: number;
  inseridos2T: number;
  rejeitos2T: number;
  aderencia2T: number;
  inseridos3T: number;
  rejeitos3T: number;
  aderencia3T: number;
}

export const useAggregatedData = (filteredData: ProcessedDataItem[]): AggregatedData => {
  return useMemo(() => {
    if (filteredData.length === 0) {
      return {
        totalInseridos: 0, totalRejeitos: 0, eficiencia: 0,
        inseridos1T: 0, rejeitos1T: 0, aderencia1T: 0,
        inseridos2T: 0, rejeitos2T: 0, aderencia2T: 0,
        inseridos3T: 0, rejeitos3T: 0, aderencia3T: 0
      };
    }

    const totals = filteredData.reduce((acc, curr) => ({
      totalInseridos: acc.totalInseridos + curr.totalInseridos,
      totalRejeitos: acc.totalRejeitos + curr.totalRejeitos,
      inseridos1T: acc.inseridos1T + curr.inseridos1T,
      rejeitos1T: acc.rejeitos1T + curr.rejeitos1T,
      inseridos2T: acc.inseridos2T + curr.inseridos2T,
      rejeitos2T: acc.rejeitos2T + curr.rejeitos2T,
      inseridos3T: acc.inseridos3T + curr.inseridos3T,
      rejeitos3T: acc.rejeitos3T + curr.rejeitos3T,
    }), {
      totalInseridos: 0, totalRejeitos: 0,
      inseridos1T: 0, rejeitos1T: 0,
      inseridos2T: 0, rejeitos2T: 0,
      inseridos3T: 0, rejeitos3T: 0,
    });

    const total = totals.totalInseridos + totals.totalRejeitos;
    const eficiencia = total > 0 ? (totals.totalInseridos / total) * 100 : 0;

    const total1T = totals.inseridos1T + totals.rejeitos1T;
    const aderencia1T = total1T > 0 ? (totals.inseridos1T / total1T) * 100 : 0;

    const total2T = totals.inseridos2T + totals.rejeitos2T;
    const aderencia2T = total2T > 0 ? (totals.inseridos2T / total2T) * 100 : 0;

    const total3T = totals.inseridos3T + totals.rejeitos3T;
    const aderencia3T = total3T > 0 ? (totals.inseridos3T / total3T) * 100 : 0;

    return { ...totals, eficiencia, aderencia1T, aderencia2T, aderencia3T };
  }, [filteredData]);
};
