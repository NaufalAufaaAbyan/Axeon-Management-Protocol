"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAxeonStore } from '../../store/useAxeonStore';
import { useWallet } from '@solana/wallet-adapter-react';
import { dict } from '../../lib/dictionary';
import { toast } from 'sonner';
import { FiActivity, FiUsers, FiSettings, FiInbox, FiCompass, FiLogOut } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, role, walletAddress, logout, lang } = useAxeonStore();
  const { disconnect } = useWallet();
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  const t = dict[lang as keyof typeof dict];

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Session expired. Please login again.');
      router.push('/login');
    } else {
      const timer = setTimeout(() => setIsChecking(false), 0);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, router]);

  const handleLogout = async () => {
    try {
      await disconnect();
    } catch {
      // FIX: Hapus variabel 'error' yang tidak terpakai
      console.log("Wallet already disconnected or error");
    }
    logout();
    toast.success(lang === 'id' ? 'Berhasil keluar.' : 'Successfully logged out.');
    router.push('/');
  };

  const trimAddress = (addr: string | null) => {
    if (!addr) return t.sideUnknownUser;
    if (addr.startsWith('Email_') || addr.startsWith('Google_') || addr.startsWith('TG_')) {
      return addr.replace(/_/g, ' ');
    }
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (isChecking) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center relative z-10">
        <div className="size-8 border-2 border-zinc-200 dark:border-zinc-800 border-t-zinc-900 dark:border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  const navLinks = role === 'admin' 
    ? [
        { name: t.sideOverview, path: '/dashboard/admin', icon: <FiActivity className="size-4" /> },
        { name: t.sideSubscribers, path: '/dashboard/admin/subscribers', icon: <FiUsers className="size-4" /> },
        { name: t.sideSettings, path: '/dashboard/admin/settings', icon: <FiSettings className="size-4" /> },
      ]
    : [
        { name: t.sideMyPasses, path: '/dashboard/user', icon: <FiInbox className="size-4" /> },
        { name: t.sideExplore, path: '/dashboard/user/explore', icon: <FiCompass className="size-4" /> },
      ];

  return (
    <div className="min-h-screen w-full flex bg-transparent selection:bg-zinc-300 dark:selection:bg-zinc-700 relative z-10 pt-16 lg:pt-0">
      
      <aside className="hidden lg:flex w-72 flex-col border-r border-zinc-200 dark:border-zinc-800/80 bg-white/40 dark:bg-[#0a0a0a]/40 backdrop-blur-3xl sticky top-0 h-screen transition-colors z-20">
        <div className="h-24 flex items-center px-8 border-b border-zinc-200 dark:border-zinc-800/80">
          <div className="size-3 bg-zinc-900 dark:bg-white rounded-sm mr-3 shadow-[0_0_10px_rgba(255,255,255,0.1)]" />
          <span className="font-black tracking-widest text-xl uppercase italic text-zinc-900 dark:text-white">AXEON</span>
          <span className="ml-auto text-[8px] px-2 py-0.5 rounded bg-zinc-900 dark:bg-white text-white dark:text-black font-black uppercase tracking-wider">
            {role}
          </span>
        </div>

        <nav className="flex-1 py-10 px-6 space-y-2 overflow-y-auto">
          <span className="px-4 text-[9px] font-black text-zinc-400 uppercase tracking-widest block mb-6">{t.sidebarMenu}</span>
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link 
                key={link.name} 
                href={link.path}
                className={`flex items-center gap-4 px-4 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    isActive 
                        ? 'bg-zinc-900 dark:bg-white text-white dark:text-black shadow-lg ring-1 ring-zinc-900 dark:ring-white scale-[1.02]' 
                        : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-zinc-900/50'
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-zinc-200 dark:border-zinc-800/80">
          <div className="p-4 rounded-3xl bg-white/60 dark:bg-[#111111]/80 border border-zinc-200 dark:border-zinc-800 flex flex-col gap-5 shadow-sm backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center p-px">
                <div className="w-full h-full bg-white dark:bg-black rounded-full border-2 border-transparent"></div>
              </div>
              <div className="overflow-hidden">
                <p className="text-[11px] font-black text-zinc-900 dark:text-white truncate">{trimAddress(walletAddress)}</p>
                <div className="flex items-center gap-1.5 mt-1">
                    <span className="flex size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest">Network Active</p>
                </div>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="w-full py-3.5 bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-red-500 hover:text-white dark:hover:bg-red-500 dark:hover:text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
            >
              <FiLogOut className="size-3" />
              {t.sideSignOut}
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 w-full flex flex-col h-screen overflow-y-auto relative">
        <div className="lg:hidden h-16 flex items-center justify-between px-6 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl absolute top-0 w-full z-30">
          <span className="font-black tracking-widest text-xs text-zinc-900 dark:text-white italic uppercase">AXEON {role}</span>
          <button onClick={handleLogout} className="text-[9px] font-black text-zinc-500 hover:text-red-500 uppercase tracking-widest flex items-center gap-2 transition-colors">
            <FiLogOut size={12} /> {t.sideSignOut}
          </button>
        </div>

        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="px-6 md:px-12 py-12 lg:py-20 w-full max-w-7xl mx-auto pb-32"
        >
          {children}
        </motion.div>
      </main>

    </div>
  );
}