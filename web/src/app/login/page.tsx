"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

const DotField = dynamic(() => import('../components/magic/DotField'), { ssr: false });

export default function LoginPage() {
  const [isClient, setIsClient] = useState(false);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // FIX: Gunakan requestAnimationFrame untuk mencegah cascading renders warning
    const frame = requestAnimationFrame(() => setIsClient(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push(`/dashboard/${role}`);
    }, 1500);
  };

  if (!isClient) return <main className="min-h-screen bg-[#020617]" />;

  return (
    <main className="relative min-h-screen w-full bg-[#020617] text-zinc-100 font-sans flex items-center justify-center p-6 selection:bg-cyan-500/30 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
         <DotField dotRadius={1.5} dotSpacing={24} glowColor="#0891b2" gradientFrom="#22d3ee" gradientTo="#020617" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* FIX: rounded-[2rem] -> rounded-4xl */}
      <div className="relative z-10 w-full max-w-md bg-zinc-900/40 backdrop-blur-2xl border border-white/10 rounded-4xl p-8 md:p-10 shadow-2xl animate-in fade-in zoom-in-95 duration-500">
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="size-3 bg-cyan-400 rounded-sm shadow-[0_0_15px_#22d3ee] group-hover:scale-110 transition-transform" />
            <span className="font-black italic text-2xl tracking-tighter uppercase text-white">Axeon</span>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-white tracking-tight mb-2">Welcome Back.</h1>
          <p className="text-xs text-zinc-400 uppercase tracking-widest font-medium">Log in to your dashboard</p>
        </div>

        <div className="flex items-center bg-black/50 border border-white/5 rounded-xl p-1 mb-8 relative">
          <div className={`absolute inset-y-1 w-[calc(50%-4px)] bg-zinc-800 rounded-lg transition-all duration-300 ease-out shadow-sm ${role === 'admin' ? 'left-[calc(50%+2px)]' : 'left-1'}`} />
          <button type="button" onClick={() => setRole('user')} className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest relative z-10 transition-colors ${role === 'user' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>Member Login</button>
          <button type="button" onClick={() => setRole('admin')} className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest relative z-10 transition-colors ${role === 'admin' ? 'text-cyan-400' : 'text-zinc-500 hover:text-zinc-300'}`}>Admin Login</button>
        </div>

        <button onClick={handleLogin} className="w-full py-3.5 bg-zinc-100 text-black font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all flex items-center justify-center gap-3 mb-6">
          <svg className="size-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 7H5C3.89543 7 3 7.89543 3 9V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V9C21 7.89543 20.1046 7 19 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 14C16.5523 14 17 13.5523 17 13C17 12.4477 16.5523 12 16 12C15.4477 12 15 12.4477 15 13C15 13.5523 15.4477 14 16 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M19 7V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          {isLoading ? "Connecting..." : "Connect Solana Wallet"}
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Or continue with email</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input aria-label="Email Address" type="email" required placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/50 transition-colors" />
          <button type="submit" disabled={isLoading} className="w-full py-3.5 bg-zinc-900 border border-white/10 text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-zinc-800 hover:border-white/20 transition-all flex items-center justify-center gap-2">
            {isLoading ? <span className="size-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : "Send Magic Link"}
          </button>
        </form>
      </div>
    </main>
  );
}