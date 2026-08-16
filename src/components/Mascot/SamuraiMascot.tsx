import React from 'react';
import { MascotState } from '../../types';
import { Sparkles, Zap, Brain, Shield, Lightbulb, Code2 } from 'lucide-react';

interface SamuraiMascotProps {
  state?: MascotState;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showSpeechBubble?: boolean;
  speechText?: string;
  className?: string;
  onClick?: () => void;
}

const STATE_LABELS: Record<MascotState, string> = {
  ready: 'Ready for Battle',
  scanning: 'Scanning Platforms',
  thinking: 'Analyzing Intent',
  focused: 'Target Locked',
  idea: 'Insight Discovered',
  working: 'Crafting Response',
  excited: 'High Match!',
  happy: 'Greetings, Samurai',
  celebration: 'Clean Strike! ⚔️',
  guard: 'Guard Active',
};

const SIZE_MAP: Record<string, string> = {
  xs: 'w-10 h-10',
  sm: 'w-16 h-16',
  md: 'w-24 h-24',
  lg: 'w-36 h-36',
  xl: 'w-48 h-48',
  hero: 'w-64 h-64 md:w-80 md:h-80',
};

export const SamuraiMascot: React.FC<SamuraiMascotProps> = ({
  state = 'ready',
  size = 'md',
  showSpeechBubble = false,
  speechText,
  className = '',
  onClick,
}) => {
  const label = STATE_LABELS[state] || STATE_LABELS.ready;
  const containerSize = SIZE_MAP[size] || SIZE_MAP.md;
  const imageSrc = `/mascot/${state}.png`;

  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      {/* Speech Bubble */}
      {showSpeechBubble && (speechText || label) && (
        <div className="absolute -top-12 z-20 animate-bounce transition-all duration-300">
          <div className="bg-[#171717]/95 border border-[#E3262E]/50 text-[#F5F5F5] text-xs font-semibold px-3.5 py-1.5 rounded-xl shadow-xl backdrop-blur-md flex items-center gap-1.5 whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-[#E3262E] animate-ping inline-block" />
            <span>{speechText || label}</span>
          </div>
          <div className="w-2.5 h-2.5 bg-[#171717] border-r border-b border-[#E3262E]/50 rotate-45 mx-auto -mt-1.5" />
        </div>
      )}

      {/* Mascot Image Container */}
      <div
        onClick={onClick}
        className={`relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl transition-transform duration-300 hover:scale-105 bg-[#111111] ${containerSize} ${
          onClick ? 'cursor-pointer' : ''
        }`}
        style={{
          background: `radial-gradient(circle at center, rgba(227, 38, 46, 0.25) 0%, rgba(17, 17, 17, 0.95) 85%)`,
        }}
      >
        {/* State-Specific Visual Overlays */}
        {state === 'focused' && (
          <div className="absolute inset-0 bg-[#E3262E]/15 animate-pulse z-10 pointer-events-none flex items-center justify-center">
            <div className="w-full h-0.5 bg-[#E3262E]/40" />
          </div>
        )}

        {state === 'scanning' && (
          <div className="absolute inset-0 z-10 pointer-events-none">
            <div className="w-full h-1 bg-[#E3262E] shadow-lg shadow-[#E3262E] animate-bounce" />
            <div className="absolute inset-0 border-2 border-[#E3262E]/60 rounded-2xl animate-ping" />
          </div>
        )}

        {state === 'excited' && (
          <div className="absolute top-2 right-2 z-10 p-1 bg-[#E3262E] rounded-full text-white shadow-lg animate-bounce">
            <Sparkles className="w-3.5 h-3.5 fill-white" />
          </div>
        )}

        {state === 'idea' && (
          <div className="absolute top-2 right-2 z-10 p-1 bg-amber-500 rounded-full text-white shadow-lg animate-pulse">
            <Lightbulb className="w-3.5 h-3.5 fill-white" />
          </div>
        )}

        {state === 'working' && (
          <div className="absolute bottom-2 left-2 z-10 px-2 py-0.5 bg-[#080808]/90 border border-[#E3262E]/40 rounded-lg text-[9px] font-mono text-[#E3262E] flex items-center gap-1">
            <Code2 className="w-3 h-3" />
            <span>AI DRAFTING...</span>
          </div>
        )}

        {state === 'celebration' && (
          <div className="absolute inset-0 bg-gradient-to-t from-[#E3262E]/30 to-transparent z-10 pointer-events-none" />
        )}

        {/* Clean Pristine Character Image */}
        <img
          src={imageSrc}
          alt={`Samurai Mascot - ${state}`}
          className="w-full h-full object-cover transition-all duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/mascot/avatar.png';
          }}
        />
      </div>
    </div>
  );
};
