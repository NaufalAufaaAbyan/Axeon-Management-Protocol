"use client";
import React, { useState, useEffect } from 'react';
import { useAxeonStore } from '../../store/useAxeonStore';

export default function DocumentationPage() {
  const [isClient, setIsClient] = useState(false);
  const { lang } = useAxeonStore();

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsClient(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!isClient) return null;

  return (
    <div className="min-h-screen pt-24 pb-20 selection:bg-blue-500/30 dark:selection:bg-[#00ffcc]/30 bg-white dark:bg-[#020202]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-start gap-12">
        
        <aside className="w-full md:w-64 shrink-0 md:sticky md:top-28 space-y-8 hidden md:block border-r border-zinc-200 dark:border-white/5 pr-6 h-[calc(100vh-8rem)] overflow-y-auto">
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest mb-4 text-zinc-900 dark:text-white">
              {lang === 'en' ? 'Getting Started' : 'Mulai Cepat'}
            </h4>
            <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
              <li><a href="#introduction" className="text-blue-600 dark:text-[#00ffcc] font-medium">{lang === 'en' ? 'Introduction' : 'Pengantar'}</a></li>
              <li><a href="#architecture" className="hover:text-zinc-900 dark:hover:text-white transition-colors">{lang === 'en' ? 'Architecture' : 'Arsitektur'}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest mb-4 text-zinc-900 dark:text-white">
              {lang === 'en' ? 'Smart Contracts' : 'Smart Contract'}
            </h4>
            <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
              <li><a href="#deploy-vault" className="hover:text-zinc-900 dark:hover:text-white transition-colors">{lang === 'en' ? 'Deploying a Vault' : 'Deploy Brankas'}</a></li>
              <li><a href="#subscription" className="hover:text-zinc-900 dark:hover:text-white transition-colors">{lang === 'en' ? 'Subscription Logic' : 'Logika Berlangganan'}</a></li>
            </ul>
          </div>
        </aside>

        <main className="flex-1 max-w-3xl">
          <div className="mb-4 flex items-center gap-2">
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-[#00ffcc] text-[10px] font-mono font-bold uppercase tracking-widest rounded">v1.0.0</span>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              {lang === 'en' ? 'Last updated: May 2026' : 'Terakhir diperbarui: Mei 2026'}
            </span>
          </div>
          
          <h1 id="introduction" className="text-4xl font-bold mb-6 tracking-tight text-zinc-900 dark:text-white">Axeon Protocol</h1>
          
          {lang === 'en' ? (
            <>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8 text-lg">
                Axeon is a stateless, zero-custody infrastructure built on the Solana blockchain. It enables creators to monetize digital communities (like Telegram) through programmable, deterministic smart contracts.
              </p>
              <hr className="border-zinc-200 dark:border-white/5 my-12" />
              <h2 id="architecture" className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">Vault Architecture</h2>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                Every community on Axeon operates through an isolated Program Derived Address (PDA) known as a <strong>Vault</strong>. Funds flow directly from subscribers into your Vault without intermediaries. The Axeon Sentinel Bot continuously reads the on-chain state to manage access.
              </p>
            </>
          ) : (
            <>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8 text-lg">
                Axeon adalah infrastruktur tanpa status (stateless) dan tanpa kustodian yang dibangun di atas blockchain Solana. Ini memungkinkan kreator untuk memonetisasi komunitas digital (seperti Telegram) melalui smart contract yang dapat diprogram.
              </p>
              <hr className="border-zinc-200 dark:border-white/5 my-12" />
              <h2 id="architecture" className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">Arsitektur Brankas</h2>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                Setiap komunitas di Axeon beroperasi melalui Program Derived Address (PDA) terisolasi yang disebut <strong>Brankas (Vault)</strong>. Dana mengalir langsung dari pelanggan ke Brankas Anda tanpa perantara. Axeon Sentinel Bot terus membaca status on-chain untuk mengelola akses.
              </p>
            </>
          )}
          
          <h3 id="deploy-vault" className="text-xl font-bold mb-4 mt-10 text-zinc-900 dark:text-white">
            {lang === 'en' ? '1. Core Smart Contract (Rust)' : '1. Smart Contract Inti (Rust)'}
          </h3>
          <p className="text-sm text-zinc-500 mb-4">
            {lang === 'en' ? 'Below is the core Anchor instruction for initializing a Vault:' : 'Di bawah ini adalah instruksi inti Anchor untuk menginisialisasi Brankas:'}
          </p>

          <div className="bg-zinc-50 dark:bg-[#080808] border border-zinc-200 dark:border-white/10 rounded-xl overflow-hidden mb-12 shadow-sm">
            <div className="bg-zinc-100 dark:bg-white/5 px-4 py-3 border-b border-zinc-200 dark:border-white/5 flex items-center gap-2">
              <span className="text-[10px] font-mono text-zinc-500">lib.rs (Anchor)</span>
            </div>
            {/* FIX: Perbaikan kurung kurawal JSX yang mengganggu text node */}
            <div className="p-5 overflow-x-auto text-sm font-mono text-zinc-800 dark:text-zinc-300 leading-relaxed">
<pre><code><span className="text-pink-600 dark:text-pink-400">pub fn</span> <span className="text-blue-600 dark:text-blue-400">initialize_vault</span>(
    ctx: Context&lt;InitializeVault&gt;, 
    price: <span className="text-emerald-600 dark:text-emerald-400">u64</span>, 
    platform: <span className="text-emerald-600 dark:text-emerald-400">String</span>
) -&gt; <span className="text-emerald-600 dark:text-emerald-400">Result</span>&lt;()&gt; {'{'}
    <span className="text-pink-600 dark:text-pink-400">let</span> vault = &amp;<span className="text-pink-600 dark:text-pink-400">mut</span> ctx.accounts.vault;
    vault.authority = ctx.accounts.authority.key();
    vault.price = price;
    vault.platform = platform;
    
    <span className="text-zinc-500">{"// Emit event for Sentinel Bot"}</span>
    <span className="text-blue-600 dark:text-[#00ffcc]">emit!</span>(VaultCreatedEvent {'{'}
        vault_key: vault.key(),
        authority: vault.authority,
    {'}'});

    <span className="text-blue-600 dark:text-blue-400">Ok</span>(())
{'}'}</code></pre>
            </div>
          </div>

          <h3 id="subscription" className="text-xl font-bold mb-4 text-zinc-900 dark:text-white">
            {lang === 'en' ? '2. Client Integration (JS/TS)' : '2. Integrasi Klien (JS/TS)'}
          </h3>
          <p className="text-sm text-zinc-500 mb-4">
            {lang === 'en' ? 'Connecting to the protocol via the Solana Web3.js provider:' : 'Menghubungkan ke protokol melalui penyedia Solana Web3.js:'}
          </p>

          <div className="bg-zinc-50 dark:bg-[#080808] border border-zinc-200 dark:border-white/10 rounded-xl overflow-hidden mb-8 shadow-sm">
            <div className="bg-zinc-100 dark:bg-white/5 px-4 py-3 border-b border-zinc-200 dark:border-white/5 flex items-center gap-2">
              <span className="text-[10px] font-mono text-zinc-500">client.ts</span>
            </div>
            {/* FIX: Perbaikan kutipan tunggal (apos) */}
            <div className="p-5 overflow-x-auto text-sm font-mono text-zinc-800 dark:text-zinc-300 leading-relaxed">
<pre><code><span className="text-pink-600 dark:text-pink-400">const</span> <span className="text-blue-600 dark:text-blue-400">subscribeToVault</span> = <span className="text-pink-600 dark:text-pink-400">async</span> (vaultPda, wallet) =&gt; {'{'}
  <span className="text-pink-600 dark:text-pink-400">const</span> tx = <span className="text-pink-600 dark:text-pink-400">await</span> program.methods
    .subscribe()
    .accounts({'{'}
      vault: vaultPda,
      subscriber: wallet.publicKey,
      systemProgram: web3.SystemProgram.programId,
    {'}'})
    .rpc();
    
  <span className="text-blue-600 dark:text-blue-400">console</span>.log(<span className="text-emerald-600 dark:text-[#00ffcc]">&apos;Subscription successful: &apos;</span>, tx);
{'}'};</code></pre>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}