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
  Type,
  User,
  Sliders
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SupportedLanguage, FontSize, UserAudienceCategory } from '../../types/user';

export const ProfileSettingsPage: React.FC = () => {
  const {
    profile,
    language,
    setLanguage,
    fontSize,
    setFontSize,
    theme,
    toggleTheme,
    resetAllDemoData,
    openOnboarding,
    t
  } = useApp();

  const languages: { code: SupportedLanguage; label: string; sub: string }[] = [
    { code: 'en', label: 'English', sub: 'Default platform language' },
    { code: 'hi', label: 'हिन्दी', sub: 'हिंदी भाषा समर्थन' },
    { code: 'mr', label: 'मराठी', sub: 'मराठी भाषा समर्थन' }
  ];

  const fontSizes: { size: FontSize; label: string; preview: string; desc: string }[] = [
    { size: 'sm', label: 'Compact', preview: 'Aa', desc: 'Dense data view (14px)' },
    { size: 'md', label: 'Standard', preview: 'Aa', desc: 'Balanced default scale (16px)' },
    { size: 'lg', label: 'Large', preview: 'Aa', desc: 'High readability view (18px)' },
    { size: 'xl', label: 'Extra Large', preview: 'Aa', desc: 'Maximum accessibility (20px)' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2 border-b border-sentinel-800 pb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sentinel-900 border border-sentinel-800 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <Settings className="w-3.5 h-3.5 text-blue-500" />
          <span>Platform Preferences</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Profile & Accessibility Settings
        </h1>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Configure localization, visual readability, role personalization, and simulation sandboxes.
        </p>
      </div>

      <div className="space-y-6">
        {/* User Persona & Role Card */}
        <div className="p-6 rounded-3xl bg-sentinel-900 border border-sentinel-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Active Profile & Learning Track</h3>
            </div>
            <button
              onClick={openOnboarding}
              className="px-3 py-1.5 rounded-xl bg-sentinel-850 hover:bg-sentinel-800 border border-sentinel-800 text-xs font-semibold text-slate-700 dark:text-slate-200 transition inline-flex items-center gap-1.5"
            >
              <Sliders className="w-3.5 h-3.5 text-indigo-400" />
              <span>Change Track</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="p-4 rounded-2xl bg-sentinel-950 border border-sentinel-800">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Profile Name</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white mt-1 block">{profile.name}</span>
            </div>
            <div className="p-4 rounded-2xl bg-sentinel-950 border border-sentinel-800">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Audience Category</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white mt-1 block capitalize">
                {profile.preferences.audienceCategory ? profile.preferences.audienceCategory.replace('_', ' ') : 'General Learner'}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-sentinel-950 border border-sentinel-800">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Level & XP</span>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400 mt-1 block">Level {profile.level} ({profile.xp} XP)</span>
            </div>
          </div>
        </div>

        {/* Localization & Language */}
        <div className="p-6 rounded-3xl bg-sentinel-900 border border-sentinel-800 space-y-4">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Language & Regional Community Support</h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Select your preferred language. Designed for college students, agricultural professionals, small business owners, and local community members across India.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {languages.map(l => (
              <button
                key={l.code}
                onClick={() => setLanguage(l.code)}
                className={`p-4 rounded-2xl border text-left transition flex items-center justify-between ${
                  language === l.code
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-white ring-1 ring-blue-500'
                    : 'border-sentinel-800 bg-sentinel-950 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-700'
                }`}
              >
                <div>
                  <span className="font-bold text-sm block">{l.label}</span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">{l.sub}</span>
                </div>
                {language === l.code && <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Appearance & Theme */}
        <div className="p-6 rounded-3xl bg-sentinel-900 border border-sentinel-800 space-y-4">
          <div className="flex items-center gap-2">
            <Sun className="w-5 h-5 text-amber-500 dark:text-amber-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Visual Appearance & Contrast</h3>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-sentinel-950 border border-sentinel-800">
            <div>
              <span className="text-sm font-semibold text-slate-900 dark:text-white block">Theme Mode</span>
              <span className="text-xs text-slate-600 dark:text-slate-400 block mt-0.5">
                Current: {theme === 'dark' ? 'Deep Navy Dark Mode (High Contrast)' : 'Clean Daylight Mode (Crisp White/Slate)'}
              </span>
            </div>
            <button
              onClick={toggleTheme}
              className="px-4 py-2 rounded-xl bg-sentinel-850 hover:bg-sentinel-800 border border-sentinel-700 text-xs font-semibold text-slate-800 dark:text-slate-200 transition inline-flex items-center gap-2"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>Switch to Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-600" />
                  <span>Switch to Dark Mode</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Typography & Readability Scaling */}
        <div className="p-6 rounded-3xl bg-sentinel-900 border border-sentinel-800 space-y-4">
          <div className="flex items-center gap-2">
            <Type className="w-5 h-5 text-purple-500 dark:text-purple-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Text Size & Accessibility Scaling</h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Adjust the typography scale to ensure comfortable reading across phones, tablets, and desktop displays.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {fontSizes.map(f => (
              <button
                key={f.size}
                onClick={() => setFontSize(f.size)}
                className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between ${
                  fontSize === f.size
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/40 text-purple-900 dark:text-white ring-1 ring-purple-500'
                    : 'border-sentinel-800 bg-sentinel-950 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-bold uppercase tracking-wider">{f.label}</span>
                  {fontSize === f.size && <Check className="w-4 h-4 text-purple-600 dark:text-purple-400" />}
                </div>
                <div className="mt-3">
                  <span className={`font-black ${f.size === 'sm' ? 'text-lg' : f.size === 'md' ? 'text-xl' : f.size === 'lg' ? 'text-2xl' : 'text-3xl'} block`}>
                    {f.preview}
                  </span>
                  <span className="text-[11px] text-slate-500 block mt-1">{f.desc}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Training Environment Mode */}
        <div className="p-6 rounded-3xl bg-sentinel-900 border border-sentinel-800 space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Simulation Safety Notice</h3>
          </div>
          <div className="p-4 rounded-2xl bg-sentinel-950 border border-sentinel-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed space-y-2">
            <p>
              DigiSentinel exercises take place in <strong>Isolated Simulated Training Sandboxes</strong>. No actual corporate databases, bank accounts, or external networks are queried or affected.
            </p>
            <p className="text-slate-500">
              Environment integrity: Synthetic logs, mock RFC headers, deterministic network simulator.
            </p>
          </div>
        </div>

        {/* Reset State Action */}
        <div className="p-6 rounded-3xl bg-sentinel-900 border border-rose-500/30 space-y-4">
          <div>
            <h3 className="text-base font-bold text-rose-600 dark:text-rose-400">Reset Local Session Data</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Clear your diagnostic answers, mission attempts, and restore seeded baseline account state for fresh demonstrations.
            </p>
          </div>
          <button
            onClick={() => {
              if (window.confirm('Reset all demo state to fresh baseline?')) {
                resetAllDemoData();
              }
            }}
            className="px-5 py-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 border border-rose-300 dark:border-rose-500/40 text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-center gap-2 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Baseline Demo Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};
