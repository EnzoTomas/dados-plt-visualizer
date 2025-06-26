
import React from 'react';

export const Pallet = () => {
  return (
    <div className="absolute bottom-2 right-6">
      <div className="w-8 h-1 bg-amber-800 border border-amber-900 rounded-sm"></div>
      {/* Ripas do pallet */}
      <div className="absolute top-0 left-0 w-full h-full flex justify-between">
        <div className="w-0.5 h-1 bg-amber-900"></div>
        <div className="w-0.5 h-1 bg-amber-900"></div>
        <div className="w-0.5 h-1 bg-amber-900"></div>
      </div>
    </div>
  );
};
