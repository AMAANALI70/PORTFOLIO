import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 192;

interface HeroSequenceCanvasProps {
  onScrollProgress?: (progress: number) => void;
}

export const HeroSequenceCanvas: React.FC<HeroSequenceCanvasProps> = ({ onScrollProgress }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const currentFrameRef = useRef<number>(0);
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [activeCallout, setActiveCallout] = useState<number | null>(null);

  // Preload frames progressively
  useEffect(() => {
    imagesRef.current = new Array(TOTAL_FRAMES).fill(null);
    let loadedCounter = 0;

    // Phase 1: Load first 25 frames immediately for rapid start
    const priorityFrames = Math.min(30, TOTAL_FRAMES);

    const loadFrame = (index: number) => {
      const img = new Image();
      const frameNum = String(index + 1).padStart(3, '0');
      img.src = `/frames/ezgif-frame-${frameNum}.jpg`;

      img.onload = () => {
        imagesRef.current[index] = img;
        loadedCounter++;
        setLoadedCount(loadedCounter);

        // Draw initial frame as soon as frame 0 loads
        if (index === 0 && canvasRef.current) {
          renderFrame(0);
        }
      };

      img.onerror = () => {
        loadedCounter++;
        setLoadedCount(loadedCounter);
      };
    };

    // Load initial batch
    for (let i = 0; i < priorityFrames; i++) {
      loadFrame(i);
    }

    // Phase 2: Stream remaining frames slightly delayed
    const timeout = setTimeout(() => {
      for (let i = priorityFrames; i < TOTAL_FRAMES; i++) {
        loadFrame(i);
      }
    }, 150);

    return () => clearTimeout(timeout);
  }, []);

  // Render a specific frame index to Canvas with Retina DPI & Contain/Cover logic
  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIndex] || imagesRef.current[0];
    if (!img || !img.complete) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.parentElement?.clientWidth || window.innerWidth;
    const height = canvas.parentElement?.clientHeight || window.innerHeight;

    // Set canvas dimensions according to DPR
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    // Calculate aspect ratio cover/contain fit
    const imgRatio = img.width / img.height;
    const canvasRatio = width / height;

    let drawWidth = width;
    let drawHeight = height;
    let offsetX = 0;
    let offsetY = 0;

    // Preserve full character image height and center horizontally
    if (canvasRatio > imgRatio) {
      drawHeight = height;
      drawWidth = height * imgRatio;
      offsetX = (width - drawWidth) / 2;
    } else {
      drawWidth = width;
      drawHeight = width / imgRatio;
      offsetY = (height - drawHeight) / 2;
    }

    // Render image with smooth quality
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

    // Render Dark Vignette & Rim Shadow Overlay
    const vignette = ctx.createRadialGradient(
      width / 2,
      height / 2,
      Math.min(width, height) * 0.3,
      width / 2,
      height / 2,
      Math.max(width, height) * 0.75
    );
    vignette.addColorStop(0, 'rgba(5, 5, 5, 0)');
    vignette.addColorStop(0.7, 'rgba(5, 5, 5, 0.4)');
    vignette.addColorStop(1, 'rgba(5, 5, 5, 0.95)');

    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, width, height);

    // Add subtle procedural noise grain or HUD ticks
    ctx.fillStyle = 'rgba(212, 175, 55, 0.03)';
    ctx.fillRect(0, 0, width, height);
  }, []);

  // GSAP ScrollTrigger Pinned Sequence Control
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const frameObj = { frame: 0 };

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: '+=350%', // Extended scroll length for smooth scrollytelling
      pin: true,
      scrub: 0.4, // Silky interpolation
      onUpdate: (self) => {
        const progress = self.progress;
        const targetFrame = Math.min(
          Math.floor(progress * (TOTAL_FRAMES - 1)),
          TOTAL_FRAMES - 1
        );

        if (targetFrame !== currentFrameRef.current) {
          currentFrameRef.current = targetFrame;
          renderFrame(targetFrame);
        }

        if (onScrollProgress) {
          onScrollProgress(progress);
        }

        // Set callout triggers based on scroll decomposition progress
        if (progress > 0.25 && progress < 0.45) {
          setActiveCallout(1);
        } else if (progress >= 0.45 && progress < 0.65) {
          setActiveCallout(2);
        } else if (progress >= 0.65 && progress < 0.85) {
          setActiveCallout(3);
        } else {
          setActiveCallout(null);
        }
      },
    });

    // Resize handler
    const handleResize = () => {
      renderFrame(currentFrameRef.current);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      trigger.kill();
      window.removeEventListener('resize', handleResize);
    };
  }, [renderFrame, onScrollProgress]);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#050505] overflow-hidden">
      {/* HTML5 Canvas Element */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full object-center pointer-events-none"
      />

      {/* Blueprint Grid & Tactical Crosshair Overlay */}
      <div className="absolute inset-0 bg-grid-blueprint opacity-20 pointer-events-none" />

      {/* HUD Reticle Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[85vw] max-w-5xl h-[75vh] border border-[#F5F5F2]/10 relative">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37]/60" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37]/60" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37]/60" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37]/60" />

          {/* Technical Axis Labels */}
          <div className="absolute -top-6 left-0 font-mono text-[9px] text-[#F5F5F2]/40 tracking-widest">
            X-AXIS // ARCHIVIST_CANVAS_RENDERER
          </div>
          <div className="absolute -bottom-6 right-0 font-mono text-[9px] text-[#F5F5F2]/40 tracking-widest">
            FRAME: {String(currentFrameRef.current + 1).padStart(3, '0')} / {TOTAL_FRAMES}
          </div>
        </div>
      </div>

      {/* Deconstructed Blueprint Callouts (Fade in during decomposition) */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {/* Callout 1: Journal */}
        <div className={`absolute top-[28%] left-[12%] lg:left-[18%] transition-all duration-500 transform ${
          activeCallout === 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="bg-[#0A0A0A]/90 border border-[#D4AF37]/40 p-4 rounded backdrop-blur-md max-w-xs space-y-1">
            <div className="flex items-center space-x-2 text-[#D4AF37] font-mono text-[10px] tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping" />
              <span>[ITEM 01: ARCHIVAL JOURNAL]</span>
            </div>
            <p className="text-xs text-[#F5F5F2]/90 font-mono">
              Contains handwritten equations, system diagrams, and research observations.
            </p>
          </div>
        </div>

        {/* Callout 2: Blade & Straps */}
        <div className={`absolute top-[52%] right-[10%] lg:right-[16%] transition-all duration-500 transform ${
          activeCallout === 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="bg-[#0A0A0A]/90 border border-[#D4AF37]/40 p-4 rounded backdrop-blur-md max-w-xs space-y-1">
            <div className="flex items-center space-x-2 text-[#D4AF37] font-mono text-[10px] tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping" />
              <span>[ITEM 02: BLACK STEEL BLADE]</span>
            </div>
            <p className="text-xs text-[#F5F5F2]/90 font-mono">
              Symbol of precision engineering and systemic breaking of structures.
            </p>
          </div>
        </div>

        {/* Callout 3: Tactical Coat */}
        <div className={`absolute bottom-[20%] left-[15%] lg:left-[22%] transition-all duration-500 transform ${
          activeCallout === 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="bg-[#0A0A0A]/90 border border-[#D4AF37]/40 p-4 rounded backdrop-blur-md max-w-xs space-y-1">
            <div className="flex items-center space-x-2 text-[#D4AF37] font-mono text-[10px] tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping" />
              <span>[ITEM 03: RESONANCE COAT]</span>
            </div>
            <p className="text-xs text-[#F5F5F2]/90 font-mono">
              Asymmetric black and ivory silhouette bridging dark technology and research.
            </p>
          </div>
        </div>
      </div>

      {/* Floating Ambient Ink & Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#C5A059]/5 rounded-full blur-3xl animate-pulse-slow" />
      </div>
    </div>
  );
};
