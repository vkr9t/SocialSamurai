import React, { useState, useEffect } from 'react';
import { Opportunity } from '../../types';
import { useApp } from '../../context/AppContext';
import { SamuraiMascot } from '../Mascot/SamuraiMascot';
import { Sparkles, Shield, RefreshCw, CheckCircle2, X, Send, Sliders } from 'lucide-react';
import { sounds } from '../../utils/audio';

export const ReplyModal: React.FC = () => {
  const { activeReplyModal, setActiveReplyModal, approveAndPublishReply } = useApp();

  const [selectedTone, setSelectedTone] = useState<'Thoughtful' | 'Short' | 'Technical' | 'Witty'>('Thoughtful');
  const [draftText, setDraftText] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  // Pre-generate drafts for the 4 tones
  const TONE_DRAFTS: Record<'Thoughtful' | 'Short' | 'Technical' | 'Witty', string> = {
    Thoughtful:
      "Great question! We've found that early-stage keyword tracking works best when you set strict intent filters before human review. Zero auto-posting, pure signal discovery.",
    Short:
      "Focus on intent scoring + human approval. Autoposting loops get rate limited fast. Co-pilots win.",
    Technical:
      "We implement a multi-stage funnel: 1. OAuth 2.0 PKCE 2. Recent Search poll (cached 15m) 3. LLM JSON relevance scoring (>0.6) 4. Human tap to publish via POST /2/tweets.",
    Witty:
      "Unattended bot spam is so 2024 🙅‍♂️. Use an AI Samurai to discover the signals, review in 1 tap, and keep your account safe!",
  };

  useEffect(() => {
    if (activeReplyModal) {
      setDraftText(TONE_DRAFTS.Thoughtful);
      setSelectedTone('Thoughtful');
      setShowCelebration(false);
    }
  }, [activeReplyModal]);

  if (!activeReplyModal) return null;

  const handleSelectTone = (tone: 'Thoughtful' | 'Short' | 'Technical' | 'Witty') => {
    sounds.playClick();
    setSelectedTone(tone);
    setIsGenerating(true);
    setTimeout(() => {
      setDraftText(TONE_DRAFTS[tone]);
      setIsGenerating(false);
    }, 300);
  };

  const handleRegenerate = () => {
    sounds.playClick();
    setIsGenerating(true);
    setTimeout(() => {
      setDraftText(
        `${TONE_DRAFTS[selectedTone]} (Refined for maximum engagement based on your style)`
      );
      setIsGenerating(false);
    }, 400);
  };

  const handleApprove = () => {
    const success = approveAndPublishReply(activeReplyModal.id, draftText);
    if (success) {
      setShowCelebration(true);
      setTimeout(() => {
        setActiveReplyModal(null);
      }, 1800);
    }
  };

  const charLimit = activeReplyModal.platform === 'x' ? 280 : 1000;
  const charCount = draftText.length;

  return (
    <div className="fixed inset-0 z-50 bg-[#080808]/95 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto">
      <div className="max-w-2xl w-full bg-[#111111] border border-[#E3262E]/50 rounded-3xl p-6 sm:p-8 shadow-2xl relative my-auto">
        {/* Close Button */}
        <button
          onClick={() => setActiveReplyModal(null)}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#171717] text-[#A1A1AA] hover:text-[#F5F5F5] transition"
        >
          <X className="w-5 h-5" />
        </button>

        {showCelebration ? (
          <div className="text-center py-10 space-y-4 animate-in zoom-in-95">
            <SamuraiMascot state="celebration" size="hero" showSpeechBubble speechText="Clean strike. ⚔️" />
            <h2 className="text-3xl font-black text-[#F5F5F5]">Clean Strike! ⚔️</h2>
            <p className="text-sm text-[#A1A1AA]">
              Your AI-crafted reply has been approved & queued for publishing through your authorized connection.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4" /> QUEUED FOR PUBLISHING
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <SamuraiMascot state="working" size="sm" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold text-[#E3262E] uppercase">SAMURAI COMPOSER</span>
                  <span className="text-[10px] bg-[#E3262E]/20 text-[#E3262E] px-2 py-0.5 rounded-full font-bold">
                    COST: 5 CREDITS
                  </span>
                </div>
                <h2 className="text-xl font-black text-[#F5F5F5]">Draft AI Response</h2>
              </div>
            </div>

            {/* Pinned Original Post */}
            <div className="bg-[#080808] border border-white/10 rounded-2xl p-4 mb-6">
              <div className="flex items-center justify-between text-xs text-[#A1A1AA] mb-2">
                <span className="font-bold text-[#F5F5F5]">Replying to {activeReplyModal.authorHandle}</span>
                <span className="uppercase text-[10px] font-mono">{activeReplyModal.platform}</span>
              </div>
              <p className="text-xs text-[#A1A1AA] italic leading-relaxed">
                "{activeReplyModal.postContent}"
              </p>
            </div>

            {/* Tone Selector Tabs */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#A1A1AA] mb-2">Select AI Tone Voice:</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['Thoughtful', 'Short', 'Technical', 'Witty'] as const).map((tone) => (
                  <button
                    key={tone}
                    onClick={() => handleSelectTone(tone)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                      selectedTone === tone
                        ? 'bg-[#E3262E] border-[#E3262E] text-white shadow-lg shadow-[#E3262E]/20'
                        : 'bg-[#171717] border-white/10 text-[#A1A1AA] hover:text-[#F5F5F5]'
                    }`}
                  >
                    {tone}
                  </button>
                ))}
              </div>
            </div>

            {/* AI Generated & Human Review Required Badges */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  ⚡ AI GENERATED
                </span>
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#E3262E]/20 text-[#E3262E] border border-[#E3262E]/40">
                  🛡️ REVIEW REQUIRED
                </span>
              </div>

              <span
                className={`text-xs font-mono font-bold ${
                  charCount > charLimit ? 'text-red-500' : 'text-[#A1A1AA]'
                }`}
              >
                {charCount} / {charLimit}
              </span>
            </div>

            {/* Editable Text Area with Left Accent Bar */}
            <div className="relative mb-6">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#E3262E] rounded-l-2xl" />
              <textarea
                value={draftText}
                onChange={(e) => setDraftText(e.target.value)}
                disabled={isGenerating}
                rows={4}
                className="w-full bg-[#171717] border border-white/10 rounded-2xl pl-5 pr-4 py-3 text-sm text-[#F5F5F5] focus:outline-none focus:border-[#E3262E] transition leading-relaxed resize-none"
              />
            </div>

            {/* Quick Adjusters */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-6 text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRegenerate}
                  className="px-3 py-1.5 bg-[#171717] border border-white/10 hover:border-white/20 text-[#A1A1AA] hover:text-[#F5F5F5] rounded-xl transition flex items-center gap-1.5"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
                  <span>Regenerate</span>
                </button>
              </div>

              <span className="text-[11px] text-[#A1A1AA]">
                Human Approval strictly required before publishing.
              </span>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={handleApprove}
              disabled={charCount === 0 || charCount > charLimit}
              className="w-full py-4 bg-gradient-to-r from-[#E3262E] to-[#7F1015] hover:from-[#f4333b] hover:to-[#911319] text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-xl shadow-[#E3262E]/30 transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
            >
              <Send className="w-4 h-4 fill-white" />
              <span>APPROVE & QUEUE ⚔️</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};
