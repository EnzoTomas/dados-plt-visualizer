
import React, { useState } from 'react';
import { Share } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ShareButtonProps, ShareData } from '@/types/share';
import { ShareDataSelector } from '@/components/share/ShareDataSelector';
import { SharePlatformButtons } from '@/components/share/SharePlatformButtons';

export const ShareButton = ({ aggregatedData, filteredData = [] }: ShareButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [shareData, setShareData] = useState<ShareData>({
    eficiencia: true,
    inseridos: true,
    rejeitos: false,
    turnos: false,
    analiseRejeitos: false,
    responsaveisRejeitos: false,
    analiseHoraria: false
  });

  const selectAll = () => {
    setShareData({
      eficiencia: true,
      inseridos: true,
      rejeitos: true,
      turnos: true,
      analiseRejeitos: true,
      responsaveisRejeitos: true,
      analiseHoraria: true
    });
  };

  const handleCheckboxChange = (field: keyof ShareData) => {
    setShareData(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1 px-2 text-xs">
              <Share className="h-3 w-3" />
              <span className="hidden sm:inline">Compartilhar</span>
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Compartilhar dados via WhatsApp, email ou outras plataformas</p>
        </TooltipContent>
      </Tooltip>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Compartilhar Dashboard</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <ShareDataSelector
            shareData={shareData}
            onShareDataChange={handleCheckboxChange}
            onSelectAll={selectAll}
          />

          <SharePlatformButtons
            shareData={shareData}
            aggregatedData={aggregatedData}
            filteredData={filteredData}
            onClose={() => setIsOpen(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
