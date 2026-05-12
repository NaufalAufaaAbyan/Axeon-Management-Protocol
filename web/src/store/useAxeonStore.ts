import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AxeonState {
  isAuthenticated: boolean;
  role: 'guest' | 'admin' | 'subscriber';
  tier: 0 | 1 | 2;
  walletAddress: string | null;
  userEmail: string | null;
  userName: string | null;
  userImage: string | null;
  lang: 'en' | 'id';
  
  login: (role: 'admin' | 'subscriber', address: string, tier?: 0 | 1 | 2, extra?: Record<string, string | null>) => void;
  logout: () => void;
  setLang: (lang: 'en' | 'id') => void;
}

export const useAxeonStore = create<AxeonState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      role: 'guest',
      tier: 0,
      walletAddress: null,
      userEmail: null,
      userName: null,
      userImage: null,
      lang: 'en',

      login: (role, address, tier = 0, extra = {}) => set({ 
        isAuthenticated: true, 
        role, 
        walletAddress: address, 
        tier,
        userEmail: (extra.email as string) || null,
        userName: (extra.name as string) || null,
        userImage: (extra.image as string) || null,
      }),
      
      logout: () => set({ 
        isAuthenticated: false, 
        role: 'guest', 
        walletAddress: null, 
        tier: 0,
        userEmail: null,
        userName: null,
        userImage: null
      }),
      
      setLang: (lang) => set({ lang }),
    }),
    { name: 'axeon-storage' }
  )
);