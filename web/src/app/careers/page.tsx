"use client";
import React, { useState, useEffect } from 'react';

export default function CareersPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsClient(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!isClient) return null;

  return (
    <div className="min-h-screen pt-32 pb-20 selection:bg-blue-500/30 dark:selection:bg-[#00ffcc]/30">
      <main className="max-w-3xl mx-auto px-6">
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