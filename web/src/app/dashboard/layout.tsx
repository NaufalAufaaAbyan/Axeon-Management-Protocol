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
  const { isAuthenticated, role, walletAddress, userName, logout, lang } = useAxeonStore();
  const { disconnect } = useWallet();
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  const t = dict[lang as keyof typeof dict];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsChecking(false);
      if (!isAuthenticated) {
        toast.error('Session expired. Please verify identity.');
        router.push('/login');
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [isAuthenticated, router]);

  const handleLogout = async () => {
    try {
      await disconnect();
    } catch {
      console.log("Wallet already disconnected");
    }
    logout();
    toast.success('Session Terminated.');
    router.push('/');
  };

  const trimAddress = (addr: string | null) => {
    if (!addr) return 'UNKNOWN_ENTITY';
    if (addr.startsWith('G_USER_') || addr.startsWith('TG_USER_')) {
      return userName || addr.substring(0, 10);
    }
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (isChecking) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center relative z-10">
        <div className="size-8 border-2 border-white/10 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    );
  }

  const navLinks = role === 'admin' 
    ? [
        { name: t.sideOverview || 'Overview', path: '/dashboard/admin', icon: <FiActivity className="size-4" /> },
        { name: t.sideSubscribers || 'Subscribers', path: '/dashboard/admin/subscribers', icon: <FiUsers className="size-4" /> },
        { name: t.sideSettings || 'Settings', path: '/dashboard/admin/settings', icon: <FiSettings className="size-4" /> },
      ]
    : [
        { name: t.sideMyPasses || 'My Vaults', path: '/dashboard/user', icon: <FiInbox className="size-4" /> },
        { name: t.sideExplore || 'Explore', path: '/dashboard/user/explore', icon: <FiCompass className="size-4" /> },
      ];

  return (
    <div className="min-h-screen w-full flex bg-[#020202] selection:bg-white selection:text-black relative z-10 font-sans">
      
      {/* FIX: Hapus 'absolute' biar ngga bentrok sama 'fixed' */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />

      {/* SIDEBAR (DESKTOP) */}
      <aside className="hidden lg:flex w-72 flex-col border-r border-white/5 bg-[#050505]/90 backdrop-blur-2xl sticky top-0 h-screen transition-colors z-20">
        <div className="h-24 flex items-center px-8 border-b border-white/5">
          <div className="size-3.5 bg-white rounded-sm mr-3 shadow-[0_0_15px_rgba(255,255,255,0.3)] animate-pulse" />
          <span className="font-black tracking-[0.3em] text-lg uppercase italic text-white">AXEON</span>
          <span className="ml-auto text-[7px] px-2 py-0.5 rounded border border-white/20 bg-white/5 text-zinc-400 font-black uppercase tracking-widest">
            {role === 'admin' ? 'CREATOR' : 'SUBSCRIBER'}
          </span>
        </div>

        <nav className="flex-1 py-10 px-6 space-y-2 overflow-y-auto">
          <span className="px-4 text-[8px] font-black text-zinc-600 uppercase tracking-[0.2em] block mb-6">
            Command Center
          </span>
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link 
                key={link.name} 
                href={link.path}
                className={`flex items-center gap-4 px-4 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    isActive 
                        ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.1)] scale-[1.02]' 
                        : 'text-zinc-500 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/5">
          <div className="p-4 rounded-2xl bg-black border border-white/10 flex flex-col gap-5 shadow-inner">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-zinc-800 flex items-center justify-center border border-white/10 overflow-hidden">
                 {/* FIX: bg-linear-to-tr */}
                 <div className="size-full bg-linear-to-tr from-blue-500 to-emerald-500 opacity-20" />
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] font-black text-white truncate tracking-widest">{trimAddress(walletAddress)}</p>
                <div className="flex items-center gap-1.5 mt-1">
                    <span className="flex size-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_5px_#10b981]" />
                    <p className="text-[7px] font-bold text-emerald-500 uppercase tracking-[0.2em]">Node Synced</p>
                </div>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="w-full py-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <FiLogOut className="size-3" />
              Abort Session
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      {/* FIX: bg-linear-to-br dan to-white/1 */}
      <main className="flex-1 w-full flex flex-col h-screen overflow-y-auto relative bg-linear-to-br from-transparent to-white/1">
        
        {/* MOBILE HEADER */}
        <div className="lg:hidden h-16 flex items-center justify-between px-6 border-b border-white/10 bg-[#050505]/90 backdrop-blur-xl absolute top-0 w-full z-30">
          <span className="font-black tracking-[0.2em] text-xs text-white italic uppercase">AXEON</span>
          <button onClick={handleLogout} className="text-[9px] font-black text-zinc-500 hover:text-red-500 uppercase tracking-widest flex items-center gap-2 transition-colors">
            <FiLogOut size={12} /> Exit
          </button>
        </div>

        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="px-6 md:px-12 py-24 lg:py-20 w-full max-w-7xl mx-auto pb-32"
        >
          {children}
        </motion.div>
      </main>

    </div>
  );
}