"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAxeonStore } from '../../../../store/useAxeonStore';
// FIX: Hapus 'dict' jika 't' tidak dipakai di UI sekarang
import { FiUsers, FiSearch, FiFilter, FiDownload, FiCpu } from 'react-icons/fi';

export default function SubscribersPage() {
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { lang } = useAxeonStore();

  // FIX: Hapus variabel 't' dan 'setSubscribers' yang tidak digunakan
  const subscribers = []; 

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClient(true);
      setIsLoading(false);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!isClient) return null;

  return (
    <div className="w-full flex flex-col gap-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-200 dark:border-zinc-800 pb-8"
      >
        <div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic text-zinc-900 dark:text-white mb-2 leading-[0.9]">
            {lang === 'en' ? 'Subscribers.' : 'Pelanggan.'}
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
            {lang === 'en' 
              ? 'Manage your community members and their on-chain access.' 
              : 'Kelola anggota komunitas dan akses on-chain mereka.'}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="h-12 px-6 rounded-xl bg-white/50 dark:bg-[#111111]/50 border border-zinc-200 dark:border-zinc-800 text-[9px] font-black uppercase tracking-widest text-zinc-900 dark:text-white hover:bg-white dark:hover:bg-zinc-900 transition-all flex items-center gap-2 backdrop-blur-md">
            <FiDownload size={12} /> {lang === 'en' ? 'Export List' : 'Ekspor Data'}
          </button>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
          <input 
            type="text" 
            placeholder={lang === 'en' ? 'Search by Wallet or TG handle...' : 'Cari dompet atau TG handle...'} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-14 pl-12 pr-4 bg-white/60 dark:bg-[#111111]/80 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 text-sm font-bold text-zinc-900 dark:text-white rounded-2xl focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors shadow-sm"
          />
        </div>
        <button className="h-14 px-6 rounded-2xl bg-white/60 dark:bg-[#111111]/80 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 flex items-center justify-center gap-2 transition-colors">
          <FiFilter size={14} /> Filter Status
        </button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white/60 dark:bg-[#111111]/80 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-4xl shadow-sm overflow-hidden min-h-100 flex flex-col">
        {isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center py-20">
            <FiCpu className="size-8 text-zinc-400 animate-spin mb-4" />
            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Syncing Matrix Data...</p>
          </div>
        ) : subscribers.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center relative overflow-hidden">
            <div className="relative z-10 size-24 bg-white dark:bg-[#151515] rounded-full flex items-center justify-center mb-8 shadow-inner ring-1 ring-zinc-200 dark:border-zinc-800">
              <FiUsers className="size-10 text-zinc-300 dark:text-zinc-600" />
            </div>
            <h3 className="relative z-10 text-2xl font-black italic uppercase tracking-tighter text-zinc-900 dark:text-white mb-3">
              {lang === 'en' ? 'No Subscribers Yet' : 'Belum Ada Pelanggan'}
            </h3>
            <p className="relative z-10 text-[10px] font-bold uppercase tracking-widest text-zinc-500 max-w-sm leading-relaxed">
              {lang === 'en' 
                ? 'Once you deploy a vault and share your checkout link, your subscribers will appear here.' 
                : 'Setelah Anda deploy brankas dan membagikan tautan, pelanggan Anda akan muncul di sini.'}
            </p>
          </div>
        ) : null}
      </motion.div>
    </div>
  );
}