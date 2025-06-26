
import React from 'react';
import { ShareType } from '@/types/share';

interface ShareTypeSelectorProps {
  shareType: ShareType;
  onShareTypeChange: (type: ShareType) => void;
}

export const ShareTypeSelector = ({ shareType, onShareTypeChange }: ShareTypeSelectorProps) => {
  return (
    <div>
      <h4 className="text-sm font-medium mb-3">Tipo de compartilhamento:</h4>
      <div className="grid grid-cols-1 gap-2">
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id="dados"
            name="shareType"
            checked={shareType === 'dados'}
            onChange={() => onShareTypeChange('dados')}
          />
          <label htmlFor="dados" className="text-sm">📝 Compartilhar dados</label>
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id="imagens"
            name="shareType"
            checked={shareType === 'imagens'}
            onChange={() => onShareTypeChange('imagens')}
          />
          <label htmlFor="imagens" className="text-sm">🖼️ Compartilhar imagens</label>
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id="ambos"
            name="shareType"
            checked={shareType === 'ambos'}
            onChange={() => onShareTypeChange('ambos')}
          />
          <label htmlFor="ambos" className="text-sm">🔄 Compartilhar ambos</label>
        </div>
      </div>
    </div>
  );
};
