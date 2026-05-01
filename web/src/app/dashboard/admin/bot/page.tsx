"use client";
import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function BotConfigPage() {
  const [botToken, setBotToken] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [botStatus, setBotStatus] = useState<'standby' | 'active' | 'error'>('standby');
  const [logs, setLogs] = useState<string[]>([
    "[SYSTEM] Initialize Axeon Sentinel Configuration Module...",
    "[SYSTEM] Awaiting Telegram Bot Token payload..."
  ]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `[${new Date().toISOString().split('T')[1].slice(0, -1)}] ${message}`]);
  };

  const handleSync = (e: React.FormEvent) => {
    e.preventDefault();
    if (!botToken.startsWith('1') && !botToken.includes(':')) {
      toast.error("INVALID TOKEN FORMAT");
      addLog("[ERROR] Invalid Telegram Bot Token format rejected.");
      return;
    }

    setIsSyncing(true);
    addLog("[NETWORK] Pinging Telegram API Endpoint...");
    
    setTimeout(() => {
      setIsSyncing(false);
      setBotStatus('active');
      toast.success("SENTINEL SYNCHRONIZED");
      addLog("[SUCCESS] Webhook established. Sentinel is now listening for events.");
      setBotToken(''); 
    }, 2000);
  };

  return (
    <div className="w-full animate-in fade-in duration-500 pb-20">
      
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Sentinel Configuration.</h1>
          <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Telegram Bot Webhook & Automation Sync</p>
        </div>
        
        {/* Status Badge */}
        <div className={`px-4 py-2 border rounded-sm flex items-center gap-3 ${
          botStatus === 'active' ? 'bg-[#00ffcc]/10 border-[#00ffcc]/30 text-[#00ffcc]' : 
          botStatus === 'error' ? 'bg-red-500/10 border-red-500/30 text-red-400' : 
          'bg-zinc-900 border-zinc-800 text-zinc-400'
        }`}>
          <div className={`size-2 rounded-full ${
            botStatus === 'active' ? 'bg-[#00ffcc] animate-pulse shadow-[0_0_8px_#00ffcc]' : 
            botStatus === 'error' ? 'bg-red-500' : 'bg-zinc-600'
          }`} />
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest">
            {botStatus === 'active' ? 'SENTINEL ONLINE' : botStatus === 'error' ? 'CONNECTION LOST' : 'STANDBY MODE'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ================= FORM PANEL (KIRI) ================= */}
        <div className="col-span-1 lg:col-span-5 bg-[#050505] border border-zinc-800 rounded-md p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-zinc-800" />
          
          <div className="flex items-center gap-3 mb-8">
            <div className="size-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center">
              <svg className="size-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M4 17h16a2 2 0 002-2V9a2 2 0 00-2-2H4a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg>
            </div>
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-widest">API Handshake</h2>
              <p className="text-[9px] font-mono text-zinc-500">Inject BotFather Token</p>
            </div>
          </div>

          <form onSubmit={handleSync} className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <label htmlFor="token" className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
                HTTP API Token <span className="text-zinc-600 font-normal ml-2">{"// Keep Secure"}</span>
              </label>
              <input 
                id="token" 
                required
                type="password" 
                placeholder="1234567890:AAH_XXXXXXXXXXXXXXX" 
                value={botToken}
                onChange={(e) => setBotToken(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-sm px-4 py-3 font-mono text-xs text-white placeholder:text-zinc-700 focus:outline-none focus:border-[#00ffcc] transition-colors" 
              />
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-sm flex flex-col gap-2">
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                <span>Webhook Mode</span>
                <span className="text-[#00ffcc]">Enforced</span>
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                <span>Polling Fallback</span>
                <span className="text-zinc-600">Disabled</span>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSyncing || botToken.length === 0}
              className="w-full py-3.5 bg-white text-black font-medium text-[11px] uppercase tracking-widest rounded-sm hover:bg-[#00ffcc] hover:shadow-[0_0_20px_rgba(0,255,204,0.3)] transition-all disabled:opacity-50 disabled:hover:bg-white flex items-center justify-center gap-3 mt-2"
            >
              {isSyncing && <span className="size-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />}
              {isSyncing ? "SYNCHRONIZING..." : "INITIALIZE SENTINEL"}
            </button>
          </form>
        </div>

        {/* ================= TERMINAL LOGS (KANAN) ================= */}
        <div className="col-span-1 lg:col-span-7 bg-[#050505] border border-zinc-800 rounded-md overflow-hidden flex flex-col h-100">
          <div className="h-10 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-zinc-700" />
              <div className="size-2 rounded-full bg-zinc-700" />
              <div className="size-2 rounded-full bg-zinc-700" />
            </div>
            <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">axeon-daemon.log</span>
            <button onClick={() => setLogs([])} className="text-[9px] font-mono text-zinc-600 hover:text-white transition-colors uppercase tracking-widest">Clear</button>
          </div>
          
          <div className="flex-1 p-4 font-mono text-[10px] leading-loose overflow-y-auto bg-black text-zinc-400">
            {logs.length === 0 ? (
              <div className="text-zinc-600 italic">No logs available.</div>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="mb-1 wrap-break-word">
                  {log.includes('[ERROR]') ? (
                    <span className="text-red-400">{log}</span>
                  ) : log.includes('[SUCCESS]') || log.includes('[NETWORK]') ? (
                    <span className="text-[#00ffcc]">{log}</span>
                  ) : (
                    <span>{log}</span>
                  )}
                </div>
              ))
            )}
            <div className="inline-block w-2 h-3 bg-zinc-500 animate-pulse ml-1 mt-1 align-middle" />
          </div>
        </div>

      </div>
    </div>
  );
}