export default function NewGroupPage() {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="mb-10">
        <h1 className="text-3xl font-black tracking-tight text-white mb-2">Create New Group.</h1>
        <p className="text-xs text-zinc-400 uppercase tracking-widest font-medium">Deploy a new Sentinel vault on the Solana network.</p>
      </div>

      {/* FIX: Dihapus class 'border', sisa 'border-2' */}
      <div className="bg-zinc-900/40 backdrop-blur-xl border-white/5 rounded-3xl p-8 shadow-xl border-dashed border-2">
        <div className="flex flex-col items-center justify-center py-10 opacity-50">
          <div className="size-16 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center mb-6">
             <svg className="size-6 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          </div>
          <span className="text-sm font-bold text-white mb-2">Smart Contract Deployment Offline</span>
          <p className="text-[10px] uppercase tracking-widest text-zinc-500 max-w-md text-center leading-relaxed">
            Form inputs are disabled until the Backend and Solana RPC are connected. Deployment requires a signature to initialize the PDA vault.
          </p>
        </div>
      </div>
    </div>
  );
}