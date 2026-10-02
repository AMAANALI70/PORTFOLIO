import React, { useState } from 'react';
import { PROJECTS_DATA, Project } from '../data/portfolioData';
import { soundManager } from '../utils/audioSystem';
import { Code2, ArrowUpRight, Cpu, Layers, Terminal, X } from 'lucide-react';

interface World03WorkProps {
  onSelectProject?: (project: Project) => void;
}

export const World03Work: React.FC<World03WorkProps> = () => {
  const [activeProject, setActiveProject] = useState<Project>(PROJECTS_DATA[0]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleProjectClick = (proj: Project) => {
    soundManager.playResonancePulse();
    setActiveProject(proj);
  };

  const openCodeDrawer = (proj: Project) => {
    soundManager.playTick(1200);
    setActiveProject(proj);
    setDrawerOpen(true);
  };

  return (
    <section id="work" className="relative min-h-screen bg-[#050505] text-[#F5F5F2] py-32 px-6 md:px-16 overflow-hidden">
      {/* Background Blueprint Grid */}
      <div className="absolute inset-0 bg-grid-blueprint opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#F5F5F2]/10 pb-8 gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-[#D4AF37] font-mono text-xs tracking-[0.3em] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
              <span>WORLD 03 // ARCHITECTURAL SYSTEM WORK</span>
            </div>
            <h2 className="font-cinzel text-4xl md:text-6xl font-extrabold tracking-wider text-white">
              PROJECT ARTIFACTS
            </h2>
          </div>

          <p className="font-inter text-xs md:text-sm text-[#F5F5F2]/50 max-w-md font-light leading-relaxed">
            Every project is built from scratch as an architectural inquiry. Designed for raw performance, mathematical precision, and high aesthetic standards.
          </p>
        </div>

        {/* Project Selector Navigation Bar (Cinematic Tabs) */}
        <div className="flex flex-wrap gap-3 border-b border-[#F5F5F2]/10 pb-4">
          {PROJECTS_DATA.map((proj) => {
            const isSelected = activeProject.id === proj.id;
            return (
              <button
                key={proj.id}
                onClick={() => handleProjectClick(proj)}
                className={`px-5 py-3 rounded-full font-mono text-xs tracking-wider transition-all duration-300 flex items-center space-x-3 cursor-pointer ${
                  isSelected
                    ? 'bg-[#D4AF37] text-[#050505] font-bold shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                    : 'bg-[#0A0A0A] text-[#F5F5F2]/60 hover:text-white border border-[#F5F5F2]/10 hover:border-[#D4AF37]/50'
                }`}
              >
                <span className="opacity-60">{proj.number}</span>
                <span>{proj.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Project Full-Width Editorial Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start bg-[#0A0A0A] border border-[#F5F5F2]/10 p-8 md:p-14 rounded-2xl relative overflow-hidden shadow-2xl">
          {/* Accent Gold Corner Lines */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37]" />

          {/* Left Column: Title, Metadata, Summary */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <div className="flex items-center space-x-4 font-mono text-xs text-[#D4AF37]">
                <span>ARTIFACT {activeProject.number}</span>
                <span>//</span>
                <span>{activeProject.category}</span>
                <span>//</span>
                <span>{activeProject.year}</span>
              </div>

              <h3 className="font-cinzel text-3xl md:text-5xl font-extrabold text-white tracking-wide leading-tight">
                {activeProject.title}
              </h3>

              <p className="font-syne text-lg text-[#D4AF37] font-medium">
                {activeProject.subtitle}
              </p>
            </div>

            <p className="font-inter text-sm md:text-base text-[#F5F5F2]/80 leading-relaxed font-light">
              {activeProject.summary}
            </p>

            {/* Problem / System / Result Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#F5F5F2]/10">
              <div className="space-y-1">
                <div className="font-mono text-[10px] text-[#D4AF37] tracking-widest uppercase">
                  [01. THE PROBLEM]
                </div>
                <p className="font-inter text-xs text-[#F5F5F2]/70 leading-relaxed">
                  {activeProject.problem}
                </p>
              </div>

              <div className="space-y-1">
                <div className="font-mono text-[10px] text-[#D4AF37] tracking-widest uppercase">
                  [02. THE SYSTEM]
                </div>
                <p className="font-inter text-xs text-[#F5F5F2]/70 leading-relaxed">
                  {activeProject.system}
                </p>
              </div>

              <div className="space-y-1">
                <div className="font-mono text-[10px] text-[#D4AF37] tracking-widest uppercase">
                  [03. THE RESULT]
                </div>
                <p className="font-inter text-xs text-[#F5F5F2]/70 leading-relaxed">
                  {activeProject.result}
                </p>
              </div>
            </div>

            {/* Tech Stack Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {activeProject.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-[#111] border border-[#F5F5F2]/10 rounded font-mono text-[11px] text-[#F5F5F2]/70"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => openCodeDrawer(activeProject)}
                className="px-6 py-3 bg-[#D4AF37] hover:bg-[#C5A059] text-[#050505] font-mono text-xs font-bold tracking-wider rounded-lg transition-all duration-300 flex items-center space-x-2 cursor-pointer shadow-lg"
              >
                <Code2 className="w-4 h-4" />
                <span>INSPECT CODE & ARCHITECTURE</span>
              </button>

              {activeProject.githubUrl && (
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 bg-[#111] hover:bg-[#1a1a1a] border border-[#F5F5F2]/20 hover:border-[#D4AF37] text-white font-mono text-xs tracking-wider rounded-lg transition-all duration-300 flex items-center space-x-2"
                >
                  <span>GITHUB REPO</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Performance Metrics & Visual Blueprint Container */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#050505] border border-[#F5F5F2]/10 p-6 rounded-xl space-y-4 relative">
              <div className="flex items-center justify-between border-b border-[#F5F5F2]/10 pb-3">
                <span className="font-mono text-[10px] text-[#D4AF37] tracking-widest uppercase flex items-center space-x-2">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>PERFORMANCE BENCHMARKS</span>
                </span>
                <span className="font-mono text-[9px] text-[#F5F5F2]/40">VERIFIED</span>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {activeProject.metrics.map((metric, idx) => (
                  <div key={idx} className="space-y-1 text-center p-3 bg-[#0A0A0A] rounded border border-[#F5F5F2]/5">
                    <div className="font-cinzel text-xl md:text-2xl font-bold text-[#D4AF37]">
                      {metric.value}
                    </div>
                    <div className="font-mono text-[9px] text-[#F5F5F2]/50 tracking-wider">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture Flow Card */}
            <div className="bg-[#050505] border border-[#F5F5F2]/10 p-6 rounded-xl space-y-3">
              <div className="font-mono text-[10px] text-[#D4AF37] tracking-widest uppercase flex items-center space-x-2">
                <Layers className="w-3.5 h-3.5" />
                <span>PIPELINE LAYERS</span>
              </div>

              <div className="space-y-2">
                {activeProject.architecture.map((layer, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 bg-[#0A0A0A] border border-[#F5F5F2]/5 rounded font-mono text-xs"
                  >
                    <span className="text-[#F5F5F2]/70">L0{idx + 1} // {layer}</span>
                    <span className="text-[#D4AF37] text-[10px]">OK</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Code Inspector & Blueprint Drawer Modal */}
      {drawerOpen && activeProject && (
        <div className="fixed inset-0 z-50 bg-[#050505]/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 animate-fade-in">
          <div className="bg-[#0A0A0A] border border-[#D4AF37]/50 rounded-2xl w-full max-w-4xl max-h-[85vh] overflow-y-auto p-6 md:p-10 space-y-6 relative shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setDrawerOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-[#111] hover:bg-[#222] border border-[#F5F5F2]/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Drawer Header */}
            <div className="space-y-2 border-b border-[#F5F5F2]/10 pb-4">
              <div className="flex items-center space-x-2 font-mono text-xs text-[#D4AF37]">
                <Terminal className="w-4 h-4" />
                <span>SYSTEM BLUEPRINT CODE INSPECTOR // {activeProject.title}</span>
              </div>
              <h3 className="font-cinzel text-2xl font-bold text-white">
                {activeProject.title} Implementation Details
              </h3>
            </div>

            {/* Code Block Display */}
            {activeProject.codeSnippet && (
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono text-xs text-[#F5F5F2]/50">
                  <span>SOURCE FILE IMPLEMENTATION</span>
                  <span>TYPESCRIPT / RUST</span>
                </div>
                <pre className="bg-[#050505] p-5 rounded-xl border border-[#F5F5F2]/10 font-mono text-xs text-[#D4AF37] overflow-x-auto leading-relaxed">
                  <code>{activeProject.codeSnippet}</code>
                </pre>
              </div>
            )}

            {/* System Breakdown */}
            <div className="bg-[#050505] p-5 rounded-xl border border-[#F5F5F2]/10 space-y-3">
              <h4 className="font-mono text-xs text-[#D4AF37] tracking-wider uppercase">
                ENGINEERING RATIONALE
              </h4>
              <p className="font-inter text-xs text-[#F5F5F2]/80 leading-relaxed font-light">
                {activeProject.system} Built to operate directly with client-side WebGL, canvas image sequences, and zero third-party framework bloat.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
