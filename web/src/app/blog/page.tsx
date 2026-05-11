"use client";
import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { useAxeonStore } from '../../store/useAxeonStore';
import { FiArrowRight, FiBookOpen } from 'react-icons/fi';
import ClickSpark from '../../components/magic/FlickeringGrid';
import GridBackground from '../../components/magic/GridBackground';
import { useTheme } from 'next-themes';

const BLOG_POSTS = [
  { id: 1, tag: "Architecture", date: "May 10, 2026", title: "Eradicating 20% Revenue Leakage in Telegram Communities", desc: "An in-depth look at how manual management destroys creator revenue and how autonomous state audits solve it." },
  { id: 2, tag: "Web3", date: "April 28, 2026", title: "Why We Chose Solana Over EVM", desc: "Low latency, minimal fees, and native PDA structures make Solana the only viable settlement layer for micro-subscriptions." },
  { id: 3, tag: "Product", date: "April 15, 2026", title: "Introducing the Fiat-to-Crypto Gateway", desc: "Bridging Web2 users seamlessly. How Axeon converts Credit Card payments to USDC instantly." },
];

const springUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 20 } }
};

export default function BlogPage() {
  const [isClient, setIsClient] = useState(false);
  const { lang } = useAxeonStore();
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
        
        <main className="relative z-10 pt-40 pb-32 px-6 max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-20">
            <h1 className="text-5xl md:text-7xl lg:text-[90px] font-black italic uppercase tracking-tighter mb-4 leading-[0.85] text-zinc-900 dark:text-white">
              {lang === 'en' ? 'Insights &' : 'Wawasan &'} <br />
              <span className="text-zinc-400 dark:text-zinc-600">{lang === 'en' ? 'Resources.' : 'Sumber Daya.'}</span>
            </h1>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 italic">Engineering logs and protocol updates.</p>
          </motion.div>
          
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="space-y-6">
            
            {/* FEATURED POST */}
            <motion.div variants={springUp} className="group cursor-pointer p-8 md:p-12 bg-white dark:bg-[#111111] rounded-4xl border border-zinc-200 dark:border-zinc-800 shadow-xl hover:border-zinc-400 dark:hover:border-zinc-600 transition-all flex flex-col md:flex-row gap-10 items-center">
              <div className="w-full md:w-1/2 h-64 md:h-80 bg-zinc-100 dark:bg-[#1a1a1a] rounded-3xl flex items-center justify-center transition-transform group-hover:scale-[0.98] overflow-hidden shadow-inner">
                <FiBookOpen className="size-20 text-zinc-300 dark:text-zinc-800" />
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3 py-1 bg-zinc-100 dark:bg-[#1a1a1a] text-[9px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400 rounded-md border border-zinc-200 dark:border-zinc-800">Featured</span>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">May 11, 2026</span>
                </div>
                <h3 className="font-black italic uppercase tracking-tighter text-4xl md:text-5xl mb-6 text-zinc-900 dark:text-white leading-[0.9]">
                  Zero-Knowledge <br/> Identity Sync.
                </h3>
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 leading-relaxed mb-8">
                  Discover how Axeon Protocol authenticates Telegram identities without exposing personal user data on the Solana public ledger.
                </p>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-white">
                  Read Article <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </motion.div>

            {/* OTHER POSTS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {BLOG_POSTS.map((post) => (
                <motion.div key={post.id} variants={springUp} className="group cursor-pointer p-8 bg-white dark:bg-[#111111] rounded-4xl border border-zinc-200 dark:border-zinc-800 shadow-lg hover:border-zinc-400 dark:hover:border-zinc-600 transition-all flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-2 py-1 bg-zinc-100 dark:bg-[#1a1a1a] text-[8px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400 rounded-md border border-zinc-200 dark:border-zinc-800">{post.tag}</span>
                  </div>
                  <h3 className="font-black italic uppercase tracking-tighter text-2xl mb-4 text-zinc-900 dark:text-white group-hover:text-zinc-500 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 leading-relaxed mb-8 flex-1">
                    {post.desc}
                  </p>
                  <div className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">
                    {post.date}
                  </div>
                </motion.div>
              ))}
            </div>

          </motion.div>
        </main>
      </ClickSpark>
    </div>
  );
}