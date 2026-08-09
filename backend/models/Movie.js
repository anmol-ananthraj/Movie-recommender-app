const mongoose = require("mongoose")
const movieSchema = new mongoose.Schema({
  tmdbId: {
    type: Number,
    required: true,
    unique: true
  },

  title: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  genres: {
    type: [String]
  },

  poster: {
    type: String
  },

  trailer: {
    type: String
  },

  rating: {
    type: Number
  },

  releaseYear: {
  type: Number
  },

  cast: {
  type: [String]
  },

  director: {
  type: String
  }

})
module.exports = mongoose.model("Movie", movieSchema)