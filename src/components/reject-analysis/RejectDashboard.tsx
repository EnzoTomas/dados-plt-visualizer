
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from 'lucide-react';
import { useIsMobile } from "@/hooks/use-mobile";
import { RejectData, colors } from "@/utils/rejectAnalysisUtils";
import { getRejectIcon } from "@/utils/rejectAnalysisIcons";

interface RejectDashboardProps {
  rejectChartData: RejectData[];
  totalRejects: number;
}

export const RejectDashboard = ({ rejectChartData, totalRejects }: RejectDashboardProps) => {
  const isMobile = useIsMobile();

  return (
    <Card className="hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white via-red-50/30 to-red-100/50 border-0 shadow-xl overflow-hidden scroll-animate">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500"></div>
      <CardHeader className={`${isMobile ? 'pb-2' : 'pb-4'} relative`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`${isMobile ? 'p-2' : 'p-3'} bg-red-500/10 rounded-xl`}>
              <AlertTriangle className={`${isMobile ? 'h-5 w-5' : 'h-6 w-6'} text-red-600`} />
            </div>
            <div>
              <CardTitle className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-gray-800`}>
                Análise de Rejeitos
              </CardTitle>
              <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600 mt-1`}>Distribuição por categoria</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-red-600`}>{totalRejects}</div>
            <div className="text-xs text-gray-500">Total de rejeitos</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className={`${isMobile ? 'p-3' : 'p-4'}`}>
        {rejectChartData.length > 0 ? (
          <div className={`grid ${isMobile ? 'grid-cols-1 gap-2' : 'grid-cols-2 gap-3'}`}>
            {rejectChartData.map((item, index) => (
              <div 
                key={item.name} 
                className={`flex items-center justify-between ${isMobile ? 'p-2.5' : 'p-3'} bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:scale-[1.02]`}
              >
                <div className="flex items-center space-x-2.5">
                  <div 
                    className={`${isMobile ? 'p-1.5' : 'p-2'} rounded-lg flex-shrink-0`}
                    style={{
                      backgroundColor: `${colors[index]}20`,
                      color: colors[index]
                    }}
                  >
                    {getRejectIcon(item.fullName)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className={`font-semibold text-gray-800 ${isMobile ? 'text-xs' : 'text-sm'} leading-tight`}>
                      {item.name}
                    </div>
                    {!isMobile && (
                      <div className="text-xs text-gray-500 truncate">{item.fullName}</div>
                    )}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div 
                    className={`${isMobile ? 'text-sm' : 'text-base'} font-bold`}
                    style={{ color: colors[index] }}
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
        ) : (
          <div className="text-center py-8 text-gray-500">
            <AlertTriangle className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>Nenhum rejeito encontrado no período selecionado</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
