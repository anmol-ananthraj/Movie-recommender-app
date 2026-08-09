const Movie = require("../models/Movie")
const axios = require("axios")

const getMovies = async (req, res) => {

  try {

    const movies = await Movie.find()

    res.json(movies)

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch movies"
    })

  }

}

const getMovieById = async (req, res) => {

  try {

    const { tmdbId } = req.params

    // 1. Check MongoDB first
    const existingMovie = await Movie.findOne({ tmdbId })

    if (existingMovie) {
      return res.json(existingMovie)
    }

    // 2. Movie doesn't exist in MongoDB
    // Fetch it from TMDb
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${tmdbId}`,
      {
        params: {
          api_key: process.env.TMDB_API_KEY
        }
      }
    )

    const tmdbMovie = response.data

    const creditsResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/${tmdbId}/credits`,
      {
        params: {
        api_key: process.env.TMDB_API_KEY
        }
      }
    )

const credits = creditsResponse.data


    // 3. Convert TMDb data into our Movie structure
    const cast = credits.cast
  .slice(0, 5)
  .map(actor => actor.name)

const director = credits.crew.find(
  person => person.job === "Director"
)

const movie = await Movie.create({

  tmdbId: tmdbMovie.id,

  title: tmdbMovie.title,

  releaseYear: tmdbMovie.release_date
    ? Number(tmdbMovie.release_date.slice(0, 4))
    : null,

  description: tmdbMovie.overview,

  genres: tmdbMovie.genres.map(
    genre => genre.name
  ),

  poster: `https://image.tmdb.org/t/p/w500${tmdbMovie.poster_path}`,

  rating: tmdbMovie.vote_average,

  cast: cast,

  director: director ? director.name : ""

})
    // 4. Return the newly saved movie
    res.status(201).json(movie)

  } catch (error) {

    console.error(error.message)

    res.status(500).json({
      message: "Failed to fetch movie"
    })

  }

}
const getTrendingMovies = async (req, res) => {

  try {

    const response = await axios.get(
      "https://api.themoviedb.org/3/trending/movie/week",
      {
        params: {
          api_key: process.env.TMDB_API_KEY
        }
      }
    )

    const trendingMovies = response.data.results.map(movie => ({
  tmdbId: movie.id,
  title: movie.title,
  description: movie.overview,
  poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
  backdrop: movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "",
  rating: movie.vote_average,
  releaseYear: movie.release_date
    ? Number(movie.release_date.slice(0, 4))
    : null,
  genreIds: movie.genre_ids
}))
    res.json(trendingMovies)

  } catch (error) {

    console.error(error.message)

    res.status(500).json({
      message: "Failed to fetch trending movies"
    })

  }

}

module.exports = {
  getMovies,
  getMovieById,
  getTrendingMovies
}
