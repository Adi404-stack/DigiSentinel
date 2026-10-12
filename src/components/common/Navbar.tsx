import React, { useState } from 'react';
import {
  Compass,
  Radar,
  Briefcase,
  BookOpen,
  LayoutDashboard,
  Award,
  Globe,
  Sun,
  Moon,
  Menu,
  X,
  Zap,
  RotateCcw,
  Settings,
  ShieldCheck,
  Calendar,
  HelpCircle
} from 'lucide-react';
import { useApp, AppPage } from '../../context/AppContext';
import { Logo } from './Logo';
import { SupportedLanguage } from '../../types/user';

export const Navbar: React.FC = () => {
  const {
    currentPage,
    navigateTo,
    profile,
    language,
    setLanguage,
    theme,
    toggleTheme,
    resetAllDemoData,
    openAssistant,
    t
  } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  interface NavItem {
    page: AppPage;
    label: string;
    icon: React.ElementType;
    highlight?: boolean;
  }

  const navItems: NavItem[] = [
    { page: 'landing', label: 'Home', icon: Compass },
    { page: 'discovery', label: 'Explore', icon: Compass },
    { page: 'topics', label: 'Learn', icon: BookOpen },
    { page: 'challenges', label: 'Challenges', icon: Calendar },
    { page: 'lab', label: 'Safety Lab', icon: ShieldCheck },
    { page: 'radar', label: 'Assessment', icon: Radar, highlight: true },
    { page: 'missions', label: 'Missions', icon: Briefcase },
    { page: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  ];

  const handleNav = (page: AppPage) => {
    navigateTo(page);
    setMobileMenuOpen(false);
  };

  const languages: { code: SupportedLanguage; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'mr', label: 'मराठी' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-sentinel-800 bg-sentinel-950/85 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <button
          onClick={() => handleNav('landing')}
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-400 rounded-lg p-1 shrink-0"
        >
          <Logo size="md" />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentPage === item.page;
            return (
              <button
                key={item.page}
                onClick={() => handleNav(item.page)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-150 ${
                  isActive
                    ? 'text-white bg-sentinel-850 border border-sentinel-700 shadow-sm'
                    : item.highlight
                    ? 'text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-sentinel-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : item.highlight ? 'text-cyan-400' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Controls */}
        <div className="hidden sm:flex items-center gap-2.5 shrink-0">
          {/* Security Tutor Concept Assistant Trigger */}
          <button
            onClick={openAssistant}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-sentinel-800 bg-sentinel-900/80 text-xs font-mono text-cyan-300 hover:border-cyan-500/40 hover:bg-sentinel-850 transition"
            title="Open Security Concept Tutor (Curated Knowledge Engine)"
          >
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">Concept Tutor</span>
          </button>

          {/* XP & Level Pill */}
          <button
            onClick={() => handleNav('dashboard')}
            title="View Dashboard & XP breakdown"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-electric-950/60 border border-electric-500/30 text-electric-300 text-xs font-semibold hover:border-electric-400 transition"
          >
            <Zap className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
            <span>Lvl {profile.level}</span>
            <span className="text-slate-500">•</span>
            <span className="font-mono text-cyan-300">{profile.xp} XP</span>
          </button>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-sentinel-800 bg-sentinel-900 text-xs font-medium text-slate-300 hover:text-white hover:border-sentinel-700 transition"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span>{language.toUpperCase()}</span>
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 py-1 bg-sentinel-900 border border-sentinel-700 rounded-xl shadow-xl z-50">
                {languages.map(l => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-medium transition ${
                      language === l.code ? 'text-electric-400 bg-electric-500/10' : 'text-slate-300 hover:bg-sentinel-800'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-sentinel-800 bg-sentinel-900 text-slate-400 hover:text-white hover:border-sentinel-700 transition"
            title="Toggle Light/Dark Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-300" />}
          </button>

          {/* Settings / Profile Button */}
          <button
            onClick={() => handleNav('profile')}
            className={`p-2 rounded-xl border transition ${
              currentPage === 'profile'
                ? 'border-electric-500 bg-electric-500/10 text-electric-400'
                : 'border-sentinel-800 bg-sentinel-900 text-slate-400 hover:text-white hover:border-sentinel-700'
            }`}
            title="Settings & Accessibility"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Quick Reset Demo Data button */}
          <button
            onClick={() => {
              if (window.confirm('Reset demo state to fresh initial session?')) {
                resetAllDemoData();
              }
            }}
            className="p-2 rounded-xl border border-sentinel-800 text-slate-500 hover:text-rose-400 hover:border-rose-500/30 transition"
            title="Reset Seed Demo Data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 xl:hidden">
          <button
            onClick={() => handleNav('dashboard')}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-electric-950/60 border border-electric-500/30 text-electric-300 text-xs font-semibold"
          >
            <Zap className="w-3 h-3 text-yellow-400" />
            <span>{profile.xp} XP</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl border border-sentinel-800 text-slate-400 hover:text-white hover:bg-sentinel-900"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-sentinel-800 bg-sentinel-950 px-4 py-4 space-y-2 max-h-[85vh] overflow-y-auto">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentPage === item.page;
            return (
              <button
                key={item.page}
                onClick={() => handleNav(item.page)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium ${
                  isActive
                    ? 'text-white bg-sentinel-800 border border-sentinel-700'
                    : 'text-slate-300 hover:bg-sentinel-900'
                }`}
              >
                <Icon className="w-4 h-4 text-cyan-400" />
                {item.label}
              </button>
            );
          })}

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openAssistant();
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-cyan-300 bg-cyan-950/30 border border-cyan-500/30"
          >
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            <span>Security Concept Tutor</span>
          </button>

          <button
            onClick={() => handleNav('profile')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium ${
              currentPage === 'profile'
                ? 'text-white bg-sentinel-800 border border-sentinel-700'
                : 'text-slate-300 hover:bg-sentinel-900'
            }`}
          >
            <Settings className="w-4 h-4 text-slate-400" />
            <span>Settings & Preferences</span>
          </button>

          <div className="pt-3 border-t border-sentinel-850 flex items-center justify-between">
            <div className="flex gap-2">
              {languages.map(l => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  className={`px-2.5 py-1 text-xs rounded-lg border ${
                    language === l.code
                      ? 'border-electric-500 text-electric-400 bg-electric-500/10'
                      : 'border-sentinel-800 text-slate-400'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            <button
              onClick={toggleTheme}
              className="px-3 py-1.5 rounded-lg border border-sentinel-800 text-slate-300 text-xs flex items-center gap-1.5"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
