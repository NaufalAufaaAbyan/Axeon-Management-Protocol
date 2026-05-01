"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAxeonStore } from '../../store/useAxeonStore';
import { toast } from 'sonner';

export default function LoginPage() {
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const login = useAxeonStore((state) => state.login);
  const router = useRouter();

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsClient(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleSimulateLogin = (roleType: 'admin' | 'subscriber') => {
    setIsLoading(true);
    
    const toastId = toast.loading('Connecting to Solana Devnet...');

    setTimeout(() => {
      login(roleType, '7xkx...3a9B', roleType === 'admin' ? 1 : 0);
      
      toast.success('Wallet connected successfully!', { id: toastId });
      
      if (roleType === 'admin') {
        router.push('/dashboard/admin');
      } else {
        router.push('/dashboard/user');
      }
    }, 1500);
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#050505] p-6">
      
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        RETURN TO HOME
      </Link>

      <div className="w-full max-w-md bg-white dark:bg-[#080808] border border-zinc-200 dark:border-zinc-800 p-10 rounded-2xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-600 to-blue-400 dark:from-[#00ffcc] dark:to-emerald-400" />
        
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="size-3 bg-blue-600 dark:bg-[#00ffcc] shadow-[0_0_15px_rgba(37,99,235,0.5)] dark:shadow-[0_0_15px_#00ffcc]" />
          <h2 className="text-2xl font-bold tracking-widest text-zinc-900 dark:text-white">AXEON</h2>
        </div>

        <p className="text-center text-sm text-zinc-500 mb-10">Select your environment to continue testing the protocol.</p>

        <div className="space-y-4">
          <button 
            onClick={() => handleSimulateLogin('admin')}
            disabled={isLoading}
            className="w-full relative group bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl flex items-center justify-between hover:border-blue-500 dark:hover:border-[#00ffcc] transition-all overflow-hidden disabled:opacity-50"
          >
            {/* FIX: Mengubah translate-x-[-100%] menjadi -translate-x-full */}
            <div className="absolute inset-0 bg-blue-500/5 dark:bg-[#00ffcc]/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            <div className="relative z-10 text-left">
              <h3 className="font-bold text-zinc-900 dark:text-white mb-1">Creator Dashboard</h3>
              <p className="text-xs text-zinc-500">Deploy vaults, manage tiers, and view analytics.</p>
            </div>
            <svg className="size-5 text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-[#00ffcc] relative z-10 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </button>

          <button 
            onClick={() => handleSimulateLogin('subscriber')}
            disabled={isLoading}
            className="w-full relative group bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl flex items-center justify-between hover:border-emerald-500 dark:hover:border-emerald-400 transition-all overflow-hidden disabled:opacity-50"
          >
            {/* FIX: Mengubah translate-x-[-100%] menjadi -translate-x-full */}
            <div className="absolute inset-0 bg-emerald-500/5 dark:bg-emerald-400/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            <div className="relative z-10 text-left">
              <h3 className="font-bold text-zinc-900 dark:text-white mb-1">Subscriber Portal</h3>
              <p className="text-xs text-zinc-500">Manage your active subscriptions and access passes.</p>
            </div>
            <svg className="size-5 text-zinc-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 relative z-10 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}