import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GardenBed {
  isTransitioning: boolean;
}

const GardenBed: React.FC<GardenBed> = ({ isTransitioning }) => {
  const sharedAnimation = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20, transition: { duration: 0.3 } }
  };


  return (
    <AnimatePresence mode="popLayout">
      {!isTransitioning && (
        <motion.div
          key="garden-bed-decor"
          variants={sharedAnimation}
          className="absolute -bottom-[2.5vmin] -left-[50%] -right-[50%] flex flex-col items-center pointer-events-none"
        >
          {/* grace*/}
          <div className="w-full h-[20vmin] translate-y-[5px]">
            <div className="w-[100%] h-full border-t-4 border-x-4 border-black bg-[#4ba11b] hand-drawn-border-sm opacity-90" />
          </div>
          
          {/* stone */}
          <div className="absolute left-[10%] bottom-[1vmin] w-[30%] h-[15vmin]">
              <div className="w-full h-full border-t-4 border-x-4 border-black bg-[#6b6d6d] rotate-[20deg] rounded-[50%_30%_100%_30%/100%_70%_100%_30%]" />
          </div>

          <div className="absolute left-[18%] bottom-[1vmin] w-[20%] h-[10vmin]">
              <div className="w-full h-full border-t-4 border-x-4 border-black bg-[#848585] rotate-[20deg] rounded-[80%_30%_100%_50%/80%_70%_70%_50%]" />
          </div>

          {/* floor */}
          <div className="w-full flex justify-around items-center">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-[19%] h-[5vmin] border-t-4 border-x-4 bg-[#a6564f] border-black hand-drawn-border-sm rotate-[-2deg]"
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default GardenBed;