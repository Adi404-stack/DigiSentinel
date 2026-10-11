import { UserProfile } from '../types/user';
import { ChallengeSubmission, DiagnosticResult } from '../types/assessment';
import { MissionAttempt } from '../types/missions';
import { INITIAL_ACHIEVEMENTS } from '../data/achievementsData';
import { Competency } from '../types/skills';
import { INITIAL_COMPETENCIES } from '../data/taxonomy';

const STORAGE_KEYS = {
  USER_PROFILE: 'digisentinel_profile_v1',
  DIAGNOSTIC_SUBMISSIONS: 'digisentinel_diag_submissions_v1',
  DIAGNOSTIC_ACTIVE_INDEX: 'digisentinel_diag_index_v1',
  DIAGNOSTIC_RESULT: 'digisentinel_diag_result_v1',
  MISSION_ATTEMPTS: 'digisentinel_mission_attempts_v1',
  COMPETENCIES: 'digisentinel_competencies_v1',
};

const DEFAULT_PROFILE: UserProfile = {
  id: 'user_sentinel_01',
  name: 'Alex Chen',
  email: 'alex.chen@campus.edu',
  avatarSeed: 'sentinel-pilot',
  level: 3,
  xp: 750,
  currentStreakDays: 4,
  longestStreakDays: 9,
  joinedAt: '2026-09-15T00:00:00.000Z',
  preferences: {
    language: 'en',
    reducedMotion: false,
    theme: 'dark',
    isSimulatedMode: true,
    soundEffects: true
  },
  achievements: INITIAL_ACHIEVEMENTS.map(a => 
    a.id === 'ach_sentinel_initiate' ? { ...a, unlockedAt: '2026-09-16T12:00:00Z' } : a
  ),
  portfolio: [
    {
      id: 'port_entry_demo_1',
      missionId: 'fraud_investigator',
      missionTitle: 'Cyber Fraud Investigator',
      role: 'Junior Security Analyst',
      completedAt: '2026-10-02T14:22:00Z',
      overallScore: 88,
      rubric: {
        accuracy: 90,
        evidenceReasoning: 85,
        independence: 95,
        efficiency: 80,
        riskAwareness: 90,
        overallScore: 88,
        criticalErrors: [],
        feedbackNotes: ['Demonstrated strong understanding of spoofed email headers and impossible travel correlation.']
      },
      evidenceSummary: 'Analyzed synthetic wire fraud scenario. Isolated spear-phishing domain and isolated compromised host within SLA.',
      skillsVerified: ['Email Header Forensics', 'Log Correlation', 'Incident Triage'],
      certificateHash: 'DS-2026-DFIR-88291',
      attemptNumber: 1
    }
  ]
};

export class StorageService {
  public static getProfile(): UserProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn('Failed to parse profile from storage, using default', e);
    }
    this.saveProfile(DEFAULT_PROFILE);
    return DEFAULT_PROFILE;
  }

  public static saveProfile(profile: UserProfile): void {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save profile', e);
    }
  }

  public static getDiagnosticSubmissions(): ChallengeSubmission[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DIAGNOSTIC_SUBMISSIONS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn('Error reading diagnostic submissions', e);
    }
    return [];
  }

  public static saveDiagnosticSubmissions(submissions: ChallengeSubmission[]): void {
    localStorage.setItem(STORAGE_KEYS.DIAGNOSTIC_SUBMISSIONS, JSON.stringify(submissions));
  }

  public static getActiveDiagnosticIndex(): number {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DIAGNOSTIC_ACTIVE_INDEX);
      if (data) return parseInt(data, 10);
    } catch (e) {
      console.warn(e);
    }
    return 0;
  }

  public static saveActiveDiagnosticIndex(idx: number): void {
    localStorage.setItem(STORAGE_KEYS.DIAGNOSTIC_ACTIVE_INDEX, idx.toString());
  }

  public static getDiagnosticResult(): DiagnosticResult | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DIAGNOSTIC_RESULT);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn(e);
    }
    return null;
  }

  public static saveDiagnosticResult(result: DiagnosticResult): void {
    localStorage.setItem(STORAGE_KEYS.DIAGNOSTIC_RESULT, JSON.stringify(result));
  }

  public static getCompetencies(): Competency[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COMPETENCIES);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn(e);
    }
    this.saveCompetencies(INITIAL_COMPETENCIES);
    return INITIAL_COMPETENCIES;
  }

  public static saveCompetencies(comps: Competency[]): void {
    localStorage.setItem(STORAGE_KEYS.COMPETENCIES, JSON.stringify(comps));
  }

  public static getMissionAttempts(): MissionAttempt[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MISSION_ATTEMPTS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn(e);
    }
    return [];
  }

  public static saveMissionAttempt(attempt: MissionAttempt): void {
    const list = this.getMissionAttempts();
    const existingIdx = list.findIndex(a => a.id === attempt.id);
    if (existingIdx >= 0) {
      list[existingIdx] = attempt;
    } else {
      list.push(attempt);
    }
    localStorage.setItem(STORAGE_KEYS.MISSION_ATTEMPTS, JSON.stringify(list));
  }

  public static resetToCleanState(): void {
    localStorage.removeItem(STORAGE_KEYS.DIAGNOSTIC_SUBMISSIONS);
    localStorage.removeItem(STORAGE_KEYS.DIAGNOSTIC_ACTIVE_INDEX);
    localStorage.removeItem(STORAGE_KEYS.DIAGNOSTIC_RESULT);
    localStorage.removeItem(STORAGE_KEYS.MISSION_ATTEMPTS);
    localStorage.setItem(STORAGE_KEYS.COMPETENCIES, JSON.stringify(INITIAL_COMPETENCIES));
    this.saveProfile(DEFAULT_PROFILE);
  }
}
