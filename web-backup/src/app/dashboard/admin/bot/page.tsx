"use client";
import toast from "react-hot-toast";

export default function BotSettingsPage() {
  const handleSave = () => {
    toast.error("Backend API is offline. Cannot save configuration.");
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="mb-10">
        <h1 className="text-3xl font-black tracking-tight text-white mb-2">Bot Settings.</h1>
        <p className="text-xs text-zinc-400 uppercase tracking-widest font-medium">Configure your Sentinel Bot messages and behavior.</p>
      </div>

      <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-xl">
        <div className="flex flex-col gap-6 opacity-50">
          
          <div className="flex flex-col gap-2 pointer-events-none">
            <label htmlFor="botToken" className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Telegram Bot Token</label>
            {/* FIX: Added id and aria-label */}
            <input id="botToken" aria-label="Telegram Bot Token" disabled type="password" value="123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 font-mono text-xs text-zinc-500" />
          </div>

          <div className="flex flex-col gap-2 pointer-events-none">
            <label htmlFor="warningMsg" className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">H-3 Warning Message</label>
            {/* FIX: Added id and aria-label */}
            <textarea id="warningMsg" aria-label="H-3 Warning Message" disabled className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 font-mono text-xs text-zinc-500 h-24 resize-none" value="Hello! Your subscription will expire in 3 days. Please renew to keep your access." />
          </div>

          <div className="pt-6 border-t border-white/5 flex justify-end">
            <button onClick={handleSave} className="px-8 py-3 bg-zinc-800 text-zinc-400 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-zinc-700 transition-colors cursor-pointer">
              Save Configuration
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}