// Core Skill Definitions, Domains, Competencies, and Rubrics

export type SkillDomainId =
  | 'fraud_safety'
  | 'cybersecurity'
  | 'software_dev'
  | 'data_ai'
  | 'it_networking'
  | 'digital_literacy';

export type CompetencyStatus =
  | 'not_assessed'
  | 'limited_evidence'
  | 'developing'
  | 'demonstrated'
  | 'needs_practice';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Competency {
  id: string;
  domainId: SkillDomainId;
  name: string;
  description: string;
  level: DifficultyLevel;
  evidenceStatus: CompetencyStatus;
  score: number; // 0 to 100
  assessedTasksCount: number;
  lastAssessedAt?: string;
  keyIndicators: string[];
}

export interface SkillDomain {
  id: SkillDomainId;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  accentHex: string;
  competencies: string[]; // Competency IDs
  totalMissions: number;
  tags: string[];
}

export interface AssessmentRubric {
  accuracy: number; // 0 - 100
  evidenceReasoning: number; // 0 - 100
  independence: number; // 0 - 100 (penalty for hints)
  efficiency: number; // 0 - 100
  riskAwareness: number; // 0 - 100
  overallScore: number;
  criticalErrors: string[];
  feedbackNotes: string[];
}
