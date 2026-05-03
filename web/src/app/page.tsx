"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useAxeonStore } from '../store/useAxeonStore';
import { dict } from '../lib/dictionary';
import Shuffle from '../components/magic/Shuffle';
import ClickSpark from '../components/magic/ClickSpark';
import GridBackground from '../components/magic/GridBackground';

const ACTIVITIES_DATA = [
  { id: 1, type: 'Subscription', amount: '+ 25.00', currency: 'USDC', time: 'new' },
  { id: 2, type: 'Fiat On-Ramp', amount: '+ 50.00', currency: 'USD', time: 'old1' },
  { id: 3, type: 'Renewal Sweep', amount: '+ 10.00', currency: 'USDC', time: 'old2' },
];

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const { resolvedTheme } = useTheme();
  const { lang } = useAxeonStore();

  const [stats] = useState({ vol: 0.00, com: 0, user: 0 }); 

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsClient(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const t = dict[lang as keyof typeof dict];

  const getTimeString = (timeType: string) => {
    if (timeType === 'new') return t.timeNew;
    if (timeType === 'old1') return t.timeOld1;
    if (timeType === 'old2') return t.timeOld2;
    return t.timeNew;
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen">
      <main className="relative w-full flex flex-col transition-colors duration-300 font-sans scroll-smooth selection:bg-blue-500/30 dark:selection:bg-[#00ffcc]/30 selection:text-blue-700 dark:selection:text-[#00ffcc]">
        <ClickSpark sparkColor={resolvedTheme === 'dark' ? '#00ffcc' : '#2563eb'} sparkSize={6} sparkRadius={15} sparkCount={5} easing="ease-out">
          
          <GridBackground />

          <section className="relative w-full pt-32 pb-20 px-6 flex items-center min-h-[90vh] max-w-7xl mx-auto z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-10 w-full items-center">
              
              <div className="col-span-1 lg:col-span-7 flex flex-col items-start text-left z-10">
                <div className="flex items-center gap-3 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm dark:shadow-none px-3 py-1.5 rounded-full mb-8 transition-colors">
                  <div className="size-1.5 bg-blue-600 dark:bg-[#00ffcc] rounded-full animate-pulse" />
                  <span className="font-mono text-[9px] text-zinc-600 dark:text-zinc-300 tracking-widest uppercase">{t.badge}</span>
                </div>
                
                <h1 className="flex flex-col text-left mb-8 w-full">
                  <div className="overflow-hidden pb-1"><Shuffle text={t.heroTitle1} className="text-[clamp(40px,6vw,80px)] font-bold tracking-tight leading-[1.05] text-zinc-900 dark:text-white" /></div>
                  <div className="overflow-hidden pb-1"><Shuffle text={t.heroTitle2} className="text-[clamp(40px,6vw,80px)] font-bold tracking-tight leading-[1.05] text-zinc-400 dark:text-zinc-500" /></div>
                  <div className="overflow-hidden pb-1"><Shuffle text={t.heroTitle3} className="text-[clamp(40px,6vw,80px)] font-bold tracking-tight leading-[1.05] text-zinc-900 dark:text-white" /></div>
                </h1>
                
                <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed mb-10">{t.heroSub}</p>

                <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                  <Link href="/login" className="w-full sm:w-auto px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold text-[11px] font-mono uppercase tracking-widest hover:bg-blue-600 dark:hover:bg-[#00ffcc] transition-all text-center rounded shadow-lg flex items-center justify-center gap-3">
                    {t.btnStart}
                  </Link>
                  <Link href="/docs" className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-transparent border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white font-bold text-[11px] font-mono uppercase tracking-widest hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all text-center rounded shadow-sm dark:shadow-none">
                    {t.btnDocs}
                  </Link>
                </div>
              </div>

              <div className="col-span-1 lg:col-span-5 w-full relative hidden md:block">
                <div className="bg-white/80 dark:bg-[#080808]/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 relative shadow-2xl transition-colors">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                     <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">{t.liveActivity}</span>
                     <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  </div>
                  <div className="space-y-4">
                     {ACTIVITIES_DATA.map((act) => (
                       <div key={act.id} className="flex items-center gap-4 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800/50">
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

          <section className="relative z-10 border-y border-zinc-200 dark:border-white/5 bg-white/90 dark:bg-[#020202]/90 backdrop-blur-md py-12 transition-colors">
             <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">{t.trustBadge}</span>
             </div>
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-zinc-200 dark:divide-zinc-800">
               <div className="flex flex-col items-center justify-center pt-4 md:pt-0">
                 <span className="text-4xl md:text-5xl font-mono font-bold text-zinc-900 dark:text-white mb-2 tracking-tighter transition-colors">${stats.vol.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                 <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{t.statVolDesc}</span>
               </div>
               <div className="flex flex-col items-center justify-center pt-8 md:pt-0">
                 <span className="text-4xl md:text-5xl font-mono font-bold text-zinc-900 dark:text-white mb-2 tracking-tighter transition-colors">{stats.com.toLocaleString('en-US')}</span>
                 <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{t.statComDesc}</span>
               </div>
               <div className="flex flex-col items-center justify-center pt-8 md:pt-0">
                 <span className="text-4xl md:text-5xl font-mono font-bold text-zinc-900 dark:text-white mb-2 tracking-tighter transition-colors">{stats.user.toLocaleString('en-US')}</span>
                 <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{t.statUserDesc}</span>
               </div>
            </div>
          </section>

          <section id="product" className="relative z-10 py-24 px-6 max-w-7xl mx-auto scroll-mt-16">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-zinc-900 dark:text-white">{t.howTitle}</h2>
              <p className="text-sm md:text-base text-zinc-500 max-w-2xl mx-auto">{t.howSub}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[{ step: "01", title: t.how1, desc: t.how1Desc }, { step: "02", title: t.how2, desc: t.how2Desc }, { step: "03", title: t.how3, desc: t.how3Desc }].map((item, i) => (
                <div key={i} className="relative p-8 bg-white dark:bg-[#050505] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm dark:shadow-none transition-colors group">
                  <span className="absolute -top-6 -left-2 text-6xl font-bold text-zinc-100 dark:text-zinc-900/50 group-hover:text-blue-50 dark:group-hover:text-[#00ffcc]/10 transition-colors z-0">{item.step}</span>
                  <div className="relative z-10 mt-4">
                    <h3 className="text-xl font-bold mb-3 text-zinc-900 dark:text-white">{item.title}</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="solutions" className="relative z-10 py-24 px-6 max-w-7xl mx-auto scroll-mt-16 border-t border-zinc-200 dark:border-white/5 transition-colors">
            <div className="mb-16 text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-zinc-900 dark:text-white">{t.featTitle} <span className="text-zinc-400 dark:text-zinc-500">{t.featSub}</span></h2>
              <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed mx-auto md:mx-0">{t.featDesc}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: t.feat1Title, desc: t.feat1Desc, icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" },
                { title: t.feat2Title, desc: t.feat2Desc, icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
                { title: t.feat3Title, desc: t.feat3Desc, icon: "M8 9l3 3-3 3m5 0h3M4 17h16a2 2 0 002-2V9a2 2 0 00-2-2H4a2 2 0 00-2 2v6a2 2 0 002 2z" }
              ].map((feat, i) => (
                <div key={i} className="bg-white dark:bg-[#080808] border border-zinc-200 dark:border-zinc-800 p-8 rounded-xl shadow-sm dark:shadow-none hover:border-blue-300 dark:hover:border-zinc-600 transition-colors group">
                  <div className="size-12 rounded-xl bg-blue-50 dark:bg-zinc-900 border border-blue-100 dark:border-zinc-800 flex items-center justify-center mb-6 group-hover:border-blue-400 dark:group-hover:border-[#00ffcc] transition-colors">
                    <svg className="size-6 text-blue-600 dark:text-zinc-400 dark:group-hover:text-[#00ffcc]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feat.icon} /></svg>
                  </div>
                  <h3 className="font-bold text-lg mb-3 text-zinc-900 dark:text-white">{feat.title}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="pricing" className="relative z-10 py-24 px-6 max-w-7xl mx-auto border-t border-zinc-200 dark:border-white/5 scroll-mt-16 transition-colors">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-zinc-900 dark:text-white">{t.pricingTitle}</h2>
              <p className="text-sm md:text-base text-zinc-500 max-w-2xl mx-auto">{t.pricingSub}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-white dark:bg-[#080808] border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm flex flex-col">
                <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white">{t.p1Name}</h3>
                <p className="text-sm text-zinc-500 mb-6 min-h-10">{t.p1Desc}</p>
                <div className="mb-8"><span className="text-4xl font-bold text-zinc-900 dark:text-white">{t.p1Price}</span></div>
                <ul className="space-y-4 mb-8 flex-1">
                  {[t.p1Feat1, t.p1Feat2, t.p1Feat3, t.p1Feat4].map((f, i) => (<li key={i} className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-300"><svg className="size-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{f}</li>))}
                </ul>
                <Link href="/login" className="w-full py-3 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white font-bold text-xs uppercase tracking-widest hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors text-center rounded">{t.btnFree}</Link>
              </div>

              <div className="p-8 bg-blue-50 dark:bg-[#050505] border-2 border-blue-600 dark:border-[#00ffcc] rounded-2xl shadow-xl flex flex-col relative transform md:-translate-y-4">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 dark:bg-[#00ffcc] text-white dark:text-black font-bold text-[10px] uppercase tracking-widest px-4 py-1 rounded-full whitespace-nowrap">{t.badgePopular}</div>
                <h3 className="text-xl font-bold mb-2 text-blue-900 dark:text-white">{t.p2Name}</h3>
                <p className="text-sm text-blue-700/80 dark:text-zinc-400 mb-6 min-h-10">{t.p2Desc}</p>
                <div className="mb-8"><span className="text-4xl font-bold text-blue-900 dark:text-white">{t.p2Price}</span><span className="text-sm text-blue-700/80 dark:text-zinc-500">{t.p2Period}</span></div>
                <ul className="space-y-4 mb-8 flex-1">
                  {[t.p2Feat1, t.p2Feat2, t.p2Feat3, t.p2Feat4].map((f, i) => (<li key={i} className="flex items-center gap-3 text-sm text-blue-900 dark:text-zinc-200"><svg className="size-4 text-blue-600 dark:text-[#00ffcc]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{f}</li>))}
                </ul>
                <Link href="/login" className="w-full py-3 bg-blue-600 dark:bg-[#00ffcc] text-white dark:text-black font-bold text-xs uppercase tracking-widest hover:bg-blue-700 dark:hover:bg-[#00e6b8] transition-colors text-center rounded shadow-lg">{t.btnPro}</Link>
              </div>

              <div className="p-8 bg-white dark:bg-[#080808] border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm flex flex-col">
                <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white">{t.p3Name}</h3>
                <p className="text-sm text-zinc-500 mb-6 min-h-10">{t.p3Desc}</p>
                <div className="mb-8"><span className="text-4xl font-bold text-zinc-900 dark:text-white">{t.p3Price}</span></div>
                <ul className="space-y-4 mb-8 flex-1">
                  {[t.p3Feat1, t.p3Feat2, t.p3Feat3, t.p3Feat4].map((f, i) => (<li key={i} className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-300"><svg className="size-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{f}</li>))}
                </ul>
                <a href="mailto:hello@axeon.com" className="w-full py-3 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white font-bold text-xs uppercase tracking-widest hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors text-center rounded block">{t.btnEnterprise}</a>
              </div>
            </div>
          </section>

          <section className="py-24 px-6 max-w-4xl mx-auto border-t border-zinc-200 dark:border-white/5 transition-colors">
            <h2 className="text-3xl font-bold mb-12 tracking-tight text-center text-zinc-900 dark:text-white">{t.faqTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {q: t.faq1Q, a: t.faq1A}, {q: t.faq2Q, a: t.faq2A}, {q: t.faq3Q, a: t.faq3A}, {q: t.faq5Q, a: t.faq5A}
              ].map((item, i) => (
                <div key={i} className="p-8 bg-white dark:bg-[#080808] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm">
                  <h4 className="font-bold mb-3 text-zinc-900 dark:text-white">{item.q}</h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.a}</p>
                </div>
              ))}
              <div className="md:col-span-2 p-8 bg-white dark:bg-[#080808] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm">
                <h4 className="font-bold mb-3 text-zinc-900 dark:text-white">{t.faq4Q}</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{t.faq4A}</p>
              </div>
            </div>
          </section>

          <footer className="relative z-10 w-full bg-zinc-100 dark:bg-[#030303] pt-20 pb-10 px-6 transition-colors border-t border-zinc-200 dark:border-zinc-800/50">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-16">
                <div className="col-span-2 md:col-span-2">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="size-3 bg-blue-600 dark:bg-[#00ffcc] shadow-[0_0_15px_rgba(37,99,235,0.5)] dark:shadow-[0_0_15px_#00ffcc]" />
                    <span className="font-bold tracking-widest text-sm text-zinc-900 dark:text-white">AXEON</span>
                  </div>
                  <p className="text-sm text-zinc-500 max-w-sm leading-relaxed mb-6">The financial layer for the next generation of premium digital communities. Decentralized, zero-custody, and instantly settled on Solana.</p>
                </div>

                <div className="col-span-1">
                  <h4 className="font-bold text-xs uppercase tracking-widest mb-6 text-zinc-900 dark:text-white">{t.footProduct}</h4>
                  <ul className="space-y-4 text-sm text-zinc-500">
                    <li><Link href="/docs" className="hover:text-blue-600 dark:hover:text-[#00ffcc] transition-colors">{t.flDocs}</Link></li>
                    <li><a href="#pricing" className="hover:text-blue-600 dark:hover:text-[#00ffcc] transition-colors">{t.flPricing}</a></li>
                  </ul>
                </div>

                <div className="col-span-1">
                  <h4 className="font-bold text-xs uppercase tracking-widest mb-6 text-zinc-900 dark:text-white">{t.footSolutions}</h4>
                  <ul className="space-y-4 text-sm text-zinc-500">
                    <li><span className="cursor-pointer hover:text-blue-600 dark:hover:text-[#00ffcc] transition-colors">{t.flTelegram}</span></li>
                    <li><span className="cursor-pointer hover:text-blue-600 dark:hover:text-[#00ffcc] transition-colors">{t.flFiat}</span></li>
                  </ul>
                </div>

                <div className="col-span-1">
                  <h4 className="font-bold text-xs uppercase tracking-widest mb-6 text-zinc-900 dark:text-white">{t.footResources}</h4>
                  <ul className="space-y-4 text-sm text-zinc-500">
                    <li><Link href="/about" className="hover:text-blue-600 dark:hover:text-[#00ffcc] transition-colors">{t.flAbout}</Link></li>
                    <li><Link href="/blog" className="hover:text-blue-600 dark:hover:text-[#00ffcc] transition-colors">{t.flBlog}</Link></li>
                  </ul>
                </div>

                <div className="col-span-1">
                  <h4 className="font-bold text-xs uppercase tracking-widest mb-6 text-zinc-900 dark:text-white">{t.footLegal}</h4>
                  <ul className="space-y-4 text-sm text-zinc-500">
                    <li><Link href="/privacy" className="hover:text-blue-600 dark:hover:text-[#00ffcc] transition-colors">{t.flPrivacy}</Link></li>
                    <li><Link href="/terms" className="hover:text-blue-600 dark:hover:text-[#00ffcc] transition-colors">{t.flTerms}</Link></li>
                    <li><Link href="/security" className="hover:text-blue-600 dark:hover:text-[#00ffcc] transition-colors">{t.flSecurity}</Link></li>
                  </ul>
                </div>

              </div>
              <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
                <span className="text-xs text-zinc-500">&copy; {new Date().getFullYear()} {t.footRights}</span>
                <div className="flex gap-4">
                  <a href="https://x.com/axeonprotocol" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="text-zinc-400 hover:text-blue-600 dark:hover:text-[#00ffcc] transition-colors">
                    <svg className="size-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 4.076H5.078z"/></svg>
                  </a>
                  <a href="https://github.com/NaufalAufaaAbyan/Axeon-Management-Protocol" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-zinc-400 hover:text-blue-600 dark:hover:text-[#00ffcc] transition-colors">
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