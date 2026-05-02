"use client";
import React, { useState, useEffect } from 'react';

export default function BlogPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsClient(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!isClient) return null;

  return (
    <div className="min-h-screen pt-32 pb-20 selection:bg-blue-500/30 dark:selection:bg-[#00ffcc]/30">
      <main className="max-w-4xl mx-auto px-6">
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
        </div>
      </main>
    </div>
  );
}