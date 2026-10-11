import { ChallengeSubmission, DiagnosticResult } from '../types/assessment';
import { DIAGNOSTIC_CHALLENGES, ADAPTIVE_BRANCH_TASKS } from '../data/diagnosticTasks';
import { CompetencyStatus, SkillDomainId } from '../types/skills';

export class ScoringEngine {
  /**
   * Evaluates a set of diagnostic submissions and generates a comprehensive DiagnosticResult.
   */
  public static evaluateDiagnostic(submissions: ChallengeSubmission[]): DiagnosticResult {
    const totalChallenges = submissions.length;
    let correctCount = 0;
    let totalScore = 0;
    const criticalErrors: string[] = [];

    const domainScores: Record<SkillDomainId, { earned: number; total: number; count: number }> = {
      fraud_safety: { earned: 0, total: 0, count: 0 },
      cybersecurity: { earned: 0, total: 0, count: 0 },
      software_dev: { earned: 0, total: 0, count: 0 },
      data_ai: { earned: 0, total: 0, count: 0 },
      it_networking: { earned: 0, total: 0, count: 0 },
      digital_literacy: { earned: 0, total: 0, count: 0 }
    };

    const strengths: { competencyId: string; name: string; evidenceText: string }[] = [];
    const gaps: { competencyId: string; name: string; evidenceText: string; recommendedPracticeId: string }[] = [];

    for (const sub of submissions) {
      const challenge = DIAGNOSTIC_CHALLENGES.find(c => c.id === sub.challengeId) || ADAPTIVE_BRANCH_TASKS[sub.challengeId];
      if (!challenge) continue;

      const selectedOpt = challenge.options.find(o => o.id === sub.selectedOptionId);
      if (selectedOpt?.isCriticalFailure) {
        criticalErrors.push(`Critical Decision Error in "${challenge.title}": ${selectedOpt.feedbackText}`);
      }

      if (sub.isCorrect) {
        correctCount++;
        strengths.push({
          competencyId: challenge.competencyId,
          name: challenge.competencyName,
          evidenceText: `Successfully evaluated ${challenge.title}: identified correct root cause and avoided deception.`
        });
      } else {
        gaps.push({
          competencyId: challenge.competencyId,
          name: challenge.competencyName,
          evidenceText: `Missed critical indicator in "${challenge.title}". Action selected: "${selectedOpt?.label.slice(0, 60)}..."`,
          recommendedPracticeId: `lesson_${challenge.domainId}`
        });
      }

      totalScore += sub.scoreEarned;
      domainScores[challenge.domainId].earned += sub.scoreEarned;
      domainScores[challenge.domainId].total += 100;
      domainScores[challenge.domainId].count += 1;
    }

    const overallScore = totalChallenges > 0 ? Math.round(totalScore / totalChallenges) : 0;

    const domainBreakdown: Record<SkillDomainId, { score: number; assessed: boolean; status: CompetencyStatus }> = {
      fraud_safety: { score: 0, assessed: false, status: 'not_assessed' },
      cybersecurity: { score: 0, assessed: false, status: 'not_assessed' },
      software_dev: { score: 0, assessed: false, status: 'not_assessed' },
      data_ai: { score: 0, assessed: false, status: 'not_assessed' },
      it_networking: { score: 0, assessed: false, status: 'not_assessed' },
      digital_literacy: { score: 0, assessed: false, status: 'not_assessed' }
    };

    (Object.keys(domainScores) as SkillDomainId[]).forEach(d => {
      const data = domainScores[d];
      if (data.count > 0) {
        const domainPercentage = Math.round((data.earned / data.total) * 100);
        let status: CompetencyStatus = 'developing';
        if (domainPercentage >= 80) status = 'demonstrated';
        else if (domainPercentage < 50) status = 'needs_practice';

        domainBreakdown[d] = {
          score: domainPercentage,
          assessed: true,
          status
        };
      }
    });

    // Recommend first mission based on lowest domain or cybersecurity
    let recommendedFirstMissionId = 'fraud_investigator';
    if (domainBreakdown.fraud_safety.score < 70) {
      recommendedFirstMissionId = 'fraud_investigator';
    } else if (domainBreakdown.software_dev.score < 70) {
      recommendedFirstMissionId = 'debug_broken_app';
    } else if (domainBreakdown.it_networking.score < 70) {
      recommendedFirstMissionId = 'network_troubleshoot';
    } else if (domainBreakdown.data_ai.score < 70) {
      recommendedFirstMissionId = 'data_detective';
    } else {
      recommendedFirstMissionId = 'incident_responder';
    }

    return {
      completedAt: new Date().toISOString(),
      totalChallenges,
      correctCount,
      overallScore,
      domainBreakdown,
      strengths,
      gaps,
      criticalErrorsIdentified: criticalErrors,
      recommendedFirstMissionId,
      limitationsDisclaimer: 'These results represent performance in simulated diagnostic challenges on DigiSentinel. They demonstrate task competency and safe decision habits, not official employment or statutory certifications.'
    };
  }
}
