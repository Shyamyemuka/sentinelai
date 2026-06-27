'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AlertFeed, Alert } from '../../components/AlertFeed';
import { AttackChart } from '../../components/AttackChart';
import { AlertDetail } from '../../components/AlertDetail';

export default function DashboardPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [status, setStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [simActive, setSimActive] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchSimStatus = async () => {
      try {
        const res = await fetch('/api/simulator');
        if (res.ok) {
          const data = await res.json();
          setSimActive(data.is_running);
        }
      } catch (err) {
        console.error("Failed to fetch simulator status:", err);
      }
    };
    fetchSimStatus();
  }, []);

  useEffect(() => {
    // Connect to SSE stream endpoint proxy
    const es = new EventSource('/api/stream');

    es.onopen = () => {
      setStatus('connected');
    };

    es.onmessage = (event) => {
      try {
        const newAlert: Alert = JSON.parse(event.data);
        
        // Append alert to scrolling list
        setAlerts((prev) => [newAlert, ...prev].slice(0, 500)); // Cap at 500 alerts in-memory

        // Update distribution counts
        if (newAlert.attack_type !== 'BENIGN') {
          setCounts((prev) => ({
            ...prev,
            [newAlert.attack_type]: (prev[newAlert.attack_type] || 0) + 1,
          }));
        }
      } catch (err) {
        console.error("Error parsing alert event:", err);
      }
    };

    es.onerror = () => {
      setStatus('disconnected');
      es.close();
    };

    return () => {
      es.close();
    };
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (res.ok) {
        router.push('/');
        router.refresh();
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const toggleSimulator = async () => {
    try {
      const nextAction = simActive ? 'stop' : 'start';
      const res = await fetch('/api/simulator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: nextAction }),
      });
      if (res.ok) {
        const data = await res.json();
        setSimActive(data.info.is_running);
      }
    } catch (err) {
      console.error("Failed to toggle simulator:", err);
    }
  };


  // Compute metrics summary
  const totalFlows = alerts.length;
  const attackCount = alerts.filter(a => a.attack_type !== 'BENIGN').length;
  const benignCount = totalFlows - attackCount;
  const attackRate = totalFlows > 0 ? (attackCount / totalFlows) * 100 : 0;
  const benignRate = totalFlows > 0 ? (benignCount / totalFlows) * 100 : 0;

  return (
    <div className="relative min-h-screen bg-background flex flex-col justify-between overflow-hidden text-cream selection:bg-neon selection:text-background font-sans">
      
      {/* Background Glow */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,rgba(111,255,0,0.02)_0%,transparent_60%)]"></div>

      {/* Navigation / Header */}
      <header className="relative z-10 max-w-[1831px] w-full mx-auto px-6 lg:px-16 py-5 border-b border-white/5 bg-black/10 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-grotesk text-xl tracking-wider select-none text-cream flex items-center gap-1.5">
            SENTINEL<span className="text-neon">.</span>AI
          </Link>
          
          {/* Connection Status badge */}
          <div className="flex items-center gap-2 bg-black/40 border border-white/5 rounded-full px-4 py-1.5">
            <span className={`w-2 h-2 rounded-full ${
              status === 'connected' ? 'bg-neon animate-pulse-glow' : status === 'connecting' ? 'bg-amber-400 animate-pulse' : 'bg-red-500'
            }`}></span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-cream/60">
              {status === 'connected' ? 'Active Feed' : status === 'connecting' ? 'Connecting' : 'Disconnected'}
            </span>
          </div>

          {/* Simulator Controls */}
          <div className="flex items-center gap-3 bg-black/40 border border-white/5 rounded-full px-4 py-1">
            <span className="font-mono text-[9px] uppercase tracking-widest text-cream/60 select-none">
              Traffic: {simActive ? 'Streaming' : 'Paused'}
            </span>
            <button
              onClick={toggleSimulator}
              disabled={status !== 'connected'}
              className={`font-mono text-[9px] uppercase tracking-widest px-3 py-1 rounded-full border transition-all duration-300 cursor-pointer ${
                simActive 
                  ? 'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20' 
                  : 'bg-neon/10 border-neon/30 text-neon hover:bg-neon/20'
              }`}
            >
              {simActive ? 'Pause' : 'Start'}
            </button>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="font-mono text-[10px] uppercase tracking-widest text-cream/40 hover:text-red-400 border border-white/10 hover:border-red-500/20 rounded-full px-5 py-2 hover:bg-red-500/5 transition-all duration-300 cursor-pointer"
        >
          Sign Out
        </button>
      </header>

      {/* Main Console Layout */}
      <main className="relative z-10 flex-1 max-w-[1831px] w-full mx-auto px-6 lg:px-16 py-8 flex flex-col gap-8">
        
        {/* Row 1: Key Metrics */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Total Processed */}
          <div className="liquid-glass rounded-[24px] p-6 border border-white/5 flex flex-col justify-between gap-4">
            <span className="font-mono text-[10px] text-cream/40 uppercase tracking-widest block">Total Flows Processed</span>
            <div className="flex items-baseline gap-2">
              <span className="font-grotesk text-4xl font-bold">{totalFlows}</span>
              <span className="font-mono text-[10px] text-cream/30">EVENTS LOGGED</span>
            </div>
          </div>

          {/* Attack Rate */}
          <div className="liquid-glass rounded-[24px] p-6 border border-white/5 flex flex-col justify-between gap-4">
            <span className="font-mono text-[10px] text-cream/40 uppercase tracking-widest block">Attack Detections</span>
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline gap-2">
                <span className="font-grotesk text-4xl font-bold text-red-400">{attackCount}</span>
                <span className="font-mono text-[10px] text-cream/30">ATTACKS</span>
              </div>
              <span className="font-mono text-xs font-semibold text-red-400/80">
                {attackRate.toFixed(1)}% Rate
              </span>
            </div>
          </div>

          {/* Benign Rate */}
          <div className="liquid-glass rounded-[24px] p-6 border border-white/5 flex flex-col justify-between gap-4">
            <span className="font-mono text-[10px] text-cream/40 uppercase tracking-widest block">Benign Traffic</span>
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline gap-2">
                <span className="font-grotesk text-4xl font-bold text-green-400">{benignCount}</span>
                <span className="font-mono text-[10px] text-cream/30">BENIGN FLOWS</span>
              </div>
              <span className="font-mono text-xs font-semibold text-green-400/80">
                {benignRate.toFixed(1)}% Rate
              </span>
            </div>
          </div>
        </div>

        {/* Row 2: Live Console Layout */}
        <div className="grid lg:grid-cols-12 gap-8 flex-1 items-start">
          
          {/* Live Alerts Feed (Left, 7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-5 h-full">
            <div>
              <h2 className="font-grotesk text-xl uppercase tracking-wider text-cream flex items-center gap-2">
                <span>Console Alert Stream</span>
                {status === 'connected' && (
                  <span className="text-[10px] font-mono tracking-widest text-neon uppercase bg-neon/10 border border-neon/30 px-3 py-0.5 rounded-full animate-pulse">
                    Live
                  </span>
                )}
              </h2>
              <p className="font-mono text-[10px] text-cream/30 uppercase tracking-widest mt-1">Real-time XGBoost packet flow classification</p>
            </div>
            
            <AlertFeed 
              alerts={alerts} 
              selectedAlertId={selectedAlert ? selectedAlert.id : null} 
              onSelectAlert={setSelectedAlert} 
            />
          </div>

          {/* Data Visualizations Panel (Right, 5 cols) */}
          <div className="lg:col-span-5 space-y-8 h-full">
            
            {/* Chart Block */}
            <div className="liquid-glass rounded-[32px] p-6 border border-white/5 flex flex-col gap-5">
              <div>
                <h3 className="font-grotesk text-md uppercase tracking-wider text-cream">Attack Distributions</h3>
                <p className="font-mono text-[9px] text-cream/30 uppercase tracking-widest mt-1">Active threat counts logged in this session</p>
              </div>
              <AttackChart counts={counts} />
            </div>

            {/* Alert Inspector block */}
            <div className="liquid-glass rounded-[32px] p-6 border border-white/5 flex flex-col gap-5">
              <div>
                <h3 className="font-grotesk text-md uppercase tracking-wider text-cream">Feature Inspector</h3>
                <p className="font-mono text-[9px] text-cream/30 uppercase tracking-widest mt-1">Inspection pane for selected alerts</p>
              </div>
              <AlertDetail alert={selectedAlert} />
            </div>

          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-[1831px] w-full mx-auto px-6 lg:px-16 py-6 text-center font-mono text-[9px] text-cream/20 uppercase tracking-widest border-t border-white/5 bg-black/5 mt-8">
        SentinelAI Security Console · Version 1.0 · Secured Session Area
      </footer>

    </div>
  );
}
