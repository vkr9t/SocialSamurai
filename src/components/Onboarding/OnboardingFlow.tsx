import React, { useState } from 'react';
import { SamuraiMascot } from '../Mascot/SamuraiMascot';
import { Check, Plus, X, ArrowRight, ArrowLeft, Shield, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const OnboardingFlow: React.FC = () => {
  const { finishOnboarding, toggleConnectPlatform, accounts } = useApp();

  const [step, setStep] = useState<number>(1);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([
    'Grow my audience',
    'Find customers',
    'Promote my startup',
  ]);
  const [keywordInput, setKeywordInput] = useState<string>('');
  const [userKeywords, setUserKeywords] = useState<string[]>([
    'AI',
    'SaaS',
    'Startups',
    'App development',
    'Vibe coding',
  ]);

  const GOAL_OPTIONS = [
    'Grow my audience',
    'Find customers',
    'Build my personal brand',
    'Promote my startup',
    'Find conversations',
    'Create content',
    'Stay active on social',
  ];

  const toggleGoal = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter((g) => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const handleAddKeyword = () => {
    if (!keywordInput.trim() || userKeywords.includes(keywordInput.trim())) return;
    setUserKeywords([...userKeywords, keywordInput.trim()]);
    setKeywordInput('');
  };

  const handleRemoveKeyword = (kw: string) => {
    setUserKeywords(userKeywords.filter((k) => k !== kw));
  };

  const handleFinish = () => {
    finishOnboarding(selectedGoals, userKeywords);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#080808]/98 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto">
      <div className="max-w-xl w-full bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative my-auto">
        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#E3262E]">STEP {step} OF 3</span>
            <span className="text-xs text-[#A1A1AA]">
              {step === 1 ? 'Goals' : step === 2 ? 'Keywords' : 'Platforms'}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  s === step
                    ? 'w-8 bg-[#E3262E]'
                    : s < step
                    ? 'w-4 bg-emerald-500'
                    : 'w-4 bg-white/10'
                }`}
              />
            ))}
          </div>
        </div>

        {/* STEP 1: GOALS */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex items-center gap-4 mb-6">
              <SamuraiMascot state="thinking" size="sm" />
              <div>
                <h2 className="text-2xl font-black text-[#F5F5F5]">
                  What do you want SocialSamurai to help you with?
                </h2>
                <p className="text-xs text-[#A1A1AA] mt-1">Select all that apply to calibrate your dojo.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
              {GOAL_OPTIONS.map((goal) => {
                const isSelected = selectedGoals.includes(goal);
                return (
                  <button
                    key={goal}
                    onClick={() => toggleGoal(goal)}
                    className={`flex items-center justify-between p-3.5 rounded-2xl text-xs font-semibold border transition-all text-left ${
                      isSelected
                        ? 'bg-[#171717] border-[#E3262E] text-[#F5F5F5] shadow-lg shadow-[#E3262E]/10'
                        : 'bg-[#080808] border-white/10 text-[#A1A1AA] hover:border-white/20 hover:text-[#F5F5F5]'
                    }`}
                  >
                    <span>{goal}</span>
                    <div
                      className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-[#E3262E] border-[#E3262E] text-white'
                          : 'border-white/20 bg-transparent'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={selectedGoals.length === 0}
              className="w-full py-4 bg-[#E3262E] hover:bg-[#f4333b] disabled:opacity-50 text-white font-bold text-sm rounded-2xl shadow-xl shadow-[#E3262E]/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Continue to Keywords</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: KEYWORDS */}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex items-center gap-4 mb-6">
              <SamuraiMascot state="idea" size="sm" />
              <div>
                <h2 className="text-2xl font-black text-[#F5F5F5]">What do you talk about?</h2>
                <p className="text-xs text-[#A1A1AA] mt-1">
                  Add keywords & topics for SocialSamurai to monitor across connected networks.
                </p>
              </div>
            </div>

            {/* Input Row */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddKeyword()}
                placeholder="Add keyword (e.g. AI, SaaS, Vibe coding)..."
                className="flex-1 bg-[#080808] border border-white/10 rounded-2xl px-4 py-3 text-xs text-[#F5F5F5] placeholder-[#A1A1AA] focus:outline-none focus:border-[#E3262E] transition"
              />
              <button
                onClick={handleAddKeyword}
                className="px-4 bg-[#171717] border border-white/10 hover:border-[#E3262E] text-[#F5F5F5] text-xs font-bold rounded-2xl transition flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4 text-[#E3262E]" />
                <span>Add</span>
              </button>
            </div>

            {/* Keyword Chips */}
            <div className="min-h-32 p-4 bg-[#080808] border border-white/10 rounded-2xl mb-8 flex flex-wrap gap-2 items-start">
              {userKeywords.length === 0 ? (
                <p className="text-xs text-zinc-600 italic">No keywords added yet. Type above and press enter.</p>
              ) : (
                userKeywords.map((kw) => (
                  <span
                    key={kw}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#E3262E]/10 border border-[#E3262E]/40 text-[#F5F5F5] text-xs font-semibold animate-in zoom-in-95"
                  >
                    <span>{kw}</span>
                    <button
                      onClick={() => handleRemoveKeyword(kw)}
                      className="text-[#A1A1AA] hover:text-[#E3262E] transition"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="py-4 px-6 bg-[#171717] hover:bg-[#1C1C1E] border border-white/10 text-[#A1A1AA] hover:text-[#F5F5F5] font-bold text-sm rounded-2xl transition flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={userKeywords.length === 0}
                className="flex-1 py-4 bg-[#E3262E] hover:bg-[#f4333b] disabled:opacity-50 text-white font-bold text-sm rounded-2xl shadow-xl shadow-[#E3262E]/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Continue to Platforms</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: CONNECT PLATFORMS */}
        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex items-center gap-4 mb-6">
              <SamuraiMascot state="focused" size="sm" />
              <div>
                <h2 className="text-2xl font-black text-[#F5F5F5]">Where do you want to fight?</h2>
                <p className="text-xs text-[#A1A1AA] mt-1">
                  Connect official accounts via OAuth 2.0 PKCE authorization.
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-8">
              {accounts.map((acc) => (
                <div
                  key={acc.id}
                  className="flex items-center justify-between p-4 bg-[#080808] border border-white/10 rounded-2xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#171717] border border-white/10 flex items-center justify-center font-black text-sm uppercase text-[#F5F5F5]">
                      {acc.platform === 'x' ? '𝕏' : acc.platform === 'reddit' ? 'r/' : 'in'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#F5F5F5] uppercase">
                          {acc.platform === 'x' ? 'X (Twitter)' : acc.platform}
                        </span>
                        {acc.connected && (
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold">
                            CONNECTED
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#A1A1AA]">{acc.connected ? acc.handle : 'Not connected yet'}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleConnectPlatform(acc.platform)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                      acc.connected
                        ? 'bg-[#171717] border border-white/10 text-emerald-400 hover:text-red-400'
                        : 'bg-[#E3262E] text-white hover:bg-[#f4333b]'
                    }`}
                  >
                    <span>{acc.connected ? 'Connected' : 'Connect'}</span>
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="py-4 px-6 bg-[#171717] hover:bg-[#1C1C1E] border border-white/10 text-[#A1A1AA] hover:text-[#F5F5F5] font-bold text-sm rounded-2xl transition flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={handleFinish}
                className="flex-1 py-4 bg-gradient-to-r from-[#E3262E] to-[#7F1015] hover:from-[#f4333b] hover:to-[#911319] text-white font-black text-sm rounded-2xl shadow-xl shadow-[#E3262E]/30 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>ENTER THE DOJO ⚔️</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
