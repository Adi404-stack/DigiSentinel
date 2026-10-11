import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts';
import {
  ShieldCheck,
  Award,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  RotateCcw,
  Sparkles,
  FileText,
  Briefcase
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SKILL_DOMAINS } from '../../data/taxonomy';
import { MISSIONS } from '../../data/missionsData';
import { Badge } from '../common/Badge';

export const RadarResultsPage: React.FC = () => {
  const { diagnosticResult, resetDiagnostic, navigateTo, startMission } = useApp();

  if (!diagnosticResult) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-4">
        <p className="text-slate-400 text-sm">No diagnostic results found for this session.</p>
        <button
          onClick={() => navigateTo('radar')}
          className="px-6 py-2.5 rounded-xl bg-electric-600 text-white text-xs font-semibold"
        >
          Take the Diagnostic
        </button>
      </div>
    );
  }

  // Prepare data for Recharts Radar
  const chartData = [
    { domain: 'Fraud Safety', score: diagnosticResult.domainBreakdown.fraud_safety.score, fullMark: 100 },
    { domain: 'Cybersecurity', score: diagnosticResult.domainBreakdown.cybersecurity.score, fullMark: 100 },
    { domain: 'Software Dev', score: diagnosticResult.domainBreakdown.software_dev.score, fullMark: 100 },
    { domain: 'Data & AI', score: diagnosticResult.domainBreakdown.data_ai.score, fullMark: 100 },
    { domain: 'IT Network', score: diagnosticResult.domainBreakdown.it_networking.score, fullMark: 100 },
    { domain: 'Digital Literacy', score: diagnosticResult.domainBreakdown.digital_literacy.score || 70, fullMark: 100 }
  ];

  const recommendedMission = MISSIONS.find(m => m.id === diagnosticResult.recommendedFirstMissionId) || MISSIONS[0];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Top Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <Award className="w-3.5 h-3.5" />
          <span>Diagnostic Assessment Complete</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Your Demonstrated Skill Radar
        </h1>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Here is your objective performance evaluation based on decisions made across realistic cybersecurity, fraud, and coding challenges.
        </p>
      </div>

      {/* Main Grid: Radar Chart + Score Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Radar Chart Box */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-sentinel-900/80 border border-sentinel-800 shadow-2xl relative">
          <div className="flex items-center justify-between pb-2 border-b border-sentinel-800">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
              Skill Domain Distribution
            </span>
            <span className="text-xs font-mono text-slate-500">6 Dimensions</span>
          </div>

          <div className="h-[320px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={chartData} cx="50%" cy="50%" outerRadius="80%">
                <PolarGrid stroke="#222C44" />
                <PolarAngleAxis dataKey="domain" stroke="#7E95C4" tick={{ fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#324060" />
                <Radar
                  name="Demonstrated Score"
                  dataKey="score"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.4}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Score Card Box */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-sentinel-900/80 border border-sentinel-800 space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Overall Diagnostic Score</span>
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-black text-white font-mono">{diagnosticResult.overallScore}</span>
              <span className="text-slate-500 font-mono text-sm">/ 100</span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono">
              <div className="p-3 rounded-xl bg-sentinel-950 border border-sentinel-850">
                <span className="text-slate-500 block text-[10px]">TASKS ASSESSED</span>
                <span className="text-white font-bold text-sm">{diagnosticResult.totalChallenges} Challenges</span>
              </div>
              <div className="p-3 rounded-xl bg-sentinel-950 border border-sentinel-850">
                <span className="text-slate-500 block text-[10px]">ACCURACY RATE</span>
                <span className="text-emerald-400 font-bold text-sm">
                  {Math.round((diagnosticResult.correctCount / diagnosticResult.totalChallenges) * 100)}% Correct
                </span>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-xs text-slate-400">
                Status: {diagnosticResult.overallScore >= 80 ? 'Demonstrated Competence' : diagnosticResult.overallScore >= 50 ? 'Developing Capabilities' : 'Needs Foundational Practice'}
              </span>
            </div>
          </div>

          {/* Recommended Mission Next Action */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-electric-950/60 to-sentinel-900 border border-electric-500/30 space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-electric-400 font-bold">
              Recommended Next Mission
            </span>
            <h3 className="text-lg font-bold text-white">{recommendedMission.title}</h3>
            <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
              {recommendedMission.briefing.summary}
            </p>
            <button
              onClick={() => {
                startMission(recommendedMission.id);
                navigateTo('missions', { missionId: recommendedMission.id });
              }}
              className="w-full mt-2 py-2.5 rounded-xl bg-electric-600 hover:bg-electric-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition"
            >
              <Briefcase className="w-4 h-4" />
              <span>Launch Mission ({recommendedMission.role})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Strengths & Gaps Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Demonstrated Strengths */}
        <div className="p-6 rounded-2xl bg-sentinel-900/60 border border-emerald-500/30 space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Demonstrated Strengths</h3>
          </div>
          {diagnosticResult.strengths.length > 0 ? (
            <ul className="space-y-3 text-xs">
              {diagnosticResult.strengths.map((str, i) => (
                <li key={i} className="p-3 rounded-xl bg-sentinel-950/70 border border-sentinel-850 space-y-1">
                  <span className="font-semibold text-emerald-300">{str.name}</span>
                  <p className="text-slate-400">{str.evidenceText}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-400">Complete additional challenges to establish verified strengths.</p>
          )}
        </div>

        {/* Identified Gaps & Weaknesses */}
        <div className="p-6 rounded-2xl bg-sentinel-900/60 border border-amber-500/30 space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">Identified Gaps & Targeted Practice</h3>
          </div>
          {diagnosticResult.gaps.length > 0 ? (
            <ul className="space-y-3 text-xs">
              {diagnosticResult.gaps.map((gap, i) => (
                <li key={i} className="p-3 rounded-xl bg-sentinel-950/70 border border-sentinel-850 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-amber-300">{gap.name}</span>
                    <button
                      onClick={() => navigateTo('practice')}
                      className="text-[11px] text-electric-400 hover:underline flex items-center gap-0.5"
                    >
                      <span>Practice</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-slate-400">{gap.evidenceText}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-400">Zero critical gaps detected across the tested challenges!</p>
          )}
        </div>
      </div>

      {/* Assessment Limitations Disclaimer */}
      <div className="p-4 rounded-xl bg-sentinel-950 border border-sentinel-850 text-xs text-slate-500 leading-relaxed space-y-1">
        <strong className="text-slate-400 font-mono text-[11px] uppercase">Assessment Validity Notice:</strong>
        <p>{diagnosticResult.limitationsDisclaimer}</p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-sentinel-800">
        <button
          onClick={() => {
            resetDiagnostic();
            navigateTo('radar');
          }}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Retake Diagnostic Assessment</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('practice')}
            className="px-5 py-2.5 rounded-xl bg-sentinel-800 hover:bg-sentinel-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5"
          >
            <BookOpen className="w-4 h-4" />
            <span>Practice Center</span>
          </button>
          <button
            onClick={() => navigateTo('dashboard')}
            className="px-6 py-2.5 rounded-xl bg-electric-600 hover:bg-electric-500 text-white text-xs font-semibold shadow-lg shadow-electric-600/30"
          >
            Go to Personal Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
