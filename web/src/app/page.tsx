"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { useAxeonStore } from '../store/useAxeonStore';
import { dict } from '../lib/dictionary';
import Navbar from '../components/navbar/navbar';
import Shuffle from '../components/magic/Shuffle';
import { 
  FiArrowRight, FiActivity, FiShield, FiCpu, FiGlobe, 
  FiLayers, FiPieChart, FiLock, FiCheck, FiZap, FiTrendingUp 
} from 'react-icons/fi';

const ACTIVITIES_DATA = [
  { id: 1, type: 'Subscription', amount: '+ 25.00', currency: 'USDC', time: 'new' },
  { id: 2, type: 'Fiat On-Ramp', amount: '+ 50.00', currency: 'USD', time: 'old1' },
  { id: 3, type: 'Renewal Sweep', amount: '+ 10.00', currency: 'USDC', time: 'old2' },
];

const springUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 20 } }
};

const staggerWrap: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const floatAnim = {
  y: [0, -8, 0],
  transition: { duration: 4, repeat: Infinity, ease: "easeInOut" as const }
};

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const { lang } = useAxeonStore();
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacityParallax = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => setIsClient(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const t = dict[lang as keyof typeof dict];

  const getTimeString = (timeType: string) => {
    if (timeType === 'new') return t.timeNew;
    if (timeType === 'old1') return t.timeOld1;
    if (timeType === 'old2') return t.timeOld2;
    return t.timeNew;
  };

  if (!isClient) return null;

  const roadmap = [
    { q: 'Q1', year: '2026', title: 'Foundation', desc: 'Architecture design, ZK-Proof R&D, and Solana Smart Contract prototyping.', status: 'completed' },
    { q: 'Q2', year: '2026', title: 'Initialization', desc: 'Hackathon MVP, Devnet Deployment, Telegram Sentinel Bot, & Fiat Gateway.', status: 'current' },
    { q: 'Q3', year: '2026', title: 'Scaling & Audit', desc: 'Mainnet Beta release, external security audits, and early creator onboarding.', status: 'upcoming' },
    { q: 'Q4', year: '2026', title: 'Expansion', desc: 'Full public launch, advanced analytics dashboard, and Enterprise DAO features.', status: 'upcoming' },
  ];

  return (
    // FIX: Mengganti bg solid menjadi transparan agar magic layer di bawahnya terlihat
    <div className="min-h-screen bg-transparent">
      <main className="relative w-full flex flex-col font-sans scroll-smooth selection:bg-zinc-300 dark:selection:bg-zinc-700 overflow-hidden text-zinc-900 dark:text-zinc-100">
        
        <Navbar />

        {/* ================= HERO SECTION ================= */}
        <section className="relative pt-48 pb-20 px-6 flex items-center min-h-[90vh] max-w-7xl mx-auto z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-150 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-zinc-200/50 dark:from-zinc-800/20 via-transparent to-transparent blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full items-center">
            <motion.div style={{ y: yParallax, opacity: opacityParallax }} className="col-span-1 lg:col-span-7 flex flex-col items-start text-left z-10 w-full">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} 
                className="flex items-center gap-3 border border-zinc-300 dark:border-zinc-800 bg-white/50 dark:bg-black/50 backdrop-blur-md px-4 py-2 rounded-full mb-10 shadow-sm"
              >
                <div className="size-2 bg-zinc-800 dark:bg-zinc-200 rounded-full animate-pulse" />
                <span className="font-black text-[9px] text-zinc-600 dark:text-zinc-400 tracking-[0.3em] uppercase">{t.badge}</span>
              </motion.div>
              
              <h1 className="flex flex-col text-left mb-6 w-full uppercase italic tracking-tighter leading-[0.9]">
                <div className="overflow-hidden pb-1 flex justify-start"><Shuffle textAlign="left" text={t.heroTitle1} className="text-5xl md:text-7xl lg:text-[85px] font-black text-zinc-900 dark:text-white" /></div>
                <div className="overflow-hidden pb-1 flex justify-start"><Shuffle textAlign="left" text={t.heroTitle2} className="text-5xl md:text-7xl lg:text-[85px] font-black text-zinc-500 dark:text-zinc-400" /></div>
                <div className="overflow-hidden pb-1 flex justify-start"><Shuffle textAlign="left" text={t.heroTitle3} className="text-5xl md:text-7xl lg:text-[85px] font-black text-zinc-900 dark:text-white" /></div>
              </h1>
              
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }} className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-lg leading-relaxed mb-10 italic font-medium">
                {t.heroSub}
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto relative">
                <Link href="/login" className="w-full sm:w-auto h-14 px-10 bg-zinc-900 dark:bg-white text-white dark:text-black font-black text-[10px] uppercase tracking-widest hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all rounded-xl relative z-10 flex items-center justify-center gap-3 shadow-lg active:scale-95 group">
                  {t.btnStart} <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/docs" className="w-full sm:w-auto h-14 px-8 bg-white/50 dark:bg-black/50 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-white font-black text-[10px] uppercase tracking-widest hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all rounded-xl flex items-center justify-center backdrop-blur-md">
                  {t.btnDocs}
                </Link>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, type: "spring" }}
              className="col-span-1 lg:col-span-5 w-full relative hidden lg:block"
            >
              <div className="bg-white/70 dark:bg-[#111111]/80 backdrop-blur-2xl border border-zinc-200 dark:border-zinc-800/80 rounded-4xl p-6 relative shadow-2xl">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-200 dark:border-zinc-800">
                   <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                     <FiActivity /> {t.liveActivity}
                   </span>
                   <span className="flex h-2 w-2 rounded-full bg-zinc-800 dark:bg-zinc-300 animate-pulse"></span>
                </div>
                <div className="space-y-3">
                   {ACTIVITIES_DATA.map((act, i) => (
                     <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 + (i * 0.1) }} key={act.id} className="flex items-center gap-4 p-4 rounded-xl bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800/50">
                       <div className="size-10 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center">
                         {act.currency === 'USD' ? <FiGlobe size={16}/> : <FiActivity size={16} />}
                       </div>
                       <div className="flex-1">
                         <div className="text-[10px] font-black text-zinc-900 dark:text-white uppercase tracking-widest">{act.type}</div>
                         <div className="text-[9px] font-bold text-zinc-500 uppercase mt-1">{getTimeString(act.time)}</div>
                       </div>
                       <div className="text-right">
                         <span className="text-xs font-black tracking-widest text-zinc-900 dark:text-white">
                           {act.amount} <span className="text-[9px] text-zinc-500">{act.currency}</span>
                         </span>
                       </div>
                     </motion.div>
                   ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================= BENTO INTELLIGENCE ================= */}
        <section id="solutions" className="relative z-10 py-24 px-6 max-w-7xl mx-auto scroll-mt-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerWrap} className="grid grid-cols-1 md:grid-cols-12 gap-5">
            <motion.div variants={springUp} className="md:col-span-8 p-10 rounded-4xl bg-white dark:bg-[#111111] border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between group overflow-hidden relative shadow-lg">
              <div className="space-y-6 relative z-10 text-left">
                <div className="size-14 rounded-2xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-800 dark:text-zinc-200"><FiPieChart size={24} /></div>
                <h3 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white italic uppercase tracking-tighter leading-none">The 20% <br/> Revenue Gap.</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed max-w-lg italic">
                  Manual management fails to revoke expired access. Axeon automates the purge the exact second a subscription ends. <strong className="text-zinc-900 dark:text-white">No leakage. Pure performance.</strong>
                </p>
              </div>
              <div className="mt-16 flex flex-wrap gap-12 relative z-10 text-left">
                 <div>
                    <div className="text-5xl font-black text-zinc-900 dark:text-white italic tracking-tighter">20%</div>
                    <div className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 mt-3">Revenue Recovered</div>
                 </div>
                 <div>
                    <div className="text-5xl font-black text-zinc-400 dark:text-zinc-600 italic tracking-tighter">40%</div>
                    <div className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 mt-3">Admin Efficiency</div>
                 </div>
              </div>
            </motion.div>

            <motion.div variants={springUp} className="md:col-span-4 p-10 rounded-4xl bg-zinc-100 dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between text-left shadow-lg">
               <motion.div animate={floatAnim} className="relative z-10"><FiShield className="text-zinc-800 dark:text-zinc-200 size-12 mb-16" /></motion.div>
               <div className="space-y-4 relative z-10">
                  <h4 className="font-black text-zinc-900 dark:text-white uppercase text-xs tracking-widest italic">Unbiased Sentinel</h4>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400 font-bold uppercase leading-relaxed italic">
                    Our autonomous agent performs state audits every 60 seconds. Zero-tolerance enforcement.
                  </p>
               </div>
            </motion.div>

            <motion.div variants={springUp} className="md:col-span-4 p-10 rounded-4xl bg-white dark:bg-[#111111] border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between text-left shadow-lg">
               <motion.div animate={floatAnim} className="relative z-10"><FiTrendingUp className="text-zinc-800 dark:text-zinc-200 size-12 mb-16" /></motion.div>
               <div className="space-y-4 relative z-10">
                  <h4 className="font-black text-zinc-900 dark:text-white uppercase text-xs tracking-widest italic">Flat 5% Fee</h4>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400 font-bold uppercase leading-relaxed italic">
                    Aligned with creators. Zero upfront cost. Non-custodial payouts directly to your vault.
                  </p>
               </div>
            </motion.div>

            <motion.div variants={springUp} className="md:col-span-8 p-10 rounded-4xl bg-zinc-900 dark:bg-[#0a0a0a] border border-zinc-800 flex items-center justify-between overflow-hidden relative shadow-lg">
               <div className="space-y-6 relative z-10 text-left">
                  <h3 className="text-3xl md:text-4xl font-black text-white italic uppercase tracking-tighter">Stateless Protocol.</h3>
                  <p className="text-[11px] text-zinc-400 font-black uppercase tracking-widest italic max-w-sm leading-loose">
                    Connecting global Fiat/Crypto identifiers with Web3 infrastructure without friction. Shielded settlement active.
                  </p>
               </div>
               <FiLayers size={180} className="text-zinc-800 dark:text-white/5 absolute -right-10 -bottom-10" />
            </motion.div>
          </motion.div>
        </section>

        {/* ================= DEVELOPMENT ROADMAP ================= */}
        <section className="py-24 px-6 max-w-7xl mx-auto border-t border-zinc-200 dark:border-zinc-800/50">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-zinc-900 dark:text-white mb-4">Development Roadmap</h2>
            <p className="text-xs font-black uppercase tracking-[0.4em] text-zinc-500 italic">May 2026 Status Update</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {roadmap.map((item, i) => (
              <div key={i} className={`p-8 rounded-4xl border transition-all ${
                item.status === 'current' 
                  ? 'bg-zinc-900 dark:bg-zinc-100 border-zinc-900 dark:border-white shadow-xl scale-105 z-10 relative' 
                  : 'bg-white dark:bg-[#111111] border-zinc-200 dark:border-zinc-800 opacity-70'
              }`}>
                <div className="flex justify-between items-start mb-6">
                  <span className={`text-3xl font-black italic tracking-tighter ${item.status === 'current' ? 'text-white dark:text-black' : 'text-zinc-900 dark:text-white'}`}>{item.q}</span>
                  {item.status === 'completed' && <FiCheck className="text-emerald-500 size-5" />}
                  {item.status === 'current' && <div className="px-2 py-1 bg-white/20 dark:bg-black/10 rounded text-[9px] font-black uppercase tracking-widest text-white dark:text-black animate-pulse">Now</div>}
                </div>
                <h4 className={`font-black text-sm uppercase tracking-widest mb-3 ${item.status === 'current' ? 'text-white dark:text-black' : 'text-zinc-900 dark:text-white'}`}>{item.title}</h4>
                <p className={`text-xs leading-relaxed ${item.status === 'current' ? 'text-zinc-300 dark:text-zinc-600 font-medium' : 'text-zinc-500'}`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= 8-STAGE WORKFLOW ENGINE ================= */}
        <section className="py-24 px-6 bg-zinc-100/50 dark:bg-[#0d0d0d]/50 border-y border-zinc-200 dark:border-zinc-800/50 overflow-hidden">
          <div className="max-w-4xl mx-auto space-y-16">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-left space-y-4">
              <h2 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white italic uppercase tracking-tighter leading-none">The Engine.</h2>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 italic">8 Stages of Unbiased Performance</p>
            </motion.div>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerWrap} className="grid gap-3">
              {[
                { s: 'Pulse Contact', d: 'Automated contact via Telegram gateway.', i: <FiCpu/> },
                { s: 'Hybrid Identity', d: 'Syncing Google or Wallet identifiers.', i: <FiLock/> },
                { s: 'Settlement Hub', d: 'Instant verification of local/digital assets.', i: <FiGlobe/> },
                { s: 'Proof Audit', d: 'Protocol validation of payment evidence.', i: <FiCheck/> },
                { s: 'Access Grant', d: 'Encrypted, single-use invite links issued.', i: <FiLayers/> },
                { s: 'Identity Sync', d: 'Cross-platform member verification.', i: <FiActivity/> },
                { s: 'Real-time Guard', d: 'Status monitoring every sixty seconds.', i: <FiShield/> },
                { s: 'Auto-Purge', d: 'Ruthless revocation of expired permissions.', i: <FiZap/> }
              ].map((step, i) => (
                <motion.div 
                  key={i} variants={springUp}
                  className="group p-6 rounded-2xl bg-white dark:bg-[#111111] border border-zinc-200 dark:border-zinc-800 flex items-center gap-6 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all text-left shadow-sm"
                >
                  <div className="text-zinc-300 dark:text-zinc-700 font-black italic text-2xl w-10 text-center transition-colors group-hover:text-zinc-900 dark:group-hover:text-white">0{i+1}</div>
                  <div className="size-12 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-600 dark:text-zinc-400">{step.i}</div>
                  <div className="flex-1">
                    <h4 className="font-black uppercase italic text-sm text-zinc-900 dark:text-white tracking-widest mb-1">{step.s}</h4>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">{step.d}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ================= REFINED FINAL CTA ================= */}
        <section className="py-24 px-6 text-center">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={springUp}
            className="max-w-4xl mx-auto rounded-[3rem] bg-zinc-900 dark:bg-zinc-100 p-12 md:p-16 relative overflow-hidden shadow-2xl"
          >
            <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-white dark:text-black mb-8 relative z-10 leading-[0.9]">Secure Your <br/> Sovereignty.</h2>
            <div className="relative z-10 inline-block">
              <Link href="/login" title="Initialize Infrastructure" aria-label="Initialize Infrastructure" className="h-14 px-10 rounded-xl bg-white dark:bg-black text-zinc-900 dark:text-white font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center shadow-xl hover:scale-105 transition-all">
                Initialize Infrastructure
              </Link>
            </div>
            <p className="mt-10 text-[9px] font-black uppercase tracking-[0.4em] text-zinc-400 dark:text-zinc-500 relative z-10 italic">Zero Upfront Cost • Shielded Settlement</p>
          </motion.div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="relative z-10 w-full bg-white dark:bg-[#050505] pt-20 pb-10 px-6 border-t border-zinc-200 dark:border-zinc-800">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-16">
              <div className="col-span-2 md:col-span-2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="size-3 bg-zinc-900 dark:bg-white rounded-sm" />
                  <span className="font-black tracking-widest text-lg text-zinc-900 dark:text-white uppercase italic">AXEON</span>
                </div>
                <p className="text-[11px] text-zinc-500 max-w-xs leading-relaxed font-bold uppercase tracking-widest italic">
                  The financial layer for the next generation of premium digital communities. Decentralized, zero-custody, and instantly settled on Solana.
                </p>
              </div>

              <div className="col-span-1">
                <h4 className="font-black text-[9px] uppercase tracking-widest mb-6 text-zinc-900 dark:text-white">Product</h4>
                <ul className="space-y-4 text-[10px] font-bold tracking-widest uppercase text-zinc-500">
                  <li><Link href="/docs" title={t.flDocs} className="hover:text-zinc-900 dark:hover:text-white transition-colors">{t.flDocs}</Link></li>
                  <li><Link href="/changelog" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Changelog</Link></li>
                  <li><a href="#solutions" title={t.flPricing} className="hover:text-zinc-900 dark:hover:text-white transition-colors">{t.flPricing}</a></li>
                </ul>
              </div>

              <div className="col-span-1">
                <h4 className="font-black text-[9px] uppercase tracking-widest mb-6 text-zinc-900 dark:text-white">Solutions</h4>
                <ul className="space-y-4 text-[10px] font-bold tracking-widest uppercase text-zinc-500">
                  <li><span className="cursor-pointer hover:text-zinc-900 dark:hover:text-white transition-colors">{t.flTelegram}</span></li>
                  <li><span className="cursor-pointer hover:text-zinc-900 dark:hover:text-white transition-colors">{t.flFiat}</span></li>
                </ul>
              </div>

              <div className="col-span-1">
                <h4 className="font-black text-[9px] uppercase tracking-widest mb-6 text-zinc-900 dark:text-white">Resources</h4>
                <ul className="space-y-4 text-[10px] font-bold tracking-widest uppercase text-zinc-500">
                  <li><Link href="/about" title={t.flAbout} className="hover:text-zinc-900 dark:hover:text-white transition-colors">{t.flAbout}</Link></li>
                  <li><Link href="/blog" title={t.flBlog} className="hover:text-zinc-900 dark:hover:text-white transition-colors">{t.flBlog}</Link></li>
                  <li><Link href="/security" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Security</Link></li>
                </ul>
              </div>

              <div className="col-span-1">
                <h4 className="font-black text-[9px] uppercase tracking-widest mb-6 text-zinc-900 dark:text-white">Legal</h4>
                <ul className="space-y-4 text-[10px] font-bold tracking-widest uppercase text-zinc-500">
                  <li><Link href="/privacy" title={t.flPrivacy} className="hover:text-zinc-900 dark:hover:text-white transition-colors">{t.flPrivacy}</Link></li>
                  <li><Link href="/terms" title={t.flTerms} className="hover:text-zinc-900 dark:hover:text-white transition-colors">{t.flTerms}</Link></li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400">&copy; {new Date().getFullYear()} {t.footRights}</span>
              <div className="flex gap-4 items-center">
                <a href="https://github.com/NaufalAufaaAbyan/Axeon-Management-Protocol" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                  <svg className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}