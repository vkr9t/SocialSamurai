import React, { useState } from 'react';
import { Target, Zap, Filter, ArrowUpDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { OpportunityCard } from './OpportunityCard';
import { PlatformType } from '../../types';
import { EmptyState } from '../Common/EmptyState';

export const OpportunitiesView: React.FC = () => {
  const { opportunities, scanForOpportunities } = useApp();
  const [platformFilter, setPlatformFilter] = useState<'all' | PlatformType>('all');
  const [sortBy, setSortBy] = useState<'match' | 'newest' | 'engagement'>('match');

  const filteredOpps = opportunities
    .filter((o) => !o.dismissed)
    .filter((o) => (platformFilter === 'all' ? true : o.platform === platformFilter))
    .sort((a, b) => {
      if (sortBy === 'match') return b.relevanceScore - a.relevanceScore;
      if (sortBy === 'engagement') return b.engagement.likes - a.engagement.likes;
      return 0; // default order
    });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#111111] border border-white/10 p-6 rounded-3xl">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-black text-[#F5F5F5] tracking-tight">Your Battlefield.</h1>
            <span className="text-xs bg-[#E3262E]/20 text-[#E3262E] px-2.5 py-1 rounded-full font-bold">
              {filteredOpps.length} ACTIVE
            </span>
          </div>
          <p className="text-xs text-[#A1A1AA] mt-1">
            Conversations worth your attention. AI curated & intent scored in real-time.
          </p>
        </div>

        <button
          onClick={scanForOpportunities}
          className="py-3 px-5 bg-gradient-to-r from-[#E3262E] to-[#7F1015] hover:from-[#f4333b] hover:to-[#911319] text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-xl shadow-[#E3262E]/25 transition flex items-center justify-center gap-2 shrink-0 active:scale-95"
        >
          <Zap className="w-4 h-4 fill-white" />
          <span>RUN AI SCAN</span>
        </button>
      </div>

      {/* Filter & Sort Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#171717] border border-white/10 p-3 rounded-2xl">
        {/* Platform Tabs */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          {(['all', 'x', 'reddit', 'linkedin'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPlatformFilter(p)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition uppercase whitespace-nowrap ${
                platformFilter === p
                  ? 'bg-[#E3262E] text-white shadow-md shadow-[#E3262E]/20'
                  : 'bg-[#111111] text-[#A1A1AA] hover:text-[#F5F5F5]'
              }`}
            >
              {p === 'all' ? 'All Battlefield' : p === 'x' ? '𝕏' : p === 'reddit' ? 'Reddit' : 'LinkedIn'}
            </button>
          ))}
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end text-xs text-[#A1A1AA]">
          <ArrowUpDown className="w-3.5 h-3.5 text-[#E3262E]" />
          <span>Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'match' | 'newest' | 'engagement')}
            className="bg-[#111111] border border-white/10 text-[#F5F5F5] font-semibold px-3 py-1.5 rounded-xl focus:outline-none focus:border-[#E3262E]"
          >
            <option value="match">Best Match</option>
            <option value="newest">Newest First</option>
            <option value="engagement">Highest Engagement</option>
          </select>
        </div>
      </div>

      {/* Feed List */}
      {filteredOpps.length === 0 ? (
        <EmptyState
          title="The battlefield is quiet."
          subtitle="No opportunities match your current filter. Run a fresh scan or adjust your keywords."
          mascotState="thinking"
          actionLabel="Run AI Scan"
          onAction={scanForOpportunities}
        />
      ) : (
        <div className="space-y-4">
          {filteredOpps.map((opp) => (
            <OpportunityCard key={opp.id} opportunity={opp} />
          ))}
        </div>
      )}
    </div>
  );
};
