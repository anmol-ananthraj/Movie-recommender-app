function Hero({ movie }) {
  if (!movie) return null;

  return (
    <section className="relative h-[870px] w-full overflow-hidden flex items-center">
      <div className="absolute inset-0 z-0">
        <img 
          alt={movie.title} 
          className="w-full h-full object-cover opacity-60 scale-105" 
          src={movie.backdrop || movie.poster} 
        />
        <div className="absolute inset-0 hero-gradient"></div>
      </div>

      <div className="relative z-10 px-8 md:px-16 w-full lg:max-w-4xl">
        <div className="flex items-center gap-4 mb-6">
          <span className="bg-secondary-container text-on-secondary-fixed px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest font-body">Trending Now</span>
          <span className="text-on-surface/60 text-xs font-medium font-body flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">schedule</span> 2h 45m
          </span>
        </div>
        <h1 className="text-6xl md:text-8xl font-black font-headline tracking-tighter leading-[0.9] text-on-surface mb-6 uppercase">
          {movie.title.split(' ').map((word, i) => (
            <span key={i}>{word} {i === 0 && <br />}</span>
          ))}
        </h1>
        <p className="text-on-surface/80 text-lg md:text-xl font-body leading-relaxed mb-10 max-w-xl">
          {movie.overview || "In a rain-soaked metropolis where shadows hold secrets, one detective must bridge the gap between human and machine before the city burns."}
        </p>
        <div className="flex items-center gap-4">
          <button className="primary-gradient text-on-primary px-8 py-4 rounded-md font-headline font-bold text-sm tracking-wide flex items-center gap-3 hover:scale-105 active:scale-95 transition-transform shadow-lg">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
            WATCH TRAILER
          </button>
          <button className="bg-surface/40 backdrop-blur-md border border-outline-variant/30 text-on-surface px-8 py-4 rounded-md font-headline font-bold text-sm tracking-wide flex items-center gap-3 hover:bg-surface/60 transition-all">
            <span className="material-symbols-outlined">add</span>
            WATCHLIST
          </button>
        </div>
      </div>

      <div className="absolute right-8 bottom-12 hidden lg:flex flex-col items-end gap-1 opacity-20 pointer-events-none">
        <span className="text-8xl font-black font-headline tracking-tighter">01</span>
        <span className="text-xs font-headline font-bold uppercase tracking-[0.5em]">Global Chart</span>
      </div>
    </section>
  )
}

export default Hero
