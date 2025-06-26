
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, AreaChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { TrendingUp, Target, Zap, Activity, BarChart3 } from 'lucide-react';
import { useIsMobile } from "@/hooks/use-mobile";

interface TrendData {
  date: string;
  eficiencia: number;
  meta: number;
}

interface TrendChartProps {
  trendData: TrendData[];
  currentEfficiency: number;
}

export const TrendChart = ({ trendData, currentEfficiency }: TrendChartProps) => {
  const isMobile = useIsMobile();
  const META = 92; // Nova meta de 92%

  return (
    <Card className="hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white via-blue-50/30 to-blue-100/50 border-0 shadow-xl overflow-hidden scroll-animate">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-green-500 to-blue-600"></div>
      <CardHeader className={`${isMobile ? 'pb-3' : 'pb-6'} relative`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`${isMobile ? 'p-2' : 'p-3'} bg-blue-500/10 rounded-xl`}>
              <TrendingUp className={`${isMobile ? 'h-5 w-5' : 'h-6 w-6'} text-blue-600`} />
            </div>
            <div>
              <CardTitle className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-gray-800`}>
                Análise de Performance
              </CardTitle>
              <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600 mt-1`}>Eficiência vs Meta ({META}%)</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-blue-600`}>
              {currentEfficiency.toFixed(1)}%
            </div>
            <div className="text-xs text-gray-500">Atual</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className={isMobile ? 'p-3' : ''}>
        {/* Indicadores de Performance */}
        <div className={`grid grid-cols-3 ${isMobile ? 'gap-2 mb-4' : 'gap-4 mb-6'}`}>
          <div className={`text-center ${isMobile ? 'p-2' : 'p-3'} bg-green-50 rounded-lg`}>
            <Target className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} mx-auto text-green-600 mb-1`} />
            <div className={`${isMobile ? 'text-base' : 'text-lg'} font-bold text-green-600`}>{META}%</div>
            <div className={`${isMobile ? 'text-xs' : 'text-xs'} text-gray-600`}>Meta</div>
          </div>
          <div className={`text-center ${isMobile ? 'p-2' : 'p-3'} bg-yellow-50 rounded-lg`}>
            <Zap className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} mx-auto text-yellow-600 mb-1`} />
            <div className={`${isMobile ? 'text-base' : 'text-lg'} font-bold text-yellow-600`}>70%</div>
            <div className={`${isMobile ? 'text-xs' : 'text-xs'} text-gray-600`}>Crítico</div>
          </div>
          <div className={`text-center ${isMobile ? 'p-2' : 'p-3'} bg-blue-50 rounded-lg`}>
            <Activity className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} mx-auto text-blue-600 mb-1`} />
            <div className={`${isMobile ? 'text-base' : 'text-lg'} font-bold ${currentEfficiency >= META ? 'text-green-600' : currentEfficiency >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
              {currentEfficiency >= META ? 'Excelente' : currentEfficiency >= 70 ? 'Atenção' : 'Crítico'}
            </div>
            <div className={`${isMobile ? 'text-xs' : 'text-xs'} text-gray-600`}>Status</div>
          </div>
        </div>

        {/* Visualização mobile alternativa */}
        {isMobile ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Dados Recentes</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {trendData.slice(-6).map((item, index) => (
                <div key={item.date} className="p-2 bg-white rounded-lg border border-gray-200">
                  <div className="text-xs text-gray-500 mb-1">{item.date}</div>
                  <div className={`text-sm font-bold ${item.eficiencia >= META ? 'text-green-600' : item.eficiencia >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {item.eficiencia.toFixed(1)}%
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                    <div 
                      className={`h-1.5 rounded-full ${item.eficiencia >= META ? 'bg-green-500' : item.eficiencia >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${Math.min(item.eficiencia, 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Gráfico desktop */
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="colorEficiencia" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorCritica" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 11, fill: '#6b7280' }}
                tickFormatter={(value) => {
                  const [day, month] = value.split('/');
                  return `${day}/${month}`;
                }}
              />
              <YAxis 
                tick={{ fontSize: 11, fill: '#6b7280' }}
                domain={[0, 100]}
              />
              
              {/* Área da zona crítica */}
              <Area
                type="monotone"
                dataKey={() => 70}
                stroke="none"
                fill="url(#colorCritica)"
                fillOpacity={0.3}
              />
              
              {/* Linha da meta (92%) */}
              <Line
                type="monotone"
                dataKey={() => META}
                stroke="#10b981"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
              
              {/* Área principal da eficiência */}
              <Area
                type="monotone"
                dataKey="eficiencia"
                stroke="#3b82f6"
                strokeWidth={3}
                fill="url(#colorEficiencia)"
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2, fill: '#ffffff' }}
              />
              
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                }}
                formatter={(value: number, name: string) => {
                  if (name === 'eficiencia') return [`${value.toFixed(1)}%`, 'Eficiência'];
                  return [value, name];
                }}
                labelFormatter={(label) => `Data: ${label}`}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};
