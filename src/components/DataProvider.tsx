import { useState, useEffect, ReactNode } from 'react';

import { useProcessedData } from "@/hooks/useProcessedData";
import { useFilteredData } from "@/hooks/useFilteredData";
import { useAggregatedData } from "@/hooks/useAggregatedData";
import { useTrendData } from "@/hooks/useTrendData";
import { useTsvData } from "@/hooks/useTsvData";

import { formatDateForInput, getYesterday } from "@/utils/dateUtils";

interface DataContextType {
  selectedPeriod: string;
  setSelectedPeriod: (period: string) => void;
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
  csvData: string;
  setCsvData: (data: string) => void;
  processedData: any[];
  filteredData: any[];
  aggregatedData: any;
  trendData: any[];
  getLatestDataDate: () => string;
}

interface DataProviderProps {
  children: (context: DataContextType) => ReactNode;
}

export const DataProvider = ({ children }: DataProviderProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState('ontem');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const { csvData, setCsvData, isLoading, error } = useTsvData();

  // Inicializa datas padrão com "ontem"
  useEffect(() => {
    const yesterday = getYesterday();
    setStartDate(formatDateForInput(yesterday));
    setEndDate(formatDateForInput(yesterday));
  }, []);

  const processedData = useProcessedData(csvData);
  const filteredData = useFilteredData(processedData, selectedPeriod, startDate, endDate);
  const aggregatedData = useAggregatedData(filteredData);
  const trendData = useTrendData(filteredData);

  const getLatestDataDate = () => {
    if (processedData.length === 0) return '';

    const latestDate = processedData
      .filter(item => item.total() > 0)
      .sort((a, b) => {
        const dateA = new Date(a.date.split('/').reverse().join('-'));
        const dateB = new Date(b.date.split('/').reverse().join('-'));
        return dateB.getTime() - dateA.getTime();
      })[0];

    return latestDate ? latestDate.date : '';
  };

  useEffect(() => {
    if (error) {
      console.warn('Aviso ao carregar dados TSV:', error);
    }
    if (!isLoading) {
      console.log('Dados carregados, total de linhas processadas:', processedData.length);
    }
  }, [isLoading, error, processedData.length]);

  const contextValue: DataContextType = {
    selectedPeriod,
    setSelectedPeriod,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    csvData,
    setCsvData,
    processedData,
    filteredData,
    aggregatedData,
    trendData,
    getLatestDataDate,
  };

  return children(contextValue);
};
