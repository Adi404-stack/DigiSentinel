import { describe, it, expect } from 'vitest';
import { ScoringEngine } from '../services/scoringEngine';
import { ChallengeSubmission } from '../types/assessment';

describe('ScoringEngine Assessment Evaluation', () => {
  it('should correctly evaluate all passing submissions', () => {
    const mockSubmissions: ChallengeSubmission[] = [
      {
        challengeId: 'diag_1_upi_screenshot',
        selectedOptionId: 'opt_1_verify_bank',
        isCorrect: true,
        scoreEarned: 100,
        hintsUsedCount: 0,
        timeSpentSeconds: 30,
        submittedAt: new Date().toISOString()
      },
      {
        challengeId: 'diag_2_dns_vs_ip',
        selectedOptionId: 'opt_2_public_dns_query',
        isCorrect: true,
        scoreEarned: 100,
        hintsUsedCount: 0,
        timeSpentSeconds: 40,
        submittedAt: new Date().toISOString()
      }
    ];

    const result = ScoringEngine.evaluateDiagnostic(mockSubmissions);
    expect(result.overallScore).toBe(100);
    expect(result.correctCount).toBe(2);
    expect(result.criticalErrorsIdentified.length).toBe(0);
    expect(result.strengths.length).toBe(2);
  });

  it('should flag critical errors when user selects dangerous actions', () => {
    const dangerousSubmissions: ChallengeSubmission[] = [
      {
        challengeId: 'diag_1_upi_screenshot',
        selectedOptionId: 'opt_1_scan_qr', // Critical failure: scanning collect QR to receive money
        isCorrect: false,
        scoreEarned: 0,
        hintsUsedCount: 0,
        timeSpentSeconds: 15,
        submittedAt: new Date().toISOString()
      }
    ];

    const result = ScoringEngine.evaluateDiagnostic(dangerousSubmissions);
    expect(result.overallScore).toBe(0);
    expect(result.correctCount).toBe(0);
    expect(result.criticalErrorsIdentified.length).toBeGreaterThan(0);
    expect(result.gaps.length).toBe(1);
    expect(result.gaps[0].competencyId).toBe('comp_upi_verification');
  });
});
