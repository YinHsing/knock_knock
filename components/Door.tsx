
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InteractionStep } from '../types';
import { getImagePath } from '../constants';

interface DoorProps {
  step: InteractionStep;
  onClick: () => void;
  revealImage?: string;
  revealType?: 'real' | 'decoy' | 'unrecognized';
  isShutterForceClosed?: boolean;
}

const Door: React.FC<DoorProps> = ({ step, onClick, revealImage, revealType, isShutterForceClosed }) => {
  const isIdle = step === InteractionStep.IDLE;
  const isKnocking = step === InteractionStep.KNOCKING;
  const isOpening = [InteractionStep.SUCCESS, InteractionStep.SHOWCASE].includes(step);
  const isZooming = step === InteractionStep.SHOWCASE;
  
  const isWindowOpen = !isShutterForceClosed && [
    InteractionStep.GAME, 
    InteractionStep.CONFIRMING_UNSURE, 
    InteractionStep.UNRECOGNIZED,
    InteractionStep.SUCCESS, 
    InteractionStep.SHOWCASE
  ].includes(step);

  return (
    <motion.div 
      className={`relative perspective-1000 flex items-center justify-center ${isZooming ? 'z-[200]' : 'z-10'}`}
      style={{ 
        width: 'min(50vmin, 260px)', 
        height: 'min(75vmin, 400px)',
        aspectRatio: '2 / 3'
      }}
      animate={isZooming ? { scale: 15, opacity: [1, 1, 0] } : { scale: 1, opacity: 1 }}
      transition={isZooming ? { duration: 1.8, ease: "circIn" } : { duration: 0.5 }}
    >
      {isIdle && (
        <motion.div animate={{ y: [0, -5, 0], opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 2, repeat: Infinity }} className="absolute -top-[6vmin] text-[4vmin] sm:text-2xl font-black italic text-black/60 tracking-wider">
          TAP! TAP!
        </motion.div>
      )}

      {/* Outer frame */}
      <div className="absolute inset-0 border-[0.8vmin] border-black hand-drawn-border bg-black/5" />
      
      {/* Interior light area */}
      <div className="absolute inset-[0.8vmin] bg-black flex items-center justify-center overflow-hidden hand-drawn-border">
        {(isOpening || isZooming) && (
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="text-white text-center p-4 z-10">
            <p className="text-[6vmin] sm:text-4xl font-black italic mb-2 uppercase">HI!</p>
            <div className="w-[8vmin] h-[0.5vmin] bg-white mx-auto hand-drawn-border" />
          </motion.div>
        )}
      </div>

      <motion.div
        className="relative w-full h-full cursor-pointer origin-left z-20"
        onClick={onClick}
        animate={
          isOpening || isZooming
            ? { rotateY: -110, x: 20 } 
            : isKnocking 
              ? { x: [-10, 10, -8, 8, -4, 4, 0], rotateZ: [-2, 2, -1, 1, 0], scale: 0.97 }
              : isIdle ? { scale: [1, 1.01, 1] } : { scale: 1 }
        }
        transition={
          isOpening || isZooming ? { duration: 1.5, ease: "easeInOut" } : isIdle ? { duration: 3, repeat: Infinity } : { duration: 0.3 }
        }
      >
        <div className="w-full h-full bg-[#E53E3E] border-[0.8vmin] border-black hand-drawn-border overflow-hidden shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative">
          
          {/* Shutter Window */}
          <div className="absolute top-[12%] left-1/2 -translate-x-1/2 w-[55%] h-[28%] border-[0.5vmin] border-black bg-white/10 hand-drawn-border-sm overflow-hidden z-30 flex items-center justify-center">
             <AnimatePresence mode='wait'>
                {(step !== InteractionStep.IDLE && step !== InteractionStep.KNOCKING) && (
                   <motion.img 
                      key={revealImage || 'placeholder'}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      src={getImagePath(revealImage || '?', revealType || 'unrecognized')} 
                      className="w-full h-full object-contain grayscale contrast-125 p-1"
                      onError={(e) => { (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${revealImage}`; }}
                   />
                )}
             </AnimatePresence>
             
             {/* Shutter Plate */}
             <motion.div 
               initial={{ x: 0 }}
               animate={isWindowOpen ? { x: "-100%" } : { x: 0 }}
               transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
               className="absolute inset-0 bg-[#C53030] border-r-[0.3vmin] border-black flex items-center justify-center z-40"
             >
                <div className="w-[10%] h-[40%] bg-black/30 rounded-full" />
             </motion.div>
          </div>
          
          {/* Knob */}
          <div className="absolute right-[12%] top-1/2 -translate-y-1/2 w-[18%] aspect-square rounded-full border-[0.6vmin] border-black bg-yellow-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
            <div className="w-[20%] h-[20%] bg-black/20 rounded-full" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Door;
