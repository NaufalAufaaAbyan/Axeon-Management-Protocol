"use client";
import React, { useState, useEffect } from 'react';
import { useAxeonStore } from '../../../../store/useAxeonStore';
import { motion } from 'framer-motion';
import { FiCompass, FiCpu, FiGlobe } from 'react-icons/fi';

export default function ExplorePage() {
  const [isClient, setIsClient] = useState(false);
  const { lang } = useAxeonStore();

  useEffect(() => {
    const timer = setTimeout(() => setIsClient(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!isClient) return null;

  return (
    <div className="w-full flex flex-col gap-10">
      
      {/* --- HEADER --- */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="border-b border-zinc-200 dark:border-zinc-800 pb-8 text-left"
      >
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic text-zinc-900 dark:text-white mb-3 leading-[0.9]">
          {lang === 'en' ? 'Discovery.' : 'Penjelajahan.'}
        </h1>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
          {lang === 'en' 
            ? 'Discover and subscribe to top-tier premium communities.' 
            : 'Temukan dan berlangganan ke grup premium terbaik.'}
        </p>
      </motion.div>

      {/* --- EMPTY STATE / AWAITING DATA --- */}
      <div className="flex-1 flex flex-col items-center justify-center p-12 text-center py-32">
        <motion.div 
          animate={{ 
            rotate: [0, 360],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="size-24 bg-white/40 dark:bg-[#111111]/40 backdrop-blur-xl rounded-full flex items-center justify-center mb-8 shadow-inner ring-1 ring-zinc-200 dark:ring-zinc-800 relative"
        >
          <FiCompass className="size-10 text-zinc-400 dark:text-zinc-600" />
          <div className="absolute inset-0 rounded-full border border-dashed border-zinc-300 dark:border-zinc-700 animate-[spin_20s_linear_infinite]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl font-black italic uppercase tracking-tighter text-zinc-900 dark:text-white mb-3">
            {lang === 'en' ? 'Scanning Open Network' : 'Memindai Jaringan Terbuka'}
          </h3>
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 max-w-sm leading-relaxed mb-10">
            {lang === 'en' 
              ? 'The decentralized explorer is awaiting for the first on-chain vault deployment. No public communities detected yet.' 
              : 'Explorer terdesentralisasi sedang menunggu deployment brankas pertama. Belum ada komunitas publik yang terdeteksi.'}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
             <div className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
                <FiCpu className="text-zinc-400 size-3" />
                <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500">Sentinel: Online</span>
             </div>
             <div className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
                <FiGlobe className="text-zinc-400 size-3" />
                <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500">RPC: Devnet</span>
             </div>
          </div>
        </motion.div>
      </div>

    </div>
  );
}