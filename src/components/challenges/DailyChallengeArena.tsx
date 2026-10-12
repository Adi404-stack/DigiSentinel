import React, { useState } from 'react';
import {
  Calendar,
  Flame,
  Zap,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ShieldAlert,
  Code2,
  Lock,
  Compass,
  RotateCcw,
  Clock,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DAILY_CHALLENGES, getTodayChallenge, DailyChallenge } from '../../data/dailyChallengesData';
import { Badge } from '../common/Badge';

export const DailyChallengeArena: React.FC = () => {
  const { addXP, profile, navigateTo } = useApp();
  const todayChallenge = getTodayChallenge();

  const [selectedChallenge, setSelectedChallenge] = useState<DailyChallenge>(todayChallenge);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [unlockedHints, setUnlockedHints] = useState<number>(0); // 0 = none, 1 = first, 2 = second
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  const selectedOption = selectedChallenge.options.find(o => o.id === selectedOptionId);
  const isAlreadyDone = completedIds.includes(selectedChallenge.id);

  const handleSelectOption = (optId: string) => {
    if (isSubmitted || isAlreadyDone) return;
    setSelectedOptionId(optId);
  };

  const handleUnlockHint = () => {
    if (unlockedHints < selectedChallenge.hints.length) {
      setUnlockedHints(prev => prev + 1);
    }
  };

  const handleSubmit = () => {
    if (!selectedOptionId || isSubmitted || !selectedOption) return;
    setIsSubmitted(true);

    if (selectedOption.isCorrect && !isAlreadyDone) {
      const earnedXP = Math.max(20, 50 - unlockedHints * 10);
      addXP(earnedXP);
      setCompletedIds(prev => [...prev, selectedChallenge.id]);
    }
  };

  const handleSwitchChallenge = (ch: DailyChallenge) => {
    setSelectedChallenge(ch);
    setSelectedOptionId(null);
    setUnlockedHints(0);
    setIsSubmitted(completedIds.includes(ch.id));
  };

  const categoryIcons: Record<string, React.ElementType> = {
    phishing: ShieldAlert,
    password: Lock,
    privacy: Compass,
    fraud: ShieldAlert,
    technical_reasoning: Lightbulb,
    programming: Code2,
    secure_coding: Code2,
  };

  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Top Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-sentinel-900/80 border border-sentinel-800 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-950/60 border border-electric-500/30 text-electric-300 text-xs font-semibold">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>Calendar-Synchronized Daily Drills</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
              Daily Challenge Arena
            </h1>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <div className="px-3.5 py-2 rounded-xl bg-sentinel-950 border border-sentinel-800 flex items-center gap-2 text-amber-400">
              <Flame className="w-4 h-4 fill-amber-400" />
              <span className="font-bold">{profile.currentStreakDays} Day Streak</span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-sentinel-950 border border-sentinel-800 flex items-center gap-2 text-cyan-300">
              <Zap className="w-4 h-4 fill-cyan-400" />
              <span className="font-bold">+{50} XP Today</span>
            </div>
          </div>
        </div>

        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
          Sharpen your technical reflexes with deterministic daily scenarios. Each challenge tests real defensive decisions in phishing, fraud, credential entropy, and secure software engineering.
        </p>

        {/* Challenge Category Selector Tabs */}
        <div className="pt-3 border-t border-sentinel-850 flex flex-wrap gap-2">
          {DAILY_CHALLENGES.map(ch => {
            const Icon = categoryIcons[ch.category] || ShieldAlert;
            const isToday = ch.id === todayChallenge.id;
            const isSelected = selectedChallenge.id === ch.id;
            const isDone = completedIds.includes(ch.id);

            return (
              <button
                key={ch.id}
                onClick={() => handleSwitchChallenge(ch)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-electric-600 text-white shadow-md'
                    : 'bg-sentinel-950 border border-sentinel-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{ch.categoryLabel}</span>
                {isToday && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-400/20 text-cyan-300 font-mono font-bold">
                    TODAY
                  </span>
                )}
                {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 ml-1" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Challenge Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Challenge Content (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-sentinel-900/70 border border-sentinel-800 space-y-6">
            {/* Title & Metadata */}
            <div className="space-y-3 pb-4 border-b border-sentinel-850">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                  {selectedChallenge.categoryLabel}
                </span>
                <div className="flex items-center gap-2">
                  <Badge difficulty={selectedChallenge.difficulty} />
                  <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>~{selectedChallenge.estimatedMinutes} min</span>
                  </span>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                {selectedChallenge.title}
              </h2>
            </div>

            {/* Scenario Description */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                Scenario Briefing:
              </span>
              <p className="text-sm text-slate-200 leading-relaxed bg-sentinel-950/60 p-4 rounded-2xl border border-sentinel-850">
                {selectedChallenge.scenario}
              </p>
            </div>

            {/* Evidence Viewer */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="uppercase tracking-wider font-semibold">
                  Evidence Inspector: {selectedChallenge.evidence.title}
                </span>
                <span className="text-slate-500">{selectedChallenge.evidence.type.toUpperCase()}</span>
              </div>
              <div className="p-4 rounded-2xl bg-sentinel-950 border border-sentinel-800 font-mono text-xs text-slate-300 overflow-x-auto whitespace-pre leading-relaxed">
                {selectedChallenge.evidence.content}
              </div>
            </div>

            {/* Multiple Choice Options */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono text-slate-300 font-bold block">
                Select the Most Effective Defensive Action:
              </span>

              {selectedChallenge.options.map(option => {
                const isSelected = selectedOptionId === option.id;
                let optClass = 'border-sentinel-800 bg-sentinel-950/60 hover:border-slate-600 text-slate-300';

                if (isSubmitted || isAlreadyDone) {
                  if (option.isCorrect) {
                    optClass = 'border-emerald-500/70 bg-emerald-950/40 text-emerald-200';
                  } else if (isSelected && !option.isCorrect) {
                    optClass = 'border-rose-500/70 bg-rose-950/40 text-rose-200';
                  } else {
                    optClass = 'border-sentinel-850 bg-sentinel-950/40 text-slate-500 opacity-60';
                  }
                } else if (isSelected) {
                  optClass = 'border-electric-500 bg-electric-950/40 text-white';
                }

                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelectOption(option.id)}
                    disabled={isSubmitted || isAlreadyDone}
                    className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm transition-all duration-200 flex items-start justify-between gap-3 ${optClass}`}
                  >
                    <span>{option.text}</span>
                    {(isSubmitted || isAlreadyDone) && (
                      <span className="shrink-0 mt-0.5">
                        {option.isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : isSelected ? (
                          <XCircle className="w-4 h-4 text-rose-400" />
                        ) : null}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Submission Action */}
            {!isSubmitted && !isAlreadyDone && (
              <div className="pt-4 flex justify-end">
                <button
                  onClick={handleSubmit}
                  disabled={!selectedOptionId}
                  className="px-6 py-3 rounded-xl bg-electric-600 hover:bg-electric-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-electric-600/30 transition"
                >
                  <span>Submit Defensive Decision</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Detailed Correctness & Educational Breakdown */}
            {(isSubmitted || isAlreadyDone) && selectedOption && (
              <div className={`p-5 rounded-2xl border text-xs leading-relaxed space-y-4 ${
                selectedOption.isCorrect
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                  : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
              }`}>
                <div className="flex items-center gap-2 text-sm font-bold">
                  {selectedOption.isCorrect ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span>Decisive Defense: Correct Answer!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-rose-400" />
                      <span>Defensive Misstep</span>
                    </>
                  )}
                </div>

                <p className="text-slate-200 font-medium">{selectedOption.feedback}</p>

                {/* Defense Rule Card */}
                <div className="p-4 rounded-xl bg-sentinel-950/90 border border-sentinel-800 text-slate-300 space-y-2">
                  <div className="font-mono text-cyan-400 uppercase tracking-wider text-[11px] font-bold">
                    Core Security Axiom:
                  </div>
                  <p className="font-mono text-white text-xs">{selectedChallenge.explanation.defenseRule}</p>
                  <p className="text-slate-400 text-xs mt-1">{selectedChallenge.explanation.overview}</p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <span className="font-mono text-slate-400 text-[11px]">
                    Impact: {selectedChallenge.explanation.realWorldImpact}
                  </span>
                  <button
                    onClick={() => navigateTo('lab')}
                    className="px-4 py-2 rounded-xl bg-sentinel-900 hover:bg-sentinel-850 text-cyan-300 border border-cyan-500/30 text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <span>Practice in Digital Safety Lab</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Progressive Hint Engine & Calendar Status (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Progressive Hint Drawer */}
          <div className="p-6 rounded-3xl bg-sentinel-900/70 border border-sentinel-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-sentinel-850">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white font-display">
                  Progressive Hints
                </h3>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                {unlockedHints}/{selectedChallenge.hints.length} Active
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Hints guide your investigation without prematurely revealing the solution. (Each unlocked hint deducts 10 XP).
            </p>

            <div className="space-y-3">
              {selectedChallenge.hints.map((hintObj, idx) => {
                const isUnlocked = unlockedHints > idx;
                return (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-2xl border text-xs transition-all ${
                      isUnlocked
                        ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                        : 'bg-sentinel-950 border-sentinel-850 text-slate-500'
                    }`}
                  >
                    <div className="font-mono font-bold text-[11px] mb-1">
                      {hintObj.label}
                    </div>
                    {isUnlocked ? (
                      <p className="leading-relaxed text-slate-300">{hintObj.hint}</p>
                    ) : (
                      <p className="italic">Hint locked. Click below to reveal observation.</p>
                    )}
                  </div>
                );
              })}
            </div>

            {unlockedHints < selectedChallenge.hints.length && !isSubmitted && !isAlreadyDone && (
              <button
                onClick={handleUnlockHint}
                className="w-full py-2.5 rounded-xl bg-sentinel-950 hover:bg-sentinel-850 border border-amber-500/30 text-amber-300 font-semibold text-xs flex items-center justify-center gap-2 transition"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Unlock Next Hint (-10 XP)</span>
              </button>
            )}
          </div>

          {/* Calendar Cadence Card */}
          <div className="p-6 rounded-3xl bg-sentinel-900/70 border border-sentinel-800 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-sentinel-850 text-xs">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span className="font-mono text-white font-bold uppercase tracking-wider">
                Schedule & Rotation
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Today's Date:</span>
                <span className="font-mono text-white">{todayFormatted}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Total Challenges:</span>
                <span className="font-mono text-cyan-400">{DAILY_CHALLENGES.length} Curated Scenarios</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Completed This Session:</span>
                <span className="font-mono text-emerald-400">{completedIds.length}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => navigateTo('topics')}
                className="w-full py-2.5 rounded-xl bg-sentinel-950 hover:bg-sentinel-850 border border-sentinel-800 text-slate-300 hover:text-white font-medium text-xs flex items-center justify-center gap-2 transition"
              >
                <span>Browse All Curriculum Topics</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
