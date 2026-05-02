"use client";
import React, { useState, useEffect } from 'react';

export default function DocumentationPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsClient(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!isClient) return null;

  return (
    <div className="min-h-screen pt-24 pb-20 selection:bg-blue-500/30 dark:selection:bg-[#00ffcc]/30">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-start gap-12">
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
            </ul>
          </div>
        </aside>

        <main className="flex-1 max-w-3xl">
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
            Every community on Axeon operates through an isolated Program Derived Address (PDA) known as a <strong>Vault</strong>. Funds flow directly from subscribers into your Vault.
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
    <span className="text-blue-600 dark:text-blue-400">Ok</span>((){'\n'}
{'}'}
                </code>
              </pre>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}