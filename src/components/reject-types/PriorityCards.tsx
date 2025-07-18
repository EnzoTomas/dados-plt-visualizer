
interface PriorityCardsProps {
  items: Array<{
    id: string;
    name: string;
    value: number;
    percentage: string;
    category: string;
    priority?: number;
  }>;
}

// Custom component for priority items with enhanced visualization
const PriorityCard = ({ item, index }: { item: any; index: number }) => {
  const colors = [
    'from-red-500 to-red-600',
    'from-orange-500 to-orange-600'
  ];
  
  return (
    <div className={`bg-gradient-to-br ${colors[index]} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]`}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-bold text-lg truncate pr-2">{item.name}</h4>
        <div className="bg-white/20 rounded-full px-3 py-1">
          <span className="font-bold text-sm">{item.percentage}%</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <span className="text-white/80 text-sm">Quantidade</span>
          <p className="font-bold text-2xl">{item.value.toLocaleString()}</p>
        </div>
        <div className="text-right">
          <span className="text-white/80 text-xs capitalize">{item.category}</span>
        </div>
      </div>
    </div>
  );
};

export const PriorityCards = ({ items }: PriorityCardsProps) => {
  const priorityData = items.sort((a, b) => b.value - a.value);

  if (priorityData.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-1 h-6 bg-destructive rounded-full"></div>
        <h3 className="text-lg font-semibold text-foreground">
          Principais Tipos de Rejeitos
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {priorityData.map((item, index) => (
          <PriorityCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
};