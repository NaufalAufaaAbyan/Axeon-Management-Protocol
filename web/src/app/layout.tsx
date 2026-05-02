import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/providers/ThemeProvider";
import WalletContextProvider from "../components/providers/WalletContextProvider";
import { Toaster } from "sonner";
import Navbar from "../components/navbar/navbar"; // IMPORT DI SINI

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Axeon Protocol | Stateless Subscription Infrastructure",
  description: "Monetize your Telegram and Discord communities seamlessly.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${inter.className} bg-white dark:bg-[#050505] text-zinc-900 dark:text-zinc-100 transition-colors duration-300`}>
        <ThemeProvider>
          <WalletContextProvider>
            {/* TAMBAHKAN NAVBAR DI SINI SEBAGAI HEADER GLOBAL */}
            <Navbar />
            {children}
            <Toaster position="bottom-right" theme="system" richColors closeButton />
          </WalletContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}