import React, { useEffect, useRef, useState } from 'react';
import { sounds } from '../../utils/audio';

interface GameCanvasProps {
  onGameOver: (finalScore: number, combo: number, enemiesKilled: number, victory: boolean) => void;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({ onGameOver }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [playerHp, setPlayerHp] = useState<number>(100);
  const [enemyHp, setEnemyHp] = useState<number>(100);
  const [enemyName, setEnemyName] = useState<string>('Red Ronin');
  const [score, setScore] = useState<number>(0);
  const [combo, setCombo] = useState<number>(0);
  const [maxCombo, setMaxCombo] = useState<number>(0);
  const [enemiesKilled, setEnemiesKilled] = useState<number>(0);

  // Game state references for 60fps loop
  const gameState = useRef({
    running: true,
    timeLeft: 60,
    score: 0,
    combo: 0,
    maxCombo: 0,
    enemiesKilled: 0,

    player: {
      x: 120,
      y: 220,
      vx: 0,
      vy: 0,
      width: 50,
      height: 70,
      hp: 100,
      maxHp: 100,
      isGrounded: true,
      action: 'idle' as 'idle' | 'attack_light' | 'attack_heavy' | 'block' | 'hurt',
      actionTimer: 0,
      facing: 1, // 1 right, -1 left
    },

    enemy: {
      x: 500,
      y: 220,
      vx: 0,
      vy: 0,
      width: 55,
      height: 75,
      hp: 100,
      maxHp: 100,
      name: 'Red Ronin',
      type: 'ronin' as 'ronin' | 'ninja' | 'boss',
      action: 'idle' as 'idle' | 'attack' | 'hurt',
      actionTimer: 0,
      attackCooldown: 0,
    },

    particles: [] as Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      size: number;
      life: number;
    }>,

    slashes: [] as Array<{
      x: number;
      y: number;
      angle: number;
      life: number;
    }>,

    screenShake: 0,
  });

  // Action Triggers exposed to controls
  const handleLightAttack = () => {
    const s = gameState.current;
    if (s.player.action === 'idle' || s.player.action === 'block') {
      s.player.action = 'attack_light';
      s.player.actionTimer = 12;
      sounds.playSlash();

      // Hit Check
      const dist = Math.abs(s.player.x - s.enemy.x);
      if (dist < 80 && s.enemy.hp > 0) {
        const damage = 20;
        s.enemy.hp = Math.max(0, s.enemy.hp - damage);
        s.enemy.action = 'hurt';
        s.enemy.actionTimer = 10;
        s.combo += 1;
        s.maxCombo = Math.max(s.maxCombo, s.combo);
        s.score += 50 * s.combo;
        s.screenShake = 6;
        sounds.playHit();

        // Particles
        for (let i = 0; i < 12; i++) {
          s.particles.push({
            x: s.enemy.x + 25,
            y: s.enemy.y + 35,
            vx: (Math.random() - 0.5) * 8,
            vy: (Math.random() - 0.5) * 8,
            color: '#E3262E',
            size: Math.random() * 4 + 2,
            life: 15,
          });
        }

        // Spawn next enemy if dead
        if (s.enemy.hp <= 0) {
          s.enemiesKilled += 1;
          s.score += 300;
          setTimeout(() => spawnNextEnemy(), 500);
        }
      }
    }
  };

  const handleHeavyAttack = () => {
    const s = gameState.current;
    if (s.player.action === 'idle' || s.player.action === 'block') {
      s.player.action = 'attack_heavy';
      s.player.actionTimer = 20;
      sounds.playSlash();

      // Heavy Hit Check
      const dist = Math.abs(s.player.x - s.enemy.x);
      if (dist < 95 && s.enemy.hp > 0) {
        const damage = 40;
        s.enemy.hp = Math.max(0, s.enemy.hp - damage);
        s.enemy.action = 'hurt';
        s.enemy.actionTimer = 15;
        s.combo += 2;
        s.maxCombo = Math.max(s.maxCombo, s.combo);
        s.score += 120 * s.combo;
        s.screenShake = 12;
        sounds.playHit();

        // Explosion Particles
        for (let i = 0; i < 20; i++) {
          s.particles.push({
            x: s.enemy.x + 25,
            y: s.enemy.y + 35,
            vx: (Math.random() - 0.5) * 12,
            vy: (Math.random() - 0.5) * 12,
            color: '#FFFFFF',
            size: Math.random() * 5 + 3,
            life: 20,
          });
        }

        if (s.enemy.hp <= 0) {
          s.enemiesKilled += 1;
          s.score += 300;
          setTimeout(() => spawnNextEnemy(), 500);
        }
      }
    }
  };

