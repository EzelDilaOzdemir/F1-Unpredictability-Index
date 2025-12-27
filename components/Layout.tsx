
import React from 'react';
import { LayoutDashboard, Zap, Activity, Info } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans">
      {/* Top Header */}
      <header className="border-b border-[#e10600]/30 py-4 px-6 sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-md z-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-[#e10600] p-1 rounded">
            <Zap className="text-white fill-white" size={24} />
          </div>
          <h1 className="text-2xl font-black tracking-tighter italic">
            F1<span className="text-[#e10600]">INDEX</span>
          </h1>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-bold uppercase tracking-widest text-zinc-400">
          <a href="#" className="hover:text-white transition-colors border-b-2 border-transparent hover:border-[#e10600] pb-1">Dashboard</a>
          <a href="#" className="hover:text-white transition-colors border-b-2 border-transparent hover:border-[#e10600] pb-1">Analysis</a>
          <a href="#" className="hover:text-white transition-colors border-b-2 border-transparent hover:border-[#e10600] pb-1">Comparison</a>
        </nav>
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-zinc-500 hidden sm:block">LIVE DATA SIMULATION v2.5</span>
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto max-w-7xl w-full mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 p-6 text-center text-xs text-zinc-600">
        <p>&copy; 2024 Formula 1 Unpredictability Analyzer. Data processed via Gemini Generative AI.</p>
      </footer>
    </div>
  );
};

export default Layout;
