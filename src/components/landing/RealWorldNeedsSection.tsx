import React from 'react';
import {
  GraduationCap,
  Tractor,
  Briefcase,
  Building2,
  Search,
  Smartphone,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Info,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const RealWorldNeedsSection: React.FC = () => {
  const { language, navigateTo, startAssessment } = useApp();

  const getLocalized = (obj: { en: string; hi: string; mr: string }): string => {
    return obj[language] || obj.en;
  };

  const personas = [
    {
      id: 'student',
      role: {
        en: 'College Student',
        hi: 'कॉलेज छात्र',
        mr: 'महाविद्यालयीन विद्यार्थी'
      },
      tag: {
        en: 'Academic & Tech Foundation',
        hi: 'अकादमिक और कोडिंग बेसिक्स',
        mr: 'शैक्षणिक आणि कोडिंग पाया'
      },
      icon: GraduationCap,
      color: 'from-blue-500/20 to-sky-500/20 text-sky-500 dark:text-sky-400 border-sky-500/30',
      illustrativeNeed: {
        en: '"Help me understand my strengths, practise technical concepts, and prepare for assessments without getting lost in complicated explanations."',
        hi: '"मुझे अपनी खूबियां समझने, तकनीकी अवधारणाओं का अभ्यास करने और जटिल भाषा में उलझे बिना टेस्ट की तैयारी करने में मदद चाहिए।"',
        mr: '"मला माझी ताकद समजून घेण्यासाठी, तांत्रिक संकल्पनांचा सराव करण्यासाठी आणि क्लिष्ट भाषेत न अडकता मूल्यांकनाची तयारी करण्यासाठी मदत हवी आहे."'
      },
      relevantFeatures: [
        { en: 'Skill assessments', hi: 'कौशल्य मूल्यांकन', mr: 'कौशल्य मूल्यांकन' },
        { en: 'Programming fundamentals', hi: 'प्रोग्रामिंग बेसिक्स', mr: 'प्रोग्रामिंग मूलभूत ज्ञान' },
        { en: 'Logical reasoning', hi: 'तार्किक क्षमता', mr: 'तार्किक विचार' },
        { en: 'Career-oriented learning paths', hi: 'करियर आधारित अध्ययन मार्ग', mr: 'करिअर मार्गदर्शन ट्रॅक' },
        { en: 'Progress tracking', hi: 'प्रगति ट्रैकिंग', mr: 'प्रगती ट्रॅकिंग' }
      ],
      action: () => startAssessment('student_digital_safety'),
      cta: { en: 'Try Student Drill', hi: 'विद्यार्थी अभ्यास शुरू करें', mr: 'विद्यार्थी सराव सुरू करा' }
    },
    {
      id: 'farmer',
      role: {
        en: 'Farmer & Agri Producer',
        hi: 'किसान व कृषि उत्पादक',
        mr: 'शेतकरी व कृषी उत्पादक'
      },
      tag: {
        en: 'Agri Safety & Payments',
        hi: 'कृषि एवं डिजिटल पेमेंट सुरक्षा',
        mr: 'कृषी व डिजिटल पेमेंट सुरक्षा'
      },
      icon: Tractor,
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
      illustrativeNeed: {
        en: '"I want to use digital services confidently, understand online payment risks, and recognize suspicious messages without needing advanced technical knowledge."',
        hi: '"मैं आत्मविश्वास से डिजिटल सेवाओं का उपयोग करना चाहता हूँ, पेमेंट के जोखिम समझना और बिना जटिल तकनीकी ज्ञान के फर्जी संदेश पहचानना चाहता हूँ।"',
        mr: '"मला कोणत्याही तांत्रिक ज्ञानाशिवाय आत्मविश्वासाने डिजिटल सेवा वापरता याव्यात, ऑनलाइन पेमेंटचे धोके समजावेत आणि संशयास्पद मेसेज ओळखता यावेत."'
      },
      relevantFeatures: [
        { en: 'Marathi and Hindi support', hi: 'मराठी और हिंदी भाषा समर्थन', mr: 'मराठी व हिंदी संपूर्ण भाषा समर्थन' },
        { en: 'Digital literacy assessments', hi: 'डिजिटल साक्षरता मूल्यांकन', mr: 'डिजिटल साक्षरता मूल्यांकन' },
        { en: 'Online fraud awareness', hi: 'ऑनलाइन धोखाधड़ी जागरूकता', mr: 'ऑनलाइन फसवणूक जागरूकता' },
        { en: 'Digital payment safety', hi: 'डिजिटल पेमेंट सुरक्षा (UPI)', mr: 'डिजिटल पेमेंट सुरक्षा (UPI)' },
        { en: 'Beginner-friendly explanations', hi: 'सरल स्पष्टीकरण', mr: 'अत्यंत सोपे दैनंदिन स्पष्टीकरण' }
      ],
      action: () => startAssessment('farmer_payment_fraud'),
      cta: { en: 'Try Kisan Safety Drill', hi: 'किसान सुरक्षा अभ्यास', mr: 'शेतकरी सुरक्षा सराव' }
    },
    {
      id: 'business_owner',
      role: {
        en: 'Small Business Owner',
        hi: 'छोटे व्यवसायी व उद्यमी',
        mr: 'लहान व्यावसायिक आणि उद्योजक'
      },
      tag: {
        en: 'Commercial & Asset Guard',
        hi: 'व्यावसायिक एवं भुगतान सुरक्षा',
        mr: 'व्यावसायिक व डेटा संरक्षण'
      },
      icon: Briefcase,
      color: 'from-amber-500/20 to-orange-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30',
      illustrativeNeed: {
        en: '"I need to protect my business accounts, recognize fraudulent payment requests, and understand practical cybersecurity without hiring a dedicated technical team."',
        hi: '"मुझे अपने व्यावसायिक खातों की सुरक्षा करनी है, फर्जी इनवॉइस व भुगतान अनुरोध पहचानना है और बिना किसी आईटी टीम के बुनियादी साइबर सुरक्षा समझनी है।"',
        mr: '"मला माझे व्यावसायिक बँक खाती सुरक्षित ठेवायची आहेत, बनावट पेमेंट विनंत्या ओळखायच्या आहेत आणि स्वतंत्र आयटी टीमशिवाय मूलभूत सायबर सुरक्षा समजून घ्यायची आहे."'
      },
      relevantFeatures: [
        { en: 'Business cybersecurity awareness', hi: 'व्यावसायिक साइबर सुरक्षा', mr: 'व्यावसायिक सायबर सुरक्षा' },
        { en: 'Phishing recognition', hi: 'फिशिंग ईमेल पहचान', mr: 'फिशिंग ईमेल्स ओळखणे' },
        { en: 'Customer data protection fundamentals', hi: 'ग्राहक डेटा सुरक्षा नियम', mr: 'ग्राहक डेटा संरक्षण नियम' },
        { en: 'Online transaction safety', hi: 'सुरक्षित ऑनलाइन लेनदेन', mr: 'सुरक्षित ऑनलाइन व्यवहार' },
        { en: 'Practical business-focused challenges', hi: 'व्यापार-केंद्रित चुनौतियाँ', mr: 'व्यापारी प्रत्यक्ष आव्हाने' }
      ],
      action: () => startAssessment('business_cyber_defense'),
      cta: { en: 'Try Business Defense', hi: 'व्यापार सुरक्षा अभ्यास', mr: 'व्यवसाय सुरक्षा सराव' }
    },
    {
      id: 'corporate_employee',
      role: {
        en: 'Corporate Employee',
        hi: 'कॉर्पोरेट कर्मचारी',
        mr: 'नोकरदार व कॉर्पोरेट कर्मचारी'
      },
      tag: {
        en: 'Workplace & Enterprise Hygiene',
        hi: 'कार्यस्थल और डेटा गोपनीयता',
        mr: 'कामाच्या ठिकाणी डेटा सुरक्षा'
      },
      icon: Building2,
      color: 'from-indigo-500/20 to-purple-500/20 text-indigo-600 dark:text-indigo-400 border-indigo-500/30',
      illustrativeNeed: {
        en: '"I want to recognize workplace phishing attempts, protect sensitive information, and improve my everyday digital security habits."',
        hi: '"मैं ऑफिस में आने वाले फिशिंग ईमेल्स को पहचानना चाहता हूँ, संवेदनशील कंपनी डेटा की रक्षा करना और अपनी सुरक्षा आदतें सुधारना चाहता हूँ।"',
        mr: '"मला कामाच्या ठिकाणी येणारे फिशिंग ईमेल्स अचूक ओळखायचे आहेत, संवेदनशील माहितीचे रक्षण करायचे आहे आणि दैनंदिन सुरक्षा सवयी सुधारायच्या आहेत."'
      },
      relevantFeatures: [
        { en: 'Workplace cybersecurity assessments', hi: 'कार्यस्थल साइबर मूल्यांकन', mr: 'कामाच्या ठिकाणी सायबर मूल्यांकन' },
        { en: 'Social engineering scenarios', hi: 'सोशल इंजीनियरिंग परिदृश्य', mr: 'सोशल इंजिनिअरिंग परिस्थिती' },
        { en: 'Data protection education', hi: 'डेटा वर्गीकरण शिक्षा', mr: 'डेटा वर्गीकरण व सुरक्षा' },
        { en: 'Incident-response simulations', hi: 'इंसिडेंट रिस्पॉन्स सिमुलेशन', mr: 'घटना प्रतिसाद सिमुलेशन' },
        { en: 'Skill improvement tracking', hi: 'कौशल सुधार ट्रैकिंग', mr: 'कौशल्य सुधारणा ट्रॅकिंग' }
      ],
      action: () => startAssessment('corp_workplace_security'),
      cta: { en: 'Try Workplace Scenario', hi: 'वर्कप्लेस सिमुलेशन', mr: 'वर्कप्लेस सुरक्षा सराव' }
    },
    {
      id: 'job_seeker',
      role: {
        en: 'Job Seeker & Candidate',
        hi: 'रोजगार खोजकर्ता',
        mr: 'नोकरी शोधणारे उमेदवार'
      },
      tag: {
        en: 'Interview & Aptitude Prep',
        hi: 'इंटरव्यू व योग्यता तैयारी',
        mr: 'मुलाखत व तांत्रिक क्षमता'
      },
      icon: Search,
      color: 'from-violet-500/20 to-fuchsia-500/20 text-violet-600 dark:text-violet-400 border-violet-500/30',
      illustrativeNeed: {
        en: '"I want to identify my weak areas, improve my aptitude, and practise technical skills in a structured way."',
        hi: '"मैं अपनी कमियों को पहचानना चाहता हूँ, अपनी एप्टीट्यूड सुधारना और संरचित तरीके से तकनीकी कौशल का अभ्यास करना चाहता हूँ।"',
        mr: '"मला माझ्या कमकुवत बाजू ओळखायच्या आहेत, तांत्रिक योग्यता सुधारायची आहे आणि पद्धतशीरपणे कौशल्यांचा सराव करायचा आहे."'
      },
      relevantFeatures: [
        { en: 'Aptitude assessments', hi: 'योग्यता व तार्किक मूल्यांकन', mr: 'अ‍ॅप्टिट्यूड व तार्किक मूल्यांकन' },
        { en: 'Logical reasoning', hi: 'लॉजिकल रीजनिंग', mr: 'लॉजिकल रिझनिंग' },
        { en: 'Technical fundamentals', hi: 'तकनीकी बुनियादी ज्ञान', mr: 'तांत्रिक मूलभूत तत्त्वे' },
        { en: 'Skill-gap analysis', hi: 'कौशल अंतर विश्लेषण', mr: 'कौशल्य गॅप विश्लेषण' },
        { en: 'Personalized learning recommendations', hi: 'व्यक्तिगत अध्ययन सुझाव', mr: 'वैयक्तिक सराव शिफारसी' }
      ],
      action: () => startAssessment('jobseeker_interview_safety'),
      cta: { en: 'Try Job Seeker Drill', hi: 'कैंडिडेट ड्रिल शुरू करें', mr: 'उमेदवार सराव सुरू करा' }
    },
    {
      id: 'general_learner',
      role: {
        en: 'Everyday Smartphone User',
        hi: 'आम स्मार्टफोन उपयोगकर्ता',
        mr: 'दैनंदिन स्मार्टफोन वापरकर्ता'
      },
      tag: {
        en: 'Family & Everyday Safety',
        hi: 'पारिवारिक डिजिटल सुरक्षा',
        mr: 'कौटुंबिक डिजिटल सुरक्षा'
      },
      icon: Smartphone,
      color: 'from-cyan-500/20 to-blue-500/20 text-cyan-600 dark:text-cyan-400 border-cyan-500/30',
      illustrativeNeed: {
        en: '"I want to recognize online scams, protect my privacy, and use digital services more safely without complicated technical language."',
        hi: '"मैं ऑनलाइन स्कैम से बचना चाहता हूँ, अपनी निजता सुरक्षित रखना और जटिल तकनीकी भाषा के बिना सुरक्षित इंटरनेट उपयोग सीखना चाहता हूँ।"',
        mr: '"मला ऑनलाइन फसवणूक टाळायची आहे, वैयक्तिक गोपनीयता जपायची आहे आणि कोणत्याही अवघड तांत्रिक शब्दांशिवाय सुरक्षित राहायचे आहे."'
      },
      relevantFeatures: [
        { en: 'Scam recognition', hi: 'फर्जी कॉल व संदेश पहचान', mr: 'बनावट कॉल व मेसेज ओळखणे' },
        { en: 'Safe browsing', hi: 'सुरक्षित इंटरनेट ब्राउज़िंग', mr: 'सुरक्षित इंटरनेट वापर' },
        { en: 'Privacy awareness', hi: 'गोपनीयता व ऐप अनुमतियाँ', mr: 'गोपनीयता व अ‍ॅप परवानग्या' },
        { en: 'Password security education', hi: 'मजबूत पासवर्ड आदतें', mr: 'सुरक्षित पासवर्ड सवयी' },
        { en: 'Accessible multilingual learning', hi: 'सुलभ बहुभाषी शिक्षा', mr: 'सुलभ बहुभाषिक शिक्षण' }
      ],
      action: () => startAssessment('general_smartphone_safety'),
      cta: { en: 'Try Everyday Safety', hi: 'दैनिक सुरक्षा अभ्यास', mr: 'दैनंदिन सुरक्षा सराव' }
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-in fade-in duration-300">
      {/* Section Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sentinel-900 border border-sentinel-800 text-xs font-semibold text-sky-600 dark:text-sky-400 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-sky-500" />
          <span>
            {language === 'mr'
              ? 'प्रत्यक्ष गरजांवर आधारित रचना'
              : language === 'hi'
              ? 'वास्तविक आवश्यकताओं पर आधारित'
              : 'Built Around Real-World Needs'}
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
          {language === 'mr'
            ? 'प्रत्येकासाठी उपयुक्त डिजिटल सुरक्षा आणि कौशल्ये'
            : language === 'hi'
            ? 'विभिन्न भूमिकाओं के लिए व्यावहारिक डिजिटल कौशल'
            : 'Built Around Real-World Needs'}
        </h2>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          {language === 'mr'
            ? 'डिजिटल कौशल्ये वेगवेगळ्या व्यक्तींसाठी वेगळ्या प्रकारे महत्त्वाची असतात. डिझिसेंटिनेलचे उद्दिष्ट दैनंदिन जीवन आणि कामासाठी शिक्षण व्यावहारिक, सुलभ आणि समर्पक बनवणे आहे.'
            : language === 'hi'
            ? 'डिजिटल कौशल विभिन्न लोगों के लिए अलग-अलग तरह से महत्वपूर्ण हैं। डिजीसेंटिनल का उद्देश्य सीखने को व्यावहारिक, सुलभ और दैनिक जीवन तथा कार्य के लिए प्रासंगिक बनाना है।'
            : 'Digital skills matter differently to different people. DigiSentinel aims to make learning practical, accessible, and relevant to everyday life and work.'}
        </p>

        {/* Mandatory Transparency Disclaimer */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-sentinel-850/80 border border-sentinel-800 text-[11px] text-slate-500 dark:text-slate-400">
          <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>
            {language === 'mr'
              ? 'काल्पनिक वापरकर्ता व्यक्तीचित्रे — संभाव्य गरजांची उदाहरणे, कोणतेही सर्वेक्षण निष्कर्ष नाहीत.'
              : language === 'hi'
              ? 'काल्पनिक उपयोगकर्ता परिदृश्य — संभावित आवश्यकताओं के उदाहरण, कोई वास्तविक सर्वेक्षण निष्कर्ष नहीं।'
              : 'Illustrative user personas — examples of potential user needs, not verified survey findings.'}
          </span>
        </div>
      </div>

      {/* Personas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {personas.map(persona => {
          const Icon = persona.icon;
          return (
            <div
              key={persona.id}
              className="p-6 sm:p-7 rounded-3xl bg-sentinel-900/85 border border-sentinel-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 flex flex-col justify-between shadow-sm hover:shadow-xl group"
            >
              <div className="space-y-5">
                {/* Header Icon + Role */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${persona.color} flex items-center justify-center border shadow-sm group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                        {getLocalized(persona.role)}
                      </h3>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                        {getLocalized(persona.tag)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Illustrative Need Callout */}
                <div className="p-4 rounded-2xl bg-sentinel-850 border border-sentinel-800 text-xs leading-relaxed space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                    {language === 'mr' ? 'उदाहरणात्मक गरज:' : language === 'hi' ? 'उदाहरणात्मक आवश्यकता:' : 'Illustrative Need:'}
                  </span>
                  <p className="italic text-slate-700 dark:text-slate-300">
                    {getLocalized(persona.illustrativeNeed)}
                  </p>
                </div>

                {/* Relevant DigiSentinel Solutions */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block font-mono">
                    {language === 'mr' ? 'डिझिसेंटिनेलचे उपयुक्त फीचर्स:' : language === 'hi' ? 'प्रासंगिक समाधान:' : 'Relevant DigiSentinel Features:'}
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    {persona.relevantFeatures.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{getLocalized(feat)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-6 border-t border-sentinel-800">
                <button
                  onClick={persona.action}
                  className="w-full py-2.5 px-4 rounded-xl bg-sentinel-850 hover:bg-sky-500 dark:hover:bg-sky-500 text-slate-800 dark:text-slate-200 hover:text-white dark:hover:text-white border border-sentinel-800 hover:border-sky-500 font-semibold text-xs flex items-center justify-center gap-2 transition-all duration-200 shadow-sm group-hover:bg-sky-500 group-hover:text-white group-hover:border-sky-500"
                >
                  <span>{getLocalized(persona.cta)}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Explore All CTA Banner */}
      <div className="p-6 rounded-3xl bg-sentinel-900/60 border border-sentinel-800 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-left space-y-0.5">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            {language === 'mr'
              ? 'आपल्या स्वतःच्या गरजेनुसार मूल्यांकन सुरू करायचे आहे?'
              : language === 'hi'
              ? 'अपनी आवश्यकता के अनुसार सीधे अभ्यास शुरू करें?'
              : 'Looking for an assessment tailored to your personal background?'}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {language === 'mr'
              ? 'सर्व डोमेन्स आणि भाषांमध्ये फिल्टर करा किंवा वैयक्तिक ऑनबोर्डिंग वापरा.'
              : language === 'hi'
              ? 'सभी श्रेणियों में फ़िल्टर करें या व्यक्तिगत ऑनबोर्डिंग शुरू करें।'
              : 'Explore the full multi-domain catalog or set your background in the personalization wizard.'}
          </p>
        </div>
        <button
          onClick={() => navigateTo('explore')}
          className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs transition-colors shrink-0 flex items-center gap-2 shadow-lg shadow-sky-500/20"
        >
          <span>
            {language === 'mr' ? 'सर्व मूल्यांकन एक्सप्लोर करा' : language === 'hi' ? 'सभी मूल्यांकन देखें' : 'Explore All Assessments'}
          </span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  );
};
