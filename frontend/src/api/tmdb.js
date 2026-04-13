const API_KEY = "46f3491ae9d76dc6f975e69faa4981d3"

const BASE_URL = "https://api.themoviedb.org/3"

export async function getTrendingMovies() {
  const res = await fetch(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
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


export async function getMovieCredits(movieId) {

  const res = await fetch(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
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