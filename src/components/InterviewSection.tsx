import { useState } from 'react';
import { interviewQuestions } from '../data/content';

export default function InterviewSection() {
  const [activeQuestion, setActiveQuestion] = useState<number>(1);

  const currentQuestion = interviewQuestions.find(q => q.id === activeQuestion);

  return (
    <section id="interview" className="relative py-20 md:py-32 px-4 md:px-8">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d1f3c]/50 to-transparent" />
      
      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-12 md:mb-16">
          <p className="text-cyan-400/70 text-sm tracking-widest uppercase mb-3">Раздел 02</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Человек, который помогает
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              понять технологии
            </span>
          </h2>
        </div>

        {/* Interviewee info */}
        <div className="glass-panel p-6 md:p-8 mb-12 flex flex-col md:flex-row gap-6 md:gap-10 items-start">
          {/* Avatar placeholder */}
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/20 flex items-center justify-center flex-shrink-0">
            <span className="text-3xl md:text-4xl">👤</span>
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
              Дубельщиков А. А.
            </h3>
            <p className="text-cyan-400/80 text-sm mb-4">
              Преподаватель факультета довузовской подготовки НИУ ВШЭ
            </p>
            <div className="flex flex-wrap gap-2">
              {['Информатика', 'IoT', 'Киберфизические системы', 'Телекоммуникации', 'Подготовка школьников'].map((tag) => (
                <span key={tag} className="px-3 py-1 text-xs rounded-full bg-cyan-400/10 text-cyan-300/80 border border-cyan-400/20">
                  {tag}
                </span>
              ))}
            </div>
            
            {/* Audio placeholder */}
            <div className="mt-4 p-3 rounded-lg bg-white/5 border border-white/10 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <div className="flex-1">
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-0 bg-cyan-400/50 rounded-full" />
                </div>
              </div>
              <span className="text-xs text-slate-500">Аудио интервью</span>
            </div>
          </div>
        </div>

        {/* Timeline / Questions navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Questions list */}
          <div className="lg:col-span-4 space-y-2">
            <p className="text-slate-400 text-sm mb-4 font-medium">Вопросы интервью:</p>
            {interviewQuestions.map((q, index) => (
              <button
                key={q.id}
                onClick={() => setActiveQuestion(q.id)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-300 flex items-start gap-3 group focus:outline-none focus:ring-2 focus:ring-cyan-400/30 ${
                  activeQuestion === q.id
                    ? 'glass-panel border-cyan-400/30 bg-cyan-400/5'
                    : 'hover:bg-white/5'
                }`}
                aria-pressed={activeQuestion === q.id}
              >
                <span className={`text-xs font-mono mt-0.5 ${
                  activeQuestion === q.id ? 'text-cyan-400' : 'text-slate-500'
                }`}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className={`text-sm leading-snug ${
                  activeQuestion === q.id ? 'text-white font-medium' : 'text-slate-400 group-hover:text-slate-200'
                }`}>
                  {q.shortTitle}
                </span>
                {activeQuestion === q.id && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-cyan-400 animate-pulse flex-shrink-0 mt-1.5" />
                )}
              </button>
            ))}
          </div>

          {/* Answer area */}
          <div className="lg:col-span-8">
            <div className="glass-panel p-6 md:p-8 min-h-[300px] flex flex-col">
              <h4 className="text-lg md:text-xl font-semibold text-white mb-6 leading-snug">
                {currentQuestion?.title}
              </h4>
              
              {currentQuestion?.answer ? (
                <div className="flex-1">
                  <p className="text-slate-300 leading-relaxed text-base md:text-lg">
                    {currentQuestion.answer}
                  </p>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center mb-4">
                    <svg className="w-7 h-7 text-cyan-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  <p className="text-cyan-400/70 font-medium mb-2">
                    {currentQuestion?.placeholder}
                  </p>
                  <p className="text-slate-500 text-sm max-w-md">
                    Этот раздел будет заполнен после проведения интервью с преподавателем. Ответ появится здесь.
                  </p>
                  
                  {/* Audio record indicator */}
                  <div className="mt-6 flex items-center gap-2 text-slate-500">
                    <div className="w-2 h-2 rounded-full bg-red-400/60 animate-pulse" />
                    <span className="text-xs">Ожидание записи</span>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="mt-6 pt-4 border-t border-white/5 flex justify-between">
                <button
                  onClick={() => setActiveQuestion(Math.max(1, activeQuestion - 1))}
                  disabled={activeQuestion === 1}
                  className="text-sm text-slate-400 hover:text-cyan-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Предыдущий
                </button>
                <button
                  onClick={() => setActiveQuestion(Math.min(interviewQuestions.length, activeQuestion + 1))}
                  disabled={activeQuestion === interviewQuestions.length}
                  className="text-sm text-slate-400 hover:text-cyan-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
                >
                  Следующий
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
