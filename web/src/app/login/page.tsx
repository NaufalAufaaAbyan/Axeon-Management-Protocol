"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useWallet } from '@solana/wallet-adapter-react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { useAxeonStore } from '../../store/useAxeonStore';
import { toast } from 'sonner';
import { FiArrowLeft, FiShield, FiCheckCircle, FiLock, FiTerminal } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaTelegramPlane } from 'react-icons/fa';

const WalletMultiButton = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then((mod) => mod.WalletMultiButton),
  { ssr: false }
);

export default function LoginPage() {
  const [isClient, setIsClient] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [loginRole, setLoginRole] = useState<'admin' | 'subscriber'>('admin');
  const [terminalText, setTerminalText] = useState('Awaiting connection...');

  const { connected, publicKey } = useWallet();
  const router = useRouter();
  const { login, isAuthenticated } = useAxeonStore();

  useEffect(() => {
    const timer = setTimeout(() => setIsClient(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
        const role = useAxeonStore.getState().role;
        router.push(role === 'admin' ? '/dashboard/admin' : '/dashboard/user');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (connected && publicKey && !isLoadingAuth && !isAuthenticated) {
      // FIX: Use setTimeout to prevent synchronous state updates inside useEffect
      setTimeout(() => {
        setIsLoadingAuth(true);
        setTerminalText('Authenticating Wallet...');
        toast.success('Wallet successfully connected!');
      }, 0);
      
      setTimeout(() => {
        login(loginRole, publicKey.toBase58(), loginRole === 'admin' ? 2 : 1); 
      }, 800);
    }
  }, [connected, publicKey, login, loginRole, isLoadingAuth, isAuthenticated]);

  const handleGoogleLogin = () => {
    setIsLoadingAuth(true);
    setTerminalText('Verifying Google OAuth 2.0...');
    const toastId = toast.loading('Authenticating via Google...');
    setTimeout(() => {
      login(loginRole, 'Google_User_' + Math.floor(Math.random() * 1000), loginRole === 'admin' ? 2 : 1);
      toast.success('Successfully logged in!', { id: toastId });
    }, 1500);
  };

  const handleTelegramLogin = () => {
    setIsLoadingAuth(true);
    setTerminalText('Syncing Telegram Identity Matrix...');
    const toastId = toast.loading('Syncing Telegram Identity...');
    setTimeout(() => {
      login(loginRole, 'TG_User_' + Math.floor(Math.random() * 9999), loginRole === 'admin' ? 2 : 1);
      toast.success('Telegram Linked!', { id: toastId });
    }, 1500);
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-4 md:p-8 selection:bg-zinc-300 dark:selection:bg-zinc-700 relative z-10">
      
      <Link href="/" title="Return to Home" className="absolute top-8 left-8 flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors z-20 group">
        <div className="size-8 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center bg-white/50 dark:bg-black/50 backdrop-blur-md group-hover:-translate-x-1 transition-transform">
          <FiArrowLeft size={14} />
        </div>
        RETURN TO PROTOCOL
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 40, scale: 0.95 }} 
        animate={{ opacity: 1, y: 0, scale: 1 }} 
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
        className="w-full max-w-6xl glass-panel rounded-[3rem] shadow-2xl relative z-10 flex flex-col lg:flex-row overflow-hidden min-h-162.5"
      >
        
        <div className="hidden lg:flex w-5/12 bg-white/40 dark:bg-[#0a0a0a]/40 border-r border-zinc-200 dark:border-zinc-800/80 p-12 flex-col justify-between relative overflow-hidden backdrop-blur-3xl">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-12">
              <div className="size-4 bg-zinc-900 dark:bg-white rounded-sm shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
              <span className="font-black tracking-widest text-xl text-zinc-900 dark:text-white uppercase italic">AXEON</span>
            </div>
            
            <h2 className="text-4xl font-black italic uppercase tracking-tighter text-zinc-900 dark:text-white leading-[0.9] mb-6">
              Infrastructure <br/> <span className="text-zinc-400 dark:text-zinc-600">Access.</span>
            </h2>
            <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest leading-relaxed max-w-xs">
              Authenticate to initialize zero-custody smart contracts and synchronize your Telegram communities.
            </p>
          </div>

          <div className="relative z-10 space-y-6">
            <div className="p-5 rounded-2xl bg-white/60 dark:bg-black/60 border border-zinc-200 dark:border-zinc-800/80 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                  <FiTerminal className="text-zinc-400" /> SYSTEM STATUS
                </span>
                <span className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-emerald-500">
                  <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" /> OPTIMAL
                </span>
              </div>
              <div className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500 flex flex-col gap-1">
                <span>{'>'} Route: wss://api.axeon.network</span>
                <span>{'>'} Encryption: AES-256-GCM</span>
                <AnimatePresence mode="wait">
                    <motion.span 
                        key={terminalText}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-zinc-900 dark:text-zinc-300 font-bold"
                    >
                        {'>'} {terminalText}
                    </motion.span>
                </AnimatePresence>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-zinc-500">
              <FiShield size={14} /> Shielded Settlement Active
            </div>
          </div>
        </div>

        <div className="w-full lg:w-7/12 p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative bg-white/80 dark:bg-[#111111]/80 backdrop-blur-xl">
          
          <div className="max-w-md w-full mx-auto">
            <div className="flex bg-zinc-100 dark:bg-[#1a1a1a] p-1.5 rounded-2xl mb-12 border border-zinc-200 dark:border-zinc-800/50 shadow-inner">
              <button 
                onClick={() => setLoginRole('admin')} 
                disabled={isLoadingAuth}
                className={`flex-1 py-3.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all duration-300 ${loginRole === 'admin' ? 'bg-white dark:bg-black text-zinc-900 dark:text-white shadow-md ring-1 ring-zinc-200 dark:ring-zinc-800' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}`}
              >
                Creator
              </button>
              <button 
                onClick={() => setLoginRole('subscriber')} 
                disabled={isLoadingAuth}
                className={`flex-1 py-3.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all duration-300 ${loginRole === 'subscriber' ? 'bg-white dark:bg-black text-zinc-900 dark:text-white shadow-md ring-1 ring-zinc-200 dark:ring-zinc-800' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}`}
              >
                Subscriber
              </button>
            </div>

            <div className="mb-10 text-center lg:text-left">
              <h3 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-zinc-900 dark:text-white mb-2">
                {loginRole === 'admin' ? 'Deploy & Earn.' : 'Connect & Access.'}
              </h3>
              <p className="text-xs font-bold text-zinc-500">
                {loginRole === 'admin' ? 'Select an identity provider to access your vault.' : 'Sync your identity to verify premium access.'}
              </p>
            </div>

            <div className="space-y-4">
              
              <div className="flex justify-center w-full">
                <WalletMultiButton 
                    className="w-full! bg-zinc-900! dark:bg-white! text-white! dark:text-black! font-black! text-[11px]! uppercase! tracking-widest! rounded-2xl! h-16! hover:bg-zinc-800! dark:hover:bg-zinc-200! transition-all! hover:scale-[1.02]! flex! items-center! justify-center! shadow-xl!" 
                    disabled={isLoadingAuth}
                />
              </div>

              <div className="relative flex items-center py-4">
                <div className="grow border-t border-zinc-200 dark:border-zinc-800"></div>
                <span className="shrink-0 px-4 text-[9px] font-black uppercase tracking-widest text-zinc-400">OR WEB2 GATEWAY</span>
                <div className="grow border-t border-zinc-200 dark:border-zinc-800"></div>
              </div>

              <button 
                onClick={handleTelegramLogin} 
                disabled={isLoadingAuth} 
                className="w-full flex items-center justify-center gap-3 bg-[#2AABEE] text-white font-black text-[11px] uppercase tracking-widest rounded-2xl h-16 hover:bg-[#229ED9] transition-all disabled:opacity-50 hover:scale-[1.02] shadow-lg shadow-[#2AABEE]/20"
              >
                <FaTelegramPlane size={20} />
                Continue with Telegram
              </button>

              <button 
                onClick={handleGoogleLogin} 
                disabled={isLoadingAuth} 
                className="w-full flex items-center justify-center gap-3 bg-white dark:bg-[#1a1a1a] border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white font-black text-[11px] uppercase tracking-widest rounded-2xl h-16 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all disabled:opacity-50 hover:scale-[1.02] shadow-sm"
              >
                <FcGoogle size={20} />
                Continue with Google
              </button>

            </div>

            <div className="mt-12 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-center gap-6">
              <span className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-zinc-400">
                <FiCheckCircle size={12} /> Audited
              </span>
              <span className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-zinc-400">
                <FiLock size={12} /> Zero-Custody
              </span>
            </div>

          </div>
        </div>

      </motion.div>
    </div>
  );
}