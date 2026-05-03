"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAxeonStore } from '../../store/useAxeonStore';
import { dict } from '../../lib/dictionary';
import { toast } from 'sonner';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, role, walletAddress, logout, lang } = useAxeonStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  const t = dict[lang as keyof typeof dict];

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Session expired. Please login again.');
      router.push('/login');
    } else {
      const frame = requestAnimationFrame(() => setIsChecking(false));
      return () => cancelAnimationFrame(frame);
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    logout();
    toast.success(lang === 'id' ? 'Berhasil keluar.' : 'Successfully logged out.');
    router.push('/');
  };

  const trimAddress = (addr: string | null) => {
    if (!addr) return t.sideUnknownUser;
    if (addr.startsWith('Email_') || addr.startsWith('Google_')) return addr.replace(/_/g, ' ');
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#050505]">
        <div className="size-8 border-2 border-zinc-200 dark:border-zinc-800 border-t-blue-600 dark:border-t-[#00ffcc] rounded-full animate-spin" />
      </div>
    );
  }

  const navLinks = role === 'admin' 
    ? [
        { name: t.sideOverview, path: '/dashboard/admin', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
        { name: t.sideSubscribers, path: '/dashboard/admin/subscribers', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
        { name: t.sideSettings, path: '/dashboard/admin/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
      ]
    : [
        { name: t.sideMyPasses, path: '/dashboard/user', icon: 'M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z' },
        { name: t.sideExplore, path: '/dashboard/user/explore', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
      ];

  return (
    <div className="min-h-screen w-full flex bg-zinc-50 dark:bg-[#020202] selection:bg-blue-500/30 dark:selection:bg-[#00ffcc]/30 pt-16">
      
      <aside className="hidden lg:flex w-64 flex-col border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#050505] sticky top-16 h-[calc(100vh-4rem)] transition-colors z-20">
        <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto">
          <span className="px-4 text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block mb-4">{t.sidebarMenu}</span>
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link 
                key={link.name} 
                href={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${isActive ? 'bg-zinc-100 dark:bg-zinc-900 text-blue-600 dark:text-[#00ffcc]' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900/50'}`}
              >
                <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} /></svg>
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/50 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-full bg-linear-to-tr from-blue-600 to-emerald-400 p-px">
                <div className="w-full h-full bg-white dark:bg-black rounded-full border-2 border-transparent"></div>
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-zinc-900 dark:text-white truncate">{trimAddress(walletAddress)}</p>
                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{role}</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="w-full py-2 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 border border-red-100 dark:border-red-900/30"
            >
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              {t.sideSignOut}
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 w-full max-w-7xl mx-auto flex flex-col h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="lg:hidden h-16 flex items-center justify-between px-6 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#050505] sticky top-0 z-20">
          <span className="font-bold tracking-widest text-xs text-zinc-900 dark:text-white">DASHBOARD</span>
          <button onClick={handleLogout} className="text-[10px] font-mono font-bold text-red-500 uppercase tracking-widest px-3 py-1 bg-red-500/10 rounded">{t.sideSignOut}</button>
        </div>

        <div className="px-6 md:px-10 py-10 w-full pb-24">
          {children}
        </div>
      </main>

    </div>
  );
}