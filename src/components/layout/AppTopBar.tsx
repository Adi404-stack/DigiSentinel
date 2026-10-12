import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Search,
  Globe,
  Sun,
  Moon,
  Sparkles,
  ShieldCheck,
  Type,
  Check,
  User,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { useApp, AppPage } from '../../context/AppContext';
import { SupportedLanguage, FontSize } from '../../types/user';

interface AppTopBarProps {
  onOpenMobileMenu: () => void;
  onOpenSearch: () => void;
}

export const AppTopBar: React.FC<AppTopBarProps> = ({ onOpenMobileMenu, onOpenSearch }) => {
  const {
    currentPage,
    navigateTo,
    language,
    setLanguage,
    fontSize,
    setFontSize,
    theme,
    toggleTheme,
    profile,
    openAssistant,
    openOnboarding
  } = useApp();

  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isFontMenuOpen, setIsFontMenuOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const fontRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangMenuOpen(false);
      }
      if (fontRef.current && !fontRef.current.contains(e.target as Node)) {
        setIsFontMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getPageTitle = (page: AppPage): string => {
    switch (page) {
      case 'landing':
        return language === 'mr' ? 'मुख्य पृष्ठ' : language === 'hi' ? 'होम' : 'Home';
      case 'dashboard':
        return language === 'mr' ? 'डॅशबोर्ड' : language === 'hi' ? 'डैशबोर्ड' : 'Dashboard';
      case 'explore':
        return language === 'mr' ? 'सर्व डोमेन मूल्यांकन' : language === 'hi' ? 'सभी डोमेन मूल्यांकन' : 'Explore Assessments';
      case 'radar':
        return language === 'mr' ? 'कौशल्य निदान' : language === 'hi' ? 'कौशल राडार' : 'Skills Diagnostic';
      case 'radar_results':
        return language === 'mr' ? 'निदान निकाल' : language === 'hi' ? 'मूल्यांकन परिणाम' : 'Diagnostic Results';
      case 'missions':
        return language === 'mr' ? 'हँड्स-ऑन मिशन्स' : language === 'hi' ? 'प्रैक्टिकल मिशन्स' : 'Hands-On Missions';
      case 'mission_workspace':
        return language === 'mr' ? 'मिशन कार्यक्षेत्र' : language === 'hi' ? 'मिशन वर्कस्पेस' : 'Mission Workspace';
      case 'challenges':
        return language === 'mr' ? 'दैनंदिन आव्हाने' : language === 'hi' ? 'दैनिक चुनौतियाँ' : 'Daily Challenges';
      case 'topics':
        return language === 'mr' ? 'विषय अभ्यासक्रम' : language === 'hi' ? 'पाठ्यक्रम' : 'Curriculum Mastery';
      case 'lab':
        return language === 'mr' ? 'डिफेन्स सायबर लॅब' : language === 'hi' ? 'सुरक्षा लैब' : 'Defensive Cyber Lab';
      case 'portfolio':
        return language === 'mr' ? 'कौशल्य पोर्टफोलिओ' : language === 'hi' ? 'पोर्टफोलियो' : 'Verified Portfolio';
      case 'practice':
        return language === 'mr' ? 'क्षमता मॅट्रिक्स' : language === 'hi' ? 'कौशल्य मैट्रिक्स' : 'Competency Matrix';
      case 'profile':
        return language === 'mr' ? 'प्रोफाइल व सेटिंग्ज' : language === 'hi' ? 'प्रोफ़ाइल' : 'Profile & Settings';
      default:
        return 'DigiSentinel';
    }
  };

  const languages: { code: SupportedLanguage; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'mr', label: 'Marathi', native: 'मराठी' }
  ];

  const fontSizes: { code: FontSize; label: string; desc: string }[] = [
    { code: 'sm', label: 'A-', desc: language === 'mr' ? 'लहान (९०%)' : language === 'hi' ? 'छोटा (90%)' : 'Compact (90%)' },
    { code: 'md', label: 'A', desc: language === 'mr' ? 'मध्यम (१००%)' : language === 'hi' ? 'मध्यम (100%)' : 'Default (100%)' },
    { code: 'lg', label: 'A+', desc: language === 'mr' ? 'मोठा (११०%)' : language === 'hi' ? 'बड़ा (110%)' : 'Large (110%)' },
    { code: 'xl', label: 'A++', desc: language === 'mr' ? 'अति मोठा (१२०%)' : language === 'hi' ? 'अति बड़ा (120%)' : 'Extra Large (120%)' }
  ];

  return (
    <header className="sticky top-0 z-30 h-16 bg-sentinel-900/90 border-b border-sentinel-800 backdrop-blur-xl px-4 lg:px-6 flex items-center justify-between shadow-sm transition-colors duration-200">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-sentinel-850 transition-colors"
          aria-label="Open mobile navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 dark:text-slate-500 hidden sm:inline">Platform /</span>
          <h1 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            {getPageTitle(currentPage)}
          </h1>
        </div>

        {/* Sandbox Status Badge */}
        <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium ml-3">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>
            {language === 'mr'
              ? 'सुरक्षित सिमुलेशन लॅब'
              : language === 'hi'
              ? 'सुरक्षित सिमुलेशन'
              : 'Safe Simulated Sandbox'}
          </span>
        </div>
      </div>

      {/* Right: Search, Language, Font Size, Assistant, Theme, Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Search Button */}
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-sentinel-850 border border-sentinel-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-600 transition-colors text-xs"
          title="Search anything (Cmd+K)"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="hidden md:inline">
            {language === 'mr' ? 'शोधा...' : language === 'hi' ? 'खोजें...' : 'Search...'}
          </span>
          <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-sentinel-950 text-slate-500 dark:text-slate-400 rounded border border-sentinel-800">
            ⌘K
          </kbd>
        </button>

        {/* Language Selector Dropdown */}
        <div className="relative" ref={langRef}>
          <button
            onClick={() => {
              setIsLangMenuOpen(prev => !prev);
              setIsFontMenuOpen(false);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-sentinel-850 border border-sentinel-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-medium transition-colors"
            title="Switch Language (भाषा बदला)"
          >
            <Globe className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />
            <span className="uppercase">{language}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {isLangMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl bg-sentinel-900 border border-sentinel-800 shadow-2xl py-1.5 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-3 py-1 text-[10px] font-semibold tracking-wider uppercase text-slate-400 dark:text-slate-500 border-b border-sentinel-800 mb-1">
                Select Language / भाषा
              </div>
              {languages.map(item => (
                <button
                  key={item.code}
                  onClick={() => {
                    setLanguage(item.code);
                    setIsLangMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors ${
                    language === item.code
                      ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400 font-semibold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-sentinel-850 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{item.native}</span>
                    <span className="text-[11px] text-slate-500">({item.label})</span>
                  </div>
                  {language === item.code && <Check className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dynamic Font Size Control */}
        <div className="relative" ref={fontRef}>
          <button
            onClick={() => {
              setIsFontMenuOpen(prev => !prev);
              setIsLangMenuOpen(false);
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-sentinel-850 border border-sentinel-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-medium transition-colors"
            title="Text Size (फॉन्ट आकार)"
          >
            <Type className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
            <span className="uppercase font-mono">{fontSize}</span>
          </button>

          {isFontMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl bg-sentinel-900 border border-sentinel-800 shadow-2xl py-1.5 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-3 py-1 text-[10px] font-semibold tracking-wider uppercase text-slate-400 dark:text-slate-500 border-b border-sentinel-800 mb-1">
                Text Scale / फॉन्ट आकार
              </div>
              {fontSizes.map(item => (
                <button
                  key={item.code}
                  onClick={() => {
                    setFontSize(item.code);
                    setIsFontMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors ${
                    fontSize === item.code
                      ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-sentinel-850 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex flex-col text-left">
                    <span className="font-semibold">{item.label}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">{item.desc}</span>
                  </div>
                  {fontSize === item.code && <Check className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Concept Assistant Tutor trigger */}
        <button
          onClick={openAssistant}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-sky-500/10 to-indigo-500/10 border border-sky-500/30 text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 hover:border-sky-500/50 text-xs font-semibold transition-all shadow-sm"
          title="Ask DigiSentinel Tutor"
        >
          <Sparkles className="w-3.5 h-3.5 text-sky-500 animate-spin-slow" />
          <span>
            {language === 'mr' ? 'मार्गदर्शक' : language === 'hi' ? 'सलाहकार' : 'Ask Tutor'}
          </span>
        </button>

        {/* Personalize Button */}
        <button
          onClick={openOnboarding}
          className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-sentinel-850 transition-colors"
          title={language === 'mr' ? 'वैयक्तिक प्रोफाइल' : language === 'hi' ? 'पर्सनलाइज़ेशन' : 'Personalize Assessment Audience'}
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-sentinel-850 transition-colors"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-sky-600" />
          )}
        </button>

        {/* User Profile Avatar */}
        <button
          onClick={() => navigateTo('profile')}
          className="flex items-center gap-2 pl-1 group focus:outline-none"
          title={profile.name}
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-md group-hover:ring-2 group-hover:ring-sky-400 transition-all">
            {profile.name.slice(0, 2).toUpperCase()}
          </div>
        </button>
      </div>
    </header>
  );
};
