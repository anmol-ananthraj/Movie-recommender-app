import MovieCard from "./MovieCard"
import { useRef } from "react"

function GenreRow({ title, movies }) {
  const scrollRef = useRef(null)

  return (
    <section>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-black font-headline tracking-tight text-on-surface">{title}</h2>
          <div className="h-1 w-12 bg-primary mt-2"></div>
        </div>
        <a className="text-xs font-bold font-headline uppercase tracking-widest text-on-surface/40 hover:text-primary transition-colors cursor-pointer">
          See all matches
        </a>
      </div>
      
      <div className="flex gap-6 overflow-x-auto no-scrollbar pb-8 -mx-4 px-4 scroll-smooth" ref={scrollRef}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  )
}

export default GenreRow