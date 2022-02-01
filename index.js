const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080

const moviesRouter = require("./routers/router")

app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

app.use("/api/movies", moviesRouter)


app.listen(
  PORT,
  () => console.log(`server is running on http://localhost:${PORT}`)
)