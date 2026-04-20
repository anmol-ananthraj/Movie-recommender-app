import { useEffect, useState } from "react"
import GenreRow from "../components/GenreRow"
import Hero from "../components/Hero"
import { getTrendingMovies, getMoviesByGenre, getTrendingTvShows } from "../api/tmdb"

function Home() {
  const [movies, setMovies] = useState([])
  const [featuredMovie, setFeaturedMovie] = useState(null)
  const [horrormovies, sethorrorMovies] = useState([])
  const [actionmovies, setactionMovies] = useState([])
  const [tvShows, setTvShows] = useState([])
  useEffect(() => {
    async function loadMovies() {
      const data = await getTrendingMovies()
      const horror = await getMoviesByGenre(27)
      const action = await getMoviesByGenre(28)
      const tv = await getTrendingTvShows()
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
      const horrorformattedMovies = horror.map(m => ({
        id: m.id,
        title: m.title,
        rating: m.vote_average,
        poster: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
        backdrop: `https://image.tmdb.org/t/p/original${m.backdrop_path}`,
        year: m.release_date?.slice(0, 4),
        genre: genreMap[m.genre_ids[0]],
        overview: m.overview
      }))
      const actionformattedMovies = action.map(m => ({
        id: m.id,
        title: m.title,
        rating: m.vote_average,
        poster: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
        backdrop: `https://image.tmdb.org/t/p/original${m.backdrop_path}`,
        year: m.release_date?.slice(0, 4),
        genre: genreMap[m.genre_ids[0]],
        overview: m.overview
      }))
      const formattedMovies = data.map(m => ({
        id: m.id,
        title: m.title,
        rating: m.vote_average,
        poster: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
        backdrop: `https://image.tmdb.org/t/p/original${m.backdrop_path}`,
        year: m.release_date?.slice(0, 4),
        genre: genreMap[m.genre_ids[0]],
        overview: m.overview,
        mediaType: "movie"
      }))
      const formattedTvShows = tv.map(show => ({
        id: show.id,
        title: show.name,
        rating: show.vote_average,
        poster: `https://image.tmdb.org/t/p/w500${show.poster_path}`,
        backdrop: `https://image.tmdb.org/t/p/original${show.backdrop_path}`,
        year: show.first_air_date?.slice(0, 4),
        genre: genreMap[show.genre_ids[0]] || "TV",
        overview: show.overview,
        mediaType: "tv"
      }))
      sethorrorMovies(horrorformattedMovies)
      setactionMovies(actionformattedMovies)
      setTvShows(formattedTvShows)
      setMovies(formattedMovies)
      if (formattedMovies.length > 0) {
        setFeaturedMovie(formattedMovies[0])
      }
    }
    loadMovies()
  }, [])

  return (
    <div className="space-y-16 py-0 pb-20 px-0 overflow-x-hidden">
      <Hero movie={featuredMovie} />
      
      <div className="space-y-5 py-0 px-8 md:px-16">
        <GenreRow title="Trending Content" movies={movies} />
        <GenreRow title="New Releases" movies={movies.slice(10)} />
        <GenreRow title="TV Shows" movies={tvShows} />
        <GenreRow title="Horror" movies={horrormovies} />
        <GenreRow title="Action" movies={actionmovies} />
      </div>

      <footer className="w-full py-12 border-t border-outline-variant/15 bg-surface dark:bg-[#131313]">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-8 px-8">
          <div className="text-lg font-black text-on-surface/20 font-headline uppercase tracking-widest">CINESPOTLIGHT</div>
          <div className="flex flex-wrap justify-center gap-8">
            <a className="font-['Manrope'] text-xs uppercase tracking-widest text-on-surface/40 hover:text-on-surface transition-opacity" href="#">About Us</a>
            <a className="font-['Manrope'] text-xs uppercase tracking-widest text-on-surface/40 hover:text-on-surface transition-opacity" href="#">Privacy Policy</a>
            <a className="font-['Manrope'] text-xs uppercase tracking-widest text-on-surface/40 hover:text-on-surface transition-opacity" href="#">Terms of Service</a>
            <a className="font-['Manrope'] text-xs uppercase tracking-widest text-on-surface/40 hover:text-on-surface transition-opacity" href="#">Contact</a>
            <a className="font-['Manrope'] text-xs uppercase tracking-widest text-on-surface/40 hover:text-on-surface transition-opacity" href="#">API Docs</a>
          </div>
          <div className="flex gap-6">
            <span className="material-symbols-outlined text-on-surface/20 cursor-pointer hover:text-primary transition-colors">public</span>
            <span className="material-symbols-outlined text-on-surface/20 cursor-pointer hover:text-primary transition-colors">share</span>
            <span className="material-symbols-outlined text-on-surface/20 cursor-pointer hover:text-primary transition-colors">movie</span>
          </div>
          <p className="font-['Manrope'] text-[10px] uppercase tracking-widest text-on-surface/30">© 2024 CineSpotlight. The Digital Projectionist.</p>
        </div>
      </footer>
    </div>
  )
}

export default Home
