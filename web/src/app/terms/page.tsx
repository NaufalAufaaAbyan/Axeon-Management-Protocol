"use client";
import React, { useState, useEffect } from 'react';
import { useAxeonStore } from '../../store/useAxeonStore';

export default function TermsPage() {
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
            {lang === 'en' ? 'Terms of Service' : 'Syarat & Ketentuan'}
          </h1>
          <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
            {lang === 'en' ? 'Last Updated: May 2026' : 'Terakhir Diperbarui: Mei 2026'}
          </p>
        </div>

        <article className="prose prose-zinc dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400">
          {lang === 'en' ? (
            <>
              <p>Welcome to Axeon Management Protocol. By accessing or using our website and smart contracts, you agree to be bound by these terms.</p>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">1. Nature of the Protocol</h3>
              <p>Axeon provides a decentralized, zero-custody software infrastructure. We do not hold, manage, or control your funds. All transactions are settled directly peer-to-peer on the Solana blockchain.</p>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">2. Protocol Fees</h3>
              <p>Axeon smart contracts automatically deduct a protocol fee (ranging from 1% to 2.5% depending on your tier) from each successful subscription payment routed through our system.</p>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">3. Responsibility</h3>
              <p>Creators are solely responsible for delivering the content or access promised to their subscribers. Axeon is not liable for disputes between creators and subscribers.</p>
            </>
          ) : (
            <>
              <p>Selamat datang di Axeon Management Protocol. Dengan mengakses atau menggunakan situs web dan smart contract kami, Anda setuju untuk terikat oleh ketentuan ini.</p>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">1. Sifat Protokol</h3>
              <p>Axeon menyediakan infrastruktur perangkat lunak yang terdesentralisasi dan tanpa kustodian. Kami tidak menahan, mengelola, atau mengendalikan dana Anda. Semua transaksi diselesaikan langsung secara peer-to-peer di blockchain Solana.</p>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">2. Biaya Protokol</h3>
              <p>Smart contract Axeon secara otomatis memotong biaya protokol (berkisar antara 1% hingga 2.5% tergantung pada tingkat paket Anda) dari setiap pembayaran langganan yang berhasil dirutekan melalui sistem kami.</p>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">3. Tanggung Jawab</h3>
              <p>Kreator bertanggung jawab penuh untuk memberikan konten atau akses yang dijanjikan kepada pelanggan mereka. Axeon tidak bertanggung jawab atas perselisihan antara kreator dan pelanggan.</p>
            </>
          )}
        </article>
      </main>
    </div>
  );
}