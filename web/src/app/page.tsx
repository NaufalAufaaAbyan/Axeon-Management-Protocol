"use client";
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Shuffle from './components/magic/Shuffle';
import GooeyNav from './components/magic/GooeyNav';
import ClickSpark from './components/magic/ClickSpark';

const DotField = dynamic(() => import('./components/magic/DotField'), { ssr: false });

type Lang = 'en' | 'id';

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<Lang>('en');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsClient(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const t = {
    en: {
      nav: ["Protocol", "Architecture", "Guide", "Pricing"],
      badge: "Axeon V1 Mainnet Beta",
      heroTitle1: "COMMUNITY MONETIZATION.",
      heroTitle2: "FULLY AUTONOMOUS.",
      heroSub: "Axeon Protocol is an institutional-grade infrastructure for premium communities. We bridge Fiat (QRIS) to Solana, automate subscription verifications, and execute zero-gas expiry sweeps via smart contracts.",
      btnStart: "Launch Dashboard",
      btnDocs: "Read Whitepaper",
      
      whatTag: "The Problem & Solution",
      whatTitle: "The Operational Nightmare, Solved.",
      whatDesc: "Managing paid Telegram or Discord groups manually is unscalable. Axeon standardizes the entire lifecycle—from payment to access revocation—trustlessly on the Solana blockchain.",
      vsOld: "The Old Way (Manual)",
      vsOld1: "Checking bank mutations manually.",
      vsOld2: "Fake transfer receipts & group leakage.",
      vsOld3: "Forgetting to kick expired members.",
      vsNew: "The Axeon Way (Automated)",
      vsNew1: "Instant QRIS-to-Stablecoin settlement.",
      vsNew2: "Cryptographic PDA verification.",
      vsNew3: "Precision 60-second auto-sweep & kick.",

      b1Tag: "01 / Infrastructure",
      b1Title: "The Sentinel Engine.",
      b1Desc: "Our off-chain workers synchronize with Solana PDA states every 60 seconds. This ensures absolute membership precision, instantly revoking access the exact minute a subscription expires.",
      b2Tag: "02 / Security",
      b2Title: "Non-Custodial Vaults.",
      b2Desc: "Axeon never touches your community's liquidity. All subscription intent is routed directly to your personal decentralized wallet via Program Derived Addresses.",
      b3Tag: "03 / Gateway",
      b3Title: "Hybrid Fiat-to-Web3.",
      b3Desc: "Remove friction for Web2 users. Accept local Bank/QRIS payments that are instantly auto-swapped into USDC on Solana, protecting your revenue from crypto volatility.",
      b4Tag: "04 / Automation",
      b4Title: "Proactive Retention.",
      b4Desc: "Prevent churn autonomously. The Sentinel Bot automatically dispatches localized Telegram Direct Messages from H-3 to H-1 before a member's active period concludes.",
      
      guideTag: "Integration Guide",
      guideTitle: "Deploy in Minutes. Zero Code.",
      guideDesc: "Launch your decentralized monetization layer effortlessly. From smart contract deployment to Telegram integration in 4 simple steps.",
      g1: "1. Deploy Vault",
      g1Desc: "Connect your Solana wallet and initialize your non-custodial PDA vault via our dashboard.",
      g2: "2. Add Sentinel Bot",
      g2Desc: "Invite Axeon Bot to your Telegram group and grant it basic moderation permissions.",
      g3: "3. Share Payment Link",
      g3Desc: "Members pay via your unique Axeon link using Crypto or local Fiat (QRIS/Bank Transfer).",
      g4: "4. Auto-Pilot Active",
      g4Desc: "Axeon automatically manages entry, sends renewal DMs, and revokes access upon expiry.",

      faqTag: "F.A.Q",
      faqTitle: "Common Questions.",
      faqDesc: "Everything you need to know about Axeon Protocol.",
      faqs: [
        { q: "Are the funds held by Axeon?", a: "No. Axeon is strictly non-custodial. All payments are routed directly to your configured Solana wallet via our smart contracts." },
        { q: "How does Fiat (QRIS) payment work with Solana?", a: "When a user pays via QRIS, our backend payment gateway processes the Fiat and instantly auto-swaps it into USDC on the Solana network to trigger the access protocol." },
        { q: "Do I need technical or coding knowledge to use this?", a: "Not at all. Our dashboard abstracts all the blockchain complexity. If you can manage a Telegram group, you can deploy Axeon." },
        { q: "What happens if the bot goes offline?", a: "Your data remains safe on-chain within the PDA. Once the bot reconnects, it will automatically sync with the blockchain state and execute any pending kicks." }
      ],

      pricingTitle: "Transparent Pricing Model",
      pricingSub: "Scale your community without operational bottlenecks.",
    },
    id: {
      nav: ["Protokol", "Arsitektur", "Panduan", "Harga"],
      badge: "Axeon V1 Mainnet Beta",
      heroTitle1: "MONETISASI KOMUNITAS.",
      heroTitle2: "SEPENUHNYA OTONOM.",
      heroSub: "Axeon Protocol adalah infrastruktur tingkat institusi untuk komunitas premium. Kami menjembatani Fiat (QRIS) ke Solana, mengotomatisasi verifikasi, dan mengeksekusi pencabutan akses secara presisi via smart contract.",
      btnStart: "Buka Dashboard",
      btnDocs: "Baca Whitepaper",
      
      whatTag: "Masalah & Solusi",
      whatTitle: "Mimpi Buruk Operasional, Terpecahkan.",
      whatDesc: "Mengelola grup Telegram berbayar secara manual memakan waktu. Axeon menstandarisasi seluruh siklus—dari pembayaran hingga pencabutan akses—secara transparan di blockchain Solana.",
      vsOld: "Cara Lama (Manual)",
      vsOld1: "Mengecek mutasi bank satu per satu.",
      vsOld2: "Bukti transfer palsu & link bocor.",
      vsOld3: "Lupa mengeluarkan member yang kedaluwarsa.",
      vsNew: "Sistem Axeon (Otomatis)",
      vsNew1: "Penyelesaian QRIS-ke-Stablecoin instan.",
      vsNew2: "Verifikasi kriptografis menggunakan PDA.",
      vsNew3: "Auto-kick presisi setiap 60 detik.",

      b1Tag: "01 / Infrastruktur",
      b1Title: "Mesin Sentinel.",
      b1Desc: "Sistem kami sinkronisasi dengan status PDA Solana setiap 60 detik. Ini memastikan presisi keanggotaan absolut, mencabut akses tepat pada menit masa langganan habis.",
      b2Tag: "02 / Keamanan",
      b2Title: "Brankas Non-Kustodial.",
      b2Desc: "Axeon tidak pernah menyentuh dana komunitas Anda. Semua pembayaran dirutekan langsung ke dompet pribadi Anda menggunakan Program Derived Addresses (PDA).",
      b3Tag: "03 / Gerbang Pembayaran",
      b3Title: "Hibrida Fiat & Web3.",
      b3Desc: "Hilangkan hambatan bagi pengguna Web2. Terima pembayaran Bank/QRIS lokal yang langsung di-swap menjadi USDC di Solana, melindungi pendapatan Anda dari volatilitas.",
      b4Tag: "04 / Otomatisasi",
      b4Title: "Retensi Proaktif.",
      b4Desc: "Cegah member berhenti berlangganan. Bot Sentinel mengirimkan pesan pengingat otomatis via Telegram DM dari H-3 hingga H-1 sebelum masa aktif berakhir.",
      
      guideTag: "Panduan Integrasi",
      guideTitle: "Deploy dalam Hitungan Menit.",
      guideDesc: "Luncurkan lapisan monetisasi terdesentralisasi Anda tanpa hambatan. Dari deploy smart contract hingga integrasi Telegram dalam 4 langkah mudah.",
      g1: "1. Deploy Brankas",
      g1Desc: "Hubungkan dompet Solana Anda dan inisialisasi brankas PDA non-kustodial Anda melalui dashboard kami.",
      g2: "2. Tambahkan Bot Sentinel",
      g2Desc: "Undang Bot Axeon ke grup Telegram Anda dan berikan izin moderasi dasar.",
      g3: "3. Bagikan Link Akses",
      g3Desc: "Member membayar melalui tautan unik Axeon Anda menggunakan Kripto atau Fiat lokal (QRIS/Transfer Bank).",
      g4: "4. Auto-Pilot Aktif",
      g4Desc: "Axeon mengelola akses masuk, mengirim DM perpanjangan, dan mencabut akses otomatis saat kedaluwarsa.",

      faqTag: "F.A.Q",
      faqTitle: "Pertanyaan Umum.",
      faqDesc: "Semua yang perlu Anda ketahui tentang Axeon Protocol.",
      faqs: [
        { q: "Apakah dana disimpan oleh Axeon?", a: "Tidak. Axeon sepenuhnya non-kustodial. Semua pembayaran dialirkan langsung ke dompet Solana yang Anda konfigurasikan melalui smart contract kami." },
        { q: "Bagaimana cara kerja pembayaran Fiat (QRIS) dengan Solana?", a: "Saat pengguna membayar via QRIS, payment gateway backend kami memproses Fiat tersebut dan secara instan menukarnya (auto-swap) menjadi USDC di jaringan Solana untuk memicu protokol." },
        { q: "Apakah saya butuh kemampuan coding untuk menggunakan ini?", a: "Sama sekali tidak. Dashboard kami menyederhanakan semua kerumitan blockchain. Jika Anda bisa mengelola grup Telegram, Anda bisa menggunakan Axeon." },
        { q: "Apa yang terjadi jika bot offline/mati?", a: "Data masa aktif Anda tetap aman secara on-chain di dalam PDA. Saat bot kembali online, ia akan otomatis sinkronisasi dengan status blockchain dan mengeksekusi pengeluaran member yang tertunda." }
      ],

      pricingTitle: "Model Harga Transparan",
      pricingSub: "Skalakan komunitas Anda tanpa hambatan operasional.",
    }
  };

  const navItems = [
    { label: t[lang].nav[0], href: "#protocol" },
    { label: t[lang].nav[1], href: "#architecture" },
    { label: t[lang].nav[2], href: "#guide" },
    { label: t[lang].nav[3], href: "#pricing" }
  ];

  if (!isClient) return <main className="min-h-screen bg-[#020617]" />;

  return (
    <main className="relative w-full bg-[#020617] text-zinc-100 font-sans selection:bg-cyan-500/30 overflow-x-hidden min-h-screen flex flex-col">
      <ClickSpark sparkColor="#22d3ee" sparkSize={12} sparkRadius={24} sparkCount={10}>
        
        {/* ================= BACKGROUND ================= */}
        <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
           <DotField dotRadius={1} dotSpacing={22} glowColor="#0891b2" gradientFrom="#22d3ee" gradientTo="#020617" />
        </div>
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none -z-10" aria-hidden="true" />

        {/* ================= HEADER ================= */}
        <header className="fixed top-0 w-full z-50 flex justify-center pt-6 px-6">
          <div className="w-full max-w-6xl flex items-center justify-between bg-zinc-950/70 backdrop-blur-2xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] px-6 py-2.5 rounded-full transition-all duration-300">
            <Link href="#" className="flex items-center gap-2 group cursor-pointer" aria-label="Home">
              <div className="size-2.5 bg-cyan-400 rounded-sm shadow-[0_0_15px_#22d3ee]" />
              <span className="font-black italic text-lg tracking-tighter uppercase text-white">Axeon</span>
            </Link>
            
            <div className="hidden lg:block -ml-8"><GooeyNav items={navItems} /></div>

            <div className="flex items-center gap-3">
              <div className="flex items-center bg-zinc-900/80 border border-white/5 rounded-full p-0.5">
                <button aria-label="Switch to English" onClick={() => setLang('en')} className={`px-3 py-1.5 rounded-full text-[9px] font-bold tracking-widest transition-all ${lang === 'en' ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(34,211,238,0.3)]' : 'text-zinc-500 hover:text-white'}`}>EN</button>
                <button aria-label="Switch to Indonesian" onClick={() => setLang('id')} className={`px-3 py-1.5 rounded-full text-[9px] font-bold tracking-widest transition-all ${lang === 'id' ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(34,211,238,0.3)]' : 'text-zinc-500 hover:text-white'}`}>ID</button>
              </div>
              <Link href="/login" className="hidden sm:block px-7 py-2.5 bg-zinc-100 text-zinc-950 font-black text-[10px] uppercase tracking-widest rounded-full hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all">
                {t[lang].btnStart}
              </Link>
              <button aria-label="Toggle Menu" onClick={(e) => { e.stopPropagation(); setMobileMenuOpen(!mobileMenuOpen); }} className="lg:hidden p-2 flex flex-col gap-1.5 opacity-70 hover:opacity-100 transition-opacity">
                <div className={`h-px w-6 bg-zinc-100 transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.75' : ''}`} />
                <div className={`h-px w-6 bg-zinc-100 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                <div className={`h-px w-6 bg-zinc-100 transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.75' : ''}`} />
              </button>
            </div>
          </div>
        </header>

        {/* ================= MOBILE MENU ================= */}
        <div className={`fixed inset-0 bg-[#020617]/98 backdrop-blur-3xl transition-all duration-500 lg:hidden flex flex-col items-start justify-center px-10 space-y-8 z-40 ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
          <span className="text-cyan-500/50 text-[10px] font-black tracking-[0.3em] uppercase mt-10 border-b border-white/10 pb-2 w-full">Navigation</span>
          {navItems.map((item, i) => (
            <Link key={i} href={item.href} onClick={() => setMobileMenuOpen(false)} className="text-4xl font-black italic uppercase tracking-tighter text-zinc-100 hover:text-cyan-400 transition-colors">
              {item.label}
            </Link>
          ))}
          <Link href="/login" className="mt-12 w-full py-5 bg-cyan-500 text-black shadow-[0_0_30px_rgba(34,211,238,0.3)] rounded-full font-black uppercase tracking-widest text-xs text-center">
            {t[lang].btnStart}
          </Link>
        </div>

        {/* ================= HERO SECTION ================= */}
        <section className="relative z-10 w-full pt-44 lg:pt-48 px-6 flex flex-col items-center justify-center">
          <div className="w-full max-w-5xl flex flex-col items-center text-center">
            <div className="group flex items-center gap-3 bg-cyan-500/5 border border-cyan-500/20 px-4 py-1.5 rounded-full mb-8 backdrop-blur-md">
              <div className="relative size-2">
                 <span className="absolute inset-0 bg-cyan-400 rounded-full animate-ping opacity-75" />
                 <span className="relative block size-2 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]" />
              </div>
              <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em]">{t[lang].badge}</span>
            </div>
            
            <h1 className="flex flex-col items-center select-none mb-8">
              <div className="overflow-hidden pb-2" key={`h1-${lang}`}>
                 <Shuffle text={t[lang].heroTitle1} className="text-[clamp(28px,6vw,90px)] font-black tracking-[-0.04em] leading-none text-zinc-100" />
              </div>
              <div className="overflow-hidden pb-4 px-4" key={`h2-${lang}`}>
                 <Shuffle text={t[lang].heroTitle2} className="text-[clamp(28px,6vw,90px)] font-black text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-blue-500 to-indigo-500 tracking-[-0.04em] leading-none drop-shadow-[0_0_40px_rgba(34,211,238,0.2)]" />
              </div>
            </h1>
            
            <p className="text-sm md:text-base text-zinc-400 font-medium max-w-3xl leading-relaxed mb-10 tracking-widest">
              {t[lang].heroSub}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto">
              <Link href="/login" className="w-full sm:w-auto px-10 py-4 bg-cyan-500 text-black font-black text-xs uppercase tracking-[0.2em] rounded-full hover:bg-cyan-400 hover:scale-105 transition-all text-center">
                {t[lang].btnStart}
              </Link>
              <button aria-label="Whitepaper" className="group w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 bg-zinc-900/50 backdrop-blur-md border border-white/10 text-white font-black text-xs uppercase tracking-[0.2em] rounded-full hover:bg-zinc-800 transition-all">
                {t[lang].btnDocs} <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>
        </section>

        {/* ================= WHAT IS AXEON (THE PROTOCOL) ================= */}
        <section id="protocol" className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 scroll-mt-20">
          <div className="text-center mb-16">
            <span className="text-[10px] font-black text-cyan-400 tracking-[0.4em] uppercase mb-4 block">{t[lang].whatTag}</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">{t[lang].whatTitle}</h2>
            <p className="text-zinc-400 font-medium tracking-widest max-w-3xl mx-auto leading-relaxed">{t[lang].whatDesc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* Old Way */}
            <div className="bg-red-500/5 border border-red-500/10 rounded-[2rem] p-10 flex flex-col justify-center">
               <div className="flex items-center gap-3 mb-8">
                 <div className="size-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 font-black">✕</div>
                 <h3 className="text-xl font-black text-zinc-300">{t[lang].vsOld}</h3>
               </div>
               <ul className="space-y-6">
                 <li className="flex items-start gap-4">
                   <div className="size-1.5 bg-red-500/50 rounded-full mt-2" />
                   <p className="text-sm font-medium text-zinc-400 tracking-wider leading-relaxed">{t[lang].vsOld1}</p>
                 </li>
                 <li className="flex items-start gap-4">
                   <div className="size-1.5 bg-red-500/50 rounded-full mt-2" />
                   <p className="text-sm font-medium text-zinc-400 tracking-wider leading-relaxed">{t[lang].vsOld2}</p>
                 </li>
                 <li className="flex items-start gap-4">
                   <div className="size-1.5 bg-red-500/50 rounded-full mt-2" />
                   <p className="text-sm font-medium text-zinc-400 tracking-wider leading-relaxed">{t[lang].vsOld3}</p>
                 </li>
               </ul>
            </div>

            {/* Axeon Way */}
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-[2rem] p-10 flex flex-col justify-center shadow-[0_0_40px_rgba(34,211,238,0.05)] relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 blur-[80px] rounded-full pointer-events-none" />
               <div className="flex items-center gap-3 mb-8 relative z-10">
                 <div className="size-8 rounded-full bg-cyan-500 flex items-center justify-center text-black font-black">✓</div>
                 <h3 className="text-xl font-black text-white">{t[lang].vsNew}</h3>
               </div>
               <ul className="space-y-6 relative z-10">
                 <li className="flex items-start gap-4">
                   <div className="size-1.5 bg-cyan-400 rounded-full mt-2 shadow-[0_0_10px_#22d3ee]" />
                   <p className="text-sm font-bold text-zinc-200 tracking-wider leading-relaxed">{t[lang].vsNew1}</p>
                 </li>
                 <li className="flex items-start gap-4">
                   <div className="size-1.5 bg-cyan-400 rounded-full mt-2 shadow-[0_0_10px_#22d3ee]" />
                   <p className="text-sm font-bold text-zinc-200 tracking-wider leading-relaxed">{t[lang].vsNew2}</p>
                 </li>
                 <li className="flex items-start gap-4">
                   <div className="size-1.5 bg-cyan-400 rounded-full mt-2 shadow-[0_0_10px_#22d3ee]" />
                   <p className="text-sm font-bold text-zinc-200 tracking-wider leading-relaxed">{t[lang].vsNew3}</p>
                 </li>
               </ul>
            </div>
          </div>
        </section>

        {/* ================= ARCHITECTURE BENTO GRID ================= */}
        <section id="architecture" className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 scroll-mt-20 border-t border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 bg-zinc-900/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl flex flex-col justify-between overflow-hidden group relative hover:border-cyan-500/30 transition-all">
               <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
               <div className="relative z-10">
                 <div className="flex items-center gap-3 mb-6">
                   <div className="size-2 bg-cyan-500 rounded-full shadow-[0_0_10px_#22d3ee]" />
                   <span className="text-[10px] font-black text-cyan-400 tracking-[0.4em] uppercase">{t[lang].b1Tag}</span>
                 </div>
                 <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight">{t[lang].b1Title}</h2>
                 <p className="text-zinc-400 text-xs md:text-sm leading-relaxed max-w-md uppercase tracking-widest font-medium">{t[lang].b1Desc}</p>
               </div>
               <div className="absolute -bottom-10 -right-10 opacity-30 group-hover:opacity-100 transition-all duration-700 pointer-events-none">
                  <svg width="300" height="300" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="40" stroke="#22d3ee" strokeWidth="0.5" strokeDasharray="4 4" className="animate-[spin_20s_linear_infinite]" />
                    <circle cx="50" cy="50" r="25" stroke="#22d3ee" strokeWidth="1" className="animate-[spin_10s_linear_infinite_reverse]" />
                    <circle cx="50" cy="50" r="4" fill="#22d3ee" className="animate-pulse" />
                  </svg>
               </div>
            </div>

            <div className="md:col-span-4 bg-zinc-900/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl flex flex-col justify-between group relative overflow-hidden hover:border-blue-500/30 transition-colors duration-500">
               <div className="relative z-10">
                 <span className="text-[10px] font-black text-blue-400 tracking-[0.4em] uppercase mb-4 block">{t[lang].b2Tag}</span>
                 <h2 className="text-2xl font-black text-white mb-4 tracking-tight">{t[lang].b2Title}</h2>
                 <p className="text-zinc-400 text-[10px] leading-relaxed uppercase tracking-wider font-medium">{t[lang].b2Desc}</p>
               </div>
               <div className="mt-8 pt-6 border-t border-white/10 bg-black/40 -mx-4 px-4 pb-4 rounded-xl font-mono text-[9px] shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                 <p className="text-zinc-500 mb-1">$ initialize_pda_vault</p>
                 <p className="text-blue-400 mb-1">&gt; Status: NON_CUSTODIAL</p>
                 <p className="text-emerald-400">&gt; Funds routed to admin_wallet</p>
               </div>
            </div>

            <div className="md:col-span-5 bg-zinc-900/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl flex flex-col justify-between group relative overflow-hidden hover:border-indigo-500/30 transition-colors duration-500">
               <div className="relative z-10">
                 <span className="text-[10px] font-black text-indigo-400 tracking-[0.4em] uppercase mb-4 block">{t[lang].b3Tag}</span>
                 <h2 className="text-2xl font-black text-white mb-4 tracking-tight">{t[lang].b3Title}</h2>
                 <p className="text-zinc-400 text-[10px] leading-relaxed uppercase tracking-wider font-medium">{t[lang].b3Desc}</p>
               </div>
               <div className="mt-8 flex flex-col gap-2 relative">
                 <div className="w-full bg-zinc-950 border border-white/5 rounded-xl p-4 flex justify-between items-center">
                    <div className="flex items-center gap-3"><span className="text-[8px] font-black bg-zinc-800 p-1.5 rounded">IDR</span><span className="text-xs font-mono font-bold text-white">FIAT</span></div>
                 </div>
                 <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-8 bg-zinc-800 border border-white/10 rounded-full flex items-center justify-center z-10 group-hover:rotate-180 transition-transform duration-500 shadow-xl">
                    <svg className="size-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
                 </div>
                 <div className="w-full bg-zinc-950 border border-white/5 rounded-xl p-4 flex justify-between items-center">
                    <div className="flex items-center gap-3"><span className="text-[8px] font-black bg-blue-600 text-white p-1.5 rounded">USDC</span><span className="text-xs font-mono font-bold text-emerald-400">CRYPTO</span></div>
                 </div>
               </div>
            </div>

            <div className="md:col-span-7 bg-zinc-900/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center gap-8 group relative overflow-hidden hover:border-emerald-500/30 transition-colors duration-500">
               <div className="flex-1 relative z-10">
                 <span className="text-[10px] font-black text-emerald-400 tracking-[0.4em] uppercase mb-4 block">{t[lang].b4Tag}</span>
                 <h2 className="text-3xl font-black text-white mb-4 tracking-tight">{t[lang].b4Title}</h2>
                 <p className="text-zinc-400 text-[10px] leading-relaxed uppercase tracking-wider font-medium mb-6">{t[lang].b4Desc}</p>
                 <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                    <div className="flex items-center gap-2"><div className="size-2 bg-emerald-400 rounded-full" /><span className="text-[9px] text-zinc-400 uppercase tracking-widest font-bold">H-3 Warning</span></div>
                    <div className="flex items-center gap-2"><div className="size-2 bg-emerald-400 rounded-full animate-pulse" /><span className="text-[9px] text-zinc-400 uppercase tracking-widest font-bold">H-1 Alert</span></div>
                 </div>
               </div>
            </div>
          </div>
        </section>

        {/* ================= NEW: INTEGRATION GUIDE ================= */}
        <section id="guide" className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 scroll-mt-20 border-t border-white/5">
          <div className="text-center mb-16">
            <span className="text-[10px] font-black text-cyan-400 tracking-[0.4em] uppercase mb-4 block">{t[lang].guideTag}</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">{t[lang].guideTitle}</h2>
            <p className="text-zinc-400 font-medium tracking-widest max-w-2xl mx-auto leading-relaxed">{t[lang].guideDesc}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-zinc-900/20 border border-white/5 p-8 rounded-[2rem] relative overflow-hidden group hover:border-cyan-500/30 transition-colors">
              <span className="text-6xl font-black text-white/5 absolute -top-2 -right-2 group-hover:text-cyan-500/10 transition-colors">01</span>
              <div className="relative z-10">
                <h3 className="text-base font-black text-white mb-3 tracking-wide">{t[lang].g1}</h3>
                <p className="text-[10px] text-zinc-400 uppercase tracking-widest leading-relaxed">{t[lang].g1Desc}</p>
              </div>
            </div>
            {/* Step 2 */}
            <div className="bg-zinc-900/20 border border-white/5 p-8 rounded-[2rem] relative overflow-hidden group hover:border-cyan-500/30 transition-colors">
              <span className="text-6xl font-black text-white/5 absolute -top-2 -right-2 group-hover:text-cyan-500/10 transition-colors">02</span>
              <div className="relative z-10">
                <h3 className="text-base font-black text-white mb-3 tracking-wide">{t[lang].g2}</h3>
                <p className="text-[10px] text-zinc-400 uppercase tracking-widest leading-relaxed">{t[lang].g2Desc}</p>
              </div>
            </div>
            {/* Step 3 */}
            <div className="bg-zinc-900/20 border border-white/5 p-8 rounded-[2rem] relative overflow-hidden group hover:border-cyan-500/30 transition-colors">
              <span className="text-6xl font-black text-white/5 absolute -top-2 -right-2 group-hover:text-cyan-500/10 transition-colors">03</span>
              <div className="relative z-10">
                <h3 className="text-base font-black text-white mb-3 tracking-wide">{t[lang].g3}</h3>
                <p className="text-[10px] text-zinc-400 uppercase tracking-widest leading-relaxed">{t[lang].g3Desc}</p>
              </div>
            </div>
            {/* Step 4 */}
            <div className="bg-zinc-900/20 border border-white/5 p-8 rounded-[2rem] relative overflow-hidden group hover:border-cyan-500/30 transition-colors">
              <span className="text-6xl font-black text-white/5 absolute -top-2 -right-2 group-hover:text-cyan-500/10 transition-colors">04</span>
              <div className="relative z-10">
                <h3 className="text-base font-black text-white mb-3 tracking-wide">{t[lang].g4}</h3>
                <p className="text-[10px] text-zinc-400 uppercase tracking-widest leading-relaxed">{t[lang].g4Desc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= PRICING SECTION ================= */}
        <section id="pricing" className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 border-t border-white/5 scroll-mt-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">{t[lang].pricingTitle}</h2>
            <p className="text-zinc-400 font-medium uppercase tracking-widest">{t[lang].pricingSub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-center">
            <div className="bg-zinc-900/20 border border-white/10 rounded-[2rem] p-8 flex flex-col hover:border-cyan-500/30 transition-colors h-full">
              <span className="text-zinc-400 font-bold uppercase tracking-widest text-xs mb-2">Starter</span>
              <span className="text-3xl font-black text-white mb-6 border-b border-white/5 pb-6">Free</span>
              <ul className="flex flex-col gap-4 mb-8 flex-1">
                <li className="flex items-start gap-3 text-[10px] text-zinc-300 font-bold uppercase tracking-widest leading-relaxed">• {lang === 'en' ? 'Max 50 Members' : 'Maks 50 Member'}</li>
                <li className="flex items-start gap-3 text-[10px] text-zinc-300 font-bold uppercase tracking-widest leading-relaxed">• Crypto Only</li>
                <li className="flex items-start gap-3 text-[10px] text-zinc-300 font-bold uppercase tracking-widest leading-relaxed">• 5% Tx Fee</li>
              </ul>
              <Link href="/login" className="w-full py-3 bg-white/5 border border-white/10 text-white rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-white/10 transition-colors text-center">Start Free</Link>
            </div>

            <div className="bg-zinc-900/60 border border-cyan-500/40 rounded-4xl p-8 flex flex-col relative overflow-hidden h-[105%] shadow-[0_0_40px_rgba(34,211,238,0.15)] z-10">
              <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-cyan-400 to-blue-500" />
              <div className="absolute top-4 right-4 bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Popular</div>
              <span className="text-cyan-400 font-bold uppercase tracking-widest text-xs mb-2">Growth</span>
              <div className="flex items-baseline gap-2 mb-6 border-b border-white/5 pb-6">
                <span className="text-3xl font-black text-white">Rp 149k</span><span className="text-zinc-500 text-[10px] uppercase">/ mo</span>
              </div>
              <ul className="flex flex-col gap-4 mb-8 flex-1">
                <li className="flex items-start gap-3 text-[10px] text-white font-bold uppercase tracking-widest leading-relaxed">• Unlimited Members</li>
                <li className="flex items-start gap-3 text-[10px] text-white font-bold uppercase tracking-widest leading-relaxed">• QRIS + Crypto Gateway</li>
                <li className="flex items-start gap-3 text-[10px] text-white font-bold uppercase tracking-widest leading-relaxed">• 60s Auto-Sweep Logic</li>
                <li className="flex items-start gap-3 text-[10px] text-white font-bold uppercase tracking-widest leading-relaxed">• 2% Tx Fee</li>
              </ul>
              <Link href="/login" className="w-full py-3.5 bg-cyan-500 text-black rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-cyan-400 transition-all hover:scale-105 active:scale-95 text-center shadow-[0_0_20px_rgba(34,211,238,0.2)]">Upgrade</Link>
            </div>

            <div className="bg-zinc-900/20 border border-white/10 rounded-[2rem] p-8 flex flex-col hover:border-indigo-500/30 transition-colors h-full">
              <span className="text-indigo-400 font-bold uppercase tracking-widest text-xs mb-2">Pro Edition</span>
              <div className="flex items-baseline gap-2 mb-6 border-b border-white/5 pb-6">
                <span className="text-3xl font-black text-white">Rp 399k</span><span className="text-zinc-500 text-[10px] uppercase">/ mo</span>
              </div>
              <ul className="flex flex-col gap-4 mb-8 flex-1">
                <li className="flex items-start gap-3 text-[10px] text-zinc-300 font-bold uppercase tracking-widest leading-relaxed">• Growth Features +</li>
                <li className="flex items-start gap-3 text-[10px] text-zinc-300 font-bold uppercase tracking-widest leading-relaxed">• Custom Bot Branding</li>
                <li className="flex items-start gap-3 text-[10px] text-zinc-300 font-bold uppercase tracking-widest leading-relaxed">• 1% Tx Fee</li>
              </ul>
              <Link href="/login" className="w-full py-3 bg-white/5 border border-white/10 text-white rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-indigo-500/20 hover:border-indigo-500/50 transition-colors text-center">Contact Sales</Link>
            </div>
          </div>
        </section>

        {/* ================= NEW: F.A.Q SECTION ================= */}
        <section id="faq" className="relative z-10 w-full max-w-4xl mx-auto px-6 py-24 border-t border-white/5">
          <div className="text-center mb-16">
            <span className="text-[10px] font-black text-cyan-400 tracking-[0.4em] uppercase mb-4 block">{t[lang].faqTag}</span>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tight">{t[lang].faqTitle}</h2>
            <p className="text-zinc-400 font-medium tracking-widest leading-relaxed">{t[lang].faqDesc}</p>
          </div>

          <div className="space-y-4">
            {t[lang].faqs.map((faq, index) => (
              <div 
                key={index} 
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className={`bg-zinc-900/30 border border-white/5 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:bg-zinc-900/60 ${openFaq === index ? 'border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.05)]' : ''}`}
              >
                <div className="flex justify-between items-center gap-4">
                  <h3 className="text-xs md:text-sm font-bold text-white tracking-wide">{faq.q}</h3>
                  <div className={`size-6 rounded-full border border-white/10 flex items-center justify-center transition-transform duration-300 ${openFaq === index ? 'rotate-45 bg-cyan-500 text-black border-cyan-500' : 'text-zinc-400'}`}>
                    <span className="font-mono leading-none mb-0.5">+</span>
                  </div>
                </div>
                <div className={`grid transition-all duration-300 ${openFaq === index ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <p className="text-[10px] md:text-xs text-zinc-400 uppercase tracking-widest leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="relative z-10 border-t border-white/5 bg-zinc-950/80 backdrop-blur-2xl w-full flex justify-center py-10 px-6 mt-auto">
          <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col gap-1 items-center md:items-start">
              <div className="flex items-center gap-2 mb-2">
                <div className="size-2 bg-cyan-500 rounded-sm" />
                <span className="font-black italic text-sm tracking-tighter uppercase text-white">Axeon</span>
              </div>
              <span className="text-[9px] font-bold tracking-widest text-zinc-500 uppercase">© 2026 Axeon Infrastructure</span>
            </div>
            <div className="flex items-center gap-8">
              <Link href="/login" className="text-[10px] font-black tracking-widest text-zinc-500 hover:text-cyan-400 uppercase transition-colors">Admin Portal</Link>
              <a href="#" className="text-[10px] font-black tracking-widest text-zinc-500 hover:text-cyan-400 uppercase transition-colors">Documentation</a>
            </div>
          </div>
        </footer>

      </ClickSpark>
    </main>
  );
}