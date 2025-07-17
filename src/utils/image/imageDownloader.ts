
import html2canvas from 'html2canvas';
import { getHighQualityCanvasConfig } from './canvasConfig';

export const downloadPNG = async () => {
  const element = document.querySelector('.max-w-7xl') as HTMLElement;
  if (!element) {
    throw new Error('Elemento não encontrado para captura');
  }

  // Aguarda um momento para garantir que a página está totalmente renderizada
  await new Promise(resolve => setTimeout(resolve, 1000));

  const canvas = await html2canvas(element, getHighQualityCanvasConfig());

  // Melhora adicional da qualidade da imagem
  const link = document.createElement('a');
  link.download = `Status_Paletizacao_${new Date().toLocaleDateString('pt-BR').replace(/\//g, '-')}.png`;
  // Usa qualidade máxima (1.0) para PNG
  link.href = canvas.toDataURL('image/png', 1.0);
  link.click();
};
