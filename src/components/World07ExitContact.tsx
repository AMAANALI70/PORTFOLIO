import React, { useState } from 'react';
import { soundManager } from '../utils/audioSystem';
import { Mail, Send, Copy, Check, Terminal, ExternalLink } from 'lucide-react';

export const World07ExitContact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [sentStatus, setSentStatus] = useState<string | null>(null);

  const email = 'eric.archivist@systems.dev';

  const handleCopyEmail = () => {
    soundManager.playTick(1500);
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message || !senderEmail) return;

    soundManager.playResonancePulse();
    setSentStatus('DISPATCHING ENCRYPTED TRANSMISSION...');

    setTimeout(() => {
      setSentStatus('TRANSMISSION RECEIVED BY ARCHIVIST KERNEL.');
      setMessage('');
      setSenderEmail('');
      setTimeout(() => setSentStatus(null), 4000);
    }, 1200);
  };

  return (
    <section id="contact" className="relative min-h-screen bg-[#050505] text-[#F5F5F2] py-32 px-6 md:px-16 overflow-hidden flex flex-col justify-between">
      {/* Background Blueprint & Doorway of Light FX */}
      <div className="absolute inset-0 bg-grid-blueprint opacity-20 pointer-events-none" />

      {/* Doorway of Light Glowing Portal */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 md:w-[600px] h-[500px] bg-gradient-to-t from-[#D4AF37]/20 via-[#F5F5F2]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full space-y-20 relative z-10 my-auto">
        
        {/* Top Header */}
        <div className="max-w-3xl space-y-6">
          <div className="flex items-center space-x-2 text-[#D4AF37] font-mono text-xs tracking-[0.3em] uppercase">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
            <span>WORLD 07 // SYSTEM EXIT & TRANSMISSION</span>
          </div>

          <h2 className="font-cinzel text-5xl md:text-8xl font-black tracking-widest text-white uppercase">
            STILL LOOKING.
          </h2>

          <p className="font-cormorant italic text-2xl md:text-3xl text-[#F5F5F2]/80 leading-relaxed font-light">
            &ldquo;Every system has rules waiting to be uncovered. If you are building something extraordinary, let us connect.&rdquo;
          </p>
        </div>

        {/* Interactive Transmission Form & Contact Channels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct System Terminal Input */}
          <div className="lg:col-span-7 bg-[#0A0A0A] border border-[#F5F5F2]/10 p-8 md:p-10 rounded-2xl space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-[#F5F5F2]/10 pb-4">
              <div className="flex items-center space-x-2 font-mono text-xs text-[#D4AF37]">
                <Terminal className="w-4 h-4" />
                <span>SYSTEM TERMINAL MESSAGE DISPATCHER</span>
              </div>
              <span className="font-mono text-[10px] text-[#F5F5F2]/40">ENCRYPTED // TLS 1.3</span>
            </div>

            <form onSubmit={handleSendMessage} className="space-y-4 font-mono text-xs">
              <div className="space-y-1">
                <label className="text-[#F5F5F2]/60 tracking-wider">YOUR SENDER EMAIL / IDENTITY:</label>
                <input
                  type="email"
                  required
                  placeholder="visitor@architecture.dev"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  className="w-full bg-[#050505] border border-[#F5F5F2]/15 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#F5F5F2]/60 tracking-wider">TRANSMISSION CONTENT:</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your project, inquiry, or research proposal..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#050505] border border-[#F5F5F2]/15 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#D4AF37] hover:bg-[#C5A059] text-[#050505] font-bold tracking-widest uppercase rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer shadow-lg"
              >
                <Send className="w-4 h-4" />
                <span>DISPATCH TRANSMISSION</span>
              </button>

              {sentStatus && (
                <div className="p-3 bg-[#111] border border-[#D4AF37]/40 rounded text-center text-[#D4AF37] font-mono text-xs animate-fade-in">
                  {sentStatus}
                </div>
              )}
            </form>
          </div>

          {/* Right Column: Direct Copy Email & Social Artifact Channels */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Copy Email Card */}
            <div className="bg-[#0A0A0A] border border-[#F5F5F2]/10 p-6 rounded-2xl space-y-4">
              <div className="font-mono text-xs text-[#D4AF37] tracking-wider uppercase">
                DIRECT EMAIL CHANNEL
              </div>

              <div className="flex items-center justify-between p-3.5 bg-[#050505] rounded-xl border border-[#F5F5F2]/10">
                <span className="font-mono text-xs text-[#F5F5F2]">{email}</span>
                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 bg-[#111] hover:bg-[#222] border border-[#F5F5F2]/20 text-white rounded font-mono text-xs flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />}
                  <span>{copied ? 'COPIED' : 'COPY'}</span>
                </button>
              </div>
            </div>

            {/* Social Artifacts */}
            <div className="bg-[#0A0A0A] border border-[#F5F5F2]/10 p-6 rounded-2xl space-y-4">
              <div className="font-mono text-xs text-[#D4AF37] tracking-wider uppercase">
                EXTERNAL NETWORK NODES
              </div>

              <div className="space-y-3 font-mono text-xs">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 bg-[#050505] border border-[#F5F5F2]/10 rounded-xl hover:border-[#D4AF37] transition-all group"
                >
                  <div className="flex items-center space-x-3 text-[#F5F5F2]">
                    <svg className="w-4 h-4 text-[#D4AF37]" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    <span>GITHUB // @eric-archivist</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#F5F5F2]/40 group-hover:text-white" />
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 bg-[#050505] border border-[#F5F5F2]/10 rounded-xl hover:border-[#D4AF37] transition-all group"
                >
                  <div className="flex items-center space-x-3 text-[#F5F5F2]">
                    <svg className="w-4 h-4 text-[#D4AF37]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.64a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
                    </svg>
                    <span>LINKEDIN // eric-archivist</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#F5F5F2]/40 group-hover:text-white" />
                </a>

                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 bg-[#050505] border border-[#F5F5F2]/10 rounded-xl hover:border-[#D4AF37] transition-all group"
                >
                  <div className="flex items-center space-x-3 text-[#F5F5F2]">
                    <Mail className="w-4 h-4 text-[#D4AF37]" />
                    <span>X.COM // @eric_archivist</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#F5F5F2]/40 group-hover:text-white" />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Cinematic Closing Shot Footer */}
      <div className="max-w-7xl mx-auto w-full pt-16 border-t border-[#F5F5F2]/10 flex flex-col md:flex-row items-center justify-between text-[#F5F5F2]/40 font-mono text-[11px] gap-4 relative z-10">
        <div>
          © 2026 ERIC // THE ARCHIVIST. ALL SYSTEMS RESERVED.
        </div>

        <div className="flex items-center space-x-6">
          <span>DESIGNED & ENGINEERED FOR AWWWARDS</span>
          <span>•</span>
          <span>TOKYO ARCHIVE</span>
        </div>
      </div>
    </section>
  );
};
