'use client';

import { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { verifyPayment } from '../lib/api';
import { toast } from 'sonner';
import { FiSend, FiLock, FiCheckCircle } from 'react-icons/fi';
import { FaTelegramPlane } from 'react-icons/fa';

interface PaymentSectionProps {
  vaultId: string;
  vaultName: string;
  priceAmount: number;
  currency: 'SOL' | 'USDC';
  creatorWallet: string;
}

export default function PaymentSection({ vaultId, vaultName, priceAmount, currency, creatorWallet }: PaymentSectionProps) {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  
  const [loading, setLoading] = useState(false);
  const [inviteLink, setInviteLink] = useState<string | null>(null);
  
  // State buat nyimpen ID/Username Telegram
  const [telegramId, setTelegramId] = useState('');

  const handlePayment = async () => {
    if (!publicKey) return toast.error("Please connect your wallet first!");
    
    // Validasi biar user gak bisa bayar kalau username TG-nya kosong
    if (!telegramId || telegramId.trim() === '') {
      return toast.error("Telegram Username/ID is required for Sentinel Bot verification.");
    }

    setLoading(true);
    const toastId = toast.loading('Initiating Secure Transfer...');

    try {
      let signature = '';
      
      if (currency === 'SOL') {
          // 1. Ambil blockhash terbaru secara eksplisit biar Phantom nggak bingung
          const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();

          // 2. Rakit instruksi transfer
          const transaction = new Transaction().add(
            SystemProgram.transfer({
              fromPubkey: publicKey,
              toPubkey: new PublicKey(creatorWallet),
              lamports: priceAmount * LAMPORTS_PER_SOL,
            })
          );

          // 3. Set blockhash dan pembayar fee secara eksplisit
          transaction.recentBlockhash = blockhash;
          transaction.feePayer = publicKey;

          // 4. Minta approval dari Phantom
          signature = await sendTransaction(transaction, connection);

          toast.loading('Awaiting Network Confirmation...', { id: toastId });

          // 5. Tunggu sampai transaksi dikonfirmasi di blockchain
          await connection.confirmTransaction({
            signature,
            blockhash,
            lastValidBlockHeight
          }, 'confirmed');

      } else {
          // Placeholder untuk logika SPL-Token (USDC). 
          throw new Error("USDC payments are currently in beta. Please use SOL.");
      }

      toast.loading('Verifying transaction on Axeon Nodes...', { id: toastId });

      // 6. Verifikasi ke Backend dan minta link Telegram
      const result = await verifyPayment({
        signature,
        amount: priceAmount,
        walletAddress: publicKey.toBase58(),
        vaultId: vaultId,
        telegramId: telegramId.trim(),
        currency: currency
      });

      if (result.success) {
        setInviteLink(result.inviteLink);
        toast.success('Access Granted!', { id: toastId });
      } else {
        toast.error("Verification failed: " + result.message, { id: toastId });
      }
    } catch (error) {
      const err = error as Error;
      console.error(err);
      toast.error(err.message || "Transaction cancelled", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-[#050505] border border-white/10 rounded-3xl shadow-2xl relative overflow-hidden font-sans">
      {/* Subtle Glow Effect */}
      <div className="absolute -top-20 -right-20 w-48 h-48 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />
      
      <div className="flex items-center justify-between mb-6 relative z-10">
         <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">
            Axeon Checkout
         </h3>
         <span className="flex items-center gap-1.5 text-[8px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
            <FiLock size={10} /> Secure
         </span>
      </div>
      
      {!inviteLink ? (
        <div className="space-y-6 relative z-10">
          
          {/* Order Summary */}
          <div className="bg-black border border-white/5 p-5 rounded-2xl space-y-3 shadow-inner">
            <div className="flex justify-between items-center pb-3 border-b border-white/5">
              <span className="text-[9px] font-black uppercase text-zinc-500 tracking-widest">Vault Name</span>
              <span className="text-[10px] text-white font-bold">{vaultName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-black uppercase text-zinc-400">Total Due</span>
              <span className="text-white font-black text-sm">{priceAmount.toFixed(2)} {currency}</span>
            </div>
          </div>
          
          {/* Input Form untuk Telegram Sentinel */}
          <div className="space-y-3">
             <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                <FaTelegramPlane /> Telegram Username / ID <span className="text-red-500">*</span>
             </label>
             <input 
                type="text" 
                placeholder="@your_username" 
                value={telegramId}
                onChange={(e) => setTelegramId(e.target.value)}
                className="w-full bg-black border border-white/10 text-white text-sm font-bold rounded-xl h-14 px-5 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-zinc-700"
             />
             <p className="text-[8px] font-bold uppercase tracking-widest text-zinc-600 ml-1">
                Required for Sentinel Bot verification & auto-kick.
             </p>
          </div>

          {/* Payment Button */}
          <button
            onClick={handlePayment}
            // Tombol disable kalau wallet belum konek, proses loading, ATAU username TG kosong
            disabled={loading || !publicKey || !telegramId.trim()}
            className="w-full h-14 flex items-center justify-center gap-3 bg-white text-black hover:bg-zinc-200 disabled:bg-zinc-900 disabled:text-zinc-600 disabled:border disabled:border-white/5 font-black text-[10px] uppercase tracking-[0.2em] rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95"
          >
            {loading ? (
               <span className="animate-pulse">Processing...</span>
            ) : (
               <>
                  <FiSend size={14} /> Pay with {currency}
               </>
            )}
          </button>
        </div>
      ) : (
        /* Success State */
        <div className="bg-[#050505] border border-blue-500/30 p-8 rounded-2xl text-center relative z-10 shadow-inner">
          <div className="size-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-5 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
            <FiCheckCircle className="size-8 text-white" />
          </div>
          <h4 className="text-white font-black text-lg italic uppercase tracking-tighter mb-1">Access Granted!</h4>
          <p className="text-zinc-500 font-bold text-[9px] uppercase tracking-widest mb-6 leading-relaxed">
            Your identity is verified on-chain. Do not share this link.
          </p>
          <a
            href={inviteLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-blue-500 text-white h-14 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-400 transition-all shadow-[0_0_20px_rgba(59,130,246,0.2)] active:scale-95"
          >
            <FaTelegramPlane size={14} /> Enter Sentinel Group
          </a>
        </div>
      )}
    </div>
  );
}