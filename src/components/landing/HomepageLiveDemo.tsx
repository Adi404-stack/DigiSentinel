import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';

interface DemoQuestion {
  id: string;
  category: string;
  scenario: string;
  evidenceSnippet?: {
    type: 'email' | 'code' | 'sms';
    content: string;
  };
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

const DEMO_QUESTIONS: DemoQuestion[] = [
  {
    id: 'demo_q1',
    category: 'Phishing Detection',
    scenario: 'You receive an urgent message requesting you to verify your university credentials within 2 hours or access will be revoked.',
    evidenceSnippet: {
      type: 'email',
      content: `From: Security Helpdesk <admin-notice@campus-portal-verify.net>
To: student@campus.edu
Subject: URGENT: Mandatory MFA Re-Validation Required (Action within 2h)
Link: https://campus-portal-verify.net/auth/login?redirect=campus.edu`
    },
    question: 'What is the most definitive indicator that this communication is deceptive?',
    options: [
      {
        id: 'q1_a',
        text: 'The email was sent to your student address.',
        isCorrect: false,
        explanation: 'Incorrect. Legitimate announcements also reach your student email. Target address alone is not an indicator.'
      },
      {
        id: 'q1_b',
        text: 'The sender domain is "campus-portal-verify.net", not the official "campus.edu" domain.',
        isCorrect: true,
        explanation: 'Correct! Attackers routinely register lookalike domains like "campus-portal-verify.net" to spoof internal departments.'
      },
      {
        id: 'q1_c',
        text: 'The email mentions Multi-Factor Authentication.',
        isCorrect: false,
        explanation: 'Incorrect. MFA itself is an authentic security technology; attackers weaponize the term to create urgency.'
      }
    ]
  },
  {
    id: 'demo_q2',
    category: 'Digital Payment Safety',
    scenario: 'A stranger on an online secondhand portal says they transferred ₹3,000 for your books and sends a receipt with a green tick. Your bank app shows zero balance change. They ask you to "scan their QR code to receive the payment".',
    evidenceSnippet: {
      type: 'sms',
      content: `Screenshot provided by buyer:
"UPI Transfer Successful: ₹3,000.00 to seller@bank"
"To accept funds, please scan buyer collect barcode."`
    },
    question: 'How does UPI protocol actually function when receiving money?',
    options: [
      {
        id: 'q2_a',
        text: 'Scanning a QR code or entering your UPI PIN is never required to receive money.',
        isCorrect: true,
        explanation: 'Correct! In standard UPI architecture, receiving funds is strictly credit-only. Entering your PIN or scanning a collect QR authorizes funds to leave your account.'
      },
      {
        id: 'q2_b',
        text: 'You must scan the QR code within 5 minutes to release held funds.',
        isCorrect: false,
        explanation: 'Critical Error! This is the primary mechanism of QR fraud. Scanning a QR code authorizes a debit from your account.'
      },
      {
        id: 'q2_c',
        text: 'Entering your 6-digit PIN confirms your identity to the sender’s bank.',
        isCorrect: false,
        explanation: 'Critical Error! Your UPI PIN is strictly for authorizing debits from your bank. It is never used for identity verification.'
      }
    ]
  },
  {
    id: 'demo_q3',
    category: 'Secure Architecture Basics',
    scenario: 'A web application accepts a user-provided username and constructs a database query directly using string concatenation.',
    evidenceSnippet: {
      type: 'code',
      content: `// Backend Endpoint:
const query = "SELECT * FROM users WHERE username = '" + req.body.username + "'";
db.execute(query);`
    },
    question: 'Why is this pattern considered fundamentally insecure?',
    options: [
      {
        id: 'q3_a',
        text: 'It allows SQL Injection because malicious input can alter the SQL syntax structure.',
        isCorrect: true,
        explanation: 'Correct! Directly concatenating unsanitized inputs into SQL commands lets attackers inject syntax (e.g. "\' OR 1=1 --") to bypass authentication or extract records.'
      },
      {
        id: 'q3_b',
        text: 'String concatenation makes the database query run too slowly.',
        isCorrect: false,
        explanation: 'Incorrect. While string formatting has minor overhead, the core critical issue is arbitrary code/query execution.'
      },
      {
        id: 'q3_c',
        text: 'JavaScript cannot execute queries against relational databases.',
        isCorrect: false,
        explanation: 'Incorrect. Modern Node.js drivers routinely interact with relational databases. The vulnerability is unparameterized input.'
      }
    ]
  }
];

interface HomepageLiveDemoProps {
  onStartFullAssessment?: () => void;
}

export const HomepageLiveDemo: React.FC<HomepageLiveDemoProps> = ({ onStartFullAssessment }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const question = DEMO_QUESTIONS[currentStep];
  const selectedOptionId = selectedAnswers[question.id];
  const selectedOption = question.options.find(o => o.id === selectedOptionId);

  const handleSelect = (optId: string) => {
    if (showExplanation) return;
    setSelectedAnswers(prev => ({ ...prev, [question.id]: optId }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentStep < DEMO_QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentStep(0);
    setShowExplanation(false);
    setIsCompleted(false);
  };

  const calculateScore = () => {
    let correct = 0;
    DEMO_QUESTIONS.forEach(q => {
      const chosenId = selectedAnswers[q.id];
      const opt = q.options.find(o => o.id === chosenId);
      if (opt?.isCorrect) correct++;
    });
    return {
      correct,
      total: DEMO_QUESTIONS.length,
      percentage: Math.round((correct / DEMO_QUESTIONS.length) * 100)
    };
  };

  const scoreData = calculateScore();

  return (
    <div className="w-full max-w-3xl mx-auto rounded-3xl bg-sentinel-900/80 border border-sentinel-800 p-6 sm:p-8 backdrop-blur-md shadow-card">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-sentinel-800 text-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="font-mono text-white font-bold uppercase tracking-wider">
            Interactive Sample Diagnostic
          </span>
          <span className="text-[11px] font-mono text-slate-400 px-2 py-0.5 rounded bg-sentinel-950 border border-sentinel-800">
            No Sign-in Required
          </span>
        </div>
        {!isCompleted && (
          <span className="font-mono text-cyan-400">
            Question {currentStep + 1} of {DEMO_QUESTIONS.length}
          </span>
        )}
      </div>

      {!isCompleted ? (
        <div className="space-y-6 pt-6">
          {/* Progress Indicator */}
          <div className="w-full bg-sentinel-950 rounded-full h-1.5 overflow-hidden border border-sentinel-800">
            <div
              className="bg-gradient-to-r from-electric-500 to-cyan-400 h-1.5 transition-all duration-300"
              style={{ width: `${((currentStep + 1) / DEMO_QUESTIONS.length) * 100}%` }}
            />
          </div>

          {/* Scenario & Category */}
          <div className="space-y-3">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
              Track: {question.category}
            </span>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
              {question.scenario}
            </p>
          </div>

          {/* Evidence Snippet */}
          {question.evidenceSnippet && (
            <div className="p-4 rounded-2xl bg-sentinel-950 border border-sentinel-800 font-mono text-xs text-slate-300 overflow-x-auto whitespace-pre leading-relaxed">
              <div className="text-[10px] text-slate-500 uppercase tracking-widest pb-1 border-b border-sentinel-850 mb-2">
                Simulated Evidence Inspector
              </div>
              {question.evidenceSnippet.content}
            </div>
          )}

          {/* Question Text */}
          <div className="pt-2">
            <h4 className="text-sm font-semibold text-white font-display">
              {question.question}
            </h4>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map(option => {
              const isSelected = selectedOptionId === option.id;
              let optionStyle = 'border-sentinel-800 bg-sentinel-950/70 hover:border-slate-600 text-slate-300';

              if (showExplanation) {
                if (option.isCorrect) {
                  optionStyle = 'border-emerald-500/70 bg-emerald-950/30 text-emerald-200';
                } else if (isSelected && !option.isCorrect) {
                  optionStyle = 'border-rose-500/70 bg-rose-950/30 text-rose-200';
                } else {
                  optionStyle = 'border-sentinel-850 bg-sentinel-950/40 text-slate-500 opacity-60';
                }
              } else if (isSelected) {
                optionStyle = 'border-electric-500 bg-electric-950/30 text-white';
              }

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  disabled={showExplanation}
                  className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm transition-all duration-200 flex items-start justify-between gap-3 ${optionStyle}`}
                >
                  <span>{option.text}</span>
                  {showExplanation && (
                    <span className="shrink-0 mt-0.5">
                      {option.isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : isSelected ? (
                        <XCircle className="w-4 h-4 text-rose-400" />
                      ) : null}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Immediate Explanation Feedback */}
          {showExplanation && selectedOption && (
            <div className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-2 animate-fadeIn ${
              selectedOption.isCorrect
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
            }`}>
              <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px]">
                {selectedOption.isCorrect ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Evaluation: Sound Technical Reasoning</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                    <span>Evaluation: Critical Vulnerability Overlooked</span>
                  </>
                )}
              </div>
              <p>{selectedOption.explanation}</p>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-5 py-2 rounded-xl bg-electric-600 hover:bg-electric-500 text-white font-semibold text-xs flex items-center gap-2 transition"
                >
                  <span>{currentStep < DEMO_QUESTIONS.length - 1 ? 'Next Scenario' : 'View Demonstration Results'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Demonstration Results View */
        <div className="space-y-6 pt-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Sample Diagnostic Completed</span>
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              Demonstration Score: {scoreData.percentage}%
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
              You answered <span className="text-white font-bold">{scoreData.correct}</span> of <span className="text-white font-bold">{scoreData.total}</span> diagnostic scenarios correctly.
            </p>
          </div>

          {/* Educational Recommendation Callout */}
          <div className="p-5 rounded-2xl bg-sentinel-950 border border-sentinel-800 text-left space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>Targeted Skill Recommendation</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {scoreData.percentage === 100
                ? 'Strong foundational security instincts! You successfully spotted synthetic domain spoofing, protected UPI PIN boundaries, and understood code injection. Dive into full multi-step incident missions to test advanced triage.'
                : 'Key insight: Real-world threats frequently leverage subtle domain lookalikes and social urgency to bypass technical suspicion. We recommend completing the full adaptive assessment to identify your complete skill profile.'}
            </p>
            <div className="text-[11px] font-mono text-slate-500 pt-1 border-t border-sentinel-850">
              Note: This 3-question preview is an illustrative demonstration and does not constitute a comprehensive assessment.
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={onStartFullAssessment}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-electric-600 hover:bg-electric-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-electric-600/30 transition"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start Full Skill Radar Diagnostic</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleRestart}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-sentinel-950 hover:bg-sentinel-850 border border-sentinel-800 text-slate-300 font-medium text-xs flex items-center justify-center gap-2 transition"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span>Retry Sample Questions</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
