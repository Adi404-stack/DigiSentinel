import { DifficultyLevel, SkillDomainId, AssessmentRubric } from './skills';

export type MissionId =
  | 'fraud_investigator'
  | 'debug_broken_app'
  | 'network_troubleshoot'
  | 'appsec_analyst'
  | 'data_detective'
  | 'incident_responder';

export interface MissionTask {
  id: string;
  stepNumber: number;
  title: string;
  instruction: string;
  type: 'select' | 'code' | 'command' | 'log_analysis' | 'sql' | 'incident_triage';
  rubricCriterion: 'accuracy' | 'evidenceReasoning' | 'riskAwareness' | 'efficiency';
  completed: boolean;
  score?: number;
  feedback?: string;
}

export interface MissionDefinition {
  id: MissionId;
  title: string;
  role: string;
  department: string;
  domainId: SkillDomainId;
  difficulty: DifficultyLevel;
  estimatedMinutes: number;
  xpReward: number;
  badgeId: string;
  briefing: {
    summary: string;
    organization: string;
    incidentTime: string;
    objectives: string[];
    allowedTools: string[];
    safetyNotice: string;
  };
  tasks: MissionTask[];
  skillsTested: string[];
}

export interface MissionAttempt {
  id: string;
  missionId: MissionId;
  startedAt: string;
  completedAt?: string;
  status: 'in_progress' | 'completed' | 'abandoned';
  currentStepIndex: number;
  rubric: AssessmentRubric;
  evidenceNotes: string[];
  userArtifacts?: Record<string, any>;
  isRetest?: boolean;
}
