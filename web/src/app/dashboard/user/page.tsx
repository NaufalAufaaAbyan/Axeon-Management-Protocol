"use client";
import React, { useState, useEffect } from 'react';
import { useAxeonStore } from '../../../store/useAxeonStore';
import { dict } from '../../../lib/dictionary';
import Link from 'next/link';
import { motion } from 'framer-motion';
// FIX: Hapus FiArrowRight yang tidak terpakai
import { FiBox } from 'react-icons/fi';

// FIX: Tambahkan interface untuk menghindari 'any'
interface UserSubscription {
  id: string;
  name: string;
  status: string;
}

export default function UserDashboardPage() {
  const { walletAddress, lang } = useAxeonStore();
  const [isClient, setIsClient] = useState(false);
  
  const t = dict[lang as keyof typeof dict];

  useEffect(() => {
    const timer = setTimeout(() => setIsClient(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const trimAddress = (addr: string | null) => {
    if (!addr) return t.sideUnknownUser;
    if (addr.startsWith('Email_') || addr.startsWith('Google_') || addr.startsWith('TG_')) {
        return addr.replace(/_/g, ' ');
    }
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  // FIX: Gunakan interface, bukan 'any'
  const activeSubscriptions: UserSubscription[] = [];

  if (!isClient) return null;

  return (
    <div className="w-full flex flex-col gap-10">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-200 dark:border-zinc-800 pb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic text-zinc-900 dark:text-white mb-2 leading-[0.9]">
            {t.userTitle}
          </h1>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
            {t.userConnAs} <span className="text-zinc-900 dark:text-zinc-300">{trimAddress(walletAddress)}</span>
          </div>
        </div>
        <Link href="/dashboard/user/explore" className="h-14 px-8 bg-zinc-900 dark:bg-white text-white dark:text-black font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all rounded-2xl shadow-xl flex items-center justify-center gap-3">
          <FiBox size={16} /> {t.btnDiscover}
        </Link>
      </motion.div>

      <div className="min-h-100 flex flex-col">
        {activeSubscriptions.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center p-12 text-center glass-panel rounded-4xl bg-white/40 dark:bg-[#111111]/40 border border-zinc-200 dark:border-zinc-800 relative overflow-hidden"
          >
            {/* FIX: border-[20px] diubah ke border-20 sesuai saran Tailwind v4 */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] border-20 border-dashed border-zinc-500 dark:border-white pointer-events-none"></div>
            
            <div className="relative z-10 size-20 bg-white dark:bg-[#151515] rounded-full flex items-center justify-center mb-8 shadow-inner ring-1 ring-zinc-200 dark:ring-zinc-800">
              <svg className="size-10 text-zinc-300 dark:text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
            </div>
            <h3 className="relative z-10 text-2xl font-black italic uppercase tracking-tighter text-zinc-900 dark:text-white mb-3">{t.noPasses}</h3>
            <p className="relative z-10 text-[10px] font-bold uppercase tracking-widest text-zinc-500 max-w-sm mb-10 leading-relaxed">{t.noPassesDesc}</p>
            <Link href="/" className="relative z-10 h-14 px-10 bg-zinc-900 dark:bg-white text-white dark:text-black font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-xl active:scale-95 transition-transform flex items-center justify-center">
              {t.btnHome}
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Real Data Map */}
          </div>
        )}
      </div>
    </div>
  );
}