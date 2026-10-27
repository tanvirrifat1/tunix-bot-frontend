'use client';

import React, { useState } from 'react';
import { Sparkles, Volume2, VolumeX, Smile, Eye, Zap, Moon } from 'lucide-react';

type EmotionType = 'happy' | 'excited' | 'curious' | 'wink' | 'sleep' | 'focus';

export default function InteractiveHeroRobot() {
  const [emotion, setEmotion] = useState<EmotionType>('happy');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Synthesize soft robotic chirps using Web Audio API (safe, no audio files needed)
  const playRobotChirp = (type: EmotionType) => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      gain.gain.setValueAtTime(0.08, now);

      if (type === 'happy' || type === 'excited') {
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      } else if (type === 'wink') {
        osc.frequency.setValueAtTime(650, now);
        osc.frequency.exponentialRampToValueAtTime(920, now + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      } else if (type === 'sleep') {
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      } else {
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(680, now + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      }

      osc.start(now);
      osc.stop(now + 0.35);
    } catch {
      // AudioContext could be blocked if no user interaction yet, ignore
    }
  };

  const handleSelectEmotion = (newEmotion: EmotionType) => {
    setEmotion(newEmotion);
    playRobotChirp(newEmotion);
  };

  // Color schemes based on emotion
  const getGlowColor = () => {
    switch (emotion) {
      case 'happy':
        return '#06b6d4'; // Cyan
      case 'excited':
        return '#10b981'; // Emerald
      case 'wink':
        return '#38bdf8'; // Sky blue
      case 'focus':
        return '#a855f7'; // Purple
      case 'sleep':
        return '#64748b'; // Slate dim
      case 'curious':
        return '#f59e0b'; // Amber
      default:
        return '#06b6d4';
    }
  };

  const glowColor = getGlowColor();

  return (
    <div className="relative flex flex-col items-center">
      {/* Robot Physical Body Card */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md mx-auto p-6 sm:p-8 rounded-3xl glass-panel border border-cyan-500/20 shadow-2xl shadow-cyan-950/50 backdrop-blur-xl">
        {/* Glow ambient circle behind head */}
        <div
          className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-3xl pointer-events-none transition-colors duration-500"
          style={{ backgroundColor: `${glowColor}25` }}
        />

        {/* Top Antenna / Head Feature */}
        <div className="flex justify-center -mt-10 sm:-mt-12 mb-3">
          <div className="relative flex flex-col items-center">
            {/* Cute sprout leaf indicator */}
            <div className="flex items-center gap-1 group cursor-pointer" onClick={() => handleSelectEmotion('excited')}>
              <span
                className="w-4 h-6 rounded-full rotate-45 transform origin-bottom transition-all duration-300"
                style={{ backgroundColor: glowColor }}
              />
              <span
                className="w-4 h-6 rounded-full -rotate-45 transform origin-bottom -ml-2 transition-all duration-300"
                style={{ backgroundColor: glowColor }}
              />
            </div>
            <div className="w-2.5 h-3 bg-slate-700 rounded-b" />
          </div>
        </div>

        {/* Robot Head Frame */}
        <div className="relative mx-auto w-64 sm:w-72 h-44 sm:h-48 rounded-[36px] bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-slate-700/80 shadow-inner flex items-center justify-center p-3 animate-float">
          {/* Ear modules on sides */}
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-3.5 h-12 bg-slate-700 rounded-l-full border border-slate-600 shadow-md" />
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-3.5 h-12 bg-slate-700 rounded-r-full border border-slate-600 shadow-md" />

          {/* OLED Glass Face Screen */}
          <div className="relative w-full h-full rounded-[28px] bg-black border border-slate-800 flex items-center justify-center overflow-hidden shadow-2xl">
            {/* Subtle Screen Scanline Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/5 to-transparent pointer-events-none opacity-40" />

            {/* Glowing Emotive Eyes */}
            <div className="relative flex items-center justify-center gap-8 sm:gap-10">
              {/* Left Eye */}
              <div
                className="transition-all duration-300 flex items-center justify-center"
                style={{
                  filter: `drop-shadow(0 0 16px ${glowColor})`,
                }}
              >
                {emotion === 'happy' && (
                  <div
                    className="w-12 h-14 rounded-2xl robot-eye-blinking"
                    style={{ backgroundColor: glowColor }}
                  />
                )}
                {emotion === 'excited' && (
                  <div
                    className="w-14 h-16 rounded-full animate-bounce"
                    style={{ backgroundColor: glowColor }}
                  >
                    <div className="w-4 h-4 bg-white rounded-full mt-2 ml-2" />
                  </div>
                )}
                {emotion === 'wink' && (
                  <div
                    className="w-13 h-15 rounded-2xl"
                    style={{ backgroundColor: glowColor }}
                  />
                )}
                {emotion === 'curious' && (
                  <div
                    className="w-14 h-14 rounded-full border-4"
                    style={{ borderColor: glowColor, backgroundColor: 'transparent' }}
                  >
                    <div className="w-6 h-6 rounded-full mx-auto my-auto mt-2" style={{ backgroundColor: glowColor }} />
                  </div>
                )}
                {emotion === 'focus' && (
                  <div
                    className="w-14 h-6 rounded-lg"
                    style={{ backgroundColor: glowColor }}
                  />
                )}
                {emotion === 'sleep' && (
                  <div
                    className="w-12 h-2.5 rounded-full"
                    style={{ backgroundColor: glowColor }}
                  />
                )}
              </div>

              {/* Right Eye */}
              <div
                className="transition-all duration-300 flex items-center justify-center"
                style={{
                  filter: `drop-shadow(0 0 16px ${glowColor})`,
                }}
              >
                {emotion === 'happy' && (
                  <div
                    className="w-12 h-14 rounded-2xl robot-eye-blinking"
                    style={{ backgroundColor: glowColor }}
                  />
                )}
                {emotion === 'excited' && (
                  <div
                    className="w-14 h-16 rounded-full animate-bounce"
                    style={{ backgroundColor: glowColor }}
                  >
                    <div className="w-4 h-4 bg-white rounded-full mt-2 ml-2" />
                  </div>
                )}
                {emotion === 'wink' && (
                  <div
                    className="w-12 h-2.5 rounded-full"
                    style={{ backgroundColor: glowColor }}
                  />
                )}
                {emotion === 'curious' && (
                  <div
                    className="w-12 h-12 rounded-2xl"
                    style={{ backgroundColor: glowColor }}
                  />
                )}
                {emotion === 'focus' && (
                  <div
                    className="w-14 h-6 rounded-lg"
                    style={{ backgroundColor: glowColor }}
                  />
                )}
                {emotion === 'sleep' && (
                  <div
                    className="w-12 h-2.5 rounded-full"
                    style={{ backgroundColor: glowColor }}
                  />
                )}
              </div>
            </div>

            {/* Subtle mouth or pulse bar */}
            {emotion === 'happy' && (
              <div
                className="absolute bottom-5 w-8 h-2 rounded-full opacity-80"
                style={{ backgroundColor: glowColor }}
              />
            )}
          </div>
        </div>

        {/* Robot Chassis Base / Legs */}
        <div className="mt-4 flex justify-center gap-6">
          <div className="w-12 h-7 bg-slate-800 rounded-t-xl border border-slate-700 shadow-inner flex items-center justify-center">
            <div className="w-6 h-1.5 bg-cyan-500/40 rounded-full" />
          </div>
          <div className="w-12 h-7 bg-slate-800 rounded-t-xl border border-slate-700 shadow-inner flex items-center justify-center">
            <div className="w-6 h-1.5 bg-cyan-500/40 rounded-full" />
          </div>
        </div>

        {/* Live Interaction Controls */}
        <div className="mt-6 pt-5 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="text-slate-400 font-medium flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              Live Reaction Matrix:
            </span>

            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
              title="Toggle Robot Audio Chirps"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="h-3.5 w-3.5 text-cyan-400" />
                  <span className="text-[11px]">Sound On</span>
                </>
              ) : (
                <>
                  <VolumeX className="h-3.5 w-3.5 text-slate-500" />
                  <span className="text-[11px]">Mute</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            <button
              type="button"
              onClick={() => handleSelectEmotion('happy')}
              className={`py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                emotion === 'happy'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm shadow-cyan-500/20'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              😊 Happy
            </button>

            <button
              type="button"
              onClick={() => handleSelectEmotion('excited')}
              className={`py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                emotion === 'excited'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm shadow-emerald-500/20'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              ⚡ Excited
            </button>

            <button
              type="button"
              onClick={() => handleSelectEmotion('curious')}
              className={`py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                emotion === 'curious'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm shadow-amber-500/20'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              🧐 Curious
            </button>

            <button
              type="button"
              onClick={() => handleSelectEmotion('wink')}
              className={`py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                emotion === 'wink'
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/50 shadow-sm shadow-sky-500/20'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              😉 Wink
            </button>

            <button
              type="button"
              onClick={() => handleSelectEmotion('focus')}
              className={`py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                emotion === 'focus'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50 shadow-sm shadow-purple-500/20'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              🎯 Focus
            </button>

            <button
              type="button"
              onClick={() => handleSelectEmotion('sleep')}
              className={`py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                emotion === 'sleep'
                  ? 'bg-slate-700 text-slate-200 border border-slate-600'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              💤 Sleep
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
