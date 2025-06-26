
import * as XLSX from 'xlsx';
import { ProcessedDataItem } from "@/hooks/useProcessedData";
import { AggregatedData } from "@/hooks/useAggregatedData";
import { createMainData, createHourlyData, createSummaryData } from './excelDataProcessor';

export const downloadXLSX = (filteredData: ProcessedDataItem[], aggregatedData: AggregatedData) => {
  // Criar dados das planilhas
  const mainData = createMainData(filteredData);
  const hourlyData = createHourlyData(filteredData);
  const summaryData = createSummaryData(aggregatedData);

  // Criar workbook
  const wb = XLSX.utils.book_new();
  
  // Adicionar planilhas
  const wsMain = XLSX.utils.json_to_sheet(mainData);
  const wsHourly = XLSX.utils.json_to_sheet(hourlyData);
  const wsSummary = XLSX.utils.json_to_sheet(summaryData);
  
  XLSX.utils.book_append_sheet(wb, wsMain, "Dados Detalhados");
  XLSX.utils.book_append_sheet(wb, wsHourly, "Dados Hora a Hora");
  XLSX.utils.book_append_sheet(wb, wsSummary, "Resumo");

  // Gerar e fazer download
  const today = new Date().toLocaleDateString('pt-BR').replace(/\//g, '-');
  XLSX.writeFile(wb, `Status_Paletizacao_${today}.xlsx`);
};