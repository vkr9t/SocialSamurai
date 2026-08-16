import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SamuraiMascot } from '../Mascot/SamuraiMascot';
import { Check, Sparkles, X } from 'lucide-react';
import { sounds } from '../../utils/audio';

export const PricingModal: React.FC = () => {
  const { activeUpgradeModal, setActiveUpgradeModal, upgradeSubscription } = useApp();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  if (!activeUpgradeModal) return null;

  const handleUpgrade = () => {
    sounds.playClick();
    upgradeSubscription(billingCycle);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#080808]/95 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto">
      <div className="max-w-3xl w-full bg-[#111111] border border-[#E3262E]/50 rounded-3xl p-6 sm:p-8 shadow-2xl relative my-auto max-h-[92vh] overflow-y-auto">
        <button
          onClick={() => setActiveUpgradeModal(false)}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#171717] text-[#A1A1AA] hover:text-[#F5F5F5] transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Mascot & Headline */}
        <div className="text-center mb-6">
          <SamuraiMascot state="excited" size="md" showSpeechBubble speechText="Become a Samurai ⚔️" className="mb-2" />
          <h2 className="text-2xl sm:text-3xl font-black text-[#F5F5F5] tracking-tight">Choose Your Path</h2>
          <p className="text-xs text-[#A1A1AA] mt-1">
            Unlock the full battlefield. Unlimited AI replies, priority curation, and AI fine-tuning.
          </p>

          {/* Monthly / Yearly Toggle */}
          <div className="inline-flex items-center bg-[#080808] border border-white/10 p-1.5 rounded-2xl mt-4 text-xs font-bold">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-xl transition ${
                billingCycle === 'monthly' ? 'bg-[#171717] text-[#F5F5F5]' : 'text-[#A1A1AA]'
              }`}
            >
              Monthly Billing ($19/mo)
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${
                billingCycle === 'yearly' ? 'bg-[#E3262E] text-white shadow-md shadow-[#E3262E]/30' : 'text-[#A1A1AA]'
              }`}
            >
              <span>Yearly ($140/yr)</span>
              <span className="text-[9px] bg-white/20 px-1.5 py-0.5 rounded-md font-extrabold">SAVE 39%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          {/* FREE PLAN CARD */}
          <div className="bg-[#171717] border border-white/10 rounded-3xl p-5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider">FREE PLAN</span>
              <div className="flex items-baseline gap-1 my-2">
                <span className="text-3xl font-black text-[#F5F5F5]">$0</span>
                <span className="text-xs text-[#A1A1AA]">/month</span>
              </div>
              <p className="text-xs text-[#A1A1AA] mb-4">Essential opportunity discovery for starters.</p>

              <div className="space-y-2 text-xs text-[#F5F5F5] border-t border-white/5 pt-3">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" /> 2 Connected Accounts
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" /> 3 AI Opportunities / Day
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" /> 10 AI Reply Drafts / Month
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" /> 10 Daily Arcade Credits
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveUpgradeModal(false)}
              className="mt-6 w-full py-3 bg-[#080808] border border-white/10 hover:bg-[#111111] text-[#A1A1AA] font-bold text-xs rounded-2xl transition"
            >
              Current Dojo Plan
            </button>
          </div>

          {/* SAMURAI PLAN CARD (Emphasized) */}
          <div className="bg-gradient-to-br from-[#171717] via-[#1C1C1E] to-[#7F1015]/30 border-2 border-[#E3262E] rounded-3xl p-5 flex flex-col justify-between relative shadow-2xl shadow-[#E3262E]/20">
            <span className="absolute -top-3.5 right-6 bg-[#E3262E] text-white text-[10px] font-black tracking-widest px-3 py-1 rounded-full shadow-lg uppercase">
              MOST POPULAR ⚔️
            </span>

            <div>
              <span className="text-xs font-black text-[#E3262E] uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> SAMURAI PLAN
              </span>

              <div className="flex items-baseline gap-1 my-2">
                <span className="text-3xl font-black text-[#F5F5F5]">
                  {billingCycle === 'yearly' ? '$140' : '$19'}
                </span>
                <span className="text-xs text-[#A1A1AA]">
                  {billingCycle === 'yearly' ? '/year ($11.6/mo)' : '/month'}
                </span>
              </div>
              <p className="text-xs text-[#A1A1AA] mb-4">Complete command center with unlimited AI actions.</p>

              <div className="space-y-2 text-xs text-[#F5F5F5] border-t border-white/10 pt-3">
                <div className="flex items-center gap-2 font-semibold">
                  <Check className="w-4 h-4 text-[#E3262E] shrink-0" /> 5+ Social Accounts
                </div>
                <div className="flex items-center gap-2 font-semibold">
                  <Check className="w-4 h-4 text-[#E3262E] shrink-0" /> 25 Opportunities / Day
                </div>
                <div className="flex items-center gap-2 font-semibold">
                  <Check className="w-4 h-4 text-[#E3262E] shrink-0" /> Unlimited AI Reply Drafts & Posts
                </div>
                <div className="flex items-center gap-2 font-semibold">
                  <Check className="w-4 h-4 text-[#E3262E] shrink-0" /> AI Tone Learning & Memory
                </div>
                <div className="flex items-center gap-2 font-semibold">
                  <Check className="w-4 h-4 text-[#E3262E] shrink-0" /> Cross-Platform Adaptation Engine
                </div>
              </div>
            </div>

            <button
              onClick={handleUpgrade}
              className="mt-6 w-full py-3.5 bg-gradient-to-r from-[#E3262E] to-[#7F1015] hover:from-[#f4333b] hover:to-[#911319] text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-[#E3262E]/40 transition active:scale-98"
            >
              BECOME A SAMURAI ⚔️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
