
import { AggregatedData } from "@/hooks/useAggregatedData";
import { ProcessedDataItem } from "@/hooks/useProcessedData";

export interface ShareButtonProps {
  aggregatedData: AggregatedData;
  filteredData?: ProcessedDataItem[];
}

export interface ShareData {
  eficiencia: boolean;
  inseridos: boolean;
  rejeitos: boolean;
  turnos: boolean;
  analiseRejeitos: boolean;
  responsaveisRejeitos: boolean;
  analiseHoraria: boolean;
}

export type ShareType = 'dados' | 'imagens' | 'ambos';
