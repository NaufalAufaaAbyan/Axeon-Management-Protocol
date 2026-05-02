"use client";
import React, { useState, useEffect } from 'react';

export default function ChangelogPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsClient(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!isClient) return null;

  return (
    <div className="min-h-screen pt-32 pb-20 selection:bg-blue-500/30 dark:selection:bg-[#00ffcc]/30">
      <main className="max-w-3xl mx-auto px-6">
        <div className="mb-16">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Changelog</h1>
          <p className="text-zinc-500">New updates and improvements to the Axeon Protocol.</p>
        </div>

        <div className="space-y-12">
          <div className="relative pl-8 border-l border-zinc-200 dark:border-zinc-800">
            <div className="absolute top-0 -left-1.25 size-2.5 rounded-full bg-blue-500 dark:bg-[#00ffcc] shadow-[0_0_10px_rgba(37,99,235,0.5)] dark:shadow-[0_0_10px_#00ffcc]" />
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-2">May 2026</span>
            <h3 className="text-xl font-bold mb-3">v1.0.0 - Mainnet Alpha Release</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li>Deployed core zero-custody smart contracts on Solana.</li>
              <li>Launched Fiat ↔ Crypto Gateway via Stripe integration.</li>
              <li>Released Axeon Sentinel (Telegram Bot).</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}