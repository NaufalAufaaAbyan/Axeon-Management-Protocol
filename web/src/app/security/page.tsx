"use client";
import React, { useState, useEffect } from 'react';

export default function SecurityPage() {
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
          <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Security & Trust</h1>
          <p className="text-zinc-500">How we protect our protocol and your communities.</p>
        </div>

        <article className="prose prose-zinc dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">Zero-Custody Guarantee</h3>
          <p>
            {/* FIX: Mengubah creator's menjadi creator&apos;s */}
            Axeon is fundamentally designed so that we never have custody of your funds. All USDC and SOL payments are routed directly to the creator&apos;s wallet.
          </p>

          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">Smart Contract Audits</h3>
          <p>
            We are committed to undergoing comprehensive external audits by top-tier security firms before our mainnet-beta release.
          </p>
        </article>
      </main>
    </div>
  );
}