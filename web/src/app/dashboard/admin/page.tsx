"use client";
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useAxeonStore } from '../../../store/useAxeonStore';
import { dict } from '../../../lib/dictionary';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiCheckCircle } from 'react-icons/fi';

// --- WEB3 IMPORTS ---
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import { BN } from '@coral-xyz/anchor';
import { getProvider, getProgram } from '../../../lib/anchor';

// FIX: Bikin interface biar nggak pakai 'any'
interface VaultData {
  id: string;
  name: string;
  platform: string;
  price: number;
}

export default function AdminDashboardPage() {
  const [isClient, setIsClient] = useState(false);
  const { lang } = useAxeonStore();
  const t = dict[lang as keyof typeof dict];

  const wallet = useAnchorWallet();
  const { connection } = useConnection();

  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [formData, setFormData] = useState({ name: '', platform: 'Telegram', price: '', currency: 'USDC', enableFiat: false });

  // FIX: Hapus 'stats' yang nganggur dan ganti 'any' dengan VaultData
  const vaults: VaultData[] = []; 

  useEffect(() => {
    const timer = setTimeout(() => setIsClient(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const handleDeployVault = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!wallet) {
      toast.error(lang === 'en' ? 'Please connect your wallet first!' : 'Hubungkan dompet Anda terlebih dahulu!');
      return;
    }

    setIsDeploying(true);
    const toastId = toast.loading(lang === 'en' ? 'Deploying Vault to Solana...' : 'Menyebarkan Brankas ke Solana...');

    try {
      const provider = getProvider(wallet, connection.rpcEndpoint);
      const program = getProgram(provider);

      const [vaultPda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("axeon_vault"),
          wallet.publicKey.toBuffer(),
          Buffer.from(formData.name)
        ],
        program.programId
      );

      const priceInDecimals = parseFloat(formData.price) * 1_000_000;
      const priceBN = new BN(priceInDecimals);
      const durationBN = new BN(30 * 24 * 60 * 60);

      const tx = await program.methods
        .initializeVault(formData.name, priceBN, durationBN)
        .accounts({
          vault: vaultPda,
          creator: wallet.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      toast.success(
        lang === 'en' 
          ? `Vault Deployed! TX: ${tx.slice(0, 8)}...` 
          : `Brankas Dibuat! TX: ${tx.slice(0, 8)}...`, 
        { id: toastId }
      );

      setIsDeployModalOpen(false);
      setFormData({ name: '', platform: 'Telegram', price: '', currency: 'USDC', enableFiat: false });

    } catch (error) { // FIX: Hapus type 'any' di catch block
      console.error("Deploy Error:", error);
      toast.error((error as Error).message || 'Deployment failed', { id: toastId });
    } finally {
      setIsDeploying(false);
    }
  };

  if (!isClient) return null;

  return (
    <div className="w-full flex flex-col gap-10">
      
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-200 dark:border-zinc-800 pb-8">
        <div>
          <div className="size-16 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-black flex items-center justify-center text-3xl mb-6 shadow-xl italic font-black">A</div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-zinc-900 dark:text-white uppercase italic leading-[0.9] mb-3">{t.adminTitle}</h1>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">{t.adminSub}</p>
        </div>
        <button 
          onClick={() => setIsDeployModalOpen(true)} 
          className="h-14 px-8 bg-zinc-900 dark:bg-white text-white dark:text-black font-black text-[10px] uppercase tracking-widest hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all rounded-2xl shadow-xl flex items-center justify-center gap-3 active:scale-95"
        >
          <FiPlus size={16} /> {t.btnDeploy}
        </button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white/60 dark:bg-[#111111]/80 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-4xl shadow-sm overflow-hidden flex flex-col">
        <div className="px-10 py-8 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="font-black text-xs uppercase tracking-[0.3em] text-zinc-900 dark:text-white">{t.tableTitle}</h2>
        </div>
        
        {vaults.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center py-20 px-6 text-center relative">
            <div className="size-20 bg-white dark:bg-[#151515] rounded-full flex items-center justify-center mb-8 shadow-inner ring-1 ring-zinc-200 dark:ring-zinc-800">
              <FiCheckCircle className="size-8 text-zinc-400 dark:text-zinc-600" />
            </div>
            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-zinc-900 dark:text-white mb-3">{t.noVaults}</h3>
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 max-w-sm mb-10 leading-relaxed">{t.noVaultsDesc}</p>
            <button 
              onClick={() => setIsDeployModalOpen(true)} 
              className="h-14 px-10 bg-zinc-900 dark:bg-white text-white dark:text-black font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-xl active:scale-95 transition-transform"
            >
              {t.btnDeployFirst}
            </button>
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {isDeployModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-zinc-900/60 dark:bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="w-full max-w-lg bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-2xl border border-zinc-200 dark:border-zinc-800 rounded-4xl shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-zinc-300 to-zinc-400 dark:from-zinc-700 dark:to-zinc-600" />
              
              <div className="p-10 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-zinc-900 dark:text-white">{t.modTitle}</h3>
                <button 
                  onClick={() => setIsDeployModalOpen(false)} 
                  className="size-10 flex items-center justify-center bg-zinc-100 dark:bg-[#151515] rounded-full text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
                >✕</button>
              </div>
              
              <form onSubmit={handleDeployVault} className="p-10 space-y-8">
                <div className="space-y-3">
                  <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest ml-1">{t.modVaultName}</label>
                  <input 
                    required 
                    placeholder="e.g. Alpha Traders" 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                    className="w-full bg-zinc-50 dark:bg-[#111111] border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-sm font-bold rounded-2xl h-14 px-5 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors" 
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest ml-1">{t.modBaseAsset}</label>
                    <select 
                      aria-label="Select Base Asset"
                      title="Select Base Asset"
                      value={formData.currency} 
                      onChange={(e) => setFormData({...formData, currency: e.target.value})} 
                      className="w-full bg-zinc-50 dark:bg-[#111111] border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white font-mono text-sm font-bold rounded-2xl h-14 px-5 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 appearance-none transition-colors"
                    >
                      <option value="USDC">USDC (Solana)</option>
                      <option value="SOL">SOL</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest ml-1">{t.modPrice}</label>
                    <div className="relative">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500 font-mono font-bold">$</span>
                      <input 
                        type="number" 
                        min="1" 
                        step="0.01" 
                        required 
                        placeholder="0.00" 
                        value={formData.price} 
                        onChange={(e) => setFormData({...formData, price: e.target.value})} 
                        className="w-full bg-zinc-50 dark:bg-[#111111] border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white font-mono text-sm font-bold rounded-2xl h-14 pl-9 pr-5 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors" 
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6 flex gap-4">
                  <button type="button" onClick={() => setIsDeployModalOpen(false)} className="px-6 h-14 bg-zinc-100 dark:bg-[#151515] text-zinc-700 dark:text-zinc-300 font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">{t.modCancel}</button>
                  <button type="submit" disabled={isDeploying || !formData.name || !formData.price} className="flex-1 h-14 bg-zinc-900 dark:bg-white text-white dark:text-black font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all disabled:opacity-50 active:scale-95">
                    {isDeploying ? t.modDeploying : t.modDeployBtn}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}