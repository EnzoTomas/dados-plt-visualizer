
import React from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ShareData } from '@/types/share';
import { AggregatedData } from "@/hooks/useAggregatedData";
import { ProcessedDataItem } from "@/hooks/useProcessedData";
import { generateShareText } from '@/utils/shareUtils';

interface SharePlatformButtonsProps {
  shareData: ShareData;
  aggregatedData: AggregatedData;
  filteredData: ProcessedDataItem[];
  onClose: () => void;
}

export const SharePlatformButtons = ({
  shareData,
  aggregatedData,
  filteredData,
  onClose
}: SharePlatformButtonsProps) => {
  const { toast } = useToast();

  const getShareContent = () => {
    return generateShareText(aggregatedData, shareData, filteredData);
  };

  const shareToWhatsApp = async () => {
    const text = getShareContent();
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    onClose();
    toast({
      title: "Compartilhamento iniciado",
      description: "Redirecionando para o WhatsApp...",
    });
  };

  const shareToGmail = async () => {
    const text = getShareContent();
    const subject = "Status Paletização - Relatório";
    const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    onClose();
    toast({
      title: "Compartilhamento iniciado",
      description: "Abrindo cliente de email...",
    });
  };

  const copyToClipboard = async () => {
    const text = getShareContent();
    navigator.clipboard.writeText(text).then(() => {
      onClose();
      toast({
        title: "Copiado!",
        description: "Texto copiado para a área de transferência.",
      });
    });
  };

  const shareToSlack = async () => {
    const text = getShareContent();
    // Primeiro copia o texto para o clipboard
    await navigator.clipboard.writeText(text);
    // Depois abre o Slack
    const url = `slack://`;
    window.open(url, '_blank');
    onClose();
    toast({
      title: "Compartilhamento iniciado",
      description: "Texto copiado! Redirecionando para o Slack...",
    });
  };

  return (
    <div className="border-t pt-4">
      <h4 className="text-sm font-medium mb-3">Escolha a plataforma:</h4>
      <div className="grid grid-cols-2 gap-2">
        <Button onClick={shareToWhatsApp} variant="outline" size="sm" className="w-full text-xs">
          📱 WhatsApp
        </Button>
        <Button onClick={shareToGmail} variant="outline" size="sm" className="w-full text-xs">
          📧 Gmail
        </Button>
        <Button onClick={shareToSlack} variant="outline" size="sm" className="w-full text-xs">
          💬 Slack
        </Button>
        <Button onClick={copyToClipboard} variant="outline" size="sm" className="w-full text-xs">
          📋 Copiar
        </Button>
      </div>
    </div>
  );
};
