"use client";
import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

export default function HistoryPage() {
  const [isClient, setIsClient] = useState(false);
  const { publicKey } = useWallet();

  // Mock data: Nanti ini dihapus dan diganti dengan data fetching dari RPC Solana
  const mockHistory = [
    {
      signature: "5KqTd...8y9xP",
      date: "2026-04-15T14:30:00Z",
      vaultId: "AXEON_ALPHA_VIP",
      type: "INITIAL_SUBSCRIPTION",
      amount: 25.00,
      status: "CONFIRMED"
    },
    {
      signature: "2JzRm...3v4aL",
      date: "2026-04-02T09:15:00Z",
      vaultId: "SOL_DEVS_ID",
      type: "RENEWAL",
      amount: 10.00,
      status: "CONFIRMED"
    },
    {
      signature: "4pXcB...9nM2k",
      date: "2026-03-02T09:10:00Z",
      vaultId: "SOL_DEVS_ID",
      type: "INITIAL_SUBSCRIPTION",
      amount: 10.00,
      status: "CONFIRMED"
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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-zinc-800 pb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">On-Chain Ledger.</h1>
          <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Verifiable Transaction History</p>
        </div>
        
        <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-sm">
          <svg className="size-3 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
            {publicKey ? "Address Synced" : "Awaiting Identity"}
          </span>
        </div>
      </div>

      {/* ================= LEDGER TABLE ================= */}
      <div className="bg-[#050505] border border-zinc-800 rounded-md overflow-hidden shadow-2xl relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-zinc-800" />
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-900/50 border-b border-zinc-800">
                <th className="px-6 py-4 text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest">Timestamp</th>
                <th className="px-6 py-4 text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest">Signature (Tx)</th>
                <th className="px-6 py-4 text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest">Vault ID</th>
                <th className="px-6 py-4 text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest">Action</th>
                <th className="px-6 py-4 text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest text-right">Amount (USDC)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {mockHistory.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-zinc-600 font-mono text-[10px] uppercase tracking-widest">
                    No transactions found for this identity.
                  </td>
                </tr>
              ) : (
                mockHistory.map((tx, index) => (
                  <tr key={index} className="hover:bg-zinc-900/30 transition-colors group">
                    {/* Timestamp */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-xs font-mono text-zinc-400">
                        {new Date(tx.date).toLocaleDateString('en-GB')} <span className="text-zinc-600 ml-1">{new Date(tx.date).toLocaleTimeString('en-GB', {hour: '2-digit', minute:'2-digit'})}</span>
                      </span>
                    </td>
                    
                    {/* Signature */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a href={`https://explorer.solana.com/tx/${tx.signature}?cluster=devnet`} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-mono text-blue-400 hover:text-blue-300 transition-colors">
                        {tx.signature}
                        <svg className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      </a>
                    </td>
                    
                    {/* Vault ID */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-[10px] font-mono text-zinc-300 uppercase tracking-widest bg-zinc-900 border border-zinc-800 px-2 py-1 rounded">
                        {tx.vaultId}
                      </span>
                    </td>
                    
                    {/* Action */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                        {tx.type.replace('_', ' ')}
                      </span>
                    </td>
                    
                    {/* Amount */}
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span className="text-xs font-mono font-bold text-[#00ffcc]">
                        ${tx.amount.toFixed(2)}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Footer info */}
        <div className="bg-black border-t border-zinc-800 p-4 flex justify-between items-center">
           <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">Showing last {mockHistory.length} transactions</span>
           <div className="flex items-center gap-2">
             <div className="size-1.5 bg-[#00ffcc] rounded-full shadow-[0_0_8px_#00ffcc]" />
             <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Synced with Solana Devnet</span>
           </div>
        </div>
      </div>

    </div>
  );
}