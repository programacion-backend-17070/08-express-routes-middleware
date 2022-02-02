const express = require('express')
const { Router } = express;

const router = Router();

const movies = [
  { id: 1, name: 'Joker' },
  { id: 2, name: 'Good Fellas' },
  { id: 3, name: 'Matrix' }
];

// /api/movies
router.get('/', (req, res) => {
  res.status(200).send(movies)
})

// /api/movies/:id
router.get('/:id', (req, res) => {
  const movie = movies.find(m => m.id == req.params.id)
  if (!movie) {
    res.status(404).send("Movie not found")
    return
  }

  res.send(movie)
})

// /api/movies
router.post('/', (req, res) => {
  const { id, name } = req.body

  movies.push({
    id,
    name
  })

  res.sendStatus(201) // created
})

// /api/movies/:id
router.put('/:id', (req, res, next) => {
  if (req.params.id == "2") {
    res.status(401).send("No se puede cambiar el id 2")
    return
  }

  next()
}, (req, res) => {
  const { id } = req.params
  const { name } = req.body

  const movie = movies.find(m => m.id == id)
  if (!movie) {
    res.status(404).send("Movie not found")
    return
  }

  movie.name = name;
  res.sendStatus(200)
})

// /api/movies/:id
router.delete('/:id', (req, res) => {
  const { id } = req.params

  const movie = movies.find(m => m.id == id)
  if (!movie) {
    res.status(404).send("Movie not found")
    return
  }

  const index = movies.indexOf(movie)
  movies.splice(index, 1)

  res.sendStatus(200)
})

module.exports = router