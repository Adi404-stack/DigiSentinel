import React, { useState } from 'react';
import {
  Database,
  Search,
  Play,
  CheckCircle2,
  Trash2,
  Filter,
  BarChart3,
  ArrowRight,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';

export const DataDetective: React.FC = () => {
  const { completeMissionTask, finalizeMission, navigateTo } = useApp();

  const [activeTab, setActiveTab] = useState<'sql' | 'dataset' | 'reconciliation'>('sql');
  const [sqlQuery, setSqlQuery] = useState<string>(
    'SELECT order_id, COUNT(*) FROM transactions GROUP BY order_id HAVING COUNT(*) > 1;'
  );

  const [isDeduplicated, setIsDeduplicated] = useState(false);
  const [isOutlierRemoved, setIsOutlierRemoved] = useState(false);
  const [queryOutput, setQueryOutput] = useState<any[] | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  // Synthetic dirty dataset sample
  const rawDataset = [
    { id: 'TXN-901', customer: 'Cust_481', amount: 240, status: 'COMPLETED', date: '2026-09-01', flag: 'OK' },
    { id: 'TXN-902', customer: 'Cust_102', amount: 1250000, status: 'COMPLETED', date: '2026-09-02', flag: 'EXTREME_OUTLIER' },
    { id: 'TXN-903', customer: 'Cust_881', amount: 450, status: 'COMPLETED', date: '2026-09-03', flag: 'OK' },
    { id: 'TXN-903', customer: 'Cust_881', amount: 450, status: 'COMPLETED', date: '2026-09-03', flag: 'DUPLICATE' },
    { id: 'TXN-904', customer: 'NULL', amount: 180, status: 'FAILED', date: '2026-09-04', flag: 'NULL_CUSTOMER' },
    { id: 'TXN-905', customer: 'Cust_219', amount: 890, status: 'COMPLETED', date: '2026-09-05', flag: 'OK' },
    { id: 'TXN-906', customer: 'Cust_512', amount: 320, status: 'COMPLETED', date: '2026-09-06', flag: 'OK' },
  ];

  const handleRunQuery = () => {
    const q = sqlQuery.toLowerCase();
    if (q.includes('having') && q.includes('count')) {
      setQueryOutput([
        { order_id: 'TXN-903', duplicate_count: 2, total_impact: '$900 (Double Counted)' }
      ]);
      completeMissionTask('dd_task_1', 100, 'Executed GROUP BY HAVING query isolating duplicate TXN-903.');
    } else if (q.includes('1250000') || q.includes('amount >')) {
      setQueryOutput([
        { order_id: 'TXN-902', customer: 'Cust_102', amount: '$1,250,000.00', anomaly: 'Decimal place error / currency inversion' }
      ]);
      completeMissionTask('dd_task_3', 100, 'Identified manual data entry error order TXN-902.');
    } else {
      setQueryOutput([
        { metric: 'Reconciled Transactions', valid_rows: isDeduplicated && isOutlierRemoved ? 5 : 7 },
        { metric: 'True Quarterly Revenue', total: isDeduplicated && isOutlierRemoved ? '$2,080.00' : '$1,252,530.00' }
      ]);
      if (isDeduplicated && isOutlierRemoved) {
        completeMissionTask('dd_task_4', 100, 'Generated reconciled financial revenue metric: $2,080.00.');
        setIsCompleted(true);
        finalizeMission(
          {
            accuracy: 98,
            evidenceReasoning: 95,
            independence: 100,
            efficiency: 94,
            riskAwareness: 90,
            overallScore: 95,
            criticalErrors: [],
            feedbackNotes: [
              'Wrote analytical GROUP BY HAVING query isolating duplicate orders.',
              'Identified extreme decimal typo anomaly TXN-902 ($1.25M discrepancy).',
              'Presented clean reconciled financial report.'
            ]
          },
          [
            'Cleaned duplicate transactions and handled null customer keys.',
            'Resolved $1.2M accounting reporting discrepancy.'
          ]
        );
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex items-center justify-between border-b border-sentinel-850 pb-3 text-xs">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('sql')}
            className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition ${
              activeTab === 'sql'
                ? 'bg-sentinel-850 text-white border border-sentinel-700'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            <span>SQL Analysis Console</span>
          </button>
          <button
            onClick={() => setActiveTab('dataset')}
            className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition ${
              activeTab === 'dataset'
                ? 'bg-sentinel-850 text-white border border-sentinel-700'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Raw Dataset Viewer</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsDeduplicated(true);
              completeMissionTask('dd_task_2', 100, 'Applied deduplication pipeline.');
            }}
            disabled={isDeduplicated}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1 transition ${
              isDeduplicated
                ? 'border-emerald-500/40 text-emerald-400 bg-emerald-950/20'
                : 'border-sentinel-700 bg-sentinel-900 text-slate-300 hover:text-white'
            }`}
          >
            <Trash2 className="w-3 h-3" />
            <span>{isDeduplicated ? 'Duplicates Removed' : 'Remove Duplicate Rows'}</span>
          </button>
          <button
            onClick={() => setIsOutlierRemoved(true)}
            disabled={isOutlierRemoved}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1 transition ${
              isOutlierRemoved
                ? 'border-emerald-500/40 text-emerald-400 bg-emerald-950/20'
                : 'border-sentinel-700 bg-sentinel-900 text-slate-300 hover:text-white'
            }`}
          >
            <Filter className="w-3 h-3" />
            <span>{isOutlierRemoved ? 'Outlier Excluded' : 'Exclude $1.25M Outlier'}</span>
          </button>
        </div>
      </div>

      {/* SQL Runner */}
      {activeTab === 'sql' && (
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-sentinel-900/80 border border-sentinel-800 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-cyan-400 font-bold">SQL Query Editor</span>
              <span>PostgreSQL 16 Dialect</span>
            </div>
            <textarea
              rows={3}
              value={sqlQuery}
              onChange={e => setSqlQuery(e.target.value)}
              className="w-full bg-sentinel-950 border border-sentinel-800 rounded-xl p-3 text-slate-100 font-mono focus:ring-1 focus:ring-electric-500 focus:outline-none"
            />
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <div className="flex gap-2">
                <button
                  onClick={() => setSqlQuery('SELECT order_id, COUNT(*) FROM transactions GROUP BY order_id HAVING COUNT(*) > 1;')}
                  className="px-2.5 py-1 rounded bg-sentinel-950 hover:bg-sentinel-850 text-slate-400 hover:text-slate-200 border border-sentinel-800 text-[11px]"
                >
                  Find Duplicates
                </button>
                <button
                  onClick={() => setSqlQuery('SELECT * FROM transactions WHERE amount > 50000;')}
                  className="px-2.5 py-1 rounded bg-sentinel-950 hover:bg-sentinel-850 text-slate-400 hover:text-slate-200 border border-sentinel-800 text-[11px]"
                >
                  Find Outliers
                </button>
                <button
                  onClick={() => setSqlQuery('SELECT SUM(amount) AS total_reconciled FROM transactions;')}
                  className="px-2.5 py-1 rounded bg-sentinel-950 hover:bg-sentinel-850 text-slate-400 hover:text-slate-200 border border-sentinel-800 text-[11px]"
                >
                  Reconcile Total
                </button>
              </div>

              <button
                onClick={handleRunQuery}
                className="px-5 py-2 rounded-xl bg-electric-600 hover:bg-electric-500 text-white font-semibold text-xs flex items-center gap-1.5 transition"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Execute Query</span>
              </button>
            </div>
          </div>

          {/* Query Output Result Table */}
          {queryOutput && (
            <div className="rounded-2xl border border-sentinel-800 bg-sentinel-950 overflow-hidden text-xs font-mono">
              <div className="p-3 bg-sentinel-900 border-b border-sentinel-800 text-slate-400 flex items-center justify-between">
                <span>Query Result Output</span>
                <span className="text-emerald-400 font-bold">{queryOutput.length} rows returned</span>
              </div>
              <pre className="p-4 text-cyan-300 overflow-x-auto">
                {JSON.stringify(queryOutput, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* Dataset Viewer */}
      {activeTab === 'dataset' && (
        <div className="rounded-2xl border border-sentinel-800 bg-sentinel-950 overflow-x-auto text-xs font-mono">
          <table className="w-full text-left">
            <thead className="bg-sentinel-900 text-slate-400 border-b border-sentinel-800">
              <tr>
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer ID</th>
                <th className="p-3">Amount ($)</th>
                <th className="p-3">Date</th>
                <th className="p-3">Data Hygiene Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sentinel-850 text-slate-300">
              {rawDataset.map((row, idx) => {
                const isExcluded = (row.flag === 'DUPLICATE' && isDeduplicated) || (row.flag === 'EXTREME_OUTLIER' && isOutlierRemoved);
                return (
                  <tr key={idx} className={isExcluded ? 'opacity-30 line-through bg-slate-900' : ''}>
                    <td className="p-3 font-semibold text-white">{row.id}</td>
                    <td className="p-3">{row.customer}</td>
                    <td className="p-3 text-cyan-300 font-bold">${row.amount.toLocaleString()}</td>
                    <td className="p-3">{row.date}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        row.flag === 'OK' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                      }`}>
                        {row.flag}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Completion Banner */}
      {isCompleted && (
        <div className="p-6 rounded-3xl bg-sentinel-900 border border-emerald-500/50 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Financial Dataset Reconciled! Mission Complete</h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto mt-1">
              You wrote targeted analytical SQL queries, removed double-counted duplicate rows, and isolated the $1.25M data entry typo to deliver accurate quarterly reporting.
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
