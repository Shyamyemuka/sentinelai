'use client';

export type Alert = {
  id: string;
  timestamp: string;
  attack_type: string;
  confidence: number;
  severity: 'High' | 'Medium' | 'Low' | null;
  top_features: Array<{ feature: string; importance: number }>;
};

type AlertFeedProps = {
  alerts: Alert[];
  selectedAlertId: string | null;
  onSelectAlert: (alert: Alert) => void;
};

const SEVERITY_STYLES: Record<string, string> = {
  High: 'bg-red-500/10 border border-red-500/30 text-red-400 shadow-[0_0_8px_rgba(239,68,68,0.1)]',
  Medium: 'bg-amber-500/10 border border-amber-500/30 text-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.1)]',
  Low: 'bg-green-500/10 border border-green-500/30 text-green-400 shadow-[0_0_8px_rgba(34,197,94,0.1)]',
};

export function AlertFeed({ alerts, selectedAlertId, onSelectAlert }: AlertFeedProps) {
  if (alerts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 border border-white/5 bg-black/20 rounded-[24px]">
        <div className="w-8 h-8 rounded-full border-2 border-neon border-t-transparent animate-spin mb-4"></div>
        <p className="font-mono text-xs uppercase tracking-widest text-cream/40 animate-pulse">
          Monitoring Traffic Feed...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2.5 overflow-y-auto max-h-[640px] pr-2 custom-scrollbar">
      {alerts.map((alert) => {
        const isSelected = alert.id === selectedAlertId;
        const timeStr = new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        
        return (
          <div
            key={alert.id}
            onClick={() => onSelectAlert(alert)}
            className={`flex items-center gap-4 rounded-2xl px-5 py-4 cursor-pointer border transition-all duration-300 ${
              isSelected
                ? 'bg-neon/10 border-neon/50 shadow-[0_0_12px_rgba(111,255,0,0.15)]'
                : 'bg-black/20 border-white/5 hover:bg-white/5 hover:border-white/10'
            }`}
          >
            {/* Severity Badge */}
            {alert.severity ? (
              <span className={`text-[10px] font-mono tracking-widest px-3 py-1 rounded-full uppercase ${SEVERITY_STYLES[alert.severity]}`}>
                {alert.severity}
              </span>
            ) : (
              <span className="text-[10px] font-mono tracking-widest px-3 py-1 rounded-full uppercase bg-cream/10 border border-cream/20 text-cream/70">
                BENIGN
              </span>
            )}

            {/* Attack Label */}
            <span className="font-grotesk text-sm tracking-wider uppercase text-cream flex-1 truncate">
              {alert.attack_type}
            </span>

            {/* Confidence & Time */}
            <div className="flex items-center gap-4 text-right">
              <span className="font-mono text-xs text-cream/70">
                {(alert.confidence * 100).toFixed(1)}%
              </span>
              <span className="font-mono text-[10px] text-cream/30">
                {timeStr}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
