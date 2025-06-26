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
        
        // --- AQUI ESTÁ A CORREÇÃO FINAL ---
        // Usamos a variável especial do Vite para garantir que o caminho esteja sempre correto,
        // tanto localmente quanto no site publicado.
        const response = await fetch(`${import.meta.env.BASE_URL}data.tsv`);
        
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
        
        const defaultData = `02/04/2025	6	8	42,86%	4	0	0	0	0	2	2	2	4	0	4	2	4	33,33%	4	4	50,00%	0	0		0	0	0	0	0	0	0	0	0	0	0	0	2	0	2	1	1	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	2	2	0	0	2	0	1	1	0	0	0	0	0	0`;
        setCsvData(defaultData);
      } finally {
        setIsLoading(false);
      }
    };

    loadTsvFile();
  }, []);

  return { csvData, setCsvData, isLoading, error };
};