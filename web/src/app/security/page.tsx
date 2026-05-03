"use client";
import React, { useState, useEffect } from 'react';
import { useAxeonStore } from '../../store/useAxeonStore';

export default function SecurityPage() {
  const [isClient, setIsClient] = useState(false);
  const { lang } = useAxeonStore();

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsClient(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!isClient) return null;

  return (
    <div className="min-h-screen pt-32 pb-20 selection:bg-blue-500/30 dark:selection:bg-[#00ffcc]/30">
      <main className="max-w-3xl mx-auto px-6">
        <div className="mb-12 border-b border-zinc-200 dark:border-zinc-800 pb-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-zinc-900 dark:text-white">
            {lang === 'en' ? 'Security & Trust' : 'Keamanan & Kepercayaan'}
          </h1>
          <p className="text-zinc-500">
            {lang === 'en' ? 'How we protect our protocol and your communities.' : 'Bagaimana kami melindungi protokol dan komunitas Anda.'}
          </p>
        </div>

        <article className="prose prose-zinc dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400">
          {lang === 'en' ? (
            <>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">Zero-Custody Guarantee</h3>
              <p>Axeon is fundamentally designed so that we never have custody of your funds. All USDC and SOL payments are routed directly to the creator&apos;s wallet via immutable smart contracts.</p>
              
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">Smart Contract Audits</h3>
              <p>Security is our top priority. We are committed to undergoing comprehensive external audits by top-tier security firms before our mainnet release to ensure all PDAs (Program Derived Addresses) are secure.</p>
            </>
          ) : (
            <>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">Jaminan Tanpa Kustodian</h3>
              <p>Axeon pada dasarnya dirancang agar kami tidak pernah memegang dana Anda. Semua pembayaran USDC dan SOL dirutekan langsung ke dompet kreator melalui smart contract yang tidak dapat diubah (immutable).</p>
              
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">Audit Smart Contract</h3>
              <p>Keamanan adalah prioritas utama kami. Kami berkomitmen untuk menjalani audit eksternal komprehensif oleh firma keamanan tingkat atas sebelum rilis mainnet kami untuk memastikan semua PDA (Program Derived Address) aman.</p>
            </>
          )}
        </article>
      </main>
    </div>
  );
}