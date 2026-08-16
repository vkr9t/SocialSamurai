import React, { useEffect, useState } from 'react';
import { SamuraiMascot } from '../Mascot/SamuraiMascot';
import { CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ScanningModal: React.FC = () => {
  const { activeScanningModal, setActiveScanningModal } = useApp();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const FUNNEL_STEPS = [
    { label: 'RAW POSTS', desc: 'Fetching live authorized platform feeds' },
    { label: 'KEYWORD MATCHING', desc: 'Filtering AI, SaaS, Vibe Coding topics' },
    { label: 'TOPIC CLASSIFICATION', desc: 'Classifying technical vs promotional context' },
    { label: 'INTENT DETECTION', desc: 'Detecting high-intent founder questions' },
    { label: 'RELEVANCE SCORING', desc: 'Scoring match confidence (0-100%)' },
    { label: 'ENGAGEMENT ANALYSIS', desc: 'Checking reply velocity & reach' },
    { label: 'DUPLICATE REMOVAL', desc: 'Filtering out bot spam & repeat posts' },
    { label: 'AI SAFETY CHECK', desc: 'Enforcing platform automation guidelines' },
    { label: 'TOP OPPORTUNITIES', desc: 'Surfacing top 7 battlefield targets' },
  ];

  useEffect(() => {
    if (!activeScanningModal) {
      setCurrentStepIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < FUNNEL_STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setActiveScanningModal(false);
          }, 800);
          return prev;
        }
      });
    }, 450);

    return () => clearInterval(interval);
  }, [activeScanningModal]);

  if (!activeScanningModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#080808]/95 backdrop-blur-2xl flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-[#111111] border border-[#E3262E]/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden text-center">
        {/* Pulsing radar background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#E3262E]/10 rounded-full blur-3xl animate-pulse pointer-events-none" />

        {/* Mascot */}
        <SamuraiMascot
          state={currentStepIndex > 5 ? 'working' : 'scanning'}
          size="lg"
          showSpeechBubble
          speechText={FUNNEL_STEPS[currentStepIndex].label}
          className="mb-4"
        />

        <h2 className="text-2xl font-black text-[#F5F5F5] tracking-tight">
          SAMURAI AI CURATION PIPELINE
        </h2>
        <p className="text-xs text-[#A1A1AA] mt-1 mb-6">
          Analyzing connected feeds in real-time. Zero scraping. 100% official API compliance.
        </p>

        {/* Funnel Progress List */}
        <div className="bg-[#080808] border border-white/10 rounded-2xl p-4 space-y-2 mb-6 text-left max-h-56 overflow-y-auto">
          {FUNNEL_STEPS.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            return (
              <div
                key={step.label}
                className={`flex items-center justify-between p-2 rounded-xl text-xs transition-all ${
                  isCurrent
                    ? 'bg-[#E3262E]/15 border border-[#E3262E] text-[#F5F5F5] font-bold'
                    : isCompleted
                    ? 'text-emerald-400 font-medium opacity-80'
                    : 'text-zinc-600 opacity-40'
                }`}
              >
                <div className="flex items-center gap-2">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 text-[#E3262E] animate-spin shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-zinc-700 shrink-0" />
                  )}
                  <span>{step.label}</span>
                </div>
                <span className="text-[10px] text-[#A1A1AA]">{step.desc}</span>
              </div>
            );
          })}
        </div>

        {/* Stats summary bar */}
        <div className="grid grid-cols-3 gap-2 bg-[#171717] p-3 rounded-2xl border border-white/5 text-center">
          <div>
            <p className="text-xs text-[#A1A1AA]">Analyzed</p>
            <p className="text-lg font-black text-[#F5F5F5]">284</p>
          </div>
          <div>
            <p className="text-xs text-[#A1A1AA]">Relevant</p>
            <p className="text-lg font-black text-amber-400">17</p>
          </div>
          <div>
            <p className="text-xs text-[#A1A1AA]">High-Priority</p>
            <p className="text-lg font-black text-[#E3262E]">7</p>
          </div>
        </div>
      </div>
    </div>
  );
};
