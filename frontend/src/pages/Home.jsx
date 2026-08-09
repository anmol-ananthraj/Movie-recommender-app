import { useEffect, useState } from "react"
import GenreRow from "../components/GenreRow"
import Hero from "../components/Hero"
import {
  getTrendingMovies,
  getMoviesByGenre,
  getTrendingTvShows
} from "../api/tmdb"

const genreMap = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Doc",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Rom",
  878: "Sci-Fi",
  10770: "TV",
  53: "Thriller",
  10752: "War",
  37: "Western"
}

function formatMovie(movie) {
  return {
    id: movie.tmdbId ?? movie.id,
    title: movie.title,
    rating: movie.rating ?? movie.vote_average,
    poster:
      movie.poster ??
      (movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : ""),
    backdrop:
      movie.backdrop ??
      (movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : ""),
    year:
      movie.releaseYear ??
      movie.release_date?.slice(0, 4),
    genre:
      movie.genres?.[0] ??
      genreMap[movie.genre_ids?.[0]],
    overview:
      movie.description ??
      movie.overview,
    mediaType: "movie"
  }
}

function Home() {
  const [movies, setMovies] = useState([])
  const [featuredMovie, setFeaturedMovie] = useState(null)

  const [horrormovies, sethorrorMovies] = useState([])
  const [actionmovies, setactionMovies] = useState([])
  const [tvShows, setTvShows] = useState([])

  useEffect(() => {
    async function loadMovies() {
      try {

        // =========================
        // TRENDING MOVIES
        // FROM OUR BACKEND
        // =========================

        const data = await getTrendingMovies()

        const formattedMovies = data.map(formatMovie)

        setMovies(formattedMovies)

        // First movie becomes the single Home hero
        if (formattedMovies.length > 0) {
          setFeaturedMovie(formattedMovies[0])
        }

        // =========================
        // HORROR
        // =========================

        const horror = await getMoviesByGenre(27)

        sethorrorMovies(
          horror.map(formatMovie)
        )

        // =========================
        // ACTION
        // =========================

        const action = await getMoviesByGenre(28)

        setactionMovies(
          action.map(formatMovie)
        )

        // =========================
        // TV SHOWS
        // =========================

        const tv = await getTrendingTvShows()

        const formattedTvShows = tv.map((show) => ({
          id: show.id,
          title: show.name,
          rating: show.vote_average,
          poster: show.poster_path
            ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
            : "",
          backdrop: show.backdrop_path
            ? `https://image.tmdb.org/t/p/original${show.backdrop_path}`
            : "",
          year: show.first_air_date?.slice(0, 4),
          genre: "TV",
          overview: show.overview,
          mediaType: "tv"
        }))

        setTvShows(formattedTvShows)

      } catch (error) {
        console.error("Failed to load movies:", error)
      }
    }

    loadMovies()
  }, [])

  return (
    <div>

      {/* =========================
          HOME HERO
          ========================= */}

      {featuredMovie && (
        <Hero movie={featuredMovie} />
      )}

      {/* =========================
          MOVIE ROWS
          ========================= */}

      <div className="space-y-1 py-0 px-8 md:px-16">

        <GenreRow
          title="Trending Movies"
          movies={movies}
        />

        <GenreRow
          title="New Releases"
          movies={movies.slice(10)}
        />

        <GenreRow
          title="TV Shows"
          movies={tvShows}
        />

        <GenreRow
          title="Horror"
          movies={horrormovies}
        />

        <GenreRow
          title="Action"
          movies={actionmovies}
        />

      </div>

      {/* =========================
          FOOTER
          ========================= */}

      <footer className="w-full py-16 border-t border-white/5 bg-surface dark:bg-[#131313]">

        <div className="max-w-screen-2xl mx-auto flex flex-col items-center gap-8 px-8">

          <div className="text-2xl font-black text-on-surface/10 font-headline uppercase tracking-[0.5em]">
            REELBOXD
          </div>

          <div className="flex flex-wrap justify-center gap-12">

            <a
              className="font-headline text-[10px] font-black uppercase tracking-[0.3em] text-on-surface/40 hover:text-primary transition-all"
              href="#"
            >
              About
            </a>

            <a
              className="font-headline text-[10px] font-black uppercase tracking-[0.3em] text-on-surface/40 hover:text-primary transition-all"
              href="#"
            >
              Privacy
            </a>

            <a
              className="font-headline text-[10px] font-black uppercase tracking-[0.3em] text-on-surface/40 hover:text-primary transition-all"
              href="#"
            >
              Terms
            </a>

            <a
              className="font-headline text-[10px] font-black uppercase tracking-[0.3em] text-on-surface/40 hover:text-primary transition-all"
              href="#"
            >
              Contact
            </a>

            <a
              className="font-headline text-[10px] font-black uppercase tracking-[0.3em] text-on-surface/40 hover:text-primary transition-all"
              href="#"
            >
              API
            </a>

          </div>

          <p className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-on-surface/20 text-center">
            © 2026 Reelboxd. The Digital Projectionist.
          </p>

        </div>

      </footer>

    </div>
  )
}

export default Home