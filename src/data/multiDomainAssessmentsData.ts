import { SupportedLanguage, UserAudienceCategory } from '../types/user';

export interface LocalizedString {
  en: string;
  hi: string;
  mr: string;
}

export interface AssessmentOption {
  id: string;
  text: LocalizedString;
  isCorrect: boolean;
}

export interface AssessmentQuestion {
  id: string;
  title: LocalizedString;
  scenario?: LocalizedString;
  options: AssessmentOption[];
  explanation: LocalizedString;
  beginnerExplanation?: LocalizedString;
  tip?: LocalizedString;
  competencyTag: string;
}

export interface MultiDomainAssessment {
  id: string;
  audienceCategory: UserAudienceCategory;
  topic: string;
  title: LocalizedString;
  description: LocalizedString;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedMinutes: number;
  xpReward: number;
  skillsCovered: string[];
  disclaimer?: LocalizedString;
  questions: AssessmentQuestion[];
}

export const MULTI_DOMAIN_ASSESSMENTS: MultiDomainAssessment[] = [
  // ==========================================
  // 1. STUDENTS
  // ==========================================
  {
    id: 'student_digital_safety',
    audienceCategory: 'student',
    topic: 'Digital Safety & Social Media',
    title: {
      en: 'Student Cyber Safety & Social Privacy',
      hi: 'विद्यार्थी सायबर सुरक्षा व सोशल मीडिया गोपनीयता',
      mr: 'विद्यार्थी सायबर सुरक्षा आणि सोशल मीडिया गोपनीयता'
    },
    description: {
      en: 'Evaluate your readiness against peer phishing, student portal credential safety, and social media privacy risks.',
      hi: 'सहकारी फिशिंग, विद्यार्थी पोर्टल सुरक्षा आणि सोशल मीडिया गोपनीयता धोक्यांचे मूल्यांकन करा.',
      mr: 'विद्यार्थी पोर्टल लॉगिन सुरक्षितता, सोशल मीडिया गोपनीयता आणि सायबर धोक्यांपासून संरक्षण तपासा.'
    },
    difficulty: 'beginner',
    estimatedMinutes: 6,
    xpReward: 120,
    skillsCovered: ['Social Media Privacy', 'Credential Hygiene', 'Phishing Awareness'],
    questions: [
      {
        id: 'stud_q1',
        title: {
          en: 'You receive an urgent message on Instagram from a classmate asking for a verification code sent to your phone to "recover their account". What should you do?',
          hi: 'तुम्हाला इन्स्टाग्रामवर एका वर्गमित्राकडून मेसेज येतो की "माझे खाते रिकव्हर करण्यासाठी तुमच्या फोनवर आलेला कोड पाठवा". तुम्ही काय कराल?',
          mr: 'तुम्हाला इन्स्टाग्रामवर वर्गमित्राकडून मेसेज येतो की "माझे खाते रिकव्हर करण्यासाठी तुमच्या मोबाईलवर आलेला ओटीपी पाठवा". तुम्ही काय कराल?'
        },
        scenario: {
          en: 'Message: "Hey bro! Instagram asked me to select 2 friends to help unlock my locked account. They just texted you a code, please forward it quickly!"',
          hi: 'संदेश: "मित्रा! इन्स्टाग्रामने माझे लॉक झालेले खाते उघडण्यासाठी मित्रांना कोड पाठवला आहे. तुझ्या मोबाईलवर आलेला कोड त्वरित दे!"',
          mr: 'संदेश: "मित्रा! इन्स्टाग्रामने माझे अकाऊंट अनलॉक करण्यासाठी मित्रांना कोड पाठवला आहे. तुझ्या फोनवर आलेला कोड त्वरित पाठव!"'
        },
        options: [
          {
            id: 'opt_a',
            text: {
              en: 'Send the code immediately because they are your friend.',
              hi: 'तो तुमचा मित्र असल्याने ताबडतोब कोड पाठवा.',
              mr: 'तो आपला मित्र असल्याने ताबडतोब कोड पाठवा.'
            },
            isCorrect: false
          },
          {
            id: 'opt_b',
            text: {
              en: 'Never share the code. Call your friend on phone to verify, as their account might be compromised.',
              hi: 'कधीही कोड शेअर करू नका. मित्राला फोन करून खात्री करा, कारण त्याचे खाते हॅक झालेले असू शकते.',
              mr: 'कधीही कोड शेअर करू नका. मित्राला फोन करून खात्री करा, कारण त्याचे अकाऊंट हॅक झालेले असू शकते.'
            },
            isCorrect: true
          },
          {
            id: 'opt_c',
            text: {
              en: 'Send only half of the code numbers to test them.',
              hi: 'खात्री करण्यासाठी कोडचे अर्धेच आकडे पाठवा.',
              mr: 'खात्री करण्यासाठी फक्त अर्धेच आकडे पाठवा.'
            },
            isCorrect: false
          },
          {
            id: 'opt_d',
            text: {
              en: 'Ignore the message and click the link in the SMS.',
              hi: 'मेसेजकडे दुर्लक्ष करा आणि एसएमएस मधील लिंकवर क्लिक करा.',
              mr: 'मेसेज दुर्लक्षित करा आणि एसएमएसमधील लिंकवर क्लिक करा.'
            },
            isCorrect: false
          }
        ],
        explanation: {
          en: 'This is an account takeover scam. The scammer triggers a password reset on YOUR account and tries to convince you to give them the OTP.',
          hi: 'हा अकाऊंट टेकओव्हर घोटाळा आहे. हॅकर तुमच्या खात्याचा पासवर्ड रीसेट करतो आणि तो ओटीपी तुमच्याकडून मागून घेतो.',
          mr: 'हा अकाऊंट हॅक करण्याचा प्रकार आहे. फसवणूक करणारी व्यक्ती तुमच्या अकाऊंटचा ओटीपी मागून तुमचे अकाऊंट ताब्यात घेण्याचा प्रयत्न करते.'
        },
        tip: {
          en: 'OTPs are secret authentication keys. Never share one-time passcodes with anyone, regardless of who asks.',
          hi: 'ओटीपी गुप्त असतो. कोणीही मागितला तरी तो कधीही कोणालाही सांगू नका.',
          mr: 'ओटीपी (OTP) अत्यंत गुप्त असतो. कोणीही मागितला तरी तो कधीही कोणाशीही शेअर करू नका.'
        },
        competencyTag: 'credential_hygiene'
      },
      {
        id: 'stud_q2',
        title: {
          en: 'When connecting your laptop to public college library Wi-Fi, which practice provides the best defense against eavesdropping?',
          hi: 'कॉलेजच्या किंवा लायब्ररीच्या सार्वजनिक वाय-फाय (Wi-Fi) शी कनेक्ट करताना, सुरक्षित राहण्यासाठी काय सर्वोत्तम आहे?',
          mr: 'कॉलेज किंवा लायब्ररीच्या सार्वजनिक वाय-फायशी (Wi-Fi) लॅपटॉप जोडताना माहिती सुरक्षित ठेवण्यासाठी काय करावे?'
        },
        options: [
          {
            id: 'opt_a',
            text: {
              en: 'Keep Wi-Fi auto-connect enabled everywhere for speed.',
              hi: 'जलद गतीसाठी सर्वत्र ऑटो-कनेक्ट सुरू ठेवा.',
              mr: 'सर्व ठिकाणी ऑटो-कनेक्ट सुरू ठेवा.'
            },
            isCorrect: false
          },
          {
            id: 'opt_b',
            text: {
              en: 'Ensure websites use HTTPS/TLS and avoid entering sensitive passwords on unencrypted networks.',
              hi: 'वेबसाइट्स HTTPS वापरत असल्याची खात्री करा आणि असुरक्षित नेटवर्कवर संवेदनशील पासवर्ड टाकणे टाळा.',
              mr: 'वेबसाइट्स HTTPS वापरत असल्याची खात्री करा आणि असुरक्षित नेटवर्कवर संवेदनशील पासवर्ड टाकणे टाळा.'
            },
            isCorrect: true
          },
          {
            id: 'opt_c',
            text: {
              en: 'Turn off your laptop screen lock.',
              hi: 'लॅपटॉपचा स्क्रीन लॉक बंद करा.',
              mr: 'लॅपटॉपचा स्क्रीन लॉक बंद करा.'
            },
            isCorrect: false
          },
          {
            id: 'opt_d',
            text: {
              en: 'Public Wi-Fi networks are always 100% encrypted by the government.',
              hi: 'सार्वजनिक वाय-फाय नेहमी सुरक्षित असते.',
              mr: 'सार्वजनिक वाय-फाय नेहमी सुरक्षित असते.'
            },
            isCorrect: false
          }
        ],
        explanation: {
          en: 'Public Wi-Fi networks allow attackers on the same network to intercept unencrypted traffic. Always check for the HTTPS padlock and prefer cellular data for bank logins.',
          hi: 'सार्वजनिक वाय-फायवर इतर लोक असुरक्षित डेटा पाहू शकतात. नेहमी HTTPS तपासा.',
          mr: 'सार्वजनिक वाय-फायवर एकाच नेटवर्कवरील इतर व्यक्ती असुरक्षित डेटा पाहू शकतात. नेहमी HTTPS पॅडलॉक तपासा.'
        },
        competencyTag: 'network_defense'
      }
    ]
  },
  {
    id: 'student_logic_reasoning',
    audienceCategory: 'student',
    topic: 'Logic & Problem Solving',
    title: {
      en: 'Logical Reasoning & Algorithmic Thinking',
      hi: 'तार्किक विचार आणि अल्गोरिदम समस्या निवारण',
      mr: 'तार्किक विचार आणि अल्गोरिदम समस्या सोडवणे'
    },
    description: {
      en: 'Test pattern recognition, step-by-step conditional logic, and algorithmic deduction essential for computer science and competitive exams.',
      hi: 'पॅटर्न ओळखणे, पायरी-दर-पायरी तार्किक विचार आणि संगणकीय तर्कशास्त्राची चाचणी घ्या.',
      mr: 'पायरी-दर-पायरी तार्किक विचार, पॅटर्न शोधणे आणि समस्या निवारण कौशल्याची चाचणी.'
    },
    difficulty: 'intermediate',
    estimatedMinutes: 8,
    xpReward: 140,
    skillsCovered: ['Deductive Logic', 'Flow Control', 'Algorithmic Thinking'],
    questions: [
      {
        id: 'stud_logic_q1',
        title: {
          en: 'Consider a condition: IF (User is Authenticated AND Has Admin Role) OR (IP is in Whitelist AND Emergency Bypass Active). When will access be granted?',
          hi: 'अट: IF (User is Authenticated AND Has Admin Role) OR (IP is Whitelisted AND Emergency Bypass Active). प्रवेश केव्हा मिळेल?',
          mr: 'अट: IF (वापरकर्ता पडताळलेला आहे AND अ‍ॅडमिन आहे) OR (आयपी अधिकृत आहे AND इमर्जन्सी बायपास सुरू आहे). परवानगी कधी मिळेल?'
        },
        options: [
          {
            id: 'opt_a',
            text: {
              en: 'Only when all four conditions are simultaneously true.',
              hi: 'जेव्हा चारही अटी एकाच वेळी सत्य असतील.',
              mr: 'जेव्हा चारही अटी एकाच वेळी पूर्ण होतील.'
            },
            isCorrect: false
          },
          {
            id: 'opt_b',
            text: {
              en: 'If the user is logged in as an Admin, regardless of the IP address.',
              hi: 'जर युझर अ‍ॅडमिन म्हणून लॉग इन असेल, तर आयपी काहीही असला तरी.',
              mr: 'जर वापरकर्ता अ‍ॅडमिन म्हणून लॉग इन असेल, तर आयपी काहीही असला तरी.'
            },
            isCorrect: true
          },
          {
            id: 'opt_c',
            text: {
              en: 'Never, because boolean OR requires both sides to be false.',
              hi: 'कधीही नाही, कारण OR साठी दोन्ही बाजू असत्य असाव्या लागतात.',
              mr: 'कधीही नाही, कारण OR साठी दोन्ही बाजू असत्य असाव्या लागतात.'
            },
            isCorrect: false
          },
          {
            id: 'opt_d',
            text: {
              en: 'Only if Emergency Bypass is Active alone without an IP.',
              hi: 'केवळ इमर्जन्सी बायपास सुरू असल्यास आयपी नसतानाही.',
              mr: 'केवळ इमर्जन्सी बायपास सुरू असल्यास आयपी नसतानाही.'
            },
            isCorrect: false
          }
        ],
        explanation: {
          en: 'Because of the OR operator, if the left group (User is Authenticated AND Has Admin Role) is TRUE, the entire statement evaluates to TRUE immediately.',
          hi: 'OR ऑपरेटरमुळे, डावी बाजू (User Authenticated AND Admin Role) सत्य असल्यास संपूर्ण अट त्वरित सत्य ठरते.',
          mr: 'OR ऑपरेटर असल्यामुळे, डावी बाजू सत्य ठरल्यास संपूर्ण अट सत्य ठरते आणि परवानगी मिळते.'
        },
        competencyTag: 'logical_reasoning'
      }
    ]
  },

  // ==========================================
  // 2. FARMERS AND AGRICULTURAL USERS
  // ==========================================
  {
    id: 'farmer_payment_fraud',
    audienceCategory: 'farmer',
    topic: 'Kisan Digital Payments & Safety',
    title: {
      en: 'Kisan Digital Payments & Subsidy Safety',
      hi: 'शेतकरी डिजिटल पेमेंट व सरकारी अनुदान सुरक्षा',
      mr: 'शेतकरी डिजिटल पेमेंट्स आणि अनुदान फसवणूक सुरक्षा'
    },
    description: {
      en: 'Practical guidance for farmers to protect UPI wallets, prevent fake subsidy phone calls, and safely verify agricultural schemes.',
      hi: 'शेतकऱ्यांसाठी UPI सुरक्षितता, बनावट अनुदानाचे फोन कॉल्स ओळखणे आणि योजनांची सुरक्षित खात्री करण्याचे मार्गदर्शन.',
      mr: 'शेतकऱ्यांसाठी UPI सुरक्षितता, बनावट अनुदानाचे फोन कॉल्स ओळखणे आणि कृषी योजनांची योग्य पडताळणी.'
    },
    difficulty: 'beginner',
    estimatedMinutes: 5,
    xpReward: 120,
    skillsCovered: ['UPI PIN Safety', 'Scheme Verification', 'Phone Scam Defense'],
    disclaimer: {
      en: 'Disclaimer: This module provides educational digital awareness only and is not official agricultural or financial advice. Always verify government schemes on official .gov.in portals.',
      hi: 'अस्वीकरण: हे मॉड्यूल केवळ डिजिटल सुरक्षेच्या शैक्षणिक मार्गदर्शनासाठी आहे. सरकारी योजनांची पडताळणी अधिकृत .gov.in संकेतस्थळावर करा.',
      mr: 'अस्वीकरण: हे मॉड्यूल केवळ डिजिटल सुरक्षेच्या शैक्षणिक मार्गदर्शनासाठी आहे. शासकीय योजनांची अधिकृत माहिती फक्त .gov.in संकेतस्थळांवरून घ्या.'
    },
    questions: [
      {
        id: 'farm_q1',
        title: {
          en: 'You receive a phone call claiming: "Rs 6,000 PM-Kisan subsidy is credited to your bank. To receive the money into your account, please enter your UPI PIN right now." What should you know?',
          hi: 'तुम्हाला फोन येतो: "तुमच्या खात्यात पीएम किसान योजनेचे ६,००० रुपये जमा होणार आहेत. पैसे मिळवण्यासाठी तुमचा UPI PIN टाका." याबद्दल सत्य काय आहे?',
          mr: 'तुम्हाला फोन येतो: "तुमच्या खात्यात पीएम किसानचे ६,००० रुपये जमा होणार आहेत. पैसे मिळवण्यासाठी तुमचा UPI PIN टाका." याबद्दल सत्य काय आहे?'
        },
        scenario: {
          en: 'Caller says they are calling directly from the Agriculture Department and sends a payment request link via SMS.',
          hi: 'कॉलर म्हणतो की तो कृषी विभागातून बोलत आहे आणि एसएमएसवर पेमेंट रिक्वेस्ट पाठवतो.',
          mr: 'कॉलर स्वतःला कृषी खात्याचा अधिकारी सांगतो आणि एसएमएसवर पेमेंट रिक्वेस्ट पाठवतो.'
        },
        options: [
          {
            id: 'opt_a',
            text: {
              en: 'Entering your UPI PIN is always required to receive money into your bank.',
              hi: 'खात्यात पैसे मिळवण्यासाठी नेहमी UPI PIN टाकणे गरजेचे असते.',
              mr: 'खात्यात पैसे मिळवण्यासाठी नेहमी UPI PIN टाकणे गरजेचे असते.'
            },
            isCorrect: false
          },
          {
            id: 'opt_b',
            text: {
              en: 'UPI PIN is ONLY required to SEND money. Receiving money never requires typing your PIN. This is a fraud.',
              hi: 'UPI PIN केवळ पैसे पाठवण्यासाठीच लागतो. पैसे स्वीकारण्यासाठी PIN ची गरज नसते. हा निव्वळ घोटाळा आहे.',
              mr: 'UPI PIN केवळ पैसे पाठवण्यासाठीच लागतो. पैसे खात्यात येण्यासाठी PIN ची कधीही गरज नसते. ही फसवणूक आहे.'
            },
            isCorrect: true
          },
          {
            id: 'opt_c',
            text: {
              en: 'Tell them your ATM card number and expiry date instead.',
              hi: 'त्याऐवजी त्यांना तुमचा एटीएम कार्ड क्रमांक आणि एक्सपायरी तारीख सांगा.',
              mr: 'त्याऐवजी त्यांना तुमचा एटीएम कार्ड क्रमांक आणि एक्सपायरी तारीख सांगा.'
            },
            isCorrect: false
          },
          {
            id: 'opt_d',
            text: {
              en: 'Share your Aadhaar OTP with the caller.',
              hi: 'कॉलरला आधार ओटीपी सांगा.',
              mr: 'कॉलरला आधार ओटीपी सांगा.'
            },
            isCorrect: false
          }
        ],
        explanation: {
          en: 'Golden Rule of Digital Payments: You NEVER enter your UPI PIN to receive money. Entering your PIN approves money leaving your account.',
          hi: 'डिजिटल पेमेंटचा सुवर्ण नियम: पैसे मिळवण्यासाठी कधीही UPI PIN टाकू नका. पिन टाकल्यास तुमच्या खात्यातून पैसे कापले जातात.',
          mr: 'डिजिटल पेमेंटचा महत्त्वाचा नियम: पैसे मिळवण्यासाठी कधीही UPI PIN टाकावा लागत नाही. पिन टाकला तर तुमच्या खात्यातून पैसे कापले जातात.'
        },
        tip: {
          en: 'Official government DBT subsidies are sent directly to bank accounts through Aadhaar linking without any phone calls or PIN prompts.',
          hi: 'अधिकृत सरकारी अनुदान थेट बँक खात्यात जमा होते, त्यासाठी कोणताही फोन किंवा पिन लागत नाही.',
          mr: 'शासकीय अनुदान थेट बँक खात्यात जमा होते, त्यासाठी कोणताही फोन येत नाही किंवा पिन टाकावा लागत नाही.'
        },
        competencyTag: 'financial_safety'
      },
      {
        id: 'farm_q2',
        title: {
          en: 'A stranger on WhatsApp offers to buy your entire crop produce at double the market price, but demands a "Rs 500 registration fee QR code" first. How do you respond?',
          hi: 'व्हॉट्सॲपवर एक अनोळखी व्यक्ती तुमचा माल दुप्पट दराने खरेदी करण्याची ऑफर देते, पण प्रथम ₹५०० रजिस्ट्रेशन फी भरण्यासाठी QR कोड पाठवते. तुम्ही काय कराल?',
          mr: 'व्हॉट्सअ‍ॅपवर एक अनोळखी व्यापारी तुमचा शेतमाल दुप्पट भावाने घेण्याचे आमिष दाखवतो, पण आधी ₹५०० नोंदणी फी भरण्यासाठी QR कोड स्कॅन करायला सांगतो. तुम्ही काय कराल?'
        },
        options: [
          {
            id: 'opt_a',
            text: {
              en: 'Pay Rs 500 quickly because the promised crop price is very high.',
              hi: 'दुप्पट भाव मिळत असल्याने ताबडतोब ₹५०० भरा.',
              mr: 'दुप्पट भाव मिळत असल्याने लगेच ₹५०० भरा.'
            },
            isCorrect: false
          },
          {
            id: 'opt_b',
            text: {
              en: 'Refuse advance payment. Verify the buyer through registered APMC mandis or known local trade channels.',
              hi: 'आगाऊ पैसे देणे नाकारा. अधिकृत कृषी उत्पन्न बाजार समिती (APMC) किंवा ओळखीच्या व्यापाऱ्यांमार्फत खात्री करा.',
              mr: 'आगाऊ पैसे देणे नाकारा. अधिकृत कृषी उत्पन्न बाजार समिती (APMC) किंवा ओळखीच्या व्यापाऱ्यांमार्फत खात्री करा.'
            },
            isCorrect: true
          },
          {
            id: 'opt_c',
            text: {
              en: 'Send your bank passbook photo and signature photo on WhatsApp.',
              hi: 'व्हॉट्सॲपवर बँक पासबुक आणि स्वाक्षरीचा फोटो पाठवा.',
              mr: 'व्हॉट्सअ‍ॅपवर बँक पासबुक आणि सहीचा फोटो पाठवा.'
            },
            isCorrect: false
          },
          {
            id: 'opt_d',
            text: {
              en: 'Forward the message to 10 WhatsApp farmer groups.',
              hi: 'हा मेसेज १० शेतकरी ग्रुप्सवर फॉरवर्ड करा.',
              mr: 'हा संदेश इतर १० शेतकरी ग्रुपवर फॉरवर्ड करा.'
            },
            isCorrect: false
          }
        ],
        explanation: {
          en: 'Advance fee scam: Scammers promise unrealistic crop prices to lure farmers into sending advance registration fees or scanning malicious QR codes.',
          hi: 'ही आगाऊ शुल्काची फसवणूक आहे. अवास्तव नफ्याचे आमिष दाखवून शेतकऱ्यांकडून नोंदणी शुल्काच्या नावाखाली पैसे उकळले जातात.',
          mr: 'ही आगाऊ पैशांची फसवणूक आहे. अव्वाच्या सव्वा भावाचे आमिष दाखवून शेतकऱ्यांकडून नोंदणी फीच्या नावाखाली पैसे उकळले जातात.'
        },
        competencyTag: 'marketplace_fraud'
      }
    ]
  },

  // ==========================================
  // 3. BUSINESS OWNERS AND ENTREPRENEURS
  // ==========================================
  {
    id: 'business_cyber_defense',
    audienceCategory: 'business_owner',
    topic: 'Small Business Cybersecurity',
    title: {
      en: 'SME Data Protection & Payment Guard',
      hi: 'लघु उद्योग ग्राहक डेटा संरक्षण व पेमेंट सुरक्षा',
      mr: 'लहान व्यवसाय डेटा संरक्षण आणि पेमेंट सुरक्षा'
    },
    description: {
      en: 'Defend your store, customer records, and invoice payments against business email compromise (BEC), fake QR codes, and data theft.',
      hi: 'तुमचे दुकान, ग्राहक नोंदी आणि इनव्हॉइस पेमेंट्सना बिझनेस ईमेल कॉम्प्रमाईज (BEC) आणि बनावट QR कोडपासून सुरक्षित ठेवा.',
      mr: 'तुमचे दुकान, ग्राहक डेटा आणि इनव्हॉईस पेमेंट बिझनेस ईमेल घोटाळे व खोट्या QR कोडपासून सुरक्षित ठेवा.'
    },
    difficulty: 'intermediate',
    estimatedMinutes: 7,
    xpReward: 150,
    skillsCovered: ['Invoice Fraud Detection', 'Customer Data Privacy', 'Payment Terminal Safety'],
    questions: [
      {
        id: 'biz_q1',
        title: {
          en: 'You receive an email from an existing regular supplier stating: "Our bank account has changed due to auditing. Please pay this month\'s ₹85,000 invoice to our new bank details attached." What is the mandatory protocol?',
          hi: 'तुमच्या नेहमीच्या सप्लायरकडून ईमेल येतो: "ऑडिटमुळे आमचे बँक खाते बदलले आहे. कृपया या महिन्याचे ₹८५,००० चे बिल सोबत जोडलेल्या नवीन खात्यात भरा." तुम्ही काय केले पाहिजे?',
          mr: 'तुमच्या नेहमीच्या सप्लायरकडून ईमेल येतो: "ऑडिटमुळे आमचे बँक खाते बदलले आहे. या महिन्याचे ₹८५,००० चे बिल नवीन बँक खात्यात भरा." अशा वेळी काय खबरदारी घ्याल?'
        },
        options: [
          {
            id: 'opt_a',
            text: {
              en: 'Pay to the new account right away to avoid late delivery fees.',
              hi: 'विलंब शुल्क टाळण्यासाठी नवीन खात्यात त्वरित पैसे भरा.',
              mr: 'वेळ वाचवण्यासाठी नवीन खात्यात लगेच पैसे ट्रान्सफर करा.'
            },
            isCorrect: false
          },
          {
            id: 'opt_b',
            text: {
              en: 'Call the supplier using a previously known trusted phone number (out-of-band verification) to confirm before sending any money.',
              hi: 'पैसे पाठवण्यापूर्वी सप्लायरच्या जुन्या अधिकृत फोन नंबरवर कॉल करून खात्री करा (Out-of-band verification).',
              mr: 'पैसे पाठवण्यापूर्वी सप्लायरच्या जुन्या खात्रीशीर फोन नंबरवर कॉल करून नवीन खात्याची खातरजमा करा.'
            },
            isCorrect: true
          },
          {
            id: 'opt_c',
            text: {
              en: 'Reply directly to the email asking "Is this really your account?".',
              hi: 'त्याच ईमेलला रिप्लाय देऊन विचारा "हे खरोखर तुमचेच खाते आहे का?".',
              mr: 'त्याच ईमेलला रिप्लाय देऊन विचारा "हे खरोखर तुमचेच खाते आहे का?".'
            },
            isCorrect: false
          },
          {
            id: 'opt_d',
            text: {
              en: 'Ask an employee to pay via personal credit card.',
              hi: 'कर्मचाऱ्याला त्याच्या वैयक्तिक क्रेडिट कार्डने भरण्यास सांगा.',
              mr: 'कर्मचाऱ्याला त्याच्या वैयक्तिक क्रेडिट कार्डने भरण्यास सांगा.'
            },
            isCorrect: false
          }
        ],
        explanation: {
          en: 'This is a classic Business Email Compromise (BEC) attack. Attackers compromise vendor mailboxes or spoof domains to redirect payments. Always confirm bank changes via a secondary trusted channel.',
          hi: 'हा बिझनेस ईमेल कॉम्प्रमाईज (BEC) चा प्रकार आहे. हॅकर्स व्हेंडरचा ईमेल हॅक करून नवीन बँक तपशील पाठवतात. नेहमी फोन करून खात्री करा.',
          mr: 'हा बिझनेस ईमेल कॉम्प्रमाईज (BEC) प्रकारचा मोठा हल्ला आहे. हॅकर्स व्हेंडरचा ईमेल हॅक करून पैसे भलत्याच खात्यात वळवतात. नेहमी फोनवरून खात्री करा.'
        },
        tip: {
          en: 'Establish a two-person signoff rule for all vendor bank account modification requests.',
          hi: 'बँक खाते बदलण्यासाठी नेहमी दोन व्यक्तींची पडताळणी आवश्यक करणारा नियम बनवा.',
          mr: 'बँक खाते बदलाच्या विनंतीसाठी नेहमी अधिकृत पडताळणीची पद्धत ठेवा.'
        },
        competencyTag: 'bec_defense'
      },
      {
        id: 'biz_q2',
        title: {
          en: 'At the end of the business day, what physical inspection should a retail merchant perform on shop counter payment QR code stands?',
          hi: 'दिवसाच्या शेवटी, दुकानदाराने आपल्या काऊंटरवरील UPI QR कोड स्टँडची कोणती प्रत्यक्ष तपासणी केली पाहिजे?',
          mr: 'दुकान बंद करताना व्यापाऱ्याने आपल्या दुकानातील UPI QR कोड स्टँडची कोणती प्रत्यक्ष तपासणी केली पाहिजे?'
        },
        options: [
          {
            id: 'opt_a',
            text: {
              en: 'Check if a malicious scam sticker has been pasted over the original merchant QR code.',
              hi: 'मूळ QR कोडवर कोणा भामट्याने आपला बनावट QR कोड स्टिकर चिकटवला नाही ना, हे तपासा.',
              mr: 'मूळ QR कोडवर कोणी दुसरा बनावट QR कोड स्टिकर चिकटवला नाही ना, हे तपासा.'
            },
            isCorrect: true
          },
          {
            id: 'opt_b',
            text: {
              en: 'Wash the QR code stand with water and soap.',
              hi: 'QR कोड स्टँड साबणाने धुवून ठेवा.',
              mr: 'QR कोड स्टँड साबणाने धुवून ठेवा.'
            },
            isCorrect: false
          },
          {
            id: 'opt_c',
            text: {
              en: 'Take a photo and post it on social media.',
              hi: 'फोटो काढून सोशल मीडियावर टाका.',
              mr: 'फोटो काढून सोशल मीडियावर टाका.'
            },
            isCorrect: false
          },
          {
            id: 'opt_d',
            text: {
              en: 'Nothing, payment QR codes cannot be tampered with.',
              hi: 'काहीही करण्याची गरज नाही, QR कोड बदलता येत नाही.',
              mr: 'काहीही करण्याची गरज नाही, QR कोडमध्ये छेडछाड करता येत नाही.'
            },
            isCorrect: false
          }
        ],
        explanation: {
          en: 'QR code sticker swapping (quishing/physical tampering) is common in busy retail shops. Fraudsters paste their own QR over the store owner\'s code so customer payments divert to the fraudster.',
          hi: 'गर्दीच्या दुकानांमध्ये फसवणूक करणारे स्वतःचा QR कोड मूळ कोडवर चिकटवतात, ज्यामुळे ग्राहकांचे पैसे भामट्याच्या खात्यात जातात.',
          mr: 'गर्दीच्या दुकानांमध्ये फसवणूक करणारे स्वतःचा QR कोड मूळ कोडवर चिकटवून ग्राहकांचे पैसे स्वतःच्या खात्यात वळवतात.'
        },
        competencyTag: 'physical_security'
      }
    ]
  },

  // ==========================================
  // 4. CORPORATE EMPLOYEES AND WORKING PROFESSIONALS
  // ==========================================
  {
    id: 'corp_workplace_security',
    audienceCategory: 'corporate_employee',
    topic: 'Workplace Cybersecurity & Data Privacy',
    title: {
      en: 'Workplace Data Protection & Spear Phishing',
      hi: 'कामाच्या ठिकाणी डेटा संरक्षण व स्पीयर फिशिंग बचाव',
      mr: 'कामाच्या ठिकाणी डेटा संरक्षण आणि फिशिंग प्रतिबंध'
    },
    description: {
      en: 'Test your incident reporting reflexes, endpoint security protocols, and resilience against AI-generated spear-phishing lures.',
      hi: 'कामाच्या ठिकाणी सुरक्षेचे नियम, फिशिंग ईमेल ओळखणे आणि संवेदनशील डेटा हाताळणीचे कौशल्य तपासा.',
      mr: 'कामाच्या ठिकाणी संवेदनशील डेटा हाताळणे, फिशिंग ईमेल्स ओळखणे आणि सुरक्षा नियमांचे पालन तपासणे.'
    },
    difficulty: 'intermediate',
    estimatedMinutes: 6,
    xpReward: 140,
    skillsCovered: ['Data Classification', 'Spear Phishing Analysis', 'Incident Triage'],
    questions: [
      {
        id: 'corp_q1',
        title: {
          en: 'You receive an urgent email seemingly from your HR Director with the subject "Mandatory Employee Appraisal Review 2026.docx.exe". What is the immediate correct action?',
          hi: 'तुम्हाला तुमच्या एचआर संचालकांकडून "Mandatory Employee Appraisal Review 2026.docx.exe" या विषयाचा तातडीचा ईमेल येतो. तुम्ही त्वरित काय करावे?',
          mr: 'तुम्हाला कंपनीच्या एचआरकडून "Mandatory Employee Appraisal Review 2026.docx.exe" नावाची फाईल असलेला तातडीचा ईमेल येतो. काय कराल?'
        },
        options: [
          {
            id: 'opt_a',
            text: {
              en: 'Double-click the attachment to view your rating.',
              hi: 'आपले रेटिंग पाहण्यासाठी फाईलवर डबल-क्लिक करा.',
              mr: 'आपले रेटिंग पाहण्यासाठी फाईलवर डबल-क्लिक करा.'
            },
            isCorrect: false
          },
          {
            id: 'opt_b',
            text: {
              en: 'Notice the double extension (.docx.exe executable malware trick), do not open it, and report to the IT Security/SOC team.',
              hi: 'डबल एक्स्टेंशन (.docx.exe मॅलवेअर) ओळखा, फाईल उघडू नका आणि त्वरित आयटी सुरक्षा (SOC) टीमला कळवा.',
              mr: 'डबल एक्स्टेंशन (.docx.exe व्हायरस/मॅलवेअर) ओळखा, फाईल अजिबात उघडू नका आणि कंपनीच्या आयटी सिक्युरिटी टीमला कळवा.'
            },
            isCorrect: true
          },
          {
            id: 'opt_c',
            text: {
              en: 'Forward the email to all colleagues to warn them before reporting.',
              hi: 'इतर कर्मचाऱ्यांना सावध करण्यासाठी हा ईमेल सर्वांना फॉरवर्ड करा.',
              mr: 'इतर सहकाऱ्यांना सावध करण्यासाठी हा ईमेल सर्वांना फॉरवर्ड करा.'
            },
            isCorrect: false
          },
          {
            id: 'opt_d',
            text: {
              en: 'Reply to HR asking if they made a typo in the file name.',
              hi: 'एचआरला रिप्लाय देऊन विचारा की नावात काही चूक झाली आहे का.',
              mr: 'एचआरला रिप्लाय देऊन विचारा की नावात चूक झाली आहे का.'
            },
            isCorrect: false
          }
        ],
        explanation: {
          en: 'Double extensions like ".docx.exe" disguise executable malware as innocent documents. Never forward malware to colleagues; report it directly to Security.',
          hi: '.docx.exe सारखे दुहेरी एक्स्टेंशन मॅलवेअर लपवण्यासाठी वापरले जातात. त्वरित सुरक्षा टीमला कळवा.',
          mr: '.docx.exe सारखे दुहेरी एक्स्टेंशन व्हायरस लपवण्यासाठी वापरले जातात. असे ईमेल्स फॉरवर्ड न करता थेट सिक्युरिटी टीमला रिपोर्ट करावेत.'
        },
        competencyTag: 'malware_defense'
      }
    ]
  },

  // ==========================================
  // 5. JOB SEEKERS AND CAREER BUILDERS
  // ==========================================
  {
    id: 'jobseeker_interview_safety',
    audienceCategory: 'job_seeker',
    topic: 'Career Safety & Interview Verification',
    title: {
      en: 'Job Portal Privacy & Fake Offer Detection',
      hi: 'नोकरी पोर्टल गोपनीयता व बनावट जॉब ऑफर ओळख',
      mr: 'नोकरी शोध गोपनीयता आणि बनावट जॉब ऑफर्स ओळखणे'
    },
    description: {
      en: 'Identify recruitment scams, protect your PAN and Aadhaar identity, and evaluate legitimate employment credentials.',
      hi: 'नोकरीच्या नावाखाली होणारी फसवणूक ओळखा, पॅन व आधार कार्डची गोपनीयता जपा आणि खरी नोकरी ऑफर ओळखा.',
      mr: 'नोकरीच्या नावाखाली होणारी फसवणूक ओळखा, पॅन व आधार कार्ड सुरक्षित ठेवा आणि बनावट ऑफर्सपासून सावध राहा.'
    },
    difficulty: 'beginner',
    estimatedMinutes: 5,
    xpReward: 120,
    skillsCovered: ['Recruitment Scam Detection', 'Identity Theft Prevention', 'Offer Letter Verification'],
    questions: [
      {
        id: 'job_q1',
        title: {
          en: 'You receive an unsolicited Telegram message offering a "Work from home rating YouTube videos for ₹4,500/day", but requiring a ₹1,500 "refundable security deposit" to start. What is this?',
          hi: 'तुम्हाला टेलिग्रामवर मेसेज येतो: "घरी बसून यूट्यूब व्हिडिओ लाईक करून दररोज ₹४,५०० कमवा, सुरू करण्यासाठी ₹१,५०० सुरक्षा ठेव जमा करा". हे काय आहे?',
          mr: 'तुम्हाला टेलिग्रामवर मेसेज येतो: "घरी बसून यूट्यूब व्हिडिओ लाईक करा आणि रोज ₹४,५०० कमवा, पण कामासाठी ₹१,५०० अनामत रक्कम भरा". हे काय आहे?'
        },
        options: [
          {
            id: 'opt_a',
            text: {
              en: 'A standard recruitment requirement for freelance digital marketing.',
              hi: 'डिजिटल मार्केटिंगसाठी सामान्य नोकरीची प्रक्रिया.',
              mr: 'डिजिटल मार्केटिंगसाठी सामान्य नोकरीची प्रक्रिया.'
            },
            isCorrect: false
          },
          {
            id: 'opt_b',
            text: {
              en: 'A classic "Task Scam". Legitimate employers NEVER charge job seekers money to give them work.',
              hi: 'हा टास्क स्कॅम (Task Scam) आहे. कोणतीही खरी कंपनी नोकरी देण्यासाठी उमेदवाराकडून पैसे मागत नाही.',
              mr: 'हा प्रसिद्ध टास्क स्कॅम (Task Scam) आहे. कोणतीही खरी कंपनी नोकरी किंवा कामासाठी पैसे मागत नाही.'
            },
            isCorrect: true
          },
          {
            id: 'opt_c',
            text: {
              en: 'Pay ₹1,500 because ₹4,500 daily is a guaranteed high return.',
              hi: 'रोज ₹४,५०० मिळणार असल्याने ₹१,५०० लगेच भरा.',
              mr: 'रोज ₹४,५०० मिळणार असल्याने ₹१,५०० लगेच भरा.'
            },
            isCorrect: false
          },
          {
            id: 'opt_d',
            text: {
              en: 'Negotiate the deposit down to ₹500.',
              hi: 'डिपॉझिट ₹५०० पर्यंत कमी करण्यासाठी बोला.',
              mr: 'डिपॉझिट ₹५०० पर्यंत कमी करण्यासाठी बोला.'
            },
            isCorrect: false
          }
        ],
        explanation: {
          en: 'Part-time video liking/reviewing scams operate on Telegram/WhatsApp. They let you withdraw ₹200 initially to build trust, then lock larger sums behind "prepaid tasks".',
          hi: 'हा टेलिग्राम टास्क स्कॅम आहे. विश्वास संपादन करण्यासाठी सुरुवातीला थोडे पैसे देतात आणि नंतर हजारो रुपये हडप करतात.',
          mr: 'हा टेलिग्राम टास्क स्कॅम आहे. विश्वास जिंकण्यासाठी आधी थोडे पैसे देतात आणि नंतर मोठी रक्कम हडप करतात. कधीही पैसे भरू नका.'
        },
        competencyTag: 'recruitment_safety'
      }
    ]
  },

  // ==========================================
  // 6. GENERAL PUBLIC AND BEGINNERS
  // ==========================================
  {
    id: 'general_smartphone_safety',
    audienceCategory: 'general_learner',
    topic: 'Everyday Smartphone & Family Digital Safety',
    title: {
      en: 'Everyday Smartphone & UPI Safety',
      hi: 'दैनंदिन स्मार्टफोन व UPI पेमेंट सुरक्षितता',
      mr: 'दैनंदिन स्मार्टफोन आणि UPI पेमेंट सुरक्षितता'
    },
    description: {
      en: 'Essential digital self-defense for everyday smartphone users: electric bill SMS scams, malicious screen-sharing apps, and OTP defense.',
      hi: 'स्मार्टफोन वापरकर्त्यांसाठी मूलभूत सुरक्षा: वीज बिल एसएमएस घोटाळे, एनीडेस्क स्क्रीन-शेअरिंग ॲप्स आणि सुरक्षित डिजिटल व्यवहार.',
      mr: 'स्मार्टफोन वापरकर्त्यांसाठी मूलभूत सुरक्षा: वीज बिल मेसेज घोटाळे, स्क्रीन-शेअरिंग ॲप्सचे धोके आणि सुरक्षित व्यवहार.'
    },
    difficulty: 'beginner',
    estimatedMinutes: 5,
    xpReward: 110,
    skillsCovered: ['Electricity Bill Scam Defense', 'Remote Access App Awareness', 'Two-Factor Authentication'],
    questions: [
      {
        id: 'gen_q1',
        title: {
          en: 'You receive an SMS: "Dear consumer, your electricity power will be disconnected tonight at 9:30 PM because previous bill was not updated. Call electricity officer immediately at 98xxxxxx." What is this?',
          hi: 'तुम्हाला एसएमएस येतो: "तुमचे वीज बिल भरलेले नसल्याने आज रात्री ९:३० वाजता वीज खंडित केली जाईल. त्वरित या नंबरवर संपर्क करा: ९८xxxxxx". हे काय आहे?',
          mr: 'तुम्हाला मेसेज येतो: "तुमचे वीज बिल भरलेले नसल्याने आज रात्री ९:३० वाजता वीज पुरवठा खंडित केला जाईल. ताबडतोब या नंबरवर फोन करा: ९८xxxxxx". हे काय आहे?'
        },
        options: [
          {
            id: 'opt_a',
            text: {
              en: 'A genuine alert; call the number immediately and download whatever app they tell you.',
              hi: 'हा खरा संदेश आहे; ताबडतोब फोन करा आणि ते सांगतील ते ॲप डाऊनलोड करा.',
              mr: 'हा खरा मेसेज आहे; त्वरित फोन करा आणि ते सांगतील ते ॲप डाऊनलोड करा.'
            },
            isCorrect: false
          },
          {
            id: 'opt_b',
            text: {
              en: 'A widespread electricity scam designed to install screen-sharing software (like AnyDesk) or steal bank credentials. Ignore and verify on your official power utility app.',
              hi: 'हा वीज बिलाच्या नावाखाली होणारा सायबर घोटाळा आहे. घाबरू नका, नंबरवर कॉल करू नका आणि अधिकृत वीज कंपनीच्या ॲपवर बिल तपासा.',
              mr: 'हा वीज बिलाच्या नावाखाली होणारा सायबर घोटाळा आहे. अशा नंबरवर फोन करू नका आणि अधिकृत वीज वितरण कंपनीच्या ॲपवर माहिती तपासा.'
            },
            isCorrect: true
          },
          {
            id: 'opt_c',
            text: {
              en: 'Send ₹10 to the mobile number on Google Pay to test the connection.',
              hi: 'खात्री करण्यासाठी त्या नंबरवर गुगल पे वरून ₹१० पाठवा.',
              mr: 'खात्री करण्यासाठी त्या नंबरवर फोन पे वरून ₹१० पाठवा.'
            },
            isCorrect: false
          },
          {
            id: 'opt_d',
            text: {
              en: 'Turn off your house electricity meter immediately.',
              hi: 'घरातील विजेचे मुख्य मीटर लगेच बंद करा.',
              mr: 'घरातील विजेचे मीटर लगेच बंद करा.'
            },
            isCorrect: false
          }
        ],
        explanation: {
          en: 'Electricity utility companies never send personal mobile numbers for disconnection notices. Scammers use fear of disconnection to trick victims into installing remote control apps.',
          hi: 'अधिकृत वीज कंपन्या कधीही वैयक्तिक मोबाईल नंबरवरून असा इशारा देत नाहीत. भीती दाखवून एनीडेस्क सारखे ॲप्स डाऊनलोड करायला लावतात.',
          mr: 'अधिकृत वीज कंपन्या कधीही वैयक्तिक मोबाईल नंबर देऊन त्वरित वीज कापण्याची भीती दाखवत नाहीत. हे फसवणुकीचे प्रकार असतात.'
        },
        tip: {
          en: 'Never download remote-sharing applications like AnyDesk, RustDesk, or TeamViewer at the instruction of an unknown caller.',
          hi: 'अनोळखी व्यक्तीच्या सांगण्यावरून फोनमध्ये एनीडेस्क किंवा स्क्रीन-शेअरिंग ॲप कधीही घेऊ नका.',
          mr: 'अनोळखी व्यक्तीच्या सांगण्यावरून मोबाईलमध्ये AnyDesk किंवा स्क्रीन शेअर करणारे कोणतेही ॲप डाऊनलोड करू नका.'
        },
        competencyTag: 'scam_defense'
      }
    ]
  }
];

export const getAssessmentsForAudience = (category?: UserAudienceCategory): MultiDomainAssessment[] => {
  if (!category || category === 'custom') {
    return MULTI_DOMAIN_ASSESSMENTS;
  }
  return MULTI_DOMAIN_ASSESSMENTS.filter(a => a.audienceCategory === category);
};

export const getAssessmentById = (id: string): MultiDomainAssessment | undefined => {
  return MULTI_DOMAIN_ASSESSMENTS.find(a => a.id === id);
};
