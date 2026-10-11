import React, { useState } from 'react';
import {
  Compass,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ShieldAlert,
  Code2,
  Database,
  Network,
  HelpCircle,
  Zap,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { IntentService } from '../../services/intentService';
import { UserGoalIntent } from '../../types/discovery';
import { Badge } from '../common/Badge';

export const SkillDiscoveryPage: React.FC = () => {
  const { navigateTo, startMission, t } = useApp();
  const [queryInput, setQueryInput] = useState('');
  const [activeTab, setActiveTab] = useState<'explore' | 'direct'>('explore');
  const [classifiedIntent, setClassifiedIntent] = useState<UserGoalIntent | null>(null);
  const [isClassifying, setIsClassifying] = useState(false);
  const [selectedClarification, setSelectedClarification] = useState<string | null>(null);

  const quickStartPrompts = [
    {
      label: 'Cybersecurity Internship Readiness',
      query: 'I want to know whether I am good enough at cybersecurity for an internship.',
      category: 'cybersecurity',
      mode: 'explore' as const
    },
    {
      label: 'Test UPI & Payment Fraud Detection',
      query: 'Test my UPI fraud detection and fake screenshot spotting skills.',
      category: 'fraud_safety',
      mode: 'direct' as const
    },
    {
      label: 'Assess React & Async Debugging',
      query: 'Assess my ability to debug broken React applications and race conditions.',
      category: 'software_dev',
      mode: 'direct' as const
    },
    {
      label: 'Check Network & DNS Diagnostics',
      query: 'Check my IT networking fundamentals and DNS troubleshooting.',
      category: 'it_networking',
      mode: 'direct' as const
    },
    {
      label: 'Discover My General Strengths & Gaps',
      query: 'I am a beginner and want to discover my strengths and weaknesses across tech.',
      category: 'general',
      mode: 'explore' as const
    }
  ];

  const handleInterpretQuery = (customQuery?: string) => {
    const textToAnalyze = customQuery || queryInput;
    if (!textToAnalyze.trim()) return;

    setIsClassifying(true);
    // Simulate instantaneous server-side parsing with deterministic fallback
    setTimeout(() => {
      const result = IntentService.classifyUserQuery(textToAnalyze);
      setClassifiedIntent(result);
      setIsClassifying(false);
    }, 280);
  };

  const handleLaunchRecommended = () => {
    if (!classifiedIntent) return;

    if (classifiedIntent.recommendedAssessmentRoute === 'specific_mission' && classifiedIntent.targetMissionId) {
      startMission(classifiedIntent.targetMissionId as any);
      navigateTo('missions', { missionId: classifiedIntent.targetMissionId as any });
    } else {
      navigateTo('radar');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-950/60 border border-electric-500/30 text-electric-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Intelligent Skill Discovery</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {t('discovery_heading')}
        </h1>
        <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
          {t('discovery_subheading')}
        </p>
      </div>

      {/* Mode Selector Tabs */}
      <div className="flex p-1.5 rounded-xl bg-sentinel-900 border border-sentinel-800 max-w-lg mx-auto">
        <button
          onClick={() => {
            setActiveTab('explore');
            setClassifiedIntent(null);
          }}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition ${
            activeTab === 'explore'
              ? 'bg-electric-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {t('explore_mode_title')}
        </button>
        <button
          onClick={() => {
            setActiveTab('direct');
            setClassifiedIntent(null);
          }}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition ${
            activeTab === 'direct'
              ? 'bg-electric-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {t('direct_mode_title')}
        </button>
      </div>

      {/* Conversational Input Box */}
      <div className="p-6 rounded-2xl bg-sentinel-900/80 border border-sentinel-800 shadow-xl space-y-4">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
          Describe your objective or technical goal:
        </label>
        <div className="relative">
          <textarea
            value={queryInput}
            onChange={e => setQueryInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleInterpretQuery();
              }
            }}
            rows={3}
            placeholder={t('discovery_placeholder')}
            className="w-full rounded-xl bg-sentinel-950 border border-sentinel-700/80 p-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-electric-500 focus:border-transparent resize-none leading-relaxed"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
          <span className="text-[11px] text-slate-500 font-mono">
            Pro tip: mention your target role, tools, or experience level
          </span>
          <button
            onClick={() => handleInterpretQuery()}
            disabled={!queryInput.trim() || isClassifying}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-electric-600 hover:bg-electric-500 disabled:opacity-50 text-white font-semibold text-xs flex items-center justify-center gap-2 transition"
          >
            {isClassifying ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Interpreting Intent...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Analyze My Goal</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="pt-4 border-t border-sentinel-850 space-y-2">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Quick-start examples:
          </span>
          <div className="flex flex-wrap gap-2">
            {quickStartPrompts.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQueryInput(item.query);
                  handleInterpretQuery(item.query);
                }}
                className="px-3 py-1.5 rounded-lg bg-sentinel-950 border border-sentinel-800 hover:border-slate-600 text-xs text-slate-300 hover:text-white transition text-left"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CLASSIFIED INTENT & RECOMMENDED ROUTE CARD */}
      {classifiedIntent && (
        <div className="p-6 rounded-2xl bg-sentinel-900 border border-cyan-500/30 shadow-2xl space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-sentinel-800 pb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                <Compass className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white">
                Intent Analysis & Assessment Roadmap
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">Confidence:</span>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                {Math.round(classifiedIntent.confidence * 100)}%
              </span>
            </div>
          </div>

          {/* Structured Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-sentinel-950 border border-sentinel-800 space-y-1">
              <span className="text-slate-500 font-mono uppercase text-[10px]">Detected Domain</span>
              <p className="font-semibold text-slate-200 capitalize">
                {classifiedIntent.matchedDomain.replace('_', ' ')}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-sentinel-950 border border-sentinel-800 space-y-1">
              <span className="text-slate-500 font-mono uppercase text-[10px]">Target Role / Track</span>
              <p className="font-semibold text-slate-200">
                {classifiedIntent.targetRole || 'Foundational Diagnostic'}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-sentinel-950 border border-sentinel-800 space-y-1">
              <span className="text-slate-500 font-mono uppercase text-[10px]">Initial Difficulty</span>
              <div className="pt-0.5">
                <Badge difficulty={classifiedIntent.suggestedDifficulty} />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-sentinel-950 border border-sentinel-800 space-y-1">
              <span className="text-slate-500 font-mono uppercase text-[10px]">Assessment Route</span>
              <p className="font-semibold text-cyan-400 capitalize">
                {classifiedIntent.recommendedAssessmentRoute.replace('_', ' ')}
              </p>
            </div>
          </div>

          {/* AI Reasoning Note */}
          <div className="p-3.5 rounded-xl bg-sentinel-950/80 border border-sentinel-850 flex items-start gap-2.5 text-xs text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-white">Mapping Rationale: </strong>
              {classifiedIntent.reasoning}
            </p>
          </div>

          {/* Clarification prompt if ambiguous */}
          {classifiedIntent.needsClarification && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
                <AlertCircle className="w-4 h-4" />
                <span>{classifiedIntent.clarificationQuestion}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {classifiedIntent.clarificationOptions?.map(opt => (
                  <button
                    key={opt}
                    onClick={() => {
                      setSelectedClarification(opt);
                      handleInterpretQuery(opt);
                    }}
                    className={`p-2.5 rounded-lg border text-left text-xs font-medium transition ${
                      selectedClarification === opt
                        ? 'border-amber-400 bg-amber-500/20 text-white'
                        : 'border-sentinel-800 bg-sentinel-950 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CTA Action button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              onClick={() => setClassifiedIntent(null)}
              className="text-xs text-slate-400 hover:text-white px-3 py-2"
            >
              Adjust Objective
            </button>
            <button
              onClick={handleLaunchRecommended}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-electric-600 hover:bg-electric-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-electric-600/30 transition"
            >
              <span>
                {classifiedIntent.recommendedAssessmentRoute === 'specific_mission'
                  ? 'Launch Targeted Practical Mission'
                  : 'Start 6-Task Skill Radar Diagnostic'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
