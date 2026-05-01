"use client";
import React, { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import * as anchor from '@coral-xyz/anchor';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import toast from 'react-hot-toast';
import idl from '@/idl/axeon_protocol.json';

const PROGRAM_ID = new PublicKey("GYNmNqL6epMSAJe61FEW146UNZPzDSKNvRCtB1UN22t2");

export default function NewGroupPage() {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [groupId, setGroupId] = useState('');
  const [fee, setFee] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleDeploy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wallet.publicKey || !wallet.signTransaction) {
      toast.error("IDENTITY REQUIRED: Connect wallet to sign transaction.");
      return;
    }

    setIsLoading(true);
    const loadingToast = toast.loading("Deploying PDA Vault to Devnet...");

    try {
      const provider = new anchor.AnchorProvider(connection, wallet as unknown as anchor.Wallet, {
        preflightCommitment: "processed",
      });
      
      const program = new anchor.Program(idl as unknown as anchor.Idl, provider);

      const [vaultPda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("vault"),
          wallet.publicKey.toBuffer(),
          Buffer.from(groupId),
        ],
        PROGRAM_ID
      );

      const feeInDecimals = new anchor.BN(parseFloat(fee) * 1000000);

      const tx = await program.methods
        // Ini nanti bakal nyambung ke smart contract benerannya
        .initializeVault(groupId, feeInDecimals)
        .accounts({
          admin: wallet.publicKey,
          groupVault: vaultPda,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      console.log("TX_SIGNATURE:", tx);
      toast.success("VAULT DEPLOYED SUCCESSFULLY", { id: loadingToast });
      
      setGroupId('');
      setFee('');

    } catch (error) {
      const err = error as Error;
      console.error("DEPLOYMENT_FAILED:", err);
      toast.error(err.message || "Execution reverted", { id: loadingToast });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full animate-in fade-in duration-500 pb-20">
      
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Initialize Vault.</h1>
        <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Deploy a deterministic PDA on Solana</p>
      </div>

      <div className="bg-[#050505] border border-zinc-800 rounded-md p-8 md:p-12 shadow-2xl relative overflow-hidden">
        
        {/* Dekorasi Garis Khas Brutalism */}
        <div className="absolute top-0 left-0 w-1 h-full bg-zinc-800" />
        <div className="absolute top-0 left-0 w-1 h-12 bg-[#00ffcc]" />

        {!wallet.connected ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="size-16 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6">
               <svg className="size-6 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            </div>
            <span className="text-sm font-bold text-white mb-2">NO IDENTITY DETECTED</span>
            <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 max-w-sm text-center leading-relaxed">
              Cryptographic signature required. Connect your wallet to authorize contract deployment.
            </p>
          </div>
        ) : (
          <form onSubmit={handleDeploy} className="flex flex-col gap-8 ml-4">
            
            <div className="flex flex-col gap-3">
              <label htmlFor="groupId" className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
                Telegram Group ID <span className="text-zinc-600 font-normal ml-2">{"// Unique Identifier"}</span>
              </label>
              <input 
                id="groupId" 
                required
                type="text" 
                placeholder="e.g., AXEON_ALPHA_VIP" 
                value={groupId}
                onChange={(e) => setGroupId(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-sm px-4 py-3.5 font-mono text-xs text-white placeholder:text-zinc-700 focus:outline-none focus:border-[#00ffcc] transition-colors" 
              />
            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor="fee" className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
                Subscription Fee <span className="text-zinc-600 font-normal ml-2">{"// USDC Equivalent"}</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 w-12 flex items-center justify-center bg-zinc-900 border-r border-zinc-800 rounded-l-sm">
                  <span className="text-zinc-500 font-mono text-xs">$</span>
                </div>
                <input 
                  id="fee" 
                  required
                  type="number" 
                  min="0"
                  step="0.01"
                  placeholder="0.00" 
                  value={fee}
                  onChange={(e) => setFee(e.target.value)}
                  className="w-full bg-black border border-zinc-800 rounded-sm pl-16 pr-4 py-3.5 font-mono text-xs text-white placeholder:text-zinc-700 focus:outline-none focus:border-[#00ffcc] transition-colors" 
                />
              </div>
            </div>

            <div className="pt-8 mt-4 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3 w-full md:w-auto p-3 bg-zinc-900/50 border border-zinc-800 rounded-sm">
                <div className="size-1.5 bg-yellow-500 rounded-full animate-pulse" />
                <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">
                  Network Fee Required (~0.002 SOL)
                </span>
              </div>
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full md:w-auto px-8 py-3.5 bg-white text-black font-medium text-[11px] uppercase tracking-widest rounded-sm hover:bg-[#00ffcc] hover:shadow-[0_0_20px_rgba(0,255,204,0.3)] transition-all disabled:opacity-50 disabled:hover:bg-white flex items-center justify-center gap-3"
              >
                {isLoading && <span className="size-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />}
                {isLoading ? "EXECUTING TX..." : "DEPLOY PDA VAULT"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}