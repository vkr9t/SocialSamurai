import React, { useState } from 'react';
import { SocialAccount } from '../../types';
import { useApp } from '../../context/AppContext';
import { Shield, CheckCircle2, Lock, X, ArrowRight } from 'lucide-react';
import { sounds } from '../../utils/audio';

export const OAuthModal: React.FC = () => {
  const { activeOAuthModal, setActiveOAuthModal, toggleConnectPlatform } = useApp();
  const [authorizing, setAuthorizing] = useState(false);

  if (!activeOAuthModal) return null;

  const handleAuthorize = () => {
    sounds.playClick();
    setAuthorizing(true);
    setTimeout(() => {
      setAuthorizing(false);
      toggleConnectPlatform(activeOAuthModal.platform);
      setActiveOAuthModal(null);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#080808]/95 backdrop-blur-2xl flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative text-left">
        <button
          onClick={() => setActiveOAuthModal(null)}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#171717] text-[#A1A1AA] hover:text-[#F5F5F5] transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* OAuth Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#080808] border border-white/10 flex items-center justify-center font-black text-xl text-[#F5F5F5] uppercase">
            {activeOAuthModal.platform === 'x'
              ? '𝕏'
              : activeOAuthModal.platform === 'reddit'
              ? 'r/'
              : 'in'}
          </div>
          <div>
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">
              OAUTH 2.0 + PKCE AUTHORIZATION
            </span>
            <h2 className="text-xl font-black text-[#F5F5F5]">
              Authorize SocialSamurai on {activeOAuthModal.platform.toUpperCase()}
            </h2>
          </div>
        </div>

        <p className="text-xs text-[#A1A1AA] mb-6 leading-relaxed">
          SocialSamurai is requesting permission to access your official account. Tokens are encrypted at rest server-side via KMS. Your password is never seen or stored.
        </p>

        {/* Requested Scopes Checklist */}
        <div className="bg-[#080808] border border-white/10 rounded-2xl p-4 mb-6 space-y-2.5">
          <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider block">
            REQUESTED PERMISSIONS:
          </span>
          {activeOAuthModal.scopes.map((scope) => (
            <div key={scope} className="flex items-center gap-2 text-xs text-[#F5F5F5]">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-mono text-zinc-300">{scope}</span>
            </div>
          ))}
        </div>

        {/* Security badges */}
        <div className="flex items-center gap-3 text-[11px] text-[#A1A1AA] mb-6 p-3 bg-[#171717] rounded-xl border border-white/5">
          <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Server-side token exchange • 1-Click Revoke anytime in Settings</span>
        </div>

        {/* CTAs */}
        <div className="flex gap-3">
          <button
            onClick={() => setActiveOAuthModal(null)}
            className="py-3 px-5 bg-[#171717] hover:bg-[#1C1C1E] border border-white/10 text-[#A1A1AA] hover:text-[#F5F5F5] font-bold text-xs rounded-2xl transition"
          >
            Cancel
          </button>
          <button
            onClick={handleAuthorize}
            disabled={authorizing}
            className="flex-1 py-3 px-5 bg-gradient-to-r from-[#E3262E] to-[#7F1015] hover:from-[#f4333b] hover:to-[#911319] text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-xl shadow-[#E3262E]/25 transition flex items-center justify-center gap-2"
          >
            <span>{authorizing ? 'AUTHORIZING...' : 'APPROVE & AUTHORIZE ⚔️'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
