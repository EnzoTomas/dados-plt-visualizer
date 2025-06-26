
import React from 'react';
import { HourlyCarouselCard } from './HourlyCarouselCard';

interface HourlyCarouselGridProps {
  currentPageItems: Array<{
    hour: number;
    inseridos: number;
    rejeitos: number;
    eficiencia: number;
  }>;
  currentPage: number;
  isAnimating: boolean;
  animationDirection: 'next' | 'prev' | null;
}

export const HourlyCarouselGrid = ({
  currentPageItems,
  currentPage,
  isAnimating,
  animationDirection
}: HourlyCarouselGridProps) => {
  // Simplified animation classes
  const getAnimationClasses = () => {
    if (!isAnimating) return 'opacity-100';
    return 'opacity-50';
  };

  return (
    <div className="relative overflow-hidden">
      {/* Simplified animated container for grid */}
      <div 
        className={`transition-opacity duration-200 ease-out ${getAnimationClasses()}`}
      >
        {/* Grid 2 columns for mobile */}
        <div className="grid grid-cols-2 gap-3">
          {currentPageItems.map((hourData, index) => (
            <HourlyCarouselCard
              key={`${hourData.hour}-${currentPage}`}
              hourData={hourData}
              index={index}
              currentPage={currentPage}
              isAnimating={isAnimating}
            />
          ))}
        </div>
      </div>

      {/* Simplified loading overlay */}
      {isAnimating && (
        <div className="absolute inset-0 bg-white/10 flex items-center justify-center pointer-events-none">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      )}
    </div>
  );
};
