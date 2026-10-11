import { SkillDomain, Competency } from '../types/skills';

export const SKILL_DOMAINS: Record<string, SkillDomain> = {
  fraud_safety: {
    id: 'fraud_safety',
    title: 'Digital Safety & Financial Fraud',
    subtitle: 'Financial protection, fraud verification & threat avoidance',
    description: 'Learn to detect UPI scams, fake payment screenshots, QR fraud, KYC traps, and AI impersonation before financial loss occurs.',
    icon: 'ShieldAlert',
    color: 'from-amber-500/20 to-rose-500/20 text-amber-400 border-amber-500/30',
    accentHex: '#F59E0B',
    totalMissions: 4,
    tags: ['UPI Scams', 'Fake Screenshots', 'QR Fraud', 'KYC Verification', 'AI Voice Scams'],
    competencies: [
      'comp_upi_verification',
      'comp_fake_screenshot_detection',
      'comp_qr_safety',
      'comp_kyc_fraud_awareness',
      'comp_social_impersonation'
    ]
  },
  cybersecurity: {
    id: 'cybersecurity',
    title: 'Cybersecurity Operations',
    subtitle: 'Defensive investigation, auth & incident response',
    description: 'Master incident response, email header analysis, access control evaluation, log forensics, and proactive security remediation.',
    icon: 'ShieldCheck',
    color: 'from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/30',
    accentHex: '#3B82F6',
    totalMissions: 5,
    tags: ['Incident Triage', 'Log Analysis', 'Phishing Analysis', 'Access Control', 'Hardening'],
    competencies: [
      'comp_phishing_investigation',
      'comp_auth_security',
      'comp_incident_containment',
      'comp_security_log_analysis',
      'comp_appsec_basics'
    ]
  },
  software_dev: {
    id: 'software_dev',
    title: 'Software Development',
    subtitle: 'Debugging, logic reasoning & resilient code',
    description: 'Pinpoint elusive bugs, handle asynchronous race conditions, write unit tests, and implement production-ready software fixes.',
    icon: 'Code2',
    color: 'from-violet-500/20 to-purple-500/20 text-violet-400 border-violet-500/30',
    accentHex: '#8B5CF6',
    totalMissions: 4,
    tags: ['Debugging', 'React State', 'API Integration', 'Unit Testing', 'Edge Cases'],
    competencies: [
      'comp_code_debugging',
      'comp_edge_case_handling',
      'comp_async_logic',
      'comp_test_driven_verification',
      'comp_code_quality'
    ]
  },
  data_ai: {
    id: 'data_ai',
    title: 'Data & AI Literacy',
    subtitle: 'Data cleaning, SQL reasoning & model critique',
    description: 'Clean messy real-world datasets, compose analytical queries, detect misleading charts, and evaluate AI-generated outputs responsibly.',
    icon: 'Database',
    color: 'from-cyan-500/20 to-teal-500/20 text-cyan-400 border-cyan-500/30',
    accentHex: '#06B6D4',
    totalMissions: 4,
    tags: ['SQL Queries', 'Data Cleaning', 'Anomaly Detection', 'AI Verification', 'Data Hygiene'],
    competencies: [
      'comp_data_cleaning',
      'comp_sql_queries',
      'comp_anomaly_detection',
      'comp_ai_output_evaluation',
      'comp_data_interpretation'
    ]
  },
  it_networking: {
    id: 'it_networking',
    title: 'IT & Network Engineering',
    subtitle: 'Diagnostic protocols, DNS, routing & topologies',
    description: 'Troubleshoot connectivity bottlenecks, inspect DNS resolutions, isolate gateway faults, and simulate live command-line diagnostics.',
    icon: 'Network',
    color: 'from-emerald-500/20 to-green-500/20 text-emerald-400 border-emerald-500/30',
    accentHex: '#10B981',
    totalMissions: 3,
    tags: ['DNS vs IP', 'Subnet Masking', 'Ping / Traceroute', 'Gateway Triage', 'Service Health'],
    competencies: [
      'comp_dns_troubleshooting',
      'comp_ip_addressing',
      'comp_connectivity_diagnostics',
      'comp_network_topology',
      'comp_system_monitoring'
    ]
  },
  digital_literacy: {
    id: 'digital_literacy',
    title: 'General Digital Literacy',
    subtitle: 'Account hardening, safe browsing & privacy',
    description: 'Secure personal accounts with multi-factor authentication, audit app permissions, spot deceptive websites, and protect device privacy.',
    icon: 'Laptop',
    color: 'from-rose-500/20 to-orange-500/20 text-rose-400 border-rose-500/30',
    accentHex: '#F43F5E',
    totalMissions: 3,
    tags: ['MFA Hardening', 'Safe Browsing', 'Privacy Controls', 'Password Hygiene', 'Device Security'],
    competencies: [
      'comp_mfa_hardening',
      'comp_privacy_audit',
      'comp_safe_browsing',
      'comp_info_verification'
    ]
  }
};

