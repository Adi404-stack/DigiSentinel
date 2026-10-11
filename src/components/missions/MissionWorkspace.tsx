import React from 'react';
import {
  Briefcase,
  Clock,
  Zap,
  ArrowLeft,
  ShieldAlert,
  CheckCircle2,
  Terminal,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MISSIONS } from '../../data/missionsData';
import { Badge } from '../common/Badge';

// Import the 6 interactive mission engines
import { FraudInvestigator } from './interactive/FraudInvestigator';
import { AppDebugger } from './interactive/AppDebugger';
import { NetworkTroubleshooter } from './interactive/NetworkTroubleshooter';
import { AppSecAnalyst } from './interactive/AppSecAnalyst';
import { DataDetective } from './interactive/DataDetective';
import { IncidentResponder } from './interactive/IncidentResponder';

export const MissionWorkspace: React.FC = () => {
  const { activeMissionId, navigateTo } = useApp();

  const mission = MISSIONS.find(m => m.id === activeMissionId) || MISSIONS[0];

  const renderInteractiveEngine = () => {
    switch (mission.id) {
      case 'fraud_investigator':
        return <FraudInvestigator />;
      case 'debug_broken_app':
        return <AppDebugger />;
      case 'network_troubleshoot':
        return <NetworkTroubleshooter />;
      case 'appsec_analyst':
        return <AppSecAnalyst />;
      case 'data_detective':
        return <DataDetective />;
      case 'incident_responder':
        return <IncidentResponder />;
      default:
        return <FraudInvestigator />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Navigation & Role Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-sentinel-850 pb-4">
        <button
          onClick={() => navigateTo('missions')}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Mission Library</span>
        </button>

        <div className="flex items-center gap-3">
          <Badge difficulty={mission.difficulty} />
          <Badge variant="simulated" />
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-electric-950/60 border border-electric-500/30 text-electric-300 font-mono text-xs">
            <Zap className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span>+{mission.xpReward} XP</span>
          </div>
        </div>
      </div>

      {/* Mission Briefing Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-sentinel-900/80 border border-sentinel-800 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-sentinel-850 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Role: {mission.role}</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">{mission.department}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {mission.title}
            </h1>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Est. {mission.estimatedMinutes} Mins</span>
            </div>
            <div>Org: {mission.briefing.organization}</div>
          </div>
        </div>

        {/* Mission Briefing Text & Objectives */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-xs">
          <div className="md:col-span-7 space-y-3">
            <span className="font-mono uppercase tracking-wider text-slate-400 font-bold block">
              Incident Situation:
            </span>
            <p className="text-slate-200 leading-relaxed bg-sentinel-950/70 p-4 rounded-xl border border-sentinel-850">
              {mission.briefing.summary}
            </p>
          </div>

          <div className="md:col-span-5 space-y-2">
            <span className="font-mono uppercase tracking-wider text-slate-400 font-bold block">
              Key Deliverables:
            </span>
            <ul className="space-y-2">
              {mission.briefing.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Main Interactive Mission Workspace */}
      <div className="pt-2">
        {renderInteractiveEngine()}
      </div>
    </div>
  );
};
