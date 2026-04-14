import MovieCard from "./MovieCard"
import { useRef } from "react"
import leftIcon from "../assets/scrollLeft.png";
import rightIcon from "../assets/scrollRight.png";


function GenreRow({ title, movies }) {
  const scrollRef = useRef(null)
  const scrollLeft = () => {
  scrollRef.current.scrollBy({
    left: -500,
    behavior: "smooth"
  })
  }
  const scrollRight = () => {
  scrollRef.current.scrollBy({
    left: 500,
    behavior: "smooth"
  })
  }
  return (
    <section>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-black font-headline tracking-tight text-on-surface">{title}</h2>
          <div className="h-1 w-12 bg-primary mt-2"></div>
        </div>
      </div>
      <div className="relative">
        {/* LEFT BUTTON */}
        <button
          onClick={scrollLeft}
          className="absolute left-[-55px] top-[42%] -translate-y-1/2 z-10
                 w-12 h-12 rounded-[50%] 
                 flex items-center justify-center 
                 shadow-2xl"
        >
          <img src={leftIcon} alt="left" className="w-6 h-8 ml-[5px] invert brightness-200" />
        </button>

        {/* RIGHT BUTTON */}
        <button
          onClick={scrollRight}
          className="absolute right-[-65px] top-[42%] -translate-y-1/2 z-10
                 w-12 h-12 rounded-[50%] 
                 flex items-center justify-center 
                 shadow-2xl"
        >
          <img src={rightIcon} alt="right" className="w-6 h-8 mr-[4px] invert brightness-200" />
        </button>
        <div className="flex gap-6 overflow-x-auto no-scrollbar pb-8 -mx-4 px-4 scroll-smooth" ref={scrollRef}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default GenreRow