export interface MicroLesson {
  id: string;
  competencyId: string;
  domainId: string;
  title: string;
  durationMinutes: number;
  summary: string;
  keyRule: string;
  interactiveExercise: {
    question: string;
    codeOrSnippet?: string;
    options: {
      id: string;
      label: string;
      isCorrect: boolean;
      explanation: string;
    }[];
  };
}

export const PRACTICE_LESSONS: MicroLesson[] = [
  {
    id: 'lesson_upi_safety',
    competencyId: 'comp_upi_verification',
    domainId: 'fraud_safety',
    title: 'Anatomy of Fake UPI Screenshots & Inward Verification',
    durationMinutes: 3,
    summary: 'Fraudulent buyers rely on spoof apps that generate convincing green tick receipts. Understanding that UPI transfers reflect instantly in your official bank app protects you from 100% of receipt scams.',
    keyRule: 'Rule: Credit is only confirmed when your own bank app or official bank SMS displays the new balance. Never release goods on buyer screenshots.',
    interactiveExercise: {
      question: 'A buyer presents a ₹3,000 payment screenshot with a 9-digit reference number and asks for their package. What is the single decisive check?',
      options: [
        {
          id: 'opt_pl_1',
          label: 'Open your own official bank/UPI app and verify the inward credit in your transaction passbook before handing over anything.',
          isCorrect: true,
          explanation: 'Exactly right! Your bank balance is the authoritative source of truth. Screenshots are easily faked.'
        },
        {
          id: 'opt_pl_2',
          label: 'Scan their phone screen with your camera to reverse-search the transaction.',
          isCorrect: false,
          explanation: 'Reverse-searching screenshots is ineffective and unnecessary; checking your bank account takes 5 seconds.'
        }
      ]
    }
  },
  {
    id: 'lesson_dns_troubleshooting',
    competencyId: 'comp_dns_troubleshooting',
    domainId: 'it_networking',
    title: 'DNS vs IP Layer: Isolating Resolution Faults',
    durationMinutes: 4,
    summary: 'When a web page opens via its raw IP address (e.g. 192.168.1.50) but fails via its human-readable domain name, the underlying web server, firewall, and TCP stack are all healthy. The failure resides purely in the Name Resolution (DNS) pipeline.',
    keyRule: 'Rule: If IP succeeds and domain fails, do not touch the web server or router. Inspect resolver caches, /etc/hosts, and DNS servers.',
    interactiveExercise: {
      question: 'A computer can reach 1.1.1.1 via ping, but "ping cloudflare.com" returns "Host not found". Which tool pinpoints which DNS server is failing?',
      options: [
        {
          id: 'opt_pl_dns_1',
          label: 'nslookup cloudflare.com (or dig cloudflare.com) to see the responding DNS server and status code.',
          isCorrect: true,
          explanation: 'Correct! nslookup explicitly displays which DNS resolver IP was contacted and the exact response.'
        },
        {
          id: 'opt_pl_dns_2',
          label: 'Run disk cleanup to free virtual memory.',
          isCorrect: false,
          explanation: 'Disk cleanup has zero impact on network DNS resolution.'
        }
      ]
    }
  },
  {
    id: 'lesson_idor_mitigation',
    competencyId: 'comp_appsec_basics',
    domainId: 'cybersecurity',
    title: 'Preventing Broken Object Level Authorization (IDOR)',
    durationMinutes: 4,
    summary: 'Insecure Direct Object References happen when an API accepts an object ID directly from the client without verifying whether the authenticated user owns that resource.',
    keyRule: 'Rule: Never query `SELECT * FROM docs WHERE id = :id`. Always enforce session ownership: `SELECT * FROM docs WHERE id = :id AND owner_id = :sessionUserId`.',
    interactiveExercise: {
      question: 'Which backend implementation securely prevents IDOR when fetching invoices?',
      codeOrSnippet: `// Option A:
app.get('/invoice/:id', (req, res) => {
  return db.invoice.find({ id: req.params.id });
});

// Option B:
app.get('/invoice/:id', (req, res) => {
  return db.invoice.find({ id: req.params.id, userId: req.session.userId });
});`,
      options: [
        {
          id: 'opt_pl_idor_b',
          label: 'Option B: Scopes the query to the authenticated session userId.',
          isCorrect: true,
          explanation: 'Correct! Option B verifies that the requested invoice strictly belongs to the currently logged-in user.'
        },
        {
          id: 'opt_pl_idor_a',
          label: 'Option A: Relies on the user to only request their own IDs.',
          isCorrect: false,
          explanation: 'Option A allows any authenticated user to read all other users’ invoices simply by changing the ID number.'
        }
      ]
    }
  },
  {
    id: 'lesson_sql_cleaning',
    competencyId: 'comp_data_cleaning',
    domainId: 'data_ai',
    title: 'Finding and Removing Duplicate Rows in SQL',
    durationMinutes: 3,
    summary: 'Duplicate database entries skew aggregations and double-count revenue. You can isolate duplicates by grouping by key attributes and filtering for counts exceeding 1.',
    keyRule: 'Rule: Use `GROUP BY unique_columns HAVING COUNT(*) > 1` to locate duplicate candidate keys.',
    interactiveExercise: {
      question: 'Which SQL clause correctly reveals duplicate transaction IDs in an orders table?',
      options: [
        {
          id: 'opt_pl_sql_1',
          label: 'SELECT transaction_id, COUNT(*) FROM orders GROUP BY transaction_id HAVING COUNT(*) > 1;',
          isCorrect: true,
          explanation: 'Spot on! The HAVING clause filters grouped results where count exceeds 1.'
        },
        {
          id: 'opt_pl_sql_2',
          label: 'SELECT transaction_id FROM orders WHERE COUNT(*) > 1;',
          isCorrect: false,
          explanation: 'Invalid SQL syntax: aggregate functions like COUNT(*) cannot be used in a WHERE clause.'
        }
      ]
    }
  }
];
