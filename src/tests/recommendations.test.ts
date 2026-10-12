import { describe, it, expect } from 'vitest';
import { RecommendationEngine } from '../services/recommendationEngine';
import { ChallengeSubmission } from '../types/assessment';

describe('RecommendationEngine', () => {
  it('returns baseline calibration recommendation when submissions list is empty', () => {
    const recs = RecommendationEngine.generateExplainableRecommendations([]);
    expect(recs.length).toBeGreaterThan(0);
    expect(recs[0].id).toBe('rec_baseline_assessment');
    expect(recs[0].category).toBe('Skill Calibration');
  });

  it('generates payment fraud recommendation when payment challenge is answered incorrectly', () => {
    const submissions: ChallengeSubmission[] = [
      {
        challengeId: 'diag_1_upi_screenshot',
        selectedOptionId: 'opt_1_scan_qr',
        hintsUsedCount: 0,
        timeSpentSeconds: 30,
        isCorrect: false,
        scoreEarned: 0,
        submittedAt: new Date().toISOString()
      }
    ];

    const recs = RecommendationEngine.generateExplainableRecommendations(submissions);
    const paymentRec = recs.find(r => r.id === 'rec_payment_fraud');
    expect(paymentRec).toBeDefined();
    expect(paymentRec?.severity).toBe('high');
    expect(paymentRec?.finding).toContain('fake receipt indicator');
  });

  it('generates DNS recommendation when DNS troubleshooting challenge is answered incorrectly', () => {
    const submissions: ChallengeSubmission[] = [
      {
        challengeId: 'diag_2_dns_vs_ip',
        selectedOptionId: 'opt_2_router_reboot',
        hintsUsedCount: 0,
        timeSpentSeconds: 30,
        isCorrect: false,
        scoreEarned: 0,
        submittedAt: new Date().toISOString()
      }
    ];

    const recs = RecommendationEngine.generateExplainableRecommendations(submissions);
    const dnsRec = recs.find(r => r.id === 'rec_dns_triage');
    expect(dnsRec).toBeDefined();
    expect(dnsRec?.domainId).toBe('it_networking');
  });

  it('generates reinforcement recommendation when all challenges are answered correctly', () => {
    const submissions: ChallengeSubmission[] = [
      {
        challengeId: 'diag_1_upi_screenshot',
        selectedOptionId: 'opt_1_verify_bank',
        hintsUsedCount: 0,
        timeSpentSeconds: 30,
        isCorrect: true,
        scoreEarned: 100,
        submittedAt: new Date().toISOString()
      }
    ];

    const recs = RecommendationEngine.generateExplainableRecommendations(submissions);
    expect(recs.some(r => r.id === 'rec_advanced_reinforcement')).toBe(true);
  });
});
