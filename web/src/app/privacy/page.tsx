"use client";
import React, { useState, useEffect } from 'react';

export default function PrivacyPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsClient(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!isClient) return null;

  const policies = [
    {
      title: "Data Sovereignty",
      desc: "Axeon does not store private keys, personal names, or physical addresses. Your identity is defined solely by your public wallet address and Telegram UID."
    },
    {
      title: "On-Chain Analytics",
      desc: "While Solana transactions are public, we implement metadata obfuscation to ensure that specific subscription links between users and creators are not easily harvestable."
    },
    {
      title: "Third-Party Integration",
      desc: "We utilize Telegram APIs for access management and Stripe/QRIS providers for fiat on-ramps. Data shared with these providers is governed by their respective privacy policies."
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#050505] pt-40 pb-20 selection:bg-zinc-300 dark:selection:bg-zinc-700">
      <main className="max-w-4xl mx-auto px-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="mb-20">
          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-4 text-zinc-900 dark:text-white leading-none">Privacy.</h1>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 italic">Protocol Data Handling & Transparency</p>
        </div>

        <div className="space-y-12">
          {policies.map((p, i) => (
            <div key={i} className="group p-10 rounded-4xl bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-zinc-800 shadow-xl">
              <h3 className="text-xl font-black uppercase italic tracking-widest text-zinc-900 dark:text-white mb-4">{p.title}</h3>
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 leading-loose">{p.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}