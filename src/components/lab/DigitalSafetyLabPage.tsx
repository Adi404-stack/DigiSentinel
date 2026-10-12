import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  Compass,
  Code2,
  Terminal,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  Zap,
  Info,
  RefreshCw,
  ArrowRight,
  Sparkles,
  Sliders
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DigitalSafetyLabPage: React.FC = () => {
  const { addXP } = useApp();
  const [activeTab, setActiveTab] = useState<
    'phishing' | 'password' | 'privacy' | 'scam' | 'incident' | 'secure_code'
  >('phishing');

  // Exercise 1: Phishing Detective state
  const [phishingAction, setPhishingAction] = useState<string | null>(null);
  const [showPhishingHeaders, setShowPhishingHeaders] = useState<boolean>(false);
  const [linkHovered, setLinkHovered] = useState<boolean>(false);

  // Exercise 2: Password Security Lab state
  const [testPassword, setTestPassword] = useState<string>('P@ssw0rd123');
  const [generatedPassphrase, setGeneratedPassphrase] = useState<string>('sunset-battery-falcon-meadow');

  // Exercise 3: Privacy Inspector state
  const [privacySettings, setPrivacySettings] = useState({
    showPhone: true,
    showLocation: true,
    showBirthday: true,
    showWorkplace: true,
    showEmail: false,
  });

  // Exercise 4: Scam Recognition state
  const [selectedScamId, setSelectedScamId] = useState<number>(0);
  const [scamDecisions, setScamDecisions] = useState<Record<number, string>>({});

  // Exercise 5: Incident Response state
  const [selectedSteps, setSelectedSteps] = useState<string[]>([]);
  const [incidentSubmitted, setIncidentSubmitted] = useState<boolean>(false);

  // Exercise 6: Secure Coding state
  const [selectedPatch, setSelectedPatch] = useState<string | null>(null);
  const [patchSubmitted, setPatchSubmitted] = useState<boolean>(false);

  // Calculate Password Entropy
  const calculateEntropy = (pwd: string) => {
    if (!pwd) return { bits: 0, time: 'Instant', level: 'None', color: 'text-slate-500' };
    let pool = 0;
    if (/[a-z]/.test(pwd)) pool += 26;
    if (/[A-Z]/.test(pwd)) pool += 26;
    if (/[0-9]/.test(pwd)) pool += 10;
    if (/[^a-zA-Z0-9]/.test(pwd)) pool += 32;

    const bits = Math.round(pwd.length * Math.log2(pool || 1));
    let time = 'Less than 1 millisecond';
    let level = 'Very Weak';
    let color = 'text-rose-400';

    if (bits >= 75) {
      time = 'Trillions of centuries';
      level = 'Extremely Strong (Cryptographically Resilient)';
      color = 'text-emerald-400';
    } else if (bits >= 60) {
      time = 'Estimated centuries';
      level = 'Strong';
      color = 'text-cyan-400';
    } else if (bits >= 45) {
      time = 'A few hours to days';
      level = 'Moderate';
      color = 'text-amber-400';
    }

    return { bits, time, level, color };
  };

  const entropyData = calculateEntropy(testPassword);

  // Calculate Privacy Exposure Score
  const calculatePrivacyExposure = () => {
    let score = 0;
    if (privacySettings.showPhone) score += 30;
    if (privacySettings.showLocation) score += 25;
    if (privacySettings.showBirthday) score += 25;
    if (privacySettings.showWorkplace) score += 15;
    if (privacySettings.showEmail) score += 5;
    return score;
  };

  const privacyScore = calculatePrivacyExposure();

  const handleGeneratePassphrase = () => {
    const wordList = [
      'crimson', 'glacier', 'falcon', 'nebula', 'compass', 'timber',
      'harbor', 'summit', 'meadow', 'quantum', 'cipher', 'lantern',
      'breeze', 'vanguard', 'citadel', 'aurora', 'matrix', 'beacon'
    ];
    const picked: string[] = [];
    for (let i = 0; i < 4; i++) {
      picked.push(wordList[Math.floor(Math.random() * wordList.length)]);
    }
    const phrase = picked.join('-');
    setGeneratedPassphrase(phrase);
    setTestPassword(phrase);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>Interactive Defensive Cybersecurity Lab</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
          Safe Digital Safety Lab
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
          Hands-on defensive simulations using harmless synthetic scenarios. Learn by dissecting deceptive headers, analyzing password entropy, minimizing OSINT footprints, and triaging incident response decisions.
        </p>
      </div>

      {/* Lab Module Navigation Tabs */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-sentinel-850">
        {[
          { id: 'phishing', label: '1. Phishing Detective', icon: ShieldAlert },
          { id: 'password', label: '2. Password Security Lab', icon: Lock },
          { id: 'privacy', label: '3. Privacy Inspector', icon: Compass },
          { id: 'scam', label: '4. Scam Recognition', icon: AlertTriangle },
          { id: 'incident', label: '5. Incident Response', icon: Terminal },
          { id: 'secure_code', label: '6. Secure Coding Lab', icon: Code2 },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-electric-600 text-white shadow-md'
                  : 'bg-sentinel-900 border border-sentinel-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* =========================================================================
          MODULE 1: PHISHING DETECTIVE
         ========================================================================= */}
      {activeTab === 'phishing' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-sentinel-900/80 border border-sentinel-800 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-sentinel-850">
              <div>
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-bold block">
                  Simulated Webmail Client
                </span>
                <h3 className="text-xl font-bold text-white font-display">
                  Urgent Payroll Re-Certification Notice
                </h3>
              </div>
              <button
                onClick={() => setShowPhishingHeaders(!showPhishingHeaders)}
                className="px-3 py-1.5 rounded-xl bg-sentinel-950 border border-sentinel-800 text-slate-300 hover:text-white text-xs font-mono transition"
              >
                {showPhishingHeaders ? 'Hide Raw Headers' : 'Inspect Raw Headers (SPF/DKIM)'}
              </button>
            </div>

            {/* Simulated Email Envelope */}
            <div className="p-4 rounded-2xl bg-sentinel-950 border border-sentinel-850 space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">From:</span>
                <span className="text-slate-200">Corporate Payroll Services &lt;hr-support@payroll-compliance-portal.org&gt;</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">To:</span>
                <span className="text-slate-200">staff@acme-corp.internal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Subject:</span>
                <span className="text-amber-300 font-bold">URGENT: October Salary Direct Deposit Blocked - Action in 4 Hours</span>
              </div>
            </div>

            {/* Raw Headers Expansion */}
            {showPhishingHeaders && (
              <div className="p-4 rounded-2xl bg-sentinel-950/90 border border-rose-500/40 text-[11px] font-mono text-slate-300 space-y-1.5">
                <div className="text-rose-400 font-bold uppercase tracking-wider pb-1 border-b border-sentinel-800">
                  Authentication-Results & Routing Trace:
                </div>
                <div>Return-Path: &lt;bounce-daemon@external-vps-russia-relay.net&gt;</div>
                <div className="text-rose-300 font-bold">Received-SPF: FAIL (Domain payroll-compliance-portal.org does not authorize relay 194.26.29.11)</div>
                <div className="text-rose-300 font-bold">DKIM-Signature: NONE (Unsigned message)</div>
                <div>X-Urgency-Score: 9.8 (High psychological pressure detected)</div>
              </div>
            )}

            {/* Simulated Email Body */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-200 leading-relaxed bg-sentinel-950/40 p-5 rounded-2xl border border-sentinel-850">
              <p>Dear Staff Member,</p>
              <p>
                Our annual tax compliance verification failed for your employee account. Due to strict banking regulations, your pending monthly salary deposit of <span className="font-bold text-white">₹68,500.00</span> has been placed on temporary administrative hold.
              </p>
              <p>
                To release your payroll funds before tonight's 8:00 PM processing deadline, please re-authenticate your corporate credentials immediately below:
              </p>

              {/* Interactive Deceptive Link */}
              <div className="pt-2 pb-2">
                <div className="relative inline-block">
                  <a
                    href="#phishing"
                    onClick={(e) => e.preventDefault()}
                    onMouseEnter={() => setLinkHovered(true)}
                    onMouseLeave={() => setLinkHovered(false)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-electric-600/30 border border-electric-500 text-electric-300 font-mono text-xs hover:bg-electric-600/50 transition cursor-help"
                  >
                    <span>https://hr.acme-corp.internal/payroll/verify-credentials</span>
                  </a>

                  {linkHovered && (
                    <div className="absolute left-0 -top-9 z-20 whitespace-nowrap px-3 py-1.5 rounded-lg bg-rose-950 border border-rose-500 text-rose-200 text-[11px] font-mono shadow-xl animate-fadeIn">
                      Actual Target Href: <span className="font-bold">https://payroll-compliance-portal.org/steal/login</span>
                    </div>
                  )}
                </div>
                <div className="text-[11px] text-slate-500 mt-1 font-mono">
                  (Hover over the button above to inspect browser destination preview)
                </div>
              </div>

              <p className="text-slate-400 text-xs">
                Failure to complete verification within 4 hours will delay salary deposit by 30 business days.
              </p>
            </div>

            {/* Triage Action Buttons */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono text-slate-400 font-bold block uppercase tracking-wider">
                Select Your Security Incident Action:
              </span>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setPhishingAction('quarantine')}
                  className={`px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
                    phishingAction === 'quarantine'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-sentinel-950 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-950/30'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Flag as Phishing & Quarantine Domain</span>
                </button>

                <button
                  onClick={() => setPhishingAction('click')}
                  className={`px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
                    phishingAction === 'click'
                      ? 'bg-rose-600 text-white shadow-md'
                      : 'bg-sentinel-950 border border-rose-500/40 text-rose-300 hover:bg-rose-950/30'
                  }`}
                >
                  <XCircle className="w-4 h-4 text-rose-400" />
                  <span>Log in Immediately to Avoid Salary Delay</span>
                </button>
              </div>
            </div>

            {/* Evaluation Result */}
            {phishingAction && (
              <div className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-2 ${
                phishingAction === 'quarantine'
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                  : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
              }`}>
                <div className="font-bold flex items-center gap-2 text-sm">
                  {phishingAction === 'quarantine' ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Excellent Triage! You Neutralized a Credential Harvest</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-4 h-4 text-rose-400" />
                      <span>Critical Breach: Account Compromised</span>
                    </>
                  )}
                </div>
                <p>
                  {phishingAction === 'quarantine'
                    ? 'You spotted the fake sender domain ("payroll-compliance-portal.org"), recognized the failed SPF headers, and caught the misleading link href. The attacker was attempting to steal corporate SSO credentials via manufactured urgency.'
                    : 'Entering corporate credentials into unverified domains gives attackers immediate access to internal company systems. Legitimate HR departments will never demand credential resets under short countdown ultimatums.'}
                </p>
              </div>
            )}
          </div>

          {/* Right Explanation Column */}
          <div className="lg:col-span-4 p-6 rounded-3xl bg-sentinel-900/70 border border-sentinel-800 space-y-4">
            <h4 className="text-sm font-bold text-white font-display flex items-center gap-2">
              <Info className="w-4 h-4 text-cyan-400" />
              <span>Phishing Anatomy Checklist</span>
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-sentinel-950 border border-sentinel-850 space-y-1">
                <span className="font-bold text-white block">1. Domain Discrepancy</span>
                <p className="text-slate-400">
                  Display text can show anything. Always check the actual domain in the href.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-sentinel-950 border border-sentinel-850 space-y-1">
                <span className="font-bold text-white block">2. Manufactured Urgency</span>
                <p className="text-slate-400">
                  Ultimatums ("within 4 hours or salary lost") intentionally bypass rational deliberation.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-sentinel-950 border border-sentinel-850 space-y-1">
                <span className="font-bold text-white block">3. SPF / DKIM Record Failure</span>
                <p className="text-slate-400">
                  Authentic corporate mail systems sign outbound messages cryptographically.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODULE 2: PASSWORD SECURITY LAB
         ========================================================================= */}
      {activeTab === 'password' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-sentinel-900/80 border border-sentinel-800 space-y-6">
            <div className="space-y-2 pb-4 border-b border-sentinel-850">
              <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-bold block">
                Synthetic In-Browser Entropy Evaluator
              </span>
              <h3 className="text-xl font-bold text-white font-display">
                Password Entropy & Offline Cracking Dynamics
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Test how character sets, length, and passphrases affect brute-force cracking times. Evaluated strictly in client memory. Never enter real passwords.
              </p>
            </div>

            {/* Input Box */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-300 font-bold block">
                Type Synthetic Sample Password to Inspect:
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={testPassword}
                  onChange={(e) => setTestPassword(e.target.value)}
                  placeholder="e.g. correct-horse-battery-staple"
                  className="w-full bg-sentinel-950 border border-sentinel-800 rounded-2xl px-4 py-3 text-sm text-white font-mono focus:outline-none focus:ring-1 focus:ring-cyan-400"
                />
              </div>
            </div>

            {/* Multi-Word Passphrase Generator Button */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-sentinel-950 border border-sentinel-850">
              <div className="text-xs space-y-0.5">
                <span className="font-bold text-white block">Generate High-Entropy 4-Word Passphrase</span>
                <span className="text-slate-400 text-[11px] font-mono">Generates 60+ bits of entropy via 4 random dictionary words</span>
              </div>
              <button
                onClick={handleGeneratePassphrase}
                className="px-4 py-2 rounded-xl bg-sentinel-900 hover:bg-sentinel-850 border border-cyan-500/40 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Roll New Passphrase</span>
              </button>
            </div>

            {/* Realtime Metrics Gauges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-sentinel-950 border border-sentinel-800 space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Character Length</span>
                <span className="text-2xl font-bold font-mono text-white">{testPassword.length}</span>
                <span className="text-[10px] text-slate-400 block">Chars</span>
              </div>

              <div className="p-4 rounded-2xl bg-sentinel-950 border border-sentinel-800 space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Calculated Entropy</span>
                <span className={`text-2xl font-bold font-mono ${entropyData.color}`}>
                  {entropyData.bits} Bits
                </span>
                <span className="text-[10px] text-slate-400 block">Combinatorial Search Space</span>
              </div>

              <div className="p-4 rounded-2xl bg-sentinel-950 border border-sentinel-800 space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Offline Crack Resistance</span>
                <span className={`text-sm font-bold font-mono ${entropyData.color} line-clamp-1`}>
                  {entropyData.level}
                </span>
                <span className="text-[10px] text-slate-400 block">{entropyData.time}</span>
              </div>
            </div>

            {/* Educational Callout */}
            <div className="p-4 rounded-2xl bg-sentinel-950 border border-sentinel-800 text-xs text-slate-300 space-y-2">
              <span className="font-mono text-cyan-400 font-bold uppercase tracking-wider text-[11px] block">
                Why Length Outweighs Complexity:
              </span>
              <p className="leading-relaxed">
                An 8-character password like "P@ssw0rd" has an effective search space of ~35 bits because dictionary rules systematically test "@" for "a" and "0" for "o". In contrast, a 28-character passphrase like "{generatedPassphrase}" creates an astronomical search space that would require thousands of GPU clusters millions of years to iterate.
              </p>
            </div>
          </div>

          <div className="lg:col-span-4 p-6 rounded-3xl bg-sentinel-900/70 border border-sentinel-800 space-y-4">
            <h4 className="text-sm font-bold text-white font-display flex items-center gap-2">
              <Lock className="w-4 h-4 text-cyan-400" />
              <span>NIST Guidelines Summary</span>
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-sentinel-950 border border-sentinel-850 space-y-1">
                <span className="text-white font-bold block">1. Length is King</span>
                <p className="text-slate-400">Aim for 16+ character passphrases or password-manager generated random strings.</p>
              </div>
              <div className="p-3 rounded-xl bg-sentinel-950 border border-sentinel-850 space-y-1">
                <span className="text-white font-bold block">2. Stop Arbitrary Rotations</span>
                <p className="text-slate-400">Forced 30-day changes lead to predictable patterns (Summer2026!). Change only on breach notification.</p>
              </div>
              <div className="p-3 rounded-xl bg-sentinel-950 border border-sentinel-850 space-y-1">
                <span className="text-white font-bold block">3. Multi-Factor Always</span>
                <p className="text-slate-400">Even the strongest password can leak in a server breach. MFA stops unauthorized reuse.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODULE 3: PRIVACY INSPECTOR
         ========================================================================= */}
      {activeTab === 'privacy' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-sentinel-900/80 border border-sentinel-800 space-y-6">
            <div className="space-y-2 pb-4 border-b border-sentinel-850">
              <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-bold block">
                Open Source Intelligence (OSINT) Simulator
              </span>
              <h3 className="text-xl font-bold text-white font-display">
                Public Profile Exposure & Attack Surface
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Toggle the visibility of standard profile attributes. See in real-time how seemingly innocuous data exposes you to spear-phishing, SIM-swapping, and security question attacks.
              </p>
            </div>

            {/* Profile Visibility Toggles */}
            <div className="space-y-3">
              {[
                {
                  key: 'showPhone' as const,
                  label: 'Public Phone Number',
                  riskNote: 'Risk: Enables targeted SMS phishing, fake courier voice calls, and SIM-swap reconnaissance.',
                },
                {
                  key: 'showBirthday' as const,
                  label: 'Full Birthday (Day, Month, Year)',
                  riskNote: 'Risk: Unlocks banking knowledge-based authentication and national ID verification gates.',
                },
                {
                  key: 'showLocation' as const,
                  label: 'Current City & Real-time Check-ins',
                  riskNote: 'Risk: Exposes physical routine, time zone, and localized impersonation vectors.',
                },
                {
                  key: 'showWorkplace' as const,
                  label: 'Current Company & Department Role',
                  riskNote: 'Risk: Used for CEO wire-fraud ploys and tailored corporate credential phishing.',
                },
                {
                  key: 'showEmail' as const,
                  label: 'Personal Primary Email Address',
                  riskNote: 'Risk: Allows automated credential-stuffing correlation across known breach dumps.',
                },
              ].map(item => {
                const isEnabled = privacySettings[item.key];
                return (
                  <div
                    key={item.key}
                    className="p-4 rounded-2xl bg-sentinel-950 border border-sentinel-850 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-0.5 max-w-md">
                      <span className="font-bold text-white block">{item.label}</span>
                      <span className="text-slate-400 text-[11px]">{item.riskNote}</span>
                    </div>

                    <button
                      onClick={() => setPrivacySettings(prev => ({ ...prev, [item.key]: !isEnabled }))}
                      className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-semibold flex items-center gap-1.5 transition self-start sm:self-auto ${
                        isEnabled
                          ? 'bg-rose-950/60 border border-rose-500/50 text-rose-300'
                          : 'bg-emerald-950/60 border border-emerald-500/50 text-emerald-300'
                      }`}
                    >
                      {isEnabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      <span>{isEnabled ? 'Publicly Visible' : 'Hidden / Private'}</span>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Live Exposure Meter */}
            <div className="p-5 rounded-2xl bg-sentinel-950 border border-sentinel-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Aggregate OSINT Attack Surface:
                </span>
                <span className={`text-sm font-mono font-bold ${
                  privacyScore > 50 ? 'text-rose-400' : privacyScore > 20 ? 'text-amber-400' : 'text-emerald-400'
                }`}>
                  {privacyScore}% Attack Vector Exposure
                </span>
              </div>

              <div className="w-full bg-sentinel-900 rounded-full h-2 overflow-hidden border border-sentinel-850">
                <div
                  className={`h-2 transition-all duration-300 ${
                    privacyScore > 50 ? 'bg-rose-500' : privacyScore > 20 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${privacyScore}%` }}
                />
              </div>

              <p className="text-xs text-slate-400 leading-relaxed pt-1">
                {privacyScore <= 20
                  ? 'Excellent hygiene! Data minimization significantly reduces automated reconnaissance from automated scraping scrapers.'
                  : 'Notice how combining public phone numbers and birthdays provides attackers with 80% of what is needed to deceive customer service verification agents.'}
              </p>
            </div>
          </div>

          <div className="lg:col-span-4 p-6 rounded-3xl bg-sentinel-900/70 border border-sentinel-800 space-y-4">
            <h4 className="text-sm font-bold text-white font-display flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Data Minimization Rules</span>
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-sentinel-950 border border-sentinel-850 space-y-1">
                <span className="text-white font-bold block">Principle of Least Disclosure</span>
                <p className="text-slate-400">If a service does not strictly need your phone number to ship an item, leave the field blank.</p>
              </div>
              <div className="p-3 rounded-xl bg-sentinel-950 border border-sentinel-850 space-y-1">
                <span className="text-white font-bold block">Social Media Scrubbing</span>
                <p className="text-slate-400">Never post boarding passes, work badges, or desk blueprints online without blurring sensitive labels.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODULE 4: SCAM RECOGNITION
         ========================================================================= */}
      {activeTab === 'scam' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-sentinel-900/80 border border-sentinel-800 space-y-6">
            <div className="space-y-2 pb-4 border-b border-sentinel-850">
              <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-bold block">
                Social Engineering Message Triage
              </span>
              <h3 className="text-xl font-bold text-white font-display">
                Online Fraud & Impersonation Anatomy
              </h3>
            </div>

            {/* Scam Scenarios Selector */}
            <div className="flex gap-2">
              {['Electricity Bill Cutoff', 'Courier Redirection Fee', 'Bank KYC Account Freeze'].map((name, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedScamId(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition ${
                    selectedScamId === idx
                      ? 'bg-electric-600 text-white'
                      : 'bg-sentinel-950 border border-sentinel-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Scenario #{idx + 1}
                </button>
              ))}
            </div>

            {/* Simulated Mobile SMS Card */}
            <div className="p-5 rounded-2xl bg-sentinel-950 border border-sentinel-800 space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-sentinel-850 text-slate-500">
                <span>Sender: +91 98231 00412 (Personal 10-digit SIM)</span>
                <span>Today, 19:12 IST</span>
              </div>
              <div className="p-4 rounded-xl bg-sentinel-900 border border-sentinel-850 text-slate-200 leading-relaxed">
                {selectedScamId === 0 && (
                  <>
                    "Dear Consumer, your electricity power supply will be DISCONNECTED at 09:30 PM tonight due to unpaid bill update. Call our urgent power officer immediately at 98231-XXXXX to verify receipt."
                  </>
                )}
                {selectedScamId === 1 && (
                  <>
                    "Package Delivery Failed: Your parcel #IN48192 could not be delivered due to wrong house address. Pay ₹25 re-delivery fee within 12 hours via link: http://india-post-portal-tracking.biz/pay"
                  </>
                )}
                {selectedScamId === 2 && (
                  <>
                    "URGENT SBI NOTICE: Your bank account has been SUSPENDED due to incomplete PAN card KYC. Download SBI-QuickKYC.apk to unblock immediately or funds will be seized."
                  </>
                )}
              </div>
            </div>

            {/* Action Selection */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-300 font-bold block">
                Choose Safe Defensive Response:
              </span>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setScamDecisions(prev => ({ ...prev, [selectedScamId]: 'safe' }))}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
                    scamDecisions[selectedScamId] === 'safe'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-sentinel-950 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-950/40'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Recognize Fraud Triggers & Verify via Official App</span>
                </button>

                <button
                  onClick={() => setScamDecisions(prev => ({ ...prev, [selectedScamId]: 'unsafe' }))}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
                    scamDecisions[selectedScamId] === 'unsafe'
                      ? 'bg-rose-600 text-white'
                      : 'bg-sentinel-950 border border-rose-500/40 text-rose-300 hover:bg-rose-950/40'
                  }`}
                >
                  <XCircle className="w-4 h-4 text-rose-400" />
                  <span>Call Number / Click Link / Install APK</span>
                </button>
              </div>
            </div>

            {scamDecisions[selectedScamId] && (
              <div className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-1.5 ${
                scamDecisions[selectedScamId] === 'safe'
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                  : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
              }`}>
                <div className="font-bold">
                  {scamDecisions[selectedScamId] === 'safe'
                    ? '✓ Correct Assessment! Deception neutralized.'
                    : '✕ Severe Risk! Falling for this attack leads to complete device or account compromise.'}
                </div>
                <p>
                  Official utility providers, courier posts, and national banks never communicate urgent warnings from personal 10-digit SIM cards, never distribute APK direct downloads, and never demand late-night phone payments.
                </p>
              </div>
            )}
          </div>

          <div className="lg:col-span-4 p-6 rounded-3xl bg-sentinel-900/70 border border-sentinel-800 space-y-4">
            <h4 className="text-sm font-bold text-white font-display flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Red Flags in SMS</span>
            </h4>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-sentinel-950 border border-sentinel-850">
                <span className="font-bold text-white block">1. Personal Mobile Sender</span>
                <span className="text-slate-400">Banks send SMS from 6-letter approved IDs (e.g. AX-HDFCBK), never +91 98XXX.</span>
              </div>
              <div className="p-3 rounded-xl bg-sentinel-950 border border-sentinel-850">
                <span className="font-bold text-white block">2. ".apk" Download Links</span>
                <span className="text-slate-400">Direct APK files contain remote trojans designed to steal SMS OTPs.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODULE 5: INCIDENT RESPONSE
         ========================================================================= */}
      {activeTab === 'incident' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-sentinel-900/80 border border-sentinel-800 space-y-6">
          <div className="space-y-2 pb-4 border-b border-sentinel-850">
            <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-bold block">
              SOC Tier-1 Triage Simulation
            </span>
            <h3 className="text-xl font-bold text-white font-display">
              Incident Response: Impossible Travel Compromise
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Alert Trigger: "User admin@acme.corp logged in from London, UK at 14:00 IST. At 14:18 IST (18 minutes later), a second concurrent login succeeded from Sofia, Bulgaria via IP 185.220.101.4 (Tor Exit Node)."
            </p>
          </div>

          {/* Triage Decision Sequence */}
          <div className="space-y-3">
            <span className="text-xs font-mono text-slate-300 font-bold block">
              Select all mandatory containment actions:
            </span>

            {[
              { id: 'revoke', label: '1. Revoke all active SSO session tokens and terminate active cookies immediately.' },
              { id: 'mfa_reset', label: '2. Force mandatory password rotation & verify existing MFA device registration.' },
              { id: 'audit_logs', label: '3. Inspect SIEM audit logs for files accessed or API keys exported during the Tor session.' },
              { id: 'do_nothing', label: '4. Do nothing and wait for user to report an issue tomorrow.' },
            ].map(step => {
              const isSelected = selectedSteps.includes(step.id);
              return (
                <button
                  key={step.id}
                  onClick={() => {
                    if (incidentSubmitted) return;
                    setSelectedSteps(prev =>
                      isSelected ? prev.filter(s => s !== step.id) : [...prev, step.id]
                    );
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs font-mono transition flex items-center justify-between ${
                    isSelected
                      ? 'bg-electric-950/50 border-electric-500 text-white'
                      : 'bg-sentinel-950 border-sentinel-850 text-slate-400 hover:text-white'
                  }`}
                >
                  <span>{step.label}</span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          {!incidentSubmitted ? (
            <button
              onClick={() => {
                setIncidentSubmitted(true);
                if (selectedSteps.includes('revoke') && selectedSteps.includes('mfa_reset') && !selectedSteps.includes('do_nothing')) {
                  addXP(70);
                }
              }}
              className="px-6 py-2.5 rounded-xl bg-electric-600 hover:bg-electric-500 text-white font-semibold text-xs flex items-center gap-2 transition"
            >
              <span>Execute Containment Plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className={`p-4 rounded-2xl border text-xs space-y-2 ${
              selectedSteps.includes('revoke') && selectedSteps.includes('mfa_reset') && !selectedSteps.includes('do_nothing')
                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
            }`}>
              <div className="font-bold text-sm">
                {selectedSteps.includes('revoke') && selectedSteps.includes('mfa_reset') && !selectedSteps.includes('do_nothing')
                  ? '✓ Containment Successful! Account secured and blast radius isolated.'
                  : '✕ Incomplete Containment: Rogue sessions remained active or unnecessary delays occurred.'}
              </div>
              <p>
                In impossible travel alerts, terminating active sessions immediately prevents ongoing data exfiltration. Resetting credentials and auditing audit logs isolates whether persistence mechanisms were installed.
              </p>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          MODULE 6: SECURE CODING LAB
         ========================================================================= */}
      {activeTab === 'secure_code' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-sentinel-900/80 border border-sentinel-800 space-y-6">
          <div className="space-y-2 pb-4 border-b border-sentinel-850">
            <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-bold block">
              Application Security (AppSec) Code Review
            </span>
            <h3 className="text-xl font-bold text-white font-display">
              Remediating SQL Injection in Dynamic Queries
            </h3>
          </div>

          {/* Vulnerable Code View */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-rose-400 font-bold block">
              Vulnerable Snippet (Unsanitized Concatenation):
            </span>
            <div className="p-4 rounded-2xl bg-sentinel-950 border border-rose-500/40 font-mono text-xs text-rose-200 overflow-x-auto whitespace-pre">
{`// Vulnerable Endpoint Handler
app.post('/api/user/profile', async (req, res) => {
  const userId = req.body.userId;
  // DANGEROUS: Direct string concatenation creates SQLi sink!
  const query = "SELECT name, email, role FROM users WHERE id = '" + userId + "'";
  const result = await db.query(query);
  res.json(result);
});`}
            </div>
          </div>

          {/* Secure Patches Selection */}
          <div className="space-y-3">
            <span className="text-xs font-mono text-slate-300 font-bold block">
              Select the Correct Production Security Patch:
            </span>

            {[
              {
                id: 'patch_param',
                label: 'Option A: Parameterized Prepared Statement',
                code: `// Secure: Database driver treats parameters strictly as data literals
const query = "SELECT name, email, role FROM users WHERE id = $1";
const result = await db.query(query, [userId]);`,
                isCorrect: true,
              },
              {
                id: 'patch_regex',
                label: 'Option B: Naive Keyword Blacklist Replace',
                code: `// Ineffective: Easily bypassed by case variations or encoding
const cleanId = userId.replace('SELECT', '').replace('DROP', '');
const query = "SELECT name, email, role FROM users WHERE id = '" + cleanId + "'";`,
                isCorrect: false,
              }
            ].map(patch => {
              const isSelected = selectedPatch === patch.id;
              return (
                <button
                  key={patch.id}
                  onClick={() => !patchSubmitted && setSelectedPatch(patch.id)}
                  disabled={patchSubmitted}
                  className={`w-full text-left p-4 rounded-2xl border text-xs font-mono transition space-y-2 ${
                    isSelected
                      ? 'bg-electric-950/40 border-electric-500 text-white'
                      : 'bg-sentinel-950 border-sentinel-850 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-slate-200">
                    <span>{patch.label}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                  </div>
                  <pre className="text-[11px] text-slate-300 overflow-x-auto p-2 rounded bg-sentinel-900 border border-sentinel-800">
                    {patch.code}
                  </pre>
                </button>
              );
            })}
          </div>

          {!patchSubmitted ? (
            <button
              onClick={() => {
                if (!selectedPatch) return;
                setPatchSubmitted(true);
                if (selectedPatch === 'patch_param') addXP(75);
              }}
              disabled={!selectedPatch}
              className="px-6 py-2.5 rounded-xl bg-electric-600 hover:bg-electric-500 disabled:opacity-50 text-white font-semibold text-xs flex items-center gap-2 transition"
            >
              <span>Validate Security Patch</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-2 ${
              selectedPatch === 'patch_param'
                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
            }`}>
              <div className="font-bold text-sm">
                {selectedPatch === 'patch_param'
                  ? '✓ Secure Coding Mastered: Parameterized query eliminates SQL Injection.'
                  : '✕ Insecure Pattern: String filtering/blacklisting is easily circumvented.'}
              </div>
              <p>
                Parameterized statements (prepared statements) ensure the database engine compiles the SQL logic ahead of time, treating any user input strictly as literal scalar values. Even if a user enters "' OR 1=1 --", the engine looks for an exact user ID matching that string.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
