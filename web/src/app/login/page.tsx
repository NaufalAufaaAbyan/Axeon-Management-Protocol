"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useWallet } from '@solana/wallet-adapter-react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { useAxeonStore } from '../../store/useAxeonStore';
import { toast } from 'sonner';
import { FiArrowLeft, FiShield, FiCheckCircle, FiLock, FiTerminal, FiCpu } from 'react-icons/fi';
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
    if (isClient && isAuthenticated) {
        const role = useAxeonStore.getState().role;
        router.push(role === 'admin' ? '/dashboard/admin' : '/dashboard/user');
    }
  }, [isClient, isAuthenticated, router]);

  useEffect(() => {
    if (connected && publicKey && !isLoadingAuth && !isAuthenticated) {
      const authTimer = setTimeout(() => {
        setIsLoadingAuth(true);
        setTerminalText('Authenticating Wallet...');
        toast.success('Wallet Handshake Successful');
        
        setTimeout(() => {
          login(loginRole, publicKey.toBase58(), loginRole === 'admin' ? 2 : 1); 
        }, 1200);
      }, 0);
      return () => clearTimeout(authTimer);
    }
  }, [connected, publicKey, loginRole, isLoadingAuth, isAuthenticated, login]);

  const handleGoogleLogin = () => {
    setIsLoadingAuth(true);
    setTerminalText('Bypassing Web2 Protocols...');
    const toastId = toast.loading('Authenticating via Google...');
    setTimeout(() => {
      login(loginRole, 'G_User_' + Math.floor(Math.random() * 1000), loginRole === 'admin' ? 2 : 1, {
        name: "Axeon Operator",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Axeon"
      });
      toast.success('Access Granted!', { id: toastId });
    }, 1500);
  };

  const handleTelegramLogin = () => {
    setIsLoadingAuth(true);
    setTerminalText('Syncing Matrix Identity...');
    const toastId = toast.loading('Syncing Telegram...');
    setTimeout(() => {
      login(loginRole, 'TG_User_' + Math.floor(Math.random() * 9999), loginRole === 'admin' ? 2 : 1, {
        name: "Telegram Member"
      });
      toast.success('Telegram Linked!', { id: toastId });
    }, 1500);
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 md:p-8 selection:bg-white selection:text-black relative z-10 font-sans">
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.03),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />

      <Link href="/" title="Return to Home" className="absolute top-8 left-8 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors z-20 group">
        <div className="size-8 rounded-full border border-zinc-800 flex items-center justify-center bg-zinc-900/50 backdrop-blur-md group-hover:-translate-x-1 transition-transform">
          <FiArrowLeft size={14} />
        </div>
        PROTOCOL HOME
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.98 }} 
        animate={{ opacity: 1, y: 0, scale: 1 }} 
        transition={{ duration: 0.5, ease: "easeOut" }}
        // FIX: rounded-4xl
        className="w-full max-w-6xl bg-[#0a0a0a]/90 backdrop-blur-3xl border border-white/10 rounded-4xl shadow-2xl relative z-10 flex flex-col lg:flex-row overflow-hidden min-h-160"
      >
        
        <div className="hidden lg:flex w-5/12 bg-black/40 border-r border-white/5 p-12 flex-col justify-between relative overflow-hidden">
          <div className="absolute -top-32 -left-32 size-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-16">
              <div className="size-3.5 bg-white shadow-[0_0_15px_rgba(255,255,255,0.4)] animate-pulse rounded-sm" />
              <span className="font-black tracking-[0.3em] text-lg text-white uppercase italic">AXEON</span>
            </div>
            
            <h2 className="text-4xl xl:text-5xl font-black italic uppercase tracking-tighter text-white leading-[0.85] mb-6">
              Infrastructure <br/> <span className="text-zinc-600">Access.</span>
            </h2>
            {/* FIX: max-w-70 */}
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-relaxed max-w-70 border-l-2 border-zinc-800 pl-4">
              Initialize zero-custody smart contracts and synchronize your decentralized communities.
            </p>
          </div>

          <div className="relative z-10 space-y-6">
            <div className="p-6 rounded-2xl bg-[#050505] border border-white/5 shadow-inner">
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/5">
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                  <FiTerminal className="text-zinc-400" /> SYSTEM STATUS
                </span>
                <span className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-emerald-500">
                  <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" /> SECURE
                </span>
              </div>
              <div className="font-mono text-[10px] text-zinc-500 flex flex-col gap-1.5">
                <span className="flex gap-2"><span className="text-zinc-700">{'>'}</span> Route: wss://axeon.network/node</span>
                <span className="flex gap-2"><span className="text-zinc-700">{'>'}</span> Protocol: AES-256-GCM</span>
                <AnimatePresence mode="wait">
                    <motion.span 
                        key={terminalText}
                        initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                        className="text-white font-bold flex gap-2"
                    >
                        <span className="text-zinc-700">{'>'}</span> {terminalText}
                    </motion.span>
                </AnimatePresence>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600">
              <FiShield size={12} /> Shielded Settlement Active
            </div>
          </div>
        </div>

        {/* FIX: bg-linear-to-br dan to-white/1 */}
        <div className="w-full lg:w-7/12 p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative bg-linear-to-br from-transparent to-white/1">
          
          <div className="max-w-md w-full mx-auto relative z-10">
            
            <div className="flex bg-[#050505] p-1.5 rounded-xl mb-12 border border-white/10 shadow-inner relative">
              <motion.div 
                className="absolute inset-y-1.5 w-[calc(50%-6px)] bg-zinc-800 rounded-lg shadow-md border border-white/10"
                animate={{ left: loginRole === 'admin' ? '6px' : 'calc(50% + 0px)' }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
              <button 
                title="Select Creator Role"
                onClick={() => setLoginRole('admin')} 
                disabled={isLoadingAuth}
                className={`relative z-10 flex-1 py-3.5 text-[9px] font-black uppercase tracking-[0.2em] rounded-lg transition-colors ${loginRole === 'admin' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                Creator
              </button>
              <button 
                title="Select Subscriber Role"
                onClick={() => setLoginRole('subscriber')} 
                disabled={isLoadingAuth}
                className={`relative z-10 flex-1 py-3.5 text-[9px] font-black uppercase tracking-[0.2em] rounded-lg transition-colors ${loginRole === 'subscriber' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                Subscriber
              </button>
            </div>

            <div className="mb-10 text-center lg:text-left">
              <h3 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-white mb-3">
                {loginRole === 'admin' ? 'Deploy & Earn.' : 'Connect & Access.'}
              </h3>
              <p className="text-[11px] font-bold text-zinc-500 tracking-wider">
                {loginRole === 'admin' ? 'Select an identity provider to access your vault.' : 'Sync your identity to verify premium access.'}
              </p>
            </div>

            <div className="space-y-4">
              
              <div className="relative group">
                <div className="absolute -inset-1 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition duration-500" />
                <WalletMultiButton 
                    className="w-full! bg-white! text-black! font-black! text-[11px]! uppercase! tracking-[0.2em]! rounded-2xl! h-16! transition-all! active:scale-95! flex! items-center! justify-center! shadow-xl! relative! z-10!" 
                    disabled={isLoadingAuth}
                />
              </div>

              <div className="relative flex items-center py-4">
                <div className="grow border-t border-white/5"></div>
                <span className="shrink-0 px-4 text-[8px] font-black uppercase tracking-[0.3em] text-zinc-600">OR WEB2 GATEWAY</span>
                <div className="grow border-t border-white/5"></div>
              </div>

              <button 
                title="Continue with Telegram"
                onClick={handleTelegramLogin} 
                disabled={isLoadingAuth} 
                className="w-full flex items-center justify-center gap-3 bg-[#2AABEE] text-white font-black text-[10px] uppercase tracking-[0.15em] rounded-2xl h-16 hover:bg-[#229ED9] transition-all disabled:opacity-50 active:scale-95 shadow-[0_0_20px_rgba(42,171,238,0.15)]"
              >
                <FaTelegramPlane size={18} />
                Continue with Telegram
              </button>

              <button 
                title="Continue with Google"
                onClick={handleGoogleLogin} 
                disabled={isLoadingAuth} 
                className="w-full flex items-center justify-center gap-3 bg-[#050505] border border-white/10 text-white font-black text-[10px] uppercase tracking-[0.15em] rounded-2xl h-16 hover:bg-zinc-900 transition-all disabled:opacity-50 active:scale-95 shadow-sm"
              >
                <FcGoogle size={18} />
                Continue with Google
              </button>

            </div>

            <div className="mt-12 pt-6 border-t border-white/5 flex flex-wrap items-center justify-center gap-6">
              <span className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-zinc-500">
                <FiCheckCircle size={12} className="text-zinc-600" /> ZK-Audited
              </span>
              <span className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-zinc-500">
                <FiLock size={12} className="text-zinc-600" /> Zero-Custody
              </span>
              <span className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-zinc-500">
                <FiCpu size={12} className="text-zinc-600" /> Solana Native
              </span>
            </div>

          </div>
        </div>

      </motion.div>
    </div>
  );
}