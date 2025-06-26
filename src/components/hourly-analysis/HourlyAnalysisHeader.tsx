
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Clock, BarChart3 } from 'lucide-react';
import { useIsMobile } from "@/hooks/use-mobile";

interface HourlyAnalysisHeaderProps {
  isExpanded: boolean;
  onToggle: () => void;
  dataLength: number;
}

export const HourlyAnalysisHeader = ({ isExpanded, onToggle, dataLength }: HourlyAnalysisHeaderProps) => {
  const isMobile = useIsMobile();

  if (!isExpanded) {
    return (
      <Card className="hover-lift bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border-2 border-primary/20 shadow-lg">
        <CardContent className="p-6">
          <Button
            onClick={onToggle}
            variant="ghost"
            className="w-full flex items-center justify-between text-primary hover:bg-primary/10 h-auto py-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left">
                <span className="font-bold text-lg block">Análise Hora a Hora</span>
                {isMobile ? (
                  <div className="text-sm text-muted-foreground">
                    <div>Clique para ver insights</div>
                    <div>detalhados de produção</div>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    Clique para ver insights detalhados de produção
                  </span>
                )}
              </div>
            </div>
            <ChevronDown className="h-5 w-5" />
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-r from-primary/15 via-accent/10 to-primary/15 border-2 border-primary/30 shadow-lg">
      <CardContent className="p-4 md:p-6">
        <Button
          onClick={onToggle}
          variant="ghost"
          className="w-full flex items-center justify-between text-primary hover:bg-primary/10 h-auto py-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div className="text-left">
              <span className="font-bold text-lg md:text-xl block">Dashboard Hora a Hora</span>
              {isMobile ? (
                <div className="text-xs text-muted-foreground">
                  <div>Análise detalhada baseada em</div>
                  <div>{dataLength} dias de dados</div>
                </div>
              ) : (
                <span className="text-sm text-muted-foreground">
                  Análise detalhada baseada em {dataLength} dias de dados
                </span>
              )}
            </div>
          </div>
          <ChevronUp className="h-5 w-5" />
        </Button>
      </CardContent>
    </Card>
  );
};
