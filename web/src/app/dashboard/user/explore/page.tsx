"use client";
import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import toast from 'react-hot-toast';

// Mock data: Daftar grup yang terdaftar di smart contract Axeon
const availableVaults = [
  { id: "AXEON_ALPHA_VIP", name: "Axeon Alpha Circle", fee: 25.00, members: 142, tags: ["Alpha", "Trading"] },
  { id: "DEFI_WHALES_ID", name: "DeFi Whales Indo", fee: 50.00, members: 89, tags: ["DeFi", "Whales"] },
  { id: "SOL_DEVS_ID", name: "Solana Devs Indonesia", fee: 10.00, members: 430, tags: ["Development", "Rust"] },
  { id: "APEX_SIGNALS_X", name: "Apex Trading Signals", fee: 100.00, members: 21, tags: ["Signals", "Futures"] },
];

export default function ExplorePage() {
  const [isClient, setIsClient] = useState(false);
  const { connected } = useWallet();
  const [searchQuery, setSearchQuery] = useState('');
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsClient(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleSubscribe = async (vaultId: string, fee: number) => {
    if (!connected) {
      toast.error("IDENTITY REQUIRED: Connect wallet to execute payment.");
      return;
    }

    setProcessingId(vaultId);
    const loadingToast = toast.loading(`Routing ${fee} USDC to ${vaultId}...`);

    // Simulasi interaksi Smart Contract
    setTimeout(() => {
      setProcessingId(null);
      toast.success("PAYMENT VERIFIED: Access Granted", { id: loadingToast });
    }, 2500);
  };

  const filteredVaults = availableVaults.filter(v => 
    v.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    v.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isClient) return null;

  return (
    <div className="w-full animate-in fade-in duration-500 pb-20">
      
      {/* ================= HEADER & SEARCH ================= */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-zinc-800 pb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Protocol Explorer.</h1>
          <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Discover & Subscribe to Premium Vaults</p>
        </div>
        
        <div className="w-full md:w-72 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="size-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <input 
            type="text" 
            placeholder="Search Vault ID or Name..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#050505] border border-zinc-800 rounded-sm pl-10 pr-4 py-2.5 font-mono text-[10px] uppercase tracking-widest text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#00ffcc] transition-colors"
          />
        </div>
      </div>

      {/* ================= EXPLORER GRID ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredVaults.length === 0 ? (
          <div className="col-span-full py-12 text-center">
            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">No Vaults matching your query.</span>
          </div>
        ) : (
          filteredVaults.map((vault) => (
            <div key={vault.id} className="bg-[#050505] border border-zinc-800 rounded-md overflow-hidden relative group hover:border-zinc-600 transition-all shadow-lg flex flex-col">
              
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-white shadow-inner">
                      {vault.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-sm leading-tight">{vault.name}</h3>
                      <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">ID: {vault.id}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block text-lg font-mono font-bold text-[#00ffcc]">${vault.fee.toFixed(2)}</span>
                    <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">USDC / Month</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 mt-4">
                  <div className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded flex items-center gap-1.5">
                    <svg className="size-3 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    <span className="text-[9px] font-mono text-zinc-400">{vault.members} Active</span>
                  </div>
                  {vault.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-1 bg-black border border-zinc-800 rounded text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 border-t border-zinc-800 bg-black/50">
                <button 
                  onClick={() => handleSubscribe(vault.id, vault.fee)}
                  disabled={processingId === vault.id}
                  className="w-full py-3 bg-white text-black font-medium text-[10px] uppercase tracking-widest rounded-sm hover:bg-[#00ffcc] hover:shadow-[0_0_15px_rgba(0,255,204,0.3)] transition-all disabled:opacity-50 disabled:hover:bg-white flex items-center justify-center gap-2"
                >
                  {processingId === vault.id ? (
                    <>
                      <span className="size-3 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                      EXECUTING TX...
                    </>
                  ) : (
                    "AUTHORIZE PAYMENT"
                  )}
                </button>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}