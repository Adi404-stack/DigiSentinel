import { describe, it, expect } from 'vitest';
import {
  MULTI_DOMAIN_ASSESSMENTS,
  getAssessmentsForAudience,
  getAssessmentById
} from '../data/multiDomainAssessmentsData';
import { TRANSLATIONS } from '../data/translations';
import { UserAudienceCategory } from '../types/user';

describe('Multi-Domain Assessments Data & Localization', () => {
  it('contains assessments for key audience categories', () => {
    const categories: UserAudienceCategory[] = [
      'student',
      'farmer',
      'business_owner',
      'corporate_employee',
      'job_seeker',
      'general_learner'
    ];

    categories.forEach(cat => {
      const results = getAssessmentsForAudience(cat);
      expect(results.length).toBeGreaterThan(0);
      results.forEach(assessment => {
        expect(assessment.audienceCategory).toBe(cat);
      });
    });
  });

  it('guarantees complete English, Hindi, and Marathi translations for all assessments', () => {
    MULTI_DOMAIN_ASSESSMENTS.forEach(assessment => {
      // Titles and descriptions
      expect(assessment.title.en.trim().length).toBeGreaterThan(0);
      expect(assessment.title.hi.trim().length).toBeGreaterThan(0);
      expect(assessment.title.mr.trim().length).toBeGreaterThan(0);

      expect(assessment.description.en.trim().length).toBeGreaterThan(0);
      expect(assessment.description.hi.trim().length).toBeGreaterThan(0);
      expect(assessment.description.mr.trim().length).toBeGreaterThan(0);

      // Questions
      expect(assessment.questions.length).toBeGreaterThan(0);
      assessment.questions.forEach(q => {
        expect(q.title.en.trim().length).toBeGreaterThan(0);
        expect(q.title.hi.trim().length).toBeGreaterThan(0);
        expect(q.title.mr.trim().length).toBeGreaterThan(0);

        expect(q.explanation.en.trim().length).toBeGreaterThan(0);
        expect(q.explanation.hi.trim().length).toBeGreaterThan(0);
        expect(q.explanation.mr.trim().length).toBeGreaterThan(0);

        // Exactly one correct option per question
        const correctCount = q.options.filter(o => o.isCorrect).length;
        expect(correctCount).toBe(1);

        // Options localized
        q.options.forEach(opt => {
          expect(opt.text.en.trim().length).toBeGreaterThan(0);
          expect(opt.text.hi.trim().length).toBeGreaterThan(0);
          expect(opt.text.mr.trim().length).toBeGreaterThan(0);
        });
      });
    });
  });

  it('retrieves assessments correctly by id', () => {
    const assessment = getAssessmentById('farmer_payment_fraud');
    expect(assessment).toBeDefined();
    expect(assessment?.audienceCategory).toBe('farmer');
    expect(assessment?.disclaimer).toBeDefined();
    expect(assessment?.disclaimer?.mr).toContain('अस्वीकरण');
  });

  it('provides matching keys across EN, HI, and MR dictionaries', () => {
    const enKeys = Object.keys(TRANSLATIONS.en);
    const hiKeys = Object.keys(TRANSLATIONS.hi);
    const mrKeys = Object.keys(TRANSLATIONS.mr);

    expect(enKeys.length).toBeGreaterThan(20);
    expect(hiKeys.length).toBeGreaterThan(20);
    expect(mrKeys.length).toBeGreaterThan(20);

    // Common navigation keys must exist in all 3 languages
    const criticalKeys = ['nav_dashboard', 'nav_missions', 'nav_radar', 'nav_portfolio', 'brand_name'];
    criticalKeys.forEach(key => {
      expect(TRANSLATIONS.en[key]).toBeDefined();
      expect(TRANSLATIONS.hi[key]).toBeDefined();
      expect(TRANSLATIONS.mr[key]).toBeDefined();
    });
  });
});
