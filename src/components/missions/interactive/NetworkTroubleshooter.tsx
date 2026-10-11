import React, { useState } from 'react';
import {
  Network,
  Terminal,
  Server,
  Laptop,
  Router,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ShieldCheck,
  Settings,
  HelpCircle,
  Play
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';

export const NetworkTroubleshooter: React.FC = () => {
  const { completeMissionTask, finalizeMission, navigateTo } = useApp();

  const [commandInput, setCommandInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    'DigiSentinel Network Simulation v1.4.0 [Type "help" for available commands]',
    'Active Host: Host-A (192.168.1.100/24)',
    'Objective: Diagnose why Host-A cannot reach Billing DB (10.0.5.20)'
  ]);

  // Host configuration state (initially misconfigured)
  const [hostConfig, setHostConfig] = useState({
    ip: '192.168.1.100',
    subnet: '255.255.255.0',
    gateway: '192.168.1.254', // MISCONFIGURED (actual gateway is 192.168.1.1)
    dns: '192.168.1.2'
  });

  const [isConfigDrawerOpen, setIsConfigDrawerOpen] = useState(false);
  const [isGatewayFixed, setIsGatewayFixed] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const runCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const parts = trimmed.split(' ');
    const mainCmd = parts[0].toLowerCase();
    const arg = parts[1] || '';

    const newLogs: string[] = [`$ ${trimmed}`];

    if (mainCmd === 'help') {
      newLogs.push(
        'Supported commands:',
        '  ipconfig           - Display adapter IP, subnet, gateway, DNS',
        '  ping <ip>          - Test ICMP reachability to target IP',
        '  traceroute <ip>    - Trace packet hops to target IP',
        '  nslookup <domain>  - Resolve DNS domain name to IP',
        '  clear              - Clear terminal window'
      );
    } else if (mainCmd === 'clear') {
      setTerminalHistory([]);
      setCommandInput('');
      return;
    } else if (mainCmd === 'ipconfig') {
      newLogs.push(
        `Ethernet adapter Local Area Connection:`,
        `  IPv4 Address . . . . . . . : ${hostConfig.ip}`,
        `  Subnet Mask  . . . . . . . : ${hostConfig.subnet}`,
        `  Default Gateway  . . . . . : ${hostConfig.gateway}`,
        `  DNS Servers  . . . . . . . : ${hostConfig.dns}`
      );
      completeMissionTask('net_task_2', 100, 'Inspected adapter configuration via ipconfig.');
    } else if (mainCmd === 'ping') {
      if (!arg) {
        newLogs.push('Usage: ping <ip_address>');
      } else if (arg === '192.168.1.101') {
        newLogs.push(
          `Pinging 192.168.1.101 with 32 bytes of data:`,
          `Reply from 192.168.1.101: bytes=32 time=0.8ms TTL=64`,
          `Reply from 192.168.1.101: bytes=32 time=0.9ms TTL=64`,
          `Ping statistics: Packets: Sent = 2, Received = 2, Lost = 0 (0% loss)`
        );
      } else if (arg === '192.168.1.1') {
        newLogs.push(
          `Pinging 192.168.1.1 (Gateway) with 32 bytes of data:`,
          `Reply from 192.168.1.1: bytes=32 time=1.2ms TTL=64`,
          `Reply from 192.168.1.1: bytes=32 time=1.1ms TTL=64`,
          `Ping statistics: Packets: Sent = 2, Received = 2, Lost = 0 (0% loss)`
        );
      } else if (arg === '192.168.1.254') {
        newLogs.push(
          `Pinging 192.168.1.254 with 32 bytes of data:`,
          `Request timed out.`,
          `Destination host unreachable.`,
          `Ping statistics: Packets: Sent = 2, Received = 0, Lost = 2 (100% loss)`
        );
      } else if (arg === '10.0.5.20') {
        if (isGatewayFixed || hostConfig.gateway === '192.168.1.1') {
          newLogs.push(
            `Pinging 10.0.5.20 (Billing DB) with 32 bytes of data:`,
            `Reply from 10.0.5.20: bytes=32 time=8.4ms TTL=62`,
            `Reply from 10.0.5.20: bytes=32 time=8.2ms TTL=62`,
            `Ping statistics: Packets: Sent = 2, Received = 2, Lost = 0 (0% loss)`
          );
          completeMissionTask('net_task_4', 100, 'Verified end-to-end connectivity to destination Billing DB.');
          setIsCompleted(true);
          finalizeMission(
            {
              accuracy: 100,
              evidenceReasoning: 96,
              independence: 95,
              efficiency: 92,
              riskAwareness: 90,
              overallScore: 95,
              criticalErrors: [],
              feedbackNotes: [
                'Successfully isolated default gateway discrepancy using CLI diagnostics.',
                'Repaired gateway IP to 192.168.1.1 restoring upstream routing to 10.0.5.20.'
              ]
            },
            [
              'Used ping and ipconfig to isolate non-responsive gateway 192.168.1.254.',
              'Reconfigured default gateway to valid router IP 192.168.1.1.',
              'Achieved 0% packet loss to billing server 10.0.5.20.'
            ]
          );
        } else {
          newLogs.push(
            `Pinging 10.0.5.20 with 32 bytes of data:`,
            `Destination host unreachable (Default gateway ${hostConfig.gateway} is not responding).`,
            `Ping statistics: Packets: Sent = 2, Received = 0, Lost = 2 (100% loss)`
          );
        }
      } else {
        newLogs.push(`Ping to ${arg}: Destination net unreachable.`);
      }
      completeMissionTask('net_task_1', 100, 'Executed ping command to isolate dropped hops.');
    } else if (mainCmd === 'traceroute') {
      if (isGatewayFixed || hostConfig.gateway === '192.168.1.1') {
        newLogs.push(
          `traceroute to 10.0.5.20 (10.0.5.20), 30 hops max:`,
          ` 1  192.168.1.1 (gateway.corp.local)  1.214 ms`,
          ` 2  10.0.0.1 (core-rtr-01.corp.local) 4.512 ms`,
          ` 3  10.0.5.20 (billing-db.corp.local) 8.310 ms`
        );
      } else {
        newLogs.push(
          `traceroute to 10.0.5.20:`,
          ` 1  192.168.1.254 * * * Request timed out.`,
          ` 2  * * *`
        );
      }
    } else {
      newLogs.push(`Command not recognized: ${mainCmd}. Type "help" for supported commands.`);
    }

    setTerminalHistory(prev => [...prev, ...newLogs]);
    setCommandInput('');
  };

  const handleApplyConfig = (newGateway: string) => {
    setHostConfig(prev => ({ ...prev, gateway: newGateway }));
    if (newGateway === '192.168.1.1') {
      setIsGatewayFixed(true);
      completeMissionTask('net_task_3', 100, 'Updated default gateway to valid router IP 192.168.1.1.');
      setTerminalHistory(prev => [
        ...prev,
        'SYSTEM: Network adapter configuration saved.',
        'Default gateway updated to 192.168.1.1. Try "ping 10.0.5.20" now!'
      ]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Network Topology Visual Diagram */}
      <div className="p-6 rounded-2xl bg-sentinel-900/80 border border-sentinel-800 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
            <Network className="w-4 h-4" />
            <span>Interactive Network Topology Map</span>
          </span>
          <button
            onClick={() => setIsConfigDrawerOpen(!isConfigDrawerOpen)}
            className="px-3 py-1.5 rounded-lg bg-sentinel-800 hover:bg-sentinel-700 text-xs font-medium text-slate-300 flex items-center gap-1 transition"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Configure Host-A Adapter</span>
          </button>
        </div>

        {/* SVG Topology Nodes Map */}
        <div className="p-4 rounded-xl bg-sentinel-950 border border-sentinel-850 flex flex-wrap items-center justify-around gap-6 py-8">
          {/* Host A */}
          <div className="text-center space-y-1.5">
            <div className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center mx-auto transition ${
              isGatewayFixed ? 'border-emerald-500 bg-emerald-950/30 text-emerald-400' : 'border-rose-500 bg-rose-950/30 text-rose-400'
            }`}>
              <Laptop className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold text-white block">Host-A (Workstation)</span>
            <span className="text-[11px] font-mono text-slate-400 block">192.168.1.100</span>
            <span className={`text-[10px] font-mono block ${isGatewayFixed ? 'text-emerald-400' : 'text-rose-400'}`}>
              GW: {hostConfig.gateway}
            </span>
          </div>

          <div className="text-slate-600 font-mono text-xs">───── (L2 Switch) ─────</div>

          {/* Router / Gateway */}
          <div className="text-center space-y-1.5">
            <div className="w-14 h-14 rounded-2xl border-2 border-blue-500 bg-blue-950/30 text-blue-400 flex items-center justify-center mx-auto">
              <Router className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold text-white block">Router / Gateway</span>
            <span className="text-[11px] font-mono text-emerald-400 block">192.168.1.1</span>
            <span className="text-[10px] text-slate-500 block">Subnet 192.168.1.0/24</span>
          </div>

          <div className="text-slate-600 font-mono text-xs">───── (Core WAN) ─────</div>

          {/* Billing Database Server */}
          <div className="text-center space-y-1.5">
            <div className="w-14 h-14 rounded-2xl border-2 border-violet-500 bg-violet-950/30 text-violet-400 flex items-center justify-center mx-auto">
              <Server className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold text-white block">Billing DB Server</span>
            <span className="text-[11px] font-mono text-violet-300 block">10.0.5.20</span>
            <span className="text-[10px] text-slate-500 block">VLAN 50 (Isolated)</span>
          </div>
        </div>

        {/* Configuration Drawer */}
        {isConfigDrawerOpen && (
          <div className="p-4 rounded-xl bg-sentinel-950 border border-cyan-500/30 space-y-3 animate-in fade-in duration-200">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Host-A TCP/IP Adapter Settings
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="text-slate-500 text-[10px] font-mono uppercase block">IP Address</label>
                <input
                  type="text"
                  disabled
                  value={hostConfig.ip}
                  className="w-full bg-sentinel-900 border border-sentinel-800 rounded p-2 text-slate-300 font-mono"
                />
              </div>
              <div>
                <label className="text-slate-500 text-[10px] font-mono uppercase block">Subnet Mask</label>
                <input
                  type="text"
                  disabled
                  value={hostConfig.subnet}
                  className="w-full bg-sentinel-900 border border-sentinel-800 rounded p-2 text-slate-300 font-mono"
                />
              </div>
              <div>
                <label className="text-amber-400 text-[10px] font-mono uppercase block font-bold">
                  Default Gateway (Edit Here)
                </label>
                <input
                  type="text"
                  defaultValue={hostConfig.gateway}
                  onBlur={e => handleApplyConfig(e.target.value)}
                  className="w-full bg-sentinel-900 border border-amber-500/50 rounded p-2 text-white font-mono focus:ring-1 focus:ring-electric-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => handleApplyConfig('192.168.1.1')}
                className="px-4 py-1.5 rounded-lg bg-electric-600 hover:bg-electric-500 text-white font-semibold text-xs"
              >
                Set Correct Gateway (192.168.1.1)
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Interactive CLI Terminal Window */}
      <div className="rounded-2xl border border-sentinel-800 bg-sentinel-950 overflow-hidden font-mono text-xs shadow-2xl">
        <div className="p-3 bg-sentinel-900/90 border-b border-sentinel-800 flex items-center justify-between text-slate-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-white font-semibold">Diagnostic Terminal (Host-A: zsh)</span>
          </div>
          <span className="text-[11px] text-slate-500">Try: ping 192.168.1.1, ipconfig, ping 10.0.5.20</span>
        </div>

        {/* Terminal Output Stream */}
        <div className="p-4 space-y-1 h-64 overflow-y-auto text-slate-300 leading-relaxed">
          {terminalHistory.map((line, i) => (
            <div key={i} className={line.startsWith('$') ? 'text-cyan-400 font-bold' : line.includes('Reply from') ? 'text-emerald-300' : line.includes('unreachable') || line.includes('timed out') ? 'text-rose-400' : ''}>
              {line}
            </div>
          ))}
        </div>

        {/* Terminal Input Line */}
        <form
          onSubmit={e => {
            e.preventDefault();
            runCommand(commandInput);
          }}
          className="border-t border-sentinel-850 p-3 bg-sentinel-900/40 flex items-center gap-2"
        >
          <span className="text-cyan-400 font-bold">$</span>
          <input
            type="text"
            value={commandInput}
            onChange={e => setCommandInput(e.target.value)}
            placeholder="Type command (e.g. ping 10.0.5.20 or help)..."
            className="flex-1 bg-transparent border-none text-white focus:outline-none placeholder-slate-600"
          />
          <button
            type="submit"
            className="px-4 py-1.5 rounded-lg bg-sentinel-800 hover:bg-sentinel-700 text-slate-200 text-xs font-medium"
          >
            Execute
          </button>
        </form>
      </div>

      {/* Completion Banner */}
      {isCompleted && (
        <div className="p-6 rounded-3xl bg-sentinel-900 border border-emerald-500/50 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Network Route Restored! Mission Complete</h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto mt-1">
              You diagnosed the broken default gateway address using CLI diagnostic commands, repaired the adapter configuration, and confirmed 0% packet loss to the billing database.
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
