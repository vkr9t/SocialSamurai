import React, { useState } from 'react';
import { SamuraiMascot } from '../Mascot/SamuraiMascot';
import { ArrowRight, Sparkles, Shield, CheckCircle2 } from 'lucide-react';

interface WelcomeModalProps {
  onStartOnboarding: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ onStartOnboarding }) => {
  const [authMethod, setAuthMethod] = useState<'google' | 'email' | null>(null);

  const handleLogin = (method: 'google' | 'email') => {
    setAuthMethod(method);
    setTimeout(() => {
      onStartOnboarding();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#080808]/95 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 text-center shadow-2xl shadow-[#E3262E]/20 relative overflow-hidden animate-in fade-in zoom-in-95">
        {/* Glow accent behind mascot */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#E3262E]/20 blur-3xl rounded-full pointer-events-none" />

        {/* Brand Logo & Mascot */}
        <div className="mb-6 relative z-10 flex flex-col items-center">
          <SamuraiMascot
            state="ready"
            size="xl"
            showSpeechBubble
            speechText="Greetings, Samurai ⚔️"
            className="mb-4"
          />

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#171717] border border-[#E3262E]/40 text-xs font-bold text-[#E3262E] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI COMMAND CENTER FOR SOCIAL</span>
          </div>

          <h1 className="text-3xl font-black text-[#F5F5F5] tracking-tight">
            Welcome to the dojo.
          </h1>
          <p className="text-sm text-[#A1A1AA] mt-2 max-w-xs mx-auto leading-relaxed">
            Your AI command center for social. Find high-intent conversations, generate AI replies, and approve before publishing.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 relative z-10">
          <button
            onClick={() => handleLogin('google')}
            disabled={authMethod !== null}
            className="w-full py-3.5 px-4 bg-white text-[#080808] hover:bg-gray-100 font-bold text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center gap-3 active:scale-98"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{authMethod === 'google' ? 'Connecting to Google...' : 'Continue with Google'}</span>
          </button>

          <button
            onClick={() => handleLogin('email')}
            disabled={authMethod !== null}
            className="w-full py-3.5 px-4 bg-[#171717] hover:bg-[#1C1C1E] border border-white/10 text-[#F5F5F5] font-semibold text-sm rounded-2xl transition-all flex items-center justify-center gap-2 active:scale-98"
          >
            <span>{authMethod === 'email' ? 'Setting up session...' : 'Continue with Email'}</span>
            <ArrowRight className="w-4 h-4 text-[#E3262E]" />
          </button>
        </div>

        {/* Security badge */}
        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-center gap-2 text-[11px] text-[#A1A1AA]">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span>OAuth 2.0 Authorization • Zero Password Storage</span>
        </div>
      </div>
    </div>
  );
};
