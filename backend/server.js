const express = require("express")
const cors = require("cors")
const movieRoutes = require("./routes/movieRoutes")
const connectDB = require("./config/db")
require("dotenv").config()

const app = express()
connectDB()
app.use(cors())
app.use(express.json())
app.use("/api/movies", movieRoutes)

app.get("/", (req, res) => {
    res.send("Movie Recommendation Backend is running")
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})