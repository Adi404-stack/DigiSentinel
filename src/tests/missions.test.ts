import { describe, it, expect } from 'vitest';
import { MISSIONS } from '../data/missionsData';
import { AdaptiveEngine } from '../services/adaptiveEngine';
import { ScoringEngine } from '../services/scoringEngine';
import { DIAGNOSTIC_CHALLENGES } from '../data/diagnosticTasks';
import { ChallengeSubmission } from '../types/assessment';

describe('Mission Definitions & Tasks Completeness', () => {
  it('should have all 6 job-oriented missions properly configured', () => {
    expect(MISSIONS.length).toBe(6);
    const missionIds = MISSIONS.map(m => m.id);
    expect(missionIds).toContain('fraud_investigator');
    expect(missionIds).toContain('debug_broken_app');
    expect(missionIds).toContain('network_troubleshoot');
    expect(missionIds).toContain('appsec_analyst');
    expect(missionIds).toContain('data_detective');
    expect(missionIds).toContain('incident_responder');
  });

  it('every mission should have 4 actionable tasks with rubric criteria and briefing', () => {
    MISSIONS.forEach(mission => {
      expect(mission.tasks.length).toBe(4);
      expect(mission.briefing.objectives.length).toBeGreaterThanOrEqual(3);
      expect(mission.skillsTested.length).toBeGreaterThanOrEqual(3);
      expect(mission.xpReward).toBeGreaterThan(0);
      expect(mission.role).toBeDefined();
    });
  });
});

describe('Adaptive Diagnostic Engine Rules', () => {
  it('should trigger foundational adaptive branch when user fails a critical task', () => {
    const failedSubmission: ChallengeSubmission = {
      challengeId: 'diag_1_upi_screenshot',
      selectedOptionId: 'opt_1_scan_qr', // Failed option
      isCorrect: false,
      scoreEarned: 0,
      hintsUsedCount: 0,
      timeSpentSeconds: 20,
      submittedAt: new Date().toISOString()
    };

    const adaptiveResult = AdaptiveEngine.getNextChallenge(0, failedSubmission, DIAGNOSTIC_CHALLENGES);
    expect(adaptiveResult.isBranch).toBe(true);
    expect(adaptiveResult.nextChallenge?.id).toBe('diag_1_base_pin');
    expect(adaptiveResult.nextChallenge?.isFoundationalBranch).toBe(true);
  });

  it('should trigger advanced adaptive variant when user passes with 100% precision and zero hints', () => {
    const passedSubmission: ChallengeSubmission = {
      challengeId: 'diag_1_upi_screenshot',
      selectedOptionId: 'opt_1_verify_bank', // Correct option
      isCorrect: true,
      scoreEarned: 100,
      hintsUsedCount: 0,
      timeSpentSeconds: 35,
      submittedAt: new Date().toISOString()
    };

    const adaptiveResult = AdaptiveEngine.getNextChallenge(0, passedSubmission, DIAGNOSTIC_CHALLENGES);
    expect(adaptiveResult.isBranch).toBe(true);
    expect(adaptiveResult.nextChallenge?.id).toBe('diag_1_adv_kyc');
    expect(adaptiveResult.nextChallenge?.isAdvancedBranch).toBe(true);
  });

  it('should evaluate both base and adaptive branch submissions cleanly in ScoringEngine', () => {
    const mixedSubmissions: ChallengeSubmission[] = [
      {
        challengeId: 'diag_1_upi_screenshot',
        selectedOptionId: 'opt_1_scan_qr',
        isCorrect: false,
        scoreEarned: 0,
        hintsUsedCount: 0,
        timeSpentSeconds: 15,
        submittedAt: new Date().toISOString()
      },
      {
        challengeId: 'diag_1_base_pin', // Adaptive branch task!
        selectedOptionId: 'opt_base_refuse',
        isCorrect: true,
        scoreEarned: 100,
        hintsUsedCount: 0,
        timeSpentSeconds: 25,
        submittedAt: new Date().toISOString()
      }
    ];

    const results = ScoringEngine.evaluateDiagnostic(mixedSubmissions);
    expect(results.totalChallenges).toBe(2);
    expect(results.correctCount).toBe(1);
    expect(results.overallScore).toBe(50);
    expect(results.criticalErrorsIdentified.length).toBe(1);
    expect(results.strengths.length).toBe(1);
  });
});
