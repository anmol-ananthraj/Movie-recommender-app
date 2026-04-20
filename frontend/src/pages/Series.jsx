import { useEffect, useState } from "react"
import GenreRow from "../components/GenreRow"
import MovieHeroCarousel from "../components/MovieHeroCarousel"
import { getTrendingTvShows, getTvShowsByGenre } from "../api/tmdb"

const genreMap = {
  10759: "Action",
  35: "Comedy",
  18: "Drama",
  80: "Thriller",
  9648: "Horror",
  10765: "Thriller",
}

function formatSeries(show, fallbackGenre = "Series") {
  return {
    id: show.id,
    title: show.name,
    rating: show.vote_average,
    poster: show.poster_path ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : "",
    backdrop: show.backdrop_path ? `https://image.tmdb.org/t/p/original${show.backdrop_path}` : "",
    year: show.first_air_date?.slice(0, 4),
    genre: genreMap[show.genre_ids?.[0]] || fallbackGenre,
    overview: show.overview,
    mediaType: "tv",
  }
}

function Series() {
  const [heroSeries, setHeroSeries] = useState([])
  const [rows, setRows] = useState({
    newReleases: [],
    horror: [],
    action: [],
    thriller: [],
    comedy: [],
    romance: [],
  })

  useEffect(() => {
    async function loadSeriesPage() {
      const [trending, horror, action, thriller, comedy, romance] = await Promise.all([
        getTrendingTvShows(),
        getTvShowsByGenre(9648),
        getTvShowsByGenre(10759),
        getTvShowsByGenre(80),
        getTvShowsByGenre(35),
        getTvShowsByGenre(18),
      ])

      const trendingSeries = trending
        .filter((show) => show.poster_path && show.backdrop_path)
        .map((show) => formatSeries(show))

      setHeroSeries(trendingSeries.slice(0, 4))
      setRows({
        newReleases: trending.filter((show) => show.poster_path).map((show) => formatSeries(show, "New Release")),
        horror: horror.filter((show) => show.poster_path).map((show) => formatSeries(show, "Horror")),
        action: action.filter((show) => show.poster_path).map((show) => formatSeries(show, "Action")),
        thriller: thriller.filter((show) => show.poster_path).map((show) => formatSeries(show, "Thriller")),
        comedy: comedy.filter((show) => show.poster_path).map((show) => formatSeries(show, "Comedy")),
        romance: romance.filter((show) => show.poster_path).map((show) => formatSeries(show, "Romance")),
      })
    }

    loadSeriesPage()
  }, [])

  return (
    <div className="space-y-16 overflow-x-hidden px-0 py-0 pb-20">
      <MovieHeroCarousel movies={heroSeries} />

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

export default Series
