import MovieCard from "./MovieCard"
import { useRef } from "react"
import leftIcon from "../assets/scrollLeft.png"
import rightIcon from "../assets/scrollRight.png"

function GenreRow({ title, movies }) {
  const scrollRef = useRef(null)

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -500,
      behavior: "smooth",
    })
  }

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 500,
      behavior: "smooth",
    })
  }

  return (
    <section>
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="font-headline text-2xl font-black tracking-tight text-on-surface">{title}</h2>
          <div className="mt-2 h-1 w-12 bg-primary"></div>
        </div>
      </div>

      <div className="relative">
        <button
          onClick={scrollLeft}
          aria-label={`Scroll ${title} left`}
          className="absolute left-0 top-[42%] z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-surface/75 shadow-[0_14px_28px_-14px_rgba(0,0,0,0.85)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-primary/30 hover:bg-surface-container-high active:scale-95 sm:left-2 sm:h-10 sm:w-10 md:left-3 md:h-11 md:w-11"
        >
          <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-transparent opacity-70"></span>
          <img
            src={leftIcon}
            alt="left"
            className="relative ml-[2px] h-3.5 w-3.5 invert brightness-200 opacity-90 sm:h-4 sm:w-4"
          />
        </button>

        <button
          onClick={scrollRight}
          aria-label={`Scroll ${title} right`}
          className="absolute right-0 top-[42%] z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-surface/75 shadow-[0_14px_28px_-14px_rgba(0,0,0,0.85)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-primary/30 hover:bg-surface-container-high active:scale-95 sm:right-2 sm:h-10 sm:w-10 md:right-3 md:h-11 md:w-11"
        >
          <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-transparent opacity-70"></span>
          <img
            src={rightIcon}
            alt="right"
            className="relative mr-[1px] h-3.5 w-3.5 invert brightness-200 opacity-90 sm:h-4 sm:w-4"
          />
        </button>

        <div className="no-scrollbar -mx-4 flex gap-6 overflow-x-auto px-4 pb-8 scroll-smooth" ref={scrollRef}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default GenreRow
