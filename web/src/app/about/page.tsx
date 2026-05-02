"use client";
import React, { useState, useEffect } from 'react';

export default function AboutPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsClient(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!isClient) return null;

  return (
    <div className="min-h-screen pt-32 pb-20 selection:bg-blue-500/30 dark:selection:bg-[#00ffcc]/30">
      <main className="max-w-3xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Redefining Community Ownership.</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-12">
          Axeon Inc. is building the underlying financial operating system for the creator economy. We believe that community builders should have absolute control over their revenue streams.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
          <div className="p-6 bg-zinc-50 dark:bg-[#080808] border border-zinc-200 dark:border-zinc-800 rounded-xl">
            <h3 className="font-bold text-lg mb-2">Our Mission</h3>
            <p className="text-sm text-zinc-500">To bridge Web2 social platforms with Web3 financial infrastructure.</p>
          </div>
          <div className="p-6 bg-zinc-50 dark:bg-[#080808] border border-zinc-200 dark:border-zinc-800 rounded-xl">
            <h3 className="font-bold text-lg mb-2">Our Architecture</h3>
            <p className="text-sm text-zinc-500">Built exclusively on Solana for high-throughput, low-latency state changes.</p>
          </div>
        </div>
      </main>
    </div>
  );
}