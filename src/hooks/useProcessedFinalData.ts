import { useMemo } from 'react';
import { FinalDataItem } from './useFinalData';

export const useProcessedFinalData = (finalData: string) => {
  return useMemo(() => {
    if (!finalData.trim()) return [];
    
    const lines = finalData.trim().split('\n');
    const dataLines = lines.slice(1); // Skip header
    
    return dataLines.map(line => {
      const values = line.split('\t');
      
      const item: FinalDataItem = {
        date: values[0] || '',
        erroSistemico: parseInt(values[1]) || 0,
        erroFisico: parseInt(values[2]) || 0,
        fisicoMaiorSistemico: parseInt(values[3]) || 0,
        sistemicoMaiorFisico: parseInt(values[4]) || 0,
        etiquetaRejeitado: parseInt(values[5]) || 0,
        naoGerouEtiqueta: parseInt(values[6]) || 0,
        mosaico: parseInt(values[7]) || 0,
        tampaComprometida: parseInt(values[8]) || 0,
        palletComCaixasSemTampa: parseInt(values[9]) || 0,
        caixasDanificadasRobo: parseInt(values[10]) || 0,
        palletQuebrado: parseInt(values[11]) || 0,
        mistura: parseInt(values[12]) || 0,
        outro: parseInt(values[13]) || 0,
        total: function() {
          return this.erroSistemico + this.erroFisico + this.fisicoMaiorSistemico + 
                 this.sistemicoMaiorFisico + this.etiquetaRejeitado + this.naoGerouEtiqueta + 
                 this.mosaico + this.tampaComprometida + this.palletComCaixasSemTampa + 
                 this.caixasDanificadasRobo + this.palletQuebrado + this.mistura + this.outro;
        }
      };
      
      return item;
    }).filter(item => item.total() > 0);
  }, [finalData]);
};