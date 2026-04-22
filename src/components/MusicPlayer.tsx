import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Track } from '../types';
import { TRACKS } from '../constants';

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentTrack = TRACKS[currentTrackIndex];

  const togglePlay = () => setIsPlaying(!isPlaying);
  
  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  const selectTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  return (
    <div className="w-full h-full border-glitch bg-black p-6 flex flex-col overflow-hidden relative group">
      
      {/* Header element */}
      <div className="flex items-center justify-between mb-6 border-b-4 border-[#ff00ff] pb-2">
        <h2 className="text-[1.2rem] font-display uppercase tracking-tighter text-[#00ffff] glitch" data-text="DATA_STREAM_AUDIO">
          DATA_STREAM_AUDIO
        </h2>
        <div className="flex gap-4 text-2xl font-bold font-mono">
          <button onClick={handlePrev} className="text-[#ff00ff] hover:text-[#00ffff] transition-none hover:bg-black p-1 hover:animate-pulse">
            [&lt;&lt;]
          </button>
          <button onClick={handleNext} className="text-[#ff00ff] hover:text-[#00ffff] transition-none hover:bg-black p-1 hover:animate-pulse">
            [&gt;&gt;]
          </button>
        </div>
      </div>

      {/* Track List */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-4 mb-6 relative z-10 border-r-4 border-dashed border-[#ff00ff]/20">
        {TRACKS.map((track, i) => {
          const isActive = currentTrackIndex === i;
          return (
            <button
              key={track.id}
              onClick={() => selectTrack(i)}
              className={`
                w-full flex items-center gap-4 p-2 text-left text-2xl transition-none border-4
                ${isActive ? 'border-[#00ffff] bg-[#00ffff] text-black shadow-[4px_4px_0_#ff00ff]' : 'border-black text-[#00ffff] hover:border-[#ff00ff] hover:bg-[#ff00ff] hover:text-black hover:shadow-none'}
              `}
            >
              <div className={`font-display text-xs px-2 py-1 ${isActive ? 'bg-black text-[#00ffff]' : 'bg-[#00ffff] text-black group-hover:bg-black group-hover:text-[#ff00ff]'}`}>
                {(i + 1).toString().padStart(2, '0')}
              </div>
              
              <div className="flex-1 overflow-hidden">
                <p className="truncate font-bold uppercase leading-none mb-1">
                  {track.title}
                </p>
                <p className="truncate opacity-80 leading-none">
                  SRC: {track.artist}
                </p>
              </div>

              {isActive && isPlaying && (
                 <span className="animate-pulse font-bold text-3xl shrink-0">_X_</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Now Playing Mini-Control */}
      <div className="border-t-4 border-[#ff00ff] pt-4 z-10 shrink-0">
        <div className="flex flex-col gap-2 mb-4">
          <h3 className="text-xs font-display uppercase tracking-widest text-[#ff00ff] bg-black inline-block self-start px-2 py-1 mb-1 border-b border-[#00ffff]">
            CURRENT_ALLOCATION:
          </h3>
          <div className="text-3xl uppercase font-bold text-[#00ffff] glitch leading-none" data-text={currentTrack.title}>
            {currentTrack.title}
          </div>
          <div className="text-2xl opacity-80 uppercase leading-none mb-2 text-[#ff00ff]">
            ID: {currentTrack.artist}
          </div>
        </div>
        
        <div className="flex w-full items-center gap-4 uppercase font-bold text-2xl mb-4 bg-black p-2 border-2 border-dashed border-[#00ffff]">
          <button 
            onClick={togglePlay}
            className={`border-4 shrink-0 px-4 py-1 flex items-center justify-center font-display text-xs ${isPlaying ? 'border-[#ff00ff] bg-[#ff00ff] text-black' : 'border-[#00ffff] text-[#00ffff] hover:bg-[#00ffff] hover:text-black'}`}
          >
            {isPlaying ? '[ PAUSE ]' : '[ PLAY ]'}
          </button>
          
          <div className="flex-1 flex gap-1 h-8 items-end">
            {[...Array(8)].map((_, j) => (
              <motion.div 
                key={j} 
                animate={{ height: isPlaying ? [10, 28, 10] : 10 }}
                transition={{ repeat: Infinity, duration: 0.3 + (j % 3) * 0.1 }}
                className={`flex-1 w-full ${isPlaying && j % 2 === 0 ? 'bg-[#ff00ff]' : 'bg-[#00ffff]'}`} 
              />
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col gap-1">
          <div className="h-6 w-full border-4 border-[#00ffff] bg-black p-0.5 relative overflow-hidden">
            <motion.div 
              animate={{ width: isPlaying ? "100%" : "45%" }}
              transition={{ duration: 180, ease: "linear" }}
              className="h-full bg-[#ff00ff]"
            >
              <div className="w-full h-full opacity-30" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 5px, #000 5px, #000 10px)' }} />
            </motion.div>
          </div>
          <div className="flex justify-between text-xl uppercase font-bold text-[#00ffff]">
            <span>0x000</span>
            <span>{currentTrack.duration} / END</span>
          </div>
        </div>
      </div>

    </div>
  );
}
