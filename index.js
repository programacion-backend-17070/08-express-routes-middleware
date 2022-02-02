const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 8080

const moviesRouter = require("./routes/movies")

app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/static", express.static(path.join(__dirname, 'public')))
app.use("/docs", express.static(path.join(__dirname, 'docs')))
app.use(morgan('tiny'));

app.use((req, res, next) => {
  console.log("logging...")
  next()
})

app.use((req, res, next) => {
  console.log("auth...")
  // throw(new Error("error"))
  next()
})



app.get('/', (req, res) => {
  console.log
  res.cookie('name', 'express').sendFile(__dirname + '/public/index.html')
})

app.use("/api/movies", moviesRouter)

app.use((err, req, res, next) => {
  console.log("error middleware")
  console.log(err?.stack)
  next()
})

app.listen(
  PORT,
  () => console.log(`server is running on http://localhost:${PORT}`)
)