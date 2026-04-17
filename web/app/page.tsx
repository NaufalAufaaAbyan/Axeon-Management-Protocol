"use client";
import DotField from "../src/components/magic/DotField";
import TextType from "../src/components/magic/TextType";

export default function Home() {
  return (
    <main className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 w-full h-full z-0">
        <DotField
          dotRadius={1.5}
          dotSpacing={14}
          bulgeStrength={67}
          glowRadius={160}
          sparkle={true}
          waveAmplitude={0}
          cursorRadius={500}
          cursorForce={0.1}
          bulgeOnly={true}
          gradientFrom="#A855F7"
          gradientTo="#B497CF"
          glowColor="#120F17"
        />
      </div>

      {/* CENTERED BRAND ONLY */}
      <div className="relative z-10 text-center pointer-events-none">
        <TextType 
          text={["AXEON PROTOCOL"]}
          className="text-white text-5xl md:text-8xl font-black italic tracking-tighter uppercase leading-none"
          typingSpeed={100}
          showCursor={true}
          cursorCharacter="_"
          cursorClassName="text-purple-500"
          loop={true} // Kita bikin sekali ketik aja biar tegas
        />
      </div>

    </main>
  );
}