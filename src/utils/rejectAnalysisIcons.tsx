
import { AlertTriangle, Target, Zap, Settings, Package, FileX } from 'lucide-react';

export const getRejectIcon = (name: string) => {
  if (name.includes('Contorno') || name.includes('Altura') || name.includes('Direita') || name.includes('Esquerda') || name.includes('Frente') || name.includes('Traseira')) {
    return <Target className="h-4 w-4" />;
  }
  if (name.includes('Etiqueta') || name.includes('leitura')) {
    return <Zap className="h-4 w-4" />;
  }
  return <AlertTriangle className="h-4 w-4" />;
};

export const getResponsibleIcon = (name: string) => {
  if (name === 'Falha no sensor') {
    return <Settings className="h-4 w-4" />;
  }
  if (name === 'Pallet') {
    return <Package className="h-4 w-4" />;
  }
  if (name === 'RN') {
    return <FileX className="h-4 w-4" />;
  }
  return <AlertTriangle className="h-4 w-4" />;
};
