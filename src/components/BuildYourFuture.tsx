import { useState, useMemo } from 'react';
import { itAreas } from '../data/content';

export default function BuildYourFuture() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleArea = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const selectedAreas = useMemo(() =>
    itAreas.filter(a => selected.includes(a.id)),
    [selected]
  );

  const allSkills = useMemo(() => {
    const skills = new Set<string>();
    selectedAreas.forEach(a => a.skills.forEach(s => skills.add(s)));
    return Array.from(skills);
  }, [selectedAreas]);

  return (
    <section id="build-future" className="relative py-20 md:py-32 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <p className="text-cyan-400/70 text-sm tracking-widest uppercase mb-3">Интерактивный эксперимент</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Собери своё
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"> будущее</span>
            <br />в IT
          </h2>
          <p className="text-slate-400 mt-4 max-w-2xl text-sm md:text-base">
            Выберите направления, которые вас интересуют. Мы покажем, какие навыки нужны и с чего можно начать.
            <span className="text-slate-500 italic"> Это инструмент исследования интересов, а не профессиональный тест.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Selection area */}
          <div>
            <p className="text-slate-400 text-sm mb-4">
              Выбрано: <span className="text-cyan-400 font-medium">{selected.length}</span> из {itAreas.length}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {itAreas.map((area) => {
                const isSelected = selected.includes(area.id);
                return (
                  <button
                    key={area.id}
                    onClick={() => toggleArea(area.id)}
                    className={`text-left p-4 rounded-xl transition-all duration-300 flex items-start gap-3 group focus:outline-none focus:ring-2 focus:ring-cyan-400/30 ${
                      isSelected
                        ? 'glass-panel border-cyan-400/40 bg-cyan-400/5'
                        : 'glass-panel-light hover:border-white/20 hover:bg-white/5'
                    }`}
                    aria-pressed={isSelected}
                  >
                    <span className="text-2xl flex-shrink-0">{area.icon}</span>
                    <div>
                      <p className={`text-sm font-medium ${isSelected ? 'text-cyan-300' : 'text-white'}`}>
                        {area.name}
                      </p>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {area.description}
                      </p>
                    </div>
                    {isSelected && (
                      <svg className="w-5 h-5 text-cyan-400 ml-auto flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results area */}
          <div>
            {selected.length === 0 ? (
              <div className="glass-panel p-8 h-full flex flex-col items-center justify-center text-center min-h-[400px]">
                <div className="w-20 h-20 rounded-full bg-cyan-400/10 border border-dashed border-cyan-400/30 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-cyan-400/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-slate-400 text-sm">
                  Выберите направления слева, чтобы увидеть вашу персональную карту интересов
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Network visualization */}
                <div className="glass-panel p-6 relative overflow-hidden">
                  <p className="text-xs text-cyan-400/60 uppercase tracking-wider mb-4">Ваша карта интересов</p>
                  <svg viewBox="0 0 300 200" className="w-full h-40">
                    {/* Connections */}
                    {selectedAreas.map((area, i) => {
                      const angle = (i / selectedAreas.length) * Math.PI * 2;
                      const x = 150 + Math.cos(angle) * 70;
                      const y = 100 + Math.sin(angle) * 60;
                      return selectedAreas.slice(i + 1).map((_, j) => {
                        const angle2 = ((i + j + 1) / selectedAreas.length) * Math.PI * 2;
                        const x2 = 150 + Math.cos(angle2) * 70;
                        const y2 = 100 + Math.sin(angle2) * 60;
                        return (
                          <line
                            key={`${i}-${j}`}
                            x1={x} y1={y} x2={x2} y2={y2}
                            stroke="rgba(0, 212, 255, 0.3)"
                            strokeWidth="1"
                          />
                        );
                      });
                    })}
                    {/* Nodes */}
                    {selectedAreas.map((area, i) => {
                      const angle = (i / selectedAreas.length) * Math.PI * 2;
                      const x = 150 + Math.cos(angle) * 70;
                      const y = 100 + Math.sin(angle) * 60;
                      return (
                        <g key={area.id}>
                          <circle cx={x} cy={y} r="12" fill="rgba(0, 212, 255, 0.1)" stroke="rgba(0, 212, 255, 0.5)" strokeWidth="1" />
                          <text x={x} y={y + 4} textAnchor="middle" fill="white" fontSize="8" fontWeight="500">
                            {area.icon}
                          </text>
                          <text x={x} y={y + 22} textAnchor="middle" fill="rgba(0, 212, 255, 0.8)" fontSize="6">
                            {area.name}
                          </text>
                        </g>
                      );
                    })}
                    {/* Center */}
                    <circle cx="150" cy="100" r="6" fill="rgba(0, 212, 255, 0.6)" />
                    <circle cx="150" cy="100" r="10" fill="none" stroke="rgba(0, 212, 255, 0.2)" strokeWidth="1" />
                  </svg>
                </div>

                {/* Skills */}
                {allSkills.length > 0 && (
                  <div className="glass-panel p-6">
                    <p className="text-xs text-cyan-400/60 uppercase tracking-wider mb-3">Навыки, которые пригодятся</p>
                    <div className="flex flex-wrap gap-2">
                      {allSkills.map((skill) => (
                        <span key={skill} className="px-3 py-1.5 text-xs rounded-full bg-cyan-400/10 text-cyan-300 border border-cyan-400/20">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Where to start */}
                <div className="glass-panel p-6">
                  <p className="text-xs text-cyan-400/60 uppercase tracking-wider mb-3">С чего начать</p>
                  <div className="space-y-3">
                    {selectedAreas.map((area) => (
                      <div key={area.id} className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.03]">
                        <span className="text-lg">{area.icon}</span>
                        <p className="text-sm text-slate-300">{area.startWith}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
