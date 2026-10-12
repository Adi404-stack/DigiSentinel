import { AssessmentRubric } from './skills';
import { MissionId } from './missions';

export type SupportedLanguage = 'en' | 'hi' | 'mr';
export type FontSize = 'sm' | 'md' | 'lg' | 'xl';

export type UserAudienceCategory =
  | 'student'
  | 'farmer'
  | 'business_owner'
  | 'corporate_employee'
  | 'job_seeker'
  | 'general_learner'
  | 'custom';

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
  fontSize: FontSize;
  reducedMotion: boolean;
  theme: 'dark' | 'light';
  isSimulatedMode: boolean; // clearly distinguishes live simulated lab from external production
  soundEffects: boolean;
  audienceCategory?: UserAudienceCategory;
  learningGoal?: string;
  experienceLevel?: 'beginner' | 'intermediate' | 'advanced';
  explanationPreference?: 'beginner_friendly' | 'advanced';
  hasCompletedOnboarding?: boolean;
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
