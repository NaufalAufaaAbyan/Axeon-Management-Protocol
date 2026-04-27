"use client";
import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';

interface GooeyNavItem { label: string; href: string; }
export interface GooeyNavProps { items: GooeyNavItem[]; initialActiveIndex?: number; }

const GooeyNav: React.FC<GooeyNavProps> = ({ items, initialActiveIndex = 0 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(initialActiveIndex);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });

  const updatePill = (index: number) => {
    const nav = containerRef.current;
    if (!nav) return;
    const listItems = nav.querySelectorAll('li');
    const activeItem = listItems[index] as HTMLElement;
    
    if (activeItem) {
      setPillStyle({
        left: activeItem.offsetLeft,
        width: activeItem.offsetWidth,
        opacity: 1
      });
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => updatePill(activeIndex), 50);
    const ro = new ResizeObserver(() => updatePill(activeIndex));
    if (containerRef.current) ro.observe(containerRef.current);
    
    return () => {
      clearTimeout(timeout);
      ro.disconnect();
    };
  }, [activeIndex]);

  return (
    <nav ref={containerRef} className="relative flex items-center">
      <div 
        className="absolute inset-y-0 bg-zinc-100 rounded-full transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-[0_0_15px_rgba(255,255,255,0.2)]"
        style={{ left: `${pillStyle.left}px`, width: `${pillStyle.width}px`, opacity: pillStyle.opacity }}
      />
      <ul className="relative flex items-center list-none m-0 p-0 z-10 gap-1 lg:gap-2">
        {items.map((item, index) => (
          <li key={index}>
            <Link 
              href={item.href}
              onClick={() => setActiveIndex(index)}
              className={`px-5 py-2 block text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap transition-colors duration-300 ${
                activeIndex === index ? 'text-zinc-950' : 'text-zinc-400 hover:text-zinc-100'
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default GooeyNav;