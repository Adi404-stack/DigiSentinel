import React, { useState } from 'react';
import {
  HelpCircle,
  X,
  Search,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Info
} from 'lucide-react';

interface KnowledgeItem {
  id: string;
  topic: string;
  category: string;
  question: string;
  explanation: string;
  beginnerAnalogy: string;
  keyRule: string;
}

const KNOWLEDGE_ITEMS: KnowledgeItem[] = [
  {
    id: 'k_dns_spoofing',
    topic: 'DNS & Nameservers',
    category: 'Networking',
    question: 'What is DNS spoofing / cache poisoning?',
    explanation: 'DNS (Domain Name System) translates human names like "bank.com" into machine IP addresses like "192.0.2.1". DNS spoofing occurs when an attacker corrupts a DNS resolver’s cache so that requests for legitimate domains resolve to an attacker-controlled server IP instead.',
    beginnerAnalogy: 'Imagine a scammer replacing a clinic’s phone number in a public phone book with their own number, so anyone calling the clinic reaches the scammer.',
    keyRule: 'Implement DNSSEC (Domain Name System Security Extensions) and verify HTTPS certificates, which fail if the destination server does not possess the legitimate cryptographic private key.'
  },
  {
    id: 'k_upi_pin',
    topic: 'Digital Payments',
    category: 'Fraud Defense',
    question: 'Why does receiving money via UPI never require a PIN?',
    explanation: 'Unified Payments Interface (UPI) is strictly an authentication-for-debit architecture. Entering your 4 or 6-digit PIN sends a cryptographically signed instruction to your bank authorizing a withdrawal. Credits (incoming funds) are automatically deposited without user action.',
    beginnerAnalogy: 'Dropping a letter into your mailbox doesn’t require unlocking your front door. Entering your PIN is unlocking the door to let money walk out.',
    keyRule: 'Rule of thumb: UPI PIN is only for PAYING. If someone asks you to enter your PIN to "receive", it is 100% a scam.'
  },
  {
    id: 'k_fido2_mfa',
    topic: 'Authentication',
    category: 'Cybersecurity',
    question: 'How do FIDO2 hardware keys defeat phishing?',
    explanation: 'Standard passwords and 6-digit SMS codes can be retyped by a victim onto a fake lookalike website. FIDO2 security keys use public-key cryptography where the browser itself provides the verified domain origin (e.g., "google.com") to the hardware key. If you are on "google-verify.net", the key refuses to generate a valid signature.',
    beginnerAnalogy: 'A bank vault key that only turns inside a lock if the street address engraved on the door matches the building deed exactly.',
    keyRule: 'FIDO2 / WebAuthn hardware passkeys cryptographically bind authentication to the genuine browser URL origin.'
  },
  {
    id: 'k_xss',
    topic: 'Web Security',
    category: 'Secure Coding',
    question: 'What is Cross-Site Scripting (XSS)?',
    explanation: 'XSS occurs when an application includes untrusted user input directly into its webpage without proper encoding. The victim’s browser cannot differentiate between legitimate scripts from the site owner and malicious JavaScript injected by the attacker, allowing cookies and tokens to be stolen.',
    beginnerAnalogy: 'A restaurant customer writing "Give the bearer free food" onto a blank feedback postcard, and the waiter mistakenly reading it aloud as an order to the kitchen.',
    keyRule: 'Never write untrusted input directly to execution sinks like innerHTML. Always use textContent or strict context-aware output encoding.'
  },
  {
    id: 'k_exif',
    topic: 'Digital Privacy',
    category: 'Privacy',
    question: 'What is EXIF metadata in photos?',
    explanation: 'Exchangeable Image File Format (EXIF) is hidden data automatically embedded by cameras and smartphones into JPEG/HEIC image headers. It records the camera model, exact date/time, shutter speed, and often precise GPS latitude and longitude coordinates.',
    beginnerAnalogy: 'Writing your home street address in invisible ink on the back of every postcard you mail.',
    keyRule: 'Always scrub or strip EXIF metadata before sharing original camera photos on public websites or forums.'
  }
];

interface ConceptAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConceptAssistantModal: React.FC<ConceptAssistantModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<KnowledgeItem>(KNOWLEDGE_ITEMS[0]);

  if (!isOpen) return null;

  const filteredItems = KNOWLEDGE_ITEMS.filter(k =>
    k.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
    k.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    k.explanation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sentinel-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-3xl bg-sentinel-900 border border-sentinel-800 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-sentinel-800 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                Security Concept Explainer
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sentinel-950 border border-sentinel-850 text-slate-400">
                Curated Knowledge Engine
              </span>
            </div>
            <h3 className="text-xl font-bold text-white font-display">
              Technical Concepts & Deception Anatomy
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-sentinel-950 border border-sentinel-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input Bar */}
        <div className="p-4 bg-sentinel-950/80 border-b border-sentinel-850">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search concepts (e.g. DNS, UPI, Phishing, XSS, EXIF)..."
              className="w-full bg-sentinel-900 border border-sentinel-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 font-mono"
            />
          </div>
        </div>

        {/* Content Body Grid */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left: Concepts List (5 cols) */}
          <div className="md:col-span-5 space-y-2 border-r border-sentinel-850 pr-4">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold block pb-1">
              Select Concept:
            </span>
            {filteredItems.map(item => (
              <button
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`w-full text-left p-3 rounded-2xl border text-xs transition space-y-1 ${
                  selectedItem.id === item.id
                    ? 'bg-electric-950/40 border-electric-500 text-white'
                    : 'bg-sentinel-950 border-sentinel-850 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold">{item.topic}</span>
                  <span className="text-[10px] font-mono text-cyan-400">{item.category}</span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-1">{item.question}</p>
              </button>
            ))}
          </div>

          {/* Right: Detailed Breakdown & Analogy (7 cols) */}
          <div className="md:col-span-7 space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-bold">
                {selectedItem.category} • {selectedItem.topic}
              </span>
              <h4 className="text-base font-bold text-white font-display">
                {selectedItem.question}
              </h4>
            </div>

            <div className="space-y-2 text-xs text-slate-200 leading-relaxed bg-sentinel-950/60 p-4 rounded-2xl border border-sentinel-850">
              <span className="font-mono text-slate-400 font-bold block uppercase text-[10px]">
                Technical Explanation:
              </span>
              <p>{selectedItem.explanation}</p>
            </div>

            {/* Beginner Analogy Callout */}
            <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200 space-y-1.5 leading-relaxed">
              <span className="font-mono font-bold block uppercase text-[10px] text-amber-400">
                Beginner Intuition / Analogy:
              </span>
              <p className="italic">"{selectedItem.beginnerAnalogy}"</p>
            </div>

            {/* Defense Axiom */}
            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-200 space-y-1 leading-relaxed">
              <span className="font-mono font-bold block uppercase text-[10px] text-emerald-400">
                Actionable Defense Axiom:
              </span>
              <p>{selectedItem.keyRule}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-sentinel-950 border-t border-sentinel-800 text-[11px] font-mono text-slate-500 flex items-center justify-between">
          <span>DigiSentinel Rule-Based Security Tutor • Honest Local Evaluation</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-sentinel-900 border border-sentinel-800 text-slate-300 hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
