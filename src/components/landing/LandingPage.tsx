import React from 'react';
import {
  Compass,
  Radar,
  ShieldAlert,
  ShieldCheck,
  Code2,
  Database,
  Network,
  Laptop,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Terminal,
  Activity,
  Layers,
  ChevronRight,
  HelpCircle,
  FileCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SKILL_DOMAINS } from '../../data/taxonomy';
import { MISSIONS } from '../../data/missionsData';
import { Badge } from '../common/Badge';

export const LandingPage: React.FC = () => {
  const { navigateTo, t } = useApp();

  const domainIcons: Record<string, React.ElementType> = {
    fraud_safety: ShieldAlert,
    cybersecurity: ShieldCheck,
    software_dev: Code2,
    data_ai: Database,
    it_networking: Network,
    digital_literacy: Laptop
  };

  return (
    <div className="space-y-24 py-6">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-16">
        {/* Ambient atmospheric glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-electric-500/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[350px] h-[300px] bg-violet-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sentinel-900 border border-sentinel-700/80 shadow-inner">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              College Community Engagement Project (CEP)
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-xs text-electric-400 font-medium">Practical Assessment Engine</span>
          </div>

          {/* Main Hero Headings */}
          <div className="max-w-4xl mx-auto space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
              Discover Your Skills.{' '}
              <span className="bg-gradient-to-r from-electric-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
                Prove Your Potential.
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed">
              Stop guessing what you’re good at. Uncover your strengths, expose hidden skill gaps, and test yourself through practical challenges designed around real-world cybersecurity, software, and digital defense situations.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => navigateTo('discovery')}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-electric-600 hover:bg-electric-500 text-white font-semibold shadow-lg shadow-electric-600/30 hover:shadow-electric-500/50 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <Compass className="w-5 h-5" />
              <span>{t('cta_discover')}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => navigateTo('radar')}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-sentinel-900 hover:bg-sentinel-850 border border-cyan-500/30 hover:border-cyan-400/60 text-cyan-300 font-semibold shadow-md transition-all duration-200"
            >
              <Radar className="w-5 h-5 text-cyan-400" />
              <span>Start Skill Radar Diagnostic</span>
            </button>

            <button
              onClick={() => navigateTo('missions')}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-sentinel-900/60 hover:bg-sentinel-850 border border-sentinel-700 text-slate-300 font-medium transition"
            >
              <span>{t('cta_explore_missions')}</span>
            </button>
          </div>

          {/* Hero Interactive Radar Teaser Card */}
          <div className="pt-8 max-w-4xl mx-auto">
            <div className="rounded-2xl border border-sentinel-800 bg-sentinel-900/70 p-6 shadow-2xl backdrop-blur-md text-left">
              <div className="flex flex-wrap items-center justify-between pb-4 border-b border-sentinel-800 gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="font-mono text-xs text-slate-400 ml-2">digisentinel-radar://adaptive-session</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="simulated" />
                  <span className="text-xs text-cyan-400 font-mono">6 Domains • Adaptive Logic</span>
                </div>
              </div>

              {/* Sample Diagnostic Teaser Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5">
                <div className="p-4 rounded-xl bg-sentinel-950/70 border border-sentinel-800 space-y-2">
                  <div className="flex items-center justify-between text-xs text-amber-400 font-semibold">
                    <span>Task #1: Financial Fraud</span>
                    <span>₹4,500 Claim</span>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2">
                    Buyer provides altered UPI screenshot with a 7-digit UTR. Passbook has zero credit.
                  </p>
                  <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <span>Evaluates: Receipt verification</span>
                    <span className="text-emerald-400 font-semibold">Ready to Test</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-sentinel-950/70 border border-sentinel-800 space-y-2">
                  <div className="flex items-center justify-between text-xs text-blue-400 font-semibold">
                    <span>Task #2: Network Layer</span>
                    <span>DNS vs Direct IP</span>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2">
                    Site opens via 192.168.10.45 but fails on domain name. Public web works fine.
                  </p>
                  <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <span>Evaluates: OSI layer triage</span>
                    <span className="text-emerald-400 font-semibold">Ready to Test</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-sentinel-950/70 border border-sentinel-800 space-y-2">
                  <div className="flex items-center justify-between text-xs text-violet-400 font-semibold">
                    <span>Task #3: Code Resiliency</span>
                    <span>Cart Math.max Inversion</span>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2">
                    Applying coupon discount causes cart total to become negative on small subtotals.
                  </p>
                  <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <span>Evaluates: Boundary edge-cases</span>
                    <span className="text-emerald-400 font-semibold">Ready to Test</span>
                  </div>
                </div>
              </div>

              {/* Action Banner */}
              <div className="mt-5 p-3 rounded-xl bg-electric-950/40 border border-electric-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <span className="text-electric-300 font-medium">
                  ⚡ 8–12 minute non-arbitrary assessment with verified evidence tabs and zero guessing.
                </span>
                <button
                  onClick={() => navigateTo('radar')}
                  className="px-4 py-1.5 rounded-lg bg-electric-600 hover:bg-electric-500 text-white font-medium whitespace-nowrap transition"
                >
                  Launch Diagnostic
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW DIGISENTINEL WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-xs font-bold uppercase tracking-widest text-electric-400">The Core Journey</h2>
          <h3 className="text-3xl font-extrabold text-white tracking-tight">How DigiSentinel Works</h3>
          <p className="text-slate-400 text-sm">
            We evaluate demonstrated performance rather than asking you what you think you know.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {[
            {
              step: '01',
              title: 'Express Your Goal',
              desc: 'Tell us what you want to achieve or choose direct evaluation. We parse intent into structured competencies.',
              icon: Compass,
              accent: 'border-blue-500/30 text-blue-400'
            },
            {
              step: '02',
              title: 'Discover Your Skills',
              desc: 'Take the adaptive Skill Radar diagnostic. Test financial fraud resilience, network diagnosis, and code debugging.',
              icon: Radar,
              accent: 'border-cyan-500/30 text-cyan-400'
            },
            {
              step: '03',
              title: 'Tackle Real Missions',
              desc: 'Step into junior analyst roles: investigate wire fraud, repair buggy carts, troubleshoot router CLI, and rollback outages.',
              icon: Terminal,
              accent: 'border-violet-500/30 text-violet-400'
            },
            {
              step: '04',
              title: 'Prove Improvement',
              desc: 'Identify verified gaps, practice micro-lessons, complete fresh retest scenarios, and export your personal skill portfolio.',
              icon: FileCheck,
              accent: 'border-emerald-500/30 text-emerald-400'
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative p-6 rounded-2xl bg-sentinel-900/60 border border-sentinel-800 hover:border-sentinel-700 transition space-y-4 group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-slate-500 group-hover:text-slate-300 transition">
                    STEP {item.step}
                  </span>
                  <div className={`p-2 rounded-xl bg-sentinel-950 border ${item.accent}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <h4 className="text-lg font-bold text-white tracking-tight">{item.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. SIX SKILL DOMAINS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400">Taxonomy & Competencies</h2>
            <h3 className="text-3xl font-extrabold text-white tracking-tight">Explore Skill Domains</h3>
            <p className="text-slate-400 text-sm max-w-xl">
              From online financial scam defense for ordinary citizens to professional cloud infrastructure triage for software engineers.
            </p>
          </div>
          <button
            onClick={() => navigateTo('discovery')}
            className="self-start md:self-auto text-xs font-semibold text-electric-400 hover:text-electric-300 flex items-center gap-1"
          >
            <span>Ask DigiSentinel to map my domain</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.values(SKILL_DOMAINS).map(domain => {
            const Icon = domainIcons[domain.id] || ShieldCheck;
            return (
              <div
                key={domain.id}
                onClick={() => navigateTo('missions')}
                className="p-6 rounded-2xl bg-sentinel-900/40 border border-sentinel-800 hover:border-sentinel-700 transition cursor-pointer hover:bg-sentinel-900/80 group space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl bg-sentinel-950 border ${domain.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono text-slate-500">{domain.competencies.length} Competencies</span>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-white group-hover:text-electric-300 transition">
                    {domain.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {domain.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {domain.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[11px] font-medium bg-sentinel-800 text-slate-300 border border-sentinel-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. FEATURED PRACTICAL MISSIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-xs font-bold uppercase tracking-widest text-violet-400">Job-Oriented Engine</h2>
          <h3 className="text-3xl font-extrabold text-white tracking-tight">Featured Practical Missions</h3>
          <p className="text-slate-400 text-sm">
            Experience realistic technical problem solving. No multiple-choice trivia—work with interactive logs, terminals, and code tests.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MISSIONS.map(mission => (
            <div
              key={mission.id}
              className="flex flex-col justify-between p-6 rounded-2xl bg-sentinel-900/60 border border-sentinel-800 hover:border-sentinel-700 transition space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge difficulty={mission.difficulty} />
                  <span className="text-xs font-mono text-electric-400 font-semibold">+{mission.xpReward} XP</span>
                </div>

                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{mission.role}</span>
                  <h4 className="text-lg font-bold text-white mt-0.5">{mission.title}</h4>
                  <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                    {mission.briefing.summary}
                  </p>
                </div>

                <div className="space-y-1 pt-1">
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">Objectives:</span>
                  <ul className="text-xs text-slate-400 space-y-1">
                    {mission.briefing.objectives.slice(0, 2).map((obj, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={() => navigateTo('missions', { missionId: mission.id })}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-sentinel-800 hover:bg-electric-600 text-white text-xs font-semibold transition group"
              >
                <span>Launch Mission Workspace</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 5. COMMUNITY DIGITAL SAFETY HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-sentinel-900 via-amber-950/20 to-sentinel-900 border border-amber-500/30 shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
                <ShieldAlert className="w-4 h-4" />
                <span>CEP Public Interest Feature</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Empowering Communities Against Financial Fraud
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                India loses crores daily to fake UPI payment receipts, deceptive collect requests, and remote screen-sharing traps. DigiSentinel teaches students, families, and small business owners how to spot fake receipts, verify transactions independently, and report incidents via 1930.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-400">
                <span className="text-emerald-400 font-semibold">✓ 100% Synthetic Demo Data</span>
                <span>• No actual bank credentials required</span>
                <span>• Available in Hindi & Marathi</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full sm:w-auto">
              <button
                onClick={() => navigateTo('radar')}
                className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-sentinel-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition text-center"
              >
                Test My Fraud Detection Skills
              </button>
              <button
                onClick={() => navigateTo('practice')}
                className="px-6 py-3 rounded-xl bg-sentinel-900 border border-sentinel-700 hover:border-slate-500 text-slate-300 font-semibold text-xs transition text-center"
              >
                View Anti-Fraud Micro-Lessons
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FINAL CALL TO ACTION */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6 pt-10">
        <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Ready to discover what you can do?
        </h3>
        <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
          Tell DigiSentinel your aspirations. Experience practical technical challenges that expose weaknesses and guide you to mastery.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={() => navigateTo('discovery')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-electric-600 hover:bg-electric-500 text-white font-bold text-sm shadow-lg shadow-electric-600/30 transition"
          >
            Start Skill Discovery
          </button>
          <button
            onClick={() => navigateTo('dashboard')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-sentinel-900 border border-sentinel-700 text-slate-300 font-semibold text-sm hover:bg-sentinel-850 transition"
          >
            Explore Dashboard & Portfolio
          </button>
        </div>
      </section>
    </div>
  );
};
