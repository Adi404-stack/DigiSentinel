import { ChallengeSubmission, DiagnosticChallenge } from '../types/assessment';
import { DIAGNOSTIC_CHALLENGES, ADAPTIVE_BRANCH_TASKS } from '../data/diagnosticTasks';

export class AdaptiveEngine {
  /**
   * Determine the next challenge to present, considering adaptive branches.
   */
  public static getNextChallenge(
    currentIndex: number,
    recentSubmission?: ChallengeSubmission,
    activeChallengesList: DiagnosticChallenge[] = DIAGNOSTIC_CHALLENGES
  ): { nextChallenge: DiagnosticChallenge | null; isBranch: boolean; message?: string } {
    if (!recentSubmission) {
      return { nextChallenge: activeChallengesList[0] || null, isBranch: false };
    }

    const currentChallenge = activeChallengesList.find(c => c.id === recentSubmission.challengeId);
    
    // Check if adaptive branch should be triggered
    if (currentChallenge) {
      if (!recentSubmission.isCorrect && currentChallenge.adaptiveBranchOnFailId) {
        const branchTask = ADAPTIVE_BRANCH_TASKS[currentChallenge.adaptiveBranchOnFailId];
        if (branchTask) {
          return {
            nextChallenge: branchTask,
            isBranch: true,
            message: 'Adaptive Rule: A foundational reinforcement task was added to clarify the core rule.'
          };
        }
      }

      if (recentSubmission.isCorrect && recentSubmission.hintsUsedCount === 0 && currentChallenge.adaptiveBranchOnPassId) {
        const branchTask = ADAPTIVE_BRANCH_TASKS[currentChallenge.adaptiveBranchOnPassId];
        if (branchTask) {
          return {
            nextChallenge: branchTask,
            isBranch: true,
            message: 'Adaptive Rule: High precision detected! An advanced diagnostic variant was unlocked.'
          };
        }
      }
    }

    // Normal linear progression
    const nextLinear = activeChallengesList[currentIndex + 1];
    if (nextLinear) {
      return { nextChallenge: nextLinear, isBranch: false };
    }

    // Finished
    return { nextChallenge: null, isBranch: false };
  }
}
