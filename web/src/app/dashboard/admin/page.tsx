"use client";
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useAxeonStore } from '../../../store/useAxeonStore';
import { dict } from '../../../lib/dictionary';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiPlus, FiTrendingUp, FiUsers, FiActivity,
  FiLayers, FiArrowUpRight, FiX, FiShield
} from 'react-icons/fi';
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import { BN } from '@coral-xyz/anchor';
import { getProvider, getProgram } from '../../../lib/anchor';

export default function AdminDashboardPage() {
  const [isClient, setIsClient] = useState(false);
  const { lang } = useAxeonStore();
  const t = dict[lang as keyof typeof dict];

  const wallet = useAnchorWallet();
  const { connection } = useConnection();

  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    platform: 'Telegram',
    price: '',
    currency: 'SOL',
  });

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsClient(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleDeployVault = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!wallet) return toast.error('Connect wallet first!');

    // Validasi frontend sebelum kirim ke chain
    const trimmedName = formData.name.trim();
    if (!trimmedName) return toast.error('Vault name cannot be empty!');
    if (trimmedName.length > 64) return toast.error('Vault name max 64 characters!');
    const priceNum = parseFloat(formData.price);
    if (!priceNum || priceNum <= 0) return toast.error('Price must be greater than 0!');

    setIsDeploying(true);
    const toastId = toast.loading('Deploying vault to blockchain...');

    try {
      // Fix: pass rpcEndpoint dari useConnection agar match dengan wallet adapter
      const provider = getProvider(wallet, connection.rpcEndpoint);
      const program = getProgram(provider);

      const [vaultPda, bump] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("axeon_vault"),
          wallet.publicKey.toBuffer(),
          Buffer.from(trimmedName),
        ],
        program.programId
      );

      console.log("=== DEBUG AXEON ===");
      console.log("Vault PDA  :", vaultPda.toBase58());
      console.log("Creator    :", wallet.publicKey.toBase58());
      console.log("Bump       :", bump);
      console.log("Name       :", trimmedName);
      console.log("RPC        :", connection.rpcEndpoint);

      const multiplier = formData.currency === 'SOL' ? 1_000_000_000 : 1_000_000;
      const priceInSmallestUnit = new BN(Math.round(priceNum * multiplier));

      const tx = await program.methods
        .initializeVault(
          trimmedName,
          priceInSmallestUnit,
          new BN(2592000) // 30 hari dalam detik
        )
        .accounts({
          vault: vaultPda,
          creator: wallet.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc({
          skipPreflight: false, // jangan skip, biar error lebih informatif
          commitment: "confirmed",
        });

      console.log("TX Signature:", tx);
      toast.success(`Vault deployed! TX: ${tx.slice(0, 8)}...`, { id: toastId });
      setIsDeployModalOpen(false);
      setFormData({ name: '', platform: 'Telegram', price: '', currency: 'SOL' });

    } catch (error: unknown) {
      console.error("=== DEPLOY ERROR ===");
      const err = error as { logs?: string[]; message?: string };

      if (err.logs) {
        console.error("Rust Logs:", err.logs);
      }
      console.error("Full Error:", error);

      // Parse pesan error yang informatif
      const msg = err.message || "Unknown error";
      let userMsg = "Deploy failed! Check console (F12)";

      if (msg.includes("already in use") || msg.includes("already initialized")) {
        userMsg = "Vault name already taken! Use a different name.";
      } else if (msg.includes("NameTooLong")) {
        userMsg = "Vault name too long! Max 64 characters.";
      } else if (msg.includes("InvalidPrice")) {
        userMsg = "Price must be greater than zero!";
      } else if (msg.includes("insufficient funds") || msg.includes("lamports")) {
        userMsg = "Insufficient SOL balance for transaction fee!";
      }

      toast.error(userMsg, { id: toastId });

    } finally {
      setIsDeploying(false);
    }
  };

  if (!isClient) return null;

  return (
    <div className="w-full flex flex-col gap-12 font-sans selection:bg-blue-500 selection:text-white">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-white/5 relative"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-1 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500/80">
              Command Center v1.0
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase italic leading-none">
            {t.adminTitle || 'Protocol Overview'}
          </h1>
        </div>

        <button
          aria-label="Initialize New Vault"
          onClick={() => setIsDeployModalOpen(true)}
          className="group relative h-16 px-10 bg-white text-black font-black text-[11px] uppercase tracking-widest overflow-hidden rounded-2xl transition-all hover:scale-[1.02] active:scale-95"
        >
          <div className="absolute inset-0 bg-blue-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors">
            <FiPlus size={18} /> Initialize New Vault
          </span>
        </button>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Net Revenue', value: '0.00', unit: 'SOL', icon: <FiTrendingUp />, color: 'text-emerald-500' },
          { label: 'Subscribers', value: '0', unit: 'Wallets', icon: <FiUsers />, color: 'text-blue-500' },
          { label: 'Node Status', value: 'Optimal', unit: 'Devnet', icon: <FiActivity />, color: 'text-emerald-400' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#050505] border border-white/5 p-8 rounded-4xl hover:border-white/10 transition-colors group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-4xl">
              {stat.icon}
            </div>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-4">{stat.label}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-white italic tracking-tighter">{stat.value}</span>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${stat.color}`}>{stat.unit}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Deployed Infrastructure */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-[#050505] border border-white/5 rounded-4xl overflow-hidden shadow-2xl"
      >
        <div className="px-10 py-8 border-b border-white/5 flex items-center justify-between bg-zinc-950/50">
          <div className="flex items-center gap-4">
            <FiLayers className="text-zinc-500" />
            <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-white">Deployed Infrastructure</h2>
          </div>
          <span className="text-[8px] font-black px-3 py-1 bg-white/5 border border-white/10 rounded-full text-zinc-500">
            REALTIME SYNC
          </span>
        </div>

        <div className="min-h-75 flex flex-col items-center justify-center p-12 text-center">
          <div className="size-20 bg-zinc-900/50 rounded-full flex items-center justify-center mb-6 border border-white/5 shadow-inner">
            <FiShield className="size-8 text-zinc-700" />
          </div>
          <h3 className="text-zinc-400 font-black text-xs uppercase tracking-widest mb-2">No Active Smart Contracts</h3>
          <p className="text-[10px] font-medium text-zinc-600 max-w-xs uppercase leading-relaxed tracking-wider">
            System is dormant. Initialize a vault to begin.
          </p>
        </div>
      </motion.div>

      {/* Deploy Modal */}
      <AnimatePresence>
        {isDeployModalOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDeployModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full max-w-xl bg-[#080808] border border-white/10 rounded-4xl shadow-2xl relative overflow-hidden p-10"
            >
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">Vault Config.</h3>
                  <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mt-2">Solana Integration</p>
                </div>
                <button
                  aria-label="Close"
                  onClick={() => setIsDeployModalOpen(false)}
                  className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors"
                >
                  <FiX />
                </button>
              </div>

              <form onSubmit={handleDeployVault} className="space-y-8">
                <div className="space-y-3">
                  <label htmlFor="vault-name" className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-2">
                    Vault Identity <span className="text-zinc-600">(max 64 chars)</span>
                  </label>
                  <input
                    id="vault-name"
                    required
                    maxLength={64}
                    placeholder="e.g. AXEON ALPHA"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value.toUpperCase() })}
                    className="w-full bg-black border border-white/5 text-white font-bold text-sm rounded-2xl h-16 px-6 focus:border-blue-500/50 outline-none transition-all placeholder:text-zinc-800"
                  />
                  <p className="text-[9px] text-zinc-600 ml-2">{formData.name.length}/64</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label htmlFor="currency-select" className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-2">
                      Settlement
                    </label>
                    <select
                      id="currency-select"
                      title="Settlement Asset"
                      value={formData.currency}
                      onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                      className="w-full bg-black border border-white/5 text-white font-bold text-sm rounded-2xl h-16 px-6 outline-none appearance-none"
                    >
                      <option value="SOL">SOL NATIVE</option>
                      <option value="USDC">USDC (STABLE)</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="price-input" className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-2">
                      Rate
                    </label>
                    <input
                      id="price-input"
                      type="number"
                      step="0.001"
                      min="0.001"
                      required
                      placeholder="0.00"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full bg-black border border-white/5 text-white font-mono font-bold text-sm rounded-2xl h-16 px-6 outline-none focus:border-blue-500/50"
                    />
                  </div>
                </div>

                <button
                  aria-label="Deploy Vault"
                  type="submit"
                  disabled={isDeploying || !formData.name.trim() || !formData.price}
                  className="w-full h-20 bg-white text-black font-black text-[12px] uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-500 hover:text-white transition-all active:scale-95 disabled:opacity-30 flex items-center justify-center gap-4"
                >
                  {isDeploying ? (
                    <>
                      <FiActivity className="animate-spin" size={20} />
                      Processing...
                    </>
                  ) : (
                    <>
                      Deploy to Blockchain
                      <FiArrowUpRight size={20} />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}