"use client";
import React, { useState, useEffect } from 'react';
import { FiShield, FiLock, FiCpu, FiCheckCircle } from 'react-icons/fi';

export default function SecurityPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsClient(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#050505] pt-40 pb-20">
      <main className="max-w-5xl mx-auto px-6 animate-in fade-in duration-700">
        <div className="mb-24 text-center">
          <div className="inline-flex size-20 items-center justify-center rounded-3xl bg-zinc-900 dark:bg-white text-white dark:text-black mb-10 shadow-2xl">
            <FiShield size={40} />
          </div>
          <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter text-zinc-900 dark:text-white mb-6 leading-none">Security.</h1>
          <p className="text-xs font-black uppercase tracking-[0.5em] text-zinc-500 italic">Built-in Cryptographic Protection</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-12 rounded-4xl bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-zinc-800 shadow-xl relative overflow-hidden">
            <FiLock className="size-10 text-zinc-300 dark:text-zinc-800 mb-8" />
            <h3 className="font-black uppercase italic tracking-widest text-2xl mb-4 text-zinc-900 dark:text-white">Zero-Custody</h3>
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 leading-relaxed">
              {/* FIX: Mengganti petik tunggal dengan &apos; */}
              Axeon Protocol never holds or manages your funds. All subscription assets are routed via audited Solana Program Derived Addresses (PDAs) directly to the creator&apos;s payout vault.
            </p>
          </div>

          <div className="p-12 rounded-4xl bg-zinc-900 dark:bg-white border border-zinc-800 dark:border-zinc-200 shadow-xl text-white dark:text-black">
            <FiCpu className="size-10 text-zinc-700 dark:text-zinc-300 mb-8" />
            <h3 className="font-black uppercase italic tracking-widest text-2xl mb-4">Shielded Identity</h3>
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-600 leading-relaxed">
              The cryptographic link between your Telegram identity and Solana wallet is obfuscated. We ensure your social activity remains private from public wallet explorers.
            </p>
          </div>
        </div>

        <div className="mt-8 p-12 rounded-4xl bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-zinc-800 shadow-xl flex items-center gap-8">
          <div className="hidden sm:flex size-16 rounded-full bg-emerald-500/10 items-center justify-center text-emerald-500">
            <FiCheckCircle size={32} />
          </div>
          <div className="flex-1">
            <h4 className="font-black uppercase italic tracking-widest text-lg mb-2 text-zinc-900 dark:text-white">Audit Status</h4>
            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Core Smart Contracts are currently undergoing internal peer-review for Solana Frontier Hackathon.</p>
          </div>
        </div>
      </main>
    </div>
  );
}