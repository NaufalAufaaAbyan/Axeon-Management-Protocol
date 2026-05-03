"use client";
import React, { useState, useEffect } from 'react';
import { useAxeonStore } from '../../../../store/useAxeonStore';

export default function ExplorePage() {
  const [isClient, setIsClient] = useState(false);
  const { lang } = useAxeonStore();

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsClient(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!isClient) return null;

  const communities = [
    { name: "Alpha Traders Elite", category: "Finance", price: 49, subs: 1200 },
    { name: "Solana Dev Mastery", category: "Education", price: 15, subs: 850 },
    { name: "Web3 Founders Circle", category: "Networking", price: 99, subs: 340 }
  ];

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2">
          {lang === 'en' ? 'Explore Communities' : 'Jelajahi Komunitas'}
        </h1>
        <p className="text-sm text-zinc-500">
          {lang === 'en' ? 'Discover and subscribe to top-tier premium Telegram groups.' : 'Temukan dan berlangganan ke grup Telegram premium terbaik.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {communities.map((com, i) => (
          <div key={i} className="p-6 bg-white dark:bg-white/5 backdrop-blur-xl border border-zinc-200 dark:border-white/10 rounded-2xl shadow-sm hover:border-blue-500 dark:hover:border-[#00ffcc] transition-all group cursor-pointer flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <span className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-[10px] font-bold uppercase tracking-widest rounded-md">
                {com.category}
              </span>
              {/* FIX: bg-gradient diubah menjadi bg-linear */}
              <div className="size-10 bg-linear-to-br from-blue-500 to-emerald-400 rounded-xl shadow-inner opacity-80 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-[#00ffcc] transition-colors">{com.name}</h3>
            <p className="text-xs text-zinc-500 mb-6 font-mono">{com.subs.toLocaleString()} members</p>
            <div className="mt-auto flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-white/5">
              <span className="text-xl font-mono font-bold text-zinc-900 dark:text-white">${com.price}<span className="text-[10px] text-zinc-500 font-sans">/mo</span></span>
              <span className="text-xs font-bold text-blue-600 dark:text-[#00ffcc] opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-300">
                Join &rarr;
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}