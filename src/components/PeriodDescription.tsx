
interface PeriodDescriptionProps {
  selectedPeriod: string;
  startDate: string;
  endDate: string;
  formatDateForDisplay?: (dateString: string) => string;
}

export const PeriodDescription = ({ 
  selectedPeriod, 
  startDate, 
  endDate,
  formatDateForDisplay 
}: PeriodDescriptionProps) => {
  // Função auxiliar interna caso não seja passada
  const defaultFormatDateForDisplay = (dateString: string) => {
    if (!dateString) return '...';
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('pt-BR');
  };

  const formatDate = formatDateForDisplay || defaultFormatDateForDisplay;

  const getDescription = () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const formatToDMY = (date: Date) => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    switch (selectedPeriod) {
      case 'ontem':
        return `📅 Dados de ontem (${formatToDMY(yesterday)})`;
      
      case 'semana':
        const weekAgo = new Date(yesterday);
        weekAgo.setDate(weekAgo.getDate() - 6);
        return `📅 Últimos 7 dias (${formatToDMY(weekAgo)} - ${formatToDMY(yesterday)})`;
      
      case 'mensal':
        const monthStart = new Date(yesterday.getFullYear(), yesterday.getMonth(), 1);
        return `📅 Mês atual até ontem (${formatToDMY(monthStart)} - ${formatToDMY(yesterday)})`;
      
      case 'anual':
        const yearStart = new Date(yesterday.getFullYear(), 0, 1);
        return `📅 Ano atual até ontem (${formatToDMY(yearStart)} - ${formatToDMY(yesterday)})`;
      
      case 'personalizado':
        return `📅 Período personalizado (${formatDate(startDate)} - ${formatDate(endDate)})`;
      
      default:
        return '📅 Selecione um período';
    }
  };

  return (
    <p className="text-muted-foreground text-sm bg-muted/20 px-4 py-2 rounded-lg border-l-4 border-primary/30">
      {getDescription()}
    </p>
  );
};
