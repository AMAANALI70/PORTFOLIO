import React, { useState, useEffect } from 'react';
import { soundManager } from '../utils/audioSystem';
import { Volume2 as VolIcon, VolumeX as MuteIcon } from 'lucide-react';

interface NavigationProps {
  currentWorld: 'black' | 'paper';
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentWorld,
  activeSection,
  onNavigate
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  const navItems = [
    { id: 'identity', label: 'IDENTITY', num: '01' },
    { id: 'resonance', label: 'RESONANCE', num: '02' },
    { id: 'work', label: 'WORK', num: '03' },
    { id: 'research', label: 'RESEARCH', num: '04' },
    { id: 'archive', label: 'ARCHIVE', num: '05' },
    { id: 'journal', label: 'JOURNAL', num: '06' },
    { id: 'contact', label: 'EXIT', num: '07' },
  ];

  // Dynamic Theme Styling depending on Black World vs Paper World
  const isPaper = currentWorld === 'paper';
  const textColor = isPaper ? 'text-[#121212]' : 'text-[#F5F5F2]';
  const mutedTextColor = isPaper ? 'text-[#121212]/50' : 'text-[#F5F5F2]/50';
  const activeColor = isPaper ? 'text-[#0D0D0E] font-semibold' : 'text-[#D4AF37] font-semibold';
  const bgGlass = isPaper 
    ? 'bg-[#F4F1EA]/85 border-[#121212]/10 backdrop-blur-md'
    : 'bg-[#050505]/80 border-[#F5F5F2]/10 backdrop-blur-md';

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ${scrolled ? 'py-4' : 'py-6'} ${textColor}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Logo */}
        <button
          onClick={() => {
            soundManager.playTick(1000);
            onNavigate('identity');
          }}
          className="group flex items-center space-x-3 text-left focus:outline-none cursor-pointer"
        >
          <div className={`w-2 h-2 rounded-full transition-all duration-300 ${isPaper ? 'bg-[#121212]' : 'bg-[#D4AF37]'} group-hover:scale-150`} />
          <div className="flex flex-col">
            <span className="font-cinzel text-xs tracking-[0.25em] font-bold">ERIC</span>
            <span className={`font-mono text-[9px] tracking-widest ${mutedTextColor}`}>THE ARCHIVIST</span>
          </div>
        </button>

        {/* Floating Center Navbar (Visible on Scroll) */}
        <nav className={`hidden md:flex items-center space-x-1 px-4 py-2 rounded-full border transition-all duration-500 ${bgGlass} ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-90'}`}>
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  soundManager.playTick(1400);
                  onNavigate(item.id);
                }}
                className={`px-3 py-1 text-[11px] font-mono tracking-widest transition-all duration-300 rounded-full relative cursor-pointer ${
                  isActive ? activeColor : `${mutedTextColor} hover:${textColor}`
                }`}
              >
                {isActive && (
                  <span className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full ${isPaper ? 'bg-[#121212]' : 'bg-[#D4AF37]'}`} />
                )}
                <span className="text-[9px] opacity-40 mr-1">{item.num}</span>
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Controls: Sound Toggle + Status */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handleSoundToggle}
            className={`p-2 rounded-full border transition-all duration-300 cursor-pointer ${
              isPaper 
                ? 'border-[#121212]/20 hover:bg-[#121212]/10 text-[#121212]' 
                : 'border-[#F5F5F2]/20 hover:bg-[#F5F5F2]/10 text-[#F5F5F2]'
            }`}
            title={isMuted ? 'Enable Spatial Audio' : 'Mute Audio'}
          >
            {isMuted ? <MuteIcon className="w-3.5 h-3.5 opacity-60" /> : <VolIcon className="w-3.5 h-3.5 text-[#D4AF37]" />}
          </button>

          {/* Active World Indicator Badge */}
          <div className={`hidden lg:flex items-center space-x-2 text-[10px] font-mono tracking-widest px-3 py-1 rounded-full border ${
            isPaper ? 'border-[#121212]/20 bg-[#121212]/5' : 'border-[#F5F5F2]/15 bg-[#F5F5F2]/5'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isPaper ? 'bg-amber-800 animate-pulse' : 'bg-emerald-400 animate-pulse'}`} />
            <span className={mutedTextColor}>WORLD:</span>
            <span className="font-semibold uppercase">{currentWorld === 'paper' ? 'PAPER ARCHIVE' : 'BLACK SYSTEM'}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
