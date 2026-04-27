export default function ExploreGroupsPage() {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="mb-10">
        <h1 className="text-3xl font-black tracking-tight text-white mb-2">Explore Groups.</h1>
        <p className="text-xs text-zinc-400 uppercase tracking-widest font-medium">Discover premium Solana communities.</p>
      </div>

      <div className="flex gap-4 mb-10">
        <input disabled type="text" placeholder="Search groups..." className="flex-1 bg-zinc-900/50 border border-white/5 rounded-xl px-4 py-3 text-sm text-zinc-500 cursor-not-allowed" />
        <button disabled className="px-8 py-3 bg-white/5 border border-white/5 text-zinc-500 font-black text-[10px] uppercase tracking-widest rounded-xl cursor-not-allowed">Search</button>
      </div>

      <div className="bg-transparent border-2 border-dashed border-white/5 rounded-[2.5rem] p-12 flex flex-col items-center justify-center text-center">
        <div className="size-16 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center mb-6">
           <svg className="size-6 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
        <span className="text-sm font-bold text-zinc-300 mb-2">No Public Groups Available</span>
        <p className="text-[10px] uppercase tracking-widest text-zinc-500 max-w-sm mb-8 leading-relaxed">Awaiting backend connection to synchronize public community data from PDA.</p>
      </div>
    </div>
  );
}