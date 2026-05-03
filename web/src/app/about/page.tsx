"use client";
import React, { useState, useEffect } from 'react';
import { useAxeonStore } from '../../store/useAxeonStore';

export default function AboutPage() {
  const [isClient, setIsClient] = useState(false);
  const { lang } = useAxeonStore();

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsClient(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!isClient) return null;

  return (
    <div className="min-h-screen pt-32 pb-20 selection:bg-blue-500/30 dark:selection:bg-[#00ffcc]/30">
      <main className="max-w-3xl mx-auto px-6 text-center">
        {lang === 'en' ? (
          <>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-zinc-900 dark:text-white">Redefining Community Ownership.</h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-12">Axeon is building the underlying financial operating system for the creator economy. We believe that community builders should have absolute control over their revenue streams, free from the excessive fees of traditional Web2 platforms.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              <div className="p-6 bg-white dark:bg-[#080808] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm"><h3 className="font-bold text-lg mb-2 text-zinc-900 dark:text-white">Our Mission</h3><p className="text-sm text-zinc-500">To bridge Web2 social platforms with Web3 financial infrastructure.</p></div>
              <div className="p-6 bg-white dark:bg-[#080808] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm"><h3 className="font-bold text-lg mb-2 text-zinc-900 dark:text-white">Our Architecture</h3><p className="text-sm text-zinc-500">Built exclusively on Solana for high-throughput and zero-custody routing.</p></div>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-zinc-900 dark:text-white">Mendefinisikan Ulang Kepemilikan Komunitas.</h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-12">Axeon membangun sistem operasi finansial dasar untuk ekonomi kreator. Kami percaya bahwa pembangun komunitas harus memiliki kendali mutlak atas aliran pendapatan mereka, terbebas dari potongan biaya besar platform Web2.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              <div className="p-6 bg-white dark:bg-[#080808] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm"><h3 className="font-bold text-lg mb-2 text-zinc-900 dark:text-white">Misi Kami</h3><p className="text-sm text-zinc-500">Menjembatani platform sosial Web2 dengan infrastruktur finansial Web3.</p></div>
              <div className="p-6 bg-white dark:bg-[#080808] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm"><h3 className="font-bold text-lg mb-2 text-zinc-900 dark:text-white">Arsitektur Kami</h3><p className="text-sm text-zinc-500">Dibangun eksklusif di Solana untuk perutean tanpa kustodian yang cepat.</p></div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}