
import React from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ShareData } from '@/types/share';

interface ShareDataSelectorProps {
  shareData: ShareData;
  onShareDataChange: (field: keyof ShareData) => void;
  onSelectAll: () => void;
}

export const ShareDataSelector = ({ shareData, onShareDataChange, onSelectAll }: ShareDataSelectorProps) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium">Selecione as informações:</h4>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onSelectAll}
          className="text-xs h-6 px-2"
        >
          Selecionar todos
        </Button>
      </div>
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {/* Métricas Principais */}
        <div className="border-b pb-2 mb-2">
          <h5 className="text-xs font-semibold text-muted-foreground mb-2">📊 Métricas Principais</h5>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="eficiencia"
                checked={shareData.eficiencia}
                onCheckedChange={() => onShareDataChange('eficiencia')}
              />
              <label htmlFor="eficiencia" className="text-sm">Eficiência Total</label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="inseridos"
                checked={shareData.inseridos}
                onCheckedChange={() => onShareDataChange('inseridos')}
              />
              <label htmlFor="inseridos" className="text-sm">Total Inseridos</label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="rejeitos"
                checked={shareData.rejeitos}
                onCheckedChange={() => onShareDataChange('rejeitos')}
              />
              <label htmlFor="rejeitos" className="text-sm">Total Rejeitos</label>
            </div>
          </div>
        </div>

        {/* Análises por Turno */}
        <div className="border-b pb-2 mb-2">
          <h5 className="text-xs font-semibold text-muted-foreground mb-2">🕐 Análises por Turno</h5>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="turnos"
                checked={shareData.turnos}
                onCheckedChange={() => onShareDataChange('turnos')}
              />
              <label htmlFor="turnos" className="text-sm">Dados por Turno</label>
            </div>
          </div>
        </div>

        {/* Análises Detalhadas */}
        <div>
          <h5 className="text-xs font-semibold text-muted-foreground mb-2">📈 Análises Detalhadas</h5>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="analiseHoraria"
                checked={shareData.analiseHoraria}
                onCheckedChange={() => onShareDataChange('analiseHoraria')}
              />
              <label htmlFor="analiseHoraria" className="text-sm">Análise Horária</label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="analiseRejeitos"
                checked={shareData.analiseRejeitos}
                onCheckedChange={() => onShareDataChange('analiseRejeitos')}
              />
              <label htmlFor="analiseRejeitos" className="text-sm">Análise de Rejeitos</label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="responsaveisRejeitos"
                checked={shareData.responsaveisRejeitos}
                onCheckedChange={() => onShareDataChange('responsaveisRejeitos')}
              />
              <label htmlFor="responsaveisRejeitos" className="text-sm">Responsáveis pelos Rejeitos</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
