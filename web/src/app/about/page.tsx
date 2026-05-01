"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AboutPage() {
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

      <main className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Redefining Community Ownership.</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-12">
          Axeon Inc. is building the underlying financial operating system for the creator economy. We believe that community builders should have absolute control over their revenue streams without relying on custodial middlemen.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
          <div className="p-6 bg-zinc-50 dark:bg-[#080808] border border-zinc-200 dark:border-zinc-800 rounded-xl">
            <h3 className="font-bold text-lg mb-2">Our Mission</h3>
            <p className="text-sm text-zinc-500">To bridge Web2 social platforms with Web3 financial infrastructure, making crypto payments invisible and seamless for the end consumer.</p>
          </div>
          <div className="p-6 bg-zinc-50 dark:bg-[#080808] border border-zinc-200 dark:border-zinc-800 rounded-xl">
            <h3 className="font-bold text-lg mb-2">Our Architecture</h3>
            <p className="text-sm text-zinc-500">Built exclusively on Solana for high-throughput, low-latency state changes required to manage large-scale subscriber access in real-time.</p>
          </div>
        </div>
      </main>
    </div>
  );
}