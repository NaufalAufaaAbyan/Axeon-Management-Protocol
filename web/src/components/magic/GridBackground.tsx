import React from 'react';

export default function GridBackground() {
  return (
    // FIX: Menggunakan bg-size-[24px_24px] dan h-100 / w-100 sesuai rekomendasi Tailwind
    <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-[#050505] bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-size-[24px_24px] transition-colors duration-300">
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-100 w-100 rounded-full bg-blue-500/10 dark:bg-[#00ffcc]/10 opacity-30 blur-[100px]"></div>
    </div>
  );
}