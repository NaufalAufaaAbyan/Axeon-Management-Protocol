"use client";
import React, { useRef, useEffect, useState } from "react";

interface Spark { x: number; y: number; angle: number; velocity: number; friction: number; color: string; alpha: number; decay: number; size: number; }

export default function ClickSpark({
  sparkColor = "#71717a", // Pakai abu-abu yang lebih kontras
  sparkSize = 4,         // Gedein dikit ukurannya
  sparkCount = 12,       // Tambah jumlah percikannya
  children,
}: {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number; 
  sparkCount?: number;
  children: React.ReactNode;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      sparksRef.current.forEach((spark, index) => {
        spark.x += Math.cos(spark.angle) * spark.velocity;
        spark.y += Math.sin(spark.angle) * spark.velocity;
        spark.velocity *= spark.friction;
        spark.alpha -= spark.decay;

        if (spark.alpha <= 0) {
          sparksRef.current.splice(index, 1);
        } else {
          ctx.globalAlpha = spark.alpha;
          ctx.fillStyle = spark.color;
          ctx.beginPath();
          ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mounted]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mounted) return;
    for (let i = 0; i < sparkCount; i++) {
      sparksRef.current.push({
        x: e.clientX,
        y: e.clientY,
        angle: Math.random() * Math.PI * 2,
        velocity: 2 + Math.random() * 3, // Velocity dibikin lebih nyebar
        friction: 0.95,
        color: sparkColor,
        alpha: 1,
        decay: 0.015 + Math.random() * 0.02,
        size: sparkSize,
      });
    }
  };

  return (
    <div onClick={handleClick} className="relative min-h-screen w-full">
      {mounted && (
        // FIX: Jadikan FIXED biar menutupi seluruh layar dan gak gepeng
        <canvas 
          ref={canvasRef} 
          className="pointer-events-none fixed top-0 left-0 z-50 w-screen h-screen" 
        />
      )}
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}