
import { AggregatedData } from "@/hooks/useAggregatedData";
import { ProcessedDataItem } from "@/hooks/useProcessedData";
import { ShareData } from "@/types/share";
import { getRejectAnalysis } from "./rejectAnalysis";
import { getResponsibleAnalysis } from "./responsibleAnalysis";
import { getHourlyAnalysis } from "./hourlyAnalysis";
import { getDateRange } from "./operationalSummary";

export const generateShareText = (
  aggregatedData: AggregatedData,
  shareData: ShareData,
  filteredData: ProcessedDataItem[]
): string => {
  let text = "📊 *Status Paletização - Relatório Completo*\n\n";
  
  const dateRange = getDateRange(filteredData);
  if (dateRange) {
    text += `${dateRange}\n\n`;
  }
  
  // Métricas principais sempre no topo
  if (shareData.eficiencia) {
    text += `🎯 Eficiência Total: ${aggregatedData.eficiencia.toFixed(2)}%\n`;
  }
  
  if (shareData.inseridos) {
    text += `✅ Total Inseridos: ${aggregatedData.totalInseridos}\n`;
  }
  
  if (shareData.rejeitos) {
    text += `❌ Total Rejeitos: ${aggregatedData.totalRejeitos}\n`;
  }
  
  // Análise por turnos
  if (shareData.turnos) {
    text += `\n🕐 *ANÁLISE POR TURNO:*\n`;
    text += `• Turno 1 (06:00-14:00) - Inseridos: ${aggregatedData.inseridos1T}, Rejeitos: ${aggregatedData.rejeitos1T}, Eficiência: ${aggregatedData.aderencia1T.toFixed(2)}%\n`;
    text += `• Turno 2 (14:00-22:00) - Inseridos: ${aggregatedData.inseridos2T}, Rejeitos: ${aggregatedData.rejeitos2T}, Eficiência: ${aggregatedData.aderencia2T.toFixed(2)}%\n`;
    text += `• Turno 3 (22:00-06:00) - Inseridos: ${aggregatedData.inseridos3T}, Rejeitos: ${aggregatedData.rejeitos3T}, Eficiência: ${aggregatedData.aderencia3T.toFixed(2)}%\n`;
  }

  // Análise horária
  if (shareData.analiseHoraria) {
    const hourlyAnalysis = getHourlyAnalysis(filteredData);
    if (hourlyAnalysis) {
      text += `\n⏰ *ANÁLISE HORÁRIA:*\n${hourlyAnalysis}`;
    }
  }

  // Análise de rejeitos
  if (shareData.analiseRejeitos) {
    const rejectAnalysis = getRejectAnalysis(filteredData);
    if (rejectAnalysis) {
      text += `\n📊 *ANÁLISE DE REJEITOS:*\n${rejectAnalysis}`;
    }
  }

  // Responsáveis pelos rejeitos
  if (shareData.responsaveisRejeitos) {
    const responsibleAnalysis = getResponsibleAnalysis(filteredData);
    if (responsibleAnalysis) {
      text += `\n👥 *RESPONSÁVEIS PELOS REJEITOS:*\n${responsibleAnalysis}`;
    }
  }
  
  return text;
};
