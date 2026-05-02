"use client";
import React, { useState, useEffect } from 'react';
import { useAxeonStore } from '../../../store/useAxeonStore';
import { toast } from 'sonner';

export default function AdminDashboardPage() {
  const [isClient, setIsClient] = useState(false);
  const { walletAddress } = useAxeonStore();

  // State untuk Modal Deploy Vault
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  
  // State Form Modal
  const [formData, setFormData] = useState({
    name: '',
    platform: 'Telegram',
    price: '',
    currency: 'USDC'
  });

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsClient(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const trimAddress = (addr: string | null) => {
    if (!addr) return 'Unconnected';
    if (addr.startsWith('Email_') || addr.startsWith('Google_')) return addr.replace(/_/g, ' ');
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const stats = { revenue: 12450.00, subscribers: 342, vaults: 2 };
  
  const vaults = [
    { id: 'v1', name: 'Alpha Traders VIP', platform: 'Telegram', price: 49, currency: 'USDC', subs: 210, status: 'Active' },
    { id: 'v2', name: 'Axeon Insider Group', platform: 'Telegram', price: 15, currency: 'USDC', subs: 132, status: 'Active' }
  ];

  const handleCopyLink = (vaultName: string) => {
    toast.success(`Checkout link for ${vaultName} copied to clipboard!`);
  };

  const handleDeployVault = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDeploying(true);
    const toastId = toast.loading('Deploying smart contract to Solana Devnet...');

    // Simulasi proses deploy ke blockchain
    setTimeout(() => {
      setIsDeploying(false);
      setIsDeployModalOpen(false);
      toast.success(`${formData.name} vault deployed successfully!`, { id: toastId });
      // Reset form
      setFormData({ name: '', platform: 'Telegram', price: '', currency: 'USDC' });
    }, 2500);
  };

  if (!isClient) return null;

  return (
    <div className="pt-16 pb-12 animate-in fade-in zoom-in-95 duration-500">
      
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-1">Creator Dashboard</h1>
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Connected as: <span className="font-mono text-zinc-700 dark:text-zinc-300">{trimAddress(walletAddress)}</span>
          </div>
        </div>
        <button 
          onClick={() => setIsDeployModalOpen(true)}
          className="px-6 py-3 bg-blue-600 dark:bg-[#00ffcc] text-white dark:text-black font-bold text-xs uppercase tracking-widest hover:bg-blue-700 dark:hover:bg-[#00e6b8] transition-colors rounded-xl shadow-lg flex items-center justify-center gap-2"
        >
          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Deploy New Vault
        </button>
      </div>

      {/* ================= STATS GRID ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="p-6 bg-white dark:bg-[#080808] border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm flex flex-col justify-between relative overflow-hidden group hover:border-blue-500 dark:hover:border-[#00ffcc] transition-colors">
          <div className="absolute top-0 right-0 p-6 opacity-10 dark:opacity-5 group-hover:scale-110 transition-transform duration-500">
            <svg className="size-16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/></svg>
          </div>
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">Total Revenue</span>
          <div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-zinc-900 dark:text-white tracking-tighter">${stats.revenue.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
              <span className="text-sm font-bold text-emerald-500 mb-1">+12.5%</span>
            </div>
            <span className="text-xs text-zinc-400">Lifetime volume routed</span>
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-[#080808] border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm flex flex-col justify-between hover:border-blue-500 dark:hover:border-[#00ffcc] transition-colors">
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">Active Subscribers</span>
          <div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-zinc-900 dark:text-white tracking-tighter">{stats.subscribers}</span>
              <span className="text-sm font-bold text-emerald-500 mb-1">+8 this week</span>
            </div>
            <span className="text-xs text-zinc-400">Across all deployed vaults</span>
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-[#080808] border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm flex flex-col justify-between hover:border-blue-500 dark:hover:border-[#00ffcc] transition-colors">
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">Active Vaults</span>
          <div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-zinc-900 dark:text-white tracking-tighter">{stats.vaults}</span>
            </div>
            <span className="text-xs text-zinc-400">Smart contracts managing access</span>
          </div>
        </div>
      </div>

      {/* ================= VAULTS TABLE ================= */}
      <div className="bg-white dark:bg-[#080808] border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <h2 className="font-bold text-lg text-zinc-900 dark:text-white">Deployed Vaults</h2>
          <button className="text-xs font-mono text-blue-600 dark:text-[#00ffcc] hover:underline uppercase tracking-widest">View On Explorer</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-500 uppercase tracking-widest">
                <th className="p-4 font-normal">Vault Name</th>
                <th className="p-4 font-normal">Platform</th>
                <th className="p-4 font-normal">Price / Mo</th>
                <th className="p-4 font-normal">Subscribers</th>
                <th className="p-4 font-normal">Status</th>
                <th className="p-4 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-sm">
              {vaults.map((vault) => (
                <tr key={vault.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/20 transition-colors">
                  <td className="p-4 font-bold text-zinc-900 dark:text-white">{vault.name}</td>
                  <td className="p-4 text-zinc-600 dark:text-zinc-400 flex items-center gap-2">
                    <svg className="size-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.539.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.85 5.18-4.686c.223-.195-.054-.31-.35-.116l-6.405 4.032-2.766-.86c-.604-.19-.617-.604.126-.89l10.814-4.17c.505-.187.954.116.827.873z"/></svg>
                    {vault.platform}
                  </td>
                  <td className="p-4 text-zinc-900 dark:text-white font-mono font-bold">${vault.price} {vault.currency}</td>
                  <td className="p-4 text-zinc-600 dark:text-zinc-400">{vault.subs}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
                      <span className="size-1.5 rounded-full bg-emerald-500"></span>
                      {vault.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => handleCopyLink(vault.name)}
                      className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-mono font-bold rounded transition-colors mr-2"
                    >
                      Copy Link
                    </button>
                    <button 
                      onClick={() => toast.info(`Opening settings for ${vault.name}...`)}
                      className="px-3 py-1.5 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-xs font-mono font-bold rounded transition-colors"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= MODAL DEPLOY NEW VAULT ================= */}
      {isDeployModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white dark:bg-[#080808] border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200">
            
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-600 to-emerald-400 dark:from-[#00ffcc] dark:to-blue-500" />
            
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Deploy New Vault</h3>
              <button 
                onClick={() => setIsDeployModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <form onSubmit={handleDeployVault} className="p-6 space-y-5">
              
              <div className="space-y-2">
                <label htmlFor="vaultName" className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-widest">Vault Name</label>
                <input 
                  id="vaultName"
                  type="text" 
                  required
                  placeholder="e.g. Premium Signals"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-sm rounded-lg h-10 px-3 focus:outline-none focus:border-blue-500 dark:focus:border-[#00ffcc] transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="platform" className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-widest">Target Platform</label>
                <select 
                  id="platform"
                  value={formData.platform}
                  onChange={(e) => setFormData({...formData, platform: e.target.value})}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-sm rounded-lg h-10 px-3 focus:outline-none focus:border-blue-500 dark:focus:border-[#00ffcc] transition-colors appearance-none"
                >
                  <option value="Telegram">Telegram Group</option>
                  <option value="Discord" disabled>Discord Server (Coming Soon)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="price" className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-widest">Monthly Price</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm font-mono">$</span>
                    <input 
                      id="price"
                      type="number" 
                      min="1"
                      step="0.01"
                      required
                      placeholder="0.00"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white font-mono text-sm rounded-lg h-10 pl-7 pr-3 focus:outline-none focus:border-blue-500 dark:focus:border-[#00ffcc] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="currency" className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-widest">Currency</label>
                  <select 
                    id="currency"
                    value={formData.currency}
                    onChange={(e) => setFormData({...formData, currency: e.target.value})}
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white font-mono text-sm rounded-lg h-10 px-3 focus:outline-none focus:border-blue-500 dark:focus:border-[#00ffcc] transition-colors appearance-none"
                  >
                    <option value="USDC">USDC</option>
                    <option value="SOL">SOL</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-lg">
                <p className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
                  <strong>Note:</strong> Deploying a vault creates an isolated smart contract on Solana. A small network fee (~0.002 SOL) is required.
                </p>
              </div>

              <div className="pt-2 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsDeployModalOpen(false)}
                  disabled={isDeploying}
                  className="flex-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isDeploying || !formData.name || !formData.price}
                  className="flex-[2] px-4 py-2 bg-blue-600 dark:bg-[#00ffcc] text-white dark:text-black font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-blue-700 dark:hover:bg-[#00e6b8] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isDeploying ? 'Processing...' : 'Deploy Contract'}
                </button>
              </div>
              
            </form>
          </div>
        </div>
      )}
      
    </div>
  );
}