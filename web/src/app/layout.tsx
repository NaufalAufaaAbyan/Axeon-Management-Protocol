import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../components/providers/ThemeProvider";
import { WalletContextProvider } from "../components/providers/WalletContextProvider";
import ContextMenuProvider from "../components/providers/ContextMenuProvider";
import GridBackground from "../components/magic/GridBackground";
import FlickeringGrid from "../components/magic/FlickeringGrid";
import ClickSpark from "../components/magic/ClickSpark";

export const metadata: Metadata = {
  title: "Axeon Protocol | Secure Your Community Sovereignty",
  description: "Non-custodial infrastructure for Telegram community monetization.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className="antialiased font-sans bg-[#f8f9fa] dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 overflow-x-hidden">
        <WalletContextProvider>
          <ThemeProvider 
            attribute="class" 
            defaultTheme="dark" 
            enableSystem={false} 
            disableTransitionOnChange
          >
            <ClickSpark>
              <div className="relative min-h-screen">
                <GridBackground />
                <FlickeringGrid />
                
                <div className="relative z-10">
                  <ContextMenuProvider>
                    {children}
                  </ContextMenuProvider>
                </div>
              </div>
            </ClickSpark>
          </ThemeProvider>
        </WalletContextProvider>
      </body>
    </html>
  );
}