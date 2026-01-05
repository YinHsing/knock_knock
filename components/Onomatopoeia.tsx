
import React from 'react';
import { motion } from 'framer-motion';

interface OnomatopoeiaProps {
  text: string;
  onComplete: () => void;
}

const Onomatopoeia: React.FC<OnomatopoeiaProps> = ({ text, onComplete }) => {
  // 產生隨機位置與旋轉
  const randomX = Math.random() * 200 - 100;
  const randomY = Math.random() * 200 - 150;
  const randomRotate = Math.random() * 40 - 20;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, x: 0, y: 0, rotate: 0 }}
      animate={{ 
        opacity: [0, 1, 1, 0], 
        scale: [0.5, 1.2, 1.1, 0.8],
        x: randomX,
        y: randomY,
        rotate: randomRotate
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onAnimationComplete={onComplete}
      className="absolute pointer-events-none z-50"
    >
      <span className="text-5xl md:text-6xl font-black text-black select-none drop-shadow-[4px_4px_0px_rgba(255,255,255,1)]" 
            style={{ fontFamily: "'Gloria Hallelujah', cursive", WebkitTextStroke: '2px white' }}>
        {text}
      </span>
    </motion.div>
  );
};

export default Onomatopoeia;
