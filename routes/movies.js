const express = require('express')
const { Router } = express;

const movies = [
  { id: 1, name: 'Joker' },
  { id: 2, name: 'Good Fellas' },
  { id: 3, name: 'Matrix' }
];

const router = Router();

router.get('/', (req, res) => {
  res.status(200).send(movies)
})

router.get('/:id', (req, res) => {
  const movie = movies.find(m => m.id == req.params.id)
  if (!movie) {
    res.status(404).send("Movie not found")
    return
  }

  res.send(movie)
})

router.post('/', (req, res) => {
  const { id, name } = req.body

  movies.push({
    id,
    name
  })

  res.sendStatus(201) // created
})

router.put('/:id', (req, res, next) => {
  const { id } = req.params
  if (id == "1") {
    res.status(401).send("Movie 1 cannot be changed")
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