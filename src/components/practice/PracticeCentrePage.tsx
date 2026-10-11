import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Lightbulb
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PRACTICE_LESSONS, MicroLesson } from '../../data/practiceLessons';

export const PracticeCentrePage: React.FC = () => {
  const { addXP } = useApp();
  const [activeLesson, setActiveLesson] = useState<MicroLesson | null>(null);
  const [selectedExerciseOption, setSelectedExerciseOption] = useState<string | null>(null);
  const [exerciseSubmitted, setExerciseSubmitted] = useState(false);

  const handleSelectOption = (optId: string) => {
    if (exerciseSubmitted) return;
    setSelectedExerciseOption(optId);
  };

  const handleSubmitExercise = () => {
    if (!selectedExerciseOption || !activeLesson) return;
    setExerciseSubmitted(true);
    const chosen = activeLesson.interactiveExercise.options.find(o => o.id === selectedExerciseOption);
    if (chosen?.isCorrect) {
      addXP(75);
    }
  };

  const handleCloseModal = () => {
    setActiveLesson(null);
    setSelectedExerciseOption(null);
    setExerciseSubmitted(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sentinel-900 border border-sentinel-800 text-xs font-semibold text-emerald-400">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Targeted Remediation & Micro-Drills</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Learning & Practice Centre
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
          Address specific weaknesses discovered in your diagnostic. Practice rapid micro-lessons and answer fresh scenario variants without having to redo an entire track.
        </p>
      </div>

      {/* Lesson Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PRACTICE_LESSONS.map(lesson => (
          <div
            key={lesson.id}
            className="p-6 rounded-3xl bg-sentinel-900/70 border border-sentinel-800 hover:border-slate-700 transition flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-bold">
                  {lesson.domainId.replace('_', ' ')}
                </span>
                <div className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
                  <Clock className="w-3 h-3" />
                  <span>{lesson.durationMinutes} min read</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-white">{lesson.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {lesson.summary}
              </p>

              {/* Core Takeaway Rule Callout */}
              <div className="p-3 rounded-xl bg-sentinel-950 border border-sentinel-850 text-xs text-amber-300 font-mono">
                {lesson.keyRule}
              </div>
            </div>

            <button
              onClick={() => {
                setActiveLesson(lesson);
                setSelectedExerciseOption(null);
                setExerciseSubmitted(false);
              }}
              className="w-full py-2.5 rounded-xl bg-electric-600 hover:bg-electric-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition"
            >
              <span>Launch Micro-Lesson & Drill</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Interactive Drill Modal */}
      {activeLesson && (
        <div className="fixed inset-0 z-50 bg-sentinel-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-3xl bg-sentinel-900 border border-sentinel-700 p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-sentinel-800 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                  Interactive Practice Drill
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">{activeLesson.title}</h3>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            {/* Drill Scenario Prompt */}
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-bold">
                Verification Challenge:
              </span>
              <p className="text-sm text-slate-200 bg-sentinel-950 p-4 rounded-xl border border-sentinel-850 leading-relaxed">
                {activeLesson.interactiveExercise.question}
              </p>

              {activeLesson.interactiveExercise.codeOrSnippet && (
                <pre className="p-3 bg-sentinel-950 border border-sentinel-850 rounded-xl font-mono text-xs text-slate-300 overflow-x-auto">
                  {activeLesson.interactiveExercise.codeOrSnippet}
                </pre>
              )}
            </div>

            {/* Interactive Options */}
            <div className="space-y-3">
              {activeLesson.interactiveExercise.options.map(opt => {
                const isSelected = selectedExerciseOption === opt.id;
                let optClasses = 'border-sentinel-800 bg-sentinel-950 hover:border-slate-700 text-slate-300';

                if (exerciseSubmitted) {
                  if (opt.isCorrect) {
                    optClasses = 'border-emerald-500/80 bg-emerald-950/20 text-emerald-200';
                  } else if (isSelected && !opt.isCorrect) {
                    optClasses = 'border-rose-500/80 bg-rose-950/20 text-rose-200';
                  } else {
                    optClasses = 'opacity-40 border-sentinel-850 text-slate-600';
                  }
                } else if (isSelected) {
                  optClasses = 'border-electric-500 bg-electric-950/30 text-white';
                }

                return (
                  <div
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`p-3.5 rounded-xl border text-xs cursor-pointer transition flex items-start gap-3 ${optClasses}`}
                  >
                    <div className="mt-0.5">
                      <div className={`w-3.5 h-3.5 rounded-full border ${isSelected ? 'bg-electric-500 border-electric-400' : 'border-slate-600'}`} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="font-medium">{opt.label}</p>
                      {exerciseSubmitted && (
                        <p className="text-[11px] text-slate-400 pt-1 font-mono">{opt.explanation}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal Bottom Controls */}
            <div className="pt-3 border-t border-sentinel-800 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500">
                {exerciseSubmitted ? '+75 XP Awarded' : 'Select your answer'}
              </span>

              {!exerciseSubmitted ? (
                <button
                  onClick={handleSubmitExercise}
                  disabled={!selectedExerciseOption}
                  className="px-6 py-2.5 rounded-xl bg-electric-600 hover:bg-electric-500 disabled:opacity-40 text-white font-semibold text-xs transition"
                >
                  Verify My Answer
                </button>
              ) : (
                <button
                  onClick={handleCloseModal}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition"
                >
                  Done
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
