import { describe, it, expect } from 'vitest';
import { IntentService } from '../services/intentService';

describe('IntentService NLP Classification', () => {
  it('should map natural-language query to cybersecurity domain and role', () => {
    const query = 'I want to know whether I am good enough at cybersecurity for an internship';
    const result = IntentService.classifyUserQuery(query);

    expect(result.matchedDomain).toBe('cybersecurity');
    expect(result.targetRole).toBe('Junior Security Analyst');
    expect(result.confidence).toBeGreaterThan(0.8);
    expect(result.needsClarification).toBe(false);
  });

  it('should direct specific skill test query to targeted practical mission', () => {
    const query = 'Test my ability to debug broken React applications';
    const result = IntentService.classifyUserQuery(query);

    expect(result.matchedDomain).toBe('software_dev');
    expect(result.detectedIntent).toBe('test_specific_skill');
    expect(result.recommendedAssessmentRoute).toBe('specific_mission');
    expect(result.targetMissionId).toBe('debug_broken_app');
  });

  it('should request clarification for ambiguous or very short queries', () => {
    const query = 'tech';
    const result = IntentService.classifyUserQuery(query);

    expect(result.needsClarification).toBe(true);
    expect(result.clarificationOptions?.length).toBeGreaterThan(0);
  });
});
