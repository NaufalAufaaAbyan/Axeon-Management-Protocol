"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useAxeonStore } from '../../store/useAxeonStore';
import { dict } from '../../lib/dictionary';

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();
  const { lang, setLang } = useAxeonStore();

  useEffect(() => {
    // FIX: Gunakan requestAnimationFrame
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const t = dict[lang];

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-zinc-200 dark:border-white/5 bg-white/70 dark:bg-black/70 backdrop-blur-xl transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-3 cursor-pointer group">
            <div className="size-2.5 bg-blue-600 dark:bg-[#00ffcc] shadow-[0_0_10px_rgba(37,99,235,0.5)] dark:shadow-[0_0_10px_#00ffcc] group-hover:scale-110 transition-transform" />
            <span className="font-bold tracking-widest text-xs text-zinc-900 dark:text-white transition-colors">AXEON</span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-6">
            <Link href="/#product" className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-white uppercase tracking-widest transition-colors">{t.navProduct}</Link>
            <Link href="/#solutions" className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-white uppercase tracking-widest transition-colors">{t.navSolutions}</Link>
            <Link href="/#pricing" className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-white uppercase tracking-widest transition-colors">{t.navPricing}</Link>
            <Link href="/docs" className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-white uppercase tracking-widest transition-colors">{t.navDocs}</Link>
          </div>
        </div>
        
        <div className="flex items-center gap-4 md:gap-6">
          <button onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')} aria-label="Toggle Theme" className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-500 dark:text-zinc-400 z-10">
            {currentTheme === 'dark' ? (
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            ) : (
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            )}
          </button>

          <div className="flex items-center bg-zinc-100 dark:bg-zinc-900/80 p-1 rounded border border-zinc-200 dark:border-white/5 transition-colors z-10">
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 font-mono text-[9px] font-bold tracking-widest transition-colors rounded-sm ${lang === 'en' ? 'bg-white dark:bg-zinc-800 text-blue-600 dark:text-[#00ffcc] shadow-sm' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-white'}`}>EN</button>
            <button onClick={() => setLang('id')} className={`px-2.5 py-1 font-mono text-[9px] font-bold tracking-widest transition-colors rounded-sm ${lang === 'id' ? 'bg-white dark:bg-zinc-800 text-blue-600 dark:text-[#00ffcc] shadow-sm' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-white'}`}>ID</button>
          </div>
          
          <Link href="/login" className="px-5 py-2 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold text-[10px] font-mono uppercase tracking-widest hover:bg-blue-600 dark:hover:bg-[#00ffcc] transition-colors rounded-sm shadow-md dark:shadow-[0_0_15px_rgba(255,255,255,0.1)] z-10">
            {t.btnDashboard} &rarr;
          </Link>
        </div>
      </div>
    </nav>
  );
}