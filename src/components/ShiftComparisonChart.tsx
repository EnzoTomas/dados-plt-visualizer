
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface ShiftComparisonChartProps {
  shifts: {
    turno1: { inseridos: number; rejeitos: number; eficiencia: number; };
    turno2: { inseridos: number; rejeitos: number; eficiencia: number; };
    turno3: { inseridos: number; rejeitos: number; eficiencia: number; };
  };
}

export const ShiftComparisonChart = ({ shifts }: ShiftComparisonChartProps) => {
  const chartConfig = {
    inseridos: {
      label: "Inseridos",
      color: "hsl(var(--chart-2))",
    },
    rejeitos: {
      label: "Rejeitos",
      color: "hsl(var(--destructive))",
    },
    eficiencia: {
      label: "Eficiência (%)",
      color: "hsl(var(--chart-1))",
    },
  };

  const chartData = [
    {
      turno: "Turno 1",
      periodo: "06:00-14:00",
      inseridos: shifts.turno1.inseridos,
      rejeitos: shifts.turno1.rejeitos,
      eficiencia: shifts.turno1.eficiencia,
    },
    {
      turno: "Turno 2",
      periodo: "14:00-22:00",
      inseridos: shifts.turno2.inseridos,
      rejeitos: shifts.turno2.rejeitos,
      eficiencia: shifts.turno2.eficiencia,
    },
    {
      turno: "Turno 3",
      periodo: "22:00-06:00",
      inseridos: shifts.turno3.inseridos,
      rejeitos: shifts.turno3.rejeitos,
      eficiencia: shifts.turno3.eficiencia,
    },
  ];

  return (
    <Card className="hover-lift">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-primary">
          Comparação entre Turnos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <BarChart data={chartData}>
            <XAxis 
              dataKey="turno" 
              tick={{ fontSize: 12 }}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <ChartTooltip 
              content={<ChartTooltipContent 
                formatter={(value, name) => [
                  typeof value === 'number' ? Math.round(value) : value, 
                  name === 'eficiencia' ? 'Eficiência (%)' : name === 'inseridos' ? 'Inseridos' : 'Rejeitos'
                ]}
                labelFormatter={(label, payload) => {
                  const data = payload?.[0]?.payload;
                  return data ? `${data.turno} (${data.periodo})` : label;
                }}
              />} 
            />
            <Bar
              dataKey="inseridos"
              fill="hsl(var(--chart-2))"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="rejeitos"
              fill="hsl(var(--destructive))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>

        {/* Resumo de eficiência por turno */}
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          {chartData.map((turno, index) => (
            <div key={index} className="bg-gradient-to-br from-primary/5 to-accent/5 p-3 rounded-lg">
              <div className="text-xs font-medium text-muted-foreground">{turno.turno}</div>
              <div className="text-lg font-bold text-primary">
                {turno.eficiencia.toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground">
                {turno.inseridos + turno.rejeitos} total
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
