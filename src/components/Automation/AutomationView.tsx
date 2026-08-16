import React, { useState } from 'react';
import { Zap, ShieldCheck, Check, Sliders, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AutomationView: React.FC = () => {
  const { subscription, setActiveUpgradeModal } = useApp();

  const [requireApproval, setRequireApproval] = useState<boolean>(true);
  const [maxOpsPerDay, setMaxOpsPerDay] = useState<number>(25);
  const [repliesPerDay, setRepliesPerDay] = useState<number>(5);
  const [postsPerDay, setPostsPerDay] = useState<number>(2);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-[#111111] border border-white/10 p-6 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-black text-[#F5F5F5] tracking-tight">Automation Rules</h1>
            <span className="text-xs bg-[#E3262E]/20 text-[#E3262E] px-2.5 py-1 rounded-full font-bold">
              SAMURAI PRO
            </span>
          </div>
          <p className="text-xs text-[#A1A1AA] mt-1">
            Configure automated discovery & draft generation while preserving Human Approval safety.
          </p>
        </div>

        {subscription.plan === 'free' && (
          <button
            onClick={() => setActiveUpgradeModal(true)}
            className="py-2.5 px-5 bg-[#E3262E] text-white text-xs font-bold rounded-2xl"
          >
            Unlock Automation — $19
          </button>
        )}
      </div>

      {/* Safety Banner */}
      <div className="bg-[#171717] border border-emerald-500/40 rounded-3xl p-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-[#F5F5F5]">Strict Platform Policy Compliance</h3>
          <p className="text-xs text-[#A1A1AA] mt-1 leading-relaxed">
            SocialSamurai strictly respects X, Reddit, and LinkedIn Automation Rules. Unattended bot posting loops are prohibited. All publishing requires a same-session human approval tap.
          </p>
        </div>
      </div>

      {/* Configuration Controls */}
      <div className="bg-[#171717] border border-white/10 rounded-3xl p-6 space-y-6">
        {/* Require Approval Toggle */}
        <div className="flex items-center justify-between p-4 bg-[#080808] border border-white/10 rounded-2xl">
          <div>
            <span className="text-sm font-bold text-[#F5F5F5] block">Require Human Approval</span>
            <span className="text-xs text-[#A1A1AA]">
              Every draft must be reviewed before hitting the platform API.
            </span>
          </div>

          <button
            onClick={() => setRequireApproval(!requireApproval)}
            className={`w-14 h-8 rounded-full p-1 transition duration-300 flex items-center ${
              requireApproval ? 'bg-[#E3262E] justify-end' : 'bg-zinc-700 justify-start'
            }`}
          >
            <span className="w-6 h-6 rounded-full bg-white shadow-md" />
          </button>
        </div>

        {/* Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#080808] border border-white/10 p-4 rounded-2xl space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-[#F5F5F5]">Max Opportunities / Day</span>
              <span className="text-[#E3262E]">{maxOpsPerDay}</span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              value={maxOpsPerDay}
              onChange={(e) => setMaxOpsPerDay(Number(e.target.value))}
              className="w-full accent-[#E3262E]"
            />
          </div>

          <div className="bg-[#080808] border border-white/10 p-4 rounded-2xl space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-[#F5F5F5]">Replies Limit / Day</span>
              <span className="text-[#E3262E]">{repliesPerDay}</span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              value={repliesPerDay}
              onChange={(e) => setRepliesPerDay(Number(e.target.value))}
              className="w-full accent-[#E3262E]"
            />
          </div>

          <div className="bg-[#080808] border border-white/10 p-4 rounded-2xl space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-[#F5F5F5]">Posts Limit / Day</span>
              <span className="text-[#E3262E]">{postsPerDay}</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={postsPerDay}
              onChange={(e) => setPostsPerDay(Number(e.target.value))}
              className="w-full accent-[#E3262E]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
