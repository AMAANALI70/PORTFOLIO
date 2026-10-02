import React, { useState } from 'react';
import { RESEARCH_PAPERS, ResearchPaper } from '../data/portfolioData';
import { soundManager } from '../utils/audioSystem';
import { BookOpen, FileText, Download, X, Hash, Feather } from 'lucide-react';

export const World04Research: React.FC = () => {
  const [selectedPaper, setSelectedPaper] = useState<ResearchPaper | null>(null);

  const handlePaperClick = (paper: ResearchPaper) => {
    soundManager.playPaperRustle();
    setSelectedPaper(paper);
  };

  return (
    <section id="research" className="relative min-h-screen bg-paper-texture text-[#121212] py-32 px-6 md:px-16 world-transition">
      {/* Subtle Paper Grain & Ink Grid */}
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#121212]/20 pb-8 gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-[#0D0D0E] font-mono text-xs tracking-[0.3em] uppercase">
              <Feather className="w-4 h-4 text-amber-900" />
              <span>WORLD 04 // RESEARCH ARCHIVE & ESSAYS</span>
            </div>
            <h2 className="font-cormorant text-4xl md:text-6xl font-bold tracking-tight text-[#121212]">
              THE ARCHIVIST &apos;S RESEARCH
            </h2>
          </div>

          <p className="font-cormorant italic text-lg text-[#121212]/70 max-w-md font-normal leading-relaxed">
            &ldquo;Research is observation turned into structure. Here lie papers on computational topology, web graphics, and visual cognitive load.&rdquo;
          </p>
        </div>

        {/* Research Papers Grid (Physical Academic Journal Artifacts) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {RESEARCH_PAPERS.map((paper) => (
            <div
              key={paper.id}
              onClick={() => handlePaperClick(paper)}
              className="group bg-[#EAE5D9] border border-[#121212]/15 p-8 rounded-xl space-y-6 hover:border-[#121212] transition-all duration-500 hover:-translate-y-1.5 cursor-pointer shadow-sm hover:shadow-xl relative flex flex-col justify-between"
            >
              {/* Top Document Tag */}
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-[10px] text-[#121212]/50 border-b border-[#121212]/10 pb-3">
                  <span>{paper.number}</span>
                  <span>{paper.date}</span>
                </div>

                <h3 className="font-cormorant text-2xl font-bold text-[#121212] group-hover:text-amber-950 transition-colors leading-tight">
                  {paper.title}
                </h3>

                <p className="font-inter text-xs text-[#121212]/75 leading-relaxed font-light line-clamp-3">
                  {paper.abstract}
                </p>
              </div>

              {/* Formula Preview Box */}
              <div className="space-y-4 pt-4 border-t border-[#121212]/10">
                {paper.equations[0] && (
                  <div className="bg-[#F4F1EA] p-3 rounded border border-[#121212]/10 font-mono text-xs text-[#121212] text-center overflow-x-auto font-serif italic">
                    {paper.equations[0].latex}
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-1 font-mono text-[10px] text-[#121212]/60">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>READ RESEARCH</span>
                  </div>

                  <span className="font-mono text-[10px] text-amber-900 font-semibold group-hover:translate-x-1 transition-transform">
                    OPEN ARTIFACT →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Research Paper Interactive Reader Modal */}
      {selectedPaper && (
        <div className="fixed inset-0 z-50 bg-[#121212]/60 backdrop-blur-md flex items-center justify-center p-4 md:p-12 animate-fade-in">
          <div className="bg-[#F4F1EA] border border-[#121212]/30 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 md:p-14 space-y-8 relative shadow-2xl text-[#121212]">
            {/* Close Button */}
            <button
              onClick={() => setSelectedPaper(null)}
              className="absolute top-6 right-6 p-2.5 rounded-full bg-[#EAE5D9] hover:bg-[#121212] hover:text-[#F4F1EA] transition-colors border border-[#121212]/20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Document Header */}
            <div className="space-y-3 border-b border-[#121212]/20 pb-6">
              <div className="flex items-center space-x-3 font-mono text-xs text-amber-950 font-semibold">
                <FileText className="w-4 h-4" />
                <span>OFFICIAL RESEARCH MANUSCRIPT // {selectedPaper.number}</span>
              </div>

              <h2 className="font-cormorant text-3xl md:text-5xl font-bold text-[#121212] leading-tight">
                {selectedPaper.title}
              </h2>

              <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-[#121212]/60 pt-2">
                <span>AUTHOR: {selectedPaper.authors.join(', ')}</span>
                <span>•</span>
                <span>DATE: {selectedPaper.date}</span>
                <span>•</span>
                <span>JOURNAL: {selectedPaper.journal}</span>
              </div>
            </div>

            {/* Abstract */}
            <div className="space-y-2 bg-[#EAE5D9] p-6 rounded-xl border border-[#121212]/10">
              <h4 className="font-mono text-xs font-bold text-amber-950 tracking-wider uppercase">
                ABSTRACT
              </h4>
              <p className="font-inter text-sm text-[#121212]/85 leading-relaxed">
                {selectedPaper.abstract}
              </p>
            </div>

            {/* Core Question & Methodology */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h4 className="font-mono text-xs font-bold text-[#121212] tracking-wider uppercase flex items-center space-x-1">
                  <Hash className="w-3.5 h-3.5 text-amber-900" />
                  <span>CORE RESEARCH QUESTION</span>
                </h4>
                <p className="font-inter text-xs text-[#121212]/80 leading-relaxed font-light">
                  {selectedPaper.question}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-mono text-xs font-bold text-[#121212] tracking-wider uppercase flex items-center space-x-1">
                  <Hash className="w-3.5 h-3.5 text-amber-900" />
                  <span>METHODOLOGY</span>
                </h4>
                <p className="font-inter text-xs text-[#121212]/80 leading-relaxed font-light">
                  {selectedPaper.methodology}
                </p>
              </div>
            </div>

            {/* Mathematical Derivations */}
            <div className="space-y-4">
              <h4 className="font-mono text-xs font-bold text-[#121212] tracking-wider uppercase">
                FORMAL MATHEMATICAL FORMULATIONS
              </h4>

              <div className="space-y-3">
                {selectedPaper.equations.map((eq, idx) => (
                  <div key={idx} className="bg-[#EAE5D9] p-5 rounded-xl border border-[#121212]/15 space-y-2">
                    <div className="font-mono text-xs font-semibold text-amber-950">
                      [{eq.label}]
                    </div>
                    <div className="bg-[#F4F1EA] p-4 rounded border border-[#121212]/10 font-mono text-sm text-center text-[#121212] overflow-x-auto">
                      {eq.latex}
                    </div>
                    <p className="font-inter text-xs text-[#121212]/70 font-light">
                      {eq.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Findings */}
            <div className="space-y-2 pt-2">
              <h4 className="font-mono text-xs font-bold text-[#121212] tracking-wider uppercase">
                EMPIRICAL FINDINGS & CONCLUSION
              </h4>
              <p className="font-inter text-xs text-[#121212]/80 leading-relaxed font-light">
                {selectedPaper.findings}
              </p>
            </div>

            {/* Download Button */}
            <div className="pt-4 border-t border-[#121212]/20 flex justify-end">
              <button
                onClick={() => soundManager.playTick(1600)}
                className="px-6 py-3 bg-[#121212] hover:bg-amber-950 text-[#F4F1EA] font-mono text-xs font-bold tracking-wider rounded-lg transition-colors flex items-center space-x-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD FULL PDF ({selectedPaper.pdfSize})</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
