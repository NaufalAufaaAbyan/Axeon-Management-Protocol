import { create } from 'zustand';

interface AxeonState {
  isAuthenticated: boolean;
  role: 'guest' | 'admin' | 'subscriber';
  tier: 0 | 1 | 2;
  walletAddress: string | null;
  lang: 'en' | 'id'; // Global Language State
  
  login: (role: 'admin' | 'subscriber', address: string, tier?: 0 | 1 | 2) => void;
  logout: () => void;
  upgradeTier: (newTier: 1 | 2) => void;
  setLang: (lang: 'en' | 'id') => void;
}

export const useAxeonStore = create<AxeonState>((set) => ({
  isAuthenticated: false,
  role: 'guest',
  tier: 0,
  walletAddress: null,
  lang: 'en', // Default ke English

  login: (role, address, tier = 0) => set({ 
    isAuthenticated: true, 
    role, 
    walletAddress: address, 
    tier 
  }),
  
  logout: () => set({ 
    isAuthenticated: false, 
    role: 'guest', 
    walletAddress: null, 
    tier: 0 
  }),
  
  upgradeTier: (newTier) => set({ tier: newTier }),
  
  setLang: (lang) => set({ lang }),
}));