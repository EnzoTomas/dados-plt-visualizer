import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell, LabelList } from 'recharts';
import { TrendingUp, TrendingDown, Target } from 'lucide-react';
import { useMemo } from 'react';

interface RejectionIndexChartProps {
  data: Array<{
    date: string;
    totalRejeitos: number;
    totalInseridos: number;
    rejectionRate: number;
  }>;
}

// Custom label component for displaying percentages on bars
const CustomLabel = (props: any) => {
  const { x, y, width, height, value } = props;
  
  // Only show label if value is significant enough and bar is tall enough
  if (value === 0 || height < 25) return null;
  
  const fontSize = width < 30 ? 9 : 11;
  
  return (
    <text 
      x={x + width / 2} 
      y={y - 6} 
      fill="#374151" 
      textAnchor="middle" 
      dominantBaseline="bottom"
      fontSize={fontSize}
      fontWeight="600"
      style={{ 
        textShadow: '0 1px 2px rgba(255,255,255,0.8)',
        filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.1))'
      }}
    >
      {value.toFixed(1)}%
    </text>
  );
};

export const RejectionIndexChart = ({ data }: RejectionIndexChartProps) => {
  const processedData = useMemo(() => {
    return data.map(item => {
      const percentageValue = item.rejectionRate * 100;
      return {
        ...item,
        rejectionRate: percentageValue,
        isAboveTarget: percentageValue > 8,
        isAtTarget: percentageValue === 8,
        status: percentageValue > 8 ? 'above' : percentageValue >= 6 ? 'warning' : 'good'
      };
    });
  }, [data]);

  const stats = useMemo(() => {
    if (!data.length) return { average: 0, trend: 'stable' };

    const average = data.reduce((sum, item) => sum + (item.rejectionRate * 100), 0) / data.length;
    
    // Calcular tendência
    const recent = data.slice(-5);
    const older = data.slice(-10, -5);
    const recentAvg = recent.length > 0 ? recent.reduce((sum, item) => sum + (item.rejectionRate * 100), 0) / recent.length : 0;
    const olderAvg = older.length > 0 ? older.reduce((sum, item) => sum + (item.rejectionRate * 100), 0) / older.length : 0;
    
    const trend = recentAvg > olderAvg ? 'up' : recentAvg < olderAvg ? 'down' : 'stable';

    return { average, trend };
  }, [data]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border border-border rounded-lg p-4 shadow-lg backdrop-blur-sm">
          <p className="font-semibold text-foreground mb-3">{label}</p>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="text-muted-foreground">Taxa de Rejeição:</span>{' '}
              <span className={`font-bold text-lg ${data.isAboveTarget ? 'text-destructive' : 'text-green-600'}`}>
                {data.rejectionRate.toFixed(2)}%
              </span>
            </p>
            <p className="text-sm">
              <span className="text-muted-foreground">Rejeitos:</span>{' '}
              <span className="font-semibold text-foreground">{data.totalRejeitos.toLocaleString()}</span>
            </p>
            <p className="text-sm">
              <span className="text-muted-foreground">Total Produzido:</span>{' '}
              <span className="font-semibold text-foreground">{(data.totalInseridos + data.totalRejeitos).toLocaleString()}</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const getBarColor = (status: string) => {
    switch (status) {
      case 'above':
        return 'hsl(var(--destructive))';
      case 'warning':
        return 'hsl(45 100% 60%)';
      default:
        return 'hsl(142 71% 45%)';
    }
  };

  return (
    <Card className="animate-fade-in transition-all duration-500 ease-in-out">
      <CardHeader className="pb-6 bg-gradient-to-r from-background to-muted/20">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Target className="h-6 w-6 text-primary" />
              </div>
              Índice de Rejeição por Período
            </CardTitle>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center p-3 bg-background rounded-lg border shadow-sm animate-scale-in">
              <div className="text-3xl font-bold text-primary transition-all duration-300">
                {stats.average.toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground font-medium">Média Geral</div>
            </div>
            <div className="flex flex-col items-center p-3 bg-background rounded-lg border shadow-sm animate-scale-in">
              <div className="flex items-center gap-2 mb-1">
                {stats.trend === 'up' && <TrendingUp className="h-5 w-5 text-destructive" />}
                {stats.trend === 'down' && <TrendingDown className="h-5 w-5 text-green-600" />}
                {stats.trend === 'stable' && <div className="h-5 w-5 bg-muted rounded-full flex items-center justify-center"><div className="h-2 w-2 bg-muted-foreground rounded-full"></div></div>}
                <span className={`text-sm font-semibold ${stats.trend === 'up' ? 'text-destructive' : stats.trend === 'down' ? 'text-green-600' : 'text-muted-foreground'}`}>
                  {stats.trend === 'up' ? 'Subindo' : stats.trend === 'down' ? 'Descendo' : 'Estável'}
                </span>
              </div>
              <div className="text-xs text-muted-foreground">Tendência</div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {processedData.length > 0 ? (
          <div className="h-96 transition-all duration-500 ease-in-out">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={processedData} 
                margin={{ top: 40, right: 50, left: 20, bottom: 70 }}
                barCategoryGap="20%"
              >
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  opacity={0.2} 
                  stroke="hsl(var(--muted-foreground))"
                />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                  tickLine={{ stroke: 'hsl(var(--border))' }}
                />
                <YAxis 
                  tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                  tickLine={{ stroke: 'hsl(var(--border))' }}
                  domain={[0, 'dataMax + 5']}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine 
                  y={8} 
                  stroke="hsl(var(--destructive))" 
                  strokeDasharray="8 4" 
                  strokeWidth={3}
                />
                <Bar 
                  dataKey="rejectionRate" 
                  radius={[6, 6, 0, 0]}
                  className="transition-all duration-300 ease-in-out"
                  animationDuration={800}
                  animationEasing="ease-out"
                >
                  <LabelList content={<CustomLabel />} />
                  {processedData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={getBarColor(entry.status)}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground animate-fade-in">
            <div className="animate-pulse">
              <Target className="h-16 w-16 mx-auto mb-6 text-muted-foreground/30" />
            </div>
            <p className="text-xl font-semibold mb-2">Nenhum dado encontrado</p>
            <p className="text-sm opacity-70">Selecione um período diferente para visualizar os dados</p>
          </div>
        )}
        
        {/* Legenda melhorada */}
        <div className="flex items-center justify-center gap-8 mt-6 pt-6 border-t border-border animate-fade-in">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-green-50 dark:bg-green-950/20">
            <div className="w-5 h-5 rounded-md shadow-sm" style={{ backgroundColor: 'hsl(142 71% 45%)' }}></div>
            <span className="text-sm font-medium text-foreground">Excelente (&lt;6%)</span>
          </div>
          <div className="flex items-center gap-3 p-2 rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
            <div className="w-5 h-5 rounded-md shadow-sm" style={{ backgroundColor: 'hsl(45 100% 60%)' }}></div>
            <span className="text-sm font-medium text-foreground">Atenção (6-8%)</span>
          </div>
          <div className="flex items-center gap-3 p-2 rounded-lg bg-red-50 dark:bg-red-950/20">
            <div className="w-5 h-5 bg-destructive rounded-md shadow-sm"></div>
            <span className="text-sm font-medium text-foreground">Crítico (&gt;8%)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
