
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { getHighQualityCanvasConfig } from '../image/canvasConfig';

export const downloadPDF = async () => {
  const element = document.querySelector('.max-w-7xl') as HTMLElement;
  if (!element) {
    throw new Error('Elemento não encontrado para captura');
  }

  // Aguarda um momento para garantir que a página está totalmente renderizada
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Configuração específica para PDF (escala um pouco menor para gerenciar tamanho do arquivo)
  const pdfConfig = {
    ...getHighQualityCanvasConfig(),
    scale: 2.5 // Um pouco menor que PNG para otimizar tamanho do PDF
  };

  const canvas = await html2canvas(element, pdfConfig);

  // Usa qualidade máxima para o canvas
  const imgData = canvas.toDataURL('image/png', 1.0);
  
  // Criar PDF com jsPDF em orientação landscape
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
    compress: false // Desabilita compressão para manter qualidade
  });

  const imgWidth = 297; // A4 landscape width em mm
  const pageHeight = 210; // A4 landscape height em mm
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  let heightLeft = imgHeight;

  let position = 0;

  // Adiciona primeira página com qualidade máxima
  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
  heightLeft -= pageHeight;

  // Adiciona páginas extras se necessário
  while (heightLeft >= 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
    heightLeft -= pageHeight;
  }

  const today = new Date().toLocaleDateString('pt-BR').replace(/\//g, '-');
  pdf.save(`Status_Paletizacao_${today}.pdf`);
};
