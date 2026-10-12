import React, { useState } from 'react';
import {
  Briefcase,
  Search,
  Filter,
  ArrowRight,
  Zap,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MISSIONS } from '../../data/missionsData';
import { SKILL_DOMAINS } from '../../data/taxonomy';
import { Badge } from '../common/Badge';
import { DifficultyLevel } from '../../types/skills';

export const MissionLibraryPage: React.FC = () => {
  const { startMission, navigateTo, missionAttempts } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const filteredMissions = MISSIONS.filter(mission => {
    const matchesSearch =
      mission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mission.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mission.briefing.summary.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDomain = selectedDomain === 'all' || mission.domainId === selectedDomain;
    const matchesDifficulty = selectedDifficulty === 'all' || mission.difficulty === selectedDifficulty;

    return matchesSearch && matchesDomain && matchesDifficulty;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-sentinel-900 border border-blue-200 dark:border-sentinel-800 text-xs font-semibold text-blue-700 dark:text-cyan-400">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Job-Oriented Practical Simulation Labs</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Practical Assessment Missions
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm max-w-2xl leading-relaxed">
          Step into junior technical roles across security, development, networking, and data operations. Work directly with simulated logs, terminals, HTTP inspectors, and code suites to prove your capabilities.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-sentinel-900 border border-sentinel-800 space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by mission title, role, or keywords..."
              className="w-full bg-sentinel-950 border border-sentinel-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Difficulty Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <select
              value={selectedDifficulty}
              onChange={e => setSelectedDifficulty(e.target.value)}
              className="bg-sentinel-950 border border-sentinel-800 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full md:w-auto"
            >
              <option value="all">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Domain Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-1 border-t border-sentinel-800">
          <button
            onClick={() => setSelectedDomain('all')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
              selectedDomain === 'all'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-sentinel-950 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-sentinel-800'
            }`}
          >
            All Tracks ({MISSIONS.length})
          </button>
          {Object.values(SKILL_DOMAINS).map(dom => (
            <button
              key={dom.id}
              onClick={() => setSelectedDomain(dom.id)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                selectedDomain === dom.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-sentinel-950 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-sentinel-800'
              }`}
            >
              {dom.title}
            </button>
          ))}
        </div>
      </div>

      {/* Missions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMissions.map(mission => {
          const isCompleted = missionAttempts.some(a => a.missionId === mission.id && a.status === 'completed');

          return (
            <div
              key={mission.id}
              className="flex flex-col justify-between p-6 rounded-3xl bg-sentinel-900 border border-sentinel-800 hover:border-blue-400 dark:hover:border-slate-700 transition space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge difficulty={mission.difficulty} />
                  <div className="flex items-center gap-1 font-mono text-xs text-blue-600 dark:text-electric-400 font-semibold">
                    <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>+{mission.xpReward} XP</span>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    {mission.role}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">{mission.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                    {mission.briefing.summary}
                  </p>
                </div>

                {/* Key Skills Tested */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                    Tested Capabilities:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {mission.skillsTested.slice(0, 3).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] font-medium bg-sentinel-950 text-slate-700 dark:text-slate-300 border border-sentinel-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-sentinel-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
                  <Clock className="w-3 h-3" />
                  <span>~{mission.estimatedMinutes} min</span>
                </div>

                <button
                  onClick={() => {
                    startMission(mission.id);
                    navigateTo('mission_workspace', { missionId: mission.id });
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                    isCompleted
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/50'
                      : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md'
                  }`}
                >
                  <span>{isCompleted ? 'Retest Mission' : 'Enter Mission Lab'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
