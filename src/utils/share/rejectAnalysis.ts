
import { ProcessedDataItem } from "@/hooks/useProcessedData";

export const getRejectAnalysis = (filteredData: ProcessedDataItem[]): string => {
  if (!filteredData.length) return '';
  
  const rejectTypes = filteredData.reduce((acc, item) => {
    acc.erroLeituraEtiqueta += item.erroLeituraEtiqueta || 0;
    acc.madeiraPesPallet += item.madeiraPesPallet || 0;
    acc.areaLivrePes += item.areaLivrePes || 0;
    acc.erroContornoAltura += item.erroContornoAltura || 0;
    acc.erroContornoDireita += item.erroContornoDireita || 0;
    acc.erroContornoEsquerda += item.erroContornoEsquerda || 0;
    acc.erroContornoFrente += item.erroContornoFrente || 0;
    acc.erroContornoTraseira += item.erroContornoTraseira || 0;
    return acc;
  }, {
    erroLeituraEtiqueta: 0,
    madeiraPesPallet: 0,
    areaLivrePes: 0,
    erroContornoAltura: 0,
    erroContornoDireita: 0,
    erroContornoEsquerda: 0,
    erroContornoFrente: 0,
    erroContornoTraseira: 0
  });

  let analysis = '';
  if (rejectTypes.erroLeituraEtiqueta > 0) {
    analysis += `• ${rejectTypes.erroLeituraEtiqueta} rejeitos por erro de leitura da etiqueta\n`;
  }
  if (rejectTypes.madeiraPesPallet > 0) {
    analysis += `• ${rejectTypes.madeiraPesPallet} rejeitos por madeira dos pés do pallet\n`;
  }
  if (rejectTypes.areaLivrePes > 0) {
    analysis += `• ${rejectTypes.areaLivrePes} rejeitos por área livre nos pés\n`;
  }
  if (rejectTypes.erroContornoAltura > 0) {
    analysis += `• ${rejectTypes.erroContornoAltura} rejeitos por erro de contorno na altura\n`;
  }
  if (rejectTypes.erroContornoDireita > 0) {
    analysis += `• ${rejectTypes.erroContornoDireita} rejeitos por posicionamento à direita\n`;
  }
  if (rejectTypes.erroContornoEsquerda > 0) {
    analysis += `• ${rejectTypes.erroContornoEsquerda} rejeitos por posicionamento à esquerda\n`;
  }
  if (rejectTypes.erroContornoFrente > 0) {
    analysis += `• ${rejectTypes.erroContornoFrente} rejeitos por posicionamento na frente\n`;
  }
  if (rejectTypes.erroContornoTraseira > 0) {
    analysis += `• ${rejectTypes.erroContornoTraseira} rejeitos por posicionamento na traseira\n`;
  }

  return analysis;
};
