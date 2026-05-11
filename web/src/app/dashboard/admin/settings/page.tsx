"use client";
import React, { useState, useEffect } from 'react';
import { useAxeonStore } from '../../../../store/useAxeonStore';
import { toast } from 'sonner';

export default function SettingsPage() {
  const [isClient, setIsClient] = useState(false);
  const { lang, walletAddress } = useAxeonStore();

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsClient(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!isClient) return null;

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 max-w-4xl">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic text-zinc-900 dark:text-white mb-2 leading-[0.9]">
          {lang === 'en' ? 'Protocol Settings.' : 'Pengaturan Protokol.'}
        </h1>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
          {lang === 'en' ? 'Configure your creator profile and Telegram integrations.' : 'Konfigurasi profil kreator dan integrasi Telegram Anda.'}
        </p>
      </div>

      <div className="space-y-6">
        {/* --- Profile Settings --- */}
        <div className="bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-zinc-800/80 rounded-4xl shadow-xl p-8 md:p-12">
          <h2 className="text-lg font-black italic uppercase tracking-widest text-zinc-900 dark:text-white mb-8 border-b border-zinc-200 dark:border-zinc-800 pb-4">
            {lang === 'en' ? 'Creator Profile' : 'Profil Kreator'}
          </h2>
          <div className="space-y-6 max-w-xl">
            <div>
              <label htmlFor="walletAddress" className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em] block mb-3 ml-1">Connected Wallet (Payout Address)</label>
              <input id="walletAddress" type="text" disabled value={walletAddress || ''} title="Connected Wallet Address" placeholder="Connect wallet to view address" className="w-full bg-zinc-100 dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-600 text-sm font-bold font-mono rounded-2xl h-14 px-5 cursor-not-allowed" />
            </div>
            <div>
              <label htmlFor="displayName" className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em] block mb-3 ml-1">Display Name</label>
              <input id="displayName" type="text" placeholder={lang === 'en' ? 'Your Brand Name' : 'Nama Merek Anda'} title="Creator Display Name" className="w-full bg-zinc-50 dark:bg-[#111111] border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-sm font-bold rounded-2xl h-14 px-5 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors" />
            </div>
            <button onClick={() => toast.success(lang === 'en' ? 'Profile saved!' : 'Profil disimpan!')} className="h-14 px-8 bg-zinc-900 dark:bg-white text-white dark:text-black font-black text-[10px] uppercase tracking-widest hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all rounded-2xl shadow-lg mt-4 active:scale-95">
              {lang === 'en' ? 'Save Changes' : 'Simpan Perubahan'}
            </button>
          </div>
        </div>

        {/* --- Telegram Sentinel Config --- */}
        <div className="bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-zinc-800/80 rounded-4xl shadow-xl p-8 md:p-12">
          <div className="flex items-center justify-between mb-8 border-b border-zinc-200 dark:border-zinc-800 pb-4">
            <h2 className="text-lg font-black italic uppercase tracking-widest text-zinc-900 dark:text-white">
              {lang === 'en' ? 'Telegram Sentinel Setup' : 'Konfigurasi Telegram Sentinel'}
            </h2>
            <span className="px-3 py-1 bg-zinc-100 dark:bg-[#151515] text-zinc-500 text-[9px] font-black uppercase tracking-widest rounded-lg border border-zinc-200 dark:border-zinc-800">Not Connected</span>
          </div>
          <p className="text-xs font-bold text-zinc-500 mb-8 max-w-2xl leading-relaxed">
            {lang === 'en' 
              ? 'To automate member management, add @AxeonSentinelBot to your Telegram group and promote it to Administrator with "Ban Users" and "Invite via Link" permissions.' 
              : 'Untuk otomatisasi manajemen, tambahkan @AxeonSentinelBot ke grup Telegram Anda dan jadikan Administrator dengan izin "Ban Users" dan "Invite via Link".'}
          </p>
          <div className="max-w-xl">
            <label htmlFor="telegramId" className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em] block mb-3 ml-1">Telegram Group ID</label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input id="telegramId" type="text" placeholder="-100xxxxxxxxx" title="Telegram Group ID" className="flex-1 bg-zinc-50 dark:bg-[#111111] border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-sm font-bold font-mono rounded-2xl h-14 px-5 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors" />
              <button onClick={() => toast.info('Connecting to Sentinel...')} className="h-14 px-8 bg-zinc-900 dark:bg-white text-white dark:text-black font-black text-[10px] uppercase tracking-widest hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all rounded-2xl shadow-lg active:scale-95">
                Connect
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}