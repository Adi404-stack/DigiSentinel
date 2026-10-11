import React from 'react';
import { CompetencyStatus, DifficultyLevel } from '../../types/skills';

interface BadgeProps {
  status?: CompetencyStatus;
  difficulty?: DifficultyLevel;
  variant?: 'simulated' | 'neutral' | 'accent' | 'success' | 'warning' | 'danger';
  text?: string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({ status, difficulty, variant, text, size = 'sm' }) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm';

  if (status) {
    const config: Record<CompetencyStatus, { label: string; bg: string; text: string; border: string }> = {
      demonstrated: {
        label: 'Demonstrated',
        bg: 'bg-emerald-500/10',
        text: 'text-emerald-400',
        border: 'border-emerald-500/30'
      },
      developing: {
        label: 'Developing',
        bg: 'bg-electric-500/10',
        text: 'text-electric-400',
        border: 'border-electric-500/30'
      },
      needs_practice: {
        label: 'Needs Practice',
        bg: 'bg-amber-500/10',
        text: 'text-amber-400',
        border: 'border-amber-500/30'
      },
      limited_evidence: {
        label: 'Limited Evidence',
        bg: 'bg-slate-500/10',
        text: 'text-slate-400',
        border: 'border-slate-500/30'
      },
      not_assessed: {
        label: 'Not Assessed',
        bg: 'bg-slate-800/50',
        text: 'text-slate-500',
        border: 'border-slate-700/50'
      }
    };
    const c = config[status];
    return (
      <span className={`inline-flex items-center font-medium rounded-full border ${c.bg} ${c.text} ${c.border} ${sizeClasses}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-80" />
        {c.label}
      </span>
    );
  }

  if (difficulty) {
    const dConfig: Record<DifficultyLevel, { label: string; color: string; border: string }> = {
      beginner: { label: 'Beginner', color: 'text-cyan-400 bg-cyan-500/10', border: 'border-cyan-500/30' },
      intermediate: { label: 'Intermediate', color: 'text-blue-400 bg-blue-500/10', border: 'border-blue-500/30' },
      advanced: { label: 'Advanced', color: 'text-violet-400 bg-violet-500/10', border: 'border-violet-500/30' }
    };
    const d = dConfig[difficulty];
    return (
      <span className={`inline-flex items-center font-semibold rounded-md border ${d.color} ${d.border} ${sizeClasses}`}>
        {d.label}
      </span>
    );
  }

  if (variant === 'simulated') {
    return (
      <span className={`inline-flex items-center font-mono font-medium rounded border border-purple-500/30 bg-purple-500/10 text-purple-300 ${sizeClasses}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse mr-1.5" />
        Simulated Lab Environment
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center font-medium rounded-full border border-slate-700 bg-slate-800/60 text-slate-300 ${sizeClasses}`}>
      {text}
    </span>
  );
};
