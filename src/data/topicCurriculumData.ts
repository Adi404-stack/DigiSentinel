export type MasteryStatus = 'not_started' | 'learning' | 'practising' | 'proficient' | 'needs_revision';

export interface TopicModule {
  id: string;
  trackId: 'cybersecurity_fundamentals' | 'digital_privacy' | 'online_fraud' | 'technical_reasoning';
  title: string;
  shortDescription: string;
  estimatedMinutes: number;
  objectives: string[];
  explanation: string;
  practicalExample: {
    title: string;
    scenario: string;
    safeAction: string;
  };
  commonMistakes: string[];
  knowledgeCheck: {
    question: string;
    options: {
      id: string;
      text: string;
      isCorrect: boolean;
      feedback: string;
    }[];
  };
  keyTakeaway: string;
}

export interface CurriculumTrack {
  id: 'cybersecurity_fundamentals' | 'digital_privacy' | 'online_fraud' | 'technical_reasoning';
  title: string;
  tagline: string;
  description: string;
  modules: TopicModule[];
}

export const CURRICULUM_TRACKS: CurriculumTrack[] = [
  // 1. CYBERSECURITY FUNDAMENTALS
  {
    id: 'cybersecurity_fundamentals',
    title: 'Cybersecurity Fundamentals',
    tagline: 'Defensive Foundations & Access Protection',
    description: 'Learn how modern authentication protocols, perimeter defenses, and multi-layered access safeguards prevent account takeovers.',
    modules: [
      {
        id: 'cf_password_security',
        trackId: 'cybersecurity_fundamentals',
        title: 'Password Security & Entropy',
        shortDescription: 'Why length trumps complexity and how offline dictionary attacks operate.',
        estimatedMinutes: 5,
        objectives: [
          'Understand mathematical entropy in character combinations.',
          'Differentiate between online brute-force and offline hash-cracking.',
          'Formulate uncrackable yet memorable multi-word passphrases.'
        ],
        explanation: 'Passwords protect digital identities, but predictable human rules (like swapping "a" with "@") fail against modern GPUs capable of checking billions of hashes per second. True entropy comes from string length. A four-word random passphrase creates over 60 bits of entropy without requiring awkward symbols.',
        practicalExample: {
          title: 'Passphrase vs Complex String',
          scenario: 'Comparing "P@ssw0rd1!" (10 characters, cracked in 0.003 seconds by rule-files) against "solar-bicycle-winter-guitar" (28 characters, requires trillions of years of compute).',
          safeAction: 'Use password managers to generate unique 20+ character passwords for every single service, coupled with a master passphrase.'
        },
        commonMistakes: [
          'Reusing the same master password across personal email and third-party stores.',
          'Assuming that adding a trailing "!" makes an 8-letter dictionary word secure.',
          'Storing unencrypted passwords in plaintext note apps.'
        ],
        knowledgeCheck: {
          question: 'Which factor contributes most significantly to offline password cracking resistance?',
          options: [
            {
              id: 'a',
              text: 'Frequent mandatory changes every 30 days.',
              isCorrect: false,
              feedback: 'Outdated policy. Frequent mandatory changes encourage predictable patterns like Spring2026! -> Summer2026!.'
            },
            {
              id: 'b',
              text: 'Total character length and unpredictability (high entropy).',
              isCorrect: true,
              feedback: 'Correct! Exponential search spaces created by 16+ characters render offline dictionary attacks computationally unfeasible.'
            },
            {
              id: 'c',
              text: 'Using words from famous song lyrics.',
              isCorrect: false,
              feedback: 'Incorrect. Popular lyrics are part of standard dictionary wordlists.'
            }
          ]
        },
        keyTakeaway: 'Prioritize passphrase length over symbol substitutions, and never reuse credentials across services.'
      },
      {
        id: 'cf_mfa',
        trackId: 'cybersecurity_fundamentals',
        title: 'Multi-Factor Authentication (MFA)',
        shortDescription: 'App authenticators, hardware FIDO2 keys vs SMS verification.',
        estimatedMinutes: 6,
        objectives: [
          'Distinguish between something you know, something you have, and something you are.',
          'Recognize why SMS-based OTPs are vulnerable to SIM-swapping.',
          'Learn how FIDO2 / WebAuthn cryptographic keys eliminate phishing.'
        ],
        explanation: 'Multi-Factor Authentication requires two distinct authentication factors before granting access. While SMS OTPs are better than no MFA, they can be intercepted via SIM swapping or SS7 flaws. Time-based One-Time Passwords (TOTP apps) and hardware security keys (FIDO2/WebAuthn) bind the cryptographic challenge to the exact browser domain, preventing man-in-the-middle phishing.',
        practicalExample: {
          title: 'Phishing Relay vs FIDO2 Hardware Key',
          scenario: 'An attacker sets up a reverse proxy for bank-login.com. If the user enters a password and SMS code, the proxy forwards it immediately. If using a FIDO2 key, the key checks the browser origin and refuses to sign for the fake domain.',
          safeAction: 'Enable authenticator apps (TOTP) or hardware security keys on all critical accounts.'
        },
        commonMistakes: [
          'Accepting unexpected push notifications on your phone (MFA fatigue attack).',
          'Relying solely on SMS OTP for primary email and banking recovery.',
          'Disabling MFA because it feels slightly inconvenient.'
        ],
        knowledgeCheck: {
          question: 'Why are hardware security keys (FIDO2) considered superior to SMS OTP codes against sophisticated phishing?',
          options: [
            {
              id: 'a',
              text: 'Hardware keys cryptographically bind the authentication token to the verified website domain name.',
              isCorrect: true,
              feedback: 'Correct! The browser origin is evaluated by the hardware device. It will never sign a token for a counterfeit domain.'
            },
            {
              id: 'b',
              text: 'Hardware keys have longer battery life than mobile phones.',
              isCorrect: false,
              feedback: 'Incorrect. USB hardware keys do not have batteries; cryptographic domain-binding is the core defensive mechanism.'
            },
            {
              id: 'c',
              text: 'Hardware keys make passwords completely obsolete on all websites.',
              isCorrect: false,
              feedback: 'Incorrect. While passkeys are expanding, the key advantage is resistance to origin spoofing.'
            }
          ]
        },
        keyTakeaway: 'FIDO2 / TOTP authenticators neutralize credential-harvesting phishing by removing plaintext codes.'
      },
      {
        id: 'cf_phishing',
        trackId: 'cybersecurity_fundamentals',
        title: 'Phishing & Header Inspection',
        shortDescription: 'Detecting deceptive senders, SPF/DKIM misalignments, and urgency ploys.',
        estimatedMinutes: 6,
        objectives: [
          'Inspect email headers for true Return-Path and SPF validation.',
          'Identify domain typosquatting and punycode homographs.',
          'Resist psychological urgency tactics.'
        ],
        explanation: 'Phishing relies on impersonation and manufactured urgency. The "From" display name in an email client is trivially customizable. Technical defense requires examining the underlying domain and email authentication records: SPF (Sender Policy Framework), DKIM (DomainKeys Identified Mail), and DMARC.',
        practicalExample: {
          title: 'Executive Wire Transfer Request',
          scenario: 'An email displays "From: CEO Name <ceo@company.com>". Checking raw headers reveals "Return-Path: attacker@external-relay.org" and "DKIM-Signature: failed".',
          safeAction: 'Never execute financial transfers or password resets based on unverified email requests.'
        },
        commonMistakes: [
          'Trusting an email simply because it contains official logos and professional formatting.',
          'Clicking links in email to check your account instead of typing the official URL.',
          'Calling the phone number listed in the suspicious email itself.'
        ],
        knowledgeCheck: {
          question: 'What is the most definitive technical indicator that an email is spoofed?',
          options: [
            {
              id: 'a',
              text: 'The email contains spelling errors in the body text.',
              isCorrect: false,
              feedback: 'Incorrect. Modern phishing often uses flawless grammar and AI templates.'
            },
            {
              id: 'b',
              text: 'The SPF and DKIM authentication records fail or do not align with the sender domain.',
              isCorrect: true,
              feedback: 'Correct! SPF and DKIM verify whether the sending mail server was authorized by the domain owner.'
            },
            {
              id: 'c',
              text: 'The email arrived after 6:00 PM.',
              isCorrect: false,
              feedback: 'Incorrect. Timestamp has no technical correlation with spoofing.'
            }
          ]
        },
        keyTakeaway: 'Verify identity through technical headers and out-of-band communication, never by trusting the display name.'
      }
    ]
  },

  // 2. DIGITAL PRIVACY
  {
    id: 'digital_privacy',
    title: 'Digital Privacy & Surveillance Defense',
    tagline: 'Minimizing Exposure & Personal Data Trails',
    description: 'Learn how trackers, data brokers, and public profile footprints expose users to targeted social engineering and tracking.',
    modules: [
      {
        id: 'dp_data_minimization',
        trackId: 'digital_privacy',
        title: 'Data Minimization & Account Security',
        shortDescription: 'The principle of least privilege applied to personal online identities.',
        estimatedMinutes: 5,
        objectives: [
          'Understand how data brokers aggregate fragmented public information.',
          'Practice data minimization when creating online accounts.',
          'Audit and revoke third-party OAuth app authorizations.'
        ],
        explanation: 'Every form you fill out, birthday you declare publicly, and app permission you grant creates an attack surface. Data minimization means providing only the absolute minimum information required for a service to function. If a shopping app asks for your date of birth or contacts permission, decline it.',
        practicalExample: {
          title: 'Account Recovery Questions as OSINT Targets',
          scenario: 'A bank uses "What high school did you attend?" as a security question. A curious stranger finds your LinkedIn education section and answers it correctly in seconds.',
          safeAction: 'Treat security questions like secondary passwords: generate random strings and store them in a password manager.'
        },
        commonMistakes: [
          'Using your real birthdate and high school in public social profiles.',
          'Granting location and contact permissions to apps that do not require them.',
          'Leaving old, unused accounts active on abandoned web services.'
        ],
        knowledgeCheck: {
          question: 'How should you answer "security questions" (e.g. your mother’s maiden name) for online services?',
          options: [
            {
              id: 'a',
              text: 'Provide factual answers so you can recall them without checking notes.',
              isCorrect: false,
              feedback: 'Risky! Public genealogical and social records make maternal maiden names easy to discover.'
            },
            {
              id: 'b',
              text: 'Treat them as second passwords with random generated strings stored in your password manager.',
              isCorrect: true,
              feedback: 'Correct! Treating answers as cryptographic secrets prevents OSINT discovery.'
            },
            {
              id: 'c',
              text: 'Use the name of your favorite celebrity.',
              isCorrect: false,
              feedback: 'Incorrect. Favorite celebrities are easily guessed or found on social profiles.'
            }
          ]
        },
        keyTakeaway: 'The safest data is data that was never collected in the first place.'
      },
      {
        id: 'dp_tracking_cookies',
        trackId: 'digital_privacy',
        title: 'Third-Party Trackers & Fingerprinting',
        shortDescription: 'How browser fingerprinting and ad beacons profile users across the web.',
        estimatedMinutes: 5,
        objectives: [
          'Understand third-party cookie sync and canvas fingerprinting.',
          'Configure privacy-respecting browser settings.',
          'Use tracker blocking extensions and isolated browser profiles.'
        ],
        explanation: 'Even without logging in, advertising networks can build a persistent behavioral profile by fingerprinting your browser: screen resolution, installed fonts, WebGL rendering quirks, and audio context hashes combine into a unique identifier. Modern privacy browsers isolate cookies per-site and randomize fingerprint characteristics.',
        practicalExample: {
          title: 'Cross-Site Retargeting Beacon',
          scenario: 'Browsing a medical symptom website displays ads for medications on your separate news feed 10 minutes later.',
          safeAction: 'Use privacy-focused browsers, enable strict cookie isolation, and disable third-party cross-site cookies.'
        },
        commonMistakes: [
          'Assuming that "Incognito / Private Browsing" hides your IP address from websites or network providers.',
          'Installing dozens of browser extensions that can read all web traffic.',
          'Accepting "Accept All Cookies" banners without glancing at options.'
        ],
        knowledgeCheck: {
          question: 'What does standard "Private Browsing / Incognito Mode" actually accomplish?',
          options: [
            {
              id: 'a',
              text: 'It completely hides your IP address from your ISP and websites.',
              isCorrect: false,
              feedback: 'False! Incognito mode does NOT hide your IP address or encrypt your traffic from ISPs.'
            },
            {
              id: 'b',
              text: 'It prevents your local device from saving cookies and history after the window is closed.',
              isCorrect: true,
              feedback: 'Correct! Incognito only clears local session storage upon tab closure. It does not provide network anonymity.'
            },
            {
              id: 'c',
              text: 'It routes your connection through an encrypted overseas VPN tunnel.',
              isCorrect: false,
              feedback: 'False. Incognito mode is strictly a local client feature, not a VPN.'
            }
          ]
        },
        keyTakeaway: 'Incognito mode protects privacy from someone using the same computer; it does not protect privacy from the internet.'
      }
    ]
  },

  // 3. ONLINE FRAUD AWARENESS
  {
    id: 'online_fraud',
    title: 'Online Fraud & Scam Recognition',
    tagline: 'Spotting Social Engineering & Financial Tricks',
    description: 'Master the anatomy of fake payment receipts, imposter customer support agents, and deceptive delivery notifications.',
    modules: [
      {
        id: 'of_payment_upi',
        trackId: 'online_fraud',
        title: 'Payment Gateway & UPI Fraud Mechanics',
        shortDescription: 'The irreversible rules of peer-to-peer payments and QR codes.',
        estimatedMinutes: 6,
        objectives: [
          'Recognize that receiving funds NEVER requires entering a PIN.',
          'Inspect UTR numbers and independently verify inward credits.',
          'Identify counterfeit receipt generator applications.'
        ],
        explanation: 'In instant payment networks (such as UPI, Zelle, or Faster Payments), payments are push transactions. If someone claims they are sending you money, the money appears directly in your account statement. Anyone asking you to "enter your PIN to verify receiving money" or "scan a collect QR code" is initiating a debit from your balance.',
        practicalExample: {
          title: 'Counterfeit UPI Screenshot Trick',
          scenario: 'A buyer sends an image of a green-tick transaction screen with a 7-digit UTR. Passbook has no credit. Buyer insists: "System is in escrow, scan my QR to claim."',
          safeAction: 'Never release merchandise without independent credit confirmation in your banking app. Refuse to scan QR codes.'
        },
        commonMistakes: [
          'Accepting a phone screenshot as proof of bank transfer.',
          'Entering your PIN thinking it acts as a "signature of acceptance".',
          'Believing that a bank has an "escrow QR code" system for individual transfers.'
        ],
        knowledgeCheck: {
          question: 'When a stranger requests you to enter your 4 or 6-digit UPI PIN to "receive payment into your bank", what will happen?',
          options: [
            {
              id: 'a',
              text: 'The funds will be credited to your account after verification.',
              isCorrect: false,
              feedback: 'Critical Error! Entering your PIN always debits funds.'
            },
            {
              id: 'b',
              text: 'Money will immediately be debited FROM your account and sent to the stranger.',
              isCorrect: true,
              feedback: 'Correct! UPI PIN is strictly an authorization for debit. Entering it authorizes money to leave your account.'
            },
            {
              id: 'c',
              text: 'The transaction will be canceled safely without financial impact.',
              isCorrect: false,
              feedback: 'Incorrect. The transaction executes immediately.'
            }
          ]
        },
        keyTakeaway: 'Receiving money NEVER requires entering your PIN or scanning a QR code.'
      },
      {
        id: 'of_support_impersonation',
        trackId: 'online_fraud',
        title: 'Remote Access & Fake Support Scams',
        shortDescription: 'Why legitimate companies will never ask you to install AnyDesk or TeamViewer.',
        estimatedMinutes: 5,
        objectives: [
          'Identify fake customer support numbers on search engines.',
          'Understand the risks of screen-sharing and remote access tools.',
          'Safely terminate an unverified remote session.'
        ],
        explanation: 'Scammers buy search ads for keywords like "airline customer care" or "courier refund helpline". When called, they claim that resolving a refund requires installing a "diagnostic utility" (such as AnyDesk or TeamViewer). Once installed, they view bank OTPs and initiate unauthorized transfers directly.',
        practicalExample: {
          title: 'Google Maps Fake Phone Number Modification',
          scenario: 'An attacker edits the phone number on a local courier office\'s Google Maps listing to point to their call center.',
          safeAction: 'Only find customer service contact information inside the official app or verified domain.'
        },
        commonMistakes: [
          'Searching Google for "helpline numbers" and calling the top sponsored ad result.',
          'Allowing anyone access to your device screen while accessing a banking app.',
          'Reading SMS security codes aloud to a person claiming to be a bank agent.'
        ],
        knowledgeCheck: {
          question: 'What should you do if someone claiming to be a customer support agent asks you to install AnyDesk or TeamViewer to fix an account problem?',
          options: [
            {
              id: 'a',
              text: 'Install the software but monitor their mouse cursor carefully.',
              isCorrect: false,
              feedback: 'Dangerous! Remote tools allow fast automated keystroke and clipboard theft.'
            },
            {
              id: 'b',
              text: 'Refuse immediately and hang up. Legitimate support will never demand remote screen control of personal devices.',
              isCorrect: true,
              feedback: 'Correct! Remote desktop tools are the primary tool used by phone scammers to compromise personal accounts.'
            },
            {
              id: 'c',
              text: 'Ask them to email you a signed certificate before installing.',
              isCorrect: false,
              feedback: 'Incorrect. Scammers routinely send fake certificates.'
            }
          ]
        },
        keyTakeaway: 'Never grant remote desktop control or screen-sharing access to unverified phone callers.'
      }
    ]
  },

  // 4. TECHNICAL REASONING
  {
    id: 'technical_reasoning',
    title: 'Technical Reasoning & Diagnostic Logic',
    tagline: 'Systematic Problem Solving & Code Comprehension',
    description: 'Build methodical reasoning skills for root cause analysis, networking triage, and debugging unexpected system behaviors.',
    modules: [
      {
        id: 'tr_network_triage',
        trackId: 'technical_reasoning',
        title: 'OSI Network Layer Isolation',
        shortDescription: 'Differentiating between physical connectivity, DNS resolution, and application errors.',
        estimatedMinutes: 6,
        objectives: [
          'Use ping, traceroute, and nslookup in sequence.',
          'Distinguish DNS resolution failures from TCP connection timeouts.',
          'Formulate hypotheses and eliminate layers methodically.'
        ],
        explanation: 'When a web application is unreachable, amateur troubleshooting involves randomly restarting services. Senior engineers isolate the OSI layers from bottom to top: Layer 3 (can I ping the IP?), Layer 7 DNS (does the domain resolve to an IP?), Layer 4 TCP (is port 443 listening?), and Layer 7 Application (does HTTP return a 200 vs 500 error?).',
        practicalExample: {
          title: 'ERR_NAME_NOT_RESOLVED vs 504 Gateway Timeout',
          scenario: 'If typing the IP loads the site but the domain fails, the issue is strictly isolated to DNS nameservers or local resolver configuration.',
          safeAction: 'Test direct IP connectivity first to immediately rule out network physical routing issues.'
        },
        commonMistakes: [
          'Assuming a website is offline when only your local DNS server failed.',
          'Assuming SSL certificate errors mean the web server is crashed.',
          'Restarting application servers without checking downstream database health.'
        ],
        knowledgeCheck: {
          question: 'A user reports: "ping 8.8.8.8 succeeds, but ping google.com fails with \'unknown host\'." What is the root cause?',
          options: [
            {
              id: 'a',
              text: 'The network cable is disconnected.',
              isCorrect: false,
              feedback: 'Incorrect. If the cable were unplugged, pinging 8.8.8.8 would fail.'
            },
            {
              id: 'b',
              text: 'IP routing is functional, but the DNS resolver is unreachable or misconfigured.',
              isCorrect: true,
              feedback: 'Correct! Ping to raw IP proves Layer 3 connectivity works. Failure to resolve names isolates the failure strictly to DNS.'
            },
            {
              id: 'c',
              text: 'The Google web server is permanently deleted.',
              isCorrect: false,
              feedback: 'Incorrect.'
            }
          ]
        },
        keyTakeaway: 'Troubleshoot networks hierarchically: IP connectivity first, DNS resolution second, HTTP application response third.'
      },
      {
        id: 'tr_code_comprehension',
        trackId: 'technical_reasoning',
        title: 'Defensive Code Reading & Edge Cases',
        shortDescription: 'Spotting null pointer exceptions, boundary inversions, and state synchronization race conditions.',
        estimatedMinutes: 6,
        objectives: [
          'Inspect branch logic for unintended edge case fallthroughs.',
          'Identify missing bounds validation on array indexing.',
          'Anticipate race conditions in asynchronous execution.'
        ],
        explanation: 'Code comprehension is the ability to mentally simulate execution steps and test boundary constraints (e.g. 0, negative numbers, empty strings, null). Defensive coding assumes that any variable that can be undefined will eventually be undefined in production.',
        practicalExample: {
          title: 'Cart Discount Inversion',
          scenario: '`total = subtotal - Math.max(discount, coupon)`. If discount exceeds subtotal, total becomes negative, allowing users to check out and receive a credit.',
          safeAction: 'Always clamp values: `total = Math.max(0, subtotal - discount)`.'
        },
        commonMistakes: [
          'Testing only the "happy path" with valid inputs.',
          'Assuming array indices will never be accessed out of bounds.',
          'Forgetting that client-side validation can be bypassed by anyone with a curl terminal.'
        ],
        knowledgeCheck: {
          question: 'Why should price calculations always use `Math.max(0, calculatedPrice)` before processing checkout?',
          options: [
            {
              id: 'a',
              text: 'To ensure discounts can never invert the balance and make checkout negative.',
              isCorrect: true,
              feedback: 'Correct! Clamping prevents negative order totals when promotional coupons exceed item prices.'
            },
            {
              id: 'b',
              text: 'To convert floating point numbers into integers.',
              isCorrect: false,
              feedback: 'Incorrect. Math.max does not truncate decimals.'
            },
            {
              id: 'c',
              text: 'To speed up CPU arithmetic execution.',
              isCorrect: false,
              feedback: 'Incorrect.'
            }
          ]
        },
        keyTakeaway: 'Always clamp numeric bounds and validate that client-side constraints are strictly re-verified on the server.'
      }
    ]
  }
];
