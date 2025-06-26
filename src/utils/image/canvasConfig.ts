
export const getHighQualityCanvasConfig = () => ({
  scale: 3, // Aumenta significativamente a resolução (era 2, agora 3)
  backgroundColor: '#ffffff', // Fundo branco sólido para evitar transparência
  useCORS: true, // Permite carregamento de recursos externos
  allowTaint: false, // Segurança para recursos externos
  logging: false, // Desabilita logs para performance
  imageTimeout: 30000, // 30 segundos para carregar imagens
  removeContainer: true, // Remove elementos temporários
  foreignObjectRendering: false, // Melhor compatibilidade
  width: undefined, // Deixa o html2canvas calcular automaticamente
  height: undefined, // Deixa o html2canvas calcular automaticamente
  ignoreElements: (element: Element) => {
    // Ignora scripts e estilos que podem interferir
    return element.tagName === 'SCRIPT' || element.tagName === 'STYLE';
  },
  onclone: (clonedDoc: Document) => {
    // Aguarda um pouco para garantir que tudo carregou
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        // Força estilos para melhor contraste e nitidez
        const clonedElement = clonedDoc.querySelector('.max-w-7xl');
        if (clonedElement) {
          const element = clonedElement as HTMLElement;
          // Aumenta contraste, brilho e saturação
          element.style.filter = 'contrast(1.5) brightness(1.2) saturate(1.4)';
          element.style.backgroundColor = '#ffffff';
          // Força anti-aliasing usando setProperty (correção do erro TypeScript)
          element.style.setProperty('-webkit-font-smoothing', 'antialiased');
          element.style.setProperty('font-smooth', 'always');
          // Melhora a renderização de texto
          element.style.textRendering = 'optimizeLegibility';
        }
        
        // Força cores mais escuras para todos os textos
        const allElements = clonedDoc.querySelectorAll('*');
        allElements.forEach((el) => {
          const element = el as HTMLElement;
          const computedStyle = window.getComputedStyle(element);
          
          // Força textos escuros
          if (computedStyle.color) {
            const rgb = computedStyle.color.match(/\d+/g);
            if (rgb && rgb.length >= 3) {
              const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
              if (brightness > 100) {
                element.style.setProperty('color', '#000000', 'important');
              }
            }
          }
          
          // Força backgrounds claros para cards
          if (element.classList.contains('bg-card') || 
              element.classList.contains('bg-background') ||
              element.classList.contains('bg-white')) {
            element.style.setProperty('background-color', '#ffffff', 'important');
          }
          
          // Melhora a renderização de bordas
          if (computedStyle.borderColor) {
            element.style.setProperty('border-color', '#e5e7eb', 'important');
          }
        });
        
        resolve();
      }, 500); // Aguarda 500ms para garantir renderização completa
    });
  }
});