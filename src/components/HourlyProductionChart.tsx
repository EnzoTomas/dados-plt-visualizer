
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, ReferenceLine, Cell, LabelList } from 'recharts';
import { useIsMobile } from "@/hooks/use-mobile";

interface HourlyProductionChartProps {
  hourlyData: {
    hour: number;
    inseridos: number;
    rejeitos: number;
    total: number;
    eficiencia: number;
    turno: string;
  }[];
}

// Custom label component for displaying values on bars
const CustomLabel = (props: any) => {
  const { x, y, width, height, value, payload } = props;
  
  // Only show label if value is significant enough
  if (value === 0 || height < 20) return null;
  
  const isMobile = width < 30; // Detect mobile based on bar width
  const fontSize = isMobile ? 9 : 11;
  
  return (
    <text 
      x={x + width / 2} 
      y={y - 4} 
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
      {value}
    </text>
  );
};

// Custom tooltip content with correct turno information
const CustomTooltipContent = (props: any) => {
  const { active, payload, label } = props;
  
  if (!active || !payload || !payload.length) return null;
  
  const data = payload[0].payload;
  const hour = Number(label);
  
  // Determine correct turno based on hour
  const getTurnoInfo = (hour: number) => {
    if (hour >= 6 && hour < 14) return { name: '1º Turno', period: '06h-14h', color: '#3b82f6' };
    if (hour >= 14 && hour < 22) return { name: '2º Turno', period: '14h-22h', color: '#f97316' };
    return { name: '3º Turno', period: '22h-06h', color: '#8b5cf6' };
  };
  
  const turnoInfo = getTurnoInfo(hour);
  const formatHour = (hour: number) => `${String(hour).padStart(2, '0')}h`;
  
  return (
    <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg shadow-xl p-3 text-sm">
      <div className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
        <div 
          className="w-3 h-3 rounded-full" 
          style={{ backgroundColor: turnoInfo.color }}
        ></div>
        {formatHour(hour)} - {turnoInfo.name}
      </div>
      <div className="text-xs text-gray-600 mb-2">{turnoInfo.period}</div>
      <div className="space-y-1">
        <div className="flex justify-between items-center gap-3">
          <span className="text-green-600 font-medium">Inseridos:</span>
          <span className="font-semibold">{data.inseridos}</span>
        </div>
        <div className="flex justify-between items-center gap-3">
          <span className="text-orange-600 font-medium">Rejeitos:</span>
          <span className="font-semibold">{data.rejeitos}</span>
        </div>
        <div className="flex justify-between items-center gap-3 pt-1 border-t border-gray-200">
          <span className="text-gray-700 font-medium">Total:</span>
          <span className="font-semibold">{data.total}</span>
        </div>
        <div className="flex justify-between items-center gap-3">
          <span className="text-blue-600 font-medium">Eficiência:</span>
          <span className="font-semibold">{data.eficiencia.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
};

export const HourlyProductionChart = ({ hourlyData }: HourlyProductionChartProps) => {
  const isMobile = useIsMobile();
  
  const chartConfig = {
    inseridos: {
      label: "Inseridos",
      color: "#10b981",
    },
    rejeitos: {
      label: "Rejeitos", 
      color: "#f97316",
    },
  };

  // Enhanced color scheme with gradients
  const getTurnoGradient = (hour: number) => {
    if (hour >= 6 && hour < 14) return "url(#gradientBlue)";
    if (hour >= 14 && hour < 22) return "url(#gradientOrange)";
    return "url(#gradientPurple)";
  };

  const formatHour = (hour: number) => `${String(hour).padStart(2, '0')}h`;

  return (
    <Card className="hover-lift shadow-lg border-primary/10 bg-gradient-to-br from-white to-gray-50/50">
      <CardHeader className="pb-3 md:pb-4 px-4 md:px-6">
        <CardTitle className="text-lg md:text-xl font-bold text-center bg-gradient-to-r from-primary via-blue-600 to-accent bg-clip-text text-transparent">
          Produção por Hora - Análise Detalhada
        </CardTitle>
        <p className="text-xs md:text-sm text-muted-foreground text-center mt-2">
          Distribuição de inseridos e rejeitos ao longo do dia
        </p>
      </CardHeader>
      <CardContent className="p-2 md:p-6">
        <div className="w-full overflow-x-auto">
          <ChartContainer 
            config={chartConfig} 
            className={`w-full ${isMobile ? 'h-[320px] min-w-[600px]' : 'h-[400px]'}`}
          >
            <BarChart 
              data={hourlyData} 
              margin={{ 
                top: 40, 
                right: isMobile ? 15 : 30, 
                left: isMobile ? 15 : 20, 
                bottom: isMobile ? 30 : 40 
              }}
              barCategoryGap={isMobile ? "12%" : "18%"}
            >
              {/* Gradient definitions */}
              <defs>
                <linearGradient id="gradientBlue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.9}/>
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.8}/>
                </linearGradient>
                <linearGradient id="gradientOrange" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fb923c" stopOpacity={0.9}/>
                  <stop offset="100%" stopColor="#f97316" stopOpacity={0.8}/>
                </linearGradient>
                <linearGradient id="gradientPurple" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.9}/>
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                </linearGradient>
                <linearGradient id="gradientRed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f87171" stopOpacity={0.9}/>
                  <stop offset="100%" stopColor="#ef4444" stopOpacity={0.7}/>
                </linearGradient>
              </defs>

              <XAxis 
                dataKey="hour" 
                tickFormatter={formatHour}
                tick={{ fontSize: isMobile ? 10 : 11, fill: '#64748b', fontWeight: 500 }}
                axisLine={{ stroke: '#e2e8f0', strokeWidth: 1 }}
                tickLine={{ stroke: '#e2e8f0' }}
                interval={isMobile ? 1 : 0}
              />
              <YAxis 
                tick={{ fontSize: isMobile ? 10 : 11, fill: '#64748b', fontWeight: 500 }} 
                axisLine={{ stroke: '#e2e8f0', strokeWidth: 1 }}
                tickLine={{ stroke: '#e2e8f0' }}
                width={isMobile ? 35 : 40}
              />
              
              <ChartTooltip content={<CustomTooltipContent />} />
              
              {/* Subtle reference lines for shift changes */}
              {!isMobile && (
                <>
                  <ReferenceLine x={6} stroke="#cbd5e1" strokeDasharray="3 3" strokeOpacity={0.6} />
                  <ReferenceLine x={14} stroke="#cbd5e1" strokeDasharray="3 3" strokeOpacity={0.6} />
                  <ReferenceLine x={22} stroke="#cbd5e1" strokeDasharray="3 3" strokeOpacity={0.6} />
                </>
              )}
              
              {/* Enhanced bars for inseridos with turno-based gradients */}
              <Bar
                dataKey="inseridos"
                radius={[4, 4, 0, 0]}
                stroke="none"
                style={{
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                }}
              >
                <LabelList content={CustomLabel} />
                {hourlyData.map((entry, index) => (
                  <Cell key={`cell-inseridos-${index}`} fill={getTurnoGradient(entry.hour)} />
                ))}
              </Bar>
              
              {/* Enhanced bars for rejeitos with gradient */}
              <Bar
                dataKey="rejeitos"
                radius={[4, 4, 0, 0]}
                fill="url(#gradientRed)"
                stroke="none"
                opacity={0.85}
                style={{
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                }}
              >
                <LabelList content={CustomLabel} />
              </Bar>
            </BarChart>
          </ChartContainer>
        </div>
        
        {/* Enhanced legend with better spacing and typography */}
        <div className="mt-4 md:mt-6 space-y-3 md:space-y-4">
          <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-1 md:grid-cols-2 gap-4'}`}>
            <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'flex-wrap justify-center md:justify-start gap-4'} text-xs md:text-sm`}>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-b from-blue-400 to-blue-600 rounded shadow-sm"></div>
                <span className="font-medium text-gray-700">1º Turno (06h-14h)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-b from-orange-400 to-orange-600 rounded shadow-sm"></div>
                <span className="font-medium text-gray-700">2º Turno (14h-22h)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-b from-purple-400 to-purple-600 rounded shadow-sm"></div>
                <span className="font-medium text-gray-700">3º Turno (22h-06h)</span>
              </div>
            </div>
            <div className={`flex ${isMobile ? 'justify-start' : 'justify-center md:justify-end'} items-center gap-4 text-xs md:text-sm`}>
              <div className="flex items-center gap-2">
                <div className="w-4 h-3 bg-gradient-to-b from-red-400 to-red-600 rounded shadow-sm opacity-85"></div>
                <span className="font-medium text-red-600">Rejeitos</span>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg border border-blue-100">
            <p className="text-xs text-gray-600 text-center">
              {isMobile 
                ? "Deslize horizontalmente para ver todos os horários • Toque nas barras para detalhes completos"
                : "Linhas tracejadas indicam mudanças de turno • Passe o mouse sobre as barras para informações detalhadas"
              }
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
