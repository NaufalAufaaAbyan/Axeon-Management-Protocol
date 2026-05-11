"use client";
import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import ClickSpark from '../../components/magic/FlickeringGrid';
import GridBackground from '../../components/magic/GridBackground';
import { useTheme } from 'next-themes';

const CHANGELOG_DATA = [
  {
    version: "v1.0.0 - Mainnet Alpha",
    date: "May 2026",
    status: "Latest",
    changes: [
      "Deployed core zero-custody Anchor smart contracts on Solana Devnet.",
      "Implemented Flat 5% Protocol Fee architecture without upfront costs.",
      "Integrated Shielded Settlement workflow for enhanced privacy.",
      "Launched Axeon Sentinel (Telegram Bot) with 60-second autonomous polling."
    ]
  },
  {
    version: "v0.9.0 - Gateway Expansion",
    date: "April 2026",
    status: "Stable",
    changes: [
      "Added support for Fiat-to-Crypto On-Ramp via Stripe API integration.",
      "Optimized Smart Contract instructions to reduce compute unit consumption by 30%.",
      "Redesigned Subscriber Portal with Enterprise Monochrome Aesthetics."
    ]
  }
];

const springUp: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 80, damping: 20 } }
};

export default function ChangelogPage() {
  const [isClient, setIsClient] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsClient(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0a0a0a] overflow-hidden">
      <ClickSpark sparkColor={resolvedTheme === 'dark' ? '#71717a' : '#a1a1aa'} sparkSize={5} sparkRadius={12} sparkCount={4}>
        <GridBackground />
        
        <main className="relative z-10 pt-40 pb-32 px-6 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-24">
            <h1 className="text-5xl md:text-7xl lg:text-[90px] font-black italic uppercase tracking-tighter mb-4 leading-[0.85] text-zinc-900 dark:text-white">
              Changelog.
            </h1>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 italic">Record of technical updates and protocol improvements.</p>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.2 } } }} className="space-y-16">
            {CHANGELOG_DATA.map((log, index) => (
              <motion.div key={index} variants={springUp} className="relative pl-10 md:pl-16 border-l-2 border-zinc-200 dark:border-zinc-800">
                {/* FIX: Changed -left-[9px] to -left-2.25 */}
                <div className={`absolute top-1 -left-2.25 size-4 rounded-full border-4 border-[#f8f9fa] dark:border-[#0a0a0a] ${log.status === 'Latest' ? 'bg-zinc-900 dark:bg-white shadow-[0_0_10px_rgba(255,255,255,0.3)]' : 'bg-zinc-300 dark:bg-zinc-700'}`} />
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">{log.date}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-zinc-900 dark:text-white mb-6">{log.version}</h3>
                <ul className="space-y-4 text-[11px] font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {log.changes.map((change, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="mt-1.5 size-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 shrink-0" />
                      {change}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </main>
      </ClickSpark>
    </div>
  );
}