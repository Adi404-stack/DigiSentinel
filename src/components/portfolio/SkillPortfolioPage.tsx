import React from 'react';
import {
  Award,
  Printer,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Hash,
  ExternalLink,
  FileText
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../common/Logo';

export const SkillPortfolioPage: React.FC = () => {
  const { profile, navigateTo } = useApp();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sentinel-850 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sentinel-900 border border-sentinel-800 text-xs font-semibold text-cyan-400">
            <Award className="w-3.5 h-3.5" />
            <span>Verified Practical Assessment Record</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Personal Skill Portfolio
          </h1>
          <p className="text-xs text-slate-400">
            A tamper-evident record of practical technical missions completed under deterministic assessment rubrics.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-5 py-2.5 rounded-xl bg-sentinel-900 hover:bg-sentinel-800 border border-sentinel-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition self-start sm:self-auto"
        >
          <Printer className="w-4 h-4 text-slate-400" />
          <span>Export / Print PDF</span>
        </button>
      </div>

      {/* Portfolio Items List */}
      <div className="space-y-6">
        {profile.portfolio.length === 0 ? (
          <div className="p-12 rounded-3xl bg-sentinel-900/40 border border-sentinel-800 text-center space-y-4">
            <Award className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">No Completed Assessments Yet</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Complete your first practical mission in the workspace to earn a verified portfolio entry with rubric scoring.
            </p>
            <button
              onClick={() => navigateTo('missions')}
              className="px-6 py-2.5 rounded-xl bg-electric-600 text-white text-xs font-semibold"
            >
              Explore Mission Labs
            </button>
          </div>
        ) : (
          profile.portfolio.map(entry => (
            <div
              key={entry.id}
              className="p-6 sm:p-8 rounded-3xl bg-sentinel-900/80 border border-sentinel-800 shadow-xl space-y-6"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sentinel-850 pb-5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Verified Practical Performance</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">{entry.missionTitle}</h3>
                  <span className="text-xs text-slate-400 font-medium">Assessed Role: {entry.role}</span>
                </div>

                <div className="flex flex-col sm:items-end gap-1 font-mono text-xs text-slate-400">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-lg">
                    <span>Score: {entry.overallScore} / 100</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <Calendar className="w-3 h-3" />
                    <span>Completed: {new Date(entry.completedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-cyan-400">
                    <Hash className="w-3 h-3" />
                    <span>Verification Hash: {entry.certificateHash}</span>
                  </div>
                </div>
              </div>

              {/* Rubric Breakdown Grid */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Assessment Rubric Breakdown:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-sentinel-950 border border-sentinel-850">
                    <span className="text-slate-500 block text-[10px]">ACCURACY</span>
                    <span className="text-white font-bold">{entry.rubric.accuracy}%</span>
                  </div>
                  <div className="p-3 rounded-xl bg-sentinel-950 border border-sentinel-850">
                    <span className="text-slate-500 block text-[10px]">REASONING</span>
                    <span className="text-white font-bold">{entry.rubric.evidenceReasoning}%</span>
                  </div>
                  <div className="p-3 rounded-xl bg-sentinel-950 border border-sentinel-850">
                    <span className="text-slate-500 block text-[10px]">INDEPENDENCE</span>
                    <span className="text-white font-bold">{entry.rubric.independence}%</span>
                  </div>
                  <div className="p-3 rounded-xl bg-sentinel-950 border border-sentinel-850">
                    <span className="text-slate-500 block text-[10px]">EFFICIENCY</span>
                    <span className="text-white font-bold">{entry.rubric.efficiency}%</span>
                  </div>
                  <div className="p-3 rounded-xl bg-sentinel-950 border border-sentinel-850">
                    <span className="text-slate-500 block text-[10px]">RISK AWARENESS</span>
                    <span className="text-emerald-400 font-bold">{entry.rubric.riskAwareness}%</span>
                  </div>
                </div>
              </div>

              {/* Evidence Summary */}
              <div className="p-4 rounded-xl bg-sentinel-950 border border-sentinel-850 text-xs text-slate-300 space-y-1">
                <span className="font-mono text-[10px] text-slate-500 uppercase font-bold block">
                  Demonstrated Evidence & Evaluation:
                </span>
                <p className="leading-relaxed">{entry.evidenceSummary}</p>
              </div>

              {/* Verified Capabilities */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase font-bold mr-1">
                  Skills Proven:
                </span>
                {entry.skillsVerified.map((sk, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-sentinel-950 text-cyan-300 border border-sentinel-800"
                  >
                    ✓ {sk}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Legal & Educational Disclaimer Notice */}
      <div className="p-5 rounded-2xl bg-sentinel-950 border border-sentinel-850 text-xs text-slate-500 leading-relaxed space-y-1">
        <strong className="text-slate-400 font-mono text-[10px] uppercase block">
          Portfolio Validity & Employment Notice:
        </strong>
        <p>
          DigiSentinel assessment records reflect task performance completed within simulated diagnostic environments. They do not constitute official statutory licenses, university degrees, or employer-guaranteed hiring certifications.
        </p>
      </div>
    </div>
  );
};
