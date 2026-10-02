import React from 'react';
import { ArrowDown } from 'lucide-react';

interface World01IdentityProps {
  scrollProgress: number;
  onExploreClick: () => void;
}

export const World01Identity: React.FC<World01IdentityProps> = ({ scrollProgress, onExploreClick }) => {
  // Fade out slightly as scroll progresses into decomposition
  const opacity = Math.max(1 - scrollProgress * 2.5, 0);

  if (opacity <= 0.01) return null;

  return (
    <div 
      className="fixed inset-0 z-20 pointer-events-none flex flex-col justify-between p-8 md:p-16 text-[#F5F5F2]"
      style={{ opacity }}
    >
      {/* Top Left Metadata Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="font-mono text-[10px] text-[#D4AF37] tracking-[0.3em] uppercase">
            ARCHIVIST SYSTEM // IDENT: 01
          </div>
          <div className="font-mono text-xs text-[#F5F5F2]/40 tracking-wider">
            TOKYO / GLOBAL ARCHIVE
          </div>
        </div>

        <div className="text-right font-mono text-[10px] text-[#F5F5F2]/40 space-y-0.5 hidden sm:block">
          <div>LATENT STATE: ACTIVE</div>
          <div>CREATIVE DIRECTION: AWWWARDS / CINEMATIC</div>
        </div>
      </div>

      {/* Main Hero Editorial Typography */}
      <div className="max-w-4xl mx-auto text-center space-y-6 my-auto">
        {/* Subtle Line Accent */}
        <div className="w-12 h-[1px] bg-[#D4AF37] mx-auto opacity-70" />

        <h1 className="font-cinzel text-5xl md:text-8xl font-extrabold tracking-[0.2em] text-white uppercase leading-none drop-shadow-2xl">
          ERIC
        </h1>

        <div className="font-syne text-xl md:text-3xl tracking-[0.4em] text-[#D4AF37] font-semibold uppercase">
          THE ARCHIVIST
        </div>

        <p className="font-cormorant italic text-2xl md:text-3xl text-[#F5F5F2]/80 max-w-2xl mx-auto leading-relaxed pt-2">
          &ldquo;Everything is a system. I just need to understand its rules.&rdquo;
        </p>

        <p className="font-inter text-xs md:text-sm text-[#F5F5F2]/60 max-w-lg mx-auto tracking-wide leading-relaxed font-light">
          A solitary warrior-engineer existing between creation and destruction. Collecting knowledge, building tools, dissecting complex architectures, and reconstructing them into something new.
        </p>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="flex flex-col items-center justify-center space-y-3 pointer-events-auto">
        <button
          onClick={onExploreClick}
          className="group flex flex-col items-center space-y-2 focus:outline-none cursor-pointer"
        >
          <span className="font-mono text-[10px] text-[#D4AF37] tracking-[0.3em] uppercase transition-colors group-hover:text-white">
            SCROLL TO DECOMPOSE SYSTEM
          </span>
          <div className="w-6 h-10 border border-[#F5F5F2]/20 rounded-full flex items-start justify-center p-1 group-hover:border-[#D4AF37]/50 transition-colors">
            <div className="w-1 h-2 bg-[#D4AF37] rounded-full animate-bounce mt-1" />
          </div>
        </button>
      </div>
    </div>
  );
};
