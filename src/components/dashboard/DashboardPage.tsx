import React, { useState } from 'react';
import {
  Radar as RechartsRadar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts';
import {
  Zap,
  Flame,
  Award,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Briefcase,
  HelpCircle,
  X,
  Compass as RadarIcon
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Competency } from '../../types/skills';
import { Badge } from '../common/Badge';

export const DashboardPage: React.FC = () => {
  const { profile, competencies, missionAttempts, navigateTo, resetDiagnostic, t } = useApp();
  const [selectedCompetency, setSelectedCompetency] = useState<Competency | null>(null);

  // Group competencies by domain
  const demonstratedComps = competencies.filter(c => c.evidenceStatus === 'demonstrated');
  const developingComps = competencies.filter(c => c.evidenceStatus === 'developing');
  const needsPracticeComps = competencies.filter(c => c.evidenceStatus === 'needs_practice');

  const radarChartData = [
    { domain: 'Fraud Safety', score: Math.round(competencies.filter(c => c.domainId === 'fraud_safety').reduce((acc, c) => acc + c.score, 0) / (competencies.filter(c => c.domainId === 'fraud_safety').length || 1)), fullMark: 100 },
    { domain: 'Cyber Ops', score: Math.round(competencies.filter(c => c.domainId === 'cybersecurity').reduce((acc, c) => acc + c.score, 0) / (competencies.filter(c => c.domainId === 'cybersecurity').length || 1)), fullMark: 100 },
    { domain: 'Software Dev', score: Math.round(competencies.filter(c => c.domainId === 'software_dev').reduce((acc, c) => acc + c.score, 0) / (competencies.filter(c => c.domainId === 'software_dev').length || 1)), fullMark: 100 },
    { domain: 'Data & AI', score: Math.round(competencies.filter(c => c.domainId === 'data_ai').reduce((acc, c) => acc + c.score, 0) / (competencies.filter(c => c.domainId === 'data_ai').length || 1)), fullMark: 100 },
    { domain: 'Networking', score: Math.round(competencies.filter(c => c.domainId === 'it_networking').reduce((acc, c) => acc + c.score, 0) / (competencies.filter(c => c.domainId === 'it_networking').length || 1)), fullMark: 100 },
    { domain: 'Digital Safety', score: 75, fullMark: 100 },
  ];

  const xpProgressInLevel = profile.xp % 300;
  const xpRequiredForNext = 300;
  const progressPercent = Math.round((xpProgressInLevel / xpRequiredForNext) * 100);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* User Header Profile Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-sentinel-900/80 border border-sentinel-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-electric-600 to-cyan-500 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-electric-500/20">
              {profile.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-white">{profile.name}</h1>
                <Badge variant="simulated" text="Candidate Profile" />
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">{profile.email}</p>
            </div>
          </div>

          {/* Stat Pills */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            <div className="px-4 py-2 rounded-xl bg-sentinel-950 border border-sentinel-800 space-y-0.5">
              <span className="text-[10px] text-slate-500 block uppercase">Sentinel Level</span>
              <span className="text-base font-bold text-white">Level {profile.level}</span>
            </div>
            <div className="px-4 py-2 rounded-xl bg-sentinel-950 border border-sentinel-800 space-y-0.5">
              <span className="text-[10px] text-slate-500 block uppercase">Current Streak</span>
              <div className="flex items-center gap-1 text-base font-bold text-amber-400">
                <Flame className="w-4 h-4 fill-amber-400" />
                <span>{profile.currentStreakDays} Days</span>
              </div>
            </div>
            <div className="px-4 py-2 rounded-xl bg-sentinel-950 border border-sentinel-800 space-y-0.5">
              <span className="text-[10px] text-slate-500 block uppercase">Total XP</span>
              <div className="flex items-center gap-1 text-base font-bold text-cyan-400">
                <Zap className="w-4 h-4 fill-cyan-400" />
                <span>{profile.xp} XP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Level XP Progress Bar */}
        <div className="space-y-1.5 pt-2 border-t border-sentinel-850">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Next Level Progression (Level {profile.level + 1})</span>
            <span className="text-cyan-400 font-bold">{xpProgressInLevel} / {xpRequiredForNext} XP</span>
          </div>
          <div className="w-full bg-sentinel-950 rounded-full h-2 overflow-hidden border border-sentinel-800">
            <div
              className="bg-gradient-to-r from-electric-500 to-cyan-400 h-2 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Grid: Radar Overview + Action Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Radar Chart Box */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-sentinel-900/80 border border-sentinel-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Competency Radar Visual
            </h3>
            <button
              onClick={() => navigateTo('radar')}
              className="text-xs text-cyan-400 hover:underline font-mono"
            >
              Take Diagnostic
            </button>
          </div>

          <div className="h-[280px] w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarChartData} cx="50%" cy="50%" outerRadius="75%">
                <PolarGrid stroke="#222C44" />
                <PolarAngleAxis dataKey="domain" stroke="#7E95C4" tick={{ fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#324060" />
                <RechartsRadar
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

        {/* Quick Actions & Recent Missions */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-sentinel-900/80 border border-sentinel-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Quick Navigation
            </h3>
            <div className="space-y-2 text-xs">
              <button
                onClick={() => navigateTo('radar')}
                className="w-full p-3 rounded-xl bg-sentinel-950 hover:bg-sentinel-850 border border-sentinel-800 text-left flex items-center justify-between text-slate-200 transition"
              >
                <div className="flex items-center gap-2">
                  <RadarIcon className="w-4 h-4 text-cyan-400" />
                  <span>Launch 6-Domain Skill Radar</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              </button>

              <button
                onClick={() => navigateTo('missions')}
                className="w-full p-3 rounded-xl bg-sentinel-950 hover:bg-sentinel-850 border border-sentinel-800 text-left flex items-center justify-between text-slate-200 transition"
              >
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-blue-400" />
                  <span>Practical Mission Labs</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              </button>

              <button
                onClick={() => navigateTo('practice')}
                className="w-full p-3 rounded-xl bg-sentinel-950 hover:bg-sentinel-850 border border-sentinel-800 text-left flex items-center justify-between text-slate-200 transition"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  <span>Targeted Practice Drills</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              </button>

              <button
                onClick={() => navigateTo('portfolio')}
                className="w-full p-3 rounded-xl bg-sentinel-950 hover:bg-sentinel-850 border border-sentinel-800 text-left flex items-center justify-between text-slate-200 transition"
              >
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Export Skill Portfolio</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Competencies List by Status */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white tracking-tight">Competency Breakdown</h2>
          <span className="text-xs text-slate-500 font-mono">Click any competency to inspect evidence</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {competencies.map(comp => (
            <div
              key={comp.id}
              onClick={() => setSelectedCompetency(comp)}
              className="p-5 rounded-2xl bg-sentinel-900/60 border border-sentinel-800 hover:border-slate-700 cursor-pointer transition space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <Badge status={comp.evidenceStatus} />
                <span className="text-xs font-mono font-bold text-cyan-400">{comp.score}%</span>
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-electric-300 transition">
                {comp.name}
              </h4>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {comp.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Competency Detail Modal / Drawer */}
      {selectedCompetency && (
        <div className="fixed inset-0 z-50 bg-sentinel-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-sentinel-900 border border-sentinel-700 p-6 space-y-5 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-sentinel-800 pb-3">
              <Badge status={selectedCompetency.evidenceStatus} />
              <button
                onClick={() => setSelectedCompetency(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block">
                Competency Inspection
              </span>
              <h3 className="text-xl font-bold text-white mt-1">{selectedCompetency.name}</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {selectedCompetency.description}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-bold">
                Key Performance Indicators:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {selectedCompetency.keyIndicators.map((ind, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{ind}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-sentinel-800 flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  setSelectedCompetency(null);
                  navigateTo('practice');
                }}
                className="px-4 py-2 rounded-xl bg-electric-600 hover:bg-electric-500 text-white font-semibold text-xs"
              >
                Practice Targeted Drills
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
