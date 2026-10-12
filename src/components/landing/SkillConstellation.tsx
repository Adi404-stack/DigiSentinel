import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Brain,
  Code2,
  Lock,
  Terminal,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface ConstellationNode {
  id: string;
  name: string;
  category: string;
  level: string;
  x: number; // percentage
  y: number; // percentage
  icon: React.ElementType;
  color: string;
  glowColor: string;
  description: string;
  competencies: string[];
}

const NODES: ConstellationNode[] = [
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    category: 'Defensive Operations',
    level: 'Core Domain',
    x: 50,
    y: 20,
    icon: ShieldCheck,
    color: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.4)',
    description: 'Threat identification, incident response triage, and perimeter defense validation.',
    competencies: ['Phishing Header Analysis', 'Incident Containment', 'MFA Protocols']
  },
  {
    id: 'digital_safety',
    name: 'Digital Safety',
    category: 'Fraud & Privacy Protection',
    level: 'Essential',
    x: 82,
    y: 38,
    icon: ShieldAlert,
    color: '#8B5CF6',
    glowColor: 'rgba(139, 92, 246, 0.4)',
    description: 'Safeguarding transactions, spotting imposter scams, and managing personal exposure.',
    competencies: ['Payment UTR Verification', 'Social Engineering Triage', 'Credential Protection']
  },
  {
    id: 'tech_reasoning',
    name: 'Technical Reasoning',
    category: 'System Diagnostics',
    level: 'Analytical',
    x: 75,
    y: 78,
    icon: Brain,
    color: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    description: 'Root cause analysis, network layer triage (DNS vs IP), and evidence-based problem solving.',
    competencies: ['DNS Hierarchy Analysis', 'Log Event Correlation', 'Hypothesis Testing']
  },
  {
    id: 'problem_solving',
    name: 'Problem-Solving',
    category: 'Logic & Investigation',
    level: 'Cognitive',
    x: 25,
    y: 78,
    icon: Terminal,
    color: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    description: 'Structured deductive reasoning under ambiguity and isolating false positives.',
    competencies: ['Decision Trees', 'Failure Mode Analysis', 'Constraint Navigation']
  },
  {
    id: 'security_awareness',
    name: 'Security Awareness',
    category: 'Behavioral Defense',
    level: 'Continuous',
    x: 18,
    y: 38,
    icon: Lock,
    color: '#EC4899',
    glowColor: 'rgba(236, 72, 153, 0.4)',
    description: 'Recognizing psychological urgency triggers, fake authority proofs, and data privacy leaks.',
    competencies: ['Urgency Cue Detection', 'Privacy Exposure Minimization', 'Safe Surfing']
  },
  {
    id: 'prog_fundamentals',
    name: 'Programming Basics',
    category: 'Secure Architecture',
    level: 'Constructive',
    x: 50,
    y: 52,
    icon: Code2,
    color: '#6366F1',
    glowColor: 'rgba(99, 102, 241, 0.4)',
    description: 'Code comprehension, boundary condition checks, and spotting common logic vulnerabilities.',
    competencies: ['Boundary Validation', 'Sanitization Patterns', 'Error Handling Logic']
  }
];

// Constellation interconnection edges (pairs of node indices)
const EDGES: [number, number][] = [
  [0, 1], // Cyber -> Digital Safety
  [1, 2], // Digital Safety -> Tech Reasoning
  [2, 3], // Tech Reasoning -> Problem Solving
  [3, 4], // Problem Solving -> Security Awareness
  [4, 0], // Security Awareness -> Cyber
  [5, 0], // Prog Fundamentals -> Cyber
  [5, 1], // Prog Fundamentals -> Digital Safety
  [5, 2], // Prog Fundamentals -> Tech Reasoning
  [5, 3], // Prog Fundamentals -> Problem Solving
  [5, 4], // Prog Fundamentals -> Security Awareness
];

interface SkillConstellationProps {
  onSelectNode?: (nodeId: string) => void;
}

