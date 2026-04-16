import { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { searchMovies, getMoviesByGenre } from "../api/tmdb"

function Search() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const query = searchParams.get("q")
  const normalizedQuery = query?.trim().toLowerCase()
  const [results, setResults] = useState([])
  const genreMap = {
  action: 28,
  adventure: 12,
  comedy: 35,
  funny: 35,
  crime: 80,
  drama: 18,
  family: 10751,
  fantasy: 14,
  history: 36,
  horror: 27,
  scary: 27,
  suspense: 53,
  thriller: 53,
  mystery: 9648,
  romance: 10749,
  romantic: 10749,
  love: 10749,
  scifi: 878,
  "science fiction": 878,
  war: 10752,
  western: 37
  }
  const genreId = genreMap[normalizedQuery]
  useEffect(() => {
    async function fetchResults() {
      if (genreId){
      const data = await getMoviesByGenre(genreId)
      setResults(data.map(m => ({
        id: m.id,
        title: m.title,
        rating: m.vote_average,
        poster: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
        backdrop: `https://image.tmdb.org/t/p/original${m.backdrop_path}`,
        year: m.release_date?.slice(0, 4),
        genre: "Sci-Fi",
        overview: m.overview
      })))
      } else if(query){
        const data = await searchMovies(query)
        setResults(data.map(m => ({
        id: m.id,
        title: m.title,
        rating: m.vote_average,
        poster: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
        backdrop: `https://image.tmdb.org/t/p/original${m.backdrop_path}`,
        year: m.release_date?.slice(0, 4),
        genre: "Sci-Fi",
        overview: m.overview
      })))
      } 
    }
    fetchResults()
  }, [query])

  const topMatch = results[0]
  const supportingResults = results.slice(1, 7)
  const metadataTags = ["Top Match", "Trending", query || "Discover"]

  return (
    <div className="min-h-screen bg-surface pt-20 text-on-surface">
      <main className="min-h-screen">
        <div className="mx-auto max-w-[92rem] px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Search Results</p>
                <h1 className="font-headline text-4xl font-black tracking-tighter text-on-surface md:text-6xl">
                  "{query || "Trending"}"
                </h1>
              </div>
              <span className="font-headline text-base text-on-surface/30 md:text-lg">{results.length} Results found</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {metadataTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-surface-container-high px-3 py-1 text-xs font-medium text-on-surface-variant"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {topMatch && (
              <div className="group relative overflow-hidden rounded-xl bg-surface-container-low xl:col-span-2">
                <div className="flex h-full flex-col md:flex-row">
                  <div className="relative min-h-[320px] overflow-hidden md:w-1/2">
                    <img
                      src={topMatch.backdrop || topMatch.poster}
                      alt={topMatch.title}
                      className="h-full w-full object-cover grayscale-[0.15] transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-surface-container-low"></div>
                    <div className="absolute left-4 top-4">
                      <span className="flex items-center gap-1 rounded-full border border-secondary/20 bg-surface/80 px-3 py-1 text-[10px] font-bold text-secondary backdrop-blur-md">
                        <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        TOP MATCH
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between p-8 md:w-1/2">
                    <div>
                      <div className="mb-4 flex items-start justify-between gap-4">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface/40">Recommended Choice</span>
                        <span className="text-xs font-bold text-on-surface/60">{topMatch.year || "2024"}</span>
                      </div>

                      <h2 className="mb-4 font-headline text-4xl font-bold tracking-tight transition-colors group-hover:text-primary">
                        {topMatch.title}
                      </h2>

                      <p className="mb-6 line-clamp-4 text-sm leading-relaxed text-on-surface/70">
                        {topMatch.overview || "A standout result from your search with audience signals and quick-watch context."}
                      </p>

                      <div className="grid grid-cols-3 gap-4 border-t border-outline-variant/15 pt-6">
                        <div className="text-center">
                          <p className="mb-1 text-[10px] uppercase tracking-widest text-on-surface/40">TMDB</p>
                          <p className="font-headline text-lg font-black text-secondary">{topMatch.rating?.toFixed(1) || "N/A"}</p>
                        </div>
                        <div className="border-x border-outline-variant/15 text-center">
                          <p className="mb-1 text-[10px] uppercase tracking-widest text-on-surface/40">Genre</p>
                          <p className="font-headline text-lg font-black text-tertiary">{topMatch.genre}</p>
                        </div>
                        <div className="text-center">
                          <p className="mb-1 text-[10px] uppercase tracking-widest text-on-surface/40">Year</p>
                          <p className="font-headline text-lg font-black text-on-surface">{topMatch.year || "N/A"}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex gap-4">
                      <button
                        onClick={() => navigate(`/movie/${topMatch.id}`)}
                        className="flex flex-1 items-center justify-center gap-2 rounded-md bg-gradient-to-br from-primary to-primary-container py-3 text-sm font-bold text-on-primary transition-all hover:opacity-90"
                      >
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                        View Details
                      </button>
                      <button className="rounded-md border border-outline-variant/30 p-3 transition-colors hover:bg-surface-container-high">
                        <span className="material-symbols-outlined">add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {supportingResults.map((movie) => (
              <div key={movie.id} className="group flex flex-col overflow-hidden rounded-xl bg-surface-container">
                <div className="relative aspect-[2/3] overflow-hidden">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-surface to-transparent p-4">
                    <span className="rounded-sm bg-secondary px-2 py-0.5 text-[10px] font-black text-on-secondary-fixed">
                      {movie.year || "2024"}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <h3 className="truncate pr-2 font-headline text-xl font-bold">{movie.title}</h3>
                    <span className="text-sm font-black text-secondary">{movie.rating?.toFixed(1) || "N/A"}</span>
                  </div>
                  <div className="mb-4 flex gap-2">
                    <span className="text-[10px] font-bold uppercase text-on-surface/40">{movie.genre}</span>
                    <span className="text-[10px] font-bold uppercase text-on-surface/40">�</span>
                    <span className="text-[10px] font-bold uppercase text-on-surface/40">Trending</span>
                  </div>
                  <p className="mb-4 border-l-2 border-primary pl-3 text-xs italic text-on-surface/60">
                    "{movie.overview?.slice(0, 80) || "A visually rich pick related to your search."}..."
                  </p>
                  <button
                    onClick={() => navigate(`/movie/${movie.id}`)}
                    className="w-full border border-outline-variant/15 py-2 text-xs font-bold uppercase tracking-widest transition-colors hover:bg-surface-container-highest"
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 flex flex-col items-center">
            <div className="mb-8 h-[1px] w-24 bg-outline-variant/30"></div>
            <button className="rounded-full border border-outline-variant/30 px-10 py-4 font-headline text-xs font-bold uppercase tracking-[0.2em] transition-all hover:bg-on-surface hover:text-surface">
              Show More Results
            </button>
          </div>
        </div>
      </main>

      <footer className="border-t border-outline-variant/15 bg-surface py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-8">
          <div className="font-headline text-lg font-black uppercase tracking-tighter text-on-surface/20">CineSpotlight</div>
          <div className="flex flex-wrap justify-center gap-8">
            <a className="font-body text-xs uppercase tracking-widest text-on-surface/40 transition-opacity hover:text-on-surface" href="#">About Us</a>
            <a className="font-body text-xs uppercase tracking-widest text-on-surface/40 transition-opacity hover:text-on-surface" href="#">Privacy Policy</a>
            <a className="font-body text-xs uppercase tracking-widest text-on-surface/40 transition-opacity hover:text-on-surface" href="#">Terms of Service</a>
            <a className="font-body text-xs uppercase tracking-widest text-on-surface/40 transition-opacity hover:text-on-surface" href="#">Contact</a>
            <a className="font-body text-xs uppercase tracking-widest text-on-surface/40 transition-opacity hover:text-on-surface" href="#">API Docs</a>
          </div>
          <div className="font-body text-[10px] uppercase tracking-widest text-on-surface/20">
            � 2024 CineSpotlight. The Digital Projectionist.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Search
