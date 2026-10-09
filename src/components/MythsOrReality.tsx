import { useState } from 'react';
import { myths } from '../data/content';

export default function MythsOrReality() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answered, setAnswered] = useState<Record<number, boolean | null>>({});
  const [showExplanation, setShowExplanation] = useState(false);

  const current = myths[currentIndex];
  const userAnswer = answered[current.id];
  const isAnswered = userAnswer !== undefined && userAnswer !== null;

  const handleAnswer = (guess: boolean) => {
    setAnswered(prev => ({ ...prev, [current.id]: guess }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIndex < myths.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowExplanation(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowExplanation(answered[myths[currentIndex - 1].id] !== undefined);
    }
  };

  const getCorrect = () => {
    if (userAnswer === undefined) return null;
    return userAnswer === !current.isMyth;
  };

  const correctCount = Object.entries(answered).filter(([id, val]) => {
    const myth = myths.find(m => m.id === Number(id));
    return myth && val === !myth.isMyth;
  }).length;

  return (
    <section id="myths" className="relative py-20 md:py-32 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <p className="text-cyan-400/70 text-sm tracking-widest uppercase mb-3">Интерактивная игра</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Миф или
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"> реальность?</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-2xl text-sm md:text-base">
            Проверьте свои представления об IT-сфере. Выберите, что из утверждений — миф, а что — правда.
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-500"
              style={{ width: `${((currentIndex + 1) / myths.length) * 100}%` }}
            />
          </div>
          <span className="text-sm text-slate-400">
            {currentIndex + 1} / {myths.length}
          </span>
        </div>

        {/* Card */}
        <div className="glass-panel p-6 md:p-10">
          {/* Statement */}
          <div className="mb-8">
            <p className="text-xs text-cyan-400/50 uppercase tracking-wider mb-3">Утверждение #{currentIndex + 1}</p>
            <p className="text-xl md:text-2xl font-medium text-white leading-relaxed">
              «{current.statement}»
            </p>
          </div>

          {/* Answer buttons */}
          {!isAnswered ? (
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => handleAnswer(true)}
                className="flex-1 py-4 px-6 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 text-green-300 font-medium hover:border-green-400/50 hover:from-green-500/30 hover:to-emerald-500/30 transition-all focus:outline-none focus:ring-2 focus:ring-green-400/30"
              >
                🟢 Реальность
              </button>
              <button
                onClick={() => handleAnswer(false)}
                className="flex-1 py-4 px-6 rounded-xl bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-400/30 text-red-300 font-medium hover:border-red-400/50 hover:from-red-500/30 hover:to-orange-500/30 transition-all focus:outline-none focus:ring-2 focus:ring-red-400/30"
              >
                🔴 Миф
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Result */}
              <div className={`p-4 rounded-xl border ${
                getCorrect()
                  ? 'bg-green-400/5 border-green-400/20'
                  : 'bg-red-400/5 border-red-400/20'
              }`}>
                <p className={`font-medium mb-1 ${getCorrect() ? 'text-green-400' : 'text-red-400'}`}>
                  {getCorrect() ? '✓ Верно!' : '✗ Не совсем так'}
                </p>
                <p className="text-sm text-slate-300">
                  Это {current.isMyth ? 'миф' : 'правда'}.
                </p>
              </div>

              {/* Explanation */}
              {showExplanation && (
                <div className="glass-panel-light p-5 animate-slide-in">
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {current.explanation}
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <svg className="w-4 h-4 text-cyan-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xs text-cyan-400/60">
                      См. вопрос интервью #{current.relatedQuestion}
                    </span>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between items-center pt-4 border-t border-white/5">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="text-sm text-slate-400 hover:text-cyan-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  ← Назад
                </button>
                
                {currentIndex < myths.length - 1 ? (
                  <button
                    onClick={handleNext}
                    className="px-5 py-2 rounded-lg bg-cyan-400/20 text-cyan-300 text-sm font-medium hover:bg-cyan-400/30 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
                  >
                    Далее →
                  </button>
                ) : (
                  <div className="text-right">
                    <p className="text-sm text-cyan-400">
                      Результат: {correctCount} / {myths.length}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Score summary */}
        {Object.keys(answered).length === myths.length && (
          <div className="mt-8 glass-panel p-6 text-center animate-fade-in">
            <p className="text-lg font-semibold text-white mb-2">Игра завершена!</p>
            <p className="text-slate-400 text-sm">
              Вы ответили правильно на {correctCount} из {myths.length} вопросов.
              {correctCount === myths.length && ' Отличный результат! 🎉'}
              {correctCount < myths.length && correctCount >= myths.length / 2 && ' Хороший результат! 👍'}
              {correctCount < myths.length / 2 && ' Стоит узнать больше об IT-сфере! 📚'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
