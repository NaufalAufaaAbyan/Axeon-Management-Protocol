"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function UserDashboard() {
  const [isClient, setIsClient] = useState(false);

  // Mock data: Anggap aja ini hasil fetch dari PDA UserSubscription di Solana
  const mockPasses = [
    {
      id: "AXEON_ALPHA_VIP",
      name: "Axeon Alpha Circle",
      fee: 25.00,
      expiryDate: "2026-05-15T00:00:00Z",
      status: "ACTIVE",
      txHash: "5Kq...9xP"
    },
    {
      id: "SOL_DEVS_ID",
      name: "Solana Devs Indonesia",
      fee: 10.00,
      expiryDate: "2026-05-02T00:00:00Z",
      status: "WARNING", // H-1 atau H-2 sebelum expired
      txHash: "2Jz...4aL"
    }
  ];

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsClient(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!isClient) return null;

  return (
    <div className="w-full animate-in fade-in duration-500 pb-20">
      
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Active Passes.</h1>
          <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Cryptographic Access Management</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-[#050505] border border-zinc-800 px-3 py-1.5 rounded-sm flex items-center gap-2">
            <div className="size-1.5 bg-[#00ffcc] rounded-full shadow-[0_0_8px_#00ffcc]" />
            <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Devnet Node</span>
          </div>
          <Link href="/dashboard/user/explore" className="px-5 py-2 bg-white text-black font-bold text-[10px] font-mono uppercase tracking-widest hover:bg-[#00ffcc] transition-colors rounded-sm shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            Explore Vaults &rarr;
          </Link>
        </div>
      </div>

      {/* ================= PASSES GRID ================= */}
      {mockPasses.length === 0 ? (
        <div className="bg-[#050505] border border-zinc-800 rounded-md p-16 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 pointer-events-none opacity-5">
            <div className="w-full h-px bg-zinc-500 absolute top-1/2" />
            <div className="h-full w-px bg-zinc-500 absolute left-1/2" />
          </div>
          
          <div className="size-12 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 relative z-10">
            <svg className="size-5 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
          </div>
          <span className="text-sm font-bold text-zinc-300 mb-2 relative z-10">NO ACTIVE PASSES</span>
          <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 max-w-sm mx-auto leading-relaxed relative z-10 mb-8">
            You currently do not hold any valid Subscription PDAs. Explore available Vaults to gain access.
          </p>
          <Link href="/dashboard/user/explore" className="px-6 py-3 border border-zinc-700 text-white font-mono text-[10px] uppercase tracking-widest hover:border-[#00ffcc] hover:text-[#00ffcc] transition-colors rounded-sm relative z-10">
            Find Premium Communities
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockPasses.map((pass, index) => (
            <div key={index} className="bg-[#050505] border border-zinc-800 rounded-md overflow-hidden relative group hover:border-zinc-600 transition-colors shadow-xl">
              
              {/* Card Header */}
              <div className="p-6 border-b border-zinc-800">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center font-mono font-bold text-zinc-400">
                      {pass.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-sm">{pass.name}</h3>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">ID: {pass.id}</span>
                    </div>
                  </div>
                  
                  {/* Status Indicator */}
                  <div className={`px-2 py-1 border rounded-sm flex items-center gap-2 ${pass.status === 'ACTIVE' ? 'bg-[#00ffcc]/10 border-[#00ffcc]/30 text-[#00ffcc]' : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500'}`}>
                    <div className={`size-1.5 rounded-full ${pass.status === 'ACTIVE' ? 'bg-[#00ffcc]' : 'bg-yellow-500 animate-pulse'}`} />
                    <span className="text-[8px] font-mono font-bold uppercase tracking-widest">{pass.status}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div>
                    <span className="block text-[9px] font-mono text-zinc-600 uppercase tracking-widest mb-1">Subscription Fee</span>
                    <span className="text-xs font-mono text-white">${pass.fee.toFixed(2)} USDC <span className="text-zinc-600 text-[10px]">/ 30 Days</span></span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-mono text-zinc-600 uppercase tracking-widest mb-1">Valid Until</span>
                    <span className={`text-xs font-mono ${pass.status === 'WARNING' ? 'text-yellow-500' : 'text-zinc-300'}`}>
                      {new Date(pass.expiryDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer / Actions */}
              <div className="p-4 bg-zinc-950 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">Ref:</span>
                  <a href={`https://explorer.solana.com/tx/${pass.txHash}?cluster=devnet`} target="_blank" rel="noreferrer" className="text-[9px] font-mono text-blue-400 hover:underline">
                    {pass.txHash}
                  </a>
                </div>
                
                <button className="px-4 py-2 bg-transparent border border-zinc-700 text-white font-mono text-[9px] uppercase tracking-widest rounded-sm hover:border-white transition-colors">
                  Renew Pass
                </button>
              </div>

              {/* Progress Bar Visual (Decorative) - Fix CSS Inline Style */}
              <div className="absolute bottom-0 left-0 h-0.5 bg-zinc-800 w-full">
                <div className={`h-full ${pass.status === 'ACTIVE' ? 'bg-[#00ffcc] w-[65%]' : 'bg-yellow-500 w-[95%]'}`} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}