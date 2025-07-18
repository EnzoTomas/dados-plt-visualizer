
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ParetoChartProps {
  data: Array<{
    id: string;
    name: string;
    value: number;
    percentage: string;
    category: string;
  }>;
}

// Label profissional sempre visível com quantidade e percentual
const ExternalLabel = (props: any) => {
  const { x, y, width, height, value, payload } = props;
  
  if (!payload || value === 0) return null;
  
  const percentage = parseFloat(payload.percentage);
  const centerX = x + width / 2;
  const topY = y - 20; // Aumentei a distância da coluna
  
  return (
    <g>
      {/* Background sofisticado com gradiente sutil */}
      <defs>
        <linearGradient id={`labelGradient-${payload.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.98)" />
          <stop offset="100%" stopColor="rgba(248, 250, 252, 0.95)" />
        </linearGradient>
        <filter id={`labelShadow-${payload.id}`} x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.15)" />
        </filter>
      </defs>
      
      {/* Background principal */}
      <rect
        x={centerX - 32}
        y={topY - 40}
        width={64}
        height={34}
        fill={`url(#labelGradient-${payload.id})`}
        stroke="hsl(var(--border))"
        strokeWidth={1.5}
        rx={8}
        filter={`url(#labelShadow-${payload.id})`}
      />
      
      {/* Linha decorativa superior */}
      <rect
        x={centerX - 28}
        y={topY - 38}
        width={56}
        height={2}
        fill="hsl(var(--primary))"
        rx={1}
        opacity={0.7}
      />
      
      {/* Quantidade - valor principal */}
      <text 
        x={centerX} 
        y={topY - 26} 
        fill="hsl(var(--foreground))" 
        textAnchor="middle" 
        dominantBaseline="middle"
        fontSize={14}
        fontWeight="800"
        style={{ fontFamily: "'Inter', 'system-ui', sans-serif" }}
      >
        {value.toLocaleString('pt-BR')}
      </text>
      
      {/* Porcentagem - valor secundário */}
      <text 
        x={centerX} 
        y={topY - 12} 
        fill="hsl(var(--primary))" 
        textAnchor="middle" 
        dominantBaseline="middle"
        fontSize={11}
        fontWeight="600"
        style={{ fontFamily: "'Inter', 'system-ui', sans-serif" }}
      >
        {percentage.toFixed(1)}%
      </text>
      
      {/* Pequeno indicador visual conectando label à coluna */}
      <line
        x1={centerX}
        y1={topY - 6}
        x2={centerX}
        y2={y - 5}
        stroke="hsl(var(--border))"
        strokeWidth={1}
        strokeDasharray="2,2"
        opacity={0.4}
      />
    </g>
  );
};

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

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white/95 backdrop-blur-sm border border-border rounded-lg p-4 shadow-xl animate-fade-in">
        <p className="font-bold text-foreground mb-3 text-base">{data.name}</p>
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-4">
            <span className="text-muted-foreground text-sm">Quantidade:</span>
            <span className="font-bold text-xl text-foreground">
              {data.value.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-muted-foreground text-sm">Percentual:</span>
            <span className="font-bold text-lg text-primary">
              {data.percentage}%
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-muted-foreground text-sm">Categoria:</span>
            <span className="font-medium text-foreground capitalize text-sm">
              {data.category}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

// Custom tick component para nomes mais profissionais
const CustomXAxisTick = (props: any) => {
  const { x, y, payload } = props;
  const formattedName = formatProfessionalName(payload.value);
  
  return (
    <g transform={`translate(${x},${y})`}>
      <rect
        x={-30}
        y={5}
        width={60}
        height={20}
        fill="hsl(var(--card))"
        stroke="hsl(var(--border))"
        strokeWidth={0.5}
        rx={4}
        className="drop-shadow-sm"
      />
      <text
        x={0}
        y={18}
        dy={0}
        textAnchor="middle"
        fill="hsl(var(--foreground))"
        fontSize={10}
        fontWeight="600"
        className="select-none"
      >
        {formattedName}
      </text>
    </g>
  );
};

interface ParetoChartWithDetailsProps extends ParetoChartProps {
  showDetails?: boolean;
}

export const ParetoChart = ({ data, showDetails = false }: ParetoChartWithDetailsProps) => {
  // Sort data by value descending (Pareto principle)
  const sortedData = [...data].sort((a, b) => b.value - a.value);

  return (
    <div className="w-full bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/50 dark:from-blue-950/10 dark:via-background dark:to-indigo-950/10 rounded-xl border border-blue-200/30 dark:border-blue-800/20 shadow-lg overflow-hidden">
      {/* Gráfico */}
      <div className="h-[480px] p-6 pb-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={sortedData} 
            margin={{ top: 40, right: 40, left: 30, bottom: 80 }}
            barCategoryGap="20%"
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              opacity={0.3} 
              stroke="hsl(var(--muted-foreground))"
              vertical={false}
            />
            <XAxis 
              dataKey="name" 
              tick={<CustomXAxisTick />}
              height={80}
              axisLine={{ stroke: 'hsl(var(--border))', strokeWidth: 2 }}
              tickLine={false}
              interval={0}
            />
            <YAxis 
              tick={{ 
                fontSize: 11, 
                fill: 'hsl(var(--muted-foreground))',
                fontWeight: 500
              }}
              axisLine={{ stroke: 'hsl(var(--border))', strokeWidth: 2 }}
              tickLine={{ stroke: 'hsl(var(--border))', strokeWidth: 1 }}
              domain={[0, 'dataMax + 30']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="value" 
              radius={[8, 8, 0, 0]}
              className="transition-all duration-300 ease-in-out"
              animationDuration={1200}
              animationEasing="ease-out"
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth={2}
            >
              {sortedData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={getCategoryColor(entry.category)}
                  className="hover:brightness-110 transition-all duration-200"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Detalhamento integrado */}
      {showDetails && (
        <ParetoDetails data={sortedData} />
      )}
    </div>
  );
};

// Novo componente para os detalhes integrados
interface ParetoDetailsProps {
  data: Array<{
    id: string;
    name: string;
    value: number;
    percentage: string;
    category: string;
  }>;
}

const ParetoDetails = ({ data }: ParetoDetailsProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentItems = data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const nextPage = () => setCurrentPage((prev) => (prev + 1) % totalPages);
  const prevPage = () => setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);

  return (
    <div className="border-t border-blue-200/30 dark:border-blue-800/20 bg-gradient-to-r from-slate-50/50 via-white to-gray-50/50 dark:from-slate-950/20 dark:via-background dark:to-gray-950/20 px-4 py-0">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-1 h-4 bg-primary/60 rounded-full"></div>
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Detalhamento ({data.length} tipos)
          </span>
        </div>
        
        {totalPages > 1 && (
          <div className="flex items-center gap-1">
            <button
              onClick={prevPage}
              className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              disabled={totalPages === 1}
            >
              <ChevronLeft className="h-4 w-4 text-muted-foreground" />
            </button>
            <span className="text-xs text-muted-foreground px-2">
              {currentPage + 1} / {totalPages}
            </span>
            <button
              onClick={nextPage}
              className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              disabled={totalPages === 1}
            >
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        {currentItems.map((item) => (
          <div 
            key={item.id}
            className="flex items-center gap-2 p-2.5 bg-white/70 dark:bg-slate-900/50 rounded-md border border-slate-200/50 dark:border-slate-700/50 hover:shadow-sm transition-all duration-200"
          >
            {/* Indicador de Cor */}
            <div 
              className="w-3 h-3 rounded-sm border border-white shadow-sm flex-shrink-0"
              style={{ backgroundColor: getCategoryColor(item.category) }}
            />
            
            {/* Informações */}
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold text-foreground truncate" title={item.name}>
                {formatProfessionalName(item.name)}
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xs font-bold text-foreground">
                  {item.value}
                </span>
                <span className="text-xs text-muted-foreground">•</span>
                <span 
                  className="text-xs font-semibold"
                  style={{ color: getCategoryColor(item.category) }}
                >
                  {parseFloat(item.percentage).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Total Compacto */}
      <div className="mt-3 pt-3 border-t border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Total:</span>
        <span className="text-sm font-bold text-foreground">
          {data.reduce((sum, item) => sum + item.value, 0).toLocaleString('pt-BR')} rejeitos
        </span>
      </div>
    </div>
  );
};