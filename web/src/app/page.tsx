"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useAxeonStore } from '../store/useAxeonStore';
import Shuffle from '../components/magic/Shuffle';
import ClickSpark from '../components/magic/ClickSpark';
import GridBackground from '../components/magic/GridBackground';

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const { theme, systemTheme } = useTheme();
  
  // Ambil bahasa dari Global State
  const { lang } = useAxeonStore();

  const [stats, setStats] = useState({ vol: 10452300.50, com: 2405, user: 150240 });
  const [activities, setActivities] = useState([
    { id: 1, type: 'Subscription', amount: '+ 25.00', currency: 'USDC', time: 'new' },
    { id: 2, type: 'Fiat On-Ramp', amount: '+ 50.00', currency: 'USD', time: 'old1' },
    { id: 3, type: 'Renewal Sweep', amount: '+ 10.00', currency: 'USDC', time: 'old2' },
  ]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsClient(true));

    const statsInterval = setInterval(() => {
      setStats(prev => ({
        vol: prev.vol + (Math.random() * 50),
        com: prev.com + (Math.random() > 0.8 ? 1 : 0),
        user: prev.user + Math.floor(Math.random() * 3)
      }));
    }, 3500);

    const activityTypes = ['Subscription', 'Fiat On-Ramp', 'Renewal Sweep', 'Crypto Checkout'];
    const currencies = ['USDC', 'USD', 'SOL'];
    const activityInterval = setInterval(() => {
      const newActivity = {
        id: Date.now(),
        type: activityTypes[Math.floor(Math.random() * activityTypes.length)],
        amount: `+ ${(Math.random() * 100).toFixed(2)}`,
        currency: currencies[Math.floor(Math.random() * currencies.length)],
        time: 'new'
      };
      setActivities(prev => {
        const updated = [newActivity, ...prev].map((act, idx) => {
          if (idx === 1) return { ...act, time: 'old1' };
          if (idx === 2) return { ...act, time: 'old2' };
          return act;
        });
        return updated.slice(0, 3);
      });
    }, 4000);

    return () => {
      cancelAnimationFrame(frame);
      clearInterval(statsInterval);
      clearInterval(activityInterval);
    };
  }, []);

  const currentTheme = theme === 'system' ? systemTheme : theme;

  const t = {
    en: {
      badge: "AXEON PROTOCOL V1.0",
      heroTitle1: "THE OPERATING",
      heroTitle2: "SYSTEM FOR",
      heroTitle3: "COMMUNITIES.",
      heroSub: "Monetize your Telegram and Discord communities seamlessly. Native crypto routing combined with robust Fiat on/off-ramps, powered by Solana's zero-custody infrastructure.",
      btnStart: "Start Building",
      btnDocs: "Read Documentation",
      liveActivity: "Live Network Activity",
      timeNew: "Just now",
      timeOld1: "2s ago",
      timeOld2: "5s ago",
      statVolDesc: "Total Volume Routed",
      statComDesc: "Active Communities",
      statUserDesc: "Premium Subscribers",
      trustBadge: "POWERING THE NEXT GENERATION OF CREATOR ECONOMY",
      howTitle: "How it works.",
      howSub: "From zero to revenue in minutes.",
      how1: "Deploy Vault",
      how1Desc: "Create a smart contract vault in one click. No coding required.",
      how2: "Invite Sentinel",
      how2Desc: "Add our bot to your Telegram group to automate member management.",
      how3: "Earn USDC",
      how3Desc: "Users pay via crypto. Funds go directly to your wallet instantly.",
      featTitle: "Enterprise-Grade.",
      featSub: "Consumer Experience.",
      featDesc: "Everything you need to scale a premium digital community without the operational headache.",
      feat1Title: "Fiat ↔ Crypto Seamless Gateway",
      feat1Desc: "Accept credit cards, Apple Pay, and bank transfers directly. Axeon instantly converts fiat to USDC on-chain, eliminating volatility and bridging Web2 users to Web3 effortlessly.",
      feat2Title: "Zero-Custody Architecture",
      feat2Desc: "Funds are routed directly via Program Derived Addresses (PDAs). We never hold your liquidity. 100% on-chain transparency.",
      feat3Title: "Axeon Sentinel Bot",
      feat3Desc: "Our Telegram bot listens to on-chain events. It automatically grants access upon payment and kicks members when their PDA expires.",
      pricingTitle: "Transparent Pricing.",
      pricingSub: "Scale your community with a model that grows with you.",
      p1Name: "Starter",
      p1Price: "Free",
      p1Desc: "Perfect for new communities starting their monetization journey.",
      p1Feat1: "Up to 100 Active Subscribers",
      p1Feat2: "Crypto Payments Only (USDC/SOL)",
      p1Feat3: "Basic Sentinel Telegram Bot",
      p1Feat4: "2.5% Protocol Fee",
      btnFree: "Deploy Free Vault",
      badgePopular: "Most Popular",
      p2Name: "Pro",
      p2Price: "$49",
      p2Period: "/mo",
      p2Desc: "Advanced tools for growing communities and serious creators.",
      p2Feat1: "Unlimited Subscribers",
      p2Feat2: "Fiat On-Ramp (Credit Card/Apple Pay)",
      p2Feat3: "Custom Branding Checkout",
      p2Feat4: "1% Protocol Fee",
      btnPro: "Upgrade to Pro",
      p3Name: "Enterprise",
      p3Price: "Custom",
      p3Desc: "Custom infrastructure for DAOs and institutional scale.",
      p3Feat1: "Fiat Off-Ramp to Bank Account",
      p3Feat2: "API & Webhook Access",
      p3Feat3: "Dedicated Success Manager",
      p3Feat4: "Negotiable Volume Fee",
      btnEnterprise: "Contact Sales",
      faqTitle: "Frequently Asked Questions",
      faq1Q: "Do I need to know how to code to use Axeon?",
      faq1A: "Not at all. Axeon provides a no-code dashboard to deploy your vaults and manage your community access entirely through UI.",
      faq2Q: "How does the Fiat to Crypto gateway work?",
      faq2A: "We integrate with top-tier payment providers (like Stripe/MoonPay). Your users pay with their Credit Card, and the funds are instantly settled into your Solana wallet as USDC.",
      faq3Q: "Who holds the funds during transactions?",
      faq3A: "You do. Axeon uses a zero-custody architecture. The smart contract routes payments directly from the subscriber to your wallet instantly.",
      faq4Q: "Can I migrate my existing Telegram members?",
      faq4A: "Yes. The Pro tier allows you to whitelist existing members or generate complimentary access passes so they bypass the initial payment screen.",
      faq5Q: "What happens if a user's subscription expires?",
      faq5A: "Axeon Sentinel (our Telegram Bot) constantly syncs with the Solana blockchain. The moment a user's on-chain expiry timestamp passes without renewal, the bot automatically removes them from your group.",
      footProduct: "Product",
      footCompany: "Company",
      footLegal: "Legal",
      footRights: "Axeon Inc. All rights reserved."
    },
    id: {
      badge: "AXEON PROTOCOL V1.0",
      heroTitle1: "SISTEM OPERASI",
      heroTitle2: "UNTUK KOMUNITAS",
      heroTitle3: "PREMIUM.",
      heroSub: "Monetisasi komunitas Telegram Anda dengan lancar. Kombinasi pembayaran kripto on-chain dan konversi Fiat otomatis, ditenagai oleh arsitektur zero-custody Solana.",
      btnStart: "Mulai Sekarang",
      btnDocs: "Baca Dokumentasi",
      liveActivity: "Aktivitas Jaringan Live",
      timeNew: "Baru saja",
      timeOld1: "2d lalu",
      timeOld2: "5d lalu",
      statVolDesc: "Total Volume Transaksi",
      statComDesc: "Komunitas Aktif",
      statUserDesc: "Pelanggan Premium",
      trustBadge: "MENDUKUNG EKONOMI KREATOR GENERASI BERIKUTNYA",
      howTitle: "Cara Kerja.",
      howSub: "Dari nol hingga monetisasi dalam hitungan menit.",
      how1: "Deploy Brankas",
      how1Desc: "Buat brankas smart contract dalam satu klik. Tanpa perlu coding.",
      how2: "Undang Sentinel",
      how2Desc: "Tambahkan bot kami ke grup Telegram Anda untuk manajemen anggota otomatis.",
      how3: "Dapatkan USDC",
      how3Desc: "Pengguna membayar dengan kripto. Dana masuk langsung ke dompet Anda seketika.",
      featTitle: "Skala Enterprise.",
      featSub: "Pengalaman Pengguna.",
      featDesc: "Semua yang Anda butuhkan untuk mengembangkan komunitas digital premium tanpa pusing memikirkan operasional.",
      feat1Title: "Gateway Fiat ↔ Crypto Mulus",
      feat1Desc: "Terima Kartu Kredit, Apple Pay, dan transfer bank. Axeon mengonversi Fiat menjadi USDC on-chain, menjembatani pengguna Web2 ke Web3 tanpa hambatan.",
      feat2Title: "Arsitektur Zero-Custody",
      feat2Desc: "Dana diarahkan langsung melalui Program Derived Addresses (PDA). Kami tidak pernah menahan uang Anda. Transparansi on-chain 100%.",
      feat3Title: "Axeon Sentinel Bot",
      feat3Desc: "Bot Telegram kami membaca data on-chain. Bot akan memberikan akses otomatis saat pembayaran selesai dan mengeluarkan member saat akses kedaluwarsa.",
      pricingTitle: "Harga Transparan.",
      pricingSub: "Skalakan komunitas Anda dengan model bisnis yang menyesuaikan kebutuhan.",
      p1Name: "Pemula",
      p1Price: "Gratis",
      p1Desc: "Sempurna untuk komunitas baru yang memulai perjalanan monetisasi.",
      p1Feat1: "Hingga 100 Pelanggan Aktif",
      p1Feat2: "Hanya Pembayaran Kripto (USDC/SOL)",
      p1Feat3: "Bot Sentinel Telegram Dasar",
      p1Feat4: "Biaya Protokol 2.5%",
      btnFree: "Gunakan Brankas Gratis",
      badgePopular: "Paling Populer",
      p2Name: "Pro",
      p2Price: "$49",
      p2Period: "/bln",
      p2Desc: "Fitur lanjutan untuk komunitas yang berkembang cepat.",
      p2Feat1: "Pelanggan Tidak Terbatas",
      p2Feat2: "Fiat On-Ramp (Kartu Kredit/Apple Pay)",
      p2Feat3: "Halaman Checkout Kustom",
      p2Feat4: "Biaya Protokol 1%",
      btnPro: "Tingkatkan ke Pro",
      p3Name: "Enterprise",
      p3Price: "Kustom",
      p3Desc: "Infrastruktur khusus skala institusi dan DAO besar.",
      p3Feat1: "Pencairan Fiat Langsung ke Bank",
      p3Feat2: "Akses API & Webhook Penuh",
      p3Feat3: "Manajer Sukses Dedicated",
      p3Feat4: "Biaya Volume Dapat Dinegosiasikan",
      btnEnterprise: "Hubungi Sales",
      faqTitle: "Pertanyaan Umum",
      faq1Q: "Apakah saya harus bisa coding untuk memakai Axeon?",
      faq1A: "Sama sekali tidak. Axeon menyediakan dashboard visual tanpa kode untuk meluncurkan brankas Anda dan mengatur komunitas sepenuhnya lewat UI.",
      faq2Q: "Bagaimana cara kerja gateway Fiat ke Crypto?",
      faq2A: "Kami terintegrasi dengan penyedia pembayaran global. Pengguna Anda bisa membayar pakai Kartu Kredit, dan dananya akan otomatis masuk ke dompet Solana Anda.",
      faq3Q: "Siapa yang menahan dana saat transaksi berlangsung?",
      faq3A: "Anda sendiri. Axeon menggunakan arsitektur zero-custody. Smart contract langsung merutekan uang dari pembeli ke dompet Anda secara instan tanpa perantara.",
      faq4Q: "Bisa pindahin member grup Telegram saya yang lama?",
      faq4A: "Tentu. Paket Pro memungkinkan Anda melakukan 'whitelist' untuk member lama, sehingga mereka mendapat akses tanpa harus melewati halaman pembayaran.",
      faq5Q: "Bagaimana jika masa langganan pengguna habis?",
      faq5A: "Axeon Sentinel terus tersinkronisasi dengan blockchain Solana. Detik di mana waktu on-chain pengguna kedaluwarsa, bot akan langsung mengeluarkannya dari grup.",
      footProduct: "Produk",
      footCompany: "Perusahaan",
      footLegal: "Legal",
      footRights: "Axeon Inc. Hak cipta dilindungi undang-undang."
    }
  };

  const getTimeString = (timeType: string) => {
    if (timeType === 'new') return t[lang].timeNew;
    if (timeType === 'old1') return t[lang].timeOld1;
    if (timeType === 'old2') return t[lang].timeOld2;
    return t[lang].timeNew;
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen">
      <main className="relative w-full flex flex-col transition-colors duration-300 font-sans scroll-smooth selection:bg-blue-500/30 dark:selection:bg-[#00ffcc]/30 selection:text-blue-700 dark:selection:text-[#00ffcc]">
        <ClickSpark sparkColor={currentTheme === 'dark' ? '#00ffcc' : '#2563eb'} sparkSize={6} sparkRadius={15} sparkCount={5} easing="ease-out">
          
          <GridBackground />

          {/* ================= HERO SECTION ================= */}
          <section className="relative w-full pt-32 pb-20 px-6 flex items-center min-h-[90vh] max-w-7xl mx-auto z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-10 w-full items-center">
              
              <div className="col-span-1 lg:col-span-7 flex flex-col items-start text-left z-10">
                <div className="flex items-center gap-3 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm dark:shadow-none px-3 py-1.5 rounded-full mb-8 transition-colors">
                  <div className="size-1.5 bg-blue-600 dark:bg-[#00ffcc] rounded-full animate-pulse" />
                  <span className="font-mono text-[9px] text-zinc-600 dark:text-zinc-300 tracking-widest uppercase">{t[lang].badge}</span>
                </div>
                
                <h1 className="flex flex-col text-left mb-8 w-full">
                  <div className="overflow-hidden pb-1">
                     <Shuffle text={t[lang].heroTitle1} className="text-[clamp(40px,6vw,80px)] font-bold tracking-tight leading-[1.05] text-zinc-900 dark:text-white" />
                  </div>
                  <div className="overflow-hidden pb-1">
                     <Shuffle text={t[lang].heroTitle2} className="text-[clamp(40px,6vw,80px)] font-bold tracking-tight leading-[1.05] text-zinc-400 dark:text-zinc-500" />
                  </div>
                  <div className="overflow-hidden pb-1">
                     <Shuffle text={t[lang].heroTitle3} className="text-[clamp(40px,6vw,80px)] font-bold tracking-tight leading-[1.05] text-zinc-900 dark:text-white" />
                  </div>
                </h1>
                
                <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed mb-10">
                  {t[lang].heroSub}
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                  <Link href="/login" className="w-full sm:w-auto px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold text-[11px] font-mono uppercase tracking-widest hover:bg-blue-600 dark:hover:bg-[#00ffcc] transition-all text-center rounded shadow-lg flex items-center justify-center gap-3">
                    {t[lang].btnStart}
                  </Link>
                  <Link href="/docs" className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-transparent border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white font-bold text-[11px] font-mono uppercase tracking-widest hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all text-center rounded shadow-sm dark:shadow-none">
                    {t[lang].btnDocs}
                  </Link>
                </div>
              </div>

              {/* Dynamic Live Activity Graphic */}
              <div className="col-span-1 lg:col-span-5 w-full relative hidden md:block">
                <div className="bg-white/80 dark:bg-[#080808]/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 relative shadow-2xl transition-colors">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                     <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">{t[lang].liveActivity}</span>
                     <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  </div>
                  <div className="space-y-4">
                     {activities.map((act) => (
                       <div key={act.id} className="flex items-center gap-4 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800/50 animate-in fade-in slide-in-from-top-2 duration-500">
                         <div className={`size-8 rounded-full flex items-center justify-center ${act.currency === 'USD' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'}`}>
                           <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                         </div>
                         <div className="flex-1">
                           <div className="text-xs font-bold text-zinc-900 dark:text-zinc-200">{act.type}</div>
                           <div className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">{getTimeString(act.time)}</div>
                         </div>
                         <div className="text-right">
                           <span className={`text-xs font-mono font-bold ${act.currency === 'USD' ? 'text-emerald-600 dark:text-emerald-400' : 'text-blue-600 dark:text-[#00ffcc]'}`}>
                             {act.amount} {act.currency}
                           </span>
                         </div>
                       </div>
                     ))}
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* ================= REALTIME STATS BANNER ================= */}
          <section className="relative z-10 border-y border-zinc-200 dark:border-white/5 bg-white/90 dark:bg-[#020202]/90 backdrop-blur-md py-12 transition-colors">
             <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">{t[lang].trustBadge}</span>
             </div>
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-zinc-200 dark:divide-zinc-800">
               <div className="flex flex-col items-center justify-center pt-4 md:pt-0">
                 <span className="text-4xl md:text-5xl font-mono font-bold text-zinc-900 dark:text-white mb-2 tracking-tighter transition-colors">
                   ${stats.vol.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                 </span>
                 <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{t[lang].statVolDesc}</span>
               </div>
               <div className="flex flex-col items-center justify-center pt-8 md:pt-0">
                 <span className="text-4xl md:text-5xl font-mono font-bold text-zinc-900 dark:text-white mb-2 tracking-tighter transition-colors">
                   {stats.com.toLocaleString('en-US')}
                 </span>
                 <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{t[lang].statComDesc}</span>
               </div>
               <div className="flex flex-col items-center justify-center pt-8 md:pt-0">
                 <span className="text-4xl md:text-5xl font-mono font-bold text-zinc-900 dark:text-white mb-2 tracking-tighter transition-colors">
                   {stats.user.toLocaleString('en-US')}
                 </span>
                 <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{t[lang].statUserDesc}</span>
               </div>
            </div>
          </section>

          {/* ================= HOW IT WORKS (PRODUCT) ================= */}
          <section id="product" className="relative z-10 py-24 px-6 max-w-7xl mx-auto scroll-mt-16">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-zinc-900 dark:text-white">{t[lang].howTitle}</h2>
              <p className="text-sm md:text-base text-zinc-500 max-w-2xl mx-auto">{t[lang].howSub}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: "01", title: t[lang].how1, desc: t[lang].how1Desc },
                { step: "02", title: t[lang].how2, desc: t[lang].how2Desc },
                { step: "03", title: t[lang].how3, desc: t[lang].how3Desc }
              ].map((item, i) => (
                <div key={i} className="relative p-8 bg-white dark:bg-[#050505] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm dark:shadow-none transition-colors group">
                  <span className="absolute -top-6 -left-2 text-6xl font-bold text-zinc-100 dark:text-zinc-900/50 group-hover:text-blue-50 dark:group-hover:text-[#00ffcc]/10 transition-colors z-0">
                    {item.step}
                  </span>
                  <div className="relative z-10 mt-4">
                    <h3 className="text-xl font-bold mb-3 text-zinc-900 dark:text-white">{item.title}</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ================= FEATURES ================= */}
          <section id="solutions" className="relative z-10 py-24 px-6 max-w-7xl mx-auto scroll-mt-16 border-t border-zinc-200 dark:border-white/5 transition-colors">
            <div className="mb-16 text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-zinc-900 dark:text-white">
                {t[lang].featTitle} <span className="text-zinc-400 dark:text-zinc-500">{t[lang].featSub}</span>
              </h2>
              <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed mx-auto md:mx-0">
                {t[lang].featDesc}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-[#080808] border border-zinc-200 dark:border-zinc-800 p-8 rounded-xl shadow-sm dark:shadow-none hover:border-blue-300 dark:hover:border-zinc-600 transition-colors group">
                <div className="size-12 rounded-xl bg-blue-50 dark:bg-zinc-900 border border-blue-100 dark:border-zinc-800 flex items-center justify-center mb-6 group-hover:border-blue-400 dark:group-hover:border-[#00ffcc] transition-colors">
                  <svg className="size-6 text-blue-600 dark:text-zinc-400 dark:group-hover:text-[#00ffcc]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                </div>
                <h3 className="font-bold text-lg mb-3 text-zinc-900 dark:text-white">{t[lang].feat1Title}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{t[lang].feat1Desc}</p>
              </div>
              <div className="bg-white dark:bg-[#080808] border border-zinc-200 dark:border-zinc-800 p-8 rounded-xl shadow-sm dark:shadow-none hover:border-blue-300 dark:hover:border-zinc-600 transition-colors group">
                <div className="size-12 rounded-xl bg-blue-50 dark:bg-zinc-900 border border-blue-100 dark:border-zinc-800 flex items-center justify-center mb-6 group-hover:border-blue-400 dark:group-hover:border-[#00ffcc] transition-colors">
                  <svg className="size-6 text-blue-600 dark:text-zinc-400 dark:group-hover:text-[#00ffcc]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                </div>
                <h3 className="font-bold text-lg mb-3 text-zinc-900 dark:text-white">{t[lang].feat2Title}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{t[lang].feat2Desc}</p>
              </div>
              <div className="bg-white dark:bg-[#080808] border border-zinc-200 dark:border-zinc-800 p-8 rounded-xl shadow-sm dark:shadow-none hover:border-blue-300 dark:hover:border-zinc-600 transition-colors group">
                <div className="size-12 rounded-xl bg-blue-50 dark:bg-zinc-900 border border-blue-100 dark:border-zinc-800 flex items-center justify-center mb-6 group-hover:border-blue-400 dark:group-hover:border-[#00ffcc] transition-colors">
                  <svg className="size-6 text-blue-600 dark:text-zinc-400 dark:group-hover:text-[#00ffcc]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M4 17h16a2 2 0 002-2V9a2 2 0 00-2-2H4a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg>
                </div>
                <h3 className="font-bold text-lg mb-3 text-zinc-900 dark:text-white">{t[lang].feat3Title}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{t[lang].feat3Desc}</p>
              </div>
            </div>
          </section>

          {/* ================= PRICING ================= */}
          <section id="pricing" className="relative z-10 py-24 px-6 max-w-7xl mx-auto border-t border-zinc-200 dark:border-white/5 scroll-mt-16 transition-colors">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-zinc-900 dark:text-white">{t[lang].pricingTitle}</h2>
              <p className="text-sm md:text-base text-zinc-500 max-w-2xl mx-auto">{t[lang].pricingSub}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-white dark:bg-[#080808] border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm dark:shadow-none flex flex-col">
                <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white">{t[lang].p1Name}</h3>
                <p className="text-sm text-zinc-500 mb-6 min-h-10">{t[lang].p1Desc}</p>
                <div className="mb-8">
                  <span className="text-4xl font-bold text-zinc-900 dark:text-white">{t[lang].p1Price}</span>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  {[t[lang].p1Feat1, t[lang].p1Feat2, t[lang].p1Feat3, t[lang].p1Feat4].map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-300">
                      <svg className="size-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link href="/login" className="w-full py-3 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white font-bold text-xs uppercase tracking-widest hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors text-center rounded">
                  {t[lang].btnFree}
                </Link>
              </div>

              <div className="p-8 bg-blue-50 dark:bg-[#050505] border-2 border-blue-600 dark:border-[#00ffcc] rounded-2xl shadow-xl flex flex-col relative transform md:-translate-y-4">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 dark:bg-[#00ffcc] text-white dark:text-black font-bold text-[10px] uppercase tracking-widest px-4 py-1 rounded-full whitespace-nowrap">
                  {t[lang].badgePopular}
                </div>
                <h3 className="text-xl font-bold mb-2 text-blue-900 dark:text-white">{t[lang].p2Name}</h3>
                <p className="text-sm text-blue-700/80 dark:text-zinc-400 mb-6 min-h-10">{t[lang].p2Desc}</p>
                <div className="mb-8">
                  <span className="text-4xl font-bold text-blue-900 dark:text-white">{t[lang].p2Price}</span>
                  <span className="text-sm text-blue-700/80 dark:text-zinc-500">{t[lang].p2Period}</span>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  {[t[lang].p2Feat1, t[lang].p2Feat2, t[lang].p2Feat3, t[lang].p2Feat4].map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-blue-900 dark:text-zinc-200">
                      <svg className="size-4 text-blue-600 dark:text-[#00ffcc]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link href="/login" className="w-full py-3 bg-blue-600 dark:bg-[#00ffcc] text-white dark:text-black font-bold text-xs uppercase tracking-widest hover:bg-blue-700 dark:hover:bg-[#00e6b8] transition-colors text-center rounded shadow-lg">
                  {t[lang].btnPro}
                </Link>
              </div>

              <div className="p-8 bg-white dark:bg-[#080808] border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm dark:shadow-none flex flex-col">
                <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white">{t[lang].p3Name}</h3>
                <p className="text-sm text-zinc-500 mb-6 min-h-10">{t[lang].p3Desc}</p>
                <div className="mb-8">
                  <span className="text-4xl font-bold text-zinc-900 dark:text-white">{t[lang].p3Price}</span>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  {[t[lang].p3Feat1, t[lang].p3Feat2, t[lang].p3Feat3, t[lang].p3Feat4].map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-300">
                      <svg className="size-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      {feat}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-3 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white font-bold text-xs uppercase tracking-widest hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors text-center rounded">
                  {t[lang].btnEnterprise}
                </button>
              </div>
            </div>
          </section>

          {/* ================= FAQ ================= */}
          <section className="py-24 px-6 max-w-4xl mx-auto border-t border-zinc-200 dark:border-white/5 transition-colors">
            <h2 className="text-3xl font-bold mb-12 tracking-tight text-center text-zinc-900 dark:text-white">{t[lang].faqTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-white dark:bg-[#080808] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm dark:shadow-none">
                <h4 className="font-bold mb-3 text-zinc-900 dark:text-white">{t[lang].faq1Q}</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{t[lang].faq1A}</p>
              </div>
              <div className="p-8 bg-white dark:bg-[#080808] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm dark:shadow-none">
                <h4 className="font-bold mb-3 text-zinc-900 dark:text-white">{t[lang].faq2Q}</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{t[lang].faq2A}</p>
              </div>
              <div className="p-8 bg-white dark:bg-[#080808] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm dark:shadow-none">
                <h4 className="font-bold mb-3 text-zinc-900 dark:text-white">{t[lang].faq3Q}</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{t[lang].faq3A}</p>
              </div>
              <div className="p-8 bg-white dark:bg-[#080808] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm dark:shadow-none">
                <h4 className="font-bold mb-3 text-zinc-900 dark:text-white">{t[lang].faq5Q}</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{t[lang].faq5A}</p>
              </div>
              <div className="md:col-span-2 p-8 bg-white dark:bg-[#080808] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm dark:shadow-none">
                <h4 className="font-bold mb-3 text-zinc-900 dark:text-white">{t[lang].faq4Q}</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{t[lang].faq4A}</p>
              </div>
            </div>
          </section>

          {/* ================= FOOTER ================= */}
          <footer className="relative z-10 w-full bg-zinc-100 dark:bg-[#030303] pt-16 pb-8 px-6 transition-colors">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
                
                <div className="col-span-2 md:col-span-2">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="size-2.5 bg-blue-600 dark:bg-[#00ffcc] shadow-[0_0_10px_rgba(37,99,235,0.5)] dark:shadow-[0_0_10px_#00ffcc]" />
                    <span className="font-bold tracking-widest text-xs text-zinc-900 dark:text-white">AXEON</span>
                  </div>
                  <p className="text-sm text-zinc-500 max-w-sm leading-relaxed mb-6">
                    The operating system for the next generation of premium digital communities. 
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-xs uppercase tracking-widest mb-6 text-zinc-900 dark:text-white">{t[lang].footProduct}</h4>
                  <ul className="space-y-4 text-sm text-zinc-500">
                    <li><Link href="/docs" className="hover:text-blue-600 dark:hover:text-[#00ffcc] transition-colors">Documentation</Link></li>
                    <li><a href="#pricing" className="hover:text-blue-600 dark:hover:text-[#00ffcc] transition-colors">Pricing</a></li>
                    <li><Link href="/changelog" className="hover:text-blue-600 dark:hover:text-[#00ffcc] transition-colors">Changelog</Link></li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-xs uppercase tracking-widest mb-6 text-zinc-900 dark:text-white">{t[lang].footCompany}</h4>
                  <ul className="space-y-4 text-sm text-zinc-500">
                    <li><Link href="/about" className="hover:text-blue-600 dark:hover:text-[#00ffcc] transition-colors">About Us</Link></li>
                    <li><Link href="/careers" className="hover:text-blue-600 dark:hover:text-[#00ffcc] transition-colors">Careers</Link></li>
                    <li><Link href="/blog" className="hover:text-blue-600 dark:hover:text-[#00ffcc] transition-colors">Blog</Link></li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-xs uppercase tracking-widest mb-6 text-zinc-900 dark:text-white">{t[lang].footLegal}</h4>
                  <ul className="space-y-4 text-sm text-zinc-500">
                    <li><Link href="/privacy" className="hover:text-blue-600 dark:hover:text-[#00ffcc] transition-colors">Privacy Policy</Link></li>
                    <li><Link href="/terms" className="hover:text-blue-600 dark:hover:text-[#00ffcc] transition-colors">Terms of Service</Link></li>
                    <li><Link href="/security" className="hover:text-blue-600 dark:hover:text-[#00ffcc] transition-colors">Security</Link></li>
                  </ul>
                </div>

              </div>

              <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
                <span className="text-xs text-zinc-500">
                  &copy; {new Date().getFullYear()} {t[lang].footRights}
                </span>
                <div className="flex gap-4">
                  <a href="#" aria-label="Twitter" className="text-zinc-400 hover:text-blue-600 dark:hover:text-white transition-colors">
                    <svg className="size-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                  </a>
                  <a href="https://github.com/NaufalAufaaAbyan/Axeon-Management-Protocol" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-zinc-400 hover:text-blue-600 dark:hover:text-white transition-colors">
                    <svg className="size-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </ClickSpark>
      </main>
    </div>
  );
}