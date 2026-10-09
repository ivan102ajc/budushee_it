import { useState } from 'react';
import { researchQuestions } from '../data/content';

export default function ResearchQuestions() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggle = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="research-questions" className="relative py-20 md:py-32 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-16 md:mb-20">
          <p className="text-cyan-400/70 text-sm tracking-widest uppercase mb-3">Раздел 01</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Что мы хотим
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"> понять?</span>
          </h2>
        </div>

        {/* Questions grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
          {researchQuestions.map((q) => {
            const isExpanded = expandedId === q.id;
            return (
              <div
                key={q.id}
                className="group relative"
              >
                <button
                  onClick={() => toggle(q.id)}
                  className={`w-full text-left p-6 md:p-8 transition-all duration-500 flex flex-col focus:outline-none focus:ring-2 focus:ring-cyan-400/30 rounded-2xl ${
                    isExpanded
                      ? 'glass-panel border-cyan-400/30 bg-cyan-400/5'
                      : 'glass-panel hover:border-cyan-400/30'
                  }`}
                  aria-expanded={isExpanded}
                >
                  <div>
                    <span className={`text-5xl md:text-6xl font-black transition-colors duration-300 ${
                      isExpanded ? 'text-cyan-400/60' : 'text-cyan-400/20 group-hover:text-cyan-400/40'
                    }`}>
                      {q.number}
                    </span>
                    <h3 className="text-lg md:text-xl font-semibold text-white mt-4 leading-snug group-hover:text-cyan-100 transition-colors">
                      {q.title}
                    </h3>
                    <p className="text-slate-400 mt-3 text-sm leading-relaxed">
                      {q.description}
                    </p>
                  </div>

                  {/* Expanded details — inside the card */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isExpanded ? 'max-h-[500px] opacity-100 mt-5 pt-5 border-t border-white/10' : 'max-h-0 opacity-0 mt-0 pt-0'
                    }`}
                  >
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {q.details}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-cyan-400/60 group-hover:text-cyan-400 transition-colors">
                    <span className="text-sm">
                      {isExpanded ? 'Свернуть' : 'Подробнее'}
                    </span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {/* Hover decoration */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-cyan-400/5 to-transparent rounded-tr-2xl rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
