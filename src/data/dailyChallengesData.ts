export interface DailyChallenge {
  id: string;
  dayIndex: number; // 0 to 6 for day-of-week cycling or day-of-year
  category:
    | 'phishing'
    | 'password'
    | 'privacy'
    | 'fraud'
    | 'technical_reasoning'
    | 'programming'
    | 'secure_coding';
  categoryLabel: string;
  title: string;
  scenario: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedMinutes: number;
  evidence: {
    type: 'email' | 'code' | 'sms' | 'terminal' | 'config';
    title: string;
    content: string;
  };
  hints: [
    { label: 'Tactical Hint (Observation)'; hint: string },
    { label: 'Deep Mechanism Hint (Architecture)'; hint: string }
  ];
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
  explanation: {
    overview: string;
    defenseRule: string;
    realWorldImpact: string;
  };
}

export const DAILY_CHALLENGES: DailyChallenge[] = [
  // Day 0 (Sunday / Rotation 0) - Phishing Detection
  {
    id: 'dc_0_phishing_subdomain',
    dayIndex: 0,
    category: 'phishing',
    categoryLabel: 'Phishing Detection',
    title: 'The Subdomain Deception Attack',
    scenario: 'You receive an urgent push notification from what appears to be your cloud storage provider: "Storage limit 99% exceeded. Uploads disabled. Review files immediately to prevent automatic deletion within 24 hours."',
    difficulty: 'beginner',
    estimatedMinutes: 3,
    evidence: {
      type: 'email',
      title: 'Target Link URL Inspection',
      content: `Displayed Text: https://drive.google.com/cleanup/storage
Actual Target Href: https://drive.google.com.storage-cleanup-verify.com/login
SSL Certificate: Valid (Issued by Let's Encrypt to storage-cleanup-verify.com)`
    },
    hints: [
      {
        label: 'Tactical Hint (Observation)',
        hint: 'Examine the characters directly preceding the first single forward slash "/" in the domain.'
      },
      {
        label: 'Deep Mechanism Hint (Architecture)',
        hint: 'In DNS parsing, the true registered domain is determined by the last two labels before the TLD (here: "storage-cleanup-verify.com"). "drive.google.com" is merely an arbitrary third-level subdomain created by the attacker.'
      }
    ],
    options: [
      {
        id: 'opt_a',
        text: 'Click the link immediately because the SSL padlock is green and valid.',
        isCorrect: false,
        feedback: 'Incorrect. SSL certificates are free and automated (e.g. Let\'s Encrypt). A valid SSL certificate only proves encrypted transit to the server; it does NOT prove the server is trustworthy.'
      },
      {
        id: 'opt_b',
        text: 'Do not click. The true domain is "storage-cleanup-verify.com", not "google.com". Log into your drive independently via your browser bookmark.',
        isCorrect: true,
        feedback: 'Correct! The attacker registered "storage-cleanup-verify.com" and prefixed it with "drive.google.com" to mislead casual observers.'
      },
      {
        id: 'opt_c',
        text: 'Reply to the sender email requesting them to extend your grace period.',
        isCorrect: false,
        feedback: 'Incorrect. Replying to phishing emails confirms that your email address is active and monitored, inviting further automated attacks.'
      }
    ],
    explanation: {
      overview: 'Attackers frequently exploit hierarchical DNS naming by prepending trusted brand names as subdomains of their own malicious domain.',
      defenseRule: 'Always read domain names from right to left starting from the first slash back to the second-level domain.',
      realWorldImpact: 'Subdomain spoofing accounts for a large percentage of high-volume credential harvesting campaigns.'
    }
  },

  // Day 1 (Monday / Rotation 1) - Password Security
  {
    id: 'dc_1_password_entropy',
    dayIndex: 1,
    category: 'password',
    categoryLabel: 'Password Security',
    title: 'The Password Complexity Illusion',
    scenario: 'A company policy requires passwords to be changed every 30 days and contain at least 8 characters with 1 capital letter, 1 number, and 1 symbol. An employee creates "P@ssw0rd1!".',
    difficulty: 'intermediate',
    estimatedMinutes: 3,
    evidence: {
      type: 'terminal',
      title: 'Hashcat / Offline Dictionary Audit Output',
      content: `$ hashcat -m 1000 -a 0 ntlm_hashes.txt rockyou.txt -r rules/best64.rule
Cracked: 5b41362a9b06edd9... : P@ssw0rd1!
Time Elapsed: 0.003 seconds (Top 200 most common enterprise passwords)`
    },
    hints: [
      {
        label: 'Tactical Hint (Observation)',
        hint: 'Look at the time elapsed to crack the password despite fulfilling four complexity requirements.'
      },
      {
        label: 'Deep Mechanism Hint (Architecture)',
        hint: 'Rule-based dictionary attacks automatically substitute "@" for "a", "0" for "o", and append "1!". Length and unpredictability (passphrases) provide far higher entropy than standard substitutions.'
      }
    ],
    options: [
      {
        id: 'opt_a',
        text: 'The password is exceptionally strong because it satisfies 4 distinct character sets.',
        isCorrect: false,
        feedback: 'Incorrect. Predictable substitutions (l33tspeak) are explicitly included in dictionary attack rule-files.'
      },
      {
        id: 'opt_b',
        text: 'The password is weak because predictable patterns have low entropy. A four-word random passphrase (e.g. "correct-horse-battery-staple") is vastly more resilient.',
        isCorrect: true,
        feedback: 'Correct! Modern security guidelines (such as NIST SP 800-63B) favor long passphrases and MFA over frequent forced rotations and rigid pattern requirements.'
      },
      {
        id: 'opt_c',
        text: 'Changing the exclamation mark to a question mark would make it uncrackable.',
        isCorrect: false,
        feedback: 'Incorrect. Dictionary rules check all common trailing punctuation in microseconds.'
      }
    ],
    explanation: {
      overview: 'Human predictable substitutions do not defeat automated offline cracking tools.',
      defenseRule: 'Prioritize passphrase length (16+ characters) and implement Multi-Factor Authentication (MFA) rather than reliance on complex 8-character strings.',
      realWorldImpact: 'Credential stuffing attacks systematically crack patterned 8-character passwords within minutes.'
    }
  },

  // Day 2 (Tuesday / Rotation 2) - Digital Privacy
  {
    id: 'dc_2_privacy_exif',
    dayIndex: 2,
    category: 'privacy',
    categoryLabel: 'Digital Privacy',
    title: 'The Unintentional Metadata Leak',
    scenario: 'A team member posts an image of an architectural blueprint of their home office setup on a public technical forum to ask for desk ergonomic feedback.',
    difficulty: 'intermediate',
    estimatedMinutes: 4,
    evidence: {
      type: 'terminal',
      title: 'ExifTool Output on Uploaded JPEG',
      content: `$ exiftool office_setup.jpg
Camera Model: iPhone 15 Pro
GPS Latitude: 18 deg 31' 14.28" N
GPS Longitude: 73 deg 50' 42.11" E (Pinpoints residential apartment)
Date/Time Original: 2026:10:11 19:42:10
Lens Make: Apple 24mm f/1.78`
    },
    hints: [
      {
        label: 'Tactical Hint (Observation)',
        hint: 'Inspect the GPS coordinates included directly in the image metadata.'
      },
      {
        label: 'Deep Mechanism Hint (Architecture)',
        hint: 'EXIF metadata embedded in raw smartphone photos contains precise geospatial telemetry unless stripped by an intermediary privacy proxy or explicitly disabled in camera settings.'
      }
    ],
    options: [
      {
        id: 'opt_a',
        text: 'There is no privacy risk because the photo itself only shows a desk and monitor.',
        isCorrect: false,
        feedback: 'Incorrect. The image file contains hidden EXIF metadata containing exact residential GPS coordinates.'
      },
      {
        id: 'opt_b',
        text: 'Strip EXIF metadata prior to public upload or verify that the hosting service automatically sanitizes image headers.',
        isCorrect: true,
        feedback: 'Correct! Scrubbing EXIF tags prevents exposing home or office geospatial coordinates.'
      },
      {
        id: 'opt_c',
        text: 'Rename the file from office_setup.jpg to desk.png to delete GPS coordinates.',
        isCorrect: false,
        feedback: 'Incorrect. Changing a file extension does not erase internal EXIF data chunks.'
      }
    ],
    explanation: {
      overview: 'Digital images taken on mobile devices embed EXIF data containing exact device identifiers, timestamps, and GPS coordinates.',
      defenseRule: 'Never share raw camera files publicly without confirming EXIF data has been stripped.',
      realWorldImpact: 'Stalking and targeted physical reconnaissance frequently exploit unscrubbed metadata from public social media uploads.'
    }
  },

  // Day 3 (Wednesday / Rotation 3) - Online Fraud Awareness
  {
    id: 'dc_3_fraud_urgency',
    dayIndex: 3,
    category: 'fraud',
    categoryLabel: 'Online Fraud Awareness',
    title: 'The "Electricity Disconnection at 9:30 PM" Scam',
    scenario: 'You receive an SMS from a standard 10-digit mobile number: "Dear Customer, Your electricity power supply will be disconnected tonight at 9:30 PM because your last month bill was not updated. Please immediately contact our Electricity Officer at 98765-XXXXX."',
    difficulty: 'beginner',
    estimatedMinutes: 2,
    evidence: {
      type: 'sms',
      title: 'Incoming SMS Message Header',
      content: `Sender: +91 91234 56789 (Personal SIM, not an approved enterprise Sender ID)
Timestamp: 18:45 IST
Message: Immediate disconnection warning. Requires calling personal mobile number and installing QuickSupport APK.`
    },
    hints: [
      {
        label: 'Tactical Hint (Observation)',
        hint: 'Official utility providers communicate via registered 6-character Alpha-numeric Header IDs (e.g., "VM-MSEDCL" or "BP-BESCOM"), never personal 10-digit mobile numbers.'
      },
      {
        label: 'Deep Mechanism Hint (Architecture)',
        hint: 'The scammer aims to induce panic so the victim calls the number, where they are instructed to install remote desktop software (e.g. AnyDesk/QuickSupport) to "verify the bill".'
      }
    ],
    options: [
      {
        id: 'opt_a',
        text: 'Call the mobile number in the SMS immediately to make a quick ₹10 payment before the power is cut off.',
        isCorrect: false,
        feedback: 'Dangerous! The scammer will direct you to install remote access tools or share your screen.'
      },
      {
        id: 'opt_b',
        text: 'Recognize the fraud triggers (personal mobile sender, urgent night deadline, direct mobile call). Verify your bill status directly on your official utility portal or electricity board app.',
        isCorrect: true,
        feedback: 'Correct! Utility boards never disconnect power at night without statutory notices, and never message from personal 10-digit numbers.'
      },
      {
        id: 'opt_c',
        text: 'Forward the message to all your family groups urging them to call the number.',
        isCorrect: false,
        feedback: 'Incorrect. Forwarding unverified alarms spreads fear and magnifies scam reach.'
      }
    ],
    explanation: {
      overview: 'Social engineering thrives on fabricated urgency and fear of service interruption.',
      defenseRule: 'Always verify claims independently through the provider\'s official app or registered portal.',
      realWorldImpact: 'Thousands of consumers lose savings daily to fake utility disconnection scams.'
    }
  },

  // Day 4 (Thursday / Rotation 4) - Technical Reasoning
  {
    id: 'dc_4_tech_dns_ttl',
    dayIndex: 4,
    category: 'technical_reasoning',
    categoryLabel: 'Technical Reasoning',
    title: 'The Stale Cache Incident',
    scenario: 'A DevOps team migrates an internal API server to a new IP address (from 10.0.1.5 to 10.0.2.8) and updates the DNS A-record. However, several microservices continue making requests to the old IP for the next 24 hours.',
    difficulty: 'intermediate',
    estimatedMinutes: 4,
    evidence: {
      type: 'config',
      title: 'Zone File Configuration',
      content: `; DNS Zone Record
api.internal.net.   86400   IN   A   10.0.2.8
; Notice the TTL (Time-To-Live) value: 86400 seconds (24 hours)`
    },
    hints: [
      {
        label: 'Tactical Hint (Observation)',
        hint: 'Inspect the TTL value (86400) associated with the DNS record.'
      },
      {
        label: 'Deep Mechanism Hint (Architecture)',
        hint: 'Downstream DNS resolvers cache records for the duration specified in the TTL field before querying the authoritative nameserver again.'
      }
    ],
    options: [
      {
        id: 'opt_a',
        text: 'The new server IP address is blocked by the OS firewall.',
        isCorrect: false,
        feedback: 'Incorrect. If it were a firewall block, requests would time out immediately rather than going to the old IP.'
      },
      {
        id: 'opt_b',
        text: 'The DNS record had an 86,400 second (24-hour) TTL, so resolvers cached the previous IP until their cache expired.',
        isCorrect: true,
        feedback: 'Correct! Prior to planned migrations, TTLs should be temporarily lowered (e.g. to 300 seconds) so switches take effect quickly.'
      },
      {
        id: 'opt_c',
        text: 'DNS does not support IP addresses with multiple octets.',
        isCorrect: false,
        feedback: 'Incorrect. IPv4 addresses always consist of four octets.'
      }
    ],
    explanation: {
      overview: 'DNS caching relies strictly on the TTL (Time-To-Live) header to minimize load on authoritative servers.',
      defenseRule: 'Lower DNS TTLs well in advance of planned infrastructure migrations.',
      realWorldImpact: 'Misconfigured TTLs during security incidents prevent rapid traffic rerouting away from compromised endpoints.'
    }
  },

  // Day 5 (Friday / Rotation 5) - Secure Coding Basics
  {
    id: 'dc_5_secure_xss',
    dayIndex: 5,
    category: 'secure_coding',
    categoryLabel: 'Secure Coding Basics',
    title: 'Cross-Site Scripting (XSS) Prevention',
    scenario: 'A developer displays a user-submitted comment directly in the DOM using "element.innerHTML = commentText;". A malicious user submits a comment containing "<img src=x onerror=alert(document.cookie)>".',
    difficulty: 'intermediate',
    estimatedMinutes: 3,
    evidence: {
      type: 'code',
      title: 'Vulnerable DOM Insertion Snippet',
      content: `// Client-side rendering:
function renderComment(comment) {
  const div = document.createElement('div');
  div.innerHTML = comment.text; // <-- Vulnerable Sink
  document.getElementById('comments').appendChild(div);
}`
    },
    hints: [
      {
        label: 'Tactical Hint (Observation)',
        hint: 'innerHTML parses any HTML tags contained in the string as executable markup.'
      },
      {
        label: 'Deep Mechanism Hint (Architecture)',
        hint: 'Using textContent or an established sanitization library (such as DOMPurify) prevents user input from being parsed by the browser\'s HTML execution engine.'
      }
    ],
    options: [
      {
        id: 'opt_a',
        text: 'Replace "innerHTML" with "textContent" or use a trusted sanitizer like DOMPurify.',
        isCorrect: true,
        feedback: 'Correct! "textContent" treats all characters purely as plaintext, neutralizing any embedded script or image execution triggers.'
      },
      {
        id: 'opt_b',
        text: 'Filter out the word "cookie" using a simple regex replace.',
        isCorrect: false,
        feedback: 'Incorrect. Blacklisting words is easily bypassed using character encoding, concatenation, or alternative payloads.'
      },
      {
        id: 'opt_c',
        text: 'The code is completely safe because modern browsers block all image tags.',
        isCorrect: false,
        feedback: 'Incorrect. "onerror" handlers on invalid image sources execute inline JavaScript across all major browsers.'
      }
    ],
    explanation: {
      overview: 'DOM-based Cross-Site Scripting occurs when untrusted data is written to an execution sink like innerHTML.',
      defenseRule: 'Contextually encode data or use safe APIs like textContent and parameterized templating.',
      realWorldImpact: 'XSS allows session token theft, unauthorized actions on behalf of users, and credential keylogging.'
    }
  },

  // Day 6 (Saturday / Rotation 6) - Programming Fundamentals
  {
    id: 'dc_6_prog_boundary',
    dayIndex: 6,
    category: 'programming',
    categoryLabel: 'Programming Fundamentals',
    title: 'Off-By-One Boundary Error',
    scenario: 'A rate limiter function allows a maximum of 5 failed login attempts before locking an account. However, an attacker is able to attempt 6 passwords before receiving a lockout.',
    difficulty: 'beginner',
    estimatedMinutes: 3,
    evidence: {
      type: 'code',
      title: 'Rate Limiter Loop Logic',
      content: `// Check attempt threshold:
const MAX_ATTEMPTS = 5;

function isLockedOut(failedAttemptsCount) {
  // Buggy comparison:
  if (failedAttemptsCount > MAX_ATTEMPTS) {
    return true; // Only locks when attempts reaches 6!
  }
  return false;
}`
    },
    hints: [
      {
        label: 'Tactical Hint (Observation)',
        hint: 'Examine the operator: strictly greater than (>) versus greater than or equal to (>=).'
      },
      {
        label: 'Deep Mechanism Hint (Architecture)',
        hint: 'When failedAttemptsCount equals 5, "5 > 5" evaluates to false, permitting a sixth attempt.'
      }
    ],
    options: [
      {
        id: 'opt_a',
        text: 'The logic is correct because 5 attempts are permitted.',
        isCorrect: false,
        feedback: 'Incorrect. The 6th attempt is allowed because "5 > 5" evaluates to false.'
      },
      {
        id: 'opt_b',
        text: 'Change the condition to "failedAttemptsCount >= MAX_ATTEMPTS" so the account locks immediately after 5 failures.',
        isCorrect: true,
        feedback: 'Correct! Changing to ">=" ensures that once the 5-attempt limit is reached, all subsequent attempts are blocked.'
      },
      {
        id: 'opt_c',
        text: 'Increase MAX_ATTEMPTS to 10.',
        isCorrect: false,
        feedback: 'Incorrect. That would increase the attacker\'s brute-force budget rather than fixing the boundary logic.'
      }
    ],
    explanation: {
      overview: 'Off-by-one errors are one of the most common boundary flaws in software engineering.',
      defenseRule: 'Write unit tests specifically targeting boundary edge cases (limit - 1, limit, limit + 1).',
      realWorldImpact: 'Boundary condition flaws often create authentication bypasses and buffer overflow vulnerabilities.'
    }
  }
];

export function getTodayChallenge(): DailyChallenge {
  // Deterministic date-based selection based on day of year
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  const challengeIndex = dayOfYear % DAILY_CHALLENGES.length;
  return DAILY_CHALLENGES[challengeIndex];
}
