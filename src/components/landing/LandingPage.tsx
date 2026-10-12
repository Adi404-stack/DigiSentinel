import React, { useState } from 'react';
import {
  Compass,
  Radar,
  ShieldAlert,
  ShieldCheck,
  Code2,
  Lock,
  Brain,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Terminal,
  Activity,
  Layers,
  ChevronRight,
  HelpCircle,
  FileCheck,
  Calendar,
  BookOpen,
  Award,
  Zap,
  Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SkillConstellation } from './SkillConstellation';
import { HomepageLiveDemo } from './HomepageLiveDemo';
import { RealWorldNeedsSection } from './RealWorldNeedsSection';
import { Badge } from '../common/Badge';

export const LandingPage: React.FC = () => {
  const { navigateTo, t } = useApp();
  const [previewTab, setPreviewTab] = useState<'assessment' | 'profile' | 'recommendations' | 'progress'>('assessment');

  return (
    <div className="space-y-28 py-6">
      {/* =========================================================================
          SECTION B: HERO
         ========================================================================= */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16">
        {/* Subtle ambient lighting */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[550px] h-[300px] bg-electric-600/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[280px] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & Call to Action (7 cols) */}
            <div className="lg:col-span-7 space-y-8 text-left">
              {/* Product Badge Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sentinel-900 border border-sentinel-700/80 shadow-subtle">
                <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 font-mono">
                  DigiSentinel 2.0
                </span>
                <span className="text-slate-600">|</span>
                <span className="text-xs text-electric-400 font-medium">Defensive Skill Discovery</span>
              </div>

              {/* Primary Headline & Copy */}
              <div className="space-y-5">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.12] font-display">
                  Know Your Skills.{' '}
                  <span className="bg-gradient-to-r from-electric-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
                    Master Your Digital World.
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal max-w-xl leading-relaxed">
                  Discover your strengths, sharpen your technical abilities, and learn to navigate the digital world with confidence through practical, defensive challenges.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <button
                  onClick={() => navigateTo('radar')}
                  className="flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-electric-600 hover:bg-electric-500 text-white font-semibold text-sm shadow-lg shadow-electric-600/30 hover:shadow-electric-500/50 transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  <Compass className="w-4 h-4" />
                  <span>Discover My Skills</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <button
                  onClick={() => navigateTo('topics')}
                  className="flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-sentinel-900 hover:bg-sentinel-850 border border-sentinel-700 text-slate-200 hover:text-white font-semibold text-sm transition-all duration-200"
                >
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                  <span>Explore the Platform</span>
                </button>
              </div>

              {/* Key Trust Signals */}
              <div className="pt-2 flex flex-wrap items-center gap-6 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Transparent Rule-Based Logic</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Defensive Safety Scenarios</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Zero Fake Credentials</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Constellation Visual (5 cols) */}
            <div className="lg:col-span-5 w-full">
              <SkillConstellation onSelectNode={(nodeId) => {
                if (nodeId === 'cybersecurity' || nodeId === 'digital_safety') {
                  // Interactive feedback
                }
              }} />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION C: AUTHENTIC PRODUCT PREVIEW
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sentinel-900 border border-sentinel-800 text-xs font-semibold text-cyan-400">
            <Activity className="w-3.5 h-3.5" />
            <span>Product Experience Preview</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            A Purpose-Built Skill Diagnostic Suite
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            See how DigiSentinel pinpoints knowledge gaps and calibrates your personalized learning path with zero guesswork.
          </p>

          {/* Interactive Preview Switcher Tabs */}
          <div className="inline-flex p-1.5 rounded-2xl bg-sentinel-900 border border-sentinel-800 gap-1 mt-4">
            {[
              { id: 'assessment' as const, label: '01. Skill Assessment' },
              { id: 'profile' as const, label: '02. Skill Profile Radar' },
              { id: 'recommendations' as const, label: '03. Gap Recommendations' },
              { id: 'progress' as const, label: '04. Progress Tracking' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setPreviewTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  previewTab === tab.id
                    ? 'bg-electric-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Preview Frame */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-sentinel-900/80 border border-sentinel-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between pb-4 border-b border-sentinel-850 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="font-mono text-slate-400 ml-2">digisentinel://live-preview/{previewTab}</span>
            </div>
            <span className="text-[11px] font-mono text-cyan-400 px-2 py-0.5 rounded bg-sentinel-950 border border-sentinel-800">
              Representative Sample Data
            </span>
          </div>

          <div className="pt-6">
            {previewTab === 'assessment' && (
              <div className="space-y-5 animate-fadeIn">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-cyan-400 font-bold uppercase">Task 1 of 6 • Payment Verification</span>
                  <span className="text-slate-400">Adaptive Branching Enabled</span>
                </div>
                <div className="p-4 rounded-2xl bg-sentinel-950 border border-sentinel-850 space-y-2 text-xs">
                  <span className="font-bold text-white block">Marketplace Transfer Scenario:</span>
                  <p className="text-slate-300 leading-relaxed">
                    Buyer presents a screenshot showing ₹4,500 transferred with a 7-digit UTR. Your bank statement shows no credit. The buyer requests: "Server is syncing, scan my QR code now to claim funds."
                  </p>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-sentinel-950/60 border border-sentinel-850 text-slate-400">
                    A) Scan buyer's QR code to confirm credit (Vulnerable to debit trigger)
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-emerald-300 font-semibold">
                    ✓ B) Decline release until own passbook independently confirms credit (Sound Defense)
                  </div>
                </div>
              </div>
            )}

            {previewTab === 'profile' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center animate-fadeIn text-xs">
                <div className="space-y-3 font-mono">
                  <span className="text-cyan-400 font-bold uppercase block text-sm">
                    Demonstrated Competency Matrix
                  </span>
                  <div className="space-y-2">
                    <div className="p-3 rounded-xl bg-sentinel-950 border border-sentinel-850 flex justify-between">
                      <span>Fraud & Scam Safety</span>
                      <span className="text-emerald-400 font-bold">88% Demonstrated</span>
                    </div>
                    <div className="p-3 rounded-xl bg-sentinel-950 border border-sentinel-850 flex justify-between">
                      <span>Network Layer Diagnostics</span>
                      <span className="text-cyan-400 font-bold">75% Developing</span>
                    </div>
                    <div className="p-3 rounded-xl bg-sentinel-950 border border-sentinel-850 flex justify-between">
                      <span>Code Comprehension</span>
                      <span className="text-amber-400 font-bold">50% Needs Practice</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-sentinel-950 border border-sentinel-850 text-center space-y-2">
                  <Award className="w-8 h-8 text-cyan-400 mx-auto" />
                  <h4 className="text-base font-bold text-white font-display">6-Domain Radar Calibration</h4>
                  <p className="text-slate-400 text-xs">
                    Multidimensional scores are calculated strictly from verifiable decisions made on concrete evidence snippets.
                  </p>
                </div>
              </div>
            )}

            {previewTab === 'recommendations' && (
              <div className="space-y-4 animate-fadeIn text-xs">
                <span className="text-cyan-400 font-mono font-bold uppercase block">
                  Explainable Rule-Based Recommendations
                </span>
                <div className="p-4 rounded-2xl bg-sentinel-950 border border-sentinel-850 space-y-2 leading-relaxed">
                  <div className="flex items-center gap-2 text-amber-400 font-bold">
                    <Info className="w-4 h-4" />
                    <span>Finding: Missed lookalike subdomain in synthetic email</span>
                  </div>
                  <p className="text-slate-300">
                    <span className="text-white font-semibold">Reason: </span>
                    Selected URL based on "drive.google.com" third-level prefix rather than the true second-level domain "storage-cleanup.com".
                  </p>
                  <p className="text-cyan-300">
                    <span className="text-white font-semibold">Actionable Next Step: </span>
                    Complete the Phishing & Subdomain Detection module and practise 3 URL triage exercises in the lab.
                  </p>
                </div>
              </div>
            )}

            {previewTab === 'progress' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fadeIn text-center text-xs font-mono">
                <div className="p-5 rounded-2xl bg-sentinel-950 border border-sentinel-850 space-y-1">
                  <span className="text-slate-500 uppercase">Weekly Streak</span>
                  <div className="text-2xl font-bold text-amber-400">4 Days Active</div>
                  <span className="text-slate-400 text-[11px]">Consistent daily practice</span>
                </div>
                <div className="p-5 rounded-2xl bg-sentinel-950 border border-sentinel-850 space-y-1">
                  <span className="text-slate-500 uppercase">Remediation Velocity</span>
                  <div className="text-2xl font-bold text-cyan-400">+28% Gain</div>
                  <span className="text-slate-400 text-[11px]">In payment verification</span>
                </div>
                <div className="p-5 rounded-2xl bg-sentinel-950 border border-sentinel-850 space-y-1">
                  <span className="text-slate-500 uppercase">Verified Missions</span>
                  <div className="text-2xl font-bold text-emerald-400">2 Labs Passed</div>
                  <span className="text-slate-400 text-[11px]">With documented evidence</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION D: HOW IT WORKS
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sentinel-900 border border-sentinel-800 text-xs font-semibold text-cyan-400">
            <Layers className="w-3.5 h-3.5" />
            <span>The Diagnostic Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            How DigiSentinel Works
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            A clear 4-step progressive framework to transform curiosity into verified defensive capability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Discover',
              summary: 'Understand your starting point.',
              detail: 'Begin with an unpressured diagnostic or guided goal prompt to survey your initial technical instincts.'
            },
            {
              step: '02',
              title: 'Analyse',
              summary: 'Identify strengths and areas to improve.',
              detail: 'Receive an honest, multi-dimensional breakdown mapping exact competencies, decision errors, and strengths.'
            },
            {
              step: '03',
              title: 'Improve',
              summary: 'Practise with relevant challenges.',
              detail: 'Engage with targeted micro-drills, safe interactive labs, and realistic simulations tailored to your gaps.'
            },
            {
              step: '04',
              title: 'Progress',
              summary: 'Track your learning over time.',
              detail: 'Retest previous weak points, track streak continuity, and build a verified portfolio of completed missions.'
            }
          ].map((item, idx) => (
            <div
              key={item.step}
              className="p-6 rounded-3xl bg-sentinel-900/70 border border-sentinel-800 hover:border-slate-600 transition space-y-4 relative"
            >
              <div className="text-3xl font-extrabold font-mono text-cyan-400/80">
                {item.step}
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white font-display">{item.title}</h3>
                <p className="text-xs font-semibold text-cyan-300">{item.summary}</p>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION D.2: BUILT AROUND REAL-WORLD NEEDS
         ========================================================================= */}
      <RealWorldNeedsSection />

      {/* =========================================================================
          SECTION E: FEATURE SHOWCASE (ALL BUTTONS WORK)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sentinel-900 border border-sentinel-800 text-xs font-semibold text-cyan-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Implemented Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Explore the Platform Features
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Every module below is fully functional and ready to explore in your session.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Skill Discovery & Goal Finder',
              desc: 'Natural language intent classifier that maps your interests to tailored assessment tracks.',
              icon: Compass,
              page: 'discovery' as const,
              badge: 'Interactive Explorer'
            },
            {
              title: 'Topic Mastery & Learning Paths',
              desc: 'Structured curriculum across Cybersecurity, Privacy, Online Fraud, and Technical Reasoning.',
              icon: BookOpen,
              page: 'topics' as const,
              badge: '4 Tracks Available'
            },
            {
              title: 'Daily Challenge Arena',
              desc: 'Deterministic daily scenarios synchronized to today\'s calendar date with multi-level progressive hints.',
              icon: Calendar,
              page: 'challenges' as const,
              badge: 'Daily Rotation'
            },
            {
              title: 'Safe Digital Safety Lab',
              desc: 'Harmless defensive sandbox: Phishing Detective, Password Entropy, Privacy Inspector, and Secure Coding.',
              icon: ShieldCheck,
              page: 'lab' as const,
              badge: '6 Simulation Drills'
            },
            {
              title: 'Practical Assessment Missions',
              desc: 'Job-oriented simulations with simulated terminal output, network headers, and code suites.',
              icon: Terminal,
              page: 'missions' as const,
              badge: '6 Practical Roles'
            },
            {
              title: 'Personal Progress & Radar',
              desc: 'Unified learning dashboard tracking streak days, verified competency levels, and rule-based next steps.',
              icon: Activity,
              page: 'dashboard' as const,
              badge: 'Personal Command Center'
            }
          ].map(feature => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="p-6 rounded-3xl bg-sentinel-900/60 border border-sentinel-800 hover:border-slate-600 transition flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-sentinel-950 border border-sentinel-800 flex items-center justify-center text-cyan-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400 px-2 py-0.5 rounded bg-sentinel-950 border border-sentinel-850">
                      {feature.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white font-display">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>

                <button
                  onClick={() => navigateTo(feature.page)}
                  className="w-full py-2.5 rounded-xl bg-sentinel-950 hover:bg-electric-600 text-slate-300 hover:text-white border border-sentinel-800 hover:border-electric-500 font-semibold text-xs flex items-center justify-center gap-2 transition"
                >
                  <span>Launch Module</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION F: INTERACTIVE LIVE DEMONSTRATION (NO REGISTRATION)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-semibold text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Try It Right Now</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Interactive Sample Diagnostic
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Test your defensive reasoning across three curated sample scenarios without registering an account.
          </p>
        </div>

        <HomepageLiveDemo onStartFullAssessment={() => navigateTo('radar')} />
      </section>

      {/* =========================================================================
          SECTION G: TRUST AND TRANSPARENCY
         ========================================================================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-sentinel-900/80 border border-sentinel-800 space-y-6">
          <div className="flex items-center gap-2.5 text-cyan-400 text-xs font-mono uppercase tracking-wider font-bold">
            <Info className="w-4 h-4" />
            <span>Trust & Platform Transparency Policy</span>
          </div>

          <h3 className="text-2xl font-bold text-white font-display">
            What DigiSentinel Offers — And What It Does Not
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300 leading-relaxed pt-2">
            <div className="p-5 rounded-2xl bg-sentinel-950 border border-emerald-500/30 space-y-2">
              <span className="font-bold text-emerald-300 flex items-center gap-1.5 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>What We Provide</span>
              </span>
              <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                <li>Hands-on defensive education using realistic synthetic scenarios.</li>
                <li>Objective evaluation based solely on recorded responses.</li>
                <li>Explainable rule-based recommendations for remediating skill gaps.</li>
                <li>Completely harmless local simulations that do not store real credentials.</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-sentinel-950 border border-sentinel-850 space-y-2">
              <span className="font-bold text-slate-300 flex items-center gap-1.5 text-sm">
                <ShieldAlert className="w-4 h-4 text-slate-400" />
                <span>What We Do Not Claim</span>
              </span>
              <ul className="space-y-1.5 text-slate-400 list-disc list-inside">
                <li>No guaranteed employment or job-offer certifications.</li>
                <li>No claims that any software or system is "100% impenetrable".</li>
                <li>No manufactured user counts, testimonials, or fake partner logos.</li>
                <li>No tools for attacking external systems or credential theft.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION H: FINAL CALL TO ACTION
         ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
          Your next level starts with understanding where you stand.
        </h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
          Uncover your strengths, expose hidden weaknesses, and test yourself through defensive challenges built around real-world digital situations.
        </p>

        <div className="pt-2">
          <button
            onClick={() => navigateTo('radar')}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-electric-600 hover:bg-electric-500 text-white font-semibold text-sm shadow-xl shadow-electric-600/30 hover:shadow-electric-500/50 transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <Compass className="w-4 h-4" />
            <span>Start Your Assessment</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </section>
    </div>
  );
};
