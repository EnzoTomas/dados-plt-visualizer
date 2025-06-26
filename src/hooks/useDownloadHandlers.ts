
import { useToast } from "@/hooks/use-toast";
import { downloadXLSX, downloadPNG, downloadPDF } from "@/utils/downloadUtils";
import { ProcessedDataItem } from "@/hooks/useProcessedData";
import { AggregatedData } from "@/hooks/useAggregatedData";

export const useDownloadHandlers = (filteredData: ProcessedDataItem[], aggregatedData: AggregatedData) => {
  const { toast } = useToast();

  const handleXLSXDownload = () => {
    try {
      downloadXLSX(filteredData, aggregatedData);
      toast({
        title: "Download XLSX realizado com sucesso!",
        description: "Os dados foram exportados para o arquivo XLSX.",
      });
    } catch (error) {
      console.error('Erro ao fazer download XLSX:', error);
      toast({
        title: "Erro no download",
        description: "Ocorreu um erro ao exportar os dados.",
        variant: "destructive",
      });
    }
  };

  const handlePNGDownload = async () => {
    try {
      await downloadPNG();
      toast({
        title: "Download PNG realizado com sucesso!",
        description: "A imagem foi capturada e baixada.",
      });
    } catch (error) {
      console.error('Erro ao fazer download PNG:', error);
      toast({
        title: "Erro no download",
        description: "Ocorreu um erro ao capturar a imagem.",
        variant: "destructive",
      });
    }
  };

  const handlePDFDownload = async () => {
    try {
      await downloadPDF();
      toast({
        title: "Download PDF realizado com sucesso!",
        description: "O PDF foi gerado e baixado.",
      });
    } catch (error) {
      console.error('Erro ao fazer download PDF:', error);
      toast({
        title: "Erro no download",
        description: "Ocorreu um erro ao gerar o PDF.",
        variant: "destructive",
      });
    }
  };

  return {
    handleXLSXDownload,
    handlePNGDownload,
    handlePDFDownload
  };
};
