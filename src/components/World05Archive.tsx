import React, { useState } from 'react';
import { ARCHIVE_ITEMS, ArchiveItem } from '../data/portfolioData';
import { soundManager } from '../utils/audioSystem';
import { Box, Code, Sparkles, X, FileCode } from 'lucide-react';

export const World05Archive: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<ArchiveItem | null>(null);

  const filters = ['all', 'prototype', 'shader', 'sketch', 'experiment', 'note'];

  const filteredItems = activeFilter === 'all'
    ? ARCHIVE_ITEMS
    : ARCHIVE_ITEMS.filter((item) => item.type === activeFilter);

  const handleFilterClick = (f: string) => {
    soundManager.playTick(1200);
    setActiveFilter(f);
  };

  const handleItemClick = (item: ArchiveItem) => {
    soundManager.playPaperRustle();
    setSelectedItem(item);
  };

  return (
    <section id="archive" className="relative min-h-screen bg-paper-texture text-[#121212] py-32 px-6 md:px-16 border-t border-[#121212]/10 world-transition">
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#121212]/20 pb-8 gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-[#0D0D0E] font-mono text-xs tracking-[0.3em] uppercase">
              <Box className="w-4 h-4 text-amber-900" />
              <span>WORLD 05 // DIGITAL CABINET OF CURIOSITIES</span>
            </div>
            <h2 className="font-cormorant text-4xl md:text-6xl font-bold tracking-tight text-[#121212]">
              THE ARCHIVE
            </h2>
          </div>

          <p className="font-inter text-xs md:text-sm text-[#121212]/60 max-w-md font-light leading-relaxed">
            Unfinished experiments, shader prototypes, raw sketches, and architectural notes. The raw debris of creative exploration.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-2 border-b border-[#121212]/10 pb-4">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => handleFilterClick(f)}
              className={`px-4 py-2 rounded-full font-mono text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeFilter === f
                  ? 'bg-[#121212] text-[#F4F1EA] font-semibold'
                  : 'bg-[#EAE5D9] text-[#121212]/70 hover:bg-[#121212]/10'
              }`}
            >
              {f === 'all' ? 'ALL ARTIFACTS' : f}
            </button>
          ))}
        </div>

        {/* Dynamic Spatial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              className="group bg-[#EAE5D9] border border-[#121212]/15 p-6 rounded-xl space-y-4 hover:border-[#121212] transition-all duration-500 hover:-translate-y-1 cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-md"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono text-[10px] text-[#121212]/50 border-b border-[#121212]/10 pb-2">
                  <span className="uppercase text-amber-950 font-semibold">[{item.type}]</span>
                  <span>{item.date}</span>
                </div>

                <h3 className="font-cormorant text-2xl font-bold text-[#121212] group-hover:text-amber-950 transition-colors">
                  {item.title}
                </h3>

                <p className="font-inter text-xs text-[#121212]/75 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>

              {/* Snippet / Thumbnail Box */}
              {item.snippet ? (
                <div className="bg-[#F4F1EA] p-3 rounded border border-[#121212]/10 font-mono text-[11px] text-[#121212] truncate">
                  <code>{item.snippet}</code>
                </div>
              ) : (
                <div className="flex items-center justify-between font-mono text-[10px] text-[#121212]/60 pt-2 border-t border-[#121212]/10">
                  <span>INSPECT ARTIFACT</span>
                  <span>→</span>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>

      {/* Item Lightbox Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-[#121212]/60 backdrop-blur-md flex items-center justify-center p-4 md:p-12 animate-fade-in">
          <div className="bg-[#F4F1EA] border border-[#121212]/30 rounded-2xl w-full max-w-2xl p-8 space-y-6 relative shadow-2xl text-[#121212]">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-[#EAE5D9] hover:bg-[#121212] hover:text-[#F4F1EA] transition-colors border border-[#121212]/20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 border-b border-[#121212]/20 pb-4">
              <span className="font-mono text-[10px] text-amber-950 tracking-widest uppercase font-bold">
                ARCHIVE ITEM // [{selectedItem.type}] // {selectedItem.date}
              </span>
              <h3 className="font-cormorant text-3xl font-bold text-[#121212]">
                {selectedItem.title}
              </h3>
            </div>

            <p className="font-inter text-sm text-[#121212]/80 leading-relaxed font-light">
              {selectedItem.details}
            </p>

            {selectedItem.snippet && (
              <pre className="bg-[#121212] text-[#F4F1EA] p-4 rounded-xl font-mono text-xs overflow-x-auto">
                <code>{selectedItem.snippet}</code>
              </pre>
            )}

            <div className="pt-2 text-right">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-5 py-2 bg-[#121212] text-[#F4F1EA] font-mono text-xs rounded hover:bg-amber-950 transition-colors"
              >
                CLOSE ARTIFACT
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
