
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, LabelList } from 'recharts';
import { Activity, BarChart3 } from 'lucide-react';
import { useIsMobile } from "@/hooks/use-mobile";

interface VolumeData {
  date: string;
  totalInseridos: number;
  totalRejeitos: number;
}

interface VolumeChartProps {
  volumeData: VolumeData[];
}

const CustomLabel = (props: any) => {
  const { x, y, width, height, value } = props;
  if (value === 0) return null;
  
  return (
    <text 
      x={x + width / 2} 
      y={y + height / 2} 
      fill="white" 
      textAnchor="middle" 
      dominantBaseline="middle"
      fontSize="12"
      fontWeight="bold"
      style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
    >
      {value}
    </text>
  );
};

export const VolumeChart = ({ volumeData }: VolumeChartProps) => {
  const isMobile = useIsMobile();

  // Calculate totals for mobile summary
  const totalInseridos = volumeData.reduce((sum, item) => sum + item.totalInseridos, 0);
  const totalRejeitos = volumeData.reduce((sum, item) => sum + item.totalRejeitos, 0);
  const totalGeral = totalInseridos + totalRejeitos;

  return (
    <Card className="hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white via-blue-50/30 to-green-100/50 border-0 shadow-xl overflow-hidden scroll-animate">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-green-500 to-blue-600"></div>
      <CardHeader className={`${isMobile ? 'pb-2' : 'pb-4'} relative`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`${isMobile ? 'p-2' : 'p-3'} bg-blue-500/10 rounded-xl`}>
              <Activity className={`${isMobile ? 'h-5 w-5' : 'h-6 w-6'} text-blue-600`} />
            </div>
            <div>
              <CardTitle className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-gray-800`}>
                Volume de Produção
              </CardTitle>
              <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600 mt-1`}>Inseridos vs Rejeitos</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-blue-600`}>{totalGeral}</div>
            <div className="text-xs text-gray-500">Total geral</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className={`${isMobile ? 'p-3' : 'p-4'}`}>
        {/* Indicadores de Performance Mobile */}
        {isMobile && (
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-600">{totalInseridos}</div>
              <div className="text-xs text-gray-600">Inseridos</div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                <div 
                  className="bg-green-500 h-1.5 rounded-full"
                  style={{ width: `${totalGeral > 0 ? (totalInseridos / totalGeral) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-lg font-bold text-red-600">{totalRejeitos}</div>
              <div className="text-xs text-gray-600">Rejeitos</div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                <div 
                  className="bg-red-500 h-1.5 rounded-full"
                  style={{ width: `${totalGeral > 0 ? (totalRejeitos / totalGeral) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Visualização mobile alternativa */}
        {isMobile ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Dados Recentes</span>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {volumeData.slice(-8).map((item, index) => (
                <div key={item.date} className="p-3 bg-white rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm font-medium text-gray-700">{item.date}</div>
                    <div className="text-xs text-gray-500">Total: {item.totalInseridos + item.totalRejeitos}</div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-green-600">Inseridos</span>
                        <span className="font-medium">{item.totalInseridos}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${item.totalInseridos > 0 ? Math.min((item.totalInseridos / Math.max(item.totalInseridos, item.totalRejeitos)) * 100, 100) : 0}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-red-600">Rejeitos</span>
                        <span className="font-medium">{item.totalRejeitos}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-red-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${item.totalRejeitos > 0 ? Math.min((item.totalRejeitos / Math.max(item.totalInseridos, item.totalRejeitos)) * 100, 100) : 0}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Gráfico desktop */
          <>
            <div className="flex items-center gap-4 text-sm font-normal mb-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: 'hsl(var(--primary))' }}></div>
                <span>Inseridos</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: 'hsl(var(--destructive))' }}></div>
                <span>Rejeitos</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={volumeData} margin={{ top: 30, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorInseridos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.9}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.7}/>
                  </linearGradient>
                  <linearGradient id="colorRejeitos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.9}/>
                    <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0.7}/>
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
                <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  }}
                  formatter={(value: number, name: string) => {
                    if (name === 'totalInseridos') return [value, 'Inseridos'];
                    if (name === 'totalRejeitos') return [value, 'Rejeitos'];
                    return [value, name];
                  }}
                  labelFormatter={(label) => `Data: ${label}`}
                />
                <Bar 
                  dataKey="totalInseridos" 
                  fill="url(#colorInseridos)" 
                  radius={[4, 4, 0, 0]}
                  name="totalInseridos"
                >
                  <LabelList content={CustomLabel} />
                </Bar>
                <Bar 
                  dataKey="totalRejeitos" 
                  fill="url(#colorRejeitos)" 
                  radius={[4, 4, 0, 0]}
                  name="totalRejeitos"
                >
                  <LabelList content={CustomLabel} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </>
        )}
      </CardContent>
    </Card>
  );
};
