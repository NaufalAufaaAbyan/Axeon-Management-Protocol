"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
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
          <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-zinc-900 dark:text-white">Privacy Policy</h1>
          <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Last Updated: May 2026</p>
        </div>

        <article className="prose prose-zinc dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400">
          <p>
            At Axeon Management Protocol (&quot;Axeon&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), we respect your privacy and are committed to protecting it through our compliance with this policy. This policy describes the types of information we may collect from you or that you may provide when you visit our website and use our smart contract infrastructure.
          </p>

          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">1. Information We Collect</h3>
          <p>
            Because Axeon is built on the Solana blockchain using a zero-custody architecture, we collect minimal personal data. We do not require a traditional email or password registration for users paying with cryptocurrency.
          </p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li><strong>Wallet Addresses:</strong> When you connect your Solana wallet (e.g., Phantom, Solflare), your public wallet address is recorded on-chain.</li>
            <li><strong>Telegram User IDs:</strong> If you use the Axeon Sentinel Bot, we temporarily process your Telegram User ID to grant or revoke access to premium communities.</li>
            <li><strong>Fiat Gateway Data:</strong> If you use our Fiat On-Ramp, payment details are processed securely by our third-party providers (e.g., Stripe). Axeon does not store your credit card information.</li>
          </ul>

          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">2. The Public Nature of Blockchains</h3>
          <p>
            Please note that blockchain networks are public and decentralized. Any transactions you execute using Axeon smart contracts (including subscription payments, vault creation, and wallet addresses) are permanently recorded on the Solana blockchain and are visible to the public. We do not control this public ledger and cannot delete or alter on-chain data.
          </p>

          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">3. How We Use Your Information</h3>
          <p>
            We use the minimal information we collect to:
          </p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>Verify your payment status on-chain.</li>
            <li>Automate access management in your designated Telegram or Discord groups.</li>
            <li>Improve the performance and security of our protocol.</li>
          </ul>

          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">4. Contact Us</h3>
          <p>
            If you have any questions about this Privacy Policy, please contact us via our GitHub Repository or Superteam Discord channels.
          </p>
        </article>
      </main>

    </div>
  );
}