export const INITIAL_COMPETENCIES: Competency[] = [
  // Fraud & Digital Safety
  {
    id: 'comp_upi_verification',
    domainId: 'fraud_safety',
    name: 'Independent Payment Verification',
    description: 'Verify financial inflows directly inside legitimate banking apps rather than trusting sender-provided media.',
    level: 'beginner',
    evidenceStatus: 'not_assessed',
    score: 0,
    assessedTasksCount: 0,
    keyIndicators: ['Checks bank passbook/SMS directly', 'Refuses PIN for incoming funds', 'Distinguishes collect request from credit']
  },
  {
    id: 'comp_fake_screenshot_detection',
    domainId: 'fraud_safety',
    name: 'Fake Screenshot & Proof Analysis',
    description: 'Identify synthetic, altered, or template-generated payment receipts by inspecting fonts, alignment, and transaction IDs.',
    level: 'intermediate',
    evidenceStatus: 'not_assessed',
    score: 0,
    assessedTasksCount: 0,
    keyIndicators: ['Detects mismatched font kerning', 'Verifies UTR format', 'Flags missing bank timestamp']
  },
  {
    id: 'comp_qr_safety',
    domainId: 'fraud_safety',
    name: 'QR Code & Collect Request Safety',
    description: 'Recognizes that scanning a QR code or entering a UPI PIN transfers funds out, never accepts funds in.',
    level: 'beginner',
    evidenceStatus: 'not_assessed',
    score: 0,
    assessedTasksCount: 0,
    keyIndicators: ['Understands PIN is strictly debit', 'Rejects remote QR scans for refunds', 'Identifies malicious collect requests']
  },
  {
    id: 'comp_kyc_fraud_awareness',
    domainId: 'fraud_safety',
    name: 'KYC & Impersonation Defense',
    description: 'Identifies fraudulent SMS/calls claiming bank/SIM deactivation and demanding remote access apps or OTPs.',
    level: 'beginner',
    evidenceStatus: 'not_assessed',
    score: 0,
    assessedTasksCount: 0,
    keyIndicators: ['Refuses AnyDesk/TeamViewer installs', 'Never shares Aadhaar/PAN OTP over call', 'Contacts official branch number directly']
  },

  // Cybersecurity
  {
    id: 'comp_phishing_investigation',
    domainId: 'cybersecurity',
    name: 'Email & Domain Phishing Analysis',
    description: 'Examines Return-Path, DKIM/SPF headers, and spoofed display domains to uncover spear-phishing campaigns.',
    level: 'intermediate',
    evidenceStatus: 'not_assessed',
    score: 0,
    assessedTasksCount: 0,
    keyIndicators: ['Inspects SMTP headers', 'Spots lookalike domains (e.g. paypa1.com)', 'Assesses urgency and credential harvesting forms']
  },
  {
    id: 'comp_auth_security',
    domainId: 'cybersecurity',
    name: 'Authentication & Session Hardening',
    description: 'Evaluates password entropy, brute-force protections, session token invalidation, and FIDO2 MFA.',
    level: 'intermediate',
    evidenceStatus: 'not_assessed',
    score: 0,
    assessedTasksCount: 0,
    keyIndicators: ['Enforces hardware MFA keys', 'Detects credential stuffing anomalies', 'Terminates orphaned active sessions']
  },
  {
    id: 'comp_incident_containment',
    domainId: 'cybersecurity',
    name: 'Incident Prioritization & Containment',
    description: 'Triages active threats rapidly, isolates affected endpoints, and preserves forensic volatile memory.',
    level: 'advanced',
    evidenceStatus: 'not_assessed',
    score: 0,
    assessedTasksCount: 0,
    keyIndicators: ['Isolates host without rebooting', 'Revokes compromised API tokens', 'Drafts timeline with forensic timestamps']
  },
  {
    id: 'comp_security_log_analysis',
    domainId: 'cybersecurity',
    name: 'Security Log Forensics',
    description: 'Correlates authentication logs, firewall denies, and web server status codes to map attacker lateral movement.',
    level: 'intermediate',
    evidenceStatus: 'not_assessed',
    score: 0,
    assessedTasksCount: 0,
    keyIndicators: ['Traces source IP anomalies', 'Filters event IDs (e.g., 4624, 4625)', 'Correlates timestamps across services']
  },
  {
    id: 'comp_appsec_basics',
    domainId: 'cybersecurity',
    name: 'Application Vulnerability Assessment',
    description: 'Detects OWASP Top 10 risks including Broken Object Level Authorization (IDOR) and injection flaws in HTTP APIs.',
    level: 'intermediate',
    evidenceStatus: 'not_assessed',
    score: 0,
    assessedTasksCount: 0,
    keyIndicators: ['Identifies unprotected numeric IDs in endpoints', 'Selects parameterized queries over string concatenation', 'Validates authorization tokens per object']
  },

  // Software Development
  {
    id: 'comp_code_debugging',
    domainId: 'software_dev',
    name: 'Root Cause Code Debugging',
    description: 'Analyzes call stacks, error logs, and logic branches to locate and rectify non-trivial bugs.',
    level: 'intermediate',
    evidenceStatus: 'not_assessed',
    score: 0,
    assessedTasksCount: 0,
    keyIndicators: ['Traces variable mutation', 'Identifies off-by-one boundary conditions', 'Recognizes null pointer dereferences']
  },
  {
    id: 'comp_async_logic',
    domainId: 'software_dev',
    name: 'Asynchronous State & Concurrency',
    description: 'Prevents race conditions, manages Promise rejections, and handles cancellation tokens in UI state machines.',
    level: 'intermediate',
    evidenceStatus: 'not_assessed',
    score: 0,
    assessedTasksCount: 0,
    keyIndicators: ['Applies debounce/cancel on rapid requests', 'Catches unhandled Promise rejections', 'Maintains consistent optimistic UI rollback']
  },
  {
    id: 'comp_edge_case_handling',
    domainId: 'software_dev',
    name: 'Boundary & Edge-Case Resilience',
    description: 'Anticipates malformed inputs, empty sets, unicode overflow, and high-precision financial rounding errors.',
    level: 'intermediate',
    evidenceStatus: 'not_assessed',
    score: 0,
    assessedTasksCount: 0,
    keyIndicators: ['Tests zero/negative numbers', 'Validates UTF-8 length constraints', 'Handles missing keys in nested payloads']
  },

  // Data & AI
  {
    id: 'comp_data_cleaning',
    domainId: 'data_ai',
    name: 'Data Cleaning & Normalization',
    description: 'Detects duplicate keys, handles missing values methodically, and sanitizes date/time formats across disparate sources.',
    level: 'beginner',
    evidenceStatus: 'not_assessed',
    score: 0,
    assessedTasksCount: 0,
    keyIndicators: ['Deduplicates composite IDs', 'Chooses appropriate imputation vs drop', 'Converts timestamps to UTC ISO standards']
  },
  {
    id: 'comp_sql_queries',
    domainId: 'data_ai',
    name: 'Analytical SQL & Data Extraction',
    description: 'Writes efficient multi-table joins, aggregations, window functions, and filtered queries to answer business hypotheses.',
    level: 'intermediate',
    evidenceStatus: 'not_assessed',
    score: 0,
    assessedTasksCount: 0,
    keyIndicators: ['Constructs GROUP BY with HAVING correctly', 'Selects INNER vs LEFT JOIN properly', 'Utilizes indexes and avoids Cartesian products']
  },
  {
    id: 'comp_anomaly_detection',
    domainId: 'data_ai',
    name: 'Statistical Anomaly Discrimination',
    description: 'Distinguishes genuine operational outliers from sensor/logging errors and malicious spike patterns.',
    level: 'intermediate',
    evidenceStatus: 'not_assessed',
    score: 0,
    assessedTasksCount: 0,
    keyIndicators: ['Computes IQR and Z-scores', 'Checks context before discarding extremes', 'Correlates anomalies with known calendar events']
  },
  {
    id: 'comp_ai_output_evaluation',
    domainId: 'data_ai',
    name: 'AI Fact-Checking & Hallucination Audit',
    description: 'Critically evaluates LLM-generated code and prose, catches hallucinated APIs, and tests claims against primary sources.',
    level: 'beginner',
    evidenceStatus: 'not_assessed',
    score: 0,
    assessedTasksCount: 0,
    keyIndicators: ['Validates imported library versions', 'Checks source citations independently', 'Recognizes confident falsehoods']
  },

  // IT & Networking
  {
    id: 'comp_dns_troubleshooting',
    domainId: 'it_networking',
    name: 'DNS vs IP Layer Diagnostics',
    description: 'Diagnoses resolution failures by comparing domain lookups with raw IP connectivity and checking authoritative records.',
    level: 'beginner',
    evidenceStatus: 'not_assessed',
    score: 0,
    assessedTasksCount: 0,
    keyIndicators: ['Tests direct IP vs hostname', 'Inspects nslookup/dig records', 'Flushes local resolver caches']
  },
  {
    id: 'comp_connectivity_diagnostics',
    domainId: 'it_networking',
    name: 'Network Routing & CLI Triage',
    description: 'Interprets traceroute hops, ping packet loss, ICMP TTL values, and subnet gateway misconfigurations.',
    level: 'intermediate',
    evidenceStatus: 'not_assessed',
    score: 0,
    assessedTasksCount: 0,
    keyIndicators: ['Pinpoints gateway drops in traceroute', 'Differentiates MTU fragmentation from firewall blocks', 'Verifies correct subnet mask allocation']
  },

  // Digital Literacy
  {
    id: 'comp_mfa_hardening',
    domainId: 'digital_literacy',
    name: 'Account & Credential Hardening',
    description: 'Implements password managers, authenticator apps (TOTP), and reviews active session device authorizations.',
    level: 'beginner',
    evidenceStatus: 'not_assessed',
    score: 0,
    assessedTasksCount: 0,
    keyIndicators: ['Replaces SMS OTP with app authenticator', 'Audits Google/Apple third-party app permissions', 'Stores emergency backup codes securely']
  }
];
