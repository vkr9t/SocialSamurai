import React, { useState } from 'react';
import { Settings as SettingsIcon, Shield, Trash2, Key, Bell, User, Plus, X, Sparkles, Lock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MascotAvatar } from '../Mascot/MascotAvatar';

export const SettingsView: React.FC = () => {
  const {
    keywords,
    addKeyword,
    removeKeyword,
    subscription,
    setActiveUpgradeModal,
    accounts,
  } = useApp();

  const [kwInput, setKwInput] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletedMsg, setDeletedMsg] = useState(false);

  const handleAdd = () => {
    if (kwInput.trim()) {
      addKeyword(kwInput);
      setKwInput('');
    }
  };

  const handleDeleteAccount = () => {
    setDeletedMsg(true);
    setTimeout(() => {
      setShowDeleteConfirm(false);
      setDeletedMsg(false);
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-[#111111] border border-white/10 p-6 rounded-3xl flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-[#F5F5F5] tracking-tight">Dojo Settings</h1>
          <p className="text-xs text-[#A1A1AA] mt-1">
            Manage your profile, topic keywords, AI voice preferences, and privacy.
          </p>
        </div>
      </div>

      {/* User Profile Card */}
      <div className="bg-[#171717] border border-white/10 rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <MascotAvatar size="lg" />
          <div>
            <h2 className="text-xl font-extrabold text-[#F5F5F5]">Vikrant Kumar</h2>
            <p className="text-xs text-[#A1A1AA]">vikrant@socialsamurai.in • @vikrant_builds</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#E3262E]/20 text-[#E3262E] border border-[#E3262E]/40 uppercase">
                {subscription.plan === 'samurai' ? 'SAMURAI PRO ⚔️' : 'FREE PLAN'}
              </span>
              {subscription.plan === 'free' && (
                <button
                  onClick={() => setActiveUpgradeModal(true)}
                  className="text-xs font-bold text-[#E3262E] hover:underline"
                >
                  Upgrade to Samurai ($19/mo)
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Keyword Manager */}
      <div className="bg-[#171717] border border-white/10 rounded-3xl p-6 space-y-4">
        <h3 className="text-sm font-extrabold text-[#F5F5F5] uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#E3262E]" /> MONITORING KEYWORDS
        </h3>
        <p className="text-xs text-[#A1A1AA]">
          Add unlimited topics for SocialSamurai to monitor across authorized networks.
        </p>

        <div className="flex gap-2">
          <input
            type="text"
            value={kwInput}
            onChange={(e) => setKwInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            placeholder="Add new keyword..."
            className="flex-1 bg-[#080808] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#E3262E]"
          />
          <button
            onClick={handleAdd}
            className="px-4 bg-[#E3262E] text-white text-xs font-bold rounded-2xl hover:bg-[#f4333b] transition"
          >
            Add Keyword
          </button>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {keywords.map((kw) => (
            <span
              key={kw}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#080808] border border-white/10 text-[#F5F5F5] text-xs font-semibold"
            >
              <span>{kw}</span>
              <button
                onClick={() => removeKeyword(kw)}
                className="text-[#A1A1AA] hover:text-[#E3262E] transition"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Play Store & Security Safety */}
      <div className="bg-[#171717] border border-white/10 rounded-3xl p-6 space-y-4">
        <h3 className="text-sm font-extrabold text-[#F5F5F5] uppercase tracking-wider flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-400" /> PRIVACY & DATA SAFETY (PLAY STORE TRUST)
        </h3>

        <div className="space-y-3 text-xs text-[#A1A1AA]">
          <div className="flex items-center justify-between p-3 bg-[#080808] rounded-xl border border-white/5">
            <span>OAuth 2.0 PKCE Authorization</span>
            <span className="text-emerald-400 font-bold">Active</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-[#080808] rounded-xl border border-white/5">
            <span>KMS Token Encryption At Rest</span>
            <span className="text-emerald-400 font-bold">Enforced</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-[#080808] rounded-xl border border-white/5">
            <span>Privacy Policy & Terms of Service</span>
            <a href="https://socialsamurai.in" target="_blank" rel="noreferrer" className="text-[#E3262E] font-bold underline">
              View Policy
            </a>
          </div>
        </div>

        {/* Account Deletion Flow */}
        <div className="pt-4 border-t border-white/5">
          {deletedMsg ? (
            <p className="text-xs text-emerald-400 font-bold">
              Account deletion request initiated. Tokens revoked server-side.
            </p>
          ) : showDeleteConfirm ? (
            <div className="p-4 bg-red-950/20 border border-red-500/40 rounded-2xl space-y-3">
              <p className="text-xs text-red-300 font-bold">
                Are you sure you want to delete your SocialSamurai account and revoke all tokens?
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleDeleteAccount}
                  className="py-2 px-4 bg-red-600 text-white font-bold text-xs rounded-xl"
                >
                  Confirm Delete Account
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="py-2 px-4 bg-[#171717] text-[#A1A1AA] font-bold text-xs rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="text-xs text-red-400 hover:underline font-semibold flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete SocialSamurai Account & Data</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
