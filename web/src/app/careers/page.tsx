"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CareersPage() {
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
        <div className="mb-16 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Build the Future of Access.</h1>
          <p className="text-zinc-500">Join our remote-first team of engineers and innovators.</p>
        </div>

        <h3 className="font-bold text-xl mb-6">Open Positions</h3>
        <div className="space-y-4">
          <div className="p-6 bg-white dark:bg-[#080808] border border-zinc-200 dark:border-zinc-800 rounded-xl flex items-center justify-between hover:border-blue-500 dark:hover:border-[#00ffcc] transition-colors cursor-pointer">
            <div>
              <h4 className="font-bold text-zinc-900 dark:text-white">Senior Rust / Anchor Engineer</h4>
              <p className="text-sm text-zinc-500">Remote (Global) • Full Time</p>
            </div>
            <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-900 text-[10px] font-mono uppercase tracking-widest rounded">Apply</span>
          </div>
          <div className="p-6 bg-white dark:bg-[#080808] border border-zinc-200 dark:border-zinc-800 rounded-xl flex items-center justify-between hover:border-blue-500 dark:hover:border-[#00ffcc] transition-colors cursor-pointer">
            <div>
              <h4 className="font-bold text-zinc-900 dark:text-white">Frontend Developer (React/Next.js)</h4>
              <p className="text-sm text-zinc-500">Remote (Global) • Full Time</p>
            </div>
            <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-900 text-[10px] font-mono uppercase tracking-widest rounded">Apply</span>
          </div>
        </div>
      </main>
    </div>
  );
}