import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { UserProfile, SupportedLanguage } from '../types/user';
import { Competency, AssessmentRubric } from '../types/skills';
import { ChallengeSubmission, DiagnosticChallenge, DiagnosticResult } from '../types/assessment';
import { MissionId, MissionAttempt } from '../types/missions';
import { DIAGNOSTIC_CHALLENGES } from '../data/diagnosticTasks';
import { MISSIONS } from '../data/missionsData';
import { StorageService } from '../services/storageService';
import { ScoringEngine } from '../services/scoringEngine';
import { AdaptiveEngine } from '../services/adaptiveEngine';
import { TRANSLATIONS } from '../data/translations';

export type AppPage =
  | 'landing'
  | 'discovery'
  | 'radar'
  | 'radar_results'
  | 'missions'
  | 'mission_workspace'
  | 'practice'
  | 'dashboard'
  | 'portfolio'
  | 'profile';

interface AppContextType {
  currentPage: AppPage;
  navigateTo: (page: AppPage, options?: { missionId?: MissionId; directQuery?: string }) => void;
  profile: UserProfile;
  competencies: Competency[];
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string) => string;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  
  // Diagnostic State
  diagnosticChallenges: DiagnosticChallenge[];
  currentChallengeIndex: number;
  diagnosticSubmissions: ChallengeSubmission[];
  diagnosticResult: DiagnosticResult | null;
  submitChallengeAnswer: (selectedOptionId: string, explanation?: string, hintsUsed?: number) => void;
  nextChallenge: () => void;
  resetDiagnostic: () => void;

  // Missions State
  activeMissionId: MissionId | null;
  activeMissionAttempt: MissionAttempt | null;
  missionAttempts: MissionAttempt[];
  startMission: (missionId: MissionId, isRetest?: boolean) => void;
  completeMissionTask: (taskId: string, score: number, feedback: string) => void;
  finalizeMission: (rubric: AssessmentRubric, evidenceNotes: string[]) => void;

  // Actions
  addXP: (amount: number) => void;
  resetAllDemoData: () => void;
  triggerCelebration: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<AppPage>('landing');
  const [profile, setProfile] = useState<UserProfile>(() => StorageService.getProfile());
  const [competencies, setCompetencies] = useState<Competency[]>(() => StorageService.getCompetencies());
  const [activeMissionId, setActiveMissionId] = useState<MissionId | null>(null);
  const [activeMissionAttempt, setActiveMissionAttempt] = useState<MissionAttempt | null>(null);
  const [missionAttempts, setMissionAttempts] = useState<MissionAttempt[]>(() => StorageService.getMissionAttempts());

  // Diagnostic state
  const [diagnosticChallenges, setDiagnosticChallenges] = useState<DiagnosticChallenge[]>(DIAGNOSTIC_CHALLENGES);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(() => StorageService.getActiveDiagnosticIndex());
  const [diagnosticSubmissions, setDiagnosticSubmissions] = useState<ChallengeSubmission[]>(() => StorageService.getDiagnosticSubmissions());
  const [diagnosticResult, setDiagnosticResult] = useState<DiagnosticResult | null>(() => StorageService.getDiagnosticResult());

  // Listen to profile updates
  useEffect(() => {
    StorageService.saveProfile(profile);
  }, [profile]);

  useEffect(() => {
    StorageService.saveCompetencies(competencies);
  }, [competencies]);

  useEffect(() => {
    StorageService.saveDiagnosticSubmissions(diagnosticSubmissions);
    StorageService.saveActiveDiagnosticIndex(currentChallengeIndex);
  }, [diagnosticSubmissions, currentChallengeIndex]);

  useEffect(() => {
    if (diagnosticResult) {
      StorageService.saveDiagnosticResult(diagnosticResult);
    }
  }, [diagnosticResult]);

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 65,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#3B82F6', '#8B5CF6', '#06B6D4', '#10B981']
      });
    } catch (e) {
      // Ignore if confetti is unavailable
    }
  };

  const addXP = (amount: number) => {
    setProfile(prev => {
      const newXp = prev.xp + amount;
      const newLevel = Math.floor(newXp / 300) + 1;
      return {
        ...prev,
        xp: newXp,
        level: newLevel
      };
    });
  };

  const setLanguage = (lang: SupportedLanguage) => {
    setProfile(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        language: lang
      }
    }));
  };

  const toggleTheme = () => {
    setProfile(prev => {
      const newTheme = prev.preferences.theme === 'dark' ? 'light' : 'dark';
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return {
        ...prev,
        preferences: {
          ...prev.preferences,
          theme: newTheme
        }
      };
    });
  };

  const t = (key: string): string => {
    const lang = profile.preferences.language || 'en';
    return TRANSLATIONS[lang]?.[key] || TRANSLATIONS.en[key] || key;
  };

  const navigateTo = (page: AppPage, options?: { missionId?: MissionId; directQuery?: string }) => {
    let targetPage = page;
    if (options?.missionId) {
      setActiveMissionId(options.missionId);
      startMission(options.missionId);
      if (page === 'missions') {
        targetPage = 'mission_workspace';
      }
    }
    setCurrentPage(targetPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Submit answer for the active challenge
  const submitChallengeAnswer = (selectedOptionId: string, explanation?: string, hintsUsed: number = 0) => {
    const challenge = diagnosticChallenges[currentChallengeIndex];
    if (!challenge) return;

    const selectedOption = challenge.options.find(o => o.id === selectedOptionId);
    const isCorrect = !!selectedOption?.isCorrect;
    const baseScore = isCorrect ? 100 : 0;
    const hintPenalty = hintsUsed * 15;
    const scoreEarned = Math.max(0, baseScore - hintPenalty);

    const submission: ChallengeSubmission = {
      challengeId: challenge.id,
      selectedOptionId,
      userExplanation: explanation,
      hintsUsedCount: hintsUsed,
      timeSpentSeconds: 45,
      isCorrect,
      scoreEarned,
      submittedAt: new Date().toISOString()
    };

    const newSubmissions = [...diagnosticSubmissions.filter(s => s.challengeId !== challenge.id), submission];
    setDiagnosticSubmissions(newSubmissions);

    // Update competency score
    setCompetencies(prev => prev.map(comp => {
      if (comp.id === challenge.competencyId) {
        const newAssessed = comp.assessedTasksCount + 1;
        const newScore = Math.round((comp.score * comp.assessedTasksCount + scoreEarned) / newAssessed);
        return {
          ...comp,
          score: newScore,
          assessedTasksCount: newAssessed,
          evidenceStatus: isCorrect ? (newScore >= 80 ? 'demonstrated' : 'developing') : 'needs_practice',
          lastAssessedAt: new Date().toISOString()
        };
      }
      return comp;
    }));

    if (isCorrect) {
      addXP(40);
    }
  };

  const nextChallenge = () => {
    const lastSub = diagnosticSubmissions[diagnosticSubmissions.length - 1];
    const { nextChallenge: branchedChallenge } = AdaptiveEngine.getNextChallenge(
      currentChallengeIndex,
      lastSub,
      diagnosticChallenges
    );

    if (branchedChallenge && !diagnosticChallenges.some(c => c.id === branchedChallenge.id)) {
      // Injected adaptive branch task!
      const updatedList = [...diagnosticChallenges];
      updatedList.splice(currentChallengeIndex + 1, 0, branchedChallenge);
      setDiagnosticChallenges(updatedList);
      setCurrentChallengeIndex(prev => prev + 1);
      return;
    }

    if (currentChallengeIndex < diagnosticChallenges.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
    } else {
      // Finished all diagnostic tasks! Generate results
      const results = ScoringEngine.evaluateDiagnostic(diagnosticSubmissions);
      setDiagnosticResult(results);
      addXP(150);
      triggerCelebration();
      setCurrentPage('radar_results');
    }
  };

  const resetDiagnostic = () => {
    setDiagnosticChallenges(DIAGNOSTIC_CHALLENGES);
    setCurrentChallengeIndex(0);
    setDiagnosticSubmissions([]);
    setDiagnosticResult(null);
    StorageService.saveDiagnosticSubmissions([]);
    StorageService.saveActiveDiagnosticIndex(0);
  };

  const startMission = (missionId: MissionId, isRetest: boolean = false) => {
    const missionDef = MISSIONS.find(m => m.id === missionId);
    if (!missionDef) return;

    setActiveMissionId(missionId);
    const newAttempt: MissionAttempt = {
      id: `attempt_${missionId}_${Date.now()}`,
      missionId,
      startedAt: new Date().toISOString(),
      status: 'in_progress',
      currentStepIndex: 0,
      rubric: {
        accuracy: 100,
        evidenceReasoning: 100,
        independence: 100,
        efficiency: 100,
        riskAwareness: 100,
        overallScore: 100,
        criticalErrors: [],
        feedbackNotes: []
      },
      evidenceNotes: [],
      isRetest
    };
    setActiveMissionAttempt(newAttempt);
    StorageService.saveMissionAttempt(newAttempt);
  };

  const completeMissionTask = (taskId: string, score: number, feedback: string) => {
    if (!activeMissionAttempt) return;
    setActiveMissionAttempt(prev => {
      if (!prev) return null;
      const updated: MissionAttempt = {
        ...prev,
        currentStepIndex: prev.currentStepIndex + 1,
        evidenceNotes: [...prev.evidenceNotes, feedback]
      };
      StorageService.saveMissionAttempt(updated);
      return updated;
    });
    addXP(50);
  };

  const finalizeMission = (rubric: AssessmentRubric, evidenceNotes: string[]) => {
    if (!activeMissionAttempt || !activeMissionId) return;

    const missionDef = MISSIONS.find(m => m.id === activeMissionId);
    if (!missionDef) return;

    const completedAttempt: MissionAttempt = {
      ...activeMissionAttempt,
      status: 'completed',
      completedAt: new Date().toISOString(),
      rubric,
      evidenceNotes
    };

    setMissionAttempts(prev => {
      const filtered = prev.filter(a => a.id !== completedAttempt.id);
      return [...filtered, completedAttempt];
    });

    // Add portfolio entry
    const portfolioEntry = {
      id: `port_${Date.now()}`,
      missionId: activeMissionId,
      missionTitle: missionDef.title,
      role: missionDef.role,
      completedAt: new Date().toISOString(),
      overallScore: rubric.overallScore,
      rubric,
      evidenceSummary: evidenceNotes.join(' '),
      skillsVerified: missionDef.skillsTested,
      certificateHash: `DS-${new Date().getFullYear()}-${activeMissionId.toUpperCase().slice(0, 4)}-${Math.floor(10000 + Math.random() * 90000)}`,
      attemptNumber: (missionAttempts.filter(a => a.missionId === activeMissionId).length) + 1
    };

    setProfile(prev => ({
      ...prev,
      portfolio: [portfolioEntry, ...prev.portfolio]
    }));

    addXP(missionDef.xpReward);
    triggerCelebration();
  };

  const resetAllDemoData = () => {
    StorageService.resetToCleanState();
    setProfile(StorageService.getProfile());
    setCompetencies(StorageService.getCompetencies());
    resetDiagnostic();
    setActiveMissionAttempt(null);
    setActiveMissionId(null);
    setMissionAttempts([]);
    setCurrentPage('landing');
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        navigateTo,
        profile,
        competencies,
        language: profile.preferences.language,
        setLanguage,
        t,
        theme: profile.preferences.theme,
        toggleTheme,
        diagnosticChallenges,
        currentChallengeIndex,
        diagnosticSubmissions,
        diagnosticResult,
        submitChallengeAnswer,
        nextChallenge,
        resetDiagnostic,
        activeMissionId,
        activeMissionAttempt,
        missionAttempts,
        startMission,
        completeMissionTask,
        finalizeMission,
        addXP,
        resetAllDemoData,
        triggerCelebration
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
