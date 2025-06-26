
import React, { useRef } from 'react';
import { Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

interface ImportButtonProps {
  onDataImport: (data: string) => void;
}

export const ImportButton = ({ onDataImport }: ImportButtonProps) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Verificar se é um arquivo TSV
    if (!file.name.toLowerCase().endsWith('.tsv')) {
      toast({
        title: "Formato de arquivo inválido",
        description: "Por favor, selecione um arquivo .tsv",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        if (!content) {
          throw new Error('Arquivo vazio ou não foi possível ler o conteúdo');
        }

        // Validar se o conteúdo tem o formato esperado
        const lines = content.trim().split('\n');
        if (lines.length === 0) {
          throw new Error('Arquivo não contém dados válidos');
        }

        // Validar se cada linha tem o número correto de colunas (24 colunas esperadas)
        const validLines = lines.filter(line => {
          const columns = line.split('\t');
          return columns.length >= 20; // Mínimo de colunas esperadas
        });

        if (validLines.length === 0) {
          throw new Error('Nenhuma linha válida encontrada no arquivo');
        }

        onDataImport(content);
        
        toast({
          title: "Dados importados com sucesso!",
          description: `${validLines.length} linha(s) de dados foram importadas.`,
        });

        // Limpar o input para permitir importar o mesmo arquivo novamente se necessário
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } catch (error) {
        console.error('Erro ao importar arquivo:', error);
        toast({
          title: "Erro na importação",
          description: error instanceof Error ? error.message : "Ocorreu um erro ao importar os dados.",
          variant: "destructive",
        });
      }
    };

    reader.onerror = () => {
      toast({
        title: "Erro na leitura do arquivo",
        description: "Não foi possível ler o arquivo selecionado.",
        variant: "destructive",
      });
    };

    reader.readAsText(file, 'UTF-8');
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".tsv"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleFileSelect}
            variant="outline"
            size="sm"
            className="flex items-center gap-1 px-2 text-xs"
          >
            <Download className="h-3 w-3 rotate-180" />
            <span className="hidden sm:inline">Importar Dados</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Importar novos dados (.tsv)</p>
        </TooltipContent>
      </Tooltip>
    </>
  );
};
