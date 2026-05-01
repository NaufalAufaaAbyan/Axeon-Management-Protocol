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
      toast.error("Connect your wallet first!");
      return;
    }

    setIsLoading(true);
    const loadingToast = toast.loading("Deploying PDA Vault to Solana...");

    try {
      // FIX 1: Gunakan unknown untuk bypass 'any' rule
      const provider = new anchor.AnchorProvider(connection, wallet as unknown as anchor.Wallet, {
        preflightCommitment: "processed",
      });
      
      // FIX 2: Anchor terbaru hanya butuh (idl, provider)
      const program = new anchor.Program(idl as anchor.Idl, provider);

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
        .initializeVault(groupId, feeInDecimals)
        .accounts({
          admin: wallet.publicKey,
          groupVault: vaultPda,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      console.log("Transaction Signature:", tx);
      toast.success("Vault Deployed Successfully!", { id: loadingToast });
      
      setGroupId('');
      setFee('');

    } catch (error) {
      // FIX 3: Cast error dengan aman alih-alih pakai 'any'
      const err = error as Error;
      console.error("Deployment failed:", err);
      toast.error(err.message || "Failed to deploy vault", { id: loadingToast });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="mb-10">
        <h1 className="text-3xl font-black tracking-tight text-white mb-2">Create New Group.</h1>
        <p className="text-xs text-zinc-400 uppercase tracking-widest font-medium">Deploy a new Sentinel vault on the Solana network.</p>
      </div>

      {/* FIX 4: Hapus 'border', sisa 'border-2' */}
      <div className="bg-zinc-900/40 backdrop-blur-xl border-white/5 rounded-3xl p-8 md:p-12 shadow-xl border-dashed border-2">
        
        {!wallet.connected ? (
          <div className="flex flex-col items-center justify-center py-10 opacity-50">
            <div className="size-16 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center mb-6">
               <svg className="size-6 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            </div>
            <span className="text-sm font-bold text-white mb-2">Wallet Disconnected</span>
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 max-w-md text-center leading-relaxed">
              Connect your Phantom or Backpack wallet to sign the deployment transaction.
            </p>
          </div>
        ) : (
          <form onSubmit={handleDeploy} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="groupId" className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Telegram Group ID / Name</label>
              <input 
                id="groupId" 
                required
                type="text" 
                placeholder="e.g., UNAMABCC_VIP" 
                value={groupId}
                onChange={(e) => setGroupId(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 font-mono text-sm text-white placeholder:text-zinc-700 focus:outline-none focus:border-cyan-500/50 transition-colors" 
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="fee" className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Monthly Subscription Fee (USDC)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-black">$</span>
                <input 
                  id="fee" 
                  required
                  type="number" 
                  min="0"
                  step="0.01"
                  placeholder="10.00" 
                  value={fee}
                  onChange={(e) => setFee(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl pl-8 pr-4 py-3 font-mono text-sm text-white placeholder:text-zinc-700 focus:outline-none focus:border-emerald-500/50 transition-colors" 
                />
              </div>
            </div>

            <div className="pt-6 mt-2 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-2 bg-yellow-500 rounded-full animate-pulse" />
                <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold">Requires Network Fee (~0.002 SOL)</span>
              </div>
              <button 
                type="submit" 
                disabled={isLoading}
                className="px-8 py-3.5 bg-cyan-500 text-black font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {isLoading ? <span className="size-4 border-2 border-black/20 border-t-black rounded-full animate-spin" /> : null}
                {isLoading ? "Deploying..." : "Deploy Vault (PDA)"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}