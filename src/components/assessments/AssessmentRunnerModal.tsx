import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ShieldAlert,
  Award,
  Sparkles,
  Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getAssessmentById, AssessmentQuestion } from '../../data/multiDomainAssessmentsData';

export const AssessmentRunnerModal: React.FC = () => {
  const {
    activeAssessmentId,
    closeAssessment,
    language,
    addXP,
    triggerCelebration,
    navigateTo
  } = useApp();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!activeAssessmentId) return null;

  const assessment = getAssessmentById(activeAssessmentId);
  if (!assessment) return null;

  const currentQuestion: AssessmentQuestion | undefined = assessment.questions[currentQuestionIndex];
  const totalQuestions = assessment.questions.length;

  const getLocalized = (obj?: { en: string; hi: string; mr: string }): string => {
    if (!obj) return '';
    return obj[language] || obj.en;
  };

  const handleSelectOption = (optionId: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionId(optionId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOptionId || !currentQuestion) return;
    setIsAnswerSubmitted(true);

    const chosenOption = currentQuestion.options.find(o => o.id === selectedOptionId);
    if (chosenOption?.isCorrect) {
      setCorrectAnswersCount(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOptionId(null);
      setIsAnswerSubmitted(false);
    } else {
      // Completed!
      setIsCompleted(true);
      addXP(assessment.xpReward);
      triggerCelebration();
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setCorrectAnswersCount(0);
    setIsCompleted(false);
  };

  const handleFinish = () => {
    closeAssessment();
    handleReset();
  };

  const chosenOption = currentQuestion?.options.find(o => o.id === selectedOptionId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-sentinel-900 border border-sentinel-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-sentinel-800 flex items-center justify-between bg-sentinel-900/90 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-600 dark:text-sky-400 font-bold">
              <Award className="w-5 h-5 text-sky-500" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                {assessment.topic}
              </div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                {getLocalized(assessment.title)}
              </h2>
            </div>
          </div>
          <button
            onClick={handleFinish}
            className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl hover:bg-sentinel-850 transition-colors"
            aria-label="Close assessment"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {!isCompleted ? (
            <>
              {/* Progress and Question Counter */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span>
                    {language === 'mr'
                      ? `प्रश्न ${currentQuestionIndex + 1} पैकी ${totalQuestions}`
                      : language === 'hi'
                      ? `प्रश्न ${currentQuestionIndex + 1} का ${totalQuestions}`
                      : `Question ${currentQuestionIndex + 1} of ${totalQuestions}`}
                  </span>
                  <span>+{Math.round(assessment.xpReward / totalQuestions)} XP</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-sky-400 to-indigo-500 h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${((currentQuestionIndex + (isAnswerSubmitted ? 1 : 0.5)) / totalQuestions) * 100}%`
                    }}
                  />
                </div>
              </div>

              {/* Disclaimer if present */}
              {assessment.disclaimer && (
                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2.5 text-xs text-amber-300/90 leading-relaxed">
                  <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>{getLocalized(assessment.disclaimer)}</span>
                </div>
              )}

              {/* Scenario Context (if any) */}
              {currentQuestion?.scenario && (
                <div className="p-4 rounded-2xl bg-sentinel-850 border border-sentinel-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  <span className="font-semibold text-sky-600 dark:text-sky-400 block mb-1">
                    {language === 'mr' ? 'परिस्थिती संदर्भ:' : language === 'hi' ? 'स्थिति संदर्भ:' : 'Scenario:'}
                  </span>
                  {getLocalized(currentQuestion.scenario)}
                </div>
              )}

              {/* Question Text */}
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white leading-snug">
                {getLocalized(currentQuestion?.title)}
              </h3>

              {/* Options */}
              <div className="space-y-3 pt-1">
                {currentQuestion?.options.map((option, idx) => {
                  const isSelected = selectedOptionId === option.id;
                  let optionClass =
                    'border-sentinel-800 bg-sentinel-850/60 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-700 hover:bg-sentinel-850';

                  if (isSelected && !isAnswerSubmitted) {
                    optionClass = 'border-sky-500 bg-sky-500/10 text-sky-700 dark:text-white font-medium ring-1 ring-sky-500/40';
                  } else if (isAnswerSubmitted) {
                    if (option.isCorrect) {
                      optionClass = 'border-emerald-500/60 bg-emerald-500/10 text-emerald-700 dark:text-emerald-200 font-medium';
                    } else if (isSelected && !option.isCorrect) {
                      optionClass = 'border-rose-500/60 bg-rose-500/10 text-rose-700 dark:text-rose-200';
                    } else {
                      optionClass = 'border-sentinel-800/60 bg-sentinel-850/20 text-slate-400 dark:text-slate-500 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={option.id}
                      onClick={() => handleSelectOption(option.id)}
                      disabled={isAnswerSubmitted}
                      className={`w-full p-4 rounded-2xl border text-left text-sm transition-all flex items-start gap-3 relative ${optionClass}`}
                    >
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 border ${
                          isSelected
                            ? 'bg-sky-500 border-sky-400 text-white'
                            : 'bg-sentinel-800 border-sentinel-700 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className="flex-1 leading-relaxed">
                        {getLocalized(option.text)}
                      </span>
                      {isAnswerSubmitted && option.isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                      )}
                      {isAnswerSubmitted && isSelected && !option.isCorrect && (
                        <AlertCircle className="w-5 h-5 text-rose-500 dark:text-rose-400 flex-shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback and Explanation Box */}
              {isAnswerSubmitted && currentQuestion && (
                <div
                  className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-2 animate-in fade-in duration-200 ${
                    chosenOption?.isCorrect
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-200'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm">
                    {chosenOption?.isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>
                          {language === 'mr' ? 'अचूक उत्तर! चांगला विचार.' : language === 'hi' ? 'सही उत्तर! बहुत बढ़िया.' : 'Correct Analysis!'}
                        </span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4 text-rose-400" />
                        <span>
                          {language === 'mr' ? 'चूक झाली. सुरक्षित पद्धत समजून घ्या:' : language === 'hi' ? 'गलत उत्तर। सुरक्षित तरीका समझें:' : 'Vulnerable Choice. Learn why:'}
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-slate-300">
                    {getLocalized(currentQuestion.explanation)}
                  </p>
                  {currentQuestion.tip && (
                    <div className="pt-2 border-t border-slate-700/50 flex items-start gap-2 text-slate-300">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-amber-400">
                          {language === 'mr' ? 'महत्त्वाची टीप: ' : language === 'hi' ? 'महत्वपूर्ण सुझाव: ' : 'Safety Tip: '}
                        </strong>
                        {getLocalized(currentQuestion.tip)}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            /* Results Screen */
            <div className="py-8 text-center space-y-6">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white mx-auto shadow-xl shadow-sky-500/20">
                <Award className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white font-display">
                  {language === 'mr' ? 'मूल्यांकन पूर्ण झाले!' : language === 'hi' ? 'मूल्यांकन पूरा हुआ!' : 'Assessment Complete!'}
                </h3>
                <p className="text-sm text-slate-400 max-w-md mx-auto">
                  {language === 'mr'
                    ? `तुम्ही ${totalQuestions} पैकी ${correctAnswersCount} प्रश्नांची अचूक उत्तरे दिली आहेत.`
                    : language === 'hi'
                    ? `आपने ${totalQuestions} में से ${correctAnswersCount} प्रश्नों के सही उत्तर दिए हैं।`
                    : `You answered ${correctAnswersCount} of ${totalQuestions} questions correctly.`}
                </p>
              </div>

              {/* Score Badges */}
              <div className="flex items-center justify-center gap-4">
                <div className="px-5 py-3 rounded-2xl bg-sentinel-950 border border-sentinel-800">
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {language === 'mr' ? 'अचूकता' : language === 'hi' ? 'सटीकता' : 'Score'}
                  </div>
                  <div className="text-xl font-bold text-emerald-500 dark:text-emerald-400">
                    {Math.round((correctAnswersCount / totalQuestions) * 100)}%
                  </div>
                </div>
                <div className="px-5 py-3 rounded-2xl bg-sentinel-950 border border-sentinel-800">
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {language === 'mr' ? 'मिळालेले XP' : language === 'hi' ? 'प्राप्त XP' : 'XP Earned'}
                  </div>
                  <div className="text-xl font-bold text-blue-600 dark:text-sky-400">
                    +{assessment.xpReward} XP
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 border-t border-sentinel-800 bg-sentinel-900/90 flex items-center justify-between">
          {!isCompleted ? (
            <>
              <button
                onClick={handleFinish}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                {language === 'mr' ? 'बाहेर पडा' : language === 'hi' ? 'बाहर निकलें' : 'Exit'}
              </button>

              {!isAnswerSubmitted ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={!selectedOptionId}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md ${
                    selectedOptionId
                      ? 'bg-sky-500 hover:bg-sky-400 text-white shadow-sky-500/20'
                      : 'bg-sentinel-850 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {language === 'mr' ? 'उत्तर सबमिट करा' : language === 'hi' ? 'उत्तर सबमिट करें' : 'Submit Answer'}
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white transition-all shadow-md flex items-center gap-2"
                >
                  <span>
                    {currentQuestionIndex < totalQuestions - 1
                      ? language === 'mr'
                        ? 'पुढील प्रश्न'
                        : language === 'hi'
                        ? 'अगला प्रश्न'
                        : 'Next Question'
                      : language === 'mr'
                      ? 'निकाल पहा'
                      : language === 'hi'
                      ? 'परिणाम देखें'
                      : 'View Results'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </>
          ) : (
            <div className="w-full flex items-center justify-end gap-3">
              <button
                onClick={handleReset}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-sentinel-850 border border-sentinel-800 text-slate-800 dark:text-slate-200 hover:bg-sentinel-800 transition-colors"
              >
                {language === 'mr' ? 'पुन्हा प्रयत्न करा' : language === 'hi' ? 'पुनः प्रयास करें' : 'Retake Assessment'}
              </button>
              <button
                onClick={handleFinish}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-colors shadow-md shadow-blue-500/20"
              >
                {language === 'mr' ? 'पूर्ण झाले' : language === 'hi' ? 'पूरा हुआ' : 'Done'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
