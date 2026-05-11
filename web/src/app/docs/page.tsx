"use client";
import React, { useEffect, useState } from 'react';

export default function DocsPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // FIX: Avoid cascading renders by using requestAnimationFrame
    const frame = requestAnimationFrame(() => setIsClient(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!isClient) return null;

  const steps = [
    { title: "Initialize Vault", desc: "Creators deploy a unique Program Derived Address (PDA) on Solana to act as a non-custodial vault." },
    { title: "Integrate Sentinel", desc: "Add @AxeonSentinelBot to your Telegram group and provide the Group ID in your dashboard." },
    { title: "Share Checkout", desc: "Distribute your unique Axeon checkout link. Subscribers pay via USDC or QRIS." },
    { title: "Autonomous Access", desc: "The protocol automatically issues invite links and revokes access upon expiration." }
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#050505] pt-40 pb-20 selection:bg-zinc-300 dark:selection:bg-zinc-700">
      <main className="max-w-4xl mx-auto px-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-4 text-zinc-900 dark:text-white leading-none">Documentation.</h1>
        <p className="text-xs font-black uppercase tracking-[0.4em] text-zinc-500 mb-20 italic">Technical Protocol Overview v1.0</p>

        <div className="space-y-12">
          {steps.map((step, i) => (
            <div key={i} className="group p-8 rounded-4xl bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-zinc-800 shadow-xl transition-all hover:border-zinc-400">
              <div className="flex items-center gap-6 mb-6">
                <span className="text-4xl font-black italic text-zinc-200 dark:text-zinc-800">0{i+1}</span>
                <h3 className="text-xl font-black uppercase italic tracking-widest text-zinc-900 dark:text-white">{step.title}</h3>
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 leading-loose ml-14">{step.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}