export const SkillConstellation: React.FC<SkillConstellationProps> = ({ onSelectNode }) => {
  const [activeNode, setActiveNode] = useState<ConstellationNode>(NODES[0]);
  const [hoveredNode, setHoveredNode] = useState<ConstellationNode | null>(null);

  const displayNode = hoveredNode || activeNode;

  return (
    <div className="relative w-full max-w-xl mx-auto rounded-3xl bg-sentinel-900/60 border border-sentinel-800/90 p-5 backdrop-blur-md shadow-card overflow-hidden">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-sentinel-800/80 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-mono text-slate-300 font-semibold tracking-wider text-[11px] uppercase">
            Interactive Skill Constellation
          </span>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          6 Core Defense Dimensions
        </span>
      </div>

      {/* Interactive Constellation SVG & Canvas Area */}
      <div className="relative w-full h-[280px] sm:h-[320px] my-2 select-none">
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
        >
          {/* Subtle background connection grid */}
          <circle cx="50" cy="50" r="34" fill="none" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="1 3" />
          <circle cx="50" cy="50" r="18" fill="none" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="1 3" />

          {/* Connected Edges */}
          {EDGES.map(([startIdx, endIdx], i) => {
            const start = NODES[startIdx];
            const end = NODES[endIdx];
            const isHighlighted =
              (displayNode.id === start.id || displayNode.id === end.id);

            return (
              <line
                key={i}
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke={isHighlighted ? displayNode.color : '#26314A'}
                strokeWidth={isHighlighted ? 0.8 : 0.4}
                strokeOpacity={isHighlighted ? 0.85 : 0.5}
                strokeDasharray={isHighlighted ? 'none' : '1 1.5'}
                className="transition-all duration-300"
              />
            );
          })}
        </svg>

        {/* Nodes */}
        {NODES.map((node) => {
          const Icon = node.icon;
          const isSelected = displayNode.id === node.id;

          return (
            <button
              key={node.id}
              onClick={() => {
                setActiveNode(node);
                onSelectNode?.(node.id);
              }}
              onMouseEnter={() => setHoveredNode(node)}
              onMouseLeave={() => setHoveredNode(null)}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              className={`absolute group flex items-center justify-center rounded-2xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                isSelected
                  ? 'w-11 h-11 sm:w-12 sm:h-12 scale-110 z-20'
                  : 'w-9 h-9 sm:w-10 sm:h-10 hover:scale-105 z-10'
              }`}
              title={`${node.name} — Click to inspect`}
            >
              {/* Radial glow aura */}
              <div
                className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${
                  isSelected ? 'opacity-100 blur-md' : 'opacity-0 group-hover:opacity-40 blur-sm'
                }`}
                style={{ backgroundColor: node.glowColor }}
              />

              {/* Node Button Face */}
              <div
                className={`relative w-full h-full rounded-2xl flex items-center justify-center border transition-all duration-200 ${
                  isSelected
                    ? 'border-white/80 shadow-lg'
                    : 'border-sentinel-700 bg-sentinel-950/90 group-hover:border-slate-500'
                }`}
                style={{
                  backgroundColor: isSelected ? node.color : undefined
                }}
              >
                <Icon
                  className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
                    isSelected ? 'text-white' : 'text-slate-300 group-hover:text-white'
                  }`}
                />
              </div>

              {/* Node Name Label Pill */}
              <span
                className={`absolute -bottom-5 whitespace-nowrap text-[10px] font-mono tracking-tight font-medium px-1.5 py-0.5 rounded transition-all pointer-events-none ${
                  isSelected
                    ? 'text-white bg-sentinel-950/90 border border-sentinel-700 shadow-sm opacity-100'
                    : 'text-slate-400 opacity-80 group-hover:opacity-100'
                }`}
              >
                {node.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Node Details Box */}
      <div className="mt-4 pt-3 border-t border-sentinel-800/90 text-left bg-sentinel-950/80 rounded-2xl p-3.5 border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: displayNode.color }}
            />
            <h4 className="text-sm font-bold text-white font-display">
              {displayNode.name}
            </h4>
            <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-sentinel-900 border border-sentinel-800">
              {displayNode.category}
            </span>
          </div>
          <span className="text-[11px] font-mono text-cyan-400 font-medium">
            {displayNode.level}
          </span>
        </div>

        <p className="text-xs text-slate-300 mt-2 leading-relaxed">
          {displayNode.description}
        </p>

        {/* Competencies Badges */}
        <div className="flex flex-wrap gap-1.5 mt-2.5 pt-2 border-t border-sentinel-850">
          <span className="text-[10px] font-mono text-slate-500 mr-1 self-center">
            Assesses:
          </span>
          {displayNode.competencies.map((comp, idx) => (
            <span
              key={idx}
              className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-sentinel-900 text-slate-300 border border-sentinel-800"
            >
              {comp}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
