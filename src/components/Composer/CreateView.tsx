import React, { useState } from 'react';
import { PenTool, Sparkles, Send, Calendar, Check, Copy } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SamuraiMascot } from '../Mascot/SamuraiMascot';

export const CreateView: React.FC = () => {
  const { scheduleNewPost, useUserCredits } = useApp();

  const [prompt, setPrompt] = useState<string>(
    'We just launched SocialSamurai — an AI social command center with real 60s fighting mini game and human approval workflow.'
  );

  const [isAdapting, setIsAdapting] = useState<boolean>(false);
  const [adapted, setAdapted] = useState<boolean>(true);

  // Adapted content states
  const [xPost, setXPost] = useState<string>(
    '⚔️ SocialSamurai is LIVE!\n\nStop scrolling through hundreds of posts. Use AI to discover conversations, score intent, draft replies, and review in 1 tap.\n\nPlus: Play a 60s samurai fighting game daily to earn AI credits 🥷.\n\nCheck out socialsamurai.in #BuildInPublic #AI'
  );

  const [linkedInPost, setLinkedInPost] = useState<string>(
    'Unattended bot spam is destroying brand authenticity on social media.\n\nThat is why we built SocialSamurai: an AI-powered command center that puts Human Approval at the center of every single action.\n\nKey Highlights:\n• AI-curated signal discovery across X, Reddit, and LinkedIn\n• Intent scoring & context classification\n• 1-tap review & approve before publishing\n• Playable 60-second arcade mini-game for daily credit rewards\n\nBuilt for founders and creators who want disciplined organic growth.'
  );

  const [redditPost, setRedditPost] = useState<string>(
    'r/SaaS: We built a 60-second 2D fighting game inside our AI SaaS command center to solve daily user retention.\n\nHey founders! Most SaaS apps rely on email reminders to bring users back. We decided to test a 60s arcade mini-game ("Samurai: Last Stand") where users fight wave enemies to refill daily AI credits.\n\nHere is how we architected it with HTML5 Canvas + Web Audio API...'
  );

  const [publishedSuccess, setPublishedSuccess] = useState<boolean>(false);

  const handleGenerateAdaptations = () => {
    if (!useUserCredits(5)) return;
    setIsAdapting(true);
    setTimeout(() => {
      setIsAdapting(false);
      setAdapted(true);
    }, 600);
  };

  const handleScheduleAll = () => {
    scheduleNewPost({
      platform: 'x',
      content: xPost,
      scheduledTime: 'Today at 6:00 PM',
      status: 'scheduled',
    });
    setPublishedSuccess(true);
    setTimeout(() => setPublishedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-[#111111] border border-white/10 p-6 sm:p-8 rounded-3xl relative overflow-hidden">
        <div className="flex items-center gap-4">
          <SamuraiMascot state="working" size="md" />
          <div>
            <span className="text-xs font-mono font-bold text-[#E3262E] uppercase">CROSS-PLATFORM ENGINE</span>
            <h1 className="text-3xl font-black text-[#F5F5F5] tracking-tight">Create & Adapt Content</h1>
            <p className="text-xs text-[#A1A1AA] mt-1">
              Create once. SocialSamurai adapts native tone, length, and formatting across all your platforms.
            </p>
          </div>
        </div>
      </div>

      {/* Input Box */}
      <div className="bg-[#171717] border border-white/10 rounded-3xl p-5 sm:p-6 space-y-4">
        <label className="block text-xs font-bold text-[#F5F5F5] uppercase tracking-wider">
          What do you want to say?
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={3}
          placeholder="Type your core idea or update here..."
          className="w-full bg-[#080808] border border-white/10 rounded-2xl p-4 text-sm text-[#F5F5F5] placeholder-[#A1A1AA] focus:outline-none focus:border-[#E3262E] transition resize-none"
        />

        <div className="flex items-center justify-between">
          <span className="text-xs text-[#A1A1AA]">Cost: 5 Samurai Credits</span>
          <button
            onClick={handleGenerateAdaptations}
            disabled={isAdapting || !prompt.trim()}
            className="py-3 px-6 bg-gradient-to-r from-[#E3262E] to-[#7F1015] hover:from-[#f4333b] hover:to-[#911319] text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl shadow-[#E3262E]/25 transition flex items-center gap-2 active:scale-95 disabled:opacity-50"
          >
            <Sparkles className={`w-4 h-4 fill-white ${isAdapting ? 'animate-spin' : ''}`} />
            <span>{isAdapting ? 'ADAPTING POSTS...' : 'GENERATE NATIVE POSTS'}</span>
          </button>
        </div>
      </div>

      {/* Banner */}
      <div className="text-center py-2 border-y border-white/5">
        <span className="text-xs font-black text-[#A1A1AA] tracking-widest uppercase flex items-center justify-center gap-2">
          <span>CREATE ONCE</span>
          <span className="text-[#E3262E]">↓</span>
          <span>ADAPT EVERYWHERE</span>
        </span>
      </div>

      {/* Adapted Platform Cards */}
      {adapted && (
        <div className="space-y-4">
          {/* X Version */}
          <div className="bg-[#171717] border border-white/10 rounded-3xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-xl bg-[#080808] border border-white/10 flex items-center justify-center font-black text-xs text-[#F5F5F5]">
                  𝕏
                </span>
                <span className="text-sm font-bold text-[#F5F5F5]">X (Twitter) Version</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold">
                  SHORT & THREADABLE
                </span>
              </div>
              <span className="text-xs font-mono text-[#A1A1AA]">{xPost.length} / 280</span>
            </div>

            <textarea
              value={xPost}
              onChange={(e) => setXPost(e.target.value)}
              rows={4}
              className="w-full bg-[#080808] border border-white/10 rounded-2xl p-3.5 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#E3262E] transition leading-relaxed resize-none"
            />
          </div>

          {/* LinkedIn Version */}
          <div className="bg-[#171717] border border-white/10 rounded-3xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-xl bg-[#080808] border border-white/10 flex items-center justify-center font-black text-xs text-[#F5F5F5]">
                  in
                </span>
                <span className="text-sm font-bold text-[#F5F5F5]">LinkedIn Version</span>
                <span className="text-[10px] bg-blue-500/20 text-blue-400 border border-blue-500/40 px-2 py-0.5 rounded-full font-bold">
                  PROFESSIONAL STORYTELLING
                </span>
              </div>
              <span className="text-xs font-mono text-[#A1A1AA]">{linkedInPost.length} chars</span>
            </div>

            <textarea
              value={linkedInPost}
              onChange={(e) => setLinkedInPost(e.target.value)}
              rows={5}
              className="w-full bg-[#080808] border border-white/10 rounded-2xl p-3.5 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#E3262E] transition leading-relaxed resize-none"
            />
          </div>

          {/* Reddit Version */}
          <div className="bg-[#171717] border border-white/10 rounded-3xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-xl bg-[#080808] border border-white/10 flex items-center justify-center font-black text-xs text-[#F5F5F5]">
                  r/
                </span>
                <span className="text-sm font-bold text-[#F5F5F5]">Reddit Version</span>
                <span className="text-[10px] bg-orange-500/20 text-orange-400 border border-orange-500/40 px-2 py-0.5 rounded-full font-bold">
                  COMMUNITY VALUE & TRANSPARENCY
                </span>
              </div>
              <span className="text-xs font-mono text-[#A1A1AA]">{redditPost.length} chars</span>
            </div>

            <textarea
              value={redditPost}
              onChange={(e) => setRedditPost(e.target.value)}
              rows={5}
              className="w-full bg-[#080808] border border-white/10 rounded-2xl p-3.5 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#E3262E] transition leading-relaxed resize-none"
            />
          </div>

          {/* Schedule All CTA */}
          <div className="pt-2">
            <button
              onClick={handleScheduleAll}
              className="w-full py-4 bg-[#E3262E] hover:bg-[#f4333b] text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-xl shadow-[#E3262E]/30 transition flex items-center justify-center gap-2 active:scale-98"
            >
              <Calendar className="w-4 h-4" />
              <span>APPROVE & SCHEDULE ALL POSTS ⚔️</span>
            </button>
            {publishedSuccess && (
              <p className="text-xs font-bold text-emerald-400 text-center mt-2 flex items-center justify-center gap-1">
                <Check className="w-4 h-4" /> Posts queued in Social Calendar!
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
