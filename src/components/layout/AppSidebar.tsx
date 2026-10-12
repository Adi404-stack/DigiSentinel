import React from 'react';
import {
  LayoutDashboard,
  Compass,
  Crosshair,
  Shield,
  Flame,
  GraduationCap,
  Terminal,
  Award,
  Activity,
  Settings,
  PanelLeftClose,
  PanelLeft,
  X,
  Sparkles,
  Zap
} from 'lucide-react';
import { AppPage, useApp } from '../../context/AppContext';

interface AppSidebarProps {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

interface NavItem {
  id: AppPage;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ isMobileOpen, setIsMobileOpen }) => {
  const {
    currentPage,
    navigateTo,
    isSidebarCollapsed,
    toggleSidebar,
    profile,
    t,
    language,
    openOnboarding
  } = useApp();

  const getSectionTitle = (key: 'main' | 'learning' | 'progress') => {
    if (language === 'mr') {
      if (key === 'main') return 'मुख्य';
      if (key === 'learning') return 'शिकणे आणि सराव';
      return 'प्रगती आणि प्रमाणपत्र';
    }
    if (language === 'hi') {
      if (key === 'main') return 'मुख्य मेनू';
      if (key === 'learning') return 'सीखना और अभ्यास';
      return 'प्रगति और रिकॉर्ड';
    }
    if (key === 'main') return 'MAIN';
    if (key === 'learning') return 'LEARNING & LABS';
    return 'PROGRESS & RECORD';
  };

  const navSections: NavSection[] = [
    {
      title: getSectionTitle('main'),
      items: [
        {
          id: 'dashboard',
          label: t('nav_dashboard'),
          icon: LayoutDashboard
        },
        {
          id: 'explore',
          label: language === 'mr' ? 'मूल्यांकन शोधा' : language === 'hi' ? 'मूल्यांकन खोजें' : 'Explore Catalog',
          icon: Compass,
          badge: 'New'
        },
        {
          id: 'radar',
          label: t('nav_radar'),
          icon: Crosshair
        }
      ]
    },
    {
      title: getSectionTitle('learning'),
      items: [
        {
          id: 'missions',
          label: t('nav_missions'),
          icon: Shield
        },
        {
          id: 'challenges',
          label: t('nav_daily_challenges'),
          icon: Flame,
          badge: `${profile.currentStreakDays}d`
        },
        {
          id: 'topics',
          label: t('nav_topic_mastery'),
          icon: GraduationCap
        },
        {
          id: 'lab',
          label: t('nav_lab'),
          icon: Terminal
        }
      ]
    },
    {
      title: getSectionTitle('progress'),
      items: [
        {
          id: 'portfolio',
          label: t('nav_portfolio'),
          icon: Award,
          badge: profile.portfolio.length ? `${profile.portfolio.length}` : undefined
        },
        {
          id: 'practice',
          label: t('nav_practice'),
          icon: Activity
        },
        {
          id: 'profile',
          label: t('nav_profile'),
          icon: Settings
        }
      ]
    }
  ];

  const handleNavClick = (page: AppPage) => {
    navigateTo(page);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 flex flex-col bg-sentinel-900/95 border-r border-sentinel-800 backdrop-blur-xl transition-all duration-300 ease-in-out shadow-sm
          ${isSidebarCollapsed ? 'w-20' : 'w-64'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-sentinel-800">
          <button
            onClick={() => handleNavClick('landing')}
            className="flex items-center gap-3 focus:outline-none group text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform flex-shrink-0">
              <Shield className="w-5 h-5 text-white" />
            </div>
            {!isSidebarCollapsed && (
              <div className="flex flex-col overflow-hidden">
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-bold text-slate-900 dark:text-white text-base tracking-tight leading-none">
                    DigiSentinel
                  </span>
                  <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                    2.0
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  Skill Discovery & Safety
                </span>
              </div>
            )}
          </button>

          {/* Desktop collapse toggle */}
          <button
            onClick={toggleSidebar}
            className="hidden lg:flex p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-sentinel-850 transition-colors"
            title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isSidebarCollapsed ? (
              <PanelLeft className="w-4 h-4" />
            ) : (
              <PanelLeftClose className="w-4 h-4" />
            )}
          </button>

          {/* Mobile close button */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-sentinel-850"
            aria-label="Close navigation drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6 scrollbar-thin scrollbar-thumb-sentinel-800">
          {navSections.map(section => (
            <div key={section.title} className="space-y-1">
              {!isSidebarCollapsed && (
                <div className="px-3 pb-1 text-[11px] font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                  {section.title}
                </div>
              )}
              {section.items.map(item => {
                const isActive = currentPage === item.id;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative
                      ${
                        isActive
                          ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400 font-semibold border border-sky-500/20 shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-sentinel-850'
                      }
                    `}
                    title={isSidebarCollapsed ? item.label : undefined}
                  >
                    <Icon
                      className={`w-5 h-5 flex-shrink-0 transition-colors ${
                        isActive ? 'text-sky-600 dark:text-sky-400' : 'text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200'
                      }`}
                    />
                    {!isSidebarCollapsed && (
                      <span className="truncate flex-1 text-left">{item.label}</span>
                    )}
                    {!isSidebarCollapsed && item.badge && (
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          item.badge === 'New'
                            ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30'
                            : 'bg-sentinel-850 text-slate-600 dark:text-slate-300 border border-sentinel-800'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                    {/* Collapsed active pill */}
                    {isSidebarCollapsed && isActive && (
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-sky-500 rounded-l-full" />
                    )}
                  </button>
                );
              })}
            </div>
          ))}

          {/* Quick Onboarding Button */}
          {!isSidebarCollapsed && (
            <div className="pt-2 px-1">
              <button
                onClick={() => {
                  openOnboarding();
                  setIsMobileOpen(false);
                }}
                className="w-full p-3 rounded-xl bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-purple-500/10 border border-sky-500/20 text-left hover:border-sky-500/40 transition-all group"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-sky-600 dark:text-sky-400 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-sky-500" />
                  {language === 'mr' ? 'वैयक्तिक प्रोफाइल' : language === 'hi' ? 'पर्सनलाइज़ेशन' : 'Personalize Learning'}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                  {language === 'mr'
                    ? 'आपला व्यवसाय व उद्दिष्टांनुसार सराव निवडा'
                    : language === 'hi'
                    ? 'अपने लक्ष्य के अनुसार विषय कस्टमाइज़ करें'
                    : 'Tailor assessments to your role & background'}
                </div>
              </button>
            </div>
          )}
        </div>

        {/* User Card & XP Footer */}
        <div className="p-3 border-t border-sentinel-800 bg-sentinel-900/60">
          {!isSidebarCollapsed ? (
            <div className="p-2.5 rounded-xl bg-sentinel-850 border border-sentinel-800 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white uppercase shadow-sm">
                    {profile.name.slice(0, 2)}
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">{profile.name}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <span>Lvl {profile.level}</span>
                      <span>•</span>
                      <span className="text-amber-500 dark:text-amber-400 font-medium flex items-center gap-0.5">
                        <Flame className="w-3 h-3 inline" /> {profile.currentStreakDays}d
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Progress bar */}
              <div className="w-full bg-sentinel-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-sky-400 to-indigo-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (profile.xp % 300) / 3)}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                <span>{profile.xp} XP Total</span>
                <span>{300 - (profile.xp % 300)} XP to Lvl {profile.level + 1}</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 py-1">
              <div
                className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white cursor-pointer shadow-sm"
                onClick={() => handleNavClick('profile')}
                title={`${profile.name} (Lvl ${profile.level})`}
              >
                {profile.name.slice(0, 2)}
              </div>
              <div className="flex items-center gap-0.5 text-[10px] text-amber-500 dark:text-amber-400 font-bold">
                <Zap className="w-3 h-3 text-amber-400" />
                {profile.level}
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
