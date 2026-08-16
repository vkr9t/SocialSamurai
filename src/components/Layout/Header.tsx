import React, { useState } from 'react';
import { Bell, Sparkles, Shield, ToggleLeft, ToggleRight, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MascotAvatar } from '../Mascot/MascotAvatar';

export const Header: React.FC = () => {
  const {
    subscription,
    usageLimits,
    notifications,
    markNotificationRead,
    demoMode,
    toggleDemoMode,
    setActiveUpgradeModal,
    setCurrentView,
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 bg-[#080808]/90 backdrop-blur-md border-b border-white/10 px-4 py-3 flex items-center justify-between select-none">
      {/* Left side brand on mobile / Page context on desktop */}
      <div className="flex items-center gap-3">
        <div className="md:hidden flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('dashboard')}>
          <div className="w-8 h-8 rounded-lg bg-[#E3262E]/20 border border-[#E3262E] flex items-center justify-center font-black text-[#E3262E]">
            S
          </div>
          <span className="font-extrabold text-base text-[#F5F5F5]">
            SOCIAL<span className="text-[#E3262E]">SAMURAI</span> 🥷
          </span>
        </div>

        <div className="hidden md:flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-[#A1A1AA] font-mono">DOJO STATUS: ONLINE</span>
          <span className="text-white/20">|</span>
          <span className="text-[#A1A1AA]">
            {subscription.plan === 'samurai' ? (
              <span className="text-[#E3262E] font-bold flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 inline" /> SAMURAI PLAN ⚔️
              </span>
            ) : (
              <span className="text-amber-400 font-medium">FREE PLAN (3 Ops / Day)</span>
            )}
          </span>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3">
        {/* Demo Mode Toggle */}
        <button
          onClick={toggleDemoMode}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#171717] border border-white/10 text-[11px] font-semibold text-[#A1A1AA] hover:text-[#F5F5F5] transition"
          title="Toggle between Demo Mode and Real API connection layer"
        >
          {demoMode ? (
            <ToggleRight className="w-4 h-4 text-[#E3262E]" />
          ) : (
            <ToggleLeft className="w-4 h-4 text-zinc-500" />
          )}
          <span className="hidden sm:inline">DEMO MODE:</span>
          <span className={demoMode ? 'text-[#E3262E] font-bold' : 'text-zinc-400'}>
            {demoMode ? 'MOCK' : 'REAL'}
          </span>
        </button>

        {/* Credits Badge */}
        <button
          onClick={() => subscription.plan === 'free' && setActiveUpgradeModal(true)}
          className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#171717] border border-[#E3262E]/30 text-xs font-bold text-[#F5F5F5] hover:border-[#E3262E] transition shadow-md shadow-[#E3262E]/10"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#E3262E]" />
          <span>
            {subscription.plan === 'samurai' ? 'UNLIMITED ⚔️' : `${usageLimits.dailyCreditsCount} CREDITS`}
          </span>
        </button>

        {/* Notification Bell Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl bg-[#171717] border border-white/10 text-[#A1A1AA] hover:text-[#F5F5F5] hover:border-white/20 transition"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E3262E] text-white text-[9px] font-extrabold flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[#171717] border border-white/10 rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
                <span className="text-xs font-bold text-[#F5F5F5] flex items-center gap-1.5">
                  <Bell className="w-3.5 h-3.5 text-[#E3262E]" /> Notifications
                </span>
                <span className="text-[10px] text-[#A1A1AA]">{notifications.length} alerts</span>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => markNotificationRead(n.id)}
                    className={`p-2.5 rounded-xl border text-xs cursor-pointer transition ${
                      n.read
                        ? 'bg-[#111111] border-white/5 opacity-70'
                        : 'bg-[#1C1C1E] border-[#E3262E]/40 font-medium'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[#F5F5F5] font-semibold mb-1">
                      <span>{n.title}</span>
                      <span className="text-[10px] text-[#A1A1AA]">{n.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-[#A1A1AA] leading-relaxed">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar */}
        <div className="cursor-pointer" onClick={() => setCurrentView('settings')}>
          <MascotAvatar size="md" />
        </div>
      </div>
    </header>
  );
};
