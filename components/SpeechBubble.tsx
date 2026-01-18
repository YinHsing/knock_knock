
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SpeechBubbleProps {
  text: string;
  isVisible: boolean;
}

const SpeechBubble: React.FC<SpeechBubbleProps> = ({ text, isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="relative z-[150] w-[45vmin] max-w-[280px] min-w-[180px]"
        >
          <div className="relative bg-white border-[0.6vmin] border-black p-[3vmin] sm:p-5 hand-drawn-border-sm shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-[5.5vmin] sm:text-2xl text-center font-black text-black leading-tight uppercase italic tracking-tighter">
              {text}
            </p>
            <div 
              className="absolute portrait:-bottom-[3vmin] portrait:right-[5vmin] 
              landscape:bottom-1/2 landscape:-left-[4vmin] landscape:translate-y-1/2
              w-0 h-0 
              border-l-[1.5vmin] border-l-transparent 
              border-r-[3vmin] border-r-transparent 
              border-t-[4vmin] border-t-black transform 
              portrait:rotate-[-10deg] landscape:rotate-[90deg]"
            >
              <div className="absolute -top-[4.5vmin] -left-[1.2vmin] w-0 h-0 
                border-l-[1.2vmin] border-l-transparent 
                border-r-[2.5vmin] border-r-transparent 
                border-t-[3.5vmin] border-t-white" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SpeechBubble;
