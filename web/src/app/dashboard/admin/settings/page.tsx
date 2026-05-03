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
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2">
          {lang === 'en' ? 'Protocol Settings' : 'Pengaturan Protokol'}
        </h1>
        <p className="text-sm text-zinc-500">
          {lang === 'en' ? 'Configure your creator profile and Telegram integrations.' : 'Konfigurasi profil kreator dan integrasi Telegram Anda.'}
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile Settings */}
        <div className="bg-white dark:bg-white/5 backdrop-blur-xl border border-zinc-200 dark:border-white/10 rounded-2xl shadow-sm p-6 md:p-8">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-6 border-b border-zinc-100 dark:border-white/5 pb-4">
            {lang === 'en' ? 'Creator Profile' : 'Profil Kreator'}
          </h2>
          <div className="space-y-4 max-w-xl">
            <div>
              <label htmlFor="walletAddress" className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-widest block mb-2">Connected Wallet (Payout Address)</label>
              <input id="walletAddress" type="text" disabled value={walletAddress || ''} title="Connected Wallet Address" placeholder="Connect wallet to view address" className="w-full bg-zinc-50 dark:bg-black/50 border border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-zinc-400 text-sm font-mono rounded-lg h-12 px-4 cursor-not-allowed" />
            </div>
            <div>
              <label htmlFor="displayName" className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-widest block mb-2">Display Name</label>
              <input id="displayName" type="text" placeholder={lang === 'en' ? 'Your Brand Name' : 'Nama Merek Anda'} title="Creator Display Name" className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white text-sm rounded-lg h-12 px-4 focus:outline-none focus:border-blue-500 dark:focus:border-[#00ffcc] transition-colors" />
            </div>
            <button onClick={() => toast.success(lang === 'en' ? 'Profile saved!' : 'Profil disimpan!')} className="px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold text-xs uppercase tracking-widest hover:bg-blue-600 dark:hover:bg-[#00ffcc] transition-all rounded-xl shadow-lg mt-4">
              {lang === 'en' ? 'Save Changes' : 'Simpan Perubahan'}
            </button>
          </div>
        </div>

        {/* Telegram Sentinel Config */}
        <div className="bg-white dark:bg-white/5 backdrop-blur-xl border border-zinc-200 dark:border-white/10 rounded-2xl shadow-sm p-6 md:p-8">
          <div className="flex items-center justify-between mb-6 border-b border-zinc-100 dark:border-white/5 pb-4">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
              {lang === 'en' ? 'Telegram Sentinel Setup' : 'Konfigurasi Telegram Sentinel'}
            </h2>
            <span className="px-2.5 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-[10px] font-bold uppercase tracking-widest rounded-full">Not Connected</span>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 max-w-2xl">
            {lang === 'en' 
              ? 'To automate member management, add @AxeonSentinelBot to your Telegram group and promote it to Administrator with "Ban Users" and "Invite via Link" permissions.' 
              : 'Untuk otomatisasi manajemen, tambahkan @AxeonSentinelBot ke grup Telegram Anda dan jadikan Administrator dengan izin "Ban Users" dan "Invite via Link".'}
          </p>
          <div className="max-w-xl">
            <label htmlFor="telegramId" className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-widest block mb-2">Telegram Group ID</label>
            <div className="flex gap-2">
              <input id="telegramId" type="text" placeholder="-100xxxxxxxxx" title="Telegram Group ID" className="flex-1 bg-white dark:bg-black border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white text-sm font-mono rounded-lg h-12 px-4 focus:outline-none focus:border-blue-500 dark:focus:border-[#00ffcc] transition-colors" />
              <button onClick={() => toast.info('Connecting to Sentinel...')} className="px-6 h-12 bg-blue-600 dark:bg-[#00ffcc] text-white dark:text-black font-bold text-xs uppercase tracking-widest hover:bg-blue-700 dark:hover:bg-[#00e6b8] transition-all rounded-lg">
                Connect
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}