import { useState } from 'react';
import { technologiesMap } from '../data/content';

export default function TechnologiesAroundUs() {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const selected = technologiesMap.find(t => t.id === selectedTech);

  return (
    <section id="tech-around" className="relative py-20 md:py-32 px-4 md:px-8">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d1f3c]/30 to-transparent" />
      
      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <p className="text-cyan-400/70 text-sm tracking-widest uppercase mb-3">Интерактивная карта</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Технологии
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"> вокруг нас</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-2xl text-sm md:text-base">
            IT присутствует в повседневной жизни гораздо чаще, чем мы думаем. Нажмите на объект, чтобы узнать, какие технологии за ним стоят.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Interactive map */}
          <div className="lg:col-span-3 glass-panel p-6 relative overflow-hidden min-h-[400px]">
            {/* Background grid */}
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(0,212,255,0.15)" strokeWidth="0.2"/>
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)" />
              </svg>
            </div>

            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              {technologiesMap.map((tech, i) =>
                technologiesMap.slice(i + 1).map((other, j) => {
                  const dist = Math.sqrt((tech.x - other.x) ** 2 + (tech.y - other.y) ** 2);
                  if (dist < 50) {
                    return (
                      <line
                        key={`${tech.id}-${other.id}`}
                        x1={`${tech.x}%`} y1={`${tech.y}%`}
                        x2={`${other.x}%`} y2={`${other.y}%`}
                        stroke="rgba(0, 212, 255, 0.1)"
                        strokeWidth="0.2"
                      />
                    );
                  }
                  return null;
                })
              )}
            </svg>

            {/* Technology nodes */}
            {technologiesMap.map((tech) => (
              <button
                key={tech.id}
                onClick={() => setSelectedTech(selectedTech === tech.id ? null : tech.id)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-cyan-400/30 rounded-full ${
                  selectedTech === tech.id ? 'z-10 scale-110' : 'hover:scale-105'
                }`}
                style={{ left: `${tech.x}%`, top: `${tech.y}%` }}
                aria-pressed={selectedTech === tech.id}
                aria-label={tech.name}
              >
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                  selectedTech === tech.id
                    ? 'bg-cyan-400/20 border-2 border-cyan-400/60 shadow-lg shadow-cyan-400/20'
                    : 'bg-white/5 border border-white/20 group-hover:border-cyan-400/40 group-hover:bg-cyan-400/10'
                }`}>
                  <div className="text-center">
                    <div className="text-lg md:text-xl mb-0.5">
                      {tech.id === 'smart-home' && '🏠'}
                      {tech.id === 'smartwatch' && '⌚'}
                      {tech.id === 'autonomous' && '🚗'}
                      {tech.id === 'smart-city' && '🏙️'}
                      {tech.id === 'medical' && '🏥'}
                    </div>
                    <p className={`text-[9px] md:text-[10px] font-medium leading-tight ${
                      selectedTech === tech.id ? 'text-cyan-300' : 'text-slate-400 group-hover:text-slate-200'
                    }`}>
                      {tech.name}
                    </p>
                  </div>
                </div>
              </button>
            ))}

            {/* Hint */}
            {!selectedTech && (
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <p className="text-xs text-slate-500">Нажмите на объект для подробностей</p>
              </div>
            )}
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-2">
            {selected ? (
              <div className="glass-panel p-6 space-y-5 animate-slide-in">
                <div>
                  <p className="text-xs text-cyan-400/60 uppercase tracking-wider mb-2">{selected.category}</p>
                  <h3 className="text-xl font-bold text-white">{selected.name}</h3>
                </div>
                
                <p className="text-slate-300 text-sm leading-relaxed">
                  {selected.description}
                </p>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-white/[0.03]">
                    <p className="text-xs text-cyan-400/60 uppercase tracking-wider mb-2">Кто создаёт</p>
                    <p className="text-sm text-slate-300">{selected.specialists}</p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-white/[0.03]">
                    <p className="text-xs text-cyan-400/60 uppercase tracking-wider mb-2">Какие знания нужны</p>
                    <p className="text-sm text-slate-300">{selected.knowledge}</p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedTech(null)}
                  className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  ← Закрыть
                </button>
              </div>
            ) : (
              <div className="glass-panel p-8 h-full flex flex-col items-center justify-center text-center min-h-[300px]">
                <div className="w-16 h-16 rounded-full bg-cyan-400/10 border border-dashed border-cyan-400/20 flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-cyan-400/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                </div>
                <p className="text-slate-400 text-sm">
                  Выберите объект на карте, чтобы узнать о технологиях, которые за ним стоят
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
