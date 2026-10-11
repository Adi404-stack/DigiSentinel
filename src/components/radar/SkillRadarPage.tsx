import React, { useState } from 'react';
import {
  Radar,
  HelpCircle,
  Clock,
  ArrowRight,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileText,
  Lightbulb,
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';

export const SkillRadarPage: React.FC = () => {
  const {
    diagnosticChallenges,
    currentChallengeIndex,
    diagnosticSubmissions,
    submitChallengeAnswer,
    nextChallenge,
    resetDiagnostic,
    t
  } = useApp();

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<string>('');
  const [activeEvidenceTab, setActiveEvidenceTab] = useState<number>(0);
  const [showHintIndex, setShowHintIndex] = useState<number>(-1);
  const [submittedForCurrent, setSubmittedForCurrent] = useState<boolean>(false);

  const currentChallenge = diagnosticChallenges[currentChallengeIndex];

  // Check if current challenge has already been answered in persistent state
  const existingSubmission = diagnosticSubmissions.find(s => s.challengeId === currentChallenge?.id);
  const isAnswered = submittedForCurrent || !!existingSubmission;
  const currentOption = currentChallenge?.options.find(
    o => o.id === (existingSubmission ? existingSubmission.selectedOptionId : selectedOptionId)
  );

  const handleSelectOption = (optId: string) => {
    if (isAnswered) return;
    setSelectedOptionId(optId);
  };

  const handleSubmit = () => {
    if (!selectedOptionId || isAnswered || !currentChallenge) return;
    submitChallengeAnswer(selectedOptionId, explanation, showHintIndex >= 0 ? showHintIndex + 1 : 0);
    setSubmittedForCurrent(true);
  };

  const handleNext = () => {
    setSelectedOptionId(null);
    setExplanation('');
    setActiveEvidenceTab(0);
    setShowHintIndex(-1);
    setSubmittedForCurrent(false);
    nextChallenge();
  };

  if (!currentChallenge) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Diagnostic Ready</h2>
        <button
          onClick={resetDiagnostic}
          className="px-6 py-2.5 rounded-xl bg-electric-600 text-white text-xs font-semibold"
        >
          Restart Diagnostic
        </button>
      </div>
    );
  }

  const progressPercent = Math.round(((currentChallengeIndex) / diagnosticChallenges.length) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Progress & Header Bar */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-mono text-cyan-400 font-bold">
              Task {currentChallengeIndex + 1} of {diagnosticChallenges.length}
            </span>
            <span className="text-slate-600">•</span>
            <Badge difficulty={currentChallenge.difficulty} />
            {currentChallenge.isFoundationalBranch && (
              <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30">
                Adaptive Reinforcement
              </span>
            )}
            {currentChallenge.isAdvancedBranch && (
              <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-violet-500/10 text-violet-300 border border-violet-500/30">
                Advanced Variant
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 text-slate-400 font-mono">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>~{currentChallenge.estimatedMinutes} min</span>
            </div>
            <button
              onClick={() => {
                if (window.confirm('Restart the diagnostic from task 1?')) {
                  resetDiagnostic();
                }
              }}
              title="Restart Diagnostic"
              className="text-slate-500 hover:text-slate-300 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-sentinel-900 rounded-full h-1.5 overflow-hidden border border-sentinel-800">
          <div
            className="bg-gradient-to-r from-electric-500 to-cyan-400 h-1.5 transition-all duration-300"
            style={{ width: `${Math.max(5, progressPercent)}%` }}
          />
        </div>
      </div>

      {/* Main Challenge Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-sentinel-900/80 border border-sentinel-800 shadow-2xl space-y-6">
        {/* Title & Competency */}
        <div className="space-y-2 border-b border-sentinel-800 pb-5">
          <div className="flex items-center gap-2 text-xs text-electric-400 font-medium">
            <span className="capitalize">{currentChallenge.domainId.replace('_', ' ')}</span>
            <span>/</span>
            <span>{currentChallenge.competencyName}</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            {currentChallenge.title}
          </h2>
        </div>

        {/* Scenario Description */}
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400">The Scenario:</span>
          <p className="text-sm text-slate-200 leading-relaxed bg-sentinel-950/60 p-4 rounded-xl border border-sentinel-850">
            {currentChallenge.scenario}
          </p>
        </div>

        {/* Evidence Viewer (Interactive Tabs) */}
        {currentChallenge.evidence.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                <span>Primary Evidence & Telemetry</span>
              </span>
              <span className="text-[11px] font-mono text-slate-500">Inspect tabs to verify claims</span>
            </div>

            <div className="rounded-xl border border-sentinel-800 bg-sentinel-950 overflow-hidden">
              {/* Evidence Tabs Bar */}
              <div className="flex border-b border-sentinel-800 bg-sentinel-900/60 px-2 pt-2 gap-1 overflow-x-auto">
                {currentChallenge.evidence.map((ev, idx) => (
                  <button
                    key={ev.id}
                    onClick={() => setActiveEvidenceTab(idx)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-t-lg transition whitespace-nowrap ${
                      activeEvidenceTab === idx
                        ? 'bg-sentinel-950 text-white border-t-2 border-electric-500'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-sentinel-850/50'
                    }`}
                  >
                    {ev.title}
                  </button>
                ))}
              </div>

              {/* Active Evidence Content */}
              <div className="p-4 overflow-x-auto max-h-72 text-xs font-mono text-slate-300 leading-relaxed whitespace-pre-wrap selection:bg-electric-500">
                {currentChallenge.evidence[activeEvidenceTab]?.content}
              </div>
            </div>
          </div>
        )}

        {/* Task Instructions */}
        <div className="pt-2">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Instructions: {currentChallenge.instructions}
          </p>
        </div>

        {/* Interactive Options List */}
        <div className="space-y-3">
          {currentChallenge.options.map(option => {
            const isSelected = (existingSubmission ? existingSubmission.selectedOptionId : selectedOptionId) === option.id;
            let optionStyles = 'border-sentinel-800 bg-sentinel-950/70 hover:border-slate-600 text-slate-300';

            if (isAnswered) {
              if (option.isCorrect) {
                optionStyles = 'border-emerald-500/80 bg-emerald-950/30 text-emerald-200';
              } else if (isSelected && !option.isCorrect) {
                optionStyles = 'border-rose-500/80 bg-rose-950/30 text-rose-200';
              } else {
                optionStyles = 'border-sentinel-850 opacity-40 text-slate-500';
              }
            } else if (isSelected) {
              optionStyles = 'border-electric-500 bg-electric-950/40 text-white ring-1 ring-electric-500';
            }

            return (
              <div
                key={option.id}
                onClick={() => handleSelectOption(option.id)}
                className={`p-4 rounded-xl border text-xs leading-relaxed transition cursor-pointer flex items-start gap-3 ${optionStyles}`}
              >
                <div className="mt-0.5">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    isSelected ? 'border-electric-400 bg-electric-500' : 'border-slate-600'
                  }`}>
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium">{option.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Optional Explanation Field */}
        {!isAnswered && (
          <div className="space-y-2 pt-1">
            <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
              Optional reasoning explanation (helps assess evidence-based logic):
            </label>
            <input
              type="text"
              value={explanation}
              onChange={e => setExplanation(e.target.value)}
              placeholder="e.g., The screenshot UTR is only 7 digits and the bank passbook shows no credit."
              className="w-full text-xs bg-sentinel-950 border border-sentinel-800 rounded-xl px-3.5 py-2.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-electric-500"
            />
          </div>
        )}

        {/* Hints Policy Drawer */}
        {!isAnswered && currentChallenge.hints.length > 0 && (
          <div className="pt-2">
            {showHintIndex >= 0 ? (
              <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-cyan-300 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Hint #{showHintIndex + 1}:</span>
                </div>
                <p>{currentChallenge.hints[showHintIndex]}</p>
              </div>
            ) : (
              <button
                onClick={() => setShowHintIndex(0)}
                className="text-xs text-slate-400 hover:text-cyan-400 flex items-center gap-1 transition"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Need a hint? (Slightly adjusts independence score)</span>
              </button>
            )}
          </div>
        )}

        {/* Immediate Constructive Feedback Panel */}
        {isAnswered && currentOption && (
          <div className={`p-5 rounded-2xl border text-xs leading-relaxed space-y-3 animate-in fade-in duration-200 ${
            currentOption.isCorrect
              ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
              : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
          }`}>
            <div className="flex items-center gap-2 font-bold text-sm">
              {currentOption.isCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="text-emerald-300">Safe Decision Confirmed</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-rose-400" />
                  <span className="text-rose-300">
                    {currentOption.isCriticalFailure ? 'Critical Security Failure' : 'Suboptimal Decision'}
                  </span>
                </>
              )}
            </div>

            <p className="text-slate-200 font-normal">
              {currentOption.feedbackText}
            </p>

            <div className="pt-2 border-t border-slate-700/50 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-400">
              <span>Measured Competency: <strong className="text-white">{currentChallenge.competencyName}</strong></span>
              <span className="text-cyan-300">
                {currentOption.isCorrect ? '+100 Score Earned' : '+0 Score'}
              </span>
            </div>
          </div>
        )}

        {/* Bottom Action Controls */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-sentinel-800">
          <div className="text-xs text-slate-500 font-mono">
            {isAnswered ? 'Task evaluation recorded.' : 'Select an option to proceed.'}
          </div>

          {!isAnswered ? (
            <button
              onClick={handleSubmit}
              disabled={!selectedOptionId}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-electric-600 hover:bg-electric-500 disabled:opacity-40 text-white font-semibold text-xs transition shadow-lg shadow-electric-600/30"
            >
              {t('btn_submit_decision')}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-600/30"
            >
              <span>{currentChallengeIndex < diagnosticChallenges.length - 1 ? t('btn_next_challenge') : t('btn_view_radar_results')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
