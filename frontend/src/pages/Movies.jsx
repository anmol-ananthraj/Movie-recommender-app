import { useEffect, useState } from "react"
import GenreRow from "../components/GenreRow"
import MovieHeroCarousel from "../components/MovieHeroCarousel"
import { getMoviesByGenre, getNowPlayingMovies, getTrendingMovies } from "../api/tmdb"

const genreMap = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
}

function formatMovie(movie) {
  return {
    id: movie.id,
    title: movie.title,
    rating: movie.vote_average,
    poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "",
    backdrop: movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : "",
    year: movie.release_date?.slice(0, 4),
    genre: genreMap[movie.genre_ids?.[0]] || "Movie",
    overview: movie.overview,
    mediaType: "movie",
  }
}

function Movies() {
  const [heroMovies, setHeroMovies] = useState([])
  const [rows, setRows] = useState({
    newReleases: [],
    horror: [],
    action: [],
    thriller: [],
    comedy: [],
    romance: [],
  })

  useEffect(() => {
    async function loadMoviePage() {
      const [trending, newReleases, horror, action, thriller, comedy, romance] = await Promise.all([
        getTrendingMovies(),
        getNowPlayingMovies(),
        getMoviesByGenre(27),
        getMoviesByGenre(28),
        getMoviesByGenre(53),
        getMoviesByGenre(35),
        getMoviesByGenre(10749),
      ])

      const trendingMovies = trending
        .filter((movie) => movie.poster_path && movie.backdrop_path)
        .map(formatMovie)

      setHeroMovies(trendingMovies.slice(0, 4))
      setRows({
        newReleases: newReleases.filter((movie) => movie.poster_path).map(formatMovie),
        horror: horror.filter((movie) => movie.poster_path).map(formatMovie),
        action: action.filter((movie) => movie.poster_path).map(formatMovie),
        thriller: thriller.filter((movie) => movie.poster_path).map(formatMovie),
        comedy: comedy.filter((movie) => movie.poster_path).map(formatMovie),
        romance: romance.filter((movie) => movie.poster_path).map(formatMovie),
      })
    }

    loadMoviePage()
  }, [])

  return (
    <div className="space-y-16 overflow-x-hidden px-0 py-0 pb-20">
      <MovieHeroCarousel movies={heroMovies} />

      <div className="space-y-5 px-8 py-0 md:px-16">
        <GenreRow title="New realeases" movies={rows.newReleases} />
        <GenreRow title="Horror" movies={rows.horror} />
        <GenreRow title="Action" movies={rows.action} />
        <GenreRow title="Thriller" movies={rows.thriller} />
        <GenreRow title="Comedy" movies={rows.comedy} />
        <GenreRow title="Romance" movies={rows.romance} />
      </div>
    </div>
  )
}

export default Movies
