
import { ProcessedDataItem } from "@/hooks/useProcessedData";
import { AggregatedData } from "@/hooks/useAggregatedData";

export const createMainData = (filteredData: ProcessedDataItem[]) => {
  return filteredData.map(item => ({
    'Data': item.date,
    'Total Inseridos': item.totalInseridos,
    'Total Rejeitos': item.totalRejeitos,
    'Eficiência (%)': item.eficiencia.toFixed(2),
    'Inseridos Turno 1': item.inseridos1T,
    'Rejeitos Turno 1': item.rejeitos1T,
    'Aderência Turno 1 (%)': item.aderencia1T.toFixed(2),
    'Inseridos Turno 2': item.inseridos2T,
    'Rejeitos Turno 2': item.rejeitos2T,
    'Aderência Turno 2 (%)': item.aderencia2T.toFixed(2),
    'Inseridos Turno 3': item.inseridos3T,
    'Rejeitos Turno 3': item.rejeitos3T,
    'Aderência Turno 3 (%)': item.aderencia3T.toFixed(2),
    'Erro Leitura Etiqueta': item.erroLeituraEtiqueta,
    'Madeira Pés Pallet': item.madeiraPesPallet,
    'Área Livre Pés': item.areaLivrePes,
    'Erro Contorno Altura': item.erroContornoAltura,
    'Erro Contorno Direita': item.erroContornoDireita,
    'Erro Contorno Esquerda': item.erroContornoEsquerda,
    'Erro Contorno Frente': item.erroContornoFrente,
    'Erro Contorno Traseira': item.erroContornoTraseira,
    'Falha Sensor': item.falhaSensor,
    'Pallet': item.pallet,
    'RN': item.rn
  }));
};

export const createHourlyData = (filteredData: ProcessedDataItem[]) => {
  const hourlyData: any[] = [];
  filteredData.forEach(item => {
    for (let hour = 0; hour < 24; hour++) {
      const inseridos = item.inseridosHora[hour] || 0;
      const rejeitos = item.rejeitosHora[hour] || 0;
      const total = inseridos + rejeitos;
      
      if (total > 0) { // Só inclui horas com produção
        hourlyData.push({
          'Data': item.date,
          'Hora': `${hour.toString().padStart(2, '0')}:00`,
          'Inseridos': inseridos,
          'Rejeitos': rejeitos,
          'Total': total,
          'Eficiência (%)': total > 0 ? ((inseridos / total) * 100).toFixed(2) : '0.00'
        });
      }
    }
  });
  return hourlyData;
};

export const createSummaryData = (aggregatedData: AggregatedData) => {
  return [{
    'Métrica': 'Eficiência Total (%)',
    'Valor': aggregatedData.eficiencia.toFixed(2)
  }, {
    'Métrica': 'Total Inseridos',
    'Valor': aggregatedData.totalInseridos
  }, {
    'Métrica': 'Total Rejeitos',
    'Valor': aggregatedData.totalRejeitos
  }, {
    'Métrica': 'Aderência Turno 1 (%)',
    'Valor': aggregatedData.aderencia1T.toFixed(2)
  }, {
    'Métrica': 'Aderência Turno 2 (%)',
    'Valor': aggregatedData.aderencia2T.toFixed(2)
  }, {
    'Métrica': 'Aderência Turno 3 (%)',
    'Valor': aggregatedData.aderencia3T.toFixed(2)
  }];
};