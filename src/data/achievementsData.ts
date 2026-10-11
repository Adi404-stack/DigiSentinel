import { Achievement } from '../types/user';

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach_sentinel_initiate',
    title: 'Sentinel Initiate',
    description: 'Complete your first Skill Discovery diagnostic on the Skill Radar.',
    icon: 'Compass',
    category: 'radar',
    xpValue: 100
  },
  {
    id: 'ach_fraud_shield',
    title: 'Fraud Shield',
    description: 'Accurately identify a counterfeit UPI payment screenshot without falling for collect traps.',
    icon: 'ShieldCheck',
    category: 'fraud',
    xpValue: 150
  },
  {
    id: 'ach_packet_whisperer',
    title: 'Packet Whisperer',
    description: 'Isolate and resolve a DNS layer network routing failure using diagnostic CLI tools.',
    icon: 'Network',
    category: 'radar',
    xpValue: 200
  },
  {
    id: 'ach_bug_hunter',
    title: 'Precision Bug Hunter',
    description: 'Solve the broken checkout application mission with 100% test suite pass rate.',
    icon: 'Bug',
    category: 'dev',
    xpValue: 250
  },
  {
    id: 'ach_dfir_analyst',
    title: 'DFIR Specialist',
    description: 'Complete the Cyber Fraud Investigator mission and reconstruct the full threat timeline.',
    icon: 'Search',
    category: 'cyber',
    xpValue: 300
  },
  {
    id: 'ach_uptime_guardian',
    title: 'Uptime Guardian',
    description: 'Mitigate a 40% production outage in under 10 minutes and publish an incident postmortem.',
    icon: 'Activity',
    category: 'sre',
    xpValue: 350
  }
];
