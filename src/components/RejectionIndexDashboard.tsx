import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';
import { PeriodSelector } from './PeriodSelector';
import { useMemo } from 'react';

interface RejectionIndexDashboardProps {
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  filteredData: any[];
}

export const RejectionIndexDashboard = ({
  selectedPeriod,
  onPeriodChange,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  filteredData
}: RejectionIndexDashboardProps) => {
  const rejectionData = useMemo(() => {
    return filteredData.map(item => {
      const total = item.totalInseridos + item.totalRejeitos;
      const rejectionRate = total > 0 ? (item.totalRejeitos / total) * 100 : 0;
      
      return {
        date: item.date,
        rejectionRate: rejectionRate,
        total: total,
        rejected: item.totalRejeitos,
        isAboveTarget: rejectionRate > 8
      };
    });
  }, [filteredData]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{label}</p>
          <p className="text-sm text-muted-foreground">
            Taxa de Rejeição: <span className="font-medium text-foreground">{data.rejectionRate.toFixed(2)}%</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Rejeitos: <span className="font-medium text-foreground">{data.rejected}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Total: <span className="font-medium text-foreground">{data.total}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <PeriodSelector
        selectedPeriod={selectedPeriod}
        onPeriodChange={onPeriodChange}
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
      />
      
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-foreground">
            Índice de Rejeição Geral
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Meta: manter abaixo de 8%
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rejectionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  label={{ value: 'Taxa de Rejeição (%)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine 
                  y={8} 
                  stroke="hsl(var(--destructive))" 
                  strokeDasharray="5 5" 
                  strokeWidth={2}
                  label="Meta 8%"
                />
                <Bar dataKey="rejectionRate" radius={[4, 4, 0, 0]}>
                  {rejectionData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.isAboveTarget ? "hsl(var(--destructive))" : "hsl(var(--primary))"} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};