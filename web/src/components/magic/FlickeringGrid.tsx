"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Dot { x: number; y: number; delay: number; duration: number; }

export default function FlickeringGrid() {
  const [dots, setDots] = useState<Dot[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const generateDots = () => {
      const newDots = [];
      const rows = 20; // Banyakin baris
      const cols = 35; // Banyakin kolom
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          if (Math.random() > 0.8) { // 20% kemungkinan muncul
            newDots.push({ 
              x: j * 4, 
              y: i * 4, 
              delay: Math.random() * 5,
              duration: 2 + Math.random() * 3
            });
          }
        }
      }
      setDots(newDots);
    };
    
    generateDots();
    
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 size-full pointer-events-none z-0 overflow-hidden">
      <svg width="100%" height="100%" viewBox="0 0 100 60" preserveAspectRatio="xMidYMid slice">
        {dots.map((dot, index) => (
          <motion.circle
            key={index}
            cx={dot.x}
            cy={dot.y}
            r="0.2"
            className="fill-zinc-900 dark:fill-zinc-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: dot.duration,
              delay: dot.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
}