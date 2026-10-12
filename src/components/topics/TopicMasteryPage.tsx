import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  ShieldAlert,
  Brain,
  Lock,
  ChevronRight,
  Lightbulb,
  AlertTriangle,
  Award,
  Zap,
  HelpCircle,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  CURRICULUM_TRACKS,
  TopicModule,
  CurriculumTrack,
  MasteryStatus
} from '../../data/topicCurriculumData';

export const TopicMasteryPage: React.FC = () => {
  const { addXP, navigateTo } = useApp();

  const [activeTrackId, setActiveTrackId] = useState<string>('cybersecurity_fundamentals');
  const [activeModule, setActiveModule] = useState<TopicModule | null>(null);

  // User module mastery tracking state
  const [moduleMastery, setModuleMastery] = useState<Record<string, MasteryStatus>>(() => {
    try {
      const saved = localStorage.getItem('digisentinel_mastery_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      cf_password_security: 'practising',
      cf_mfa: 'learning',
      cf_phishing: 'not_started',
      dp_data_minimization: 'not_started',
      dp_tracking_cookies: 'not_started',
      of_payment_upi: 'practising',
      of_support_impersonation: 'not_started',
      tr_network_triage: 'not_started',
      tr_code_comprehension: 'not_started'
    };
  });

  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const activeTrack = CURRICULUM_TRACKS.find(t => t.id === activeTrackId) || CURRICULUM_TRACKS[0];

  const handleOpenModule = (mod: TopicModule) => {
    setActiveModule(mod);
    setSelectedQuizOption(null);
    setQuizSubmitted(false);

    // If module was not started, update to learning
    if (moduleMastery[mod.id] === 'not_started') {
      updateMastery(mod.id, 'learning');
    }
  };

  const updateMastery = (modId: string, status: MasteryStatus) => {
    setModuleMastery(prev => {
      const updated = { ...prev, [modId]: status };
      try {
        localStorage.setItem('digisentinel_mastery_v1', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const handleQuizSubmit = () => {
    if (!selectedQuizOption || !activeModule || quizSubmitted) return;
    setQuizSubmitted(true);

    const chosen = activeModule.knowledgeCheck.options.find(o => o.id === selectedQuizOption);
    if (chosen?.isCorrect) {
      updateMastery(activeModule.id, 'proficient');
      addXP(60);
    } else {
      updateMastery(activeModule.id, 'needs_revision');
    }
  };

  const getStatusBadge = (status: MasteryStatus) => {
    switch (status) {
      case 'proficient':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            Proficient
          </span>
        );
      case 'practising':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
            Practising
          </span>
        );
      case 'learning':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
            Learning
          </span>
        );
      case 'needs_revision':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30">
            Needs Revision
          </span>
        );
      case 'not_started':
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono text-slate-500 bg-sentinel-950 border border-sentinel-800">
            Not Started
          </span>
        );
    }
  };

  const trackIcons: Record<string, React.ElementType> = {
    cybersecurity_fundamentals: ShieldCheck,
    digital_privacy: Lock,
    online_fraud: ShieldAlert,
    technical_reasoning: Brain
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-electric-950/60 border border-blue-200 dark:border-electric-500/30 text-blue-700 dark:text-electric-300 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
          <span>Curriculum Mastery & Learning Paths</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
          Topic Mastery Paths
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm max-w-2xl leading-relaxed">
          Structured defensive curriculum designed to systematically address skill gaps. Every module includes learning objectives, practical scenarios, common pitfalls, and an evaluative knowledge check.
        </p>
      </div>

      {/* Curriculum Track Switcher Pills */}
      <div className="flex flex-wrap gap-2.5 pb-2 border-b border-sentinel-800">
        {CURRICULUM_TRACKS.map(track => {
          const Icon = trackIcons[track.id] || BookOpen;
          const isSelected = track.id === activeTrackId;
          const totalMods = track.modules.length;
          const proficientCount = track.modules.filter(m => moduleMastery[m.id] === 'proficient').length;

          return (
            <button
              key={track.id}
              onClick={() => setActiveTrackId(track.id)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-medium transition-all ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-sentinel-900 border border-sentinel-800 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{track.title}</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                isSelected ? 'bg-white/20 text-white' : 'bg-sentinel-950 text-slate-600 dark:text-slate-400'
              }`}>
                {proficientCount}/{totalMods}
              </span>
            </button>
          );
        })}
      </div>

      {/* Track Overview Card */}
      <div className="p-6 rounded-3xl bg-sentinel-900 border border-sentinel-800 space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display">
            {activeTrack.title}
          </h2>
          <span className="text-xs font-mono text-blue-600 dark:text-cyan-400 font-semibold">{activeTrack.tagline}</span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
          {activeTrack.description}
        </p>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeTrack.modules.map(mod => {
          const status = moduleMastery[mod.id] || 'not_started';

          return (
            <div
              key={mod.id}
              className="p-6 rounded-3xl bg-sentinel-900 border border-sentinel-800 hover:border-blue-400 dark:hover:border-slate-600 transition flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>~{mod.estimatedMinutes} mins</span>
                  </div>
                  {getStatusBadge(status)}
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                  {mod.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {mod.shortDescription}
                </p>

                {/* Key takeaway callout preview */}
                <div className="p-3 rounded-xl bg-sentinel-950 border border-sentinel-800 text-[11px] text-blue-700 dark:text-cyan-300 font-mono leading-relaxed">
                  Rule: {mod.keyTakeaway}
                </div>
              </div>

              <button
                onClick={() => handleOpenModule(mod)}
                className="w-full py-2.5 rounded-xl bg-sentinel-950 hover:bg-blue-600 text-slate-700 dark:text-slate-300 hover:text-white border border-sentinel-800 hover:border-blue-600 font-semibold text-xs flex items-center justify-center gap-2 transition"
              >
                <span>Open Module & Drill</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Active Module Modal / Drawer */}
      {activeModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-sentinel-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-sentinel-900 border border-sentinel-800 shadow-2xl p-6 sm:p-8 space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-sentinel-800 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-cyan-400 font-bold">
                    {activeTrack.title}
                  </span>
                  <span className="text-slate-400 dark:text-slate-600">•</span>
                  {getStatusBadge(moduleMastery[activeModule.id] || 'learning')}
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white font-display">
                  {activeModule.title}
                </h2>
              </div>

              <button
                onClick={() => setActiveModule(null)}
                className="p-2 rounded-xl bg-sentinel-950 border border-sentinel-800 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Learning Objectives */}
            <div className="p-4 rounded-2xl bg-sentinel-950 border border-sentinel-800 space-y-2">
              <h4 className="text-xs font-mono text-blue-600 dark:text-cyan-400 uppercase tracking-wider font-bold">
                Learning Objectives
              </h4>
              <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300 list-disc list-inside">
                {activeModule.objectives.map((obj, i) => (
                  <li key={i}>{obj}</li>
                ))}
              </ul>
            </div>

            {/* In-Depth Explanation */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold">
                Technical Explanation & Mechanism
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                {activeModule.explanation}
              </p>
            </div>

            {/* Practical Example */}
            <div className="p-4 rounded-2xl bg-sentinel-950 border border-sentinel-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider">
                <Lightbulb className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                <span>Practical Case Study: {activeModule.practicalExample.title}</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                <span className="text-slate-900 dark:text-white font-semibold">Scenario: </span>
                {activeModule.practicalExample.scenario}
              </p>
              <p className="text-xs text-emerald-700 dark:text-emerald-300 leading-relaxed font-mono">
                <span className="text-slate-900 dark:text-white font-semibold">Safe Action: </span>
                {activeModule.practicalExample.safeAction}
              </p>
            </div>

            {/* Common Mistakes */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono text-rose-500 dark:text-rose-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Common High-Risk Mistakes</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {activeModule.commonMistakes.map((mis, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">✕</span>
                    <span>{mis}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Evaluative Knowledge Check */}
            <div className="p-5 rounded-2xl bg-sentinel-950 border border-sentinel-800 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-sentinel-800 text-xs">
                <span className="font-mono text-slate-900 dark:text-white font-bold uppercase tracking-wider">
                  Knowledge Check & Mastery Verification
                </span>
                <span className="text-[11px] font-mono text-blue-600 dark:text-cyan-400 font-semibold">+60 XP on Correct</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium">
                {activeModule.knowledgeCheck.question}
              </p>

              <div className="space-y-2.5">
                {activeModule.knowledgeCheck.options.map(opt => {
                  const isSelected = selectedQuizOption === opt.id;
                  let btnClass = 'border-sentinel-800 bg-sentinel-900 hover:border-slate-400 dark:hover:border-slate-600 text-slate-700 dark:text-slate-300';

                  if (quizSubmitted) {
                    if (opt.isCorrect) {
                      btnClass = 'border-emerald-500/70 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200';
                    } else if (isSelected && !opt.isCorrect) {
                      btnClass = 'border-rose-500/70 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200';
                    } else {
                      btnClass = 'border-sentinel-800 bg-sentinel-950 text-slate-400 dark:text-slate-500 opacity-60';
                    }
                  } else if (isSelected) {
                    btnClass = 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-white ring-1 ring-blue-500';
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => !quizSubmitted && setSelectedQuizOption(opt.id)}
                      disabled={quizSubmitted}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-start justify-between gap-2 ${btnClass}`}
                    >
                      <span>{opt.text}</span>
                      {quizSubmitted && (
                        <span className="shrink-0 mt-0.5">
                          {opt.isCorrect ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          ) : isSelected ? (
                            <span className="text-rose-500 font-bold">✕</span>
                          ) : null}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {!quizSubmitted ? (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleQuizSubmit}
                    disabled={!selectedQuizOption}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-xs flex items-center gap-2 transition"
                  >
                    <span>Verify Answer</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-sentinel-900 border border-sentinel-800 text-xs space-y-3">
                  <div className="font-bold text-slate-900 dark:text-white">
                    {activeModule.knowledgeCheck.options.find(o => o.id === selectedQuizOption)?.isCorrect
                      ? '✓ Mastery Demonstrated: Status updated to Proficient!'
                      : 'Needs Practice: Review the practical case study above and try again.'}
                  </div>
                  <p className="text-slate-600 dark:text-slate-300">
                    {activeModule.knowledgeCheck.options.find(o => o.id === selectedQuizOption)?.feedback}
                  </p>
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => setActiveModule(null)}
                      className="px-5 py-2 rounded-xl bg-sentinel-950 hover:bg-sentinel-850 text-slate-800 dark:text-white border border-sentinel-800 text-xs font-semibold"
                    >
                      Close & Return to Tracks
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
