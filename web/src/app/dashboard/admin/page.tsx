"use client";
import React, { useState } from 'react';
import { toast } from 'sonner';
import { useAxeonStore } from '../../../store/useAxeonStore';
import { dict } from '../../../lib/dictionary';

export default function AdminDashboardPage() {
  const { lang } = useAxeonStore();
  const t = dict[lang];

  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [formData, setFormData] = useState({ name: '', platform: 'Telegram', price: '', currency: 'USDC', enableFiat: false });

  const stats = { revenue: 0.00, subscribers: 0, vaults: 0 };
  type Vault = { id: string; name: string; platform: string; price: number; currency: string; subs: number; status: string; acceptsFiat: boolean; };
  const vaults: Vault[] = []; 

  const handleDeployVault = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDeploying(true);
    const toastId = toast.loading(lang === 'en' ? 'Compiling smart contract...' : 'Mengkompilasi smart contract...');
    setTimeout(() => {
      setIsDeploying(false);
      setIsDeployModalOpen(false);
      toast.warning(lang === 'en' ? 'Metadata saved. Connect an RPC endpoint to deploy.' : 'Metadata disimpan. Hubungkan endpoint RPC untuk deploy.', { id: toastId, duration: 4000 });
      setFormData({ name: '', platform: 'Telegram', price: '', currency: 'USDC', enableFiat: false });
    }, 2500);
  };

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2">{t.adminTitle}</h1>
          <p className="text-sm text-zinc-500">{t.adminSub}</p>
        </div>
        <button onClick={() => setIsDeployModalOpen(true)} className="h-12 px-6 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold text-xs uppercase tracking-widest hover:bg-blue-600 dark:hover:bg-[#00ffcc] transition-all rounded-xl shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2">
          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          {t.btnDeploy}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-white dark:bg-white/5 backdrop-blur-xl border border-zinc-200 dark:border-white/10 rounded-2xl shadow-sm flex flex-col justify-between group hover:border-blue-500 dark:hover:border-[#00ffcc] transition-colors relative overflow-hidden">
          <div className="relative z-10"><span className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4 block">{t.statVol}</span>
            <div className="flex items-end gap-3 mb-1"><span className="text-4xl font-bold text-zinc-900 dark:text-white tracking-tighter">${stats.revenue.toFixed(2)}</span></div>
            <span className="text-xs font-bold text-zinc-400">{t.statWait}</span>
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-white/5 backdrop-blur-xl border border-zinc-200 dark:border-white/10 rounded-2xl shadow-sm flex flex-col justify-between group hover:border-blue-500 dark:hover:border-[#00ffcc] transition-colors">
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4 block">{t.statActSubs}</span>
          <div className="flex items-end gap-3 mb-1"><span className="text-4xl font-bold text-zinc-900 dark:text-white tracking-tighter">{stats.subscribers}</span></div>
          <span className="text-xs font-bold text-zinc-400">{t.statNoSubs}</span>
        </div>

        <div className="p-6 bg-white dark:bg-white/5 backdrop-blur-xl border border-zinc-200 dark:border-white/10 rounded-2xl shadow-sm flex flex-col justify-between group hover:border-blue-500 dark:hover:border-[#00ffcc] transition-colors">
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4 block">{t.statDepVaults}</span>
          <div className="flex items-end gap-3 mb-1"><span className="text-4xl font-bold text-zinc-900 dark:text-white tracking-tighter">{stats.vaults}</span></div>
          <span className="text-xs font-bold text-zinc-400">{t.statIdle}</span>
        </div>
      </div>

      <div className="bg-white dark:bg-white/5 backdrop-blur-xl border border-zinc-200 dark:border-white/10 rounded-2xl shadow-sm overflow-hidden min-h-75 flex flex-col">
        <div className="px-6 py-5 border-b border-zinc-200 dark:border-white/5 flex items-center justify-between bg-zinc-50/50 dark:bg-black/20">
          <h2 className="font-bold text-lg text-zinc-900 dark:text-white">{t.tableTitle}</h2>
        </div>
        {vaults.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center relative overflow-hidden">
            {/* FIX: border-[20px] diubah jadi border-20 */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] border-20 border-dashed border-zinc-500/10 dark:border-white/5"></div>
            <div className="relative z-10 size-20 bg-linear-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 rounded-full flex items-center justify-center mb-6 shadow-inner ring-1 ring-white/10">
              <svg className="size-10 text-zinc-400 dark:text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            </div>
            <h3 className="relative z-10 text-xl font-bold text-zinc-900 dark:text-white mb-2">{t.noVaults}</h3>
            <p className="relative z-10 text-sm text-zinc-500 max-w-md mb-8 leading-relaxed">{t.noVaultsDesc}</p>
            <button onClick={() => setIsDeployModalOpen(true)} className="relative z-10 px-8 py-3 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold text-xs uppercase tracking-widest hover:bg-blue-600 dark:hover:bg-[#00ffcc] transition-all rounded-xl shadow-lg hover:shadow-blue-500/25">{t.btnDeployFirst}</button>
          </div>
        ) : null}
      </div>

      {/* FIX: INI BAGIAN MODAL YANG SEBELUMNYA KEPOTONG */}
      {isDeployModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/40 dark:bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/10 rounded-2xl shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-600 to-emerald-400 dark:from-[#00ffcc] dark:to-blue-500" />
            <div className="p-6 border-b border-zinc-200 dark:border-white/5 flex items-center justify-between">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{t.modTitle}</h3>
              <button onClick={() => setIsDeployModalOpen(false)} aria-label="Close modal" title="Close modal" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors bg-zinc-100 dark:bg-zinc-800 p-2 rounded-full">
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleDeployVault} className="p-6 space-y-5">
              <div className="space-y-2">
                <label htmlFor="vaultName" className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-widest">{t.modVaultName}</label>
                <input id="vaultName" type="text" required placeholder="e.g. Alpha Traders" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white text-sm rounded-lg h-12 px-4 focus:outline-none focus:border-blue-500 dark:focus:border-[#00ffcc] transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="platform" className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-widest">{t.modPlatform}</label>
                  <select id="platform" value={formData.platform} onChange={(e) => setFormData({...formData, platform: e.target.value})} className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white text-sm rounded-lg h-12 px-4 focus:outline-none focus:border-blue-500 dark:focus:border-[#00ffcc] transition-colors appearance-none">
                    <option value="Telegram">Telegram</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="currency" className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-widest">{t.modBaseAsset}</label>
                  <select id="currency" value={formData.currency} onChange={(e) => setFormData({...formData, currency: e.target.value})} className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white font-mono text-sm rounded-lg h-12 px-4 focus:outline-none focus:border-blue-500 dark:focus:border-[#00ffcc] transition-colors appearance-none">
                    <option value="USDC">USDC (Solana)</option>
                    <option value="SOL">SOL</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="price" className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-widest">{t.modPrice}</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-sm font-mono">$</span>
                  <input id="price" type="number" min="1" step="0.01" required placeholder="0.00" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white font-mono text-sm rounded-lg h-12 pl-8 pr-4 focus:outline-none focus:border-blue-500 dark:focus:border-[#00ffcc] transition-colors" />
                </div>
              </div>
              <div className="p-4 bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">{t.modFiatToggle} <span className="px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-[#00ffcc] text-[9px] rounded uppercase tracking-widest">Pro</span></h4>
                  <p className="text-xs text-zinc-500 mt-1">{t.modFiatDesc}</p>
                </div>
                <button type="button" aria-label="Toggle Fiat On-Ramp" title="Toggle Fiat On-Ramp" onClick={() => setFormData({...formData, enableFiat: !formData.enableFiat})} className={`w-12 h-6 rounded-full transition-colors relative flex items-center ${formData.enableFiat ? 'bg-blue-600 dark:bg-[#00ffcc]' : 'bg-zinc-300 dark:bg-zinc-700'}`}>
                  <div className={`size-5 bg-white rounded-full shadow-sm transition-transform absolute ${formData.enableFiat ? 'translate-x-6' : 'translate-x-0.5'}`} />
                </button>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsDeployModalOpen(false)} disabled={isDeploying} className="flex-1 px-4 py-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors disabled:opacity-50">{t.modCancel}</button>
                <button type="submit" disabled={isDeploying || !formData.name || !formData.price} className="flex-2 px-4 py-3 bg-blue-600 dark:bg-[#00ffcc] text-white dark:text-black font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-blue-700 dark:hover:bg-[#00e6b8] transition-all disabled:opacity-50 flex items-center justify-center gap-2 hover:shadow-lg">{isDeploying ? t.modDeploying : t.modDeployBtn}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}