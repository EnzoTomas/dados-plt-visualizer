
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HourlyCarouselNavigationProps {
  currentPage: number;
  totalPages: number;
  isAnimating: boolean;
  animationDirection: 'next' | 'prev' | null;
  onPrevPage: () => void;
  onNextPage: () => void;
  onGoToPage: (pageIndex: number) => void;
}

export const HourlyCarouselNavigation = ({
  currentPage,
  totalPages,
  isAnimating,
  animationDirection,
  onPrevPage,
  onNextPage,
  onGoToPage
}: HourlyCarouselNavigationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between pt-2">
      <Button
        onClick={onPrevPage}
        disabled={currentPage === 0 || isAnimating}
        variant="outline"
        size="sm"
        className="flex items-center gap-2 transition-all duration-300 hover:scale-105 disabled:hover:scale-100 hover:shadow-md active:scale-95"
      >
        <ChevronLeft className={`h-4 w-4 transition-transform duration-300 ${isAnimating && animationDirection === 'prev' ? '-translate-x-1' : ''}`} />
        Anterior
      </Button>
      
      {/* Enhanced pagination dots */}
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => onGoToPage(i)}
            disabled={isAnimating}
            className={`relative w-2 h-2 rounded-full transition-all duration-500 ease-out transform hover:scale-150 ${
              i === currentPage 
                ? 'bg-primary shadow-lg shadow-primary/30' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          >
            {i === currentPage && (
              <div className="absolute inset-0 rounded-full bg-primary animate-pulse opacity-50"></div>
            )}
          </button>
        ))}
      </div>

      <Button
        onClick={onNextPage}
        disabled={currentPage === totalPages - 1 || isAnimating}
        variant="outline"
        size="sm"
        className="flex items-center gap-2 transition-all duration-300 hover:scale-105 disabled:hover:scale-100 hover:shadow-md active:scale-95"
      >
        Próximo
        <ChevronRight className={`h-4 w-4 transition-transform duration-300 ${isAnimating && animationDirection === 'next' ? 'translate-x-1' : ''}`} />
      </Button>
    </div>
  );
};
