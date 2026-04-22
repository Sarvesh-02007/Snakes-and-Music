import React from 'react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { motion } from 'motion/react';

export default function App() {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-black uppercase selection:bg-[#ff00ff] selection:text-black">
      <div className="scanlines" />
      <div className="static-noise" />
      
      {/* Header */}
      <header className="h-14 flex items-center justify-between px-6 border-b-4 border-[#ff00ff] bg-black z-50 shrink-0 shadow-[0_4px_0_rgba(0,255,255,0.7)] hover:border-b-[#00ffff] hover:shadow-[0_4px_0_rgba(255,0,255,0.7)] transition-all">
        <div className="flex items-center gap-4">
          <div className="w-4 h-4 bg-[#00ffff] animate-ping" />
          <h1 className="text-xl sm:text-2xl font-display glitch text-[#00ffff]" data-text="SYS_CORE v.9.0.1">
            SYS_CORE v.9.0.1
          </h1>
        </div>
        
        <div className="flex gap-8 text-2xl">
          <div className="flex flex-col items-end leading-[0.8]">
            <span className="text-[#ff00ff]">MEM_ALLOC_</span>
            <span className="text-[#00ffff] font-bold">STABLE</span>
          </div>
          <div className="hidden sm:flex flex-col items-end leading-[0.8]">
            <span className="text-[#ff00ff]">BUFFER_</span>
            <span className="text-[#00ffff] font-bold">1024K</span>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 flex p-4 sm:p-8 gap-8 overflow-hidden items-stretch z-10 w-full max-w-7xl mx-auto">
        {/* Left Sidebar Music Terminal */}
        <aside className="w-[26rem] hidden lg:flex flex-col shrink-0">
          <MusicPlayer />
        </aside>

        {/* Center Canvas Game Area */}
        <section className="flex-1 border-glitch flex items-center justify-center relative overflow-hidden p-2 tear shadow-[8px_8px_0_rgba(255,0,255,1)]">
          <div className="absolute inset-0 bg-[#080808]" />
          <div className="relative z-10 w-full flex flex-col items-center justify-center h-full">
            <SnakeGame />
          </div>
        </section>
      </main>

      <footer className="h-10 border-t-4 border-[#00ffff] bg-[#ff00ff] text-black flex items-center px-6 justify-between z-50 text-2xl font-bold shrink-0">
        <span className="animate-pulse">_WAITING_FOR_INPUT...</span>
        <span className="glitch font-mono hidden sm:block delay-1000" data-text="0X00FF00_TERMINAL_ACTV">0X00FF00_TERMINAL_ACTV</span>
      </footer>
    </div>
  );
}
