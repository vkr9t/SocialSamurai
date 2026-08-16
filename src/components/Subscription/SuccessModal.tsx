import React from 'react';
import { useApp } from '../../context/AppContext';
import { SamuraiMascot } from '../Mascot/SamuraiMascot';
import { Sparkles, CheckCircle2, ArrowRight, X } from 'lucide-react';

export const SuccessModal: React.FC = () => {
  const { activeSuccessModal, setActiveSuccessModal, setCurrentView } = useApp();

  if (!activeSuccessModal) return null;

  const handleEnterDojo = () => {
    setActiveSuccessModal(false);
    setCurrentView('dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#080808]/98 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto">
      <div className="max-w-md w-full bg-[#111111] border-2 border-[#E3262E] rounded-3xl p-6 sm:p-8 text-center shadow-2xl relative overflow-hidden animate-in zoom-in-95 my-auto max-h-[90vh] flex flex-col justify-between">
        {/* Close Button */}
        <button
          onClick={handleEnterDojo}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#171717] text-[#A1A1AA] hover:text-[#F5F5F5] transition z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#E3262E]/20 blur-3xl rounded-full pointer-events-none" />

        <div className="overflow-y-auto pr-1 space-y-4 my-auto">
          <SamuraiMascot state="celebration" size="lg" showSpeechBubble speechText="Clean Strike! ⚔️" className="mb-2" />

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E3262E]/20 border border-[#E3262E] text-xs font-black text-[#E3262E]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ENTITLEMENT UNLOCKED: SAMURAI_PRO</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#F5F5F5] tracking-tight">WELCOME TO THE DOJO.</h1>
          <p className="text-xs sm:text-sm font-extrabold text-[#E3262E]">You're officially a Samurai. ⚔️</p>
          <p className="text-xs text-[#A1A1AA] leading-relaxed">
            Your account has been upgraded. Unlimited AI reply drafts, cross-platform adaptation, AI fine-tuning, and priority discovery are active.
          </p>

          <div className="bg-[#080808] border border-white/10 rounded-2xl p-3.5 text-left space-y-2 text-xs text-[#F5F5F5]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Unlimited AI Reply Drafts & Posts
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> 25 Daily Opportunity Discovery
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Continuous AI Learning & Voice Fine-tuning
            </div>
          </div>
        </div>

        <button
          onClick={handleEnterDojo}
          className="w-full mt-4 py-3.5 bg-gradient-to-r from-[#E3262E] to-[#7F1015] hover:from-[#f4333b] hover:to-[#911319] text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-[#E3262E]/40 transition flex items-center justify-center gap-2 active:scale-95 shrink-0"
        >
          <span>ENTER THE DOJO ⚔️</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
