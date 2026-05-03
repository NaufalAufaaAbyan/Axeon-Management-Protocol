"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useWallet } from '@solana/wallet-adapter-react';
import dynamic from 'next/dynamic';
import { useAxeonStore } from '../../store/useAxeonStore';
import { toast } from 'sonner';

const WalletMultiButton = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then((mod) => mod.WalletMultiButton),
  { ssr: false }
);

export default function LoginPage() {
  const [isClient, setIsClient] = useState(false);
  const [email, setEmail] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [loginRole, setLoginRole] = useState<'admin' | 'subscriber'>('admin');

  const { connected, publicKey } = useWallet();
  const router = useRouter();
  const login = useAxeonStore((state) => state.login);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsClient(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (connected && publicKey) {
      toast.success('Wallet successfully connected!');
      login(loginRole, publicKey.toString(), 0); 
      router.push(loginRole === 'admin' ? '/dashboard/admin' : '/dashboard/user');
    }
  }, [connected, publicKey, login, router, loginRole]);

  const handleGoogleLogin = () => {
    setIsLoadingAuth(true);
    const toastId = toast.loading('Authenticating...');
    setTimeout(() => {
      login(loginRole, 'Google_User_' + Math.floor(Math.random() * 1000), 0);
      toast.success('Successfully logged in!', { id: toastId });
      router.push(loginRole === 'admin' ? '/dashboard/admin' : '/dashboard/user');
    }, 2000);
  };

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return toast.error('Please enter a valid email address.');
    setIsLoadingAuth(true);
    const toastId = toast.loading(`Sending verification code to ${email}...`);
    setTimeout(() => {
      setIsLoadingAuth(false);
      setIsOtpSent(true);
      toast.success('Code sent! Check your inbox.', { id: toastId });
    }, 1500);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerifyOtp = () => {
    const enteredCode = otp.join('');
    if (enteredCode.length < 6) return toast.error('Please enter the full 6-digit code.');
    setIsLoadingAuth(true);
    const toastId = toast.loading('Verifying code...');
    setTimeout(() => {
      login(loginRole, 'Email_Wallet_' + email.split('@')[0], 0);
      toast.success('Account activated successfully!', { id: toastId });
      router.push(loginRole === 'admin' ? '/dashboard/admin' : '/dashboard/user');
    }, 2000);
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-[#050505] p-6 selection:bg-blue-500/30 dark:selection:bg-[#00ffcc]/30">
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        RETURN TO HOME
      </Link>

      <div className="w-full max-w-md bg-white dark:bg-[#080808] border border-zinc-200 dark:border-zinc-800 p-8 sm:p-10 rounded-2xl shadow-xl relative overflow-hidden transition-all duration-500">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-600 to-emerald-400 dark:from-[#00ffcc] dark:to-blue-500" />
        
        <div className="flex bg-zinc-100 dark:bg-zinc-900/50 p-1 rounded-xl mb-8 border border-zinc-200 dark:border-zinc-800">
          <button onClick={() => setLoginRole('admin')} className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-colors ${loginRole === 'admin' ? 'bg-white dark:bg-zinc-800 text-blue-600 dark:text-[#00ffcc] shadow-sm' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}`}>
            Creator
          </button>
          <button onClick={() => setLoginRole('subscriber')} className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-colors ${loginRole === 'subscriber' ? 'bg-white dark:bg-zinc-800 text-blue-600 dark:text-[#00ffcc] shadow-sm' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}`}>
            Subscriber
          </button>
        </div>

        <div className="flex flex-col items-center justify-center mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2">
            {isOtpSent ? 'Check your email' : `Welcome, ${loginRole === 'admin' ? 'Creator' : 'Subscriber'}`}
          </h2>
          <p className="text-sm text-zinc-500">
            {isOtpSent ? `We sent a code to ${email}` : 'Connect your wallet or use email.'}
          </p>
        </div>

        {isOtpSent ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between gap-2">
              {otp.map((digit, index) => (
                <input key={index} id={`otp-${index}`} type="text" maxLength={1} value={digit} onChange={(e) => handleOtpChange(index, e.target.value)} aria-label={`Digit ${index + 1}`} title={`Digit ${index + 1}`} className="w-12 h-14 text-center text-xl font-bold bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:border-blue-500 dark:focus:border-[#00ffcc] text-zinc-900 dark:text-white transition-colors" />
              ))}
            </div>
            <button onClick={handleVerifyOtp} disabled={isLoadingAuth || otp.join('').length < 6} className="w-full bg-zinc-900 dark:bg-white text-white dark:text-black font-bold text-sm uppercase tracking-widest rounded-xl h-12 hover:bg-blue-600 dark:hover:bg-[#00ffcc] transition-colors disabled:opacity-50 flex items-center justify-center">
              {isLoadingAuth ? 'Verifying...' : 'Activate Account'}
            </button>
            <button onClick={() => setIsOtpSent(false)} className="w-full text-xs font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors text-center">&larr; Use a different email</button>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
            <form onSubmit={handleSendCode} className="space-y-3">
              <span className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest text-center">Web2 Gateway</span>
              <input type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required aria-label="Email address" className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white placeholder:text-zinc-400 text-sm rounded-xl h-12 px-4 focus:outline-none focus:border-blue-500 dark:focus:border-[#00ffcc] transition-colors" />
              <button type="submit" disabled={isLoadingAuth || !email} className="w-full bg-zinc-900 dark:bg-white text-white dark:text-black font-bold text-xs font-mono uppercase tracking-widest rounded-xl h-12 hover:bg-blue-600 dark:hover:bg-[#00ffcc] transition-colors disabled:opacity-50">
                {isLoadingAuth ? 'Sending Code...' : 'Continue with Email'}
              </button>
            </form>

            <button onClick={handleGoogleLogin} disabled={isLoadingAuth} className="w-full flex items-center justify-center gap-3 bg-white dark:bg-[#080808] border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold text-sm rounded-xl h-12 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors disabled:opacity-50">
              <svg className="size-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
              Continue with Google
            </button>

            <div className="relative flex items-center py-2">
              <div className="grow border-t border-zinc-200 dark:border-zinc-800"></div>
              <span className="shrink-0 px-4 text-xs font-mono text-zinc-400">OR WEB3 WALLET</span>
              <div className="grow border-t border-zinc-200 dark:border-zinc-800"></div>
            </div>

            <div className="flex justify-center w-full axeon-wallet-wrapper">
              <WalletMultiButton className="w-full! bg-zinc-900! dark:bg-white! text-white! dark:text-black! font-bold! text-sm! font-mono! uppercase! tracking-widest! rounded-xl! h-12! hover:bg-blue-600! dark:hover:bg-[#00ffcc]! transition-colors! flex! items-center! justify-center!" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}