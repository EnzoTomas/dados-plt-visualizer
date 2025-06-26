
import React from 'react';

export const RobotAnimations = () => {
  return (
    <style>{`
      /* Animação da junta do OMBRO */
      @keyframes shoulder-rotate {
        0%, 100% { transform: rotate(20deg); }
        30% { transform: rotate(-35deg); } /* Posição para pegar a caixa */
        70% { transform: rotate(45deg); }  /* Posição para largar no pallet */
      }
      
      /* Animação da junta do ANTEBRAÇO */
      @keyframes forearm-rotate {
        0%, 100% { transform: rotate(-30deg); }
        30% { transform: rotate(45deg); } /* Posição para pegar a caixa */
        70% { transform: rotate(-20deg); } /* Posição para largar no pallet */
      }

      /* Animação de ABRIR/FECHAR da garra */
      @keyframes grab-action {
        0%, 25% { transform: scaleX(1); }    /* Aberta */
        30%, 65% { transform: scaleX(0.6); } /* Fechada (segurando a caixa) */
        70%, 100% { transform: scaleX(1); }  /* Aberta (soltou a caixa) */
      }

      /* Animação do caminho absoluto da CAIXA */
      @keyframes box-path {
        /* Caixa fica parada esperando ser pega */
        0%, 29% {
          transform: translateX(0px) translateY(0px);
          opacity: 1;
        }
        
        /* Caixa é "pega" e começa a se mover */
        30% {
          transform: translateX(0px) translateY(0px);
          opacity: 1;
        }

        /* Caixa se move para o pallet */
        70% {
          transform: translateX(62px) translateY(55px);
          opacity: 1;
        }

        /* Caixa fica no pallet, invisível, esperando o loop reiniciar */
        71%, 100% {
          transform: translateX(62px) translateY(55px);
          opacity: 0;
        }
      }
      
      @keyframes workParticle {
        0%, 100% {
          transform: translateY(0) scale(0);
          opacity: 0;
        }
        40% {
          transform: translateY(-10px) scale(1);
          opacity: 1;
        }
        80% {
          transform: translateY(-15px) scale(0.8);
          opacity: 0.6;
        }
      }
    `}</style>
  );
};
