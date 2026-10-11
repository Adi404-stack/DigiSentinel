import React, { useState, useEffect } from 'react';
import {
  Search,
  Compass,
  Radar,
  Briefcase,
  BookOpen,
  LayoutDashboard,
  Award,
  Globe,
  Sun,
  Moon,
  RotateCcw,
  Terminal,
  ShieldAlert,
  Code2,
  Database,
  Network,
  Activity,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { soundService } from '../../services/soundService';

interface PaletteItem {
  id: string;
  category: 'Navigation' | 'Missions' | 'Settings & Preferences' | 'Actions';
  title: string;
  description: string;
  icon: React.ElementType;
  action: () => void;
  shortcut?: string;
}

export const CommandPalette: React.FC = () => {
  const { navigateTo, setLanguage, toggleTheme, resetAllDemoData, theme } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Global keyboard shortcut: Cmd+K, Ctrl+K, or Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
        soundService.playClick();
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const items: PaletteItem[] = [
    // Navigation
    {
      id: 'nav_radar',
      category: 'Navigation',
      title: 'Skill Radar Diagnostic',
      description: 'Start or continue the 6-domain adaptive diagnostic',
      icon: Radar,
      shortcut: 'R',
      action: () => navigateTo('radar')
    },
    {
      id: 'nav_discovery',
      category: 'Navigation',
      title: 'Skill Discovery Onboarding',
      description: 'Conversational goal analysis and competency mapping',
      icon: Compass,
      action: () => navigateTo('discovery')
    },
    {
      id: 'nav_missions',
      category: 'Navigation',
      title: 'Mission Library',
      description: 'Browse all practical simulation labs and roles',
      icon: Briefcase,
      shortcut: 'M',
      action: () => navigateTo('missions')
    },
    {
      id: 'nav_practice',
      category: 'Navigation',
      title: 'Learning & Practice Centre',
      description: 'Targeted micro-lessons and scenario drills',
      icon: BookOpen,
      action: () => navigateTo('practice')
    },
    {
      id: 'nav_dashboard',
      category: 'Navigation',
      title: 'Personal Dashboard',
      description: 'View XP level, streak, and competency radar chart',
      icon: LayoutDashboard,
      shortcut: 'D',
      action: () => navigateTo('dashboard')
    },
    {
      id: 'nav_portfolio',
      category: 'Navigation',
      title: 'Verified Skill Portfolio',
      description: 'Inspect completion rubrics and export PDF certificate',
      icon: Award,
      shortcut: 'P',
      action: () => navigateTo('portfolio')
    },

    // Direct Missions
    {
      id: 'm_fraud',
      category: 'Missions',
      title: 'Mission: Cyber Fraud Investigator',
      description: 'Analyze phishing headers, trace Romanian IP, freeze $84.5k wire',
      icon: ShieldAlert,
      action: () => navigateTo('missions', { missionId: 'fraud_investigator' })
    },
    {
      id: 'm_dev',
      category: 'Missions',
      title: 'Mission: Debug the Broken Application',
      description: 'Isolate cart calculation race condition and execute Vitest suite',
      icon: Code2,
      action: () => navigateTo('missions', { missionId: 'debug_broken_app' })
    },
    {
      id: 'm_net',
      category: 'Missions',
      title: 'Mission: Network Troubleshooting',
      description: 'Topology CLI triage: ping, traceroute, and gateway repair',
      icon: Network,
      action: () => navigateTo('missions', { missionId: 'network_troubleshoot' })
    },
    {
      id: 'm_appsec',
      category: 'Missions',
      title: 'Mission: Application Security Analyst',
      description: 'Prove OWASP Broken Object Level Authorization (IDOR) on documents',
      icon: Terminal,
      action: () => navigateTo('missions', { missionId: 'appsec_analyst' })
    },
    {
      id: 'm_data',
      category: 'Missions',
      title: 'Mission: Data Detective',
      description: 'Run SQL queries to clean duplicates and reconcile $1.2M error',
      icon: Database,
      action: () => navigateTo('missions', { missionId: 'data_detective' })
    },
    {
      id: 'm_sre',
      category: 'Missions',
      title: 'Mission: Production Incident Responder',
      description: 'Mitigate 42% 502/504 outage and rollback Kubernetes pods',
      icon: Activity,
      action: () => navigateTo('missions', { missionId: 'incident_responder' })
    },

    // Settings & Actions
    {
      id: 'lang_en',
      category: 'Settings & Preferences',
      title: 'Switch Language to English',
      description: 'Default platform terminology',
      icon: Globe,
      action: () => setLanguage('en')
    },
    {
      id: 'lang_hi',
      category: 'Settings & Preferences',
      title: 'Switch Language to हिन्दी (Hindi)',
      description: 'हिंदी भाषा इंटरफेस और धोखाधड़ी निवारण',
      icon: Globe,
      action: () => setLanguage('hi')
    },
    {
      id: 'lang_mr',
      category: 'Settings & Preferences',
      title: 'Switch Language to मराठी (Marathi)',
      description: 'मराठी भाषा इंटरफेस आणि सुरक्षितता मार्गदर्शन',
      icon: Globe,
      action: () => setLanguage('mr')
    },
    {
      id: 'toggle_theme',
      category: 'Settings & Preferences',
      title: `Switch to ${theme === 'dark' ? 'Light Theme' : 'Dark Theme'}`,
      description: 'Toggle high-contrast surface palettes',
      icon: theme === 'dark' ? Sun : Moon,
      action: () => toggleTheme()
    },
    {
      id: 'reset_data',
      category: 'Actions',
      title: 'Reset Baseline Demo Data',
      description: 'Restore seed profile and clear local session state',
      icon: RotateCcw,
      action: () => {
        if (window.confirm('Reset demo state to baseline?')) {
          resetAllDemoData();
        }
      }
    }
  ];

  const filteredItems = items.filter(
    item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (item: PaletteItem) => {
    soundService.playClick();
    item.action();
    setIsOpen(false);
    setSearchQuery('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4 animate-in fade-in duration-150">
      <div className="w-full max-w-2xl rounded-2xl bg-sentinel-900 border border-sentinel-700 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-sentinel-800 flex items-center gap-3 bg-sentinel-950">
          <Search className="w-5 h-5 text-electric-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or search (e.g. 'Mission', 'Hindi', 'Radar', 'Dark')..."
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none font-sans"
          />
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 border border-sentinel-800 rounded px-2 py-0.5">
            <span>ESC</span>
          </div>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2 divide-y divide-sentinel-850/40 text-xs">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              No matching commands or missions found for "{searchQuery}".
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = selectedIndex === idx;

              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3 rounded-xl cursor-pointer transition flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-electric-600/15 text-white border border-electric-500/40'
                      : 'text-slate-300 hover:bg-sentinel-850'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-sentinel-950 border border-sentinel-800 text-electric-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">{item.title}</span>
                        <span className="text-[10px] font-mono text-slate-500 uppercase px-1.5 py-0.2 rounded bg-sentinel-950 border border-sentinel-800">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">{item.description}</p>
                    </div>
                  </div>

                  {item.shortcut && (
                    <span className="text-[10px] font-mono text-slate-400 border border-sentinel-800 rounded px-1.5 py-0.5">
                      {item.shortcut}
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-2.5 bg-sentinel-950 border-t border-sentinel-800 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span className="text-electric-400">DigiSentinel Command Palette</span>
        </div>
      </div>
    </div>
  );
};
