
import { Activity } from 'lucide-react';
import { DownloadButton } from "@/components/DownloadButton";
import { ImportButton } from "@/components/ImportButton";
import { ShareButton } from "@/components/ShareButton";
import { ProcessedDataItem } from "@/hooks/useProcessedData";
import { AggregatedData } from "@/hooks/useAggregatedData";

interface HeaderProps {
  filteredData: ProcessedDataItem[];
  aggregatedData: AggregatedData;
  onDataImport: (data: string) => void;
  latestDataDate: string;
}

export const Header = ({ filteredData, aggregatedData, onDataImport, latestDataDate }: HeaderProps) => {
  return (
    <div className="flex flex-col gap-4 animate-slide-in-right">
      {/* Left side - Title and last update */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent relative overflow-hidden shine-text">
            Status Paletização
          </h1>
          <p className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            Última atualização de dados: {latestDataDate}
          </p>
        </div>
        
        {/* Right side elements */}
        <div className="flex flex-col sm:flex-row items-start gap-3">
          <div className="flex items-center space-x-2 order-2 sm:order-1">
            <Activity className="h-6 w-6 text-primary animate-pulse" />
            <span className="text-sm text-primary font-medium">Sistema Online</span>
          </div>
          <div className="flex items-center flex-wrap gap-2 order-1 sm:order-2">
            <DownloadButton filteredData={filteredData} aggregatedData={aggregatedData} />
            <ImportButton onDataImport={onDataImport} />
            <ShareButton aggregatedData={aggregatedData} filteredData={filteredData} />
          </div>
        </div>
      </div>
    </div>
  );
};
