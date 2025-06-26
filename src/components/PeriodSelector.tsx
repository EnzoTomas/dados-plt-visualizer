
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PeriodDescription } from "@/components/PeriodDescription";

interface PeriodSelectorProps {
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
}

export const PeriodSelector = ({
  selectedPeriod,
  onPeriodChange,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange
}: PeriodSelectorProps) => {
  /**
   * Formata uma string de data 'YYYY-MM-DD' para 'DD/MM/YYYY'
   * corrigindo o problema de fuso horário para exibição.
   */
  const formatDateForDisplay = (dateString: string) => {
    // Retorna um placeholder se a data for nula ou vazia
    if (!dateString) {
      return '...';
    }

    // A MÁGICA ESTÁ AQUI: Adiciona 'T00:00:00' para que a data
    // seja criada no fuso horário local e não em UTC.
    const date = new Date(dateString + 'T00:00:00');
    
    // Formata a data para o padrão brasileiro (DD/MM/YYYY)
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-card/20 animate-fade-in">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
        <Tabs value={selectedPeriod} onValueChange={onPeriodChange} className="w-full lg:w-auto">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-muted h-auto">
            <TabsTrigger value="ontem" className="transition-all hover:scale-105 text-xs md:text-sm px-2 py-2">
              Ontem
            </TabsTrigger>
            <TabsTrigger value="semana" className="transition-all hover:scale-105 text-xs md:text-sm px-2 py-2">
              Semana
            </TabsTrigger>
            <TabsTrigger value="mensal" className="transition-all hover:scale-105 text-xs md:text-sm px-2 py-2">
              Mensal
            </TabsTrigger>
            <TabsTrigger value="anual" className="transition-all hover:scale-105 text-xs md:text-sm px-2 py-2">
              Anual
            </TabsTrigger>
            <TabsTrigger value="personalizado" className="transition-all hover:scale-105 text-xs md:text-sm px-2 py-2 col-span-2 md:col-span-1">
              Personalizado
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        {selectedPeriod === 'personalizado' && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm animate-scale-in w-full lg:w-auto">
            <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg">
              <span className="font-medium text-primary">De</span>
              <input 
                type="date" 
                value={startDate} 
                onChange={(e) => onStartDateChange(e.target.value)}
                className="border border-primary/20 rounded px-3 py-1 focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
              />
            </div>
            <div className="flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-lg">
              <span className="font-medium text-accent">Até</span>
              <input 
                type="date" 
                value={endDate} 
                onChange={(e) => onEndDateChange(e.target.value)}
                className="border border-accent/20 rounded px-3 py-1 focus:ring-2 focus:ring-accent focus:border-transparent transition-all" 
              />
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-4">
        <PeriodDescription 
          selectedPeriod={selectedPeriod} 
          startDate={startDate} 
          endDate={endDate}
          formatDateForDisplay={formatDateForDisplay}
        />
      </div>
    </div>
  );
};
