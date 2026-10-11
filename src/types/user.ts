import { AssessmentRubric } from './skills';
import { MissionId } from './missions';

export type SupportedLanguage = 'en' | 'hi' | 'mr';

export interface PortfolioEntry {
  id: string;
  missionId: MissionId;
  missionTitle: string;
  role: string;
  completedAt: string;
  overallScore: number;
  rubric: AssessmentRubric;
  evidenceSummary: string;
  skillsVerified: string[];
  certificateHash: string;
  attemptNumber: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'radar' | 'fraud' | 'cyber' | 'dev' | 'sre' | 'mastery';
  unlockedAt?: string;
  xpValue: number;
}

export interface UserPreferences {
  language: SupportedLanguage;
  reducedMotion: boolean;
  theme: 'dark' | 'light';
  isSimulatedMode: boolean; // clearly distinguishes live simulated lab from external production
  soundEffects: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarSeed: string;
  level: number;
  xp: number;
  currentStreakDays: number;
  longestStreakDays: number;
  joinedAt: string;
  preferences: UserPreferences;
  achievements: Achievement[];
  portfolio: PortfolioEntry[];
}
