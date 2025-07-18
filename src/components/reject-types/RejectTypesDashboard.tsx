
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, AlertTriangle, TrendingUp } from 'lucide-react';
import { FinalDataItem } from '@/hooks/useFinalData';
import { useMemo, useState } from 'react';
import { RejectTypesChart } from './RejectTypesChart';
import { RejectTypesPareto } from './RejectTypesPareto';

interface RejectTypesDashboardProps {
  finalData: FinalDataItem[];
}

export const RejectTypesDashboard = ({ finalData }: RejectTypesDashboardProps) => {
  const [showChart, setShowChart] = useState(false);
  
  const processedData = useMemo(() => {
    const totals = finalData.reduce((acc, item) => {
      acc.erroSistemico += item.erroSistemico;
      acc.erroFisico += item.erroFisico;
      acc.fisicoMaiorSistemico += item.fisicoMaiorSistemico;
      acc.sistemicoMaiorFisico += item.sistemicoMaiorFisico;
      acc.etiquetaRejeitado += item.etiquetaRejeitado;
      acc.naoGerouEtiqueta += item.naoGerouEtiqueta;
      acc.mosaico += item.mosaico;
      acc.tampaComprometida += item.tampaComprometida;
      acc.palletComCaixasSemTampa += item.palletComCaixasSemTampa;
      acc.caixasDanificadasRobo += item.caixasDanificadasRobo;
      acc.palletQuebrado += item.palletQuebrado;
      acc.mistura += item.mistura;
      acc.outro += item.outro;
      return acc;
    }, {
      erroSistemico: 0,
      erroFisico: 0,
      fisicoMaiorSistemico: 0,
      sistemicoMaiorFisico: 0,
      etiquetaRejeitado: 0,
      naoGerouEtiqueta: 0,
      mosaico: 0,
      tampaComprometida: 0,
      palletComCaixasSemTampa: 0,
      caixasDanificadasRobo: 0,
      palletQuebrado: 0,
      mistura: 0,
      outro: 0
    });

    const totalSum = Object.values(totals).reduce((sum, val) => sum + val, 0);

    // Separar itens prioritários e demais
    const priorityItems = [
      { id: 'erroFisico', name: 'Erro Físico', value: totals.erroFisico, category: 'priority', priority: 1 },
      { id: 'erroSistemico', name: 'Erro Sistêmico', value: totals.erroSistemico, category: 'priority', priority: 2 }
    ];

    const otherItems = [
      { id: 'fisicoMaiorSistemico', name: 'Físico > Sistêmico', value: totals.fisicoMaiorSistemico, category: 'comparacao' },
      { id: 'sistemicoMaiorFisico', name: 'Sistêmico > Físico', value: totals.sistemicoMaiorFisico, category: 'comparacao' },
      { id: 'etiquetaRejeitado', name: 'Etiqueta Rejeitada', value: totals.etiquetaRejeitado, category: 'etiqueta' },
      { id: 'naoGerouEtiqueta', name: 'Não Gerou Etiqueta', value: totals.naoGerouEtiqueta, category: 'etiqueta' },
      { id: 'mosaico', name: 'Mosaico', value: totals.mosaico, category: 'visual' },
      { id: 'tampaComprometida', name: 'Tampa Comprometida', value: totals.tampaComprometida, category: 'fisica' },
      { id: 'palletComCaixasSemTampa', name: 'Pallet sem Tampa', value: totals.palletComCaixasSemTampa, category: 'fisica' },
      { id: 'caixasDanificadasRobo', name: 'Caixas Danificadas', value: totals.caixasDanificadasRobo, category: 'mecanica' },
      { id: 'palletQuebrado', name: 'Pallet Quebrado', value: totals.palletQuebrado, category: 'mecanica' },
      { id: 'mistura', name: 'Mistura', value: totals.mistura, category: 'operacional' },
      { id: 'outro', name: 'Outro', value: totals.outro, category: 'outros' }
    ].filter(item => item.value > 0);

    // Combinar e calcular percentuais
    const allItems = [...priorityItems, ...otherItems]
      .filter(item => item.value > 0)
      .map(item => ({
        ...item,
        percentage: ((item.value / totalSum) * 100).toFixed(1)
      }));

    return { 
      priorityItems: allItems.filter(item => item.category === 'priority'),
      otherItems: allItems.filter(item => item.category !== 'priority'),
      totalSum 
    };
  }, [finalData]);

  return (
    <Card className="animate-fade-in hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-1.5 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-lg">
              <BarChart3 className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold text-foreground">
                Distribuição de Tipos de Rejeitos
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                Total: {processedData.totalSum} rejeitos
              </p>
            </div>
          </div>
          
          {processedData.totalSum > 0 && (
            <Button
              onClick={() => setShowChart(!showChart)}
              variant={showChart ? "default" : "outline"}
              size="sm"
              className="transition-all duration-300 ease-in-out hover:scale-105"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              {showChart ? 'Lista' : 'Gráfico'}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {processedData.totalSum > 0 ? (
          <div className="transition-all duration-500 ease-in-out">
            {showChart ? (
              <div className="animate-fade-in">
                <RejectTypesPareto 
                  priorityItems={processedData.priorityItems}
                  otherItems={processedData.otherItems}
                />
              </div>
            ) : (
              <div className="animate-fade-in">
                <RejectTypesChart 
                  priorityItems={processedData.priorityItems}
                  otherItems={processedData.otherItems}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
            <AlertTriangle className="h-10 w-10 mb-2 text-muted-foreground/50" />
            <p className="text-base font-medium">Nenhum rejeito encontrado</p>
            <p className="text-xs">Selecione um período diferente para ver os dados</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};