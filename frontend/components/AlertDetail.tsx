'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { Alert } from './AlertFeed';

type AlertDetailProps = {
  alert: Alert | null;
};

export function AlertDetail({ alert }: AlertDetailProps) {
  if (!alert) {
    return (
      <div className="flex flex-col items-center justify-center py-32 border border-white/5 bg-black/20 rounded-[24px] text-center px-6">
        <svg className="w-8 h-8 text-cream/20 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        <p className="font-mono text-[11px] uppercase tracking-widest text-cream/40 max-w-[200px]">
          Select an alert from the feed to inspect features
        </p>
      </div>
    );
  }

  const dateFormatted = new Date(alert.timestamp).toLocaleString();

  return (
    <div className="space-y-6">
      
      {/* Overview Metadata */}
      <div className="space-y-4">
        <div>
          <span className="font-mono text-[10px] text-cream/40 uppercase tracking-widest block mb-1">Alert Classification</span>
          <h3 className="font-grotesk text-2xl uppercase tracking-wider text-cream">{alert.attack_type}</h3>
        </div>

        <div className="grid grid-cols-2 gap-4 border-y border-white/5 py-4">
          <div>
            <span className="font-mono text-[10px] text-cream/40 uppercase tracking-widest block mb-1">Confidence Score</span>
            <span className="font-mono text-sm font-semibold text-neon">{(alert.confidence * 100).toFixed(2)}%</span>
          </div>
          <div>
            <span className="font-mono text-[10px] text-cream/40 uppercase tracking-widest block mb-1">Severity Rating</span>
            <span className={`font-mono text-sm font-semibold ${
              alert.severity === 'High' ? 'text-red-400' : alert.severity === 'Medium' ? 'text-amber-400' : alert.severity === 'Low' ? 'text-green-400' : 'text-cream/50'
            }`}>
              {alert.severity || 'BENIGN'}
            </span>
          </div>
        </div>

        <div className="space-y-2.5 font-mono text-[11px] uppercase tracking-wider text-cream/60">
          <div className="flex justify-between gap-4">
            <span className="text-cream/30">ALERT UUID:</span>
            <span className="text-cream/70 select-all truncate max-w-[180px]">{alert.id}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-cream/30">TIMESTAMP:</span>
            <span className="text-cream/70">{dateFormatted}</span>
          </div>
        </div>
      </div>

      {/* Feature Importance BarChart */}
      <div className="space-y-3.5 pt-2">
        <div>
          <span className="font-mono text-[10px] text-cream/40 uppercase tracking-widest block">Top-5 Feature Importances</span>
          <span className="font-mono text-[9px] text-cream/20 uppercase tracking-wider block mt-1">Weights computed during XGBoost training</span>
        </div>

        <div className="w-full h-[180px] bg-black/10 rounded-2xl p-2 border border-white/5">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={alert.top_features}
              layout="vertical"
              margin={{ top: 10, right: 10, bottom: 10, left: 70 }}
            >
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="feature"
                tick={{ fill: '#EFF4FF', opacity: 0.6, fontSize: 9, fontFamily: 'monospace' }}
                tickLine={false}
                axisLine={false}
                width={70}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#050505',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  fontFamily: 'monospace',
                  fontSize: '10px',
                  color: '#EFF4FF',
                }}
              />
              <Bar dataKey="importance" fill="#6FFF00" radius={[0, 4, 4, 0]} fillOpacity={0.85} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
