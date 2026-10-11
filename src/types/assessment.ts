import { CompetencyStatus, DifficultyLevel, SkillDomainId } from './skills';

export interface EvidenceItem {
  id: string;
  type: 'image' | 'code' | 'email_header' | 'log_entry' | 'network_output' | 'table' | 'text';
  title: string;
  content: string;
  metadata?: Record<string, string>;
}

export interface ChallengeOption {
  id: string;
  label: string;
  explanationNote?: string;
  isCorrect: boolean;
  isCriticalFailure?: boolean; // Dangerous action (e.g. paying scammer, sharing OTP)
  feedbackText: string;
}

export interface DiagnosticChallenge {
  id: string;
  index: number;
  domainId: SkillDomainId;
  competencyId: string;
  competencyName: string;
  title: string;
  scenario: string;
  difficulty: DifficultyLevel;
  estimatedMinutes: number;
  evidence: EvidenceItem[];
  instructions: string;
  options: ChallengeOption[];
  explanationPrompt?: string;
  hints: string[];
  adaptiveBranchOnFailId?: string; // Foundational fallback
  adaptiveBranchOnPassId?: string; // Advanced challenge branch
  isFoundationalBranch?: boolean;
  isAdvancedBranch?: boolean;
}

export interface ChallengeSubmission {
  challengeId: string;
  selectedOptionId: string;
  userExplanation?: string;
  hintsUsedCount: number;
  timeSpentSeconds: number;
  isCorrect: boolean;
  scoreEarned: number; // 0 to 100
  submittedAt: string;
}

export interface DiagnosticResult {
  completedAt: string;
  totalChallenges: number;
  correctCount: number;
  overallScore: number;
  domainBreakdown: Record<SkillDomainId, {
    score: number;
    assessed: boolean;
    status: CompetencyStatus;
  }>;
  strengths: {
    competencyId: string;
    name: string;
    evidenceText: string;
  }[];
  gaps: {
    competencyId: string;
    name: string;
    evidenceText: string;
    recommendedPracticeId: string;
  }[];
  criticalErrorsIdentified: string[];
  recommendedFirstMissionId: string;
  limitationsDisclaimer: string;
}
