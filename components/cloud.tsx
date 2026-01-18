import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CloudProps {
  hasStarted: boolean;
}

const CLOUDS_CONFIG = [
  { id: 'cloud-top-right', containerClass: 'top-[20%] right-[40%]'},
];

const Cloud: React.FC<CloudProps> = ({ hasStarted }) => {
  const slideAnimation = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 30 },
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
  };

  return (
    <AnimatePresence mode="popLayout">
      {!hasStarted && CLOUDS_CONFIG.map((cloud) => (
        <motion.div
          key={cloud.id}
          {...slideAnimation}
          className={`absolute ${cloud.containerClass} pointer-events-none`}
        >
          <motion.div
            animate={{ x: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="relative"
          >
            <div className="absolute -top-10 left-10 w-16 h-16 bg-white border-t-4 border-x-4 border-black rounded-[100%_100%_100%_100%/100%_100%_80%_80%]" />
            <div className="absolute -top-6 left-2 w-12 h-12 bg-white border-t-4 border-l-4 border-black rounded-[100%_70%_100%_80%/100%_70%_100%_80%] rotate-[-20deg]" />
            <div className="absolute -top-5 left-20 w-10 h-10 bg-white border-t-4 border-r-4 border-black rounded-[100%_70%_100%_30%/100%_70%_100%_70%] rotate-[20deg]" />
          </motion.div>
        </motion.div>
      ))}
    </AnimatePresence>
  );
};

export default Cloud;