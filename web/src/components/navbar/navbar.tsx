"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useAxeonStore } from '../../store/useAxeonStore';
import { dict } from '../../lib/dictionary';
import { FiSun, FiMoon, FiMenu, FiX, FiGithub, FiTwitter } from 'react-icons/fi';

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const { lang, setLang } = useAxeonStore();

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!mounted) return null;
  const t = dict[lang];

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-zinc-200 dark:border-zinc-800/80 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-2xl transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* LOGO & DESKTOP LINKS */}
        <div className="flex items-center gap-12">
          <Link href="/" title="Axeon Home" className="flex items-center gap-3 cursor-pointer group">
            <div className="size-3 bg-zinc-900 dark:bg-white shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(255,255,255,0.3)] group-hover:scale-110 transition-transform rounded-sm" />
            <span className="font-black tracking-widest text-sm text-zinc-900 dark:text-white transition-colors italic uppercase">AXEON</span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/#product" className="text-[10px] font-black text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white uppercase tracking-widest transition-colors">{t.navProduct}</Link>
            <Link href="/#solutions" className="text-[10px] font-black text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white uppercase tracking-widest transition-colors">{t.navSolutions}</Link>
            <Link href="/docs" className="text-[10px] font-black text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white uppercase tracking-widest transition-colors">{t.navDocs}</Link>
            {/* TAMBAHAN NAVIGASI CHANGELOG */}
            <Link href="/changelog" className="text-[10px] font-black text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white uppercase tracking-widest transition-colors">Changelog</Link>
          </div>
        </div>
        
        {/* RIGHT ACTIONS */}
        <div className="hidden lg:flex items-center gap-5">
          <div className="flex items-center gap-3 pr-5 border-r border-zinc-200 dark:border-zinc-800">
            <a href="https://x.com/axeonprotocol" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
              <FiTwitter size={16} />
            </a>
            <a href="https://github.com/NaufalAufaaAbyan/Axeon-Management-Protocol" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
              <FiGithub size={16} />
            </a>
          </div>

          <div className="flex items-center bg-zinc-100 dark:bg-zinc-900 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800 transition-colors">
            <button onClick={() => setLang('en')} aria-label="English" className={`px-3 py-1.5 font-black text-[9px] uppercase tracking-widest transition-all rounded-md ${lang === 'en' ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-white'}`}>EN</button>
            <button onClick={() => setLang('id')} aria-label="Indonesian" className={`px-3 py-1.5 font-black text-[9px] uppercase tracking-widest transition-all rounded-md ${lang === 'id' ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-white'}`}>ID</button>
          </div>

          <button 
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')} 
            className="size-9 flex items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-zinc-500 dark:text-zinc-400"
            aria-label="Toggle Theme"
            title="Toggle Theme"
          >
            {resolvedTheme === 'dark' ? <FiSun size={14} /> : <FiMoon size={14} />}
          </button>
          
          <Link href="/login" title="Go to Dashboard" className="h-9 px-6 bg-zinc-900 dark:bg-white text-white dark:text-black font-black text-[9px] uppercase tracking-widest hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors rounded-lg shadow-lg flex items-center justify-center hover:scale-105 active:scale-95">
            {t.btnDashboard}
          </Link>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button className="lg:hidden p-2 text-zinc-600 dark:text-zinc-400" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle Mobile Menu">
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-white dark:bg-[#0a0a0a] border-b border-zinc-200 dark:border-zinc-800 p-6 flex flex-col gap-6 shadow-2xl">
          <Link href="/#product" onClick={() => setIsMobileMenuOpen(false)} className="text-xs font-black text-zinc-900 dark:text-white uppercase tracking-widest">{t.navProduct}</Link>
          <Link href="/#solutions" onClick={() => setIsMobileMenuOpen(false)} className="text-xs font-black text-zinc-900 dark:text-white uppercase tracking-widest">{t.navSolutions}</Link>
          <Link href="/docs" onClick={() => setIsMobileMenuOpen(false)} className="text-xs font-black text-zinc-900 dark:text-white uppercase tracking-widest">{t.navDocs}</Link>
          <Link href="/changelog" onClick={() => setIsMobileMenuOpen(false)} className="text-xs font-black text-zinc-900 dark:text-white uppercase tracking-widest">Changelog</Link>
          <hr className="border-zinc-200 dark:border-zinc-800" />
          <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="h-12 w-full bg-zinc-900 dark:bg-white text-white dark:text-black font-black text-[10px] uppercase tracking-widest rounded-xl flex items-center justify-center">
            {t.btnDashboard}
          </Link>
        </div>
      )}
    </nav>
  );
}