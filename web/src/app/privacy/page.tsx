"use client";
import React, { useState, useEffect } from 'react';
import { useAxeonStore } from '../../store/useAxeonStore';

export default function PrivacyPage() {
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
            {lang === 'en' ? 'Privacy Policy' : 'Kebijakan Privasi'}
          </h1>
          <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
            {lang === 'en' ? 'Last Updated: May 2026' : 'Terakhir Diperbarui: Mei 2026'}
          </p>
        </div>

        <article className="prose prose-zinc dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400">
          {lang === 'en' ? (
            <>
              <p>At Axeon Management Protocol, we respect your privacy and are committed to protecting it through our compliance with this policy.</p>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">1. Information We Collect</h3>
              <p>Because Axeon is built on the Solana blockchain using a zero-custody architecture, we collect minimal personal data.</p>
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li><strong>Wallet Addresses:</strong> Recorded transparently on-chain.</li>
                <li><strong>Telegram User IDs:</strong> Temporarily processed to grant access and removed upon subscription expiry.</li>
                <li><strong>Email Addresses:</strong> Only collected if you opt-in for Web2 gateway authentication.</li>
              </ul>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">2. How We Use Your Data</h3>
              <p>We use your data solely to provide, maintain, and improve the protocol. We do not sell your personal data to third parties.</p>
            </>
          ) : (
            <>
              <p>Di Axeon Management Protocol, kami menghormati privasi Anda dan berkomitmen untuk melindunginya melalui kepatuhan kami terhadap kebijakan ini.</p>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">1. Informasi yang Kami Kumpulkan</h3>
              <p>Karena Axeon dibangun di atas blockchain Solana menggunakan arsitektur zero-custody, kami mengumpulkan data pribadi seminimal mungkin.</p>
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li><strong>Alamat Dompet:</strong> Dicatat secara transparan di dalam jaringan (on-chain).</li>
                <li><strong>ID Pengguna Telegram:</strong> Diproses sementara untuk memberikan akses dan dihapus saat langganan berakhir.</li>
                <li><strong>Alamat Email:</strong> Hanya dikumpulkan jika Anda memilih untuk menggunakan autentikasi gateway Web2.</li>
              </ul>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">2. Bagaimana Kami Menggunakan Data Anda</h3>
              <p>Kami menggunakan data Anda hanya untuk menyediakan, memelihara, dan meningkatkan protokol. Kami tidak menjual data pribadi Anda kepada pihak ketiga.</p>
            </>
          )}
        </article>
      </main>
    </div>
  );
}