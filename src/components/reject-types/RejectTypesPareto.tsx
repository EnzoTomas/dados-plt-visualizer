import { useMemo } from 'react';
import { ParetoChart } from './ParetoChart';
import { PriorityCards } from './PriorityCards';

interface RejectTypesParetorops {
  priorityItems: Array<{
    id: string;
    name: string;
    value: number;
    percentage: string;
    category: string;
    priority?: number;
  }>;
  otherItems: Array<{
    id: string;
    name: string;
    value: number;
    percentage: string;
    category: string;
  }>;
}

// Função para criar nomes mais profissionais e curtos
const formatProfessionalName = (name: string) => {
  const nameMap: { [key: string]: string } = {
    'Físico > Sistêmico': 'Físico > Sist.',
    'Sistêmico > Físico': 'Sist. > Físico',
    'Etiqueta Rejeitada': 'Etiq. Rejeitada',
    'Não Gerou Etiqueta': 'Sem Etiqueta',
    'Tampa Comprometida': 'Tampa Danif.',
    'Pallet sem Tampa': 'Pallet S/ Tampa',
    'Caixas Danificadas': 'Caixas Danif.',
    'Pallet Quebrado': 'Pallet Quebr.',
  };
  
  return nameMap[name] || name;
};

// Color scheme for different categories
const getCategoryColor = (category: string) => {
  const colors = {
    'comparacao': 'hsl(39 100% 60%)',
    'etiqueta': 'hsl(262 83% 58%)',
    'visual': 'hsl(200 98% 39%)',
    'fisica': 'hsl(142 71% 45%)',
    'mecanica': 'hsl(25 95% 53%)',
    'operacional': 'hsl(280 100% 70%)',
    'outros': 'hsl(220 13% 69%)'
  };
  
  return colors[category as keyof typeof colors] || 'hsl(220 13% 69%)';
};

export const RejectTypesPareto = ({ priorityItems, otherItems }: RejectTypesParetorops) => {
  const otherData = useMemo(() => {
    return otherItems.sort((a, b) => b.value - a.value);
  }, [otherItems]);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Priority Items Section */}
      {priorityItems.length > 0 && (
        <PriorityCards items={priorityItems} />
      )}

      {/* Other Items Section - Enhanced Pareto Chart */}
      {otherData.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-primary rounded-full"></div>
            <div>
              <h3 className="text-xl font-bold text-foreground">
                Outros Tipos de Rejeitos - Análise de Pareto
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Distribuição dos demais tipos de rejeitos por frequência de ocorrência
              </p>
            </div>
          </div>

          {/* Gráfico com Detalhamento Integrado */}
          <ParetoChart data={otherData} showDetails={true} />
        </div>
      )}
    </div>
  );
};