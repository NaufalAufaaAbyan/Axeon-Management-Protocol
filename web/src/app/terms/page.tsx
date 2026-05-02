"use client";
import React, { useState, useEffect } from 'react';

export default function TermsPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsClient(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!isClient) return null;

  return (
    <div className="min-h-screen pt-32 pb-20 selection:bg-blue-500/30 dark:selection:bg-[#00ffcc]/30">
      <main className="max-w-3xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-zinc-900 dark:text-white">Terms of Service</h1>
          <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Last Updated: May 2026</p>
        </div>

        <article className="prose prose-zinc dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400">
          <p>Welcome to Axeon Management Protocol. By accessing or using our website, you agree to be bound by these terms.</p>

          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">1. Nature of the Protocol</h3>
          <p>Axeon provides a decentralized, zero-custody software infrastructure. We do not hold, manage, or control your funds.</p>

          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">2. Fees</h3>
          <p>Axeon smart contracts automatically deduct a protocol fee from each successful subscription payment routed through our system.</p>
        </article>
      </main>
    </div>
  );
}