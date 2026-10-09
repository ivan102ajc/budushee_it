import { useState, useEffect } from 'react';

const sections = [
  { id: 'hero', label: 'Начало' },
  { id: 'research-questions', label: 'Вопросы' },
  { id: 'interview', label: 'Интервью' },
  { id: 'build-future', label: 'Будущее' },
  { id: 'future-timeline', label: 'Через 10 лет' },
  { id: 'myths', label: 'Мифы' },
  { id: 'tech-around', label: 'Технологии' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Determine active section
      const sectionElements = sections.map(s => ({
        id: s.id,
        el: document.getElementById(s.id),
      }));
      
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i].el;
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(sectionElements[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#0a1628]/90 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="Основная навигация"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-2 text-sm font-semibold text-white hover:text-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400/30 rounded px-2 py-1"
          >
            <div className="w-6 h-6 rounded bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">IT</span>
            </div>
            <span className="hidden sm:inline">ВШЭ × ИВТ</span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {sections.slice(1).map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`px-3 py-1.5 text-xs rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 ${
                  activeSection === s.id
                    ? 'text-cyan-400 bg-cyan-400/10'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400/30 rounded"
            aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={mobileOpen}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-[#0a1628]/95 backdrop-blur-xl" onClick={() => setMobileOpen(false)} />
          <div className="relative pt-20 px-6 space-y-2">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all ${
                  activeSection === s.id
                    ? 'text-cyan-400 bg-cyan-400/10'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
