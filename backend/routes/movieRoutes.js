const express = require("express")

const router = express.Router()

const { getMovies,  getMovieById,  getTrendingMovies } = require("../controllers/movieController")

router.get("/", getMovies)
router.get("/trending", getTrendingMovies)
router.get("/:tmdbId", getMovieById)


module.exports = router