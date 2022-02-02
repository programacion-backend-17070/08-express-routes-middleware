
const express = require('express');
const path = require("path");

const upload = require('../middlewares/file')
const { Router } = express;




const router = Router();
// {
//  name
//  tipo
// }
const mascotas = [{
  nombre: 'nombre',
  raza: 'raza',
  edad: 'edad',
}]

router.get('/', (req, res) => {
  // RUTA_A_MI_ARCHIVO/public/index.html
  res.cookie("name", "cookie").sendFile(path.join(__dirname, '../public/index.html'))
})

router.get('/api/mascotas', (req, res) => {
  // RUTA_A_MI_ARCHIVO/public/index.html
  res.send(mascotas)
})

router.get('/mascotas', (req, res) => {
  // RUTA_A_MI_ARCHIVO/public/index.html
  res.sendFile(path.join(__dirname, '../public/nueva.html'))
})

router.post('/mascotas', upload.single("img"), (req, res) => {
  console.log(JSON.stringify(req.file, null, 2))
  if (req.file) {
    console.log("tenemos file")
  }
  console.log(req.body)
  mascotas.push({ ...req.body })
  res.redirect("/")
})

router.post('/mascotas/multiple', upload.array("img", 2), (req, res) => {
  if (req.files) {
    console.log("tenemos file")
  }
  console.log(JSON.stringify(req.body))
  res.redirect('/')
})

module.exports = router;