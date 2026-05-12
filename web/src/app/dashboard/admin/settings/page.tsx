"use client";
import React, { useState, useEffect } from 'react';
import { useAxeonStore } from '../../../../store/useAxeonStore';
import { toast } from 'sonner';
import { linkTelegramBot } from '../../../../lib/api';

export default function SettingsPage() {
  const [isClient, setIsClient] = useState(false);
  const [tgGroupId, setTgGroupId] = useState('');
  const { lang, walletAddress } = useAxeonStore();

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsClient(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleConnectSentinel = async () => {
    if (!tgGroupId) return toast.error('Group ID is required');
    const toastId = toast.loading('Connecting Sentinel...');
    await new Promise(r => setTimeout(r, 1000));
    await linkTelegramBot(tgGroupId, walletAddress || '');
    toast.success('Sentinel Bot Activated!', { id: toastId });
  };

  if (!isClient) return null;

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 max-w-4xl font-sans">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic text-white mb-2 leading-[0.9]">
          {lang === 'en' ? 'Protocol Settings.' : 'Pengaturan Protokol.'}
        </h1>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
          {lang === 'en' ? 'Configure your creator profile and Telegram integrations.' : 'Konfigurasi profil kreator dan integrasi Telegram Anda.'}
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-[#050505] border border-white/5 rounded-3xl shadow-2xl p-8 md:p-12">
          <h2 className="text-lg font-black italic uppercase tracking-widest text-white mb-8 border-b border-white/5 pb-4">
            Creator Profile
          </h2>
          <div className="space-y-6 max-w-xl">
            <div>
              <label htmlFor="walletAddress" className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em] block mb-3 ml-1">Payout Address</label>
              <input id="walletAddress" type="text" disabled value={walletAddress || ''} title="Wallet Address" className="w-full bg-black border border-white/10 text-zinc-600 text-sm font-bold font-mono rounded-xl h-14 px-5 cursor-not-allowed" />
            </div>
            <div>
              <label htmlFor="displayName" className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em] block mb-3 ml-1">Display Name</label>
              <input id="displayName" type="text" placeholder="Your Brand Name" title="Display Name" className="w-full bg-black border border-white/10 text-white text-sm font-bold rounded-xl h-14 px-5 focus:outline-none focus:border-blue-500 transition-colors" />
            </div>
            <button onClick={() => toast.success('Profile saved!')} className="h-14 px-8 bg-white text-black font-black text-[10px] uppercase tracking-widest hover:bg-zinc-200 transition-all rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.1)] mt-4 active:scale-95">
              Save Changes
            </button>
          </div>
        </div>

        <div className="bg-[#050505] border border-white/5 rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
            <h2 className="text-lg font-black italic uppercase tracking-widest text-white">Telegram Sentinel</h2>
            <span className="px-3 py-1 bg-black text-zinc-500 text-[9px] font-black uppercase tracking-widest rounded-lg border border-white/10">Standby</span>
          </div>
          <p className="text-[10px] font-bold text-zinc-500 mb-8 max-w-2xl leading-relaxed uppercase tracking-widest">
            Add @AxeonSentinelBot to your Telegram group and promote it to Administrator with Ban Users and Invite via Link permissions.
          </p>
          <div className="max-w-xl">
            <label htmlFor="telegramId" className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em] block mb-3 ml-1">Telegram Group ID</label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input id="telegramId" type="text" placeholder="-100xxxxxxxxx" value={tgGroupId} onChange={(e) => setTgGroupId(e.target.value)} title="Group ID" className="flex-1 bg-black border border-white/10 text-white text-sm font-bold font-mono rounded-xl h-14 px-5 focus:outline-none focus:border-blue-500 transition-colors" />
              <button onClick={handleConnectSentinel} className="h-14 px-8 bg-blue-500 text-white font-black text-[10px] uppercase tracking-widest hover:bg-blue-400 transition-all rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.2)] active:scale-95">
                Connect
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}