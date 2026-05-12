"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useAxeonStore } from '../../store/useAxeonStore';
import { dict } from '../../lib/dictionary';
import { FiSun, FiMoon, FiMenu, FiX, FiGithub, FiTwitter, FiLogOut, FiUser, FiZap } from 'react-icons/fi';
import Image from 'next/image';

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  
  const { lang, setLang, isAuthenticated, userName, userImage, walletAddress, logout, role } = useAxeonStore();

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;
  const t = dict[lang as keyof typeof dict];
  const dashboardPath = role === 'admin' ? '/dashboard/admin' : '/dashboard/user';

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-zinc-200/50 dark:border-white/5 bg-white/70 dark:bg-[#050505]/70 backdrop-blur-2xl transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        <Link href="/" title="Axeon Home" className="flex items-center gap-3 cursor-pointer group">
          <div className="size-3.5 bg-zinc-900 dark:bg-white shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(255,255,255,0.3)] group-hover:rotate-45 transition-all duration-300 rounded-sm" />
          <span className="font-black tracking-[0.2em] text-sm text-zinc-900 dark:text-white transition-colors italic uppercase">AXEON</span>
        </Link>
        
        <div className="hidden lg:flex items-center gap-8">
          {['Product', 'Solutions', 'Docs', 'Changelog'].map((item) => {
            const urlPath = (item === 'Product' || item === 'Solutions') ? `/#${item.toLowerCase()}` : `/${item.toLowerCase()}`;
            return (
              <Link key={item} title={`Go to ${item}`} href={urlPath} className="text-[10px] font-black text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white uppercase tracking-widest transition-all hover:-translate-y-0.5">
                {t[`nav${item}` as keyof typeof t] || item}
              </Link>
            );
          })}
        </div>
        
        <div className="hidden lg:flex items-center gap-5">
          <div className="flex items-center gap-4 pr-5 border-r border-zinc-200 dark:border-white/10">
            <a href="https://x.com/axeonprotocol" target="_blank" rel="noopener noreferrer" title="Axeon Twitter" aria-label="Axeon Twitter" className="text-zinc-400 hover:text-[#1DA1F2] transition-colors hover:scale-110">
              <FiTwitter size={16} />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="https://github.com/NaufalAufaaAbyan" target="_blank" rel="noopener noreferrer" title="Axeon Github" aria-label="Axeon Github" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors hover:scale-110">
              <FiGithub size={16} />
              <span className="sr-only">GitHub</span>
            </a>
          </div>

          <div className="flex items-center bg-zinc-100/80 dark:bg-zinc-900/50 p-1 rounded-lg border border-zinc-200 dark:border-white/5 backdrop-blur-md">
            <button title="Switch to English" onClick={() => setLang('en')} className={`px-3 py-1 font-black text-[9px] uppercase tracking-widest transition-all rounded-md ${lang === 'en' ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-white'}`}>EN</button>
            <button title="Switch to Indonesian" onClick={() => setLang('id')} className={`px-3 py-1 font-black text-[9px] uppercase tracking-widest transition-all rounded-md ${lang === 'id' ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-white'}`}>ID</button>
          </div>

          <button title="Toggle Theme" aria-label="Toggle Theme" onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')} className="size-9 flex items-center justify-center rounded-lg border border-zinc-200 dark:border-white/5 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-zinc-500 dark:text-zinc-400 hover:rotate-12">
            {resolvedTheme === 'dark' ? <FiSun size={14} /> : <FiMoon size={14} />}
          </button>
          
          {isAuthenticated ? (
            <div className="flex items-center gap-3 pl-2">
              <div className="flex flex-col items-end">
                <span className="text-[9px] font-black uppercase text-zinc-900 dark:text-white tracking-widest">
                  {userName || (walletAddress ? `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}` : 'SYS_OP')}
                </span>
                <button title="Disconnect" onClick={logout} className="text-[8px] font-bold text-red-500 hover:text-red-400 uppercase tracking-widest transition-colors flex items-center gap-1">
                  <FiLogOut size={8} /> Exit
                </button>
              </div>
              <Link href={dashboardPath} title="User Dashboard" className="relative group">
                <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-30 group-hover:opacity-70 transition duration-300" />
                {userImage ? (
                  <Image src={userImage} width={36} height={36} className="relative rounded-lg border border-zinc-200 dark:border-zinc-800" alt="profile" />
                ) : (
                  <div className="relative size-9 bg-zinc-900 dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-black">
                    <FiUser size={14} />
                  </div>
                )}
              </Link>
            </div>
          ) : (
            <Link href="/login" title="Login" className="px-5 py-2 bg-black dark:bg-white text-white dark:text-black font-black text-[9px] uppercase tracking-widest rounded-full hover:scale-105 transition-all flex items-center gap-2">
              <FiZap /> {t.btnDashboard}
            </Link>
          )}
        </div>

        <button title="Menu" aria-label="Mobile Menu" className="lg:hidden p-2 text-zinc-600 dark:text-zinc-400" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-white dark:bg-[#0a0a0a] border-b border-zinc-200 dark:border-white/10 p-6 flex flex-col gap-6 shadow-2xl">
          {['Product', 'Solutions', 'Docs', 'Changelog'].map((item) => {
            const urlPath = (item === 'Product' || item === 'Solutions') ? `/#${item.toLowerCase()}` : `/${item.toLowerCase()}`;
            return (
              <Link key={item} href={urlPath} onClick={() => setIsMobileMenuOpen(false)} className="text-xs font-black text-zinc-900 dark:text-white uppercase tracking-widest">
                {item}
              </Link>
            );
          })}
          <hr className="border-zinc-200 dark:border-white/10" />
          <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="h-12 w-full bg-zinc-900 dark:bg-white text-white dark:text-black font-black text-[10px] uppercase tracking-widest rounded-xl flex items-center justify-center">
            {t.btnDashboard}
          </Link>
        </div>
      )}
    </nav>
  );
}