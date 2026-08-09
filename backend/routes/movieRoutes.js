const express = require("express")

const router = express.Router()

const { getMovies,  getMovieById } = require("../controllers/movieController")

router.get("/", getMovies)
router.get("/:tmdbId", getMovieById)

module.exports = router