import React, { useState } from 'react';
import {
  X,
  Check,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  Tractor,
  Briefcase,
  Building2,
  Search,
  Users,
  Compass
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserAudienceCategory, SupportedLanguage } from '../../types/user';

export const PersonalizedOnboardingModal: React.FC = () => {
  const {
    isOnboardingOpen,
    closeOnboarding,
    updateUserAudience,
    language,
    setLanguage,
    navigateTo,
    triggerCelebration
  } = useApp();

  const [step, setStep] = useState<number>(1);
  const [selectedAudience, setSelectedAudience] = useState<UserAudienceCategory>('student');
  const [selectedGoal, setSelectedGoal] = useState<string>('prevent_fraud');
  const [selectedExperience, setSelectedExperience] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [selectedExplanation, setSelectedExplanation] = useState<'beginner_friendly' | 'advanced'>('beginner_friendly');

  if (!isOnboardingOpen) return null;

  const audienceCategories: {
    id: UserAudienceCategory;
    title: { en: string; hi: string; mr: string };
    desc: { en: string; hi: string; mr: string };
    icon: React.ElementType;
    badge: string;
  }[] = [
    {
      id: 'student',
      title: { en: 'Student', hi: 'विद्यार्थी', mr: 'विद्यार्थी' },
      desc: {
        en: 'Logical reasoning, programming, social media hygiene & student safety.',
        hi: 'तार्किक क्षमता, कोडिंग बेसिक्स, सोशल मीडिया सुरक्षा।',
        mr: 'तार्किक विचार, कोडिंग तत्त्वे आणि सोशल मीडिया सुरक्षा.'
      },
      icon: GraduationCap,
      badge: 'Academic'
    },
    {
      id: 'farmer',
      title: { en: 'Farmer & Agriculture', hi: 'किसान व कृषि उपयोगकर्ता', mr: 'शेतकरी व कृषी घटक' },
      desc: {
        en: 'Kisan payments, subsidy scam defense, APMC marketplace safety & digital literacy.',
        hi: 'डिजिटल पेमेंट, योजना सुरक्षा, ऑनलाइन धोखाधड़ी से बचाव।',
        mr: 'UPI पेमेंट्स, सरकारी योजना अनुदान फसवणूक प्रतिबंध आणि डिजिटल साक्षरता.'
      },
      icon: Tractor,
      badge: 'Agri-Safety'
    },
    {
      id: 'business_owner',
      title: { en: 'Business Owner & SME', hi: 'व्यवसायी और उद्यमी', mr: 'व्यापारी आणि उद्योजक' },
      desc: {
        en: 'Customer data privacy, invoice fraud prevention, UPI QR security & digital business.',
        hi: 'ग्राहक डेटा सुरक्षा, बिल धोखाधड़ी रोकथाम, व्यावसायिक साइबर सुरक्षा।',
        mr: 'ग्राहक डेटा संरक्षण, इनव्हॉइस फसवणूक प्रतिबंध आणि व्यवसाय सुरक्षा.'
      },
      icon: Briefcase,
      badge: 'Commerce'
    },
    {
      id: 'corporate_employee',
      title: { en: 'Corporate Professional', hi: 'कॉर्पोरेट कर्मचारी', mr: 'नोकरदार वर्ग' },
      desc: {
        en: 'Workplace data classification, spear phishing defense & productivity hygiene.',
        hi: 'ऑफिस डेटा सुरक्षा, फिशिंग ईमेल बचाव और उत्पादकता।',
        mr: 'ऑफिस डेटा गोपनीयता, फिशिंग ईमेल बचाव आणि डिजिटल शिस्त.'
      },
      icon: Building2,
      badge: 'Enterprise'
    },
    {
      id: 'job_seeker',
      title: { en: 'Job Seeker & Candidate', hi: 'नौकरी खोजकर्ता', mr: 'नोकरी शोधणारे' },
      desc: {
        en: 'Fake offer letter detection, resume privacy, tech aptitude & interview preparedness.',
        hi: 'फर्जी जॉब ऑफर पहचान, तकनीकी इंटरव्यू तैयारी और बायोडाटा गोपनीयता।',
        mr: 'बनावट जॉब ऑफर्स ओळखणे, बायोडाटा गोपनीयता आणि तांत्रिक मुलाखत सराव.'
      },
      icon: Search,
      badge: 'Career'
    },
    {
      id: 'general_learner',
      title: { en: 'General Public & Family', hi: 'आम नागरिक व परिवार', mr: 'सर्वसामान्य नागरिक' },
      desc: {
        en: 'Smartphone safety, electricity bill scams, family privacy & everyday UPI defense.',
        hi: 'स्मार्टफोन सुरक्षा, बिजली बिल फ्रॉड, पारिवारिक डिजिटल प्राइवेसी।',
        mr: 'स्मार्टफोन सुरक्षा, वीज बिल मेसेज घोटाळे आणि कौटुंबिक डिजिटल सुरक्षा.'
      },
      icon: Users,
      badge: 'Everyday'
    }
  ];

  const goals = [
    {
      id: 'prevent_fraud',
      label: {
        en: 'Prevent Financial Frauds & Payment Scams',
        hi: 'वित्तीय धोखाधड़ी और ऑनलाइन स्कैम से बचाव',
        mr: 'ऑनलाइन आर्थिक फसवणूक आणि पेमेंट स्कॅमपासून संरक्षण'
      }
    },
    {
      id: 'tech_skills',
      label: {
        en: 'Learn Technical Cybersecurity & Reasoning',
        hi: 'तकनीकी साइबर सुरक्षा और कोडिंग तर्क सीखना',
        mr: 'सायबर सुरक्षा तंत्रज्ञान आणि तार्किक विचार शिकणे'
      }
    },
    {
      id: 'career_readiness',
      label: {
        en: 'Prepare for Career & Job Verification',
        hi: 'करियर तैयारी और नौकरी सुरक्षा',
        mr: 'करिअर सराव आणि नोकरी सुरक्षा'
      }
    },
    {
      id: 'general_awareness',
      label: {
        en: 'Build Everyday Digital Habits for Family',
        hi: 'परिवार के लिए सुरक्षित डिजिटल आदतें',
        mr: 'कुटुंबासाठी दैनंदिन सुरक्षित डिजिटल सवयी'
      }
    }
  ];

  const handleFinish = () => {
    updateUserAudience(selectedAudience, {
      learningGoal: selectedGoal,
      experienceLevel: selectedExperience,
      explanationPreference: selectedExplanation
    });
    closeOnboarding();
    triggerCelebration();
    navigateTo('explore');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-sentinel-900 border border-sentinel-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-sentinel-800 flex items-center justify-between bg-sentinel-900/90 backdrop-blur">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                {language === 'mr'
                  ? 'वैयक्तिक शिक्षण प्रवास निवडा'
                  : language === 'hi'
                  ? 'व्यक्तिगत सीखने का मार्ग'
                  : 'Personalize Your Sentinel Path'}
              </h2>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                {language === 'mr' ? `पायरी ${step} पैकी ४` : language === 'hi' ? `कदम ${step} का 4` : `Step ${step} of 4`}
              </div>
            </div>
          </div>
          <button
            onClick={closeOnboarding}
            className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-sentinel-850 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {language === 'mr'
                    ? 'आपण कोणत्या क्षेत्रात कार्यरत आहात?'
                    : language === 'hi'
                    ? 'आपकी मुख्य भूमिका या पृष्ठभूमि क्या है?'
                    : 'What best describes your background?'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {language === 'mr'
                    ? 'या आधारे आम्ही तुमच्यासाठी सर्वात समर्पक मूल्यांकन सुचवू.'
                    : language === 'hi'
                    ? 'इसके आधार पर हम आपके लिए उपयुक्त अभ्यास तैयार करेंगे।'
                    : 'We customize drills, examples, and language difficulty based on your role.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {audienceCategories.map(cat => {
                  const Icon = cat.icon;
                  const isSelected = selectedAudience === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedAudience(cat.id)}
                      className={`p-4 rounded-2xl border text-left transition-all relative flex flex-col justify-between ${
                        isSelected
                          ? 'bg-sky-500/10 border-sky-500 text-sky-700 dark:text-white shadow-lg shadow-sky-500/10 ring-1 ring-sky-500'
                          : 'bg-sentinel-850/60 border-sentinel-800 text-slate-700 dark:text-slate-300 hover:bg-sentinel-850 hover:border-slate-400 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                            isSelected
                              ? 'bg-sky-500 text-white'
                              : 'bg-sentinel-800 text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-sentinel-800 text-slate-500 dark:text-slate-400 border border-sentinel-700">
                          {cat.badge}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-slate-900 dark:text-white mb-1">
                          {cat.title[language] || cat.title.en}
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                          {cat.desc[language] || cat.desc.en}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">
                  {language === 'mr'
                    ? 'आपले मुख्य उद्दिष्ट काय आहे?'
                    : language === 'hi'
                    ? 'आपका प्राथमिक सीखने का लक्ष्य क्या है?'
                    : 'What is your primary learning goal?'}
                </h3>
                <p className="text-xs text-slate-400">
                  {language === 'mr'
                    ? 'आम्ही त्यानुसार आव्हानांची प्राधान्यता ठरवू.'
                    : language === 'hi'
                    ? 'हम आपके लिए सबसे महत्वपूर्ण चुनौतियाँ पहले लाएंगे।'
                    : 'We tailor the priority order of challenges.'}
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                {goals.map(goal => {
                  const isSelected = selectedGoal === goal.id;
                  return (
                    <button
                      key={goal.id}
                      onClick={() => setSelectedGoal(goal.id)}
                      className={`w-full p-4 rounded-2xl border text-left text-sm transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-sky-500/10 border-sky-500 text-white font-medium ring-1 ring-sky-500'
                          : 'bg-slate-800/40 border-slate-800 text-slate-300 hover:bg-slate-800/70 hover:border-slate-700'
                      }`}
                    >
                      <span>{goal.label[language] || goal.label.en}</span>
                      {isSelected && <Check className="w-5 h-5 text-sky-400 flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">
                  {language === 'mr'
                    ? 'आपला सध्याचा अनुभव स्तर कोणता आहे?'
                    : language === 'hi'
                    ? 'आपका वर्तमान अनुभव स्तर क्या है?'
                    : 'What is your current experience level?'}
                </h3>
                <p className="text-xs text-slate-400">
                  {language === 'mr'
                    ? 'यामुळे प्रश्नांची काठिण्य पातळी योग्य राहील.'
                    : language === 'hi'
                    ? 'इससे प्रश्नों का कठिनाई स्तर संतुलित रहेगा।'
                    : 'This balances initial difficulty.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {[
                  {
                    id: 'beginner',
                    title: { en: 'Beginner', hi: 'शुरुआती', mr: 'नवशिक्या' },
                    desc: {
                      en: 'New to security; need plain-language explanations.',
                      hi: 'सुरक्षा में नए हैं, सरल भाषा चाहिए।',
                      mr: 'सुरुवात करत आहे; सोपी भाषा हवी आहे.'
                    }
                  },
                  {
                    id: 'intermediate',
                    title: { en: 'Practitioner', hi: 'मध्यम', mr: 'मध्यम' },
                    desc: {
                      en: 'Familiar with digital basics; want realistic scenarios.',
                      hi: 'बुनियादी बातें पता हैं, व्यावहारिक अभ्यास चाहिए।',
                      mr: 'मूलभूत माहिती आहे, प्रत्यक्ष सराव हवा आहे.'
                    }
                  },
                  {
                    id: 'advanced',
                    title: { en: 'Technical', hi: 'उन्नत', mr: 'प्रगत' },
                    desc: {
                      en: 'Experienced; looking for rigorous triage drills.',
                      hi: 'गहन सुरक्षा विश्लेषण और कोड निरीक्षण।',
                      mr: 'खोलवर विश्लेषण आणि तांत्रिक आव्हाने हवी आहेत.'
                    }
                  }
                ].map(lvl => {
                  const isSelected = selectedExperience === lvl.id;
                  return (
                    <button
                      key={lvl.id}
                      onClick={() => setSelectedExperience(lvl.id as any)}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'bg-sky-500/10 border-sky-500 text-white ring-1 ring-sky-500'
                          : 'bg-slate-800/40 border-slate-800 text-slate-300 hover:bg-slate-800/70 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-semibold text-sm text-white mb-1">
                        {lvl.title[language] || lvl.title.en}
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {lvl.desc[language] || lvl.desc.en}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">
                  {language === 'mr'
                    ? 'भाषा आणि स्पष्टीकरण शैली'
                    : language === 'hi'
                    ? 'भाषा और स्पष्टीकरण शैली'
                    : 'Preferred Language & Explanation Style'}
                </h3>
                <p className="text-xs text-slate-400">
                  {language === 'mr'
                    ? 'तुम्ही नंतर कधीही वरून भाषा बदलू शकता.'
                    : language === 'hi'
                    ? 'आप इसे बाद में कभी भी बदल सकते हैं।'
                    : 'You can change these anytime in the top bar.'}
                </p>
              </div>

              {/* Language selection pills */}
              <div className="grid grid-cols-3 gap-2.5 pt-2">
                {[
                  { code: 'en' as SupportedLanguage, label: 'English', native: 'English' },
                  { code: 'hi' as SupportedLanguage, label: 'Hindi', native: 'हिन्दी' },
                  { code: 'mr' as SupportedLanguage, label: 'Marathi', native: 'मराठी' }
                ].map(l => (
                  <button
                    key={l.code}
                    onClick={() => setLanguage(l.code)}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      language === l.code
                        ? 'bg-sky-500/10 border-sky-500 text-sky-400 font-bold ring-1 ring-sky-500'
                        : 'bg-slate-800/40 border-slate-800 text-slate-300 hover:bg-slate-800/70'
                    }`}
                  >
                    <div className="text-sm font-semibold">{l.native}</div>
                    <div className="text-[10px] text-slate-400">{l.label}</div>
                  </button>
                ))}
              </div>

              {/* Explanation style */}
              <div className="space-y-2 pt-2">
                <div className="text-xs font-semibold text-slate-400">
                  {language === 'mr' ? 'स्पष्टीकरण पद्धत:' : language === 'hi' ? 'स्पष्टीकरण का तरीका:' : 'Explanation Depth:'}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => setSelectedExplanation('beginner_friendly')}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      selectedExplanation === 'beginner_friendly'
                        ? 'bg-sky-500/10 border-sky-500 text-white font-medium'
                        : 'bg-slate-800/40 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="font-semibold text-white mb-0.5">
                      {language === 'mr' ? 'सोपे दैनंदिन दाखले' : language === 'hi' ? 'सरल दैनिक उदाहरण' : 'Everyday Examples'}
                    </div>
                    <span className="text-[10px] text-slate-400">
                      {language === 'mr' ? 'तांत्रिक शब्दांशिवाय सोप्या भाषेत' : language === 'hi' ? 'बिना जटिल शब्दों के' : 'Plain language without jargon'}
                    </span>
                  </button>
                  <button
                    onClick={() => setSelectedExplanation('advanced')}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      selectedExplanation === 'advanced'
                        ? 'bg-sky-500/10 border-sky-500 text-white font-medium'
                        : 'bg-slate-800/40 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="font-semibold text-white mb-0.5">
                      {language === 'mr' ? 'तांत्रिक सुरक्षा विश्लेषण' : language === 'hi' ? 'तकनीकी विश्लेषण' : 'Technical Defense'}
                    </div>
                    <span className="text-[10px] text-slate-400">
                      {language === 'mr' ? 'प्रोटोकॉल्स, हेडर आणि नियम' : language === 'hi' ? 'प्रोटोकॉल और सुरक्षा नियम' : 'Protocols, headers & risk models'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-sentinel-800 bg-sentinel-900/90 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep(prev => prev - 1)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'मागे' : language === 'hi' ? 'पीछे' : 'Back'}</span>
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              onClick={() => setStep(prev => prev + 1)}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-sky-500 hover:bg-sky-400 text-white transition-all flex items-center gap-1.5 shadow-md shadow-sky-500/20"
            >
              <span>{language === 'mr' ? 'पुढे' : language === 'hi' ? 'आगे' : 'Continue'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white transition-all flex items-center gap-2 shadow-lg shadow-sky-500/25"
            >
              <Sparkles className="w-4 h-4" />
              <span>{language === 'mr' ? 'सुरू करा!' : language === 'hi' ? 'शुरू करें!' : 'Launch My Path'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
