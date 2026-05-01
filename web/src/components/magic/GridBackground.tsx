"use client";
import React from 'react';

export default function GridBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
      {/* Grid Pattern */}
      <div className="absolute inset-0 mask-[radial-gradient(ellipse_at_center,black,transparent_80%)]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wIDBWMGg0MHY0MEgwdjQweiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDE1MCwgMTUwLCAxNTAsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIgLz4KPC9zdmc+')] bg-center bg-size-[40px_40px]" />
      </div>
      {/* Animated Light/Dark Glows */}
      <div className="absolute top-0 w-200 h-125 bg-blue-500/10 dark:bg-[#00ffcc]/10 rounded-full blur-[100px] -translate-y-1/2 animate-pulse" />
    </div>
  );
}