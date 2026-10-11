import { SkillDomainId, DifficultyLevel } from './skills';

export type EntryMode = 'explore' | 'direct';

export interface UserGoalIntent {
  rawQuery: string;
  detectedIntent: 'explore_strengths' | 'gap_analysis' | 'career_readiness' | 'safety_awareness' | 'test_specific_skill';
  matchedDomain: SkillDomainId;
  targetCompetencyId?: string;
  targetRole?: string;
  confidence: number; // 0 to 1
  suggestedDifficulty: DifficultyLevel;
  selfReportedExperience?: 'none' | 'beginner' | 'intermediate' | 'advanced';
  reasoning: string;
  needsClarification: boolean;
  clarificationQuestion?: string;
  clarificationOptions?: string[];
  recommendedAssessmentRoute: 'skill_radar' | 'specific_mission';
  targetMissionId?: string;
}

export interface QuickStartOption {
  id: string;
  mode: EntryMode;
  label: string;
  description: string;
  icon: string;
  query: string;
  badge?: string;
  domainId?: SkillDomainId;
  missionId?: string;
}
