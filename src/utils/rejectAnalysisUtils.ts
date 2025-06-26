
export interface RejectData {
  name: string;
  fullName: string;
  value: number;
  percentage: number;
}

export interface ResponsibleData {
  name: string;
  value: number;
  percentage: number;
}

export const processRejectTypeData = (data: any[]): RejectData[] => {
  const rejectTypeData = data.reduce((acc, item) => {
    const rejects = {
      'Erro de leitura da etiqueta': Number(item.erroLeituraEtiqueta) || 0,
      'Madeira dos pés do pallet': Number(item.madeiraPesPallet) || 0,
      'Área livre nos pés': Number(item.areaLivrePes) || 0,
      'Erro de contorno: Altura': Number(item.erroContornoAltura) || 0,
      'Erro de contorno: Direita': Number(item.erroContornoDireita) || 0,
      'Erro de contorno: Esquerda': Number(item.erroContornoEsquerda) || 0,
      'Erro de contorno: Frente': Number(item.erroContornoFrente) || 0,
      'Erro de contorno: Traseira': Number(item.erroContornoTraseira) || 0
    };
    Object.entries(rejects).forEach(([type, count]) => {
      if (!acc[type]) acc[type] = 0;
      acc[type] += count;
    });
    return acc;
  }, {} as Record<string, number>);

  const rejectChartData = Object.entries(rejectTypeData).map(([name, value]) => ({
    name: name.replace('Erro de contorno: ', '').replace('Erro de ', ''),
    fullName: name,
    value: Number(value),
    percentage: 0
  })).filter(item => item.value > 0).sort((a, b) => b.value - a.value);

  // Calculate percentages
  const totalRejects = rejectChartData.reduce((sum, item) => sum + item.value, 0);
  rejectChartData.forEach(item => {
    item.percentage = totalRejects > 0 ? item.value / totalRejects * 100 : 0;
  });

  return rejectChartData;
};

export const processResponsibleData = (data: any[]): ResponsibleData[] => {
  const responsibleData = data.reduce((acc, item) => {
    const responsible = {
      'Falha no sensor': Number(item.falhaSensor) || 0,
      'Pallet': Number(item.pallet) || 0,
      'RN': Number(item.rn) || 0
    };
    Object.entries(responsible).forEach(([type, count]) => {
      if (!acc[type]) acc[type] = 0;
      acc[type] += count;
    });
    return acc;
  }, {} as Record<string, number>);

  const responsibleChartData = Object.entries(responsibleData).map(([name, value]) => ({
    name,
    value: Number(value),
    percentage: 0
  })).filter(item => item.value > 0).sort((a, b) => b.value - a.value);

  // Calculate percentages
  const totalResponsible = responsibleChartData.reduce((sum, item) => sum + item.value, 0);
  responsibleChartData.forEach(item => {
    item.percentage = totalResponsible > 0 ? item.value / totalResponsible * 100 : 0;
  });

  return responsibleChartData;
};

export const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'];
export const responsibleColors = ['#3b82f6', '#10b981', '#f59e0b'];
