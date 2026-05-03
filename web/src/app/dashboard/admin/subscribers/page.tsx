"use client";
import React, { useState, useEffect } from 'react';
import { useAxeonStore } from '../../../../store/useAxeonStore';

export default function SubscribersPage() {
  const [isClient, setIsClient] = useState(false);
  const { lang } = useAxeonStore();

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsClient(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!isClient) return null;

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2">
            {lang === 'en' ? 'Subscribers' : 'Pelanggan'}
          </h1>
          <p className="text-sm text-zinc-500">
            {lang === 'en' ? 'Manage your community members and their on-chain access.' : 'Kelola anggota komunitas dan akses on-chain mereka.'}
          </p>
        </div>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder={lang === 'en' ? 'Search wallet or TG handle...' : 'Cari dompet atau TG handle...'} 
            className="h-10 px-4 bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:border-blue-500 dark:focus:border-[#00ffcc] w-64 transition-colors text-zinc-900 dark:text-white"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-white/5 backdrop-blur-xl border border-zinc-200 dark:border-white/10 rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-75">
         <div className="flex-1 flex flex-col items-center justify-center p-12 text-center relative overflow-hidden">
            {/* FIX: border-[20px] diubah jadi border-20 */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] border-20 border-dashed border-zinc-500/10 dark:border-white/5"></div>
            
            <div className="relative z-10 size-20 bg-linear-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 rounded-full flex items-center justify-center mb-6 shadow-inner ring-1 ring-white/10">
              <svg className="size-10 text-zinc-400 dark:text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            </div>
            <h3 className="relative z-10 text-xl font-bold text-zinc-900 dark:text-white mb-2">
              {lang === 'en' ? 'No Subscribers Yet' : 'Belum Ada Pelanggan'}
            </h3>
            <p className="relative z-10 text-sm text-zinc-500 max-w-md leading-relaxed">
              {lang === 'en' 
                ? 'Once you deploy a vault and share your checkout link, your subscribers will appear here.' 
                : 'Setelah Anda deploy brankas dan membagikan tautan, pelanggan Anda akan muncul di sini.'}
            </p>
          </div>
      </div>
    </div>
  );
}