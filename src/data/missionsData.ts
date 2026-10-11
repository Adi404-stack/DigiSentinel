import { MissionDefinition } from '../types/missions';

export const MISSIONS: MissionDefinition[] = [
  // Mission 1: Cyber Fraud Investigator
  {
    id: 'fraud_investigator',
    title: 'Cyber Fraud Investigator',
    role: 'Junior Security Analyst',
    department: 'Digital Forensics & Incident Response (DFIR)',
    domainId: 'cybersecurity',
    difficulty: 'intermediate',
    estimatedMinutes: 12,
    xpReward: 350,
    badgeId: 'badge_fraud_investigator',
    briefing: {
      summary: 'A finance manager reported an unauthorized wire transfer attempt for $84,500 after clicking what appeared to be an internal payroll notice. Synthetic auth logs, email headers, and IP telemetry are ready for analysis.',
      organization: 'Aegis Global Financial Services',
      incidentTime: 'Today at 09:42 UTC',
      objectives: [
        'Analyze suspicious email headers and identify the spear-phishing vector',
        'Correlate authentication logs across geographically distant IP locations',
        'Reconstruct the chronological attacker intrusion timeline',
        'Execute high-priority containment measures to prevent credential reuse'
      ],
      allowedTools: ['Email Header Inspector', 'Auth Log Correlator', 'GeoIP Tracer', 'Containment Console'],
      safetyNotice: 'All data, IP addresses, and email logs are synthetic artifacts within an isolated sandbox.'
    },
    skillsTested: [
      'Email Header Forensics',
      'Geographical Anomaly Detection',
      'Event Timeline Reconstruction',
      'Identity Containment Strategy'
    ],
    tasks: [
      {
        id: 'fi_task_1',
        stepNumber: 1,
        title: 'Identify the Initial Phishing Attack Vector',
        instruction: 'Inspect the email headers and identify the spoofed sender address, SPF status, and deceptive URL.',
        type: 'log_analysis',
        rubricCriterion: 'accuracy',
        completed: false
      },
      {
        id: 'fi_task_2',
        stepNumber: 2,
        title: 'Correlate Authentication Logs and Impossible Travel',
        instruction: 'Identify the compromised account and flag the geographic anomaly where logins occurred from New York and Bucharest within 14 minutes.',
        type: 'log_analysis',
        rubricCriterion: 'evidenceReasoning',
        completed: false
      },
      {
        id: 'fi_task_3',
        stepNumber: 3,
        title: 'Reconstruct the Incident Timeline',
        instruction: 'Order the four critical incident phases in chronological sequence.',
        type: 'select',
        rubricCriterion: 'accuracy',
        completed: false
      },
      {
        id: 'fi_task_4',
        stepNumber: 4,
        title: 'Execute Immediate Containment Actions',
        instruction: 'Select and prioritize the containment actions that mitigate risk without destroying audit logs.',
        type: 'incident_triage',
        rubricCriterion: 'riskAwareness',
        completed: false
      }
    ]
  },

  // Mission 2: Debug the Broken Application
  {
    id: 'debug_broken_app',
    title: 'Debug the Broken Application',
    role: 'Junior Software Developer',
    department: 'Platform Engineering',
    domainId: 'software_dev',
    difficulty: 'intermediate',
    estimatedMinutes: 10,
    xpReward: 300,
    badgeId: 'badge_bug_hunter',
    briefing: {
      summary: 'A critical payment cart calculation module has failed unit tests in CI. Customers are experiencing infinite spinners and price calculation errors during checkout.',
      organization: 'HyperCommerce Cloud',
      incidentTime: 'Build Pipeline #4829',
      objectives: [
        'Review the broken TypeScript code and reproduce failing test cases',
        'Isolate the race condition in the asynchronous pricing fetcher',
        'Apply a clean patch handling both the discount cap and empty cart edge cases',
        'Verify test suite passes with 100% test coverage'
      ],
      allowedTools: ['Interactive Code Editor', 'Live Test Suite Runner', 'Diff Inspector'],
      safetyNotice: 'The code sandbox executes in a deterministic simulated runtime environment.'
    },
    skillsTested: [
      'TypeScript Code Debugging',
      'Asynchronous State Resilience',
      'Boundary & Edge Case Analysis',
      'Unit Test Verification'
    ],
    tasks: [
      {
        id: 'dba_task_1',
        stepNumber: 1,
        title: 'Reproduce the Test Failure',
        instruction: 'Run the test suite and identify which test assertion fails in the checkout pricing module.',
        type: 'code',
        rubricCriterion: 'accuracy',
        completed: false
      },
      {
        id: 'dba_task_2',
        stepNumber: 2,
        title: 'Isolate the Race Condition and Calculation Flaw',
        instruction: 'Locate the variable mutation bug and the unhandled Promise cancellation.',
        type: 'code',
        rubricCriterion: 'evidenceReasoning',
        completed: false
      },
      {
        id: 'dba_task_3',
        stepNumber: 3,
        title: 'Apply the Resilient Refactor',
        instruction: 'Select the optimal patch that satisfies all boundary conditions and respects the maximum discount ceiling.',
        type: 'code',
        rubricCriterion: 'efficiency',
        completed: false
      },
      {
        id: 'dba_task_4',
        stepNumber: 4,
        title: 'Verify Against Edge-Case Test Suite',
        instruction: 'Run the complete regression suite including negative subtotals and high volume orders.',
        type: 'code',
        rubricCriterion: 'accuracy',
        completed: false
      }
    ]
  },

  // Mission 3: Network Troubleshooting
  {
    id: 'network_troubleshoot',
    title: 'Network Troubleshooting Engineer',
    role: 'Junior IT Engineer',
    department: 'Infrastructure Operations',
    domainId: 'it_networking',
    difficulty: 'beginner',
    estimatedMinutes: 10,
    xpReward: 280,
    badgeId: 'badge_network_ninja',
    briefing: {
      summary: 'Workstations in the accounting department have suddenly lost connectivity to the billing database server. Internal switch and gateway connectivity are in question.',
      organization: 'Apex Logistics Corp',
      incidentTime: '11:15 AM Local Time',
      objectives: [
        'Inspect the interactive network topology map',
        'Execute simulated diagnostic commands (ping, nslookup, ipconfig, traceroute)',
        'Pinpoint the misconfigured default gateway and subnet mask mismatch',
        'Apply configuration correction and confirm end-to-end packet delivery'
      ],
      allowedTools: ['Interactive Topology Map', 'Simulated Diagnostic Shell (CLI)', 'Device Config Editor'],
      safetyNotice: 'Topology simulation responds deterministically to ICMP and ARP commands.'
    },
    skillsTested: [
      'Subnet Mask Allocation',
      'Default Gateway Troubleshooting',
      'DNS vs IP Connectivity',
      'Command-Line Diagnostics'
    ],
    tasks: [
      {
        id: 'net_task_1',
        stepNumber: 1,
        title: 'Diagnose Connectivity via CLI',
        instruction: 'Run diagnostic commands (ping gateway, nslookup server) to isolate which hop drops traffic.',
        type: 'command',
        rubricCriterion: 'accuracy',
        completed: false
      },
      {
        id: 'net_task_2',
        stepNumber: 2,
        title: 'Inspect Device Configuration',
        instruction: 'Inspect Host-A adapter properties and identify why it cannot communicate outside its subnet.',
        type: 'command',
        rubricCriterion: 'evidenceReasoning',
        completed: false
      },
      {
        id: 'net_task_3',
        stepNumber: 3,
        title: 'Update Host Gateway & DNS Settings',
        instruction: 'Apply the correct default gateway address (192.168.1.1) to restore upstream routing.',
        type: 'command',
        rubricCriterion: 'efficiency',
        completed: false
      },
      {
        id: 'net_task_4',
        stepNumber: 4,
        title: 'Confirm Packet Delivery',
        instruction: 'Run ping to the destination database (10.0.5.20) and verify 0% packet loss.',
        type: 'command',
        rubricCriterion: 'accuracy',
        completed: false
      }
    ]
  },

  // Mission 4: Application Security Analyst
  {
    id: 'appsec_analyst',
    title: 'Application Security Analyst',
    role: 'Junior AppSec Analyst',
    department: 'Product Security',
    domainId: 'cybersecurity',
    difficulty: 'intermediate',
    estimatedMinutes: 12,
    xpReward: 360,
    badgeId: 'badge_appsec_shield',
    briefing: {
      summary: 'A user reported being able to view other users’ private tax documents by modifying numbers in their browser address bar. You must audit the API endpoint, prove the vulnerability, and implement the remediation.',
      organization: 'FinSecure SaaS',
      incidentTime: 'Security Advisory SEC-2026-08',
      objectives: [
        'Intercept and analyze HTTP GET /api/documents/1048 request and response',
        'Identify Broken Object Level Authorization (IDOR) and missing access control',
        'Formulate the security impact assessment and exploit chain',
        'Select the cryptographically sound remediation and verify enforcement'
      ],
      allowedTools: ['HTTP Request/Response Inspector', 'Parameter Tamper Tool', 'Code Patch Verifier'],
      safetyNotice: 'All API interactions take place within an isolated, ethical educational mock environment.'
    },
    skillsTested: [
      'IDOR Vulnerability Analysis',
      'HTTP Header & Payload Inspection',
      'OWASP API Security Top 10',
      'Secure Access Control Remediation'
    ],
    tasks: [
      {
        id: 'appsec_task_1',
        stepNumber: 1,
        title: 'Inspect the HTTP Request & Payload',
        instruction: 'Examine the intercepted API call and note the absence of tenant ownership verification in the query parameter.',
        type: 'log_analysis',
        rubricCriterion: 'accuracy',
        completed: false
      },
      {
        id: 'appsec_task_2',
        stepNumber: 2,
        title: 'Demonstrate the IDOR Exploit Safely',
        instruction: 'Modify the document ID parameter from 1048 to 1049 and observe the unauthorized data disclosure.',
        type: 'command',
        rubricCriterion: 'evidenceReasoning',
        completed: false
      },
      {
        id: 'appsec_task_3',
        stepNumber: 3,
        title: 'Assess Business & Compliance Risk',
        instruction: 'Classify the severity based on CVSS scoring criteria and data privacy impact.',
        type: 'select',
        rubricCriterion: 'riskAwareness',
        completed: false
      },
      {
        id: 'appsec_task_4',
        stepNumber: 4,
        title: 'Deploy Authorization Middleware Fix',
        instruction: 'Verify the patch enforcing session-bound document ownership before database fetch.',
        type: 'code',
        rubricCriterion: 'accuracy',
        completed: false
      }
    ]
  },

  // Mission 5: Data Detective
  {
    id: 'data_detective',
    title: 'Data Detective',
    role: 'Junior Data Analyst',
    department: 'Business Intelligence & Risk Analytics',
    domainId: 'data_ai',
    difficulty: 'intermediate',
    estimatedMinutes: 12,
    xpReward: 320,
    badgeId: 'badge_data_detective',
    briefing: {
      summary: 'The quarterly revenue report shows an unexplained $1.2M discrepancy. The raw transaction table contains duplicates, inconsistent date formats, missing customer IDs, and extreme outlier records.',
      organization: 'VentureMetrics Inc.',
      incidentTime: 'Q3 Financial Reconciliation',
      objectives: [
        'Explore the raw dataset containing 60 dirty transactions',
        'Run analytical SQL queries to detect duplicate order IDs and null references',
        'Execute data hygiene cleaning operations (deduplication, date standardization)',
        'Produce the clean metrics chart and present evidence-based findings'
      ],
      allowedTools: ['Interactive SQL Console', 'Dataset Table Viewer', 'Data Cleaning Pipeline', 'Dynamic Charts'],
      safetyNotice: 'Synthetic enterprise telemetry generated for educational forensics.'
    },
    skillsTested: [
      'SQL Query Composition',
      'Data Cleaning & Deduplication',
      'Outlier Discrimination',
      'Evidence-Based Reporting'
    ],
    tasks: [
      {
        id: 'dd_task_1',
        stepNumber: 1,
        title: 'Query and Locate Duplicate Records',
        instruction: 'Write or execute a query with GROUP BY and HAVING count(*) > 1 to find duplicate transactions.',
        type: 'sql',
        rubricCriterion: 'accuracy',
        completed: false
      },
      {
        id: 'dd_task_2',
        stepNumber: 2,
        title: 'Clean Anomalous & Null Values',
        instruction: 'Apply the data cleaning filters to remove fake test accounts and standardize timestamps.',
        type: 'sql',
        rubricCriterion: 'efficiency',
        completed: false
      },
      {
        id: 'dd_task_3',
        stepNumber: 3,
        title: 'Identify the Single Fraudulent Outlier',
        instruction: 'Spot the single transaction with $1,250,000 entered with inverted currency symbol.',
        type: 'log_analysis',
        rubricCriterion: 'evidenceReasoning',
        completed: false
      },
      {
        id: 'dd_task_4',
        stepNumber: 4,
        title: 'Generate True Reconciled Metrics',
        instruction: 'Execute the final clean aggregate query to compute the true quarterly revenue.',
        type: 'sql',
        rubricCriterion: 'accuracy',
        completed: false
      }
    ]
  },

  // Mission 6: Production Incident Responder
  {
    id: 'incident_responder',
    title: 'Production Incident Responder',
    role: 'Junior DevOps / SRE',
    department: 'Site Reliability Engineering',
    domainId: 'cybersecurity',
    difficulty: 'advanced',
    estimatedMinutes: 14,
    xpReward: 400,
    badgeId: 'badge_uptime_hero',
    briefing: {
      summary: 'At 14:02 UTC, the checkout service error rate surged from 0.05% to 42.8% (HTTP 502/504 Bad Gateway). P99 latency skyrocketed to 9,800ms. SRE on-call was paged.',
      organization: 'CloudScale Microservices Platform',
      incidentTime: '14:02 UTC (Active Outage)',
      objectives: [
        'Monitor live telemetry charts (HTTP error rate, latency, database pool connections)',
        'Correlate recent Git deployment releases with telemetry spikes',
        'Formulate and validate the root cause hypothesis using container logs',
        'Execute immediate production rollback and verify service health recovery'
      ],
      allowedTools: ['Live Telemetry Dashboard', 'Container Log Streamer', 'Deployment Rollback Console', 'Postmortem Builder'],
      safetyNotice: 'High-fidelity outage simulator designed for safe SRE operational drill training.'
    },
    skillsTested: [
      'Telemetry & Metric Correlation',
      'Log Analysis under Outage Pressure',
      'Hypothesis Formulation',
      'Safe Production Rollback Triage'
    ],
    tasks: [
      {
        id: 'ir_task_1',
        stepNumber: 1,
        title: 'Analyze Telemetry Charts',
        instruction: 'Inspect the live graphs: identify whether the bottleneck is CPU starvation, database connection exhaustion, or memory leak.',
        type: 'log_analysis',
        rubricCriterion: 'evidenceReasoning',
        completed: false
      },
      {
        id: 'ir_task_2',
        stepNumber: 2,
        title: 'Inspect Pod Container Logs',
        instruction: 'Search container logs for fatal exceptions: find the unhandled DB pool timeout error.',
        type: 'log_analysis',
        rubricCriterion: 'accuracy',
        completed: false
      },
      {
        id: 'ir_task_3',
        stepNumber: 3,
        title: 'Execute Safe Production Rollback',
        instruction: 'Trigger deployment rollback from v2.4.1 to stable v2.4.0 to restore healthy pods.',
        type: 'command',
        rubricCriterion: 'riskAwareness',
        completed: false
      },
      {
        id: 'ir_task_4',
        stepNumber: 4,
        title: 'Verify Service Stabilization & Postmortem',
        instruction: 'Confirm error rate drops below 0.1% and submit the postmortem root cause summary.',
        type: 'select',
        rubricCriterion: 'accuracy',
        completed: false
      }
    ]
  }
];
