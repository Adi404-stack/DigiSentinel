import React, { useState, useMemo } from 'react';
import {
  Compass,
  Search,
  Filter,
  Clock,
  Award,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Tractor,
  Briefcase,
  Building2,
  Users,
  ShieldCheck,
  CheckCircle2,
  SlidersHorizontal,
  Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserAudienceCategory } from '../../types/user';
import { MULTI_DOMAIN_ASSESSMENTS, MultiDomainAssessment } from '../../data/multiDomainAssessmentsData';

export const ExploreAssessmentsPage: React.FC = () => {
  const {
    language,
    profile,
    startAssessment,
    openOnboarding,
    navigateTo
  } = useApp();

  const [selectedAudience, setSelectedAudience] = useState<UserAudienceCategory | 'all'>(
    profile.preferences.audienceCategory || 'all'
  );
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const audienceTabs: {
    id: UserAudienceCategory | 'all';
    label: { en: string; hi: string; mr: string };
    icon: React.ElementType;
  }[] = [
    {
      id: 'all',
      label: { en: 'All Assessments', hi: 'सभी मूल्यांकन', mr: 'सर्व मूल्यांकन' },
      icon: Compass
    },
    {
      id: 'student',
      label: { en: 'Students', hi: 'विद्यार्थी', mr: 'विद्यार्थी' },
      icon: GraduationCap
    },
    {
      id: 'farmer',
      label: { en: 'Farmers & Agri', hi: 'किसान व कृषि', mr: 'शेतकरी व कृषी' },
      icon: Tractor
    },
    {
      id: 'business_owner',
      label: { en: 'Business Owners', hi: 'व्यवसायी', mr: 'व्यापारी व उद्योजक' },
      icon: Briefcase
    },
    {
      id: 'corporate_employee',
      label: { en: 'Corporate', hi: 'कॉर्पोरेट', mr: 'नोकरदार वर्ग' },
      icon: Building2
    },
    {
      id: 'job_seeker',
      label: { en: 'Job Seekers', hi: 'रोजगार शोधकर्ता', mr: 'नोकरी शोधणारे' },
      icon: Search
    },
    {
      id: 'general_learner',
      label: { en: 'General Public', hi: 'आम नागरिक', mr: 'नागरिक व कुटुंब' },
      icon: Users
    }
  ];

  const filteredAssessments = useMemo(() => {
    return MULTI_DOMAIN_ASSESSMENTS.filter(item => {
      // Audience filter
      if (selectedAudience !== 'all' && item.audienceCategory !== selectedAudience) {
        return false;
      }
      // Difficulty filter
      if (selectedDifficulty !== 'all' && item.difficulty !== selectedDifficulty) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const titleMatch =
          item.title.en.toLowerCase().includes(query) ||
          item.title.hi.toLowerCase().includes(query) ||
          item.title.mr.toLowerCase().includes(query);
        const descMatch =
          item.description.en.toLowerCase().includes(query) ||
          item.description.hi.toLowerCase().includes(query) ||
          item.description.mr.toLowerCase().includes(query);
        const skillMatch = item.skillsCovered.some(s => s.toLowerCase().includes(query));
        const topicMatch = item.topic.toLowerCase().includes(query);
        return titleMatch || descMatch || skillMatch || topicMatch;
      }
      return true;
    });
  }, [selectedAudience, selectedDifficulty, searchQuery]);

  const getLocalized = (obj: { en: string; hi: string; mr: string }): string => {
    return obj[language] || obj.en;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-sky-900/40 via-indigo-950/40 to-slate-900/40 border border-sky-500/20 p-6 sm:p-8 overflow-hidden backdrop-blur-xl">
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-gradient-to-l from-sky-500/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold">
            <Compass className="w-3.5 h-3.5" />
            <span>
              {language === 'mr'
                ? 'सर्वसमावेशक बहु-डोमेन मूल्यांकन'
                : language === 'hi'
                ? 'बहु-डोमेन कौशल मूल्यांकन'
                : 'Universal Multi-Domain Assessments'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-display tracking-tight leading-tight">
            {language === 'mr'
              ? 'आपल्या भूमिकेनुसार कौशल्य व सायबर सुरक्षा पडताळणी'
              : language === 'hi'
              ? 'अपनी भूमिका के अनुसार कौशल और सुरक्षा का मूल्यांकन करें'
              : 'Discover Skills & Defend Against Real Threats'}
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
            {language === 'mr'
              ? 'विद्यार्थी, शेतकरी, लहान व्यापारी, कॉर्पोरेट कर्मचारी आणि कुटुंबांसाठी डिझाइन केलेले मराठी, हिंदी आणि इंग्रजीतील मूल्यांकन.'
              : language === 'hi'
              ? 'छात्रों, किसानों, छोटे व्यापारियों और कॉर्पोरेट कर्मचारियों के लिए हिंदी, मराठी और अंग्रेजी में व्यावहारिक मूल्यांकन।'
              : 'Interactive evaluations tailored for students, farmers, SMEs, corporate staff, and everyday internet users in English, Hindi, and Marathi.'}
          </p>

          {/* Quick Action buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={openOnboarding}
              className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold text-xs transition-colors flex items-center gap-2 shadow-lg shadow-sky-500/20"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>
                {language === 'mr' ? 'वैयक्तिकरण बदला' : language === 'hi' ? 'पर्सनलाइज़ करें' : 'Change Personalization'}
              </span>
            </button>
            <button
              onClick={() => navigateTo('radar')}
              className="px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white font-semibold text-xs border border-slate-700 transition-colors flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>
                {language === 'mr' ? 'कौशल्य राडार निदान' : language === 'hi' ? 'कौशल राडार' : 'Full Skills Diagnostic'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Audience Category Tabs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            {language === 'mr' ? 'क्षेत्रानुसार निवडा' : language === 'hi' ? 'श्रेणी अनुसार चुनें' : 'Filter by Audience'}
          </h2>
          <span className="text-xs text-slate-500">
            {filteredAssessments.length} {language === 'mr' ? 'मूल्यांकन उपलब्ध' : language === 'hi' ? 'उपलब्ध' : 'available'}
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-800">
          {audienceTabs.map(tab => {
            const Icon = tab.icon;
            const isSelected = selectedAudience === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedAudience(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-750'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{getLocalized(tab.label)}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search and Difficulty Filter Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={
              language === 'mr'
                ? 'शीर्षक, विषय किंवा कौशल्यानुसार शोधा...'
                : language === 'hi'
                ? 'शीर्षक, विषय या कौशल्य से खोजें...'
                : 'Search by title, topic, or skill...'
            }
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-sentinel-900 border border-sentinel-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all shadow-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={selectedDifficulty}
            onChange={e => setSelectedDifficulty(e.target.value)}
            className="px-3 py-2 rounded-xl bg-sentinel-900 border border-sentinel-800 text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:border-sky-500 shadow-sm"
          >
            <option value="all">
              {language === 'mr' ? 'सर्व काठिण्य पातळी' : language === 'hi' ? 'सभी स्तर' : 'All Difficulties'}
            </option>
            <option value="beginner">
              {language === 'mr' ? 'नवशिक्या' : language === 'hi' ? 'शुरुआती' : 'Beginner'}
            </option>
            <option value="intermediate">
              {language === 'mr' ? 'मध्यम' : language === 'hi' ? 'मध्यम' : 'Intermediate'}
            </option>
            <option value="advanced">
              {language === 'mr' ? 'प्रगत' : language === 'hi' ? 'उन्नत' : 'Advanced'}
            </option>
          </select>
        </div>
      </div>

      {/* Assessment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssessments.map(item => (
          <div
            key={item.id}
            className="rounded-3xl bg-sentinel-900/80 border border-sentinel-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all p-6 flex flex-col justify-between group hover:shadow-xl shadow-sm relative"
          >
            <div className="space-y-4">
              {/* Header tags */}
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wider text-[11px]">
                  {item.topic}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    item.difficulty === 'beginner'
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                      : item.difficulty === 'intermediate'
                      ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20'
                      : 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20'
                  }`}
                >
                  {item.difficulty}
                </span>
              </div>

              {/* Title and Description */}
              <div className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors leading-snug">
                  {getLocalized(item.title)}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                  {getLocalized(item.description)}
                </p>
              </div>

              {/* Disclaimer if present */}
              {item.disclaimer && (
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-600 dark:text-amber-300 leading-tight flex items-start gap-1.5">
                  <Info className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{getLocalized(item.disclaimer)}</span>
                </div>
              )}

              {/* Skills covered pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {item.skillsCovered.map(skill => (
                  <span
                    key={skill}
                    className="text-[10px] px-2 py-0.5 rounded-lg bg-sentinel-850 text-slate-600 dark:text-slate-300 border border-sentinel-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer and Launch CTA */}
            <div className="pt-6 mt-6 border-t border-sentinel-800 flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {item.estimatedMinutes}m
                </span>
                <span className="flex items-center gap-1 text-sky-600 dark:text-sky-400 font-semibold">
                  <Award className="w-3.5 h-3.5" /> +{item.xpReward} XP
                </span>
              </div>

              <button
                onClick={() => startAssessment(item.id)}
                className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-md shadow-sky-500/20 group-hover:scale-105"
              >
                <span>
                  {language === 'mr' ? 'सुरू करा' : language === 'hi' ? 'शुरू करें' : 'Start'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredAssessments.length === 0 && (
        <div className="p-12 text-center rounded-3xl bg-sentinel-900/60 border border-sentinel-800 space-y-3">
          <Compass className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {language === 'mr' ? 'कोणतेही मूल्यांकन सापडले नाही' : language === 'hi' ? 'कोई मूल्यांकन नहीं मिला' : 'No Assessments Found'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {language === 'mr'
              ? 'कृपया वेगळा शोध शब्द किंवा श्रेणी निवडा.'
              : language === 'hi'
              ? 'कृपया दूसरा खोज शब्द या फ़िल्टर चुनें।'
              : 'Try clearing your search query or selecting another audience tab.'}
          </p>
        </div>
      )}
    </div>
  );
};
