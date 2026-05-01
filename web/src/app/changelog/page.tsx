"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ChangelogPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsClient(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-zinc-900 dark:text-zinc-100 transition-colors duration-300 font-sans selection:bg-blue-500/30 dark:selection:bg-[#00ffcc]/30">
      <nav className="sticky top-0 w-full z-50 border-b border-zinc-200 dark:border-white/5 bg-white/80 dark:bg-black/80 backdrop-blur-xl transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 cursor-pointer group">
            <div className="size-2.5 bg-blue-600 dark:bg-[#00ffcc] shadow-[0_0_10px_rgba(37,99,235,0.5)] dark:shadow-[0_0_10px_#00ffcc] group-hover:scale-110 transition-transform" />
            <span className="font-bold tracking-widest text-xs text-zinc-900 dark:text-white">AXEON</span>
          </Link>
          <Link href="/login" className="px-4 py-1.5 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white font-bold text-[10px] font-mono uppercase tracking-widest hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors rounded-sm">
            Dashboard
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-20">
        <div className="mb-16">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Changelog</h1>
          <p className="text-zinc-500">New updates and improvements to the Axeon Protocol.</p>
        </div>

        <div className="space-y-12">
          <div className="relative pl-8 border-l border-zinc-200 dark:border-zinc-800">
            {/* FIX: left-[-5px] diubah menjadi -left-1.25 sesuai standar Tailwind */}
            <div className="absolute top-0 -left-1.25 size-2.5 rounded-full bg-blue-500 dark:bg-[#00ffcc] shadow-[0_0_10px_rgba(37,99,235,0.5)] dark:shadow-[0_0_10px_#00ffcc]" />
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-2">May 2026</span>
            <h3 className="text-xl font-bold mb-3">v1.0.0 - Mainnet Alpha Release</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li>Deployed core zero-custody smart contracts on Solana.</li>
              <li>Launched Fiat ↔ Crypto Gateway via Stripe integration.</li>
              <li>Released Axeon Sentinel (Telegram Bot) with auto-kick functionality.</li>
              <li>Introduced Protocol Explorer and real-time dashboard.</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}