import React, { useState, useEffect } from 'react';
import {
  Activity,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Server,
  Layers,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  FileCheck
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';

export const IncidentResponder: React.FC = () => {
  const { completeMissionTask, finalizeMission, navigateTo } = useApp();

  const [isRolledBack, setIsRolledBack] = useState(false);
  const [selectedHypothesis, setSelectedHypothesis] = useState<string | null>(null);
  const [postmortemNotes, setPostmortemNotes] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  // Live telemetry data simulation
  const [metrics, setMetrics] = useState({
    errorRate: 42.8,
    latencyP99: 9840,
    dbPoolUsage: 100,
    activePods: '12 / 12 (Degraded)'
  });

  useEffect(() => {
    if (isRolledBack) {
      setMetrics({
        errorRate: 0.04,
        latencyP99: 118,
        dbPoolUsage: 24,
        activePods: '12 / 12 (Healthy)'
      });
    }
  }, [isRolledBack]);

  const podLogs = [
    '14:02:11 [checkout-svc-78f-a1] INFO: Received POST /api/v2/orders',
    '14:02:15 [checkout-svc-78f-a1] WARN: DB pool connection wait exceeded 10000ms',
    '14:02:25 [checkout-svc-78f-b4] ERROR: pg_pool_exhausted: All 200 pool connections in use',
    '14:02:30 [checkout-svc-78f-a1] FATAL: Unhandled Promise rejection: connection acquire timeout',
    '14:02:31 [gateway-ingress-02] HTTP 504 Gateway Timeout -> client downstream IP 49.36.10.12',
    '14:02:40 [release-orchestrator] Last deployment: checkout-svc:v2.4.1 applied 6 minutes ago'
  ];

  const hypotheses = [
    {
      id: 'hyp_ddos',
      label: 'External DDoS attack flooding network bandwidth',
      isCorrect: false
    },
    {
      id: 'hyp_db_leak',
      label: 'Release v2.4.1 introduced a connection leak (missing client.release() in transaction block) exhausting DB pool',
      isCorrect: true
    },
    {
      id: 'hyp_dns',
      label: 'Core DNS resolver outage causing packet drop',
      isCorrect: false
    }
  ];

  const handleSelectHypothesis = (id: string) => {
    setSelectedHypothesis(id);
    if (id === 'hyp_db_leak') {
      completeMissionTask('ir_task_1', 100, 'Analyzed telemetry: identified DB pool exhaustion coinciding with v2.4.1.');
      completeMissionTask('ir_task_2', 100, 'Verified container logs confirming fatal connection pool timeout.');
    }
  };

  const handleTriggerRollback = () => {
    setIsRolledBack(true);
    completeMissionTask('ir_task_3', 100, 'Executed immediate Kubernetes deployment rollback to v2.4.0.');
  };

  const handleFinishMission = () => {
    completeMissionTask('ir_task_4', 100, 'Submitted production postmortem and verified service health.');
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
          'Correlated 14:02 telemetry spike directly with deployment v2.4.1.',
          'Identified connection pool exhaustion in pod error traces.',
          'Executed safe production rollback restoring 99.96% availability.'
        ]
      },
      [
        'Mitigated critical 42% HTTP 502/504 production checkout outage.',
        'Rolled back leaking v2.4.1 microservice image and published postmortem.'
      ]
    );
  };

  return (
    <div className="space-y-6">
      {/* Telemetry Dashboard Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`p-4 rounded-2xl border ${metrics.errorRate > 5 ? 'border-rose-500/50 bg-rose-950/20' : 'border-emerald-500/50 bg-emerald-950/20'}`}>
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">HTTP 502/504 Error Rate</span>
          <span className={`text-2xl font-black font-mono ${metrics.errorRate > 5 ? 'text-rose-400' : 'text-emerald-400'}`}>
            {metrics.errorRate}%
          </span>
          <span className="text-[10px] text-slate-500 block mt-1">SLA Threshold: &lt; 0.1%</span>
        </div>

        <div className={`p-4 rounded-2xl border ${metrics.latencyP99 > 500 ? 'border-rose-500/50 bg-rose-950/20' : 'border-emerald-500/50 bg-emerald-950/20'}`}>
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">P99 Latency</span>
          <span className={`text-2xl font-black font-mono ${metrics.latencyP99 > 500 ? 'text-rose-400' : 'text-emerald-400'}`}>
            {metrics.latencyP99} ms
          </span>
          <span className="text-[10px] text-slate-500 block mt-1">Baseline: 110 ms</span>
        </div>

        <div className={`p-4 rounded-2xl border ${metrics.dbPoolUsage > 80 ? 'border-rose-500/50 bg-rose-950/20' : 'border-emerald-500/50 bg-emerald-950/20'}`}>
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Database Pool Usage</span>
          <span className={`text-2xl font-black font-mono ${metrics.dbPoolUsage > 80 ? 'text-rose-400' : 'text-emerald-400'}`}>
            {metrics.dbPoolUsage}%
          </span>
          <span className="text-[10px] text-slate-500 block mt-1">200/200 Connections Saturated</span>
        </div>

        <div className="p-4 rounded-2xl border border-sentinel-800 bg-sentinel-900/60">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Active Microservices</span>
          <span className="text-xl font-bold font-mono text-white block mt-1">{metrics.activePods}</span>
          <span className="text-[10px] text-slate-500 block mt-1">Image: {isRolledBack ? 'v2.4.0 (Stable)' : 'v2.4.1 (Current)'}</span>
        </div>
      </div>

      {/* Pod Log Streamer */}
      <div className="rounded-2xl border border-sentinel-800 bg-sentinel-950 overflow-hidden font-mono text-xs shadow-2xl">
        <div className="p-3 bg-sentinel-900 border-b border-sentinel-800 flex items-center justify-between text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span className="text-white font-semibold">Live Kubernetes Container Pod Stream (checkout-svc)</span>
          </div>
          <span className="text-slate-500 text-[11px]">Trailing 6 log events</span>
        </div>
        <div className="p-4 space-y-1.5 overflow-x-auto text-slate-300">
          {podLogs.map((log, i) => (
            <div key={i} className={log.includes('FATAL') || log.includes('ERROR') ? 'text-rose-400 font-bold' : log.includes('WARN') ? 'text-amber-400' : ''}>
              {log}
            </div>
          ))}
        </div>
      </div>

      {/* Hypothesis & Rollback Workflow */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Step 1: Hypothesis Matrix */}
        <div className="p-5 rounded-2xl bg-sentinel-900/80 border border-sentinel-800 space-y-3">
          <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <span>1. Formulate Root Cause Hypothesis</span>
          </h4>
          <div className="space-y-2 text-xs">
            {hypotheses.map(hyp => (
              <div
                key={hyp.id}
                onClick={() => handleSelectHypothesis(hyp.id)}
                className={`p-3 rounded-xl border cursor-pointer transition ${
                  selectedHypothesis === hyp.id
                    ? hyp.isCorrect
                      ? 'border-emerald-500 bg-emerald-950/20 text-emerald-200'
                      : 'border-rose-500 bg-rose-950/20 text-rose-200'
                    : 'border-sentinel-800 bg-sentinel-950 text-slate-400 hover:border-slate-700'
                }`}
              >
                <p>{hyp.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Step 2: Deployment Rollback Console */}
        <div className="p-5 rounded-2xl bg-sentinel-900/80 border border-sentinel-800 space-y-3">
          <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
            <RotateCcw className="w-4 h-4 text-amber-400" />
            <span>2. Safe Mitigation & Rollback</span>
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Mitigate the outage immediately without attempting dangerous hotfixes in production. Revert from v2.4.1 to stable revision v2.4.0.
          </p>

          {!isRolledBack ? (
            <button
              onClick={handleTriggerRollback}
              disabled={selectedHypothesis !== 'hyp_db_leak'}
              className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-white font-semibold text-xs flex items-center justify-center gap-2 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Trigger Rollback (kubectl rollout undo)</span>
            </button>
          ) : (
            <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/40 text-emerald-300 text-xs">
              ✓ Rollback executed: Pods successfully redeployed to v2.4.0! Telemetry metrics have normalized.
            </div>
          )}
        </div>
      </div>

      {/* Step 3: Postmortem & Finalize */}
      {isRolledBack && !isCompleted && (
        <div className="p-6 rounded-2xl bg-sentinel-900/80 border border-sentinel-800 space-y-4">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-emerald-400" />
            <span>3. Incident Postmortem & Preventive Action Plan</span>
          </h4>
          <textarea
            rows={2}
            value={postmortemNotes}
            onChange={e => setPostmortemNotes(e.target.value)}
            placeholder="Add preventive measures (e.g. Add integration tests for connection pool leak detection in CI/CD pipeline)..."
            className="w-full bg-sentinel-950 border border-sentinel-800 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-electric-500"
          />
          <button
            onClick={handleFinishMission}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition"
          >
            Submit Incident Resolution & Complete Mission
          </button>
        </div>
      )}

      {/* Completion Banner */}
      {isCompleted && (
        <div className="p-6 rounded-3xl bg-sentinel-900 border border-emerald-500/50 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Outage Resolved! Mission Complete</h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto mt-1">
              You triaged a severe production outage, verified DB pool exhaustion from container logs, executed a safe rollback, and stabilized customer traffic to 99.96% uptime.
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
