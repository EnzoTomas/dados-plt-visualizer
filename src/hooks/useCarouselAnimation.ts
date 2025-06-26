
import { useState, useEffect } from 'react';

export const useCarouselAnimation = (currentPage: number) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<'next' | 'prev' | null>(null);

  const triggerAnimation = (direction: 'next' | 'prev') => {
    setAnimationDirection(direction);
    setIsAnimating(true);
    
    // Reset animation state after transition completes
    setTimeout(() => {
      setIsAnimating(false);
      setAnimationDirection(null);
    }, 400);
  };

  return {
    isAnimating,
    animationDirection,
    triggerAnimation
  };
};
