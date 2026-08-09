const API_KEY = "46f3491ae9d76dc6f975e69faa4981d3"

const BASE_URL = "https://api.themoviedb.org/3"

const API_KEY2 = "6793d17e"

const BASE_URL2 = "https://www.omdbapi.com/"

export async function getTrendingMovies() {
  const res = await fetch(
    "http://localhost:5000/api/movies/trending"
  )
  const data = await res.json()
  return data
}

export async function getNowPlayingMovies() {
  const res = await fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}`
  )
  const data = await res.json()
  return data.results
}

export async function getNewReleaseMovies() {
  const today = new Date()
  const oneYearAgo = new Date(today)
  oneYearAgo.setFullYear(today.getFullYear() - 1)

  const formatDate = (date) => date.toISOString().slice(0, 10)

  const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=primary_release_date.desc&primary_release_date.gte=${formatDate(oneYearAgo)}&primary_release_date.lte=${formatDate(today)}&with_release_type=2|3&region=US&vote_count.gte=20`
  )
  const data = await res.json()
  return data.results
}

export async function getTrendingTvShows() {
  const res = await fetch(
    `${BASE_URL}/trending/tv/week?api_key=${API_KEY}`
  )
  const data = await res.json()
  return data.results
}

export async function getMoviesByGenre(genreId) {
  const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
  )
  const data = await res.json()
  return data.results
}

export async function getTvShowsByGenre(genreId) {
  const res = await fetch(
    `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=${genreId}`
  )
  const data = await res.json()
  return data.results
}


export async function getMovieTrailer(movieId) {
  const res = await fetch(
    `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
  )

  const data = await res.json()

  const trailer = data.results.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  )
  return trailer
    ? `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&rel=0&modestbranding=1&iv_load_policy=3`
    : null
}

export async function getMovieDetails(movieId) {

  const res = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
  )

  return await res.json()
}

export async function getTvDetails(tvId) {
  const res = await fetch(
    `${BASE_URL}/tv/${tvId}?api_key=${API_KEY}`
  )

  return await res.json()
}

export async function getOmdbDetails(imdbId) {

  const res = await fetch(
    `${BASE_URL2}?apikey=${API_KEY2}&i=${imdbId}`
  )

  return await res.json()
}


export async function getMovieCredits(movieId) {

  const res = await fetch(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
  )

  return await res.json()
}

export async function getTvCredits(tvId) {
  const res = await fetch(
    `${BASE_URL}/tv/${tvId}/credits?api_key=${API_KEY}`
  )

  return await res.json()
}

export async function getTvExternalIds(tvId) {
  const res = await fetch(
    `${BASE_URL}/tv/${tvId}/external_ids?api_key=${API_KEY}`
  )

  return await res.json()
}


export async function getMovieVideos(movieId) {

  const res = await fetch(
    `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
  )

  return await res.json()
}

export const getMovieReviews = async (movieId) => {
  try {
    const res = await fetch(
      `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`
    );

    const data = await res.json();

    return data.results; // raw reviews
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
};

export async function searchMovies(query) {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  )
  const data = await res.json()
  return data.results
}

