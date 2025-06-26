
import React from 'react';
import { RobotBase } from './RobotBase';
import { RobotBody } from './RobotBody';

export const Robot = () => {
  return (
    <>
      <RobotBase />
      <RobotBody />
      
      {/* --- INÍCIO DA HIERARQUIA CORRETA --- */}

      {/* 1. Ombro: A base do braço, que gira */}
      <div 
        className="absolute bottom-8 left-1/2"
        style={{
          transformOrigin: 'bottom center',
          animation: 'shoulder-rotate 4s ease-in-out infinite'
        }}
      >
        <div className="relative w-2 h-6 bg-yellow-500 border border-yellow-600">
          
          {/* 2. Antebraço: É "filho" do ombro e tem sua própria rotação */}
          <div 
            className="absolute top-0 left-[-2.5px]"
            style={{
              transformOrigin: 'top center',
              animation: 'forearm-rotate 4s ease-in-out infinite'
            }}
          >
            <div className="relative w-1.5 h-8 bg-yellow-400 border border-yellow-500">

              {/* 3. Garra: É "filha" do antebraço. Sua posição é consequência dos pais */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-[-4px]">
                <div className="relative">
                  {/* Centro */}
                  <div className="w-3 h-2 bg-gray-600 rounded border border-gray-700"></div>
                  {/* Garras que abrem e fecham */}
                  <div 
                    className="absolute -left-1 top-0 w-1 h-2 bg-gray-500 rounded-l border-gray-600"
                    style={{ 
                      transformOrigin: 'right center',
                      animation: 'grab-action 4s ease-in-out infinite'
                    }}
                  ></div>
                  <div 
                    className="absolute -right-1 top-0 w-1 h-2 bg-gray-500 rounded-r border-gray-600"
                    style={{
                      transformOrigin: 'left center',
                      animation: 'grab-action 4s ease-in-out infinite'
                    }}
                  ></div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      {/* --- FIM DA HIERARQUIA --- */}
    </>
  );
};
