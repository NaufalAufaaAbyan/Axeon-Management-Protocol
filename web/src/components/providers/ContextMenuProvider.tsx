"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContextMenuProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    setPosition({ x: e.pageX, y: e.pageY });
    setVisible(true);
  };

  const handleClick = () => setVisible(false);

  useEffect(() => {
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1, x: position.x, y: position.y }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
            className="fixed z-100 w-48 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-2 top-0 left-0"
          >
            <div className="px-3 py-2 border-b border-zinc-200 dark:border-zinc-800 mb-1">
               <p className="text-[8px] font-black uppercase tracking-widest text-zinc-400 italic">Axeon Protocol</p>
            </div>
            <button type="button" className="w-full text-left px-3 py-2 text-[10px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">Refresh Node</button>
            <button type="button" className="w-full text-left px-3 py-2 text-[10px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors" onClick={() => window.location.reload()}>Sync State</button>
            <div className="mt-1 pt-1 border-t border-zinc-200 dark:border-zinc-800">
               <p className="px-3 py-1 text-[7px] font-bold text-zinc-400">FRONT-END v1.0.0 (STABLE)</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}