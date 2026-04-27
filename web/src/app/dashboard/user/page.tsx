"use client";
import React from 'react';

export default function UserDashboard() {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="mb-10">
        <h1 className="text-3xl font-black tracking-tight text-white mb-2">My Subscriptions.</h1>
        <p className="text-xs text-zinc-400 uppercase tracking-widest font-medium">Manage your community access passes and renewals.</p>
      </div>

      <div className="bg-transparent border-2 border-dashed border-white/5 rounded-4xl p-12 flex flex-col items-center justify-center text-center relative overflow-hidden">
        <div className="size-16 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center mb-6">
           <svg className="size-6 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
        </div>
        <span className="text-sm font-bold text-zinc-300 mb-2">No Active Subscriptions</span>
        {/* FIX: Escaped apostrophe here */}
        <p className="text-[10px] uppercase tracking-widest text-zinc-500 max-w-sm mb-8 leading-relaxed">
          You don&apos;t have any active community passes right now. Connect your wallet to sync on-chain data.
        </p>
        <button disabled className="px-8 py-3 bg-white/5 border border-white/5 text-zinc-500 font-black text-[10px] uppercase tracking-widest rounded-full cursor-not-allowed">
          Awaiting Backend Connection...
        </button>
      </div>

      <div className="mt-12">
        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-600 mb-6">Payment Ledger (On-Chain)</h3>
        <div className="bg-zinc-900/30 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden p-10 flex items-center justify-center">
           <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">No Transaction History</span>
        </div>
      </div>
    </div>
  );
}