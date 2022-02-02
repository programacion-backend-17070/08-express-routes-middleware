const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 8080

const moviesRouter = require('./routes/movies')
const homeRouter = require('./routes/home')

app.use(express.json()) // req.body
app.use(express.urlencoded({ extended: true })) // req.body
app.use(cookieParser())
// /Users/Lalo/Documents/Coderhouse/source/08-express-routes-middleware/public
app.use("/static", express.static(path.join(__dirname, 'public'))) // /
app.use("/docs", express.static("docs")) 
// 

app.use((req, res, next) => {
  console.log("logging")
  next()
})

app.use((req, res, next) => {
  console.log("auth...")
  next()
})

app.use((err, req, res, next) => {
  console.log("hubo un error")
  res.status(500).send("Error")
})

app.use("/api/movies", moviesRouter)

// dentro de esta ruta yo puse lo de /mascotas
app.use("/", homeRouter)

app.listen(
  PORT,
  () => console.log(`server is running on http://localhost:${PORT}`)
)