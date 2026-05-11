"use client";
import React, { useState, useEffect } from 'react';

export default function TermsPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsClient(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!isClient) return null;

  const sections = [
    { no: "01", title: "Protocol Service", content: "Axeon provides a non-custodial infrastructure layer for managing digital subscriptions via Solana smart contracts." },
    { no: "02", title: "Fee Structure", content: "By using the protocol, Creators agree to a flat 5% protocol fee deducted on-chain." }
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#050505] pt-40 pb-20 selection:bg-zinc-300 dark:selection:bg-zinc-700">
      <main className="max-w-4xl mx-auto px-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="mb-20">
          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-4 text-zinc-900 dark:text-white leading-none">Terms of Service.</h1>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 italic">Last Updated: May 2026</p>
        </div>

        <div className="space-y-16">
          {sections.map((section, i) => (
            <div key={i} className="relative pl-12 border-l border-zinc-200 dark:border-zinc-800">
              {/* FIX: -left-[1px] -> -left-px | w-[2px] -> w-0.5 */}
              <span className="absolute -left-px top-0 h-8 w-0.5 bg-zinc-900 dark:bg-white" />
              <div className="flex flex-col gap-4">
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Section {section.no}</span>
                <h3 className="text-2xl font-black italic uppercase tracking-tighter text-zinc-900 dark:text-white">{section.title}</h3>
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 leading-loose max-w-2xl">{section.content}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}