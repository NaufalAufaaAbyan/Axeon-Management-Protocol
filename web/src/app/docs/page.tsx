"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DocumentationPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // FIX 1: Gunakan requestAnimationFrame
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
            <span className="font-bold tracking-widest text-xs text-zinc-900 dark:text-white transition-colors">AXEON <span className="text-zinc-400 font-normal">DOCS</span></span>
          </Link>
          <Link href="/login" className="px-4 py-1.5 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white font-bold text-[10px] font-mono uppercase tracking-widest hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors rounded-sm">
            Dashboard
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-start gap-12 py-12">
        
        {/* ================= SIDEBAR NAVIGATION ================= */}
        <aside className="w-full md:w-64 shrink-0 md:sticky md:top-28 space-y-8">
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest mb-4 text-zinc-900 dark:text-white">Getting Started</h4>
            <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
              <li><a href="#introduction" className="text-blue-600 dark:text-[#00ffcc] font-medium">Introduction</a></li>
              <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Quickstart Guide</a></li>
              <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Architecture Overview</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest mb-4 text-zinc-900 dark:text-white">Smart Contracts</h4>
            <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
              <li><a href="#vault-deployment" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Vault Deployment</a></li>
              <li><a href="#subscription-logic" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Subscription Logic</a></li>
              <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Security & Audits</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest mb-4 text-zinc-900 dark:text-white">Bot Integration</h4>
            <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
              <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Axeon Sentinel Setup</a></li>
              <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Webhook Configuration</a></li>
            </ul>
          </div>
        </aside>

        {/* ================= MAIN CONTENT ================= */}
        <main className="flex-1 max-w-3xl pb-24">
          
          <div className="mb-4 flex items-center gap-2">
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-[10px] font-mono font-bold uppercase tracking-widest rounded">v1.0.0</span>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Last updated: May 2026</span>
          </div>
          
          <h1 id="introduction" className="text-4xl font-bold mb-6 tracking-tight text-zinc-900 dark:text-white">Axeon Management Protocol</h1>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8 text-lg">
            Axeon is a stateless, zero-custody infrastructure built on the Solana blockchain. It enables creators to monetize digital communities (like Telegram and Discord) through programmable, deterministic smart contracts.
          </p>

          <hr className="border-zinc-200 dark:border-zinc-800 my-12" />

          <h2 id="vault-deployment" className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">Vault Deployment</h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
            Every community on Axeon operates through an isolated Program Derived Address (PDA) known as a <strong>Vault</strong>. As the creator, you are the sole authority over this Vault. Funds flow directly from subscribers into your Vault, completely bypassing any Axeon intermediary wallets.
          </p>
          
          <div className="bg-zinc-50 dark:bg-[#080808] border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden mb-8">
            <div className="bg-zinc-100 dark:bg-zinc-900/50 px-4 py-2 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-2">
              <span className="text-[10px] font-mono text-zinc-500">lib.rs</span>
            </div>
            <div className="p-4 overflow-x-auto">
              <pre className="text-sm font-mono text-zinc-800 dark:text-zinc-300">
                <code>
<span className="text-pink-600 dark:text-pink-400">pub fn</span> <span className="text-blue-600 dark:text-blue-400">initialize_vault</span>(ctx: Context&lt;InitializeVault&gt;, fee: <span className="text-emerald-600 dark:text-emerald-400">u64</span>) -&gt; <span className="text-emerald-600 dark:text-emerald-400">Result</span>&lt;()&gt; {'{\n'}
    <span className="text-pink-600 dark:text-pink-400">let</span> vault = &amp;<span className="text-pink-600 dark:text-pink-400">mut</span> ctx.accounts.vault;{'\n'}
    vault.authority = ctx.accounts.authority.key();{'\n'}
    vault.subscription_fee = fee;{'\n'}
    vault.active_subscribers = <span className="text-orange-500 dark:text-orange-300">0</span>;{'\n'}
    <span className="text-blue-600 dark:text-blue-400">Ok</span>((){'\n'}
{'}'}
                </code>
              </pre>
            </div>
          </div>

          <h2 id="subscription-logic" className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">Subscription Logic</h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
            When a user subscribes, a unique <code>UserSubscription</code> PDA is initialized. This account stores the exact Unix timestamp of their expiration.
          </p>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-600 dark:border-[#00ffcc] rounded-r-lg mb-12">
            <h4 className="font-bold text-sm text-blue-900 dark:text-blue-100 mb-1">Architecture Note</h4>
            <p className="text-sm text-blue-800 dark:text-blue-200/80">
              By storing the expiration timestamp directly on the Solana state, our Telegram Sentinel Bot does not need a traditional database to know when to kick a user. It simply reads the RPC state.
            </p>
          </div>

          <h3 className="text-xl font-bold mb-4 text-zinc-900 dark:text-white">Payment Routing</h3>
          {/* FIX 2: Escaping the single quote on "user's" */}
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
            Axeon supports both native SPL Token transfers (e.g., USDC) and Fiat On-Ramps. For fiat transactions, the payment processor converts the user&apos;s credit card payment into USDC, which is then routed through our Anchor program to trigger the <code>subscribe</code> instruction.
          </p>

        </main>
      </div>
    </div>
  );
}