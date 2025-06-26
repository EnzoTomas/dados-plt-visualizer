import { useState, useEffect } from 'react';

export const useTsvData = () => {
  const [csvData, setCsvData] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTsvFile = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Lógica de leitura simples e direta do arquivo padrão.
        const response = await fetch('/data.tsv');
        
        if (!response.ok) {
          throw new Error(`Erro ao carregar arquivo TSV: ${response.status}`);
        }
        
        const content = await response.text();
        
        if (!content.trim()) {
          throw new Error('Arquivo TSV está vazio');
        }
        
        setCsvData(content);
        console.log('Dados TSV do arquivo /data.tsv carregados com sucesso.');
      } catch (err) {
        console.error('Erro ao carregar arquivo TSV:', err);
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
        
        // Mantemos o fallback para o caso de o arquivo data.tsv ser deletado por acidente.
        const defaultData = `02/04/2025	6	8	42,86%	4	0	0	0	0	2	2	2	4	0	4	2	4	33,33%	4	4	50,00%	0	0		0	0	0	0	0	0	0	0	0	0	0	0	2	0	2	1	1	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	2	2	0	0	2	0	1	1	0	0	0	0	0	0`;
        setCsvData(defaultData);
      } finally {
        setIsLoading(false);
      }
    };

    loadTsvFile();
  }, []); // O array vazio [] garante que isso rode apenas uma vez, quando o site carrega.

  // Retornamos o setCsvData para que o botão de importar ainda funcione para a sessão atual.
  return { csvData, setCsvData, isLoading, error };
};