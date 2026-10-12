import { describe, it, expect } from 'vitest';
import { DAILY_CHALLENGES, getTodayChallenge } from '../data/dailyChallengesData';

describe('DailyChallenges System', () => {
  it('contains 7 curated challenges for complete daily cycling', () => {
    expect(DAILY_CHALLENGES.length).toBe(7);
  });

  it('ensures each challenge has at least 1 correct option and progressive hints', () => {
    DAILY_CHALLENGES.forEach(ch => {
      const correctOptions = ch.options.filter(o => o.isCorrect);
      expect(correctOptions.length).toBe(1);
      expect(ch.hints.length).toBe(2);
      expect(ch.title).toBeTruthy();
      expect(ch.explanation.defenseRule).toBeTruthy();
    });
  });

  it('deterministically returns a valid daily challenge for today', () => {
    const today = getTodayChallenge();
    expect(today).toBeDefined();
    expect(today.id).toBeTruthy();
    expect(DAILY_CHALLENGES.some(c => c.id === today.id)).toBe(true);
  });
});
