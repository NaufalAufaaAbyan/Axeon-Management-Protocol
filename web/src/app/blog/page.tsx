"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BlogPage() {
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

      <main className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-3xl md:text-5xl font-bold mb-12 tracking-tight">Latest News</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="group cursor-pointer">
            <div className="w-full h-48 bg-zinc-100 dark:bg-zinc-900 rounded-xl mb-4 border border-zinc-200 dark:border-zinc-800 overflow-hidden flex items-center justify-center">
              <span className="font-mono text-zinc-400">Image Placeholder</span>
            </div>
            <span className="text-[10px] font-mono text-blue-600 dark:text-[#00ffcc] uppercase tracking-widest">Product Update</span>
            <h3 className="font-bold text-xl mt-2 mb-2 group-hover:text-blue-600 dark:group-hover:text-[#00ffcc] transition-colors">Introducing the Fiat ↔ Crypto Seamless Gateway</h3>
            <p className="text-sm text-zinc-500 line-clamp-2">How Axeon bridges Web2 users into Web3 native protocols without friction.</p>
          </div>
          <div className="group cursor-pointer">
            <div className="w-full h-48 bg-zinc-100 dark:bg-zinc-900 rounded-xl mb-4 border border-zinc-200 dark:border-zinc-800 overflow-hidden flex items-center justify-center">
              <span className="font-mono text-zinc-400">Image Placeholder</span>
            </div>
            <span className="text-[10px] font-mono text-blue-600 dark:text-[#00ffcc] uppercase tracking-widest">Engineering</span>
            <h3 className="font-bold text-xl mt-2 mb-2 group-hover:text-blue-600 dark:group-hover:text-[#00ffcc] transition-colors">Why we chose Solana for stateless subscriptions</h3>
            <p className="text-sm text-zinc-500 line-clamp-2">A deep dive into our smart contract architecture and zero-custody routing.</p>
          </div>
        </div>
      </main>
    </div>
  );
}