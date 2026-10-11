import React from 'react';
import {
  Settings,
  Globe,
  Sun,
  Moon,
  RotateCcw,
  Shield,
  Eye,
  Check,
  Zap,
  Volume2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SupportedLanguage } from '../../types/user';

export const ProfileSettingsPage: React.FC = () => {
  const { profile, language, setLanguage, theme, toggleTheme, resetAllDemoData, t } = useApp();

  const languages: { code: SupportedLanguage; label: string; sub: string }[] = [
    { code: 'en', label: 'English', sub: 'Default platform language' },
    { code: 'hi', label: 'हिन्दी', sub: 'हिंदी भाषा समर्थन' },
    { code: 'mr', label: 'मराठी', sub: 'मराठी भाषा समर्थन' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2 border-b border-sentinel-850 pb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sentinel-900 border border-sentinel-800 text-xs font-semibold text-slate-300">
          <Settings className="w-3.5 h-3.5 text-slate-400" />
          <span>Platform Preferences</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Profile & Accessibility Settings
        </h1>
        <p className="text-xs text-slate-400">
          Configure localization, visual accessibility, and training simulation environments.
        </p>
      </div>

      <div className="space-y-6">
        {/* Localization & Language */}
        <div className="p-6 rounded-3xl bg-sentinel-900/80 border border-sentinel-800 space-y-4">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white">Language & Regional Community Support</h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Select your preferred language. Designed for college students and local community members across India.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {languages.map(l => (
              <button
                key={l.code}
                onClick={() => setLanguage(l.code)}
                className={`p-4 rounded-2xl border text-left transition flex items-center justify-between ${
                  language === l.code
                    ? 'border-electric-500 bg-electric-950/30 text-white ring-1 ring-electric-500'
                    : 'border-sentinel-800 bg-sentinel-950 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div>
                  <span className="font-bold text-sm block">{l.label}</span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">{l.sub}</span>
                </div>
                {language === l.code && <Check className="w-4 h-4 text-electric-400" />}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Appearance & Theme */}
        <div className="p-6 rounded-3xl bg-sentinel-900/80 border border-sentinel-800 space-y-4">
          <div className="flex items-center gap-2">
            <Sun className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">Visual Appearance & Contrast</h3>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-sentinel-950 border border-sentinel-850">
            <div>
              <span className="text-sm font-semibold text-white block">Theme Mode</span>
              <span className="text-xs text-slate-400 block mt-0.5">
                Current: {theme === 'dark' ? 'Deep Navy Futuristic Dark' : 'High-Contrast Clean Light'}
              </span>
            </div>
            <button
              onClick={toggleTheme}
              className="px-4 py-2 rounded-xl bg-sentinel-850 hover:bg-sentinel-800 border border-sentinel-700 text-xs font-semibold text-slate-200 transition"
            >
              Toggle {theme === 'dark' ? 'Light Theme' : 'Dark Theme'}
            </button>
          </div>
        </div>

        {/* Training Environment Mode */}
        <div className="p-6 rounded-3xl bg-sentinel-900/80 border border-sentinel-800 space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Simulation Safety Notice</h3>
          </div>
          <div className="p-4 rounded-2xl bg-sentinel-950 border border-sentinel-850 text-xs text-slate-300 leading-relaxed space-y-2">
            <p>
              DigiSentinel exercises take place in <strong>Isolated Simulated Training Sandboxes</strong>. No actual corporate databases, bank accounts, or external networks are queried or affected.
            </p>
            <p className="text-slate-500">
              Environment integrity: Synthetic logs, mock RFC headers, deterministic network simulator.
            </p>
          </div>
        </div>

        {/* Reset State Action */}
        <div className="p-6 rounded-3xl bg-sentinel-900/40 border border-rose-500/30 space-y-4">
          <div>
            <h3 className="text-base font-bold text-white">Reset Local Session Data</h3>
            <p className="text-xs text-slate-400 mt-1">
              Clear your diagnostic answers, mission attempts, and restore seeded baseline account state for fresh demonstrations.
            </p>
          </div>
          <button
            onClick={() => {
              if (window.confirm('Reset all demo state to fresh baseline?')) {
                resetAllDemoData();
              }
            }}
            className="px-5 py-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/40 text-rose-300 text-xs font-semibold flex items-center gap-2 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Baseline Demo Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};
