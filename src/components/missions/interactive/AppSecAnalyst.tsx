import React, { useState } from 'react';
import {
  ShieldAlert,
  Send,
  Lock,
  Unlock,
  CheckCircle2,
  XCircle,
  FileText,
  Code2,
  ArrowRight,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';

export const AppSecAnalyst: React.FC = () => {
  const { completeMissionTask, finalizeMission, navigateTo } = useApp();

  const [documentIdParam, setDocumentIdParam] = useState('1048');
  const [responseStatus, setResponseStatus] = useState<number>(200);
  const [responseBody, setResponseBody] = useState<any>({
    documentId: 1048,
    owner: 'John Doe (Current User)',
    title: 'Personal Tax Declaration 2025',
    ssnOrAadhaar: 'XXXX-XXXX-4912',
    taxRefundDue: '$3,420.00'
  });

  const [isExploitDemonstrated, setIsExploitDemonstrated] = useState(false);
  const [isPatchApplied, setIsPatchApplied] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSendRequest = () => {
    if (isPatchApplied) {
      if (documentIdParam === '1048') {
        setResponseStatus(200);
        setResponseBody({
          documentId: 1048,
          owner: 'John Doe (Current User)',
          title: 'Personal Tax Declaration 2025',
          ssnOrAadhaar: 'XXXX-XXXX-4912',
          taxRefundDue: '$3,420.00'
        });
      } else {
        setResponseStatus(403);
        setResponseBody({
          error: 'Forbidden: Broken Object Level Authorization Violation',
          message: 'The requested resource belongs to another tenant. Event logged to SIEM.',
          timestamp: new Date().toISOString()
        });
        completeMissionTask('appsec_task_4', 100, 'Verified that patch returns 403 Forbidden on cross-tenant document requests.');
        setIsCompleted(true);
        finalizeMission(
          {
            accuracy: 98,
            evidenceReasoning: 95,
            independence: 100,
            efficiency: 92,
            riskAwareness: 98,
            overallScore: 96,
            criticalErrors: [],
            feedbackNotes: [
              'Successfully demonstrated IDOR vulnerability by tampering numeric resource ID.',
              'Applied session ownership validation filter in API middleware.',
              'Verified 403 Forbidden enforcement prevents horizontal privilege escalation.'
            ]
          },
          [
            'Discovered OWASP API #1 Broken Object Level Authorization (IDOR) on /api/documents/:id.',
            'Deployed tenant ownership verification middleware and verified 403 response.'
          ]
        );
      }
    } else {
      if (documentIdParam === '1049') {
        setResponseStatus(200);
        setResponseBody({
          documentId: 1049,
          owner: 'Alice Smith (Different Customer!)',
          title: 'Offshore Investment Holdings Statement',
          ssnOrAadhaar: 'XXXX-XXXX-8991',
          confidentialNetWorth: '$4,850,000.00',
          warning: 'CRITICAL LEAK: This belongs to an unrelated user!'
        });
        setIsExploitDemonstrated(true);
        completeMissionTask('appsec_task_2', 100, 'Tampered ID from 1048 to 1049 demonstrating unauthorized document disclosure.');
      } else {
        setResponseStatus(200);
        setResponseBody({
          documentId: 1048,
          owner: 'John Doe (Current User)',
          title: 'Personal Tax Declaration 2025',
          ssnOrAadhaar: 'XXXX-XXXX-4912',
          taxRefundDue: '$3,420.00'
        });
      }
    }
  };

  const handleApplyPatch = () => {
    setIsPatchApplied(true);
    completeMissionTask('appsec_task_3', 100, 'Selected session ownership validation middleware.');
  };

  return (
    <div className="space-y-6">
      {/* HTTP API Inspector Workbench */}
      <div className="p-6 rounded-2xl bg-sentinel-900/80 border border-sentinel-800 space-y-5">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-rose-400 font-bold flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4" />
            <span>OWASP API Security Lab: Broken Object Level Authorization (IDOR)</span>
          </span>
          <p className="text-xs text-slate-400 mt-1">
            Test the document endpoint for Insecure Direct Object References. Current authenticated user is John Doe (Account ID: usr_1048).
          </p>
        </div>

        {/* HTTP Request URL Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2 rounded-xl bg-sentinel-950 border border-sentinel-800">
          <span className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-bold font-mono">
            GET
          </span>
          <div className="flex-1 flex items-center gap-1 font-mono text-xs text-slate-300">
            <span>https://api.finsecure.cloud/v1/documents/</span>
            <input
              type="text"
              value={documentIdParam}
              onChange={e => setDocumentIdParam(e.target.value)}
              className="w-20 px-2 py-1 rounded bg-sentinel-900 border border-slate-700 text-white font-bold focus:ring-1 focus:ring-electric-500"
            />
          </div>
          <button
            onClick={handleSendRequest}
            className="px-5 py-2 rounded-lg bg-electric-600 hover:bg-electric-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send HTTP Request</span>
          </button>
        </div>

        {/* HTTP Response Panel */}
        <div className="rounded-xl border border-sentinel-800 bg-sentinel-950 overflow-hidden text-xs font-mono">
          <div className="p-3 bg-sentinel-900/80 border-b border-sentinel-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded font-bold ${responseStatus === 200 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                {responseStatus} {responseStatus === 200 ? 'OK' : 'FORBIDDEN'}
              </span>
              <span className="text-slate-400">Content-Type: application/json</span>
            </div>
            <span className="text-slate-500">Latency: 42ms</span>
          </div>

          <pre className="p-4 overflow-x-auto text-slate-300 leading-relaxed whitespace-pre-wrap">
            {JSON.stringify(responseBody, null, 2)}
          </pre>
        </div>
      </div>

      {/* Exploit Demonstration & Patch Workflow */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Step 1: Prove IDOR */}
        <div className="p-5 rounded-2xl bg-sentinel-900/80 border border-sentinel-800 space-y-3">
          <div className="flex items-center gap-2">
            <Unlock className="w-4 h-4 text-rose-400" />
            <h4 className="text-sm font-bold text-white">1. Exploit Verification</h4>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Change the Document ID in the request bar from <strong>1048</strong> to <strong>1049</strong> and send the request. If Alice Smith's tax document is returned, Broken Object Level Authorization is proven.
          </p>
          <div className="p-3 rounded-xl bg-sentinel-950 border border-sentinel-850 text-xs">
            {isExploitDemonstrated ? (
              <span className="text-rose-400 font-bold flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" />
                Vulnerability Verified: Unauthorized Data Disclosed!
              </span>
            ) : (
              <span className="text-slate-500">Awaiting parameter tamper demonstration...</span>
            )}
          </div>
        </div>

        {/* Step 2: Deploy Middleware Patch */}
        <div className="p-5 rounded-2xl bg-sentinel-900/80 border border-sentinel-800 space-y-3">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <h4 className="text-sm font-bold text-white">2. Deploy Authorization Patch</h4>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Apply session-bound verification: query must match <code>doc.ownerId === session.userId</code>.
          </p>

          {!isPatchApplied ? (
            <button
              onClick={handleApplyPatch}
              disabled={!isExploitDemonstrated}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-semibold text-xs flex items-center justify-center gap-2 transition"
            >
              <Code2 className="w-4 h-4" />
              <span>Deploy Authorization Middleware</span>
            </button>
          ) : (
            <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/40 text-emerald-300 text-xs">
              ✓ Patch Active: Send request for ID 1049 again to verify 403 Forbidden rejection!
            </div>
          )}
        </div>
      </div>

      {/* Completion Banner */}
      {isCompleted && (
        <div className="p-6 rounded-3xl bg-sentinel-900 border border-emerald-500/50 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">IDOR Mitigated! Mission Complete</h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto mt-1">
              You uncovered an OWASP Top 10 Broken Object Level Authorization vulnerability and verified the backend middleware fix enforcing tenant ownership.
            </p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => navigateTo('portfolio')}
              className="px-5 py-2 rounded-xl bg-electric-600 text-white text-xs font-semibold"
            >
              View in Skill Portfolio
            </button>
            <button
              onClick={() => navigateTo('missions')}
              className="px-5 py-2 rounded-xl bg-sentinel-800 text-slate-300 text-xs font-semibold"
            >
              Next Mission
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
