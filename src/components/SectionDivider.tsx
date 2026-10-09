export default function SectionDivider({ variant = 'default' }: { variant?: 'default' | 'circuit' | 'dots' }) {
  if (variant === 'circuit') {
    return (
      <div className="relative h-20 md:h-32 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        </div>
        <div className="relative flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-cyan-400/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/20" />
          <div className="w-1 h-1 rounded-full bg-cyan-400/10" />
        </div>
        {/* Circuit decoration */}
        <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-16 h-px bg-gradient-to-r from-transparent to-cyan-500/10" />
        <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-16 h-px bg-gradient-to-l from-transparent to-cyan-500/10" />
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className="flex justify-center py-12 md:py-16">
        <div className="flex gap-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-1 h-1 rounded-full bg-cyan-400/30"
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-16 md:h-24 flex items-center justify-center">
      <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}
