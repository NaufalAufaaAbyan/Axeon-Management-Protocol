"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TermsPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsClient(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-zinc-900 dark:text-zinc-100 transition-colors duration-300 font-sans selection:bg-blue-500/30 dark:selection:bg-[#00ffcc]/30 selection:text-blue-700 dark:selection:text-[#00ffcc]">
      
      {/* ================= SIMPLE NAVBAR ================= */}
      <nav className="sticky top-0 w-full z-50 border-b border-zinc-200 dark:border-white/5 bg-white/80 dark:bg-black/80 backdrop-blur-xl transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 cursor-pointer group">
            <div className="size-2.5 bg-blue-600 dark:bg-[#00ffcc] shadow-[0_0_10px_rgba(37,99,235,0.5)] dark:shadow-[0_0_10px_#00ffcc] group-hover:scale-110 transition-transform" />
            <span className="font-bold tracking-widest text-xs text-zinc-900 dark:text-white transition-colors">AXEON</span>
          </Link>
          <Link href="/login" className="px-4 py-1.5 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white font-bold text-[10px] font-mono uppercase tracking-widest hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors rounded-sm">
            Dashboard
          </Link>
        </div>
      </nav>

      {/* ================= CONTENT ================= */}
      <main className="max-w-3xl mx-auto px-6 py-20">
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-zinc-900 dark:text-white">Terms of Service</h1>
          <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Last Updated: May 2026</p>
        </div>

        <article className="prose prose-zinc dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400">
          <p>
            Welcome to Axeon Management Protocol. By accessing or using our website, smart contracts, or Telegram bot services, you agree to be bound by these Terms of Service.
          </p>

          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">1. Nature of the Protocol</h3>
          <p>
            Axeon provides a decentralized, zero-custody software infrastructure on the Solana blockchain. We do not hold, manage, or control your funds. All payments made through the protocol are peer-to-peer (from the subscriber directly to the community creator). Axeon simply provides the code to facilitate this routing and access management.
          </p>

          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">2. Creator Responsibilities</h3>
          <p>
            If you are a community creator deploying a Vault on Axeon, you agree that:
          </p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>You will not use Axeon to sell illegal, fraudulent, or harmful content.</li>
            <li>You are solely responsible for providing the services or content promised to your subscribers.</li>
            <li>You understand that Axeon is not responsible for any disputes between you and your subscribers.</li>
          </ul>

          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">3. Fees</h3>
          <p>
            Axeon smart contracts automatically deduct a protocol fee (ranging from 1% to 2.5%, depending on your tier) from each successful subscription payment routed through our system. By deploying a vault, you consent to this automated on-chain deduction.
          </p>

          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">4. Disclaimers and Limitation of Liability</h3>
          <p>
            The Axeon Protocol is provided &quot;AS IS&quot;, without warranty of any kind. While our smart contracts are rigorously tested, blockchain technology carries inherent risks. We are not liable for any losses resulting from network outages on Solana, smart contract exploits, or compromised private keys.
          </p>

          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">5. License</h3>
          <p>
            The Axeon Smart Contracts are open-sourced under the MIT License. The frontend web interface and proprietary Telegram bot logic are intellectual property of Axeon Inc.
          </p>
        </article>
      </main>

    </div>
  );
}