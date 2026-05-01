"use client";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// FIX: Nge-cast komponen bawaan next-themes menjadi ElementType generik
// Ini bikin TypeScript berhenti bawel nanyain soal prop 'children'
const Provider = NextThemesProvider as React.ElementType;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider attribute="class" defaultTheme="dark" enableSystem>
      {children}
    </Provider>
  );
}