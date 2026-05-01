"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SecurityPage() {
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
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Security & Trust</h1>
          <p className="text-zinc-500">How we protect our protocol and your communities.</p>
        </div>

        <article className="prose prose-zinc dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">Zero-Custody Guarantee</h3>
          <p>
            Axeon is fundamentally designed so that we never have custody of your funds. All USDC and SOL payments are routed deterministically via Anchor Program Derived Addresses (PDAs) directly to the creator&apos;s specified wallet in the same transaction.
          </p>

          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">Smart Contract Audits</h3>
          <p>
            The Axeon Protocol v1.0 smart contracts are currently in the internal auditing phase. We are committed to undergoing comprehensive external audits by top-tier security firms before our mainnet-beta release.
          </p>

          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">Bug Bounty Program</h3>
          <p>
            We believe in the power of the open-source community. Once deployed on mainnet, Axeon will launch a Bug Bounty program to reward independent security researchers who responsibly disclose vulnerabilities. If you find a security issue on our Devnet build, please contact us securely via our GitHub repository.
          </p>
        </article>
      </main>
    </div>
  );
}