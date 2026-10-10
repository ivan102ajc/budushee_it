import { useState } from 'react';
import { timelineData } from '../data/content';

type Period = 'today' | 'fiveYears' | 'tenYears';

export default function FutureTimeline() {
  const [period, setPeriod] = useState<Period>('today');
  const data = timelineData[period];
  const periods: { key: Period; label: string }[] = [
    { key: 'today', label: 'Сегодня' }, { key: 'fiveYears', label: 'Через 5 лет' }, { key: 'tenYears', label: 'Через 10 лет' },
  ];

  const getNetworkNodes = () => {
    switch (period) {
      case 'today': return [{ x: 50, y: 50 }, { x: 150, y: 30 }, { x: 250, y: 50 }, { x: 100, y: 100 }, { x: 200, y: 100 }];
      case 'fiveYears': return [{ x: 50, y: 30 }, { x: 120, y: 50 }, { x: 200, y: 30 }, { x: 270, y: 50 }, { x: 80, y: 90 }, { x: 160, y: 80 }, { x: 240, y: 90 }];
      case 'tenYears': return [{ x: 30, y: 25 }, { x: 90, y: 35 }, { x: 150, y: 20 }, { x: 210, y: 35 }, { x: 270, y: 25 }, { x: 60, y: 70 }, { x: 120, y: 60 }, { x: 180, y: 65 }, { x: 240, y: 70 }, { x: 150, y: 100 }];
    }
  };
  const nodes = getNetworkNodes();
  const connections: [number, number][] = [];
  nodes.forEach((node, i) => {
    nodes.forEach((other, j) => {
      if (j > i && Math.sqrt((node.x - other.x) ** 2 + (node.y - other.y) ** 2) < 100) connections.push([i, j]);
    });
  });

  return (
    <section id="future-timeline" className="relative py-20 md:py-32 px-4 md:px-8">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d1f3c]/30 to-transparent" />
      <div className="relative max-w-6xl mx-auto">
        <div className="mb-12 md:mb-16">
          <p className="text-cyan-400/70 text-sm tracking-widest uppercase mb-3">Интерактивная временная шкала</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            IT через<span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"> 10 лет</span>
          </h2>
        </div>
        <div className="flex flex-wrap gap-3 mb-10">
          {periods.map((p) => (
            <button key={p.key} onClick={() => setPeriod(p.key)}
              className={`px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 ${
                period === p.key ? 'bg-cyan-400/20 text-cyan-300 border border-cyan-400/40' : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10 hover:text-white'
              }`} aria-pressed={period === p.key}>{p.label}</button>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-panel p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs text-cyan-400/60 uppercase tracking-wider">Эволюция цифровой сети</p>
              <span className="text-xs text-slate-500">{data.year}</span>
            </div>
            <div className="flex-1 flex items-center justify-center min-h-[200px]">
              <svg viewBox="0 0 300 130" className="w-full h-full max-h-[250px]">
                {connections.map(([i, j], idx) => (
                  <line key={idx} x1={nodes[i].x} y1={nodes[i].y} x2={nodes[j].x} y2={nodes[j].y} stroke="rgba(0, 212, 255, 0.2)" strokeWidth="0.5" className="transition-all duration-700" />
                ))}
                {nodes.map((node, i) => (
                  <g key={i} className="transition-all duration-700">
                    <circle cx={node.x} cy={node.y} r="4" fill="rgba(0, 212, 255, 0.6)" className="transition-all duration-700" />
                    <circle cx={node.x} cy={node.y} r="8" fill="rgba(0, 212, 255, 0.1)" className="transition-all duration-700" />
                  </g>
                ))}
              </svg>
            </div>
          </div>
          <div className="glass-panel p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">{data.title}</h3>
              <span className="text-xs text-slate-500 px-2 py-1 rounded bg-white/5">{data.year}</span>
            </div>
            <p className="text-slate-400 text-sm mb-6">{data.description}</p>
            <div className="space-y-3">
              {data.items.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.03] hover:bg-white/5 transition-colors">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${item.confirmed ? 'bg-green-400' : 'bg-amber-400'}`} />
                  <div>
                    <p className="text-sm text-slate-200">{item.text}</p>
                    <p className="text-xs text-slate-500 mt-1">{item.confirmed ? '✓ Подтверждённый факт' : '○ Прогноз / тенденция'}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 flex gap-4">
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-400" /><span className="text-xs text-slate-500">Факт</span></div>
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-400" /><span className="text-xs text-slate-500">Прогноз</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
