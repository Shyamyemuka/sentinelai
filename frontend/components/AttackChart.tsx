'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

type AttackChartProps = {
  counts: Record<string, number>;
};

export function AttackChart({ counts }: AttackChartProps) {
  // Exclude BENIGN from the attack distribution chart
  const data = Object.entries(counts)
    .filter(([name]) => name !== 'BENIGN')
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 border border-white/5 bg-black/20 rounded-[24px]">
        <p className="font-mono text-xs uppercase tracking-widest text-cream/40">
          No Attacks Logged Yet
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-[240px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, bottom: 20, left: -20 }}>
          <XAxis
            dataKey="name"
            tick={{ fill: '#EFF4FF', opacity: 0.5, fontSize: 10, fontFamily: 'monospace' }}
            tickLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
            axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
            interval={0}
            angle={-25}
            textAnchor="end"
          />
          <YAxis
            tick={{ fill: '#EFF4FF', opacity: 0.5, fontSize: 10, fontFamily: 'monospace' }}
            tickLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
            axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
            allowDecimals={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#010828',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              fontFamily: 'monospace',
              fontSize: '11px',
              color: '#EFF4FF',
            }}
            cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
          />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={index === 0 ? '#ef4444' : index === 1 ? '#f59e0b' : '#3b82f6'} 
                fillOpacity={0.8}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
