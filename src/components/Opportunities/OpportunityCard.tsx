import React from 'react';
import { Opportunity } from '../../types';
import { useApp } from '../../context/AppContext';
import { Check, Sparkles, Bookmark, EyeOff, MessageSquare, ThumbsUp, Repeat } from 'lucide-react';

interface OpportunityCardProps {
  opportunity: Opportunity;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity }) => {
  const { setActiveReplyModal, saveOpportunity, dismissOpportunity } = useApp();

  return (
    <div
      className={`bg-[#171717] border border-white/10 hover:border-[#E3262E]/40 rounded-3xl p-5 sm:p-6 transition-all duration-200 shadow-xl relative group ${
        opportunity.replied ? 'border-emerald-500/40 bg-emerald-950/10' : ''
      }`}
    >
      {/* Top Bar: Match Score & Platform Tag */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {/* Match Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E3262E]/15 border border-[#E3262E]/50 text-[#E3262E] text-xs font-black tracking-wide">
            <Sparkles className="w-3.5 h-3.5 fill-[#E3262E]" />
            <span>{opportunity.relevanceScore}% MATCH</span>
          </div>

          {/* Intent Tag */}
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#111111] border border-white/10 text-[#F5F5F5]">
            {opportunity.intentTag}
          </span>
        </div>

        {/* Platform Badge */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#A1A1AA]">{opportunity.postedAge}</span>
          <span className="w-7 h-7 rounded-xl bg-[#080808] border border-white/10 flex items-center justify-center font-black text-xs text-[#F5F5F5] uppercase">
            {opportunity.platform === 'x' ? '𝕏' : opportunity.platform === 'reddit' ? 'r/' : 'in'}
          </span>
        </div>
      </div>

      {/* Author & Post Body */}
      <div className="flex items-start gap-3 mb-4">
        <img
          src={opportunity.authorAvatar}
          alt={opportunity.authorName}
          className="w-10 h-10 rounded-full object-cover border border-white/10 shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-extrabold text-[#F5F5F5] truncate">
              {opportunity.authorName}
            </span>
            <span className="text-xs text-[#A1A1AA] truncate">{opportunity.authorHandle}</span>
          </div>
          <p className="text-sm text-[#F5F5F5] mt-1.5 leading-relaxed font-normal">
            "{opportunity.postContent}"
          </p>
        </div>
      </div>

      {/* Engagement Stats */}
      <div className="flex items-center gap-4 text-xs text-[#A1A1AA] mb-4 pb-3 border-b border-white/5">
        <span className="flex items-center gap-1">
          <ThumbsUp className="w-3.5 h-3.5" /> {opportunity.engagement.likes}
        </span>
        <span className="flex items-center gap-1">
          <MessageSquare className="w-3.5 h-3.5" /> {opportunity.engagement.replies}
        </span>
        {opportunity.engagement.reposts !== undefined && (
          <span className="flex items-center gap-1">
            <Repeat className="w-3.5 h-3.5" /> {opportunity.engagement.reposts}
          </span>
        )}
        <span className="text-white/20">•</span>
        <span className="text-[#E3262E] font-medium">Topic: {opportunity.matchedTopic}</span>
      </div>

      {/* Why Samurai Picked This (AI Reasoning) */}
      <div className="bg-[#111111] border border-white/5 rounded-2xl p-3.5 mb-5 space-y-2">
        <p className="text-[11px] font-extrabold text-[#A1A1AA] uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E3262E]" /> WHY SAMURAI PICKED THIS
        </p>
        <p className="text-xs text-[#F5F5F5] leading-snug">{opportunity.aiReasoning}</p>

        <div className="grid grid-cols-2 gap-1.5 text-[11px] text-[#A1A1AA] pt-1">
          <span className="flex items-center gap-1 text-emerald-400 font-medium">
            <Check className="w-3 h-3 stroke-[3]" /> Matches {opportunity.matchedTopic}
          </span>
          <span className="flex items-center gap-1 text-emerald-400 font-medium">
            <Check className="w-3 h-3 stroke-[3]" /> High-intent conversation
          </span>
          <span className="flex items-center gap-1 text-emerald-400 font-medium">
            <Check className="w-3 h-3 stroke-[3]" /> Active audience reply window
          </span>
          <span className="flex items-center gap-1 text-emerald-400 font-medium">
            <Check className="w-3 h-3 stroke-[3]" /> Zero bot spam duplicate
          </span>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => saveOpportunity(opportunity.id)}
            className={`p-2.5 rounded-xl border text-xs font-semibold transition ${
              opportunity.saved
                ? 'bg-[#E3262E]/20 border-[#E3262E] text-[#E3262E]'
                : 'bg-[#111111] border-white/10 text-[#A1A1AA] hover:text-[#F5F5F5]'
            }`}
            title="Save Opportunity"
          >
            <Bookmark className="w-4 h-4" />
          </button>

          <button
            onClick={() => dismissOpportunity(opportunity.id)}
            className="p-2.5 rounded-xl bg-[#111111] border border-white/10 text-[#A1A1AA] hover:text-red-400 transition"
            title="Dismiss Opportunity"
          >
            <EyeOff className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={() => setActiveReplyModal(opportunity)}
          className={`flex-1 sm:flex-initial py-3 px-5 rounded-2xl font-extrabold text-xs tracking-wider uppercase shadow-xl transition flex items-center justify-center gap-2 ${
            opportunity.replied
              ? 'bg-emerald-600 text-white shadow-emerald-600/20'
              : 'bg-gradient-to-r from-[#E3262E] to-[#7F1015] hover:from-[#f4333b] hover:to-[#911319] text-white shadow-[#E3262E]/25 active:scale-98'
          }`}
        >
          <Sparkles className="w-4 h-4 fill-white" />
          <span>{opportunity.replied ? 'REPLY QUEUED ⚔️' : 'GENERATE REPLY'}</span>
        </button>
      </div>
    </div>
  );
};
