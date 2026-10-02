import React, { useState } from 'react';
import { JOURNAL_ENTRIES } from '../data/portfolioData';
import { soundManager } from '../utils/audioSystem';
import { BookMarked, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export const World06Journal: React.FC = () => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const entry = JOURNAL_ENTRIES[currentPageIndex];

  const handleNext = () => {
    if (currentPageIndex < JOURNAL_ENTRIES.length - 1) {
      soundManager.playPaperRustle();
      setCurrentPageIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPageIndex > 0) {
      soundManager.playPaperRustle();
      setCurrentPageIndex((prev) => prev - 1);
    }
  };

  return (
    <section id="journal" className="relative min-h-screen bg-paper-texture text-[#121212] py-32 px-6 md:px-16 border-t border-[#121212]/10 world-transition">
      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#121212]/20 pb-8 gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-[#0D0D0E] font-mono text-xs tracking-[0.3em] uppercase">
              <BookMarked className="w-4 h-4 text-amber-900" />
              <span>WORLD 06 // THE ARCHIVIST &apos;S JOURNAL</span>
            </div>
            <h2 className="font-cormorant text-4xl md:text-6xl font-bold tracking-tight text-[#121212]">
              PERSONAL JOURNAL
            </h2>
          </div>

          <div className="font-mono text-xs text-[#121212]/60">
            PAGE {entry.pageNumber} OF {JOURNAL_ENTRIES.length}
          </div>
        </div>

        {/* Physical Digital Notebook Spread */}
        <div className="bg-[#EAE5D9] border-2 border-[#121212]/20 rounded-2xl p-8 md:p-16 shadow-2xl relative space-y-8 min-h-[500px] flex flex-col justify-between">
          {/* Notebook Binder Rings (Visual Accent) */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-full border-r-2 border-l-2 border-dashed border-[#121212]/15 hidden md:block" />

          {/* Top Page Metadata */}
          <div className="flex items-center justify-between border-b border-[#121212]/15 pb-4">
            <span className="font-mono text-xs text-amber-950 font-bold uppercase tracking-wider">
              JOURNAL ENTRY // {entry.date}
            </span>
            <div className="flex gap-2">
              {entry.tags.map((tag, idx) => (
                <span key={idx} className="font-mono text-[10px] bg-[#F4F1EA] px-2 py-1 rounded border border-[#121212]/10">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Page Content */}
          <div className="space-y-6 max-w-3xl mx-auto py-4">
            <h3 className="font-cormorant text-3xl md:text-4xl font-bold text-[#121212]">
              {entry.title}
            </h3>

            <div className="space-y-4 font-inter text-sm md:text-base text-[#121212]/85 leading-relaxed font-light">
              {entry.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* LaTeX Equation callout if present */}
            {entry.equation && (
              <div className="bg-[#F4F1EA] p-4 rounded-xl border border-[#121212]/15 font-mono text-sm text-center text-[#121212] font-serif italic my-4">
                {entry.equation}
              </div>
            )}

            {/* Quote Block */}
            {entry.quote && (
              <div className="bg-[#F4F1EA] p-6 rounded-xl border-l-4 border-amber-900 font-cormorant italic text-xl text-[#121212] space-y-2">
                <Quote className="w-5 h-5 text-amber-900 opacity-60" />
                <p>{entry.quote}</p>
              </div>
            )}
          </div>

          {/* Bottom Notebook Page Turner Controls */}
          <div className="flex items-center justify-between border-t border-[#121212]/15 pt-6">
            <button
              onClick={handlePrev}
              disabled={currentPageIndex === 0}
              className={`px-5 py-2.5 rounded-full font-mono text-xs flex items-center space-x-2 transition-all cursor-pointer ${
                currentPageIndex === 0
                  ? 'opacity-30 cursor-not-allowed bg-[#F4F1EA]'
                  : 'bg-[#121212] text-[#F4F1EA] hover:bg-amber-950'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>PREVIOUS PAGE</span>
            </button>

            <span className="font-mono text-xs text-[#121212]/60 hidden sm:inline">
              TURN PAGE TO READ MORE
            </span>

            <button
              onClick={handleNext}
              disabled={currentPageIndex === JOURNAL_ENTRIES.length - 1}
              className={`px-5 py-2.5 rounded-full font-mono text-xs flex items-center space-x-2 transition-all cursor-pointer ${
                currentPageIndex === JOURNAL_ENTRIES.length - 1
                  ? 'opacity-30 cursor-not-allowed bg-[#F4F1EA]'
                  : 'bg-[#121212] text-[#F4F1EA] hover:bg-amber-950'
              }`}
            >
              <span>NEXT PAGE</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
