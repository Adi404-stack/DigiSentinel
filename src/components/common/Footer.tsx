import React from 'react';
import { ShieldCheck, PhoneCall, ExternalLink, Heart, AlertTriangle } from 'lucide-react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-sentinel-850 bg-sentinel-950 text-slate-400 text-sm mt-20">
      {/* Community Anti-Fraud & Cyber Emergency Callout */}
      <div className="border-b border-sentinel-850/60 bg-sentinel-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white tracking-wide">
                Community Engagement Project (CEP) — Citizen Digital Safety Initiative
              </p>
              <p className="text-xs text-slate-400">
                Facing financial cyber fraud in India? Report immediately to the National Cyber Crime Portal or call official helpline.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <a
              href="tel:1930"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 transition"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>National Cyber Helpline: 1930</span>
            </a>
            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-slate-300 hover:text-white transition"
            >
              <span>cybercrime.gov.in</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand & Purpose */}
        <div className="md:col-span-2 space-y-4">
          <Logo size="md" showTagline={true} />
          <p className="text-slate-400 text-xs leading-relaxed max-w-md">
            DigiSentinel is an intelligent skill-discovery and practical assessment platform. Designed for college students, technical aspirants, and community members to discover true strengths, uncover skill gaps, and prove real-world digital capabilities.
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Built with safe, simulated execution environments and deterministic rubrics.</span>
          </div>
        </div>

        {/* Quick Assessment Tracks */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Assessment Tracks</h4>
          <ul className="space-y-2 text-xs">
            <li><span className="text-slate-400 hover:text-slate-200 cursor-pointer">Skill Radar Diagnostic (6 Domains)</span></li>
            <li><span className="text-slate-400 hover:text-slate-200 cursor-pointer">Cyber Fraud Investigator</span></li>
            <li><span className="text-slate-400 hover:text-slate-200 cursor-pointer">Broken Application Debugger</span></li>
            <li><span className="text-slate-400 hover:text-slate-200 cursor-pointer">Network CLI Troubleshooting</span></li>
            <li><span className="text-slate-400 hover:text-slate-200 cursor-pointer">OWASP IDOR AppSec Analyst</span></li>
            <li><span className="text-slate-400 hover:text-slate-200 cursor-pointer">Production Incident Responder</span></li>
          </ul>
        </div>

        {/* Ethical Limitations & Disclaimers */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Ethical Standards</h4>
          <p className="text-[11px] leading-relaxed text-slate-500">
            DigiSentinel measures demonstrated task performance in simulated scenarios. The platform does not certify official statutory competence, predict hiring decisions, or issue government-recognized credentials.
          </p>
          <p className="text-[11px] leading-relaxed text-slate-500">
            All bank SMS, UPI receipts, network captures, and server logs are fictional, synthetic educational artifacts.
          </p>
        </div>
      </div>

      <div className="border-t border-sentinel-900 py-6 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          © {new Date().getFullYear()} DigiSentinel. Community Engagement Project (CEP). All rights reserved.
        </div>
        <div className="flex items-center gap-1 mt-2 sm:mt-0 text-slate-500">
          <span>Engineered with care for digital literacy and resilience</span>
          <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" />
        </div>
      </div>
    </footer>
  );
};
