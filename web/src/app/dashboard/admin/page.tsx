"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('members');

  return (
    <div className="w-full animate-in fade-in duration-500 pb-20">
      
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Protocol Overview.</h1>
          <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Global state & revenue metrics</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-[#050505] border border-zinc-800 px-3 py-1.5 rounded-sm flex items-center gap-2">
            <div className="size-1.5 bg-zinc-600 rounded-full animate-pulse" />
            <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Bot Standby</span>
          </div>
          <Link href="/dashboard/admin/new-group" className="px-5 py-2 bg-white text-black font-bold text-[10px] font-mono uppercase tracking-widest hover:bg-[#00ffcc] transition-colors rounded-sm shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(0,255,204,0.3)]">
            + Deploy Vault
          </Link>
        </div>
      </div>

      {/* ================= STATS GRID ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-[#050505] border border-zinc-800 rounded-md p-6 relative overflow-hidden group hover:border-zinc-600 transition-colors">
          <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest block mb-4">Total Revenue</span>
          <span className="text-3xl font-mono text-white block mb-1">$0.00</span>
          <span className="text-[9px] font-mono text-[#00ffcc] uppercase tracking-widest">0.00 USDC Routed</span>
        </div>
        
        <div className="bg-[#050505] border border-zinc-800 rounded-md p-6 relative overflow-hidden group hover:border-zinc-600 transition-colors">
          <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest block mb-4">Active Subscriptions</span>
          <span className="text-3xl font-mono text-white block mb-1">0</span>
          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Across 0 Vaults</span>
        </div>
        
        <div className="bg-[#050505] border border-zinc-800 rounded-md p-6 relative overflow-hidden group hover:border-zinc-600 transition-colors">
          <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest block mb-4">Expiring (H-3)</span>
          <span className="text-3xl font-mono text-white block mb-1">0</span>
          <span className="text-[9px] font-mono text-yellow-500 uppercase tracking-widest">Pending Notifications</span>
        </div>
        
        <div className="bg-[#050505] border border-zinc-800 rounded-md p-6 relative overflow-hidden group hover:border-zinc-600 transition-colors">
          <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest block mb-4">Sweep Execution</span>
          <span className="text-3xl font-mono text-white block mb-1">--</span>
          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Protocol Standby</span>
        </div>
      </div>

      {/* ================= DATA PANEL ================= */}
      {/* FIX: min-h-[400px] diubah jadi min-h-100 */}
      <div className="bg-[#050505] border border-zinc-800 rounded-md overflow-hidden shadow-2xl min-h-100 flex flex-col">
        
        {/* Tab Headers */}
        <div className="flex items-center border-b border-zinc-800 bg-black/50">
          <button 
            onClick={() => setActiveTab('members')} 
            className={`px-6 py-4 text-[10px] font-mono font-bold uppercase tracking-widest transition-colors relative ${activeTab === 'members' ? 'text-[#00ffcc] bg-zinc-900/50' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            PDA State: Members
            {/* FIX: h-[2px] diubah jadi h-0.5 */}
            {activeTab === 'members' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00ffcc]" />}
          </button>
          <button 
            onClick={() => setActiveTab('groups')} 
            className={`px-6 py-4 text-[10px] font-mono font-bold uppercase tracking-widest transition-colors relative ${activeTab === 'groups' ? 'text-[#00ffcc] bg-zinc-900/50' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            PDA State: Vaults
            {/* FIX: h-[2px] diubah jadi h-0.5 */}
            {activeTab === 'groups' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00ffcc]" />}
          </button>
        </div>

        {/* Empty State / Table Area */}
        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center relative overflow-hidden">
          
          {/* Decorative Grid Lines */}
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <div className="w-full h-px bg-zinc-500 absolute top-1/4" />
            <div className="w-full h-px bg-zinc-500 absolute top-2/4" />
            <div className="w-full h-px bg-zinc-500 absolute top-3/4" />
          </div>

          <div className="size-12 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 relative z-10">
            <svg className="size-5 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
          </div>
          
          <span className="text-sm font-bold text-zinc-300 mb-2 relative z-10">
            {activeTab === 'members' ? "NO MEMBER DATA SYNCED" : "NO ACTIVE VAULTS DETECTED"}
          </span>
          
          <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 max-w-md mx-auto leading-relaxed relative z-10">
            {activeTab === 'members' 
              ? "Awaiting RPC connection to fetch UserSubscription PDA states from Solana Devnet." 
              : "Deploy a new GroupVault PDA to initialize the protocol and start accepting members."}
          </p>

          {activeTab === 'groups' && (
             <Link href="/dashboard/admin/new-group" className="mt-8 px-6 py-2 border border-zinc-700 text-zinc-300 font-mono text-[10px] uppercase tracking-widest hover:border-[#00ffcc] hover:text-[#00ffcc] transition-colors rounded-sm relative z-10">
               Initialize First Vault &rarr;
             </Link>
          )}
        </div>
      </div>

    </div>
  );
}