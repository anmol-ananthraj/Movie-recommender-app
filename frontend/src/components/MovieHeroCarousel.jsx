import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function MovieHeroCarousel({ movies = [] }) {
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (movies.length <= 1) return undefined

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % movies.length)
    }, 4500)

    return () => window.clearInterval(interval)
  }, [movies.length])

  useEffect(() => {
    if (activeIndex >= movies.length) {
      setActiveIndex(0)
    }
  }, [activeIndex, movies.length])

  if (!movies.length) return null

  const activeMovie = movies[activeIndex]

  return (
    <section className="relative min-h-[860px] w-full overflow-hidden flex items-center">
      <div className="absolute inset-0 z-0">
        <img
          alt={activeMovie.title}
          className="h-full w-full object-cover opacity-50 transition-all duration-700"
          src={activeMovie.backdrop || activeMovie.poster}
        />
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_30%,rgba(229,9,20,0.18),transparent_28%),radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_26%)]"></div>
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-screen-2xl gap-14 px-8 pt-28 md:px-16 lg:grid-cols-[minmax(0,1.1fr)_560px] lg:items-center">
        <div className="max-w-2xl">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.35em] text-[#131313]">
              Movie Spotlight
            </span>
            <span className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.35em] text-white/70">
              Slide {String(activeIndex + 1).padStart(2, "0")}
            </span>
          </div>

          <h1 className="mb-6 text-5xl font-black uppercase tracking-[-0.05em] text-on-surface sm:text-6xl md:text-7xl lg:text-8xl">
            {activeMovie.title}
          </h1>

          <div className="mb-6 flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-[0.3em] text-white/55">
            <span>{activeMovie.year || "2026"}</span>
            <span className="h-1 w-1 rounded-full bg-white/35"></span>
            <span>{activeMovie.genre || "Featured"}</span>
            <span className="h-1 w-1 rounded-full bg-white/35"></span>
            <span>{activeMovie.rating?.toFixed(1) || "8.0"} Rating</span>
          </div>

          <p className="mb-10 max-w-xl text-base leading-8 text-on-surface/78 md:text-lg">
            {activeMovie.overview || "A featured story rises to the top of the city skyline while the stakes keep climbing."}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              className="primary-gradient rounded-md px-8 py-4 font-headline text-sm font-bold tracking-[0.25em] text-on-primary transition-transform hover:scale-105 active:scale-95"
              onClick={() => navigate(`/movie/${activeMovie.id}`)}
            >
              OPEN MOVIE
            </button>
            <button
              className="rounded-md border border-white/15 bg-white/5 px-8 py-4 font-headline text-sm font-bold tracking-[0.25em] text-on-surface transition-all hover:bg-white/10"
              onClick={() => setActiveIndex((activeIndex + 1) % movies.length)}
            >
              NEXT SLIDE
            </button>
          </div>

          <div className="mt-10 flex items-center gap-3">
            {movies.map((movie, index) => (
              <button
                key={movie.id}
                type="button"
                aria-label={`Show hero slide ${index + 1}`}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "w-10 bg-white" : "w-3 bg-white/35 hover:bg-white/60"
                }`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>

        <div className="relative mx-auto flex h-[520px] w-full max-w-[560px] items-center justify-center">
          {movies.map((movie, index) => {
            const offset = (index - activeIndex + movies.length) % movies.length
            const normalizedOffset = offset === movies.length - 1 ? -1 : offset
            const isActive = index === activeIndex
            const translateX = normalizedOffset * 110
            const rotate = normalizedOffset * 6
            const scale = isActive ? 1 : 0.88
            const opacity = Math.abs(normalizedOffset) > 1 ? 0 : 1

            return (
              <button
                key={movie.id}
                type="button"
                className="absolute top-1/2 h-[420px] w-[260px] -translate-y-1/2 overflow-hidden rounded-[28px] border border-white/12 bg-[#1a1a1a] text-left shadow-[0_35px_90px_-35px_rgba(0,0,0,0.95)] transition-all duration-700 ease-out"
                onClick={() => setActiveIndex(index)}
                style={{
                  transform: `translateY(-50%) translateX(${translateX}px) rotate(${rotate}deg) scale(${scale})`,
                  zIndex: isActive ? 30 : 20 - Math.abs(normalizedOffset),
                  opacity,
                }}
              >
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-[#070707]/25 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-white/65">
                    {isActive ? "Now Showing" : "Up Next"}
                  </p>
                  <h2 className="line-clamp-2 font-headline text-xl font-black uppercase tracking-tight text-white">
                    {movie.title}
                  </h2>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default MovieHeroCarousel
