import { describe, it, expect } from 'vitest';
import { CURRICULUM_TRACKS } from '../data/topicCurriculumData';

describe('CurriculumTracks Data Integrity', () => {
  it('includes all 4 core tracks specified in the syllabus', () => {
    const trackIds = CURRICULUM_TRACKS.map(t => t.id);
    expect(trackIds).toContain('cybersecurity_fundamentals');
    expect(trackIds).toContain('digital_privacy');
    expect(trackIds).toContain('online_fraud');
    expect(trackIds).toContain('technical_reasoning');
  });

  it('verifies every module has objectives, explanations, common mistakes, and knowledge check', () => {
    CURRICULUM_TRACKS.forEach(track => {
      expect(track.modules.length).toBeGreaterThan(0);
      track.modules.forEach(mod => {
        expect(mod.objectives.length).toBeGreaterThan(0);
        expect(mod.explanation.length).toBeGreaterThan(20);
        expect(mod.commonMistakes.length).toBeGreaterThan(0);
        expect(mod.knowledgeCheck.options.some(o => o.isCorrect)).toBe(true);
      });
    });
  });
});
