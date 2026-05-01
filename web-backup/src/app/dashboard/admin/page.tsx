"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('members');

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white mb-2">Admin Control Panel.</h1>
          <p className="text-xs text-zinc-400 uppercase tracking-widest font-medium">Manage communities, members, and revenue.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-zinc-900/50 border border-white/5 px-4 py-2 rounded-full flex items-center gap-2 shadow-inner">
            <div className="size-1.5 bg-zinc-500 rounded-full" />
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Bot Offline</span>
          </div>
          <Link href="/dashboard/admin/new-group" className="px-5 py-2.5 bg-cyan-500 text-black font-black text-[10px] uppercase tracking-widest rounded-full hover:bg-cyan-400 transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            + New Group
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 relative overflow-hidden group">
          <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest block mb-4">Total Revenue</span>
          <span className="text-3xl font-mono text-zinc-500 block mb-1">$0.00</span>
          <span className="text-xs text-zinc-600 font-medium tracking-wide">Awaiting Backend</span>
        </div>
        <div className="bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 relative overflow-hidden group">
          <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest block mb-4">Active Members</span>
          <span className="text-3xl font-mono text-zinc-500 block mb-1">0</span>
          <span className="text-xs text-zinc-600 font-medium tracking-wide">Across 0 Groups</span>
        </div>
        <div className="bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 relative overflow-hidden group">
          <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest block mb-4">Expiring Soon (H-3)</span>
          <span className="text-3xl font-mono text-zinc-500 block mb-1">0</span>
          <span className="text-xs text-zinc-600 font-medium tracking-wide">No active tracking</span>
        </div>
        <div className="bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 relative overflow-hidden group">
          <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest block mb-4">Sweep Rate</span>
          <span className="text-3xl font-mono text-zinc-500 block mb-1">--</span>
          <span className="text-xs text-zinc-600 font-medium tracking-wide">Protocol Standby</span>
        </div>
      </div>

      {/* FIX: min-h-[300px] -> min-h-75 */}
      <div className="bg-zinc-900/30 backdrop-blur-xl border border-white/5 rounded-4xl overflow-hidden shadow-2xl min-h-75 flex flex-col">
        <div className="flex items-center gap-6 px-8 border-b border-white/5 bg-black/20">
          <button onClick={() => setActiveTab('members')} className={`py-5 text-xs font-bold uppercase tracking-widest transition-colors relative ${activeTab === 'members' ? 'text-cyan-400' : 'text-zinc-500 hover:text-zinc-300'}`}>
            Member Database
            {activeTab === 'members' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400 rounded-t-full shadow-[0_0_10px_#22d3ee]" />}
          </button>
          <button onClick={() => setActiveTab('groups')} className={`py-5 text-xs font-bold uppercase tracking-widest transition-colors relative ${activeTab === 'groups' ? 'text-cyan-400' : 'text-zinc-500 hover:text-zinc-300'}`}>
            Connected Groups
            {activeTab === 'groups' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400 rounded-t-full shadow-[0_0_10px_#22d3ee]" />}
          </button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
           <div className="size-16 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center mb-6">
              <svg className="size-6 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
           </div>
           <span className="text-sm font-bold text-zinc-300 mb-2">{activeTab === 'members' ? "No Member Data Found" : "No Connected Groups"}</span>
           <p className="text-[10px] uppercase tracking-widest text-zinc-500 max-w-sm mb-6 leading-relaxed">
             Awaiting backend connection. Once the API is live, PDA state data will automatically synchronize here.
           </p>
        </div>
      </div>
    </div>
  );
}