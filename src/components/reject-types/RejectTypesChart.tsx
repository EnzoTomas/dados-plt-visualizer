

import { useMemo } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface RejectItem {
  id: string;
  name: string;
  value: number;
  percentage: string;
  category: string;
  priority?: number;
}

interface RejectTypesChartProps {
  priorityItems: RejectItem[];
  otherItems: RejectItem[];
}

const colors = [
  'hsl(var(--destructive))',
  'hsl(var(--primary))', 
  '#f97316', 
  '#eab308', 
  '#22c55e', 
  '#06b6d4', 
  '#3b82f6', 
  '#8b5cf6',
  '#ec4899',
  '#f59e0b',
  '#10b981',
  '#6366f1',
  '#84cc16'
];

export const RejectTypesChart = ({ priorityItems, otherItems }: RejectTypesChartProps) => {
  const isMobile = useIsMobile();

  const PriorityItemCard = ({ item, index }: { item: RejectItem; index: number }) => (
    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 rounded-lg border border-red-200/50 dark:border-red-800/30 shadow-sm">
      <div className="flex items-center space-x-3">
        <div 
          className="w-4 h-4 rounded-md shadow-sm"
          style={{ backgroundColor: colors[index] }}
        />
        <div>
          <div className="font-semibold text-foreground text-sm">{item.name}</div>
          <div className="text-xs text-muted-foreground">Categoria prioritária</div>
        </div>
      </div>
      <div className="text-right">
        <div 
          className="text-lg font-bold"
          style={{ color: colors[index] }}
        >
          {item.value}
        </div>
        <div className="text-xs text-muted-foreground">
          {item.percentage}%
        </div>
      </div>
    </div>
  );

  const OtherItemCard = ({ item, index }: { item: RejectItem; index: number }) => {
    const colorIndex = index + priorityItems.length;
    return (
      <div className="flex items-center justify-between p-2.5 bg-card rounded-lg border border-border/50 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.01]">
        <div className="flex items-center space-x-2.5 min-w-0 flex-1">
          <div 
            className="w-3 h-3 rounded-sm flex-shrink-0"
            style={{ backgroundColor: colors[colorIndex % colors.length] }}
          />
          <div className="min-w-0 flex-1">
            <div className="font-medium text-foreground text-sm truncate">{item.name}</div>
          </div>
        </div>
        <div className="text-right flex-shrink-0 ml-2">
          <div 
            className="text-sm font-semibold"
            style={{ color: colors[colorIndex % colors.length] }}
          >
            {item.value}
          </div>
          <div className="text-xs text-muted-foreground">
            {item.percentage}%
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Itens Prioritários */}
      {priorityItems.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-foreground mb-2">Principais Tipos</h4>
          <div className="space-y-2">
            {priorityItems.map((item, index) => (
              <PriorityItemCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      )}

      {/* Outros Itens em Grid */}
      {otherItems.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-foreground mb-2">Outros Tipos</h4>
          <div className={`grid ${isMobile ? 'grid-cols-1 gap-2' : 'grid-cols-2 gap-2'}`}>
            {otherItems.map((item, index) => (
              <OtherItemCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};