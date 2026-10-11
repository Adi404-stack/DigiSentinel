import React, { useState } from 'react';
import {
  ShieldAlert,
  Mail,
  Clock,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  ShieldCheck,
  FileSearch,
  Lock
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { Badge } from '../../common/Badge';

export const FraudInvestigator: React.FC = () => {
  const { completeMissionTask, finalizeMission, navigateTo } = useApp();

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPhishIndicator, setSelectedPhishIndicator] = useState<string | null>(null);
  const [timelineOrder, setTimelineOrder] = useState<number[]>([3, 1, 4, 2]); // scrambled
  const [selectedContainmentActions, setSelectedContainmentActions] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  // Evidence dataset
  const emailEvidence = {
    subject: 'URGENT: Executive Payroll Bonus Confirmation',
    from: 'Payroll Support <hr-payroll@aegis-financial.com>',
    replyTo: 'payroll-update@aegis-financia1.support', // 1 instead of l
    returnPath: 'bounce-gateway@mailer-foreign-relay.org',
    spf: 'SoftFail (IP 185.220.101.5 is not authorized for aegis-financial.com)',
    body: 'Please verify your banking direct-deposit credentials within 1 hour to ensure uninterrupted bonus disbursement.',
    link: 'https://aegis-financia1.support/portal/login?employee=4892'
  };

  const authLogs = [
    { time: '09:14 UTC', user: 'm.vance@aegis.com', ip: '198.51.100.42', location: 'New York, USA', status: 'SUCCESS (Office VPN)' },
    { time: '09:28 UTC', user: 'm.vance@aegis.com', ip: '185.220.101.5', location: 'Bucharest, Romania', status: 'SUCCESS (Tor Exit Node)' },
    { time: '09:31 UTC', user: 'm.vance@aegis.com', ip: '185.220.101.5', location: 'Bucharest, Romania', status: 'PASSWORD_CHANGED' },
    { time: '09:42 UTC', user: 'm.vance@aegis.com', ip: '185.220.101.5', location: 'Bucharest, Romania', status: 'WIRE_TRANSFER_REQUEST: $84,500' }
  ];

  const timelineEvents = [
    { id: 1, text: 'Attacker sends spoofed payroll email with typosquatted domain aegis-financia1.support' },
    { id: 2, text: 'Finance manager enters credentials on phishing landing page at 09:25 UTC' },
    { id: 3, text: 'Attacker logs in from Romanian IP 185.220.101.5 using harvested credentials at 09:28 UTC' },
    { id: 4, text: 'Attacker submits unauthorized $84,500 wire transfer request at 09:42 UTC' }
  ];

  const containmentOptions = [
    { id: 'revoke_sessions', label: 'Revoke all active OAuth sessions & terminate existing VPN connections for m.vance@aegis.com', isSafe: true },
    { id: 'freeze_wire', label: 'Notify banking operations to immediately place a hold on the pending $84,500 wire transfer', isSafe: true },
    { id: 'reset_creds', label: 'Reset user password and force new hardware FIDO2 MFA enrollment', isSafe: true },
    { id: 'delete_server', label: 'Format and delete the corporate mail server to wipe all traces of the phishing email', isSafe: false, penalty: 'Destroys all legal evidence and causes catastrophic operational outage' },
    { id: 'block_ip', label: 'Add 185.220.101.5 to perimeter firewall deny list and block typosquatted domain', isSafe: true }
  ];

  const handleStep1Submit = () => {
    if (selectedPhishIndicator === 'typosquat') {
      completeMissionTask('fi_task_1', 100, 'Identified spoofed Reply-To and typosquatted aegis-financia1.support domain.');
      setCurrentStep(2);
    } else {
      alert('Inspect the Reply-To and link domain carefully: notice the letter "l" vs digit "1".');
    }
  };

  const handleStep2Submit = () => {
    // Step 2 is correlating logs
    completeMissionTask('fi_task_2', 100, 'Correlated impossible travel between NY and Bucharest within 14 minutes.');
    setCurrentStep(3);
  };

  const handleStep3Submit = () => {
    // Correct timeline is 1, 2, 3, 4
    const isCorrect = timelineOrder[0] === 1 && timelineOrder[1] === 2 && timelineOrder[2] === 3 && timelineOrder[3] === 4;
    if (isCorrect) {
      completeMissionTask('fi_task_3', 100, 'Reconstructed chronological four-phase incident timeline.');
      setCurrentStep(4);
    } else {
      alert('Timeline is not yet in exact chronological sequence. Email dispatch comes first, followed by victim login, attacker session, and wire transfer.');
    }
  };

  const handleStep4Submit = () => {
    const hasUnsafe = selectedContainmentActions.includes('delete_server');
    if (hasUnsafe) {
      alert('Caution: Formatting the mail server destroys forensic evidence and disrupts the entire enterprise.');
      return;
    }
    if (selectedContainmentActions.length < 3) {
      alert('Please select at least 3 critical containment actions (session revocation, wire freeze, credential reset, IP block).');
      return;
    }

    completeMissionTask('fi_task_4', 100, 'Executed high-priority containment strategy without destroying evidence.');
    setIsCompleted(true);
    finalizeMission(
      {
        accuracy: 95,
        evidenceReasoning: 90,
        independence: 100,
        efficiency: 92,
        riskAwareness: 98,
        overallScore: 95,
        criticalErrors: [],
        feedbackNotes: [
          'Excellently spotted typosquatted domain aegis-financia1.support.',
          'Identified impossible travel anomaly from NY to Bucharest.',
          'Prioritized bank wire transfer hold and token revocation over destructive wipe.'
        ]
      },
      [
        'Identified spear-phishing typosquat domain and SPF SoftFail.',
        'Correlated Tor exit node IP 185.220.101.5 with impossible travel.',
        'Froze pending $84,500 wire and secured compromised user account.'
      ]
    );
  };

  return (
    <div className="space-y-6">
      {/* Step Stepper */}
      <div className="flex items-center justify-between border-b border-sentinel-850 pb-4 text-xs font-mono">
        <span className="text-cyan-400 font-bold">Investigation Phase {currentStep} of 4</span>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map(s => (
            <div
              key={s}
              className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${
                s === currentStep
                  ? 'bg-electric-500 text-white'
                  : s < currentStep
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'bg-sentinel-900 text-slate-500'
              }`}
            >
              {s < currentStep ? '✓' : s}
            </div>
          ))}
        </div>
      </div>

      {/* PHASE 1: EMAIL FORENSICS */}
      {currentStep === 1 && (
        <div className="p-6 rounded-2xl bg-sentinel-900/80 border border-sentinel-800 space-y-5">
          <div>
            <h3 className="text-lg font-bold text-white">Phase 1: Phishing Email Inspection</h3>
            <p className="text-xs text-slate-400">
              Inspect the raw header values from the reported payroll notice to identify the primary indicator of spoofing.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-sentinel-950 border border-sentinel-800 font-mono text-xs space-y-2 text-slate-300">
            <div><span className="text-slate-500">Subject: </span>{emailEvidence.subject}</div>
            <div><span className="text-slate-500">From: </span>{emailEvidence.from}</div>
            <div><span className="text-amber-400 font-bold">Reply-To: </span>{emailEvidence.replyTo}</div>
            <div><span className="text-slate-500">Return-Path: </span>{emailEvidence.returnPath}</div>
            <div><span className="text-rose-400 font-bold">SPF-Result: </span>{emailEvidence.spf}</div>
            <div className="pt-2 border-t border-sentinel-850">
              <span className="text-slate-500">Embedded Link: </span>
              <span className="text-cyan-300 underline">{emailEvidence.link}</span>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-300">Select the definitive technical indicator of fraud:</span>
            <div className="space-y-2 text-xs">
              {[
                { id: 'typosquat', label: 'Typosquatted domain (aegis-financia1.support with "1" instead of "l") and SPF SoftFail failure' },
                { id: 'urgent_subject', label: 'The subject contains the word URGENT' },
                { id: 'html_formatting', label: 'The email uses standard HTML tags' }
              ].map(opt => (
                <div
                  key={opt.id}
                  onClick={() => setSelectedPhishIndicator(opt.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition flex items-center gap-3 ${
                    selectedPhishIndicator === opt.id
                      ? 'border-electric-500 bg-electric-950/40 text-white'
                      : 'border-sentinel-800 bg-sentinel-950 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className={`w-3.5 h-3.5 rounded-full border ${selectedPhishIndicator === opt.id ? 'bg-electric-500 border-electric-400' : 'border-slate-600'}`} />
                  <span>{opt.label}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleStep1Submit}
            disabled={!selectedPhishIndicator}
            className="px-6 py-2.5 rounded-xl bg-electric-600 hover:bg-electric-500 disabled:opacity-40 text-white font-semibold text-xs transition"
          >
            Confirm Indicator & Proceed to Auth Logs
          </button>
        </div>
      )}

      {/* PHASE 2: AUTH LOG CORRELATION */}
      {currentStep === 2 && (
        <div className="p-6 rounded-2xl bg-sentinel-900/80 border border-sentinel-800 space-y-5">
          <div>
            <h3 className="text-lg font-bold text-white">Phase 2: Authentication Log Correlation</h3>
            <p className="text-xs text-slate-400">
              Correlate the victim’s authentication timestamps and geographical coordinates.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-sentinel-800 bg-sentinel-950">
            <table className="w-full text-xs font-mono text-left">
              <thead className="bg-sentinel-900 text-slate-400 border-b border-sentinel-800">
                <tr>
                  <th className="p-3">Time (UTC)</th>
                  <th className="p-3">User</th>
                  <th className="p-3">IP Address</th>
                  <th className="p-3">Geo Location</th>
                  <th className="p-3">Event / Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sentinel-850 text-slate-300">
                {authLogs.map((log, i) => (
                  <tr key={i} className={log.location.includes('Bucharest') ? 'bg-rose-950/20 text-rose-200' : ''}>
                    <td className="p-3">{log.time}</td>
                    <td className="p-3">{log.user}</td>
                    <td className="p-3">{log.ip}</td>
                    <td className="p-3 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      <span>{log.location}</span>
                    </td>
                    <td className="p-3 font-semibold">{log.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3.5 rounded-xl bg-sentinel-950 border border-sentinel-800 text-xs text-slate-300 space-y-1">
            <span className="font-bold text-cyan-400 font-mono">Forensic Finding:</span>
            <p>
              Login from New York (09:14 UTC) and Bucharest (09:28 UTC) occurred 14 minutes apart. Distance is 7,600 km—this represents an <strong>Impossible Travel Velocity</strong> signature indicative of stolen session tokens.
            </p>
          </div>

          <button
            onClick={handleStep2Submit}
            className="px-6 py-2.5 rounded-xl bg-electric-600 hover:bg-electric-500 text-white font-semibold text-xs transition"
          >
            Acknowledge Finding & Reconstruct Timeline
          </button>
        </div>
      )}

      {/* PHASE 3: TIMELINE RECONSTRUCTION */}
      {currentStep === 3 && (
        <div className="p-6 rounded-2xl bg-sentinel-900/80 border border-sentinel-800 space-y-5">
          <div>
            <h3 className="text-lg font-bold text-white">Phase 3: Chronological Timeline Reconstruction</h3>
            <p className="text-xs text-slate-400">
              Drag or arrange the sequence of events into exact chronological order from earliest to latest.
            </p>
          </div>

          <div className="space-y-2">
            {timelineOrder.map((eventId, position) => {
              const event = timelineEvents.find(e => e.id === eventId)!;
              return (
                <div
                  key={eventId}
                  className="p-3.5 rounded-xl bg-sentinel-950 border border-sentinel-800 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-sentinel-800 text-cyan-300 font-mono font-bold flex items-center justify-center">
                      #{position + 1}
                    </span>
                    <span className="text-slate-200">{event.text}</span>
                  </div>
                  <div className="flex gap-1">
                    {position > 0 && (
                      <button
                        onClick={() => {
                          const copy = [...timelineOrder];
                          const temp = copy[position];
                          copy[position] = copy[position - 1];
                          copy[position - 1] = temp;
                          setTimelineOrder(copy);
                        }}
                        className="px-2 py-1 rounded bg-sentinel-800 hover:bg-sentinel-700 text-slate-300 text-[10px]"
                      >
                        ↑ Move Up
                      </button>
                    )}
                    {position < timelineOrder.length - 1 && (
                      <button
                        onClick={() => {
                          const copy = [...timelineOrder];
                          const temp = copy[position];
                          copy[position] = copy[position + 1];
                          copy[position + 1] = temp;
                          setTimelineOrder(copy);
                        }}
                        className="px-2 py-1 rounded bg-sentinel-800 hover:bg-sentinel-700 text-slate-300 text-[10px]"
                      >
                        ↓ Move Down
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setTimelineOrder([1, 2, 3, 4])}
              className="text-[11px] text-slate-500 hover:text-slate-300 font-mono flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Auto-Align Chronology</span>
            </button>
            <button
              onClick={handleStep3Submit}
              className="px-6 py-2.5 rounded-xl bg-electric-600 hover:bg-electric-500 text-white font-semibold text-xs transition"
            >
              Validate Timeline Sequence
            </button>
          </div>
        </div>
      )}

      {/* PHASE 4: CONTAINMENT TRIAGE */}
      {currentStep === 4 && !isCompleted && (
        <div className="p-6 rounded-2xl bg-sentinel-900/80 border border-sentinel-800 space-y-5">
          <div>
            <h3 className="text-lg font-bold text-white">Phase 4: Containment & Remediation Triage</h3>
            <p className="text-xs text-slate-400">
              Select all high-priority, non-destructive containment actions to halt the ongoing wire fraud and protect credentials.
            </p>
          </div>

          <div className="space-y-2.5">
            {containmentOptions.map(opt => {
              const isChecked = selectedContainmentActions.includes(opt.id);
              return (
                <div
                  key={opt.id}
                  onClick={() => {
                    if (isChecked) {
                      setSelectedContainmentActions(prev => prev.filter(x => x !== opt.id));
                    } else {
                      setSelectedContainmentActions(prev => [...prev, opt.id]);
                    }
                  }}
                  className={`p-3.5 rounded-xl border cursor-pointer transition flex items-start gap-3 text-xs ${
                    isChecked
                      ? opt.isSafe
                        ? 'border-emerald-500 bg-emerald-950/20 text-emerald-100'
                        : 'border-rose-500 bg-rose-950/30 text-rose-200'
                      : 'border-sentinel-800 bg-sentinel-950 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    readOnly
                    className="mt-0.5 rounded border-slate-700 text-electric-500"
                  />
                  <div>
                    <span className="font-medium">{opt.label}</span>
                    {opt.penalty && isChecked && (
                      <p className="text-[11px] text-rose-400 mt-1 font-mono">⚠️ {opt.penalty}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={handleStep4Submit}
            className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition shadow-lg shadow-emerald-600/30"
          >
            Execute Containment Strategy & Complete Mission
          </button>
        </div>
      )}

      {/* MISSION COMPLETED CELEBRATION */}
      {isCompleted && (
        <div className="p-8 rounded-3xl bg-sentinel-900 border border-emerald-500/50 shadow-2xl text-center space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-extrabold text-white">Mission Complete: Cyber Fraud Thwarted!</h3>
            <p className="text-slate-300 text-sm max-w-lg mx-auto">
              You prevented the $84,500 fraudulent wire transfer, unmasked the attacker’s typosquatted infrastructure, and secured corporate identities without destroying evidence.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sentinel-950 border border-sentinel-800 font-mono text-xs text-cyan-300">
            <span>Verified Score: 95/100</span>
            <span>•</span>
            <span>+350 XP Added to Profile</span>
          </div>

          <div className="pt-4 flex items-center justify-center gap-4">
            <button
              onClick={() => navigateTo('portfolio')}
              className="px-6 py-2.5 rounded-xl bg-electric-600 hover:bg-electric-500 text-white font-semibold text-xs transition"
            >
              View Verified Skill Portfolio
            </button>
            <button
              onClick={() => navigateTo('missions')}
              className="px-6 py-2.5 rounded-xl bg-sentinel-800 text-slate-300 text-xs font-semibold hover:bg-sentinel-700 transition"
            >
              Back to Mission Library
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
