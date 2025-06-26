
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { User } from 'lucide-react';
import { useIsMobile } from "@/hooks/use-mobile";
import { ResponsibleData, responsibleColors } from "@/utils/rejectAnalysisUtils";
import { getResponsibleIcon } from "@/utils/rejectAnalysisIcons";
import { CustomTooltip } from "./CustomTooltip";

interface ResponsibleDashboardProps {
  responsibleChartData: ResponsibleData[];
  totalResponsible: number;
}

export const ResponsibleDashboard = ({ responsibleChartData, totalResponsible }: ResponsibleDashboardProps) => {
  const isMobile = useIsMobile();

  // Data for the responsible pie chart
  const responsiblePieData = responsibleChartData.map((item, index) => ({
    name: item.name,
    value: item.value,
    percentage: item.percentage,
    color: responsibleColors[index % responsibleColors.length]
  }));

  return (
    <Card className="hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white via-blue-50/30 to-blue-100/50 border-0 shadow-xl overflow-hidden scroll-animate">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      <CardHeader className={`${isMobile ? 'pb-2' : 'pb-6'} relative`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`${isMobile ? 'p-2' : 'p-3'} bg-blue-500/10 rounded-xl`}>
              <User className={`${isMobile ? 'h-5 w-5' : 'h-6 w-6'} text-blue-600`} />
            </div>
            <div>
              <CardTitle className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-gray-800`}>
                Responsáveis pelos Rejeitos
              </CardTitle>
              <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600 mt-1`}>Origem dos problemas</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-blue-600`}>{totalResponsible}</div>
            <div className="text-xs text-gray-500">Total de ocorrências</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className={isMobile ? 'p-3' : ''}>
        {responsibleChartData.length > 0 ? (
          <div className={isMobile ? 'space-y-3' : 'space-y-6'}>
            {/* Cards dos responsáveis */}
            <div className={`grid grid-cols-1 ${isMobile ? 'gap-2' : 'gap-3'}`}>
              {responsibleChartData.map((item, index) => (
                <div 
                  key={item.name} 
                  className={`flex items-center justify-between ${isMobile ? 'p-2' : 'p-4'} bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300`}
                >
                  <div className="flex items-center space-x-3">
                    <div 
                      className={`${isMobile ? 'p-1.5' : 'p-2'} rounded-lg`}
                      style={{
                        backgroundColor: `${responsibleColors[index]}20`,
                        color: responsibleColors[index]
                      }}
                    >
                      {getResponsibleIcon(item.name)}
                    </div>
                    <div>
                      <div className={`font-semibold text-gray-800 ${isMobile ? 'text-xs' : 'text-sm'}`}>{item.name}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div 
                      className={`${isMobile ? 'text-sm' : 'text-lg'} font-bold`}
                      style={{ color: responsibleColors[index] }}
                    >
                      {item.value}
                    </div>
                    <div className="text-xs text-gray-500">
                      {item.percentage.toFixed(1)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pie chart for responsible - desktop only */}
            {!isMobile && (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <defs>
                    {responsiblePieData.map((entry, index) => (
                      <linearGradient key={`gradient-resp-${index}`} id={`gradient-resp-${index}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={entry.color} stopOpacity={0.9}/>
                        <stop offset="95%" stopColor={entry.color} stopOpacity={0.6}/>
                      </linearGradient>
                    ))}
                  </defs>
                  <Pie
                    data={responsiblePieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ percentage }) => `${percentage.toFixed(1)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    stroke="#fff"
                    strokeWidth={2}
                  >
                    {responsiblePieData.map((entry, index) => (
                      <Cell 
                        key={`cell-resp-${index}`} 
                        fill={`url(#gradient-resp-${index})`}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    formatter={(value, entry: any) => (
                      <span style={{ color: entry.color, fontSize: '12px' }}>
                        {value} ({entry.payload.value})
                      </span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        ) : (
          <div className={`text-center py-8 text-gray-500 ${isMobile ? 'h-[200px]' : 'h-[350px]'} flex flex-col items-center justify-center`}>
            <User className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>Nenhum dado de responsáveis disponível</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
