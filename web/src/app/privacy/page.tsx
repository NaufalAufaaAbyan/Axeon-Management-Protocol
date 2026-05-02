"use client";
import React, { useState, useEffect } from 'react';

export default function PrivacyPage() {
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
          <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-zinc-900 dark:text-white">Privacy Policy</h1>
          <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Last Updated: May 2026</p>
        </div>

        <article className="prose prose-zinc dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400">
          <p>At Axeon Management Protocol, we respect your privacy and are committed to protecting it through our compliance with this policy.</p>

          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">1. Information We Collect</h3>
          <p>Because Axeon is built on the Solana blockchain using a zero-custody architecture, we collect minimal personal data.</p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li><strong>Wallet Addresses:</strong> Recorded on-chain.</li>
            <li><strong>Telegram User IDs:</strong> Temporarily processed to grant access.</li>
          </ul>
        </article>
      </main>
    </div>
  );
}