"use client";
import { useEffect, useState } from "react";

export default function GridBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // FIX: Pakai setTimeout agar terhindar dari bug Strict Mode
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="absolute inset-0 size-full pointer-events-none z-0 bg-[linear-gradient(to_right,var(--grid-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-color)_1px,transparent_1px)] bg-size-[32px_32px] mask-[radial-gradient(ellipse_at_center,transparent_20%,black_100%)]"
    />
  );
}