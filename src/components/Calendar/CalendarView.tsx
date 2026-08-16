import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Trash2, Edit3, Plus, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CalendarView: React.FC = () => {
  const { scheduledPosts, subscription, setActiveUpgradeModal, setCurrentView } = useApp();
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');

  const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-[#111111] border border-white/10 p-6 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#F5F5F5] tracking-tight">Social Calendar</h1>
          <p className="text-xs text-[#A1A1AA] mt-1">
            Manage your AI-curated queue. Automated publishing strictly upon human approval.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-[#171717] p-1 rounded-2xl border border-white/10 text-xs">
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1.5 rounded-xl font-bold transition ${
                viewMode === 'week' ? 'bg-[#E3262E] text-white' : 'text-[#A1A1AA]'
              }`}
            >
              Week View
            </button>
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1.5 rounded-xl font-bold transition ${
                viewMode === 'month' ? 'bg-[#E3262E] text-white' : 'text-[#A1A1AA]'
              }`}
            >
              Month View
            </button>
          </div>

          <button
            onClick={() => setCurrentView('create')}
            className="py-2.5 px-4 bg-[#E3262E] hover:bg-[#f4333b] text-white text-xs font-bold rounded-2xl shadow-lg transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>New Post</span>
          </button>
        </div>
      </div>

      {/* Upgrade Banner for Free Users */}
      {subscription.plan === 'free' && (
        <div className="bg-[#171717] border border-[#E3262E]/40 rounded-2xl p-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#E3262E] shrink-0" />
            <p className="text-xs text-[#F5F5F5]">
              Free Plan includes 3 scheduled posts. <span className="font-bold">Upgrade to Samurai</span> for unlimited multi-channel scheduling.
            </p>
          </div>
          <button
            onClick={() => setActiveUpgradeModal(true)}
            className="px-4 py-2 bg-[#E3262E] text-white text-xs font-bold rounded-xl whitespace-nowrap"
          >
            Upgrade — $19
          </button>
        </div>
      )}

      {/* Calendar Grid Header */}
      <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-[#A1A1AA] uppercase pb-2 border-b border-white/10">
        {DAYS.map((day) => (
          <div key={day} className="py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Slot Grid */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
        {DAYS.map((day, idx) => {
          const isToday = idx === 0; // Monday
          return (
            <div
              key={day}
              className={`min-h-48 bg-[#171717] border rounded-2xl p-3 flex flex-col justify-between ${
                isToday ? 'border-[#E3262E]' : 'border-white/10'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-bold ${isToday ? 'text-[#E3262E]' : 'text-[#F5F5F5]'}`}>
                    {day} {16 + idx} Aug
                  </span>
                  {isToday && (
                    <span className="text-[9px] bg-[#E3262E] text-white px-1.5 py-0.5 rounded font-extrabold">
                      TODAY
                    </span>
                  )}
                </div>

                {/* Scheduled items matching day */}
                {idx < scheduledPosts.length ? (
                  <div className="bg-[#080808] border border-white/10 rounded-xl p-2.5 space-y-1.5 shadow-md">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-bold text-[#E3262E] uppercase">
                        {scheduledPosts[idx].platform}
                      </span>
                      <span className="text-[#A1A1AA] flex items-center gap-0.5">
                        <Clock className="w-3 h-3" /> {scheduledPosts[idx].scheduledTime}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#F5F5F5] line-clamp-3 leading-snug">
                      {scheduledPosts[idx].content}
                    </p>
                  </div>
                ) : (
                  <div className="h-24 border border-dashed border-white/10 rounded-xl flex items-center justify-center text-[10px] text-zinc-600">
                    Slot Available
                  </div>
                )}
              </div>

              <button
                onClick={() => setCurrentView('create')}
                className="mt-2 w-full py-1 text-[10px] text-[#A1A1AA] hover:text-[#F5F5F5] bg-[#111111] hover:bg-[#1C1C1E] rounded-lg transition"
              >
                + Schedule
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
