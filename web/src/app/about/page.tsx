"use client";
import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { useAxeonStore } from '../../store/useAxeonStore';
import ClickSpark from '../../components/magic/ClickSpark';
import GridBackground from '../../components/magic/GridBackground';
import { useTheme } from 'next-themes';
import { FiTarget, FiShield, FiZap, FiLayers } from 'react-icons/fi';

const springUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 20 } }
};

const staggerWrap: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function AboutPage() {
  const [isClient, setIsClient] = useState(false);
  const { lang } = useAxeonStore();
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsClient(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0a0a0a] overflow-hidden">
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore: Suppression for React 19 type mismatch in production environments */}
      <ClickSpark 
        sparkColor={resolvedTheme === 'dark' ? '#71717a' : '#a1a1aa'} 
        sparkSize={5} 
        sparkCount={4} 
      />
      
      <GridBackground />
      
      <main className="relative z-10 pt-40 pb-32 px-6 max-w-7xl mx-auto">
        {/* HERO SECTION */}
        <motion.div initial="hidden" animate="visible" variants={staggerWrap} className="text-center mb-24">
          <motion.div variants={springUp} className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white dark:bg-[#111111] border border-zinc-200 dark:border-zinc-800 mb-8 shadow-sm">
            <span className="flex size-2 rounded-full bg-zinc-900 dark:bg-white animate-pulse" />
            <span className="font-black text-[9px] uppercase tracking-widest text-zinc-500">The Axeon Manifesto</span>
          </motion.div>
          
          <motion.h1 variants={springUp} className="text-5xl md:text-7xl lg:text-[100px] font-black italic uppercase tracking-tighter mb-8 leading-[0.85] text-zinc-900 dark:text-white">
            {lang === 'en' ? 'Redefining' : 'Mendefinisikan'} <br /> 
            <span className="text-zinc-400 dark:text-zinc-600">{lang === 'en' ? 'Community Ownership.' : 'Kepemilikan.'}</span>
          </motion.h1>
          
          <motion.p variants={springUp} className="text-sm md:text-base font-bold uppercase tracking-widest text-zinc-500 leading-relaxed max-w-2xl mx-auto italic">
            {lang === 'en' 
              ? 'Axeon is building the underlying financial operating system for the creator economy.' 
              : 'Axeon membangun sistem operasi finansial dasar untuk ekonomi kreator.'}
          </motion.p>
        </motion.div>

        {/* BENTO GRID STORY */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerWrap} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <motion.div variants={springUp} className="p-12 rounded-4xl bg-white dark:bg-[#111111] border border-zinc-200 dark:border-zinc-800 shadow-xl">
            <FiTarget className="size-10 text-zinc-300 dark:text-zinc-700 mb-8" />
            <h3 className="font-black italic uppercase tracking-tighter text-3xl mb-4 text-zinc-900 dark:text-white">The Legacy Problem.</h3>
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 leading-loose">
              Manual verification consumes administrative time and leads to revenue leakage in subscription models.
            </p>
          </motion.div>
          
          <motion.div variants={springUp} className="p-12 rounded-4xl bg-zinc-900 dark:bg-white border border-zinc-800 dark:border-zinc-200 shadow-xl text-white dark:text-black">
            <FiZap className="size-10 text-zinc-700 dark:text-zinc-300 mb-8" />
            <h3 className="font-black italic uppercase tracking-tighter text-3xl mb-4">The Axeon Protocol.</h3>
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-600 leading-loose">
              Automated Telegram access with zero-knowledge verification ensuring zero custody over user assets.
            </p>
          </motion.div>
        </motion.div>

        {/* CORE VALUES */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerWrap} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div variants={springUp} className="col-span-1 md:col-span-2 p-10 rounded-4xl bg-white dark:bg-[#111111] border border-zinc-200 dark:border-zinc-800 shadow-lg flex items-center gap-8 overflow-hidden relative">
            <div className="relative z-10 w-2/3">
              <h4 className="font-black italic uppercase tracking-widest text-xl mb-3 text-zinc-900 dark:text-white">Shielded Settlement</h4>
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 leading-relaxed">
                Cryptographic privacy ensuring subscriber identities remain obfuscated on the public ledger.
              </p>
            </div>
            <FiShield className="absolute -right-10 -bottom-10 size-64 text-zinc-100 dark:text-zinc-900/50" />
          </motion.div>

          <motion.div variants={springUp} className="col-span-1 p-10 rounded-4xl bg-white dark:bg-[#111111] border border-zinc-200 dark:border-zinc-800 shadow-lg relative overflow-hidden">
            <h4 className="font-black italic uppercase tracking-widest text-xl mb-3 text-zinc-900 dark:text-white relative z-10">Stateless</h4>
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 leading-relaxed relative z-10">
              No backend dependencies for decentralized routing.
            </p>
            <FiLayers className="absolute -right-5 -bottom-5 size-32 text-zinc-100 dark:text-zinc-900/50" />
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}