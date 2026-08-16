import React from 'react';
import {
  LayoutDashboard,
  Target,
  PenTool,
  Inbox,
  Calendar as CalendarIcon,
  BarChart3,
  Swords,
  Share2,
  Zap,
  Settings,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ViewTab } from '../../types';
import { SamuraiMascot } from '../Mascot/SamuraiMascot';

export const Sidebar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    subscription,
    usageLimits,
    accounts,
    setActiveUpgradeModal,
  } = useApp();

  const NAV_ITEMS: { id: ViewTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'opportunities', label: 'Opportunities', icon: <Target className="w-5 h-5" />, badge: '7' },
    { id: 'create', label: 'Create', icon: <PenTool className="w-5 h-5" /> },
    { id: 'inbox', label: 'Inbox', icon: <Inbox className="w-5 h-5" />, badge: '2' },
    { id: 'calendar', label: 'Calendar', icon: <CalendarIcon className="w-5 h-5" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'battle', label: 'Battle (Game)', icon: <Swords className="w-5 h-5" />, badge: '60s' },
    { id: 'connections', label: 'Connections', icon: <Share2 className="w-5 h-5" /> },
    { id: 'automation', label: 'Automation', icon: <Zap className="w-5 h-5" /> },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-[#080808] border-r border-white/10 sticky top-0 z-30 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('dashboard')}>
          <div className="w-9 h-9 rounded-xl bg-[#E3262E]/20 border border-[#E3262E] flex items-center justify-between p-1.5 shadow-lg shadow-[#E3262E]/20">
            <span className="font-extrabold text-[#E3262E] text-lg leading-none mx-auto">S</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-xl tracking-tight text-[#F5F5F5]">
                SOCIAL<span className="text-[#E3262E]">SAMURAI</span>
              </span>
              <span className="text-xs">🥷</span>
            </div>
            <p className="text-[10px] text-[#A1A1AA] tracking-wider uppercase">AI Command Center</p>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-[#171717] text-[#F5F5F5] border border-[#E3262E]/50 shadow-md shadow-[#E3262E]/10 font-semibold'
                  : 'text-[#A1A1AA] hover:text-[#F5F5F5] hover:bg-[#111111]'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={isActive ? 'text-[#E3262E]' : 'text-[#A1A1AA]'}>{item.icon}</span>
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                    item.id === 'battle'
                      ? 'bg-[#E3262E] text-white animate-pulse'
                      : isActive
                      ? 'bg-[#E3262E]/20 text-[#E3262E] border border-[#E3262E]/40'
                      : 'bg-[#171717] text-[#A1A1AA]'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Account Connection Status Summary */}
      <div className="px-4 py-3 bg-[#111111]/80 border-t border-b border-white/5 text-xs">
        <p className="text-[#A1A1AA] font-semibold mb-2 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#E3262E]" /> Connected Accounts
        </p>
        <div className="space-y-1 text-[11px]">
          {accounts.map((acc) => (
            <div key={acc.id} className="flex items-center justify-between">
              <span className="text-[#F5F5F5] capitalize">{acc.platform}</span>
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${acc.connected ? 'bg-emerald-500' : 'bg-zinc-600'}`} />
                <span className={acc.connected ? 'text-emerald-400 font-medium' : 'text-zinc-500'}>
                  {acc.connected ? 'Connected' : 'Not Connected'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mascot & Subscription Widget */}
      <div className="p-4 bg-[#0F0F10] border-t border-white/10 space-y-3">
        {/* Credits Status */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#A1A1AA] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#E3262E]" /> Samurai Credits
          </span>
          <span className="font-bold text-[#F5F5F5] bg-[#171717] px-2 py-0.5 rounded-md border border-white/10">
            {subscription.plan === 'samurai' ? 'UNLIMITED ⚔️' : `${usageLimits.dailyCreditsCount} / ${usageLimits.dailyCreditsMax}`}
          </span>
        </div>

        {/* Small Mascot Widget */}
        <div className="flex items-center gap-3 bg-[#171717] p-2.5 rounded-xl border border-white/5">
          <SamuraiMascot state={subscription.plan === 'samurai' ? 'celebration' : 'ready'} size="xs" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-[#F5F5F5] truncate">
              {subscription.plan === 'samurai' ? 'SAMURAI PRO ⚔️' : 'FREE DOJO PLAN'}
            </p>
            <p className="text-[10px] text-[#A1A1AA] truncate">
              {subscription.plan === 'samurai' ? 'All features unlocked' : '3 ops / 10 credits day'}
            </p>
          </div>
        </div>

        {subscription.plan === 'free' && (
          <button
            onClick={() => setActiveUpgradeModal(true)}
            className="w-full py-2 bg-gradient-to-r from-[#E3262E] to-[#7F1015] hover:from-[#f4333b] hover:to-[#911319] text-white text-xs font-bold rounded-xl shadow-lg shadow-[#E3262E]/20 transition-all flex items-center justify-center gap-1.5"
          >
            <span>BECOME A SAMURAI — $19</span>
          </button>
        )}

        <button
          onClick={() => setCurrentView('settings')}
          className="w-full flex items-center justify-center gap-2 py-1.5 text-xs text-[#A1A1AA] hover:text-[#F5F5F5] transition"
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
};
