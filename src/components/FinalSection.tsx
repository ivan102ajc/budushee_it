export default function FinalSection() {
  const scrollToInterview = () => {
    const el = document.getElementById('interview');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="final" className="relative py-20 md:py-32 px-4 md:px-8">
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0d1f3c]/50 to-transparent" />
      
      <div className="relative max-w-4xl mx-auto text-center">
        {/* Main quote */}
        <div className="mb-16">
          <p className="text-cyan-400/70 text-sm tracking-widest uppercase mb-6">Заключение</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-tight mb-6">
            IT начинается не с кода.
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Оно начинается с интереса.
            </span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Этот проект — попытка показать, что IT-сфера гораздо шире, чем кажется. 
            Это не только программирование, но и физика, инженерия, телекоммуникации, 
            анализ данных и создание устройств, которые меняют мир вокруг нас.
          </p>
        </div>

        {/* Project info */}
        <div className="glass-panel p-6 md:p-8 mb-10 text-left max-w-2xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/20 flex items-center justify-center flex-shrink-0">
              <span className="text-xl">🎓</span>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">О проекте</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Исследовательский проект студентов НИУ ВШЭ — факультет МИЭМ, направление ИВТ. 
                Цель — изучить, как привлечь школьников в IT-сферу через знакомство с реальными 
                технологиями и специалистами.
              </p>
            </div>
          </div>
        </div>

        {/* What we learned */}
        <div className="glass-panel p-6 md:p-8 mb-10 text-left max-w-2xl mx-auto">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Что мы узнали
          </h3>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-cyan-400/5 border border-cyan-400/10 flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0 mt-1.5" />
              <p className="text-sm text-slate-300">
                <span className="font-medium text-white">IT — это повсюду.</span> От закусочных до умных городов: приложения, облачные сервисы и инженерия нужны в каждой сфере жизни.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-cyan-400/5 border border-cyan-400/10 flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0 mt-1.5" />
              <p className="text-sm text-slate-300">
                <span className="font-medium text-white">Топ направлений:</span> искусственный интеллект, большие данные и интернет вещей — именно здесь формируется будущее технологий.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-cyan-400/5 border border-cyan-400/10 flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0 mt-1.5" />
              <p className="text-sm text-slate-300">
                <span className="font-medium text-white">Преподавателя не заменит ИИ.</span> Живое общение и наставничество остаются ключевыми в образовании.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-cyan-400/5 border border-cyan-400/10 flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0 mt-1.5" />
              <p className="text-sm text-slate-300">
                <span className="font-medium text-white">Портфолио решает.</span> Реальные проекты, соответствующие специализации, ценятся больше всего при поступлении и трудоустройстве.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-cyan-400/5 border border-cyan-400/10 flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0 mt-1.5" />
              <p className="text-sm text-slate-300">
                <span className="font-medium text-white">Главное — интерес.</span> Увлечение предметом и упорство важнее, чем выбор конкретного языка программирования.
              </p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={scrollToInterview}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-full text-cyan-300 font-medium hover:border-cyan-400/60 hover:from-cyan-500/30 hover:to-blue-500/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
          >
            Вернуться к интервью
          </button>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-8 py-4 bg-white/5 border border-white/10 rounded-full text-slate-300 font-medium hover:bg-white/10 hover:border-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            В начало
          </button>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-white/5">
          <p className="text-xs text-slate-500">
            © 2025 — Студенческий проект НИУ ВШЭ — МИЭМ, направление ИВТ
          </p>
          <p className="text-xs text-slate-600 mt-1">
            Интерактивный digital-проект о привлечении школьников в IT-сферу
          </p>
        </div>
      </div>
    </section>
  );
}
