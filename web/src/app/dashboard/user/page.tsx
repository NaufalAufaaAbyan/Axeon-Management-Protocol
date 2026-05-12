"use client";
import React, { useState, useEffect } from 'react';
import { useAxeonStore } from '../../../store/useAxeonStore';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiBox, FiKey } from 'react-icons/fi';

interface UserSubscription { id: string; name: string; status: string; }

export default function UserDashboardPage() {
  const { walletAddress, userName } = useAxeonStore();
  const [isClient, setIsClient] = useState(false);
  const activeSubscriptions: UserSubscription[] = [];

  useEffect(() => {
    const timer = setTimeout(() => setIsClient(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const trimAddress = (addr: string | null) => {
    if (!addr) return 'UNKNOWN_USER';
    if (addr.startsWith('Email_') || addr.startsWith('G_User') || addr.startsWith('TG_User')) return userName || 'Web2 Gateway';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (!isClient) return null;

  return (
    <div className="w-full flex flex-col gap-10 font-sans">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic text-white mb-2 leading-[0.9]">
            My Vaults.
          </h1>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
            <span className="flex size-1.5 rounded-full bg-blue-500 animate-pulse" />
            IDENTITY: <span className="text-white">{trimAddress(walletAddress)}</span>
          </div>
        </div>
        <Link href="/dashboard/user/explore" title="Discover Vaults" className="h-14 px-8 bg-white text-black font-black text-[10px] uppercase tracking-widest hover:bg-zinc-200 transition-all rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center gap-3 active:scale-95">
          <FiBox size={16} /> Discover Premium
        </Link>
      </motion.div>

      <div className="min-h-100 flex flex-col">
        {activeSubscriptions.length === 0 ? (
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-[#0a0a0a]/50 backdrop-blur-xl border border-white/5 rounded-4xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.02] border-2 border-dashed border-white pointer-events-none" />
            <div className="relative z-10 size-20 bg-[#050505] border border-white/5 rounded-full flex items-center justify-center mb-8 shadow-inner">
              <FiKey className="size-8 text-zinc-600" />
            </div>
            <h3 className="relative z-10 text-2xl font-black italic uppercase tracking-tighter text-white mb-3">No Access Passes</h3>
            <p className="relative z-10 text-[10px] font-bold uppercase tracking-widest text-zinc-500 max-w-sm mb-10 leading-relaxed">You havent subscribed to any decentralized communities yet.</p>
            <Link href="/dashboard/user/explore" className="relative z-10 h-12 px-10 bg-zinc-800 text-white font-black text-[10px] uppercase tracking-widest rounded-xl border border-white/10 hover:bg-zinc-700 active:scale-95 transition-all flex items-center justify-center">
              Explore Network
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{/* Map Subscriptions Here */}</div>
        )}
      </div>
    </div>
  );
}