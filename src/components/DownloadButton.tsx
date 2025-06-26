
import React from 'react';
import { Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ProcessedDataItem } from "@/hooks/useProcessedData";
import { AggregatedData } from "@/hooks/useAggregatedData";
import { useDownloadHandlers } from "@/hooks/useDownloadHandlers";

interface DownloadButtonProps {
  filteredData: ProcessedDataItem[];
  aggregatedData: AggregatedData;
}

export const DownloadButton = ({ filteredData, aggregatedData }: DownloadButtonProps) => {
  const { handleXLSXDownload, handlePNGDownload, handlePDFDownload } = useDownloadHandlers(filteredData, aggregatedData);

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1 px-2 text-xs"
            >
              <Download className="h-3 w-3" />
              <span className="hidden sm:inline">Download</span>
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Baixar relatórios em diferentes formatos</p>
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={handleXLSXDownload}>
          📊 Excel (.xlsx)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handlePNGDownload}>
          🖼️ Imagem (.png)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handlePDFDownload}>
          📄 PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
