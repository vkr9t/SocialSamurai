import React from 'react';
import { BarChart3, TrendingUp, Users, MessageSquare, Eye, Brain, Sparkles, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AnalyticsView: React.FC = () => {
  const { preferences, subscription, setActiveUpgradeModal } = useApp();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-[#111111] border border-white/10 p-6 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#F5F5F5] tracking-tight">Performance & AI Learning</h1>
          <p className="text-xs text-[#A1A1AA] mt-1">
            Track reach, engagement rates, and see how SocialSamurai learns from your approvals.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-3 py-1 rounded-full font-bold">
            ● AI LEARNING ACTIVE
          </span>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#171717] border border-white/10 rounded-2xl p-5">
          <span className="text-xs text-[#A1A1AA] font-semibold">Total Followers</span>
          <p className="text-2xl font-black text-[#F5F5F5] mt-1">14,820</p>
          <span className="text-[11px] text-emerald-400 font-medium">+12.4% this month</span>
        </div>

        <div className="bg-[#171717] border border-white/10 rounded-2xl p-5">
          <span className="text-xs text-[#A1A1AA] font-semibold">Avg Engagement</span>
          <p className="text-2xl font-black text-[#F5F5F5] mt-1">4.7%</p>
          <span className="text-[11px] text-emerald-400 font-medium">2.7× tech content boost</span>
        </div>

        <div className="bg-[#171717] border border-white/10 rounded-2xl p-5">
          <span className="text-xs text-[#A1A1AA] font-semibold">AI Approved Replies</span>
          <p className="text-2xl font-black text-[#F5F5F5] mt-1">284</p>
          <span className="text-[11px] text-[#A1A1AA]">98% approval rate</span>
        </div>

        <div className="bg-[#171717] border border-white/10 rounded-2xl p-5">
          <span className="text-xs text-[#A1A1AA] font-semibold">Total Reach</span>
          <p className="text-2xl font-black text-[#F5F5F5] mt-1">84.2K</p>
          <span className="text-[11px] text-emerald-400 font-medium">+28.5K impressions</span>
        </div>
      </div>

      {/* YOUR SAMURAI IS LEARNING SECTION */}
      <div className="bg-gradient-to-br from-[#111111] via-[#171717] to-[#1C1C1E] border border-[#E3262E]/40 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E3262E]/20 border border-[#E3262E] flex items-center justify-center text-[#E3262E]">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-[#E3262E] uppercase">SAMURAI PLAN FEATURE</span>
              <h2 className="text-2xl font-black text-[#F5F5F5]">YOUR SAMURAI IS LEARNING</h2>
            </div>
          </div>

          {subscription.plan === 'free' && (
            <button
              onClick={() => setActiveUpgradeModal(true)}
              className="py-2 px-4 bg-[#E3262E] text-white text-xs font-bold rounded-xl"
            >
              Unlock Fine-Tuning — $19
            </button>
          )}
        </div>

        <p className="text-xs text-[#A1A1AA] mb-6">
          SocialSamurai continuously adapts to your tone, approved edits, rejected suggestions, and audience response patterns.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {preferences.map((pref) => (
            <div
              key={pref.id}
              className="bg-[#080808] border border-white/10 rounded-2xl p-4 space-y-2 relative"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#E3262E]">{pref.category}</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold">
                  {pref.confidence}% CONFIDENCE
                </span>
              </div>
              <p className="text-xs text-[#F5F5F5] font-semibold leading-relaxed">
                "{pref.insight}"
              </p>
              <span className="text-[10px] text-[#A1A1AA] block">{pref.updatedAt}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Platform Comparison */}
      <div className="bg-[#171717] border border-white/10 rounded-3xl p-6 space-y-4">
        <h3 className="text-lg font-black text-[#F5F5F5]">Platform Performance Breakdown</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-[#F5F5F5]">X (Twitter) — High Velocity</span>
              <span className="text-[#E3262E] font-bold">64% of total engagement</span>
            </div>
            <div className="w-full bg-[#080808] h-3 rounded-full overflow-hidden p-0.5 border border-white/5">
              <div className="bg-[#E3262E] h-full rounded-full w-[64%]" />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-[#F5F5F5]">Reddit — Deep Discussion</span>
              <span className="text-orange-400 font-bold">28% of total engagement</span>
            </div>
            <div className="w-full bg-[#080808] h-3 rounded-full overflow-hidden p-0.5 border border-white/5">
              <div className="bg-orange-500 h-full rounded-full w-[28%]" />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-[#F5F5F5]">LinkedIn — Professional Intent</span>
              <span className="text-blue-400 font-bold">8% of total engagement</span>
            </div>
            <div className="w-full bg-[#080808] h-3 rounded-full overflow-hidden p-0.5 border border-white/5">
              <div className="bg-blue-500 h-full rounded-full w-[8%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
