
import React from 'react';

export const WorkParticles = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div 
        className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-60"
        style={{
          top: '35%',
          left: '65%',
          animation: 'workParticle 4s ease-in-out infinite',
          animationDelay: '1.5s'
        }}
      ></div>
      <div 
        className="absolute w-0.5 h-0.5 bg-orange-400 rounded-full opacity-80"
        style={{
          top: '55%',
          left: '70%',
          animation: 'workParticle 4s ease-in-out infinite',
          animationDelay: '2.8s'
        }}
      ></div>
      <div 
        className="absolute w-0.5 h-0.5 bg-yellow-300 rounded-full opacity-70"
        style={{
          top: '45%',
          left: '75%',
          animation: 'workParticle 4s ease-in-out infinite',
          animationDelay: '0.8s'
        }}
      ></div>
    </div>
  );
};
