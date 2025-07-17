import { useState, useEffect } from 'react';

export interface FinalDataItem {
  date: string;
  erroSistemico: number;
  erroFisico: number;
  fisicoMaiorSistemico: number;
  sistemicoMaiorFisico: number;
  etiquetaRejeitado: number;
  naoGerouEtiqueta: number;
  mosaico: number;
  tampaComprometida: number;
  palletComCaixasSemTampa: number;
  caixasDanificadasRobo: number;
  palletQuebrado: number;
  mistura: number;
  outro: number;
  total: () => number;
}

export const useFinalData = () => {
  const [finalData, setFinalData] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFinalData = async () => {
      try {
        const response = await fetch('/FinalData.tsv');
        if (!response.ok) {
          throw new Error('Erro ao carregar dados finais');
        }
        const data = await response.text();
        setFinalData(data);
        console.log('Dados finais carregados com sucesso');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
        console.error('Erro ao carregar dados finais:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadFinalData();
  }, []);

  return { finalData, isLoading, error };
};