
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HourlyAnalysis } from "@/hooks/useHourlyAnalysis";
import { useCarouselAnimation } from "@/hooks/useCarouselAnimation";
import { HourlyCarouselNavigation } from './HourlyCarouselNavigation';
import { HourlyCarouselGrid } from './HourlyCarouselGrid';

interface HourlyDataCarouselProps {
  analysis: HourlyAnalysis;
}

export const HourlyDataCarousel = ({ analysis }: HourlyDataCarouselProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const { isAnimating, animationDirection, triggerAnimation } = useCarouselAnimation(currentPage);
  
  const itemsPerPage = 6;
  const totalPages = Math.ceil(analysis.hourlyData.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const currentPageItems = analysis.hourlyData.slice(startIndex, startIndex + itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages - 1 && !isAnimating) {
      triggerAnimation('next');
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
      }, 200);
    }
  };

  const prevPage = () => {
    if (currentPage > 0 && !isAnimating) {
      triggerAnimation('prev');
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
      }, 200);
    }
  };

  const goToPage = (pageIndex: number) => {
    if (pageIndex !== currentPage && !isAnimating) {
      const direction = pageIndex > currentPage ? 'next' : 'prev';
      triggerAnimation(direction);
      setTimeout(() => {
        setCurrentPage(pageIndex);
      }, 200);
    }
  };

  return (
    <Card className="border-primary/10 overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Dados por Hora
        </CardTitle>
        <p className="text-xs text-muted-foreground text-center">
          Produção detalhada por período ({currentPage + 1}/{totalPages})
        </p>

        {/* Navigation controls with enhanced animations */}
        <HourlyCarouselNavigation
          currentPage={currentPage}
          totalPages={totalPages}
          isAnimating={isAnimating}
          animationDirection={animationDirection}
          onPrevPage={prevPage}
          onNextPage={nextPage}
          onGoToPage={goToPage}
        />
      </CardHeader>
      
      <CardContent className="p-4">
        <HourlyCarouselGrid
          currentPageItems={currentPageItems}
          currentPage={currentPage}
          isAnimating={isAnimating}
          animationDirection={animationDirection}
        />
      </CardContent>
    </Card>
  );
};
