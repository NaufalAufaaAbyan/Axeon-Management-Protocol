"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAxeonStore } from '../../../../store/useAxeonStore';
import { FiUsers, FiSearch, FiFilter, FiDownload, FiCpu } from 'react-icons/fi';

// FIX: Bikin Interface biar TypeScript gak teriak 'any'
interface SubscriberData {
  id: string;
  walletAddress: string;
  telegramId?: string;
  status: 'active' | 'expired';
  joinedAt: string;
}

export default function SubscribersPage() {
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { lang } = useAxeonStore();

  // FIX: Terapkan interface ke array kosongnya
  const subscribers: SubscriberData[] = []; 

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClient(true);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (!isClient) return null;

  return (
    <div className="w-full flex flex-col gap-8 font-sans">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic text-white mb-2 leading-[0.9]">
            {lang === 'en' ? 'Subscribers.' : 'Pelanggan.'}
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
            Manage your community members and their on-chain access.
          </p>
        </div>
        <button title="Export List" className="h-12 px-6 rounded-xl bg-black border border-white/10 text-[9px] font-black uppercase tracking-widest text-white hover:bg-zinc-900 transition-all flex items-center gap-2">
          <FiDownload size={12} /> Export List
        </button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
          <input type="text" placeholder="Search by Wallet or TG handle..." title="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full h-14 pl-12 pr-4 bg-[#050505] border border-white/10 text-sm font-bold text-white rounded-xl focus:outline-none focus:border-blue-500 transition-colors shadow-inner" />
        </div>
        <button title="Filter Status" className="h-14 px-6 rounded-xl bg-[#050505] border border-white/10 text-[10px] font-black uppercase tracking-widest text-white hover:bg-zinc-900 flex items-center justify-center gap-2 transition-colors">
          <FiFilter size={14} /> Filter Status
        </button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#0a0a0a]/50 backdrop-blur-xl border border-white/5 rounded-3xl shadow-2xl overflow-hidden min-h-100 flex flex-col">
        {isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center py-20">
            <FiCpu className="size-8 text-zinc-600 animate-spin mb-4" />
            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Syncing Ledger Data...</p>
          </div>
        ) : subscribers.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
            <div className="size-20 bg-[#050505] rounded-full flex items-center justify-center mb-8 border border-white/5 shadow-inner">
              <FiUsers className="size-8 text-zinc-600" />
            </div>
            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-3">No Subscribers Yet</h3>
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 max-w-sm leading-relaxed">
              Once you deploy a vault and share your checkout link, your subscribers will appear here.
            </p>
          </div>
        ) : null}
      </motion.div>
    </div>
  );
}