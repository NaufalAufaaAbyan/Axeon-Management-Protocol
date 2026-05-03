"use client";
import React, { useState, useEffect } from 'react';
import { useAxeonStore } from '../../store/useAxeonStore';

export default function BlogPage() {
  const [isClient, setIsClient] = useState(false);
  const { lang } = useAxeonStore();

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsClient(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!isClient) return null;

  return (
    <div className="min-h-screen pt-32 pb-20 selection:bg-blue-500/30 dark:selection:bg-[#00ffcc]/30">
      <main className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl md:text-5xl font-bold mb-12 tracking-tight text-zinc-900 dark:text-white">
          {lang === 'en' ? 'Latest Updates' : 'Pembaruan Terbaru'}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="group cursor-pointer">
            <div className="w-full h-48 bg-zinc-100 dark:bg-[#080808] rounded-xl mb-4 border border-zinc-200 dark:border-zinc-800 overflow-hidden flex items-center justify-center transition-colors group-hover:border-blue-500 dark:group-hover:border-[#00ffcc]">
              <svg className="size-12 text-zinc-300 dark:text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5L16.5 5.5M8 11h8m-8 4h8" /></svg>
            </div>
            <span className="text-[10px] font-mono text-blue-600 dark:text-[#00ffcc] uppercase tracking-widest">
              {lang === 'en' ? 'Product Update' : 'Pembaruan Produk'}
            </span>
            <h3 className="font-bold text-xl mt-2 mb-2 text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-[#00ffcc] transition-colors">
              {lang === 'en' ? 'Introducing the Fiat ↔ Crypto Gateway' : 'Memperkenalkan Gateway Fiat ↔ Kripto'}
            </h3>
            <p className="text-sm text-zinc-500 line-clamp-2">
              {lang === 'en' 
                ? 'How Axeon bridges Web2 users into Web3 native protocols without friction.' 
                : 'Bagaimana Axeon menjembatani pengguna Web2 ke dalam protokol Web3 tanpa hambatan.'}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}