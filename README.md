# 🛡️ DigiSentinel
### AI-Powered Skill Discovery, Cybersecurity & Practical Assessment Platform
**Tagline:** *Discover Your Skills. Defend Your Digital World.*  
**College Community Engagement Project (CEP)**

---

## 🌟 Executive Overview
**DigiSentinel** is an intelligent, game-inspired practical assessment platform designed to help students, beginners, job seekers, and community members discover their demonstrated strengths, identify critical skill gaps, and prove real-world digital capabilities.

Unlike conventional quiz platforms or static course catalogs, DigiSentinel evaluates **demonstrated performance** through realistic simulations:
1. **Conversational Skill Discovery**: Express goals in natural language; an intelligent intent classifier maps queries into structured competency routes.
2. **Skill Radar (Adaptive Diagnostic)**: A 6-domain multi-task diagnostic with deterministic adaptive branching and immediate constructive feedback.
3. **6 Job-Oriented Practical Missions**: Interactive simulation labs featuring synthetic logs, CLI terminals, HTTP inspectors, SQL runners, and live code test suites.
4. **Community Digital Safety Initiative**: Real-world education on UPI payment fraud, fake screenshot detection, and 1930 reporting.
5. **Skill Portfolio & Verified Rubrics**: Verifiable performance logs with granular rubric scores across Accuracy, Reasoning, Independence, Efficiency, and Risk Awareness.

---

## 🚀 Key Features

### 1. Intelligent Skill Discovery Engine
- Natural language intent parser mapping queries to a 6-domain taxonomy (Cybersecurity, Fraud & Digital Safety, Software Engineering, IT & Networking, Data & AI, and Digital Literacy).
- Dual entry modes:
  - **Explore Mode**: Unsure of exact abilities? Launches multi-domain adaptive diagnostic.
  - **Direct Assessment Mode**: Clear intention? Routes immediately to targeted challenges.

### 2. Skill Radar — The Adaptive Diagnostic
- Samples logical reasoning, online fraud defense, DNS vs IP networking, asynchronous code debugging, data anomaly discrimination, and incident containment.
- **Deterministic Adaptive Rules**:
  - Mistake on core financial task triggers foundational reinforcement drill (e.g. *The UPI PIN Rule*).
  - High-precision responses unlock advanced variants (e.g. *Bank Deactivation SMS & Remote Desktop Trojans*).
- **Session Persistence**: Progress is preserved across page refreshes via versioned local storage.

### 3. Practical Job-Oriented Mission Engine
| Mission | Role | Interactive Capabilities |
| :--- | :--- | :--- |
| **Cyber Fraud Investigator** | Junior Security Analyst | Inspect raw RFC email headers, trace impossible travel across New York & Bucharest, re-order chronological attack phases, and triage containment actions without destroying evidence. |
| **Debug Broken App** | Junior Software Developer | Interactive code editor for cart calculation bug (`Math.max` vs `Math.min`), live Vitest test runner executing 4 unit tests, and boundary edge-case handling. |
| **Network Troubleshooter** | Junior IT Engineer | Visual topology map with devices, live diagnostic CLI shell (`ping`, `traceroute`, `nslookup`, `ipconfig`), and adapter default gateway repair tool. |
| **Application Security Analyst** | Junior AppSec Analyst | HTTP request/response inspector, parameter tampering tool demonstrating OWASP Broken Object Level Authorization (IDOR), and tenant ownership middleware fix verification. |
| **Data Detective** | Junior Data Analyst | Dirty transactions dataset with duplicate keys and anomalous $1.25M entries, interactive SQL console, and automated cleaning filters. |
| **Incident Responder** | Junior DevOps / SRE | Real-time telemetry dashboard (HTTP 502/504 error spikes, P99 latency, DB connection pool saturation), container log streamer, and deployment rollback trigger (`kubectl rollout undo`). |

### 4. Multilingual Community Accessibility
- Full UI architecture translated into:
  - **English**
  - **हिन्दी (Hindi)**
  - **मराठी (Marathi)**
- High-contrast accessible theme, reduced motion support, and plain-language fraud defense explanations.

---

## 🛠️ Technology Stack
- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS
- **Icons & Animation:** Lucide React, Framer Motion
- **Visualization:** Recharts (Polar Radar charts, Telemetry metrics)
- **Delight & Celebration:** Canvas Confetti
- **Testing:** Vitest automated test suite

---

## 💻 Quick Start & Running Locally

### 1. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Run Automated Unit & Scoring Tests
```bash
npm run test
```

### 3. Compile Production Build
```bash
npm run build
```

---

## ⚖️ Ethical & Educational Disclaimers
- DigiSentinel evaluates demonstrated task performance within simulated educational sandboxes.
- The platform does not certify official statutory competence, predict hiring decisions, or issue government-recognized credentials.
- All bank SMS, UPI receipts, network captures, and server logs are synthetic educational artifacts.
- Official helpline for Indian financial fraud: **1930** or [cybercrime.gov.in](https://cybercrime.gov.in).
