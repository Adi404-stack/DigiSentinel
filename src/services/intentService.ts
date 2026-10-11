import { UserGoalIntent } from '../types/discovery';
import { SkillDomainId, DifficultyLevel } from '../types/skills';

interface IntentKeywordRule {
  domain: SkillDomainId;
  keywords: string[];
  competencyId?: string;
  role?: string;
  targetMissionId?: string;
}

const INTENT_RULES: IntentKeywordRule[] = [
  {
    domain: 'fraud_safety',
    keywords: ['upi', 'fake screenshot', 'qr', 'scam', 'fraud', 'payment', 'kyc', 'money', 'bank', 'cyber fraud', 'financial'],
    competencyId: 'comp_upi_verification',
    role: 'Financial Defense Specialist',
    targetMissionId: 'fraud_investigator'
  },
  {
    domain: 'cybersecurity',
    keywords: ['cyber', 'cybersecurity', 'phishing', 'incident', 'soc', 'analyst', 'hack', 'security', 'dfir', 'malware', 'edr'],
    competencyId: 'comp_phishing_investigation',
    role: 'Junior Security Analyst',
    targetMissionId: 'fraud_investigator'
  },
  {
    domain: 'cybersecurity',
    keywords: ['appsec', 'idor', 'owasp', 'vulnerability', 'web security', 'injection', 'api security'],
    competencyId: 'comp_appsec_basics',
    role: 'Junior AppSec Analyst',
    targetMissionId: 'appsec_analyst'
  },
  {
    domain: 'software_dev',
    keywords: ['react', 'code', 'javascript', 'typescript', 'programming', 'developer', 'frontend', 'software', 'debug', 'bug', 'test'],
    competencyId: 'comp_code_debugging',
    role: 'Junior Software Developer',
    targetMissionId: 'debug_broken_app'
  },
  {
    domain: 'data_ai',
    keywords: ['data', 'sql', 'analytics', 'analyst', 'query', 'dataset', 'cleaning', 'ai', 'machine learning', 'llm'],
    competencyId: 'comp_data_cleaning',
    role: 'Junior Data Analyst',
    targetMissionId: 'data_detective'
  },
  {
    domain: 'it_networking',
    keywords: ['network', 'networking', 'dns', 'ip', 'ping', 'cisco', 'router', 'switch', 'troubleshoot', 'sysadmin'],
    competencyId: 'comp_dns_troubleshooting',
    role: 'Junior IT Engineer',
    targetMissionId: 'network_troubleshoot'
  },
  {
    domain: 'cybersecurity',
    keywords: ['devops', 'sre', 'incident responder', 'latency', 'production outage', 'server down', 'docker', 'kubernetes'],
    competencyId: 'comp_incident_containment',
    role: 'Junior DevOps / SRE',
    targetMissionId: 'incident_responder'
  }
];

export class IntentService {
  /**
   * Classify user natural language input into a structured Goal Intent object.
   */
  public static classifyUserQuery(rawQuery: string): UserGoalIntent {
    const trimmed = rawQuery.trim().toLowerCase();

    // Check if query is too brief or ambiguous
    if (trimmed.length < 5) {
      return {
        rawQuery,
        detectedIntent: 'explore_strengths',
        matchedDomain: 'cybersecurity',
        confidence: 0.3,
        suggestedDifficulty: 'beginner',
        reasoning: 'Input was too brief. Defaulting to general exploratory diagnostic.',
        needsClarification: true,
        clarificationQuestion: 'Could you tell us which area you want to explore most?',
        clarificationOptions: [
          'Cybersecurity & Incident Response',
          'Online Safety & Financial Fraud Prevention',
          'Software Development & Debugging',
          'IT & Network Diagnostics'
        ],
        recommendedAssessmentRoute: 'skill_radar'
      };
    }

    // Direct assessment match rules
    for (const rule of INTENT_RULES) {
      for (const kw of rule.keywords) {
        if (trimmed.includes(kw)) {
          // Detect experience level words
          let difficulty: DifficultyLevel = 'intermediate';
          let experience: 'none' | 'beginner' | 'intermediate' | 'advanced' = 'intermediate';
          
          if (trimmed.includes('beginner') || trimmed.includes('starter') || trimmed.includes('student') || trimmed.includes('new to')) {
            difficulty = 'beginner';
            experience = 'beginner';
          } else if (trimmed.includes('advanced') || trimmed.includes('senior') || trimmed.includes('pro')) {
            difficulty = 'advanced';
            experience = 'advanced';
          }

          const isDirectSkillTest = trimmed.includes('test') || trimmed.includes('assess') || trimmed.includes('check') || trimmed.includes('ready for');

          return {
            rawQuery,
            detectedIntent: isDirectSkillTest ? 'test_specific_skill' : 'career_readiness',
            matchedDomain: rule.domain,
            targetCompetencyId: rule.competencyId,
            targetRole: rule.role,
            confidence: 0.92,
            suggestedDifficulty: difficulty,
            selfReportedExperience: experience,
            reasoning: `Identified keyword "${kw}" associated with ${rule.domain.replace('_', ' ')}. Matched to role: ${rule.role}.`,
            needsClarification: false,
            recommendedAssessmentRoute: isDirectSkillTest && rule.targetMissionId ? 'specific_mission' : 'skill_radar',
            targetMissionId: rule.targetMissionId
          };
        }
      }
    }

    // Default to general explore diagnostic
    return {
      rawQuery,
      detectedIntent: 'explore_strengths',
      matchedDomain: 'fraud_safety',
      confidence: 0.65,
      suggestedDifficulty: 'beginner',
      reasoning: 'General exploratory interest detected. Recommended entry via Skill Radar multi-domain diagnostic.',
      needsClarification: false,
      recommendedAssessmentRoute: 'skill_radar'
    };
  }
}
