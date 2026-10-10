import InteractiveNetwork from './InteractiveNetwork';

export default function HeroSection() {
  const scrollToNext = () => {
    const el = document.getElementById('research-questions');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden grid-bg">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0d1f3c] to-[#0a1628]" />
      <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent" />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 py-20 flex flex-col lg:flex-row gap-8 items-center justify-center min-h-screen">
        <div className="space-y-6 md:space-y-8 w-full lg:w-1/2">
          <div className="fade-in-up">
            <p className="text-cyan-400/80 text-sm md:text-base font-medium tracking-widest uppercase mb-4">Исследовательский проект</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.1] tracking-tight">
              <span className="text-white">КТО ПРИВОДИТ</span><br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">БУДУЩЕЕ</span><br />
              <span className="text-white">В ДВИЖЕНИЕ?</span>
            </h1>
          </div>
          <p className="fade-in-up fade-in-up-delay-1 text-lg md:text-xl text-slate-300/90 max-w-lg leading-relaxed">
            Как заинтересовать школьников технологиями и помочь им найти себя в IT
          </p>
          <p className="fade-in-up fade-in-up-delay-2 text-sm text-slate-400 border-l-2 border-cyan-500/30 pl-4">
            Исследовательский проект студентов НИУ ВШЭ — МИЭМ, направление ИВТ
          </p>
          <div className="fade-in-up fade-in-up-delay-3 pt-4">
            <button onClick={scrollToNext}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-full text-cyan-300 font-medium hover:border-cyan-400/60 hover:from-cyan-500/30 hover:to-blue-500/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
              aria-label="Начать исследование">
              <span>Начать исследование</span>
              <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </div>
        </div>
        <div className="w-full lg:w-1/2 h-[250px] md:h-[350px] lg:h-[500px] xl:h-[600px] relative">
          <div className="absolute inset-0 glass-panel opacity-30" />
          <InteractiveNetwork />
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <div className="w-5 h-8 border-2 border-cyan-400/40 rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-cyan-400 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
