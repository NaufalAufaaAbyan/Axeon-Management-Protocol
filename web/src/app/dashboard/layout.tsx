"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/dashboard/admin');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleDisconnect = (e: React.MouseEvent) => {
    e.preventDefault();
    toast.success("Wallet Disconnected Successfully");
  };

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-[#020617] text-zinc-100 flex font-sans selection:bg-cyan-500/30 overflow-hidden">
      
      {/* FIX: z-[60] -> z-60 */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm md:hidden" onClick={closeMenu} />
      )}

      {/* FIX: z-[70] -> z-70 */}
      <aside className={`fixed inset-y-0 left-0 z-70 w-64 bg-zinc-950 border-r border-white/5 flex flex-col p-6 transition-transform duration-300 md:relative md:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-2">
            <div className="size-2.5 bg-cyan-400 rounded-sm shadow-[0_0_15px_#22d3ee]" />
            <span className="font-black italic tracking-tighter uppercase text-lg">Axeon</span>
            <span className={`text-[8px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full ml-2 ${isAdmin ? 'bg-indigo-500/10 text-indigo-400' : 'bg-cyan-500/10 text-cyan-400'}`}>
              {isAdmin ? 'Admin' : 'App'}
            </span>
          </div>
          <button aria-label="Close Menu" title="Close Menu" className="md:hidden text-zinc-500 hover:text-white" onClick={closeMenu}>✕</button>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase mb-4">Main Menu</span>
          
          {isAdmin ? (
            <>
              <Link onClick={closeMenu} href="/dashboard/admin" className={`px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${pathname === '/dashboard/admin' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-zinc-500 hover:bg-white/5 hover:text-white'}`}>Control Panel</Link>
              <Link onClick={closeMenu} href="/dashboard/admin/bot" className={`px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${pathname === '/dashboard/admin/bot' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-zinc-500 hover:bg-white/5 hover:text-white'}`}>Bot Settings</Link>
              <Link onClick={closeMenu} href="/dashboard/admin/payout" className={`px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${pathname === '/dashboard/admin/payout' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-zinc-500 hover:bg-white/5 hover:text-white'}`}>Payout Logic (PDA)</Link>
            </>
          ) : (
            <>
              <Link onClick={closeMenu} href="/dashboard/user" className={`px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${pathname === '/dashboard/user' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-zinc-500 hover:bg-white/5 hover:text-white'}`}>My Subscriptions</Link>
              <Link onClick={closeMenu} href="/dashboard/user/explore" className={`px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${pathname === '/dashboard/user/explore' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-zinc-500 hover:bg-white/5 hover:text-white'}`}>Explore Groups</Link>
              <Link onClick={closeMenu} href="/dashboard/user/history" className={`px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${pathname === '/dashboard/user/history' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-zinc-500 hover:bg-white/5 hover:text-white'}`}>Transaction History</Link>
            </>
          )}
        </nav>

        <div className="mt-auto border-t border-white/5 pt-6">
          <Link href="/" className="text-[10px] text-zinc-500 hover:text-white uppercase tracking-widest font-bold flex items-center gap-2">
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Sign Out
          </Link>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-y-auto bg-[radial-gradient(ellipse_at_top_right,rgba(34,211,238,0.05),transparent_50%)] relative">
        <header className="h-20 border-b border-white/5 bg-zinc-950/20 backdrop-blur-md flex items-center justify-between md:justify-end px-6 md:px-8 sticky top-0 z-50">
           {/* FIX: Tambah aria-label dan title buat hamburger menu */}
           <button title="Toggle Menu" aria-label="Toggle Menu" className="md:hidden text-white" onClick={() => setMobileMenuOpen(true)}>
             <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
           </button>

           <div className="flex items-center gap-4">
             <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-zinc-900/80 border border-white/5 rounded-full">
                <div className="size-2 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981]" />
                <span className="text-[10px] font-mono text-zinc-400">7aFx...9qB2</span>
             </div>
             <button onClick={handleDisconnect} className="px-6 py-2.5 bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-widest rounded-full hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition-all">
               Disconnect
             </button>
           </div>
        </header>
        <div className="p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}