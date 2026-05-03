"use client";
import React, { useState, useEffect } from 'react';
import { useAxeonStore } from '../../../store/useAxeonStore';
import { dict } from '../../../lib/dictionary';
// FIX: Hapus import { toast } dari sonner karena tidak dipakai
import Link from 'next/link';

export default function UserDashboardPage() {
  const { walletAddress, lang } = useAxeonStore();
  const [isClient, setIsClient] = useState(false);
  
  const t = dict[lang];

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsClient(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const trimAddress = (addr: string | null) => {
    if (!addr) return t.sideUnknownUser;
    if (addr.startsWith('Email_') || addr.startsWith('Google_')) return addr.replace(/_/g, ' ');
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  type Sub = { id: string; vaultName: string; platform: string; price: number; currency: string; expiry: string; status: string; link: string; fiatEnabled: boolean; };
  const activeSubscriptions: Sub[] = [];

  if (!isClient) return null;

  return (
    <div className="pt-16 pb-12 animate-in fade-in zoom-in-95 duration-500">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-1">{t.userTitle}</h1>
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
            {t.userConnAs} <span className="font-bold text-zinc-700 dark:text-zinc-300">{trimAddress(walletAddress)}</span>
          </div>
        </div>
        <Link href="/dashboard/user/explore" className="px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold text-xs uppercase tracking-widest hover:bg-blue-600 dark:hover:bg-[#00ffcc] transition-colors rounded-xl shadow-lg flex items-center justify-center gap-2">
          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          {t.btnDiscover}
        </Link>
      </div>

      <div className="mb-8">
        <h2 className="font-bold text-lg text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-white/10 pb-4">{t.userPasses}</h2>
      </div>

      {activeSubscriptions.length === 0 ? (
        <div className="relative p-12 border-2 border-dashed border-zinc-200 dark:border-white/10 rounded-3xl flex flex-col items-center justify-center text-center bg-white/50 dark:bg-white/5 backdrop-blur-md min-h-75 overflow-hidden">
           {/* FIX: border-[20px] diubah jadi border-20 */}
           <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] border-20 border-dashed border-zinc-500/10 dark:border-white/5"></div>
           
          <div className="relative z-10 size-20 bg-linear-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 rounded-full flex items-center justify-center mb-6 shadow-inner ring-1 ring-white/10">
            <svg className="size-10 text-zinc-400 dark:text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
          </div>
          <h3 className="relative z-10 text-xl font-bold text-zinc-900 dark:text-white mb-2">{t.noPasses}</h3>
          <p className="relative z-10 text-sm text-zinc-500 max-w-md mb-8 leading-relaxed">{t.noPassesDesc}</p>
          <Link href="/" className="relative z-10 px-8 py-3 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold text-xs uppercase tracking-widest hover:bg-blue-600 dark:hover:bg-[#00ffcc] transition-all rounded-xl shadow-lg hover:shadow-blue-500/25">
            {t.btnHome}
          </Link>
        </div>
      ) : null}

    </div>
  );
}