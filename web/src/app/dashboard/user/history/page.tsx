export default function HistoryPage() {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="mb-10">
        <h1 className="text-3xl font-black tracking-tight text-white mb-2">Transaction History.</h1>
        <p className="text-xs text-zinc-400 uppercase tracking-widest font-medium">Your complete on-chain payment ledger.</p>
      </div>

      {/* FIX: Dihapus class 'border', sisa 'border-2' */}
      <div className="bg-zinc-900/30 backdrop-blur-xl border-white/5 rounded-3xl overflow-hidden p-20 flex flex-col items-center justify-center text-center border-dashed border-2">
        <div className="size-16 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center mb-4">
           <svg className="size-6 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
        </div>
        <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Awaiting On-Chain Sync...</span>
      </div>
    </div>
  );
}