import { ChallengeSubmission, DiagnosticResult } from '../types/assessment';
import { DIAGNOSTIC_CHALLENGES, ADAPTIVE_BRANCH_TASKS } from '../data/diagnosticTasks';
import { SkillDomainId } from '../types/skills';

export interface ExplainableRecommendation {
  id: string;
  category: string;
  domainId: SkillDomainId;
  finding: string;
  reason: string;
  actionableRecommendation: string;
  targetModuleId: string;
  targetPage: 'topics' | 'lab' | 'practice' | 'challenges' | 'missions';
  severity: 'high' | 'medium' | 'low';
}

export class RecommendationEngine {
  /**
   * Evaluates recorded user submissions and generates transparent, explainable recommendations.
   */
  public static generateExplainableRecommendations(
    submissions: ChallengeSubmission[],
    result?: DiagnosticResult | null
  ): ExplainableRecommendation[] {
    const recommendations: ExplainableRecommendation[] = [];

    if (!submissions || submissions.length === 0) {
      // Default baseline recommendation when user has not yet assessed
      recommendations.push({
        id: 'rec_baseline_assessment',
        category: 'Skill Calibration',
        domainId: 'cybersecurity',
        finding: 'No diagnostic submissions recorded for this profile yet.',
        reason: 'To establish an objective baseline of your technical instincts and defensive capabilities.',
        actionableRecommendation: 'Complete the 6-dimension Skill Radar diagnostic assessment.',
        targetModuleId: 'radar',
        targetPage: 'practice',
        severity: 'high'
      });
      return recommendations;
    }

    // Inspect individual failure modes
    for (const sub of submissions) {
      if (sub.isCorrect) continue;

      const challenge =
        DIAGNOSTIC_CHALLENGES.find(c => c.id === sub.challengeId) ||
        ADAPTIVE_BRANCH_TASKS[sub.challengeId];

      if (!challenge) continue;

      // 1. Phishing / Domain Spoofing Error
      if (challenge.domainId === 'fraud_safety' || challenge.competencyId === 'comp_upi_verification') {
        if (!recommendations.some(r => r.id === 'rec_payment_fraud')) {
          recommendations.push({
            id: 'rec_payment_fraud',
            category: 'Payment Verification',
            domainId: 'fraud_safety',
            finding: 'Missed fake receipt indicator or QR collect code risk in payment triage.',
            reason: `In "${challenge.title}", a counterfeit screenshot or QR collect trigger was selected instead of independent bank statement verification.`,
            actionableRecommendation: 'Complete the Payment Gateway & UPI Fraud Mechanics module and inspect 3 synthetic fake receipts in the lab.',
            targetModuleId: 'of_payment_upi',
            targetPage: 'lab',
            severity: 'high'
          });
        }
      }

      // 2. DNS / Network Troubleshooting Error
      if (challenge.domainId === 'it_networking' || challenge.competencyId === 'comp_dns_troubleshooting') {
        if (!recommendations.some(r => r.id === 'rec_dns_triage')) {
          recommendations.push({
            id: 'rec_dns_triage',
            category: 'Network Diagnostics',
            domainId: 'it_networking',
            finding: 'Difficulty isolating DNS name resolution from direct IP connectivity.',
            reason: `In "${challenge.title}", the response did not isolate nameserver resolution failure from Layer 3 IP routing.`,
            actionableRecommendation: 'Review OSI Network Layer Isolation and practise using nslookup and ping output analysis.',
            targetModuleId: 'tr_network_triage',
            targetPage: 'topics',
            severity: 'medium'
          });
        }
      }

      // 3. Code Boundary & Logic Error
      if (challenge.domainId === 'software_dev' || challenge.competencyId === 'comp_code_comprehension') {
        if (!recommendations.some(r => r.id === 'rec_code_bounds')) {
          recommendations.push({
            id: 'rec_code_bounds',
            category: 'Secure Engineering',
            domainId: 'software_dev',
            finding: 'Unintended negative balance or boundary flaw overlooked during code inspection.',
            reason: `In "${challenge.title}", logic failed to clamp numeric subtotals against promotional coupon inversions.`,
            actionableRecommendation: 'Review Defensive Code Reading & Edge Cases and patch boundary constraints.',
            targetModuleId: 'tr_code_comprehension',
            targetPage: 'topics',
            severity: 'medium'
          });
        }
      }

      // 4. Incident Response & Security Alert Error
      if (challenge.domainId === 'cybersecurity') {
        if (!recommendations.some(r => r.id === 'rec_incident_triage')) {
          recommendations.push({
            id: 'rec_incident_triage',
            category: 'Incident Response',
            domainId: 'cybersecurity',
            finding: 'Delayed credential termination or missed indicators of compromise (IoC).',
            reason: `In "${challenge.title}", containment actions did not terminate active session tokens or isolate the blast radius.`,
            actionableRecommendation: 'Practise the SOC Impossible Travel containment workflow in the Digital Safety Lab.',
            targetModuleId: 'lab_incident',
            targetPage: 'lab',
            severity: 'high'
          });
        }
      }
    }

    // If all assessed challenges were passed with high scores
    if (recommendations.length === 0) {
      recommendations.push({
        id: 'rec_advanced_reinforcement',
        category: 'Advanced Mastery',
        domainId: 'cybersecurity',
        finding: 'Strong foundational accuracy demonstrated across initial diagnostic challenges.',
        reason: 'Consistently identified counterfeit receipts, DNS resolver boundaries, and code bugs.',
        actionableRecommendation: 'Advance to Practical Assessment Missions with simulated live log terminals.',
        targetModuleId: 'missions',
        targetPage: 'missions',
        severity: 'low'
      });
    }

    return recommendations;
  }
}
