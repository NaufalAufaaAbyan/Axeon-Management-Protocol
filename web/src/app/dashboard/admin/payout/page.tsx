"use client";
import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import toast from 'react-hot-toast';

export default function PayoutPage() {
  const [isClient, setIsClient] = useState(false);
  const wallet = useWallet();
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data saldo Vault di Devnet (Nantinya ini di-fetch via RPC dari PDA Vault lu)
  const vaultBalance = 1250.75;

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsClient(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wallet.connected || !wallet.publicKey) {
      toast.error("IDENTITY REQUIRED: Connect wallet to sign payload.");
      return;
    }

    const withdrawAmount = parseFloat(amount);
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      toast.error("EXECUTION REVERTED: Invalid amount.");
      return;
    }

    if (withdrawAmount > vaultBalance) {
      toast.error("EXECUTION REVERTED: Insufficient Vault Liquidity.");
      return;
    }

    setIsLoading(true);
    const loadingToast = toast.loading("Awaiting cryptographic signature...");

    // Simulasi eksekusi Smart Contract Withdraw
    setTimeout(() => {
      setIsLoading(false);
      toast.success("PAYOUT EXECUTED SUCCESSFULLY", { id: loadingToast });
      setAmount('');
    }, 2500);
  };

  const setMaxAmount = () => {
    setAmount(vaultBalance.toString());
  };

  if (!isClient) return null;

  return (
    <div className="w-full animate-in fade-in duration-500 pb-20">
      
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Vault Logic.</h1>
          <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Protocol Liquidity & Revenue Extraction</p>
        </div>
        
        <div className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-sm flex items-center gap-3">
          <div className="size-2 rounded-full bg-[#00ffcc] animate-pulse shadow-[0_0_8px_#00ffcc]" />
          <span className="text-[10px] font-mono font-bold text-[#00ffcc] uppercase tracking-widest">
            TREASURY SYNCED
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ================= LIQUIDITY PANEL (KIRI) ================= */}
        <div className="col-span-1 lg:col-span-5 flex flex-col gap-6">
          {/* Main Balance Card */}
          <div className="bg-[#050505] border border-zinc-800 rounded-md p-8 relative overflow-hidden group hover:border-[#00ffcc]/50 transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <svg className="size-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            
            <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest block mb-6">On-Chain Liquidity</span>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-mono text-white tracking-tight">{vaultBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              <span className="text-sm font-mono text-[#00ffcc]">USDC</span>
            </div>
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Available to withdraw</span>
          </div>

          {/* Network Info */}
          <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-md flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Settlement Layer</span>
              <span className="text-[10px] font-mono font-bold text-white uppercase tracking-widest">Solana (Devnet)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Est. Gas Fee</span>
              <span className="text-[10px] font-mono text-zinc-400">~0.000005 SOL</span>
            </div>
          </div>
        </div>

        {/* ================= WITHDRAWAL FORM (KANAN) ================= */}
        <div className="col-span-1 lg:col-span-7 bg-[#050505] border border-zinc-800 rounded-md p-8 md:p-10 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-1 h-full bg-zinc-800" />
          
          <div className="flex items-center gap-3 mb-8">
            <div className="size-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center">
              <svg className="size-4 text-zinc-400 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
            </div>
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-widest">Execute Payout</h2>
              <p className="text-[9px] font-mono text-zinc-500">Transfer funds from PDA to Admin Wallet</p>
            </div>
          </div>

          <form onSubmit={handleWithdraw} className="flex flex-col gap-8">
            
            {/* Amount Input */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-end">
                <label htmlFor="amount" className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
                  Extraction Amount <span className="text-zinc-600 font-normal ml-2">{"// USDC"}</span>
                </label>
                <button type="button" onClick={setMaxAmount} className="text-[9px] font-mono text-[#00ffcc] hover:text-white transition-colors uppercase tracking-widest">
                  MAX AMOUNT
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 w-12 flex items-center justify-center bg-zinc-900 border-r border-zinc-800 rounded-l-sm">
                  <span className="text-zinc-500 font-mono text-xs">$</span>
                </div>
                <input 
                  id="amount" 
                  required
                  type="number" 
                  min="0.01"
                  step="0.01"
                  max={vaultBalance}
                  placeholder="0.00" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-black border border-zinc-800 rounded-sm pl-16 pr-4 py-4 font-mono text-sm text-white placeholder:text-zinc-700 focus:outline-none focus:border-[#00ffcc] transition-colors" 
                />
              </div>
            </div>

            {/* Destination Output (Read-only) */}
            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
                Destination Address <span className="text-zinc-600 font-normal ml-2">{"// Connected Wallet"}</span>
              </label>
              <div className="w-full bg-zinc-900/50 border border-zinc-800 rounded-sm px-4 py-4 font-mono text-xs text-zinc-500 flex items-center justify-between">
                <span>{wallet.publicKey ? wallet.publicKey.toBase58() : "AWAITING IDENTITY..."}</span>
                {wallet.publicKey && <span className="size-2 bg-emerald-500 rounded-full shadow-[0_0_5px_#10b981]" />}
              </div>
            </div>

            {/* Action Button */}
            <button 
              type="submit" 
              disabled={isLoading || !wallet.connected}
              className="w-full mt-4 py-4 bg-white text-black font-medium text-[11px] uppercase tracking-widest rounded-sm hover:bg-[#00ffcc] hover:shadow-[0_0_20px_rgba(0,255,204,0.3)] transition-all disabled:opacity-50 disabled:hover:bg-white flex items-center justify-center gap-3"
            >
              {isLoading && <span className="size-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />}
              {isLoading ? "BROADCASTING TX..." : "EXECUTE PAYOUT TX"}
            </button>
            
          </form>
        </div>

      </div>
    </div>
  );
}