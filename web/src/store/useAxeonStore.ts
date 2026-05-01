import { create } from 'zustand';

// Mendefinisikan tipe data untuk state aplikasi
interface AxeonState {
  isAuthenticated: boolean;
  role: 'guest' | 'admin' | 'subscriber';
  tier: 0 | 1 | 2; // 0 = Starter, 1 = Pro, 2 = Enterprise
  walletAddress: string | null;
  
  // Actions
  login: (role: 'admin' | 'subscriber', address: string, tier?: 0 | 1 | 2) => void;
  logout: () => void;
  upgradeTier: (newTier: 1 | 2) => void;
}

export const useAxeonStore = create<AxeonState>((set) => ({
  isAuthenticated: false,
  role: 'guest',
  tier: 0,
  walletAddress: null,

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
}));