import React, { useEffect, useState } from 'react';

interface LoadingSequenceProps {
  onComplete: () => void;
  onProgress?: (progress: number) => void;
}

export const LoadingSequence: React.FC<LoadingSequenceProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INIT SYSTEM KERNEL...');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // 1. Preload key hero frames (first 25 frames for immediate playback, rest stream after)
    const keyFramesToPreload = 25;
    let loadedCount = 0;

    const updateProgress = () => {
      loadedCount++;
      const currentPct = Math.min(Math.round((loadedCount / keyFramesToPreload) * 100), 100);
      setProgress(currentPct);

      if (currentPct < 30) {
        setStatusText('INITIALIZING ARCHIVAL SYSTEM...');
      } else if (currentPct < 70) {
        setStatusText('PRELOADING CANVAS HERO FRAMES...');
      } else if (currentPct < 100) {
        setStatusText('CALIBRATING RESONANCE MATRIX...');
      } else {
        setStatusText('SYSTEM READY.');
      }

      if (loadedCount >= keyFramesToPreload) {
        setTimeout(() => {
          setIsDone(true);
          setTimeout(() => {
            onComplete();
          }, 600);
        }, 400);
      }
    };

    for (let i = 1; i <= keyFramesToPreload; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, '0');
      img.src = `/frames/ezgif-frame-${frameNum}.jpg`;
      img.onload = updateProgress;
      img.onerror = updateProgress;
    }
  }, [onComplete]);

  if (isDone) {
    return (
      <div className="fixed inset-0 z-50 bg-[#050505] transition-opacity duration-700 opacity-0 pointer-events-none flex items-center justify-center">
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center p-6 select-none overflow-hidden">
      {/* Background Subtle Blueprint Grid */}
      <div className="absolute inset-0 bg-grid-blueprint opacity-20" />
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      {/* Central Geometric Icon Animation */}
      <div className="relative w-48 h-48 flex items-center justify-center mb-10">
        {/* Outer Pulsing HUD Rings */}
        <div className="absolute inset-0 rounded-full border border-[#D4AF37]/30 animate-pulse-slow" />
        <div className="absolute inset-3 rounded-full border border-dashed border-[#F5F5F2]/20 animate-[spin_20s_linear_infinite]" />
        
        {/* SVG Drawing Emblem */}
        <svg viewBox="0 0 100 100" className="w-28 h-28 text-[#D4AF37] relative z-10">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
          <polygon 
            points="50,15 82,75 18,75" 
            fill="none" 
            stroke="#F5F5F2" 
            strokeWidth="1.5" 
            className="animate-draw"
          />
          <circle cx="50" cy="50" r="6" fill="#D4AF37" className="animate-pulse" />
          {/* Amber glowing center eye */}
          <circle cx="50" cy="50" r="14" fill="none" stroke="#D4AF37" strokeWidth="0.8" opacity="0.8" />
        </svg>

        {/* HUD Corner Ticks */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#D4AF37]" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#D4AF37]" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#D4AF37]" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#D4AF37]" />
      </div>

      {/* Main Title Typography */}
      <div className="text-center z-10 space-y-2">
        <h1 className="font-cinzel text-2xl tracking-[0.3em] text-[#F5F5F2] font-semibold">
          ERIC <span className="text-[#D4AF37]">//</span> ARCHIVIST
        </h1>
        <p className="font-mono text-xs text-[#F5F5F2]/50 tracking-widest uppercase">
          SYSTEM IDENTIFICATION ARCHIVE
        </p>
      </div>

      {/* Progress Bar & Status Text */}
      <div className="w-64 mt-8 space-y-3 z-10">
        <div className="h-[2px] w-full bg-[#111] relative overflow-hidden rounded-full">
          <div 
            className="h-full bg-gradient-to-r from-[#C5A059] to-[#D4AF37] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between items-center font-mono text-[10px] text-[#F5F5F2]/40 tracking-wider">
          <span>{statusText}</span>
          <span className="text-[#D4AF37] font-semibold">{progress}%</span>
        </div>
      </div>

      {/* Floating System Coordinates */}
      <div className="absolute bottom-8 left-8 font-mono text-[10px] text-[#F5F5F2]/30 space-y-1 hidden sm:block">
        <div>SYS.LAT: 35.6762° N</div>
        <div>SYS.LON: 139.6503° E</div>
        <div>RENDER_MODE: CANVAS_2D_SEQUENCE</div>
      </div>

      <div className="absolute bottom-8 right-8 font-mono text-[10px] text-[#F5F5F2]/30 text-right hidden sm:block">
        <div>FRAME_BUFFER: 192_ASSETS</div>
        <div>BUILD: 2026.4.0</div>
        <div>STATUS: DECOMPOSING...</div>
      </div>
    </div>
  );
};
