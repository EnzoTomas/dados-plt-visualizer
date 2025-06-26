
import React from 'react';

export const RobotArms = () => {
  return (
    <>
      {/* Braço articulado - Ombro */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div 
          className="w-2 h-6 bg-yellow-500 border border-yellow-600 origin-bottom transition-transform duration-2000"
          style={{
            animation: 'shoulderMove 4s ease-in-out infinite'
          }}
        >
        </div>
      </div>
      
      {/* Braço articulado - Antebraço */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div 
          className="w-1.5 h-8 bg-yellow-400 border border-yellow-500 origin-bottom transition-transform duration-2000"
          style={{
            animation: 'armMove 4s ease-in-out infinite'
          }}
        >
        </div>
      </div>
    </>
  );
};
