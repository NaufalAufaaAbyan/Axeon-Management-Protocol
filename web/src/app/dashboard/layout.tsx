"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAxeonStore } from '../../store/useAxeonStore';
import { toast } from 'sonner';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // FIX: Menghapus 'role' yang tidak digunakan
  const { isAuthenticated } = useAxeonStore();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Unauthorized access. Please connect your wallet first.');
      router.push('/login');
    } else {
      // FIX: Gunakan requestAnimationFrame agar tidak memicu error synchronous setState
      const frame = requestAnimationFrame(() => setIsChecking(false));
      return () => cancelAnimationFrame(frame);
    }
  }, [isAuthenticated, router]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#050505]">
        <div className="flex flex-col items-center gap-4">
          <div className="size-8 border-2 border-zinc-200 dark:border-zinc-800 border-t-blue-600 dark:border-t-[#00ffcc] rounded-full animate-spin" />
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Verifying Identity...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-zinc-50 dark:bg-black selection:bg-blue-500/30 dark:selection:bg-[#00ffcc]/30">
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-10">
        {children}
      </main>
    </div>
  );
}