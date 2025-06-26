
import React from 'react';

export const RobotBody = () => {
  return (
    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
      <div className="relative w-8 h-10 bg-yellow-500 rounded-t-lg border-2 border-yellow-600 shadow-lg">
        {/* Detalhes do corpo */}
        <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-yellow-600 rounded"></div>
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rounded-full"></div>
        
        {/* Logo/marca */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-800">
          R
        </div>
      </div>
    </div>
  );
};
