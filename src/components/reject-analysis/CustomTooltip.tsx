
interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
}

export const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
        <p className="font-semibold text-gray-800">{data.fullName || data.name}</p>
        <p className="text-sm text-gray-600">Quantidade: {data.value}</p>
        <p className="text-sm text-gray-600">Percentual: {data.percentage.toFixed(1)}%</p>
      </div>
    );
  }
  return null;
};
