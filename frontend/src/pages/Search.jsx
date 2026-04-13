import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import MovieCard from "../components/MovieCard"
import { getTrendingMovies } from "../api/tmdb"

function Search() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get("q")
  const [results, setResults] = useState([])

  useEffect(() => {
    async function fetchResults() {
      const data = await getTrendingMovies()
      setResults(data.map(m => ({
        id: m.id,
        title: m.title,
        rating: m.vote_average,
        poster: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
        year: m.release_date?.slice(0, 4),
        genre: "Sci-Fi",
        overview: m.overview
      })))
    }
    fetchResults()
  }, [query])

  return (
    <div className="py-20 px-8 md:px-16 min-h-screen bg-surface">
      <div className="flex flex-col gap-2 mb-12">
        <h2 className="text-xs uppercase tracking-[0.3em] text-primary font-bold">Search Results</h2>
        <p className="text-3xl font-headline font-bold">
          Resulting matches for: <span className="text-on-surface/50 italic">"{query || "Trending"}"</span>
        </p>
        <div className="h-1 w-12 bg-primary mt-2"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {results.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}

export default Search
