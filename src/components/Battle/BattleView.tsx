import React, { useState } from 'react';
import { Swords, Trophy, Sparkles, Flame, Shield, ArrowRight, RefreshCw } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GameCanvas } from './GameCanvas';
import { SamuraiMascot } from '../Mascot/SamuraiMascot';

export const BattleView: React.FC = () => {
  const { earnGameCredits, usageLimits, setCurrentView } = useApp();

  const [gameState, setGameState] = useState<'lobby' | 'countdown' | 'playing' | 'results'>('lobby');
  const [countdown, setCountdown] = useState<number>(3);
  const [lastResults, setLastResults] = useState<{
    score: number;
    combo: number;
    enemiesKilled: number;
    victory: boolean;
    creditsAwarded: number;
  }>({ score: 0, combo: 0, enemiesKilled: 0, victory: true, creditsAwarded: 0 });

  const startCountdown = () => {
    setGameState('countdown');
    setCountdown(3);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          setGameState('playing');
          return 0;
        }
        return prev - 1;
      });
    }, 800);
  };

  const handleGameOver = (
    finalScore: number,
    combo: number,
    enemiesKilled: number,
    victory: boolean
  ) => {
    const credits = earnGameCredits(finalScore);
    setLastResults({
      score: finalScore,
      combo,
      enemiesKilled,
      victory,
      creditsAwarded: credits,
    });
    setGameState('results');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-[#111111] border border-white/10 p-6 sm:p-8 rounded-3xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#E3262E] uppercase">ARCADE MINI-GAME</span>
              <span className="text-[10px] bg-[#E3262E]/20 text-[#E3262E] px-2.5 py-0.5 rounded-full font-bold">
                DAILY RETENTION REWARD
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#F5F5F5] tracking-tight mt-1">
              SAMURAI: LAST STAND ⚔️
            </h1>
            <p className="text-xs text-[#A1A1AA] mt-1">
              60 seconds. One fight. Earn up to 10 daily Samurai credits for your AI command center.
            </p>
          </div>

          {/* Daily credit cap widget */}
          <div className="bg-[#171717] border border-[#E3262E]/40 px-4 py-2.5 rounded-2xl text-center shrink-0">
            <span className="text-[10px] text-[#A1A1AA] uppercase font-bold block">DAILY CREDIT REWARD</span>
            <span className="text-base font-black text-[#F5F5F5]">
              {usageLimits.dailyCreditsCount} / {usageLimits.dailyCreditsMax} CREDITS EARNED
            </span>
          </div>
        </div>
      </div>

      {/* LOBBY STATE */}
      {gameState === 'lobby' && (
        <div className="bg-[#171717] border border-white/10 rounded-3xl p-6 sm:p-8 text-center relative overflow-hidden shadow-2xl">
          <SamuraiMascot
            state="focused"
            size="hero"
            showSpeechBubble
            speechText="Ready to Fight ⚔️"
            className="mb-6"
          />

          {/* Today's Opponent Card */}
          <div className="max-w-md mx-auto bg-[#080808] border border-white/10 rounded-2xl p-5 mb-8 text-left space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#E3262E] uppercase">TODAY'S OPPONENT</span>
              <span className="text-xs text-amber-400 font-bold">DIFFICULTY: ★★★☆☆</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#E3262E]/20 border border-[#E3262E] flex items-center justify-center font-black text-xl text-[#E3262E]">
                ⚔️
              </div>
              <div>
                <h3 className="text-lg font-black text-[#F5F5F5]">THE RED RONIN</h3>
                <p className="text-xs text-[#A1A1AA]">Wave Enemy • High Speed Katana Strikes</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs text-[#A1A1AA]">
              <span>Personal Best Score: <strong className="text-[#F5F5F5]">12,430</strong></span>
              <span>Top Daily Leaderboard: <strong className="text-emerald-400">#3 Vikrant</strong></span>
            </div>
          </div>

          <button
            onClick={startCountdown}
            className="py-4 px-10 bg-gradient-to-r from-[#E3262E] to-[#7F1015] hover:from-[#f4333b] hover:to-[#911319] text-white font-black text-sm uppercase tracking-widest rounded-2xl shadow-2xl shadow-[#E3262E]/40 transition active:scale-95 inline-flex items-center gap-3"
          >
            <Swords className="w-5 h-5 fill-white" />
            <span>FIGHT NOW (ENTER ARENA)</span>
          </button>
        </div>
      )}

      {/* COUNTDOWN STATE */}
      {gameState === 'countdown' && (
        <div className="bg-[#080808] border border-[#E3262E] rounded-3xl p-16 text-center shadow-2xl flex flex-col items-center justify-center min-h-[400px]">
          <span className="text-xs font-mono font-bold text-[#E3262E] uppercase mb-4 tracking-widest">
            ARENA INITIALIZING
          </span>
          <div className="text-7xl font-black text-[#F5F5F5] animate-ping tracking-widest">
            {countdown}
          </div>
          <span className="text-sm font-extrabold text-[#E3262E] uppercase mt-6 tracking-wider">
            GET READY FOR BATTLE!
          </span>
        </div>
      )}

      {/* PLAYING STATE */}
      {gameState === 'playing' && <GameCanvas onGameOver={handleGameOver} />}

      {/* RESULTS STATE */}
      {gameState === 'results' && (
        <div className="bg-[#111111] border border-[#E3262E]/50 rounded-3xl p-6 sm:p-8 text-center max-w-lg mx-auto shadow-2xl animate-in zoom-in-95">
          <SamuraiMascot
            state={lastResults.victory ? 'celebration' : 'guard'}
            size="hero"
            showSpeechBubble
            speechText={lastResults.victory ? 'Clean Strike! ⚔️' : 'Defeat — Stand Up!'}
            className="mb-4"
          />

          <h2 className="text-3xl font-black text-[#F5F5F5] tracking-tight">
            {lastResults.victory ? 'VICTORY!' : 'BATTLE CONCLUDED'}
          </h2>
          <p className="text-xs text-[#A1A1AA] mt-1 mb-6">
            You survived 60 seconds of combat in Samurai: Last Stand.
          </p>

          {/* Stats breakdown */}
          <div className="grid grid-cols-2 gap-3 bg-[#080808] border border-white/10 rounded-2xl p-4 mb-6 text-left">
            <div>
              <span className="text-[10px] text-[#A1A1AA] uppercase font-bold">TOTAL SCORE</span>
              <p className="text-2xl font-black text-[#F5F5F5]">{lastResults.score.toLocaleString()}</p>
            </div>
            <div>
              <span className="text-[10px] text-[#A1A1AA] uppercase font-bold">MAX COMBO</span>
              <p className="text-2xl font-black text-[#E3262E]">{lastResults.combo}× STRIKE</p>
            </div>
            <div>
              <span className="text-[10px] text-[#A1A1AA] uppercase font-bold">ENEMIES DEFEATED</span>
              <p className="text-xl font-bold text-[#F5F5F5]">{lastResults.enemiesKilled} Ronins</p>
            </div>
            <div>
              <span className="text-[10px] text-[#A1A1AA] uppercase font-bold">CREDITS REWARDED</span>
              <p className="text-xl font-bold text-emerald-400">+{lastResults.creditsAwarded} Credits</p>
            </div>
          </div>

          {/* Daily reward note */}
          <div className="bg-[#171717] border border-emerald-500/40 p-3 rounded-xl text-xs text-emerald-400 font-semibold mb-6 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>DAILY REWARD: {usageLimits.dailyCreditsCount} / {usageLimits.dailyCreditsMax} Credits Earned</span>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setGameState('lobby')}
              className="flex-1 py-3 bg-[#171717] hover:bg-[#1C1C1E] border border-white/10 text-[#F5F5F5] font-bold text-xs uppercase tracking-wider rounded-2xl transition flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>PLAY AGAIN</span>
            </button>
            <button
              onClick={() => setCurrentView('opportunities')}
              className="flex-1 py-3 bg-[#E3262E] hover:bg-[#f4333b] text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-xl shadow-[#E3262E]/30 transition flex items-center justify-center gap-2"
            >
              <span>USE CREDITS IN DOJO ⚔️</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
