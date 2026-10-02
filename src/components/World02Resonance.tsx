import React, { useState } from 'react';
import { soundManager } from '../utils/audioSystem';
import { Network, Cpu, FileCode2, Orbit, Zap } from 'lucide-react';

interface World02ResonanceProps {
  scrollProgress: number;
}

interface ResonanceNode {
  id: string;
  fromLabel: string;
  toLabel: string;
  equation: string;
  description: string;
  icon: React.ReactNode;
  coords: { x: number; y: number };
}

const RESONANCE_NODES: ResonanceNode[] = [
  {
    id: 'eq-geom',
    fromLabel: 'MATHEMATICAL EQUATIONS',
    toLabel: 'CANVAS GEOMETRY',
    equation: 'e^{i\\pi} + 1 = 0 \\quad \\Longrightarrow \\quad \\mathbf{r}(\\theta) = \\sin(n\\theta)',
    description: 'Transforming abstract differential equations into 60fps WebGL GPU particle fields.',
    icon: <Orbit className="w-4 h-4 text-[#D4AF37]" />,
    coords: { x: 22, y: 35 }
  },
  {
    id: 'sk-mach',
    fromLabel: 'PAPER SKETCHES',
    toLabel: 'REACTIVE MACHINES',
    equation: '\\oint_{\\partial \\Omega} \\mathbf{F} \\cdot d\\mathbf{r} = \\iint_{\\Omega} (\\nabla \\times \\mathbf{F}) \\cdot d\\mathbf{A}',
    description: 'Translating ink journal diagrams into deterministic TypeScript physics engines.',
    icon: <FileCode2 className="w-4 h-4 text-[#D4AF37]" />,
    coords: { x: 75, y: 30 }
  },
  {
    id: 'cd-arch',
    fromLabel: 'RUST & CODE',
    toLabel: 'DISTRIBUTED ARCHITECTURE',
    equation: '\\mathcal{O}(\\log N) \\quad \\text{Vector Graph Indexing}',
    description: 'Structuring raw algorithms into high-throughput neural graph query servers.',
    icon: <Cpu className="w-4 h-4 text-[#D4AF37]" />,
    coords: { x: 30, y: 72 }
  },
  {
    id: 'ex-idea',
    fromLabel: 'FAILED EXPERIMENTS',
    toLabel: 'RESONANT IDEAS',
    equation: 'S_{gen} = \\Delta S_{system} + \\Delta S_{surroundings} \\ge 0',
    description: 'Every broken build and rejected prototype yields the blueprint for future breakthroughs.',
    icon: <Zap className="w-4 h-4 text-[#D4AF37]" />,
    coords: { x: 78, y: 68 }
  }
];

export const World02Resonance: React.FC<World02ResonanceProps> = ({ scrollProgress }) => {
  const [selectedNode, setSelectedNode] = useState<ResonanceNode | null>(RESONANCE_NODES[0]);

  // Active during decomposition phase (progress between 0.3 and 0.8)
  const isVisible = scrollProgress > 0.25 && scrollProgress < 0.75;
  const opacity = isVisible ? Math.min((scrollProgress - 0.25) * 4, 1, (0.75 - scrollProgress) * 4) : 0;

  if (opacity <= 0.02) return null;

  return (
    <div 
      className="fixed inset-0 z-20 pointer-events-none flex flex-col justify-between p-6 md:p-12 text-[#F5F5F2]"
      style={{ opacity }}
    >
      {/* Top Section Header */}
      <div className="max-w-7xl mx-auto w-full flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-[#D4AF37] font-mono text-[10px] tracking-[0.3em] uppercase">
            <Network className="w-3.5 h-3.5" />
            <span>WORLD 02 // SYSTEM RESONANCE</span>
          </div>
          <h2 className="font-cinzel text-3xl md:text-5xl font-bold tracking-wider text-white">
            RESONANCE
          </h2>
        </div>

        <div className="hidden md:block text-right max-w-xs font-cormorant italic text-lg text-[#F5F5F2]/70">
          &ldquo;Everything is connected. The interesting part is finding where.&rdquo;
        </div>
      </div>

      {/* Center Interactive Node Grid */}
      <div className="relative w-full max-w-6xl mx-auto h-[60vh] my-auto pointer-events-auto">
        {/* SVG Connecting Vector Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-[#D4AF37]/25 stroke-[1] stroke-dasharray-[4]">
          <line x1="22%" y1="35%" x2="75%" y2="30%" />
          <line x1="75%" y1="30%" x2="78%" y2="68%" />
          <line x1="78%" y1="68%" x2="30%" y2="72%" />
          <line x1="30%" y1="72%" x2="22%" y2="35%" />
          <line x1="22%" y1="35%" x2="78%" y2="68%" />
        </svg>

        {/* Nodes */}
        {RESONANCE_NODES.map((node) => {
          const isSelected = selectedNode?.id === node.id;
          return (
            <div
              key={node.id}
              style={{ left: `${node.coords.x}%`, top: `${node.coords.y}%` }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
            >
              <button
                onClick={() => {
                  soundManager.playResonancePulse();
                  setSelectedNode(node);
                }}
                className={`group relative flex items-center space-x-3 px-4 py-2.5 rounded-full border transition-all duration-500 focus:outline-none ${
                  isSelected
                    ? 'bg-[#0A0A0A] border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.25)] scale-110'
                    : 'bg-[#050505]/90 border-[#F5F5F2]/20 hover:border-[#D4AF37]/60 hover:scale-105'
                }`}
              >
                <div className={`p-1.5 rounded-full ${isSelected ? 'bg-[#D4AF37]/20' : 'bg-[#111]'}`}>
                  {node.icon}
                </div>
                <div className="text-left font-mono text-xs">
                  <div className="text-[#F5F5F2] font-semibold tracking-wider flex items-center space-x-1">
                    <span>{node.fromLabel}</span>
                    <span className="text-[#D4AF37]">→</span>
                    <span className="text-[#D4AF37]">{node.toLabel}</span>
                  </div>
                </div>
              </button>
            </div>
          );
        })}

        {/* Node Detail Popup Card */}
        {selectedNode && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-xl bg-[#0A0A0A]/95 border border-[#D4AF37]/50 rounded-lg p-5 backdrop-blur-xl shadow-2xl space-y-3 pointer-events-auto animate-fade-in">
            <div className="flex items-center justify-between border-b border-[#F5F5F2]/10 pb-2">
              <span className="font-mono text-[10px] text-[#D4AF37] tracking-widest uppercase">
                RESONANCE MATRIX // {selectedNode.fromLabel}
              </span>
              <span className="font-mono text-[10px] text-[#F5F5F2]/40">
                STATE: CONNECTED
              </span>
            </div>

            <p className="font-inter text-xs text-[#F5F5F2]/90 leading-relaxed font-light">
              {selectedNode.description}
            </p>

            <div className="bg-[#111] p-3 rounded border border-[#F5F5F2]/10 font-mono text-xs text-[#D4AF37] flex items-center justify-between">
              <span>{selectedNode.equation}</span>
              <span className="text-[9px] text-[#F5F5F2]/40">FORMULA</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Hint */}
      <div className="text-center font-mono text-[10px] text-[#F5F5F2]/40 tracking-widest">
        CLICK NODES TO INTERACT WITH THE ARCHIVIST&apos;S RESONANCE MATRIX
      </div>
    </div>
  );
};