  const handleBlock = (active: boolean) => {
    const s = gameState.current;
    if (active) {
      s.player.action = 'block';
    } else if (s.player.action === 'block') {
      s.player.action = 'idle';
    }
  };

  const handleMove = (dir: number) => {
    const s = gameState.current;
    s.player.vx = dir * 6;
    if (dir !== 0) s.player.facing = dir;
  };

  const spawnNextEnemy = () => {
    const s = gameState.current;
    const elapsed = 60 - s.timeLeft;

    if (elapsed > 55) {
      s.enemy = {
        x: 550,
        y: 210,
        vx: 0,
        vy: 0,
        width: 65,
        height: 85,
        hp: 200,
        maxHp: 200,
        name: 'Cyber Shogun Boss 🥷',
        type: 'boss',
        action: 'idle',
        actionTimer: 0,
        attackCooldown: 20,
      };
    } else if (elapsed > 30) {
      s.enemy = {
        x: 550,
        y: 220,
        vx: 0,
        vy: 0,
        width: 50,
        height: 70,
        hp: 120,
        maxHp: 120,
        name: 'Shadow Ninja ⚡',
        type: 'ninja',
        action: 'idle',
        actionTimer: 0,
        attackCooldown: 30,
      };
    } else {
      s.enemy = {
        x: 550,
        y: 220,
        vx: 0,
        vy: 0,
        width: 55,
        height: 75,
        hp: 90,
        maxHp: 90,
        name: 'Red Ronin ⚔️',
        type: 'ronin',
        action: 'idle',
        actionTimer: 0,
        attackCooldown: 40,
      };
    }
    setEnemyName(s.enemy.name);
  };

