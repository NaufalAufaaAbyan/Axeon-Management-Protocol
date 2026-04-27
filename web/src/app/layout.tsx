import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "Axeon Protocol | Autonomous Access Layer",
  description: "The institutional-grade economic layer. Standardizing decentralized intent through automated payment gateways and precision on-chain audits on Solana.",
  keywords: ["Solana", "DeFi", "Axeon", "Web3", "Payment Gateway", "Smart Contract"],
  openGraph: {
    title: "Axeon Protocol",
    description: "Decentralized Economic Intent for Solana Communities.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#020617] text-zinc-100 font-sans antialiased overflow-x-hidden selection:bg-cyan-500/30">
        {children}
        {/* Sistem Notifikasi Pop-up */}
        <Toaster 
          position="bottom-right" 
          toastOptions={{
            style: {
              background: '#09090b',
              color: '#fff',
              border: '1px solid #27272a',
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontWeight: 'bold'
            },
            success: { iconTheme: { primary: '#22d3ee', secondary: '#000' } },
            error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
          }} 
        />
      </body>
    </html>
  );
}