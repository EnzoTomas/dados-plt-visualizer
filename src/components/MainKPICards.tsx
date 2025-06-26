
import { Card } from "@/components/ui/card";
import { CheckCircle, Calendar, X, TrendingUp, TrendingDown } from 'lucide-react';
import { CountUp } from "@/components/CountUp";

interface AggregatedData {
  eficiencia: number;
  totalInseridos: number;
  totalRejeitos: number;
}

interface MainKPICardsProps {
  aggregatedData: AggregatedData;
}

export const MainKPICards = ({ aggregatedData }: MainKPICardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="p-6 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-secondary/50 to-secondary/30 border-l-4 border-l-secondary animate-fade-in scroll-animate">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-secondary-foreground mb-2 font-medium">Eficiência Total</div>
            <div className="text-4xl font-bold text-secondary-foreground transition-all duration-500">
              <CountUp end={aggregatedData.eficiencia} decimals={2} suffix="%" />
            </div>
            <div className="flex items-center mt-2">
              {aggregatedData.eficiencia >= 50 ? (
                <TrendingUp className="h-4 w-4 text-primary mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-destructive mr-1" />
              )}
              <span className="text-xs text-muted-foreground">vs período anterior</span>
            </div>
          </div>
          <div className="h-16 w-16 bg-secondary/20 rounded-full flex items-center justify-center hover:rotate-12 transition-transform duration-300">
            <CheckCircle className="h-8 w-8 text-secondary-foreground" />
          </div>
        </div>
      </Card>

      <Card className="p-6 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-primary/20 to-primary/10 border-l-4 border-l-primary animate-fade-in scroll-animate">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-primary mb-2 font-medium">Inseridos Total</div>
            <div className="text-4xl font-bold text-primary transition-all duration-500">
              <CountUp end={aggregatedData.totalInseridos} />
            </div>
          </div>
          <div className="h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center hover:rotate-12 transition-transform duration-300">
            <Calendar className="h-8 w-8 text-primary" />
          </div>
        </div>
      </Card>

      <Card className="p-6 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-destructive/20 to-destructive/10 border-l-4 border-l-destructive animate-fade-in scroll-animate">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-destructive mb-2 font-medium">Rejeitados Total</div>
            <div className="text-4xl font-bold text-destructive transition-all duration-500">
              <CountUp end={aggregatedData.totalRejeitos} />
            </div>
          </div>
          <div className="h-16 w-16 bg-destructive/20 rounded-full flex items-center justify-center hover:rotate-12 transition-transform duration-300">
            <X className="h-8 w-8 text-destructive" />
          </div>
        </div>
      </Card>
    </div>
  );
};