  // Keyboard controls listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') handleMove(-1);
      if (e.key === 'ArrowRight' || e.key === 'd') handleMove(1);
      if (e.key === 'j' || e.key === 'J') handleLightAttack();
      if (e.key === 'k' || e.key === 'K') handleHeavyAttack();
      if (e.key === 'l' || e.key === 'L') handleBlock(true);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'ArrowRight' || e.key === 'd') {
        handleMove(0);
      }
      if (e.key === 'l' || e.key === 'L') handleBlock(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Main 60FPS Game Loop
  useEffect(() => {
    let animId: number;
    let lastTime = Date.now();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Timer countdown 1s interval
    const timerInterval = setInterval(() => {
      if (!gameState.current.running) return;
      gameState.current.timeLeft -= 1;
      setTimeLeft(gameState.current.timeLeft);

      if (gameState.current.timeLeft <= 0) {
        gameState.current.running = false;
        clearInterval(timerInterval);
        sounds.playVictory();
        onGameOver(
          gameState.current.score,
          gameState.current.maxCombo,
          gameState.current.enemiesKilled,
          true
        );
      }
    }, 1000);

    const render = () => {
      const s = gameState.current;
      if (!s.running) return;

      // Update positions
      s.player.x += s.player.vx;
      s.player.x = Math.max(30, Math.min(650, s.player.x));

      // Timers update
      if (s.player.actionTimer > 0) {
        s.player.actionTimer--;
        if (s.player.actionTimer === 0 && s.player.action !== 'block') {
          s.player.action = 'idle';
        }
      }

      // Enemy AI logic
      if (s.enemy.hp > 0) {
        const dist = s.enemy.x - s.player.x;
        if (dist > 70) {
          s.enemy.x -= s.enemy.type === 'ninja' ? 3.5 : 2;
        } else if (s.enemy.attackCooldown <= 0) {
          // Enemy attacks!
          s.enemy.action = 'attack';
          s.enemy.attackCooldown = s.enemy.type === 'boss' ? 35 : 50;

          if (s.player.action === 'block') {
            s.score += 20;
            s.screenShake = 3;
            sounds.playBlock();
          } else {
            s.player.hp = Math.max(0, s.player.hp - 15);
            s.player.action = 'hurt';
            s.player.actionTimer = 10;
            s.combo = 0; // reset combo
            s.screenShake = 8;
            sounds.playHit();

            if (s.player.hp <= 0) {
              s.running = false;
              clearInterval(timerInterval);
              onGameOver(s.score, s.maxCombo, s.enemiesKilled, false);
            }
          }
        } else {
          s.enemy.attackCooldown--;
        }
      }

      // Sync React state UI
      setPlayerHp(s.player.hp);
      setEnemyHp(s.enemy.hp);
      setScore(s.score);
      setCombo(s.combo);
      setMaxCombo(s.maxCombo);
      setEnemiesKilled(s.enemiesKilled);

      // Render Canvas Scene
      ctx.save();

      // Screen Shake
      if (s.screenShake > 0) {
        const dx = (Math.random() - 0.5) * s.screenShake;
        const dy = (Math.random() - 0.5) * s.screenShake;
        ctx.translate(dx, dy);
        s.screenShake *= 0.85;
      }

      // Background - Dark Dojo Arena
      ctx.fillStyle = '#080808';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Red Moon background accent
      const gradient = ctx.createRadialGradient(360, 100, 10, 360, 100, 180);
      gradient.addColorStop(0, 'rgba(227, 38, 46, 0.25)');
      gradient.addColorStop(1, 'rgba(8, 8, 8, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(360, 100, 180, 0, Math.PI * 2);
      ctx.fill();

      // Arena Floor line
      ctx.strokeStyle = '#E3262E';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 290);
      ctx.lineTo(720, 290);
      ctx.stroke();

      // Grid floor perspective lines
      ctx.strokeStyle = 'rgba(227, 38, 46, 0.15)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 720; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 290);
        ctx.lineTo(i - 20, 360);
        ctx.stroke();
      }

      // Draw Player (SocialSamurai Mascot)
      ctx.save();
      ctx.translate(s.player.x, s.player.y);

      // Red Scarf cape trails
      ctx.fillStyle = '#E3262E';
      ctx.beginPath();
      ctx.moveTo(0, 20);
      ctx.lineTo(-25 - Math.sin(Date.now() / 100) * 10, 35);
      ctx.lineTo(-10, 45);
      ctx.closePath();
      ctx.fill();

      // Body (Armor)
      ctx.fillStyle = '#171717';
      ctx.strokeStyle = '#E3262E';
      ctx.lineWidth = 2;
      ctx.fillRect(-20, 15, 40, 50);
      ctx.strokeRect(-20, 15, 40, 50);

      // Samurai Helmet (Kabuto + Red Horns)
      ctx.fillStyle = '#111111';
      ctx.beginPath();
      ctx.arc(0, 10, 22, Math.PI, 0);
      ctx.fill();
      ctx.stroke();

      // Red Crest Horns
      ctx.fillStyle = '#E3262E';
      ctx.beginPath();
      ctx.moveTo(-15, 0);
      ctx.quadraticCurveTo(-25, -20, -10, -25);
      ctx.lineTo(0, -5);
      ctx.quadraticCurveTo(25, -20, 10, -25);
      ctx.lineTo(15, 0);
      ctx.fill();

      // Glowing Eyes
      ctx.fillStyle = s.player.action === 'hurt' ? '#E3262E' : '#FFFFFF';
      ctx.beginPath();
      ctx.arc(-8, 8, 4, 0, Math.PI * 2);
      ctx.arc(8, 8, 4, 0, Math.PI * 2);
      ctx.fill();

      // Katana Sword Slash Animation
      if (s.player.action === 'attack_light' || s.player.action === 'attack_heavy') {
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = s.player.action === 'attack_heavy' ? 5 : 3;
        ctx.shadowColor = '#E3262E';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(10, 15, 55, -Math.PI / 4, Math.PI / 3);
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Block Shield effect
      if (s.player.action === 'block') {
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(20, 25, 35, -Math.PI / 2, Math.PI / 2);
        ctx.stroke();
      }

      ctx.restore();

      // Draw Enemy
      if (s.enemy.hp > 0) {
        ctx.save();
        ctx.translate(s.enemy.x, s.enemy.y);

        ctx.fillStyle = s.enemy.type === 'boss' ? '#7F1015' : '#1F1F1F';
        ctx.strokeStyle = s.enemy.type === 'boss' ? '#E3262E' : '#A1A1AA';
        ctx.lineWidth = 2;
        ctx.fillRect(-22, 15, 44, 55);
        ctx.strokeRect(-22, 15, 44, 55);

        // Enemy Head & Eyes
        ctx.fillStyle = '#080808';
        ctx.beginPath();
        ctx.arc(0, 10, 20, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#E3262E';
        ctx.beginPath();
        ctx.arc(-6, 8, 3, 0, Math.PI * 2);
        ctx.arc(6, 8, 3, 0, Math.PI * 2);
        ctx.fill();

        // Enemy attack slash
        if (s.enemy.action === 'attack') {
          ctx.strokeStyle = '#E3262E';
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.arc(-10, 15, 45, Math.PI / 2, Math.PI);
          ctx.stroke();
        }

        ctx.restore();
      }

      // Render Particles
      s.particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      s.particles = s.particles.filter((p) => p.life > 0);

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(timerInterval);
    };
  }, []);

  return (
    <div className="relative bg-[#080808] border border-white/10 rounded-3xl p-4 shadow-2xl overflow-hidden select-none">
      {/* Top Game HUD Bar */}
      <div className="flex items-center justify-between gap-4 mb-3 px-2">
        {/* Player Health */}
        <div className="flex-1">
          <div className="flex justify-between text-xs font-bold mb-1">
            <span className="text-[#E3262E]">SAMURAI (YOU)</span>
            <span className="text-[#F5F5F5]">{playerHp} HP</span>
          </div>
          <div className="w-full bg-[#171717] h-3 rounded-full overflow-hidden border border-white/10">
            <div
              className="bg-gradient-to-r from-[#E3262E] to-emerald-500 h-full transition-all duration-200"
              style={{ width: `${playerHp}%` }}
            />
          </div>
        </div>

        {/* 60s Timer Badge */}
        <div className="flex flex-col items-center shrink-0">
          <span className="text-[10px] font-mono text-[#A1A1AA] uppercase">TIME REMAINING</span>
          <span className="text-2xl font-black text-[#E3262E] animate-pulse">{timeLeft}s</span>
        </div>

        {/* Enemy Health */}
        <div className="flex-1 text-right">
          <div className="flex justify-between text-xs font-bold mb-1">
            <span className="text-[#A1A1AA]">{enemyHp} HP</span>
            <span className="text-[#F5F5F5] uppercase">{enemyName}</span>
          </div>
          <div className="w-full bg-[#171717] h-3 rounded-full overflow-hidden border border-white/10">
            <div
              className="bg-red-600 h-full transition-all duration-200 ml-auto"
              style={{ width: `${enemyHp}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Canvas Arena */}
      <canvas
        ref={canvasRef}
        width={720}
        height={360}
        className="w-full h-auto rounded-2xl border border-white/10 shadow-inner bg-[#080808]"
      />

      {/* On-Screen Score & Combo Overlay */}
      <div className="absolute top-20 left-8 flex items-center gap-4 pointer-events-none">
        <div>
          <span className="text-[10px] text-[#A1A1AA] uppercase font-bold">SCORE</span>
          <p className="text-2xl font-black text-[#F5F5F5]">{score.toLocaleString()}</p>
        </div>
        {combo > 1 && (
          <div className="animate-bounce">
            <span className="text-xs text-[#E3262E] font-black uppercase">COMBO</span>
            <p className="text-xl font-black text-[#E3262E]">{combo}× STRIKE!</p>
          </div>
        )}
      </div>

      {/* On-Screen Mobile & Keyboard Virtual Controls */}
      <div className="mt-4 grid grid-cols-2 gap-4 pt-2 border-t border-white/10">
        {/* Left/Right Directional Controls */}
        <div className="flex items-center gap-2">
          <button
            onMouseDown={() => handleMove(-1)}
            onMouseUp={() => handleMove(0)}
            onTouchStart={() => handleMove(-1)}
            onTouchEnd={() => handleMove(0)}
            className="flex-1 py-3 bg-[#171717] border border-white/10 active:border-[#E3262E] text-[#F5F5F5] font-extrabold text-sm rounded-2xl shadow-lg active:scale-95 transition"
          >
            ← Move Left
          </button>
          <button
            onMouseDown={() => handleMove(1)}
            onMouseUp={() => handleMove(0)}
            onTouchStart={() => handleMove(1)}
            onTouchEnd={() => handleMove(0)}
            className="flex-1 py-3 bg-[#171717] border border-white/10 active:border-[#E3262E] text-[#F5F5F5] font-extrabold text-sm rounded-2xl shadow-lg active:scale-95 transition"
          >
            Move Right →
          </button>
        </div>

        {/* Action Attack Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleLightAttack}
            className="flex-1 py-3 bg-[#E3262E] hover:bg-[#f4333b] text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-[#E3262E]/30 active:scale-95 transition"
          >
            J: Slash
          </button>
          <button
            onClick={handleHeavyAttack}
            className="flex-1 py-3 bg-gradient-to-r from-[#E3262E] to-[#7F1015] text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg active:scale-95 transition"
          >
            K: Heavy Strike
          </button>
          <button
            onMouseDown={() => handleBlock(true)}
            onMouseUp={() => handleBlock(false)}
            onTouchStart={() => handleBlock(true)}
            onTouchEnd={() => handleBlock(false)}
            className="px-4 py-3 bg-[#171717] border border-white/10 text-cyan-400 font-bold text-xs rounded-2xl active:scale-95 transition"
          >
            L: Block
          </button>
        </div>
      </div>
    </div>
  );
};
