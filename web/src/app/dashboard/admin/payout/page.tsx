export default function PayoutLogicPage() {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="mb-10">
        <h1 className="text-3xl font-black tracking-tight text-white mb-2">Payout Logic (PDA).</h1>
        <p className="text-xs text-zinc-400 uppercase tracking-widest font-medium">Configure settlement wallets and stablecoin auto-swap.</p>
      </div>

      <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-xl">
        <div className="flex flex-col gap-8 opacity-50 pointer-events-none">
          <div className="flex items-center justify-between bg-black/40 p-6 rounded-2xl border border-white/5">
            <div>
              <span className="text-sm font-bold text-white block mb-1">Auto-Swap to USDC</span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest">Convert all Fiat & SOL payments to USDC instantly.</span>
            </div>
            <div className="w-12 h-6 bg-cyan-500 rounded-full relative">
              <div className="absolute right-1 top-1 size-4 bg-white rounded-full" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="walletAddress" className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Settlement Wallet Address (Solana)</label>
            {/* FIX: Added id and aria-label */}
            <input id="walletAddress" aria-label="Settlement Wallet Address" disabled type="text" value="7aFxPqL8xGq...9qB2mP9zL1" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 font-mono text-xs text-zinc-500" />
            <span className="text-[9px] text-zinc-600 mt-1">Funds will be routed directly to this address. Non-custodial.</span>
          </div>
        </div>
      </div>
    </div>
  );
}