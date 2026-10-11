import React, { useState } from 'react';
import {
  Code2,
  Play,
  CheckCircle2,
  XCircle,
  Bug,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FileCode,
  Terminal
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';

export const AppDebugger: React.FC = () => {
  const { completeMissionTask, finalizeMission, navigateTo } = useApp();

  const [activeTab, setActiveTab] = useState<'editor' | 'tests'>('editor');
  const [selectedBugId, setSelectedBugId] = useState<string | null>(null);
  const [selectedPatchId, setSelectedPatchId] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<{ id: string; name: string; passed: boolean; error?: string }[]>([
    { id: 't1', name: 'Standard discount 20% on ₹1,000 cart', passed: true },
    { id: 't2', name: 'Max discount cap at ₹500 on ₹10,000 cart', passed: false, error: 'Expected max discount ₹500, but received ₹2,000' },
    { id: 't3', name: 'Small cart under ₹100 should never calculate negative total', passed: false, error: 'Subtotal ₹80 resulted in final total -₹405.60' },
    { id: 't4', name: 'Empty cart subtotal ₹0 returns total ₹0', passed: true }
  ]);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  const brokenCode = `// src/modules/checkoutPricing.ts
export function calculateCheckoutTotal(subtotal: number, coupon?: string): number {
  if (subtotal <= 0) return 0;
  
  let discount = 0;
  if (coupon === 'SAVE20') {
    const rawDiscount = subtotal * 0.20;
    // DEFECTIVE LINE (Line 8):
    discount = Math.max(500, rawDiscount); 
  }
  
  const tax = (subtotal - discount) * 0.18;
  return Number((subtotal - discount + tax).toFixed(2));
}`;

  const patchedCode = `// src/modules/checkoutPricing.ts
export function calculateCheckoutTotal(subtotal: number, coupon?: string): number {
  if (subtotal <= 0) return 0;
  
  let discount = 0;
  if (coupon === 'SAVE20') {
    const rawDiscount = subtotal * 0.20;
    // PATCHED (Line 8): Cap discount to at most ₹500, bounded by subtotal
    discount = Math.min(500, Math.min(subtotal, rawDiscount)); 
  }
  
  const tax = Math.max(0, subtotal - discount) * 0.18;
  return Number((subtotal - discount + tax).toFixed(2));
}`;

  const bugOptions = [
    {
      id: 'math_max_inversion',
      label: 'Line 8 uses Math.max(500, rawDiscount) instead of Math.min(500, rawDiscount), enforcing a ₹500 minimum deduction even when cart value is tiny.',
      isCorrect: true
    },
    {
      id: 'tax_multiplier',
      label: 'Line 11 tax calculation uses 0.18 which causes floating point NaN overflow.',
      isCorrect: false
    },
    {
      id: 'subtotal_zero',
      label: 'Line 2 subtotal check misses undefined type assertion.',
      isCorrect: false
    }
  ];

  const patchOptions = [
    {
      id: 'patch_min_cap',
      label: 'discount = Math.min(500, rawDiscount); with Math.max(0, subtotal - discount) for tax calculation',
      codeSnippet: 'discount = Math.min(500, Math.min(subtotal, rawDiscount));',
      isCorrect: true
    },
    {
      id: 'patch_hardcode',
      label: 'discount = 500; regardless of coupon code',
      codeSnippet: 'discount = 500;',
      isCorrect: false
    },
    {
      id: 'patch_remove_coupon',
      label: 'Delete coupon evaluation entirely to prevent errors',
      codeSnippet: 'discount = 0;',
      isCorrect: false
    }
  ];

  const handleRunTests = () => {
    setIsRunningTests(true);
    setTimeout(() => {
      if (selectedPatchId === 'patch_min_cap') {
        setTestResults([
          { id: 't1', name: 'Standard discount 20% on ₹1,000 cart', passed: true },
          { id: 't2', name: 'Max discount cap at ₹500 on ₹10,000 cart', passed: true },
          { id: 't3', name: 'Small cart under ₹100 should never calculate negative total', passed: true },
          { id: 't4', name: 'Empty cart subtotal ₹0 returns total ₹0', passed: true }
        ]);
        setIsFixed(true);
        completeMissionTask('dba_task_3', 100, 'Replaced Math.max with bounded Math.min discount cap.');
        completeMissionTask('dba_task_4', 100, 'Executed regression suite: 4/4 passing tests.');
        finalizeMission(
          {
            accuracy: 100,
            evidenceReasoning: 95,
            independence: 100,
            efficiency: 95,
            riskAwareness: 90,
            overallScore: 96,
            criticalErrors: [],
            feedbackNotes: [
              'Correctly identified Math.max boundary inversion.',
              'Applied resilient discount cap preventing negative checkout amounts.',
              'Passed 100% of unit test assertions in CI.'
            ]
          },
          [
            'Debugged checkout pricing function Math.max ceiling inversion defect.',
            'Verified all 4 unit test cases with zero regressions.'
          ]
        );
      } else {
        alert('Tests still failing: please select the valid refactor patch first.');
      }
      setIsRunningTests(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Code vs Tests Tab Bar */}
      <div className="flex items-center justify-between border-b border-sentinel-850 pb-3 text-xs">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('editor')}
            className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition ${
              activeTab === 'editor'
                ? 'bg-sentinel-850 text-white border border-sentinel-700'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>checkoutPricing.ts</span>
          </button>
          <button
            onClick={() => setActiveTab('tests')}
            className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition ${
              activeTab === 'tests'
                ? 'bg-sentinel-850 text-white border border-sentinel-700'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Unit Test Suite ({testResults.filter(t => t.passed).length}/{testResults.length} Passing)</span>
          </button>
        </div>

        <button
          onClick={handleRunTests}
          disabled={isRunningTests}
          className="px-4 py-1.5 rounded-lg bg-electric-600 hover:bg-electric-500 disabled:opacity-40 text-white font-semibold text-xs flex items-center gap-1.5 transition shadow"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>{isRunningTests ? 'Running Vitest...' : 'Run Test Suite'}</span>
        </button>
      </div>

      {/* Editor & Bug Analysis Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Code Viewer */}
        <div className="lg:col-span-7 rounded-2xl border border-sentinel-800 bg-sentinel-950 overflow-hidden font-mono text-xs">
          <div className="p-3 bg-sentinel-900/90 border-b border-sentinel-800 flex items-center justify-between text-slate-400">
            <span className="text-[11px] text-cyan-400">TypeScript Runtime • Mode: Strict</span>
            <span className="text-[11px] text-slate-500">14 lines</span>
          </div>

          <pre className="p-4 overflow-x-auto text-slate-300 leading-relaxed">
            {isFixed ? patchedCode : brokenCode}
          </pre>
        </div>

        {/* Right: Diagnostic Investigation & Patch Selector */}
        <div className="lg:col-span-5 space-y-5">
          {/* Step 1: Bug Isolation */}
          <div className="p-5 rounded-2xl bg-sentinel-900/80 border border-sentinel-800 space-y-3">
            <div className="flex items-center gap-2">
              <Bug className="w-4 h-4 text-amber-400" />
              <h4 className="text-sm font-bold text-white">1. Identify Root Cause Defect</h4>
            </div>
            <div className="space-y-2 text-xs">
              {bugOptions.map(opt => (
                <div
                  key={opt.id}
                  onClick={() => {
                    setSelectedBugId(opt.id);
                    if (opt.isCorrect) {
                      completeMissionTask('dba_task_1', 100, 'Isolated Math.max discount inversion on line 8.');
                    }
                  }}
                  className={`p-3 rounded-xl border cursor-pointer transition ${
                    selectedBugId === opt.id
                      ? opt.isCorrect
                        ? 'border-emerald-500 bg-emerald-950/20 text-emerald-200'
                        : 'border-rose-500 bg-rose-950/20 text-rose-200'
                      : 'border-sentinel-800 bg-sentinel-950 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <p>{opt.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Step 2: Select Patch */}
          <div className="p-5 rounded-2xl bg-sentinel-900/80 border border-sentinel-800 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <h4 className="text-sm font-bold text-white">2. Select Resilient Patch</h4>
            </div>
            <div className="space-y-2 text-xs">
              {patchOptions.map(patch => (
                <div
                  key={patch.id}
                  onClick={() => setSelectedPatchId(patch.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition space-y-1 font-mono ${
                    selectedPatchId === patch.id
                      ? 'border-electric-500 bg-electric-950/40 text-white'
                      : 'border-sentinel-800 bg-sentinel-950 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <p className="font-sans font-medium text-slate-300">{patch.label}</p>
                  <code className="text-cyan-300 block text-[11px]">{patch.codeSnippet}</code>
                </div>
              ))}
            </div>

            <button
              onClick={handleRunTests}
              disabled={!selectedPatchId || isRunningTests}
              className="w-full mt-2 py-2.5 rounded-xl bg-electric-600 hover:bg-electric-500 disabled:opacity-40 text-white font-semibold text-xs flex items-center justify-center gap-2 transition"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Apply Patch & Run Vitest Suite</span>
            </button>
          </div>
        </div>
      </div>

      {/* Unit Test Results Drawer */}
      <div className="p-5 rounded-2xl bg-sentinel-900/80 border border-sentinel-800 space-y-3">
        <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
          Automated Test Suite Telemetry:
        </h4>
        <div className="space-y-2">
          {testResults.map(test => (
            <div
              key={test.id}
              className={`p-3 rounded-xl border text-xs flex items-start justify-between gap-3 font-mono ${
                test.passed
                  ? 'border-emerald-500/30 bg-emerald-950/20 text-emerald-300'
                  : 'border-rose-500/30 bg-rose-950/20 text-rose-300'
              }`}
            >
              <div className="flex items-center gap-2">
                {test.passed ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-rose-400" />}
                <span>{test.name}</span>
              </div>
              <span className="font-bold">{test.passed ? 'PASS' : 'FAIL'}</span>
              {test.error && (
                <span className="text-[11px] text-rose-400/90 block w-full mt-1">Error: {test.error}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Success Celebration */}
      {isFixed && (
        <div className="p-6 rounded-3xl bg-sentinel-900 border border-emerald-500/50 shadow-2xl text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">All Tests Passing! Mission Complete</h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto mt-1">
              The negative balance bug was completely eradicated. All four unit test cases passed with 100% boundary coverage.
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
